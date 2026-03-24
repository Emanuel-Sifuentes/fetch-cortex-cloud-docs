#!/usr/bin/env python3
"""Fix Finding 4: Remove standalone 'Abstract' metadata lines from source files."""

import argparse
import glob
import os
import sys


def main():
    parser = argparse.ArgumentParser(description="Remove standalone 'Abstract' lines from source files.")
    parser.add_argument("--sources", default=None, help="Path to sources directory")
    args, _ = parser.parse_known_args()

    sources_dir = args.sources
    if not sources_dir:
        sources_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "sources_fetch")
    sources_dir = os.path.realpath(sources_dir)

    print("=== Step 1: Remove standalone 'Abstract' lines from individual files ===")

    pattern = os.path.join(sources_dir, "[0-9]*.md")
    files = sorted(glob.glob(pattern))
    count = 0
    modified_files = []

    for filepath in files:
        with open(filepath, "r", encoding="utf-8") as f:
            lines = f.readlines()

        filtered = [line for line in lines if line.rstrip("\n") != "Abstract"]

        if len(filtered) < len(lines):
            with open(filepath, "w", encoding="utf-8") as f:
                f.writelines(filtered)
            print(os.path.basename(filepath))
            modified_files.append(filepath)
            count += 1

    print(f"Fixed {count} files.")
    print()

    print("=== Step 2: Verify no remaining standalone 'Abstract' lines ===")
    remaining = 0
    bad_files = []
    for filepath in modified_files:
        with open(filepath, "r", encoding="utf-8") as f:
            for line in f:
                if line.rstrip("\n") == "Abstract":
                    remaining += 1
                    bad_files.append(filepath)
                    break

    if remaining == 0:
        print("OK: No remaining standalone 'Abstract' lines found.")
    else:
        print(f"WARNING: {remaining} files still contain standalone 'Abstract' lines!")
        for bf in bad_files:
            print(bf)
        sys.exit(1)


if __name__ == "__main__":
    main()
