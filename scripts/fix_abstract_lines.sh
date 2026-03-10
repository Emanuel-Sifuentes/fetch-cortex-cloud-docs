#!/usr/bin/env bash
# Fix Finding 4: Remove standalone "Abstract" metadata lines from source files
# and regenerate the combined markdown file.
set -euo pipefail

SOURCES_DIR="$(cd "$(dirname "$0")/../sources_fetch" && pwd)"
COMBINED="$SOURCES_DIR/cortex-cloud-appsec-combined.md"

echo "=== Step 1: Remove standalone 'Abstract' lines from individual files ==="

count=0
for f in "$SOURCES_DIR"/[0-9][0-9][0-9]-*.md; do
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
remaining=$(grep -rl '^Abstract$' "$SOURCES_DIR"/[0-9][0-9][0-9]-*.md 2>/dev/null | wc -l || true)
if [ "$remaining" -eq 0 ]; then
  echo "OK: No remaining standalone 'Abstract' lines found."
else
  echo "WARNING: $remaining files still contain standalone 'Abstract' lines!"
  grep -rl '^Abstract$' "$SOURCES_DIR"/[0-9][0-9][0-9]-*.md
  exit 1
fi
echo ""

echo "=== Step 3: Regenerate combined markdown file ==="
# Match the logic from fetch_fluidtopics.js:
# - Filter .md files, excluding cortex-cloud-appsec-combined.md and README.md
# - Sort alphabetically
# - Strip frontmatter (^---...---\n)
# - Join with \n\n---\n\n

first=true
: > "$COMBINED"  # truncate

for f in $(ls "$SOURCES_DIR"/*.md | sort); do
  fname="$(basename "$f")"
  # Skip combined file and README
  if [ "$fname" = "cortex-cloud-appsec-combined.md" ] || [ "$fname" = "README.md" ]; then
    continue
  fi

  # Strip frontmatter: everything from first --- to second ---, inclusive, plus trailing newline
  # The JS regex is: /^---[\s\S]*?---\n/
  # In awk: skip from line 1 (if ---) to the next --- line, then print the rest
  content=$(awk '
    BEGIN { in_fm = 0; found_end = 0 }
    NR == 1 && /^---$/ { in_fm = 1; next }
    in_fm && /^---$/ { in_fm = 0; found_end = 1; next }
    in_fm { next }
    { print }
  ' "$f")

  if [ "$first" = true ]; then
    first=false
  else
    printf '\n\n---\n\n' >> "$COMBINED"
  fi

  printf '%s\n' "$content" >> "$COMBINED"
done

echo "Combined file written: $COMBINED"
echo "Size: $(wc -c < "$COMBINED") bytes"
echo ""

echo "=== Step 4: Final verification ==="
abstract_in_combined=$(grep -c '^Abstract$' "$COMBINED" || true)
echo "Standalone 'Abstract' lines in combined file: $abstract_in_combined"

echo ""
echo "Done!"
