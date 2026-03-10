---
title: "In-depth CI/CD pipeline asset information"
tocId: "k147fa0a0nq5eYUBiV~Ejw"
contentId: "DfsObixBn7q8t1WR5c8zCQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/In-depth-CI/CD-pipeline-asset-information"
depth: 3
---

# In-depth CI/CD pipeline asset information
Click an asset in the inventory table to open its side card, providing in-depth information organized into several tabs. The Overview tab (default display) offers highlights and a general summary. Additional contextual tabs provide specific details, including a Code to Cloud tab (providing context on the asset's path to production), an Applications tab (displaying the applications associated with this asset), and tabs focusing on specific issue types detected within the asset, such as Secrets and Vulnerabilities.

## CI/CD Pipeline asset summary

The CI/CD Pipeline asset summary, displayed at the top of the card, provides concise details about the CI/CD pipeline assets, such as its name, the platform used (for example GitHub Actions) and specific pipeline configurations.

Overview

The Overview tab summarizes CI/CD pipeline asset highlights and properties.

**Highlights**:

-   Critical/High issues: An aggregation of critical and high issues associated with the CI/CD pipeline asset
    
-   Deployed: Indicates whether the CI/CD pipeline asset has been deployed and is currently active within your cloud environment or infrastructure
    
-   New: Indicates whether the CI/CD pipeline asset was created during the past 30 days
    
-   Active: Indicates whether the CI/CD pipeline asset is active and processing tasks
    
-   **Risk summary**: Displays the total amount of risks associated with the pipeline asset grouped by category (cases, issues and findings ) and their severity level. Selecting a risk category will redirect you to more information
    
-   **Visibility timeline**: When the CI/CD pipeline assets were first and last detected
    

**Properties**:

-   Asset details, including Asset Id, Asset Types and Asset Groups associated with the CI/CD pipelines asset
    
-   Applications: Lists the applications that include this pipeline assets as part of their defined assets or configuration
    
-   **CI/CD configuration**:
    
    -   Provider: The platform or service that hosts and manages the CI/CD pipeline, such as Jenkins and GitHub Actions
        
    -   CI File Repository: The location or repository where the configuration files for the CI/CD pipeline are stored
        
    -   CI Instance: The specific instance or environment where the CI/CD pipeline is executed
        
    
-   Last Job Execution: The most recent execution of a job within the CI/CD pipeline
    
-   Contributors: The individuals or entities who have made contributions to the CI/CD pipeline. This information allows collaboration within the CI/CD pipeline's development process
    

**Note**

The Highlights section and other asset properties only display attributes when their corresponding indicators are present. For example, if an asset is not deployed, its deployment-related attributes will not show up; similarly, if there are no detected issues, those highlights or properties will not appear.

Code to Cloud

The Code to Cloud tab describes the integrated flow of a selected CI/CD pipeline, showing its journey from code commit to deployment. The graph visualizes the path to production, showcasing the pipeline's central role in orchestrating the flow from the repository, through its build and test stages, to the image it creates, and finally to the traced runtime resource it deploys.

For more information on Cortex Cloud Code to Cloud, refer to Code to Cloud.

Applications

The Applications tab provides an overview of the applications associated with this CI/CD pipeline, including the application risk score, business criticality, business owners and path to production. The path to production provides a graphical representation the application software development lifecycle, including the CI/CD pipeline role within the workflow.

For more information about applications, refer to Applications.Applications

## Instances

The Instances tab displays a list of CI instances associated with the pipeline. The following table displays CI instance properties.

| Property | Description |
| --- | --- |
| Instance Name | The name of the specific CI/CD instance |
| Instance ID | The identifier for the specific CI/CD instance |
| Instance Provider | The name of the CI/CD tool or platform that manages the instance (such as Jenkins, GitHub Actions |
| Instance URL | An address that allows you to access the user interface or details page of the specific CI/CD instance within its native platform |
| Last Observed | The timestamp indicating the most recent time this specific CI/CD instance was detected |