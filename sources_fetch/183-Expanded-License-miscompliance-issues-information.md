---
title: "Expanded License miscompliance issues information"
tocId: "bdMGY1Q7tS6u1OsOW0hu5w"
contentId: "eCy6XcKdzwFcX5PTyVkRQQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Expanded-License-miscompliance-issues-information"
depth: 3
---

# Expanded License miscompliance issues information
Clicking an issue in the table opens a detailed side card that serves as a centralized workspace for investigation and remediation. The card opens on the Overview tab, which presents general details, metadata, and a summary of the evidence, while the War Room tab provides an audit trail of all automatic and manual actions taken on the issue, offering context on how it has been investigated over time. The Actions tab lists available remediation options, and for IaC and vulnerability issues, the Code to Cloud tab displays related resources and lineage between code and runtime, allowing you to understand the impact of the issue across environments.

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
    

Code to Cloud

The Code to Cloud tab provides a trace from the IaC misconfiguration issue to its impact on your runtime environment, displaying a list of traced runtime findings and traced runtime issues:

-   The Traced Runtime Issues table includes these exposed properties
    
    -   Severity: The level of risk associated with the issue.
        
    -   Issue Name: The name of the specific issue detected.
        
    -   Assigned to: Indicates the individual responsible for remediating the issue.
        
    -   Asset Name: The name of the runtime asset where the issue was detected.
        
    -   Detection Method: The method used to identify the issue, such as a specific scanner or security tool.
        
    -   Observation Time: The time and date when the issue was first observed in the runtime environment.
        
    
-   The Traced Runtime Findings table includes these exposed properties
    
    -   Finding Name: The specific name of the finding detected on the asset.
        
    -   Asset Name: The name of the runtime asset where the finding was detected.
        
    -   Detection Method: The method used to identify the finding.
        
    -   Observation Time: The time and date when the finding was first observed.
        
    

Actions

The Actions tab displays suggestions to fix the license miscompliance, including contacting your legal team for further investigation.

## War Room

The War Room provides an audit trail of all automatic or manual actions taken on an issue, serving as a dedicated space to review and interact with your issue. Each issue has a unique War Room. With machine learning insights, the Cortex Cloud platform suggests the most effective analysts and command sets to help you address issues efficiently.