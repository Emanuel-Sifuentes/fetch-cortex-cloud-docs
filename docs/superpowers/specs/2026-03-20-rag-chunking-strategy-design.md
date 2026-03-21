# RAG Document Chunking Strategy

**Date:** 2026-03-20
**Status:** Draft
**Depends on:** 2026-03-20-global-dedup-design.md (in progress), 2026-03-19-change-detection-design.md (implemented)

## Problem

The pipeline produces per-topic markdown files (with YAML frontmatter) across 8
documentation maps for 5 Palo Alto Networks Cortex products. These files range
from 200 bytes (stubs) to 76KB (dense reference pages). The target platform --
GCP Vertex AI RAG Engine -- requires chunks of at most 1024 tokens with 256-token
overlap. Most per-topic files exceed this limit and must be split into
semantically coherent chunks that preserve retrieval quality.

Corpus statistics (post global dedup):
- 48 H1-level documents across 8 maps
- ~6.8MB total markdown content
- Individual per-topic files: ~2,200 files ranging from 200B to 76KB
- Content types: procedural steps, reference tables, code examples, conceptual
  explanations, API documentation, XQL language reference

---

## 1. Universal Chunking Rules

These rules apply to ALL documents regardless of product line.

### 1.1 Input Format

Each per-topic file has YAML frontmatter followed by markdown content:

```
---
title: "Topic Title"
tocId: "abc123"
contentId: "def456"
prettyUrl: "/r/Product/Section/Topic"
depth: 2
---

## Heading

Content here...
```

The chunker operates on the markdown body (below the frontmatter fence). The
frontmatter is parsed separately and used to populate chunk metadata.

### 1.2 Heading Hierarchy as Primary Split Boundary

Split documents using the heading hierarchy as the primary structural signal:

1. Parse the document into a tree of sections, where each section is a heading
   plus all content until the next heading of equal or higher level.
2. Evaluate each section against the token budget (see Section 2).
3. If a section fits within the budget, emit it as a single chunk.
4. If a section exceeds the budget, recurse into its child headings.
5. If a leaf section (no child headings) still exceeds the budget, apply
   paragraph-level splitting (see Section 3).

### 1.3 Heading Breadcrumb Prefix

Every chunk MUST begin with a heading breadcrumb that reconstructs the full
section path from H1 down to the chunk's own heading level. This provides
critical context for retrieval.

Format:
```
# {H1 title}
## {H2 title}
### {H3 title}
```

Only include the headings in the ancestor chain -- do not repeat sibling or
cousin headings. The breadcrumb consumes tokens from the chunk budget (typically
20-60 tokens). Account for this when evaluating whether content fits.

### 1.4 No Orphaned Content

Content that appears before the first heading in a document (preamble/abstract
text) is attached to the first heading section as a prefix. Content must never
exist in a chunk without at least one heading for context.

### 1.5 Admonition Attachment

Admonitions (`**Note:**`, `**Important:**`, `**Warning:**`, `**Tip:**`,
`**Caution:**`) are attached to the paragraph or step that immediately precedes
them. They must not be split from their preceding context. If attaching an
admonition would push a chunk over budget, the admonition and its preceding
paragraph move together to the next chunk.

---

## 2. Chunk Size Policy

### 2.1 Token Budget

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Maximum chunk size | 1024 tokens | Vertex AI RAG Engine hard limit |
| Overlap window | 256 tokens | Platform configuration |
| Effective unique content | ~768 tokens | 1024 - 256 |
| Soft target | 512-900 tokens | Optimal retrieval density range |
| Minimum chunk size | 100 tokens | Below this, merge with adjacent chunk |
| Heading breadcrumb budget | 60 tokens reserved | Worst case: 4-level deep path |

### 2.2 Token Counting

Use a tokenizer aligned with the embedding model deployed in Vertex AI. For
planning purposes, use the following heuristics:

- **Prose text:** ~0.75 tokens per word, or ~4 characters per token
- **Markdown tables:** ~1.2x token inflation vs. equivalent prose (pipe chars,
  alignment dashes, repeated headers add overhead)
- **Code blocks:** ~1.0 tokens per word (variable names, operators count as
  separate tokens)
- **YAML/JSON:** ~1.3x token inflation (indentation, quotes, colons)

### 2.3 Table Density Adjustment

Report 5 identified that table-heavy documents (XSIAM, XDR) have 35-45
tokens/KB density vs. 60 tokens/KB for prose-heavy documents. This means a
1024-token chunk of table content spans more raw bytes but carries less semantic
density.

**Decision:** Do NOT reduce the max chunk size below 1024. Instead:
- Count tokens precisely (not by byte heuristic) for any chunk containing tables
- When a table alone exceeds 900 tokens, apply table splitting (see Section 4.4)
- The 256-token overlap naturally handles boundary context for split tables

---

## 3. Splitting Hierarchy (Decision Tree)

For each per-topic file, apply this decision tree top-down:

```
START: Parse frontmatter + markdown body
  |
  v
[1] Count tokens in entire body (excluding frontmatter)
  |
  +--( <= 1024 tokens )---> Emit as SINGLE CHUNK with frontmatter metadata
  |
  +--( > 1024 tokens )---> Continue to [2]
  |
  v
[2] Split body at H2 boundaries into sections
  |
  For each H2 section:
  |
  +--( <= 900 tokens with breadcrumb )---> Emit as chunk
  |
  +--( > 900 tokens )---> Continue to [3]
  |
  v
[3] Split H2 section at H3 boundaries
  |
  For each H3 section:
  |
  +--( <= 900 tokens with breadcrumb )---> Emit as chunk
  |
  +--( > 900 tokens )---> Continue to [4]
  |
  v
[4] Split H3 section at H4/H5/H6 boundaries
  |
  For each sub-section:
  |
  +--( <= 900 tokens with breadcrumb )---> Emit as chunk
  |
  +--( > 900 tokens )---> Continue to [5]
  |
  v
[5] LEAF SECTION: No further headings to split on.
    Apply paragraph-level splitting:
    |
    a. Identify atomic content units (see Section 4).
       Each atomic unit is indivisible.
    b. Greedily pack atomic units into chunks up to 900 tokens.
    c. When adding the next unit would exceed 900, emit current
       chunk and start a new one.
    d. Apply overlap: the last 256 tokens of the previous chunk
       are prepended to the new chunk (after the breadcrumb).
```

### 3.1 Soft Target of 900 Tokens (not 1024)

The splitting logic targets 900 tokens per chunk (not the hard max of 1024) to
provide buffer for:
- Heading breadcrumb prefix (up to 60 tokens)
- Overlap content from the previous chunk (up to 256 tokens added by Vertex AI,
  not by our chunker -- see Section 5)
- Minor token-counting variance between our tokenizer and Vertex AI's

### 3.2 Heading Level Anomalies

Some documents skip heading levels (e.g., H1 -> H5 with no H2/H3/H4). The
splitter must handle this gracefully:
- Treat any heading as a split boundary regardless of whether intermediate
  levels exist.
- In the breadcrumb, include only headings that actually appear in the ancestor
  chain. Do not fabricate missing intermediate headings.

---

## 4. Atomic Content Units

The following content structures must NEVER be split across chunk boundaries.
If an atomic unit exceeds 900 tokens on its own, it becomes a standalone chunk
(allowed to use the full 1024-token budget). If it exceeds 1024 tokens, apply
the type-specific overflow strategy noted below.

### 4.1 Numbered Procedure Steps

A numbered list (steps 1, 2, 3...) with all its nested sub-steps, notes, and
screenshots is atomic. Never split a procedure mid-step.

**Overflow (procedure > 1024 tokens):** Split between top-level numbered steps.
Each chunk gets the full procedure heading as breadcrumb plus a "(continued)"
suffix. Overlap window includes the last 1-2 completed steps for context.

Example boundary:
```
Good:  Split between Step 5 and Step 6
Bad:   Split between Step 5.a and Step 5.b
```

### 4.2 Tables

A table (header row + all data rows) is atomic. Never split a table's header
from its rows, and never split mid-row.

**Overflow (table > 1024 tokens):** Split the table into logical row groups.
Each chunk receives:
- The heading breadcrumb
- The table header row (repeated in every chunk)
- A contiguous group of data rows
- Overlap: header + last 3 rows of the previous chunk

**Logical grouping heuristics (in priority order):**
1. If rows have a categorical column (e.g., "Platform", "OS", "Category"),
   group by that column's values.
2. If rows are alphabetically ordered, split at natural letter boundaries.
3. Otherwise, split at the row boundary closest to 768 tokens.

### 4.3 Code Blocks

A fenced code block (``` ... ```) is atomic. Never split within a code block.

**Overflow (code block > 1024 tokens):** This is rare. If it occurs:
- Keep the code block intact as a standalone chunk using the full 1024 budget.
- If still too large, split at blank lines within the code block, ensuring each
  fragment is syntactically meaningful (e.g., complete function definitions,
  complete YAML documents separated by `---`).
- Each fragment chunk gets the language tag and a comment indicating it is a
  continuation.

### 4.4 Code Block + Explanation

A code block plus the 1-3 paragraphs immediately preceding it (the explanation
of what the code does) form an atomic unit. The explanation must not be separated
from its code block.

**Overflow:** If the explanation + code block together exceed 1024 tokens, the
explanation becomes the tail of one chunk and the code block becomes a standalone
chunk with a brief reference back to the explanation heading.

### 4.5 Admonition + Preceding Context

An admonition plus the paragraph or step it annotates is atomic. See Rule 1.5.

### 4.6 Definition Lists and Term-Description Pairs

A term and its description (whether using markdown definition list syntax or
bold-term-colon-description patterns) is atomic.

### 4.7 API Endpoint Blocks

An API endpoint definition including: HTTP method + path, parameter table,
request/response code examples, and description form an atomic unit.

**Overflow:** Split between distinct endpoints. Never split within a single
endpoint's definition.

### 4.8 XQL Operator/Function Definitions

An XQL operator or function name + its syntax + parameter table + example
queries form an atomic unit.

**Overflow:** Split between distinct operators/functions. Never split within a
single operator's definition.

---

## 5. Overlap Strategy

### 5.1 Platform-Managed vs. Chunker-Managed Overlap

GCP Vertex AI RAG Engine supports configurable chunk overlap at ingestion time.
There are two possible approaches:

**Option A -- Platform-managed overlap (RECOMMENDED):**
- The chunker emits non-overlapping chunks.
- Vertex AI RAG Engine is configured with `chunk_overlap = 256` tokens.
- The platform automatically prepends 256 tokens from the previous chunk to each
  chunk during indexing.
- Advantage: Simpler chunker logic. No duplicate content in stored chunks.

**Option B -- Chunker-managed overlap:**
- The chunker explicitly repeats the last 256 tokens of chunk N at the start of
  chunk N+1.
- Vertex AI is configured with `chunk_overlap = 0`.
- Advantage: Full control over overlap boundaries.

**Decision:** Use Option A (platform-managed overlap). The chunker targets 900
tokens of unique content per chunk, and Vertex AI adds the 256-token overlap
window automatically.

### 5.2 Overlap Boundary Quality

The 256-token overlap window works best when it captures complete semantic units.
To optimize overlap quality:

- Prefer splitting at paragraph boundaries rather than mid-sentence.
- When splitting a procedure, ensure the overlap captures at least the last
  complete step (not a partial step).
- When splitting a table, ensure the overlap captures the table header + last
  2-3 rows (not a partial row).

### 5.3 Cross-Section Overlap

Overlap ONLY applies between adjacent chunks within the same per-topic file.
There is NO overlap between:
- The last chunk of one per-topic file and the first chunk of the next.
- Chunks from different products.

---

## 6. Metadata Requirements

Each chunk carries structured metadata for filtering and retrieval context.

### 6.1 Required Fields

| Field | Source | Example | Purpose |
|-------|--------|---------|---------|
| `product` | Map config (`map_config.js`) | `"xdr_5"` | Filter retrieval by product |
| `product_family` | Map config (`PRODUCTS`) | `"xdr"` | Broader product grouping |
| `source_file` | Per-topic filename | `"0432-Set-up-malware-prevention-profiles.md"` | Traceability |
| `content_id` | Frontmatter `contentId` | `"abc123"` | Dedup key, source linking |
| `toc_id` | Frontmatter `tocId` | `"def456"` | TOC position reference |
| `title` | Frontmatter `title` | `"Set up malware prevention profiles"` | Display in citations |
| `url` | Frontmatter `prettyUrl` | `"/r/Cortex-XDR/..."` | Link back to source docs |
| `toc_depth` | Frontmatter `depth` | `3` | Hierarchy level in original TOC |
| `chunk_index` | Chunker-assigned | `2` | Position within the topic (0-based) |
| `chunk_count` | Chunker-assigned | `5` | Total chunks for this topic |
| `heading_path` | Chunker-extracted | `"Configure > Profiles > Malware"` | Section breadcrumb |
| `content_type` | Chunker-classified | `"procedural"` | Retrieval ranking signal |

### 6.2 Content Type Classification

Classify each chunk into one of these types based on its content:

| Type | Heuristic | Examples |
|------|-----------|---------|
| `conceptual` | Mostly prose paragraphs, no numbered steps | "What is Cortex XDR", feature overviews |
| `procedural` | Contains numbered steps (1. 2. 3.) | Onboarding guides, setup workflows |
| `reference` | Dominated by tables or definition lists | Permission tables, compatibility matrices |
| `api` | Contains HTTP methods, endpoint paths | API documentation |
| `code_example` | Dominated by code blocks | XQL queries, Terraform examples, YAML configs |
| `troubleshooting` | Contains "troubleshoot" in heading or problem/solution pattern | Troubleshooting sections |

A chunk may have a secondary type (e.g., `procedural` with `reference` tables),
but the primary type is determined by the dominant content pattern.

### 6.3 Metadata Storage

Metadata is stored as JSON alongside each chunk. The chunker outputs one JSONL
file per product, where each line is:

```json
{
  "id": "{content_id}_{chunk_index}",
  "content": "# Heading\n## Subheading\n\nChunk text here...",
  "metadata": {
    "product": "xdr_5",
    "product_family": "xdr",
    "source_file": "0432-Set-up-malware-prevention-profiles.md",
    "content_id": "abc123",
    "toc_id": "def456",
    "title": "Set up malware prevention profiles",
    "url": "/r/Cortex-XDR/Configure/Profiles/Set-up-malware-prevention-profiles",
    "toc_depth": 3,
    "chunk_index": 2,
    "chunk_count": 5,
    "heading_path": "Configure Cortex XDR > Endpoint Security Profiles > Set up malware prevention profiles",
    "content_type": "procedural"
  }
}
```

---

## 7. Special Cases

### 7.1 Stub Files (< 100 tokens)

Files with fewer than 100 tokens of body content (after frontmatter removal) are
classified as stubs. Examples: `cortex-agentix-xql.md` (197 bytes),
`api-documentation.md` (719 bytes).

**Handling:** Emit as a single chunk. Do NOT merge stubs with other files -- they
serve as topic anchors and their metadata (title, URL) is valuable for retrieval
even if the content is thin.

### 7.2 Small Files (100-1024 tokens)

Files that fit within a single chunk after adding the heading breadcrumb.
Examples: `cortex-cloud-application-security.md` (2.3KB),
`cortex-xdr-agent-compatibility.md` (3.1KB), `cloud-asm.md` (4KB).

**Handling:** Emit as a single chunk with all metadata. No splitting required.

### 7.3 Cross-File Deduplication

Global dedup (2026-03-20-global-dedup-design.md) handles deduplication at the
per-topic file level before chunking. The chunker does NOT perform any
cross-file deduplication. It trusts that its input files are already deduplicated.

If identical or near-identical content survives into the chunker's input (e.g.,
"Log forwarding" appearing in both onboard and troubleshoot files for Agentix),
this is an upstream dedup issue and should be resolved in the global dedup step,
not in the chunker.

### 7.4 Heading Level Anomalies

Some files jump heading levels (e.g., H1 directly to H5). The chunker:
- Treats each heading as a valid split boundary regardless of level.
- Builds the breadcrumb from the actual heading ancestors in the tree, not from
  the expected hierarchy.
- Logs a warning for any heading jump > 1 level (e.g., H2 -> H5) for upstream
  investigation.

### 7.5 Massive Per-Topic Files (> 50KB)

Six per-topic files exceed 50KB (76KB malware profiles, 76KB agent settings,
73KB Azure permissions, etc.). These will produce 15-25 chunks each.

**Handling:** No special treatment beyond the standard decision tree. The heading
hierarchy in these files provides sufficient split points. If a file this large
has fewer than 3 headings, fall back to paragraph-level splitting at step [5] of
the decision tree.

### 7.6 Windows ACS Support Directive (XDR Compatibility)

The `where-can-i-install-the-cortex-xdr-agent.md` file contains a Windows ACS
Support Directive that must be available when ANY Windows compatibility table is
retrieved.

**Handling:** Duplicate the directive text into every chunk that contains a
Windows-related table. Prefix the directive as a blockquote above the table
content. This costs ~30-50 tokens per affected chunk but ensures the directive
is always co-retrieved.

### 7.7 Platform-Prerequisite Injection

Some sections have prerequisites (Linux kernel/eBPF explanation) that must
precede distro-specific tables. Similarly, ASPM sections have context that must
precede platform-specific subsections.

**Handling:** When a parent section's introductory content (first 1-3 paragraphs
before the first child heading) is critical context for all child chunks, inject
that intro content into each child chunk as a preamble (after the breadcrumb,
before the child content). Budget 100-150 tokens for injected preamble.

---

## 8. Product-Specific Notes

### 8.1 Agentix (5 H1 files, ~124KB)

- `cortex-agentix-configuration.md` is 62% of content with 112 tables. Split at
  H2 then H3. The "Users and roles management" section (~2500 tokens) needs H3
  splitting into 3-4 chunks.
- Docker/Podman engine installation sections follow identical patterns. Each
  container runtime section (Docker install, Podman install, troubleshoot) is a
  natural chunk.
- Playbook development content (Tasks 1-6) should keep each Task as an atomic
  unit since they are sequential.

### 8.2 AppSec (7 H1 files, ~888KB)

- Three massive files dominate (ASPM 198KB, code-security 274KB,
  onboard-data-sources 336KB). These will produce the most chunks.
- `onboard-data-sources` is highly modular by VCS platform (AWS CodeCommit,
  Azure DevOps, Bitbucket, GitHub, GitLab). Each platform section is
  independent and should chunk separately.
- YAML/JSON code examples (50-100+ lines) are common. Apply code block atomic
  rules strictly.
- SCA support matrix is a large reference table -- keep intact as a standalone
  chunk if under 1024 tokens, otherwise apply table splitting.

### 8.3 Cortex Gateway + XDR Compatibility (3 H1 files, ~93KB)

- Permission tables in `cortex-gateway.md` are extensive. Each role's permission
  table + role description is an atomic unit.
- `where-can-i-install.md` should be chunked by OS platform (Linux, Mac,
  Windows, Virtual, Cloud, Kubernetes). Each platform group includes the
  platform intro + its compatibility table(s).
- Windows ACS directive injection applies here (see 7.6).

### 8.4 Posture (17 H1 files, ~457KB)

- 4 small files remain single chunks: `cloud-asm.md`,
  `cortex-cloud-application-security.md`, `discovery-engine.md`,
  `review-and-report-your-security-posture-and-progress.md`.
- `cloud-workload-policies-and-rules.md` (66KB) has H4-deep nesting with
  complex policy logic. Split at H3 level; individual policy rules with their
  conditions/actions are atomic.
- `data-sources.md` follows vendor-specific patterns (identical to AppSec
  onboard-data-sources). Chunk per vendor section.
- `identity-security.md` covers 4 capabilities (CIEM, ISPM, DAG, ITDR). Each
  capability with its dashboard widgets is a natural chunk boundary.

### 8.5 Runtime (7 H1 files, ~124KB) + XSIAM (3 H1 files, ~688KB)

- `configure-cortex-xsiam.md` (607KB, 829 tables, 86 code blocks) is the
  second-largest file in the corpus. Data Model Rules section (~150KB) needs
  field-group-based splitting.
- XSIAM deployment checklists contain single massive table rows (1500+ tokens
  each). These require table splitting at the row level, with header
  repetition.
- Runtime files have heading anomalies (H1 -> H5 jumps). The chunker must
  handle these gracefully per Rule 7.4.
- Token density is lower in XSIAM (~35-45 tokens/KB due to table density).
  Precise token counting is critical for these files.

### 8.6 XDR (6 H1 files, ~4.5MB -- LARGEST)

- `configure-cortex-xdr.md` (1.47MB, 2193 tables) and
  `detect-investigate-and-respond-to-threats.md` (1.38MB, 1734 tables) are
  the largest documents in the entire corpus.
- `reference-and-developer-docs.md` has 760 code blocks (highest code density).
  XQL operator/function definitions are atomic units (see 4.8).
- Vendor-specific sections (AWS, GCP, Azure) follow near-identical patterns.
  Each vendor section chunks independently.
- IAM permission JSON blocks MUST stay with their explanations (see 4.4).
- Okta/Azure AD setup workflows (7 tasks each) are sequential procedures. Each
  task is an atomic step but the workflow sequence should be preserved in
  chunk ordering.
- `onboard-cortex-xdr.md` has only 3 H2s but deep nesting below. Primary split
  at H3 (not H2) for this file.
- Action Center description + its 3 reference tables must stay together as one
  chunk (or split only between tables, not between description and tables).

---

## 9. Estimated Chunk Counts

Based on analyst estimates, adjusted for the unified strategy:

| Product | H1 Files | Total Size | Est. Chunks | Notes |
|---------|----------|-----------|-------------|-------|
| Agentix | 5 | ~124KB | 35-45 | configuration.md drives most chunks |
| AppSec | 7 | ~888KB | 90-120 | 3 massive files dominate |
| Gateway | 1 | ~70KB | 6-8 | Permission tables drive count |
| XDR Compat. | 2 | ~23KB | 9-12 | OS-platform table grouping |
| Posture | 17 | ~457KB | 55-75 | Many small files reduce per-file count |
| Runtime | 7 | ~124KB | 18-25 | Moderate size, text-heavy |
| XSIAM | 3 | ~688KB | 45-60 | Table density = more bytes per chunk |
| XDR | 6 | ~4.5MB | 130-170 | Largest by far; heavy table/code content |
| **Total** | **48** | **~6.9MB** | **388-515** | |

The wide range reflects uncertainty in table token density. Actual counts will
be known after implementing precise token counting.

---

## 10. Implementation Recommendations

### 10.1 Architecture

Build the chunker as a Python script (`scripts/chunk_for_rag.py`) that:

1. Reads per-topic markdown files from `sources_fetch/{map}/` (the numbered
   `0001-*.md` files, NOT the H1 split files or combined files).
2. Parses YAML frontmatter with `pyyaml` or `python-frontmatter`.
3. Parses markdown structure with a heading-aware parser (recommend
   `mistune` or a custom regex-based heading parser -- avoid full AST parsers
   that struggle with malformed markdown).
4. Applies the decision tree (Section 3) to produce chunks.
5. Writes JSONL output to `sources_fetch/{map}/{map}_chunks.jsonl`.
6. Reports statistics: chunks per file, min/max/avg tokens, overflow warnings.

### 10.2 Tokenizer Selection

Use `tiktoken` with the `cl100k_base` encoding (GPT-4/text-embedding-ada-002
tokenizer) as the default. If the Vertex AI embedding model uses a different
tokenizer, swap it. The critical requirement is that token counts match the
embedding model's tokenizer within 5%.

```
pip install tiktoken
```

### 10.3 Processing Order

Process products in this order (largest and most complex first, so edge cases
surface early):

1. **XDR** -- largest corpus, most structural variety, surfaces all edge cases
2. **XSIAM** -- second largest, table-heavy, tests table splitting
3. **AppSec** -- large files, tests code block handling
4. **Posture** -- many files, tests small-file handling
5. **Agentix** -- moderate, tests procedural chunking
6. **Runtime** -- moderate, tests heading anomaly handling
7. **Gateway** -- small, permission table focused
8. **XDR Compatibility** -- small, table focused

### 10.4 Validation Checks

The chunker must validate and report:

- **No chunk exceeds 1024 tokens.** Hard failure if violated.
- **No atomic unit is split.** Verify tables, code blocks, and procedures are
  intact within chunks.
- **All chunks have metadata.** Every required field (Section 6.1) is populated.
- **Breadcrumb consistency.** Every chunk starts with a valid heading breadcrumb.
- **Coverage.** The concatenation of all chunks for a file (minus overlap)
  reproduces the original file's content. No content is dropped.
- **Minimum size.** Warn on chunks below 100 tokens (except stubs).

### 10.5 Output for GCS Upload

The existing `scripts/upload_to_gcs.sh` uploads H1-split markdown files. Extend
it (or create a parallel script) to upload the JSONL chunk files:

```
gs://{bucket}/
  {product}_chunks.jsonl      # All chunks for the product
```

Alternatively, if Vertex AI RAG Engine prefers individual documents:

```
gs://{bucket}/
  {product}/
    {content_id}_{chunk_index}.md   # Individual chunk files
```

The choice depends on Vertex AI RAG Engine's import API. JSONL is preferred for
batch import; individual files are preferred if using the document-per-file
import mode.

### 10.6 Incremental Re-Chunking

Integrate with the change detection pipeline (2026-03-19-change-detection-design.md):

- When a per-topic file changes, re-chunk only that file.
- Emit the new chunks with the same `content_id` prefix so they replace (not
  duplicate) the previous chunks in the RAG corpus.
- When a file is deleted, emit a deletion marker for all its chunks.

### 10.7 Testing Strategy

Build tests at three levels:

1. **Unit tests** for atomic unit detection: given markdown input, verify that
   tables, code blocks, procedures, and admonitions are correctly identified
   as indivisible.
2. **Unit tests** for the decision tree: given a markdown file and token budget,
   verify the correct split points are chosen.
3. **Integration tests** against sample files from each product: verify chunk
   count, token limits, metadata completeness, and content coverage.

Use files from the actual corpus as test fixtures (copy 2-3 representative files
per product into a test fixtures directory).

### 10.8 Monitoring and Iteration

After initial ingestion into Vertex AI RAG Engine:

1. Run retrieval quality tests: issue known queries and verify that returned
   chunks contain the expected answer.
2. Track chunk utilization: identify chunks that are never retrieved (may
   indicate poor chunking or irrelevant content).
3. Track retrieval failures: queries where no relevant chunk is returned (may
   indicate content was split away from its context).
4. Iterate on chunk boundaries based on retrieval quality feedback.

---

## Appendix A: Markdown Structural Patterns by Content Type

| Pattern | Example Files | Split Strategy |
|---------|--------------|---------------|
| Vendor-parallel sections | onboard-data-sources.md, cortex-cloud-data-sources.md | Each vendor = independent chunk tree |
| Sequential procedures | onboard-cortex-xdr.md, onboard-cortex-agentix.md | Keep task sequences; split between tasks |
| Reference table collections | where-can-i-install.md, configure-cortex-xdr.md | Group by category; repeat headers |
| XQL language reference | reference-and-developer-docs.md, cortex-agentix-xql.md | Each operator/function = atomic chunk |
| API documentation | api-documentation.md, reference-and-developer-docs.md | Each endpoint = atomic chunk |
| Dashboard/UI walkthroughs | identity-security.md, application-security-dashboard.md | Each capability/widget = natural chunk |
| Policy/rule definitions | cloud-workload-policies-and-rules.md | Each rule with conditions/actions = atomic |
| Conceptual overviews | learn-about-cortex-xdr.md, learn-about-cortex-agentix.md | H2 sections, usually fit in single chunks |

## Appendix B: Regex Patterns for Atomic Unit Detection

```python
# Heading detection (outside code fences)
HEADING_RE = re.compile(r'^(#{1,6})\s+(.+)$', re.MULTILINE)

# Fenced code block boundaries
CODE_FENCE_RE = re.compile(r'^(`{3,}|~{3,})', re.MULTILINE)

# Numbered list item (top-level step)
NUMBERED_STEP_RE = re.compile(r'^\d+\.\s+', re.MULTILINE)

# Table row
TABLE_ROW_RE = re.compile(r'^\|.+\|$', re.MULTILINE)

# Table separator (header boundary)
TABLE_SEP_RE = re.compile(r'^\|[-:|]+\|$', re.MULTILINE)

# Admonition patterns
ADMONITION_RE = re.compile(
    r'^\*\*(Note|Important|Warning|Tip|Caution|Best Practice):\*\*',
    re.MULTILINE
)

# YAML frontmatter boundaries
FRONTMATTER_RE = re.compile(r'^---\s*$', re.MULTILINE)
```

## Appendix C: Example Chunk Output

Given a per-topic file `0432-Set-up-malware-prevention-profiles.md` with this
structure:

```
---
title: "Set up malware prevention profiles"
contentId: "abc123"
...
---

# Set up malware prevention profiles

Overview paragraph.

## Profile settings

Settings explanation paragraph.

| Setting | Description | Default |
|---------|-------------|---------|
| ... 20 rows ... |

## Create a profile

1. Navigate to Profiles > Malware Prevention.
2. Click **+ New Profile**.
3. Configure the following settings:
   - Name: Enter a descriptive name.
   - Platform: Select the target OS.
   **Note:** Profile names must be unique.
4. Click **Save**.

## Advanced options

### WildFire analysis

WildFire explanation paragraph.

```yaml
profile:
  wildfire:
    enabled: true
    cloud: public
```

### Local analysis

Local analysis paragraph with table.
```

The chunker would produce:

- **Chunk 0:** H1 heading + overview paragraph + "Profile settings" heading +
  explanation + settings table (~400 tokens)
- **Chunk 1:** Breadcrumb (H1) + "Create a profile" procedure with all steps
  and note (~350 tokens)
- **Chunk 2:** Breadcrumb (H1) + "Advanced options" > "WildFire analysis" +
  explanation + YAML code block (~250 tokens)
- **Chunk 3:** Breadcrumb (H1) + "Advanced options" > "Local analysis" +
  paragraph + table (~200 tokens)

Chunks 2 and 3 could optionally be merged (combined ~450 tokens, well within
budget) since they share the same H2 parent and are both small.

### Small Chunk Merging Rule

When consecutive chunks under the same parent heading are each below 300 tokens,
merge them into a single chunk (up to the 900-token soft target). This reduces
total chunk count and improves retrieval coherence for short sections.
