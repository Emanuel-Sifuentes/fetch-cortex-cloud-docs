---
title: "Enable SBAC in the Cortex Cloud tenant"
tocId: "nvAlLZVR3X2vYepqBay7Eg"
contentId: "8Rt42RU7Bs0evJJu0ZCqRQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Enable-SBAC-in-the-Cortex-Cloud-tenant"
depth: 3
---

# Enable SBAC in the Cortex Cloud tenant
Before configuring Application scope, SBAC must be enabled at the tenant level.

**Prerequisite**

**RBAC permissions**: To configure user scopes you must have Administrator or **View/Edit** RBAC permissions for Access Management (under Configurations).

-   Navigate to Settings → Configurations → General → Server Settings → Enable Scope Based Access Control.
    

**Note**

**Exclusions** (roles not governed by SBAC): Certain roles cannot have SBAC applied. For these roles, access and permissions are managed through Role-Based Access Control (RBAC). You must manually ensure that these roles have all necessary base permissions (for example **Edit/View permissions to assets**), because SBAC is bypassed and does not impose its usual restrictions. As a result, functional access for these roles is determined solely by their RBAC configuration.