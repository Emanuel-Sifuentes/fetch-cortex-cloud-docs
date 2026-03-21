# RAG Pre-Segmentation Script Design

**Date:** 2026-03-20
**Status:** Draft
**Depends on:** Combined markdown files (`sources_fetch/{map}/cortex-*-combined.md`)

## Problem

The combined markdown files (8 files, 200B to 4.5MB) need to be pre-segmented
into smaller, semantically coherent pieces before feeding to GCP Vertex AI RAG
Engine. RAG Engine handles final chunking (1024 tokens + 256 overlap) and
embedding, but its built-in chunker is a naive text splitter that doesn't
understand markdown structure. Feeding it multi-megabyte files results in chunks
that split mid-table, mid-code-block, or mid-procedure.

**Goal:** Produce segments of ~4-8KB (~1,000-2,000 tokens) that respect document
structure, so RAG Engine's naive splitter produces 1-3 clean chunks per segment.

## Approach

AST-based recursive heading splitter using `mistune` v3. Parse the combined
markdown into an AST to detect structure (headings, tables, code blocks, lists),
then use the AST to identify split points in the original raw text. Segments are
sliced from the original markdown string by character offset — no AST-to-markdown
rendering needed. This guarantees zero formatting drift.

The AST is used for **structure detection only**, not for rendering.

## Input / Output

### Input

Combined markdown files from `sources_fetch/{map}/cortex-*-combined.md` (8
files). These have the correct post-processed heading hierarchy matching the TOC.
All files begin with an H1 heading on line 1 (no preamble content above H1).

### Output

Individual segment files in `sources_fetch/{map}/{map}_segments/`:

```
sources_fetch/xdr_5/xdr_5_segments/
  segment-001-learn-about-cortex-xdr.md
  segment-002-what-is-cortex-xdr.md
  segment-003-cortex-xdr-architecture.md
  ...
```

Zero-padded index for sort order, slug from the deepest heading in the segment's
breadcrumb path. The index alone guarantees uniqueness — the slug is for human
readability only (duplicate slugs like "overview" are fine because the index
differentiates them).

The output directory is cleared (`shutil.rmtree`) before each run to prevent
stale segments from previous runs with different parameters.

All file I/O uses `encoding="utf-8"`.

### CLI Interface

```bash
python scripts/segment_combined.py                    # all maps
python scripts/segment_combined.py --product xdr      # just xdr maps
python scripts/segment_combined.py --max-size 8000    # override target (chars)
```

The `--product` flag accepts the same keys as the `PRODUCTS` dict (`cloud`,
`xdr`, `xsiam`, `gateway`, `agentix`) and uses `argparse` with
`choices=list(PRODUCTS.keys())` for validation, matching the existing
`split_combined.py` pattern.

`DEFAULT_MAX_SIZE = 8000` is defined as a single constant and referenced
throughout the script.

Mirrors the existing `split_combined.py` pattern. Reuses `COMBINED_FILES` and
`PRODUCTS` mappings (duplicated from `map_config.js` as Python constants, same
as `split_combined.py`).

## AST Parsing & Structure Detection

### Parser

`mistune` v3 parses the combined markdown into an AST. The table plugin must be
explicitly enabled:

```python
import mistune
md = mistune.create_markdown(renderer='ast', plugins=['table'])
ast_nodes = md(raw_text)
```

### Correct AST Node Type Names

Mistune v3 uses these type strings (not the generic names):

| Mistune v3 Type | Spec Reference |
|-----------------|----------------|
| `heading` | Heading nodes |
| `table` | Table nodes (requires `plugins=['table']`) |
| `block_code` | Fenced code blocks |
| `list` | Ordered and unordered lists |
| `paragraph` | Paragraph nodes |
| `block_quote` | Blockquote nodes |

### Heading Tree Construction

Walk the flat AST node list and build a tree where each heading node owns all
content until the next heading of equal or higher level:

```
HeadingSection
  level: int (1-6)
  title: str (heading text)
  start_offset: int (char offset of heading line in raw text)
  end_offset: int (char offset of next section start, or EOF)
  children: list[HeadingSection]
  breadcrumb: list[str] (ancestor titles only, NOT including own title)
```

Each `HeadingSection` tracks its start and end character offsets in the original
raw text. This allows slicing the original string to produce segments without any
AST-to-markdown rendering.

### Offset Tracking

To map AST nodes to character offsets in the raw text, the script scans the raw
markdown line by line (outside code fences) to locate heading positions. This is
the same approach used by `split_combined.py` (line-by-line scan with
`in_code_block` tracking). The AST is used to identify node types for atomic
unit detection; offsets come from direct text scanning.

Offsets are Python `str` indices (character positions, not byte positions),
computed by accumulating `len(line) + 1` per line (accounting for `\n`). Files
are read in text mode with `encoding="utf-8"`, so Python normalizes line endings
automatically.

### Preamble Handling

If content appears above the first heading, it is attached as part of the first
`HeadingSection`'s offset range. In current data, all files begin with an H1 on
line 1, so this is defensive handling only.

## Breadcrumb

Every emitted segment starts with a breadcrumb line as its first line:

```markdown
> Cortex XDR > Configure Cortex XDR > Broker VM > AWS Setup

### AWS Setup

Actual content here...
```

The breadcrumb is built from `HeadingSection.breadcrumb` — the chain of ancestor
titles. The root element is the product's display name (derived from the map
name). The segment's own heading is rendered normally (with its `#` level) after
the breadcrumb.

Breadcrumbs may be long for deeply nested content (up to 6 levels in xdr_5).
No truncation is applied — full breadcrumbs are acceptable and improve retrieval
context.

### Product Display Names

| Map Key | Display Name |
|---------|-------------|
| `agentix` | Cortex AgentiX |
| `appsec` | Cortex Cloud Application Security |
| `cortex_gateway` | Cortex Gateway |
| `posture` | Cortex Cloud Posture Management |
| `runtime` | Cortex Cloud Runtime Security |
| `xdr_5` | Cortex XDR |
| `xdr_compatibility` | Cortex XDR Compatibility |
| `xsiam_3` | Cortex XSIAM |

## Recursive Splitting Logic

### Decision Tree

```
emit_segments(section, max_size=DEFAULT_MAX_SIZE):

    total_size = section.end_offset - section.start_offset

    if total_size <= max_size:
        emit entire section as one segment (with breadcrumb)
        return

    # Section too large — emit own content, recurse into children
    own_content_size = (first child start_offset - section.start_offset)
        if children exist, else total_size

    if own_content_size > 0 and children exist:
        if own_content_size < 500:
            # Prepend to first child (see Small Content Merging)
        else:
            emit own content as a segment (with breadcrumb)

    for child in section.children:
        emit_segments(child, max_size)

    # Childless leaf section still over max_size
    if no children and total_size > max_size:
        apply paragraph-level greedy packing (see below)
```

### Small Content Merging

If a section's own content (before the first child heading) is under 500 chars
(roughly 1-2 paragraphs, too small to be a useful retrieval unit), it gets
prepended to the first child's segment rather than emitted standalone. This
avoids tiny orphaned segments like a 2-line abstract.

### Small Sibling Merging

After recursing, if consecutive sibling segments are each under 2,000 chars and
share the same parent, they get merged (up to the `DEFAULT_MAX_SIZE` target).
The merged segment uses the breadcrumb of the first sibling. All sibling
headings appear naturally in the body since we slice the original text. This
reduces segment count for sections with many small subsections.

## Atomic Unit Protection (Leaf Splitting)

Applies only when a leaf section (no child headings) exceeds `DEFAULT_MAX_SIZE`.

### Greedy Packing Algorithm

```
pack_leaf(raw_text_slice, ast_nodes_in_range, max_size=DEFAULT_MAX_SIZE):

    current_units = []
    current_size = 0

    for unit in identify_atomic_units(raw_text_slice, ast_nodes_in_range):
        unit_size = len(unit.text)

        if current_size + unit_size > max_size and current_units is not empty:
            emit current_units as segment (with breadcrumb)
            current_units = []
            current_size = 0

        current_units.append(unit)
        current_size += unit_size

    emit remaining current_units
```

Continuation segments after the first use the same breadcrumb. The heading is
included only in the first segment of the leaf split.

### Atomic Unit Identification

The AST identifies node boundaries; the raw text between those boundaries is
the unit text. Detection uses AST node types from `mistune` v3:

| AST Node Type (`mistune` v3) | Atomic Unit Rule |
|---|---|
| `table` | Entire table is one unit |
| `block_code` | Entire code block is one unit. If preceded by a `paragraph`, the paragraph + code block together form one unit |
| `list` (ordered, i.e. `attrs.ordered == True`) | Entire numbered list is one unit |
| `paragraph` containing admonition pattern (`**Note:**`, `**Warning:**`, `**Important:**`, `**Tip:**`, `**Caution:**` at start of text) | The admonition paragraph is grouped with the preceding paragraph (the context it annotates) as one unit. Rationale: admonitions in the combined files appear as annotations on the preceding content, not standalone blocks. Current files use inline bold for admonitions, not blockquote syntax. |
| `paragraph` | Standalone unit (the splittable type) |
| Everything else | Standalone unit |

### Overflow

If a single atomic unit exceeds `DEFAULT_MAX_SIZE` on its own (e.g., a massive
table), it gets emitted as its own segment regardless of size. RAG Engine
handles splitting it further.

## Dependencies

- `mistune` v3 (`pip install mistune`)
- Python 3.10+ (match existing scripts)
- No other external dependencies

## File Structure

```
scripts/
  segment_combined.py          # main script
  test_segment_combined.py     # tests
```

### Test Scenarios

Required test coverage:

1. Single section under max_size emits one segment with breadcrumb
2. Large section splits at H2, then H3, then H4 boundaries
3. Leaf section over max_size triggers greedy packing with atomic units
4. Tables, code blocks, and numbered lists are never split
5. Small content (<500 chars) merges into first child
6. Small siblings (<2000 chars each) merge up to max_size
7. Oversized atomic unit emits as standalone segment
8. Breadcrumb depth works correctly for H1 through H6
9. Code fences are not mistaken for headings

## Statistics Output

The script prints a summary after processing:

```
agentix: 18 segments (avg 3,200 chars, max 7,800 chars)
appsec: 95 segments (avg 4,100 chars, max 8,000 chars)
...
Total: 420 segments across 8 maps
Oversized segments (>8000 chars): 3 (all single atomic units)
```

## Integration with Upload

The existing `upload_to_gcs.sh` uploads from `{map}_split_h1/`. If segments
replace H1 splits for RAG ingestion, the upload script needs a parallel path
for `{map}_segments/`. This is out of scope for the segmentation script itself
but noted as a follow-up.
