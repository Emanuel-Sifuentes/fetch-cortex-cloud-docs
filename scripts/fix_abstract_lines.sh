#!/usr/bin/env bash
# Fix Finding 4: Remove standalone "Abstract" metadata lines from source files.
set -euo pipefail

SOURCES_DIR=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --sources) SOURCES_DIR="$2"; shift 2 ;;
    *) shift ;;
  esac
done

if [ -z "$SOURCES_DIR" ]; then
  SOURCES_DIR="$(cd "$(dirname "$0")/../sources_fetch" && pwd)"
fi

echo "=== Step 1: Remove standalone 'Abstract' lines from individual files ==="

count=0
for f in "$SOURCES_DIR"/[0-9]*.md; do
  [ -e "$f" ] || continue
  if grep -q '^Abstract$' "$f"; then
    sed -i '/^Abstract$/d' "$f"
    basename "$f"
    count=$((count + 1))
  fi
done

echo "Fixed $count files."
echo ""

echo "=== Step 2: Verify no remaining standalone 'Abstract' lines ==="
remaining=$(grep -rl '^Abstract$' "$SOURCES_DIR"/[0-9]*.md 2>/dev/null | wc -l || true)
if [ "$remaining" -eq 0 ]; then
  echo "OK: No remaining standalone 'Abstract' lines found."
else
  echo "WARNING: $remaining files still contain standalone 'Abstract' lines!"
  grep -rl '^Abstract$' "$SOURCES_DIR"/[0-9]*.md
  exit 1
fi
