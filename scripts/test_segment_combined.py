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
