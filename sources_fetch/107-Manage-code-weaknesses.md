---
title: "Manage code weaknesses"
tocId: "dU5R3MCFIarG1Vbcdjc4EA"
contentId: "6RKZBVHLFBJaz6t9oz9OHg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Manage-code-weaknesses"
depth: 1
---

# Manage code weaknesses

Ingest third-party SAST findings to create actionable issues, enabling you to prioritize and track remediation and enhancing your security posture.

You can ingest Static Application Security Testing (SAST) findings from third-party vendors. These findings are raw security observations from your external scanners that Cortex Cloud then uses to generate actionable issues. These issues are prioritized by Cortex Cloud Application Security, enabling you to remediate specific code weaknesses.

Cortex Cloud Application Security default policies enrich and categorize ingested Critical and High SAST findings detected in your organization's environment as issues (also known as Code Weaknesses). Issues represent the smallest unit for remediating SAST-identified CWEs.

**Note**

You can customize policies to define which findings are categorized as issues.

## Ingest SAST findings

Currently, Cortex Cloud Application Security supports Snyk and Semgrep data ingestion. To onboard your tools, refer to these guides:

-   Semgrep
    
-   Snyk
    

## Access code weakness issues and findings

To view and manage SAST code weaknesses, you can use the dedicated Application Security issues views or access them through broader asset inventories.

**Primary access points**

-   **Dedicated issues view**: To access SAST code violation issues, under Modules, select Application Security → Issues → Code Weaknesses
    
-   **View findings**: To view SAST findings, navigate to Code Weaknesses issues and select the Findings tab
    
-   **Global Issues inventory**: Access SAST issues from the general Cortex Cloud All Issues inventory: In Cases and Issues, navigate to Issues → AppSec Issues (under All Issues) → SAST Scanner (as the Detection Method value)
    

**Issues in asset inventories**

You can also view SAST CWE issues within the following asset inventories: Navigate to Inventory → All Assets, and select one of the following inventories:

-   Repositories: Select an asset to open the side table and then open the Code Weaknesses tab
    
-   Business Applications: Select an application to open the side table and then open the Code Weaknesses tab
    
-   All Code Inventory: Filter the table by **Provider=Semgrep or Snyk** to view these vendor assets