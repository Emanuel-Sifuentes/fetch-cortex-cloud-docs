const https = require("https");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const MAP_ID = "aUsxSwBeRrRs3Jm36XHckg";

function fetch(urlPath) {
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
