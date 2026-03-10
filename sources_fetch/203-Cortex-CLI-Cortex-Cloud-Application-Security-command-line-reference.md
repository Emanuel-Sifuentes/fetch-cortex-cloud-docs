---
title: "Cortex CLI Cortex Cloud Application Security command line reference"
tocId: "zScssRW1wHQh3CfPQui_eQ"
contentId: "gcL3U39clHyyWGcvsWhZrw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Cortex-CLI-Cortex-Cloud-Application-Security-command-line-reference"
depth: 2
---

# Cortex CLI Cortex Cloud Application Security command line reference
This reference guide documents the commands and flags unique to the Cortex Cloud Application Security CLI. For CLI commands common to all supported modules refer to Cortex CLI common command line reference guide.

**Important**

The Cortex CLI Cortex Cloud Application Security only supports single occurrences of each flag. If the same flag is passed multiple times, only the last provided value will be used. For example, in the following command, only TF CloudFormation will be the scanned framework.

Example 21. 

./cortexcli --api-base-url <YOUR_API_URL> --api-key <YOUR_API_KEY> --auth-id <YOUR_AUTH_ID> --framework terraform --framework "terraform cloudformation"

  

| Command/Variable | Description |
| --- | --- |
| \--source | The source of execution. Default source: CLI. Examples: Jenkins, GitHub Actions, CLI |
| \--repo-id | Required for upload mode. Identity string of the repository. Format `repo_owner/repo_name`. \*\*Note:\*\* The repo-id flag must not end with `.config`, `.log` or `.ini`. `-config` is acceptable. Example 22.  `--repo-id foo.config` will be blocked; `--repo-id foo-config` will pass  
To retrieve the repository ID, under Inventory, navigate to All Assets → Repositories (under Code) → select a repository → copy the Asset ID value from the Properties section of the side card. |
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