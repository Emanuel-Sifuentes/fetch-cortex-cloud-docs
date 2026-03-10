---
title: "In-depth repository asset information"
tocId: "BjSRQuctyTELnyGn_66d5w"
contentId: "KrLEl332B~euNlTrSNjsjw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/In-depth-repository-asset-information"
depth: 2
---

# In-depth repository asset information
Click an asset in the inventory table to open its side card, providing in-depth information organized into several tabs. The Overview tab (default display) offers highlights and a general summary. Additional contextual tabs provide specific details, including a Code to Cloud tab (providing context on the asset's path to production), an Applications tab (displaying the applications associated with this asset), and tabs focusing on specific issue types detected within the asset, such as Secrets and Vulnerabilities.

**Repository asset summary**

The repository asset summary, displayed at the top of the card, provides concise details about the repository, including the organization and repository and the version control system to which it belongs.

Overview

The Overview tab summarizes repository highlights, properties and scan information.

**Highlights** provide key security and operational insights related to the repository:

-   Critical/ High issues: An aggregation of critical and high issues discovered within the repository assets across all scan types (IaC, Secrets, SCA) as well as ingested third party SAST findings. Selecting this field redirects to the main issues table, filtered by the repository and its critical and high issues
    
-   Deployed: Whether the repository is deployed
    
-   Public: Whether the repository is public
    
-   **Risk summary**: The amount of cases, issues and findings associated with the repository, including their severity. Selecting cases or issues redirects to their respective main pages, automatically filtered by the repository, where you can view more detailed information
    
    For more information about issues and findings, refer to Cortex Cloud Application Security code scannersCortex Cloud Application Security code scanners
    
-   **Visibility timeline**: When the repository issues were first and last detected
    

**Properties**:

-   Asset details, including the Asset Id, Asset Category, Asset Group and Account ID associated with the repository
    
-   Repository details: Provides information about the repository. This includes the provider (such as a version control system hosting the repository, for example as GitHub), the scanned branch, the programming languages or technologies used within the repository (such as Terraform), its visibility configuration (public or private), whether it's exposed to the internet, archived, the timestamp of the last commit, and a list of owners
    

**Scan information**

A list of scans conducted on the repository. Details include the scan type (Periodic, CI, PR), the specific branch of the package that was scanned, the timestamp of the last scan, the health status of the scan (Completed, Failed, Partially, In progress), and the PR/CI status of the scan (Passed, Failed).

For more information about scan management, refer to Overview.

The Highlights section and other asset properties only display attributes when their corresponding indicators are present. For example, if an asset is not deployed, its deployment-related attributes will not show up; similarly, if there are no detected issues, those highlights or properties will not appear.

Code to Cloud

The Code to Cloud tab describes the integrated flow of a selected Infrastructure as Code (IaC) asset, from development to its deployed state. The graph visualizes the path to production, showing the IaC resource's journey from the repository node where it's hosted, through the CI/CD system, and finally to the traced runtime resource it provisions.

For more information on Cortex Cloud Code to Cloud, refer to Code to Cloud.

Applications

The Applications tab provides an overview of the applications associated with the repository, including a graphical representation of their path to production, which incorporates the repository role within the workflow.

For more information about applications, refer to Applications.

Vulnerabilities

The Vulnerabilities tab provides a list of vulnerabilities identified within the repository in your environment. Each vulnerability includes details regarding its severity level, associated CVE identifier, CVSS score, initial detection date, and assigned team member or group responsible for remediation.

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

IaC Configurations

The IaC Configurations tab displays an inventory of IaC misconfiguration across all repository assets.

The table includes the following default properties. Click on the Table Settings Menu for additional properties.

-   Severity level: Indicates the level of severity of the IaC misconfiguration
    
-   Issue Name: The IaC misconfiguration identifier
    
-   Asset Name: The name of the IaC resource in which the misconfiguration occurred. Selecting this attribute displays the asset side card without having to navigate away from the Repository page
    
-   Branch: The branch in which the IaC misconfiguration was detected
    
-   Assigned To: The person or team responsible for addressing the issue
    
-   Creation Date: The date when the issue was detected
    

For more information about IaC misconfiguration, refer to Infrastructure as Code (IaC) misconfiguration scanner.

CI/CD Configuration

The CI/CD Configuration tab includes a table with the following exposed properties, listing CI/CD Risks. Click on the Table Settings Menu for additional properties.

-   Severity level: Indicates the level of severity of the risk
    
-   Name: The risk identifier
    
-   Asset Name: The asset in which the risk was detected
    
-   Description: A description of the risk
    
-   Asset Category: The asset category associated with the risk
    

Secrets

The Secrets tab displays an inventory of Secrets detected within the repository.

The table includes the following exposed properties. Click on the Table Settings Menu for additional properties.

-   Severity level: Indicates the level of severity of the exposed Secrets
    
-   Issue Name: The Secrets identifier
    
-   Branch: The branch in which the secret was detected
    
-   Assigned To: The person or team responsible for addressing the Secrets
    
-   Backlog Status: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability)
    
-   Creation Date: The date when the Secrets were initially detected
    

For more information about Secrets, refer to Secrets scanners.

Package Integrity

The Package Inventory tab provides details about the popularity and maintenance of packages identified within the repository. It also includes an inventory of package operational risk issues and license issues, offering a comprehensive view of the package's overall health and compliance.

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

Code Weaknesses

The Code Weaknesses tab provides an inventory of ingested SAST (Static Application Security Testing) CWEs (Common Weakness Enumerations) identified within the repository. Each CWE is listed with its corresponding severity level, allowing you to prioritize remediation efforts based on the potential impact on the repository's security posture.

The CWE table includes the following properties. Click on the Table Settings Menu for additional properties.

-   Severity level: Indicates the level of severity of the CWE issue
    
-   Name: The CWE identifier
    
-   Branch: The branch of the codebase where the asset with the code weakness is located
    
-   Backlog Status: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability)
    
-   Assigned To: The person or team responsible for addressing the CWE issue
    
-   Creation Date: The date when the CWE issue was detected
    

For more information about about third party code weaknesses, refer to Manage code weaknesses.