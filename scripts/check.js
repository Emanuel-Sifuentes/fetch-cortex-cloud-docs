const { execSync } = require("child_process");
const path = require("path");
const { MAP_IDS, PRODUCTS, VALID_PRODUCTS, parseProductFlag } = require("./map_config.js");
const { fetchMapMeta, fetchMapToc, readSnapshot, writeSnapshot, SNAPSHOT_VERSION } = require("./snapshot.js");

function diffTopics(oldTopics, newTopics) {
  const oldIds = oldTopics.map((t) => t.contentId);
  const newIds = newTopics.map((t) => t.contentId);
  const oldSet = new Set(oldIds);
  const newSet = new Set(newIds);

  const added = newIds.filter((id) => !oldSet.has(id));
  const removed = oldIds.filter((id) => !newSet.has(id));

  const oldIntersection = oldIds.filter((id) => newSet.has(id));
  const newIntersection = newIds.filter((id) => oldSet.has(id));
  const reordered =
    oldIntersection.length > 0 &&
    JSON.stringify(oldIntersection) !== JSON.stringify(newIntersection);

  return { added, removed, reordered };
}

function formatTextReport(report) {
  const lines = [];
  let changedCount = 0;

  for (const [product, data] of Object.entries(report.products)) {
    const hasErrors = Object.values(data.maps).some((m) => m.error);

    if (!data.changed && !hasErrors) {
      lines.push(`[${product}] no changes`);
      continue;
    }

    if (data.changed) {
      changedCount++;
      lines.push(`[${product}] changed`);
    } else {
      lines.push(`[${product}] no changes`);
    }

    for (const [mapName, mapData] of Object.entries(data.maps)) {
      if (mapData.error) {
        lines.push(`  ${mapName}: error — ${mapData.message}`);
        continue;
      }
      if (!data.changed) continue;
      if (!mapData.republished) continue;
      const parts = [];
      if (mapData.added > 0 || mapData.removed > 0) {
        parts.push(`${mapData.added} added, ${mapData.removed} removed`);
      }
      if (mapData.reordered) parts.push("reordered");
      if (parts.length === 0) parts.push("no TOC changes");
      lines.push(`  ${mapName}: ${parts.join(", ")}`);
    }
  }

  lines.push("");
  if (changedCount > 0) {
    const noun = changedCount === 1 ? "product" : "products";
    lines.push(`${changedCount} ${noun} need re-fetch. Run with --apply to update.`);
  } else {
    lines.push("All products up to date.");
  }

  return lines.join("\n");
}

function parseFlags() {
  const product = parseProductFlag();
  const apply = process.argv.includes("--apply");
  const formatIdx = process.argv.indexOf("--format");
  const format = formatIdx !== -1 && process.argv[formatIdx + 1] === "text" ? "text" : "json";
  return { product, apply, format };
}

async function checkProduct(product, snapshot) {
  const mapNames = PRODUCTS[product];
  const result = { changed: false, maps: {} };
  const freshData = {};

  for (const mapName of mapNames) {
    const mapId = MAP_IDS[mapName];
    try {
      if (!snapshot.maps[mapName]) {
        throw new Error(`map "${mapName}" not in snapshot — run: npm run snapshot:${product}`);
      }

      const meta = await fetchMapMeta(mapId);

      if (meta.lastPublication === snapshot.maps[mapName].lastPublication) {
        result.maps[mapName] = { republished: false, added: 0, removed: 0, reordered: false };
        continue;
      }

      const newTopics = await fetchMapToc(mapId);
      const diff = diffTopics(snapshot.maps[mapName].topics, newTopics);

      result.maps[mapName] = {
        republished: true,
        added: diff.added.length,
        removed: diff.removed.length,
        reordered: diff.reordered,
      };
      result.changed = true;

      freshData[mapName] = {
        mapId,
        lastPublication: meta.lastPublication,
        topicCount: newTopics.length,
        topics: newTopics,
      };
    } catch (err) {
      console.error(`Error checking ${mapName}: ${err.message}`);
      result.maps[mapName] = { error: true, message: err.message };
    }
  }

  return { result, freshData };
}

async function main() {
  const { product: targetProduct, apply, format } = parseFlags();
  const products = targetProduct ? [targetProduct] : VALID_PRODUCTS;
  const report = { timestamp: new Date().toISOString(), products: {} };
  let hasErrors = false;

  for (const product of products) {
    const snapshot = readSnapshot(product);
    if (!snapshot) {
      console.error(`[${product}] no snapshot — run: npm run snapshot:${product}`);
      hasErrors = true;
      continue;
    }

    const { result, freshData } = await checkProduct(product, snapshot);
    report.products[product] = result;

    if (Object.values(result.maps).some((m) => m.error)) hasErrors = true;

    if (!apply && Object.keys(freshData).length > 0) {
      try {
        const updatedMaps = {};
        for (const mapName of PRODUCTS[product]) {
          updatedMaps[mapName] = freshData[mapName] || snapshot.maps[mapName];
        }
        writeSnapshot(product, {
          version: SNAPSHOT_VERSION,
          product,
          lastChecked: new Date().toISOString(),
          maps: updatedMaps,
        });
      } catch (err) {
        console.error(`WARNING: snapshot update failed for ${product}: ${err.message}`);
        hasErrors = true;
      }
    }
  }

  if (format === "text") {
    console.log(formatTextReport(report));
  } else {
    console.log(JSON.stringify(report, null, 2));
  }

  if (apply) {
    const changed = Object.entries(report.products)
      .filter(([, data]) => data.changed)
      .map(([name]) => name);

    for (const product of changed) {
      console.log(`\n=== Re-fetching ${product} ===\n`);
      try {
        execSync(`npm run fetch:${product} && npm run fix:${product}`, {
          cwd: path.join(__dirname, ".."),
          stdio: "inherit",
        });
      } catch (err) {
        console.error(`FAILED: re-fetch for ${product}`);
        hasErrors = true;
      }
    }
  }

  if (hasErrors) process.exit(1);
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}

module.exports = { diffTopics, formatTextReport };
