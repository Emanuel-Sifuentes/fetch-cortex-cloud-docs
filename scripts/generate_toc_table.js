const { MAP_IDS, parseMapFlag } = require("./map_config.js");
const { httpGetWithRetry } = require("./http_retry.js");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const MAP_ID = MAP_IDS[parseMapFlag("runtime")];

const fetch = async (urlPath) => JSON.parse(await httpGetWithRetry(urlPath, { base: BASE }));

function printTree(nodes, indent, stats) {
  for (const node of nodes) {
    console.log(indent + "- " + node.title);
    stats.count++;
    stats.maxDepth = Math.max(stats.maxDepth, indent.length / 2);
    if (node.children && node.children.length) {
      printTree(node.children, indent + "  ", stats);
    }
  }
}

fetch("/api/khub/maps/" + MAP_ID + "/toc")
  .then((toc) => {
    const stats = { count: 0, maxDepth: 0 };
    printTree(toc, "", stats);
    console.log("");
    console.log(`**Total:** ${stats.count} topics, max depth: ${stats.maxDepth}`);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
