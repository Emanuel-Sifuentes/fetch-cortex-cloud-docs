const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { diffTopics } = require("./check.js");

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
