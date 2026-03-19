#!/usr/bin/env python3
"""Fix broken table rows where cell content spans multiple lines."""

import argparse
import glob
import os
import re
import sys


SEPARATOR_PATTERN = re.compile(r"^\|[\s\-:|]+\|$")


def find_frontmatter_end(text: str) -> int:
    if not text.startswith("---\n"):
        return 0
    second_fence = text.find("\n---\n", 4)
    if second_fence == -1:
        return 0
    return second_fence + len("\n---\n")


def count_pipes(line: str) -> int:
    return len(re.findall(r"(?<!\\)\|", line))


def fix_broken_table_rows(md: str) -> str:
    lines = md.split("\n")
    result = []
    expected_pipes = 0
    i = 0

    while i < len(lines):
        stripped = lines[i].rstrip()

        if SEPARATOR_PATTERN.match(stripped):
            expected_pipes = count_pipes(stripped)
            result.append(lines[i])
            i += 1
            continue

        if expected_pipes > 0 and stripped.startswith("|"):
            pipes = count_pipes(stripped)
            if pipes >= expected_pipes:
                result.append(lines[i])
                i += 1
                continue

            parts = [stripped]
            total_pipes = pipes
            i += 1
            while i < len(lines) and total_pipes < expected_pipes:
                ns = lines[i].rstrip()
                if ns.startswith("|") and ns != "|" and count_pipes(ns) >= expected_pipes:
                    break
                parts.append(ns)
                total_pipes += count_pipes(ns)
                i += 1

            joined = " ".join(p for p in parts if p)
            joined = re.sub(r"\s+", " ", joined)
            result.append(joined)
            continue

        if stripped == "":
            expected_pipes = 0

        result.append(lines[i])
        i += 1

    return "\n".join(result)


def fix_file(filepath: str, *, dry_run: bool) -> int:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    body_start = find_frontmatter_end(content)
    frontmatter = content[:body_start]
    body = content[body_start:]

    new_body = fix_broken_table_rows(body)

    if new_body == body:
        return 0

    orig_lines = body.split("\n")
    new_lines = new_body.split("\n")
    broken_count = len(orig_lines) - len(new_lines)

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(frontmatter + new_body)

    filename = os.path.basename(filepath)
    prefix = "[DRY RUN] Would fix" if dry_run else "Fixed"
    print(f"{prefix} {filename} ({broken_count} lines collapsed)")
    return broken_count


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Fix broken table rows in markdown source files"
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
    total_fixes = 0

    for filepath in files:
        count = fix_file(filepath, dry_run=args.dry_run)
        if count > 0:
            total_files += 1
            total_fixes += count

    print(f"Fixed {total_files} files, {total_fixes} lines collapsed")


if __name__ == "__main__":
    main()
