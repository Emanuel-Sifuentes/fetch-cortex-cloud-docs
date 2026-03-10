---
title: "How to use the Cortex Cloud extension in VS Code"
tocId: "67Fslqm4uAYm64wT648sdg"
contentId: "ChDVDXlb7nVfxQEIURoFaQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/How-to-use-the-Cortex-Cloud-extension-in-VS-Code"
depth: 3
---

# How to use the Cortex Cloud extension in VS Code
The Cortex Cloud security extension allows you to conduct comprehensive scans, manage findings efficiently, and remediate issues within your coding environment. You can prioritize findings and address the most critical issues by filtering the scan results based on category and severity.

To use the extension:

1.  Write your code.
    
    The plugin provides real-time security feedback and suggestions.
    
2.  Use the available actions and commands to resolve security issues and ensure compliance with best practices.
    

## UI layout

To access the plugin, select the Cortex Cloud icon in the extension panel. The UI is divided into three sections:

-   Left pane (**Navigation** panel): Displays a tree structure of issues according to security category: (IaC misconfigurations, Secrets, Vulnerabilities (SCA), and Licenses). Expand each category to reveal folders containing specific issues detected during a scan
    
-   Middle pane (**Code editor**). Allows you to review your codebase, view findings related to resources (for IaC misconfigurations) or files, and access remediation options
    
-   Right pane (**Problems Tool**). Provides detailed information about a selected issue, including code differences (when available), and remediation options
    

## Scans

You can perform scans on an entire project or specific files:

-   **Full scan**: Click the Play button for any security category (for example, IaC and Secrets) in the Navigation panel to scan the entire project. This action initiates scans across all categories
    
-   **Selected file scan**: Open or save a specific file to trigger a scan for that file only
    

## Findings

Manage findings through either the **Code editor** or the **Problems Tool**.

-   Findings are grouped by security category in the Navigation panel for easy browsing
    
-   Click on a category or folder to view associated findings
    
-   Select an issue to display its details in the Code Editor and Problems Tool
    
-   Use the filter icon in the Navigation panel to refine findings by severity
    

## Manage findings in the Code editor

To manage findings directly in your code editor, the extension highlights secrets, misconfigurations, vulnerabilities, and license non-compliance issues with red marks next to affected lines. Hover over the marks to view the issue's details, severity and remediation options. For multiple issues, scroll to view all detected findings. For a more detailed view of any issue, click Console to open the Problems Tool and explore further information about the detected finding.

## Manage findings through the Problems Tool

The Problems Tool provides a detailed view of selected issues, including available remediation options. You can access the Problems Tool by selecting an issue in the navigation bar or through the Console option in the Code editor.

## Remediation

You can mitigate issues directly through both the Code editor and the Problems Tool. Options include Fix, Suppress, or Documentation.

**Note**

Not all remediation options are available for all issues.

## Fix issues

When selecting an issue in the Code editor or Problems Tool, a suggested fix is displayed when available. Fixes are applied automatically upon selection. Below is a list of the types of fixes available for different issue categories.

-   Secrets issues: Follow the policy guidelines
    
-   IaC misconfiguration: The fix modifies the configuration. The Problems Tool displays the code difference to be fixed
    
-   SCA CVE vulnerabilities: You can directly fix the specific vulnerability that has been detected during the scan by upgrading the package to the version that includes a fix
    
-   License mis-compliance: Follow the policy guidelines
    
-   Package integrity:
    

## Suppression

Suppress an issue to temporarily hide or ignore an issue without fixing it, allowing you to concentrate on more important issues.

**Note**

The suppression is scoped to the file.

1.  In the IDE, select an issue from the Navigation bar and click Suppress in either the Code editor or Problems Tool.
    
2.  Provide a justification for the suppression and click Enter to confirm.
    
    The justification will be added as a commented annotation to your source code.
    

After suppressing an issue, the file will not be scanned for two minutes. This is to prevent the issue from being re-triggered. Saving the file during the hold period will not trigger a scan.

## Documentation

If automated fixes are not available, policy documentation can provide guidance on how to address the issue: Select an issue and click Documentation. You are redirected to the relevant policy documentation which includes suggested guidelines on how to solve the issue.