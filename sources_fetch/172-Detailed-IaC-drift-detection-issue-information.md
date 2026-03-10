---
title: "Detailed IaC drift detection issue information"
tocId: "xZ9kEr2rpu8ocX29VseEJA"
contentId: "Ax7qhMTRhjDGoK8LIWxfdg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Detailed-IaC-drift-detection-issue-information"
depth: 2
---

# Detailed IaC drift detection issue information
Clicking an issue in the table opens a detailed side card that serves as a centralized workspace for investigation and remediation. The card opens on the Overview tab, which presents general details, metadata, and a summary of the evidence, while the War Room tab provides an audit trail of all automatic and manual actions taken on the issue, offering context on how it has been investigated over time. The Actions tab lists available remediation options, and for IaC and vulnerability issues, the Code to Cloud tab displays related resources and lineage between code and runtime, allowing you to understand the impact of the issue across environments.

## Overview

-   **Issue metadata**
    
    -   **Timestamp**: When the issue was created and last updated
        
    -   Status: Displays the current state of the issue. Values: New, In Progress, Resolved. You can set the status as required
        
    -   Severity: The severity level of the issue. You can modify the severity level
        
    -   Assignee: The entity assigned to mitigate the issue. You can assign the issue to a person responsible for resolving this issue
        
    -   AppSec Policy: The violated security standard that led to the detection and creation of the issue. Selecting the link in the field redirects to the AppSec Policies table, filtered by the selected policy. To configure these baselines, refer to Create IaC Drift Detection policies
        
    -   Backlog: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability). To understand how issues are categorized as backlog/new, refer to Issue/Finding classification by scanner
        
    
-   Description: A description of the issue
    
    Example 18. Example
    
    The AWS S3 Bucket Foo has been manually modified and now has drifted configuration from the Terraform resource aws_s3_bucket.bar in the repository panw/xxxx that can cause operational and security risks.
    
      
    
-   Impact: The potential risks resulting from the configuration drift
    
    Example 19. Example
    
    Drift can introduce security vulnerabilities and compliance issues if changes occur outside the established Software Development Life Cycle (SDLC) processes. Consequently, addressing IaC drift is critical to ensure secure, efficient, and predictable cloud infrastructure operations.
    
      
    
-   Affected Assets: Identifies the resources impacted by the security violation across the Code and Runtime environments
    
    -   Affected Code Asset: The specific IaC resource (the source of truth) in the repository that corresponds to the drifted cloud resource. This asset is critical for understanding the original intended configuration and generating fix PRs.
        
    -   Affected Cloud Asset: Identifies the live runtime cloud resource (the deployed asset) on which the security policy violation was detected. This is the entity currently exposed to risk due to configuration drift.
        
    -   Framework: The specific Infrastructure as Code (IaC) framework used to define the original code asset (such as Terraform, CloudFormation)
        
    
-   Evidence: Provides evidence and contextual details about the issue:
    
    -   Data Source: The system or integration from which the issue data was originally pulled (such as GitHub). Click the link to navigate to the data source itself
        
    -   **Location**: The location of the issue, including the repository, branch, file path, and theIaC resource
        
    

## Resolution Actions

Remove the discrepancy and restore the cloud asset to its intended IaC-defined configuration. Two required remediation paths are available:

-   Align Drift in Code: Use this action when the configuration change in the cloud asset is intentional, required, or approved. The IaC file must be updated to reflect the runtime configuration.
    
    -   **Objective**: Make the IaC configuration the new source of truth by removing the drift in code
        
    -   **Method**: Generate a pull request (PR) which updates the original IaC file to match the deployed and compliant configuration, bringing the codebase back in sync with the runtime asset.
        
        1.  Select Align Drift in Code.
            
        2.  Open a Pull Request in the IaC repository that contains the drifted configuration captured in the provided Terraform template.
            
        3.  Run the following commands to sync your local state with the updated configuration:
            
            ```
            terraform refresh
            terraform plan // Reads the actual state from the live cloud environment (which includes the refresh function) and compares it against the desired IaC state to show the calculated changes needed to fix the drift.
            terraform apply // Executes the computed plan, applying the configuration defined in your updated IaC code to the live cloud environment
            ```
            
        
    
-   Reconcile Cloud Asset: Use this action when the drift results from an unmanaged or risky modification made directly in the cloud environment. The cloud asset must be reverted to the secure configuration defined in the IaC file.
    
    -   **Objective**: Remove the security risk by restoring the asset to its last IaC-defined, secure state
        
    -   Method: Re-apply the IaC configuration to the affected resource
        
    
    1.  Select Reconcile Cloud Asset.
        
    2.  Re-apply IaC configuration to the <affected cloud resource> so that the runtime aligns with the compliant IaC state.
        
    3.  Run:
        
        ```
        terraform plan -refresh=false
        terraform apply
        ```