# Keyword Heading Promotion — Design Spec

## Problem

Certain list items in the combined markdown output represent logical sections (architecture variants, language-specific instructions) but appear as plain list items rather than headings. This makes them invisible to TOC generation and reduces document navigability.

**Affected keywords:**
- `For AMD architecture`
- `For ARM architecture`
- `For **JavaScript**`
- `For **Python**`
- `For **Java**`

These appear in the source markdown as list items:
```
-   For AMD architecture
-   For **Python** (Python 3.)
```

## Solution

Add a `promoteKeywordsToHeadings(md)` function to `generate_combined.js` that post-processes the fully assembled combined markdown string before writing to disk.

### Keyword Set

A constant array at the top of `generate_combined.js`:

```js
const KEYWORD_HEADINGS = [
  "For AMD architecture",
  "For ARM architecture",
  "For **JavaScript**",
  "For **Python**",
  "For **Java**",
];
```

New keywords are added by appending to this array.

### Matching Logic

A line matches if:
1. It is not inside a fenced code block
2. It starts with `-` followed by one or more whitespace characters (`-\s+`)
3. The text after the prefix starts with one of the keywords in `KEYWORD_HEADINGS`

Only top-level list items are promoted. Indented list items (nested lists) are not matched.

The full line text after the `-\s+` prefix becomes the heading text. Trailing content (e.g., `(Python 3.)`) is preserved.

### Heading Level Determination

The function scans the combined markdown line-by-line, tracking the current heading level:

1. Track `currentHeadingLevel` (starts at 0 — so if a keyword appears before any heading, it becomes h1)
2. Track `inCodeBlock` to skip fenced code blocks — a line matching `/^```/` toggles the flag (this includes language-tagged fences like `` ```js ``)
3. For each line:
   - If code fence toggle (`/^```/`): flip `inCodeBlock`
   - If `inCodeBlock`: pass through unchanged
   - If heading (`/^(#{1,6}) /`): update `currentHeadingLevel` to that heading's level
   - If matching list item: replace with heading at `min(currentHeadingLevel + 1, 6)`, preserving the text after the list prefix
   - Otherwise: pass through unchanged

### Example

Input:
```markdown
### Install the agent

Some paragraph text.

-   For AMD architecture
-   For ARM architecture
```

Output:
```markdown
### Install the agent

Some paragraph text.

#### For AMD architecture
#### For ARM architecture
```

### Edge Cases

- **Parent heading at h6:** keyword heading is also capped at h6, with a warning logged to console: `WARNING: keyword heading capped at h6: "For AMD architecture"`
- **Inside code blocks:** lines are never matched inside fenced code blocks (toggle detected by `/^```/`)
- **Trailing text:** preserved as-is (e.g., `-   For **Python** (Python 3.)` becomes `#### For **Python** (Python 3.)`)
- **Indented list items:** not matched — only top-level list items starting at column 0 are promoted
- **Before any heading:** `currentHeadingLevel` starts at 0, so the keyword would become h1; in practice this never occurs because the combined file always starts with a heading

### Integration Point

In `generate_combined.js` at line 140, rename the existing `combined` variable to `raw` and apply the transformation:

```js
// Line 140 — was: const combined = sections.filter(Boolean).join("\n\n");
const raw = sections.filter(Boolean).join("\n\n");
const combined = promoteKeywordsToHeadings(raw);
// Line 141 stays unchanged: fs.writeFileSync(...)
```

### Execution

Runs automatically during `npm run fix` (which ends with `npm run combine`). No changes to the fix chain. Individual source files in `sources_fetch/` are not modified.

## Test Cases

Tests for `promoteKeywordsToHeadings`:

1. **Basic promotion** — keyword under an h3 heading produces h4
2. **Multiple keywords** — consecutive keyword list items all get the same level
3. **Trailing text preserved** — `-   For **Python** (Python 3.)` becomes `#### For **Python** (Python 3.)`
4. **h6 cap** — keyword under an h6 heading is capped at h6 with a console warning
5. **Code block immunity** — keyword inside a fenced code block is not promoted
6. **Non-keyword list items** — `-   For something else` is not matched
7. **Indented list items** — `    -   For AMD architecture` is not matched
8. **Variable whitespace** — `-  For AMD architecture` (2 spaces) still matches

## Scope

- **Modified file:** `scripts/generate_combined.js`
- **New files:** test file for `promoteKeywordsToHeadings`
- **Config changes:** none
