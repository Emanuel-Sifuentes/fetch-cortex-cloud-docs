---
title: "Semgrep Software Composition Analysis (SCA) data ingestion"
tocId: "gAcfW_r2z_LGdxc9LqoF1A"
contentId: "NIZP9ae9ib6mDO0s6Mt3Fw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Semgrep-Software-Composition-Analysis-SCA-data-ingestion"
depth: 3
---

# Semgrep Software Composition Analysis (SCA) data ingestion

Cortex Cloud ingests, normalizes, and displays Software Composition Analysis (SCA) data from Semgrep

The Semgrep integration enables automated ingestion of Semgrep scan results into Cortex Cloud. The ingested findings appear alongside findings from native Cortex scanners (as well as other third-party integrations such as Snyk).

## Key benefits

-   **Centralizing Semgrep findings**: Semgrep SCA findings are normalized into the same data model as native Cortex vulnerability findings, enabling unified triage, policy enforcement, and reporting
    
-   **Risk-Based Prioritization**: Semgrep SCA findings inherit the Cortex Cloud risk prioritization framework. Each finding is enriched with CVSS scores, EPSS scores, risk factor labels and contextual prioritization tags, enabling practitioners to focus on the most exploitable and business-critical vulnerabilities first
    
-   **Extending Coverage visibility**: The AppSec Coverage page displays a dedicated Semgrep column that indicates which repositories have Semgrep scanning enabled
    
-   **Enabling policy enforcement**: Semgrep SCA findings are evaluated against Application Security policies, enabling block actions on PRs and CI pipelines based on Semgrep-detected vulnerabilities
    

## View SCA issues generated from ingested Semgrep findings

Issues generated from Semgrep findings are displayed in the Vulnerabilities issues table: Navigate to Application Security → Issues → Vulnerabilities.

The table displays all vulnerability issues across all data sources, including Semgrep. To identify Semgrep-originated vulnerability issues, use one of the following options:

-   **Identify Semgrep-origin issues in the issue side panel**
    
    1.  Open any vulnerability issue by selecting the row.
        
    2.  In the issue side panel, locate the Scanner field in the impact fields section, which identifies Semgrep as the originating scanner.
        
    
-   **Identify Semgrep-origin findings**:
    
    1.  Switch to the Findings tab (using the control at the top of the Vulnerabilities page).
        
    2.  Filter the Data Source column by SEMGREP to isolate Semgrep-originated findings.
        
    
-   **Navigate from the AppSec Coverage page**
    
    1.  Navigate to Application Security → AppSec Coverage.
        
    2.  Filter the Semgrep column (using the value `is_scanned_by_semgrep`) by ENABLED to identify repositories with active Semgrep scanning.
        
    3.  Select a repository to drill down into its findings.