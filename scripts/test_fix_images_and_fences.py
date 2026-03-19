#!/usr/bin/env python3
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(__file__))
from fix_images_and_fences import clean_body, fix_file


class TestCleanBody(unittest.TestCase):
    def test_replaces_checkmark_image_with_checkmark_character(self):
        body = "| Feature | [image: check-mark.png] | — |\n"
        result = clean_body(body)
        self.assertEqual(result, "| Feature | ✓ | — |\n")

    def test_replaces_multiple_checkmarks_in_one_line(self):
        body = "| Feature | [image: check-mark.png] | [image: check-mark.png] | — |\n"
        result = clean_body(body)
        self.assertEqual(result, "| Feature | ✓ | ✓ | — |\n")

    def test_replaces_three_dots_with_vertical_ellipsis(self):
        body = "Click [image: three-dots.png] to open the menu.\n"
        result = clean_body(body)
        self.assertEqual(result, "Click \u22ee to open the menu.\n")

    def test_replaces_three_dots_dark_with_vertical_ellipsis(self):
        body = "| [image: three-dots-dark.png] | menu |\n"
        result = clean_body(body)
        self.assertEqual(result, "| \u22ee | menu |\n")

    def test_replaces_blue_arrow_with_arrow(self):
        body = "Navigate [image: blue-arrow.png] to the next page.\n"
        result = clean_body(body)
        self.assertEqual(result, "Navigate \u2192 to the next page.\n")

    def test_replaces_arrow_with_arrow(self):
        body = "Go [image: arrow.png] forward.\n"
        result = clean_body(body)
        self.assertEqual(result, "Go \u2192 forward.\n")

    def test_replaces_enter_with_return_symbol(self):
        body = "Press [image: enter.png] to confirm.\n"
        result = clean_body(body)
        self.assertEqual(result, "Press \u21b5 to confirm.\n")

    def test_replaces_check_box_with_ballot_box(self):
        body = "Select [image: check-box.png] the option.\n"
        result = clean_body(body)
        self.assertEqual(result, "Select \u2610 the option.\n")

    def test_mixed_character_mappings_and_removals(self):
        body = "| [image: check-mark.png] | [image: three-dots.png] | [image: screenshot.png] |\n"
        result = clean_body(body)
        self.assertEqual(result, "| \u2713 | \u22ee |  |\n")

    def test_removes_standalone_image_line(self):
        body = "Some text\n\n[image: image7.png]\n\nMore text\n"
        result = clean_body(body)
        self.assertEqual(result, "Some text\n\nMore text\n")

    def test_removes_inline_image_reference(self):
        body = "See the diagram [image: diagram.png] for details.\n"
        result = clean_body(body)
        self.assertEqual(result, "See the diagram  for details.\n")

    def test_removes_image_with_various_extensions(self):
        body = "Before\n\n[image: photo.jpg]\n[image: icon.svg]\n\nAfter\n"
        result = clean_body(body)
        self.assertEqual(result, "Before\n\nAfter\n")

    def test_preserves_code_fences(self):
        body = "Some text\n\n```\necho hello\n```\n\nMore text\n"
        result = clean_body(body)
        self.assertEqual(result, body)

    def test_collapses_triple_blank_lines(self):
        body = "A\n\n\n\nB\n"
        result = clean_body(body)
        self.assertEqual(result, "A\n\nB\n")

    def test_handles_empty_body(self):
        self.assertEqual(clean_body(""), "")

    def test_image_trailing_whitespace(self):
        body = "[image: image7.png] \n"
        result = clean_body(body)
        self.assertEqual(result, " \n")


class TestFixFile(unittest.TestCase):
    def test_preserves_frontmatter(self):
        content = "---\ncontentId: \"test\"\n---\n[image: foo.png]\nSome text\n"
        result = self._fix(content)
        self.assertTrue(result.startswith("---\ncontentId: \"test\"\n---\n"))
        self.assertNotIn("[image:", result)
        self.assertIn("Some text", result)

    def test_returns_zero_when_no_changes(self):
        content = "---\ncontentId: \"test\"\n---\nJust plain text.\n"
        count = self._fix_count(content)
        self.assertEqual(count, 0)

    def test_returns_count_of_changes(self):
        content = "---\ncontentId: \"test\"\n---\n[image: a.png]\nSome text\n"
        count = self._fix_count(content)
        self.assertGreater(count, 0)

    def test_dry_run_does_not_modify(self):
        content = "---\ncontentId: \"test\"\n---\n[image: a.png]\n"
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


if __name__ == "__main__":
    unittest.main()
