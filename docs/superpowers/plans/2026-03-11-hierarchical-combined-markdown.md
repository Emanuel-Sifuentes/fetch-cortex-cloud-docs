# Hierarchical Combined Markdown Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace flat h1-for-everything combined markdown with depth-aware headings driven by the live TOC API, and consolidate combined file generation into a single script.

**Architecture:** New standalone `generate_combined.js` fetches the TOC tree, matches entries to local files by `contentId`, shifts headings by TOC depth, and writes the combined file. Existing scripts have their redundant combined-file generation removed. Audit and TOC table scripts are updated to reflect the hierarchy.

**Tech Stack:** Node.js (no new dependencies), bash, Python 3

**Spec:** `docs/superpowers/specs/2026-03-11-hierarchical-combined-markdown-design.md`

---

## Chunk 1: Create `generate_combined.js`

### Task 1: Write `scripts/generate_combined.js`

**Files:**
- Create: `scripts/generate_combined.js`

- [ ] **Step 1: Create the script**

```js
const https = require("https");
const fs = require("fs");
const path = require("path");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const MAP_ID = "aUsxSwBeRrRs3Jm36XHckg";
const OUT_DIR = path.join(__dirname, "..", "sources_fetch");
const COMBINED_FILE = "cortex-cloud-appsec-combined.md";

function fetch(urlPath) {
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

function parseContentId(content) {
  const match = content.match(/^contentId:\s*"(.*)"/m);
  return match ? match[1] : null;
}

function stripFrontmatter(content) {
  return content.replace(/^---\n[\s\S]*?\n---\n/, "");
}

function shiftHeadings(md, depth, filename) {
  if (depth === 0) return md;
  let inCodeBlock = false;
  return md
    .split("\n")
    .map((line) => {
      if (/^```/.test(line)) {
        inCodeBlock = !inCodeBlock;
        return line;
      }
      if (inCodeBlock) return line;
      return line.replace(/^(#{1,6}) /, (_, hashes) => {
        const newLevel = Math.min(hashes.length + depth, 6);
        if (hashes.length + depth > 6) {
          console.log(
            `WARNING: heading capped at h6 in ${filename}: "${line.replace(/^#{1,6} /, "")}"`
          );
        }
        return "#".repeat(newLevel) + " ";
      });
    })
    .join("\n");
}

async function main() {
  // Check source files exist
  if (!fs.existsSync(OUT_DIR)) {
    console.error(
      `Error: ${OUT_DIR} not found — run \`npm run fetch\` first`
    );
    process.exit(1);
  }
  const files = fs
    .readdirSync(OUT_DIR)
    .filter((f) => /^\d{3}-/.test(f) && f.endsWith(".md"))
    .sort();
  if (files.length === 0) {
    console.error(
      `Error: No source files found in ${OUT_DIR} — run \`npm run fetch\` first`
    );
    process.exit(1);
  }

  // Fetch TOC
  console.log("Fetching TOC from API...");
  const toc = await fetch(`/api/khub/maps/${MAP_ID}/toc`);
  const tocFlat = flattenToc(toc);
  console.log(`TOC: ${tocFlat.length} entries`);

  // Build contentId -> depth map from TOC
  const depthMap = {};
  for (const entry of tocFlat) {
    depthMap[entry.contentId] = entry.depth;
  }

  // Build contentId -> file content map from local files
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

  // Check for mismatches
  const tocContentIds = new Set(tocFlat.map((e) => e.contentId));
  const fileContentIds = new Set(Object.keys(fileMap));
  for (const id of fileContentIds) {
    if (!tocContentIds.has(id)) {
      console.log(
        `WARNING: local file ${fileMap[id].filename} has no matching TOC entry`
      );
    }
  }
  for (const entry of tocFlat) {
    if (!fileMap[entry.contentId]) {
      console.log(
        `WARNING: TOC entry "${entry.title}" has no matching local file`
      );
    }
  }

  // Build combined file in TOC order
  const sections = [];
  for (const entry of tocFlat) {
    const file = fileMap[entry.contentId];
    if (!file) continue;
    const md = stripFrontmatter(file.content);
    sections.push(shiftHeadings(md.trim(), entry.depth, file.filename));
  }

  const combined = sections.filter(Boolean).join("\n\n");
  fs.writeFileSync(path.join(OUT_DIR, COMBINED_FILE), combined + "\n", "utf-8");
  console.log(`\nCombined file: ${path.join(OUT_DIR, COMBINED_FILE)}`);
  console.log(`${tocFlat.length} topics, ${combined.split("\n").length} lines`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
```

- [ ] **Step 2: Run it standalone and verify output**

Run: `node scripts/generate_combined.js`

Expected:
- Prints "Fetching TOC from API..." then "TOC: 217 entries"
- No WARNING lines (all files match TOC entries)
- Writes combined file
- Prints line count

Verify heading hierarchy in output:

```bash
head -20 sources_fetch/cortex-cloud-appsec-combined.md
```

Expected: First topic starts with `# Cortex Cloud Application Security` (depth 0, no shift).

Verify heading hierarchy:

```bash
grep -n '^#' sources_fetch/cortex-cloud-appsec-combined.md | head -20
```

Expected: Mix of `#`, `##`, `###`, `####` reflecting hierarchy. The 7 top-level TOC nodes (depth 0) stay as `#`. Depth-1 topics like "Onboard version control systems" appear as `##`. Depth-2 topics like "AWS CodeCommit" appear as `###`.

Verify no `---` separators between topics:

```bash
grep -c '^---$' sources_fetch/cortex-cloud-appsec-combined.md
```

Expected: 0 (or close to 0 — any remaining would be inside topic content, not between topics).

- [ ] **Step 3: Commit**

```bash
git add scripts/generate_combined.js
git commit -m "feat: add generate_combined.js with depth-aware heading hierarchy

Builds the combined markdown file using the live TOC API for heading
depth. Topics are ordered by TOC hierarchy, headings shifted by depth
(capped at h6 with warnings), no separators between topics."
```

---

## Chunk 2: Remove combined generation from existing scripts

### Task 2: Remove combined generation from `fetch_fluidtopics.js`

**Files:**
- Modify: `scripts/fetch_fluidtopics.js:264-285`

- [ ] **Step 1: Delete combined file block and update closing log**

Delete lines 264-285 (the comment `// Write a combined file` through the final `console.log` about the combined file path). Replace with a single summary line.

After the batch loop (line 262), the `main()` function should end with:

```js
  console.log(`\nDone! ${topics.length} topics saved to ${OUT_DIR}`);
}
```

This replaces the old block that was:
```js
  // Write a combined file
  console.log("\nCreating combined markdown...");
  const files = fs.readdirSync(OUT_DIR)
    .filter((f) => f.endsWith(".md") && f !== "cortex-cloud-appsec-combined.md" && f !== "README.md")
    .sort();

  const combined = files
    .map((f) => {
      const content = fs.readFileSync(path.join(OUT_DIR, f), "utf-8");
      // Strip frontmatter for combined file, keep just the markdown
      return content.replace(/^---[\s\S]*?---\n/, "");
    })
    .join("\n\n---\n\n");

  fs.writeFileSync(
    path.join(OUT_DIR, "cortex-cloud-appsec-combined.md"),
    combined,
    "utf-8"
  );

  console.log(`\nDone! ${files.length} topics saved to ${OUT_DIR}`);
  console.log(`Combined file: ${path.join(OUT_DIR, "cortex-cloud-appsec-combined.md")}`);
```

- [ ] **Step 2: Verify the script still parses (no syntax errors)**

Run: `node -c scripts/fetch_fluidtopics.js`

Expected: No output (success).

### Task 3: Remove combined generation from `fix_abstract_lines.sh`

**Files:**
- Modify: `scripts/fix_abstract_lines.sh:1-84` (keeping lines 1-35, deleting 36-84)

- [ ] **Step 1: Delete steps 3-4 and the `COMBINED` variable**

Remove line 7 (`COMBINED="$SOURCES_DIR/cortex-cloud-appsec-combined.md"`).

Remove lines 36-84 (everything from the blank line after step 2's `echo ""` through the final `echo "Done!"`).

Also update the header comment on line 3 — remove "and regenerate the combined markdown file."

The resulting script should be:

```bash
#!/usr/bin/env bash
# Fix Finding 4: Remove standalone "Abstract" metadata lines from source files.
set -euo pipefail

SOURCES_DIR="$(cd "$(dirname "$0")/../sources_fetch" && pwd)"

echo "=== Step 1: Remove standalone 'Abstract' lines from individual files ==="

count=0
for f in "$SOURCES_DIR"/[0-9][0-9][0-9]-*.md; do
  # Check if the file contains a standalone Abstract line
  if grep -q '^Abstract$' "$f"; then
    # Remove lines that are exactly "Abstract" (standalone)
    # Using sed in-place (GNU sed on Git Bash)
    sed -i '/^Abstract$/d' "$f"
    basename "$f"
    count=$((count + 1))
  fi
done

echo "Fixed $count files."
echo ""

echo "=== Step 2: Verify no remaining standalone 'Abstract' lines ==="
remaining=$(grep -rl '^Abstract$' "$SOURCES_DIR"/[0-9][0-9][0-9]-*.md 2>/dev/null | wc -l || true)
if [ "$remaining" -eq 0 ]; then
  echo "OK: No remaining standalone 'Abstract' lines found."
else
  echo "WARNING: $remaining files still contain standalone 'Abstract' lines!"
  grep -rl '^Abstract$' "$SOURCES_DIR"/[0-9][0-9][0-9]-*.md
  exit 1
fi
```

- [ ] **Step 2: Verify syntax**

Run: `bash -n scripts/fix_abstract_lines.sh`

Expected: No output (success).

### Task 4: Remove combined generation from `fix_escaped_underscores.py`

**Files:**
- Modify: `scripts/fix_escaped_underscores.py`

- [ ] **Step 1: Delete `regenerate_combined` function, `--no-combine` arg, and its call**

The resulting script should be:

```python
#!/usr/bin/env python3
r"""Fix escaped underscores (\_) and strip Unicode line separators (U+2028) in markdown source files."""

import argparse
import glob
import os
import sys


def find_frontmatter_end(text: str) -> int:
    if not text.startswith("---\n"):
        return 0
    second_fence = text.find("\n---\n", 4)
    if second_fence == -1:
        return 0
    return second_fence + len("\n---\n")


def fix_file(filepath: str, *, dry_run: bool) -> int:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    body_start = find_frontmatter_end(content)
    frontmatter = content[:body_start]
    body = content[body_start:]

    new_body = body.replace(r"\_", "_")
    new_body = new_body.replace("\u2028", "")
    underscore_count = body.count(r"\_")
    ls_count = body.count("\u2028")
    total = underscore_count + ls_count

    if total == 0:
        return 0

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(frontmatter + new_body)

    filename = os.path.basename(filepath)
    prefix = "[DRY RUN] Would fix" if dry_run else "Fixed"
    details = []
    if underscore_count:
        details.append(f"{underscore_count} escaped underscores")
    if ls_count:
        details.append(f"{ls_count} U+2028 line separators")
    print(f"{prefix} {filename} ({', '.join(details)})")
    return total


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Fix escaped underscores in markdown source files"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Report what would change without writing",
    )
    parser.add_argument(
        "--sources",
        type=str,
        default=None,
        help="Custom source directory (default: sources_fetch/ relative to script's parent dir)",
    )
    args = parser.parse_args()

    if args.sources:
        source_dir = args.sources
    else:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        source_dir = os.path.join(os.path.dirname(script_dir), "sources_fetch")

    if not os.path.isdir(source_dir):
        print(f"Error: source directory not found: {source_dir}", file=sys.stderr)
        sys.exit(1)

    pattern = os.path.join(source_dir, "[0-9]*.md")
    files = sorted(glob.glob(pattern))

    if not files:
        print(f"No [0-9]*.md files found in {source_dir}")
        sys.exit(0)

    total_files = 0
    total_replacements = 0

    for filepath in files:
        count = fix_file(filepath, dry_run=args.dry_run)
        if count > 0:
            total_files += 1
            total_replacements += count

    print(f"Fixed {total_files} files, {total_replacements} total replacements")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Verify syntax**

Run: `python -m py_compile scripts/fix_escaped_underscores.py`

Expected: No output (success).

### Task 5: Update `package.json`

**Files:**
- Modify: `package.json:6-12`

- [ ] **Step 1: Update scripts block**

Replace the `"scripts"` section with:

```json
"scripts": {
  "fetch": "node scripts/fetch_fluidtopics.js",
  "combine": "node scripts/generate_combined.js",
  "fix": "bash scripts/fix_abstract_lines.sh && python scripts/fix_escaped_chars_in_fences.py sources_fetch/216-Developer-Suppressions.md && python scripts/fix_escaped_underscores.py && npm run combine",
  "audit:headings": "node scripts/audit_headings.js",
  "audit:toc": "node scripts/audit_toc_vs_headings.js",
  "toc:table": "node scripts/generate_toc_table.js"
}
```

Changes from current:
- Added `"combine"` script
- `"fix"` now ends with `&& npm run combine` instead of calling `fix_escaped_underscores.py` last

- [ ] **Step 2: Verify `npm run combine` works end-to-end**

Run: `npm run combine`

Expected: Same output as Task 1 Step 2 — fetches TOC, writes combined file.

Verify first few headings:

```bash
grep -n '^#' sources_fetch/cortex-cloud-appsec-combined.md | head -20
```

Expected: Mix of `#`, `##`, `###`, `####` reflecting the TOC hierarchy. NOT all `#`.

- [ ] **Step 3: Commit all cleanup changes together**

```bash
git add scripts/fetch_fluidtopics.js scripts/fix_abstract_lines.sh scripts/fix_escaped_underscores.py package.json
git commit -m "refactor: consolidate combined file generation into generate_combined.js

Remove combined markdown generation from fetch_fluidtopics.js,
fix_abstract_lines.sh, and fix_escaped_underscores.py. Update
package.json to add 'combine' script and chain it at end of 'fix'.
Combined file is now built exactly once by generate_combined.js."
```

---

## Chunk 3: Update audit and TOC table scripts

### Task 6: Rewrite `generate_toc_table.js`

**Files:**
- Modify: `scripts/generate_toc_table.js` (full rewrite)

- [ ] **Step 1: Replace with recursive tree printer**

```js
const https = require("https");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const MAP_ID = "aUsxSwBeRrRs3Jm36XHckg";

function fetch(urlPath) {
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

function printTree(nodes, indent, stats) {
  for (const node of nodes) {
    console.log(indent + "- " + node.title);
    stats.count++;
    stats.maxDepth = Math.max(stats.maxDepth, indent.length / 2);
    if (node.children && node.children.length) {
      printTree(node.children, indent + "  ", stats);
    }
  }
}

fetch("/api/khub/maps/" + MAP_ID + "/toc")
  .then((toc) => {
    const stats = { count: 0, maxDepth: 0 };
    printTree(toc, "", stats);
    console.log("");
    console.log(`**Total:** ${stats.count} topics, max depth: ${stats.maxDepth}`);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
```

- [ ] **Step 2: Verify output**

Run: `node scripts/generate_toc_table.js`

Expected: Indented tree matching the TOC hierarchy, ending with a summary line like `**Total:** 217 topics, max depth: 5`.

- [ ] **Step 3: Commit**

```bash
git add scripts/generate_toc_table.js
git commit -m "refactor: rewrite generate_toc_table.js as indented tree

Replace flat markdown table with nbsp hacks with a clean indented
tree output matching the actual TOC hierarchy."
```

### Task 7: Refactor `audit_headings.js`

**Files:**
- Modify: `scripts/audit_headings.js` (full rewrite)

- [ ] **Step 1: Rewrite with single file read pass, code-fence tracking, and h6 cap check**

```js
const fs = require("fs");
const path = require("path");
const https = require("https");

const BASE = "https://docs-cortex.paloaltonetworks.com";
const MAP_ID = "aUsxSwBeRrRs3Jm36XHckg";
const DIR = path.join(__dirname, "..", "sources_fetch");

function fetch(urlPath) {
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
    result.push({ contentId: node.contentId, depth });
    if (node.children && node.children.length) {
      result.push(...flattenToc(node.children, depth + 1));
    }
  }
  return result;
}

function parseFile(filepath) {
  const content = fs.readFileSync(filepath, "utf-8");
  const lines = content.split("\n");

  let title = "", depth = -1, contentId = "";
  let inFm = false, fmCount = 0;
  for (const line of lines) {
    if (line === "---") { fmCount++; inFm = fmCount === 1; continue; }
    if (inFm) {
      const tm = line.match(/^title:\s*"(.*)"/);
      if (tm) title = tm[1];
      const dm = line.match(/^depth:\s*(\d+)/);
      if (dm) depth = parseInt(dm[1]);
      const cm = line.match(/^contentId:\s*"(.*)"/);
      if (cm) contentId = cm[1];
    }
  }

  // Extract headings outside frontmatter and code blocks
  let pastFm = false;
  fmCount = 0;
  let inCodeBlock = false;
  const headingLevels = [];
  let firstHeading = null;
  for (const line of lines) {
    if (line === "---") { fmCount++; if (fmCount === 2) pastFm = true; continue; }
    if (!pastFm) continue;
    if (/^```/.test(line)) { inCodeBlock = !inCodeBlock; continue; }
    if (inCodeBlock) continue;
    const hm = line.match(/^(#{1,6})\s+(.+)$/);
    if (hm) {
      const level = hm[1].length;
      const text = hm[2].trim();
      headingLevels.push(level);
      if (!firstHeading) firstHeading = { level, text };
    }
  }

  return {
    filename: path.basename(filepath),
    title, depth, contentId,
    headingLevels, firstHeading,
  };
}

async function main() {
  const files = fs.readdirSync(DIR)
    .filter(f => f.endsWith(".md") && f !== "cortex-cloud-appsec-combined.md" && f !== "README.md")
    .sort();

  // Parse all files in one pass
  const parsed = files.map(f => parseFile(path.join(DIR, f)));

  // === Title Heading Analysis ===
  let titleAsH1 = 0, titleAsOther = 0, noTitleHeading = 0;
  const titleOtherExamples = [];
  const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, "");

  for (const p of parsed) {
    if (!p.firstHeading) { noTitleHeading++; continue; }
    if (norm(p.firstHeading.text) === norm(p.title)) {
      if (p.firstHeading.level === 1) titleAsH1++;
      else {
        titleAsOther++;
        if (titleOtherExamples.length < 5) {
          titleOtherExamples.push(p);
        }
      }
    } else {
      noTitleHeading++;
    }
  }

  console.log("=== Title Heading Analysis ===");
  console.log(`Files where title is # (h1): ${titleAsH1}`);
  console.log(`Files where title is other heading: ${titleAsOther}`);
  for (const e of titleOtherExamples) {
    console.log(`  ${e.filename} (depth ${e.depth}): h${e.firstHeading.level} "${e.title}"`);
  }
  console.log(`Files where first heading != title: ${noTitleHeading}`);
  console.log();

  // === Pattern Analysis: TOC Depth -> Heading Levels ===
  const pattern = {};
  for (const p of parsed) {
    if (!pattern[p.depth]) pattern[p.depth] = { count: 0, firstLevels: {}, subLevels: {} };
    pattern[p.depth].count++;
    if (p.headingLevels.length > 0) {
      const fl = p.headingLevels[0];
      pattern[p.depth].firstLevels[fl] = (pattern[p.depth].firstLevels[fl] || 0) + 1;
    }
    for (const l of p.headingLevels.slice(1)) {
      pattern[p.depth].subLevels[l] = (pattern[p.depth].subLevels[l] || 0) + 1;
    }
  }

  console.log("=== Current Pattern: TOC Depth -> Heading Levels ===\n");
  console.log("Depth | Files | First heading levels       | Sub-heading levels");
  console.log("------|-------|-----------------------------|-------------------");
  for (const d of Object.keys(pattern).sort((a, b) => a - b)) {
    const p = pattern[d];
    const first = Object.entries(p.firstLevels).map(([l, c]) => `h${l}(x${c})`).join(", ");
    const sub = Object.entries(p.subLevels).map(([l, c]) => `h${l}(x${c})`).join(", ");
    console.log(`  ${d}   |  ${String(p.count).padStart(3)} | ${first.padEnd(27)} | ${sub}`);
  }
  console.log();

  // === H6 Cap Simulation ===
  // Fetch live TOC to get authoritative depth, then check which headings would be capped
  console.log("=== H6 Cap Simulation (using live TOC) ===\n");
  console.log("Fetching TOC from API...");
  const toc = await fetch(`/api/khub/maps/${MAP_ID}/toc`);
  const tocFlat = flattenToc(toc);

  const tocDepthMap = {};
  for (const entry of tocFlat) {
    tocDepthMap[entry.contentId] = entry.depth;
  }

  let cappedCount = 0;
  for (const p of parsed) {
    const tocDepth = tocDepthMap[p.contentId];
    if (tocDepth === undefined) continue;
    for (const level of p.headingLevels) {
      if (level + tocDepth > 6) {
        console.log(
          `CAPPED: ${p.filename} — h${level} + depth ${tocDepth} = ${level + tocDepth} > 6`
        );
        cappedCount++;
        break; // one warning per file is enough
      }
    }
  }

  if (cappedCount === 0) {
    console.log("No headings would be capped at h6.");
  } else {
    console.log(`\n${cappedCount} files have headings that would be capped at h6.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Verify output**

Run: `node scripts/audit_headings.js`

Expected: Title heading analysis should match previous output. Pattern analysis may differ slightly from before — code-fence tracking now excludes false-positive headings inside code blocks, so sub-heading counts may be lower. The new "H6 Cap Simulation" section fetches from the API and either shows "No headings would be capped" or lists affected files.

- [ ] **Step 3: Commit**

```bash
git add scripts/audit_headings.js
git commit -m "refactor: audit_headings.js single-pass with code-fence tracking and h6 cap check

Merge two file-read loops into one, add code-fence tracking to heading
extraction, and add h6 cap simulation using the live TOC API."
```

### Task 8: Add Audit 6 to `audit_toc_vs_headings.js`

**Files:**
- Modify: `scripts/audit_toc_vs_headings.js:174-187` (add new audit before summary)

- [ ] **Step 1: Add Audit 6 — combined file heading level validation**

Insert the following block after the Audit 5 section (after `console.log(`TOC/heading overlaps: ${tocHeadingOverlap}\n`);` on line 174) and before the Summary section (line 176):

```js
  // Audit 6: Combined file heading levels match TOC depth
  const combinedPath = path.join(DIR, "cortex-cloud-appsec-combined.md");
  let combinedHeadingMismatches = 0;
  if (fs.existsSync(combinedPath)) {
    console.log("Checking combined file heading levels...");
    const combinedContent = fs.readFileSync(combinedPath, "utf-8");
    const combinedLines = combinedContent.split("\n");

    // Extract all headings with line numbers (skip code blocks)
    const combinedHeadings = [];
    let inCB = false;
    for (let i = 0; i < combinedLines.length; i++) {
      if (/^```/.test(combinedLines[i])) { inCB = !inCB; continue; }
      if (inCB) continue;
      const hm = combinedLines[i].match(/^(#{1,6}) (.+)$/);
      if (hm) {
        combinedHeadings.push({ level: hm[1].length, text: hm[2].trim(), line: i + 1 });
      }
    }

    // Walk TOC entries in order, matching each to the next heading with the same title.
    // Use two-phase matching to avoid false matches on common titles like "Overview"
    // that appear as sub-headings in other topics:
    //   Phase 1: match on text AND expected level (exact match)
    //   Phase 2: if not found, match on text only (catches level mismatches)
    let headingIdx = 0;
    for (const entry of tocFlat) {
      const expectedLevel = entry.depth + 1;
      let found = false;

      // Phase 1: exact match (text + level)
      for (let i = headingIdx; i < combinedHeadings.length; i++) {
        if (combinedHeadings[i].text === entry.title && combinedHeadings[i].level === expectedLevel) {
          headingIdx = i + 1;
          found = true;
          break;
        }
      }

      // Phase 2: text-only match (level mismatch detection)
      if (!found) {
        for (let i = headingIdx; i < combinedHeadings.length; i++) {
          if (combinedHeadings[i].text === entry.title) {
            console.log(
              `COMBINED LEVEL: "${entry.title}" at line ${combinedHeadings[i].line} — ` +
              `expected h${expectedLevel} (depth ${entry.depth}), got h${combinedHeadings[i].level}`
            );
            combinedHeadingMismatches++;
            headingIdx = i + 1;
            found = true;
            break;
          }
        }
      }

      if (!found) {
        console.log(`COMBINED MISSING: "${entry.title}" not found in combined file`);
        combinedHeadingMismatches++;
      }
    }
    console.log(`Combined file heading mismatches: ${combinedHeadingMismatches}\n`);
  } else {
    console.log("Combined file not found — skipping Audit 6.\n");
  }
```

Also update the Summary section to include the new metric. Add after the `TOC/heading overlaps` line in the summary:

```js
  console.log(`Combined heading mismatches: ${combinedHeadingMismatches}`);
```

- [ ] **Step 2: Verify syntax and run**

Run: `node -c scripts/audit_toc_vs_headings.js` to check syntax.

Then run: `node scripts/audit_toc_vs_headings.js`

Expected: Existing audits 1-5 produce same results as before. New Audit 6 shows `Combined file heading mismatches: 0` (assuming `npm run combine` was already run).

- [ ] **Step 3: Commit**

```bash
git add scripts/audit_toc_vs_headings.js
git commit -m "feat: add Audit 6 — validate combined file heading levels against TOC

Reads the combined markdown file and verifies each topic's title
heading level matches depth + 1 from the live TOC API."
```

### Task 9: Final end-to-end verification

**Prerequisite:** Chunks 1-2 must be completed before running these verification steps.

- [ ] **Step 1: Run full pipeline**

Run: `npm run combine`

Verify: No errors, no WARNING lines, combined file written.

- [ ] **Step 2: Run all audits**

```bash
npm run audit:headings
npm run audit:toc
npm run toc:table
```

Verify:
- `audit:headings` — title analysis, pattern analysis, and h6 cap simulation all run cleanly
- `audit:toc` — Audits 1-6 all pass with 0 issues (or expected pre-existing issues only)
- `toc:table` — prints indented tree to stdout

- [ ] **Step 3: Spot-check combined file structure**

```bash
grep -n '^#' sources_fetch/cortex-cloud-appsec-combined.md | head -30
```

Verify heading levels follow the TOC hierarchy:
- `# Cortex Cloud Application Security` (depth 0)
- `# Onboard Data Sources` (depth 0)
- `## Onboard version control systems` (depth 1)
- `### AWS CodeCommit` (depth 2)
- etc.

- [ ] **Step 4: Update README.md**

Update both READMEs to reflect the new workflow:

**Root `README.md`:**
- Add `combine` to the scripts table
- Note that `fix` now calls `combine` at the end
- Update the "What it does" section to mention hierarchical headings

**`sources_fetch/README.md`** (if it describes the combined file workflow):
- Update any references to the old combined file generation process

- [ ] **Step 5: Commit README update**

```bash
git add README.md sources_fetch/README.md
git commit -m "docs: update READMEs for hierarchical combined markdown workflow"
```
