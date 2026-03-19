const fs = require("fs");
const path = require("path");
const https = require("https");
const { MAP_IDS, COMBINED_FILES, parseMapFlag } = require("./map_config.js");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const mapFlag = parseMapFlag("runtime");
const MAP_ID = MAP_IDS[mapFlag];
const DIR = path.join(__dirname, "..", "sources_fetch");

function fetch(urlPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE);
    https.get({ hostname: url.hostname, path: url.pathname, headers: { Accept: "application/json" } }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${urlPath}`));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(JSON.parse(Buffer.concat(chunks).toString())));
    }).on("error", reject);
  });
}

function flattenToc(nodes, depth = 0) {
  const result = [];
  for (const node of nodes) {
    result.push({ title: node.title, tocId: node.tocId, contentId: node.contentId, depth });
    if (node.children && node.children.length) {
      result.push(...flattenToc(node.children, depth + 1));
    }
  }
  return result;
}

function parseFile(filepath) {
  const content = fs.readFileSync(filepath, "utf-8");
  const lines = content.split("\n");

  let title = "", contentId = "", depth = -1;
  let inFm = false, fmCount = 0;
  for (const line of lines) {
    if (line === "---") { fmCount++; inFm = fmCount === 1; continue; }
    if (inFm) {
      const tm = line.match(/^title:\s*"(.*)"/);
      if (tm) title = tm[1];
      const cm = line.match(/^contentId:\s*"(.*)"/);
      if (cm) contentId = cm[1];
      const dm = line.match(/^depth:\s*(\d+)/);
      if (dm) depth = parseInt(dm[1]);
    }
  }

  // Extract headings outside frontmatter and code blocks
  let pastFm = false;
  fmCount = 0;
  let inCodeBlock = false;
  const headings = [];
  for (const line of lines) {
    if (line === "---") { fmCount++; if (fmCount === 2) pastFm = true; continue; }
    if (!pastFm) continue;
    if (/^```/.test(line)) { inCodeBlock = !inCodeBlock; continue; }
    if (inCodeBlock) continue;
    const hm = line.match(/^(#{1,6}) (.+)$/);
    if (hm) {
      headings.push({ level: hm[1].length, text: hm[2].trim() });
    }
  }

  return { title, contentId, depth, headings, filename: path.basename(filepath) };
}

async function main() {
  console.log("Fetching TOC from API...\n");
  const toc = await fetch(`/api/khub/maps/${MAP_ID}/toc`);
  const tocFlat = flattenToc(toc);

  const files = fs.readdirSync(DIR)
    .filter(f => f.endsWith(".md") && !f.startsWith("cortex-cloud-") && f !== "README.md")
    .sort();

  // Build map from contentId to parsed file
  const fileMap = {};
  for (const f of files) {
    const parsed = parseFile(path.join(DIR, f));
    fileMap[parsed.contentId] = parsed;
  }

  // Audit 1: Does every TOC entry have a corresponding file?
  let missingFiles = 0;
  for (const entry of tocFlat) {
    if (!fileMap[entry.contentId]) {
      console.log(`MISSING FILE: "${entry.title}" (contentId=${entry.contentId})`);
      missingFiles++;
    }
  }
  console.log(`TOC entries: ${tocFlat.length}, Files: ${files.length}, Missing: ${missingFiles}\n`);

  // Audit 2: Does each file's h1 match its TOC title?
  let titleMismatches = 0;
  for (const entry of tocFlat) {
    const file = fileMap[entry.contentId];
    if (!file) continue;
    const h1 = file.headings.find(h => h.level === 1);
    if (!h1) {
      console.log(`NO H1: ${file.filename} (expected "${entry.title}")`);
      titleMismatches++;
    } else if (h1.text !== entry.title) {
      console.log(`TITLE MISMATCH: ${file.filename}`);
      console.log(`  TOC:  "${entry.title}"`);
      console.log(`  File: "${h1.text}"`);
      titleMismatches++;
    }
  }
  console.log(`\nTitle mismatches: ${titleMismatches}\n`);

  // Audit 3: Does the depth in frontmatter match the TOC depth?
  let depthMismatches = 0;
  for (const entry of tocFlat) {
    const file = fileMap[entry.contentId];
    if (!file) continue;
    if (file.depth !== entry.depth) {
      console.log(`DEPTH MISMATCH: ${file.filename} — frontmatter=${file.depth}, TOC=${entry.depth}`);
      depthMismatches++;
    }
  }
  console.log(`Depth mismatches: ${depthMismatches}\n`);

  // Audit 4: Heading hierarchy consistency
  // Each file should have: h1 (title), then h2+ for sub-sections
  // No heading should skip levels (e.g., h1 → h4 without h2, h3)
  let hierarchyIssues = 0;
  for (const entry of tocFlat) {
    const file = fileMap[entry.contentId];
    if (!file || file.headings.length <= 1) continue;

    const subHeadings = file.headings.filter(h => h.level > 1);
    if (subHeadings.length === 0) continue;

    // Check: first sub-heading should be h2
    if (subHeadings[0].level !== 2) {
      console.log(`HIERARCHY: ${file.filename} — first sub-heading is h${subHeadings[0].level} (expected h2): "${subHeadings[0].text}"`);
      hierarchyIssues++;
      continue;
    }

    // Check: no level skips (e.g., h2 → h4)
    let prevLevel = 1; // after h1 title
    for (const h of subHeadings) {
      if (h.level > prevLevel + 1) {
        console.log(`LEVEL SKIP: ${file.filename} — h${prevLevel} → h${h.level}: "${h.text}"`);
        hierarchyIssues++;
        break;
      }
      prevLevel = h.level;
    }
  }
  console.log(`\nHeading hierarchy issues: ${hierarchyIssues}\n`);

  // Audit 5: TOC parent-child vs heading containment
  // If a TOC node has children, those children should NOT appear as headings in the parent's file
  let tocHeadingOverlap = 0;
  function checkOverlap(nodes) {
    for (const node of nodes) {
      if (!node.children || node.children.length === 0) continue;
      const parentFile = fileMap[node.contentId];
      if (!parentFile) continue;
      const parentHeadingTexts = new Set(parentFile.headings.map(h => h.text.toLowerCase()));
      for (const child of node.children) {
        if (parentHeadingTexts.has(child.title.toLowerCase())) {
          console.log(`OVERLAP: "${child.title}" is both a TOC child AND a heading in parent ${parentFile.filename}`);
          tocHeadingOverlap++;
        }
      }
      checkOverlap(node.children);
    }
  }
  checkOverlap(toc);
  console.log(`TOC/heading overlaps: ${tocHeadingOverlap}\n`);

  // Audit 6: Combined file heading levels match TOC depth
  const combinedPath = path.join(DIR, COMBINED_FILES[mapFlag]);
  let combinedHeadingMismatches = 0;
  if (fs.existsSync(combinedPath)) {
    console.log("Checking combined file heading levels...");
    const combinedContent = fs.readFileSync(combinedPath, "utf-8");
    const combinedLines = combinedContent.split("\n");

    // Extract all headings with line numbers (skip code blocks)
    const combinedHeadings = [];
    let inCB = false;
    for (let i = 0; i < combinedLines.length; i++) {
      if (/^```/.test(combinedLines[i])) { inCB = !inCB; continue; }
      if (inCB) continue;
      const hm = combinedLines[i].match(/^(#{1,6}) (.+)$/);
      if (hm) {
        combinedHeadings.push({ level: hm[1].length, text: hm[2].trim(), line: i + 1 });
      }
    }

    // Walk TOC entries in order, matching each to the next heading with the same title.
    // Use two-phase matching to avoid false matches on common titles like "Overview"
    // that appear as sub-headings in other topics:
    //   Phase 1: match on text AND expected level (exact match)
    //   Phase 2: if not found, match on text only (catches level mismatches)
    let headingIdx = 0;
    for (const entry of tocFlat) {
      const expectedLevel = entry.depth + 1;
      let found = false;

      // Phase 1: exact match (text + level)
      for (let i = headingIdx; i < combinedHeadings.length; i++) {
        if (combinedHeadings[i].text === entry.title && combinedHeadings[i].level === expectedLevel) {
          headingIdx = i + 1;
          found = true;
          break;
        }
      }

      // Phase 2: text-only match (level mismatch detection)
      if (!found) {
        for (let i = headingIdx; i < combinedHeadings.length; i++) {
          if (combinedHeadings[i].text === entry.title) {
            console.log(
              `COMBINED LEVEL: "${entry.title}" at line ${combinedHeadings[i].line} — ` +
              `expected h${expectedLevel} (depth ${entry.depth}), got h${combinedHeadings[i].level}`
            );
            combinedHeadingMismatches++;
            headingIdx = i + 1;
            found = true;
            break;
          }
        }
      }

      if (!found) {
        console.log(`COMBINED MISSING: "${entry.title}" not found in combined file`);
        combinedHeadingMismatches++;
      }
    }
    console.log(`Combined file heading mismatches: ${combinedHeadingMismatches}\n`);
  } else {
    console.log("Combined file not found — skipping Audit 6.\n");
  }

  // Summary
  console.log("=== SUMMARY ===");
  console.log(`TOC entries:              ${tocFlat.length}`);
  console.log(`Files:                    ${files.length}`);
  console.log(`Missing files:            ${missingFiles}`);
  console.log(`Title mismatches:         ${titleMismatches}`);
  console.log(`Depth mismatches:         ${depthMismatches}`);
  console.log(`Heading hierarchy issues: ${hierarchyIssues}`);
  console.log(`TOC/heading overlaps:     ${tocHeadingOverlap}`);
  console.log(`Combined heading mismatches: ${combinedHeadingMismatches}`);
}

main().catch(err => { console.error(err); process.exit(1); });
