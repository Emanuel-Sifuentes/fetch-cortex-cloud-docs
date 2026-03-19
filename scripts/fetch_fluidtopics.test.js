const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { flattenCellContent, cleanTableHtml, convertAdmonitionHeadings } = require("./fetch_fluidtopics.js");

describe("fetch_fluidtopics module exports", () => {
  it("exports flattenCellContent as a function", () => {
    assert.equal(typeof flattenCellContent, "function");
  });

  it("exports cleanTableHtml as a function", () => {
    assert.equal(typeof cleanTableHtml, "function");
  });
});

describe("convertAdmonitionHeadings", () => {
  it("converts ## Notes to bold", () => {
    assert.equal(convertAdmonitionHeadings("## Notes"), "**Notes:**");
  });
  it("converts ### Caution to bold", () => {
    assert.equal(convertAdmonitionHeadings("### Caution"), "**Caution:**");
  });
  it("converts ## Notice: to bold (trailing colon normalized)", () => {
    assert.equal(convertAdmonitionHeadings("## Notice:"), "**Notice:**");
  });
  it("preserves existing keywords", () => {
    assert.equal(convertAdmonitionHeadings("## Note"), "**Note:**");
    assert.equal(convertAdmonitionHeadings("### Warning"), "**Warning:**");
    assert.equal(convertAdmonitionHeadings("#### Tip"), "**Tip:**");
  });
  it("does not match non-admonition headings", () => {
    assert.equal(convertAdmonitionHeadings("## Installation"), "## Installation");
  });
  it("handles indented admonition headings", () => {
    assert.equal(convertAdmonitionHeadings("  ### Note"), "  **Note:**");
  });
});
