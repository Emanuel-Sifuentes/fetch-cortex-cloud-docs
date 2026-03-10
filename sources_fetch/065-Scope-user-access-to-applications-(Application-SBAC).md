---
title: "Scope user access to applications (Application SBAC)"
tocId: "d40uNoxnzRlERo32eV0hbg"
contentId: "Gpg5blC5p_5zLY3PCZo5EQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Scope-user-access-to-applications-Application-SBAC"
depth: 2
---

# Scope user access to applications (Application SBAC)
Scope user access to applications to ensure users only have permission, visibility, and actions within the applications explicitly assigned to them. This enforces clear security boundaries and provides consistent, application-level control across all application-related assets and issues, minimizing a user’s broad or unnecessary access by enforcing per-user application-level control and ensuring users can only access what’s relevant to them.

Application SBAC defines security boundaries and policies around the application entity itself. It provides granular, application-aware control, transitioning from infrastructure-wide permissions to application-specific enforcement.

## Key features

-   **Granular access control** (Implicit Deny Model): Enforces explicit user access to specific applications and their associated assets—such as repositories, packages, and vulnerabilities. Access to any application or asset not explicitly listed is automatically denied
    
-   **Contextual data filtering**: Use the Business Application Names as a universal filter to scope data views (such as dashboards) to a selected application
    

## Application-based scope across the platform

-   ASPM Command Center: Limits the interactive security workflow graph in the ASPM Command Center to only the applications the user is authorized for
    
-   Dashboards: Application scope automatically narrows platform-wide data into application-specific insights
    
-   Coverage: Evaluate the security maturity of your application by identifying connected data sources and their coverage status of the application's assets, assessing the scanner coverage status of onboarded assets, and understanding which scanners (such as SCA, Secrets, IaC) that are actively analyzing the application's codebase and build
    

## Application SBAC setup and workflow

1.  Platform enablement: Enable SBAC at the tenant level.
    
2.  Create or edit an Asset Group to include application assets.
    
3.  Scope user access to an an application.
    
    1.  Assign application-based SBAC to a User Group.
        
    2.  Add users to the User Group.
        
4.  **Resulting visibility**: Users see only the applications and related assets they are authorized to manage, based on the applied application scope.
    

## Manage user access

Configure user scopes in Cortex Cloud by navigating to Settings → Configurations → Access Management. You must possess the necessary View/Edit RBAC permissions for Access Management. These permissions are granted by default to the Account Admin and Instance Administrator roles.