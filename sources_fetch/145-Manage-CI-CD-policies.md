---
title: "Manage CI/CD policies"
tocId: "pZZEoTNEYHX5_1EIeXaR4w"
contentId: "q8OegHQXbdW0lrT9Zz8w_Q"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Manage-CI/CD-policies"
depth: 2
---

# Manage CI/CD policies
Manage your custom CI/CD policies to maintain an effective application security posture and adapt your security rules to evolving threats and requirements.

To manage policies, right-click on a policy in the table or select a policy and then select the menu in the side panel. The following actions are available:

-   Edit policy: Redirects to the policy wizard, allowing you to modify the policy
    
    **Note**
    
    You cannot edit out-of-the-box (OOTB) policies.
    
-   Duplicate policy: Clone OOTB policies as templates for creating custom policies. When this option is selected, the policy wizard is displayed with the original policy configurations, allowing you to modify them as required
    
    **Note**
    
    The duplicated policy will include the word "clone" in its name and must be renamed.
    
-   Disable policy: Deactivate the policy without deleting it. Future scans will not trigger the policy, but existing issues detected by the policy will persist. Bulk actions are supported, allowing you to disable multiple policies simultaneously
    
-   Delete policy: Permanently remove the policy from your environment. Issues detected by the policy will persist. Bulk deletions are supported