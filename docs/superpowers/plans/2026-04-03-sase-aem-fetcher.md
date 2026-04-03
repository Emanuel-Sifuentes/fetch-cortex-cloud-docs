# SASE AEM Fetcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fetch Prisma Access documentation from docs.paloaltonetworks.com (Adobe AEM) via sitemap-driven HTML scraping and integrate with the existing segment + ingest pipeline.

**Architecture:** New `fetch_aem.js` fetcher with `aem_config.js` config, AEM-aware branch in `generate_combined.js` for combine, updated `segment_combined.py` and `data_ingestion/config.py` for downstream pipeline. npm scripts renamed to `{command}:{family}:{product}` convention.

**Tech Stack:** Node.js, Turndown (HTML→Markdown), existing Python segmentation/ingestion pipeline.

**Spec:** `docs/superpowers/specs/2026-04-03-sase-aem-fetcher-design.md`

---

### Task 1: Create AEM config module

**Files:**
- Create: `scripts/aem_config.js`
- Test: `scripts/aem_config.test.js`

- [ ] **Step 1: Write the failing test**

```js
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { SASE_PRODUCTS, PRODUCT_FAMILIES, resolveTargetProducts, parseProductFlag } = require("./aem_config.js");

describe("aem_config", () => {
  it("exports SASE_PRODUCTS with prisma_access", () => {
    assert.ok(SASE_PRODUCTS.prisma_access);
    assert.equal(SASE_PRODUCTS.prisma_access.pathPrefix, "/prisma-access/");
    assert.deepEqual(SASE_PRODUCTS.prisma_access.excludeSections, ["release-notes"]);
    assert.equal(SASE_PRODUCTS.prisma_access.combinedFile, "prisma-access-combined.md");
    assert.equal(SASE_PRODUCTS.prisma_access.displayName, "Prisma Access");
  });

  it("exports PRODUCT_FAMILIES with sase containing prisma_access", () => {
    assert.deepEqual(PRODUCT_FAMILIES.sase, ["prisma_access"]);
  });

  it("resolveTargetProducts returns all products when no flag", () => {
    const original = process.argv;
    process.argv = ["node", "test"];
    const result = resolveTargetProducts();
    assert.deepEqual(result, ["prisma_access"]);
    process.argv = original;
  });

  it("resolveTargetProducts returns single product when --product flag given", () => {
    const original = process.argv;
    process.argv = ["node", "test", "--product", "prisma_access"];
    const result = resolveTargetProducts();
    assert.deepEqual(result, ["prisma_access"]);
    process.argv = original;
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/aem_config.test.js`
Expected: FAIL with "Cannot find module './aem_config.js'"

- [ ] **Step 3: Write the implementation**

```js
const SASE_PRODUCTS = {
  prisma_access: {
    sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
    pathPrefix: "/prisma-access/",
    excludeSections: ["release-notes"],
    combinedFile: "prisma-access-combined.md",
    displayName: "Prisma Access",
  },
  // prisma_sdwan: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/prisma/prisma-sd-wan/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "prisma-sdwan-combined.md",
  //   displayName: "Prisma SD-WAN",
  // },
  // prisma_sase_multitenant: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/sase/prisma-sase-multitenant-platform/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "prisma-sase-multitenant-combined.md",
  //   displayName: "Prisma SASE Multitenant Platform",
  // },
  // common_services: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/common-services/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "common-services-combined.md",
  //   displayName: "Common Services",
  // },
  // enterprise_dlp: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/enterprise-dlp/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "enterprise-dlp-combined.md",
  //   displayName: "Enterprise DLP",
  // },
  // strata_logging_service: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/strata-logging-service/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "strata-logging-service-combined.md",
  //   displayName: "Strata Logging Service",
  // },
  // cloud_identity_engine: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/cloud-identity/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "cloud-identity-engine-combined.md",
  //   displayName: "Cloud Identity Engine",
  // },
  // saas_security: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/saas-security/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "saas-security-combined.md",
  //   displayName: "SaaS Security",
  // },
  // iot_security: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/iot/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "iot-security-combined.md",
  //   displayName: "IoT Security",
  // },
  // prisma_access_insights: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/prisma/prisma-access/prisma-access-insights/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "prisma-access-insights-combined.md",
  //   displayName: "Prisma Access Insights",
  // },
  // cdss: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/cdss/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "cdss-combined.md",
  //   displayName: "Cloud-Delivered Security Services",
  // },
};

const PRODUCT_FAMILIES = {
  sase: ["prisma_access"],
};

const VALID_PRODUCTS = Object.keys(SASE_PRODUCTS);

function parseProductFlag() {
  const idx = process.argv.indexOf("--product");
  if (idx === -1 || idx + 1 >= process.argv.length) return null;
  const value = process.argv[idx + 1];
  if (!SASE_PRODUCTS[value]) {
    console.error(`Error: unknown SASE product "${value}" -- choose from: ${VALID_PRODUCTS.join(", ")}`);
    process.exit(1);
  }
  return value;
}

function resolveTargetProducts() {
  const product = parseProductFlag();
  if (product) return [product];
  return VALID_PRODUCTS;
}

module.exports = { SASE_PRODUCTS, PRODUCT_FAMILIES, VALID_PRODUCTS, parseProductFlag, resolveTargetProducts };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/aem_config.test.js`
Expected: All 4 tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/aem_config.js scripts/aem_config.test.js
git commit -m "feat(sase): add AEM config module for SASE products"
```

---

### Task 2: Sitemap parser and URL filtering

**Files:**
- Create: `scripts/fetch_aem.js` (sitemap parsing functions only — not the full fetcher yet)
- Test: `scripts/fetch_aem.test.js`

- [ ] **Step 1: Write the failing test**

```js
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { parseSitemap, filterUrls, computeDepth } = require("./fetch_aem.js");

const SAMPLE_SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://docs.paloaltonetworks.com/prisma-access/administration/prisma-access-overview</loc>
    <lastmod>2026-03-30</lastmod>
  </url>
  <url>
    <loc>https://docs.paloaltonetworks.com/prisma-access/administration/prisma-access-overview/secure-internet-traffic</loc>
    <lastmod>2026-03-28</lastmod>
  </url>
  <url>
    <loc>https://docs.paloaltonetworks.com/prisma-access/release-notes/4-0/prisma-access-about</loc>
    <lastmod>2026-03-15</lastmod>
  </url>
  <url>
    <loc>https://docs.paloaltonetworks.com/other-product/some-page</loc>
    <lastmod>2026-03-10</lastmod>
  </url>
</urlset>`;

describe("parseSitemap", () => {
  it("extracts loc and lastmod from sitemap XML", () => {
    const entries = parseSitemap(SAMPLE_SITEMAP);
    assert.equal(entries.length, 4);
    assert.equal(entries[0].loc, "https://docs.paloaltonetworks.com/prisma-access/administration/prisma-access-overview");
    assert.equal(entries[0].lastmod, "2026-03-30");
  });

  it("handles entries without lastmod", () => {
    const xml = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/page</loc></url>
</urlset>`;
    const entries = parseSitemap(xml);
    assert.equal(entries.length, 1);
    assert.equal(entries[0].lastmod, null);
  });
});

describe("filterUrls", () => {
  it("filters by pathPrefix and excludes sections", () => {
    const entries = parseSitemap(SAMPLE_SITEMAP);
    const filtered = filterUrls(entries, "/prisma-access/", ["release-notes"]);
    assert.equal(filtered.length, 2);
    assert.ok(filtered[0].loc.includes("prisma-access-overview"));
    assert.ok(filtered[1].loc.includes("secure-internet-traffic"));
  });

  it("excludes URLs not matching pathPrefix", () => {
    const entries = parseSitemap(SAMPLE_SITEMAP);
    const filtered = filterUrls(entries, "/other-product/", []);
    assert.equal(filtered.length, 1);
    assert.ok(filtered[0].loc.includes("other-product"));
  });
});

describe("computeDepth", () => {
  it("computes depth relative to pathPrefix", () => {
    assert.equal(computeDepth("/prisma-access/administration", "/prisma-access/"), 0);
    assert.equal(computeDepth("/prisma-access/administration/overview", "/prisma-access/"), 1);
    assert.equal(computeDepth("/prisma-access/administration/overview/sub", "/prisma-access/"), 2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/fetch_aem.test.js`
Expected: FAIL with "Cannot find module './fetch_aem.js'" or missing exports

- [ ] **Step 3: Write the implementation**

Add these functions to `scripts/fetch_aem.js` (the file will grow in later tasks):

```js
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

module.exports = { parseSitemap, filterUrls, computeDepth };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/fetch_aem.test.js`
Expected: All 5 tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch_aem.js scripts/fetch_aem.test.js
git commit -m "feat(sase): add sitemap parser and URL filtering"
```

---

### Task 3: HTML content extraction

**Files:**
- Modify: `scripts/fetch_aem.js`
- Modify: `scripts/fetch_aem.test.js`

- [ ] **Step 1: Write the failing test**

Append to `scripts/fetch_aem.test.js`:

```js
const { extractContent, extractTitle } = require("./fetch_aem.js");

describe("extractContent", () => {
  it("extracts content from doc-set-dita-content-well container", () => {
    const html = `
<html><body>
<nav>Navigation here</nav>
<div class="td-split-banner framemaker-book-detail-page doc-set-dita-content-well td-body__content">
  <h1>Prisma Access Overview</h1>
  <p>Some documentation content here.</p>
  <table><tr><th>Column</th></tr><tr><td>Value</td></tr></table>
</div>
<footer>Footer here</footer>
</body></html>`;
    const content = extractContent(html);
    assert.ok(content.includes("Prisma Access Overview"));
    assert.ok(content.includes("Some documentation content here"));
    assert.ok(!content.includes("Navigation here"));
    assert.ok(!content.includes("Footer here"));
  });

  it("returns empty string when content container not found", () => {
    const html = "<html><body><p>No content well here</p></body></html>";
    const content = extractContent(html);
    assert.equal(content, "");
  });

  it("strips prev/next navigation links", () => {
    const html = `
<div class="doc-set-dita-content-well">
  <p>Real content</p>
  <div class="td-previous-next-links"><a href="/prev">Previous</a><a href="/next">Next</a></div>
</div>`;
    const content = extractContent(html);
    assert.ok(content.includes("Real content"));
    assert.ok(!content.includes("Previous"));
    assert.ok(!content.includes("Next"));
  });
});

describe("extractTitle", () => {
  it("extracts title from webData.pageName", () => {
    const html = `<script>webData.pageName = 'en_US:prisma-access:Prisma Access Overview';</script>`;
    const title = extractTitle(html);
    assert.equal(title, "Prisma Access Overview");
  });

  it("falls back to last URL segment when webData not found", () => {
    const html = "<html><body></body></html>";
    const title = extractTitle(html, "/prisma-access/administration/prisma-access-overview");
    assert.equal(title, "prisma-access-overview");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/fetch_aem.test.js`
Expected: FAIL — `extractContent` and `extractTitle` not exported

- [ ] **Step 3: Write the implementation**

Add to `scripts/fetch_aem.js` before the `module.exports`:

```js
function extractContent(html) {
  const containerMatch = html.match(
    /<div[^>]*class="[^"]*doc-set-dita-content-well[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div class="aside-right|<footer|<\/main|$)/
  );
  if (!containerMatch) return "";

  let content = containerMatch[1];

  // Strip prev/next navigation
  content = content.replace(/<div[^>]*class="[^"]*td-previous-next-links[^"]*"[^>]*>[\s\S]*?<\/div>/g, "");

  // Strip version selector dropdowns
  content = content.replace(/<div[^>]*class="[^"]*version-selector[^"]*"[^>]*>[\s\S]*?<\/div>/g, "");

  // Strip language selector
  content = content.replace(/<div[^>]*class="[^"]*language-selector[^"]*"[^>]*>[\s\S]*?<\/div>/g, "");

  // Strip PDF download links
  content = content.replace(/<a[^>]*href="[^"]*\.pdf"[^>]*>[\s\S]*?<\/a>/g, "");

  return content.trim();
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
```

Update `module.exports` to include the new functions:

```js
module.exports = { parseSitemap, filterUrls, computeDepth, extractContent, extractTitle };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/fetch_aem.test.js`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch_aem.js scripts/fetch_aem.test.js
git commit -m "feat(sase): add HTML content extraction for AEM pages"
```

---

### Task 4: Full fetcher with Turndown conversion and metadata persistence

**Files:**
- Modify: `scripts/fetch_aem.js` (add main fetch pipeline, Turndown setup, metadata I/O)

This task wires together the parsing, extraction, and conversion into the full fetch pipeline. It's integration-level code that fetches from the live site, so it doesn't get unit tests — it gets a manual smoke test.

- [ ] **Step 1: Add Turndown setup and HTTP fetch helper**

Add to the top of `scripts/fetch_aem.js` after the existing requires:

```js
const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});
turndown.use(gfm);

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    https
      .get(
        { hostname: parsed.hostname, path: parsed.pathname + parsed.search, headers: { "User-Agent": "Mozilla/5.0" } },
        (res) => {
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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function sanitizeFilename(title) {
  return title
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 120);
}
```

- [ ] **Step 2: Add metadata load/save and change detection**

```js
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
```

- [ ] **Step 3: Add the main fetch pipeline**

```js
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

  // Build lookup of existing file numbers to preserve numbering for unchanged pages
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
          const total = toFetch.length;
          if (fetched % 50 === 0 || fetched === total) {
            console.log(`  progress: ${fetched}/${total} (errors=${errors})`);
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
```

- [ ] **Step 4: Run existing tests to ensure nothing broke**

Run: `node --test scripts/fetch_aem.test.js`
Expected: All tests PASS

- [ ] **Step 5: Smoke test the fetcher with a small run**

Run: `node scripts/fetch_aem.js --product prisma_access`

Verify:
- Sitemap fetched, ~640 URLs discovered for Prisma Access
- Pages are fetched and written to `sources_fetch/prisma_access/`
- Each file has YAML frontmatter with title, url, section, lastmod, depth
- Markdown content looks reasonable (headings, paragraphs, tables)
- `metadata/sase_prisma_access.json` created with page entries

- [ ] **Step 6: Commit**

```bash
git add scripts/fetch_aem.js
git commit -m "feat(sase): add full AEM fetch pipeline with Turndown and metadata"
```

---

### Task 5: AEM-aware branch in generate_combined.js

**Files:**
- Modify: `scripts/generate_combined.js:1-7` (add aem_config import)
- Modify: `scripts/generate_combined.js:217-352` (add AEM branch to main function)
- Modify: `scripts/map_config.js` (export COMBINED_FILES for external use)

- [ ] **Step 1: Add AEM config import to generate_combined.js**

At the top of `scripts/generate_combined.js`, after line 4, add:

```js
const { SASE_PRODUCTS, resolveTargetProducts: resolveAemTargets } = require("./aem_config.js");
```

- [ ] **Step 2: Add AEM combine logic to main function**

After the simple maps loop (after line 342 `}`), add:

```js
  // --- AEM-sourced maps (sitemap-ordered, frontmatter-driven) ---
  const aemTargets = resolveAemTargets().filter((t) => {
    // Only run AEM targets if they were requested or if no product flag was given
    const productIdx = process.argv.indexOf("--product");
    if (productIdx === -1) return true;
    const productValue = process.argv[productIdx + 1];
    // Check if the product flag matches a SASE family or product
    return productValue === t || (SASE_PRODUCTS[t] && Object.keys(require("./aem_config.js").PRODUCT_FAMILIES).some(
      (family) => family === productValue && require("./aem_config.js").PRODUCT_FAMILIES[family].includes(t)
    ));
  });

  for (const target of aemTargets) {
    const config = SASE_PRODUCTS[target];
    const targetDir = path.join(OUT_DIR, target);
    if (!fs.existsSync(targetDir)) {
      console.log(`\nSkipping ${target} (directory not found)`);
      continue;
    }

    const files = fs.readdirSync(targetDir)
      .filter((f) => /^\d+-/.test(f) && f.endsWith(".md"))
      .sort();

    if (files.length === 0) {
      console.log(`\nSkipping ${target} (no source files)`);
      continue;
    }

    console.log(`\n[${target}] Combining ${files.length} files (AEM source)`);

    const sections = [];
    for (const f of files) {
      const content = fs.readFileSync(path.join(targetDir, f), "utf-8");
      const depthMatch = content.match(/^depth:\s*(\d+)/m);
      const depth = depthMatch ? parseInt(depthMatch[1], 10) : 0;
      const md = stripFrontmatter(content);
      sections.push(shiftHeadings(md.trim(), depth, f));
    }

    const raw = sections.filter(Boolean).join("\n\n");
    const combined = promoteKeywordsToHeadings(raw);
    const outPath = path.join(targetDir, config.combinedFile);
    fs.writeFileSync(outPath, combined + "\n", "utf-8");
    console.log(`Combined file: ${outPath}`);
    console.log(`${files.length} topics, ${combined.split("\n").length} lines`);
  }
```

- [ ] **Step 3: Run existing tests to make sure nothing broke**

Run: `node --test scripts/generate_combined.test.js`
Expected: All existing tests PASS

- [ ] **Step 4: Smoke test combine on fetched Prisma Access data**

Run: `node scripts/generate_combined.js --product prisma_access`

Verify:
- `sources_fetch/prisma_access/prisma-access-combined.md` is created
- File contains markdown with shifted headings
- File is non-empty and well-structured

- [ ] **Step 5: Commit**

```bash
git add scripts/generate_combined.js
git commit -m "feat(sase): add AEM-aware combine branch to generate_combined.js"
```

---

### Task 6: Update segment_combined.py for SASE products

**Files:**
- Modify: `scripts/segment_combined.py:19-47` (add entries to COMBINED_FILES, PRODUCTS, DISPLAY_NAMES)

- [ ] **Step 1: Add prisma_access to COMBINED_FILES**

In `scripts/segment_combined.py`, add after the `"agentix"` entry in `COMBINED_FILES` (line 28):

```python
    "prisma_access": "prisma-access-combined.md",
```

- [ ] **Step 2: Add sase to PRODUCTS**

Add after the `"agentix"` entry in `PRODUCTS` (line 35):

```python
    "sase": ["prisma_access"],
```

- [ ] **Step 3: Add prisma_access to DISPLAY_NAMES**

Add after the `"xsiam_3"` entry in `DISPLAY_NAMES` (line 47):

```python
    "prisma_access": "Prisma Access",
```

- [ ] **Step 4: Run segmentation on Prisma Access**

Run: `python scripts/segment_combined.py --product sase`

Verify:
- Segments written to `sources_fetch/prisma_access/public/`
- Segment count and size stats printed
- Each segment starts with a breadcrumb line like `> Prisma Access > ...`

- [ ] **Step 5: Run existing segment tests**

Run: `python -m pytest scripts/test_segment_combined.py -v` (or `node --test` if it's a JS test)

Check: `node --test scripts/test_segment_combined.py` — actually check the test runner:

Run: `python scripts/test_segment_combined.py`
Expected: All existing tests PASS

- [ ] **Step 6: Commit**

```bash
git add scripts/segment_combined.py
git commit -m "feat(sase): add Prisma Access entries to segment_combined.py"
```

---

### Task 7: Update data_ingestion/config.py for SASE products

**Files:**
- Modify: `data_ingestion/config.py:17-31` (replace PRODUCT_FAMILY constant, add prisma_access to MAP_TO_PRODUCT)
- Modify: `data_ingestion/ingest.py:27-33,55-59` (import and use MAP_TO_PRODUCT_FAMILY)

- [ ] **Step 1: Update config.py**

In `data_ingestion/config.py`, replace line 17 (`PRODUCT_FAMILY = "cortex"`):

```python
MAP_TO_PRODUCT_FAMILY = {
    "appsec": "cortex",
    "posture": "cortex",
    "runtime": "cortex",
    "cortex_gateway": "cortex",
    "xdr_5": "cortex",
    "xdr_compatibility": "cortex",
    "xsiam_3": "cortex",
    "agentix": "cortex",
    "prisma_access": "sase",
}
```

Add `prisma_access` to `MAP_TO_PRODUCT` (after the `"agentix"` entry on line 30):

```python
    "prisma_access": "prisma_access",
```

- [ ] **Step 2: Update ingest.py to use MAP_TO_PRODUCT_FAMILY**

In `data_ingestion/ingest.py`, change the import on line 31 from `PRODUCT_FAMILY` to `MAP_TO_PRODUCT_FAMILY`:

```python
from config import (
    BRANCH_PARENT,
    FILTERABLE_FIELDS,
    MAP_TO_PRODUCT,
    MAP_TO_PRODUCT_FAMILY,
    SCHEMA_NAME,
)
```

In the `discover_segments` function (line 58), change:

```python
            "product_family": PRODUCT_FAMILY,
```

to:

```python
            "product_family": MAP_TO_PRODUCT_FAMILY.get(map_name, "cortex"),
```

- [ ] **Step 3: Verify with dry run**

Run: `python data_ingestion/ingest.py --dry-run`

Verify:
- prisma_access segments are discovered
- Product family shows `sase` for prisma_access, `cortex` for existing products
- No errors

- [ ] **Step 4: Commit**

```bash
git add data_ingestion/config.py data_ingestion/ingest.py
git commit -m "feat(sase): add SASE product family mapping to ingestion config"
```

---

### Task 8: Rename npm scripts to {command}:{family}:{product} convention

**Files:**
- Modify: `package.json:6-48` (rename all scripts)
- Modify: `scripts/map_config.js` (update parseProductFlag to handle family:product format)

- [ ] **Step 1: Update package.json scripts**

Replace the entire `"scripts"` block in `package.json`:

```json
{
  "scripts": {
    "fetch:cortex": "node scripts/fetch_fluidtopics.js",
    "fetch:cortex:cloud": "node scripts/fetch_fluidtopics.js --product cloud",
    "fetch:cortex:xdr": "node scripts/fetch_fluidtopics.js --product xdr",
    "fetch:cortex:xsiam": "node scripts/fetch_fluidtopics.js --product xsiam",
    "fetch:cortex:gateway": "node scripts/fetch_fluidtopics.js --product gateway",
    "fetch:cortex:agentix": "node scripts/fetch_fluidtopics.js --product agentix",
    "fetch:sase": "node scripts/fetch_aem.js",
    "fetch:sase:prisma_access": "node scripts/fetch_aem.js --product prisma_access",
    "combine:cortex": "node scripts/generate_combined.js --product cortex",
    "combine:cortex:cloud": "node scripts/generate_combined.js --product cloud",
    "combine:cortex:xdr": "node scripts/generate_combined.js --product xdr",
    "combine:cortex:xsiam": "node scripts/generate_combined.js --product xsiam",
    "combine:cortex:gateway": "node scripts/generate_combined.js --product gateway",
    "combine:cortex:agentix": "node scripts/generate_combined.js --product agentix",
    "combine:sase": "node scripts/generate_combined.js --product sase",
    "combine:sase:prisma_access": "node scripts/generate_combined.js --product prisma_access",
    "fix:cortex": "node scripts/fix.js --product cortex",
    "fix:cortex:cloud": "node scripts/fix.js --product cloud",
    "fix:cortex:xdr": "node scripts/fix.js --product xdr",
    "fix:cortex:xsiam": "node scripts/fix.js --product xsiam",
    "fix:cortex:gateway": "node scripts/fix.js --product gateway",
    "fix:cortex:agentix": "node scripts/fix.js --product agentix",
    "fix:sase": "node scripts/fix.js --product sase",
    "fix:sase:prisma_access": "node scripts/fix.js --product prisma_access",
    "check:cortex": "node scripts/check.js",
    "check:cortex:cloud": "node scripts/check.js --product cloud",
    "check:cortex:xdr": "node scripts/check.js --product xdr",
    "check:cortex:xsiam": "node scripts/check.js --product xsiam",
    "check:cortex:gateway": "node scripts/check.js --product gateway",
    "check:cortex:agentix": "node scripts/check.js --product agentix",
    "snapshot:cortex": "node scripts/snapshot.js",
    "snapshot:cortex:cloud": "node scripts/snapshot.js --product cloud",
    "snapshot:cortex:xdr": "node scripts/snapshot.js --product xdr",
    "snapshot:cortex:xsiam": "node scripts/snapshot.js --product xsiam",
    "snapshot:cortex:gateway": "node scripts/snapshot.js --product gateway",
    "snapshot:cortex:agentix": "node scripts/snapshot.js --product agentix",
    "fetch-api:cortex": "node scripts/fetch_stoplight.js",
    "fetch-api:cortex:cloud": "node scripts/fetch_stoplight.js --product cloud",
    "audit:headings": "node scripts/audit_headings.js",
    "audit:toc": "node scripts/audit_toc_vs_headings.js",
    "toc:table": "node scripts/generate_toc_table.js",
    "test": "node --test scripts/generate_combined.test.js scripts/fetch_fluidtopics.test.js scripts/snapshot.test.js scripts/check.test.js scripts/render_stoplight_node.test.js scripts/aem_config.test.js scripts/fetch_aem.test.js"
  }
}
```

- [ ] **Step 2: Update generate_combined.js to accept family-level product flags**

The `--product cortex` flag needs to resolve to all Cortex maps. In `scripts/generate_combined.js`, the `resolveTargetMaps()` call on line 218 already handles individual product names (cloud, xdr, etc.). Add handling for `cortex` as a family alias.

In `scripts/map_config.js`, update `parseProductFlag()` to treat `"cortex"` as "all Fluid Topics maps":

```js
function parseProductFlag() {
  const idx = process.argv.indexOf("--product");
  if (idx === -1 || idx + 1 >= process.argv.length) return null;
  const value = process.argv[idx + 1];
  if (value === "cortex") return null; // "cortex" means all Fluid Topics products
  if (!PRODUCTS[value]) {
    console.error(`Error: unknown product "${value}" -- choose from: ${VALID_PRODUCTS.join(", ")}, cortex`);
    process.exit(1);
  }
  return value;
}
```

Similarly, in `scripts/fix.js`, the `resolveTargetMaps()` call on line 8 resolves which directories to fix. The `cortex` family flag will now resolve to all maps. For `sase` and `prisma_access`, fix.js needs to also handle AEM products. Add after line 4:

```js
const { SASE_PRODUCTS, resolveTargetProducts: resolveAemTargets } = require("./aem_config.js");
```

And after line 9, add AEM product directories:

```js
const aemProductFlag = process.argv.indexOf("--product");
const aemProductValue = aemProductFlag !== -1 ? process.argv[aemProductFlag + 1] : null;
if (!aemProductValue || aemProductValue === "sase" || SASE_PRODUCTS[aemProductValue]) {
  const aemTargets = aemProductValue && SASE_PRODUCTS[aemProductValue]
    ? [aemProductValue]
    : Object.keys(SASE_PRODUCTS);
  for (const t of aemTargets) {
    dirs.push(path.join(OUT_DIR, t));
  }
}
```

- [ ] **Step 3: Run all tests**

Run: `npm test`
Expected: All tests PASS

- [ ] **Step 4: Smoke test the renamed scripts**

Run: `npm run fetch:cortex:cloud -- --help 2>&1 | head -1` (verify it invokes fetch_fluidtopics)
Run: `npm run fetch:sase:prisma_access -- --help 2>&1 | head -1` (verify it invokes fetch_aem)

- [ ] **Step 5: Commit**

```bash
git add package.json scripts/map_config.js scripts/fix.js
git commit -m "refactor: rename npm scripts to {command}:{family}:{product} convention"
```

---

### Task 9: End-to-end integration test

This task runs the full pipeline for Prisma Access and verifies each stage.

- [ ] **Step 1: Run fetch**

Run: `npm run fetch:sase:prisma_access`

Verify:
- ~640 files created in `sources_fetch/prisma_access/`
- Each file has proper YAML frontmatter
- `metadata/sase_prisma_access.json` exists with page entries

- [ ] **Step 2: Run combine**

Run: `npm run combine:sase:prisma_access`

Verify:
- `sources_fetch/prisma_access/prisma-access-combined.md` exists
- Non-empty, has hierarchical headings

- [ ] **Step 3: Run segment**

Run: `python scripts/segment_combined.py --product sase`

Verify:
- Segments written to `sources_fetch/prisma_access/public/`
- Segment count and size stats printed

- [ ] **Step 4: Dry-run ingest**

Run: `python data_ingestion/ingest.py --dry-run`

Verify:
- prisma_access segments are discovered alongside existing cortex segments
- Product family shows `sase` for prisma_access products

- [ ] **Step 5: Run all tests**

Run: `npm test`
Expected: All tests PASS

- [ ] **Step 6: Spot-check markdown quality**

Read 3-5 random segment files from `sources_fetch/prisma_access/public/` and verify:
- Breadcrumb line present (starts with `> Prisma Access >`)
- Content is readable markdown (not raw HTML)
- Tables render correctly
- Code blocks are properly fenced
- No CMS chrome leaked through (no "Previous/Next", no language selectors)

- [ ] **Step 7: Commit all remaining changes**

```bash
git add -A
git commit -m "feat(sase): complete Prisma Access fetch pipeline integration"
```
