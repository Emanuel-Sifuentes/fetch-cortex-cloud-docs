---
title: "Secrets findings"
tocId: "s~fPL9zw3n8hEvA8QE7IRQ"
contentId: "p2DjGXxBU29Xg6SBT1hQYw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Secrets-findings"
depth: 2
---

# Secrets findings
Secrets findings display sensitive information, such as credentials or API keys, that may be exposed within your assets. These insights help assess and analyze the potential exposure of secrets in your environment.

The Cortex Cloud Application Security Secrets Findings table is a pre-filtered view of the comprehensive Findings inventory (located at Cases & Issues → Issues → Findings Table tab).

This table exclusively displays findings from the Cortex Cloud Application Security Secrets scanner that were detected during periodic scans. In contrast, the comprehensive Findings table unifies vulnerabilities findings from all sources, including periodic, pull request (PR), and continuous integration (CI) scans.

**Note**

Findings are informational and, as such, are not directly mitigable. Remediation is performed on issues derived from findings.

To access Secrets findings, select Application Security → Issues → Secrets → click the Findings tab.

## Secrets findings inventory

The Secrets Findings inventory includes the following properties. Use the Table Settings Menu to view additional properties.

| Property | Description |
| --- | --- |
| Name | The name or title of the finding. |
| Asset Name | Name of the asset affected by the finding. Selecting an Asset Name in the table opens the asset's side card, displaying information about the asset, without having to navigate away from the Findings page. |
| Risk Factors | Quantifiable attributes of a finding, allowing you to analyze and assess the risk. Options: Found in history, Valid, Privileged |
| Data Source | Source of the finding information (the version control system) |
| Rule Category | The category assigned to the rule that detected the finding |
| Repository | Name of the repository hosting the asset in which the finding was detected |
| Branch | The branch of code or version control branch where the finding was detected |
| File Path | The file path or location within the repository where the finding was located |
| Backlog Status | Backlog Status: Indicates if the finding is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability). To understand how findings are categorized as backlog/new, refer to Issue/Finding classification by scanner |

### Expanded Findings details

Clicking on a finding in the inventory table opens the Findings side card which provides additional details.

-   **Finding summary**: Found at the top of the card. Includes the finding name, ID and type (Data for Secrets findings)
    
-   Description: A description of the finding including its location
    
-   Impact: The potential security risk the finding poses to your environment
    
-   **Timestamp**: When the finding was last updated
    
-   Asset details: Includes Asset (The impacted asset. Clicking on the asset opens the asset side card without needing to navigate away to the asset section) and Asset Type (The specific asset type in which the secret was identified, , such as **JavaScript Package**)
    
-   Evidence: Provides evidence and contextual details within your software development lifecycle containing the finding:
    
    -   **Finding source**
        
        -   Data Source: The system or integration from which the finding data was originally pulled (such as GitHub or a CI/CD pipeline). Click the icon next to the data source to navigate to the data source itself
            
        -   Run ID: The unique identifier of the specific scan execution during which this finding was detected
            
        
    -   **Code context**
        
        -   Branch: The specific branch within the repository containing the finding
            
        -   File Path: The exact location of the finding within the repository file structure
            
        -   First Hash: The commit hash of the first commit where this specific finding was introduced or detected
            
        -   First Commit Date: The date of the commit that introduced the problematic code or dependency into the repository. This helps understand how long an issue has existed and for prioritizing remediation efforts based on its age
            
        -   Backlog Status: See the inventory table above
            
        -   Collaborator. The entity associated with the finding, contributing to or responsible for the evidence supporting it
            
        -   Code: the code line including the finding
            
        
    -   **Scan metadata**
        
        -   Rule ID: The ID of the rule that triggered the finding
            
        -   Prioritization Labels: Labels assigned to a finding (such as No Validation), which allow you to prioritize findings for further analysis or mitigation
            
        
    -   Manual Fix Suggestion: Remediation options