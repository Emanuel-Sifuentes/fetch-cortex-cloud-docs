---
title: "Coverage in the user interface"
tocId: "a8S2WlIP0wOnSBilnITKig"
contentId: "K5HaY4HbyoHdfUyXUOF2xg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Coverage-in-the-user-interface"
depth: 2
---

# Coverage in the user interface
To access Coverage, navigate to Modules, → Application Security → AppSec Coverage.

This interface offers a comprehensive overview of your application security coverage, presenting key metrics and visualizations related to application data sources, scanners, and guardrails. Interactive widgets provide a summary of your coverage. When you apply a filter through a widget, all data displayed on the dashboard, including the asset inventory, will dynamically reflect the selected filter criteria. The asset inventory provides detailed information about application assets in your SDLC for in-depth analysis of your security posture. You can also see all issues for specific assets by selecting them in the inventory table.

## Application-specific coverage

You can focus on the security posture of your critical business applications, allowing you to prioritize remediation efforts for your most important assets. To view application-specific data, select Add Filters → Applications → enter the unique application name as provided when creating it.

## Coverage by data source

This widget provides metrics based on the coverage of the data source such as version control systems (GitHub and so on), CI tools (Jenkins and so on), Repositories (JFrog) and third party data sources (such as Veracode). In addition, insights are provided, such as the amount of assets added recently or whether a data source is not connected.

## Coverage by status

This widget provides coverage metrics based on the percentage of scanned repositories out of the total amount of repositories. Values: scanned, partially scanned, unscanned.

## Coverage by scanner type

This widget provides metrics based on the coverage of the scan types, including code scanners (vulnerabilities, code weaknesses, secrets, IaC misconfigurations) and images (malware).

## Asset coverage inventory table

The asset coverage inventory table displays a list of assets. Table properties include:

| Property | Description |
| --- | --- |
| Asset Type | The type of asset scanned, such as repositories or container image repositories |
| Name | The name of the scanned asset |
| Applications | The type of applications associated with the asset |
| Scanners Data | Informations about the scanners that were applied to the asset. Upon hovering on the scanner, additional data the type of scanner and its status; enabled or disabled |
| Last scan status | The status of the last scan: Completed, not scanned yet, in progress and error |