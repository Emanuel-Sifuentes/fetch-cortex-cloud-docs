const fs = require("fs");
const path = require("path");
const { MAP_IDS, parseMapFlag } = require("./map_config.js");
const { httpGetWithRetry } = require("./http_retry.js");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const MAP_ID = MAP_IDS[parseMapFlag("runtime")];
const DIR = path.join(__dirname, "..", "sources_fetch");

const fetch = async (urlPath) => JSON.parse(await httpGetWithRetry(urlPath, { base: BASE }));

function flattenToc(nodes, depth = 0) {
  const result = [];
  for (const node of nodes) {
    result.push({ contentId: node.contentId, depth });
    if (node.children && node.children.length) {
      result.push(...flattenToc(node.children, depth + 1));
    }
  }
  return result;
}

function parseFile(filepath) {
  const content = fs.readFileSync(filepath, "utf-8");
  const lines = content.split("\n");

  let title = "", depth = -1, contentId = "";
  let inFm = false, fmCount = 0;
  for (const line of lines) {
    if (line === "---") { fmCount++; inFm = fmCount === 1; continue; }
    if (inFm) {
      const tm = line.match(/^title:\s*"(.*)"/);
      if (tm) title = tm[1];
      const dm = line.match(/^depth:\s*(\d+)/);
      if (dm) depth = parseInt(dm[1]);
      const cm = line.match(/^contentId:\s*"(.*)"/);
      if (cm) contentId = cm[1];
    }
  }

  // Extract headings outside frontmatter and code blocks
  let pastFm = false;
  fmCount = 0;
  let inCodeBlock = false;
  const headingLevels = [];
  let firstHeading = null;
  for (const line of lines) {
    if (line === "---") { fmCount++; if (fmCount === 2) pastFm = true; continue; }
    if (!pastFm) continue;
    if (/^```/.test(line)) { inCodeBlock = !inCodeBlock; continue; }
    if (inCodeBlock) continue;
    const hm = line.match(/^(#{1,6})\s+(.+)$/);
    if (hm) {
      const level = hm[1].length;
      const text = hm[2].trim();
      headingLevels.push(level);
      if (!firstHeading) firstHeading = { level, text };
    }
  }

  return {
    filename: path.basename(filepath),
    title, depth, contentId,
    headingLevels, firstHeading,
  };
}

async function main() {
  const files = fs.readdirSync(DIR)
    .filter(f => f.endsWith(".md") && !f.startsWith("cortex-cloud-") && f !== "README.md")
    .sort();

  // Parse all files in one pass
  const parsed = files.map(f => parseFile(path.join(DIR, f)));

  // === Title Heading Analysis ===
  let titleAsH1 = 0, titleAsOther = 0, noTitleHeading = 0;
  const titleOtherExamples = [];
  const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, "");

  for (const p of parsed) {
    if (!p.firstHeading) { noTitleHeading++; continue; }
    if (norm(p.firstHeading.text) === norm(p.title)) {
      if (p.firstHeading.level === 1) titleAsH1++;
      else {
        titleAsOther++;
        if (titleOtherExamples.length < 5) {
          titleOtherExamples.push(p);
        }
      }
    } else {
      noTitleHeading++;
    }
  }

  console.log("=== Title Heading Analysis ===");
  console.log(`Files where title is # (h1): ${titleAsH1}`);
  console.log(`Files where title is other heading: ${titleAsOther}`);
  for (const e of titleOtherExamples) {
    console.log(`  ${e.filename} (depth ${e.depth}): h${e.firstHeading.level} "${e.title}"`);
  }
  console.log(`Files where first heading != title: ${noTitleHeading}`);
  console.log();

  // === Pattern Analysis: TOC Depth -> Heading Levels ===
  const pattern = {};
  for (const p of parsed) {
    if (!pattern[p.depth]) pattern[p.depth] = { count: 0, firstLevels: {}, subLevels: {} };
    pattern[p.depth].count++;
    if (p.headingLevels.length > 0) {
      const fl = p.headingLevels[0];
      pattern[p.depth].firstLevels[fl] = (pattern[p.depth].firstLevels[fl] || 0) + 1;
    }
    for (const l of p.headingLevels.slice(1)) {
      pattern[p.depth].subLevels[l] = (pattern[p.depth].subLevels[l] || 0) + 1;
    }
  }

  console.log("=== Current Pattern: TOC Depth -> Heading Levels ===\n");
  console.log("Depth | Files | First heading levels       | Sub-heading levels");
  console.log("------|-------|-----------------------------|-------------------");
  for (const d of Object.keys(pattern).sort((a, b) => a - b)) {
    const p = pattern[d];
    const first = Object.entries(p.firstLevels).map(([l, c]) => `h${l}(x${c})`).join(", ");
    const sub = Object.entries(p.subLevels).map(([l, c]) => `h${l}(x${c})`).join(", ");
    console.log(`  ${d}   |  ${String(p.count).padStart(3)} | ${first.padEnd(27)} | ${sub}`);
  }
  console.log();

  // === H6 Cap Simulation ===
  // Fetch live TOC to get authoritative depth, then check which headings would be capped
  console.log("=== H6 Cap Simulation (using live TOC) ===\n");
  console.log("Fetching TOC from API...");
  const toc = await fetch(`/api/khub/maps/${MAP_ID}/toc`);
  const tocFlat = flattenToc(toc);

  const tocDepthMap = {};
  for (const entry of tocFlat) {
    tocDepthMap[entry.contentId] = entry.depth;
  }

  let cappedCount = 0;
  for (const p of parsed) {
    const tocDepth = tocDepthMap[p.contentId];
    if (tocDepth === undefined) continue;
    for (const level of p.headingLevels) {
      if (level + tocDepth > 6) {
        console.log(
          `CAPPED: ${p.filename} — h${level} + depth ${tocDepth} = ${level + tocDepth} > 6`
        );
        cappedCount++;
        break; // one warning per file is enough
      }
    }
  }

  if (cappedCount === 0) {
    console.log("No headings would be capped at h6.");
  } else {
    console.log(`\n${cappedCount} files have headings that would be capped at h6.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
