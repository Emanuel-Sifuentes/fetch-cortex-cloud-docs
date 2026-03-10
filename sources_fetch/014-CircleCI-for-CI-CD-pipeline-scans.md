---
title: "CircleCI for CI/CD pipeline scans"
tocId: "S7i8auG1Zi4YvWAliMpo_Q"
contentId: "Ck_M98ioz1nJw3th4L~b4g"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/CircleCI-for-CI/CD-pipeline-scans"
depth: 2
---

# CircleCI for CI/CD pipeline scans
Integrate Cortex Cloud Application Security CI/CD Security with your CircleCI system to enable automated and continuous scanning of your CI/CD pipelines. This integration provides proactive security checks, triggered by pipeline events or configuration changes, ensuring security issues are detected and remediated throughout the entire deployment lifecycle.

Pipeline scans are executed using the Cortex CLI, and include automated actions based on scan results to enforce security policies and prevent vulnerable deployments.

**Note**

-   This integration utilizes a Personal Access Token (PAT) for authentication
    
-   CircleCI onboarding offers both code and CI/CD scanning. A single integrated instance supports either code or CI scanning, but not both. If you require both code and CI scanning for your CircleCi environment, you must create two separate integrations, selecting the appropriate scanning type for each. To onboard CircleCI for code scans, refer to CircleCI for code scans
    

**Prerequisite**

Before you begin:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   **CircleCI user requirements**:
    
    -   **Permissions**: To enable Cortex Cloud visibility for all CircleCI projects, a version control system (VCS) user with integration permissions must be authorized (For example, Organization Owner permissions are required to onboard GitHub SaaS, while in GitLab SaaS you must be a Maintainer). This is because CircleCI's user base integrates with the VCS, inheriting its user permissions. For example, if a GitHub user has access to specific organizations and repositories, these entities are visible and available in CircleCI
        
    -   Best practice: Create a dedicated VCS user to integrate CircleCI with Cortex Cloud, to prevent the integration breaking if the user leaves the organization
        
    -   Ensure that the dedicated user follows all the organization’s projects in CircleCI
        
    -   Create a personal API token in CircleCI (see step 1 below). This is required to allow reading the configurations from CircleCI for all projects the user has access to
        
    

### Onboarding steps

1.  Generate a personal API token on CircleCI.
    
    1.  Login to your CircleCI instance with your VCS user credentials.
        
    2.  Create and save a personal API token. For more information about CircleCI tokens, refer to [https://circleci.com/docs/managing-api-tokens/#creating-a-personal-api-token](https://circleci.com/docs/managing-api-tokens/#creating-a-personal-api-token).
        
2.  On the Cortex Cloud console:
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for and hover over CircleCI and click Add, or Add Another Instance if an instance is already onboarded.
        
    3.  On the Select Integration step of the integration wizard, select CI/CD System Scan → Next.
        
    4.  On the Enable CI/CD system scanning step of the integration wizard:
        
        1.  Enter an instance name: This can be any name you choose; it serves as an alias for your integration.
            
        2.  Paste the CircleCI personal API token that you generated in step 1 above → Done.
            
    5.  Verify that the Instance Successfully Created message is displayed in the last step of the wizard and click Close.
        
3.  Verify integration and confirm that the your integrated CircleCI instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, locate CircleCI.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your CircleCI instance and verify that the status is Connected and that Pipeline Risks is the instance type.
        
4.  Next step: View scan results and mitigate issues.
    

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