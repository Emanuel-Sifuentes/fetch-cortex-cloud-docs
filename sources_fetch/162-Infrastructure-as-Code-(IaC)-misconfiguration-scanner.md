---
title: "Infrastructure as Code (IaC) misconfiguration scanner"
tocId: "WLSSTF6Hn9gJXvcLn0jJCw"
contentId: "BY6Oi5eEPRjprD9RLHWtZQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Infrastructure-as-Code-IaC-misconfiguration-scanner"
depth: 1
---

# Infrastructure as Code (IaC) misconfiguration scanner

IaC scanners safeguard cloud infrastructure by identifying misconfigurations before deployment, preventing vulnerabilities in your operational environment.

IaC misconfiguration scanners safeguard your cloud infrastructure by identifying security risks in your infrastructure configurations before they are deployed.

By analyzing your infrastructure configuration files prior to deployment, IaC scanners help prevent the introduction of vulnerabilities into your operational environments.

## IaC use cases

-   **Proactive detection**: IaC scans identify and flag critical issues such as misconfigurations, insecure defaults, and compliance violations directly within your IaC templates. This includes detecting potential risks in files for various frameworks (see Supported frameworks and languages for supported frameworks)
    
-   **Issue remediation**: All Critical and High IaC misconfiguration findings are categorized as actionable issues. The platform provides both manual and automated fixes to resolve these issues, streamlining remediation efforts. Automated fixes for IaC misconfigurations can modify the configuration directly
    
-   **Integration and developer efficiency**: IaC scanning integrates seamlessly into development workflows. Findings can be detected locally using the Cortex CLI or directly within supported IDEs (Visual Studio Code, JetBrains) via plugins, providing real-time security feedback to developers as they write code. This helps developers fix problems early, reducing rework and accelerating secure development
    
-   **Policy enforcement**: You can create and apply custom policies and rules that define how the system responds to IaC threats, allowing for tailored security checks and automated actions such as blocking CI runs or pull requests based on detected misconfigurations