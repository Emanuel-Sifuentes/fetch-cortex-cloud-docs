---
title: "GitLab Self Managed (On-Prem)"
tocId: "skBlRg96t7FuHG1fSzyOJA"
contentId: "GQV99Ix5IFLOK~iFQTgFvw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/GitLab-Self-Managed-On-Prem"
depth: 2
---

# GitLab Self Managed (On-Prem)
Integrate Cortex Cloud Application Security with your GitLab Self Managed (On-Prem) version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This integration allows you to analyze, prioritize, and resolve detected issues efficiently.

### How to integrate GitLab Self Managed (On-Prem)

**Prerequisite**

-   Authorize the user integrating Cortex Cloud Application Security with your GitLab Self Managed (On-Prem) instances with the following permissions:
    
    -   **Maintainer** permissions. Grants sufficient permissions to configure external integrations, manage repository access, and adjust CI/CD settings
        
    -   **api**: Grants full read and write access to the API, including all groups and projects, as well as permissions to interact with the container registry, the dependency proxy, and the package registry
        
    -   **Administrator repository permissions**: In order to scan pull requests (PRs), the user performing the integration must have administrative privileges for the repositories. This enables Cortex Cloud Application Security to set up subscription webhooks for the selected repositories
        
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

#### Onboarding steps

1.  In the Cortex Cloud tenant.
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for GitLab Self Managed (On-Prem) , hover over it, and click Add or Add Another Instance if an instance has already been onboarded.
        
    3.  Enter your domain in the Configure Domain step of the wizard and click Register.
        
        **Note**
        
        The domain is the hostname associated with your GitLab Self Managed (On-Prem) instance.
        
        You are redirected to your GitLab Self Managed (On-Prem) instance register Cortex AppSec as an application. Additionally, the Register OAUTH App step of the integration wizard is displayed.
        
    4.  Optional: Connect a Transporter: Select your Broker VM and associated Transporter applet from the provided menus.
        
        **Note**
        
        For more information about the Transporter, including setup instructions, refer to Transporter over Broker VM.
        
    5.  Copy the Application Name, Homepage URL and Authorization Callback URL values from their respective fields.
        
2.  On the GitLab Self Managed (On-Prem) console:
    
    1.  Access GitLab Self Managed (On-Prem) → User Settings → Applications.
        
    2.  Paste the values copied in **step 1d** above in their respective fields.
        
    3.  Select api as the application scope and then Save.
        
    4.  Once created, copy and save the generated Application ID and Secret values for the new Cortex AppSec application.
        
3.  On the Cortex Cloud console.
    
    1.  Select Next on the Register OAUTH App step of the wizard.
        
        The Set Client ID and Secret step of the wizard is displayed.
        
    2.  Paste the GitLab Self Managed (On-Prem) Application ID and Secret values copied in _step 2d_ above and click Next.
        
    3.  Under Selection Options of the Select Repositories step of the wizard, choose the repositories to be connected to the instance:
        
        -   Permit all existing repositories
            
        -   Permit all existing and future repositories
            
        -   Select Choose from repository list and select repositories from the list
            
        
    4.  Click Save.
        
    5.  Click Close on the final step of the wizard.
        
        **Note**
        
        Ensure that you receive the Instance Successfully Created message on this step, indicating successful instance creation.
        
4.  Verify integration:
    
    1.  On the Data Sources & Integrations page, search for GitLab Self Managed (On-Prem).
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your instance and verify that the status of your GitLab Self Managed (On-Prem) instance is Connected.
        
5.  View repository assets and mitigate detected issues.
    

### Manage GitLab Self Managed (On-Prem) integrations

To manage GitLab Self Managed (On-Prem) integrations, refer to Manage data source integrations.

### Subscribed events

Below is a comprehensive list of events to which Cortex Cloud Application Security is subscribed. These events encompass various actions and changes occurring within your GitLab Self Managed (On-Prem) environment that trigger notifications and integrations with Cortex Cloud Application Security.

Read more...

| Category | Event | Description |
| --- | --- | --- |
| Projects | — | — |
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
| System | repository_update_events | This event occurs whenever there are updates or changes made to a GitLab repository, including actions such as new commits, branch operations, tag updates, and modifications to repository settings |

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