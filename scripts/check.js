const { execSync } = require("child_process");
const path = require("path");
const { MAP_IDS, PRODUCTS, VALID_PRODUCTS, parseProductFlag } = require("./map_config.js");
const { fetchMapMeta, fetchMapToc, batchFetchTopicTimestamps, readSnapshot, writeSnapshot, SNAPSHOT_VERSION } = require("./snapshot.js");

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
      if (mapData.needsInitialFetch) {
        lines.push(`  ${mapName}: not in snapshot — will fetch on --apply`);
        continue;
      }
      if (!data.changed) continue;

      const parts = [];
      if (mapData.republished) {
        if (mapData.added > 0 || mapData.removed > 0) {
          parts.push(`${mapData.added} added, ${mapData.removed} removed`);
        }
        if (mapData.reordered) parts.push("reordered");
      }
      if (mapData.topicsUpdated > 0) {
        parts.push(`${mapData.topicsUpdated} topics updated`);
      }
      if (mapData.staleTopics > 0) {
        const noun = mapData.staleTopics === 1 ? "stale topic" : "stale topics";
        parts.push(`${mapData.staleTopics} ${noun}`);
      }
      if (mapData.republished && parts.length === 0) {
        parts.push("no TOC changes");
      }
      if (parts.length === 0) {
        lines.push(`  ${mapName}: no changes`);
      } else {
        lines.push(`  ${mapName}: ${parts.join(", ")}`);
      }
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
  const exitCode = process.argv.includes("--exit-code");
  const formatIdx = process.argv.indexOf("--format");
  const format = formatIdx !== -1 && process.argv[formatIdx + 1] === "text" ? "text" : "json";
  return { product, apply, exitCode, format };
}

async function checkTopicTimestamps(mapId, snapshotTopics) {
  const { timestamps: freshTimestamps, errors } = await batchFetchTopicTimestamps(mapId, snapshotTopics);
  const staleIds = new Set(errors.map((e) => e.contentId));
  let updatedCount = 0;
  for (const topic of snapshotTopics) {
    if (staleIds.has(topic.contentId)) continue;
    const fresh = freshTimestamps[topic.contentId];
    if (!topic.lastTechChangeTimestamp || topic.lastTechChangeTimestamp !== fresh) {
      updatedCount++;
    }
  }
  return { updatedCount, freshTimestamps, topicErrors: errors };
}

async function checkProduct(product, snapshot) {
  const mapNames = PRODUCTS[product];
  const result = { changed: false, maps: {} };
  const freshData = {};

  for (const mapName of mapNames) {
    const mapId = MAP_IDS[mapName];
    try {
      if (!snapshot.maps[mapName]) {
        console.log(`  ${mapName}: not in snapshot — will fetch on --apply`);
        result.maps[mapName] = { needsInitialFetch: true };
        result.changed = true;
        continue;
      }

      const meta = await fetchMapMeta(mapId);
      const snapshotTopics = snapshot.maps[mapName].topics;

      let republished = false;
      let diff = { added: [], removed: [], reordered: false };
      let newTopics = null;

      if (meta.lastPublication !== snapshot.maps[mapName].lastPublication) {
        republished = true;
        newTopics = await fetchMapToc(mapId);
        diff = diffTopics(snapshotTopics, newTopics);
      }

      console.log(`  ${mapName}: checking ${snapshotTopics.length} topics for updates...`);
      const { updatedCount, freshTimestamps, topicErrors } = await checkTopicTimestamps(mapId, snapshotTopics);

      for (const err of topicErrors) {
        console.error(`  ${mapName}: topic ${err.contentId} — ${err.message} (will refetch)`);
      }

      const mapChanged = republished || updatedCount > 0 || topicErrors.length > 0;
      result.maps[mapName] = {
        republished,
        added: diff.added.length,
        removed: diff.removed.length,
        reordered: diff.reordered,
        topicsUpdated: updatedCount,
        staleTopics: topicErrors.length,
      };

      if (mapChanged) {
        result.changed = true;
        const topicsForSnapshot = (newTopics || snapshotTopics).map((t) => ({
          ...t,
          lastTechChangeTimestamp: freshTimestamps[t.contentId] ?? t.lastTechChangeTimestamp ?? null,
        }));
        freshData[mapName] = {
          mapId,
          lastPublication: meta.lastPublication,
          topicCount: topicsForSnapshot.length,
          topics: topicsForSnapshot,
        };
      }
    } catch (err) {
      console.error(`Error checking ${mapName}: ${err.message}`);
      result.maps[mapName] = { error: true, message: err.message };
    }
  }

  return { result, freshData };
}

async function main() {
  const { product: targetProduct, apply, exitCode, format } = parseFlags();
  const products = targetProduct ? [targetProduct] : VALID_PRODUCTS;
  const report = { timestamp: new Date().toISOString(), products: {} };
  let hasErrors = false;

  for (const product of products) {
    const snapshot = readSnapshot(product);
    if (!snapshot) {
      console.error(`[${product}] no snapshot — run: npm run snapshot:cortex:${product}`);
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
        execSync(`npm run fetch:cortex:${product} && npm run fix:cortex:${product} && npm run snapshot:cortex:${product}`, {
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

  if (exitCode) {
    const hasChanges = Object.values(report.products).some((p) => p.changed);
    if (hasChanges) process.exit(2);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}

module.exports = { diffTopics, formatTextReport };
