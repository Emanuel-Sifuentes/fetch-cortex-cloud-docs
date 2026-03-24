# Remove Global Cross-Product Deduplication — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the global cross-product deduplication so each product retains its full TOC in combined output, while keeping Cortex Cloud-internal bucketing.

**Architecture:** Delete `compute_ownership.js`, `compute_ownership.test.js`, `overlap_report.js`, and `metadata/ownership.json`. Strip ownership-related code from `generate_combined.js`, `map_config.js`, `check.js`, and `package.json`. Update `README.md` to reflect the simplified pipeline. Tests stay green throughout.

**Tech Stack:** Node.js, `node --test` built-in test runner

**Spec:** `docs/superpowers/specs/2026-03-23-remove-global-dedup-design.md`

---

### Task 1: Delete ownership and overlap files

**Files:**
- Delete: `scripts/compute_ownership.js`
- Delete: `scripts/compute_ownership.test.js`
- Delete: `scripts/overlap_report.js`
- Delete: `metadata/ownership.json`

- [ ] **Step 1: Delete the four files**

```bash
rm scripts/compute_ownership.js scripts/compute_ownership.test.js scripts/overlap_report.js metadata/ownership.json
```

- [ ] **Step 2: Commit**

```bash
git add -u scripts/compute_ownership.js scripts/compute_ownership.test.js scripts/overlap_report.js metadata/ownership.json
git commit -m "chore: delete global dedup and overlap report files"
```

---

### Task 2: Remove dedup constants from map_config.js

**Files:**
- Modify: `scripts/map_config.js:32-35` (delete `DEDUP_HIERARCHY` and `DEDUP_EXCLUDED`)
- Modify: `scripts/map_config.js:68` (remove from `module.exports`)

- [ ] **Step 1: Remove `DEDUP_HIERARCHY` constant and its comment (lines 31-32)**

Delete:
```js
// Product keys — priority order for global dedup (highest first)
const DEDUP_HIERARCHY = ["xdr", "cloud", "xsiam", "agentix"];
```

- [ ] **Step 2: Remove `DEDUP_EXCLUDED` constant and its comment (lines 34-35)**

Delete:
```js
// Map keys — excluded from dedup, processed as simple maps
const DEDUP_EXCLUDED = ["cortex_gateway", "xdr_compatibility"];
```

- [ ] **Step 3: Remove both from `module.exports` (line 68)**

Change:
```js
module.exports = { MAP_IDS, COMBINED_FILES, PRODUCTS, VALID_MAPS, VALID_PRODUCTS, DEDUP_HIERARCHY, DEDUP_EXCLUDED, parseMapFlag, parseProductFlag, resolveTargetMaps };
```

To:
```js
module.exports = { MAP_IDS, COMBINED_FILES, PRODUCTS, VALID_MAPS, VALID_PRODUCTS, parseMapFlag, parseProductFlag, resolveTargetMaps };
```

- [ ] **Step 4: Commit**

```bash
git add scripts/map_config.js
git commit -m "refactor(map_config): remove DEDUP_HIERARCHY and DEDUP_EXCLUDED"
```

---

### Task 3: Remove ownership logic from generate_combined.js

**Files:**
- Modify: `scripts/generate_combined.js:1` (remove `PRODUCTS`, `DEDUP_HIERARCHY`, `DEDUP_EXCLUDED` from require)
- Modify: `scripts/generate_combined.js:217-219` (delete `filterTocByOwnership`)
- Modify: `scripts/generate_combined.js:221-252` (delete ownership manifest loading + lookup builders)
- Modify: `scripts/generate_combined.js:301-305` (remove ownership pre-filtering on Cloud TOCs)
- Modify: `scripts/generate_combined.js:356-360` (remove ownership pre-filtering on simple maps)
- Modify: `scripts/generate_combined.js:384` (remove `filterTocByOwnership` from exports)

- [ ] **Step 1: Update the require import (line 4)**

Change:
```js
const { MAP_IDS, COMBINED_FILES, PRODUCTS, VALID_MAPS, DEDUP_HIERARCHY, DEDUP_EXCLUDED, resolveTargetMaps } = require("./map_config.js");
```

To:
```js
const { MAP_IDS, COMBINED_FILES, VALID_MAPS, resolveTargetMaps } = require("./map_config.js");
```

- [ ] **Step 2: Delete the `filterTocByOwnership` function (lines 217-219)**

Delete:
```js
function filterTocByOwnership(toc, ownedSet) {
  return toc.filter((e) => ownedSet.has(e.contentId));
}
```

- [ ] **Step 3: Delete the ownership manifest loading block in `main()` (lines 224-252)**

Delete the entire block from `// Load ownership manifest` through the `mapToProduct` builder:
```js
  // Load ownership manifest
  const ownershipPath = path.join(__dirname, "..", "metadata", "ownership.json");
  let ownership;
  try {
    ownership = JSON.parse(fs.readFileSync(ownershipPath, "utf-8"));
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("Error: metadata/ownership.json not found — run `npm run ownership` first");
    } else {
      console.error("Error: metadata/ownership.json is malformed:", err.message);
    }
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

- [ ] **Step 4: Replace ownership-filtered Cloud TOCs with direct flattenToc calls (lines 301-305)**

Change:
```js
    const cloudOwned = ownedByProduct["cloud"] || new Set();
    const appsecFlat  = filterTocByOwnership(flattenToc(appsecToc), cloudOwned);
    const postureFlat = filterTocByOwnership(flattenToc(postureToc), cloudOwned);
    const runtimeFlat = filterTocByOwnership(flattenToc(runtimeToc), cloudOwned);
    console.log(`TOCs after ownership filter: appsec=${appsecFlat.length}, posture=${postureFlat.length}, runtime=${runtimeFlat.length}`);
```

To:
```js
    const appsecFlat  = flattenToc(appsecToc);
    const postureFlat = flattenToc(postureToc);
    const runtimeFlat = flattenToc(runtimeToc);
    console.log(`TOCs: appsec=${appsecFlat.length}, posture=${postureFlat.length}, runtime=${runtimeFlat.length}`);
```

- [ ] **Step 5: Replace ownership-filtered simple maps with direct flattenToc (lines 356-360)**

Change:
```js
    const tocRaw = flattenToc(toc);
    const product = mapToProduct[target];
    const tocFlat = product && ownedByProduct[product]
      ? filterTocByOwnership(tocRaw, ownedByProduct[product])
      : tocRaw;
    console.log(`[${target}] ${tocFlat.length} entries${product ? " after ownership filter" : ""}`);
```

To:
```js
    const tocFlat = flattenToc(toc);
    console.log(`[${target}] ${tocFlat.length} entries`);
```

- [ ] **Step 6: Remove `filterTocByOwnership` from module.exports (line 384)**

Change:
```js
module.exports = { promoteKeywordsToHeadings, computeBuckets, resolveFile, filterTocByOwnership };
```

To:
```js
module.exports = { promoteKeywordsToHeadings, computeBuckets, resolveFile };
```

- [ ] **Step 7: Commit**

```bash
git add scripts/generate_combined.js
git commit -m "refactor(generate_combined): remove ownership manifest loading and filtering"
```

---

### Task 4: Remove filterTocByOwnership tests

**Files:**
- Modify: `scripts/generate_combined.test.js:4` (remove `filterTocByOwnership` from import)
- Modify: `scripts/generate_combined.test.js:436-465` (delete describe block)

- [ ] **Step 1: Remove `filterTocByOwnership` from the require import (line 4)**

Change:
```js
const {
  promoteKeywordsToHeadings,
  computeBuckets,
  resolveFile,
  filterTocByOwnership,
} = require("./generate_combined.js");
```

To:
```js
const {
  promoteKeywordsToHeadings,
  computeBuckets,
  resolveFile,
} = require("./generate_combined.js");
```

- [ ] **Step 2: Delete the entire `filterTocByOwnership` describe block (lines 436-465)**

Delete:
```js
describe("filterTocByOwnership", () => {
  ...entire block...
});
```

- [ ] **Step 3: Run the tests**

```bash
node --test scripts/generate_combined.test.js
```

Expected: All remaining tests pass (promoteKeywordsToHeadings, computeBuckets, resolveFile).

- [ ] **Step 4: Commit**

```bash
git add scripts/generate_combined.test.js
git commit -m "test: remove filterTocByOwnership tests"
```

---

### Task 5: Remove ownership recompute from check.js

**Files:**
- Modify: `scripts/check.js:1` (remove unused `path` import if no longer needed)
- Modify: `scripts/check.js:173-184` (delete ownership recompute block)

- [ ] **Step 1: Delete the ownership recompute block (lines 173-184)**

Delete:
```js
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
```

- [ ] **Step 2: Check if `path` is still used elsewhere in check.js**

`path` is used on line 189: `cwd: path.join(__dirname, "..")` — so keep the import.

Check if `execSync` is still used on line 189 — yes, it is. Keep the `{ execSync }` import too.

- [ ] **Step 3: Run check.js tests**

```bash
node --test scripts/check.test.js
```

Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add scripts/check.js
git commit -m "refactor(check): remove ownership recompute from --apply path"
```

---

### Task 6: Clean up package.json

**Files:**
- Modify: `package.json:43` (remove `"ownership"` script)
- Modify: `package.json:47` (remove `compute_ownership.test.js` from `"test"` script)

- [ ] **Step 1: Remove the `"ownership"` script (line 43)**

Delete:
```json
    "ownership": "node scripts/compute_ownership.js",
```

- [ ] **Step 2: Remove `scripts/compute_ownership.test.js` from the `"test"` script (line 47)**

Change:
```json
    "test": "node --test scripts/generate_combined.test.js scripts/fetch_fluidtopics.test.js scripts/snapshot.test.js scripts/check.test.js scripts/compute_ownership.test.js"
```

To:
```json
    "test": "node --test scripts/generate_combined.test.js scripts/fetch_fluidtopics.test.js scripts/snapshot.test.js scripts/check.test.js"
```

- [ ] **Step 3: Run the full test suite**

```bash
npm test
```

Expected: All tests pass (no reference to deleted files).

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "chore(package.json): remove ownership script and test reference"
```

---

### Task 7: Update README.md

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Remove `npm run ownership` from Quick start (line 19)**

Delete:
```
npm run ownership        # compute cross-product topic ownership
```

- [ ] **Step 2: Update "What it does" paragraph (line 41)**

Replace:
```
Topics are globally deduplicated across all products using a fixed priority hierarchy (XDR > Cloud > XSIAM > Agentix). Each topic appears in exactly one product's combined output, owned by the highest-priority product that contains it. Matching is by `contentId` first, then by normalized title. Cortex Cloud maps (appsec, posture, runtime) are additionally deduplicated against each other using PRA/PR/R/P/A bucketing. Gateway and XDR Compatibility are excluded from global dedup (100% isolated content).
```

With:
```
Cortex Cloud maps (appsec, posture, runtime) are deduplicated against each other using PRA/PR/R/P/A bucketing with runtime as the canonical source. All other products retain their full TOC in combined output.
```

- [ ] **Step 3: Remove `npm run ownership` row from Scripts table (line 52)**

Delete:
```
| `npm run ownership` | Compute cross-product topic ownership manifest (`metadata/ownership.json`) |
```

- [ ] **Step 4: Remove overlap report row from Scripts table (line 58)**

Delete:
```
| `node scripts/overlap_report.js` | Generate cross-product overlap report (CSV) |
```

- [ ] **Step 5: Update `--apply` description (line 75)**

Change:
```
The `--apply` flag recomputes topic ownership and then triggers a full `fetch` + `fix` cycle for affected products only.
```

To:
```
The `--apply` flag triggers a full `fetch` + `fix` cycle for affected products only.
```

- [ ] **Step 6: Remove Overlap report section (lines 77-84)**

Delete the entire "## Overlap report" section:
```markdown
## Overlap report

`node scripts/overlap_report.js` reads all product metadata and individual topic files to produce a pairwise overlap report across all maps. It outputs two CSVs:

- **`overlap_report.csv`** — one row per overlapping topic pair, sorted by heading depth. Columns: match type (`contentId` or `title`), depths, Jaccard bag-of-words similarity score (1.0 for contentId matches; computed from file content for title matches), products, maps, titles, and content IDs.
- **`overlap_report_summary.csv`** — product-pair breakdown, similarity distribution, and depth distribution.

Use `--out path/to/file.csv` to change the output location.
```

- [ ] **Step 7: Update generate_combined.js description in project structure (line 141)**

Change:
```
│   ├── generate_combined.js           # combined file builder (reads ownership manifest)
```

To:
```
│   ├── generate_combined.js           # combined file builder
```

- [ ] **Step 8: Remove compute_ownership.js from project structure (line 142)**

Delete:
```
│   ├── compute_ownership.js           # cross-product topic ownership (XDR > Cloud > XSIAM > Agentix)
```

- [ ] **Step 9: Remove overlap_report.js from project structure (line 147)**

Delete:
```
│   ├── overlap_report.js              # cross-product overlap CSV report
```

- [ ] **Step 10: Update metadata/ description in project structure (line 151)**

Change:
```
├── metadata/                          # per-product snapshots + ownership.json
```

To:
```
├── metadata/                          # per-product snapshots
```

- [ ] **Step 11: Commit**

```bash
git add README.md
git commit -m "docs: update README to reflect removal of global dedup"
```
