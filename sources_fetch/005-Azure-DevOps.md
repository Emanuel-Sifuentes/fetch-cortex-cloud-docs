---
title: "Azure DevOps"
tocId: "EDUzXnmFrt9qkWL5xGZXxg"
contentId: "JTVxgb3Xh~5G9LFmSby1tg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Azure-DevOps"
depth: 2
---

# Azure DevOps
Integrate Cortex Cloud Application Security with your Azure DevOps version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This integration allows you to analyze, prioritize, and resolve detected issues efficiently.

System architecture overview: Cortex utilizes a secure Delegated Access Model, executing operations under the user's identity rather than an autonomous service account. This architecture supports multi-tenant configurations, allowing you to onboard organizations across distinct Microsoft Entra ID tenants using a single email identity. For more information, refer to Azure DevOps onboarding system architecture.

Before you begin:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   **Azure DevOps** permissions: Ensure the user performing the integration holds one of the following roles in Azure DevOps:
    
    -   Project Administrator: This permission is required to subscribe to webhooks. For more information, refer to the [Microsoft Integrate with service](https://learn.microsoft.com/en-us/azure/devops/service-hooks/overview?view=azure-devops#q-what-permissions-do-i-need-to-set-up-a-subscription) hook documentation
        
    -   Member of Project Collection Administrators: Required to subscribe to `build.complete` events and download the permissions report for CI/CD scans. As Organization owners are automatically part of this group, they also possess this permission
        
    
-   **Scope**: The Cortex application requires the following authorization scopes. These scopes are granted automatically when authorizing via Microsoft Entra ID. If you authenticate using a Personal Access Token (PAT), you must manually select these scopes during token creation
    
    **Note**
    
    These required Cortex application permissions are displayed by Microsoft during authorization. Each permission includes a scope description, available from the dropdown next to it.
    
    | Scope | Description |
    | --- | --- |
    | `User.Read` | Sign in and read user profile |
    | `vso.agentpools` | Agent Pools (read) |
    | `vso.analytics` | Analytics (read) |
    | `vso.auditlog` | Audit Read Log |
    | `vso.build` | Build (read) |
    | `vso.code_write` | Code (read and write) |
    | `vso.entitlements` | Entitlements (Read) |
    | `vso.extension` | Extensions (read) |
    | `vso.graph` | Graph (read) |
    | `vso.identity` | Identity (read) |
    | `vso.memberentitlementmanage` | MemberEntitlement Management (read) |
    | `vso.packaging` | Packaging (read) |
    | `vso.project` | Project and team (read) |
    | `vso.release` | Release (read) |
    | `vso.serviceendpoint` | Service Endpoints (read) |
    | `vso.taskgroups_write` | Task Groups (read, create) |
    | `vso.tokens` | Delegated Authorization Tokens |
    | `vso.variablegroups_read` | Variable Groups (read) |
    | `vso.work_write` | Work items (read and write) |
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

### Onboarding steps

**Step 1: Initiate in Cortex**

1.  In the Cortex Cloud tenant, navigate to Settings → Data Sources & Integrations → \+ Add New.
    
2.  Search for Azure DevOps, hover over it and click Add (or Add Another Instance if one already exists).
    

**Step 2: Select authentication method**

Select the method that aligns with your organization's security policy. Microsoft Entra ID is the recommended standard for long-term support.

**Option A: Authorize with Microsoft Entra ID (recommended)**

This method supports multi-tenant configurations.

1.  Select Microsoft Entra ID authentication → Authorize.
    
    **Important**
    
    When redirected to the Microsoft login screen, do not immediately enter your email.
    
2.  Select Sign-in options → Sign in to an organization.
    
3.  Enter the specific Domain Name of the tenant you wish to onboard and click Next.
    
    **Note**
    
    This forces Azure to bypass browser cookies and issue a token for the correct directory.
    
4.  Enter your Email address, review the requested scopes, and click Accept on the permissions prompt.
    

**Option B: Authorize with a Personal Access Token (PAT)**

1.  In Azure DevOps: Navigate to User Settings → Personal access tokens → \+ New Token.
    
2.  **Organization**: Select All accessible organizations.
    
3.  **Scopes**: Manually select all custom-defined scopes listed in the **Prerequisites** above.
    
4.  Copy and paste the generated token into the Access Token field in the Cortex onboarding wizard and click Authorize.
    

**Note**

PATs are static. To onboard a different tenant, you must log in to that specific environment to generate a new token.

**Step 3: Configure repositories**

1.  Once authorized, you are redirected to the Select Repositories step.
    
2.  Select which repositories to scan from the Selection Options menu:
    
    -   Permit all existing repositories
        
    -   Permit all existing and future repositories (recommended)
        
    -   Choose from repository list
        
    
3.  Click Save.
    
4.  **Verification**:
    
    1.  On the Data Sources & Integrations page, search for Azure DevOps.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your instance and verify that the status of the instance is Connected.
        

### Post-onboarding: subscribed events

Once successfully integrated, Cortex Cloud subscribes to the following events to trigger scans and notifications:

| Category | Event | Description |
| --- | --- | --- |
| Repositories | — | — |
| — | `git.pullrequest.created` | This event is triggered when a new pull request is created in a Git repository. It allows systems to be notified whenever a new pull request is initiated, enabling integration with other services or actions |
| — | `git.pullrequest.updated` | This event is triggered when an existing pull request is updated with new changes, comments, or other modifications. It allows systems to stay synchronized with the latest changes in pull requests |
| — | `git.push` | This event is triggered when new commits are pushed to a Git repository. It enables systems to track changes to the repository and perform actions such as triggering builds or running tests |
| — | `git.pullrequest.merged` | This event is triggered when a pull request is successfully merged into the target branch. It allows systems to take action after a pull request has been merged, such as deploying changes or updating related tasks |
| Organizations | — | — |
| — | `build.complete` | This event is triggered when a build process is completed within an Azure DevOps organization. It allows systems to react to the completion of build tasks, such as notifying stakeholders or triggering subsequent stages in a deployment pipeline |

**Validation**: You can validate the subscription by triggering an action in Azure DevOps and checking for a scan initiation. For example, to verify `git.push`: Push a commit to a connected repository. This should trigger a scan for secrets and IaC misconfigurations.

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