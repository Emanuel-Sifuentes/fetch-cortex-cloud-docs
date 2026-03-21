# RAG Pre-Segmentation Script Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `scripts/segment_combined.py` — a script that pre-segments combined markdown files into ~4-8KB semantically coherent pieces for GCP Vertex AI RAG Engine ingestion.

**Architecture:** AST-based recursive heading splitter using `mistune` v3. Scans combined markdown line-by-line to locate heading offsets, builds a heading tree, and recursively splits oversized sections at heading boundaries. Leaf sections exceeding the size target are split using greedy packing with atomic unit protection (tables, code blocks, ordered lists kept intact). Every segment is prepended with a breadcrumb for retrieval context.

**Tech Stack:** Python 3.10+, mistune v3 (AST parsing), pytest (testing)

**Spec:** `docs/superpowers/specs/2026-03-20-rag-segment-combined-design.md`

---

## File Structure

### Files to Create

| File | Responsibility |
|------|----------------|
| `scripts/segment_combined.py` | Main script: constants, data structures, heading scanning, tree building, breadcrumb formatting, recursive segment emission, atomic unit identification, greedy leaf packing, sibling merging, file I/O, CLI |
| `scripts/test_segment_combined.py` | All tests: factory functions, unit tests for each component, integration test |

### Key Data Structures (in `segment_combined.py`)

```python
@dataclass
class HeadingSection:
    level: int                              # 1-6
    title: str                              # heading text
    start_offset: int                       # char offset in raw text
    end_offset: int                         # char offset of next section or EOF
    children: list["HeadingSection"]        # child headings
    breadcrumb: list[str]                   # ancestor titles (NOT including own)

@dataclass
class Segment:
    text: str                               # full segment text including breadcrumb
    title: str                              # heading title (for filename slug)
```

### Constants (in `segment_combined.py`)

Duplicated from `scripts/split_combined.py` / `scripts/map_config.js`:

```python
DEFAULT_MAX_SIZE = 8000

COMBINED_FILES = {
    "appsec": "cortex-cloud-appsec-combined.md",
    "posture": "cortex-cloud-posture-combined.md",
    "runtime": "cortex-cloud-runtime-combined.md",
    "cortex_gateway": "cortex-gateway-combined.md",
    "xdr_5": "cortex-xdr-5-combined.md",
    "xdr_compatibility": "cortex-xdr-compatibility-combined.md",
    "xsiam_3": "cortex-xsiam-3-combined.md",
    "agentix": "cortex-agentix-combined.md",
}

PRODUCTS = {
    "cloud": ["appsec", "posture", "runtime"],
    "xdr": ["xdr_5", "xdr_compatibility"],
    "xsiam": ["xsiam_3"],
    "gateway": ["cortex_gateway"],
    "agentix": ["agentix"],
}

DISPLAY_NAMES = {
    "agentix": "Cortex AgentiX",
    "appsec": "Cortex Cloud Application Security",
    "cortex_gateway": "Cortex Gateway",
    "posture": "Cortex Cloud Posture Management",
    "runtime": "Cortex Cloud Runtime Security",
    "xdr_5": "Cortex XDR",
    "xdr_compatibility": "Cortex XDR Compatibility",
    "xsiam_3": "Cortex XSIAM",
}
```

### Function Signatures (public API)

```python
def slugify(title: str) -> str: ...
def scan_heading_offsets(raw_text: str) -> list[tuple[int, str, int]]: ...
def build_heading_tree(headings: list[tuple[int, str, int]], text_length: int) -> list[HeadingSection]: ...
def format_breadcrumb(display_name: str, breadcrumb: list[str], title: str) -> str: ...
def emit_segments(section: HeadingSection, raw_text: str, max_size: int, display_name: str) -> list[Segment]: ...
def identify_atomic_units(body_text: str) -> list[str]: ...
def pack_leaf(section: HeadingSection, raw_text: str, max_size: int, display_name: str) -> list[Segment]: ...
def merge_small_siblings(segments: list[Segment], max_size: int) -> list[Segment]: ...
def segment_combined_file(combined_path: Path, output_dir: Path, map_name: str, max_size: int) -> dict: ...
def main() -> None: ...
```

---

## Task 1: Setup + Data Structures + Slugify

**Files:**
- Create: `scripts/test_segment_combined.py`
- Create: `scripts/segment_combined.py`

- [ ] **Step 1: Write failing tests for slugify and data structures**

```python
# scripts/test_segment_combined.py
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

from segment_combined import HeadingSection, Segment, slugify, DEFAULT_MAX_SIZE


def test_slugify_basic_title():
    assert slugify("Learn about Cortex XDR") == "learn-about-cortex-xdr"


def test_slugify_strips_special_chars():
    assert slugify("What's New? (v3.0)") == "whats-new-v30"


def test_slugify_collapses_dashes():
    assert slugify("Configure -- Advanced --- Settings") == "configure-advanced-settings"


def test_heading_section_defaults():
    section = HeadingSection(level=1, title="Test", start_offset=0, end_offset=100)
    assert section.children == []
    assert section.breadcrumb == []


def test_segment_has_text_and_title():
    seg = Segment(text="content", title="Title")
    assert seg.text == "content"
    assert seg.title == "Title"


def test_default_max_size_is_8000():
    assert DEFAULT_MAX_SIZE == 8000
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_segment_combined.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'segment_combined'`

- [ ] **Step 3: Write minimal implementation**

```python
# scripts/segment_combined.py
"""Pre-segment combined markdown files for RAG Engine ingestion.

Splits combined files into ~4-8KB semantically coherent segments that respect
markdown structure (headings, tables, code blocks, lists). Each segment is
prepended with a breadcrumb for retrieval context.
"""

import re
from dataclasses import dataclass, field


DEFAULT_MAX_SIZE = 8000


@dataclass
class HeadingSection:
    level: int
    title: str
    start_offset: int
    end_offset: int
    children: list["HeadingSection"] = field(default_factory=list)
    breadcrumb: list[str] = field(default_factory=list)


@dataclass
class Segment:
    text: str
    title: str


def slugify(title: str) -> str:
    slug = title.lower().strip()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[\s_]+", "-", slug)
    slug = re.sub(r"-+", "-", slug)
    return slug.strip("-")
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python -m pytest scripts/test_segment_combined.py -v`
Expected: 6 passed

- [ ] **Step 5: Commit**

```bash
git add scripts/segment_combined.py scripts/test_segment_combined.py
git commit -m "feat(segment): add data structures and slugify"
```

---

## Task 2: Heading Offset Scanning

**Files:**
- Modify: `scripts/test_segment_combined.py`
- Modify: `scripts/segment_combined.py`

- [ ] **Step 1: Write failing tests for scan_heading_offsets**

Add to `test_segment_combined.py`:

```python
from segment_combined import scan_heading_offsets


def test_scan_detects_headings_with_levels_and_offsets():
    text = "# Title\n\nSome text\n\n## Sub\n\nMore text\n"
    result = scan_heading_offsets(text)
    assert result == [(1, "Title", 0), (2, "Sub", 20)]


def test_scan_ignores_headings_inside_code_fences():
    text = "# Real\n\n```\n# Fake\n```\n\n## Also Real\n"
    result = scan_heading_offsets(text)
    titles = [title for _, title, _ in result]
    assert titles == ["Real", "Also Real"]


def test_scan_handles_h1_through_h6():
    text = "# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6\n"
    result = scan_heading_offsets(text)
    levels = [level for level, _, _ in result]
    assert levels == [1, 2, 3, 4, 5, 6]


def test_scan_returns_empty_for_no_headings():
    text = "Just plain text.\n\nNo headings here.\n"
    assert scan_heading_offsets(text) == []


def test_scan_handles_consecutive_code_fences():
    text = "# Top\n\n```\ncode\n```\n\n```\n# Not heading\n```\n\n## Next\n"
    result = scan_heading_offsets(text)
    titles = [t for _, t, _ in result]
    assert titles == ["Top", "Next"]
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest scripts/test_segment_combined.py::test_scan_detects_headings_with_levels_and_offsets -v`
Expected: FAIL — `ImportError: cannot import name 'scan_heading_offsets'`

- [ ] **Step 3: Write implementation**

Add to `segment_combined.py`:

```python
def scan_heading_offsets(raw_text: str) -> list[tuple[int, str, int]]:
    headings = []
    offset = 0
    in_code_block = False

    for line in raw_text.split("\n"):
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code_block = not in_code_block

        if not in_code_block:
            match = re.match(r"^(#{1,6}) (.+)$", line)
            if match:
                level = len(match.group(1))
                title = match.group(2).strip()
                headings.append((level, title, offset))

        offset += len(line) + 1

    return headings
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "scan"`
Expected: 5 passed

- [ ] **Step 5: Commit**

```bash
git add scripts/segment_combined.py scripts/test_segment_combined.py
git commit -m "feat(segment): add heading offset scanner"
```

---

## Task 3: Heading Tree Construction

**Files:**
- Modify: `scripts/test_segment_combined.py`
- Modify: `scripts/segment_combined.py`

- [ ] **Step 1: Write failing tests for build_heading_tree**

Add to `test_segment_combined.py`:

```python
from segment_combined import build_heading_tree


def test_tree_single_h1():
    headings = [(1, "Root", 0)]
    tree = build_heading_tree(headings, 100)
    assert len(tree) == 1
    assert tree[0].title == "Root"
    assert tree[0].start_offset == 0
    assert tree[0].end_offset == 100
    assert tree[0].children == []
    assert tree[0].breadcrumb == []


def test_tree_h1_with_h2_children():
    headings = [(1, "Root", 0), (2, "Child A", 50), (2, "Child B", 80)]
    tree = build_heading_tree(headings, 120)
    assert len(tree) == 1
    root = tree[0]
    assert root.end_offset == 120  # parent encompasses all children
    assert len(root.children) == 2
    assert root.children[0].title == "Child A"
    assert root.children[0].start_offset == 50
    assert root.children[0].end_offset == 80
    assert root.children[1].title == "Child B"
    assert root.children[1].end_offset == 120


def test_tree_nested_h1_h2_h3():
    headings = [
        (1, "H1", 0),
        (2, "H2", 30),
        (3, "H3a", 60),
        (3, "H3b", 90),
        (2, "H2b", 120),
    ]
    tree = build_heading_tree(headings, 200)
    h1 = tree[0]
    assert h1.end_offset == 200  # encompasses all descendants
    assert len(h1.children) == 2
    h2 = h1.children[0]
    assert h2.end_offset == 120  # encompasses H3a and H3b
    assert len(h2.children) == 2
    assert h2.children[0].title == "H3a"
    assert h2.children[1].title == "H3b"
    assert h1.children[1].title == "H2b"
    assert h1.children[1].children == []


def test_tree_breadcrumbs_track_ancestors():
    headings = [
        (1, "Root", 0),
        (2, "Level 2", 30),
        (3, "Level 3", 60),
        (4, "Level 4", 90),
    ]
    tree = build_heading_tree(headings, 150)
    root = tree[0]
    assert root.breadcrumb == []
    l2 = root.children[0]
    assert l2.breadcrumb == ["Root"]
    l3 = l2.children[0]
    assert l3.breadcrumb == ["Root", "Level 2"]
    l4 = l3.children[0]
    assert l4.breadcrumb == ["Root", "Level 2", "Level 3"]


def test_tree_multiple_h1_roots():
    headings = [(1, "First", 0), (1, "Second", 50)]
    tree = build_heading_tree(headings, 100)
    assert len(tree) == 2
    assert tree[0].title == "First"
    assert tree[0].end_offset == 50
    assert tree[1].title == "Second"
    assert tree[1].end_offset == 100


def test_tree_empty_headings():
    assert build_heading_tree([], 100) == []
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "tree"`
Expected: FAIL — `ImportError: cannot import name 'build_heading_tree'`

- [ ] **Step 3: Write implementation**

Add to `segment_combined.py`:

```python
def build_heading_tree(
    headings: list[tuple[int, str, int]], text_length: int
) -> list[HeadingSection]:
    if not headings:
        return []

    sections = []
    for i, (level, title, start_offset) in enumerate(headings):
        end_offset = headings[i + 1][2] if i + 1 < len(headings) else text_length
        sections.append(
            HeadingSection(
                level=level,
                title=title,
                start_offset=start_offset,
                end_offset=end_offset,
            )
        )

    root_sections: list[HeadingSection] = []
    stack: list[HeadingSection] = []

    for section in sections:
        while stack and stack[-1].level >= section.level:
            stack.pop()

        if stack:
            parent = stack[-1]
            parent.children.append(section)
            section.breadcrumb = parent.breadcrumb + [parent.title]
        else:
            root_sections.append(section)

        stack.append(section)

    _fix_end_offsets(root_sections)
    return root_sections


def _fix_end_offsets(sections: list[HeadingSection]) -> None:
    for section in sections:
        if section.children:
            _fix_end_offsets(section.children)
            section.end_offset = max(
                section.end_offset, section.children[-1].end_offset
            )
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "tree"`
Expected: 6 passed

- [ ] **Step 5: Commit**

```bash
git add scripts/segment_combined.py scripts/test_segment_combined.py
git commit -m "feat(segment): add heading tree construction with breadcrumbs"
```

---

## Task 4: Breadcrumb Formatting

**Files:**
- Modify: `scripts/test_segment_combined.py`
- Modify: `scripts/segment_combined.py`

- [ ] **Step 1: Write failing tests for format_breadcrumb**

Add to `test_segment_combined.py`:

```python
from segment_combined import format_breadcrumb


def test_breadcrumb_with_ancestors():
    result = format_breadcrumb("Cortex XDR", ["Configure Cortex XDR", "Broker VM"], "AWS Setup")
    assert result == "> Cortex XDR > Configure Cortex XDR > Broker VM > AWS Setup"


def test_breadcrumb_root_section_only():
    result = format_breadcrumb("Cortex XDR", [], "Learn about Cortex XDR")
    assert result == "> Cortex XDR > Learn about Cortex XDR"


def test_breadcrumb_deep_nesting():
    result = format_breadcrumb("Cortex XSIAM", ["A", "B", "C", "D", "E"], "F")
    assert result == "> Cortex XSIAM > A > B > C > D > E > F"
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "breadcrumb"`
Expected: FAIL — `ImportError: cannot import name 'format_breadcrumb'`

- [ ] **Step 3: Write implementation**

Add to `segment_combined.py`:

```python
def format_breadcrumb(display_name: str, breadcrumb: list[str], title: str) -> str:
    parts = [display_name] + breadcrumb + [title]
    return "> " + " > ".join(parts)
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "breadcrumb"`
Expected: 3 passed

- [ ] **Step 5: Commit**

```bash
git add scripts/segment_combined.py scripts/test_segment_combined.py
git commit -m "feat(segment): add breadcrumb formatting"
```

---

## Task 5: Simple Segment Emission (Section Fits)

**Files:**
- Modify: `scripts/test_segment_combined.py`
- Modify: `scripts/segment_combined.py`

- [ ] **Step 1: Write failing test for section that fits in max_size**

Add to `test_segment_combined.py`:

```python
from segment_combined import emit_segments


def make_heading_section(level=1, title="Test", start=0, end=100, children=None, breadcrumb=None):
    return HeadingSection(
        level=level,
        title=title,
        start_offset=start,
        end_offset=end,
        children=children or [],
        breadcrumb=breadcrumb or [],
    )


def test_emit_small_section_produces_one_segment():
    raw_text = "## Overview\n\nThis is a small section.\n"
    section = make_heading_section(level=2, title="Overview", start=0, end=len(raw_text), breadcrumb=["Root"])
    segments = emit_segments(section, raw_text, max_size=8000, display_name="Cortex XDR")
    assert len(segments) == 1
    assert segments[0].title == "Overview"
    assert segments[0].text.startswith("> Cortex XDR > Root > Overview")
    assert "## Overview" in segments[0].text
    assert "This is a small section." in segments[0].text


def test_emit_preserves_exact_raw_text():
    raw_text = "# Title\n\nParagraph with **bold** and `code`.\n"
    section = make_heading_section(level=1, title="Title", start=0, end=len(raw_text))
    segments = emit_segments(section, raw_text, max_size=8000, display_name="Product")
    assert "Paragraph with **bold** and `code`." in segments[0].text
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "emit"`
Expected: FAIL — `ImportError: cannot import name 'emit_segments'`

- [ ] **Step 3: Write implementation**

Add to `segment_combined.py`:

```python
def emit_segments(
    section: HeadingSection,
    raw_text: str,
    max_size: int,
    display_name: str,
) -> list[Segment]:
    total_size = section.end_offset - section.start_offset

    if total_size <= max_size:
        section_text = raw_text[section.start_offset : section.end_offset].strip()
        breadcrumb = format_breadcrumb(display_name, section.breadcrumb, section.title)
        return [Segment(text=breadcrumb + "\n\n" + section_text, title=section.title)]

    return []
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "emit"`
Expected: 2 passed

- [ ] **Step 5: Commit**

```bash
git add scripts/segment_combined.py scripts/test_segment_combined.py
git commit -m "feat(segment): emit single segment for small sections"
```

---

## Task 6: Recursive Splitting (Section With Children)

**Files:**
- Modify: `scripts/test_segment_combined.py`
- Modify: `scripts/segment_combined.py`

- [ ] **Step 1: Write failing test for recursive splitting**

Add to `test_segment_combined.py`:

```python
def test_emit_splits_large_section_at_h2_boundaries():
    # Build a section with two children, total > max_size
    # Each child is small enough to be one segment
    raw_text = (
        "# Root\n\n"
        "Root intro paragraph.\n\n"
        "## Child A\n\n"
        + "A content. " * 50 + "\n\n"
        + "## Child B\n\n"
        + "B content. " * 50 + "\n"
    )
    headings = scan_heading_offsets(raw_text)
    tree = build_heading_tree(headings, len(raw_text))
    root = tree[0]

    # max_size small enough that root is too big, but each child fits
    segments = emit_segments(root, raw_text, max_size=800, display_name="Product")
    assert len(segments) >= 2
    titles = [s.title for s in segments]
    assert "Child A" in titles
    assert "Child B" in titles


def test_emit_own_content_emitted_when_over_500_chars():
    raw_text = (
        "# Root\n\n"
        + "Root content. " * 50 + "\n\n"  # >500 chars of own content
        + "## Child\n\n"
        + "Child content.\n"
    )
    headings = scan_heading_offsets(raw_text)
    tree = build_heading_tree(headings, len(raw_text))
    root = tree[0]
    segments = emit_segments(root, raw_text, max_size=800, display_name="Product")

    # Root's own content should be a separate segment
    root_segments = [s for s in segments if s.title == "Root"]
    assert len(root_segments) >= 1
    assert "Root content." in root_segments[0].text
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "test_emit_splits or test_emit_own"`
Expected: FAIL — returns empty list for oversized sections

- [ ] **Step 3: Extend emit_segments with recursive splitting**

Update `emit_segments` in `segment_combined.py`:

```python
def emit_segments(
    section: HeadingSection,
    raw_text: str,
    max_size: int,
    display_name: str,
) -> list[Segment]:
    total_size = section.end_offset - section.start_offset

    if total_size <= max_size:
        section_text = raw_text[section.start_offset : section.end_offset].strip()
        breadcrumb = format_breadcrumb(display_name, section.breadcrumb, section.title)
        return [Segment(text=breadcrumb + "\n\n" + section_text, title=section.title)]

    if not section.children:
        # Leaf section too large — will be handled by pack_leaf (Task 9)
        # For now, emit as single oversized segment
        section_text = raw_text[section.start_offset : section.end_offset].strip()
        breadcrumb = format_breadcrumb(display_name, section.breadcrumb, section.title)
        return [Segment(text=breadcrumb + "\n\n" + section_text, title=section.title)]

    segments: list[Segment] = []

    # Own content: text between section start and first child start
    own_start = section.start_offset
    own_end = section.children[0].start_offset
    own_size = own_end - own_start

    if own_size >= 500:
        own_text = raw_text[own_start:own_end].strip()
        breadcrumb = format_breadcrumb(display_name, section.breadcrumb, section.title)
        segments.append(Segment(text=breadcrumb + "\n\n" + own_text, title=section.title))

    # Recurse into children
    for child in section.children:
        segments.extend(emit_segments(child, raw_text, max_size, display_name))

    return segments
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "emit"`
Expected: 4 passed (2 from Task 5 + 2 new)

- [ ] **Step 5: Commit**

```bash
git add scripts/segment_combined.py scripts/test_segment_combined.py
git commit -m "feat(segment): recursive splitting at heading boundaries"
```

---

## Task 7: Small Content Merging

**Files:**
- Modify: `scripts/test_segment_combined.py`
- Modify: `scripts/segment_combined.py`

- [ ] **Step 1: Write failing test for small content prepending**

Add to `test_segment_combined.py`:

```python
def test_emit_small_own_content_merged_into_first_child():
    # Own content < 500 chars should be prepended to first child, not standalone
    raw_text = (
        "# Root\n\n"
        "Short intro.\n\n"  # < 500 chars of own content
        "## Child\n\n"
        + "Child content. " * 30 + "\n"
    )
    headings = scan_heading_offsets(raw_text)
    tree = build_heading_tree(headings, len(raw_text))
    root = tree[0]
    segments = emit_segments(root, raw_text, max_size=800, display_name="Product")

    # No segment should have title "Root" — the intro was merged into Child
    root_segments = [s for s in segments if s.title == "Root"]
    assert len(root_segments) == 0

    # First child segment should contain the intro text
    child_segment = segments[0]
    assert "Short intro." in child_segment.text
    assert "Child content." in child_segment.text
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest scripts/test_segment_combined.py::test_emit_small_own_content_merged_into_first_child -v`
Expected: FAIL — small own content is silently dropped (the `>= 500` check discards it without merging)

- [ ] **Step 3: Add small content merging to emit_segments**

Update the own-content handling block in `emit_segments`:

```python
    # Own content: text between section start and first child start
    own_start = section.start_offset
    own_end = section.children[0].start_offset
    own_size = own_end - own_start
    prepend_text = ""

    if own_size > 0:
        if own_size < 500:
            prepend_text = raw_text[own_start:own_end].strip()
        else:
            own_text = raw_text[own_start:own_end].strip()
            breadcrumb = format_breadcrumb(display_name, section.breadcrumb, section.title)
            segments.append(Segment(text=breadcrumb + "\n\n" + own_text, title=section.title))

    # Recurse into children
    for i, child in enumerate(section.children):
        child_segments = emit_segments(child, raw_text, max_size, display_name)
        if i == 0 and prepend_text and child_segments:
            first = child_segments[0]
            breadcrumb_line = format_breadcrumb(
                display_name, child.breadcrumb, child.title
            )
            body = first.text[len(breadcrumb_line) + 2 :]  # strip breadcrumb + \n\n
            child_segments[0] = Segment(
                text=breadcrumb_line + "\n\n" + prepend_text + "\n\n" + body,
                title=first.title,
            )
        segments.extend(child_segments)
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "emit"`
Expected: 5 passed

- [ ] **Step 5: Commit**

```bash
git add scripts/segment_combined.py scripts/test_segment_combined.py
git commit -m "feat(segment): merge small own content into first child"
```

---

## Task 8: Atomic Unit Identification

**Files:**
- Modify: `scripts/test_segment_combined.py`
- Modify: `scripts/segment_combined.py`

**Context:** This function takes the body text of a leaf section (after the heading) and returns a list of atomic unit strings. It uses `mistune` v3 AST for block type classification and raw text scanning for block boundaries.

- [ ] **Step 1: Install mistune**

Run: `pip install mistune`

Verify: `python -c "import mistune; print(mistune.__version__)"` should print `3.x.x`

- [ ] **Step 2: Write failing tests for atomic unit identification**

Add to `test_segment_combined.py`:

```python
from segment_combined import identify_atomic_units


def test_atomic_paragraphs_are_separate_units():
    body = "First paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n"
    units = identify_atomic_units(body)
    assert len(units) == 3
    assert "First paragraph." in units[0]
    assert "Second paragraph." in units[1]
    assert "Third paragraph." in units[2]


def test_atomic_table_is_one_unit():
    body = (
        "Intro text.\n\n"
        "| A | B |\n"
        "| --- | --- |\n"
        "| 1 | 2 |\n"
        "| 3 | 4 |\n\n"
        "After table.\n"
    )
    units = identify_atomic_units(body)
    # Table should be one unit (not split across rows)
    table_units = [u for u in units if "|" in u]
    assert len(table_units) == 1
    assert "| A | B |" in table_units[0]
    assert "| 3 | 4 |" in table_units[0]


def test_atomic_code_block_is_one_unit():
    body = "Before code.\n\n```python\ndef hello():\n    pass\n```\n\nAfter code.\n"
    units = identify_atomic_units(body)
    code_units = [u for u in units if "```" in u]
    assert len(code_units) == 1
    assert "def hello():" in code_units[0]


def test_atomic_code_block_groups_with_preceding_paragraph():
    body = "Run the following command:\n\n```bash\npip install mistune\n```\n\nNext step.\n"
    units = identify_atomic_units(body)
    # "Run the following command:" + code block = one unit
    assert len(units) == 2
    assert "Run the following command:" in units[0]
    assert "pip install mistune" in units[0]
    assert "Next step." in units[1]


def test_atomic_ordered_list_is_one_unit():
    body = "Steps:\n\n1. First step\n2. Second step\n3. Third step\n\nDone.\n"
    units = identify_atomic_units(body)
    list_units = [u for u in units if "1." in u]
    assert len(list_units) == 1
    assert "1. First step" in list_units[0]
    assert "3. Third step" in list_units[0]


def test_atomic_admonition_groups_with_preceding_paragraph():
    body = "Configure the setting below.\n\n**Note:** This requires admin access.\n\nNext section.\n"
    units = identify_atomic_units(body)
    assert len(units) == 2
    assert "Configure the setting below." in units[0]
    assert "**Note:**" in units[0]
    assert "Next section." in units[1]


def test_atomic_unordered_list_is_separate_unit():
    body = "Features:\n\n- Item A\n- Item B\n- Item C\n\nMore text.\n"
    units = identify_atomic_units(body)
    # Unordered lists are NOT atomic (only ordered lists are)
    # They are treated as standalone units (separate from "Features:")
    assert len(units) >= 2
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "atomic"`
Expected: FAIL — `ImportError: cannot import name 'identify_atomic_units'`

- [ ] **Step 4: Write implementation**

Add to `segment_combined.py`:

```python
import mistune


def _scan_raw_blocks(text: str) -> list[str]:
    blocks: list[str] = []
    current_lines: list[str] = []
    in_code_fence = False

    for line in text.split("\n"):
        stripped = line.strip()

        if stripped.startswith("```"):
            if in_code_fence:
                current_lines.append(line)
                in_code_fence = False
                continue
            else:
                in_code_fence = True
                if not current_lines:
                    current_lines = []
                current_lines.append(line)
                continue

        if in_code_fence:
            current_lines.append(line)
            continue

        if stripped == "":
            if current_lines:
                blocks.append("\n".join(current_lines))
                current_lines = []
            continue

        current_lines.append(line)

    if current_lines:
        blocks.append("\n".join(current_lines))

    return blocks


def _classify_block_ast(ast_node: dict) -> str:
    return ast_node.get("type", "paragraph")


def _is_admonition(text: str) -> bool:
    stripped = text.strip()
    for prefix in ("**Note:**", "**Warning:**", "**Important:**", "**Tip:**", "**Caution:**"):
        if stripped.startswith(prefix):
            return True
    return False


def identify_atomic_units(body_text: str) -> list[str]:
    raw_blocks = _scan_raw_blocks(body_text)
    if not raw_blocks:
        return []

    md = mistune.create_markdown(renderer="ast", plugins=["table"])
    ast_nodes = md(body_text)
    block_ast_nodes = [n for n in ast_nodes if n.get("type") != "blank_line"]

    # Classify each raw block using AST where possible
    block_types: list[str] = []
    for i, block in enumerate(raw_blocks):
        if i < len(block_ast_nodes):
            block_types.append(_classify_block_ast(block_ast_nodes[i]))
        else:
            # Fallback: classify by content
            stripped = block.strip()
            if stripped.startswith("```"):
                block_types.append("block_code")
            elif stripped.startswith("|"):
                block_types.append("table")
            elif re.match(r"^\d+\.", stripped):
                block_types.append("list")
            else:
                block_types.append("paragraph")

    # Apply grouping rules
    units: list[str] = []
    i = 0
    while i < len(raw_blocks):
        block = raw_blocks[i]
        block_type = block_types[i]

        # Check if next block should be grouped with this one
        if i + 1 < len(raw_blocks):
            next_type = block_types[i + 1]
            next_block = raw_blocks[i + 1]

            # Code block preceded by paragraph → group together
            if block_type == "paragraph" and next_type == "block_code":
                units.append(block + "\n\n" + next_block)
                i += 2
                continue

            # Admonition paragraph preceded by paragraph → group together
            if block_type == "paragraph" and next_type == "paragraph" and _is_admonition(next_block):
                units.append(block + "\n\n" + next_block)
                i += 2
                continue

        units.append(block)
        i += 1

    return units
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "atomic"`
Expected: 7 passed

- [ ] **Step 6: Commit**

```bash
git add scripts/segment_combined.py scripts/test_segment_combined.py
git commit -m "feat(segment): atomic unit identification with AST classification"
```

---

## Task 9: Greedy Packing for Oversized Leaf Sections

**Files:**
- Modify: `scripts/test_segment_combined.py`
- Modify: `scripts/segment_combined.py`

- [ ] **Step 1: Write failing tests for pack_leaf**

Add to `test_segment_combined.py`:

```python
from segment_combined import pack_leaf


def test_pack_leaf_splits_into_chunks():
    # Build a leaf section with lots of paragraphs, each ~100 chars
    paragraphs = [f"Paragraph {i}. " + "x" * 80 for i in range(20)]
    body = "\n\n".join(paragraphs) + "\n"
    raw_text = "## Big Leaf\n\n" + body
    section = make_heading_section(
        level=2, title="Big Leaf", start=0, end=len(raw_text), breadcrumb=["Root"]
    )
    segments = pack_leaf(section, raw_text, max_size=500, display_name="Product")
    assert len(segments) > 1
    # First segment should include the heading
    assert "## Big Leaf" in segments[0].text
    # All segments should have breadcrumbs
    for seg in segments:
        assert seg.text.startswith("> Product > Root > Big Leaf")
        assert seg.title == "Big Leaf"


def test_pack_leaf_heading_only_in_first_segment():
    paragraphs = ["Content block. " + "y" * 80 for _ in range(20)]
    body = "\n\n".join(paragraphs) + "\n"
    raw_text = "### Deep Leaf\n\n" + body
    section = make_heading_section(
        level=3, title="Deep Leaf", start=0, end=len(raw_text), breadcrumb=["A", "B"]
    )
    segments = pack_leaf(section, raw_text, max_size=500, display_name="Product")
    assert len(segments) > 1
    assert "### Deep Leaf" in segments[0].text
    for seg in segments[1:]:
        assert "### Deep Leaf" not in seg.text


def test_pack_leaf_oversized_atomic_unit_emitted_standalone():
    # A single huge table that exceeds max_size
    rows = "\n".join(f"| cell{i} | {'data ' * 20}|" for i in range(30))
    table = "| Col A | Col B |\n| --- | --- |\n" + rows
    raw_text = "## Table Section\n\n" + table + "\n"
    section = make_heading_section(
        level=2, title="Table Section", start=0, end=len(raw_text), breadcrumb=[]
    )
    segments = pack_leaf(section, raw_text, max_size=500, display_name="Product")
    # Table is one atomic unit > max_size, emitted as standalone
    assert len(segments) >= 1
    assert "| Col A | Col B |" in segments[0].text
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "pack_leaf"`
Expected: FAIL — `ImportError: cannot import name 'pack_leaf'`

- [ ] **Step 3: Write implementation**

Add to `segment_combined.py`:

```python
def pack_leaf(
    section: HeadingSection,
    raw_text: str,
    max_size: int,
    display_name: str,
) -> list[Segment]:
    section_text = raw_text[section.start_offset : section.end_offset]
    breadcrumb = format_breadcrumb(display_name, section.breadcrumb, section.title)

    # Separate heading from body
    heading_match = re.match(r"(#{1,6} .+\n)", section_text)
    if heading_match:
        heading_text = heading_match.group(1).rstrip("\n")
        body_start = heading_match.end()
        body_text = section_text[body_start:].lstrip("\n")
    else:
        heading_text = ""
        body_text = section_text

    units = identify_atomic_units(body_text)

    if not units:
        return [Segment(text=breadcrumb + "\n\n" + section_text.strip(), title=section.title)]

    segments: list[Segment] = []
    current_units: list[str] = []
    current_size = 0

    for unit in units:
        unit_size = len(unit)

        if current_size + unit_size > max_size and current_units:
            chunk_text = "\n\n".join(current_units)
            if not segments:
                chunk_text = heading_text + "\n\n" + chunk_text
            segments.append(
                Segment(text=breadcrumb + "\n\n" + chunk_text.strip(), title=section.title)
            )
            current_units = []
            current_size = 0

        current_units.append(unit)
        current_size += unit_size

    if current_units:
        chunk_text = "\n\n".join(current_units)
        if not segments:
            chunk_text = heading_text + "\n\n" + chunk_text
        segments.append(
            Segment(text=breadcrumb + "\n\n" + chunk_text.strip(), title=section.title)
        )

    return segments
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "pack_leaf"`
Expected: 3 passed

- [ ] **Step 5: Wire pack_leaf into emit_segments**

Update the leaf branch in `emit_segments`:

```python
    if not section.children:
        return pack_leaf(section, raw_text, max_size, display_name)
```

- [ ] **Step 6: Write test that exercises emit_segments calling pack_leaf**

Add to `test_segment_combined.py`:

```python
def test_emit_leaf_over_max_size_uses_pack_leaf():
    paragraphs = [f"Para {i}. " + "z" * 80 for i in range(20)]
    body = "\n\n".join(paragraphs) + "\n"
    raw_text = "## Leaf\n\n" + body
    section = make_heading_section(level=2, title="Leaf", start=0, end=len(raw_text))
    segments = emit_segments(section, raw_text, max_size=500, display_name="Product")
    assert len(segments) > 1
    assert "## Leaf" in segments[0].text
```

- [ ] **Step 7: Run all emit tests to verify**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "emit or pack_leaf"`
Expected: All passed

- [ ] **Step 8: Commit**

```bash
git add scripts/segment_combined.py scripts/test_segment_combined.py
git commit -m "feat(segment): greedy packing for oversized leaf sections"
```

---

## Task 10: Small Sibling Merging

**Files:**
- Modify: `scripts/test_segment_combined.py`
- Modify: `scripts/segment_combined.py`

- [ ] **Step 1: Write failing tests for merge_small_siblings**

Add to `test_segment_combined.py`:

```python
from segment_combined import merge_small_siblings


def test_merge_small_siblings_combines_under_threshold():
    segments = [
        Segment(text="> BC\n\n## A\n\nShort A.", title="A"),
        Segment(text="> BC\n\n## B\n\nShort B.", title="B"),
        Segment(text="> BC\n\n## C\n\nShort C.", title="C"),
    ]
    # Each segment < 2000 chars, all should merge
    merged = merge_small_siblings(segments, max_size=8000)
    assert len(merged) < len(segments)
    assert "Short A." in merged[0].text
    assert "Short B." in merged[0].text


def test_merge_preserves_large_segments():
    small = Segment(text="> BC\n\n## S\n\nSmall.", title="S")
    large = Segment(text="> BC\n\n## L\n\n" + "x" * 3000, title="L")
    merged = merge_small_siblings([small, large, small], max_size=8000)
    # Large segment should not merge with neighbors
    assert len(merged) >= 2


def test_merge_respects_max_size():
    segments = [
        Segment(text="> BC\n\n" + "a" * 1500, title="A"),
        Segment(text="> BC\n\n" + "b" * 1500, title="B"),
        Segment(text="> BC\n\n" + "c" * 1500, title="C"),
        Segment(text="> BC\n\n" + "d" * 1500, title="D"),
    ]
    # Each < 2000, but merging all 4 would exceed max_size=4000
    merged = merge_small_siblings(segments, max_size=4000)
    assert len(merged) >= 2
    for seg in merged:
        assert len(seg.text) <= 4000 or seg == merged[-1]  # last may be under


def test_merge_uses_first_siblings_breadcrumb():
    segments = [
        Segment(text="> Product > A\n\nContent A", title="A"),
        Segment(text="> Product > B\n\nContent B", title="B"),
    ]
    merged = merge_small_siblings(segments, max_size=8000)
    assert merged[0].text.startswith("> Product > A")
    assert merged[0].title == "A"
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "merge"`
Expected: FAIL — `ImportError: cannot import name 'merge_small_siblings'`

- [ ] **Step 3: Write implementation**

Add to `segment_combined.py`:

```python
SMALL_SIBLING_THRESHOLD = 2000


def merge_small_siblings(segments: list[Segment], max_size: int) -> list[Segment]:
    if len(segments) <= 1:
        return segments

    merged: list[Segment] = []
    current = segments[0]

    for next_seg in segments[1:]:
        current_is_small = len(current.text) < SMALL_SIBLING_THRESHOLD
        next_is_small = len(next_seg.text) < SMALL_SIBLING_THRESHOLD
        combined_size = len(current.text) + len(next_seg.text)

        if current_is_small and next_is_small and combined_size <= max_size:
            # Extract body from next segment (strip its breadcrumb line)
            next_lines = next_seg.text.split("\n", 1)
            next_body = next_lines[1] if len(next_lines) > 1 else ""
            current = Segment(
                text=current.text + "\n" + next_body,
                title=current.title,
            )
        else:
            merged.append(current)
            current = next_seg

    merged.append(current)
    return merged
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "merge"`
Expected: 4 passed

- [ ] **Step 5: Wire merge_small_siblings into emit_segments**

Add at the end of the `if section.children:` branch in `emit_segments`, before `return segments`:

```python
    segments = merge_small_siblings(segments, max_size)
    return segments
```

- [ ] **Step 6: Write integration test for sibling merging via emit_segments**

Add to `test_segment_combined.py`:

```python
def test_emit_merges_small_sibling_sections():
    # Each child has ~200 chars of content so root total exceeds max_size,
    # forcing recursion. Individual children are < 2000 chars so they merge.
    raw_text = (
        "# Root\n\n"
        "## A\n\n" + "a " * 100 + "\n\n"
        "## B\n\n" + "b " * 100 + "\n\n"
        "## C\n\n" + "c " * 100 + "\n\n"
        "## D\n\n" + "d " * 100 + "\n"
    )
    headings = scan_heading_offsets(raw_text)
    tree = build_heading_tree(headings, len(raw_text))
    # Root is ~900+ chars > max_size=800, so it recurses into children.
    # Each child is ~210 chars < 2000, so siblings merge.
    segments = emit_segments(tree[0], raw_text, max_size=800, display_name="Product")
    assert len(segments) < 4
    assert len(segments) >= 1
```

- [ ] **Step 7: Run full test suite to verify**

Run: `python -m pytest scripts/test_segment_combined.py -v`
Expected: All passed

- [ ] **Step 8: Commit**

```bash
git add scripts/segment_combined.py scripts/test_segment_combined.py
git commit -m "feat(segment): merge small consecutive sibling segments"
```

---

## Task 11: File I/O, CLI, and Statistics

**Files:**
- Modify: `scripts/test_segment_combined.py`
- Modify: `scripts/segment_combined.py`

- [ ] **Step 1: Write failing tests for segment_combined_file**

Add to `test_segment_combined.py`:

```python
import tempfile
from pathlib import Path

from segment_combined import segment_combined_file


def test_segment_combined_file_writes_segments(tmp_path):
    combined = tmp_path / "cortex-test-combined.md"
    combined.write_text(
        "# Section One\n\nContent one.\n\n# Section Two\n\nContent two.\n",
        encoding="utf-8",
    )
    output_dir = tmp_path / "test_segments"
    stats = segment_combined_file(combined, output_dir, "xdr_5", max_size=8000)
    files = sorted(output_dir.glob("*.md"))
    assert len(files) == 2
    assert files[0].name.startswith("segment-001-")
    assert files[1].name.startswith("segment-002-")
    assert stats["count"] == 2


def test_segment_combined_file_clears_output_dir(tmp_path):
    combined = tmp_path / "cortex-test-combined.md"
    combined.write_text("# Only\n\nContent.\n", encoding="utf-8")
    output_dir = tmp_path / "test_segments"
    output_dir.mkdir()
    (output_dir / "stale-file.md").write_text("old data", encoding="utf-8")
    segment_combined_file(combined, output_dir, "xdr_5", max_size=8000)
    files = list(output_dir.glob("*.md"))
    assert len(files) == 1
    assert "stale-file.md" not in [f.name for f in files]


def test_segment_combined_file_uses_utf8(tmp_path):
    combined = tmp_path / "cortex-test-combined.md"
    combined.write_text("# Über Section\n\nCafé résumé.\n", encoding="utf-8")
    output_dir = tmp_path / "test_segments"
    segment_combined_file(combined, output_dir, "agentix", max_size=8000)
    content = list(output_dir.glob("*.md"))[0].read_text(encoding="utf-8")
    assert "Café résumé." in content


def test_segment_combined_file_breadcrumbs_use_display_name(tmp_path):
    combined = tmp_path / "cortex-test-combined.md"
    combined.write_text("# My Section\n\nBody text.\n", encoding="utf-8")
    output_dir = tmp_path / "test_segments"
    segment_combined_file(combined, output_dir, "xdr_5", max_size=8000)
    content = list(output_dir.glob("*.md"))[0].read_text(encoding="utf-8")
    assert "> Cortex XDR >" in content
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "segment_combined_file"`
Expected: FAIL — `ImportError: cannot import name 'segment_combined_file'`

- [ ] **Step 3: Write implementation**

Add to `segment_combined.py`:

```python
import argparse
import shutil
from pathlib import Path


def segment_combined_file(
    combined_path: Path, output_dir: Path, map_name: str, max_size: int
) -> dict:
    raw_text = combined_path.read_text(encoding="utf-8")
    display_name = DISPLAY_NAMES[map_name]

    headings = scan_heading_offsets(raw_text)
    tree = build_heading_tree(headings, len(raw_text))

    segments: list[Segment] = []
    for root_section in tree:
        segments.extend(emit_segments(root_section, raw_text, max_size, display_name))

    # Clear and recreate output directory
    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Write segments
    sizes: list[int] = []
    for i, segment in enumerate(segments, 1):
        slug = slugify(segment.title)
        filename = f"segment-{i:03d}-{slug}.md"
        (output_dir / filename).write_text(segment.text, encoding="utf-8")
        sizes.append(len(segment.text))

    oversized = sum(1 for s in sizes if s > max_size)

    return {
        "count": len(segments),
        "avg_size": sum(sizes) // len(sizes) if sizes else 0,
        "max_size": max(sizes) if sizes else 0,
        "oversized": oversized,
    }
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "segment_combined_file"`
Expected: 4 passed

- [ ] **Step 5: Commit**

```bash
git add scripts/segment_combined.py scripts/test_segment_combined.py
git commit -m "feat(segment): file I/O with output dir management"
```

- [ ] **Step 6: Write failing test for CLI (argparse)**

Add to `test_segment_combined.py`:

```python
from segment_combined import PRODUCTS, COMBINED_FILES


def test_cli_product_choices_match_products_dict():
    assert set(PRODUCTS.keys()) == {"cloud", "xdr", "xsiam", "gateway", "agentix"}


def test_combined_files_has_all_maps():
    all_maps = []
    for maps in PRODUCTS.values():
        all_maps.extend(maps)
    for map_name in all_maps:
        assert map_name in COMBINED_FILES, f"{map_name} missing from COMBINED_FILES"


def test_display_names_has_all_maps():
    from segment_combined import DISPLAY_NAMES
    for map_name in COMBINED_FILES:
        assert map_name in DISPLAY_NAMES, f"{map_name} missing from DISPLAY_NAMES"
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "cli or combined_files or display_names"`
Expected: 3 passed (these are validation tests — should pass with current constants)

- [ ] **Step 8: Add main() and CLI**

Add to `segment_combined.py`:

```python
def main():
    parser = argparse.ArgumentParser(
        description="Pre-segment combined markdown files for RAG Engine ingestion"
    )
    parser.add_argument(
        "--product",
        choices=list(PRODUCTS.keys()),
        help="Segment only this product's maps",
    )
    parser.add_argument(
        "--max-size",
        type=int,
        default=DEFAULT_MAX_SIZE,
        help=f"Target max segment size in chars (default: {DEFAULT_MAX_SIZE})",
    )
    args = parser.parse_args()

    sources_dir = Path(__file__).resolve().parent.parent / "sources_fetch"

    if args.product:
        maps = PRODUCTS[args.product]
    else:
        maps = list(COMBINED_FILES.keys())

    total_segments = 0
    total_oversized = 0
    map_count = 0

    for map_name in maps:
        combined_name = COMBINED_FILES[map_name]
        combined_path = sources_dir / map_name / combined_name
        if not combined_path.exists():
            print(f"Skipping {map_name} ({combined_name} not found)")
            continue

        output_dir = sources_dir / map_name / f"{map_name}_segments"
        stats = segment_combined_file(combined_path, output_dir, map_name, args.max_size)

        print(
            f"{map_name}: {stats['count']} segments "
            f"(avg {stats['avg_size']:,} chars, max {stats['max_size']:,} chars)"
        )
        total_segments += stats["count"]
        total_oversized += stats["oversized"]
        map_count += 1

    print(f"\nTotal: {total_segments} segments across {map_count} maps")
    if total_oversized:
        print(f"Oversized segments (>{args.max_size} chars): {total_oversized} (all single atomic units)")


if __name__ == "__main__":
    main()
```

- [ ] **Step 9: Run full test suite**

Run: `python -m pytest scripts/test_segment_combined.py -v`
Expected: All passed

- [ ] **Step 10: Commit**

```bash
git add scripts/segment_combined.py scripts/test_segment_combined.py
git commit -m "feat(segment): add CLI with --product and --max-size flags"
```

---

## Task 12: Integration Test + Code Fence Edge Case

**Files:**
- Modify: `scripts/test_segment_combined.py`

- [ ] **Step 1: Write integration test with realistic markdown structure**

Add to `test_segment_combined.py`:

```python
def test_integration_full_document_segmentation(tmp_path):
    """End-to-end test: parse a realistic document, write segments, verify structure."""
    doc = (
        "# Learn about Cortex XDR\n\n"
        "## Get started\n\n"
        "Intro to getting started.\n\n"
        "### What is Cortex XDR?\n\n"
        + "Cortex XDR is a detection and response platform. " * 20 + "\n\n"
        + "### Key features\n\n"
        + "| Feature | Description |\n"
        + "| --- | --- |\n"
        + "| XDR | Extended detection |\n"
        + "| SOAR | Security orchestration |\n\n"
        + "## Configure Cortex XDR\n\n"
        + "### Broker VM\n\n"
        + "Setup instructions for the broker VM. " * 30 + "\n\n"
        + "#### AWS Setup\n\n"
        + "1. Create an EC2 instance\n"
        + "2. Configure security groups\n"
        + "3. Install the broker package\n\n"
        + "```bash\nsudo dpkg -i broker.deb\nsudo systemctl start broker\n```\n\n"
        + "**Note:** Requires root access.\n\n"
        + "#### Azure Setup\n\n"
        + "Azure instructions here.\n"
    )
    combined = tmp_path / "cortex-xdr-5-combined.md"
    combined.write_text(doc, encoding="utf-8")

    output_dir = tmp_path / "xdr_5_segments"
    stats = segment_combined_file(combined, output_dir, "xdr_5", max_size=1000)

    files = sorted(output_dir.glob("*.md"))
    assert len(files) >= 3

    # Every segment should start with a breadcrumb
    for f in files:
        content = f.read_text(encoding="utf-8")
        assert content.startswith("> Cortex XDR >"), f"Missing breadcrumb in {f.name}"

    # Filenames should be zero-padded with slugs
    assert files[0].name.startswith("segment-001-")
    assert files[0].name.endswith(".md")

    # Stats should be populated
    assert stats["count"] == len(files)
    assert stats["avg_size"] > 0
    assert stats["max_size"] > 0


def test_code_fences_not_mistaken_for_headings(tmp_path):
    doc = (
        "# Real Title\n\n"
        "```markdown\n"
        "# This is inside a code block\n"
        "## Also inside\n"
        "```\n\n"
        "## Real Subtitle\n\n"
        "Content.\n"
    )
    combined = tmp_path / "cortex-test-combined.md"
    combined.write_text(doc, encoding="utf-8")

    output_dir = tmp_path / "test_segments"
    # Document is small — fits in one segment. The key assertion is that
    # only 2 headings are detected (not 4), verified via the heading scanner.
    stats = segment_combined_file(combined, output_dir, "xdr_5", max_size=8000)
    assert stats["count"] == 1  # entire doc fits in one segment

    # Verify the fake headings inside code fences are NOT treated as structure
    content = list(output_dir.glob("*.md"))[0].read_text(encoding="utf-8")
    assert "# This is inside a code block" in content  # preserved as content, not split


def test_breadcrumb_depth_h1_through_h6():
    raw_text = (
        "# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6\n\nDeep content.\n"
    )
    headings = scan_heading_offsets(raw_text)
    tree = build_heading_tree(headings, len(raw_text))

    # H6 should have breadcrumb with all ancestors
    def find_h6(sections):
        for s in sections:
            if s.level == 6:
                return s
            found = find_h6(s.children)
            if found:
                return found
        return None

    h6 = find_h6(tree)
    assert h6 is not None
    assert h6.breadcrumb == ["H1", "H2", "H3", "H4", "H5"]
    assert h6.title == "H6"

    breadcrumb = format_breadcrumb("Product", h6.breadcrumb, h6.title)
    assert breadcrumb == "> Product > H1 > H2 > H3 > H4 > H5 > H6"
```

- [ ] **Step 2: Run integration tests**

Run: `python -m pytest scripts/test_segment_combined.py -v -k "integration or code_fences_not or breadcrumb_depth"`
Expected: All 3 passed

- [ ] **Step 3: Run entire test suite**

Run: `python -m pytest scripts/test_segment_combined.py -v`
Expected: All tests passed

- [ ] **Step 4: Commit**

```bash
git add scripts/test_segment_combined.py
git commit -m "test(segment): add integration tests and edge cases"
```

---

## Task 13: Smoke Test Against Real Data

**Files:** None modified (validation only)

- [ ] **Step 1: Run against all combined files**

Run: `cd /c/Users/emanu/Repos/fetch-cortex-cloud-docs && python scripts/segment_combined.py`

Expected output (approximate):
```
agentix: ~15-25 segments (avg ~2,000-4,000 chars)
appsec: ~80-120 segments
cortex_gateway: ~5-15 segments
posture: ~40-70 segments
runtime: ~15-30 segments
xdr_5: ~200-350 segments
xdr_compatibility: ~20-50 segments
xsiam_3: ~50-100 segments

Total: ~400-600 segments across 8 maps
```

- [ ] **Step 2: Spot-check a few segment files**

Run: `head -5 sources_fetch/xdr_5/xdr_5_segments/segment-001-*.md`

Expected: First line is a breadcrumb (`> Cortex XDR > ...`), followed by a heading.

Run: `wc -c sources_fetch/xdr_5/xdr_5_segments/*.md | sort -n | tail -5`

Expected: Most files under 8,000 chars. A few oversized segments (single atomic units) are acceptable.

- [ ] **Step 3: Run with --product flag**

Run: `python scripts/segment_combined.py --product xdr`

Expected: Only `xdr_5` and `xdr_compatibility` maps are processed.

- [ ] **Step 4: Final commit**

```bash
git add scripts/segment_combined.py scripts/test_segment_combined.py
git commit -m "feat: add segment_combined.py for RAG pre-segmentation"
```
