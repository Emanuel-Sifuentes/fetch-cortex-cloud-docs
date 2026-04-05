#!/usr/bin/env python3
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(__file__))
from fix_aem_html_tables import convert_html_tables


class TestConvertHtmlTables(unittest.TestCase):
    def test_simple_two_column_table(self):
        body = (
            '<table class="table">'
            "<tbody>"
            '<tr><td class="entry"><b class="ph b">Method</b></td>'
            '<td class="entry"><b class="ph b">URI</b></td></tr>'
            '<tr><td class="entry">GET</td>'
            '<td class="entry">/api/v1/resources</td></tr>'
            "</tbody>"
            "</table>"
        )
        result, count = convert_html_tables(body)
        self.assertEqual(count, 1)
        self.assertIn("| **Method** | **URI** |", result)
        self.assertIn("| --- | --- |", result)
        self.assertIn("| GET | /api/v1/resources |", result)

    def test_no_html_tables_returns_body_unchanged(self):
        body = "Just regular markdown.\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n"
        result, count = convert_html_tables(body)
        self.assertEqual(count, 0)
        self.assertEqual(result, body)

    def test_non_table_html_left_unchanged(self):
        body = "Text with <b>bold</b> and <a href='url'>link</a>.\n"
        result, count = convert_html_tables(body)
        self.assertEqual(count, 0)
        self.assertEqual(result, body)

    def test_surrounding_text_preserved(self):
        body = (
            "Before.\n\n"
            '<table class="table"><tbody>'
            "<tr><td><b>A</b></td></tr>"
            "<tr><td>1</td></tr>"
            "</tbody></table>"
            "\n\nAfter.\n"
        )
        result, count = convert_html_tables(body)
        self.assertEqual(count, 1)
        self.assertIn("Before.", result)
        self.assertIn("After.", result)
        self.assertIn("| **A** |", result)

    def test_three_column_data_table(self):
        body = (
            '<table class="table colsep rowsep"><tbody>'
            "<tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Required</b></td></tr>"
            "<tr><td>host</td><td>string</td><td>Yes</td></tr>"
            "<tr><td>port</td><td>integer</td><td>No</td></tr>"
            "</tbody></table>"
        )
        result, count = convert_html_tables(body)
        self.assertEqual(count, 1)
        self.assertIn("| **Name** | **Type** | **Required** |", result)
        self.assertIn("| --- | --- | --- |", result)
        self.assertIn("| host | string | Yes |", result)
        self.assertIn("| port | integer | No |", result)

    def test_generic_header_when_first_row_not_bold(self):
        body = (
            "<table><tbody>"
            "<tr><td>alice</td><td>admin</td></tr>"
            "<tr><td>bob</td><td>viewer</td></tr>"
            "</tbody></table>"
        )
        result, count = convert_html_tables(body)
        self.assertEqual(count, 1)
        self.assertIn("| Column 1 | Column 2 |", result)
        self.assertIn("| --- | --- |", result)
        self.assertIn("| alice | admin |", result)


if __name__ == "__main__":
    unittest.main()
