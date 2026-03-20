// scripts/overlap_report.js
// Generates a CSV spreadsheet of all topic overlap between product maps.
// Usage: node scripts/overlap_report.js [--out path/to/output.csv]

const fs = require("fs");
const path = require("path");

const METADATA_DIR = path.join(__dirname, "..", "metadata");
const SOURCES_DIR = path.join(__dirname, "..", "sources_fetch");

const PRODUCT_FILES = {
  cloud: "cloud.json",
  xdr: "xdr.json",
  xsiam: "xsiam.json",
  agentix: "agentix.json",
  gateway: "gateway.json",
};

function normalizeTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function loadAllTopics() {
  const allTopics = [];

  for (const [product, file] of Object.entries(PRODUCT_FILES)) {
    const filePath = path.join(METADATA_DIR, file);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    for (const [mapName, mapData] of Object.entries(data.maps)) {
      for (const topic of mapData.topics) {
        allTopics.push({
          product,
          map: mapName,
          contentId: topic.contentId,
          title: topic.title,
          normalizedTitle: normalizeTitle(topic.title),
          depth: topic.depth,
        });
      }
    }
  }

  return allTopics;
}

function buildContentIndex(allTopics) {
  const byContentId = new Map();
  const byNormTitle = new Map();

  for (const t of allTopics) {
    if (!byContentId.has(t.contentId)) byContentId.set(t.contentId, []);
    byContentId.get(t.contentId).push(t);

    if (!byNormTitle.has(t.normalizedTitle)) byNormTitle.set(t.normalizedTitle, []);
    byNormTitle.get(t.normalizedTitle).push(t);
  }

  return { byContentId, byNormTitle };
}

function extractFrontmatter(raw) {
  if (!raw.startsWith("---")) return { meta: {}, body: raw };
  const endIdx = raw.indexOf("---", 3);
  if (endIdx === -1) return { meta: {}, body: raw };
  const front = raw.slice(3, endIdx).trim();
  const meta = {};
  for (const line of front.split("\n")) {
    const m = line.match(/^(\w+):\s*"?([^"]*)"?\s*$/);
    if (m) meta[m[1]] = m[2];
  }
  return { meta, body: raw.slice(endIdx + 3).trim() };
}

const COMBINED_FILES = {
  appsec: "cortex-cloud-appsec-combined.md",
  posture: "cortex-cloud-posture-combined.md",
  runtime: "cortex-cloud-runtime-combined.md",
  cortex_gateway: "cortex-gateway-combined.md",
  xdr_5: "cortex-xdr-5-combined.md",
  xdr_compatibility: "cortex-xdr-compatibility-combined.md",
  xsiam_3: "cortex-xsiam-3-combined.md",
  agentix: "cortex-agentix-combined.md",
};

function parseCombinedFile(mapName, metaTopics) {
  const combinedPath = path.join(SOURCES_DIR, mapName, COMBINED_FILES[mapName] || "");
  if (!COMBINED_FILES[mapName] || !fs.existsSync(combinedPath)) return new Map();

  const raw = fs.readFileSync(combinedPath, "utf-8");
  const lines = raw.split("\n");

  // Parse into sections: each heading starts a section
  const sections = [];
  let current = null;

  for (const line of lines) {
    const hMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (hMatch) {
      if (current) sections.push(current);
      const depth = hMatch[1].length - 1; // H1=depth0, H2=depth1, etc.
      current = { title: hMatch[2].trim(), depth, lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) sections.push(current);

  // Build title+depth → content map from sections
  const sectionMap = new Map();
  for (const sec of sections) {
    const key = normalizeTitle(sec.title) + "|" + sec.depth;
    if (!sectionMap.has(key)) {
      sectionMap.set(key, sec.lines.join("\n").trim());
    }
  }

  // Match metadata topics to sections
  const result = new Map();
  for (const t of metaTopics) {
    const key = normalizeTitle(t.title) + "|" + t.depth;
    const content = sectionMap.get(key);
    if (content) {
      result.set(t.contentId + "|" + mapName, content);
    }
  }

  return result;
}

function loadContentCache(allTopics) {
  const cache = new Map();

  // Phase 1: Load from individual numbered files
  for (const mapName of fs.readdirSync(SOURCES_DIR)) {
    const mapDir = path.join(SOURCES_DIR, mapName);
    if (!fs.statSync(mapDir).isDirectory()) continue;

    const files = fs.readdirSync(mapDir).filter((f) => /^\d{4}-.*\.md$/.test(f));
    for (const file of files) {
      try {
        const raw = fs.readFileSync(path.join(mapDir, file), "utf-8");
        const { meta, body } = extractFrontmatter(raw);
        if (meta.contentId) {
          cache.set(meta.contentId + "|" + mapName, body);
        }
      } catch {
        // skip unreadable
      }
    }
  }

  // Phase 2: Fill gaps from combined files for maps with missing content
  const topicsByMap = new Map();
  for (const t of allTopics) {
    if (!topicsByMap.has(t.map)) topicsByMap.set(t.map, []);
    topicsByMap.get(t.map).push(t);
  }

  let combinedFills = 0;
  for (const [mapName, topics] of topicsByMap) {
    // Check how many topics are missing
    const missing = topics.filter((t) => !cache.has(t.contentId + "|" + t.map));
    if (missing.length === 0) continue;

    const fromCombined = parseCombinedFile(mapName, topics);
    for (const [key, content] of fromCombined) {
      if (!cache.has(key)) {
        cache.set(key, content);
        combinedFills++;
      }
    }
  }

  console.log(`  ${combinedFills} additional entries from combined files`);
  return cache;
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

function jaccardSimilarity(textA, textB) {
  const tokensA = tokenize(textA);
  const tokensB = tokenize(textB);

  if (tokensA.length === 0 && tokensB.length === 0) return 1;
  if (tokensA.length === 0 || tokensB.length === 0) return 0;

  // Use multiset (bag) Jaccard for better sensitivity
  const bagA = new Map();
  const bagB = new Map();
  for (const w of tokensA) bagA.set(w, (bagA.get(w) || 0) + 1);
  for (const w of tokensB) bagB.set(w, (bagB.get(w) || 0) + 1);

  const allKeys = new Set([...bagA.keys(), ...bagB.keys()]);
  let intersection = 0;
  let union = 0;
  for (const key of allKeys) {
    const a = bagA.get(key) || 0;
    const b = bagB.get(key) || 0;
    intersection += Math.min(a, b);
    union += Math.max(a, b);
  }

  return union === 0 ? 1 : intersection / union;
}

function findOverlaps(allTopics, contentCache) {
  const { byContentId, byNormTitle } = buildContentIndex(allTopics);
  const rows = [];
  const seen = new Set();

  // 1) ContentId overlaps: same contentId across different maps
  for (const [contentId, entries] of byContentId) {
    if (entries.length < 2) continue;

    // Get unique map entries (dedup within same map)
    const byMap = new Map();
    for (const e of entries) {
      if (!byMap.has(e.map)) byMap.set(e.map, e);
    }
    const unique = [...byMap.values()];
    if (unique.length < 2) continue;

    for (let i = 0; i < unique.length; i++) {
      for (let j = i + 1; j < unique.length; j++) {
        const a = unique[i];
        const b = unique[j];
        const pairKey = `cid|${contentId}|${a.map}|${b.map}`;
        if (seen.has(pairKey)) continue;
        seen.add(pairKey);

        rows.push({
          matchType: "contentId",
          contentId_A: a.contentId,
          contentId_B: b.contentId,
          title_A: a.title,
          title_B: b.title,
          product_A: a.product,
          map_A: a.map,
          product_B: b.product,
          map_B: b.map,
          depth_A: a.depth,
          depth_B: b.depth,
          similarity: 1.0,
        });
      }
    }
  }

  // 2) Title overlaps: same normalized title, different contentId, across different maps
  for (const [normTitle, entries] of byNormTitle) {
    const byMap = new Map();
    for (const e of entries) {
      if (!byMap.has(e.map)) byMap.set(e.map, e);
    }
    const unique = [...byMap.values()];
    if (unique.length < 2) continue;

    for (let i = 0; i < unique.length; i++) {
      for (let j = i + 1; j < unique.length; j++) {
        const a = unique[i];
        const b = unique[j];

        // Skip if same contentId (already captured above)
        if (a.contentId === b.contentId) continue;

        const pairKey = `title|${normTitle}|${a.map}|${b.map}`;
        if (seen.has(pairKey)) continue;
        seen.add(pairKey);

        // Compute content similarity if we have both files
        const contentA = contentCache.get(a.contentId + "|" + a.map);
        const contentB = contentCache.get(b.contentId + "|" + b.map);

        let similarity = null;
        if (contentA && contentB) {
          similarity = jaccardSimilarity(contentA, contentB);
        }

        rows.push({
          matchType: "title",
          contentId_A: a.contentId,
          contentId_B: b.contentId,
          title_A: a.title,
          title_B: b.title,
          product_A: a.product,
          map_A: a.map,
          product_B: b.product,
          map_B: b.map,
          depth_A: a.depth,
          depth_B: b.depth,
          similarity,
        });
      }
    }
  }

  // Sort by min depth, then matchType (contentId first), then title
  rows.sort((a, b) => {
    const depthA = Math.min(a.depth_A, a.depth_B);
    const depthB = Math.min(b.depth_A, b.depth_B);
    if (depthA !== depthB) return depthA - depthB;
    if (a.matchType !== b.matchType) return a.matchType === "contentId" ? -1 : 1;
    return a.title_A.localeCompare(b.title_A);
  });

  return rows;
}

function escapeCsv(val) {
  if (val === null || val === undefined) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function toCsv(rows) {
  const headers = [
    "match_type",
    "depth_A",
    "depth_B",
    "similarity",
    "product_A",
    "map_A",
    "product_B",
    "map_B",
    "title_A",
    "title_B",
    "contentId_A",
    "contentId_B",
  ];

  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(
      [
        escapeCsv(row.matchType),
        escapeCsv(row.depth_A),
        escapeCsv(row.depth_B),
        row.similarity !== null ? escapeCsv(row.similarity.toFixed(4)) : "",
        escapeCsv(row.product_A),
        escapeCsv(row.map_A),
        escapeCsv(row.product_B),
        escapeCsv(row.map_B),
        escapeCsv(row.title_A),
        escapeCsv(row.title_B),
        escapeCsv(row.contentId_A),
        escapeCsv(row.contentId_B),
      ].join(",")
    );
  }

  return lines.join("\n") + "\n";
}

function main() {
  const outIdx = process.argv.indexOf("--out");
  const outPath =
    outIdx !== -1 && outIdx + 1 < process.argv.length
      ? process.argv[outIdx + 1]
      : path.join(__dirname, "..", "overlap_report.csv");

  console.log("Loading metadata...");
  const allTopics = loadAllTopics();
  console.log(`  ${allTopics.length} total topics across all maps`);

  console.log("Building content cache from individual files...");
  const contentCache = loadContentCache(allTopics);
  console.log(`  ${contentCache.size} files loaded for content comparison`);

  console.log("Finding overlaps...");
  const rows = findOverlaps(allTopics, contentCache);

  const contentIdRows = rows.filter((r) => r.matchType === "contentId");
  const titleRows = rows.filter((r) => r.matchType === "title");
  const titleWithSim = titleRows.filter((r) => r.similarity !== null);

  console.log(`\nResults:`);
  console.log(`  ContentId matches: ${contentIdRows.length} (100% similarity)`);
  console.log(`  Title matches:     ${titleRows.length} total`);
  console.log(`    With content similarity: ${titleWithSim.length}`);
  console.log(`    Without content (files missing): ${titleRows.length - titleWithSim.length}`);
  console.log(`  Total overlap rows: ${rows.length}`);

  // Product-pair summary
  const pairSummary = new Map();
  for (const row of rows) {
    const pair = [row.product_A, row.product_B].sort().join(" <-> ");
    if (!pairSummary.has(pair)) pairSummary.set(pair, { contentId: 0, title: 0 });
    pairSummary.get(pair)[row.matchType]++;
  }

  console.log(`\nProduct-pair breakdown:`);
  for (const [pair, counts] of [...pairSummary.entries()].sort()) {
    console.log(`  ${pair.padEnd(25)} contentId: ${String(counts.contentId).padStart(5)}, title: ${String(counts.title).padStart(5)}`);
  }

  const csv = toCsv(rows);
  fs.writeFileSync(outPath, csv, "utf-8");
  console.log(`\nWritten: ${outPath}`);

  // Write summary CSV
  const summaryPath = outPath.replace(/\.csv$/, "_summary.csv");
  const summaryLines = ["section,key,value"];

  summaryLines.push("overview,total_topics," + allTopics.length);
  summaryLines.push("overview,total_overlap_rows," + rows.length);
  summaryLines.push("overview,contentId_matches," + contentIdRows.length);
  summaryLines.push("overview,title_matches," + titleRows.length);
  summaryLines.push("overview,title_with_content_sim," + titleWithSim.length);
  summaryLines.push("overview,title_without_content," + (titleRows.length - titleWithSim.length));

  summaryLines.push("");
  summaryLines.push("section,product_pair,contentId_overlap,title_overlap,total");
  for (const [pair, counts] of [...pairSummary.entries()].sort()) {
    summaryLines.push(`product_pairs,${pair},${counts.contentId},${counts.title},${counts.contentId + counts.title}`);
  }

  // Similarity distribution
  const simBuckets = [
    { label: "0.00-0.20", min: 0, max: 0.2 },
    { label: "0.20-0.40", min: 0.2, max: 0.4 },
    { label: "0.40-0.60", min: 0.4, max: 0.6 },
    { label: "0.60-0.80", min: 0.6, max: 0.8 },
    { label: "0.80-0.95", min: 0.8, max: 0.95 },
    { label: "0.95-1.00", min: 0.95, max: 1.01 },
  ];

  summaryLines.push("");
  summaryLines.push("section,similarity_range,count,percentage");
  for (const b of simBuckets) {
    const count = titleWithSim.filter((r) => r.similarity >= b.min && r.similarity < b.max).length;
    const pct = titleWithSim.length > 0 ? ((count / titleWithSim.length) * 100).toFixed(1) : "0.0";
    summaryLines.push(`similarity_dist,${b.label},${count},${pct}%`);
  }

  // Depth distribution
  summaryLines.push("");
  summaryLines.push("section,depth,contentId_count,title_count,total");
  const depthMap = new Map();
  for (const row of rows) {
    const d = Math.min(row.depth_A, row.depth_B);
    if (!depthMap.has(d)) depthMap.set(d, { contentId: 0, title: 0 });
    depthMap.get(d)[row.matchType]++;
  }
  for (const d of [...depthMap.keys()].sort((a, b) => a - b)) {
    const c = depthMap.get(d);
    summaryLines.push(`depth_dist,${d},${c.contentId},${c.title},${c.contentId + c.title}`);
  }

  fs.writeFileSync(summaryPath, summaryLines.join("\n") + "\n", "utf-8");
  console.log(`Written: ${summaryPath}`);
}

main();
