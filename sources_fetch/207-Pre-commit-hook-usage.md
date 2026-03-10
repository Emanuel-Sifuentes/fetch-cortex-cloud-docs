---
title: "Pre-commit hook usage"
tocId: "OTaPlrQdcTZ5GuJ5QuzB6w"
contentId: "e8axx3uu1SNgqLc8kVdNhA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Pre-commit-hook-usage"
depth: 4
---

# Pre-commit hook usage
You can run secrets checks on your code, customize its behavior using supported flags, and suppress detected secrets when required.

By default, Cortex CLI pre-commit hooks:

-   **Scan staged files only**: The scan performs a quick and efficient check by only analyzing the changes you are about to commit, rather than the entire codebase
    
-   **Scan for secrets only**: Pre-commit hooks support secrets scans only
    
-   **Do not upload results to the platform**: All scan results are kept local to your machine, ensuring your data remains private
    

## Command flag reference

Use the following flags with the `cortexcli code pre-commit` command to customize scanner behavior.

-   `--ignore-existing-secrets`: Ignores secrets that already exist from a periodic scan (default: false) `[$CORTEX_CODE_IGNORE_EXISTING_SECRETS]`
    
-   `--validate-secrets`: Checks if the secrets are valid (default: false) `[$CORTEX_CODE_VALIDATE_SECRETS]`
    
-   `--skip-path`: Specifies a file or directory path to skip during the scan `[$CORTEX_CODE_SKIP_PATH]`
    
-   `--compact`: Prevents the display of code blocks in the output (default: false) `[$CORTEX_CODE_COMPACT]`
    
-   `--summary-position`: Determines whether the summary appears on top (before the check results) or on bottom (after the check results). (default: top) `[$CORTEX_CODE_SUMMARY_POSITION]`
    
-   `--no-fail-on-crash`: Returns exit code 0 instead of 2 in case of a failure in the integration with the platform (default: false) `[$CORTEX_CODE_NO_FAIL_ON_CRASH]`
    
-   `--help, -h`: Displays a help message with available options
    

## Secrets suppression

You can suppress secrets directly within your code by adding a comment. This is useful for secrets that are intentionally included or a false positive and are not a security risk. Currently, suppression is not supported in `JSON` files.

The comment format is:

 `cortex:skip=<SECRET_ID>:<suppression justification>`

Replace `<SECRET_ID>` with the specific ID provided in the scan output, and provide a brief explanation for why the secret is being suppressed. The comment syntax will depend on the file type.

Example 23. Example

Comments in a Dockerfile begin with (`#`). Note the comment in the **After suppression** code-block below.

-   **Before suppression**:
    
    ```
    ENV SEC_1="ghp_3xyKmc3W7XanE82IKHJ3Z3AfHbV"
    ```
    
-   **After suppression**:
    
    ```
    \# cortex:skip=APPSEC_SECRET_43: Suppress this key for testing purposes
    ENV SEC_1="ghp_3xyKmc3W7XanE82IKHJ3Z3AfHbV"           
    ```