---
title: "Veracode"
tocId: "q13ZR52wmNoHY1c8rlSBMQ"
contentId: "mVqvt3qutSiuIzWT~82wGw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Veracode"
depth: 2
---

# Veracode
You can ingest SAST findings directly from Veracode into Cortex Cloud Application Security. This allows you to use Cortex Cloud Application Security's analysis and visualization tools to identify critical vulnerabilities, prioritize remediation efforts, and improve your application code security.

Veracode supports `Cyclonedx`, `json` and table output formats.

**Prerequisite**

-   **Permissions**: The following user permissions are required:
    
    -   **Cortex Cloud**: Instance Admin, AppSec Admin or GRBAC permissions. For more information on AppSec Admin permissions, refer to Code Security user roles and permissions
        
    -   **Veracode**: At minimum, Reviewer permissions are required
        
    
-   Ensure that you have a connected version control system (VCS) system and repositories
    
-   Generate and copy a Veracode access key. The access key includes a key ID and secret
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

### Onboarding steps

1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
    
2.  Search for and hover over Veracode and click Add, or Add Another Instance if an instance is already onboarded.
    
3.  On the Configure Integration step of the integration wizard:
    
    1.  Fill in the provided fields:
        
        -   Enter the Veracode key ID and secret from step **1b** into their respective fields
            
        -   Select your Veracode region from the Region dropdown
            
        
    2.  Click Authorize.
        
        The integrationSelect Applications step of the integration wizard is displayed, including a list of Veracode applications automatically mapped to Cortex Cloud Application Security repositories.
        
4.  Select an option, and click Save.
    
    -   Select Automatically map future Veracode applications to automatically map all future applications to Cortex Cloud Application Security repositories
        
    -   Manually map Veracode applications to Cortex Cloud Application Security repositories: Click on a Cortex Cloud Application Security repository and select the required repository
        
        **Note**
        
        Only mapped applications will be ingested.
        
    
    1.  -   All current applications
            
        -   All current and future applications
            
            **Note**
            
            This is the recommended option to ensure complete coverage and successful operation of all features.
            
        -   Only selected applications, and then select the applications from the menu
            
        
    2.  Click Next.
        
5.  On the Map to Repositories step of the wizard:
    
    1.  Select an option:
        
        -   Accept the displayed mapping as detected by Cortex Cloud Application Security . This does not require any action on your part
            
        -   Manually configure mapping if Cortex Cloud Application Security could not match a project to a repository: Select Set in the Cortex Cloud Application Security Repository column, and select a repository from the list that is displayed
            
        -   Reject mapping: Check the Don’t map any applications box
            
        -   Manually modify mapping: Click Replace next to the existing mapped Cortex Cloud repository. This will open an option to select a different repository from the displayed list, allowing you to update the mapping
            
        
        **Note**
        
        -   Mapping establishes relationships between Veracode projects and Cortex Cloud Application Security code repositories, simplifying access management and enabling risk analysis at the repository level, including displaying findings on the tenant
            
        -   Only mapped projects will be ingested
            
        
    2.  Click Next.
        
6.  Select Done on the Status step of the wizard to complete the integration, initiating an automatic ingestion of data from the integrated Veracode projects.
    
    **Note**
    
    Verify that the Connector Created Successfully message is displayed on the page.
    
7.  Verify integration and confirm that the your integrated Veracode instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, search for Veracode.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate and verify that the status of your Veracode instance is Connected.
        

### Limitations

-   Currently, Veracode SAST ingestion supports Veracode periodic and CLI scans. Pull Request scans and other types are not supported
    
-   History, deduplication and DevEx features such as PR comments, IDE, CLI and enforcement are not supported
    

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

### View SAST code weaknesses generated from ingested Veracode findings

You can view SAST code weaknesses generated from ingested Veracode findings:

-   On the Code Weaknesses page under Cortex Cloud Application Security Issues
    
-   Under the Code Weaknesses tab of the Repositories assets page
    

For more information on SAST code weaknesses, refer to SAST code weaknesses (CWEs).SAST code weaknesses (CWEs)