---
title: "Detailed Secrets issue information"
tocId: "tpzDDhAE5CbhXF2NdANIHw"
contentId: "4DqctFrbYAkF6DXEcM5r3Q"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Detailed-Secrets-issue-information"
depth: 2
---

# Detailed Secrets issue information
Clicking an issue in the table opens a detailed side card that serves as a centralized workspace for investigation and remediation. The card opens on the Overview tab, which presents general details, metadata, and a summary of the evidence, while the War Room tab provides an audit trail of all automatic and manual actions taken on the issue, offering context on how it has been investigated over time. The Actions tab lists available remediation options, and for IaC and vulnerability issues, the Code to Cloud tab displays related resources and lineage between code and runtime, allowing you to understand the impact of the issue across environments.

Overview

-   **Issue metadata**
    
    -   **Timestamp**: When the issue was created and last updated
        
    -   Status: Displays the current state of the issue. Values: New, In Progress, Resolved. You can set the status manually as required.
        
        **Note**:
        
        -   Status changes are permanent in the current state (no automatic reopening)
            
        -   If a previously resolved finding reappears in a new scan, a new issue may be created
            
        -   Resolved status: The issue is marked as addressed and removed from active management; it no longer affects system metrics
            
        
    -   Assignee: You can assign the issue to a person responsible for resolving this issue. Human entities are not supported
        
    -   Rule: The Cortex Cloud Application Security rule that detected the finding. Selecting the link in the field redirects to the AppSec Rules table, filtered by the selected rule (Only applies to IaC, Secrets and CI/CD rules)
        
    -   Policy: The violated security standard that led to the detection and creation of the issue. Selecting the link in the field redirects to the AppSec Policies table, filtered by the selected policy
        
    -   SLA (Service Level Agreement): Indicates the remediation timeline status for security issues. For example Overdue indicates that the issue has exceeded the target remediation timeframe. For more information about SLA, refer to Service Lead Agreements (SLA)
        
    -   Backlog Status: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability). To understand how issues are categorized as backlog or new, refer to Issue/Finding classification by scanner
        
    
-   Description: Provides a concise technical summary of the specific security finding detected. It identifies what the issue is by referencing standard identifiers (such as the CVE ID for vulnerabilities or the CWE name for code weaknesses) and explaining the nature of the flaw, misconfiguration, or risk within the asset
    
-   Impact: Defines the security or operational consequences of an unresolved or exploited issue. Use this field to translate technical findings into business risk, such as unauthorized access
    
-   Affected Assets: The specific asset in which the issue was identified. Clicking on the asset opens the asset side card without needing to navigate away to the asset table
    
-   **Related affected assets**: Assets associated with the primary asset based on the specific scanner used. Examples include package managers (such as pip) for vulnerabilities, IaC frameworks (such as Terraform) for misconfigurations, and third-party detection engines (such as Semgrep) for code weaknesses
    
-   Linked Cases: The number and severity of cases associated with this issue. Selecting the link opens the Cases side-card for more information without having to navigate away
    
-   Evidence: Provides evidence and contextual details about the issue:
    
    -   Data Source: The system or integration from which the issue data was originally pulled (such as GitHub or a CI/CD pipeline). Click the icon next to the data source to navigate to the data source itself
        
    -   **Location**: The exact technical context of a finding, linking security findings to specific lines of code or infrastructure files:
        
        **Examples**:
        
        -   **Vulnerabilities** (SCA): Identifies the manifest file path (such as `package-lock.json`) and the specific line where the vulnerable package is declared, providing a declaration snippet as context
            
        -   **IaC misconfigurations**: Points to the configuration file (such as main.tf) and the resource block's start and end lines. Context includes the full resource configuration and the specific resource identifier
            
        -   **Secrets**: Locates the file and line number of the exposure, providing a code snippet with the secret redacted for security
            
        -   **Code Weaknesses (SAST)**: References the source code file path and the start/end lines of the flaw. Context displays the vulnerable code snippet and the affected function or method name
            
        
    -   Collaborator: The individual or team responsible for contributing to the code or configuration where the issue was identified
        
    -   Commit Hash: The commit hash of the most recent commit that modified the code where the issue was detected
        
    -   Commit Time: The timestamp of the most recent commit that modified the code where the issue was detected
        
    
-   Urgency Details includes:
    
    -   **Summary**: The issue's urgency level, a breakdown of its contributing metrics, and the date it was last updated (Tip: Hover over a metric for more information)
        
    -   **Urgency context graph**: The Urgency graph provides a node-and-edge visualization that maps the structural relationship between a vulnerable asset and its connected infrastructure. By surfacing the asset hierarchy and deployment paths, the graph offers the context necessary to evaluate the scope and potential blast radius of an issue's urgency across the environment. This visualization allows you to analyze the specific deployment and runtime dependencies where the issue was detected. The urgency level itself is determined by metrics derived from the analysis of the connected assets.
        
        **Supported scanners**: Vulnerabilities (SCA), Secrets, Code Weaknesses (ingested from third -party vendors) and IaC misconfigurations.
        
        **Graph structure**:
        
        -   **Nodes** (assets): Represents assets such as repository or pipeline, that are linked to the specific asset where the issue was detected.
            
            Clicking on a node opens a side card showing: Clicking on a node opens a side card showing initial details about the asset. Selecting View Details opens the asset side card without navigating away, displaying asset details, asset-specific information, and related context for that asset.
            
        -   **Edges** (relationships): The edges in the Urgency graph represent relationships between different asset types in the code-to-cloud deployment pipeline. These relationships trace how code flows from repositories through to runtime environments, providing the structural data required to calculate urgency metrics. By analyzing these relationships, Cortex Cloud determines the urgency level based on metrics such as whether the code is actively deployed, internet-exposed, accessing sensitive data, or leveraging privileged capabilities within its runtime environment.
            
        
    -   **Interactive controls**:
        
        -   **Layers control**: Toggle visibility of Code, Build, or Runtime layers to focus on specific pipeline segments
            
        -   **Group nodes**: Collapse multiple related nodes (such as assets within the same organization or namespace) into a single group node to manage visual density
            
        -   **Search and filter**: Locate specific nodes by typing an asset name or ID. Matching nodes are highlighted and the graph auto-focuses on the results
            
        -   **Zoom and pan**: Navigate large topologies using zoom buttons, **Fit to View**, or drag-and-drop panning
            
        
    
    For more information about Urgency levels, refer to Urgency.
    
-   Remediation: Suggested steps to mitigate the issue. For the most efficient resolution, use the Actions tab, which provides a complete list of remediation options, including PR fixes where available
    

**Note**

Different issue types include different properties; therefore, not all properties are available for every issue.

Actions

Includes a manual fix where applicable. Automated fixes are not available for secrets issues.

War Room

The War Room provides an audit trail of all automatic or manual actions taken on an issue, serving as a dedicated space to review and interact with your issue. Each issue has a unique War Room. With machine learning insights, the Cortex Cloud platform suggests the most effective analysts and command sets to help you address issues efficiently.