const https = require("https");
const fs = require("fs");
const path = require("path");
const { MAP_IDS, PRODUCTS, VALID_PRODUCTS, parseProductFlag } = require("./map_config.js");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const METADATA_DIR = path.join(__dirname, "..", "metadata");
const SNAPSHOT_VERSION = 1;

function httpGet(urlPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE);
    const opts = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: { Accept: "application/json" },
    };
    https
      .get(opts, (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${urlPath}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString()));
      })
      .on("error", reject);
  });
}

function flattenToc(nodes, depth = 0) {
  const result = [];
  for (const node of nodes) {
    result.push({ contentId: node.contentId, tocId: node.tocId, title: node.title, depth });
    if (node.children && node.children.length) {
      result.push(...flattenToc(node.children, depth + 1));
    }
  }
  return result;
}

async function fetchMapMeta(mapId) {
  const body = await httpGet(`/api/khub/maps/${mapId}`);
  const data = JSON.parse(body);
  return { lastPublication: data["ft:lastPublication"] };
}

async function fetchMapToc(mapId) {
  const body = await httpGet(`/api/khub/maps/${mapId}/toc`);
  const toc = JSON.parse(body);
  return flattenToc(toc);
}

function readSnapshot(product) {
  const filePath = path.join(METADATA_DIR, `${product}.json`);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    if (err.code === "ENOENT") return null;
    throw err;
  }
}

function writeSnapshot(product, snapshot) {
  fs.mkdirSync(METADATA_DIR, { recursive: true });
  const filePath = path.join(METADATA_DIR, `${product}.json`);
  fs.writeFileSync(filePath, JSON.stringify(snapshot, null, 2) + "\n", "utf-8");
}

async function snapshotProduct(product) {
  const mapNames = PRODUCTS[product];
  const maps = {};

  for (const mapName of mapNames) {
    const mapId = MAP_IDS[mapName];
    console.log(`  ${mapName}: fetching metadata...`);
    const meta = await fetchMapMeta(mapId);

    console.log(`  ${mapName}: fetching TOC...`);
    const topics = await fetchMapToc(mapId);

    maps[mapName] = {
      mapId,
      lastPublication: meta.lastPublication,
      topicCount: topics.length,
      topics,
    };
    console.log(`  ${mapName}: ${topics.length} topics`);
  }

  return {
    version: SNAPSHOT_VERSION,
    product,
    lastChecked: new Date().toISOString(),
    maps,
  };
}

async function main() {
  const targetProduct = parseProductFlag();
  const products = targetProduct ? [targetProduct] : VALID_PRODUCTS;

  for (const product of products) {
    console.log(`\nSnapshotting ${product}...`);
    const snapshot = await snapshotProduct(product);
    writeSnapshot(product, snapshot);
    console.log(`  → metadata/${product}.json`);
  }

  console.log("\nDone.");
}

module.exports = {
  flattenToc,
  httpGet,
  fetchMapMeta,
  fetchMapToc,
  readSnapshot,
  writeSnapshot,
  snapshotProduct,
  METADATA_DIR,
  SNAPSHOT_VERSION,
};

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
