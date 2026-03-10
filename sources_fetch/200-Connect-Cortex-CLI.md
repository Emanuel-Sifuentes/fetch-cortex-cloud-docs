---
title: "Connect Cortex CLI"
tocId: "bcC2N941SR0bvUMKSCZV3g"
contentId: "v7iqag5x0Rh19AgLTz8uZw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Connect-Cortex-CLI"
depth: 2
---

# Connect Cortex CLI
Connect Cortex CLI to scan supported Cortex Cloud modules and gain insights into your security posture, enabling you to identify, analyze and address potential risks.

**Prerequisites**

-   **System requirements**:
    
    -   **macOS** (Intel Core i7, such as Sequoia): To ensure all functionalities work correctly, you must install the `vectorscan` dependency via **Homebrew**, using this command: `brew install vectorscan`
        
    -   **RHEL 8.10** and **Red Hat UBI9**. The following prerequisites must be met:
        
        -   Install `patchelf`
            
        -   Install `zstd`
            
        
    -   **Ubuntu 20** requires the `prefetch` utility
        
    -   **Ubuntu (for linux-amd64)** also requires the `libhyperscan5` library. To install, run `sudo apt install libhyperscan5`
        
    -   **Linux for AppSec Module**: Support is provided for systems meeting the following specifications:
        
        -   **RHEL 10**: Kernel: 6.12, glibc: 2.39
            
        -   **Debian 12**: Kernel: 6.1.27, glibc: 2.36
            
        -   **Ubuntu**:
            
            -   Version 18.04 - Kernel: 4.15, glibc: 2.27
                
            -   Version 20.04 - Kernel: 5.4, glibc: 2.31
                
            -   Version 22.04 - Kernel: 5.15, Glibc: 2.35
                
            -   Version 24.04 - Kernel: 6.8, Glibc: 2.39
                
            
        
    -   Windows: AMD 64 and ARM 64
        
    
-   For cURL-based downloads:
    
    -   `curl`
        
    -   `jq`
        
        -   On **Ubuntu/Debian-based Linux** distributions: `sudo apt-get install jq`
            
        -   On **RedHat/CentOS/Fedora**: `sudo yum install jq`
            
        -   **macOS** (using `Homebrew`): `brew install jq`
            
        -   **Windows**:
            
            -   Download the executable from [jq GitHub releases](https://github.com/stedolan/jq/releases)
                
            -   If `Chocolatey` is installed: `choco install jq`
                
            
        
    
-   **Permissions**: Grant the user installing the CLI required permissions. For more information refer to Cortex CLICortex CLI
    
-   Best Practice (required for SCA vulnerability suppression):
    
    -   Run the CLI within your current working directory (<current_directory_path>). It is recommended to use the absolute file path for your current working directory
        
    -   Ensure that the `--repo-id` parameter includes the `<repo_owner_name>/<repo_name>` structure, with the `<repo_name>` matching the exact name of the directory
        
        Example 20. Example
        
        The present working directory is `Users/test/<repo_name>`. Therefore, the `--repo-id` parameter must be `--repo-id <repo_owner_name>/<repo_name>`, ensuring that `<repo_name>` precisely matches the directory name within the structure.
        
          
        
    -   For terminal actions performed by Cortex Cloud IDE extensions on Windows, Command Prompt (CMD) is the supported environment. PowerShell is not supported for these actions
        
    

1.  Navigate to Settings → Data Sources & Integrations → \+ Add New → Show More → CI/CD.
    
    **Tip**
    
    You can also locate your CI tool by typing its name (such as Jenkins) into the search bar on the Add Data Source or Integrations page after selecting \+ Add New.
    
2.  Hover over Cortex CLI and click Connect.
    
    **Tip**
    
    You can enter CLI in the search bar to locate the Cortex CLI tool.
    
3.  In the Configure step of the integration wizard.
    
    1.  Select your operating system from the menu.
        
    2.  Download the CLI binary: copy (or download) the command provided in the wizard and paste into your terminal.
        
    3.  Click Next.
        
        The Authenticate step of the wizard is displayed.
        
4.  On The Authenticate step of the wizard.
    
    1.  Generate an API:
        
        1.  Select Generate API key.
            
            -   **IMPORTANT**: This option **is required for CWP image scans**
                
            -   This option creates a CLI role for the API key with CLI View/Edit options. It is recommended as it grants the API key permissions to not only access data, but also to upload or send data back
                
            -   If you do not select this option, the generated API key creates a CLI Read Only role with CLI View permissions only
                
            -   **Warning**: Using With upload results permissions may incur additional costs as per your license agreement
                
            
        2.  Copy the the generated `API Key ID` and `API key` that are displayed in their respective fields.
            
        3.  Copy and save the the generated API key from the Retrieve your API key field.
            
            A code command is generated and displayed.
            
        4.  Verify that the generated API key is displayed under the API Keys inventory.
            
        
        **Note**
        
        **Using an existing API Key (or verifying existing API Key permissions)**: If you are using an existing API key, verify it has CLI permissions. CLI View/Edit permissions correspond to selecting With upload results permissions, while CLI Read Only or View permissions corresponds to not selecting the With upload results permissions.
        
    2.  Download and save the CLI tool to your system:
        
        1.  Copy or download the provided code.
            
            **Note**
            
            On macOS arm 64 architecture you must unpack the downloaded file to retrieve the executable.
            
        2.  Replace `${API_KEY}` in the code with your API key.
            
        3.  Retrieve and paste the Cortex Cloud public API URL in the code: Navigate to Settings → API Keys (under Configurations) → click Copy API URL .
            
    3.  Run the command in your terminal.
        
    4.  Click Done.
        
5.  Make the `cortexcli` file executable: run `chmod +x cortexcli`.
    

**Note**

To add an additional CLI instance, navigate to Settings → Data Sources & Integrations → select the menu for your connected CLI instance → \+ New Instance, and repeat the onboarding steps.

## Download and run the Cortex CLI

1.  Download the CLI: Run `curl -k -u $CORTEX_API_ID::$CORTEX_API_KEY --output ./cortexcli $CORTEX_FQDN/api/v2/remote-li/{version}/{platform}/artifacts`
    
2.  Execute the CLI: Run `chmod +x cortexcli`.
    
3.  Verify installation: Run `cortexcli -v`.
    
    The CLI version is displayed.
    

## Authentication

You can authenticate the Cortex CLI using one of two methods: command-line flags or an environment configuration file.

-   **Using command-line flags**: Provide your API credentials and base URL directly in the command using the following flags
    
    -   `--api-base-url`: \[$CORTEX_API_BASE_URL\]
        
    -   `--api-key`: \[$CORTEX_API_KEY\]
        
    -   `--api-key-id` \[$CORTEX_KEY_ID\]
        
    
    For more information about these flags, refer to Cortex CLI common command line reference guide.
    
-   **Using an environment configuration file**: Instead of using flags, you can create an environment configuration file named `cortex.env`. Save this file in your working directory and add your credentials as variables:
    
    -   `CORTEX_API_KEY`: <api key id>
        
    -   `CORTEX_API_KEY`: <secret>
        
    -   `CORTEX_API_BASE_URL`: <tenant URL>, for example `https://api-tenantname.paloaltonetworks.com/`
        
    

## Cortex CLI usage

To execute a Cortex CLI scan, run `cortexcli [global flags] [module name] scan [module flags]`.

**Command breakdown**

-   Global flags:
    
    -   `--api-base-url <value>`
        
    -   `--api-key <value>`
        
    -   `--api-key-id <value>`
        
    
-   `cortexcli` acts as the global option, establishing the environment for subsequent Cortex CLI commands
    
-   Module name: Select the module (environment) to be scanned:
    
    -   `api` for API Security. For more information about API Security scans, refer to Cortex CLI for API SecurityCortex CLI for API Security
        
    -   `image` for CWP. For more information about CWP scans, refer to Cortex CLI for Cloud Workload ProtectionCortex CLI for Cloud Workload Protection
        
    -   `code scan` for Cortex Cloud Application Security. For more informations about Cortex Cloud Application Security refer to Cortex CLI for Code SecurityCortex CLI for Code Security
        
    
-   Module flags: The flags available for the selected command:
    
    -   For flags common to all environments, refer to Cortex CLI common command line reference guide
        
    -   For flags specific to CWP refer to Cloud Workload Protection command line referenceCloud Workload Protection command line reference
        
    -   For flags specific to API Security, refer to Cortex CLI API Security command line reference guideCortex CLI API Security command line reference guide
        
    -   For flags specific to Cortex Cloud Application Security, refer to Cortex CLI Cortex Cloud Application Security command line reference
        
    

**Note**

-   For more information about CLI usage for CWP, refer to Cortex CLI for Cloud Workload ProtectionCortex CLI for Cloud Workload Protection
    
-   For more information about CLI usage for API Security, refer to Cortex CLI for API SecurityCortex CLI for API Security
    
-   For more information about CLI usage for Cortex Cloud Application Security, refer to Cortex CLI usage for Cortex Cloud Application Security