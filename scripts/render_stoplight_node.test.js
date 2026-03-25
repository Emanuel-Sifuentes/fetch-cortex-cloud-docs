const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { hashContent, filterTocNodes } = require("./fetch_stoplight.js");
const { renderArticle, renderHttpService, renderHttpOperation } = require("./render_stoplight_node.js");

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
        body: { $ref: "#/__bundled__/req_body_wrapper" },
      },
      responses: [
        { $ref: "#/__bundled__/resp_200" },
      ],
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
        req_body_wrapper: {
          id: "body1",
          contents: [{ $ref: "#/__bundled__/req_body_content" }],
        },
        req_body_content: {
          id: "c1",
          mediaType: "application/json",
          schema: { $ref: "#/__bundled__/req_body_schema" },
          examples: [{ $ref: "#/__bundled__/req_example_1" }],
          encodings: [],
        },
        req_example_1: {
          id: "ex1",
          key: "Get API keys and filter by expiration",
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
        req_body_schema: {
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
        resp_200: {
          id: "r1",
          code: 200,
          description: "OK",
          headers: [],
          contents: [{ $ref: "#/__bundled__/resp_content" }],
        },
        resp_content: {
          id: "rc1",
          mediaType: "application/json",
          schema: { $ref: "#/__bundled__/resp_body" },
          examples: [{ $ref: "#/__bundled__/resp_example" }],
          encodings: [],
        },
        resp_example: {
          id: "rex1",
          key: "default",
          value: {
            reply: { DATA: [], FILTER_COUNT: 3, TOTAL_COUNT: 70 },
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
    delete data.__bundled__.req_body_wrapper;
    delete data.__bundled__.req_body_content;
    delete data.__bundled__.req_example_1;
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
    data.__bundled__.req_body_content.examples = [];
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
          id: "b1",
          contents: [
            {
              id: "c1",
              mediaType: "application/json",
              schema: deepSchema,
              examples: [],
              encodings: [],
            },
          ],
        },
      },
      responses: [],
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
      responses: [],
      __bundled__: {},
    };
    const node = makeOperationNode({ data: JSON.stringify(data) });
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "",
    });
    assert.ok(result.includes("[unresolved ref: nonexistent]"));
  });

  it("renders anyOf types as pipe-separated", () => {
    const data = JSON.parse(makeOperationNode().data);
    data.__bundled__.req_body_schema.properties.request_data.properties.filters.items.properties.value = {
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
      responses: [],
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

  it("handles large schemas with many cross-referenced bundled entries without OOM", () => {
    const bundled = {};
    for (let i = 0; i < 50; i++) {
      bundled[`variant_${i}`] = {
        type: "object",
        properties: {
          kind: { type: "string", enum: [`type_${i}`] },
          value: { $ref: `#/__bundled__/variant_${(i + 1) % 50}` },
          nested: {
            type: "object",
            properties: {
              ref_back: { $ref: `#/__bundled__/variant_${(i + 25) % 50}` },
            },
          },
        },
      };
    }
    bundled.big_schema = {
      type: "object",
      properties: {
        match_criteria: {
          type: "object",
          properties: {
            search_type: {
              oneOf: Array.from({ length: 50 }, (_, i) => ({
                $ref: `#/__bundled__/variant_${i}`,
              })),
            },
          },
        },
      },
    };
    bundled.resp_ok = {
      id: "r1",
      code: 200,
      description: "OK",
      headers: [],
      contents: [{ $ref: "#/__bundled__/resp_ct" }],
    };
    bundled.resp_ct = {
      id: "rc1",
      mediaType: "application/json",
      schema: { $ref: "#/__bundled__/big_schema" },
      examples: [],
      encodings: [],
    };
    const data = {
      method: "get",
      path: "/policy/{id}",
      description: "Get policy by ID",
      request: { headers: [] },
      responses: [{ $ref: "#/__bundled__/resp_ok" }],
      __bundled__: bundled,
    };
    const node = makeOperationNode({ data: JSON.stringify(data) });
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "",
    });
    assert.ok(result.includes("## Response (200 OK)"));
    assert.ok(result.includes("| match_criteria | object |"));
  });
});

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

  it("renders oneOf types as pipe-separated in request body", () => {
    const node = makeOperationNode();
    const result = renderHttpOperation(node, {
      serviceName: "Svc",
      serverUrl: "",
    });
    assert.ok(result.includes("integer \\| array"));
  });

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
});
