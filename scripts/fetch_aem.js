const https = require("https");
const fs = require("fs");
const path = require("path");
const TurndownService = require("turndown");
const { gfm } = require("turndown-plugin-gfm");
const { SASE_PRODUCTS, resolveTargetProducts } = require("./aem_config.js");

const OUT_DIR = path.join(__dirname, "..", "sources_fetch");
const METADATA_DIR = path.join(__dirname, "..", "metadata");
const CONCURRENCY = 10;
const DELAY_MS = 200;

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});
turndown.use(gfm);

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
  // The content container can be a <div> or <section> tag
  const openTagMatch = html.match(
    /<(div|section)[^>]*class="[^"]*doc-set-dita-content-well[^"]*"[^>]*>/
  );
  if (!openTagMatch) return "";

  const tag = openTagMatch[1]; // "div" or "section"
  const startIndex = openTagMatch.index + openTagMatch[0].length;
  let depth = 1;
  let i = startIndex;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf(`<${tag}`, i);
    const closeTag = `</${tag}>`;
    const nextClose = html.indexOf(closeTag, i);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + tag.length + 1;
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
      i = nextClose + closeTag.length;
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

function fetchUrl(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    https
      .get(
        { hostname: parsed.hostname, path: parsed.pathname + parsed.search, headers: { "User-Agent": "Mozilla/5.0" } },
        (res) => {
          if ((res.statusCode === 301 || res.statusCode === 302) && res.headers.location) {
            res.resume();
            if (maxRedirects <= 0) return reject(new Error(`Too many redirects for ${url}`));
            const target = new URL(res.headers.location, url).href;
            return resolve(fetchUrl(target, maxRedirects - 1));
          }
          if (res.statusCode !== 200) {
            res.resume();
            return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          }
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () => resolve(Buffer.concat(chunks).toString()));
        }
      )
      .on("error", reject);
  });
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

function sanitizeFilename(title) {
  return title.replace(/[<>:"/\\|?*]/g, "-").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").substring(0, 120);
}

function loadMetadata(product) {
  const metaPath = path.join(METADATA_DIR, `sase_${product}.json`);
  if (fs.existsSync(metaPath)) {
    return JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  }
  return null;
}

function saveMetadata(product, metadata) {
  fs.mkdirSync(METADATA_DIR, { recursive: true });
  const metaPath = path.join(METADATA_DIR, `sase_${product}.json`);
  fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2) + "\n", "utf-8");
}

function filterChanged(entries, existingMeta, force) {
  if (force || !existingMeta || !existingMeta.pages) return entries;
  return entries.filter((entry) => {
    const pathname = new URL(entry.loc).pathname;
    const existing = existingMeta.pages[pathname];
    return !existing || existing.lastmod !== entry.lastmod;
  });
}

async function fetchProduct(productKey, force) {
  const config = SASE_PRODUCTS[productKey];
  const outDir = path.join(OUT_DIR, productKey);
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`\n=== Fetching ${config.displayName} ===\n`);

  // Step 1: Fetch and parse sitemap
  console.log("Fetching sitemap...");
  const sitemapXml = await fetchUrl(config.sitemapUrl);
  const allEntries = parseSitemap(sitemapXml);
  const entries = filterUrls(allEntries, config.pathPrefix, config.excludeSections);
  console.log(`Found ${entries.length} pages for ${config.displayName} (from ${allEntries.length} total sitemap URLs)`);

  // Step 2: Change detection
  const existingMeta = loadMetadata(productKey);
  const toFetch = filterChanged(entries, existingMeta, force);
  if (toFetch.length === 0) {
    console.log("No changes detected. Skipping fetch.");
    return;
  }
  console.log(`${toFetch.length} pages to fetch (${entries.length - toFetch.length} unchanged)\n`);

  // Build lookup of existing file numbers
  const existingPages = existingMeta ? existingMeta.pages : {};
  let nextIndex = 1;
  if (existingMeta) {
    for (const page of Object.values(existingPages)) {
      const num = parseInt(page.outputFile.match(/^(\d+)/)?.[1] || "0", 10);
      if (num >= nextIndex) nextIndex = num + 1;
    }
  }

  // Step 3: Fetch in batches
  const newPages = { ...existingPages };
  let fetched = 0;
  let errors = 0;

  for (let i = 0; i < toFetch.length; i += CONCURRENCY) {
    const batch = toFetch.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async (entry) => {
        const url = entry.loc;
        const pathname = new URL(url).pathname;
        try {
          const html = await fetchUrl(url);
          const contentHtml = extractContent(html);
          if (!contentHtml) {
            console.log(`  SKIP (no content): ${pathname}`);
            return;
          }

          const title = extractTitle(html, pathname);
          const md = turndown.turndown(contentHtml);
          const depth = computeDepth(pathname, config.pathPrefix);
          const section = pathname.slice(config.pathPrefix.length).split("/")[0];

          // Determine file index
          let fileIndex;
          if (newPages[pathname] && newPages[pathname].outputFile) {
            fileIndex = parseInt(newPages[pathname].outputFile.match(/^(\d+)/)[1], 10);
          } else {
            fileIndex = nextIndex++;
          }

          const header = [
            "---",
            `title: "${title.replace(/"/g, '\\"')}"`,
            `url: "${pathname}"`,
            `section: "${section}"`,
            `lastmod: "${entry.lastmod || ""}"`,
            `depth: ${depth}`,
            "---",
            "",
            `# ${title}`,
            "",
          ].join("\n");

          const filename = `${String(fileIndex).padStart(4, "0")}-${sanitizeFilename(title)}.md`;
          fs.writeFileSync(path.join(outDir, filename), header + md + "\n", "utf-8");

          newPages[pathname] = {
            lastmod: entry.lastmod,
            title,
            outputFile: filename,
          };

          fetched++;
          if (fetched % 50 === 0 || fetched === toFetch.length) {
            console.log(`  progress: ${fetched}/${toFetch.length} (errors=${errors})`);
          }
        } catch (err) {
          errors++;
          console.error(`  FAILED: ${pathname} — ${err.message}`);
        }
      })
    );
    if (i + CONCURRENCY < toFetch.length) await sleep(DELAY_MS);
  }

  console.log(`\nFetch complete: ${fetched} fetched, ${errors} errors`);

  // Step 4: Save metadata
  const metadata = {
    version: 1,
    source: "aem-sitemap",
    product: productKey,
    productFamily: "sase",
    lastFetched: new Date().toISOString(),
    pageCount: entries.length,
    pages: newPages,
  };
  saveMetadata(productKey, metadata);
  console.log(`Metadata saved to metadata/sase_${productKey}.json`);
}

async function main() {
  const targets = resolveTargetProducts();
  const force = process.argv.includes("--force");
  for (const product of targets) {
    await fetchProduct(product, force);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}

module.exports = { parseSitemap, filterUrls, computeDepth, extractContent, extractTitle, fetchUrl, sleep, sanitizeFilename, loadMetadata, saveMetadata, filterChanged, OUT_DIR, METADATA_DIR, CONCURRENCY, DELAY_MS };
