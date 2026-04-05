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

    def test_header_cells_spanning_multiple_lines(self):
        md = (
            "|\n"
            "Category\n"
            "\n"
            " |\n"
            "\n"
            "License\n"
            "\n"
            " |\n"
            "| --- | --- |\n"
            "| Alerts | Premium |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| Category | License |", result)
        self.assertIn("| --- | --- |", result)
        self.assertIn("| Alerts | Premium |", result)

    def test_closing_pipe_on_own_line(self):
        md = (
            "| A | B |\n"
            "| --- | --- |\n"
            "| Cell1 |\n"
            "content\n"
            " |\n"
            "| Cell3 | Cell4 |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| Cell1 | content |", result)
        self.assertIn("| Cell3 | Cell4 |", result)

    def test_row_with_only_pipe_as_continuation(self):
        md = (
            "| A | B |\n"
            "| --- | --- |\n"
            "| X |\n"
            "Y\n"
            "|\n"
            "| Z | W |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| X | Y |", result)
        self.assertIn("| Z | W |", result)

    def test_list_items_inside_split_cell(self):
        md = (
            "| Section | Details |\n"
            "| --- | --- |\n"
            "| Match |\n"
            "Define criteria:\n"
            "-   Specify source\n"
            "-   Add destination\n"
            "\n"
            " |\n"
            "| Action | Allow |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| Match | Define criteria: - Specify source - Add destination |", result)
        self.assertIn("| Action | Allow |", result)

    def test_multiple_tables_fixed_independently(self):
        md = (
            "| A | B |\n"
            "| --- | --- |\n"
            "| X |\n"
            "Y\n"
            " |\n"
            "\n"
            "Paragraph between tables.\n"
            "\n"
            "| C | D |\n"
            "| --- | --- |\n"
            "| P |\n"
            "Q\n"
            " |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| X | Y |", result)
        self.assertIn("| P | Q |", result)
        self.assertIn("Paragraph between tables.", result)

    def test_non_table_content_preserved_around_tables(self):
        md = (
            "# Heading\n"
            "\n"
            "Some intro text.\n"
            "\n"
            "| A | B |\n"
            "| --- | --- |\n"
            "| 1 | 2 |\n"
            "\n"
            "More text after.\n"
        )
        self.assertEqual(fix_broken_rows(md), md)

    def test_table_with_no_broken_rows_unchanged(self):
        md = (
            "| Name | Role | Active |\n"
            "| --- | --- | --- |\n"
            "| Alice | Admin | Yes |\n"
            "| Bob | Viewer | No |\n"
        )
        self.assertEqual(fix_broken_rows(md), md)

    def test_heading_terminates_collection(self):
        md = (
            "| A | B |\n"
            "| --- | --- |\n"
            "| X |\n"
            "# New Section\n"
            "| C | D |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("# New Section", result)


if __name__ == "__main__":
    unittest.main()
