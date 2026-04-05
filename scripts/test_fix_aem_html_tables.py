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


    def test_italic_preserved(self):
        body = (
            "<table><tbody>"
            "<tr><td><b>Col</b></td></tr>"
            "<tr><td><i>emphasis</i></td></tr>"
            "</tbody></table>"
        )
        result, _ = convert_html_tables(body)
        self.assertIn("*emphasis*", result)

    def test_link_preserved(self):
        body = (
            "<table><tbody>"
            "<tr><td><b>Col</b></td></tr>"
            '<tr><td>See <a class="xref" href="/docs/setup">setup guide</a></td></tr>'
            "</tbody></table>"
        )
        result, _ = convert_html_tables(body)
        self.assertIn("[setup guide](/docs/setup)", result)

    def test_code_span_from_systemoutput(self):
        body = (
            "<table><tbody>"
            "<tr><td><b>Col</b></td></tr>"
            '<tr><td>Run <span class="ph systemoutput">curl -X GET</span></td></tr>'
            "</tbody></table>"
        )
        result, _ = convert_html_tables(body)
        self.assertIn("`curl -X GET`", result)

    def test_uicontrol_renders_bold(self):
        body = (
            "<table><tbody>"
            "<tr><td><b>Col</b></td></tr>"
            '<tr><td>Click <span class="ph uicontrol">Save</span></td></tr>'
            "</tbody></table>"
        )
        result, _ = convert_html_tables(body)
        self.assertIn("**Save**", result)

    def test_menucascade_joined_with_angle_brackets(self):
        body = (
            "<table><tbody>"
            "<tr><td><b>Col</b></td></tr>"
            "<tr><td>"
            '<span class="ph menucascade">'
            '<span class="ph uicontrol">Network</span>'
            '<span class="ph uicontrol">Zones</span>'
            "</span>"
            "</td></tr>"
            "</tbody></table>"
        )
        result, _ = convert_html_tables(body)
        self.assertIn("**Network** > **Zones**", result)


if __name__ == "__main__":
    unittest.main()
