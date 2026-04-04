#!/usr/bin/env python3
"""Strip CMS header/footer chrome and clean patterns from AEM-sourced markdown files."""

import re

SIDEBAR_MARKER = re.compile(r"^#{1,6}\s+Prisma Access Docs\s*$", re.MULTILINE)
CONTENT_H1 = re.compile(r"^# .+$", re.MULTILINE)
ON_THIS_PAGE = re.compile(r"^#{1,6}\s+On This Page\s*$", re.MULTILINE)


def find_content_start(body):
    matches = list(SIDEBAR_MARKER.finditer(body))
    if len(matches) < 2:
        return None
    h1 = CONTENT_H1.search(body, matches[1].end())
    if h1 is None:
        return None
    return h1.start()


def find_content_end(body, search_from=0):
    usabilla_pos = body.find("if (!usabilla", search_from)
    if usabilla_pos != -1:
        line_start = body.rfind("\n", 0, usabilla_pos)
        return line_start + 1 if line_start != -1 else usabilla_pos
    otp_match = ON_THIS_PAGE.search(body, search_from)
    if otp_match:
        return otp_match.start()
    return len(body)


UPDATED_ON = re.compile(r"^Updated on\s*\n\s*\n.+$", re.MULTILINE)
DOWNLOAD_PDF = re.compile(r"^Download PDF\s*$", re.MULTILINE)
PREV_NEXT = re.compile(r"\[\s*(?:Previous|Next)\s*\n[\s\S]*?\]\([^\)]+\)")
HR_DIVIDER = re.compile(r"^\* \* \*\s*$", re.MULTILINE)
MULTI_BLANK = re.compile(r"\n{3,}")


def clean_patterns(body):
    body = UPDATED_ON.sub("", body)
    body = DOWNLOAD_PDF.sub("", body)
    body = PREV_NEXT.sub("", body)
    body = HR_DIVIDER.sub("", body)
    first_h1 = re.search(r"^# (.+)$", body, re.MULTILINE)
    if first_h1 and re.match(r"[a-z][a-z0-9:\-]+$", first_h1.group(1).strip()):
        end = first_h1.end()
        if end < len(body) and body[end] == "\n":
            end += 1
        body = body[: first_h1.start()] + body[end:]
    body = MULTI_BLANK.sub("\n\n", body)
    return body


def strip_chrome(body):
    start = find_content_start(body)
    if start is None:
        return body
    end = find_content_end(body, start)
    content = body[start:end]
    content = clean_patterns(content)
    return content.rstrip("\n") + "\n"
