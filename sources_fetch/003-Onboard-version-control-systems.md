---
title: "Onboard version control systems"
tocId: "jKl2jy1lURr0yq_CcgXuKw"
contentId: "FaUp8354JADsZEsCclA56A"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Onboard-version-control-systems"
depth: 1
---

# Onboard version control systems
Connect Cortex Cloud Application Security with your version control systems (VCS) to gain comprehensive visibility into, and monitor, the systems, technologies, configurations, and pipelines that make your VCS platform.

These integrations trigger both periodic scans and scans on pull requests (PRs) via a webhook, enabling security scans to identify and remediate Infrastructure-as-Code (IaC) misconfigurations, exposed secrets and license non-compliance in your VCS environment. Scan results are displayed directly in PR comments and reports, allowing you to analyze, prioritize and fix issues as soon as they are detected.

**Note**

Cortex Cloud Application Security (which includes IaC and Secrets scanning), is an add-on to a license (such as Posture Security) that must be purchased separately.

## Supported VCS data sources

Cortex Cloud Application Security currently supports the following VCS data source integrations:

-   AWS CodeCommit
    
-   Azure DevOps
    
-   Bitbucket CloudBitbucket Cloud
    
-   Bitbucket Data Center
    
-   GitHub Cloud
    
-   GitHub Enterprise (On-Prem)
    
-   GitLab SaaS
    
-   GitLab Self Managed (On-Prem)
    

Each integration requires a unique set of permissions and subscribed events.

## How to onboard a VCS data source

VCS data sources are listed in the Cortex data source catalog.

1.  Navigate to Settings → Data Sources & Integrations → \+ Add New → Show More → Code Repositories.
    
    **Tip**
    
    Navigate to Settings → Data Sources & Integrations → \+ Add New → and enter your VCS data source in the search bar.
    
2.  From the search results, select a data source and follow the instructions in its configuration wizard to complete the settings configuration process.
    
    **Note**
    
    **Disclaimer**: When onboarding with third-party data sources, we outline the required steps for setup, but we do not monitor these external resources, and they may change over time. Always refer to the relevant third-party documentation for the most current integration steps.
    

## Onboard an additional data source instance

To onboard an additional data source instance:

1.  On the Data Sources & Integrations page, select an integration from the table and click Add Instance.
    
2.  Complete the onboarding through the configuration wizard.
    

## Verify data source connectivity status and connected repositories

You can verify the connectivity status of data source instances and their connected repositories through one of these methods:

-   Navigate to Settings → Data Sources & Integrations. This page displays all data sources with their connected instances, including connectivity status and additional instance details.
    
-   When browsing the Data Source catalog, click a data source to view its details.
    

## Manage VCS instances

You can manage VCS data source instances. Hover over an instance and right-click to access the following actions:

1.  Select Settings → Data Sources & Integrations.
    
2.  Click a data source to see a list of its connected instances.
    
3.  Hover over an instance and right-click to access the following actions:
    
    -   Details: View details of the data source instance, including a list of connected repositories and organization, connectivity status, last scan date, and when initially connected.
        
    -   Edit instance: Opens the Select Repositories step of the integration wizard, allowing you to edit connected repositories. You can also edit the instance configuration by navigating back to the previous step of the wizard and modifying relevant details
        
    -   Delete instance: Deletes the entire instance
        
    -   Remove a connected repository: Right-click on a repository in the list, and click Remove Repository
        
    

## Manage findings and issues

For information about managing findings detected after onboarding data sources, and issues generated from findings refer to Code Security scanners.