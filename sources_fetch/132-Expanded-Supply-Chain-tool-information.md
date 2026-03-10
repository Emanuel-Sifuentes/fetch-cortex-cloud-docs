---
title: "Expanded Supply Chain tool information"
tocId: "2N6TW12_HzYFOSQ2LUIf9A"
contentId: "9~uarqyk_JBqTEHJgcarjg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Expanded-Supply-Chain-tool-information"
depth: 3
---

# Expanded Supply Chain tool information
When you click a tool's entry in the inventory table, a side card will open to display detailed information. The information is organized into three tabs: the Overview tab, which provides a summary of the tool's key details and is the default view; the Vulnerabilities tab, which lists any associated security vulnerabilities (CVEs); and the Actions tab, which outlines available mitigation options for the tool.

Overview

The Overview tab includes these details:

-   Name: The name of the tool
    
-   Description: A description of the tool usage and a link to its third-party origin, such as a public repository, documentation portal, or the vendor's official website
    
-   **PAN insights**: Cortex Cloud mitigation recommendations based on risk factors to address relevant supply-chain threats
    
-   **Timestamp**: When the tool was initially detected
    
-   Category: The tool type, such as code scanning and analytics
    
-   Usage: The amount of assets using this tool
    
-   Status: The current status of the tool. Values include Approved, Pending Review, Rejected. You can manually override the system-assigned status
    
-   Approve / Reject: Approve or reject the tool.
    
    **Note**
    
    **AppSec Admin** user permissions are required to perform these actions.
    
-   **Execution environments**: A list of execution environments associated with the tool. Details include: name, the number of assets using the tool and the scan type
    

Usage

The Usage tab provides a list of the execution environments associated with the tool. Details include

-   The asset name in which the tool runs (such as a pipeline). Selecting the name opens the asset in a side-car without having to navigate to the dedicated Assets page
    
-   The type of asset, such as CI/CD pipeline, CI/CD instance, or Organization (for VCS Apps)
    
-   Evidence of the tool in the environment - the location of the file containing the tool
    
-   When the tool was initially detected.
    

## Vulnerabilities

The **Vulnerabilities** tab is displayed whenever one or more tools has a risk factor that is a result of a Common Vulnerability and Exposure (CVE). This tab provides a consolidated list of all CVEs impacting the tools. The table includes these properties:

-   Name. The unique identifier for the CVE entry. For example, CVE-2023-25764. This name is a clickable link that directs you to a detailed report on the vulnerability from a public database
    
-   CVSS Score. The numerical score assigned to the vulnerability based on the Common Vulnerability Scoring System (CVSS). This score indicates the severity of the vulnerability, with a higher number representing a greater risk
    
-   Asset: The specific asset affected by the CVE
    

## Comments

Select the Comments icon in the side-panel to add comments directly to catalog items, enabling collaboration and internal notes between security and development teams regarding component usage, justification, or deprecation status.