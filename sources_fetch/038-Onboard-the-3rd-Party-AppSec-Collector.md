---
title: "Onboard the 3rd Party AppSec Collector"
tocId: "iTGrB7jcrlVCh_mBp1Utqw"
contentId: "PppPulfuChkzuc4UcVR1SA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Onboard-the-3rd-Party-AppSec-Collector"
depth: 3
---

# Onboard the 3rd Party AppSec Collector
Before you begin, fulfill these prerequisites.

**Prerequisites**

-   **Permissions**: The following Cortex Cloud user roles or RBAC permissions are required:
    
    -   **User roles**: CortexCortex Cloud Cloud Instance Admin, AppSec Admin
        
    -   **RBAC**: View/Edit permissions for Data Sources configurations are required when not using a dedicated user role
        
    
    For more information about user permissions and groups, refer to Assign user roles and groups.Assign user roles and groups
    
-   Onboard the repository into the system before SARIF findings for that repository can be uploaded
    
-   **SARIF specifications**: The following table outlines the mandatory and optional JSON fields required to successfully validate and ingest SAST findings.
    
    Cortex Cloud Application Security supports only valid SARIF files that strictly adhere to the SARIF standard (v2.1.0). The collector will not ingest files with invalid formats or schema violations. Ensure your third-party tool output is validated before upload.
    
    | Field Path | Requirement | Description and Validation |
    | --- | --- | --- |
    | `version` | Mandatory | The SARIF version number. Must be explicitly set to the string value `2.1.0` |
    | `tool.driver.name` | Mandatory | A string identifying the primary analysis tool used |
    | `runs.tool.driver.rules` OR `runs.tool.extensions.rules` | Mandatory | At least one of these must be populated to define all ruleId's used in the results |
    | `run.results.ruleId` | Mandatory | The unique identifier for the specific rule violated. This must exactly match an id defined in the rules array |
    | `run.results[].locations[].physicalLocation.artifactLocation.uri` | Mandatory | The relative or absolute URI for the file where the finding was detected |
    | `run.results[].locations[].physicalLocation.region`, | Mandatory | The specific region within the file where the finding is located. This object must contain the `startLine` property to identify the location |
    | `run.results.message.text` | Mandatory | A human-readable, plain-text description of the finding. This is the primary text displayed to the user. |
    | `run.results.level` | Optional | The severity level of the finding. Allowed values are error, warning, note, or none. If omitted, a Low severity level is set by default |
    

1.  Select Settings → Data Sources & Integrations → \+ Add New → and enter 3rd Party AppSec Collector in the search bar.
    
2.  On the Configure Collector step of the integration wizard.
    
    1.  Provide a Collector Name (required): This is a free-text field. You can input any descriptive name.
        
        **Note**
        
        We recommend using the `tool.driver.name` from the SARIF file.
        
    2.  Click Generate API Key to obtain the collector instance API key ID and key secret.
        
3.  On the API Key step of the integration wizard.
    
    1.  Copy and save the generated API key ID and API secret.
        
        **Warning**
        
        The API key ID and API secret cannot be retrieved once the wizard is closed.
        
    2.  Copy the API URL.
        
        **Note**
        
        This is the newly created generic collector API URL endpoint.
        
    3.  Select Next.
        
4.  (Optional): Validate the file format on the Test step of the wizard to ensure it meets all ingestion requirements.
    
    **Note**
    
    Only the validity of the format is tested. No findings will be generated from the test file.
    
    1.  Browse and upload the required file.
        
        After upload, you'll see one of the following validation outcomes:
        
        -   Validation completed successfully
            
        -   Validation finished with warnings: One or more of the properties of at least one of the **results** of the SARIF format failed validation
            
        -   Validation failed: one of the mandatory fields is missing/wrong value. See SARIF mandatory fields in the prerequisites above
            
        
    2.  Select Done.
        
5.  Setup the data extraction to programmatically send the SARIF SAST results to the Cortex Cloud 3rd Party AppSec Collector instance via API.
    
    You need to add the following values to the API request:
    
    -   The Cortex Cloud API key ID and secret generated in **step 2** above
        
    -   The Cortex Cloud URL copied in **step 3** above
        
    -   Your Cortex Cloud repository ID. To retrieve the repository ID, under Inventory, navigate to All Assets → Repositories (under Code) → select a repository → copy the Asset ID value from the Properties section of the side card
        
    -   (Optional) Branch: Default unless specified
        
    
    Example 3. Example Setups
    
    -   `cURL`
        
        ```
        curl -X POST {API_URL_FROM_RESPONSE}?repository_id={repository_asset_id}&branch={branch_name} -H 'x-crtx-auth-id: {token_id}' -H 'Authorization: {api_token}' -H 'Content-Type: application/json' -d '{"example": "value"}' 
        ```
        
    -   Full `cURL` example
        
        Read more...
        
        ```
        curl --location '{base-URL}' \\
          --header 'Authorization:{API_KEY}' \\
          --header 'x-crtx-auth-id: {API_KEY_ID}' \\
          --header 'Content-Type: application/json' \\
          --data '{
            "$schema": "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json",
            "version": "2.1.0",
            "runs": \[
              {
                "tool": {
                  "driver": {
                    "name": "Veracode Static Analysis Policy Scan",
                    "rules": \[
                      {
                        "id": "78",
                        "name": "Improper Neutralization of Special Elements used in an OS Command ('\\\\''OS Command Injection'\\\\'')",
                        "shortDescription": {
                          "text": "CWE-78: Improper Neutralization of Special Elements used in an OS Command ('\\\\''OS Command Injection'\\\\'')"
                        },
                        "helpUri": "https://cwe.mitre.org/data/definitions/78.html",
                        "properties": {
                          "category": "STATIC",
                          "tags": \[
                            "STATIC"
                          \]
                        },
                        "defaultConfiguration": {
                          "level": "error"
                        }
                      },
                      {
                        "id": "89",
                        "name": "Improper Neutralization of Special Elements used in an SQL Command ('\\\\''SQL Injection'\\\\'')",
                        "shortDescription": {
                          "text": "CWE-89: Improper Neutralization of Special Elements used in an SQL Command ('\\\\''SQL Injection'\\\\'')"
                        },
                        "helpUri": "https://cwe.mitre.org/data/definitions/89.html",
                        "properties": {
                          "category": "STATIC",
                          "tags": \[
                            "STATIC"
                          \]
                        },
                        "defaultConfiguration": {
                          "level": "error"
                        }
                      }
                    \],
                    "version": "1.0"
                  }
                },
                "results": \[
                  {
                    "level": "error",
                    "rank": 5,
                    "message": {
                      "text": "<span>This call to java.lang.ProcessBuilder.start() contains a command injection flaw.  The argument to the function is constructed using untrusted input.  If an attacker is allowed to specify all or part of the command, it may be possible to execute commands on the server with the privileges of the executing process.  The level of exposure depends on the effectiveness of input validation routines, if any. start() was called on the processBuilder object, which contains tainted data. The tainted data originated from an earlier call to AnnotationVirtualController.vc_annotation_entry.</span> <span>Validate all untrusted input to ensure that it conforms to the expected format, using centralized data validation routines when possible.  When using blocklists, be sure that the sanitizing routine performs a sufficient number of iterations to remove all instances of disallowed characters.  Most APIs that execute system commands also have a \\\\\\"safe\\\\\\" version of the method that takes an array of strings as input rather than a single string, which protects against some forms of command injection.</span> <span>References: <a href=\\\\\\"https://cwe.mitre.org/data/definitions/78.html\\\\\\">CWE</a> <a href=\\\\\\"https://owasp.org/www-community/attacks/Command_Injection\\\\\\">OWASP</a></span>"
                    },
                    "locations": \[
                      {
                        "physicalLocation": {
                          "artifactLocation": {
                            "uri": "com/scalesec/vulnado/Cowsay.java"
                          },
                          "region": {
                            "startLine": 16
                          }
                        },
                        "logicalLocations": \[
                          {
                            "name": "Cowsay.java",
                            "fullyQualifiedName": "com.scalesec.vulnado.Cowsay.run",
                            "kind": "function"
                          },
                          {
                            "fullyQualifiedName": "java.lang.ProcessBuilder.start",
                            "kind": "member",
                            "parentIndex": 0
                          }
                        \]
                      }
                    \],
                    "ruleId": "78",
                    "partialFingerprints": {
                      "context_guid": "",
                      "file_path": "",
                      "procedure": ""
                    }
                  },
                  {
                    "level": "error",
                    "rank": 4,
                    "message": {
                      "text": "<span>This database query contains a SQL injection flaw.  The call to java.sql.Statement.executeQuery() constructs a dynamic SQL query using a variable derived from untrusted input.  An attacker could exploit this flaw to execute arbitrary SQL queries against the database. The first argument to executeQuery() contains tainted data from the variable query. The tainted data originated from an earlier call to AnnotationVirtualController.vc_annotation_entry.</span> <span>Avoid dynamically constructing SQL queries.  Instead, use parameterized prepared statements to prevent the database from interpreting the contents of bind variables as part of the query.  Always validate untrusted input to ensure that it conforms to the expected format, using centralized data validation routines when possible.</span> <span>References: <a href=\\\\\\"https://cwe.mitre.org/data/definitions/89.html\\\\\\">CWE</a> <a href=\\\\\\"https://owasp.org/www-community/attacks/SQL_Injection\\\\\\">OWASP</a></span>"
                    },
                    "locations": \[
                      {
                        "physicalLocation": {
                          "artifactLocation": {
                            "uri": "com/scalesec/vulnado/User.java"
                          },
                          "region": {
                            "startLine": 49
                          }
                        },
                        "logicalLocations": \[
                          {
                            "name": "User.java",
                            "fullyQualifiedName": "com.scalesec.vulnado.User.fetch",
                            "kind": "function"
                          },
                          {
                            "fullyQualifiedName": "java.sql.Statement.executeQuery",
                            "kind": "member",
                            "parentIndex": 0
                          }
                        \]
                      }
                    \],
                    "ruleId": "89",
                    "partialFingerprints": {
                      "context_guid": "",
                      "file_path": "",
                      "procedure": ""
                    }
                  }
                \]
              }
            \]
          }'
        ```
        
    -   `Python 3`
        
        ```
        import requests
        import json
        
        def generic_collector(token_id, api_token):
            headers = {
                "Authorization": {token_id},
                "x-crtx-auth-id": {api_token},
                "Content-Type": "application/json"
            }
        
            body = json.dumps({"example": "value"})
            res = requests.post(url="{API_URL_FROM_RESPONSE}?repository_id={repository_asset_id}&branch={branch_name}",
                                headers=headers,
                                data=body)
            return res
        ```
        
    
      
    
6.  Validate the connector status.
    
    1.  Navigate to Settings → Data Sources & Integrations → and enter 3rd Party AppSec Collector in the search bar.
        
    2.  Select View Details.
        
    3.  Check that your instance is displayed on the Collector Instances page, and that the status of your instance is Connected.
        

## Manage 3rd Party AppSec Collector instances

1.  Navigate to Settings → Data Sources & Integrations → and enter 3rd Party AppSec Collector in the search bar.
    
2.  Select View Details.
    
3.  Right-click on your instance → Edit instance.
    
    You are redirected to the Generic 3rd Party AppSec Collector onboarding wizard to modify required content.