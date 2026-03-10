---
title: "How to use the JetBrains Cortex Cloud extension"
tocId: "uxAfXyLqJY5dxJqnQ9ahYw"
contentId: "LB5f49fvs3PtgnVZLDKTEw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/How-to-use-the-JetBrains-Cortex-Cloud-extension"
depth: 3
---

# How to use the JetBrains Cortex Cloud extension
The Cortex Cloud security extension for JetBrains IDEs integrates comprehensive scanning, efficient issue management, and remediation capabilities directly into your coding environment, without disturbing development.

## Execute scans

ou can scan your code for security issues using two primary methods: full project scans and single file scans.

-   **Full project scans**: These scans comprehensively analyze your entire project. They can be initiated in two ways:
    
    -   **Automatic scan**: Triggered automatically when you open a project
        
    -   **Manual scan**: Initiated by clicking the Play button in the **Details panel**
        
    
-   **Single file scan**: These scans focus on a specific file. They are triggered automatically when you open or save that file
    

## View scan history

Select Scan History in the **Details panel** to view a record of past scanning activities. For each recorded scan, you can review details such as the start time and duration of the scan, the path that was scanned, the scan trigger (such as Manual or File Opened), the total number of issues detected, and the CLI command used to execute the scan. Under scan history, you can also run scans locally from the terminal for support purposes and so on.

Filters are available within the Scan History to view All Scans, Project Scans, or File Scans.

## View log files

Select the Log file icon (next to the Play button in the Details panel) to view log files. These logs provide diagnostic information and details about the execution of your scans, which can be useful for troubleshooting.

## Manage issues in the **Details panel**

The **Detail panel**'s main display features a series of tabs for categorizing issues. An Overview tab provides a summary of all detected issues. Alongside it, dedicated tabs exist for specific security categories: Issues are organized by security category (IaC, Secrets, Vulnerabilities, Licenses, and Package Integrity). The Overview tab displays the total count of all issues, while each category-specific tab displays the total count of issues associated with its specific type.

You can filter issues:

-   By severity level (L M H C) to filter issues by severity
    
-   By fix availability (Fix Available) to filter for issues with an available fix
    
    **Note**
    
    After selecting Fix Available, the number of issues displayed in the issue categories (such as IaC) reflect the number of fixable issues for that type.
    

The **Details panel** displays a hierarchical view of folders and files that contain issues, with this display dynamically updated based on the selected issue type tab.

1.  Under a scan category, browse through folders/subfolders to locate and click on a file containing issues.
    
2.  (Optional) Use a filter to prioritize issues.
    
3.  Select an individual issue within the file to display its details in the right section of the **Details panel**.
    
    **Note**
    
    The corresponding file simultaneously opens in the Code editor, highlighting the issue within its exact code context. See below for more information.
    
    The detailed issue view provides information including:
    
    -   The name and description of the issue
        
    -   The code lines (or resource for IaC misconfigurations) in which the issue has been detected
        
    -   Contextual remediation options, provided specifically for each issue type to guide resolution. For more information about remediation options, refer to Remediation options by issue category below
        
    

## Manage issues in the **Code editor**

Select an individual issue within the **Details panel** to open the file containing the issue in the **Code editor**.

Issues are marked by a red i icon next to the code line.

-   Click the red i icon for basic details about an issue: name, severity, and remediation options (see below)
    
-   For IaC resources with multiple issues, hovering over the line of code marked i displays a list of issues at the resource's starting line. Scroll to view all issues
    
-   Select Console to display the issue in the **Details** panel
    

## Remediation options by issue category

You can mitigate issues directly through both the **Code editor** or the **Details panel**. Options include Fix, Suppress, and Documentation.

**Note**

Not all types of remediation are available for all issue categories. For example, fixes are not available for License issues.

## Fixes

When selecting an issue in either the **Code editor** and **Details panel**, a suggested fix is displayed when available. Fixes are automatically applied to the code upon selection. The following list displays the type of fix available for the different categories of issues.

-   **CVE vulnerabilities**: The fix bumps the package version. You can directly fix the specific CVE vulnerability that has been detected during the scan by upgrading the package to the version that includes a fix
    
-   **IaC misconfigurations**: The fix modifies the configuration. The **Details panel** displays the code difference to be fixed
    
-   **Secrets** issues: N/A
    
-   **License** mis-compliance: N/A
    
-   **Package Integrity**: N/A
    

## Suppression

Suppress an issue to temporarily hide or ignore an issue without fixing it, allowing you to concentrate on more important issues. The suppression is scoped to the file.

1.  Select an issue from the Details panel → click Suppress in either the Code editor or Details panel.
    
2.  Provide a justification for the suppression → click OK.
    
    The justification will be added as a commented annotation to your source code.
    

After suppressing an issue, the file will not be scanned for two minutes. This is to prevent the issue from being re-triggered. Saving the file during the hold period will not trigger a scan.

## Documentation

If automated fixes are not available, policy documentation can provide guidance on how to address the issue: Select an issue → click Documentation in either the Code editor or Details panel. You are redirected to the relevant documentation which includes suggested guidelines on how to mitigate the issue.

**Note**

Secrets and Licenses category issues are typically mitigated by following the guidance in the Documentation.