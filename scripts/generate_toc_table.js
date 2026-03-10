const https = require("https");
const fs = require("fs");
const path = require("path");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const MAP_ID = "aUsxSwBeRrRs3Jm36XHckg";

function fetch(urlPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE);
    https.get({ hostname: url.hostname, path: url.pathname, headers: { Accept: "application/json" } }, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(JSON.parse(Buffer.concat(chunks).toString())));
    }).on("error", reject);
  });
}

function walk(nodes, depth, rows) {
  for (const n of nodes) {
    const indent = "\u00a0\u00a0".repeat(depth);
    rows.push({
      num: rows.length + 1,
      depth,
      title: indent + n.title,
      tocId: n.tocId,
      contentId: n.contentId,
      children: (n.children || []).length,
    });
    if (n.children && n.children.length) walk(n.children, depth + 1, rows);
  }
}

fetch("/api/khub/maps/" + MAP_ID + "/toc").then((toc) => {
  const rows = [];
  walk(toc, 0, rows);

  const lines = [];
  lines.push("| # | Depth | Title | Children | tocId | contentId |");
  lines.push("|---|-------|-------|----------|-------|-----------|");
  for (const r of rows) {
    lines.push(
      "| " + r.num +
      " | " + r.depth +
      " | " + r.title +
      " | " + r.children +
      " | `" + r.tocId + "`" +
      " | `" + r.contentId + "` |"
    );
  }
  lines.push("");
  lines.push("**Total:** " + rows.length + " topics");

  const output = lines.join("\n");
  console.log(output);
});
