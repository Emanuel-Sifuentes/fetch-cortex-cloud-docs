#!/usr/bin/env python3
"""Strip images and clean CMS link paths from AEM-sourced markdown files."""

import re

EMPH_IMAGE = re.compile(r"_!\[[^\]]*\]\([^\)]*\)_")
IMAGE = re.compile(r"!\[[^\]]*\]\([^\)]*\)")
LINK = re.compile(r"\[([^\]]+)\]\(([^\)]+)\)")
MULTI_BLANK = re.compile(r"\n{3,}")

CMS_PREFIX = "/content/techdocs/en_US"
AEM_DOMAIN = "https://docs.paloaltonetworks.com"


def _clean_link_url(url):
    cleaned = url
    if cleaned.startswith(AEM_DOMAIN):
        cleaned = cleaned[len(AEM_DOMAIN):]
    if not cleaned.startswith(CMS_PREFIX):
        return url
    cleaned = cleaned[len(CMS_PREFIX):]
    cleaned = re.sub(r"\.html(?=#|$)", "", cleaned)
    return cleaned


def clean_link_paths(body):
    def replace_link(m):
        text = m.group(1)
        url = _clean_link_url(m.group(2))
        return f"[{text}]({url})"

    return LINK.sub(replace_link, body)


def clean_body(body):
    body = EMPH_IMAGE.sub("", body)
    body = IMAGE.sub("", body)
    body = clean_link_paths(body)
    body = MULTI_BLANK.sub("\n\n", body)
    return body
