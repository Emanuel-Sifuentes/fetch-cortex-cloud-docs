# AEM Fix Scripts — Design Spec

## Problem

The 466 Prisma Access markdown files fetched from docs.paloaltonetworks.com (Adobe AEM) contain extensive CMS chrome, leaked JavaScript, broken link paths, and navigation artifacts. Every file has a predictable structure of non-content elements that must be stripped before the files are useful for RAG ingestion.

## Issue Catalog

Analysis of all 466 files revealed these issues (all present in 100% of files unless noted):

### Structural CMS Chrome (header block, ~lines 12-132)
- "Updated on" + timestamp (appears twice per file)
- "Focus" button text
- Filter icon + "Filter" + "Expand All | Collapse All"
- Full sidebar navigation repeated twice (Prisma Access Docs, Release Notes, version selectors, section links)
- Breadcrumb navigation (numbered list: Home > Prisma Access > ...)
- Standalone "Prisma Access" product label
- "Table of Contents" text + duplicate UI controls
- Duplicate page heading (slug-style H1 like `prisma-access:admin:topic`)

### Structural CMS Chrome (footer block, end of file)
- Previous/Next navigation links
- "On This Page" heading + footer navigation links (~180 lines)
- Usabilla JavaScript block (ad-block notification code)

### Content-Level Issues
- Images pointing to `/content/dam/techdocs/...` paths (icons and content images)
- Links with `/content/techdocs/en_US/...` prefix and `.html` extension
- Directional arrow SVG icons in navigation (`_![directional arrow](...)_`)
- "Download PDF" standalone text
- Horizontal rule dividers (`* * *`) from CMS
- Escaped underscores (`\_`) — handled by existing `fix_escaped_underscores.py`
- Broken markdown table rows — handled by existing `fix_broken_tables.py`
- Raw HTML tables (14 files, ~3%) — deferred
- Excessive blank lines

## Architecture

### New Script 1: `scripts/fix_aem_chrome.py`

Hybrid boundary-based + pattern-based CMS chrome removal.

#### Boundary Detection — Content Start

1. Scan for the second occurrence of `##### Prisma Access Docs` (the sidebar nav repeats twice in every file)
2. After that, find the actual page heading — the first `# ` heading that follows the "Table of Contents" / "Expand All | Collapse All" block
3. Everything before that heading is header chrome — strip it

#### Boundary Detection — Content End

1. Scan backwards from end of file for the Usabilla JavaScript marker: `if (!usabilla`
2. If not found, fall back to `#### On This Page` heading
3. Everything from that marker to EOF is footer chrome — strip it

#### Pattern Cleanup (within remaining content body)

After boundary stripping, remove these patterns from the content:

- **"Updated on" timestamps**: 2-line pattern (`Updated on\n<timestamp>`)
- **"Download PDF"**: standalone lines
- **Previous/Next navigation**: multi-line link blocks (`[Previous...](...)` / `[Next...](...)`)
- **Horizontal rule dividers**: `* * *` lines that were CMS separators
- **Duplicate H1**: if the first H1 after frontmatter is slug-style (lowercase with colons like `prisma-access:admin:topic`), remove it — the real title is already in frontmatter
- **Blank line collapsing**: 3+ consecutive blank lines → 1 blank line

#### Frontmatter Preservation

Skip everything between `---` delimiters at the top of the file.

#### CLI Interface

```
python scripts/fix_aem_chrome.py --sources <dir>
python scripts/fix_aem_chrome.py --sources <dir> --dry-run
```

Targets `[0-9]*.md` files. Follows the same pattern as existing fix scripts.

### New Script 2: `scripts/fix_aem_links.py`

Link and image cleanup for AEM-sourced content.

#### Image Stripping

- Match all markdown images: `![any alt text](any url)` → remove entirely
- Match emphasized directional arrow pattern: `_![directional arrow](...)_` → remove entirely
- Collapse blank lines after removal

#### Link Path Cleaning

- Match links with CMS prefix: `[text](/content/techdocs/en_US/path/to/page.html)` → `[text](/path/to/page)`
- Strip `/content/techdocs/en_US` prefix and `.html` extension
- Handle absolute URLs: `[text](https://docs.paloaltonetworks.com/content/techdocs/en_US/path.html)` → `[text](/path)`
- Links without CMS prefix pass through unchanged

#### CLI Interface

```
python scripts/fix_aem_links.py --sources <dir>
python scripts/fix_aem_links.py --sources <dir> --dry-run
```

Targets `[0-9]*.md` files.

### Pipeline Integration — `scripts/fix.js`

#### AEM Pipeline (for SASE product directories)

Run in this order:
1. `fix_aem_chrome.py` — strip CMS header/footer, clean patterns
2. `fix_aem_links.py` — strip images, clean link paths
3. `fix_escaped_underscores.py` — unescape `\_`, `\[`, `\]` (shared)
4. `fix_broken_tables.py` — fix broken markdown table rows (shared)

#### Cortex Pipeline (unchanged, for Fluid Topics product directories)

1. `fix_abstract_lines.py`
2. `fix_escaped_chars_in_fences.py`
3. `fix_escaped_underscores.py`
4. `fix_images_and_fences.py`
5. `fix_broken_tables.py`

#### Detection

`fix.js` already knows which directories are AEM products (via `SASE_PRODUCTS` from `aem_config.js`). Per directory, check if the directory name is a key in `SASE_PRODUCTS` — if so, run the AEM pipeline. Otherwise, run the Cortex pipeline.

## Testing

### `fix_aem_chrome.py` tests

- Boundary detection: full file with header chrome + content + footer chrome → only content remains
- Pattern removal: "Updated on" timestamps, "Download PDF", prev/next links, dividers, duplicate H1
- Blank line collapsing: 3+ blank lines → 1
- Frontmatter preservation: YAML frontmatter untouched
- Edge case: file with no recognizable boundaries → pass through unchanged

### `fix_aem_links.py` tests

- Image stripping: `![alt](url)` → empty, `_![arrow](url)_` → empty
- Link cleaning: `/content/techdocs/en_US/path.html` → `/path`
- Absolute URL cleaning: `https://docs.paloaltonetworks.com/content/techdocs/en_US/path.html` → `/path`
- Blank line collapsing after image removal
- Links without CMS prefix pass through unchanged

### Integration test

Run full AEM pipeline on a real Prisma Access file, verify output is clean markdown with no CMS chrome, clean relative links, no images, proper formatting.

## Deferred

- Raw HTML tables (14 files, ~3% of corpus) — these are `<table class="table">` tags that Turndown failed to convert. Handle in a future iteration if needed.
