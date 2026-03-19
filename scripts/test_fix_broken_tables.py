#!/usr/bin/env python3
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(__file__))
from fix_broken_tables import fix_broken_table_rows, fix_file


class TestFixBrokenTableRows(unittest.TestCase):
    def test_leaves_valid_table_unchanged(self):
        md = "| A | B |\n| --- | --- |\n| 1 | 2 |\n"
        self.assertEqual(fix_broken_table_rows(md), md)

    def test_joins_row_split_across_two_lines(self):
        md = "| A | B |\n| --- | --- |\n| Cell1 | \nsome continuation |\n| Cell3 | Cell4 |\n"
        result = fix_broken_table_rows(md)
        self.assertEqual(result, "| A | B |\n| --- | --- |\n| Cell1 | some continuation |\n| Cell3 | Cell4 |\n")

    def test_joins_row_split_across_multiple_lines_with_blank(self):
        md = "| Setting | Description |\n| --- | --- |\n| MTTR | \nDetermines days.\n\n |\n| Other | Value |\n"
        result = fix_broken_table_rows(md)
        self.assertEqual(
            result,
            "| Setting | Description |\n| --- | --- |\n| MTTR | Determines days. |\n| Other | Value |\n",
        )

    def test_joins_row_with_code_block_content(self):
        md = "| Error | Solution |\n| --- | --- |\n| Wrong Cert | Re-create:\n-----BEGIN-----abc-----END-----\n\n |\n| Timeout | Check logs. |\n"
        result = fix_broken_table_rows(md)
        self.assertIn("| Wrong Cert | Re-create: -----BEGIN-----abc-----END----- |", result)
        self.assertIn("| Timeout | Check logs. |", result)

    def test_preserves_non_table_content(self):
        md = "# Heading\n\nSome paragraph.\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n\nAnother paragraph.\n"
        self.assertEqual(fix_broken_table_rows(md), md)

    def test_handles_no_tables(self):
        md = "Just plain text.\n\nNo tables here.\n"
        self.assertEqual(fix_broken_table_rows(md), md)

    def test_handles_empty_string(self):
        self.assertEqual(fix_broken_table_rows(""), "")

    def test_multiple_broken_rows_in_same_table(self):
        md = "| A | B |\n| --- | --- |\n| c1 | \nval1\n\n |\n| c2 | \nval2\n\n |\n"
        result = fix_broken_table_rows(md)
        self.assertEqual(result, "| A | B |\n| --- | --- |\n| c1 | val1 |\n| c2 | val2 |\n")


class TestFixFile(unittest.TestCase):
    def test_preserves_frontmatter(self):
        content = "---\ntitle: test\n---\n| A | B |\n| --- | --- |\n| x | \ncontinuation |\n"
        result = self._fix(content)
        self.assertTrue(result.startswith("---\ntitle: test\n---\n"))
        self.assertIn("| x | continuation |", result)

    def test_returns_zero_for_no_changes(self):
        content = "---\ntitle: test\n---\n| A | B |\n| --- | --- |\n| 1 | 2 |\n"
        self.assertEqual(self._fix_count(content), 0)

    def test_returns_count_for_changes(self):
        content = "---\ntitle: test\n---\n| A | B |\n| --- | --- |\n| x | \ncontinuation |\n"
        self.assertGreater(self._fix_count(content), 0)

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
