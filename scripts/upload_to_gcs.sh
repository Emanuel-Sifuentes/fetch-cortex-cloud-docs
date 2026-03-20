#!/usr/bin/env bash
# scripts/upload_to_gcs.sh
# Uploads combined product files and H1 split files to GCS for RAG ingestion.
# Usage: bash scripts/upload_to_gcs.sh [--bucket <name>] [--dry-run] [--product <name>]
#
# Bucket layout:
#   gs://<bucket>/
#     agentix/cortex-agentix-combined.md
#     agentix/h1_split/learn-about-cortex-agentix.md
#     agentix/h1_split/onboard-cortex-agentix.md
#     posture/cortex-cloud-posture-combined.md
#     posture/h1_split/get-started-with-cortex-cloud.md
#     ...

set -euo pipefail

BUCKET="${GCS_RAG_BUCKET:-gs://esifuentes-rag-engine-bucket}"
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

upload() {
  local src="$1" dest="$2"
  if $DRY_RUN; then
    echo "[dry-run] $src -> $dest"
  else
    gcloud storage cp "$src" "$dest"
  fi
}

uploaded=0

for product_dir in "$SOURCES_DIR"/*/; do
  product="$(basename "$product_dir")"

  if [[ -n "$FILTER_PRODUCT" && "$product" != "$FILTER_PRODUCT" ]]; then
    continue
  fi

  # Upload combined file
  combined=$(find "$product_dir" -maxdepth 1 -name '*-combined.md' -print -quit)
  if [[ -n "$combined" ]]; then
    upload "$combined" "$BUCKET/$product/$(basename "$combined")"
    uploaded=$((uploaded + 1))
  fi

  # Upload H1 split files
  split_dir="$product_dir/${product}_split_h1"
  if [[ -d "$split_dir" ]]; then
    for f in "$split_dir"/*.md; do
      [[ -f "$f" ]] || continue
      upload "$f" "$BUCKET/$product/h1_split/$(basename "$f")"
      uploaded=$((uploaded + 1))
    done
  fi
done

echo ""
if $DRY_RUN; then
  echo "Dry run complete: $uploaded files would be uploaded"
else
  echo "Upload complete: $uploaded files uploaded to $BUCKET"
fi
