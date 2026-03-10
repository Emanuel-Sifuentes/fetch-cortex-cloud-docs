---
title: "In-depth Collaborator asset information"
tocId: "y1BDSDeRuoidz34d_RYd6Q"
contentId: "5_4cu0L9ykbYh8Hp8hzRMA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/In-depth-Collaborator-asset-information"
depth: 3
---

# In-depth Collaborator asset information
Click an asset in the inventory table to open its side card, providing in-depth information organized into several tabs.

## Collaborator asset summary

The Collaborator asset summary, displayed at the top of the card, provides concise details about the collaborator, such as their name and the version control system that the collaborator is associated with.

Overview

The Overview tab summarizes the collaborator highlights and properties.

**Highlights** include:

-   Critical/High issues: An aggregation of critical and high issues associated with the collaborator
    
-   New: Whether the collaborator was recently added to the VCS organization
    
-   Inactive: Indicates whether the collaborator has had no commits within the last time period
    

**Properties** include:

-   **Risk Summary**: The amount of risks associated with the collaborator grouped by category (cases, issues and findings) and their severity level
    
-   Asset details, including Asset Id, Asset Types and Asset Groups associated with the collaborator
    
-   **Visibility timeline**: When the collaborator was first and last detected
    
-   **Identity and Affiliation**:
    
    -   Username: the alias associated with the collaborator
        
    -   User Type: The classification of the collaborator's account (such as individual user, service account, bot), indicating the nature of their access and activity
        
    -   VCS Organization: The specific version control system organization to which the collaborator belongs or has access
        
    -   Emails: "The email addresses associated with the collaborator's account, used for communication and notifications
        
    
-   **Access and Activity**:
    
    -   Team Membership: The teams or groups within the VCS Organization to which the collaborator belongs, defining their access permissions and collaborative roles
        
    -   Last Commit: The timestamp of the collaborator's most recent commit to a repository within the associated VCS Organization, indicating their recent activity
        
    

The Highlights section and other asset properties only display attributes when their corresponding indicators are present. For example, if an asset is not deployed, its deployment-related attributes will not show up; similarly, if there are no detected issues, those highlights or properties will not appear.

Access

The Access tab provides a list of assets that a VCS Collaborator has access to within your environment. It details the specific assets they can interact with, the level of permission granted, and the timestamp of their most recent code commit to that asset.