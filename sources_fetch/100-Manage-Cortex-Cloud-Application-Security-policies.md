---
title: "Manage Cortex Cloud Application Security policies"
tocId: "9CrDjxru665SRHvPGC6c3w"
contentId: "a_4~rUtc4B1Mz8Y3_TxNdQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Manage-Cortex-Cloud-Application-Security-policies"
depth: 3
---

# Manage Cortex Cloud Application Security policies
Manage your custom Cortex Cloud Application Security policies to maintain an effective application security posture and adapt your security rules to evolving threats and requirements.

To manage policies, right-click on a policy in the table or select a policy and then select the menu in the side panel. The following actions are available:

-   Edit: Redirects to the policy wizard, allowing you to modify the policy
    
    **Note**
    
    You cannot edit out-of-the-box (OOTB) policies.
    
-   Duplicate: Clone default policies as templates for creating custom policies. When this option is selected, the policy wizard is displayed with the original policy configurations, allowing you to modify them as required
    
    **Note**
    
    The duplicated policy will include the word "clone" in its name and must be renamed.
    
-   Disable: Enable or deactivate the policy without deleting it. Future scans will not trigger the policy, but existing issues detected by the policy will persist. Bulk actions are supported, allowing you to disable multiple policies simultaneously
    
-   Enable: Activates the policy configuration, making it active for all subsequent scans and enforcement gates.
    
-   Delete policy (Custom policies only): Permanently remove the policy from your environment. Issues detected by the policy will persist. Bulk deletions are supported