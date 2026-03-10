---
title: "JetBrains"
tocId: "x4zERHB7PSiSEzwXvjTieA"
contentId: "zvddOCoB~UDVUoNCccbCKw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/JetBrains"
depth: 2
---

# JetBrains
Integrate the Cortex AppSec code security plugin with your JetBrains IDE instance to enhance security during development. The plugin scans for security policy violations using both default and custom policies, allowing you to identify and resolve issues before committing code, reducing the risk of pull request failures due to undetected problems.

**Note**

The Cortex AppSec code security plugin supports all JetBrains products.

## Supported scan categories

The plugin scans these code security categories:

-   Secrets: Identifies sensitive data embedded in code, such as API keys, encryption keys, OAuth tokens, certificates, PEM files, passwords, and pass-phrases
    
-   IaC misconfigurations in IaC templates such as Kubernetes and Terraform. For a list of supported IaC frameworks see Supported frameworksSupported frameworks
    
-   SCA vulnerabilities: Includes security issues in both direct and transitive open-source dependencies
    
-   Licenses: Software license mis-compliance
    
-   Package Integrity: Assesses the operational risk and potential impact of each package in your codebase
    

**Prerequisites**

**Prerequisites**

-   **Permissions**: CLI Read only permissions. Refer to Cortex CLI for more information about permissionsCortex CLI
    
-   Environment setup
    
    -   **macOS** and **Windows**: Install [Python](https://www.python.org/downloads/) 3.9.x to 3.12.x
        
    -   Install `Node.js version 22` and above for SCA scans (such as vulnerabilities scans)
        
    
-   On Cortex Cloud
    
    -   Generate and copy a Cortex Cloud access key to enable access to Cortex Cloud. The access key includes a key ID and secret:
        
        1.  Navigate to Settings → Configurations → API Keys (under Integrations) → \+ New Key.
            
        2.  Copy and save the key.
            
        3.  Retrieve your API Key ID from the ID column.
            
        
        For more information about API keys, refer to [https://docs-cortex.paloaltonetworks.com/r/Cloud-Onboarding-Public-APIs/Understand-Cortex-Cloud-licenses](https://docs-cortex.paloaltonetworks.com/r/Cloud-Onboarding-Public-APIs/Understand-Cortex-Cloud-licenses).
        
        For more information about API keys, see [https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM-REST-API/Cortex-XSIAM-APIs](https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM-REST-API/Cortex-XSIAM-APIs).
        
        For more information about API keys, see [https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR-REST-API/Cortex-XDR-API-Overview](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR-REST-API/Cortex-XDR-API-Overview).
        
        **Note**
        
        When generating an API key, ensure you select the Standard security level.
        
    
-   Retrieve your Cortex Cloud API URL: Navigate to Settings → Configurations → API Keys → select Copy API URL.
    

## Installation

You can install the plugin directly through the JetBrains IDE Plugins panel or the JetBrains Marketplace.

-   Install through JetBrains IDE: Navigate to Settings → Plugins → select the Marketplace tab → search for Prisma Cloud → Install → OK
    
-   Install from the JetBrains marketplace:
    
    1.  [Open the marketplace](https://plugins.jetbrains.com/).
        
    2.  Select a platform, search for the Prisma Cloud plugin, and click Get.
        
    3.  Select Download from the Versions tab and then Got it in the popup.
        
    

### Configure plugin settings

1.  In your IDE, select Settings → Tools → Cortex Cloud.
    
2.  In the plugin Settings screen, fill in these fields:
    
    -   Access Key: Your Cortex Cloud API key ID
        
    -   Secret Key: Your Cortex Cloud API secret key
        
    -   **Cortex Cloud URL**: Your Cortex Cloud URL.
        
        **Danger**
        
        You must insert your API key and API ID values into the Settings before providing the tenant URL.
        
    -   CA-Certificate (optional): Add your CA certificate. Format: `.pem` file
        
        Example 25. Example
        
        -   **macOS/Linux**: /Users/your_username/Documents/cacert.pem or ~/Documents/cacert.pem
            
        -   **Windows**: C:\\Users\\your_username\\Documents\\cacert.pem
            
        
          
        
    -   CLI Version: Leave blank to use the latest Cortex Cloud Application Security version (or enter 'latest'), or specify a version
        
    -   CLI Path: Specifies the path to the CLI executable. Recommended: Leave empty to let the  extension manage the CLI installation
        
    -   Ignore gitignore files: Selected by default. Files that belongs to paths included in the `• gitignore` file will not be scanned when opened or saved
        
    -   External Checks Directory: Provide the path to a folder containing custom security checks
        
    -   Custom Environment Variables: Environment variables passed to the scanner during scans such as CORTEX_API_BASE_URL:
        
        -   To add variables, provide the key/value pairs in the table under the Custom Environment Variables field
            
        -   To remove variables, select the (—) sign
            
        
    
3.  Click Apply → OK.
    

### Test connection

You can test your connection by selecting the Test Connection field under Settings.

### Manage plugin configurations

Use one of these methods to access plugin configurations and modify settings:

-   Select the Settings icon in the **Details panel**
    
-   Select Settings → Tools → Cortex Cloud
    

## UI layout

-   **Left pane**: Displays a tree structure that accurately mirrors the files and folders of the project you have opened.
    
-   **Middle pane**: Displays the **Code editor**. When an issue is selected in the Details panel, the relevant file opens in this editor. This allows you to examine your codebase, see the issue in its specific context (such as an IaC misconfiguration), and find recommended remediation steps
    
-   **Bottom pane**: This is the **Details panel**. Serves as the central hub for in-depth analysis and management of your code scan issues. It provides comprehensive information on selected issues, remediation options scan history, and various controls such as a manual scan option.