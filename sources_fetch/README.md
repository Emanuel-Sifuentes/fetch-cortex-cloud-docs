# sources_fetch - Cortex Cloud Application Security Docs

Markdown files fetched from the Palo Alto Networks Cortex Cloud documentation portal, which runs on the **Fluid Topics** platform.

**Source:** https://docs-cortex.paloaltonetworks.com/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Cortex-Cloud-Application-Security

**Map ID:** `aUsxSwBeRrRs3Jm36XHckg`

## How to fetch

### Prerequisites

```bash
npm install --no-save turndown turndown-plugin-gfm
```

### Run the fetch script

```bash
node scripts/fetch_fluidtopics.js
```

This will:
1. Fetch the TOC from `/api/khub/maps/{mapId}/toc`
2. Fetch each topic's HTML content from `/api/khub/maps/{mapId}/topics/{contentId}/content`
3. Convert HTML to markdown with post-processing fixes
4. Write individual numbered files to `sources_fetch/`
5. Write individual files only (combined file is built separately by `npm run combine`)

No authentication is required. The script fetches 5 topics concurrently with a 200ms delay between batches to avoid rate limiting.

### Audit scripts

```bash
node scripts/audit_headings.js         # TOC depth vs heading levels
node scripts/audit_toc_vs_headings.js  # Full TOC-to-file structure audit
```

### Post-fetch fix scripts

These scripts fix conversion artifacts that the fetch script's post-processing doesn't handle:

```bash
bash scripts/fix_abstract_lines.sh              # Strip standalone "Abstract" metadata lines from 43 files
python scripts/fix_escaped_chars_in_fences.py   # Unescape #  [  ] inside fenced code blocks (file 216)
python scripts/fix_escaped_underscores.py       # Unescape _ globally + strip U+2028 line separators
```

The broken table fixes (urgency metrics, SCA matrix, scanner attributes, IaC grid) were applied manually to the individual source files — see findings.md for details.

**Re-fetch warning:** Running `fetch_fluidtopics.js` again will reintroduce `\_` escaping (Turndown escapes underscores by default). Re-run `fix_escaped_underscores.py` after any re-fetch.

## TOC structure

The `/api/khub/maps/{mapId}/toc` endpoint returns the following tree (217 topics, max depth 4):

| # | Depth | Title | Children | tocId | contentId |
|---|-------|-------|----------|-------|-----------|
| 1 | 0 | Cortex Cloud Application Security | 0 | `HOlSdy1QqOeFmgHj1hnE0w` | `JrtQn4sodW21Nn_ExdcjBA` |
| 2 | 0 | Onboard Data Sources | 8 | `ETWx0blOOa6EU1RqzcxDZA` | `XeWGHrZ5f9GPhdytDvHJgg` |
| 3 | 1 | &nbsp;&nbsp;Onboard version control systems | 8 | `jKl2jy1lURr0yq_CcgXuKw` | `FaUp8354JADsZEsCclA56A` |
| 4 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;AWS CodeCommit | 0 | `h9ZhYFmBmrMubAmsGXbnog` | `ZO91H9KoxF9~jbUTwtQZDg` |
| 5 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Azure DevOps | 1 | `EDUzXnmFrt9qkWL5xGZXxg` | `JTVxgb3Xh~5G9LFmSby1tg` |
| 6 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure DevOps onboarding system architecture | 0 | `A3Ps0YDzrOEgBLvpUuEdmQ` | `UtF88Fc6sNPLLOSyExmpUw` |
| 7 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Bitbucket Cloud | 0 | `7QXEngW4nN5keNii1_huTQ` | `so~U9oEzOw5ECKCeaLaMAg` |
| 8 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Bitbucket Data Center | 0 | `kbPDkHMrgBcu18v81AVdug` | `_rdL6FIdWyjusaSp7RN8ww` |
| 9 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;GitHub Cloud | 0 | `rUa85TFt7JNbWrW4qhG9jA` | `36y4blilQQD4ae5ZmkXniw` |
| 10 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;GitHub Enterprise (On-Prem) | 0 | `F1HqKTMLNdcse8YMgQAg6w` | `tmzUzijWPBjlhNP26Mbf1Q` |
| 11 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;GitLab SaaS | 0 | `vmZTuJ42_Gj~AC~76Qzs~A` | `yorgEQ562~zSGuYakTdoxw` |
| 12 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;GitLab Self Managed (On-Prem) | 0 | `skBlRg96t7FuHG1fSzyOJA` | `GQV99Ix5IFLOK~iFQTgFvw` |
| 13 | 1 | &nbsp;&nbsp;Onboard CI/CD systems | 2 | `FIRR2VIxFf3P3NjiXlZEFQ` | `V9LAIOj44OAtms19EZtw5w` |
| 14 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;CircleCI for CI/CD pipeline scans | 0 | `S7i8auG1Zi4YvWAliMpo_Q` | `Ck_M98ioz1nJw3th4L~b4g` |
| 15 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Jenkins for CI/CD pipeline scans | 0 | `NKI5Z5M1ZkAKV_t12hx0wA` | `E0LkY2l8JHTOppIY0YEfqg` |
| 16 | 1 | &nbsp;&nbsp;Integrate CI tools | 7 | `1U_kqG~PCOTCL1MCoaEnOw` | `xHT0KpDUZdtwW_4irvxYEA` |
| 17 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;AWS CodeBuild | 0 | `Y04h7kXBOJUVgZQyJyF0xA` | `28aZD93Gn1oTREIuNoDPWA` |
| 18 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;CircleCI for code scans | 0 | `fjWuoSJTjTasn_lSFbxLlA` | `nEYbrjoZEU9GMvB9hhPA7A` |
| 19 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Connect Cortex CLI | 0 | `fdElOygD4U82f9PlyBkkkQ` | `jKArx2SuIdtxo4bM_LxDww` |
| 20 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;GitHub Actions | 0 | `OMdgh8r8T9NxBY9pEHhDVw` | `ZJmrJTQ4O8sI0nhiqGQ10Q` |
| 21 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Jenkins for code scans | 0 | `sPjMfvkMefipL6S45KOiQQ` | `yVawPSGVgRtnoZEW5MV~YA` |
| 22 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Terraform Cloud (Run Tasks) | 0 | `IC4aHJfjWRV9XgudPoHs9g` | `ZO0p8K0zLqChs4lKEpNzmQ` |
| 23 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Terraform Enterprise (Run Tasks) | 0 | `va3BzD33YI34XkYyANlg9w` | `mDBnNdZyxaxPJqoyUFJoLg` |
| 24 | 1 | &nbsp;&nbsp;CLI pipeline code snippets | 0 | `kjCxhxOCjRB68siV6D9fOg` | `akzwZjVaZUGzfRHQCCyvsw` |
| 25 | 1 | &nbsp;&nbsp;Onboard private package registries | 2 | `miyxLXpsDnStUwqy4AeD0Q` | `ySvQt3NA8hpdXsD~0tAS0A` |
| 26 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;JFrog Artifactory | 0 | `QSrDjPExZJW4lqusH7CpCg` | `pG2VPVxIEYnBT2s_AxHlUg` |
| 27 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Onboard JFrog Artifactory | 0 | `ZtBbmZqZizGYGorydhWwYg` | `LhACOf5k3dhTG4x7NzPm8g` |
| 28 | 1 | &nbsp;&nbsp;Ingest third-party data sources | 5 | `wbjAMYpekKIRc0uR8xCDWw` | `VE96vtL5ZLsfVzLLG9y3_Q` |
| 29 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Semgrep | 2 | `bTMarCGjuPBpDARwI41ssQ` | `40VamLTeVsQugI3FMgLaRQ` |
| 30 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Semgrep SCA data ingestion | 0 | `gAcfW_r2z_LGdxc9LqoF1A` | `NIZP9ae9ib6mDO0s6Mt3Fw` |
| 31 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Semgrep SAST data ingestion | 0 | `6mg_~OlTi58KXdksbcUx8A` | `nwUApl04bCy1dN9aNegE5A` |
| 32 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Snyk | 2 | `fI7kltr0peboeMOCtpyP0A` | `RMejHwf90~No30ag2urMtg` |
| 33 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Snyk SCA ingestion | 0 | `xbs4qp~MwouxGmd88Sb7DA` | `~k7NQLKD_mFcFJ2Or~8UPA` |
| 34 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Snyk SAST Findings | 0 | `wuV9aNsyMSsUjU9Ld8MEoQ` | `MJgUp5vGXQDnug3jfDgIFg` |
| 35 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;SonarQube | 0 | `mtKlQke0FgPtGQYdeW2xow` | `FI0YtmLd0RhdYsljXaMRyA` |
| 36 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Veracode | 0 | `q13ZR52wmNoHY1c8rlSBMQ` | `mVqvt3qutSiuIzWT~82wGw` |
| 37 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Generic 3rd Party AppSec Collector | 1 | `ez7mGY1jkQaAuKjwVMErnw` | `kGgOo4QSmOolGzyYcXcrbg` |
| 38 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Onboard the 3rd Party AppSec Collector | 0 | `iTGrB7jcrlVCh_mBp1Utqw` | `PppPulfuChkzuc4UcVR1SA` |
| 39 | 1 | &nbsp;&nbsp;Manage data source integrations | 0 | `SdMoTyE3Oqme2Irtd666Ig` | `wTUbFYlexVIPrKR0MHlbvw` |
| 40 | 1 | &nbsp;&nbsp;Transporter over Broker VM | 2 | `IFxmThFkS_WfhAU3V~mKrg` | `hFwQrLEGgmE_JjzyGpYaJQ` |
| 41 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Set up a Transporter applet on Broker VM | 0 | `5uygwsvPNtOBfVabFdHN6w` | `eA8OtwOncJbWb5nbTC7KHg` |
| 42 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Set up a Transporter on your VCS | 0 | `Hu9dJwYR3Og4K3ehcP3BAQ` | `QlfqRTh1gppiQ51Rq4eoOA` |
| 43 | 0 | Cortex Cloud Application Security dashboard | 0 | `uTpdLU75hNXfbLAShLP5rQ` | `gIs3XFiGtVGIXsjsNtHzTg` |
| 44 | 0 | Application Security Posture Management (ASPM) | 15 | `jpW7omeyEyF_dQdbAPoH9A` | `IGnaSpKFFNzmqwsa13XgYQ` |
| 45 | 1 | &nbsp;&nbsp;ASPM use cases | 0 | `IIkT553zuzR2TRsZLMY2WA` | `gWB2CwRwx1lAYBl6NpojRQ` |
| 46 | 1 | &nbsp;&nbsp;ASPM key features | 0 | `WheYKyinjAbTGKOVLPUuSQ` | `BGjEB~lfxOgrTz1J8hHvPQ` |
| 47 | 1 | &nbsp;&nbsp;ASPM user roles and permissions | 0 | `N3R3WlL4GpOinZ5u_rvlHw` | `f7Wa9192~EFESJT1DfQKaA` |
| 48 | 1 | &nbsp;&nbsp;Code to Cloud | 3 | `M0zIvsuK5q8~gdJSFKQWeg` | `HC6VbhrZWhjdL6OELKuuRQ` |
| 49 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Supported integrations | 0 | `XJREj8XJjt0sUuaVaoT7YQ` | `6SsSwEXmYrOxFyg5ULfT1Q` |
| 50 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Code to Cloud visibility | 0 | `HNbHnqgj1VunEkrSzLTDMg` | `Kx4ik~16mO6jHO7ueaqhNQ` |
| 51 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Code to Cloud troubleshooting | 0 | `GK7K6CrLREJAhCZTLAet1g` | `C21ltJl7VvaQkXsIW1eUHw` |
| 52 | 1 | &nbsp;&nbsp;ASPM Command Center | 1 | `yhXaN0UACNbCLZLR7S2mQQ` | `AKIgAdDSAPoJDPAqNmGGmQ` |
| 53 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;ASPM Command Center workflow | 0 | `IbabDlEMeB~ENLrgM17~pw` | `HO5pa8eyp43t9AlQ5h8WYA` |
| 54 | 1 | &nbsp;&nbsp;Applications | 4 | `32CYhxbg7CNcCmLCr9j2aw` | `6b5yrU2Ndp9URE5G0dDWRw` |
| 55 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Defining Business Applications | 5 | `BhXUqBxhv51YbRa9KcqYeg` | `9RoK5PDnTwKh0UEEf6k7JQ` |
| 56 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Defining business applications by Criteria | 0 | `g2QpCoK2RwLq6t~UG0_Vqw` | `fwypr~HdtX79CCI81pu4bg` |
| 57 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Define applications by VCS criteria | 0 | `z1x7l1GQEBmTx0ha8wuy~Q` | `Gs_uLMRzjnA6k2IYDk1VWQ` |
| 58 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manage application criteria | 0 | `qYF1dGp~XyKAHKKFoVF9Lg` | `rbcUxNlZAZC0MECcv0Uh2w` |
| 59 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Define apps by cloud tag-based criteria | 0 | `3e54TnlbuaSUs~Ra2GH_cA` | `zOsFlZWbTwkpHXgxCXp5Lg` |
| 60 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;How to manually build an application | 0 | `5GjnYpE~qh2NIgywoVoIFA` | `StR14TbHCOnN455tiNonYg` |
| 61 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Application management and visibility | 0 | `f~bfigiksxHeJGY6NjF0fw` | `h19LxbjR1Cc_ihq63AQmAA` |
| 62 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Business application assets | 2 | `AXdmxKbc8C7OEoUQs_Kk2g` | `7BCc~ddVeK_vO0mAi_RbFQ` |
| 63 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Business application expanded asset details | 0 | `1tXN0F9SWJbZ6sNqG~dFbA` | `eJ3DFmQ5PNtsXGb2D0Hexg` |
| 64 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Export business application data | 0 | `o85SbCtWd~qhKSzANSc_2w` | `LTLJxS3P8PVD4iGMvOHPDg` |
| 65 | 2 | &nbsp;&nbsp;&nbsp;&nbsp;Scope user access to applications (SBAC) | 4 | `d40uNoxnzRlERo32eV0hbg` | `Gpg5blC5p_5zLY3PCZo5EQ` |
| 66 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enable SBAC in the Cortex Cloud tenant | 0 | `nvAlLZVR3X2vYepqBay7Eg` | `8Rt42RU7Bs0evJJu0ZCqRQ` |
| 67 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Create an application-based Asset Group | 0 | `mNA5NOCI20xO8E0aCBB4Ng` | `qR6~KEiYB9DbJFNkJjDnfQ` |
| 68 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scope user access to an application | 0 | `Sa6H_DGpFaQRN2l4eAyQPw` | `GgyNig_ssN_64OC~e9bYZQ` |
| 69 | 3 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Create application-scoped policies | 0 | `SfeuTIlGv4bkZ6EqmDoeJw` | `kFRTxMQOnfuzCftgLI9uOg` |
| 70 | 1 | &nbsp;&nbsp;Repositories as assets | 5 | `1bZ8CFbhrAHHx3hh0Pan6Q` | `SVXBb_w4M2JqBgd6HqHApw` |
| 71-110 | 1-3 | &nbsp;&nbsp;*(40 more ASPM topics: repos, coverage, urgency, backlog, SLA, compliance, policies, rules, weaknesses)* | | | |
| 111 | 0 | CI/CD Security | 6 | `sg4vcks8dfic5bo4SCQ15g` | `Q1NvikYBFx1rQbk985sWaw` |
| 112-145 | 1-2 | &nbsp;&nbsp;*(34 topics: assets, supply chain, risks, rules, policies)* | | | |
| 146 | 0 | Code Security | 13 | `nhFVaUg9t1SQ4sgbsuPMUQ` | `pWb3j8YRI5bqol9O0v99FA` |
| 147-216 | 1-4 | &nbsp;&nbsp;*(70 topics: assets, scanners, secrets, IaC, SCA, scans, CLI, IDE, suppressions)* | | | |
| 217 | 0 | API documentation | 0 | `M3rd5o_iTDRkR_Ru~f_Nwg` | `fJBhON_mg1nA6VQdgRSx0A` |

**Depth distribution:** 7 at depth 0, 42 at depth 1, 113 at depth 2, 52 at depth 3, 3 at depth 4.

To regenerate the full table: `node scripts/generate_toc_table.js`

## Fluid Topics API endpoints used

All endpoints are unauthenticated GET requests against the base URL `https://docs-cortex.paloaltonetworks.com`.

| Endpoint | Accept Header | Returns |
|----------|--------------|---------|
| `/api/khub/maps` | `application/json` | All maps (publications) with IDs and metadata |
| `/api/khub/maps/{mapId}` | `application/json` | Map metadata (title, prettyUrl, readerUrl, etc.) |
| `/api/khub/maps/{mapId}/toc` | `application/json` | Full TOC tree with `tocId`, `contentId`, `title`, `prettyUrl`, `children[]` |
| `/api/khub/maps/{mapId}/topics/{contentId}` | `application/json` | Topic metadata + `contentApiEndpoint` path |
| `/api/khub/maps/{mapId}/topics/{contentId}/content` | `text/html` | Topic body as HTML |

**Map IDs are base64-like hashes**, not the pretty URL slugs. You must call `/api/khub/maps` first to discover the ID for a given publication title.

## Output format

### Individual files (001-*.md through 217-*.md)

Each file has YAML frontmatter followed by markdown content:

```markdown
---
title: "Topic Title"
tocId: "..."
contentId: "..."
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Topic-Title"
depth: 2
---

# Topic Title

Content here...
```

- `depth` is the topic's nesting level in the TOC tree (0 = top-level)
- Files are numbered in TOC traversal order (depth-first)

### Combined file (cortex-cloud-appsec-combined.md)

All topics concatenated in TOC order with hierarchical heading levels. Built by `npm run combine` (or automatically at the end of `npm run fix`), which fetches the live TOC API to determine each topic's depth and shifts headings accordingly. Frontmatter is stripped; only the markdown body is included.

## Post-processing applied during conversion

### During fetch (fetch_fluidtopics.js)

| Fix | Why |
|-----|-----|
| **GFM tables** (`turndown-plugin-gfm`) | Turndown core doesn't convert HTML tables to pipe-and-dash markdown |
| **Collapse `<p>` tags in table cells** | Strips empty `<p></p>` and merges multiple `<p>` blocks into inline text — prevents line breaks that split markdown table rows |
| **Remove `<colgroup>`** | Confuses turndown's table parser |
| **Promote first `<tbody><tr>` to `<thead>`** | Tables without `<thead>` aren't recognized by the GFM plugin |
| **Fence `<pre class="programlisting">`** | Turndown only fences `<pre><code>`, not bare `<pre>` blocks |
| **Strip base64 data-URI images** | Replaced with `[image: filename.png]` placeholder |
| **Admonition headings to bold** | `### Note`, `### Tip`, `### Danger`, etc. converted to `**Note**`, `**Tip**`, etc. (including indented variants inside list items) |
| **Heading normalization** | Each file gets `# Title` as h1; sub-headings shifted so the shallowest becomes h2. Code-block-aware to avoid shifting `#` comments inside fenced blocks |
| **Duplicate title stripping** | If turndown's output already starts with an h1 matching the topic title, it's removed before the normalized title is prepended |

### Post-fetch fixes (applied to source files)

| Fix | Scope | Why |
|-----|-------|-----|
| **Strip "Abstract" metadata lines** | 43 files | DocBook `<abstract>` element label leaked as a standalone "Abstract" line after each `# Title` heading |
| **Unescape chars inside code fences** | 1 file (216) | Turndown escaped `\#`, `\[`, `\]` inside fenced code blocks where they should be literal |
| **Unescape all escaped underscores** | 30 files (1,852 replacements) | Turndown escaped every `_` as `\_` globally; all occurrences are intraword (e.g., `CORTEX_API_KEY`) and never trigger emphasis |
| **Strip Unicode line separators (U+2028)** | 1 file (172) | Fluid Topics HTML contained a U+2028 Line Separator character that survived conversion; invisible but can cause issues in downstream parsers |
| **Urgency metrics table — propagate scanner type** | 1 file (079) | HTML `rowspan` on scanner-type cells was lost, leaving 30 sub-rows with 4 columns instead of 5 |
| **SCA support matrix — propagate language** | 1 file (175) | HTML `rowspan` on language cells was lost, leaving 3 sub-rows (yarn, Gradle x2) with 3 columns instead of 4 |
| **Scanner attributes table — convert to list** | 1 file (098) | Description cells spanned 2-12 physical lines (no markdown table equivalent); converted to definition list format |
| **IaC frameworks grid — convert to list** | 1 file (163) | Layout grid had no logical header row; first data row rendered as header. Replaced with comma-separated list |

## Known issues and gotchas

### Heading hierarchy gaps in 19 files

19 depth-2 files (mostly VCS/CI integration guides) start their sub-headings at h3 instead of h2. This matches the original document structure — not a conversion bug. Each file has `##` headings only in a late-appearing "Instance details view" appendix; the main content jumps `# → ###`.

Affected files: 004, 005, 007-012, 014-015, 017-018, 020-023, 027, 035-036.

### Escaped underscores (fixed)

All 1,852 `\_` (backslash-escaped underscores) across 30 files have been unescaped to `_`. All occurrences were intraword (e.g., `CORTEX_API_KEY`, `merge_requests_events`) and never trigger CommonMark/GFM emphasis. Re-running `fetch_fluidtopics.js` will reintroduce them — run `fix_escaped_underscores.py` after any re-fetch.

### Images

Only one image exists across all 217 topics (in file 087). It was a base64 data URI and has been replaced with `[image: compliance-map-arrchitecture.png]`.

### Stub pages

10 files contain minimal content (a single introductory sentence). These are intentional index/landing pages in the source documentation: 013, 025, 070, 114, 118, 122, 149, 152, 163, 192.

### TOC/heading overlaps (2 files)

`002-Onboard-Data-Sources.md` and `130-Supply-Chain-Tools.md` contain headings that match child topic titles in the TOC. This is by design in the source docs where parent pages summarize their children.

## Fetching a different map

To fetch a different publication from the same portal:

1. List all maps: `curl -s https://docs-cortex.paloaltonetworks.com/api/khub/maps | jq '.[].title'`
2. Find the map ID for your target publication
3. Update `MAP_ID` in `scripts/fetch_fluidtopics.js`
4. Run the script

For a different Fluid Topics portal entirely, also update the `BASE` URL.
