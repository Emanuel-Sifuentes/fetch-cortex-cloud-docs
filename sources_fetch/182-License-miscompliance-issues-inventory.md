---
title: "License miscompliance issues inventory"
tocId: "o4D0uJymx2k1i5BdnQB17Q"
contentId: "xdAKzrXsLYSfR0MmSwekkA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/License-miscompliance-issues-inventory"
depth: 3
---

# License miscompliance issues inventory
This table includes selected fields of the license miscompliance issues issues inventory.

Read more...

| Field/attribute | Definition |
| --- | --- |
| Severity | The severity level assigned to a detected license compliance issue (such as high, medium, low). |
| Name | The full name or text of the software license |
| License | The identifier or short name of the associated license (such as MPL-2.0). |
| Asset Name | The name of the asset such as application, service) that uses this license. Selecting the asset opens its side panel, allowing you to view asset details directly without leaving the issue |
| Package Manager | The package manager used to install or manage the software package including the license (such as, npm, pip, maven) |
| License Category | A categorization of the license based on its type (such as strong copyleft ) |
| Scan Source | The type of scan that detected the issue, such as periodic or pull request |
| Assignee | The individual or team responsible for addressing the license compliance issue |
| Created | The date and time when the license compliance issue was first detected or recorded |

Clicking an issue in the table opens a detailed side card that serves as a centralized workspace for investigation and remediation. The card opens on the Overview tab, which presents general details, metadata, and a summary of the evidence, while the War Room tab provides an audit trail of all automatic and manual actions taken on the issue, offering context on how it has been investigated over time. The Actions tab lists available remediation options, and for IaC and vulnerability issues, the Code to Cloud tab displays related resources and lineage between code and runtime, allowing you to understand the impact of the issue across environments.

Issue summary

The issue summary displayed at the top of the card provides concise details including the package manager and the name and type of package in which the license miscompliance issue was detected.

Overview

The Overview tab provides general details of the license miscompliance:

-   Description: Provides a summary of the license miscompliance
    
-   Impact: The potential impact the license miscompliance issue could have on your SDLC
    
-   Status: The status of the issue. Values: New, In Progress, Resolved. You can modify the status of the issue from the menu in the field
    
-   Assignee: The entity assigned to resolve the issue. By default the value is Unassigned. Select an assignee from the menu in the field
    
-   **Timestamps**: Provides the date the issue was created and last updated
    
-   Affected Assets: Identifies the asset impacted by the issue. Selecting the asset opens its side panel, allowing you to view asset details directly without leaving the issue or navigating to the dedicated Assets section under Inventory
    
-   Linked Cases: The cases that the issue is linked to, including the amount of cases, their description and severity. Selecting a case opens its side panel, allowing you to view case details directly without leaving the issue or navigating to the dedicated Cases section under Cases & Issues
    
-   Evidence: Details and location in the codebase of the package containing the license miscompliance issue
    
    -   **Issue source and classification**
        
        -   Scanner Type: The type of security analysis tool that identified the license miscompliance (The default is AppSec Package License Scanner)
            
        -   Scanner Source: The specific platform or vendor providing the scanner. Cortex AppSec is the default source
            
        -   AppSec Policy: The Cortex Cloud Application Security policy that was triggered, leading to the creation of this issue. Select the icon next to the policy name to navigate to the policy on the AppSec Policies page
            
        -   Backlog Status: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced license miscompliance issue). To understand how issues are categorized  as backlog/new, refer to Issue/Finding classification by scanner
            
        
    -   **Code context**
        
        -   Package Manager: The system (such as npm, pip) managing application dependencies that contains the non-compliant license issue
            
        -   Repository Name: The name of the version control repository where the license issue was found
            
        -   Branch: The specific development branch within the repository containing the license issue
            
        -   File Path: The exact location of the license issue within the repository's file structure
            
        -   Commit Hash: The unique identifier of the code change (commit) that is associated with the license issue
            
        
    -   **Metadata**
        
        -   Data Source: The system or integration from which the issue was originally detected (such as GitHub or CI/CD pipeline). Select the icon next to the data source redirects to the data source
            
        
    
-   Remediation: Suggested remediation steps to address the issue. See Actions below for detailed information
    

Actions

The Actions tab displays suggestions to fix the license miscompliance, including contacting your legal team for further investigation.