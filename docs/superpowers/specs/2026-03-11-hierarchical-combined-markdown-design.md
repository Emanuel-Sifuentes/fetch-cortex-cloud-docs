# Hierarchical Combined Markdown Generation

## Problem

The combined markdown file (`cortex-cloud-appsec-combined.md`) uses `# h1` for every topic title, losing the hierarchical structure visible in the Palo Alto Networks documentation nav. Additionally, the combined file is regenerated three separate times by three different scripts (`fetch_fluidtopics.js`, `fix_abstract_lines.sh`, `fix_escaped_underscores.py`), all with identical naive strip-frontmatter-and-concatenate logic.

## Solution

Create a single dedicated script (`generate_combined.js`) that builds the combined file with depth-aware heading levels sourced from the live TOC API. Remove combined file generation from all other scripts. Update audit and TOC table scripts to reflect the hierarchical model.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| `npm run fetch` produces combined file? | No | Eliminates confusing intermediate state where combined file exists but is wrong |
| Heading cap behavior | Cap at h6 with warning | Simple, lossless for 95%+ of content, warns when depth is lost |
| Topic separators in combined file | None (removed) | Headings define structure; `---` separators are redundant |
| Standalone script vs shared module | Standalone | YAGNI; one script builds the combined file |
| Depth source | Live TOC API | Authoritative, can't go stale, catches frontmatter bugs |
| Dead code | Remove | No dead functions, unused args, or redundant file reads |

## New File: `scripts/generate_combined.js`

Single source of truth for building the combined markdown file.

### Input

- Live TOC tree from `GET /api/khub/maps/{mapId}/toc`
- Individual `[0-9]*.md` files in `sources_fetch/`

### Logic

1. Fetch TOC tree from the Fluid Topics API.
2. Flatten to an ordered list preserving `depth` and `contentId` per node.
3. Build a `contentId -> depth` lookup map.
4. Read each individual file. Parse `contentId` from YAML frontmatter (only for matching; depth comes from the API).
5. Strip frontmatter.
6. Walk lines tracking code fence state. For headings outside code fences: `newLevel = min(originalLevel + depth, 6)`. If capped, log: `WARNING: heading capped at h6 in <filename>: "<heading text>"`.
7. Concatenate topics in TOC order (API-driven, not filesystem sort). No `---` separators between topics.
8. If any local files have no matching TOC entry, log a warning. If any TOC entries have no matching local file, log a warning.
9. Write to `sources_fetch/cortex-cloud-appsec-combined.md`.

### Output Example

```markdown
# Cortex Cloud Application Security

Content...

## Onboard Data Sources

Content...

### Onboard version control systems

Content...

#### AWS CodeCommit

Content with ## Sub-heading becoming #### Sub-heading...
```

## Modified Files

### `fetch_fluidtopics.js`

**Delete** the combined file generation block (lines 265-283): the `console.log("Creating combined markdown...")`, the file reading/stripping/joining loop, the `fs.writeFileSync` for the combined file, and the final console.log referencing it. Update the closing console.log to only report individual file count.

### `fix_abstract_lines.sh`

**Delete** steps 3 and 4 (lines 37-83): combined file regeneration and verification. Update step numbering and echo labels. Script shrinks from ~84 lines to ~35 lines. Keeps steps 1 (fix individual files) and 2 (verify fix).

### `fix_escaped_underscores.py`

**Delete** the `regenerate_combined` function (lines 52-72), the `--no-combine` argument definition (lines 85-89), and the conditional call to `regenerate_combined` (lines 125-126). `find_frontmatter_end` stays (used by `fix_file`).

### `package.json`

```json
"scripts": {
  "fetch": "node scripts/fetch_fluidtopics.js",
  "combine": "node scripts/generate_combined.js",
  "fix": "bash scripts/fix_abstract_lines.sh && python scripts/fix_escaped_chars_in_fences.py sources_fetch/216-Developer-Suppressions.md && python scripts/fix_escaped_underscores.py && npm run combine",
  "audit:headings": "node scripts/audit_headings.js",
  "audit:toc": "node scripts/audit_toc_vs_headings.js",
  "toc:table": "node scripts/generate_toc_table.js"
}
```

Workflow remains `npm run fetch && npm run fix`. Combined file is built once at the end of `fix`.

### `audit_headings.js`

**Refactor** to read each file once instead of twice (currently duplicates frontmatter parsing in two separate loops). Add a new check: simulate the depth shift from the live TOC API and report any headings that would be capped at h6. Existing checks (title-as-h1, pattern analysis) remain unchanged.

### `audit_toc_vs_headings.js`

**Add Audit 6:** If the combined file exists, read it and verify that each topic's title heading level matches the expected `depth + 1` (where depth comes from the live TOC API). Walk the combined file matching headings to TOC entries in order. Existing audits 1-5 remain unchanged.

### `generate_toc_table.js`

**Rewrite** output format. Replace the flat markdown table (with `nbsp` indentation hacks, `tocId`/`contentId` columns, child counts) with an indented tree:

```
- Cortex Cloud Application Security
- Onboard Data Sources
  - Onboard version control systems
    - AWS CodeCommit
    - Azure DevOps
      - Azure DevOps onboarding system architecture
    - Bitbucket Cloud
  ...

**Total:** 217 topics, max depth: 5
```

The `walk` function and row-building logic are replaced with a simple recursive tree printer. The script still fetches from the live API.

## What Does Not Change

- **Individual files** — Still `# h1` title with `## h2+` subheadings. Each file is standalone.
- **`fix_escaped_chars_in_fences.py`** — Only touches one individual file, no combined logic.
- **Frontmatter format** — Still contains `depth`, `tocId`, `contentId`, `prettyUrl`, `title`. No fields added or removed.
- **The fetch/fix workflow** — `npm run fetch && npm run fix` still does everything. Users don't need to learn new commands (though `npm run combine` is available standalone).
