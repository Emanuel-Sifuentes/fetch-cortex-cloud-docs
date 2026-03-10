---
title: "Urgency"
tocId: "8JjtMO7LVdyEwBgCH3ITQQ"
contentId: "KOQPcRdw9Ui_h~iL9xhc3w"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Urgency"
depth: 1
---

# Urgency
Prioritize issues by Urgency, a context-aware metric to help you focus remediation efforts on the issues that pose the greatest real-world risk in your code. Unlike **Severity**, which is a static measure of an issue's technical risk, Urgency dynamically evaluates risk based on deployment context.

The Urgency enrichment highlights risks based on specific, high-impact factors:

-   **Deployment status**: Identifies issues actively deployed in production
    
-   **Runtime exposure**: Indicates deployed assets that are in use, exposed to the internet, or can be exploited to leverage privileged capabilities in case of an attack
    
-   **Data impact**: Flags deployed assets that can access sensitive data
    
-   **Business criticality**: Prioritizes issues impacting your most critical business assets
    

## How Urgency is calculated

Urgency is calculated as a dynamic risk score derived from **Probability** (likelihood of exploitation) and **Impact** (potential damage). It leverages multiple sources of data across your code-to-cloud environment:

-   **Applications**: Data from applications created in Cortex Cloud
    
-   **Runtime**: Data from deployed and running assets
    
-   **Code**: Findings from native Cortex Cloud Application Security scanners and ingested third party sources
    
-   **Risk metadata**: External threat context aggregated from third-party sources
    
-   **Asset metadata**: Contextual information associated with the asset where the finding was detected, including any enrichments. For example, a vulnerability is a finding on a software package, and its enrichment could include related repository data
    

For a detailed breakdown of the parameters defined by each scanner type, see Urgency metrics

## Urgency levels

-   Top Urgent: Requires immediate mitigation
    
-   Urgent: Mitigate as soon as possible
    
-   Not Urgent: Requires attention, but can be addressed within your organization SLA (Service Level Agreement)
    
-   Not Applicable: Includes two options:
    
    -   For periodic scans: Urgency has not yet been calculated and will be calculated in the next periodic scan
        
    -   Not calculated for PR (Pull Request) or CI (Continuous Integration) scans
        
    

## How Urgency appears in the tenant

**Persona and permissions**: This feature is designed for AppSec Admins, DevOps or Developer persona, and requires the View role under RBAC.

In Cortex Cloud Application Security, Urgency is applied to issues detected from CVE Vulnerabilities, Secrets, IaC Misconfigurations, and Code Weaknesses periodic scanners. It is displayed in the tenant as follows:

-   **Issue Inventory**: An Urgency column displays the urgency score assigned to the issue. You can filter by this column to focus on the most critical issues
    
-   **Issue side-card**: The Overview tab of an issue side panel displays a Urgency Details section, listing all the code-to-cloud data sources used to calculate the Urgency score. A code-to-cloud graph displays where the Urgency context was detected across your software development lifecycle
    

For more information on Urgency by type of scanner issue, refer to:

-   CVE vulnerabilities: Detailed vulnerability issue informationDetailed vulnerability issue information
    
-   Secrets: Detailed Secrets issue informationDetailed Secrets issue information
    
-   IaC misconfiguration: Detailed IaC misconfiguration issue informationDetailed IaC misconfiguration issue information
    
-   Code weaknesses: Detailed code weakness issue informationDetailed code weakness issue information