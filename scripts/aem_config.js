const SASE_PRODUCTS = {
  prisma_access: {
    sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
    pathPrefix: "/prisma-access/",
    excludeSections: ["release-notes"],
    combinedFile: "prisma-access-combined.md",
    displayName: "Prisma Access",
  },
  // prisma_sdwan: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/prisma/prisma-sd-wan/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "prisma-sdwan-combined.md",
  //   displayName: "Prisma SD-WAN",
  // },
  // prisma_sase_multitenant: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/sase/prisma-sase-multitenant-platform/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "prisma-sase-multitenant-combined.md",
  //   displayName: "Prisma SASE Multitenant Platform",
  // },
  // common_services: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/common-services/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "common-services-combined.md",
  //   displayName: "Common Services",
  // },
  // enterprise_dlp: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/enterprise-dlp/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "enterprise-dlp-combined.md",
  //   displayName: "Enterprise DLP",
  // },
  // strata_logging_service: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/strata-logging-service/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "strata-logging-service-combined.md",
  //   displayName: "Strata Logging Service",
  // },
  // cloud_identity_engine: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/cloud-identity/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "cloud-identity-engine-combined.md",
  //   displayName: "Cloud Identity Engine",
  // },
  // saas_security: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/saas-security/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "saas-security-combined.md",
  //   displayName: "SaaS Security",
  // },
  // iot_security: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/iot/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "iot-security-combined.md",
  //   displayName: "IoT Security",
  // },
  // prisma_access_insights: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/prisma/prisma-access/prisma-access-insights/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "prisma-access-insights-combined.md",
  //   displayName: "Prisma Access Insights",
  // },
  // cdss: {
  //   sitemapUrl: "https://docs.paloaltonetworks.com/sitemap.xml",
  //   pathPrefix: "/cdss/",
  //   excludeSections: ["release-notes"],
  //   combinedFile: "cdss-combined.md",
  //   displayName: "Cloud-Delivered Security Services",
  // },
};

const PRODUCT_FAMILIES = {
  sase: ["prisma_access"],
};

const VALID_PRODUCTS = Object.keys(SASE_PRODUCTS);

function parseProductFlag() {
  const idx = process.argv.indexOf("--product");
  if (idx === -1 || idx + 1 >= process.argv.length) return null;
  const value = process.argv[idx + 1];
  if (!SASE_PRODUCTS[value]) {
    console.error(`Error: unknown SASE product "${value}" -- choose from: ${VALID_PRODUCTS.join(", ")}`);
    process.exit(1);
  }
  return value;
}

function resolveTargetProducts() {
  const product = parseProductFlag();
  if (product) return [product];
  return VALID_PRODUCTS;
}

module.exports = { SASE_PRODUCTS, PRODUCT_FAMILIES, VALID_PRODUCTS, parseProductFlag, resolveTargetProducts };
