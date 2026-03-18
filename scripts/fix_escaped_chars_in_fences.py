"""Fix escaped markdown-special characters inside fenced code blocks.

Turndown escaped \\_, \\#, \\[, \\] globally, including inside fenced code
blocks where they should remain literal.  This script unescapes only
inside fenced code blocks (delimited by lines starting with ```).
"""

import sys
from pathlib import Path


def fix_escapes_in_fences(text: str) -> str:
    lines = text.split("\n")
    result = []
    inside_fence = False

    for line in lines:
        if line.lstrip().startswith("```"):
            inside_fence = not inside_fence
            result.append(line)
            continue

        if inside_fence:
            line = line.replace("\\_", "_")
            line = line.replace("\\#", "#")
            line = line.replace("\\[", "[")
            line = line.replace("\\]", "]")

        result.append(line)

    return "\n".join(result)


def main():
    if len(sys.argv) < 2:
        print("Usage: python fix_escaped_chars_in_fences.py <file_or_dir>")
        sys.exit(1)

    path = Path(sys.argv[1])
    targets = sorted(path.glob("*.md")) if path.is_dir() else [path]
    fixed_count = 0

    for target in targets:
        original = target.read_text(encoding="utf-8")
        fixed = fix_escapes_in_fences(original)
        if original != fixed:
            target.write_text(fixed, encoding="utf-8")
            print(f"Fixed: {target}")
            fixed_count += 1

    if fixed_count == 0:
        print("No changes needed.")
    else:
        print(f"Fixed {fixed_count} file(s).")


if __name__ == "__main__":
    main()
