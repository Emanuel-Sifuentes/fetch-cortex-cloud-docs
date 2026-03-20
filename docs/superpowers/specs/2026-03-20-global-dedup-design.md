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
  where Cloud entries are the merged set of all 3 Cloud maps (appsec + posture + runtime)
- `hierarchy` — `["xdr", "cloud", "xsiam", "agentix"]` (priority order)

Returns: `{ owned, titleMatched, stats }`

**Algorithm:**

```
claimed      = Map<contentId, owningProduct>
claimedTitles = Map<normalizedTitle, { product, contentId }>

For each product in hierarchy order:
  For each unique contentId in this product's merged TOC:
    normalizedTitle = normalize(title)

    If contentId in claimed → skip (exact match to higher-priority product)
    Else if normalizedTitle in claimedTitles → skip, record in titleMatched
    Else → add to claimed and claimedTitles, assign to this product
```

Title normalization: `title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()`

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
    "cloud":   { "total": 1365, "owned": 980,  "droppedById": 378, "droppedByTitle": 7 },
    "xsiam":   { "total": 1594, "owned": 500,  "droppedById": 668, "droppedByTitle": 426 },
    "agentix": { "total": 551,  "owned": 45,   "droppedById": 42, "droppedByTitle": 464 }
  }
}
```

The `titleMatched` map records which lower-priority contentId maps to which
higher-priority contentId, enabling file resolution from the owning product's
fetched content.

### Integration with `generate_combined.js`

The combine step changes minimally:

1. Read `metadata/ownership.json` at startup. Fail with a clear error if missing:
   `"Error: metadata/ownership.json not found — run npm run ownership first"`
2. **Cloud maps (appsec, posture, runtime):** Before calling `computeBuckets()`,
   filter all 3 TOCs to only include contentIds in `owned.cloud`. The existing
   PRA/PR/R/P/A internal split runs unchanged on the reduced set.
3. **XDR, XSIAM, Agentix:** Filter each map's TOC to only include contentIds in
   that product's `owned` set. For title-matched topics, use the `titleMatched`
   map to resolve files from the owning product's directory. Then combine
   normally (same as current simple-map path).
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
npm run ownership    →  metadata/ownership.json
npm run fetch        →  sources_fetch/{product}/*.md
npm run fix          →  fixes + combined files (reads ownership.json)
```

`ownership` is lightweight (TOC fetches only, no content downloads) and runs
independently. `fix` (which calls `combine`) requires both fetched files and
`ownership.json`.

The `check --apply` flow runs `ownership` before `fetch + fix` to ensure the
manifest is fresh when TOC changes are detected.

`compute_ownership.js` always processes all dedup maps — a `--product` flag
would not make sense since ownership requires the full cross-product picture.

### Configuration in `map_config.js`

Add two constants:

```js
const DEDUP_HIERARCHY = ["xdr", "cloud", "xsiam", "agentix"];
const DEDUP_EXCLUDED = ["cortex_gateway", "xdr_compatibility"];
```

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
- Generic title "Overview" appearing in 4+ maps → highest-priority product claims it
- Topic with no title match and unique contentId → stays in its product
- Empty TOC for a product → no crash, other products unaffected

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
