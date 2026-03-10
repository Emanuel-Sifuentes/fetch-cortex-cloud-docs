---
title: "Snyk"
tocId: "fI7kltr0peboeMOCtpyP0A"
contentId: "RMejHwf90~No30ag2urMtg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Snyk"
depth: 2
---

# Snyk

Configure the Snyk integration to ingest SAST and SCA vulnerability findings into Cortex Cloud, unifying your software package assets and security code.

The Snyk integration connects Cortex Cloud to your Snyk organization, enabling automatic ingestion of security findings from Snyk-scanned repositories. The integration supports two scan types that can be enabled independently or together:

-   **SCA (Software Composition Analysis)**: Ingests open-source dependency vulnerabilities, producing software package assets and CVE-based vulnerability findings
    
-   **SAST (Static Application Security Testing)**: Ingests code-level security vulnerabilities, producing findings with precise source code locations, CWE classifications, and commit attribution
    

**Key benefits**

-   **Unified visibility**: Snyk findings appear alongside native scan results in the Asset inventory, and Issues and Findings views streamlines remediation and provides a clear, comprehensive view of your application security posture.
    
-   **Dual scan coverage**: Enable SCA, SAST, or both scan types per integration to match your Snyk deployment configuration
    
-   **Normalized Data**: Snyk findings are normalized into the Cortex Cloud data model, enabling cross-tool comparison, unified filtering, and consistent prioritization
    
-   **Automated Ingestion** After initial setup, findings are ingested automatically when external project scans are triggered
    

**Pillar Alignment**: ASPM (posture and orchestration) - Third-Party Integration: Ingesting external security tool findings into the unified posture management platform.

**Functional responsibilities**

-   **AppSec managers (Governance)**: Consolidate Snyk findings alongside native Cortex Cloud scan results for unified risk visibility, policy enforcement, and compliance reporting across the application portfolio
    
-   **AppSec Practitioners (Operations)**: Review Snyk SCA and SAST findings in the Cortex Cloud Findings view, prioritize remediation using CVSS scores and CWE Top 25 classifications, and track fix version availability for vulnerable dependencies
    

**Prerequisites**

-   **Permissions**: The following user permissions are required:
    
    -   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
        
    -   Ensure that you have a connected version control system (VCS) and repositories
        
    -   **Snyk permissions and requirements**:
        
        -   **Permissions**: The Snyk API token must have direct organization-level access. The token must have explicit access to the specific Snyk organization being integrated. Group-level permissions alone are not sufficient because Snyk’s REST API requires explicit authorization at the individual Organization level to access scoped endpoints
            
        -   **Organization-Level (mandatory)**: Assign the **Org Collaborator** role to the specific organization
            
        -   **Recommended account type**: Generate and save the API token from a **Service Account**. Service accounts are decoupled from individual users, ensuring the integration remains uninterrupted even if an employee leaves the organization or changes roles
            
        -   **Access control**: These roles authorize Cortex Cloud to list applications and retrieve findings without granting excessive administrative privileges
            
        
    

Supported Snyk API endpoints:

| Region | API Hostname |
| --- | --- |
| US (default) | api.snyk.io |
| US (legacy) | api.us.snyk.io |
| EU | api.eu.snyk.io |
| AU | api.au.snyk.io |

## Onboarding steps

1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
    
2.  Search for and hover over Snyk and click Add, or Add Another Instance if an instance is already onboarded.
    
3.  On the Configure Integration step of the integration wizard.
    
    1.  Configure Snyk parameters:
        
        -   Select your Snyk API URL from the menu (for example `API URLSNYK-US-02 (https://api.us.snyk.io/rest`))
            
        -   Enter your Snyk API token
            
        
    2.  Click Authorize.
        
4.  On the Select Organization step of the wizard: Enter your Snyk Organization ID → Next.
    
    **Note**
    
    Select Test Connection to verify that Cortex Cloud can connect to your Snyk organization.
    
5.  On the Select Issue Types step of the wizard: Select the type of data findings to be ingested: SAST, SCA or both → Next.
    
    **Note**
    
    -   SCA requires Snyk Open Source or Snyk Container projects configured in the organization
        
    -   SAST requires Snyk Code enabled and projects configured in the organization
        
    
6.  Select ingestion targets: On the Map to Repositories step of the wizard, review the detected Snyk projects and confirm or manage their repository mappings
    
    1.  -   Select Automatically map future Snyk applications to automatically map current and future Snyk projects to Cortex Cloud repositories. This is recommended to ensure maximum security coverage
            
        -   Configure unmapped or mismatched applications: Manually configure mapping if Cortex Cloud cannot match an application to a repository or an update to the mapping is required: From the list of detected applications, select the application from the list, then choose the correct repository from the Repository dropdown menu
            
        
    2.  Click Save.
        
    
    **Note**
    
    -   Mapping establishes relationships between Snyk applications and Cortex Cloud code repositories, simplifying access management and enabling risk analysis at the repository level, including displaying findings on the tenant
        
    -   Only mapped applications are ingested
        
    
    After saving, Cortex Cloud triggers the initial scan ingestion for the selected targets.
    
7.  Verify integration and confirm that the your integrated Snyk instance has a status of Connected.
    
    1.  Navigate to Settings → Data Sources & Integrations → Filter for Snyk.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate and verify that the status of your instance is Connected and that the mapped applications are displayed and connected.
        

Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Issue Type step of the integration wizard, from which the user can navigate to the Map Repositories step, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details and management**.
    
    Select an instance row to view comprehensive details of the ingested third-party instance, including:
    
    -   **Integration Health:** Connectivity status and the Snyk domain
        
    -   **Scope:** The number of applications associated with the integration
        
    -   **Mapping:** The Snyk target and corresponding Cortex mapped repositories, including individual repository connection status
        
    -   **History:** The last ingestion date and the initial integration timestamp
        
    
    **Management Options**
    
    From this view, you can also access a management menu for each instance, allowing you to Edit the instance configuration or Delete the instance entirely from the system.
    

## What gets cleaned up upon deletion

When a Snyk integration is deleted, findings and issues from previous Snyk scans are not closed/resolved. The deletion only removes:

-   The integration configuration itself
    
-   The external project mappings (Snyk organizations/projects)
    
-   The scan configuration records
    
-   CI/CD graph entities via lifecycle event
    

The findings and issues that were ingested from Snyk scans remain active in the system after the integration is deleted. This is a behavioral difference from VCS integrations where findings are closed and issues are resolved upon deletion.

## Next step: View and manage ingested findings

After third-party scanner integration is configured, Cortex Cloud automatically ingests and normalizes the scan results.Operational management of these findings is consolidated based on the detection type:

-   Software Composition Analysis (SCA)sca-third-party-supply-chain
    
-   Static Application Security Testing (SAST)