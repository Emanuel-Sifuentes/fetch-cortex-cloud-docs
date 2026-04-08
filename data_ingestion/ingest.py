#!/usr/bin/env python3
"""Ingest document segments into Vertex AI Search via CreateDocument API.

Reads segments from local sources_fetch/*/public/segment-*.md, attaches
product metadata, and ingests them into the provisioned data store.
After ingestion, updates the schema to mark metadata fields as filterable.

Usage:
    python data_ingestion/ingest.py
    python data_ingestion/ingest.py --dry-run
    python data_ingestion/ingest.py --product cloud
    python data_ingestion/ingest.py --workers 20
"""

import argparse
import glob
import json
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

from google.api_core import retry
from google.api_core.exceptions import AlreadyExists, ResourceExhausted, ServiceUnavailable
from google.cloud import discoveryengine

from config import (
    BRANCH_PARENT,
    FILTERABLE_FIELDS,
    MAP_TO_PRODUCT,
    MAP_TO_PRODUCT_FAMILY,
    SCHEMA_NAME,
)

SOURCES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "sources_fetch")


def discover_segments(product_filter: str | None = None) -> list[dict]:
    """Find all segment files and build document metadata for each.

    Maps tagged with multiple products (list values in MAP_TO_PRODUCT) are
    ingested once per product with a product-suffixed doc ID, keeping the
    schema's ``product`` field as a scalar string.
    """
    documents = []

    for map_name, product in MAP_TO_PRODUCT.items():
        products = product if isinstance(product, list) else [product]
        if product_filter and product_filter not in products:
            continue

        segments_dir = os.path.join(SOURCES_DIR, map_name, "public")
        if not os.path.isdir(segments_dir):
            continue

        product_family = MAP_TO_PRODUCT_FAMILY.get(map_name, "cortex")
        multi = len(products) > 1

        pattern = os.path.join(segments_dir, "segment-*.md")
        for filepath in sorted(glob.glob(pattern)):
            filename = os.path.basename(filepath)
            base_id = f"{map_name}__{filename.removesuffix('.md')}"

            for p in products:
                if product_filter and p != product_filter:
                    continue
                documents.append({
                    "id": f"{base_id}__{p}" if multi else base_id,
                    "path": filepath,
                    "product_family": product_family,
                    "product": p,
                    "audience": "public",
                })

    return documents


def _build_document(doc: dict) -> tuple[str, discoveryengine.Document]:
    """Build a Document proto and read file content. Returns (content_text, Document)."""
    with open(doc["path"], "r", encoding="utf-8") as f:
        content = f.read()

    return content, discoveryengine.Document(
        name=f"{BRANCH_PARENT}/documents/{doc['id']}",
        struct_data={
            "product_family": doc["product_family"],
            "product": doc["product"],
            "audience": doc["audience"],
        },
        content=discoveryengine.Document.Content(
            mime_type="text/plain",
            raw_bytes=content.encode("utf-8"),
        ),
    )


def ingest_document(doc_client, doc: dict, upsert: bool = False) -> tuple[str, str]:
    """Ingest a single document. Returns (doc_id, status).

    When *upsert* is False (default), uses CreateDocument which skips
    documents that already exist.  When True, uses UpdateDocument with
    allow_missing so documents are created or replaced.
    """
    _, document = _build_document(doc)

    try:
        if upsert:
            _upsert_with_retry(doc_client, document)
            return (doc["id"], "upserted")
        else:
            _create_with_retry(doc_client, doc["id"], document)
            return (doc["id"], "created")
    except AlreadyExists:
        return (doc["id"], "exists")
    except Exception as e:
        return (doc["id"], f"error: {e}")


@retry.Retry(
    predicate=retry.if_exception_type(ResourceExhausted, ServiceUnavailable),
    initial=1.0,
    maximum=30.0,
    multiplier=2.0,
)
def _create_with_retry(doc_client, doc_id, document):
    """CreateDocument with exponential backoff on transient errors."""
    return doc_client.create_document(
        request=discoveryengine.CreateDocumentRequest(
            parent=BRANCH_PARENT,
            document_id=doc_id,
            document=document,
        )
    )


@retry.Retry(
    predicate=retry.if_exception_type(ResourceExhausted, ServiceUnavailable),
    initial=1.0,
    maximum=30.0,
    multiplier=2.0,
)
def _upsert_with_retry(doc_client, document):
    """UpdateDocument (allow_missing) with exponential backoff on transient errors."""
    return doc_client.update_document(
        request=discoveryengine.UpdateDocumentRequest(
            document=document,
            allow_missing=True,
        )
    )


def update_schema():
    """Fetch the auto-detected schema and mark metadata fields as filterable."""
    print("\nUpdating schema to enable metadata filtering...")
    schema_client = discoveryengine.SchemaServiceClient()

    schema_dict = None
    for attempt in range(5):
        try:
            current = schema_client.get_schema(name=SCHEMA_NAME)
            schema_dict = json.loads(current.json_schema)
            break
        except Exception as e:
            if attempt < 4:
                print(f"  Schema not ready, retrying in 10s... (attempt {attempt + 1}/5)")
                time.sleep(10)
            else:
                print(f"  Failed to fetch schema: {e}")
                print("  Run this step manually later once documents are indexed.")
                return False

    updated = set()

    def mark_filterable(props):
        for name, defn in props.items():
            if name in FILTERABLE_FIELDS:
                defn["filterable"] = True
                updated.add(name)
            if "properties" in defn:
                mark_filterable(defn["properties"])

    mark_filterable(schema_dict.get("properties", {}))

    missing = FILTERABLE_FIELDS - updated
    if missing:
        print(f"  WARNING: Schema missing fields: {missing}")
        print("  Aborting schema update — retry after more documents are indexed.")
        return False

    try:
        schema_client.update_schema(
            request=discoveryengine.UpdateSchemaRequest(
                schema=discoveryengine.Schema(
                    name=SCHEMA_NAME,
                    json_schema=json.dumps(schema_dict),
                )
            )
        ).result(timeout=120)
        print(f"  Schema updated. Filterable fields: {updated}")
        return True
    except Exception as e:
        print(f"  Failed to update schema: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Ingest document segments into Vertex AI Search.")
    parser.add_argument("--dry-run", action="store_true", help="List documents without ingesting")
    parser.add_argument("--product", default=None, help="Filter to a specific product (e.g. cloud, xdr, xsiam)")
    parser.add_argument("--upsert", action="store_true", help="Update existing documents instead of skipping them")
    parser.add_argument("--workers", type=int, default=10, help="Number of concurrent workers (default: 10)")
    parser.add_argument("--skip-schema", action="store_true", help="Skip the schema update step")
    args = parser.parse_args()

    documents = discover_segments(product_filter=args.product)
    if not documents:
        print("No segments found.")
        sys.exit(1)

    product_counts = {}
    for doc in documents:
        product_counts[doc["product"]] = product_counts.get(doc["product"], 0) + 1
    print("Segments discovered:")
    for product, count in sorted(product_counts.items()):
        print(f"  {product}: {count}")
    print(f"  total: {len(documents)}")
    print()

    if args.dry_run:
        print("Dry run — no documents will be ingested.")
        return

    mode = "upsert" if args.upsert else "create"
    print(f"Ingesting {len(documents)} documents ({mode} mode) with {args.workers} workers...")
    doc_client = discoveryengine.DocumentServiceClient()

    succeeded = 0
    skipped = 0
    errors = 0

    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = {
            executor.submit(ingest_document, doc_client, doc, args.upsert): doc
            for doc in documents
        }

        for i, future in enumerate(as_completed(futures), 1):
            doc_id, status = future.result()
            if status in ("created", "upserted"):
                succeeded += 1
            elif status == "exists":
                skipped += 1
            else:
                errors += 1
                print(f"  FAILED: {doc_id} — {status}")

            if i % 100 == 0 or i == len(documents):
                print(f"  progress: {i}/{len(documents)} ({mode}d={succeeded}, skipped={skipped}, errors={errors})")

    print(f"\nIngestion complete: {succeeded} {mode}d, {skipped} skipped, {errors} errors")

    if errors > 0:
        print(f"WARNING: {errors} documents failed to ingest.")

    if not args.skip_schema and succeeded > 0:
        update_schema()
    elif not args.skip_schema and succeeded == 0:
        print("\nSkipping schema update: no new documents were ingested.")


if __name__ == "__main__":
    main()
