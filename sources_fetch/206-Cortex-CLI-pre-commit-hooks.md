---
title: "Cortex CLI pre-commit hooks"
tocId: "7bvOqAQemnjQN294KxVxfA"
contentId: "EQuRLYC1xben51KeBrlT8g"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Cortex-CLI-pre-commit-hooks"
depth: 3
---

# Cortex CLI pre-commit hooks

Integrate Application Security secrets scanner as pre-commit hooks into your workflows to scan for errors on your machine before local commits.

Integrate the Cortex Cloud Application Security secrets scanner as a pre-commit hook by installing the Cortex CLI. The scanner executes the hook locally before a commit. This setup ensures that secrets checks are enforced before any changes are committed.

When setting up pre-commit hooks, you can choose between local hooks and global hooks.

-   **Local**: Installs the hook in the `.git/hooks` directory of the **current** repository, ensuring that Cortex Cloud secrets scans automatically run on your code before every commit
    
-   **Global**: Installs the hook for **all** Git repositories on your machine, so Cortex Cloud secrets scans will automatically run on your code before every commit, regardless of the project
    

## How to configure pre-commit hooks

**Danger**

These common prerequisites are required for all types of installation (both local and global) of the Cortex CLI pre-commit hook.

-   Ensure you have a license for Cortex Cloud Application Security
    
-   Install the Cortex Cloud CLI binary locally. Refer to Connect Cortex CLI for information about onboarding the CLIConnect Cortex CLI
    
-   Obtain Cortex Cloud API credentials (API Key ID and API Key) available from the CLI onboarding process (see above), and your API base URL. For more information on creating API keys, refer to [https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM-REST-API/Create-a-new-API-key](https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM-REST-API/Create-a-new-API-key)
    
-   **Git**: You must have Git installed on your machine. For installation instructions, refer to the [official Git website](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    

1.  Create a directory:
    
     `mkdir -p ~/.cortexcli`
    
2.  Create a `.cortex.yaml` file in the `~/.cortexcli/` directory.
    
3.  Open the `.cortex.yaml` file and add your Cortex Cloud API credentials and API base URL to the `yaml` file:
    
    -   `CORTEX_API_BASE_URL`: <replace with the base API URL>
        
    -   `CORTEX_API_KEY_ID`: <replace with API Key ID>
        
    -   `CORTEX_API_KEY`: <replace with API Key>
        
    
    **Note**
    
    It is recommended you configure credentials for the Cortex CLI using a configuration file.
    
4.  **For local hooks**: Install the Cortex CLI pre-commit hook package to set up a local hook for the current Git repository:
    
    **Prerequisite**
    
    For local installation: Install the **pre-commit** framework version 3.2.0 or greater. Refer to [https://pre-commit.com/](https://pre-commit.com/) for installation instructions.
    
    1.  -   For **macOS**, you can use **Homebrew**:
            
             `brew install pre-commit`
            
        -   For other installations run:
            
             `pip install pre-commit`
            
        
    2.  Navigate to the root of your repository → run the following command:
        
         `cortexcli code pre-commit install --mode local`
        
5.  **For Global hooks**: Install the Cortex CLI pre-commit hook package to set up hooks for all Git repositories on your machine.
    
    ```
    cortexcli code pre-commit install --mode global
    ```
    
    **Note**
    
    The **pre-commit** framework is not required for global mode.
    

## References

To set up the Cortex CLI as a pre-commit hook on supported platforms, refer to the following official Git documentation for managing hooks:

-   **Git Hooks**: A comprehensive guide on all available Git hooks, including `Pre-commit`: [https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
    
-   **Atlassian Git Tutorial**: A tutorial that explains the purpose and usage of both local and server-side hooks, including `pre-commit`: [https://www.atlassian.com/git/tutorials/git-hooks](https://www.atlassian.com/git/tutorials/git-hooks)