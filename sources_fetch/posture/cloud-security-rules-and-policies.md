# Cloud Security Rules and Policies

## Overview
Enterprises using multiple cloud environments face significant challenges in maintaining consistent security and compliance postures across multi-cloud environments. Differences in the cloud security providers and code providers native policy management tools and lack of uniform interfaces lead to increased risk and complexity, potential non-compliance with regulatory standards, and inefficient guardrail enforcement.

**Cloud Security Rules and Policies** are part of the **Cortex Cloud Posture Management** framework. These rules and policies enable your cloud security administrators and application security practitioners to define and manage security guardrails consistently across AWS, Azure, and GCP and other code providers. In combination, they allow you to define which detections are important to have in place to secure your environment and the specific environments and conditions where they need to be alerted and addressed.

## Cloud Security Rules
Rules are a set of conditions that apply to a specific cloud, code, or host resource. If a resource matches the rule criteria, a finding is generated. The **out-of-the-box (OOTB)** rules are based on security research, CIS benchmarks, customer requests, and Palo Alto Network’s internal threat research. Rules will be checked against all assets in your environment at all times.

Cortex Cloud includes the following types of rules:

-   OOTB – Rule-based and heuristic-based (AI/ML)
    
-   Custom – Only Rule-based
    

If you want to modify existing rules or create custom rules, see [Create Rules](https://docs-cortex.paloaltonetworks.com/r/Cortex-CLOUD/Cortex-Cloud-Posture-Management-Documentation/Create-Rules).

### Findings

Findings are security signals gathered from your cloud environment. They are primarily intended to provide security context and enrichment and are often non-actionable on their own. For example, “Workload X is attached to a role that grants access to databases”. Keep in mind that findings are only supported for OOTB rules.

## Cloud Security Policies
Policies are a construct that enables you to define the scope of assets where you want to create issues for when a rule matches. In a nutshell, rules will create findings across all assets, but when the rule is associated with a policy, for the assets within the scope of that particular rule, the findings will be promoted to issues consisting of:

-   Rules – Select from a list of security detection rules or create a new rule based off of XQL (query builder)
    
-   Scope – Target provider, assets, cloud accounts. A filter specifying which assets the rule applies to.
    

Cortex Cloud policies are categorized as follows:

-   [Cloud Workload](https://docs-cortex.paloaltonetworks.com/r/Cortex-CLOUD/Cortex-Cloud-Posture-Management-Documentation/Cloud-Workload-Policies)
    
-   Cloud Security
    
-   [Vulnerability Management](https://docs-cortex.paloaltonetworks.com/r/Cortex-CLOUD/Cortex-Cloud-Posture-Management-Documentation/Vulnerability-management)
    

The Cloud Security Policies page allows you to manage policies that define security and compliance actions for cloud posture. You can create, edit, filter, and manage policies through a structured table and widget panel.

**Note:**

If you have the following Scope Based Access Control (SBAC) settings in place, **User Settings > Cases and Issues Scope > Select domains > Posture**, you may encounter a Case mismatch in Issues/Cases/Findings counts. This is because the Case count on the Rules page captures Cases belonging to the Posture domain. Whereas Platform pages, capture Issues within Cases belonging to the Posture domain.

The Policies page displays all the configured policies with the following fields:

Table 5. Cloud Security Policies

| Field | Description |
| :-- | :-- |
| Type | Defines the policy category. |
| Policy Name | The user-defined name of the policy. |
| Issue Severity | The severity level of the issue created: Critical, High, Medium, Low, or Informational. |
| Conditions | Logical statements that determine how the policy evaluates findings. |
| Asset Groups | Predefined groups of assets to which the policy applies. |
| Open Issues | The number of unresolved issues associated with the policy. |
| Description | Additional details about the policy. |
| Created By | The user who created the policy. |
| Last Modified | The timestamp of the last modification. |

  

### Issues

Issues are artifacts of the policy and represent actionable items that you need to address. They have several characteristics, such as:

-   Lifecycle – open, dismiss, in-progress, close
    
-   Workflows – assigned to different user personas for remediation
    
-   Severity – critical, high, medium, low, info
    

**NOTE:** A key distinction between Findings and Issues is that Findings are not actionable, while you can take an action on Issues.

### Issues
Issues are artifacts of the policy and represent actionable items that you need to address. They have several characteristics, such as:

-   Lifecycle – Open, Dismiss, In-progress, Close
    
-   Workflows – Assigned to different user personas for remediation
    
-   Severity – Critical, High, Medium, Low, Info
    

**NOTE**: A key distinction between Findings and Issues is that Findings are not actionable, while you can take an action on Issues.

The Cloud Security Policies page allows you to manage policies that define security and compliance actions for cloud posture. You can create, edit, filter, and manage policies through a structured table and widget panel.

The Policies page displays all the configured policies with the following fields.

| **Field** | **Description** |
| --- | --- |
| **Type** | Defines the policy category. |
| **Policy Name** | The user-defined name of the policy. |
| **Action** | Defines the action taken when conditions match: **Create an Issue** (logs an issue) or **Prevent and Create an Issue** (prevents the action and logs an issue). |
| **Issue Severity** | The severity level of the issue created: **Critical, High, Medium, Low, or Informational**. |
| **Conditions** | Logical statements that determine how the policy evaluates findings. |
| **Asset Groups** | Predefined groups of assets to which the policy applies. |
| **Open Issues** | The number of unresolved issues associated with the policy. |
| **Description** | Additional details about the policy. |
| **Created By** | The user who created the policy. |
| **Last Modified** | The timestamp of the last modification. |

## Create Rules
You can create your own custom rules for Configuration (Config), Data, and Network Exposure.

View all the Cloud Posture Security Rules on the Posture Management > Rules & Policies > Rules > Cloud Security page.

### Create a configuration rule
Configuration (config) rules monitor your resource configurations for potential policy violations or misconfigurations. Perform this task to create a custom configuration rule that you can use in a cloud security policy.

1.  Navigate to Posture Management → Rules & Policies → Rules → Cloud Security.
    
2.  Select **Create Rule > Config.**
    
3.  Complete the Overview step:
    
    1.  Enter a Rule Name and Description.
        
    2.  Select a Severity. This will be the severity of any issues created with this rule.
        
    3.  Add Labels (optional). These rules can be used find rules when creating custom policies.
        
    4.  Enable Remediation using the toggle (optional). In a later step, you'll enter the remediation instructions.
        
    5.  (Optional) Associate this rule with a Compliance Control. Click Add, select one or more custom compliance controls from the list, and then click Assign.
        
        Custom configuration rules can only be associated with custom compliance controls.
        
    6.  Click Next.
        
4.  Complete the Rule Logic step to define what the rule is looking for. Select one of the following modes:
    
    -   Simple Mode: Presents a guided interface in which you can define basic conditions and address most common rule use cases.
        
    -   Advanced Mode: Presents a free-form XQL editor that allows you to build complex and flexible queries across unrestricted datasets. Supports advanced and custom use cases.
        
    
5.  If you selected Simple Mode, complete the following steps:
    
    1.  Select options from the dropdown menus to define the logic for your config rule, such as “Find EC2 instances where accessKeys are allowed”, and then click Search to view all matching results.
        
    2.  Click Next to define Remediation instructions (if you had turned on Enable Remediation in the Overview step) or click Done.
        
6.  If you selected Advanced Mode, complete the following steps:
    
    1.  Define an XQL query for the rule, following the guidelines in Guidelines for creating cloud security rules. For detailed information about how use XQL, see Get started with XQL.
        
    2.  Click Test to determine if the query is valid.
        
    3.  Select the Affected Asset Type.
        
        Generated issues will be linked to assets identified by the selected field.
        
    4.  Check the list of query results to verify that the query is working as intended.
        
    5.  Click Next to define Remediation instructions (if you had turned on Enable Remediation in the Overview step) or click Done.
        
7.  (Optional) In the text field, define remediation actions or provide other information that will be included on issues created by this rule.
    
8.  Click **Done** to save your config rule.

#### Guidelines for creating cloud security rules
Follow these guidelines when creating an XQL query in a cloud security configuration rule. These are the requirements for creating a valid XQL query.

**Note:**

XQL queries are supported for cloud security configuration rules only. XQL queries are not yet supported for other types of cloud security rules.

1.  Use the `asset_inventory` dataset in config rules. No other datasets are supported.
    
2.  Construct query conditions using the configuration JSON located in `xdm.asset.raw_fields`.
    
    Example:
    
    `json_extract_scalar(**xdm.asset.raw_fields**, "$.Platform Discovery.metadataOptions.httpEndpoint")`
    
3.  The evaluated asset type must be explicitly specified in the filters stage.
    
    Example:
    
    `dataset = asset_inventory | filter xdm.asset.provider = "aws" and **xdm.asset.type.id** = "LAMBDA_FUNCTION"| alter authType = json_extract_scalar(xdm.asset.raw_fields, "$.Platform Discovery.AuthType") | fields xdm.asset.id as asset_id, xdm.asset.type.class as class_name, xdm.asset.type.id as asset_type_id`
    
4.  The query output must contain the asset_id (representing the asset) and asset_type_id (representing the asset type).
    
    `dataset = asset_inventory | filter xdm.asset.provider = "aws" and xdm.asset.type.id = "LAMBDA_FUNCTION"| alter authType = json_extract_scalar(xdm.asset.raw_fields, "$.Platform Discovery.AuthType") | fields xdm.asset.id as **asset_id**, xdm.asset.type.class as class_name, xdm.asset.type.id as **asset_type_id**`
    
5.  The query results must contain a maximum of 10 fields, including `asset_id` and `asset_type_id`.
    
6.  The fields stage of the query must be positioned as the final step in the query pipeline.
    
    `dataset = asset_inventory | filter xdm.asset.provider = "aws" and xdm.asset.type.id = "LAMBDA_FUNCTION"| alter authType = json_extract_scalar(xdm.asset.raw_fields, "$.Platform Discovery.AuthType") | **fields xdm.asset.id as asset_id, xdm.asset.type.class as class_name, xdm.asset.type.id as asset_type_id**`
    

##### Examples: XQL queries for Cloud Security rules

Example 119. XQL query for AWS EC2 in which IMDSv2 is not configured

```
dataset = asset_inventory 
| filter xdm.asset.provider = "aws" and xdm.asset.type.id = "EC2_INSTANCE"
| alter state = json_extract_scalar(xdm.asset.raw_fields, "$.Platform 
Discovery.state.name")
| alter httpEndpoint = json_extract_scalar(xdm.asset.raw_fields, 
"$.Platform Discovery.metadataOptions.httpEndpoint")
| alter httpTokens = json_extract_scalar(xdm.asset.raw_fields, 
"$.Platform Discovery.metadataOptions.httpTokens")
| filter state contains "running" and httpEndpoint = "enabled" and 
httpTokens not contains "required"
| fields xdm.asset.id as asset_id, xdm.asset.type.id  as asset_type_id
```

#### Cloud security rule status for custom configuration rules
Out-of-the-box and custom cloud security configuration rules are enabled by default, and can be manually disabled and reenabled as needed. Additionally, the system may change the status of custom configuration rules based on resource consumption.

The statuses of cloud security configuration rules are described in the table below.

| Status | Description |
| --- | --- |
| Enabled | Indicates that the rule is working normally. |
| Moderated | Indicates that the rule is consuming higher than expected resources, so the system is executing the rule less frequently. You will receive an in-product notification if the status of a rule is changed to Moderated. |
| Suspended | Indicates that the rule has been suspended for exceeding the maximum allowed resource consumption. You will receive an in-product notification if the status of a rule is changed to Suspended. To reenable a suspended rule, you must update the query in the rule. After saving the updated rule, the status will automatically change to Enabled. If the updated rule continues to use excessive resources, the system will move it back into the Moderated or Suspended status. |
| Disabled | Indicates that the rule has been manually disabled. |

How to view cloud security configuration rule status

1.  Navigate to Posture Management → Rules & Policies → Rules → Cloud Security.
    
2.  Rule status is displayed in the status column.
    
3.  Filter and sort on this field as needed.
    

How to enable or disable cloud security configuration rules

1.  Navigate to Posture Management → Rules & Policies → Rules → Cloud Security.
    
2.  Right-click a rule, and select Enable or Disable.

### Create a Data Rule
Data rules protect your environment against malware and enable data classification.

To create a Data rule:

1.  Navigate to Posture Management → Rules & Policies → Rules → Cloud Security .
    
2.  Select Create Rule → Data.
    
3.  Enter **Rule Name**, **Description**, select **Severity** (Critical, High, medium, or Low), and add **Labels** (optional) and click **Next**.
    
4.  On the Rule Logic page, you can select options to build your data rule. Click **Select** next to FIND and choose from the list of supported data assets categories such as, database, disk, bucket.
    
5.  Click **WHERE** to choose from the attributes of the asset. Depending on the asset category you selected in the above step the list of attributes displayed will vary.
    
    For example, you can select FIND Bucket WHERE Type and Select values = S3 bucket.
    
6.  Click **+** to select the **Findings** such as, Configuration Finding, Data Finding, Identity Finding and so on.
    
7.  Click **WHERE** to choose from the attributes of the finding. Depending on the finding you selected in the above step the list of attributes displayed will vary. Select a value and click **Search** to view the results.
    
    
    
8.  If you had selected the **Enable How to Fix** option in the rule creation Overview step, under **How to Fix** you can add specific actions to be taken if and when this rule is violated.
    
9.  Click **Done** to save your Data Rule.
    
    You can view the saved rule on the Cloud Posture Security Rules page.

### Create a Network Exposure Rule
Network exposure rules detect your assets that are exposed to the Internet.

To create a network exposure rule:

1.  Navigate to **Posture Management > Rules & Policies**.
    
2.  Select **Cloud Security** under **Rules**.
    
3.  Select **Create Rules > Network Exposure**.
    
4.  Enter **Rule Name**, **Description**, select **Severity** (Critical, High, medium, or Low), add **Labels** (optional), and click **Next**.
    
5.  On the Rule Logic screen, select **Destination Asset Type**: VM Instance, Kubernetes, Managed DB, or Serverless Function and **Cloud Service Provider**: AWS, Azure, or GCP.
    
6.  Depending on the asset type (all asset types are supported) you select the rule creation process differs as well as the attributes that exist in each rule.If you select **Kubernetes** as your Asset Type, then you can also specify the **Ingress Route** under **Advanced Settings**.
    
7.  Click **Show Advanced Settings**. If you select **Use External Probe Validation** as **Yes**, then **HTTP Response Code** becomes available as an option.
    
8.  Click **Done** to save your Network Exposure Rule.

### Edit a Rule
To edit a rule:

1.  Navigate to **Posture Management > Rules & Policies**.
    
2.  Select **Cloud Security** under **Rules**.
    
3.  On the **Rules** page, click the rule you want to edit.
    
4.  On the Details page, click the more options icon (⋮) and then select **Edit**.
    
5.  Make the necessary changes on the policy **Details**, **Rules**, and **Scope** screens.
    
6.  Click **Done** to save your changes.

## Create Policies
You can create a custom policy with rules that are tailored to meet your organization’s specific needs for compliance or monitoring of cloud resources.You can create configuration policies to scan your Infrastructure as Code (IaC) templates that are used to deploy cloud resources. You can create the following types of custom policies:

-   Attack Path – Attack path policies monitor the high risk attack paths for possible breaches.
    
-   Config – Configuration policies monitor your resource configurations for potential policy violations.
    
-   Data – Data policies protect against malware and enable data classification. To identify sensitive data in cloud storage buckets, it uses machine learning and pattern matching.
    
-   Network – Network policies monitor network activities in your environment.
    

**Note:**

When creating Policies, note that Rules with the **Informational** severity level are excluded.

### Edit a Policy
To edit a policy:

1.  Navigate to **Posture Management > Rules & Policies**.
    
2.  Select **Cloud Security** under **Policies**.
    
3.  On the **Policies** page, click the policy you want to edit.
    
4.  On the Details page, click the more options icon (⋮) and then select **Edit**.
    
5.  Make the necessary changes on the policy **Details**, **Rules**, and **Scope** screens.
    
6.  Click **Done** to save your changes.
    
7.  If you want to enable or disable a policy, click on the Policy, in the Details page click the toggle button at the top of the page to enable or disable it.

### Use an Existing Policy to Create a New One
To create a new cloud security policy using an existing policy:

1.  Navigate to **Posture Management > Rules & Policies**.
    
2.  Select **Cloud Security** under **Policies**.
    
3.  On the **Policies** page, click the policy you want to use.
    
4.  On the Details page, click the more options icon (⋮) and then select **Save as New**.
    
5.  Modify the Policy Name, Description, and Labels fields as necessary.
    
6.  Select the Rules that you want to be alerted on:
    
    -   All Matching Filter Criteria
        
    -   Rules List
        
    -   All Rules
        
    
7.  Select the Scope that you want to be alerted on:
    
    -   Cloud Accounts
        
    -   Asset Groups
        
    -   All Cloud Assets
        
    
8.  Click **Done** to create the new custom policy.
