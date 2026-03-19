#!/usr/bin/env python3
"""Fix internal AEM links in TechDocs markdown files.

Converts /content/techdocs/en_US/... paths and
https://docs.paloaltonetworks.com/content/techdocs/en_US/... URLs
to proper https://docs.paloaltonetworks.com/... URLs.
"""

import argparse
import glob
import os
import re
import sys

BASE_URL = "https://docs.paloaltonetworks.com"

# Full URL with /content/techdocs/en_US/ embedded
FULL_URL_PATTERN = re.compile(
    r"https://docs\.paloaltonetworks\.com/content/techdocs/en_US/([^\s\)\"]+)"
)

# Bare path starting with /content/techdocs/en_US/
BARE_PATH_PATTERN = re.compile(
    r"(?<!\w)/content/techdocs/en_US/([^\s\)\"]+)"
)


def find_frontmatter_end(text: str) -> int:
    if not text.startswith("---\n"):
        return 0
    second_fence = text.find("\n---\n", 4)
    if second_fence == -1:
        return 0
    return second_fence + len("\n---\n")


def rewrite_path(match: re.Match) -> str:
    """Convert an AEM internal path to a proper docs URL."""
    relative = match.group(1)
    # Strip .html suffix (docs site doesn't need it)
    relative = re.sub(r"\.html$", "", relative)
    return f"{BASE_URL}/{relative}"


def fix_body(body: str) -> tuple[str, int]:
    count = 0
    count += len(FULL_URL_PATTERN.findall(body))
    count += len(BARE_PATH_PATTERN.findall(body))

    body = FULL_URL_PATTERN.sub(rewrite_path, body)
    body = BARE_PATH_PATTERN.sub(rewrite_path, body)

    return body, count


def fix_file(filepath: str, *, dry_run: bool) -> int:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    body_start = find_frontmatter_end(content)
    frontmatter = content[:body_start]
    body = content[body_start:]

    new_body, count = fix_body(body)

    if count == 0:
        return 0

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(frontmatter + new_body)

    filename = os.path.basename(filepath)
    prefix = "[DRY RUN] Would fix" if dry_run else "Fixed"
    print(f"{prefix} {filename} ({count} links)")
    return count


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Fix internal AEM links in TechDocs markdown files"
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
    total_links = 0

    for filepath in files:
        count = fix_file(filepath, dry_run=args.dry_run)
        if count > 0:
            total_files += 1
            total_links += count

    print(f"Fixed {total_files} files, {total_links} links rewritten")


if __name__ == "__main__":
    main()
