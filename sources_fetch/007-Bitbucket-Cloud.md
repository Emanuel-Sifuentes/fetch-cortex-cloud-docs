---
title: "Bitbucket Cloud"
tocId: "7QXEngW4nN5keNii1_huTQ"
contentId: "so~U9oEzOw5ECKCeaLaMAg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Bitbucket-Cloud"
depth: 2
---

# Bitbucket Cloud

Integrate Bitbucket Cloud to scan for secrets, IaC misconfigurations, vulnerabilities, and license compliance to strengthen your VCS security posture.

Integrate Cortex Cloud Application Security with your Bitbucket Cloud version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This integration allows you to analyze, prioritize, and resolve detected issues efficiently.

### How to integrate Bitbucket Cloud

**Prerequisite**

Before you begin:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   In **Bitbucket**, grant the user performing the Cortex application authorization the following permissions. The level of access required depends on the modules you intend to use:
    
    -   For **code scanning**: The user must have `Write` access:
        
        -   **Workspace group with default repository access**: Add the user to a workspace group whose default repository access is set to `Write`
            
        -   **Repository permissions**: Ensure the user has `Write` permissions on each repository that the Cortex application needs to access: Go to Bitbucket > Repository Settings and grant the user write access to the relevant repositories
            
        
    -   **For CI/CD security module**: The user requires **Administrator** permissions for both **Projects** and **Repositories**
        
        **Note**
        
        If you intend to use CI/CD security, you must grant Administrator access now to prevent integration errors later.
        
    
    For more information on Bitbucket Cloud permissions refer to the [Bitbucket Authentication](https://developer.atlassian.com/cloud/bitbucket/rest/intro/?branch=code-editor-not-limitation#authentication) methods documentation.
    
-   **Scope**: The Cortex application requires the following authorization scopes:
    
    Read more...
    
    -   **project**: Provides access to view the project or projects. This scope implies the repository scope, giving read access to all the repositories in a project or projects
        
    -   **repository**: Provides read access to a repository or repositories. Note that this scope does not give access to a repository’s pull requests. Includes 'access to the repo’s source code', 'clone over HTTPS', 'access the file browsing API', 'download zip archives of the repo’s contents', 'the ability to view and use the issue tracker on any repo (created issues, comment, vote, etc)', 'the ability to view and use the wiki on any repo (create/edit pages)'
        
    -   **repository:write**: Provides write (not admin) access to a repository or repositories. No distinction is made between public and private repositories. This scope implicitly grants the **repository** scope, which does not need to be requested separately. This scope alone does not give access to the pull requests API. Includes 'push access over HTTPS' and 'fork repos'
        
    -   **pullrequest**: Provides read access to pull requests. This scope implies the repository scope, giving read access to the pull request’s destination repository. Includes 'see and list pull requests', 'create and resolve tasks' and 'comment on pull requests'
        
    -   **pullrequest:write**: Implicitly grants the **pullrequest** scope and adds the ability to create, merge and decline pull requests. This scope also implicitly grants the **repository:write** scope, giving write access to the pull request’s destination repository. This is necessary to allow merging. Includes 'merge pull requests', 'decline pull requests', 'create pull requests' and 'approve pull requests'
        
    -   **issue**: The ability to interact with issue trackers the way non-repo members can. This scope doesn’t implicitly grant any other scopes and doesn’t give implicit access to the repository. Includes 'view, list and search issues', 'create new issues', 'comment on issues', 'watch issues' and 'vote for issues'
        
    -   **issue:write**: This scope implicitly grants the issue scope and adds the ability to transition and delete issues. This scope doesn’t implicitly grant any other scopes and doesn’t give implicit access to the repository. Includes 'transition issues' and 'delete issues'
        
    -   **webhook**: Gives access to webhooks. This scope is required for any webhook-related operation.
        
        This scope gives read access to existing webhook subscriptions on all resources the authorization mechanism can access, without needing further scopes. For example, a client can list all existing webhook subscriptions on a repository. The repository scope is not required. Existing webhook subscriptions for the issue tracker on a repo can be retrieved without the issue scope. All that is required is the webhook scope.
        
        To create webhooks, the client will need read access to the resource. For example, for issue:created, the client will need to have both the webhook and the issue scope. Includes 'list webhook subscriptions on any accessible repository, user, team, or snippet' and 'create/update/delete webhook subscriptions'
        
    -   **snippet**: Provides read access to snippets. No distinction is made between public and private snippets (public snippets are accessible without any form of authentication). Includes 'view any snippet' and 'create snippet comments'
        
    -   **email**: Ability to see the user’s primary email address. This should make it easier to use Bitbucket Cloud as a login provider for apps or external applications
        
    -   **account**: When used for:
        
        -   **user-related API**s: Gives read-only access to the user’s account information. Note that this doesn’t include any ability to change any of the data. This scope allows you to view the user’s: email addresses, language, location, website, full name, SSH keys, user groups
            
        -   **workspace-related API**s: Grants access to view the workspace’s: users, user permissions, projects
            
        
    -   **pipeline**: Gives read-only access to pipelines, steps, deployment environments and variables
        
    -   **pipeline:write**: Gives write access to pipelines. This scope allows a user to: stop pipelines, rerun failed pipelines, resume halted pipelines and trigger manual pipelines
        
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

#### Onboarding steps

1.  In the Cortex Cloud tenant.
    
    1.  Select Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for Bitbucket Cloud, hover over it, and click Add, or Add Another Instance if an instance is already onboarded.
        
    3.  Click Authorize on the Configure account step of the Bitbucket Cloud onboarding wizard.
        
        You are redirected to Bitbucket Cloud to authorize Cortex Cloud Application Security access.
        
2.  Authorize Cortex Cloud Application Security on Bitbucket Cloud: Review the requested permissions and then select Grant access.
    
    You are redirected to the Select Repositories step of the integration wizard.
    
3.  Choose the repositories to be connected to the instance:
    
    -   Permit all existing repositories
        
    -   Permit all existing and future repositories
        
    -   Select Choose from repository list and select repositories from the list
        
    
4.  Select Save to confirm the repository selection and then Close on the final step of the wizard.
    
    **Note**
    
    Ensure that you receive the Instance Successfully Created message on this step, indicating successful instance creation.
    
5.  Verify integration:
    
    1.  On Data Sources & Integrations, search for Bitbucket Cloud.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your instance and verify that the status is Connected.
        
6.  Next step: View repository assets and mitigate detected issues.
    

### Subscribed events

Below is a comprehensive list of events to which Cortex Cloud Application Security is subscribed (excluding events for the CI/CD module - see below). These events encompass various actions and changes occurring within your Bitbucket Cloud environment that trigger notifications and integrations with Cortex Cloud Application Security.

Read more...

-   **repo:push**: This event is triggered whenever a push operation occurs within a repository, indicating that new commits have been added or existing commits have been updated
    
-   **repo:fork**: This event occurs when a repository is forked, creating a copy of the original repository within the same or a different workspace
    
-   **repo:updated**: This event is triggered when there are updates or changes made to the repository settings or configuration
    
-   **repo:commit_comment_created**: This event occurs when a new comment is created on a commit within the repository
    
-   **repo:commit_status_created**: This event is triggered when a new status or check is created for a commit within the repository
    
-   **repo:commit_status_updated**: This event occurs when the status or check of a commit within the repository is updated
    
-   **issue:created**: This event is triggered when a new issue is created within the repository
    
-   **issue:comment_created**: This event occurs when a new comment is added to an existing issue within the repository
    
-   **issue:updated**: This event is triggered when an existing issue within the repository is updated or modified
    
-   **pullrequest:created**: This event occurs when a new pull request is created within the repository
    
-   **pullrequest:updated**: This event is triggered when an existing pull request within the repository is updated or modified
    
-   **pullrequest:fulfilled**: This event occurs when a pull request is fulfilled or merged into the target branch
    
-   **pullrequest:rejected**: This event is triggered when a pull request is rejected or closed without being merged
    

**Troubleshooting Instance Path Errors**

If your VCS instance shows an error with the message **Path was not approved in the egress**, you must ensure that your VCS organization's path is approved in the Cortex Gateway. For more information, refer to [Egress Configurations](https://docs-cortex.paloaltonetworks.com/r/Cortex/Cortex-Gateway-Administrator-Guide/Egress-configurations).

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