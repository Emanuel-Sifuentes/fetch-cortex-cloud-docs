---
title: "GitHub Enterprise (On-Prem)"
tocId: "F1HqKTMLNdcse8YMgQAg6w"
contentId: "tmzUzijWPBjlhNP26Mbf1Q"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/GitHub-Enterprise-On-Prem"
depth: 2
---

# GitHub Enterprise (On-Prem)
Integrate Cortex Cloud Application Security with your GitHub Enterprise (On-Prem) version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This integration allows you to analyze, prioritize, and resolve detected issues efficiently.

### How to integrate GitHub Enterprise (On-Prem)

**Prerequisite**

Before you begin:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   In **GitHub**, you must have Organization Owner permissions to install the Cortex application. Users with only repository-level admin permissions cannot complete the installation unless the organization explicitly allows non-owners to install GitHub Apps (in this instance the Cortex application)
    
-   **Scope**: The Cortex application requires the following authorization scopes:
    
    Read more...
    
    -   **repo**: Grants full access to public and private repositories, including read and write access to code, commit statuses, repository invitations, collaborators, deployment statuses, and the capability to subscribe the repository to receive new webhook notifications or events
        
        **Note**
        
        In addition to repository-related resources, the repository scope also grants access to manage organization-owned resources, including projects, invitations, team memberships, and webhooks. This scope also grants the ability to manage projects owned by users
        
    -   **read:user**: Grants access to read a user’s profile data
        
    -   **read:repo_hook**: Grants read and ping access to hooks in public or private repositories
        
    -   **read:org**: Provides read-only access to organization membership, organization projects, and team membership
        
    -   **read:public_key:** Allows listing and viewing details for public keys
        
    -   **workflow**: Provides the ability to add and update GitHub Actions workflow files. Workflow files can be committed without this scope if the same file (with both the same path and contents) exists on another branch in the same repository. Workflow files can expose GITHUB_TOKEN, which may have a different set of scopes. For more information, refer to the [GitHub Actions Automatic token authentication](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token) token authentication documentation
        
    -   **admin:org_hook**: Grants read, write, ping, and delete access to organization hooks. Note: OAuth tokens will only be able to perform these actions on organization hooks created by the OAuth app. Personal access tokens will only be able to perform these actions on organization hooks created by a user
        
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    
-   To enable access from your environment to your Cortex Cloud tenant, add the applicable Cortex IP addresses to your allow list. This ensures that your network can receive inbound connections from Cortex Cloud when required.
    
    **Egress proxy IPs**
    
    Add the egress proxy IP addresses for your specific region to your allow list as follows.
    
    Read more...
    
    -   **AU (Australia)**
        
        -   34.151.83.236
            
        -   34.116.67.90
            
        
    -   **BR (Brazil)**
        
        -   34.151.223.178
            
        -   34.39.232.219
            
        
    -   **CA (Canada)**
        
        -   35.203.108.13
            
        -   35.203.101.16
            
        
    -   **CH (Switzerland)**
        
        -   34.65.108.153
            
        -   34.65.155.169
            
        
    -   **DE (Germany)**
        
        -   35.234.118.195
            
        -   34.89.183.45
            
        
    -   **EU (Europe)**
        
        -   34.147.107.51
            
        -   34.91.26.125
            
        
    -   **IN (India)**
        
        -   35.200.175.78
            
        -   34.93.9.198
            
        
    -   **ID (Indonesia)**
        
        -   34.128.126.138
            
        -   34.128.82.158
            
        
    
    -   **DL (Delhi)**
        
        -   34.131.41.243
            
        -   34.131.45.169
            
        
    -   **FA (France)**
        
        -   34.155.5.117
            
        -   34.155.41.247
            
        
    -   **IL (Israel)**
        
        -   34.165.33.165
            
        -   34.165.27.131
            
        
    -   **IT (Italy)**
        
        -   34.154.23.156
            
        -   34.154.186.12
            
        
    -   **JP (Japan)**
        
        -   35.200.3.131
            
        -   34.146.181.233
            
        
    -   **PL (Poland)**
        
        -   34.118.48.171
            
        -   34.116.202.235
            
        
    -   **PR (Puerto Rico)**
        
        -   35.224.117.2
            
        -   34.173.28.243
            
        
    -   **QT (Qatar)**
        
        -   34.18.34.118
            
        -   34.18.39.155
            
        
    
    -   **SA (Saudi Arabia)**
        
        -   34.166.61.81
            
        -   34.166.58.213
            
        
    -   **SG (Singapore)**
        
        -   35.240.243.57
            
        -   34.126.183.208
            
        
    -   **ZA (South Africa)**
        
        -   34.35.42.196
            
        -   34.35.79.219
            
        
    -   **KR (South Korea)**
        
        -   34.64.93.168
            
        -   34.64.237.45
            
        
    -   **ES (Spain)**
        
        -   34.175.46.46
            
        -   34.175.80.182
            
        
    -   **TW (Taiwan)**
        
        -   34.80.133.68
            
        -   35.234.18.10
            
        
    -   **UK (United Kingdom)**
        
        -   35.242.180.163
            
        -   34.105.173.229
            
        
    -   **US (United States)**
        
        -   34.132.108.184
            
        -   34.69.63.16
            
        
    

#### Onboarding steps

1.  In the Cortex Cloud tenant.
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for GitHub Enterprise (On-Prem), hover over it, and click Add, or Add Another Instance if an instance is already onboarded.
        
        Select Add Another Instance if the data source instance has already been configured.
        
    3.  Enter your domain in the Configure Domain step of the wizard.
        
        **Note**
        
        The domain is the hostname associated with your GitHub Enterprise (On-Prem) instance.
        
    4.  Optional: Connect a Transporter: Select your Broker VM and associated Transporter applet from the provided menus.
        
        **Note**
        
        For more information about the Transporter, including setup instructions, refer to Transporter over Broker VM.
        
    5.  Click Register.
        
        You are redirected to your GitHub Enterprise (On-Prem) instance to register Cortex AppSec as an OAuth application. Additionally, the Register OAUTH App step of the integration wizard is displayed.
        
    6.  Copy the Application Name, Homepage URL and Authorization Callback URL values from their respective fields.
        
2.  On the Register a new OAuth application screen of the GitHub Enterprise (On-Prem) console:
    
    1.  Paste the values copied in **step 1d** above in their respective fields.
        
    2.  Click Register application.
        
    3.  Once created, copy and save the the Client ID and Client Secret values for the new Cortex AppSec application.
        
        Click Authorize to complete the setup.
        
3.  On the Cortex Cloud console.
    
    1.  Select Next on the the Register OAUTH App step of the integration wizard.
        
        The Set Client ID and Secret step of the wizard is displayed.
        
    2.  Paste the Client ID and Client Secret values copied in _step 2c_ above, and click Authorize.
        
    3.  Under Selection Options of the Select Repositories step of the wizard, choose the repositories to be connected to the instance:
        
        -   Permit all existing repositories
            
        -   Permit all existing and future repositories
            
        -   Choose from repository list and select repositories from the list
            
        
    4.  Click Save.
        
    5.  Click Close on the final step of the wizard.
        
        **Note**
        
        Ensure that you receive the Instance Successfully Created message on this step, indicating successful instance creation.
        
4.  Verify integration:
    
    1.  On the Data Sources & Integrations page, search for GitHub Enterprise (On-Prem).
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your instance and verify that the status of your GitHub Enterprise (On-Prem) instance is Connected.
        
5.  View repository assets and mitigate detected issues.
    

#### Subscribed events

The following list describes events that Cortex Cloud Application Security monitors on your GitHub Enterprise (On-Prem), covering actions and changes that trigger notifications and integrations.

-   **Repository** events: All events related to repositories
    
-   **Organization** events: Includes \['`organization`', `'membership`', '`team`'\] events
    

#### Manage data source integrations

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