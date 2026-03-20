# Global Cross-Product Deduplication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deduplicate documentation topics across all products (XDR > Cloud > XSIAM > Agentix) so each topic appears exactly once in the RAG corpus.

**Architecture:** A new standalone `compute_ownership.js` script walks the priority chain, assigns each topic to one product, and writes `metadata/ownership.json`. `generate_combined.js` reads this manifest and pre-filters each map's TOC before combining. The existing Cloud-internal PRA/PR/R/P/A bucketing is unchanged.

**Tech Stack:** Node.js, `node:test` + `node:assert/strict` for tests, Fluid Topics API for TOC fetches.

**Spec:** `docs/superpowers/specs/2026-03-20-global-dedup-design.md`

---

### Task 1: Add dedup config constants to map_config.js

**Files:**
- Modify: `scripts/map_config.js:1-62`

- [ ] **Step 1: Add DEDUP_HIERARCHY and DEDUP_EXCLUDED constants**

Add after line 29 (after the `PRODUCTS` block):

```js
// Product keys — priority order for global dedup (highest first)
const DEDUP_HIERARCHY = ["xdr", "cloud", "xsiam", "agentix"];

// Map keys — excluded from dedup, processed as simple maps
const DEDUP_EXCLUDED = ["cortex_gateway", "xdr_compatibility"];
```

- [ ] **Step 2: Export the new constants**

Update the `module.exports` on line 62 to include `DEDUP_HIERARCHY` and `DEDUP_EXCLUDED`:

```js
module.exports = { MAP_IDS, COMBINED_FILES, PRODUCTS, VALID_MAPS, VALID_PRODUCTS, DEDUP_HIERARCHY, DEDUP_EXCLUDED, parseMapFlag, parseProductFlag, resolveTargetMaps };
```

- [ ] **Step 3: Run existing tests to verify no regressions**

Run: `node --test scripts/generate_combined.test.js`
Expected: All existing tests pass (config changes are additive).

- [ ] **Step 4: Commit**

```bash
git add scripts/map_config.js
git commit -m "feat: add DEDUP_HIERARCHY and DEDUP_EXCLUDED to map config"
```

---

### Task 2: Implement computeOwnership() pure function with TDD

**Files:**
- Create: `scripts/compute_ownership.js`
- Create: `scripts/compute_ownership.test.js`

This task builds the core algorithm test-first. The CLI/main() wrapper comes in Task 3.

- [ ] **Step 1: Create test file with first test — XDR+Cloud topic, XDR owns it**

```js
// scripts/compute_ownership.test.js
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { computeOwnership } = require("./compute_ownership.js");

const entry = (contentId, title, depth = 0) => ({ contentId, title, depth });

describe("computeOwnership", () => {
  const hierarchy = ["xdr", "cloud", "xsiam", "agentix"];

  it("assigns topic in XDR and Cloud to XDR (highest priority)", () => {
    const tocsByProduct = {
      xdr: [entry("id-1", "Shared Topic")],
      cloud: [entry("id-1", "Shared Topic")],
      xsiam: [],
      agentix: [],
    };

    const result = computeOwnership(tocsByProduct, hierarchy);

    assert.ok(result.owned.xdr.includes("id-1"));
    assert.ok(!result.owned.cloud.includes("id-1"));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/compute_ownership.test.js`
Expected: FAIL — `compute_ownership.js` does not exist yet.

- [ ] **Step 3: Create compute_ownership.js with minimal computeOwnership()**

```js
// scripts/compute_ownership.js
function normalizeTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function computeOwnership(tocsByProduct, hierarchy) {
  const claimed = new Map();
  const claimedTitles = new Map();
  const owned = {};
  const titleMatched = {};
  const stats = {};

  for (const product of hierarchy) {
    owned[product] = [];
    const entries = tocsByProduct[product] || [];

    // Deduplicate by contentId within this product
    const seen = new Set();
    const unique = [];
    for (const e of entries) {
      if (!seen.has(e.contentId)) {
        seen.add(e.contentId);
        unique.push(e);
      }
    }

    let droppedById = 0;
    let droppedByTitle = 0;

    for (const e of unique) {
      const norm = normalizeTitle(e.title);

      if (claimed.has(e.contentId)) {
        droppedById++;
        continue;
      }

      if (claimedTitles.has(norm)) {
        droppedByTitle++;
        const owner = claimedTitles.get(norm);
        titleMatched[e.contentId] = {
          ownedBy: owner.product,
          ownerContentId: owner.contentId,
        };
        continue;
      }

      claimed.set(e.contentId, product);
      claimedTitles.set(norm, { product, contentId: e.contentId });
      owned[product].push(e.contentId);
    }

    stats[product] = {
      total: unique.length,
      owned: owned[product].length,
      droppedById,
      droppedByTitle,
    };
  }

  return { owned, titleMatched, stats };
}

module.exports = { computeOwnership, normalizeTitle };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/compute_ownership.test.js`
Expected: PASS

- [ ] **Step 5: Add test — Cloud+XSIAM topic, Cloud owns it**

```js
  it("assigns topic in Cloud and XSIAM to Cloud", () => {
    const tocsByProduct = {
      xdr: [],
      cloud: [entry("id-1", "Cloud Topic")],
      xsiam: [entry("id-1", "Cloud Topic")],
      agentix: [],
    };

    const result = computeOwnership(tocsByProduct, hierarchy);

    assert.ok(result.owned.cloud.includes("id-1"));
    assert.ok(!result.owned.xsiam.includes("id-1"));
  });
```

- [ ] **Step 6: Run test — should pass (already implemented)**

Run: `node --test scripts/compute_ownership.test.js`
Expected: PASS

- [ ] **Step 7: Add test — XDR+Cloud+XSIAM topic, XDR owns it**

```js
  it("assigns topic in all three to XDR (highest priority)", () => {
    const tocsByProduct = {
      xdr: [entry("id-1", "Everywhere")],
      cloud: [entry("id-1", "Everywhere")],
      xsiam: [entry("id-1", "Everywhere")],
      agentix: [],
    };

    const result = computeOwnership(tocsByProduct, hierarchy);

    assert.ok(result.owned.xdr.includes("id-1"));
    assert.equal(result.owned.cloud.length, 0);
    assert.equal(result.owned.xsiam.length, 0);
  });
```

- [ ] **Step 8: Run test — should pass**

Run: `node --test scripts/compute_ownership.test.js`
Expected: PASS

- [ ] **Step 9: Add test — Agentix-only topic stays in Agentix**

```js
  it("assigns Agentix-only topic to Agentix", () => {
    const tocsByProduct = {
      xdr: [],
      cloud: [],
      xsiam: [],
      agentix: [entry("ag-1", "AgentiX Onboarding")],
    };

    const result = computeOwnership(tocsByProduct, hierarchy);

    assert.ok(result.owned.agentix.includes("ag-1"));
  });
```

- [ ] **Step 10: Run test — should pass**

Run: `node --test scripts/compute_ownership.test.js`
Expected: PASS

- [ ] **Step 11: Add test — title-match dedup (same title, different contentId)**

```js
  it("drops lower-priority topic with same normalized title but different contentId", () => {
    const tocsByProduct = {
      xdr: [entry("xdr-1", "Deploy Agent")],
      cloud: [entry("cloud-1", "Deploy Agent")],
      xsiam: [],
      agentix: [],
    };

    const result = computeOwnership(tocsByProduct, hierarchy);

    assert.ok(result.owned.xdr.includes("xdr-1"));
    assert.equal(result.owned.cloud.length, 0);
    assert.equal(result.stats.cloud.droppedByTitle, 1);
    assert.deepEqual(result.titleMatched["cloud-1"], {
      ownedBy: "xdr",
      ownerContentId: "xdr-1",
    });
  });
```

- [ ] **Step 12: Run test — should pass**

Run: `node --test scripts/compute_ownership.test.js`
Expected: PASS

- [ ] **Step 13: Add test — XDR vs XSIAM title match**

```js
  it("drops XSIAM topic with same title as XDR (different contentId)", () => {
    const tocsByProduct = {
      xdr: [entry("xdr-1", "Endpoint Agent")],
      cloud: [],
      xsiam: [entry("xs-1", "Endpoint Agent")],
      agentix: [],
    };

    const result = computeOwnership(tocsByProduct, hierarchy);

    assert.ok(result.owned.xdr.includes("xdr-1"));
    assert.equal(result.owned.xsiam.length, 0);
    assert.equal(result.stats.xsiam.droppedByTitle, 1);
  });
```

- [ ] **Step 14: Run test — should pass**

Run: `node --test scripts/compute_ownership.test.js`
Expected: PASS

- [ ] **Step 15: Add test — Cloud vs XSIAM title match**

```js
  it("drops XSIAM topic with same title as Cloud (different contentId)", () => {
    const tocsByProduct = {
      xdr: [],
      cloud: [entry("cloud-1", "Compliance Dashboard")],
      xsiam: [entry("xs-1", "Compliance Dashboard")],
      agentix: [],
    };

    const result = computeOwnership(tocsByProduct, hierarchy);

    assert.ok(result.owned.cloud.includes("cloud-1"));
    assert.equal(result.owned.xsiam.length, 0);
    assert.equal(result.stats.xsiam.droppedByTitle, 1);
  });
```

- [ ] **Step 16: Run test — should pass**

Run: `node --test scripts/compute_ownership.test.js`
Expected: PASS

- [ ] **Step 17: Add test — title normalization handles case/punctuation**

```js
  it("normalizes titles for matching (case, punctuation, whitespace)", () => {
    const tocsByProduct = {
      xdr: [entry("xdr-1", "Set Up  Users & Roles!")],
      cloud: [],
      xsiam: [entry("xs-1", "set-up users & roles")],
      agentix: [],
    };

    const result = computeOwnership(tocsByProduct, hierarchy);

    assert.ok(result.owned.xdr.includes("xdr-1"));
    assert.equal(result.owned.xsiam.length, 0);
    assert.equal(result.stats.xsiam.droppedByTitle, 1);
  });
```

- [ ] **Step 18: Run test — should pass**

Run: `node --test scripts/compute_ownership.test.js`
Expected: PASS

- [ ] **Step 19: Add test — generic "Overview" title, highest priority claims it**

```js
  it("generic 'Overview' title — highest priority product claims it", () => {
    const tocsByProduct = {
      xdr: [entry("xdr-ov", "Overview")],
      cloud: [entry("cloud-ov", "Overview")],
      xsiam: [entry("xs-ov", "Overview")],
      agentix: [entry("ag-ov", "Overview")],
    };

    const result = computeOwnership(tocsByProduct, hierarchy);

    assert.ok(result.owned.xdr.includes("xdr-ov"));
    assert.equal(result.owned.cloud.length, 0);
    assert.equal(result.owned.xsiam.length, 0);
    assert.equal(result.owned.agentix.length, 0);
  });
```

- [ ] **Step 20: Run test — should pass**

Run: `node --test scripts/compute_ownership.test.js`
Expected: PASS

- [ ] **Step 21: Add test — Cloud sub-map merging deduplicates by contentId**

```js
  it("Cloud sub-map merging: same contentId in appsec+posture+runtime counts once", () => {
    const tocsByProduct = {
      xdr: [],
      cloud: [
        entry("shared-1", "Topic A"),
        entry("shared-1", "Topic A"),
        entry("shared-1", "Topic A"),
      ],
      xsiam: [],
      agentix: [],
    };

    const result = computeOwnership(tocsByProduct, hierarchy);

    assert.equal(result.owned.cloud.length, 1);
    assert.equal(result.stats.cloud.total, 1);
  });
```

- [ ] **Step 22: Run test — should pass**

Run: `node --test scripts/compute_ownership.test.js`
Expected: PASS

- [ ] **Step 23: Add test — empty TOC for a product**

```js
  it("handles empty TOC for a product without crashing", () => {
    const tocsByProduct = {
      xdr: [],
      cloud: [],
      xsiam: [],
      agentix: [],
    };

    const result = computeOwnership(tocsByProduct, hierarchy);

    assert.deepEqual(result.owned.xdr, []);
    assert.deepEqual(result.owned.cloud, []);
    assert.deepEqual(result.owned.xsiam, []);
    assert.deepEqual(result.owned.agentix, []);
  });
```

- [ ] **Step 24: Run test — should pass**

Run: `node --test scripts/compute_ownership.test.js`
Expected: PASS

- [ ] **Step 25: Add test — reduced hierarchy (fewer than 4 products)**

```js
  it("works with a reduced hierarchy of 2 products", () => {
    const tocsByProduct = {
      xdr: [entry("id-1", "Shared")],
      cloud: [entry("id-1", "Shared"), entry("cloud-2", "Cloud Only")],
    };

    const result = computeOwnership(tocsByProduct, ["xdr", "cloud"]);

    assert.ok(result.owned.xdr.includes("id-1"));
    assert.ok(!result.owned.cloud.includes("id-1"));
    assert.ok(result.owned.cloud.includes("cloud-2"));
  });
```

- [ ] **Step 26: Run test — should pass**

Run: `node --test scripts/compute_ownership.test.js`
Expected: PASS

- [ ] **Step 27: Add test — duplicate contentIds within single product TOC**

```js
  it("duplicate contentIds within a single product TOC are collapsed", () => {
    const tocsByProduct = {
      xdr: [
        entry("id-1", "Topic A", 0),
        entry("id-1", "Topic A", 2),
        entry("id-2", "Topic B"),
      ],
      cloud: [],
      xsiam: [],
      agentix: [],
    };

    const result = computeOwnership(tocsByProduct, hierarchy);

    assert.equal(result.owned.xdr.length, 2);
    assert.equal(result.stats.xdr.total, 2);
  });
```

- [ ] **Step 28: Run test — should pass**

Run: `node --test scripts/compute_ownership.test.js`
Expected: PASS

- [ ] **Step 29: Add comprehensive integration test**

```js
  it("assigns a mixed set of topics to correct products", () => {
    const tocsByProduct = {
      xdr: [
        entry("shared-all", "Shared All"),
        entry("xdr-cloud", "XDR Cloud Shared"),
        entry("xdr-only", "XDR Exclusive"),
      ],
      cloud: [
        entry("shared-all", "Shared All"),
        entry("xdr-cloud", "XDR Cloud Shared"),
        entry("cloud-xsiam", "Cloud XSIAM"),
        entry("cloud-only", "Cloud Exclusive"),
        entry("cloud-title", "Same Title Topic"),
      ],
      xsiam: [
        entry("shared-all", "Shared All"),
        entry("cloud-xsiam", "Cloud XSIAM"),
        entry("xs-only", "XSIAM Exclusive"),
        entry("xs-title", "Same Title Topic"),
      ],
      agentix: [
        entry("ag-only", "AgentiX Only"),
      ],
    };

    const result = computeOwnership(tocsByProduct, hierarchy);

    // XDR owns: shared-all, xdr-cloud, xdr-only
    assert.deepEqual(result.owned.xdr.sort(), ["shared-all", "xdr-cloud", "xdr-only"]);
    // Cloud owns: cloud-xsiam, cloud-only, cloud-title
    assert.deepEqual(result.owned.cloud.sort(), ["cloud-only", "cloud-title", "cloud-xsiam"]);
    // XSIAM owns: xs-only (xs-title dropped by title match to cloud-title)
    assert.deepEqual(result.owned.xsiam, ["xs-only"]);
    // Agentix owns: ag-only
    assert.deepEqual(result.owned.agentix, ["ag-only"]);

    // Stats
    assert.equal(result.stats.xdr.droppedById, 0);
    assert.equal(result.stats.cloud.droppedById, 2);
    assert.equal(result.stats.xsiam.droppedById, 2);
    assert.equal(result.stats.xsiam.droppedByTitle, 1);
  });
```

- [ ] **Step 30: Run all tests**

Run: `node --test scripts/compute_ownership.test.js`
Expected: All PASS

- [ ] **Step 31: Commit**

```bash
git add scripts/compute_ownership.js scripts/compute_ownership.test.js
git commit -m "feat: implement computeOwnership() pure function with tests"
```

---

### Task 3: Add CLI main() to compute_ownership.js

**Files:**
- Modify: `scripts/compute_ownership.js`
- Modify: `package.json:46`

This adds the script wrapper that fetches TOCs from the API and writes `metadata/ownership.json`.

- [ ] **Step 1: Add main() function and CLI entrypoint to compute_ownership.js**

Restructure the file into its final layout. Move the `require` statements to the top of the file (before the pure functions), keep `module.exports` in the middle, and add the CLI code after it. The final file structure is shown below — the `require` block goes at the **top**, not after `module.exports`:

```js
const https = require("https");
const fs = require("fs");
const path = require("path");
const { MAP_IDS, PRODUCTS, DEDUP_HIERARCHY, DEDUP_EXCLUDED } = require("./map_config.js");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const METADATA_DIR = path.join(__dirname, "..", "metadata");

function fetchJson(urlPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE);
    https
      .get(
        { hostname: url.hostname, path: url.pathname, headers: { Accept: "application/json" } },
        (res) => {
          if (res.statusCode !== 200) {
            res.resume();
            return reject(new Error(`HTTP ${res.statusCode} for ${urlPath}`));
          }
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () =>
            resolve(JSON.parse(Buffer.concat(chunks).toString()))
          );
        }
      )
      .on("error", reject);
  });
}

function flattenToc(nodes, depth = 0) {
  const result = [];
  for (const node of nodes) {
    result.push({ title: node.title, contentId: node.contentId, depth });
    if (node.children && node.children.length) {
      result.push(...flattenToc(node.children, depth + 1));
    }
  }
  return result;
}

async function main() {
  // Build list of all maps to fetch (excluding DEDUP_EXCLUDED)
  const fetchTargets = [];
  for (const product of DEDUP_HIERARCHY) {
    for (const mapName of PRODUCTS[product]) {
      if (!DEDUP_EXCLUDED.includes(mapName)) {
        fetchTargets.push({ product, mapName });
      }
    }
  }

  // Fetch all TOCs in parallel
  console.log(`Fetching ${fetchTargets.length} TOCs...`);
  const results = await Promise.all(
    fetchTargets.map(async ({ product, mapName }) => {
      const toc = await fetchJson(`/api/khub/maps/${MAP_IDS[mapName]}/toc`);
      console.log(`  ${mapName}: ${toc.length} top-level nodes`);
      return { product, entries: flattenToc(toc) };
    })
  );

  // Group by product
  const tocsByProduct = {};
  for (const product of DEDUP_HIERARCHY) {
    tocsByProduct[product] = [];
  }
  for (const { product, entries } of results) {
    tocsByProduct[product].push(...entries);
  }

  const result = computeOwnership(tocsByProduct, DEDUP_HIERARCHY);

  const manifest = {
    meta: {
      generatedAt: new Date().toISOString(),
      hierarchy: DEDUP_HIERARCHY,
    },
    owned: result.owned,
    titleMatched: result.titleMatched,
    stats: result.stats,
  };

  fs.mkdirSync(METADATA_DIR, { recursive: true });
  const outPath = path.join(METADATA_DIR, "ownership.json");
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`\nWritten: ${outPath}`);

  for (const product of DEDUP_HIERARCHY) {
    const s = result.stats[product];
    console.log(
      `[ownership] ${product.padEnd(8)} ${String(s.total).padStart(5)} total, ` +
      `${String(s.owned).padStart(5)} owned, ` +
      `${String(s.droppedById).padStart(5)} droppedById, ` +
      `${String(s.droppedByTitle).padStart(5)} droppedByTitle`
    );
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
```

Note: The `require` statements for `https`, `fs`, `path`, and `map_config` should go at the top of the file. The `module.exports` stays where it is so the pure function can be tested without triggering the CLI. Structure the file as:

1. `require` statements (https, fs, path, map_config) at top
2. `normalizeTitle()` and `computeOwnership()` pure functions
3. `module.exports = { computeOwnership, normalizeTitle };`
4. `fetchJson()`, `flattenToc()`, `main()` — CLI-only code
5. `if (require.main === module)` guard

**Known duplication:** `fetchJson` and `flattenToc` duplicate logic from
`generate_combined.js` (where the equivalent function is named `fetch`). The
rename to `fetchJson` is intentional for clarity. Extracting shared utilities
into a common module is planned in `tasks/todo.md` ("Shared config module") but
is out of scope for this change. Both implementations are identical and small.

- [ ] **Step 2: Add ownership npm script to package.json**

Add after the `"split:agentix"` line (line 42):

```json
"ownership": "node scripts/compute_ownership.js",
```

- [ ] **Step 3: Add ownership to the test runner in package.json**

Update the `"test"` script (currently on line 46, shifts to line 47 after Step 2 adds a line) to include the new test file:

```json
"test": "node --test scripts/generate_combined.test.js scripts/fetch_fluidtopics.test.js scripts/snapshot.test.js scripts/check.test.js scripts/compute_ownership.test.js"
```

- [ ] **Step 4: Run all tests to verify no regressions**

Run: `npm test`
Expected: All tests pass (including new compute_ownership tests).

- [ ] **Step 5: Commit**

```bash
git add scripts/compute_ownership.js package.json
git commit -m "feat: add compute_ownership CLI script and npm ownership command"
```

---

### Task 4: Integrate ownership filtering into generate_combined.js

**Files:**
- Modify: `scripts/generate_combined.js:1-353`
- Modify: `scripts/generate_combined.test.js`

**Note:** All line numbers below reference the original file before any Task 4 modifications. After Step 3 adds `filterTocByOwnership` (~3 lines after line 215), subsequent line numbers shift by ~3. Use the surrounding code context (function names, comments) to locate the correct insertion points.

- [ ] **Step 1: Write failing test — combine step filters TOC by ownership manifest**

Add to `scripts/generate_combined.test.js`:

```js
const { filterTocByOwnership } = require("./generate_combined.js");

describe("filterTocByOwnership", () => {
  const entry = (contentId, title, depth) => ({ contentId, title, depth });

  it("filters TOC to only include owned contentIds", () => {
    const toc = [
      entry("id-1", "Owned Topic", 0),
      entry("id-2", "Dropped Topic", 1),
      entry("id-3", "Also Owned", 1),
    ];
    const ownedSet = new Set(["id-1", "id-3"]);

    const result = filterTocByOwnership(toc, ownedSet);

    assert.equal(result.length, 2);
    assert.equal(result[0].contentId, "id-1");
    assert.equal(result[1].contentId, "id-3");
  });

  it("returns empty array when no contentIds are owned", () => {
    const toc = [entry("id-1", "Topic", 0)];
    const ownedSet = new Set();

    const result = filterTocByOwnership(toc, ownedSet);

    assert.equal(result.length, 0);
  });

  it("passes through all entries when all are owned", () => {
    const toc = [entry("id-1", "A", 0), entry("id-2", "B", 1)];
    const ownedSet = new Set(["id-1", "id-2"]);

    const result = filterTocByOwnership(toc, ownedSet);

    assert.equal(result.length, 2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/generate_combined.test.js`
Expected: FAIL — `filterTocByOwnership` is not exported.

- [ ] **Step 3: Implement filterTocByOwnership in generate_combined.js**

Add after the `resolveFile` function (after line 215):

```js
function filterTocByOwnership(toc, ownedSet) {
  return toc.filter((e) => ownedSet.has(e.contentId));
}
```

Update `module.exports` on line 345:

```js
module.exports = { promoteKeywordsToHeadings, computeBuckets, resolveFile, filterTocByOwnership };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/generate_combined.test.js`
Expected: PASS (all tests including new ones)

- [ ] **Step 5: Add test — normalizeTitle handles edge cases**

Add to `scripts/compute_ownership.test.js`:

```js
const { normalizeTitle } = require("./compute_ownership.js");

describe("normalizeTitle", () => {
  it("lowercases and strips non-alphanumeric characters", () => {
    assert.equal(normalizeTitle("Set Up  Users & Roles!"), "set up users roles");
  });

  it("normalizes hyphens and mixed whitespace", () => {
    assert.equal(normalizeTitle("set-up users & roles"), "set up users roles");
  });

  it("handles empty string", () => {
    assert.equal(normalizeTitle(""), "");
  });

  it("handles string with only special characters", () => {
    assert.equal(normalizeTitle("---!!!"), "");
  });
});
```

- [ ] **Step 6: Run test — should pass**

Run: `node --test scripts/compute_ownership.test.js`
Expected: PASS

- [ ] **Step 7: Add test — computeBuckets works correctly on pre-filtered TOCs**

```js
  it("computeBuckets produces correct results on pre-filtered (reduced) TOCs", () => {
    const entry = (contentId, title, depth) => ({ contentId, title, depth });

    // Simulate a pre-filtered Cloud TOC where XDR-owned topics have been removed
    const posture = [entry("pr-1", "Platform Topic", 0), entry("p-1", "Posture Only", 1)];
    const runtime = [entry("pr-1", "Platform Topic", 0), entry("r-1", "Runtime Only", 1)];
    const appsec = [entry("pra-1", "All Three", 0)];

    // pra-1 is NOT in posture or runtime (simulating it was removed by global dedup)
    // This should still work — computeBuckets sees it as AppSec-only
    const result = computeBuckets(posture, runtime, appsec);

    assert.ok(result.A.has("pra-1"));
    assert.ok(result.PR.has("pr-1"));
    assert.ok(result.R.has("r-1"));
    assert.ok(result.P.has("p-1"));
  });
```

- [ ] **Step 8: Run test to verify it passes**

Run: `node --test scripts/generate_combined.test.js`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add scripts/generate_combined.js scripts/generate_combined.test.js scripts/compute_ownership.test.js
git commit -m "feat: add filterTocByOwnership function, normalizeTitle tests, and pre-filtered buckets test"
```

- [ ] **Step 10: Add ownership manifest loading to main() in generate_combined.js**

First, update the top-level require on line 4 to include the new config constants:

```js
const { MAP_IDS, COMBINED_FILES, PRODUCTS, VALID_MAPS, DEDUP_HIERARCHY, DEDUP_EXCLUDED, resolveTargetMaps } = require("./map_config.js");
```

Then add at the top of `main()`, immediately after the `const targets = resolveTargetMaps();` line (originally line 218, but shifted after Step 3), before the file loading:

```js
  // Load ownership manifest
  const ownershipPath = path.join(__dirname, "..", "metadata", "ownership.json");
  let ownership;
  try {
    ownership = JSON.parse(fs.readFileSync(ownershipPath, "utf-8"));
  } catch (err) {
    console.error("Error: metadata/ownership.json not found — run `npm run ownership` first");
    process.exit(1);
  }

  // Build product -> Set<ownedContentId> lookup
  const ownedByProduct = {};
  for (const [product, ids] of Object.entries(ownership.owned)) {
    ownedByProduct[product] = new Set(ids);
  }

  // Build map -> product lookup for filtering
  const mapToProduct = {};
  for (const product of DEDUP_HIERARCHY) {
    for (const mapName of PRODUCTS[product]) {
      if (!DEDUP_EXCLUDED.includes(mapName)) {
        mapToProduct[mapName] = product;
      }
    }
  }
```

- [ ] **Step 11: Apply ownership pre-filter to Cloud dedup path**

In the Cloud dedup section (around line 259-313), after fetching and flattening the 3 TOCs but before calling `computeBuckets()`, filter by ownership:

Replace lines 267-270 with:

```js
    const cloudOwned = ownedByProduct["cloud"] || new Set();
    const appsecFlat  = filterTocByOwnership(flattenToc(appsecToc), cloudOwned);
    const postureFlat = filterTocByOwnership(flattenToc(postureToc), cloudOwned);
    const runtimeFlat = filterTocByOwnership(flattenToc(runtimeToc), cloudOwned);
    console.log(`TOCs after ownership filter: appsec=${appsecFlat.length}, posture=${postureFlat.length}, runtime=${runtimeFlat.length}`);
```

- [ ] **Step 12: Apply ownership pre-filter to simple maps path**

In the simple maps section (around line 317-342), after flattening the TOC, filter by ownership if the map participates in dedup:

Replace line 320-321 with:

```js
    const tocRaw = flattenToc(toc);
    const product = mapToProduct[target];
    const tocFlat = product && ownedByProduct[product]
      ? filterTocByOwnership(tocRaw, ownedByProduct[product])
      : tocRaw;
    console.log(`[${target}] ${tocFlat.length} entries${product ? " after ownership filter" : ""}`);
```

- [ ] **Step 13: Run all tests**

Run: `npm test`
Expected: All pass. The ownership manifest loading is inside `main()` which only runs via CLI, not during tests.

- [ ] **Step 14: Commit**

```bash
git add scripts/generate_combined.js
git commit -m "feat: integrate ownership manifest filtering into generate_combined"
```

---

### Task 5: Update check.js --apply flow to run ownership first

**Files:**
- Modify: `scripts/check.js:168-185`

- [ ] **Step 1: Add ownership step before product re-fetches**

In `main()`, in the `--apply` block (line 168), add an ownership recompute before the per-product loop. Replace lines 168-185 (the entire `if (apply) { ... }` block) with:

```js
  if (apply) {
    const changed = Object.entries(report.products)
      .filter(([, data]) => data.changed)
      .map(([name]) => name);

    if (changed.length > 0) {
      console.log("\n=== Recomputing ownership ===\n");
      try {
        execSync("npm run ownership", {
          cwd: path.join(__dirname, ".."),
          stdio: "inherit",
        });
      } catch (err) {
        console.error("FAILED: ownership recompute");
        hasErrors = true;
      }
    }

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
```

- [ ] **Step 2: Run existing check.js tests**

Run: `node --test scripts/check.test.js`
Expected: All pass (the --apply flow is CLI-only, not unit tested).

- [ ] **Step 3: Commit**

```bash
git add scripts/check.js
git commit -m "feat: run ownership recompute before re-fetch in check --apply"
```

---

### Task 6: End-to-end verification

**Files:** None (verification only)

- [ ] **Step 1: Run full test suite**

Run: `npm test`
Expected: All tests pass across all test files.

- [ ] **Step 2: Run ownership computation against live API**

Run: `npm run ownership`
Expected: Prints per-product ownership stats and writes `metadata/ownership.json`. XDR should own ~1108, Cloud ~980, XSIAM ~500, Agentix ~45.

- [ ] **Step 3: Verify manifest structure**

Run: `node -e "const o = require('./metadata/ownership.json'); console.log('hierarchy:', o.meta.hierarchy); for (const [k,v] of Object.entries(o.stats)) console.log(k, v);"`
Expected: Shows hierarchy `["xdr", "cloud", "xsiam", "agentix"]` and stats for each product.

- [ ] **Step 4: Commit the generated manifest**

```bash
git add metadata/ownership.json
git commit -m "feat: add generated ownership manifest"
```

- [ ] **Step 5: Run combine for one product to verify filtering works**

Run: `npm run combine:xsiam`
Expected: XSIAM combined file is generated with ~500 topics (down from ~1594). Console shows "after ownership filter" in the log.

- [ ] **Step 6: Run full combine to verify all products**

Run: `npm run combine`
Expected: All products generate combined files. Cloud maps show reduced topic counts. XDR is unchanged. Gateway and XDR Compatibility are unaffected.

- [ ] **Step 7: Final commit (if any unstaged changes remain)**

```bash
git status
```

Stage only relevant changed files explicitly (e.g. `git add sources_combined/...`), then:

```bash
git commit -m "feat: global cross-product deduplication complete"
```
