const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { hashContent, filterTocNodes } = require("./fetch_stoplight.js");
const { renderArticle, renderHttpService } = require("./render_stoplight_node.js");

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
