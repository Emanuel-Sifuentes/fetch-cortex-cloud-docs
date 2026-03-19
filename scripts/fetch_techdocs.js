/**
 * fetch_techdocs.js — Fetch Palo Alto Networks TechDocs (AEM) pages and
 * convert to Markdown using Cheerio + Turndown.
 *
 * Usage:
 *   node scripts/fetch_techdocs.js --product prisma-browser
 *
 * Workflow:
 *   1. Pull all URLs for the product from the sitemap.xml
 *   2. Derive TOC depth from URL path segments
 *   3. Fetch each page, extract .topic content with Cheerio
 *   4. Convert to Markdown with Turndown + GFM
 *   5. Write numbered .md files with YAML frontmatter
 */

const https = require("https");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const TurndownService = require("turndown");
const { gfm } = require("turndown-plugin-gfm");
const { PRODUCTS, parseProductFlag } = require("./techdocs_config.js");

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const SITEMAP_URL = "https://docs.paloaltonetworks.com/sitemap.xml";
const BASE_URL = "https://docs.paloaltonetworks.com";
const CONCURRENCY = 5;
const DELAY_MS = 300;

/* ------------------------------------------------------------------ */
/*  Turndown setup (mirrors fetch_fluidtopics.js conventions)         */
/* ------------------------------------------------------------------ */

function createTurndown() {
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });
  td.use(gfm);

  // Fence <pre> blocks that Turndown misses (no <code> child)
  td.addRule("preWithoutCode", {
    filter: (node) =>
      node.nodeName === "PRE" && !node.querySelector("code"),
    replacement: (content) => {
      const code = content.replace(/^\n+|\n+$/g, "");
      return "\n\n```\n" + code + "\n```\n\n";
    },
  });

  // Strip empty inline-display divs that AEM injects
  td.addRule("emptyDisplayInline", {
    filter: (node) =>
      node.nodeName === "DIV" &&
      (node.getAttribute("style") || "").includes("display: inline") &&
      node.textContent.trim() === "",
    replacement: () => "",
  });

  return td;
}

/* ------------------------------------------------------------------ */
/*  HTTP helpers                                                      */
/* ------------------------------------------------------------------ */

function httpGet(url, accept) {
  const { execSync } = require("child_process");
  const headers = [
    "-H", `Accept: ${accept || "text/html"}`,
    "-H", "User-Agent: fetch-cortex-cloud-docs/1.0",
  ];
  try {
    const result = execSync(
      `curl -sS -L --max-time 30 ${headers.map(h => `'${h}'`).join(" ")} '${url}'`,
      { encoding: "utf-8", maxBuffer: 10 * 1024 * 1024, timeout: 35000 }
    );
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(new Error(`Fetch failed for ${url}: ${err.message}`));
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/* ------------------------------------------------------------------ */
/*  Sitemap parsing                                                   */
/* ------------------------------------------------------------------ */

async function fetchSitemapUrls(productPath) {
  const xml = await httpGet(SITEMAP_URL, "application/xml");
  const $ = cheerio.load(xml, { xmlMode: true });

  const prefix = `${BASE_URL}/${productPath}`;
  const urls = [];

  $("url > loc").each((_, el) => {
    const loc = $(el).text().trim();
    if (loc.startsWith(prefix)) {
      urls.push(loc);
    }
  });

  // Sort by path depth, then alphabetically for stable ordering
  urls.sort((a, b) => {
    const segA = new URL(a).pathname.split("/").filter(Boolean);
    const segB = new URL(b).pathname.split("/").filter(Boolean);
    if (segA.length !== segB.length) return segA.length - segB.length;
    return a.localeCompare(b);
  });

  return urls;
}

/* ------------------------------------------------------------------ */
/*  HTML extraction & cleaning                                        */
/* ------------------------------------------------------------------ */

function extractPageData(html, url) {
  const $ = cheerio.load(html);

  // Title: prefer h1.bookdetail-page-title, fall back to first h1, then <title>
  const title =
    $("h1.bookdetail-page-title").first().text().trim() ||
    $("h1").first().text().trim() ||
    $("title").text().trim();

  // Breadcrumbs → derive hierarchy
  const breadcrumbs = $(".breadcrumb-link")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean);

  // Updated date
  const updated = $(".updated-on-date").first().text().trim().replace(/^Updated on\s*/i, "");

  // Extract main content: look for DITA topic types, then fall back
  const contentSelectors = [
    ".topic.concept",
    ".topic.task",
    ".topic.reference",
    ".topic.topic",
  ];
  let contentEl = null;
  for (const sel of contentSelectors) {
    const el = $(sel).first();
    if (el.length && el.text().trim().length > 50) {
      contentEl = el;
      break;
    }
  }

  if (!contentEl) {
    // Last resort: grab .bookdetail-page-content or main
    contentEl = $(".bookdetail-page-content").first();
    if (!contentEl.length) contentEl = $("main").first();
  }

  if (!contentEl || !contentEl.length) {
    return { title, breadcrumbs, updated, contentHtml: "" };
  }

  // Clean the content HTML before conversion
  let contentHtml = contentEl.html();
  contentHtml = cleanHtml($, contentHtml);

  return { title, breadcrumbs, updated, contentHtml };
}

function cleanHtml($, html) {
  // Remove <colgroup> blocks
  html = html.replace(/<colgroup>[\s\S]*?<\/colgroup>/g, "");

  // Remove empty <p></p>
  html = html.replace(/<p>\s*<\/p>/g, "");

  // Remove script and style tags
  html = html.replace(/<script[\s\S]*?<\/script>/g, "");
  html = html.replace(/<style[\s\S]*?<\/style>/g, "");

  // Strip empty display:inline divs
  html = html.replace(/<div[^>]*style="display:\s*inline[^"]*"[^>]*>\s*<\/div>/g, "");

  // Strip base64 data-URI images (AEM sometimes injects them)
  // Keep the alt text as placeholder
  html = html.replace(
    /<img[^>]*src="data:image\/[^"]*"[^>]*alt="([^"]*)"[^>]*\/?>/g,
    "[image: $1]"
  );
  html = html.replace(
    /<img[^>]*src="data:image\/[^"]*"[^>]*\/?>/g,
    ""
  );

  // Convert layout tables (no thead, single row or nested lists in first row)
  html = html.replace(
    /<table([^>]*)>\s*(?:<tbody>)?([\s\S]*?)(?:<\/tbody>)?\s*<\/table>/g,
    (match, attrs, innerContent) => {
      // If it has a <thead>, keep it as-is
      if (match.includes("<thead")) return match;

      const rows = innerContent.match(/<tr[\s\S]*?<\/tr>/g) || [];
      if (rows.length === 0) return match;

      const firstRow = rows[0] || "";
      const hasNestedLists = firstRow.includes("<ul") || firstRow.includes("<ol");

      if (rows.length === 1 || hasNestedLists) {
        // Layout table → extract cell contents as blocks
        const cellContents = [];
        innerContent.replace(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g, (_, content) => {
          cellContents.push(content.trim());
        });
        return cellContents.join("\n\n");
      }

      // Real table without thead → promote first row
      const headerRow = firstRow
        .replace(/<td([^>]*)>/g, "<th$1>")
        .replace(/<\/td>/g, "</th>");
      const remainingRows = rows.slice(1).join("");
      return `<table${attrs}><thead>${headerRow}</thead><tbody>${remainingRows}</tbody></table>`;
    }
  );

  // Flatten cell content for remaining real tables
  html = html.replace(
    /<(td|th)([^>]*)>([\s\S]*?)<\/(td|th)>/g,
    (match, tag, attrs, inner, closeTag) => {
      return `<${tag}${attrs}>${flattenCellContent(inner)}</${closeTag}>`;
    }
  );

  return html;
}

function flattenCellContent(inner) {
  // Inline note/admonition headings
  inner = inner.replace(
    /<h[1-6][^>]*>\s*(Note|Tip|Danger|Warning|Important|Prerequisite|Prerequisites)\s*<\/h[1-6]>/gi,
    " **$1:** "
  );

  // Semicolons between list items
  inner = inner.replace(/<\/li>\s*<li/g, "</li>; <li");

  // Unwrap <p> inside <li>
  inner = inner.replace(/<li[^>]*>\s*<p>([\s\S]*?)<\/p>\s*<\/li>/g, "<li>$1</li>");

  // Strip <li> tags
  inner = inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/g, "$1");

  // Strip block wrappers
  inner = inner.replace(
    /<\/?(div|ul|ol|pre|blockquote|dl|dt|dd|section|article|aside|nav|header|footer)[^>]*>/g,
    " "
  );
  inner = inner.replace(/<p[^>]*>([\s\S]*?)<\/p>/g, "$1 ");
  inner = inner.replace(/<p[^>]*>/g, "").replace(/<\/p>/g, " ");

  // Strip <br>
  inner = inner.replace(/<br\s*\/?>/g, " ");

  // Collapse whitespace
  inner = inner.replace(/\s+/g, " ").trim();

  return inner;
}

/* ------------------------------------------------------------------ */
/*  Markdown post-processing                                          */
/* ------------------------------------------------------------------ */

function normalizeHeadings(md, topicTitle) {
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const normTitle = norm(topicTitle);

  // Strip leading h1 that duplicates the topic title
  md = md.replace(/^# (.+)\n+/m, (match, text) => {
    return norm(text) === normTitle ? "" : match;
  });

  const isRealHeading = (line) => {
    const m = line.match(/^(#{1,6}) (.+)$/);
    if (!m) return false;
    const text = m[2];
    if (!/^[A-Z*]/.test(text)) return false;
    if (/\.\s*$/.test(text)) return false;
    if (text.includes("=")) return false;
    return true;
  };

  // Find minimum heading level
  const lines = md.split("\n");
  let minLevel = 7;
  let inCodeBlock = false;
  for (const line of lines) {
    if (/^```/.test(line)) { inCodeBlock = !inCodeBlock; continue; }
    if (inCodeBlock) continue;
    const m = line.match(/^(#{1,6}) /);
    if (m && isRealHeading(line)) {
      minLevel = Math.min(minLevel, m[1].length);
    }
  }

  if (minLevel >= 7 || minLevel === 2) return md;

  // Shift headings so minimum = h2
  const shift = 2 - minLevel;
  inCodeBlock = false;
  md = lines
    .map((line) => {
      if (/^```/.test(line)) { inCodeBlock = !inCodeBlock; return line; }
      if (inCodeBlock) return line;
      if (isRealHeading(line)) {
        return line.replace(/^(#{1,6}) /, (_, hashes) => {
          const newLevel = Math.min(Math.max(hashes.length + shift, 2), 6);
          return "#".repeat(newLevel) + " ";
        });
      }
      return line;
    })
    .join("\n");

  return md;
}

function convertAdmonitionHeadings(md) {
  return md.replace(
    /^(\s*)#{2,6} (Prerequisite|Prerequisites|Note|Notes|Important|Warning|Danger|Tip|Caution|Notice):?$/gm,
    "$1**$2:**"
  );
}

/* ------------------------------------------------------------------ */
/*  URL → TOC metadata                                                */
/* ------------------------------------------------------------------ */

function urlToMeta(url, productPath) {
  const pathname = new URL(url).pathname;
  // e.g. /prisma-access-browser/admin/topic → segments = ["prisma-access-browser", "admin", "topic"]
  const segments = pathname.split("/").filter(Boolean);
  // Depth: 0 = product root, 1 = section, 2 = topic, etc.
  // Subtract 1 for the product prefix segment
  const depth = Math.max(0, segments.length - 1);

  // Slug = last segment
  const slug = segments[segments.length - 1] || productPath;

  return { pathname, segments, depth, slug };
}

function sanitizeFilename(title) {
  return title
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 120);
}

/* ------------------------------------------------------------------ */
/*  Core fetch loop                                                   */
/* ------------------------------------------------------------------ */

async function fetchPage(url, index, total, productPath, turndown, outDir) {
  try {
    const html = await httpGet(url);
    const { title, breadcrumbs, updated, contentHtml } = extractPageData(html, url);

    if (!contentHtml || contentHtml.trim().length === 0) {
      console.log(`[${index + 1}/${total}] SKIP (no content): ${url}`);
      return null;
    }

    let md = turndown.turndown(contentHtml);

    // Replace base64 images
    md = md.replace(/!\[([^\]]*)\]\(data:image\/[^)]+\)/g, "[image: $1]");

    // Convert admonition headings
    md = convertAdmonitionHeadings(md);

    // Normalize heading levels
    md = normalizeHeadings(md, title);

    const { depth } = urlToMeta(url, productPath);

    // YAML frontmatter
    const header = [
      "---",
      `title: "${title.replace(/"/g, '\\"')}"`,
      `url: "${url}"`,
      `depth: ${depth}`,
      ...(breadcrumbs.length ? [`breadcrumbs: "${breadcrumbs.join(" > ")}"`] : []),
      ...(updated ? [`updated: "${updated}"`] : []),
      "---",
      "",
      `# ${title}`,
      "",
    ].join("\n");

    md = header + md;

    const filename = `${String(index + 1).padStart(4, "0")}-${sanitizeFilename(title)}.md`;
    fs.writeFileSync(path.join(outDir, filename), md, "utf-8");
    console.log(`[${index + 1}/${total}] ${filename}`);
    return filename;
  } catch (err) {
    console.error(`[${index + 1}/${total}] FAILED: ${url} - ${err.message}`);
    return null;
  }
}

async function main() {
  const productKey = parseProductFlag();
  if (!productKey) return;

  const product = PRODUCTS[productKey];
  const outDir = path.join(__dirname, "..", product.outDir);
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`Fetching sitemap for ${product.name}...`);
  const urls = await fetchSitemapUrls(product.path);
  console.log(`Found ${urls.length} pages in sitemap.\n`);

  if (urls.length === 0) {
    console.error("No URLs found. Check the product path and sitemap.");
    process.exit(1);
  }

  const turndown = createTurndown();
  let written = 0;

  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map((url, j) =>
        fetchPage(url, i + j, urls.length, product.path, turndown, outDir)
      )
    );
    written += results.filter(Boolean).length;
    if (i + CONCURRENCY < urls.length) await sleep(DELAY_MS);
  }

  console.log(`\nDone. ${written}/${urls.length} pages saved to ${outDir}`);
}

/* ------------------------------------------------------------------ */
/*  Exports for testing                                               */
/* ------------------------------------------------------------------ */

module.exports = {
  fetchSitemapUrls,
  extractPageData,
  cleanHtml,
  flattenCellContent,
  normalizeHeadings,
  convertAdmonitionHeadings,
  urlToMeta,
  createTurndown,
};

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
