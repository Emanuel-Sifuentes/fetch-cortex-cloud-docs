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
