const https = require("https");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const {
  STOPLIGHT_PROJECTS,
  parseStoplightFlags,
} = require("./stoplight_config.js");
const {
  renderArticle,
  renderHttpService,
  renderHttpOperation,
} = require("./render_stoplight_node.js");

const METADATA_DIR = path.join(__dirname, "..", "metadata");
const OUT_BASE = path.join(__dirname, "..", "sources_fetch");
const CONCURRENCY = 10;
const DELAY_MS = 200;
const INCLUDED_TYPES = new Set(["article", "http_service", "http_operation"]);

function hashContent(dataString) {
  return "sha256:" + crypto.createHash("sha256").update(dataString).digest("hex");
}

function filterTocNodes(items, serviceName = null) {
  const result = [];
  for (const item of items) {
    const currentService =
      item.type === "http_service" ? item.title : serviceName;
    if (INCLUDED_TYPES.has(item.type)) {
      result.push({
        type: item.type,
        title: item.title,
        slug: item.slug,
        serviceName:
          item.type === "http_operation" ? currentService || null : null,
      });
    }
    if (item.items) {
      result.push(...filterTocNodes(item.items, currentService));
    }
  }
  return result;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function sanitizeFilename(title) {
  return title
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 120);
}

class HttpError extends Error {
  constructor(statusCode, url) {
    super(`HTTP ${statusCode} for ${url}`);
    this.statusCode = statusCode;
  }
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    https
      .get(
        {
          hostname: parsed.hostname,
          path: parsed.pathname + parsed.search,
          headers: { Accept: "application/json" },
        },
        (res) => {
          if (res.statusCode !== 200) {
            res.resume();
            return reject(new HttpError(res.statusCode, url));
          }
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () =>
            resolve(JSON.parse(Buffer.concat(chunks).toString()))
          );
        }
      )
      .on("error", reject);
  });
}

async function httpGetWithRetry(url) {
  try {
    return await httpGet(url);
  } catch (err) {
    if (err.statusCode && err.statusCode >= 500) {
      await sleep(1000);
      return await httpGet(url);
    }
    if (!(err instanceof HttpError)) {
      await sleep(1000);
      return await httpGet(url);
    }
    throw err;
  }
}

function readState(product) {
  const filePath = path.join(METADATA_DIR, `api_specs_${product}.json`);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    if (err.code === "ENOENT") return null;
    throw err;
  }
}

function writeState(product, state) {
  fs.mkdirSync(METADATA_DIR, { recursive: true });
  const filePath = path.join(METADATA_DIR, `api_specs_${product}.json`);
  fs.writeFileSync(
    filePath,
    JSON.stringify(state, null, 2) + "\n",
    "utf-8"
  );
}

async function fetchProduct(productKey, force) {
  const config = STOPLIGHT_PROJECTS[productKey];
  const outDir = path.join(OUT_BASE, `api_specs_${productKey}`);
  const state = readState(productKey);

  console.log(`\nFetching branch info for ${productKey}...`);
  const branchUrl = `${config.host}/api/v1/projects/${config.projectId}/branches`;
  const branchData = await httpGetWithRetry(branchUrl);
  const mainBranch = branchData.items?.[0] || branchData[0] || {};
  const commitHash = mainBranch.commit_hash || "";
  const updatedAt = mainBranch.updated_at || "";

  if (!force && state && state.commitHash === commitHash) {
    console.log(
      `  ${productKey}: no changes (commit ${commitHash.slice(0, 12)})`
    );
    return;
  }
  console.log(`  ${productKey}: changes detected, fetching TOC...`);

  const tocUrl = `${config.host}/api/v1/projects/${config.projectId}/table-of-contents`;
  const toc = await httpGetWithRetry(tocUrl);
  const tocNodes = filterTocNodes(toc.items || []);
  console.log(`  Found ${tocNodes.length} nodes to process`);

  const fetchedNodes = [];
  const failedSlugs = new Set();

  async function fetchBatch(batch) {
    return Promise.allSettled(
      batch.map(async (tocNode) => {
        const nodeUrl = `${config.host}/api/v1/projects/${config.projectId}/nodes/${tocNode.slug}`;
        const nodeData = await httpGetWithRetry(nodeUrl);
        return { ...tocNode, data: nodeData.data, id: nodeData.id };
      })
    );
  }

  for (let i = 0; i < tocNodes.length; i += CONCURRENCY) {
    const batch = tocNodes.slice(i, i + CONCURRENCY);
    let results = await fetchBatch(batch);

    const has429 = results.some(
      (r) => r.status === "rejected" && r.reason?.statusCode === 429
    );
    if (has429) {
      console.log("  Rate limited, waiting 5s and retrying batch...");
      await sleep(5000);
      results = await fetchBatch(batch);
    }

    for (let j = 0; j < results.length; j++) {
      if (results[j].status === "fulfilled") {
        fetchedNodes.push(results[j].value);
      } else {
        console.warn(
          `  WARNING: failed to fetch ${batch[j].slug}: ${results[j].reason?.message}`
        );
        failedSlugs.add(batch[j].slug);
      }
    }
    if (i + CONCURRENCY < tocNodes.length) await sleep(DELAY_MS);
  }

  const serviceServerUrls = {};
  for (const node of fetchedNodes) {
    if (node.type === "http_service") {
      try {
        const svcData = JSON.parse(node.data);
        serviceServerUrls[node.title] = svcData.servers?.[0]?.url || "";
      } catch (err) {
        console.warn(`  WARNING: could not parse server URL for service "${node.title}": ${err.message}`);
      }
    }
  }

  const oldNodes = state?.nodes || {};
  const newNodes = {};
  const changedNodes = [];

  let maxNumber = 0;
  for (const entry of Object.values(oldNodes)) {
    const match = entry.outputFile?.match(/^(\d+)-/);
    if (match) maxNumber = Math.max(maxNumber, parseInt(match[1], 10));
  }

  fs.mkdirSync(outDir, { recursive: true });

  if (force) {
    const existing = fs.readdirSync(outDir).filter((f) => f.endsWith(".md"));
    for (const f of existing) fs.unlinkSync(path.join(outDir, f));
    maxNumber = 0;
  }

  let fileNumber = force ? 0 : maxNumber;

  for (const node of fetchedNodes) {
    const contentHash = hashContent(node.data);
    const oldEntry = oldNodes[node.slug];
    const isChanged =
      !oldEntry || oldEntry.contentHash !== contentHash || force;

    let outputFile;
    if (!force && oldEntry?.outputFile) {
      outputFile = oldEntry.outputFile;
    } else {
      fileNumber++;
      outputFile = `${String(fileNumber).padStart(4, "0")}-${sanitizeFilename(node.title)}.md`;
    }

    newNodes[node.slug] = {
      contentHash,
      type: node.type,
      title: node.title,
      outputFile,
    };

    if (!isChanged) continue;
    changedNodes.push(node);

    const enrichedNode = { ...node, sourceProject: config.slug };
    let md;
    if (node.type === "article") {
      md = renderArticle(enrichedNode);
    } else if (node.type === "http_service") {
      md = renderHttpService(enrichedNode);
    } else if (node.type === "http_operation") {
      const srvUrl = serviceServerUrls[node.serviceName] || "";
      md = renderHttpOperation(enrichedNode, {
        serviceName: node.serviceName,
        serverUrl: srvUrl,
      });
    }

    fs.writeFileSync(path.join(outDir, outputFile), md, "utf-8");
    console.log(`  [${node.type}] ${outputFile}`);
  }

  const currentSlugs = new Set(fetchedNodes.map((n) => n.slug));
  for (const [slug, entry] of Object.entries(oldNodes)) {
    if (!currentSlugs.has(slug) && !failedSlugs.has(slug)) {
      try {
        fs.unlinkSync(path.join(outDir, entry.outputFile));
        console.log(`  Removed: ${entry.outputFile}`);
      } catch (err) {
        if (err.code !== "ENOENT") throw err;
      }
    }
  }

  const renderedCount = Object.keys(newNodes).length;
  writeState(productKey, {
    version: 1,
    source: "stoplight",
    projectId: config.projectId,
    commitHash,
    updatedAt,
    fetchedAt: new Date().toISOString(),
    nodeCount: renderedCount,
    nodes: newNodes,
  });

  console.log(
    `  ${productKey}: ${changedNodes.length} changed, ${renderedCount} total`
  );
}

async function main() {
  const { product, force } = parseStoplightFlags();
  const products = product ? [product] : Object.keys(STOPLIGHT_PROJECTS);

  for (const p of products) {
    await fetchProduct(p, force);
  }
  console.log("\nDone.");
}

module.exports = { hashContent, filterTocNodes };

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
