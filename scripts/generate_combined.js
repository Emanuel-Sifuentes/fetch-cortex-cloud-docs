const https = require("https");
const fs = require("fs");
const path = require("path");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const MAP_IDS = {
  appsec:  "aUsxSwBeRrRs3Jm36XHckg",
  posture: "BNCvOg6pEdBp~axnn92pBQ",
  runtime: "bKDBlplrokDJKA~h8O9o6A",
};

const OUTPUT_FILES = {
  appsec:  "cortex-cloud-appsec-combined.md",
  posture: "cortex-cloud-posture-combined.md",
  runtime: "cortex-cloud-runtime-combined.md",
};

const OUT_DIR = path.join(__dirname, "..", "sources_fetch");
const KEYWORD_HEADINGS = [
  "For AMD architecture",
  "For ARM architecture",
  "For **JavaScript**",
  "For **Python**",
  "For **Java**",
];

function fetch(urlPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE);
    https
      .get(
        { hostname: url.hostname, path: url.pathname, headers: { Accept: "application/json" } },
        (res) => {
          if (res.statusCode !== 200) {
            res.resume();
            return reject(new Error(`HTTP ${res.statusCode} for ${urlPath}`));
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
  return content.replace(/^---\n[\s\S]*?\n---\n/, "");
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
  return md
    .split("\n")
    .map((line) => {
      if (/^```/.test(line)) {
        inCodeBlock = !inCodeBlock;
        return line;
      }
      if (inCodeBlock) return line;
      const headingMatch = line.match(/^(#{1,6}) /);
      if (headingMatch) {
        currentHeadingLevel = headingMatch[1].length;
        return line;
      }
      const listMatch = line.match(/^-\s+(.*)/);
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
          return "#".repeat(level) + " " + text;
        }
      }
      return line;
    })
    .join("\n");
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

  const postureTocMap = new Map();
  for (const entry of postureToc) {
    if (!postureTocMap.has(entry.contentId)) {
      postureTocMap.set(entry.contentId, entry);
    }
  }

  for (const id of postureOnlyIds) {
    const postureEntry = postureTocMap.get(id);
    const candidates = runtimeByTitle.get(postureEntry.title);
    if (candidates && candidates.length > 0) {
      const best = candidates.reduce((a, b) =>
        Math.abs(a.depth - postureEntry.depth) <= Math.abs(b.depth - postureEntry.depth) ? a : b
      );
      titleMatched.set(id, best.contentId);
    } else {
      P.add(id);
    }
  }

  return { PRA, PR, R, P, A, titleMatched };
}

function resolveFile(contentId, titleMatchMap, fileMap) {
  if (fileMap[contentId]) return fileMap[contentId];
  const mapped = titleMatchMap.get(contentId);
  if (mapped && fileMap[mapped]) return fileMap[mapped];
  return null;
}

function parseMapFlag() {
  const idx = process.argv.indexOf("--map");
  if (idx === -1 || idx + 1 >= process.argv.length) return "all";
  return process.argv[idx + 1];
}

async function main() {
  // Parse --map flag
  const mapFlag = parseMapFlag();
  const ALL_TARGETS = ["appsec", "posture", "runtime"];
  const targets = mapFlag === "all" ? ALL_TARGETS : [mapFlag];
  for (const t of targets) {
    if (!MAP_IDS[t]) {
      console.error(`Error: unknown map "${t}" — choose from: ${ALL_TARGETS.join(", ")}`);
      process.exit(1);
    }
  }

  // Check source files exist
  if (!fs.existsSync(OUT_DIR)) {
    console.error(
      `Error: ${OUT_DIR} not found — run \`npm run fetch\` first`
    );
    process.exit(1);
  }
  const files = fs
    .readdirSync(OUT_DIR)
    .filter((f) => /^\d+-/.test(f) && f.endsWith(".md"))
    .sort();
  if (files.length === 0) {
    console.error(
      `Error: No source files found in ${OUT_DIR} — run \`npm run fetch\` first`
    );
    process.exit(1);
  }

  // Build contentId -> file content map from local files
  const fileMap = {};
  for (const f of files) {
    const content = fs.readFileSync(path.join(OUT_DIR, f), "utf-8");
    const contentId = parseContentId(content);
    if (contentId) {
      fileMap[contentId] = { filename: f, content };
    } else {
      console.log(`WARNING: no contentId found in ${f}`);
    }
  }

  // Fetch all 3 TOCs in parallel (always needed for bucketing)
  console.log("Fetching TOCs from API...");
  const [appsecToc, postureToc, runtimeToc] = await Promise.all([
    fetch(`/api/khub/maps/${MAP_IDS.appsec}/toc`),
    fetch(`/api/khub/maps/${MAP_IDS.posture}/toc`),
    fetch(`/api/khub/maps/${MAP_IDS.runtime}/toc`),
  ]);

  // Flatten each TOC
  const appsecFlat  = flattenToc(appsecToc);
  const postureFlat = flattenToc(postureToc);
  const runtimeFlat = flattenToc(runtimeToc);
  console.log(`TOCs: appsec=${appsecFlat.length}, posture=${postureFlat.length}, runtime=${runtimeFlat.length}`);

  // Compute dedup buckets
  const buckets = computeBuckets(postureFlat, runtimeFlat, appsecFlat);

  // Determine which contentIds belong to each target
  const targetContentIds = {
    appsec:  new Set([...buckets.PRA, ...buckets.A]),
    posture: new Set([...buckets.PR, ...buckets.P, ...buckets.titleMatched.keys()]),
    runtime: new Set([...buckets.R]),
  };

  const targetTocs = {
    appsec:  appsecFlat,
    posture: postureFlat,
    runtime: runtimeFlat,
  };

  // Generate combined file for each target
  for (const target of targets) {
    const allowedIds = targetContentIds[target];
    const tocFlat = targetTocs[target].filter((e) => allowedIds.has(e.contentId));

    console.log(`\n[${target}] ${tocFlat.length} entries after dedup`);

    // Build combined file in TOC order
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
    const outPath = path.join(OUT_DIR, OUTPUT_FILES[target]);
    fs.writeFileSync(outPath, combined + "\n", "utf-8");
    console.log(`Combined file: ${outPath}`);
    console.log(`${tocFlat.length} topics, ${combined.split("\n").length} lines`);
  }
}

module.exports = { promoteKeywordsToHeadings, computeBuckets, resolveFile };

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
