# fetch-cortex-docs

Fetch Cortex documentation from the Palo Alto Networks [Fluid Topics](https://docs-cortex.paloaltonetworks.com) portal and [Stoplight](https://cortex-panw.stoplight.io) API specs, and convert to clean Markdown.

## Products

| Product | Command | Maps | Source |
|---------|---------|------|--------|
| Cortex Cloud | `npm run fetch:cortex:cloud` | appsec, posture, runtime | [Cortex Cloud](https://docs-cortex.paloaltonetworks.com/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Cortex-Cloud-Application-Security) |
| Cortex XDR | `npm run fetch:cortex:xdr` | xdr_5, xdr_compatibility, xdr_agent_admin | [XDR 5.x](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/Cortex-XDR-5.x-Documentation), [Compatibility Matrix](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/Cortex-XDR-Compatibility-Matrix/), [Agent Admin Guide](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/9.1/Cortex-XDR-Agent-Administrator-Guide) |
| Cortex XSIAM | `npm run fetch:cortex:xsiam` | xsiam_3 | [XSIAM 3.x](https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM/Cortex-XSIAM-3.x-Documentation/) |
| Cortex Gateway | `npm run fetch:cortex:gateway` | cortex_gateway | [Gateway Admin Guide](https://docs-cortex.paloaltonetworks.com/r/Cortex/Cortex-Gateway-Administrator-Guide/) |
| Cortex AgentiX | `npm run fetch:cortex:agentix` | agentix | [AgentiX](https://docs-cortex.paloaltonetworks.com/r/Cortex-AgentiX/Cortex-AgentiX-Documentation/) |
| Koi | _(no fetch command — docs sourced externally)_ | koi | External (GitBook) |

### API specs (Stoplight)

| Product | Command | Output dir | Source |
|---------|---------|------------|--------|
| Cortex Cloud | `npm run fetch-api:cloud` | `api_specs_cloud/` | [Stoplight](https://cortex-panw.stoplight.io) |

`npm run fetch-api` fetches all configured Stoplight projects. Use `--force` to bypass change detection and re-fetch everything.

## Quick start

```bash
npm install              # install dependencies
npm run fetch:cortex     # fetch all Cortex products → sources_fetch/{product}/
npm run fetch-api        # fetch API specs → sources_fetch/api_specs_{product}/
npm run fix:cortex       # apply all post-fetch fixes + generate combined files
```

To target a single product:

```bash
npm run fetch:cortex:cloud      # fetch only Cortex Cloud maps
npm run fix:cortex:cloud        # fix + combine only Cortex Cloud
```

## What it does

1. Fetches the TOC tree from the Fluid Topics API (`/api/khub/maps/{mapId}/toc`)
2. Downloads each topic's HTML content (5 concurrent, 200ms rate-limit delay)
3. Converts HTML to Markdown via [Turndown](https://github.com/mixmark-io/turndown) with GFM plugin
4. Applies post-processing: heading normalization, table fixes, admonition conversion, base64 image stripping
5. Writes numbered individual files to `sources_fetch/{product}/`
6. Post-fetch fix scripts clean up remaining conversion artifacts
7. Generates a combined file per map with hierarchical headings (driven by the live TOC API)

Cortex Cloud maps (appsec, posture, runtime) are deduplicated against each other using PRA/PR/R/P/A bucketing with runtime as the canonical source. All other products retain their full TOC in combined output.

No authentication required.

### API specs (`fetch-api`)

1. Fetches branch info from the Stoplight API to get the current commit hash
2. Compares against stored state (`metadata/api_specs_{product}.json`) — skips if unchanged
3. Fetches the table of contents and filters to `article`, `http_service`, and `http_operation` nodes
4. Downloads each node's data (10 concurrent, with 429 rate-limit retry)
5. Renders to Markdown: services get description + API categories, operations get method/path, request headers, request body schema, examples, and response schemas
6. Writes numbered files to `sources_fetch/api_specs_{product}/`
7. Removes files for nodes that no longer exist in the API

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run fetch:cortex` | Fetch all Cortex products (or `fetch:cortex:{product}` for one) |
| `npm run fetch-api:cortex` | Fetch Stoplight API specs (or `fetch-api:cortex:{product}` for one; `--force` to bypass cache) |
| `npm run fix:cortex` | Run all fix scripts + combine (or `fix:cortex:{product}` for one) |
| `npm run combine:cortex` | Generate combined files only (or `combine:cortex:{product}` for one) |
| `npm run snapshot:cortex` | Snapshot API metadata for all products (or `snapshot:cortex:{product}` for one) |
| `npm run check:cortex` | Detect changes vs stored snapshots (or `check:cortex:{product}`; `--exit-code`, `--apply`, `--format text`) |
| `npm run audit:headings` | Audit heading levels vs TOC depth + h6 cap simulation |
| `npm run audit:toc` | Full TOC-to-file structure audit + combined file validation |
| `npm run toc:table` | Print TOC as indented tree from live API |
| `python scripts/segment_combined.py` | Pre-segment combined files for RAG ingestion (~4-8KB segments) |
| `python data_ingestion/ingest.py` | Ingest segments into Vertex AI Search (`--upsert` to update existing, `--product` to filter) |
| `python data_ingestion/purge_stale_docs.py` | Delete orphaned documents from data store that no longer match local segments |
| `npm test` | Run unit tests |

`npm run fix` chains all fix scripts per product directory, generates the combined files, and updates metadata snapshots.

## Change detection

The pipeline detects when documentation has changed without doing a full re-fetch. It uses two levels of detection:

1. **Map-level**: compares `lastPublication` timestamps to detect full map republications (added/removed/reordered topics)
2. **Per-topic**: compares `ft:lastTechChangeTimestamp` for every topic to detect individual page edits that don't trigger a map republication

```bash
npm run snapshot:cortex              # bootstrap v2 snapshots (first time / after upgrade)
npm run check:cortex                 # compare live API vs snapshots (JSON output)
npm run check:cortex -- --format text    # human-readable output
npm run check:cortex -- --exit-code      # exit 2 if changes detected, 0 if up to date
npm run check:cortex -- --apply          # detect changes + re-fetch + snapshot affected products
```

Snapshots are stored in `metadata/{product}.json` (schema v2) and track each map's `lastPublication` timestamp, TOC structure, and per-topic `lastTechChangeTimestamp`. The `--apply` flag triggers a `fetch:cortex:{product}` + `fix:cortex:{product}` + `snapshot:cortex:{product}` cycle for affected products only.

**Exit codes** (with `--exit-code`): `0` = no changes, `1` = errors, `2` = changes detected.

### Daily automation

```bash
# Check for changes; if any are found, re-fetch and snapshot
npm run check:cortex -- --format text --exit-code
if [ $? -eq 2 ]; then
  npm run check:cortex -- --apply
fi
```

The first run after upgrading to v2 snapshots requires `npm run snapshot:cortex` to seed per-topic timestamps. After that, the check + apply loop is self-sustaining.

### API spec change detection

`fetch-api` has its own two-tier change detection. Tier 1 compares the Stoplight branch commit hash — if unchanged, the entire product is skipped. Tier 2 compares per-node content hashes (SHA-256) so only changed nodes are re-rendered. State is stored in `metadata/api_specs_{product}.json`.

## Output

### Individual files (`sources_fetch/{product}/0001-*.md`)

Each file has YAML frontmatter + Markdown body:

```markdown
---
title: "Topic Title"
tocId: "..."
contentId: "..."
prettyUrl: "/r/.../Topic-Title"
depth: 2
---

# Topic Title

Content here...
```

### API spec files (`sources_fetch/api_specs_{product}/0001-*.md`)

Each file has YAML frontmatter with type-specific fields:

```markdown
---
title: "Create Alert"
type: http_operation
method: post
path: "/public_api/v1/alerts/create"
service: "Cortex Cloud APIs"
slug: "create-alert"
sourceProject: cortex-cloud
serverUrl: "https://api.example.com"
---

# Create Alert

**`POST /public_api/v1/alerts/create`**

## Request Headers
| Name | Required | Description |
|------|----------|-------------|

## Request Body (`application/json`)
| Field | Type | Required | Description |
|-------|------|----------|-------------|

## Response (200 OK)
| Field | Type | Description |
|-------|------|-------------|
```

Node types: `article` (prose docs), `http_service` (API overview + categories), `http_operation` (endpoint with method, path, headers, body schema, examples, responses).

### Combined files (`sources_fetch/{product}/*-combined.md`)

All topics concatenated in TOC order with hierarchical heading levels. Topic titles use heading levels matching their TOC depth (depth 0 = `#`, depth 1 = `##`, etc.), and sub-headings within each topic are shifted accordingly (capped at h6).

### RAG segments (`sources_fetch/{product}/public/`)

Pre-segmented files (~4-8KB each) for RAG Engine ingestion. Generated by `python scripts/segment_combined.py`. Each segment starts with a breadcrumb line for retrieval context:

```markdown
> Cortex XDR > Configure Cortex XDR > Broker VM > AWS Setup

#### AWS Setup

Content here...
```

Segments respect markdown structure — tables, code blocks, and ordered lists are never split mid-block. Use `--product` to target one product, `--max-size` to override the default 8000-char target.

## Data ingestion

Segments are ingested into a Vertex AI Search data store with product metadata for filtered retrieval.

### Multi-product tagging

Some maps are relevant across multiple products. The `xdr_compatibility` and `xdr_agent_admin` maps are tagged with `["xdr", "cloud", "xsiam"]` in `data_ingestion/config.py`. During ingestion, these maps are ingested once per product with a product-suffixed document ID (e.g., `xdr_compatibility__segment-001-foo__cloud`), keeping the schema's `product` field as a scalar string.

The `koi` map is single-product — it's tagged with `product: "koi"` (not multi-tagged) and uses a `*.md` glob override in `MAP_TO_GLOB` since its source files arrive pre-segmented, not via `segment_combined.py`.

### Ingestion commands

```bash
# First-time ingestion (create-only, skips existing)
python data_ingestion/ingest.py

# After re-fetching changed docs (upsert: create or replace)
python data_ingestion/ingest.py --product xdr --upsert

# Dry run to preview what would be ingested
python data_ingestion/ingest.py --dry-run

# Purge stale documents no longer matching local segments
python data_ingestion/purge_stale_docs.py --dry-run    # preview
python data_ingestion/purge_stale_docs.py               # delete
python data_ingestion/purge_stale_docs.py --product xdr  # filter by product
```

### Typical update workflow

```bash
npm run check:cortex -- --format text     # detect changes
npm run check:cortex -- --apply           # re-fetch changed products
python scripts/segment_combined.py        # re-segment
python data_ingestion/purge_stale_docs.py # remove orphaned docs
python data_ingestion/ingest.py --upsert  # upsert all segments
```

## Re-fetching

Running `npm run fetch` again will overwrite all files. Turndown re-introduces `\_` escaping by default, so always run `npm run fix` after a fresh fetch.

## Project structure

```
fetch-cortex-docs/
├── scripts/
│   ├── map_config.js                  # product/map definitions + CLI flag parsing
│   ├── fetch_fluidtopics.js           # Fluid Topics fetcher
│   ├── fetch_stoplight.js            # Stoplight API spec fetcher
│   ├── stoplight_config.js           # Stoplight project definitions
│   ├── render_stoplight_node.js      # Stoplight node → Markdown renderer
│   ├── fix.js                         # fix pipeline orchestrator
│   ├── fix_abstract_lines.sh          # post-fetch fix
│   ├── fix_escaped_chars_in_fences.py # post-fetch fix
│   ├── fix_escaped_underscores.py     # post-fetch fix
│   ├── fix_images_and_fences.py       # post-fetch fix
│   ├── fix_broken_tables.py           # post-fetch fix
│   ├── generate_combined.js           # combined file builder
│   ├── split_combined.py              # split combined files by H1 heading
│   ├── segment_combined.py           # pre-segment combined files for RAG ingestion
│   ├── snapshot.js                    # metadata snapshot builder
│   ├── check.js                      # change detection (compare snapshots vs API)
│   ├── audit_headings.js              # audit tool
│   ├── audit_toc_vs_headings.js       # audit tool
│   └── generate_toc_table.js          # utility
├── data_ingestion/
│   ├── config.py                      # GCP project, data store, product metadata config
│   ├── provision.py                   # Vertex AI Search resource provisioning
│   ├── ingest.py                      # document ingestion (create / upsert)
│   ├── query.py                       # search testing
│   ├── purge_stale_docs.py            # purge orphaned documents
│   └── cleanup_old_xdr_compat_docs.py # one-time migration cleanup
├── metadata/                          # per-product snapshots
├── sources_fetch/
│   ├── appsec/                        # Cortex Cloud AppSec
│   ├── posture/                       # Cortex Cloud Posture
│   ├── runtime/                       # Cortex Cloud Runtime
│   ├── cortex_gateway/                # Cortex Gateway
│   ├── xdr_5/                         # Cortex XDR 5.x
│   ├── xdr_compatibility/             # Cortex XDR Compatibility Matrix
│   ├── xdr_agent_admin/               # Cortex XDR Agent Administrator Guide
│   ├── xsiam_3/                       # Cortex XSIAM 3.x
│   ├── agentix/                       # Cortex AgentiX
│   ├── koi/                           # Koi (sourced externally; ingestion only)
│   ├── api_specs_cloud/              # Cortex Cloud API specs (Stoplight)
│   └── README.md
├── package.json
└── .gitignore
```

See `sources_fetch/README.md` for detailed documentation of the Fluid Topics API, post-processing applied, and known issues.
