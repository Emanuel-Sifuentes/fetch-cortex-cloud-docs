---
title: "Onboard JFrog Artifactory"
tocId: "ZtBbmZqZizGYGorydhWwYg"
contentId: "LhACOf5k3dhTG4x7NzPm8g"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Onboard-JFrog-Artifactory"
depth: 2
---

# Onboard JFrog Artifactory
Follow the steps below to configure the connection to your JFrog Artifactory instance.

**Prerequisite**

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   JFrog permissions:
    
    -   The permissions associated with the user configured during the onboarding process determine the scope of scan results. Only repositories and artifacts the user can access are included
        
        Repository access: The Artifactory user must have Read access to the specific repositories you want to scan
        
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

### Onboarding steps

1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
    
2.  Hover over JFrog Artifactory and click Add or Add Another Instance if an instance is already onboarded.
    
3.  Select Package resolution for code scanning as the integration type.
    
4.  Provide an instance name → Enable access by IPs (optional) → Next.
    
    **Note**
    
    To authorize the scanner to connect through your firewall, select Enable access by IPs, and copy the displayed source IPs to your organization's allowlist.
    
5.  Fill in the provided fields and click Next.
    
    -   Registry URL: Enter your JFrog Artifactory URL.
        
        Example 2. Examples
        
        -   **For JFrog SaaS integrations**: `https://example.jfrog.io`
            
        -   **For JFrog on-premises integrations**: `https://artifactory.example.com`, where `<artifactory.example.com>` is your server domain or IP address
            
        
          
        
    -   Username (required): Your JFrog user name
        
    -   Password (required): Your JFrog password
        
    
6.  Select a package manager to configure a registry as private instead of the default public registry.
    
    **Note**
    
    -   For Maven:
        
        -   Select Mirror Registry if this repository mirrors an external repository
            
        -   Use the Mirror Of value to define the duplication scope:
            
            -   `*` mirrors all requests
                
            -   Type a request `[value]`: Mirrors only specific requests (such as central).
                
            
        
    -   Package managers not listed will default to the public registry
        
    -   You can only proceed after selecting at least one package manager.
        
    
7.  (Optional): Select Add a package manager to set up an additional package manager.
    
8.  Click Save.
    
9.  **Verify integration**: Verify integration and confirm that the your integrated JFrog Artifactory instance is Connected.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  Filter the table by Provider=JFrog.
        
    3.  Select the resulting displayed instance.
        
    4.  On the Data Source side panel, verify that the Status displays Connected.
        

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