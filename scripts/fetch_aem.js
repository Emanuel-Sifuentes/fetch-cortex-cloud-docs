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

function extractContent(html) {
  const openTagMatch = html.match(
    /<div[^>]*class="[^"]*doc-set-dita-content-well[^"]*"[^>]*>/
  );
  if (!openTagMatch) return "";

  const startIndex = openTagMatch.index + openTagMatch[0].length;
  let depth = 1;
  let i = startIndex;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf("<div", i);
    const nextClose = html.indexOf("</div>", i);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + 4;
    } else {
      depth--;
      if (depth === 0) {
        let content = html.slice(startIndex, nextClose);

        content = content.replace(
          /<div[^>]*class="[^"]*td-previous-next-links[^"]*"[^>]*>[\s\S]*?<\/div>/g,
          ""
        );
        content = content.replace(
          /<div[^>]*class="[^"]*version-selector[^"]*"[^>]*>[\s\S]*?<\/div>/g,
          ""
        );
        content = content.replace(
          /<div[^>]*class="[^"]*language-selector[^"]*"[^>]*>[\s\S]*?<\/div>/g,
          ""
        );
        content = content.replace(
          /<a[^>]*href="[^"]*\.pdf"[^>]*>[\s\S]*?<\/a>/g,
          ""
        );

        return content.trim();
      }
      i = nextClose + 6;
    }
  }
  return "";
}

function extractTitle(html, pathname) {
  const match = html.match(/webData\.pageName\s*=\s*'[^:]*:[^:]*:([^']+)'/);
  if (match) return match[1].trim();
  if (pathname) {
    const segments = pathname.split("/").filter(Boolean);
    return segments[segments.length - 1];
  }
  return "Untitled";
}

module.exports = { parseSitemap, filterUrls, computeDepth, extractContent, extractTitle, OUT_DIR, METADATA_DIR, CONCURRENCY, DELAY_MS };
