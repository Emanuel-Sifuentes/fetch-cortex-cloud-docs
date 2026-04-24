# Koi Ingestion into Vertex AI Search

## Problem

Koi is a new product that will live under Cortex. Its docs (fetched from an external gitbook source, out of band from the Fluid Topics / Stoplight pipelines) already live in `sources_fetch/koi/public/*.md` as ~180 topic-sized files (1-16 KB each). They need to be ingested into the existing Vertex AI Search data store with the same metadata scheme the other products use, so RAG retrieval can filter by product.

Two small mismatches prevent reusing the existing ingestion path as-is:

1. Koi files are not named `segment-*.md` — they use hierarchical topic names like `api-reference__reference__alerts.md`. The ingest script's glob is hardcoded to `segment-*.md`.
2. Koi is not in `MAP_TO_PRODUCT` / `MAP_TO_PRODUCT_FAMILY`, so `discover_segments` skips it.

## Solution

Add koi to the two product mapping dicts, introduce a small per-map glob override (defaulting to `segment-*.md`), and thread that override through `ingest.py` and `purge_stale_docs.py`. Ingest files as-is — no content preprocessing.

## Non-goals

- Fetching koi from its upstream source (gitbook). The docs are already present locally.
- Change detection / snapshotting for koi (the existing `check.js` / `snapshot.js` are Fluid Topics-specific).
- Running koi through `segment_combined.py` or `generate_combined.js`. Koi files are already topic-sized.
- Content transformation (e.g., converting gitbook YAML frontmatter to breadcrumb lines). Files ingest as-is.
- Schema changes. `FILTERABLE_FIELDS` already covers `product`, `product_family`, `audience`.

## Metadata values

| Field | Value | Rationale |
|---|---|---|
| `product` | `"koi"` | New product, distinct from `cloud` / `xdr` / `xsiam` / `gateway` / `agentix`. |
| `product_family` | `"cortex"` | Koi lives under Cortex. |
| `audience` | `"public"` | Same as all other ingested segments. |

Single-product map (not multi-tagged), so doc IDs take the non-suffixed form:

```
koi__api-reference__reference__alerts
koi__guardrails__malware-protection
koi__get-started__platform-coverage
...
```

The `__` separator is shared with the existing multi-product suffix convention, but since koi is single-product, no trailing `__{product}` is appended. Prefix detection in `purge_stale_docs.py` (`doc_id.split("__")[0]`) still returns `koi` correctly.

## Design

### Config changes (`data_ingestion/config.py`)

```python
MAP_TO_PRODUCT_FAMILY = {
    # ...existing entries...
    "koi": "cortex",
}

MAP_TO_PRODUCT = {
    # ...existing entries...
    "koi": "koi",
}

# Maps that don't follow the default `segment-*.md` naming convention.
# Default pattern is `segment-*.md` for maps produced by segment_combined.py.
MAP_TO_GLOB = {
    "koi": "*.md",
}
```

### Ingest changes (`data_ingestion/ingest.py`)

In `discover_segments`:

```python
from config import MAP_TO_GLOB  # new import

# ...

pattern_name = MAP_TO_GLOB.get(map_name, "segment-*.md")
pattern = os.path.join(segments_dir, pattern_name)
for filepath in sorted(glob.glob(pattern)):
    # unchanged body
```

No other changes. `_build_document` already reads content as raw bytes and attaches struct_data from the discovered dict. Doc ID construction (`f"{map_name}__{filename.removesuffix('.md')}"`) already produces stable descriptive IDs for koi.

### Purge changes (`data_ingestion/purge_stale_docs.py`)

Mirror the glob change in `local_doc_ids`:

```python
from config import BRANCH_PARENT, MAP_TO_GLOB, MAP_TO_PRODUCT  # add MAP_TO_GLOB

# ...

pattern_name = MAP_TO_GLOB.get(map_name, "segment-*.md")
for filepath in sorted(glob.glob(os.path.join(segments_dir, pattern_name))):
    # unchanged body
```

`store_doc_names` requires no change — its prefix check (`doc_id.split("__")[0] in map_prefixes`) works for `koi__...` IDs because `koi` is added to `target_maps` via `MAP_TO_PRODUCT`.

### README update

Add koi to the Products table with a note that it's ingestion-only (no fetch command yet) and a pointer to the external gitbook source. Keep the Multi-product tagging section as-is — koi is not multi-tagged.

## Verification

1. `python data_ingestion/ingest.py --product koi --dry-run` lists ~180 koi documents with `product=koi`, `product_family=cortex`.
2. `python data_ingestion/ingest.py --product koi` creates those documents without touching other products.
3. `python data_ingestion/ingest.py --dry-run` (no filter) still discovers existing products' segments unchanged — the glob override is a no-op for them because their map names aren't in `MAP_TO_GLOB`. (End-to-end verification requires regenerated `public/` dirs for other products; locally we verify the code path is unchanged via inspection and, if available, regenerated segments.)
4. `python data_ingestion/purge_stale_docs.py --product koi --dry-run` reports 0 stale documents immediately after ingest.
5. A sample query via `query.py` returns a koi result when filtered by `product:"koi"`.

## Risks and mitigations

- **Naming collision**: koi doc IDs share the `__` separator used for multi-product suffixes. Since koi is single-product, IDs have no trailing `__{product}`, so there's no ambiguity with existing IDs.
- **Accidental ingestion of non-segment `.md` files in `koi/public/`**: the `*.md` glob is permissive for koi. The directory is gitignored and regenerated only by fetcher tooling; only koi topic files are expected there.
- **Missing koi in `MAP_TO_GLOB`**: if a future pre-segmented product is added without a `MAP_TO_GLOB` entry, the default `segment-*.md` glob silently matches nothing. Verification step 1 catches this on first dry run.

## Follow-ups (out of scope for this spec)

- Automated koi fetcher (gitbook → `sources_fetch/koi/public/`) with its own change-detection.
- Koi-specific breadcrumb preprocessing if retrieval quality shows weakness on koi queries.
