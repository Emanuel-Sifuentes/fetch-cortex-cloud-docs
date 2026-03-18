const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const {
  promoteKeywordsToHeadings,
  computeBuckets,
} = require("./generate_combined.js");

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

describe("computeBuckets", () => {
  const entry = (contentId, title, depth) => ({ contentId, title, depth });

  it("places contentIds present in all 3 TOCs into PRA", () => {
    const posture = [entry("id-1", "Shared Topic", 0)];
    const runtime = [entry("id-1", "Shared Topic", 0)];
    const appsec = [entry("id-1", "Shared Topic", 0)];

    const result = computeBuckets(posture, runtime, appsec);

    assert.ok(result.PRA.has("id-1"));
    assert.equal(result.PRA.size, 1);
    assert.equal(result.PR.size, 0);
    assert.equal(result.R.size, 0);
    assert.equal(result.P.size, 0);
    assert.equal(result.A.size, 0);
    assert.equal(result.titleMatched.size, 0);
  });

  it("places contentIds in Posture + Runtime but not AppSec into PR", () => {
    const posture = [entry("id-1", "Shared Topic", 0)];
    const runtime = [entry("id-1", "Shared Topic", 0)];
    const appsec = [];

    const result = computeBuckets(posture, runtime, appsec);

    assert.ok(result.PR.has("id-1"));
    assert.equal(result.PR.size, 1);
    assert.equal(result.PRA.size, 0);
    assert.equal(result.R.size, 0);
    assert.equal(result.P.size, 0);
    assert.equal(result.A.size, 0);
  });

  it("places contentIds only in Runtime into R", () => {
    const posture = [];
    const runtime = [entry("id-1", "Runtime Only", 0)];
    const appsec = [];

    const result = computeBuckets(posture, runtime, appsec);

    assert.ok(result.R.has("id-1"));
    assert.equal(result.R.size, 1);
    assert.equal(result.PRA.size, 0);
    assert.equal(result.PR.size, 0);
    assert.equal(result.P.size, 0);
    assert.equal(result.A.size, 0);
  });

  it("places contentIds only in Posture into P", () => {
    const posture = [entry("id-1", "Posture Only", 0)];
    const runtime = [];
    const appsec = [];

    const result = computeBuckets(posture, runtime, appsec);

    assert.ok(result.P.has("id-1"));
    assert.equal(result.P.size, 1);
    assert.equal(result.PRA.size, 0);
    assert.equal(result.PR.size, 0);
    assert.equal(result.R.size, 0);
    assert.equal(result.A.size, 0);
  });

  it("places AppSec-only contentIds into A", () => {
    const posture = [];
    const runtime = [];
    const appsec = [entry("id-1", "AppSec Only", 0)];

    const result = computeBuckets(posture, runtime, appsec);

    assert.ok(result.A.has("id-1"));
    assert.equal(result.A.size, 1);
    assert.equal(result.PRA.size, 0);
    assert.equal(result.PR.size, 0);
    assert.equal(result.R.size, 0);
    assert.equal(result.P.size, 0);
  });

  it("title-matches a Posture-only contentId to a Runtime contentId with same title", () => {
    const posture = [entry("p-1", "Deploy Agent", 1)];
    const runtime = [entry("r-1", "Deploy Agent", 1)];
    const appsec = [];

    const result = computeBuckets(posture, runtime, appsec);

    assert.equal(result.titleMatched.size, 1);
    assert.equal(result.titleMatched.get("p-1"), "r-1");
    assert.equal(result.P.size, 0);
    assert.equal(result.R.size, 1);
    assert.ok(result.R.has("r-1"));
  });

  it("title match picks closest depth when multiple Runtime entries share a title", () => {
    const posture = [entry("p-1", "Install", 2)];
    const runtime = [
      entry("r-1", "Install", 0),
      entry("r-2", "Install", 2),
      entry("r-3", "Install", 4),
    ];
    const appsec = [];

    const result = computeBuckets(posture, runtime, appsec);

    assert.equal(result.titleMatched.get("p-1"), "r-2");
    assert.equal(result.P.size, 0);
  });

  it("assigns mixed entries to correct buckets comprehensively", () => {
    const posture = [
      entry("shared-all", "All Three", 0),
      entry("shared-pr", "Posture Runtime", 1),
      entry("p-only", "Posture Exclusive", 2),
      entry("p-title", "Matching Title", 1),
    ];
    const runtime = [
      entry("shared-all", "All Three", 0),
      entry("shared-pr", "Posture Runtime", 1),
      entry("r-only", "Runtime Exclusive", 2),
      entry("r-target", "Matching Title", 1),
    ];
    const appsec = [
      entry("shared-all", "All Three", 0),
      entry("a-only", "AppSec Exclusive", 0),
    ];

    const result = computeBuckets(posture, runtime, appsec);

    assert.ok(result.PRA.has("shared-all"));
    assert.equal(result.PRA.size, 1);

    assert.ok(result.PR.has("shared-pr"));
    assert.equal(result.PR.size, 1);

    assert.ok(result.R.has("r-only"));
    assert.ok(result.R.has("r-target"));
    assert.equal(result.R.size, 2);

    assert.ok(result.P.has("p-only"));
    assert.equal(result.P.size, 1);

    assert.ok(result.A.has("a-only"));
    assert.equal(result.A.size, 1);

    assert.equal(result.titleMatched.size, 1);
    assert.equal(result.titleMatched.get("p-title"), "r-target");
  });
});
