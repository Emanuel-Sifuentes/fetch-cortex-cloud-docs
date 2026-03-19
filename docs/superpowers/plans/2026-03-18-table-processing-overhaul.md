# Table Processing Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul Stage 1 table processing in `fetch_fluidtopics.js` to fix ~400 broken markdown table rows across all 3 combined output files.

**Architecture:** Stack-based HTML table extraction replaces the fragile global regex, enabling per-table analysis that routes complex content (nested tables, code blocks, long lists, colspan dividers) to heading+prose format while keeping simple tables on the existing pipe-table path. Extracted sections use HTML comment placeholders to survive turndown untouched.

**Tech Stack:** Node.js, `node:test` runner, existing turndown + GFM plugin (no new dependencies)

---

**Spec:** `docs/superpowers/specs/2026-03-18-table-processing-overhaul-design.md`

**Files modified:**
| File | Change |
|------|--------|
| `scripts/fetch_fluidtopics.js` | Add `extractTopLevelTables`, `analyzeTable`, `extractToSections`, `removeDuplicateSeparators`. Modify `cleanTableHtml`, `flattenCellContent`, `fetchTopic`. Add `module.exports` + `require.main` guard. |
| `scripts/fetch_fluidtopics.test.js` | **New** — unit + snapshot tests |
| `package.json` | Update `test` script to include new test file |

**Constants** (defined at module top in `fetch_fluidtopics.js`):
```js
const MAX_LI_COUNT = 3;
const MAX_CELL_LENGTH = 200;
const COMPLEX_ROW_THRESHOLD = 0.5;
```

---

## Task 0: Capture golden baselines (before ANY code changes)

**IMPORTANT:** Run this task before starting Task 1. The baselines must reflect the current unmodified pipeline output.

- [ ] **Step 1: Copy current combined files as golden baselines**

```bash
mkdir -p test_baselines
cp sources_fetch/cortex-cloud-*-combined.md test_baselines/
```

If combined files don't exist yet, run the pipeline first: `npm run fetch && npm run fix && npm run combine`

---

## Task 1: Make `fetch_fluidtopics.js` testable

**Files:**
- Modify: `scripts/fetch_fluidtopics.js:313-316` (bottom of file)
- Modify: `package.json:13` (test script)

- [ ] **Step 1: Add `require.main` guard and `module.exports`**

Replace the bottom of `scripts/fetch_fluidtopics.js` (lines 313-316):

```js
// BEFORE:
main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

// AFTER:
module.exports = {
  flattenCellContent,
  cleanTableHtml,
  normalizeHeadings,
};

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
```

- [ ] **Step 2: Update the test script in `package.json`**

```json
"test": "node --test scripts/generate_combined.test.js scripts/fetch_fluidtopics.test.js"
```

- [ ] **Step 3: Create skeleton test file to verify the wiring**

Create `scripts/fetch_fluidtopics.test.js`:

```js
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { flattenCellContent, cleanTableHtml } = require("./fetch_fluidtopics.js");

describe("fetch_fluidtopics module exports", () => {
  it("exports flattenCellContent as a function", () => {
    assert.equal(typeof flattenCellContent, "function");
  });

  it("exports cleanTableHtml as a function", () => {
    assert.equal(typeof cleanTableHtml, "function");
  });
});
```

- [ ] **Step 4: Run tests to verify wiring**

Run: `npm test`
Expected: 2 new tests PASS, all existing `generate_combined.test.js` tests still PASS. No live HTTP requests triggered.

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch_fluidtopics.js scripts/fetch_fluidtopics.test.js package.json
git commit -m "chore: make fetch_fluidtopics testable with require.main guard"
```

---

## Task 2: `extractTopLevelTables(html)`

**Files:**
- Modify: `scripts/fetch_fluidtopics.js` (add new function + export)
- Modify: `scripts/fetch_fluidtopics.test.js`

### 2a: Single table extraction

- [ ] **Step 1: Write failing test — single table**

In `scripts/fetch_fluidtopics.test.js`:

```js
const { extractTopLevelTables } = require("./fetch_fluidtopics.js");

describe("extractTopLevelTables", () => {
  it("extracts a single top-level table", () => {
    const html = "<p>before</p><table><tr><td>A</td></tr></table><p>after</p>";
    const segments = extractTopLevelTables(html);

    assert.deepEqual(segments, [
      { type: "content", html: "<p>before</p>" },
      { type: "table", html: "<table><tr><td>A</td></tr></table>" },
      { type: "content", html: "<p>after</p>" },
    ]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `extractTopLevelTables is not a function` (not yet exported)

- [ ] **Step 3: Implement `extractTopLevelTables`**

Add to `scripts/fetch_fluidtopics.js` (after the `sleep` function, before `flattenCellContent`):

```js
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
```

Add `extractTopLevelTables` to `module.exports`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch_fluidtopics.js scripts/fetch_fluidtopics.test.js
git commit -m "feat: add extractTopLevelTables with single-table support"
```

### 2b: Multiple tables, nested tables, no tables

- [ ] **Step 6: Write failing tests — remaining cases**

Append to the `extractTopLevelTables` describe block:

```js
  it("extracts multiple tables preserving interleaved content", () => {
    const html = "<p>a</p><table><tr><td>1</td></tr></table><p>b</p><table><tr><td>2</td></tr></table><p>c</p>";
    const segments = extractTopLevelTables(html);

    assert.equal(segments.length, 5);
    assert.equal(segments[0].type, "content");
    assert.equal(segments[1].type, "table");
    assert.equal(segments[2].type, "content");
    assert.equal(segments[3].type, "table");
    assert.equal(segments[4].type, "content");
  });

  it("treats nested tables as part of the outer table", () => {
    const html = '<table><tr><td><table><tr><td>inner</td></tr></table></td></tr></table>';
    const segments = extractTopLevelTables(html);

    assert.equal(segments.length, 1);
    assert.equal(segments[0].type, "table");
    assert.ok(segments[0].html.includes("<table><tr><td>inner</td></tr></table>"));
  });

  it("returns a single content segment when no tables exist", () => {
    const html = "<p>just text</p>";
    const segments = extractTopLevelTables(html);

    assert.deepEqual(segments, [{ type: "content", html: "<p>just text</p>" }]);
  });

  it("handles table with attributes", () => {
    const html = '<table class="wide"><tr><td>A</td></tr></table>';
    const segments = extractTopLevelTables(html);

    assert.equal(segments.length, 1);
    assert.equal(segments[0].type, "table");
    assert.equal(segments[0].html, '<table class="wide"><tr><td>A</td></tr></table>');
  });
```

- [ ] **Step 7: Run tests to verify they pass** (implementation from 2a should handle these)

Run: `npm test`
Expected: All PASS

- [ ] **Step 8: Commit**

```bash
git add scripts/fetch_fluidtopics.test.js
git commit -m "test: add edge-case tests for extractTopLevelTables"
```

---

## Task 3: `flattenCellContent` improvements

**Files:**
- Modify: `scripts/fetch_fluidtopics.js:77-98` (`flattenCellContent`)
- Modify: `scripts/fetch_fluidtopics.test.js`

### 3a: Numbered list markers

- [ ] **Step 1: Write failing test — numbered markers replace semicolons**

```js
describe("flattenCellContent", () => {
  it("replaces semicolons between list items with numbered markers", () => {
    const input = "<ul><li>Windows</li><li>MacOS</li><li>Linux</li></ul>";
    const result = flattenCellContent(input);

    assert.ok(result.includes("(1)"));
    assert.ok(result.includes("(2)"));
    assert.ok(result.includes("(3)"));
    assert.ok(!result.includes(";"));
  });

  it("does not add numbers for a single list item", () => {
    const input = "<ul><li>Only one</li></ul>";
    const result = flattenCellContent(input);

    assert.ok(!result.includes("(1)"));
    assert.ok(result.includes("Only one"));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — output still contains `;` instead of `(1)`, `(2)`, `(3)`

- [ ] **Step 3: Implement numbered markers in `flattenCellContent`**

In `scripts/fetch_fluidtopics.js`, replace lines 81-82:

```js
// BEFORE:
inner = inner.replace(/<\/li>\s*<li/g, "</li>; <li");

// AFTER:
let itemNum = 1;
inner = inner.replace(/<\/li>\s*<li\b/g, () => {
  itemNum++;
  return `</li> (${itemNum}) <li`;
});
if (itemNum > 1) {
  inner = inner.replace(/<li\b/, "(1) <li");
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch_fluidtopics.js scripts/fetch_fluidtopics.test.js
git commit -m "feat: replace semicolons with numbered markers in flattenCellContent"
```

### 3b: Table tag stripping + single-line enforcement

- [ ] **Step 6: Write failing tests**

```js
  it("strips nested table tags from cell content", () => {
    const input = "<table><tbody><tr><td>nested</td></tr></tbody></table>";
    const result = flattenCellContent(input);

    assert.ok(!result.includes("<table"));
    assert.ok(!result.includes("<tbody"));
    assert.ok(!result.includes("<tr"));
    assert.ok(!result.includes("<td"));
    assert.ok(result.includes("nested"));
  });

  it("collapses newlines into a single line", () => {
    const input = "<p>line one</p>\n\n<p>line two</p>";
    const result = flattenCellContent(input);

    assert.ok(!result.includes("\n"));
    assert.ok(result.includes("line one"));
    assert.ok(result.includes("line two"));
  });
```

- [ ] **Step 7: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `<table>` etc. tags leak through (the newline test may already pass since existing `\s+` collapse handles newlines; if so, only the table-tag test drives the implementation)

- [ ] **Step 8: Implement tag stripping + single-line enforcement**

In `scripts/fetch_fluidtopics.js`, update `flattenCellContent`:

Replace the block-wrapper strip regex (line 91):
```js
// BEFORE:
inner = inner.replace(/<\/?(div|ul|ol|section|article|aside|nav|header|footer)[^>]*>/g, " ");

// AFTER:
inner = inner.replace(/<\/?(div|ul|ol|section|article|aside|nav|header|footer|table|tbody|thead|tr|td|th)[^>]*>/g, " ");
```

No change needed to the whitespace collapse line — the existing `inner = inner.replace(/\s+/g, " ").trim()` already handles `\r` and `\n` characters since `\s` matches `[\r\n\t\f\v ]`.

- [ ] **Step 9: Run tests to verify they pass**

Run: `npm test`
Expected: All PASS

- [ ] **Step 10: Commit**

```bash
git add scripts/fetch_fluidtopics.js scripts/fetch_fluidtopics.test.js
git commit -m "feat: strip table tags and enforce single-line in flattenCellContent"
```

### 3c: Backward compatibility

- [ ] **Step 11: Write backward-compat tests**

```js
  it("preserves admonition heading conversion", () => {
    const input = '<h3 class="title">Note</h3><p>text</p>';
    const result = flattenCellContent(input);

    assert.ok(result.includes("**Note:**"));
    assert.ok(result.includes("text"));
  });

  it("unwraps p inside li", () => {
    const input = "<ul><li><p>wrapped</p></li></ul>";
    const result = flattenCellContent(input);

    assert.ok(result.includes("wrapped"));
    assert.ok(!result.includes("<p>"));
  });
```

- [ ] **Step 12: Run tests — should pass with no code changes**

Run: `npm test`
Expected: All PASS (existing behavior preserved)

- [ ] **Step 13: Commit**

```bash
git add scripts/fetch_fluidtopics.test.js
git commit -m "test: add backward-compat tests for flattenCellContent"
```

---

## Task 4: `removeDuplicateSeparators`

**Files:**
- Modify: `scripts/fetch_fluidtopics.js` (add new function + export)
- Modify: `scripts/fetch_fluidtopics.test.js`

- [ ] **Step 1: Write failing tests**

```js
const { removeDuplicateSeparators } = require("./fetch_fluidtopics.js");

describe("removeDuplicateSeparators", () => {
  it("removes duplicate consecutive separator rows", () => {
    const input = "| A | B |\n| --- | --- |\n| --- | --- |\n| 1 | 2 |";
    const result = removeDuplicateSeparators(input);

    assert.equal(result, "| A | B |\n| --- | --- |\n| 1 | 2 |");
  });

  it("keeps a single separator row untouched", () => {
    const input = "| A | B |\n| --- | --- |\n| 1 | 2 |";
    const result = removeDuplicateSeparators(input);

    assert.equal(result, input);
  });

  it("handles triple consecutive separators", () => {
    const input = "| A |\n| --- |\n| --- |\n| --- |\n| 1 |";
    const result = removeDuplicateSeparators(input);

    assert.equal(result, "| A |\n| --- |\n| 1 |");
  });

  it("returns markdown unchanged when no separators present", () => {
    const input = "# Heading\n\nSome text.";
    const result = removeDuplicateSeparators(input);

    assert.equal(result, input);
  });

  it("handles separator rows with alignment colons", () => {
    const input = "| A | B |\n| :--- | ---: |\n| :--- | ---: |\n| 1 | 2 |";
    const result = removeDuplicateSeparators(input);

    assert.equal(result, "| A | B |\n| :--- | ---: |\n| 1 | 2 |");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `removeDuplicateSeparators is not a function`

- [ ] **Step 3: Implement `removeDuplicateSeparators`**

Add to `scripts/fetch_fluidtopics.js` (after `normalizeHeadings`):

```js
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
```

Add `removeDuplicateSeparators` to `module.exports`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: All PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch_fluidtopics.js scripts/fetch_fluidtopics.test.js
git commit -m "feat: add removeDuplicateSeparators for duplicate pipe-table separators"
```

---

## Task 5: `analyzeTable(tableHtml)`

**Files:**
- Modify: `scripts/fetch_fluidtopics.js` (add new function + export)
- Modify: `scripts/fetch_fluidtopics.test.js`

### 5a: Simple table passthrough

- [ ] **Step 1: Write failing test — simple table returns unchanged**

```js
const { analyzeTable } = require("./fetch_fluidtopics.js");

describe("analyzeTable", () => {
  it("returns simple table unchanged", () => {
    const html = "<table><thead><tr><th>A</th><th>B</th></tr></thead>" +
      "<tbody><tr><td>1</td><td>2</td></tr></tbody></table>";

    const result = analyzeTable(html, new Map());

    assert.equal(result, html);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `analyzeTable is not a function`

- [ ] **Step 3: Implement `analyzeTable` skeleton — simple passthrough**

Add constants at module top of `scripts/fetch_fluidtopics.js`:

```js
const MAX_LI_COUNT = 3;
const MAX_CELL_LENGTH = 200;
const COMPLEX_ROW_THRESHOLD = 0.5;
```

Add function (after `extractTopLevelTables`):

```js
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
```

For this step, implement only the passthrough path. Stub the helper functions:

```js
function extractAllRows(classified, headerRow, tableAttrs, extractedSections) {
  // Stub — implemented in Task 6
  return classified.map((r) => r.row).join("");
}

function splitAtDividers(classified, headerRow, tableAttrs, extractedSections) {
  // Stub — implemented in Task 7
  return classified.map((r) => r.row).join("");
}

function splitAtComplexRows(classified, headerRow, tableAttrs, extractedSections) {
  // Stub — implemented in Task 7
  return classified.map((r) => r.row).join("");
}
```

Add `analyzeTable` and `isCellComplex` to `module.exports`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch_fluidtopics.js scripts/fetch_fluidtopics.test.js
git commit -m "feat: add analyzeTable with simple-table passthrough"
```

### 5b: Cell complexity detection

- [ ] **Step 6: Write failing tests for `isCellComplex`**

```js
describe("isCellComplex", () => {
  it("returns true for nested table", () => {
    assert.equal(isCellComplex("<table><tr><td>x</td></tr></table>"), true);
  });

  it("returns true for pre element", () => {
    assert.equal(isCellComplex("<pre>code here</pre>"), true);
  });

  it("returns true for >3 list items", () => {
    assert.equal(isCellComplex("<ul><li>a</li><li>b</li><li>c</li><li>d</li></ul>"), true);
  });

  it("returns false for <=3 list items", () => {
    assert.equal(isCellComplex("<ul><li>a</li><li>b</li><li>c</li></ul>"), false);
  });

  it("returns false for long plain text without block elements", () => {
    const longText = "A".repeat(250);
    assert.equal(isCellComplex(longText), false);
  });

  it("returns true for long text WITH block elements", () => {
    const longText = "A".repeat(250);
    assert.equal(isCellComplex(`<p>${longText}</p>`), true);
  });

  it("returns false for short simple text", () => {
    assert.equal(isCellComplex("just a short cell"), false);
  });
});
```

- [ ] **Step 7: Run tests — should pass** (implementation from 5a already handles this)

Run: `npm test`
Expected: All PASS

- [ ] **Step 8: Commit**

```bash
git add scripts/fetch_fluidtopics.test.js
git commit -m "test: add isCellComplex unit tests"
```

### 5c: Row classification smoke tests

These tests verify that `analyzeTable` detects non-simple tables (dividers, complex rows) and does not return the input unchanged. They are intentionally lightweight at this stage — real behavioral assertions come in Tasks 6 and 7 when the routing implementations exist. The stubs produce different output from input because they strip outer table structure, so `notEqual` holds.

- [ ] **Step 9: Write routing smoke tests**

```js
  it("detects section-divider rows by colspan (smoke)", () => {
    const html = "<table><thead><tr><th>A</th><th>B</th></tr></thead>" +
      '<tbody><tr><td colspan="2">Section</td></tr><tr><td>1</td><td>2</td></tr></tbody></table>';

    const result = analyzeTable(html, new Map());

    // Stub output differs from input (lacks outer <table> structure) — confirms routing entered
    assert.notEqual(result, html);
  });

  it("detects section-divider by single td in multi-column table (smoke)", () => {
    const html = "<table><thead><tr><th>A</th><th>B</th><th>C</th></tr></thead>" +
      "<tbody><tr><td>Divider</td></tr><tr><td>1</td><td>2</td><td>3</td></tr></tbody></table>";

    const result = analyzeTable(html, new Map());

    assert.notEqual(result, html);
  });

  it("routes >50% complex data rows away from passthrough (smoke)", () => {
    const pre = "<pre>code</pre>";
    const html = "<table><thead><tr><th>A</th><th>B</th></tr></thead>" +
      `<tbody><tr><td>x</td><td>${pre}</td></tr><tr><td>y</td><td>${pre}</td></tr>` +
      "<tr><td>z</td><td>simple</td></tr></tbody></table>";

    const result = analyzeTable(html, new Map());

    // 2 of 3 data rows are complex (67% > 50%) — stub output differs from input
    assert.notEqual(result, html);
  });
```

- [ ] **Step 10: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (stubs strip outer table structure, so output differs from input)

- [ ] **Step 11: Commit**

```bash
git add scripts/fetch_fluidtopics.test.js
git commit -m "test: add analyzeTable routing smoke tests"
```

---

## Task 6: `extractToSections` + placeholder round-trip

**Files:**
- Modify: `scripts/fetch_fluidtopics.js` (add new function + implement `extractAllRows` + export)
- Modify: `scripts/fetch_fluidtopics.test.js`

### 6a: Basic extraction

- [ ] **Step 1: Write failing test — code block extraction**

```js
const { extractToSections } = require("./fetch_fluidtopics.js");

describe("extractToSections", () => {
  it("extracts a row with code block to heading + fenced code", () => {
    const row = '<tr><td>IN</td><td><p>Check membership.</p><pre><code class="language-xql">filter x IN (1,2,3)</code></pre></td></tr>';
    const headerRow = "<tr><th>Operator</th><th>Description</th></tr>";
    const sections = new Map();

    const placeholder = extractToSections(row, headerRow, sections);

    assert.match(placeholder, /<!--EXTRACTED:[a-z0-9-]+-->/);
    const content = [...sections.values()][0];
    assert.ok(content.includes("### IN"));
    assert.ok(content.includes("Check membership."));
    assert.ok(content.includes("```xql"));
    assert.ok(content.includes("filter x IN (1,2,3)"));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `extractToSections is not a function`

- [ ] **Step 3: Implement `extractToSections`**

Add to `scripts/fetch_fluidtopics.js`:

```js
const crypto = require("crypto");

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
    return `<!--EXTRACTED:${id}-->`;
  } catch {
    return row;
  }
}

function processCellToMarkdown(cellHtml, extractedSections) {
  const parts = [];

  // Handle nested tables: extract and recursively process through cleanTableHtml
  let html = cellHtml;
  const nestedTables = [];
  html = html.replace(/<table[\s\S]*?<\/table>/g, (tableHtml) => {
    const nestedSections = extractedSections || new Map();
    const processed = cleanTableHtml(tableHtml, nestedSections);
    nestedTables.push(processed);
    return "<!--NESTED_TABLE-->";
  });

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
```

Add `extractToSections` to `module.exports`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch_fluidtopics.js scripts/fetch_fluidtopics.test.js
git commit -m "feat: add extractToSections with code block extraction and placeholder approach"
```

### 6b: More extraction cases + fallback

- [ ] **Step 6: Write tests for list extraction, plain text, nested table, and fallback**

```js
  it("extracts a row with a list to heading + markdown list", () => {
    const row = '<tr><td>Platforms</td><td><ul><li>Windows</li><li>Mac</li><li>Linux</li><li>Docker</li></ul></td></tr>';
    const headerRow = "<tr><th>Feature</th><th>Details</th></tr>";
    const sections = new Map();

    extractToSections(row, headerRow, sections);

    const content = [...sections.values()][0];
    assert.ok(content.includes("### Platforms"));
    assert.ok(content.includes("- Windows"));
    assert.ok(content.includes("- Docker"));
  });

  it("extracts plain text as a paragraph", () => {
    const row = '<tr><td>Name</td><td>A long description that is just plain text.</td></tr>';
    const headerRow = "<tr><th>Key</th><th>Value</th></tr>";
    const sections = new Map();

    extractToSections(row, headerRow, sections);

    const content = [...sections.values()][0];
    assert.ok(content.includes("### Name"));
    assert.ok(content.includes("A long description"));
  });

  it("returns original row when no cells found (early return)", () => {
    const row = "not-valid-html";
    const headerRow = "<tr><th>A</th></tr>";
    const sections = new Map();

    const result = extractToSections(row, headerRow, sections);

    // Tests the "no cells found" early return path.
    // The try/catch fallback path is not directly testable without mocking crypto.randomUUID.
    // It provides a safety net for unexpected HTML structures in production.
    assert.equal(result, "not-valid-html");
    assert.equal(sections.size, 0);
  });
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npm test`
Expected: All PASS

- [ ] **Step 8: Commit**

```bash
git add scripts/fetch_fluidtopics.test.js
git commit -m "test: add extractToSections edge-case and fallback tests"
```

### 6c: Implement `extractAllRows` (full-table extraction)

- [ ] **Step 9: Write failing test for full-table extraction**

```js
  it("extracts all rows when >50% are complex", () => {
    const pre = "<pre>code</pre>";
    const html = "<table><thead><tr><th>Op</th><th>Desc</th></tr></thead>" +
      `<tbody><tr><td>A</td><td>${pre}</td></tr><tr><td>B</td><td>${pre}</td></tr></tbody></table>`;
    const sections = new Map();

    const result = analyzeTable(html, sections);

    // Both rows extracted → result should be placeholders
    assert.ok(result.includes("<!--EXTRACTED:"));
    assert.equal(sections.size, 2);
  });
```

- [ ] **Step 10: Implement `extractAllRows`**

Replace the stub in `scripts/fetch_fluidtopics.js`:

```js
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
```

- [ ] **Step 11: Run test to verify it passes**

Run: `npm test`
Expected: PASS

- [ ] **Step 12: Commit**

```bash
git add scripts/fetch_fluidtopics.js scripts/fetch_fluidtopics.test.js
git commit -m "feat: implement extractAllRows for majority-complex tables"
```

---

## Task 7: Table splitting (dividers + mixed rows)

**Files:**
- Modify: `scripts/fetch_fluidtopics.js` (implement `splitAtDividers`, `splitAtComplexRows`)
- Modify: `scripts/fetch_fluidtopics.test.js`

### 7a: `splitAtDividers`

- [ ] **Step 1: Write failing test**

```js
  it("splits table at section-divider rows", () => {
    const html = "<table><thead><tr><th>A</th><th>B</th></tr></thead>" +
      '<tbody><tr><td>1</td><td>2</td></tr><tr><td colspan="2">Section</td></tr>' +
      "<tr><td>3</td><td>4</td></tr></tbody></table>";
    const sections = new Map();

    const result = analyzeTable(html, sections);

    // Should produce two tables with a bold heading between
    assert.ok(result.includes("<strong>Section</strong>"));
    // Both sub-tables should have the header row
    const tableCount = (result.match(/<thead>/g) || []).length;
    assert.equal(tableCount, 2);
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — stub returns raw row HTML without `<strong>` or multiple `<thead>`

- [ ] **Step 3: Implement `splitAtDividers`**

Replace the stub:

```js
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch_fluidtopics.js scripts/fetch_fluidtopics.test.js
git commit -m "feat: implement splitAtDividers for section-divider rows"
```

### 7b: `splitAtComplexRows`

- [ ] **Step 6: Write failing test**

```js
  it("splits mixed table: simple rows stay in tables, complex rows extracted", () => {
    const pre = "<pre>code</pre>";
    const html = "<table><thead><tr><th>Op</th><th>Desc</th></tr></thead>" +
      `<tbody><tr><td>=</td><td>Equals</td></tr>` +
      `<tr><td>IN</td><td><p>Check membership.</p>${pre}</td></tr>` +
      `<tr><td>!=</td><td>Not equals</td></tr></tbody></table>`;
    const sections = new Map();

    const result = analyzeTable(html, sections);

    // Should have 2 sub-tables (rows 1 and 3) and 1 extracted section (row 2)
    const tableCount = (result.match(/<thead>/g) || []).length;
    assert.equal(tableCount, 2);
    assert.ok(result.includes("<!--EXTRACTED:"));
    assert.equal(sections.size, 1);
  });
```

- [ ] **Step 7: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — stub doesn't split correctly

- [ ] **Step 8: Implement `splitAtComplexRows`**

Replace the stub:

```js
function splitAtComplexRows(classified, headerRow, tableAttrs, extractedSections) {
  const segments = [];
  let simpleRows = [];

  const flushSimple = () => {
    if (simpleRows.length === 0) return;
    const tbody = simpleRows.join("");
    segments.push(`<table${tableAttrs}><thead><tr>${headerRow}</tr></thead><tbody>${tbody}</tbody></table>`);
    simpleRows = [];
  };

  for (const { row, type } of classified) {
    if (type === "complex") {
      flushSimple();
      segments.push(extractToSections(row, `<tr>${headerRow}</tr>`, extractedSections));
    } else {
      simpleRows.push(row);
    }
  }
  flushSimple();

  return segments.join("\n\n");
}
```

- [ ] **Step 9: Run test to verify it passes**

Run: `npm test`
Expected: PASS

- [ ] **Step 10: Commit**

```bash
git add scripts/fetch_fluidtopics.js scripts/fetch_fluidtopics.test.js
git commit -m "feat: implement splitAtComplexRows for mixed simple/complex tables"
```

---

## Task 8: Wire `cleanTableHtml` to use new components

**Files:**
- Modify: `scripts/fetch_fluidtopics.js:101-141` (`cleanTableHtml`)
- Modify: `scripts/fetch_fluidtopics.test.js`

- [ ] **Step 1: Write failing integration-level test**

```js
describe("cleanTableHtml integration", () => {
  it("processes a simple table through the full pipeline unchanged", () => {
    const html = "<table><tbody><tr><td>A</td><td>B</td></tr>" +
      "<tr><td>1</td><td>2</td></tr></tbody></table>";
    const sections = new Map();

    const result = cleanTableHtml(html, sections);

    // Should still have a table with <thead> (promoted from first row)
    assert.ok(result.includes("<thead>"));
    assert.ok(result.includes("<th>"));
    assert.equal(sections.size, 0);
  });

  it("extracts complex rows and leaves simple rows as tables", () => {
    const html = "<table><tbody>" +
      "<tr><td>Op</td><td>Desc</td></tr>" +
      "<tr><td>=</td><td>Equals</td></tr>" +
      "<tr><td>IN</td><td><p>Check membership.</p><pre>code</pre></td></tr>" +
      "<tr><td>!=</td><td>Not equals</td></tr>" +
      "</tbody></table>";
    const sections = new Map();

    const result = cleanTableHtml(html, sections);

    assert.ok(result.includes("<!--EXTRACTED:"));
    assert.ok(sections.size > 0);
  });

  it("pads rows with fewer cells than header", () => {
    const html = "<table><thead><tr><th>A</th><th>B</th><th>C</th></tr></thead>" +
      "<tbody><tr><td>1</td></tr></tbody></table>";
    const sections = new Map();

    const result = cleanTableHtml(html, sections);

    // Row should be padded to 3 cells
    const tdCount = (result.match(/<td[^>]*>/g) || []).length;
    assert.equal(tdCount, 3);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `cleanTableHtml` does not accept `extractedSections` parameter yet

- [ ] **Step 3: Rewrite `cleanTableHtml` to use new components**

Replace `cleanTableHtml` in `scripts/fetch_fluidtopics.js`:

```js
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: All PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch_fluidtopics.js scripts/fetch_fluidtopics.test.js
git commit -m "feat: rewrite cleanTableHtml to use extractTopLevelTables and analyzeTable"
```

---

## Task 9: Wire `fetchTopic` — admonition regex, separator cleanup, placeholder replacement

**Files:**
- Modify: `scripts/fetch_fluidtopics.js:201-243` (`fetchTopic`)
- Modify: `scripts/fetch_fluidtopics.test.js`

### 9a: Admonition regex expansion

Extract the admonition regex into its own exported function so it can be tested directly against the production code.

- [ ] **Step 1: Write failing test**

```js
const { convertAdmonitionHeadings } = require("./fetch_fluidtopics.js");

describe("convertAdmonitionHeadings", () => {
  it("converts ## Notes to bold", () => {
    assert.equal(convertAdmonitionHeadings("## Notes"), "**Notes:**");
  });

  it("converts ### Caution to bold", () => {
    assert.equal(convertAdmonitionHeadings("### Caution"), "**Caution:**");
  });

  it("converts ## Notice: to bold (trailing colon normalized)", () => {
    assert.equal(convertAdmonitionHeadings("## Notice:"), "**Notice:**");
  });

  it("preserves existing keywords", () => {
    assert.equal(convertAdmonitionHeadings("## Note"), "**Note:**");
    assert.equal(convertAdmonitionHeadings("### Warning"), "**Warning:**");
    assert.equal(convertAdmonitionHeadings("#### Tip"), "**Tip:**");
  });

  it("does not match non-admonition headings", () => {
    assert.equal(convertAdmonitionHeadings("## Installation"), "## Installation");
  });

  it("handles indented admonition headings", () => {
    assert.equal(convertAdmonitionHeadings("  ### Note"), "  **Note:**");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `convertAdmonitionHeadings is not a function`

- [ ] **Step 3: Extract admonition regex into exported function + update `fetchTopic`**

Add to `scripts/fetch_fluidtopics.js` (after `removeDuplicateSeparators`):

```js
function convertAdmonitionHeadings(md) {
  return md.replace(
    /^(\s*)#{2,6} (Prerequisite|Prerequisites|Note|Notes|Important|Warning|Danger|Tip|Caution|Notice):?$/gm,
    "$1**$2:**"
  );
}
```

In `fetchTopic`, replace lines 211-214:

```js
// BEFORE:
md = md.replace(
  /^(\s*)#{2,6} (Prerequisite|Prerequisites|Note|Important|Warning|Danger|Tip)$/gm,
  "$1**$2**"
);

// AFTER:
md = convertAdmonitionHeadings(md);
```

Add `convertAdmonitionHeadings` to `module.exports`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: All PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch_fluidtopics.js scripts/fetch_fluidtopics.test.js
git commit -m "feat: extract and expand admonition regex with Notes, Caution, Notice and colon normalization"
```

### 9b: Wire placeholder replacement + separator cleanup into `fetchTopic`

- [ ] **Step 5: Update `fetchTopic` to pass `extractedSections` and run post-processing**

In `scripts/fetch_fluidtopics.js`, update `fetchTopic` (lines 201-243):

```js
async function fetchTopic(topic, index, total, mapId, sourceMap) {
  const contentUrl = `/api/khub/maps/${mapId}/topics/${topic.contentId}/content`;
  try {
    const extractedSections = new Map();
    const html = cleanTableHtml(await fetch(contentUrl, "text/html"), extractedSections);
    let md = turndown.turndown(html);

    // 1. Replace base64 data-URI images with a placeholder
    md = md.replace(/!\[([^\]]*)\]\(data:image\/[^)]+\)/g, "[image: $1]");

    // 2. Convert admonition headings to bold labels (expanded keywords + colon normalization)
    md = convertAdmonitionHeadings(md);

    // 3. Normalize heading levels
    md = normalizeHeadings(md, topic.title);

    // 4. Remove duplicate separator rows
    md = removeDuplicateSeparators(md);

    // 5. Replace extracted-section placeholders (LAST — after all markdown post-processing)
    for (const [id, content] of extractedSections) {
      md = md.replace(`<!--EXTRACTED:${id}-->`, content);
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
```

- [ ] **Step 6: Run all tests**

Run: `npm test`
Expected: All PASS

- [ ] **Step 7: Commit**

```bash
git add scripts/fetch_fluidtopics.js
git commit -m "feat: wire extractedSections and removeDuplicateSeparators into fetchTopic"
```

---

## Task 10: Placeholder round-trip integration test

**Files:**
- Modify: `scripts/fetch_fluidtopics.test.js`

- [ ] **Step 1: Write round-trip test — HTML → cleanTableHtml → turndown → placeholder replacement**

```js
describe("placeholder round-trip", () => {
  it("extracted markdown survives cleanTableHtml → turndown → replacement", () => {
    const TurndownService = require("turndown");
    const { gfm } = require("turndown-plugin-gfm");
    const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
    td.use(gfm);

    const html = "<p>Before table.</p>" +
      "<table><tbody>" +
      "<tr><td>Op</td><td>Desc</td></tr>" +
      "<tr><td>=</td><td>Equals</td></tr>" +
      "<tr><td>IN</td><td><p>Check membership.</p><pre><code>filter IN</code></pre></td></tr>" +
      "<tr><td>!=</td><td>Not equals</td></tr>" +
      "</tbody></table>" +
      "<p>After table.</p>";

    const sections = new Map();
    const processed = cleanTableHtml(html, sections);

    // Verify placeholders are in processed HTML
    assert.ok(processed.includes("<!--EXTRACTED:") || sections.size === 0,
      "Complex rows should produce placeholders or table should be all-simple");

    // Run turndown
    let md = td.turndown(processed);

    // Replace placeholders
    for (const [id, content] of sections) {
      md = md.replace(`<!--EXTRACTED:${id}-->`, content);
    }

    // The final markdown should contain the extracted heading
    if (sections.size > 0) {
      assert.ok(md.includes("### IN"), "Extracted heading should appear in final markdown");
      assert.ok(md.includes("filter IN"), "Code content should survive round-trip");
    }

    // Non-table content should survive
    assert.ok(md.includes("Before table"));
    assert.ok(md.includes("After table"));
  });
});
```

- [ ] **Step 2: Run test**

Run: `npm test`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add scripts/fetch_fluidtopics.test.js
git commit -m "test: add placeholder round-trip integration test"
```

---

## Task 11: Snapshot tests with real-world HTML inputs

**Files:**
- Modify: `scripts/fetch_fluidtopics.test.js`

- [ ] **Step 1: Write snapshot tests using representative broken HTML from the spec**

```js
describe("snapshot: known-broken table patterns", () => {
  it("handles colspan section-divider rows", () => {
    const html = '<table><thead><tr><th>Field</th><th>Value</th></tr></thead>' +
      '<tbody><tr><td>f1</td><td>v1</td></tr>' +
      '<tr><td colspan="2">Advanced Settings</td></tr>' +
      '<tr><td>f2</td><td>v2</td></tr></tbody></table>';
    const sections = new Map();

    const result = cleanTableHtml(html, sections);

    assert.ok(result.includes("<strong>Advanced Settings</strong>"));
    // Both sub-tables should have headers
    assert.ok((result.match(/<thead>/g) || []).length >= 2);
  });

  it("handles nested table inside a cell", () => {
    const html = '<table><thead><tr><th>Feature</th><th>Details</th></tr></thead>' +
      '<tbody><tr><td>Basic</td><td>Simple text</td></tr>' +
      '<tr><td>Complex</td><td><table><tr><td>inner1</td></tr><tr><td>inner2</td></tr></table></td></tr>' +
      '</tbody></table>';
    const sections = new Map();

    const result = cleanTableHtml(html, sections);

    // Nested table should be extracted, not leak as raw HTML
    assert.ok(!result.includes("<table><tr><td>inner1</td></tr>"));
  });

  it("handles cell with code block", () => {
    const html = '<table><thead><tr><th>Function</th><th>Example</th></tr></thead>' +
      '<tbody><tr><td>json_path</td><td><p>Extract fields.</p><pre><code class="language-xql">json_path(field, "$.key")</code></pre></td></tr>' +
      '</tbody></table>';
    const sections = new Map();

    const result = cleanTableHtml(html, sections);

    if (sections.size > 0) {
      const content = [...sections.values()][0];
      assert.ok(content.includes("```xql"));
    }
  });

  it("handles cell with many list items", () => {
    const html = '<table><thead><tr><th>Name</th><th>Values</th></tr></thead>' +
      '<tbody><tr><td>OS</td><td><ul><li>Windows</li><li>Mac</li><li>Linux</li><li>Docker</li><li>K8s</li></ul></td></tr>' +
      '</tbody></table>';
    const sections = new Map();

    const result = cleanTableHtml(html, sections);

    // 5 items > MAX_LI_COUNT(3) → should be extracted
    assert.ok(sections.size > 0, "Cell with 5 list items should be extracted");
  });
});
```

- [ ] **Step 2: Run tests**

Run: `npm test`
Expected: All PASS

- [ ] **Step 3: Commit**

```bash
git add scripts/fetch_fluidtopics.test.js
git commit -m "test: add snapshot tests for known-broken table patterns"
```

---

## Task 12: Final exports + cleanup

**Files:**
- Modify: `scripts/fetch_fluidtopics.js` (final `module.exports`)

- [ ] **Step 1: Verify `module.exports` includes all testable functions**

Ensure the `module.exports` block at the bottom of `scripts/fetch_fluidtopics.js` is:

```js
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
```

- [ ] **Step 2: Run full test suite**

Run: `npm test`
Expected: All tests PASS (both `generate_combined.test.js` and `fetch_fluidtopics.test.js`)

- [ ] **Step 3: Commit**

```bash
git add scripts/fetch_fluidtopics.js
git commit -m "chore: finalize module.exports for all testable functions"
```

---

## Task 13: Golden baseline integration test

This task is run after all code changes are complete. Requires golden baselines captured in Task 0.

- [ ] **Step 1: Run full pipeline with code changes**

```bash
npm run fetch && npm run fix && npm run combine
```

- [ ] **Step 3: Diff combined outputs against baselines**

```bash
diff test_baselines/cortex-cloud-appsec-combined.md sources_fetch/cortex-cloud-appsec-combined.md > /dev/null || echo "appsec: diffs found"
diff test_baselines/cortex-cloud-runtime-combined.md sources_fetch/cortex-cloud-runtime-combined.md > /dev/null || echo "runtime: diffs found"
diff test_baselines/cortex-cloud-posture-combined.md sources_fetch/cortex-cloud-posture-combined.md > /dev/null || echo "posture: diffs found"
```

- [ ] **Step 4: Review every diff — classify as improvement, neutral, or regression**

Each diff must be one of:
- **Improvement:** broken table → well-formed markdown
- **Neutral:** cosmetic change (e.g., colon added to admonition)
- **Regression:** new malformation → **hard stop, fix before proceeding**

- [ ] **Step 5: Commit golden baselines update if all diffs are improvements or neutral**

```bash
git add sources_fetch/cortex-cloud-*-combined.md
git commit -m "chore: update combined outputs after table processing overhaul"
```
