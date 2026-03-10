---
title: "Expanded Package Integrity issues inventory information"
tocId: "ofYdH0zFRV~k9GrpDPQLTw"
contentId: "qWM101MUVEdGTtwQe~WOGw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Expanded-Package-Integrity-issues-inventory-information"
depth: 3
---

# Expanded Package Integrity issues inventory information
Clicking an issue in the table opens a detailed side card that serves as a centralized workspace for investigation and remediation. The card opens on the Overview tab, which presents general details, metadata, and a summary of the evidence, while the War Room tab provides an audit trail of all automatic and manual actions taken on the issue, offering context on how it has been investigated over time. The Actions tab lists available remediation options, and for IaC and vulnerability issues, the Code to Cloud tab displays related resources and lineage between code and runtime, allowing you to understand the impact of the issue across environments.

Overview

-   **Timestamp**: When the issue was created and last updated
    
-   Status: The issue status. Values: New, In Progress, Resolved. You can set the status as required
    
-   Assignee: The entity assigned to mitigate the issue. You can assign the issue
    
-   Description: Provides details about the package integrity issue, including the location where the package was detected (such as specific repository, file path, and line number) and the operational risks identified
    
-   Impact: The impact that the issue could potentially have on your SDLC
    
-   Asset details: Includes Asset (The impacted asset. Clicking on the asset opens the asset side card without needing to navigate away to the asset section) and Asset Type (The specific asset type in which the IaC resource was identified)
    
-   Evidence: Provides evidence and contextual details within your SDLC containing the package operational risk:
    
    -   **Issue source**
        
        -   Data Source: The system or integration from which the issue data was originally pulled (such as GitHub or a CI/CD pipeline). Click the icon next to the data source to navigate to the data source itself
            
        -   Category: Package Operational Risk is the immutable value
            
        -   AppSec Policy: The violated security standard that led to the creation of the issue. Includes a link to the policy
            
        
    -   **Scanning context**
        
        -   Scanner Type: Code. The value is immutable
            
        -   Scanner Source: Cortex AppSec. The value is immutable
            
        -   Package Manager: The package manager (such as PIP, npm, Maven) in which the vulnerability was detected
            
        -   Package Registry URL: The URL of the package registry (e.g., npm, PyPI, Maven Central) from which the vulnerable package was obtained
            
        
    -   **Code location**
        
        -   Repository Name: The name of the version control repository where the issue was located
            
        -   Branch: The specific branch within the repository containing the issue
            
        -   File Path: The exact location of the issue within the repository file structure
            
        -   Commit Hash: The commit hash of the most recent commit that modified the code where the issue was detected
            
        -   Commit Time: The timestamp of the most recent commit that modified the code where the issue was detected
            
        
    -   **Risk analysis**
        
        -   Risk Factors: Specific attributes or conditions that contribute to an issue's likelihood or the severity of its impact
            
        
    
-   Remediation: Suggested mitigation for the package operational risk.
    

**Note**

Different issue types include different properties; therefore, not all properties are available for every issue.

Actions

This tab includes suggested steps to fix the issue. No automatic fixes are available for Package Operational Risks.

War Room

The War Room provides an audit trail of all automatic or manual actions taken on an issue, serving as a dedicated space to review and interact with your issue. Each issue has a unique War Room. With machine learning insights, the Cortex Cloud platform suggests the most effective analysts and command sets to help you address issues efficiently.