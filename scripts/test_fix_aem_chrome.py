#!/usr/bin/env python3
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(__file__))
from fix_aem_chrome import strip_chrome, clean_patterns


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


if __name__ == "__main__":
    unittest.main()
