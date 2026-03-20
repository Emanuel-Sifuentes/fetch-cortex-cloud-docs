# Change Detection for FluidTopics Documentation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a change detection system that snapshots FluidTopics API metadata, detects documentation changes, and optionally triggers re-fetches for affected products.

**Architecture:** Two new scripts — `snapshot.js` captures API state (map metadata + TOC) to per-product JSON files, `check.js` compares stored snapshots to live API and outputs a change report. Both iterate products via `parseProductFlag()` from `map_config.js`. The fix pipeline (`fix.js`) calls `snapshot.js` at the end to keep snapshots current after every run.

**Tech Stack:** Node.js (CommonJS), `node:test` for testing, no new dependencies.

---

## File Structure

| File | Responsibility | Action |
|------|----------------|--------|
| `scripts/map_config.js` | Product/map config, CLI flag parsing | Modify — add `parseProductFlag` to exports |
| `scripts/snapshot.js` | Fetch map metadata + TOC from API, build/write/read snapshot JSON files | Create |
| `scripts/snapshot.test.js` | Tests for `flattenToc` (pure function from snapshot.js) | Create |
| `scripts/check.js` | Compare stored snapshots to live API, output change report (JSON/text) | Create |
| `scripts/check.test.js` | Tests for `diffTopics` and `formatTextReport` (pure functions from check.js) | Create |
| `scripts/fix.js` | Fix pipeline orchestrator | Modify — add snapshot call after combine completes |
| `package.json` | npm scripts, test command | Modify — add `check:*` and `snapshot:*` scripts, update `test` command |
| `metadata/` | Snapshot JSON files (one per product) | Created at runtime by `snapshot.js` |

---

## Task 1: Export `parseProductFlag` from `map_config.js`

**Files:**
- Modify: `scripts/map_config.js:62`

- [ ] **Step 1: Add `parseProductFlag` to module.exports**

In `scripts/map_config.js`, change line 62 from:

```javascript
module.exports = { MAP_IDS, COMBINED_FILES, PRODUCTS, VALID_MAPS, VALID_PRODUCTS, parseMapFlag, resolveTargetMaps };
```

to:

```javascript
module.exports = { MAP_IDS, COMBINED_FILES, PRODUCTS, VALID_MAPS, VALID_PRODUCTS, parseMapFlag, parseProductFlag, resolveTargetMaps };
```

- [ ] **Step 2: Run existing tests to confirm no breakage**

Run: `node --test scripts/generate_combined.test.js scripts/fetch_fluidtopics.test.js`
Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add scripts/map_config.js
git commit -m "feat: export parseProductFlag from map_config"
```

---

## Task 2: `snapshot.js` — `flattenToc` (TDD) + API utilities + CLI

This task builds the entire `snapshot.js` module. The pure `flattenToc` function is test-driven; the I/O functions (`httpGet`, `fetchMapMeta`, `fetchMapToc`, `readSnapshot`, `writeSnapshot`) are implemented directly since they're thin wrappers around Node I/O with no branching logic worth unit-testing.

**Files:**
- Create: `scripts/snapshot.test.js`
- Create: `scripts/snapshot.js`

### Phase A: `flattenToc` — TDD

- [ ] **Step 1: Write the failing tests for `flattenToc`**

Create `scripts/snapshot.test.js`:

```javascript
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { flattenToc } = require("./snapshot.js");

describe("flattenToc", () => {
  it("flattens a single-level list to depth-0 entries with 4 fields", () => {
    const toc = [
      { contentId: "a", tocId: "t-a", title: "Topic A", prettyUrl: "/a", children: [] },
      { contentId: "b", tocId: "t-b", title: "Topic B", prettyUrl: "/b", children: [] },
    ];
    assert.deepEqual(flattenToc(toc), [
      { contentId: "a", tocId: "t-a", title: "Topic A", depth: 0 },
      { contentId: "b", tocId: "t-b", title: "Topic B", depth: 0 },
    ]);
  });

  it("flattens nested children with incremented depth", () => {
    const toc = [
      {
        contentId: "parent", tocId: "t-p", title: "Parent", prettyUrl: "/p",
        children: [
          { contentId: "child", tocId: "t-c", title: "Child", prettyUrl: "/c", children: [] }
        ]
      }
    ];
    assert.deepEqual(flattenToc(toc), [
      { contentId: "parent", tocId: "t-p", title: "Parent", depth: 0 },
      { contentId: "child", tocId: "t-c", title: "Child", depth: 1 },
    ]);
  });

  it("strips extra API fields from TOC nodes", () => {
    const toc = [{ contentId: "x", tocId: "t-x", title: "X", prettyUrl: "/x", extra: "ignored", children: [] }];
    const result = flattenToc(toc);
    assert.deepEqual(Object.keys(result[0]).sort(), ["contentId", "depth", "title", "tocId"]);
  });

  it("handles deeply nested tree (3 levels)", () => {
    const toc = [
      {
        contentId: "l0", tocId: "t-0", title: "L0", children: [
          {
            contentId: "l1", tocId: "t-1", title: "L1", children: [
              { contentId: "l2", tocId: "t-2", title: "L2", children: [] }
            ]
          }
        ]
      }
    ];
    assert.deepEqual(flattenToc(toc), [
      { contentId: "l0", tocId: "t-0", title: "L0", depth: 0 },
      { contentId: "l1", tocId: "t-1", title: "L1", depth: 1 },
      { contentId: "l2", tocId: "t-2", title: "L2", depth: 2 },
    ]);
  });

  it("returns empty array for empty input", () => {
    assert.deepEqual(flattenToc([]), []);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test scripts/snapshot.test.js`
Expected: FAIL — `Cannot find module './snapshot.js'`

- [ ] **Step 3: Implement `flattenToc` (minimal stub file)**

Create `scripts/snapshot.js` with only the `flattenToc` function and its export:

```javascript
function flattenToc(nodes, depth = 0) {
  const result = [];
  for (const node of nodes) {
    result.push({ contentId: node.contentId, tocId: node.tocId, title: node.title, depth });
    if (node.children && node.children.length) {
      result.push(...flattenToc(node.children, depth + 1));
    }
  }
  return result;
}

module.exports = { flattenToc };
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test scripts/snapshot.test.js`
Expected: All 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/snapshot.js scripts/snapshot.test.js
git commit -m "feat(snapshot): add flattenToc with tests"
```

### Phase B: API utilities + snapshot I/O + CLI

- [ ] **Step 6: Implement the full `snapshot.js` module**

Expand `scripts/snapshot.js` to the full implementation. Add these above `flattenToc`:

```javascript
const https = require("https");
const fs = require("fs");
const path = require("path");
const { MAP_IDS, PRODUCTS, VALID_PRODUCTS, parseProductFlag } = require("./map_config.js");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const METADATA_DIR = path.join(__dirname, "..", "metadata");
const SNAPSHOT_VERSION = 1;

function httpGet(urlPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE);
    const opts = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: { Accept: "application/json" },
    };
    https
      .get(opts, (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${urlPath}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString()));
      })
      .on("error", reject);
  });
}
```

Add these after `flattenToc`:

```javascript
async function fetchMapMeta(mapId) {
  const body = await httpGet(`/api/khub/maps/${mapId}`);
  const data = JSON.parse(body);
  return { lastPublication: data["ft:lastPublication"] };
}

async function fetchMapToc(mapId) {
  const body = await httpGet(`/api/khub/maps/${mapId}/toc`);
  const toc = JSON.parse(body);
  return flattenToc(toc);
}

function readSnapshot(product) {
  const filePath = path.join(METADATA_DIR, `${product}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeSnapshot(product, snapshot) {
  fs.mkdirSync(METADATA_DIR, { recursive: true });
  const filePath = path.join(METADATA_DIR, `${product}.json`);
  fs.writeFileSync(filePath, JSON.stringify(snapshot, null, 2) + "\n", "utf-8");
}

async function snapshotProduct(product) {
  const mapNames = PRODUCTS[product];
  const maps = {};

  for (const mapName of mapNames) {
    const mapId = MAP_IDS[mapName];
    console.log(`  ${mapName}: fetching metadata...`);
    const meta = await fetchMapMeta(mapId);

    console.log(`  ${mapName}: fetching TOC...`);
    const topics = await fetchMapToc(mapId);

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

async function main() {
  const targetProduct = parseProductFlag();
  const products = targetProduct ? [targetProduct] : VALID_PRODUCTS;

  for (const product of products) {
    console.log(`\nSnapshotting ${product}...`);
    const snapshot = await snapshotProduct(product);
    writeSnapshot(product, snapshot);
    console.log(`  → metadata/${product}.json`);
  }

  console.log("\nDone.");
}

module.exports = {
  flattenToc,
  httpGet,
  fetchMapMeta,
  fetchMapToc,
  readSnapshot,
  writeSnapshot,
  snapshotProduct,
  METADATA_DIR,
  SNAPSHOT_VERSION,
};

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
```

- [ ] **Step 7: Run tests to verify nothing broke**

Run: `node --test scripts/snapshot.test.js`
Expected: All 5 tests still PASS.

- [ ] **Step 8: Commit**

```bash
git add scripts/snapshot.js
git commit -m "feat(snapshot): add API utilities, I/O, and CLI"
```

---

## Task 3: `check.js` — `diffTopics` (TDD)

The core pure function that compares two topic arrays and returns added/removed/reordered.

**Files:**
- Create: `scripts/check.test.js`
- Create: `scripts/check.js` (stub, then implementation)

- [ ] **Step 1: Write the failing tests for `diffTopics`**

Create `scripts/check.test.js`:

```javascript
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { diffTopics } = require("./check.js");

const topic = (id) => ({ contentId: id, tocId: `toc-${id}`, title: `Title ${id}`, depth: 0 });

describe("diffTopics", () => {
  it("returns no changes for identical lists", () => {
    const topics = [topic("a"), topic("b"), topic("c")];
    const result = diffTopics(topics, topics);
    assert.deepEqual(result, { added: [], removed: [], reordered: false });
  });

  it("detects added topics", () => {
    const old = [topic("a"), topic("b")];
    const next = [topic("a"), topic("b"), topic("c")];
    const result = diffTopics(old, next);
    assert.deepEqual(result.added, ["c"]);
    assert.deepEqual(result.removed, []);
    assert.equal(result.reordered, false);
  });

  it("detects removed topics", () => {
    const old = [topic("a"), topic("b"), topic("c")];
    const next = [topic("a"), topic("c")];
    const result = diffTopics(old, next);
    assert.deepEqual(result.added, []);
    assert.deepEqual(result.removed, ["b"]);
    assert.equal(result.reordered, false);
  });

  it("detects reordered topics in the intersection", () => {
    const old = [topic("a"), topic("b"), topic("c")];
    const next = [topic("c"), topic("a"), topic("b")];
    const result = diffTopics(old, next);
    assert.deepEqual(result.added, []);
    assert.deepEqual(result.removed, []);
    assert.equal(result.reordered, true);
  });

  it("does not flag reorder when only additions change the list", () => {
    const old = [topic("a"), topic("b")];
    const next = [topic("a"), topic("x"), topic("b")];
    const result = diffTopics(old, next);
    assert.deepEqual(result.added, ["x"]);
    assert.equal(result.reordered, false);
  });

  it("does not flag reorder when only removals change the list", () => {
    const old = [topic("a"), topic("b"), topic("c")];
    const next = [topic("a"), topic("c")];
    const result = diffTopics(old, next);
    assert.deepEqual(result.removed, ["b"]);
    assert.equal(result.reordered, false);
  });

  it("detects simultaneous add, remove, and reorder", () => {
    const old = [topic("a"), topic("b"), topic("c")];
    const next = [topic("c"), topic("a"), topic("d")];
    const result = diffTopics(old, next);
    assert.deepEqual(result.added, ["d"]);
    assert.deepEqual(result.removed, ["b"]);
    assert.equal(result.reordered, true);
  });

  it("returns empty diff for two empty lists", () => {
    const result = diffTopics([], []);
    assert.deepEqual(result, { added: [], removed: [], reordered: false });
  });

  it("treats all topics as added when old list is empty", () => {
    const result = diffTopics([], [topic("a"), topic("b")]);
    assert.deepEqual(result.added, ["a", "b"]);
    assert.deepEqual(result.removed, []);
    assert.equal(result.reordered, false);
  });

  it("treats all topics as removed when new list is empty", () => {
    const result = diffTopics([topic("a"), topic("b")], []);
    assert.deepEqual(result.added, []);
    assert.deepEqual(result.removed, ["a", "b"]);
    assert.equal(result.reordered, false);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test scripts/check.test.js`
Expected: FAIL — `Cannot find module './check.js'`

- [ ] **Step 3: Implement `diffTopics`**

Create `scripts/check.js` with the `diffTopics` function:

```javascript
function diffTopics(oldTopics, newTopics) {
  const oldIds = oldTopics.map((t) => t.contentId);
  const newIds = newTopics.map((t) => t.contentId);
  const oldSet = new Set(oldIds);
  const newSet = new Set(newIds);

  const added = newIds.filter((id) => !oldSet.has(id));
  const removed = oldIds.filter((id) => !newSet.has(id));

  const oldIntersection = oldIds.filter((id) => newSet.has(id));
  const newIntersection = newIds.filter((id) => oldSet.has(id));
  const reordered =
    oldIntersection.length > 0 &&
    JSON.stringify(oldIntersection) !== JSON.stringify(newIntersection);

  return { added, removed, reordered };
}

module.exports = { diffTopics };
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test scripts/check.test.js`
Expected: All 10 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/check.js scripts/check.test.js
git commit -m "feat(check): add diffTopics with tests"
```

---

## Task 4: `check.js` — `formatTextReport` (TDD)

Pure function that formats the internal report structure into human-readable text output.

**Files:**
- Modify: `scripts/check.test.js`
- Modify: `scripts/check.js`

- [ ] **Step 1: Write the failing tests for `formatTextReport`**

Append to `scripts/check.test.js`. First, update the existing require at the top of the file to also import `formatTextReport`:

```javascript
const { diffTopics, formatTextReport } = require("./check.js");
```

Then add the new describe block at the end:

```javascript
describe("formatTextReport", () => {
  it("shows 'no changes' for an unchanged product", () => {
    const report = {
      timestamp: "2026-03-20T08:00:00.000Z",
      products: {
        xdr: {
          changed: false,
          maps: {
            xdr_5: { republished: false, added: 0, removed: 0, reordered: false },
          },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("[xdr] no changes"));
  });

  it("shows map-level diff details for a changed product", () => {
    const report = {
      timestamp: "2026-03-20T08:00:00.000Z",
      products: {
        gateway: {
          changed: true,
          maps: {
            cortex_gateway: { republished: true, added: 1, removed: 0, reordered: false },
          },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("[gateway] changed"));
    assert.ok(text.includes("cortex_gateway: 1 added, 0 removed"));
  });

  it("shows 'no TOC changes' for a republished map with identical topics", () => {
    const report = {
      timestamp: "2026-03-20T08:00:00.000Z",
      products: {
        xsiam: {
          changed: true,
          maps: {
            xsiam_3: { republished: true, added: 0, removed: 0, reordered: false },
          },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("xsiam_3: no TOC changes"));
  });

  it("includes reordered flag in map detail when topics were reordered", () => {
    const report = {
      timestamp: "2026-03-20T08:00:00.000Z",
      products: {
        gateway: {
          changed: true,
          maps: {
            cortex_gateway: { republished: true, added: 0, removed: 0, reordered: true },
          },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("reordered"));
  });

  it("shows summary count of products needing re-fetch", () => {
    const report = {
      timestamp: "2026-03-20T08:00:00.000Z",
      products: {
        cloud: {
          changed: true,
          maps: { runtime: { republished: true, added: 0, removed: 0, reordered: false } },
        },
        xdr: {
          changed: false,
          maps: { xdr_5: { republished: false, added: 0, removed: 0, reordered: false } },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("1 product"));
    assert.ok(text.includes("re-fetch"));
  });

  it("shows 'up to date' when no products changed", () => {
    const report = {
      timestamp: "2026-03-20T08:00:00.000Z",
      products: {
        xdr: {
          changed: false,
          maps: { xdr_5: { republished: false, added: 0, removed: 0, reordered: false } },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("up to date"));
  });

  it("marks maps with errors", () => {
    const report = {
      timestamp: "2026-03-20T08:00:00.000Z",
      products: {
        gateway: {
          changed: false,
          maps: {
            cortex_gateway: { error: true, message: "HTTP 503" },
          },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("cortex_gateway: error"));
  });
});
```

- [ ] **Step 2: Run tests to verify the new tests fail**

Run: `node --test scripts/check.test.js`
Expected: FAIL — `formatTextReport is not a function` (not yet exported).

- [ ] **Step 3: Implement `formatTextReport`**

Add to `scripts/check.js` before the `module.exports` line:

```javascript
function formatTextReport(report) {
  const lines = [];
  let changedCount = 0;

  for (const [product, data] of Object.entries(report.products)) {
    if (!data.changed) {
      lines.push(`[${product}] no changes`);
      continue;
    }
    changedCount++;
    lines.push(`[${product}] changed`);
    for (const [mapName, mapData] of Object.entries(data.maps)) {
      if (mapData.error) {
        lines.push(`  ${mapName}: error — ${mapData.message}`);
        continue;
      }
      if (!mapData.republished) continue;
      const parts = [];
      if (mapData.added > 0 || mapData.removed > 0) {
        parts.push(`${mapData.added} added, ${mapData.removed} removed`);
      }
      if (mapData.reordered) parts.push("reordered");
      if (parts.length === 0) parts.push("no TOC changes");
      lines.push(`  ${mapName}: ${parts.join(", ")}`);
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

Update `module.exports`:

```javascript
module.exports = { diffTopics, formatTextReport };
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test scripts/check.test.js`
Expected: All 17 tests PASS (10 diffTopics + 7 formatTextReport).

- [ ] **Step 5: Commit**

```bash
git add scripts/check.js scripts/check.test.js
git commit -m "feat(check): add formatTextReport with tests"
```

---

## Task 5: `check.js` — Comparison logic + CLI

Wire together: load snapshot, fetch live API, diff, format output, handle `--apply`.

**Files:**
- Modify: `scripts/check.js`

- [ ] **Step 1: Add imports and CLI argument parsing**

Add at the top of `scripts/check.js`:

```javascript
const { execSync } = require("child_process");
const path = require("path");
const { MAP_IDS, PRODUCTS, VALID_PRODUCTS, parseProductFlag } = require("./map_config.js");
const { fetchMapMeta, fetchMapToc, readSnapshot, writeSnapshot, SNAPSHOT_VERSION } = require("./snapshot.js");
```

Add CLI parsing function:

```javascript
function parseFlags() {
  const product = parseProductFlag();
  const apply = process.argv.includes("--apply");
  const formatIdx = process.argv.indexOf("--format");
  const format = formatIdx !== -1 && process.argv[formatIdx + 1] === "text" ? "text" : "json";
  return { product, apply, format };
}
```

- [ ] **Step 2: Implement `checkProduct` — per-product comparison**

```javascript
async function checkProduct(product, snapshot) {
  const mapNames = PRODUCTS[product];
  const result = { changed: false, maps: {} };
  const freshData = {};

  for (const mapName of mapNames) {
    const mapId = MAP_IDS[mapName];
    try {
      const meta = await fetchMapMeta(mapId);

      if (meta.lastPublication === snapshot.maps[mapName].lastPublication) {
        result.maps[mapName] = { republished: false, added: 0, removed: 0, reordered: false };
        continue;
      }

      const newTopics = await fetchMapToc(mapId);
      const diff = diffTopics(snapshot.maps[mapName].topics, newTopics);

      result.maps[mapName] = {
        republished: true,
        added: diff.added.length,
        removed: diff.removed.length,
        reordered: diff.reordered,
      };
      result.changed = true;

      freshData[mapName] = {
        mapId,
        lastPublication: meta.lastPublication,
        topicCount: newTopics.length,
        topics: newTopics,
      };
    } catch (err) {
      console.error(`Error checking ${mapName}: ${err.message}`);
      result.maps[mapName] = { error: true, message: err.message };
    }
  }

  return { result, freshData };
}
```

- [ ] **Step 3: Implement `main` — orchestration + output + `--apply`**

```javascript
async function main() {
  const { product: targetProduct, apply, format } = parseFlags();
  const products = targetProduct ? [targetProduct] : VALID_PRODUCTS;
  const report = { timestamp: new Date().toISOString(), products: {} };
  let hasErrors = false;

  for (const product of products) {
    const snapshot = readSnapshot(product);
    if (!snapshot) {
      console.error(`[${product}] no snapshot — run: npm run snapshot:${product}`);
      hasErrors = true;
      continue;
    }

    const { result, freshData } = await checkProduct(product, snapshot);
    report.products[product] = result;

    if (Object.values(result.maps).some((m) => m.error)) hasErrors = true;

    if (!apply && Object.keys(freshData).length > 0) {
      const updatedMaps = {};
      for (const mapName of PRODUCTS[product]) {
        updatedMaps[mapName] = freshData[mapName] || snapshot.maps[mapName];
      }
      writeSnapshot(product, {
        version: SNAPSHOT_VERSION,
        product,
        lastChecked: new Date().toISOString(),
        maps: updatedMaps,
      });
    }
  }

  if (format === "text") {
    console.log(formatTextReport(report));
  } else {
    console.log(JSON.stringify(report, null, 2));
  }

  if (apply) {
    const changed = Object.entries(report.products)
      .filter(([, data]) => data.changed)
      .map(([name]) => name);

    for (const product of changed) {
      console.log(`\n=== Re-fetching ${product} ===\n`);
      try {
        execSync(`npm run fetch:${product} && npm run fix:${product}`, {
          cwd: path.join(__dirname, ".."),
          stdio: "inherit",
        });
      } catch (err) {
        console.error(`FAILED: re-fetch for ${product}`);
        hasErrors = true;
      }
    }
  }

  if (hasErrors) process.exit(1);
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
```

- [ ] **Step 4: Run all tests to verify nothing broke**

Run: `node --test scripts/check.test.js scripts/snapshot.test.js`
Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/check.js
git commit -m "feat(check): add comparison logic and CLI with --apply support"
```

---

## Task 6: `fix.js` — Snapshot integration

Add a snapshot call at the end of the fix pipeline so snapshots stay current after every fetch + fix cycle.

**Files:**
- Modify: `scripts/fix.js:46-61`

- [ ] **Step 1: Add snapshot call after combine succeeds**

At the end of `scripts/fix.js`, after the `generate_combined.js` block (after line 61), add:

```javascript
// Update metadata snapshots after successful pipeline run
console.log("\n=== Updating metadata snapshots ===\n");
try {
  const snapshotOutput = execSync(`node scripts/snapshot.js${productArgs}`, {
    cwd: path.join(__dirname, ".."),
    encoding: "utf-8",
  });
  if (snapshotOutput.trim()) console.log(snapshotOutput.trim());
} catch (err) {
  console.error("WARNING: snapshot update failed (non-fatal)");
  if (err.stderr) console.error(err.stderr);
}
```

Note: The snapshot failure is non-fatal — the fetch + fix pipeline already succeeded. Failing the whole pipeline because of a snapshot write would be disruptive.

- [ ] **Step 2: Run existing tests to confirm no breakage**

Run: `node --test scripts/generate_combined.test.js scripts/fetch_fluidtopics.test.js`
Expected: All tests PASS.

- [ ] **Step 3: Commit**

```bash
git add scripts/fix.js
git commit -m "feat(fix): call snapshot.js at end of pipeline"
```

---

## Task 7: `package.json` — npm scripts + test command

Add the `check:*` and `snapshot:*` npm scripts and include new test files in the `test` command.

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add check and snapshot scripts to `package.json`**

Add these entries to the `"scripts"` object (after the existing `fix:*` entries):

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
"snapshot:agentix": "node scripts/snapshot.js --product agentix",
```

- [ ] **Step 2: Update the `test` script to include new test files**

Change the `"test"` script from:

```json
"test": "node --test scripts/generate_combined.test.js scripts/fetch_fluidtopics.test.js"
```

to:

```json
"test": "node --test scripts/generate_combined.test.js scripts/fetch_fluidtopics.test.js scripts/snapshot.test.js scripts/check.test.js"
```

- [ ] **Step 3: Run full test suite to verify**

Run: `npm test`
Expected: All tests PASS across all 4 test files.

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "feat: add check and snapshot npm scripts, update test command"
```

---

## Summary

| Task | What | TDD? |
|------|------|------|
| 1 | Export `parseProductFlag` from `map_config.js` | No (existing function, trivial export) |
| 2 | `snapshot.js` — `flattenToc` TDD + API utilities + I/O + CLI | Yes (`flattenToc`) |
| 3 | `check.js` — `diffTopics` TDD | Yes |
| 4 | `check.js` — `formatTextReport` TDD | Yes |
| 5 | `check.js` — Comparison logic + CLI with `--apply` | No (I/O orchestration) |
| 6 | `fix.js` — Snapshot call at end of pipeline | No (wiring) |
| 7 | `package.json` — npm scripts + test command | No (config) |
