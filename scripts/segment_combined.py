"""Pre-segment combined markdown files for RAG Engine ingestion.

Splits combined files into ~4-8KB semantically coherent segments that respect
markdown structure (headings, tables, code blocks, lists). Each segment is
prepended with a breadcrumb for retrieval context.
"""

import argparse
import re
import shutil
from dataclasses import dataclass, field
from pathlib import Path

import mistune


DEFAULT_MAX_SIZE = 8000

COMBINED_FILES = {
    "appsec": "cortex-cloud-appsec-combined.md",
    "posture": "cortex-cloud-posture-combined.md",
    "runtime": "cortex-cloud-runtime-combined.md",
    "cortex_gateway": "cortex-gateway-combined.md",
    "xdr_5": "cortex-xdr-5-combined.md",
    "xdr_compatibility": "cortex-xdr-compatibility-combined.md",
    "xsiam_3": "cortex-xsiam-3-combined.md",
    "agentix": "cortex-agentix-combined.md",
}

PRODUCTS = {
    "cloud": ["appsec", "posture", "runtime"],
    "xdr": ["xdr_5", "xdr_compatibility"],
    "xsiam": ["xsiam_3"],
    "gateway": ["cortex_gateway"],
    "agentix": ["agentix"],
}

DISPLAY_NAMES = {
    "agentix": "Cortex AgentiX",
    "appsec": "Cortex Cloud Application Security",
    "cortex_gateway": "Cortex Gateway",
    "posture": "Cortex Cloud Posture Management",
    "runtime": "Cortex Cloud Runtime Security",
    "xdr_5": "Cortex XDR",
    "xdr_compatibility": "Cortex XDR Compatibility",
    "xsiam_3": "Cortex XSIAM",
}


@dataclass
class HeadingSection:
    level: int
    title: str
    start_offset: int
    end_offset: int
    children: list["HeadingSection"] = field(default_factory=list)
    breadcrumb: list[str] = field(default_factory=list)


@dataclass
class Segment:
    text: str
    title: str


def slugify(title: str) -> str:
    slug = title.lower().strip()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[\s_]+", "-", slug)
    slug = re.sub(r"-+", "-", slug)
    return slug.strip("-")


def scan_heading_offsets(raw_text: str) -> list[tuple[int, str, int]]:
    headings = []
    offset = 0
    in_code_block = False

    for line in raw_text.split("\n"):
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code_block = not in_code_block

        if not in_code_block:
            match = re.match(r"^(#{1,6}) (.+)$", line)
            if match:
                level = len(match.group(1))
                title = match.group(2).strip()
                headings.append((level, title, offset))

        offset += len(line) + 1

    return headings


def build_heading_tree(
    headings: list[tuple[int, str, int]], text_length: int
) -> list[HeadingSection]:
    if not headings:
        return []

    sections = []
    for i, (level, title, start_offset) in enumerate(headings):
        end_offset = headings[i + 1][2] if i + 1 < len(headings) else text_length
        sections.append(
            HeadingSection(
                level=level,
                title=title,
                start_offset=start_offset,
                end_offset=end_offset,
            )
        )

    root_sections: list[HeadingSection] = []
    stack: list[HeadingSection] = []

    for section in sections:
        while stack and stack[-1].level >= section.level:
            stack.pop()

        if stack:
            parent = stack[-1]
            parent.children.append(section)
            section.breadcrumb = parent.breadcrumb + [parent.title]
        else:
            root_sections.append(section)

        stack.append(section)

    _fix_end_offsets(root_sections)
    return root_sections


def _fix_end_offsets(sections: list[HeadingSection]) -> None:
    for section in sections:
        if section.children:
            _fix_end_offsets(section.children)
            section.end_offset = max(
                section.end_offset, section.children[-1].end_offset
            )


def format_breadcrumb(display_name: str, breadcrumb: list[str], title: str) -> str:
    parts = [display_name] + breadcrumb + [title]
    return "> " + " > ".join(parts)


def _scan_raw_blocks(text: str) -> list[str]:
    blocks: list[str] = []
    current_lines: list[str] = []
    in_code_fence = False

    for line in text.split("\n"):
        stripped = line.strip()

        if stripped.startswith("```"):
            if in_code_fence:
                current_lines.append(line)
                in_code_fence = False
                continue
            else:
                in_code_fence = True
                if not current_lines:
                    current_lines = []
                current_lines.append(line)
                continue

        if in_code_fence:
            current_lines.append(line)
            continue

        if stripped == "":
            if current_lines:
                blocks.append("\n".join(current_lines))
                current_lines = []
            continue

        current_lines.append(line)

    if current_lines:
        blocks.append("\n".join(current_lines))

    return blocks


def _classify_block_ast(ast_node: dict) -> str:
    return ast_node.get("type", "paragraph")


def _is_admonition(text: str) -> bool:
    stripped = text.strip()
    for prefix in ("**Note:**", "**Warning:**", "**Important:**", "**Tip:**", "**Caution:**"):
        if stripped.startswith(prefix):
            return True
    return False


def identify_atomic_units(body_text: str) -> list[str]:
    raw_blocks = _scan_raw_blocks(body_text)
    if not raw_blocks:
        return []

    md = mistune.create_markdown(renderer="ast", plugins=["table"])
    ast_nodes = md(body_text)
    block_ast_nodes = [n for n in ast_nodes if n.get("type") != "blank_line"]

    # Classify each raw block using AST where possible
    block_types: list[str] = []
    for i, block in enumerate(raw_blocks):
        if i < len(block_ast_nodes):
            block_types.append(_classify_block_ast(block_ast_nodes[i]))
        else:
            # Fallback: classify by content
            stripped = block.strip()
            if stripped.startswith("```"):
                block_types.append("block_code")
            elif stripped.startswith("|"):
                block_types.append("table")
            elif re.match(r"^\d+\.", stripped):
                block_types.append("list")
            else:
                block_types.append("paragraph")

    # Apply grouping rules
    units: list[str] = []
    i = 0
    while i < len(raw_blocks):
        block = raw_blocks[i]
        block_type = block_types[i]

        # Check if next block should be grouped with this one
        if i + 1 < len(raw_blocks):
            next_type = block_types[i + 1]
            next_block = raw_blocks[i + 1]

            # Code block preceded by paragraph → group together
            if block_type == "paragraph" and next_type == "block_code":
                units.append(block + "\n\n" + next_block)
                i += 2
                continue

            # Admonition paragraph preceded by paragraph → group together
            if block_type == "paragraph" and next_type == "paragraph" and _is_admonition(next_block):
                units.append(block + "\n\n" + next_block)
                i += 2
                continue

        units.append(block)
        i += 1

    return units


def pack_leaf(
    section: HeadingSection,
    raw_text: str,
    max_size: int,
    display_name: str,
) -> list[Segment]:
    section_text = raw_text[section.start_offset : section.end_offset]
    breadcrumb = format_breadcrumb(display_name, section.breadcrumb, section.title)

    # Separate heading from body
    heading_match = re.match(r"(#{1,6} .+\n)", section_text)
    if heading_match:
        heading_text = heading_match.group(1).rstrip("\n")
        body_start = heading_match.end()
        body_text = section_text[body_start:].lstrip("\n")
    else:
        heading_text = ""
        body_text = section_text

    units = identify_atomic_units(body_text)

    if not units:
        return [Segment(text=breadcrumb + "\n\n" + section_text.strip(), title=section.title)]

    segments: list[Segment] = []
    current_units: list[str] = []
    current_size = 0

    for unit in units:
        unit_size = len(unit)

        if current_size + unit_size > max_size and current_units:
            chunk_text = "\n\n".join(current_units)
            if not segments:
                chunk_text = heading_text + "\n\n" + chunk_text
            segments.append(
                Segment(text=breadcrumb + "\n\n" + chunk_text.strip(), title=section.title)
            )
            current_units = []
            current_size = 0

        current_units.append(unit)
        current_size += unit_size

    if current_units:
        chunk_text = "\n\n".join(current_units)
        if not segments:
            chunk_text = heading_text + "\n\n" + chunk_text
        segments.append(
            Segment(text=breadcrumb + "\n\n" + chunk_text.strip(), title=section.title)
        )

    return segments


SMALL_SIBLING_THRESHOLD = 2000


def merge_small_siblings(segments: list[Segment], max_size: int) -> list[Segment]:
    if len(segments) <= 1:
        return segments

    merged: list[Segment] = []
    current = segments[0]

    for next_seg in segments[1:]:
        current_is_small = len(current.text) < SMALL_SIBLING_THRESHOLD
        next_is_small = len(next_seg.text) < SMALL_SIBLING_THRESHOLD
        combined_size = len(current.text) + len(next_seg.text)

        if current_is_small and next_is_small and combined_size <= max_size:
            # Extract body from next segment (strip its breadcrumb line)
            next_lines = next_seg.text.split("\n", 1)
            next_body = next_lines[1] if len(next_lines) > 1 else ""
            current = Segment(
                text=current.text + "\n" + next_body,
                title=current.title,
            )
        else:
            merged.append(current)
            current = next_seg

    merged.append(current)
    return merged


def emit_segments(
    section: HeadingSection,
    raw_text: str,
    max_size: int,
    display_name: str,
) -> list[Segment]:
    total_size = section.end_offset - section.start_offset

    if total_size <= max_size:
        section_text = raw_text[section.start_offset : section.end_offset].strip()
        breadcrumb = format_breadcrumb(display_name, section.breadcrumb, section.title)
        return [Segment(text=breadcrumb + "\n\n" + section_text, title=section.title)]

    if not section.children:
        return pack_leaf(section, raw_text, max_size, display_name)

    segments: list[Segment] = []

    # Own content: text between section start and first child start
    own_start = section.start_offset
    own_end = section.children[0].start_offset
    own_size = own_end - own_start
    prepend_text = ""

    if own_size > 0:
        if own_size < 500:
            prepend_text = raw_text[own_start:own_end].strip()
        else:
            own_text = raw_text[own_start:own_end].strip()
            breadcrumb = format_breadcrumb(display_name, section.breadcrumb, section.title)
            segments.append(Segment(text=breadcrumb + "\n\n" + own_text, title=section.title))

    # Recurse into children
    for i, child in enumerate(section.children):
        child_segments = emit_segments(child, raw_text, max_size, display_name)
        if i == 0 and prepend_text and child_segments:
            first = child_segments[0]
            breadcrumb_line = format_breadcrumb(
                display_name, child.breadcrumb, child.title
            )
            body = first.text[len(breadcrumb_line) + 2 :]  # strip breadcrumb + \n\n
            child_segments[0] = Segment(
                text=breadcrumb_line + "\n\n" + prepend_text + "\n\n" + body,
                title=first.title,
            )
        segments.extend(child_segments)

    segments = merge_small_siblings(segments, max_size)
    return segments


def segment_combined_file(
    combined_path: Path, output_dir: Path, map_name: str, max_size: int
) -> dict:
    raw_text = combined_path.read_text(encoding="utf-8")
    display_name = DISPLAY_NAMES[map_name]

    headings = scan_heading_offsets(raw_text)
    tree = build_heading_tree(headings, len(raw_text))

    segments: list[Segment] = []
    for root_section in tree:
        segments.extend(emit_segments(root_section, raw_text, max_size, display_name))

    # Clear and recreate output directory
    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Write segments
    sizes: list[int] = []
    for i, segment in enumerate(segments, 1):
        slug = slugify(segment.title)
        filename = f"segment-{i:03d}-{slug}.md"
        (output_dir / filename).write_text(segment.text, encoding="utf-8")
        sizes.append(len(segment.text))

    oversized = sum(1 for s in sizes if s > max_size)

    return {
        "count": len(segments),
        "avg_size": sum(sizes) // len(sizes) if sizes else 0,
        "max_size": max(sizes) if sizes else 0,
        "oversized": oversized,
    }


def main():
    parser = argparse.ArgumentParser(
        description="Pre-segment combined markdown files for RAG Engine ingestion"
    )
    parser.add_argument(
        "--product",
        choices=list(PRODUCTS.keys()),
        help="Segment only this product's maps",
    )
    parser.add_argument(
        "--max-size",
        type=int,
        default=DEFAULT_MAX_SIZE,
        help=f"Target max segment size in chars (default: {DEFAULT_MAX_SIZE})",
    )
    args = parser.parse_args()

    sources_dir = Path(__file__).resolve().parent.parent / "sources_fetch"

    if args.product:
        maps = PRODUCTS[args.product]
    else:
        maps = list(COMBINED_FILES.keys())

    total_segments = 0
    total_oversized = 0
    map_count = 0

    for map_name in maps:
        combined_name = COMBINED_FILES[map_name]
        combined_path = sources_dir / map_name / combined_name
        if not combined_path.exists():
            print(f"Skipping {map_name} ({combined_name} not found)")
            continue

        output_dir = sources_dir / map_name / f"{map_name}_segments"
        stats = segment_combined_file(combined_path, output_dir, map_name, args.max_size)

        print(
            f"{map_name}: {stats['count']} segments "
            f"(avg {stats['avg_size']:,} chars, max {stats['max_size']:,} chars)"
        )
        total_segments += stats["count"]
        total_oversized += stats["oversized"]
        map_count += 1

    print(f"\nTotal: {total_segments} segments across {map_count} maps")
    if total_oversized:
        print(f"Oversized segments (>{args.max_size} chars): {total_oversized} (all single atomic units)")


if __name__ == "__main__":
    main()
