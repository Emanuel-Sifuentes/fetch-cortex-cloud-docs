# fetch-cortex-docs

Fetch Cortex documentation from the Palo Alto Networks [Fluid Topics](https://docs-cortex.paloaltonetworks.com) portal and convert to clean Markdown.

## Products

| Product | Command | Maps | Source |
|---------|---------|------|--------|
| Cortex Cloud | `npm run fetch:cloud` | appsec, posture, runtime | [Cortex Cloud](https://docs-cortex.paloaltonetworks.com/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Cortex-Cloud-Application-Security) |
| Cortex XDR | `npm run fetch:xdr` | xdr_5, xdr_compatibility | [XDR 5.x](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/Cortex-XDR-5.x-Documentation), [Compatibility Matrix](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/Cortex-XDR-Compatibility-Matrix/) |
| Cortex XSIAM | `npm run fetch:xsiam` | xsiam_3 | [XSIAM 3.x](https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM/Cortex-XSIAM-3.x-Documentation/) |
| Cortex Gateway | `npm run fetch:gateway` | cortex_gateway | [Gateway Admin Guide](https://docs-cortex.paloaltonetworks.com/r/Cortex/Cortex-Gateway-Administrator-Guide/) |
| Cortex AgentiX | `npm run fetch:agentix` | agentix | [AgentiX](https://docs-cortex.paloaltonetworks.com/r/Cortex-AgentiX/Cortex-AgentiX-Documentation/) |

## Quick start

```bash
npm install              # install turndown + turndown-plugin-gfm
npm run fetch            # fetch all products → sources_fetch/{product}/
npm run fix              # apply all post-fetch fixes + generate combined files
```

To target a single product:

```bash
npm run fetch:cloud      # fetch only Cortex Cloud maps
npm run fix:cloud        # fix + combine only Cortex Cloud
```

## What it does

1. Fetches the TOC tree from the Fluid Topics API (`/api/khub/maps/{mapId}/toc`)
2. Downloads each topic's HTML content (5 concurrent, 200ms rate-limit delay)
3. Converts HTML to Markdown via [Turndown](https://github.com/mixmark-io/turndown) with GFM plugin
4. Applies post-processing: heading normalization, table fixes, admonition conversion, base64 image stripping
5. Writes numbered individual files to `sources_fetch/{product}/`
6. Post-fetch fix scripts clean up remaining conversion artifacts
7. Generates a combined file per map with hierarchical headings (driven by the live TOC API)

Cortex Cloud maps (appsec, posture, runtime) are deduplicated against each other since they share significant content overlap. All other products are fetched independently.

No authentication required.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run fetch` | Fetch all products (or `fetch:{product}` for one) |
| `npm run fix` | Run all fix scripts + combine (or `fix:{product}` for one) |
| `npm run combine` | Generate combined files only (or `combine:{product}` for one) |
| `npm run snapshot` | Snapshot API metadata for all products (or `snapshot:{product}` for one) |
| `npm run check` | Detect changes vs stored snapshots (or `check:{product}` for one) |
| `npm run audit:headings` | Audit heading levels vs TOC depth + h6 cap simulation |
| `npm run audit:toc` | Full TOC-to-file structure audit + combined file validation |
| `npm run toc:table` | Print TOC as indented tree from live API |
| `npm test` | Run unit tests |

`npm run fix` chains all fix scripts per product directory, generates the combined files, and updates metadata snapshots.

## Change detection

The pipeline can detect when documentation has changed without doing a full re-fetch. This uses lightweight API calls to compare stored metadata snapshots against the live FluidTopics API.

```bash
npm run snapshot             # bootstrap snapshots for all products (first time)
npm run check                # compare live API vs stored snapshots (JSON output)
npm run check -- --format text   # human-readable output
npm run check -- --apply     # detect changes + re-fetch affected products
```

Snapshots are stored in `metadata/{product}.json` and track each map's `lastPublication` timestamp and TOC structure. When `check` detects a change, it reports added/removed/reordered topics per map. The `--apply` flag triggers a full `fetch` + `fix` cycle for affected products only.

## Output

### Individual files (`sources_fetch/{product}/0001-*.md`)

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

### Combined files (`sources_fetch/{product}/*-combined.md`)

All topics concatenated in TOC order with hierarchical heading levels. Topic titles use heading levels matching their TOC depth (depth 0 = `#`, depth 1 = `##`, etc.), and sub-headings within each topic are shifted accordingly (capped at h6).

## Re-fetching

Running `npm run fetch` again will overwrite all files. Turndown re-introduces `\_` escaping by default, so always run `npm run fix` after a fresh fetch.

## Project structure

```
fetch-cortex-docs/
├── scripts/
│   ├── map_config.js                  # product/map definitions + CLI flag parsing
│   ├── fetch_fluidtopics.js           # main fetcher
│   ├── fix.js                         # fix pipeline orchestrator
│   ├── fix_abstract_lines.sh          # post-fetch fix
│   ├── fix_escaped_chars_in_fences.py # post-fetch fix
│   ├── fix_escaped_underscores.py     # post-fetch fix
│   ├── fix_images_and_fences.py       # post-fetch fix
│   ├── fix_broken_tables.py           # post-fetch fix
│   ├── generate_combined.js           # combined file builder
│   ├── split_combined.py              # split combined files by H1 heading
│   ├── snapshot.js                    # metadata snapshot builder
│   ├── check.js                      # change detection (compare snapshots vs API)
│   ├── audit_headings.js              # audit tool
│   ├── audit_toc_vs_headings.js       # audit tool
│   └── generate_toc_table.js          # utility
├── metadata/                          # per-product snapshot JSON files
├── sources_fetch/
│   ├── appsec/                        # Cortex Cloud AppSec
│   ├── posture/                       # Cortex Cloud Posture
│   ├── runtime/                       # Cortex Cloud Runtime
│   ├── cortex_gateway/                # Cortex Gateway
│   ├── xdr_5/                         # Cortex XDR 5.x
│   ├── xdr_compatibility/             # Cortex XDR Compatibility Matrix
│   ├── xsiam_3/                       # Cortex XSIAM 3.x
│   ├── agentix/                       # Cortex AgentiX
│   └── README.md
├── package.json
└── .gitignore
```

See `sources_fetch/README.md` for detailed documentation of the Fluid Topics API, post-processing applied, and known issues.
