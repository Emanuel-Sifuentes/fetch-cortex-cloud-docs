// scripts/compute_ownership.test.js
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { computeOwnership, normalizeTitle } = require("./compute_ownership.js");

const entry = (contentId, title, depth = 0) => ({ contentId, title, depth });

describe("normalizeTitle", () => {
  it("lowercases and strips non-alphanumeric characters", () => {
    assert.equal(normalizeTitle("Set Up  Users & Roles!"), "set up users roles");
  });

  it("normalizes hyphens and mixed whitespace", () => {
    assert.equal(normalizeTitle("set-up users & roles"), "set up users roles");
  });

  it("handles empty string", () => {
    assert.equal(normalizeTitle(""), "");
  });

  it("handles string with only special characters", () => {
    assert.equal(normalizeTitle("---!!!"), "");
  });
});

describe("computeOwnership", () => {
  const hierarchy = ["xdr", "cloud", "xsiam", "agentix"];

  it("assigns topic in XDR and Cloud to XDR (highest priority)", () => {
    const tocsByProduct = {
      xdr: [entry("id-1", "Shared Topic")],
      cloud: [entry("id-1", "Shared Topic")],
      xsiam: [],
      agentix: [],
    };

    const result = computeOwnership(tocsByProduct, hierarchy);

    assert.ok(result.owned.xdr.includes("id-1"));
    assert.ok(!result.owned.cloud.includes("id-1"));
  });

  it("assigns topic in Cloud and XSIAM to Cloud", () => {
    const tocsByProduct = {
      xdr: [],
      cloud: [entry("id-1", "Cloud Topic")],
      xsiam: [entry("id-1", "Cloud Topic")],
      agentix: [],
    };
    const result = computeOwnership(tocsByProduct, hierarchy);
    assert.ok(result.owned.cloud.includes("id-1"));
    assert.ok(!result.owned.xsiam.includes("id-1"));
  });

  it("assigns topic in all three to XDR (highest priority)", () => {
    const tocsByProduct = {
      xdr: [entry("id-1", "Everywhere")],
      cloud: [entry("id-1", "Everywhere")],
      xsiam: [entry("id-1", "Everywhere")],
      agentix: [],
    };
    const result = computeOwnership(tocsByProduct, hierarchy);
    assert.ok(result.owned.xdr.includes("id-1"));
    assert.equal(result.owned.cloud.length, 0);
    assert.equal(result.owned.xsiam.length, 0);
  });

  it("assigns Agentix-only topic to Agentix", () => {
    const tocsByProduct = {
      xdr: [],
      cloud: [],
      xsiam: [],
      agentix: [entry("ag-1", "AgentiX Onboarding")],
    };
    const result = computeOwnership(tocsByProduct, hierarchy);
    assert.ok(result.owned.agentix.includes("ag-1"));
  });

  it("drops lower-priority topic with same normalized title but different contentId", () => {
    const tocsByProduct = {
      xdr: [entry("xdr-1", "Deploy Agent")],
      cloud: [entry("cloud-1", "Deploy Agent")],
      xsiam: [],
      agentix: [],
    };
    const result = computeOwnership(tocsByProduct, hierarchy);
    assert.ok(result.owned.xdr.includes("xdr-1"));
    assert.equal(result.owned.cloud.length, 0);
    assert.equal(result.stats.cloud.droppedByTitle, 1);
    assert.deepEqual(result.titleMatched["cloud-1"], {
      ownedBy: "xdr",
      ownerContentId: "xdr-1",
    });
  });

  it("drops XSIAM topic with same title as XDR (different contentId)", () => {
    const tocsByProduct = {
      xdr: [entry("xdr-1", "Endpoint Agent")],
      cloud: [],
      xsiam: [entry("xs-1", "Endpoint Agent")],
      agentix: [],
    };
    const result = computeOwnership(tocsByProduct, hierarchy);
    assert.ok(result.owned.xdr.includes("xdr-1"));
    assert.equal(result.owned.xsiam.length, 0);
    assert.equal(result.stats.xsiam.droppedByTitle, 1);
  });

  it("drops XSIAM topic with same title as Cloud (different contentId)", () => {
    const tocsByProduct = {
      xdr: [],
      cloud: [entry("cloud-1", "Compliance Dashboard")],
      xsiam: [entry("xs-1", "Compliance Dashboard")],
      agentix: [],
    };
    const result = computeOwnership(tocsByProduct, hierarchy);
    assert.ok(result.owned.cloud.includes("cloud-1"));
    assert.equal(result.owned.xsiam.length, 0);
    assert.equal(result.stats.xsiam.droppedByTitle, 1);
  });

  it("normalizes titles for matching (case, punctuation, whitespace)", () => {
    const tocsByProduct = {
      xdr: [entry("xdr-1", "Set Up  Users & Roles!")],
      cloud: [],
      xsiam: [entry("xs-1", "set-up users & roles")],
      agentix: [],
    };
    const result = computeOwnership(tocsByProduct, hierarchy);
    assert.ok(result.owned.xdr.includes("xdr-1"));
    assert.equal(result.owned.xsiam.length, 0);
    assert.equal(result.stats.xsiam.droppedByTitle, 1);
  });

  it("generic 'Overview' title — highest priority product claims it", () => {
    const tocsByProduct = {
      xdr: [entry("xdr-ov", "Overview")],
      cloud: [entry("cloud-ov", "Overview")],
      xsiam: [entry("xs-ov", "Overview")],
      agentix: [entry("ag-ov", "Overview")],
    };
    const result = computeOwnership(tocsByProduct, hierarchy);
    assert.ok(result.owned.xdr.includes("xdr-ov"));
    assert.equal(result.owned.cloud.length, 0);
    assert.equal(result.owned.xsiam.length, 0);
    assert.equal(result.owned.agentix.length, 0);
  });

  it("keeps both topics when same title appears twice in the same product", () => {
    const tocsByProduct = {
      xdr: [entry("xdr-ov1", "Overview"), entry("xdr-ov2", "Overview")],
      cloud: [],
      xsiam: [],
      agentix: [],
    };
    const result = computeOwnership(tocsByProduct, hierarchy);
    assert.equal(result.owned.xdr.length, 2);
    assert.ok(result.owned.xdr.includes("xdr-ov1"));
    assert.ok(result.owned.xdr.includes("xdr-ov2"));
    assert.equal(result.stats.xdr.droppedByTitle, 0);
  });

  it("Cloud sub-map merging: same contentId in appsec+posture+runtime counts once", () => {
    const tocsByProduct = {
      xdr: [],
      cloud: [
        entry("shared-1", "Topic A"),
        entry("shared-1", "Topic A"),
        entry("shared-1", "Topic A"),
      ],
      xsiam: [],
      agentix: [],
    };
    const result = computeOwnership(tocsByProduct, hierarchy);
    assert.equal(result.owned.cloud.length, 1);
    assert.equal(result.stats.cloud.total, 1);
  });

  it("handles empty TOC for a product without crashing", () => {
    const tocsByProduct = {
      xdr: [],
      cloud: [],
      xsiam: [],
      agentix: [],
    };
    const result = computeOwnership(tocsByProduct, hierarchy);
    assert.deepEqual(result.owned.xdr, []);
    assert.deepEqual(result.owned.cloud, []);
    assert.deepEqual(result.owned.xsiam, []);
    assert.deepEqual(result.owned.agentix, []);
  });

  it("works with a reduced hierarchy of 2 products", () => {
    const tocsByProduct = {
      xdr: [entry("id-1", "Shared")],
      cloud: [entry("id-1", "Shared"), entry("cloud-2", "Cloud Only")],
    };
    const result = computeOwnership(tocsByProduct, ["xdr", "cloud"]);
    assert.ok(result.owned.xdr.includes("id-1"));
    assert.ok(!result.owned.cloud.includes("id-1"));
    assert.ok(result.owned.cloud.includes("cloud-2"));
  });

  it("duplicate contentIds within a single product TOC are collapsed", () => {
    const tocsByProduct = {
      xdr: [
        entry("id-1", "Topic A", 0),
        entry("id-1", "Topic A", 2),
        entry("id-2", "Topic B"),
      ],
      cloud: [],
      xsiam: [],
      agentix: [],
    };
    const result = computeOwnership(tocsByProduct, hierarchy);
    assert.equal(result.owned.xdr.length, 2);
    assert.equal(result.stats.xdr.total, 2);
  });

  it("assigns a mixed set of topics to correct products", () => {
    const tocsByProduct = {
      xdr: [
        entry("shared-all", "Shared All"),
        entry("xdr-cloud", "XDR Cloud Shared"),
        entry("xdr-only", "XDR Exclusive"),
      ],
      cloud: [
        entry("shared-all", "Shared All"),
        entry("xdr-cloud", "XDR Cloud Shared"),
        entry("cloud-xsiam", "Cloud XSIAM"),
        entry("cloud-only", "Cloud Exclusive"),
        entry("cloud-title", "Same Title Topic"),
      ],
      xsiam: [
        entry("shared-all", "Shared All"),
        entry("cloud-xsiam", "Cloud XSIAM"),
        entry("xs-only", "XSIAM Exclusive"),
        entry("xs-title", "Same Title Topic"),
      ],
      agentix: [
        entry("ag-only", "AgentiX Only"),
      ],
    };
    const result = computeOwnership(tocsByProduct, hierarchy);
    assert.deepEqual(result.owned.xdr.sort(), ["shared-all", "xdr-cloud", "xdr-only"]);
    assert.deepEqual(result.owned.cloud.sort(), ["cloud-only", "cloud-title", "cloud-xsiam"]);
    assert.deepEqual(result.owned.xsiam, ["xs-only"]);
    assert.deepEqual(result.owned.agentix, ["ag-only"]);
    assert.equal(result.stats.xdr.droppedById, 0);
    assert.equal(result.stats.cloud.droppedById, 2);
    assert.equal(result.stats.xsiam.droppedById, 2);
    assert.equal(result.stats.xsiam.droppedByTitle, 1);
  });
});
