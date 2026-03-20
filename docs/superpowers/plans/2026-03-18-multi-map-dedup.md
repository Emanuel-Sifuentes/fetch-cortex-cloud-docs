# Multi-Map Deduplicated Combined Markdown — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce 3 deduplicated combined markdown files (appsec, posture, runtime) from a single set of fetched topics, with no content overlap across files.

**Architecture:** Fetch all topics from Runtime (canonical source) + 7 Posture-unique topics into `sources_fetch/`. At combine time, fetch all 3 TOCs, compute content-ID buckets (PRA/PR/R/P/A) and title-match pairs, then produce 3 combined files — each filtered to its bucket and ordered by its own TOC.

**Tech Stack:** Node.js (CommonJS), node:test for testing, no new dependencies.

---

## File Structure

| File | Responsibility | Change |
|------|---------------|--------|
| `scripts/generate_combined.js` | Combine step: bucketing, file resolution, 3-file output | Modify — add `computeBuckets()`, `resolveFile()`, multi-file generation, `--map` CLI |
| `scripts/generate_combined.test.js` | Unit tests for combine logic | Modify — add tests for `computeBuckets()` and `resolveFile()` |
| `scripts/fetch_fluidtopics.js` | Fetch step: download topics from API | Modify — swap to Runtime MAP_ID, add Posture supplement, `--map` CLI, 4-digit padding |
| `scripts/audit_headings.js` | Audit heading levels in source files | Modify — add `--map` CLI with MAP_ID lookup |
| `scripts/audit_toc_vs_headings.js` | Audit TOC vs combined file headings | Modify — add `--map` CLI with MAP_ID lookup |
| `scripts/generate_toc_table.js` | Print TOC tree | Modify — add `--map` CLI with MAP_ID lookup |
| `scripts/fix_escaped_chars_in_fences.py` | Fix escaped chars inside code fences | Modify — add directory input support (glob `*.md`) |
| `package.json` | npm scripts | Modify — update `fix` script to remove hardcoded `216-*` path |

No new files are created (aside from the plan itself).

---

## Task 1: `computeBuckets()` — Tests

**Files:**
- Test: `scripts/generate_combined.test.js`

- [ ] **Step 1: Write failing test — contentIds in all 3 TOCs land in PRA**

```js
const { computeBuckets } = require("./generate_combined.js");

describe("computeBuckets", () => {
  it("places contentIds present in all 3 TOCs into PRA", () => {
    const appsec  = [{ contentId: "shared", title: "Shared Topic", depth: 0 }];
    const posture = [{ contentId: "shared", title: "Shared Topic", depth: 0 }];
    const runtime = [{ contentId: "shared", title: "Shared Topic", depth: 0 }];

    const buckets = computeBuckets(posture, runtime, appsec);

    assert.ok(buckets.PRA.has("shared"));
    assert.ok(!buckets.PR.has("shared"));
    assert.ok(!buckets.R.has("shared"));
    assert.ok(!buckets.P.has("shared"));
    assert.ok(!buckets.A.has("shared"));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/generate_combined.test.js`
Expected: FAIL — `computeBuckets is not a function` or similar

- [ ] **Step 3: Write failing test — contentIds in Posture + Runtime but not AppSec land in PR**

```js
it("places contentIds in Posture + Runtime but not AppSec into PR", () => {
  const appsec  = [];
  const posture = [{ contentId: "platform", title: "Platform Topic", depth: 0 }];
  const runtime = [{ contentId: "platform", title: "Platform Topic", depth: 0 }];

  const buckets = computeBuckets(posture, runtime, appsec);

  assert.ok(buckets.PR.has("platform"));
  assert.ok(!buckets.PRA.has("platform"));
  assert.ok(!buckets.R.has("platform"));
});
```

- [ ] **Step 4: Write failing test — contentIds only in Runtime land in R**

```js
it("places contentIds only in Runtime into R", () => {
  const appsec  = [];
  const posture = [];
  const runtime = [{ contentId: "rtOnly", title: "Runtime Only", depth: 0 }];

  const buckets = computeBuckets(posture, runtime, appsec);

  assert.ok(buckets.R.has("rtOnly"));
  assert.ok(!buckets.PR.has("rtOnly"));
  assert.ok(!buckets.PRA.has("rtOnly"));
});
```

- [ ] **Step 5: Write failing test — contentIds only in Posture land in P**

```js
it("places contentIds only in Posture into P", () => {
  const appsec  = [];
  const posture = [{ contentId: "posOnly", title: "Posture Only", depth: 0 }];
  const runtime = [];

  const buckets = computeBuckets(posture, runtime, appsec);

  assert.ok(buckets.P.has("posOnly"));
});
```

- [ ] **Step 6: Write failing test — AppSec-only contentId lands in A**

```js
it("places contentIds only in AppSec into A", () => {
  const appsec  = [{ contentId: "appRoot", title: "AppSec Root", depth: 0 }];
  const posture = [];
  const runtime = [];

  const buckets = computeBuckets(posture, runtime, appsec);

  assert.ok(buckets.A.has("appRoot"));
});
```

- [ ] **Step 7: Write failing test — title-matched pairs are correctly identified**

A Posture-only contentId whose title matches a Runtime contentId's title should appear in `titleMatched` as `postureContentId → runtimeContentId`, and should NOT appear in `P`.

```js
it("identifies title-matched pairs between Posture and Runtime", () => {
  const appsec  = [];
  const posture = [{ contentId: "pos-123", title: "Container Scanning", depth: 2 }];
  const runtime = [{ contentId: "rt-456", title: "Container Scanning", depth: 3 }];

  const buckets = computeBuckets(posture, runtime, appsec);

  assert.equal(buckets.titleMatched.get("pos-123"), "rt-456");
  assert.ok(!buckets.P.has("pos-123"));
});
```

- [ ] **Step 8: Write failing test — title match picks closest depth when multiple Runtime entries share a title**

```js
it("picks the Runtime entry with closest depth for title matches", () => {
  const appsec  = [];
  const posture = [{ contentId: "pos-x", title: "Duplicate Title", depth: 2 }];
  const runtime = [
    { contentId: "rt-far",  title: "Duplicate Title", depth: 5 },
    { contentId: "rt-near", title: "Duplicate Title", depth: 2 },
  ];

  const buckets = computeBuckets(posture, runtime, appsec);

  assert.equal(buckets.titleMatched.get("pos-x"), "rt-near");
});
```

- [ ] **Step 9: Write failing test — comprehensive bucket assignment with mixed entries**

```js
it("correctly assigns all buckets in a mixed scenario", () => {
  const appsec = [
    { contentId: "pra1", title: "PRA Topic", depth: 0 },
    { contentId: "aOnly", title: "AppSec Root", depth: 0 },
  ];
  const posture = [
    { contentId: "pra1", title: "PRA Topic", depth: 0 },
    { contentId: "pr1", title: "PR Topic", depth: 1 },
    { contentId: "pos-tm", title: "Title Matched", depth: 2 },
    { contentId: "pUniq", title: "Posture Unique", depth: 1 },
  ];
  const runtime = [
    { contentId: "pra1", title: "PRA Topic", depth: 0 },
    { contentId: "pr1", title: "PR Topic", depth: 1 },
    { contentId: "rt-tm", title: "Title Matched", depth: 2 },
    { contentId: "rOnly", title: "Runtime Only", depth: 3 },
  ];

  const buckets = computeBuckets(posture, runtime, appsec);

  assert.ok(buckets.PRA.has("pra1"));
  assert.ok(buckets.PR.has("pr1"));
  assert.ok(buckets.R.has("rOnly"));
  assert.ok(buckets.P.has("pUniq"));
  assert.ok(buckets.A.has("aOnly"));
  assert.equal(buckets.titleMatched.get("pos-tm"), "rt-tm");
  assert.equal(buckets.titleMatched.size, 1);
});
```

- [ ] **Step 10: Commit tests**

```bash
git add scripts/generate_combined.test.js
git commit -m "test: add computeBuckets() test cases"
```

---

## Task 2: `computeBuckets()` — Implementation

**Files:**
- Modify: `scripts/generate_combined.js`

- [ ] **Step 1: Implement `computeBuckets()`**

Add this function to `scripts/generate_combined.js` and export it. Place it after the existing `promoteKeywordsToHeadings` function, before `main()`.

```js
function computeBuckets(postureToc, runtimeToc, appsecToc) {
  const postureIds = new Set(postureToc.map((e) => e.contentId));
  const runtimeIds = new Set(runtimeToc.map((e) => e.contentId));
  const appsecIds  = new Set(appsecToc.map((e) => e.contentId));

  const PRA = new Set();
  const PR  = new Set();
  const R   = new Set();
  const P   = new Set();
  const A   = new Set();
  const titleMatched = new Map();

  for (const id of appsecIds) {
    if (postureIds.has(id) && runtimeIds.has(id)) PRA.add(id);
    else A.add(id);
  }

  for (const id of runtimeIds) {
    if (appsecIds.has(id)) continue;
    if (postureIds.has(id)) PR.add(id);
    else R.add(id);
  }

  const postureOnlyIds = [];
  for (const id of postureIds) {
    if (!appsecIds.has(id) && !runtimeIds.has(id)) {
      postureOnlyIds.push(id);
    }
  }

  const runtimeByTitle = new Map();
  for (const entry of runtimeToc) {
    if (!runtimeByTitle.has(entry.title)) {
      runtimeByTitle.set(entry.title, []);
    }
    runtimeByTitle.get(entry.title).push(entry);
  }

  const postureTocMap = new Map();
  for (const entry of postureToc) {
    if (!postureTocMap.has(entry.contentId)) {
      postureTocMap.set(entry.contentId, entry);
    }
  }

  for (const id of postureOnlyIds) {
    const postureEntry = postureTocMap.get(id);
    const candidates = runtimeByTitle.get(postureEntry.title);
    if (candidates && candidates.length > 0) {
      const best = candidates.reduce((a, b) =>
        Math.abs(a.depth - postureEntry.depth) <= Math.abs(b.depth - postureEntry.depth) ? a : b
      );
      titleMatched.set(id, best.contentId);
    } else {
      P.add(id);
    }
  }

  return { PRA, PR, R, P, A, titleMatched };
}
```

Update the `module.exports` line:

```js
module.exports = { promoteKeywordsToHeadings, computeBuckets };
```

- [ ] **Step 2: Run tests to verify they pass**

Run: `node --test scripts/generate_combined.test.js`
Expected: All `computeBuckets` tests PASS, existing `promoteKeywordsToHeadings` tests still PASS.

- [ ] **Step 3: Commit**

```bash
git add scripts/generate_combined.js
git commit -m "feat: add computeBuckets() for multi-map content deduplication"
```

---

## Task 3: `resolveFile()` — Tests

**Files:**
- Test: `scripts/generate_combined.test.js`

- [ ] **Step 1: Write failing test — direct contentId match returns the file**

```js
const { resolveFile } = require("./generate_combined.js");

describe("resolveFile", () => {
  it("returns the file for a direct contentId match", () => {
    const fileMap = { "abc": { filename: "001-Topic.md", content: "# Topic" } };
    const titleMatchMap = new Map();

    const result = resolveFile("abc", titleMatchMap, fileMap);

    assert.deepEqual(result, { filename: "001-Topic.md", content: "# Topic" });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/generate_combined.test.js`
Expected: FAIL — `resolveFile is not a function`

- [ ] **Step 3: Write failing test — fallback to title-match lookup**

```js
it("falls back to title-match lookup when contentId not in fileMap", () => {
  const fileMap = { "rt-456": { filename: "042-Scanning.md", content: "# Scanning" } };
  const titleMatchMap = new Map([["pos-123", "rt-456"]]);

  const result = resolveFile("pos-123", titleMatchMap, fileMap);

  assert.deepEqual(result, { filename: "042-Scanning.md", content: "# Scanning" });
});
```

- [ ] **Step 4: Write failing test — returns null for unresolvable entries**

```js
it("returns null when contentId cannot be resolved", () => {
  const fileMap = {};
  const titleMatchMap = new Map();

  const result = resolveFile("missing-id", titleMatchMap, fileMap);

  assert.equal(result, null);
});
```

- [ ] **Step 5: Commit tests**

```bash
git add scripts/generate_combined.test.js
git commit -m "test: add resolveFile() test cases"
```

---

## Task 4: `resolveFile()` — Implementation

**Files:**
- Modify: `scripts/generate_combined.js`

- [ ] **Step 1: Implement `resolveFile()`**

Add this function after `computeBuckets()`:

```js
function resolveFile(contentId, titleMatchMap, fileMap) {
  if (fileMap[contentId]) return fileMap[contentId];
  const mapped = titleMatchMap.get(contentId);
  if (mapped && fileMap[mapped]) return fileMap[mapped];
  return null;
}
```

Update the `module.exports` line:

```js
module.exports = { promoteKeywordsToHeadings, computeBuckets, resolveFile };
```

- [ ] **Step 2: Run tests to verify they pass**

Run: `node --test scripts/generate_combined.test.js`
Expected: All tests PASS.

- [ ] **Step 3: Commit**

```bash
git add scripts/generate_combined.js
git commit -m "feat: add resolveFile() with title-match fallback"
```

---

## Task 5: `generate_combined.js` — Multi-file output + `--map` CLI

**Files:**
- Modify: `scripts/generate_combined.js`

This task wires up the bucketing and file resolution into the main combine flow and adds the `--map` CLI flag. This is integration work — the pure functions are already tested.

- [ ] **Step 1: Add MAP_ID constants and output file config at top of file**

Replace the existing `MAP_ID` and `COMBINED_FILE` constants:

```js
const MAP_IDS = {
  appsec:  "aUsxSwBeRrRs3Jm36XHckg",
  posture: "BNCvOg6pEdBp~axnn92pBQ",
  runtime: "bKDBlplrokDJKA~h8O9o6A",
};

const OUTPUT_FILES = {
  appsec:  "cortex-cloud-appsec-combined.md",
  posture: "cortex-cloud-posture-combined.md",
  runtime: "cortex-cloud-runtime-combined.md",
};
```

- [ ] **Step 2: Add `--map` CLI flag parsing**

Add after the constants, before `main()`:

```js
function parseMapFlag() {
  const idx = process.argv.indexOf("--map");
  if (idx === -1 || idx + 1 >= process.argv.length) return "all";
  return process.argv[idx + 1];
}
```

- [ ] **Step 3: Update source file regex to support 3-4 digit prefixes**

In `main()`, change the file filter from:

```js
.filter((f) => /^\d{3}-/.test(f) && f.endsWith(".md"))
```

to:

```js
.filter((f) => /^\d+-/.test(f) && f.endsWith(".md"))
```

- [ ] **Step 4: Rewrite `main()` to fetch 3 TOCs, compute buckets, and produce output files**

Replace the existing `main()` body. The new `main()`:

1. Parses `--map` flag
2. Reads local source files and builds `fileMap` (contentId → file data)
3. Fetches all 3 TOCs (always, regardless of `--map` value — needed for bucketing)
4. Calls `computeBuckets()` to get bucket sets and title-match map
5. For each target map (filtered by `--map`), iterates the relevant TOC, filters to the target bucket's contentIds, resolves files, strips frontmatter, shifts headings, promotes keywords, and writes the combined output

The bucket-to-TOC mapping:
- **appsec:** filter AppSec TOC to `PRA ∪ A` contentIds
- **posture:** filter Posture TOC to `PR ∪ P` contentIds (use `titleMatchMap` for file resolution of title-matched entries)
- **runtime:** filter Runtime TOC to `R` contentIds

```js
async function main() {
  const mapFlag = parseMapFlag();
  const targets = mapFlag === "all"
    ? ["appsec", "posture", "runtime"]
    : [mapFlag];

  if (!fs.existsSync(OUT_DIR)) {
    console.error(`Error: ${OUT_DIR} not found — run \`npm run fetch\` first`);
    process.exit(1);
  }
  const files = fs
    .readdirSync(OUT_DIR)
    .filter((f) => /^\d+-/.test(f) && f.endsWith(".md"))
    .sort();
  if (files.length === 0) {
    console.error(`Error: No source files found in ${OUT_DIR} — run \`npm run fetch\` first`);
    process.exit(1);
  }

  const fileMap = {};
  for (const f of files) {
    const content = fs.readFileSync(path.join(OUT_DIR, f), "utf-8");
    const contentId = parseContentId(content);
    if (contentId) {
      fileMap[contentId] = { filename: f, content };
    } else {
      console.log(`WARNING: no contentId found in ${f}`);
    }
  }

  console.log("Fetching TOCs from API...");
  const [appsecToc, postureToc, runtimeToc] = await Promise.all([
    fetch(`/api/khub/maps/${MAP_IDS.appsec}/toc`),
    fetch(`/api/khub/maps/${MAP_IDS.posture}/toc`),
    fetch(`/api/khub/maps/${MAP_IDS.runtime}/toc`),
  ]);
  const appsecFlat  = flattenToc(appsecToc);
  const postureFlat = flattenToc(postureToc);
  const runtimeFlat = flattenToc(runtimeToc);

  const buckets = computeBuckets(postureFlat, runtimeFlat, appsecFlat);

  const tocForMap = { appsec: appsecFlat, posture: postureFlat, runtime: runtimeFlat };
  const bucketFilter = {
    appsec:  (id) => buckets.PRA.has(id) || buckets.A.has(id),
    posture: (id) => buckets.PR.has(id) || buckets.P.has(id) || buckets.titleMatched.has(id),
    runtime: (id) => buckets.R.has(id),
  };

  for (const target of targets) {
    const toc = tocForMap[target];
    const filter = bucketFilter[target];
    const sections = [];

    for (const entry of toc) {
      if (!filter(entry.contentId)) continue;
      const file = resolveFile(entry.contentId, buckets.titleMatched, fileMap);
      if (!file) {
        console.log(`WARNING: cannot resolve "${entry.title}" (${entry.contentId}) — skipping`);
        continue;
      }
      const md = stripFrontmatter(file.content);
      sections.push(shiftHeadings(md.trim(), entry.depth, file.filename));
    }

    const raw = sections.filter(Boolean).join("\n\n");
    const combined = promoteKeywordsToHeadings(raw);
    const outPath = path.join(OUT_DIR, OUTPUT_FILES[target]);
    fs.writeFileSync(outPath, combined + "\n", "utf-8");
    console.log(`${target}: ${outPath} (${sections.length} topics, ${combined.split("\n").length} lines)`);
  }
}
```

- [ ] **Step 5: Run tests to verify nothing is broken**

Run: `node --test scripts/generate_combined.test.js`
Expected: All tests PASS.

- [ ] **Step 6: Commit**

```bash
git add scripts/generate_combined.js
git commit -m "feat: generate_combined produces 3 deduplicated combined files with --map CLI"
```

---

## Task 6: `fetch_fluidtopics.js` — Swap to Runtime + Posture supplement

**Files:**
- Modify: `scripts/fetch_fluidtopics.js`

- [ ] **Step 1: Update MAP_ID default and add `--map` CLI flag parsing**

Replace the current `MAP_ID` constant and add flag parsing. The default fetch behavior is "all" (Runtime + Posture supplement).

At the top of the file, replace:

```js
const MAP_ID = "aUsxSwBeRrRs3Jm36XHckg";
```

with:

```js
const MAP_IDS = {
  appsec:  "aUsxSwBeRrRs3Jm36XHckg",
  posture: "BNCvOg6pEdBp~axnn92pBQ",
  runtime: "bKDBlplrokDJKA~h8O9o6A",
};
```

Add a `parseMapFlag()` function (same pattern as generate_combined.js):

```js
function parseMapFlag() {
  const idx = process.argv.indexOf("--map");
  if (idx === -1 || idx + 1 >= process.argv.length) return "all";
  return process.argv[idx + 1];
}
```

- [ ] **Step 2: Switch filename padding from 3 to 4 digits**

In `fetchTopic()`, change:

```js
const filename = `${String(index + 1).padStart(3, "0")}-${sanitizeFilename(topic.title)}.md`;
```

to:

```js
const filename = `${String(index + 1).padStart(4, "0")}-${sanitizeFilename(topic.title)}.md`;
```

- [ ] **Step 3: Update `fetchTopic()` to accept a `mapId` parameter instead of using the global `MAP_ID`**

Change the function signature and URL:

```js
async function fetchTopic(topic, index, total, mapId) {
  const contentUrl = `/api/khub/maps/${mapId}/topics/${topic.contentId}/content`;
```

- [ ] **Step 4: Add `sourceMap` frontmatter field for Posture-unique topics**

In `fetchTopic()`, add an optional `sourceMap` parameter. When `sourceMap` is provided, include it in the YAML frontmatter:

```js
async function fetchTopic(topic, index, total, mapId, sourceMap) {
  // ... existing fetch logic ...
  const header = [
    `---`,
    `title: "${topic.title.replace(/"/g, '\\"')}"`,
    `tocId: "${topic.tocId}"`,
    `contentId: "${topic.contentId}"`,
    `prettyUrl: "${topic.prettyUrl}"`,
    `depth: ${topic.depth}`,
    ...(sourceMap ? [`sourceMap: "${sourceMap}"`] : []),
    `---`,
    "",
    `# ${topic.title}`,
    "",
  ].join("\n");
```

- [ ] **Step 5: Rewrite `main()` to handle `--map` flag**

The new `main()`:
- `--map runtime` — fetches Runtime TOC, downloads all Runtime topics
- `--map posture` — fetches Posture + Runtime TOCs, finds the 7 Posture-unique contentIds (those in Posture but not in Runtime and not title-matched), fetches only those from the Posture map. Numbers them starting after the last Runtime topic file found in `sources_fetch/`.
- `--map appsec` — prints message that AppSec content comes from the Runtime fetch, exits
- `--map all` (default) — runs Runtime fetch, then Posture supplement

```js
async function main() {
  const mapFlag = parseMapFlag();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  if (mapFlag === "appsec") {
    console.log("AppSec content comes from the Runtime fetch. Run with --map runtime or no flag.");
    return;
  }

  if (mapFlag === "all" || mapFlag === "runtime") {
    console.log("Fetching Runtime TOC...");
    const tocJson = await fetch(`/api/khub/maps/${MAP_IDS.runtime}/toc`);
    const toc = JSON.parse(tocJson);
    const topics = flattenToc(toc);
    console.log(`Found ${topics.length} Runtime topics. Fetching content...\n`);

    for (let i = 0; i < topics.length; i += CONCURRENCY) {
      const batch = topics.slice(i, i + CONCURRENCY);
      await Promise.all(
        batch.map((topic, j) => fetchTopic(topic, i + j, topics.length, MAP_IDS.runtime))
      );
      if (i + CONCURRENCY < topics.length) await sleep(DELAY_MS);
    }
    console.log(`\nRuntime: ${topics.length} topics saved to ${OUT_DIR}`);
  }

  if (mapFlag === "all" || mapFlag === "posture") {
    console.log("\nFetching Posture + Runtime TOCs for supplement...");
    const [postureTocJson, runtimeTocJson] = await Promise.all([
      fetch(`/api/khub/maps/${MAP_IDS.posture}/toc`),
      fetch(`/api/khub/maps/${MAP_IDS.runtime}/toc`),
    ]);
    const postureToc = flattenToc(JSON.parse(postureTocJson));
    const runtimeToc = flattenToc(JSON.parse(runtimeTocJson));

    const runtimeIds = new Set(runtimeToc.map((e) => e.contentId));
    const runtimeTitles = new Set(runtimeToc.map((e) => e.title));
    const postureUnique = postureToc.filter(
      (e) => !runtimeIds.has(e.contentId) && !runtimeTitles.has(e.title)
    );
    const seen = new Set();
    const deduped = postureUnique.filter((e) => {
      if (seen.has(e.contentId)) return false;
      seen.add(e.contentId);
      return true;
    });

    if (deduped.length === 0) {
      console.log("No Posture-unique topics to fetch.");
    } else {
      const existingFiles = fs.readdirSync(OUT_DIR).filter((f) => /^\d+-/.test(f));
      const startIndex = existingFiles.length;

      console.log(`Found ${deduped.length} Posture-unique topics. Fetching...\n`);
      for (let i = 0; i < deduped.length; i += CONCURRENCY) {
        const batch = deduped.slice(i, i + CONCURRENCY);
        await Promise.all(
          batch.map((topic, j) =>
            fetchTopic(topic, startIndex + i + j, startIndex + deduped.length, MAP_IDS.posture, "posture")
          )
        );
        if (i + CONCURRENCY < deduped.length) await sleep(DELAY_MS);
      }
      console.log(`\nPosture supplement: ${deduped.length} topics saved to ${OUT_DIR}`);
    }
  }
}
```

- [ ] **Step 6: Run a quick sanity check**

Run: `node scripts/fetch_fluidtopics.js --map appsec`
Expected: prints "AppSec content comes from the Runtime fetch…" and exits

- [ ] **Step 7: Commit**

```bash
git add scripts/fetch_fluidtopics.js
git commit -m "feat: fetch_fluidtopics swaps to Runtime source with Posture supplement and --map CLI"
```

---

## Task 7: `package.json` + `fix_escaped_chars_in_fences.py` — Update `fix` script

**Files:**
- Modify: `package.json`
- Modify: `scripts/fix_escaped_chars_in_fences.py`

- [ ] **Step 1: Remove hardcoded `sources_fetch/216-Developer-Suppressions.md` path**

Replace the `fix` script. Run `fix_escaped_chars_in_fences.py` on all files in `sources_fetch/` instead of a single hardcoded file. The script only modifies content inside code fences, so it's safe to run on everything.

Change:

```json
"fix": "bash scripts/fix_abstract_lines.sh && python scripts/fix_escaped_chars_in_fences.py sources_fetch/216-Developer-Suppressions.md && python scripts/fix_escaped_underscores.py && npm run combine",
```

to:

```json
"fix": "bash scripts/fix_abstract_lines.sh && python scripts/fix_escaped_chars_in_fences.py sources_fetch/ && python scripts/fix_escaped_underscores.py && npm run combine",
```

- [ ] **Step 2: Update `fix_escaped_chars_in_fences.py` to support directory input**

The script currently only accepts a single file path (`path.read_text()`). Update `main()` to detect when the argument is a directory and glob all `*.md` files within it:

```python
def main():
    if len(sys.argv) < 2:
        print("Usage: python fix_escaped_chars_in_fences.py <file_or_dir>")
        sys.exit(1)

    path = Path(sys.argv[1])
    targets = sorted(path.glob("*.md")) if path.is_dir() else [path]
    fixed_count = 0

    for target in targets:
        original = target.read_text(encoding="utf-8")
        fixed = fix_escapes_in_fences(original)
        if original != fixed:
            target.write_text(fixed, encoding="utf-8")
            print(f"Fixed: {target}")
            fixed_count += 1

    if fixed_count == 0:
        print("No changes needed.")
    else:
        print(f"Fixed {fixed_count} file(s).")
```

**Files:**
- Modify: `scripts/fix_escaped_chars_in_fences.py`

- [ ] **Step 3: Add `--map` pass-through to the `combine` call in the `fix` script (optional)**

If the `fix` script should support `--map`, update:

```json
"fix": "bash scripts/fix_abstract_lines.sh && python scripts/fix_escaped_chars_in_fences.py sources_fetch/ && python scripts/fix_escaped_underscores.py && npm run combine --"
```

Note: `npm run fix -- --map posture` would pass `--map posture` to the last command in the chain (`npm run combine`). Verify this actually works with npm script chaining. If not, the `--map` flag on `fix` is a convenience — users can run the fix steps individually and then `npm run combine -- --map posture`.

- [ ] **Step 4: Commit**

```bash
git add package.json scripts/fix_escaped_chars_in_fences.py
git commit -m "fix: remove hardcoded file path from fix script, run on all source files"
```

---

## Task 8: Audit/utility scripts — Add `--map` CLI

**Files:**
- Modify: `scripts/audit_headings.js`
- Modify: `scripts/audit_toc_vs_headings.js`
- Modify: `scripts/generate_toc_table.js`

All 3 scripts follow the same pattern: they have a hardcoded `MAP_ID` and reference a hardcoded combined filename. Each needs a `--map` flag and a small lookup map.

- [ ] **Step 1: Update `scripts/audit_headings.js`**

Replace the `MAP_ID` constant at the top:

```js
const MAP_IDS = {
  appsec:  "aUsxSwBeRrRs3Jm36XHckg",
  posture: "BNCvOg6pEdBp~axnn92pBQ",
  runtime: "bKDBlplrokDJKA~h8O9o6A",
};

function parseMapFlag() {
  const idx = process.argv.indexOf("--map");
  if (idx === -1 || idx + 1 >= process.argv.length) return "runtime";
  return process.argv[idx + 1];
}

const mapFlag = parseMapFlag();
const MAP_ID = MAP_IDS[mapFlag];
```

No other changes needed — the script uses `MAP_ID` to fetch the TOC and doesn't reference a combined filename.

- [ ] **Step 2: Update `scripts/audit_toc_vs_headings.js`**

Same `MAP_IDS` + `parseMapFlag()` pattern as above. Additionally, replace the hardcoded combined filename:

```js
const COMBINED_FILES = {
  appsec:  "cortex-cloud-appsec-combined.md",
  posture: "cortex-cloud-posture-combined.md",
  runtime: "cortex-cloud-runtime-combined.md",
};
```

Update the filter that excludes combined files from the source file list — it currently checks for `f !== "cortex-cloud-appsec-combined.md"`. Change to exclude all 3:

```js
.filter(f => f.endsWith(".md") && !f.startsWith("cortex-cloud-") && f !== "README.md")
```

Update the combined file path in Audit 6 to use `COMBINED_FILES[mapFlag]`.

- [ ] **Step 3: Update `scripts/generate_toc_table.js`**

Same `MAP_IDS` + `parseMapFlag()` pattern. Replace the hardcoded `MAP_ID`:

```js
const MAP_IDS = {
  appsec:  "aUsxSwBeRrRs3Jm36XHckg",
  posture: "BNCvOg6pEdBp~axnn92pBQ",
  runtime: "bKDBlplrokDJKA~h8O9o6A",
};

function parseMapFlag() {
  const idx = process.argv.indexOf("--map");
  if (idx === -1 || idx + 1 >= process.argv.length) return "runtime";
  return process.argv[idx + 1];
}

const MAP_ID = MAP_IDS[parseMapFlag()];
```

- [ ] **Step 4: Update `scripts/audit_headings.js` source file filter**

The current filter excludes the old combined file by exact name. Update to exclude all combined files:

```js
.filter(f => f.endsWith(".md") && !f.startsWith("cortex-cloud-") && f !== "README.md")
```

- [ ] **Step 5: Run each script with `--help` or no args to verify no crashes**

Run:
- `node scripts/audit_headings.js --map runtime` (will hit API — just verify it starts)
- `node scripts/generate_toc_table.js --map appsec` (will hit API — verify it starts)

Expected: Scripts start, fetch TOC, produce output.

- [ ] **Step 6: Commit**

```bash
git add scripts/audit_headings.js scripts/audit_toc_vs_headings.js scripts/generate_toc_table.js
git commit -m "feat: add --map CLI flag to audit and utility scripts"
```

---

## Task 9: End-to-end verification

This task runs the full pipeline to confirm all pieces work together.

- [ ] **Step 1: Run all unit tests**

Run: `node --test scripts/generate_combined.test.js`
Expected: All tests PASS.

- [ ] **Step 2: Run a full fetch (Runtime + Posture supplement)**

Run: `node scripts/fetch_fluidtopics.js`
Expected: ~1,415 Runtime topics fetched + ~7 Posture supplement topics. Files in `sources_fetch/` use 4-digit numbering (`0001-*.md` through `~1422-*.md`).

- [ ] **Step 3: Run the combine step for all 3 maps**

Run: `node scripts/generate_combined.js`
Expected: 3 files produced in `sources_fetch/`:
- `cortex-cloud-appsec-combined.md` (~217 topics)
- `cortex-cloud-posture-combined.md` (~648 topics)
- `cortex-cloud-runtime-combined.md` (~506 topics)

- [ ] **Step 4: Verify no topic overlap across output files**

Quick check: extract all h1 headings from each combined file and confirm no title appears in more than one file. (Manual spot-check is sufficient.)

- [ ] **Step 5: Run the audit scripts against each map**

Run:
- `node scripts/audit_toc_vs_headings.js --map appsec`
- `node scripts/audit_toc_vs_headings.js --map posture`
- `node scripts/audit_toc_vs_headings.js --map runtime`

Expected: No missing files, no title mismatches, no heading issues.

- [ ] **Step 6: Commit any final adjustments**

```bash
git add -A
git commit -m "chore: final adjustments from end-to-end verification"
```
