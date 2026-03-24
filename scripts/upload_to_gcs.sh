#!/usr/bin/env bash
# scripts/upload_to_gcs.sh
# Uploads pre-segmented files to GCS for RAG ingestion.
# Usage: bash scripts/upload_to_gcs.sh [--bucket <name>] [--dry-run] [--product <name>]
#
# Bucket layout:
#   gs://<bucket>/
#     agentix/public/segment-001-learn-about-cortex-agentix.md
#     agentix/public/segment-002-onboard-cortex-agentix.md
#     posture/public/segment-001-get-started-with-cortex-cloud.md
#     ...

set -euo pipefail

BUCKET="${GCS_RAG_BUCKET:-gs://esifuentes-cortex-combined-rag}"
SOURCES_DIR="$(cd "$(dirname "$0")/.." && pwd)/sources_fetch"

DRY_RUN=false
FILTER_PRODUCT=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --bucket)   BUCKET="gs://$2"; shift 2 ;;
    --dry-run)  DRY_RUN=true; shift ;;
    --product)  FILTER_PRODUCT="$2"; shift 2 ;;
    *)          echo "Unknown flag: $1" >&2; exit 1 ;;
  esac
done

uploaded=0

for product_dir in "$SOURCES_DIR"/*/; do
  product="$(basename "$product_dir")"

  if [[ -n "$FILTER_PRODUCT" && "$product" != "$FILTER_PRODUCT" ]]; then
    continue
  fi

  segments_dir="$product_dir/public"
  if [[ ! -d "$segments_dir" ]]; then
    continue
  fi

  file_count=$(find "$segments_dir" -name '*.md' -type f | wc -l)
  if [[ "$file_count" -eq 0 ]]; then
    continue
  fi

  if $DRY_RUN; then
    echo "[dry-run] $product: $file_count files -> $BUCKET/$product/public"
  else
    echo "Uploading $product ($file_count files)..."
    gcloud storage rsync "$segments_dir" "$BUCKET/$product/public" --delete-unmatched-destination-objects
    echo "  $product done."
  fi

  uploaded=$((uploaded + file_count))
done

echo ""
if $DRY_RUN; then
  echo "Dry run complete: $uploaded files would be uploaded"
else
  echo "Upload complete: $uploaded files uploaded to $BUCKET"
fi
