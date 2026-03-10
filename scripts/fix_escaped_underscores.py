#!/usr/bin/env python3
r"""Fix escaped underscores (\_) in markdown source files and regenerate the combined file."""

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


def fix_file(filepath: str, *, dry_run: bool) -> int:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    body_start = find_frontmatter_end(content)
    frontmatter = content[:body_start]
    body = content[body_start:]

    new_body = body.replace(r"\_", "_")
    count = body.count(r"\_")

    if count == 0:
        return 0

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(frontmatter + new_body)

    filename = os.path.basename(filepath)
    prefix = "[DRY RUN] Would fix" if dry_run else "Fixed"
    print(f"{prefix} {filename} ({count} replacements)")
    return count


def regenerate_combined(source_dir: str, *, dry_run: bool) -> None:
    pattern = os.path.join(source_dir, "[0-9]*.md")
    files = sorted(glob.glob(pattern))

    sections = []
    for filepath in files:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        stripped = re.sub(r"^---\n.*?\n---\n", "", content, count=1, flags=re.DOTALL)
        sections.append(stripped)

    combined = "\n\n---\n\n".join(sections)
    output_path = os.path.join(source_dir, "cortex-cloud-appsec-combined.md")
    line_count = combined.count("\n") + 1

    if dry_run:
        print(f"[DRY RUN] Would regenerate cortex-cloud-appsec-combined.md ({line_count} lines)")
    else:
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(combined)
        print(f"Regenerated cortex-cloud-appsec-combined.md ({line_count} lines)")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Fix escaped underscores in markdown source files"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Report what would change without writing",
    )
    parser.add_argument(
        "--no-combine",
        action="store_true",
        help="Fix files but skip combined file regeneration",
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
    total_replacements = 0

    for filepath in files:
        count = fix_file(filepath, dry_run=args.dry_run)
        if count > 0:
            total_files += 1
            total_replacements += count

    print(f"Fixed {total_files} files, {total_replacements} total replacements")

    if not args.no_combine:
        regenerate_combined(source_dir, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
