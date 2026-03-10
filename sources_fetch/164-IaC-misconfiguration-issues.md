---
title: "IaC misconfiguration issues"
tocId: "itINgOfxdOcMBlLJAn9ljw"
contentId: "_AGUnTO6X3Y6Fwd_SdPttQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/IaC-misconfiguration-issues"
depth: 2
---

# IaC misconfiguration issues
All Critical and High IaC misconfiguration findings detected in an organization's environment are categorized as issues, which represent the smallest unit for remediating IaC resource misconfigurations. Where applicable, both manual and automated fixes are provided to resolve these issues.

The IaC misconfiguration Issues table is a filtered instance of the broader Issues table found under Cases & Issues, meaning it exclusively displays issues categorized as IaC misconfigurations. The IaC misconfiguration Issues table only displays issues generated from findings detected during periodic scans. In contrast, the comprehensive Issues table includes all IaC misconfiguration issues, regardless of their detection source, such as periodic, pull request (PR), and continuous integration (CI) scans.

## How to access IaC misconfiguration issues

To access IaC misconfiguration issues, under Modules, select Application Security → Issues → IaC misconfiguration.

**Tip**

You can also view IaC misconfiguration issues in dedicated tabs under other sections when available:

-   In code Asset inventories, navigate to Inventory → All Assets → Code:
    
    -   On the Configuration tab under _Repository assets_. Refer to In-depth repository asset information for more information
        
    -   Under the All Code asset inventory: Select an asset from the table → click the Configuration tab
        
    
-   In Application asset inventories, when an application includes an IaC asset that includes a detected misconfiguration: navigate to Inventory → All Assets → Applications → select an option from the Applications menu → select an application from the inventory → Configurations
    
-   Under Cases and Issues; perform a query. Select Issues → AppSec Issues (under the All Domains menu) → IaC Scanner (as the Detection Method value)