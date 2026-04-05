#!/usr/bin/env python3
"""Convert raw HTML <table> blocks to markdown tables."""

import argparse
import glob
import os
import re
import sys
from html.parser import HTMLParser

TABLE_BLOCK_RE = re.compile(r"<table[^>]*>.*?</table>", re.DOTALL)


class _CellConverter(HTMLParser):
    """Parse an HTML table and produce a list of rows, each row a list of cell strings."""

    def __init__(self):
        super().__init__()
        self.rows = []
        self._row = []
        self._cell_parts = []
        self._in_cell = False
        self._stack = []

    def _role_active(self, role):
        return any(r == role for _, r, _ in self._stack)

    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            self._row = []
            return
        if tag in ("td", "th"):
            self._cell_parts = []
            self._in_cell = True
            return
        if not self._in_cell:
            return

        a = dict(attrs)
        cls = a.get("class") or ""

        if tag == "figure":
            self._stack.append((tag, "figure", None))
        elif self._role_active("figure"):
            self._stack.append((tag, "skip", None))
        elif tag in ("b", "strong"):
            self._cell_parts.append("**")
            self._stack.append((tag, "bold", None))
        elif tag in ("i", "em"):
            self._cell_parts.append("*")
            self._stack.append((tag, "italic", None))
        elif tag == "a":
            self._cell_parts.append("[")
            self._stack.append((tag, "link", a.get("href") or ""))
        elif tag == "span" and "systemoutput" in cls:
            self._cell_parts.append("`")
            self._stack.append((tag, "code", None))
        elif tag == "span" and "uicontrol" in cls:
            if self._role_active("menucascade"):
                for j in range(len(self._stack) - 1, -1, -1):
                    if self._stack[j][1] == "menucascade":
                        if self._stack[j][2] > 0:
                            self._cell_parts.append(" > ")
                        self._stack[j] = (self._stack[j][0], "menucascade", self._stack[j][2] + 1)
                        break
                self._cell_parts.append("**")
                self._stack.append((tag, "mc_child", None))
            else:
                self._cell_parts.append("**")
                self._stack.append((tag, "uicontrol", None))
        elif tag == "span" and "menucascade" in cls:
            self._stack.append((tag, "menucascade", 0))
        elif tag in ("ul", "ol"):
            self._stack.append((tag, "list", 0))
        elif tag == "li":
            for j in range(len(self._stack) - 1, -1, -1):
                if self._stack[j][1] == "list":
                    if self._stack[j][2] > 0:
                        self._cell_parts.append("; ")
                    self._stack[j] = (self._stack[j][0], "list", self._stack[j][2] + 1)
                    break
            self._stack.append((tag, "list_item", None))
        else:
            self._stack.append((tag, "other", None))

    def handle_endtag(self, tag):
        if tag == "tr":
            if self._row:
                self.rows.append(self._row)
            return
        if tag in ("td", "th"):
            text = "".join(self._cell_parts)
            text = re.sub(r"\s+", " ", text).strip()
            self._row.append(text)
            self._in_cell = False
            return
        if not self._in_cell or not self._stack:
            return

        _, role, extra = self._stack.pop()
        if role == "figure":
            self._cell_parts.append(" ")
        elif role in ("bold", "uicontrol", "mc_child"):
            self._cell_parts.append("**")
        elif role == "italic":
            self._cell_parts.append("*")
        elif role == "link":
            self._cell_parts.append(f"]({extra})")
        elif role == "code":
            self._cell_parts.append("`")

    def handle_data(self, data):
        if not self._in_cell or self._role_active("figure"):
            return
        self._cell_parts.append(data)


def parse_html_table(html):
    parser = _CellConverter()
    parser.feed(html)
    return parser.rows


def build_markdown_table(rows):
    if not rows:
        return ""

    if len(rows) == 1 and len(rows[0]) == 1:
        return rows[0][0]

    col_count = max(len(r) for r in rows)

    def escape_cell(text):
        return text.replace("|", "\\|")

    def pad_row(row):
        return row + [""] * (col_count - len(row))

    first_row = rows[0]
    has_bold_header = all(
        c.startswith("**") and c.endswith("**") for c in first_row if c
    )

    lines = []
    if has_bold_header and first_row:
        lines.append("| " + " | ".join(escape_cell(c) for c in pad_row(first_row)) + " |")
        lines.append("| " + " | ".join("---" for _ in range(col_count)) + " |")
        data_rows = rows[1:]
    else:
        lines.append("| " + " | ".join(f"Column {i+1}" for i in range(col_count)) + " |")
        lines.append("| " + " | ".join("---" for _ in range(col_count)) + " |")
        data_rows = rows

    for row in data_rows:
        lines.append("| " + " | ".join(escape_cell(c) for c in pad_row(row)) + " |")

    return "\n".join(lines)


def convert_html_tables(body):
    count = [0]

    def _replace(m):
        rows = parse_html_table(m.group(0))
        if not rows:
            return m.group(0)
        count[0] += 1
        return build_markdown_table(rows)

    new_body = TABLE_BLOCK_RE.sub(_replace, body)
    return new_body, count[0]


def find_frontmatter_end(text):
    if not text.startswith("---\n"):
        return 0
    second_fence = text.find("\n---\n", 4)
    if second_fence == -1:
        return 0
    return second_fence + len("\n---\n")


def fix_file(filepath, *, dry_run):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    body_start = find_frontmatter_end(content)
    frontmatter = content[:body_start]
    body = content[body_start:]

    new_body, table_count = convert_html_tables(body)

    if new_body == body:
        return 0

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(frontmatter + new_body)

    filename = os.path.basename(filepath)
    prefix = "[DRY RUN] Would fix" if dry_run else "Fixed"
    print(f"{prefix} {filename} ({table_count} HTML tables converted)")
    return table_count


def main():
    parser = argparse.ArgumentParser(
        description="Convert raw HTML tables to markdown in AEM-sourced files"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Report what would change without writing",
    )
    parser.add_argument(
        "--sources",
        type=str,
        default=None,
        help="Custom source directory",
    )
    args = parser.parse_args()

    if args.sources:
        source_dir = args.sources
    else:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        source_dir = os.path.join(os.path.dirname(script_dir), "sources_fetch")

    if not os.path.isdir(source_dir):
        print(f"Error: source directory not found: {source_dir}", file=sys.stderr)
        sys.exit(1)

    pattern = os.path.join(source_dir, "[0-9]*.md")
    files = sorted(glob.glob(pattern))

    if not files:
        print(f"No [0-9]*.md files found in {source_dir}")
        sys.exit(0)

    total_files = 0
    total_tables = 0

    for filepath in files:
        count = fix_file(filepath, dry_run=args.dry_run)
        if count > 0:
            total_files += 1
            total_tables += count

    print(f"Fixed {total_files} files, {total_tables} HTML tables converted")


if __name__ == "__main__":
    main()
