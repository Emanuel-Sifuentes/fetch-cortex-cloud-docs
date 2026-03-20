# Multi-Map Deduplicated Combined Markdown

**Date:** 2026-03-18
**Status:** Approved

## Problem

The pipeline currently fetches and combines a single documentation map (Cortex
Cloud Application Security, 217 topics). The project needs to produce 3
deduplicated combined markdown files for ingestion into a GCP RAG Engine:

- `cortex-cloud-appsec-combined.md` — Application Security content
- `cortex-cloud-posture-combined.md` — Posture Management content
- `cortex-cloud-runtime-combined.md` — Runtime Security content

These 3 maps share significant content overlap. Without deduplication, the same
content would appear in multiple RAG databases, wasting storage and producing
redundant/confusing retrievals.

## Overlap Analysis

| Map | TOC entries | Unique contentIds | Duplicates within TOC |
|-----|------------|-------------------|----------------------|
| AppSec | 217 | 217 | 0 |
| Posture | 1,091 | 1,039 | 52 |
| Runtime | 1,415 | 1,363 | 52 |

Both Posture and Runtime TOCs contain 52 duplicate contentIds — topics
cross-referenced from multiple places in the hierarchy (e.g., container
registry scanning topics appear under both a dedicated section and a parent
section). Bucketing operates on unique contentIds. The duplicates appear at
different depths; the combine step includes them at each TOC position where
they appear.

| Bucket | Description | Unique contentIds |
|--------|-------------|-------------------|
| PRA | Shared by all three | 216 |
| PR | Posture + Runtime only | 641 |
| R | Runtime only | 506 |
| P (title-matched) | Posture contentId, content in Runtime under different contentId | 175 |
| P (truly unique) | Only in Posture, no Runtime equivalent | 7 |
| A | AppSec only | 1 (root node) |

**Verification:** Posture unique = PRA + PR + P_matched + P_unique = 216 + 641
+ 175 + 7 = 1,039. Runtime unique = PRA + PR + R = 216 + 641 + 506 = 1,363.
AppSec unique = PRA + A = 216 + 1 = 217. All check out.

175 of the 182 "Posture-only by contentId" topics exist in Runtime under
different contentIds but with identical content (differences are limited to HTML
metadata attributes like `data-branchlabel`, `data-origin-id`, and
`data-publication-date`). Title-based matching reliably resolves these pairs.

## Decisions

- **Runtime is the canonical source.** It contains all PRA, PR, and R topics
  plus title-matched equivalents of 175 Posture topics.
- **No duplication across output files.** Each topic appears in exactly one
  combined file.
- **posture.md owns the PR bucket.** Shared platform content (onboarding, auth,
  compliance) lives in posture.md, not runtime.md.
- **Neither posture.md nor runtime.md includes PRA (AppSec) topics.**
- **Fetch once, split at combine time.** All content is fetched into a single
  flat directory. The combine step computes buckets and produces 3 files.

## Output File Content

| File | Content | TOC used for ordering | Approx topics |
|------|---------|----------------------|---------------|
| `cortex-cloud-appsec-combined.md` | PRA + AppSec root node | AppSec TOC | ~217 |
| `cortex-cloud-posture-combined.md` | PR + P (7 unique) | Posture TOC | ~648 |
| `cortex-cloud-runtime-combined.md` | R only | Runtime TOC | ~506 |

Each file uses its own map's TOC for topic ordering and heading depth. The
Posture TOC arranges topics differently than Runtime's TOC (different depths,
different hierarchy), so `posture.md` follows the Posture TOC structure even
though the content files were fetched from the Runtime map.

## Map Registry

| Name | MAP_ID | Role |
|------|--------|------|
| appsec | `aUsxSwBeRrRs3Jm36XHckg` | TOC only (content from Runtime) |
| posture | `BNCvOg6pEdBp~axnn92pBQ` | TOC + 7 unique topic fetches |
| runtime | `bKDBlplrokDJKA~h8O9o6A` | Primary content source + TOC |
| xsiam3 | `5CAbsl8idaK8R43ZLhoTOw` | Future |
| xdr5 | `GD6sG6FlxDWxAn13_eZuUQ` | Future (note: codebase has `2_2qwhN44Nsd0dkafwEuaQ` — this is the "Upgrade to Cortex XDR 5" map, not the documentation map; use `GD6sG6FlxDWxAn13_eZuUQ` for "Cortex XDR 5.x Documentation") |

## Fetch Step

**File:** `scripts/fetch_fluidtopics.js`

Swap the primary MAP_ID from AppSec to Runtime. The script fetches 1,415
Runtime topics into `sources_fetch/` as numbered markdown files, exactly as it
does today for AppSec (same Turndown config, table cleaning, heading
normalization, admonition conversion).

After the Runtime fetch, a supplemental pass fetches 7 Posture-unique topics
from the Posture map. These are numbered sequentially after the Runtime topics
(e.g., `1416-*.md` through `1422-*.md`) and include `sourceMap: "posture"` in
their YAML frontmatter so the combine step can identify their origin.

With 1,400+ topics, filenames use 4-digit zero-padded numbering (`0001-*.md`
through `1422-*.md`). The existing 3-digit regex (`/^\d{3}-/`) in
`generate_combined.js` must be updated to `/^\d{3,4}-/` or `/^\d+-/`.

If a topic fetch fails, the script logs a warning and continues (same behavior
as today). Numbering is based on the topic's position in the batch, so gaps may
occur. The combine step resolves files by contentId, not by file number, so
gaps do not affect output.

### `--map` CLI flag

- `--map runtime` — fetch 1,415 Runtime topics only
- `--map posture` — fetch the 7 Posture-unique topics only
- `--map appsec` — no-op (AppSec content comes from Runtime fetch)
- No flag / `--map all` — fetch Runtime + Posture supplement (default)

## Combine Step

**File:** `scripts/generate_combined.js`

### Bucketing

The combine step always fetches all 3 TOCs (Runtime, Posture, AppSec)
regardless of which output file it's producing. A new exported pure function
`computeBuckets(postureToc, runtimeToc, appsecToc)` computes:

- **PRA** — `Set<contentId>` present in all 3 TOCs
- **PR** — `Set<contentId>` in Posture and Runtime but not AppSec
- **R** — `Set<contentId>` only in Runtime
- **P** — `Set<contentId>` only in Posture (the 7 truly unique topics)
- **A** — `Set<contentId>` only in AppSec (the root node)
- **titleMatched** — `Map<postureContentId, runtimeContentId>` for the 175
  pairs that share a title but have different contentIds

Each TOC parameter is a flattened array of `{ contentId, title, depth }`
objects (the output of the existing `flattenToc()` function).

Title matching uses exact string equality on the `title` field. This is
sufficient because all 175 pairs have identical titles. When a title appears
multiple times within the Runtime TOC, pick the entry whose depth is closest
to the Posture entry's depth. Title matching runs only on contentIds that are
in the Posture TOC but not in Runtime — it does not apply to PRA, PR, or R
buckets.

Both Posture and Runtime TOCs contain 52 duplicate contentIds (topics
cross-referenced in multiple places). Bucketing operates on unique contentIds
(using Sets), so duplicates do not affect bucket membership. The combine step
still processes each TOC entry in order, including duplicates — a topic may
appear twice in the combined output if the TOC references it twice.

### File resolution

A new exported function `resolveFile(contentId, titleMatchMap, fileMap)` finds
the corresponding file in `sources_fetch/` for a given TOC entry. For Posture
TOC entries whose contentId doesn't exist in the file map, it falls back to
the title-match lookup to find the Runtime-fetched equivalent.

Returns `null` when a contentId cannot be resolved. The combine step logs a
warning and skips unresolvable entries (this should not occur for correctly
bucketed data, but defensive handling avoids a crash if the TOC changes between
fetch and combine).

### Output generation

For each output file, the combine step:

1. Filters the relevant TOC to only include contentIds in the target bucket
2. Iterates in TOC order, resolving each entry to a local file
3. Strips frontmatter, shifts headings by TOC depth (capped at h6)
4. Applies `promoteKeywordsToHeadings()` (unchanged)
5. Writes the combined output

### `--map` CLI flag

- `--map appsec` — produce only `cortex-cloud-appsec-combined.md`
- `--map posture` — produce only `cortex-cloud-posture-combined.md`
- `--map runtime` — produce only `cortex-cloud-runtime-combined.md`
- No flag / `--map all` — produce all 3 (default)

## Fix Step

**File:** `package.json` `fix` script

The fix scripts (`fix_abstract_lines.sh`, `fix_escaped_chars_in_fences.py`,
`fix_escaped_underscores.py`) run on all files in `sources_fetch/`. They are
idempotent so running on already-fixed files is harmless.

The `--map` flag on `fix` controls only which combine step runs at the end:
`npm run fix -- --map posture` runs all fixes then
`npm run combine -- --map posture`.

The hardcoded `sources_fetch/216-*.md` path in the current `fix` npm script
targets a specific topic's escaped characters inside code fences. With the new
topic set, this file number will change. Replace the hardcoded path with a
content-based approach: either run `fix_escaped_chars_in_fences.py` on all
files (it's safe — it only modifies content inside code fences) or identify
the target file by title/contentId at fix time.

## Audit and Utility Scripts

**Files:** `audit_headings.js`, `audit_toc_vs_headings.js`,
`generate_toc_table.js`

Each script gets a `--map` CLI flag with a small MAP_ID lookup map at the top
of the file. The flag determines which MAP_ID and combined file to audit
against. Defaults to `runtime` when no flag is given.

No shared config module is introduced in this phase. See `tasks/todo.md` for
the future config-driven iteration.

## Testing

**File:** `scripts/generate_combined.test.js`

Existing `promoteKeywordsToHeadings()` tests are unchanged.

New unit tests for the bucketing logic using fixture data (no API calls):

### `computeBuckets()` tests

- contentIds in all 3 TOCs land in PRA
- contentIds in Posture + Runtime but not AppSec land in PR
- contentIds only in Runtime land in R
- contentIds only in Posture land in P
- AppSec root node lands in A
- Title-matched pairs are correctly identified

### `resolveFile()` tests

- Direct contentId match returns the file
- Fallback to title-match lookup when contentId not found
- Returns null for unresolvable entries (combine step logs warning and skips)

## Files Changed

| File | Change |
|------|--------|
| `scripts/fetch_fluidtopics.js` | Swap to Runtime MAP_ID, add Posture supplement, add `--map` CLI |
| `scripts/generate_combined.js` | Add bucketing logic, 3 output files, title-match resolution, `--map` CLI |
| `scripts/generate_combined.test.js` | Add `computeBuckets()` and `resolveFile()` tests |
| `scripts/audit_headings.js` | Add `--map` CLI, MAP_ID lookup |
| `scripts/audit_toc_vs_headings.js` | Add `--map` CLI, MAP_ID lookup |
| `scripts/generate_toc_table.js` | Add `--map` CLI, MAP_ID lookup |
| `package.json` | Update `fix` script to remove hardcoded `216-*` path |

No new files are created (aside from test fixtures if needed).

Note: `tasks/todo.md` already exists with future iteration plans but is not
modified by this work.

## Implementation Notes

**Output location:** All 3 combined files are written to `sources_fetch/`
alongside the individual topic files (same location as today's single combined
file).

**TOC fetching at combine time:** The 3 TOC fetches are made sequentially
(same as the current single fetch). No parallel fetching or additional rate
limiting is needed — TOC endpoints return small JSON payloads.

**`--map appsec` on fetch:** Prints a message explaining that AppSec content
comes from the Runtime fetch and exits without fetching.

**Module exports:** `computeBuckets` and `resolveFile` are exported from
`generate_combined.js` alongside the existing `promoteKeywordsToHeadings`
export, enabling unit testing.

## Future Work

See `tasks/todo.md` for the config-driven pipeline iteration (shared
`config.js` module, `buckets.json` manifest, per-map output directories). That
refactor is warranted when adding XSIAM 3.x or XDR 5.x to the pipeline.
