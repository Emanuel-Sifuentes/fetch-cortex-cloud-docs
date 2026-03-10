---
title: "Software Composition Analysis (SCA ) scanners"
tocId: "7hTa8_dD1hheV16kcgBP1w"
contentId: "y71TYL1ASOKO5ivBhwChCA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Software-Composition-Analysis-SCA-scanners"
depth: 1
---

# Software Composition Analysis (SCA ) scanners

Cortex Cloud Application Security SCA scanners inspect and manage the security and compliance of your application's open-source and third-party dependencies. They are part of the Cortex Cloud shift-left security strategy, enabling organizations to proactively identify and mitigate risks associated with external code components early in the development lifecycle.

Currently, support for SCA is limited to static analysis, meaning that only direct dependencies are scanned. However, if lock files are present, support is extended to include the analysis of transitive dependencies as well.

## SCA use cases

SCA provides a comprehensive approach to securing your software supply chain by enabling you to achieve these objectives:

-   **Gain comprehensive visibility into Software Composition**: SCA tools build a complete inventory of all open-source packages and their dependencies, providing critical insight into your software's entire composition. This unified view helps you understand and manage your overall software supply chain. Refer to Software packages as assets for more information
    
-   **Improve application code security and prioritizing remediation**: SCA scans identify critical vulnerabilities and prioritize remediation efforts based on a data-driven risk assessment that combines code-level vulnerabilities and potential business impact
    
-   **Enable informed decisions about external code**: By providing detailed insights into vulnerabilities, licenses, and operational risks, SCA empowers development and security teams to make informed decisions about the use, update, or replacement of external code components
    

SCA achieves these objectives by performing the following core functions:

-   **Identify known vulnerabilities (CVEs)**: Automatically detect and flag known security vulnerabilities (tracked as Common Vulnerabilities and Exposures or CVEs) present in your open-source and third-party dependencies. This provides crucial insights into potential weaknesses that could be exploited
    
-   **Assess license compliance**: Manage open-source license obligations and identify potential compliance risks introduced by your application's components. This helps you adhere to regulatory requirements and minimize legal and compliance exposure
    
-   **Detect Package Operational Risks**: Evaluate the operational health and potential long-term risks of open-source packages, such as assessing their popularity, maintenance status (such as outdated or unmaintained components), and deprecation status. This allows you to proactively manage threats from abandoned or insecure components