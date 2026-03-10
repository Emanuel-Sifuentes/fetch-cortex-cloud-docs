---
title: "Explore software package assets"
tocId: "UWyGPvPqrX_6FhgkrfUVjw"
contentId: "F_xVLphxQjRxLos3NIgpoA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Explore-software-package-assets"
depth: 2
---

# Explore software package assets
To access software package assets, under Inventory, select All Assets → Software Packages (under Code).

The Software Packages assets page includes a dashboard and an inventory.

## Software package dashboard

The dashboard includes two widgets:

-   Package Managers: A breakdown showing the package managers (such as npm and pip) in your environment, and the number of software packages found in each package manager
    
-   Dependency Types: A breakdown showing the amount of direct and transitive (indirect) software packages
    

Selecting an item in either widget filters the software package asset inventory accordingly.

## Software package asset inventory

The software package inventory table includes the following exposed attributes. Use the Table Settings Menu to view additional properties.

| Property | Description |
| --- | --- |
| Name | The specific identifier given to a software package |
| Version | The specific version or release of a software package |
| Licenses | The legal permissions or rights granted for the use of the software package. For more information about licenses, refer to Open-source software license categories |
| Operational Risk | The operational risk score assigned to the vulnerability. Refer to Package Integrity for more information about operational risks |
| Package Manager | Specifies the package manager (such as pip, npm, Maven) that installed and manages the software package and its dependencies |
| Dependency Type | Whether the package is a direct (a package that is explicitly listed as a requirement) or transitive (a package that is indirectly required by another package) dependency |
| Organization | The entity responsible for publishing or maintaining the software package |
| Repository | The repository containing the package's source code. Includes a link which opens the repository asset side car without having to navigate away from the Software Packages page |
| Provider | The platform (such as GitHub) hosting and supplying the software package |
| Branch | The scanned branch in which the vulnerability was detected |
| File Path | The location of the software package file in your environment |
| Business Application Names | The Business Applications using the software package. See Defining Business Applications for more information about Business Applications |
| First Observed | The initial sighting or detection of the software package |
| Last Observed | The last sighting or detection of the software package |