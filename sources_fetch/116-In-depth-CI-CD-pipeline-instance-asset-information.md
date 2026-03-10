---
title: "In-depth CI/CD pipeline instance asset information"
tocId: "E7YEEkcWSAtHocpptz848w"
contentId: "ZwxXYY_vHmSRIv7xuXQOMA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/In-depth-CI/CD-pipeline-instance-asset-information"
depth: 3
---

# In-depth CI/CD pipeline instance asset information
Click an asset in the inventory table to open its side card, providing in-depth information organized into several tabs. The Overview tab (default display) offers highlights and a general summary. Additional contextual tabs provide specific details, including a Code to Cloud tab (providing context on the asset's path to production), an Applications tab (displaying the applications associated with this asset), and tabs focusing on specific issue types detected within the asset, such as Secrets and Vulnerabilities.

## CI/CD pipeline instance summary

The CI/CD pipeline instance summary, displayed at the top of the card, provides concise details about the CI/CD instance, such as its name, the provider (for example GitHub Actions), and specific pipeline configurations.

Overview

The Overview tab summarizes the CI/CD pipeline instance highlights and properties.

**Highlights**:

-   Critical/High issues: An aggregation of critical and high issues associated with the CI/CD pipeline instance
    
-   Deployed: Indicates whether the CI/CD pipeline instance has been deployed and is currently active within your cloud environment or infrastructure
    
-   **Risk summary**: The amount of issues and findings associated with the pipeline instance and their severity level. Selecting an issue or finding redirects to the issues or findings page, filtered by the selected issue or finding
    
-   **Visibility timeline**: When the CI/CD pipeline instance was first and last detected
    

**Properties**:

-   Asset details, including Asset Id, Asset Category (fixed value: CI/CD Instance), Provider (CI tool such as Jenkins and GitHub Actions) and Asset Groups associated with the CI/CD pipeline instance
    
-   Instance URL: Link to the specific CI/CD instance
    

The Highlights section and other asset properties only display attributes when their corresponding indicators are present. For example, if an asset is not deployed, its deployment-related attributes will not show up; similarly, if there are no detected issues, those highlights or properties will not appear.

Configurations

The Configurations tab provides a table of CI/CD instance configuration issues. The following table provides selected CI/CD configuration instance issue properties.

| Property | Description |
| --- | --- |
| Severity (icon) | The severity level of the issue |
| Issue Name | The issue identifier |
| Asset Name | The asset in which the issue was detected |
| Assigned To | The person or entity assigned to remediate the issue |
| Creation Date | When the issue was initially detected |
| Issue Status | The status of the issue |

Pipelines

The Pipelines tab displays a list of CI/CD pipelines associated with the CI/CD instance.

| Property | Description |
| --- | --- |
| Pipeline Name | The name of the CI/CD pipeline. |
| Pipeline File Path | The location of the configuration file that defines the CI/CD pipeline within the associated repository |
| Related Repositories | A list of repositories that are associated with the CI/CD pipeline |
| Last Observed | The timestamp indicating the most recent time this specific CI/CD pipeline was detected |
| Application IDs | Unique identifiers assigned to the application(s) that this CI/CD pipeline builds, tests, or deploys |