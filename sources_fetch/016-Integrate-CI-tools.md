---
title: "Integrate CI tools"
tocId: "1U_kqG~PCOTCL1MCoaEnOw"
contentId: "xHT0KpDUZdtwW_4irvxYEA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Integrate-CI-tools"
depth: 1
---

# Integrate CI tools
By integrating CI tools, you get two main benefits: code scans and streamlined security workflows. This is achieved by inserting code snippets directly into your existing CI workflows, which then use the Cortex CLI to trigger automated security checks. This integration enables the platform to scan and detect exposed secrets, misconfigurations in your infrastructure-as-code (IaC) files, vulnerabilities in your Software Composition Analysis (SCA) packages and license non-compliance within your CI/CD pipelines.

You can integrate your CI tools and systems through the platform wizard or by directly adding a code snippet to your pipelines in supported systems.

## Integrate CI tools via the tenant UI wizard

Cortex Cloud Application Security supports the following CI tools for onboarding via the UI wizard:

-   AWS CodeBuild
    
-   CircleCI for code scans (For CircleCI CI/CD pipeline scans, refer to CI/CD)
    
-   Cortex CLI. For information about using the Cortex CLI, refer to Cortex CLICortex CLI
    
-   GitHub Actions
    
-   Jenkins for code scans (For Jenkins CI/CD pipeline scans, refer to CI/CD)
    
-   Terraform Cloud (Run Tasks)Terraform Cloud (Run Tasks)
    
-   Terraform Enterprise (Run Tasks)Terraform Enterprise (Run Tasks)
    

### Manage CI Tools

To access CI tool management, navigate to Settings → Data Sources & Integrations → hover over a CI tool → View Details.

You can perform the following actions on CI tools:

-   **Delete an instance**: Right-click on an instance of the CI tool → Delete instance → Delete
    
-   **Remove a connected repository**: Select an instance of the CI → right-click on a repository → Remove Repository
    
-   **Select the repository branches** to be scanned: Select an instance of the CI → right-click on a repository → Set Scanned Branches → select a branch/multiple branches → Save
    
-   Perform a **manual scan** of the repository: Select an instance of the CI → right-click on a repository → Scan Repository