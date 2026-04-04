#!/usr/bin/env python3
"""Strip CMS header/footer chrome and clean patterns from AEM-sourced markdown files."""

import argparse
import glob
import os
import re
import sys

SIDEBAR_MARKER = re.compile(r"^#{1,6}\s+Prisma Access Docs\s*$", re.MULTILINE)
CONTENT_H1 = re.compile(r"^# .+$", re.MULTILINE)
ON_THIS_PAGE = re.compile(r"^#{1,6}\s+On This Page\s*$", re.MULTILINE)


def find_content_start(body):
    matches = list(SIDEBAR_MARKER.finditer(body))
    if len(matches) < 2:
        return None
    h1 = CONTENT_H1.search(body, matches[1].end())
    if h1 is None:
        return None
    return h1.start()


def find_content_end(body, search_from=0):
    usabilla_pos = body.find("if (!usabilla", search_from)
    if usabilla_pos != -1:
        line_start = body.rfind("\n", 0, usabilla_pos)
        return line_start + 1 if line_start != -1 else usabilla_pos
    otp_match = ON_THIS_PAGE.search(body, search_from)
    if otp_match:
        return otp_match.start()
    return len(body)


UPDATED_ON = re.compile(r"^Updated on\s*\n\s*\n.+$", re.MULTILINE)
DOWNLOAD_PDF = re.compile(r"^Download PDF\s*$", re.MULTILINE)
PREV_NEXT = re.compile(r"\[\s*(?:Previous|Next)\s*\n[\s\S]*?\]\([^\)]+\)")
HR_DIVIDER = re.compile(r"^\* \* \*\s*$", re.MULTILINE)
MULTI_BLANK = re.compile(r"\n{3,}")


def clean_patterns(body):
    body = UPDATED_ON.sub("", body)
    body = DOWNLOAD_PDF.sub("", body)
    body = PREV_NEXT.sub("", body)
    body = HR_DIVIDER.sub("", body)
    first_h1 = re.search(r"^# (.+)$", body, re.MULTILINE)
    if first_h1 and re.match(r"[a-z][a-z0-9:\-]+$", first_h1.group(1).strip()):
        end = first_h1.end()
        if end < len(body) and body[end] == "\n":
            end += 1
        body = body[: first_h1.start()] + body[end:]
    body = MULTI_BLANK.sub("\n\n", body)
    return body


def strip_chrome(body):
    start = find_content_start(body)
    if start is None:
        return body
    end = find_content_end(body, start)
    content = body[start:end]
    content = clean_patterns(content)
    return content.rstrip("\n") + "\n"


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

    new_body = strip_chrome(body)

    if new_body == body:
        return 0

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(frontmatter + new_body)

    filename = os.path.basename(filepath)
    prefix = "[DRY RUN] Would fix" if dry_run else "Fixed"
    print(f"{prefix} {filename} (stripped CMS chrome)")
    return 1


def main():
    parser = argparse.ArgumentParser(
        description="Strip CMS header/footer chrome from AEM-sourced markdown files"
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
        help="Custom source directory (default: sources_fetch/ relative to script's parent dir)",
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
    for filepath in files:
        count = fix_file(filepath, dry_run=args.dry_run)
        if count > 0:
            total_files += 1

    print(f"Fixed {total_files} files")


if __name__ == "__main__":
    main()
