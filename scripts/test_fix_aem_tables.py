#!/usr/bin/env python3
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(__file__))
from fix_aem_tables import fix_broken_rows


class TestFixBrokenRows(unittest.TestCase):
    def test_symbol_cell_split_with_blank_lines(self):
        md = (
            "| A | B | C | D |\n"
            "| --- | --- | --- | --- |\n"
            "| X | Y | Z |\n"
            "\n"
            "\u221a\n"
            "\n"
            " |\n"
            "| D | E | F | G |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| X | Y | Z | \u221a |", result)
        self.assertIn("| D | E | F | G |", result)

    def test_multi_paragraph_cell_content(self):
        md = (
            "| Type | Details |\n"
            "| --- | --- |\n"
            "| **Production** |\n"
            "Notification 21 days before release.\n"
            "\n"
            " |\n"
            "| **Staging** | 7 days |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| **Production** | Notification 21 days before release. |", result)
        self.assertIn("| **Staging** | 7 days |", result)

    def test_annotation_text_on_separate_line(self):
        md = (
            "| Setting | Value | Notes |\n"
            "| --- | --- | --- |\n"
            "| Crypto | AES-256 |\n"
            "\n"
            "Not recommended\n"
            "\n"
            " |\n"
            "| Hash | SHA-256 | OK |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| Crypto | AES-256 | Not recommended |", result)
        self.assertIn("| Hash | SHA-256 | OK |", result)

    def test_complete_rows_pass_through_unchanged(self):
        md = (
            "| A | B |\n"
            "| --- | --- |\n"
            "| 1 | 2 |\n"
            "| 3 | 4 |\n"
        )
        self.assertEqual(fix_broken_rows(md), md)

    def test_no_tables_returns_unchanged(self):
        md = "Just plain text.\n\nNo tables here.\n"
        self.assertEqual(fix_broken_rows(md), md)

    def test_empty_string(self):
        self.assertEqual(fix_broken_rows(""), "")


if __name__ == "__main__":
    unittest.main()
