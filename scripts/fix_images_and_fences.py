#!/usr/bin/env python3
"""Replace image references with characters or remove them from markdown source files."""

import argparse
import glob
import os
import re
import sys


IMAGE_CHAR_MAP = {
    "check-mark.png": "\u2713",
    "three-dots.png": "\u22ee",
    "three-dots-dark.png": "\u22ee",
    "blue-arrow.png": "\u2192",
    "arrow.png": "\u2192",
    "enter.png": "\u21b5",
    "check-box.png": "\u2610",
}

IMAGE_PATTERN = re.compile(r"\[image: [^\]]+\]")
MULTI_BLANK = re.compile(r"\n{3,}")


def find_frontmatter_end(text: str) -> int:
    if not text.startswith("---\n"):
        return 0
    second_fence = text.find("\n---\n", 4)
    if second_fence == -1:
        return 0
    return second_fence + len("\n---\n")


def _replace_image(match: re.Match) -> str:
    full = match.group(0)
    name = full[len("[image: "):-1]
    return IMAGE_CHAR_MAP.get(name, "")


def clean_body(body: str) -> str:
    body = IMAGE_PATTERN.sub(_replace_image, body)
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

    all_images = IMAGE_PATTERN.findall(body)
    char_mapped = sum(1 for m in all_images if m[len("[image: "):-1] in IMAGE_CHAR_MAP)
    image_removed = len(all_images) - char_mapped
    blank_collapses = len(MULTI_BLANK.findall(body))
    total = char_mapped + image_removed + blank_collapses

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(frontmatter + new_body)

    filename = os.path.basename(filepath)
    prefix = "[DRY RUN] Would fix" if dry_run else "Fixed"
    details = []
    if char_mapped:
        details.append(f"{char_mapped} icon images")
    if image_removed:
        details.append(f"{image_removed} image references")
    if blank_collapses:
        details.append(f"{blank_collapses} blank line collapses")
    print(f"{prefix} {filename} ({', '.join(details)})")
    return total


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Remove image references and code fence markers from markdown source files"
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
