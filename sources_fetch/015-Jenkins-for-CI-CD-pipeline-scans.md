---
title: "Jenkins for CI/CD pipeline scans"
tocId: "NKI5Z5M1ZkAKV_t12hx0wA"
contentId: "E0LkY2l8JHTOppIY0YEfqg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Jenkins-for-CI/CD-pipeline-scans"
depth: 2
---

# Jenkins for CI/CD pipeline scans
Integrate Cortex Cloud Application Security CI/CD Security with your Jenkins servers to enable automated and continuous scanning of your CI/CD pipelines. This integration provides proactive security checks, triggered by pipeline events or configuration changes, ensuring security issues are detected and remediated throughout the entire deployment lifecycle.

Pipeline scans are executed using the Cortex CLI, and include automated actions based on scan results to enforce security policies and prevent vulnerable deployments.

**Note**

Jenkins onboarding offers both code and CI/CD scanning. A single integrated instance supports either code or CI scanning, but not both. If you require both code and CI scanning for your Jenkins servers, you must create two separate integrations, selecting the appropriate scanning type for each. To onboard Jenkins for code scans, refer to Jenkins for code scans.

**Danger**

Prerequisite

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   In **Jenkins**:
    
    -   To install and configure the Cortex plugin in Jenkins, you must be a Jenkins Administrator with **Overall/Administer** permissions
        
    -   Ensure the build server allows outbound HTTPS (`Port 443` traffic to the Cortex API URL
        
    

### Onboarding steps

1.  On the Cortex Cloud console:
    
    1.  Select Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for and hover over Jenkins and click Add, or Add Another Instance if an instance is already onboarded.
        
2.  On the Select Integration step of the wizard, select CI/CD System Scan → Next.
    
3.  On the Create Instance step of the integration wizard: Provide a Jenkins plugin connector name → Next.
    
4.  On the Plugin installation step of the wizard:
    
    1.  Click Download to download the Cortex Cloud Application Security Jenkins `Cortex.Cloud.hpi` plugin file.
        
    2.  Copy and save the generated **JWT** token.
        
    3.  Click Done.
        
        **Note**
        
        The integration is added on the console but integration is pending, and will only be completed after completing step 5 below. You can view the pending integration on the Jenkins Instances page: Select Data Sources → Jenkins → View Details. The type of integration is Pipeline Risks
        
5.  Install and configure the Cortex Cloud plugin on your Jenkins server:
    
    1.  Open Jenkins and select: Manage Jenkins → Plugins (under System Configuration) → Advanced settings.
        
    2.  Select Choose File (under the Deploy Plugin section) → browse for the Cortex.Cloud Plugin.hpi file → Upload → Deploy.
        
    3.  Configure the plugin:
        
        1.  Open Jenkins → Select Manage Jenkins → System (under System Configuration) → Cortex Cloud.
            
        2.  Fill in the provided fields:
            
            -   Cortex JWT Token: Paste the JWT token copied in _step 4b_ above.
                
            -   Cortex Reports Recurrence Period (Value: minutes): The frequency with which reports are generated. We recommend that you do not change the default value
                
            
        3.  Click Save.
            
            The Cortex Cloud Application Security plugin is integrated with your Jenkins system.
            
6.  Verify integration and confirm that the your integrated Jenkins instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, search for Jenkins.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate and verify that the status of your instance is Connected.
        
7.  Next step: View scan results and mitigate issues.
    

**Note**

Always refer to the official [Jenkins documentation](https://www.jenkins.io/doc/book/managing/plugins/) when installing plugins on Jenkins servers.

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