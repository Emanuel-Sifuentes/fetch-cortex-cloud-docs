---
title: "Cortex Cloud Application Security code policy Condition attributes"
tocId: "Am6y8~CchyaAcMUInYceeg"
contentId: "zLh5bsAAvuHR51SDr6sFSg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Cortex-Cloud-Application-Security-code-policy-Condition-attributes"
depth: 4
---

# Cortex Cloud Application Security code policy Condition attributes

Learn about Application Security code policy Condition filters and attributes.

Condition attributes are data fields used to filter findings. The list includes common attributes - including the Finding Type attribute - as well as scanner-specific attributes, which are displayed after you select a scanner as the Finding Type. You can select multiple attributes, from both common and scanner-specific lists, to create precise filters and target policies more effectively.

## Common Condition attributes

-   Severity. Values: Select All, Critical, High, Medium, Low
    
-   Backlog Status. Values: Select All, Backlog, New
    
    For more information about Backlog Status, refer to Backlog baseline
    
-   Respect Developer Suppression. Values: Select All, Yes, No. For more information on developer suppressions, see Developer Suppressions below
    
-   Category. The top-level domain for organizing security findings. Values: Configuration, Vulnerability, Malware, Identity, Data, Code, Posture, Brand Protection
    
-   Finding Type: See below for detailed information
    

## Finding Type-specific attributes (scanner-specific)

The Finding Type filter allows you to select the scan types that the policy will apply to. Multiple selection is supported.

Finding Type properties include: Select All, Secrets, IaC Misconfigurations, Vulnerabilities, Licenses, Operational Risk and Code Weaknesses

After selecting Finding Type as the filter, you can further refine the policy criteria by selecting specific attributes of the finding type using the `AND` operator.

Example 7. Example

When License is selected as the finding type, these following package attributes are available for filtering: License Type, Package Deprecated, Package Maintained, Package Operational Risk and Package Popularity. If you select License Type, a list of selectable licenses (such as Artistic 2.0, APSL) are displayed.

  

The following describes the scanner type attributes.

**Secrets**

- Severity — Logic: Equal to, greater than, less than; Severity level: Critical, High, Medium, Low
- AppSec Rule — Logic: Is, Is not; Rules: Multi-selection list of available detection rules or type-in field
- Secret Validity — Logic: Is, Is not; Values: Privileged, Valid, Invalid, Unknown
- AppSec Rule Labels — Logic: Is, Is not; Labels: Multi-selection list of available labels

**IaC misconfiguration**

- Has an automated fix — Logic: Is, Is not; Values: Select All, Yes, No
- AppSec Rule — Logic: Is, Is not; Rules: Multi-selection list of available detection rules
- IaC tag — Logic: Is, Is not; Tags: [One or more tags, separated by commas or spaces]
- AppSec Rule Labels — Logic: Is, Is not; Labels: [Multi-selection list of available labels or type-in field]
- IaC Compliance — Logic: Is, Is not; Values: Compliance Standard, Compliance Control

**Vulnerabilities**

- Risk Factors — Logic: Is, Is not; Values: Critical severity, High severity, Medium severity, Has fix, Remote execution, DoS-Low, DoS-High, Recent vulnerability, Exploit exists in the wild, Exploit exists - POC, Attack complexity: low, Attack vector: network
- CVE ID — Logic: Is, Is not; CVE IDs: [Multiple CVE IDs can be entered, separated by commas or spaces]
- CVE Fix Available Date — Range: Select a start and end date
- CVE Publish Date — Range: Select a start and end time
- CVSS Score — Logic: Is equal to, is not equal to, is equal or greater than, is equal or less than; Score: Number between 0-10
- EPSS — Logic: Is equal to, is not equal to, is equal or greater than, is equal or less than; Number between 0.00-1.00
- Has a fix — Logic: Is, Is not; Values: Select All, Yes, No
- Is KEV — Logic: Is, Is not; Values: Select All, Yes, No
- Package Name — Logic: Is, Is not, Contains, Does not contain; Package Name: [Package name string]
- Package Deprecated — Logic: Is, Is not; Values: Select All, Yes, No
- Package Maintained — Logic: Is, Is not; Values: Infrequently Maintained, Moderately Maintained, Frequently Maintained
- Package Popularity — Logic: Is, Is not; Values: Select All, Low, Medium, High
- Package Operational Risk — Logic: Is, Is not; Values: Select All, Low, Medium, High
- Package Version — Logic: Equal to, not equal to, greater than, less than; Version: [Package version string]

**License**

- License Type — Logic: Is, Is not; Licenses: Multi-selection list of available license types
- AppSec Rule: See above
- AppSec Rule Label: See above
- Package Deprecated: See above
- Package Maintained: See above
- Package Name: See above
- Package Operational Risk: See above
- Package Popularity: See above
- Package Version: See above

**Operational risk**

- Popularity: See Package Popularity above
- Maintained: See Package Maintained above
- Deprecated: See Package Deprecated above
- Package Name: See above
- Package Version: See above

**Code Weaknesses**

- CWE — Logic: Contains, does not contain, equals, does not equal; Values: [CWE ID (text string)]
- Language — Logic: Contains, does not contain, equals, does not equal; Values: [Supported program language, such as Java (text string)]
- OWASP Category — Logic: Contains, does not contain, equals, does not equal; Values: [Top 10 OWASP CWE categories (text string)]
- Source — Logic: Contains, does not contain, equals, does not equal; Values: [Text string]

## Developer Suppressions

Apply developer suppressions through the Respect Developer Suppression attribute. Options: Select All, Yes, No.

-   **No**: If you do not select the Respect Developer Suppressions attribute, no additional action is taken, and developer suppressions are not considered in the policy
    
-   **Yes**: If you select the Respect Developer Suppressions attribute, a new condition is automatically added to each existing condition group, ensuring the policy respects developer suppressions
    

Precedence rule: If both a global suppression setting and a condition-level filter for Respect Developer Suppression are present, the condition-level filter will always take precedence during policy evaluation.

## Build queries with Finding Types

You can select the Finding Type attribute at the beginning of a new query and also after each `OR` operator. When an AND operator follows a selected Finding Type, the available attributes for filtering will be limited to those relevant to that specific Finding Type. The OR operator, however, provides access to all available attribute options.

Example 8. Example

`finding type = Vulnerabilities AND CVSS>9 AND has a fix = true) OR (finding type = Operational Risk AND maintenance = LOW) OR (finding type = IaC misconfiguration AND IaC tag = kuku`