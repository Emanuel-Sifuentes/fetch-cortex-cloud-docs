const path = require("path");

const OUT_DIR = path.join(__dirname, "..", "sources_fetch");
const METADATA_DIR = path.join(__dirname, "..", "metadata");
const CONCURRENCY = 10;
const DELAY_MS = 200;

function parseSitemap(xml) {
  const entries = [];
  const urlRegex = /<url>([\s\S]*?)<\/url>/g;
  let match;
  while ((match = urlRegex.exec(xml)) !== null) {
    const block = match[1];
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    const lastmodMatch = block.match(/<lastmod>([^<]+)<\/lastmod>/);
    if (locMatch) {
      entries.push({
        loc: locMatch[1].trim(),
        lastmod: lastmodMatch ? lastmodMatch[1].trim() : null,
      });
    }
  }
  return entries;
}

function filterUrls(entries, pathPrefix, excludeSections) {
  return entries.filter((entry) => {
    const url = new URL(entry.loc);
    const p = url.pathname;
    if (!p.startsWith(pathPrefix)) return false;
    const relative = p.slice(pathPrefix.length);
    const firstSegment = relative.split("/")[0];
    if (excludeSections.includes(firstSegment)) return false;
    return true;
  });
}

function computeDepth(pathname, pathPrefix) {
  const relative = pathname.slice(pathPrefix.length);
  const segments = relative.split("/").filter(Boolean);
  return Math.max(0, segments.length - 1);
}

module.exports = { parseSitemap, filterUrls, computeDepth, OUT_DIR, METADATA_DIR, CONCURRENCY, DELAY_MS };
