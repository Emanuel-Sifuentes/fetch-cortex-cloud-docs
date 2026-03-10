---
title: "Snyk Static Application Security Testing (SAST) Findings"
tocId: "wuV9aNsyMSsUjU9Ld8MEoQ"
contentId: "MJgUp5vGXQDnug3jfDgIFg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Snyk-Static-Application-Security-Testing-SAST-Findings"
depth: 3
---

# Snyk Static Application Security Testing (SAST) Findings
**Abstract:** A detailed guide on how Cortex Cloud ingests, normalizes, and displays Static Application Security Testing (SAST) code-level vulnerabilities from Snyk Code.

When the SAST scan type is enabled in the Snyk integration, Cortex Cloud ingests code-level security vulnerability data from Snyk Code. For each Snyk target, the system fetches projects of the SAST type, retrieves associated code issues with source location data, and produces code security findings.

## SAST vulnerability findings

For each code vulnerability, a **SAST Finding** is created with the detection method CAS_SAST_SCANNER. Unlike SCA findings, SAST findings are associated with the repository asset itself and do not create individual software package assets.

| Field | Description | Example |
| --- | --- | --- |
| Rule Name | The vulnerability type name. | Cross-site Scripting (XSS) |
| Severity | The severity level. | HIGH, MEDIUM, LOW |
| CWE | Common Weakness Enumeration identifiers. | CWE-79, CWE-89, CWE-78 |
| File Path | The source file containing the vulnerability. | vulnerable-flask-app.py |
| Start/End Line | The line number where the vulnerability begins and ends. | 51 |
| Code Location | Column-level location information. | Lines 51-51, Columns 16-38 |
| Commit Hash | The Git commit SHA where the vulnerability was detected. | a67cbe59... |
| Language | The programming language, derived from the file extension. | Python |
| Description | The vulnerability description from Snyk. | Cross-site Scripting (XSS) |
| Prioritization Labels | CWE Top 25 or OWASP Top 10 classification. | \["CWE Top 25"\] |
| Data Source | The reporting tool. | SNYK |
| Branch | The Git branch where the finding was detected. | main |

## SAST-specific behaviors

-   **Source location data:** Each SAST finding includes precise source code location information extracted from Snyk Code, including file path, start/end line numbers, and start/end column numbers. This enables direct navigation to the vulnerable code.
    
-   **Commit attribution:** The Git commit hash associated with the vulnerability is captured from Snyk's source location data. This enables tracking which commit introduced the vulnerability.
    
-   **Prioritization labels:** Findings that match CWE Top 25 or OWASP Top 10 categories are automatically tagged with prioritization labels, enabling quick filtering for the most critical vulnerability classes.
    

## CWE Classification

SAST findings are classified using CWE identifiers extracted from the Snyk issue classes. Common CWE types detected include:

| CWE | Vulnerability Type |
| --- | --- |
| CWE-79 | Cross-site Scripting (XSS) |
| CWE-89 | SQL Injection |
| CWE-78 | Command Injection |
| CWE-23 | Path Traversal |
| CWE-96 | Improper Neutralization of Directives in Statically Saved Code |
| CWE-400 | Regular Expression Denial of Service (ReDoS) |
| CWE-284 | Improper Access Control |

## SAST data extraction summary

| Data Point | Snyk API Source |
| --- | --- |
| Rule name / Title | attributes.title |
| Severity | attributes.effective_severity_level |
| CWE | attributes.classes\[\] (type=weakness) |
| File path | location_data\[\].file_path |
| Line number | location_data\[\].line_number |
| End line number | location_data\[\].end_line_number |
| Column number | location_data\[\].column_number |
| End column number | location_data\[\].end_column_number |
| Commit hash | location_data\[\].commit_id |
| Branch | project_attributes.target_reference |
| Description | attributes.description |
| Status | attributes.status |
| Risk score | attributes.risk.score.value |

## View Snyk SAST findings in Cortex Cloud

1.  Sign in to the Cortex Cloud console.
    
2.  Navigate to **Posture Management** > **Findings**.
    
3.  Apply filters to locate Snyk SAST findings:
    
    -   **Data Source:** SNYK
        
    -   **Detection Method:** CAS_SAST_SCANNER
        
    -   **Report Identifier:** ThirdParty_SNYK_SAST
        
    -   **Asset Type:** repository
        
    

## SAST Troubleshooting and FAQs

-   **Missing SAST findings:**
    
    -   Verify that Snyk Code is enabled in your Snyk organization settings.
        
    -   Verify that the SAST scan type is enabled in the Cortex Cloud integration configuration.
        
    -   Verify that the selected targets have Snyk Code (SAST) projects, not just Open Source (SCA) projects.
        
    
-   **Are SAST findings linked to specific packages?** No. SAST findings are associated with the repository asset and reference specific source code files and line numbers. Only SCA findings create software package assets.
    

## Manage SAST code weaknesses generated from ingested Snyk findings

You can view and manage SAST code weaknesses generated from ingested Snyk findings:

-   On the Code Weaknesses page under Cortex Cloud Application Security Issues
    
-   Under the Code Weaknesses tab of the Repositories assets page
    

For more information on SAST code weaknesses, refer to SAST code weaknesses (CWEs).SAST code weaknesses (CWEs)