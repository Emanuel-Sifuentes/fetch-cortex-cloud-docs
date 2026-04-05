#!/usr/bin/env python3
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(__file__))
from fix_aem_tables import fix_broken_rows, fix_file


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
        self.assertIn("\nParagraph between tables.\n", result)

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

    def test_overflow_after_complete_row(self):
        md = (
            "| A | B | C |\n"
            "| --- | --- | --- |\n"
            "| X | Y | Z |\n"
            "\n"
            "\u221a\n"
            "\n"
            " |\n"
            "| D | E | F |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| X | Y | Z | \u221a |", result)
        self.assertIn("| D | E | F |", result)

    def test_rowspan_rows_not_merged_across_row_boundaries(self):
        md = (
            "| A | B | C |\n"
            "| --- | --- | --- |\n"
            "| Group 1 |\n"
            "\n"
            "\u221a\n"
            "\n"
            "(Default) |\n"
            "\n"
            "\u221a\n"
            "\n"
            "(Default) |\n"
            "| Group 2 |\n"
            "\n"
            "\u221a\n"
            "\n"
            " |\n"
            "\n"
            "\u221a\n"
            "\n"
            " |\n"
        )
        result = fix_broken_rows(md)
        lines = [l for l in result.split("\n") if l.strip()]
        table_rows = [l for l in lines if l.startswith("|")]
        self.assertTrue(any("Group 1" in r for r in table_rows))
        self.assertTrue(any("Group 2" in r for r in table_rows))
        group1_row = next(r for r in table_rows if "Group 1" in r)
        group2_row = next(r for r in table_rows if "Group 2" in r)
        self.assertNotIn("Group 2", group1_row)

    def test_multiple_consecutive_overflows(self):
        md = (
            "| A | B | C |\n"
            "| --- | --- | --- |\n"
            "| X | Y | Z |\n"
            "\n"
            "\u221a\n"
            "\n"
            " |\n"
            "| P | Q | R |\n"
            "\n"
            "\u221a\n"
            "\n"
            " |\n"
            "| D | E | F |\n"
        )
        result = fix_broken_rows(md)
        self.assertIn("| X | Y | Z | \u221a |", result)
        self.assertIn("| P | Q | R | \u221a |", result)
        self.assertIn("| D | E | F |", result)

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


class TestFixFile(unittest.TestCase):
    def test_preserves_frontmatter(self):
        content = (
            "---\ntitle: test\n---\n"
            "| A | B |\n"
            "| --- | --- |\n"
            "| X |\n"
            "Y\n"
            " |\n"
        )
        result = self._fix(content)
        self.assertTrue(result.startswith("---\ntitle: test\n---\n"))
        self.assertIn("| X | Y |", result)

    def test_returns_zero_for_no_changes(self):
        content = (
            "---\ntitle: test\n---\n"
            "| A | B |\n"
            "| --- | --- |\n"
            "| 1 | 2 |\n"
        )
        self.assertEqual(self._fix_count(content), 0)

    def test_returns_nonzero_for_changes(self):
        content = (
            "---\ntitle: test\n---\n"
            "| A | B |\n"
            "| --- | --- |\n"
            "| X |\n"
            "Y\n"
            " |\n"
        )
        self.assertGreater(self._fix_count(content), 0)

    def test_dry_run_does_not_modify_file(self):
        content = (
            "---\ntitle: test\n---\n"
            "| A | B |\n"
            "| --- | --- |\n"
            "| X |\n"
            "Y\n"
            " |\n"
        )
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
