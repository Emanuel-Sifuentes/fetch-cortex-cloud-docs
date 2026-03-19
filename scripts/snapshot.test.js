const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { flattenToc } = require("./snapshot.js");

describe("flattenToc", () => {
  it("flattens a single-level list to depth-0 entries with 4 fields", () => {
    const toc = [
      { contentId: "a", tocId: "t-a", title: "Topic A", prettyUrl: "/a", children: [] },
      { contentId: "b", tocId: "t-b", title: "Topic B", prettyUrl: "/b", children: [] },
    ];
    assert.deepEqual(flattenToc(toc), [
      { contentId: "a", tocId: "t-a", title: "Topic A", depth: 0 },
      { contentId: "b", tocId: "t-b", title: "Topic B", depth: 0 },
    ]);
  });

  it("flattens nested children with incremented depth", () => {
    const toc = [
      {
        contentId: "parent", tocId: "t-p", title: "Parent", prettyUrl: "/p",
        children: [
          { contentId: "child", tocId: "t-c", title: "Child", prettyUrl: "/c", children: [] }
        ]
      }
    ];
    assert.deepEqual(flattenToc(toc), [
      { contentId: "parent", tocId: "t-p", title: "Parent", depth: 0 },
      { contentId: "child", tocId: "t-c", title: "Child", depth: 1 },
    ]);
  });

  it("strips extra API fields from TOC nodes", () => {
    const toc = [{ contentId: "x", tocId: "t-x", title: "X", prettyUrl: "/x", extra: "ignored", children: [] }];
    const result = flattenToc(toc);
    assert.deepEqual(Object.keys(result[0]).sort(), ["contentId", "depth", "title", "tocId"]);
  });

  it("handles deeply nested tree (3 levels)", () => {
    const toc = [
      {
        contentId: "l0", tocId: "t-0", title: "L0", children: [
          {
            contentId: "l1", tocId: "t-1", title: "L1", children: [
              { contentId: "l2", tocId: "t-2", title: "L2", children: [] }
            ]
          }
        ]
      }
    ];
    assert.deepEqual(flattenToc(toc), [
      { contentId: "l0", tocId: "t-0", title: "L0", depth: 0 },
      { contentId: "l1", tocId: "t-1", title: "L1", depth: 1 },
      { contentId: "l2", tocId: "t-2", title: "L2", depth: 2 },
    ]);
  });

  it("returns empty array for empty input", () => {
    assert.deepEqual(flattenToc([]), []);
  });
});
