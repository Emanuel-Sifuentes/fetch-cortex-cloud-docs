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
    const errorMaps = Object.entries(data.maps).filter(([, m]) => m.error);

    if (!data.changed && errorMaps.length === 0) {
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

module.exports = { diffTopics, formatTextReport };
