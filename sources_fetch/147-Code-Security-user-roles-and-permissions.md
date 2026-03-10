---
title: "Code Security user roles and permissions"
tocId: "yG8_cHu6WxPKL3gOU9u9xQ"
contentId: "ZkQQ1F38xzaDC1jvHNB5Og"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Code-Security-user-roles-and-permissions"
depth: 1
---

# Code Security user roles and permissions
Cortex Cloud offers dedicated predefined user roles for Code Security: AppSec Admin, DevSecOps and Developer, each with specific areas of responsibilities. When assigning roles to users, it's recommended to align them with the user's required responsibilities within the application security framework.

The AppSec Admin has full permissions for all Cortex Cloud Application Security\-related activities. They can create and modify detection rules within the Code/Build domain, track progress, and adjust enforcements as needed. Additionally, they can triage and investigate findings, issues, and cases spanning from code to cloud. The role also includes complete visibility into all cloud assets.

The DevSecOps role is specifically designed as an intermediary, possessing more permissions than a Developer but fewer than an AppSec Admin. This role actively manages security processes and tools to embed security directly into development and operations workflows. Responsibilities include managing and resolving security issues, performing scan management, and improving the overall application security posture by integrating security practices throughout the development and operations lifecycle.

Developers within the Code Security environment have limited permissions primarily focused on viewing and monitoring security information. They can access and analyze scan results, track progress, and collaborate with security teams. However, they typically do not have the authority to modify detection rules, enforcements, or directly address security issues.

Permissions defined in the predefined roles cannot be changed. However, you can save a predefined role as a new custom role. This custom role can then be edited to meet specific organizational needs, offering a balance between standardized roles and customizable access control.

Dedicated Code Security roles include permissions that extend beyond Code Security itself. In addition to these dedicated users, other roles within your tenant are also granted specific permissions to Code Security. You can view all permissions granted to user roles in your tenant by navigating to Settings → Configurations → Roles → select a role.