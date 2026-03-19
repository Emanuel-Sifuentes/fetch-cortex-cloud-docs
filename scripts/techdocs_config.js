/**
 * techdocs_config.js — Product configuration for the AEM TechDocs scraper.
 *
 * Each product defines:
 *   - name:   Human-readable product name
 *   - path:   URL path prefix (matches sitemap URLs)
 *   - outDir: Output directory relative to project root
 */

const PRODUCTS = {
  "prisma-browser": {
    name: "Prisma Access Browser",
    path: "prisma-access-browser",
    outDir: "sources_techdocs/prisma-browser",
  },
};

const VALID_PRODUCTS = Object.keys(PRODUCTS);

function parseProductFlag() {
  const idx = process.argv.indexOf("--product");
  if (idx === -1 || idx + 1 >= process.argv.length) {
    console.error(
      `Usage: node scripts/fetch_techdocs.js --product <${VALID_PRODUCTS.join("|")}>`
    );
    process.exit(1);
  }
  const value = process.argv[idx + 1];
  if (!PRODUCTS[value]) {
    console.error(
      `Error: unknown product "${value}" — choose from: ${VALID_PRODUCTS.join(", ")}`
    );
    process.exit(1);
  }
  return value;
}

module.exports = { PRODUCTS, VALID_PRODUCTS, parseProductFlag };
