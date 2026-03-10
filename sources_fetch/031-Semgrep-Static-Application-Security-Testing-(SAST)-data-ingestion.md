---
title: "Semgrep Static Application Security Testing (SAST) data ingestion"
tocId: "6mg_~OlTi58KXdksbcUx8A"
contentId: "nwUApl04bCy1dN9aNegE5A"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Semgrep-Static-Application-Security-Testing-SAST-data-ingestion"
depth: 3
---

# Semgrep Static Application Security Testing (SAST) data ingestion

Cortex Cloud ingests, normalizes, and displays SAST data from Semgrep

The Semgrep integration enables automated ingestion of Semgrep SAST scan results into Cortex Cloud. The ingested findings appear alongside findings from native Cortex scanners and other third-party integrations (such as Snyk).

## Key benefits

-   **Centralizing Semgrep findings**: Semgrep SAST findings are normalized into the same data model as native Cortex code weakness findings, enabling unified triage, policy enforcement, and reporting
    
-   **Extending Coverage visibility**: The AppSec Coverage page displays a dedicated Semgrep column that indicates which repositories have Semgrep scanning enabled, and a Code Weaknesses column that reflects aggregate SAST scanning status
    
-   **Enabling policy enforcement**: Semgrep SAST findings are evaluated against Application Security policies, enabling block actions on PRs and CI pipelines based on Semgrep-detected code weaknesses
    

## View SAST issues generated from ingested Semgrep findings

Issues generated from Semgrep findings are displayed in the Code Weaknesses issues table: Navigate to Application Security → Issues → Code Weaknesses.

The table displays all code weakness issues across all data sources, including Semgrep, although the Data Source column displays the VCS provider. To identify Semgrep-originated vulnerability issues, use one of the following options:

-   **Identify Semgrep-origin issues in the issue side panel**
    
    1.  Open any code weakness issue by selecting the row.
        
    2.  In the issue side panel, locate the Scanner field in the impact fields section, which identifies Semgrep as the originating scanner.
        
    
-   **Identify Semgrep-origin findings**:
    
    1.  Switch to the Findings tab (using the segmented control at the top of the Code Weaknesses page).
        
    2.  Filter the Data Source column by SEMGREP to isolate Semgrep-originated findings.
        
    
-   **Navigate from the AppSec Coverage page**
    
    1.  Navigate to Application Security → AppSec Coverage.
        
    2.  Filter the Semgrep column (using the value `is_scanned_by_semgrep`) by ENABLED to identify repositories with active Semgrep scanning.
        
    3.  Select a repository to drill down into its findings.