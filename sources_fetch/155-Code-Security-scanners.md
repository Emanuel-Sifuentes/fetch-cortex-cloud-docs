---
title: "Code Security scanners"
tocId: "zG0madsYaTqN4t35_7uCcQ"
contentId: "1L5sdYDR9TYPro8oNkiGZg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Code-Security-scanners"
depth: 1
---

# Code Security scanners
The Code Security module provides automated, native scanning tools designed to enhance the security posture of your applications and infrastructure. Integrating these scanners into your development workflow facilitates a "shift-left" approach to security, enabling the proactive identification and remediation of vulnerabilities early in your software development lifecycle (SDLC).

The module includes both native scanners and the capability to ingest data from third-party scanners, giving you comprehensive visibility into your security posture.

Code Security scanners include:

-   **Software Composition Analysis** (SCA) scanners: Modern applications frequently incorporate numerous open-source and third-party packages. Code Security SCA scanners automate the inspection of these dependencies. They identify known vulnerabilities (tracked as CVEs), assess license compliance to mitigate legal risks, and detect package operational risks such as outdated or unmaintained components. This provides critical insight into your software's complete composition, enabling informed decisions about external code. For more information refer to Software Composition Analysis (SCA ) scanners
    
-   **Secrets** scanner: The accidental exposure of sensitive credentials—including API keys, passwords, or tokens—within source code or configuration files represents a significant security risk. The Code Security module secrets scanner detects hardcoded secrets across your repositories and code. Early identification of these exposures prevents unauthorized access and potential data breaches. For more information refer to Secrets scanners
    
-   **Infrastructure as Code** (IaC) scanners: Analyze your infrastructure configuration files prior to deployment to detect misconfigurations, insecure defaults, and compliance violations, thereby preventing the introduction of vulnerabilities into your operational environments. For more information refer to Infrastructure as Code (IaC) misconfiguration scanner
    

In addition to the native code security scanners, Cortex Cloud Cloud ingests data from third-party scanners. This allows you to consolidate your security findings and manage them all within a single platform for a holistic view of your security posture. For more information about third party scanners, refer to Ingest third-party data sources