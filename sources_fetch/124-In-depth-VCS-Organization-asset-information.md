---
title: "In-depth VCS Organization asset information"
tocId: "cCnMnl4qLDnFRYmkLLaRew"
contentId: "rktr6WT2~OnhWH8KUlJ4uA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/In-depth-VCS-Organization-asset-information"
depth: 3
---

# In-depth VCS Organization asset information
Click an asset in the inventory table to open its side card, providing in-depth information organized into several tabs. The Overview tab (default display) offers highlights and a general summary. Additional contextual tabs provide specific details, including Configurations (displaying an inventory of configurations for all associated VCS organization assets) and Identity (providing a view of users within the VCS Organization).

## VCS Organization asset summary

The VCS Organization asset summary, displayed at the top of the card, provides concise details about the VCS Organization, such as its name and associated VCS.

Overview

The Overview tab summarizes VCS Organization highlights, properties, repositories and members.

**Highlights**:

-   Critical/High issues: An aggregation of critical and high issues associated with the VCS Organization
    
-   Deployed: Indicates whether the VCS Organization has been deployed and is currently active within your cloud environment or infrastructure
    
-   Public Repository: Indicates whether the VCS Organization is a public repository, indicating its visibility to the public
    
-   **Risk summary**: The amount of risks associated with the VCS Organization grouped by category (cases, issues and findings) and their severity level
    
-   **Visibility timeline**: When the collaborator was first and last detected
    

**Properties**:

-   Asset (VCS organization) details, including Asset Id, Asset Category and Asset Groups associated with the VCS Organization
    
-   Provider: the VCS associated with the VCS Organization
    
-   **Organization Owners**: Users with full administrative control over the version control organization, including members, repositories, and settings
    

**Repositories**: A table of repositories associated with the VCS Organization. Enables you to quickly identify specific repositories of interest and gain a comprehensive understanding of the organization's overall repository structure. The table repository properties such as name, scanned branch, visibility, last commit and associated technologies. Selecting a repository opens its asset card directly within VCS Organization assets, allowing quick access to repository details without having to redirect to the dedicated Repository assets page.

**Note**

The Highlights section and other asset properties only display attributes when their corresponding indicators are present. For example, if an asset is not deployed, its deployment-related attributes will not show up; similarly, if there are no detected issues, those highlights or properties will not appear.

Configurations

The Configurations tab displays an inventory of configurations for all associated VCS organization assets, and an inventory of top configurations issues (VCS & CI/CD Risks) related to the organization.

The table includes the following properties:

-   Severity level (icon): Indicates the level of severity of the configuration issue
    
-   Asset Name: The name of the resource in which the misconfiguration was detected
    
-   Assigned To: The person or team responsible for addressing the vulnerability
    
-   Creation Date: The date when the vulnerability was detected
    

Identity

The Identity tab provides a view of users within the VCS Organization, outlining their access levels and the repositories they are collaborators on, along with the timestamp of the latest commit for each repository