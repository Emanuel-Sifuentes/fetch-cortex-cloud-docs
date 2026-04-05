# AEM Table Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert raw HTML tables to markdown and rejoin broken markdown table rows in the 634 AEM-sourced Prisma Access files.

**Architecture:** Two new Python scripts follow the existing fix-script pattern (`find_frontmatter_end`, `fix_file`, `main` with `--sources`/`--dry-run`). `fix_aem_html_tables.py` uses Python's `html.parser` to convert `<table>` blocks to markdown. `fix_aem_tables.py` uses a state machine that tolerates blank lines inside broken rows (unlike the existing `fix_broken_tables.py` which resets on blank lines). Both are inserted into the AEM pipeline in `fix.js`.

**Tech Stack:** Python 3 (html.parser, re, argparse, glob), Node.js (fix.js pipeline), unittest

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `scripts/fix_aem_html_tables.py` | Convert raw HTML `<table>` blocks to markdown tables |
| Create | `scripts/test_fix_aem_html_tables.py` | Tests for HTML table converter |
| Create | `scripts/fix_aem_tables.py` | Rejoin broken markdown table rows (blank-line tolerant) |
| Create | `scripts/test_fix_aem_tables.py` | Tests for broken row joiner |
| Modify | `scripts/fix.js:43-49` | Insert new scripts into AEM pipeline |

---

### Task 1: fix_aem_html_tables.py — Simple HTML table parsing

**Files:**
- Create: `scripts/test_fix_aem_html_tables.py`
- Create: `scripts/fix_aem_html_tables.py`

- [ ] **Step 1: Write failing tests for basic HTML table conversion**

```python
#!/usr/bin/env python3
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(__file__))
from fix_aem_html_tables import convert_html_tables


class TestConvertHtmlTables(unittest.TestCase):
    def test_simple_two_column_table(self):
        body = (
            '<table class="table">'
            "<tbody>"
            '<tr><td class="entry"><b class="ph b">Method</b></td>'
            '<td class="entry"><b class="ph b">URI</b></td></tr>'
            '<tr><td class="entry">GET</td>'
            '<td class="entry">/api/v1/resources</td></tr>'
            "</tbody>"
            "</table>"
        )
        result, count = convert_html_tables(body)
        self.assertEqual(count, 1)
        self.assertIn("| **Method** | **URI** |", result)
        self.assertIn("| --- | --- |", result)
        self.assertIn("| GET | /api/v1/resources |", result)

    def test_no_html_tables_returns_body_unchanged(self):
        body = "Just regular markdown.\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n"
        result, count = convert_html_tables(body)
        self.assertEqual(count, 0)
        self.assertEqual(result, body)

    def test_non_table_html_left_unchanged(self):
        body = "Text with <b>bold</b> and <a href='url'>link</a>.\n"
        result, count = convert_html_tables(body)
        self.assertEqual(count, 0)
        self.assertEqual(result, body)

    def test_surrounding_text_preserved(self):
        body = (
            "Before.\n\n"
            '<table class="table"><tbody>'
            "<tr><td><b>A</b></td></tr>"
            "<tr><td>1</td></tr>"
            "</tbody></table>"
            "\n\nAfter.\n"
        )
        result, count = convert_html_tables(body)
        self.assertEqual(count, 1)
        self.assertIn("Before.", result)
        self.assertIn("After.", result)
        self.assertIn("| **A** |", result)

    def test_three_column_data_table(self):
        body = (
            '<table class="table colsep rowsep"><tbody>'
            "<tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Required</b></td></tr>"
            "<tr><td>host</td><td>string</td><td>Yes</td></tr>"
            "<tr><td>port</td><td>integer</td><td>No</td></tr>"
            "</tbody></table>"
        )
        result, count = convert_html_tables(body)
        self.assertEqual(count, 1)
        self.assertIn("| **Name** | **Type** | **Required** |", result)
        self.assertIn("| --- | --- | --- |", result)
        self.assertIn("| host | string | Yes |", result)
        self.assertIn("| port | integer | No |", result)

    def test_generic_header_when_first_row_not_bold(self):
        body = (
            "<table><tbody>"
            "<tr><td>alice</td><td>admin</td></tr>"
            "<tr><td>bob</td><td>viewer</td></tr>"
            "</tbody></table>"
        )
        result, count = convert_html_tables(body)
        self.assertEqual(count, 1)
        self.assertIn("| Column 1 | Column 2 |", result)
        self.assertIn("| --- | --- |", result)
        self.assertIn("| alice | admin |", result)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_fix_aem_html_tables.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'fix_aem_html_tables'`

- [ ] **Step 3: Write minimal implementation**

```python
#!/usr/bin/env python3
"""Convert raw HTML <table> blocks to markdown tables."""

import argparse
import glob
import os
import re
import sys
from html.parser import HTMLParser

TABLE_BLOCK_RE = re.compile(r"<table[^>]*>.*?</table>", re.DOTALL)


class _CellConverter(HTMLParser):
    """Parse an HTML table and produce a list of rows, each row a list of cell strings."""

    def __init__(self):
        super().__init__()
        self.rows = []
        self._row = []
        self._cell_parts = []
        self._in_cell = False
        self._stack = []

    def _role_active(self, role):
        return any(r == role for _, r, _ in self._stack)

    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            self._row = []
            return
        if tag in ("td", "th"):
            self._cell_parts = []
            self._in_cell = True
            return
        if not self._in_cell:
            return

        a = dict(attrs)
        cls = a.get("class", "")

        if tag in ("b", "strong"):
            self._cell_parts.append("**")
            self._stack.append((tag, "bold", None))
        else:
            self._stack.append((tag, "other", None))

    def handle_endtag(self, tag):
        if tag == "tr":
            if self._row:
                self.rows.append(self._row)
            return
        if tag in ("td", "th"):
            text = "".join(self._cell_parts)
            text = re.sub(r"\s+", " ", text).strip()
            self._row.append(text)
            self._in_cell = False
            return
        if not self._in_cell or not self._stack:
            return

        _, role, _ = self._stack.pop()
        if role == "bold":
            self._cell_parts.append("**")

    def handle_data(self, data):
        if not self._in_cell:
            return
        self._cell_parts.append(data)


def parse_html_table(html):
    parser = _CellConverter()
    parser.feed(html)
    return parser.rows


def build_markdown_table(rows):
    if not rows:
        return ""

    col_count = max(len(r) for r in rows)

    def escape_cell(text):
        return text.replace("|", "\\|")

    def pad_row(row):
        return row + [""] * (col_count - len(row))

    first_row = rows[0]
    has_bold_header = all(
        c.startswith("**") and c.endswith("**") for c in first_row if c
    )

    lines = []
    if has_bold_header and first_row:
        lines.append("| " + " | ".join(escape_cell(c) for c in pad_row(first_row)) + " |")
        lines.append("| " + " | ".join("---" for _ in range(col_count)) + " |")
        data_rows = rows[1:]
    else:
        lines.append("| " + " | ".join(f"Column {i+1}" for i in range(col_count)) + " |")
        lines.append("| " + " | ".join("---" for _ in range(col_count)) + " |")
        data_rows = rows

    for row in data_rows:
        lines.append("| " + " | ".join(escape_cell(c) for c in pad_row(row)) + " |")

    return "\n".join(lines)


def convert_html_tables(body):
    count = [0]

    def _replace(m):
        rows = parse_html_table(m.group(0))
        if not rows:
            return m.group(0)
        count[0] += 1
        return build_markdown_table(rows)

    new_body = TABLE_BLOCK_RE.sub(_replace, body)
    return new_body, count[0]
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_fix_aem_html_tables.py -v`
Expected: All 6 tests PASS

- [ ] **Step 5: Commit**

```bash
cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && git add scripts/fix_aem_html_tables.py scripts/test_fix_aem_html_tables.py && git commit -m "feat(aem): add HTML table parser with basic cell extraction"
```

---

### Task 2: fix_aem_html_tables.py — Inline HTML formatting

**Files:**
- Modify: `scripts/test_fix_aem_html_tables.py`
- Modify: `scripts/fix_aem_html_tables.py`

- [ ] **Step 1: Add tests for inline formatting**

Append to `TestConvertHtmlTables` class in `scripts/test_fix_aem_html_tables.py`:

```python
    def test_italic_preserved(self):
        body = (
            "<table><tbody>"
            "<tr><td><b>Col</b></td></tr>"
            "<tr><td><i>emphasis</i></td></tr>"
            "</tbody></table>"
        )
        result, _ = convert_html_tables(body)
        self.assertIn("*emphasis*", result)

    def test_link_preserved(self):
        body = (
            "<table><tbody>"
            "<tr><td><b>Col</b></td></tr>"
            '<tr><td>See <a class="xref" href="/docs/setup">setup guide</a></td></tr>'
            "</tbody></table>"
        )
        result, _ = convert_html_tables(body)
        self.assertIn("[setup guide](/docs/setup)", result)

    def test_code_span_from_systemoutput(self):
        body = (
            "<table><tbody>"
            "<tr><td><b>Col</b></td></tr>"
            '<tr><td>Run <span class="ph systemoutput">curl -X GET</span></td></tr>'
            "</tbody></table>"
        )
        result, _ = convert_html_tables(body)
        self.assertIn("`curl -X GET`", result)

    def test_uicontrol_renders_bold(self):
        body = (
            "<table><tbody>"
            "<tr><td><b>Col</b></td></tr>"
            '<tr><td>Click <span class="ph uicontrol">Save</span></td></tr>'
            "</tbody></table>"
        )
        result, _ = convert_html_tables(body)
        self.assertIn("**Save**", result)

    def test_menucascade_joined_with_angle_brackets(self):
        body = (
            "<table><tbody>"
            "<tr><td><b>Col</b></td></tr>"
            "<tr><td>"
            '<span class="ph menucascade">'
            '<span class="ph uicontrol">Network</span>'
            '<span class="ph uicontrol">Zones</span>'
            "</span>"
            "</td></tr>"
            "</tbody></table>"
        )
        result, _ = convert_html_tables(body)
        self.assertIn("**Network** > **Zones**", result)
```

- [ ] **Step 2: Run tests to verify new tests fail**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_fix_aem_html_tables.py -v`
Expected: 5 new tests FAIL (italic, link, code, uicontrol, menucascade)

- [ ] **Step 3: Extend _CellConverter with inline formatting**

Replace the `handle_starttag` method's inline handling block in `scripts/fix_aem_html_tables.py`. The full updated `handle_starttag` and `handle_endtag`:

```python
    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            self._row = []
            return
        if tag in ("td", "th"):
            self._cell_parts = []
            self._in_cell = True
            return
        if not self._in_cell:
            return

        a = dict(attrs)
        cls = a.get("class", "")

        if tag in ("b", "strong"):
            self._cell_parts.append("**")
            self._stack.append((tag, "bold", None))
        elif tag in ("i", "em"):
            self._cell_parts.append("*")
            self._stack.append((tag, "italic", None))
        elif tag == "a":
            self._cell_parts.append("[")
            self._stack.append((tag, "link", a.get("href", "")))
        elif tag == "span" and "systemoutput" in cls:
            self._cell_parts.append("`")
            self._stack.append((tag, "code", None))
        elif tag == "span" and "uicontrol" in cls:
            if self._role_active("menucascade"):
                for j in range(len(self._stack) - 1, -1, -1):
                    if self._stack[j][1] == "menucascade":
                        if self._stack[j][2] > 0:
                            self._cell_parts.append(" > ")
                        self._stack[j] = (self._stack[j][0], "menucascade", self._stack[j][2] + 1)
                        break
                self._cell_parts.append("**")
                self._stack.append((tag, "mc_child", None))
            else:
                self._cell_parts.append("**")
                self._stack.append((tag, "uicontrol", None))
        elif tag == "span" and "menucascade" in cls:
            self._stack.append((tag, "menucascade", 0))
        else:
            self._stack.append((tag, "other", None))

    def handle_endtag(self, tag):
        if tag == "tr":
            if self._row:
                self.rows.append(self._row)
            return
        if tag in ("td", "th"):
            text = "".join(self._cell_parts)
            text = re.sub(r"\s+", " ", text).strip()
            self._row.append(text)
            self._in_cell = False
            return
        if not self._in_cell or not self._stack:
            return

        _, role, extra = self._stack.pop()
        if role in ("bold", "uicontrol", "mc_child"):
            self._cell_parts.append("**")
        elif role == "italic":
            self._cell_parts.append("*")
        elif role == "link":
            self._cell_parts.append(f"]({extra})")
        elif role == "code":
            self._cell_parts.append("`")
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_fix_aem_html_tables.py -v`
Expected: All 11 tests PASS

- [ ] **Step 5: Commit**

```bash
cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && git add scripts/fix_aem_html_tables.py scripts/test_fix_aem_html_tables.py && git commit -m "feat(aem): add inline HTML-to-markdown conversion (bold, italic, links, code, menucascade)"
```

---

### Task 3: fix_aem_html_tables.py — Lists, note tables, figures, pipe escaping

**Files:**
- Modify: `scripts/test_fix_aem_html_tables.py`
- Modify: `scripts/fix_aem_html_tables.py`

- [ ] **Step 1: Add tests for lists, note tables, figures, pipes, and multiple tables**

Append to `TestConvertHtmlTables` class:

```python
    def test_list_items_semicolon_separated(self):
        body = (
            "<table><tbody>"
            "<tr><td><b>Col</b></td></tr>"
            "<tr><td><ul><li>First</li><li>Second</li><li>Third</li></ul></td></tr>"
            "</tbody></table>"
        )
        result, _ = convert_html_tables(body)
        self.assertIn("First; Second; Third", result)

    def test_single_column_note_table_becomes_plain_text(self):
        body = (
            '<table class="table"><tbody>'
            '<tr><td class="entry"><div class="note">Important: configure TLS first.</div></td></tr>'
            "</tbody></table>"
        )
        result, count = convert_html_tables(body)
        self.assertEqual(count, 1)
        self.assertIn("Important: configure TLS first.", result)
        self.assertNotIn("| ---", result)

    def test_figure_dropped_entirely(self):
        body = (
            "<table><tbody>"
            "<tr><td><b>Col</b></td></tr>"
            "<tr><td>Text<figure><img src='x.png'/><figcaption>Cap</figcaption></figure>more</td></tr>"
            "</tbody></table>"
        )
        result, _ = convert_html_tables(body)
        self.assertIn("Text more", result)
        self.assertNotIn("Cap", result)
        self.assertNotIn("figure", result)

    def test_literal_pipe_escaped(self):
        body = (
            "<table><tbody>"
            "<tr><td><b>Col</b></td></tr>"
            "<tr><td>A | B</td></tr>"
            "</tbody></table>"
        )
        result, _ = convert_html_tables(body)
        self.assertIn("A \\| B", result)

    def test_multiple_tables_converted_independently(self):
        body = (
            '<table class="table"><tbody>'
            "<tr><td><b>A</b></td></tr>"
            "<tr><td>1</td></tr>"
            "</tbody></table>"
            "\n\nSome text.\n\n"
            '<table class="table"><tbody>'
            "<tr><td><b>B</b></td></tr>"
            "<tr><td>2</td></tr>"
            "</tbody></table>"
        )
        result, count = convert_html_tables(body)
        self.assertEqual(count, 2)
        self.assertIn("| **A** |", result)
        self.assertIn("| **B** |", result)
        self.assertIn("Some text.", result)
```

- [ ] **Step 2: Run tests to verify new tests fail**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_fix_aem_html_tables.py -v`
Expected: `test_list_items_semicolon_separated`, `test_single_column_note_table_becomes_plain_text`, `test_figure_dropped_entirely` FAIL

- [ ] **Step 3: Add list, figure, and note-table handling**

In `_CellConverter.handle_starttag`, add these branches (before the final `else`):

```python
        elif tag == "figure":
            self._stack.append((tag, "figure", None))
        elif self._role_active("figure"):
            self._stack.append((tag, "skip", None))
        elif tag in ("ul", "ol"):
            self._stack.append((tag, "list", 0))
        elif tag == "li":
            for j in range(len(self._stack) - 1, -1, -1):
                if self._stack[j][1] == "list":
                    if self._stack[j][2] > 0:
                        self._cell_parts.append("; ")
                    self._stack[j] = (self._stack[j][0], "list", self._stack[j][2] + 1)
                    break
            self._stack.append((tag, "list_item", None))
```

**Important ordering:** The `figure` and `self._role_active("figure")` checks must come BEFORE all other inline checks (bold, italic, link, etc.) so that content inside figures is skipped. Move those two branches to be the first checks after the `if not self._in_cell: return` guard.

In `_CellConverter.handle_data`, add figure skip:

```python
    def handle_data(self, data):
        if not self._in_cell or self._role_active("figure"):
            return
        self._cell_parts.append(data)
```

In `build_markdown_table`, add single-cell note detection at the top:

```python
def build_markdown_table(rows):
    if not rows:
        return ""

    if len(rows) == 1 and len(rows[0]) == 1:
        return rows[0][0]

    # ... rest of existing code
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_fix_aem_html_tables.py -v`
Expected: All 16 tests PASS

- [ ] **Step 5: Commit**

```bash
cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && git add scripts/fix_aem_html_tables.py scripts/test_fix_aem_html_tables.py && git commit -m "feat(aem): add list flattening, note-table detection, figure dropping, pipe escaping"
```

---

### Task 4: fix_aem_html_tables.py — File operations and CLI

**Files:**
- Modify: `scripts/test_fix_aem_html_tables.py`
- Modify: `scripts/fix_aem_html_tables.py`

- [ ] **Step 1: Add tests for fix_file and frontmatter**

Append to `scripts/test_fix_aem_html_tables.py`:

```python
import tempfile


class TestFixFile(unittest.TestCase):
    def test_preserves_frontmatter(self):
        content = (
            '---\ntitle: "test"\n---\n'
            "<table><tbody>"
            "<tr><td><b>A</b></td></tr>"
            "<tr><td>1</td></tr>"
            "</tbody></table>\n"
        )
        result = self._fix(content)
        self.assertTrue(result.startswith('---\ntitle: "test"\n---\n'))
        self.assertIn("| **A** |", result)
        self.assertNotIn("<table", result)

    def test_returns_zero_when_no_html_tables(self):
        content = '---\ntitle: "test"\n---\nJust plain text.\n'
        count = self._fix_count(content)
        self.assertEqual(count, 0)

    def test_returns_nonzero_when_tables_converted(self):
        content = (
            '---\ntitle: "test"\n---\n'
            "<table><tbody><tr><td><b>A</b></td></tr>"
            "<tr><td>1</td></tr></tbody></table>\n"
        )
        count = self._fix_count(content)
        self.assertGreater(count, 0)

    def test_dry_run_does_not_modify_file(self):
        content = (
            '---\ntitle: "test"\n---\n'
            "<table><tbody><tr><td><b>A</b></td></tr>"
            "<tr><td>1</td></tr></tbody></table>\n"
        )
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".md", delete=False, encoding="utf-8"
        ) as f:
            f.write(content)
            path = f.name
        try:
            fix_file(path, dry_run=True)
            with open(path, "r", encoding="utf-8") as f2:
                self.assertEqual(f2.read(), content)
        finally:
            os.unlink(path)

    def _fix(self, content):
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".md", delete=False, encoding="utf-8"
        ) as f:
            f.write(content)
            path = f.name
        try:
            fix_file(path, dry_run=False)
            with open(path, "r", encoding="utf-8") as f2:
                return f2.read()
        finally:
            os.unlink(path)

    def _fix_count(self, content):
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".md", delete=False, encoding="utf-8"
        ) as f:
            f.write(content)
            path = f.name
        try:
            return fix_file(path, dry_run=False)
        finally:
            os.unlink(path)
```

Update the import at the top:

```python
from fix_aem_html_tables import convert_html_tables, fix_file
```

- [ ] **Step 2: Run tests to verify new tests fail**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_fix_aem_html_tables.py::TestFixFile -v`
Expected: FAIL — `ImportError: cannot import name 'fix_file'`

- [ ] **Step 3: Add find_frontmatter_end, fix_file, and main**

Append to `scripts/fix_aem_html_tables.py`:

```python
def find_frontmatter_end(text):
    if not text.startswith("---\n"):
        return 0
    second_fence = text.find("\n---\n", 4)
    if second_fence == -1:
        return 0
    return second_fence + len("\n---\n")


def fix_file(filepath, *, dry_run):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    body_start = find_frontmatter_end(content)
    frontmatter = content[:body_start]
    body = content[body_start:]

    new_body, table_count = convert_html_tables(body)

    if new_body == body:
        return 0

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(frontmatter + new_body)

    filename = os.path.basename(filepath)
    prefix = "[DRY RUN] Would fix" if dry_run else "Fixed"
    print(f"{prefix} {filename} ({table_count} HTML tables converted)")
    return table_count


def main():
    parser = argparse.ArgumentParser(
        description="Convert raw HTML tables to markdown in AEM-sourced files"
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
        help="Custom source directory",
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
    total_tables = 0

    for filepath in files:
        count = fix_file(filepath, dry_run=args.dry_run)
        if count > 0:
            total_files += 1
            total_tables += count

    print(f"Fixed {total_files} files, {total_tables} HTML tables converted")


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_fix_aem_html_tables.py -v`
Expected: All 20 tests PASS

- [ ] **Step 5: Commit**

```bash
cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && git add scripts/fix_aem_html_tables.py scripts/test_fix_aem_html_tables.py && git commit -m "feat(aem): add file operations and CLI for HTML table converter"
```

---

### Task 5: fix_aem_tables.py — Core broken row joining

**Files:**
- Create: `scripts/test_fix_aem_tables.py`
- Create: `scripts/fix_aem_tables.py`

- [ ] **Step 1: Write failing tests for core row joining**

```python
#!/usr/bin/env python3
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(__file__))
from fix_aem_tables import fix_broken_rows


class TestFixBrokenRows(unittest.TestCase):
    def test_symbol_cell_split_with_blank_lines(self):
        md = (
            "| A | B | C |\n"
            "| --- | --- | --- |\n"
            "| X | Y | Z |\n"
            "\n"
            "\u221a\n"
            "\n"
            " |\n"
            "| D | E | F |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| X | Y | Z | \u221a |", result)
        self.assertIn("| D | E | F |", result)

    def test_multi_paragraph_cell_content(self):
        md = (
            "| Type | Details |\n"
            "| --- | --- |\n"
            "| **Production** |\n"
            "Notification 21 days before release.\n"
            "\n"
            " |\n"
            "| **Staging** | 7 days |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| **Production** | Notification 21 days before release. |", result)
        self.assertIn("| **Staging** | 7 days |", result)

    def test_annotation_text_on_separate_line(self):
        md = (
            "| Setting | Value |\n"
            "| --- | --- |\n"
            "| Crypto | AES-256 |\n"
            "\n"
            "Not recommended\n"
            "\n"
            " |\n"
            "| Hash | SHA-256 |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| Crypto | AES-256 | Not recommended |", result)
        self.assertIn("| Hash | SHA-256 |", result)

    def test_complete_rows_pass_through_unchanged(self):
        md = (
            "| A | B |\n"
            "| --- | --- |\n"
            "| 1 | 2 |\n"
            "| 3 | 4 |\n"
        )
        self.assertEqual(fix_broken_rows(md), md)

    def test_no_tables_returns_unchanged(self):
        md = "Just plain text.\n\nNo tables here.\n"
        self.assertEqual(fix_broken_rows(md), md)

    def test_empty_string(self):
        self.assertEqual(fix_broken_rows(""), "")


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_fix_aem_tables.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'fix_aem_tables'`

- [ ] **Step 3: Write the core state machine implementation**

```python
#!/usr/bin/env python3
"""Rejoin broken markdown table rows where cell content is split across lines."""

import argparse
import glob
import os
import re
import sys

SEPARATOR_PATTERN = re.compile(r"^\|[\s\-:|]+\|$")


def count_pipes(line):
    return len(re.findall(r"(?<!\\)\|", line))


def _is_collection_terminator(stripped):
    if stripped.startswith("#"):
        return True
    if stripped.startswith("```"):
        return True
    return False


def _join_broken_header(result, expected_pipes):
    """Retroactively join broken header rows preceding a separator."""
    if not result:
        return

    pipe_indices = []
    for j in range(len(result) - 1, -1, -1):
        s = result[j].strip()
        if "|" in s:
            pipe_indices.append(j)
        elif s == "":
            continue
        elif SEPARATOR_PATTERN.match(s) or s.startswith("#") or s.startswith("```"):
            break
        else:
            if pipe_indices:
                continue
            else:
                break

    if len(pipe_indices) < 2:
        return

    start = min(pipe_indices)
    region = result[start:]
    non_blank = [l.strip() for l in region if l.strip()]

    if len(non_blank) <= 1:
        return

    joined = " ".join(l.strip() for l in region if l.strip())
    joined = re.sub(r"\s+", " ", joined)

    if count_pipes(joined) >= expected_pipes:
        del result[start:]
        result.append(joined)


def fix_broken_rows(md):
    lines = md.split("\n")
    result = []
    expected_pipes = 0
    i = 0

    while i < len(lines):
        stripped = lines[i].rstrip()

        if SEPARATOR_PATTERN.match(stripped):
            _join_broken_header(result, count_pipes(stripped))
            expected_pipes = count_pipes(stripped)
            result.append(lines[i])
            i += 1
            continue

        if expected_pipes > 0 and stripped.startswith("|"):
            pipes = count_pipes(stripped)
            if pipes >= expected_pipes:
                result.append(lines[i])
                i += 1
                continue

            parts = [stripped]
            i += 1
            while i < len(lines):
                ns = lines[i].rstrip()
                if ns.startswith("|") and count_pipes(ns) >= expected_pipes:
                    break
                if SEPARATOR_PATTERN.match(ns):
                    break
                if ns.strip() != "" and _is_collection_terminator(ns.strip()):
                    break
                parts.append(ns)
                i += 1

            joined = " ".join(p for p in parts if p.strip())
            joined = re.sub(r"\s+", " ", joined).strip()
            result.append(joined)
            continue

        if stripped == "":
            result.append(lines[i])
            i += 1
            continue

        if not stripped.startswith("|"):
            expected_pipes = 0

        result.append(lines[i])
        i += 1

    return "\n".join(result)
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_fix_aem_tables.py -v`
Expected: All 6 tests PASS

- [ ] **Step 5: Commit**

```bash
cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && git add scripts/fix_aem_tables.py scripts/test_fix_aem_tables.py && git commit -m "feat(aem): add broken table row joiner with blank-line tolerance"
```

---

### Task 6: fix_aem_tables.py — Header joining and continuation patterns

**Files:**
- Modify: `scripts/test_fix_aem_tables.py`
- Modify: `scripts/fix_aem_tables.py`

- [ ] **Step 1: Add tests for header joining and continuation patterns**

Append to `TestFixBrokenRows` class:

```python
    def test_header_cells_spanning_multiple_lines(self):
        md = (
            "|\n"
            "Category\n"
            "\n"
            " |\n"
            "\n"
            "License\n"
            "\n"
            " |\n"
            "| --- | --- |\n"
            "| Alerts | Premium |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| Category | License |", result)
        self.assertIn("| --- | --- |", result)
        self.assertIn("| Alerts | Premium |", result)

    def test_closing_pipe_on_own_line(self):
        md = (
            "| A | B |\n"
            "| --- | --- |\n"
            "| Cell1 |\n"
            "content\n"
            " |\n"
            "| Cell3 | Cell4 |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| Cell1 | content |", result)
        self.assertIn("| Cell3 | Cell4 |", result)

    def test_row_with_only_pipe_as_continuation(self):
        md = (
            "| A | B |\n"
            "| --- | --- |\n"
            "| X |\n"
            "Y\n"
            "|\n"
            "| Z | W |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| X | Y |", result)
        self.assertIn("| Z | W |", result)

    def test_list_items_inside_split_cell(self):
        md = (
            "| Section | Details |\n"
            "| --- | --- |\n"
            "| Match |\n"
            "Define criteria:\n"
            "-   Specify source\n"
            "-   Add destination\n"
            "\n"
            " |\n"
            "| Action | Allow |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| Match | Define criteria: - Specify source - Add destination |", result)
        self.assertIn("| Action | Allow |", result)
```

- [ ] **Step 2: Run tests to verify they pass (implementation already covers these patterns)**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_fix_aem_tables.py -v`
Expected: All 10 tests PASS — the state machine from Task 5 already handles these cases because:
- Header joining is handled by `_join_broken_header`
- Closing pipes (` |`), standalone `|`, blank lines, list items, and text content all pass through collection without triggering terminators

If any tests fail, review the collection logic — ensure `_is_collection_terminator` only matches `#` and `` ``` `` prefixes, and that blank lines and non-pipe content are collected (not treated as terminators).

- [ ] **Step 3: Commit**

```bash
cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && git add scripts/test_fix_aem_tables.py && git commit -m "test(aem): add tests for header joining and continuation patterns"
```

---

### Task 7: fix_aem_tables.py — Multiple tables and edge cases

**Files:**
- Modify: `scripts/test_fix_aem_tables.py`

- [ ] **Step 1: Add tests for multiple tables and non-table content preservation**

Append to `TestFixBrokenRows` class:

```python
    def test_multiple_tables_fixed_independently(self):
        md = (
            "| A | B |\n"
            "| --- | --- |\n"
            "| X |\n"
            "Y\n"
            " |\n"
            "\n"
            "Paragraph between tables.\n"
            "\n"
            "| C | D |\n"
            "| --- | --- |\n"
            "| P |\n"
            "Q\n"
            " |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| X | Y |", result)
        self.assertIn("| P | Q |", result)
        self.assertIn("Paragraph between tables.", result)

    def test_non_table_content_preserved_around_tables(self):
        md = (
            "# Heading\n"
            "\n"
            "Some intro text.\n"
            "\n"
            "| A | B |\n"
            "| --- | --- |\n"
            "| 1 | 2 |\n"
            "\n"
            "More text after.\n"
        )
        self.assertEqual(fix_broken_rows(md), md)

    def test_table_with_no_broken_rows_unchanged(self):
        md = (
            "| Name | Role | Active |\n"
            "| --- | --- | --- |\n"
            "| Alice | Admin | Yes |\n"
            "| Bob | Viewer | No |\n"
        )
        self.assertEqual(fix_broken_rows(md), md)

    def test_heading_terminates_collection(self):
        md = (
            "| A | B |\n"
            "| --- | --- |\n"
            "| X |\n"
            "# New Section\n"
            "| C | D |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("# New Section", result)
```

- [ ] **Step 2: Run tests to verify they pass**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_fix_aem_tables.py -v`
Expected: All 14 tests PASS

- [ ] **Step 3: Commit**

```bash
cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && git add scripts/test_fix_aem_tables.py && git commit -m "test(aem): add multiple-table and edge case tests for broken row joiner"
```

---

### Task 8: fix_aem_tables.py — File operations and CLI

**Files:**
- Modify: `scripts/test_fix_aem_tables.py`
- Modify: `scripts/fix_aem_tables.py`

- [ ] **Step 1: Add tests for fix_file**

Append to `scripts/test_fix_aem_tables.py`:

```python
import tempfile

from fix_aem_tables import fix_file


class TestFixFile(unittest.TestCase):
    def test_preserves_frontmatter(self):
        content = (
            "---\ntitle: test\n---\n"
            "| A | B |\n"
            "| --- | --- |\n"
            "| X |\n"
            "Y\n"
            " |\n"
        )
        result = self._fix(content)
        self.assertTrue(result.startswith("---\ntitle: test\n---\n"))
        self.assertIn("| X | Y |", result)

    def test_returns_zero_for_no_changes(self):
        content = (
            "---\ntitle: test\n---\n"
            "| A | B |\n"
            "| --- | --- |\n"
            "| 1 | 2 |\n"
        )
        self.assertEqual(self._fix_count(content), 0)

    def test_returns_nonzero_for_changes(self):
        content = (
            "---\ntitle: test\n---\n"
            "| A | B |\n"
            "| --- | --- |\n"
            "| X |\n"
            "Y\n"
            " |\n"
        )
        self.assertGreater(self._fix_count(content), 0)

    def test_dry_run_does_not_modify_file(self):
        content = (
            "---\ntitle: test\n---\n"
            "| A | B |\n"
            "| --- | --- |\n"
            "| X |\n"
            "Y\n"
            " |\n"
        )
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".md", delete=False, encoding="utf-8"
        ) as f:
            f.write(content)
            path = f.name
        try:
            fix_file(path, dry_run=True)
            with open(path, "r", encoding="utf-8") as f2:
                self.assertEqual(f2.read(), content)
        finally:
            os.unlink(path)

    def _fix(self, content):
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".md", delete=False, encoding="utf-8"
        ) as f:
            f.write(content)
            path = f.name
        try:
            fix_file(path, dry_run=False)
            with open(path, "r", encoding="utf-8") as f2:
                return f2.read()
        finally:
            os.unlink(path)

    def _fix_count(self, content):
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".md", delete=False, encoding="utf-8"
        ) as f:
            f.write(content)
            path = f.name
        try:
            return fix_file(path, dry_run=False)
        finally:
            os.unlink(path)
```

- [ ] **Step 2: Run tests to verify new tests fail**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_fix_aem_tables.py::TestFixFile -v`
Expected: FAIL — `ImportError: cannot import name 'fix_file'`

- [ ] **Step 3: Add find_frontmatter_end, fix_file, and main**

Append to `scripts/fix_aem_tables.py`:

```python
def find_frontmatter_end(text):
    if not text.startswith("---\n"):
        return 0
    second_fence = text.find("\n---\n", 4)
    if second_fence == -1:
        return 0
    return second_fence + len("\n---\n")


def fix_file(filepath, *, dry_run):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    body_start = find_frontmatter_end(content)
    frontmatter = content[:body_start]
    body = content[body_start:]

    new_body = fix_broken_rows(body)

    if new_body == body:
        return 0

    orig_lines = body.split("\n")
    new_lines = new_body.split("\n")
    collapsed = len(orig_lines) - len(new_lines)

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(frontmatter + new_body)

    filename = os.path.basename(filepath)
    prefix = "[DRY RUN] Would fix" if dry_run else "Fixed"
    print(f"{prefix} {filename} ({collapsed} lines collapsed)")
    return collapsed


def main():
    parser = argparse.ArgumentParser(
        description="Rejoin broken markdown table rows in AEM-sourced files"
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
        help="Custom source directory",
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
    total_collapsed = 0

    for filepath in files:
        count = fix_file(filepath, dry_run=args.dry_run)
        if count > 0:
            total_files += 1
            total_collapsed += count

    print(f"Fixed {total_files} files, {total_collapsed} lines collapsed")


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_fix_aem_tables.py -v`
Expected: All 18 tests PASS

- [ ] **Step 5: Commit**

```bash
cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && git add scripts/fix_aem_tables.py scripts/test_fix_aem_tables.py && git commit -m "feat(aem): add file operations and CLI for broken table row joiner"
```

---

### Task 9: Pipeline integration

**Files:**
- Modify: `scripts/fix.js:43-49`

- [ ] **Step 1: Update AEM pipeline in fix.js**

In `scripts/fix.js`, replace the AEM command array (lines 43-49):

```javascript
  const cmds = isAEM
    ? [
        `python scripts/fix_aem_chrome.py --sources "${dir}"`,
        `python scripts/fix_aem_links.py --sources "${dir}"`,
        `python scripts/fix_aem_html_tables.py --sources "${dir}"`,
        `python scripts/fix_aem_tables.py --sources "${dir}"`,
        `python scripts/fix_escaped_underscores.py --sources "${dir}"`,
        `python scripts/fix_broken_tables.py --sources "${dir}"`,
      ]
```

Pipeline order rationale (per spec):
1. `fix_aem_chrome.py` — strip CMS chrome
2. `fix_aem_links.py` — strip images, clean links
3. `fix_aem_html_tables.py` — **NEW:** convert raw HTML tables to markdown
4. `fix_aem_tables.py` — **NEW:** rejoin broken markdown table rows
5. `fix_escaped_underscores.py` — unescape `\_`
6. `fix_broken_tables.py` — safety net for any remaining simple splits

- [ ] **Step 2: Run all tests to verify nothing is broken**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_fix_aem_html_tables.py scripts/test_fix_aem_tables.py scripts/test_fix_broken_tables.py scripts/test_fix_aem_links.py -v`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && git add scripts/fix.js && git commit -m "feat(aem): add HTML table and broken row fixers to AEM pipeline"
```
