const fs = require("fs");
const path = require("path");
const { MAP_IDS, PRODUCTS, VALID_PRODUCTS, parseProductFlag } = require("./map_config.js");
const { httpGetWithRetry, sleep } = require("./http_retry.js");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const METADATA_DIR = path.join(__dirname, "..", "metadata");
const SNAPSHOT_VERSION = 2;
const CONCURRENCY = 10;
const DELAY_MS = 200;

const httpGet = (urlPath) => httpGetWithRetry(urlPath, { base: BASE });

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
  return { lastPublication: data.lastPublication };
}

async function fetchMapToc(mapId) {
  const body = await httpGet(`/api/khub/maps/${mapId}/toc`);
  const toc = JSON.parse(body);
  return flattenToc(toc);
}

function parseTopicMeta(data) {
  const entry = data.metadata.find((m) => m.key === "ft:lastTechChangeTimestamp");
  return { lastTechChangeTimestamp: entry ? entry.values[0] : null };
}

async function fetchTopicMeta(mapId, contentId) {
  const body = await httpGet(`/api/khub/maps/${mapId}/topics/${contentId}`);
  return parseTopicMeta(JSON.parse(body));
}

async function batchFetchTopicTimestamps(mapId, topics) {
  const timestamps = {};
  const errors = [];
  for (let i = 0; i < topics.length; i += CONCURRENCY) {
    const batch = topics.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(
      batch.map((t) => fetchTopicMeta(mapId, t.contentId))
    );
    for (let j = 0; j < batch.length; j++) {
      const { contentId } = batch[j];
      const r = results[j];
      if (r.status === "fulfilled") {
        timestamps[contentId] = r.value.lastTechChangeTimestamp;
      } else {
        timestamps[contentId] = null;
        errors.push({ contentId, message: r.reason.message, statusCode: r.reason.statusCode });
      }
    }
    if (i + CONCURRENCY < topics.length) await sleep(DELAY_MS);
  }
  return { timestamps, errors };
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

    console.log(`  ${mapName}: fetching per-topic timestamps (${topics.length} topics)...`);
    const { timestamps, errors } = await batchFetchTopicTimestamps(mapId, topics);
    for (const err of errors) {
      console.error(`  ${mapName}: topic ${err.contentId} — ${err.message}`);
    }
    for (const topic of topics) {
      topic.lastTechChangeTimestamp = timestamps[topic.contentId] ?? null;
    }

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
  parseTopicMeta,
  fetchTopicMeta,
  batchFetchTopicTimestamps,
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
