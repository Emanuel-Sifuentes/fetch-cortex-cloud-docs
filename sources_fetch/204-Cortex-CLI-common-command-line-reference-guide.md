---
title: "Cortex CLI common command line reference guide"
tocId: "YTl82KE09_ryNqyNb9Po6w"
contentId: "x~EhBmVYZqqz~BJ3Sz~pmQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Cortex-CLI-common-command-line-reference-guide"
depth: 2
---

# Cortex CLI common command line reference guide
This reference guide describes the common command line flags used to manage the Cortex Cloud Application Security,Cloud Workload Protection (CWP) ) and API Security modules through the Cortex CLI, including the structure of base commands and subcommands.

## Common Cortex CLI commands and flags

The following table describes CLI commands common to all supported Cortex CLI modules.

| Command | Description |
| --- | --- |
| \--api-base-url | The public facing API URL. To retrieve the URL, under Settings, select Configurations → API Keys → copy API URL. Required: true. \[$CORTEX_API_BASE_URL\] |
| \--api-key | The API key used for authorization. Required: true. \[$CORTEX_API_KEY\] |
| \--api-key-id | The API key ID. Required: true. \[$CORTEX_API_KEY_ID\] |
| \--soft-fail | Identifies and reports errors identified during a scan but does not trigger a failing condition. Instead, the scan returns a successful result with an exit code of `0`. Unlike skipped or suppressed checks, soft fail errors are still reported but do not cause the scan to fail. Required: false. \[$CORTEX_SOFT_FAIL\] \*\*Note:\*\* For soft fails, a failed check matches the defined severity threshold. If multiple soft fail severities are specified, the highest severity acts as the threshold for determining a soft fail. However, a successful scan will always return an exit code of `0`, even if block-level findings (which might trigger soft fails based on severity) are present. |
| \--log-level | Set the logging level (INFO, WARNING, ERROR) for Stdout output |
| \--http-proxy | The HTTP proxy server URL to route traffic through \[$HTTP_PROXY\] |
| \--help | Show help options |
| \--version | Retrieves the version of the Cortex CLI currently in use |