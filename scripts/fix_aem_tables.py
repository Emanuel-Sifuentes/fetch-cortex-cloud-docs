#!/usr/bin/env python3
"""Rejoin broken markdown table rows where cell content is split across lines."""

import argparse
import glob
import os
import re
import sys

SEPARATOR_PATTERN = re.compile(r"^\|[\s\-:|]+\|$")


def count_pipes(line):
    return len(re.findall(r"(?<!\\)\|", line))


def _is_collection_terminator(stripped):
    if stripped.startswith("#"):
        return True
    if stripped.startswith("```"):
        return True
    return False


def _join_broken_header(result, expected_pipes):
    """Retroactively join broken header rows preceding a separator."""
    if not result:
        return

    pipe_indices = []
    for j in range(len(result) - 1, -1, -1):
        s = result[j].strip()
        if "|" in s:
            pipe_indices.append(j)
        elif s == "":
            continue
        elif SEPARATOR_PATTERN.match(s) or s.startswith("#") or s.startswith("```"):
            break
        else:
            if pipe_indices:
                continue
            else:
                break

    if len(pipe_indices) < 2:
        return

    start = min(pipe_indices)
    region = result[start:]
    non_blank = [l.strip() for l in region if l.strip()]

    if len(non_blank) <= 1:
        return

    joined = " ".join(l.strip() for l in region if l.strip())
    joined = re.sub(r"\s+", " ", joined)

    if count_pipes(joined) >= expected_pipes:
        del result[start:]
        result.append(joined)


def fix_broken_rows(md):
    lines = md.split("\n")
    result = []
    expected_pipes = 0
    i = 0

    while i < len(lines):
        stripped = lines[i].rstrip()

        if SEPARATOR_PATTERN.match(stripped):
            _join_broken_header(result, count_pipes(stripped))
            expected_pipes = count_pipes(stripped)
            result.append(lines[i])
            i += 1
            continue

        if expected_pipes > 0 and stripped.startswith("|"):
            pipes = count_pipes(stripped)
            if pipes >= expected_pipes:
                result.append(lines[i])
                i += 1
                continue

            parts = [stripped]
            i += 1
            while i < len(lines):
                ns = lines[i].rstrip()
                if ns.startswith("|") and count_pipes(ns) >= expected_pipes:
                    break
                if SEPARATOR_PATTERN.match(ns):
                    break
                if ns.strip() != "" and _is_collection_terminator(ns.strip()):
                    break
                parts.append(ns)
                i += 1

            joined = " ".join(p for p in parts if p.strip())
            joined = re.sub(r"\s+", " ", joined).strip()
            result.append(joined)
            continue

        if stripped == "":
            result.append(lines[i])
            i += 1
            continue

        if not stripped.startswith("|"):
            expected_pipes = 0

        result.append(lines[i])
        i += 1

    return "\n".join(result)
