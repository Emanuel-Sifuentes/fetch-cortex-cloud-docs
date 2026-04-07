# Stoplight API Spec Fetcher — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Programmatically fetch Cortex Cloud API specs from Stoplight, convert to RAG-friendly markdown, with two-tier change detection.

**Architecture:** Three modules — `stoplight_config.js` (project IDs + flag parsing), `render_stoplight_node.js` (pure markdown rendering, no I/O), `fetch_stoplight.js` (orchestration: HTTP, change detection, file I/O). Follows existing `fetch_fluidtopics.js` patterns.

**Tech Stack:** Node.js built-ins only (https, crypto, fs, path). No new npm dependencies.

**Design spec:** `docs/superpowers/specs/2026-03-25-stoplight-api-fetcher-design.md`

---

## File Structure

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `scripts/stoplight_config.js` | Project config, `--product`/`--force` flag parsing |
| Create | `scripts/render_stoplight_node.js` | Pure rendering: article, http_service, http_operation to markdown |
| Create | `scripts/fetch_stoplight.js` | Orchestration: HTTP, change detection, batching, file I/O. Exports `hashContent` and `filterTocNodes` for testing. |
| Create | `scripts/render_stoplight_node.test.js` | Tests for rendering + exported helpers from fetcher |
| Modify | `package.json` | Add `fetch-api`/`fetch-api:cloud` scripts, update `test` command |

---

### Task 1: Scaffolding — Config module + package.json scripts

**Files:**
- Create: `scripts/stoplight_config.js`
- Modify: `package.json`

- [ ] **Step 1: Create config module**

Create `scripts/stoplight_config.js`:

```js
const STOPLIGHT_PROJECTS = {
  cloud: {
    workspace: "cortex-panw",
    projectId: "cHJqOjI3NjQwOQ",
    slug: "cortex-cloud",
    host: "https://cortex-panw.stoplight.io",
  },
};

const VALID_PRODUCTS = Object.keys(STOPLIGHT_PROJECTS);

function parseStoplightFlags() {
  const args = process.argv;
  const productIdx = args.indexOf("--product");
  let product = null;
  if (productIdx !== -1 && productIdx + 1 < args.length) {
    product = args[productIdx + 1];
    if (!STOPLIGHT_PROJECTS[product]) {
      console.error(
        `Error: unknown product "${product}" -- choose from: ${VALID_PRODUCTS.join(", ")}`
      );
      process.exit(1);
    }
  }
  const force = args.includes("--force");
  return { product, force };
}

function resolveTargetProducts() {
  const { product } = parseStoplightFlags();
  return product ? [product] : VALID_PRODUCTS;
}

module.exports = {
  STOPLIGHT_PROJECTS,
  VALID_PRODUCTS,
  parseStoplightFlags,
  resolveTargetProducts,
};
```

Pattern follows `scripts/map_config.js` — separate from it because Stoplight has a different data model (project IDs vs map IDs).

- [ ] **Step 2: Add package.json scripts**

Add to the `"scripts"` object in `package.json`:

```json
"fetch-api": "node scripts/fetch_stoplight.js",
"fetch-api:cloud": "node scripts/fetch_stoplight.js --product cloud"
```

- [ ] **Step 3: Commit**

```bash
git add scripts/stoplight_config.js package.json
git commit -m "feat(stoplight): add config module and package.json scripts"
```

---

### Task 2: hashContent + filterTocNodes (TDD)

**Files:**
- Create: `scripts/render_stoplight_node.test.js`
- Create: `scripts/fetch_stoplight.js` (minimal — just exports)

- [ ] **Step 1: Write failing tests for hashContent**

Create `scripts/render_stoplight_node.test.js`:

```js
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { hashContent, filterTocNodes } = require("./fetch_stoplight.js");

describe("hashContent", () => {
  it("returns a sha256-prefixed hex digest", () => {
    const hash = hashContent("hello");
    assert.ok(hash.startsWith("sha256:"));
    assert.equal(hash.length, 7 + 64);
  });

  it("is deterministic — same input produces same hash", () => {
    assert.equal(hashContent("test data"), hashContent("test data"));
  });

  it("produces different hashes for different input", () => {
    assert.notEqual(hashContent("a"), hashContent("b"));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/render_stoplight_node.test.js`

Expected: FAIL — `Cannot find module './fetch_stoplight.js'`

- [ ] **Step 3: Implement hashContent**

Create `scripts/fetch_stoplight.js`:

```js
const crypto = require("crypto");

function hashContent(dataString) {
  return "sha256:" + crypto.createHash("sha256").update(dataString).digest("hex");
}

module.exports = { hashContent };
```

- [ ] **Step 4: Run test to verify hashContent passes**

Run: `node --test scripts/render_stoplight_node.test.js`

Expected: hashContent tests PASS. filterTocNodes tests FAIL (not yet exported).

- [ ] **Step 5: Write failing tests for filterTocNodes**

Append to test file:

```js
describe("filterTocNodes", () => {
  it("extracts article, http_service, and http_operation from nested TOC", () => {
    const items = [
      { type: "article", title: "Getting Started", slug: "article-1" },
      {
        type: "http_service",
        title: "Platform APIs",
        slug: "svc-1",
        items: [
          {
            type: "group",
            title: "API Keys",
            items: [
              { type: "http_operation", title: "Get keys", slug: "op-1" },
            ],
          },
        ],
      },
    ];
    const result = filterTocNodes(items);
    assert.equal(result.length, 3);
    assert.equal(result[0].type, "article");
    assert.equal(result[1].type, "http_service");
    assert.equal(result[2].type, "http_operation");
  });

  it("skips model nodes", () => {
    const items = [
      { type: "model", title: "SomeSchema", slug: "model-1" },
      { type: "article", title: "Intro", slug: "article-1" },
    ];
    const result = filterTocNodes(items);
    assert.equal(result.length, 1);
    assert.equal(result[0].type, "article");
  });

  it("attaches serviceName to operations nested under a service", () => {
    const items = [
      {
        type: "http_service",
        title: "My Service",
        slug: "svc-1",
        items: [
          { type: "http_operation", title: "Do thing", slug: "op-1" },
        ],
      },
    ];
    const result = filterTocNodes(items);
    const op = result.find((n) => n.type === "http_operation");
    assert.equal(op.serviceName, "My Service");
  });

  it("sets serviceName to null for operations not under a service", () => {
    const items = [
      { type: "http_operation", title: "Orphan op", slug: "op-1" },
    ];
    const result = filterTocNodes(items);
    assert.equal(result[0].serviceName, null);
  });

  it("preserves TOC order across nested levels", () => {
    const items = [
      { type: "article", title: "A", slug: "a" },
      {
        type: "http_service",
        title: "Svc",
        slug: "s",
        items: [{ type: "http_operation", title: "B", slug: "b" }],
      },
      { type: "article", title: "C", slug: "c" },
    ];
    const result = filterTocNodes(items);
    assert.deepEqual(
      result.map((n) => n.title),
      ["A", "Svc", "B", "C"]
    );
  });

  it("propagates serviceName through nested groups", () => {
    const items = [
      {
        type: "http_service",
        title: "Top Service",
        slug: "svc",
        items: [
          {
            type: "group",
            title: "Category A",
            items: [
              {
                type: "group",
                title: "Sub-Category",
                items: [
                  { type: "http_operation", title: "Deep Op", slug: "deep-op" },
                ],
              },
            ],
          },
        ],
      },
    ];
    const result = filterTocNodes(items);
    const op = result.find((n) => n.slug === "deep-op");
    assert.equal(op.serviceName, "Top Service");
  });
});
```

- [ ] **Step 6: Run test to verify filterTocNodes fails**

Run: `node --test scripts/render_stoplight_node.test.js`

Expected: FAIL — `filterTocNodes is not a function`

- [ ] **Step 7: Implement filterTocNodes**

Add to `scripts/fetch_stoplight.js`:

```js
const INCLUDED_TYPES = new Set(["article", "http_service", "http_operation"]);

function filterTocNodes(items, serviceName = null) {
  const result = [];
  for (const item of items) {
    const currentService =
      item.type === "http_service" ? item.title : serviceName;
    if (INCLUDED_TYPES.has(item.type)) {
      result.push({
        type: item.type,
        title: item.title,
        slug: item.slug,
        serviceName:
          item.type === "http_operation" ? currentService || null : null,
      });
    }
    if (item.items) {
      result.push(...filterTocNodes(item.items, currentService));
    }
  }
  return result;
}

module.exports = { hashContent, filterTocNodes };
```

- [ ] **Step 8: Run tests to verify all pass**

Run: `node --test scripts/render_stoplight_node.test.js`

Expected: ALL PASS

- [ ] **Step 9: Commit**

```bash
git add scripts/fetch_stoplight.js scripts/render_stoplight_node.test.js
git commit -m "feat(stoplight): add hashContent and filterTocNodes with tests"
```

---

### Task 3: renderArticle (TDD)

**Files:**
- Modify: `scripts/render_stoplight_node.test.js`
- Create: `scripts/render_stoplight_node.js`

- [ ] **Step 1: Write failing tests for renderArticle**

Add to `scripts/render_stoplight_node.test.js` — new require at the top and new describe block:

```js
const { renderArticle } = require("./render_stoplight_node.js");

describe("renderArticle", () => {
  it("wraps markdown data with correct frontmatter", () => {
    const node = {
      type: "article",
      title: "Create a new API key",
      slug: "28fuy7kt57f4d-create-a-new-api-key",
      data: "# Create a new API key\n\n1. In Cortex, navigate to **Settings** > API Keys.",
      sourceProject: "cortex-cloud",
    };
    const result = renderArticle(node);
    assert.ok(result.startsWith("---\n"));
    assert.ok(result.includes('title: "Create a new API key"'));
    assert.ok(result.includes("type: article"));
    assert.ok(result.includes('slug: "28fuy7kt57f4d-create-a-new-api-key"'));
    assert.ok(result.includes("sourceProject: cortex-cloud"));
    assert.ok(result.includes("# Create a new API key"));
    assert.ok(result.includes("1. In Cortex"));
  });

  it("escapes double quotes in title", () => {
    const node = {
      type: "article",
      title: 'Use the "advanced" mode',
      slug: "test-slug",
      data: "Content here.",
      sourceProject: "cortex-cloud",
    };
    const result = renderArticle(node);
    assert.ok(result.includes('title: "Use the \\"advanced\\" mode"'));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/render_stoplight_node.test.js`

Expected: FAIL — `Cannot find module './render_stoplight_node.js'`

- [ ] **Step 3: Implement renderArticle**

Create `scripts/render_stoplight_node.js`:

```js
function escapeTitle(title) {
  return title.replace(/"/g, '\\"');
}

function renderArticle(node) {
  const lines = [
    "---",
    `title: "${escapeTitle(node.title)}"`,
    "type: article",
    `slug: "${node.slug}"`,
    `sourceProject: ${node.sourceProject}`,
    "---",
    "",
    node.data,
    "",
  ];
  return lines.join("\n");
}

module.exports = { renderArticle };
```

- [ ] **Step 4: Run tests to verify all pass**

Run: `node --test scripts/render_stoplight_node.test.js`

Expected: ALL PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/render_stoplight_node.js scripts/render_stoplight_node.test.js
git commit -m "feat(stoplight): add renderArticle with tests"
```

---

### Task 4: renderHttpService (TDD)

**Files:**
- Modify: `scripts/render_stoplight_node.test.js`
- Modify: `scripts/render_stoplight_node.js`

- [ ] **Step 1: Write failing tests for renderHttpService**

Update the require at top of test file to include `renderHttpService`:

```js
const { renderArticle, renderHttpService } = require("./render_stoplight_node.js");
```

Add describe block:

```js
describe("renderHttpService", () => {
  it("renders service overview with frontmatter, description, and categories", () => {
    const node = {
      type: "http_service",
      title: "Cortex Cloud Platform APIs",
      slug: "f70loiyd8u1m2-cortex-cloud-platform-ap-is",
      sourceProject: "cortex-cloud",
      data: JSON.stringify({
        name: "Cortex Cloud Platform APIs",
        description: "You can configure and manage authentication settings.",
        tags: [
          { name: "API Keys", description: "APIs for managing API keys" },
          { name: "Asset groups", description: "APIs for managing asset groups" },
        ],
        servers: [{ url: "https://api-yourfqdn" }],
      }),
    };
    const result = renderHttpService(node);
    assert.ok(result.includes('title: "Cortex Cloud Platform APIs"'));
    assert.ok(result.includes("type: http_service"));
    assert.ok(result.includes('serverUrl: "https://api-yourfqdn"'));
    assert.ok(result.includes("sourceProject: cortex-cloud"));
    assert.ok(result.includes("# Cortex Cloud Platform APIs"));
    assert.ok(result.includes("You can configure and manage"));
    assert.ok(result.includes("## API Categories"));
    assert.ok(result.includes("- **API Keys** \u2014 APIs for managing API keys"));
    assert.ok(result.includes("- **Asset groups** \u2014 APIs for managing asset groups"));
  });

  it("omits categories section when tags are empty", () => {
    const node = {
      type: "http_service",
      title: "Minimal Service",
      slug: "min-svc",
      sourceProject: "cortex-cloud",
      data: JSON.stringify({
        name: "Minimal Service",
        description: "A minimal service.",
        tags: [],
        servers: [{ url: "https://api-yourfqdn" }],
      }),
    };
    const result = renderHttpService(node);
    assert.ok(!result.includes("## API Categories"));
  });

  it("omits serverUrl when no servers present", () => {
    const node = {
      type: "http_service",
      title: "No Server",
      slug: "no-srv",
      sourceProject: "cortex-cloud",
      data: JSON.stringify({
        name: "No Server",
        description: "Desc.",
        tags: [],
        servers: [],
      }),
    };
    const result = renderHttpService(node);
    assert.ok(!result.includes("serverUrl"));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/render_stoplight_node.test.js`

Expected: FAIL — `renderHttpService is not a function`

- [ ] **Step 3: Implement renderHttpService**

Add to `scripts/render_stoplight_node.js`:

```js
function renderHttpService(node) {
  const data = JSON.parse(node.data);
  const serverUrl = data.servers?.[0]?.url || "";
  const lines = [
    "---",
    `title: "${escapeTitle(node.title)}"`,
    "type: http_service",
    `slug: "${node.slug}"`,
    `sourceProject: ${node.sourceProject}`,
  ];
  if (serverUrl) lines.push(`serverUrl: "${serverUrl}"`);
  lines.push("---", "", `# ${data.name || node.title}`, "");
  if (data.description) lines.push(data.description, "");
  if (data.tags && data.tags.length > 0) {
    lines.push("## API Categories", "");
    for (const tag of data.tags) {
      lines.push(`- **${tag.name}** \u2014 ${tag.description}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}
```

Update module.exports:

```js
module.exports = { renderArticle, renderHttpService };
```

- [ ] **Step 4: Run tests to verify all pass**

Run: `node --test scripts/render_stoplight_node.test.js`

Expected: ALL PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/render_stoplight_node.js scripts/render_stoplight_node.test.js
git commit -m "feat(stoplight): add renderHttpService with tests"
```

---

### Task 5: renderHttpOperation — Core Rendering (TDD)

The most complex task. Build incrementally: frontmatter, then headers, then request body with schema flattening, then examples, then responses. Internal helpers (`resolveRef`, `flattenSchema`) are tested through the public `renderHttpOperation` function.

**Files:**
- Modify: `scripts/render_stoplight_node.test.js`
- Modify: `scripts/render_stoplight_node.js`

#### Test fixture

Define this factory at the top of the test file (after require statements). It produces a realistic operation node based on the "Get existing API keys" example from the design spec:

```js
function makeOperationNode(overrides = {}) {
  const defaults = {
    type: "http_operation",
    title: "Get existing API keys",
    slug: "c3ehigek4t4fk-get-existing-api-keys",
    sourceProject: "cortex-cloud",
    data: JSON.stringify({
      method: "post",
      path: "/public_api/v1/api_keys/get_api_keys",
      description:
        "Get a list of API keys filtered by expiration date, role, or ID.",
      servers: [{ url: "https://api-yourfqdn" }],
      request: {
        headers: [
          { $ref: "#/__bundled__/header_auth" },
          { $ref: "#/__bundled__/header_auth_id" },
        ],
        body: {
          content: {
            "application/json": {
              schema: { $ref: "#/__bundled__/req_body" },
              examples: {
                "Get API keys and filter by expiration": {
                  value: {
                    request_data: {
                      filters: [
                        {
                          field: "expiration",
                          operator: "gte",
                          value: 1721149909250,
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: { $ref: "#/__bundled__/resp_body" },
              examples: {
                default: {
                  value: {
                    reply: { DATA: [], FILTER_COUNT: 3, TOTAL_COUNT: 70 },
                  },
                },
              },
            },
          },
        },
      },
      __bundled__: {
        header_auth: {
          name: "authorization",
          description: "api_key",
          required: true,
          schema: { $ref: "#/__bundled__/string_type" },
        },
        header_auth_id: {
          name: "x-xdr-auth-id",
          description: "api_key_id",
          required: true,
          schema: { type: "string" },
        },
        string_type: { type: "string" },
        req_body: {
          type: "object",
          required: ["request_data"],
          properties: {
            request_data: {
              type: "object",
              properties: {
                filters: {
                  type: "array",
                  description: "An array of filter fields.",
                  items: {
                    type: "object",
                    properties: {
                      field: {
                        type: "string",
                        enum: ["expiration", "roles", "id"],
                      },
                      operator: {
                        type: "string",
                        enum: ["gte", "lte", "contains", "in"],
                      },
                      value: {
                        oneOf: [{ type: "integer" }, { type: "array" }],
                      },
                    },
                  },
                },
              },
            },
          },
        },
        resp_body: {
          type: "object",
          properties: {
            reply: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      roles: {
                        type: "array",
                        items: { type: "string" },
                      },
                    },
                  },
                },
                filter_count: { type: "integer" },
                total_count: {
                  type: "integer",
                  description:
                    "Note: contains all API Keys, including expired.",
                },
              },
            },
          },
        },
      },
    }),
  };
  return { ...defaults, ...overrides };
}
```

Also update the require to include `renderHttpOperation`:

```js
const {
  renderArticle,
  renderHttpService,
  renderHttpOperation,
} = require("./render_stoplight_node.js");
```

#### TDD cycle 1 — Frontmatter + method line + description

- [ ] **Step 1: Write failing test for basic structure**

```js
describe("renderHttpOperation", () => {
  it("renders frontmatter with method, path, service, and serverUrl", () => {
    const node = makeOperationNode();
    const result = renderHttpOperation(node, {
      serviceName: "Cortex Cloud Platform APIs",
      serverUrl: "",
    });
    assert.ok(result.includes('title: "Get existing API keys"'));
    assert.ok(result.includes("type: http_operation"));
    assert.ok(result.includes("method: post"));
    assert.ok(result.includes('path: "/public_api/v1/api_keys/get_api_keys"'));
    assert.ok(result.includes('service: "Cortex Cloud Platform APIs"'));
    assert.ok(result.includes('serverUrl: "https://api-yourfqdn"'));
    assert.ok(result.includes("sourceProject: cortex-cloud"));
    assert.ok(result.includes("# Get existing API keys"));
    assert.ok(
      result.includes("**`POST /public_api/v1/api_keys/get_api_keys`**")
    );
    assert.ok(result.includes("Get a list of API keys"));
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/render_stoplight_node.test.js`

Expected: FAIL — `renderHttpOperation is not a function`

- [ ] **Step 3: Implement skeleton with internal helpers**

Add to `scripts/render_stoplight_node.js`:

```js
function resolveRefDeep(obj, bundled, depth = 0) {
  if (depth > 10) return obj;
  if (obj && obj.$ref) {
    const key = obj.$ref.replace("#/__bundled__/", "");
    const resolved = bundled[key];
    if (!resolved) return { _unresolved: key };
    return resolveRefDeep(resolved, bundled, depth + 1);
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => resolveRefDeep(item, bundled, depth));
  }
  if (obj && typeof obj === "object") {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = k === "__bundled__" ? v : resolveRefDeep(v, bundled, depth);
    }
    return result;
  }
  return obj;
}

function renderHttpOperation(node, { serviceName, serverUrl }) {
  const data = JSON.parse(node.data);
  const bundled = data.__bundled__ || {};
  const effectiveServerUrl = data.servers?.[0]?.url || serverUrl || "";
  const method = (data.method || "get").toLowerCase();

  const lines = [
    "---",
    `title: "${escapeTitle(node.title)}"`,
    "type: http_operation",
    `method: ${method}`,
    `path: "${data.path}"`,
  ];
  if (serviceName) lines.push(`service: "${escapeTitle(serviceName)}"`);
  lines.push(`slug: "${node.slug}"`);
  lines.push(`sourceProject: ${node.sourceProject}`);
  if (effectiveServerUrl) lines.push(`serverUrl: "${effectiveServerUrl}"`);
  lines.push("---", "");
  lines.push(`# ${node.title}`, "");
  lines.push(`**\`${method.toUpperCase()} ${data.path}\`**`, "");
  if (data.description) lines.push(data.description, "");

  return lines.join("\n");
}
```

Update module.exports:

```js
module.exports = { renderArticle, renderHttpService, renderHttpOperation };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/render_stoplight_node.test.js`

Expected: PASS

#### TDD cycle 2 — Request headers

- [ ] **Step 5: Write failing test for headers**

```js
  it("renders request headers table from bundled refs", () => {
    const node = makeOperationNode();
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "",
    });
    assert.ok(result.includes("## Request Headers"));
    assert.ok(result.includes("| Name | Required | Description |"));
    assert.ok(result.includes("| authorization | yes | api_key |"));
    assert.ok(result.includes("| x-xdr-auth-id | yes | api_key_id |"));
  });
```

- [ ] **Step 6: Run test to verify it fails**

- [ ] **Step 7: Implement header rendering**

Add to `renderHttpOperation`, after the description block and before `return`:

```js
  // Request headers
  const headers = data.request?.headers || [];
  if (headers.length > 0) {
    lines.push("## Request Headers", "");
    lines.push("| Name | Required | Description |");
    lines.push("|------|----------|-------------|");
    for (const headerRef of headers) {
      const header = resolveRefDeep(headerRef, bundled);
      if (header._unresolved) {
        lines.push(
          `| [unresolved ref: ${header._unresolved}] | - | - |`
        );
        continue;
      }
      const req = header.required ? "yes" : "no";
      lines.push(`| ${header.name} | ${req} | ${header.description || ""} |`);
    }
    lines.push("");
  }
```

- [ ] **Step 8: Run tests to verify headers pass**

#### TDD cycle 3 — Request body with schema flattening

- [ ] **Step 9: Write failing test for request body**

```js
  it("renders request body schema as flattened dot-notation table", () => {
    const node = makeOperationNode();
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "",
    });
    assert.ok(result.includes("## Request Body (`application/json`)"));
    assert.ok(result.includes("| Field | Type | Required | Description |"));
    assert.ok(result.includes("| request_data | object | yes |"));
    assert.ok(
      result.includes(
        "| request_data.filters | array | no | An array of filter fields. |"
      )
    );
    assert.ok(result.includes("| request_data.filters[].field | string | no |"));
    assert.ok(
      result.includes("enum: `expiration`, `roles`, `id`")
    );
    assert.ok(
      result.includes("| request_data.filters[].operator | string | no |")
    );
  });
```

- [ ] **Step 10: Run test to verify it fails**

- [ ] **Step 11: Implement flattenSchema + request body rendering**

Add `flattenSchema` function:

```js
function flattenSchema(schema, bundled, prefix = "", depth = 0) {
  if (depth > 5) {
    return [
      {
        field: prefix || "(root)",
        type: "[nested object]",
        required: false,
        description: "",
      },
    ];
  }
  const rows = [];
  const resolved = resolveRefDeep(schema, bundled);
  if (!resolved || !resolved.properties) return rows;

  const requiredSet = new Set(resolved.required || []);
  for (const [name, prop] of Object.entries(resolved.properties)) {
    const fieldPath = prefix ? `${prefix}.${name}` : name;
    const resolvedProp = resolveRefDeep(prop, bundled);
    const isRequired = requiredSet.has(name);
    let desc = resolvedProp.description || "";

    if (resolvedProp.type === "object" && resolvedProp.properties) {
      rows.push({
        field: fieldPath,
        type: "object",
        required: isRequired,
        description: desc,
      });
      rows.push(...flattenSchema(resolvedProp, bundled, fieldPath, depth + 1));
    } else if (resolvedProp.type === "array") {
      rows.push({
        field: fieldPath,
        type: "array",
        required: isRequired,
        description: desc,
      });
      const items = resolveRefDeep(resolvedProp.items || {}, bundled);
      if (items.type === "object" && items.properties) {
        rows.push(
          ...flattenSchema(items, bundled, `${fieldPath}[]`, depth + 1)
        );
      }
    } else {
      let type = resolvedProp.type || "any";
      if (resolvedProp.oneOf || resolvedProp.anyOf) {
        const variants = (resolvedProp.oneOf || resolvedProp.anyOf).map(
          (v) => resolveRefDeep(v, bundled).type || "any"
        );
        type = variants.join(" \\| ");
      }
      if (resolvedProp.enum) {
        const enumStr = resolvedProp.enum.map((e) => `\`${e}\``).join(", ");
        desc = desc ? `${desc} enum: ${enumStr}` : `enum: ${enumStr}`;
      }
      rows.push({ field: fieldPath, type, required: isRequired, description: desc });
    }
  }
  return rows;
}
```

Add request body rendering to `renderHttpOperation` (after headers, before `return`):

```js
  // Request body
  const bodyContent = data.request?.body?.content;
  if (bodyContent) {
    const contentType = Object.keys(bodyContent)[0] || "application/json";
    const mediaType = bodyContent[contentType];
    if (mediaType?.schema) {
      lines.push(`## Request Body (\`${contentType}\`)`, "");
      lines.push("| Field | Type | Required | Description |");
      lines.push("|-------|------|----------|-------------|");
      const rows = flattenSchema(mediaType.schema, bundled);
      for (const row of rows) {
        lines.push(
          `| ${row.field} | ${row.type} | ${row.required ? "yes" : "no"} | ${row.description} |`
        );
      }
      lines.push("");
    }
  }
```

Note: `flattenSchema` receives the raw schema ref — it will resolve `$ref` internally.

- [ ] **Step 12: Run tests to verify request body passes**

#### TDD cycle 4 — oneOf types

- [ ] **Step 13: Write failing test for oneOf rendering**

```js
  it("renders oneOf types as pipe-separated in request body", () => {
    const node = makeOperationNode();
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "",
    });
    // The "value" field has oneOf: [integer, array]
    // In markdown tables, | must be escaped as \|
    assert.ok(result.includes("integer \\| array"));
  });
```

- [ ] **Step 14: Run test — should already pass** if `flattenSchema` handles `oneOf` (implemented in step 11)

#### TDD cycle 5 — Request examples

- [ ] **Step 15: Write failing test for request examples**

```js
  it("renders named request examples as code blocks", () => {
    const node = makeOperationNode();
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "",
    });
    assert.ok(
      result.includes(
        "### Request Example \u2014 Get API keys and filter by expiration"
      )
    );
    assert.ok(result.includes("```json"));
    assert.ok(result.includes('"field": "expiration"'));
  });
```

- [ ] **Step 16: Run test to verify it fails**

- [ ] **Step 17: Implement request example rendering**

Add after request body table (still inside the `if (bodyContent)` block):

```js
    // Request examples
    if (mediaType?.examples) {
      for (const [name, example] of Object.entries(mediaType.examples)) {
        lines.push(`### Request Example \u2014 ${name}`, "");
        lines.push("```json");
        lines.push(JSON.stringify(example.value, null, 2));
        lines.push("```", "");
      }
    }
```

- [ ] **Step 18: Run tests to verify examples pass**

#### TDD cycle 6 — Response schema + examples

- [ ] **Step 19: Write failing test for response**

```js
  it("renders response schema and examples", () => {
    const node = makeOperationNode();
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "",
    });
    assert.ok(result.includes("## Response (200 OK)"));
    assert.ok(result.includes("| Field | Type | Description |"));
    assert.ok(result.includes("| reply.data | array |"));
    assert.ok(result.includes("| reply.data[].id | integer |"));
    assert.ok(result.includes("| reply.data[].roles | array of strings |"));
    assert.ok(
      result.includes(
        "| reply.total_count | integer | Note: contains all API Keys, including expired. |"
      )
    );
    assert.ok(result.includes("### Response Example"));
    assert.ok(result.includes('"TOTAL_COUNT": 70'));
  });
```

- [ ] **Step 20: Run test to verify it fails**

- [ ] **Step 21: Implement response rendering**

Add `flattenResponseSchema` (like `flattenSchema` but no `required` field, and arrays of primitives become `"array of {type}s"`):

```js
function flattenResponseSchema(schema, bundled, prefix = "", depth = 0) {
  if (depth > 5) {
    return [
      { field: prefix || "(root)", type: "[nested object]", description: "" },
    ];
  }
  const rows = [];
  const resolved = resolveRefDeep(schema, bundled);
  if (!resolved || !resolved.properties) return rows;

  for (const [name, prop] of Object.entries(resolved.properties)) {
    const fieldPath = prefix ? `${prefix}.${name}` : name;
    const resolvedProp = resolveRefDeep(prop, bundled);
    const desc = resolvedProp.description || "";

    if (resolvedProp.type === "object" && resolvedProp.properties) {
      rows.push({ field: fieldPath, type: "object", description: desc });
      rows.push(
        ...flattenResponseSchema(resolvedProp, bundled, fieldPath, depth + 1)
      );
    } else if (resolvedProp.type === "array") {
      const items = resolveRefDeep(resolvedProp.items || {}, bundled);
      if (items.type === "object" && items.properties) {
        rows.push({ field: fieldPath, type: "array", description: desc });
        rows.push(
          ...flattenResponseSchema(items, bundled, `${fieldPath}[]`, depth + 1)
        );
      } else {
        const itemType = items.type || "any";
        rows.push({
          field: fieldPath,
          type: `array of ${itemType}s`,
          description: desc,
        });
      }
    } else {
      let type = resolvedProp.type || "any";
      if (resolvedProp.oneOf || resolvedProp.anyOf) {
        const variants = (resolvedProp.oneOf || resolvedProp.anyOf).map(
          (v) => resolveRefDeep(v, bundled).type || "any"
        );
        type = variants.join(" \\| ");
      }
      rows.push({ field: fieldPath, type, description: desc });
    }
  }
  return rows;
}
```

Add response rendering to `renderHttpOperation` (after request body, before `return`):

```js
  // Responses
  if (data.responses) {
    for (const [status, response] of Object.entries(data.responses)) {
      const statusText = response.description || "";
      lines.push(
        `## Response (${status}${statusText ? " " + statusText : ""})`,
        ""
      );
      const respContent = response.content;
      if (respContent) {
        const respContentType = Object.keys(respContent)[0];
        const respMedia = respContent[respContentType];
        if (respMedia?.schema) {
          lines.push("| Field | Type | Description |");
          lines.push("|-------|------|-------------|");
          const respRows = flattenResponseSchema(respMedia.schema, bundled);
          for (const row of respRows) {
            lines.push(`| ${row.field} | ${row.type} | ${row.description} |`);
          }
          lines.push("");
        }
        if (respMedia?.examples) {
          for (const [name, example] of Object.entries(respMedia.examples)) {
            const label =
              name === "default"
                ? "Response Example"
                : `Response Example \u2014 ${name}`;
            lines.push(`### ${label}`, "");
            lines.push("```json");
            lines.push(JSON.stringify(example.value, null, 2));
            lines.push("```", "");
          }
        }
      }
    }
  }
```

- [ ] **Step 22: Run tests to verify all pass**

Run: `node --test scripts/render_stoplight_node.test.js`

Expected: ALL PASS

- [ ] **Step 23: Commit**

```bash
git add scripts/render_stoplight_node.js scripts/render_stoplight_node.test.js
git commit -m "feat(stoplight): add renderHttpOperation with ref resolution and schema flattening"
```

---

### Task 6: renderHttpOperation — Edge Cases (TDD)

**Files:**
- Modify: `scripts/render_stoplight_node.test.js`
- Modify: `scripts/render_stoplight_node.js` (if fixes needed)

- [ ] **Step 1: Write edge case tests**

```js
describe("renderHttpOperation edge cases", () => {
  it("uses operation-level serverUrl over fallback", () => {
    const node = makeOperationNode();
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "https://fallback",
    });
    assert.ok(result.includes('serverUrl: "https://api-yourfqdn"'));
    assert.ok(!result.includes("fallback"));
  });

  it("falls back to passed serverUrl when operation has no servers", () => {
    const data = JSON.parse(makeOperationNode().data);
    delete data.servers;
    const node = makeOperationNode({ data: JSON.stringify(data) });
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "https://fallback-url",
    });
    assert.ok(result.includes('serverUrl: "https://fallback-url"'));
  });

  it("omits service from frontmatter when serviceName is null", () => {
    const node = makeOperationNode();
    const result = renderHttpOperation(node, {
      serviceName: null,
      serverUrl: "",
    });
    assert.ok(!result.includes("service:"));
  });

  it("handles operation with no request body", () => {
    const data = JSON.parse(makeOperationNode().data);
    delete data.request.body;
    const node = makeOperationNode({ data: JSON.stringify(data) });
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "",
    });
    assert.ok(!result.includes("## Request Body"));
    assert.ok(result.includes("## Request Headers"));
  });

  it("handles operation with no headers", () => {
    const data = JSON.parse(makeOperationNode().data);
    data.request.headers = [];
    const node = makeOperationNode({ data: JSON.stringify(data) });
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "",
    });
    assert.ok(!result.includes("## Request Headers"));
  });

  it("handles operation with no examples", () => {
    const data = JSON.parse(makeOperationNode().data);
    delete data.request.body.content["application/json"].examples;
    const node = makeOperationNode({ data: JSON.stringify(data) });
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "",
    });
    assert.ok(!result.includes("### Request Example"));
  });

  it("renders [nested object] when schema depth exceeds 5", () => {
    const deepSchema = {
      type: "object",
      properties: {
        a: {
          type: "object",
          properties: {
            b: {
              type: "object",
              properties: {
                c: {
                  type: "object",
                  properties: {
                    d: {
                      type: "object",
                      properties: {
                        e: {
                          type: "object",
                          properties: {
                            f: {
                              type: "object",
                              properties: { g: { type: "string" } },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    const data = {
      method: "post",
      path: "/deep",
      description: "",
      request: {
        headers: [],
        body: {
          content: { "application/json": { schema: deepSchema } },
        },
      },
      responses: {},
      __bundled__: {},
    };
    const node = makeOperationNode({ data: JSON.stringify(data) });
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "",
    });
    assert.ok(result.includes("[nested object]"));
  });

  it("handles missing $ref targets gracefully", () => {
    const data = {
      method: "get",
      path: "/missing-ref",
      description: "",
      request: {
        headers: [{ $ref: "#/__bundled__/nonexistent" }],
      },
      responses: {},
      __bundled__: {},
    };
    const node = makeOperationNode({ data: JSON.stringify(data) });
    // Should not throw
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "",
    });
    assert.ok(result.includes("[unresolved ref: nonexistent]"));
  });

  it("renders anyOf types as pipe-separated", () => {
    const data = JSON.parse(makeOperationNode().data);
    // Replace oneOf with anyOf on the value field
    data.__bundled__.req_body.properties.request_data.properties.filters.items.properties.value = {
      anyOf: [{ type: "string" }, { type: "number" }],
    };
    const node = makeOperationNode({ data: JSON.stringify(data) });
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "",
    });
    assert.ok(result.includes("string \\| number"));
  });

  it("handles operation with no request at all", () => {
    const data = {
      method: "get",
      path: "/simple",
      description: "A simple GET.",
      responses: {},
      __bundled__: {},
    };
    const node = makeOperationNode({ data: JSON.stringify(data) });
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "",
    });
    assert.ok(result.includes("# Get existing API keys"));
    assert.ok(result.includes("A simple GET."));
    assert.ok(!result.includes("## Request Headers"));
    assert.ok(!result.includes("## Request Body"));
  });
});
```

- [ ] **Step 2: Run tests — fix any failures**

Run: `node --test scripts/render_stoplight_node.test.js`

Most should already pass from Task 5's implementation. Fix any failures (likely the "missing ref" test — ensure the unresolved ref path in header rendering works).

- [ ] **Step 3: Commit**

```bash
git add scripts/render_stoplight_node.js scripts/render_stoplight_node.test.js
git commit -m "feat(stoplight): add renderHttpOperation edge case tests"
```

---

### Task 7: Fetcher Orchestration

**Files:**
- Modify: `scripts/fetch_stoplight.js`

This task implements the full I/O orchestration: HTTP fetching, two-tier change detection, batched node fetching, file writes, state management. No new tests — this is I/O glue calling already-tested logic.

Follow patterns from `scripts/fetch_fluidtopics.js` (same https wrapper, same batch pattern) and `scripts/snapshot.js` (same readState/writeState pattern).

- [ ] **Step 1: Implement the complete fetch_stoplight.js**

The file already has `hashContent` and `filterTocNodes` from Task 2. Add the remaining orchestration code. The complete file structure:

```js
const https = require("https");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const {
  STOPLIGHT_PROJECTS,
  parseStoplightFlags,
} = require("./stoplight_config.js");
const {
  renderArticle,
  renderHttpService,
  renderHttpOperation,
} = require("./render_stoplight_node.js");

const METADATA_DIR = path.join(__dirname, "..", "metadata");
const OUT_BASE = path.join(__dirname, "..", "sources_fetch");
const CONCURRENCY = 10;
const DELAY_MS = 200;
const INCLUDED_TYPES = new Set(["article", "http_service", "http_operation"]);

// --- Already implemented in Task 2 ---
function hashContent(dataString) { /* ... */ }
function filterTocNodes(items, serviceName = null) { /* ... */ }

// --- New code ---
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function sanitizeFilename(title) {
  return title
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 120);
}

class HttpError extends Error {
  constructor(statusCode, url) {
    super(`HTTP ${statusCode} for ${url}`);
    this.statusCode = statusCode;
  }
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    https
      .get(
        {
          hostname: parsed.hostname,
          path: parsed.pathname + parsed.search,
          headers: { Accept: "application/json" },
        },
        (res) => {
          if (res.statusCode !== 200) {
            res.resume();
            return reject(new HttpError(res.statusCode, url));
          }
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          // Note: JSON.parse preserves string-typed fields. The Stoplight API
          // returns `data` as a JSON string value (not embedded JSON), so after
          // parsing the outer response, `data` remains a string — suitable for
          // deterministic hashing via hashContent().
          res.on("end", () =>
            resolve(JSON.parse(Buffer.concat(chunks).toString()))
          );
        }
      )
      .on("error", reject);
  });
}

// Retries on 5xx/network errors (individual request). 429 is handled at
// the batch level in fetchProduct() per the spec: "pause 5s and retry
// the entire batch."
async function httpGetWithRetry(url) {
  try {
    return await httpGet(url);
  } catch (err) {
    if (err.statusCode && err.statusCode >= 500) {
      await sleep(1000);
      return await httpGet(url);
    }
    if (!(err instanceof HttpError)) {
      // Network error — retry once
      await sleep(1000);
      return await httpGet(url);
    }
    throw err;
  }
}

function readState(product) {
  const filePath = path.join(METADATA_DIR, `api_specs_${product}.json`);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    if (err.code === "ENOENT") return null;
    throw err;
  }
}

function writeState(product, state) {
  fs.mkdirSync(METADATA_DIR, { recursive: true });
  const filePath = path.join(METADATA_DIR, `api_specs_${product}.json`);
  fs.writeFileSync(
    filePath,
    JSON.stringify(state, null, 2) + "\n",
    "utf-8"
  );
}

async function fetchProduct(productKey, force) {
  const config = STOPLIGHT_PROJECTS[productKey];
  const outDir = path.join(OUT_BASE, `api_specs_${productKey}`);
  const state = readState(productKey);

  // --- Tier 1: branch commit hash ---
  console.log(`\nFetching branch info for ${productKey}...`);
  const branchUrl = `${config.host}/api/v1/projects/${config.projectId}/branches`;
  const branchData = await httpGetWithRetry(branchUrl);
  const mainBranch = branchData.items?.[0] || branchData[0] || {};
  const commitHash = mainBranch.commit_hash || "";
  const updatedAt = mainBranch.updated_at || "";

  if (!force && state && state.commitHash === commitHash) {
    console.log(
      `  ${productKey}: no changes (commit ${commitHash.slice(0, 12)})`
    );
    return;
  }
  console.log(`  ${productKey}: changes detected, fetching TOC...`);

  // --- Fetch TOC ---
  const tocUrl = `${config.host}/api/v1/projects/${config.projectId}/table-of-contents`;
  const toc = await httpGetWithRetry(tocUrl);
  const tocNodes = filterTocNodes(toc.items || []);
  console.log(`  Found ${tocNodes.length} nodes to process`);

  // --- Fetch all nodes in batches ---
  const fetchedNodes = [];
  const failedSlugs = new Set();

  async function fetchBatch(batch) {
    return Promise.allSettled(
      batch.map(async (tocNode) => {
        const nodeUrl = `${config.host}/api/v1/projects/${config.projectId}/nodes/${tocNode.slug}`;
        const nodeData = await httpGetWithRetry(nodeUrl);
        return { ...tocNode, data: nodeData.data, id: nodeData.id };
      })
    );
  }

  for (let i = 0; i < tocNodes.length; i += CONCURRENCY) {
    const batch = tocNodes.slice(i, i + CONCURRENCY);
    let results = await fetchBatch(batch);

    // Spec: "On HTTP 429, pause 5s and retry the entire batch."
    const has429 = results.some(
      (r) => r.status === "rejected" && r.reason?.statusCode === 429
    );
    if (has429) {
      console.log("  Rate limited, waiting 5s and retrying batch...");
      await sleep(5000);
      results = await fetchBatch(batch);
    }

    for (let j = 0; j < results.length; j++) {
      if (results[j].status === "fulfilled") {
        fetchedNodes.push(results[j].value);
      } else {
        console.warn(
          `  WARNING: failed to fetch ${batch[j].slug}: ${results[j].reason?.message}`
        );
        failedSlugs.add(batch[j].slug);
      }
    }
    if (i + CONCURRENCY < tocNodes.length) await sleep(DELAY_MS);
  }

  // --- Build service serverUrl map ---
  const serviceServerUrls = {};
  for (const node of fetchedNodes) {
    if (node.type === "http_service") {
      try {
        const svcData = JSON.parse(node.data);
        serviceServerUrls[node.title] = svcData.servers?.[0]?.url || "";
      } catch {}
    }
  }

  // --- Tier 2: per-node content hashing ---
  const oldNodes = state?.nodes || {};
  const newNodes = {};
  const changedNodes = [];

  // Determine max existing file number for incremental numbering
  let maxNumber = 0;
  for (const entry of Object.values(oldNodes)) {
    const match = entry.outputFile?.match(/^(\d+)-/);
    if (match) maxNumber = Math.max(maxNumber, parseInt(match[1], 10));
  }

  fs.mkdirSync(outDir, { recursive: true });

  if (force) {
    // Wipe and renumber from scratch
    const existing = fs.readdirSync(outDir).filter((f) => f.endsWith(".md"));
    for (const f of existing) fs.unlinkSync(path.join(outDir, f));
    maxNumber = 0;
  }

  let fileNumber = force ? 0 : maxNumber;

  for (const node of fetchedNodes) {
    const contentHash = hashContent(node.data);
    const oldEntry = oldNodes[node.slug];
    const isChanged =
      !oldEntry || oldEntry.contentHash !== contentHash || force;

    // Assign output filename (stable numbering)
    let outputFile;
    if (force) {
      fileNumber++;
      outputFile = `${String(fileNumber).padStart(4, "0")}-${sanitizeFilename(node.title)}.md`;
    } else if (oldEntry?.outputFile) {
      outputFile = oldEntry.outputFile;
    } else {
      fileNumber = Math.max(fileNumber, maxNumber) + 1;
      maxNumber = fileNumber;
      outputFile = `${String(fileNumber).padStart(4, "0")}-${sanitizeFilename(node.title)}.md`;
    }

    newNodes[node.slug] = {
      contentHash,
      type: node.type,
      title: node.title,
      outputFile,
    };

    if (!isChanged) continue;
    changedNodes.push(node);

    // Render
    const enrichedNode = { ...node, sourceProject: config.slug };
    let md;
    if (node.type === "article") {
      md = renderArticle(enrichedNode);
    } else if (node.type === "http_service") {
      md = renderHttpService(enrichedNode);
    } else if (node.type === "http_operation") {
      const srvUrl = serviceServerUrls[node.serviceName] || "";
      md = renderHttpOperation(enrichedNode, {
        serviceName: node.serviceName,
        serverUrl: srvUrl,
      });
    }

    fs.writeFileSync(path.join(outDir, outputFile), md, "utf-8");
    console.log(`  [${node.type}] ${outputFile}`);
  }

  // --- Remove files for deleted nodes ---
  const currentSlugs = new Set(fetchedNodes.map((n) => n.slug));
  for (const [slug, entry] of Object.entries(oldNodes)) {
    if (!currentSlugs.has(slug) && !failedSlugs.has(slug)) {
      const filepath = path.join(outDir, entry.outputFile);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        console.log(`  Removed: ${entry.outputFile}`);
      }
    }
  }

  // --- Write state ---
  const renderedCount = Object.keys(newNodes).length;
  writeState(productKey, {
    version: 1,
    source: "stoplight",
    projectId: config.projectId,
    commitHash,
    updatedAt,
    fetchedAt: new Date().toISOString(),
    nodeCount: renderedCount,
    nodes: newNodes,
  });

  console.log(
    `  ${productKey}: ${changedNodes.length} changed, ${renderedCount} total`
  );
}

async function main() {
  const { product, force } = parseStoplightFlags();
  const products = product ? [product] : Object.keys(STOPLIGHT_PROJECTS);

  for (const p of products) {
    await fetchProduct(p, force);
  }
  console.log("\nDone.");
}

module.exports = { hashContent, filterTocNodes };

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
```

- [ ] **Step 2: Verify existing tests still pass**

Run: `node --test scripts/render_stoplight_node.test.js`

Expected: ALL PASS (we only added orchestration code, exports unchanged)

- [ ] **Step 3: Commit**

```bash
git add scripts/fetch_stoplight.js
git commit -m "feat(stoplight): add fetcher orchestration with two-tier change detection"
```

---

### Task 8: Final Wiring + Verification

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update test script in package.json**

Update the `"test"` script to include the new test file:

```json
"test": "node --test scripts/generate_combined.test.js scripts/fetch_fluidtopics.test.js scripts/snapshot.test.js scripts/check.test.js scripts/render_stoplight_node.test.js"
```

- [ ] **Step 2: Run full test suite**

Run: `npm test`

Expected: ALL PASS

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "chore: add render_stoplight_node tests to test suite"
```
