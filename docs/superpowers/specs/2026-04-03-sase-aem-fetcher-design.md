# SASE AEM Documentation Fetcher — Design Spec

## Problem

The SASE product family documentation (starting with Prisma Access) lives on `docs.paloaltonetworks.com`, a custom Adobe AEM-based CMS. Unlike the Cortex docs (served via Fluid Topics with a clean JSON API), AEM content is server-rendered HTML with no public API. We need a fetcher that discovers pages via sitemap, extracts documentation content from the HTML, converts to markdown, and feeds into the existing segment + ingest pipeline alongside Cortex docs.

## Site Analysis

### Platform: Adobe Experience Manager (AEM)
- **Domain**: `docs.paloaltonetworks.com`
- **Content source**: DITA XML converted to server-rendered HTML
- **Content container**: `doc-set-dita-content-well` CSS class wraps article content
- **CMS chrome**: Navigation, sidebar TOC, language selectors, PDF links, version pickers — must be stripped
- **No JSON API**: Content is only available as rendered HTML pages

### URL Discovery: sitemap.xml
The sitemap at `https://docs.paloaltonetworks.com/sitemap.xml` contains all documentation URLs with `<lastmod>` timestamps. Prisma Access has 720 URLs across 5 sections:

| Section | Pages |
|---------|-------|
| administration | 371 |
| incidents-and-alerts | 153 |
| release-notes | 80 |
| integration | 71 |
| activation-and-onboarding | 45 |

Release notes (80 pages) are excluded from ingestion, leaving ~640 pages.

### SASE Product Family
The SASE landing page links to these products (Prisma Access is the starting point, others are future work):

- Prisma Access
- Prisma SD-WAN
- Prisma SASE Multitenant Platform
- Common Services
- Enterprise DLP
- Strata Logging Service
- Cloud Identity Engine
- SaaS Security
- IoT Security
- Prisma Access Insights
- Cloud-Delivered Security Services (CDSS)

## Architecture

### Config — `scripts/aem_config.js`

Separate from `map_config.js` (different data model, different source platform).

```js
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
```

New products require only uncommenting and filling in the config entry.

### Fetcher — `scripts/fetch_aem.js`

#### Step 1: URL Discovery
- Fetch `sitemap.xml` and parse all `<url>` entries
- Filter URLs where path starts with the product's `pathPrefix`
- Exclude URLs whose second path segment matches any entry in `excludeSections`
- Collect `<lastmod>` timestamp per URL

#### Step 2: Change Detection
- Load existing metadata from `metadata/sase_{product}.json`
- Compare `<lastmod>` per URL against stored values
- Skip pages whose `lastmod` has not changed
- `--force` flag bypasses change detection and re-fetches everything

#### Step 3: Parallel Fetch & Extract
- Fetch each page with concurrency of 10, 200ms delay between batches (matching Cortex fetcher pattern)
- Parse HTML and extract content from the `doc-set-dita-content-well` container
- Strip CMS chrome: navigation, sidebar TOC, language selectors, PDF download links, version pickers, breadcrumb nav, prev/next links
- Use a lightweight HTML parser (no headless browser needed — content is server-rendered)

#### Step 4: HTML to Markdown
- Turndown with GFM plugin (same setup as `fetch_fluidtopics.js`)
- Custom Turndown rules added only as needed for DITA-specific HTML patterns
- No Python fix scripts applied initially — add them later if quality issues emerge

#### Step 5: Output
Write individual files to `sources_fetch/prisma_access/`:

Filename pattern: `0001-{sanitized-title}.md`, `0002-{sanitized-title}.md`, etc.

YAML frontmatter per file:
```yaml
---
title: "Prisma Access Overview"
url: "/prisma-access/administration/prisma-access-overview"
section: "administration"
lastmod: "2026-03-30"
depth: 2
---
```

The `depth` field is derived from the URL path segments relative to the section root. For example:
- `/prisma-access/administration` → depth 0
- `/prisma-access/administration/prisma-access-overview` → depth 1
- `/prisma-access/administration/prisma-access-overview/secure-internet-traffic` → depth 2

#### Step 6: Metadata Persistence
Write `metadata/sase_prisma_access.json`:
```json
{
  "version": 1,
  "source": "aem-sitemap",
  "product": "prisma_access",
  "productFamily": "sase",
  "lastFetched": "2026-04-03T...",
  "pageCount": 640,
  "pages": {
    "/prisma-access/administration/prisma-access-overview": {
      "lastmod": "2026-03-30",
      "title": "Prisma Access Overview",
      "outputFile": "0001-prisma-access-overview.md"
    }
  }
}
```

#### CLI Interface
```bash
node scripts/fetch_aem.js                        # All SASE products
node scripts/fetch_aem.js --product prisma_access # Single product
node scripts/fetch_aem.js --force                 # Skip change detection
```

### Combine Integration — `scripts/generate_combined.js`

Add an AEM-aware branch to the existing combine script. The combine logic itself is identical (strip frontmatter, shift headings by depth, concatenate). The difference is how page order and depth are determined:

- **Fluid Topics products**: Order and depth come from live TOC API
- **AEM products**: Order comes from sitemap URL sequence (which is hierarchical). Depth comes from the `depth` field in each file's YAML frontmatter.

The script detects which source a product belongs to by checking whether it exists in `map_config.js` (Fluid Topics) or `aem_config.js` (AEM).

### Segment Integration — `scripts/segment_combined.py`

Add new entries:
```python
COMBINED_FILES = {
    # ... existing Cortex entries ...
    "prisma_access": "prisma-access-combined.md",
}

PRODUCTS = {
    # ... existing Cortex entries ...
    "sase": ["prisma_access"],
}

DISPLAY_NAMES = {
    # ... existing Cortex entries ...
    "prisma_access": "Prisma Access",
}
```

### Ingest Integration — `data_ingestion/config.py`

Update `MAP_TO_PRODUCT` to include SASE products:
```python
MAP_TO_PRODUCT = {
    # Cortex products (existing)
    "appsec": "cloud",
    "posture": "cloud",
    "runtime": "cloud",
    "cortex_gateway": "gateway",
    "xdr_5": "xdr",
    "xdr_compatibility": "xdr",
    "xsiam_3": "xsiam",
    "agentix": "agentix",
    # SASE products (new)
    "prisma_access": "prisma_access",
}
```

Replace the `PRODUCT_FAMILY` constant with a mapping:
```python
MAP_TO_PRODUCT_FAMILY = {
    "appsec": "cortex",
    "posture": "cortex",
    "runtime": "cortex",
    "cortex_gateway": "cortex",
    "xdr_5": "cortex",
    "xdr_compatibility": "cortex",
    "xsiam_3": "cortex",
    "agentix": "cortex",
    "prisma_access": "sase",
}
```

The `discover_segments` function and `ingest_document` function use this mapping to set the correct `product_family` metadata per document.

## npm Scripts Convention

Rename all scripts to follow `{command}:{family}:{product}` pattern:

### Cortex (renamed from existing)
```
fetch:cortex                    # All Cortex products
fetch:cortex:cloud              # Cloud (appsec + posture + runtime)
fetch:cortex:xdr                # XDR
fetch:cortex:xsiam              # XSIAM
fetch:cortex:gateway            # Gateway
fetch:cortex:agentix            # AgentiX
fix:cortex
fix:cortex:cloud
combine:cortex
combine:cortex:cloud
```

### SASE (new)
```
fetch:sase                      # All SASE products
fetch:sase:prisma_access        # Just Prisma Access
fix:sase
fix:sase:prisma_access
combine:sase
combine:sase:prisma_access
```

Old script names are removed (clean break).

Family-level commands iterate over all products in that family. Each product retains its own folder, combined file, and segments — no merging across products.

## Folder Structure

```
sources_fetch/
  appsec/                        # Cortex (unchanged)
  posture/
  runtime/
  cortex_gateway/
  xdr_5/
  xdr_compatibility/
  xsiam_3/
  agentix/
  prisma_access/                 # NEW
    0001-prisma-access-overview.md
    0002-secure-internet-traffic.md
    ...
    prisma-access-combined.md
    public/
      segment-001-prisma-access-overview.md
      ...

metadata/
  cloud.json                     # Cortex snapshots (unchanged)
  xdr.json
  xsiam.json
  gateway.json
  agentix.json
  api_specs_cloud.json
  sase_prisma_access.json        # NEW
```

## Future Extensibility

Adding a new SASE product requires:
1. Uncomment its entry in `aem_config.js`
2. Add entries to `segment_combined.py` (COMBINED_FILES, PRODUCTS, DISPLAY_NAMES)
3. Add entries to `data_ingestion/config.py` (MAP_TO_PRODUCT, MAP_TO_PRODUCT_FAMILY)
4. Add npm scripts for the new product

No changes to the fetcher, combine, segment, or ingest logic itself.

## Fix Pipeline

The SASE fetcher starts without Python fix scripts. The existing fix pipeline (`fix_abstract_lines.py`, `fix_escaped_chars_in_fences.py`, etc.) was built for Fluid Topics HTML quirks and may not apply to DITA-sourced content. If quality issues emerge in the markdown output, we add targeted fixers. The architecture supports this — `fix.js` can be extended to run fixers conditionally based on the product source.
