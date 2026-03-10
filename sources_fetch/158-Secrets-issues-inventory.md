---
title: "Secrets issues inventory"
tocId: "DpYNIst3OuFj4347UoyMjg"
contentId: "VttKETr6nflfSCgbp7Z3wQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Secrets-issues-inventory"
depth: 2
---

# Secrets issues inventory
The Secrets issues inventory includes the following properties. Use the Table Settings Menu to view additional properties.

| Property | Description |
| --- | --- |
| Severity | Severity level of the secret exposure (such as Critical, High, Medium, Low) |
| Name | Name or description of the secret exposure type |
| Asset Name | Name of the resource or asset where the secret was exposed. Selecting an Asset Name in the table opens the asset's side card, displaying information about the asset, without having to navigate away from the issue page. |
| Urgency | A context-aware metric to help you focus remediation efforts on the issues that pose the greatest real-world risk in your code. Urgency enrichment highlights risks based on specific, high-impact factors such as deployment status and runtime exposure. For more information about Urgency, refer to Urgency |
| Risk Factors | Specific conditions that increase the exposure or exploitability of a secret. Options: Found in history, Valid, Privileged |
| AppSec Policy | The Application Security policy that identified the specific security policy that was violated, which triggered the scanner to generate this issue. Selecting a policy in the table opens the policy side card, displaying a summary of the policy, without having to navigate away from the issue page. For more information about Application Security policies, refer to Application Security Policies |
| Data Source | The system or integration from which the issue data was originally pulled (such as GitHub, GitLab) |
| SLA | Application Security SLA defines deadlines for fixing security issues based on severity, ensuring timely remediation and improving team performance. For more information about Application Security SLA, refer to Service Lead Agreements (SLA) |
| Rule Category | The category associated with the rule that detected the secret |
| Status | The current state of the issue. Options: New, In Progress, Resolved |
| File Path | Path to the file or location within the code where the secret was exposed |
| Assignee | The individual responsible for addressing and resolving the issue |
| Created | Timestamp of when the secret exposure was first detected |
| Backlog Status | Indicates whether the issue is classified as pre-existing technical debt (Backlog) or a newly introduced vulnerability (New). For more on Backlog status, refer to Backlog baseline |
| Business Applications | Business applications that includes assets in which the exposed secret was detected |
| Organization | The organization within the VCS in which the issue was detected |
| Branch | The specific branch or version of the code where the secret exposure was detected |
| Repository | The version control repository where secret resides |

## Secrets validation

You can filter secrets based on their validation status. Options include:

-   Valid: The secret has been verified as active and functional
    
-   Invalid: The secret has been verified as no longer active or functional
    
-   Privileged: The secret is valid and provides access to sensitive resources or functions
    
-   No Validation: Validation was not attempted because the secret type or source does not support verification
    
-   Unavailable: Validation could not be performed because the secret source was inaccessible or the required permissions were missing