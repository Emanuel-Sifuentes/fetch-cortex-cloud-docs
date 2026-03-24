# Remove Global Cross-Product Deduplication

**Date:** 2026-03-23
**Status:** Approved

## Summary

Remove the global cross-product deduplication feature (ownership hierarchy: XDR > Cloud > XSIAM > Agentix) from the pipeline. Deduplication will instead be handled downstream at the RAG query layer via metadata tagging and metadata-based filter querying.

The Cortex Cloud-internal deduplication (bucketing across appsec/posture/runtime) is **kept** — it handles genuine content overlap where runtime is the canonical source.

A fork preserving the deduplication code exists as a point-in-time backup.

## Motivation

The global dedup aggressively filters topics from lower-priority products (e.g., Agentix loses ~92% of topics). Moving dedup to the query layer via metadata filtering is more flexible — each product retains its full TOC, and duplicates are resolved at query time rather than build time.

## Changes

### Files to Delete

| File | Purpose |
|------|---------|
| `scripts/compute_ownership.js` | Global ownership computation |
| `scripts/compute_ownership.test.js` | Ownership unit tests |
| `scripts/overlap_report.js` | Cross-product overlap CSV reports |
| `metadata/ownership.json` | Generated ownership manifest |

### `scripts/map_config.js`

- Remove `DEDUP_HIERARCHY` constant
- Remove `DEDUP_EXCLUDED` constant
- Remove both from `module.exports`

### `scripts/generate_combined.js`

**Remove:**
- `DEDUP_HIERARCHY` and `DEDUP_EXCLUDED` from require import
- Ownership manifest loading block (reading `ownership.json`, building `ownedByProduct` and `mapToProduct` lookups)
- `filterTocByOwnership` function
- Ownership pre-filtering on Cloud TOCs — `flattenToc` results feed directly into `computeBuckets`
- Ownership pre-filtering on simple maps — `flattenToc` result is used directly without filtering
- `filterTocByOwnership` from `module.exports`

**Keep unchanged:**
- Cloud bucketing logic (`computeBuckets`, `resolveFile`, `titleMatchToRuntime`, `buildTocMap`)
- Dedup/simple map split (Cloud maps use bucketing, simple maps use straight TOC combine)
- All heading shifting, keyword promotion, frontmatter stripping
- `promoteKeywordsToHeadings` export

**Net effect:** `generate_combined.js` becomes self-contained with no external manifest dependency. Cloud maps still get bucketed (PRA/PR/R/P/A). Simple maps get their full TOC.

### `scripts/generate_combined.test.js`

- Remove `filterTocByOwnership` from the require/import
- Remove the entire `filterTocByOwnership` describe block
- Keep all `promoteKeywordsToHeadings`, `computeBuckets`, and `resolveFile` tests

### `package.json`

- Remove the `"ownership"` script
- Remove `scripts/compute_ownership.test.js` from the `"test"` script

## What Stays

- **Cloud-internal dedup:** Bucketing logic (PRA/PR/R/P/A) for appsec/posture/runtime
- **Cloud fetch-time dedup:** In `fetch_fluidtopics.js`, runtime remains the canonical source; only posture-unique topics are fetched separately
- **`metadata/` directory:** Retained for other metadata (e.g., publishing change tracking)
