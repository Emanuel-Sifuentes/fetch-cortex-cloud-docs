---
title: "Branch periodic scans"
tocId: "tYOTAiTfE983lxUk5N6rKg"
contentId: "LofKKO3LaDyZr8~Gcal1ow"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Branch-periodic-scans"
depth: 2
---

# Branch periodic scans
Branch periodic scans are automated checks that assess the security posture of applications and infrastructure. These scans run at regular intervals using supported Cortex Cloud Application Security scanners to identify vulnerabilities and weaknesses. You can analyze the scans directly from a dedicated inventory table, which displays branch periodic scan details, including code context, scan date, health, detected findings, and generated issues.

## How to access branch periodic scans

Under Modules select Application Security → Branch Periodic Scanning (under Scans).

## Branch periodic scan inventory

The branch periodic scan inventory displays the following details:

The following fields are displayed in the scan inventory table.

-   Repository: Identifies the scanned repositories
    
-   Organization: Specifies the organization owning the repository
    
-   Scanned Branch: Indicates the branch analyzed during the scan
    
-   Scan Date: Records the timestamp of the last scan execution
    
-   Scan Health: Displays the health of the scan. Values include:
    
    -   Error
        
    -   Partially: Indicates that the scan execution resulted in a partial completion, with some scan modules (for example IaC) succeeding and others (such as Secrets) failing
        
    -   Completed
        
    

**Note**

The inventory table displays scan issues for visibility only; remediation is not available here. To resolve issues, navigate to the dedicated issue type inventory, where you can manage and remediate them.

## Expanded periodic scan details

Selecting a scan from the inventory opens its side car, which displays a general overview of the scan's details and provides access to details of issues and findings via dedicated scan type tabs.

Overview

The overview tab displays these scan details.

-   **General scan information**
    
    -   Organization: The specific business entity or organizational unit associated with the periodic scan
        
    -   Scan Date: The date and time when the periodic scan was performed
        
    -   Scan Health: The overall health status of the periodic scan, indicating its success, failure, or other relevant states
        
    
-   **Code context**
    
    -   Repository: The version control repository that was scanned
        
    -   Scanned Branch: The specific branch within the repository that was subjected to the periodic scan
        
    
-   **Scan results summary**
    
    -   Issues: A breakdown by severity and count of actionable security issues identified from the scan's findings
        
    -   Issues by Type: A categorization and count of identified issues based on their specific vulnerability types (such as IaC, Secrets)
        
    -   Findings: A breakdown by severity and count of findings discovered by the scan before being converted into actionable issues
        
    -   Findings by Type: A categorization and count of raw findings based on their specific detection types.
        
    

Vulnerabilities

When selecting the Vulnerabilities tab, the Issues tab is displayed by default. Selecting an issue in the table that is presented then opens its side card directly within Scans Management, eliminating the need to navigate to the dedicated Vulnerabilities issues page.

For detailed information about vulnerabilities issues, refer to Software Composition Analysis (SCA) vulnerability issues.Software Composition Analysis (SCA) vulnerability issues

Select the Findings tab to open a list of findings associated with the issue, including the name of the finding, the asset in which the finding was detected, and the repository hosting the asset.

Click on a finding for additional details, including a description of the finding the asset type and group associated with the finding, when last updated, and evidence for the finding.

Select the Findings tab to open a list of findings associated with the issue, including the name of the finding, the asset in which the finding was detected, and the repository hosting the asset.

Click on a finding for additional details, including a description of the finding the asset type and group associated with the finding, when last updated, and evidence for the finding.

Configurations

When selecting the Configurations tab, the Issues tab is displayed by default. Selecting an issue in the table that is presented then opens its side card directly within Scans Management, eliminating the need to navigate to the dedicated IaC misconfigurations issues page.

For detailed information about IaC misconfiguration issues, refer to Overview.Overview

Select the Findings tab to open a list of findings associated with the issue, including the name of the finding, the asset in which the finding was detected, and the repository hosting the asset.

Click on a finding for additional details, including a description of the finding the asset type and group associated with the finding, when last updated, and evidence for the finding.

Secrets

When selecting the Secrets tab, the Issues tab is displayed by default. Selecting an issue in the table that is presented then opens its side card directly within Scans Management, eliminating the need to navigate to the dedicated Secrets issues page.

For detailed information about Secrets issues, refer to Secrets issues.Secrets issues

Select the Findings tab to open a list of findings associated with the issue, including the name of the finding, the asset in which the finding was detected, and the repository hosting the asset.

Click on a finding for additional details, including a description of the finding the asset type and group associated with the finding, when last updated, and evidence for the finding.

Package Integrity

When selecting the Package Integrity tab, the Issues tab is displayed by default, displaying a list of package operational risk and license issues, with detailed properties for each entry. Selecting an entry then opens its side card directly within Scans Management, eliminating the need to navigate to the dedicated Package Integrity issues page.

For detailed information about Package Integrity issues, refer to Package Integrity.

Select the Findings tab to open a list of findings associated with the issue, including the name of the finding, the asset in which the finding was detected, and the repository hosting the asset.

Click on a finding for additional details, including a description of the finding the asset type and group associated with the finding, when last updated, and evidence for the finding.