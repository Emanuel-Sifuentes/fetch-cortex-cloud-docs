---
title: "CI/CD rules inventory"
tocId: "JtTsG92LeKkreDfYIJElKw"
contentId: "ETkPpgU~LgZvdiajjhuPyA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/CI/CD-rules-inventory"
depth: 2
---

# CI/CD rules inventory
The CI/CD rules inventory includes both out-of-the-box and custom rules.

To access the inventory:

1.  Under Modules, select Application Security → AppSec Rules (under Policy Management).
    
2.  In the Filter panel, select Scanner → CI/CD Security.
    

The following list lists the exposed AppSec Rules table properties. Additional settings are found under Menu settings.

| Field/Property | Description |
| --- | --- |
| Severity | The priority level assigned to findings identified by the rule |
| Rule Name | The rule name |
| Rule Description | A description of the rule |
| Framework/Language | The framework or language that the detection rule applies to (for example, GitHub, Terraform, JavaScript) |
| Labels | Labels assigned to the rule |
| Policies Count | The amount of policies that include the rule. Selecting the count redirects to the AppSec Policies page, sorted by the policies associated with the rule |
| Issues Count | The amount of issues detected by the rule. Selecting the count redirects to the CI/CD Risks page, sorted by the issues detected by the rule |
| Scanner | CI/CD Security. This value is immutable |
| Last modified | The date and time when the rule was most recently updated |
| Mapped Cloud Security Rule | The specific runtime cloud security policy that correlates with this AppSec rule. This mapping enables you to trace a security issue from its definition in code to its manifestation in the live cloud environment, ensuring end-to-end visibility |