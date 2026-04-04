# AEM Fix Scripts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build two Python scripts (`fix_aem_chrome.py`, `fix_aem_links.py`) that strip CMS chrome, fix link paths, and remove images from AEM-sourced markdown files, then integrate them into the fix pipeline in `fix.js`.

**Architecture:** Boundary-based detection finds the content between header/footer chrome using sidebar navigation markers and the Usabilla JavaScript block. Pattern-based cleanup handles residual artifacts (timestamps, navigation, dividers). A separate script strips images and cleans CMS link paths. Both follow the existing fix script conventions (argparse, `--sources`, `--dry-run`, frontmatter preservation, `[0-9]*.md` glob).

**Tech Stack:** Python 3 (stdlib only: `re`, `argparse`, `glob`, `os`, `sys`), Node.js (fix.js orchestrator)

**Spec:** `docs/superpowers/specs/2026-04-04-aem-fix-scripts-design.md`

---

## File Structure

```
scripts/
  fix_aem_chrome.py           # NEW — CMS header/footer chrome removal + pattern cleanup
  fix_aem_links.py            # NEW — Image stripping + CMS link path cleaning
  test_fix_aem_chrome.py      # NEW — Tests for fix_aem_chrome.py
  test_fix_aem_links.py       # NEW — Tests for fix_aem_links.py
  fix.js                      # MODIFY — Route SASE dirs to AEM pipeline, Cortex dirs to existing pipeline
```

**Responsibilities:**

| File | Pure function | File I/O | CLI |
|------|--------------|----------|-----|
| `fix_aem_chrome.py` | `strip_chrome(body) -> str` | `fix_file(filepath, *, dry_run) -> int` | `main()` with `--sources`, `--dry-run` |
| `fix_aem_links.py` | `clean_body(body) -> str` | `fix_file(filepath, *, dry_run) -> int` | `main()` with `--sources`, `--dry-run` |
| `fix.js` | — | — | Checks `SASE_PRODUCTS[dirName]` to pick pipeline |

**Internal helpers in `fix_aem_chrome.py`** (tested indirectly through `strip_chrome`, directly through `clean_patterns`):
- `find_content_start(body) -> int | None` — finds position after header chrome
- `find_content_end(body, search_from) -> int` — finds position before footer chrome
- `clean_patterns(body) -> str` — removes residual CMS artifacts from content body

**Internal helpers in `fix_aem_links.py`** (tested indirectly through `clean_body`):
- `_clean_link_url(url) -> str` — transforms a single URL

---

### Task 1: `fix_aem_chrome.py` — Boundary Detection

**Files:**
- Create: `scripts/test_fix_aem_chrome.py`
- Create: `scripts/fix_aem_chrome.py`

- [ ] **Step 1: Write boundary detection tests**

```python
#!/usr/bin/env python3
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(__file__))
from fix_aem_chrome import strip_chrome


HEADER_CHROME = (
    "# slug-style:page-name\n"
    "Some title text\n\n"
    "Updated on\n\nThu Mar 26 14:01:29 PDT 2026\n\n"
    "Focus\n\n"
    "### Prisma Access Docs\n\n* * *\n\n- Nav item 1\n- Nav item 2\n\n"
    "Updated on\n\nThu Mar 26 14:01:29 PDT 2026\n\n"
    "Focus\n\n"
    "1. [Home](/)\n2. [Page](/content/techdocs/en_US/page.html)\n\n"
    "Prisma Access\n\n"
    "# Page Title\n\n"
    "Table of Contents\n\n"
    "Expand All | Collapse All\n\n"
    "### Prisma Access Docs\n\n* * *\n\n- Nav item 1\n- Nav item 2\n\n"
)

CONTENT = (
    "# Page Title\n\n"
    "This is the actual content.\n\n"
    "More content here.\n"
)

FOOTER_USABILLA = (
    "\nif (!usabilla_config) { var usabilla_config = 1; }\n\n"
    "* * *\n\n"
    "#### On This Page\n\n"
    "### Some Section\n\n"
    "[Link](/content/techdocs/en_US/page.html)\n"
)

FOOTER_ON_THIS_PAGE = (
    "\n#### On This Page\n\n"
    "### Some Section\n\n"
    "[Link](/content/techdocs/en_US/page.html)\n"
)


class TestStripChrome(unittest.TestCase):
    def test_strips_header_and_footer_chrome(self):
        body = HEADER_CHROME + CONTENT + FOOTER_USABILLA
        result = strip_chrome(body)
        self.assertIn("This is the actual content.", result)
        self.assertIn("# Page Title", result)
        self.assertNotIn("slug-style:page-name", result)
        self.assertNotIn("Nav item", result)
        self.assertNotIn("usabilla", result)
        self.assertNotIn("On This Page", result)

    def test_strips_footer_at_usabilla_marker(self):
        body = HEADER_CHROME + CONTENT + FOOTER_USABILLA
        result = strip_chrome(body)
        self.assertNotIn("usabilla", result)
        self.assertNotIn("On This Page", result)

    def test_footer_falls_back_to_on_this_page(self):
        body = HEADER_CHROME + CONTENT + FOOTER_ON_THIS_PAGE
        result = strip_chrome(body)
        self.assertIn("This is the actual content.", result)
        self.assertNotIn("On This Page", result)

    def test_passes_through_when_no_sidebar_markers(self):
        body = "# Normal Page\n\nJust regular content.\n"
        result = strip_chrome(body)
        self.assertEqual(result, body)

    def test_passes_through_when_only_one_sidebar_marker(self):
        body = "### Prisma Access Docs\n\n# Title\n\nContent.\n"
        result = strip_chrome(body)
        self.assertEqual(result, body)

    def test_content_ends_with_single_newline(self):
        body = HEADER_CHROME + CONTENT + FOOTER_USABILLA
        result = strip_chrome(body)
        self.assertTrue(result.endswith("\n"))
        self.assertFalse(result.endswith("\n\n"))


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python scripts/test_fix_aem_chrome.py -v`
Expected: `ModuleNotFoundError: No module named 'fix_aem_chrome'`

- [ ] **Step 3: Implement boundary detection**

```python
#!/usr/bin/env python3
"""Strip CMS header/footer chrome and clean patterns from AEM-sourced markdown files."""

import re

SIDEBAR_MARKER = re.compile(r"^#{1,6}\s+Prisma Access Docs\s*$", re.MULTILINE)
CONTENT_H1 = re.compile(r"^# .+$", re.MULTILINE)
ON_THIS_PAGE = re.compile(r"^#{1,6}\s+On This Page\s*$", re.MULTILINE)


def find_content_start(body):
    matches = list(SIDEBAR_MARKER.finditer(body))
    if len(matches) < 2:
        return None
    h1 = CONTENT_H1.search(body, matches[1].end())
    if h1 is None:
        return None
    return h1.start()


def find_content_end(body, search_from=0):
    usabilla_pos = body.find("if (!usabilla", search_from)
    if usabilla_pos != -1:
        line_start = body.rfind("\n", 0, usabilla_pos)
        return line_start + 1 if line_start != -1 else usabilla_pos
    otp_match = ON_THIS_PAGE.search(body, search_from)
    if otp_match:
        return otp_match.start()
    return len(body)


def clean_patterns(body):
    return body


def strip_chrome(body):
    start = find_content_start(body)
    if start is None:
        return body
    end = find_content_end(body, start)
    content = body[start:end]
    content = clean_patterns(content)
    return content.rstrip("\n") + "\n"
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `python scripts/test_fix_aem_chrome.py -v`
Expected: all 6 tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/fix_aem_chrome.py scripts/test_fix_aem_chrome.py
git commit -m "feat(aem): add boundary detection for CMS chrome stripping"
```

---

### Task 2: `fix_aem_chrome.py` — Pattern Cleanup

**Files:**
- Modify: `scripts/test_fix_aem_chrome.py`
- Modify: `scripts/fix_aem_chrome.py`

- [ ] **Step 1: Write pattern cleanup tests**

Append to `scripts/test_fix_aem_chrome.py` (before `if __name__`):

```python
from fix_aem_chrome import clean_patterns


class TestCleanPatterns(unittest.TestCase):
    def test_removes_updated_on_timestamp(self):
        body = "Content before.\n\nUpdated on\n\nThu Mar 26 14:01:29 PDT 2026\n\nContent after.\n"
        result = clean_patterns(body)
        self.assertNotIn("Updated on", result)
        self.assertNotIn("Thu Mar", result)
        self.assertIn("Content before.", result)
        self.assertIn("Content after.", result)

    def test_removes_download_pdf(self):
        body = "Content before.\n\nDownload PDF\n\nContent after.\n"
        result = clean_patterns(body)
        self.assertNotIn("Download PDF", result)
        self.assertIn("Content before.", result)
        self.assertIn("Content after.", result)

    def test_removes_previous_next_navigation(self):
        body = (
            "Content before.\n\n"
            "[\n\nPrevious\n\nSome Previous Title\n\n\n\n"
            "](/content/techdocs/en_US/prev-page.html)\n\n"
            "[\n\nNext\n\nSome Next Title\n\n"
            "](/content/techdocs/en_US/next-page.html)\n\n"
            "Content after.\n"
        )
        result = clean_patterns(body)
        self.assertNotIn("Previous", result)
        self.assertNotIn("Next", result)
        self.assertNotIn("prev-page", result)
        self.assertIn("Content before.", result)
        self.assertIn("Content after.", result)

    def test_removes_horizontal_rule_dividers(self):
        body = "Content before.\n\n* * *\n\nContent after.\n"
        result = clean_patterns(body)
        self.assertNotIn("* * *", result)
        self.assertIn("Content before.", result)
        self.assertIn("Content after.", result)

    def test_removes_slug_style_h1_at_start(self):
        body = "# prisma-access:admin:topic-name\nSome subtitle\n\nContent.\n"
        result = clean_patterns(body)
        self.assertNotIn("prisma-access:admin:topic-name", result)
        self.assertIn("Some subtitle", result)
        self.assertIn("Content.", result)

    def test_preserves_normal_h1(self):
        body = "# Configure ADFS as a SAML Provider\n\nContent.\n"
        result = clean_patterns(body)
        self.assertIn("# Configure ADFS as a SAML Provider", result)

    def test_collapses_excessive_blank_lines(self):
        body = "Before.\n\n\n\n\nAfter.\n"
        result = clean_patterns(body)
        self.assertEqual(result, "Before.\n\nAfter.\n")

    def test_preserves_normal_content_unchanged(self):
        body = "# Title\n\nParagraph one.\n\nParagraph two.\n"
        result = clean_patterns(body)
        self.assertEqual(result, body)
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python scripts/test_fix_aem_chrome.py TestCleanPatterns -v`
Expected: `test_removes_updated_on_timestamp` FAIL (clean_patterns is a no-op stub)

- [ ] **Step 3: Implement pattern cleanup**

Replace the `clean_patterns` stub in `scripts/fix_aem_chrome.py`:

```python
UPDATED_ON = re.compile(r"^Updated on\s*\n\s*\n.+$", re.MULTILINE)
DOWNLOAD_PDF = re.compile(r"^Download PDF\s*$", re.MULTILINE)
PREV_NEXT = re.compile(r"\[\s*(?:Previous|Next)\s*\n[\s\S]*?\]\([^\)]+\)")
HR_DIVIDER = re.compile(r"^\* \* \*\s*$", re.MULTILINE)
SLUG_H1 = re.compile(r"^# [a-z][a-z0-9:\-]+\s*$", re.MULTILINE)
MULTI_BLANK = re.compile(r"\n{3,}")


def clean_patterns(body):
    body = UPDATED_ON.sub("", body)
    body = DOWNLOAD_PDF.sub("", body)
    body = PREV_NEXT.sub("", body)
    body = HR_DIVIDER.sub("", body)
    first_h1 = re.search(r"^# (.+)$", body, re.MULTILINE)
    if first_h1 and re.match(r"[a-z][a-z0-9:\-]+$", first_h1.group(1).strip()):
        end = first_h1.end()
        if end < len(body) and body[end] == "\n":
            end += 1
        body = body[: first_h1.start()] + body[end:]
    body = MULTI_BLANK.sub("\n\n", body)
    return body
```

- [ ] **Step 4: Run all tests to verify they pass**

Run: `python scripts/test_fix_aem_chrome.py -v`
Expected: all 14 tests PASS (6 boundary + 8 pattern)

- [ ] **Step 5: Commit**

```bash
git add scripts/fix_aem_chrome.py scripts/test_fix_aem_chrome.py
git commit -m "feat(aem): add pattern cleanup for timestamps, nav, dividers, slug H1"
```

---

### Task 3: `fix_aem_chrome.py` — File I/O Integration

**Files:**
- Modify: `scripts/test_fix_aem_chrome.py`
- Modify: `scripts/fix_aem_chrome.py`

- [ ] **Step 1: Write fix_file tests**

Append to `scripts/test_fix_aem_chrome.py` (before `if __name__`):

```python
import tempfile
from fix_aem_chrome import fix_file


class TestFixFile(unittest.TestCase):
    def test_preserves_frontmatter(self):
        content = (
            "---\ntitle: \"test\"\n---\n"
            + HEADER_CHROME + CONTENT + FOOTER_USABILLA
        )
        result = self._fix(content)
        self.assertTrue(result.startswith("---\ntitle: \"test\"\n---\n"))
        self.assertIn("This is the actual content.", result)
        self.assertNotIn("Nav item", result)

    def test_returns_zero_when_no_changes(self):
        content = "---\ntitle: \"test\"\n---\n# Title\n\nPlain content.\n"
        count = self._fix_count(content)
        self.assertEqual(count, 0)

    def test_returns_nonzero_when_chrome_stripped(self):
        content = (
            "---\ntitle: \"test\"\n---\n"
            + HEADER_CHROME + CONTENT + FOOTER_USABILLA
        )
        count = self._fix_count(content)
        self.assertGreater(count, 0)

    def test_dry_run_does_not_modify_file(self):
        content = (
            "---\ntitle: \"test\"\n---\n"
            + HEADER_CHROME + CONTENT + FOOTER_USABILLA
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

- [ ] **Step 2: Run tests to verify they fail**

Run: `python scripts/test_fix_aem_chrome.py TestFixFile -v`
Expected: `ImportError` (fix_file not yet defined)

- [ ] **Step 3: Implement fix_file and main**

Add to `scripts/fix_aem_chrome.py`:

```python
import argparse
import glob
import os
import sys


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

    new_body = strip_chrome(body)

    if new_body == body:
        return 0

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(frontmatter + new_body)

    filename = os.path.basename(filepath)
    prefix = "[DRY RUN] Would fix" if dry_run else "Fixed"
    print(f"{prefix} {filename} (stripped CMS chrome)")
    return 1


def main():
    parser = argparse.ArgumentParser(
        description="Strip CMS header/footer chrome from AEM-sourced markdown files"
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
    for filepath in files:
        count = fix_file(filepath, dry_run=args.dry_run)
        if count > 0:
            total_files += 1

    print(f"Fixed {total_files} files")


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run all tests to verify they pass**

Run: `python scripts/test_fix_aem_chrome.py -v`
Expected: all 18 tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/fix_aem_chrome.py scripts/test_fix_aem_chrome.py
git commit -m "feat(aem): add fix_file and CLI for fix_aem_chrome.py"
```

---

### Task 4: `fix_aem_links.py` — Content Transformation

**Files:**
- Create: `scripts/test_fix_aem_links.py`
- Create: `scripts/fix_aem_links.py`

- [ ] **Step 1: Write clean_body tests**

```python
#!/usr/bin/env python3
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(__file__))
from fix_aem_links import clean_body


class TestCleanBody(unittest.TestCase):
    # --- Image stripping ---

    def test_removes_standard_markdown_image(self):
        body = "Before.\n\n![screenshot](/content/dam/techdocs/en_US/images/screenshot.png)\n\nAfter.\n"
        result = clean_body(body)
        self.assertNotIn("![", result)
        self.assertIn("Before.", result)
        self.assertIn("After.", result)

    def test_removes_emphasized_directional_arrow_image(self):
        body = "Item\n\n_![directional arrow](/content/dam/techdocs/en_US/images/icons/css/thick-greater-than-icon.svg)_\n\nMore.\n"
        result = clean_body(body)
        self.assertNotIn("directional arrow", result)
        self.assertNotIn("_!", result)
        self.assertIn("Item", result)
        self.assertIn("More.", result)

    def test_removes_inline_image(self):
        body = "Click ![icon](/content/dam/techdocs/en_US/images/icon.svg) to continue.\n"
        result = clean_body(body)
        self.assertNotIn("![", result)
        self.assertIn("Click", result)
        self.assertIn("to continue.", result)

    def test_collapses_blank_lines_after_image_removal(self):
        body = "Before.\n\n![img](url)\n\n\n\nAfter.\n"
        result = clean_body(body)
        self.assertNotIn("\n\n\n", result)
        self.assertIn("Before.", result)
        self.assertIn("After.", result)

    # --- Link path cleaning ---

    def test_strips_cms_prefix_from_relative_link(self):
        body = "[Page](/content/techdocs/en_US/prisma-access.html)\n"
        result = clean_body(body)
        self.assertEqual(result, "[Page](/prisma-access)\n")

    def test_strips_cms_prefix_and_html_from_absolute_url(self):
        body = "[Page](https://docs.paloaltonetworks.com/content/techdocs/en_US/prisma-access.html)\n"
        result = clean_body(body)
        self.assertEqual(result, "[Page](/prisma-access)\n")

    def test_preserves_fragment_after_html_extension(self):
        body = "[Section](/content/techdocs/en_US/prisma-access/page.html#section-id)\n"
        result = clean_body(body)
        self.assertEqual(result, "[Section](/prisma-access/page#section-id)\n")

    def test_strips_cms_prefix_without_html_extension(self):
        body = "[Page](/content/techdocs/en_US/prisma-access/admin)\n"
        result = clean_body(body)
        self.assertEqual(result, "[Page](/prisma-access/admin)\n")

    def test_leaves_non_cms_links_unchanged(self):
        body = "[Microsoft](https://docs.microsoft.com/en-us/page)\n"
        result = clean_body(body)
        self.assertEqual(result, "[Microsoft](https://docs.microsoft.com/en-us/page)\n")

    def test_leaves_public_paloalto_links_without_cms_prefix_unchanged(self):
        body = "[License](https://docs.paloaltonetworks.com/prisma-access/administration/license)\n"
        result = clean_body(body)
        self.assertEqual(result, "[License](https://docs.paloaltonetworks.com/prisma-access/administration/license)\n")

    def test_preserves_plain_text_without_links_or_images(self):
        body = "Just plain text.\n\nAnother paragraph.\n"
        result = clean_body(body)
        self.assertEqual(result, body)

    def test_handles_empty_body(self):
        self.assertEqual(clean_body(""), "")


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python scripts/test_fix_aem_links.py -v`
Expected: `ModuleNotFoundError: No module named 'fix_aem_links'`

- [ ] **Step 3: Implement clean_body**

```python
#!/usr/bin/env python3
"""Strip images and clean CMS link paths from AEM-sourced markdown files."""

import re

EMPH_IMAGE = re.compile(r"_!\[[^\]]*\]\([^\)]*\)_")
IMAGE = re.compile(r"!\[[^\]]*\]\([^\)]*\)")
LINK = re.compile(r"\[([^\]]+)\]\(([^\)]+)\)")
MULTI_BLANK = re.compile(r"\n{3,}")

CMS_PREFIX = "/content/techdocs/en_US"
AEM_DOMAIN = "https://docs.paloaltonetworks.com"


def _clean_link_url(url):
    cleaned = url
    if cleaned.startswith(AEM_DOMAIN):
        cleaned = cleaned[len(AEM_DOMAIN) :]
    if not cleaned.startswith(CMS_PREFIX):
        return url
    cleaned = cleaned[len(CMS_PREFIX) :]
    cleaned = re.sub(r"\.html(?=#|$)", "", cleaned)
    return cleaned


def clean_link_paths(body):
    def replace_link(m):
        text = m.group(1)
        url = _clean_link_url(m.group(2))
        return f"[{text}]({url})"

    return LINK.sub(replace_link, body)


def clean_body(body):
    body = EMPH_IMAGE.sub("", body)
    body = IMAGE.sub("", body)
    body = clean_link_paths(body)
    body = MULTI_BLANK.sub("\n\n", body)
    return body
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `python scripts/test_fix_aem_links.py -v`
Expected: all 12 tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/fix_aem_links.py scripts/test_fix_aem_links.py
git commit -m "feat(aem): add image stripping and CMS link path cleaning"
```

---

### Task 5: `fix_aem_links.py` — File I/O Integration

**Files:**
- Modify: `scripts/test_fix_aem_links.py`
- Modify: `scripts/fix_aem_links.py`

- [ ] **Step 1: Write fix_file tests**

Append to `scripts/test_fix_aem_links.py` (before `if __name__`):

```python
import tempfile
from fix_aem_links import fix_file


class TestFixFile(unittest.TestCase):
    def test_preserves_frontmatter(self):
        content = '---\ntitle: "test"\n---\n![img](url)\nSome text\n'
        result = self._fix(content)
        self.assertTrue(result.startswith('---\ntitle: "test"\n---\n'))
        self.assertNotIn("![", result)
        self.assertIn("Some text", result)

    def test_returns_zero_when_no_changes(self):
        content = '---\ntitle: "test"\n---\nJust plain text.\n'
        count = self._fix_count(content)
        self.assertEqual(count, 0)

    def test_returns_nonzero_when_changes_made(self):
        content = '---\ntitle: "test"\n---\n![img](url)\nText\n'
        count = self._fix_count(content)
        self.assertGreater(count, 0)

    def test_dry_run_does_not_modify_file(self):
        content = '---\ntitle: "test"\n---\n![img](url)\n'
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

- [ ] **Step 2: Run tests to verify they fail**

Run: `python scripts/test_fix_aem_links.py TestFixFile -v`
Expected: `ImportError` (fix_file not yet defined)

- [ ] **Step 3: Implement fix_file and main**

Add to `scripts/fix_aem_links.py`:

```python
import argparse
import glob
import os
import sys


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

    new_body = clean_body(body)

    if new_body == body:
        return 0

    images_removed = len(IMAGE.findall(body)) + len(EMPH_IMAGE.findall(body))
    links_cleaned = sum(
        1 for m in LINK.finditer(body) if _clean_link_url(m.group(2)) != m.group(2)
    )
    total = images_removed + links_cleaned

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(frontmatter + new_body)

    filename = os.path.basename(filepath)
    prefix = "[DRY RUN] Would fix" if dry_run else "Fixed"
    details = []
    if images_removed:
        details.append(f"{images_removed} images")
    if links_cleaned:
        details.append(f"{links_cleaned} links")
    print(f"{prefix} {filename} ({', '.join(details)})")
    return total


def main():
    parser = argparse.ArgumentParser(
        description="Strip images and clean CMS link paths from AEM-sourced markdown files"
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
    total_changes = 0
    for filepath in files:
        count = fix_file(filepath, dry_run=args.dry_run)
        if count > 0:
            total_files += 1
            total_changes += count

    print(f"Fixed {total_files} files, {total_changes} total changes")


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run all tests to verify they pass**

Run: `python scripts/test_fix_aem_links.py -v`
Expected: all 16 tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/fix_aem_links.py scripts/test_fix_aem_links.py
git commit -m "feat(aem): add fix_file and CLI for fix_aem_links.py"
```

---

### Task 6: Pipeline Integration in `fix.js`

**Files:**
- Modify: `scripts/fix.js:40-46`

- [ ] **Step 1: Read current fix.js to confirm structure**

Run: `cat -n scripts/fix.js`

Verify lines 40-46 contain the `cmds` array.

- [ ] **Step 2: Modify fix.js to route SASE dirs to AEM pipeline**

Replace the single `cmds` array with pipeline selection based on `SASE_PRODUCTS`:

```javascript
  const dirName = path.basename(dir);
  const isAEM = !!SASE_PRODUCTS[dirName];

  const cmds = isAEM
    ? [
        `python scripts/fix_aem_chrome.py --sources "${dir}"`,
        `python scripts/fix_aem_links.py --sources "${dir}"`,
        `python scripts/fix_escaped_underscores.py --sources "${dir}"`,
        `python scripts/fix_broken_tables.py --sources "${dir}"`,
      ]
    : [
        `python scripts/fix_abstract_lines.py --sources "${dir}"`,
        `python scripts/fix_escaped_chars_in_fences.py "${dir}"`,
        `python scripts/fix_escaped_underscores.py --sources "${dir}"`,
        `python scripts/fix_images_and_fences.py --sources "${dir}"`,
        `python scripts/fix_broken_tables.py --sources "${dir}"`,
      ];
```

This replaces lines 40-46 of the current `fix.js`. The `dirName` check against `SASE_PRODUCTS` (already imported at line 5) determines which pipeline runs.

- [ ] **Step 3: Run AEM pipeline on Prisma Access files to verify**

Run: `node scripts/fix.js --product prisma_access`

Expected: Output shows `fix_aem_chrome.py` and `fix_aem_links.py` running instead of the Cortex scripts. Verify a sample output file is clean markdown (no sidebar nav, no Usabilla, no CMS link prefixes, no images).

- [ ] **Step 4: Spot-check a cleaned file**

Run: `head -50 sources_fetch/prisma_access/0001-*.md`

Expected: File starts with YAML frontmatter, followed directly by `# Configure ADFS...` heading and content. No sidebar navigation, no "Updated on", no `* * *` dividers, no images, links use clean paths like `/prisma-access/...` instead of `/content/techdocs/en_US/...`.

- [ ] **Step 5: Commit**

```bash
git add scripts/fix.js
git commit -m "feat(aem): route SASE products to AEM fix pipeline in fix.js"
```
