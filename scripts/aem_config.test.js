const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { SASE_PRODUCTS, PRODUCT_FAMILIES, resolveTargetProducts, parseProductFlag } = require("./aem_config.js");

describe("aem_config", () => {
  it("exports SASE_PRODUCTS with prisma_access", () => {
    assert.ok(SASE_PRODUCTS.prisma_access);
    assert.equal(SASE_PRODUCTS.prisma_access.pathPrefix, "/prisma-access/");
    assert.deepEqual(SASE_PRODUCTS.prisma_access.excludeSections, ["release-notes"]);
    assert.equal(SASE_PRODUCTS.prisma_access.combinedFile, "prisma-access-combined.md");
    assert.equal(SASE_PRODUCTS.prisma_access.displayName, "Prisma Access");
  });

  it("exports PRODUCT_FAMILIES with sase containing prisma_access", () => {
    assert.deepEqual(PRODUCT_FAMILIES.sase, ["prisma_access"]);
  });

  it("resolveTargetProducts returns all products when no flag", () => {
    const original = process.argv;
    process.argv = ["node", "test"];
    const result = resolveTargetProducts();
    assert.deepEqual(result, ["prisma_access"]);
    process.argv = original;
  });

  it("resolveTargetProducts returns single product when --product flag given", () => {
    const original = process.argv;
    process.argv = ["node", "test", "--product", "prisma_access"];
    const result = resolveTargetProducts();
    assert.deepEqual(result, ["prisma_access"]);
    process.argv = original;
  });
});
