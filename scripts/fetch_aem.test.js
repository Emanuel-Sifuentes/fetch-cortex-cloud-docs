const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { parseSitemap, filterUrls, computeDepth } = require("./fetch_aem.js");

const SAMPLE_SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://docs.paloaltonetworks.com/prisma-access/administration/prisma-access-overview</loc>
    <lastmod>2026-03-30</lastmod>
  </url>
  <url>
    <loc>https://docs.paloaltonetworks.com/prisma-access/administration/prisma-access-overview/secure-internet-traffic</loc>
    <lastmod>2026-03-28</lastmod>
  </url>
  <url>
    <loc>https://docs.paloaltonetworks.com/prisma-access/release-notes/4-0/prisma-access-about</loc>
    <lastmod>2026-03-15</lastmod>
  </url>
  <url>
    <loc>https://docs.paloaltonetworks.com/other-product/some-page</loc>
    <lastmod>2026-03-10</lastmod>
  </url>
</urlset>`;

describe("parseSitemap", () => {
  it("extracts loc and lastmod from sitemap XML", () => {
    const entries = parseSitemap(SAMPLE_SITEMAP);
    assert.equal(entries.length, 4);
    assert.equal(entries[0].loc, "https://docs.paloaltonetworks.com/prisma-access/administration/prisma-access-overview");
    assert.equal(entries[0].lastmod, "2026-03-30");
  });

  it("handles entries without lastmod", () => {
    const xml = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/page</loc></url>
</urlset>`;
    const entries = parseSitemap(xml);
    assert.equal(entries.length, 1);
    assert.equal(entries[0].lastmod, null);
  });
});

describe("filterUrls", () => {
  it("filters by pathPrefix and excludes sections", () => {
    const entries = parseSitemap(SAMPLE_SITEMAP);
    const filtered = filterUrls(entries, "/prisma-access/", ["release-notes"]);
    assert.equal(filtered.length, 2);
    assert.ok(filtered[0].loc.includes("prisma-access-overview"));
    assert.ok(filtered[1].loc.includes("secure-internet-traffic"));
  });

  it("excludes URLs not matching pathPrefix", () => {
    const entries = parseSitemap(SAMPLE_SITEMAP);
    const filtered = filterUrls(entries, "/other-product/", []);
    assert.equal(filtered.length, 1);
    assert.ok(filtered[0].loc.includes("other-product"));
  });
});

describe("computeDepth", () => {
  it("computes depth relative to pathPrefix", () => {
    assert.equal(computeDepth("/prisma-access/administration", "/prisma-access/"), 0);
    assert.equal(computeDepth("/prisma-access/administration/overview", "/prisma-access/"), 1);
    assert.equal(computeDepth("/prisma-access/administration/overview/sub", "/prisma-access/"), 2);
  });
});
