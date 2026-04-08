"""Split combined markdown files into individual files based on H1 headings.

For each map, finds the combined file in sources_fetch/{map}/ and splits it
into sources_fetch/{map}/{map}_split_h1/. The combined file stays in place.
"""

import argparse
import re
from pathlib import Path


def slugify(title: str) -> str:
    """Convert an H1 title to a filename-safe slug."""
    slug = title.lower().strip()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[\s_]+", "-", slug)
    slug = re.sub(r"-+", "-", slug)
    return slug.strip("-")


def split_markdown_by_h1(content: str) -> list[tuple[str, str]]:
    """Split markdown content into sections by H1 headings.

    Ignores # characters inside fenced code blocks.
    Returns list of (title, section_content) tuples.
    """
    lines = content.split("\n")
    sections: list[tuple[str, str]] = []
    current_title = None
    current_lines: list[str] = []
    in_code_block = False

    for line in lines:
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code_block = not in_code_block

        if not in_code_block and re.match(r"^# ", line):
            if current_title is not None:
                sections.append((current_title, "\n".join(current_lines)))
            current_title = line[2:].strip()
            current_lines = [line]
        else:
            current_lines.append(line)

    if current_title is not None:
        sections.append((current_title, "\n".join(current_lines)))
    elif current_lines:
        sections.append(("untitled", "\n".join(current_lines)))

    return sections


def split_combined_file(combined_path: Path, output_dir: Path) -> list[str]:
    """Split a combined markdown file into individual files in output_dir.

    Returns list of created filenames.
    """
    content = combined_path.read_text(encoding="utf-8")
    sections = split_markdown_by_h1(content)
    output_dir.mkdir(parents=True, exist_ok=True)

    created_files = []
    seen_slugs: dict[str, int] = {}

    for title, section_content in sections:
        slug = slugify(title)
        if not slug:
            slug = "untitled"

        if slug in seen_slugs:
            seen_slugs[slug] += 1
            filename = f"{slug}-{seen_slugs[slug]}.md"
        else:
            seen_slugs[slug] = 1
            filename = f"{slug}.md"

        out_path = output_dir / filename
        out_path.write_text(section_content.rstrip("\n") + "\n", encoding="utf-8")
        created_files.append(filename)
        print(f"  {filename}")

    return created_files


COMBINED_FILES = {
    "appsec": "cortex-cloud-appsec-combined.md",
    "posture": "cortex-cloud-posture-combined.md",
    "runtime": "cortex-cloud-runtime-combined.md",
    "cortex_gateway": "cortex-gateway-combined.md",
    "xdr_5": "cortex-xdr-5-combined.md",
    "xdr_compatibility": "cortex-xdr-compatibility-combined.md",
    "xdr_agent_admin": "cortex-xdr-agent-admin-combined.md",
    "xsiam_3": "cortex-xsiam-3-combined.md",
    "agentix": "cortex-agentix-combined.md",
}

PRODUCTS = {
    "cloud": ["appsec", "posture", "runtime"],
    "xdr": ["xdr_5", "xdr_compatibility", "xdr_agent_admin"],
    "xsiam": ["xsiam_3"],
    "gateway": ["cortex_gateway"],
    "agentix": ["agentix"],
}


def main():
    parser = argparse.ArgumentParser(description="Split combined markdown files by H1 headings")
    parser.add_argument("--product", choices=list(PRODUCTS.keys()), help="Split only this product's maps")
    args = parser.parse_args()

    sources_dir = Path(__file__).resolve().parent.parent / "sources_fetch"

    if args.product:
        maps = PRODUCTS[args.product]
    else:
        maps = list(COMBINED_FILES.keys())

    for map_name in maps:
        combined_name = COMBINED_FILES[map_name]
        combined_path = sources_dir / map_name / combined_name
        if not combined_path.exists():
            print(f"Skipping {map_name} ({combined_name} not found)")
            continue

        output_dir = sources_dir / map_name / f"{map_name}_split_h1"
        print(f"\nSplitting {map_name}/{combined_name} -> {map_name}/{map_name}_split_h1/")
        created = split_combined_file(combined_path, output_dir)
        print(f"  Created {len(created)} files")


if __name__ == "__main__":
    main()
