const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { flattenCellContent, cleanTableHtml } = require("./fetch_fluidtopics.js");

describe("fetch_fluidtopics module exports", () => {
  it("exports flattenCellContent as a function", () => {
    assert.equal(typeof flattenCellContent, "function");
  });

  it("exports cleanTableHtml as a function", () => {
    assert.equal(typeof cleanTableHtml, "function");
  });
});
