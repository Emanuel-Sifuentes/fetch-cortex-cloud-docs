---
title: "Expanded CI/CD risks issue information"
tocId: "YHI~g91RKzPWe1BABOnAkA"
contentId: "GPghRJE83TPuW6KBh9t7JA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Expanded-CI/CD-risks-issue-information"
depth: 2
---

# Expanded CI/CD risks issue information
Clicking an issue in the table opens a detailed side card that serves as a centralized workspace for investigation and remediation. The card opens on the Overview tab, which presents general details, metadata, and a summary of the evidence, while the War Room tab provides an audit trail of all automatic and manual actions taken on the issue, offering context on how it has been investigated over time. The Actions tab lists available remediation options, and for IaC and vulnerability issues, the Code to Cloud tab displays related resources and lineage between code and runtime, allowing you to understand the impact of the issue across environments.

Overview

-   **Timestamp**: When the issue was created and last updated
    
-   Status: The issue status. Values: New, In Progress, Resolved. You can set the status as required
    
-   Assignee: The entity assigned to mitigate the issue. You can assign the issue from the menu in the field
    
-   Description: A description of the risk and the impact that the issue could potentially have on your SDLC
    
-   Asset details: Includes Asset (The impacted asset. Clicking on the asset opens the asset side card without needing to navigate away to the asset section) and Asset Type (The specific asset type in which the IaC resource was identified)
    
-   Evidence: Provides evidence and contextual details within your SDLC containing the IaC misconfiguration issue:
    
    -   **Issue source**
        
        -   Data Source: The system or integration from which the issue data was originally pulled (such as GitHub or a CI/CD pipeline). Click the icon next to the data source to navigate to the data source itself
            
        -   Category: The scanner category. Configuration is the immutable value
            
        -   AppSec Rule: The security rule that detected this issue. Includes a link to the rule
            
        -   AppSec Policy: The violated security standard that lead to the creation of the issue. Includes a link to the policy
            
        -   Collaborator: The individual or team responsible for contributing to the code or configuration where the issue was identified
            
        
    -   **Code context**
        
        -   Scanner Type: AppSec CI/CD Risk Scanner is the immutable scanner type
            
        -   Scanner Source: Cortex AppSec is the immutable scanner source
            
        -   Repository Name: The name of the version control repository where the issue was located
            
        -   Branch: The specific branch within the repository containing the issue
            
        -   Framework: The infrastructure as code (IaC) framework used (such as CloudFormation, Terraform)
            
        -   File Path: The exact location of the issue within the repository file structure
            
        -   First Hash: The commit hash of the first commit where this specific issue was introduced or detected
            
        -   Commit Hash: The commit hash of the most recent commit that modified the code where the issue was detected
            
        -   Commit Time: The timestamp of the most recent commit that modified the code where the issue was detected
            
        
    -   Remediation: Suggested steps to remediate the issue
        
    

**Note**

Different issue types include different properties; therefore, not all properties are available for every issue.

Actions

Provides suggested solutions. No automated solutions are available for CI/CD risk issues.

## War Room

The War Room provides an audit trail of all automatic or manual actions taken on an issue, serving as a dedicated space to review and interact with your issue. Each issue has a unique War Room. With machine learning insights, the Cortex Cloud platform suggests the most effective analysts and command sets to help you address issues efficiently.