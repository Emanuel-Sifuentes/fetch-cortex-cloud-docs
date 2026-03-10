---
title: "Package Integrity"
tocId: "Aznh1~kr3hzzoiiZu_~JDQ"
contentId: "DlK4sTWewbN484j12yxfrQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Package-Integrity"
depth: 2
---

# Package Integrity
Package Integrity (also referred to as Package Operational Risk) assesses the operational risk and potential impact of each package in your codebase by examining package maintainer and popularity factors, and other relevant metrics. This analysis results in open-source package operational risk severity levels being categorized into High, Medium and Low. By prioritizing risks based on these categories, you can effectively focus remediation efforts on the most critical issues.

The Package Integrity issues and findings tables are filtered views of the main issues and findings tables under Cases & Issues, dedicated solely to issues and findings categorized as package operational risks and detected during periodic scans.

The following table defines the operational risk metrics used to assess open-source packages.

| Metric | Property |
| --- | --- |
| Maintainer | Level: Indicates the level of maintenance based on various computed factors |
| — | Versions |
| — | Last release |
| — | Last commit |
| — | Created |
| — | Open issues |
| — | Open pull requests |
| Popularity | Level: Indicates the level of popularity based on various computed factors |
| — | Weekly downloads |
| — | Number of stars |
| — | Number of forks |
| — | Contributors |

## Limitation

Package Operational Risk relies on metadata from the package’s associated GitHub repository (such as activity, popularity, deprecation status). If the package manager entry does not include a valid GitHub repository URL, operational risk data may be unavailable for that package. 

## Package Operational Risk policy enforcement

You can create policies to automatically detect and prevent the introduction of operational risks. These policies ensure that all third-party dependencies align with your organization's security standards and risk tolerance, helping you maintain a secure software supply chain. For more information about creating policies, refer to Create Cortex Cloud Application Security policies.