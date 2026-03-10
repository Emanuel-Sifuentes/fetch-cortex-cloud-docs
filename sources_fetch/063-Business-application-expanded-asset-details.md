---
title: "Business application expanded asset details"
tocId: "1tXN0F9SWJbZ6sNqG~dFbA"
contentId: "eJ3DFmQ5PNtsXGb2D0Hexg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Business-application-expanded-asset-details"
depth: 3
---

# Business application expanded asset details
Click an application in the inventory table to open its side card, providing in-depth information organized into several tabs. The Overview tab (default display) offers highlights and a general summary. Additional contextual tabs provide specific details, including a Topology tab (providing context on the application path to production), and tabs focusing on specific issue types detected within the asset, such as Secrets and Vulnerabilities.

Overview

The Overview tab summarizes application highlights, metadata and properties.

-   Highlights: Includes properties such as deployment status
    
-   **Visibility timeline**: When the application was first and last detected
    
-   Asset properties, including Asset Id, Asset Category, Asset Groups and associated with the application
    
-   Application risks:
    
    -   **Risk summary**: The amount of risks associated with the application assets grouped by category (cases, issues and findings) and their severity level. For more information about issues, refer to Cortex Cloud Application Security code scannersCortex Cloud Application Security code scanners
        
    -   Risk Score: A value representing the overall security risk of an application, based on various underlying metrics. This helps in assessing and prioritizing the application's security posture and potential vulnerabilities
        
    
-   Coverage: Evaluate the application security coverage via its scanned asset percentage
    
-   Business Criticality: As defined when creating the application. See How to manually build an application for more informationHow to manually build an application
    
-   Business Owners: The entity associated with the application
    
-   **Criteria**: The criteria used to create the application
    
-   Creation Method: Indicates if the application was created through a manual selection of assets or automatically (such as via automation or discovery)
    

Topology

The Topology tab visualizes your application's asset relationships across the entire software development lifecycle (SDLC). It maps interconnected assets including code repositories, pipelines, container images, and workloads, providing a comprehensive representation of the code-to-cloud journey. You can view the topology either as a visual representation or as an asset inventory by selecting the Graph or Inventory (default) tabs respectively.

**Note**

The topology graph is available only when all application components (code, pipeline, build and deploy), are configured.

## Topology graph

The graph displays the application path to production, organized into four key SDLC sections:

-   **CODE**: Displays source code repositories and VCS organizations, allowing you to understand code organization and repository structure:
    
    -   Providers: GitHub, GitLab, Azure Repos, Bitbucket
        
    -   Key relationships: Organizations contain repositories; repositories are forked from others
        
    
-   **BUILD**: Displays CI/CD pipelines, visualizing build processes and pipeline dependencies:
    
    -   Providers: GitHub Actions, GitLab CI/CD, Jenkins, Azure Pipelines, CircleCI
        
    -   Key relationships: Repositories trigger pipelines; pipelines build container images
        
    
-   **Deploy**: Displays container registries and image repositories, allowing you to track image lineage and registry organization:
    
    -   Providers: Docker Hub, Google Artifact Registry (GAR), Amazon ECR, Azure ACR
        
    -   Key relationships: Registries contain image repositories; pipelines build specific container images
        
    
-   **Run**: Displays runtime architecture, including compute, storage, networking, and identity assets, allowing you to understand runtime architecture and resource dependencies
    
    -   Assets: Kubernetes clusters/workloads, virtual machines, serverless functions, storage buckets, load balancers, and IAM policies
        
    -   Providers: AWS, GCP, Azure
        
    -   Key relationships: Images run on instances, workloads use service accounts, functions access storage buckets
        
    

**Navigating the graph**

Use the following controls to manage the view and investigate assets:

-   **Node actions**: Click any asset node to view basic details. Select View Details in the popup to open the asset side-car for comprehensive information without leaving the topology view
    
-   **Search and highlight**: Search for specific assets by name to highlight matching nodes and navigate directly to them in the graph
    
-   **Group nodes**: Toggle this to organize assets into logical clusters (such as Container Images), simplifying complex graphs. Click a group to expand it
    
-   **Layers**: Apply filters to view assets based on specific criteria, such as public internet exposure, related cases, or associated runtime events
    

**Filtering and layout options**

Customize the display to focus on relevant information:

-   **Section filtering**: Toggle visibility for specific SDLC sections (CODE, BUILD, DEPLOY, RUN) to isolate parts of the lifecycle
    
-   **Provider filtering**: Filter assets by cloud or VCS provider (such as Show only AWS or GitHub assets)
    
-   **Layout options**: Choose a visualization style:
    
    -   Hierarchical: Top-to-bottom flow (Code → Build → Deploy → Run).
        
    -   Force-Directed: Physics-based layout.
        
    -   Circular: Circular arrangement.
        
    

**Understanding relationships**

Edges connecting nodes represent specific interactions or dependencies, including:

-   **CONTAINS**: Hierarchical containment (such as Org → Repo)
    
-   **TRIGGERS**: Activation (such as Repo → Pipeline)
    
-   **BUILDS**: Creation (such as Pipeline → Image)
    
-   **RUNS ON**: Runtime execution (such as Image → Container Instance)
    
-   **USES/ACCESSES**: Resource usage or data access
    

**Common workflows**

-   **Investigate critical vulnerabilities**: Identify a critical CVE, locate the affected repository in the graph, and trace relationships forward to see if vulnerable versions are currently deployed as running instances
    
-   **Track Code to Cloud misconfigurations**: Identify IaC issues (code) and trace them to deployed cloud resources to ensure fixes are applied at the source to prevent future misconfigured deployments
    
-   **Audit secret exposure**: Locate repositories with privileged secrets and trace them to the DEPLOY or RUN sections to see if those secrets are active in production environments
    
-   **Understand application architecture**: Filter for the RUN section to identify runtime components, then trace back to source repositories to document deployment paths for compliance.
    

## Topology inventory

The Inventory table displays all assets associated with the business application. Selecting an asset opens its side card directly without having to navigate away to the dedicated asset inventory.

-   **Asset details**: Displays properties such as Name, Provider, Type, Region, and timestamps for First/Last Observed
    
-   **Risk context**: Includes breakdowns of associated cases, critical issues, and vulnerability severity
    
-   **Table controls**: Filter the table by property or adjust the table settings to add/remove columns
    
-   **Export** icon: Download the inventory as a `.tsv` file. See Export business application data for more information
    

Vulnerabilities

The Vulnerabilities tab displays SCA vulnerability issues detected across the application assets. This tab includes a a continuous funnel graph and a section detailing the riskiest repositories.

The graph displays the following vulnerability metrics, filtered by default for Critical and High severity:

-   All: The total amount of vulnerabilities detected in the application and its assets
    
-   Exploitable: The subset of total vulnerabilities that are exploitable
    
-   Fixable: The subset of total vulnerabilities that have an available fix
    
-   Deployed: The subset of vulnerabilities detected in deployed application assets
    

You can filter the graph to display any combination of severities (Critical, High, Medium, and Low). Selecting any stage of the funnel (such as Fixable) redirects you to the main Issues inventory, filtered to display vulnerabilities that that match the criteria you selected (for example, issues that have available fixes).

A known limitation is that only up to 4,000 issues will be displayed in the Issues inventory when redirecting from the graph, even if the count in a particular stage (such as Deployed) is higher.

The Riskiest repositories section lists the repositories with the highest risk, based on the number and severity of known vulnerabilities detected in the application. It also displays risk metrics such as whether the repository is deployed.

This section displays the following details for each repository:

-   VCS
    
-   Repository location
    
-   Branch
    
-   Last commit date
    

Selecting a repository from the list redirects you to the main Issues inventory, filtered to display all vulnerability issues for that specific repository. It includes the total number and a breakdown of issues by severity level.

Selecting the branch link opens that repository's asset side-card directly, allowing you to view more details without navigating away.

Configurations

The Configurations tab displays IaC misconfiguration issues detected across the application assets. This tab includes a graph and a section detailing top IaC misconfiguration rules.

The graph displays the following IaC misconfiguration metrics, filtered by default for Critical and High severity:

-   All: The total number of misconfigurations detected in the application and its assets
    
-   Fixable: The total number of misconfigurations that have an available fix
    
-   Deployed: The total number of misconfigurations detected in deployed application assets
    

You can filter the graph to display any combination of severities (Critical, High, Medium, and Low). Selecting any of these categories (such as Fixable) redirects you to the tenant's main Issues inventory. This page will be filtered to display all IaC Misconfiguration issues for this specific application that match the criteria you selected (for example, issues that have available fixes).

A known limitation is that only up to 4,000 issues will be displayed in the Issues inventory when redirecting from the graph, even if the count in a particular category (such as Deployed) is higher.

The Top IaC misconfiguration rules section helps you identify and focus on the most urgent issues by highlighting misconfigurations detected from a matching rule in both the source code and the deployed cloud environment. It includes the total number and a breakdown of issues by severity level.

Selecting one of these matching rule sets redirects you to the main Issues inventory, filtered to display all IaC misconfiguration issues detected by that specific IaC rule set.

Secrets

The Secrets tab displays exposed Secrets issues detected across the application assets. This tab includes a graph and a section detailing the Riskiest repositories.

The graph displays the following Secrets metrics, filtered by default for Critical and High severity:

-   All: The total number of Secrets detected in the application and its assets
    
-   Valid: The total number of detected Secrets that have been verified as active and functional
    
-   Privileged: The total number of Secrets that are valid and provide high-level access
    

You can filter the graph to display any combination of severities (Critical, High, Medium, and Low). Selecting any of these categories (such as Valid) redirects you to the tenant's main Issues inventory. This page will be filtered to display all Secrets issues for this specific application that match the criteria you selected (for example, issues that are validated).

A known limitation is that only up to 4,000 issues will be displayed in the Issues inventory when redirecting from the graph, even if the count in a particular category (such as Valid) is higher.

The Riskiest repositories section identifies the repositories with the highest risk, based on the number and severity of known Secrets detected in its assets. It includes the total number and breakdown of issues by severity level.

-   VCS
    
-   Repository location
    
-   Branch
    
-   Last commit date
    

Selecting a repository from the list redirects you to the main Issues inventory, filtered to display all Secrets issues for that specific repository.

Selecting the branch link opens that repository's asset side-card directly, allowing you to view more details without navigating away.

Code Weaknesses

The Code Weaknesses tab displays SAST code weakness issues detected across the application assets. This tab includes a graph and a section detailing the Riskiest repositories.

The graph displays the following code weakness metrics, filtered by default for Critical and High severity:

-   All: The total number of code weaknesses detected in the application and its assets
    
-   Labels: The total number of code weaknesses that are categorized by specific labels
    
-   Deployed: The total number of code weaknesses detected in deployed application assets
    

You can filter the graph to display any combination of severities (Critical, High, Medium, and Low). Selecting any of these categories (such as Deployed) redirects you to the main Issues inventory. This page will be filtered to display all Code Weakness issues for this specific application that match the criteria you selected.

A known limitation is that only up to 4,000 issues will be displayed in the Issues inventory when redirecting from the graph, even if the count in a particular category is higher.

The Riskiest repositories section identifies the repositories with the highest risk, based on the number, severity, and type of code weaknesses detected—including those deployed to production.

This section displays the total count and type of issues for each repository, along with:

-   VCS
    
-   Repository location
    
-   Branch
    
-   Last commit date
    

Selecting a repository item redirects you to the tenant's main Issues inventory, which is filtered to display all code weakness issues for that specific repository.

Selecting the branch link opens that repository's asset side card directly, allowing you to view more details without navigating away.