#!/usr/bin/env python3
"""Test search queries against the ingested Vertex AI Search data store.

Usage:
    python data_ingestion/query.py
"""

from google.cloud import discoveryengine

from config import DATA_STORE_ID, PROJECT_ID


def search(query: str, filter_string: str = "", page_size: int = 3):
    client = discoveryengine.SearchServiceClient()

    serving_config = client.serving_config_path(
        project=PROJECT_ID,
        location="global",
        data_store=DATA_STORE_ID,
        serving_config="default_config",
    )

    request = discoveryengine.SearchRequest(
        serving_config=serving_config,
        query=query,
        filter=filter_string,
        page_size=page_size,
    )

    print(f"\nQuery:  '{query}'")
    print(f"Filter: {filter_string or '(none)'}")

    try:
        response = client.search(request)
    except Exception as e:
        print(f"  Search failed: {e}")
        return

    if not response.results:
        print("  No results found.")
        print("-" * 60)
        return

    for i, result in enumerate(response.results, 1):
        doc = result.document
        meta = doc.struct_data
        print(f"\n  Result {i}: {doc.id}")
        print(f"    product_family={meta.get('product_family')}, product={meta.get('product')}, audience={meta.get('audience')}")

        snippets = doc.derived_struct_data.get("snippets", [])
        if snippets:
            text = snippets[0].get("snippet", "").replace("\n", " ")
            print(f"    snippet: {text[:200]}")

    print("\n" + "-" * 60)


if __name__ == "__main__":
    QUERY = "findings issues cases"

    # Test 1-5: Same query scoped to each product individually
    for product in ["cloud", "xdr", "xsiam", "agentix", "gateway"]:
        search(
            query=QUERY,
            filter_string=f'product: ANY("{product}") AND audience: ANY("public")',
        )

    # Test 6: Same query with product_family filter only — should return results across products
    search(
        query=QUERY,
        filter_string='product_family: ANY("cortex") AND audience: ANY("public")',
    )
