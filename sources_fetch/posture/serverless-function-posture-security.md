# Serverless function posture security

Cortex Cloud serverless function scanning capabilities provides comprehensive visibility into the security posture of your serverless functions across your code and CI/CD environments, without the need to install agents or disrupt your workload operations. By integrating scanning functionality directly into your serverless functions, Cortex Cloud automatically detects vulnerabilities, malware and exposed secrets early in the development process, enabling proactive risk detection and mitigation before production.

The following events trigger Cortex Cloud serverless function scans:

-   Periodic scans
    
-   Settings modifications, including adding new functions for scanning
    

## Supported platforms

-   Supported architecture: x86_64
    
-   Supported cloud providers:
    
    -   Amazon Web Services (AWS): Lambda functions
        
    -   Google Cloud Platform (GCP): Google Cloud Functions-1st gen and 2nd gen Cloud Functions API
        
    -   Microsoft Azure: Azure functions
        
    

## Use cases

-   **Scan Serverless Functions**: You can set up automated security scans for all your serverless functions to regularly check for potential vulnerabilities, malware and exposed secrets. You can schedule these scans to run periodically or automatically (event-driven) whenever changes are made to your functions. The scan results allow you to assess the security risks associated with your serverless applications.
    
-   **Visibility**: Get a single view of all vulnerabilities, malware, and exposed secrets affecting your organization's serverless functions. This allows you to easily understand the overall security posture of these assets.
    
-   **Analyze and mitigate scan results**: Gain insights about the vulnerabilities, malware and exposed secrets detected by serverless function security scans. This enables you to understand and mitigate potential risks to improve the security of your serverless applications.
    
-   **Monitor scan health**: Gain detailed insights into serverless function scan health and status, allowing you to track scan data, troubleshoot errors and mitigate detected vulnerabilities, malware and exposed secrets, ensuring the overall health of your serverless functions.

## Onboard cloud providers for serverless functions
Integrate Cortex Cloud with your cloud provider accounts to enable security vulnerability, malware and exposed secret scans of your serverless functions. This enables you to efficiently analyze, prioritize, and resolve security findings specific to your serverless deployments.

**Note:**

When scanning serverless functions with layers, those layers need to be from the same cloud account.

Supported cloud providers include:

-   Amazon Web Services (AWS): Refer to Onboarding AWS for more information about integrating Cortex Cloud with AWS Lambda functions.
    
-   Google Cloud Platform (GCP): Refer to Onboarding GCP for more information about integrating Cortex Cloud with GCP functions.
    
    **Important:**
    
    Cortex supports Google Cloud Functions: 1st gen and 2nd gen Cloud Functions API.
    
-   Microsoft Azure: Refer to Onboarding Azure for more information about integrating Cortex Cloud with Azure functions.
    

**Note:**

Only functions containing zip files are supported.

## Serverless function posture policies

### Manage serverless function policies
Serverless function policies define how a system should respond to serverless function threats. They include conditions that trigger the policy, the scope of its application, and the actions to be taken when these conditions are met. When policies detect a threat, they generate issues for remediation.

#### How to access serverless function policies

1.  Under Posture Management, select Rules & Policies → Cloud Security (under Policies).
    
2.  Select the Show filter panel icon.
    
3.  Filter the table by the Asset Types category and select your cloud provider serverless function type from the Select values menu. Options:
    
    -   Azure Cloud Function
        
    -   Google Cloud Functions: 1st gen and 2nd gen (Cloud Functions API and Cloud Run Admin API)
        
    -   Lambda Function (AWS)
        
    
    **Note:**
    
    You can select multiple types to view all your serverless function rules across your cloud providers.
    
    A list of serverless function rules filtered by asset type is displayed.
    

#### Manage serverless function policies

You can delete, edit or clone serverless function policies.

-   Delete a policy when no longer relevant, to avoid overhead
    
-   Edit a policy to fine-tune existing policies
    
-   Clone a policy to saves time by reusing settings and applying policies uniformly across similar assets, ensuring standardized policies and predictable behavior
    

1.  Under Posture Management, select Rules & Policies → Cloud Security (under Policies).
    
2.  Filter for the list of serverless function policies. Refer to How to access serverless function policies above for more information.
    
3.  Right-click on a policy.
    
    -   To delete a policy, click Delete, and confirm the deletion in the popup
        
    -   To edit a policy, click Edit.
        
        You are redirected to the Details step of the Edit Policy wizard.
        
    -   To clone a policy, select Save as new.
        
        You are redirected to the Details step of the new policy wizard.
        
    
    **Note:**
    
    Refer to Create serverless function policies for more information on how to define the steps of a policy in the wizard.

### Create serverless function policies
The following procedure describes how to create policies for serverless functions.

1.  Under Posture Management, select Rules & Policies → Cloud Security (under Policies) → click Create Policy.
    
2.  On the Details step of the wizard:
    
    1.  Fill in these fields:
        
        -   Policy Name (required): An alias you provide to identify the policy
            
        -   Description (required): A description of the policy
            
        -   Labels (optional): Assign labels to categorize and organize the policy based on specific criteria or attributes. Labels help in easily identifying and filtering policies
            
        
    2.  Click Next.
        
3.  On the Rules step of the wizard.
    
    1.  Select rules that check for violations when scanning serverless functions: Options:
        
        -   All Matching Filter Criteria: Allows you to filter for rules according to criteria
            
        -   From Rules List. Filter the rues list by the type of serverless function.
            
            1.  Select From Rules List
                
            2.  Select Asset Type from the Select Field menu of the query.
                
            3.  Filter for the following serverless functions, depending on the target cloud provider for the rule. Options:
                
                -   Azure Cloud Function
                    
                -   Google Cloud Function: Google Cloud Functions - 1st gen and 2nd gen (Cloud Functions API and Cloud Run Admin API.
                    
                -   Lambda Function
                    
                    **Note:**
                    
                    You can select multiple options.
                    
                
            4.  Select a rule or multiple rules from the resulting list.
                
            
        -   All Rules: This option is not recommended as it will probably create a large number of issues/
            
        
        **Note:**
        
        For more information about rules, refer to Manage serverless function rules.
        
    2.  Click Next.
        
4.  On the Scope step of the of the wizard:
    
    1.  Define the scope of the policy by selecting the assets it will apply to. Options:
        
        -   From Cloud Accounts (recommended): Select one or more accounts to which this policy applies
            
        -   All Cloud Accounts (not recommended): Selecting this option will likely result in a large volume of issues. For more relevant and higher fidelity results, select the From Cloud Accounts option
            
        
    2.  Click Done.

## Serverless function posture rules

### Manage serverless function rules
Serverless function rules are designed to detect security threats within your serverless function environment that can potentially introduce vulnerabilities to its security. Serverless function rules identify and flag issues based on predefined criteria, ensuring that potential threats are proactively detected and addressed to enhance the overall security posture of your serverless functions. There are three categories or types of serverless function rules:

-   Attack Path: These rules identify combined risks in your serverless function configurations, like overly permissive roles and network exposure, that could be exploited to breach your serverless applications
    
-   Config: These rules detect security resource misconfigurations in your serverless function configurations and their related code and pipeline infrastructure
    
-   Network Exposure: These rules detect internet-exposed serverless functions by leveraging network configurations monitored across your cloud environment
    

#### How to access serverless function rules

To access serverless function rules:

1.  Under Posture Management, select Rules & Policies → Cloud Security (under Rules).
    
2.  Select the Show filter panel icon.
    
3.  Under the Select field menu, select the Asset Types category and select your cloud provider serverless function type from the Select values menu. Options:
    
    -   Azure Cloud Function
        
    -   Google Cloud Function (Gen 1 only)
        
    -   Lambda Function (AWS)
        
    
    **Note:**
    
    You can select multiple types to view all your serverless function policies across your cloud providers.
    
    A table of serverless function rules filtered by asset type is displayed. Serverless functions properties unique or important enough to mention to serverless functions include:
    
    -   Provider: The cloud provider (such as WAS) associated with the serverless function
        
    -   Severity: The severity level of findings associated with the rule
        
    -   Asset Types: The type of serverless function. Options: Lambda Function, Google Cloud Function, Azure Cloud Function
        
    -   Type: The type of serverless function rule. Options: Attack Path, Config, Network Exposure
        
    

#### Manage serverless function rules

You can edit or clone serverless function rules.

-   Edit a rule to fine-tune existing rules
    
-   Clone a rule to saves time by reusing settings and applying policies uniformly across similar assets, ensuring standardized policies and predictable behavior
    

1.  Under Posture Management, select Rules & Policies → Cloud Security (under Rules).
    
2.  Filter for the list of serverless function rules. Refer to How to access serverless function rules above for more information.
    
3.  Right-click on a rule.
    
    -   To edit a rule, click Edit.
        
        You are redirected to the Overview step of the Edit Rule wizard.
        
    -   To clone a rule, select Save as new.
        
        You are redirected to the Overview step of the new rules wizard.
        
    
    **Note:**
    
    Refer to Create serverless function rules for more information on how to define the steps of a rule in the wizard.

### Create serverless function rules
You can create custom rules for serverless functions to suit your requirements. The following types of rules are supported:

-   Attack Path: These rules monitor the high risk attack paths for potential breaches. Refer to Create an attack path rule for serverless functions for more information
    
-   Config: These rules monitor resource configurations for potential breaches. Refer to Create a configuration rule for serverless functions for more information
    
-   Network Exposure: These rules detect assets exposed to the internet. Refer to Create a network exposure rule for serverless functions for more information

### Create an attack path rule for serverless functions
Attack Path policies for serverless functions identify critical risks arising from interconnected weaknesses across your serverless architecture (such as correlating findings across functions, triggers, and permissions), to expose complex attack paths revealing complex attack paths beyond individual findings.

1.  Under Posture Management, select Rules & Policies → Cloud Security (under Rules) → click Create Rule.
    
2.  Select Attack Path.
    
3.  On the Overview step of the Create Attack Path Rule wizard.
    
    1.  Fill in these fields.
        
        -   Rule Name: (Required): A user-provided to identify the rule
            
        -   Rule Name: (Required): A user-provided to identify the rule
            
        -   Description (Required): A description of the policy
            
        -   Severity (Required): Select the severity level. Only findings with this exact severity level will trigger this rule. Findings with different severity levels will be ignored
            
        -   Labels: (Optional): Assign labels to categorize and organize the rule based on specific criteria or attributes. Labels help in easily identifying and filtering rules
            
        -   Enable How to Fix (Optional. Default: **ON**): Enable to take action when the rule is violated
            
        
    2.  Click Next.
        
4.  Define the logic for the rule on the Rule Logic step of the wizard in the query editor.
    
    1.  Under the value menu in the Find field:
        
        1.  Select Compute.
            
        2.  In the corresponding table, search for a serverless function. Options: Lambda Function, Google Cloud Function, Azure Cloud Function.
            
        
    2.  Select the `+` icon in the editor.
        
    3.  Select an option: Finding, Vulnerability.
        
        -   Findings: Define the logic for findings.
            
            1.  Provide the finding name. The name must match the name of the policy that will generate the security finding.
                
            2.  Click on the Finding Name card that is displayed In the WHERE field.
                
            3.  Select the value `in` under the Operator field.
                
            4.  Select the required finding or findings from the list that is displayed.
                
            5.  Click Search.
                
                All assets matching the search criteria are displayed. This allows you to validate the rule's effectiveness on existing functions and provides valuable context for refining the rule's logic to accurately identify future functions.
                
            6.  Select Next.
                
            7.  Provide suggested mitigation in the How to Fix step and click Done.
                
            
        -   Vulnerability: Define the logic rule for types of vulnerabilities. Options: CVE ID (The unique identifier of the vulnerability), Vulnerability Severity (The impact level of the vulnerability), CVSS Score (The numerical rating of a vulnerability's severity)
            
            1.  CVE ID: Select in as the operator → enter the CVE ID → Search.
                
            2.  Vulnerability Severity: Select > or >= as the operator → Severity level (such as High, Low) → Search.
                
            3.  CVSS Score: Select > or >= as the operator → enter a score → Search.
                
            
        
    4.  Click Next if you have enabled a fix in step 1a above, or Done if fix is disabled.
        
5.  Define the fix in the How to Fix step (when enabled in step 1a above), and click Done.

### Create a configuration rule for serverless functions
Config rules for serverless functions identify security misconfigurations within the settings and deployment infrastructure of your individual serverless resources.

1.  Under Posture Management, select Rules & Policies → Cloud Security (under Rules) → click Create Rule.
    
2.  Select Config.
    
3.  On the Overview step of the Create Config Rule wizard.
    
    1.  Fill in these fields:
        
        -   Rule Name: (required): A user-provided to identify the rule
            
        -   Description (required): A description of the rule
            
        -   Severity (required): Select the severity level. Only findings with this exact severity level will trigger this rule. Findings with different severity levels will be ignored
            
        -   Labels: (optional): Assign labels to categorize and organize the rule based on specific criteria or attributes. Labels help in easily identifying and filtering rules
            
        -   Enable How to Fix: (Default: ON): Enable to take action when the rule is violated
            
        
    2.  Click Next.
        
4.  Define the logic for the configuration rule on the Rule Logic step of the wizard in the query editor.
    
    1.  Under the Value menu in the Find field:
        
        1.  Select Compute.
            
        2.  Select the relevant serverless function from the list that is displayed. Options: Lambda Function, Google Cloud Function, Azure Cloud Function.
            
            The JSON configuration file for the selected serverless function is displayed. Note that each type of serverless function has a unique configuration file and unique properties.
            
        
    2.  Select a property or multiple properties of the serverless function configuration file and provide a value.
        
    3.  Click Search.
        
        All assets matching the search criteria are displayed. This allows you to validate the rule's effectiveness on existing functions and provides valuable context for refining the rule's logic to accurately identify future functions.
        
    4.  Click Next if you have enabled a fix in step 1a above, or Done if fix is disabled.
        
5.  Define the fix in the How to Fix step (when enabled in step 1a above), and click Done.

### Create a network exposure rule for serverless functions
Network Exposure rules allow you to monitor and control the network accessibility of your serverless functions, identifying configurations that might expose them to unwanted external traffic.

1.  Under Posture Management, select Rules & Policies → Cloud Security (under Rules) → click Create Rule.
    
2.  Select Network Exposure.
    
3.  On the Overview step of the Create Network Exposure Rule wizard.
    
    1.  Fill in these fields:
        
        -   Rule Name: (required): A user-provided to identify the rule
            
        -   Description (required): A description of the rule
            
        -   Severity (required): Select the severity level. Only findings with this exact severity level will trigger this rule. Findings with different severity levels will be ignored
            
        -   Labels: (optional): Assign labels to categorize and organize the rule based on specific criteria or attributes. Labels help in easily identifying and filtering rules
            
        
    2.  Click Next.
        
4.  Define the logic for the rule on the Rule Logic step of the wizard.
    
    1.  Fill in these fields:
        
        -   Source Network: Select the source network to be evaluated by this rule. Options:
            
            -   Untrusted (default): all internet IPs
                
            -   A specific IP or CIDR range: Select Show Advanced Settings and fill in the following fields:
                
                -   Protocol/Port: Specify the protocols and ports that will generate findings if exposed. For example: tcp/80, tcp/20-23, tcp/80, tcp/443
                    
                -   Host State: Configure the rule to alert on either active (running) or potentially exposed (stopped) workloads
                    
                -   Use External Probe Validation: When enabled, network scanning verifies internet exposure and provides additional context (protocols, ports, services). Disabling it relies on configuration alone, which may increase inaccurate findings
                    
                
            
        -   Destination Asset Type: Select Serverless Function as the asset type to be evaluated in the rule
            
        -   Cloud Service Provider: Select the target cloud provider in which the rule will be evaluated (AWS, GCP, Azure)
            
        
    2.  Click Done.

## Serverless function usage
Serverless functions is integrated as a feature across various sections of your tenant. Refer to the following sections for specific usage instructions within each context:

### Serverless function assets

The Serverless Functions asset inventory provides a centralized view of all serverless functions in your environment.

To access serverless function assets, under Inventory, select All Assets → Compute → Serverless Functions.

For more information on serverless function assets, refer to Manage serverless function assetsOverview

### Serverless function issues

Currently, only vulnerability issues are supported for serverless functions.

-   To manage serverless function vulnerability issues through Vulnerability Management:
    
    1.  Navigate to Posture Management → Vulnerability Management) → Vulnerability Issues.
        
    2.  Select Add Filters → Asset Category → Serverless Function.
        
    
-   To manage serverless function vulnerability issues through Vulnerability Assets:
    
    1.  Navigate to Posture Management → Vulnerability Management) → Vulnerable Assets.
        
    2.  Select Add Filters → Asset Category → Serverless Functions.
        
    3.  Select an asset in the inventory table.
        
        The Overview tab is displayed.
        
    4.  Click on Issues.
        
        You are redirected to the Issues page, displaying a list of serverless function vulnerabilities.
        
    

The serverless function vulnerabilities issues inventory includes these unique properties:

-   Asset Type: The type of serverless function: Lamda Function for AWS, Google Cloud Function for GCP and Azure App Service Web App Function for Azure
    
-   Asset Category: Serverless Functions
    

Selecting an issue opens the expanded card with additional details about the issue including a description of the issue, when fist and last detected, affected assets, linked cases and evidence (such as the vulnerability ID, CVSS severity, score and version, and the policy that detected the issue).

For more information on vulnerability issues, refer to Investigate and remediate vulnerabilities.

### Serverless function findings

1.  To manage serverless function findings, navigate to Posture Management → Vulnerability Management) → Vulnerability Issues.
    
2.  Select All Vulnerabilities Findings.
    
3.  Select Add Filters → Asset Category → Serverless Function.
    
4.  Select an asset in the inventory table.
    

For more information on vulnerability findings, refer to View All Vulnerability Findings.

### Monitor serverless function scan health

You can monitor and manage the health and status of your integrated serverless function scans, troubleshoot errors and mitigate detected vulnerabilities

For more information, refer to Monitor serverless function scan health.Monitor serverless function scan health and status
