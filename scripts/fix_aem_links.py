#!/usr/bin/env python3
"""Strip images and clean CMS link paths from AEM-sourced markdown files."""

import argparse
import glob
import os
import re
import sys

EMPH_IMAGE = re.compile(r"_!\[[^\]]*\]\([^\)]*\)_")
IMAGE = re.compile(r"!\[[^\]]*\]\([^\)]*\)")
LINK = re.compile(r"\[([^\]]+)\]\(([^\)]+)\)")
MULTI_BLANK = re.compile(r"\n{3,}")

CMS_PREFIX = "/content/techdocs/en_US"
AEM_DOMAIN = "https://docs.paloaltonetworks.com"


def _clean_link_url(url):
    cleaned = url
    if cleaned.startswith(AEM_DOMAIN):
        cleaned = cleaned[len(AEM_DOMAIN):]
    if not cleaned.startswith(CMS_PREFIX):
        return url
    cleaned = cleaned[len(CMS_PREFIX):]
    cleaned = re.sub(r"\.html(?=#|$)", "", cleaned)
    return cleaned


def clean_link_paths(body):
    def replace_link(m):
        text = m.group(1)
        url = _clean_link_url(m.group(2))
        return f"[{text}]({url})"

    return LINK.sub(replace_link, body)


def clean_body(body):
    body = EMPH_IMAGE.sub("", body)
    body = IMAGE.sub("", body)
    body = clean_link_paths(body)
    body = MULTI_BLANK.sub("\n\n", body)
    return body


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

    new_body = clean_body(body)

    if new_body == body:
        return 0

    images_removed = len(IMAGE.findall(body)) + len(EMPH_IMAGE.findall(body))
    links_cleaned = sum(
        1 for m in LINK.finditer(body) if _clean_link_url(m.group(2)) != m.group(2)
    )
    total = images_removed + links_cleaned

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(frontmatter + new_body)

    filename = os.path.basename(filepath)
    prefix = "[DRY RUN] Would fix" if dry_run else "Fixed"
    details = []
    if images_removed:
        details.append(f"{images_removed} images")
    if links_cleaned:
        details.append(f"{links_cleaned} links")
    print(f"{prefix} {filename} ({', '.join(details)})")
    return total


def main():
    parser = argparse.ArgumentParser(
        description="Strip images and clean CMS link paths from AEM-sourced markdown files"
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
    total_changes = 0
    for filepath in files:
        count = fix_file(filepath, dry_run=args.dry_run)
        if count > 0:
            total_files += 1
            total_changes += count

    print(f"Fixed {total_files} files, {total_changes} total changes")


if __name__ == "__main__":
    main()
