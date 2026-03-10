---
title: "Code weakness findings"
tocId: "yxL0FIfgOwI6xKChNbDapw"
contentId: "g6JDmti8AduheiCAbag6Uw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Code-weakness-findings"
depth: 2
---

# Code weakness findings
SAST CWE findings are based on ingested third party (such as Semgrep) data. Findings are potential security vulnerabilities identified within your source code based on common weakness enumerations (CWEs). These insights help assess and analyze the security posture of your applications by identifying weaknesses in your codebase.

**Note**

Findings on the Cortex platform are not intended for direct action; but rather represent data collected by the platform. They must be promoted to issues to enable mitigation efforts to secure your codebase.

To access code weakness findings, navigate to code weakness issues (see SAST code weaknesses (CWEs)) and click the Findings tab.SAST code weaknesses (CWEs)

The following table displays selected code weakness findings properties.

Read more...

| Property | Description |
| --- | --- |
| Name | Short, descriptive name of the CWE finding (such as "SQL Injection," "Cross-Site Scripting") |
| CWE(s) | CWE identifier(s) associated with the finding (such as CWE-79, CWE-119) |
| OWASP Categories | Relevant Top 10 OWASP categories associated with the finding (but can be from different years) |
| Asset Name | Name of the repository affected by the CWE finding |
| Language | Programming language in which the CWE finding was detected (such as Java, Python, JavaScript) |
| Branch | The specific branch or version of the code where the CWE finding was detected |
| File Path | Path to the file or location to the code wherein the CWE finding was detected |
| Git User | Username of the Git user who last modified the file containing the finding |
| Data Source | Source of the CWE finding information |
| Created | Timestamp of when the CWE finding was first detected. |
| Finding ID | Unique identifier assigned to a specific finding |

Selecting a finding from the table provides additional details:

-   Overview: Includes when the finding was last updated, the category associated with the finding, and the name and link to the asset where the finding was detected
    
-   Details: The location of the finding, the third party data source that detected the finding, the CWE category, the initial hash and commit, and rule ID