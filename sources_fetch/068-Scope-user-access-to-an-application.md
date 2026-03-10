---
title: "Scope user access to an application"
tocId: "Sa6H_DGpFaQRN2l4eAyQPw"
contentId: "GgyNig_ssN_64OC~e9bYZQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Scope-user-access-to-an-application"
depth: 3
---

# Scope user access to an application
Scoping user access by application ensures that permissions are applied consistently across all related assets. Users receive access through their membership in application-scoped User Groups.

## Assign application-based SBAC to a User Group

Define a User Group with SBAC permissions by setting its scope to include assets in Asset Groups that have application properties configured.

1.  Navigate to Settings → Configurations → User Groups (under Access Management).
    
2.  Right-click on a group in the table → Edit Group → select the Scope tab.
    
3.  Define the application scope:
    
    1.  **Scope assets**: Select Assets → Select asset groups → select an Asset Group associated with applications.
        
    2.  **Scope cases and issues**: Select Cases and Issues → All cases and issues.
        
4.  Click Save.
    

**Note**

For more information about User Groups, refer to User group management.User group management

## Add users to the application-scoped User Group

Add users to the User Group so they inherit the application-specific permissions and access to all related child resources, such as repositories.

1.  Select Settings → Configurations → Users (under Access Management).
    
2.  Right-click the relevant user → select Edit User Permissions.
    
3.  Select the Scope tab.
    
4.  Scope assets: Select the chevron icon (>) in the Assets field → Select Asset groups → select the user group scoped to the application (see above).
    
5.  Scope cases and issues: Select the chevron icon (>) in the Cases and Issues field → Select All Cases and issues.
    
6.  Click Save.