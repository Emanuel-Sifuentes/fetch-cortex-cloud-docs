---
title: "Issue/Finding classification by scanner"
tocId: "7ZaApw34sPPvC8grUxEkQw"
contentId: "fQt_cP6E2RGmeCrNvMorMQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Issue/Finding-classification-by-scanner"
depth: 2
---

# Issue/Finding classification by scanner
This table details how security issues and findings are classified as either Backlog or New based on their originating scanner and specific detection scenarios

| Scanner | Backlog | New Issue | Comment |
| --- | --- | --- | --- |
| IaC | The first time an IaC detection rule ran against the code repository | Issues added through pull requests that are created by a detection rule which previously ran against this repository | If a new AppSec rule runs against the code repository, the detected issue is considered a Backlog issue |
| Secrets | The first time a secret was detected on the code repository with a specific signature (out-of-the-box or customer-created) | A secret that was added in a pull request | If a new signature is added/changed in the secret signature engine (by the vendor or by the user), its first run will be considered a Backlog issue |
| SCA Vulnerabilities | The first time the SCA scanner created an SBOM of the code repository and identified vulnerabilities | A vulnerability found in a pull request on a new or updated package | If there is a new vulnerability on an existing package version, it is considered a Backlog issue; If you set the global parameter issues on existing SBOM are considered new, it will be considered a new issue |
| SAST | The first time the SAST scanner sends results on this code repository and file | A SAST finding that was found on a pull request | This classification also applies if you import a SARIF file for a repository. \*\*Note:\*\* In some cases/vendors, this is not accurate as findings are deleted every time new findings are uploaded. In such cases, the feature may not be accurate or supported; For SAST, the vendor does not support policy in pull requests |

**Note**

**Scanner updates and new detections**: When a security scanner is updated to support new languages, detection rules, or capabilities, any issues discovered by these new features for existing code are classified as part of the backlog.