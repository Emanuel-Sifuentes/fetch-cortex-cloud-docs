# Keyword Heading Promotion Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Promote specific keyword list items (e.g., `- For AMD architecture`) to markdown headings at the correct level in the combined output file.

**Architecture:** A single pure function `promoteKeywordsToHeadings(md)` added to `scripts/generate_combined.js`, applied to the assembled combined markdown string before writing to disk. The function is exported via `module.exports` for testability.

**Tech Stack:** Node.js, `node:test`, `node:assert` (built-in, no install needed)

**Spec:** `docs/superpowers/specs/2026-03-12-keyword-heading-promotion-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `scripts/generate_combined.js` | Modify | Add `KEYWORD_HEADINGS` constant, `promoteKeywordsToHeadings` function, export it, guard `main()` invocation, integrate into `main()` |
| `scripts/generate_combined.test.js` | Create | Tests for `promoteKeywordsToHeadings` |
| `package.json` | Modify | Add `"test"` script |

---

## Chunk 1: Tests and Implementation

### Task 1: Add test script to package.json

**Files:**
- Modify: `package.json:6-13`

- [ ] **Step 1: Add test script**

Add `"test"` to the scripts block in `package.json`:

```json
"test": "node --test scripts/generate_combined.test.js"
```

- [ ] **Step 2: Verify script is registered**

Run: `npm test`
Expected: Error about missing test file (this is correct — we haven't created it yet)

---

### Task 2: Write failing tests for promoteKeywordsToHeadings

**Files:**
- Create: `scripts/generate_combined.test.js`

- [ ] **Step 1: Write all test cases**

Create `scripts/generate_combined.test.js`:

```js
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { promoteKeywordsToHeadings } = require("./generate_combined.js");

describe("promoteKeywordsToHeadings", () => {
  it("promotes a keyword under an h3 heading to h4", () => {
    const input = [
      "### Install the agent",
      "",
      "Some paragraph text.",
      "",
      "-   For AMD architecture",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(
      result,
      [
        "### Install the agent",
        "",
        "Some paragraph text.",
        "",
        "#### For AMD architecture",
      ].join("\n")
    );
  });

  it("promotes consecutive keyword list items to the same level", () => {
    const input = [
      "## Section",
      "",
      "-   For AMD architecture",
      "-   For ARM architecture",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(
      result,
      [
        "## Section",
        "",
        "### For AMD architecture",
        "### For ARM architecture",
      ].join("\n")
    );
  });

  it("preserves trailing text after the keyword", () => {
    const input = [
      "### Section",
      "",
      "-   For **Python** (Python 3.)",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(
      result,
      [
        "### Section",
        "",
        "#### For **Python** (Python 3.)",
      ].join("\n")
    );
  });

  it("caps keyword heading at h6 when parent is h6", () => {
    const input = [
      "###### Deep section",
      "",
      "-   For **Java**",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(
      result,
      [
        "###### Deep section",
        "",
        "###### For **Java**",
      ].join("\n")
    );
  });

  it("does not promote keywords inside fenced code blocks", () => {
    const input = [
      "### Section",
      "",
      "```",
      "-   For AMD architecture",
      "```",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(result, input);
  });

  it("does not promote keywords inside language-tagged code blocks", () => {
    const input = [
      "### Section",
      "",
      "```markdown",
      "-   For AMD architecture",
      "```",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(result, input);
  });

  it("does not promote non-keyword list items", () => {
    const input = [
      "### Section",
      "",
      "-   For something else entirely",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(result, input);
  });

  it("does not promote indented (nested) list items", () => {
    const input = [
      "### Section",
      "",
      "    -   For AMD architecture",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(result, input);
  });

  it("matches variable whitespace after the dash", () => {
    const input = [
      "### Section",
      "",
      "-  For AMD architecture",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(
      result,
      [
        "### Section",
        "",
        "#### For AMD architecture",
      ].join("\n")
    );
  });

  it("tracks heading level changes across the document", () => {
    const input = [
      "## Top section",
      "",
      "-   For AMD architecture",
      "",
      "#### Deeper section",
      "",
      "-   For ARM architecture",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(
      result,
      [
        "## Top section",
        "",
        "### For AMD architecture",
        "",
        "#### Deeper section",
        "",
        "##### For ARM architecture",
      ].join("\n")
    );
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: All tests FAIL — `promoteKeywordsToHeadings` is not exported from `generate_combined.js`

- [ ] **Step 3: Commit**

```bash
git add scripts/generate_combined.test.js package.json
git commit -m "test: add failing tests for promoteKeywordsToHeadings"
```

---

### Task 3: Implement promoteKeywordsToHeadings and export it

**Files:**
- Modify: `scripts/generate_combined.js` (add constant after `COMBINED_FILE`)
- Modify: `scripts/generate_combined.js` (add function immediately before `async function main()`)
- Modify: `scripts/generate_combined.js` (add export + guard `main()` at end of file)

- [ ] **Step 1: Add KEYWORD_HEADINGS constant**

Add after the `const COMBINED_FILE = "cortex-cloud-appsec-combined.md";` line:

```js
const KEYWORD_HEADINGS = [
  "For AMD architecture",
  "For ARM architecture",
  "For **JavaScript**",
  "For **Python**",
  "For **Java**",
];
```

- [ ] **Step 2: Add promoteKeywordsToHeadings function**

Add immediately before the `async function main()` block:

```js
function promoteKeywordsToHeadings(md) {
  let currentHeadingLevel = 0;
  let inCodeBlock = false;
  return md
    .split("\n")
    .map((line) => {
      if (/^```/.test(line)) {
        inCodeBlock = !inCodeBlock;
        return line;
      }
      if (inCodeBlock) return line;
      const headingMatch = line.match(/^(#{1,6}) /);
      if (headingMatch) {
        currentHeadingLevel = headingMatch[1].length;
        return line;
      }
      const listMatch = line.match(/^-\s+(.*)/);
      if (listMatch) {
        const text = listMatch[1];
        const isKeyword = KEYWORD_HEADINGS.some((kw) => text.startsWith(kw));
        if (isKeyword) {
          const level = Math.min(currentHeadingLevel + 1, 6);
          if (currentHeadingLevel + 1 > 6) {
            console.log(
              `WARNING: keyword heading capped at h6: "${text}"`
            );
          }
          return "#".repeat(level) + " " + text;
        }
      }
      return line;
    })
    .join("\n");
}
```

- [ ] **Step 3: Add module.exports and guard main() invocation**

Replace the `main().catch(...)` block at the end of `generate_combined.js`:

```js
main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
```

With:

```js
module.exports = { promoteKeywordsToHeadings };

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
```

This prevents `main()` from executing when the file is `require()`'d by the test file. Without this guard, `require("./generate_combined.js")` would trigger a network fetch and crash the tests.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: All 10 tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/generate_combined.js
git commit -m "feat: add promoteKeywordsToHeadings function"
```

---

### Task 4: Integrate into the combine pipeline

**Files:**
- Modify: `scripts/generate_combined.js` (inside `main()`, the `sections.filter(Boolean).join` line)

- [ ] **Step 1: Hook promoteKeywordsToHeadings into main()**

Inside `main()`, find:

```js
const combined = sections.filter(Boolean).join("\n\n");
```

Replace with:

```js
const raw = sections.filter(Boolean).join("\n\n");
const combined = promoteKeywordsToHeadings(raw);
```

- [ ] **Step 2: Run tests to verify nothing broke**

Run: `npm test`
Expected: All 10 tests still PASS

- [ ] **Step 3: Commit**

```bash
git add scripts/generate_combined.js
git commit -m "feat: integrate keyword heading promotion into combine pipeline"
```

---

### Task 5: Manual verification

- [ ] **Step 1: Run the full fix pipeline**

Run: `npm run fix`
Expected: Completes without errors. Check console output for any `WARNING: keyword heading capped at h6` messages.

- [ ] **Step 2: Spot-check the combined output**

Open `sources_fetch/cortex-cloud-appsec-combined.md` and search for `For AMD architecture`, `For ARM architecture`, `For **JavaScript**`, `For **Python**`, `For **Java**`. Verify they now appear as headings (with `#` prefixes) at the correct level relative to their parent headings.

- [ ] **Step 3: Commit (if any adjustments were needed)**

Only if manual verification revealed issues that required code changes.
