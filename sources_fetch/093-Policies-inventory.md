---
title: "Policies inventory"
tocId: "mGoQMu12D22YclaSy_bn6A"
contentId: "2K82lx1bF08uUjOz~8qjZg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Policies-inventory"
depth: 2
---

# Policies inventory
The Cortex Cloud Application Security policies inventory includes both out-of-the-box and custom policies.

To access Cortex Cloud Application Security polices, under Modules, select Cortex Cloud Application Security → AppSec Policies (under Policy Management).

The following list describes the policy properties exposed by default in the inventory table. Additional properties can be added to the table from the Table Settings Menu.

| Field/attribute | Description |
| --- | --- |
| Policy Name | The name of the Cortex Cloud Application Security policy |
| Status | Whether the policy is enabled or disabled. Disabled policies are greyed out but remain clickable, allowing you to open the policy side panel |
| AI-Recommended (label) | Indicates the policy was generated from an AI-recommended guardrail without modification |
| Description | A description of the Cortex Cloud Application Security policy |
| Conditions | The specific criteria used to determine when policy actions are applied |
| Actions | The steps taken when the policy conditions and scope are met |
| Scope | The type of assets to be evaluated by the policy. See for more information about policy scope |
| Trigger | Trigger types that define when the condition will be evaluated. Options include Periodic scan, Pull Request scan and CI scan |
| Last Triggered | The last time that the policy was triggered |
| Created By | The user or entity that created the policy |
| Modified by | The user or entity that modified the policy |
| Modification Time | The timestamp of the most recent change to the policy |
| Open Issues | The amount of issues detected by the policy that remain unresolved |

## Expanded policy details

Selecting a policy opens a side panel where you can review additional details:

-   **Metadata**:
    
    -   **Policy details**: Name and description of the policy
        
    -   **Policy ownership**: Information on the policy's creator and last modifier
        
        **Note**
        
        To view all out-of-the-box (OOTB) policies, filter by `Policy Owner = System`.
        
    -   **Timestamps**: The last time the policy was modified and last triggered
        
    
-   **Scope**: The asset type the policy applies to, along with a table summarizing the policy conditions, trigger, and actions, displayed as follows:
    
    -   When: The trigger that initiates the policy action, such as Periodic, Pull Request, or CI scans
        
    -   If: Conditions that are applied to the policy. For example: `(Finding Type = IaC   Misconfiguration) AND (Severity = Critical)`
        
    -   Then: Triggered actions for the policy, such as Create issue and Block PR