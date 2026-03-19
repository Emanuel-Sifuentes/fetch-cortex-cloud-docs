const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { flattenCellContent, cleanTableHtml, extractTopLevelTables, removeDuplicateSeparators, analyzeTable, isCellComplex, extractToSections, extractCells } = require("./fetch_fluidtopics.js");

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

  it("preserves admonition heading conversion", () => {
    const input = '<h3 class="title">Note</h3><p>text</p>';
    const result = flattenCellContent(input);

    assert.ok(result.includes("**Note:**"));
    assert.ok(result.includes("text"));
  });

  it("unwraps p inside li", () => {
    const input = "<ul><li><p>wrapped</p></li></ul>";
    const result = flattenCellContent(input);

    assert.ok(result.includes("wrapped"));
    assert.ok(!result.includes("<p>"));
  });
});

describe("isCellComplex", () => {
  it("returns true for nested table", () => {
    assert.equal(isCellComplex("<table><tr><td>x</td></tr></table>"), true);
  });
  it("returns true for pre element", () => {
    assert.equal(isCellComplex("<pre>code here</pre>"), true);
  });
  it("returns true for >3 list items", () => {
    assert.equal(isCellComplex("<ul><li>a</li><li>b</li><li>c</li><li>d</li></ul>"), true);
  });
  it("returns false for <=3 list items", () => {
    assert.equal(isCellComplex("<ul><li>a</li><li>b</li><li>c</li></ul>"), false);
  });
  it("returns false for long plain text without block elements", () => {
    const longText = "A".repeat(250);
    assert.equal(isCellComplex(longText), false);
  });
  it("returns true for long text WITH block elements", () => {
    const longText = "A".repeat(250);
    assert.equal(isCellComplex(`<p>${longText}</p>`), true);
  });
  it("returns false for short simple text", () => {
    assert.equal(isCellComplex("just a short cell"), false);
  });
});

describe("analyzeTable", () => {
  it("returns simple table unchanged", () => {
    const html = "<table><thead><tr><th>A</th><th>B</th></tr></thead>" +
      "<tbody><tr><td>1</td><td>2</td></tr></tbody></table>";
    const result = analyzeTable(html, new Map());
    assert.equal(result, html);
  });

  it("detects section-divider rows by colspan (smoke)", () => {
    const html = "<table><thead><tr><th>A</th><th>B</th></tr></thead>" +
      '<tbody><tr><td colspan="2">Section</td></tr><tr><td>1</td><td>2</td></tr></tbody></table>';
    const result = analyzeTable(html, new Map());
    assert.notEqual(result, html);
  });

  it("detects section-divider by single td in multi-column table (smoke)", () => {
    const html = "<table><thead><tr><th>A</th><th>B</th><th>C</th></tr></thead>" +
      "<tbody><tr><td>Divider</td></tr><tr><td>1</td><td>2</td><td>3</td></tr></tbody></table>";
    const result = analyzeTable(html, new Map());
    assert.notEqual(result, html);
  });

  it("routes >50% complex data rows away from passthrough (smoke)", () => {
    const pre = "<pre>code</pre>";
    const html = "<table><thead><tr><th>A</th><th>B</th></tr></thead>" +
      `<tbody><tr><td>x</td><td>${pre}</td></tr><tr><td>y</td><td>${pre}</td></tr>` +
      "<tr><td>z</td><td>simple</td></tr></tbody></table>";
    const result = analyzeTable(html, new Map());
    assert.notEqual(result, html);
  });

  it("extracts all rows when >50% are complex", () => {
    const pre = "<pre>code</pre>";
    const html = "<table><thead><tr><th>Op</th><th>Desc</th></tr></thead>" +
      `<tbody><tr><td>A</td><td>${pre}</td></tr><tr><td>B</td><td>${pre}</td></tr></tbody></table>`;
    const sections = new Map();
    const result = analyzeTable(html, sections);
    // Both rows extracted → result should be placeholders
    assert.ok(result.includes("<!--EXTRACTED:"));
    assert.equal(sections.size, 2);
  });

  it("splits table at section-divider rows", () => {
    const html = "<table><thead><tr><th>A</th><th>B</th></tr></thead>" +
      '<tbody><tr><td>1</td><td>2</td></tr><tr><td colspan="2">Section</td></tr>' +
      "<tr><td>3</td><td>4</td></tr></tbody></table>";
    const sections = new Map();

    const result = analyzeTable(html, sections);

    // Should produce two tables with a bold heading between
    assert.ok(result.includes("<strong>Section</strong>"));
    // Both sub-tables should have the header row
    const tableCount = (result.match(/<thead>/g) || []).length;
    assert.equal(tableCount, 2);
  });
});

describe("extractToSections", () => {
  it("extracts a row with code block to heading + fenced code", () => {
    const row = '<tr><td>IN</td><td><p>Check membership.</p><pre><code class="language-xql">filter x IN (1,2,3)</code></pre></td></tr>';
    const headerRow = "<tr><th>Operator</th><th>Description</th></tr>";
    const sections = new Map();

    const placeholder = extractToSections(row, headerRow, sections);

    assert.match(placeholder, /<!--EXTRACTED:[a-z0-9-]+-->/);
    const content = [...sections.values()][0];
    assert.ok(content.includes("### IN"));
    assert.ok(content.includes("Check membership."));
    assert.ok(content.includes("```xql"));
    assert.ok(content.includes("filter x IN (1,2,3)"));
  });

  it("extracts a row with a list to heading + markdown list", () => {
    const row = '<tr><td>Platforms</td><td><ul><li>Windows</li><li>Mac</li><li>Linux</li><li>Docker</li></ul></td></tr>';
    const headerRow = "<tr><th>Feature</th><th>Details</th></tr>";
    const sections = new Map();
    extractToSections(row, headerRow, sections);
    const content = [...sections.values()][0];
    assert.ok(content.includes("### Platforms"));
    assert.ok(content.includes("- Windows"));
    assert.ok(content.includes("- Docker"));
  });

  it("extracts plain text as a paragraph", () => {
    const row = '<tr><td>Name</td><td>A long description that is just plain text.</td></tr>';
    const headerRow = "<tr><th>Key</th><th>Value</th></tr>";
    const sections = new Map();
    extractToSections(row, headerRow, sections);
    const content = [...sections.values()][0];
    assert.ok(content.includes("### Name"));
    assert.ok(content.includes("A long description"));
  });

  it("returns original row when no cells found (early return)", () => {
    const row = "not-valid-html";
    const headerRow = "<tr><th>A</th></tr>";
    const sections = new Map();
    const result = extractToSections(row, headerRow, sections);
    // Tests the "no cells found" early return path.
    assert.equal(result, "not-valid-html");
    assert.equal(sections.size, 0);
  });
});

describe("removeDuplicateSeparators", () => {
  it("removes duplicate consecutive separator rows", () => {
    const input = "| A | B |\n| --- | --- |\n| --- | --- |\n| 1 | 2 |";
    const result = removeDuplicateSeparators(input);
    assert.equal(result, "| A | B |\n| --- | --- |\n| 1 | 2 |");
  });

  it("keeps a single separator row untouched", () => {
    const input = "| A | B |\n| --- | --- |\n| 1 | 2 |";
    const result = removeDuplicateSeparators(input);
    assert.equal(result, input);
  });

  it("handles triple consecutive separators", () => {
    const input = "| A |\n| --- |\n| --- |\n| --- |\n| 1 |";
    const result = removeDuplicateSeparators(input);
    assert.equal(result, "| A |\n| --- |\n| 1 |");
  });

  it("returns markdown unchanged when no separators present", () => {
    const input = "# Heading\n\nSome text.";
    const result = removeDuplicateSeparators(input);
    assert.equal(result, input);
  });

  it("handles separator rows with alignment colons", () => {
    const input = "| A | B |\n| :--- | ---: |\n| :--- | ---: |\n| 1 | 2 |";
    const result = removeDuplicateSeparators(input);
    assert.equal(result, "| A | B |\n| :--- | ---: |\n| 1 | 2 |");
  });
});
