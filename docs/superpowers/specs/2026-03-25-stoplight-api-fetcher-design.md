# Stoplight API Spec Fetcher — Design Spec

## Problem

The Cortex Cloud API reference lives on a Stoplight instance (`cortex-panw.stoplight.io`). We need to programmatically download these API specs, convert them into RAG-friendly markdown (rich enough to generate working API call examples), and re-fetch only when content changes.

## Stoplight API Discovery

The Stoplight SPA is JS-rendered and not scrapable via simple HTTP. Through browser-based network interception we discovered these internal JSON APIs:

| Endpoint | Purpose |
|----------|---------|
| `GET /api/v1/projects/{projectId}/branches` | Branch metadata: `commit_hash`, `updated_at`, node counts |
| `GET /api/v1/projects/{projectId}/table-of-contents` | Full TOC with node IDs, slugs, types, titles |
| `GET /api/v1/projects/{projectId}/nodes/{slug}` | Individual node content (markdown or bundled OpenAPI JSON) |

**Cortex Cloud project ID**: `cHJqOjI3NjQwOQ` (base64 of `prj:276409`)
**Workspace ID**: `d2s6OTY1MTk`
**Branch**: `main` (single published branch)

Node counts as of 2026-03-13: 981 total (8 articles, 22 API services, 340 operations, 608 schemas, 3 miscellaneous/other).

## Architecture

### Config — `scripts/stoplight_config.js`

Separate from the existing `map_config.js` (different data model, different source).

```js
const STOPLIGHT_PROJECTS = {
  cloud: {
    workspace: "cortex-panw",
    projectId: "cHJqOjI3NjQwOQ",
    slug: "cortex-cloud",
    host: "https://cortex-panw.stoplight.io",
  },
  // future: xdr, xsiam, xpanse, etc.
};
```

New products require only adding a new key with their project ID.

When `--product` is omitted, the fetcher iterates over all keys in `STOPLIGHT_PROJECTS` (same pattern as `map_config.js` where `parseProductFlag()` returning `null` means "all").

### Change Detection — Two-Tier Strategy

**Tier 1 — Branch commit hash** (1 HTTP request):

```
GET {host}/api/v1/projects/{projectId}/branches
-> { items: [{ commit_hash, updated_at, ... }] }
```

Compare `commit_hash` against stored value in `metadata/api_specs_{product}.json`. If it matches, exit early. This makes the common case (nothing changed) extremely cheap.

**Tier 2 — Per-node content hashing** (when commit hash differs):

- Fetch TOC to get current node list
- Fetch each node and SHA-256 hash the raw `data` string (the `data` field is always a string in the API response — raw markdown for articles, JSON-encoded string for services/operations; hash the string as-is without parsing)
- Compare against stored per-node hashes
- Only re-render nodes whose hash changed or that are new
- Remove output files for nodes no longer in the TOC

**`--force` flag** bypasses tier 1 and re-fetches/re-renders everything.

**Partial failure safety**: If any node fetch fails, that node is excluded from the `nodes` map in the state file so it will be re-fetched on the next run (its content hash will be missing, triggering a fetch). Failed nodes are logged with a warning but do not abort the entire run. The `commitHash` in the state file is still updated so tier 1 does not redundantly re-check the branch, but tier 2 catches the missing nodes. This applies equally to `--force` runs — the state file contains only successful nodes, and renumbering from scratch applies only to the successfully fetched set.

**Retry policy**: On HTTP 5xx or network errors, retry once after a 1-second delay. On HTTP 429 (rate limit), pause 5 seconds and retry the entire batch. After the retry, if the request still fails, treat the node as a failed fetch (excluded from state, logged as warning).

### State File — `metadata/api_specs_{product}.json`

```json
{
  "version": 1,
  "source": "stoplight",
  "projectId": "cHJqOjI3NjQwOQ",
  "commitHash": "5637ce03290bb",
  "updatedAt": "2026-03-13T12:37:14.045271+00:00",
  "fetchedAt": "2026-03-25T21:30:00.000Z",
  "nodeCount": 370,  // rendered nodes only (excludes skipped types like model)
  "nodes": {
    "c3ehigek4t4fk-get-existing-api-keys": {
      "contentHash": "sha256:abc123...",
      "type": "http_operation",
      "title": "Get existing API keys",
      "outputFile": "0045-Get-existing-API-keys.md"
    }
  }
}
```

This file is gitignored (already covered by `metadata/`).

### Node Types — What to Fetch

| Node type | Count | Action |
|-----------|-------|--------|
| `article` | 8 | Render markdown with frontmatter |
| `http_service` | 22 | Render API overview (description, categories, server URL) |
| `http_operation` | 340 | Render rich markdown (method, path, headers, schemas as tables, examples as JSON) |
| `model` | 608 | **Skip** — schemas are already inlined in operations via `__bundled__` |

### Output — `sources_fetch/api_specs_{product}/`

Follows the existing `sources_fetch/{source}/` pattern. Files are numbered and named:

```
sources_fetch/api_specs_cloud/
  0001-Create-a-new-API-key.md
  0002-Get-started-with-Cortex-Cloud-APIs.md
  ...
  0009-ASPM-CICD-and-Application-Security-APIs.md
  0010-Get-an-application-configuration.md
  ...
```

This directory is gitignored (already covered by `sources_fetch/`).

## Markdown Rendering

### Articles

The `data` field is raw markdown. Wrap with frontmatter, pass through as-is:

```markdown
---
title: "Create a new API key"
type: article
slug: "28fuy7kt57f4d-create-a-new-api-key"
sourceProject: cortex-cloud
---

# Create a new API key

1. In Cortex, navigate to **Settings** > ...
```

### HTTP Services (API Overviews)

The `data` field is JSON with `name`, `description`, `tags[]`, `servers[]`. Render as:

```markdown
---
title: "Cortex Cloud Platform APIs"
type: http_service
slug: "f70loiyd8u1m2-cortex-cloud-platform-ap-is"
sourceProject: cortex-cloud
serverUrl: "https://api-yourfqdn"
---

# Cortex Cloud Platform APIs

You can configure and manage authentication settings, datasets...

## API Categories

- **API Keys** — APIs for managing API keys
- **Asset groups** — APIs for managing asset groups
```

### HTTP Operations

The `data` field is JSON with `method`, `path`, `description`, `request` (headers, body with `$ref` into `__bundled__`), `responses`, and `__bundled__` (resolved schemas and examples).

Render by walking `__bundled__` refs to produce:

```markdown
---
title: "Get existing API keys"
type: http_operation
method: post
path: "/public_api/v1/api_keys/get_api_keys"
service: "Cortex Cloud Platform APIs"
slug: "c3ehigek4t4fk-get-existing-api-keys"
sourceProject: cortex-cloud
serverUrl: "https://api-yourfqdn"
---

# Get existing API keys

**`POST /public_api/v1/api_keys/get_api_keys`**

Get a list of API keys filtered by expiration date, role, or ID.

**Required license:** Cortex Cloud Runtime Security or Cortex Cloud Posture Management

## Request Headers

| Name | Required | Description |
|------|----------|-------------|
| authorization | yes | api_key |
| x-xdr-auth-id | yes | api_key_id |

## Request Body (`application/json`)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| request_data | object | yes | |
| request_data.filters | array | no | An array of filter fields. |
| request_data.filters[].field | string | no | enum: `expiration`, `roles`, `id` |
| request_data.filters[].operator | string | no | enum: `gte`, `lte`, `contains`, `in` |
| request_data.filters[].value | integer \| array | no | ... |

### Request Example — Get API keys and filter by expiration

    ```json
    {
      "request_data": {
        "filters": [
          { "field": "expiration", "operator": "gte", "value": 1721149909250 }
        ]
      }
    }
    ```

## Response (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| reply.data | array | |
| reply.data[].id | integer | |
| reply.data[].roles | array of strings | |
| reply.filter_count | integer | |
| reply.total_count | integer | Note: contains all API Keys, including expired. |

### Response Example

    ```json
    { "reply": { "DATA": [...], "FILTER_COUNT": 3, "TOTAL_COUNT": 70 } }
    ```
```

### `$ref` Resolution Within `__bundled__`

The `data` field for `http_operation` nodes is a JSON string. When parsed, it contains a flat `__bundled__` object at the top level where all referenced schemas, headers, examples, and responses are inlined. References use the form `{"$ref": "#/__bundled__/KEY"}` where `KEY` is a hex-like ID (e.g., `a2e251df1c31d`).

**Resolution algorithm:**

1. Parse `data` as JSON
2. When encountering `{"$ref": "#/__bundled__/KEY"}`, look up `parsed.__bundled__[KEY]`
3. The resolved object may itself contain further `$ref` pointers into `__bundled__` — follow recursively
4. **Max depth**: 10 levels of recursion. If exceeded, stop and render the field as `[nested object]`. This guards against potential circular refs (none observed in practice, but defensive).
5. **Missing ref**: If a `$ref` target is not found in `__bundled__`, log a warning and render the field as `[unresolved ref: KEY]`

**Worked example** from the "Get existing API keys" operation:

```
Top-level: request.headers[0] = {"$ref": "#/__bundled__/62d1d810de298"}

__bundled__.62d1d810de298 = {
  "name": "authorization",
  "description": "api_key",
  "required": true,
  "schema": {"$ref": "#/__bundled__/add4768a604ef"}
}

__bundled__.add4768a604ef = {
  "type": "string",
  "examples": ["DCdIeow0xm73Ewnx..."]
}

Resolved header: name=authorization, required=true, description=api_key, type=string
```

Refs are never circular in practice (they follow a DAG: operation → body/header → schema → leaf types), but the depth limit provides safety.

### Service-to-Operation Mapping

The TOC is hierarchical: `http_operation` nodes are nested under their parent `http_service` in the `items` tree. When walking the TOC, track the current service name and pass it to each child operation. This provides the `service` field in the operation frontmatter.

The TOC walk looks like:
```
items[]:
  { type: "http_service", title: "Cortex Cloud Platform APIs", items: [
    { type: "group", title: "API Keys", items: [
      { type: "http_operation", title: "Get existing API keys", ... }
    ]}
  ]}
```

The orchestrator resolves this during TOC traversal, not at render time. If an `http_operation` node is not nested under any `http_service` (e.g., appears at the TOC root), the `service` frontmatter field is omitted.

### Server URL Selection

When `servers[]` contains multiple entries, use the first one. In practice, all observed Cortex Cloud APIs have a single server entry (`https://api-yourfqdn`). Operations may have their own `servers[]` which overrides the service-level server.

### File Numbering Strategy

File numbers are assigned based on TOC order and stored in the state file's `outputFile` field. Numbers are **stable across incremental runs**:

- On first run: assign `0001`, `0002`, ... in TOC order
- On incremental runs: changed nodes keep their existing number from the state file
- New nodes (not in previous state) get the next available number after the current maximum
- Deleted nodes: their output file is removed, the number is not reused (gaps are acceptable)
- On `--force` runs: the entire output directory is wiped and renumbered from scratch in TOC order

This avoids renumbering churn that would create noisy diffs in downstream systems.

### Schema Flattening Depth

Nested object schemas are flattened using dot-notation paths up to a **max depth of 5 levels**. Beyond that, the field is rendered as `[nested object]` in the Type column. Array items are denoted with `[]` (e.g., `request_data.filters[].field`).

**Key rendering decisions:**

- Schema flattening uses dot-notation paths (`request_data.filters[].field`) for readability
- `oneOf`/`anyOf` types rendered as `type1 | type2`
- `enum` values listed inline in the Description column
- All named request examples rendered as separate subsections
- Response examples included but may be truncated for very large payloads

## Script Structure

### `scripts/fetch_stoplight.js` — Main Fetcher

Orchestration logic:

1. Parse flags (`--product`, `--force`)
2. Load state from `metadata/api_specs_{product}.json`
3. Tier 1: fetch branch, compare `commitHash`, exit early if unchanged (unless `--force`)
4. Fetch TOC, filter to `article` + `http_service` + `http_operation`
5. Fetch nodes in batches (concurrency 10, 200ms delay between batches)
6. Tier 2: SHA-256 hash each node's `data`, skip unchanged nodes
7. Render changed nodes, write to `sources_fetch/api_specs_{product}/`
8. Remove output files for deleted nodes
9. Write updated state file

### `scripts/render_stoplight_node.js` — Pure Rendering Module

Exported functions:

- `renderArticle(node)` — frontmatter + raw markdown
- `renderHttpService(node)` — parse JSON data, render overview
- `renderHttpOperation(node, serviceName)` — parse JSON data, resolve `__bundled__` refs, flatten schemas to tables, extract examples

No side effects, no I/O. Takes a node object, returns a markdown string.

### `scripts/stoplight_config.js` — Project Config

Project IDs, workspace info, host URLs. Parsing of `--product` flag.

## CLI Interface

```
npm run fetch-api                          # all products
npm run fetch-api:cloud                    # cortex cloud only
npm run fetch-api -- --force               # all products, skip change detection
npm run fetch-api:cloud -- --force         # cortex cloud, skip change detection
```

`package.json` scripts:

```json
{
  "fetch-api": "node scripts/fetch_stoplight.js",
  "fetch-api:cloud": "node scripts/fetch_stoplight.js --product cloud"
}
```

## Dependencies

No new dependencies. Uses only Node.js built-ins:

- `https` — HTTP requests
- `crypto` — SHA-256 hashing
- `fs`, `path` — file I/O

## Testing

**Test file**: `scripts/render_stoplight_node.test.js` (tests the pure rendering module)

Run with: `node --test scripts/render_stoplight_node.test.js` (matches existing pattern)

The existing `test` script in `package.json` must be updated to include the new test file:

```json
{
  "test": "node --test scripts/generate_combined.test.js scripts/fetch_fluidtopics.test.js scripts/snapshot.test.js scripts/check.test.js scripts/render_stoplight_node.test.js"
}
```

**Scope** — rendering logic (the complex, bug-prone part):

- `renderArticle`: wraps markdown with correct frontmatter, preserves raw markdown content
- `renderHttpService`: extracts description, tags, server URL from JSON `data` string
- `renderHttpOperation`:
  - Resolves `__bundled__` refs into headers table
  - Flattens nested request body schema into dot-notation table (respects max depth of 5)
  - Extracts named request examples as JSON code blocks
  - Flattens response schema into table
  - Extracts response examples
  - Handles edge cases: missing examples, empty schemas, `oneOf`/`anyOf` types, missing `$ref` targets
- Content hashing: deterministic (same raw `data` string -> same SHA-256 hash)
- TOC filtering: only `article`, `http_service`, `http_operation` pass through; `model` and other types excluded

Additionally, `scripts/fetch_stoplight.js` exports a `filterTocNodes(items)` function and `hashContent(dataString)` function that are tested in the same file for TOC filtering and hashing determinism.

**Approach**: Feed real captured node JSON (from the Stoplight API) into render functions and assert on output structure. No HTTP mocking — pure transformation tests.
