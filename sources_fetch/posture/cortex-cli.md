# Cortex CLI

The Cortex CLI provides a unified command interface to efficiently scan your Cloud Workload Protection (CWP), API Security and Cortex Cloud Application Security environments with a single installation, enabling you to seamlessly integrate security checks into your development process.

## User roles and permissions

Cortex CLI provides a role-based access control mechanism that controls user permissions and access to the CLI features and functionalities. Permissions for CLI scans are based on the associated API key. Each API key can be associated with a specific role, regardless of the user who generated it. This allows for fine-grained control over API access, even for users with broader roles, such as Admin or Developer.

-   **Preconfigured roles**: The CLI includes these out-of-the-box roles with predefined permissions:
    
    -   CLI Role: Grants the user permission to onboard and install the CLI. Enables uploading scan result to the tenant, and provides management capabilities for the uploaded results. In addition, includes **CLI Read Only Role** permissions
        
    -   CLI Read Only Role: Grants the user permission to run the CLI and view output in the CLI. Scan results are not uploaded to the tenant
        
        **Note:**
        
        The CLI Read Only Role is not supported for CWP as the system does not support offline mode.
        
    
-   **Custom roles**: You can create custom roles that include CLI permissions, providing fine-grained control over CLI access in roles that include other platform permissions to tailor your specific requirements
    

For more information about user roles in Cortex Cloud, refer to Assign user roles and groups.

## Connect Cortex CLI
Connect Cortex CLI to scan supported Cortex Cloud modules and gain insights into your security posture, enabling you to identify, analyze and address potential risks.

**Prerequisites:**

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
        
    
-   **For cURL-based downloads**:
    
    -   `curl`
        
    -   `jq`
        
        -   On **Ubuntu/Debian-based Linux** distributions: `sudo apt-get install jq`
            
        -   On **RedHat/CentOS/Fedora**: `sudo yum install jq`
            
        -   **macOS** (using `Homebrew`): `brew install jq`
            
        -   **Windows**:
            
            -   Download the executable from [jq GitHub releases](https://github.com/stedolan/jq/releases)
                
            -   If `Chocolatey` is installed: `choco install jq`
                
            
        
    
-   **Permissions**:
    
    -   **With upload results**: Requires a role with `CLI View/Edit` (write) permissions.
        
    -   **Local scan only**: Requires a role with `CLI Read Only` (read-only) permissions
        
    
    For more information refer to Cortex CLI.
    
-   **Roles**: There are no out-of-the-box CLI roles. The CLI authenticates via an API key. Ensure the API key associated with your role includes the required permissions
    
-   **API Security level**: The API key must be set to the `Standard` security level. CLI scans will fail if the security level is set to `Advanced`
    
-   **Best practice** (required for SCA vulnerability suppression):
    
    -   Run the CLI within your current working directory (<current_directory_path>). It is recommended to use the absolute file path for your current working directory
        
    -   Ensure that the `--repo-id` parameter includes the `<repo_owner_name>/<repo_name>` structure, with the `<repo_name>` matching the exact name of the directory
        
        Example 159. Example
        
        The present working directory is `Users/test/<repo_name>`. Therefore, the `--repo-id` parameter must be `--repo-id <repo_owner_name>/<repo_name>`, ensuring that `<repo_name>` precisely matches the directory name within the structure.
        
          
        
    -   For terminal actions performed by Cortex Cloud IDE extensions on Windows, Command Prompt (CMD) is the supported environment. PowerShell is not supported for these actions
        
    

1.  On your tenant:
    
    1.  Navigate to Settings → Data Sources → \+ Data Source.
        
    2.  Enter Cortex CLI in the search bar → Hover over the Cortex CLI card → Connect or Connect Another Instance.
        
2.  On the Configure step of the integration wizard.
    
    1.  Select your operating system from the menu.
        
    2.  Download the CLI binary: copy (or download) the command provided in the wizard and paste into your terminal.
        
    3.  Click Next.
        
        The Authenticate step of the wizard is displayed.
        
3.  On The Authenticate step of the wizard.
    
    1.  Generate an API:
        
        1.  Select Generate API key.
            
            -   This option creates a CLI role for the API key with CLI View/Edit options. It is recommended as it grants the API key permissions to not only access data, but also to upload or send data back
                
            -   If you do not select this option, the generated API key creates a CLI Read Only role with CLI View permissions only
                
            
            **Note:**
            
            The Cortex CLI requires an API key with the `Standard` security level.
            
        2.  Copy the the generated `API Key ID` and `API key` that are displayed in their respective fields.
            
        3.  Copy and save the the generated API key from the Retrieve your API key field.
            
            A code command is generated and displayed.
            
        4.  Verify that the generated API key is displayed under the API Keys inventory.
            
    2.  Download and save the CLI tool to your system:
        
        1.  Copy or download the provided code.
            
            **Note:**
            
            On macOS arm 64 architecture you must unpack the downloaded file to retrieve the executable.
            
        2.  Replace `${API_KEY}` in the code with your API key.
            
        3.  Retrieve and paste the Cortex Cloud public API URL in the code: Navigate to Settings → API Keys (under Configurations) → click Copy API URL .
            
    3.  Run the command in your terminal.
        
    4.  Click Done.
        
4.  Make the `cortexcli` file executable: run `chmod +x cortexcli`.
    

**Note:**

To add an additional CLI instance, navigate to Settings → Data Sources → select the menu for your connected CLI instance → \+ New Instance, and repeat the onboarding steps.

### Download and run the Cortex CLI

1.  Download the CLI: Run `curl -k -u $CORTEX_API_ID::$CORTEX_API_KEY --output ./cortexcli $CORTEX_FQDN/api/v2/remote-li/{version}/{platform}/artifacts`
    
2.  Execute the CLI: Run `chmod +x cortexcli`.
    
3.  Verify installation: Run `cortexcli -v`.
    
    The CLI version is displayed.
    

### Authentication

You can authenticate the Cortex CLI using one of two methods: command-line flags or an environment configuration file.

-   **Using command-line flags**: Provide your API credentials and base URL directly in the command using the following flags
    
    -   `--api-base-url`: [$CORTEX_API_BASE_URL]
        
    -   `--api-key`: [$CORTEX_API_KEY]
        
    -   `--api-key-id` [$CORTEX_KEY_ID]
        
    
    For more information about these flags, refer to Cortex CLI common command line reference guide.
    
-   **Using an environment configuration file**: Instead of using flags, you can create an environment configuration file named `cortex.env`. Save this file in your working directory and add your credentials as variables:
    
    -   `CORTEX_API_KEY`: <api key id>
        
    -   `CORTEX_API_KEY`: <secret>
        
    -   `CORTEX_API_BASE_URL`: <tenant URL>, for example `https://api-tenantname.paloaltonetworks.com/`
        
    

### Cortex CLI usage

To execute a Cortex CLI scan, run `cortexcli [global flags] [module name] scan [module flags]`.

**Command breakdown**

-   Global flags:
    
    -   `--api-base-url <value>`
        
    -   `--api-key <value>`
        
    -   `--api-key-id <value>`
        
    
-   `cortexcli` acts as the global option, establishing the environment for subsequent Cortex CLI commands
    
-   Module name: Select the module (environment) to be scanned:
    
    -   `api` for API Security. For more information about API Security scans, refer to Cortex CLI for API Security
        
    -   `image` for CWP. For more information about CWP scans, refer to Cortex CLI for Cloud Workload Protection
        
    -   `code scan` for Cortex Cloud Application Security. For more informations about Cortex Cloud Application Security refer to Cortex CLI for Code Security
        
    
-   Module flags: The flags available for the selected command:
    
    -   For flags common to all environments, refer to Cortex CLI common command line reference guide
        
    -   For flags specific to CWP refer to Cloud Workload Protection command line referenceCloud Workload Protection command line reference
        
    -   For flags specific to API Security, refer to Cortex CLI API Security command line reference guide
        
    -   For flags specific to Cortex Cloud Application Security, refer to Cortex CLI Cortex Cloud Application Security command line reference
        
    

**Note:**

-   For more information about CLI usage for CWP, refer to Cortex CLI for Cloud Workload Protection
    
-   For more information about CLI usage for API Security, refer to Cortex CLI for API Security
    
-   For more information about CLI usage for Cortex Cloud Application Security, refer to Cortex CLI usage for Cortex Cloud Application Security

## Self-service API keys for CLI scans
This self-service model allows developers to programmatically generate task-specific keys for CLI and IDE scans via the Public API. By using a Primary API key as a master credential, developers can provision restricted-access keys, such as `read-only` for local scans, without requiring administrative permissions in the UI. This approach maintains tenant security by ensuring all scans follow the principle of least privilege.

**Prerequisite**: You must have sufficient administrative permissions within your tenant to create new roles and manage API keys.

**IMPORTANT**: When generating an API key, ensure you select the Standard security level. CLI scans will fail if the security level of the API key is set to Advanced.

### Create custom roles

Navigate to your role management settings in the tenant to generate the following three roles with these exact permission sets.

| Role name | Required permission and description |
| --- | --- |
| CLI Read-Only Custom | **CLI Tools View**: Grants permission to run CLI scans and view output locally without uploading results to the tenant |
| CLI Write Custom | **CLI Tools View/Edit**: Grants permission to run CLI scans and upload/manage results within the tenant |
| Public API (PAPI) Edit | **Public API View/Edit**: Grants the administrative permission required to programmatically generate and manage new API keys |

### Assign roles to a privileged user

To establish a Primary key holder, you must grant a specific privileged user the permissions from all three custom roles. Because the UI allows only one role to be assigned directly to a user, you must use User Groups to grant multiple roles simultaneously.

1.  **Create user groups**: Create three separate User Groups in your tenant, assigning one of the custom roles to each group.
    
2.  **Add user to groups**: Add the designated privileged user to all three of these User Groups.
    
3.  **Verify accumulated permissions**: Edit the primary user and ensure that the User Groups field includes the three user groups.
    

This user now has the combined authority to generate the Primary API Key required to set up programmatic key generation.

### Generate and use API keys

The designated privileged user must manually generate a Primary API Key through the console. This key must be associated with the `CLI Read-Only Custom`, `CLI Write Custom`, and `Public API (PAPI) Edit` roles. The primary key acts as the master credential for subsequent automation.

Using the Primary Key, developers can now make calls to the Public API to generate subsequent keys as needed for IDE or CLI scans:

-   To run scans without uploading the results to the platform: Generate a key and associate it only with the `CLI Read-Only Custom` role.
    
-   To run scans and upload the results to the platform: Generate a key and associate it only with the `CLI Write Custom` role.
    

The following `curl` command demonstrates how developers can use the Primary Key to generate a new API key assigned with the `CLI Read-Only Custom` role:

```
curl --request POST \\
  --url https://api-viso-k2ibu8behynsxbzuncdau6.xdr-qa2-uat.us.paloaltonetworks.com/public_api/v1/api_keys/generate \\
  --header 'Accept: application/json' \\
  --header 'Content-Type: application/json' \\
  --header 'authorization: <YOUR_PRIMARY_KEY_HERE>' \\
  --header 'x-xdr-auth-id: <YOUR_AUTH_ID>' \\
  --data '{
  "request_data": {
    "roles": [
      "CLI Read-Only Custom"
    ],
    "security_level": "standard",
    "comment": "Developer CLI Read-Only scan key",
    "expiration": 1773147108
  }
}'
```

For more information about generating API Keys, refer to Manage API keys.

To ensure the keys are configured correctly, privileged users can verify their status by navigating to Settings → API Keys. Locate the generated key in the API Keys inventory and confirm that the Role column reflects the specific custom role assigned rather than a broad administrative role.

## Cortex CLI common command line reference guide
This reference guide describes the common command line flags used to manage the Cortex Cloud Application Security,Cloud Workload Protection (CWP) ) and API Security modules through the Cortex CLI, including the structure of base commands and subcommands.

### Common Cortex CLI commands and flags

The following table describes CLI commands common to all supported Cortex CLI modules.

| Command | Description |
| --- | --- |
| \--api-base-url | The public facing API URL. To retrieve the URL, under Settings, select Configurations → API Keys → copy API URL. Required: true. [$CORTEX_API_BASE_URL] |
| \--api-key | The API key used for authorization. Required: true. [$CORTEX_API_KEY] |
| \--api-key-id | The API key ID. Required: true. [$CORTEX_API_KEY_ID] |
| \--soft-fail | Identifies and reports errors identified during a scan but does not trigger a failing condition. Instead, the scan returns a successful result with an exit code of `0`. Unlike skipped or suppressed checks, soft fail errors are still reported but do not cause the scan to fail. Required: false. [$CORTEX_SOFT_FAIL] \*\*Note:\*\* For soft fails, a failed check matches the defined severity threshold. If multiple soft fail severities are specified, the highest severity acts as the threshold for determining a soft fail. However, a successful scan will always return an exit code of `0`, even if block-level findings (which might trigger soft fails based on severity) are present. |
| \--log-level | Set the logging level (INFO, WARNING, ERROR) for Stdout output |
| \--http-proxy | The HTTP proxy server URL to route traffic through [$HTTP_PROXY] |
| \--help | Show help options |
| \--version | Retrieves the version of the Cortex CLI currently in use |

## Cortex CLI for API Security
API Security testing is implemented in Cortex Cloud through the Cortex CLI.

This testing evaluates APIs for vulnerabilities and misconfigurations using fuzzing techniques to ensure secure data transmission, prevent unauthorized access, and to ensure that the API behaves as expected under unexpected or malformed input.

**Prerequisite:**

-   Ensure you have the required user permissions. Refer to Cortex CLI for more information
    
-   Onboard and install the Cortex CLI. Refer to Connect Cortex CLI for more information
    
-   Ensure your application exposes APIs and provides a corresponding OpenAPI Specification file
    
-   Ensure that you have installed `Java v 11` and above
    

### Authentication

The authentication file schema defines the authentication method (such as JWT, Basic) used to authorize connections to your scanned application. The following example provides configurations examples for common methods, including Basic authentication, API Keys and bearer tokens.

Example 160. Authentication File Schema Example

```
type: headers
creds:
    name: <header name>
    value: <header value>
------------------------------------
For basic auth
type: basic
creds:
    username: {USERNAME}
    password: {PASSWORD}
------------------------------------
For API Keys
type: headers
creds:
    name: x-api-key
    value: {API key}
------------------------------------
For Bearer tokens
type: headers
creds:
    name: Authorization
    value: Bearer {BEARER_TOKEN} 
```

  

### Running API Security scans

To scan API Security, run:

```
        ./cortexcli  --log-level <ERROR LEVEL> –-api-base-url <API URL> --api-key <API key from the "Authenticate" step in the CLI connector screen> --auth-id 1 api scan  --api-spec-file <OPENAPI SPEC LOCATION>   --scanned-app-url <BASE URL OF THE SCANNED APP> --java-location <JAVA BIN LOCATION>
        
```

### Output

The API Security scan generates a detailed scan report that includes:

-   **Findings**: These include vulnerabilities and risks identified in the scanned application's APIs, such as SQL Injection, sensitive data leaks, and other issues
    
-   **Errors**: This section lists error responses returned by the scanned application
    
-   **Metadata**: Information such as runtime details, scan status (success or failure), scan duration, hostname and scan parameters
    

The following schema defines the structure and format of API Security scan reports.

Read more...

```
{
  "reportID": "string",
  "results": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "url": "string",
      "method": "string",
      "risk": "string",
      "alert": "string",
      "tags": {},
      "statusCode": "integer",
      "requestBody": "string",
      "curlCommand": "string"
    }
  ],
  "serverErrors": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "url": "string",
      "method": "string",
      "risk": "string",
      "alert": "string",
      "tags": {},
      "statusCode": "integer",
      "requestBody": "string",
      "curlCommand": "string"
    }
  ],
  "scanStartTime": "string (ISO 8601 datetime)",
  "elapsedSeconds": "number",
  "hostname": "string",
  "scanStatus": "string",
  "parameters": {
    "scannedAppURL": "string",
    "apiSpecFile": "string",
    "apiSpecType": "string",
    "timeoutSeconds": "integer"
  }
}
          
      
```

The following is an example of API Security scan output.

Read more...

```
{
  "reportID": "0a739ae6-d18e-11ef-8a06-263731778ec0",
  "results": [
    {
      "id": "0",
      "name": "Server Leaks Version Information via \\"Server\\" HTTP Response Header Field",
      "description": "The web/application server is leaking version information via the \\"Server\\" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.",
      "url": "http://localhost:5000/api/v1/extract",
      "method": "POST",
      "risk": "Low",
      "alert": "Server Leaks Version Information via \\"Server\\" HTTP Response Header Field",
      "tags": {
        "CWE-200": "https://cwe.mitre.org/data/definitions/200.html",
        "OWASP_2017_A06": "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
        "OWASP_2021_A05": "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
        "WSTG-v42-INFO-02": "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server"
      },
      "statusCode": 404,
      "requestBody": "--d3b92f4f-e2e3-4caa-8b00-4e43c8df0d87\\r\\nContent-Disposition: form-data; name=\\"file\\"\\r\\nContent-Type: text/plain\\r\\n\\r\\n\\"John Doe\\"\\r\\n--d3b92f4f-e2e3-4caa-8b00-4e43c8df0d87--",
      "curlCommand": "curl -X POST \\"http://localhost:5000/api/v1/extract\\" -H host: localhost:5000 -H user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0 -H pragma: no-cache -H cache-control: no-cache -H accept: application/json -H content-type: multipart/form-data; boundary=d3b92f4f-e2e3-4caa-8b00-4e43c8df0d87 -H content-length: 165 -d '--d3b92f4f-e2e3-4caa-8b00-4e43c8df0d87\\r\\nContent-Disposition: form-data; name=\\"file\\"\\r\\nContent-Type: text/plain\\r\\n\\r\\n\\"John Doe\\"\\r\\n--d3b92f4f-e2e3-4caa-8b00-4e43c8df0d87--'"
    }
  ],
  "serverErrors": [],
  "scanStartTime": "2025-01-13T11:09:04.919359+02:00",
  "elapsedSeconds": 1.349090375,
  "hostname": "My Computer",
  "scanStatus": "Failed",
  "parameters": {
    "scannedAppURL": "http://localhost:5000",
    "apiSpecFile": "openapi.json",
    "apiSpecType": "openapi",
    "timeoutSeconds": 300
  }
}
        
```

### Cortex CLI API Security command line reference guide
This reference guide describes the dedicated API Security commands and flags, including the structure of base commands and subcommands. Refer to Cortex CLI common command line reference guide for Cortex CLI commands common to all supported modules.

| Value | Command |
| --- | --- |
| \--scanned-app-url (string) | Base URL of the app to scan (required) |
| \--api-spec-file (string) | Path to the API specification file (required) |
| \--api-spec-type (string) | Type of the API specification ('openapi) (default "openapi") |
| \--auth-file (string) | Path to the authentication file (optional). For more information on authentication, refer to Cortex CLI for API Security |
| \--concurrency (int) | Concurrency limit for scan requests (default 5) |
| \--java-location (string) | Path to the Java (version >= 11) binary file (default: Java) |
| \--no-publish (boolean) | Avoid publish results to Cortex |
| \--output-file (string) | Output path for the report file (optional) |
| \--timeout (int) | Scan timeout in seconds (default 300) |
| \--zap-port (int) | Listening port to be used by ZAP (default 35391) |

## Cortex CLI for Cloud Workload Protection
Integrate Cloud Workload Protection (CWP) scans for secrets, vulnerabilities and malware during your continuous integration (CI) process. By leveraging Software Bill of Materials (SBOM) analysis, you can identify and remediate vulnerabilities before images are pushed to the registry, shifting security left and reducing risk in your cloud environments.

**Prerequisites:**

-   Ensure you have the required user permissions. Refer to Cortex CLI for more information
    
-   Onboard and install the Cortex CLI. Refer to Connect Cortex CLI for more information
    
-   Verify that `Java` version 11 and above is installed: Run `java -version` in your terminal. If not, refer to [Java SE Development Kit 11.0.25](https://www.oracle.com/java/technologies/downloads/#java11?er=221886) for information about installing Java
    

### Run CWP security scans

The `cortexcli image scan` command allows you to perform CWP scans on container images. By default, `cortexcli` scans images directly from your local Docker daemon's repository. You can also specify an image archive file to scan instead.

**Prerequisite**: Before you begin, ensure you have `sudo` privileges to execute the image scan.

**Note:**

CWP does not support container image secret scanning for systems running on ARM architecture.

### Scan from local Docker daemon

For direct scanning from your Docker daemon, the image must already exist in your local Docker repository. The CLI will not pull a new image if it does not exist locally.

To scan an image that exists in your local Docker daemon, simply provide its name:

```
./cortexcli --api-base-url <API URL> --api-key <API key from the "Authenticate" step in the CLI connector screen> --api-key-id <API key ID from the "Authenticate" step in the CLI connector screen> image scan <image name>    
```

The image scan accepts the following arguments:

-   `--api-base-url`: Required - true. The public facing API URL. Refer to Connect Cortex CLI for more informationConnect Cortex CLI
    
-   `--api-key`: Required - true. Your Cortex Cloud API key. Refer to Connect Cortex CLI for more informationConnect Cortex CLI
    
-   `--api-key-id`: Required - true. Your Cortex Cloud API key ID
    
-   `image scan`: Required - true. Refers to CWP as the type of scan
    

**Note:**

For available CWP commands, refer to Cloud Workload Protection command line reference.

Example 161. EXAMPLE

```
./cortexcli --api-base-url https://api.cortex.example.com --api-key your-api-key --api-key-id 1 image scan docker.io/library/nginx:latest
```

  

Example 162. EXAMPLE with custom Docker socket path

```
./cortexcli --api-base-url https://api.cortex.example.com --api-key your-api-key --api-key-id 1 image scan --docker-host unix:///var/snap/docker/common/run/docker.sock my-custom-image:latest
```

By default, Cortex Cloud looks for the Docker socket at `unix:///var/run/docker.sock`.

`--docker-host <path>` specifies the path to the Docker socket. Use this flag if your Docker socket is located elsewhere, for example `unix:///var/snap/docker/common/run/docker.sock`.

  

### Scan from an image archive file

**Danger:**

Before you begin, ensure you have sudo privileges to execute the image scan.

To scan an image from a previously saved archive file (such as a .tar file), use the --archive flag:

```
./cortexcli --api-base-url <API URL> --api-key <API key from the "Authenticate" step in the CLI connector screen> --api-key-id <API key ID from the "Authenticate" step in the CLI connector screen> image scan --archive <archive file of container image>
```

**Note:**

-   `--archive`: When used with image scan, sets the scan source to an archive file. When used with image sbom, indicates the SBOM should be exported from an archive file
    
-   The `--archive` flag can also be explicitly set as `--archive=true`
    
-   `--archive-format <value>`: The image archive format (such as `docker-archive` or `oci-archive`). Default: `docker-archive`.
    

### Create an image archive

This example demonstrates how to create an image archive from your Docker or Podman environment, which can then be used for scanning or SBOM generation if you choose not to scan directly from the local daemon.

-   With Docker: `docker save -o ubuntu.tar ubuntu`
    
-   With Podman: `podman save --format oci-archive -o /tmp/alpine-oci.tar alpine:latest`
    

### Export SBOM

You can generate a Software Bill of Materials (SBOM) for your container images using the Cortex CLI and and save the output to a specified file. This functionality enables you to store the SBOM for further analysis, auditing, and compliance.

By default, this will retrieve the SBOM for an image from your local Docker daemon.

To get an SBOM for an image from your local Docker daemon:

```
./cortexcli --api-base-url <API URL> --api-key <API key from the "Authenticate" step in the CLI connector screen> --api-key-id <API key ID from the "Authenticate" step in the CLI connector screen> image sbom <image name> [command options]
```

**Command**: `cortexcli image sbom`: Exports a Software Bill of Materials (SBOM) document for a container image archive.

**Usage**: `cortexcli image sbom [command options]`

**Options**:

-   `--archive-format value`: Specifies the image archive format. Values: `docker-archive` (default), `oci-archive`
    
-   `--output-format value`: Specifies the SBOM document output format. Values: `json` (default), `xml`
    
-   `--output-file value`: Specifies the path to the file where the SBOM document will be saved
    
-   \-`-fields value` `[--fields value]`: Specifies the fields to include in the SBOM document. Multiple fields can be specified including: author, binaries, license, name, purl, sourcePackage, type, version
    
-   \-`-help`, `-h`: Displays help information for the command
    

Example 163. EXAMPLE

```
./cortexcli --api-base-url https://api.cortex.example.com --api-key your-api-key --api-key-id 1 image sbom docker.io/library/alpine:latest
```

  

To export an SBOM from an image archive file, use the `--archive` flag:

```
./cortexcli --api-base-url <API URL> --api-key <API key from the "Authenticate" step in the CLI connector screen> --api-key-id <API key ID from the "Authenticate" step in the CLI connector screen> image sbom --archive <archive file of container image>
```

**NAME**: `cortexcli image sbom` - Exports an SBOM document for an image from the local Docker daemon or an image archive.

**USAGE**: `cortexcli image sbom` [command options] [image name or archive file].

### Troubleshooting

-   **Docker socket not reachable**: If you encounter errors indicating the Docker socket cannot be reached, ensure the Docker daemon is running and verify the path to your Docker socket. If it's not in the default location (`unix:///var/run/docker.sock`), use the `--docker-host` flag to specify the correct path
    
-   **Image not found**: If you attempt to scan an image directly from the Docker daemon and receive an error that the image does not exist, confirm that the image is indeed present in your local Docker repository by running `docker images`. The CLI will not pull images

### Cloud Workload Protection command line reference
This reference guide documents the Cloud Workload Protection commands and flags for the Cortex CLI, including the structure of base commands and subcommands. Refer to Cortex CLI common command line reference guide for Cortex CLI commands common to all supported modules.

| Command | Description |
| --- | --- |
| \--image scan | Scans a container image archive |
| \--ci-pipeline-id value | The CI pipeline identifier |
| \--ci-build-id value | The CI build identifier |
| \--timeout value | Timeout (in seconds) after which the scan will be terminated if it has not completed (default: 60) |
| \--output-format value | Output format options: `human-readable`, `json` (default: human-readable) |
| \--archive-format value | The image archive format options: `docker-archive`, `oci-archive` (default: docker-archive) |
| \--name value | The name assigned to the image |
| \--docker-host <path> | Specifies the path to the Docker socket |
| \--archive        | Specifies that the image scan should use an archive file |

## Cortex CLI for Code Security
Cortex CLI for Code Security scans allow developers and security teams to integrate security checks directly into their application development workflows.

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
    

### Code Security CLI scan behavior and output

-   Scans generate assets (see Code Security assets, issues, and findingsissuesfindings
    
-   If one scanner (such as Secrets) fails, the other scanners will continue to run and produce results
    
-   Scan failures trigger an error message indicating the scanner that failed
    
-   The Code Security CLI provides these output modes for flexible management and viewing of scan results:
    
    -   **Upload to platform**: `--upload-mode = true` (default). Uploads scan results directly to the platform for centralized analysis and management
        
    -   **Upload findings only**. `--upload-mode = false` (default). Upload findings, but without including the actual source code content. This prevents raw source code from leaving your local environment or being stored on the platform
        
    -   **CLI output only**: `upload = false` (default). View scan results directly in your command-line interface without being uploaded to the platform
        
    
    For more information about the output flags, refer to Cortex CLI Cortex Cloud Application Security command line reference.
    

### Authentication

To authenticate the Code Security CLI, choose one of the following methods:

-   **Using command-line flags**: Provide authentication details directly with your commands
    
    The following flags are required to authenticate the Code Security CLI:
    
    -   `--api-base-url`: [$CORTEX_API_BASE_URL]
        
    -   `--api-key`: [$CORTEX_API_KEY]
        
    -   `--auth-id`. [$CORTEX_AUTH_ID]
        
    
    For more information about these flags, refer to Cortex CLI common command line reference guide.
    
-   **Using a `cortex.env` file**: Place your authentication details in a `cortex.env` file. You can download this file from the UI
    
-   **Using a `cortex.yaml` file**: Place your authentication details in a `cortex.yaml` file
    

### Requirements

**Prerequisites:**

-   **For the Cortex CLI binary**:
    
    -   Ensure you have `Node.js v22` installed on your host machine before running any scans with the Cortex CLI. This is crucial to prevent runtime errors, as the CLI depends on Node.js for executing JavaScript analysis
        
        **Note:**
        
        -   To check your version of `Node.js`, run `node -v`
            
        -   To download Node.js, refer to the official [Node.js](https://nodejs.org/) site
            
        
    -   For Linux OS systems, ensure that GLIBC (GNU C library) version 2.35 or greater is installed
        
    
    **Note:**
    
    This requirement does not apply when using the CLI as a container image.
    
-   **Permissions**: Ensure you have the required user permissions. Refer to Cortex CLI for more information
    
-   Onboard and install the Cortex CLI. Refer to Connect Cortex CLI for more information
    

### Configure proxy for the Code Security CLI

When operating the Code Security CLI within environments requiring internet access via a proxy server, you can configure the tool to route its traffic through your proxy using standard environment variables. For proxies that perform TLS inspection, you must also specify a CA certificate

-   **Environment variables**: Set `HTTP_PROXY` and `HTTPS_PROXY` (or `http_proxy` and `https_proxy`) to your proxy address
    
-   **CA Certificate**: Use the `--ca-certificate` flag or the `$CORTEX_CA_CERTIFICATE` environment variable to provide your CA certificate for proxies that perform TLS inspection. The flag is now global and must appear before `code scan`. It is currently limited to the Application Security CLI. You can either:

### Cortex CLI usage for Cortex Cloud Application Security
To scan Cortex Cloud Application Security, run:

```
cortexcli –-api-base-url <API URL> --api-key <API key from the "Authenticate" step in the CLI connector screen> --api-key-id <API Key ID> code scan --directory {{DIRECTORY}} --branch main --repo-id organization/repo-name –output json --output-file-path ./output.json
```

#### Command line reference

The command structure includes global flags which are used for authentication, and then specifies the module name and command specific to Cortex Cloud Application Security which are followed by dedicated flags unique to this module as well as flags common to all modules.

-   **Global flags**: These flags are part of the initial `cortexcli` command and are necessary to authenticate and connect to Cortex Cloud
    
    -   `--api-base-url`: (Required = true). The public facing API URL. Refer to Connect Cortex CLI for more informationConnect Cortex CLI
        
    -   `--api-key`: (Required = true). The Cortex Cloud API key generated when onboarding the CLI as a data source. Refer to Connect Cortex CLI for more informationConnect Cortex CLI
        
    -   `--api-key-id`: (Required = true). The Cortex Cloud API key ID generated when onboarding the CLI as a data source
        
    
    For a comprehensive list of Cortex Cloud Application Security global flags, refer to Cortex CLI Cortex Cloud Application Security command line reference
    
-   **Cortex Cloud Application Security specifics**: Following the global flags, the command specifies the module and the commands required for initiating a scan using the Cortex Cloud Application Security module:
    
    -   `code scan`: Required - true. This command instructs the CLI to perform an Cortex Cloud Application Security scan.
        
    -   For the optional flags, refer to the dedicated Cortex Cloud Application Security command line reference
        
    

#### CLI Usage Examples

-   **Send output to a file**: Direct the command's output to a specified file instead of displaying it in the console
    
    ```
    ./cortexcli --api-base-url <BASE_URL> --api-key <API_KEY> --api-key-id <API_KEY_ID> code scan --branch <branch name> --repo-id <repo name> --directory <path> --output json --output-file-path <path>
    ```
    
-   **Perform a scan without upload**: Run a scan for local analysis or testing without uploading the results to Cortex Cloud. This command runs a code scan and saves all standard output (human-readable format) to `scan_results.txt`
    
    ```
    ./cortexcli --api-base-url <BASE_URL> --api-key <API_KEY> --api-key-id <API_KEY_ID> code scan --upload-mode no-upload --branch <branch name> --repo-id <repo name> --directory <path>
    ```
    

#### Sample outputs

The `cortexcli` provides different options for how scan results are presented.

-   **Standard output** (stdout): When no specific output format flags (such as `--output json` or `--output sarif)` are provided, the Cortex CLI will produce standard output directly to your terminal or console
    
-   **JSON output**: To obtain the output of a scan command as a JSON file, specify the flags `--output json --output-file-path ./output.json`. This command will save the detailed scan results in JSON format to output.json in the current directory.
    

#### Supported flags

The Cortex Cloud Application Security CLI supports both common Cortex CLI and dedicated Cortex Cloud Application Security flags.

-   For dedicated Cortex Cloud Application Security flags, refer to Cortex CLI Cortex Cloud Application Security command line reference
    
-   For common flags, refer to Cortex CLI common command line reference guide

### Cortex CLI Cortex Cloud Application Security command line reference
This reference guide documents the commands and flags unique to the Cortex Cloud Application Security CLI. For CLI commands common to all supported modules refer to Cortex CLI common command line reference guide.

**Important:**

The Cortex CLI Cortex Cloud Application Security only supports single occurrences of each flag. If the same flag is passed multiple times, only the last provided value will be used. For example, in the following command, only TF CloudFormation will be the scanned framework.

Example 164. 

./cortexcli --api-base-url <YOUR_API_URL> --api-key <YOUR_API_KEY> --auth-id <YOUR_AUTH_ID> --framework terraform --framework "terraform cloudformation"

  

| Command/Variable | Description |
| --- | --- |
| \--source | The source of execution. Default source: CLI. Examples: Jenkins, GitHub Actions, CLI |
| \--repo-id | Required for upload mode. Identity string of the repository. Format `repo_owner/repo_name`. \*\*Note:\*\* The repo-id flag must not end with `.config`, `.log` or `.ini`. `-config` is acceptable. Example 165. `--repo-id foo.config` will be blocked; `--repo-id foo-config` will pass To retrieve the repository ID, under Inventory, navigate to All Assets → Repositories (under Code) → select a repository → copy the Asset ID value from the Properties section of the side card. |
| \--branch | Required for upload mode. Selected branch of the persisted repository |
| \--directory | Required. The directory path to scan. Cannot be used together with `--file` |
| \--file | The file path to scan. Cannot be used together with `--directory`. When using this option, the Cortex CLI will filter runners based on the file type provided. For example, if you specify a `.tf` file, only the Terraform and secrets frameworks will be included. You can further limit this (for example; skip secrets) by using the `--skip-framework` argument |
| \--var-file | Variable files to load in addition to the default files. This feature is currently supported for both source Terraform (.tfvars files) and Helm chart scans (for providing custom values or variable overrides). Refer to [https://www.terraform.io/docs/language/values/variables.html#variable-definitions-tfvars-files](https://www.terraform.io/docs/language/values/variables.html#variable-definitions-tfvars-files)) for more information |
| \--framework | Filter to scan specific frameworks. Example: `--framework arm`. Syntax: Use a single flag with comma-separated values for multiple frameworks. Both quoted (`"arm,ansible"`) and unquoted (`arm,ansible`) formats are supported. Example: `--framework arm,ansible`. Constraint: **Do not** use multiple --framework flags: `--framework terraform --framework sca_package`. Environment variables: `export CORTEX_CODE_FRAMEWORK=arm,ansible`. Supported frameworks: `ARM`, `ANSIBLE`, `BICEP`, `CLOUDFORMATION`, `DOCKER`, `DOCKERFILE`, `HELM`, `KUBERNETES`, `KUSTOMIZE`, `OPENAPI`, `SCA`, `SECRETS`, `SERVERLESS`, `TERRAFORM`, `TERRAFORMJSON`, `TERRAFORMPLAN` |
| \--skip-framework | Skip specific frameworks. Example: `--skip-framework terraform`. Syntax: Use a single flag with comma-separated values for multiple frameworks. Both quoted (`"arm,ansible"`) and unquoted (`arm,ansible`) formats are supported. Example: `--skip-framework terraform, sca_package`. Constraint: **Do not** use multiple skip --framework flags: `--skip-framework terraform --skip-framework sca_package`. Environment variables: `export CORTEX_CODE_SKIP_FRAMEWORK="tf,sca"` |
| \--ca-certificate | CA Certificate to use |
| \--no-cert-verify | This flag disables TLS/SSL certificate verification (default: false). Skips TLS certificate verification when connecting to the API. Use only in test or development environments, as this reduces connection security |
| \--summary-position | Sets the position for displaying the summary information |
| \--upload-mode | Upload mode determines the method or mode used to upload data, and includes these options: `upload` : Uploads scan results to the Cortex Cloud platform; `no-upload` : Disables uploads of scan results to the platform; `no-code`: Uploads scan findings to the platform, but without including the actual source code content (code blocks in the uploaded data |
| \--external-modules-download-path | Specifies the directory to download external modules to. Defaults to `.external_modules` |
| \--output Supported formats: cli, json, spdx, junitxml, sarif, cyclonedx, cyclonedx_json | Output format for reporting |
| \--output-file-path | Specifies the output path for the scan result file |
| \--deep-analysis | Enables or disables deep analysis of the Terraform plan and related files |
| \--repo-root-for-plan-enrichment | Enriches Terraform plan findings by mapping them to their original `.tf` files |
| \--skip-path | Specifies a path (file or directory) that should be skipped during the scanning process. This option is useful for excluding specific files or directories that are not relevant to the scanning analysis, increasing the efficiency and accuracy of scan results |
| \--create-repo-if-missing | Determines whether the system should create a repository if it is missing. This option allows users to automate the creation of repositories as needed and ensure that all required repositories are available for scanning. For example, when running automated scans or integrating with version control systems, enabling `--create-repo-if-missing` can help maintain consistency and prevent disruptions due to missing repositories |
| \--compact | Do not display code blocks in the output |
| \--no-fail-on-crash | Prevents the application from failing (blocking pipelines) in the event of a scanner or backend failure. Instead of returning a `2` exit code, it will return a `0` exit code in such scenarios. |
| \--var-file | Variable files to load in addition to the default files, Currently only supported for source Terraform (.tf file) and Helm chart scans |
| CORTEX_APPSEC_VALIDATE_SECRETS | Controls whether secret validation is performed. By default, this feature is disabled. Set `CORTEX_APPSEC_VALIDATE_SECRETS = true` to enable it |
| \--timeout | Sets the maximum time the Cortex CLI will wait for triggered local scan processes to complete. Default value: 15 minutes. Syntax: **To specify a duration**: Use a numeric value followed by a unit (for example `--timeout 10m`); **Default unit**: Numeric values entered without a unit are interpreted as seconds. For example, `30` is equal to 30 seconds.; **Supported units**: Milliseconds, seconds, minutes and hours |
| \--help | Help |
