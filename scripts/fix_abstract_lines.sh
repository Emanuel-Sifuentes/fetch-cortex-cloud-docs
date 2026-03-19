#!/usr/bin/env bash
# Fix Finding 4: Remove standalone "Abstract" metadata lines from source files.
set -euo pipefail

SOURCES_DIR="$(cd "$(dirname "$0")/../sources_fetch" && pwd)"

echo "=== Step 1: Remove standalone 'Abstract' lines from individual files ==="

count=0
for f in "$SOURCES_DIR"/[0-9]*.md; do
  # Check if the file contains a standalone Abstract line
  if grep -q '^Abstract$' "$f"; then
    # Remove lines that are exactly "Abstract" (standalone)
    # Using sed in-place (GNU sed on Git Bash)
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
