# Global Cross-Product Deduplication

**Date:** 2026-03-20
**Status:** Draft
**Depends on:** 2026-03-18-multi-map-dedup-design.md (implemented)

## Problem

The pipeline produces combined markdown files for 8 documentation maps across 5
products, all ingested into a single GCP RAG Engine corpus. Currently, only the 3
Cortex Cloud maps (appsec, posture, runtime) are deduplicated against each other.
The remaining maps (xdr_5, xsiam_3, agentix) are processed independently, even
though they share massive content overlap with each other and with Cloud.

From overlap analysis (2026-03-20):

| Pair | Exact contentId | Title-only match | Combined |
|------|----------------|-----------------|----------|
| XDR ↔ Runtime | 378 | 535 | 945 |
| XDR ↔ Posture | 258 | 345 | 621 |
| XDR ↔ XSIAM | 259 | 770 | 1,065 |
| XSIAM ↔ Runtime | 668 | 618 | 1,315 |
| XSIAM ↔ Posture | 514 | 451 | 991 |
| Agentix ↔ XSIAM | 42 | 453 | 505 |
| Agentix ↔ Runtime | 28 | 370 | 407 |
| Agentix ↔ XDR | 6 | 389 | 406 |

Without global dedup, ~1,500+ duplicate topics enter the RAG corpus, degrading
retrieval quality with redundant/confusing results.

## Ownership Hierarchy

Each topic is owned by exactly one product. Ownership follows a fixed priority:

**XDR > Cloud > XSIAM > Agentix**

Rules:
- If a topic's contentId exists in a higher-priority product, the lower-priority
  product drops it.
- If a topic's normalized title matches a topic in a higher-priority product
  (but with a different contentId), the lower-priority product drops it.
- XDR has highest priority — if XDR has a topic, XDR owns it regardless of
  whether Cloud or XSIAM also have it.
- Cloud has second priority — "Cortex Cloud should have XDR material removed."
- XSIAM has third priority — "XSIAM should have XDR and Cloud material removed."
- Agentix keeps only what no other product has.

**Excluded from dedup:** Gateway (13 topics, 100% isolated) and XDR Compatibility
(9 topics, 100% isolated) are processed as simple maps with no filtering.

### Rationale

- XDR is the most specific product. Shared topics between XDR and Cloud are
  XDR-originated content that leaked into Cloud maps. Cloud should not include them.
- XSIAM is a superset platform that pulls in content from both XDR and Cloud.
  After removing content owned by XDR and Cloud, XSIAM retains its unique
  SIEM/SOAR/analytics material.
- Agentix (automation/orchestration) reuses XQL, configuration, investigation,
  and threat intel content almost verbatim from XSIAM/XDR/Cloud. Only
  Agentix-specific onboarding and product intro content survives (~45 of 551
  topics, or 8%).

## Overlap Analysis: Agentix Detail

Per top-level TOC section after global dedup:

| Section | Total | Dropped | Kept | %Kept |
|---------|-------|---------|------|-------|
| Cortex AgentiX XQL | 168 | 167 | 1 | 1% |
| Cortex AgentiX configuration | 236 | 219 | 17 | 7% |
| Investigation and Response | 57 | 56 | 1 | 2% |
| Threat Intel Management | 36 | 34 | 2 | 6% |
| Onboard Cortex AgentiX | 23 | 13 | 10 | 43% |
| Troubleshoot | 16 | 13 | 3 | 19% |
| Learn about Cortex AgentiX | 11 | 2 | 9 | 82% |
| Reference | 4 | 2 | 2 | 50% |

The survivors are product-specific intro and onboarding content — everything
else exists in higher-priority products.

## Architecture

### New script: `scripts/compute_ownership.js`

A standalone step that computes global topic ownership and writes a manifest.

**Exported pure function:** `computeOwnership(tocsByProduct, hierarchy)`

Parameters:
- `tocsByProduct` — `{ cloud: [...flatEntries], xdr: [...], xsiam: [...], agentix: [...] }`
  Product keys map to map keys via the existing `PRODUCTS` config in `map_config.js`:
  `xdr` → `xdr_5`, `cloud` → `appsec + posture + runtime`, `xsiam` → `xsiam_3`,
  `agentix` → `agentix`. The Cloud entry is the union of all 3 Cloud map TOCs,
  deduplicated by contentId (first occurrence wins — title and depth come from the
  first map that contains the contentId). Duplicate contentIds within a single
  product's merged TOC are collapsed to a single entry for ownership purposes.
- `hierarchy` — `["xdr", "cloud", "xsiam", "agentix"]` (priority order)

Returns: `{ owned, titleMatched, stats }`

**Algorithm:**

```
claimed      = Map<contentId, owningProduct>
claimedTitles = Map<normalizedTitle, { product, contentId }>

For each product in hierarchy order:
  Merge all maps for this product into one flat array
  Deduplicate by contentId (keep first occurrence)

  For each unique contentId in this product's merged TOC:
    normalizedTitle = normalize(title)

    If contentId in claimed → skip (exact match to higher-priority product)
    Else if normalizedTitle in claimedTitles → skip, record in titleMatched
    Else → add to claimed and claimedTitles, assign to this product
```

Title normalization: `title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()`

This is intentionally more aggressive than the Cloud-internal title matching
in `computeBuckets()`, which uses exact string equality. Global dedup normalizes
because cross-product titles often differ only in casing or punctuation. The two
matching strategies do not conflict — global dedup runs first and removes
cross-product duplicates; Cloud-internal dedup runs second on the reduced set
using its own exact matching.

**Note on generic titles:** Titles like "Overview" appear in multiple unrelated
products. The highest-priority product claims the title, and lower-priority
products with the same title get dropped. This is intentionally aggressive —
a topic titled "Overview" in Agentix that also exists in XDR is assumed to be
the same content. If this proves too aggressive in practice, a future iteration
can scope title matching by TOC subtree or content similarity.

### Manifest: `metadata/ownership.json`

```json
{
  "meta": {
    "generatedAt": "2026-03-20T...",
    "hierarchy": ["xdr", "cloud", "xsiam", "agentix"]
  },
  "owned": {
    "xdr": ["contentId1", "contentId2", ...],
    "cloud": ["contentId3", "contentId4", ...],
    "xsiam": ["contentId5", ...],
    "agentix": ["contentId6", ...]
  },
  "titleMatched": {
    "lowerContentId": { "ownedBy": "xdr", "ownerContentId": "higherContentId" },
    ...
  },
  "stats": {
    "xdr":     { "total": 1108, "owned": 1108, "droppedById": 0, "droppedByTitle": 0 },
    "cloud":   { "total": 1365, "owned": "~980", "droppedById": "~378", "droppedByTitle": "~7" },
    "xsiam":   { "total": 1594, "owned": "~500", "droppedById": "~668", "droppedByTitle": "~426" },
    "agentix": { "total": 551,  "owned": "~45",  "droppedById": "~42",  "droppedByTitle": "~464" }
  }
}
```

Stats values for non-XDR products are approximate (indicated with `~` in the
example). The exact numbers depend on the live TOC state at computation time.
The Cloud `droppedById` count reflects contentIds shared between XDR and any
of the 3 Cloud maps (appsec, posture, runtime). Every Posture-XDR overlap is
a subset of Runtime-XDR overlap (since Posture's contentId set is largely a
subset of Runtime's), so the count roughly equals the XDR-Runtime overlap.

The `titleMatched` map is diagnostic/informational — it records which
lower-priority contentId was dropped and which higher-priority contentId it
matched to. The combine step does not use `titleMatched` for file resolution.
Dropped topics simply do not appear in the lower-priority product's output.

### Integration with `generate_combined.js`

The combine step changes minimally:

1. Read `metadata/ownership.json` at startup. Fail with a clear error if missing:
   `"Error: metadata/ownership.json not found — run npm run ownership first"`
2. **Cloud maps (appsec, posture, runtime):** Before calling `computeBuckets()`,
   filter all 3 TOCs to only include contentIds in `owned.cloud`. The existing
   PRA/PR/R/P/A internal split runs unchanged on the reduced set.
3. **XDR, XSIAM, Agentix:** Filter each map's TOC to only include contentIds in
   that product's `owned` set. These maps remain in the existing "simple map"
   code path — the only change is a pre-filter on the TOC before combining.
   Manifest keys map to map keys via `PRODUCTS` in `map_config.js`:
   `owned.xdr` filters `xdr_5`, `owned.xsiam` filters `xsiam_3`,
   `owned.agentix` filters `agentix`.
4. **Gateway, XDR Compatibility:** Unchanged. Straight TOC combine, no filtering.

`computeBuckets()` is not modified. It still receives 3 Cloud TOCs and produces
PRA/PR/R/P/A buckets — but the input TOCs have been pre-filtered by global
ownership.

### Pipeline integration

**New npm script:**

```json
"ownership": "node scripts/compute_ownership.js"
```

**Pipeline order:**

```
npm run ownership  ─┐
                    ├→  npm run fix (fixes + combined files)
npm run fetch      ─┘
```

`ownership` and `fetch` are independent and can run in parallel. The strict
dependency is: **both `ownership` and `fetch` must complete before `fix`** (which
calls `combine`, which reads `ownership.json` and the fetched files).

`ownership` always fetches fresh TOCs from the Fluid Topics API using the same
`fetch()` and `flattenToc()` helpers already in `generate_combined.js`. It does
not read from cached snapshots in `metadata/*.json` — ownership must reflect the
live state of all TOCs. The TOC fetches are lightweight (small JSON payloads,
no content downloads).

`compute_ownership.js` always processes all dedup maps — a `--product` flag
would not make sense since ownership requires the full cross-product picture.

**`check --apply` integration:**

When `check` detects TOC changes for any product, the `--apply` flow:

1. Runs `npm run ownership` once globally (re-fetches all TOCs, recomputes
   manifest). This runs even if only one product changed, because ownership
   of topics can shift when any product's TOC changes.
2. For each changed product: runs `npm run fetch:{product} && npm run fix:{product}`
   as today.

This means a XSIAM-only TOC change still triggers a full ownership recompute,
but only XSIAM's content is re-fetched and re-combined.

**Logging:** `compute_ownership.js` prints a per-product summary to stdout:
```
[ownership] xdr:     1108 total, 1108 owned,    0 droppedById,   0 droppedByTitle
[ownership] cloud:   1365 total,  980 owned,  378 droppedById,   7 droppedByTitle
[ownership] xsiam:   1594 total,  500 owned,  668 droppedById, 426 droppedByTitle
[ownership] agentix:  551 total,   45 owned,   42 droppedById, 464 droppedByTitle
```

### Configuration in `map_config.js`

Add two constants:

```js
// Product keys — same keys used in PRODUCTS
const DEDUP_HIERARCHY = ["xdr", "cloud", "xsiam", "agentix"];

// Map keys — specific maps excluded from the dedup hierarchy
const DEDUP_EXCLUDED = ["cortex_gateway", "xdr_compatibility"];
```

`DEDUP_HIERARCHY` uses product keys (matching `PRODUCTS` in `map_config.js`).
For the XDR product, only `xdr_5` feeds into the ownership algorithm;
`xdr_compatibility` is listed in `DEDUP_EXCLUDED` (a map-key list) and is
processed as a simple map with no filtering.

`compute_ownership.js` and `generate_combined.js` import these instead of
hardcoding the priority chain.

## Expected Output Sizes

| Product | Before dedup | After dedup | Reduction |
|---------|-------------|-------------|-----------|
| XDR 5 | 1,108 | ~1,108 | 0% (highest priority) |
| Cloud (appsec+posture+runtime) | ~1,365 | ~980 | ~28% |
| XSIAM 3 | 1,594 | ~500 | ~69% |
| Agentix | 551 | ~45 | ~92% |
| Gateway | 13 | 13 | 0% (excluded) |
| XDR Compatibility | 9 | 9 | 0% (excluded) |
| **Total unique** | **4,640** | **~2,655** | **~43%** |

## Testing

### New: `scripts/compute_ownership.test.js`

Pure-function tests for `computeOwnership()` using fixture TOC arrays:

**Ownership priority:**
- Topic in XDR and Cloud → XDR owns it
- Topic in Cloud and XSIAM → Cloud owns it
- Topic in XDR and XSIAM → XDR owns it
- Topic in XDR, Cloud, and XSIAM → XDR owns it
- Topic only in Agentix → Agentix owns it

**Title-match dedup:**
- Same normalized title in Cloud and XDR with different contentIds → XDR owns it
- Same title in XDR and XSIAM → XDR owns it
- Same title in Cloud and XSIAM → Cloud owns it
- Title normalization handles case, punctuation, whitespace

**Edge cases:**
- Generic title "Overview" appearing in 4+ maps → highest-priority product claims
  it; lower-priority products with genuinely different "Overview" pages lose them
  (intentionally aggressive — see note in Architecture section)
- Topic with no title match and unique contentId → stays in its product
- Empty TOC for a product → no crash, other products unaffected
- Cloud sub-map merging: contentId in appsec + posture + runtime counts as a
  single Cloud entry (not triple-counted)
- Duplicate contentIds within a single product's TOC do not cause double-counting
- Hierarchy with fewer than 4 products (e.g., `["xdr", "cloud"]`) works correctly
  — algorithm is not hardcoded to exactly 4 products

### Updated: `scripts/generate_combined.test.js`

- Combine step skips contentIds not in ownership manifest
- Combine step fails with clear error when `ownership.json` is missing
- `computeBuckets()` produces correct results on pre-filtered TOCs
- Existing `computeBuckets()` and `promoteKeywordsToHeadings()` tests unchanged

## Files Changed

| File | Change |
|------|--------|
| `scripts/compute_ownership.js` | **New.** Global ownership computation + manifest writer |
| `scripts/compute_ownership.test.js` | **New.** Pure-function tests for ownership algorithm |
| `scripts/generate_combined.js` | Read ownership manifest, pre-filter TOCs before dedup/combine |
| `scripts/generate_combined.test.js` | Add ownership integration tests |
| `scripts/map_config.js` | Add `DEDUP_HIERARCHY` and `DEDUP_EXCLUDED` constants |
| `scripts/check.js` | Run `ownership` before `fetch + fix` in `--apply` flow |
| `package.json` | Add `"ownership"` npm script |

No changes to: fetch logic, fix scripts, snapshot script, audit scripts, split
script, Gateway processing, XDR Compatibility processing.
