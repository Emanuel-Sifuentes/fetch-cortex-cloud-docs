---
title: "Package Integrity findings"
tocId: "hvzIiwAHRXw64GKVlyYbZQ"
contentId: "OwTJCbS71HIAUiG7jEqfxA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Package-Integrity-findings"
depth: 3
---

# Package Integrity findings
Package Integrity scans produce findings, which are potential package operational risks within your software packages. These insights help assess and analyze the security posture of your software supply chain.

The Package Integrity Findings table is a filtered instance of the broader Findings table found under Cases & Issues, meaning it exclusively displays findings categorized as Package Integrity findings.

**Note**

Findings cannot be mitigated. They must be promoted to issues to enable remediation efforts to secure your software packages.

To access package integrity findings, navigate to Package Integrity issues (see Package integrity issues), and click the Findings tab.Package integrity issues

The following table describes selected fields in the Package Integrity Findings inventory table.

Read more...

| Property | Description |
| --- | --- |
| Name | The name of the package operational risk |
| Asset Name | The asset in which the finding was detected |
| Finding ID | A unique identifier assigned to the finding |
| Data Source | The version control system hosting the repository which includes the package in which the finding was detected |
| Package Manager | The package manager hosting the package in which the finding was detected |
| Repository | The repository hosting the package in which the finding was detected |
| Branch | The branch in which the finding was detected |
| File Path | The exact path to the file within the repository's structure where the issue is located |
| Dependency Type | Whether the package is direct or transitive |
| Created | When the finding was first detected |
| Backlog Status | Indicates whether the issue is classified as pre-existing technical debt (Backlog) or a newly introduced misconfiguration (New). For more on Backlog status, refer to Backlog baseline |

## Expanded Findings details

Click on a finding in the inventory table to open the Findings side card, which provides additional details about the finding.

-   **Summary**: A summary of the finding at the top of the card including name, id and the type of scanner (Code is the immutable value for Package Integrity issues) that detected the finding
    
-   Description: Provides a summary of the finding
    
-   Impact: The potential impact the issue could have on your SDLC
    
-   **Timestamps**: Provides the date the issue was last updated
    
-   Affected Assets: Identifies the asset impacted by the finding. Selecting the asset opens its side panel, allowing you to view asset details directly without leaving the finding or navigating to the dedicated Assets section under Inventory
    
-   Evidence: Details and location in the codebase of the package containing the package operational risk finding:
    
    -   **Issue source and classification**
        
        -   Package Manager: The dependency management system (such as npm, Maven) used to include or declare the software component where the finding was detected
            
        -   Dependency Type: Indicates whether the vulnerability originates from a direct dependency (explicitly declared in your project) or an indirect/transitive dependency (pulled in by one of your direct dependencies)
            
        -   Data Source: The system or integration from which the finding data was originally pulled (such as GitHub or a CI/CD pipeline). Select the icon next to navigate to the data source
            
        
    -   **Code context**
        
        -   Repository: The name of the version control repository where the finding was located
            
        -   Branch: The specific development branch within the repository containing the package integrity finding
            
        -   First Hash: The commit hash of the earliest code change where this finding was identified
            
        -   First Commit Date: The date of the commit that introduced the problematic code or dependency into the repository. This helps understand how long an issue has existed and for prioritizing remediation efforts based on its age
            
        -   Collaborator: The user that authored the relevant code commit
            
        
    -   **Code**: The file and code including the license miscompliance in which the finding was detected
        
    -   **Scan Metadata**
        
        -   Run ID: The unique identifier of the specific scan execution during which this finding was detected