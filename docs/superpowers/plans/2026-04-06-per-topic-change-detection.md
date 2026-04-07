# Per-Topic Change Detection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Detect individual topic content changes that don't trigger a map republication, so daily checks keep Vertex AI Search documentation current.

**Architecture:** Add `fetchTopicMeta` to `snapshot.js` to fetch per-topic `ft:lastTechChangeTimestamp`. Extend `check.js` to compare these timestamps for every topic (Phase 2), alongside the existing map-level `lastPublication` check (Phase 1). Bump snapshot schema to v2 with the new field.

**Tech Stack:** Node.js, node:test, node:assert/strict, Fluid Topics REST API

---

### Task 1: Add `fetchTopicMeta` to snapshot.js

**Files:**
- Test: `scripts/snapshot.test.js`
- Modify: `scripts/snapshot.js:43-47` (near `fetchMapMeta`), `scripts/snapshot.js:114` (module.exports)

- [ ] **Step 1: Write the failing test for `fetchTopicMeta`**

Add to `scripts/snapshot.test.js`:

```js
const { describe, it, mock } = require("node:test");
const assert = require("node:assert/strict");
const { flattenToc, parseTopicMeta } = require("./snapshot.js");
```

Replace the existing `require` line and add a new describe block after the `flattenToc` tests:

```js
describe("parseTopicMeta", () => {
  it("extracts lastTechChangeTimestamp from metadata array", () => {
    const apiResponse = {
      title: "Some Topic",
      id: "abc123",
      metadata: [
        { key: "ft:title", values: ["Some Topic"] },
        { key: "ft:lastTechChangeTimestamp", values: ["1773659738129"] },
        { key: "ft:lastEdition", values: ["2026-01-25"] },
      ],
    };
    const result = parseTopicMeta(apiResponse);
    assert.deepEqual(result, { lastTechChangeTimestamp: "1773659738129" });
  });

  it("returns null timestamp when key is missing from metadata", () => {
    const apiResponse = {
      title: "Some Topic",
      id: "abc123",
      metadata: [
        { key: "ft:title", values: ["Some Topic"] },
      ],
    };
    const result = parseTopicMeta(apiResponse);
    assert.deepEqual(result, { lastTechChangeTimestamp: null });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/snapshot.test.js`
Expected: FAIL — `parseTopicMeta` is not exported / not a function.

- [ ] **Step 3: Write `parseTopicMeta` and `fetchTopicMeta` in snapshot.js**

Add after the `fetchMapToc` function (around line 53):

```js
function parseTopicMeta(data) {
  const entry = data.metadata.find((m) => m.key === "ft:lastTechChangeTimestamp");
  return { lastTechChangeTimestamp: entry ? entry.values[0] : null };
}

async function fetchTopicMeta(mapId, contentId) {
  const body = await httpGet(`/api/khub/maps/${mapId}/topics/${contentId}`);
  return parseTopicMeta(JSON.parse(body));
}
```

Update `module.exports` to include both new functions:

```js
module.exports = {
  flattenToc,
  httpGet,
  fetchMapMeta,
  fetchMapToc,
  parseTopicMeta,
  fetchTopicMeta,
  readSnapshot,
  writeSnapshot,
  snapshotProduct,
  METADATA_DIR,
  SNAPSHOT_VERSION,
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/snapshot.test.js`
Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/snapshot.js scripts/snapshot.test.js
git commit -m "feat(snapshot): add parseTopicMeta and fetchTopicMeta for per-topic timestamps"
```

---

### Task 2: Bump snapshot version and store per-topic timestamps

**Files:**
- Modify: `scripts/snapshot.js:8` (`SNAPSHOT_VERSION`), `scripts/snapshot.js:71-98` (`snapshotProduct`)

- [ ] **Step 1: Bump `SNAPSHOT_VERSION` to 2**

In `scripts/snapshot.js`, change line 8:

```js
const SNAPSHOT_VERSION = 2;
```

- [ ] **Step 2: Update `snapshotProduct` to fetch per-topic metadata**

Replace the `snapshotProduct` function with:

```js
async function snapshotProduct(product) {
  const mapNames = PRODUCTS[product];
  const maps = {};

  for (const mapName of mapNames) {
    const mapId = MAP_IDS[mapName];
    console.log(`  ${mapName}: fetching metadata...`);
    const meta = await fetchMapMeta(mapId);

    console.log(`  ${mapName}: fetching TOC...`);
    const topics = await fetchMapToc(mapId);

    console.log(`  ${mapName}: fetching per-topic timestamps (${topics.length} topics)...`);
    for (let i = 0; i < topics.length; i += 10) {
      const batch = topics.slice(i, i + 10);
      const results = await Promise.all(
        batch.map((t) => fetchTopicMeta(mapId, t.contentId))
      );
      for (let j = 0; j < batch.length; j++) {
        batch[j].lastTechChangeTimestamp = results[j].lastTechChangeTimestamp;
      }
      if (i + 10 < topics.length) await new Promise((r) => setTimeout(r, 200));
    }

    maps[mapName] = {
      mapId,
      lastPublication: meta.lastPublication,
      topicCount: topics.length,
      topics,
    };
    console.log(`  ${mapName}: ${topics.length} topics`);
  }

  return {
    version: SNAPSHOT_VERSION,
    product,
    lastChecked: new Date().toISOString(),
    maps,
  };
}
```

- [ ] **Step 3: Run existing tests to verify nothing breaks**

Run: `node --test scripts/snapshot.test.js`
Expected: all tests PASS (snapshot version bump doesn't affect `flattenToc` or `parseTopicMeta` tests).

- [ ] **Step 4: Commit**

```bash
git add scripts/snapshot.js
git commit -m "feat(snapshot): bump to v2, fetch per-topic lastTechChangeTimestamp during snapshot"
```

---

### Task 3: Extend `formatTextReport` for `topicsUpdated`

**Files:**
- Test: `scripts/check.test.js`
- Modify: `scripts/check.js:24-69` (`formatTextReport`)

- [ ] **Step 1: Write failing tests for `topicsUpdated` in `formatTextReport`**

Add these test cases inside the existing `describe("formatTextReport", ...)` block in `scripts/check.test.js`:

```js
  it("shows topic update count for a map with only topic updates", () => {
    const report = {
      timestamp: "2026-04-06T08:00:00.000Z",
      products: {
        cloud: {
          changed: true,
          maps: {
            runtime: { republished: false, added: 0, removed: 0, reordered: false, topicsUpdated: 3 },
          },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("[cloud] changed"));
    assert.ok(text.includes("runtime: 3 topics updated"));
  });

  it("shows both TOC diff and topic updates when map has both", () => {
    const report = {
      timestamp: "2026-04-06T08:00:00.000Z",
      products: {
        gateway: {
          changed: true,
          maps: {
            cortex_gateway: { republished: true, added: 2, removed: 0, reordered: false, topicsUpdated: 5 },
          },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("cortex_gateway: 2 added, 0 removed, 5 topics updated"));
  });

  it("shows no changes for a map with zero topicsUpdated and no republication", () => {
    const report = {
      timestamp: "2026-04-06T08:00:00.000Z",
      products: {
        xdr: {
          changed: false,
          maps: {
            xdr_5: { republished: false, added: 0, removed: 0, reordered: false, topicsUpdated: 0 },
          },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("[xdr] no changes"));
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test scripts/check.test.js`
Expected: the new "topic update count" and "both TOC diff and topic updates" tests FAIL — `formatTextReport` doesn't produce the expected output yet.

- [ ] **Step 3: Update `formatTextReport` in check.js**

Replace the `formatTextReport` function (lines 24-69) with:

```js
function formatTextReport(report) {
  const lines = [];
  let changedCount = 0;

  for (const [product, data] of Object.entries(report.products)) {
    const hasErrors = Object.values(data.maps).some((m) => m.error);

    if (!data.changed && !hasErrors) {
      lines.push(`[${product}] no changes`);
      continue;
    }

    if (data.changed) {
      changedCount++;
      lines.push(`[${product}] changed`);
    } else {
      lines.push(`[${product}] no changes`);
    }

    for (const [mapName, mapData] of Object.entries(data.maps)) {
      if (mapData.error) {
        lines.push(`  ${mapName}: error — ${mapData.message}`);
        continue;
      }
      if (!data.changed) continue;

      const parts = [];
      if (mapData.republished) {
        if (mapData.added > 0 || mapData.removed > 0) {
          parts.push(`${mapData.added} added, ${mapData.removed} removed`);
        }
        if (mapData.reordered) parts.push("reordered");
      }
      if (mapData.topicsUpdated > 0) {
        parts.push(`${mapData.topicsUpdated} topics updated`);
      }
      if (mapData.republished && parts.length === 0) {
        parts.push("no TOC changes");
      }
      if (parts.length === 0) {
        lines.push(`  ${mapName}: no changes`);
      } else {
        lines.push(`  ${mapName}: ${parts.join(", ")}`);
      }
    }
  }

  lines.push("");
  if (changedCount > 0) {
    const noun = changedCount === 1 ? "product" : "products";
    lines.push(`${changedCount} ${noun} need re-fetch. Run with --apply to update.`);
  } else {
    lines.push("All products up to date.");
  }

  return lines.join("\n");
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test scripts/check.test.js`
Expected: all tests PASS, including the existing ones.

- [ ] **Step 5: Commit**

```bash
git add scripts/check.js scripts/check.test.js
git commit -m "feat(check): extend formatTextReport to show per-topic update counts"
```

---

### Task 4: Add per-topic change detection to `checkProduct`

**Files:**
- Modify: `scripts/check.js:1-4` (imports), `scripts/check.js:79-122` (`checkProduct`), `scripts/check.js:143-159` (snapshot update)

- [ ] **Step 1: Update imports in check.js**

Replace line 4:

```js
const { fetchMapMeta, fetchMapToc, readSnapshot, writeSnapshot, SNAPSHOT_VERSION } = require("./snapshot.js");
```

With:

```js
const { fetchMapMeta, fetchMapToc, fetchTopicMeta, readSnapshot, writeSnapshot, SNAPSHOT_VERSION } = require("./snapshot.js");
```

- [ ] **Step 2: Add `checkTopicTimestamps` function**

Add before the `checkProduct` function:

```js
async function checkTopicTimestamps(mapId, snapshotTopics) {
  let updatedCount = 0;
  const freshTimestamps = {};

  for (let i = 0; i < snapshotTopics.length; i += 10) {
    const batch = snapshotTopics.slice(i, i + 10);
    const results = await Promise.all(
      batch.map((t) => fetchTopicMeta(mapId, t.contentId))
    );
    for (let j = 0; j < batch.length; j++) {
      const topic = batch[j];
      const fresh = results[j].lastTechChangeTimestamp;
      freshTimestamps[topic.contentId] = fresh;
      if (!topic.lastTechChangeTimestamp || topic.lastTechChangeTimestamp !== fresh) {
        updatedCount++;
      }
    }
    if (i + 10 < snapshotTopics.length) await new Promise((r) => setTimeout(r, 200));
  }

  return { updatedCount, freshTimestamps };
}
```

- [ ] **Step 3: Update `checkProduct` to call `checkTopicTimestamps`**

Replace the `checkProduct` function with:

```js
async function checkProduct(product, snapshot) {
  const mapNames = PRODUCTS[product];
  const result = { changed: false, maps: {} };
  const freshData = {};

  for (const mapName of mapNames) {
    const mapId = MAP_IDS[mapName];
    try {
      if (!snapshot.maps[mapName]) {
        throw new Error(`map "${mapName}" not in snapshot — run: npm run snapshot:${product}`);
      }

      const meta = await fetchMapMeta(mapId);
      const snapshotTopics = snapshot.maps[mapName].topics;

      let republished = false;
      let diff = { added: [], removed: [], reordered: false };
      let newTopics = null;

      if (meta.lastPublication !== snapshot.maps[mapName].lastPublication) {
        republished = true;
        newTopics = await fetchMapToc(mapId);
        diff = diffTopics(snapshotTopics, newTopics);
      }

      console.log(`  ${mapName}: checking ${snapshotTopics.length} topics for updates...`);
      const { updatedCount, freshTimestamps } = await checkTopicTimestamps(mapId, snapshotTopics);

      const mapChanged = republished || updatedCount > 0;
      result.maps[mapName] = {
        republished,
        added: diff.added.length,
        removed: diff.removed.length,
        reordered: diff.reordered,
        topicsUpdated: updatedCount,
      };

      if (mapChanged) {
        result.changed = true;
        const topicsForSnapshot = (newTopics || snapshotTopics).map((t) => ({
          ...t,
          lastTechChangeTimestamp: freshTimestamps[t.contentId] || t.lastTechChangeTimestamp || null,
        }));
        freshData[mapName] = {
          mapId,
          lastPublication: meta.lastPublication,
          topicCount: topicsForSnapshot.length,
          topics: topicsForSnapshot,
        };
      }
    } catch (err) {
      console.error(`Error checking ${mapName}: ${err.message}`);
      result.maps[mapName] = { error: true, message: err.message };
    }
  }

  return { result, freshData };
}
```

- [ ] **Step 4: Run all tests to verify nothing breaks**

Run: `node --test scripts/check.test.js scripts/snapshot.test.js`
Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/check.js
git commit -m "feat(check): add per-topic timestamp comparison in checkProduct"
```

---

### Task 5: Verify existing `formatTextReport` tests still pass with new field

**Files:**
- Test: `scripts/check.test.js`

The existing `formatTextReport` tests don't include `topicsUpdated` in their report data. This task verifies backward compatibility — maps without `topicsUpdated` (or with `topicsUpdated: 0`) should produce the same output as before.

- [ ] **Step 1: Run the full test suite**

Run: `node --test scripts/check.test.js scripts/snapshot.test.js`
Expected: all tests PASS. The existing tests for `formatTextReport` that omit `topicsUpdated` should still work because `undefined > 0` is `false`, so the new branch is not entered.

- [ ] **Step 2: Run the complete project test suite**

Run: `npm test`
Expected: all tests PASS across all test files.

- [ ] **Step 3: Commit (no changes expected — verification only)**

No commit needed if all tests pass. If any test needed fixing, commit the fix.
