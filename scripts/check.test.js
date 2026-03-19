const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { diffTopics, formatTextReport } = require("./check.js");

const topic = (id) => ({ contentId: id, tocId: `toc-${id}`, title: `Title ${id}`, depth: 0 });

describe("diffTopics", () => {
  it("returns no changes for identical lists", () => {
    const topics = [topic("a"), topic("b"), topic("c")];
    const result = diffTopics(topics, topics);
    assert.deepEqual(result, { added: [], removed: [], reordered: false });
  });

  it("detects added topics", () => {
    const old = [topic("a"), topic("b")];
    const next = [topic("a"), topic("b"), topic("c")];
    const result = diffTopics(old, next);
    assert.deepEqual(result.added, ["c"]);
    assert.deepEqual(result.removed, []);
    assert.equal(result.reordered, false);
  });

  it("detects removed topics", () => {
    const old = [topic("a"), topic("b"), topic("c")];
    const next = [topic("a"), topic("c")];
    const result = diffTopics(old, next);
    assert.deepEqual(result.added, []);
    assert.deepEqual(result.removed, ["b"]);
    assert.equal(result.reordered, false);
  });

  it("detects reordered topics in the intersection", () => {
    const old = [topic("a"), topic("b"), topic("c")];
    const next = [topic("c"), topic("a"), topic("b")];
    const result = diffTopics(old, next);
    assert.deepEqual(result.added, []);
    assert.deepEqual(result.removed, []);
    assert.equal(result.reordered, true);
  });

  it("does not flag reorder when only additions change the list", () => {
    const old = [topic("a"), topic("b")];
    const next = [topic("a"), topic("x"), topic("b")];
    const result = diffTopics(old, next);
    assert.deepEqual(result.added, ["x"]);
    assert.equal(result.reordered, false);
  });

  it("does not flag reorder when only removals change the list", () => {
    const old = [topic("a"), topic("b"), topic("c")];
    const next = [topic("a"), topic("c")];
    const result = diffTopics(old, next);
    assert.deepEqual(result.removed, ["b"]);
    assert.equal(result.reordered, false);
  });

  it("detects simultaneous add, remove, and reorder", () => {
    const old = [topic("a"), topic("b"), topic("c")];
    const next = [topic("c"), topic("a"), topic("d")];
    const result = diffTopics(old, next);
    assert.deepEqual(result.added, ["d"]);
    assert.deepEqual(result.removed, ["b"]);
    assert.equal(result.reordered, true);
  });

  it("returns empty diff for two empty lists", () => {
    const result = diffTopics([], []);
    assert.deepEqual(result, { added: [], removed: [], reordered: false });
  });

  it("treats all topics as added when old list is empty", () => {
    const result = diffTopics([], [topic("a"), topic("b")]);
    assert.deepEqual(result.added, ["a", "b"]);
    assert.deepEqual(result.removed, []);
    assert.equal(result.reordered, false);
  });

  it("treats all topics as removed when new list is empty", () => {
    const result = diffTopics([topic("a"), topic("b")], []);
    assert.deepEqual(result.added, []);
    assert.deepEqual(result.removed, ["a", "b"]);
    assert.equal(result.reordered, false);
  });
});

describe("formatTextReport", () => {
  it("shows 'no changes' for an unchanged product", () => {
    const report = {
      timestamp: "2026-03-20T08:00:00.000Z",
      products: {
        xdr: {
          changed: false,
          maps: {
            xdr_5: { republished: false, added: 0, removed: 0, reordered: false },
          },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("[xdr] no changes"));
  });

  it("shows map-level diff details for a changed product", () => {
    const report = {
      timestamp: "2026-03-20T08:00:00.000Z",
      products: {
        gateway: {
          changed: true,
          maps: {
            cortex_gateway: { republished: true, added: 1, removed: 0, reordered: false },
          },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("[gateway] changed"));
    assert.ok(text.includes("cortex_gateway: 1 added, 0 removed"));
  });

  it("shows 'no TOC changes' for a republished map with identical topics", () => {
    const report = {
      timestamp: "2026-03-20T08:00:00.000Z",
      products: {
        xsiam: {
          changed: true,
          maps: {
            xsiam_3: { republished: true, added: 0, removed: 0, reordered: false },
          },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("xsiam_3: no TOC changes"));
  });

  it("includes reordered flag in map detail when topics were reordered", () => {
    const report = {
      timestamp: "2026-03-20T08:00:00.000Z",
      products: {
        gateway: {
          changed: true,
          maps: {
            cortex_gateway: { republished: true, added: 0, removed: 0, reordered: true },
          },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("reordered"));
  });

  it("shows summary count of products needing re-fetch", () => {
    const report = {
      timestamp: "2026-03-20T08:00:00.000Z",
      products: {
        cloud: {
          changed: true,
          maps: { runtime: { republished: true, added: 0, removed: 0, reordered: false } },
        },
        xdr: {
          changed: false,
          maps: { xdr_5: { republished: false, added: 0, removed: 0, reordered: false } },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("1 product"));
    assert.ok(text.includes("re-fetch"));
  });

  it("shows 'up to date' when no products changed", () => {
    const report = {
      timestamp: "2026-03-20T08:00:00.000Z",
      products: {
        xdr: {
          changed: false,
          maps: { xdr_5: { republished: false, added: 0, removed: 0, reordered: false } },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("up to date"));
  });

  it("marks maps with errors", () => {
    const report = {
      timestamp: "2026-03-20T08:00:00.000Z",
      products: {
        gateway: {
          changed: false,
          maps: {
            cortex_gateway: { error: true, message: "HTTP 503" },
          },
        },
      },
    };
    const text = formatTextReport(report);
    assert.ok(text.includes("cortex_gateway: error"));
  });
});
