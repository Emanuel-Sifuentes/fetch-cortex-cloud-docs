// scripts/compute_ownership.js
function normalizeTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function computeOwnership(tocsByProduct, hierarchy) {
  const claimed = new Map();
  const claimedTitles = new Map();
  const owned = {};
  const titleMatched = {};
  const stats = {};

  for (const product of hierarchy) {
    owned[product] = [];
    const entries = tocsByProduct[product] || [];

    // Deduplicate by contentId within this product
    const seen = new Set();
    const unique = [];
    for (const e of entries) {
      if (!seen.has(e.contentId)) {
        seen.add(e.contentId);
        unique.push(e);
      }
    }

    let droppedById = 0;
    let droppedByTitle = 0;

    for (const e of unique) {
      const norm = normalizeTitle(e.title);

      if (claimed.has(e.contentId)) {
        droppedById++;
        continue;
      }

      if (claimedTitles.has(norm)) {
        droppedByTitle++;
        const owner = claimedTitles.get(norm);
        titleMatched[e.contentId] = {
          ownedBy: owner.product,
          ownerContentId: owner.contentId,
        };
        continue;
      }

      claimed.set(e.contentId, product);
      claimedTitles.set(norm, { product, contentId: e.contentId });
      owned[product].push(e.contentId);
    }

    stats[product] = {
      total: unique.length,
      owned: owned[product].length,
      droppedById,
      droppedByTitle,
    };
  }

  return { owned, titleMatched, stats };
}

module.exports = { computeOwnership, normalizeTitle };
