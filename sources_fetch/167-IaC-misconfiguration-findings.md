---
title: "IaC misconfiguration findings"
tocId: "3Sc_DwIfTr0nOiiJcj5Ucw"
contentId: "14tWb49C7bRLWGHZcW~rew"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/IaC-misconfiguration-findings"
depth: 2
---

# IaC misconfiguration findings
IaC misconfiguration scans produce findings, which are potential security risks in your Infrastructure-as-Code (IaC) definitions. These insights help assess and analyze the security posture of your IaC assets.

The IaC misconfiguration Findings table is a filtered instance of the broader Findings table found under Cases & Issues, meaning it exclusively displays findings categorized as IaC misconfiguration findings.

**Note**

Findings are informational and, as such, are not directly mitigable. Remediation is performed on issues derived from findings.

To access IaC misconfiguration findings, under Modules, select Application Security → Issues → IaC Misconfigurations → click the Findings tab.

## Findings inventory

The Findings inventory includes the following exposed properties.

Read more...

| Property | Description |
| --- | --- |
| Name | The specific name or title of the finding (follows the name of the rule) |
| Asset Name | The name of the asset (such as a repository) where the finding was identified |
| Repository | The version control repository where the problematic code or configuration resides |
| Data Source | The system or integration from which the finding data was originally pulled (such as GitHub, GitLab) |
| Branch | The specific branch within the repository where the finding was detected |
| File Path | The exact path to the file within the repository's structure where the finding is located |

## Expanded Findings details

Clicking on a finding in the inventory table opens the Findings side card which provides additional details about the finding.

Read more...

-   **Finding summary**: Found at the top of the card. Includes the finding name, ID and type (Configuration for IaC findings)
    
-   Description: A description of the finding including its location
    
-   **Timestamp**: When the finding was last updated
    
-   Asset details: Includes Asset (The impacted asset. Clicking on the asset opens the asset side card without needing to navigate away to the asset section) and Asset Type (The specific asset type in which the IaC resource was identified)
    
-   Evidence: Provides evidence and contextual details within your SDLC containing the IaC misconfiguration finding:
    
    -   **Finding source**
        
        -   Data Source: The system or integration from which the finding data was originally pulled (such as GitHub or a CI/CD pipeline). Click the icon next to the data source to navigate to the data source itself
            
        -   Run ID: The unique identifier of the specific scan execution during which this finding was detected
            
        -   Collaborator: The individual or team responsible for contributing to the code or configuration where the finding was identified
            
        
    -   **Code context**
        
        -   Repository: The name of the version control repository where the finding was located
            
        -   Branch: The specific branch within the repository containing the finding
            
        -   File Path: The exact location of the finding within the repository file structure
            
        -   First Hash: The commit hash of the first commit where this specific finding was introduced or detected
            
        -   First Commit Date: The date of the commit that introduced the problematic code or dependency into the repository. This helps understand how long an issue has existed and for prioritizing remediation efforts based on its age
            
        
    -   **Scan metadata**
        
        -   Run ID: The unique identifier of the specific scan execution during which this finding was detected