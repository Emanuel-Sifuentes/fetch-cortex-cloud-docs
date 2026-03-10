---
title: "In-depth software package asset information"
tocId: "WN3jES_owtXZqWUe~2CXLg"
contentId: "gsBYQ8Hwi3SbNhIq86p1Hg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/In-depth-software-package-asset-information"
depth: 2
---

# In-depth software package asset information
Click an asset in the inventory table to open its side card, providing in-depth information organized into several tabs. The Overview tab (default display) offers highlights and a general summary. Additional contextual tabs provide specific details, including a Code to Cloud tab (providing context on the asset's path to production), an Applications tab (displaying the applications associated with this asset), and tabs focusing on specific issue types detected within the asset, such as Secrets and Vulnerabilities.

## Software package summary

The software package asset summary, displayed at the top of the card, provides concise details about the asset's key attributes, including the package name and originating package manager.

Overview

The Overview tab summarizes software package package highlights and properties.

**Highlights** include:

-   Critical/High issues: An aggregation of critical and high vulnerability issues associated with the package. If the package has a single issue, selecting it opens the issue side panel in place; if multiple issues exist, you're redirected to the main Issues table in a new tab, displaying only the issues associated with that package
    
-   New: Indicates whether the package was first detected in your environment during the past 30 days
    
-   Root: Indicates whether this package is the top-level package within its dependency tree, meaning it is not a dependency of any other package within the project
    
-   Deprecated: Whether the package was officially deprecated by its maintainers. This indicates that it is no longer recommended for use and could potentially include security risks
    
-   **Risk summary**: The amount of vulnerabilities associated with the package grouped by category (cases, issues and findings) and their severity. For more information about OSS package vulnerabilities, refer to OverviewOverview
    
-   **Visibility timeline**: When the package vulnerabilities were first and last detected
    

**Properties**:

-   Asset details, including Asset Id, Asset Types and Asset Groups associated with the package
    
-   **Applications**: Lists the applications that include this package as part of their defined assets or configurations. See Application below for more details
    
-   **Package source**: Includes details about the package origin, including its provider (such as PyPI, npm), the repository and branch hosting the package source code, the path to its primary file, the license under which it's distributed, its dependency type (direct or transitive), and a list of contributors
    
-   Scan information: A list of Software Composition Analysis (SCA) scans conducted on the package. Scan details include the name of the scanner used, the specific branch of the package that was scanned, the timestamp of the last scan, and the overall status of the scan (such as completed or failed).
    
    For more information about scan management, refer to Overview.
    

The Highlights section and other asset properties only display attributes when their corresponding indicators are present. For example, if an asset is not deployed, its deployment-related attributes will not show up; similarly, if there are no detected issues, those highlights or properties will not appear.

Code

The Code tab identifies the package's location within your codebase by providing the repository, file path, and specific line number. Additionally, it presents the package's dependency tree, viewable as either a graph or a hierarchical list, presenting its relationships with other components.

Code to Cloud

The Code to Cloud tab visually represents the software development lifecycle (SDLC), focusing on the package's role in the path to production. The graph describes the links between the repository node hosting the package, the pipeline, image, and cluster.

For more information on Cortex Cloud Code to Cloud, refer to Code to Cloud.

Applications

The Applications tab provides an overview of the application associated with this package, including a graphical representation of its path to production, which incorporates the package's role within the workflow.

For more information about applications, refer to Applications.

Vulnerabilities

The Vulnerabilities tab provides a list of vulnerabilities identified within the package in your environment. Each vulnerability includes details regarding its severity level, associated CVE identifier, CVSS score, initial detection date, and assigned team member or group responsible for remediation.

The table includes the following default properties. Click on the Table Settings Menu for additional properties.

-   Severity: The vulnerability severity level
    
-   Issue Name: The CVE identifier
    
-   Asset Name: The asset in which the vulnerability was detected. Selecting this attribute displays the asset side card without having to navigate away from the Repository page
    
-   Branch: The branch in which the vulnerability was detected
    
-   CVSS Score: The Common Vulnerability Scoring System score that quantifies the severity of the vulnerability
    
-   Assigned To: The person or team responsible for addressing the vulnerability
    
-   Dependency Type: Indicates whether the dependency is direct (explicitly declared in your project) or transitive (pulled in by one of your other dependencies)
    
-   Backlog Status: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability)
    
-   Creation Date: The date when the vulnerability was detected
    

For more information about SCA vulnerabilities, Software Composition Analysis (SCA) vulnerability issues

Package Integrity

The Package Inventory tab provides details about the popularity and maintenance of packages identified within your SDLC. It also includes an inventory of package operational risk issues and package license issues, offering a comprehensive view of the package's overall health and compliance.

The License Issue table includes the following properties. Click on the Table Settings Menu for additional properties.

-   **Severity** level: Indicates the level of severity of the package license miscompliance
    
-   Issue Name: The package license miscompliance identifier
    
-   License Name: The name of the license associated with the package. This indicates the specific license agreement that is potentially being violated
    
-   Asset Name: The name of the asset that uses the package with the license miscompliance. This identifies where the license issue occurs
    
-   Branch: The branch of the codebase where the asset with the license issue is located
    

The Operational Risk Issues table includes the following properties. Click on the Table Settings Menu for additional properties.

-   Severity: Indicates the level of severity of the package operational risk
    
-   Issue Name: The package operational risk identifier
    
-   Asset Name: The name of the asset that uses the package with the package operational risk
    
-   Branch: The branch of the codebase where the asset with the package operational risk is located
    
-   Assigned To: The person or team responsible for addressing the package operational risk
    
-   Creation Date: The date when the package operational risk was initially detected
    

For more information on Package Operational Risks, refer to Package Integrity.