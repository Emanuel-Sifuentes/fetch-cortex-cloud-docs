---
title: "Create application-scoped policies"
tocId: "SfeuTIlGv4bkZ6EqmDoeJw"
contentId: "kFRTxMQOnfuzCftgLI9uOg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Create-application-scoped-policies"
depth: 3
---

# Create application-scoped policies
The process for creating an Cortex Cloud Application Security application-scoped policy is the same as for a standard policy. The only difference is on the Scope step of the wizard, where you can restrict the policy to a specific application(s) and their associated assets. If your user access is application-scoped, you can create policies only within your assigned scope. All other steps remain unchanged.

**Note**

Application-scoped policies apply to both code and CI/CD configuration policies.

1.  Navigate to Modules → Application Security → AppSec Polices (under Policy Management) → Add Policy.
    
2.  Configure the General and Conditions steps of the wizard.
    
3.  On the Scope step of the wizard.
    
    1.  Select Asset Types as the scope.
        
    2.  Select Add Filter → Business Application Names → enter the required application name.
        
    3.  Click Next.
        
4.  Complete the remaining steps in the wizard to create the policy.
    
    The policy is displayed in the general AppSec Policies table, which reflects your application scope, displaying only the policies associated with applications you can access. Users with broader permissions can filter by Business Application Names to find application-scoped policies.
    

For more information about creating Cortex Cloud Application Security policies, refer to Create Cortex Cloud Application Security policies.