---
title: "Terraform Cloud (Run Tasks)"
tocId: "IC4aHJfjWRV9XgudPoHs9g"
contentId: "ZO0p8K0zLqChs4lKEpNzmQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Terraform-Cloud-Run-Tasks"
depth: 2
---

# Terraform Cloud (Run Tasks)
Integrate Cortex Cloud Application Security with Terraform Cloud (Run Tasks) to enable dynamic, automated, and context-specific scans in your Terraform workspace. Cortex Cloud Application Security scans Terraform (TF) frameworks for misconfigurations based on default and custom policies whenever changes are triggered, ensuring seamless security checks. It identifies issues such as infrastructure-as-code (IaC) misconfigurations, Software Composition Analysis (SCA ) vulnerabilities, exposed secrets, and license non-compliance, depending on the security scanners that you have subscribed to.

You can monitor and remediate issues directly in the Cortex Cloud Application Security console. Run statuses and violation details can be tracked in both Cortex Cloud Application Security and Terraform Cloud through streamlined run task reviews. For more information about streamlined tasks, refer to [https://www.hashicorp.com/blog/terraform-cloud-adds-streamlined-run-task-reviews](https://www.hashicorp.com/blog/terraform-cloud-adds-streamlined-run-task-reviews).

**Prerequisite**

Before you begin:

-   **User permissions**: Ensure the user performing the integration has permissions to edit pipeline configurations (such as YAML files) and manage secrets/credentials within the CI platform to store the Cortex Cloud API key securely
    
-   Procure a [Terraform cloud license](https://www.hashicorp.com/products/terraform/pricing) that is either a trial license or a TF Cloud license at the TEAM & GOVERNANCE level
    
-   Terraform permissions: Grant the user or team the following permissions, depending on integration:
    
    -   _Manage Workspaces_ permissions at the organization level. These permissions are required to attach and manage the run task on workspaces or:
        
    -   _Administrator_ permissions on the workspace(s)
        
    
-   Create a Terraform **Organization**. For more information, refer to the[Terraform documentation](https://developer.hashicorp.com/terraform/cloud-docs/workspaces#creating-workspaces)
    
-   Create a Terraform **Workspace**: For more information, refer to the [Terraform documentation](https://developer.hashicorp.com/terraform/cloud-docs/workspaces#creating-workspaces)
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

### Onboarding steps

1.  **On your Terraform Cloud platform**, create a Terraform **api token**.
    
    1.  Select your user/profile icon → User Settings.
        
    2.  Select the Tokens section from the left side menu.
        
    3.  Click Create an API token → provide a description → Create API token .
        
    4.  Copy and save the token+ Done.
        
        **Note**
        
        Skip this step if you plan on using an existing token.
        
    
    For more information about Terraform API tokens, refer to the [Terraform API Tokens](https://developer.hashicorp.com/terraform/cloud-docs/users-teams-organizations/api-tokens) documentation.
    
2.  On the Cortex Cloud console.
    
    1.  Select Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for and hover over Terraform Cloud (Run Tasks) and click Add, or Add Another Instance if an instance is already onboarded.
        
3.  Provide your Terraform user or team API token on the Configure Account step of the wizard → Next.
    
4.  Select an organization from the Select Organization step of the wizard → Next.
    
5.  On the Select Workspace step of the wizard.
    
    1.  Select repositories from the Selection Options field.
        
        -   Permit all existing repositories
            
        -   Permit all existing and future repositories
            
        -   Choose from repository list
            
        
    2.  Select a run plan from the Run Stage field.
        
        -   Pre-plan: The scan runs before Terraform generates the plan
            
        -   Post-plan: The scan runs after Terraform generates the plan
            
        
        **Note**
        
        Cortex Cloud Application Security performs a scan of Terraform templates on selected workspaces based on the Run Stage.
        
    3.  Click Save and then Close in the final verification step of the wizard.
        
6.  Verify integration and confirm that the your integrated Terraform Cloud (Run Tasks) instance has a status of Connected.
    
    1.  On Data Sources & Integrations page, search for Terraform Cloud (Run Tasks).
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your instance and verify that the status is Connected.
        
7.  Next step: View scan results and mitigate issues.
    

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