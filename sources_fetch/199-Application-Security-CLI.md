---
title: "Application Security CLI"
tocId: "ZoDH9TX0GAxNNL5wAR9r1Q"
contentId: "YOljB0qMZNaKvZ5GayfdBw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Application-Security-CLI"
depth: 1
---

# Application Security CLI
The Application Security CLI, part of the Cortex CLI, allows developers and security teams to integrate security checks directly into their application development workflows.

**Note**

For detailed information about the Cortex Cloud CLI, refer to Cortex CLI.Cortex CLI

The Code Security CLI supports the following scan types:

-   **Secrets**: Identifies exposed sensitive secrets within your codebase
    
-   **Infrastructure-as-Code** (IaC): Analyzes infrastructure configuration files to detect potential security misconfigurations
    
-   **Software Composition Analysis** (SCA): Performs vulnerability detection in third-party dependencies, assesses their license compliance and their package operational risk
    

In addition, the Code Security CLI serves as the integration mechanism for security scanning within supported CI tools such as Jenkins, GitHub Actions, and others. This is achieved by adding a code snippet containing the CLI command into the configuration files of your CI tool when integrating the CI tool with Cortex Cloud. It acts as a wrapper, enabling security scanning within your pipelines, and direct upload of results to the platform.

The CLI supports the following outputs:

-   json
    
-   spdx
    
-   cli
    
-   junitxml
    
-   sarif
    
-   cyclonedx
    
-   cyclonedx_json
    

## Code Security CLI scan behavior and output

-   Scans generate assets (see Code Security assets, issues, and findingsissuesfindings
    
-   If one scanner (such as Secrets) fails, the other scanners will continue to run and produce results
    
-   Scan failures trigger an error message indicating the scanner that failed
    
-   The Code Security CLI provides these output modes for flexible management and viewing of scan results:
    
    -   **Upload to platform**: `--upload-mode = true` (default). Uploads scan results directly to the platform for centralized analysis and management
        
    -   **Upload findings only**. `--upload-mode = false` (default). Upload findings, but without including the actual source code content. This prevents raw source code from leaving your local environment or being stored on the platform
        
    -   **CLI output only**: `upload = false` (default). View scan results directly in your command-line interface without being uploaded to the platform
        
    
    For more information about the output flags, refer to Cortex CLI Cortex Cloud Application Security command line reference.
    

## Authentication

To authenticate the Code Security CLI, choose one of the following methods:

-   **Using command-line flags**: Provide authentication details directly with your commands
    
    The following flags are required to authenticate the Code Security CLI:
    
    -   `--api-base-url`: \[$CORTEX_API_BASE_URL\]
        
    -   `--api-key`: \[$CORTEX_API_KEY\]
        
    -   `--auth-id`. \[$CORTEX_AUTH_ID\]
        
    
    For more information about these flags, refer to Cortex CLI common command line reference guide.
    
-   **Using a `cortex.yaml` file**: Place your authentication details in a `cortex.yaml` file
    

## Requirements

**Danger**

These requirements apply specifically to the Application Security CLI.

-   **For the Cortex CLI binary**:
    
    -   Ensure you have `Node.js v22` installed on your host machine before running any scans with the Cortex CLI. This is crucial to prevent runtime errors, as the CLI depends on Node.js for executing JavaScript analysis
        
        **Note**
        
        -   To check your version of `Node.js`, run `node -v`
            
        -   To download Node.js, refer to the official [Node.js](https://nodejs.org/) site
            
        
    -   For Linux OS systems, ensure that GLIBC (GNU C library) version 2.35 or greater is installed
        
    
    **Note**
    
    This requirement does not apply when using the CLI as a container image.
    
-   Ensure you have Cortex CLI version 0.15 or greater. Run `cortexcli -v` to verify your version
    
-   **Permissions**: Ensure you have the required user permissions. Refer to Cortex CLI for more informationCortex CLI
    
-   Onboard and install the Cortex CLI. Refer to Connect Cortex CLI for more information
    

## Configure proxy for the Code Security CLI

When operating the Code Security CLI within environments requiring internet access via a proxy server, you can configure the tool to route its traffic through your proxy using standard environment variables. For proxies that perform TLS inspection, you must also specify a CA certificate

-   **Environment variables**: Set `HTTP_PROXY` and `HTTPS_PROXY` (or `http_proxy` and `https_proxy`) to your proxy address
    
-   **CA Certificate**: Use the `--ca-certificate` flag or the `$CORTEX_CA_CERTIFICATE` environment variable to provide your CA certificate for proxies that perform TLS inspection. The flag is now global and must appear before `code scan`. It is currently limited to the Application Security CLI. You can either:
    
    -   **Use the environment variable**:
        
        ```
        cortexcli --api-base-url <API_URL> --api-key <API_KEY> --api-key-id <API_KEY_ID> --ca-certificate $CORTEX_CA_CERTIFICATE code scan --directory {{DIRECTORY}} --branch main --repo-id organization/repo-name --output json --output-file-path ./output.json
        ```
        
    -   **Use the flag with a direct path**:
        
        ```
        cortexcli --ca-certificate /path/to/cert.pem code scan --directory {{DIRECTORY}} --branch main --repo-id organization/repo-name --output json --output-file-path ./output.json
        ```
        
    
-   **Skip certificate verification**: Use the `--no-cert-verify` flag or the `$CORTEX_NO_CERT_VERIFY` environment variable to skip SSL certificate validation. To enable, set the flag or environment variable to true. **Warning**: This configuration is insecure. Use only in development or testing environments where a valid CA certificate is unavailable