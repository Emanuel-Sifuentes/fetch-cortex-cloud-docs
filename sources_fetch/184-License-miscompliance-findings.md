---
title: "License miscompliance findings"
tocId: "dev3hT4fwy6AO_pK1O1gDw"
contentId: "OfWOUd2VKc~wHAOBeD8TTQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/License-miscompliance-findings"
depth: 3
---

# License miscompliance findings
License miscompliance findings are potential licensing vulnerabilities in your open-source software packages. These findings allow you to assess and analyze your package license compliance. Promoting these findings to issues allows you to address license non-compliance. This ensures compliance with licensing requirements and maintain the integrity of your software supply chain.

The Licenses Findings table is a filtered instance of the broader Findings table found under Cases & Issues, meaning it exclusively displays findings categorized as license miscompliance findings. However, the Licenses Findings table only displays findings detected during periodic scans. In contrast, the comprehensive Findings table includes all license miscompliance findings regardless of their detection source, such as periodic, pull request (PR), and continuous integration (CI) scans.

## How to access license miscompliance findings

To access license miscompliance findings, under Modules, select Application Security → Issues → Licenses → click the Findings tab.

## License miscompliance findings inventory

The license findings inventory includes the following properties.

Read more...

| Field/attribute | Definition |
| --- | --- |
| Name | The finding name including the category assigned, such as Weak copyleft |
| License | The specific license under which the software package is distributed (such as MIT, GPL, Apache 2.0). |
| Asset Name | The name of the asset such as application, service) that uses this license |
| Package Manager | The package manager used to install or manage the software package including the license (such as, npm, pip, maven) |
| Dependency Type | Indicates whether the dependency is direct or transitive |
| Repository | The repository hosting the code in which the license miscompliance was detected |
| Branch | The branch containing the repository with the license miscompliance |
| License Category | A categorization of the license based on its type (such as strong copyleft ) |
| Data Source | The version control system hosting the repository with the license miscompliance |
| Created | The date and time when the license compliance issue was first detected or recorded |
| Finding ID | The unique identifier assigned to the license finding |
| Backlog Status | Backlog Status: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability). To understand how issues are categorized as backlog/new, refer to Issue/Finding classification by scanner |

## Expanded Findings details

Clicking on a finding in the inventory table opens the Findings side card, which provides additional details about the finding.

Read more...

-   **Finding summary**: Found at the top of the card. Includes the finding name, ID and type (Code for license miscompliance findings)
    
-   Description: A description of the finding including its location
    
-   **Timestamp**: When the finding was last updated
    
-   Asset details: Includes Asset (The impacted asset. Clicking on the asset opens the asset side card without needing to navigate away to the asset section) and Asset Type (The specific asset type in which the license miscompliance was identified)
    
-   Evidence: Provides evidence and contextual details within your SDLC containing the IaC misconfiguration finding:
    
    -   **Finding source**
        
        -   Data Source: The system or integration from which the finding data was originally pulled (such as GitHub or a CI/CD pipeline). Click the icon next to the data source to navigate to the data source itself
            
        -   Collaborator: The individual or team responsible for contributing to the code or configuration where the finding was identified
            
        
    -   **License information**
        
        -   License. The license (MPL-2.0) including the miscompliance
            
        -   License Category. The category assigned to the license. Refer to Open-source software license categories for more information about license categories
            
        -   OSI Approved. Whether the license is OSI approved or not
            
        
    -   **Code context**
        
        -   Repository: The name of the version control repository where the finding was located
            
        -   Package Manager: The tool (such as PIP) that manages the dependency in which the license miscompliance was detected
            
        -   Branch: The specific branch within the repository containing the finding
            
        -   File Path: The exact location of the finding within the repository file structure
            
        -   First Hash: The commit hash of the first commit where this specific finding was introduced or detected
            
        
    -   **Scan metadata**
        
        -   Run ID: The unique identifier of the specific scan execution during which this finding was detected