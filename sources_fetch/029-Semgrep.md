---
title: "Semgrep"
tocId: "bTMarCGjuPBpDARwI41ssQ"
contentId: "40VamLTeVsQugI3FMgLaRQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Semgrep"
depth: 2
---

# Semgrep

Cortex Cloud AppSec integrates with Semgrep to ingest SCA and SAST findings into the unified AppSec data model.

The Semgrep integration enables automated, periodic ingestion of Semgrep scan results from Semgrep-scanned projects. The integration supports two scan types that can be enabled independently or together:

-   **SCA (Software Composition Analysis)**: Ingests open-source dependency vulnerabilities, producing CVE-based vulnerability findings and software package assets
    
-   **SAST (Static Application Security Testing)**: Ingests code-level security vulnerabilities, producing findings with precise source code locations, CWE classifications, and commit attribution
    

**Pillar Alignment**: ASPM (posture and orchestration) - third-party integration: ingesting external security tool findings into the unified posture management platform.

**Functional responsibilities**

-   **AppSec managers (Governance)**: Consolidate Semgrep findings alongside native Cortex Cloud scan results for unified risk visibility, policy enforcement, and compliance reporting across the application portfolio
    
-   **AppSec Practitioners (Operations)**: Review Semgrep SCA and SAST findings in the Cortex Cloud Findings view, prioritize remediation using CVSS scores and CWE Top 25 classifications, and track fix version availability for vulnerable dependencies
    

**Prerequisite**

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   Ensure that you have a connected version control system (VCS) and repositories
    
-   **Semgrep**: A valid Semgrep API token
    
    **Note**
    
    -   To create a Semgrep API token, in Semgrep, navigate to Settings → Tokens → API tokens
        
    -   Ensure you select the **Web API** scope (sometimes labeled as Management or API access depending on your plan)
        
    -   The Web API permission authorizes Cortex Cloud to query the Semgrep API and retrieve your SCA/SAST findings
        
    
    For more information on Semgrep API tokens, refer to [Create a Semgrep app token](https://www.google.com/search?q=https://semgrep.dev/docs/deployment/add-semgrep-to-other-ci-providers/%23create-a-semgrep_app_token).
    
-   Create an egress path to establish the designated route for outbound data transmission from Semgrep to Cortex Cloud
    

## Onboarding steps

1.  Select Settings → Data Sources & Integrations → \+ Add New.
    
2.  Search for and hover over Semgrep and click Add, or Add Another Instance if an instance is already onboarded.
    
3.  On the Configure Integration step of the integration wizard: Provide your Semgrep API key → Authorize.
    
4.  On the Select Issues Types step of the integration wizard.
    
    Select the type of data findings to ingest: SAST, SCA or both → Next.
    
5.  On the Select Projects step of the integration wizard.
    
    Review the detected Semgrep projects and confirm or manage their repository mappings:
    
    1.  Options:
        
        -   Accept the displayed mapping as detected by Cortex Cloud. This does not require any action on your part
            
        -   Automatically map projects: Select Automatically map future Semgrep projects to ensure maximum security coverage by automatically mapping current and future Semgrep projects to Cortex Cloud repositories
            
        -   Configure unmapped or mismatched projects: Manually configure mapping if Cortex Cloud cannot match a project to a repository or an update to the mapping is required: From the list of detected projects, select the project from the list, then choose the correct repository from the Repository dropdown menu
            
        
    2.  Click Save.
        
    
    **Note**
    
    -   Mapping establishes relationships between Semgrep projects and Cortex Cloud code repositories, simplifying access management and enabling risk analysis at the repository level, including displaying findings on the tenant
        
    -   Only mapped projects are ingested
        
    
6.  Verify integration and confirm that your integrated Semgrep instance is Connected.
    
    1.  On the Data Sources & Integrations page, search for Semgrep.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate and verify that the status of your instance is Connected and that the mapped projects are displayed and connected.
        

Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance
        
        -   Add or remove repository mappings: Redirects to the Select Issue Type step of the integration wizard, from which the user can navigate to the Map to Repositories step, where you can modify configurations for the selected instance and Save.
            
        -   **Rotate the API key**: Navigate to the Configure Integration step, enter your new Semgrep API key, and Save.
            
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details and management**.
    
    Select an instance row to view comprehensive details of the ingested third-party instance, including:
    
    -   **Integration Health:** Connectivity status
        
    -   **Scope:** The number of applications associated with the integration
        
    -   **Mapping:** The Semgrep target projects and corresponding Cortex mapped repositories, including individual repository connection status
        
    -   **History:** The last ingestion date and the initial integration timestamp
        
    
    **Management Options**
    
    From this view, you can also access a management menu for each instance, allowing you to Edit the instance configuration or Delete the instance entirely from the system.
    

## What gets cleaned up upon deletion

-   **Integration configuration**: The Semgrep integration record, including the API key, scan type selections, and repository mappings, is permanently deleted
    
-   **Ingested findings**: All SCA and SAST findings that were ingested from Semgrep are removed from the Vulnerabilities and Code Weaknesses tables. The findings are no longer queryable in the issues table, findings table, or platform-level findings table
    
-   **Issues derived from findings**: Issues that were created exclusively from Semgrep-ingested findings are removed. Issues that aggregate findings from multiple data sources (for example, a CVE detected by both Semgrep and a native Cortex scanner) retain the non-Semgrep findings
    
-   **Coverage status**: The Semgrep column on the AppSec Coverage page resets to Disabled for all previously mapped repositories. The aggregate Vulnerabilities and Code Weaknesses coverage columns update to reflect the removal of Semgrep scanning
    
-   **Policy evaluations**: Policy evaluation results that reference Semgrep-ingested findings are removed. Active policies remain configured but no longer match against Semgrep findings
    
-   **Dashboard metrics**: The AppSec Dashboard metrics update to exclude Semgrep-ingested findings from aggregated counts, charts, and trend data
    

**Important**

Deletion is irreversible. To restore Semgrep findings after deletion, reconfigure the integration and wait for the next polling cycle to re-ingest findings from Semgrep.