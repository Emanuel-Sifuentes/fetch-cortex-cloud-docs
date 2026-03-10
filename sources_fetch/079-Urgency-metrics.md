---
title: "Urgency metrics"
tocId: "TjWelmUPESPJ9XXOuvwjmw"
contentId: "p8sDWJOmyyfPe9eFFaVKKA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Urgency-metrics"
depth: 2
---

# Urgency metrics
The following table outlines Urgency metrics by scanner, detailing each metric's description, values, and evidence.

| **Scanner type** | **Metric** | **Description** | **Values** | **Evidence** |
| --- | --- | --- | --- | --- |
| **Vulnerabilities** | Application Business Criticality | The highest criticality level among all applications linked to an issue’s affected assets. If no application is attached, the value is `None`. Link the affected asset to its relevant application to ensure the urgency is calculated correctly | Critical, High, Medium, Low, Info, None + Name | The Application Name + ID (only one) |
| Vulnerabilities | Access Sensitive Data | At least one deployed asset affected by this issue has access to sensitive data | True, False + Finding ID | Finding ID (only one) |
| Vulnerabilities | Leverage Privileged Capabilities | At least one deployed asset affected by this issue has the ability to leverage privileged capabilities. In the next version, we’ll provide permission-level details | True, False + Finding ID | Finding ID (only one) |
| Vulnerabilities | Used in Image | Indicates whether the vulnerable package present in the code is also included in the built image | True, False | — |
| Vulnerabilities | Is Deployed | At least one deployed asset is affected by this issue | True, False | — |
| Vulnerabilities | Internet Exposed | At least one affected deployed asset is accessible from the internet, increasing the likelihood of exploitation | True, False | — |
| Vulnerabilities | Loaded into Memory | The vulnerable package is actively loaded into memory in at least one deployed asset | True, False, Unknown | — |
| Vulnerabilities | Runtime Agent Protection | Percentage of affected deployed assets with runtime protection enabled. Only active agents are counted. Effective if ≥80% of deployed assets are protected | 0–100% | — |
| Vulnerabilities | EPSS Score | Estimated probability that this CVE will be exploited within the next 30 days | 0–100% | — |
| Vulnerabilities | CISA KEV | Indicates whether this CVE is listed in CISA’s Known Exploited Vulnerabilities catalog | True, False | — |
| Vulnerabilities | CVSS Score | Industry-standard severity score for vulnerabilities (Common Vulnerability Scoring System) | 0–10 | — |
| Vulnerabilities | Exploit Maturity | Level of confidence in the existence of a known exploit | POC, Active, None | — |
| Vulnerabilities | Exploit Availability | Indicates whether an exploit is available to attackers | Public, Private | — |
| Vulnerabilities | Package Operational Risk | Risk level based on low maintenance, limited popularity, or outdated support | High, Medium, Low | — |
| Vulnerabilities | Fixable | Indicates whether a known fix is available for this CVE | True, False | — |
| **Secrets** | Application Business Criticality | The highest criticality level among all applications linked to an issue’s affected assets. If no application is attached, the value is `None`. Link the affected asset to its relevant application to ensure urgency is calculated correctly | Critical, High, Medium, Low, Info, None + Name | The Application Name + ID (only one) |
| Secrets | Access Sensitive Data | Indicates whether the secret provides access to sensitive data | True, False + Finding ID | Finding ID (only one) |
| Secrets | Leverage Privileged Capabilities | Indicates whether the secret can be used to perform privileged operations | True, False + Finding ID | Finding ID (only one) |
| Secrets | Visibility | Indicates whether the code repository where the secret was found is public | Private, Public | — |
| Secrets | Validation | Indicates whether the exposed secret is valid and whether it has high privileges | Privileged, Valid, Invalid, Unavailable | — |
| Secrets | Found in History | Indicates whether the secret was found in the version history of the repository | True, False | — |
| **IaC Misconfigurations** | Application Business Criticality | The highest criticality level among all applications linked to an issue’s affected assets. If no application is attached, the value is `None`. Link the affected asset to its relevant application to ensure urgency is calculated correctly | Critical, High, Medium, Low, Info, None + Name | The Application Name + ID (only one) |
| IaC Misconfigurations | Access Sensitive Data | At least one deployed asset affected by this issue has access to sensitive data | True, False + Finding ID | Finding ID (only one) |
| IaC Misconfigurations | Leverage Privileged Capabilities | At least one deployed asset affected by this issue has the ability to leverage privileged capabilities. In the next version, we’ll provide permission-level details | True, False + Finding ID | Finding ID (only one) |
| IaC Misconfigurations | \# Affected Assets | The number of deployed cloud assets affected by this issue | Number | — |
| IaC Misconfigurations | Severity | The issue’s inherent severity (static rating, not including any user-applied override) | Critical, High, Medium, Low, Info, None + Name | — |
| IaC Misconfigurations | Internet Exposed | At least one affected deployed asset is accessible from the internet, increasing the likelihood of exploitation | True, False | — |
| IaC Misconfigurations | Is Deployed | At least one deployed asset is affected by this issue | True, False | — |
| **Code Weaknesses** | Application Business Criticality | The highest criticality level among all applications linked to an issue’s affected assets. If no application is attached, the value is `None`. Link the affected asset to its relevant application to ensure urgency is calculated correctly | Critical, High, Medium, Low, Info, None + Name | The Application Name + ID (only one) |
| Code Weaknesses | Access Sensitive Data | At least one deployed asset affected by this issue has access to sensitive data | True, False + Finding ID | Finding ID (only one) |
| Code Weaknesses | Leverage Privileged Capabilities | At least one deployed asset affected by this issue has the ability to leverage privileged capabilities. In the next version, we’ll provide permission-level details | True, False + Finding ID | Finding ID (only one) |
| Code Weaknesses | Is Deployed | At least one deployed asset is affected by this issue | True, False | Asset ID (only one) |
| Code Weaknesses | Severity | The issue’s inherent severity (static rating, not including any user-applied override) | Critical, High, Medium, Low, Info, None | — |
| Code Weaknesses | Internet Exposed | At least one affected deployed asset is accessible from the internet, increasing the likelihood of exploitation | True, False | — |
| Code Weaknesses | Runtime Agent Protection | Percentage of affected deployed assets with runtime protection enabled. Only active agents are counted. Effective if ≥80% of deployed assets are protected | 0–100% | — |
| Code Weaknesses | CWE Top 25 | Indicates whether the issue maps to one of the CWE Top 25 Most Dangerous Software Weaknesses | True, False | — |
| Code Weaknesses | OWASP Top 10 | Indicates whether the issue maps to one of the OWASP Top 10 Web Application Security Risks | True, False | — |