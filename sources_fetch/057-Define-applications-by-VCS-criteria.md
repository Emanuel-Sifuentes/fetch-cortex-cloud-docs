---
title: "Define applications by VCS criteria"
tocId: "z1x7l1GQEBmTx0ha8wuy~Q"
contentId: "Gs_uLMRzjnA6k2IYDk1VWQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Define-applications-by-VCS-criteria"
depth: 3
---

# Define applications by VCS criteria
Use VCS Criteria to automatically generate and maintain Business Applications based on your code hierarchy. Unlike manual creation, this method creates a dynamic rule set: as developers create new repositories that match your criteria, they are automatically recognized and onboarded as Business Applications without manual intervention.

**Prerequisites**

-   **Data source**: Your Version Control System (e.g., GitHub, GitLab) must already be onboarded as a Data Source
    
-   **Permissions**: You must have View/Edit permissions for Access Management
    
-   **SBAC**: You can only create applications from VCS entities (Organizations, Projects, or Repositories) that are already included in your SBAC Asset Groups
    

1.  Under Modules, select Application Security → Business Applications (under Application Management) → Create Applications → New Criteria.
    
2.  On the General step.
    
    1.  Select Code as the source type.
        
        **Note**
        
        This workflow allows you to unify assets across disparate providers (such as grouping a GitHub repository and a Bitbucket repository into one application) if they share naming conventions
        
    2.  Provide a Criteria name (required) and description.
        
    3.  Click Next.
        
3.  On the Define Criteria step.
    
    Define Grouping logic: Determine how Cortex Cloud constructs the boundaries of your applications. These settings control whether an application is defined as a single repository or a broader organization, and how the system handles assets with identical names across your environment. Connected runtime and deployment assets are automatically linked to these boundaries to provide a complete view of the application lineage
    
    1.  **Group by** (required): Select the VCS entity level that represents a distinct application in your architecture (such as Organization, Project, or Repository).
        
        This setting defines the application perimeter. For example, selecting Repository creates a separate application for every repository found, whereas selecting Organization aggregates all assets within an organization into a single application.
        
    2.  Merge organizations/projects/repositories with identical names (optional): Group entities with identical names within the selected provider.
        
    3.  Unify applications across providers (optional): Group entities with identical names across all selected providers.
        
    4.  Click Next.
        
4.  On the Scope step.
    
    Apply filters to strictly define which VCS entities are processed. Select any combination of provider entities (one or multiple) to refine the application’s scope, for instance, by organization alone or by organization + project + repository for precision. This ensures the scope aligns precisely with the desired segment of your VCS structure.
    
    The scope remains dynamic: newly matching assets join automatically as your environment evolves, while those that stop matching drop out. This maintains an up-to-date inventory tied to the chosen VCS entities.
    
    1.  Select a VCS provider to evaluate.
        
    2.  Configure rules to limit scope. Set specific conditions, such as: Organization Name Contains Production.
        
        Only assets matching these rules will trigger the creation of an application.
        
    3.  Click Next.
        
5.  On the Metadata step.
    
    Configure rules to automatically assign ownership and risk levels to the generated applications.
    
    1.  Business Owner: Assign application ownership by syncing with your VCS provider (such as GitHub or GitLab)
        
    2.  Configure Business Criticality:
        
        1.  Select a default severity level.
            
        2.  **Severity override**: It is recommended to enable **Internet exposure override** to automatically elevate the severity of internet-exposed assets to Critical, ensuring accurate risk prioritization.
            
    3.  Click Done.
        
        Cortex Cloud will begin processing your criteria. Navigate to the Business Applications list to verify that your new applications have been generated and populated with assets.