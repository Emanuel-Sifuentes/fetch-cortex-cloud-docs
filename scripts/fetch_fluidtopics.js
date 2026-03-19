const https = require("https");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const TurndownService = require("turndown");
const { gfm } = require("turndown-plugin-gfm");
const { MAP_IDS, parseMapFlag } = require("./map_config.js");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const OUT_DIR = path.join(__dirname, "..", "sources_fetch");
const CONCURRENCY = 5;
const DELAY_MS = 200;
const MAX_LI_COUNT = 3;
const MAX_CELL_LENGTH = 200;
const COMPLEX_ROW_THRESHOLD = 0.5;

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

function fetch(urlPath, accept) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE);
    const opts = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: { Accept: accept || "application/json" },
    };
    https
      .get(opts, (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${urlPath}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString()));
      })
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

function extractTopLevelTables(html) {
  const segments = [];
  let depth = 0;
  let tableStart = -1;
  let lastEnd = 0;
  let i = 0;

  while (i < html.length) {
    if (html.startsWith("<table", i) && (html[i + 6] === ">" || html[i + 6] === " ")) {
      if (depth === 0) {
        if (i > lastEnd) {
          segments.push({ type: "content", html: html.slice(lastEnd, i) });
        }
        tableStart = i;
      }
      depth++;
      i += 6;
    } else if (html.startsWith("</table>", i)) {
      depth--;
      if (depth === 0) {
        const end = i + 8;
        segments.push({ type: "table", html: html.slice(tableStart, end) });
        lastEnd = end;
      }
      i += 8;
    } else {
      i++;
    }
  }

  if (lastEnd < html.length) {
    segments.push({ type: "content", html: html.slice(lastEnd) });
  }

  return segments;
}

function isCellComplex(cellHtml) {
  if (/<table\b/i.test(cellHtml)) return true;
  if (/<pre\b/i.test(cellHtml)) return true;
  if (/<code\b[^>]*>[\s\S]*<\/code>/i.test(cellHtml) && /<(p|div|ul|ol)\b/i.test(cellHtml)) return true;

  const liCount = (cellHtml.match(/<li\b/gi) || []).length;
  if (liCount > MAX_LI_COUNT) return true;

  const textOnly = cellHtml.replace(/<[^>]+>/g, "").trim();
  if (textOnly.length > MAX_CELL_LENGTH && /<(ul|ol|pre|table|div|p)\b/i.test(cellHtml)) return true;

  return false;
}

function analyzeTable(tableHtml, extractedSections) {
  const theadMatch = tableHtml.match(/<thead>([\s\S]*?)<\/thead>/);
  if (!theadMatch) return tableHtml;

  const headerRow = theadMatch[1];
  const thCount = (headerRow.match(/<th\b[^>]*>/g) || []).length;
  if (thCount === 0) return tableHtml;

  const tbodyMatch = tableHtml.match(/<tbody>([\s\S]*?)<\/tbody>/);
  if (!tbodyMatch) return tableHtml;

  const rows = tbodyMatch[1].match(/<tr[\s\S]*?<\/tr>/g) || [];
  if (rows.length === 0) return tableHtml;

  const classified = rows.map((row) => {
    const tds = row.match(/<td[\s\S]*?<\/td>/g) || [];
    const hasColspan = /<td[^>]+colspan/i.test(row);
    const isSectionDivider = hasColspan || (tds.length === 1 && thCount > 1);

    if (isSectionDivider) return { row, type: "divider" };

    const isComplex = tds.some((td) => {
      const inner = td.replace(/^<td[^>]*>/, "").replace(/<\/td>$/, "");
      return isCellComplex(inner);
    });

    return { row, type: isComplex ? "complex" : "simple" };
  });

  const dataRows = classified.filter((r) => r.type !== "divider");
  const complexCount = dataRows.filter((r) => r.type === "complex").length;
  const hasDividers = classified.some((r) => r.type === "divider");

  // All simple, no dividers → passthrough
  if (complexCount === 0 && !hasDividers) return tableHtml;

  // Extract table-level attributes for reconstructing sub-tables
  const tableAttrsMatch = tableHtml.match(/^<table([^>]*)>/);
  const tableAttrs = tableAttrsMatch ? tableAttrsMatch[1] : "";

  // >50% complex → extract entire table
  if (dataRows.length > 0 && complexCount / dataRows.length > COMPLEX_ROW_THRESHOLD) {
    return extractAllRows(classified, headerRow, tableAttrs, extractedSections);
  }

  // Has dividers → split at dividers
  if (hasDividers) {
    return splitAtDividers(classified, headerRow, tableAttrs, extractedSections);
  }

  // Mixed → split at complex rows
  return splitAtComplexRows(classified, headerRow, tableAttrs, extractedSections);
}

function extractAllRows(classified, headerRow, tableAttrs, extractedSections) {
  const parts = [];
  for (const { row, type } of classified) {
    if (type === "divider") {
      const text = row.replace(/<[^>]+>/g, "").trim();
      parts.push(`<p><strong>${text}</strong></p>`);
    } else {
      parts.push(extractToSections(row, headerRow, extractedSections));
    }
  }
  return parts.join("\n\n");
}

function splitAtDividers(classified, headerRow, tableAttrs, extractedSections) {
  const segments = [];
  let currentRowHtmls = [];

  const flushTable = () => {
    if (currentRowHtmls.length === 0) return;
    segments.push(analyzeSubTable(currentRowHtmls, headerRow, tableAttrs, extractedSections));
    currentRowHtmls = [];
  };

  for (const { row, type } of classified) {
    if (type === "divider") {
      flushTable();
      const text = row.replace(/<[^>]+>/g, "").trim();
      segments.push(`<p><strong>${text}</strong></p>`);
    } else {
      currentRowHtmls.push(row);
    }
  }
  flushTable();

  return segments.join("\n\n");
}

// Re-analyzes rows in a sub-table after divider splitting.
// Divider rows are not possible here — they were already split at the parent level.
function analyzeSubTable(rowHtmls, headerRow, tableAttrs, extractedSections) {
  const classified = rowHtmls.map((row) => {
    const tds = row.match(/<td[\s\S]*?<\/td>/g) || [];
    const isComplex = tds.some((td) => {
      const inner = td.replace(/^<td[^>]*>/, "").replace(/<\/td>$/, "");
      return isCellComplex(inner);
    });
    return { row, type: isComplex ? "complex" : "simple" };
  });

  const complexCount = classified.filter((r) => r.type === "complex").length;

  if (complexCount === 0) {
    const tbody = rowHtmls.join("");
    return `<table${tableAttrs}><thead>${headerRow}</thead><tbody>${tbody}</tbody></table>`;
  }

  if (classified.length > 0 && complexCount / classified.length > COMPLEX_ROW_THRESHOLD) {
    return extractAllRows(classified, headerRow, tableAttrs, extractedSections);
  }

  return splitAtComplexRows(classified, headerRow, tableAttrs, extractedSections);
}

function splitAtComplexRows(classified, headerRow, tableAttrs, extractedSections) {
  const segments = [];
  let simpleRows = [];

  const flushSimple = () => {
    if (simpleRows.length === 0) return;
    const tbody = simpleRows.join("");
    segments.push(`<table${tableAttrs}><thead>${headerRow}</thead><tbody>${tbody}</tbody></table>`);
    simpleRows = [];
  };

  for (const { row, type } of classified) {
    if (type === "complex") {
      flushSimple();
      segments.push(extractToSections(row, headerRow, extractedSections));
    } else {
      simpleRows.push(row);
    }
  }
  flushSimple();

  return segments.join("\n\n");
}

function extractCells(row) {
  const cells = [];
  let i = 0;
  while (i < row.length) {
    const openMatch = row.slice(i).match(/^<td([^>]*)>/);
    if (!openMatch) { i++; continue; }

    const contentStart = i + openMatch[0].length;
    let depth = 1;
    let j = contentStart;

    while (j < row.length && depth > 0) {
      if (row.startsWith("<td", j) && (row[j + 3] === ">" || row[j + 3] === " ")) {
        depth++;
        j += 3;
      } else if (row.startsWith("</td>", j)) {
        depth--;
        if (depth === 0) {
          cells.push(row.slice(contentStart, j));
          j += 5;
          break;
        }
        j += 5;
      } else {
        j++;
      }
    }
    i = j;
  }
  return cells;
}

function extractToSections(row, headerRow, extractedSections) {
  try {
    const cells = extractCells(row);

    if (cells.length === 0) return row;

    const heading = cells[0].replace(/<[^>]+>/g, "").trim();
    const parts = [`### ${heading}`, ""];

    for (let i = 1; i < cells.length; i++) {
      const cell = cells[i];
      parts.push(...processCellToMarkdown(cell, extractedSections));
    }

    const markdown = parts.join("\n");
    const id = crypto.randomUUID();
    extractedSections.set(id, markdown);
    return `<p>EXTRACTED-${id}</p>`;
  } catch {
    return row;
  }
}

function processCellToMarkdown(cellHtml, extractedSections) {
  const parts = [];

  // Handle nested tables: use extractTopLevelTables for correct nesting,
  // then recursively process each through cleanTableHtml
  let html = cellHtml;
  const nestedTables = [];
  const segments = extractTopLevelTables(html);
  html = segments.map((seg) => {
    if (seg.type === "table") {
      const processed = cleanTableHtml(seg.html, extractedSections);
      nestedTables.push(processed);
      return "<!--NESTED_TABLE-->";
    }
    return seg.html;
  }).join("");

  // Extract code blocks
  const codeBlocks = [];
  html = html.replace(/<pre[^>]*>\s*<code([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/g, (_, attrs, code) => {
    const langMatch = attrs.match(/language-(\w+)/);
    const lang = langMatch ? langMatch[1] : "";
    codeBlocks.push({ lang, code: code.trim() });
    return "<!--CODE_BLOCK-->";
  });

  // Also handle <pre> without <code>
  html = html.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/g, (_, code) => {
    codeBlocks.push({ lang: "", code: code.trim() });
    return "<!--CODE_BLOCK-->";
  });

  // Process lists
  html = html.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/g, (_, listContent) => {
    const items = [];
    listContent.replace(/<li[^>]*>([\s\S]*?)<\/li>/g, (__, item) => {
      items.push(`- ${item.replace(/<[^>]+>/g, "").trim()}`);
    });
    return items.join("\n") + "\n";
  });

  html = html.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/g, (_, listContent) => {
    const items = [];
    let num = 1;
    listContent.replace(/<li[^>]*>([\s\S]*?)<\/li>/g, (__, item) => {
      items.push(`${num}. ${item.replace(/<[^>]+>/g, "").trim()}`);
      num++;
    });
    return items.join("\n") + "\n";
  });

  // Strip remaining HTML tags and split into paragraphs
  const text = html
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    .trim();

  let codeIdx = 0;
  let nestedIdx = 0;
  for (const segment of text.split("<!--CODE_BLOCK-->")) {
    // Handle nested table placeholders within text segments
    const subSegments = segment.split("<!--NESTED_TABLE-->");
    for (let s = 0; s < subSegments.length; s++) {
      const trimmed = subSegments[s].trim();
      if (trimmed) parts.push(trimmed, "");
      if (s < subSegments.length - 1 && nestedIdx < nestedTables.length) {
        parts.push(nestedTables[nestedIdx++], "");
      }
    }
    if (codeIdx < codeBlocks.length) {
      const { lang, code } = codeBlocks[codeIdx++];
      parts.push(`\`\`\`${lang}`, code, "```", "");
    }
  }

  // Handle trailing code blocks
  while (codeIdx < codeBlocks.length) {
    const { lang, code } = codeBlocks[codeIdx++];
    parts.push(`\`\`\`${lang}`, code, "```", "");
  }

  // Handle trailing nested tables
  while (nestedIdx < nestedTables.length) {
    parts.push(nestedTables[nestedIdx++], "");
  }

  return parts;
}

function flattenCellContent(inner) {
  // Strip note/admonition headings: <h3 class="title">Note</h3> → " **Note:** "
  inner = inner.replace(/<h[1-6][^>]*>\s*(Note|Tip|Danger|Warning|Important|Prerequisite|Prerequisites)\s*<\/h[1-6]>/gi, " **$1:** ");

  // Insert numbered markers between consecutive list items before stripping tags
  let itemNum = 1;
  inner = inner.replace(/<\/li>\s*<li\b/g, () => {
    itemNum++;
    return `</li> (${itemNum}) <li`;
  });
  if (itemNum > 1) {
    inner = inner.replace(/<li\b/, "(1) <li");
  }

  // Unwrap <p> inside <li>: <li><p>text</p></li> → <li>text</li>
  inner = inner.replace(/<li[^>]*>\s*<p>([\s\S]*?)<\/p>\s*<\/li>/g, "<li>$1</li>");

  // Strip <li> tags, keeping content
  inner = inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/g, "$1");

  // Strip remaining block wrappers (div, ul, ol, p) but keep their content
  inner = inner.replace(/<\/?(div|ul|ol|section|article|aside|nav|header|footer|table|tbody|thead|tr|td|th)[^>]*>/g, " ");
  inner = inner.replace(/<p>([\s\S]*?)<\/p>/g, "$1 ");
  inner = inner.replace(/<p>/g, "").replace(/<\/p>/g, " ");

  // Collapse whitespace
  inner = inner.replace(/\s+/g, " ").trim();

  return inner;
}

function cleanTableHtml(html, extractedSections = new Map()) {
  // Step 1: Remove empty <p></p> tags
  html = html.replace(/<p>\s*<\/p>/g, "");

  // Step 1b: Remove <colgroup> blocks (confuse turndown)
  html = html.replace(/<colgroup>[\s\S]*?<\/colgroup>/g, "");

  // Step 2: Isolate top-level tables
  const segments = extractTopLevelTables(html);

  // Steps 3-7: Process each table segment
  const processed = segments.map((segment) => {
    if (segment.type !== "table") return segment.html;

    let tableHtml = segment.html;

    // Step 3: Detect layout tables → prose (only if no pre-existing <thead>)
    if (!/<thead>/i.test(tableHtml)) {
      const tbodyMatch = tableHtml.match(/^<table([^>]*)>\s*<tbody>([\s\S]*)<\/tbody>\s*<\/table>$/);
      if (tbodyMatch) {
        const [, attrs, tbodyContent] = tbodyMatch;
        const rows = tbodyContent.match(/<tr[\s\S]*?<\/tr>/g) || [];
        const firstRow = rows[0] || "";
        const hasNestedLists = firstRow.includes("<ul") || firstRow.includes("<ol");

        if (rows.length === 1 || hasNestedLists) {
          const cellContents = [];
          tbodyContent.replace(/<td[^>]*>([\s\S]*?)<\/td>/g, (_, content) => {
            cellContents.push(content.trim());
          });
          return cellContents.join("\n\n");
        }

        // Step 4: Promote first row to <thead>
        const headerRow = firstRow
          .replace(/<td([^>]*)>/g, "<th$1>")
          .replace(/<\/td>/g, "</th>");
        const remainingRows = rows.slice(1).join("");
        tableHtml = `<table${attrs}><thead>${headerRow}</thead><tbody>${remainingRows}</tbody></table>`;
      }
    }

    // Step 5: Pad rows with fewer <td> than <th> count
    const theadMatch = tableHtml.match(/<thead>([\s\S]*?)<\/thead>/);
    if (theadMatch) {
      const thCount = (theadMatch[1].match(/<th\b[^>]*>/g) || []).length;
      if (thCount > 0) {
        tableHtml = tableHtml.replace(/<tbody>([\s\S]*?)<\/tbody>/, (_, tbody) => {
          const padded = tbody.replace(/<tr[\s\S]*?<\/tr>/g, (row) => {
            const tdCount = (row.match(/<td[\s\S]*?<\/td>/g) || []).length;
            if (tdCount < thCount) {
              const padding = "<td></td>".repeat(thCount - tdCount);
              return row.replace(/<\/tr>/, padding + "</tr>");
            }
            return row;
          });
          return `<tbody>${padded}</tbody>`;
        });
      }
    }

    // Step 6: Analyze and route (complex extraction, splitting, or passthrough)
    tableHtml = analyzeTable(tableHtml, extractedSections);

    // Step 7: Flatten remaining simple table cells.
    // Safe to use non-greedy [\s\S]*? here: analyzeTable (step 6) already extracted
    // all cells containing nested <td> tags, so remaining cells are flat.
    tableHtml = tableHtml.replace(/<(td|th)([^>]*)>([\s\S]*?)<\/(td|th)>/g, (match, tag, attrs, inner, closeTag) => {
      return `<${tag}${attrs}>${flattenCellContent(inner)}</${closeTag}>`;
    });

    return tableHtml;
  });

  // Step 8: Reassemble
  return processed.join("");
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

function removeDuplicateSeparators(md) {
  const lines = md.split("\n");
  const result = [];
  let prevIsSeparator = false;
  for (const line of lines) {
    const isSeparator = /^\|[\s\-:]+(\|[\s\-:]+)*\|\s*$/.test(line);
    if (isSeparator && prevIsSeparator) continue;
    result.push(line);
    prevIsSeparator = isSeparator;
  }
  return result.join("\n");
}

function convertAdmonitionHeadings(md) {
  return md.replace(
    /^(\s*)#{2,6} (Prerequisite|Prerequisites|Note|Notes|Important|Warning|Danger|Tip|Caution|Notice):?$/gm,
    "$1**$2:**"
  );
}

async function fetchTopic(topic, index, total, mapId, sourceMap) {
  const contentUrl = `/api/khub/maps/${mapId}/topics/${topic.contentId}/content`;
  try {
    const extractedSections = new Map();
    const html = cleanTableHtml(await fetch(contentUrl, "text/html"), extractedSections);
    let md = turndown.turndown(html);

    // 1. Replace base64 data-URI images with a placeholder
    md = md.replace(/!\[([^\]]*)\]\(data:image\/[^)]+\)/g, "[image: $1]");

    // 2. Convert admonition headings to bold labels
    md = convertAdmonitionHeadings(md);

    // 3. Normalize heading levels
    md = normalizeHeadings(md, topic.title);

    // 4. Remove duplicate separator rows
    md = removeDuplicateSeparators(md);

    // 5. Replace extracted-section placeholders (LAST — after all markdown post-processing)
    for (const [id, content] of extractedSections) {
      md = md.replace(`EXTRACTED-${id}`, content);
    }

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

    const filename = `${String(index + 1).padStart(4, "0")}-${sanitizeFilename(topic.title)}.md`;
    fs.writeFileSync(path.join(OUT_DIR, filename), md, "utf-8");
    console.log(`[${index + 1}/${total}] ${filename}`);
  } catch (err) {
    console.error(`[${index + 1}/${total}] FAILED: ${topic.title} - ${err.message}`);
  }
}

async function main() {
  const mapFlag = parseMapFlag("all");
  fs.mkdirSync(OUT_DIR, { recursive: true });

  if (mapFlag === "appsec") {
    console.log("AppSec content comes from the Runtime fetch. Run with --map runtime or no flag.");
    return;
  }

  if (mapFlag === "all" || mapFlag === "runtime") {
    console.log("Fetching Runtime TOC...");
    const tocJson = await fetch(`/api/khub/maps/${MAP_IDS.runtime}/toc`);
    const toc = JSON.parse(tocJson);
    const topics = flattenToc(toc);
    console.log(`Found ${topics.length} Runtime topics. Fetching content...\n`);

    for (let i = 0; i < topics.length; i += CONCURRENCY) {
      const batch = topics.slice(i, i + CONCURRENCY);
      await Promise.all(
        batch.map((topic, j) => fetchTopic(topic, i + j, topics.length, MAP_IDS.runtime))
      );
      if (i + CONCURRENCY < topics.length) await sleep(DELAY_MS);
    }
    console.log(`\nRuntime: ${topics.length} topics saved to ${OUT_DIR}`);
  }

  if (mapFlag === "all" || mapFlag === "posture") {
    console.log("\nFetching Posture + Runtime TOCs for supplement...");
    const [postureTocJson, runtimeTocJson] = await Promise.all([
      fetch(`/api/khub/maps/${MAP_IDS.posture}/toc`),
      fetch(`/api/khub/maps/${MAP_IDS.runtime}/toc`),
    ]);
    const postureToc = flattenToc(JSON.parse(postureTocJson));
    const runtimeToc = flattenToc(JSON.parse(runtimeTocJson));

    const runtimeIds = new Set(runtimeToc.map((e) => e.contentId));
    const runtimeTitles = new Set(runtimeToc.map((e) => e.title));
    const postureUnique = postureToc.filter(
      (e) => !runtimeIds.has(e.contentId) && !runtimeTitles.has(e.title)
    );
    const seen = new Set();
    const deduped = postureUnique.filter((e) => {
      if (seen.has(e.contentId)) return false;
      seen.add(e.contentId);
      return true;
    });

    if (deduped.length === 0) {
      console.log("No Posture-unique topics to fetch.");
    } else {
      const existingFiles = fs.readdirSync(OUT_DIR).filter((f) => /^\d+-/.test(f));
      const startIndex = existingFiles.length;

      console.log(`Found ${deduped.length} Posture-unique topics. Fetching...\n`);
      for (let i = 0; i < deduped.length; i += CONCURRENCY) {
        const batch = deduped.slice(i, i + CONCURRENCY);
        await Promise.all(
          batch.map((topic, j) =>
            fetchTopic(topic, startIndex + i + j, startIndex + deduped.length, MAP_IDS.posture, "posture")
          )
        );
        if (i + CONCURRENCY < deduped.length) await sleep(DELAY_MS);
      }
      console.log(`\nPosture supplement: ${deduped.length} topics saved to ${OUT_DIR}`);
    }
  }
}

module.exports = {
  extractTopLevelTables,
  analyzeTable,
  extractToSections,
  extractCells,
  flattenCellContent,
  cleanTableHtml,
  normalizeHeadings,
  removeDuplicateSeparators,
  convertAdmonitionHeadings,
  isCellComplex,
};

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
