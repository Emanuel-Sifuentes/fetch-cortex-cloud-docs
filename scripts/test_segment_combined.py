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
