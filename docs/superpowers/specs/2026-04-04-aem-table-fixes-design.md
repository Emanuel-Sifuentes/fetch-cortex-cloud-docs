# AEM Table Fixes — Design Spec

## Problem

The 634 Prisma Access markdown files fetched from docs.paloaltonetworks.com contain two categories of table problems:

1. **Broken markdown tables (377+ files, 59% of corpus):** Turndown partially converted HTML tables but split cell content across multiple lines with blank lines in between. The existing `fix_broken_tables.py` resets its state machine on blank lines and fixes 0 of these.

2. **Raw HTML tables (17 files, 3% of corpus):** Turndown failed entirely and left raw `<table class="table">...</table>` blocks. All share consistent DITA-based structure from Palo Alto's AEM CMS.

## Issue Catalog

### Broken Markdown Tables — Patterns Found

**Pattern A — Symbol cells split across blank lines (most common, ~300+ files):**

```
| Crypto Profiles | Prisma Access | Aruba |
| --- | --- | --- |
| **Tunnel Type** | IPSec Tunnel | √ |

√

 |
| GRE Tunnel | — | N/A |
```

Checkmarks (√) and dashes (—) end up on their own lines with blank lines around them. The closing ` |` appears on a separate line.

**Pattern B — Multi-paragraph cell content (~30 files):**

```
| Deployment Type | Notification Period |
| --- | --- |
| **Production Deployments** |
Palo Alto Networks provides you with a notification 21 days before a major release.

 |
```

Long text cells break across lines with blank lines between paragraphs. Closed by ` |` on its own line.

**Pattern C — Row continuation with markdown lists (~5 files):**

```
| Section | Element | Details |
| --- | --- | --- |
| Match Criteria | Source | Define the matching criteria...
-   Specify source **Addresses**...

 |
```

Cell content contains markdown lists that break the table row structure.

**Pattern D — Header cells spanning multiple lines (~10 files):**

```
|
Incident Category

 |

License

 |
| --- | --- |
```

Even header cells get split across lines with blank lines between content and pipes.

### Raw HTML Tables — Structure

All 17 files share consistent DITA-based HTML structure:

- CSS classes: `table`, `table colsep`, `table rowsep`, `table colsep rowsep`
- Cell classes: `entry`, `entry relcol`
- Inline elements: `<b class="ph b">`, `<a class="xref">`, `<span class="ph systemoutput">`, `<span class="ph uicontrol">`, `<span class="ph menucascade">`, `<ul>/<li>`, `<div class="note">`, `<figure>`

Categories:
- Simple 2-column API spec tables (URI + HTTP Method) — 5 files
- Multi-column data/comparison tables — 8 files
- Tables with complex nested content (lists, notes, figures) — 4 files

## Architecture

### New Script 1: `scripts/fix_aem_html_tables.py`

Converts raw HTML `<table>` blocks to markdown tables using Python's `html.parser`.

#### HTML Parsing

1. Find all `<table...>...</table>` blocks in the markdown body
2. Parse each block with `html.parser`
3. Walk the DOM: `<tbody>` → `<tr>` → `<td>`
4. For each cell, convert inline HTML to markdown

#### Inline HTML-to-Markdown Conversion

| HTML Element | Markdown Output |
|---|---|
| `<b>`, `<strong>` | `**text**` |
| `<i>`, `<em>` | `*text*` |
| `<a href="url">text</a>` | `[text](url)` |
| `<span class="ph systemoutput">` | `` `text` `` |
| `<span class="ph uicontrol">` | `**text**` |
| `<span class="ph menucascade">` | Join children with ` > ` |
| `<ul>/<ol>` + `<li>` | Semicolon-separated text |
| `<div class="note">` | Strip wrapper, keep text content |
| `<figure>` | Drop entirely |
| All other tags | Strip tags, keep text content |

#### Table Construction

1. Determine column count from first row
2. If first row has bold text → use as header row
3. If first row is data → generate generic header ("Column 1", "Column 2", etc.)
4. Add separator row (`| --- | --- |`)
5. Add data rows with matching pipe count
6. Escape any literal `|` in cell content to `\|`

#### Single-Column Note Tables

4 files have `<table>` blocks that are styled note/tip containers (single cell). Convert these to plain text instead of a 1-column table.

#### Cell Text Cleanup

- Collapse whitespace (newlines, multiple spaces → single space)
- Strip leading/trailing whitespace per cell

#### CLI Interface

```
python scripts/fix_aem_html_tables.py --sources <dir>
python scripts/fix_aem_html_tables.py --sources <dir> --dry-run
```

Targets `[0-9]*.md` files.

### New Script 2: `scripts/fix_aem_tables.py`

Rejoins broken markdown table rows where cell content is split across multiple lines with blank lines.

#### Algorithm — Modified State Machine

```
1. Scan for separator row (| --- | --- |) → set expected_pipes
2. For each subsequent line starting with |:
   a. If pipe count >= expected_pipes → complete row, emit as-is
   b. If pipe count < expected_pipes → broken row, enter collection mode:
      - Collect continuation lines (including blank lines)
      - Stop collecting when:
        • Next non-blank line starts with | and has >= expected_pipes (new row)
        • Next non-blank line is a separator row (new table)
        • Next non-blank line doesn't start with |, isn't blank,
          and isn't indented content or a closing pipe (left the table)
      - Join all collected parts into one row, collapse whitespace
3. Reset expected_pipes only when encountering clearly non-table content
   (not starting with |, not blank, not a continuation)
```

**Key difference from `fix_broken_tables.py`:** Blank lines do NOT reset state when actively collecting a broken row. State resets only when encountering content that is clearly outside the table.

#### Continuation Line Detection

Lines considered part of a broken row (collected, not treated as table exit):
- Blank lines
- Lines with only `|` or ` |` (closing pipe of split cell)
- Lines containing cell content without `|` (e.g., `√`, `Not recommended`, paragraph text)
- Lines starting with `-` or `*` (list items inside a cell)

Lines that end collection:
- Lines starting with `|` with `>= expected_pipes` (a new complete row)
- Separator rows (`| --- | --- |`)
- Lines starting with `#` (headings)
- Lines that are clearly structural markdown (numbered lists not inside tables, code fences)

#### CLI Interface

```
python scripts/fix_aem_tables.py --sources <dir>
python scripts/fix_aem_tables.py --sources <dir> --dry-run
```

Targets `[0-9]*.md` files.

### Pipeline Integration — `scripts/fix.js`

Updated AEM pipeline order:

```
1. fix_aem_chrome.py           — strip CMS header/footer chrome
2. fix_aem_links.py            — strip images, clean link paths
3. fix_aem_html_tables.py      — NEW: convert raw HTML tables to markdown
4. fix_aem_tables.py           — NEW: rejoin broken markdown table rows
5. fix_escaped_underscores.py  — unescape \_ (shared)
6. fix_broken_tables.py        — fix simple broken rows (shared, safety net)
```

Order rationale:
- HTML tables convert first (step 3), producing markdown tables
- Broken table fixer runs next (step 4), catching both original broken tables and any malformed output from step 3
- Existing `fix_broken_tables.py` runs last as safety net for any remaining simple splits

## Testing

### `test_fix_aem_html_tables.py`

- Simple 2-column table: `<table>` with 2 columns → proper markdown table
- Bold, italic, links, code spans preserved in cells
- Menu cascades: `<span class="ph menucascade">` children joined with ` > `
- Lists inside cells: `<ul><li>` flattened to semicolon-separated text
- Single-column note tables: converted to plain text, not a table
- Figures: `<figure>` dropped entirely
- Multiple `<table>` blocks in one file: each converted independently
- Non-table HTML left unchanged
- Literal `|` in cell content escaped to `\|`
- Frontmatter preserved
- Returns 0 when no HTML tables present
- Dry-run does not modify file

### `test_fix_aem_tables.py`

- Symbol cells split with blank lines: `√` on its own line → rejoined into row
- Multi-paragraph cell content: long text with blank lines → single row
- Annotation text on separate line: `Not recommended` → joined into cell
- Header cells spanning multiple lines → rejoined
- Row with only `|` as continuation → collected as closing pipe
- Closing ` |` on its own line → collected
- List items inside split cell (`-   item`) → collected
- Complete rows pass through unchanged
- Table with no broken rows → unchanged
- Multiple tables in one file: each fixed independently
- Non-table content preserved
- Frontmatter preserved
- Returns 0 when no broken rows
- Dry-run does not modify file

### Integration Verification

Run full AEM pipeline on all 634 files, verify:
- 0 raw HTML `<table>` blocks remaining
- 0 broken table rows (pipe count mismatches across all files)

## Deferred

- Tables inside code fences (none found in corpus)
- Nested HTML tables (none found in corpus)
- `<table>` blocks in Cortex/Fluid Topics files (not applicable — different CMS)
