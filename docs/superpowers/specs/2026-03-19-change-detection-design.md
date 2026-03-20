# Change Detection for FluidTopics Documentation

## Problem

The fetch-cortex-docs pipeline downloads documentation from 8 FluidTopics maps across 5 products. Every run is a full fetch — there is no way to know if content changed since the last run. This wastes time and API calls when nothing changed, and provides no visibility into what changed when something did.

## Goal

Build a change detection system that:
1. Snapshots metadata from the FluidTopics API after each fetch
2. Checks the API daily (via external scheduler) to detect changes
3. Reports what changed (added/removed topics, republished maps)
4. Optionally triggers a full re-fetch for affected products

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Where detection logic lives | CLI script in this repo (`npm run check`) | Keeps logic colocated with pipeline; any scheduler (n8n, cron, Cloud Scheduler) can invoke it |
| Report vs auto-fetch | Report by default, `--apply` flag triggers fetch | Observability first; automation opt-in |
| Fetch granularity on apply | Full product re-fetch | Incremental fetch has edge cases (renumbering, partial fix runs) not worth solving until detection is proven |
| Report format | JSON to stdout; `--format text` for human-readable | Machine-readable by default for n8n consumption |
| Auto-commit | No | Script writes files to disk only; committing is the orchestrator's concern |
| Cortex Cloud handling | Treat as single product | If any of the 3 Cloud maps changed, re-fetch all of Cloud. Matches how the pipeline already works |
| API call strategy | Map-level gate + TOC diff (no per-topic metadata) | Max ~16 API calls even when everything changed. Per-topic metadata adds 1000+ calls with no practical benefit since `--apply` does a full re-fetch |

## API Observations

Based on empirical testing of the FluidTopics API:

- **`ft:lastPublication`** (map-level and topic-level): Timestamp of the map publish event. Identical across all topics in a map. Changes whenever the map is republished, regardless of whether content changed. Reliable gate for "something happened."
- **`ft:lastTechChange`** (topic-level): Same value for all topics — reflects the publish event, not individual edits. Not useful for per-topic change detection.
- **`ft:lastEdition`** (topic-level): Actual editorial edit date. Varies per topic. Would require N API calls to check. Not used in this design since we do full re-fetch anyway.
- **TOC endpoint** (`/api/khub/maps/{mapId}/toc`): Returns full topic tree with `contentId`, `tocId`, `title`, `prettyUrl`, `depth`. No timestamps. Structural diff detects added/removed/reordered topics.
- **Map metadata endpoint** (`/api/khub/maps/{mapId}`): Returns `ft:lastPublication`, `ft:lastEdition`, `creationDate`, and other fields. 1 API call per map.

## Snapshot File Structure

Snapshots are stored in `metadata/{product}.json` and committed to the repo. Expected total size across all products is ~200-400KB (8 maps, up to ~1,600 topics each with 4 fields). Each snapshot includes a schema version for future migration safety.

### Cloud snapshot (`metadata/cloud.json`)

```json
{
  "version": 1,
  "product": "cloud",
  "lastChecked": "2026-03-19T20:12:54.000Z",
  "maps": {
    "runtime": {
      "mapId": "bKDBlplrokDJKA~h8O9o6A",
      "lastPublication": "2026-03-19T12:38:20.302872",
      "topicCount": 1417,
      "topics": [
        { "contentId": "TfStW3ais7glXqc3~ZnyLA", "tocId": "1riWWR05R1ANt~4ysqEhRw", "title": "Get started with Cortex Cloud", "depth": 0 }
      ]
    },
    "posture": {
      "mapId": "BNCvOg6pEdBp~axnn92pBQ",
      "lastPublication": "...",
      "topicCount": 1093,
      "topics": [...]
    },
    "appsec": {
      "mapId": "aUsxSwBeRrRs3Jm36XHckg",
      "lastPublication": "...",
      "topicCount": 218,
      "topics": [...]
    }
  }
}
```

### Simple product snapshot (`metadata/xdr.json`)

```json
{
  "version": 1,
  "product": "xdr",
  "lastChecked": "2026-03-19T20:12:54.000Z",
  "maps": {
    "xdr_5": {
      "mapId": "GD6sG6FlxDWxAn13_eZuUQ",
      "lastPublication": "2026-03-18T10:00:00.000000",
      "topicCount": 1144,
      "topics": [...]
    },
    "xdr_compatibility": {
      "mapId": "8lDOhBUPTpk2LO5DciMLSQ",
      "lastPublication": "2026-03-04T...",
      "topicCount": 9,
      "topics": [...]
    }
  }
}
```

The `topics` array preserves TOC order so structural reordering is detectable by comparing arrays.

## Check Script (`scripts/check.js`)

### CLI interface

```
node scripts/check.js [--product <name>] [--apply] [--format json|text]
```

- No flags: checks all products, JSON output
- `--product cloud`: checks only cloud
- `--apply`: after detecting changes, runs `fetch:{product}` + `fix:{product}` for affected products
- `--format text`: human-readable output

### Product iteration

The check and snapshot scripts iterate over **products** (from `PRODUCTS` in `map_config.js`), not individual maps. They use `parseProductFlag()` to resolve which products to check, then iterate each product's map list from `PRODUCTS[productName]`. They do NOT use `resolveTargetMaps()` (which returns a flat map array).

### Logic flow

```
1. Parse flags: --product, --apply, --format
2. Resolve target products via parseProductFlag()
   - If --product given: [that product]
   - If no flag: all products (Object.keys(PRODUCTS))
3. For each product:
   a. Load metadata/{product}.json
      - If missing: report "no snapshot — run npm run snapshot[:{product}] first", skip
   b. For each map in PRODUCTS[product]:
      - Fetch map metadata from API (1 call) → extract ft:lastPublication
      - Compare against stored lastPublication
      - If unchanged → mark as "no changes", skip to next map
      - If changed → fetch TOC from API (1 more call)
        - Diff stored topics vs new topics:
          - added: contentIds in new TOC not in stored
          - removed: contentIds in stored not in new TOC
          - reordered: computed on the INTERSECTION of old and new contentIds only
            (ignoring additions and removals); true if relative order differs
        - Mark as "republished" with diff details
   c. Determine product-level changed flag:
      - true if ANY map in the product changed
4. If --apply is NOT set: write updated snapshots to metadata/{product}.json
   (When --apply IS set, skip — fix.js calls snapshot.js at the end of the
   pipeline, which will write fresher data anyway)
5. Output report
6. If --apply and any products changed:
   - For each changed product, exec: npm run fetch:{product} && npm run fix:{product}
   - fix.js already calls snapshot.js at the end, so snapshots auto-update
     after a successful re-fetch
7. Exit code: 0 = success (check completed, changes or not),
              nonzero = error (network failure, missing snapshot, etc.)
   The changed/unchanged status is communicated via the JSON output, not exit codes.
   This avoids confusing CI systems that treat nonzero exits as failures.
```

### Text output example

```
[cloud] republished (2026-03-19 → 2026-03-20)
  runtime: 2 added, 1 removed
  posture: no TOC changes
  appsec: no TOC changes
[xdr] no changes
[xsiam] no changes
[gateway] republished (2026-03-15 → 2026-03-19)
  cortex_gateway: 1 added, 0 removed
[agentix] no changes

2 products need re-fetch. Run with --apply to update.
```

### JSON output example

The JSON schema is consistent: every product always includes a `maps` object, even when unchanged. This avoids consumers needing to check for the existence of `maps` before accessing it.

```json
{
  "timestamp": "2026-03-20T08:00:00.000Z",
  "products": {
    "cloud": {
      "changed": true,
      "maps": {
        "runtime": { "republished": true, "added": 2, "removed": 1, "reordered": false },
        "posture": { "republished": true, "added": 0, "removed": 0, "reordered": false },
        "appsec": { "republished": true, "added": 0, "removed": 0, "reordered": false }
      }
    },
    "xdr": {
      "changed": false,
      "maps": {
        "xdr_5": { "republished": false, "added": 0, "removed": 0, "reordered": false },
        "xdr_compatibility": { "republished": false, "added": 0, "removed": 0, "reordered": false }
      }
    },
    "xsiam": {
      "changed": false,
      "maps": {
        "xsiam_3": { "republished": false, "added": 0, "removed": 0, "reordered": false }
      }
    },
    "gateway": {
      "changed": true,
      "maps": {
        "cortex_gateway": { "republished": true, "added": 1, "removed": 0, "reordered": false }
      }
    },
    "agentix": {
      "changed": false,
      "maps": {
        "agentix": { "republished": false, "added": 0, "removed": 0, "reordered": false }
      }
    }
  }
}
```

## Snapshot Script (`scripts/snapshot.js`)

### CLI interface

```
node scripts/snapshot.js [--product <name>]
```

### Logic flow

```
1. Parse --product flag, resolve target products
2. For each product:
   a. For each map in the product:
      - Fetch map metadata from API → extract ft:lastPublication
      - Fetch TOC from API → flatten to topic list
   b. Write metadata/{product}.json
3. Report what was snapshotted
```

### When it runs

- **Standalone**: `npm run snapshot` or `npm run snapshot:{product}` to bootstrap
- **End of fix pipeline**: `fix.js` calls `snapshot.js` after fetch + fix + combine completes, keeping snapshots current after every pipeline run

## Changes to Existing Files

### `scripts/fix.js`

Add snapshot call at the end of the pipeline, after combine completes:

```javascript
// After combine succeeds...
console.log("\n=== Updating metadata snapshots ===\n");
execSync(`node scripts/snapshot.js${productArgs}`, { ... });
```

### `package.json`

Add new scripts:

```json
"check": "node scripts/check.js",
"check:cloud": "node scripts/check.js --product cloud",
"check:xdr": "node scripts/check.js --product xdr",
"check:xsiam": "node scripts/check.js --product xsiam",
"check:gateway": "node scripts/check.js --product gateway",
"check:agentix": "node scripts/check.js --product agentix",
"snapshot": "node scripts/snapshot.js",
"snapshot:cloud": "node scripts/snapshot.js --product cloud",
"snapshot:xdr": "node scripts/snapshot.js --product xdr",
"snapshot:xsiam": "node scripts/snapshot.js --product xsiam",
"snapshot:gateway": "node scripts/snapshot.js --product gateway",
"snapshot:agentix": "node scripts/snapshot.js --product agentix"
```

## Files Created / Modified

| File | Action | Purpose |
|------|--------|---------|
| `scripts/check.js` | Create | Change detection: compare API vs stored snapshots |
| `scripts/snapshot.js` | Create | Fetch metadata + TOC, write snapshot JSON |
| `metadata/` | Create | Directory for snapshot files |
| `scripts/fix.js` | Modify | Call snapshot.js at end of pipeline |
| `scripts/map_config.js` | Modify | Export `parseProductFlag` |
| `package.json` | Modify | Add check and snapshot npm scripts |

### `scripts/map_config.js`

Add `parseProductFlag` to the module exports (it is currently defined but only used internally by `resolveTargetMaps()`):

```javascript
module.exports = { MAP_IDS, COMBINED_FILES, PRODUCTS, VALID_MAPS, VALID_PRODUCTS, parseMapFlag, parseProductFlag, resolveTargetMaps };
```

## Not Modified

- `scripts/fetch_fluidtopics.js` — check/snapshot are separate concerns
- `scripts/generate_combined.js` — no changes
- Fix scripts — no changes

## Error Handling

If the FluidTopics API is unreachable or returns an error for a specific map:
- Log the error for that map
- Mark the map as `"error": true` in the report (skip the diff)
- Continue checking remaining maps/products
- Exit with nonzero code after completing all checks

## Dependencies

None. All API calls use the existing `https` module pattern. No new npm packages.

## API Call Budget

| Scenario | Calls |
|----------|-------|
| Daily check, nothing changed | 8 (one map metadata per map) |
| Daily check, 1 product changed | 8 + N maps in product (e.g., 8 + 3 = 11 for Cloud) |
| Daily check, everything changed | 8 + 8 = 16 |
| Snapshot (all products) | 8 map metadata + 8 TOC = 16 |
