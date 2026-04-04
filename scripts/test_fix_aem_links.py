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
