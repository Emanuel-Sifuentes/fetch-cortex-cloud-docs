---
title: "GitHub Cloud"
tocId: "rUa85TFt7JNbWrW4qhG9jA"
contentId: "36y4blilQQD4ae5ZmkXniw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/GitHub-Cloud"
depth: 2
---

# GitHub Cloud
Integrate Cortex Cloud Application Security with your GitHub SaaS version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This integration allows you to analyze, prioritize, and resolve detected issues efficiently.

### How to integrate GitHub SaaS

**Prerequisite**

Before you begin:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   In GitHub, grant the user performing the Cortex application authorization the following permissions:
    
    -   **Organization Owner**: Only an Organization Owner can directly authorize and install the application
        
    
-   **Scope**: The Cortex application requires the following authorization scopes:
    
    -   **Read** access to Dependabot alerts, actions, actions variables, administration, deployments, discussions, metadata, packages, repository hooks, secret scanning alerts, secrets, and security events
        
    -   **Read and write** access to checks, code, commit statuses, issues, and pull requests
        
        **Note**
        
        In contrast to GitLab SaaS , GitLab Self Managed (On-Prem) and Azure Repos, there is no individual record of each token used for authentication on the integrations page. However, Cortex Cloud Application Security retains and uses these tokens for necessary actions. Removing an integration will delete all associated tokens.
        
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

#### Onboarding steps

1.  On the Cortex Cloud tenant.
    
    1.  Select Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for GitHub (SaaS), hover over it and click Add, or Add Another Instance if an instance is already onboarded.
        
    3.  Click Authorize on the Configure account step of the GitHub SaaS onboarding wizard.
        
        You are redirected to your GitHub SaaS account in order to install and authorize Cortex AppSec), the GitHub App application handling the Cortex Cloud Application Security functionality.
        
2.  Install and authorize Cortex AppSec on GitHub SaaS.
    
    1.  Select your organization on which will be installed.
        
    2.  Select the repositories to be authorized.
        
    3.  Review the permissions granted the application.
        
    4.  Click Install & Authorize.
        
        You are redirected to the Select Repositories step of the GitHub SaaS installation wizard on the console.
        
        Refer to the [GitHub documentation](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party) for more on authorizing and installing GitHub SaaS Apps.
        
3.  On the Cortex XSIAM console.
    
    1.  Under Selection Options, choose the repositories to be connected to the instance:
        
        -   Permit all existing repositories
            
        -   Permit all existing and future repositories
            
        -   Select Choose from repository list and select repositories from the list
            
        
    2.  Click **Save**.
        
4.  Verify integration: On Data Sources, select Code Providers → GitHub SaaS → View more and confirm that the status of your integrated GitHub instance is 'Connected'.
    
5.  Verify integration and confirm that the your integrated GitHub SaaS instance has a status of Connected.
    
    1.  On Data Sources & Integrations, search for GitHub SaaS.
        
    2.  Hover over and select the resulting entry.
        
    3.  Verify that the status of your GitHub SaaS instance is Connected.
        
6.  View repository assets and mitigate detected issues.
    

#### Subscribed events

Below is a comprehensive list of events to which Cortex Cloud Application Security is subscribed. These events encompass various actions and changes occurring within your GitHub SaaS environment that trigger notifications and integrations with Cortex Cloud Application Security.

Read more...

| Event | Description |
| --- | --- |
| Create | Indicates the creation of a branch or tag |
| Commit comment | Refers to comments made on a commit or a 'diff' comment, which compares changes within a commit |
| Issues | Includes a wide range of actions such as opening, editing, deleting, transferring, pinning, unpinning, closing, reopening, assigning, unassigning, labeling, unlabeling, milestone management (milestoned, demilestoned), and locking or unlocking an issue |
| Public | Denotes changes made to a repository from private to public |
| Pull request | Represents actions related to pull requests, including assignment, enabling or disabling auto merge, closing, conversion to draft, demilestoning, dequeuing, editing, enqueuing, labeling, locking, milestone assignment, opening, readiness for review, reopening, removal of review requests, request for review, synchronization, unassignment, unlabeling, and unlocking |
| Pull request review comment | Indicates the creation, editing, or deletion of a comment on a pull request’s diff |
| Push | Refers to a Git push operation performed on a repository |
| Repository | Includes actions such as creation, deletion, archiving, unarchiving, publicizing, privatizing, editing, renaming, or transferring of a repository |

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