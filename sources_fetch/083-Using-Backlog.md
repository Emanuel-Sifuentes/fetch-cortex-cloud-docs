---
title: "Using Backlog"
tocId: "vjt52fL~HJvXoMC0P135MA"
contentId: "WmM4YGt9dpJHVNQ~ylgfhA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Using-Backlog"
depth: 2
---

# Using Backlog
You can leverage the Backlog and New issue classifications across the platform as follows.

-   **Role-Based Access Control (RBAC) / Standard-Based Access Control (SBAC)**: Access and permissions will be managed systematically:
    
    -   By default, only AppSec Admins have permission to configure the issues on existing SBOM are considered new setting
        
    -   Permissions for all other capabilities, such as viewing issues or applying policies, are defined by the existing RBAC/SBAC policies and the user's specific issue management capabilities
        
    
-   **Policies/Scope**: The system supports Backlog and New attributes for policies, allowing for differentiated enforcement. Refer to Create Cortex Cloud Application Security policies for more informationCreate Cortex Cloud Application Security policies
    
-   **Multi-Branch Support**: The Backlog/New classification is consistent across development workflows:
    
    -   The Backlog/New classification is maintained independently for every branch
        
    -   The system allows policies to be defined and applied for specific branches, enabling you to tailor security rules (for example, enforcing stricter policies for New critical issues on main branches, or allowing Backlog issues on development branches) based on their classification
        
    
-   You can filter the **Cortex Cloud Application Security dashboard** to display information according to the Backlog/New classification
    
-   **Issues and Findings**: The Backlog/New classification is standardized across data for both findings and issues under the Backlog Status field, which is found under the Overview tab of both findings and issues side cards. For example, refer to Secrets issuesSecrets issues
    
-   The **API** provides comprehensive access to classified issue data:
    
    -   You can retrieve all backlog issues, or filter them per scanner
        
    -   You can retrieve all new issues, or filter them per scanner
        
    -   You can retrieve new issues within the backlog, either all of them or filtered per scanner
        
    -   You can disable the issues on existing SBOM are considered new flag programmatically, provided you have the required permissions