// scripts/compute_ownership.js
const https = require("https");
const fs = require("fs");
const path = require("path");
const { MAP_IDS, PRODUCTS, DEDUP_HIERARCHY, DEDUP_EXCLUDED } = require("./map_config.js");

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

      if (claimedTitles.has(norm) && claimedTitles.get(norm).product !== product) {
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

const BASE = "https://docs-cortex.paloaltonetworks.com";
const METADATA_DIR = path.join(__dirname, "..", "metadata");

function fetchJson(urlPath) {
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

async function main() {
  // Build list of all maps to fetch (excluding DEDUP_EXCLUDED)
  const fetchTargets = [];
  for (const product of DEDUP_HIERARCHY) {
    for (const mapName of PRODUCTS[product]) {
      if (!DEDUP_EXCLUDED.includes(mapName)) {
        fetchTargets.push({ product, mapName });
      }
    }
  }

  // Fetch all TOCs in parallel
  console.log(`Fetching ${fetchTargets.length} TOCs...`);
  const results = await Promise.all(
    fetchTargets.map(async ({ product, mapName }) => {
      const toc = await fetchJson(`/api/khub/maps/${MAP_IDS[mapName]}/toc`);
      console.log(`  ${mapName}: ${toc.length} top-level nodes`);
      return { product, entries: flattenToc(toc) };
    })
  );

  // Group by product
  const tocsByProduct = {};
  for (const product of DEDUP_HIERARCHY) {
    tocsByProduct[product] = [];
  }
  for (const { product, entries } of results) {
    tocsByProduct[product].push(...entries);
  }

  const result = computeOwnership(tocsByProduct, DEDUP_HIERARCHY);

  const manifest = {
    meta: {
      generatedAt: new Date().toISOString(),
      hierarchy: DEDUP_HIERARCHY,
    },
    owned: result.owned,
    titleMatched: result.titleMatched,
    stats: result.stats,
  };

  fs.mkdirSync(METADATA_DIR, { recursive: true });
  const outPath = path.join(METADATA_DIR, "ownership.json");
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`\nWritten: ${outPath}`);

  for (const product of DEDUP_HIERARCHY) {
    const s = result.stats[product];
    console.log(
      `[ownership] ${product.padEnd(8)} ${String(s.total).padStart(5)} total, ` +
      `${String(s.owned).padStart(5)} owned, ` +
      `${String(s.droppedById).padStart(5)} droppedById, ` +
      `${String(s.droppedByTitle).padStart(5)} droppedByTitle`
    );
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
