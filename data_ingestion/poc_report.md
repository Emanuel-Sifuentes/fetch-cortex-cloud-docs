# Vertex AI Search (Discovery Engine) POC Report

## Context

This POC evaluates **Vertex AI Search** (aka Discovery Engine) as a replacement for GCP RAG Engine for metadata-filtered document retrieval. The goal is to determine whether Vertex AI Search can support multi-product, audience-scoped document search with structured metadata filtering — a pattern needed for our Cortex product documentation system at scale (3000+ markdown documents).

---

## Architecture Overview

Vertex AI Search uses four core resources:

```
GCP Project
  └── Collection (default_collection)
        ├── Data Store (the document corpus)
        │     ├── Schema (defines filterable/searchable fields)
        │     ├── Branch 0 (default branch, holds documents)
        │     └── Documents (content + struct_data metadata)
        └── Engine/App (the search interface)
              └── Serving Config (default_config)
```

### Python SDK

- **Package**: `google-cloud-discoveryengine`
- **Clients used**:
  - `DataStoreServiceClient` — create/manage data stores
  - `EngineServiceClient` — create/manage search engines
  - `DocumentServiceClient` — import/create/list documents
  - `SchemaServiceClient` — read/update the data store schema
  - `SearchServiceClient` — execute search queries

**Important**: The SDK version matters. Older versions (e.g., 0.17.0) may be missing enum values. In our case, `DataStore.ContentConfig.UNSTRUCTURED` did not exist — the equivalent was `CONTENT_REQUIRED`. Always check available enum members at runtime if the SDK version is pinned.

---

## What Works: The Successful Configuration

After multiple iterations, here is the exact configuration that works end-to-end:

### Data Store Configuration

```python
discoveryengine.DataStore(
    display_name="...",
    industry_vertical=discoveryengine.IndustryVertical.GENERIC,
    solution_types=[discoveryengine.SolutionType.SOLUTION_TYPE_SEARCH],
    content_config=discoveryengine.DataStore.ContentConfig.CONTENT_REQUIRED
)
```

### Engine Configuration

```python
discoveryengine.Engine(
    display_name="...",
    solution_type=discoveryengine.SolutionType.SOLUTION_TYPE_SEARCH,
    industry_vertical=discoveryengine.IndustryVertical.GENERIC,
    data_store_ids=[data_store_id],
    search_engine_config=discoveryengine.Engine.SearchEngineConfig(
        search_tier=discoveryengine.SearchTier.SEARCH_TIER_ENTERPRISE,
        search_add_ons=[discoveryengine.SearchAddOn.SEARCH_ADD_ON_LLM]
    )
)
```

- `SEARCH_TIER_ENTERPRISE` is required for metadata filtering and advanced search features.
- `SEARCH_ADD_ON_LLM` enables RAG/summarization capabilities.

### Document Ingestion: Use Individual CreateDocument API (NOT Bulk JSONL Import)

The `CreateDocument` API is the reliable method for ingesting documents with both content and structured metadata:

```python
doc_client.create_document(
    parent=f"{data_store_resource}/branches/0",
    document_id="xsiam_public",
    document=discoveryengine.Document(
        struct_data={"product": "XSIAM", "audience": "public"},
        content=discoveryengine.Document.Content(
            mime_type="text/plain",
            raw_bytes=markdown_text.encode("utf-8")
        )
    )
)
```

Key details:
- `struct_data` holds the filterable metadata as a flat dict (keys become schema fields)
- `content.raw_bytes` holds the actual document text (encoded to bytes)
- `content.mime_type` must be set (e.g., `"text/plain"` for markdown)
- `document_id` must be unique within the data store

### Schema Configuration

After documents are created, the API auto-detects a schema from `struct_data` fields. You must then **update** the schema to mark fields as `filterable`:

```python
# Fetch current auto-detected schema
current_schema = schema_client.get_schema(name=schema_name)
schema_dict = json.loads(current_schema.json_schema)

# Add filterable=true to target fields (they may be top-level or nested)
schema_dict["properties"]["product"]["filterable"] = True
schema_dict["properties"]["audience"]["filterable"] = True

# Push updated schema
schema_client.update_schema(request=discoveryengine.UpdateSchemaRequest(
    schema=discoveryengine.Schema(
        name=schema_name,
        json_schema=json.dumps(schema_dict)
    )
))
```

Critical rules for schema updates:
- **Never remove fields** that the API auto-detected — the update will fail with "Schema update doesn't support removing fields"
- **Always fetch-then-merge**: read the current schema, modify it, push it back
- Fields support these boolean flags: `indexable`, `searchable`, `retrievable`, `dynamicFacetable`, `filterable`
- `filterable` is NOT set by default — you must explicitly add it

### Search Query Filter Syntax

```python
# Correct filter syntax — uses colon + ANY() for string fields
filter_string = 'product: ANY("XSIAM") AND audience: ANY("public")'

# WRONG — equals sign syntax is NOT supported
filter_string = 'product="XSIAM"'  # Will fail with "Unsupported field"
```

- String equality uses `: ANY("value")` syntax, NOT `= "value"`
- Combine filters with `AND` / `OR`
- Field names in filters must match the schema field names exactly (case-sensitive)
- If struct_data fields appear at top level in the schema, use `product: ANY(...)`. If nested under `structData`, use `structData.product: ANY(...)`

---

## POC Test Results

5 documents were ingested with two metadata fields (`product`, `audience`):

| Document | Product | Audience |
|----------|---------|----------|
| xsiam_public.md | XSIAM | public |
| xsiam_internal.md | XSIAM | internal |
| xdr_public.md | XDR | public |
| cloud_public.md | Cloud | public |
| agentix_internal.md | Agentix | internal |

### Query Results

| # | Query | Filter | Expected | Actual | Status |
|---|-------|--------|----------|--------|--------|
| 1 | "What is the data retention limit?" | product=XSIAM, audience=public | XSIAM doc (186 days) | XSIAM public doc returned | PASS |
| 2 | "What is the data retention limit?" | product=Cloud, audience=public | Cloud doc (30 days) | Cloud public doc returned | PASS |
| 3 | "telemetry flags" | product=Agentix | Agentix internal doc | Agentix internal doc returned | PASS |
| 4 | "telemetry flags" | product=Agentix, audience=public | No results (doc is internal) | No results | PASS |

Test 4 is the critical RBAC validation: the same query that returns results for an internal user (Test 3) correctly returns **zero results** when filtered to `audience=public`, because the only Agentix document is marked `internal`.

---

## What Does NOT Work (Pitfalls & Dead Ends)

### 1. Bulk JSONL Import with `data_schema="custom"` + `CONTENT_REQUIRED`

The JSONL bulk import (`ImportDocumentsRequest` with `GcsSource`) does NOT work with `CONTENT_REQUIRED` data stores when you want both content and metadata. The API rejects every document with:

> "To create document without content, content config of data store must be NO_CONTENT."

The `custom` data schema expects `_id`, `structData`, and optionally `jsonData` — but the API does not treat `jsonData` or `content.uri` as "content" in the `CONTENT_REQUIRED` sense. The `content.raw_bytes` field (which does work) is not available in the JSONL format.

**Workaround**: Use individual `CreateDocument` API calls instead of bulk JSONL import.

### 2. JSONL `id` vs `_id`

When using `data_schema="custom"`, the document ID field MUST be `_id` (with underscore prefix), not `id`. Using `id` silently fails with:

> "Custom Document Id (`_id`) was not found in document."

### 3. `data_schema="content"` Rejects JSONL Files

Setting `data_schema="content"` expects direct file references (PDF, HTML, TXT, DOCX, etc.) — not JSONL. It will fail with:

> "File extension type is jsonl, and it is not supported."

### 4. `NO_CONTENT` Data Stores Cannot Be Searched

A data store with `ContentConfig.NO_CONTENT` will accept documents with metadata via JSONL import, but the documents have no searchable text content. All search queries return 0 results, even unfiltered. This config is only useful for structured-data-only use cases (no full-text search).

### 5. Data Store Deletion Takes Hours

Deleting a data store is an async operation that can take **hours** to complete. During this time, you cannot recreate a data store with the same ID — the API returns:

> "DataStore is being deleted, please wait for deletion to complete before recreating with the same ID."

**Workaround**: Use a new data store ID (e.g., append a version suffix like `-v2`, `-v3`).

### 6. Schema Updates Cannot Remove Fields

If the auto-detected schema has fields you didn't expect (e.g., `content.uri`, `content.mimeType`, `structData.*`), you cannot push a schema that omits them. The API rejects with:

> "Schema update doesn't support removing fields."

**Workaround**: Always fetch the current schema first, modify in-place, then push back.

### 7. SDK Version Compatibility

The `google-cloud-discoveryengine` package version 0.17.0 (latest available for Python 3.13 at time of testing) is missing newer enum values like `ContentConfig.UNSTRUCTURED`. The equivalent in this version is `CONTENT_REQUIRED`. Always verify enum availability at runtime.

---

## IAM Requirements

The Discovery Engine service account needs read access to your GCS bucket (if using GCS-based content):

```bash
gcloud storage buckets add-iam-policy-binding gs://YOUR_BUCKET \
  --member="serviceAccount:service-PROJECT_NUMBER@gcp-sa-discoveryengine.iam.gserviceaccount.com" \
  --role="roles/storage.objectViewer"
```

The service account follows the pattern: `service-{PROJECT_NUMBER}@gcp-sa-discoveryengine.iam.gserviceaccount.com`

---

## Recommendations for 3000+ Document Scale Implementation

### Document Ingestion Strategy

Since bulk JSONL import does not work with `CONTENT_REQUIRED` + metadata, you have two options:

**Option A: Batch `CreateDocument` API Calls (Recommended)**

Use the individual `CreateDocument` API in parallel batches. For 3000+ documents:

```python
from concurrent.futures import ThreadPoolExecutor

def create_doc(doc_data):
    doc_client.create_document(
        parent=branch_parent,
        document_id=doc_data["id"],
        document=discoveryengine.Document(
            struct_data=doc_data["metadata"],
            content=discoveryengine.Document.Content(
                mime_type="text/plain",
                raw_bytes=doc_data["content"].encode("utf-8")
            )
        )
    )

with ThreadPoolExecutor(max_workers=10) as executor:
    executor.map(create_doc, all_documents)
```

- Use threading (not async) since the gRPC client is thread-safe
- Respect API rate limits — start with 10 concurrent workers and increase if needed
- Implement retry logic with exponential backoff for transient errors
- Use `reconciliation_mode=INCREMENTAL` if re-importing (via `ImportDocumentsRequest` for updates)
- For updates to existing documents, use `UpdateDocument` or re-import with `FULL` reconciliation mode

**Option B: GCS Auto-Import (Unstructured Only)**

If you don't need inline metadata filtering and can tag documents via folder structure:
1. Upload all .md/.txt files to a GCS bucket
2. Point the data store at the bucket with `data_schema="content"`
3. This handles parsing/embedding automatically but provides NO `struct_data` metadata

This is simpler but loses the metadata filtering capability, which is the whole point of this POC.

### Schema Design

- Keep metadata fields flat (not deeply nested) — filtering is simpler with top-level fields
- Define all filterable fields upfront and set `filterable: true` in the schema immediately after first document creation
- Available field flags: `indexable`, `searchable`, `retrievable`, `dynamicFacetable`, `filterable`
- Consider which fields need which flags — not everything needs to be searchable AND filterable

### Incremental Updates

- Use `CreateDocument` / `UpdateDocument` for individual document changes
- For bulk re-syncs, use `ImportDocumentsRequest` with `ReconciliationMode.FULL` to replace all documents, or `INCREMENTAL` to add/update without deleting existing ones
- Document IDs are stable — updating a document with the same ID replaces it

### Pricing Estimate (3000 Documents)

**Assumptions**: 3,000 markdown documents, ~2,000-3,000 tokens each (~2,500 avg), Enterprise tier with LLM add-on, metadata filtering enabled.

#### Component Pricing

| Component | Rate | Notes |
|-----------|------|-------|
| **Search Queries (Enterprise)** | **$4.00 per 1,000 queries** | Required for metadata filtering + LLM/RAG features |
| Search Queries (Standard) | $1.50 per 1,000 queries | Does NOT support metadata filtering — not viable for this use case |
| **Data Index Storage** | **~$5.00 per GiB/month** | Based on total raw data size, sampled and averaged monthly |
| **Free Tier** | **10,000 queries/month** | Ongoing, per account — does not include Advanced Generative Answers |

#### Storage Cost Estimate

```
3,000 docs x ~2,500 tokens x ~4 bytes/token = ~30 MB raw text (~0.03 GiB)
With indexing overhead (embeddings, inverted index): ~0.1 - 0.5 GiB
```

| Scenario | Storage Size | Monthly Cost |
|----------|-------------|--------------|
| Raw text only | ~0.03 GiB | ~$0.15/month |
| With indexing overhead | ~0.1 - 0.5 GiB | **~$0.50 - $2.50/month** |

Storage is negligible at this document count.

#### Query Cost Estimate

| Monthly Query Volume | Gross Cost | After Free Tier (10K) | Effective Cost |
|---------------------|------------|----------------------|----------------|
| 1,000 queries | $4.00 | Free | **$0/month** |
| 10,000 queries | $40.00 | Free | **$0/month** |
| 25,000 queries | $100.00 | 15K billable | **$60/month** |
| 50,000 queries | $200.00 | 40K billable | **$160/month** |
| 100,000 queries | $400.00 | 90K billable | **$360/month** |

#### Total Monthly Cost Estimate

| Usage Level | Storage | Queries | Total |
|-------------|---------|---------|-------|
| Dev/testing (~5K queries) | ~$1 | $0 (free tier) | **~$1/month** |
| Low prod (~25K queries) | ~$2 | ~$60 | **~$62/month** |
| Medium prod (~50K queries) | ~$2 | ~$160 | **~$162/month** |
| High prod (~100K queries) | ~$2 | ~$360 | **~$362/month** |

#### Key Pricing Notes

- **Enterprise tier is mandatory** — metadata filtering (`product: ANY("XSIAM")`) only works with `SEARCH_TIER_ENTERPRISE`. Standard tier cannot filter on `struct_data` fields.
- **LLM add-on is bundled** — `SEARCH_ADD_ON_LLM` (RAG/summarization) is included in the Enterprise $4.00/1K rate, not billed separately.
- **The dominant cost is query volume**, not storage. At 3,000 small markdown docs, storage is under $3/month regardless.
- **Free tier covers dev/testing** — 10,000 free queries/month is generous for development and low-traffic production.
- **Configurable pricing model available** — for high-volume, predictable workloads, Google offers a subscription model (minimum 1,000 QPM + 50 GiB/month) that may be cheaper than pay-as-you-go. Worth evaluating if query volume exceeds ~50K/month consistently.
- **Verify on the official pricing page** — these figures are based on publicly available pricing as of early 2025. Check https://cloud.google.com/generative-ai-app-builder/pricing for current rates.

---

## File Reference

| File | Purpose |
|------|---------|
| `test.py` | Uploads 5 test markdown files + metadata.jsonl to GCS |
| `ai_search_setup.py` | Creates data store, engine, imports docs, configures schema |
| `poc_query.py` | Runs 4 test queries demonstrating metadata filtering and RBAC |

### GCP Resources

| Resource | ID | Status |
|----------|----|--------|
| Project | `prod-fmgwyc4skrrt` | Active |
| GCS Bucket | `esifuentes-cortex-combined-rag` | Active (emptied, retained for future use) |
| Data Store | `cortex-poc-store-v1/v2/v3` | Deleted |
| Engine/App | `cortex-poc-app-v1/v2/v3` | Deleted |

### JSONL Metadata Format Reference

This is the JSONL format used during the POC for bulk import via `data_schema="custom"`. Note: this format only works with `NO_CONTENT` data stores (metadata-only, no full-text search). For full-text search with metadata, use individual `CreateDocument` API calls instead (see "Document Ingestion Strategy" above).

```jsonl
{"_id": "xsiam_public", "structData": {"product": "XSIAM", "audience": "public"}, "jsonData": "{\"content\": \"# Cortex XSIAM Data Retention\\n\\n...\"}"}
{"_id": "xsiam_internal", "structData": {"product": "XSIAM", "audience": "internal"}, "jsonData": "{\"content\": \"# XSIAM Backend Architecture\\n\\n...\"}"}
```

Field reference:
- `_id` (required): Unique document identifier. Must use underscore prefix — `id` without underscore is silently rejected.
- `structData`: Flat key-value metadata dict. Keys become schema fields that can be marked `filterable`.
- `jsonData`: Stringified JSON containing document fields. Used for structured data ingestion, but does NOT count as "content" for `CONTENT_REQUIRED` data stores.

### CreateDocument Format Reference (Recommended for Production)

This is the format that works end-to-end with `CONTENT_REQUIRED` data stores — supports both full-text search and metadata filtering:

```python
discoveryengine.Document(
    struct_data={
        "product": "XSIAM",       # filterable metadata
        "audience": "public"       # filterable metadata
    },
    content=discoveryengine.Document.Content(
        mime_type="text/plain",
        raw_bytes=b"# Cortex XSIAM Data Retention\n\nThe standard data retention..."
    )
)
```

### Resource Naming Pattern

```
projects/{project_id}/locations/global/collections/default_collection/dataStores/{data_store_id}
projects/{project_id}/locations/global/collections/default_collection/engines/{app_id}
```

---

## Conclusion

Vertex AI Search **can** serve as a replacement for GCP RAG Engine with metadata-filtered retrieval. The core filtering mechanism works correctly and supports the RBAC pattern (product + audience scoping). However, the API has significant ergonomic issues:

1. **Document ingestion is the hardest part** — the bulk JSONL import does not support the `CONTENT_REQUIRED` + `struct_data` combination. Individual `CreateDocument` calls work but require custom batching logic.
2. **Schema management is fragile** — you must fetch-then-merge, never overwrite. Fields cannot be removed once auto-detected.
3. **The SDK documentation and error messages are misleading** — many configurations that seem logical (JSONL with content URIs + CONTENT_REQUIRED) silently fail or produce confusing errors.
4. **Infrastructure is slow to tear down** — data store deletion takes hours, making iteration painful during development.

For the 3000+ document scale implementation, plan for a custom ingestion pipeline using batched `CreateDocument` calls with proper error handling, retry logic, and progress tracking.
