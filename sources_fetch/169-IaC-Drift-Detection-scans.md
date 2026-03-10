---
title: "IaC Drift Detection scans"
tocId: "e3YTKg5fMb9f7yguxSk_mQ"
contentId: "N4Lo4zTfCL1YIlNnlJGajA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/IaC-Drift-Detection-scans"
depth: 1
---

# IaC Drift Detection scans

IaC Drift Detection identifies runtime configurations that diverge from code. It flags security-critical discrepancies to focus remediation efforts.

IaC Drift Detection preserves Git as the single source of truth (SSOT) by correlating declared infrastructure templates with live cloud resources using **Code-to-Cloud** lineage. Cortex evaluates drift through a misconfiguration-based detection model, surfacing discrepancies only when a runtime resource violates a security or compliance rule that is not violated in its corresponding IaC definition. This ensures drift findings reflect security-relevant divergence rather than expected operational variance.

**Prerequisites**

To enable drift detection, ensure your environment meets the following requirements

-   **Cloud service provider integration (for CSPM)**: The target cloud accounts (AWS, Azure, or GCP) must be successfully onboarded, returning data, and able to read the actual state of your infrastructure from the live environment
    
-   **Version control system (VCS) integration**: The platform must be able to read the intended state of your infrastructure from your code repositories.
    
    -   **Repository integration**: A valid integration with a supported VCS provider (such as GitHub, GitLab, Bitbucket) must be active
        
    -   **Supported formats**: The repository must contain valid **Terraform** ( `.tf`) or **CloudFormation** (`.yml/.json`) templates
        
    -   **File structure**: The integration must have visibility into the root directory where the IaC templates are located
        
    
-   **Resource tagging**: Drift detection requires a common identifier to correlate the code block in the VCS with the live resource in the cloud. Use either of the following methods:
    
    -   **Automatically using the Tagging Bot**: Refer to Manage repository scan configurations to enable the Tagging Bot
        
    -   **Manually set-up `yor` trace tags**. Refer to the [Yor documentation](https://yor.io/) for more information
        
    
-   **Rule mapping** (Critical): Drift is calculated only for IaC rules that are mapped to a corresponding CSPM rule. Rules without this mapping lack a runtime signal and cannot generate drift findings. If a declared resource cannot be resolved to a specific runtime resource via this mapping, drift is not evaluated