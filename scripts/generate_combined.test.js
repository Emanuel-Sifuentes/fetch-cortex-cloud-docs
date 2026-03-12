const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { promoteKeywordsToHeadings } = require("./generate_combined.js");

describe("promoteKeywordsToHeadings", () => {
  it("promotes a keyword under an h3 heading to h4", () => {
    const input = [
      "### Install the agent",
      "",
      "Some paragraph text.",
      "",
      "-   For AMD architecture",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(
      result,
      [
        "### Install the agent",
        "",
        "Some paragraph text.",
        "",
        "#### For AMD architecture",
      ].join("\n")
    );
  });

  it("promotes consecutive keyword list items to the same level", () => {
    const input = [
      "## Section",
      "",
      "-   For AMD architecture",
      "-   For ARM architecture",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(
      result,
      [
        "## Section",
        "",
        "### For AMD architecture",
        "### For ARM architecture",
      ].join("\n")
    );
  });

  it("preserves trailing text after the keyword", () => {
    const input = [
      "### Section",
      "",
      "-   For **Python** (Python 3.)",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(
      result,
      [
        "### Section",
        "",
        "#### For **Python** (Python 3.)",
      ].join("\n")
    );
  });

  it("caps keyword heading at h6 when parent is h6", () => {
    const input = [
      "###### Deep section",
      "",
      "-   For **Java**",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(
      result,
      [
        "###### Deep section",
        "",
        "###### For **Java**",
      ].join("\n")
    );
  });

  it("does not promote keywords inside fenced code blocks", () => {
    const input = [
      "### Section",
      "",
      "```",
      "-   For AMD architecture",
      "```",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(result, input);
  });

  it("does not promote keywords inside language-tagged code blocks", () => {
    const input = [
      "### Section",
      "",
      "```markdown",
      "-   For AMD architecture",
      "```",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(result, input);
  });

  it("does not promote non-keyword list items", () => {
    const input = [
      "### Section",
      "",
      "-   For something else entirely",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(result, input);
  });

  it("does not promote indented (nested) list items", () => {
    const input = [
      "### Section",
      "",
      "    -   For AMD architecture",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(result, input);
  });

  it("matches variable whitespace after the dash", () => {
    const input = [
      "### Section",
      "",
      "-  For AMD architecture",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(
      result,
      [
        "### Section",
        "",
        "#### For AMD architecture",
      ].join("\n")
    );
  });

  it("tracks heading level changes across the document", () => {
    const input = [
      "## Top section",
      "",
      "-   For AMD architecture",
      "",
      "#### Deeper section",
      "",
      "-   For ARM architecture",
    ].join("\n");

    const result = promoteKeywordsToHeadings(input);

    assert.equal(
      result,
      [
        "## Top section",
        "",
        "### For AMD architecture",
        "",
        "#### Deeper section",
        "",
        "##### For ARM architecture",
      ].join("\n")
    );
  });
});
