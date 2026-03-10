---
title: "Rules inventory"
tocId: "vTNo0yjGwALTq5avwtuy5Q"
contentId: "LH3dIw5k~_VdBVv2PB~Kpg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Rules-inventory"
depth: 2
---

# Rules inventory
To access Cortex Cloud Application Security rules, under Modules select Application Security → AppSec Rules (under Policy Management).

The Cortex Cloud Application Security rules inventory includes both out-of-the-box and custom rules. The following list describes rules fields/properties displayed in the inventory table. By default, rules are displayed according to severity and then alphabetically. Details are provided for properties that require explanation. You can enable or disable rules by checking the box next to the rule name in the table.

| Attribute/Property | Description |
| --- | --- |
| Rule Name | The rule name |
| Rule Description | A description of the rule |
| Severity | The severity level assigned to findings identified by the rule |
| Scanner | The type of Application Security scanner configured to detect violations of this rule |
| Policies Count | The amount of policies that included the rule in its configuration |
| Last modified | The date and time when the rule was most recently updated |
| Labels | Labels assigned to the rule |
| Framework/Language | The framework or language that the detection rule applies to (for example, GitHub, Terraform, JavaScript) |
| Issues Count | The amount of issues generated from findings detected by the rule. Select the value to navigate directly to the dedicated Issues page for the corresponding scan type, Filtered by the issues detected by the rule |
| Mapped Cloud Security Rule | The corresponding Cloud Security Posture Management (CSPM) rule ID that is linked to this Application Security rule. This mapping enables unified policy enforcement and ensures consistent security governance from code to cloud |

## How to search for Cortex Cloud Application Security rules

Use filters to find specific rules or categories.

Example 9. Examples

-   To filter rules relating to Secrets, select filter icon → Scanner (from the Select field) → Secrets (from the Value field).
    
-   To view custom rules only, select Mode from the Select field, not equals as the operator, and Out-of -the-box as the value
    
-   Sort rules according to their attributes, such as issue severity, to prioritize remediation efforts