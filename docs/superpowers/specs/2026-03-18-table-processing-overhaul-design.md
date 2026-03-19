# Stage 1 Table Processing Overhaul

**Date:** 2026-03-18
**Status:** Approved
**Scope:** `scripts/fetch_fluidtopics.js` (+ new test file)

## Problem

The HTML-to-markdown pipeline produces malformed markdown tables across all 3 combined output files (~400 broken rows total). Root cause: `cleanTableHtml()` and `flattenCellContent()` in `fetch_fluidtopics.js` don't handle complex cell content — nested tables, code blocks, long lists, or colspan section dividers.

These malformed tables produce garbage chunks when ingested by GCP RAG Engine, causing poor retrieval quality and nonsensical answers.

### Issue Categories (verified across all 3 files)

| Issue | posture | runtime | appsec | Root Cause |
|-------|---------|---------|--------|------------|
| Semicolon line continuations | 83 | 32 | 22 | `flattenCellContent()` line 82 inserts `;` between `<li>` items; long cells wrap across lines |
| Multi-line table rows with code blocks | 17 | 8 | 2 | `<pre>/<code>` in `<td>` not handled; whitespace collapse destroys code structure |
| `###` headings inside lists | 29 | 11 | 0 | Admonition regex (line 211) misses `Notes`, `Caution`, `Notice` and trailing colons |
| Inconsistent column counts | 172 rows | 185 rows | 39 rows | Section-divider rows (colspan) not detected; row padding not enforced |
| Nested sub-tables | 3 occurrences | — | — | `<table>` inside `<td>` not in the tag strip list; leaks through |
| Duplicate separator rows | 1 | 0 | 0 | Turndown emits duplicate `\|---\|` rows in edge cases |

## Solution

Overhaul Stage 1 table processing in `fetch_fluidtopics.js`. Primary changes in one file. No new scripts, no new dependencies.

### Design Decision: Complex Content Format

Tables containing content that can't be represented in markdown pipe tables (nested tables, code blocks, multi-paragraph lists) are converted to **heading + prose + code block** format. This is optimal for RAG chunking — each item becomes its own retrievable section.

### Design Decision: Fix Location

All fixes live in Stage 1 (`fetch_fluidtopics.js`) where we have access to the HTML structure. This allows precise detection of nested `<table>`, `<pre>/<code>`, `colspan`, and `<li>` counts before turndown converts them.

## Components

### 0. `extractTopLevelTables(html)` — NEW

Isolates individual top-level `<table>` elements from the HTML string, correctly handling nested tables.

**Algorithm:** Stack-based tag matching. Walk the HTML string finding all `<table` and `</table>` positions. Maintain a depth counter:
- On `<table`: if depth is 0, record start position. Increment depth.
- On `</table>`: decrement depth. If depth reaches 0, record end position. This pair is one top-level table.

Returns a single interleaved array of typed objects representing the HTML in document order:
- `{ type: "table", html: "..." }` — a top-level table's complete HTML
- `{ type: "content", html: "..." }` — non-table HTML between tables

This structure preserves document order and makes reassembly (step 8) a simple `segments.map(s => s.html).join("")`.

**Why this is needed:** The current `cleanTableHtml` uses a regex `/<table([^>]*)>\s*<tbody>([\s\S]*?)<\/tbody>\s*<\/table>/g` with non-greedy matching. This fails when a `<td>` contains a nested `<table>` — the regex matches up to the inner `</table>` instead of the outer one. The stack-based approach handles arbitrary nesting depth correctly.

**No new dependencies required** — this is a simple string scan, not a full DOM parser.

### 1. `analyzeTable(tableHtml)` — NEW

Classifies each `<table>` to determine processing strategy. Runs **after** `<thead>` promotion, so the header row is always identifiable as the `<thead><tr>`.

**Header column count:** Determined by counting `<th>` elements in the `<thead><tr>` using the regex `/<th\b[^>]*>/g` (handles `<th>`, `<th scope="col">`, `<th class="...">`, etc.). Header-level `colspan` attributes are not factored into the count (rare in source data; worst case is a false negative on section-divider detection, which degrades gracefully to existing behavior).

**Per-cell complexity check:** A cell is "complex" if it contains any of:
- A nested `<table>` element
- A `<pre>` or block-level `<code>` element
- More than `MAX_LI_COUNT` (3) `<li>` items
- Flattened text exceeding `MAX_CELL_LENGTH` (200) characters **AND** the cell also contains block-level elements (`<ul>`, `<ol>`, `<pre>`, `<table>`, `<div>`, or `<p>` tags). Plain-text-only cells that exceed the character threshold are NOT considered complex — they are simply long descriptions that flatten fine.

These thresholds are defined as constants for easy tuning.

**Per-row classification:**
- **Complex row:** Any cell in the row is complex
- **Section-divider row:** Single-cell row in a multi-column table (has `colspan` attribute or just one `<td>` when header has multiple `<th>`)
- **Simple row:** All cells under complexity thresholds

**Denominator for threshold calculation:** "Data rows" means all `<tbody><tr>` elements excluding section-divider rows. Section dividers are always extracted regardless of the threshold.

**Per-table routing:**
- More than 50% of data rows (excluding section-divider rows) are complex → convert **entire table** to heading + prose sections
- Mixed (some complex, some simple) → split the table at complex row boundaries (see mixed-table algorithm below)
- Section-divider rows → split table into smaller tables with bold heading between segments (see section-divider algorithm below)
- All simple → existing pipeline path (no change)

**Section-divider splitting algorithm:**
1. Identify single-cell `<tr>` rows (detected by `colspan` attribute or single `<td>` count vs header `<th>` count)
2. Split the `<table>` HTML into segments at each section-divider row
3. Each segment becomes its own `<table>` element, inheriting the original `<table>` attributes and with the original `<thead>` header row prepended
4. The section-divider row's text content becomes a `<p><strong>text</strong></p>` block between segments
5. Each split sub-table is analyzed for complex rows (the full per-row classification runs on each sub-table). If a sub-table contains complex rows, those are extracted via the mixed-table algorithm below.

**Mixed-table splitting algorithm:**

When a table has a mix of simple and complex rows:

1. Walk the `<tbody>` rows in order
2. Accumulate consecutive simple rows into a "simple segment"
3. When a complex row is encountered, emit the accumulated simple segment as a complete `<table>` (with `<thead>` header), then emit the complex row via `extractToSections()`
4. Resume accumulating simple rows into a new segment
5. At end, emit any remaining simple segment as a final `<table>`

Concrete HTML example — a 3-row table where row 2 is complex:

**Input:**
```html
<table><thead><tr><th>Operator</th><th>Description</th></tr></thead>
<tbody>
<tr><td>=</td><td>Equals</td></tr>
<tr><td>IN</td><td><p>Check membership.</p><pre>filter x IN (1,2,3)</pre></td></tr>
<tr><td>!=</td><td>Not equals</td></tr>
</tbody></table>
```

**Output (injected back into HTML stream):**
```html
<table><thead><tr><th>Operator</th><th>Description</th></tr></thead>
<tbody><tr><td>=</td><td>Equals</td></tr></tbody></table>

<!--EXTRACTED:uuid-1-->

<table><thead><tr><th>Operator</th><th>Description</th></tr></thead>
<tbody><tr><td>!=</td><td>Not equals</td></tr></tbody></table>
```

Where `<!--EXTRACTED:uuid-1-->` is a placeholder replaced post-turndown with:
```markdown
### IN

Check membership.

```
filter x IN (1,2,3)
```
```

### 2. `extractToSections(row, headerRow)` — NEW

Converts complex rows to structured markdown prose blocks.

**Heading:** First cell's content becomes the heading text. If the table has a header row, the first column label provides context.

**Body from remaining cells:** Each subsequent cell is processed based on its content:
- Nested `<table>` → recursively processed through `cleanTableHtml` as a standalone table
- `<pre>/<code>` → fenced code block with language tag preserved (extracted from `class` attribute, e.g., `<code class="language-xql">` → ` ```xql `)
- `<ul>/<ol>` → proper markdown bullet/numbered list (not flattened)
- Plain text → paragraph

**Output format example:**
```markdown
### IN, NOT IN

Returns true if the value is in the specified list.

```xql
filter severity IN ("HIGH", "CRITICAL")
```
```

**Integration with turndown — placeholder approach:**

Extracted sections are raw markdown that must pass through turndown untouched. Using `turndown.keep(['div'])` is risky because turndown's `keep` preserves the outer HTML tag but may escape or mangle markdown syntax inside it. Instead, use a **placeholder replacement** approach:

1. During `cleanTableHtml`, when `extractToSections` produces markdown for a complex row, store the markdown string in a `Map` keyed by a unique ID
2. Replace the extracted row in the HTML with a comment placeholder: `<!--EXTRACTED:unique-id-->`
3. HTML comments pass through turndown untouched
4. After turndown runs, replace all `<!--EXTRACTED:unique-id-->` placeholders with their stored markdown content

This avoids any turndown config changes and eliminates the risk of markdown-inside-HTML escaping issues.

```js
// In fetchTopic (updated flow):
const extractedSections = new Map();  // scoped per-topic
const html = cleanTableHtml(await fetch(contentUrl, "text/html"), extractedSections);
let md = turndown.turndown(html);

// Post-turndown processing — ORDER MATTERS:
// 1. Replace base64 data-URI images (existing)
md = md.replace(/!\[([^\]]*)\]\(data:image\/[^)]+\)/g, "[image: $1]");

// 2. Admonition headings to bold (existing, expanded)
md = md.replace(
  /^(\s*)#{2,6} (Prerequisite|Prerequisites|Note|Notes|Important|Warning|Danger|Tip|Caution|Notice):?$/gm,
  "$1**$2:**"
);

// 3. Normalize headings (existing)
md = normalizeHeadings(md, topic.title);

// 4. Duplicate separator cleanup (NEW)
md = removeDuplicateSeparators(md);

// 5. Placeholder replacement — LAST, after all markdown post-processing
// This ensures extracted sections are injected as final markdown,
// untouched by admonition regex or normalizeHeadings.
for (const [id, content] of extractedSections) {
  md = md.replace(`<!--EXTRACTED:${id}-->`, content);
}
```

**Placeholder replacement runs LAST** in post-turndown processing. This is critical: if it ran before the admonition regex, extracted headings like `### Note` would be incorrectly converted to `**Note:**`. By running last, extracted markdown is injected in its final form after all other transformations have completed.

The `extractedSections` Map is scoped per-topic (created in `fetchTopic`, passed to `cleanTableHtml`).

**Recursive calls:** When `extractToSections` encounters a nested `<table>` and recursively calls `cleanTableHtml`, it passes the **same** `extractedSections` Map. This ensures placeholders from nested tables are in the same Map and get replaced in the same post-turndown pass.

**Heading level:** Emitted at `###` (h3). Rationale:
- After `normalizeHeadings()` runs on the individual topic file, the shallowest heading is h2. Extracted content headings at h3 are correctly subordinate to the topic's section headings.
- In Stage 3, `shiftHeadings()` adds the TOC depth (0-4). h3 + depth gives h3-h7, capped at h6.
- For the 3 topics at max depth 4: h3+4=h7 → capped at h6 with a warning (same behavior as existing heading capping). This is acceptable.
- For all other topics (depth 0-3): h3+depth gives h3-h6, within range.
- **Edge case:** If a topic has no other headings and only extracted sections, `normalizeHeadings` will see h3 as the shallowest and shift it to h2. This is acceptable — if the topic has no section structure, h2 for extracted content is appropriate.

**Fallback:** If extraction fails for any reason (malformed HTML, unexpected structure), fall back to `flattenCellContent()` — output is broken (same as today) but no worse. Wrap `extractToSections` calls in try/catch.

### 3. `flattenCellContent(inner)` — MODIFIED

Changes to the existing function for cells that stay in pipe tables:

**Replace semicolons with numbered markers:**
```js
// Before:
inner = inner.replace(/<\/li>\s*<li/g, "</li>; <li");

// After:
let itemNum = 1;
inner = inner.replace(/<\/li>\s*<li\b/g, () => {
  itemNum++;
  return `</li> (${itemNum}) <li`;
});
if (itemNum > 1) {
  inner = inner.replace(/<li\b/, "(1) <li");
}
```

`itemNum` starts at 1 (for the first item). Each `</li><li>` boundary increments it and emits the next number. The final `if` block prepends `(1)` to the first item only if there were multiple items. Uses `<li\b` (word boundary) instead of `<li` to avoid matching inside tag attributes like `<link>`.

**Multi-list edge case:** If a cell contains multiple separate lists (e.g., `<ul>...<li>a</li></ul> <ul><li>b</li></ul>`), the `</li>\s*<li\b` regex will NOT match across list boundaries (there's `</ul> <ul>` between them). Items in the second list will not receive numbers. This is acceptable for cells that stay in tables — cells with multiple separate lists will almost always exceed the complexity threshold (>3 `<li>` items total) and be extracted to sections instead. For the rare case of two 1-item lists, unnumbered output for the second list is a minor cosmetic issue, not a structural break.

Result: `(1) Windows (2) MacOS (3) Linux` instead of `Windows; MacOS; Linux`.

**Add table tags to strip list:**
```js
// Before:
inner = inner.replace(/<\/?(div|ul|ol|section|article|aside|nav|header|footer)[^>]*>/g, " ");

// After:
inner = inner.replace(/<\/?(div|ul|ol|section|article|aside|nav|header|footer|table|tbody|thead|tr|td|th)[^>]*>/g, " ");
```

**Enforce single-line output:**
```js
inner = inner.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
```

### 4. `cleanTableHtml(html)` — MODIFIED

Changes to the existing function:

**Processing order (updated):**
1. Remove empty `<p>`, `<colgroup>` — unchanged
2. **NEW:** Use `extractTopLevelTables()` to isolate individual top-level tables from the HTML. This runs FIRST to provide correct table boundaries, preventing the nested-table regex bug from affecting any subsequent step.
3. **Per isolated table:** Detect layout tables → prose — unchanged logic, now applied per-table instead of via a global regex. Tables with pre-existing `<thead>` from source HTML skip layout-table detection.
4. **Per isolated table:** Promote first row to `<thead>` if needed — unchanged logic (moved up so `analyzeTable` can rely on `<thead>`)
5. **Per isolated table, NEW:** Pad rows with fewer `<td>` than header `<th\b[^>]*>` count with empty cells. Header `<th>` count uses the regex `/<th\b[^>]*>/g` to correctly match `<th>`, `<th scope="col">`, `<th class="...">`, etc.
6. **Per isolated table, NEW:** Run `analyzeTable()` — classifies rows and routes to extraction or pipe table
7. **Per isolated table:** Run `flattenCellContent()` on simple cells that remain in pipe tables — improved version
8. Reassemble the full HTML from processed tables and non-table content (interleaved in original order)

The key change: `extractTopLevelTables()` runs at step 2, before layout-table detection and `<thead>` promotion. This ensures every regex and analysis step operates on correctly isolated tables, eliminating the nested-table boundary bug that affected the old global regex. Steps 3-7 then run per-table on each isolated element.

**Function signature change:** `cleanTableHtml` gains an `extractedSections` parameter (a `Map`) that `extractToSections` populates with placeholder-to-markdown mappings.

**Placeholder safety at step 7:** After steps 5-6 run, the HTML contains remaining simple `<table>` elements and `<!--EXTRACTED:id-->` comment placeholders. The `flattenCellContent` regex (`/<(td|th)...>`) naturally skips placeholders because HTML comments contain no `<td>` or `<th>` tags — no special handling required.

Simple tables (no complex cells detected) follow the exact same code path as today — `analyzeTable()` returns early and no transformation occurs.

### 5. Admonition Heading Regex — MODIFIED

```js
// Before (line 211-214):
md = md.replace(
  /^(\s*)#{2,6} (Prerequisite|Prerequisites|Note|Important|Warning|Danger|Tip)$/gm,
  "$1**$2**"
);

// After:
md = md.replace(
  /^(\s*)#{2,6} (Prerequisite|Prerequisites|Note|Notes|Important|Warning|Danger|Tip|Caution|Notice):?$/gm,
  "$1**$2:**"
);
```

Changes:
- Added keywords: `Notes`, `Caution`, `Notice`
- Allow optional trailing colon (`:?`)
- Output always includes colon for consistency — this is a deliberate behavior change: headings like `## Note` (no colon) will now emit `**Note:**` (with colon). This normalization ensures consistent formatting across all admonition types. Golden snapshot diffs from this change are classified as "neutral" (cosmetic normalization), not regressions.

### 6. Duplicate Separator Cleanup — NEW (post-turndown)

Scans the markdown line-by-line. A line is a "separator line" if it matches `/^\|[\s-:]+(\|[\s-:]+)*\|$/` (one or more `| --- |` segments). If two consecutive separator lines are found, the second is removed.

```js
const lines = md.split("\n");
const result = [];
let prevIsSeparator = false;
for (const line of lines) {
  const isSeparator = /^\|[\s-:]+(\|[\s-:]+)*\|\s*$/.test(line);
  if (isSeparator && prevIsSeparator) continue; // skip duplicate
  result.push(line);
  prevIsSeparator = isSeparator;
}
md = result.join("\n");
```

This approach is whitespace-tolerant (handles trailing spaces) and works for any column count. Runs in the post-turndown processing step of `fetchTopic()`.

## Backward Compatibility & Safety

**Principle:** Every existing behavior is preserved, extended, or simplified. Never broken.

### Regression testing via golden snapshots
- Before code changes, capture all 3 combined files as golden baselines
- After changes, diff against baselines
- Every diff must be an improvement (broken → well-formed) or neutral (no change)
- Any diff that introduces a new malformation is a test failure — hard gate

### Per-component safety

| Component | Guarantee |
|-----------|-----------|
| `extractTopLevelTables()` | New function. Only used to provide correct table boundaries to `analyzeTable`. Falls back to existing regex-based processing if no tables found. |
| `flattenCellContent()` | Numbered markers replace `;` only between `<li>` items. All other behavior unchanged. Tag strip list is purely additive. `\n` stripping is a tighter version of existing whitespace collapse. |
| `cleanTableHtml()` | Layout table detection and `<thead>` promotion are unchanged. `analyzeTable()` runs after existing logic. Simple tables follow the exact same code path as today. |
| `extractToSections()` | Only called for content that is currently broken. Falls back to `flattenCellContent()` on any failure. Uses placeholder comments that are invisible to turndown. |
| Admonition regex | New keywords added. Existing keywords still match. Colon normalization is a deliberate minor behavior change (adds `:` to previously colon-free admonitions). |
| Duplicate separator cleanup | Only removes consecutive separator-style lines. Cannot affect valid tables. |

## Testing Strategy

### Unit tests (`scripts/fetch_fluidtopics.test.js` — NEW)
- `extractTopLevelTables()`: single table, multiple tables, nested tables, no tables, table with pre-existing `<thead>`
- `analyzeTable()`: simple table passthrough, complex cell detection (each trigger), mixed row handling, section-divider detection, >50% threshold routing, 200-char threshold only triggers with block elements
- `extractToSections()`: nested table extraction, code block extraction with language tags, list extraction, plain text, fallback on failure, placeholder round-trip
- `flattenCellContent()`: numbered markers, multi-list edge case, table tag stripping, single-line enforcement, backward compat with existing inputs
- Admonition regex: all keywords, with/without colon, indented variants, non-matching lines
- Duplicate separator cleanup: no separator, single separator, double separator, triple separator, different column counts

### Snapshot tests
- Capture real HTML inputs from known-broken tables (FQDN table, operators table, transformer categories, windowcomp params, json_path_extract)
- Assert output is well-formed markdown
- Validate placeholder round-trip: markdown survives `cleanTableHtml → turndown → placeholder replacement` intact

### Integration test
- Run full pipeline (`npm run fetch` + `npm run fix` + `npm run combine`)
- Diff combined outputs against golden baselines
- Verify all diffs are improvements

### Constants
- `MAX_LI_COUNT = 3` — list items before cell is complex
- `MAX_CELL_LENGTH = 200` — characters before cell is complex (only triggers when cell also contains block-level elements)
- `COMPLEX_ROW_THRESHOLD = 0.5` — fraction of data rows (excluding section-dividers) before whole table is extracted

## Structural Changes to `fetch_fluidtopics.js`

The current file has no `module.exports` and runs `main()` immediately when required. To enable unit testing:

1. Add `require.main === module` guard around the `main()` call (same pattern as `generate_combined.js` line 313-317)
2. Add `module.exports` exporting the testable functions: `extractTopLevelTables`, `analyzeTable`, `extractToSections`, `flattenCellContent`, `cleanTableHtml`, `removeDuplicateSeparators`

```js
module.exports = { extractTopLevelTables, analyzeTable, extractToSections, flattenCellContent, cleanTableHtml, removeDuplicateSeparators };

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
```

This ensures `require('./fetch_fluidtopics.js')` in tests does not trigger live HTTPS requests. No other file in the project `require()`s `fetch_fluidtopics.js` — it is only invoked via `npm run fetch` (`node scripts/fetch_fluidtopics.js`).

## Files Modified

| File | Change Type |
|------|------------|
| `scripts/fetch_fluidtopics.js` | Modified — production changes + `module.exports` + `require.main` guard |
| `scripts/fetch_fluidtopics.test.js` | New — unit + snapshot tests |

## Out of Scope

- `generate_combined.js` — untouched
- Turndown config and custom rules — untouched (placeholder approach avoids any turndown config changes)
- Fix scripts (abstract, escaped chars, underscores) — untouched
- `generate_combined.test.js` — untouched
- Manual rowspan fixes (4 files documented in README) — separate concern
- Content-level issues (truncated text `r` at line 7122, duplicate bullets, wrong `GCP` header) — data quality issues in the source, not pipeline bugs
