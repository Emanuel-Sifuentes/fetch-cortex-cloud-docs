"""Split combined markdown files into individual files based on H1 headings.

Creates appsec/, posture/, and runtime/ subdirectories inside sources_fetch/,
moves each combined file into its folder, then splits it into one file per H1 section.
"""

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


def main():
    sources_dir = Path(__file__).resolve().parent.parent / "sources_fetch"

    file_folder_map = {
        "cortex-cloud-appsec-combined.md": "appsec",
        "cortex-cloud-posture-combined.md": "posture",
        "cortex-cloud-runtime-combined.md": "runtime",
    }

    for combined_name, folder_name in file_folder_map.items():
        combined_path = sources_dir / combined_name
        if not combined_path.exists():
            print(f"Skipping {combined_name} (not found)")
            continue

        output_dir = sources_dir / folder_name
        print(f"\nSplitting {combined_name} -> {folder_name}/")
        created = split_combined_file(combined_path, output_dir)
        print(f"  Created {len(created)} files")

        # Move the combined file into the folder
        dest = output_dir / combined_name
        combined_path.rename(dest)
        print(f"  Moved {combined_name} -> {folder_name}/{combined_name}")


if __name__ == "__main__":
    main()
