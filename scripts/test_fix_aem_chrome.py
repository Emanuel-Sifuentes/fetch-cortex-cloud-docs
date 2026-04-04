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
