---
title: "GitLab SaaS"
tocId: "vmZTuJ42_Gj~AC~76Qzs~A"
contentId: "yorgEQ562~zSGuYakTdoxw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/GitLab-SaaS"
depth: 2
---

# GitLab SaaS
Integrate Cortex Cloud Application Security with your GitLab SaaS version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This integration allows you to analyze, prioritize, and resolve detected issues efficiently.

### How to integrate GitLab SaaS

**Prerequisite**

Before you begin:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   In Gitlab, the following permissions are required to integrate the application:
    
    -   **Maintainer** (Project-level). Grants sufficient permissions to configure external integrations, manage repository access, and adjust CI/CD settings
        
    -   **Administrator** (Repository-level): Required to scan pull requests (PRs). This enables Cortex Cloud to set up subscription webhooks for the selected repositories
        
    
-   **Scope**: The Cortex application requires the following authorization scope:
    
    -   **api**: Grants full read and write access to the API, including all groups and projects, as well as permissions to interact with the container registry, the dependency proxy, and the package registry
        
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

#### Onboarding steps

1.  In the Cortex Cloud tenant.
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for GitLab (SaaS) , hover over it and click Add, or Add Another Instance if an instance is already onboarded.
        
    3.  Click Authorize on the Configure account step of the GitLab SaaS onboarding wizard.
        
        You are redirected to your GitLab SaaS account in order to install and authorize Cortex AppSec, the GitLab App application handling the Cortex Cloud Application Security functionality.
        
2.  On GitLab SaaS: Review the requested permissions and click Authorize Cortex AppSec.
    
    You are redirected to the Select Repositories step of the installation wizard on the console.
    
3.  On the Cortex Cloud console.
    
    1.  Under Selection Options, choose the repositories to be connected to the instance:
        
        -   Permit all existing repositories
            
        -   Permit all existing and future repositories
            
        -   Choose from repository list → select repositories from the list
            
        
    2.  Click Save.
        
        **Note**
        
        A repository can only be integrated with a single instance. The first instance that connects with the repository will be the one that the repository is assigned to. This means that if multiple integrations attempt to connect to the same repository, only the first integration to establish the connection will be associated with that repository.
        
4.  Verify integration and confirm that the your integrated GitLab SaaS instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, search for GitLab SaaS in the search bar.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your instance and verify that the status of your GitLab SaaS instance is Connected.
        
5.  View repository assets and mitigate detected issues.
    

### Subscribed events

Below is a comprehensive list of events to which Cortex Cloud Application Security is subscribed. These events encompass various actions and changes occurring within your GitLab SaaS environment that trigger notifications and integrations with Cortex Cloud Application Security:

Read more...

| Category | Event | Description |
| :-- | :-- | :-- |
| Projects | c | — |
| — | merge_requests_events | This event is triggered when merge or pull requests are created, updated, merged, closed, or have changes made to them |
| — | push_events | This event occurs whenever code changes are pushed to a repository, indicating new commits being added to the version control history |
| — | tag_push_events | This event is triggered when new tags are pushed to a repository |
| — | note_events | This event is generated when comments or notes are added to various objects within GitLab, such as issues, merge requests, or commits |
| — | confidential_note_events | Similar to note_events, but specifically for confidential comments or notes that are restricted to certain users or groups |
| — | issues_events | This event is triggered when issues are created, updated, closed, or have changes made to them |
| — | confidential_issues_events | Similar to issues_events, but specifically for confidential issues that are restricted to certain users or groups |
| — | job_events | This event occurs when jobs defined in CI/CD pipelines are created, updated, started, finished, or have changes made to them |
| — | pipeline_events | This event is generated when pipelines are created, updated, started, finished, or have changes made to them |
| — | wiki_page_events | This event occurs when changes are made to wiki pages within GitLab, including creation, updates, and deletions |
| — | deployment_events | This event is triggered when deployments are created, updated, started, finished, or have changes made to them |
| — | releases_events | This event occurs when releases are created, updated, published, or have changes made to them |
| Groups | — | — |
| — | subgroup_events | This event is specific to GitLab groups and occurs when changes are made to subgroups within a group hierarchy |

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