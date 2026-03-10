---
title: "In-depth IaC resource asset information"
tocId: "YVY5ds4K7hvbCaOuadDGPw"
contentId: "IsdFK9IwfwLX7WWtHjy3dw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/In-depth-IaC-resource-asset-information"
depth: 2
---

# In-depth IaC resource asset information
Click an asset in the inventory table to open its side card, providing in-depth information organized into several tabs. The Overview tab (default display) offers highlights and a general summary. Additional contextual tabs provide specific details, including a Code to Cloud tab (providing context on the asset's path to production), an Applications tab (displaying the applications associated with this asset), and tabs focusing on specific issue types detected within the asset, such as Secrets and Vulnerabilities.

## IaC resource summary

The IaC resource asset summary, displayed at the top of the card, provides concise details about the IaC resource, such as its name (such as aws_s3_bucket.website), type (such as S3 bucket), and the associated framework (such as Terraform).

Overview

The Overview tab summarizes IaC resource highlights and properties.

**Highlights** provide key security and operational insights related to the asset:

-   Critical/High issues: An aggregation of critical and high issues associated with the IaC resource
    
-   Internet Exposed Runtime Asset: Indicates whether the IaC resource, when deployed, results in a runtime asset (such as a container), that is directly accessible from the public internet
    
-   Deployed: Indicates whether the IaC resource has been deployed and is currently active within your cloud environment or infrastructure
    
-   New: Indicates whether the IaC resource was created during the past 30 days
    
-   Sensitive Data in Runtime: Indicates whether the IaC resource, when deployed, handles or stores sensitive data within its runtime environment
    
-   **Risk summary**: The amount of cases, issues and findings associated with the IaC resource. Each of these types includes two clickable values. The first value redirects to the corresponding type table sorted by the entry, while the second value opens the description card of the specific type within the IaC resource asset inventory without requiring redirection
    
-   **Visibility timeline**: When the IaC resource was first and last detected
    

**Properties**:

-   Asset details, including Asset Id, Asset Category and Account ID associated with the IaC resource
    
-   **Source Control Information**: Displays the origin and location of the IaC resource's code. It includes the cloud provider (such as AWS), the provider hosting the code (such as GitHub, GitLab), the linked repository and branch in which the code is hosted, associated tags, and the exact file path to the resource's definition
    
-   **Version History and Metadata**: Provides insights into the resource's development history, authorship, and associated metadata. It lists collaborators who have modified the IaC code, and details about the initial commit hash and time related to this IaC asset
    
-   **Scan information**: A list of scans conducted on the IaC resource. Scan details include the name of the scanner used, the specific branch of the package that was scanned, the timestamp of the last scan, and the overall status of the scan (such as completed or failed)
    
    For more information about scan management, refer to Overview.
    

The Highlights section and other asset properties only display attributes when their corresponding indicators are present. For example, if an asset is not deployed, its deployment-related attributes will not show up; similarly, if there are no detected issues, those highlights or properties will not appear.

Code

The Code tab describes the directory path and file name where the asset's resource code resides within your IaC repository. In addition, the code defining the resource block is displayed.

Code to Cloud

The Code to Cloud tab describes the integrated flow of a selected Infrastructure as Code (IaC) asset, from development to its deployed state. The graph visualizes the path to production, showing the IaC resource's journey from the repository node where it's hosted, through the CI/CD system, and finally to the traced runtime resource it provisions.

For more information on Cortex Cloud Code to Cloud, refer to Code to Cloud.

Applications

The Applications tab provides an overview of the application associated with this IaC asset, including a graphical representation of its path to production, which incorporates the IaC assets role within the workflow.

For more information about applications, refer to Applications.

Configurations

The Configurations tab displays an inventory of IaC misconfiguration detected in the asset.

The table includes the following default properties. Click on the Table Settings Menu for additional properties.

-   Severity level: Indicates the level of severity of the IaC misconfiguration
    
-   Issue Name: The IaC misconfiguration identifier
    
-   Asset Name: The name of the IaC resource in which the misconfiguration occurred. Selecting this attribute displays the asset side card without having to navigate away from the Repository page
    
-   Branch: The branch in which the IaC misconfiguration was detected
    
-   Assigned To: The person or team responsible for addressing the issue
    
-   Creation Date: The date when the issue was detected
    

For more information about IaC misconfiguration, refer to Infrastructure as Code (IaC) misconfiguration scanner.

Secrets

The Secrets tab displays an inventory of exposed Secrets in the IaC asset.

The table includes the following exposed properties. Click on the Table Settings Menu for additional properties.

-   Severity level: Indicates the level of severity of the exposed Secrets
    
-   Issue Name: The Secrets identifier
    
-   Branch: The branch in which the secret was detected
    
-   Assigned To: The person or team responsible for addressing the Secrets
    
-   Backlog Status: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability)
    
-   Creation Date: The date when the Secrets were initially detected
    

For more information about Secrets, refer to Secrets scanners.