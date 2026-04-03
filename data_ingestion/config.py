"""Shared configuration for data ingestion pipeline."""

import os

PROJECT_ID = os.environ.get("GCP_PROJECT_ID", "prod-zj54oka8feta")
LOCATION = "global"
DATA_STORE_ID = os.environ.get("DATA_STORE_ID", "cortex-docs-store-v1")
ENGINE_ID = os.environ.get("ENGINE_ID", "cortex-docs-engine-v1")

COLLECTION = f"projects/{PROJECT_ID}/locations/{LOCATION}/collections/default_collection"
DATA_STORE_RESOURCE = f"{COLLECTION}/dataStores/{DATA_STORE_ID}"
BRANCH_PARENT = f"{DATA_STORE_RESOURCE}/branches/0"
SCHEMA_NAME = f"{DATA_STORE_RESOURCE}/schemas/default_schema"

FILTERABLE_FIELDS = {"product_family", "product", "audience"}

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

# Map directory names to product metadata values for struct_data.
# Keys match the folder names in sources_fetch/ and GCS bucket.
# Values are the product label used for metadata filtering.
MAP_TO_PRODUCT = {
    "appsec": "cloud",
    "posture": "cloud",
    "runtime": "cloud",
    "cortex_gateway": "gateway",
    "xdr_5": "xdr",
    "xdr_compatibility": "xdr",
    "xsiam_3": "xsiam",
    "agentix": "agentix",
    "prisma_access": "prisma_access",
}
