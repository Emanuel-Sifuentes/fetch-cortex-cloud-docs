# Cortex Cloud Data Security

The Cortex Cloud Data Security solution is an agentless multi-cloud data security platform that discovers, classifies, protects, and governs sensitive data.

The Cortex Cloud Data Security solution is an agentless multi-cloud data security platform that discovers, classifies, protects, and governs sensitive data.

## What is Cortex Cloud Data Security?

Learn about Cortex Cloud Data Security capabilities and benefits.

When you start managing your data assets in the cloud, this requires the implementation of comprehensive data security capabilities. The mission of Cortex Cloud Data Security is to provide you with such capabilities, in order to ensure complete visibility and real-time control over potential security risks to your data.

The following image shows the Cortex Cloud Data Security dashboard:

### Capabilities

As a cloud-native data security solution, Cortex Cloud Data Security utilizes several technologies to discover, contextualize, monitor, and protect your cloud data assets in real time. Cortex Cloud Data Security collects data from a variety of cloud deployments and data servers, both managed (such as buckets, file storage, databases) and self-hosted (such as MongoDB and MySQL running on virtual machines). The Cortex Cloud Data Security platform also discovers data analytic environments (DBaaS) such as Snowflake, offering you a complete data landscape view. By using cloud-native APIs and methods, Cortex Cloud Data Security collects the metadata of the monitored assets and administrative logs such as CloudTrail, activity logs, and audit logs. Using this information, Cortex Cloud Data Security can detect and remediate the following issues or risks:

-   **Shadow data**: An example of shadow data is database snapshots and backups created by development teams as they make changes to files or move them around the cloud. This type of shadow data is not protected by existing data governance frameworks, and security teams often do not even not know it exists, even though it may contain sensitive information.
    
-   **Compliance violations**: The flexibility of cloud infrastructure makes it harder for you to stay compliant with security regulations such as HIPAA, GDPR, PCI, and so on, therefore making it more difficult to be able to prove it to auditors. Cortex Cloud Data Security provides your compliance teams with an easy way to classify data under these regulations and ensure it is handled properly, and intervene when a violation is detected.
    
-   **Data exfiltration or theft**: Cortex Cloud Data Security enables you to easily detect exposures in the data element layer and limit access to them in a way that prevents cybersecurity attacks and data breaches.
    
-   **Ransomware**: The real-time threat detection tools of Cortex Cloud Data Security enable you to stop ransomware attacks early in the kill chain.
    
-   **Data misuse**: While typically not malicious, data misuse can lead to unintentional data compromise. Cortex Cloud Data Security can prevent such data misuse by enforcing security policies across multi-cloud architectures, which prevents users and developers from storing files in inappropriate places.
    

### Benefits

Using the data detection and security capabilities of Cortex Cloud Data Security enables you to:

-   Discover and visualize all your data assets across the different cloud services, which will help you understand where the sensitive data is, how it is used and how it is moving across the organization.
    
-   Reduce the attack surface on your sensitive data by identifying and eliminating the data threat vector early in the kill chain.
    
-   Reduce cost due to detection of unused, duplicated, and stale data which allows for better data hygiene and operation.
    
-   Protect all of your data in real time.
    
-   Combine different technology sets such as DSPM and DDR capabilities to provide the highest level of data protection. See Cortex Cloud Data Security use cases for further elaboration on these capabilities.
    
-   Create a centralized view of all data exposure issues by applying a single policy across multiple cloud deployments.
    
-   Reduce cloud costs by identifying orphaned snapshots, shadow backups, and stale assets that contribute to unnecessary storage expenses.

## Supported assets in Cortex Cloud Data Security

A basic summary of the supported assets in the Cortex Cloud Data Security module.

**Notice:**

This feature is included with a Cortex XSIAM Premium license. It is also included with any other Cortex XSIAM license that has the Cloud Posture Security or Cloud Runtime Security add-on.

The Cortex Cloud Data Security solution helps you discover, classify, protect, and govern your data across multi-cloud environments. With Cortex Cloud Data Security, you can reduce data misuse, achieve compliance, and prevent ransomware attacks and data breaches.

Cortex Cloud Data Security offers data classification for the following assets and services:

### AWS

-   **Storage:** Amazon Simple Storage Service (S3), Amazon EBS volumes
    
-   **Databases:** Amazon Aurora (provisioned), RDS (MySQL, MariaDB Server, PostgreSQL, Amazon RDS instance and cluster snapshots), Amazon DynamoDB, Amazon Redshift
    
-   **Self-Managed Databases:**
    
    -   MongoDB
        
    -   MySQL
        
    -   SQL Server
        
    -   PostgreSQL
        
    -   MariaDB Server
        
    

### Azure

-   **Storage:** Azure Blob Storage, Azure Managed Disks
    
-   **Databases:** Azure SQL, Azure Cosmos DB, Azure SQL Managed Instance
    
-   **Self-Managed Databases (outpost scan only):**
    
    -   MongoDB
        
    -   MySQL
        
    -   SQL Server
        
    -   PostgreSQL
        
    -   MariaDB
        
    

**Note:**

CMK (customer-managed key) in SQL Server is only supported in outpost mode.

### GCP

-   **Storage:** Cloud Storage, Persistent Disks
    
-   **Databases:** Cloud SQL (MySQL, PostgreSQL, SQL Server), Bigtable
    
-   **Analytics:** BigQuery
    
-   **Self-Managed Databases:**
    
    -   MongoDB
        
    -   MySQL
        
    -   SQL Server
        
    -   PostgreSQL
        
    -   MariaDB
        
    

### Snowflake

-   Account
    
-   Stage
    
-   Database
    

### Microsoft Office 365

-   Tenant
    
-   Microsoft SharePoint site
    
-   Drive
    
-   Document library
    

### Databricks

-   Account
    
-   Workspace
    
-   Metastore
    
-   Catalog (Database)
    

### On-Premises

-   **File Shares**
    
    -   SMB
        
    -   NFS
        
    

**Note:**

The list above refers to only data classification; however, Cortex Cloud Data Security discovers and monitors all cloud assets and services for usage and misconfigurations.

**Note:**

For information about configuring data classification asset types, see How to configure the scanning settings for supported services.

## Cortex Cloud Data Security concepts

A glossary of the basic concepts of Cortex Cloud Data Security.

The following is a list of the basic concepts related to Cortex Cloud Data Security:

-   **Data asset:** Any asset that contains data in a customer environment.
    
-   **Storage:** A data asset that contains folders and files.
    
-   **Database:** A data asset that contains structured data in tables and columns. It can also contain semi-structured data (non-tabular data).
    
-   **Disk:** A type of data asset that is a VM disk in cloud environments such as EBS for AWS, managed disks in Microsoft Azure, and Persistent Disk in Google Cloud Platform (GCP). These can host files, folders, and databases.
    
-   **Discovery:** The process of detecting data assets in a customer environment.
    
-   **Data classification:** The process of scanning data for sensitive records and identifying the class and quantity of sensitive records within a data asset.
    
-   **Object:** An instance of either files or columns, in a storage asset or database asset, respectively.
    
-   **Data pattern:** The basic structure of data that is discovered in an object, such as an email address, an IP address, a phone number, a name, a credit card number, and a bank account number.
    
-   **Data profile:** A group or category of multiple data patterns sharing similar attributes. For example, personally identifiable information (PII) is a data profile that could include an email address, phone number, or name. Another example of a data profile is developer secrets, which might include a token, AWS key, or certificate.
    
-   **Sensitive Record:** A sensitive record is defined by having a data pattern that is matched with a data object.
    
-   **False positive:** A case where certain data is detected as being a specific data pattern but actually matches a different data pattern or possibly should not match any data pattern at all.
    
-   **Data security finding:** Findings are security-related insights that are generated as part of data scanning but are not necessarily actionable. For example, "shadow backups found” is an example of a finding that can be generated by the Cortex Cloud Data Security scanner.
    
-   **Data security issues:** Issues reflect actionable security risks that are generated by a Data Policy. For example, “sensitive public object in private asset” is an issue referencing a scenario where an object is publicly accessible while the asset configuration does not make it entirely public.

## Cortex Cloud Data Security use cases

Learn more about the main use cases in Cortex Cloud Data Security.

### Ensure compliance

-   Address your compliance requirements and avoid penalties. for security standards such as GDPR, PCI DSS, NIST, HIPAA, and others.
    
-   Ensure data residency and sovereignty.
    

### Understand your data

-   Discover and visualize all your data assets across the different cloud service providers, SaaS applications, and on-premise data stores, which will help you understand where the sensitive data is, how it is used and how it is moving across the organization.
    
-   Classify and identify sensitive information stored in data assets, including personally identifiable information (PII), regulated data (PHI, PCI, SOX), and corporate secrets defined in structured, semi-structured, and unstructured data.
    
-   To understand your data, use the Data Security Dashboard, which provides visibility into all the data assets. The complete list of your data assets can be found under Data Inventory, where you can investigate each individual asset.
    

### Understand access to your data

-   Utilizing the Cortex Cloud Identity Security module, understand which entities, human and non-human, have access to your sensitive information and how it is used within the organization and outside of the organization.
    

### Understand your risks

-   Reduce the attack surface on your sensitive data by identifying and eliminating the data threat vector early in the kill chain, such as publicly accessible sensitive data, insecure data movement, lack of backup or versioning, lack of encryption, and more.
    
-   Create a centralized view of all data exposure issues by applying a single policy across multiple cloud deployments.
    
-   Prioritize your security measures by content type.
    
-   Protect all of your data in real time.
    
-   To detect security issues in your data assets, use Data Issues.
    

### Reduce cloud cost

-   Significantly reduce cloud costs by identifying orphaned snapshots, shadow backups, and stale assets that contribute to unnecessary storage expenses. It automates data retention policy analysis, ensuring compliance while preventing excessive data storage costs.
    
-   By managing large asset inventories and prioritizing financial efforts on critical resources, you can optimize cloud utilization. Additionally, its data freshness analysis helps remove outdated assets, further cutting expenses.

## Data Inventory

Learn about the All Data Assets page, including databases, disks, and storage buckets.

The All Data Assets page provides a centralized repository containing information about all data assets within your environment. Dedicated asset modules allow multi-method asset coverage, such as agentless, from various sources. Having full visibility of assets allows for timely incident response, effective threat hunting, and attack surface reduction.

The data inventory asset card provides a unified view of an asset, consolidating attributes, enhancements, and related cases, issues, and findings. When you click an asset, the asset card opens, enabling you to easily switch between multiple assets cards at the same time.

On each asset card, you can perform the following actions:

-   Leave comments for collaboration, and perform actions on the asset, depending on the type.
    
-   Share links for easy access.
    
-   View asset data: see all relevant data and raw information connected to the asset.
    

Category, class, and type are terms used to facilitate the organization and classification of assets.

-   **Class**: represents the highest-level grouping of assets based on their general purpose or domain. It is a broad classification that defines the overall function of the assets.
    
    -   Examples: Compute, Network, Data
        
    
-   **Category**: represents a more detailed grouping within a class. It categorizes assets based on their normalized function or common type, regardless of the provider or implementation.
    
    -   Examples: For Compute: Virtual Machine, Container
        
    -   For Data: Bucket, Database
        
    
-   **Type**: the most specific level of classification and represents the provider-specific name for a particular asset within a category. This level directly refers to the specific implementation of an asset.
    
    -   Examples: For the Virtual Machine category: EC2 Instance (AWS), Compute Engine Instance (GCP).
        
    

Fields on the Data Inventory page

The following is a list of the fields displayed on the Data Inventory page. The assets shown, and their data, depend on your system's licensing.

| Column | Description |
| --- | --- |
| First Discovered | The timestamp of when the asset was first discovered. |
| Asset Name | The name of the data asset. |
| Service Type | The specific type of database, disk, or storage bucket, including the name of the service. |
| Data Profiles | A group or category of multiple data patterns sharing similar attributes. |
| Data Patterns | The basic structure of data that is discovered in an object such as email address, IP address, phone number, name, credit card number, and bank account number. |
| Information Protection Labels | Digital tags that help your organization classify and secure sensitive data. They identify how sensitive a piece of information is; for example, whether it's a document or an email. |
| Last Classification Time | The timestamp of the last time that the data was scanned for sensitive records in order to identify the class and quantity of sensitive records within a data asset. |
| Number of Records | The total number of records that were found during classification. |
| Is Open to World | Indicates whether a record is exposed to any entity in the world (Yes) or protected (No). |
| Category | The category of data: database, disk, or storage bucket. |
| Cloud Provider | The name of the cloud provider: Amazon AWS, Microsoft Azure, or Google Cloud Platform (GCP). |
| Region | Displays the region as provided by the Cloud provider. |
| Size | The size of the asset. |
| Number of Objects | The number of objects stored in the asset. |
| Number of Issues | The number of issues found associated with the asset. |
| Resource ID | The resource ID of the asset. |
| Account ID | The account ID associated with the asset. |

Asset tabs

When you select Inventory → All Assets → Data → All Data Assets, a list of all data assets appears. The following table describes the tabs shown under Data Inventory when you click on any asset in the list.

| Tab | Description |
| --- | --- |
| Overview | The Overview tab provides highlights, properties, and identities with access to the resource, if any are found. |
| Access | The Access tab provides a list of the identities that can access the displayed asset. |
| Data | The Data tab provides an overview of the displayed asset and its associated risks, including the number of Assets at Risk, data stored in AWS, Azure, and GCP, Sensitive Assets, and assets marked as Open to the World. |
| Objects | The Objects tab provides a list of files and information pertaining to the files' contents. |

You can also select one of the following to filter the asset list for the asset type you want to display:

-   Databases
    
-   Disks
    
-   Storage Buckets
    

### Widgets and Filtering

Use the following widgets and filtering features at the top of the All Data Assets screen:

**Widgets**

-   Assets at Risk: Displays a bar with the various risk levels. When you hover your mouse you can see the number of risks for each risk level that were found. You can also click any of the cloud platform icons (AWS, Azure, and GCP) to filter the results. Click again to remove the filter.
    
    
    
-   Sensitive Assets: Displays the number of sensitive assets that were found. You can click this widget to filter the list according to these sensitive assets. The number of assets at risk changes accordingly.
    
    
    
-   Sensitive Assets Open to World: Displays the number of sensitive assets that are open to the world. The number of assets at risk changes accordingly.
    
    
    

**Filtering Features**

-   Refresh: Refreshes the data shown in the data inventory display.
    
-   Show filter panel: Opens a panel where you can select specific fields and search for values. You can also use the filter panel to clear the current filter settings.
    
-   Table Settings Menu: Opens a pane with layout and filters that you can apply.
    

### Use case example: Add Filters button

To use the Add Filters button to display all storage buckets that have credit card numbers and are publicly available, do the following:

1.  In the All Data Assets screen, under the row of widgets at the top of the screen, click the Add Filters button.
    
    
    
2.  In the Select field list, select Category.
    
    
    
3.  In the Value field, enter `storage` and then press Enter.
    
4.  Click the Add filter + button to jump to the next field.
    
5.  Continue adding filters as follows:
    
    1.  In the Select field list, select: Is Open To World, and then double-click Yes.
        
        
        
    2.  Click Add filter and then in the Select field list, select: Data Patterns.
        
    3.  Enter `Credit Card Number`, then click anywhere outside the filter area to apply the filter.
        
        The filter should now appear as shown below:
        
        
        
    
    The asset list beneath the filter panel should now display all storage buckets that have credit card numbers that are publicly available.
    
6.  To save your new filter, click Save filters and in the Save Filter screen enter a name for the new filter. Optionally, you can select the Share filter with my team option. Click Save.
    
    The filter is saved to your filters. You can access it by clicking More Options → Load filters. You can export your filters by clicking More Options → Export filters.
    

**Note:**

To clear the filter in the filter panel, click Delete.

## How to review errors in Cortex Cloud Data Security

Learn how to access and review errors in Cortex Cloud Data Security.

### Review errors

To review errors in Cortex Cloud Data Security, do the following:

1.  In the lower left part of the screen, click Settings → Data Sources.
    
2.  On the Data Sources screen, click a cloud service provider or other data source and then click the View Details link. Alternatively, you can click the Error button near the top of the screen. This button displays the data sources that have errors.
    
3.  In the Cloud Instances screen, click the Instance Name link. A screen displaying the instance name and related information opens.
    
4.  In the Security Capabilities list, click Data Security Scanning to display the Errors pane with the details of the errors that were found.
    
5.  Click Add Filters to create a filter that displays the assets you want to review.
    
6.  Click an asset row to display a popup window with information about the error and a raw error string that you can copy.
    

Table 4. Error table columns

| Column Name | Description |
| --- | --- |
| Asset Name | The technical name of the asset. |
| Error Name | An explanation of the error. |
| Timestamp | The date and time when the error was found. |
| Region | The geographical location of the asset with the error. |
| Asset Type | The type of asset, such as an Amazon S3 bucket or an RDS database. |

## How to configure the scanning settings for supported services

How to edit a cloud instance, including data asset types.

1.  In the lower left area, click Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click a cloud service provider or other data source and then click the View Details link.
    
3.  On the Cloud Instances screen, click an instance name link. A screen displaying the instance name opens.
    
4.  At the bottom of the screen, under Accounts (AWS), Subscriptions (Azure), or Projects (GCP), right-click an item in the list and then in the context menu, select Edit.
    
5.  In the screen that opens, under Data assets classification options, you can do the following:
    
    -   Select or deselect managed services, which are native cloud services that are managed directly by your cloud provider, such as AWS, Azure, or GCP.
        
    -   Select or deselect self-managed assets, which are databases that you run on your cloud virtual machines.
        
    -   Configure a cadence indicating how often a scan should be performed.
        
        **Note:**
        
        If you do not select a scanning cadence, the default setting is applied. For more information, contact your [Customer Support team](https://support.paloaltonetworks.com/Support/Index).
        
    
6.  Click Save.
    
    For more information about supported assets in Cortex Cloud Data Security, see Supported assets in Cortex Cloud Data Security.

## How to perform advanced Data Security investigations using XQL

How to work with datasets in Cortex Cloud Data Security.

### Overview

Cortex Cloud Data Security centralizes data-related information into a list of datasets, providing the foundation for comprehensive security investigations. Using Cortex Query Language (XQL) , you can create custom queries to extract valuable insights from these data sources within your system. For more information, see Get started with XQL.

You can use the following data-related datasets:

| Dataset | Description |
| --- | --- |
| dspm_asset_metadata | Contains high-level information about all data assets, including details such as their creation and modification dates, cloud service, and any tags. |
| dspm_asset_table_inventory | Provides an inventory of tables and their associated fields, which is useful for analyzing data at a more granular level. |
| dspm_asset_data_patterns | Tracks specific patterns of sensitive data, such as SSN or credit card numbers, found within your assets. |
| dspm_asset_data_profiles | Provides a summary of the data's content, including counts of sensitive fields and the percentage of sensitive data found. |
| data_ingestion_health | Monitors the health of data ingestion pipelines, logging failures or issues that could lead to incomplete security monitoring. |
| findings | Contains findings associated with assets discovered within your environments. For more information, see Findings and events. |
| issues | Contains issues generated on assets within your environments. For more information, see Issues. |

### Investigate Cortex Cloud Data Security

To run queries on your Cortex Cloud Data Security datasets:

1.  In Cortex Cloud, in the navigation pane on the left, click Investigation & Response, then under Search, click Query Builder.
    
2.  Click XQL.
    
3.  You can start typing your query in the box at the top of the screen, or search for existing queries on the Query Library tab.
    
4.  Click Run. The query results appear on the Query Results tab.
    

**Note:**

For more information, see Build XQL queries.

### Examples

1\. All AWS data stores that contain objects with sensitive data

```
dataset = findings
| filter xdm.finding.type_id = 80000002 and xdm.finding.is_active = true 
| Join (dataset = asset_inventory 
    | filter xdm.asset.type.class = "Data" and xdm.asset.provider = "AWS"
    | fields xdm.asset.id as Asset_ID, xdm.asset.name as Asset_Name, xdm.asset.provider as Asset_Cloud, xdm.asset.cloud.region as Region, xdm.asset.type.name as Asset_Type) as res res.Asset_ID = xdm.finding.asset_id
| alter Patterns = json_extract_scalar_array(xdm.finding.normalized_fields, "$['xdm.data.data_pattern']") 
| alter Total_Sensitive_Records = json_extract_scalar(xdm.finding.normalized_fields, "$['xdm.data.statistics.records_count']")  
| fields Asset_Name, Asset_Type, Asset_Cloud, Region, Patterns, Total_Sensitive_Records
```

2\. All files containing sensitive data matching the PII data profile

```
dataset = dspm_asset_file_inventory 
| arrayexpand file_data_profile_ids 
| alter profile_id = to_integer(file_data_profile_ids) 
| join type = left (dataset = asset_inventory 
| fields xdm.asset.name, xdm.asset.id, xdm.asset.type.name ) as ai ai.xdm.asset.id = asset_id 
| join type = left (dataset = classification_mgmt_data_profile 
| filter name = "PII" 
| fields id, name) as cmdp cmdp.id = profile_id 
| dedup xdm.asset.id 
| fields file_name, file_folder, file_extension_category, file_size_bytes, file_data_patterns, record_count, xdm.asset.name, xdm.asset.id, xdm.asset.type.name 
```

3\. All data patterns with the number of sensitive records per pattern

```
dataset = dspm_asset_data_patterns 
| comp sum(record_count) as Records by kind  
| fields kind, Records
```

4\. All files containing sensitive PII data that is also public

```
dataset = dspm_asset_file_inventory 
| filter file_is_open_to_world = true 
| arrayexpand file_data_profile_ids 
| alter profile_id = to_integer(file_data_profile_ids) 
| join type = left (dataset = asset_inventory 
| fields xdm.asset.name, xdm.asset.id, xdm.asset.type.name ) as ai ai.xdm.asset.id = asset_id 
| join type = left (dataset = classification_mgmt_data_profile 
| filter name = "PII" 
| fields id, name) as cmdp cmdp.id = profile_id 
| dedup xdm.asset.id 
| fields file_name, file_folder, file_extension_category, file_size_bytes, file_data_patterns, record_count, xdm.asset.name, xdm.asset.id, xdm.asset.type.name 
```

5\. Data security issues related to malware

```
dataset = issues 
| filter xdm.issue.owner = "DSPM" and xdm.issue.detection.rule_id = "DSPM_1010"
| fields xdm.issue.name as Name, xdm.issue.severity as Severity, xdm.issue.domain as Domain, xdm.issue.category as Category, xdm.issue.observation_time as Observation_Time, xdm.issue.description as Description, xdm.issue.status.progress as Status
```

6\. All shadow backup files, such as database dumps or copies that are stored in unstructured storage

```
dataset = dspm_asset_file_inventory 
| filter file_is_shadow_backup = true and file_is_deleted = false
| fields file_name, file_folder as Folder, file_extension_category as File_Type, file_last_modification_time as Last_Modified, file_data_patterns as Data_Patterns, last_classification_time as Last_Classified_Time
```

7\. All assets containing the PCI data profile and data security issues

```
dataset = asset_inventory 
| join type = inner (dataset = dspm_asset_data_profiles 
| alter int_data_profile_id = to_integer(data_profile_id) 
|join type = inner (dataset = classification_mgmt_data_profile 
| filter name = "PCI" 
| fields id, name) as cm cm.id = int_data_profile_id) as da da.asset_id = xdm.asset.id 
| join type = inner (dataset = issue_to_asset 
| join type = left (dataset = issues 
| fields xdm.issue.id as issue_id, xdm.issue.domain, xdm.issue.status.progress as progress, xdm.issue.is_excluded as is_excluded 
| filter xdm.issue.domain = "POSTURE" and is_excluded != true and progress != "RESOLVED") as is is.issue_id = xdm.issue.id) as iss iss.xdm.asset.id = xdm.asset.id 
| dedup asset_id 
| fields xdm.asset.id, xdm.asset.type.name, xdm.asset.name
```

8\. All assets with a tag of key X and value Y

```
dataset = asset_inventory
| filter xdm.asset.type.class = "Data"
| fields xdm.asset.tags, xdm.asset.id, xdm.asset.type.id
| alter tag1 = xdm.asset.tags -> ["Dont-delete"], tag2 = xdm.asset.tags -> ["SensitiveBucket"]
| filter tag1 = "forever" and tag2 = "True
```

## How to onboard Databricks

How to get started with the third-party Databricks data source.

### Overview

You can add the Databricks platform as a third-party data source in Cortex Cloud Data Security.

**Prerequisites:**

-   In order to use Databricks, you must be registered.
    
-   Make sure you have the following account permissions to onboard:
    
    -   `Account Admin`: For information about this role, see Predefined user roles.
        
    -   `Metastore Admin`: Databricks admin that can only be assigned by an `Account Admin`. Databricks recommends assigning this role to a group rather than an individual user in order to facilitate management and ensure continuity in case an individual leaves the organization.
        
    
-   Make sure you have the following ID numbers at hand:
    
    -   **Account ID:** Refers to the unique identifier of the user account.
        
        How to find the Account ID
        
        1.  Log in to the account console.
            
        2.  In the account console, your user name should appear in the upper right corner of the page.
            
        3.  Click the icon of your user name.
            
        4.  Your account ID appears in the list.
            
        
    -   **Application ID:** Refers to the unique identifier for a service principal in Databricks.
        
        How to find the Application ID
        
        1.  Log in to the account console.
            
        2.  Click User Management and navigate to the Service Principals tab.
            
        3.  Click the name of the service principal for which you need the Application ID. The service principal must also be the account admin.
            
        4.  On the service principal settings page, navigate to the Configuration tab.
            
        5.  The Application ID appears in the list.
            
        
    

### Add the Databricks data source

To add the Databricks platform as a data source, you need to add configuration details, establish a connection, and then verify the connection.

Add configuration details

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Databricks, then hover over it and click Add.
    
4.  On the Databricks integration instance settings page, for the Configuration step do the following:
    
    1.  Enter the display name for your Databricks integration instance.
        
    2.  Enter your Databricks Account ID.
        
    3.  Enter your Application ID.
        
    4.  Select a cloud platform.
        
    5.  (Optional) Turn on the toggle for My Databricks account protected by network policies and select a region.
        
        **Note:**
        
        If you turn on this feature, both the cloud and region will be used for scanning, possibly incurring cost and requiring adherence to certain compliance policies.
        
    6.  Click Next.
        
    
5.  Click Next.
    

Establish a connection

1.  For the Establish Connection step, you are now instructed to open your Databricks console in a new browser tab.
    
2.  On the Establish Connection tab, click the arrow to open the Generated script code block. Do one or both of the following:
    
    -   Click the cloud icon to download the .sh script file.
        
    -   Click the copy icon to copy the script to your clipboard.
        
    
3.  Run the script in your Databricks CLI.
    
4.  Click Verify Connection.
    

Verify the connection

1.  For the Verify Connection step, if the connection is verified, a confirmation message is displayed.
    
2.  Click Close.
    

Databricks now appears in the list of data sources on the Data Sources & Integrations page.

### Verify the Cortex Gateway connection

At the end of the onboarding process, a pending request for Databricks approval is automatically created and displayed on the Cortex Gateway screen. In order to complete the onboarding process, approve the pending request. If you do not have permissions, contact your Cortex Cloud administrator.

For more information, see Egress configurations.Egress configurations

## How to onboard Microsoft 365

How to get started with the Microsoft 365 data source.

### Overview

You can add Microsoft 365 as a third-party data source in Cortex Cloud Data Security.

**Danger:**

-   You have generated a Globally Unique Identifier (GUID), also known as a Universally Unique Identifier (UUID). You will need this ID for the tenant you want to use for the Microsoft 365 instance.
    
-   In order to use Microsoft 365, you must be registered with Microsoft Azure.
    

### Configuration

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Microsoft 365, then hover over it and click Add.
    
4.  On the Microsoft 365 integration instance settings page, do the following:
    
    1.  In the Display Name field, enter a name for your Microsoft 365 integration instance.
        
    2.  In the Tenant ID field, enter a tenant ID.
        
    3.  In the Region list, select a region.
        
    
5.  Click Next.
    

### Authorization

1.  On the Microsoft 365 integration instance settings page, if you are an administrator, click the click to authorize link.
    
2.  If you do not have administrator permissions, follow the instructions on screen and click Close.
    

The Microsoft 365 integration instance should now appear in the list of data sources on the Data Sources & Integrations page.

## How to onboard on-premise file shares to Cortex Cloud Data Security

Set up Data Security for on-premise file shares using Broker VM.

### Overview of working with on-premise file shares

Cortex Cloud Data Security includes coverage of on-premise infrastructures, enabling deep data classification of SMB and NFS file shares. This allows the discovery of content stored in on-premise file shares, classification of that content to identify sensitive data, and locating any shadow backups present on-premise. This overall capability provides continuous visibility and governance of sensitive data, establishing a unified security framework across hybrid cloud and legacy environments.

To extend the capabilities of Cortex Cloud Data Security to your on-premise infrastructure, you use the Broker VM and a specialized application called an applet. The Broker VM is a virtual machine deployed within your local network that acts as a secure, local collector and gateway. It is essential for unifying and packaging data from your on-premise resources before sending them to Cortex Cloud Data Security.

**Note:**

Your data is scanned on the Broker VM itself, and only the metadata and classification results are transmitted from the on-premise environment to Cortex Cloud.

The DSPM Fileshare applet is an application installed directly onto the Broker VM. Its sole purpose is to establish connections with your on-premise network file shares, including those using the SMB (Server Message Block) and NFS (Network File Sharing) protocols.

Once configured, this applet continuously:

-   Accesses the designated file share paths.
    
-   Ingests the file and folder metadata.
    
-   Classifies files and identifies sensitive information.
    
-   Transmits the collected metadata and results securely through the Broker VM to Cortex Cloud.
    

**Note:**

For information about activating the DSPM Fileshare applet, see Activate DSPM Fileshare.

## How to onboard Snowflake

How to get started with the third-party Snowflake data source.

### Overview

Integrate Cortex Cloud Data Security with your Snowflake account to gain comprehensive visibility into any data and posture risk existing in your Snowflake environment. This integration enables automated scanning of all assets in Snowflake, including data classification and risk assessment.

You can add Snowflake as a third-party data source in Cortex Cloud Data Security .

**Prerequisite:**

-   In order to use Snowflake, you must be registered with one of these cloud providers: Amazon AWS, Microsoft Azure, or Google Cloud Platform (GCP).
    
-   Ensure you have the necessary account permissions to onboard. It is recommended to use `Account Admin` as the role for the onboarding.
    

### Configuration Step

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Snowflake, then hover over it and click Add.
    
4.  On the New Data Source Snowflake integration instance settings page, do the following:
    
    1.  Enter a display name for your Snowflake integration instance.
        
    2.  Enter a Data Sharing Account Identifier.
        
        **Note:**
        
        The account identifier can be found using the user information at the bottom left. Hover over the account you wish to onboard and select the copy option at the top right. The account identifier is usually of the format: 
        
        (organization).[account]
        
    3.  (Optional) If you have a Snowflake account that is protected by a network policy, turn on the My Snowflake account is protected by network policies toggle button. The network policies are related to the IP allow list.
        
    4.  Select a cloud platform and choose a region.
        
    5.  (Optional) If you want to use an existing user:
        
        1.  Click Show advance settings and then turn on the Use an existing user toggle button.
            
        2.  Enter the user name and the login name.
            
        
    
5.  Click Next.
    

### Establish Connection Step

1.  Open your Snowflake console in a new tab.  
    
2.  Using the copy or download icons, copy or download the script in the Generated script text box and paste it into a new worksheet in Snowflake.
    
3.  Select the entire script and select Run all.
    
4.  Once the script runs without errors, come back to the Snowflake screen and click Verify Connection to check if the instance is detected.
    

### Verify Connection Step

1.  A success or failure message appears on the screen.
    
2.  If a success message appears, you can do the following: 
    
    -   View the instance's information in the Snowflake Posture instances.
        
    -   View the assets in Asset Inventory, once the first scan is complete.
        
    

### Delete a Snowflake instance

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, select the Snowflake integration or filter to search for it and then select it.
    
3.  On the Snowflake page, right click the row of the integration instance you want to delete.
    
4.  From the drop down menu, select Settings and from the integration instance settings page select the Delete checkbox and then click Delete.
    
    The Snowflake instance is now removed, including all previous scans.

## How to use information protection labels in Cortex Cloud Data Security

Working with information protection labels in Cortex Cloud Data Security.

### Overview

Information protection labels are digital tags that help your organization classify and secure sensitive data. They identify how sensitive a piece of information is—whether it's a document or an email. Once applied, these labels can automatically trigger protective measures like encryption to control who can access the file, or restrictions on who can edit or share it.

Ultimately, these labels are vital for enforcing your data policies and significantly cutting down the risk of data breaches. They ensure sensitive information is managed correctly throughout its entire journey, from when it's created to when it's no longer needed.

Each sensitivity label within your organization is assigned a unique GUID. This ensures consistent policy enforcement regardless of where the data resides or moves.

Once you have integrated Microsoft 365 with Cortex Cloud Data Security, after scanning you will be able to identify the files having information protection labels and view the specific GUIDs for each one.

For information about integrating Microsoft 365 (Posture), see How to onboard Microsoft 365.

### How Cortex Cloud Data Security locates information protection labels

The Cortex Cloud Data Security scanner runs on your files and extracts the information protection labels from them during the classification process. This extraction is supported across all platforms and asset types, both file-based and unstructured.

### Label translation

To enable the translation of Microsoft IDs to label names, connect to the Microsoft 365 integration.

#### Example

| GUID | Translated Label |
| --- | --- |
| 6b29fc40-ca47-1067-b31d-00dd010662da | Sensitive-Internal |

### Find the labels in Cortex Cloud Security Command Center

1.  In the navigation pane on the left, click Modules → Data Security.
    
2.  Under Objects Inventory, click Files.
    
3.  On the Files Inventory screen, click Show filter panel to open the filter panel and then do the following:
    
    1.  In the Select field list, select Has Information Protection Labels.
        
    2.  In the next list to the right, select the equals sign (\=).
        
    3.  In the next field to the right, select Yes.
        
    4.  Click anywhere in the screen outside the filter panel area.
        
        Now only files with information protection labels are displayed. In the Information Protection Labels column, the IDs for these labels appear.
        
        **Note:**
        
        Only If you have connected a Microsoft 365 instance to Cortex Cloud, the information protection labels appear. See How to onboard Microsoft 365.
