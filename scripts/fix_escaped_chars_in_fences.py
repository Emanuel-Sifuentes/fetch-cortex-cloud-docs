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
        print("Usage: python fix_escaped_chars_in_fences.py <file>")
        sys.exit(1)

    path = Path(sys.argv[1])
    original = path.read_text(encoding="utf-8")
    fixed = fix_escapes_in_fences(original)

    if original == fixed:
        print("No changes needed.")
    else:
        path.write_text(fixed, encoding="utf-8")
        print(f"Fixed: {path}")


if __name__ == "__main__":
    main()
