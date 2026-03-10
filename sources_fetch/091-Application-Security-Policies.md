---
title: "Application Security Policies"
tocId: "OqAoJCAMxLFr4rw5mDBm9A"
contentId: "Gvo59KMWCsgZVgRVscJp4A"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Application-Security-Policies"
depth: 1
---

# Application Security Policies

AppSec policies define threat responses by setting conditions, scope, and actions. Use out-of-the-box policies or clone them to create custom ones.

An Cortex Cloud Application Security policies define how to respond to application security threats. The policy evaluates raw findings, such as CVE vulnerabilities or IaC misconfigurations detected by scanners, against defined conditions and scope to determine whether they should be raised as actionable issues. This keeps all scan data visible while ensuring that only findings that meet your risk criteria require action.

Cortex Cloud Application Security policies serve two primary functions:

-   **Detection**: Automating the creation of issues for specific security findings to prioritize remediation
    
-   **Prevention**: Blocking pull requests (PRs) or CI/CD builds that introduce security risks, ensuring threats are stopped before they reach production
    

## Use cases

-   **Automate workflows**: Automatically generate issues only when specific criteria are met, rather than for every raw scanner finding
    
-   **Enforce gates**: Block PRs or fail CI/CD pipelines when critical vulnerabilities or misconfigurations are detected
    
-   **Ensure compliance**: Enforce specific regulatory requirements such as PCI-DSS, HIPAA, or SOC2
    
-   **Prioritize risk**: Focus remediation efforts on high-impact issues by filtering out noise based on severity or context
    

## Policy types and categories

Policies are categorized based on their focus and their origin:

-   **By focus**:
    
    -   **Code security policies**: Address risks in the code-to-cloud workflow, including secrets, CVE vulnerabilities, IaC misconfigurations, and license violations
        
    -   **CI/CD configuration policies**: Scan the pipeline infrastructure itself (such as, GitHub Actions, Jenkins) to detect misconfigurations and risky settings in workflows
        
    -   **Drift detection policies**: Identify discrepancies between the desired infrastructure state defined in IaC templates and the actual runtime configuration of cloud resources to prevent unauthorized manual modifications and mitigate environmental drift
        
    
-   **By origin**:
    
    -   **Out-of-the-Box (OOTB):** Disabled by default. These Cortex Cloud Application Security\-provided policies pre-configured according to security best practices. The policies are immutable but can be cloned to serve as templates for custom configurations
        
    -   **AI Guardrails:** AI-driven policy recommendations generated through the analysis of historical security findings and organizational patterns to optimize detection accuracy
        
    -   **Custom Policies:** User-defined policies tailored to meet specific organizational requirements or unique infrastructure environments
        
    

## Core components

Cortex Cloud Application Security policies are built around core components, Conditions, Scope, Triggers, and Actions, that define their logic and execution. For a detailed explanation of each component, to Create Cortex Cloud Application Security policies.