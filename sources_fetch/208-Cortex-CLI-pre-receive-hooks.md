---
title: "Cortex CLI pre-receive hooks"
tocId: "O0C1ijAO2CbZb76SvrXyxQ"
contentId: "R8Oy1cEriw3aLHuvovaGgA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Cortex-CLI-pre-receive-hooks"
depth: 3
---

# Cortex CLI pre-receive hooks

Integrate the Application Security secrets scanner as a pre-receive hook into your workflows to scan for errors before code is accepted into your repository.

Integrate the Cortex Cloud Application Security secrets scanner as pre-receive hook into your workflows installing the Cortex CLI. The hook runs on the remote server before changes are pushed, allowing you to enforce checks before code is accepted into version control.

**Supported version control systems**: Pre-receive hooks are supported for GitHub Enterprise, GitLab self-managed, and Bitbucket Data Center. To setup pre-receive hook on these platforms refer to Setup on third-party platforms below.

## Pre-receive hook workflow setup

1.  Fulfill prerequisites.
    
2.  Configure API credentials.
    
3.  Install the pre-receive hook.
    
4.  Setup the pre-receive hook on third party platforms.
    

## Setup requirements

**Prerequisites**

Before you begin, ensure you have:

-   **Administrator** access to the VCS server and console
    
-   A valid license for Cortex Cloud Application Security
    
-   The **Cortex Cloud CLI binary** or Docker image installed on the server (requires `GLIBC (GNU C library) version 2.35` or greater). Refer to Connect Cortex CLI for information about onboarding the CLIConnect Cortex CLI
    
-   **Cortex Cloud API credentials** (API Key ID and API Key) and your API base URL. For more information on creating API keys, refer to [https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM-REST-API/Create-a-new-API-key](https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM-REST-API/Create-a-new-API-key)
    
-   **Git** installed on your machine. For installation instructions, refer to the [official Git website](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    

## Configure credentials

It is recommended to configure credentials for the Cortex Cloud Application Security Cortex CLI using a configuration file, instead of embedding them directly in the hook script.

1.  Create a directory:
    
    ```
    mkdir -p ~/.cortexcli/.cortex.yaml
    ```
    
    **Note**
    
    Make sure to create the directory under the home directory of the Linux user that runs the Git hooks. This user is typically not the root user.
    
2.  Configure credentials: Open the `.cortex.yaml` file in the `~/.cortexcli/` directory and add the following configuration parameters:
    
    -   `CORTEX_API_BASE_URL`: <API base URL>
        
    -   `CORTEX_API_KEY_ID`: < API key ID >
        
    -   `CORTEX_API_KEY`: < API key>
        
    

## Setup on third-party platforms

To set up the Cortex CLI as a pre-receive hook on supported third-party platforms, refer to the official vendor documentation:

-   **GitHub Enterprise**: [About pre-receive hooks](https://docs.github.com/en/enterprise-server@3.16/admin/enforcing-policies/enforcing-policy-with-pre-receive-hooks/about-pre-receive-hooks)
    
-   **GitLab self-managed**: [Git server hooks](https://docs.gitlab.com/ee/administration/server_hooks.html)
    
-   **Bitbucket Enterprise**: [Using repository hooks](https://confluence.atlassian.com/bitbucketserver/using-repository-hooks-776639836.html)
    

## Reference script

Use the script below as reference to extend or modify your existing pre-receive hooks in your VCS provider.

```
#!/usr/bin/env bash

# This script is used to run Cortex CLI in a pre-receive hook.

# Hide the update notice.
export CORTEX_HIDE_UPDATE_NOTICE=1

CORTEX_CLI="/usr/local/bin/cortexcli"
BASE_COMMAND="--api-base-url ${CORTEX_API_BASE_URL} --api-key-id ${CORTEX_API_KEY_ID} --api-key ${CORTEX_API_KEY} code pre-receive"
OPTIONAL_FLAGS=''

# Run cortex cli
${CORTEX_CLI} ${BASE_COMMAND:-''} ${OPTIONAL_FLAGS:-''}

exit_code=$?

exit $exit_code
```