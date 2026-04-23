const fs = require("fs");
const path = require("path");
const { MAP_IDS, COMBINED_FILES, VALID_MAPS, resolveTargetMaps } = require("./map_config.js");
const { SASE_PRODUCTS, PRODUCT_FAMILIES } = require("./aem_config.js");
const { httpGetWithRetry } = require("./http_retry.js");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const OUT_DIR = path.join(__dirname, "..", "sources_fetch");
const KEYWORD_HEADINGS = [
  "For AMD architecture",
  "For ARM architecture",
  "For **JavaScript**",
  "For **Python**",
  "For **Java**",
];

const fetch = async (urlPath) => JSON.parse(await httpGetWithRetry(urlPath, { base: BASE }));

function flattenToc(nodes, depth = 0) {
  const result = [];
  for (const node of nodes) {
    result.push({ title: node.title, contentId: node.contentId, depth });
    if (node.children && node.children.length) {
      result.push(...flattenToc(node.children, depth + 1));
    }
  }
  return result;
}

function parseContentId(content) {
  const match = content.match(/^contentId:\s*"(.*)"/m);
  return match ? match[1] : null;
}

function stripFrontmatter(content) {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

function shiftHeadings(md, depth, filename) {
  if (depth === 0) return md;
  let inCodeBlock = false;
  return md
    .split("\n")
    .map((line) => {
      if (/^```/.test(line)) {
        inCodeBlock = !inCodeBlock;
        return line;
      }
      if (inCodeBlock) return line;
      return line.replace(/^(#{1,6}) /, (_, hashes) => {
        const newLevel = Math.min(hashes.length + depth, 6);
        if (hashes.length + depth > 6) {
          console.log(
            `WARNING: heading capped at h6 in ${filename}: "${line.replace(/^#{1,6} /, "")}"`
          );
        }
        return "#".repeat(newLevel) + " ";
      });
    })
    .join("\n");
}

function promoteKeywordsToHeadings(md) {
  let currentHeadingLevel = 0;
  let inCodeBlock = false;
  let dedenting = false;
  const lines = md.split("\n");
  const result = [];

  for (const line of lines) {
    let out = line;

    if (dedenting) {
      if (/^    /.test(out)) {
        out = out.replace(/^    /, "");
      } else if (/^\s*$/.test(out)) {
        out = "";
      } else {
        dedenting = false;
      }
    }

    if (/^```/.test(out)) {
      inCodeBlock = !inCodeBlock;
      result.push(out);
      continue;
    }
    if (inCodeBlock) {
      result.push(out);
      continue;
    }

    const headingMatch = out.match(/^(#{1,6}) /);
    if (headingMatch) {
      currentHeadingLevel = headingMatch[1].length;
      result.push(out);
      continue;
    }

    const listMatch = out.match(/^-\s+(.*)/);
    if (listMatch) {
      const text = listMatch[1];
      const isKeyword = KEYWORD_HEADINGS.some((kw) => text.startsWith(kw));
      if (isKeyword) {
        const level = Math.min(currentHeadingLevel + 1, 6);
        if (currentHeadingLevel + 1 > 6) {
          console.log(
            `WARNING: keyword heading capped at h6: "${text}"`
          );
        }
        result.push("#".repeat(level) + " " + text);
        dedenting = true;
        continue;
      }
    }

    result.push(out);
  }

  return result.join("\n");
}

function titleMatchToRuntime(sourceIds, sourceTocMap, runtimeByTitle, fallbackSet, titleMatched) {
  for (const id of sourceIds) {
    const entry = sourceTocMap.get(id);
    const candidates = runtimeByTitle.get(entry.title);
    if (candidates && candidates.length > 0) {
      const best = candidates.reduce((a, b) =>
        Math.abs(a.depth - entry.depth) <= Math.abs(b.depth - entry.depth) ? a : b
      );
      if (fallbackSet) fallbackSet.delete(id);
      titleMatched.set(id, best.contentId);
    } else if (fallbackSet) {
      fallbackSet.add(id);
    }
  }
}

function buildTocMap(toc) {
  const map = new Map();
  for (const entry of toc) {
    if (!map.has(entry.contentId)) map.set(entry.contentId, entry);
  }
  return map;
}

function computeBuckets(postureToc, runtimeToc, appsecToc) {
  const postureIds = new Set(postureToc.map((e) => e.contentId));
  const runtimeIds = new Set(runtimeToc.map((e) => e.contentId));
  const appsecIds  = new Set(appsecToc.map((e) => e.contentId));

  const PRA = new Set();
  const PR  = new Set();
  const R   = new Set();
  const P   = new Set();
  const A   = new Set();
  const titleMatched = new Map();

  for (const id of appsecIds) {
    if (postureIds.has(id) && runtimeIds.has(id)) PRA.add(id);
    else A.add(id);
  }

  for (const id of runtimeIds) {
    if (appsecIds.has(id)) continue;
    if (postureIds.has(id)) PR.add(id);
    else R.add(id);
  }

  const postureOnlyIds = [];
  for (const id of postureIds) {
    if (!appsecIds.has(id) && !runtimeIds.has(id)) {
      postureOnlyIds.push(id);
    }
  }

  const runtimeByTitle = new Map();
  for (const entry of runtimeToc) {
    if (!runtimeByTitle.has(entry.title)) {
      runtimeByTitle.set(entry.title, []);
    }
    runtimeByTitle.get(entry.title).push(entry);
  }

  titleMatchToRuntime(postureOnlyIds, buildTocMap(postureToc), runtimeByTitle, P, titleMatched);
  titleMatchToRuntime(A, buildTocMap(appsecToc), runtimeByTitle, A, titleMatched);

  return { PRA, PR, R, P, A, titleMatched, postureIds, appsecIds };
}

function resolveFile(contentId, titleMatchMap, fileMap) {
  if (fileMap[contentId]) return fileMap[contentId];
  const mapped = titleMatchMap.get(contentId);
  if (mapped && fileMap[mapped]) return fileMap[mapped];
  return null;
}

async function main() {
  // Determine --product flag value (if any) before dispatching
  const productFlag = process.argv.indexOf("--product");
  const productValue = productFlag !== -1 ? process.argv[productFlag + 1] : null;

  // Check whether the --product value targets an AEM product or family
  const isAemProduct = productValue && SASE_PRODUCTS[productValue];
  const isAemFamily = productValue && PRODUCT_FAMILIES[productValue];
  const skipCortex = isAemProduct || isAemFamily;

  // --- Cortex (Fluid Topics) section ---
  if (!skipCortex) {
    const targets = resolveTargetMaps();

    // Build contentId -> file content map from per-map subdirectories
    const fileMap = {};
    function loadFilesFromDir(dir) {
      if (!fs.existsSync(dir)) return;
      const files = fs
        .readdirSync(dir)
        .filter((f) => /^\d+-/.test(f) && f.endsWith(".md"))
        .sort();
      for (const f of files) {
        const content = fs.readFileSync(path.join(dir, f), "utf-8");
        const contentId = parseContentId(content);
        if (contentId) {
          fileMap[contentId] = { filename: f, content };
        } else {
          console.log(`WARNING: no contentId found in ${f}`);
        }
      }
    }

    for (const key of VALID_MAPS) {
      loadFilesFromDir(path.join(OUT_DIR, key));
    }

    if (Object.keys(fileMap).length === 0) {
      console.error(
        `Error: No source files found in ${OUT_DIR}/*/ — run \`npm run fetch\` first`
      );
      process.exit(1);
    }

    // Maps that use the cross-map dedup logic
    const dedupMaps = ["appsec", "posture", "runtime"];
    // Maps that combine straight from their own TOC
    const simpleMaps = ["cortex_gateway", "xdr_5", "xdr_compatibility", "xdr_agent_admin", "xsiam_3", "agentix"];

    const dedupTargets = targets.filter((t) => dedupMaps.includes(t));
    const simpleTargets = targets.filter((t) => simpleMaps.includes(t));

    // --- Dedup maps (appsec / posture / runtime) ---
    if (dedupTargets.length > 0) {
      console.log("Fetching TOCs for dedup maps...");
      const [appsecToc, postureToc, runtimeToc] = await Promise.all([
        fetch(`/api/khub/maps/${MAP_IDS.appsec}/toc`),
        fetch(`/api/khub/maps/${MAP_IDS.posture}/toc`),
        fetch(`/api/khub/maps/${MAP_IDS.runtime}/toc`),
      ]);

      const appsecFlat  = flattenToc(appsecToc);
      const postureFlat = flattenToc(postureToc);
      const runtimeFlat = flattenToc(runtimeToc);
      console.log(`TOCs: appsec=${appsecFlat.length}, posture=${postureFlat.length}, runtime=${runtimeFlat.length}`);

      const buckets = computeBuckets(postureFlat, runtimeFlat, appsecFlat);

      const targetContentIds = {
        appsec:  new Set([...buckets.PRA, ...buckets.A,
          ...[...buckets.titleMatched.keys()].filter((id) => buckets.appsecIds.has(id))]),
        posture: new Set([...buckets.PR, ...buckets.P,
          ...[...buckets.titleMatched.keys()].filter((id) => buckets.postureIds.has(id))]),
        runtime: new Set([...buckets.R]),
      };

      const targetTocs = {
        appsec:  appsecFlat,
        posture: postureFlat,
        runtime: runtimeFlat,
      };

      for (const target of dedupTargets) {
        const allowedIds = targetContentIds[target];
        const tocFlat = targetTocs[target].filter((e) => allowedIds.has(e.contentId));

        console.log(`\n[${target}] ${tocFlat.length} entries after dedup`);

        const sections = [];
        for (const entry of tocFlat) {
          const file = resolveFile(entry.contentId, buckets.titleMatched, fileMap);
          if (!file) {
            console.log(`WARNING: TOC entry "${entry.title}" has no matching local file`);
            continue;
          }
          const md = stripFrontmatter(file.content);
          sections.push(shiftHeadings(md.trim(), entry.depth, file.filename));
        }

        const raw = sections.filter(Boolean).join("\n\n");
        const combined = promoteKeywordsToHeadings(raw);
        const targetDir = path.join(OUT_DIR, target);
        fs.mkdirSync(targetDir, { recursive: true });
        const outPath = path.join(targetDir, COMBINED_FILES[target]);
        fs.writeFileSync(outPath, combined + "\n", "utf-8");
        console.log(`Combined file: ${outPath}`);
        console.log(`${tocFlat.length} topics, ${combined.split("\n").length} lines`);
      }
    }

    // --- Simple maps (no dedup, straight TOC combine) ---
    for (const target of simpleTargets) {
      console.log(`\nFetching ${target} TOC...`);
      const toc = await fetch(`/api/khub/maps/${MAP_IDS[target]}/toc`);
      const tocFlat = flattenToc(toc);
      console.log(`[${target}] ${tocFlat.length} entries`);

      const sections = [];
      for (const entry of tocFlat) {
        const file = fileMap[entry.contentId];
        if (!file) {
          console.log(`WARNING: TOC entry "${entry.title}" has no matching local file`);
          continue;
        }
        const md = stripFrontmatter(file.content);
        sections.push(shiftHeadings(md.trim(), entry.depth, file.filename));
      }

      const raw = sections.filter(Boolean).join("\n\n");
      const combined = promoteKeywordsToHeadings(raw);
      const targetDir = path.join(OUT_DIR, target);
      fs.mkdirSync(targetDir, { recursive: true });
      const outPath = path.join(targetDir, COMBINED_FILES[target]);
      fs.writeFileSync(outPath, combined + "\n", "utf-8");
      console.log(`Combined file: ${outPath}`);
      console.log(`${tocFlat.length} topics, ${combined.split("\n").length} lines`);
    }
  }

  // --- AEM-sourced maps (sitemap-ordered, frontmatter-driven) ---
  let aemTargets = [];
  if (!productValue) {
    aemTargets = Object.keys(SASE_PRODUCTS);
  } else if (SASE_PRODUCTS[productValue]) {
    aemTargets = [productValue];
  } else if (PRODUCT_FAMILIES[productValue]) {
    aemTargets = PRODUCT_FAMILIES[productValue];
  }

  for (const target of aemTargets) {
    const config = SASE_PRODUCTS[target];
    const targetDir = path.join(OUT_DIR, target);
    if (!fs.existsSync(targetDir)) {
      console.log(`\nSkipping ${target} (directory not found)`);
      continue;
    }

    const files = fs.readdirSync(targetDir)
      .filter((f) => /^\d+-/.test(f) && f.endsWith(".md"))
      .sort();

    if (files.length === 0) {
      console.log(`\nSkipping ${target} (no source files)`);
      continue;
    }

    console.log(`\n[${target}] Combining ${files.length} files (AEM source)`);

    const sections = [];
    for (const f of files) {
      const content = fs.readFileSync(path.join(targetDir, f), "utf-8");
      const depthMatch = content.match(/^depth:\s*(\d+)/m);
      const depth = depthMatch ? parseInt(depthMatch[1], 10) : 0;
      const md = stripFrontmatter(content);
      sections.push(shiftHeadings(md.trim(), depth, f));
    }

    const raw = sections.filter(Boolean).join("\n\n");
    const combined = promoteKeywordsToHeadings(raw);
    const outPath = path.join(targetDir, config.combinedFile);
    fs.writeFileSync(outPath, combined + "\n", "utf-8");
    console.log(`Combined file: ${outPath}`);
    console.log(`${files.length} topics, ${combined.split("\n").length} lines`);
  }
}

module.exports = { promoteKeywordsToHeadings, computeBuckets, resolveFile };

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
