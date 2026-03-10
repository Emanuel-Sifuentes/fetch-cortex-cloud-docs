---
title: "Package Integrity inventory"
tocId: "v2mRtwyVG_XOvg9_Z3LW7A"
contentId: "wUx4_KxkrZnmbCAPrr7NJw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Package-Integrity-inventory"
depth: 3
---

# Package Integrity inventory
The following table describes selected fields in the Package Integrity issues inventory table.

Read more...

| Property | Description |
| --- | --- |
| Severity | Severity level of the package integrity issue (such as Critical, High, Medium, Low) |
| Name | Name of the package integrity issue |
| Asset Name | Name of the asset affected by the package integrity issue |
| Package Manager | The package management system used (such as npm, Maven, pip), in which the package with the issue was detected |
| Repository | Name of the repository where the package was obtained |
| Branch | The specific branch of the code where the package was used |
| File Path | The exact path to the file within the repository's structure where the issue is located |
| Data Source | The sources from which the issue was generated or collected |
| Dependency Type | Type of dependency (direct, transitive) |
| Created | Timestamp of when the package integrity issue was first detected |
| Status | The current state of the issue (New, In Progress, Resolved) |
| Backlog Status | Indicates whether the issue is classified as pre-existing technical debt (Backlog) or a newly introduced risk (New). For more on Backlog status, refer to Backlog baseline |
| Assignee | The individual or identity responsible for addressing the package integrity issue |

Clicking an issue in the table opens a detailed side card that serves as a centralized workspace for investigation and remediation. The card opens on the Overview tab, which presents general details, metadata, and a summary of the evidence, while the War Room tab provides an audit trail of all automatic and manual actions taken on the issue, offering context on how it has been investigated over time. The Actions tab lists available remediation options, and for IaC and vulnerability issues, the Code to Cloud tab displays related resources and lineage between code and runtime, allowing you to understand the impact of the issue across environments.

Issue summary

The issue summary, displayed at the top of the card, provides concise details about the issue, including its name, severity, type (such as configuration or data), the number of days the issue has been open, and the type of scanner that detected the issue (such as IaC scanner).

**Note**

You can modify the severity level from the severity field menu.

Overview

The Overview tab provides general details of the package integrity issue:

-   Description: Provides a summary of the issue
    
-   Impact: The potential impact the issue could have on your SDLC
    
-   Status: The status of the issue. Values: New, In Progress, Resolved. You can modify the status of the issue from the menu in the field
    
-   Assignee: The entity assigned to resolve the issue. By default the value is Unassigned. Select an assignee from the menu in the field
    
-   **Timestamps**: Provides the date the issue was created and last updated
    
-   Affected Assets: Identifies the asset impacted by the issue. Selecting the asset opens its side panel, allowing you to view asset details directly without leaving the issue or navigating to the dedicated Assets section under Inventory
    
-   Linked Cases: The cases that the issue is linked to, including the amount of cases, their description and severity. Selecting a case opens its side panel, allowing you to view case details directly without leaving the issue or navigating to the dedicated Cases section under Cases & Issues
    
-   AppSec Policy: The policy (with its defined rules and conditions) that was triggered, leading to the creation of this issue. Includes a link to the policy in the general Cortex Cloud Application Security policy inventory
    
-   Evidence: Details and location in the codebase of the package containing the package operational risk issue
    
    -   **Issue source and classification**
        
        -   Scanner Type: The type of security analysis tool that identified the package integrity issue
            
        -   Scanner Source: The specific platform or vendor providing the scanner. Cortex AppSec is the default source. This field is not selectable
            
        -   Package Manager: The software package management system used (such as npm, pip, Maven, NuGet)
            
        -   Package Registry URL: The URL of the repository or registry from which the package was sourced. Select the icon next to the policy name to navigate to the package registry
            
        -   Backlog Status: Indicates if the finding is categorized as Backlog (pre-existing technical debt) or New (a recently introduced package integrity issue)
            
        -   AppSec Policy: The Cortex Cloud Application Security policy that was triggered, leading to the creation of this issue. Select the icon next to the policy name to navigate to the policy in the the AppSec Policies page. To understand how issues are categorized  as backlog/new, refer to Issue/Finding classification by scanner
            
        
    -   **Code context**
        
        -   Branch: The specific development branch within the repository containing the package integrity issue
            
        -   File Path: The exact location of the relevant file (such as package.json, pom.xml) within the repository's file structure
            
        -   Commit Hash: The unique identifier of the code change (commit) that is associated with the package integrity issue
            
        -   Collaborator: The user that authored the relevant code commit
            
        -   Commit Time: The date and time when the associated code commit was made
            
        
    -   **Metadata**
        
        -   Data Source: The system or integration from which the finding data was originally pulled (such as GitHub or a CI/CD pipeline). Select the icon next to navigate to the data source
            
        -   Risk Factors: Specific attributes or conditions that contribute to the severity or exploitability of the package integrity issue
            
        
    
-   Remediation: Suggested manual remediation steps to address the operational risk. See Actions for more detailed information
    

Actions

The Actions tab provides suggested steps to address package operational risk issues.