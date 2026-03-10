---
title: "Onboard Data Sources"
tocId: "ETWx0blOOa6EU1RqzcxDZA"
contentId: "XeWGHrZ5f9GPhdytDvHJgg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Onboard-Data-Sources"
depth: 0
---

# Onboard Data Sources

Onboard VCS, integrate CI tools, registries and ingest third-party data for a comprehensive view of your application and supply chain security.

Onboard your Version Control Systems (VCS), integrate your CI tools, private registries (currently JFrog Artifactory), and ingest third-party data from external vendors, to gain a comprehensive view of your application and supply chain security.

## Onboard VCS systems

By onboarding your VCS systems, you gain complete visibility into your repositories and pipeline assets and out-of-the-box CI/CD system capabilities.

-   **Visibility**
    
    -   **Asset mapping and inventory:** All repositories and their associated pipeline assets (such as GitHub Actions) are mapped, creating a complete inventory of your environment. This includes discovering forgotten or unauthorized devices and their connections
        
    -   **Vulnerability management:** The inventory allows you to identify and prioritize security vulnerabilities since you can't secure what you don't know exists
        
    -   **Compliance and auditing:** It provides the necessary data and logs to prove compliance during audits
        
    -   **Attack surface understanding:** It helps you understand and manage your potential attack surface
        
    
-   **CI/CD system capabilities**: Onboarding a VCS automatically integrates with specific CI/CD systems, triggering automated scans that identify supply chain security risks within your pipelines. For more information see Onboard CI/CD systems below
    

To onboard VCS systems, refer to Onboard version control systems.

## Onboard CI/CD systems

You can onboard CI/CD systems to scan for configuration threats in your organization's instance, pipelines, and individual repositories. While onboarding supported version control systems includes out-of-the-box CI/CD capabilities, you must explicitly onboard CircleCI and Jenkins to get code scanning for these systems. Onboarding CI/CD systems provides the following scans.

-   **Organization instance configuration threats:** This type of scan detects security issues at the level of the overall organization's instance of a version control system (VCS), such as GitHub. For example, it can flag risks such as **Project webhook SSL verification disabled** or **Variable is not scoped to an environment**.
    
-   **Pipeline configuration risks:** This scan identifies security risks within the configuration of your pipelines. Examples of risks it detects include **Excessive GitHub Action permissions, using an unpinned container image in a pipeline**, or **CI instance accesses cloud provider using insecure long-term credentials**
    
-   **Repository configuration issues:** This scan checks problems with the settings and configurations of individual code repositories. Examples include **Forking of a private repository is allowed** and **A change in settings so that a review is no longer required before merging code**
    

To onboard CI/CD systems, refer to Onboard CI/CD systems.

## Integrate CI tools to enable code scans through Cortex CLI

By integrating CI tools, you get two main benefits: code scans and streamlined security workflows. This is achieved by inserting code snippets directly into your existing CI workflows, which then run through the unified Cortex CLI to trigger automated security checks.

-   **Code scans**:
    
    -   **Code scanning for IaC (Infrastructure as Code):** Finds misconfigurations in your IaC files, ensuring your cloud and infrastructure environments are secure from the start
        
    -   **Software Composition Analysis (SCA) scans:** Identify vulnerabilities in open-source libraries and third-party components, along with license misconfigurations and package integrity issues
        
    -   **Secrets detection:** Finds hardcoded secrets, such as API keys and passwords, in your code and pipelines to prevent unauthorized access and data breaches
        
    
-   **Streamlined workflows:** By integrating security scans directly into your CI/CD pipelines, you achieve a shift-left security model, moving security from a final check to an early, continuous process within the development lifecycle.
    
    -   **Early threat detection:** You can identify and fix security threats as soon as they are introduced
        
    -   **Automated and seamless integration:** The use of code snippets and a unified CLI makes the security checks a seamless part of your existing CI process, requiring no manual intervention
        
    

To integrate CI tools through code snippets, refer to CLI pipeline code snippets

## Integrate with JFrog Artifactory

Integrate with JFrog Artifactory to provide the Cortex Cloud Application Security SCA scanner direct access to packages stored in Artifactory, a private registry. This access allows the scanner to retrieve dependency metadata and package contents, enabling full visibility, accurate dependency trees, and reliable detection of supply-chain vulnerabilities.JFrog Cloud Artifactory (SaaS)

## Ingest third-party data

-   **Expanded security coverage:** While Cortex Cloud Application Security provides robust native scanning, ingesting data from other security tools (such as SAST) expands your overall coverage. This creates a more comprehensive security profile, leaving no potential vulnerabilities unmonitored
    
-   **Contextual Enrichment:** Third-party data adds context to your existing security information. By ingesting this data, Cortex Cloud automatically correlates its findings with threats detected by Cortex Cloud Application Security scans. This helps you prioritize which vulnerabilities to address first based on the actual risks they pose, enabling more strategic and efficient remediation
    
-   **Leveraging existing investments:** You can maximize the value of your current security tools through Cortex Cloud , which powers the consolidation of your security data. Instead of operating in separate silos, your tools' data is integrated into a single, consolidated view of your security state within Cortex Cloud. This ensures that the data you have already collected from various sources is actively used to inform and strengthen your overall security strategy
    
    To ingest third-party data, refer to Ingest third-party data sources.
    

## Code replication and retention policies

Cortex Cloud does not replicate or store your application code unless your organization has subscribed to the Application Security add-on license. The data collected and displayed relates only to security findings and metadata, preserving the integrity and location of your source code.

## Disclaimer

While Cortex Cloud Application Security provides guidance during integration and explain the steps involved when you are redirected to third party version control systems (such as GitHub SaaS , GitLab SaaS and so on), Cortex Cloud Application Security does not assume responsibility for changes or variations in these platform processes. Always refer to the official documentation of the third party to ensure you are following their most current and precise instructions.