# fetch-cortex-cloud-docs

Fetch Cortex Cloud Application Security documentation from the Palo Alto Networks [Fluid Topics](https://docs-cortex.paloaltonetworks.com) portal and convert to clean Markdown.

**Source:** https://docs-cortex.paloaltonetworks.com/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Cortex-Cloud-Application-Security

## Quick start

```bash
npm install              # install turndown + turndown-plugin-gfm
npm run fetch            # fetch 217 topics → sources_fetch/
npm run fix              # apply all post-fetch fixes
```

## What it does

1. Fetches the TOC tree from the Fluid Topics API (`/api/khub/maps/{mapId}/toc`)
2. Downloads each topic's HTML content (5 concurrent, 200ms rate-limit delay)
3. Converts HTML to Markdown via [Turndown](https://github.com/mixmark-io/turndown) with GFM plugin
4. Applies post-processing: heading normalization, table fixes, admonition conversion, base64 image stripping
5. Writes 217 numbered files + a combined file to `sources_fetch/`
6. Post-fetch fix scripts clean up remaining conversion artifacts

No authentication required.

## Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `fetch_fluidtopics.js` | `npm run fetch` | Fetch all topics and convert to Markdown |
| `fix_abstract_lines.sh` | `npm run fix` | Strip standalone "Abstract" metadata from 43 files |
| `fix_escaped_chars_in_fences.py` | `npm run fix` | Unescape `\#`, `\[`, `\]` inside code blocks |
| `fix_escaped_underscores.py` | `npm run fix` | Unescape all `\_` globally (1,852 occurrences in 30 files) |
| `audit_headings.js` | `npm run audit:headings` | Audit heading levels vs TOC depth |
| `audit_toc_vs_headings.js` | `npm run audit:toc` | Full TOC-to-file structure audit (live API) |
| `generate_toc_table.js` | `npm run toc:table` | Generate TOC markdown table from live API |

## Output

### Individual files (`sources_fetch/001-*.md` through `217-*.md`)

Each file has YAML frontmatter + Markdown body:

```markdown
---
title: "Topic Title"
tocId: "..."
contentId: "..."
prettyUrl: "/r/.../Topic-Title"
depth: 2
---

# Topic Title

Content here...
```

### Combined file (`sources_fetch/cortex-cloud-appsec-combined.md`)

All 217 topics concatenated with `---` separators. Frontmatter stripped.

## Re-fetching

Running `npm run fetch` again will overwrite all files. Turndown re-introduces `\_` escaping by default, so always run `npm run fix` after a fresh fetch.

## Project structure

```
fetch-cortex-cloud-docs/
├── scripts/
│   ├── fetch_fluidtopics.js          # main fetcher
│   ├── fix_abstract_lines.sh         # post-fetch fix
│   ├── fix_escaped_chars_in_fences.py # post-fetch fix
│   ├── fix_escaped_underscores.py    # post-fetch fix
│   ├── audit_headings.js             # audit tool
│   ├── audit_toc_vs_headings.js      # audit tool
│   └── generate_toc_table.js         # utility
├── sources_fetch/
│   ├── 001-*.md through 217-*.md     # individual topic files
│   ├── cortex-cloud-appsec-combined.md
│   └── README.md                     # detailed fetch/fix documentation
├── package.json
└── .gitignore
```

See `sources_fetch/README.md` for detailed documentation of the Fluid Topics API, post-processing applied, and known issues.
