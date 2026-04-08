#!/usr/bin/env python3
"""Purge stale documents from Vertex AI Search that no longer match local segments.

Compares document IDs in the data store against locally generated segments
and deletes any store documents that have no corresponding local segment.

Usage:
    python data_ingestion/purge_stale_docs.py --dry-run
    python data_ingestion/purge_stale_docs.py --product xdr
    python data_ingestion/purge_stale_docs.py
"""

import argparse
import glob
import os
from concurrent.futures import ThreadPoolExecutor, as_completed

from google.api_core.exceptions import NotFound
from google.cloud import discoveryengine

from config import BRANCH_PARENT, MAP_TO_PRODUCT

SOURCES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "sources_fetch")


def local_doc_ids(product_filter: str | None = None) -> set[str]:
    """Build the set of doc IDs that the current local segments would produce."""
    ids = set()

    for map_name, product in MAP_TO_PRODUCT.items():
        products = product if isinstance(product, list) else [product]
        if product_filter and product_filter not in products:
            continue

        segments_dir = os.path.join(SOURCES_DIR, map_name, "public")
        if not os.path.isdir(segments_dir):
            continue

        multi = len(products) > 1

        for filepath in sorted(glob.glob(os.path.join(segments_dir, "segment-*.md"))):
            filename = os.path.basename(filepath)
            base_id = f"{map_name}__{filename.removesuffix('.md')}"

            for p in products:
                if product_filter and p != product_filter:
                    continue
                ids.add(f"{base_id}__{p}" if multi else base_id)

    return ids


def store_doc_names(doc_client, map_prefixes: set[str]) -> list[str]:
    """List all document resource names in the store matching the given map prefixes."""
    request = discoveryengine.ListDocumentsRequest(
        parent=BRANCH_PARENT,
        page_size=1000,
    )

    matching = []
    for doc in doc_client.list_documents(request=request):
        doc_id = doc.name.rsplit("/", 1)[-1]
        prefix = doc_id.split("__")[0]
        if prefix in map_prefixes:
            matching.append(doc.name)

    return matching


def main():
    parser = argparse.ArgumentParser(description="Purge stale documents from Vertex AI Search.")
    parser.add_argument("--dry-run", action="store_true", help="List stale documents without deleting")
    parser.add_argument("--product", default=None, help="Filter to a specific product (e.g. cloud, xdr, xsiam)")
    parser.add_argument("--workers", type=int, default=10, help="Number of concurrent delete workers (default: 10)")
    args = parser.parse_args()

    # Determine which map prefixes we're operating on
    target_maps = set()
    for map_name, product in MAP_TO_PRODUCT.items():
        products = product if isinstance(product, list) else [product]
        if args.product and args.product not in products:
            continue
        target_maps.add(map_name)

    expected = local_doc_ids(product_filter=args.product)
    print(f"Local segments produce {len(expected)} document IDs across maps: {', '.join(sorted(target_maps))}")

    doc_client = discoveryengine.DocumentServiceClient()
    print("Scanning data store...")
    store_docs = store_doc_names(doc_client, target_maps)
    print(f"Found {len(store_docs)} documents in store for these maps")

    stale = []
    for name in store_docs:
        doc_id = name.rsplit("/", 1)[-1]
        if doc_id not in expected:
            stale.append(name)

    if not stale:
        print("No stale documents found.")
        return

    print(f"\n{len(stale)} stale documents to purge:")
    for name in stale[:20]:
        print(f"  {name.rsplit('/', 1)[-1]}")
    if len(stale) > 20:
        print(f"  ... and {len(stale) - 20} more")

    if args.dry_run:
        print("\nDry run — no documents deleted.")
        return

    print(f"\nDeleting {len(stale)} documents with {args.workers} workers...")
    deleted = 0
    errors = 0

    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = {
            executor.submit(_delete_doc, doc_client, name): name
            for name in stale
        }

        for i, future in enumerate(as_completed(futures), 1):
            ok = future.result()
            if ok:
                deleted += 1
            else:
                errors += 1

            if i % 100 == 0 or i == len(stale):
                print(f"  progress: {i}/{len(stale)} (deleted={deleted}, errors={errors})")

    print(f"\nPurge complete: {deleted} deleted, {errors} errors")


def _delete_doc(doc_client, name: str) -> bool:
    try:
        doc_client.delete_document(
            request=discoveryengine.DeleteDocumentRequest(name=name)
        )
        return True
    except NotFound:
        return True
    except Exception as e:
        doc_id = name.rsplit("/", 1)[-1]
        print(f"  FAILED: {doc_id} — {e}")
        return False


if __name__ == "__main__":
    main()
