"""Pre-segment combined markdown files for RAG Engine ingestion.

Splits combined files into ~4-8KB semantically coherent segments that respect
markdown structure (headings, tables, code blocks, lists). Each segment is
prepended with a breadcrumb for retrieval context.
"""

import re
from dataclasses import dataclass, field


DEFAULT_MAX_SIZE = 8000


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
