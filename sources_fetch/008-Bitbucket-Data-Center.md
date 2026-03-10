---
title: "Bitbucket Data Center"
tocId: "kbPDkHMrgBcu18v81AVdug"
contentId: "_rdL6FIdWyjusaSp7RN8ww"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Bitbucket-Data-Center"
depth: 2
---

# Bitbucket Data Center
Integrate Cortex Cloud Application Security with your Bitbucket Data Center version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This integration allows you to analyze, prioritize, and resolve detected issues efficiently.

**Supported versions**: This integration supports Bitbucket Data Center and Data Center Server versions 8 and later.

### How to integrate Bitbucket Data Center

**Prerequisite**

Before you begin:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   In **Bitbucket**, grant the user performing the Cortex application authorization the following permissions:
    
    -   **Administrator** permissions for projects
        
    -   **Administrator** permissions for repositories
        
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

#### Onboarding steps

1.  **On Bitbucket Server**, create and copy a **Personal Access Token** (PAT).
    
    1.  Navigate to Bitbucket Server → Manage account → Account settings → Personal access tokens.
        
    2.  Provide a token name.
        
    3.  Select the Permissions scope.
        
        -   **Projects**: Administrator permissions
            
        -   **Repositories**: Administrator permissions
            
        
        **Note**
        
        -   By default, the permissions of the access token are set according to your current access level. It is essential to define two levels of permissions, Project and Repository permissions. The Repository permissions inherit from Project permissions, requiring Repository permissions to match or exceed Project permissions
            
        -   Providing read and write permissions to the necessary repositories enables Cortex Cloud Application Security to copy files for scanning and access repository settings. This enables automated responses to pull requests, including creating fix PRs and adding comments
            
        
    4.  Select the Expire automatically option.
        
        **Note**
        
        For additional security, it is recommended to set an expiry automatically. The expiry date of a token cannot be changed after it is created. You can see the expiry dates for all your tokens on Profile picture → Manage account → Personal access tokens.
        
    5.  Click Create.
        
    6.  Copy the generated token from the dialog.
        
    
    **Important**
    
    Always refer to the [Bitbucket documentation](https://confluence.atlassian.com/bitbucketserver072/personal-access-tokens-1005335924.html) for information relating to creating a PAT.
    
2.  In the Cortex Cloud tenant.
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search forBitbucket Data Center, hover over it, and click Add, or Add Another Instance if an instance is already onboarded.
        
    3.  Enter your domain in the Configure Domain step of the wizard and click Next.
        
    4.  Optional: Connect a Transporter: Select your Broker VM and associated Transporter applet from the provided menus.
        
        **Note**
        
        For more information about the Transporter, including setup instructions, refer to Transporter over Broker VM.
        
    5.  Click Next.
        
    6.  On the Create a Personal Access Token step of the wizard: Paste the Bitbucket PAT generated in **step 1** above in the provided field, and click Next.
        
    7.  Under Selection Options of the Select Repositories step of the wizard:
        
        -   Choose the repositories to be connected to the instance:
            
            -   Permit all existing repositories
                
            -   Permit all existing and future repositories
                
            -   Select Choose from repository list and select repositories from the list
                
            
        -   Click Save.
            
        
    8.  Click Close on the final step of the wizard.
        
        **Note**
        
        Ensure that you receive the Instance Successfully Created message on this step, indicating successful instance creation.
        
3.  Verify integration:
    
    1.  On the Data Sources & Integrations page, search for Bitbucket Data Center.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your instance and verify that the status is Connected.
        
4.  Next step: View repository assets and mitigate detected issues.
    

### Subscribed events

Below is a comprehensive list of events to which Cortex Cloud Application Security is subscribed. These events encompass various actions and changes occurring within your Bitbucket Data Center environment that trigger notifications and integrations with Cortex Cloud Application Security.

Read more...

-   **pr:merged**: This event occurs when a pull request is successfully merged into the repository
    
-   **pr:updated**: This event happens when the reviewer list for a pull request is updated
    
-   **pr:opened**: This event occurs when a new pull request is opened
    
-   **repo:added**: This event happens when a comment is added to the repository
    
-   **repo:forked**: This event occurs when a repository is forked
    
-   **repo:refs_changed**: This event happens when references in the repository are changed
    
-   **repo:edited**: This event occurs when a comment in the repository is edited
    
-   **pr:decline**d: This event occurs when a pull request is declined
    
-   **pr:deleted**: This event happens when a pull request is deleted
    
-   **pr:deleted**: This event occurs when a comment on a pull request is deleted
    
-   **repo:deleted**: This event happens when a comment in the repository is deleted
    
-   **pr:edited**: This event occurs when a comment on a pull request is edited
    
-   **pr:unapproved**: This event happens when a reviewer unapproves a pull request
    
-   **pr:modified**: This event occurs when a pull request is modified
    
-   **mirror:repo_synchronized**: This event occurs when a mirrored repository is synchronized
    
-   **pr:needs_work**: This event happens when a reviewer marks a pull request as needing work
    
-   **pr:approved**: This event occurs when a reviewer approves a pull request
    
-   **repo:modified**: This event occurs when the repository is modified
    
-   **pr:added**: This event occurs when a comment is added to a pull request
    

### Subscribed events for the CI/CD module

These events are specific to the CI/CD module to which Cortex Cloud is subscribed. They encompass various actions and changes occurring within your CI/CD environment that trigger notifications and integrations with Cortex Cloud.

Read more...

| Event | Description |
| --- | --- |
| Project: proj:modified | This event occurs when a project undergoes modifications, such as changes to its name, description, or configuration settings. |
| Repository: repo:refs_changed | This event occurs when a push operation is performed, typically resulting in changes to the repository’s references. |
| Repository: repo:forked | This event occurs when a repository is forked, creating a separate copy of the repository under a different user or organization. |
| Repository: repomodified | This event occurs when the repository itself undergoes modifications, such as changes to its settings or configuration. |
| Repository: repoadded | This event occurs when a new comment is added to a commit within the repository. |
| Repository: repoedited | This event occurs when an existing comment on a commit is edited within the repository. |
| Repository: repodeleted | This event occurs when a comment on a commit is deleted within the repository. |
| Pull Request: pr:opened | This event occurs when a pull request is opened, indicating the initiation of a request to merge changes into the repository. |
| Pull Request: pr:from_ref_updated | This event occurs when the source branch of a pull request is updated with new changes. |
| Pull Request: pr:to_ref_updated | This event occurs when the target branch of a pull request is updated with new changes. |
| Pull Request: pr:modified | This event occurs when a pull request undergoes modifications, such as changes to its title, description, or metadata. |
| Pull Request: prupdated | This event occurs when the list of reviewers assigned to a pull request is updated. |
| Pull Request: prapproved | This event occurs when a reviewer approves a pull request. |
| Pull Request: prunapproved | This event occurs when a previously approved review on a pull request is revoked. |
| Pull Request: prneeds | This event occurs when a reviewer requests changes to be made to a pull request before it can be approved. |
| Pull Request: pr:merged | This event occurs when a pull request is successfully merged into the repository. |
| Pull Request: pr:declined | This event occurs when a pull request is declined or rejected, typically due to not meeting certain criteria or requirements. |
| Pull Request: pr:deleted | This event occurs when a pull request is deleted, either intentionally by a user or automatically due to certain conditions. |
| Pull Request: pradded | This event occurs when a new comment is added to a pull request. |
| Pull Request: predited | This event occurs when an existing comment on a pull request is edited. |
| Pull Request: prdeleted | This event occurs when a comment on a pull request is deleted. |

### Rotate integration tokens

Rotate integration tokens to enhance security and prevent unauthorized access.

Create a **PUT** request: `PUT /code/api/v1/integration/token/&<integration_id>` with the following body:

```
{
"token": "new token"
}
```

To locate your integration ID:

1.  Under Cortex Cloud Application Security select Settings → Data Sources & Integrations.
    
2.  Hover over Bitbucket Data Center and click View Details.
    
3.  Select the required instance from the list and retrieve the cas_connector_id from the URL.
    

### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

#### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

#### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

## Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

## Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

## Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

## Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

## Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |