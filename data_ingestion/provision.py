#!/usr/bin/env python3
"""Provision Vertex AI Search infrastructure: Data Store + Engine.

Usage:
    python data_ingestion/provision.py
    python data_ingestion/provision.py --dry-run
"""

import argparse

from google.api_core.exceptions import AlreadyExists
from google.cloud import discoveryengine

from config import (
    COLLECTION,
    DATA_STORE_ID,
    ENGINE_ID,
    PROJECT_ID,
)


def create_data_store(dry_run: bool = False):
    """Create a CONTENT_REQUIRED data store for full-text search + metadata."""
    print(f"[1/2] Creating Data Store: '{DATA_STORE_ID}'...")

    if dry_run:
        print(f"  [dry-run] Would create data store '{DATA_STORE_ID}' in {COLLECTION}")
        return

    client = discoveryengine.DataStoreServiceClient()
    try:
        operation = client.create_data_store(
            request=discoveryengine.CreateDataStoreRequest(
                parent=COLLECTION,
                data_store_id=DATA_STORE_ID,
                data_store=discoveryengine.DataStore(
                    display_name=f"Cortex Docs Store ({DATA_STORE_ID})",
                    industry_vertical=discoveryengine.IndustryVertical.GENERIC,
                    solution_types=[discoveryengine.SolutionType.SOLUTION_TYPE_SEARCH],
                    content_config=discoveryengine.DataStore.ContentConfig.CONTENT_REQUIRED,
                ),
            )
        )
        operation.result()
        print("  Data Store created.")
    except AlreadyExists:
        print("  Data Store already exists, skipping.")


def create_engine(dry_run: bool = False):
    """Create an Enterprise-tier search engine.

    Enterprise tier is required for metadata filtering (struct_data fields).
    """
    print(f"[2/2] Creating Engine: '{ENGINE_ID}'...")

    if dry_run:
        print(f"  [dry-run] Would create engine '{ENGINE_ID}' with data store '{DATA_STORE_ID}'")
        return

    client = discoveryengine.EngineServiceClient()
    try:
        operation = client.create_engine(
            request=discoveryengine.CreateEngineRequest(
                parent=COLLECTION,
                engine_id=ENGINE_ID,
                engine=discoveryengine.Engine(
                    display_name=f"Cortex Docs Engine ({ENGINE_ID})",
                    solution_type=discoveryengine.SolutionType.SOLUTION_TYPE_SEARCH,
                    industry_vertical=discoveryengine.IndustryVertical.GENERIC,
                    data_store_ids=[DATA_STORE_ID],
                    search_engine_config=discoveryengine.Engine.SearchEngineConfig(
                        search_tier=discoveryengine.SearchTier.SEARCH_TIER_ENTERPRISE,
                    ),
                ),
            )
        )
        operation.result()
        print("  Engine created.")
    except AlreadyExists:
        print("  Engine already exists, skipping.")


def main():
    parser = argparse.ArgumentParser(description="Provision Vertex AI Search infrastructure.")
    parser.add_argument("--dry-run", action="store_true", help="Print what would be created without making API calls")
    args = parser.parse_args()

    print(f"Project:    {PROJECT_ID}")
    print(f"Data Store: {DATA_STORE_ID}")
    print(f"Engine:     {ENGINE_ID}")
    print()

    create_data_store(dry_run=args.dry_run)
    print()
    create_engine(dry_run=args.dry_run)

    print()
    if args.dry_run:
        print("Dry run complete. No resources were created.")
    else:
        print("Provisioning complete.")
        print()
        print("Next step: ingest documents with")
        print("  python data_ingestion/ingest.py")


if __name__ == "__main__":
    main()
