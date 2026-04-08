#!/usr/bin/env python3
"""One-time cleanup: delete old xdr_compatibility documents that used un-suffixed IDs.

After switching xdr_compatibility to multi-product ingestion, each segment is
now ingested with a product-suffixed ID (e.g. xdr_compatibility__segment-001__xdr).
The old un-suffixed documents (e.g. xdr_compatibility__segment-001-foo) remain in
the data store and should be removed.

Usage:
    python data_ingestion/cleanup_old_xdr_compat_docs.py --dry-run
    python data_ingestion/cleanup_old_xdr_compat_docs.py
"""

import argparse

from google.api_core.exceptions import NotFound
from google.cloud import discoveryengine

from config import BRANCH_PARENT


def list_old_xdr_compat_docs(doc_client) -> list[str]:
    """Find xdr_compatibility documents that lack a product suffix."""
    old_docs = []
    request = discoveryengine.ListDocumentsRequest(
        parent=BRANCH_PARENT,
        page_size=100,
    )

    for doc in doc_client.list_documents(request=request):
        doc_id = doc.name.rsplit("/", 1)[-1]
        if not doc_id.startswith("xdr_compatibility__"):
            continue
        # New docs end with __xdr, __cloud, or __xsiam
        if doc_id.endswith(("__xdr", "__cloud", "__xsiam")):
            continue
        old_docs.append(doc.name)

    return old_docs


def main():
    parser = argparse.ArgumentParser(
        description="Delete old un-suffixed xdr_compatibility documents."
    )
    parser.add_argument("--dry-run", action="store_true", help="List documents without deleting")
    args = parser.parse_args()

    doc_client = discoveryengine.DocumentServiceClient()

    print("Scanning for old xdr_compatibility documents...")
    old_docs = list_old_xdr_compat_docs(doc_client)

    if not old_docs:
        print("No old documents found. Nothing to clean up.")
        return

    print(f"Found {len(old_docs)} old documents:")
    for name in old_docs:
        doc_id = name.rsplit("/", 1)[-1]
        print(f"  {doc_id}")

    if args.dry_run:
        print("\nDry run — no documents deleted.")
        return

    print(f"\nDeleting {len(old_docs)} documents...")
    deleted = 0
    errors = 0
    for name in old_docs:
        try:
            doc_client.delete_document(
                request=discoveryengine.DeleteDocumentRequest(name=name)
            )
            deleted += 1
        except NotFound:
            deleted += 1  # Already gone
        except Exception as e:
            errors += 1
            doc_id = name.rsplit("/", 1)[-1]
            print(f"  FAILED: {doc_id} — {e}")

    print(f"Cleanup complete: {deleted} deleted, {errors} errors")


if __name__ == "__main__":
    main()
