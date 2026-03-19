# Monitor and track compliance adherence

Evaluate your compliance status across different standards.

Determine asset vulnerabilities and risk by checking whether assets adhere to industry standards or your organization's best practices for compliance.

You can view all compliance-related details in the tenant under Posture Management → Compliance.

## Cortex compliance flow

Cortex compliance workflow for evaluating your overall compliance posture for various compliance standards.

The following steps describe the flow for evaluating asset compliance.

| Step | See More |
| --- | --- |
| Step 1. Decide which compliance standard to use. | Choose compliance standards from the compliance catalog |
| Step 2. Create a compliance assessment. | Use an assessment profile to run compliance checks on your assets |
| Step 3. Review the results. | View and manage compliance assessments and reports |

## Choose compliance standards from the compliance catalog

The compliance Catalogs provides a list of available compliance standards and controls.

Cortex provides lists of available standards and controls in the Standards and Controls catalogs under Posture Management → Compliance → Catalogs.

### What are standards and controls?

Standards are guidelines that organizations follow in order to comply with industry best practices and regulations, as well as internal organizational policies and procedures. They improve security and quality in operational practices.

Standards consist of controls, which are measures related to the standard that ensure compliance and mitigate risks. Controls are built from one or more rules, the specific checks that run on an asset. Controls can be grouped into categories, for example RBAC and Pod security.

The Standards and Controls catalogs include built-in industry standards and controls and custom organizational standards and controls.

### Standards Catalog

Review the list of built-in and custom compliance standards to monitor and audit your organization’s performance.

The Standards Catalog page displays cards of the available standards and their details, including:

-   Standard name
    
-   Type - System (built-in) or Custom
    
-   Release date
    
-   Description
    
-   Clickable links to associated controls, assessment profiles, and labels
    

Table 7. Standards Catalog

| Compliance Standard | Version |
| --- | --- |
| Australian Cyber Security Centre (ACSC) Essential Eight | – |
| Australian Cyber Security Centre (ACSC) Essential Eight - Level 1 | Level 1 |
| Australian Cyber Security Centre (ACSC) Essential Eight - Level 2 | Level 2 |
| Australian Cyber Security Centre (ACSC) Essential Eight - Level 3 | Level 3 |
| Australian Cyber Security Centre's (ACSC) Information Security Manual (ISM) | – |
| Australian Cyber Security Centre's (ACSC) Information Security Manual (ISM) Latest | – |
| Australian Energy Sector Cyber Security Framework (AESCSF) | 1 |
| Australian Energy Sector Cyber Security Framework (AESCSF) v2 | 2 |
| Australian Energy Sector Cyber Security Framework (AESCSF) v2 - Lite Framework | 2 |
| Australian Prudential Regulation Authority (APRA) - CPS 234 Information Security | – |
| AWS Foundational Security Best Practices standard | 1.2.0 |
| AWS Well-Architected Framework | – |
| Azure Security Benchmark (v3) | 3 |
| Brazilian Data Protection Law (LGPD) | – |
| California Consumer Privacy Act (CCPA) | 2018 |
| CIS Amazon Elastic Kubernetes Service (EKS) Benchmark | 1.4 |
| CIS Amazon Elastic Kubernetes Service (EKS) Benchmark v1.7.0 | 1.7.0 |
| CIS Amazon Linux 2 Benchmark | 1.0.0 |
| CIS Amazon Linux 2 STIG Benchmark | 2.0.0 |
| CIS Amazon Web Services Foundations Benchmark v3.0.0 - Level 1 | 3.0.0 |
| CIS Amazon Web Services Foundations Benchmark v3.0.0 - Level 2 | 3.0.0 |
| CIS Amazon Web Services Foundations Benchmark v4.0.0 - Level 1 | 4.0.0 |
| CIS Amazon Web Services Foundations Benchmark v4.0.0 - Level 2 | 4.0.0 |
| CIS Amazon Web Services Foundations Benchmark v5.0.0 - Level 1 | 5.0.0 |
| CIS Amazon Web Services Foundations Benchmark v5.0.0 - Level 2 | 5.0.0 |
| CIS AWS Storage Services Benchmark | 1.0.0 |
| CIS Azure Kubernetes Service (AKS) Benchmark | 1.5 |
| CIS Azure Kubernetes Service (AKS) Benchmark v1.8.0 | 1.8.0 |
| CIS Critical Security Controls v8 | 8 |
| CIS Critical Security Controls v8.1 | 8.1 |
| CIS Distribution Independent Linux | 2.0.0 |
| CIS Docker Benchmark | 1.7.0 |
| CIS GitHub Benchmark | 1.0.0 |
| CIS GitLab Benchmark | 1.0.1 |
| CIS Google Cloud Platform Foundation Benchmark v3.0.0 - Level 1 | 3.0.0 |
| CIS Google Cloud Platform Foundation Benchmark v3.0.0 - Level 2 | 3.0.0 |
| CIS Google Cloud Platform Foundation Benchmark v4.0.0 - Level 1 | 4.0.0 |
| CIS Google Cloud Platform Foundation Benchmark v4.0.0 - Level 2 | 4.0.0 |
| CIS Google Kubernetes Engine (GKE) Benchmark | 1.6 |
| CIS Google Kubernetes Engine (GKE) Benchmark v1.8.0 | 1.8.0 |
| CIS Kubernetes Benchmark | 1.11.0 |
| CIS Microsoft Azure Foundations Benchmark v3.0.0 - Level 1 | 3.0.0 |
| CIS Microsoft Azure Foundations Benchmark v3.0.0 Level 2 | 3.0.0 |
| CIS Microsoft Azure Foundations Benchmark v4.0.0 - Level 1 | 4.0.0 |
| CIS Microsoft Azure Foundations Benchmark v4.0.0 - Level 2 | 4.0.0 |
| CIS Microsoft Azure Storage Services Benchmark | 1.0.0 |
| CIS Microsoft Windows 11 Enterprise Benchmark | 4.0.0 |
| CIS Microsoft Windows Server 2016 Benchmark | 3.0.0 |
| CIS Microsoft Windows Server 2019 Benchmark | 3.0.1 |
| CIS Microsoft Windows Server 2022 Benchmark | 3.0.0 |
| CIS Oracle Cloud Infrastructure Foundations Benchmark v.2.0.0 - Level 1 | 2.0.0 |
| CIS Oracle Cloud Infrastructure Foundations Benchmark v.2.0.0 - Level 2 | 2.0.0 |
| CIS Oracle Cloud Infrastructure Foundations Benchmark v.3.0.0 - Level 1 | 3.0.0 |
| CIS Oracle Cloud Infrastructure Foundations Benchmark v.3.0.0 - Level 2 | 3.0.0 |
| CIS Red Hat OpenShift Container Platform | 1.7.0 |
| Cloud Security Assurance Program (CSAP) - IaaS | IaaS |
| Cloud Security Assurance Program (CSAP) - Low | Low |
| Cloud Security Assurance Program (CSAP) - Low SaaS | Low SaaS |
| Cloud Security Assurance Program (CSAP) - SaaS Simplified | SaaS Simplified |
| Cloud Security Assurance Program (CSAP) - SaaS Standard | SaaS Standard |
| CSA Cloud Controls Matrix (CCM) | 4.0.12 |
| CSA Cloud Controls Matrix (CCM) v4.0.6 | 4.0.6 |
| Cyber Risk Institute (CRI) Profile | 2 |
| Cyber Risk Institute (CRI) Profile v1.2.1 | 1.2.1 |
| CyberSecurity Law of the People's Republic of China | – |
| Cybersecurity Maturity Model Certification (CMMC) | 1.02 |
| Cybersecurity Maturity Model Certification (CMMC) Level 1 | 2 |
| Cybersecurity Maturity Model Certification (CMMC) Level 2 | 2 |
| Digital Operational Resilience Act (DORA) | – |
| EU AI Act | – |
| Federal Financial Institutions Examination Council (FFIEC) | – |
| FedRamp (High) | – |
| Fedramp (Low) | Low |
| Fedramp (Moderate) | Moderate |
| Framework for Adoption of Cloud Services by SEBI Regulated Entities (REs) | – |
| General Data Protection Regulation (GDPR) | – |
| Health Insurance Portability and Accountability Act (HIPAA) | – |
| HITRUST CSF | 11.2.0 |
| HITRUST CSF v9.6.0 | 9.6.0 |
| Information Technology Security Guidance (ITSG-33) | – |
| Insurance Regulatory And Development Authority Of India | 1 |
| ISO/IEC 27001:2022 | 2022 |
| ISO/IEC 27002:2022 | 2022 |
| ISO/IEC 27017:2015 | 2015 |
| ISO/IEC 27018:2019 | 2019 |
| ISO/IEC 42001:2023 | 2023 |
| Korea – Information Security Management System (ISMS) | – |
| MAS Technology Risk Management (TRM) | 2021 |
| Microsoft Cloud Security Benchmark | 1 |
| MITRE ATT&amp;CK Cloud IaaS for Enterprise | 15.1 |
| Motion Picture Association (MPA) Content Protection Best Practices | 4.08 |
| Multi-Level Protection Scheme (MLPS) v2.0 - Level 1 | 2 |
| Multi-Level Protection Scheme (MLPS) v2.0 - Level 2 | 2 |
| Multi-Level Protection Scheme (MLPS) v2.0 - Level 3 | 2 |
| NCSC - Cloud Security Principles | 2.1 |
| NCSC - Cyber Essentials | 3.1 |
| NEW YORK STATE DEPARTMENT OF FINANCIAL SERVICES (NYDFS) 23 CRR-NY 500.0 | – |
| New Zealand Information Security Manual (NZISM) | 3.4 |
| NIST AI 600-1 | – |
| NIST Cybersecurity Framework (CSF) | 2 |
| NIST Cybersecurity Framework (CSF) v1.1 | 1.1 |
| NIST SP 800-171 Rev. 2 | Rev 2 |
| NIST SP 800-171 Rev. 3 | Rev 3 |
| NIST SP 800-53 Rev. 5 | Rev 5 |
| Otoritas Jasa Keuangan (OJK) | 38/POJK.03/2016 |
| OWASP TOP 10 CI/CD Security Risks | 2025 |
| OWASP Top 10 for LLM Applications 2025 | – |
| PCI DSS v4.0.1 | 4.0.1 |
| Personal Information Protection and Electronic Documents Act (PIPEDA) | – |
| RBI Baseline Cyber Security and Resilience Requirements | – |
| Risk Management in Technology (RMiT) | – |
| Sarbanes Oxley Act (SOX) | – |
| SEBI - Consolidated Cybersecurity and Cyber Resilience Framework (CSCRF) | – |
| Secure Controls Framework (SCF) | 2024.2 |
| Secure Controls Framework (SCF) v2022.2.1 | 2022.2.1 |
| SOC 2 | – |
| Telecommunications Security Act (TSA) | – |
| Texas Risk and Authorization Management Program (TX-RAMP) - Level 1 | Level 1 |
| Texas Risk and Authorization Management Program (TX-RAMP) - Level 2 | Level 2 |
| Trusted Information Security Assessment Exchange (TISAX) | 6 |

#### Use a built-in or custom standard

Use a built-in industry standard, create a custom standard, or edit a custom standard.

You can use a built-in industry standard, create a custom standard, or edit a custom standard. A custom standard can be either a copy of a built-in standard or a custom standard created from scratch.

Use a built-in standard

Cortex provides built-in industry approved regulatory compliance standards, for example GDPR. These standards cannot be edited or deleted, you can duplicate them to create a custom standard.

Create a custom standard

You can create a custom compliance standard that is tailored to your own business needs and organizational policies.

1.  In the Standards catalog, click Create Standard.
    
2.  Define compliance standard metadata, including:
    
    -   Standard name
        
    -   Description (optional)
        
    -   Labels (optional)
        
    
3.  Click Next.
    
4.  Under Controls, assign one or more controls to the compliance standard.
    
    You can use the filter to search for a specific control. For more information about choosing a control, see Controls catalog.
    
    
    
5.  Click Create.
    

Edit a custom standard

You can edit a copy of a built-in industry standard or edit an existing custom standard. You can also delete a custom standard.

1.  In the Standards catalog, click  on the built-in standard you want to edit and click Save as new.
    
    To edit a custom standard, click  on the custom standard and click Edit.
    
2.  Define compliance standard metadata, including:
    
    -   Standard name
        
    -   Description (optional)
        
    -   Labels (optional)
        
    
3.  Click Next.
    
4.  Under Controls, assign one or more controls to the compliance standard. For more information about choosing a control, see Controls catalog.
    
    You can use the filter to search for a specific control.
    
    
    
5.  Click Create.

### Controls catalog

Review the list of all the built-in and custom compliance standards to monitor and audit your organization’s performance.

The Controls Catalog page shows a list of the available controls and their details, including:

-   Name: The control name, including the control index number if available. For example, **`2.1.1 Client certificate authentication`**
    
-   Description: A description of the control. For example, **`Kubernetes provides the option to use client certificates for user authentication.`**
    
-   Standards: The standards the control is associated with. For example, **`CIS Google Kubernetes Engine (GKE) Benchmark v1.6.0`**
    
-   Category: The control category, including the category index if available. For example, **`2 Control Plane Configuration`**
    
-   Sub category: The control sub category if available, including the sub category index if available. For example, **`2.1 Authentication and Authorization`**
    
-   Rules: The number of rules associated with the control.
    
-   Creation time: When the control was created.
    
-   Created by: Who created the control. For built-in controls, it is **`Palo Alto Networks`**.
    

Clicking a control opens a side panel that displays all the control details in the Overview tab, and the list of rules associated with the control in the Rules tab.

#### Search for specific controls

All of the columns are sortable and filterable. By default, the table is sorted numerically by the control index number.

You can search for specific controls using the filter. For example, you can search for all custom controls with the filter **`Created by != Palo Alto`**

#### Use a built-in or custom control

Add a built-in control to a custom standard, create a custom control for a custom standard, or edit a custom control for a custom standard.

You can use a built-in control, create a custom control, or edit a custom control in a custom standard.

Add a built-in control to a custom standard

Cortex Cloud provides built-in controls that cannot be edited or deleted. When you edit or create a custom standard you can add the built-in control.

Create a custom control to use in a custom standard

You can create a new control that is tailored to your own business needs, standards, and organizational policies to use in a custom standard.

1.  In the Controls catalog, click \+ Create Control.
    
2.  Define control metadata, including:
    
    -   Control name
        
    -   Description (optional)
        
    -   Category
        
    -   Sub category (optional)
        
    -   One or more custom standards to associate the control with
        
    
3.  Click Create.
    
4.  Assign a custom detection rule to the control as follows.
    

Edit a custom control

You can edit a copy of a built-in control or edit an existing custom control. You can also delete a custom control.

1.  In the Controls catalog, click  on the built-in control you want to edit and click Save as new.
    
    To edit a custom control, click  on the custom control and click Edit.
    
2.  Click Next.
    
3.  Define control metadata, including:
    
    -   Control name
        
    -   Description
        
    -   Category
        
    -   Sub category
        
    -   Select one or more custom standards to associate the control with
        
    
4.  Click Save.
    
5.  If the control does not already contain a rule, assign a custom detection rule to the control.

##### Add a custom detection rule to a custom control

Add a custom detection rule to one or more custom controls to tailor compliance checks to your organization's needs.

When creating or editing a custom control, you can add a custom detection rule to one or more custom controls to tailor compliance checks to your organization's needs.

**Note:**

Only custom detection rules (not built-in) can be assigned to custom controls.

How to add a custom detection rule to a custom control

1.  Go to Posture Management → Rules & Policies → Rules → Cloud Workload.
    
2.  Search for the rule you want to add and then click it.
    
3.  Click the Compliance Controls tab.
    
4.  Click  and click Edit.
    
5.  In the Edit Custom Detection Rule pane Compliance Controls field, click Add.
    
6.  In the Controls table, use the filter to find the control you want to assign the rule to.
    
7.  Select the control and then click Assign.
    
    The Compliance Controls number increases by one (the number of custom controls the custom detection rule is assigned to).
    
8.  In the Edit Custom Detection Rule pane, click Update.
    
    The custom detection rule is assigned to the custom control.

##### Create a new Custom Detection Rule

Create Custom Detection Rules to check your organization’s assets.

Creating Custom Detection Rules give you the flexibility to define and enforce security best practices tailored to your organization's objectives, as well as regulatory requirements not already covered by the compliance standards in our catalog.

Before you begin

Ensure you have a custom compliance control defined to associate the Custom Detection Rule to. For more information, see Use a built-in or custom standard.

How to create a Custom Detection Rule

1.  Go to **Posture Management** → **Rules & Policies** → **Rules** → **Cloud Workload**.
    
2.  In the Cloud Workload Rules page, click Create Custom Rule.
    
3.  Enter the following settings:
    
    -   Rule name: A descriptive name for the custom rule.
        
    -   Description: An optional field for adding additional details or context about the rule, such as its purpose or intended behavior.
        
    
4.  Select a Scanner to execute the Custom Detection Rule and its associated script. The options are:
    
    -   Agentless Disk Scan
        
    -   Kubernetes Connector
        
    -   XDR Agent
        
    
5.  Configure settings specific to the scanner you select.
    
    Agentless Disk Scan settings
    
    | Field | Description |
    | --- | --- |
    | Operating System | The operating system targeted by the rule. The available options are: Linux; Windows |
    | Input file(s) path | The full file path for one or more files. For example, **`/nfs/an/disks/jj/home/dir/file.txt`** |
    | Define the Rule (Rego) | Use Rego to define the custom detection logic. Use the default code in this box as a reference or starting point. Click [read here](https://www.openpolicyagent.org/docs/latest/policy-language/#learning-rego) for more information how to use Rego syntax. Example 1 **Code** "/var/log/auth.log": { "content": "Failed password for invalid user test from 192.168.1.1 port 22 ssh2\\n", "metadata": { "file_type": "file", "gid": 1000, "last_modified": 1737292449, "permissions": 436, "size": 6000, "uid": 1001 },"path": "/var/log/auth.log" } **Script** package panw.complianceimport rego.v1 match contains {"msg": msg} if { authLogFile = input["/var/log/auth.log" ] contains(authLogFile.content, "Failed password")     authLogFile.metadata.permissions == 436     authLogFile.metadata.size > 5000 msg := "Failed login attempts detected in /var/log/auth.log"} **Output** "match": [         {                "msg": "Failed login attempts detected in /var/log/auth.log"       },   ] Example 2 **Code** "/etc/passwd": { "content": "root:x:0:0:root:/root:/bin/bash\\nuser1:\*:1001:1001:User One:/home/user1:/bin/bash\\n", "metadata": { "file_type": "file", "gid": 1001, "last_modified": 1737292449, "permissions": 644, "size": 100, "uid": 1002 },"path": "/etc/passwd" } **Script** package panw.complianceimport rego.v1 match contains {"msg": msg} if { passwdFile = input["/etc/passwd"]         passwdFile.metadata.file_type == "file"     passwdFile.metadata.permissions == 644     passwdFile.metadata.size < 200     contains(passwdFile.content, ":\*:")     msg := "Empty or suspicious password detected in /etc/passwd"} **Output** "match": [   {             "msg": "Empty or suspicious password detected in /etc/passwd"     }, ] Example 3 **Code**  "/etc/shadow": {    "content": "root:$6$abc123$abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123:17542:0:99999:7:::",     "metadata": {       "file_type": "file",       "gid": 1001,       "last_modified": 1737292449,       "permissions": 640,       "size": 100,       "uid": 1002     },"path": "/etc/shadow"  } **Script** package panw.complianceimport rego.v1 match contains {"msg": msg} if { shadowFile = input["/etc/shadow"]         shadowFile.metadata.file_type == "file"    shadowFile.metadata.permissions != 600     shadowFile.metadata.size > 30     contains(shadowFile.content, "::")     msg := "Empty or weak password detected in /etc/shadow"} **Output** "match": [    {             "msg": "Empty or weak password detected in /etc/shadow"         }, ] |
    
    Kubernetes Connector settings
    
    | Field | Description |
    | --- | --- |
    | Kubernetes Resources | From the drop down, select one or more from the following: Namespaces: Logical partitions within a Kubernetes cluster that allow resource isolation and organization.; ReplicaSets: Ensures a specified number of pod replicas are running at all times by automatically scaling up or down.; Deployments: Manages and control pod replicas by providing declarative updates for ReplicaSets, enabling rolling updates and rollbacks.; StatefulSets: Deploys stateful applications that require persistent identity and storage, ensuring stable pod names and ordered scaling.; DaemonSets: Ensures that a copy of a specific pod runs on all or selected nodes in the cluster, commonly used for logging and monitoring agents.; Jobs: Runs one-time or short-lived workloads that complete execution and then terminate.; CronJobs: Defines scheduled jobs that run at specified times or intervals, similar to Linux cron jobs.; ClusterRoles: Defines permissions at the cluster level, granting access to resources across all namespaces.; Roles: Defines permissions within a specific namespace, restricting access to resources within that namespace.; RoleBindings: Associates a role with a user, group, or service account within a specific namespace.; ClusterRoleBindings: Associates a cluster role with users, groups, or service accounts at the cluster-wide level.; NetworkPolicies: Defines rules that control the communication between pods and other network entities within the cluster, enforcing security restrictions.; Services: Exposes a set of pods as a network service, allowing stable communication within and outside the cluster.; ServiceAccounts: Provides an identity for pods to authenticate against the Kubernetes API, allowing controlled access to resources.; Endpoints: Represents the actual network addresses of the pods backing a service, dynamically updated as pods start or stop.; Ingresses: Manages external access to services, providing HTTP/HTTPS routing, load balancing, and SSL termination.; ConfigMaps: Stores non-sensitive configuration data in key-value pairs, allowing applications to retrieve configuration without modifying container images.; Secrets: Securely stores and manage sensitive data, such as API keys, passwords, and certificates, in an encrypted format.; Nodes: Defines the physical or virtual machines that run the workloads in a Kubernetes cluster. |
    | Define the Rule (Rego) | All custom Rego policies in Cortex must follow this pattern: package panw.compliance import rego.v1 match contains {"msg": msg} if { # Your detection logic here msg := "Description of the finding" } \*\*Note:\*\* The custom rule must use the `match` term (not `deny` or others) to function properly. |
    
    XDR Agent settings
    
    | Field | Description |
    | --- | --- |
    | Custom Code Execution | Enable this setting for the scanner to perform custom compliance checks by executing user-defined Python scripts. \*\*Note:\*\* Only users with the following roles can enable or disable Custom Code Execution: Account Admin; Instance Administrator; Deployment Admin; Privileged Security Admin Click Confirm to accept the following terms: The Python scripts you provide will be executed in your cloud environment(s).; This capability is solely for the purpose of enabling you to define the compliance check rules for your cloud environment(s). Any other purposes are expressly prohibited.; Any actions involving WRITE, MODIFY, or DELETE operations of your cloud environment(s) are strictly prohibited. It is your responsibility to ensure that your custom Python scripts only perform read-only operations of your cloud environment(s) explicitly for compliance check purposes.; You are solely responsible for the quality, content, use, and execution results of your Python script. You assume all risks and liabilities arising from executing your Python script(s), including any potential errors, damages, or consequences resulting from its use. After you confirm accepting the terms, the rest of the XDR Agent settings appear. |
    | Operating System | The operating system targeted by the rule. The available options are: Linux; Windows |
    | Define the Rule (Python) | Use Python to define the custom detection logic. This section supports syntax highlighting and validation (IntelliSense) to help users create accurate and efficient rules. Use the default code in this box as a reference or starting point. \*\*Important:\*\* The custom Python scripts are intended to be executed exclusively for compliance checks and validations. To ensure the scripts are used properly and no security risks or unintended changes occur, the system implements the following restrictions and safeguards: Only a predefined set of Python libraries and functions required for compliance checks are available for use. Libraries or functions that enable writing, deleting, or creating operations are excluded.; Only authorized users with specific permissions can create or update custom scripts. This ensures that only trusted individuals can define compliance checks. |
    
6.  For Compliance Violation Severity, define the severity level of the compliance violation to ensure proper categorization and prioritization. Possible values are:
    
    -   Critical
        
    -   High
        
    -   Medium
        
    -   Low
        
    -   Informational
        
    
7.  For Compliance Controls, assign the rule to one or more existing compliance controls.
    
    **Note:**
    
    Only Custom Detection Rules (not built-in rules) can be assigned to custom controls.
    
    1.  Click Add.
        
    2.  Select a custom compliance control from the list.
        
    3.  Click Assign.
        
    
8.  For Remediation, you can optionally define the remediation steps to address any detected misconfiguration.
    
9.  Click Create.
    
    The new rule appears in the Rules List.
    
    You can now use the rule as a check to either create an issue or monitor adherence to a specific requirement.
    
    Create an issue
    
    Under Posture Management → Policies → Cloud Workload, add the Custom Detection Rule to a Policy. This policy automatically runs the rule and creates an issue if the check fails.
    
    Monitor compliance adherence
    
    Under Posture Management → Compliance → Catalogs → Standards, create a custom standard that includes the custom control associated with the Custom Detection Rule, and then create an assessment profile that runs the custom standard. You can then monitor the compliance results in a report. For more information, see Monitor and track compliance adherence.

## Use an assessment profile to run compliance checks on your assets

The compliance Assessment Profiles are configurations that define which standard to run on which asset group.

An assessment profile runs scans on asset groups to check whether the assets adhere to a specific standard.

Right click on the profile to disable, edit, or delete an existing profile.

To create a new assessment profile, select a compliance standard and one or more asset groups you want to run it on.

How to create a new profile

1.  Under Posture Management → Compliance → Assessment Profiles, click Create New Assessment.
    
2.  Define assessment profile metadata, including:
    
    -   Profile name
        
    -   Description (optional)
        
    -   Optionally schedule generating a report.
        
        1.  Enter one or more report email recipients, clicking `enter` or ↵ between each entry.
            
        2.  Set the cadence for the report generation.
            
        
    
3.  Click Next.
    
4.  Select a compliance standard to associate with the assessment profile.
    
5.  Select an asset group to run the standard against.
    
6.  Click Next.
    
7.  Review the profile details in the Summary and click Create.
    
    The assessment profile evaluates the compliance posture and generates a report at the optionally defined cadence, and sends it to the defined emails.

## View and manage compliance assessments and reports

Create a compliance assessment report based on a Cortex compliance standard for immediate viewing or download, or schedule recurring reports to continue monitoring compliance over time.

A compliance assessment provides you with a consolidated view of your organization's compliance with a selected standard. Compliance status is automatically updated in the Assessments results page for you to view.

**Note:**

Compliance assessment results may take up to six hours to be generated.

You can generate PDF or CSV reports and optionally receive them via email when you configure your assessment profile. You can also view a list of compliance reports and download them from the Reports page.

### Compliance score

The compliance score is calculated for each assessment profile. The score is based on the number of assets that passed or failed the rules in the standard, represented as a percentage of controls that failed/passed.

### Assessments

View the latest compliance assessment results in the Assessment page.

The Assessment page shows the latest compliance assessment profile results. It provides an up to date high level compliance view.

The display shows the following information:

| Display element | Description |
| --- | --- |
| Assessment by Score widget | Shows how many assessment profiles were in each percentage of compliance range, color coded as follows: Red: 0-50%; Orange: 51-99%; Green: 100% |
| Assessment by Label widget | Shows how many of each label were assessed, for example, AWS or Azure. |
| Table showing assessment profiles grouped by compliance standard | Displays assessment profiles grouped by standards, including: Standard name: The standard used in the assessment profile.; Asset Group: The asset group the assessment profile assessed.; Score: The score assigned to the asset group. It is calculated as the number of assets that passed divided by the sum of assets that passed plus failed (the total number of assets that were evaluated).; Control status: How many assets in an asset group passed the rule check (green), how many were not evaluated (grey), and how many failed (red).; Failed controls by severity: Of the assets that failed the rule check, what was the severity of the failure for each asset; critical (dark red), high (red), medium (orange), low (blue), and informational (grey).; Labels: The labels that were evaluated for the asset group in the assessment profile, for example, AWS or Azure.; Last evaluation time: The last time the rule was run. |

#### See specific assessment profile results

You can right click a specific assessment profile and select View Profile Report, which opens the report generated by the assessment profile. The report contains two tabs, Controls and Assets. You can also access this page by hovering over the end of the row and selecting the view arrow.

Controls tab

The Controls tab shows:

| Display element | Description |
| --- | --- |
| Compliance Score widget | Displays the overall compliance score for the assessment profile and when it was last checked. |
| Controls by Status widget | A pie chart indicating which controls passed, failed, or were not assessed for a specific asset group. If a control is not assessed, it will not cause the asset group to fail the rule check. The status is color-coded (green=passed, red=failed, grey=not assessed). |
| Controls by Severity widget | A pie chart indicating severity level for controls for an asset group. Possible values: Critical; High; Medium; Low; Informational |
| Table showing controls and their rules grouped by category | Displays rules grouped by controls and categories, including: Name: The control name.; Score: The rule score. For control, shows the average of the rule scores. For category, shows the average of the control scores.; Status: Whether the control/rule passed or failed. The definition of pass varies by rule. See Cortex documentation for details.; Severity: The control/rule severity rating (Critical, High, Medium, Low, Informational).; Assets: The asset status. Each number links to the Asset tab, filtered by control/rule with the status.; Issues: Links to the Issues table in a new tab, filtered for relevant issues. |

Drill down to specific controls and rules

View control details

Clicking the row for a specific control opens the Control Details side panel that shows information about the control in the Overview tab and the Rules tab.

| Tab | Details |
| --- | --- |
| Overview | The Overview tab shows the following control metadata. General Details: Includes the standards, category, sub category, created at, and automation status associated with the control.; Description: The control description.; Standard Mitigation Action: A predefined measure or step to address and reduce risk related to the control.; Assessment Results: Includes the asset group, linked issues, and linked findings. |
| Rules | The Rules tab shows the following information about the rules in the control. \*\*Note:\*\* If there are no rules associated with the control, the control will be assigned a severity of low. Rule name; Rule ID; Type; Severity: The overall severity of the control is determined by the rule with highest severity. |

View rule details

Clicking the row for a specific rule opens the Rule Details side panel.

This panel shows information about the rule, including:

-   General Details: Rule name, rule ID, type, and severity, and scanned asset categories.
    
-   Description: The rule description.
    
-   Remediation steps: Actions from the standards provider or from custom controls to correct or resolve asset non-compliance identified during the assessment.
    
-   Assessment Results: Includes the asset group, linked issues, and linked findings.
    

Assets tab

The Assets tab shows:

| Display element | Description |
| --- | --- |
| Compliance Score widget | Displays the overall compliance score for the asset group and when it was last checked. It represents the aggregated status per asset. Assets with one failure are considered failed. |
| Distinct Assets by Status widget | A pie chart indicating which assets in an asset group passed for all rules, failed one or more rules, or were not assessed. |
| Table listing all the assets in the asset group | The distinct checks run for every asset covered by the assessment profile. Every row in the table represents a rule per asset for this standard. Asset name: The name of the asset.; Asset type: For example, storage bucket, endpoint, VM instance, human identity.; Status: Whether the asset passed or failed the rule.; Source: Whether the source is an issue and/or finding.; Rule: The rule that ran on the asset.; Control: The control that contains the rule. |

Clicking the row for a specific asset opens a side panel showing asset details organized under the following tabs:

-   Overview
    
-   SBOM
    
-   Access
    
-   Vulnerabilities
    

Right clicking on a row includes the following options:

-   View in Asset Inventory: Opens the Inventory → Assets → All Assets page showing asset details.
    
-   View Control Side Panel: Opens the Control Details side panel.
    
-   View Rule Side Panel: Opens the Rule Details side panel.

### Reports

View a history of compliance assessment reports in Reports.

The Posture Management → Compliance → Results → Reports page shows a table listing compliance assessment report files.

The table displays report details, including:

-   Standard name
    
-   Assessment profile
    
-   Asset group
    
-   Score
    
-   Controls status
    
-   Failed controls by severity
    
-   Evaluation time
    

The Evaluation time indicates when the compliance assessment was last performed, not when the report was generated. Because compliance assessments occur every six hours, the Evaluation Time typically precedes the actual report generation time.

#### Export compliance assessment reports

You can download a report by right clicking a report file in the table and selecting Export to PDF or Export to CSV. You can optionally delete reports.

You can also generate PDF or CSV reports and optionally receive them via email when you configure your assessment profile. For more information, see Use an assessment profile to run compliance checks on your assets.

The downloaded files contain the following information.

| Exported File Type | Information Included | File Retention after Report Generation |
| --- | --- | --- |
| PDF | An executive summary showing: Asset Group; Report generation date; Compliance standard used for the compliance assessment; Standard details; Overall compliance assessment status (passed or failed); Number of assets the compliance assessment ran on; The number (and percentage) of assets that passed; The number (and percentage) of assets that failed | Up to six months. |
| CSV | A report detailing assets, controls, and rules. | Up to three days. |

Example 120. 

The following is a sample compliance assessment report exported to PDF.

## View the compliance assessment of an individual asset

You can review the compliance performance of any asset to gain insight into how a specific asset aligns with assigned security standards and individual controls.

You can review the compliance performance of any asset to gain insight into how a specific asset aligns with assigned security standards and individual controls. This view allows you to:

-   Focus on an individual asset’s compliance performance in the context of a specific standard, understand the standard and category placement of each individual control, and get immediate access to the findings or issues created in the case of violations.
    
-   Identify the severity of the individual controls violations through their association with underlying rules. Access the underlying findings and issues for remediation guidance and the context necessary to perform the prescribed action.
    
-   Identify the actions you need to take to improve the compliance score of an individual asset.
    

### View the compliance assessment of an asset

To view compliance assessment for an asset:

1.  Navigate to Inventory → Assets.
    
2.  Click on an asset to open asset details.
    
3.  Click on the Compliance tab.
    

The Compliance tab includes the following information:

| Section | Description | Functional tip |
| --- | --- | --- |
| Overall Compliance Score | Displays asset’s compliance score and the number of standards and controls used for assessment. | Use this for a high-level quantification of asset compliance against assessed standards. |
| Controls by Status | Shows the distribution of controls across Passed, Failed, and Not Assessed. | Click a specific status to filter the Standards and Controls data. |
| Standards, Score, Controls Passed | Lists the standards by which the asset is assessed, including the score and passed control count for each. | Click a specific standard to filter the items in the Controls Overview table by that specific standard. |
| Controls Table | An exhaustive list of controls for which an asset may be assessed including columns for Standard, Category, Control, Severity, and Status. | Click a control to view the control details, or click a Failed status to view details of the related finding or issue. |
