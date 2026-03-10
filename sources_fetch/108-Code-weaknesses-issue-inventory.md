---
title: "Code weaknesses issue inventory"
tocId: "yqPP4RHmgTSeGF3J1wNZaA"
contentId: "ZRsrhMuK4l291sOFdoHEBQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Code-weaknesses-issue-inventory"
depth: 2
---

# Code weaknesses issue inventory
The SAST code weakness issues inventory includes the following fields.

| Property | Description |
| --- | --- |
| Severity | Severity level of the code weakness issue (such as Critical, High, Medium, Low) |
| Name | Short, descriptive name of the code weakness issue (such as "SQL Injection," "Cross-Site Scripting") |
| CWE(s) | Common weakness enumeration (CWE) identifiers associated with the issue |
| OWASP Categories | Top 10 OWASP categories |
| Asset Name | Name of the repository affected by the CWE issue (such as library name, file name) |
| Language | Programming language in which the CWE issue was detected (such as Java, Python, JavaScript) |
| Branch | The specific branch or version of the code where the CWE issue was detected |
| File Path | Path to the file or location within the code where the CWE issue was detected |
| Data Source | The 3rd party data source for the code weakness such as GitLab or GitHub |
| Risk Factors | Classifies the issue based on industry-standard categories, such as OWASP Top 10, CWE Top 25, providing a standardized understanding of its type and prevalence |
| Status | The issue status. Values: New, In Progress, Resolved. You can set the status as required |
| Backlog Status | Backlog Status: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability). To understand how issues are categorized as backlog/new, refer to Issue/Finding classification by scanner |
| Created | When the issue was created |
| Assignee | The entity assigned to mitigate the issue |

Selecting an issue in the table opens a card with tabs including additional information about the issues, including suggested remediation.

Summary

A summary of the code weakness including the severity level, the CWE identity and the type of engine that detected the weakness.

Overview

The Overview tab provides general details of the SAST CWE:

-   Description: Provides a summary of the CWE and its potential impact
    
-   Status: Displays the current state of the issue
    
-   **Timestamps**: Provides the date the issue was created and last updated
    
-   Assignee: Assign the CWE issue to the appropriate team member remediation using the dropdown menu
    
-   Affected Assets: Identifies the version control system and repository containing the CWE
    
-   Evidence:
    
    -   Details and the location in the codebase of the code containing the CWE, including vulnerability classifications (such as OWASP) specific code lines and functions
        
    -   **Commit details**: Includes the commit hash, committer, and the assigned user responsible for remediation
        
    
-   AppSec Rule: The detection rule that flagged the issue
    
-   Weakness Details: The CWE identifier with a link to the weakness in the MITRE database
    
-   Remediation: Suggested manual remediation steps to address the CWE issue
    

Actions

The Actions tab displays suggested steps to mitigate the CWE issue.