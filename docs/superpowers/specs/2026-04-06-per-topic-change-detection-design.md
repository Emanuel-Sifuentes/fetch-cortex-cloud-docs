# Per-Topic Change Detection

## Problem

The current `check` script detects changes at the map level by comparing `ft:lastPublication` timestamps. Individual page edits do not trigger a map republication, so those changes go undetected. This means the documentation in Vertex AI Search can fall out of date.

## Solution

Extend the check system to fetch per-topic metadata and compare `ft:lastTechChangeTimestamp` for each topic. This detects individual page updates regardless of whether the map was republished.

## API Discovery

The per-topic metadata endpoint (`GET /api/khub/maps/{mapId}/topics/{contentId}`, `Accept: application/json`) returns a metadata array including:

| Field | Type | Description |
|---|---|---|
| `ft:lastTechChangeTimestamp` | string (epoch ms) | Updates when topic content changes |
| `ft:lastEdition` | string (date) | Last editorial change |
| `ft:lastPublication` | string (ISO datetime) | Per-topic publication timestamp |

`ft:lastTechChangeTimestamp` is the most precise and reliable indicator of content changes.

## Design

### Snapshot Schema (v2)

Bump `SNAPSHOT_VERSION` from 1 to 2. Each topic gains a `lastTechChangeTimestamp` field:

```json
{
  "version": 2,
  "product": "cloud",
  "lastChecked": "2026-04-06T...",
  "maps": {
    "runtime": {
      "mapId": "bKDBlplrokDJKA~h8O9o6A",
      "lastPublication": "2026-03-16T...",
      "topicCount": 800,
      "topics": [
        {
          "contentId": "abc",
          "tocId": "xyz",
          "title": "Configure alert rules",
          "depth": 1,
          "lastTechChangeTimestamp": "1773659738129"
        }
      ]
    }
  }
}
```

V1 snapshots are handled gracefully: topics missing `lastTechChangeTimestamp` are treated as "unknown, needs check", forcing a full per-topic metadata fetch on the first run after upgrade.

### New Function: `fetchTopicMeta`

Added to `snapshot.js`. Calls `/api/khub/maps/{mapId}/topics/{contentId}` and extracts `ft:lastTechChangeTimestamp` from the metadata array.

```js
async function fetchTopicMeta(mapId, contentId) {
  const body = await httpGet(`/api/khub/maps/${mapId}/topics/${contentId}`);
  const data = JSON.parse(body);
  const entry = data.metadata.find(m => m.key === "ft:lastTechChangeTimestamp");
  return { lastTechChangeTimestamp: entry ? entry.values[0] : null };
}
```

### Check Logic (Two-Phase)

For each map in a product:

**Phase 1 (existing):** Compare map-level `lastPublication`. If republished, run existing TOC diff (added/removed/reordered).

**Phase 2 (new):** Regardless of Phase 1 outcome, fetch per-topic metadata for all topics in the map. Compare each topic's `ft:lastTechChangeTimestamp` against the snapshot value. Count topics with newer timestamps.

A map is marked as changed if either phase detects changes.

Per-map result shape:

```js
{
  republished: false,
  added: 0,
  removed: 0,
  reordered: false,
  topicsUpdated: 3  // new field
}
```

Product is marked `changed: true` if any map has `republished: true` OR `topicsUpdated > 0`.

**Concurrency:** Topic metadata fetches use the same batch concurrency + delay pattern as `fetchTopic` in `fetch_fluidtopics.js` (10 concurrent requests, 200ms delay between batches).

**Snapshot update:** After checking, the snapshot is updated with fresh `lastTechChangeTimestamp` values (same as existing behavior that updates `lastPublication`).

### Report Output

Text format extends to show per-topic update counts:

```
[cloud] changed
  runtime: 3 topics updated
  posture: no TOC changes, 1 topic updated
  appsec: no changes
[xdr] no changes
[gateway] changed
  cortex_gateway: 2 added, 0 removed, 5 topics updated

2 products need re-fetch. Run with --apply to update.
```

Rules:
- Map with only topic updates (no republication): `N topics updated`
- Map with both republication and topic updates: existing TOC diff info + `N topics updated`
- Map with no changes: `no changes`
- JSON report includes `topicsUpdated` as a number in each map entry

The `--apply` behavior is unchanged: when a product is marked changed, runs `fetch:{product} && fix:{product}`.

### Scale

| Product | Topics | Estimated check time (10 concurrent) |
|---|---|---|
| cloud | 2,705 | ~5 min |
| xsiam | 1,629 | ~3 min |
| xdr | 1,160 | ~2 min |
| agentix | 551 | ~1 min |
| gateway | 13 | <1 sec |

Total: ~6,058 topics, ~11 min for a full run. Acceptable for daily execution.

### Testing

- **`formatTextReport` tests** (in `check.test.js`): new cases for `topicsUpdated` field — topic-only updates, combined republication + topic updates, zero updates
- **`fetchTopicMeta` test** (in `snapshot.test.js`): verify extraction of `ft:lastTechChangeTimestamp` from the API response shape
- **Existing tests**: `diffTopics` and existing `formatTextReport` tests remain unchanged
- **Integration**: `checkProduct` orchestration is not unit tested (same pattern as existing code — tested via pure helper functions)
