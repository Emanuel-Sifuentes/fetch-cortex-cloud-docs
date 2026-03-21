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
