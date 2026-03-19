const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { flattenCellContent, cleanTableHtml, extractTopLevelTables } = require("./fetch_fluidtopics.js");

describe("fetch_fluidtopics module exports", () => {
  it("exports flattenCellContent as a function", () => {
    assert.equal(typeof flattenCellContent, "function");
  });

  it("exports cleanTableHtml as a function", () => {
    assert.equal(typeof cleanTableHtml, "function");
  });
});

describe("extractTopLevelTables", () => {
  it("extracts a single top-level table", () => {
    const html = "<p>before</p><table><tr><td>A</td></tr></table><p>after</p>";
    const segments = extractTopLevelTables(html);

    assert.deepEqual(segments, [
      { type: "content", html: "<p>before</p>" },
      { type: "table", html: "<table><tr><td>A</td></tr></table>" },
      { type: "content", html: "<p>after</p>" },
    ]);
  });

  it("extracts multiple tables preserving interleaved content", () => {
    const html = "<p>a</p><table><tr><td>1</td></tr></table><p>b</p><table><tr><td>2</td></tr></table><p>c</p>";
    const segments = extractTopLevelTables(html);

    assert.equal(segments.length, 5);
    assert.equal(segments[0].type, "content");
    assert.equal(segments[1].type, "table");
    assert.equal(segments[2].type, "content");
    assert.equal(segments[3].type, "table");
    assert.equal(segments[4].type, "content");
  });

  it("treats nested tables as part of the outer table", () => {
    const html = '<table><tr><td><table><tr><td>inner</td></tr></table></td></tr></table>';
    const segments = extractTopLevelTables(html);

    assert.equal(segments.length, 1);
    assert.equal(segments[0].type, "table");
    assert.ok(segments[0].html.includes("<table><tr><td>inner</td></tr></table>"));
  });

  it("returns a single content segment when no tables exist", () => {
    const html = "<p>just text</p>";
    const segments = extractTopLevelTables(html);

    assert.deepEqual(segments, [{ type: "content", html: "<p>just text</p>" }]);
  });

  it("handles table with attributes", () => {
    const html = '<table class="wide"><tr><td>A</td></tr></table>';
    const segments = extractTopLevelTables(html);

    assert.equal(segments.length, 1);
    assert.equal(segments[0].type, "table");
    assert.equal(segments[0].html, '<table class="wide"><tr><td>A</td></tr></table>');
  });
});

describe("flattenCellContent", () => {
  it("replaces semicolons between list items with numbered markers", () => {
    const input = "<ul><li>Windows</li><li>MacOS</li><li>Linux</li></ul>";
    const result = flattenCellContent(input);

    assert.ok(result.includes("(1)"));
    assert.ok(result.includes("(2)"));
    assert.ok(result.includes("(3)"));
    assert.ok(!result.includes(";"));
  });

  it("does not add numbers for a single list item", () => {
    const input = "<ul><li>Only one</li></ul>";
    const result = flattenCellContent(input);

    assert.ok(!result.includes("(1)"));
    assert.ok(result.includes("Only one"));
  });

  it("strips nested table tags from cell content", () => {
    const input = "<table><tbody><tr><td>nested</td></tr></tbody></table>";
    const result = flattenCellContent(input);

    assert.ok(!result.includes("<table"));
    assert.ok(!result.includes("<tbody"));
    assert.ok(!result.includes("<tr"));
    assert.ok(!result.includes("<td"));
    assert.ok(result.includes("nested"));
  });

  it("collapses newlines into a single line", () => {
    const input = "<p>line one</p>\n\n<p>line two</p>";
    const result = flattenCellContent(input);

    assert.ok(!result.includes("\n"));
    assert.ok(result.includes("line one"));
    assert.ok(result.includes("line two"));
  });
});
