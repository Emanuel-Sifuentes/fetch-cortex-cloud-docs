#!/usr/bin/env python3
"""Rejoin broken markdown table rows where cell content is split across lines."""

import argparse
import glob
import os
import re
import sys

SEPARATOR_PATTERN = re.compile(r"^\|[\s\-:|]+\|$")


def count_pipes(line):
    return len(re.findall(r"(?<!\\)\|", line))


def _is_collection_terminator(stripped):
    if stripped.startswith("#"):
        return True
    if stripped.startswith("```"):
        return True
    return False


def _join_broken_header(result, expected_pipes):
    """Retroactively join broken header rows preceding a separator."""
    if not result:
        return

    pipe_indices = []
    for j in range(len(result) - 1, -1, -1):
        s = result[j].strip()
        if "|" in s:
            if count_pipes(s) >= expected_pipes:
                break
            pipe_indices.append(j)
        elif s == "":
            continue
        elif SEPARATOR_PATTERN.match(s) or s.startswith("#") or s.startswith("```"):
            break
        else:
            if pipe_indices:
                continue
            else:
                break

    if len(pipe_indices) < 2:
        return

    start = min(pipe_indices)
    region = result[start:]
    non_blank = [l.strip() for l in region if l.strip()]

    if len(non_blank) <= 1:
        return

    joined = " ".join(l.strip() for l in region if l.strip())
    joined = re.sub(r"\s+", " ", joined)

    if count_pipes(joined) >= expected_pipes:
        del result[start:]
        result.append(joined)


def _lookahead_for_continuation(lines, start):
    """Check if lines from start form overflow content ending with a closing pipe.

    Matches: optional blanks, non-pipe content, optional blanks, then a line
    ending with `|` (bare pipe, or text + pipe like `(Default) |`).
    Returns index past the closing pipe if found, else -1.
    """
    j = start
    found_content = False
    while j < len(lines):
        s = lines[j].rstrip()
        stripped = s.strip()
        if stripped == "":
            j += 1
            continue
        if stripped == "|":
            if found_content:
                return j + 1
            return -1
        if _is_collection_terminator(stripped):
            return -1
        if stripped.startswith("|") and count_pipes(s) > 1:
            return -1
        if not stripped.startswith("|") and stripped.endswith("|") and found_content:
            return j + 1
        found_content = True
        j += 1
    return -1


def fix_broken_rows(md):
    lines = md.split("\n")
    result = []
    expected_pipes = 0
    i = 0

    while i < len(lines):
        stripped = lines[i].rstrip()

        if SEPARATOR_PATTERN.match(stripped):
            _join_broken_header(result, count_pipes(stripped))
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
            while i < len(lines):
                ns = lines[i].rstrip()
                if ns.startswith("|") and ns.strip() != "|":
                    break
                if SEPARATOR_PATTERN.match(ns):
                    break
                if ns.strip() != "" and _is_collection_terminator(ns.strip()):
                    break
                if total_pipes >= expected_pipes and ns.strip() == "":
                    break
                parts.append(ns)
                total_pipes += count_pipes(ns)
                i += 1

            joined = " ".join(p for p in parts if p.strip())
            joined = re.sub(r"\s+", " ", joined).strip()
            result.append(joined)
            continue

        if expected_pipes > 0 and stripped == "":
            end = _lookahead_for_continuation(lines, i + 1)
            if end != -1 and result and result[-1].rstrip().endswith("|"):
                content_parts = []
                for k in range(i, end):
                    s = lines[k].strip()
                    if s and s != "|":
                        content_parts.append(s)
                if content_parts and content_parts[-1].endswith("|"):
                    content_parts[-1] = content_parts[-1][:-1].rstrip()
                    if not content_parts[-1]:
                        content_parts.pop()
                content_text = " ".join(content_parts)
                result[-1] = result[-1].rstrip() + " " + content_text + " |"
                i = end
                continue
            result.append(lines[i])
            i += 1
            continue

        if stripped == "":
            result.append(lines[i])
            i += 1
            continue

        if not stripped.startswith("|"):
            expected_pipes = 0

        result.append(lines[i])
        i += 1

    return "\n".join(result)


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

    new_body = fix_broken_rows(body)

    if new_body == body:
        return 0

    orig_lines = body.split("\n")
    new_lines = new_body.split("\n")
    collapsed = len(orig_lines) - len(new_lines)

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(frontmatter + new_body)

    filename = os.path.basename(filepath)
    prefix = "[DRY RUN] Would fix" if dry_run else "Fixed"
    print(f"{prefix} {filename} ({collapsed} lines collapsed)")
    return collapsed


def main():
    parser = argparse.ArgumentParser(
        description="Rejoin broken markdown table rows in AEM-sourced files"
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
    total_collapsed = 0

    for filepath in files:
        count = fix_file(filepath, dry_run=args.dry_run)
        if count > 0:
            total_files += 1
            total_collapsed += count

    print(f"Fixed {total_files} files, {total_collapsed} lines collapsed")


if __name__ == "__main__":
    main()
