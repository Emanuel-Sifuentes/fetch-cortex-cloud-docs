# Koi Ingestion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ingest Koi docs (already present at `sources_fetch/koi/public/*.md`) into the Vertex AI Search data store with `product=koi`, `product_family=cortex`, `audience=public` metadata, reusing the existing ingestion + purge pipeline with minimal additions.

**Architecture:** Add koi to `MAP_TO_PRODUCT_FAMILY` and `MAP_TO_PRODUCT`; introduce a new `MAP_TO_GLOB` dict in `config.py` (defaults to `segment-*.md`, overrides to `*.md` for koi); thread that override through `ingest.py::discover_segments` and `purge_stale_docs.py::local_doc_ids`. No test scaffolding — `data_ingestion/` has no existing tests and this change is small config + a dict lookup; verification is done via `--dry-run` and spot-check queries.

**Tech Stack:** Python 3, `google-cloud-discoveryengine` SDK, existing `data_ingestion/` module.

**Spec:** `docs/superpowers/specs/2026-04-23-koi-ingestion-design.md`

---

### Task 1: Add koi mappings and `MAP_TO_GLOB` to `config.py`

**Files:**
- Modify: `data_ingestion/config.py`

- [ ] **Step 1: Add koi entry to `MAP_TO_PRODUCT_FAMILY`**

In `data_ingestion/config.py`, add `"koi": "cortex"` to the `MAP_TO_PRODUCT_FAMILY` dict. Place it after the `agentix` entry (alphabetical/grouping doesn't matter; trailing position is fine) but before `prisma_access` so Cortex-family entries stay together. Resulting dict:

```python
MAP_TO_PRODUCT_FAMILY = {
    "appsec": "cortex",
    "posture": "cortex",
    "runtime": "cortex",
    "cortex_gateway": "cortex",
    "xdr_5": "cortex",
    "xdr_compatibility": "cortex",
    "xdr_agent_admin": "cortex",
    "xsiam_3": "cortex",
    "agentix": "cortex",
    "koi": "cortex",
    "prisma_access": "sase",
}
```

- [ ] **Step 2: Add koi entry to `MAP_TO_PRODUCT`**

In the same file, add `"koi": "koi"` to `MAP_TO_PRODUCT`, placed before `prisma_access` to keep Cortex-family entries grouped:

```python
MAP_TO_PRODUCT = {
    "appsec": "cloud",
    "posture": "cloud",
    "runtime": "cloud",
    "cortex_gateway": "gateway",
    "xdr_5": "xdr",
    "xdr_compatibility": ["xdr", "cloud", "xsiam"],
    "xdr_agent_admin": ["xdr", "cloud", "xsiam"],
    "xsiam_3": "xsiam",
    "agentix": "agentix",
    "koi": "koi",
    "prisma_access": "prisma_access",
}
```

- [ ] **Step 3: Add new `MAP_TO_GLOB` dict**

Append below `MAP_TO_PRODUCT`, with an explanatory comment:

```python
# Glob pattern override per map for segment discovery.
# Default is `segment-*.md` (produced by scripts/segment_combined.py).
# Maps whose source docs arrive pre-segmented (not via segment_combined.py)
# override the pattern here.
MAP_TO_GLOB = {
    "koi": "*.md",
}
```

- [ ] **Step 4: Verify the config loads and values are correct**

Run (from the repo root):

```bash
python -c "import sys; sys.path.insert(0, 'data_ingestion'); import config; print('family:', config.MAP_TO_PRODUCT_FAMILY['koi']); print('product:', config.MAP_TO_PRODUCT['koi']); print('glob:', config.MAP_TO_GLOB['koi']); print('filterable:', config.FILTERABLE_FIELDS)"
```

Expected output:

```
family: cortex
product: koi
glob: *.md
filterable: {'product_family', 'product', 'audience'}
```

(Filterable-set print order may differ — membership is what matters.)

- [ ] **Step 5: Commit**

```bash
git add data_ingestion/config.py
git commit -m "feat(ingest): add koi mappings and MAP_TO_GLOB override"
```

---

### Task 2: Use `MAP_TO_GLOB` in `ingest.py::discover_segments`

**Files:**
- Modify: `data_ingestion/ingest.py` (import block around line 27-33; `discover_segments` body around line 59)

- [ ] **Step 1: Add `MAP_TO_GLOB` to the `config` import**

Edit the import in `data_ingestion/ingest.py`. Change from:

```python
from config import (
    BRANCH_PARENT,
    FILTERABLE_FIELDS,
    MAP_TO_PRODUCT,
    MAP_TO_PRODUCT_FAMILY,
    SCHEMA_NAME,
)
```

to:

```python
from config import (
    BRANCH_PARENT,
    FILTERABLE_FIELDS,
    MAP_TO_GLOB,
    MAP_TO_PRODUCT,
    MAP_TO_PRODUCT_FAMILY,
    SCHEMA_NAME,
)
```

- [ ] **Step 2: Replace the hardcoded glob pattern in `discover_segments`**

In `discover_segments`, change from:

```python
        pattern = os.path.join(segments_dir, "segment-*.md")
        for filepath in sorted(glob.glob(pattern)):
```

to:

```python
        pattern_name = MAP_TO_GLOB.get(map_name, "segment-*.md")
        pattern = os.path.join(segments_dir, pattern_name)
        for filepath in sorted(glob.glob(pattern)):
```

No other changes in this function. Doc ID construction (`base_id = f"{map_name}__{filename.removesuffix('.md')}"`) is untouched — it already yields `koi__api-reference__reference__alerts` for koi files.

- [ ] **Step 3: Verify koi is discovered with correct metadata (dry-run)**

```bash
python data_ingestion/ingest.py --product koi --dry-run
```

Expected output (counts approximate — koi has ~180 topic files):

```
Segments discovered:
  koi: <N>
  total: <N>

Dry run — no documents will be ingested.
```

If `N` is 0 or much smaller than ~150-200, the glob override isn't being picked up. Re-check Task 1 Step 3 and Task 2 Step 2.

- [ ] **Step 4: Verify doc IDs look correct**

Add a tiny shell one-liner to preview ID format (uses the same file list the script will see):

```bash
python -c "
import sys, os, glob
sys.path.insert(0, 'data_ingestion')
import config
d = os.path.join('sources_fetch', 'koi', 'public')
pattern = config.MAP_TO_GLOB['koi']
files = sorted(glob.glob(os.path.join(d, pattern)))
print('count:', len(files))
for f in files[:3]:
    name = os.path.basename(f).removesuffix('.md')
    print('id:', f'koi__{name}')
"
```

Expected:

```
count: <N>
id: koi__api-reference
id: koi__api-reference__readme__overview-and-evolution
id: koi__api-reference__reference
```

- [ ] **Step 5: Verify non-regression — existing products still resolve to the default glob**

Re-run the full discovery (no `--product` filter):

```bash
python data_ingestion/ingest.py --dry-run
```

Expected: koi appears in the product counts. Other products may show 0 if their `sources_fetch/{map}/public/` dirs aren't regenerated locally (they're gitignored) — that's not a regression, just a local-state issue. If any *non-koi* map with a populated `public/` directory suddenly shows 0 segments when it previously had some, stop and debug: the default glob fallback is broken.

Quick sanity check — confirm the default glob fallback is wired:

```bash
python -c "
import sys
sys.path.insert(0, 'data_ingestion')
from config import MAP_TO_GLOB
print('runtime glob:', MAP_TO_GLOB.get('runtime', 'segment-*.md'))
print('koi glob:', MAP_TO_GLOB.get('koi', 'segment-*.md'))
"
```

Expected:

```
runtime glob: segment-*.md
koi glob: *.md
```

- [ ] **Step 6: Commit**

```bash
git add data_ingestion/ingest.py
git commit -m "feat(ingest): use MAP_TO_GLOB for per-map segment pattern"
```

---

### Task 3: Use `MAP_TO_GLOB` in `purge_stale_docs.py::local_doc_ids`

**Files:**
- Modify: `data_ingestion/purge_stale_docs.py` (import block around line 21; `local_doc_ids` body around line 41)

- [ ] **Step 1: Add `MAP_TO_GLOB` to the `config` import**

Change from:

```python
from config import BRANCH_PARENT, MAP_TO_PRODUCT
```

to:

```python
from config import BRANCH_PARENT, MAP_TO_GLOB, MAP_TO_PRODUCT
```

- [ ] **Step 2: Replace the hardcoded glob pattern in `local_doc_ids`**

Change from:

```python
        for filepath in sorted(glob.glob(os.path.join(segments_dir, "segment-*.md"))):
```

to:

```python
        pattern_name = MAP_TO_GLOB.get(map_name, "segment-*.md")
        for filepath in sorted(glob.glob(os.path.join(segments_dir, pattern_name))):
```

No change to `store_doc_names` — its prefix check (`doc_id.split("__")[0] in map_prefixes`) already handles koi correctly because `koi` is added to `target_maps` via `MAP_TO_PRODUCT`.

- [ ] **Step 3: Verify the dry-run scans koi locally**

```bash
python data_ingestion/purge_stale_docs.py --product koi --dry-run
```

Expected output (before any koi docs are in the store):

```
Local segments produce <N> document IDs across maps: koi
Scanning data store...
Found 0 documents in store for these maps
No stale documents found.
```

`<N>` should match the koi count from Task 2 Step 3. This command hits the Vertex AI Search API (to list store documents), so real credentials must be configured. If credentials aren't available locally, skip to Step 5 and note that verification is deferred.

- [ ] **Step 4: Verify non-regression on another product (optional, requires populated local `public/`)**

If any other product has a populated `public/` directory locally:

```bash
python data_ingestion/purge_stale_docs.py --product <other> --dry-run
```

Expected: `Local segments produce <M> document IDs ...` where `<M>` is non-zero. If it drops to 0 compared to prior behavior, the default glob fallback is broken — re-check Task 3 Step 2.

- [ ] **Step 5: Commit**

```bash
git add data_ingestion/purge_stale_docs.py
git commit -m "feat(purge): use MAP_TO_GLOB for per-map segment pattern"
```

---

### Task 4: Update README with koi entry

**Files:**
- Modify: `README.md` (Products table around lines 7-14; Multi-product tagging section around lines 195-198; Project structure around line 263 listing `sources_fetch/` subdirs)

- [ ] **Step 1: Add koi row to the Products table**

Insert a new row after the `Cortex AgentiX` row and before the `API specs (Stoplight)` section header. Use:

```markdown
| Koi | _(no fetch command — docs sourced externally)_ | koi | External (GitBook) |
```

The full updated table:

```markdown
| Product | Command | Maps | Source |
|---------|---------|------|--------|
| Cortex Cloud | `npm run fetch:cortex:cloud` | appsec, posture, runtime | [Cortex Cloud](https://docs-cortex.paloaltonetworks.com/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Cortex-Cloud-Application-Security) |
| Cortex XDR | `npm run fetch:cortex:xdr` | xdr_5, xdr_compatibility, xdr_agent_admin | [XDR 5.x](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/Cortex-XDR-5.x-Documentation), [Compatibility Matrix](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/Cortex-XDR-Compatibility-Matrix/), [Agent Admin Guide](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/9.1/Cortex-XDR-Agent-Administrator-Guide) |
| Cortex XSIAM | `npm run fetch:cortex:xsiam` | xsiam_3 | [XSIAM 3.x](https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM/Cortex-XSIAM-3.x-Documentation/) |
| Cortex Gateway | `npm run fetch:cortex:gateway` | cortex_gateway | [Gateway Admin Guide](https://docs-cortex.paloaltonetworks.com/r/Cortex/Cortex-Gateway-Administrator-Guide/) |
| Cortex AgentiX | `npm run fetch:cortex:agentix` | agentix | [AgentiX](https://docs-cortex.paloaltonetworks.com/r/Cortex-AgentiX/Cortex-AgentiX-Documentation/) |
| Koi | _(no fetch command — docs sourced externally)_ | koi | External (GitBook) |
```

- [ ] **Step 2: Add koi to the Multi-product tagging section**

Find the "Multi-product tagging" section (around line 195). Append a new paragraph after the existing `xdr_compatibility` / `xdr_agent_admin` paragraph:

```markdown
The `koi` map is single-product — it's tagged with `product: "koi"` (not multi-tagged) and uses a `*.md` glob override in `MAP_TO_GLOB` since its source files arrive pre-segmented, not via `segment_combined.py`.
```

- [ ] **Step 3: Add koi to the Project structure listing**

In the Project structure tree (around line 263), add a line for `koi/` in the `sources_fetch/` block, immediately after `agentix/`:

```
│   ├── agentix/                        # Cortex AgentiX
│   ├── koi/                            # Koi (sourced externally; ingestion only)
│   ├── api_specs_cloud/                # Cortex Cloud API specs (Stoplight)
```

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: document koi ingestion in README"
```

---

### Task 5: Live ingestion of koi documents (manual, requires GCP credentials)

This task hits the live Vertex AI Search API. It should be run by a human with credentials configured (`gcloud auth application-default login`). It is **not** to be run automatically by an agent worker unless the human has explicitly authorized live ingestion.

**Files:** none (runtime operation only)

- [ ] **Step 1: Final dry-run sanity check**

```bash
python data_ingestion/ingest.py --product koi --dry-run
```

Confirm the expected koi count matches Task 2 Step 3.

- [ ] **Step 2: Ingest koi documents (create-only mode)**

```bash
python data_ingestion/ingest.py --product koi
```

Expected: progress lines ending in `Ingestion complete: <N> created, 0 skipped, 0 errors`, followed by the schema update block. If any documents fail, read the error line(s) and re-run with `--upsert` for those that partially succeeded, or abort and debug.

- [ ] **Step 3: Verify no stale koi docs**

```bash
python data_ingestion/purge_stale_docs.py --product koi --dry-run
```

Expected: `No stale documents found.`

- [ ] **Step 4: Spot-check retrieval (optional)**

Use `data_ingestion/query.py` or the Vertex AI Search console to issue a sample query filtered by `product:"koi"` (for example, a query about "malware protection" or "MCP governance"). Confirm at least one koi document is returned and its `product_family` / `product` metadata matches `cortex` / `koi`.

---

## Verification checklist (end-of-plan)

- [ ] Task 1: config values printable and match spec
- [ ] Task 2: koi dry-run count is non-zero; doc IDs have `koi__` prefix
- [ ] Task 2: default glob for non-koi maps still resolves to `segment-*.md`
- [ ] Task 3: koi purge dry-run reports 0 stale documents after ingest
- [ ] Task 4: README Products table, Multi-product tagging section, and Project structure tree all mention koi
- [ ] Task 5: live ingestion completes with 0 errors (human-operated)
