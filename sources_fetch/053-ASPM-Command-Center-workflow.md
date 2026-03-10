---
title: "ASPM Command Center workflow"
tocId: "IbabDlEMeB~ENLrgM17~pw"
contentId: "HO5pa8eyp43t9AlQ5h8WYA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/ASPM-Command-Center-workflow"
depth: 2
---

# ASPM Command Center workflow
The ASPM Command Center is designed to provide a comprehensive, interactive, and actionable overview of your application security posture. It streamlines the complex journey of security findings from their origin, through prioritization and aggregation, to resolution, empowering you to maintain a strong application security posture.

The ASPM Command Center is an interactive graph that visually represents your application security workflow, moving from general data sources to a prioritization funnel, to specific, actionable cases. This visualization helps you quickly understand your security posture.

## Data sources and coverage

The first section of the graph focuses on your data sources, including both onboarded and third-party sources, categorized into CI/CD Pipelines and VCS & 3rd Party data sources. In this section interactive elements provide more detailed information:

-   **Data source overview**: Hovering over a data source provides a quick overview of its coverage
    
-   **Total coverage insights**: The More Coverage Details tab opens a dedicated Total Coverage page within the ASPM Command Center. This page displays the overall amount and percentage of each data source type out of your total, along with a granular breakdown of scanner coverage (SAST, SCA, Secrets, IAC), showing the same detailed metrics
    
-   **Increase coverage**: The Click to Increase Coverage link directs you to the AppSec Coverage page, which enables you to enhance your security coverage
    
-   **Issue count**: Each data source also displays the number of issues detected
    

## Prioritization and aggregation funnel

Clicking on the prioritization and aggregation part of the graph provides a dedicated view within the ASPM Command Center, displaying the security funnel. This page includes:

-   Issues: The initial volume of security issues
    
    **Note**
    
    Breakdown by type: Issues are further broken down by type (such as IAC or Secrets).
    
-   Open After Guardrails: The amount of issues that persist after being filtered by your security guardrails, including those blocked in PRs
    
-   Prioritized: Issues refined by parameters such as context, impact, probability, and issues not found in deployed applications
    
-   Cases generated: At the end of this funnel, the number of cases generated post-prioritization and aggregation are displayed, with a breakdown prioritized by application, type, and severity
    

## Case management

In the ASPM Command Center Overview page, the final section of the graph summarizes your cases: It displays the total count of open and closed cases. Open cases are further broken down by critical and high severity, alongside a summary of closed cases.