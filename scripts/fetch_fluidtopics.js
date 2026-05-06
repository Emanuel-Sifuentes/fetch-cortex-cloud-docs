const fs = require("fs");
const path = require("path");
const TurndownService = require("turndown");
const { gfm } = require("turndown-plugin-gfm");
const { MAP_IDS, PRODUCTS, parseStringFlag, resolveTargetMaps } = require("./map_config.js");
const { httpGetWithRetry, sleep } = require("./http_retry.js");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const OUT_DIR = path.join(__dirname, "..", "sources_fetch");
const CONCURRENCY = 10;
const DELAY_MS = 200;

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});
turndown.use(gfm);

// Fence <pre> blocks that turndown misses (e.g. <pre class="programlisting">)
turndown.addRule("preWithoutCode", {
  filter: (node) =>
    node.nodeName === "PRE" &&
    !node.querySelector("code"),
  replacement: (content) => {
    const code = content.replace(/^\n+|\n+$/g, "");
    return "\n\n```\n" + code + "\n```\n\n";
  },
});

const fetch = (urlPath, accept) => httpGetWithRetry(urlPath, { base: BASE, accept });

function sanitizeFilename(title) {
  return title
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 120);
}

function flattenToc(nodes, depth = 0) {
  const result = [];
  for (const node of nodes) {
    result.push({ ...node, depth });
    if (node.children && node.children.length) {
      result.push(...flattenToc(node.children, depth + 1));
    }
  }
  return result;
}

function flattenCellContent(inner) {
  // Strip note/admonition headings: <h3 class="title">Note</h3> → " **Note:** "
  inner = inner.replace(/<h[1-6][^>]*>\s*(Note|Tip|Danger|Warning|Important|Prerequisite|Prerequisites)\s*<\/h[1-6]>/gi, " **$1:** ");

  // Insert semicolons between consecutive list items before stripping tags
  inner = inner.replace(/<\/li>\s*<li/g, "</li>; <li");

  // Unwrap <p> inside <li>: <li><p>text</p></li> → <li>text</li>
  inner = inner.replace(/<li[^>]*>\s*<p>([\s\S]*?)<\/p>\s*<\/li>/g, "<li>$1</li>");

  // Strip <li> tags, keeping content
  inner = inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/g, "$1");

  // Strip remaining block wrappers (div, ul, ol, pre, blockquote, etc.) but keep their content
  inner = inner.replace(/<\/?(div|ul|ol|pre|blockquote|dl|dt|dd|section|article|aside|nav|header|footer)[^>]*>/g, " ");
  inner = inner.replace(/<p[^>]*>([\s\S]*?)<\/p>/g, "$1 ");
  inner = inner.replace(/<p[^>]*>/g, "").replace(/<\/p>/g, " ");

  // Strip <br> tags
  inner = inner.replace(/<br\s*\/?>/g, " ");

  // Collapse whitespace
  inner = inner.replace(/\s+/g, " ").trim();

  return inner;
}

function cleanTableHtml(html) {
  // Remove empty <p></p> tags
  html = html.replace(/<p>\s*<\/p>/g, "");

  // Remove <colgroup> blocks (confuse turndown)
  html = html.replace(/<colgroup>[\s\S]*?<\/colgroup>/g, "");

  // Convert layout tables to prose BEFORE flattening cells.
  // Layout tables: no <thead>, single row, or first row has nested lists.
  html = html.replace(
    /<table([^>]*)>\s*<tbody>([\s\S]*?)<\/tbody>\s*<\/table>/g,
    (match, attrs, tbodyContent) => {
      const rows = tbodyContent.match(/<tr[\s\S]*?<\/tr>/g) || [];
      const firstRow = rows[0] || "";
      const hasNestedLists = firstRow.includes("<ul") || firstRow.includes("<ol");

      if (rows.length === 1 || hasNestedLists) {
        // Extract cell contents and return as plain HTML blocks
        const cellContents = [];
        tbodyContent.replace(/<td[^>]*>([\s\S]*?)<\/td>/g, (_, content) => {
          cellContents.push(content.trim());
        });
        return cellContents.join("\n\n");
      }

      // Not a layout table — keep it, promote first row to <thead>
      const headerRow = firstRow
        .replace(/<td([^>]*)>/g, "<th$1>")
        .replace(/<\/td>/g, "</th>");
      const remainingRows = rows.slice(1).join("");
      return `<table${attrs}><thead>${headerRow}</thead><tbody>${remainingRows}</tbody></table>`;
    }
  );

  // Flatten all table cell content to inline (only for remaining real tables)
  html = html.replace(/<(td|th)([^>]*)>([\s\S]*?)<\/(td|th)>/g, (match, tag, attrs, inner, closeTag) => {
    return `<${tag}${attrs}>${flattenCellContent(inner)}</${closeTag}>`;
  });

  return html;
}

function normalizeHeadings(md, topicTitle) {
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const normTitle = norm(topicTitle);

  // Strip any leading h1 that duplicates the topic title (we add our own)
  md = md.replace(/^# (.+)\n+/m, (match, text) => {
    return norm(text) === normTitle ? "" : match;
  });

  // Heading regex: must start with # and a space, then a capital letter or **bold**,
  // and NOT look like a code comment (no trailing period/full sentence)
  const isRealHeading = (line) => {
    const m = line.match(/^(#{1,6}) (.+)$/);
    if (!m) return false;
    const text = m[2];
    // Must start with capital or **
    if (!/^[A-Z*]/.test(text)) return false;
    // Reject lines ending with period (sentences = code comments, not headings)
    if (/\.\s*$/.test(text)) return false;
    // Reject lines containing = (code assignments/comments like cortex:skip=...)
    if (text.includes("=")) return false;
    return true;
  };


  // Find the minimum heading level in the content (only real headings outside code blocks)
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

  if (minLevel >= 7 || minLevel === 2) return md; // no headings or already fine

  // Shift only real headings outside code blocks so the minimum becomes h2
  const shift = 2 - minLevel;
  inCodeBlock = false;
  md = lines.map((line) => {
    if (/^```/.test(line)) { inCodeBlock = !inCodeBlock; return line; }
    if (inCodeBlock) return line;
    if (isRealHeading(line)) {
      return line.replace(/^(#{1,6}) /, (_, hashes) => {
        const newLevel = Math.min(Math.max(hashes.length + shift, 2), 6);
        return "#".repeat(newLevel) + " ";
      });
    }
    return line;
  }).join("\n");

  return md;
}

function convertAdmonitionHeadings(md) {
  return md.replace(
    /^(\s*)#{2,6} (Prerequisite|Prerequisites|Note|Notes|Important|Warning|Danger|Tip|Caution|Notice):?$/gm,
    "$1**$2:**"
  );
}

async function fetchTopic(topic, index, total, mapId, outDir, sourceMap) {
  const contentUrl = `/api/khub/maps/${mapId}/topics/${topic.contentId}/content`;
  try {
    const html = cleanTableHtml(await fetch(contentUrl, "text/html"));
    let md = turndown.turndown(html);

    // Replace base64 data-URI images with a placeholder
    md = md.replace(/!\[([^\]]*)\]\(data:image\/[^)]+\)/g, "[image: $1]");

    // Convert admonition headings to bold labels
    md = convertAdmonitionHeadings(md);

    // Normalize heading levels: shift so smallest heading becomes h2,
    // then strip any leading h1 that duplicates the topic title
    md = normalizeHeadings(md, topic.title);

    // Prepend metadata header
    const header = [
      `---`,
      `title: "${topic.title.replace(/"/g, '\\"')}"`,
      `tocId: "${topic.tocId}"`,
      `contentId: "${topic.contentId}"`,
      `prettyUrl: "${topic.prettyUrl}"`,
      `depth: ${topic.depth}`,
      ...(sourceMap ? [`sourceMap: "${sourceMap}"`] : []),
      `---`,
      "",
      `# ${topic.title}`,
      "",
    ].join("\n");

    md = header + md;

    const filename = `${sanitizeFilename(topic.title)}--${topic.contentId}.md`;
    fs.writeFileSync(path.join(outDir, filename), md, "utf-8");
    console.log(`[${index + 1}/${total}] ${filename}`);
  } catch (err) {
    console.error(`[${index + 1}/${total}] FAILED: ${topic.title} - ${err.message}`);
  }
}

function outDirForMap(mapKey) {
  return path.join(OUT_DIR, mapKey);
}

function applyDeltaRemovals(outDir, removeIds) {
  if (!removeIds || removeIds.length === 0) return 0;
  let count = 0;
  const files = fs.readdirSync(outDir);
  for (const cid of removeIds) {
    const suffix = `--${cid}.md`;
    for (const f of files) {
      if (f.endsWith(suffix)) {
        fs.unlinkSync(path.join(outDir, f));
        count++;
      }
    }
  }
  return count;
}

async function fetchTopicsBatch(topics, mapId, outDir, sourceMap) {
  for (let i = 0; i < topics.length; i += CONCURRENCY) {
    const batch = topics.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map((topic, j) => fetchTopic(topic, i + j, topics.length, mapId, outDir, sourceMap))
    );
    if (i + CONCURRENCY < topics.length) await sleep(DELAY_MS);
  }
}

async function fetchSimpleMap(mapKey) {
  const outDir = outDirForMap(mapKey);
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`Fetching ${mapKey} TOC...`);
  const tocJson = await fetch(`/api/khub/maps/${MAP_IDS[mapKey]}/toc`);
  const toc = JSON.parse(tocJson);
  const topics = flattenToc(toc);
  console.log(`Found ${topics.length} ${mapKey} topics. Fetching content...\n`);

  await fetchTopicsBatch(topics, MAP_IDS[mapKey], outDir);
  console.log(`\n${mapKey}: ${topics.length} topics saved to ${outDir}`);
}

function postureSupplementFilter(runtimeToc) {
  const runtimeIds = new Set(runtimeToc.map((e) => e.contentId));
  const runtimeTitles = new Set(runtimeToc.map((e) => e.title));
  return (topics) => {
    const seen = new Set();
    return topics.filter((t) => {
      if (runtimeIds.has(t.contentId) || runtimeTitles.has(t.title)) return false;
      if (seen.has(t.contentId)) return false;
      seen.add(t.contentId);
      return true;
    });
  };
}

async function fetchSimpleMapDelta(mapKey, delta, options = {}) {
  const { sourceMap, topicFilter, tocTopics } = options;
  const outDir = outDirForMap(mapKey);
  fs.mkdirSync(outDir, { recursive: true });

  const removed = applyDeltaRemovals(outDir, delta.remove);
  if (removed > 0) console.log(`${mapKey}: removed ${removed} file(s)`);

  if (!delta.fetch || delta.fetch.length === 0) {
    console.log(`${mapKey}: no topics to fetch`);
    return;
  }

  let allTopics = tocTopics;
  if (!allTopics) {
    console.log(`Fetching ${mapKey} TOC for delta (${delta.fetch.length} topic(s))...`);
    const tocJson = await fetch(`/api/khub/maps/${MAP_IDS[mapKey]}/toc`);
    allTopics = flattenToc(JSON.parse(tocJson));
  }

  const fetchSet = new Set(delta.fetch);
  let topics = allTopics.filter((t) => fetchSet.has(t.contentId));
  if (topicFilter) topics = topicFilter(topics);

  const skipped = delta.fetch.length - topics.length;
  if (skipped > 0) console.log(`${mapKey}: ${skipped} delta ID(s) skipped`);

  await fetchTopicsBatch(topics, MAP_IDS[mapKey], outDir, sourceMap);
  console.log(`${mapKey}: ${topics.length} topic(s) saved to ${outDir}`);
}

async function fetchCloudMaps(targets) {
  if (targets.includes("runtime")) {
    const runtimeDir = outDirForMap("runtime");
    fs.mkdirSync(runtimeDir, { recursive: true });

    console.log("Fetching Runtime TOC...");
    const tocJson = await fetch(`/api/khub/maps/${MAP_IDS.runtime}/toc`);
    const topics = flattenToc(JSON.parse(tocJson));
    console.log(`Found ${topics.length} Runtime topics. Fetching content...\n`);

    await fetchTopicsBatch(topics, MAP_IDS.runtime, runtimeDir);
    console.log(`\nRuntime: ${topics.length} topics saved to ${runtimeDir}`);
  }

  if (targets.includes("posture")) {
    const postureDir = outDirForMap("posture");
    fs.mkdirSync(postureDir, { recursive: true });

    console.log("\nFetching Posture + Runtime TOCs for supplement...");
    const [postureTocJson, runtimeTocJson] = await Promise.all([
      fetch(`/api/khub/maps/${MAP_IDS.posture}/toc`),
      fetch(`/api/khub/maps/${MAP_IDS.runtime}/toc`),
    ]);
    const postureToc = flattenToc(JSON.parse(postureTocJson));
    const runtimeToc = flattenToc(JSON.parse(runtimeTocJson));

    const deduped = postureSupplementFilter(runtimeToc)(postureToc);
    if (deduped.length === 0) {
      console.log("No Posture-unique topics to fetch.");
    } else {
      console.log(`Found ${deduped.length} Posture-unique topics. Fetching...\n`);
      await fetchTopicsBatch(deduped, MAP_IDS.posture, postureDir, "posture");
      console.log(`\nPosture supplement: ${deduped.length} topics saved to ${postureDir}`);
    }
  }
}

async function main() {
  const targets = resolveTargetMaps();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const deltaPath = parseStringFlag("--delta");
  const deltas = deltaPath ? JSON.parse(fs.readFileSync(deltaPath, "utf-8")) : null;

  const cloudTargets = targets.filter((t) => PRODUCTS.cloud.includes(t));
  const simpleTargets = targets.filter((t) => !PRODUCTS.cloud.includes(t));

  if (deltas) {
    const runtimeNeedsToc =
      (deltas.runtime && !deltas.runtime.initial && deltas.runtime.fetch?.length > 0) ||
      (deltas.posture && !deltas.posture.initial && deltas.posture.fetch?.length > 0);
    let runtimeToc = null;
    if (runtimeNeedsToc) {
      console.log("Fetching runtime TOC (shared)...");
      runtimeToc = flattenToc(JSON.parse(await fetch(`/api/khub/maps/${MAP_IDS.runtime}/toc`)));
    }

    if (cloudTargets.includes("runtime")) {
      const d = deltas.runtime;
      if (d?.initial) await fetchSimpleMap("runtime");
      else if (d) await fetchSimpleMapDelta("runtime", d, { tocTopics: runtimeToc });
    }
    if (cloudTargets.includes("posture")) {
      const d = deltas.posture;
      if (d?.initial) await fetchCloudMaps(["posture"]);
      else if (d) await fetchSimpleMapDelta("posture", d, {
        sourceMap: "posture",
        topicFilter: postureSupplementFilter(runtimeToc),
      });
    }
    for (const key of simpleTargets) {
      const d = deltas[key];
      if (d?.initial) await fetchSimpleMap(key);
      else if (d) await fetchSimpleMapDelta(key, d);
    }
  } else {
    if (cloudTargets.length > 0) {
      await fetchCloudMaps(cloudTargets);
    }
    for (const key of simpleTargets) {
      await fetchSimpleMap(key);
    }
  }
}

module.exports = {
  flattenCellContent,
  cleanTableHtml,
  normalizeHeadings,
  convertAdmonitionHeadings,
};

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
