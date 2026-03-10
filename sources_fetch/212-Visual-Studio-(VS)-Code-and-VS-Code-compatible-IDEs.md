---
title: "Visual Studio (VS) Code and VS Code compatible IDEs"
tocId: "7iCXM~Jx36_pjlapDtXGcA"
contentId: "4iQWO7a2pDPzA6zg4CiZJw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Visual-Studio-VS-Code-and-VS-Code-compatible-IDEs"
depth: 2
---

# Visual Studio (VS) Code and VS Code compatible IDEs
Integrate the Cortex Cloud code security plugin with your Visual Studio (VS) Code or any VS Code-compatible IDEs (such as Cursor, VSCodium, or Windsurf) to enhance security during development. The plugin scans for security policy violations using both default and custom policies, enabling you to identify and resolve issues before committing code, reducing the risk of pull request failures caused by undetected problems.

## Choose your security level

-   **Enhanced security with Cortex AppSec integration** (recommended): For comprehensive security analysis, connect the plugin to Cortex Cloud using your Cortex Cloud API Key and API Key ID (see prerequisites below for more information about API keys). This option provides the full functionality of the platform security features
    
-   **Basic open-source functionality**: If you prefer not to use access credentials, you can still benefit from the plugin’s basic open-source features. These features provide a foundational level of security analysis, helping you identify common vulnerabilities. However, you will not have access to Cortex Cloud
    

## Supported scan categories

The plugin scans these code security categories:

-   Secrets: Identifies sensitive data embedded in code, such as API keys, encryption keys, OAuth tokens, certificates, PEM files, passwords, and pass-phrases
    
-   IaC misconfigurations in IaC templates such as Kubernetes and Terraform. For a list of supported IaC frameworks see Supported frameworksSupported frameworks
    
-   SCA vulnerabilities: Includes security issues in both direct and transitive open-source dependencies
    
-   Licenses: Software license noncompliance
    
-   Package Integrity: Assesses the operational risk and potential impact of each package in your codebase
    

**Prerequisites**

**Prerequisites**

Before you begin (These prerequisites apply to both VS Code and VS Code compatibles):

-   **Permissions**: CLI Read only permissions. Refer to Cortex CLI for more information about permissionsCortex CLI
    
-   **Environment setup**
    
    -   **macOS** and **Windows**: Install [Python](https://www.python.org/downloads/) 3.9.x to 3.12.x
        
    -   Install `Node.js version 22` and above for SCA scans (such as vulnerabilities scans)
        
    
-   On the Cortex Cloud console.
    
    -   Retrieve your access key and URL for authentication purposes when setting up the plugin
        
        -   Generate and copy a Cortex Cloud access key to enable access to Cortex Cloud. The access key includes a key ID and secret:
            
            1.  Navigate to Settings → Configurations → API Keys (under Integrations) → \+ New Key.
                
            2.  Copy and save the key.
                
            3.  Retrieve your API Key ID from the ID column.
                
            
            For more information about API keys, refer to [https://docs-cortex.paloaltonetworks.com/r/Cloud-Onboarding-Public-APIs/Understand-Cortex-Cloud-licenses](https://docs-cortex.paloaltonetworks.com/r/Cloud-Onboarding-Public-APIs/Understand-Cortex-Cloud-licenses).
            
            For more information about API keys, see [https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM-REST-API/Cortex-XSIAM-APIs](https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM-REST-API/Cortex-XSIAM-APIs).
            
            For more information about API keys, see [https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR-REST-API/Cortex-XDR-API-Overview](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR-REST-API/Cortex-XDR-API-Overview).
            
            **Note**
            
            When generating an API key, ensure you select the Standard security level.
            
        -   Retrieve your Cortex Cloud API URL: Navigate to Settings → Configurations → API Keys (under Integration) → click Copy API URL
            
        
    

## Installation

You can install the plugin directly from your IDE extensions panel or though the **Visual Studio Marketplace** (for VS Code) or the **Open VSX Registry** (for compatible IDEs). After completing any installation method, your IDE will activate the extension. Restart your IDE if prompted to ensure the necessary Cortex CLI components initialize correctly.

### Install VS Code

-   **Install through VS Code IDE**
    
    -   Access the Activity bar → Extensions → Cortex Cloud → Install.
        
    
-   **Install from the Visual Studio Marketplace**
    
    1.  Access the Cortex Cloud extension from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=PrismaCloud.prisma-cloud) (for VS Code).
        
    2.  Select Install → Open Visual Studio Code.app.
        
        You are redirected to the Cortex Cloud extension on your IDE.
        
    3.  Click Install.
        
    

### Install VS Code compatibles

-   **Install the Cortex Cloud extension from within a compatible IDE**
    
    1.  Select the Extensions icon (represented by four squares) in the IDE's Activity Bar (usually on the far left).
        
        **Tip**
        
        You can access Extensions using the keyboard shortcuts `Ctrl+Shift+X` (Windows) or `Cmd+Shift+X` (macOS).
        
    2.  Search the Registry: Enter Cortex Cloud in the search field at the top of the Extensions view.
        
        The search results will pull the extension listing from the Open VSX Registry.
        
    3.  Click on the Cortex Cloud extension in the search results.
        
    4.  Select Install.
        
    
-   **Install the Cortex Cloud extension from the Open VSX Registry**
    
    1.  Download the extension package.
        
        1.  Open the [Open VSX Registry](https://open-vsx.org/extension/PrismaCloud/prisma-cloud)
            
        2.  Select the Download link to save the `.vsix` extension file to your local system.
            
    2.  Install manually via the IDE Command Palette:
        
        1.  Open your compatible IDE.
            
        2.  Access the **Command Palette** by pressing `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS).
            
        3.  Type or select Install from VSIX (The exact name may vary slightly, such as Extensions: Install from VSIX...).
            
            A file dialogue opens.
            
        4.  Navigate to the location where you saved the `.vsix` file in Step 1b and select it.
            
            The IDE will process the package and activate the extension.
            
    

## Configure plugin settings

The configuration process depends on whether you’re using the open-source or proprietary version. For the proprietary version, you will need your Cortex Cloud API Key, API Key ID and and tenant URL to establish a secure connection between your environment and Cortex Cloud. These details authenticate you to your tenant. The open-source project does not require these settings.

**Note**

**Enforcement** rules and **CA certificates** are not applicable to the open-source project.

1.  Access the Cortex Cloud extension settings in one of these ways:
    
    -   Select Extensions → Cortex Cloud → navigate to the bottom menu bar of your VS Code editor → select the Cortex Cloud tab
        
    -   Select Extensions → Cortex Cloud → click the Settings (cogwheel) icon → Settings
        
    
2.  Fill in the provided fields:
    
    -   API Key ID (required): The Cortex Cloud access key ID. See Prerequisites  above
        
    -   API Key (required): The Cortex Cloud secret key. See Prerequisites above
        
    -   Platform URL (required): Your Cortex Cloud URL. See Prerequisites above
        
        **Danger**
        
        You must insert your API key and API ID values into the Settings before providing the tenant URL.
        
    -   CLI Version: Leave blank to use the latest CLI version (or enter 'latest'), or specify a version
        
    -   CLI Path: Specifies the path to the CLI scanner. Recommended: Leave empty to let the extension manage the scanner installation
        
    -   Disable Error Message Popups: Hide error message popups. You can view errors in the logs via the **Open Cortex Cloud Log** command
        
    -   Certificate: Add your Cortex Cloud CA certificate. Format: `.pem` file
        
        Example 24. Example
        
        -   **macOS/Linux**: /Users/your_username/Documents/cacert.pem or ~/Documents/cacert.pem
            
        -   **Windows**: C:\\Users\\your_username\\Documents\\cacert.pem
            
        
          
        
    -   Ignore Gitignore files: Selected by default. Files that belongs to paths included in the `• gitignore` file will not be scanned when opened or saved
        
    -   External Checks Directory: Provide the path to a folder containing custom security checks
        
    -   Specific Frameworks: Scan specific frameworks such as `ARM`. You can add multiple frameworks using spaces between the values in the command. Refer to Cortex CLI Cortex Cloud Application Security command line reference for more information about framework flags
        
    -   Environment Variables: Define specific environment variables and their values that will be accessible to the security scanner while it performs its analysis
        
        -   To add variables, select Add item → provide the variable key/value pairs → OK
            
        -   To edit or delete a variable: Select the edit or delete icons next to a variable in the table
            
        
    

## UI layout

To view the extension, select the Cortex Cloud tab in the Activity bar. The extension UI layout is as follows:

-   **Left pane**: The **Security scan panel**, which includes these features:
    
    -   Full Scan button: manually initiate a full scan of your project
        
    -   **Scan results**. Features a tree structure displaying detected issues by security category (IaC misconfigurations, Secrets, Vulnerabilities (SCA), and Licenses). Each category expands to reveal folders containing specific issues detected during a scan
        
    -   Control buttons: Provide access to Settings, Test Connectivity, Full scan play button, and Extension Monitoring, which includes scan history and log files
        
    
-   **Middle pane**: **Code editor**. Review your codebase, and view a list of issues related to a file or resource (for IaC misconfigurations), along with remediation options
    
-   **Right pane**: **Details panel**. Provides a detailed view of a selected issue, including information such as the code difference when available, and remediation options