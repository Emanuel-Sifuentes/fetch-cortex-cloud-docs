#!/usr/bin/env python3
"""Remove AEM navigation cruft from TechDocs markdown files.

Strips: "Updated on" date lines, "Focus" headers, breadcrumb nav lists,
PDF download blocks, Table of Contents sections, filter UI elements,
and collapses resulting blank lines.
"""

import argparse
import glob
import os
import re
import sys


def find_frontmatter_end(text: str) -> int:
    if not text.startswith("---\n"):
        return 0
    second_fence = text.find("\n---\n", 4)
    if second_fence == -1:
        return 0
    return second_fence + len("\n---\n")


# "Updated on" line followed by a date line
UPDATED_ON = re.compile(r"^Updated on\n\n.+\n", re.MULTILINE)

# Standalone "Focus" line (breadcrumb header)
FOCUS_LINE = re.compile(r"^Focus\n\n", re.MULTILINE)

# Breadcrumb nav: numbered list where every link points to / or /content/techdocs/
BREADCRUMB_BLOCK = re.compile(
    r"(^[0-9]+\.\s+\[.+?\]\(/(?:content/techdocs/[^\)]+)?\)\n)+",
    re.MULTILINE,
)

# PDF cover image + download link block
PDF_BLOCK = re.compile(
    r"^\[!\[PDF Cover Image\].+?\n\n\[Download PDF\n\n\]\(.+?\)\n",
    re.MULTILINE,
)

# Horizontal rule + "Table of Contents" + filter icon + filter label + expand/collapse
# This is a multi-line block that appears on index/section pages
TOC_HEADER = re.compile(
    r"^\* \* \*\n\nTable of Contents\n\n"
    r"(?:!\[Filter icon\].+?\n\n)?"
    r"(?:Filter\n\n)?"
    r"(?:Expand all \| Collapse all\n\n)?",
    re.MULTILINE,
)

# TOC list: lines starting with - or indented - that link to /content/techdocs/
# Continues until a non-list, non-blank, non-indented line
TOC_LIST = re.compile(
    r"(^[ \t]*-\s+\[.+?\]\(/content/techdocs/[^\)]+\)\n(?:[ \t]*\n)*)+",
    re.MULTILINE,
)

# /content/dam/ image references (filter icons, PDF thumbnails, etc.)
DAM_IMAGE = re.compile(r"!\[[^\]]*\]\(/content/dam/[^\)]+\)\n?")

# Collapse multiple blank lines
MULTI_BLANK = re.compile(r"\n{3,}")


def clean_body(body: str) -> str:
    body = UPDATED_ON.sub("", body)
    body = FOCUS_LINE.sub("", body)
    body = BREADCRUMB_BLOCK.sub("", body)
    body = PDF_BLOCK.sub("", body)
    body = TOC_HEADER.sub("", body)
    body = TOC_LIST.sub("", body)
    body = DAM_IMAGE.sub("", body)
    body = MULTI_BLANK.sub("\n\n", body)
    return body


def fix_file(filepath: str, *, dry_run: bool) -> int:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    body_start = find_frontmatter_end(content)
    frontmatter = content[:body_start]
    body = content[body_start:]

    new_body = clean_body(body)

    if new_body == body:
        return 0

    changes = len(body) - len(new_body)

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(frontmatter + new_body)

    filename = os.path.basename(filepath)
    prefix = "[DRY RUN] Would fix" if dry_run else "Fixed"
    print(f"{prefix} {filename} ({changes} chars removed)")
    return changes


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Remove AEM navigation cruft from TechDocs markdown files"
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
        help="Custom source directory (default: sources_techdocs/prisma-browser/)",
    )
    args = parser.parse_args()

    if args.sources:
        source_dir = args.sources
    else:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        source_dir = os.path.join(
            os.path.dirname(script_dir), "sources_techdocs", "prisma-browser"
        )

    if not os.path.isdir(source_dir):
        print(f"Error: source directory not found: {source_dir}", file=sys.stderr)
        sys.exit(1)

    pattern = os.path.join(source_dir, "[0-9]*.md")
    files = sorted(glob.glob(pattern))

    if not files:
        print(f"No [0-9]*.md files found in {source_dir}")
        sys.exit(0)

    total_files = 0
    total_chars = 0

    for filepath in files:
        count = fix_file(filepath, dry_run=args.dry_run)
        if count > 0:
            total_files += 1
            total_chars += count

    print(f"Fixed {total_files} files, {total_chars} chars removed")


if __name__ == "__main__":
    main()
