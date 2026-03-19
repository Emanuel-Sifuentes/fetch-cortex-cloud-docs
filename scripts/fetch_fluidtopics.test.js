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

describe("flattenCellContent", () => {
  it("strips bare <p> tags", () => {
    assert.equal(flattenCellContent("<p>hello</p>"), "hello");
  });

  it("strips <p> tags with class attribute", () => {
    assert.equal(flattenCellContent('<p class="cmd">hello</p>'), "hello");
  });

  it("strips <p> tags with multiple attributes", () => {
    assert.equal(flattenCellContent('<p class="cmd" id="x">hello</p>'), "hello");
  });

  it("strips <pre> tags keeping content", () => {
    assert.equal(flattenCellContent("<pre>code here</pre>"), "code here");
  });

  it("strips <pre> tags with class attribute", () => {
    assert.equal(
      flattenCellContent('<pre class="programlisting">some code</pre>'),
      "some code"
    );
  });

  it("strips <br> tags", () => {
    assert.equal(flattenCellContent("line one<br>line two"), "line one line two");
  });

  it("strips self-closing <br /> tags", () => {
    assert.equal(flattenCellContent("line one<br />line two"), "line one line two");
  });

  it("collapses whitespace from multiple block elements", () => {
    const html = '<p class="cmd">first paragraph</p><p>second paragraph</p>';
    assert.equal(flattenCellContent(html), "first paragraph second paragraph");
  });

  it("handles real-world MTTR cell HTML", () => {
    const html =
      '<p class="cmd">Determines within how many days.</p>' +
      "<p>The defined MTTR is used.</p>";
    assert.equal(
      flattenCellContent(html),
      "Determines within how many days. The defined MTTR is used."
    );
  });

  it("handles real-world certificate cell with <pre>", () => {
    const html =
      "Re-create the certificate:" +
      '<pre class="programlisting">-----BEGIN CERT-----abc-----END CERT-----</pre>';
    assert.equal(
      flattenCellContent(html),
      "Re-create the certificate: -----BEGIN CERT-----abc-----END CERT-----"
    );
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
