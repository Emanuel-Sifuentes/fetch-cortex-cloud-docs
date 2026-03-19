# Cortex Cloud Data Sources

## What are Cortex Cloud data sources?

Learn more about Cortex Cloud Data Sources and a unified approach to integrations.

Data sources are the foundational mechanisms used to ingest security and operational data, including logs, events, and asset metadata, into Cortex Cloud for analysis, correlation, and response. By consolidating data from diverse origins like endpoints, network devices, cloud environments, and third-party security tools, Cortex Cloud constructs a comprehensive and contextualized security story.

Clarifying terminology: Data sources vs. data collectors

Configuring ingestion components in the Cortex Cloud user interface (UI) currently involves navigating multiple areas and different terminologies:

-   The broad, overarching concept is the data source, representing any integration that provides data to Cortex Cloud.
    
-   Built-in tools primarily focused on raw log ingestion are often referred to in the UI as data collectors. This includes generic logs that can be ingested, such as by the XDR Collectors and core ingestion functionalities found using the Data Source Onboarder.
    
-   The Broker VM applets are specialized applications running on the Broker VM that function as collectors, such as the Syslog Collector.
    
-   Marketplace content packs that include collection integrations are also referred to as data sources, as content packs that fetch data are configured through the Data Source Onboarder on the Data Sources & Integrations page.
    

In this documentation, data source is used as the general category for all ingestion methods, but specific components like data collectors and Broker VM applets are named explicitly when discussing their configuration.

Why are different data sources necessary?

Cortex Cloud enables you to collect data across a vast and varied enterprise landscape. This necessitates distinct data source types designed for different environments and needs:

-   **Standard data collectors (API/Built-in)**: These are built-in functionalities primarily focused on ingesting raw logs and security events for core security analysis, parsing, and normalization. They often involve direct API connections, such as Okta and CrowdStrike, or file collection tools, such as Amazon S3.
    
-   **Broker VM data collector applets**: These are modular applications installed on a local Broker VM virtual appliance, designed for on-premise data collection needs like the Syslog Collector or Database Collector.
    
-   **XDR Collectors (XDRC)**: These are lightweight agents dedicated to on-premise log collection on Windows and Linux host machines, typically gathering logs and events using tools such as Filebeat or Winlogbeat.
    
-   **Cloud Service Provider (CSP) Onboarding**: These are specialized wizards for integrating cloud environments, including AWS, Azure, GCP, and OCI, enabling streamlined setup for asset discovery, posture/runtime security, and log collection.
    
-   **Marketplace content packs**: These packages offer specialized security functionality by bundling both a collection integration (for data ingestion) and automation components, such as playbooks and correlation rules. Note that not all data collectors have a corresponding Marketplace content pack.
    
-   **Cloud Posture and Runtime Security data sources**: These data sources provide agentless visibility and real-time control over cloud risks by using cloud-native APIs to monitor misconfigurations, scan container registries, and secure serverless functions or sensitive data across multi-cloud environments.
    

Current UI and future direction

The existence of diverse collector types currently necessitates multiple points of configuration within the Cortex Cloud UI as explained in the table below.

**Important:**

We are actively working to evolve the UI to create a single, unified point of configuration for all data ingestion and integration points. This documentation is structured to help you navigate the current segmented process until that UI update is available.

| Data Source Type | Primary UI Location(s) for Configuration |
| --- | --- |
| CSP onboarding and standard collectors | Data Sources & Integrations page (Settings → Data Sources & Integrations → \+ Add New) |
| Broker VM applets | Broker VMs page (Settings → Configurations → Data Broker → Broker VMs) |
| XDR Collectors | XDR Collectors page (Settings → Configurations → XDR Collectors) |
| Marketplace content packs | Data Sources & Integrations page ((Settings → Data Sources & Integrations via Data Source Onboarder, for packs with data ingestion or after a Marketplace install) \*\*Note:\*\* Some content packs provide parsing rules and data model rules for data sources ingested using a Syslog Collector applet of the Broker VM or for standard data sources, and won't be listed in the Data Sources & Integrations page. |
| Cloud Posture and Runtime Security data sources | Data Sources & Integrations page (Settings → Data Sources & Integrations → \+ Add New); Broker VMs page (Settings → Configurations → Data Broker → Broker VMs) |

## Complete data source catalog

Learn more about the complete data source catalog available in Cortex Cloud.

The complete data source catalog is a conceptual grouping that is comprised of all configuration points available for data ingestion across Cortex Cloud. It represents the aggregate of every integration method—from vendor-specific connectors, cloud onboarding wizards,, cloud onboarding wizards, and generic on-premise collectors to Palo Alto Networks integrations and specialized Marketplace integrations.

The catalog is best understood by categorizing data sources into the following core groups, which are managed across various pages in the Cortex Cloud user interface (UI):

Data source categories

-   **Vendor-specific data sources**: Integrations for specific third-party security and IT products, such as Okta and Box. These include standard data collectors configured on the Data Sources & Integrations page.
    
-   **Cloud Service Provider (CSP) onboarding**: Streamlined wizards designed for full integration with cloud environments, including AWS, Azure, GCP, and OCI, to collect assets, posture data, and logs. Configured on the Data Sources & Integrations page.
    
-   **Generic on-premise data collectors**: Flexible collectors for logs and data from local environments not tied to a specific vendor, including:
    
    -   Broker VM applets, such as Syslog Collector and Database Collector, configured using the Broker VMs page.
        
    -   XDR Collectors (XDRC) for on-host log collection, configured on the XDR Collectors page.
        
    
-   **Palo Alto Networks integrations**: Integrations with other Palo Alto Networks products, such as Next-Generation Firewall and Prisma Access, configured on the Data Sources & Integrations page.
    
-   **Marketplace content packs**: Packages that offer rich security content, often including a collection integration for data ingestion alongside automation components. These are installed from Settings → Configurations → Marketplace and configured using the Data Source Onboarder on the Data Sources & Integrations page.
    
-   **Cloud Posture and Runtime Security data sources**: These data sources provide agentless visibility and real-time control over cloud risks by using cloud-native APIs to monitor misconfigurations, scan container registries, and secure serverless functions or sensitive data across multi-cloud environments. These data sources are configured:
    
    -   Using Broker VM applets, such as Syslog Collector and Database Collector, configured using the Broker VMs page.
        
    -   On the Data Sources & Integrations page.
        
    

By consulting the specific documentation sections dedicated to each category as detailed below, you gain a complete overview of all available ingestion options that collectively form the data source catalog.

## Vendor-specific data sources

Learn more about the third-party vendor data sources available in Cortex Cloud.

Cortex Cloud enables you to ingest data from a wide range of third-party vendors and security services. For many popular vendors, we offer a choice between distinct types of data sources to fit your needs:

-   Standard data sources (also called data collectors)
    
-   Cloud Service Provider (CSP) onboarding data sources
    
-   Content pack integrations
    

| Data Source Type | Primary Use | Configuration Method | Cortex Cloud Features | Recommendation |
| --- | --- | --- | --- | --- |
| Standard data source (also called data collectors) | Ingesting raw logs and events. | Configured in the Data Sources & Integrations page using the Data Source Onboarder. | Limited to data ingestion, parsing, and normalization. | Choose this if you only need raw data ingestion. |
| Cloud Service Provider (CSP) onboarding data source | Ingest cloud assets | Configured in the Data Sources & Integrations page using the cloud service provider (CSP) onboarding wizard. | Designed to facilitate the seamless setup of CSP data into Cortex Cloud. Requires minimal user input; simply define the scope of your CSP accounts and specify the scan mode. For full control of the CSP setup, you can use the advanced settings. Based on the onboarding settings, Cortex Cloud generates an authentication template to establish trust to the CSP and grant permissions to Cortex Cloud. |  |
| Content pack integration | Ingesting data and enabling rich security functionality. | Configured via a content pack downloaded from Marketplace by either: Using the Data Source Onboarder on the Data Sources & Integrations page (if available); Installing the content pack from Settings → Configurations → Marketplace, and then configuring the integration instance on the Data Sources & Integrations page. | Includes: Data ingestion, parsing, normalization, plus built-in commands and automations, such as playbooks, scripts, correlation rules, and data model rules. | Choose this option for any of the following reasons: You need to define automations.; You need to collect data that is not covered by a standard collector.; You need to install rules or automations relevant to integrations or data sources. |

**Important:**

In some cases, the same vendor is available through one or more of these options: standard data source, CSP onboarding data source, or content pack integration. Check the available descriptions for each data source in both the user interface and documentation to decide which option is more suitable for your needs.

List of vendor-specific data sources

Below is a list of all the standard collector data sources available in Cortex Cloud by vendor, presented in alphabetical order. Some of these data sources are also available as a content pack integration or CSP onboarding data source, which is noted in brackets so you know which section of the documentation to reference for configuration details.

Keep in mind the following:

-   To ensure you have a single, unified reference point, this alphabetical list includes other vendors whose data collection is handled by different data source groups, such as the Broker VM or CSP Onboarding.
    
-   This list doesn't include all of the content pack integrations, only the ones that are shared with a standard data source, so you can understand the difference between each one when searching for a data source, and multiple results are displayed for the same vendor. For a complete list of all available Marketplace content packs and integrations, including those vendors only supported by a content pack, see the list directly in the [Cortex Developer Docs for Marketplace](https://cortex.marketplace.pan.dev/marketplace/). This site provides instructions for these integrations by selecting the <content pack> → Content → Integrations, and, depending on the integration, choosing the relevant integration steps you're looking to implement. You can always install and integrate content pack integrations in Cortex Cloud from Marketplace or the Data Sources & Integrations page, if the content pack is available from this page.
    

For each third-party vendor link in this list:

-   A brief explanation of the standard collector.
    
-   A link to the standard collector instructions.
    
-   If a content pack integration instance is also available, a link to the Marketplace details is provided.
    
-   If a CPS Onboarding data source is also available, a link to these instructions is provided.
    

### Third-Party vendor list

The following third-party vendors are available, which represent one of the five core categories that collectively form the complete data source catalog:

-   Amazon S3
    
-   Amazon Web Services (using CSP onboarding data source)
    
-   API Security
    
    -   AWS API Gateway
        
    -   Azure APIM
        
    -   F5
        
    -   GCP Apigee Proxy
        
    -   Kong
        
    
-   Azure Event Hub
    
-   Azure Network WatcherAzure Network Watcher
    
-   BeyondTrust Privilege Management Cloud
    
-   Box
    
-   Check Point FW1/VPN1 (using Syslog Collector applet)
    
-   Cisco ASA firewalls and AnyConnect (using Syslog Collector applet)
    
-   Corelight Zeek (using Syslog Collector applet)
    
-   Databricks (using Cloud Posture and Runtime Security data source)
    
-   Dropbox
    
-   Elasticsearch Filebeat
    
-   Forcepoint DLP (using Syslog Collector applet)
    
-   Fortinet Fortigate (using Syslog Collector applet)
    
-   Google Cloud Platform
    
-   Google Kubernetes Engine
    
-   Google Workspace
    
-   HTTP log collector
    
-   Kubernetes (using Onboard Kubernetes wizard)
    
-   Microsoft Azure (using CSP onboarding data source)
    
-   Microsoft Office 365
    
-   Microsoft 365 (Posture) (using Cloud Posture and Runtime Security data source)
    
-   Okta
    
-   OneLogin
    
-   Oracle Cloud Infrastructure (using CSP onboarding data source)
    
-   PingFederate (using Syslog Collector applet)
    
-   PingOne
    
-   Snowflake (using Cloud Posture and Runtime Security data source)
    
-   Windows DHCP via Elasticsearch Filebeat
    
-   Workday
    
-   Zscaler Internet Access (ZIA) (using Syslog Collector applet)
    
-   Zscaler Private Access (ZPA) (using Syslog Collector applet)

### Amazon S3

Learn more about the Amazon S3 standard data source and content pack integrations in Cortex Cloud.

You can configure collecting Amazon S3 logs using a standard data source or with a content pack integration:

| Amazon S3 vendor | Description |
| --- | --- |
| Standard data source overview | Forward different types of logs to Cortex Cloud from Amazon Simple Storage Service (Amazon S3) using the Amazon S3 data source. |
| Links to standard data source instructions | The following types of logs can be ingested from Amazon S3: **Audit logs**: See Ingest audit logs from AWS Cloud Trail; **Flow logs**: See Ingest network flow logs from Amazon S3; **Generic logs**: See Ingest generic logs from Amazon S3- **BeyondTust Privilege Management Cloud logs**: See BeyondTrust Privilege Management Cloud ; **Route 53 logs**: See Ingest network Route 53 logs from Amazon S3 Configuring these types of Amazon S3 logs can include following these instructions: Create an assumed role; Configure data collection from Amazon S3 manually |
| Links to content pack/integration details | The [AWS - S3](https://cortex.marketplace.pan.dev/marketplace/details/AWSS3) content pack provides integration with the Amazon Web Services Simple Storage Service (S3) for management, security controls, and visibility of stored objects. It includes the following integration:- [AWS - S3](https://xsoar.pan.dev/docs/reference/integrations/aws---s3): Use this integration to manage Amazon Web Services Simple Storage Service (S3) objects and security configurations, including listing contents, setting encryption, and blocking public access. Commands are included for fetching bucket encryption status (**`aws-s3-get-bucket-encryption`**), controlling public access settings (**`aws-s3-put-public-access-block`**, **`aws-s3-get-public-access-block`**), and listing objects within a bucket, with support for pagination, delimiters, and prefixes (**`aws-s3-list-objects`**), alongside core support for authentication using AWS STS session tokens. ; The [AWS - Route53](https://cortex.marketplace.pan.dev/marketplace/details/AWSRoute53) content pack provides an interface to manage the Amazon Web Services managed Cloud DNS service. It includes the following integration:- [AWS - Route53](https://xsoar.pan.dev/docs/reference/integrations/aws---route53): Use this integration to manage the Amazon Web Services managed Cloud DNS service. Commands included allow users to list resource record sets, address issues such as when a set is missing its TTL value, and manage configurations related to AWS authentication like STS endpoint resolution logic. ; The [AWS - CloudTrail](https://cortex.marketplace.pan.dev/marketplace/details/AWSCloudTrail) content pack provides functionality for interacting with an AWS CloudTrail trail via automation and includes rules for parsing and modeling ingested audit logs. It also includes the following integration:- [AWS - CloudTrail](https://xsoar.pan.dev/docs/reference/integrations/aws---cloud-trail): Use this integration to interact with a CloudTrail trail on AWS via playbooks and the Playground. It includes commands that enable retrieving information about the trail status using **`aws-cloudtrail-get-trail-status`**, and manage authentication configurations like specifying the AWS STS endpoint resolution logic. |

#### Ingest audit logs from AWS Cloud Trail

Take advantage of Cortex Cloud investigation capabilities and set up audit log ingestion for your AWS CloudTrail logs.

You can forward audit logs for the relative service to Cortex Cloud from AWS CloudTrail.

To receive audit logs from Amazon Simple Storage Service (Amazon S3) via AWS CloudTrail, you must first configure data collection from Amazon S3. You can then configure the Data Sources & Integrations settings in Cortex Cloud for Amazon S3. After you set up collection integration, Cortex Cloud begins receiving new logs and data from the source.

We do not recommend ingestion of data from an AWS commercial environment into a FedRAMP-certified Cortex Cloud tenant. However, if you must do so, contact Customer Support for assistance.

**Note:**

For more information on configuring data collection from Amazon S3 using AWS CloudTrail, see the [AWS CloudTrail Documentation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-a-trail-using-the-console-first-time.html).

When Cortex Cloud begins receiving logs, the app automatically creates an Amazon S3 Cortex Query Language (XQL) dataset (`aws_s3_raw`). This enables you to search the logs with XQL Search using the dataset. For example queries, refer to the in-app XQL Library.

For enhanced cloud protection, you can also configure Cortex Cloud to stitch Amazon S3 audit logs with other Cortex Cloud authentication stories across all cloud providers using the same format, which you can query with XQL Search using the `cloud_audit_logs` dataset. Cortex Cloud can also generate Cortex Cloud issues (Analytics, IOC, BIOC, and Correlation Rules), when relevant, from Amazon S3 logs. While Correlation Rules issues are generated on non-normalized and normalized logs, Analytics, IOC, and BIOC issues are only generated on normalized logs.

Enhanced cloud protection provides the following:

-   Normalization of cloud logs
    
-   Cloud logs stitching
    
-   Enrichment with cloud data
    
-   Detection based on cloud analytics
    
-   Cloud-tailored investigations
    

**Prerequisite Steps**

Be sure you do the following tasks before you begin configuring data collection from Amazon S3 via AWS CloudTrail.

-   Ensure that you have the proper permissions to access AWS CloudTrail and have the necessary permissions to create audit logs. The following permissions in AWS are the minimum requirements for an Amazon S3 bucket and Amazon Simple Queue Service (SQS).
    
    -   **Amazon S3 bucket**: `GetObject`
        
    -   **SQS**: `ChangeMessageVisibility`, `ReceiveMessage`, and `DeleteMessage`.
        
    
-   Determine how you want to provide access to Cortex Cloud to your logs and to perform API operations. You have the following options:
    
    -   Designate an AWS IAM user, where you will need to know the Account ID for the user and have the relevant permissions to create an access key/id for the relevant IAM user. This is the default option as explained in Configure the Amazon S3 collection by selecting Access Key.
        
    -   Create an assumed role in AWS to delegate permissions to a Cortex Cloud AWS service. This role grants Cortex Cloud access to your flow logs. For more information, see [Creating a role to delegate permissions to an AWS service](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html). This is the Assumed Role option described in the Amazon S3 collection configuration.
        
    
    To collect Amazon S3 logs that use server-side encryption (SSE), the user role must have an IAM policy that states that Cortex Cloud has kms:Decrypt permissions. With this permission, Amazon S3 automatically detects if a bucket is encrypted and decrypts it. If you want to collect encrypted logs from different accounts, you must have the decrypt permissions for the user role also in the key policy for the master account Key Management Service (KMS). For more information, see [Allowing users in other accounts to use a KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html).
    

To configure Cortex Cloud to receive audit logs from Amazon S3 via AWS Cloudtrail:

1.  Log in to the [AWS Management Console](https://console.aws.amazon.com/).
    
2.  From the menu bar, ensure that you have selected the correct region for your configuration.
    
3.  Configure an AWS CloudTrail trail with audit logs.
    
    **Note:**
    
    -   For more information on creating an AWS CloudTrail trail, see [Create a trail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-a-trail-using-the-console-first-time.html).
        
    -   If you already have an Amazon S3 bucket configured with AWS CloudTrail audit logs, skip this step and go to Configure an Amazon Simple Queue Service (SQS).
        
    
    1.  Open the [CloudTrail Console](https://console.aws.amazon.com/cloudtrail/), and click Create trail.
        
    2.  Configure the following settings for your CloudTrail trail, where the default settings should be configured unless otherwise indicated.
        
        -   Trail name: Specify a descriptive name for your CloudTrail trail.
            
        -   Storage location: Select Create new S3 bucket to configure a new Amazon S3 bucket, and specify a unique name in the Trail log bucket and folder field, or select Use existing S3 bucket and Browse to the S3 bucket you already created. If you select an existing Amazon S3 bucket, the bucket policy must grant CloudTrail permission to write to it. For information about manually editing the bucket policy, see [Amazon S3 Bucket Policy for CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/create-s3-bucket-policy-for-cloudtrail.html).
            
            **Note:**
            
            It is your organization's responsibility to define a retention policy for your Amazon S3 bucket by creating a Lifecycle rule in the Management tab. We recommend setting the retention policy to at least 7 days to ensure that the data is retrieved under all circumstances.
            
        -   Customer managed AWS KMS key: You can either select a New key and specify the AWS KMS alias, or select an Existing key, and select the AWS KMS alias. The KMS key and S3 bucket must be in the same region.
            
        -   SNS notification delivery: (Optional) If you want to be notified whenever CloudTrail publishes a new log to your Amazon S3 bucket, click Enabled. Amazon Simple Notification Service (Amazon SNS) manages these notifications, which are sent for every log file delivery to your S3 bucket, as opposed to every event. When you enable this option, you can either Create a new SNS topic by selecting New and the SNS topic is displayed in the field, or use an Existing topic and select the SNS topic. For more information, see [Configure SNS Notifications for CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/configure-sns-notifications-for-cloudtrail.html).
            
        
        **Note:**
        
        The CloudWatch Logs - optional settings are not supported and should be left disabled.
        
    3.  Click Next, and configure the following Choose log events settings.
        
        -   Event type: Leave the default Management events checkbox selected to capture audit logs. Depending on your system requirements, you can also select Data events to log the resource operations performed on or within a resource, or Insights events to identify unusual activity, errors, or user behavior in your account. Based on your selection, additional fields are displayed on the screen to configure under section headings with the same name as the event type.
            
        -   Management events section: Configure the following settings.
            
            \-API activity: For Management events, select the API activities you want to log. By default, the Read and Write activities are logged.
            
            \-Exclude AWS KMS events: (Optional) If you want to filter AWS Key Management Service (AWS KMS) events out of your trail, select the checkbox. By default, all AWS KMS events are included.
            
        -   Data events section: (Optional) This section is displayed when you configure the Event type to include Data events, which relate to resource operations performed on or within a resource, such as reading and writing to a S3 bucket. For more information on configuring these optional settings in AWS CloudTrail, see [Creating a trail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-a-trail-using-the-console-first-time.html).
            
        -   Insights events section: (Optional) This section is displayed when you configure the Event type to include Insight events, which relate to unusual activities, errors, or user behavior on your account. For more information on configuring these optional settings in AWS CloudTrail, see [Creating a trail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-a-trail-using-the-console-first-time.html).
            
        
    4.  Click Next.
        
    5.  In the Review and create page, look over the trail configurations settings that you have configured and if they are correct, click Create trail. If you need to make a change, click Edit beside the particular step that you want to update.
        
        The new trail is listed in the Trails page, which lists the trails in your account from all Regions. It can take up to 15 minutes for CloudTrail to begin publishing log files. You can see the log files in the S3 bucket that you specified. For more information, see [Creating a trail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-a-trail-using-the-console-first-time.html).
        
4.  Configure an Amazon Simple Queue Service (SQS).
    
    **Note:**
    
    Ensure that you create your Amazon S3 bucket and Amazon SQS queue in the same region.
    
    1.  In the [Amazon SQS Console](https://console.aws.amazon.com/sqs/), click Create Queue.
        
    2.  Configure the following settings, where the default settings should be configured unless otherwise indicated.
        
        -   Type: Select Standard queue (default).
            
        -   Name: Specify a descriptive name for your SQS queue.
            
        -   Configuration section: Leave the default settings for the various fields.
            
        -   Access policy → Choose method: Select Advanced and update the Access policy code in the editor window to enable your Amazon S3 bucket to publish event notification messages to your SQS queue. Use this sample code as a guide for defining the `“Statement”` with the following definitions:
            
            \-**`“Resource”`**: Leave the automatically generated ARN for the SQS queue that is set in the code, which uses the format `“arn:sqs:region:account-id:queue-name”`.
            
            You can retrieve your bucket’s ARN by opening the [Amazon S3 Console](https://console.aws.amazon.com/s3/) in a browser window. In the Buckets section, select the bucket that you created for collecting the AWS CloudTrail logs, click Copy ARN, and paste the ARN in the field.
            
            
            
            **Note:**
            
            For more information on granting permissions to publish messages to an SQS queue, see [Granting permissions to publish event notification messages to a destination](https://docs.aws.amazon.com/AmazonS3/latest/userguide/grant-destinations-permissions-to-s3.html).
            
            ```
            {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Principal": {
                    "Service": "s3.amazonaws.com"
                  },
                  "Action": "SQS:SendMessage",
                  "Resource": "[Leave automatically generated ARN for the SQS queue defined by AWS]",
                  "Condition": {
                    "ArnLike": {
                      "aws:SourceArn": "[ARN of your Amazon S3 bucket]"
                    }
                  }
                },
              ]
            }
            ```
            
        -   Dead-letter queue section: We recommend that you configure a queue for sending undeliverable messages by selecting Enabled, and then in the Choose queue field selecting the queue to send the messages. You may need to create a new queue for this, if you do not already have one set up. For more information, see [Amazon SQS dead-letter queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html).
            
        
    3.  Click Create queue.
        
        Once the SQS is created, a message indicating that the queue was successfully configured is displayed at the top of the page.
        
5.  Configure an event notification to your Amazon SQS whenever a file is written to your Amazon S3 bucket.
    
    1.  Open the [Amazon S3 Console](https://console.aws.amazon.com/s3/) and in the Properties tab of your Amazon S3 bucket, scroll down to the Event notifications section, and click Create event notification.
        
    2.  Configure the following settings.
        
        -   Event name: Specify a descriptive name for your event notification containing up to 255 characters.
            
        -   Prefix: Do not set a prefix as the Amazon S3 bucket is meant to be a dedicated bucket for collecting audit logs.
            
        -   Event types: Select All object create events for the type of event notifications that you want to receive.
            
        -   Destination: Select SQS queue to send notifications to an SQS queue to be read by a server.
            
        -   Specify SQS queue: You can either select Choose from your SQS queues and then select the SQS queue, or select Enter SQS queue ARN and specify the ARN in the SQS queue field.
            
            You can retrieve your SQS queue ARN by opening another instance of the AWS Management Console in a browser window, and opening the [Amazon SQS Console](https://console.aws.amazon.com/sqs/), and selecting the Amazon SQS that you created. In the Details section, under ARN, click the copy icon ()), and paste the ARN in the field.
            
            
            
        
    3.  Click Save changes.
        
        Once the event notification is created, a message indicating that the event notification was successfully created is displayed at the top of the page.
        
        **Note:**
        
        If your receive an error when trying to save your changes, you should ensure that the permissions are set up correctly.
        
6.  Configure access keys for the AWS IAM user that Cortex Cloud uses for API operations.
    
    **Note:**
    
    -   It your organization's responsibility to ensure that the user who performs this task of creating the access key is designated with the relevant permissions. Otherwise, this can cause the process to fail with errors.
        
    -   Skip this step if you are using an Assumed Role for Cortex Cloud.
        
    
    1.  Open the [AWS IAM Console](https://console.aws.amazon.com/iam/), and in the navigation pane, select Access management → Users.
        
    2.  Select the User name of the AWS IAM user.
        
    3.  Select the Security credentials tab, scroll down to the Access keys section, and click Create access key.
        
    4.  Click the copy icon next to the Access key ID and Secret access key keys, where you must click Show secret access key to see the secret key and record them somewhere safe before closing the window. You will need to provide these keys when you edit the Access policy of the SQS queue and when setting the AWS Client ID and AWS Client Secret in Cortex Cloud. If you forget to record the keys and close the window, you will need to generate new keys and repeat this process.
        
        **Note:**
        
        For more information, see [Managing access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).
        
7.  Update the Access policy of your Amazon SQS queue.
    
    **Note:**
    
    Skip this step if you are using an Assumed Role for Cortex Cloud.
    
    1.  In the [Amazon SQS Console](https://console.aws.amazon.com/sqs/), select the SQS queue that you created in Configure an Amazon Simple Queue Service (SQS).
        
    2.  Select the Access policy tab, and Edit the Access policy code in the editor window to enable the IAM user to perform operations on the Amazon SQS with permissions to `SQS:ChangeMessageVisibility`, `SQS:DeleteMessage`, and `SQS:ReceiveMessage`. Use this sample code as a guide for defining the `“Sid”: “__receiver_statement”` with the following definitions:
        
        -   **`“aws:SourceArn”`**: Specify the ARN of the AWS IAM user. You can retrieve the User ARN from the Security credentials tab, which you accessed when configuring access keys for the AWS API user.
            
        -   **`“Resource”`**: Leave the automatically generated ARN for the SQS queue that is set in the code, which uses the format `“arn:sqs:region:account-id:queue-name”`.
            
            **Note:**
            
            For more information on granting permissions to publish messages to an SQS queue, see [Granting permissions to publish event notification messages to a destination](https://docs.aws.amazon.com/AmazonS3/latest/userguide/grant-destinations-permissions-to-s3.html).
            
            ```
            {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Principal": {
                    "Service": "s3.amazonaws.com"
                  },
                  "Action": "SQS:SendMessage",
                  "Resource": "[Leave automatically generated ARN for the SQS queue defined by AWS]",
                  "Condition": {
                    "ArnLike": {
                      "aws:SourceArn": "[ARN of your Amazon S3 bucket]"
                    }
                  }
                },
               {
                  "Sid": "__receiver_statement",
                  "Effect": "Allow",
                  "Principal": {
                    "AWS": "[Add the ARN for the AWS IAM user]"
                  },
                  "Action": [
                    "SQS:ChangeMessageVisibility",
                    "SQS:DeleteMessage",
                    "SQS:ReceiveMessage"
                  ],
                  "Resource": "[Leave automatically generated ARN for the SQS queue defined by AWS]"
                }
              ]
            }
            ```
            
        
8.  Configure the Amazon S3 collection in Cortex Cloud.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  On the Data Sources & Integrations page, click \+ Add New, search for Amazon S3, then hover over it and click Add.
        
    3.  Set these parameters, where the parameters change depending on whether you configured an Access Key or Assumed Role.
        
        -   To provide access to Cortex Cloud to your logs and perform API operations using a designated AWS IAM user, leave the Access Key option selected. Otherwise, select Assumed Role, and ensure that you Create an Assumed Role for Cortex Cloud before continuing with these instructions. In addition, when you create an Assumed Role for Cortex Cloud, ensure that you edit the policy that defines the permissions for the role with the Amazon S3 Bucket ARN and SQS ARN.
            
        -   SQS URL: Specify the SQS URL, which is the ARN of the Amazon SQS that you configured in the AWS Management Console.
            
        -   Name: Specify a descriptive name for your log collection configuration.
            
        -   When setting an Access Key, set these parameters.
            
            -   AWS Client ID: Specify the Access key ID, which you received when you configured access keys for the AWS IAM user in AWS.
                
            -   AWS Client Secret: Specify the Secret access key you received when you configured access keys for the AWS IAM user in AWS.
                
            
        -   When setting an Assumed Role, set these parameters.
            
            -   Role ARN: Specify the Role ARN for the Assumed Role you created for in AWS.
                
            -   External Id: Specify the External Id for the Assumed Role you created for in AWS.
                
            
        -   Log Type: Select Audit Logs to configure your log collection to receive audit logs from Amazon S3 via AWS CloudTrail. When configuring audit log collection, the following additional field is displayed for Enhanced Cloud Protection.
            
            You can Normalize and enrich audit logs by selecting the checkbox. If selected, Cortex Cloud stitches Amazon S3 audit logs with other Cortex Cloud authentication stories across all cloud providers using the same format, which you can query with XQL Search using the `cloud_audit_logs` dataset.
            
        
    4.  Click Test to validate access, and then click Enable.
        
        Once events start to come in, a green check mark appears underneath the Amazon S3 configuration with the number of logs received.

#### Ingest network flow logs from Amazon S3

Take advantage of Cortex Cloud investigation capabilities and set up network flow log ingestion for your Amazon S3 logs using an AWS CloudFormation Script.

You can forward network flow logs to Cortex Cloud from Amazon Simple Storage Service (Amazon S3).

To receive network flow logs from Amazon S3, you must first configure data collection from Amazon S3. You can then configure the Data Sources & Integrations settings in Cortex Cloud for Amazon S3. After you set up collection integration, Cortex Cloud begins receiving new logs and data from the source.

You can either configure Amazon S3 with SQS notification manually on your own or use the AWS CloudFormation Script that we have created for you to make the process easier. The instructions below explain how to configure Cortex Cloud to receive network flow logs from Amazon S3 using SQS. To perform these steps manually, see Configure Data Collection from Amazon S3 Manually.

**Note:**

For more information on configuring data collection from Amazon S3, see the Amazon S3 Documentation.

When Cortex Cloud begins receiving logs, the app automatically creates an Amazon S3 Cortex Query Language (XQL) dataset (`aws_s3_raw`). This enables you to search the logs with XQL Search using the dataset. For example, queries refer to the in-app XQL Library. For enhanced cloud protection, you can also configure Cortex Cloud to ingest network flow logs as Cortex Cloud network connection stories, which you can query with XQL Search using the `xdr_data` dataset with the preset called `network_story`. Cortex Cloud can also generate Cortex Cloud issues (Analytics, Correlation Rules, IOC, and BIOC) when relevant from Amazon S3 logs. While Correlation Rules issues are generated on non-normalized and normalized logs, Analytics, IOC, and BIOC issues are only generated on normalized logs.

Enhanced cloud protection provides the following:

-   Normalization of cloud logs
    
-   Cloud logs stitching
    
-   Enrichment with cloud data
    
-   Detection based on cloud analytics
    
-   Cloud-tailored investigations
    

Be sure you do the following tasks before you begin configuring data collection from Amazon S3 using the AWS CloudFormation Script.

-   Ensure that you have the proper permissions to run AWS CloudFormation with the script provided in Cortex Cloud. You need at a minimum the following permissions in AWS for an Amazon S3 bucket and Amazon Simple Queue Service (SQS):
    
    -   **Amazon S3 bucket**: `GetObject`
        
    -   **SQS**: `ChangeMessageVisibility`, `ReceiveMessage`, and `DeleteMessage`.
        
    
-   Ensure that you can access your Amazon Virtual Private Cloud (VPC) and have the necessary permissions to create flow logs.
    
-   Determine how you want to provide access to Cortex Cloud to your logs and perform API operations. You have the following options:
    
    -   Designate an AWS IAM user, where you will need to know the Account ID for the user and have the relevant permissions to create an access key/id for the relevant IAM user. This is the default option as explained in Configure the Amazon S3 Collection in Cortex Cloud by selecting Access Key.
        
    -   Create an assumed role in AWS to delegate permissions to a Cortex Cloud AWS service. This role grants Cortex Cloud access to your flow logs. For more information, see [Creating a role to delegate permissions to an AWS service](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html). This is the Assumed Role option as described in the Configure the Amazon S3 collection in Cortex Cloud. For more information on creating an assumed role for Cortex Cloud, see Create an assumed role.
        
    
    To collect Amazon S3 logs that use server-side encryption (SSE), the user role must have an IAM policy that states that Cortex Cloud has kms:Decrypt permissions. With this permission, Amazon S3 automatically detects if a bucket is encrypted and decrypts it. If you want to collect encrypted logs from different accounts, you must have the decrypt permissions for the user role also in the key policy for the master account Key Management Service (KMS). For more information, see [Allowing users in other accounts to use a KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html).
    

Configure Cortex Cloud to receive network flow logs from Amazon S3 using the CloudFormation Script.

1.  Download the CloudFormation Script in Cortex Cloud.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  On the Data Sources & Integrations page, click \+ Add New, search for Amazon S3, then hover over it and click Add.
        
    3.  To provide access to Cortex Cloud to your logs and to perform API operations using a designated AWS IAM user, leave the Access Key option selected. Otherwise, select Assumed Role, and ensure that you Create an Assumed Role for before continuing with these instructions.
        
    4.  For the Log Type, select Flow Logs to configure your log collection to receive network flow logs from Amazon S3, and the following text is displayed under the field Download CloudFormation Script. See instructions here.
        
    5.  Click the Download CloudFormation Script. link to download the script to your computer.
        
2.  Create a new Stack in the CloudFormation Console with the script you downloaded from Cortex Cloud.
    
    For more information on creating a Stack, see [Creating a stack on the AWS CloudFormation console](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stack.html).
    
    1.  Log in to the [CloudFormation Console](https://console.aws.amazon.com/cloudformation/).
        
    2.  From the CloudFormation → Stacks page, ensure that you have selected the correct region for your configuration.
        
    3.  Select Create Stack → With new resources (standard).
        
    4.  Specify the template that you want AWS CloudFormation to use to create your stack. This template is the script that you downloaded from Cortex Cloud , which will create an Amazon S3 bucket, Amazon Simple Queue Service (SQS) queue, and Queue Policy. Configure the following settings in the Specify template page.
        
        -   Prerequisite - Prepare template → Prepare template: Select Template is ready.
            
        -   Specify Template
            
            -   Template source: Select Upload a template file.
                
            -   Upload a template file: Choose file, and select the `cortex-xdr-create-s3-with-sqs-flow-logs.json` file that you downloaded from Cortex XDR.
                
                
                
            
        
    5.  Click Next.
        
    6.  In the Specify stack details page, configure the following stack details.
        
        -   Stack name: Specify a descriptive name for your stack.
            
        -   Parameters → Cortex XDR Flow Logs Integration
            
            -   Bucket Name: Specify the name of the S3 bucket to create, where you can leave the default populated name as xdr-flow-logs or create a new one. The name must be unique.
                
            -   Publisher Account ID: Specify the AWS IAM user account ID with whom you are sharing access.
                
            -   Queue Name: Specify the name for your Amazon SQS queue to create, where you can leave the default populated name as xdr-flow or create a new one. The name must be unique.
                
                
                
            
        
    7.  Click Next.
        
    8.  In the Configure stack options page, there is nothing to configure, so click Next.
        
    9.  In the Review page, look over the stack configurations settings that you have configured and if they are correct, click Create stack. If you need to make a change, click Edit beside the particular step that you want to update.
        
        The stack is created and is opened with the Events tab displayed. It can take a few minutes for the new Amazon S3 bucket, SQS queue, and Queue Policy to be created. Click Refresh to get updates. Once everything is created, leave the stack opened in the current browser, because you will need to access information in the stack for other steps detailed below.
        
        **Note:**
        
        For the Amazon S3 bucket created using CloudFormation, it is the customer’s responsibility to define a retention policy by creating a Lifecycle rule in the Management tab. We recommend setting the retention policy to at least 7 days to ensure that the data is retrieved under all circumstances.
        
3.  Configure your Amazon Virtual Private Cloud (VPC) with flow logs:
    
    1.  Open the [Amazon VPC Console](https://console.aws.amazon.com/vpc/.), and in the Resources by Region listed, select VPCs to view the VPCs configured for the current region selected. To select another VPC from another region, select See all regions, and select one of them.
        
        **Note:**
        
        To create a new VPC, click Launch VPC Wizard. For more information, see [AWS VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html).
        
    2.  From the list of Your VPCs, select the checkbox beside the VPC that you want to configure to create flow logs, and then select Actions → Create flow log.
        
        
        
    3.  Configure the following Flow log settings:
        
        -   Name - optional: (Optional) Specify a descriptive name for your VPC flow log.
            
        -   Filter: Select All types of traffic to capture.
            
        -   Maximum aggregation interval: If you anticipate a heavy flow of traffic, select 1 minute. Otherwise, leave the default setting as 10 minutes.
            
        -   Destination: Select Send to an Amazon S3 bucket as the destination to publish the flow log data.
            
        -   S3 bucket ARN:Specify the Amazon Resource Name (ARN) for your Amazon S3 bucket.
            
            You can retrieve your bucket’s ARN by opening another instance of the AWS Management Console in a browser window and opening the [Amazon S3 console](https://console.aws.amazon.com/s3/). In the Buckets section, select the bucket that you created for collecting the Amazon S3 flow logs when you created your stack, click Copy ARN, and paste the ARN in this field.
            
            
            
        -   Log record format: Select Custom Format, and in the Log Format field, specify the following fields to include in the flow log record, which you can select from the list displayed:
            
            -   account-id
                
            -   action
                
            -   az-id
                
            -   bytes
                
            -   dstaddr
                
            -   dstport
                
            -   end
                
            -   flow-direction
                
            -   instance-id
                
            -   interface-id
                
            -   packets
                
            -   log-status
                
            -   pkt-srcaddr
                
            -   pkt-dstaddr
                
            -   protocol
                
            -   region
                
            -   srcaddr
                
            -   srcport
                
            -   start
                
            -   sublocation-id
                
            -   sublocation-type
                
            -   subnet-id
                
            -   tcp-flags
                
            -   type
                
            -   vpc-id
                
            -   version
                
            
        
    4.  Click Create flow log.
        
        Once the flow log is created, a message indicating that the flow log was successfully created is displayed at the top of the Your VPCs page.
        
        In addition, if you open your Amazon S3 bucket configurations, by selecting the bucket from the [Amazon S3 console](https://console.aws.amazon.com/s3/), the Objects tab contains a folder called `AWSLogs/` to collect the flow logs.
        
    
4.  Configure access keys for the AWS IAM user that Cortex Cloud uses for API operations.
    
    **Note:**
    
    -   It is the responsibility of the customer’s organization to ensure that the user who performs this task of creating the access key is designated with the relevant permissions. Otherwise, this can cause the process to fail with errors.
        
    -   Skip this step if you are using an Assumed Role for Cortex Cloud.
        
    
    1.  Open the [AWS IAM Console](https://console.aws.amazon.com/iam/), and in the navigation pane, select Access management → Users.
        
    2.  Select the User name of the AWS IAM user.
        
    3.  Select the Security credentials tab, scroll down to the Access keys section, and click Create access key.
        
    4.  Click the copy icon next to the Access key ID and Secret access key keys, where you must click Show secret access key to see the secret key and record them somewhere safe before closing the window. You will need to provide these keys when you edit the Access policy of the SQS queue and when setting the AWS Client ID and AWS Client Secret in Cortex Cloud. If you forget to record the keys and close the window, you will need to generate new keys and repeat this process.
        
    
    **Note:**
    
    For more information, see [Managing access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).
    
5.  When you create an Assumed Role in Cortex Cloud, ensure that you edit the policy that defines the permissions for the role with the S3 Bucket ARN and SQS ARN, which is taken from the Stack you created.
    
    **Note:**
    
    Skip this step if you are using an Access Key to provide access to Cortex Cloud.
    
6.  Configure the Amazon S3 collection in Cortex Cloud.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  Select the Amazon S3 integration and click Add Instance.
        
    3.  Set these parameters, where the parameters change depending on whether you configured an Access Key or Assumed Role.
        
        -   SQS URL: Specify the SQS URL, which is taken from the stack you created. In the browser you left open after creating the stack, open the Outputs tab, copy the Value of the QueueURL and paste it in this field.
            
        -   Name: Specify a descriptive name for your log collection configuration.
            
        -   When setting an Access Key, set these parameters.
            
            -   AWS Client ID: Specify the Access key ID, which you received when you created access keys for the AWS IAM user in AWS.
                
            -   AWS Client Secret: Specify the Secret access key you received when you created access keys for the AWS IAM user in AWS.
                
            
        -   When setting an Assumed Role, set these parameters.
            
            -   Role ARN: Specify the Role ARN for the Assumed Role you created for in AWS.
                
            -   External Id:Specify the External Id for the Assumed Role you created for in AWS.
                
            
        -   Log Type: Select Flow Logs to configure your log collection to receive network flow logs from Amazon S3. When configuring network flow log collection, the following additional field is displayed for Enhanced Cloud Protection.
            
            You can Normalize and enrich flow logs by selecting the checkbox. If selected, Cortex Cloud ingests the network flow logs as XDR network connection stories, which you can query using XQL Search from the `xdr_data` dataset using the preset called `network_story`.
            
        
    4.  Click Test to validate access, and then click Enable.
        
        When events start to come in, a green check mark appears underneath the Amazon S3 configuration with the number of logs received.

#### Ingest generic logs from Amazon S3

Take advantage of Cortex Cloud investigation capabilities and set up generic log ingestion for your Amazon S3 logs.

You can forward generic logs for the relative service to Cortex Cloud from Amazon S3.

To receive generic data from Amazon Simple Storage Service (Amazon S3), you must first configure data collection from Amazon S3. You can then configure the Data Sources & Integrations settings in Cortex Cloud for Amazon S3. After you set up collection integration, Cortex Cloud begins receiving new logs and data from the source.

**Note:**

For more information on configuring data collection from Amazon S3, see the Amazon S3 Documentation.

When Cortex Cloud begins receiving logs, the app automatically creates an Amazon S3 Cortex Query Language (XQL) dataset (`<Vendor>_<Product>_raw`). This enables you to search the logs using XQL Search with the dataset. For example queries, refer to the in-app XQL Library. Cortex Cloud can also generate Cortex Cloud issues (Correlation Rules only), when relevant, from Amazon S3 logs.

**Note:**

You need to set up an Amazon S3 data collector to receive generic logs when collecting logs from BeyondTrust Privilege Management Cloud. For more information, see Ingest logs from BeyondTrust Privilege Management Cloud.

**Prerequisites:**

Perform the following tasks before you begin configuring data collection from Amazon S3:

-   Create a dedicated Amazon S3 bucket, which collects the generic logs that you want capture. For more information, see [Creating a bucket using the Amazon S3 Console](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html).
    
    **Note:**
    
    It is the customer’s responsibility to define a retention policy for your Amazon S3 bucket by creating a Lifecycle rule in the Management tab. We recommend setting the retention policy to at least 7 days to ensure that the data is retrieved under all circumstances.
    
-   The logs collected by your dedicated Amazon S3 bucket must adhere to the following guidelines.
    
    -   Each log file must use the 1 log per line format.
        
        By default, multi-line format is not supported. It can only be used for `raw` format when you specifically configure your environment for that use case.
        
    -   The log format must be compressed as gzip or uncompressed.
        
    -   For best performance, we recommend limiting each file size to up to 50 MB (compressed).
        
    
-   Ensure that you have at a minimum the following permissions in AWS for an Amazon S3 bucket and Amazon Simple Queue Service (SQS).
    
    -   **Amazon S3 bucket**: `GetObject`
        
    -   **SQS**: `ChangeMessageVisibility`, `ReceiveMessage`, and `DeleteMessage`.
        
    
-   Determine how you want to provide access to Cortex Cloud to your logs and perform API operations. You have the following options:
    
    -   Designate an AWS IAM user, where you will need to know the Account ID for the user and have the relevant permissions to create an access key/id for the relevant IAM user.
        
    -   Create an assumed role in AWS to delegate permissions to a Cortex Cloud AWS service. This role grants Cortex Cloud access to your flow logs. For more information, see [Creating a role to delegate permissions to an AWS service](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html). This is the Assumed Role option described in the configure the Amazon S3 collection in Cortex Cloud. For more information on creating an assumed role for Cortex Cloud, see Create an assumed role.
        
    
    To collect Amazon S3 logs that use server-side encryption (SSE), the user role must have an IAM policy that states that Cortex Cloud has kms:Decrypt permissions. With this permission, Amazon S3 automatically detects if a bucket is encrypted and decrypts it. If you want to collect encrypted logs from different accounts, you must have the decrypt permissions for the user role also in the key policy for the master account Key Management Service (KMS). For more information, see [Allowing users in other accounts to use a KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html).
    

Configure Cortex Cloud to receive generic logs from Amazon S3:

1.  Log in to the [AWS Management Console](https://console.aws.amazon.com/).
    
2.  From the menu bar, ensure that you have selected the correct region for your configuration.
    
3.  Configure an Amazon Simple Queue Service (SQS).
    
    **Note:**
    
    Ensure that you create your Amazon S3 bucket and Amazon SQS queue in the same region.
    
    1.  In the [Amazon SQS Console](https://console.aws.amazon.com/sqs/), click Create Queue.
        
    2.  Configure the following settings, where the default settings should be configured unless otherwise indicated.
        
        -   Type: Select Standard queue (default).
            
        -   Name: Specify a descriptive name for your SQS queue.
            
        -   Configuration section: Leave the default settings for the various fields.
            
        -   Access policy → Choose method: Select Advanced and update the Access policy code in the editor window to enable your Amazon S3 bucket to publish event notification messages to your SQS queue. Use this sample code as a guide for defining the `“Statement”` with the following definitions.
            
            \-**`“Resource”`**: Leave the automatically generated ARN for the SQS queue that is set in the code, which uses the format `“arn:sns:Region:account-id:topic-name”`.
            
            You can retrieve your bucket’s ARN by opening the [Amazon S3 Console](https://console.aws.amazon.com/s3/) in a browser window. In the Buckets section, select the bucket that you created for collecting the Amazon S3 flow logs, click Copy ARN, and paste the ARN in the field.
            
            
            
            **Note:**
            
            For more information on granting permissions to publish messages to an SQS queue, see [Granting permissions to publish event notification messages to a destination](https://docs.aws.amazon.com/AmazonS3/latest/userguide/grant-destinations-permissions-to-s3.html).
            
            ```
            {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Principal": {
                    "Service": "s3.amazonaws.com"
                  },
                  "Action": "SQS:SendMessage",
                  "Resource": "[Leave automatically generated ARN for the SQS queue defined by AWS]",
                  "Condition": {
                    "ArnLike": {
                      "aws:SourceArn": "[ARN of your Amazon S3 bucket]"
                    }
                  }
                }
              ]
            }
            ```
            
        -   Dead-letter queue section: We recommend that you configure a queue for sending undeliverable messages by selecting Enabled, and then in the Choose queue field selecting the queue to send the messages. You may need to create a new queue for this, if you do not already have one set up. For more information, see [Amazon SQS dead-letter queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html).
            
        
    3.  Click Create queue.
        
        Once the SQS is created, a message indicating that the queue was successfully configured is displayed at the top of the page.
        
4.  Configure an event notification to your Amazon SQS whenever a file is written to your Amazon S3 bucket.
    
    1.  Open the [Amazon S3 Console](https://console.aws.amazon.com/s3/) and in the Properties tab of your Amazon S3 bucket, scroll down to the Event notifications section, and click Create event notification.
        
    2.  Configure the following settings:
        
        -   Event name: Specify a descriptive name for your event notification containing up to 255 characters.
            
        -   Prefix: Do not set a prefix as the Amazon S3 bucket is meant to be a dedicated bucket for collecting only network flow logs.
            
        -   Event types: Select All object create events for the type of event notifications that you want to receive.
            
        -   Destination: Select SQS queue to send notifications to an SQS queue to be read by a server.
            
        -   Specify SQS queue: You can either select Choose from your SQS queues and then select the SQS queue, or select Enter SQS queue ARN and specify the ARN in the SQS queue field.
            
            You can retrieve your SQS queue ARN by opening another instance of the AWS Management Console in a browser window, and opening the [Amazon SQS Console](https://console.aws.amazon.com/sqs/), and selecting the Amazon SQS that you created. In the Details section, under ARN, click the copy icon ()), and paste the ARN in the field.
            
            
            
        
    3.  Click Save changes.
        
        Once the event notification is created, a message indicating that the event notification was successfully created is displayed at the top of the page.
        
        **Note:**
        
        If your receive an error when trying to save your changes, you should ensure that the permissions are set up correctly.
        
5.  Configure access keys for the AWS IAM user.
    
    **Note:**
    
    -   It is the responsibility of your organization to ensure that the user who performs this task of creating the access key is assigned the relevant permissions. Otherwise, this can cause the process to fail with errors.
        
    -   Skip this step if you are using an Assumed Role for Cortex Cloud.
        
    
    1.  Open the [AWS IAM Console](https://console.aws.amazon.com/iam/), and in the navigation pane, select Access management → Users.
        
    2.  Select the User name of the AWS IAM user.
        
    3.  Select the Security credentials tab, and scroll down to the Access keys section, and click Create access key.
        
    4.  Click the copy icon () next to the Access key ID and Secret access key keys, where you must click Show secret access key to see the secret key, and record them somewhere safe before closing the window. You will need to provide these keys when you edit the Access policy of the SQS queue and when setting the AWS Client ID and AWS Client Secret in Cortex Cloud. If you forget to record the keys and close the window, you will need to generate new keys and repeat this process.
        
        **Note:**
        
        For more information, see [Managing access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).
        
6.  Update the Access policy of your Amazon SQS queue.
    
    **Note:**
    
    Skip this step if you are using an Assumed Role for Cortex Cloud.
    
    1.  In the [Amazon SQS Console](https://console.aws.amazon.com/sqs/), select the SQS queue that you created when you configured an Amazon Simple Queue Service (SQS).
        
    2.  Select the Access policy tab, and Edit the Access policy code in the editor window to enable the IAM user to perform operations on the Amazon SQS with permissions to `SQS:ChangeMessageVisibility`, `SQS:DeleteMessage`, and `SQS:ReceiveMessage`. Use this sample code as a guide for defining the `“Sid”: “__receiver_statement”` with the following definitions.
        
        -   `“aws:SourceArn”`: Specify the ARN of the AWS IAM user. You can retrieve the User ARN from the Security credentials tab, which you accessed when you configured access keys for the AWS API user.
            
        -   `“Resource”`: Leave the automatically generated ARN for the SQS queue that is set in the code, which uses the format `“arn:sns:Region:account-id:topic-name”`.
            
            **Note:**
            
            For more information on granting permissions to publish messages to an SQS queue, see [Granting permissions to publish event notification messages to a destination](https://docs.aws.amazon.com/AmazonS3/latest/userguide/grant-destinations-permissions-to-s3.html).
            
            ```
            {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Principal": {
                    "Service": "s3.amazonaws.com"
                  },
                  "Action": "SQS:SendMessage",
                  "Resource": "[Leave automatically generated ARN for the SQS queue defined by AWS]",
                  "Condition": {
                    "ArnLike": {
                      "aws:SourceArn": "[ARN of your Amazon S3 bucket]"
                    }
                  }
                },
               {
                  "Sid": "__receiver_statement",
                  "Effect": "Allow",
                  "Principal": {
                    "AWS": "[Add the ARN for the AWS IAM user]"
                  },
                  "Action": [
                    "SQS:ChangeMessageVisibility",
                    "SQS:DeleteMessage",
                    "SQS:ReceiveMessage"
                  ],
                  "Resource": "[Leave automatically generated ARN for the SQS queue defined by AWS]"
                }
              ]
            }
            ```
            
        
7.  Configure the Amazon S3 collection in Cortex Cloud.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  On the Data Sources & Integrations page, click \+ Add New, search for Amazon S3, then hover over it and click Add.
        
    3.  Set these parameters, where the parameters change depending on whether you configured an Access Key or Assumed Role.
        
        -   To provide access to Cortex Cloud to your logs and perform API operations using a designated AWS IAM user, leave the Access Key option selected. Otherwise, select Assumed Role, and ensure that you create an Assumed Role for Cortex Cloud before continuing with these instructions. In addition, when you create an Assumed Role for Cortex Cloud, ensure that you edit the policy that defines the permissions for the role with the Amazon S3 Bucket ARN and SQS ARN.
            
        -   SQS URL: Specify the SQS URL, which is the ARN of the Amazon SQS that you configured in the AWS Management Console.
            
        -   Name: Specify a descriptive name for your log collection configuration.
            
        -   When setting an Access Key, set these parameters.
            
            -   AWS Client ID: Specify the Access key ID, which you received when you configured access keys for the AWS IAM user in AWS.
                
            -   AWS Client Secret: Specify the Secret access key you received when you configured access keys for the AWS IAM user in AWS.
                
            
        -   When setting an Assumed Role, set these parameters.
            
            -   Role ARN: Specify the Role ARN for the Assumed Role you created for Cortex Cloud in AWS.
                
            -   External Id: Specify the External Id for the Assumed Role you created for Cortex Cloud in AWS.
                
            
        -   Log Type: Select Generic to configure your log collection to receive generic logs from Amazon S3, which can include different types of data, such as file and metadata. When selecting this option, the following additional fields are displayed.
            
            -   Log Format: Select the log format type as Raw, JSON, CEF, LEEF, Cisco, Corelight, or Beyondtrust Cloud ECS.
                
                **Note:**
                
                \-The Vendor and Product defaults to Auto-Detect when the Log Format is set to CEF or LEEF.
                
                \-For a Log Format set to CEF or LEEF, Cortex Cloud reads events row by row to look for the Vendor and Product configured in the logs. When the values are populated in the event log row, Cortex Cloud uses these values even if you specified a value in the Vendor and Product fields in the Amazon S3 data collector settings. Yet, when the values are blank in the event log row, Cortex Cloud uses the Vendor and Product that you specified in these fields in the Amazon S3 data collector settings. If you did not specify a Vendor or Product in the Amazon S3 data collector settings, and the values are blank in the event log row, the values for both fields are set to unknown.
                
                For a Log Format set to Beyondtrust Cloud ECS, the following fields are automatically set and are not configurable:
                
                \-Vendor: Beyondtrust
                
                \-Product: Privilege Management
                
                \-Compression: Uncompressed
                
                For more information, see Ingest logs from BeyondTrust Privilege Management Cloud.
                
                For a Log Format set to Cisco, the following fields are automatically set and not configurable.
                
                \-Vendor: Cisco
                
                \-Product: ASA
                
                For a Log Format set to Corelight, the following fields are automatically set and not configurable:
                
                \-Vendor: Corelight
                
                \-Product: Zeek
                
                For a Log Format set to Raw or JSON, the following fields are automatically set and are configurable.
                
                \-Vendor: AMAZON
                
                \-Product: AWS
                
                Cortex Cloud supports logs in single line format or multiline format. For a JSON format, multiline logs are collected automatically when the Log Format is configured as JSON. When configuring a Raw format, you must also define the Multiline Parsing Regex as explained below.
                
            -   Vendor: (Optional) Specify a particular vendor name for the Amazon S3 generic data collection, which is used in the Amazon S3 XQL dataset `<Vendor>_<Product>_raw` that Cortex Cloud creates as soon as it begins receiving logs.
                
            -   Product: (Optional) Specify a particular product name for the Amazon S3 generic data collection, which is used in the Amazon S3 XQL dataset name `<Vendor>_<Product>_raw` that Cortex Cloud creates as soon as it begins receiving logs.
                
            -   Compression: Select whether the logs are compressed into a gzip file or are uncompressed.
                
            -   Multiline Parsing Regex: (Optional) This option is only displayed when the Log Format is set to Raw, where you can set the regular expression that identifies when the multiline event starts in logs with multilines. It is assumed that when a new event begins, the previous one has ended.
                
            
        
    4.  Click Test to validate access, and then click Enable.
        
        When events start to come in, a green check mark appears underneath the Amazon S3 configuration with the number of logs received.

#### Ingest network Route 53 logs from Amazon S3

Take advantage of Cortex Cloud investigation capabilities and set up network Route 53 ingestion for your Amazon S3 logs using an AWS CloudFormation Script.

You can forward network AWS Route 53 DNS logs to Cortex Cloud from Amazon Simple Storage Service (Amazon S3).

To receive network Route 53 DNS logs from Amazon S3, you must first configure data collection from Amazon S3. You can then configure the Collection Integrations settings in Cortex Cloud for Amazon S3. After you set up collection integration, Cortex Cloud begins receiving new logs and data from the source.

You can configure Amazon S3 with SQS notification using the AWS CloudFormation Script that we have created for you to make the process easier. The instructions below explain how to configure Cortex Cloud to receive network Route 53 DNS logs from Amazon S3 using SQS.

**Note:**

For more information on configuring data collection from Amazon S3 for Route 53 DNS logs, see the [AWS Documentation](https://aws.amazon.com/blogs/aws/log-your-vpc-dns-queries-with-route-53-resolver-query-logs/).

When Cortex Cloud begins receiving logs, the app automatically creates an Amazon Route 53 Cortex Query Language (XQL) dataset (`amazon_route53_raw`). This enables you to search the logs with XQL Search using the dataset. For example, queries refer to the in-app XQL Library. For enhanced cloud protection, you can also configure Cortex Cloud to ingest network Route 53 DNS logs as Cortex Cloud network connection stories, which you can query with XQL Search using the `xdr_data` dataset with the preset called `network_story`. Cortex Cloud can also generate Cortex Cloud issues (Analytics, Correlation Rules, IOC, and BIOC) when relevant from Amazon Route 53 DNS logs. While Correlation Rules issues are generated on non-normalized and normalized logs, Analytics, IOC, and BIOC issues are only generated on normalized logs.

Enhanced cloud protection provides:

-   Normalization of cloud logs
    
-   Cloud logs stitching
    
-   Enrichment with cloud data
    
-   Detection based on cloud analytics
    
-   Cloud-tailored investigations
    

Be sure you do the following tasks before you begin configuring data collection from Amazon S3 using the AWS CloudFormation Script.

-   Ensure that you have the proper permissions to run AWS CloudFormation with the script provided in Cortex Cloud. You need at a minimum the following permissions in AWS for an Amazon S3 bucket and Amazon Simple Queue Service (SQS):
    
    -   **Amazon S3 bucket**: `GetObject`
        
    -   **SQS**: `ChangeMessageVisibility`, `ReceiveMessage`, and `DeleteMessage`.
        
    
-   Ensure that you can access your Amazon Virtual Private Cloud (VPC) and have the necessary permissions to create Route 53 Resolver Query logs.
    
-   Determine how you want to provide access to Cortex Cloud to your logs and perform API operations. You have the following options.
    
    -   Designate an AWS IAM user, where you will need to know the Account ID for the user and have the relevant permissions to create an access key/id for the relevant IAM user. This is the default option when you configure the Amazon S3 collection by selecting Access Key.
        
    -   Create an assumed role in AWS to delegate permissions to a Cortex Cloud AWS service. This role grants Cortex Cloud access to your flow logs. For more information, see [Creating a role to delegate permissions to an AWS service](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html). This is the Assumed Role option when you configure the Amazon S3 collection in Cortex Cloud. For more information on creating an assumed role for Cortex Cloud, see Create an assumed role.
        
    
    To collect Amazon S3 logs that use server-side encryption (SSE), the user role must have an IAM policy that states that Cortex Cloud has kms:Decrypt permissions. With this permission, Amazon S3 automatically detects if a bucket is encrypted and decrypts it. If you want to collect encrypted logs from different accounts, you must have the decrypt permissions for the user role also in the key policy for the master account Key Management Service (KMS). For more information, see [Allowing users in other accounts to use a KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html).
    

Configure Cortex Cloud to receive network Route 53 DNS logs from Amazon S3 using the CloudFormation Script.

1.  Download the CloudFormation Script in Cortex Cloud.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  On the Data Sources & Integrations page, click \+ Add New, search for Amazon S3, then hover over it and click Add.
        
    3.  To provide access to Cortex Cloud to your logs and to perform API operations using a designated AWS IAM user, leave the Access Key option selected. Otherwise, select Assumed Role, and ensure that you Create an Assumed Role for before continuing with these instructions.
        
    4.  For the Log Type, select Route 53 to configure your log collection to receive network Route 53 DNS logs from Amazon S3, and the following text is displayed under the field Download CloudFormation Script. See instructions here.
        
    5.  Click the Download CloudFormation Script. link to download the script to your computer.
        
2.  Create a new Stack in the CloudFormation Console with the script you downloaded from Cortex Cloud.
    
    **Note:**
    
    For more information on creating a Stack, see [Creating a stack on the AWS CloudFormation console](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stack.html).
    
    1.  Log in to the [CloudFormation Console](https://console.aws.amazon.com/cloudformation/).
        
    2.  From the CloudFormation → Stacks page, ensure that you have selected the correct region for your configuration.
        
    3.  Select Create Slack → With new resources (standard).
        
    4.  Specify the template that you want AWS CloudFormation to use to create your stack. This template is the script that you downloaded from Cortex Cloud, which will create an Amazon S3 bucket, Amazon Simple Queue Service (SQS) queue, and Queue Policy. Configure the following settings in the Specify template page.
        
        -   Prerequisite - Prepare template → Prepare template: Select Template is ready.
            
        -   Specify Template
            
            -   Template source: Select Upload a template file.
                
            -   Upload a template file: Choose file, and select the `CloudFormation-Script.json` file that you downloaded.
                
            
        
    5.  Click Next.
        
    6.  In the Specify stack details page, configure the following stack details.
        
        -   Stack name: Specify a descriptive name for your stack.
            
        -   Parameters → Cortex XDR Flow Logs Integration
            
            -   Bucket Name: Specify the name of the S3 bucket to create, where you can leave the default populated name as xdr-route53-logs or create a new one. The name must be unique.
                
            -   Publisher Account ID: Specify the AWS IAM user account ID with whom you are sharing access.
                
            -   Queue Name: Specify the name for your Amazon SQS queue to create, where you can leave the default populated name as xdr-route53 or create a new one. The name must be unique.
                
            
        
    7.  Click Next.
        
    8.  In the Configure stack options page, there is nothing to configure, so click Next.
        
    9.  In the Review page, look over the stack configurations settings that you have configured and if they are correct, click Create stack. If you need to make a change, click Edit beside the particular step that you want to update.
        
        The stack is created and is opened with the Events tab displayed. It can take a few minutes for the new Amazon S3 bucket, SQS queue, and Queue Policy to be created. Click Refresh to get updates. Once everything is created, leave the stack opened in the current browser as you will need to access information in the stack for other steps detailed below.
        
        **Note:**
        
        For the Amazon S3 bucket created using CloudFormation, it is the customer’s responsibility to define a retention policy by creating a Lifecycle rule in the Management tab. We recommend setting the retention policy to at least 7 days to ensure that the data is retrieved under all circumstances.
        
3.  Configure Route 53 Query Logging in AWS.
    
    1.  Log in to the [AWS Management Console](https://console.aws.amazon.com/).
        
    2.  From the menu bar, ensure that you have selected the correct region for your configuration.
        
    3.  Search for Route 53 and select Resolver → Query Logging.
        
    4.  Configure query logging.
        
    5.  Set the following parameters in the different sections on the Configure query logging page.
        
        -   Query logging configuration name
            
            -   Name: Specify a name for your Resolver query logging configuration.
                
            
        -   Query logs destination
            
            -   Destination for query logs: Select S3 bucket as the place where you want Resolver to publish query logs.
                
            -   Amazon S3 bucket: Browse S3 to select the Amazon S3 bucket created after running the CloudFormation script, which is by default called xdr-route53-logs or select the one that you created.
                
            
        -   VPCs to log queries for
            
            -   Add VPC: Clicking the Add VPC button opens the Add VPC page, where you can choose the VPCs that you want to log queries for. When you are done, click Add.
                
            
        
    6.  Click Configure query logging.
        
4.  Configure access keys for the AWS IAM user that Cortex Cloud uses for API operations.
    
    **Note:**
    
    -   It is the responsibility of the customer’s organization to ensure that the user who performs this task of creating the access key is designated with the relevant permissions. Otherwise, this can cause the process to fail with errors.
        
    -   Skip this step if you are using an Assumed Role for Cortex Cloud.
        
    
    1.  Open the [AWS IAM Console](https://console.aws.amazon.com/iam/), and in the navigation pane, select Access management → Users.
        
    2.  Select the User name of the AWS IAM user.
        
    3.  Select the Security credentials tab, scroll down to the Access keys section, and click Create access key.
        
    4.  Click the copy icon next to the Access key ID and Secret access key keys, where you must click Show secret access key to see the secret key and record them somewhere safe before closing the window. You will need to provide these keys when you edit the Access policy of the SQS queue and when setting the AWS Client ID and AWS Client Secret in Cortex Cloud. If you forget to record the keys and close the window, you will need to generate new keys and repeat this process.
        
        **Note:**
        
        For more information, see [Managing access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).
        
5.  When you create an Assumed Role, ensure that you edit the policy that defines the permissions for the role with the S3 Bucket ARN and SQS ARN, which is taken from the stack you created.
    
    **Note:**
    
    Skip this step if you are using an Access Key to provide access to Cortex Cloud.
    
6.  Configure the Amazon S3 collection in Cortex Cloud.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  In the Amazon S3 configuration, click Add Instance to begin a new configuration.
        
    3.  Set these parameters, where the parameters change depending on whether you configured an Access Key or Assumed Role.
        
        -   SQS URL: Specify the SQS URL, which is taken from the stack you created. In the browser you left open after creating the stack, open the Outputs tab, copy the Value of the QueueURL and paste it in this field.
            
        -   Name: Specify a descriptive name for your log collection configuration.
            
        -   When setting an Access Key, set these parameters.
            
            -   AWS Client ID: Specify the Access key ID, which you received when you created access keys for the AWS IAM user in AWS.
                
            -   AWS Client Secret: Specify the Secret access key you received when you created access keys for the AWS IAM user in AWS.
                
            
        -   When setting an Assumed Role, set these parameters.
            
            -   Role ARN: Specify the Role ARN for the Assumed Role you created for Cortex Cloudin AWS.
                
            -   External Id: Specify the External Id for the Assumed Role you created for Cortex Cloud in AWS.
                
            
        -   Log Type: Select Route 53 to configure your log collection to receive network Route 53 DNS logs from Amazon S3. When configuring network Route 53 log collection, the following additional field is displayed for Enhanced Cloud Protection.
            
            You can Normalize DNS logs by selecting the checkbox (default configuration). When selected, Cortex Cloud ingests the network Route 53 DNS logs as XDR network connection stories, which you can query using XQL Search from the `xdr_data` dataset using the preset called `network_story`.
            
        
    4.  Click Test to validate access, and then click Enable.
        
        When events start to come in, a green check mark appears underneath the Amazon S3 configuration with the number of logs received.

#### Create an assumed role

Learn about creating an AWS Assumed Role for Cortex Cloud.

If you do not designate a separate AWS IAM user to provide access to Cortex Cloud to your logs and to perform API operations, you can create an assumed role in AWS to delegate permissions to a Cortex Cloud AWS service. This role grants Cortex Cloud access to your logs. For more information, see [Creating a role to delegate permissions to an AWS service](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html).

When setting up any type of Amazon S3 Collector in Cortex Cloud, these instructions explain setting up an Assumed Role.

**Prerequisite:**

You need ensure you have an Amazon S3 bucket and Amazon Simple Queue Service (SQS) already configured as it's needed to configure an IAM policy. The S3 bucket and SQS required depends on how you plan to configure your Amazon S3 data source:

-   When using a CloudFormation script provided by Cortex Cloud to configure Amazon S3 with SQS notifications, you'll need to either:
    
    -   Use the out-of-the-box Amazon S3 bucket and Amazon Simple Queue Service (SQS), whose names change according to the Amazon S3 log type you are defining.
        
    -   Create a new S3 bucket and SQS according to your system requirements.
        
    
-   When configuring data collection from Amazon S3 manually, create a S3 bucket and SQS according to your system requirements.
    

When creating the S3 bucket and SQS, follow any other relevant instructions provided, for example in the prerequisite section, for the specific type of Amazon S3 data you want to ingest in the relevant topic.

1.  Log in to the AWS Management Console, and open the IAM console to create a policy in the same region as your AWS account.
    
    1.  In the navigation pane on the left, select Access Management → Policies, and click Create policy.
        
    2.  For the Policy editor, select the JSON tab.
        
    3.  Copy the following JSON policy and paste it within the editor window.
        
        The **`<s3-arn>`** and **`<sqs-arn>`** are placeholders. These are filled out using the S3 bucket and SQS that you configured in the prerequisite steps above.
        
        **Note:**
        
        -   You can retrieve your bucket’s ARN by opening the [Amazon S3 Console](https://console.aws.amazon.com/s3/) in a browser window. In the Buckets section, select the bucket, click Copy ARN, and paste the ARN in the field.
            
        -   You can retrieve the SQS queue ARN by opening another instance of the AWS Management Console in a browser window, and opening the [Amazon SQS Console](https://console.aws.amazon.com/sqs/), and selecting the Amazon SQS that you created. In the Details section, under ARN, click the copy icon ()), and paste the ARN in the field.
            
        
        ```
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": "s3:GetObject",
                    "Resource": "<s3-arn>/\*"
                },
                {
                    "Effect": "Allow",
                     "Action": [
                        "sqs:ReceiveMessage",
                        "sqs:DeleteMessage",
                        "sqs:ChangeMessageVisibility"
                    ],
                    "Resource": "<sqs-arn>"
                }
            ]
        }
        ```
        
    4.  Click Next.
        
    5.  Review and create the policy.
        
2.  Create a role for Cortex Cloud in the IAM console of the AWS Management Console.
    
    **Note:**
    
    For more information, see the [AWS instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html).
    
    1.  In the navigation pane on the left, select Access Management → Roles, and click Create role.
        
    2.  Select trusted entity, and use the following values and options when creating the role:
        
        -   Trusted entity type: Select Custom trust policy.
            
        -   Custom trust policy: On the right pane, configure the following settings.
            
            -   Under Edit statement → Read or write, verify the AssumeRole is selected.
                
            -   Add a principle by clicking Add and setting the following:
                
                -   Principal type: Select AWS account and root user.
                    
                -   ARN: Replace (Account) with the Account ID 006742885340. When using a Cortex XSIAM FedRAMP environment, specify the Account ID as 685269782068.
                    
                
                When you are finished, click Add principal.
                
            -   Add a condition for an External ID by clicking Add and setting the following:
                
                -   Condition key: Select sts:ExternalId.
                    
                -   Qualifier: Select Default.
                    
                -   Operator: Select StringEquals.
                    
                -   Value: Enter the value of the External ID, a unique alphanumeric string, by generating a secure UUIDv4 using an [Online UUID Generator](https://www.uuidgenerator.net/version4). Copy the External ID as you will use this when configuring the Amazon S3 Collector in Cortex Cloud.
                    
                
                
                
                When you are finished, click Add condition.
                
            
        
        
        
    3.  Click Next and add permissions by selecting the policy you created.
        
        
        
3.  Click Next to name, review, and create.
    
    -   Role name: Specify a name for the new role, and click Create role.
        
    
    
    
4.  Copy the Policy ARN and Role ARN for future use by opening the policy and role that you created.
    
5.  Continue with the task for the applicable Amazon S3 logs you want to configure.
    
    The following type of logs are available.
    
    -   Ingest network flow logs from Amazon S3.
        
    -   Ingest network Route 53 logs from Amazon S3
        
    -   Ingest audit logs from AWS Cloud Trail.
        
    -   Ingest generic logs from Amazon S3.Ingest generic logs from Amazon S3

#### Configure data collection from Amazon S3 manually

Set up network flow log ingestion for your Amazon S3 logs manually (without a script).

There are various reasons why you may need to configure data collection from Amazon S3 manually, as opposed to using the CloudFormation Script provided in Cortex Cloud. For example, if your organization does not use CloudFormation scripts, you will need to follow the instructions below, which explain at a high-level how to perform these steps manually with a link to the relevant topic in the Amazon S3 documentation with the detailed steps to follow.

As soon as Cortex Cloud begins receiving logs, the app automatically creates an Amazon S3 Cortex Query Language (XQL) dataset (`aws_s3_raw`). This enables you to search the logs with XQL Search using the dataset. For example queries, refer to the in-app XQL Library. For enhanced cloud protection, you can also configure Cortex Cloud to ingest network flow logs as Cortex Cloud network connection stories, which you can query with XQL Search using the `xdr_dataset` dataset with the preset called `network_story`. Cortex Cloud can also generate Cortex Cloud issues (Analytics, Correlations, IOC, and BIOC) when relevant from Amazon S3 logs. While Correlation Rules issues are generated on non-normalized and normalized logs, Analytics, IOC, and BIOC issues are only generated on normalized logs.

Enhanced cloud protection provides:

-   Normalization of cloud logs
    
-   Cloud logs stitching
    
-   Enrichment with cloud data
    
-   Detection based on cloud analytics
    
-   Cloud-tailored investigations
    

Be sure you do the following tasks before you begin configuring data collection manually from Amazon CloudWatch to Amazon S3.

**Note:**

If you already have an Amazon S3 bucket configured with VPC flow logs that you want to use for this configuration, you do not need to perform the prerequisite steps detailed in the first two bullets.

-   Ensure that you have at a minimum the following permissions in AWS for an Amazon S3 bucket and Amazon Simple Queue Service (SQS).
    
    -   **Amazon S3 bucket**: `GetObject`
        
    -   **SQS**: `ChangeMessageVisibility`, `ReceiveMessage`, and `DeleteMessage`.
        
    
-   Create a dedicated Amazon S3 bucket for collecting network flow logs with the default settings. For more information, see [Creating a bucket using the Amazon S3 Console](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html).
    
    **Note:**
    
    It is your responsibility to define a retention policy for your Amazon S3 bucket by creating a Lifecycle rule in the Management tab. We recommend setting the retention policy to at least 7 days to ensure that the data is retrieved under all circumstances.
    
-   Ensure that you can access your Amazon Virtual Private Cloud (VPC) and have the necessary permissions to create flow logs.
    
-   Determine how you want to provide access to Cortex Cloud to your logs and perform API operations. You have the following options.
    
    -   Designate an AWS IAM user, where you will need to know the Account ID for the user and have the relevant permissions to create an access key/id for the relevant IAM user. This is the default option as explained in Configure the Amazon S3 collection by selecting Access Key.
        
    -   Create an assumed role in AWS to delegate permissions to a Cortex Cloud AWS service. This role grants Cortex Cloud access to your flow logs. For more information, see [Creating a role to delegate permissions to an AWS service](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html). This is the Assumed Role option as described in the Configure the Amazon S3 collection. For more information on creating an assumed role for Cortex Cloud , see Create an assumed role.
        
    
    To collect Amazon S3 logs that use server-side encryption (SSE), the user role must have an IAM policy that states that Cortex Cloud has kms:Decrypt permissions. With this permission, Amazon S3 automatically detects if a bucket is encrypted and decrypts it. If you want to collect encrypted logs from different accounts, you must have the decrypt permissions for the user role also in the key policy for the master account Key Management Service (KMS). For more information, see [Allowing users in other accounts to use a KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html).
    

**Note:**

For resources such as Amazon S3, SQS, VPC flow logs, and event notifications, you may use the default configurations; yet, these settings remain fully customizable to meet your specific environment requirements.

Configure Cortex Cloud to receive network flow logs from Amazon S3 manually.

1.  Log in to the [AWS Management Console](https://console.aws.amazon.com/).
    
2.  From the menu bar, ensure that you have selected the correct region for your configuration.
    
3.  Configure your Amazon Virtual Private Cloud (VPC) with flow logs. For more information, see [AWS VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html).
    
    **Note:**
    
    If you already have an Amazon S3 bucket configured with VPC flow logs, skip this step and go to Configure an Amazon Simple Queue Service (SQS).
    
4.  Configure an Amazon Simple Queue Service (SQS). For more information, see [Configuring Amazon SQS queues (console)](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configuring.html).
    
    **Note:**
    
    Ensure that you create your Amazon S3 bucket and Amazon SQS queue in the same region.
    
5.  Configure an event notification to your Amazon SQS whenever a file is written to your Amazon S3 bucket. For more information, see [Amazon S3 Event Notifications](https://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html).
    
6.  Configure access keys for the AWS IAM user that Cortex Cloud uses for API operations. For more information, see [Managing access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).
    
    **Note:**
    
    -   It is the responsibility of the customer’s organization to ensure that the user who performs this task of creating the access key is designated with the relevant permissions. Otherwise, this can cause the process to fail with errors.
        
    -   Skip this step if you are using an Assumed Role for Cortex Cloud.
        
    
7.  Update the Access Policy of your SQS queue and grant the required permissions mentioned above to the relevant IAM user. For more information, see [Granting permissions to publish event notification messages to a destination](https://docs.aws.amazon.com/AmazonS3/latest/userguide/grant-destinations-permissions-to-s3.html).
    
    **Note:**
    
    Skip this step if you are using an Assumed Role for Cortex Cloud.
    
8.  Configure the Amazon S3 collection in Cortex Cloud.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  On the Data Sources & Integrations page, click \+ Add New, search for Amazon S3, then hover over it and click Add.
        
    3.  Set these parameters, where the parameters change depending on whether you configured an Access Key or Assumed Role.
        
        -   To provide access to Cortex Cloud to your logs and perform API operations using a designated AWS IAM user, leave the Access Key option selected. Otherwise, select Assumed Role, and ensure that you Create an Assumed Role for Cortex Cloud before continuing with these instructions. In addition, when you create an Assumed Role for Cortex Cloud, ensure that you edit the policy that defines the permissions for the role with the Amazon S3 Bucket ARN and SQS ARN.
            
        -   SQS URL: Specify the SQS URL, which is the ARN of the Amazon SQS that you configured in the AWS Management Console. For more information on how to retrieve your Amazon SQS ARN, see the Specify SQS queue field when you configure an event notification to your Amazon SQS whenever a file is written to your Amazon S3 bucket.
            
        -   Name: Specify a descriptive name for your log collection configuration.
            
        -   When setting an Access Key, set these parameters.
            
            -   AWS Client ID: Specify the Access key ID, which you received when you created access keys for the AWS IAM user in AWS.
                
            -   AWS Client Secret: Specify the Secret access key you received when you created access keys for the AWS IAM user in AWS.
                
            
        -   When setting an Assumed Role, set these parameters.
            
            -   Role ARN: Specify the Role ARN for the Assumed Role for Cortex Cloud in AWS.
                
            -   External Id: Specify the External Id for the Assumed Role for Cortex Cloud in AWS.
                
            
        -   Log Type: Select Flow Logs to configure your log collection to receive network flow logs from Amazon S3. When configuring network flow log collection, the following additional field is displayed for Enhanced Cloud Protection.
            
            You can Normalize and enrich flow logs by selecting the checkbox. When selected, Cortex Cloud ingests the network flow logs as Cortex Cloud network connection stories, which you can query using XQL Search from the `xdr_dataset` dataset using the preset called `network_story`.
            
        
    4.  Click Test to validate access, and then click Enable.
        
        Once events start to come in, a green check mark appears underneath the Amazon S3 configuration with the number of logs received.

### Amazon Web Services

Learn more about collecting Amazon Web Services data using a Cloud Service Provider (CSP) onboarding data source in Cortex Cloud.

Follow a wizard to onboard your Amazon Web Services (AWS) environment. The AWS onboarding wizard is designed to facilitate the seamless setup of AWS data into Cortex Cloud.

| Amazon Web Services vendor | Description |
| --- | --- |
| Link to full configuration Cloud Service Provider (CSP) onboarding data source instructions for Cortex Cloud Premium license. | Onboard Amazon Web Services |
| Link to basic configuration Cloud Service Provider (CSP) onboarding data source instructions for Cortex Cloud NG SIEM, Cortex Cloud Enterprise license, and Cortex Cloud Enterprise+ licenses. | Onboard Amazon Web Services with basic configuration |

### API Security

Learn more about retrieving and collecting API data for API Security using different standard data sources in Cortex Cloud.

You can configure retrieving and collecting API data for further analysis by Cortex's comprehensive API Security capabilities using the following standard data sources:

AWS API Gateway vendor

| AWS API Gateway vendor | Description |
| --- | --- |
| Standard data source overview | Integrate AWS API Gateway with the Cortex Cloud AWS API Gateway data source to begin scanning the APIs for potential threats and vulnerabilities. |
| Link to standard data source instructions | Ingest AWS API Gateway |

Azure APIM vendor

| Azure APIM vendor | Description |
| --- | --- |
| Standard data source overview | Send HTTP request/response data to  Cortex Cloud using the Azure APIM data source. |
| Link to standard data source instructions | Ingest Azure APIM |

F5 vendor

| F5 vendor | Description |
| --- | --- |
| Standard data source overview | Integrate a dedicated F5 log plugin to enable seamless traffic ingestion from your F5 Gateway to Cortex Cloud, allowing for comprehensive security measures, such as OWASP Top-10, bot detection, access control, and more. |
| Link to standard data source instructions | Ingest-F5 |

GCP Apigee Proxy vendor

| GCP Apigee Proxy vendor | Description |
| --- | --- |
| Standard data source overview | Integrate Apigee Proxy with Cortex Cloud to begin scanning the APIs for potential threats and vulnerabilities using the Apigee’s JavaScript (JS) policy. |
| Link to standard data source instructions | Ingest Apigee Proxy |

Kong vendor

| Kong vendor | Description |
| --- | --- |
| Standard data source overview | Integrate a dedicated Kong HTTP log plugin to enable seamless traffic ingestion from your Kong API gateway to Cortex Cloud, allowing for comprehensive security measures, such as OWASP Top-10, bot detection, access control, and more. |
| Link to standard data source instructions | Ingest KongIngest Kong |

#### Ingest data for API security

Ingest API data to analyze and identify potential security threats.

Configure the settings in both Cortex Cloud and your cloud service provider to retrieve and collect API data for further analysis by Cortex's comprehensive API security capabilities that provides a transparent view of API traffic, helping to identify potential security threats.

##### Ingest AWS API Gateway
Integrate AWS API Gateway with Cortex Cloud to begin scanning the APIs for potential threats and vulnerabilities.

Settings in Cortex Cloud

In Cortex Cloud, set up the AWS API Gateway data source to integrate with the AWS API Gateway.

1.  From Settings → Data Sources , click  and search for AWS API Gateway and then click Connect or Connect Another Instance.
    
2.  In the AWS API Collector wizard, enter a relevant name and click Create and Proceed.
    
3.  Copy the key and save it for later.
    
    **Note:**
    
    You must generate a new key if you did not save.
    
4.  Click Close.
    

###### Settings in AWS Management Console

Configure the settings in the AWS Management Console to integrate with Cortex Cloud:

1.  Log in to the [AWS Management Console](https://aws.amazon.com/console/).
    
2.  In AWS Management Console, navigate to API Gateway.
    
    1.  Expand the left-hand menu of the API project.
        
    2.  Go to Settings → Logging and click Edit. Verify that the CloudWatch log role ARN is filled.
        
    3.  Click Stages and from Stages, select the relevant stage.
        
    4.  From Logs and Tracing, click Edit and configure the following:
        
        -   CloudWatch Logs: Select Errors and info logs
            
        -   Select Data tracing
            
        -   Select Detailed metrics
            
        
    5.  Click Save.
        
        This creates a unique log group inside CloudWatch.
        
3.  Open CloudWatch in another window by typing CloudWatch in the search bar.
    
    1.  Go to Logs → Log groups and search for the log group just created.
        
        The group name follows the following format: `“API-Gateway-Execution-Logs_<gw ID>/<stage name>”`
        
    2.  Click the log group, and from the Log group details, copy the ARN.
        
4.  Return to Edit logs and tracing, go to enable the custom access logging , and paste the ARN without the \* in the Access log destination ARN field.
    
    Example 126. 
    
    ARN: `arn:aws:logs:us-east-1:123456789012:log-group:API-Gateway-Execution-Logs_153tp249k2/Prod:*`
    
    Paste in Access log destination ARN: `arn:aws:logs:us-east-1:123456789012:log-group:API-Gateway-Execution-Logs_153tp249k2/Prod`
    
      
    
5.  In Log format, type the following and click Save:
    
    ```
    ($context.requestId) accountId: $context.accountId;
    requestTime: $context.requestTime;
    path: $context.path
    ```
    
6.  Click Create Firehose stream.
    
    1.  Configure the following:
        
        -   Source: Direct PUT
            
        -   Destination: HTTP Endpoint
            
        -   Firehose stream name: Add a relevant name.
            
        
    2.  In Destination settings, configure the following:
        
        -   HTTP endpoint URL : Add the API URL from Cortex Cloud.
            
        -   Authentication: Select Use access key.
            
        -   Access key: Paste the generated token from AWS API Gateway.
            
        -   Content encoding: Select GZIP.
            
        
    3.  In Backup settings, configure the following:
        
        -   Source record backup in Amazon S3: select Failed date only.
            
        -   S3 backup bucket: select a bucket or enter a bucket URI.
            
        
    4.  Click Create.
        
        It takes up to 5 minutes for the stream to be activated.
        
7.  Refer to [Subscription filters with Amazon Data Firehose](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample). To create an IAM Role and provide CloudWatch with the appropriate permissions for the streaming, refer to steps 8-11.
    
    After the Data Firehose delivery stream is active and you have created the IAM role, you can create the CloudWatch Logs subscription filter. The subscription filter immediately starts the flow of real-time log data from the chosen log group to your Amazon Data Firehose delivery stream:
    
    ```
    aws logs put-subscription-filter \\
        --log-group-name "<YOUR_LOG_GROUP_NAME>" \\
        --filter-name "<any_filter_name>" \\
        --filter-pattern "" \\
        --destination-arn "arn:aws:firehose:region:123456789012:deliverystream/<YOUR_DELIVERY_STREAM>" \\
        --role-arn "arn:aws:iam::<ACCOUNT_ID>:role/<YOUR_IAM_ROLE>"
    ```
    
    **Important:**
    
    Leave `–filter-pattern` empty as displayed above.
    
    After you create the filter, go back to Data Sources → AWS API Gateway to see the logs starting to come in.
    
    **Note:**
    
    If no logs are showing, send some API requests on Postman or CURL.

##### Ingest Azure APIM
**Notice:**

Requires the Data Collection add-on.

Integrate Azure APIM with Cortex Cloud to start scanning its APIs for potential threats and vulnerabilities.

You need to set up a policy that enables you to customize the behavior of managed APIs. You can configure the sending of HTTP request/response data to Cortex Cloud. The data is saved and analyzed by API security modules, which provide information on the security risks associated with the APIs.

**Note:**

Microsoft Azure APIM service must be running before starting to configure the integration.

Settings in Cortex Cloud

In Cortex Cloud, set up the Azure API Management data source to integrate with the Azure API Gateway.

1.  From Settings → Data Sources & Integrations , click \+ Add New, search for Azure API Management, then hover over it and click Add or Add Instance.
    
2.  In the APIM Collector wizard, enter a relevant name and then click Create and Proceed.
    
3.  Copy the key and paste it somewhere so that you can access it for later.
    
    If you forget to record the key and close the window, you must generate a new key and repeat this process.
    
4.  Click Close.
    

###### Settings in Azure APIM policy

Configure an inbound and outbound policy to send HTTP traffic data of the APIs to Cortex Cloud. You can configure a policy for individual operations (endpoints) or all operations of a single API.

Follow the steps to configure the policy.

1.  Log in to [Microsoft Azure](https://portal.azure.com/).
    
2.  Go to API Management services and select the relevant service.
    
3.  From the left-hand menu, select APIs → Named values.
    
    **Note:**
    
    From the URL, save the UUID and the resource group - `/resource/subscriptions/<UUID>/resourceGroups/<ResourceGroup>`.
    
    The UUID is the Azure account/subscription ID and the resource group, which is the group where the APIM Service is defined.
    
4.  Configure the settings in each of the sections. Follow the steps in the order they are listed.
    
    **Note:**
    
    Use the search to navigate to the specific section.
    
    **Named values**: Add the values:
    
    -   cloud-account-id
        
        -   Type: Plain
            
        -   Value: The UUID you saved from the previous step.
            
        
    -   cloud-resource-group
        
        -   Type: Plain
            
        -   Value: The resource group you saved from the previous step.
            
        
    -   cortex-api-key
        
        -   Type: Secret
            
        -   Value: The token that you saved from data sources in Cortex.
            
        
    -   cortex-api-url
        
        -   Type: Plain
            
        -   Value: The API URL from data sources in Cortex.
            
        
    -   cortex-http-body-size-limit-bytes
        
        -   Type: Plain
            
        -   Value: 131072
            
            **Note:**
            
            131072 bytes = 128 KB. This value determines the size (in bytes) of request and response bodies to send to Cortex. Any bytes beyond this limit are truncated.
            
        
    
    **APIs**: From the left-hand menu, go to APIs → APIs.
    
    1.  You can create a policy on a specific API or choose to create a policy on all APIs.
        
    2.  From Inbound Processing, click .
        
        The Policies screen opens. There are three sections:
        
        -   `<inbound>`
            
        -   `<backend>`
            
        -   `<outbound>`
            
        
        The `<inbound>` includes the request before it's sent to the `<outbound>`. The parameters are saved before they're sent.
        
        Add the following inside the `<inbound>`:
        
        ```
         <!-- Save the request body and headers to be sent to Cortex. This should always be placed at the very beginning of the inbound element. -->
                <set-variable name="requestBody" value="@((context.Request?.Body?.As<string>(preserveContent: true)) ?? string.Empty)" />
                <set-variable name="requestHeaders" value="@(JsonConvert.SerializeObject(context.Request.Headers))" />
                <!-- End of setting variables for sending to Cortex --><!-- Save the request body and headers to be sent to Cortex. This should always be placed at the very beginning of the inbound element. -->
                <set-variable name="requestBody" value="@((context.Request?.Body?.As<string>(preserveContent: true)) ?? string.Empty)" />
                <set-variable name="requestHeaders" value="@(JsonConvert.SerializeObject(context.Request.Headers))" />
                <!-- End of setting variables for sending to Cortex -->
        ```
        
        **Note:**
        
        If any other inbound policies should be added, they must be added after these elements.
        
        The `<outbound>` includes the request before it returns a response.
        
        Add the following inside the <outbound> element, at the end, after the other child elements:
        
        ```
         <!-- Send data to Cortex. This should always be placed at the very end of the outbound element. -->
                <send-request mode="new" response-variable-name="mirrorMessage">
                    <set-url>{{cortex-api-url}}</set-url>
                    <set-method>POST</set-method>
                    <set-header name="Content-Type" exists-action="override">
                        <value>application/json</value>
                    </set-header>
                    <set-header name="Authorization" exists-action="override">
                        <value>{{cortex-api-key}}</value>
                    </set-header>
                   <set-body>@{
                                string requestBody = context.Variables.GetValueOrDefault<string>("requestBody");
                                string responseBody = context.Response.Body.As<string>(preserveContent: true);
                                int bodySizeLimit = {{cortex-http-body-size-limit-bytes}};
                                bool requestBodySizeExceedsLimit = requestBody.Length > bodySizeLimit;
                                bool responseBodySizeExceedsLimit = responseBody.Length > bodySizeLimit;
        
                                return JsonConvert.SerializeObject(new {
                                    accountId               = "{{cloud-account-id}}",
                                    serviceId               = context.Deployment.ServiceId,
                                    requestId               = context.RequestId,
                                    url                     = context.Request.OriginalUrl,
                                    httpMethod              = context.Request.Method,
                                    requestBody             = requestBodySizeExceedsLimit ? requestBody.Substring(0, bodySizeLimit) : requestBody,
                                    requestBodyTruncated    = requestBodySizeExceedsLimit,
                                    requestHeaders          = JsonConvert.DeserializeObject(context.Variables.GetValueOrDefault<string>("requestHeaders")),
                                    timestamp               = new DateTimeOffset(context.Timestamp).ToUnixTimeMilliseconds(),
                                    requestIpAddress        = context.Request.IpAddress,
                                    statusCode              = context.Response.StatusCode,
                                    responseBody            = responseBodySizeExceedsLimit ? responseBody.Substring(0, bodySizeLimit) : responseBody,
                                    responseBodyTruncated   = responseBodySizeExceedsLimit,
                                    responseHeaders         = context.Response.Headers,
                                    region                  = context.Deployment.Region,
                                    subscription            = context.Subscription,
                                });
                            }
                    </set-body>
                </send-request>
                <!-- End of sending data to Cortex -->
        ```
        
        **Important:**
        
        If you want to add additional data to the <outbound>, add it at the start of the <outbound> code.
        
    3.  Click Save. Your APIM traffic collection is now configured.
        
        Request and response data for the configured endpoints are sent to Cortex Cloud for inspection by API security modules.
        
    
5.  Go to Azure API Management data source to validate that data is ingested from Azure APIM.
    
6.  Do the following to remove the integration of Azure APIM with Cortex Cloud:
    
    -   Remove the snippets you added to the policies.
        
    -   Remove the named values from the API service.
        
    -   Delete the HTTP log collector from Data Sources & Integrations in Cortex.

##### Ingest Apigee Proxy
**Notice:**

Requires the Data Collection add-on.

Integrate Apigee Proxy with Cortex Cloud to begin scanning the APIs for potential threats and vulnerabilities.

The integration uses the Apigee’s JavaScript (JS) policy, implemented within a shared flow and deployed as a pre-proxy and post-proxy flow-hook in selected environments. The JS policy is designed to capture both request and response data from all traffic entering and exiting the proxy.

Settings in Cortex Cloud

In Cortex Cloud, set up the Apigee data source to integrate with the Apigee Gateway.

1.  From Settings → Data Sources & Integrations , click +Add New, search for Apigee, then hover over it and click Add or Add Instance.
    
2.  In the Apigee Collector wizard, enter a relevant name and then click Create and Proceed.
    
3.  Copy the key and paste it somewhere so that you can access it for later.
    
    If you forget to record the key and close the window, you must generate a new key and repeat this process.
    
4.  Click the Download Configuration Script link to download the plugin, which you can then upload from the Apigee Gateway.
    
5.  Click Close.
    

First, download the resource file and then select the method to set up the integration with Apigee.

###### Run an automated script to deploy configurations to Apigee

Use the script for full deployment (with or without connecting a flow hook).

**Note:**

The steps include the prerequisites that run the automated script that deploys files and configurations to Apigee. For manual configuration, refer to the section Manual deployment.

1.  Edit `deploy.sh` and add values for the following:
    
    | Variable | Description |
    | --- | --- |
    | PROJECT_ID | Google project ID where Apigee is provisioned. |
    | ORG | Apigee organization. By default, this is the same as PROJECT_ID. |
    | ENV | In Apigee, from the left-side menu, click Environments and copy the name of the environment you want to use. |
    | TARGET_URL | Copy the URL for your Apigee Collector from the Custom Collectors page. For example, `https://api-{tenant external URL}/logs/v1/event.` |
    | APIsec_API_KEY | Token generated from Cortex Cloud. |
    
2.  Check that the GCP user running the script has `IAM` permissions.
    
    ```
    apigee.resourcefiles.list
    apigee.resourcefiles.create
    apigee.resourcefiles.update
    apigee.sharedflows.get
    apigee.sharedflows.create
    apigee.deployments.create
    apigee.sharedflowrevisions.deploy
    apigee.flowhooks.attachSharedFlow
    apigee.keyvaluemaps.create
    apigee.keyvaluemaps.delete
    apigee.keyvaluemapentries.create
    ```
    
3.  Run the `deploy.sh` script:
    
    ```
    chmod +x
    ./deploy.sh
    ```
    
4.  Verify that the JavaScript policies have been added to the shared flows:
    
    Go to Apigee → Proxy development → Shared Flows and check that the following policies have been added.
    
    -   `sf-api-sec-extension-postflow`
        
    -   `sf-api-sec-extension-preflow`
        
    
5.  Validate data ingestion:
    
    Send a request to the gateway and go to Apigee data source to validate that the data has been received from Apigee.
    
6.  (Optional) Exclude unwanted domains from being tracked by APIsec:
    
    1.  Uncomment: DOMAIN_EXCLUSION_LIST.
        
    2.  Add the domains to exclude.
        
    3.  Edit `deploy.sh` and set the following variables:
        
        ```
        export DOMAIN_EXCLUSION_LIST="domain1,domain2"
        ```
        
7.  Discontinue the integration:
    
    1.  Edit `undeploy.sh`:
        
        ```
        export PROJECT_ID=example-project-id
        export ORG=$PROJECT_ID
        export ENVIRONMENT=example-env
        ```
        
    2.  Run the undeploy.sh script:
        
        ```
        chmod +x
        ./undeploy.sh
        ```
        
        Go to Apigee → Proxy development → Shared Flows and check that the following policies have been removed.
        
        -   `sf-api-sec-extension-postflow`
            
        -   `sf-api-sec-extension-preflow`
            
        

###### Configure Apigee's JavaScript for manual deployment

You can customize the shared flow and apply it to an existing flow hook (pre-proxy, post-proxy).

Set up Apigee's JavaScript policy to send Apigee Collector's API data to Cortex Cloud.

**Note:**

If you have an existing hookand would like to integrate with the shared flow, run the `deploy.sh` script, and select `n`' and exit at the prompt to create a new hook. Refer to the section Connect to existing hook.

1.  Edit `panw-api-sec-extension-configuration.properties` file:
    
    -   Enter the `targetUrl` and `projectID`.
        
    -   You can update 127KB of `maxBodyInspectionSizeKB`.
        
    -   For domain exclusion, uncomment the line and add the URL to exclude.
        
        ```
        targetUrl=<Cortex collector url>
        projectID=<GCP project id of apigee>
        maxBodyInspectionSizeKB=127 // This is default 
        and can be modified if needed.
        commonBinaryContentType=audio/,video/,image/,
        application/octet-stream,application/ogg,application/
        pdf,application/zip,application/gzip,application/
        vnd.rar,application/x-7z-compressed
        #domainExclusionList=example.com,example2.com/shopping
        ```
        
    
2.  Upload the edited `property set`:
    
    1.  Get a token to upload updates via an API request. For more information, refer to [property sets](https://cloud.google.com/apigee/docs/api-platform/cache/property-sets).
        
        Input:
        
        ```
        gcloud config config-helper --force-auth-refresh --format
        ```
        
        Output:
        
        ```
        configuration:
          active_configuration: 
          properties:
            compute:
              region: 
              zone:     
        core:
              account: 
              disable_usage_reporting: 
              project: 
        credential:
          access_token: **<Copy this value>**
          id_token: 
          token_expiry: 
        sentinels:
          config_sentinel: 
        ```
        
    2.  Copy the `<access_token>` value from the output.
        
3.  Upload the `property set` to Apigee:
    
    ```
    curl --silent -X GET 
    "https://apigee.googleapis.com/v1/organizations/
    <ORG>/environments/<ENVIRONMENT>/resourcefiles/
    properties" -H 
    "Authorization: Bearer <access_token from above>"
    ```
    
4.  Generate Key Value Map (KVM), which stores the Cortex API key that's encrypted
    
    ```
    curl --silent -X POST 
    "https://apigee.googleapis.com/v1/organizations/
    <ORG>/environments/<ENVIRONMENT>/keyvaluemaps" -H 
    "Authorization: Bearer <access_token from above>" 
    -H "Content-Type: application/json" --data-raw 
    '{"name": "'"APISec-KVM"'", "encrypted": true}'
    ```
    
    If there's an error when creating the KVM because of an existing name, delete the KVM and recreate.
    
    ```
    curl --silent -X DELETE 
    "https://apigee.googleapis.com/v1/organizations/
    <ORG>/environments/<ENVIRONMENT>/keyvaluemaps/
    $APISEC_KVM_NAME" -H "Authorization: Bearer 
    <access_token from above>"
    ```
    
    Add the Cortex API key entry to the created KVM.
    
    ```
    curl --silent -X POST "https://apigee.googleapis.com/
    v1/organizations/<ORG>/environments/<ENVIRONMENT>/
    keyvaluemaps/$APISEC_KVM_NAME/entries" -H 
    "Authorization: Bearer <access_token from above>" 
    -H "Content-Type: application/json" --data-raw 
    '{"name": "api-key","value": "'"<Generated key 
    from cortex env>"'"}'
    ```
    
5.  Upload the shared flows:
    
    **Shared flows**:
    
    -   `sf-api-sec-extension-postflow`
        
    -   `sf-api-sec-extension-preflow`
        
    
    **Upload**
    
    Replace the `<sf>` with the shared flows:
    
    ```
    curl --silent -X POST --data-binary "<sf>.zip" -H 
    "Content-Type: application/octet-stream" -H 
    "Authorization: Bearer <access_token from above>" 
    "https://apigee.googleapis.com/v1/organizations/$ORG/
    sharedflows?action=import&name=<sf>"
    ```
    
    **Deploy**
    
    Input:
    
    ```
    curl --silent -X GET "https://apigee.googleapis.com/
    v1/organizations/<ORG>/sharedflows/<sf>" -H 
    "Authorization: Bearer <access_token from above>"
    ```
    
    Output:
    
    ```
    {
      "metaData": {
        "createdAt": "1736952161610",
        "lastModifiedAt": "1736952161610",
        "subType": "SharedFlow"
      },
      "name": "sf-api-sec-extension-postflow",
      "revision": [
        "1" // This is the revision number
      ],
      "latestRevisionId": "1"
    }
    ```
    
6.  Deploy `<sf>`:
    
    ```
    curl --silent -X POST -H "Authorization: 
    Bearer <access_token from above>" 
    "https://apigee.googleapis.com/
    v1/organizations/$ORG/environments/<ENVIRONMENT>/
    sharedflows/$sf/revisions/<REVISION>/
    deployments?override=true"
    ```
    
7.  Verify API security shared flows were created:
    
    Go to Apigee → Proxy development → Shared Flows and check that the following policies have been added.
    
    -   `sf-api-sec-extension-postflow`
        
    -   `sf-api-sec-extension-preflow`
        
    

###### Connect to an existing hook

Follow the steps if you have an existing hook and would like to integrate with a shared flow.

1.  Check for existing flow hooks.
    
    1.  Go to Apigee → Management → Environments and select the environment to hook the shared flow.
        
    2.  In the Flow Hooks tab, select the relevant flow hook.
        
2.  Configure policy for shared flow to the existing hook.
    
    1.  Go to Apigee → Proxy development → Shared Flows and select the flow hook from the relevant environment.
        
        **Note:**
        
        Start with the hook in pre-proxy.
        
    2.  From the Develop tab, expand Policies and select Flow Callout.
        
    3.  Enter a meaningful name and select the Sharedflow: `sf-api-sec-extension-preflow` , and then click Create.
        
    4.  From the Develop tab, select Shared flows and expand Default.
        
    5.  From Select policy, select Select existing policy, and select the policy just created and then click Add.
        
    6.  Repeat the previous steps for the post-proxy hook. Select the Sharedflow: `sf-api-sec-extension-postflow`.
        
    7.  Click Save and Deploy.
        
    
    The steps automatically run without linking to the hooks.
    
    **Important:**
    
    This should only be done when there are already existing hooks, and API security shared flows can't be hooked as a standalone. Run the deployment script, but skip step 9 by passing `n`. This step publishes API security shared flows to the desired Apigee environment without setting them to flow hooks.
    
3.  Limitations:
    
    -   The API security extension deployment scripts currently do not support archive-deployment Apigee environments. Refer to [Manage archive deployment](https://cloud.google.com/apigee/docs/api-platform/deploy/manage-archive-deployments) for more information.
        
        **Note:**
        
        Archive deployments are currently in preview and are subject to change.
        
    -   The API security extension for Apigee relies on flow-hooks, which are available only with Intermediate or Comprehensive Apigee Environment types. Refer to [Environments](https://cloud.google.com/apigee/docs/api-platform/fundamentals/environments-overview#environment-types) for more information.
        
    -   For requests/responses with binary payloads, the binary payload is not sent to the collector for analysis; only the metadata (for example, HTTP headers, query parameters, etc.) is sent.

##### Ingest Kong
**Notice:**

Requires the Data Collection add-on.

Integrate Kong with Cortex Cloud to start scanning its APIs for potential threats and vulnerabilities.

You need to integrate a dedicated Kong HTTP log plugin. This plugin enables seamless traffic ingestion from your Kong API gateway to Cortex Cloud, allowing for comprehensive security measures such as OWASP Top-10, bot detection, access control, and more.

Settings in Cortex Cloud

In Cortex Cloud, set up the Kong data source to integrate with the Kong API Gateway.

1.  From Settings → Data Sources & Integrations, click \+ Add New, search for Kong, then hover over it and click Add or Add Instance.
    
2.  In the Kong Collector wizard, enter a relevant name and then click Create and Proceed.
    
3.  Copy the key and paste it somewhere so that you can access it later.
    
    If you forget to record the key and close the window, you must generate a new key and repeat this process.
    
4.  Click the Download Custom Plugin link to download the plugin, which you can then upload from the Kong API Gateway.
    
5.  Click Close.
    

Follow the steps to integrate Kong's API gateway with Cortex Cloud.

###### Download the Cortex custom plugin

Download the custom plugin gzip file. The file includes the `handler.lua`, `utils.lua`, and `schema.lua` files that make up the custom plugin.

**Note:**

Contact support to obtain the custom plugin file.

###### Provision Kong API gateway with the custom plugin

To deploy the custom plugin, refer to the Kong API documentation online:

-   [Kong Gateway](https://docs.konghq.com/gateway/latest/plugin-development/distribution/)
    
-   [Kong Konnect](https://docs.konghq.com/konnect/gateway-manager/plugins/add-custom-plugin/)
    
-   [Kong Ingress Controller](https://docs.konghq.com/kubernetes-ingress-controller/latest/plugins/custom/)
    

Example 127. Kong as docker container

1.  Add the plugin by mounting the plugin directory, adding it to the `Lua` package path variable, and then adding the plugin name to Kong’s plugin list variable.
    
    This can be done by passing the following arguments to the `docker run` command, assuming `./plugin_directory/kong` is the directory containing the `plugins/panw-apisec-http-log/ directory`.
    
    ```
    \-v "./plugin_directory/kong:/tmp/custom_plugins/kong" \\
    -e "KONG_LUA_PACKAGE_PATH=/tmp/custom_plugins/?.lua;;" \\
    -e "KONG_PLUGINS=bundled,panw-apisec-http-log"
    ```
    
    You may want to adjust the size of the nginx body buffer which is used by Kong internally. This size sets the upper limit on the amount of HTTP body bytes that can be mirrored by the plugin. By default, this value is 8192 bytes (8 KB). To change it, another argument can be passed to the docker - for example, setting it to 128 KB:
    
    ```
    \-e "KONG_NGINX_HTTP_CLIENT_BODY_BUFFER_SIZE=128k"
    ```
    
    See [https://nginx.org/en/docs/syntax.html](http://%20https://nginx.org/en/docs/syntax.html) for information on the allowed values of this variable.
    
    **Important:**
    
    The size of the buffer must be equal or larger than the **max body size** setting in the plugin configuration, on every data plane node.
    
2.  To verify that the plugin is installed, query Kong’s Admin API using the following command:
    
    ```
    curl admin-api-hostname:8001 | jq .configuration.loaded_plugins.'"panw-apisec-http-log"'
    ```
    
    This prints **true** to the terminal if the plugin is loaded into the Kong instance.
    

  

###### Add and configure the custom plugin

Add and configure the plugin.

1.  From the Kong Manager menu, go to Plugins.
    
2.  From the Plugins page, scroll down to the Custom Plugins section.
    
3.  Select panw-apisec-http-log and click Edit to configure the panw-apisec-http-log plugin settings.
    
    | Configuration | Description | Example |
    | --- | --- | --- |
    | Protocols | The request protocols the plugin will be applied to. | Either http, https, or both |
    | Cloud Context | Cloud context, such as AWS Account ID, GCP Project ID, Azure Subscription or an appropriate value for on-prem. | 987654321000 |
    | Cloud Provider | Cloud provider where Kong API Gateway is installed. | AWS. |
    | Cloud Region | Cloud region. | us-east-2 |
    | Cloud API Key | The collector authorization key provided by the Cortex platform. |  |
    | HTTP Endpoint | The Cortex collector's endpoint URL. |  |
    
4.  Click the View Advanced Parameters to configure optional settings.
    
    **Note:**
    
    The queue parameters can be updated to change when the plugin mirrors data to Cortex.
    
    | Configuration | Description | Example |
    | --- | --- | --- |
    | Instance Name | A custom name for this plugin instance. This is useful when applying different instances to different scopes. | Empty |
    | Tags | An optional set of strings for grouping and filtering, \*\*Note:\*\* Use commas to separate tags. | Empty |
    | Keepalive | An optional value in milliseconds that defines how long an idle connection will live before being closed. | 60000 (60 seconds) |
    | Timeout | An optional timeout in milliseconds when sending data to Cortex. | 10000 (10 seconds) |
    | Max body size | The maximum body size to mirror in bytes (for example: 1024 is 1KB). Any bytes beyond this size are omitted from the request and response bodies. Must be <= 4 MB and <= the value of Kong's nginx_http_client_body_buffer_size setting. | 131072 (128 KB), or the nginx body buffer size if it’s smaller. |
    | Queue Concurrency Limit | The number of queue delivery timers. -1 indicates unlimited. | 1 |
    | Queue.Initial Retry Delay | Time in seconds before the initial retry is made for a failing batch. | 0.01 (10 milliseconds) |
    | Queue.Max Batch Size | Maximum number of entries that can be processed at a time. | 1 |
    | Queue.Max Bytes | Maximum number of bytes that can be waiting in a queue, requires string content | Unlimited |
    | Queue.Max Coalescing Delay | Maximum number of (fractional) seconds to elapse after the first entry was queued before the queue starts calling the handler. | 1 |
    | Queue.Max Entries | Maximum number of entries that can be waiting in the queue. | 10000 |
    | Queue.Max Retry Delay | Maximum time in seconds between retries, caps exponential backoff. | 60 |
    | Queue.Max Retry Time | Time in seconds before the queue gives up calling a failed handler for a batch. | 60 |
    
5.  Go to Kong data source to validate that data is ingested from the Kong API Gateway.
    

###### Limitations

-   The plugin supports HTTP and HTTP/S protocols.
    
-   The plugin supports Kong API Gateway version 3.4.x and above.
    
-   The nginx body buffer size on each data plane node must be equal or larger than the max body size setting.
    
-   Request and response bodies will not be mirrored if their size exceeds the nginx body buffer size. When this occurs, it is indicated in the metadata that is sent to Cortex along with the HTTP transaction data.
    
-   The mirrored response body is the body returned from the upstream service. This means that changes made to the response body by other plugins, is not reflected in the mirrored data.

##### Ingest-F5
**Notice:**

Requires the Data Collection add-on.

Integrate F5 with Cortex Cloud to start scanning its APIs for potential threats and vulnerabilities.

You need to integrate a dedicated F5 log plugin. This plugin enables seamless traffic ingestion from your F5 gateway to Cortex Cloud, allowing for comprehensive security measures such as OWASP Top-10, bot detection, access control, and more.

###### Settings in Cortex Cloud

In Cortex Cloud, set up the F5 data source to integrate with the F5 API Gateway.

1.  From Settings → Data Sources & Integrations , click \+ Add New, search for F5 BIG-IP LTM , then hover over it and click Add or Add Instance.
    
2.  In the F5 BIG-IP LTM Collector wizard, enter a relevant name and then click Create and Proceed.
    
3.  Copy the key and paste it somewhere so that you can access it for later.
    
    If you forget to record the key and close the window, you must generate a new key and repeat this process.
    
4.  Click the Download iRules LX Plugin link to download the plugin to upload it from the F5 Gateway.
    
5.  Click Close.
    

###### Settings in F5 BIG-IP LTM

1.  Log in to your F5 environment.
    
2.  Verify that the following is configured:
    
    Navigate to System → Resource Provisioning and enable iRules Language Extensions (iRulesLX) . Check Provisioning and set to Nominal.
    
3.  Navigate to Local Traffic → iRules → LX Workspaces and follow the steps under the relevant tab:
    
    **LX Workspaces**:
    
    -   Click Import. In the General Properties page, enter a Name and for Source, select apisec_bigip_plugin_tar.gz .
        
        **Note:**
        
        Extract the files from the F5 plugin to a folder before selecting to upload to F5.
        
    -   In the General Properties page, enter:
        
        -   Name: Enter the name panw_apisec_workspace.
            
        -   Source: Select apisec_bigip_plugin_tar.gz.
            
        
    -   Select Import to import the plugin.
        
    
    **LX Plugins**:
    
    -   Click Create.
        
    -   In the General Properties page, enter:
        
        -   Name: Enter panw_apisec_plugin.
            
        -   From Workspace: Select panw_apisec_workspace.
            
        
    -   Click Finished.
        
    
4.  Navigate to System → File Management → Data Group File List → Import.
    
    -   From File Name, select the panw_apisec_config.txt file that was extracted from the zip that was downloaded from Cortex Cloud.
        
    -   In the Name field, select Create New and enter panw_apisec_config.
        
    -   From File Contents, select String.
        
    -   For Data Group Name, enter panw_apisec_config.
        
    -   Click Import.
        
    
5.  Navigate to System → File Management → Data Group File List.
    
    -   Click panw_apisec_config.
        
    -   In Definition, fill in the values for the following:
        
        ```
        "context_account_id" := "",
        "context_provider" := "",
        "context_region" := "",
        "cortex_collector_key" := "",
        "cortex_collector_url" := "",
        ```
        
        -   Paste the F5 VIG-IP LTM Collector key you copied from Cortex Cloud in the `"cortex_collector_key"`.
            
        -   From Cortex Cloud, go to Data Sources & Integrations and from F5 BIG_IP LTM , copy the API URL and paste it in the `"cortex_collector_url"`.
            
            
            
        -   The `context_account_id`, `context_provider`, and `context_region` depend on the cloud environment. In this instance, AWS is the example:
            
            **Note:**
            
            -   The provider for `"context_provider"` should always be uppercase.
                
            -   Supported providers: AWS, GCP, Azure, On-prem.
                
            
            ```
            "context_account_id" := "12345",
            "context_provider" := "AWS",
            "context_region" := "us-east-2",
            "cortex_collector_key" := "collector key",
            "cortex_collector_url" := "API URL",
            ```
            
        -   Click Update.
            
        
    
6.  Navigate to Local Traffic → Virtual Servers → Virtual Server List . The virtual server functions as an API Gateway, handling all incoming and outgoing requests and responses, then forwarding that data to the Cortex Cloud collector.
    
    -   From the virtual server that serves as the gateway, click Edit.
        
    -   In the Resources tab, under iRules, click Manage.
        
    -   From the Available list, navigate to /Common/panw_apisec_plugin and select panw_apisec_data_collection and panw_apisec_set_ssl_data , and then click the left arrow button to move them to the Enabled list.
        
        **Note:**
        
        Select panw_apisec_set_ssl_data only if your client SSL profile is enabled.
        
    -   Click Finished.
        
    -   Click the Properties tab.
        
    
7.  Test the request/response and verify that the logs are sent to Cortex Cloud. This can be verified by checking that the counter has increased. The scanned API endpoint metadata from f5-bigip is ready for investigation in the API inventory.

### Azure Event Hub

Learn more about the Azure Event Hub standard data source and content pack in Cortex Cloud.

You can configure collecting Azure Event Hub logs using a standard data source or with a content pack:

| Azure Event Hub vendor | Description |
| --- | --- |
| Standard data source overview | Forward different types of logs to Cortex Cloud from Azure Event Hub using the Microsoft Azure Event Hub data source. |
| Link to standard data source instructions | The following types of logs can be ingested from Azure Event Hub: Activity logs; Azure Active Directory (AD) Activity logs and Azure Sign-in logs; Resource logs, including AKS audit logs For more information, see Ingest logs from Microsoft Azure Event Hub. |
| Link to content pack details | [Azure Logs](https://cortex.marketplace.pan.dev/marketplace/details/MicrosoftEntraID): Use this content pack to ingest and normalize various Azure logs to the Cortex Data Model (XDM) schema, including Azure Entra ID events ingested via the Office 365 data source, and Azure Logs ingested via the Microsoft Azure Event Hub data source. It includes modeling and parsing rules for log normalization. |

#### Ingest logs from Microsoft Azure Event Hub

Ingest logs from Microsoft Azure Event Hub with an option to ingest audit logs to use in Cortex Cloud authentication stories.

**Notice:**

Requires the Data Collection add-on.

Cortex Cloud can ingest different types of data from Microsoft Azure Event Hub using the Microsoft Azure Event Hub data collector. To receive logs from Azure Event Hub, you must configure the settings in Cortex Cloud based on your Microsoft Azure Event Hub configuration. After you set up data collection, Cortex Cloud begins receiving new logs and data from the source.

When Cortex Cloud begins receiving logs, the app creates a new dataset (`MSFT_Azure_raw`) that you can use to initiate XQL Search queries. For example, queries refer to the in-app XQL Library. For enhanced cloud protection, you can also configure Cortex Cloud to normalize Azure Event Hub audit logs, including Azure Kubernetes Service (AKS) audit logs, with other Cortex Cloud authentication stories across all cloud providers using the same format, which you can query with XQL Search using the `cloud_audit_logs` dataset. For logs that you do not configure Cortex Cloud to normalize, you can change the default dataset. Cortex Cloud can also generate Cortex Cloud issues (Analytics, IOC, BIOC, and Correlation Rules) when relevant from Azure Event Hub logs. While Correlation Rules issues are generated on non-normalized and normalized logs, Analytics, IOC, and BIOC issues are only raised on normalized logs.

Enhanced cloud protection provides:

-   Normalization of cloud logs
    
-   Cloud logs stitching
    
-   Enrichment with cloud data
    
-   Detection based on cloud analytics
    
-   Cloud-tailored investigations
    

**Warning:**

-   Misconfiguration of Event Hub resources could cause ingestion delays.
    
-   In an existing Event Hub integration, do not change the mapping to a different Event Hub.
    
-   Do not use the same Event Hub for more than two purposes.
    

The following table provides a brief description of the different types of Azure audit logs you can collect.

**Note:**

For more information on Azure Event Hub audit logs, see [Overview of Azure platform logs](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/platform-logs-overview).

| Type of data | Description |
| --- | --- |
| Activity logs | Retrieves events related to the operations on each Azure resource in the subscription from the outside in addition to updates on Service Health events. \*\*Note:\*\* These logs are from the management plane. |
| Azure Active Directory (AD) Activity logs and Azure Sign-in logs | Contain the history of sign-in activity and audit trail of changes made in Azure AD for a particular tenant. \*\*Note:\*\* Even though you can collect Azure AD Activity logs and Azure Sign-in logs using the Azure Event Hub data collector, we recommend using the Microsoft Office 365 data collector, because it is easier to configure. In addition, ensure that you do not configure both collectors to collect the same types of logs, because if you do so, you will be creating duplicate data in Cortex Cloud. |
| Resource logs, including AKS audit logs | Retrieves events related to operations that were performed within an Azure resource. \*\*Note:\*\* These logs are from the data plane. |

**Prerequisite:**

Ensure that you do the following tasks before you begin configuring data collection from Azure Event Hub.

-   Before you set up an Azure Event Hub, calculate the quantity of data that you expect to send to Cortex Cloud, taking into account potential data spikes and potential increases in data ingestion, because partitions cannot be modified after creation. Use this information to ascertain the optimal number of partitions and Throughput Units (for Azure Basic or Standard) or Processing Units (for Azure Premium). Configure your Event Hub accordingly.
    
-   Create an Azure Event Hub. We recommend using a dedicated Azure Event Hub for this Cortex Cloud integration. For more information, see [Quickstart: Create an event hub using Azure portal](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-create).
    
-   Each partition can support a throughput of up to 1 MB/s.
    
-   Ensure the format for the logs you want collected from the Azure Event Hub is either JSON or raw.
    

Configure the Azure Event Hub collection in Cortex Cloud:

1.  In the Microsoft Azure console, open the Event Hubs page, and select the Azure Event Hub that you created for collection in Cortex Cloud.
    
2.  Record the following parameters from your configured event hub, which you will need when configuring data collection in Cortex Cloud.
    
    -   Your event hub’s consumer group.
        
        1.  Select Entities → Event Hubs, and select your event hub.
            
        2.  Select Entities → Consumer groups, and select your event hub.
            
        3.  In the Consumer group table, copy the applicable value listed in the Name column for your Cortex Cloud data collection configuration.
            
        
    -   Your event hub’s connection string for the designated policy.
        
        1.  Select Settings → Shared access policies.
            
        2.  In the Shared access policies table, select the applicable policy.
            
        3.  Copy the Connection string-primary key.
            
        
    -   Your storage account connection string required for partitions lease management and checkpointing in Cortex Cloud.
        
        1.  Open the Storage accounts page, and either create a new storage account or select an existing one, which will contain the storage account connection string.
            
        2.  Select Security + networking → Access keys, and click Show keys.
            
        3.  Copy the applicable Connection string.
            
        
    
3.  Configure diagnostic settings for the relevant log types you want to collect and then direct these diagnostic settings to the designated Azure Event Hub.
    
    1.  Open the Microsoft Azure console.
        
    2.  Your navigation is dependent on the type of logs you want to configure.
        
        | Log type | Navigation path |
        | --- | --- |
        | Activity logs | Select Azure services → Activity log → Export Activity Logs, and +Add diagnostic setting. |
        | Azure AD Activity logs and Azure Sign-in logs | Select Azure services → Azure Active Directory.; Select Monitoring → Diagnostic settings, and +Add diagnostic setting. |
        | Resource logs, including AKS audit logs | Search for Monitor, and select Settings → Diagnostic settings.; From your list of available resources, select the resource that you want to configure for log collection, and then select +Add diagnostic setting. \*\*Note:\*\* For every resource that you want to confiure, you'll have to repeat this step, or use [Azure policy](https://learn.microsoft.com/en-us/azure/governance/policy/overview) for a general configuration. |
        
    3.  Set the following parameters:
        
        -   Diagnostic setting name: Specify a name for your Diagnostic setting.
            
        -   Logs Categories/Metrics: The options listed are dependent on the type of logs you want to configure. For Activity logs and Azure AD logs and Azure Sign-in logs, the option is called Logs Categories, and for Resource logs it's called Metrics.
            
            | Log type | Log categories/metrics |
            | --- | --- |
            | Activity logs | Select from the list of applicable Activity log categories, the ones that you want to configure your designated resource to collect. We recommend selecting all of the options. Administrative; Security; ServiceHealth; Alert; Recommendation; Policy; Autoscale; ResourceHealth |
            | Azure AD Activity logs and Azure Sign-in logs | Select from the list of applicable Azure AD Activity and Azure Sign-in Logs Categories, the ones that you want to configure your designated resource to collect. You can select any of the following categories to collect these types of Azure logs. Azure AD Activity logs:-   AuditLogs
            ; Azure Sign-in logs:-   SignInLogs; NonInteractiveUserSignInLogs; ServicePrincipalSignInLogs; ManagedIdentitySignInLogs; ADFSSignInLogs
            \*\*Note:\*\* There are additional log categories displayed. We recommend selecting all the available options. |
            | Resource logs, including AKS audit logs | The list displayed is dependent on the resource that you selected. We recommend selecting all the options available for the resource. |
            
        -   Destination details: Select Stream to event hub, where additional parameters are displayed that you need to configure. Ensure that you set the following parameters using the same settings for the Azure Event Hub that you created for the collection.
            
            -   Subscription: Select the applicable Subscription for the Azure Event Hub.
                
            -   Event hub namespace: Select the applicable Subscription for the Azure Event Hub.
                
            -   (Optional) Event hub name: Specify the name of your Azure Event Hub.
                
            -   Event hub policy: Select the applicable Event hub policy for your Azure Event Hub.
                
            
        
    4.  Save your settings.
        
4.  Configure the Azure Event Hub collection in Cortex Cloud.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  On the Data Sources & Integrations page, click \+ Add New, search for Azure Event Hub, then hover over it and click Add.
        
    3.  Set these parameters.
        
        -   Name: Specify a descriptive name for your log collection configuration.
            
        -   Event Hub Connection String: Specify your event hub’s connection string for the designated policy.
            
        -   Storage Account Connection String: Specify your storage account’s connection string for the designated policy.
            
        -   Consumer Group: Specify your event hub’s consumer group.
            
        -   Log Format: Select the log format for the logs collected from the Azure Event Hub as Raw, JSON, CEF, LEEF, Cisco-asa, or Corelight.
            
            **Note:**
            
            When you Normalize and enrich audit logs, the log format is automatically configured. As a result, the Log Format option is removed and is no longer available to configure (default).
            
            -   CEF or LEEF: The Vendor and Product defaults to Auto-Detect.
                
                **Note:**
                
                For a Log Format set to CEF or LEEF, Cortex Cloud reads events row by row to look for the Vendor and Product configured in the logs. When the values are populated in the event log row, Cortex Cloud uses these values even if you specified a value in the Vendor and Product fields in the Azure Event Hub data collector settings. Yet, when the values are blank in the event log row, Cortex Cloud uses the Vendor and Product that you specified in the Azure Event Hub data collector settings. If you did not specify a Vendor or Product in the Azure Event Hub data collector settings, and the values are blank in the event log row, the values for both fields are set to unknown.
                
            -   Cisco-asa: The following fields are automatically set and not configurable.
                
                -   Vendor: Cisco
                    
                -   Product: ASA
                    
                
                Cisco data can be queried in XQL Search using the `cisco_asa_raw` dataset.
                
            -   Corelight: The following fields are automatically set and not configurable.
                
                -   Vendor: Corelight
                    
                -   Product: Zeek
                    
                
                Corelight data can be queried in XQL Search using the `corelight_zeek_raw` dataset.
                
            -   Raw or JSON: The following fields are automatically set and are configurable.
                
                -   Vendor: Msft
                    
                -   Product: Azure
                    
                
                Raw or JSON data can be queried in XQL Search using the `msft_azure_raw` dataset.
                
            
        -   Vendor and Product: Specify the Vendor and Product for the type of logs you are ingesting.
            
            The Vendor and Product are used to define the name of your Cortex Query Language (XQL) dataset (`<vendor>_<product>_raw`). The Vendor and Product values vary depending on the Log Format selected. To uniquely identify the log source, consider changing the values if the values are configurable.
            
            **Note:**
            
            When you Normalize and enrich audit logs, the Vendor and Product fields are automatically configured, so these fields are removed as available options (default).
            
        -   Normalize and enrich audit logs: (Optional) For enhanced cloud protection, you can Normalize and enrich audit logs by selecting the checkbox (default). If selected, Cortex Cloud normalizes and enriches Azure Event Hub audit logs with other Cortex Cloud authentication stories across all cloud providers using the same format. You can query this normalized data with XQL Search using the `cloud_audit_logs` dataset.
            
        
    4.  Click Test to validate access, and then click Enable.
        
        When events start to come in, a green check mark appears underneath the Azure Event Hub configuration with the amount of data received.

### BeyondTrust Privilege Management Cloud

Learn more about collecting BeyondTrust Privilege Management Cloud logs using a standard data source in Cortex Cloud.

You can configure collecting BeyondTrust Privilege Management Cloud logs using a standard data source:

| BeyondTrust Privilege Management Cloud vendor | Description |
| --- | --- |
| Standard data source overview | Forward logs to Cortex Cloud from BeyondTrust Privilege Management Cloud using an Amazon S3 data source for a generic log type using the Beyondtrust Cloud ECS log format. |
| Link to standard data source instructions | Ingest logs from BeyondTrust Privilege Management Cloud |

#### Ingest logs from BeyondTrust Privilege Management Cloud

Extend Cortex Cloud visibility into logs from BeyondTrust Privilege Management Cloud.

If you use BeyondTrust Privilege Management Cloud, you can take advantage of Cortex Cloud investigation and detection capabilities by forwarding your logs to Cortex Cloud. This enables Cortex Cloud to help you expand visibility into computer, activity, and authorization requests in the organization, correlate and detect access violations, and query BeyondTrust Endpoint Privilege Management logs using XQL Search.

When Cortex Cloud starts to receive logs, Cortex Cloud can analyze your logs in XQL Search and you can create new Correlation Rules.

To integrate your logs, you first need to configure SIEM settings and an AWS S3 Bucket according to the specific requirements provided by BeyondTrust. You can then configure data collection in Cortex Cloud by configuring an Amazon S3 data collector for a generic log type using the Beyondtrust Cloud ECS log format.

Before you begin configuring data collection verify that you are using BeyondTrust Privilege Management Cloud version 21.6.339 or later.

Configure BeyondTrust Privilege Management Cloud collection in Cortex Cloud.

1.  Configure SIEM settings and an AWS S3 Bucket according to the requirements provided in the [BeyondTrust documentation](https://docs.beyondtrust.com/epm-wm/docs/configure-siem-settings).
    
    Ensure that when you add the AWS S3 bucket in the PMC and set the SIEM settings, you select ECS - Elastic Common Schema as the SIEM Format.
    
2.  Configure BeyondTrust logs collection with Cortex Cloud using an Amazon S3 data collector for generic dataIngest generic logs from Amazon S3.
    
    Ensure your Amazon S3 data collector is configured with the following settings.
    
    -   Log Type: Select Generic to configure your log collection to receive generic logs from Amazon S3.
        
    -   Log Format: Select the log format type as Beyondtrust Cloud ECS.
        
        **Note:**
        
        For a Log Format set to Beyondtrust Cloud ECS, the following fields are automatically set and not configurable.
        
        -   Vendor: Beyondtrust
            
        -   Product: Privilege Management
            
        -   Compression: Uncompressed
            
        
    
3.  After Cortex Cloud begins receiving data from BeyondTrust Privilege Management Cloud, you can use XQL Search to search your logs using the `beyondtrust_privilege_management_raw` dataset that you configured when setting up your Amazon S3 data collector.

### Box

Learn more about the Box standard data source and content pack integrations in Cortex Cloud.

You can configure collecting Box logs and data using a standard data source or with a content pack integration:

| Box vendor | Description |
| --- | --- |
| Standard data source overview | Forward different types of data from Box enterprise accounts to Cortex Cloud using the Box data source. |
| Link to standard data source instructions | The following types of data can be ingested from Dropbox: Events and security alerts- Events (admin_logs); Box Shield Alerts ; Directory and metadata- Users; Groups For more information, see Ingest logs and data from Box. |
| Links to content pack integration details | The [Box](https://cortex.marketplace.pan.dev/marketplace/details/Box) content pack contains classifiers, issue fields and types, and parsing and modeling rules to normalize Box data in Cortex Cloud. It also includes the following integrations: [Box Event Collector](https://xsoar.pan.dev/docs/reference/integrations/box-events-collector): Use this integration to collect events from Box's logs. It includes a command to get Box events.; [Box V2](https://xsoar.pan.dev/docs/reference/integrations/box-v2): Use this integration to manage Box users. It includes commands to search Box content and manage file folders and share links. |

#### Ingest logs and data from Box

Learn more about ingesting logs and data from Box enterprise accounts via the Box REST APIs.

**Notice:**

Requires the Data Collection and Identity Threat Detection & Response add-ons.

Cortex Cloud can ingest different types of data from Box enterprise accounts using the Box data collector. To receive logs and data from Box enterprise accounts via the Box REST APIs, you must configure the settings in Cortex Cloud based on your Box enterprise account credentials. After you set up data collection, Cortex Cloud begins receiving new logs and data from the source.

When Cortex Cloud begins receiving logs, the app creates a new dataset for the different types of data that you are collecting, which you can use to initiate XQL Search queries. For example queries, refer to the in-app XQL Library. For all logs, Cortex Cloud can generate Cortex Cloud issues (Analytics, Correlation Rules, IOC, and BIOC), when relevant, from Box logs. While Correlation Rules issues are generated on non-normalized and normalized logs, Analytics, IOC, and BIOC issues are only generated on normalized logs.

The following table provides a brief description of the different types of data you can collect, the collection method and fetch interval for new data collected, the name of the dataset to use in Cortex Cloud to query the data using XQL Search, and whether the data is normalized.

**Note:**

The Fetch Intervals are non-configurable.

| Type of data | Description | Collection method | Fetch interval | Dataset name | Normalized data |
| --- | --- | --- | --- | --- | --- |
| **Events and security alerts** |
| Events (admin_logs) | Retrieves events related to file/folder management, permission changes, access and login activities, user/groups management, folder collaboration, file/folder sharing, security settings changes, tasks, permission changes on folders, storage expiration and data retention, and workflows. | Appends data | 60 seconds | `box_admin_logs_raw` | When relevant, Cortex Cloud normalizes SaaS audit event logs into stories, which are collected in a dataset called `saas_audit_logs`. |
| Box Shield Alerts | Retrieves security alerts related to suspicious locations, suspicious sessions, anomalous download, and malicious content. \*\*Note:\*\* Collecting Box Shield Alerts requires implementing [Box Shield](https://www.box.com/shield), | Appends data | 60 seconds | `box_shield_alerts_raw` | — |
| **Directory and metadata** |
| Users | Lists user data. | Overwrites data | 10 minutes | `box_users_raw` | — |
| Groups | Lists user group data. | Overwrites data | 10 minutes | `box_groups_raw` | — |

**Prerequisite:**

1.  Set up an [Enterprise](https://www.box.com/pricing) Box plan.
    
    **Important:**
    
    To collect Box Shield Alerts, you must purchase [Box Shield](https://www.box.com/shield) and it must be enabled on Box enterprise.
    
2.  Create a valid Box account that is assigned to a role with sufficient permissions for the data you want to collect. For example, create an account assigned to an Admin role to enable Cortex Cloud to collect all metadata for all files, folders, and enterprise events for the entire organization.
    
3.  Enable two-factor authentication for the Box account. For more information, see the [Box documentation](https://support.box.com/hc/en-us/articles/360043697154-Two-Factor-Authentication-Set-Up-for-Your-Account).
    

Configure Cortex Cloud to receive logs and data from Box.

1.  Complete the prerequisites mentioned above for your Box enterprise account.
    
2.  Create a new app in your Box account.
    
    1.  Log in to your Box account, and in the [Dev Console](https://account.box.com/login?redirect_url=%2Fdevelopers%2Fconsole), click Create New App.
        
    2.  Select Custom App.
        
    3.  Set these settings in the Custom App dialog:
        
        -   Select Server Authentication (Client Credentials Grant).
            
        -   Specify an App Name.
            
        -   Click Create App.
            
        
        The new app is created and the opened in the Configuration tab.
        
    4.  In the Configuration tab of the new app, scroll down to the following sections and configure the app.
        
        -   In the App Access Level section, select App + Enterprise Access.
            
        -   In the Application Scopes section, set the following Administrative Action permissions depending on the type of data you want to collect.
            
            | Administrative action | Data type |
            | --- | --- |
            | Manage users | Users |
            | Manage groups | Groups \*\*Note:\*\* There is a current bug with the Groups API from Box. If you don't configure the Box app with the proper permissions for managing groups data, the Groups API from Box won't return an error message to Cortex Cloud indicating that the API failed to receive the data, and the Groups data will not be collected. |
            | Manage enterprise properties | Events (admin_logs); Box Shield Alerts |
            
        
        Once completed, scroll up in the tab to Save Changes.
        
    5.  In the Authorization tab, click Review and Submit to send your changes to the administrator for approval.
        
        In the Review App Authorization Submission dialog that is displayed, you can add a Description of the app changes, and then click Submit.
        
3.  Ensure the new app changes are approved by an administrator in the Admin Console of the Box account.
    
    1.  Select Apps → Customer Apps Manager → Server Authentication Apps.
        
    2.  In the table, look for the Name of the Box app with the changes, where the Authorization Status is set to Pending Authorization, and select the options menu → Authorize App.
        
    3.  Click Authorize.
        
    
    **Note:**
    
    For any future change that you make to your Box app, ensure that you send the changes for approval to the administrator, who will need to approve them as explained above.
    
4.  Navigate to Settings → Data Sources & Integrations.
    
5.  On the Data Sources & Integrations page, click \+ Add New, search for Box, then hover over it and click Add.
    
6.  Set the following parameters, where some values require you to log in to your Box account to copy and paste the values to the applicable fields:
    
    -   Name: Specify a descriptive name for this Box instance.
        
    -   Enterprise ID: Specify the unique identifier for your organization's Box instance, which is used to access the token request. This field can't be edited once the Box data collector instance is created.
        
        You can retrieve this value from your Box account in the the General Settings tab, and scrolling to the App Info section. Copy the Enterprise ID and paste it in this field in Cortex Cloud.
        
    -   Client ID: Specify the client ID or API key for the Box app you created.
        
        You can retrieve this value from your Box account in the Configuration tab, and scrolling down to the OAuth 2.0 Credentials section. COPY the Client ID and paste it into this field in Cortex Cloud.
        
    -   Client Secret: The client secret or API secret fort he Box app you created.
        
        You can retrieve this value from your Box account in the Configuration tab, and scrolling down to the OAuth 2.0 Credentials section. Click Fetch Client Secret, where you will need to authenticate yourself according to the two-factor authentication method defined in your Box app before the Client Secret is displayed. Copy this value and paste it in this field in Cortex Cloud.
        
    -   Collect: Select the types of data you want to collect from Box. All the options are selected by default.
        
        -   Events and security alerts
            
            -   Events (admin_logs): Collects events related to file/folder management, permission changes, access and login activities, user/groups management, folder collaboration, file/folder sharing, security settings changes, tasks, permission changes on folders, storage expiration and data retention, and workflows.
                
            -   Box Shield Alerts: Collects security alerts related to suspicious locations, suspicious sessions, anomalous download, and malicious content.
                
            
        -   Directory and metadata
            
            **Note:**
            
            Inventory data snapshots are collected every 10 minutes.
            
            -   Users: Collects user data.
                
            -   Groups: Collects user group data.
                
            
        
    
7.  To test the connection settings, click Test.
    
8.  If the test is successful, click Enable to enable Box log collection.
    
    When events start to come in, a green check mark appears underneath the Box configuration.

### Check Point FW1/VPN1

Learn more about collecting Check Point FW1/VPN1 logs using a Syslog Collector applet and content pack integration in Cortex Cloud.

You can configure collecting Check Point FW1/VPN1 logs using a Broker VM Syslog Collector applet or with a content pack integration:

| Check Point FW1/VPN1 vendor | Description |
| --- | --- |
| Syslog Collector applet overview | If you use Check Point FW1/VPN1 firewalls, you can forward Check Point firewall logs to Cortex Cloud using the Broker VM Syslog Collector applet in a CEF format. |
| Link to Syslog Collector applet instructions | Ingest logs from Check Point firewalls |
| Link to content pack/integration details | The [Check Point Firewall](https://cortex.marketplace.pan.dev/marketplace/details/CheckpointFirewall/) content pack manages Check Point firewall devices via API, allowing the reading information, sending commands, and orchestrating configuration and blocking actions. It contains a modeling rule (**`CheckPoint Firewall Collection`**) and several playbooks (for example Checkpoint - Block IP - Append Group, Checkpoint - Publish&Install configuration, Checkpoint - Block IP - Custom Block Rule, and Checkpoint - Block URL). It also includes the following integration: [CheckPoint Firewall v2](https://xsoar.pan.dev/docs/reference/integrations/check-point-firewall-v2): Use this integration to read information and send commands to the Check Point Firewall server. It includes commands for handling threat protection and profiles, such as **`checkpoint-set-threat-protection`** and **`checkpoint-add-threat-profile`**. |

### Cisco ASA firewalls and AnyConnect

Learn more about collecting Cisco ASA firewall and AnyConnect VPN logs using a Syslog Collector applet and content pack integration in Cortex Cloud.

You can configure collecting Cisco ASA firewall and AnyConnect VPN logs using a Broker VM Syslog Collector applet or with a content pack integration:

| Cisco ASA firewalls and AnyConnect vendor | Description |
| --- | --- |
| Syslog Collector applet overview | If you use Cisco ASA firewalls or Cisco AnyConnect VPN, you can forward Cisco ASA firewall and AnyConnect VPN logs to Cortex Cloud using the Broker VM Syslog Collector applet in a CISCO format. |
| Link to Syslog Collector applet instructions | Ingest logs from Cisco ASA firewalls and AnyConnect |
| Link to content pack/integration instructions | The [Cisco ASA](https://cortex.marketplace.pan.dev/marketplace/details/CiscoASA/) content pack interacts with the Cisco Adaptive Security Appliance Software via an API to manage interfaces, rules, and network objects. The content pack includes the following integration: [Cisco Adaptive Security Appliance Software](https://xsoar.pan.dev/docs/reference/integrations/cisco-asa): Use this integration to manage interfaces, rules, and network objects on the Cisco Adaptive Security Appliance Software platform. This integration includes commands for listing and managing network object groups, local user groups, local users, time ranges, security object groups, user objects, interface information, configuration backup, and creating, listing, getting, editing, and deleting firewall rules, along with the command to save the running configuration to memory (**`cisco-asa-write-memory`**). |

### Corelight Zeek

Learn more about collecting Corelight Zeek logs using a Syslog Collector applet and content pack integration in Cortex Cloud.

You can configure collecting Corelight Zeek logs using a Broker VM Syslog Collector applet or with a content pack integration:

| Corelight Zeek vendor | Description |
| --- | --- |
| Syslog Collector applet overview | If you use Corelight Zeek sensors for network monitoring, you can forward network connection logs to Cortex Cloud using the Broker VM Syslog Collector applet with TCP as the transport Protocol and a Corelight format. |
| Link to Syslog Collector applet instructions | Ingest logs from Corelight Zeek |
| Link to content pack/integration details | The [Corelight Zeek](https://cortex.marketplace.pan.dev/marketplace/details/CorelightZeek) content pack provides data normalization capabilities through rules for parsing and modeling network protocol logs that are ingested via a Syslog collector on the Broker VM into Cortex Cloud. It includes **`Corelight Zeek Modeling Rules`** and **`Corelight Zeek Parsing Rules`**. |

### Cribl

Learn more about collecting Cribl logs using a standard data source in Cortex Cloud.

You can configure collecting Cribl data using a standard data source:

| Cribl vendor | Description |
| --- | --- |
| Standard data source overview | Forward data that Cribl collects from multiple data sources and streams to Cortex Cloud using a Cribl data source. |
| Link to standard data source instructions | Ingest data from Cribl Configuring this data source includes this topic: Data source UUIDs |

#### Ingest data from Cribl

Ingest third-party data collected by Cribl.

The Cribl data collector is an out-of-the-box native integration which ingests data that Cribl collects from multiple data sources and streams to Cortex Cloud, while ensuring that all downstream capabilities, including analytics, are available in Cortex Cloud. 

The onboarding process in Cribl has an impact on the output that is sent to Cortex Cloud. Therefore, the onboarding process of some sources in Cribl might have to be implemented in a certain way in order to adhere to Cortex Cloud requirements. These processes are described in more detail in Tasks 1 and 3, below. 

**Important:**

Raw data must be collected by Cribl and streamed as-is from the passed through source, because any changes made by Cribl might affect the way that Cortex Cloud handles the data.

For best results, we recommend ingesting data from Palo Alto Networks products, such as Next-Generation Firewall (NGFW) using the dedicated Cortex Cloud data collectors, instead of source collectors provided by Cribl.

**Note:**

We do not support email data collection via Cribl.

##### Workflow high-level overview:

1.  Task 1: In Cribl, onboard data collection from your data sources.
    
2.  Task 2: In Cortex Cloud, create a Cribl data collector instance, and obtain the authorization token and the API URL.
    
3.  Task 3: In Cribl, for each source, configure the destination, using the Cortex Cloud authorization token, the Cortex Cloud API URL, and the source UUID.
    
4.  Task 4: Verify that data is streamed to Cortex Cloud as expected, and perform ongoing maintenance.
    

Perform the following tasks in the order that they appear.

Task 1 (in Cribl, create new data sources)

**Prerequisite:**

Ensure that you have the credentials and IDs for each data source, such as Tenant ID, App ID and Client secret.

General guidelines specifically for Cortex Cloud (for more information, refer to  [Cribl documentation](https://docs.cribl.io/stream/destinations-xsiam/)):

-   If you have not already done so, create source collectors to onboard the desired data sources.
    
-   For some data sources, Cribl includes specific collectors in its catalog. If you can't find one in the catalog specifically for your source, use a generic collector.
    
-   Although some native Cribl source collectors allow you to ingest several data types using the same source collector, we do not recommend this approach. To ensure optimal Cortex Cloud performance, configure a separate Cribl source collector for each data type. For reference purposes, this data source UUIDs table shows all the data types that can be onboarded.
    
    For example, Microsoft 365 has several data types, such as users, groups, and contacts.
    

Task 2 (in Cortex Cloud)

**Note:**

Only one Cribl data collector instance can be configured in Cortex Cloud.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Search for Cribl.
    
3.  Click the Cribl integration and then click Add Instance.
    
4.  In the Name field, enter a meaningful name for the integration.
    
5.  Click Save & generate token.
    
6.  Click the Copy icon to copy the authorization token.
    
7.  Save the authorization token copy in a safe place for future use. You cannot access this token again, so take care to copy it and save it before you close the dialog box.
    
8.  Click Close.
    
9.  On the Data Sources & Integrations page, in the row for the Cribl instance, click the link icon (Copy API URL). Save the API URL copy in a safe place for future use.
    

Task 3 (In Cribl, configure Cortex Cloud as a destination for each source)

**Prerequisite:**

Ensure that you have the copies of the Cortex Cloud authorization token and API URL obtained in Task 2.

The following table includes guidelines that are relevant specifically for Cortex Cloud. While you are configuring Cortex Cloud destinations for your sources, configure the items listed in the table below as described.

For general information about configuring destinations, refer to  [Cribl documentation.](https://docs.cribl.io/stream/destinations-xsiam/)

| Item | Setting | Details |
| --- | --- | --- |
| Cortex Cloud URL | XSIAM Endpoint field | Paste the API URL obtained from Cortex Cloud. |
| Authorization token | Authorization Token field | Paste the authorization token obtained from Cortex Cloud. |
| Advanced Settings | Compress toggle | Ensure that Compress is disabled. |
| HTTP headers | Extra HTTP headers | Add extra HTTP headers for each data source: Source-identifier: Search the table supplied in this topic for the vendor and product. The data source UUIDs table lists the data sources that can be identified by Cortex Cloud, using their corresponding UUIDs. These UUIDs are required to map data collected by Cribl to the Cortex Cloud destination.- If you find the desired vendor and product, copy the corresponding UUID from the table and paste here. This UUID will allow Cortex Cloud to leverage all the data ingested from the data source, such as identifiers, pipeline sources such as IP addresses, devices, and so on. Data from sources known to Cortex Cloud are saved in the appropriate datasets–the same datasets as those used by dedicated data collectors in Cortex Cloud. **Note:** Do not use the generic UUID for a data source that is known to Cortex Cloud and appears in the table. \*\*Note:\*\* When the logs are in CEF format, Cortex Cloud reads events row by row to look for the Vendor and Product configured in the logs. When the values are populated in the event log row, Cortex Cloud uses these values even if you specified a value in the Vendor and Product fields in the Cribl collector settings. However, when the values are blank in the event log row, Cortex Cloud uses the Vendor and Product that you specified in the Cribl collector settings. If you did not specify a Vendor or Product in the Cribl collector settings, and the values are blank in the event log row, the values for both fields are set to unknown. ; If you can't find the desired vendor and product source in the table, copy the generic UUID provided in the first row of the table, and paste here. Data from sources that are not specifically mentioned will be saved in a separate searchable dataset. The dataset name will be reflect the vendor and product names that you enter next in the following format: `vendor_product_raw`. If the vendor-product you are connecting has a content pack in the Marketplace (with matching parsing/modeling rules) use the same vendor-product definition in order to apply these rules on it. ; Format: json; Vendor: When using the UUID for unknown data sources, you must enter the vendor name.; Product: When using the UUID for unknown data sources, you must enter the product name. |
| Mapping | Passthru option | Map the data source(s) that you created in Task 1 to the XSIAM data destination created in this task. Ensure that you select the Passthru option. |
| Deployment | Commit & Deploy Deploy | When mapping is complete, click Commit & Deploy, and then click Deploy. |

Task 4 (in Cribl and in Cortex Cloud)

Verify that data is streaming as expected from Cribl to Cortex Cloud.

-   In the Cribl user interface, click the Source collector, click Configure, and then the Charts tab. Check the charts to verify that streaming is in progress.
    
-   In Cortex Cloud, on the Data Sources & Integrations page, when streaming begins, a green check mark appears below the Cribl configuration, along with the amount of data received.
    

Other optional tasks

Use the Disable and Delete options with extreme caution.

-   Disabling the integration will cease streaming from Cribl.
    
-   Deleting the integration will erase the integration completely and will require reconfiguration, because the original authorization token will be lost.
    

##### Disable the integration with Cribl

1.  To disable the integration, in Cortex Cloud, search for the Cribl integration on the Data Sources & Integrations page, and clear the Enable checkbox.
    
2.  In the Are you sure? dialog box, type `disable`, and then click Disable.
    

##### Delete the integration with Cribl

1.  To delete the Cribl integration, in Cortex Cloud, search for the integration on the Data Sources & Integrations page, and click the integration's Delete icon.
    
2.  In the Are you sure? dialog box, type `delete`, and then click Delete.

##### Data source UUIDs

Data source UUIDs

| Vendor | Product | UUID |
| --- | --- | --- |
| Indicate specific vendor name as not listed below | Indicate specific product name as not listed below | af01292940d7426594d3d3e55ae17ee0 \*\*Note:\*\* Do not use this generic UUID when your data source is listed in this table. |
| Amazon | AWS audit logs | c19f87b6262f48259b3d5d2a2c691802 |
| Amazon | AWS EKS | fb8a9d4922cb4095b76d71e921d2d999 |
| Amazon | AWS flow logs | 667083aa68544eee8b67cdd2d4cc327b |
| Amazon | AWS generic logs | 0498f8a24de04b3e85102e742f6783f8 |
| Amazon | AWS prompt logs | a53edad7ef0c46ffb5037fb2e21520cb |
| Amazon | AWS Route 53 logs | d57ae82c1e2a4d138fc34084d159b09e |
| Box | Box | 3ef05d14ae9349f8bbd48c8a4797334a |
| CrowdStrike | Falcon Data Replicator | 6cd7d60f0ff5497baecf6b9073c8000e |
| CrowdStrike | Falcon incident | 230b2b0233bf4327806af72e6e5769f3 |
| CrowdStrike | Hosts | 8b673ac8e2f34b4a8dc14c22f0e6063b |
| Dropbox | Directory | e8d2c52bc9594621924fab0507264586 |
| Dropbox | Events | a6322b2fd9e545e0a4223ba754c48fb9 |
| Google | Cloud Logging | 00a8322c85e14beabfa7ad5f3d62db73 |
| Google | Gmail | 8607490288d1407ba82b5c5ad9dc64a0 |
| Google | Gsuite reports | 3ddd43030db142839568943e0a2fe785 |
| Google | Workspace alerts | 4f263650cd29475c81f2ff953cf19827 |
| Google | Workspace apps | 5a617df8827d461db66a10d084c7b39f |
| Google | Workspace ChromeOS devices | e82ae276e6b9442fa80920a03d2a38d6 |
| Google | Workspace contact groups | 5a42004787064021a462bb2120160514 |
| Google | Workspace contacts | d20d6cfea3e943d5a5a6bc005c429ef4 |
| Google | Workspace domains | 2738e963ac3141afaad05885e060a73c |
| Google | Workspace group members | 8a0140fc47b643838d0fcf096773c0a1 |
| Google | Workspace groups | 689ae8ef14e848e3855b81e91d8af9bc |
| Google | Workspace mailboxes | 328796d692f343c38f07351e8c783f80 |
| Google | Workspace mailbox settings | 3c4beffadfac40a18aaf4d143a19dc27 |
| Google | Workspace mobile devices | 149b58ec938d4d1a8568359483e50800 |
| Google | Workspace organization | 4e342367057d46c7b38ce7d40682fd1e |
| Google | Workspace privileges | 462ebcbfce9341ac8c006e5aa45ccf44 |
| Google | Workspace profiles | f2aed57ff13c439eb93153ba7309fe87 |
| Google | Workspace roles | 82170b42b9684b79bda124c712bcbdc0 |
| Google | Workspace rules | 2621aaf3334a4147ae727afe84db31a9 |
| Google | Workspace schemas | c978986a6b3846c7b6fdbe15bef14f69 |
| Google | Workspace users | 359ecd845fa54caab6ddb4b7c7a2764d |
| Google | Workspace users send as aliases | 3b8f9e65f8ed43f4a4e5679236691fe2 |
| Microsoft | Azure | fce13a1d51294f84bae4a37851503060 |
| Microsoft | Azure AD | c00d6d52e5b141a8baa8db9d9345423d |
| Microsoft | Azure AD audit | 0e076d5abe864bf78e8145ea9e0d749e |
| Microsoft | Azure AD sign-ins | f56dcfdf6bca43e793a4b6e9290e7b12 |
| Microsoft | Defender | ce9e8cf36e0742c38aa89787a256855f |
| Microsoft | DHCP | b55819e8959c49728d5d98a6d87eafb6 |
| Microsoft | Graph security alerts | 5619f2f691fc46c4b202587fdaa031c3 |
| Microsoft | Office 365 Azure AD | e1f109f886ea42fbb96be6ec0cc597a9 |
| Microsoft | Office 365 contacts | de1b694a6c8341958bc08c4b7c140874 |
| Microsoft | Office 365 devices | de229685f708413fad46289657ea09de |
| Microsoft | Office 365 DLP | 8f052782739d4b8389644cca23b994ac |
| Microsoft | Office 365 domains | cae29fd87b554bd9a5694afb225e8dc9 |
| Microsoft | Office 365 Exchange Online | dee8e85ce7db4573a8bc21b807e1d73a |
| Microsoft | Office 365 General | c7655e83805b4a058e66043a6715156c |
| Microsoft | Office 365 groups | 0b0499ac0d984145b201c6d674771dbf |
| Microsoft | Office 365 mailboxes | 9855a03559ce4263b568671e695d1fa8 |
| Microsoft | Office 365 rules | 6b925df8923d4038bf78998d1ffde77c |
| Microsoft | Office 365 Sharepoint Online | 3a37f519e9094a3f8c4185fa572cd111 |
| Microsoft | Office 365 users | dcfb7a412e654efd868de0b8cf81766a |
| Okta | SSO | 5faf4c1fdb8443d9920d6a54815432c1 |
| OneLogin | Events | 22b23a3f9f1e49998645b683d5dc3a6f |
| OneLogin | OneLogin | 88cfbd3e7b974d999b10edac83995b8a |
| Palo Alto Networks | IOT Security alerts | e772949c88ec4107ad81ec38061d35c0 |
| Palo Alto Networks | IOT Security devices | 80cee50bfc6e4ac5b34b19794b767acd |
| PingID | PingONE | 924951a8394b4605b1725f943292ab4f |
| Prisma | Assets | 6a61c1cba1b64cd2a977c76c41f7950d |
| Prisma | Cloud | f8c3403a02fd4147862ee293bf4e74e2 |
| Proofpoint | TAP | 3eefce0f791e4391a3643b8cf860a361 |
| Salesforce | Salesforce logs | ab109687acd24978aabcb7ad8b5742e3 |
| Salesforce | Salesforce snapshots | addbf31a6372491e88d45934dff5b5b0 |
| SentinelOne | Deep Visibility | b9fa55e6fa564c709358425ce0f61517 |
| ServiceNow | CMDB | 8b3e767247e44471a95e563378d0b9be |
| Workday | Workday | 00d4e740702d4eb2939a87c2318513dd |

### Databricks

Learn more about the Databricks data source in Cortex Cloud.

You can configure collecting Databricks logs using a Cloud Posture and Runtime Security data source:

| Microsoft 365 (Posture) vendor | Description |
| --- | --- |
| Cloud Posture and Runtime Security data source overview | Forward Microsoft 365 (Postrure) logs to Cortex Cloud using the Microsoft 365 data source. |
| Link to Cloud Posture and Runtime Security data source instructions | How to onboard Databricks |

#### How to onboard Databricks

How to get started with the third-party Databricks data source.

##### Overview

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
            
        
    

##### Add the Databricks data source

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

##### Verify the Cortex Gateway connection

At the end of the onboarding process, a pending request for Databricks approval is automatically created and displayed on the Cortex Gateway screen. In order to complete the onboarding process, approve the pending request. If you do not have permissions, contact your Cortex Cloud administrator.

For more information, see Egress configurations.Egress configurations

### Dropbox

Learn more about the Dropbox standard data source and content pack integrations in Cortex Cloud.

You can configure collecting Dropbox logs and data using a standard data source or with a content pack integration:

| Dropbox vendor | Description |
| --- | --- |
| Standard data source overview | Forward different types of data from Dropbox Business accounts to Cortex Cloud using the Dropbox data source. |
| Link to standard data source instructions | The following types of data can be ingested from Dropbox: Log collection- Events ; Directory and metadata- Member Devices; Users; Groups For more information, see Ingest logs and data from Dropbox. |
| Links to content pack/ integration details | The [Dropbox](https://cortex.marketplace.pan.dev/marketplace/details/Dropbox/) content pack fetches and collects security events from Dropbox logs. It includes Correlation Rules, Modeling Rules, Parsing Rules, a Playbook, and a Cortex Cloud Dashboard. It also includes the following integration: [Dropbox Event Collector](https://xsoar.pan.dev/docs/reference/integrations/dropbox-events-collector): Use this integration to collect events from Dropbox logs. It contains commands such as **`dropbox-auth-start`** to initiate the authorization process, **`dropbox-auth-complete`** to finish authorization, **`dropbox-auth-test`** to check connectivity, **`dropbox-auth-reset`** to reset authentication, and **`dropbox-get-events`** to retrieve events. |

#### Ingest logs and data from Dropbox

Ingest logs and data from Dropbox Business accounts via the Dropbox Business API.

**Notice:**

Requires the ITDR Module add-on and Data Collection add-on.

Cortex Cloud can ingest different types of data from Dropbox Business accounts using the Dropbox data collector. To receive logs and data from Dropbox Business accounts via the Dropbox Business API, you must configure the settings in Cortex Cloud based on your Dropbox Business Account credentials. After you set up data collection, Cortex Cloud begins receiving new logs and data from the source.

When Cortex Cloud begins receiving logs, the app creates a new dataset for the different types of data that you are collecting, which you can use to initiate XQL Search queries. For example queries, refer to the in-app XQL Library. For all logs, Cortex Cloud can generate Cortex Cloud issues (Analytics, Correlation Rules, IOC, and BIOC), when relevant, from Dropbox Business logs. While Correlation Rules issues are generated on non-normalized and normalized logs, Analytics, IOC, and BIOC issues are only generated on normalized logs.

The following table provides a brief description of the different types of data you can collect, the collection method and fetch interval for new data collected, the name of the dataset to use in Cortex Cloud to query the data using XQL Search, and whether the data is normalized.

**Note:**

The Fetch Interval is non-configurable.

| Type of data | Description | Collection method | Fetch interval | Dataset name | Normalized data |
| --- | --- | --- | --- | --- | --- |
| **Log collection** |
| Events | Retrieves team events, including access events, administrative events, file/folders events, security settings events, and more. [team_log/get_events](https://www.dropbox.com/developers/documentation/http/teams#team_log-get_events) | Appends data | 60 seconds | `dropbox_events_raw` | When relevant, Cortex Cloud normalizes SaaS audit event logs into stories, which are collected in a dataset called `saas_audit_logs`. |
| **Directory and metadata** |
| Member Devices | Lists all device sessions of a team. [team/devices/list_members_devices](https://www.dropbox.com/developers/documentation/http/teams#team-devices-list_members_devices) | Overwrites data | 10 minutes | `dropbox_members_devices_raw` | — |
| Users | Lists members of a group. [team/members/list_v2](https://www.dropbox.com/developers/documentation/http/teams#team-members-list) | Overwrites data | 10 minutes | `dropbox_users_raw` | — |
| Groups | Lists groups on a team. [team/groups/list](https://www.dropbox.com/developers/documentation/http/teams#team-groups-list) | Overwrites data | 10 minutes | `dropbox_groups_raw` | — |

**Prerequisite:**

1.  Set up an [Advanced](https://www.dropbox.com/plans) Dropbox plan.
    
2.  Create a Dropbox Business [admin account](https://help.dropbox.com/account-access) with Security admin permissions, which is required to authorize Cortex Cloud to access the Dropbox Business account and generate the OAuth 2.0 access token.
    

Configure Cortex Cloud to receive logs and data from Dropbox.

1.  Complete the prerequisite steps mentioned above for your Dropbox Business account.
    
2.  Log in to Dropbox using an admin account designated with Security admin level permissions.
    
3.  In the Dropbox App console, ensure that you either create a new app, or your existing app is created, with the following settings:
    
    -   Choose an API: Select Scoped access.
        
    -   Choose the type of access you need: Select Full dropbox for access to all files and folders in a user's Dropbox.
        
    
4.  In the Permissions tab of your app, ensure that the applicable permissions are selected under the relevant section heading for the type of data you want to collect:
    
    | Section heading | Permission | Data to collect |
    | --- | --- | --- |
    | Account Info | account_info.read | All types of data |
    | Team Data | team_data.member | All types of data |
    | Members | members.read | Users |
    | groups.read | Groups |
    | Sessions | sessions.list | Member Devices |
    | events.read | Events |
    
5.  In the Settings tab of your app, copy the App key and App secret , where you must click Show to see the App secret and record them somewhere safe. You will need to provide these keys when you configure the Dropbox data collector in Cortex Cloud.
    
6.  Navigate to Settings → Data Sources & Integrations.
    
7.  On the Data Sources & Integrations page, click \+ Add New, search for Dropbox, then hover over and click Add.
    
8.  Set the following parameters:
    
    -   Name: Specify a descriptive name for this Dropbox instance.
        
    -   App Key: Specify the App key, which is taken from the Settings tab of your Dropbox app.
        
    -   App Secret: Specify the App secret, which is taken from the Settings tab of your Dropbox app.
        
    -   Access Code: After specifying an App Key, you can obtain the access code by hovering over the Access Code tooltip, clicking the here link, and signing in with your Dropbox Business account credentials. The URL link is `https://www.dropbox.com/oauth2/authorize?client_id=%APP_KEY%&amp;token_access_type=offline&amp;response_type=code`, where the `%APP_KEY%` is replaced with the App Key value specified.
        
        **Note:**
        
        When the App Key field is empty, the here link in the tooltip is disabled. When an incorrect App Key is entered, clicking the link results in a 404 error.
        
        To obtain the Access Code complete the following steps in the page that opens in your browser:
        
        1.  Read the disclaimer and click Continue.
            
        2.  Review the permissions listed, which should match the permissions you configured in your Dropbox app in the Permissions tab according to the type of data you want to collect, and click Allow.
            
        3.  Copy the Access Code Generated and paste it in the Access Code field in Cortex Cloud. The access code is valid for around four minutes from when it is generated.
            
        
        **Note:**
        
        Whenever you change the permissions of the Dropbox app, we recommend that you generate a new Access Code for the Dropbox data collector instance so that the permissions match the updates.
        
    -   Collect: Select the types of data you want to collect from Dropbox. All the options are selected by default.
        
        -   Log collection
            
            -   Events (get_events}: Retrieves team events, including access events, administrative events, file/folders events, security settings events and more.
                
            
            **Note:**
            
            Event data is collected every 60 seconds with a 10 minute lag time.
            
        -   Directory and metadata
            
            -   Member Devices: Collects all device sessions of a team.
                
            -   Users: Collects all members of a group.
                
            -   Groups: Collects all groups on a team.
                
            
            **Note:**
            
            Inventory data snapshots are collected every 10 minutes.
            
        
    
9.  To test the connection settings, click Test.
    
10.  If the test is successful, click Enable to enable Dropbox log collection.
     
     After events start to come in, a green check mark appears underneath the Dropbox configuration.

### Elasticsearch Filebeat

Learn more about the Elasticsearch Filebeat custom collector (standard data source) in Cortex Cloud.

**Note:**

You can configure collecting container logs from Google Kubernetes Engine using Elasticsearch Filebeat with a Custom - Filebeat based Collector or with a content pack Integration. For more information, see Google Kubernetes Engine.

You can ingest logs related to file activity on your endpoints and servers without using the Cortex XDR agent by installing Elasticsearch Filebeat as a system logger and then forward those logs to Cortex Cloud using a Custom - Filebeat based Collector.

| Elasticsearch Filebeat vendor | Description |
| --- | --- |
| Custom - Filebeat based Collector (standard data source) overview | Forward logs from Elasticsearch Filebeat to Cortex Cloud using the Custom - Filebeat based Collector data source. |
| Link to custom - Filebeat based Collector (standard data source) instructions | Ingest logs from Elasticsearch Filebeat |

#### Ingest logs from Elasticsearch Filebeat

Cortex Cloud can ingest logs from Elasticsearch Filebeat, a file system logger that logs file activity on your endpoints and servers.

**Notice:**

Requires the Data Collection add-on.

If you want to ingest logs about file activity on your endpoints and servers and do not use the Cortex XDR agent, you can install Elasticsearch Filebeat as a system logger and then forward those logs to Cortex Cloud. To facilitate log ingestion, Cortex Cloud supports the same protocols that Filebeat and Elasticsearch use to communicate. Cortex Cloud supports using Filebeat up to version 8.2 with the Filebeat data collector. Cortex Cloud also supports logs in single line format or multiline format. For more information on handling messages that span multiple lines of text in Elasticsearch Filebeat, see [Manage Multiline Messages](https://www.elastic.co/guide/en/beats/filebeat/current/multiline-examples.html).

Cortex Cloud supports all sections in the `filebeat.yml` configuration file, such as support for Filebeat fields and tags. As a result, this enables you to use the [add_fields](https://www.elastic.co/guide/en/beats/filebeat/current/add-fields.html) processor to identify the product/vendor for the data collected by Filebeat so the collected events go through the ingestion flow (Parsing Rules). To configure the product/vendor ensure that you use the default `fields` attribute, as opposed to the `target` attribute, as shown in the following example.

```
processors:
  - add_fields:
      fields:
        vendor: <Vendor>
        product: <Product>
```

To provide additional context during investigations, Cortex Cloud automatically creates a new Cortex Query Language (XQL) dataset from your Filebeat logs. You can then use the XQL dataset to search across the logs Cortex Cloud received from Filebeat.

To receive logs, you configure collection settings for Filebeat in Cortex Cloud and output settings in your Filebeat installations. As soon as Cortex Cloud begins receiving logs, the data is visible in XQL Search queries.

1.  In Cortex Cloud, set up Data Collection.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  On the Data Sources & Integrations page, click \+ Add New, search for Custom - Filebeat, then hover over it and click Add.
        
    3.  Specify a descriptive Name for your Filebeat log collection configuration.
        
    4.  Specify the Vendor and Product for the type of logs you are ingesting.
        
        The vendor and product are used to define the name of your XQL dataset (`<vendor>_<product>_raw`). If you do not define a vendor or product, Cortex Cloud examines the log header to identify the type and uses that to define the vendor and product in the dataset. For example, if the type is Acme and you opt to let Cortex Cloud determine the values, the dataset name would be `acme_acme_raw`.
        
    5.  Save & Generate Token.
        
        Click the copy icon next to the key and record it somewhere safe. You will need to provide this key when you set up output settings on your Filebeat instance. If you forget to record the key and close the window you will need to generate a new key and repeat this process.
        
2.  Set up Filebeat to forward logs.
    
    After installing the Filebeat agent, configure an Elasticsearch output:
    
    1.  Under the output.elasticsearch section, configure the following entities:
        
        
        
        -   `hosts`: Copy the API URL from your Filebeat configuration and paste it in this field.
            
        -   `compression_level`: 5 (recommended)
            
        -   `bulk_max_size`: 1000 (recommended)
            
        -   `api_key`: Paste the key you created in when you configured Filebeat Log Collection in Cortex Cloud.
            
        -   `proxy_url`: (Optional) `<server_ip>:<port_number>`. You can specify your own `<server_ip>` or use the Broker VM to proxy Filebeat communication using the format `<Broker_VM_ip>:<port_number>`. When using the Broker VM, ensure that you activate the Local Agent Settings applet with the Agent Proxy enabled.
            
        
    2.  Save the changes to your output file.
        
    
    After Cortex Cloud begins receiving logs from Filebeat, they will be available in XQL Search queries.
    
3.  (Optional) Monitor your Filebeat integration.
    
    You can return to the page to monitor the status of your Filebeat configuration. For each instance, Cortex Cloud displays the number of logs received in the last hour, day, and week. You can also use the Data Ingestion Dashboard to view general statistics about your data ingestion configurations.
    
4.  (Optional) Set up issue notifications to monitor the following events.
    
    -   A Filebeat agent status changes to disconnected.
        
    -   A Filebeat module has stopped sending logs.

### Forcepoint DLP

Learn more about collecting Forcepoint DLP logs using a Syslog Collector applet and content pack integration in Cortex Cloud.

You can configure collecting Corelight Zeek logs using a Broker VM Syslog Collector applet or with a content pack integration:

| Forcepoint DLP vendor | Description |
| --- | --- |
| Syslog Collector applet overview | If you use Forcepoint DLP to prevent data loss over endpoint channels, you can forward logs to Cortex Cloud using the Broker VM Syslog Collector applet in a CEF or LEEF format. |
| Link to Syslog Collector applet instructions | Ingest logs from Forcepoint DLP |
| Link to content pack/integration details | The [Forcepoint DLP](https://cortex.marketplace.pan.dev/marketplace/details/ForcepointDLP) content pack fetches security incidents from Forcepoint DLP and ingests them as events into Cortex Cloud for processing and analysis. contains the **`Forcepoint DLP Modeling Rule`**, and the **`Forcepoint DLP Parsing Rule`**. It also includes the following integration: [Forcepoint DLP Event Collector (Beta)](https://xsoar.pan.dev/docs/reference/integrations/forcepoint-dlp-event-collector): Use this integration to fetch security incidents from Forcepoint DLP as Cortex Cloud events. This integration is an event collector and utilizes parsing and modeling rules within the content pack for data normalization. |

### Fortinet Fortigate

Learn more about collecting Fortinet Fortigate firewalls logs using a Syslog Collector applet and content pack integration in Cortex Cloud.

You can configure collecting Fortinet Fortigate firewall logs using a Broker VM Syslog Collector applet or with a content pack integration:

| Fortinet Fortigate vendor | Description |
| --- | --- |
| Syslog Collector applet overview | If you use Fortinet Fortigate firewalls, you can forward network connection logs to Cortex Cloud using the Broker VM Syslog Collector applet in a CEF format. |
| Link to Syslog Collector applet instructions | Ingest logs from Fortinet Fortigate firewalls |
| Links to content pack/integration details | The [FortiManager](https://cortex.marketplace.pan.dev/marketplace/details/FortiManager) content pack enables managing Fortinet devices through a single console central management system and provides data normalization for FortiManager event logs ingested via Syslog into Cortex Cloud. It contains the **`Fortinet FortiManager Modeling Rule`**, the **`Fortinet FortiManager Parsing Rule`**, and the FortiManager - Install Policy Package on Device playbook. It also includes the following integration:- [FortiManager](https://xsoar.pan.dev/docs/reference/integrations/forti-manager): Use this integration to manage Fortinet devices as a single console central management system. This integration enables executing the FortiManager - Install Policy Package on Device playbook, which installs a FortiManager firewall policy package on a given device. ; The [FortiGate](https://cortex.marketplace.pan.dev/marketplace/details/FortiGate) content pack manages FortiGate firewalls, delivering convergence and deep security visibility across diverse network environments, and facilitating data normalization for ingested event logs. It contains the **`Fortinet FortiGate Modeling Rule`**, and the **`FortiGate Parsing Rule`**. It also includes the following integration:- [FortiGate](https://xsoar.pan.dev/docs/reference/integrations/forti-gate): Use this integration to manage Fortinet FortiGate firewall devices, leveraging the Fortinet FortiOS operating system to provide deep visibility and consistent security across environments like remote offices, campuses, and data centers. It includes commands for listing, creating, updating, moving, and deleting firewall policies, addresses (IPv4 and IPv6, including multicasts), and service groups, alongside functionalities like banning and unbanning IPs. |

### Google Cloud Platform

Learn more about the Google Cloud Platform standard data source and content pack integrations in Cortex Cloud.

You can configure collecting Google Cloud Platform (GCP) logs using a standard data source, Cloud Service Provider (CSP) onboarding data source, or with a content pack integration:

| Google Cloud Platform vendor | Description |
| --- | --- |
| Standard data source overview | If you use the Pub/Sub messaging service from Google Cloud Platform (GCP), forward logs and data to Cortex Cloud from your GCP instance using the Google Cloud Platform data source. |
| Link to standard data source instructions | The following types of logs can be ingested from Google Cloud Platform: Audit logs, including Google Kubernetes Engine (GKE) audit logs.; Generic logs; Google Cloud DNS logs; Network flow logs For more information, see Ingest logs and data from a GCP Pub/Sub. |
| Link to full configuration Cloud Service Provider (CSP) onboarding data source instructions | Onboard Google Cloud Platform |
| Link to basic configuration Cloud Service Provider (CSP) onboarding data source instructions for Cortex Cloud NG SIEM, Cortex Cloud Enterprise license, and Cortex Cloud Enterprise+ licenses. | Onboard Google Cloud Platform with basic configuration |
| Links to content pack/ integration details | The [Google Cloud Pub / Sub](https://cortex.marketplace.pan.dev/marketplace/details/GooglePubSub) content pack integrates with the Google Cloud Pub / Sub messaging service to enable you to send and receive messages between independent applications. It contains the following integration: [Google Cloud Pub/Sub](https://xsoar.pan.dev/docs/reference/integrations/google-pub-sub): Use this integration to enable automated security operations and issue response through a series of dedicated commands that manage messaging topics, subscriptions, and message flow. For example, there are commands for listing, creating, updating, and deleting topics and subscriptions, publishing messages, and manually pulling or seeking messages for processing. This integration requires specific elevated permissions such as Project-Owner or Pub/Sub Admin, |

#### Ingest logs and data from a GCP Pub/Sub

If you use the Pub/Sub messaging service from Global Cloud Platform (GCP), you can send logs and data from GCP to Cortex Cloud.

If you use the Pub/Sub messaging service from Global Cloud Platform (GCP), you can send logs and data from your GCP instance to Cortex Cloud. Data from GCP is then searchable in Cortex Cloud to provide additional information and context to your investigations using the GCP Cortex Query Language (XQL) dataset, which is dependent on the type of GCP logs collected. For example queries, refer to the in-app XQL Library. You can configure a Google Cloud Platform collector to receive generic, flow, audit, or Google Cloud DNS logs. When configuring generic logs, you can receive logs in a Raw, JSON, CEF, LEEF, Cisco, or Corelight format.

You can also configure Cortex Cloud to normalize different GCP logs as part of the enhanced cloud protection, which you can query with XQL Search using the applicable dataset. Cortex Cloud can also generate Cortex Cloud issues (Analytics, IOC, BIOC, and Correlation Rules), when relevant, from GCP logs. While Correlation Rules isssues are generated on non-normalized and normalized logs, Analytics, IOC, and BIOC issues are only raised on normalized logs.

Enhanced cloud protection provides the following:

-   Normalization of cloud logs
    
-   Cloud logs stitching
    
-   Enrichment with cloud data
    
-   Detection based on cloud analytics
    
-   Cloud-tailored investigations
    

The following table lists the various GCP log types the XQL datasets you can use to query in XQL Search:

| GCP log type | Dataset | Dataset with normalized data |
| --- | --- | --- |
| Audit logs, including Google Kubernetes Engine (GKE) audit logs | `google_cloud_logging_raw` | `cloud_audit_logs` |
| Generic logs | Log Format types: **CEF** or **`LEEF`**: Automatically detected from either the logs or the user's input in the User Interface.; **Cisco**: `cisco_asa_raw`; **Corelight**: `corelight_zeek_raw`; **JSON or Raw**: `google_cloud_logging_raw` | N/A |
| Google Cloud DNS logs | `google_dns_raw` | `xdr_data`: Once configured, Cortex Cloud ingests Google Cloud DNS logs as XDR network connection stories, which you can query with XQL Search using the `xdr_data` dataset with the preset called `network_story`. |
| Network flow logs | `google_cloud_logging_raw` | `xdr_data`: Once configured, Cortex Cloud ingests network flow logs as XDR network connection stories, which you can query with XQL Search using the `xdr_data` dataset with the preset called `network_story`. |

**Note:**

When collecting flow logs, we recommend that you include GKE annotations in your logs, which enable you to view the names of the containers that communicated with each other. GKE annotations are only included in logs if appended manually using the custom metadata configuration in GCP. For more information, see [VPC Flow Logs Overview](https://cloud.google.com/vpc/docs/flow-logs#customizing_metadata_fields). In addition, to customize metadata fields, you must use the gcloud command-line interface or the API. For more information, see [Using VPC Flow Logs](https://cloud.google.com/vpc/docs/using-flow-logs#enabling_vpc_flow_logging_for_an_existing_subnet).

To receive logs and data from GCP, you must first set up log forwarding using a Pub/Sub topic in GCP. You can configure GCP settings using either the GCP web interface or a GCP cloud shell terminal. After you set up your service account in GCP, you configure the Data Collection settings in Cortex Cloud. The setup process requires the subscription name and authentication key from your GCP instance.

After you set up log collection, Cortex Cloud immediately begins receiving new logs and data from GCP.

##### Set up log forwarding using the GCP web interface

-   In Cortex Cloud, set up Data Collection.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  On the Data Sources & Integrations page, click \+ Add New, search for Google Cloud Platform, then hover over it and click Add.
        
    3.  Specify the Subscription Name that you previously noted or copied.
        
    4.  Browse to the JSON file containing your authentication key for the service account.
        
    5.  Select the Log Type as one of the following, where your selection changes the options displayed.
        
        -   Flow or Audit Logs: When selecting this log type, you can decide whether to normalize and enrich the logs as part of the enhanced cloud protection.
            
            -   (Optional) You can Normalize and enrich flow and audit logs by selecting the checkbox (default). If selected, Cortex Cloud ingests the network flow logs as Cortex Cloud network connection stories, which you can query using XQL Search from the `xdr_dataset` dataset with the preset called `network_story`. In addition, you can configure Cortex Cloud to normalize GCP audit logs, which you can query with XQL Search using the `cloud_audit_logs` dataset.
                
            -   The Vendor is automatically set to Google and Product to Cloud Logging, which is not configurable. This means that all GCP data for the flow and audit logs, whether it's normalized or not, can be queried in XQL Search using the `google_cloud_logging_raw` dataset.
                
            
        -   Generic: When selecting this log type, you can configure the following settings.
            
            -   Log Format: Select the log format type as Raw, JSON, CEF, LEEF, Cisco, or Corelight.
                
                -   CEF or LEEF: The Vendor and Product defaults to Auto-Detect.
                    
                    **Note:**
                    
                    For a Log Format set to CEF or LEEF, Cortex Cloud reads events row by row to look for the Vendor and Product configured in the logs. When the values are populated in the event log row, Cortex Cloud uses these values even if you specified a value in the Vendor and Product fields in the GCP data collector settings. Yet, when the values are blank in the event log row, Cortex Cloud uses the Vendor and Product that you specified in the GCP data collector settings. If you did not specify a Vendor or Product in the GCP data collector settings, and the values are blank in the event log row, the values for both fields are set to unknown.
                    
                -   Cisco: The following fields are automatically set and not configurable.
                    
                    -   Vendor: Cisco
                        
                    -   Product: ASA
                        
                    
                    Cisco data can be queried in XQL Search using the `cisco_asa_raw` dataset.
                    
                -   Corelight: The following fields are automatically set and not configurable.
                    
                    -   Vendor: Corelight
                        
                    -   Product: Zeek
                        
                    
                    Corelight data can be queried in XQL Search using the `corelight_zeek_raw` dataset.
                    
                -   Raw or JSON: The following fields are automatically set and are configurable.
                    
                    -   Vendor: Google
                        
                    -   Product: Cloud Logging
                        
                    
                    Raw or JSON data can be queried in XQL Search using the `google_cloud_logging_raw` dataset.
                    
                    Cortex Cloud supports logs in single line format or multiline format. For a JSON format, multiline logs are collected automatically when the Log Format is configured as JSON. When configuring a Raw format, you must also define the Multiline Parsing Regex as explained below.
                    
                
            -   Vendor: (Optional) Specify a particular vendor name for the GCP generic data collection, which is used in the GCP XQL dataset `<Vendor>_<Product>_raw` that Cortex Cloud creates as soon as it begins receiving logs.
                
            -   Product: (Optional) Specify a particular product name for the GCP generic data collection, which is used in the GCP XQL dataset name `<Vendor>_<Product>_raw` that Cortex Cloud creates as soon as it begins receiving logs.
                
            -   Multiline Parsing Regex: (Optional) This option is only displayed when the Log Format is set to Raw, where you can set the regular expression that identifies when the multiline event starts in logs with multilines. It is assumed that when a new event begins, the previous one has ended.
                
            
        -   Google Cloud DNS: When selecting this log type, you can configure whether to normalize the logs as part of the enhanced cloud protection.
            
            -   Optional) You can Normalize DNS logs by selecting the checkbox (default). If selected, Cortex Cloud ingests the Google Cloud DNS logs as Cortex Cloud network connection stories, which you can query using XQL Search from the `xdr_dataset` dataset with the preset called `network_story`.
                
            -   The Vendor is automatically set to Google and Product to DNS , which is not configurable. This means that all Google Cloud DNS logs, whether it's normalized or not, can be queried in XQL Search using the `google_dns_raw` dataset.
                
            
        
    6.  Test the provided settings and, if successful, proceed to Enable log collection.
        

1.  Log in to your GCP account.
    
2.  Set up log forwarding from GCP to Cortex Cloud.
    
    1.  Select Logging → Logs Router.
        
    2.  Select Create Sink → Cloud Pub/Sub topic, and then click Next.
        
    3.  To filter only specific types of data, select the filter or desired resource.
        
    4.  In the Edit Sink configuration, define a descriptive Sink Name.
        
    5.  Select Sink Destination → Create new Cloud Pub/Sub topic.
        
    6.  Enter a descriptive Name that identifies the sink purpose for Cortex Cloud, and then Create.
        
    7.  Create Sink and then Close when finished.
        
3.  Create a subscription for your Pub/Sub topic.
    
    1.  Select the menu icon in G Cloud, and then select Pub/Sub → Topics.
        
    2.  Select the name of the topic you created in the previous steps. Use the filters if necessary.
        
    3.  Select Create Subscription → Create subscription.
        
    4.  Enter a unique Subscription ID.
        
    5.  Choose Pull as the Delivery Type.
        
    6.  Create the subscription.
        
        After the subscription is set up, G Cloud displays statistics and settings for the service.
        
    7.  In the subscription details, identify and note your Subscription Name.
        
        Optionally, use the copy button to copy the name to the clipboard. You will need the name when you configure Collection in Cortex Cloud.
        
4.  Create a service account and authentication key.
    
    You will use the key to enable Cortex Cloud to authenticate with the subscription service.
    
    1.  Select the menu icon, and then select IAM & Admin → Service Accounts.
        
    2.  Create Service Account.
        
    3.  Enter a Service account name and then Create.
        
    4.  Select a role for the account: Pub/Sub → Pub/Sub Subscriber.
        
    5.  Click Continue → Done.
        
    6.  Locate the service account by name, using the filters to refine the results, if needed.
        
    7.  Click the Actions menu identified by the three dots in the row for the service account and then Create Key.
        
    8.  Select JSON as the key type, and then Create.
        
        After you create the service account key, G Cloud automatically downloads it.
        
5.  After Cortex Cloud begins receiving information from the GCP Pub/Sub service, you can use the XQL Query language to search for specific data.
    

##### Set up log forwarding using the GCP cloud shell terminal

-   In Cortex Cloud, set up Data Collection.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  On the Data Sources & Integrations page, click \+ Add New, search for Google Cloud Platform, then hover over it and click Add.
        
    3.  Specify the Subscription Name that you previously noted or copied.
        
    4.  Browse to the JSON file containing your authentication key for the service account.
        
    5.  Select the Log Type as one of the following, where your selection changes the options displayed.
        
        -   Flow or Audit Logs: When selecting this log type, you can decide whether to normalize and enrich the logs as part of the enhanced cloud protection.
            
            -   (Optional) You can Normalize and enrich flow and audit logs by selecting the checkbox (default). If selected, Cortex Cloud ingests the network flow logs as Cortex Cloud network connection stories, which you can query using XQL Search from the `xdr_dataset` dataset with the preset called `network_story`. In addition, you can configure Cortex Cloud to normalize GCP audit logs, which you can query with XQL Search using the `cloud_audit_logs` dataset.
                
            -   The Vendor is automatically set to Google and Product to Cloud Logging, which is not configurable. This means that all GCP data for the flow and audit logs, whether it's normalized or not, can be queried in XQL Search using the `google_cloud_logging_raw` dataset.
                
            
        -   Generic: When selecting this log type, you can configure the following settings.
            
            -   Log Format: Select the log format type as Raw, JSON, CEF, LEEF, Cisco, or Corelight.
                
                -   CEF or LEEF: The Vendor and Product defaults to Auto-Detect.
                    
                    **Note:**
                    
                    For a Log Format set to CEF or LEEF, Cortex Cloud reads events row by row to look for the Vendor and Product configured in the logs. When the values are populated in the event log row, Cortex Cloud uses these values even if you specified a value in the Vendor and Product fields in the GCP data collector settings. Yet, when the values are blank in the event log row, Cortex Cloud uses the Vendor and Product that you specified in the GCP data collector settings. If you did not specify a Vendor or Product in the GCP data collector settings, and the values are blank in the event log row, the values for both fields are set to unknown.
                    
                -   Cisco: The following fields are automatically set and not configurable.
                    
                    -   Vendor: Cisco
                        
                    -   Product: ASA
                        
                    
                    Cisco data can be queried in XQL Search using the `cisco_asa_raw` dataset.
                    
                -   Corelight: The following fields are automatically set and not configurable.
                    
                    -   Vendor: Corelight
                        
                    -   Product: Zeek
                        
                    
                    Corelight data can be queried in XQL Search using the `corelight_zeek_raw` dataset.
                    
                -   Raw or JSON: The following fields are automatically set and are configurable.
                    
                    -   Vendor: Google
                        
                    -   Product: Cloud Logging
                        
                    
                    Raw or JSON data can be queried in XQL Search using the `google_cloud_logging_raw` dataset.
                    
                    Cortex Cloud supports logs in single line format or multiline format. For a JSON format, multiline logs are collected automatically when the Log Format is configured as JSON. When configuring a Raw format, you must also define the Multiline Parsing Regex as explained below.
                    
                
            -   Vendor: (Optional) Specify a particular vendor name for the GCP generic data collection, which is used in the GCP XQL dataset `<Vendor>_<Product>_raw` that Cortex Cloud creates as soon as it begins receiving logs.
                
            -   Product: (Optional) Specify a particular product name for the GCP generic data collection, which is used in the GCP XQL dataset name `<Vendor>_<Product>_raw` that Cortex Cloud creates as soon as it begins receiving logs.
                
            -   Multiline Parsing Regex: (Optional) This option is only displayed when the Log Format is set to Raw, where you can set the regular expression that identifies when the multiline event starts in logs with multilines. It is assumed that when a new event begins, the previous one has ended.
                
            
        -   Google Cloud DNS: When selecting this log type, you can configure whether to normalize the logs as part of the enhanced cloud protection.
            
            -   Optional) You can Normalize DNS logs by selecting the checkbox (default). If selected, Cortex Cloud ingests the Google Cloud DNS logs as Cortex Cloud network connection stories, which you can query using XQL Search from the `xdr_dataset` dataset with the preset called `network_story`.
                
            -   The Vendor is automatically set to Google and Product to DNS , which is not configurable. This means that all Google Cloud DNS logs, whether it's normalized or not, can be queried in XQL Search using the `google_dns_raw` dataset.
                
            
        
    6.  Test the provided settings and, if successful, proceed to Enable log collection.
        

1.  Launch the GCP cloud shell terminal or use your preferred shell with gcloud installed.
    
    
    
2.  Define your project ID.
    
    gcloud config set project `<PROJECT_ID>`
                         
    
3.  Create a Pub/Sub topic.
    
    gcloud pubsub topics create `<TOPIC_NAME>`
                         
    
4.  Create a subscription for this topic.
    
    gcloud pubsub subscriptions create `<SUBSCRIPTION_NAME>` --topic=`<TOPIC_NAME>`
                         
    
    Note the subscription name you define in this step as you will need it to set up log ingestion from Cortex Cloud.
    
5.  Create a logging sink.
    
    During the logging sink creation, you can also define additional log filters to exclude specific logs. To filter logs, supply the optional parameter `--log-filter=``<LOG_FILTER>`
    
    gcloud logging sinks create `<SINK_NAME>` pubsub.googleapis.com/projects/`<PROJECT_ID>`/topics/`<TOPIC_NAME>` --log-filter=`<LOG_FILTER>`
                         
    
    If setup is successful, the console displays a summary of your log sink settings:
    
    ```
    Created [https://logging.googleapis.com/v2/projects/PROJECT_ID/sinks/SINK_NAME]. Please remember to grant \`serviceAccount:LOGS_SINK_SERVICE_ACCOUNT\` \\ the Pub/Sub Publisher role on the topic. More information about sinks can be found at /logging/docs/export/configure_export
    ```
    
6.  Grant log sink service account to publish to the new topic.
    
    Note the `serviceAccount` name from the previous step and use it to define the service for which you want to grant publish access.
    
    gcloud pubsub topics add-iam-policy-binding `<TOPIC_NAME>` --member serviceAccount:`<LOGS_SINK_SERVICE_ACCOUNT>` --role=roles/pubsub.publisher
    
7.  Create a service account.
    
    For example, use cortex-xdr-sa as the service account name and Cortex Cloud Service Account as the display name.
    
    gcloud iam service-accounts create `<SERVICE_ACCOUNT>` --description="`<DESCRIPTION>`" --display-name="`<DISPLAY_NAME>`"
    
8.  Grant the IAM role to the service account.
    
    gcloud pubsub subscriptions add-iam-policy-binding `<SUBSCRIPTION_NAME>` --member serviceAccount:`<SERVICE_ACCOUNT>`@`<PROJECT_ID>`.iam.gserviceaccount.com --role=roles/pubsub.subscriber
    
9.  Create a JSON key for the service account.
    
    You will need the JSON file to enable Cortex Cloud to authenticate with the GCP service. Specify the file destination and filename using a .json extension.
    
    gcloud iam service-accounts keys create `<OUTPUT_FILE>` --iam-account `<SERVICE_ACCOUNT>`@`<PROJECT_ID>`.iam.gserviceaccount.com
    
10.  After Cortex Cloud begins receiving information from the GCP Pub/Sub service, you can use the XQL Query language to search for specific data.

### Google Workspace

Learn more about the Google Workspace Standard Collector and content pack integrations in Cortex Cloud.

You can configure collecting Google Workspace logs and data using a Standard Collector or with a content pack integration:

| Google Workspace vendor | Description |
| --- | --- |
| Standard Collector overview | Forward logs and data to Cortex Cloud from Google Workspace using the Google Workspace data source. |
| Link to Standard Collector instructions | The following types of data can be ingested from Google Workspace: Google Chrome; Admin Console; Google Chat; Enterprise Groups; Login; Rules; Google drive; Token; User Accounts; SAML; Alerts; Emails For more information, see Ingest logs and data from Google Workspace. |
| Links to content pack/ integration details | The [G Suite Admin](https://cortex.marketplace.pan.dev/marketplace/details/GSuiteAdmin) content pack integrates with Cortex Cloud to handle various administrative tasks for G Suite or Google Workspace Admin environments. It contains the following integration: [Google Workspace Admin](https://xsoar.pan.dev/docs/reference/integrations/g-suite-admin): Use this integration to perform actions on IT infrastructure, create users, update settings, and manage other administrative duties. It includes commands for user management, device management (Chrome browser devices), policy management, and data transfer. |

#### Ingest logs and data from Google Workspace

Ingest logs and data from Google Workspace for use in Cortex Cloud.

**Notice:**

Requires the ITDR Module add-on and Data Collection add-on.

Cortex Cloud can ingest various types of data from Google Workspace. Most data is collected as audit events from various Google reports using the Google Workspace data collector.

To receive logs from Google Workspace for any of the data types except emails, you must first enable the Google Workspace Admin SDK API with a user with access to the Admin SDK Reports API. For emails, you must set up a compliance email account as explained in the prerequisite steps below and then enable the Google Workspace Gmail API.

Once implemented, you can then configure the Data Sources & Integrations settings in Cortex Cloud. After you set up data collection, Cortex Cloud begins receiving new logs and data from the source.

Ingestible data types

Cortex Cloud can ingest the following data types:

-   Google Chrome: Chrome browser and Chrome OS events from activity reports.
    
-   Admin Console: Administrator activity events from audit logs.
    
-   Google Chat: Activity events from Chat reports.
    
-   Enterprise Groups: Group activity events from Enterprise Groups reports.
    
-   Login: Information regarding login activity events.
    
-   Rules: Activity events included in Rules activity reports.
    
-   Google drive: Activity events from Google Drive application reports.
    
-   Token: Token activity events from Token application reports.
    
-   User Accounts: Activity events related to user accounts.
    
-   SAML: Activity events included in SAML activity reports.
    
-   Alerts: Alerts retrieved via the Alert Center API.
    
-   Emails: Message details, excluding headers and body content (`payload.body`, `payload.parts`, and `snippet`), via a compliance mailbox to ingest email data (not email reports).
    

Required Google APIs

The following Google APIs must be enabled in your Google Cloud project:

-   **For all data types except emails**: [Admin SDK API](https://developers.google.com/admin-sdk).
    
-   **For all data types except alerts and emails**: [Admin Reports API](https://developers.google.com/admin-sdk/reports/reference/rest) (part of Admin SDK API).
    
    **Note:**
    
    For all types of data collected via the Admin Reports API, except alerts and emails, the log events are collected with a preset lag time as reported by Google Workspace. For more information on these lag times for the different types of data, see [Google Workspace Data retention and lag times](https://support.google.com/a/answer/7061566?hl=en).
    
-   **Alerts**: [Alert Center API](https://developers.google.com/admin-sdk/alertcenter) (part of Admin SDK API).
    
-   **Emails**: [Gmail API](https://developers.google.com/gmail/api).
    

Prerequisite Steps

-   **For all data types except emails**: Complete the Google Workspace Reports API Prerequisites to set up the Google Workspace Admin SDK environment. This entails completing the instructions for **Set up the basics** and **Set up a Google API Console project** _without_ activating the Reports API service as this will be explained in greater detail in the task below. For more information on these Google Workspace prerequisite steps, see [Reports API Prerequisites](https://developers.google.com/admin-sdk/reports/v1/guides/prerequisites).
    
-   **For Alerts only**: If you are not configuring other data types, you must still set up a [Cloud Platform project](https://developers.google.com/admin-sdk/alertcenter/quickstart/java) and enable the Alert Center API.
    
-   **For Google Emails**:
    
    1.  Set up a compliance email account (compliance mailbox) to receive email data.
        
    2.  Set up a BCC for all incoming and outgoing emails of any user to this compliance account.
        
        1.  Login to the [Admin direct routing URL](https://admin.google.com/ac/apps/gmail/routing) in Google Workspace for the user account that you want to configure.
            
        2.  Double-click Routing, and set the following parameters in the Add setting dialog.
            
            -   Routing: Configure the compliance email account that you want to receive a BCC for emails from this user account using the format `BCC TO <compliance email>`. For example, `BCC TO admin@organization.com`.
                
            -   Select Inbound and Outbound to ensure all incoming and outgoing emails are sent.
                
            -   (Optional) To configure another email address to receive a BCC for emails from this account, select Add more recipients in the Also deliver to section, and then click Add.
                
            -   Click Show options, and from the list displayed select Account types to affect → Users.
                
            -   Save your changes.
                
            
    
    This configuration ensures to forward every message sent to a user account to a defined compliance mailbox. After the Google Workspace data collector ingests the emails, they are deleted from the compliance mailbox to prevent email from building up over time (nothing touches the actual users’ mailboxes).
    
    **Note:**
    
    -   Spam emails from the compliance email account, and from all other monitored email accounts, are not collected.
        
    -   Any draft emails written in the compliance email account are collected by the Google Workspace data collector, and are then deleted even if the email was never sent.
        
    
-   **Create a custom role with at least these permissions**: To follow the principle of least privilege, you must create a custom role in the Google Admin Console to ensure the user being impersonated has at least the following permissions:
    
    1.  In the Google Admin Console, select Account → Admin roles.
        
    2.  Click Create new role.
        
    3.  Assign at least the following permissions:
        
        -   Reports: View Reports.
            
        -   Services: Alerts (Full Access).
            
        
    4.  Assign this custom role to the user account you intend to use for impersonation. Record this user's email address.
        
    

Set up the Google Workspace integration

Task 1. Perform Google Workspace Domain-Wide Delegation of Authority

When collecting any type of data from Google Workspace, except Google emails, you must authorize your service account to access user data on your Google Workspace domain without requiring each user to manually give consent.

**Note:**

For more information on the entire process, see [Perform Google Workspace Domain-Wide Delegation of Authority](https://developers.google.com/admin-sdk/reports/v1/guides/delegation).

1.  In your [Google Cloud Platform (GCP) project](https://console.cloud.google.com/), enable the Admin SDK API to create a service account and set credentials for this service account.
    
    As you complete this step, you need to gather information related to your service account, including the Client ID, Private key file, and Email address, which you will need to use later on in this task.
    
    1.  Select the menu icon → APIs & Services → Library.
        
    2.  Search for the **`Admin SDK API`**, and select the API from the results list.
        
    3.  Enable the Admin SDK API.
        
    4.  Select APIs & Services → Credentials.
        
    5.  Select \+ CREATE CREDENTIALS → Service account.
        
    6.  Set the following Service account details in the applicable fields:
        
        -   Specify a service account name. This name is automatically used to populate the following field as the service account ID, where the name is changed to lowercase letters and all spaces are changed to hyphens.
            
        -   Specify the service account ID, where you can either leave the default service account ID or add a new one. This service account ID is used to set the service account email using the following format: `<id>@<project name>.iam.gserviceaccount.com`.
            
        -   (Optional) Specify a service account description.
            
        
    7.  CREATE AND CONTINUE.
        
    8.  (Optional) Decide whether you want to Grant this service account access to project or Grant users access to this service account.
        
    9.  Click Done.
        
    10.  Select your newly created Service Account from the list.
         
    11.  Create a service account private key and download the private key file as a JSON file.
         
         In the Keys tab, select ADD KEY → Create new key, leave the default Key type set to JSON, and CREATE the private key. Once you’ve downloaded the new private key pair to your machine, ensure that you store it in a secure location, because it’s the only copy of this key. You will need to browse to this JSON file when configuring the Google Workplace data collector in Cortex Cloud.
         
         **Note:**
         
         You don't need to add permissions to the GCP Project-org service account.
         
2.  When collecting alerts, enable the Alert Center API to create a service account and set credentials for this service account.
    
    **Note:**
    
    When collecting Google Workspace alerts with other types of data, except emails, you need to configure a service account in Google with the applicable permissions to collect events from the Google Reports API and alerts from the Alert Center API. If you prefer to use different service accounts to collect events and alerts separately, you'll need to create two service accounts with different instances of the Google Workspace data collector. One instance to collect events with a certain service account, and another instance to collect alerts using another service account. The instructions below explain how to set up one Google Workspace instance to collect both event and alerts.
    
    1.  Select the menu icon → APIs & Services → Library.
        
    2.  Search for the **`Alert Center API`**, and select the API from the results list.
        
    3.  Enable the Alert Center API.
        
    4.  Select APIs & Services → Credentials.
        
    5.  Select the same service account in the Service Accounts section that you created for the Admin SDK API above.
        
3.  Delegate domain-wide authority to your service account with the Admin Reports API and Alert Center API scopes.
    
    1.  Open the [Google Admin Console](https://admin.google.com).
        
    2.  Select Security → Access and data control → API controls.
        
    3.  Scroll down to the Domain wide delegation section, and select MANAGE DOMAIN WIDE DELEGATION.
        
    4.  Click Add new.
        
    5.  Set the following settings to define permissions for the Admin SDK API:
        
        -   Client ID: Specify the service account’s Unique ID, which you can obtain from the [Service accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts) by clicking the email of the service account to view further details. When creating a single Google Workspace data collector instance to collect both events and alert data, provide the same service account ID as the Admin SDK API.
            
        -   In the OAuth scopes (comma-delimited) field, paste in the first of the two Admin Reports API scopes: `https://www.googleapis.com/auth/admin.reports.audit.readonly`
            
        -   In the following OAuth scopes (comma-delimited) field, paste in the second Admin Reports API scope: `https://www.googleapis.com/auth/admin.reports.usage.readonly`
            
            **Note:**
            
            For more information on the Admin Reports API scopes, see [OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes).
            
        -   When collecting alerts, add the following Alert Center API scope: `https://www.googleapis.com/auth/apps.alerts`
            
        
    6.  Authorize the domain-wide authority to your service account.
        
        This ensures that your service account now has domain-wide access to the Google Admin SDK Reports API and Google Workspace Alert Center API, if configured, for all of the users of your domain.
        

Task 2. Enable the Gmail API to collect Google emails

When you are configuring the Google Workspace data collector to collect Google emails, the instruction differ depending on whether you are configuring the collection along with other types of data with the Admin SDK API already set up or you are configuring the collection to only include emails using only the Gmail API. The steps below explain both scenarios.

1.  Select the menu icon → APIs & Services → Library.
    
2.  Search for the `Gmail API`, and select the API from the results list.
    
3.  Enable the Gmail API.
    
4.  Select APIs & Services → Credentials.
    
    The instructions for setting up credentials differ depending on whether you are setting up the Gmail API together with the Admin SDK API as you are collecting other data types, or you are configuring collection for emails only with the Gmail API.
    
    -   When you’ve already set up the Admin SDK API, verify that the same Service Account that you configured for the Admin SDK API is listed, and continue on to the next step.
        
    -   When you’re only collecting Google emails without the Admin SDK API, complete these steps.
        
        1.  Select \+ CREATE CREDENTIALS → Service account.
            
        2.  Set the following Service account details in the applicable fields.
            
            \-Specify a service account name. This name is automatically used to populate the following field as the service account ID, where the name is changed to lowercase letters and all spaces are changed to hyphens.
            
            \-Specify the service account ID, where you can either leave the default service account ID or add a new one. This service account ID is used to set the service account email using the following format: `<id>@<project name>.iam.gserviceaccount.com`.
            
            \-(Optional) Specify a service account description.
            
        3.  CREATE AND CONTINUE.
            
        4.  (Optional) Decide whether you want to Grant this service account access to project or Grant users access to this service account.
            
        5.  Click Done.
            
        6.  Select your newly created Service Account from the list.
            
        7.  Create a service account private key and download the private key file as a JSON file.
            
            In the Keys tab, select ADD KEY → Create new key, leave the default Key type set to JSON, and CREATE the private key. Once you’ve downloaded the new private key pair to your machine, ensure that you store it in a secure location as it’s the only copy of this key. You will need to browse to this JSON file when configuring the Google Workplace data collector in Cortex Cloud .
            
        
    
5.  Delegate domain-wide authority to your service account with the Gmail API scopes.
    
    1.  Open the [Google Admin Console](https://admin.google.com).
        
    2.  Select Security → Access and data control → API controls.
        
    3.  Scroll down to the Domain wide delegation section, and select MANAGE DOMAIN WIDE DELEGATION.
        
        This step explains how the following Gmail API scopes are added:
        
        -   `https://mail.google.com/`
            
        -   `https://www.googleapis.com/auth/gmail.addons.current.action.compose`
            
        -   `https://www.googleapis.com/auth/gmail.addons.current.message.action`
            
        -   `https://www.googleapis.com/auth/gmail.addons.current.message.metadata`
            
        -   `https://www.googleapis.com/auth/gmail.addons.current.message.readonly`
            
        -   `https://www.googleapis.com/auth/gmail.compose`
            
        -   `https://www.googleapis.com/auth/gmail.insert`
            
        -   `https://www.googleapis.com/auth/gmail.labels`
            
        -   `https://www.googleapis.com/auth/gmail.metadata`
            
        -   `https://www.googleapis.com/auth/gmail.modify`
            
        -   `https://www.googleapis.com/auth/gmail.readonly`
            
        -   `https://www.googleapis.com/auth/gmail.send`
            
        -   `https://www.googleapis.com/auth/gmail.settings.basic`
            
        -   `https://www.googleapis.com/auth/gmail.settings.sharing`
            
            **Note:**
            
            For more information on the Gmail API scopes, see [OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes).
            
        
        The instructions differ depending on whether you are setting up the Gmail API together with the Admin SDK API as you are collecting other data types, or you are configuring collection for emails only with the Gmail API.
        
        -   When you’ve already set up the Admin SDK API, Edit the same Service Account that you configured for the Admin SDK API, and add the Gmail API scopes listed above.
            
        -   When you’re only collecting Google emails without the Admin SDK API, click Add New, and set the following settings to define permissions for the Admin SDK API.
            
            \-Client ID—Specify the service account’s Unique ID, which you can obtain from the [Service accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts) by clicking the email of the service account to view further details.
            
            In the OAuth scopes (comma-delimited) field, paste in the first of the Gmail API scopes listed above, and continue adding in the rest of the scopes.
            
            Authorize the domain-wide authority to your service account.
            
            This ensures that your service account now has domain-wide access to the Google Gmail API for all of the users of your domain.
            
        

Task 3. Prepare your service account to impersonate a user with access to the Admin SDK Reports API

You can prepare your service account to impersonate a user with access to the Admin SDK Reports API when collecting any type of data from Google Workspace except Google emails.

Only users with access to the Admin APIs can access the Admin SDK Reports API. Therefore, your service account needs to be set up to impersonate one of these users to access the Admin SDK Reports API. This means that when collecting any type of data from Google Workspace except Google emails, you need to designate a user whose Roles permissions are set to access reports, where Security → Reports is selected. This user’s email will be required when configuring the Google Workspace data collector in Cortex Cloud.

1.  In the [Google Admin Console](https://admin.google.com), select Directory → Users.
    
2.  From the list of users listed, select the user configured with the necessary permissions in Admin roles and privileges to view reports that you want to set up your service account to impersonate. This is the user you created the custom role for in the Create a custom role with at least these permissions of the prerequisite steps above.
    
3.  Record the email of this user as you will need it in Cortex Cloud .
    

Task 4. Integrate with Cortex Cloud

1.  In Cortex Cloud, select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New, search for Google Workspace, then hover over it and click Add.
    
3.  Integrate the applicable Google Workspace service with Cortex Cloud.
    
    1.  Specify a descriptive Name for your log collection integration.
        
    2.  Browse to the JSON file containing your service account key Credentials for the Google Workspace Admin SDK API that you enabled. If you’re only collecting Google emails, ensure that you Browse to the JSON file containing your service account private key Credentials for the Gmail API that you enabled.
        
    3.  Select the types of data that you want to Collect from Google Workspace.
        
        -   Google Chrome: [Chrome browser and Chrome OS events](https://developers.google.com/admin-sdk/reports/v1/appendix/activity/chrome) included in the Chrome activity reports.
            
        -   Admin Console: Account information about different types of [administrator activity events](https://developers.google.com/admin-sdk/reports/v1/appendix/activity/admin-event-names) included in the Admin console application's activity reports.
            
        -   Google Chat: [Chat activity events](https://developers.google.com/admin-sdk/reports/v1/appendix/activity/chat) included in the Chat activity reports.
            
        -   Enterprise Groups: [Enterprise group activity events](https://developers.google.com/admin-sdk/reports/v1/appendix/activity/groups-enterprise) included in the Enterprise Groups activity reports.
            
        -   Login: Account information about different types of [login activity events](https://developers.google.com/admin-sdk/reports/v1/appendix/activity/login) included in the Login application's activity reports.
            
        -   Rules: [Rules activity events](https://developers.google.com/admin-sdk/reports/v1/appendix/activity/rules) included in the Rules activity report.
            
        -   Google drive: [Google Drive activity events](https://developers.google.com/admin-sdk/reports/v1/appendix/activity/drive) included in the Google Drive application's activity reports.
            
        -   Token: [Token activity events](https://developers.google.com/admin-sdk/reports/v1/appendix/activity/token) included in the Token application's activity reports.
            
        -   User Accounts: Account information about different types of [User Accounts activity events](https://developers.google.com/admin-sdk/reports/v1/appendix/activity/user-accounts) included in the User Accounts application's activity reports.
            
        -   SAML: [SAML activity events](https://developers.google.com/admin-sdk/reports/v1/appendix/activity/saml) included in the SAML activity report.
            
        -   Alerts: Alerts from the [Alert Center API beta version](http://%20https://developers.google.com/admin-sdk/alertcenter/guides), which is still subject to change.
            
        -   Emails: Collects email data (not emails reports). All message details except email headers and email content (`payload.body`, `payload.parts`, and `snippet`).
            
            **Note:**
            
            For more information about the events collected from the various Google Reports, see [Google Workspace Reports API Documentation](https://developers.google.com/admin-sdk/reports/reference/rest/v1/activities/list#ApplicationName).
            
        
        For all options selected, except Emails, you must specify the Service Account Email. This is the email account of the user with access to the Admin SDK Reports API that you prepared your service account to impersonate.
        
        When selecting Emails, configure the following.
        
        -   Audit Email Account: Specify the email address for the compliance mailbox that you set up.
            
        
    4.  Test the connection settings.
        
        To test the connection, you must select one or more log types. Cortex Cloud then tests the connection settings for the selected log types.
        
    5.  If successful, Enable Google Workspace log collection.
        

Data visualization and analysis

When Cortex Cloud begins receiving logs, the app creates a new dataset for the different types of data that you are collecting, which you can use to initiate XQL Search queries. For example queries, refer to the in-app XQL Library.

For all logs, Cortex Cloud can generate Cortex Cloud issues for Correlation Rules only, when relevant from Google Workspace logs.

For the different types of data you can collect using the Google Workspace data collector, the following table lists the different datasets, vendors, and products automatically configured, and whether the data is normalized.

| Data type | Dataset | Vendor | Product | Normalized data |
| --- | --- | --- | --- | --- |
| Google Chrome | `google_workspace_chrome_raw` | Google | Workspace Chrome | — |
| Admin console | `google_workspace_admin_console_raw` | Google | Workspace Admin Console | When relevant, Cortex Cloud normalizes Admin Console audit logs into authentication stories. All SaaS audit logs are collected in a dataset called `saas_audit_logs` and specific relevant events are collected in the `authentication_story` preset for the `xdr_data` dataset. |
| Google Chat | `google_workspace_chat_raw` | Google | Workspace Chat | — |
| Enterprise groups | `google_workspace_enterprise_groups_raw` | Google | Workspace Enterprise Groups | When relevant, Cortex Cloud normalizes Enterprise Group audit logs into authentication stories. All SaaS audit logs are collected in a dataset called `saas_audit_logs` and specific relevant events are collected in the `authentication_story` preset for the `xdr_data` dataset. |
| Login | `google_workspace_login_raw` | Google | Workspace Login | When relevant, Cortex Cloud normalizes Login audit logs into authentication stories. All SaaS audit logs are collected in a dataset called `saas_audit_logs` and specific relevant events are collected in the `authentication_story` preset for the `xdr_data` dataset. |
| Rules | `google_workspace_rules_raw` | Google | Workspace Rules | When relevant, Cortex Cloud normalizes Rules audit logs into authentication stories. All SaaS audit logs are collected in a dataset called `saas_audit_logs` and specific relevant events are collected in the `authentication_story` preset for the `xdr_data` dataset. |
| Google Drive | `google_workspace_drive_raw` | Google | Workspace Drive | When relevant, Cortex Cloud normalizes Google drive audit logs into authentication stories. All SaaS audit logs are collected in a dataset called `saas_audit_logs` and specific relevant events are collected in the `authentication_story` preset for the `xdr_data` dataset. |
| Token | `google_workspace_token_raw` | Google | Workspace Token | When relevant, Cortex Cloud normalizes Token audit logs into authentication stories. All SaaS audit logs are collected in a dataset called `saas_audit_logs` and specific relevant events are collected in the `authentication_story` preset for the `xdr_data` dataset. |
| User accounts | `google_workspace_user_accounts_raw` | Google | Workspace User Accounts | — |
| SAML | `google_workspace_saml_raw` | Google | Workspace SAML | When relevant, Cortex Cloud normalizes SAML audit logs into authentication stories. All SaaS audit logs are collected in a dataset called `saas_audit_logs` and specific relevant events are collected in the `authentication_story` preset for the `xdr_data` dataset. |
| Alerts | `google_workspace_alerts_raw` | Google | Workspace Alerts | — |
| Emails | `google_gmail_raw` | Google | Gmail | — |

### Google Kubernetes Engine

Learn more about collecting Google Kubernetes Engine logs and data using a custom collector (standard data source) and content pack integration in Cortex Cloud.

**Note:**

It's also possible to use a Custom - Filebeat based Collector to ingest logs related to file activity on your endpoints and servers without using the Cortex XDR agent. For more information, see Elasticsearch Filebeat.

You can configure collecting Google Kubernetes logs and data using a Custom - Filebeat based Collector (standard data source) or with a content pack integration:

| Google Kubernetes Engine (GKE) vendor | Description |
| --- | --- |
| Custom - Filebeat based Collector overview (standard data source) overview | Forward container logs from Google Kubernetes Engine using Elasticsearch Filebeat to Cortex Cloud using the Custom - Filebeat based Collector data source. |
| Link to custom collector (standard data source) instructions | Ingest logs from Google Kubernetes Engine |
| Links to content pack/integration instructions | The [Google Kubernetes Engine](https://cortex.marketplace.pan.dev/marketplace/details/GoogleKubernetesEngine/) content pack builds and manages container-based applications in Google Cloud Platform (GCP), powered by the open source Kubernetes technology. It contains the Google Kubernetes Engine Operations Generic Polling playbook as well as the following integration: [Google Kubernetes Engine](https://xsoar.pan.dev/docs/reference/integrations/google-kubernetes-engine): Use this integration to build and manage container-based applications in Google Cloud Platform (GCP), utilizing the open source Kubernetes technology. This integration is used by the Google Kubernetes Engine Operations Generic Polling playbook, which checks operation status and facilitates the waiting between steps in cluster configuration. |

#### Ingest logs from Google Kubernetes Engine

Forward your Google Kubernetes Engine (GKE) logs directly to Cortex Cloud using Elasticsearch Filebeat.

**Notice:**

Requires the Data Collection add-on.

Instead of forwarding Google Kubernetes Engine (GKE) logs directly to Google StackDrive, Cortex Cloud can ingest container logs from GKE using Elasticsearch Filebeat. To receive logs, you must install Filebeat on your containers and enable Data Collection settings for Filebeat.

When Cortex Cloud begins receiving logs, the app automatically creates an Cortex Query Language (XQL) dataset using the vendor and product name that you specify during Filebeat setup. It is recommended to specify a descriptive name. For example, if you specify `google` as the vendor and `kubernetes` as the product, the dataset name will be `google_kubernetes_raw`. If you leave the product and vendor blank, Cortex Cloud assigns the dataset a name of `container_container_raw`.

After Cortex Cloud creates the dataset, you can search your GKE logs using XQL Search.

1.  Install Filebeat on your containers.
    
    For more information, see [https://www.elastic.co/guide/en/beats/filebeat/current/running-on-kubernetes.html](https://www.elastic.co/guide/en/beats/filebeat/current/running-on-kubernetes.html).
    
2.  .
    
    Record your token key and API URL for the Filebeat Collector instance as you will need these later in this workflow.
    
3.  Deploy a Filebeat as a DaemonSet on Kubernetes.
    
    This ensures there is a running instance of Filebeat on each node of the cluster.
    
    1.  Download the manifest file to a location where you can edit it.
        
        `curl -L -O https://raw.githubusercontent.com/elastic/beats/7.10/deploy/kubernetes/filebeat-kubernetes.yaml`
        
    2.  Open the YAML file in your preferred text editor.
        
    3.  Remove the `cloud.id` and `cloud.auth` lines.
        
        
        
    4.  For the `output.elasticsearch` configuration, replace the `hosts`, `username`, and `password` with environment variable references for `hosts` and `api_key`, and add a field and value for `compression_level` and `bulk_max_size`.
        
        
        
    5.  In the `DaemonSet` configuration, locate the `env` configuration and replace `ELASTIC_CLOUD_AUTH`, `ELASTIC_CLOUD_ID`, `ELASTICSEARCH_USERNAME`, `ELASTICSEARCH_PASSWORD`, `ELASTICSEARCH_HOST`, `ELASTICSEARCH_PORT` and their relative values with the following.
        
        -   `ELASTICSEARCH_ENDPOINT`: Specify the API URL for your Cortex Cloud tenant. You can copy the URL from the Filebeat Collector instance you set up for GKE in the Cortex Cloud management console (Settings → Data Sources & Integrations → Add Data Source → Custom - Filebeat). The URL will include your tenant name (`https://api-tenant external URL:443/logs/v1/filebeat)`
            
        -   `ELASTICSEARCH_API_KEY`: Specify the token key you recorded earlier during the configuration of your Filebeat Collector instance.
            
        
        After you configure these settings your configuration should look like the following image.
        
        
        
    6.  Save your changes.
        
4.  If you use RedHat OpenShift, you must also specify additional settings.
    
    See [https://www.elastic.co/guide/en/beats/filebeat/7.10/running-on-kubernetes.html](https://www.elastic.co/guide/en/beats/filebeat/7.10/running-on-kubernetes.html#_red_hat_openshift_configuration).
    
5.  Deploy Filebeat on your Kubernetes.
    
    `kubectl create -f filebeat-kubernetes.yaml`
    
    This deploys Filebeat in the kube-system namespace. If you want to deploy the Filebeat configuration in other namespaces, change the namespace values in the YAML file (in any YAML inside this file) and add `-n <your_namespace>`.
    
    After you deploy your configuration, the Filebeat DameonSet runs throughout your containers to forward logs to Cortex Cloud. You can review the configuration from the Kubernetes Engine console: Workloads → Filebeat → YAML.
    
    **Note:**
    
    Cortex Cloud supports logs in single line format or multiline format. For more information on handling messages that span multiple lines of text in Elasticsearch Filebeat, see [Manage Multiline Messages](https://www.elastic.co/guide/en/beats/filebeat/current/multiline-examples.html).
    
6.  After Cortex Cloud begins receiving logs from GKE, you can use the XQL Search to search for logs in the new dataset.

### HTTP log collector

Learn more about the HTTP log custom collector (standard data source) in Cortex Cloud.

You can configure collecting any vendor logs over HTTP with a Custom - HTTP based Collector in a Raw, JSON, CEF, or LEEF format.

| HTTP log collector | Description |
| --- | --- |
| Custom - HTTP based Collector (standard data source) overview | Forward any vendor logs over HTTP in a Raw, JSON, CEF, or LEEF format to Cortex Cloud using the Custom - HTTP data source. |
| Link to standard data source instructions | Set up an HTTP log collector to receive logs |

#### Set up an HTTP log collector to receive logs

You can set up Cortex Cloud to receive logs from third-party sources, and automatically parse and process these logs.

**Notice:**

Requires the Data Collection add-on.

In addition to logs from supported vendors, you can set up a custom HTTP log collector to receive logs in Raw, JSON, CEF, or LEEF format. The HTTP Log Collector can ingest up to 80,000 events per sec.

When Cortex Cloud begins receiving logs from the third-party source, Cortex Cloud automatically parses the logs and creates a dataset with the name `<Vendor>_< Product>_raw`. You can then use XQL Search queries to view logs and create new Correlation rules.

To set up an HTTP log collector to receive logs from an external source.

1.  Create an HTTP Log collector in Cortex Cloud.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  On the Data Sources & Integrations page, click \+ Add New, search for HTTP, then hover over it and click Add.
        
    3.  Specify a descriptive Name for your HTTP log collection configuration.
        
    4.  Select the data object Compression, either gzip or uncompressed.
        
    5.  Select the Log Format as Raw, JSON, CEF, or LEEF.
        
        Cortex Cloud supports logs in single line format or multiline format. For a JSON format, multiline logs are collected automatically when the Log Format is configured as JSON. When configuring a Raw format, you must also define the Multiline Parsing Regex as explained below.
        
        **Note:**
        
        \-The Vendor and Product defaults to Auto-Detect when the Log Format is set to CEF or LEEF.
        
        \-For a Log Format set to CEF or LEEF, Cortex Cloud reads events row by row to look for the Vendor and Product configured in the logs. When the values are populated in the event log row, Cortex Cloud uses these values even if you specified a value in the Vendor and Product fields in the HTTP collector settings. However, when the values are blank in the event log row, Cortex Cloud uses the Vendor and Product that you specified in the HTTP collector settings. If you did not specify a Vendor or Product in the HTTP collector settings, and the values are blank in the event log row, the values for both fields are set to unknown.
        
    6.  Specify the Vendor and Product for the type of logs you are ingesting.
        
    7.  (Optional) Specify the Multiline Parsing Regex for logs with multilines.
        
        This option is only displayed when the Log Format is set to Raw, so you can set the regular expression that identifies when the multiline event starts in logs with multilines. It is assumed that when a new event begins, the previous one has ended.
        
    8.  Save & Generate Token.
        
        Click the copy icon next to the key and record it somewhere safe. You will need to provide this key when you configure your HTTP POST request and define the api_key. If you forget to record the key and close the window you will need to generate a new key and repeat this process.
        
        Click Done when finished.
        
2.  Send data to your Cortex Cloud HTTP log collector.
    
    1.  Send an HTTP POST request to the URL for your HTTP Log Collector.
        
        You can view a sample curl or python request on an HTTP collector instance by selecting View Example.
        
        Here is a CURL example:
        
        ```
        curl -X POST https://api-{tenant external URL}/logs/v1/event -H 'Authorization: {api_key}' -H 'Content-Type: text/plain' -d '{"example1": "test", "timestamp": 1609100113039}
        {"example2": [12321,546456,45687,1]}'
        ```
        
        Python 3 example:
        
        ```
        import requests
        def test_http_collector(api_key):
            headers = {
                "Authorization": api_key,
                "Content-Type": "text/plain"
            }
            # Note: the logs must be separated by a new line
            body = "{'example1': 'test', 'timestamp': 1609100113039}" \\
                   "{'example2': [12321,546456,45687,1]}"
            res = requests.post(url="https://api-{tenant external URL}/logs/v1/event",
                                headers=headers,
                                data=body)
            return res
        ```
        
    2.  Substitute the values specific to your configuration.
        
        -   `url`: You can copy the URL for your HTTP log collector from the Custom Collectors page. For example: `https://api-{tenant external URL}/logs/v1/event`.
            
        -   `Authorization`: Paste the `api_key` you previously recorded for your HTTP log collector, which is defined in the header.
            
        -   `Content-Type`: Depending on the data object format you selected during setup, this will be `application/json` for JSON format or `text/plain` for Text format. This is defined as part of the header.
            
        -   `Body`: The body contains the records you want to send to Cortex Cloud. Separate records with a `\n` (new line) delimiter. The request body can contain up to 10 Mib records, but 1 Mib is recommended. In the case of a curl command, the records are contained in the `-d ‘<records>’` parameter.
            
            **Note:**
            
            Each record cannot exceed 5 MB in size.
            
        
    3.  Review the possible success and failure code responses to your HTTP Post requests.
        
        The following table provides the various success and failure code responses to your HTTP Post requests, which can help you troubleshoot any problems with your HTTP Collector configuration.
        
        | Success/failure response code | Description | Output code displayed (if applicable) |
        | --- | --- | --- |
        | 200 | Success code that indicates there are no errors and the request was successful. | { "error": "false"} |
        | 401 | Unauthorized error code that indicates either an incorrect authorization token is being used or that the HTTP Collector is deleted/disabled. |  |
        | 404 | Error code 404 page not found that indicates a wrong URL. |  |
        | 413 | Error code indicating the payload is too large as the request size limit is 10 MB. |  |
        | 500 | Error code indicating the request was not able to be processed due to an incorrect log format between the request and the HTTP collector configuration. | { "error": "error processing request, error: failed to process the request"} |
        | 429 | Error code indicating too many requests as the rate limit is 400 requests per second per customer per endpoint. |  |
        
3.  Monitor your HTTP Log Collection integration.
    
    You can return to the Settings → Data Sources & Integrations page to monitor the status of your HTTP Log Collection configuration. For each instance, Cortex Cloud displays the number of logs received in the last hour, day, and week. You can also use the Data Ingestion Dashboard to view general statistics about your data ingestion configurations.
    
4.  After Cortex Cloud begins receiving logs, use the XQL Search to search your logs.

### Kubernetes

Learn more about collecting Kubernetes data using a standard data source in Cortex Cloud.

You can configure collecting Kubernetes data using a standard data source with the Onboard Kubernetes wizard:

| Kubernetes vendor | Description |
| --- | --- |
| Standard data source overview | The Kubernetes onboarding wizard is designed to facilitate the seamless setup of Kubernetes data into Cortex Cloud and deploys your Kubernetes Connector. |
| Link to standard data source instructions | Onboard the Kubernetes Connector Another relevant topic: What's new in Kubernetes Connector? |

#### Onboard the Kubernetes Connector

To onboard your Kubernetes cluster, choose the capabilities that fit your needs and download the Helm chart values. Install the Helm charts in your Kubernetes environment to grant Cortex Cloud permissions to collect the data.

Follow this wizard to deploy your Kubernetes Connector. The Kubernetes onboarding wizard is designed to facilitate the seamless setup of Kubernetes data into Cortex Cloud. The guided experience requires minimal user input; simply select the capabilities that fit your needs and download the custom installer file. For full control of the setup, you can use the advanced settings. Based on the onboarding settings, Cortex Cloud then creates a custom installer file for running in your Kubernetes environment. This file, once executed in your Kubernetes environment, grants Cortex Cloud the necessary permissions to collect the data. The installer file must be executed in your Kubernetes environment to complete the onboarding process. The connector then appears in Kubernetes Connectors.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Add Data Sources & Integrations page, click Create Integration, search for Kubernetes, then hover over it and click Add Another Instance.
    
3.  In the Kubernetes Connect onboarding wizard, enable the solutions that fit your needs:
    
    -   Posture Management: (Enabled by default) A lightweight posture management solution for continuous discovery, policy enforcement, and proactive scanning of vulnerabilities, secrets, malware, compliance, and misconfigurations.
        
    -   Realtime Protection: A solution that monitors workloads in real time to detect and block malicious activity, instantly preventing attacks as they happen.
        
    
4.  (Optional) Click Edit to configure advanced settings and then click Apply Changes:
    
    -   Posture Management:
        
        | Setting | Notes |
        | --- | --- |
        | Scan Cadence (Hours) | Define how often to scan (from every one to 24 hours). Default is 12 hours. |
        | Policy Enforcement by the Admission Controller | Select to allow enforcement policies to be configured, ensuring that only compliant resources are admitted into the cluster. |
        | Registry Scanning (OpenShift Only) | Select this option to scan OpenShift Platform Registry images for vulnerabilities, malware, and exposed secrets. Select the scanning configuration option to enable security checks for your images: All (Default) Scans all container images, including all versions (tags), in all discovered repositories.; Latest tag: Scans only images tagged 'latest' in all discovered repositories.; Day modified: Scans container images created or modified in the last few days. You can select a range of up to 90 days for the scan. The default is set to 7. Refer to OpenShift container registry for information on the instances that were automatically created by the Kubernetes deployment.OpenShift container registry |
        
    -   Realtime Protection:
        
        **Note:**
        
        This option is not supported for Fargate.
        
        **Note:**
        
        Enabling Realtime Protection installs the agent on your Kubernetes clusters as a DaemonSet.
        
        | Setting | Notes |
        | --- | --- |
        | Node Selector | Enter node labels to have the agent run on nodes that match the node labels. |
        | Run on all nodes (Including Master)/Run only on master node |  |
        | Deployment Platform | Select the Kubernetes deployment platform: Standard; Bottlerocket OS; Google GCOS; OpenShift |
        
    
5.  (Optional) Click Edit Profile to customize the Kubernetes Connector's profile:
    
    | Setting | Notes |
    | --- | --- |
    | Profile Name | A profile name is automatically generated, including the date and time of creation. You can manually change the profile name. |
    | Version | Select which version of the Kubernetes Connector to install. |
    | Cluster Resource Identifier | (Optional) Enter the Kubernetes cluster resource identifier. If you do not specify the resource identifier, the installer will identify the cluster on its own. \*\*Note:\*\* For Fargate, you must provide the cluster resource identifier. The format of the identifier is `arn:aws:eks:<region>:<account-id>:cluster/<cluster-name>`. |
    | Namespace | Enter the name for the Kubernetes namespace. The default is "panw". To ensure proper data parsing in an AWS Fargate environment, a Fargate Profile must be explicitly configured for the namespace where the connector is installed (typically panw) and for the kube-system namespace if the cluster is fully Fargate-based. Because the system identifies Fargate clusters by scanning for active workloads during deployment, a Fargate profile that contains no running pods will not be recognized as such. Furthermore, since this detection occurs at installation, any transition from EC2 to Fargate requires an agent update to trigger a new scan and ensure the environment is correctly identified and monitored. |
    | Proxy Gateway | Enable this option if network traffic between Cortex Cloud and your Kubernetes cluster must route through a proxy gateway. Enter the following details: Proxy IP: The full IP address and port number for your HTTP proxy server. For example: `192.168.1.1:8080`; Authentication: Select None or Basic. Enter the username and password for a proxy user account that has permission to pass traffic to the Kubernetes cluster. \*\*Note:\*\* Basic authentication is only supported in Posture Management. If deploying Realtime Protection, select None . |
    | Auto Upgrade | Enable Auto Upgrade to ensure the Kubernetes Connector and its installed capabilities are automatically updated to a newer version when available. This minimizes manual maintenance and ensures continuous access to the latest features and security patches. Select the Upgrade Strategy: Latest Available Version (GA): Automatically upgrade to the newest version as soon as it is released to gain immediate access to all new features.; One release before the latest one (N-1): Maintain a policy to always remain one version behind the latest available release. \*\*Note:\*\* If you install the latest version but select the N-1 strategy, this policy will take effect starting from the next upgrade cycle (it will not immediately downgrade your current installation). Select Advanced to customize the upgrade schedule. Define whether to be upgraded immediately or to delay the upgrade by a specified number of days. You can then specify the preferred day and time for the upgrade to be applied. |
    
6.  Click Generate.
    
7.  To complete the onboarding of the Kubernetes Connector, you must download the Helm chart values `values.yaml` and run it in your Kubernetes environment: `helm repo add cortex https://paloaltonetworks.github.io/cortex-cloud --force-update`
    
8.  Install the Helm charts in your Kubernetes environment: ``helm upgrade --install konnector cortex/konnector --wait-for-jobs --create-namespace --namespace panw --values `<profile-name>`.values.yaml``
    
9.  Verify the deployment succeeded when you see "Status: Deployed".
    
    When the Kubernetes Connector is deployed, the initial discovery scan is started, and the connector appears in Data Sources & Integrations → Kubernetes → Kubernetes Connectors.

#### What's new in Kubernetes Connector?
This topic describes the changes, additions, known issues, and fixes for each version of the Kubernetes Connector. If Auto Upgrade is enabled in your Kubernetes Connector, you will automatically enjoy the latest released features without having to manually upgrade to the new version.

##### Kubernetes Connector releases

Cortex Cloud supports the following current Kubernetes Connector versions. Click the link to view the new features, addressed issues, and known issues per release.

| Release version | Release notes | Release date |
| --- | --- | --- |
| 1.3 | Kubernetes Connector version 1.3 | Nov 9, 2025 |
| 1.2 | Kubernetes Connector version 1.2 | July 20, 2025 |

##### Kubernetes Connector version 1.3

New features

The following section describes the new features introduced in Kubernetes Connector version 1.3.

| Feature | Description |
| --- | --- |
| Unified Kubernetes Onboarding | Streamlined Kubernetes onboarding process in a single, easy-to-use wizard. Now you can discover all available security capabilities based on your license, configure everything in one flow, and deploy your entire solution with one consolidated installer. |
| Kubernetes Connector | Supports AKS, EKS, GKE, managed OpenShift, self-managed Kubernetes vanilla clusters, and self-managed OpenShift with a Kubernetes Native installation method of Helm Installer. For more details, see Supported Kubernetes distributions. |
| KSPM Dashboard | A visual overview of your Kubernetes security posture. It includes inventory insights, protection coverage, most vulnerable clusters, malware and secrets detected, and more. |
| Compliance standards | Enjoy out-of-the-box CIS compliance standards for Kubernetes environments (CIS EKS, CIS GKE, CIS AKS, CIS OpenShift, and CIS Kubernetes). |
| Secrets, malware, and vulnerabilities | Generate secret, malware, and vulnerabilities posture issues by declaring policies on Kubernetes clusters |

Known limitations

The following table describes known limitations in the Kubernetes Connector release.

| Feature | Description |
| --- | --- |
| Connector onboarding and cluster identifier | The Kubernetes Connector automatically calculates the Kubernetes cluster cloud identifier by using the metadata service (for EKS and GKE) and cluster resources (for AKS). For EKS and GKE, the metadata service must be enabled. |

##### Kubernetes Connector version 1.2

New features

The following section describes the new features introduced in Kubernetes Connector version 1.2.

| Feature | Description |
| --- | --- |
| Kubernetes Connector Onboarding | Supports AKS, EKS, GKE, managed OpenShift, and self-managed Kubernetes Vanilla clusters, with a Kubernetes Native installation method of Helm Installer. |
| KSPM Dashboard | A visual overview of your Kubernetes security posture. It includes inventory insights, protection coverage, riskiest clusters, and more. |
| Compliance standards | Enjoy out-of-the-box CIS compliance standards for Kubernetes environments (CIS EKS, CIS GKE, CIS AKS, CIS OpenShift, and CIS Kubernetes). |
| Secrets, malware, and vulnerabilities | Generate secret, malware, and vulnerabilities posture issues by declaring policies on Kubernetes clusters |
| Kubernetes internet exposure | r |

Known limitations

The following table describes known limitations in the Kubernetes Connector release.

| Feature | Description |
| --- | --- |
| Connector onboarding and cluster identifier | The Kubernetes Connector automatically calculates the Kubernetes cluster cloud identifier by using the metadata service (for EKS and GKE) and cluster resources (for AKS). For EKS and GKE, the metadata service must be enabled. |

#### Supported Kubernetes distributions
The following are the supported Kubernetes platform versions for the Kubernetes connector (Posture Management). The table shows the latest version that is supported. We support n-3 versions of each supported Kubernetes environment.

| Kubernetes environment | Notes |
| --- | --- |
| Managed clusters | Amazon Elastic Kubernetes Service (EKS); Microsoft Azure Kubernetes Service (AKS); Google Kubernetes Engine (GKE) |
| Managed OpenShift | Managed Openshift clusters, including ROSA (Red Hat OpenShift on AWS), are supported. |
| Self-Managed | We support every CNCF-certified Kubernetes solution. We've tested our solution on: Self-managed vanilla/on-premise Kubernetes clusters.; Self-managed OpenShift Kubernetes clusters.; Rancher Distributions (RKE and RKE2). |

The following are the Kubernetes platforms that are supported with Cortex XDR agents (Real-time protection).

This table shows the Kubernetes platform versions that have been compatibility tested. The table shows the latest version that has been tested. All versions that are not EOL, up to the latest version are supported.

| Linux Kubernetes Platform | Version |
| --- | --- |
| Unmanaged Kubernetes (k8s) | 1.30 |
| Amazon Elastic Kubernetes Service (EKS) | 1.33 |
|  | BottleRocket OS x86_64 User mode agent only |  |
| BottleRocket OS aarch64 User mode agent only |  |
| Microsoft Azure Kubernetes Service (AKS) | 1.33 |
|  | CBL-mariner 2 x86_64 |  |
| Google Kubernetes Engine (GKE) | 1.33 |
|  | Google Container-Optimized OS (COS)\* x86_64 User mode agent only |  |
| Google Kubernetes Engine (GKE) Autopilot |  |
| Oracle Kubernetes Engine (OKE) | 1.33 |
| Red Hat Openshift Container Platform (OCP) | 4.16 |
|  | RHCOS\* x86_64 User mode agent only |  |
| SUSE Rancher Kubernetes Engine 2 (RKE2) | 1.28 |
| Talos | 1.8.3 |

**Note:**

In Google Container-Optimized OS release 100 and earlier, where the FANOTIFY EXEC flag is not supported, the Kernel configuration may be partial for the user mode agent to properly function. In such cases, the agent will fallback to asynchronous mode.

In RHCOS version 4.12 and earlier, the Kernel configuration may be partial for the user mode agent to properly function. In such cases, the agent will fallback to asynchronous mode.

### Microsoft Azure

Learn more about collecting Microsoft Azure data using a Cloud Service Provider (CSP) onboarding data source in Cortex Cloud.

Follow a wizard to onboard your Microsoft Azure environment. The Azure onboarding wizard is designed to facilitate the seamless setup of Azure data into Cortex Cloud.

| Microsoft Azure vendor | Description |
| --- | --- |
| Link to full configuration Cloud Service Provider (CSP) onboarding data source instructions for Cortex Cloud Premium license. | Onboard Microsoft Azure |
| Link to basic configuration Cloud Service Provider (CSP) onboarding data source instructions for Cortex Cloud NG SIEM, Cortex Cloud Enterprise license, and Cortex Cloud Enterprise+ licenses. | Onboard Microsoft Azure with basic configuration |

### Microsoft Office 365

Learn more about the Microsoft Office 365 Standard Collector and content pack integrations in Cortex Cloud.

You can configure collecting Microsoft Office 365 logs and data using a Standard Collector or with a content pack integration:

| Google Workspace vendor | Description |
| --- | --- |
| Standard Collector overview | Forward logs and data to Cortex Cloud from Microsoft Office 365 Management Activity API and Microsoft Graph API using the Office 365 data source. |
| Link to Standard Collector instructions | The following types of logs and data can be ingested from Microsoft Office 365 Management Activity API and Microsoft Graph API: Microsoft Office 365 audit events from Management Activity API- Microsoft Entra ID (Azure AD); Exchange Online; SharePoint Online; DLP; General ; Microsoft Entra ID (Azure AD) authentication and audit events from Microsoft Graph API; Microsoft 365 alerts from Microsoft Graph Security API are available for different products:- Microsoft Graph Security API v1; Microsoft Graph Security API v2 For more information, see Ingest logs from Microsoft Office 365. |
| Links to content pack/integration details | The [Microsoft Defender for Cloud](https://cortex.marketplace.pan.dev/marketplace/details/AzureSecurityCenter) content pack provides unified security management and advanced threat protection across hybrid cloud workloads. The content items in this pack include a modeling rule (Defender For Cloud Microsoft Modeling Rule) and a parsing rule (Microsoft Defender For Cloud Parsing Rule), as well as the following integrations:- [Microsoft Defender for Cloud Event Collector](https://xsoar.pan.dev/docs/reference/integrations/microsoft-defender-for-cloud-event-collector): Use this integration to collect Microsoft Defender for Cloud issues specifically for Cortex Cloud. This integration includes commands to collect issues and to reset the authentication process.; [Microsoft Defender for Cloud](https://xsoar.pan.dev/docs/reference/integrations/azure-security-center-v2) (also referred to as Azure Security Center v2): Use this integration to deliver enterprise endpoint security, including preventative protection, post-breach detection, automated investigation, and response for various device types. It includes commands to facilitate endpoint visibility and querying (for example, machine software/vulnerabilities), retrieving file statistics, running advanced hunting queries, performing remediation actions such as host isolation and file blocking/quarantine, and listing configuration permissions. ; The [Microsoft Defender for Cloud Apps](https://cortex.marketplace.pan.dev/marketplace/details/MicrosoftCloudAppSecurity) content pack provides a multimode Cloud Access Security Broker (CASB) that offers rich visibility, control over data travel, and sophisticated analytics to identify and combat cyber threats across all connected Cloud services. The content items in this pack include various classifiers, issue types (Microsoft CAS Alert), a layout (MicrosoftCloudAppSecurity), a modeling rule (Microsoft Defender Cloud Apps Modeling Rule), and a parsing rule (Microsoft Cloud App Security Parsing Rule, as well as the following integrations:- [Microsoft Defender for Cloud Apps Event Collector](https://xsoar.pan.dev/docs/reference/integrations/microsoft-defender-for-cloud-apps-event-collector): Use this integration to collect the event logs for issues and activities provided by the Microsoft Defender for Cloud Apps API. This integration functions as a collector for event logs relating to issues and activities, supports configuration updates to fetch specific event types, and includes infrastructure support for Microsoft Graph Application endpoints.; [Microsoft Defender for Cloud Apps](https://xsoar.pan.dev/docs/reference/integrations/microsoft-cloud-app-security): Use this integration to view and resolve issues, view activities, view files, and view user accounts. It also provides infrastructure support for Microsoft Graph Application endpoints. ; The [Microsoft Defender for Identity](https://cortex.marketplace.pan.dev/marketplace/details/MicrosoftDefenderforIdentity) content pack is a cloud-based security solution that leverages your on-premises Active Directory signals to identify, detect, and investigate advanced threats, compromised identities, and malicious insider actions directed at your organization. The content item included in this pack is the Microsoft Defender for Identity modeling rule, with configurations for event collection using the Broker VM Syslog Collector.; The [Microsoft Exchange Online](https://cortex.marketplace.pan.dev/marketplace/details/MicrosoftExchangeOnline) content pack integrates with Exchange Online and Office 365 mail services to enable monitoring, searching, content retrieval, deletion of emails, and management of tenant allow/block lists. The content items in this pack include several playbooks focused on searching and deleting content, automations like GetEWSFolder and CreateCertificate, and the following integrations:- [EWS O365](https://xsoar.pan.dev/docs/reference/integrations/ewso365): Use this integration to retrieve information on emails and activities in a target mailbox and perform operations such as deleting emails and attachments, moving email items, handling mail sending and replying including inline images, and retrieving out-of-office status information.; [O365 - Security And Compliance - Content Search v2](https://xsoar.pan.dev/docs/reference/integrations/security-and-compliance-v2): Use this integration to manage security and compliance content search across organizational assets including emails, SharePoint sites, and OneDrives, and to perform actions like previewing and deleting emails. It includes the capability to delete an email for all recipients using the **`o365-sc-email-security-search-and-delete-email-office-365-quick-action`** command.; [EWS Extension Online Powershell v3](https://xsoar.pan.dev/docs/reference/integrations/ews-extension-online-powershell-v3): Use this integration to retrieve information about mailboxes and users in your organization, and to retrieve and modify tenant allow/block lists. It includes commands that retrieve information about mailboxes and users, display client access settings, retrieve permissions, list recipient objects, and manage tenant allow/block list entries (add, remove, list, count). It also includes commands to enable or disable mail flow rules and mail forwarding, and to list message trace details. ; The [Microsoft Graph API](https://cortex.marketplace.pan.dev/marketplace/details/MicrosoftGraphAPI) content pack provides the capability to interact with Microsoft APIs that do not have dedicated integrations in Cortex Cloud, such as Mail Single-User. It includes the following integration:- [Microsoft Graph API](https://xsoar.pan.dev/docs/reference/integrations/microsoft-graph-api): Use this integration to interact with various Microsoft APIs, such as Mail Single-User, that currently lack dedicated integrations in Cortex Cloud. It includes commands that facilitate making specific API requests (**`msgraph-api-request`** which supports headers), managing the authentication process by generating login URLs (**`msgraph-api-generate-login-url`**) to support the OAuth consent dialog, and resetting the authentication context if needed (**`msgraph-api-auth-reset`**) ; The [Microsoft Graph Files](https://cortex.marketplace.pan.dev/marketplace/details/MicrosoftGraphFiles) content pack enables authorized access for applications to files located in OneDrive, SharePoint, and MS Teams across your entire organization. It includes the following integration:- [O365 File Management (Onedrive/Sharepoint/Teams](https://xsoar.pan.dev/docs/reference/integrations/microsoft-graph-files): Use this integration to enable your app to get authorized access to and perform management actions on files within OneDrive, SharePoint, and MS Teams across your organization. It includes commands that allow managing site permissions (listing, creating, updating, and deleting), downloading files, listing drives and drive content, and managing OAuth authentication through generating login URLs or resetting authorization. This integration requires admin consent. ; The [Microsoft Graph Security](https://cortex.marketplace.pan.dev/marketplace/details/MicrosoftGraphSecurity) content pack fetches and manages issues from various Microsoft security sources using the unified Microsoft Graph Security API. It includes the Graph Security Alert classifier and issue type, multiple associated issue fields, Microsoft Graph Security modeling rules, and Microsoft Graph Security parsing rules, as well as the following integration:- [Microsoft Graph Security](https://xsoar.pan.dev/docs/reference/integrations/microsoft-graph): Use this integration to fetch and manage issues from various Microsoft security products (such as Microsoft Defender products and Azure Security Center), correlate issues, update issue status and assignments, and automate security workflows. The integration includes commands that support managing issues (for example updating issue determination and classification), performing security investigation tasks like Advanced Hunting (**`msg-advanced-hunting`**) for up to 30 days of event data, managing security incidents (**`msg-list-security-incident`**, **`msg-update-security-incident`**), supporting threat assessment, and providing extensive commands for Microsoft Purview eDiscovery case management, custodians, searching, and purging data. |

#### Ingest logs from Microsoft Office 365

Ingest logs and data from Microsoft Office 365 Management Activity API and Microsoft Graph API for use in Cortex Cloud.

**Notice:**

Requires the ITDR Module add-on and Data Collection add-on. For viewing alerts and Azure AD Activity Logs only the Data Collection add-on is required.

**Note:**

-   Ingesting Microsoft Entra ID (formerly known as Azure AD) authentication and audit events from Microsoft Graph API requires a Microsoft Azure Premium 1 or Premium 2 license. Alternatively, if the directory type is Azure AD B2C, the sign-in reports are accessible through the API without any additional license requirement.
    
-   To ingest **email** logs and data from Microsoft Office 365, use the dedicated data collector. For more information, see Ingest logs and data from Microsoft 365.
    

Cortex Cloud can ingest the following logs and data from Microsoft Office 365 Management Activity API and Microsoft Graph API using the Office 365 data collector. Alerts are collected with a delay of 5 minutes. If your organization requires collection that is closer to real-time collection, we recommend using the Microsoft Azure Event Hub integration instead.

To ingest email logs and data from Microsoft Office 365, use the dedicated data collector. For more information, see Ingest logs and data from Microsoft 365.

-   Microsoft Office 365 audit events from Management Activity API, which provides information about various user, administrator, system, and policy actions and events from Office 365, Microsoft Entra ID (formerly known as Azure AD) and MDO activity logs.
    
    **Note:**
    
    When auditing is turned off from the default setting, you need to first [turn on auditing](https://learn.microsoft.com/en-us/microsoft-365/compliance/turn-audit-log-search-on-or-off?view=o365-worldwide#verify-the-auditing-status-for-your-organization) for your organization to collect Microsoft Office 365 audit events from the Management Activity API. Log duplication of up to 5% in Microsoft products is considered normal. In some cases, such as login to a portal using MFA, two log entries are recorded by design.
    
-   Microsoft Entra ID (Azure AD) authentication and audit events from Microsoft Graph API.
    
    When collecting Azure AD Authentication Logs, Cortex Cloud also collects by default all sign-in event types from a beta version of Microsoft Graph API, which is still subject to change. In addition to classic interactive user sign-ins, selecting this option allows you to collect.
    
    -   Non-interactive user sign-ins.
        
    -   Service principal sign-ins.
        
    -   Managed Identities for Azure resource sign-ins.
        
    
    **Note:**
    
    To address [Azure reporting latency](https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/reference-reports-latencies), there is a 10-minute latency period for Cortex Cloud to receive Azure AD logs.
    
-   Microsoft 365 alerts from Microsoft Graph Security API are available for different products.
    
    -   Microsoft Graph Security API v1: Alerts from the following products are available via the Microsoft Graph Security API v1:
        
        -   Microsoft Defender for Cloud, Azure Active Directory Identity Protection, Microsoft Defender for Cloud Apps, Microsoft Defender for Endpoint, Microsoft Defender for Identity, Microsoft 365, Azure Information Protection, and Azure Sentinel.
            
        
    -   Microsoft Graph Security API v2: Alerts (alerts_v2) from the following products are available via the Microsoft Graph Security API v2 beta version, which is still subject to change:
        
        -   Microsoft 365 Defender unified alerts API, which serves alerts from Microsoft 365 Defender, Microsoft Defender for Endpoint, Microsoft Defender for Office 365, Microsoft Defender for Identity, Microsoft Defender for Cloud Apps, and Microsoft Purview Data Loss Prevention (including any future new signals integrated into M365D).
            
        
    
    To view alerts from the various products via the Microsoft Graph Security API versions, you need to ensure that you've set up the applicable licenses in Office 365. The table below lists the various licenses required for the different Microsoft Defender products. For more information on other Microsoft product licenses, see the Microsoft documentation.
    
    | Product | Standalone license | E3 license | E3 + Security add-on license | E5 license | E5 Security license | E5 Compliance license |
    | --- | --- | --- | --- | --- | --- | --- |
    | Microsoft Defender for Endpoint Plan 1 | ✓ | ✓ | ✓ | — | — | — |
    | Microsoft Defender for Endpoint Plan 2 | — | — | ✓ | ✓ | ✓ | — |
    | Microsoft Defender for Identity | — | — | ✓ | ✓ | ✓ | — |
    | Microsoft Defender for Office 365 Plan 1 | ✓ | — | — | — | — | — |
    | Microsoft Defender for Office 365 Plan 2 | ✓ | — | ✓ | ✓ | ✓ | — |
    | Microsoft Defender for Cloud Apps | — | — | ✓ | ✓ | ✓ | ✓ |
    

**Note:**

For more information, see the [Office 365 Management Activity API schema](https://docs.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-schema).

To receive logs from Microsoft Office 365, you must first configure the Data Sources & Integrations settings in Cortex Cloud. After you set up data collection, Cortex Cloud begins receiving new logs and data from the source.

When Cortex Cloud begins receiving logs, the app creates a new dataset for the different types of logs and data that you are collecting, which you can use to initiate XQL Search queries. For example queries, refer to the in-app XQL Library. For all Microsoft Office 365 logs, Cortex Cloud can also generate Cortex Cloud issues (Analytics, IOC, BIOC, and Correlation Rules), when relevant, from Office 365 logs. While Correlation Rules issues are generated on non-normalized and normalized logs, Analytics, IOC, and BIOC issues are only generated on normalized logs.

For the different types of data you can collect using the Office 365 data collector, the following table lists the different datasets, vendors, and products automatically configured, and whether the data is normalized.

| Data type | Dataset | Vendor | Product | Normalized data |
| --- | --- | --- | --- | --- |
| Microsoft Office 365 audit events from Management Activity API |
| Microsoft Entra ID (Azure AD) | `msft_o365_azure_ad_raw` | `msft` | `O365 Azure AD` | — |
| Exchange Online | `msft_o365_exchange_online_raw` | `msft` | `O365 Exchange Online` | Cortex Cloud supports normalizing Exchange Online audit logs into stories, which are collected in a dataset called `saas_audit_logs*`. |
| SharePoint Online | `msft_o365_sharepoint_online_raw` | `msft` | `O365 Sharepoint Online` | Cortex Cloud supports normalizing SharePoint Online audit logs into stories, which are collected in a dataset called `saas_audit_logs*`. |
| DLP | `msft_o365_dlp_raw` | `msft` | `O365 DLP` | — |
| General | `msft_o365_general_raw` | `msft` | `O365 General` | Cortex Cloud supports normalizing General audit logs into stories, which are collected in a dataset called `saas_audit_logs*`. |
| Microsoft Entra ID (Azure AD) authentication events from Microsoft Graph API | `msft_azure_ad_raw` | `msft` | `Azure AD` | When relevant, Cortex Cloud normalizes Azure AD authentication logs and Azure AD Sign-in logs to authentication stories. |
| Microsoft Entra ID (Azure AD) audit events from Microsoft Graph API | `msft_azure_ad_audit_raw` | `msft` | `Azure AD Audit` | When relevant, Cortex Cloud normalizes Azure AD audit logs to cloud audit logs stories. |
| Alerts from Microsoft Graph Security API v1 and v2 | `msft_graph_security_alerts_raw` | `msft` | `Security Alerts` | — |

\***Note**: For the `saas_audit_logs` dataset, the Vendor is saas and Product is Audit Logs.

**Note:**

In FedRAMP environments, Azure sign-in logs are not supported, due to vendor technical constraints.

To set up the Office 365 integration:

1.  From the Microsoft Entra ID console (formerly Azure AD console), create an app for Cortex Cloud with the applicable API permissions for the logs and data you want to collect as detailed in the following table.
    
    | Log type and data | API/Permission name |
    | --- | --- |
    | Microsoft Office 365 audit events from Management Activity API |
    | \-Azure AD | Office 365 Management APIs → ActivityFeed.Read |
    | \-Exchange Online | Office 365 Management APIs → ActivityFeed.Read |
    | \-Sharepoint Online | Office 365 Management APIs → ActivityFeed.Read |
    | \-DLP | Office 365 Management APIs → ActivityFeed.ReadDlp |
    | \-General | Office 365 Management APIs → ActivityFeed.Read |
    | Azure AD authentication and audit events from Microsoft Graph API | Microsoft Graph → AuditLog.Read.All; Microsoft Graph → Directory.Read.All |
    | Alerts from Microsoft Graph Security API v1 and v2 | Microsoft Graph → SecurityAlert.Read.All; Microsoft Graph → SecurityEvents.Read.All |
    
    For more information on Microsoft Azure, see the following instructions in the Microsoft documentation portal.
    
    -   [Register an app](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).
        
    -   [Add API permissions with type Application](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-permissions-to-access-web-apis).
        
    -   [Create an application secret](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#create-a-new-application-secret).
        
    
2.  Navigate to Settings → Data Sources & Integrations.
    
3.  On the Data Sources & Integrations page, click \+ Add New, search for Office 365, then hover over it and click Add.
    
4.  Integrate the applicable Microsoft Entra ID (Azure AD) service with Cortex Cloud.
    
    1.  Specify the Tenant Domain of your Microsoft Entra ID tenant.
        
    2.  Obtain the Application Client ID and Secret for your Microsoft Entra ID (Azure AD) service from the Microsoft Entra ID console, and specify the values in Cortex Cloud.
        
        These values enable Cortex Cloud to authenticate with your Microsoft Entra ID (Azure AD) service.
        
    3.  Select the types of logs that you want to receive from Office 365.
        
        The following options are available.
        
        -   Office 365 Management Activity API
            
            -   Cloud Environment: select the cloud environment used by your organization:
                
                -   Enterprise: Default option for non-US Government tenants
                    
                -   GCC: US Government Compliant Cloud tenants
                    
                -   GCC High: US Government Compliant Cloud High tenants
                    
                -   DoD: US Department of Defense tenants
                    
                
            -   Azure AD: Includes subset of Azure AD audit events and Azure AD authentication events. There can be significant overlap between these and the Azure AD Authentication Logs originating from Microsoft Graph API.
                
                **Note:**
                
                Use this option when you don’t want to grant permissions for Azure AD Authentication and Azure AD Audit.
                
            -   Exchange Online: Includes audit logs on [Azure Exchange mailboxes](https://docs.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-schema#exchange-mailbox-schema) and [Exchange admin activities](https://docs.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-schema#exchange-admin-schema) on the Office 365 Exchange.
                
            -   Sharepoint Online: Includes audit events on Sharepoint and OneDrive activities.
                
            -   DLP: Includes Microsoft 365 DLP events for Exchange, Sharepoint, and OneDrive.
                
            -   General: Includes audit logs for [various Microsoft 365 applications](https://docs.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-schema), such as Power BI and Microsoft Forms.
                
            
        -   Microsoft Graph API
            
            -   Cloud Environment: select the cloud environment used by your organization:
                
                -   Global Service: Default option for non-US Government tenants
                    
                -   Government L4: US Government Layer 4 tenants
                    
                -   Government L5 (DOD): US Government Layer 5 tenants
                    
                
            -   Azure AD Authentication Logs and Collect all sign-in event types: [Azure AD Sign-in logs](https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/concept-sign-ins) includes by default all sign-in event types from a beta version of Microsoft Graph API, which is still subject to change. In addition to classic interactive user sign-ins, selecting the Collect all sign-in event types allows you to collect.
                
                \-Non-interactive user sign-ins.
                
                \-Service principal sign-ins.
                
                \-Managed Identities for Azure resource sign-ins.
                
            -   Azure AD Audit Logs: [Azure AD Audit logs](https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/concept-audit-logs) includes different categories, such as User Management, Group Management and Application Management.
                
            -   Alerts: When this checkbox is selected, alerts from the following products are collected via the Microsoft Graph Security API v1:
                
                -   Microsoft Defender for Cloud, Azure Active Directory Identity Protection, Microsoft Defender for Cloud Apps, Microsoft Defender for Endpoint, Microsoft Defender for Identity, Microsoft 365, Azure Information Protection, and Azure Sentinel.
                    
                -   Use Microsoft Graph API v2: When this checkbox is also selected, alerts (alerts_v2) from the following products are only collected via the Microsoft Graph Security API v2 beta version, which is still subject to change:
                    
                    -   Microsoft 365 Defender unified alerts API, which serves alerts from Microsoft 365 Defender, Microsoft Defender for Endpoint, Microsoft Defender for Office 365, Microsoft Defender for Identity, Microsoft Defender for Cloud Apps, and Microsoft Purview Data Loss Prevention (including any future new signals integrated into M365D).
                        
                    
                
            -   Emails: Deprecated. Use the dedicated email collector instead. For more information, see Ingest logs and data from Microsoft 365.
                
            
        
    4.  Click Test to test the connection settings.
        
        To test the connection, you must select one or more log types. Cortex Cloud then tests the connection settings for the selected log types.
        
    5.  If successful, click Enable to enable Office 365 log collection.

### Microsoft Office 365 (email)

Learn more about the Microsoft Office 365 Standard email Collector in Cortex Cloud.

You can configure collecting Microsoft Office 365 email metadata using a Standard Collector:

| Microsoft Office 365 vendor | Description |
| --- | --- |
| Standard Collector overview | Forward email metadata through Microsoft Graph API to Cortex Cloud from Microsoft Office 365 using the Microsoft 365 data source. |
| Link to Standard Collector instructions | Ingest logs and data from Microsoft 365Ingest logs and data from Microsoft 365 |

#### Ingest logs and data from Microsoft 365

Learn more about collecting logs and data from Microsoft 365.

The Microsoft 365 email collector fetches email metadata through Microsoft Graph API, using an authorized app. A compliance mailbox is not required.

**Notice:**

**Email content visibility and licensing**: Email subjects and bodies are stored in an encrypted format to ensure data privacy. To view this content or generate alerts for it, an Email Security module license is required.

-   **Without the license**: Sensitive email content (subject, body, and attachments) remains encrypted and is not accessible for viewing or threat hunting.
    
-   **With the license**: When the module detects a suspicious or malicious email, it automatically creates an issue and decrypts the subject, body, and attachments. This decrypted content is then made available as an artifact within the issue for investigation.
    

**Note:**

For other logs from Microsoft Office 365, use the Office 365 data collector. For more information, see Ingest logs from Microsoft Office 365.

**Prerequisite:**

-   A user account with the Microsoft Azure Account Administrator role is required to set up a new Microsoft 365 email collector.
    
-   The following Microsoft Graph API permissions are required:
    
    -   Mailbox access (read-write)
        
        -   Read and write mail in all mailboxes
            
        -   Read contacts in all mailboxes
            
        -   Read all user mailbox settings
            
        
    -   User information, groups, and directory data (read-only)
        
        -   Read directory data
            
        -   Read all groups
            
        -   Read all users' full profiles
            
        
    

Scoping

You can narrow down the scope of ingested mailboxes by:

-   Microsoft 365 Group
    
-   Distribution List
    
-   Mail-enabled Security Group
    
-   Mail-enabled Users
    

Datasets

The Microsoft 365 collector provides a comprehensive data stream by ingesting information into the following nine datasets. These are categorized by their default availability and licensing requirements:

Standard datasets

These datasets are collected as part of the standard Microsoft 365 connector configuration:

-   `msft_o365_emails_raw`: Metadata and logs for email traffic.
    
-   `msft_o365_users_raw`: Information regarding user accounts and identities.
    
-   `msft_o365_groups_raw`: Data related to Office 365 groups and distribution lists.
    
-   `msft_o365_devices_raw`: Details on devices registered within the M365 environment.
    
-   `msft_o365_mailboxes_raw`: Configuration and status logs for individual mailboxes.
    
-   `msft_o365_rules_raw`: Logs for mail flow, transport, and inbox rules.
    
-   `msft_o365_contacts_raw`: Organizational and user-defined contact information.
    

Licensed security datasets

The following datasets are specialized and require the Email Security module license to be active:

-   `msft_o365_protected_emails_raw` - requires the Email Security module license.
    
-   `o365_email_threat_submission_policies` - requires the Email Security module license.
    

Data encryption and privacy

Cortex Cloud prioritizes data privacy while maintaining security visibility. The following rules apply to ingested email data:

-   **Storage and encryption**: Cortex Cloud stores email metadata as plain text, but the email subject and body are always encrypted.
    
-   **Retention policy**: The email body is temporarily saved for 48 hours and is then automatically deleted.
    
-   **Automated analysis**: Analytical detectors automatically scan both raw metadata and encrypted content to identify threats.
    
-   **Decryption for investigation**: When an issue is created for a malicious email, the raw email (including decrypted subject and body) is attached to the issue as an artifact for review.
    
-   **Threat hunting constraints**: You cannot perform threat hunting based on the email subject or body content. Only metadata, such as Date, From, or To, is available for Cortex Query Language(XQL) threat hunting queries.
    

How to configure Microsoft 365 collection

1.  Navigate to the data source.
    
    Select Settings → Data Sources & Integrations, click \+ Add New, search for Microsoft 365, then hover over it and click Add.
    
2.  Perform permissions verification.
    
    In the wizard, review the required items on the Permissions page, and then click Next.
    
3.  Authorize.
    
    Click OK to confirm you understand that API authorization consent is required.
    
4.  Perform Microsoft sign-in.
    
    1.  Select the Microsoft account for collection.
        
    2.  Click Next.
        
    3.  Enter your credentials for the Microsoft account and click Sign in.
        
    4.  If you are asked to perform authentication using your organization's authentication tools, do so.
        
5.  Accept permissions.
    
    Review the list of of permissions requested by the collector and click Accept.
    
6.  Define the scope.
    
    1.  On the Scope page, select one of the following:
        
        -   Entire organization: Emails will be collected from all mailboxes in your organization.
            
        -   Specific groups: Enter the email addresses of group names, such as Microsoft 365 Groups, Mail-enabled Security Groups, Distribution Lists, or Mail-enabled Users.
            
        
    2.  Click Next.
        
7.  Finalize the details and create the integration instance.
    
    1.  On the Details page, enter a meaningful instance name, and click Next.
        
    2.  On the Summary page, check your configurations, and then click Create.
        

Verification

Once the configuration is complete, a green check mark will appear below the Microsoft 365 configuration, and the console will display the amount of data received. You can now run queries against the datasets listed above.

### Microsoft 365 (Posture)

Learn more about the Microsoft 365 (Posture) data source in Cortex Cloud.

You can configure collecting Microsoft 365 (Posture) logs using a Cloud Posture and Runtime Security data source:

| Microsoft 365 (Posture) vendor | Description |
| --- | --- |
| Cloud Posture and Runtime Security data source overview | Forward Microsoft 365 (Postrure) logs to Cortex Cloud using the Microsoft 365 data source. |
| Link to Cloud Posture and Runtime Security data source instructions | How to onboard Microsoft 365 |

#### How to onboard Microsoft 365

How to get started with the Microsoft 365 data source.

##### Overview

You can add Microsoft 365 as a third-party data source in Cortex Cloud Data Security.

**Danger:**

-   You have generated a Globally Unique Identifier (GUID), also known as a Universally Unique Identifier (UUID). You will need this ID for the tenant you want to use for the Microsoft 365 instance.
    
-   In order to use Microsoft 365, you must be registered with Microsoft Azure.
    

##### Configuration

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Microsoft 365, then hover over it and click Add.
    
4.  On the Microsoft 365 integration instance settings page, do the following:
    
    1.  In the Display Name field, enter a name for your Microsoft 365 integration instance.
        
    2.  In the Tenant ID field, enter a tenant ID.
        
    3.  In the Region list, select a region.
        
    
5.  Click Next.
    

##### Authorization

1.  On the Microsoft 365 integration instance settings page, if you are an administrator, click the click to authorize link.
    
2.  If you do not have administrator permissions, follow the instructions on screen and click Close.
    

The Microsoft 365 integration instance should now appear in the list of data sources on the Data Sources & Integrations page.

### Okta

Learn more about the Okta Standard Collector and content pack integrations in Cortex Cloud.

You can configure collecting Okta logs and data using a Standard Collector or with a content pack integration:

| Okta vendor | Description |
| --- | --- |
| Standard Collector overview | Forward logs and data to Cortex Cloud from Okta using the Okta data source. |
| Link to Standard Collector instructions | The following types of logs can be ingested from Okta: Activity logs; Configuration data For more information, see Ingest logs and data from Okta. |

#### Ingest logs and data from Okta

Learn more about Ingesting logs and data from Okta for use in Cortex Cloud.

Product availability and licensing

The options available in the UI depend on your specific product license:

| Feature | Cloud Posture Security | Cloud Runtime Security | Cortex XDR Cloud | Cortex XSIAM NG SIEM, Cortex XSIAM Enterprise, and Cortex XSIAM Premium | Cortex XSIAM Enterprise Plus |
| --- | --- | --- | --- | --- | --- |
| Collect Logs | Enabled | Enabled with Data Collection add-on | Enabled with Data Collection add-on | Enabled | Enabled |
| Collect Configuration | Enabled | Enabled | Enabled with Cloud Posture Security or Cloud Runtime Security add-on | Enabled with Cloud Posture Security or Cloud Runtime Security add-on | Disabled |

**Prerequisite:**

**Administrator privileges**: Your Okta user must have a role capable of creating API tokens, such as Read-only Administrator, Super Administrator, or Organization Administrator. For more information, see the [Okta Administrators Documentation](https://help.okta.com/en-us/Content/Topics/Security/Administrators.htm?cshid=ext_Security_Administrators).

To receive logs and configuration data from Okta, configure the Data Sources & Integrations settings in Cortex Cloud. Once enabled, the system immediately begins ingesting activity logs and identity configuration metadata, according to your configuration settings.

Activity logs are searchable using the Cortex Query Language (XQL). For more information, see Perform advanced Identity Security investigations using XQL.

Configuration data is used for Identity Security visibility and is searchable in Identity Security → Identity Asset Inventory and using the `ciem_permissions_with_last_access` dataset.

API rate limits and monitoring

The Okta API enforces concurrent rate limits. To prevent service disruption:

-   The Okta data collector includes a mechanism that automatically reduces the amount of requests whenever an error is received from the Okta API indicating that too many requests have already been sent.
    
-   To ensure you are notified when this occurs, an alert is displayed in the Notification Area and a record is added to the Management Audit Logs.
    

How to configure the Okta collection?

Step 1: Configure Okta for integration

The same Okta domain, API token, and permissions are used for both log and configuration collection, as both features utilize the same Okta API.

Perform these steps in your Okta Admin Console to prepare for the connection.

1.  Identify your Okta Domain:
    
    1.  From the Okta Dashboard, click the down arrow under your name in the top-right corner.
        
    2.  Copy the Org URL, such as `https://example.okta.com`, and save it for the Okta Domain field in Cortex Cloud.
        
    
    For more information, see the [Okta Documentation](https://developer.okta.com/docs/guides/find-your-domain/findorg/).
    
2.  Obtain your authentication token in Okta:
    
    1.  Select Security → API → Tokens, and click Create token.
        
    2.  Set the following parameters for the token:
        
        -   What do you want your token to be named?: Specify the name for your token, which is used for tracking API calls.
            
        -   API calls made with this token must originate from: Select Any IP.
            
        
    3.  Click Create token. You may need to login to Okta again using your MFA administrator credentials.
        
    4.  Your token is successfully created. Copy the Token Value and record it immediately. You will need this for the TOKEN field in Cortex Cloud. Once you close the dialog box by clicking Ok, got it, you won't be able to access the token again and will have to create a new one if you didn't record it.
        

Step 2: Configure the Okta Collector in Cortex Cloud

1.  Select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New, search for Okta, then hover over it and click Add.
    
3.  Integrate the Okta authentication service with Cortex Cloud:
    
    1.  Enter the Okta Domain (Org URL) and Token obtained in Step 1.
        
    2.  Collect Logs: Select this option to ingest activity logs.
        
    3.  (Optional) Define an Event Filter to configure collection for events of your choosing.
        
        -   All events are collected by default unless you define an Okta API Filter expression, such as `filter=eventType eq “user.session.start”`.
            
        -   For Okta information to be woven into authentication stories, `“user.authentication.sso”` events must be collected.
            
        
    4.  Collect Configuration: Select this option to provide deep visibility into identities and permissions, offering comprehensive insights into users, user groups, and applications. It specifically highlights the permissions granted to Okta users in cloud environments, centralizing group memberships to secure your identity landscape.
        
    5.  Test the connection.
        
    6.  Click Enable.
        

Step 3. Accessing the data

Data is routed differently depending on which collection option is enabled:

Activity Data (using Collect Logs)

-   **XQL**: Searchable using the Cortex Query Language (XQL). For more information, see Perform advanced Identity Security investigations using XQL.
    

Configuration data (using Collect Configuration)

-   **Identity inventory**: Access the data in the Identity Asset Inventory within the Cortex Cloud Identity Security module (Identity Security → Identity Asset Inventory).
    
-   **XQL**: Use the following dataset for CIEM (Cloud Infrastructure Entitlements Management) visibility: `ciem_permissions_with_last_access`

### OneLogin

Learn more about the OneLogin Standard Collector and content pack integrations in Cortex Cloud.

You can configure collecting OneLogin logs and data using a Standard Collector or with a content pack integration:

| OneLogin vendor | Description |
| --- | --- |
| Standard Collector overview | Forward logs and data to Cortex Cloud from OneLogin via the OneLogin REST APIs using the OneLogin data source. |
| Link to Standard Collector instructions | The following types of data can be ingested from OneLogin: Log collection- Events: User logins, administrative operations, provisioning, and a list of all OneLogin event types ; Directory- Users: Lists of users.; Groups: Lists of groups.; Apps: Lists of apps. For more information, see Ingest logs and data from OneLogin. |
| Link to content pack/integration details | The [OneLogin](https://cortex.marketplace.pan.dev/marketplace/details/OneLogin) content pack provides capabilities for simple customer authentication and streamlined workforce identity operations utilizing APIs. It includes one modeling rule for data normalization and the following integration: [OneLogin Event Collector](https://xsoar.pan.dev/docs/reference/integrations/one-login-event-collector): Use this integration to gather simple customer authentication and streamlined workforce identity operations with the **`onelogin-get-events`** command. |

#### Ingest logs and data from OneLogin

Learn how to ingest different types of logs and data from OneLogin.

**Notice:**

Requires the Data Collection add-on.

Cortex Cloud can ingest different types of data from OneLogin accounts using the OneLogin data collector.

To receive logs and data from OneLogin via the OneLogin REST APIs, you must configure the Data Sources & Integrations settings in Cortex Cloud based on your OneLogin credentials. After you set up data collection, Cortex Cloud begins receiving new logs and data from the source.

When Cortex Cloud begins receiving logs, the app creates a new dataset for the different types of data collected and normalizes the ingested data into authentication stories, where specific relevant events are collected in the `authentication_story` preset for the **`xdr_data`** dataset. You can search these datasets using XQL Search queries. For all logs, Cortex Cloud can generate Cortex Cloud issues (Analytics, Correlation Rules, IOC, and BIOC), when relevant from OneLogin logs. While Correlation Rules issues are generated on non-normalized and normalized logs, Analytics, IOC, and BIOC issues are only generated on normalized logs.

The following table provides a description of the different types of data you can collect, the collection method and fetch interval for the data collected, and the name of the dataset to use in Cortex Query Language (XQL) queries.

| Data type | Description | Collection method | Fetch interval | Dataset name |
| --- | --- | --- | --- | --- |
| **Log collection** |
| Events | User logins, administrative operations, provisioning, and a list of all OneLogin event types | Appends data | 30 seconds | onelogin_events_raw |
| **Directory** |
| Users | Lists of users | Overwrites data | 10 minutes | onelogin_users_raw |
| Groups | Lists of groups | Overwrites data | 10 minutes | onelogin_groups_raw |
| Apps | Lists of apps | Overwrites data | 10 minutes | onelogin_apps_raw |

Before you configure Cortex Cloud data collection from OneLogin, make sure you have the following.

-   An Advanced OneLogin account.
    
-   Owner or administrator permissions in your OneLogin account which enable Cortex Cloud to access the OneLogin account and generate the OAuth 2.0 access token.
    
-   A Cortex Cloud user account with permissions to Read Log Collections, for example an Instance Administrator.
    

Configure Cortex Cloud to receive logs and data from OneLogin.

1.  Log in to OneLogin as an account owner or administrator.
    
2.  Under Administration → Developers → API Credentials, [Create a New Credential](https://developers.onelogin.com/api-docs/1/getting-started/working-with-api-credentials) with scope Read All.
    
3.  In the credential details page, copy the Client ID and the Client Secret, and save them somewhere safe. You will need to provide these keys when you configure the OneLogin data collector in Cortex Cloud .
    
4.  Navigate to Settings → Data Sources & Integrations.
    
5.  On the Data Sources & Integrations page, click \+ Add New, search for OneLogin, then hover over it and click Add.
    
6.  Configure the following parameters.
    
    -   Domain: Specify the domain of the OneLogin instance. The domain name must be in the format `https://<subdomain-name>.onelogin.com`.
        
    -   Name: Specify a descriptive and unique name for the configuration.
        
    -   Client ID: Specify the Client ID for the OneLogin API credential pair.
        
    -   Secret: Specify the Client Secret for the OneLogin API credential pair.
        
    -   Collect: Select the types of data to collect. By default, all the options are selected.
        
        -   Log Collection
            
            -   Events: Retrieves user logins, administrative operations, provisioning, and OneLogin event types. After normalization, the event types are enriched with the event name and description.
                
            
            **Note:**
            
            Event data is collected every 30 seconds.
            
        -   Directory
            
            -   Users: Retrieves lists of users.
                
            -   Groups: Retrieves lists of groups.
                
            -   Apps: Retrieves lists of apps.
                
            
            **Note:**
            
            Inventory data snapshots are collected every 10 minutes.
            
        
    
7.  Test the connection settings. If successful, Enable the OneLogin log collection.
    
    When events start to come in, a green check mark appears underneath the OneLogin configuration.

### Oracle Cloud Infrastructure

Learn more about collecting Oracle Cloud Infrastructure data using a Cloud Service Provider (CSP) onboarding data source in Cortex Cloud.

Follow a wizard to onboard your Oracle Cloud Infrastructure (OCI) environment. The OCI onboarding wizard is designed to facilitate the seamless setup of OCI data into Cortex Cloud.

| Oracle Cloud Infrastructure vendor | Description |
| --- | --- |
| Link to full configuration Cloud Service Provider (CSP) onboarding data source instructions for Cortex Cloud Premium license. | Onboard Oracle Cloud Infrastructure |
| Link to basic configuration Cloud Service Provider (CSP) onboarding data source instructions for Cortex Cloud NG SIEM, Cortex Cloud Enterprise license, and Cortex Cloud Enterprise+ licenses. | Onboard Oracle Cloud Infrastructure with basic configuration |

### PingFederate

Learn more about collecting PingFederate authentication logs using a Syslog Collector applet in Cortex Cloud.

You can configure collecting PingFederate authentication logs using a Broker VM Syslog Collector applet:

| PingFederate vendor | Description |
| --- | --- |
| Syslog Collector applet overview | Forward authentication logs from PingFederate to Cortex Cloud using the Broker VM Syslog Collector applet in a CEF format. |
| Link to Syslog Collector applet instructions | Ingest authentication logs from PingFederate |

### PingOne

Learn more about the PingOne Standard Collector and content pack Integrations in Cortex Cloud.

You can configure collecting PingOne authentication logs and data using a standard collector or with a content pack integration:

| PingOne vendor | Description |
| --- | --- |
| Standard collector overview | Forward authentication logs and data to Cortex Cloud from PingOne for Enterprise using the PingOne data source. |
| Link to standard collector instructions | Ingest authentication logs and data from PingOne |
| Link to content pack/integration details | The [PingIdentity](https://cortex.marketplace.pan.dev/marketplace/details/PingIdentity) content pack provides capabilities to utilize PingOne's cloud identity and access management services for various triggering events. It includes the following integration: [PingOne (Partner Contribution)](https://xsoar.pan.dev/docs/reference/integrations/ping-one): Use this integration to integrate with the PingOne Management API. It includes commands to unlock, create, delete, and update users. |

#### Ingest authentication logs and data from PingOne

Ingest authentication logs and data from PingOne for Enterprise for use in Cortex Cloud authentication stories.

**Notice:**

Requires the Data Collection add-on.

To receive authentication logs and data from PingOne for Enterprise, you must first set up a Poll subscription in PingOne and then configure the Collection Integrations settings in Cortex Cloud. After you set up collection integration, Cortex Cloud immediately begins receiving new authentication logs and data from the source. These logs and data are then searchable in Cortex Cloud.

1.  Set up PingOne for Enterprise to send logs and data.
    
    To set up the integration, you must have an account for the PingOne management dashboard and access to create a subscription for SSO logs.
    
    From the PingOne Dashboard:
    
    1.  [Set up a Poll subscription](https://docs.pingidentity.com/pingoneforenterprise/pingone_for_enterprise/p14e_add_poll_subscription.html).
        
        1.  Select Reporting → Subscriptions → Add Subscription.
            
        2.  Enter a NAME for the subscription.
            
        3.  Select Poll as the subscription type.
            
        4.  Leave the remaining defaults and select Done.
            
        
    2.  Identify your account ID and subscription ID.
        
        1.  Select the subscription you just set up and note the part of the poll URL between /reports/ and /poll-subscriptions. This is your PingOne account ID.
            
            For example:
            
            `https://admin-api.pingone.com/v3/reports/1234567890asdfghjk-123456-zxcvbn/poll-subscriptions/***-0912348765-4567-98012***/events`
            
            In this URL, the account ID is `1234567890asdfghjk-123456-zxcvbn`.
            
        2.  Next, note the part of the poll URL between /poll-subscriptions/ and /events. This is your subscription ID.
            
            In the example above, the subscription ID is `***-0912348765-4567-98012***`.
            
        
2.  Navigate to Settings → Data Sources & Integrations.
    
3.  On the Data Sources & Integrations page, click \+ Add New, search for PingOne, then hover over and click Add.
    
4.  Connect Cortex Cloud to your PingOne for Enterprise authentication service.
    
    1.  Enter your PingOne ACCOUNT ID.
        
    2.  Enter your PingOne SUBSCRIPTION ID.
        
    3.  Enter your PingOne USER NAME.
        
    4.  Enter your PingOne PASSWORD.
        
    5.  Test the connection settings.
        
    6.  If successful, Enable PingOne authentication log collection.
        
    
    After configuration is complete, Cortex Cloud begins receiving information from the authentication service. From the Integrations page, you can view the log collection summary.
    
5.  To search for specific authentication logs or data, you can Create an Authentication Query or Create an XQL Query.

### Snowflake

Learn more about the Snowflake data source in Cortex Cloud.

You can configure collecting Snowflake data using a Cloud Posture and Runtime Security data source:

| Snowflake vendor | Description |
| --- | --- |
| Cloud Posture and Runtime Security data source overview | Forward Snowflake data to Cortex Cloud using the Snowflake data source. |
| Link to Cloud Posture and Runtime Security data source instructions | How to onboard Snowflake |

#### How to onboard Snowflake

How to get started with the third-party Snowflake data source.

##### Overview

Integrate Cortex Cloud Data Security with your Snowflake account to gain comprehensive visibility into any data and posture risk existing in your Snowflake environment. This integration enables automated scanning of all assets in Snowflake, including data classification and risk assessment.

You can add Snowflake as a third-party data source in Cortex Cloud Data Security .

**Prerequisite:**

-   In order to use Snowflake, you must be registered with one of these cloud providers: Amazon AWS, Microsoft Azure, or Google Cloud Platform (GCP).
    
-   Ensure you have the necessary account permissions to onboard. It is recommended to use `Account Admin` as the role for the onboarding.
    

##### Configuration Step

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
    

##### Establish Connection Step

1.  Open your Snowflake console in a new tab.  
    
2.  Using the copy or download icons, copy or download the script in the Generated script text box and paste it into a new worksheet in Snowflake.
    
3.  Select the entire script and select Run all.
    
4.  Once the script runs without errors, come back to the Snowflake screen and click Verify Connection to check if the instance is detected.
    

##### Verify Connection Step

1.  A success or failure message appears on the screen.
    
2.  If a success message appears, you can do the following: 
    
    -   View the instance's information in the Snowflake Posture instances.
        
    -   View the assets in Asset Inventory, once the first scan is complete.
        
    

##### Delete a Snowflake instance

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, select the Snowflake integration or filter to search for it and then select it.
    
3.  On the Snowflake page, right click the row of the integration instance you want to delete.
    
4.  From the drop down menu, select Settings and from the integration instance settings page select the Delete checkbox and then click Delete.
    
    The Snowflake instance is now removed, including all previous scans.

### Windows DHCP via Elasticsearch Filebeat

Learn more about the Windows DHCP Standard Collector and content pack integrations in Cortex Cloud.

You can configure collecting Windows DHCP logs using a Standard Collector or with a content pack integration:

| Windows DHCP vendor | Description |
| --- | --- |
| Standard Collector (basic) overview | Forward logs to Cortex Cloud from Windows DHCP logs using Elasticsearch Filebeat with the Windows DHCP data source. |
| Link to Standard Collector instructions | Ingest logs from Windows DHCP using Elasticsearch Filebeat |
| Link to content pack details | The [Microsoft DHCP](https://cortex.marketplace.pan.dev/marketplace/details/MicrosoftDHCP) content pack processes and normalizes audit logs from the Dynamic Host Configuration Protocol (DHCP) service for security analysis in Cortex Cloud. It includes modeling Rules and parsing rules for events collected using the XDR Collector via the **`microsoft_dhcp_raw dataset`**. |

#### Ingest logs from Windows DHCP using Elasticsearch Filebeat

Learn how to configure Cortex Cloud to receive Windows DHCP logs.

**Notice:**

Requires the Data Collection add-on.

You can configure Cortex Cloud to receive Windows DHCP logs using Elasticsearch Filebeat with the following data collectors.

##### Ingest Windows DHCP logs with an XDR Collector profile

Extend Cortex Cloud visibility into logs from Windows DHCP using an XDR Collector Windows Filebeat profile.

Extend Cortex Cloud visibility into logs from Windows DHCP using an XDR Collector Windows Filebeat profile.

You can enrich network logs with Windows DHCP data when defining data collection in an XDR Collector Windows Filebeat profile. When you add a XDR Collector Windows Filebeat profile using the Elasticsearch Filebeat default configuration file called `filebeat.yml`, you can define whether the collected data undergoes follow-up processing in the backend for Windows DHCP data. Cortex Cloud uses Windows DHCP logs to enrich your network logs with hostnames and MAC addresses that are searchable in XQL Search using the Windows DHCP Cortex Query Language (XQL) dataset (`microsoft_dhcp_raw`).

While this enrichment is also available when configuring a Windows DHCP Collector for a cloud data collection integration, we recommend configuring Cortex Cloud to receive Windows DHCP logs with an XDR Collector Windows Filebeat profile because it’s the ideal setup configuration.

Configure Cortex Cloud to receive logs from Windows DHCP using an XDR Collector Windows Filebeat profile.

1.  Add an XDR Collector Profile for Windows.Add an XDR Collector Profile for Windows
    
    Follow the steps for creating a Windows Filebeat profile as described in Add an XDR Collector Profile for Windows, and in the Filebeat Configuration File area, ensure that you select and Add the DHCP template. The template's content will be displayed here, and is editable.Add an XDR Collector Profile for Windows
    
2.  To configure collection of Windows DHCP data, edit the template text as necessary for your system.
    
    You can enrich network logs with Windows DHCP data when defining data collection by setting the `vendor` to `“microsoft”` , and `product` to `“dhcp”` in the `filebeat.yml` file, which you can then query in the `microsoft_dhcp_raw` dataset.
    
    **Note:**
    
    To avoid formatting issues in `filebeat.yml`, we recommend that you edit the text file inside the user interface, instead of copying it and editing it elsewhere. Validate the syntax of the YML file before you finish creating the profile.
    

##### Ingest Windows DHCP logs with the Windows DHCP Collector

Extend Cortex Cloud visibility into logs from Windows DHCP using Elasticsearch Filebeat with the Windows DHCP data collector.

Extend Cortex Cloud visibility into logs from Windows DHCP using Elasticsearch Filebeat with the Windows DHCP data collector.

To receive Windows DHCP logs, you must configure data collection from Windows DHCP via Elasticsearch Filebeat. This is configured by setting up a Windows DHCP Collector in Cortex Cloud and installing and configuring an Elasticsearch Filebeat agent on your Windows DHCP Server. Cortex Cloud supports using Filebeat up to version 8.0.1 with the Windows DHCP Collector.

Certain settings in the Elasticsearch Filebeat default configuration file called `filebeat.yml` must be populated with values provided when you configure the Data Sources & Integrations settings in Cortex Cloud for the Windows DHCP Collector. To help you configure the `filebeat.yml` correctly, Cortex Cloud provides an example file that you can download and customize. After you set up collection integration, Cortex Cloud begins receiving new logs and data from the source.

**Note:**

For more information on configuring the `filebeat.yml` file, see the Elastic Filebeat Documentation.

Windows DHCP logs are stored as CSV (comma-separated values) log files. The logs rotate by days (`DhcpSrvLog-<day>.log`), and each file contains two sections: `Event ID Meaning` and the events list.

As soon as Cortex Cloud begins receiving logs, the app automatically creates a Windows DHCP XQL dataset (`microsoft_dhcp_raw`). Cortex Cloud uses Windows DHCP logs to enrich your network logs with hostnames and MAC addresses that are searchable in XQL Search using the Windows DHCP Cortex Query Language (XQL) dataset.

Configure Cortex Cloud to receive logs from Windows DHCP via Elasticsearch Filebeat with the Windows DHCP collector.

1.  Configure the Windows DHCP Collector in Cortex Cloud.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  On the Data Sources & Integrations page, click \+ Add New, search for Windows DHCP, then hover over it and click Add.
        
    3.  (Optional) Download example filebeat.yml file.
        
        To help you configure your `filebeat.yml` file correctly, Cortex Cloud provides an example `filebeat.yml` file that you can download and customize. To download this file, use the link provided in this dialog box.
        
        **Note:**
        
        To avoid formatting issues in your `filebeat.yml`, we recommend that you use the download example file to make your customizations. Do not copy and paste the code syntax examples provided later in this procedure into your file.
        
    4.  Specify a descriptive Name for your log collection configuration.
        
    5.  Save & Generate Token. The token is displayed in a blue box, which is blurred out in the image below.
        
        Click the copy icon next to the key and record it somewhere safe. You will need to provide this key when you set the `api_key` value in the **Elasticsearch Output** section in the `filebeat.yml` file as explained in **Step #2**. If you forget to record the key and close the window you will need to generate a new key and repeat this process.
        
    6.  Select Done to close the window.
        
    7.  In the Integrations page for the Windows DHCP Collector that you created, select Copy api url and record it somewhere safe. You will need to provide this URL when you set the **`hosts`** value in the **Elasticsearch Output** section in the `filebeat.yml` file as explained in **Step #2**.
        
2.  Configure an Elasticsearch Filebeat agent on your Windows DHCP Server.
    
    1.  Navigate to the Elasticsearch Filebeat installation directory, and open the `filebeat.yml` file to configure data collection with Cortex Cloud. We recommend that you use the download example file provided by Cortex Cloud.
        
    2.  Update the following sections and tags in the `filebeat.yml` file. The example code below details the specific sections to make these changes in the file.
        
        -   **Filebeat inputs**: Define the paths to crawl and fetch. The code below provides an example of how to configure the **Filebeat inputs** section in the `filebeat.yml` file with these paths configured.
            
            ```
            # ============================== Filebeat inputs ===============================
            filebeat.inputs:
              # Each - is an input. Most options can be set at the input level, so
              # you can use different inputs for various configurations.
              # Below are the input specific configurations.
              - type: log  
                # Change to true to enable this input configuration.  
                enabled: true  
                # Paths that should be crawled and fetched. Glob based paths.  
                paths:       
                  - c:\\Windows\\System32\\dhcp\\DhcpSrvLog\*.log    
            ```
            
        -   **Elasticsearch Output**: Set the `hosts` and `api_key`, where both of these values are obtained when you configured the Windows DHCP Collector in Cortex Cloud as explained in **Step #1**. The code below provides an example of how to configure the **Elasticsearch Output** section in the `filebeat.yml` file and indicates which settings need to be obtained from Cortex Cloud.
            
            ```
            # ---------------------------- Elasticsearch Output ----------------------------
            output.elasticsearch:  
              enabled: true  
              # Array of hosts to connect to.    
              hosts: ["OBTAIN THIS URL FROM CORTEX XDR"]  
              # Protocol - either \`http\` (default) or \`https\`.  
              protocol: "https"  
              compression_level: 5  
              # Authentication credentials - either API key or username/password. 
              api_key: "OBTAIN THIS KEY FROM CORTEX XDR"
            ```
            
        -   **Processors**: Set the `tokenizer` and add a `drop_event processor` to drop all events that do not start with an event ID. The code below provides an example of how to configure the **Processors** section in the `filebeat.yml` file and indicates which settings need to be obtained from Cortex Cloud.
            
            **Note:**
            
            The `tokenizer` definition is dependent on the Windows server version that you are using as the log format differs.
            
            \-For platforms earlier than Windows Server 2008, use `"%{id},%{date},%{time},%{description},%{ipAddress},%{hostName},%{macAddress}"`
            
            \-For Windows Server 2008 and 2008 R2, use `"%{id},%{date},%{time},%{description},%{ipAddress},%{hostName},%{macAddress},%{userName},%{transactionID},%{qResult},%{probationTime},%{correlationID}"`
            
            For Windows Server 2012 and above, use `"%{id},%{date},%{time},%{description},%{ipAddress},%{hostName},%{macAddress},%{userName},%{transactionID},%{qResult},%{probationTime},%{correlationID},%{dhcid},%{vendorClassHex},%{vendorClassASCII},%{userClassHex},%{userClassASCII},%{relayAgentInformation},%{dnsRegError}"`
            
            ```
            # ================================= Processors =================================
            processors:  
              - add_host_metadata:      
                when.not.contains.tags: forwarded  
              - drop_event.when.not.regexp.message: "^[0-9]+,.\*"  
              - dissect:       
                tokenizer: "%{id},%{date},%{time},%{description},%{ipAddress},%{hostName},%{macAddress},%{userName},%{transactionID},%{qResult},%{probationTime},%{correlationID},%{dhcid},%{vendorClassHex},%{vendorClassASCII},%{userClassHex},%{userClassASCII},%{relayAgentInformation},%{dnsRegError}"  
              - drop_fields:       
                fields: ["message"]  
              - add_locale: ~
              - rename:
                  fields:
                    - from: "event.timezone"
                      to: "dissect.timezone"
                  ignore_missing: true
                  fail_on_error: false
              - add_cloud_metadata: ~  
              - add_docker_metadata: ~  
              - add_kubernetes_metadata: ~
            ```
            
        
3.  Verify the status of the integration.
    
    Return to the Integrations page and view the statistics for the log collection configuration.
    
4.  After Cortex Cloud begins receiving logs from Windows DHCP via Elasticsearch Filebeat, you can use the XQL Search to search for logs in the new dataset (`microsoft_dhcp_raw`).

### Workday

Learn more about the Workday collector and content pack integrations in Cortex Cloud.

You can configure collecting Workday report data using a standard collector or with a content pack integration:

| Workday vendor | Description |
| --- | --- |
| Standard collector overview | Forward Workday report data to Cortex Cloud using the Workday data source. |
| Link to standard collector instructions | Ingest report data from Workday |
| Links to content pack/integration details | The [Workday](https://cortex.marketplace.pan.dev/marketplace/details/Workday) content pack provides solutions for financial management, human resources, and planning, specifically supporting the collection and modeling of user activity audit logs and sign-on events. It contains classifiers, modeling rules, and parsing rules, as well as the following integrations: [Workday Event Collector](https://xsoar.pan.dev/docs/reference/integrations/workday-event-collector): Use this integration containing the **`workday-get-activity-logging`** command to get activity logs from Workday. It requires the **`Workday Parsing Rule`** and **`Workday Modeling Rule`** for parsing and modeling ingested data.; [Workday](https://xsoar.pan.dev/docs/reference/integrations/workday): Use this integration containing the **`workday-list-workers`** command to return information for specific workers.; [Workday IAM](https://xsoar.pan.dev/docs/reference/integrations/workday-iam): Use this integration containing the **`workday-iam-get-full-report`** command to return report entries from Workday. It is part of the part of the IAM premium pack.; [Workday Sign On Event Collector](https://xsoar.pan.dev/docs/reference/integrations/workday-sign-on-event-collector): Use this integration containing the **`workday-get-sign-on-events`** command to get sign-on logs from Workday. This command is used for developing/debugging and is to be used with caution, as it can create events, leading to events duplication and exceeding the API request limitation. |

#### Ingest report data from Workday

Extend Cortex Cloud visibility into reports data from Workday.

**Notice:**

Requires the Data Collection and Identity Threat Detection & Response add-ons.

To receive Workday report data, you must first configure data collection from Workday using a Workday custom report to ingest the appropriate data. This is configured by setting up a Workday Collector in Cortex Cloud and configuring report data collection via this Workday custom report that you set up.

As soon as Cortex Cloud begins receiving data, the app automatically creates a Workday Cortex Query Language (XQL) dataset (`workday_workday_raw`). You can then use XQL Search queries to view the data and create new Correlation Rules. In addition, Cortex Cloud adds the Workday fields next to each user in the Key Assets list on the Cases page, and in the User node in the Causality View of Identity Analytics issues.

**Note:**

Any user with permissions to view issues and cases can view the Workday data.

You can only configure a single Workday Collector, which is automatically configured to run the report every 6 hours. You can always use the Sync Now option to run the report whenever you want.

**Prerequisite:**

1.  Create an Integration System User that is designated to access the custom report from Workday for data collection in Cortex Cloud.
    
2.  Create an Integration System Security Group for the Integration System User created in Step 1 for accessing the report. When setting this group ensure to define the following:
    
    -   Type of Tenanted Security Group: Select either Integration System Security Group (Constrained) or Integration System Security Group (Unconstrained) depending on how your data is configured. For more information, see the Workday documentation.
        
    -   Integration System User: Select the user that you defined in step 1 for accessing the custom report.
        
    
3.  Create the Workday credentials for the Integration System User created in Step 1 so that the username and password can be used to access the report in Cortex Cloud. Record these credentials as you will need them when configuring the Workday Collector in Cortex Cloud.
    

**Note:**

For more information on completing any of the prerequisite steps, see the Workday documentation.

Configure Cortex Cloud to receive report data from Workday:

1.  Configure a Workday custom report to use for data collection.
    
    1.  Log in to the [Workday Resource Center](https://signin.resourcecenter.workday.com/).
        
    2.  In the search field, specify Create Custom Report to open the wizard.
        
    3.  Configure the following Create Custom Report settings:
        
        
        
        -   Report Name: Specify the name of the report.
            
        -   Report Details section:
            
            -   Report Type: Select Advanced. When you select this option, the Enable As Web Service checkbox is displayed.
                
            -   Enable As Web Service: Select this checkbox, so that you will be able to generate a URL of the report to configure in Cortex Cloud.
                
            
        -   Data Source section:
            
            -   Optimized for Performance: Select whether the data should be optimized for performance. The way this checkbox is configured determines the Data Source options available to choose from.
                
            -   Date Source: Select the applicable data source containing the data that is used to configure data collection from Workday to Cortex Cloud.
                
            
        
    4.  Click OK, and configure the following Additional Info settings.
        
        The Additional Info table in the Columns tab is where you can perform the following.
        
        -   For the incident and card views in Cortex Cloud, map the required fields from the Data Source configured by selecting the applicable Field that you want to map to the Cortex Cloud field name required for data collection in the Column Heading Override XML Alias column.
            
        -   (Optional) You can map any additional fields from the Data Source configured that you want to be able to query in XQL Search using the `workday_workday_raw` dataset. This is configured by selecting the applicable Field and leaving the default field name that is displayed in the Column Heading Override XML Alias column. This default field name is what is used in XQL Search and the dataset to view and query the data.
            
        
        
        
        **Note:**
        
        The Business Object changes depending on the Data Source selected.
        
        For the incident and card views in Cortex Cloud, map the following fields in the table by selecting the applicable Field that contains the data representing the Cortex Cloud field name as provided below that should be added to the Column Heading Override XML Alias. For example, for `full_name`, select the applicable Field from the Business Object defined that contains the full name of the user and in the Column Heading Override XML Alias specify `full_name` to map the set Field to the Cortex Cloud field name.
        
        **Note:**
        
        Cortex Cloud uses a structured schema when integrating Workday data. To get the best Analytics results, specify all the fields marked with an asterisk from the recommended schema.
        
        -   `workday_user_id*`
            
        -   `full_name*`
            
        -   `workday_manager_user_id*`
            
        -   `manager*`
            
        -   `worker_type*`
            
        -   `position_title*`
            
        -   `department*`
            
        -   `private_email_address*`
            
        -   `business_email_address*`
            
        -   `employment_start_date*`
            
        -   `employment_end_date`
            
        -   `phone_number`
            
        -   `mailing_address`
            
        
    5.  (Optional) Filter out any employees that you do not want included in the Filter tab.
        
    6.  Share access to the report with the designated Integration System User that you created by setting the following settings in the Share tab:
        
        -   Report Definition Sharing Options: Select Share with specific authorized groups and users.
            
        -   Authorized Users: Select the designated Integration System User that you created for accessing the custom report.
            
        
    7.  Ensure that the following Web Services Options settings in the Advanced tab are configured.
        
        Here is an example of the configured settings, where the Web Service API Version and Namespace are automatically populated and dependent on your report.
        
        
        
    8.  (Optional) Test the report to ensure all the fields are populated.
        
    9.  Get the URL for the report.
        
        1.  In the related actions menu, select Actions → Web Service → View URLs.
            
        2.  Click OK.
            
        3.  Scroll down to the JSON section.
            
        4.  Hover over the JSON link and click the icon, which open a new tab in your browser with the URL for the report. You need to use the designated user credentials to open the report.
            
        5.  Copy the URL for the report and record them somewhere as this URL needs to be provided when setting up the Workday Collector in Cortex Cloud.
            
        
    10.  Complete the report by clicking Done.
         
2.  Configure the Workday collection in Cortex Cloud.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  On the Data Sources & Integrations page, click \+ Add New, search for Workday, then hover over it and click Add.
        
    3.  Set the following parameters.
        
        -   Name: Specify the name for the Workday Collector that is displayed in Cortex Cloud.
            
        -   URL: Specify the URL of the custom report you configured in Workday.
            
        -   User Name: Specify the username for the designated Integration System User that you created for accessing the custom report in Workday.
            
        -   Password: Specify the password for the designated Integration System User that you created for accessing the custom report in Workday.
            
        
    4.  Click Test to validate access, and then click Enable.
        
        A notification appears confirming that the Workday Collector was saved successfully, and closes on its own after a few seconds.
        
        Once report data starts to come in, a green check mark appears underneath the Workday Collector configuration with the data and time that the data was last synced.
        
3.  (Optional) Manage your Workday Collector.
    
    After you enable the Workday Collector, you can make additional changes as needed. To modify a configuration, select any of the following options.
    
    -   Edit the Workday Collector settings.
        
    -   Disable the Workday Collector.
        
    -   Delete the Workday Collector.
        
    -   Sync Now to run the report to get the latest report data. The report is run automatically every 6 hours, but you can always get the latest data as needed.
        
    
4.  After Cortex Cloud begins receiving report data from Workday, you can use the XQL Search to search for logs in the new dataset (`workday_workday_raw`).

### Zscaler Internet Access

Learn more about collecting Zscaler Internet Access logs using a Syslog Collector applet and content pack integrations in Cortex Cloud.

You can configure collecting Zscaler Internet Access logs using a Broker VM Syslog Collector applet or with a content pack integration:

| Zscaler Internet Access vendor | Description |
| --- | --- |
| Syslog Collector applet overview | Forward firewall and network logs to Cortex Cloud from Zscaler Internet Access using the Broker VM Syslog Collector applet in a CEF format. |
| Link to Syslog Collector applet instructions | Ingest logs from Zscaler Internet Access |
| Links to content pack/integration details | The [Zscaler Internet Access](https://cortex.marketplace.pan.dev/marketplace/details/Zscaler) content pack provides Cloud security features, including managing URL and IP address policies, managing categories, sandbox reporting, and ingestion and normalization of Zscaler Internet Access (ZIA) logs into Cortex Cloud via both VM-based NSS Feed and Cloud NSS Feed methods. It contains the **`Zscaler Internet Access Modeling Rule`**, the **`Zscaler ZIA Parsing Rule`**, and the Block Domain - Zscaler playbook. It also includes the following integration: [Zscaler Internet Access](https://xsoar.pan.dev/docs/reference/integrations/zscaler): Use this integration to manage URL and IP address allow lists and block lists, manage and update categories, retrieve Sandbox reports, and manage IP destination groups within a Zscaler session. It includes commands for blacklisting and unblacklisting URLs and IPs, managing categories (adding/removing URLs and IPs), retrieving categories, listing, creating, editing, and deleting IP destination groups, manually logging in and logging out, and activating configuration changes in Zscaler. |

### Zscaler Private Access

Learn more about collecting Zscaler Private Access logs using a Syslog Collector applet and content pack integration in Cortex Cloud.

You can configure collecting Zscaler Private Access logs using a Broker VM Syslog Collector applet or with a content pack integration:

| Zscaler Private Access vendor | Description |
| --- | --- |
| Syslog Collector applet overview | If you use Zscaler Private Access (ZPA) in your network as an alternative to VPNs, you can forward your network logs to Cortex Cloud from Zscaler Private Access using the Broker VM Syslog Collector applet in a LEEF format. |
| Link to Syslog Collector applet instructions | Ingest logs from Zscaler Private Access |
| Link to content pack/integration instructions | The [ZscalerZPA](https://cortex.marketplace.pan.dev/marketplace/details/ZscalerZPA) content pack provides data modeling capabilities for event logs ingested from the Zscaler Private Access (ZPA) service, which enables secure access to internal applications and services. It includes the **`Zscaler Private Access Modeling Rule`**. Event collection relies on configuring the generic Syslog Collector on the Broker VM. |

## Generic on-premise data collectors

Learn more about collecting data from generic on-premise data sources in Cortex Cloud.

You can collect data from generic on-premise data collectors that are not necessarily tied to a specific vendor, but are crucial for a wide range of log sources. The following are supported:

-   **Broker VM data collector applets**: Enables ingesting different types of data from the Broker VM, which has a number of data collector applets.
    
-   **XDR Collectors**: Enables using the XDR Collectors (XDRC) configuration that is dedicated for on-premise data collection on Windows and Linux machines to gather and process logs and events from multiple sources.

### Broker VM data collector applets

The Broker VM has a number of data collector applets that you can configure to ingest different types of data. These data collector applets are in addition to the others that are available in the Settings → Configurations → Data Collection → Collection Integrations page with a Data Collection add-on.

Some data collector applets require the Data Collection add-on.

#### Activate Apache Kafka Collector

Learn more about activating the Broker VM with an Apache Kafka Collector applet.

**Notice:**

Requires the Data Collection add-on.

This data source is only available in your tenant if the tenant was activated before October 1, 2025 with an active Data Collection add-on.

Apache Kafka is an open-source distributed event streaming platform for high-performance data pipelines, streaming analytics and data integration. Kafka records are organized into Topics. The partitions for each Topic are spread across the bootstrap servers in the Kafka cluster. The bootstrap servers are responsible for transferring data from Producers to Consumer Groups, which enable the Kafka server to save offsets of each partition in the Topic consumed by each group.

The Broker VM provides a Kafka Collector applet that enables you to monitor and collect events from Topics on self-managed on-prem Kafka clusters directly to your log repository for query and visualization purposes. The applet supports Kafka setups with no authentication, with SSL authentication, and SASL SSL authentication.

After you activate the Kafka Collector applet, you can collect events as datasets (`<Vendor>_<Product>_raw`) by defining the following.

-   Kafka connection details including the Bootstrap Server List and Authentication Method.
    
-   Topics Collection configuration for the Kafka topics that you want to collect.
    

**Prerequisite:**

-   Apache Kafka version 2.5.1 and above.
    
-   Kafka cluster set up on premises, from which the data will be ingested.
    
-   Privileges to manage Broker Service configuration, such as Instance Administrator privileges.
    
-   Create a user in the Kafka cluster with the necessary permissions and the following authentication details:
    
    -   Broker Certificate and Private Key for an SSL connection.
        
    -   Username and Password for an SASL SSL connection.
        
    
-   Set up and configure Broker VM
    

##### How to activate the Kafka Collector

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  Do one of the following:
    
    -   On the Brokers tab, find the Broker VM, and in the APPS column, left-click Add → Kafka Collector.
        
    -   On the Clusters tab, find the Broker VM, and in the APPS column, left-click Add → Kafka Collector.
        
    
3.  Configure the Kafka Connection.
    
    1.  Specify the Bootstrap Server List, which is the `<hostname/ip>:<port>` of the bootstrap server (or servers). You can specify multiple servers, separated with a comma. For example, **`hostname1:9092,1.1.1.1:9092`**.
        
    2.  Select one of the Authentication Methods:
        
        No Authentication
        
        Default connection method for a new Kafka setup, which doesn’t require authentication. With a standard Kafka setup, any user or application can write messages to any topic, as well as read data from any topic.
        
        SSL Authentication
        
        Authenticate your connection to Kafka using an SSL certificate. Use this authentication method when the connection to the Kafka server is a secure TCP, and upload the following:
        
        -   Broker Certificate: Signed certificate used for the applet to authenticate to the Kafka server.
            
        -   Private Key: Private key for the applet used for decrypting the SSL messages coming from the Kafka server.
            
        -   (Optional) CA Certificate: CA certificate that was used to sign the server and private certificates. This CA certificate is also used to authenticate the Kafka server identity.
            
        
        SASL SSL (SCRAM-SHA-256)
        
        Authenticate your connection to the Kafka server with your Username, Password, and optionally, your CA Certificate.
        
    3.  Test Connection to verify that you can connect to the Kafka server. An error message is displayed for each server connection test that fails.
        
4.  Configure the Topics Collection parameters.
    
    Topic Subscription Method
    
    Select the Topic Subscription Method for subscribing to Kafka topics. Use List Topics to specify a list of topics. Use Regex Pattern Matching to specify a regular expression to search available topics.
    
    Topic(s)
    
    Specify Topic(s) from the Kafka server. For the List Topics subscription method, use a comma separated list of topics to subscribe to. For the Regex Pattern Matching subscription method, use a regular expression to match the Topic(s) to subscribe to. We do not recommend mixing log/event types in a topic.
    
    (optional) Consumer Group
    
    Specify a Consumer Group, a unique string or label that identifies the consumer group this log source belongs to. Each record that is published to a Kafka topic is delivered to one consumer instance within each subscribing consumer group. Kafka uses these labels to load balance the records over all consumer instances in a group. When specified, the Kafka collector uses the given consumer group. When not specified, Cortex Cloud assigns the Kafka applet collector to a new automatically generated consumer group which is automatically generated for this log source with the name `PAN-<Broker VM device name>-<topic name>`.
    
    Log Format
    
    Select the Log Format from the list as either RAW (default), JSON, CEF, LEEF, CISCO, or CORELIGHT. This setting defines the log type, which represents the type of logs the collector will receive from the configured Kafka topics.
    
    Vendor and Product
    
    Specify the Vendor and Product which will be associated with each entry in the dataset. The vendor and product are used to define the name of your Cortex Query Language (XQL) dataset (`<Vendor>_<Product>_raw`).
    
    **Note:**
    
    For CEF and LEEF logs, Cortex Cloud takes the vendor and product names from the log itself, regardless of what you configure on this page.
    
    (optional) Add Query
    
    Click Add Query to create another Topic Collection. Each topic can be added for a server only once.
    
    (optional) Other available options for Topic Collection
    
    As needed, you can manage your Topic Collection settings. Here are the actions available to you.
    
    -   Edit the Topics Collection details.
        
    -   Disable/Enable a Topics Collection by hovering over the top area of the Topics Collection section, on the opposite side of the Topics Collection name, and selecting the applicable button.
        
    -   Rename a Topics Collection by hovering over the top area of the Topics Collection section, on the opposite side of the Topics Collection name, and selecting the pen icon.
        
    -   Delete a Topics Collection by hovering over the top area of the Topics Collection section, on the opposite side of the Topics Collection name, and selecting the delete icon.
        
    
5.  (Optional) Click Add Connection to create another Kafka Connection for collecting data.
    
6.  (Optional) Other available options for Connections.
    
    As needed, you can return to your Kafka Collector settings to manage your connections.
    
    Here are the actions available to you.
    
    -   Edit the Connection details.
        
    -   Rename a connection by hovering over the default Collection name, and selecting the edit icon to edit the text.
        
    -   Delete a connection by hovering over the top area of the connection section, on the opposite side of the connection name, and selecting the delete icon. You can only delete a connection when you have more than one connection configured. Otherwise, this icon is not displayed.
        
    
7.  Activate the Kafka Collector applet. The Activate button is enabled when all the mandatory fields are filled in.
    
    After a successful activation, the APPS field displays Kafka with a green dot indicating a successful connection.
    
8.  (Optional) To view metrics about the Kafka Collector, in the Broker VMs page, left-click the Kafka connection displayed in the APPS field for your Broker VM.
    
    Cortex Cloud displays Resources, including the amount of CPU, Memory, and Disk space the applet is using.
    
9.  Manage the Kafka Collector.
    
    After you activate the Kafka Collector, you can make additional changes as needed. To modify a configuration, left-click the Kafka connection in the APPS column to display the Kafka Collector settings, and select the following:
    
    -   Configure to redefine the Kafka Collector configurations.
        
    -   Deactivate to disable the Kafka Collector.
        
    
    Ensure that you Save your changes, which is enabled when all mandatory fields are filled in.
    
    You can also Ingest Apache Kafka events as datasets.Ingest Apache Kafka events as datasets

#### Activate CSV Collector

Learn more about activating the Broker VM with a CSV Collector applet.

**Notice:**

Requires the Data Collection add-on.

This data source is only available in your tenant if the tenant was activated before October 1, 2025 with an active Data Collection add-on.

The Broker VM provides a CSV Collector applet that enables you to monitor and collect CSV (comma-separated values) log files from a shared Windows directory directly to your log repository for query and visualization purposes. After you activate the CSV Collector applet on a Broker VM in your network, you can ingest CSV files as datasets by defining the list of folders mounted to the Broker VM and setting the list of CSV files to monitor and upload to Cortex Cloud using a username and password.

**Prerequisite:**

-   Set up and configure Broker VM.
    
-   Ensure that you share the applicable CSV files.
    
-   Know the complete file path for the Windows directory.
    

##### How to activate the CSV Collector

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  Do one of the following:
    
    -   On the Brokers tab, find the Broker VM, and in the APPS column, left-click Add → CSV Collector.
        
    -   On the Clusters tab, find the Broker VM, and in the APPS column, left-click Add → CSV Collector.
        
    
3.  Configure your CSV Collector by defining the list of folders mounted to the Broker VM and specifying the list of CSV files to monitor and upload to Cortex Cloud. You must also specify a username and password.
    
    Mounted Folders
    
    Define the folders mounted onto the Broker VM:
    
    | Field | Description |
    | --- | --- |
    | Folder Path | Specify the complete file path to the Windows directory containing the shared CSV files using the format: `//host/<folder_path>`. For example, `//testenv1pc10/CSVFiles`. |
    | Username | Specify the username for accessing the Windows directory. |
    | Password | Specify the password for accessing the Windows directory. |
    
    After you configure the mounted folder details, Add () details to the applet.
    
    Mounted CSV Files
    
    | Field | Description |
    | --- | --- |
    | Folder Path + Name | Select the monitored Windows directory and specify the name of the CSV file. Use a wildcard file search using these characters in the name of the directory, CSV file name, and Path Exclusion. `?`: Matches a single char, such as `202?-report.csv`.; `*`: Matches either multiple characters, such as `2021-report*.csv`, or all CSV files with `*.csv`.; `**`: Searches all directories and subdirectories. For example, if you want to include all the CSV files in the directory and any subdirectories, use the syntax `//host/<folder_path>/**/*.csv`. \*\*Note:\*\* When you implement a wildcard file search, ensure that the CSV files share the same columns and header rows as all other logs that are collected from the CSV files to create a single dataset. |
    | Path Exclusion (Optional) | Specify the complete file path for any files from the Windows directory that you do not want included. The same wildcard file search characters are allowed in this field as explained above for the FOLDER PATH +NAME field. For example, if you want to exclude any CSV file prefixed with '`exclude_`' in the directory and subdirectories of `//host/<folder_path>`, use the syntax `//host/<folder_path>/**/exclude_*.csv`. |
    | Tags (Optional) | To easily query the CSV data in the database, you can add a tag to the collected CSV data. This tag is appended to the data using the format `<data>_<tag>`. |
    | Target Dataset | Either select the target dataset for the CSV data or create a new dataset by specifying the name for the new dataset. |
    
4.  Activate the CSV Collector applet.
    
    After a successful activation, the APPS field displays CSV with a green dot indicating a successful connection.
    
    **Note:**
    
    The CSV Collector checks for new CSV files every 10 minutes.
    
5.  (Optional) To view metrics about the CSV Collector, left-click the CSV connection in the APPS field for your Broker VM.
    
    Cortex Cloud displays Resources, including the amount of CPU, Memory, and Disk space the applet is using.
    
6.  Manage the CSV Collector.
    
    After you activate the CSV Collector, you can make additional changes as needed. To modify a configuration, left-click the CSV connection in the APPS column to display the CSV settings, and select:
    
    -   Configure to redefine the CSV Collector configurations.
        
    -   Deactivate to disable the CSV Collector.

#### Activate Database Collector

Learn more about activating a Broker VM with a Database Collector applet.

**Notice:**

Requires the Data Collection add-on.

This data source is only available in your tenant if the tenant was activated before October 1, 2025 with an active Data Collection add-on.

The Broker VM provides a Database Collector applet that enables you to collect data from a client relational database directly to your log repository for query and visualization purposes. After you activate the Database Collector applet on a Broker VM in your network, you can collect records as datasets (**`<Vendor>_<Product>_raw`**) by defining the following.

-   Database connection details, where the connection type can be MySQL, PostgreSQL, MSSQL, and Oracle. Cortex Cloud uses Open Database Connectivity (ODBC) to access the databases.
    
-   Settings related to the query details for collecting the data from the database to monitor and upload to Cortex Cloud .
    

**Prerequisite:**

-   Set up and configure Broker VM
    

##### How to activate the Database Collector

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  Do one of the following:
    
    -   On the Brokers tab, find the Broker VM, and in the APPS column, left-click Add → DB Collector.
        
    -   On the Clusters tab, find the Broker VM, and in the APPS column, left-click Add → DB Collector.
        
    
3.  Configure your Database Collector settings.
    
    Database Connection
    
    | Field | Description |
    | --- | --- |
    | Connection | Select the type of database connection as MySQL, PostegreSQL, MSSQL, or Oracle. |
    | Host | Specify the hostname or IP address of the database. |
    | Port | Specify the port number of the database. |
    | Database | Specify the database name for the type of database configured. This field is relevant when configuring a Connection Type for MySQL, PostegreSQL, and MSSQL. When configuring an Oracle connection, this field is called Service Name, so you can specify the name of the service. |
    | Enable SSL | Select whether to Enable SSL (default) to encrypt the data while in transit between the database and the Broker VM. \*\*Important:\*\* When configuring the DB collector to work with an Oracle database and enabling this option, ensure the following steps are completed for a successful connection: Ensure you have the certificate of the Database server.; Upload certificate to Broker CA Trust Store (Conditional): This step is only required if the Oracle server's certificate is self-signed or signed by a private Certificate Authority (CA). Skip this step if the certificate is signed by a publicly known CA.-   Navigate to the Broker VMs page by selecting Settings → Configurations → Data Broker → Broker VMs.; Right-click on the relevant broker and select Configure.; Scroll down to the Trusted CA Certificate section.; Upload the certificate file that contains the database server's SSL/TLS certificate.
    ; Verify server-side port encryption: Confirm that the port configured for the connection has encryption enabled on the Oracle Database server side. The database must be listening for encrypted connections on the specified port. These steps ensure that the connection is secure and the client (the Broker VM/DB Collector) successfully trusts the server's identity. |
    | Username | Enter the username to access the database. The username may only contain the following characters: Letters: `A-Z`; Digits: `0-9`; Underscore: `_`; Dollar sign: `$`; Hash sign: `#` |
    | Password | Enter the password to access the database. \*\*Note:\*\* The DB Collector does not support passwords containing semicolons (`;`). |
    | Test Connection | Select to validate the database connection. |
    
    Database Query
    
    | Field | Description |
    | --- | --- |
    | Storage Method | Specify whether to append the read data to the dataset, or to replace all the data in the dataset with the newly read data. Append (default): Adds new data to an existing dataset. This mode is optimal for collecting aggregated logs or data, where new records are simply added to the end of the existing dataset.; Replace: This option is only available for Snapshot datasets and each read cycle overwrites the entire dataset with the newly collected data. This is necessary when the data that needs to be collected from the database is static data or reference data, such as a list of computers, IP addresses, or a list of users. \*\*Important:\*\* The Database Collector applet supports a single row size of up to 65 KB. Ensure your source data does not exceed this limit per record to avoid ingestion errors. Replace mode logic When using the Replace mode in the Database Collector, the following field logic is applied: **Dataset name**: Defined by the user during configuration.; **Vendor**: Set automatically to `PANW`.; **Product**: Set automatically as db_collector followed by a unique identifier, such as `db_collector_12345`. \*\*Note:\*\* The reference data ingested using the DB Collector is counted towards license utilization. |
    | Target Dataset | This option is only displayed when the Storage Method is Replace. Select the name of an existing Snapshot dataset or create a new Snapshot dataset by specifying the name. When you create a new target dataset name, specify a name that will be more meaningful for your users when they query the dataset. For example, if the original table name is `accssusr`, you can save the dataset as `access_per_users`. Dataset names can contain special characters from different languages, numbers (0-9) and underscores (_). You can create dataset names using uppercase characters, but in queries, dataset names are always treated as if they are lowercase. |
    | Rising Column | This option is only displayed when the Storage Method is Append. Specify a column for the Database Collector applet to keep track of new rows from one input execution to the next. The column name must be configured with the same column name that is returned from the database and not the aliased name used in the query. This column must also be included in the query results. |
    | Retrieval Value | This option is only displayed when the Storage Method is Append. Specify a Retrieval Value for the Database Collector applet to determine which rows are new from one input execution to the next. Cortex Cloud supports configuring this value as an integer or a string that contains a timestamp. The following string timestamp formats are supported: ISO 8601 format, RFC 2822 format, date strings with month names spelled out, such as “January 1, 2022”, date strings with abbreviated month names, such as “Jan 1, 2022", and date strings with two-digit years- MM/DD/YY. The first time the input is run, the Database Collector applet only selects those rows that contain a value higher than the value you specified in this field. Each time the input finishes running, the Database Collector applet updates the input's Retrieval Value with the value in the last row of the Rising Column. |
    | Unique IDs (Optional) | This option is only displayed when the Storage Method is Append. Specify the column name(s) to match against when multiple records have the same value in the Rising Column. This column must be included in the query results. This is a comma separated field that supports multiple values. In addition, when specifying a Unique IDs, the query should use the greater than equal to sign (`>=`) in relation to the Retrieval Value. If the Unique IDs is left empty, the user should use the greater than sign (`>`). |
    | Collect Every | Specify the execution frequency of collection by designating a number and then selecting the unit as either Seconds, Minutes, Hours, or Days. When the Storage Method is Append the default is 30 seconds and for Replace the default is 12 hours. |
    | Vendor and Product | This option is only displayed when the Storage Method is Append. Specify the Vendor and Product for the type of data being collected. The vendor and product are used to define the name of your Cortex Query Language (XQL) dataset (`<Vendor>_<Product>_raw`). |
    | SQL Query | Specify the SQL Query to run and collect data from the database by replacing the example query provided in the editor box. When the Storage Method is Append, the question mark (`?`) in the query is a checkpoint placeholder for the Retrieval Value. Every time the input is run, the Database Collector applet replaces the question mark with the latest checkpoint value (i.e. start value) for the Retrieval Value. The query duration, when the Storage Method is in Replace mode, is limited to a maximum of 24 hours. |
    | Generate Preview | Select Generate Preview to display up to 10 rows from the SQL Query and Preview the results. The Preview works based on the Database Collector settings, which means that if after running the query no results are returned, then the Preview returns no records. |
    | Add Query (Optional) | To define another Query for data collection on the configured database connection, select Add Query. Another Query section is displayed for you to configure. |
    
4.  (Optional) Click Add Connection to define another database connection to collect data from another client relational database.
    
5.  (Optional) Other available options.
    
    As needed, you can return to your Database Collector settings to manage your connections. Here are the actions available to you:
    
    -   Edit the connection name by hovering over the default Collection name, and selecting the edit icon to edit the text.
        
    -   Edit the query name by hovering over the default Query name, and selecting the edit icon to edit the text.
        
    -   Disable/Enable a query by hovering over the top area of the query section, on the opposite side of the query name, and selecting the applicable button.
        
    -   Delete a connection by hovering over the top area of the connection section, on the opposite side of the connection name, and selecting the delete icon. You can only delete a connection when you have more than one connection configured. Otherwise, this icon is not displayed.
        
    -   Delete a query by hovering over the top area of the query section, on the opposite side of the query name, and selecting the delete icon. You can only delete a query when you have more than one query configured. Otherwise, this icon is not displayed.
        
    
6.  Activate the Database Collector applet.
    
    After a successful activation, the APPS field displays DB with a green dot indicating a successful connection.
    
7.  (Optional) To view metrics about the Database Collector, left-click the DB connection in the APPS field for your Broker VM.
    
    Cortex Cloud displays Resources, including the amount of CPU, Memory, and Disk space the applet is using.
    
8.  Manage the Database Collector.
    
    After you activate the Database Collector, you can make additional changes as needed. To modify a configuration, left-click the DB connection in the APPS column to display the Database Collector settings, and select:
    
    -   Configure to redefine the Database Collector configurations.
        
    -   Deactivate to disable the Database Collector.

#### Activate DSPM Fileshare

Learn more about activating a Broker VM with the DSPM Fileshare applet.

**Danger:**

-   Set up and configure Broker VM
    
-   Know the complete path to the files and folders that you want Cortex Cloud to monitor.
    
-   Necessary user permissions to access the network shares. For the SMB connection type, you need the user name and password.
    

##### How to activate the DSPM Fileshare applet

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  On the Brokers tab, find Broker VM, and in the APPS column, click \+ ADD. In the list of applets, click DSPM Fileshare.
    
    **Note:**
    
    The applet list displays only the applets for which you have permissions.
    
3.  Configure the DSPM Fileshare settings according to the following steps.
    
    File Share Connection
    
    | Field | Description |
    | --- | --- |
    | Connection Type | **NFS (Network File System):** A distributed file system protocol that lets networked computers share files remotely, making them appear as if they're stored locally. Operating at the application layer, it uses Remote Procedure Calls (RPCs) for clients to access a server's files and directories.; **SMB (Server Message Block):** A network file-sharing protocol that provides shared access to resources like files, printers, and serial ports across a network. It enables client applications to remotely interact with files and other assets stored on a server. It is the default file-sharing protocol for Microsoft Windows operating systems. This connection type requires a username and a password. |
    | Path | Specify the host and path to the folder containing the files that you want Cortex Cloud Data Security to monitor. |
    | Username | For the SMB connection type only. |
    | Password | For the SMB connection type only. |
    | Test Connection | Select to validate the connection permissions. |
    
    **Note:**
    
    By default, all configured connections are saved.
    
4.  On the File Share Connection screen, click \+ Add a Connection.
    
    **Note:**
    
    For details regarding the connection fields, see the table above under File Share Connection.
    
5.  In the File Share Connection field, replace the text with a name for the new connection.
    
6.  Select a connection type.
    
7.  Provide the path to the shared folder (the host and path).
    
8.  For SMB connections only, provide a username and password.
    
9.  Optionally, do the following:
    
    1.  Turn on the Classification toggle. This enables 2,500 random files to be scanned and classified each time.
        
    2.  In the Scan every list, select the cadence of how often the files are to be scanned. If you want the scans to occur less frequently, choose the Custom option and enter the amount of days, weeks, or months that you require.
        
    
10.  Click Test Connection to ensure the connection works properly.
     
11.  Click Save.
     

**Note:**

You can add multiple connections under a single instance of the DSPM Fileshare applet by returning to the File Share Connection screen and clicking Add Connection. Each new connection can be of either the NFS or SMB connection type.

Other actions

Once the DSPM Fileshare applet is activated, you can perform the following actions:

-   Edit
    
-   **Deactivate:** On the Broker VMs screen, in the ADD column, in the context menu, click Deactivate.
    
-   **Delete:** On the File Share Connection screen, click the Delete icon next to the connection you want to remove.
    

Inventory list

Each new connection that is created correlates to an asset in the inventory. You can see the connections by clicking Inventory → All Assets → Data → Storage Buckets.

#### Activate Files and Folders Collector

Learn more about activating a Broker VM with a Files and Folders Collector applet.

**Notice:**

Requires the Data Collection add-on.

This data source is only available in your tenant if the tenant was activated before October 1, 2025 with an active Data Collection add-on.

The Broker VM provides a Files and Folders Collector applet that enables you to monitor and collect logs from files and folders in a network share for a Windows or Linux directory, directly to your log repository for query and visualization purposes. The Files and Folders collector applet only starts to collect files that are more than 256 bytes and is only supported with a Network File System version 4 (NFSv4). After you activate the Files and Folders Collector applet, you can collect files as datasets (**`<Vendor>_<Product>_raw`**) by defining the following.

-   Details of the folder path on the network share containing the files that you want to monitor and upload to Cortex Cloud.
    
-   Settings related to the list of files to monitor and upload to Cortex Cloud, where the log format is either Raw (default), JSON, CSV, TSV, PSV, CEF, LEEF, Corelight, or Cisco.
    

**Note:**

Cortex Cloud only supports ingestion of files encoded in UTF-8 format.

**Prerequisite:**

-   Set up and configure Broker VM.
    
-   Know the complete path to the files and folders that you want Cortex Cloud to monitor.
    
-   Ensure that the user permissions for the network share include the ability to rename and delete files in the folder that you want to configure collection.
    

##### How to activate the Files and Folders Collector

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  Do one of the following:
    
    -   On the Brokers tab, find the Broker VM, and in the APPS column, left-click Add → Files and Folder Collector.
        
    -   On the Clusters tab, find the Broker VM, and in the APPS column, left-click Add → Files and Folder Collector.
        
    
3.  Configure the Files and Folder Collector settings.
    
    Shared Folder Connection
    
    | Field | Description |
    | --- | --- |
    | Folder Path | Specify the path to the files and folders that you want Cortex Cloud to monitor continuously to collect the files. The following formats are available based on the type of computer you are using: **Windows**: `\\<hostname>\<shared_folder>` or `smb://<hostname>/<shared_folder>`; **Linux**: `/<srv>/<shared_folder>` or `nfs://<srv>/<shared_folder>` \*\*Note:\*\* When using the Linux file share, including the Linux share with NFS, a Username and Password are not required, so these fields are grayed out in the screen. |
    | Recursive | Select this checkbox to configure the Files and Folders Collector applet to recursively examine any subfolders for new files as long as the folders are readable. This is not configured by default. |
    | Username | Specify the username to access the shared resource using a User Principal Name (UPN) format. |
    | Password | Specify the password to access the shared resource. |
    | Test Connection | Select to validate the connection and permissions. |
    
    File and Folder Settings
    
    | Field | Description |
    | --- | --- |
    | Mode | Select the mode to use for collecting data. The settings displayed change depending on your selection. Tail: Continuously monitors the files for new data (default). The collector adds the new data from the files to the dataset.; Batch: Reads the files automatically at user determined intervals, updates the lookup datasets, and then renames or deletes the uploaded source files. Renaming or deleting the read source files ensures that the collector always reads the most up-to-date file. Depending on the Storage Method, the collector can Append the new data from the files to the dataset or completely Replace the data in the dataset. \*\*Note:\*\* In Batch mode, the Files and Folders Collector supports collecting logs from a network share for a maximum file size of 500 MB. |
    | Collect Every | This option is only displayed in Batch Mode. Specify the execution frequency of collection by designating a number and then selecting the unit as either Minutes, Hours, or Days. |
    | After Files Uploaded | This option is only displayed in Batch Mode. Select what to do with the files after they are uploaded to the Cortex Cloud server. You can Rename files with a suffix (default) or you can Delete files. When renaming, the suffix is added to the end of the original file name using the format `<file name>.<suffix>`, which becomes the new name of the file. |
    | Include | Specify the files and folders that must match to be monitored by Cortex Cloud. Multiple values are allowed with commas separating the values and are case-sensitive. Allowed wildcard: '?' matches a single alphabet character in a specific position.; '\*' matches any character or set of characters, including no character. Example 128.  `log*.jsonlog*.json` includes any JSON file starting with 'log'.  
     |
    | Exclude (Optional) | Specify the files and folders that must match to not be monitored by Cortex Cloud . Multiple values are allowed with commas separating the values. Allowed wildcard: '?' matches a single alphabet character in a specific position.; '\*' matches any character or set of characters, including no character. Example 129.  `*.backup` excludes any file ending with '.backup'.  
     |
    | Log Format | Select the Log Format from the list as either Raw (default), JSON, CSV, TSV, PSV, CEF, LEEF, Corelight, or Cisco. This setting defines the parser used to parse all the processed files as defined in the Include and Exclude fields, regardless of the file names and extension. For example, if the Include field is set **`*`** and the Log Format is JSON, all files (even those named **`file.log`**) in the specified folder are processed by the Files and Folders Collector as JSON, and any entry that does not comply with the JSON format are dropped. \*\*Note:\*\* When uploading JSON files, Cortex Cloud only parses the first level of nesting and only supports single line JSON format, such that every new line means a separate entry. |
    | \# of Lines to Skip (Optional) | Specify the number of lines to skip at the beginning of the file. This is set to 0 by default. \*\*Note:\*\* Use this option only in cases where your files contain some sort of "header" lines, such as a general description, an introduction, a disclaimer, or similar, and you want to skip ingesting them. The Lines to Skip are not part of the file format. For example, in CSV files, there is no need to skip lines. |
    
    Data Source Mapping
    
    | Field | Description |
    | --- | --- |
    | Storage Method | This option is only displayed in Batch Mode. Specify whether to Append the read data to the dataset, or to Replace all the data in the dataset with the newly read data. Append: This mode is useful for log files where you want to keep all the log info from before.; Replace: This mode is useful for adding inventory data from CSV and JSON files which include properties, for example, a list of machines, a list of users, or a mapping of endpoints to users to create a lookup dataset. In each data collection cycle, the new data completely replaces the existing data in the dataset. You can use the records from the lookup datasets for correlation and enrichment through parsing rules, correlation rules, and queries. \*\*Note:\*\*-   When the storing method is Replace, the maximum size for the total data to be imported into a lookup dataset is 30 MB each time the data is fetched.; The inventory data ingested using the Files and Folders collector is counted towards license utilization.; When you use a JOINT function with a lookup table in a query or correlation rule, make sure you configure the conflict strategy to point to the raw dataset. This ensures that the system fields are taken from the raw dataset and not from the lookup table. |
    | Target Dataset | This option is only displayed in Batch Mode when the storing method is Replace. Select the name of an existing Lookup dataset or create a new Lookup dataset by specifying the name. When you create a new target dataset name, specify a name that will be more meaningful for your users when they query the dataset. For example, if the original file name is `accssusr.csv`, you can save the dataset as `access_per_users`. Dataset names can contain special characters from different languages, numbers (`0-9`) and underscores (`_`). You can create dataset names using uppercase characters, but in queries, dataset names are always treated as if they are lowercase. \*\*Note:\*\* You can't specify a file name that's the same as a system file name.; The name of a dataset created from a _tsv_ file must always include the extension. If the original file name is mrkdptusrsnov23.tsv, you can name save the dataset with the name marketing_dept_users_Nov_2023.tsv. |
    | Vendor and Product | Specify the Vendor and Product for the type of data being collected. The vendor and product are used to define the name of your Cortex Query Language (XQL) dataset (`<Vendor>_<Product>_raw`). \*\*Note:\*\* The Vendor and Product defaults to Auto-Detect when the Log Format is set to CEF or LEEF. |
    
    Generate Preview
    
    Select Generate Preview to display up to 10 rows from the first file and Preview the results. The Preview works based on the Files and Folders Collector settings, which means that if all the files that were configured to be monitored were already processed, then the Preview returns no records.
    
4.  (Optional) Click Add Connection to define another Files and Folders connection for collecting logs from files and folders in a shared resource.
    
5.  (Optional) Other available options.
    
    As needed, you can return to your Files and Folders Collector settings to manage your connections. Here are the actions available to you:
    
    -   Edit the connection name by hovering over the default Collection name, and selecting the edit icon to edit the text.
        
    -   Disable/Enable a connection by hovering over the top area of the connection section, on the opposite side of the connection name, and selecting the applicable button.
        
    -   Delete a connection by hovering over the top area of the connection section, on the opposite side of the connection name, and selecting the delete icon. You can only delete a connection when you have more than one connection configured. Otherwise, this icon is not displayed.
        
    
6.  Activate the Files and Folders Collector applet.
    
    After a successful activation, the APPS field displays File with a green dot indicating a successful connection.
    
7.  (Optional) To view metrics about the Files and Folders, left-click the File connection in the APPS field for your Broker VM.
    
    Cortex Cloud displays Resources, including the amount of CPU, Memory, and Disk space the applet is using.
    
8.  Manage the Files and Folders Collector.
    
    After you activate the Files and Folders Collector, you can make additional changes as needed. To modify a configuration, left-click the File connection in the APPS column to display the Files and Folder Collector settings, and select:
    
    -   Configure to redefine the Files and Folders Collector configurations.
        
    -   Deactivate to disable the Files and Folders Collector.

#### Activate FTP Collector

Learn more about activating a Broker VM with a FTP Collector applet.

**Notice:**

Requires the Data Collection add-on.

This data source is only available in your tenant if the tenant was activated before October 1, 2025 with an active Data Collection add-on.

The Broker VM provides a FTP Collector applet that enables you to monitor and collect logs from files and folders via FTP, FTPS, and SFTP directly to your log repository for query and visualization purposes. A maximum file size of 500 MB is supported. After you activate the FTP Collector applet on a Broker VM in your network, you can collect files as datasets (`<Vendor>_<Product>_raw`) by defining the following.

-   FTP, FTPS, or SFTP (default) connection details with the path to the folder containing the files that you want to monitor and upload to Cortex Cloud .
    
-   Settings related to the list of files to monitor and upload to Cortex Cloud , where the log format is either Raw (default), JSON, CSV, TSV, PSV, CEF, LEEF, Corelight, or Cisco. Once the files are uploaded to Cortex Cloud , you can define whether in the source directory the files are renamed or deleted.
    

**Prerequisite:**

-   Set up and configure Broker VM.
    
-   Ensure that the user permissions for the FTP, SFTP, or FTPS include the ability to rename and delete files in the folder that you want to configure collection.
    
-   When setting up an FTPS Collector with a server using a Self-signed certificate, you must upload the certificate first to the Broker VM as a Trusted CA certificate.
    

##### How to activate the FTP Collector

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  Do one of the following:
    
    -   On the Brokers tab, find the Broker VM, and in the APPS column, left-click Add → FTP Collector.
        
    -   On the Clusters tab, find the Broker VM, and in the APPS column, left-click Add → FTP Collector.
        
    
3.  Configure the FTP Collector settings.
    
    FTP Connection
    
    | Field | Description |
    | --- | --- |
    | Type | Select the type of FTP connection as FTP, SFTP, or FTPS. |
    | Host | Enter the hostname, IP address, or FQDN of the FTP server. When configuring a FTPS Collector, you must specify the FQDN. |
    | Port | Enter the FTP port number. |
    | Username | Enter the username to login to the FTP server. |
    | Password | Enter the password to login to the FTP server. |
    | SSH Key-Based Authentication | This checkbox is only displayed when setting a SFTP Collector, which works with both Username and Password authentication or SSH Key-Based Authentication. You can either leave this checkbox clear and set a Username and Password (default) or select SSH Key-Based Authentication to Browse to a Private Key. When this connection is established with a server using a Self-signed certificate, you must upload it first to the Broker VM as a Trusted CA Certificate. \*\*Note:\*\* When configuring an SFTP connection, Cortex Cloud expects the private key to be in the RSA format that is included in the **`-----BEGIN RSA PRIVATE KEY-----`** tag. Cortex Cloud does not support providing the private key in the OpenSSH format from the **`-----BEGIN OPENSSH PRIVATE KEY-----`** tag. When using **`ssh-keygen`** using a Mac, you get the OpenSSH format by default. The command for getting the RSA format is: ssh-keygen -t rsa -b 4096 -C <email address> -m PEM |
    | Folder Path | Specify the path to the folder on the FTP site where the files are located that you want to collect. |
    | Recursive | Select this checkbox to configure the FTP Collector applet to recursively examine any subfolders for new files as long as the folders are readable. This is not configured by default. |
    | Test Connection | Select to validate the FTP connection. |
    
    FTP Settings
    
    | Field | Description |
    | --- | --- |
    | Collect Every | Specify the execution frequency of collection by designating a number and then selecting the unit as either Minutes, Hours, or Days. |
    | After Files Uploaded | Select what to do with the files after they are uploaded to the Cortex Cloud server. You can either select Rename files with a suffix (default) and then you must specify the Suffix or Delete files. When adding a suffix, the suffix is added at the end of the original file name using the format `<file name>.<suffix>`, which becomes the new name of the file. |
    | Include | Specify the files and folders that must match to be monitored by Cortex Cloud . Multiple values are allowed with commas separating the values. Allowed wildcard: '?' matches a single alphabet character in a specific position.; '\*' matches any character or set of characters, including no character. Example 130.  `log*.json` includes any JSON file starting with 'log'.  
     |
    | Exclude (Optional) | Specify the files and folders that must match to not be monitored by Cortex Cloud . Multiple values are allowed with commas separating the values. Allowed wildcard: '?' matches a single alphabet character in a specific position.; '\*' matches any character or set of characters, including no character. Example 131.  `*.backup` excludes any file ending with '.backup'.  
     |
    | Log Format | Select the Log Format from the list as either Raw (default), JSON, CSV, TSV, PSV, CEF, LEEF, Corelight, or Cisco, which indicates to Cortex Cloud how to parse the data in the file. This setting defines the parser used to parse all the processed files as defined in the Include and Exclude fields, regardless of the file names and extension. For example, if the Include field is set **`*`** and the Log Format is JSON, all files (even those named **`file.log`**) in the specified folder are processed by the FTP Collector as JSON, and any entry that does not comply with the JSON format are dropped. \*\*Note:\*\* When uploading JSON files, Cortex Cloud only parses the first level of nesting and only supports single line JSON format, such that every new line means a separate entry. |
    | \# of Lines to Skip (Optional) | Enter the number of lines to skip at the beginning of the file. This is set to 0 by default. \*\*Note:\*\* Use this option only in cases where your files contain some sort of "header" lines, such as a general description, an introduction, a disclaimer, or similar, and you want to skip ingesting them. The Lines to Skip are not part of the file format. For example, in CSV files, there is no need to skip lines. |
    
    Data Source Mapping
    
    Specify the Vendor and Product for the type of data being collected. The vendor and product are used to define the name of your Cortex Query Language (XQL) dataset (`<Vendor>_<Product>_raw`).
    
    **Note:**
    
    -   The Vendor and Product defaults to Auto-Detect when the Log Format is set to CEF or LEEF.
        
    
    Preview
    
    Select Generate Preview to display up to 10 rows from the first file and Preview the results. The Preview works based on the FTP Collector settings, which means that if all the files that were configured to be monitored were already processed, then the Preview returns no records.
    
4.  (Optional) Click Add Connection to define another FTP connection for collecting logs from files and folders via FTP, FTPS, or SFTP.
    
5.  (Optional) Other available options.
    
    As needed, you can return to your FTP Collector settings to manage your connections. Here are the actions available to you:
    
    -   Edit the connection name by hovering over the default Collection name, and selecting the edit icon to edit the text.
        
    -   Disable/Enable a connection by hovering over the top area of the connection section, on the opposite side of the connection name, and selecting the applicable button.
        
    -   Delete a connection by hovering over the top area of the connection section, on the opposite side of the connection name, and selecting the delete icon. You can only delete a connection when you have more than one connection configured. Otherwise, this icon is not displayed.
        
    
6.  Activate the FTP Collector applet.
    
    After a successful activation, the APPS field displays FTP with a green dot indicating a successful connection.
    
7.  (Optional) To view metrics about the FTP Collector, left-click the FTP connection in the APPS field for your Broker VM.
    
    Cortex Cloud displays Resources, including the amount of CPU, Memory, and Disk space the applet is using.
    
8.  Manage the FTP Collector.
    
    After you activate the FTP Collector, you can make additional changes as needed. To modify a configuration, left-click the FTP connection in the APPS column to display the FTP Collector settings, and select:
    
    -   Configure to redefine the FTP Collector configurations.
        
    -   Deactivate to disable the FTP Collector.

#### Activate Local Agent Settings

Learn more about activating a Local Agent Settings applet on a Broker VM.

The Local Agent Settings applet on the Palo Alto Networks Broker VM enables you to:

Deploy the Broker VM proxy

To deploy Cortex Cloud in restricted networks where endpoints do not have a direct connection to the internet, setup the Broker VM to act as a proxy that routes all the traffic between the Cortex Cloud management server and XDR agents/XDR Collectors via a centralized and controlled access point. This enables your agents and XDR Collectors to receive security policy updates, upgrades, and send logs and files to Cortex Cloud without a direct internet connection. The Broker VM acts like a transparent proxy and doesn’t decrypt the secure connection between the server and the XDR agent/XDR Collectors, and hides the XDR agent’s/XDR Collector's original IP addresses. If your network topology includes SSL decryption in an upstream proxy/firewall, the Broker VM does not participate in the trust relationship as it is not initiating the connection to the server to be fully transparent.

**Note:**

When routing traffic through a Broker VM proxy that sits behind a firewall, you may experience intermittent agent disconnections if the firewall is configured to drop challenge ACK reset (RST) packets. For environments using a Palo Alto Networks Next-Generation Firewall (NGFW), see [this Knowledge Base article](https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000boBJCAY) for details on managing this behavior via the Allow Challenge Ack setting.

Enable broker caching

To reduce your external network bandwidth loads, you can cache XDR agent installations, upgrades, and content updates on your Cortex Cloud Broker VM. Every 15 minutes, the Broker VM retrieves the latest installers and content files from Cortex Cloud, downloading them only if they are not already stored locally. The Broker VM stores this content for 7 days and agent installers for up to 30 days from the agent's last request. If the files were not available on the Broker VM at the time of the ask, the agent proceeds to download the files directly from the Cortex Cloud server.

##### Requirements

Before you activate the Local Agent Settings applet, verify the following prerequisites and limitations listed by the main features.

General

The Local Agent Settings applet on the Broker VM is capable of supporting:

-   Up to 28,000 agents for an Agent Proxy running on a Broker VM deployed prior to February 22, 2026.
    
-   Up to 50,000 agents for an Agent Proxy running on a Broker VM deployed after February 22, 2026.
    
-   Up to 10,000 agents for Content Caching.
    

**Note:**

This is assuming a standard hardware setup with 2vCPU 8 GB memory.

Agent Proxy

-   Supported with Traps agent version 5.0.9 and Traps agent version 6.1.2 and later releases.
    
-   Broker VM supports forwarding the XDR Collectors request URLs on all Broker VM versions.
    
-   Supported with all XDR Collector versions.
    
    **Note:**
    
    Broker VMs can act as as a proxy for routing XDR Collector traffic to the Cortex Cloud tenant. The Broker VM does not cache XDR Collector installers.
    
-   The Agent Proxy can also act as a proxy for other brokers. It supports all the data that brokers send to the server, including the logs they collect, using the Cortex Broker VM applets.
    

Agent Installer and Content Caching

-   Supported with XDR agent version 7.4 and later releases and Broker VM 12.0 and later.
    
-   Requires a Broker VM with a minimum of an 8-core processor and increase the disk space allocated for data storage to 1024 GB to support caching for 10,000 agents. For more information, see Increase Broker VM storage allocated for data caching.
    
-   For the agent installer and content caching to work properly, you must configure different settings where the instructions differ depending on whether you are configuring a standalone Broker VM or High Availability (HA) cluster:
    
    Standalone broker
    
    -   FQDN: A FQDN must be configured for the standalone broker as configured in your local DNS server. This is to ensure that XDR agents know who to access to receive agent installer and content caching data.
        
    -   SSL certificates: Ensure you upload strong cipher SHA256-based SSL certificates when you setup the Broker VM. For more information, see Set up and configure Broker VM.
        
    -   Download source: Requires adding the Broker VM as a download source in your Agent Settings Profile.
        
    
    HA cluster
    
    -   FQDN: A FQDN must be configured in the cluster settings as configured in your local DNS server, which points to a Load Balancer. This ensures that the XDR agents turn to the load balancer to route the requests for the agent installer and content caching data to the correct broker. For more information on configuring the Load Balancer FQDN in a HA cluster, see Configure High Availability Cluster.
        
    -   SSL certificates: In each broker in the cluster, ensure you upload strong cipher SHA256-based SSL certificates when you setup the Broker VM. For more information, see Set up and configure Broker VM.
        
    -   Download source: Requires adding the cluster as a download source in your Agent Settings Profile.
        
    

Agent communication with Broker VM

Agents communicate with the Broker VM using Hypertext Transfer Protocol Secure (https) over port 443. You must ensure this port is open so that the Broker VM is accessible to all agents that are configured to use its cache.

Broker communication with cloud manager

The broker needs to communicate with the same URLs that the agents communicate with to avoid receiving any inaccessible URLs errors. For a complete list of the URLs that you need to allow access, see Enable access to required PANW resources.

##### How to activate the Local Agent Settings applet

After you configure and register your Palo Alto Networks Broker VM, proceed to set up your Local Agent Settings applet.

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  In either the Brokers tab or the Clusters tab, locate your Broker VM.
    
3.  (Optional) To set up the Agent Proxy:
    
    1.  Right-click the Broker VM, select Configure.
        
        Ensure your proxy server is configured. If not, proceed to add it as described in Set up and configure Broker VM.
        
    2.  In the APPS column, left-click Add → Local Agent Settings.
        
    3.  In the Activate Local Agent configuration, enable Agent Proxy by setting the Proxy to Enabled, and specify the Port. You can also configure the Listening Interface, where the default is set to All.
        
        **Note:**
        
        When you install your XDR agents, you need to configure the IP address of the Broker VM and a port number during the installation. You can use the default 8888 port or set a custom port. You are not permitted to configure port numbers between 0-1024 and 63000-65000, or port numbers 4369, 5671, 5672, 5986, 6379, 8000, 9100, 15672, 25672. Additionally, you are not permitted to reuse port numbers you already assigned to the Syslog Collector applet.
        
4.  (Optional) To setup up Agent Installer and Content Caching:
    
    1.  Ensure you uploaded your SHA256-based certificates.
        
        If not, upload them as described in Set up and configure Broker VM and Save.
        
    2.  Specify the Broker VM FQDN.
        
        Right-click the Broker VM, select Configure. Under Device Name, enter your Broker VM FQDN. This FQDN record must be configured in your local DNS server.
        
        **Important:**
        
        A FQDN must be configured for Agent Installer and Content Caching to function properly.
        
    3.  Activate the Local Agent Settings applet on the Broker VM.
        
        You can either right-click the Broker VM and select Add App → Local Agent Settings, or in the APPS column, select Add → Local Agent Settings.
        
    4.  Activate installer and content caching.
        
        In the Activate Local Agent configuration, enable Agent Installer and Content Caching by setting Caching to Enabled.
        
        **Important:**
        
        You can only enable Agent Installer and Content Caching, when in the Broker VM Configuration, you've uploaded your signed SSL Server Certificate and key and set the FQDN. For more information, see the Agent Installer and Content Caching requirements explained above.
        
    5.  To enable agents to start using Broker VM caching, you must add the Broker VM as a download source in your Agent Settings profile and select which Broker VMs to use. Then, ensure the profile is associated with a policy for your target agents.
        
5.  After a successful activation, the APPS field displays Local Agent Settings with a green dot indicating a successful connection. Left-click the Local Agent Settings connection to view the applet status and resource usage.
    
    To help you easily troubleshoot connectivity issues for a Local Agent Settings applet on the Palo Alto Networks Broker VM, Cortex Cloud displays a list of Denied URLs. These URLs are displayed when you left-click the Local Agent Settings applet to view the Connectivity Status. As a result, in a situation where the Local Agent Settings applet is reported as activated with a failed connection, you can easily determine the URLs that need to be allowed in your network environment.
    
6.  Manage the local agent settings. After the local agent settings have been activated, left-click the Local Agent Settings connection in the APPS column to display the settings, and select:
    
    -   Configure to change your settings.
        
    -   Deactivate to disable the local agent settings altogether.

#### Activate NetFlow Collector

Learn more about activating a Broker VM with a NetflFlow Collector applet.

**Notice:**

Requires the Data Collection add-on.

To receive NetFlow flow records from an external source, you must first set up the NetFlow Collector applet on a Broker VM within your network. NetFlow versions 5, 9, and IPFIX are supported.

To increase the log ingestion rate, you can add additional CPUs to the Broker VM. The NetFlow Collector listens for flow records on specific ports either from any, or from specific IP addresses.

After the NetFlow Collector is activated, the NetFlow Exporter sends flow records to the NetFlow Collector, which receives, stores, and pre-processes that data for later analysis.

Performance Requirements

The following setups are required to meet your performance needs:

-   4 CPUs for up to 50K flows per second (FPS).
    
-   8 CPUs for up to 100K FPS.
    

**Note:**

Since multiple network devices can send data to a single NetFlow Collector, we recommend that you configure a maximum of 50 NetFlow Collectors per Broker VM applet, with a maximum aggregated rate of approximately 50K flows per second (FPS) to maintain system performance.

**Prerequisite:**

Set up and configure Broker VM

##### How to activate the NetFlow Collector

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  Do one of the following:
    
    -   On the Brokers tab, find the Broker VM, and in the APPS column, left-click Add → NetFlow Collector.
        
    -   On the Clusters tab, find the Broker VM, and in the APPS column, left-click Add → NetFlow Collector.
        
    
3.  Click +Add New.
    
4.  Configure your NetFlow Collector.
    
    General Settings
    
    Specify the number of the UDP Port on which the NetFlow Collector listens for flow records (default 2055).
    
    This port number must match the UDP port number in the NetFlow exporter device. The rules for each port are evaluated, line by line, on a first match basis. Cortex Cloud discards logs for non-configured flow records without an “Any” rule.
    
    **Note:**
    
    Since Cortex Cloud reserves some port numbers, it is best to select a port number that is not in the range of 0-1024 (except for 514), in the range of 63000-65000 or has one of the following values: 4369, 5671, 5672, 5986, 6379, 8000, 8888, 9100, 15672, or 28672.
    
    Custom Settings
    
    | Field | Description |
    | --- | --- |
    | Source Network | Specify the IP address or a Classless Inter-Domain Routing (CIDR) of the source network device that sends the flow records to Cortex Cloud . Leave the field empty to receive data from any device on the specified port (default). If you do not specify an IP address or a CIDR, Cortex Cloud can receive data from any source IP address or CIDR that transmits via the specified port. If IP addresses overlap in multiple rows in the Source Network field, such as 10.0.0.10 in the first row and 10.0.0.0/24 in the second row, the NetFlow Collector captures the IP address in the first row. |
    | Vendor and Product | Specify a particular vendor and product to be associated with each dataset entry or leave the default IP Flow setting. The Vendor and Product values are used to define the name of your Cortex Query Language (XQL) dataset **`<Vendor>_<Product>_raw`**. If you do not define a vendor or product, Cortex Cloud uses the default values with the resulting dataset name `ip_flow_ip_flow_raw`. Consider changing the default values in order to uniquely identify the source network device. After each configuration, select → to save your changes and then select Done to update the NetFlow Collector with your settings. |
    
5.  (Optional) Make additional changes to the NetFlow Collector data sources.
    
    -   You can make additional changes to the Port by right-clicking the applicable UDP port and selecting the following:
        
        -   Edit: To change the UDP Port, Source Network, Vendor, or Product defined.
            
        -   Remove: To delete a Port.
            
        
    -   You can make additional changes to the Source Network by right-clicking on the Source Network value.
        
        **Note:**
        
        The options available change, according to the set Source Network value.
        
        | Option | Description |
        | --- | --- |
        | Edit | To change the UDP Port, Source Network, Vendor, or Product defined. |
        | Remove | To delete a Port. |
        | Copy entire row | To copy the Source Network, Product, and Vendor information. |
        | Open IP View | To view network operations and to view any open cases on this IP within a defined period. This option is only available when the Source Network value is a specific IP address or CIDR. |
        | Open in Quick Launcher | To search for information using the Quick Launcher shortcut . This option is only available when the Source Network value is a specific IP address or CIDR. |
        
    -   To prioritize the order of the NetFlow formats listed for the configured data source, drag and drop the rows to change their order.
        
    
6.  Activate the NetFlow collector applet.
    
    After successful activation, the APPS field displays NetFlow with a green dot indicating a successful connection.
    
7.  (Optional) To view NetFlow Collector metrics, left-click the NetFlow connection in the APPS field for your Broker VM.
    
    Cortex Cloud displays the following information:
    
    | Option | Description |
    | --- | --- |
    | Connectivity Status | Whether the applet is connected to Cortex Cloud. |
    | Logs Received and Logs Sent | Number of logs that the applet received and sent per second over the last 24 hours. If there are more logs received than sent, this can indicate a connectivity issue. |
    | Resources | Displays the amount of CPU, Memory, and Disk space the applet uses. |
    
8.  Manage the NetFlow Collector.
    
    After you activate the NetFlow Collector, you can make additional changes. To modify a configuration, left-click the NetFlow connection in the APPS column to display the NetFlow Collector settings, and select:
    
    -   Configure to redefine the NetFlow Collector configurations.
        
    -   Deactivate to disable the NetFlow Collector.
        
    
    You can also Ingest NetFlow flow records as datasets.Ingest NetFlow flow records as datasets

#### Activate Network Mapper

Learn more about activating the Network Mapper to scan your network.

**Prerequisite:**

After you have configured and registered your Broker VM, you can choose to activate the Network Mapper application.

The Network Mapper allows you to scan your network to detect and identify unmanaged hosts in your environment according to defined IP address ranges. The Network Mapper configurations are used to locate unmanaged assets that appear in the Assets table. For more information, see All Assets.

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  Do one of the following:
    
    -   On the Brokers tab, find the Broker VM, and in the APPS column, left-click Add → Network Mapper.
        
    -   On the Clusters tab, find the Broker VM, and in the APPS column, left-click Add → Network Mapper.
        
    
3.  In the Activate Network Mapper window, define the following parameters:
    
    | Field | Description |
    | --- | --- |
    | Scan Method | Select the either ICMP echo or TCP SYN scan method to identify your network hosts. When selecting TCP SYN you can enter single ports and ranges together, for example **`80-83, 443`**. |
    | Scan Requests per Second | Define the maximum number of scan requests you want to send on your network per second. By default, the number of scan requests are defined as 1000. \*\*Note:\*\* Each IP address range can receive multiple scan requests based on it's availability. |
    | Scanning Scheduler | Define when you want to run the network mapper scan. You can select either daily, weekly, or monthly at a specific time. |
    | Scanned Ranges | Select from the list of exiting IP address ranges to scan. Make sure to  after each selection. \*\*Note:\*\* IP address ranges are displayed according to what you defined as your Network Parameters. |
    
4.  Activate the applet.
    
    After a successful activation, the APPS field displays Network Mapper with a green dot indicating a successful connection.
    
5.  In the APPS field, left-click the Network Mapper connection to view the following scan and applet metrics:
    
    Scan Details
    
    | Field | Description |
    | --- | --- |
    | Connectivity Status | Whether the applet is connected to Cortex Cloud . |
    | Scan Status | State of the scan. |
    | Scan Start Time | Timestamp of when the scan started. |
    | Scan Duration | Period of time in minutes and seconds the scan is running. |
    | Scan Progress | How much of the scan has been completed in percentage and IP address ratio. |
    | Detected Hosts | Number of hosts identified from within the IP address ranges. |
    | Scan Rate | Number of IP addresses scanned per second. |
    
    Applet Metrics
    
    Resources: Displays the amount of CPU, Memory, and Disk space the applet is using.
    
6.  Manage the Network Mapper.
    
    After the network mapper has been activated, left-click the Network Mapper connection in the APPS column to display the Network Mapper settings, and select:
    
    -   Configure to redefine the network mapper configurations.
        
    -   Scan Now to initiate a scan.
        
    -   Deactivate to disable the network mapper.

#### Activate Registry Scanner
The Broker VM provides a Registry Scanner applet that scans and secures your container image registries. It supports Docker V2 or JFrog self-hosted registries located on-premises or in private cloud networks.

**Notice:**

**Note:**

-   You cannot activate the Registry Scanner directly on a new or existing Broker VM. You can only activate or deactivate existing Registry Scanner applets. To activate or deactivate existing applets, see Step 4 under Verify Registry Scanner connection section.
    

##### Verify Registry Scanner connection

After the registry scanner is initialized, perform the following steps to verify that the Registry Scanner applet is connected to the Broker VM:

**Prerequisite:**

-   To initialize registry scanning on your Broker VM, you must first add the necessary data connectors. For details, see:
    
    -   Connect Docker Hub registry
        
    -   Connect Docker V2 compliant container registry
        
    -   Connect GitLab container registry
        
    -   Connect Harbor registry
        
    -   Connect JFrog container registry
        
    -   Connect Sonatype Nexus registry
        
    
-   When sizing your Broker VM, consider the following recommendations:
    
    -   **Disk Size:** Calculate the required disk space by multiplying the average container image size in your environment by 10. This factor accounts for simultaneous operations with a buffer.
        
        For example, If your average image size is 500 MB, allocate at least 5 GB of disk space (500 MB \* 10 = 5000 MB = 5 GB).
        
    -   **CPU:** Allocate a minimum of 8 CPU cores.
        
    -   **Memory:** Allocate a minimum of 16 GB of RAM.
        
    

1.  Go to Settings → Configurations → Data Broker → Broker VMs.
    
2.  On either the Brokers or Clusters tab, find the Broker VM.
    
3.  In the APPS column for the Broker VM, verify that the Registry Scanner app appears.
    
4.  Select the Registry Scanner app to open a window displaying the following information:
    
    
    
    -   Connection: Shows the app's current connection status. You can also Deactivate the app.
        
        To reactivate the Registry Scanner app, do one of the following:
        
        -   On the Brokers tab, locate the Broker VM, select +Add in the APPS column, and then choose Registry Scanner.
            
        -   On the Clusters tab, locate the Broker VM, select +Add in the APPS column, and then choose Registry Scanner.
            
        
        If the Registry Scanner app is not listed in the drop-down menu when you click +Add, it means that the registry scanning was not configured for that Broker VM. You must first add the data connectors.
        
    -   Resources: Shows the percentage of CPU, Memory, and Disk resources used by the app.
        
    
5.  To manage the Registry Scanner applet, see:
    
    -   Manage a Docker Hub connector
        
    -   Manage a Docker V2 connector
        
    -   Manage a Gitlab Container Registry connector
        
    -   Manage a Harbor connector
        
    -   Manage a JFrog connector
        
    -   Manage a Sonatype connector

#### Syslog Collector applet

Learn more about the Broker VM Syslog Collector applet.

The Syslog Collector applet on a Broker VM enables you to collect Syslog data from an external source:

| Syslog Collector applet | Description |
| --- | --- |
| How to activate Syslog Collector? | Activate Syslog Collector |
| How to ingest logs from a Syslog receiver? | Ingest logs from a Syslog receiver |
| Different types of vendor logs to ingest with a Syslog Collector applet: | Check Point FW1/VPN1; Cisco ASA firewalls and AnyConnect; Corelight Zeek; Forcepoint DLP; Fortinet Fortigate; Next-Generation Firewall; PingFederate; Zscaler Internet Access; Zscaler Private Access |
| Links to content pack/integration details | The [Syslog](https://xsoar.pan.dev/docs/reference/integrations/syslog-v2) content pack enables automated issue creation by acting as a Syslog server for incoming logs, while also allowing the platform to act as a Syslog client to send messages and mirror investigation activities to external Syslog destinations. It contains the following integrations: [Syslog Sender](https://xsoar.pan.dev/docs/reference/integrations/syslog-sender): Use this integration to send messages in RFC 5424 message format and mirror incident War Room entries to Syslog. It includes the **`mirror-investigation`**, **`send-notification`**, and **`syslog-send`** commands.; [Syslog v2](https://xsoar.pan.dev/docs/reference/integrations/syslog-v2): Use this integration to act as a long-running Syslog server, supporting RFC3164, RFC5424, and RFC6587 formats, which enables automatically opening issues from Syslog clients. This integration is configured using parameters such as Port mapping, Certificate, Private Key, and a Message Regex Filter for issue creation. |

##### Activate Syslog Collector

Learn how to set up and activate the Syslog Collector applet on a Broker VM within your network.

**Notice:**

Requires the Data Collection add-on.

To receive Syslog data from an external source, you must first set up the Syslog Collector applet on a Broker VM within your network. The Syslog Collector supports a log ingestion rate of 90,000 logs per second (lps) with the recommended Broker VM setup.

The Syslog collector supports TCP/Secure TCP/UDP. The RFC 6587 standard, which specifies the transmission of syslog messages over TCP, is supported by the Syslog collector. When syslog messages are transmitted over TCP, there are two options:

-   Octet Framing
    
-   Non-Transparent-Framing
    
    This is the most commonly used option. The Syslog collector supports the newline character \\n (Hex 0x0A) as the end-of-line delimiter for syslog messages.
    

The Syslog Collector listens for logs on specific ports and from any or specific IP addresses. A Syslog Collector configuration supports up to 100 ports.

**Prerequisite:**

Set up and configure Broker VM

Perform the following procedures in the order listed below.

###### Task 1. Add a Syslog Collector

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  Do one of the following:
    
    -   On the Brokers tab, find the Broker VM, and in the APPS column, left-click Add → Syslog Collector.
        
    -   On the Clusters tab, find the Broker VM, and in the APPS column, left-click Add → Syslog Collector.
        
    

###### Task 2. Configure the Syslog Collector

Cortex Cloud supports multiple sources over a single port on a single Syslog Collector. The following options are available:

-   Edit the Optional Settings of the default PORT/PROTOCOL: 514/UDP. See **Task 3**.
    
    **Note:**
    
    Once configured, you cannot change the Port/PROTOCOL. If you don’t want to use a data source, ensure to remove the data source from the list as explained in **Task 5**.
    
-   Add a new Syslog Collector data source. See **Task 4**.
    

###### Task 3. Edit the default 514/UDP Syslog Collector data source

1.  Right-click the 514/UDP PORT/PROTOCOL, and select Edit.
    
2.  Configure these Optional Settings:
    
    | Field | Description |
    | --- | --- |
    | Format | Select the Syslog format you want to send to the UDP 514 protocol and port on the Syslog Collector: Auto-Detect (default), CEF, LEEF, CISCO, or RAW. \*\*Note:\*\* The Vendor and Product defaults to Auto-Detect when the Log Format is set to CEF or LEEF.; For a Log Format set to CEF or LEEF, Cortex Cloud reads events row by row to look for the Vendor and Product configured in the logs. When the values are populated in the event log row, Cortex Cloud uses these values even if you specified a value in the Vendor and Product fields in the Syslog Collector settings. Yet, when the values are blank in the event log row, Cortex Cloud uses the Vendor and Product that you specified in the Syslog Collector settings. If you did not specify a Vendor or Product in the Syslog Collector settings and the values are blank in the event log row, the values for both fields are set to unknown.; CORELIGHT is not available for a UDP protocol. |
    | Vendor and Product | Specify a particular vendor and product for the Syslog format defined or leave the default Auto-Detect setting. |
    | Source Network | Specify the IP address or Classless Inter-Domain Routing (CIDR). If you leave this blank, Cortex Cloud will allow receipt of logs from any source IP address or CIDR that transmits over the specified protocol and port. When you specify overlapping addresses in the Source Network field in multiple rows, such as 10.0.0.10 in the first row and 10.0.0.0/24 in the second row, the order of the addresses matter. In this example, the IP address 10.0.0.10 is only captured from the first row definition. For more information on prioritizing the order of the syslog formats, see **Task 5**. |
    
    After each configuration, select → to save the changes and then Done to update the Syslog Collector with your settings.
    

###### Task 4. Add a new Syslog Collector data source

1.  Select Add New.
    
2.  Configure these mandatory General settings:
    
    Protocol
    
    Choose a protocol over which the Syslog will be sent: UDP, TCP, or Secure TCP.
    
    When configuring the Protocol as Secure TCP, these additional General Settings are available:
    
    -   Server Certificate: Browse to your server certificate to configure server authentication.
        
    -   Private Key: Browse to your private key for the server certificate.
        
    -   Optional CA Certificate: (Optional) Browse to your CA certificate for mutual authentication.
        
        The log forwarder (for example, a firewall) authenticates the Broker VM by default. The Broker VM does not authenticate the log forwarder by default, but you can use this option to set set up such authentication. If you use this option, ensure that you have a client certificate on the log forwarding side that matches the CA certificate on the Broker VM side.
        
    -   Minimal TLS Version: Select either 1.0 or 1.2 (default) as the minimum TLS version allowed.
        
    
    **Note:**
    
    -   The server certificate and private key pair is expected in a PEM format.
        
    -   Cortex Cloud will notify you when your certificates are about to expire.
        
    
    Port
    
    Choose a port on which the Syslog Collector will listen for logs. A Syslog Collector configuration supports up to 100 ports.
    
    **Note:**
    
    Because some port numbers are reserved by Cortex Cloud , you must choose a port number that is not:
    
    -   In the range of 0-1024 (except for 514)
        
    -   In the range of 63000-65000
        
    -   Values of 4052, 4369, 5671, 5672, 5986, 6379, 8000, 8888, 9100, 15672, or 28672
        
    
3.  Configure these Optional Settings:
    
    | Field | Description |
    | --- | --- |
    | Format | Select the Syslog format you want to send to the protocol and port on the Syslog Collector: Auto-Detect (default), CEF, LEEF, CISCO, CORELIGHT, or RAW. \*\*Note:\*\* CORELIGHT is not available for a UDP protocol. |
    | Vendor and Product | Enter a particular vendor and product for the Syslog format defined or leave the default Auto-Detect setting. |
    | Source Network | Specify the IP address or Classless Inter-Domain Routing (CIDR). If you leave this blank, Cortex Cloud will allow receipt of logs from any source IP address or CIDR that transmits over the specified protocol and port. When you specify overlapping addresses in the Source Network field in multiple rows, such as 10.0.0.10 in the first row and 10.0.0.0/24 in the second row, the order of the addresses matter. In this example, the IP address 10.0.0.10 is only captured from the first row definition. For more information on prioritizing the order of the syslog formats, see **Task 5**. |
    
    After each configuration, select → to save the changes and then Done to update the Syslog Collector with your settings.
    

###### Task 5. Make additional changes to the Syslog Collector data sources configured

-   To remove a Syslog Collector data source, right-click the row after the Port/Protocol entry, and select Remove.
    
-   To prioritize the order of the Syslog formats listed for the protocols and ports configured, drag and drop the rows to the order you require.
    

###### Task 6. Save the Syslog Collector settings

Click Save. After a successful activation, the APPS field displays Syslog with a green dot indicating a successful connection.

###### Task 7. (optional) View metrics about the Syslog Collector

To view metrics about the Syslog Collector, left-click the Syslog connection in the APPS field for your Broker VM. Cortex Cloud displays the following information:

| Metric | Description |
| --- | --- |
| Connectivity Status | Whether the applet is connected to Cortex Cloud. |
| Logs Received and Logs Sent | Number of logs received and sent by the applet per second over the last 24 hours. If the number of incoming logs received is larger than the number of logs sent, it could indicate a connectivity issue. |
| Resources | Displays the amount of CPU, Memory, and Disk space the applet is using. |

###### Step 8. Manage the Syslog Collector

After the Syslog Collector has been activated, you can make additional changes to your configuration if needed. To modify a configuration, left-click the Syslog connection in the APPS column to display the Syslog Collector settings, and select:

-   Configure to redefine the Syslog configurations.
    
-   Deactivate to disable the Syslog Collector.

##### Ingest logs from a Syslog receiver

To extend visibility, Cortex Cloud can receive Syslog from additional vendors that use CEF or LEEF formatted over Syslog (TLS not supported).

**Notice:**

Requires the Data Collection add-on.

Cortex Cloud can receive Syslog from a variety of supported vendors (see External data ingestion vendor support). In addition, Cortex Cloud can receive Syslog from additional vendors that use CEF, LEEF, CISCO, CORELIGHT, or RAW formatted over Syslog.External data ingestion vendor support

After Cortex Cloud begins receiving logs from the third-party source, Cortex Cloud automatically parses the logs in CEF, LEEF, CISCO, CORELIGHT, or RAW format and creates a dataset with the name `<vendor>_<product>_raw`. You can then use XQL Search queries to view logs and create new IOC, BIOC, and Correlation Rules.

To receive Syslog from an external source:

1.  Set up your Syslog receiver to forward logs.
    
2.  Activate the Syslog collector applet on a Broker VM within your network. For more information, see Activate the Syslog Collector.
    
3.  Use the XQL Search to search your logs.

##### Check Point FW1/VPN1

Learn more about collecting Check Point FW1/VPN1 logs using a Syslog Collector applet and content pack integration in Cortex Cloud.

You can configure collecting Check Point FW1/VPN1 logs using a Broker VM Syslog Collector applet or with a content pack integration:

| Check Point FW1/VPN1 vendor | Description |
| --- | --- |
| Syslog Collector applet overview | If you use Check Point FW1/VPN1 firewalls, you can forward Check Point firewall logs to Cortex Cloud using the Broker VM Syslog Collector applet in a CEF format. |
| Link to Syslog Collector applet instructions | Ingest logs from Check Point firewalls |
| Link to content pack/integration details | The [Check Point Firewall](https://cortex.marketplace.pan.dev/marketplace/details/CheckpointFirewall/) content pack manages Check Point firewall devices via API, allowing the reading information, sending commands, and orchestrating configuration and blocking actions. It contains a modeling rule (**`CheckPoint Firewall Collection`**) and several playbooks (for example Checkpoint - Block IP - Append Group, Checkpoint - Publish&Install configuration, Checkpoint - Block IP - Custom Block Rule, and Checkpoint - Block URL). It also includes the following integration: [CheckPoint Firewall v2](https://xsoar.pan.dev/docs/reference/integrations/check-point-firewall-v2): Use this integration to read information and send commands to the Check Point Firewall server. It includes commands for handling threat protection and profiles, such as **`checkpoint-set-threat-protection`** and **`checkpoint-add-threat-profile`**. |

###### Ingest logs from Check Point firewalls

To take advantage of Cortex Cloud investigation and detection capabilities while using Check Point firewalls, forward your firewall logs to Cortex Cloud.

**Notice:**

Requires the Data Collection add-on.

If you use Check Point FW1/VPN1 firewalls, you can still take advantage of Cortex Cloud investigation and detection capabilities by forwarding your Check Point firewall logs to Cortex Cloud. Check Point firewall logs can be used as the sole data source, however, you can also use Check Point firewall logs in conjunction with Palo Alto Networks firewall logs and additional data sources.

Cortex Cloud can stitch data from Check Point firewalls with other logs to make up network stories searchable in the Query Builder and in Cortex Query Language (XQL) queries. Cortex Cloud can also return raw data from Check Point firewalls in XQL queries.

**Note:**

-   Logs with `sessionid = 0` are dropped.
    
-   Destination Port data is available only in the raw logs.
    

In terms of alerts, Cortex Cloud can both surface native Check Point firewall alerts and generate its own issues on network activity. Issues are displayed throughout Cortex Cloud issue, case, and investigation views.

To integrate your logs, you first need to set up an applet in a Broker VM within your network to act as a Syslog Collector. You then configure your Check Point firewall policy to log all traffic and set up the Log Exporter on your Check Point Log Server to forward logs to the Syslog Collector in a CEF format.

When Cortex Cloud starts to receive logs, the app can begin stitching network connection logs with other logs to form network stories. Cortex Cloud can also analyze your logs to generate Analytics issues, and can apply IOC, BIOC, and Correlation Rule matching. You can also use queries to search your network connection logs.

1.  Ensure that your Check Point firewalls meet the following requirements.
    
    Check Point software version: R77.30, R80.10, R80.20, R80.30, or R80.40
    
2.  Increase log storage for Check Point firewall logs.
    
    As an estimate for initial sizing, note that the average Check Point log size is roughly 700 bytes. For proper sizing calculations, test the log sizes and log rates produced by your Check Point firewalls. For more information, see Manage Your Log Storage within Cortex Cloud.
    
3.  Activate the Syslog Collector.
    
4.  Configure the Check Point firewall to forward Syslog events in CEF format to the Syslog Collector.
    
    Configure your firewall policy to log all traffic and set up the Log Exporter to forward logs to the Syslog Collector. For more information on setting up Log Exporter, see the Check Point documentation.

##### Cisco ASA firewalls and AnyConnect

Learn more about collecting Cisco ASA firewall and AnyConnect VPN logs using a Syslog Collector applet and content pack integration in Cortex Cloud.

You can configure collecting Cisco ASA firewall and AnyConnect VPN logs using a Broker VM Syslog Collector applet or with a content pack integration:

| Cisco ASA firewalls and AnyConnect vendor | Description |
| --- | --- |
| Syslog Collector applet overview | If you use Cisco ASA firewalls or Cisco AnyConnect VPN, you can forward Cisco ASA firewall and AnyConnect VPN logs to Cortex Cloud using the Broker VM Syslog Collector applet in a CISCO format. |
| Link to Syslog Collector applet instructions | Ingest logs from Cisco ASA firewalls and AnyConnect |
| Link to content pack/integration instructions | The [Cisco ASA](https://cortex.marketplace.pan.dev/marketplace/details/CiscoASA/) content pack interacts with the Cisco Adaptive Security Appliance Software via an API to manage interfaces, rules, and network objects. The content pack includes the following integration: [Cisco Adaptive Security Appliance Software](https://xsoar.pan.dev/docs/reference/integrations/cisco-asa): Use this integration to manage interfaces, rules, and network objects on the Cisco Adaptive Security Appliance Software platform. This integration includes commands for listing and managing network object groups, local user groups, local users, time ranges, security object groups, user objects, interface information, configuration backup, and creating, listing, getting, editing, and deleting firewall rules, along with the command to save the running configuration to memory (**`cisco-asa-write-memory`**). |

###### Ingest logs from Cisco ASA firewalls and AnyConnect

Extend Cortex Cloud visibility into logs from Cisco ASA firewalls and Cisco AnyConnect VPN.

**Notice:**

Requires the Data Collection add-on.

If you use Cisco ASA firewalls or Cisco AnyConnect VPN, you can take advantage of Cortex Cloud investigation and detection capabilities by forwarding your firewall and AnyConnect VPN logs to Cortex Cloud. This enables Cortex Cloud to examine your network traffic to detect anomalous behavior. Cortex Cloud can use Cisco ASA firewall logs and AnyConnect VPN logs as the sole data source, but can also use Cisco ASA firewall logs in conjunction with Palo Alto Networks firewall logs. For additional endpoint context, you can also use Cortex Cloud to collect and alert on endpoint data.

When Cortex Cloud starts to receive logs, the app can begin stitching network connection logs with other logs to form network stories. Cortex Cloud can also analyze your logs to generate Analytics issues, and can apply IOC, BIOC, and Correlation Rules matching. You can also use queries to search your network connection logs using the Cisco Cortex Query Language (XQL) dataset (`cisco_asa_raw`).

To integrate your logs, you first need to set up an applet in a Broker VM within your network to act as a Syslog Collector. You then configure forwarding on your log devices to send logs to the Syslog Collector in a CISCO format.

1.  Verify that your Cisco ASA firewall and Cisco AnyConnect VPN logs meet the following requirements.
    
    -   Syslog in Cisco-ASA format
        
    -   Must include `timestamps`
        
    -   Only supports the following messages.
        
        -   For Cisco ASA firewall: 302013, 302014, 302015, 302016
            
        -   For Cisco AnyConnect VPN: 113039, 716001, 722022, 722033, 722034, 722051, 722055, 722053, 113019, 716002, 722023, 722037
            
        
    
2.  Activate the Syslog Collector.
    
3.  Increase log storage for Cisco ASA firewall and Cisco AnyConnect VPN logs.
    
    As an estimate for initial sizing, note that the average Cisco ASA log size is roughly 180 bytes. For proper sizing calculations, test the log sizes and log rates produced by your Cisco ASA firewalls and Cisco AnyConnect VPN logs. For more information, see Manage Your Log Storage within Cortex Cloud.
    
4.  Configure the Cisco ASA firewall and Cisco AnyConnect VPN, or the log devices forwarding logs from Cisco, to log to the Syslog Collector in a CISCO format.
    
    Configure your firewall and AnyConnect VPN policies to log all traffic and forward the traffic logs to the Syslog Collector in a CISCO format. By logging all traffic, you enable Cortex Cloud to detect anomalous behavior from Cisco ASA firewall logs and Cisco AnyConnect VPN logs. For more information on setting up Log Forwarding on Cisco ASA firewalls or Cisco AnyConnect VPN, see the Cisco ASA Series documentation.

##### Corelight Zeek

Learn more about collecting Corelight Zeek logs using a Syslog Collector applet and content pack integration in Cortex Cloud.

You can configure collecting Corelight Zeek logs using a Broker VM Syslog Collector applet or with a content pack integration:

| Corelight Zeek vendor | Description |
| --- | --- |
| Syslog Collector applet overview | If you use Corelight Zeek sensors for network monitoring, you can forward network connection logs to Cortex Cloud using the Broker VM Syslog Collector applet with TCP as the transport Protocol and a Corelight format. |
| Link to Syslog Collector applet instructions | Ingest logs from Corelight Zeek |
| Link to content pack/integration details | The [Corelight Zeek](https://cortex.marketplace.pan.dev/marketplace/details/CorelightZeek) content pack provides data normalization capabilities through rules for parsing and modeling network protocol logs that are ingested via a Syslog collector on the Broker VM into Cortex Cloud. It includes **`Corelight Zeek Modeling Rules`** and **`Corelight Zeek Parsing Rules`**. |

###### Ingest logs from Corelight Zeek

Extend Cortex Cloud visibility into logs from Corelight Zeek.

**Notice:**

Requires the Data Collection add-on.

If you use Corelight Zeek sensors for network monitoring, you can still take advantage of Cortex Cloud investigation and detection capabilities by forwarding your network connection logs to Cortex Cloud. This enables Cortex Cloud to examine your network traffic to detect anomalous behavior. Cortex Cloud can use Corelight Zeek logs as the sole data source, but can also use logs in conjunction with Palo Alto Networks or third-party firewall logs. For additional endpoint context, you can also use Cortex Cloud to collect and alert on endpoint data.

As soon as Cortex Cloud starts to receive logs, the app can begin stitching network connection logs with other logs to form network stories. Cortex Cloud can also analyze your logs to generate Analytics issues, and can apply IOC, BIOC, and Correlation Rule matching. You can also use queries to search your network connection logs.

To integrate your logs, you first need to set up an applet in a Broker VM within your network to act as a Syslog Collector. You then configure forwarding on your Corelight Zeek sensors (using the default Syslog export option of RFC5424 over TCP) to send logs to the Syslog Collector.

1.  Activate the Syslog Collector.
    
    During activation, you define the Listening Port over which you want the Syslog Collector to receive logs. You must also set TCP as the transport Protocol and Corelight as the Syslog Format.
    
2.  Increase log storage for Corelight Zeek logs.
    
    For proper sizing calculations, test the log sizes and log rates produced by your Corelight Zeek Sensors. Then adjust your Cortex Cloud log storage. For more information, see Manage Your Log Storage within Cortex Cloud.
    
3.  Forward logs to the Syslog Collector.
    
    Cortex Cloud can receive logs from Corelight Zeek sensors that use the Syslog export option of RFC5424 over TCP.
    
    1.  In the Syslog configuration of Corelight Zeek (Sensor → Export), specify the details for your Syslog Collector including the hostname or IP address of the Broker VM and corresponding listening port that you defined during activation of the Syslog Collector, default Syslog format (RFC5424), and any log exclusions or filters.
        
    2.  Save your Syslog configuration to apply the configuration to your Corelight Zeek Sensors.
        
    
    For full setup instructions, see the Corelight Zeek documentation.

##### Forcepoint DLP

Learn more about collecting Forcepoint DLP logs using a Syslog Collector applet and content pack integration in Cortex Cloud.

You can configure collecting Corelight Zeek logs using a Broker VM Syslog Collector applet or with a content pack integration:

| Forcepoint DLP vendor | Description |
| --- | --- |
| Syslog Collector applet overview | If you use Forcepoint DLP to prevent data loss over endpoint channels, you can forward logs to Cortex Cloud using the Broker VM Syslog Collector applet in a CEF or LEEF format. |
| Link to Syslog Collector applet instructions | Ingest logs from Forcepoint DLP |
| Link to content pack/integration details | The [Forcepoint DLP](https://cortex.marketplace.pan.dev/marketplace/details/ForcepointDLP) content pack fetches security incidents from Forcepoint DLP and ingests them as events into Cortex Cloud for processing and analysis. contains the **`Forcepoint DLP Modeling Rule`**, and the **`Forcepoint DLP Parsing Rule`**. It also includes the following integration: [Forcepoint DLP Event Collector (Beta)](https://xsoar.pan.dev/docs/reference/integrations/forcepoint-dlp-event-collector): Use this integration to fetch security incidents from Forcepoint DLP as Cortex Cloud events. This integration is an event collector and utilizes parsing and modeling rules within the content pack for data normalization. |

###### Ingest logs from Forcepoint DLP

Extend Cortex Cloud visibility into logs from Forcepoint DLP.

**Notice:**

Requires the Data Collection add-on.

If you use Forcepoint DLP to prevent data loss over endpoint channels, you can take advantage of Cortex Cloud investigation and detection capabilities by forwarding your logs to Cortex Cloud. This enables Cortex Cloud to help you expand visibility into data violation by users and hosts in the organization, correlate and detect DLP incidents, and query Forcepoint DLP logs using XQL Search.

When Cortex Cloud starts to receive logs, Cortex Cloud can analyze your logs in XQL Search and you can create new Correlation Rules.

To integrate your logs, you first need to set up an applet in a Broker VM within your network to act as a Syslog Collector. You then configure forwarding on your log devices to send logs to the Syslog Collector in a CEF or LEEF format.

Configure Forcepoint DLP collection in Cortex Cloud.

1.  Verify that your Forcepoint DLP meet the following requirements.
    
    -   Must use version 8.8.0.347 or a later release.
        
    -   On premise installation only.
        
    
2.  Activate the Syslog Collector applet on a Broker VM in your network.
    
    Ensure the Broker VM is configured with the following settings.
    
    -   Format: Select either a CEF or LEEF Syslog format.
        
    -   Vendor: Specify the Vendor as `forcepoint`.
        
    -   Product: Specify the Product as `dlp_endpoint`.
        
    
3.  Increase log storage for Forcepoint DLP logs.
    
    As an estimate for initial sizing, note the average Forcepoint DLP log size. For proper sizing calculations, test the log sizes and log rates produced by your Forcepoint DLP. For more information, see Manage Your Log Storage.
    
4.  Configure the log device that receives Forcepoint DLP logs to forward syslog events to the Syslog Collector in a CEF or LEEF format.
    
    For more information, see the [Forcepoint DLP documentation](https://help.forcepoint.com/emailsec/en-us/on-prem/8.5.x/email_siem/guid-bde9b920-e7cb-4845-a1ac-4742ff2aeb1d.html).
    
5.  After Cortex Cloud begins receiving data from Forcepoint DLP, you can use XQL Search to search your logs using the `forcepoint_dlp_endpoint` dataset.

##### Fortinet Fortigate

Learn more about collecting Fortinet Fortigate firewalls logs using a Syslog Collector applet and content pack integration in Cortex Cloud.

You can configure collecting Fortinet Fortigate firewall logs using a Broker VM Syslog Collector applet or with a content pack integration:

| Fortinet Fortigate vendor | Description |
| --- | --- |
| Syslog Collector applet overview | If you use Fortinet Fortigate firewalls, you can forward network connection logs to Cortex Cloud using the Broker VM Syslog Collector applet in a CEF format. |
| Link to Syslog Collector applet instructions | Ingest logs from Fortinet Fortigate firewalls |
| Links to content pack/integration details | The [FortiManager](https://cortex.marketplace.pan.dev/marketplace/details/FortiManager) content pack enables managing Fortinet devices through a single console central management system and provides data normalization for FortiManager event logs ingested via Syslog into Cortex Cloud. It contains the **`Fortinet FortiManager Modeling Rule`**, the **`Fortinet FortiManager Parsing Rule`**, and the FortiManager - Install Policy Package on Device playbook. It also includes the following integration:- [FortiManager](https://xsoar.pan.dev/docs/reference/integrations/forti-manager): Use this integration to manage Fortinet devices as a single console central management system. This integration enables executing the FortiManager - Install Policy Package on Device playbook, which installs a FortiManager firewall policy package on a given device. ; The [FortiGate](https://cortex.marketplace.pan.dev/marketplace/details/FortiGate) content pack manages FortiGate firewalls, delivering convergence and deep security visibility across diverse network environments, and facilitating data normalization for ingested event logs. It contains the **`Fortinet FortiGate Modeling Rule`**, and the **`FortiGate Parsing Rule`**. It also includes the following integration:- [FortiGate](https://xsoar.pan.dev/docs/reference/integrations/forti-gate): Use this integration to manage Fortinet FortiGate firewall devices, leveraging the Fortinet FortiOS operating system to provide deep visibility and consistent security across environments like remote offices, campuses, and data centers. It includes commands for listing, creating, updating, moving, and deleting firewall policies, addresses (IPv4 and IPv6, including multicasts), and service groups, alongside functionalities like banning and unbanning IPs. |

###### Ingest logs from Fortinet Fortigate firewalls

Extend Cortex Cloud visibility into logs from Fortinet Fortigate firewalls.

**Notice:**

Requires the Data Collection add-on.

If you use Fortinet Fortigate firewalls, you can still take advantage of Cortex Cloud investigation and detection capabilities by forwarding your firewall logs to Cortex Cloud . This enables Cortex Cloud to examine your network traffic to detect anomalous behavior. Cortex Cloud can use Fortinet Fortigate firewall logs as the sole data source, but can also use Fortinet Fortigate firewall logs in conjunction with Palo Alto Networks firewall logs. For additional endpoint context, you can also use Cortex Cloud to collect and alert on endpoint data.

When Cortex Cloud starts to receive logs, the app can begin stitching network connection logs with other logs to form network stories. Cortex Cloud can also analyze your logs to generate Analytics issues, and can apply IOC, BIOC, and Correlation Rule matching. You can also use queries to search your network connection logs.

To integrate your logs, you first need to set up an applet in a Broker VM within your network to act as a Syslog collector. You then configure forwarding on your log devices to send logs to the Syslog collector in a CEF format.

1.  Verify that your Fortinet Fortigate firewalls meet the following requirements.
    
    -   Must use FortiOS 6.2.1 or a later release
        
    -   `timestamp` must be in nanoseconds
        
    
2.  Activate the Syslog Collector.
    
3.  Increase log storage for Fortinet Fortigate firewall logs.
    
    As an estimate for initial sizing, note that the average Fortinet Fortigate log size is roughly 1,070 bytes. For proper sizing calculations, test the log sizes and log rates produced by your Fortinet Fortigate firewalls. For more information, see Manage Your Log Storage within Cortex Cloud.
    
4.  Configure the log device that receives Fortinet Fortigate firewall logs to forward Syslog events to the Syslog collector in a CEF format.
    
    Configure your firewall policy to log all traffic and forward the traffic logs to the Syslog collector in a CEF format. By logging all traffic, you enable Cortex Cloud to detect anomalous behavior from Fortinet Fortigate firewall logs. For more information on setting up Log Forwarding on Fortinet Fortigate firewalls, see the Fortinet FortiOS documentation.

##### Next-Generation Firewall

Learn more ingesting firewall data from your Next-Generation Firewall (NGFW) and Panorama devices in Cortex Cloud.

You can configure collecting Next-Generation Firewall logs and data using an integration configured in Data Sources & Integrations or from Marketplace:

| Next-Generation Firewall | Description |
| --- | --- |
| Data Source overview | You can forward firewall data from your Next-Generation Firewall (NGFW) and Panorama devices to Cortex Cloud. |
| Link to Data Source instructions | Ingest data from Next-Generation Firewall; Ingest Next-Generation Firewall logs using the Syslog collector |
| Links to content pack/integration details | The [PAN-OS by Palo Alto Networks](https://cortex.marketplace.pan.dev/marketplace/details/PANOS/) content pack manages Palo Alto Networks Firewalls and Panorama via API, allowing users to create, modify, and manage custom security policies, perform configuration commits, manage dynamic lists, perform system upgrades, and query various log types. It contains various playbooks, a classifier (Panorama Classifier) and mapper (Panorama Mapper), issue fields, issue types, and automations/scripts. It also includes the following integration: [Palo Alto Networks PAN-OS](https://xsoar.pan.dev/docs/reference/integrations/panorama): Use this integration to manage Palo Alto Networks Firewall and Panorama, including managing Prisma Access through Panorama, creating and managing security policies, and querying logs. This integration includes commands for managing the master key, checking dynamic updates status, downloading and installing various dynamic updates (for example, AntiVirus, WildFire, GlobalProtect Clientless VPN), listing and deleting policy rules (including new types like application-override, authentication, decryption, nat, and pbf), managing addresses and URL categories, retrieving rule hit counts, disabling rules, and performing hygiene checks on various security profiles and configurations. |

###### Ingest Next-Generation Firewall logs using the Syslog collector

Use the Syslog collector to ingest NGFW logs in CEF format. This method is useful when your firewalls are located in a different region, or bandwidth issues are encountered due to large log size.

**Notice:**

Requires the Data Collection add-on.

Use the Syslog collector to ingest Next-Generation Firewall (NGFW) logs in CEF format. This method is useful when your firewalls are located in a different region, or bandwidth issues are encountered due to large log size. When possible, we recommend that you ingest NGFW logs using the dedicated Next-Generation Firewall data collector instead of the Syslog collector.

**Note:**

In the following procedure, general information is provided for NGFW and Panorama. For detailed instructions, consult the documentation for your specific devices and Panorama version, to ensure that you have configured log forwarding correctly for all the log types that you would like to forward to Cortex Cloud. The following steps only cover configuration of the custom log schema (CEF) for a given syslog server. They do not replace the administrator guide’s configuration coverage of log forwarding.

Configure the firewall/Panorama for log forwarding to Cortex Cloud

1.  To configure the device to include its IP address in the header of Syslog messages, select Panorama/Device → Setup → Management, click the Edit icon in the Logging and Reporting Settings section, and navigate to the Log Export and Reporting tab.
    
2.  From the Syslog HOSTNAME Format menu, select ipv4-address or ipv6-address, and click OK.
    
3.  Select Device → Server Profiles → Syslog, and click Add.
    
4.  Enter a server profile Name and Location (Location refers to a virtual system, if the device is enabled for virtual systems).
    
5.  On the Servers tab of the Syslog Server Profiles window, click Add, and enter the following information for the Syslog server:
    
    -   Name
        
    -   Syslog Server (IP address)
        
    -   Transport, Port (default 514 for UDP)
        
    -   Facility (default LOG_USER)
        
    
6.  Select the Custom Log Format tab and click configure the log formats as follows:
    
    **Note:**
    
    To avoid the possible effects of line formatting, do not copy/paste the message formats directly into the PAN-OS web interface. Instead, paste into a text editor, remove any carriage return or line feed characters, and then copy and paste into the web interface.
    
    **Note:**
    
    From version 10.0 and later, the log format documented for log types (Traffic, Threat, and URL) exceeds the maximum supported 2048 characters in the Custom Log Format tab on the firewall and Panorama. Select the CEF keys and values to limit the number of characters to 2048, as per your requirements.
    
    | Log Type | Custom Format |
    | :-- | :-- |
    | Traffic | CEF:0|PANW|NGFW_CEF|$sender_sw_version|$subtype|$type|1| __firewall_type=firewall.traffic __timestamp=$start __tz=$high_res_timestamp log_type=$type subtype=$subtype log_time=$cef-formatted-receive_time time_generated=$cef-formatted-time_generated log_source_id=$serial log_source_name=$device_name sequence_no=$seqno source_ip=$src dest_ip=$dst source_port=$sport dest_port=$dport nat_source=$natsrc nat_dest=$natdst nat_source_port=$natsport nat_dest_port=$natdport protocol=$proto action=$action source_user=$srcuser dest_user=$dstuser xff_ip=$xff_ip app=$app app_category=$category_of_app app_sub_category=$subcategory_of_app rule_matched=$rule rule_matched_uuid=$rule_uuid severity=1 vsys=$vsys vsys_name=$vsys_name from_zone=$from to_zone=$to inbound_if=$inbound_if outbound_if=$outbound_if session_id=$sessionid source_device_category=$src_category source_device_profile=$src_profile source_device_model=$src_model source_device_vendor=$src_vendor source_device_osfamily=$src_osfamily source_device_osversion=$src_osversion source_device_mac=$src_mac dest_device_category=$dst_category dest_device_profile=$dst_profile dest_device_model=$dst_model dest_device_vendor=$dst_vendor dest_device_osfamily=$dst_osfamily dest_device_osversion=$dst_osversion dest_device_mac=$dst_mac bytes_sent=$bytes_sent bytes_received=$bytes_received packets_received=$pkts_received packets_sent=$pkts_sent total_time_elapsed=$elapsed session_end_reason=$session_end_reason url_category=$category |
    | Threat | CEF:0|PANW|NGFW_CEF|$sender_sw_version|$threatid|$type|$number-of-severity| __firewall_type=firewall.threat __timestamp=$cef-formatted-time_generated __tz=$high_res_timestamp log_type=$type subtype=$subtype log_time=$cef-formatted-receive_time time_generated=$cef-formatted-time_generated log_source_id=$serial log_source_name=$device_name sequence_no=$seqno source_ip=$src dest_ip=$dst source_port=$sport dest_port=$dport nat_source=$natsrc nat_dest=$natdst nat_source_port=$natsport nat_dest_port=$natdport protocol=$proto action=$action source_user=$srcuser dest_user=$dstuser xff=$xff xff_ip=$xff_ip app=$app app_category=$category_of_app app_sub_category=$subcategory_of_app rule_matched=$rule rule_matched_uuid=$rule_uuid severity=$number-of-severity vsys=$vsys vsys_name=$vsys_name from_zone=$from to_zone=$to inbound_if=$inbound_if outbound_if=$outbound_if session_id=$sessionid source_device_category=$src_category source_device_profile=$src_profile source_device_model=$src_model source_device_vendor=$src_vendor source_device_osfamily=$src_osfamily source_device_osversion=$src_osversion source_device_mac=$src_mac dest_device_category=$dst_category dest_device_profile=$dst_profile dest_device_model=$dst_model dest_device_vendor=$dst_vendor dest_device_osfamily=$dst_osfamily dest_device_osversion=$dst_osversion dest_device_mac=$dst_mac misc=$misc threat_id=$threatid threat_name=$threat_name threat_category=$thr_category direction=$direction user_agent=$user_agent |
    | URL | CEF:0|PANW|NGFW_CEF|$sender_sw_version|$subtype|$type|$number-of-severity| __firewall_type=firewall.url __timestamp=$cef-formatted-time_generated __tz=$high_res_timestamp log_type=$type subtype=$subtype log_time=$cef-formatted-receive_time time_generated=$cef-formatted-time_generated log_source_id=$serial log_source_name=$device_name sequence_no=$seqno source_ip=$src dest_ip=$dst source_port=$sport dest_port=$dport nat_source=$natsrc nat_dest=$natdst nat_source_port=$natsport nat_dest_port=$natdport protocol=$proto action=$action source_user=$srcuser dest_user=$dstuser xff=$xff xff_ip=$xff_ip app=$app app_category=$category_of_app app_sub_category=$subcategory_of_app rule_matched=$rule rule_matched_uuid=$rule_uuid severity=$number-of-severity vsys=$vsys vsys_name=$vsys_name from_zone=$from to_zone=$to inbound_if=$inbound_if outbound_if=$outbound_if session_id=$sessionid source_device_category=$src_category source_device_profile=$src_profile source_device_model=$src_model source_device_vendor=$src_vendor source_device_osfamily=$src_osfamily source_device_osversion=$src_osversion source_device_mac=$src_mac dest_device_category=$dst_category dest_device_profile=$dst_profile dest_device_model=$dst_model dest_device_vendor=$dst_vendor dest_device_osfamily=$dst_osfamily dest_device_osversion=$dst_osversion dest_device_mac=$dst_mac uri=$misc threat_id=$threatid threat_name=$threat_name threat_category=$thr_category direction=$direction user_agent=$user_agent url_category=$category url_category_list=$url_category_list content_type=$contenttype http_method=$http_method http_headers=$http_headers http2_connection=$http2_connection referer=$referer pcap_id=$pcap_id |
    | File Data | CEF:0|PANW|NGFW_CEF|$sender_sw_version|$threatid|$type|$number-of-severity| __firewall_type=firewall.filedata __timestamp=$cef-formatted-time_generated __tz=$high_res_timestamp log_type=$type subtype=$subtype log_time=$cef-formatted-receive_time time_generated=$cef-formatted-time_generated log_source_id=$serial log_source_name=$device_name sequence_no=$seqno source_ip=$src dest_ip=$dst source_port=$sport dest_port=$dport nat_source=$natsrc nat_dest=$natdst nat_source_port=$natsport nat_dest_port=$natdport protocol=$proto action=$action source_user=$srcuser dest_user=$dstuser xff=$xff xff_ip=$xff_ip app=$app app_category=$category_of_app app_sub_category=$subcategory_of_app rule_matched=$rule rule_matched_uuid=$rule_uuid severity=$number-of-severity vsys=$vsys vsys_name=$vsys_name from_zone=$from to_zone=$to inbound_if=$inbound_if outbound_if=$outbound_if session_id=$sessionid source_device_category=$src_category source_device_profile=$src_profile source_device_model=$src_model source_device_vendor=$src_vendor source_device_osfamily=$src_osfamily source_device_osversion=$src_osversion source_device_mac=$src_mac dest_device_category=$dst_category dest_device_profile=$dst_profile dest_device_model=$dst_model dest_device_vendor=$dst_vendor dest_device_osfamily=$dst_osfamily dest_device_osversion=$dst_osversion dest_device_mac=$dst_mac misc=$misc threat_id=$threatid threat_name=$threat_name threat_category=$thr_category direction=$direction user_agent=$user_agent file_url=$file_url filedigest=$filedigest filetype=$filetype pcap_id=$pcap_id |
    
7.  Configure Escaping characters as follows:
    
    -   Escaped Characters: \\=
        
    -   Escape Character: \\
        
    
    
    

Configure Syslog collection

Set up a Syslog collector for the logs, as explained in Activate Syslog Collector. In Task 4, ensure that you set Format to CEF.

##### PingFederate

Learn more about collecting PingFederate authentication logs using a Syslog Collector applet in Cortex Cloud.

You can configure collecting PingFederate authentication logs using a Broker VM Syslog Collector applet:

| PingFederate vendor | Description |
| --- | --- |
| Syslog Collector applet overview | Forward authentication logs from PingFederate to Cortex Cloud using the Broker VM Syslog Collector applet in a CEF format. |
| Link to Syslog Collector applet instructions | Ingest authentication logs from PingFederate |

###### Ingest authentication logs from PingFederate

Ingest authentication logs and data from PingFederate for use in Cortex Cloud authentication stories.

**Notice:**

Requires the Data Collection add-on.

To receive authentication logs from PingFederate, you must first write Audit and Provisioner Audit Logs to CEF in PingFederate and then set up a Syslog Collector in Cortex Cloud to receive the logs. After you set up log collection, Cortex Cloud immediately begins receiving new authentication logs from the source. Cortex Cloud creates a dataset named `ping_identity_pingfederate_raw`. Logs from PingFederate are searchable in Cortex Query Language (XQL) queries using the dataset and surfaced, when relevant, in authentication stories.

1.  Activate the Syslog Collector.
    
2.  Set up PingFederate to write logs in CEF.
    
    To set up the integration, you must have an account for the PingFederate management dashboard and access to create a subscription for SSO logs.
    
    In your PingFederate deployment, [write audit logs in CEF](https://docs.pingidentity.com/bundle/pingfederate-102/page/obk1564002980895.html). During this set up you will need the IP address and port you configured in the Syslog Collector.
    
3.  To search for specific authentication logs or data, you can Create an Authentication Query or use the XQL Search.

##### Zscaler Internet Access

Learn more about collecting Zscaler Internet Access logs using a Syslog Collector applet and content pack integrations in Cortex Cloud.

You can configure collecting Zscaler Internet Access logs using a Broker VM Syslog Collector applet or with a content pack integration:

| Zscaler Internet Access vendor | Description |
| --- | --- |
| Syslog Collector applet overview | Forward firewall and network logs to Cortex Cloud from Zscaler Internet Access using the Broker VM Syslog Collector applet in a CEF format. |
| Link to Syslog Collector applet instructions | Ingest logs from Zscaler Internet Access |
| Links to content pack/integration details | The [Zscaler Internet Access](https://cortex.marketplace.pan.dev/marketplace/details/Zscaler) content pack provides Cloud security features, including managing URL and IP address policies, managing categories, sandbox reporting, and ingestion and normalization of Zscaler Internet Access (ZIA) logs into Cortex Cloud via both VM-based NSS Feed and Cloud NSS Feed methods. It contains the **`Zscaler Internet Access Modeling Rule`**, the **`Zscaler ZIA Parsing Rule`**, and the Block Domain - Zscaler playbook. It also includes the following integration: [Zscaler Internet Access](https://xsoar.pan.dev/docs/reference/integrations/zscaler): Use this integration to manage URL and IP address allow lists and block lists, manage and update categories, retrieve Sandbox reports, and manage IP destination groups within a Zscaler session. It includes commands for blacklisting and unblacklisting URLs and IPs, managing categories (adding/removing URLs and IPs), retrieving categories, listing, creating, editing, and deleting IP destination groups, manually logging in and logging out, and activating configuration changes in Zscaler. |

###### Ingest logs from Zscaler Internet Access

Extend Cortex Cloud visibility into logs from Zscaler Internet Access (ZIA).

**Notice:**

Requires the Data Collection add-on.

If you use Zscaler Internet Access (ZIA) in your network, you can forward your firewall and network logs to Cortex Cloud for analysis. This enables you to take advantage of Cortex Cloud anomalous behavior detection and investigation capabilities. Cortex Cloud can use the firewall and network logs from ZIA as the sole data source, and can also use these firewall and network logs from ZIA in conjunction with Palo Alto Networks firewall and network logs. For additional endpoint context, you can also use Cortex Cloud to collect and alert on endpoint data.

To integrate your logs, you first need to set up an applet in a broker VM within your network to act as a Syslog Collector. You then configure forwarding on your log devices to send logs to the Syslog collector in a CEF format. To provide seamless log ingestion, Cortex Cloud automatically maps the fields in your traffic logs to the Cortex Cloud log format.

When Cortex Cloud starts to receive logs, the app performs these actions.

-   Begins stitching network connection and firewall logs with other logs to form network stories. Cortex Cloud can also analyze your logs to generate Analytics issues and can apply IOC, BIOC, and Correlation Rule matching. You can also use queries to search your network connection logs.
    
-   Creates a Zscaler Cortex Query Language (XQL) dataset, which enables you to search the logs using XQL Search. The Zscaler XQL datasets are dependent on the ZIA NSS Feed that you've configured for the types of logs you want to collect.
    
    -   Firewall logs: `zscaler_nssfwlog_raw`
        
    -   Web logs: `zscalar_nssweblog_raw`
        
    

To ingest logs from Zscaler Internet Access (ZIA):

1.  Activate the Syslog Collector.
    
2.  Increase log storage for ZIA logs. For more information, see Manage Your Log Storage.
    
3.  Configure NSS log forwarding in Zscaler Internet Access to the Syslog Collector in a CEF format.
    
    1.  In the Zscaler Internet Access application, select Administration → Nanolog Streaming Service.
        
    2.  In the NSS Feeds tab, Add NSS Feed.
        
    3.  In the Add NSS Feed screen, configure the fields for the Cortex Cloud Syslog Collector.
        
        The steps below differ depending on the type of NSS Feed you are configuring to collect either firewall logs or web logs. For more information on all the configurations available on the screen, see the ZIA documentation:
        
        -   Firewall logs: See [Adding NSS Feeds for Firewall Logs](https://help.zscaler.com/zia/adding-nss-feeds-firewall-logs).
            
        -   Web logs: See [Adding NSS Feeds for Web Logs](https://help.zscaler.com/zia/adding-nss-feeds-web-logs).
            
        
        The following image displays the fields required to add an NSS feed.
        
        
        
        -   NSS Type: Select either NSS for Web (default) to collect web logs or NSS for Firewall to collect firewall logs.
            
        -   SIEM TCP Port: Specify the port that you set when activating the Syslog Collector in Cortex Cloud. See Activate the Syslog Collector.
            
        -   SIEM IP Address: Specify the IP that you set when activating the Syslog Collector in Cortex Cloud. See Activate the Syslog Collector.
            
        -   Feed Escape Character: Specify the feed escape character as `=`.
            
        -   Feed Output Type: Select Custom.
            
        -   Feed Output Format: Specify the output format, which is dependent on the type of logs you are collecting as defined in the NSS Type field:
            
            | Log type | Feed output format |
            | --- | --- |
            | Firewall logs | `%s{mon} %02d{dd} %02d{hh}:%02d{mm}:%02d{ss} zscaler-nss-fw CEF:0|Zscaler|NSSFWlog|5.7|%s{action}|%s{rulelabel}|3|act=%s{action} suser=%s{login} src=%s{csip} spt=%d{csport} dst=%s{cdip} dpt=%d{cdport} deviceTranslatedAddress=%s{ssip} deviceTranslatedPort=%d{ssport} destinationTranslatedAddress=%s{sdip} destinationTranslatedPort=%d{sdport} sourceTranslatedAddress=%s{tsip} sourceTranslatedPort=%d{tsport} proto=%s{ipproto} tunnelType=%s{ttype} dnat=%s{dnat} stateful=%s{stateful} spriv=%s{location} reason=%s{rulelabel} in=%ld{inbytes} out=%ld{outbytes} rt=%s{mon} %02d{dd} %02d{hh}:%02d{mm}:%02d{ss} deviceDirection=1 cs1=%s{dept} cs1Label=dept cs2=%s{nwsvc} cs2Label=nwService cs3=%s{nwapp} cs3Label=nwApp cs4=%s{aggregate} cs4Label=aggregated cs6=%s{threatname} cs6label=threatname cn1=%d{durationms} cn1Label=durationms cn2=%d{numsessions} cn2Label=numsessions cs5Label=ipCat cs5=%s{ipcat} cat=%s{threatcat} destCountry=%s{destcountry} avgduration=%d{avgduration}` |
            | Web logs | `%s{mon} %02d{dd} %02d{hh}:%02d{mm}:%02d{ss} zscaler-nss CEF:0|Zscaler|NSSWeblog|5.0|%s{action}|%s{reason}|3|act=%s{action} app=%s{proto} cat=%s{urlcat} dhost=%s{ehost} dst=%s{sip} src=%s{cip} in=%d{respsize} outcome=%s{respcode} out=%d{reqsize} request=%s{eurl} rt=%s{mon} %02d{dd} %d{yy} %02d{hh}:%02d{mm}:%02d{ss} sourceTranslatedAddress=%s{cintip} requestClientApplication=%s{ua} requestMethod=%s{reqmethod} suser=%s{login} spriv=%s{location} externalId=%d{recordid} fileType=%s{filetype} reason=%s{reason} destinationServiceName=%s{appname} cn1=%d{riskscore} cn1Label=riskscore cs1=%s{dept} cs1Label=dept cs2=%s{urlsupercat} cs2Label=urlsupercat cs3=%s{appclass} cs3Label=appclass cs4=%s{malwarecat} cs4Label=malwarecat cs5=%s{threatname} cs5Label=threatname cs6=%s{dlpeng} cs6Label=dlpeng ZscalerNSSWeblogURLClass=%s{urlclass} ZscalerNSSWeblogDLPDictionaries=%s{dlpdict} requestContext=%s{ereferer} contenttype=%s{contenttype} unscannabletype=%s{unscannabletype} deviceowner=%s{deviceowner} devicehostname=%s{devicehostname}\n` |
            
        
    4.  Click Save.
        
    5.  Click Save and activate the change according to the [Zscaler Internet Access (ZIA) documentation](https://help.zscaler.com/zia/saving-and-activating-changes-admin-portal).

##### Zscaler Private Access

Learn more about collecting Zscaler Private Access logs using a Syslog Collector applet and content pack integration in Cortex Cloud.

You can configure collecting Zscaler Private Access logs using a Broker VM Syslog Collector applet or with a content pack integration:

| Zscaler Private Access vendor | Description |
| --- | --- |
| Syslog Collector applet overview | If you use Zscaler Private Access (ZPA) in your network as an alternative to VPNs, you can forward your network logs to Cortex Cloud from Zscaler Private Access using the Broker VM Syslog Collector applet in a LEEF format. |
| Link to Syslog Collector applet instructions | Ingest logs from Zscaler Private Access |
| Link to content pack/integration instructions | The [ZscalerZPA](https://cortex.marketplace.pan.dev/marketplace/details/ZscalerZPA) content pack provides data modeling capabilities for event logs ingested from the Zscaler Private Access (ZPA) service, which enables secure access to internal applications and services. It includes the **`Zscaler Private Access Modeling Rule`**. Event collection relies on configuring the generic Syslog Collector on the Broker VM. |

###### Ingest logs from Zscaler Private Access

Extend Cortex Cloud visibility into logs from Zscaler Private Access (ZPA).

**Notice:**

Requires the Data Collection add-on.

If you use Zscaler Private Access (ZPA) in your network as an alternative to VPNs, you can forward your network logs to Cortex Cloud for analysis. This enables you to take advantage of Cortex Cloud anomalous behavior detection and investigation capabilities. Cortex Cloud can use the network logs from ZPA as the sole data source, and can also use these network logs from ZPA in conjunction with Palo Alto Networks network logs.

When Cortex Cloud starts to receive logs, the following actions are performed:

-   Stitching network connection logs with other logs to form network stories. Cortex Cloud can also analyze your logs to apply IOC, BIOC, and Correlation Rules matching. You can also use queries to search your network connection logs.
    
-   Creates a Zscaler Cortex Query Language (XQL) dataset (`zscaler_zpa_raw`), which enables you to search the logs using XQL Search.
    

To integrate your logs, you first need to set up an applet in a Broker VM within your network to act as a Syslog Collector. You then configure forwarding on your log devices to send logs to the Syslog collector in a LEEF format. To provide seamless log ingestion, Cortex Cloud automatically maps the fields in your traffic logs to the Cortex Cloud log format.

**Prerequisite Step**

Before you can add a log receiver in Zscaler Private Access, as explained in the task below, you must first deploy your App Connectors. For more information, see [App Connector Deployment Guides for Supported Platforms](https://help.zscaler.com/zpa/app-connector-management/app-connector-deployment-guides-supported-platforms).

To ingest logs from Zscaler Private Access (ZPA):

1.  Activate the Syslog Collector.
    
2.  Increase log storage for ZPA logs. For more information, see Manage Your Log Storage.
    
3.  Configure ZPA log forwarding in Zscaler Private Access to the Syslog Collector in a LEEF format.
    
    1.  In the Zscaler Private Access application, select Administration → Log Receivers.
        
    2.  Click Add Log Receiver.
        
        **Note:**
        
        For more information on configuring the parameters on the screen, see the Zscaler Private Access (ZPA) documentation for [Configuring a Log Receiver](https://help.zscaler.com/zpa/configuring-log-receiver).
        
    3.  In the Add Log Receiver window, configure the following fields on the Log Receiver tab:
        
        -   Name: Specify a name for the log receiver. The name cannot contain special characters, with the exception of periods (.), hyphens (-), and underscores ( _ ).
            
        -   Description: (Optional) Specify a log receiver description.
            
        -   Domain or IP Address: Specify the fully qualified domain name (FQDN) or IP address for the log receiver that you set when activating the Syslog Collector in Cortex Cloud. See Activate Syslog Collector.
            
        -   TCP Port: Specify the TCP port number used by the log receiver that you set when activating the Syslog Collector in Cortex Cloud. See Activate Syslog Collector.
            
        -   TLS Encryption: Toggle to Enabled to encrypt traffic between the log receiver and your Syslog Collector in Cortex Cloudusing mutually authenticated TLS communication. To use this setting, the log receiver must support TLS communication. For more information, see [About the Log Streaming Service](https://help.zscaler.com/zpa/about-log-streaming-service#tlsencryption).
            
        -   App Connector Groups: (Optional) Select the App Connector groups that can forward logs to the receiver, and click Done. You can search for a specific group, click Select All to apply all groups, or click Clear Selection to remove all selections.
            
        
    4.  Click Next.
        
    5.  Configure the following fields in the Log Stream tab:
        
        -   Log Type: Select the log type you want to collect, where only the following logs types are currently supported to collect with your Syslog Collector in Cortex Cloud:
            
            **Note:**
            
            You can only configure a ZPA log receiver to collect one type of log with your Syslog Collector in Cortex Cloud. To configure more that one log type, you'll need to add another log receiver.
            
            -   User Activity: Information on end user requests to applications. For more information, see [User Activity Log Fields](https://help.zscaler.com/zpa/about-user-activity-log-fields).
                
            -   User Status: Information related to an end user's availability and connection to ZPA. For more information, see [User Status Log Fields](https://help.zscaler.com/zpa/about-user-status-log-fields).
                
            -   App Connector Status: Information related to an App Connector's availability and connection to ZPA. For more information, see [About App Connector Status Log Fields](https://help.zscaler.com/zpa/about-connector-status-log-fields).
                
            -   Audit Logs: Session information for all admins accessing the ZPA Admin Portal. For more information, See [About Audit Log Fields](https://help.zscaler.com/zpa/about-audit-log-fields) and [About Audit Logs](https://help.zscaler.com/zpa/about-audit-logs).
                
            
        -   Log Template: Select a Custom template.
            
        -   Log Stream Content: Create the log template that you require, according to the Log Type you've selected, using the Zscaler documentation mentioned in previous steps as a reference.
            
            If you copy and modify the following examples in the table below, validate your log template using an editor, ensuring that there are no additional spaces or line breaks, and then copy and paste it into the Log Stream Content field.
            
            | Log type | Log template |
            | --- | --- |
            | User activity | LEEF:1.0|Zscaler|ZPA|4.1|%s{ConnectionStatus}%s{InternalReason}|cat=ZPA User Activity\\tdevTime=%s{LogTimestamp:epoch}\\tCustomer=%s{Customer}\\tSessionID=%s {SessionID}\\tConnectionID=%s{ConnectionID}\\tInternalReason=%s{InternalReason} \\tConnectionStatus=%s{ConnectionStatus}\\tproto=%d{IPProtocol} \\tDoubleEncryption=%d{DoubleEncryption}\\tusrName=%s{Username} \\tdstPort=%d{ServicePort}\\tsrc=%s{ClientPublicIP}\\tsrcPreNAT=%s{ClientPrivateIP} \\tClientLatitude=%f{ClientLatitude}\\tClientLongitude=%f{ClientLongitude} \\tClientCountryCode=%s{ClientCountryCode}\\tClientZEN=%s{ClientZEN} \\tpolicy=%s{Policy}\\tConnector=%s{Connector}\\tConnectorZEN=%s{ConnectorZEN} \\tConnectorIP=%s{ConnectorIP}\\tConnectorPort=%d{ConnectorPort} \\tApplicationName=%s{Host}\\tApplicationSegment=%s{Application}\\tAppGroup=%s{AppGroup} \\tServer=%s{Server}\\tdst=%s{ServerIP}\\tServerPort=%d{ServerPort} \\tPolicyProcessingTime=%d{PolicyProcessingTime}\\tServerSetupTime=%d{ServerSetupTime} \\tTimestampConnectionStart:iso8601=%s{TimestampConnectionStart:iso8601} \\tTimestampConnectionEnd:iso8601=%s{TimestampConnectionEnd:iso8601} \\tTimestampCATx:iso8601=%s{TimestampCATx:iso8601} \\tTimestampCARx:iso8601=%s{TimestampCARx:iso8601} \\tTimestampAppLearnStart:iso8601=%s{TimestampAppLearnStart:iso8601} \\tTimestampZENFirstRxClient:iso8601=%s{TimestampZENFirstRxClient:iso8601} \\tTimestampZENFirstTxClient:iso8601=%s{TimestampZENFirstTxClient:iso8601} \\tTimestampZENLastRxClient:iso8601=%s{TimestampZENLastRxClient:iso8601} \\tTimestampZENLastTxClient:iso8601=%s{TimestampZENLastTxClient:iso8601} \\tTimestampConnectorZENSetupComplete:iso8601=%s{TimestampConnectorZENSetupComplete:iso8601} \\tTimestampZENFirstRxConnector:iso8601=%s{TimestampZENFirstRxConnector:iso8601} \\tTimestampZENFirstTxConnector:iso8601=%s{TimestampZENFirstTxConnector:iso8601} \\tTimestampZENLastRxConnector:iso8601=%s{TimestampZENLastRxConnector:iso8601} \\tTimestampZENLastTxConnector:iso8601=%s{TimestampZENLastTxConnector:iso8601} \\tZENTotalBytesRxClient=%d{ZENTotalBytesRxClient}\\tZENBytesRxClient=%d{ZENBytesRxClient} \\tZENTotalBytesTxClient=%d{ZENTotalBytesTxClient}\\tZENBytesTxClient=%d{ZENBytesTxClient} \\tZENTotalBytesRxConnector=%d{ZENTotalBytesRxConnector} \\tZENBytesRxConnector=%d{ZENBytesRxConnector} \\tZENTotalBytesTxConnector=%d{ZENTotalBytesTxConnector} \\tZENBytesTxConnector=%d{ZENBytesTxConnector}\\tIdp=%s{Idp}\\n |
            | User status | LEEF:1.0|Zscaler|ZPA|4.1|%s{SessionStatus}|cat=ZPA User Status \\tdevTime=%s{LogTimestamp:epoch}\\tCustomer=%s{Customer} \\tusrName=%s{Username}\\tSessionID=%s{SessionID}\\tSessionStatus=%s{SessionStatus} \\tVersion=%s{Version}\\tZEN=%s{ZEN}\\tCertificateCN=%s{CertificateCN} \\tsrcPreNAT=%s{PrivateIP}\\tsrc=%s{PublicIP}\\tLatitude=%f{Latitude} \\tLongitude=%f{Longitude}\\tCountryCode=%s{CountryCode} \\tTimestampAuthentication:iso8601=%s{TimestampAuthentication:iso8601} \\tTimestampUnAuthentication:iso8601=%s{TimestampUnAuthentication:iso8601} \\tdstBytes=%d{TotalBytesRx}\\tsrcBytes=%d{TotalBytesTx}\\tIdp=%s{Idp} \\tidentHostName=%s{Hostname}\\tPlatform=%s{Platform}\\tClientType=%s{ClientType} \\tTrustedNetworks=%s(,){TrustedNetworks}\\tTrustedNetworksNames=%s(,){TrustedNetworksNames} \\tSAMLAttributes=%s{SAMLAttributes}\\tPosturesHit=%s(,){PosturesHit} \\tPosturesMiss=%s(,){PosturesMiss}\\tZENLatitude=%f{ZENLatitude} \\tZENLongitude=%f{ZENLongitude}\\tZENCountryCode=%s{ZENCountryCode}\\n |
            | App connector status | LEEF:1.0|Zscaler|ZPA|4.1|%s{SessionStatus}|cat=Connector Status \\tdevTime=%s{LogTimestamp:epoch}\\tCustomer=%s{Customer}\\tSessionID=%s{SessionID} \\tSessionType=%s{SessionType}\\tVersion=%s{Version}\\tPlatform=%s{Platform} \\tZEN=%s{ZEN}\\tConnector=%s{Connector}\\tConnectorGroup=%s{ConnectorGroup} \\tsrcPreNAT=%s{PrivateIP}\\tsrc=%s{PublicIP}\\tLatitude=%f{Latitude} \\tLongitude=%f{Longitude}\\tCountryCode=%s{CountryCode} \\tTimestampAuthentication:iso8601=%s{TimestampAuthentication:iso8601} \\tTimestampUnAuthentication:iso8601=%s{TimestampUnAuthentication:iso8601} \\tCPUUtilization=%d{CPUUtilization}\\tMemUtilization=%d{MemUtilization} \\tServiceCount=%d{ServiceCount}\\tInterfaceDefRoute=%s{InterfaceDefRoute} \\tDefRouteGW=%s{DefRouteGW}\\tPrimaryDNSResolver=%s{PrimaryDNSResolver} \\tHostStartTime=%s{HostStartTime}\\tConnectorStartTime=%s{ConnectorStartTime} \\tNumOfInterfaces=%d{NumOfInterfaces}\\tBytesRxInterface=%d{BytesRxInterface} \\tPacketsRxInterface=%d{PacketsRxInterface}\\tErrorsRxInterface=%d{ErrorsRxInterface} \\tDiscardsRxInterface=%d{DiscardsRxInterface}\\tBytesTxInterface=%d{BytesTxInterface} \\tPacketsTxInterface=%d{PacketsTxInterface}\\tErrorsTxInterface=%d{ErrorsTxInterface} \\tDiscardsTxInterface=%d{DiscardsTxInterface}\\tTotalBytesRx=%d{TotalBytesRx} \\tTotalBytesTx=%d{TotalBytesTx}\\n |
            | Audit logs | LEEF:1.0|Zscaler|ZPA|4.1|%s{auditOperationType}|cat=ZPA_Audit_Log\\t devTime=%s{modifiedTime:epoch}\\t creationTime=%s{creationTime:iso8601}\\t requestId=%s{requestId}\\t sessionId=%s{sessionId}\\t auditOldValue=%s{auditOldValue}\\t auditNewValue=%s{auditNewValue}\\t auditOperationType=%s{auditOperationType}\\t objectType=%s{objectType}\\t objectName=%s{objectName}\\t objectId=%d{objectId}\\t accountName=%d{customerId}\\t usrName=%s{modifiedByUser}\\n |
            
        -   (Optional) You can define a streaming Policy for the log receiver. This entails configuring the SAML Attributes, Application Segments, Segment Groups, Client Types, and Session Statuses. For more information on configuring these settings, see the [Log Stream instructions](https://help.zscaler.com/zpa/configuring-log-receiver#Step2).
            
        
    6.  Click Next.
        
    7.  In the Review tab, verify your log receiver configuration.
        
    8.  Click Save.

#### Activate Transporter

Activate a Broker VM with a Transporter applet.

The Transporter over Broker VM enables secure communication between your self-hosted Version Control Systems (VCS) and Cortex Cloud. This solution addresses the need for secure code scanning without exposing your internal network to the cloud.

**Prerequisites:**

-   Permissions: To configure and manage Transporter applet settings, you must have permissions to manage Broker Service configurations (such as an Instance Administrator)
    
-   Set up and configure Broker VMSet up and configure Broker VM
    
-   Confirm that your Broker is v 28 or above
    
-   Whitelist IP addresses to enable access to Cortex Cloud resources. The IP addresses for the Transporter are in the Broker VM Resources section of the Enable access to required PANW resources document
    
-   Open port `4052`, which is required for the Transporter's IP address communication
    
-   Open Port `443` (outbound), which is required for the Broker VM to pull data from your version control system (VCS)
    

##### License

To gain access to and use the Transporter applet, you must possess one of these license types: Cloud Posture Security or Runtime Management) or XSIAM Premium. If you plan to use the Transporter for Code Security scanning, you will also need the Code Security add-on license.

**Warning:**

The Transporter applet is not supported for FedRAMP customers.

##### How to activate the Transporter applet

1.  Select Settings → Configurations → Broker VMs (under Data Broker.
    
2.  Select the Brokers tab → locate your Broker VM → hover and click + Add under the Apps column → AppSec Transporter.
    
3.  Configure the Transporter connection in the provided fields:
    
    -   Transporter Name (required). Requires a unique name as you can integrate multiple applets for different integrations
        
    -   Provider Self Signed CA Certificate Path: Specify the file path for a custom Certificate Authority (CA) certificate used by the Transporter to securely communicate with services
        
    
4.  Click Save.
    
5.  Verify connectivity: Navigate to the Apps column and verify that your AppSec Transporter applet has been added and displays a connected status.
    
6.  **Next step**: After activating the Transporter, proceed to configure the Transporter applet on your self-managed VCS data source instance.
    
    For more information, refer to Set up a Transporter on your VCS.
    

##### Manage Transporter applets

To manage Transporter applet configurations, disable connections, or deactivate an applet, navigate to the Broker VMs page. From there, select your Appsec Transporter under the App column.

-   **Edit applet configurations**: Select the Appsec Transporter under the App column → Configure. You are redirected to the Transporter applet settings to manage its configurations
    
-   **Disable applet connection for a single integration**:
    
    1.  Select the Appsec Transporter under the App column → Configure.
        
    2.  On the Transporter applet configurations page, click on the specific Transporter applet → Disable.
        
        This disables the specific integration, but it can be re-enabled.
        
    
-   **Deactivate an applet** (all connections): Select the Appsec Transporter under the App column → Deactivate → Confirm when prompted
    
    All existing connections are deleted but their configurations are saved in the database. When adding a new connection, you'll be prompted if you want to reuse previous configurations.

#### Activate Windows Event Collector

Set up your Windows Event Collector to connect with the Cortex Cloud Broker VM and collect events.

**Notice:**

Requires the Data Collection add-on.

After you have configured and registered your Broker VM, activate your Windows Event Collector application.

The Windows Event Collector (WEC) runs on the Broker VM collecting event logs from Windows Servers, including Domain Controllers (DCs). The Windows Event Collector can be deployed in multiple setups, and can be connected directly to multiple event generators (DCs or Windows Servers) or routed using one or more Windows Event Collectors. Behind each Windows event collector there may be multiple generating sources.

To enable the collection of the event logs, you need to configure and establish trust between the Windows Event Forwarding (WEF) collectors and the WEC. Establishing trust between the WEFs and the WEC is achieved by mutual authentication over TLS using server and client certificates. The WEF, a WinRM plugin, runs under the Network Service account. Therefore, you need to provide the WEFs with the relevant certificates and grant the account access permissions to the private key used for client authentication, for example, authenticate with WEC.

**Note:**

You can also activate the Windows Event Collector on Windows Core. For more information, see Activate Windows Event Collector on Windows Core.

**Prerequisite:**

-   Set up and configure Broker VM
    
-   Broker VM version 8.0 and later
    
-   You have knowledge of Windows Active Directory and Domain Controllers.
    
-   You must configure different settings related to the FQDN where the instructions differ depending on whether you are configuring a standalone Broker VM or High Availability (HA) cluster.
    
    Standalone broker
    
    A FQDN must be configured for the standalone broker as configured in your local DNS server. Therefore, the Broker VM is registered in the DNS, its FQDN is resolvable from the events forwarder (Windows server), and the Broker VM FQDN is configured. For more information, see Configure High Availability Cluster.
    
    HA cluster
    
    A FQDN must be configured in the cluster settings as configured in your local DNS server, which points to a Load Balancer. For more information, see Configure High Availability Cluster.
    
-   Windows Server 2012 r2 or later.
    

After ingestion, Cortex Cloud normalizes and saves the Windows event logs in the dataset `xdr_data`. The normalized logs are also saved in a unified format in `microsoft_windows_raw`. This enables you to search the data using Cortex Query Language (XQL) queries, build correlation rules, and generate dashboards based on the data.

Perform the following procedures in the order listed below.

##### Task 1. Add, configure, and activate a Windows Event Collector

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  Do one of the following:
    
    -   On the Brokers tab, find the Broker VM, and in the APPS column, left-click Add → Windows Event Collector.
        
    -   On the Clusters tab, find the Broker VM, and in the APPS column, left-click Add → Windows Event Collector.
        
    
3.  In the Activate Windows Event Collector window, define the Collected Events to configure the events collected by the applet. This lists event sources from which you want to collect events.
    
    | Field | Description |
    | --- | --- |
    | Source | Select from the pre-populated list with the most common event sources on Windows Servers. The event source is the name of the software that logs the events. A source provider can only appear once in your list. When selecting event sources, depending on the type event you want to forward, ensure the event source is enabled, for example [auditing security events](https://docs.microsoft.com/en-us/defender-for-identity/configure-windows-event-collection). If the source is not enabled, the source configuration in the given row will fail. |
    | Min. Event Level | Minimum severity level of events that are collected. |
    | Event IDs Group | Whether to Include, Exclude, or collect All event ID groups. |
    | Minimal TLS Version | Select either 1.0 or 1.2 (default) as the minimum TLS version allowed. Ensure that you verify that all Windows event forwarders are supporting the minimal defined TLS version. |
    
    Example 132. 
    
    To forward all the Windows Event Collector events to the Broker VM, define as follows:
    
    -   Source: **`ForwardedEvents`**
        
    -   Min. Event Level: **`Verbose`**
        
    -   Event IDs Group: **`All`**
        
    
      
    
    **Note:**
    
    By default, Cortex Cloud collects Palo Alto Networks predefined Security events that are used by the Cortex Cloud detectors. Removing the Security collector interferes with the Cortex Cloud detection functionality. Restore to Default to reinstate the Security event collection.
    
4.  Click Activate. After a successful activation, the APPS field displays WEC with a green dot indicating a successful connection.
    

##### Task 2. Configure the Windows Event Collector settings

1.  In the APPS column, left-click the WEC connection to display the Windows Event Collector settings, and select Configure.
    
2.  In the Windows Event Forwarder Configuration window, perform the following tasks:
    
    1.  In the Subscription Manager URL field, click  (copy) . This will be used when you configure the subscription manager in the GPO (Global Policy Object) on your domain controller.
        
    2.  Enter a password in the Define Client Certificate Export Password field to be used to secure the downloaded WEF certificate that establishes the connection between your DC/WEF and the WEC. You will need this password when the certificate is imported to the events forwarder.
        
    3.  Download the WEF certificate in a PFX format to your local machine.
        
        To view your Windows Event Forwarding configuration details at any time, select your Broker VM, right-click and navigate to Windows Event Collector → Configure.
        
    
    Cortex Cloud monitors the certificate and triggers a Certificate Expiration notification 30 days prior to the expiration date. The notification is sent daily specifying the number of days left on the certificate, or if the certificate has already expired.
    

##### Task 3. Install your WEF Certificate on the WEF to establish connection

**Note:**

You must install the WEF certificate on every Windows Server, whether DC or not, for the WEFs that are supposed to forward logs to the Windows Event Collector applet on the Broker VM.

1.  Locate the PFX file you downloaded from the Cortex Cloud console and double-click to open the Certificate Import Wizard.
    
2.  In the Certificate Import Wizard:
    
    1.  Select Local Machine, and then click Next.
        
    2.  Verify the File name field displays the PFX certificate file you downloaded and click Next.
        
    3.  In the Passwords field, specify the Client Certificate Export Password you defined in the Cortex Cloud console followed by Next.
        
    4.  Select Automatically select the certificate store based on the type of certificate, and then click Next and Finish.
        
3.  From a command prompt, run `certlm.msc`.
    
4.  In the file explorer, navigate to Certificates and verify the following for each of the folders:
    
    -   In the Personal → Certificates folder, ensure the certificate `forwarder.wec.paloaltonetworks.com` is displayed.
        
    -   In the Trusted Root Certification Authorities → Certificates folder, ensure the CA `ca.wec.paloaltonetworks.com` is displayed.
        
    
5.  Navigate to Certificates → Personal → Certificates.
    
6.  Right-click the certificate and navigate to All tasks → Manage Private Keys.
    
7.  In the Permissions window, select Add and in the Enter the object name section, enter **`NETWORK SERVICE`**, and then click Check Names to verify the object name. The object name is displayed with an underline when valid. and then click OK.
    
    
    
8.  Click OK, verify the Group or user names that are displayed, and then click Apply Permissions for private keys.
    
    
    

###### Task 4. Add the Network Service account to the domain controller Event Log Readers group.

**Note:**

You must install the WEF certificate on every Windows Server, whether DC or not, for the WEFs that are supposed to forward logs to the Windows Event Collector applet on the Broker VM.

1.  To enable events forwarders to forward events, the Network Service account must be a member of the Active Directory Event Log Readers group. In PowerShell, execute the following command on the domain controller that is acting as the event forwarder:
    
    ```
    PS C:\\> net localgroup "Event Log Readers" "NT Authority\\Network Service" /add
    ```
    
    Make sure you see `The command completed successfully` message.
    
2.  Grant access to view the security event logs.
    
    The security event logs are provided by default and the instruction below explain how to to grant access to view these logs. You'll need to apply these instructions to any other event logs that you configure the WEC to access.
    
    1.  Run `wevtutil gl security` and take note of your `channelAccess` value.
        
        Example 133. 
        
        ```
        \`PS C:\\Users\\Administrator> wevtutil gl security
        name: security
        enabled: true
        type: Admin
        owningPublisher:
        isolation: Custom
        channelAccess: O:BAG:SYD:(A;;0xf0005;;;SY)(A;;0x5;;;BA)(A;;0x1;;;S-1-5-32-573)
        logging:
          logFileName: %SystemRoot%\\System32\\Winevt\\Logs\\security.evtx
          retention: false
          autoBackup: false
          maxSize: 134217728
        publishing:
          fileMax: 1
        ```
        
        Take note of value: `channelAccess: O:BAG:SYD:(A;;0xf0005;;;SY)(A;;0x5;;;BA)(A;;0x1;;;S-1-5-32-573)`
        
          
        
    2.  Run `wevtutil sl security "/ca:<channelAccess value>(A;;0x1;;;S-1-5-20)"`
        
        Example 134. 
        
        ```
        PS C:\\Users\\Administrator> wevtutil sl security "/ca:O:BAG:SYD:(A;;0xf0005;;;SY)(A;;0x5;;;BA)(A;;0x1;;;S-1-5-32-573)(A;;0x1;;;S-1-5-20)"
        ```
        
          
        
    
    Make sure you grant access on each of your domain controller hosts.
    

##### Task 5. Create a WEF Group Policy that applies to every Windows server you want to configure as a WEF

1.  In a command prompt, open `gpmc.msc`.
    
2.  In the Group Policy Management window, navigate to Domains → your domain name → Group Policy Object, right-click and select New.
    
3.  In the New GPO window, enter your group policy Name: as Windows Event Forwarding, and click OK.
    
4.  Navigate to Domains → your domain name → Group Policy Objects → Windows Event Forwarding, right-click and select Edit.
    
    
    
5.  In the Group Policy Management Editor:
    
    -   Set the Windows Remote Management Service for automatic startup.
        
        1.  Select Computer Configuration → Policies → Windows Settings → Security Settings → System Services, and in the view panel locate and double-click Windows Remote Management (WS-Management).
            
        2.  Mark the Define this policy setting checkbox, select Automatic, and then click Apply and OK.
            
        
    -   At a minimum for your WEC configuration, you must enable logging of the same events that you have configured to be collected in your WEC configuration on your domain controller. Otherwise, you will not be able to view these events as the WEC only controls querying not logging. For example, if you have configured authentication events to be collected by your WEC using an authentication protocol, such as Kerberos, you should ensure all relevant audit events for authentication are configured on your domain controller. In addition, you should ensure that all relevant audit events that you want collected, such as the success and failure of account logins for Windows Event ID 4625, are properly configured, particularly for those that you want Cortex Cloud to apply grouping and analytics inspection.
        
        **Note:**
        
        This step overrides any local policy settings.
        
        Example 135. 
        
        Here is an example of how to configure the WEC to collect authentication events using Kerberos as the authentication protocol to enable the collection of Broker VM supported Kerberos events, Kerberos pre-authentication, authentication, request, and renewal tickets.
        
        1.  Select Computer Configuration → Policies → Windows Settings → Security Settings → Advanced Audit Policy Configuration → Audit Policies → Account Logon.
            
        2.  In the view pane, right-click Audit Kerberos Authentication Service and select Properties. In the Audit Kerberos Authentication Service window, mark Configure the following audit events:, and click Success and Failure followed by Apply and OK.
            
            Repeat for Audit Kerberos Service Ticket Operations.
            
        
          
        
    
6.  Configure the subscription manager.
    
    Navigate to Computer Configuration → Policies → Administrative Templates: Policy definitions → Windows Components → Event Forwarding, right-click Configure target Subscription Manager and select Edit.
    
    
    
    In the Configure target Subscription Manager window, perform the following:
    
    1.  Mark Configure target Subscription Manager as Enabled.
        
    2.  In the Options section, select Show and in the Show Contents window, paste the Subscription Manage URL you copied from the Cortex Cloud console, and then click OK.
        
    3.  Click Apply and OK to save your changes.
        
7.  Add Network Service to Event Log Readers group.
    
    Select Computer Configuration → Preferences → Control Panel Settings → Local Users and Groups, right-click and select New → Local Group.
    
    
    
    In the New Local Group Properties window:
    
    1.  In the Group name field, select Event Log Readers (built-in).
        
    2.  In the Members section, click Add and enter in the Name filed **`Network Service`** followed by OK.
        
        **Note:**
        
        You must type out the name, do not select the name from the browse button.
        
    3.  Click Apply and OK to save your changes, and close the Group Policy Management Editor window.
        
8.  Configure the Windows Firewall.
    
    **Note:**
    
    If Windows Firewall is enabled on your event forwarders, you will have to define an outbound rule to enable the WEF to reach port 5986 on the WEC.
    
    In the Group Policy Management window, select Computer Configuration → Policies → Windows Settings → Security Settings → Windows Firewall with Advanced Security → Outbound Rules, right-click and select New Rule.
    
    In the New Outbound Rule Wizard define the following Steps:
    
    1.  Rule Type: Select Port followed by Next.
        
    2.  Protocols and Ports: Select TCP and in the Specific Remote Ports field enter **`5986`** followed by Next.
        
    3.  Action: Select Allow the connection followed by Next.
        
    4.  Profile: Select Domain and disable Private and Public followed by Next.
        
    5.  Name: Specify **`Windows Event Forwarding`**.
        
    6.  To save your changes, click Finish.
        

##### Task 6. Apply the WEF Group Policy

Link the policy to the OU or the group of Windows servers you would like to configure as event forwarders. In the following flow, the domain controllers are configured as an event forwarder.

1.  Select Group Policy Management → <your domain name> → Domain Controllers, right-click and select Link an existing GPO....
    
2.  In the Select GPO window, click Windows Event Forwarding followed by OK.
    
3.  In an administrative PowerShell console, execute the following commands:
    
    1.  ```
        PS C:\\Users\\Administrator> gpupdate /force
        ```
        
        Verify that the `Computer Policy update has completed successfully. User Policy update has completed successfully.` confirmation message is displayed.
        
    2.  ```
        PS C:\\Users\\Administrator> Restart-Service WinRM
        ```
        

##### Task 7. Verify Windows Event Forwarding

1.  In an administrative PowerShell console, run the following command:
    
    ```
    PS C:\\Users\\Administrator> Get-WinEvent Microsoft-windows-WinRM/operational -MaxEvents 10
    ```
    
2.  Look for `WSMan operation EventDelivery completed successfully` confirmation messages. These indicate events forwarded successfully.
    

##### Task 8. Manage the Window Event Collector (Optional)

After the Windows Event Collector has been activated in the Cortex Cloud Management Console, left-click the WEC connection in the APPS column to display the Windows Event Collector settings, and select:

-   Configure to define the event configuration information.
    
-   Collection Configuration to view or edit existing or add new events to collect.
    
-   Deactivate to disable the Windows Event Collector.
    

##### Task 9. View Windows Event Collector metrics (Optional)

To view metrics about the Windows Event Collector, left-click the WEC connection in the APPS field for your Broker VM, and you'll see the following metrics:

-   Connectivity Status: Whether the applet is connected to Cortex Cloud.
    
-   Logs Received and Logs Sent: Number of logs received and sent by the applet per second over the last 24 hours. If the number of incoming logs received is larger than the number of logs sent, it could indicate a connectivity issue.
    
-   Resources: Displays the amount of CPU, Memory, and Disk space the applet is using.

##### Activate Windows Event Collector on Windows Core

Learn more about activating the Windrows Event Collector on Windows Core OS to connect with the Broker VM.

**Notice:**

Requires the Data Collection add-on.

After you have configured and registered your Broker VM, you can activate your Windows Event Collector application on Windows Core OS (WCOS). WCOS is a stripped-down, lightweight version of Windows that can be adapted to run on a wide variety of devices with minimal work compared to the previous way explained in Activate Windows Event Collector.

The Windows Event Collector (WEC) runs on the Broker VM collecting event logs from Windows Servers, including Domain Controllers (DCs). The Windows Event Collector can be deployed in multiple setups, and can be connected directly to multiple event generators (DCs or Windows Servers) or routed using one or more Windows Event Collectors. Behind each Windows event collector there may be multiple generating sources.

To enable the collection of the event logs, you are configuring and establishing trust between the Windows Event Forwarding (WEF) collectors and the WEC. Establishing trust between the WEFs and the WEC is achieved by mutual authentication over TLS using server and client certificates. The WEF, a WinRM plugin, runs under the Network Service account. Therefore, you need to provide the WEFs with the relevant certificates and grant the account access permissions to the private key used for client authentication, for example, authenticate with WEC.

**Prerequisite:**

-   Set up and configure Broker VM
    
-   Broker VM version 8.0 and later
    
-   You have knowledge of Windows Active Directory and Domain Controllers.
    
-   You must configure different settings related to the FQDN where the instructions differ depending on whether you are configuring a standalone Broker VM or High Availability (HA) cluster.
    
    Standalone broker
    
    A FQDN must be configured for the standalone broker as configured in your local DNS server. Therefore, the Broker VM is registered in the DNS, its FQDN is resolvable from the events forwarder (Windows server), and the Broker VM FQDN is configured. For more information, see Edit Broker VM Configuration.
    
    HA cluster
    
    A FQDN must be configured in the cluster settings as configured in your local DNS server, which points to a Load Balancer. For more information, see Configure High Availability Cluster.
    
-   Windows Server 2012 r2 or later.
    

After ingestion, Cortex Cloud normalizes and saves the Windows event logs in the dataset `xdr_data`. The normalized logs are also saved in a unified format in `microsoft_windows_raw`. This enables you to search the data using XQL queries, build correlation rules, and generate dashboards based on the data.

Perform the following procedures in the order listed below.

###### Task 1. Add, configure, and activate a Windows Event Collector

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  Do one of the following:
    
    -   On the Brokers tab, find the Broker VM, and in the APPS column, left-click Add → Windows Event Collector.
        
    -   On the Clusters tab, find the Broker VM, and in the APPS column, left-click Add → Windows Event Collector.
        
    
3.  In the Activate Windows Event Collector window, define the Collected Events to configure the events collected by the applet. This lists event sources from which you want to collect events.
    
    | Field | Description |
    | --- | --- |
    | Source | Select from the pre-populated list with the most common event sources on Windows Servers. The event source is the name of the software that logs the events. A source provider can only appear once in your list. When selecting event sources, depending on the type event you want to forward, ensure the event source is enabled, for example [auditing security events](https://docs.microsoft.com/en-us/defender-for-identity/configure-windows-event-collection). If the source is not enabled, the source configuration in the given row will fail. |
    | Min. Event Level | Minimum severity level of events that are collected. |
    | Event IDs Group | Whether to Include, Exclude, or collect All event ID groups. |
    | Minimal TLS Version | Select either 1.0 or 1.2 (default) as the minimum TLS version allowed. Ensure that you verify that all Windows event forwarders are supporting the minimal defined TLS version. |
    
    Example 136. 
    
    To forward all the Windows Event Collector events to the Broker VM, define as follows:
    
    -   Source: **`ForwardedEvents`**
        
    -   Min. Event Level: **`Verbose`**
        
    -   Event IDs Group: **`All`**
        
    
      
    
    **Note:**
    
    By default, Cortex Cloud collects Palo Alto Networks predefined Security events that are used by the Cortex Cloud detectors. Removing the Security collector interferes with the Cortex Cloud detection functionality. Restore to Default to reinstate the Security event collection.
    
4.  Click Activate. After a successful activation, the APPS field displays WEC with a green dot indicating a successful connection.
    

###### Task 2. Configure the Windows Event Collector settings

1.  In the APPS column, left-click the WEC connection to display the Windows Event Collector settings, and select Configure.
    
2.  In the Windows Event Forwarder Configuration window, perform the following tasks.:
    
    1.  In the Subscription Manager URL field, click  (copy) . This will be used when you configure the subscription manager in the GPO (Global Policy Object) on your domain controller.
        
    2.  Enter a password in the Define Client Certificate Export Password field to be used to secure the downloaded WEF certificate that establishes the connection between your DC/WEF and the WEC. You will need this password when the certificate is imported to the events forwarder.
        
    3.  Download the WEF certificate in a PFX format to your local machine.
        
        To view your Windows Event Forwarding configuration details at any time, select your Broker VM, right-click and navigate to Windows Event Collector → Configure.
        
    
    Cortex Cloud monitors the certificate and triggers a Certificate Expiration notification 30 days prior to the expiration date. The notification is sent daily specifying the number of days left on the certificate, or if the certificate has already expired.
    

###### Task 3. Install your WEF Certificate on the WEF to establish connection

1.  Start PowerShell with elevated privileges.
    
    1.  Run PowerShell with the following command:
        
        ```
        PowerShell
        ```
        
    2.  From inside a `PowerShell` command run the following command:
        
        ```
        Start-Process -Verb RunAs PowerShell
        ```
        
2.  Copy the PFX file that you downloaded to the local Core machine in one of the following ways:
    
    -   (Recommended) If you're able to RDP to your server, open Notepad, and select File → Open to copy and paste files from your local machine directly to the server. If you have any local drives mapped through the RDP options, the local drives are also displayed. We recommend this method as it's the simplest.
        
    -   If you have enabled `WinRM` for remote `PowerShell` execution, you can copy over PowerShell using this command:
        
        ```
        $session = New-PSSession –ComputerName <computer name>
        ```
        
        ```
        Copy-Item –Path <path to PFX certificate file> –Destination '<temporary file path>' –ToSession $session
        ```
        
        Example 137. 
        
        ```
        $session = New-PSSession –ComputerName SERVER1
        ```
        
        ```
        Copy-Item –Path C:\\Downloads\\forwarder.wec.paloaltonetworks.com.pfx –Destination 'C:\\temp\\forwarder.wec.paloaltonetworks.com.pfx' –ToSession $session
        ```
        
          
        
        To enable `WinRM`, use this command:
        
        ```
        Execute "Start-Service winRM"
        ```
        
        ```
        Execute "WinRM quickconfig"
        ```
        
    -   Use SSH on server core. This includes enabling SSH on server core and using `winscp` to drag and drop the PFX file.
        
    -   Use SMB to open the file share `c$` on the `\\server1\c$` server. You can only use this option if you are an administrator and the firewall on your network isn't set to block file sharing.
        
        You can also launch PowerShell and run the following command to tell the remote server to copy a file from your local computer using SMB:
        
        ```
        Copy-Item –Path <path to PFX certificate file> –Destination '\\\\<computer name>\\c$\\<path to PFX file>
        ```
        
        Example 138. 
        
        ```
        Copy-Item –Path C:\\Downloads\\forwarder.wec.paloaltonetworks.com.pfx –Destination '\\\\windows-core-server\\c$\\forwarder.wec.paloaltonetworks.com.pfx
        ```
        
          
        
    
3.  Import the PFX file from PowerShell.
    
    Use the following command to import the PFX file:
    
    ```
    certutil -f -importpfx '<path to PFX file from Destination>'
    ```
    
    Example 139. 
    
    ```
    certutil -f -importpfx '.\\forwarder.wec.paloaltonetworks.com.pfx'
    ```
    
      
    
    You will need to enter the Client Certificate Export Password you defined in the Cortex Cloud console.
    
    When the import is complete, the following message is displayed:
    
    ```
    CertUtil: -importPFX command completed successfully. 
    ```
    
4.  Verify that the certificates are in the correct locations.
    
    -   Ensure the client certificate appears in "My" (Personal) store by running the following command:
        
        ```
        certutil -store My
        ```
        
    -   Ensure the CA appears in Trusted Root Certification Authorities by running the following command:
        
        ```
        certutil -store root
        ```
        
    
5.  Manage the private key of the `forwarder.wec.paloaltonetworks.com.pfx` certificate.
    
    This entails applying permissions for the `NETWORK SERVICE` user.
    
    1.  Retrieve the Thumbprint of the `forwarder.wec.paloaltonetworks.com.pfx` certificate by running the following script:
        
        ```
        $store = New-Object System.Security.Cryptography.X509Certificates.X509Store("My","LocalMachine")
        $store.Open("ReadWrite")
        echo $store.Certificates
        ```
        
        After the script runs, copy the relevant thumbprint.
        
    2.  Grant `NT AUTHORITY\NETWORK SERVICE` with read permissions by running the following script with the `$thumbprint` set to the value you copied in the previous step by replacing `<Thumbprint retrieved value>`.
        
        ```
        $thumbprint = '<Thumbprint retrieved value>'
        $account = 'NT AUTHORITY\\NETWORK SERVICE'
        #Open Certificate store and locate certificate based on provided thumbprint
        $store = New-Object System.Security.Cryptography.X509Certificates.X509Store("My","LocalMachine")
        $store.Open("ReadWrite")
        $cert = $store.Certificates | where {$_.Thumbprint -eq $thumbprint}
         
        #Create new CSP object based on existing certificate provider and key name
        #Note: Ensure this command is pasted to the same row and doesn’t break to multiple rows. 
        #Otherwise, the command will fail with errors.
        $csp = New-Object System.Security.Cryptography.CspParameters($cert.PrivateKey.CspKeyContainerInfo.ProviderType, $cert.PrivateKey.CspKeyContainerInfo.ProviderName,
        $cert.PrivateKey.CspKeyContainerInfo.KeyContainerName)
         
        # Set flags and key security based on existing cert
        $csp.Flags = "UseExistingKey","UseMachineKeyStore"
        $csp.CryptoKeySecurity = $cert.PrivateKey.CspKeyContainerInfo.CryptoKeySecurity
        $csp.KeyNumber = $cert.PrivateKey.CspKeyContainerInfo.KeyNumber
         
        # Create new access rule - could use parameters for permissions, but I only needed GenericRead
        $access = New-Object System.Security.AccessControl.CryptoKeyAccessRule($account,"GenericRead","Allow")
        # Add access rule to CSP object
        
        $csp.CryptoKeySecurity.AddAccessRule($access)
         
        #Create new CryptoServiceProvider object which updates Key with CSP information created/modified above
        $rsa2 = New-Object System.Security.Cryptography.RSACryptoServiceProvider($csp)
         
        #Close certificate store
        $store.Close()
        echo $csp.CryptoKeySecurity
        ```
        
    3.  After the script runs, validate the permissions are now set correctly.
        
        
        

###### Task 4. Add the Network Service account to the domain controller Event Log Readers group.

**Note:**

You must install the WEF certificate on every Windows Server, whether DC or not, for the WEFs that are supposed to forward logs to the Windows Event Collector applet on the Broker VM.

1.  To enable events forwarders to forward events, the Network Service account must be a member of the Active Directory Event Log Readers group. In PowerShell, execute the following command on the domain controller that is acting as the event forwarder:
    
    ```
    PS C:\\> net localgroup "Event Log Readers" "NT Authority\\Network Service" /add
    ```
    
    Make sure you see `The command completed successfully` message.
    
2.  Grant access to view the security event logs.
    
    The security event logs are provided by default and the instruction below explain how to to grant access to view these logs. You'll need to apply these instructions to any other event logs that you configure the WEC to access.
    
    1.  Run `wevtutil gl security` and take note of your `channelAccess` value.
        
        Example 140. 
        
        ```
        \`PS C:\\Users\\Administrator> wevtutil gl security
        name: security
        enabled: true
        type: Admin
        owningPublisher:
        isolation: Custom
        channelAccess: O:BAG:SYD:(A;;0xf0005;;;SY)(A;;0x5;;;BA)(A;;0x1;;;S-1-5-32-573)
        logging:
          logFileName: %SystemRoot%\\System32\\Winevt\\Logs\\security.evtx
          retention: false
          autoBackup: false
          maxSize: 134217728
        publishing:
          fileMax: 1
        ```
        
        Take note of value: `channelAccess: O:BAG:SYD:(A;;0xf0005;;;SY)(A;;0x5;;;BA)(A;;0x1;;;S-1-5-32-573)`
        
          
        
    2.  Run `wevtutil sl security "/ca:<channelAccess value>(A;;0x1;;;S-1-5-20)"`
        
        Example 141. 
        
        ```
        PS C:\\Users\\Administrator> wevtutil sl security "/ca:O:BAG:SYD:(A;;0xf0005;;;SY)(A;;0x5;;;BA)(A;;0x1;;;S-1-5-32-573)(A;;0x1;;;S-1-5-20)"
        ```
        
          
        
    
    Make sure you grant access on each of your domain controller hosts.
    

###### Task 5. Create a WEF Group Policy that applies to every Windows server you want to configure as a WEF

As a Group Policy Management Console is not available on Core servers, it’s not possible to fully edit a Group Policy Object (GPO) either with PowerShell or using a web solution. As a result, follow this alternative method, which is based on configuring a group policy from another Windows DC by remotely configuring the group policy.

1.  Use any DC that has the Group Policy Management Console available in the same domain as the Core server, and verify the connection between the servers with a simple ping.
    
2.  Run `cmd` as an administrator.
    
3.  Run the following command:
    
    ```
    gpmc.msc /gpcomputer: <computer name.Domain>
    ```
    
    Example 142. 
    
    ```
    gpmc.msc /gpcomputer: WIN-SI2SVDOKIMV.ENV21.LOCAL
    ```
    
      
    
4.  In the Group Policy Management window, navigate to Domains → your domain name → Group Policy Object, right-click and select New.
    
5.  In the New GPO window, enter your group policy Name: as Windows Event Forwarding, and click OK.
    
6.  Navigate to Domains → your domain name → Group Policy Objects → Windows Event Forwarding, right-click and select Edit.
    
    
    
7.  In the Group Policy Management Editor:
    
    -   Set the Windows Remote Management Service for automatic startup.
        
        1.  Select Computer Configuration → Policies → Windows Settings → Security Settings → System Services, and in the view panel locate and double-click Windows Remote Management (WS-Management).
            
        2.  Mark the Define this policy setting checkbox, select Automatic, and then click Apply and OK.
            
        
    -   At a minimum for your WEC configuration, you must enable logging of the same events that you have configured to be collected in your WEC configuration on your domain controller. Otherwise, you will not be able to view these events as the WEC only controls querying not logging. For example, if you have configured authentication events to be collected by your WEC using an authentication protocol, such as Kerberos, you should ensure all relevant audit events for authentication are configured on your domain controller. In addition, you should ensure that all relevant audit events that you want collected, such as the success and failure of account logins for Windows Event ID 4625, are properly configured, particularly for those that you want Cortex Cloud to apply grouping and analytics inspection.
        
        **Note:**
        
        This step overrides any local policy settings.
        
        Example 143. 
        
        Here is an example of how to configure the WEC to collect authentication events using Kerberos as the authentication protocol to enable the collection of Broker VM supported Kerberos events, Kerberos pre-authentication, authentication, request, and renewal tickets.
        
        1.  Select Computer Configuration → Policies → Windows Settings → Security Settings → Advanced Audit Policy Configuration → Audit Policies → Account Logon.
            
        2.  In the view pane, right-click Audit Kerberos Authentication Service and select Properties. In the Audit Kerberos Authentication Service window, mark Configure the following audit events:, and click Success and Failure followed by Apply and OK.
            
            Repeat for Audit Kerberos Service Ticket Operations.
            
        
          
        
    
8.  Configure the subscription manager.
    
    Navigate to Computer Configuration → Policies → Administrative Templates: Policy definitions → Windows Components → Event Forwarding, right-click Configure target Subscription Manager and select Edit.
    
    
    
    In the Configure target Subscription Manager window:
    
    1.  Mark Configure target Subscription Manager as Enabled.
        
    2.  In the Options section, select Show and in the Show Contents window, paste the Subscription Manage URL you copied from the Cortex Cloud console, and then click OK.
        
    3.  Click Apply and OK to save your changes.
        
9.  Add Network Service to Event Log Readers group.
    
    Select Computer Configuration → Preferences → Control Panel Settings → Local Users and Groups, right-click and select New → Local Group.
    
    
    
    In the New Local Group Properties window:
    
    1.  In the Group name field, select Event Log Readers (built-in).
        
    2.  In the Members section, click Add and enter in the Name filed **`Network Service`** followed by OK.
        
        **Note:**
        
        You must type out the name, do not select the name from the browse button.
        
    3.  Click Apply and OK to save your changes, and close the Group Policy Management Editor window.
        
10.  Configure the Windows Firewall.
     
     **Note:**
     
     If Windows Firewall is enabled on your event forwarders, you will have to define an outbound rule to enable the WEF to reach port 5986 on the WEC.
     
     In the Group Policy Management window, select Computer Configuration → Policies → Windows Settings → Security Settings → Windows Firewall with Advanced Security → Outbound Rules, right-click and select New Rule.
     
     In the New Outbound Rule Wizard define the following Steps:
     
     1.  Rule Type: Select Port followed by Next.
         
     2.  Protocols and Ports: Select TCP and in the Specific Remote Ports field enter **`5986`** followed by Next.
         
     3.  Action: Select Allow the connection followed by Next.
         
     4.  Profile: Select Domain and disable Private and Public followed by Next.
         
     5.  Name: Specify **`Windows Event Forwarding`**.
         
     6.  To save your changes, click Finish.
         

###### Task 6. Apply the WEF Group Policy

Link the policy to the OU or the group of Windows servers you would like to configure as event forwarders. In the following flow, the domain controllers are configured as an event forwarder.

1.  Select Group Policy Management → <your domain name> → Domain Controllers, right-click and select Link an existing GPO....
    
2.  In the Select GPO window, click Windows Event Forwarding followed by OK.
    
3.  In an administrative PowerShell console, execute the following commands:
    
    1.  ```
        PS C:\\Users\\Administrator> gpupdate /force
        ```
        
        Verify that the `Computer Policy update has completed successfully. User Policy update has completed successfully.` confirmation message is displayed.
        
    2.  ```
        PS C:\\Users\\Administrator> Restart-Service WinRM
        ```
        

###### Task 7. Verify Windows Event Forwarding

1.  In an administrative PowerShell console, run the following command:
    
    ```
    PS C:\\Users\\Administrator> Get-WinEvent Microsoft-windows-WinRM/operational -MaxEvents 10
    ```
    
2.  Look for `WSMan operation EventDelivery completed successfully` confirmation messages. These indicate events forwarded successfully.
    

###### Task 8. Manage the Window Event Collector (Optional)

After the Windows Event Collector has been activated in the Cortex Cloud Management Console, left-click the WEC connection in the APPS column to display the Windows Event Collector settings, and select:

-   Configure to define the event configuration information.
    
-   Collection Configuration to view or edit existing or add new events to collect.
    
-   Deactivate to disable the Windows Event Collector.
    

###### Task 9. View Windows Event Collector metrics (Optional)

To view metrics about the Windows Event Collector, left-click the WEC connection in the APPS field for your Broker VM, and you'll see the following metrics:

-   Connectivity Status: Whether the applet is connected to Cortex Cloud.
    
-   Logs Received and Logs Sent: Number of logs received and sent by the applet per second over the last 24 hours. If the number of incoming logs received is larger than the number of logs sent, it could indicate a connectivity issue.
    
-   Resources: Displays the amount of CPU, Memory, and Disk space the applet is using.

##### Renew WEC certificates

Learn more about renewing your WEC certificates in Cortex Cloud.

**Notice:**

Requires the Data Collection add-on.

Renewing your WEC certificates in Cortex Cloud includes renewing your Windows Event Forwarding (WEF) client certificate and your WEC server certificate. You must install the WEF certificate on every Windows server, whether a Domain Controller (DC) or not, for the WEFs that are supposed to forward logs to the Windows Event Collector applet on the Broker VM.

**Important:**

After you receive a notification for renewing your WEC CA certificate, we recommend that you do not add any new WEF clients until the WEC certification renewal process is complete. Events from these WEF clients that are added afterwards will not be collected by the server until the WEC certificates are renewed.

In addition, Cortex Cloud manages the renewal of your WEC certificates by implementing the following time limits:

-   The WEC CA certificate is increased for an extended period of time for a maximum of 20 years.
    
-   The Broker VM applet includes an automatic renewal mechanism for a WEC server certificate, which has a lifespan of 12 months.
    
-   The WEC client certificate after the renewal is issued with a lifespan of 5 years.
    

Perform the following procedures in the order listed below.

###### Task 1. Renew your WEF client certificate in Cortex Cloud

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  Do one of the following:
    
    -   On the Brokers tab, find the Broker VM, and in the APPS column, left-click the WEC connection to display the Windows Event Collector settings, and select Configure.
        
    -   On the Clusters tab, find the Broker VM, and in the APPS column, left-click the WEC connection to display the Windows Event Collector settings, and select Configure.
        
    
3.  In the Windows Event Forwarder Configuration window, perform the following tasks:
    
    1.  In the Subscription Manager URL field, click  (copy) . This will be used when you configure the subscription manager in the GPO (Global Policy Object) on your domain controller.
        
    2.  Enter a password in the Define Client Certificate Export Password field to be used to secure the downloaded WEF certificate that establishes the connection between your DC/WEF and the WEC. You will need this password when the certificate is imported to the events forwarder.
        
    3.  Download the WEF certificate in a PFX format to your local machine.
        
4.  Install your WEF Certificate on the WEF to establish connection.
    
    **Note:**
    
    You must install the WEF certificate on every Windows Server, whether DC or not, for the WEFs that are supposed to forward logs to the Windows Event Collector applet on the Broker VM.
    
    1.  Locate the PFX file you downloaded from the Cortex Cloud console and double-click to open the Certificate Import Wizard.
        
    2.  In the Certificate Import Wizard:
        
        1.  Select Local Machine, and then click Next.
            
        2.  Verify the File name field displays the PFX certificate file you downloaded and click Next.
            
        3.  In the Passwords field, enter the Client Certificate Export Password you defined in the Cortex Cloud console followed by Next.
            
        4.  Select Automatically select the certificate store based on the type of certificate, and then click Next and Finish.
            
        
    3.  From a command prompt, run `certlm.msc`.
        
    4.  In the file explorer, navigate to Certificates and verify the following for each of the folders:
        
        -   In the Personal → Certificates folder, ensure the certificate `forwarder.wec.paloaltonetworks.com` is displayed.
            
        -   In the Trusted Root Certification Authorities → Certificates folder, ensure the CA `ca.wec.paloaltonetworks.com` is displayed.
            
        
        **Note:**
        
        You can see more than one `ca.wec.paloaltonetworks.com` and `forwarder.wec.paloaltonetworks.com` file from a previous installation in the directory, so select the file with the most extended Expiration Date. You can verify that you are using the correct certificate:
        
        -   To verify the client certificate in the Personal → Certificates folder is related to the CA, you can select your `forwarder.wec.paloaltonetworks.com` file and from the Certification Path tab, double-click ca.wec.paloaltonetworks.com. In the Details tab, Show: Properties only, and verify the Thumbprint matches the `ca.wec.paloaltonetworks.com` file Thumbprint.
            
        -   For the Trusted Root Certificate (i.e. CA certificate), you can verify the Thumbprint of your `ca.wec.paloaltonetworks.com` file matches the Subscription Manager URL by double-clicking the file and from the Details tab verifying the Thumbprint.
            
        
    5.  Navigate to Certificates Personal Certificates.
        
    6.  Right-click the certificate and navigate to All tasks → Manage Private Keys.
        
    7.  In the Permissions window, select Add and in the Enter the object name section, enter **`NETWORK SERVICE`**, and then click Check Names to verify the object name. The object name is displayed with an underline when valid. and then click OK.
        
        
        
    8.  Click OK, verify the Group or user names that are displayed, and then click Apply Permissions for private keys.
        
        
        
5.  Configure the subscription manager.
    
    1.  Navigate to Computer Configuration → Policies → Administrative Templates: Policy definitions → Windows Components → Event Forwarding, right-click Configure target Subscription Manager and select Edit.
        
        
        
    2.  In the Configure target Subscription Manager window, perform the following:
        
        1.  Mark Configure target Subscription Manager as Enabled.
            
        2.  In the Options section, select Show and in the Show Contents window, paste the Subscription Manage URL you copied from the Cortex Cloud console, and then click OK.
            
        3.  Click Apply and OK to save your changes.
            
        
6.  Complete the WEF Client certificate renewal.
    
    On every WEF DC, perform the following from a command prompt:
    
    1.  Run `gpupdate /force` to update the group policy.
        
    2.  To apply the configurations, `Restart-Service WinRM`.
        

###### Task 2. Renew your WEC server certificate in Cortex Cloud

**Note:**

Only perform this step under the following conditions:

-   You have completed the WEF certification renewal process for ALL clients in your environment. Otherwise, events from the WEFs that you did not install the new client certificate will not be collected by the WEC.
    
-   You are approaching the WEC server CA certificate expiration date, which is 2 years after the Windows Event Collector applet activation, and receive a notification in the Cortex Cloud console.
    

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  Do one of the following:
    
    -   On the Brokers tab, find the Broker VM, and in the APPS column, left-click the WEC connection to display the Windows Event Collector settings, and select Renew WEC Server Certificate.
        
    -   On the Clusters tab, find the Broker VM, and in the APPS column, left-click the WEC connection to display the Windows Event Collector settings, and select Renew WEC Server Certificate.
        
    
3.  Click Renew.
    
    Once Cortex Cloud renews the WEC server certificate, the status of the WEC in the APPS field on the Broker VMs machine is Connected indicating the applet is running. In addition, the health status of the Windows Event Collector applet is now green instead of yellow and the warning message that appeared when you hovered over the health status no longer appears. Your WEC server certificate is issued with a lifespan of 12 months.
    
    We also suggest that you run the following XQL query to verify that your event logs are being captured:
    
    ```
    dataset = xdr_data 
    | filter _product = "Windows" 
    | fields _vendor,_product,action_evtlog_level,action_evtlog_event_id 
    | sort desc _time 
    | limit 20
    ```
    
    **Note:**
    
    If this query does not display results with a timestamp from after the renewal process, it could indicate that the renewal process is not complete, so wait a few minutes before running another query. If you are still having a problem, contact Technical Support.

### XDR Collectors

Learn how XDR Collectors can be used for on-premise data collection on Windows and Linux machines.

**Note:**

Ingestion of log events larger than 5 MB is not supported.

Cortex Cloud provides an XDR Collectors (XDRC) configuration that is dedicated for on-premise data collection on Windows and Linux machines. The XDRC includes a dedicated installer, a collector upgrade configuration, content updates, and policy management. The XDRC is a data collector that gathers and processes logs and events from multiple sources. It leverages Elasticsearch Filebeat, a lightweight log shipper, to collect log data from various systems and applications. Additionally, Winlogbeat gathers Windows event logs, ensuring comprehensive visibility into Windows environments. These components facilitate centralized analysis, threat detection, and investigation across the Cortex Cloud ecosystem.

#### XDR Collector audit logs

Learn more about XDR Collector audit logs.

**Notice:**

Requires the Data Collection add-on.

Cortex Cloud logs entries for events related to the XDR Collector monitored activities. Cortex Cloud stores the logs for 365 days. To view the XDR Collector audit logs, select Settings → XDR Collector Audit Logs.

#### XDR Collector machine requirements and supported operating systems

Learn about the supported operating systems and requirements for the collector machines used for the Cortex XDR Collectors.

**Notice:**

Requires the Data Collection add-on.

You can configure XDR Collectors that are dedicated for on-premise data collection on Windows and Linux machines. The following hardware and software specifications are required for the collector machines.

| Machine operating system | Requirement | Specifications |
| --- | --- | --- |
| Linux | Processor | 2.3 GHz dual-core |
|  | RAM | 4GB; 8GB recommended |
|  | Hard disk space | 10GB |
|  | Architecture | x86 64-bit |
|  | Kernel version | 2.6.32 |
|  | Supported operating system versions | Red Hat Enterprise Linux 6 (6.7 and later); Red Hat Enterprise Linux 7; Red Hat Enterprise Linux 8; Red Hat Enterprise Linux 9; Red Hat Enterprise Linux 10.0; SUSE Linux Enterprise Server 12; SUSE Linux Enterprise Server 15 SP0; SUSE Linux Enterprise Server 15 SP1; SUSE Linux Enterprise Server 15 SP2; SUSE Linux Enterprise Server 15 SP3; SUSE Linux Enterprise Server 15 SP4; SUSE Linux Enterprise Server 15 SP5; SUSE Linux Enterprise Server 15 SP6; Ubuntu Server 12; Ubuntu Server 14; Ubuntu Server 16; Ubuntu Server 18; Ubuntu Server 20; Ubuntu Server 22; Oracle Linux 6 (6.7 and later); Oracle Linux 7; Oracle Linux 8; Oracle Linux 9 |
|  | Software packages | Verify you have standard Unix programs installed.; ca-certificates; openssl 1.0.0 or a later release; Distributions with SELinux in enforcing or permissive mode:-   Red Hat Enterprise Linux 6 and Oracle Linux 6: policycoreutils-python; Red Hat Enterprise Linux 7 and Oracle Linux 7: policycoreutils-python and selinux-policy-devel; SUSE: policycoreutils-python and selinux-policy-devel; Debian and Ubuntu: policycoreutils and selinux-policy-dev |
|  | Networking | Allow communication from the XDR Collector TCP port to the server (the default is port 443). |
| Windows | Processor | Intel Pentium 4 or later with SSE2 instruction set support; AMD Opteron/Athlon 64 or later with SSE2 instruction set support; Dual core processor (minimum) |
|  | RAM | 2GB minimum |
|  | Hard disk space | 200MB minimum; 20GB recommended |
| | Supported operating system versions | **XDR Collector (XDRC) version 1.4.3 and later** Windows 8- 8.1 (and with FIPS mode); Embedded 8.1 Professional (Supported until January 2023) ; Windows Server- 2012 (Supported until January 2026), All editions; FIPS mode; Core option (Windows Server 2012 R2 only) **XDR Collector (XDRC) version 1.5.0 and later** Windows 10- Education; Pro (CB and CBB); Enterprise (CB, CBB, and LTSB); Updates 21H2, 21H1, 20H2, 2004, 1709, 1909, 1903, 1809, 1803 (Enterprise and Professional); Updates 22H2, 22H1; Enterprise 2019 LTSC; Windows 10 IoT Core; Windows 10 IoT Enterprise ; Windows 11- Windows 11; Updates 22H2, 22H1; Pro/Pro Education/Pro Workstations; Enterprise; Education/Home; IoT Enterprise ; Windows Server- Datacenter; 2012 (Supported until October 2026), 2012 R2 (Supported until January 2026), All editions; FIPS mode; 2016 (Standard edition; Server with Desktop experience, previously known as Server with a GUI); 2016 Datacenter edition; 2019; Core option (Windows Server 2012, 2012 R2, and 2016 only); 2019 Standard (Server Core); 2022 |
|  | Networking | Allow communication from the XDR Collector TCP port to the server (the default is port 443). |
|  | Applications and utilities | Windows Accessories (Notepad) to view logs |

#### Resources required to enable access to XDR Collectors

Depending on your network environment settings, you should enable network access to the Cortex XDR Collectors resources.

**Notice:**

Requires the Data Collection add-on.

To enable access to XDR Collectors components, you must allow access to various Palo Alto Networks resources. If you use the specific Palo Alto Networks [App-IDs](https://docs.paloaltonetworks.com/pan-os/8-1/pan-os-admin/app-id) indicated in the table, you do not need to explicitly allow access to the resource. A dash (-) indicates there is no App-ID coverage for a resource.

**Note:**

Some of the IP addresses required for access are registered in the United States. As a result, some GeoIP databases do not correctly pinpoint the location in which IP addresses are used. All customer data is stored in your deployment region, regardless of the IP address registration and restricts data transmission through any infrastructure to that region. For considerations, see .

**Note:**

Throughout this topic, refers to the chosen subdomain of your Cortex Cloud tenant and `<region>` is the region in which your Strata Logging Service is deployed.

Refer to the following tables for the FQDNs, IP addresses, ports, and App-ID coverage for your deployment.

For IP address ranges in GCP, refer to the following tables for IP address coverage for your deployment.

-   [https://www.gstatic.com/ipranges/goog.json](https://www.gstatic.com/ipranges/goog.json): Refer to this list to look up and allow access to the IP address ranges subnets.
    
-   [https://www.gstatic.com/ipranges/cloud.json](https://www.gstatic.com/ipranges/cloud.json): Refer to this list to look up and allow access to the IP address ranges associated with your region.
    

The following table shows the required resources by region.

| FQDN | IP addresses and port | App-ID coverage |
| --- | --- | --- |
| Used to connect to the Cortex Cloud management console. | IP address by region: US (United States): 35.244.250.18; EU (Europe): 35.227.237.180; CA (Canada): 34.120.31.199; UK (United Kingdom): 34.120.87.77; JP (Japan): 35.241.28.254; SG (Singapore): 34.117.211.129; AU (Australia): 34.120.229.65; DE (Germany): 34.98.68.183; IN (India): 35.186.207.80; CH (Switzerland): 34.111.6.153; PL (Poland): 34.117.240.208; TW (Taiwan): 34.160.28.41; QT (Qatar): 35.190.0.180; FA (France): 34.111.134.57; IL (Israel): 34.111.129.144; SA (Saudi Arabia): 35.244.157.127; ID (Indonesia): 34.111.58.152; ES (Spain): 34.111.188.248; IT (Italy): 34.8.224.70; KR (South Korea): 34.54.5.247; ZA (South Africa): 34.149.165.12 Port: 443 | `cortex-xdr` |
| `distributions.traps.paloaltonetworks.com` Used for the first request in registration flow where the agent passes the distribution id and obtains the `ch-.traps.paloaltonetworks.com` of its tenant. | IP address: 35.223.6.69; Port: 443 | `traps-management-service` |
| `panw-xdr-installers-prod-us.storage.googleapis.com` Used to download installers for upgrade actions from the server. This storage bucket is used for all regions. | IP ranges in GCP; Port: 443 | `cortex-xdr` |
| `global-content-profiles-policy.storage.googleapis.com` Used to download content updates. | IP ranges in GCP; Port: 443 | `cortex-xdr` |
| `ch-.traps.paloaltonetworks.com` Used for all other requests between the agent and its tenant server including heartbeat, uploads, action results, and scan reports. | IP address by region: US (United States): 34.98.77.231; EU (Europe): 34.102.140.103; CA (Canada): 34.96.120.25; UK (United Kingdom): 35.244.133.254; JP (Japan): 34.95.66.187; SG (Singapore): 34.120.142.18; AU (Australia): 34.102.237.151; DE (Germany): 34.107.161.143; IN (India): 34.120.213.188; CH (Switzerland): 34.149.180.250; PL (Poland): 35.190.13.237; TW (Taiwan): 34.149.248.76; QT (Qatar): 34.107.129.254; FA (France): 34.36.155.211; IL (Israel): 34.128.157.130; SA (Saudi Arabia): 34.107.213.85; ID (Indonesia): 34.128.156.84; ES (Spain): 34.120.102.147; IT (Italy): 34.8.234.58; KR (South Korea): 34.54.155.245; ZA (South Africa): 35.190.79.68 Port: 443 | `traps-management-service` |
| Used for API requests and responses. | IP address by region: US (United States): 35.222.81.194; EU (Europe): 34.90.67.58; CA (Canada): 35.203.82.121; UK (United Kingdom): 34.89.56.78; JP (Japan): 34.84.125.129; SG (Singapore): 34.87.83.144; AU (Australia): 35.189.18.208; DE (Germany): 34.107.57.23; IN (India): 35.200.158.164; CH (Switzerland): 34.65.248.119; PL (Poland): 34.116.216.55; TW (Taiwan): 35.234.8.249; QT (Qatar): 34.18.46.240; FA (France): 34.155.222.152; IL (Israel): 34.165.156.139; SA (Saudi Arabia): 34.166.58.79; ID (Indonesia): 34.128.115.238; ES (Spain): 34.175.30.176; IT (Italy): 34.154.195.120; KR (South Korea): 34.64.54.175; ZA (South Africa): 34.35.64.191 Port: 443 | \- |
| **Log forwarding to a syslog receiver** |
| See Integrate a syslog receiver for information about log forwarding IP addresses per region for syslog receivers. |  |  |

The following table lists the required resources for Federal (United States - Government).

| FQDN | IP addresses and port | App-ID coverage | Required for XDR Collectors |
| --- | --- | --- | --- |
| `distributions-prod-fed.traps.paloaltonetworks.com` Used for the first request in registration flow where the agent passes the distribution ID and obtains the `ch-.traps.paloaltonetworks.com` of its tenant. | IP address: 104.198.132.24; Port: 443 | `traps-management-service` | ✓ |
| `panw-xdr-installers-prod-fr.storage.googleapis.com` Used to download installers for upgrade actions from the server. | IP ranges in GCP; Port: 443 | `cortex-xdr` | ✓ |
| `global-content-profiles-policy-prod-fr.storage.googleapis.com` Used to download content updates. | IP ranges in GCP; Port: 443 | `cortex-xdr` | ✓ |
| `ch-.traps.paloaltonetworks.com` Used for all other requests between the agent and its tenant server including heartbeat, uploads, action results, and scan reports. | IP address: 130.211.195.231; Port: 443 | `traps-management-service` | ✓ |
| Used for API requests and responses. | IP address: 130.211.195.231; Port: 443 | \- | ✓ |
| **Log forwarding to a syslog receiver** | |
| See Integrate a syslog receiver for information about log forwarding IP addresses per region for syslog receivers. |  |  |  |

#### Manage XDR Collectors

Manage Cortex Cloud collectors.

**Notice:**

Requires the Data Collection add-on.

On the XDR Collectors Administration page, you can view the list of collectors and perform additional tasks such as changing the alias of the collector, upgrading the collector version, and setting a proxy address and port for the collector.

##### XDR Collectors installation resource for Windows and Linux

Cortex XDR Collectors installation resource for Windows and Linux.

**Notice:**

Requires the Data Collection add-on.

The following table provides important information about the XDR Collectors installation for Windows and Linux.

| Installation component | Default path | Description | Related files/Services |
| --- | --- | --- | --- |
| Installation folder | **Windows**: `%PROGRAMFILES%\Palo Alto Networks\XDR Collector`; **Linux**: `/opt/paloaltonetworks/xdr-collector` | The default installation path for the XDR Collector. Contains all Program Core files and executables. | **Windows**- Service name: `XDR Collector`; Process name: `xdrcollectorsvc.exe` ; **Linux**- Service name: `xcd`; Process name: `xdr-collector.service` |
| Logs | **Windows**: `%PROGRAMDATA%\XDR Collector\logs`; **Linux**: `/opt/paloaltonetworks/xdr-collector/logs` | **Windows**: Contains the XDR Collector application Log, the Filebeat application log, and the Winlogbeat application log. Indicates information, warnings, and errors related to the XDR Collector application.; **Linux**: Contains the XDR Collector application Log as well as the Filebeat application log. Indicates information, warnings, and errors related to the XDR Collector application. Contains the XDR Collector application Log as well as the Filebeat application log. Indicates information, warnings, and errors related to the XDR Collector application. | **Windows**- `scouter.log`; `filebeat`; `winlogbeat` ; **Linux**- `scouter.log`; `filebeat` |
| Configuration | **Windows**: `%PROGRAMFILES%\Palo Alto Networks\XDR Collector\config`; **Linux**: `/opt/paloaltonetworks/xdr-collector/config` | Contains the XML configuration file of the XDR Collector for both Windows and Linux. Any change in this XML configuration file is saved to the XDR Collector database and the settings are taken from this file. \*\*Note:\*\* In some circumstances, such as after an XDR Collectors upgrade, the configured settings in the XML configuration file can be erased. Yet, this won't affect the saved settings in the XDR Collectors database. | For both Windows and Linux, the file name is `XDR_Collector.xml`. |
| Persistence | **Windows**: `%PROGRAMDATA%\XDR Collector\OSPersistence`; **Linux**: `/etc/panw/OSPersistence/` | Contains the Operating System persistence file for the XDR Collector, which issued as part of the registration process. | For both Windows and Linux, the file name is `.scouter.json`. |

##### Create an XDR Collector installation package

Learn how to create an XDR Collector installation package for a Windows or Linux collector machine.

**Notice:**

Requires the Data Collection add-on.

To install a Cortex XDR Collector for the first time, you must first create an XDR Collector installation package. After you create and download an installation package, you can then install it directly on the collector machine or you can use a software deployment tool of your choice to distribute the software to multiple collector machines.

To install the XDR Collector software, you must use a valid installation package that exists in your XDR Collectors console. If you delete an installation package, any XDR Collectors installed from this package are not able to register to Cortex Cloud .

**Note:**

XDR Collectors cannot be moved between Cortex Cloud managing servers. In this situation, you need to uninstall the existing collector, and then install a new collector using an installation package from the new managing server. For more information on uninstalling, see Uninstall the XDR Collector.

To create a new installation package.

1.  In Cortex Cloud, select Settings  → Configurations → XDR Collectors → Installers.
    
    
    
2.  Click Create.
    
    
    
3.  Enter a unique Name and an optional Description to identify the installation package.
    
    The package Name must be no more than 100 characters and can contain letters, numbers, hyphens, underscores, commas, and spaces.
    
4.  Select the Platform for which you want to create the installation package as either Windows or Linux.
    
5.  Select the Version.
    
6.  Create the installation package.
    
    Cortex Cloud prepares your installation package and makes it available in the XDR Collectors Installations page.
    
7.  Download your installation package.
    
    When the status of the package displays `Completed`, right-click the Collector Version row, and click Download.
    
    -   For a Windows installation, select Download 64 bit installer.
        
    -   For a Linux installation, you can Download Linux RPM installer or Download Linux DEB installer (according to your Linux collector machine distribution), and deploy the installers on the on-premise collector machines using the Linux package manager. Alternatively, you can Download Linux SH installer and deploy it manually on the Linux collector machine.
        
    
    Once the applicable installation package is downloaded, you can install the package.
    
    -   Install the XDR Collector installation package for Windows.
        
    -   Install the XDR Collector installation package for Linux.
        
    
8.  Other available options.
    
    As needed, you can return to the XDR Collectors Installations page to manage your XDR Collectors installation packages. To manage a specific package, right click the Collector Version, and select the desired action:
    
    -   Edit the package name or description.
        
    -   Delete the installation package. Deleting an installation package does not uninstall the XDR Collector software from any on-premise collector machines.
        
        **Note:**
        
        Since Cortex Cloud relies on the installation package ID to approve XDR Collector registration during install, it is not recommended to delete the installation package for any active on-premise collector machines. Hiding the installation package will remove it from the default list of available installation packages, and can be useful to eliminate confusion in the XDR Collectors console main view. These hidden installation can be viewed by removing the default filter.
        
    -   Copy text to clipboard to copy the text from a specific field in the row of an installation package.
        
    -   Hide installation packages. Using the Hide option provides a quick method to filter out results based on a specific value in the table. You can also use the filters at the top of the page to build a filter from scratch. To create a persistent filter, save () it.

##### Install the XDR Collector installation package for Windows

Learn about the Cortex XDR Collector installation options on Windows collector machines.

**Notice:**

Requires the Data Collection add-on.

A standard XDR Collector installation for Windows is intended for standard physical collector machines or persistent virtual collector machines. You can perform the Windows installation for the XDR Collectors using the MSI or Msiexec.

###### Install the XDR Collector on Windows using the MSI

Learn how to install the Cortex XDR Collector on Windows using the MSI file.

Use the following workflow to install the XDR Collector using the MSI file.

Before completing this task, ensure that you create and download a Cortex XDR Collector installation package in Cortex Cloud.

To install an XDR Collector installation package on Windows using the MSI file.

**Note:**

When the package is executed using the MSI, an installation log is generated in `%TEMP%\MSI<Random characters>.log` by default.

1.  With Administrator level privileges, run the MSI file that you downloaded in Cortex Cloud on the collector machine.
    
    The installer displays a welcome dialog.
    
2.  Click Next.
    
3.  Select I accept the terms in the License Agreement and click Next.
    
4.  Install the XDR Collector.
    
    The installer displays the User Account Control dialog box.
    
5.  Click Yes.
    
6.  After you complete the installation, verify that the Cortex XDR Collector can establish a connection with Cortex Cloud.
    
    **Note:**
    
    If the XDR Collector does not connect to Cortex Cloud, verify your internet connection on the collector machine. If the XDR Collector still does not connect, verify that the installation package has not been removed from the Cortex Cloud tenant.

###### Install the XDR Collector on Windows using Msiexec

Learn how to install the Cortex XDR Collectors on Windows using the Msiexec.

Msiexec provides full control over the installation process and allows you to install, modify, and perform operations on a Windows Installer from the command line interface (CLI). You can also use Msiexec to log any issues encountered during installation.

You can also use Msiexec in conjunction with a System Center Configuration Manager (SCCM), Altiris, Group Policy Object (GPO), or other MSI deployment software to install the XDR Collector on multiple collector machines for the first time.

When you install the XDR Collector with Msiexec, you must install the XDR Collector per-machine and not per-user.

Although Msiexec supports additional options, the XDR Collectors installers support only the options listed here. For example, with Msiexec, the option to install the software in a non-standard directory is not supported—you must use the default path.

The following parameters apply to the initial installation of the XDR Collector on the collector machine.

-   `/i <installer path>\<installer file name>.msi DATA_PATH=<Path> PROXY_LIST=<address or list> /quiet /l*v <installation log path>`: Installs a package quietly, changes data path, adds proxies, and creates an installation log.
    
    For example, `msiexec /i c:\install\XDRCollector-Win_x64.msi DATA_PATH=c:\data PROXY_LIST=2.2.2.2:8888,1.1.1.1:8080 /quiet /l*v c:\installlog.txt`
    
    Where
    
    -   `LOG_LEVEL`: Sets the level of logging for the XDR Collector log (`INFO`, `DEBUG`, `ERROR`, and `TRACE`).
        
    -   `LOG_MAX_BYTES`: Sets the maximum log size in bytes.
        
    -   `LOG_BACKUP_COUNT`: Number of cycling logs for the XDR Collector.
        
    -   `PROXY_LIST`: Proxy address or name, where you can add a comma separated list, such as 2.2.2.2:8888,1.1.1.1:8080.
        
    -   `LOG_PATH`: The path to save the XDR Collector, Filebeat, and Winlogbeat logs.
        
    -   `DATA_PATH`: The path for persistence, content, Filebeat application data, Winlogbeat application data, and transaction data.
        
    -   `PROVISIONING_SERVER`: Provisioning server address.
        
    -   `DISTRIBUTION_ID`
        
    -   `ELB_ADDRESS`: Load balancer for fresh XDR Collector installation.
        
    

Before completing this task, ensure that you create and download a Cortex XDR Collector installation package in Cortex Cloud.

To install XDR Collectors using Msiexec:

1.  Use one of the following methods to open a command prompt as an administrator.
    
    -   Select Start → All Programs Accessories. Right-click Command prompt and Run as administrator.
        
    -   Select Start. In the Start Search box, type `cmd`. Then, to open the command prompt as an administrator, press CTRL+SHIFT+ENTER keys.
        
    
2.  Run the `msiexec` command followed by one or more supported options and properties.
    
    For example:
    
    `msiexec /i XDRCollector-Win_x64.msi DATA_PATH=c:\data PROXY_LIST=2.2.2.2:8888,1.1.1.1:8080 /quiet /l*v c:\installlog.txt`

##### Install the XDR Collector installation package for Linux

Learn how to install the Cortex XDR Collector on Linux collector machines.

**Notice:**

Requires the Data Collection add-on.

You can install the XDR Collector using three available packages for a Linux installation: Linux RPM, Linux DEB, and Linux SH. You can install the XDR Collector package on any Linux server, including a physical or virtual machine, and as temporary sessions.

You can install XDR Collectors in any Linux server period, whether its a physical or virtual machine. Temporary sessions can be in either of them.

**Note:**

We recommend that you perform a Linux RPM or Linux DEB installation.

Before completing this task, ensure that you create and download a Cortex XDR Collector installation package, and then upload these installation files to your Linux environment.

To install the XDR Collectors installation package for Linux.

1.  Log on to the Linux server.
    
    For example:
    
    user@local ~
    						$
    						**`ssh root@ubuntu.example.com`**
    						Welcome to Ubuntu 16.04.3 LTS (GNU/Linux 4.4.0-1041-aws x86_64)
    
    						\* Documentation:  https://help.ubuntu.com
    						\* Management:     https://landscape.canonical.com
    						\* Support:        https://ubuntu.com/advantage
    
    						Get cloud support with Ubuntu Advantage Cloud Guest:
    						http://www.ubuntu.com/business/services/cloud
    
    						0 packages can be updated.
    						0 updates are security updates.
    
    
    						Last login: Tue Aug 26 22:14:15 2021 from 192.168.1.100
    					
    
2.  Extract the installation files you uploaded using one of the following commands, which is dependent on the Linux package you downloaded:
    
    | Linux Package | Extract Command |
    | --- | --- |
    | Linux RPM | `tar xvf <installation_package_name>.rpm` |
    | Linux DEB | `tar xvf <installation_package_name>.deb` |
    | Linux SH | `tar xvf <installation_package_name>.sh` |
    
3.  Create a directory and copy the `collector.conf` installation file to the `/etc/panw/` directory.
    
    ```
    sudo mkdir -p /etc/panw
    sudo cp ./collector.conf /etc/panw/
    ```
    
4.  Install the XDR Collectors software.
    
    You can install the XDR Collectors on the collector machine manually using the shell installer or using the Linux package manager for `.rpm` and `.deb` installers:
    
    **Important:**
    
    When performing a XDR Collector installation or upgrade in Linux using a shell installer, the  `/tmp` folder cannot be marked as `noexec`. Otherwise, the installation or upgrade fails. As a workaround, before the installation or upgrade, use the following command:
    
    ```
    mount -o remount,exec /tmp
    ```
    
    To deploy using package manager:
    
    1.  Depending on your Linux distribution, install the XDR Collectors using one of the following commands, where the `<file name>` is taken from the files provided in the downloaded Linux installation package:
        
        | Distribution | Install Command |
        | --- | --- |
        | RHEL or Oracle | `yum install ./<file_name>.rpm`; `rpm -i ./<file_name>.rpm` |
        | Ubuntu or Debian | `apt-get install ./<file_name>.deb`; `dpkg -i ./<file_name>.deb` |
        | SUSE | `zypper install ./<file_name>.rpm`; `rpm -i ./<file_name>.rpm` |
        
    2.  Verify the XDR Collectors was installed on the collector machine.
        
        Enter the following command on the collector machine:
        
        `dpkg -l | grep xdr-collector` or `rpm -qa | grep xdr-collector`.
        
    
    To deploy the shell installer:
    
    1.  Enable execution of the script using the `chmod +x <file_name>.sh` command, where the `<file name>` is taken from the file provided in the downloaded Linux installation package.
        
    2.  Run the install script as root or with root permissions.
        
        For example:
        
        root@ubuntu:/home# **`chmod +x linux.sh`**								
        root@ubuntu:/home# **`./linux.sh`**
        																				Verifying archive integrity... All good.
        Uncompressing XDR-Collector version 1.0.0.467 100%
        Systemd: starting xdr-collector service
        Synchronizing state of xdr-collector.service with SysV service script with /lib/systemd/systemd-sysv-install.
        Executing: /lib/systemd/systemd-sysv-install enable xdr-collector
        Created symlink /etc/systemd/system/multi-user.target.wants/xdr-collector.service→ /lib/systemd/system/xdr-collector.service.
        						
        
    
    **Note:**
    
    If the XDR Collector does not connect to Cortex Cloud, verify your Internet connection on the collector machine. If the XDR Collector still does not connect, verify the installation package has not been removed from the Cortex Cloud management console.
    

Additional options are available to help you customize your installation if needed. The following table describes common options and parameters.

If you are using `rpm` or `deb` installers, you must also add these parameters to the `/etc/panw/collector.conf` file prior to installation.

| Option | Description |
| --- | --- |
| `--proxy-list "<proxyserver>:<port>"` | **Proxy communication** Configure the XDR Collector to communicate through an intermediary such as a proxy. To enable the XDR Collector to direct communication to an intermediary, you use this installation option to assign the IP address and port number you want the XDR Collector to use. You can also configure the proxy by entering the FQDN and port number. When you enter the FQDN, you can use both lowercase and uppercase letters. Avoid using special characters or spaces. Use double quotes (" ") to enclose the IP address and port number. Use commas to separate multiple addresses. For example: `--proxy-list "My.Network.Name:808, 10.196.20.244:8080"` After the initial installation, you can change the proxy settings from using the configuration XML. \*\*Note:\*\* The XDR Collector does not support proxy communication in environments where proxy authentication is required. |
| `--data-path <directory path>` | **Directory path** The path for persistence, content, Filebeat application data, and transaction data. `--data–path=/tmp/xdrLog` |

##### Configure the XDR Collector upgrade scheduler

You can configure the Cortex XDR Collector upgrade scheduler and the number of parallel upgrades.

**Notice:**

Requires the Data Collection add-on.

You can configure the Cortex XDR Collector upgrade scheduler and the number of parallel upgrades. There can be a maximum of 500 parallel upgrades scheduled in a week, which is the default configuration at any time of day.

To define the XDR Collector upgrade scheduler and number of parallel upgrades.

1.  In Cortex Cloud, select Settings → Configurations → XDR Collectors → Configuration.
    
2.  Set the XDR Collectors Configurations settings.
    
    -   `Amount of Parallel Upgrades`: Specify the number of parallel upgrades, where the maximum number is 500 (default).
        
    -   `Days in Week`: Select the specific days in the week that you want the upgrade to occur, where the default is configured as every day in the week.
        
    -   `Schedule`: Select whether you want the upgrade to be at Any time (default) or at a Specific time. When setting a specific time, you can set the From and To times.
        
    
3.  Click Save.

##### Set an application proxy for XDR Collectors

You can set an application-specific proxy for a Cortex XDR Collector without affecting the communication of other applications on the collector machine.

**Notice:**

Requires the Data Collection add-on.

In environments where Cortex XDR Collectors communicate with the Cortex Cloud server through a wide system proxy, you can set an application-specific proxy for the XDR Collector without affecting the communication of other applications on the collector machine. You can set the proxy after installation from the XDR Collectors Administration page in Cortex Cloud as described in this topic. You can assign up to ten different proxy servers per XDR Collector. The proxy server that the agent uses is selected randomly and with equal probability. If the communication between the XDR Collector and the Cortex Cloud server through the app-specific proxies fails, the XDR Collector resumes communication through the system-wide proxy defined on the collector machine. If that fails as well, the XDR Collector resumes communication with Cortex Cloud directly.

1.  In Cortex Cloud, select Settings → Configurations → XDR Collectors → Administration.
    
2.  If needed, filter the list of on-premise collector machines.
    
3.  Set an agent proxy.
    
    1.  Select the row of the on-premises collector machine that you want to set as a proxy.
        
    2.  Right-click the collector machine, and select Set Collector proxy.
        
    3.  You can assign up to ten different proxies per XDR Collector. For each proxy, specify the IP address and port number. After each Proxy Address and Port added, select → to add the values to a list underneath these fields. Broker VMs in the same tenant can also be configured to use as a proxy, by enabling Agent proxy in the Broker VMs.
        
    4.  Click Set when you’re done.
        
    5.  If necessary later, you can disable the collector proxy by selecting Disable Collector Proxy from the right-click menu.
        
        When you disable the proxy configuration, all proxies associated with that XDR Collector are removed. The XDR Collector resumes communication with the Cortex Cloud server through the wide-system proxy if defined; otherwise, if a wide-system is not defined, the XDR Collector resumes communicating directly with the Cortex Cloud server. If neither a wide-system proxy nor direct communication exist and you disable the proxy, the XDR Collector disconnects from Cortex Cloud.

##### Set an alias for an XDR Collector machine

Configure an alias to identify one or more collector machines by a name that is different from the collector machine hostname.

**Notice:**

Requires the Data Collection add-on.

To identify one or more collector machines by a name that is different from the collector machine hostname, you can configure an alias. You can set an alias for a single collector machine or you can set an alias for multiple collector machines in bulk. To quickly search for the collector machines during investigation and when you need to take action, you can use the either the collector machine hostname or the alias.

1.  Select Settings → Configurations → XDR Collectors → Administration.
    
2.  Select one or more collector machines.
    
3.  Right-click anywhere in the collector machine rows, and select Change Collector Alias.
    
4.  Specify the alias name and Update.
    
5.  Use the Quick Launcher to search the collector machines by alias across the XDR Collectors console.

##### Upgrade XDR Collectors

You can upgrade the Cortex XDR Collector software by using the appropriate method for the collector machine operating system.

**Notice:**

Requires the Data Collection add-on.

After you install the Cortex XDR Collector and the XDR Collector registers with Cortex Cloud, you can upgrade the XDR Collector software for on-premises Windows or Linux collector machine. You need to create a new installation packages and push the XDR Collector package to up to 500 collector machines from Cortex Cloud.

1.  Create an XDR Collector Installation Package for each operating system version where you want to upgrade the XDR Collector.
    
    Note the installation package names.
    
2.  Select Settings → XDR Collectors → Administration.
    
    If needed, filter the list of on-premises collector machines. To reduce the number of results, use the collector machine name search and filters at the top of the page.
    
3.  Select the collector machines that you want to upgrade.
    
    You can also select collector machines running different operating systems to upgrade the XDR Collectors at the same time.
    
4.  Right-click your selection, and select Upgrade Collector version.
    
    For each platform, select the name of the installation package you want to push to the selected on-premises collector machines.
    
    **Note:**
    
    The XDR Collector keeps the name of the original installation package after every upgrade.
    
5.  Upgrade.
    
    Cortex Cloud distributes the installation package to the selected collector machine at the next heartbeat communication with the XDR Collector. To monitor the status of the upgrades, go to Investigation & Response → Response → Action Center. From the Action Center you can also view additional information about the upgrade (right-click the action and select Additional data) or cancel the upgrade (right-click the action and select Cancel Collector Upgrade).

##### Uninstall the XDR Collector

You can uninstall the Cortex XDR Collector from one or more Windows or Linux collector machines at any time.

**Notice:**

Requires the Data Collection add-on.

If you want to uninstall the XDR Collector from the on-premise collector machine, you can do so from the XDR Collectors console at any time. You can uninstall the XDR Collector from an unlimited number of collector machines in a single bulk action. Uninstalling a collector machine triggers the following lifespan flow:

-   Once you uninstall the XDR Collector from the on-premise collector machine, Cortex Cloud distributes the uninstall to the selected collector machine at the next heartbeat communication with the XDR Collector. All XDR Collector files are removed from the collector machine.
    
-   The collector machine status changes to `Uninstalled`. After a retention period of 7 days, the XDR Collector is deleted from the database and is displayed in XDR as Collector Machine Name - `N/A (Uninstalled)`.
    
-   Data associated with the deleted on-premise collector machine is displayed in the Action Center tables for the standard 90 days retention period.
    

The following workflow describes how to uninstall the XDR Collector from one or more Windows or Linux on-premise collector machines.

1.  Select Settings → Configurations → XDR Collectors → Administration.
    
2.  Select the collector machines you want to uninstall.
    
    You can also select collector machines running different operating systems to uninstall the XDR Collectors at the same time.
    
3.  Right-click your selection and select Uninstall Collector.
    
4.  To proceed, select I agree to confirm that you understand this action uninstalls the XDR Collector on all selected collector machines.
    
5.  Click OK.
    
    To monitor the status of the uninstall process, go to Investigation & Response → Response → Action Center.

#### Define XDR Collector machine groups

To easily apply policy rules and manage specific collector machines, you can define a collector machine group.

**Notice:**

Requires the Data Collection add-on.

To easily apply policy rules and manage specific collector machines, you can define a collector machine group. If you set up Directory Sync, you can also leverage your Active Directory user, group, and computer information in collector machine groups.

There are two methods you can use to define a collector machine group:

-   Create a dynamic group by allowing Cortex Cloud to populate your collector machine group dynamically using collector machine characteristics, such as a partial hostname or alias; full or partial domain name; IP address, range or subnet; XDR Collector version; or operating system version.
    
-   Create a static group by selecting a list of specific collector machines.
    

After you define a collector machine group, you can then use it to target policy and actions to specific recipients. The XDR Collectors Groups page displays all collector machine groups along with the number of collector machines and policy rules linked to the collector machine group.

To define a collector machine static or dynamic group:

1.  In Cortex Cloud , select Settings → Configurations → XDR Collectors → Groups.
    
2.  Select +Add Group to create a new collector machine group.
    
3.  Specify a group name and optional description in the corresponding fields, to identify the collector machine group. The name that you assign to the group will be visible when you assign endpoint security profiles to endpoints.
    
4.  Determine the collector machine properties for creating a collector machine group:
    
    -   Dynamic: Use the filters to define the criteria you want to use to dynamically populate a collector machine group. Dynamic groups support multiple criteria selections and can use AND or OR operators. For collector machine names and aliases, and domains, you can use **`*`** to match any string of characters. As you apply filters, Cortex Cloud displays any registered collector machine matches to help you validate your filter criteria.
        
        **Note:**
        
        XDR Collectors only support IPv4 addresses.
        
    -   Static: Select specific registered collector machines that you want to include in the collector machine group. Use the filters, as needed, to reduce the number of results.
        
        When you create a static collector machine group from a file, the IP address, hostname, or alias of the collector machine must match an existing Cortex Cloud that has registered with Cortex Cloud .
        
        **Note:**
        
        Disconnecting Directory Sync in your Cortex Cloud deployment can affect existing collector machine groups and policy rules based on Active Directory properties.
        
    
5.  Create the collector machine group.
    
    After you save your collector machine group, it is ready for use to assign in policies for your collector machines and in other places where you can use collector machine groups.
    
6.  Manage a collector machine group, as needed.
    
    At any time, you can return to the XDR Collectors Endpoints page to view and manage your collector machine groups. To manage a group, right-click the group and select the desired action.
    
    -   Edit: View the collector machines that match the group definition, and optionally refine the membership criteria using filters.
        
    -   Delete the collector machine group.
        
    -   Save as new: Duplicate the collector machine group and save it as a new group.
        
    -   View collectors: Pivot from an collector machine group to a filtered list of collector machines on the Administration page where you can quickly view and initiate actions on the collector machines within the group.
        
    -   Copy text to clipboard to copy the text from a specific field in the row of a group.
        
    -   Copy entire row to copy the text from all the fields in a row of a group.
        
    -   Show rows with ‘<Group name>’ to filter the group list to only display the groups with a specific group name.
        
    -   Hide rows with ‘<Group name>’ to filter the group list to hide the groups for a specific group name.

#### About Cortex XDR Collector content updates

To quickly resolve any issues in policy, Palo Alto Networks can seamlessly deliver software packages called content updates.

**Notice:**

Requires the Data Collection add-on.

To quickly resolve any issues in policy, Palo Alto Networks can seamlessly deliver software packages for Cortex Cloud, called content updates. Content updates for XDR Collectors contain changes or updates to the Elasticsearch Filebeat infrastructure or the Elasticsearch\* Winlogbeat infrastructure.

When a new update is available, Cortex Cloud notifies the XDR Collectors. The XDR Collectors then randomly choose a time within a six-hour window during which they retrieve the content update from Cortex Cloud.

#### XDR Collector profiles

Add an XDR collector profile to define the type of data to collect from a Linux or Windows platform.

**Notice:**

Requires the Data Collection add-on.

You can add XDR collector profiles that define the type of data that is collected from Linux or Windows platforms.

##### Add an XDR Collector profile for Windows

Add a Cortex XDR Collector profile, which defines the data that is collected from a Windows collector machine, and defines automatic XDR Collector upgrade settings.

**Note:**

Ingestion of log events larger than 5 MB is not supported.

XDR Collector profiles define the data that is collected from a Windows collector machine, and define automatic upgrade settings for the XDR collector. For Windows, you can configure a Filebeat profile, a Winlogbeat profile, and a Settings profile.

-   Use an **XDR Collector Windows Filebeat profile** to collect file and log data using the Elasticsearch Filebeat default configuration file, called `filebeat.yml`.
    
    Cortex Cloud supports using Filebeat version 8.15 with the operating systems listed in the Elasticsearch support matrix that conform with the collector machine operating systems supported by Cortex Cloud. Cortex Cloud supports the input types and modules available in Elasticsearch Filebeat.
    
    **Note:**
    
    -   Fileset validation is enforced. You must enable at least one fileset in the module, because filesets are disabled by default.
        
    -   Cortex Cloud collects all logs in either an uncompressed JSON or text format. Compressed files, such as the gzip format, are not supported.
        
    -   Cortex Cloud supports logs in single line format or multiline format. For more information about handling messages that span multiple lines of text in Elasticsearch Filebeat, see [Manage Multiline Messages](https://www.elastic.co/guide/en/beats/filebeat/current/multiline-examples.html).
        
    
    Related Information
    
    -   [Elasticsearch Filebeat Overview Documentation](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-overview.html#filebeat-overview)
        
    -   [Configure Filebeat Inputs in Elasticsearch](https://www.elastic.co/guide/en/beats/filebeat/current/configuration-filebeat-options.html)
        
    -   [Configure Filebeat Modules in Elasticsearch](https://www.elastic.co/guide/en/beats/filebeat/current/configuration-filebeat-modules.html)
        
    -   [Elasticsearch Support Matrix](https://www.elastic.co/support/matrix)
        
    -   XDR Collector machine requirements and supported operating systemsXDR Collector machine requirements and supported operating systems
        
    -   Collection of Windows DHCP logs and Windows DNS Debug logs:
        
        -   Windows DHCP logsIngest Logs from Windows DHCP using Elasticsearch Filebeat
            
        -   Windows DNS Debug logs
            
        
    
-   Use an **XDR Collector Windows Winlogbeat profile** to collect event log data, using the Elasticsearch Winlogbeat default configuration file, called `winlogbeat.yml`.
    
    Cortex Cloud supports using Winlogbeat version 8.15 with the Windows versions listed in the Elasticsearch support matrix that conform with the collector machine operating systems supported by Cortex Cloud. Cortex Cloud supports the modules available in Elasticsearch Winlogbeat.
    
    After ingestion, Cortex Cloud normalizes and saves the Windows event logs collected by the Winlogbeat profile in the dataset `xdr_data`. The normalized logs are also saved in a unified format in `<vendor>_<product>_raw` if the product and vendor are defined, and otherwise, in `microsoft_windows_raw`. You can search the data using Cortex Query Language XQL queries, build correlation rules, and generate dashboards based on the data.
    
    Related information
    
    -   [Elasticsearch Winlogbeat Overview Documentation](https://www.elastic.co/guide/en/beats/winlogbeat/current/_winlogbeat_overview.html)
        
    -   [Winlogbeat Modules in ElasticSearch](https://www.elastic.co/guide/en/beats/winlogbeat/current/winlogbeat-modules.html)
        
    -   [Elasticsearch Support Matrix](https://www.elastic.co/support/matrix)
        
    -   Cortex Cloud, see XDR Collector machine requirements and supported operating systemsXDR Collector machine requirements and supported operating systems
        
    
-   Use an **XDR Collector Settings profile** to configure automatic upgrade settings for XDR Collector releases.
    

To map your XDR Collector profile to a collector machine, you must use an XDR Collector policy. After you have created your profile, map it to a new or existing policy.

How to configure XDR Collector profiles

Filebeat profile

In the Filebeat Configuration File editor, you can define the data collection for your Elasticsearch Filebeat configuration file called `filebeat.yml`.

1.  In Cortex Cloud, select Settings → Configurations → XDR Collectors → Profiles → +Add Profile → Windows.
    
2.  Select Filebeat, then click Next.
    
3.  Configure the General Information parameters.
    
    -   Profile Name: Enter a unique name to identify the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name that you enter here will be displayed in the list of profiles when you configure a policy.
        
    -   (Optional) Add description here: To provide additional context for the purpose or business reason for your new profile, enter a profile description.
        
    
4.  In the Filebeat Configuration File editing box, type or paste the contents of your configuration file, or use a template. To add a template, select one from the list, and click Add.
    
5.  Cortex Cloud supports all sections in the `filebeat.yml` configuration file, such as support for Filebeat fields and tags. You can use the "Add fields" processor to identify the product/vendor for the data collected by the XDR Collectors, so that the collected events go through the ingestion flow (Parsing Rules). To configure the product/vendor, ensure that you use the default `fields` attribute (do not use the target attribute), as shown in the following example:
    
    ```
    processors:
      - add_fields:
          fields:
            vendor: <Vendor>
            product: <Product>
    ```
    
    For more information about the "Add fields" processor, see [Add_fields](https://www.elastic.co/guide/en/beats/filebeat/current/add-fields.html).
    
6.  To finish creating your new profile, click Create.
    
    Your new profile will be listed under the applicable platform on the XDR Collectors Profiles page.
    
7.  Apply profiles to XDR Collector machine policies by performing one of the following:
    
    -   Right-click a profile, and select Create a new policy rule using this profile.
        
    -   Launch the new policy wizard from XDR Collectors → Policies → XDR Collectors Policies.
        
    

Winlogbeat profile

In the Winlogbeat Configuration File editor, you can define the data collection for your Elasticsearch Winlogbeat configuration file called `winlogbeat.yml`.

1.  In Cortex Cloud, select Settings → Configurations → XDR Collectors → Profiles → +Add Profile → Windows.
    
2.  Select Winlogbeat profile, then click Next.
    
3.  Configure the General Information parameters.
    
    -   Profile Name: Enter a unique name to identify the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name that you enter here will be displayed in the list of profiles when you configure a policy.
        
    -   (Optional) Add description here: To provide additional context for the purpose or business reason for your new profile, enter a profile description.
        
    
4.  In the Winlogbeat Configuration File editing box, type or paste the contents of your configuration file, or use the template. To add the template, click Select template, and then click Windows Security. Click Add.
    
5.  Cortex Cloud supports all sections in the `winlogbeat.yml` configuration file, such as support for Winlogbeat fields and tags. You can use the "Add fields" processor to identify the product/vendor for the data collected by the XDR Collectors, so that the collected events go through the ingestion flow (Parsing Rules). To configure the product/vendor, ensure that you use the default `fields` attribute (do not use the `target` attribute), as shown in the following example:
    
    ```
    processors:
      - add_fields:
          fields:
            vendor: <Vendor>
            product: <Product>
    ```
    
    For more information about the "Add fields" processor, see [Add_fields](https://www.elastic.co/guide/en/beats/filebeat/current/add-fields.html).
    
6.  To finish creating your new profile, click Create.
    
    Your new profile will be listed under the applicable platform on the XDR Collectors Profiles page.
    
7.  Apply profiles to XDR Collector machine policies by performing one of the following:
    
    -   Right-click a profile, and select Create a new policy rule using this profile.
        
    -   Launch the new policy wizard from XDR Collectors → Policies → XDR Collectors Policies.
        
    

Settings profile

You can configure automatic upgrades for XDR Collector releases. By default, this is disabled, and the Use Default (Disabled) option is selected. To implement automatic upgrades, follow these steps:

1.  In Cortex Cloud, select Settings → Configurations → XDR Collectors → Profiles → +Add Profile → Windows.
    
2.  Select Settings profile, then click Next.
    
3.  Configure the General Information parameters.
    
    -   Profile Name: Enter a unique name to identify the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name that you enter here will be displayed in the list of profiles when you configure a policy.
        
    -   (Optional) Add description here: To provide additional context for the purpose or business reason for your new profile, enter a profile description.
        
    
4.  Clear the Use Default (Disabled) checkbox.
    
5.  For Collector Auto-Upgrade, select Enabled.
    
    Additional fields are displayed for defining the scope of the automatic upgrade.
    
6.  Configure the scope of automatic upgrades:
    
    -   To ensure the latest XDR Collector release is used, leave the Use Default (Latest collector release) checkbox selected.
        
    -   To configure only a particular scope, perform the following steps:
        
        1.  Clear the Use Default (Latest collector release) checkbox.
            
        2.  For Auto Upgrade Scope, select one of the following options:
            
            | Option | More details |
            | --- | --- |
            | Latest collector release | Configures the scope of the automatic upgrade to whenever a new XDR Collector release is available including maintenance releases and new features. |
            | Only maintenance release | Configures the scope of the automatic upgrade to whenever a new XDR Collector maintenance release is available. |
            | Only maintenance releases in a specific version | Configures the scope of the automatic upgrade to whenever a new XDR Collector maintenance release is available for a specific version. When this option is selected, you can select the specific Release Version. |
            
        
    
7.  To finish creating your new profile, click Create.
    
    Your new profile will be listed under the applicable platform on the XDR Collectors Profiles page.
    
8.  Apply profiles to XDR Collector machine policies by performing one of the following:
    
    -   Right-click a profile, and select Create a new policy rule using this profile.
        
    -   Launch the new policy wizard from XDR Collectors → Policies → XDR Collectors Policies.
        
    

Additional XDR Collector profile management options

As needed, you can return to the XDR Collectors Profiles page to manage your XDR Collectors profiles. To manage a specific profile, right-click anywhere in an XDR Collector profile row, and select the desired action:

| Option | More details |
| --- | --- |
| Edit | Lets you edit the XDR Collector profile |
| Save As New | Copies the existing profile with its current settings, so that you can make modifications, and save it as a new profile with a unique name |
| Delete | Deletes the XDR Collector profile |
| View Collector Policies | Opens a new tab that displays the XDR Collectors Policies page, showing the policies that are currently associated with your XDR Collector profiles |
| Copy text to clipboard | Copies the text from a specific field in the row of a XDR Collector profile |
| Copy entire row | Copies the text from the entire row of a XDR Collector profile |

###### Ingest logs from Windows DHCP using Elasticsearch Filebeat

Learn how to configure Cortex Cloud to receive Windows DHCP logs.

**Notice:**

Requires the Data Collection add-on.

You can extend visibility into logs from Windows DHCP, and enrich network logs with Windows DHCP data by using one of the following data collectors with Elasticsearch Filebeat :

-   XDR Collector profile (recommended)
    
-   Windows DHCP collector
    

When Cortex Cloud begins receiving logs, it automatically creates a Windows DHCP dataset (`microsoft_dhcp_raw`). Cortex Cloud uses Windows DHCP logs to enrich your network logs with hostnames and MAC addresses. Using XQL Search, you will be able to search for these items in the `microsoft_dhcp_raw` dataset.

**Note:**

Although this enrichment is available when configuring a Windows DHCP collector for a cloud data collection integration, we recommend configuring Cortex Cloud to receive Windows DHCP logs with an XDR Collector Windows Filebeat profile, because it is simpler to set up.

Related information

-   For more information about configuring the `filebeat.yml` file, see [Elasticsearch Filebeat documentation](https://www.elastic.co/guide/en/beats/filebeat/current/configuring-howto-filebeat.html).
    

###### Ingest Windows DHCP Logs with an XDR Collector Profile

When you add an XDR Collector Windows Filebeat profile using the Elasticsearch Filebeat default configuration file, called `filebeat.yml`, you can define whether the collected data undergoes follow-up processing in the backend for Windows DHCP data. You can further enrich network logs with Windows DHCP data by setting `vendor` to `“microsoft”`, and `product` to `“dhcp”` in the `filebeat.yml` file.

**Note:**

Configuration activities include editing the `filebeat.yml` file. To avoid formatting issues in this file, use the template provided by Cortex Cloud to make your customizations. We recommend that you edit the file inside the user interface, instead of copying it and editing it elsewhere. Validate the syntax of the YML file before you finish creating your profile.

Configure Cortex Cloud to receive logs from Windows DHCP using an XDR Collector Windows Filebeat profile:

1.  In Cortex Cloud, select Settings → Configurations → XDR Collectors → Profiles → +Add Profile → Windows.
    
2.  Select Filebeat, then click Next.
    
3.  Configure the General Information parameters:
    
    -   Profile Name: Enter a unique name to identify the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name that you enter here will be displayed in the list of profiles when you configure a policy.
        
    -   (Optional) Add description here: To provide additional context for the purpose or business reason for your new profile, enter a profile description.
        
    
4.  In the Filebeat Configuration File editing box, select the DHCP template, and click Add.
    
    The template's content is displayed in the editing area.
    
5.  Edit the template text as necessary for your system.
    
6.  To finish creating your new profile, click Create.
    
    Your new profile will be listed under the applicable platform on the XDR Collectors Profiles page.
    
7.  Apply profiles to XDR Collector machine policies by performing one of the following:
    
    -   Right-click a profile, and select Create a new policy rule using this profile.
        
    -   Launch the new policy wizard from XDR Collectors → Policies → XDR Collectors Policies.
        
    

###### Ingest Windows DHCP Logs with the Windows DHCP Collector

To receive Windows DHCP logs with this collector, you must configure data collection from Windows DHCP via Elasticsearch Filebeat. This is configured by setting up a Windows DHCP Collector in Cortex Cloud and installing and configuring an Elasticsearch Filebeat agent on your Windows DHCP Server. Cortex Cloud supports using Filebeat up to version 8.0.1 with the Windows DHCP Collector.

Certain settings in the Elasticsearch Filebeat default configuration file called `filebeat.yml` must be populated with values provided when you configure the settings in Cortex Cloud for the Windows DHCP Collector. To help you configure the `filebeat.yml` file correctly, Cortex Cloud provides an example file that you can download and customize. After you set up collection integration, Cortex Cloud begins receiving new logs and data from the source.

Windows DHCP logs are stored as CSV (comma-separated values) log files. The logs rotate by days (`DhcpSrvLog-<day>.log`), and each file contains two sections: `Event ID Meaning`, and the events list.

**Note:**

Configuration activities include editing the `filebeat.yml` file. To avoid formatting issues in this file, use the example file provided by Cortex Cloud to make your customizations. Do not copy and paste the code syntax examples provided later in this procedure into your `filebeat.yml` file. Validate the syntax of the YML file before you finish creating your profile.

Configure Cortex Cloud to receive logs from Windows DHCP via Elasticsearch Filebeat with the Windows DHCP collector:

1.  In Cortex Cloud, configure the Windows DHCP Collector.
    
    2.  Click Add Instance to begin a new configuration.
        
    3.  Search for `Windows DHCP`.
        
    4.  In the Windows DHCP collector box, click Connect.
        
        The Enable Windows DHCP Log Collection dialog box is displayed.
        
    5.  (Optional, but recommended) Download the example `filebeat.yml` file.
        
        To help you configure your `filebeat.yml` file correctly, Cortex Cloud provides an example `filebeat.yml` file that you can download and customize. To download this file, click the filebeat.yml link provided in this dialog box.
        
    6.  In the Name field, specify a descriptive name for your log collection configuration.
        
    7.  Click Save & Generate Token. A key is displayed.
        
        Click the copy icon next to the key, and save the copy somewhere safe. You will need to provide this key when you set the `api_key` value in the Elasticsearch Output section in the `filebeat.yml` file, as explained in **Step #2**. If you forget to record the key and close the window, you will need to generate a new key and repeat this process.
        
    8.  Click Done to close the dialog box.
        
    9.  Expand the Windows DHCP collector that you just created. Click the Copy api url icon, and save the copy somewhere safe. You will need to provide this URL when you set the `hosts` value in the Elasticsearch Output section in the `filebeat.yml` file, as explained in **Step #2**.
        
2.  On your Windows DHCP Server, configure an Elasticsearch Filebeat agent.
    
    1.  Navigate to the Elasticsearch Filebeat installation directory, and open the `filebeat.yml` file to configure data collection with Cortex Cloud. We recommend that you use the download example file provided by Cortex Cloud.
        
    2.  Update the following sections and tags in the `filebeat.yml` file. The following code examples detail the specific sections to make these changes in the file.
        
        -   **Filebeat inputs**: Define the paths to crawl and fetch. The code in the example below shows how to configure the Filebeat inputs section in the `filebeat.yml` file with these paths configured.
            
            Example 144. Example
            
            ```
            # ============================== Filebeat inputs ===============================
            filebeat.inputs:
              # Each - is an input. Most options can be set at the input level, so
              # you can use different inputs for various configurations.
              # Below are the input specific configurations.
              - type: log  
                # Change to true to enable this input configuration.  
                enabled: true  
                # Paths that should be crawled and fetched. Glob based paths.  
                paths:       
                  - c:\\Windows\\System32\\dhcp\\DhcpSrvLog\*.log    
            ```
            
              
            
        -   **Elasticsearch Output**: Set the `hosts` and `api_key`, where both of these values were obtained when you configured the Windows DHCP Collector in Cortex Cloud, as explained in **Step #1**. The following code example shows how to configure the Elasticsearch Output section in the `filebeat.yml` file, and indicates which settings need to be obtained from Cortex Cloud.
            
            Example 145. Example
            
            ```
            # ---------------------------- Elasticsearch Output ----------------------------
            output.elasticsearch:  
              enabled: true  
              # Array of hosts to connect to.    
              hosts: ["OBTAIN THIS URL FROM CORTEX XDR"]  
              # Protocol - either \`http\` (default) or \`https\`.  
              protocol: "https"  
              compression_level: 5  
              # Authentication credentials - either API key or username/password. 
              api_key: "OBTAIN THIS KEY FROM CORTEX XDR"
            ```
            
              
            
        -   **Processors**: Set the `tokenizer` and add a `drop_event processor` to drop all events that do not start with an event ID. The code in the example below shows how to configure the Processors section in the `filebeat.yml` file and indicates which settings need to be obtained from Cortex Cloud.
            
            **Note:**
            
            The `tokenizer` definition is dependent on the Windows server version that you are using, because the log format differs.
            
            -   For platforms earlier than Windows Server 2008, use `"%{id},%{date},%{time},%{description},%{ipAddress},%{hostName},%{macAddress}"`
                
            -   For Windows Server 2008 and 2008 R2, use `"%{id},%{date},%{time},%{description},%{ipAddress},%{hostName},%{macAddress},%{userName},%{transactionID},%{qResult},%{probationTime},%{correlationID}"`
                
            -   For Windows Server 2012 and later, use `"%{id},%{date},%{time},%{description},%{ipAddress},%{hostName},%{macAddress},%{userName},%{transactionID},%{qResult},%{probationTime},%{correlationID},%{dhcid},%{vendorClassHex},%{vendorClassASCII},%{userClassHex},%{userClassASCII},%{relayAgentInformation},%{dnsRegError}"`
                
            
            Example 146. Example
            
            ```
            # ================================= Processors =================================
            processors:  
              - add_host_metadata:      
                when.not.contains.tags: forwarded  
              - drop_event.when.not.regexp.message: "^[0-9]+,.\*"  
              - dissect:       
                tokenizer: "%{id},%{date},%{time},%{description},%{ipAddress},%{hostName},%{macAddress},%{userName},%{transactionID},%{qResult},%{probationTime},%{correlationID},%{dhcid},%{vendorClassHex},%{vendorClassASCII},%{userClassHex},%{userClassASCII},%{relayAgentInformation},%{dnsRegError}"  
              - drop_fields:       
                fields: ["message"]  
              - add_locale: ~
              - rename:
                  fields:
                    - from: "event.timezone"
                      to: "dissect.timezone"
                  ignore_missing: true
                  fail_on_error: false
              - add_cloud_metadata: ~  
              - add_docker_metadata: ~  
              - add_kubernetes_metadata: ~
            ```
            
              
            
        
3.  Verify the status of the integration.
    
    Return to the integrations page in Cortex Cloud, and view the statistics for the log collection configuration.
    
4.  After Cortex Cloud begins receiving logs from Windows DHCP via Elasticsearch Filebeat, you can use XQL Search to search for logs in the new `microsoft_dhcp_raw` dataset.

###### Ingest Windows DNS debug logs using Elasticsearch Filebeat

Extend Cortex Cloud visibility into Windows DNS Debug logs using Elasticsearch Filebeat with an XDR Collectors profile.

Extend Cortex Cloud visibility into Windows DNS Debug logs using an XDR Collector Windows Filebeat profile.

During configuration of an XDR Collector Windows Filebeat profile, you can configure the profile to enrich network logs with Windows DNS Debug log data. You do this by editing the Elasticsearch Filebeat default configuration file called `filebeat.yml`. In this file, you can define whether the collected data undergoes follow-up processing in the backend for Windows DNS Debug log data. Cortex Cloud uses Windows DNS Debug logs to enrich network logs. These logs can be searched, using XQL Search. You can search the Windows DNS Debug Cortex Query Language dataset (`microsoft_dns_raw`) for raw data, and the normalized stories using the `xdr_data` dataset with the preset called `network_story`.

1.  Enable DNS debug logging in your Windows DNS server settings:
    
    1.  In Windows, open DNS Manager, right-click your Windows DNS Server, and select Properties.
        
    2.  Select Debug Logging → Log packets for debugging, and keep the settings that are automatically configured for collecting regular Windows DNS logs in the Packet direction and Packet contents sections.
        
    3.  (Optional) To collect detailed Windows DNS logs, under the Other options section, select Details.
        
        **Note:**
        
        Detailed logs are significantly larger, because more information is added to the logs.
        
    4.  In the Log file section, for File path and name , enter the file path and log name of your Windows DNS logs, such as `c:\Windows\System32\dns\DNS.log`. This path will also be configured in your `filebeat.yml` file, as explained in a later step (see Example 147, “Example”).
        
    5.  Click OK.
        
2.  In Cortex Cloud, go to Settings → Configurations → XDR Collectors → Profiles → +Add Profile → Windows.
    
3.  Select Filebeat, then click Next.
    
4.  Configure the General Information parameters:
    
    -   Profile Name: Enter a unique name to identify the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name that you enter here will be displayed in the list of profiles when you configure a policy.
        
    -   (Optional) Add description here: To provide additional context for the purpose or business reason for your new profile, enter a profile description.
        
    
5.  In the Filebeat Configuration File editing box, select the DNS template of your choice (detailed, or non-detailed). If you configured detailed collection in the Windows DNS Manager, select the detailed DNS template here. Click Add.
    
    The template's content is displayed in the editing area.
    
6.  Configure the `filebeat.yml` file to collect Windows DNS Debug log data.
    
    1.  In the `filebeat.inputs:` section of the file, for `paths:`, configure the file path to your Windows DNS Debug logs. This file path must be the same as the one configured in your Windows DNS server settings, as explained in an earlier step.
        
    2.  Set `vendor` to `“microsoft”` and `product` to `“dns”`.
        
    
    The following examples show how to configure the `filebeat.yml` file to normalize Windows DNS Debug logs with an XDR Collector.
    
    **Note:**
    
    To avoid formatting issues in your `filebeat.yml` file, we recommend that you validate the syntax of the file.
    
    Example 147. Example
    
    Example for non-detailed (regular) Windows DNS log collection:
    
    ```
    filebeat.inputs:
    - type: filestream
      enabled: true
      paths:
        -  c:\\Windows\\System32\\dns\\DNS.log
      processors:
        - add_fields:
            fields: 
              vendor: "microsoft"
              product: "dns"
    ```
    
      
    
    Example 148. Example
    
    Example for detailed Windows DNS log collection:
    
    ```
    filebeat.inputs:
    - type: log
      enabled: true
      paths:
        -  c:\\Windows\\System32\\dns\\DNS.log
      multiline.type: pattern
      multiline.pattern: '^(?:\\d{1,2}\\/){2}\\d{4}\\s(?:\\d{1,2}\\:){2}\\d\\d\\s(?:AM|PM)'
      multiline.negate: true
      multiline.match: after
      processors:
        - add_fields:
            fields: 
              vendor: "microsoft"
              product: "dns"
    ```
    
      
    
7.  To finish creating your new profile, click Create.
    
    Your new profile will be listed under the applicable platform on the XDR Collectors Profiles page.
    
8.  Apply profiles to XDR Collector machine policies by performing one of the following:
    
    -   Right-click a profile, and select Create a new policy rule using this profile.
        
    -   Launch the new policy wizard from XDR Collectors → Policies → XDR Collectors Policies.

##### Add an XDR Collector profile for Linux

Add a Cortex XDR Collector profile, which defines the data that is collected from a Linux collector machine, and defines automatic XDR Collector upgrade settings.

**Note:**

Ingestion of log events larger than 5 MB is not supported.

An XDR Collector Linux profile defines the data that is collected from a Linux collector machine. For Linux, you can configure a Filebeat profile and a Settings profile.

-   Use an **XDR Collector Linux Filebeat profile** to collect file and log data using the Elasticsearch Filebeat default configuration file, called `filebeat.yml`.
    
    Cortex Cloud supports using Filebeat version 8.15 with the operating systems listed in the Elasticsearch Support Matrix that conform with the collector machine operating systems supported by Cortex Cloud. Cortex Cloud supports the input types and modules available in Elasticsearch Filebeat.
    
    **Note:**
    
    -   Fileset validation is enforced. You must enable at least one fileset in the module, because filesets are disabled by default.
        
    -   Cortex Cloud collects all logs in either an uncompressed JSON or text format. Compressed files, such as the gzip format, are not supported.
        
    -   Cortex Cloud supports logs in single line format or multiline format. For more information about handling messages that span multiple lines of text in Elasticsearch Filebeat, see [Manage Multiline Messages](https://www.elastic.co/guide/en/beats/filebeat/current/multiline-examples.html).
        
    
    Related Information
    
    -   [Elasticsearch Filebeat Overview Documentation](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-overview.html#filebeat-overview)
        
    -   [Configure Filebeat Inputs in Elasticsearch](https://www.elastic.co/guide/en/beats/filebeat/current/configuration-filebeat-options.html)
        
    -   [Configure Filebeat Modules in Elasticsearch](https://www.elastic.co/guide/en/beats/filebeat/current/configuration-filebeat-modules.html)
        
    -   [Elasticsearch Support Matrix](https://www.elastic.co/support/matrix)
        
    -   XDR Collector machine requirements and supported operating systemsXDR Collector machine requirements and supported operating systems
        
    
-   Use an **XDR Collector Settings profile** to configure automatic upgrade settings for XDR Collector releases.
    

To map your XDR Collector profile to a collector machine, you must use an XDR Collector policy. After you have created your profile, map it to a new or existing policy.

How to configure XDR Collector profiles

Filebeat profile

In the Filebeat Configuration File editor, you can define the data collection for your Elasticsearch Filebeat configuration file called `filebeat.yml`.

1.  In Cortex Cloud, select Settings → Configurations → XDR Collectors → Profiles → +Add Profile → Linux.
    
2.  Select Filebeat, then click Next.
    
3.  Configure the General Information parameters.
    
    -   Profile Name: Enter a unique name to identify the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name that you enter here will be displayed in the list of profiles when you configure a policy.
        
    -   (Optional) Add description here: To provide additional context for the purpose or business reason for your new profile, enter a profile description.
        
    
4.  In the Filebeat Configuration File editing box, type or paste the contents of your configuration file, or use a template. To add a template, select one from the list, and click Add.
    
5.  Cortex Cloud supports all sections in the `filebeat.yml` configuration file, such as support for Filebeat fields and tags. You can use the "Add fields" processor to identify the product/vendor for the data collected by the XDR Collectors, so that the collected events go through the ingestion flow (Parsing Rules). To configure the product/vendor, ensure that you use the default `fields` attribute (do not use the target attribute), as shown in the following example:
    
    ```
    processors:
      - add_fields:
          fields:
            vendor: <Vendor>
            product: <Product>
    ```
    
    For more information about the "Add fields" processor, see [Add_fields](https://www.elastic.co/guide/en/beats/filebeat/current/add-fields.html).
    
6.  To finish creating your new profile, click Create.
    
    Your new profile will be listed under the applicable platform on the XDR Collectors Profiles page.
    
7.  Apply profiles to XDR Collector machine policies by performing one of the following:
    
    -   Right-click a profile, and select Create a new policy rule using this profile.
        
    -   Launch the new policy wizard from XDR Collectors → Policies → XDR Collectors Policies.
        
    

Settings profile

You can configure automatic upgrades for XDR Collector releases. By default, this is disabled, and the Use Default (Disabled) option is selected. To implement automatic upgrades, follow these steps:

1.  In Cortex Cloud, select Settings → Configurations → XDR Collectors → Profiles → +Add Profile → Linux.
    
2.  Select Settings profile, then click Next.
    
3.  Configure the General Information parameters.
    
    -   Profile Name: Enter a unique name to identify the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name that you enter here will be displayed in the list of profiles when you configure a policy.
        
    -   (Optional) Add description here: To provide additional context for the purpose or business reason for your new profile, enter a profile description.
        
    
4.  Clear the Use Default (Disabled) checkbox.
    
5.  For Collector Auto-Upgrade, select Enabled.
    
    Additional fields are displayed for defining the scope of the automatic upgrade.
    
6.  Configure the scope of automatic upgrades:
    
    -   To ensure the latest XDR Collector release is used, leave the Use Default (Latest collector release) checkbox selected.
        
    -   To configure only a particular scope, perform the following steps:
        
        1.  Clear the Use Default (Latest collector release) checkbox.
            
        2.  For Auto Upgrade Scope, select one of the following options:
            
            | Option | More details |
            | --- | --- |
            | Latest collector release | Configures the scope of the automatic upgrade to whenever a new XDR Collector release is available including maintenance releases and new features. |
            | Only maintenance release | Configures the scope of the automatic upgrade to whenever a new XDR Collector maintenance release is available. |
            | Only maintenance releases in a specific version | Configures the scope of the automatic upgrade to whenever a new XDR Collector maintenance release is available for a specific version. When this option is selected, you can select the specific Release Version. |
            
        
    
7.  To finish creating your new profile, click Create.
    
    Your new profile will be listed under the applicable platform on the XDR Collectors Profiles page.
    
8.  Apply profiles to XDR Collector machine policies by performing one of the following:
    
    -   Right-click a profile, and select Create a new policy rule using this profile.
        
    -   Launch the new policy wizard from XDR Collectors → Policies → XDR Collectors Policies.
        
    

Additional XDR Collector profile management options

As needed, you can return to the XDR Collectors Profiles page to manage your XDR Collectors profiles. To manage a specific profile, right click anywhere in an XDR Collector profile row, and select the desired action:

| Option | More details |
| --- | --- |
| Edit | Lets you edit the XDR Collector profile |
| Save As New | Copies the existing profile with its current settings, so that you can make modifications, and save it as a new profile with a unique name |
| Delete | Deletes the XDR Collector profile |
| View Collector Policies | Opens a new tab that displays the XDR Collectors Policies page, showing the policies that are currently associated with your XDR Collector profiles |
| Copy text to clipboard | Copies the text from a specific field in the row of a XDR Collector profile |
| Copy entire row | Copies the text from the entire row of a XDR Collector profile |

#### Apply profiles to collection machine policies

Enable a Cortex XDR Collector profile by mapping it to a policy.

**Notice:**

Requires the Data Collection add-on.

Enable a Cortex XDR Collector profile by mapping it to a policy. Each policy that you create must apply to one or more collector machines or collector machine groups.

1.  In Cortex Cloud, do one of the following:
    
    -   To create a policy from scratch on the XDR Collectors Policies page, select Settings → Configurations → XDR Collectors → Policies → +Add Policy.
        
    -   To add a profile to an existing policy, select Settings → Configurations → XDR Collectors → Policies, then right-click the policy that you want to edit, and select Edit.
        
    -   To create a new policy from a profile on the XDR Collectors Profiles page, select Settings → Configurations → XDR Collectors → Profiles, right-click the profile, and select Create a new policy rule using this profile.
        
    
2.  Configure the General settings for the policy:
    
    1.  Policy Name: Enter a unique name to identify the policy. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name that you enter here will be displayed when you view and configure policies.
        
    2.  (Optional) Description: To provide additional context for the purpose or business reason for your policy, enter a policy description.
        
    3.  Platform: Select the operating system of the XDR Collector machines that will use the policy.
        
    4.  Select the profiles that you want to map to the policy. If you do not specify a profile, the XDR Collector uses the Default profile.
        
    5.  Click Next.
        
3.  On the XDR Collectors Endpoints page, select the XDR Collectors (endpoints) or XDR Collector groups to which you want to map the policy. You can use the provided filters to find XDR Collectors listed on this page.
    
    Cortex Cloud automatically applies a filter for the platform that you selected in the previous step. To change the platform, go Back to the general policy settings.
    
4.  Click Next.
    
5.  On the Summary page, review the settings that you configured for the new policy.
    
    If everything is correct, click Done. Otherwise, click Back to make changes.
    
6.  (Optional) If necessary, change a policy's position relative to other policies in the table on the XDR Collectors Policies page.
    
    The XDR Collector evaluates policies from top to bottom. When an XDR Collector finds the first match, it applies that policy as the active policy. To change the policy order, click and drag the arrows in the Name cell of a policy to the desired location in the policy hierarchy.
    

##### Additional XDR Collector policy management options

As needed, you can return to the XDR Collectors Policies page to manage your XDR Collector policies. To manage a specific policy, right-click anywhere in an XDR Collector policy row, and select the desired action. You cannot delete or disable default policies.

| Option | More details |
| --- | --- |
| Disable | Disables the selected XDR Collector policy |
| Delete | Deletes the selected XDR Collector policy |
| View Policy Details | Opens a new dialog box that displays details about the profiles mapped to the policy |
| Save As New | Copies the existing policy with its current settings, so that you can make modifications, and save it as a new policy with a different name |
| Edit | Lets you edit the XDR Collector policy |
| Copy text to clipboard | Copies the text from a specific field in the row of a XDR Collector policy |
| Copy entire row | Copies the text from the entire row of a XDR Collector policy |

#### XDR Collector datasets

After Cortex Cloud begins receiving data from your XDR Collectors configuration, the app automatically creates an XQL dataset.

**Notice:**

Requires the Data Collection add-on.

After Cortex Cloud begins receiving data from your XDR Collectors configuration that are dedicated for on-premises data collection on Windows and Linux machines.

-   For Filebeat, the app automatically creates an Cortex Query Language (XQL) dataset of event logs using the vendor name and the product name specified in the configuration file section of the Filebeat profile. The dataset name follows the format `<vendor>_<product>_raw`. If not specified, Cortex Cloud automatically creates a new default dataset in the format `<module>_<module>_raw` or `<input>_<input>_raw`. For example, if you are using the NGINX module, the dataset is called `nginx_nginx_raw`.
    
-   For Winlogbeat, the app automatically creates an XQL dataset of event logs using the vendor name and the product name specified in the configuration file section of the Winlogbeat profile. The dataset name follows the format `<vendor>_<product>_raw`. If not specified, Cortex Cloud automatically creates a new default dataset, `microsoft_windows_raw`, for event log collection. Winlogbeat data is also normalized to `xdr_data` (and thus the `xdr_event_log` preset).
    

After Cortex Cloud creates the dataset, you can search for your XDR Collector data using XQL Search.

#### Troubleshoot XDR Collectors errors

Learn more about how to verify the XDR Collectors application, connectivity, and processing errors and troubleshoot.

You can monitor your XDR Collectors application, connectivity, and processing errors for supported collectors using the Cortex Query Language (XQL) and the `collection_auditing` dataset, and by creating correlation rules to trigger collection security issues, and by creating correlation rules to trigger collection security issues. For a number of these errors and warnings, a recommended action is provided so that you can easily resolve the problem.

Where can I trace the status changes of XDR Collectors?

Querying the `collection_auditing` dataset can help you see all the connectivity changes of an instance over time, the escalation or recovery of the connectivity status (classification), and the error, warning, and informational messages related to status changes.

You can use the `collection_auditing` dataset to monitor XDR Collectors. For example, you can query the `collection_auditing` dataset to understand what error was thrown, and then use the troubleshooting table provided in Understand how to troubleshoot to resolve the problem. Once the problem is resolved, you can ensure the collector is active again by querying the `collection_auditing` dataset. The example below explains the different status changes on a collector that can be used to help you troubleshoot the collector's connectivity issues.

When the `collection_auditing` dataset receives a new entry with an Error or Warning classification, a corresponding health issue is automatically generated for the collector. Errors map to High severity and Warnings map to Medium severity. These alerts are dedicated to XDR Collectors (XDRC), include collector details (ID, hostname, and IP address), and are deduplicated if identical alerts are generated within four hours for a given collector.

Example 149. 

This example searches for status changes related to XDR Collectors, where the `instance` is `A1786452WIN1001`:

```
dataset = collection_auditing 
|filter  instance = "A1786452WIN1001"
```

Output results:

The results indicate that the collector was connected on Oct 18th 2025 08:23:07. On Oct 24th 2025 11:57:38, this collector had an application error as the Winlogbeat was not running. On Oct 24th 2025 19:15:44, this collector had another application error as the Filebeat was not running. On Oct 25th 2025 09:47:03, a warning message was displayed that this collector had no incoming data for more than 7 days. All of these issues were finally resolved on Oct 27th 2025 12:53:18 when the collector was back to a connected status.

| COLLECTOR_TYPE | INSTANCE | CLASSIFICATION | DESCRIPTION | COLLECTOR_ID | COLLECTOR_INTERNAL_IP | COLLECTOR-HOST_NAME | _TIME |
| --- | --- | --- | --- | --- | --- | --- | --- |
| XDRC | A1786452WIN1001 | Informational | Connected | 58999fc7ff264a3698274e40043ea829 |   | A1786452WIN1001 | Oct 27th 2025 12:53:18 |
| XDRC | A1786452WIN1001 | Warning | No incoming data for more than 7 days | 58999fc7ff264a3698274e40043ea829 |   | A1786452WIN1001 | Oct 25th 2025 09:47:03 |
| XDRC | A1786452WIN1001 | Error | filebeat is not running , error code: 1, b'Exiting: no modules or inputs enabled and configuration reloading disabled. What files do you want me to watch?\\n' | 58999fc7ff264a3698274e40043ea829 |   | A1786452WIN1001 | Oct 24th 2025 19:15:44 |
| XDRC | A1786452WIN1001 | Error | winlogbeat is not running , error code: 1, b"Exiting: error reading configuration file: 1 error: at least one event log must be configured as part of event_logs accessing 'winlogbeat' (source:'command line flag')\\n" | 58999fc7ff264a3698274e40043ea829 |  | A1786452WIN1001 | Oct 24th 2025 11:57:38 |
| XDRC | A1786452WIN1001 | Informational | Connected | 58999fc7ff264a3698274e40043ea829 |  | A1786452WIN1001 | Oct 18th 2025 08:23:07 |

  

How can I set up correlation rules to trigger collection health issues?

You can create correlation rules that are based on the fields in the `collection_auditing` dataset, so you are notified whenever the status of XDR Collectors changes to an error and warning.

Example 150. Example: Trigger collection issues for error statuses on XDR Collectors

In this example, a correlation rule triggers an issue if the collector changes to an error status.

Example XQL:

```
dataset = collection_auditing 
|filter classification = "Error" and instance = "A1786452WIN1001"
```

Additional fields to specify in the correlation rule:

| Field | Value |
| --- | --- |
| Time Schedule | Hourly |
| Query time frame | 1 Hour |
| Issue Suppression | Select Enable issue suppression. |
| Action | Select Generate issue. |
| Issue Domain | Health |
| Severity | For errors, select High, and for warnings, select Medium. |
| Type | Collection |

  

Understand how to troubleshoot

To help you troubleshoot your XDR Collectors, the table below lists some of the main possible warning and error event types, which is the description displayed in the `collection_auditing` dataset, the root cause of the problem, and the recommended action to resolve the problem. We recommend that you use this table as a first resource to troubleshoot your application, connectivity, and processing errors.

| XDRC Log Collector Type | Event Type | Message in the XDR Collectors Administration Page and Description in the collection_auditing dataset | Root Cause | Recommended Action |
| --- | --- | --- | --- | --- |
| Filebeat | Error | ERROR [reader] reader/reader.go:<line number> Line is larger than max_bytes (10485760): <...log line content...>write error: data size (<number of bytes> bytes) is greater than the max file size (10485760 bytes) | The line in the monitored file is too long | You can set a new maximum size limit on the profile. Example 151. This increases the maximum line size to 20 MB so `message_max_bytes` is 20971520. filebeat.inputs: - type: filestream id: my-app-logs enabled: true paths: - /var/log/my-app/\*.log # |
| Filebeat | Error | Filebeat is not running , error code: 1, b'Exiting: error loading config file: yaml: line <line number>: found unknown escape character\\n' | The filebeat YAML file contains a path that is wrapped with double quotes, but only contains single backslashes, such as: `“C:\windows\somefile.log”` | Use double backslashes after windows when using double quotes: “C:\\windows\\\\somefile.log” OR Put path in single quotes: ‘C:\\windows\\\\somefile.log’ |
| Filebeat / Winlogbeat | Warning | Filebeat / Winlogbeat not installed | The Filebeat / Winlogbeat file is missing at the content folder:"C:\\ProgramData\\XDR Collector\\Data\\content\\filebeat-windows-x86_64\\filebeat.exe""C:\\ProgramData\\XDR Collector\\Data\\content\\winlogbeat-windows-x86_64\\winlogbeat.exe" | Stop the collector.; Delete the Data folder.; Start the collector. |
| Filebeat / Winlogbeat | Error | Error: Filebeat.Winlogbeat is not running , error code: 1, b' Exiting: no modules or inputs enabled and configuration reloading disabled. What files do you want me to watch?\\n' | The Filebeat / Winlogbeat profile does not contain a valid YAML it can process. | Check that the policy has a valid profile with a valid YAML configuration. |
| XDRC | Warning | No incoming data for more than 24 hours | The Filebeat / Winlogbeat didn't upload new data in the last 24 hours since the last upload. | Check why the configured files no longer receive log files to upload. |
| XDRC | Warning | No incoming data for more than 7 days | The Filebeat / Winlogbeat didn't upload new data for the last 7 days since the last upload. | Check why the configured files no longer receive log files to upload. |
| XDRC | Error | file filebeat.yml . winlogbeat.yml couldn’t be found | The configuration file `filebeat.yml` / `winlogbeat.yml` is missing. | Stop the collector.; Delete the Data folder.; Start the collector. |
| XDRC | Error | Winlogbeat: The config file winlogbeat.yml  is missing read or write permissions; Filebeat: The config file filebeat.yml  is missing read or write permissions | The configuration file `filebeat.yml` / `winlogbeat.yml` is missing is missing read or write permissions. | Stop the collector.; Add Read / Write Permissions.; Start the collector. |
| XDRC | Error | Error: HTTP POST request failed, through proxy:{'http': '<IP number>', 'https': ' | The collector is configured to use a proxy that returned a 503 HTTP error. This usually indicates a server error. | If you own the proxy, check it. If the error appears to be from a Cortex Cloud tenant, open a support ticket for the server team. |

## Palo Alto Networks integrations

Cortex Cloud supports data ingestion from other Palo Alto Networks products.

**Notice:**

Data collection may require an add-on.

Cortex Cloud supports streaming data directly from Prisma Access accounts, Next-Generation Firewalls (NGFW), and Panorama devices to your Cortex Cloud tenants using the Strata Logging Service.

New tenants (and tenants upgraded from XDR to XSIAM) will work with the new direct integration of Next-Generation Firewall and Panorama into Cortex. For such tenants, there’s no option to use the Strata Logging Service integration.

For tenants where customers have integrated directly with Strata Logging Service, the configured integrations, such as Next-Generation Firewall and Prisma Access, can be migrated to Cortex Cloud in either of the following ways before the license expires:

-   More than two weeks before the license for existing integrations with Strata Logging Service expires, manually migrate the integrations, using the corresponding Migrate Devices buttons on the Data Sources & Integrations page. Make sure you select all your devices to connect directly to Cortex Cloud.
    
-   Two weeks prior to the end of your Strata Logging Service license, Cortex Cloud will automatically migrate your integrations to your Strata Logging Service.
    
    **Note:**
    
    Roll-back of Strata Logging Service integration migration is not supported.

### About Palo Alto Networks integrations

Stream data directly from other Palo Alto Networks products to Cortex Cloud.

Cortex Cloud supports streaming data directly from Prisma Access accounts, Next-Generation Firewalls (NGFW), and Panorama devices to your Cortex Cloud tenants using the Strata Logging Service.

Ensure you have deployed Panorama and NGFW, and hold Super User permissions to your Customer Support Account (CSP).

After your tenant has been activated, navigate to the Data Sources & Integrations page to configure your integrations. All devices and accounts allocated to your CSP accounts are available to integrate.

**Note:**

For Palo Alto Networks Integrations there is an option to turn on or off the collection of URL and File log types. For more information, see Collecting URL and File log types.

New tenants (and tenants upgraded from XDR to XSIAM) will work with the new direct integration of Next-Generation Firewall and Panorama into Cortex. For such tenants, there’s no option to use the Strata Logging Service integration.

For tenants where customers have integrated directly with Strata Logging Service, the configured integrations, such as Next-Generation Firewall and Prisma Access, can be migrated to Cortex Cloud in either of the following ways before the license expires:

-   More than two weeks before the license for existing integrations with Strata Logging Service expires, manually migrate the integrations, using the corresponding Migrate Devices buttons on the Data Sources & Integrations page. Make sure you select all your devices to connect directly to Cortex Cloud.
    
-   Two weeks prior to the end of your Strata Logging Service license, Cortex Cloud will automatically migrate your integrations to your Strata Logging Service.
    
    **Note:**
    
    Roll-back of Strata Logging Service integration migration is not supported.

### Next-Generation Firewall

Learn more ingesting firewall data from your Next-Generation Firewall (NGFW) and Panorama devices in Cortex Cloud.

You can configure collecting Next-Generation Firewall logs and data using an integration configured in Data Sources & Integrations or from Marketplace:

| Next-Generation Firewall | Description |
| --- | --- |
| Data Source overview | You can forward firewall data from your Next-Generation Firewall (NGFW) and Panorama devices to Cortex Cloud. |
| Link to Data Source instructions | Ingest data from Next-Generation Firewall; Ingest Next-Generation Firewall logs using the Syslog collector |
| Links to content pack/integration details | The [PAN-OS by Palo Alto Networks](https://cortex.marketplace.pan.dev/marketplace/details/PANOS/) content pack manages Palo Alto Networks Firewalls and Panorama via API, allowing users to create, modify, and manage custom security policies, perform configuration commits, manage dynamic lists, perform system upgrades, and query various log types. It contains various playbooks, a classifier (Panorama Classifier) and mapper (Panorama Mapper), issue fields, issue types, and automations/scripts. It also includes the following integration: [Palo Alto Networks PAN-OS](https://xsoar.pan.dev/docs/reference/integrations/panorama): Use this integration to manage Palo Alto Networks Firewall and Panorama, including managing Prisma Access through Panorama, creating and managing security policies, and querying logs. This integration includes commands for managing the master key, checking dynamic updates status, downloading and installing various dynamic updates (for example, AntiVirus, WildFire, GlobalProtect Clientless VPN), listing and deleting policy rules (including new types like application-override, authentication, decryption, nat, and pbf), managing addresses and URL categories, retrieving rule hit counts, disabling rules, and performing hygiene checks on various security profiles and configurations. |

#### Ingest data from Next-Generation Firewall

Learn how to ingest detection data from Next-Generation Firewall and Panorama.

**Notice:**

Requires the Data Collection add-on.

You can forward firewall data from your Next-Generation Firewall (NGFW) and Panorama devices to Cortex Cloud.

Collection of firewall data from multiple accounts is supported. Super User permissions on both the Cortex Cloud tenant accounts and the NGFW or Panorama accounts are required for this use case.

When you onboard through Panorama, the firewalls are sending the logs directly. As a result, you may need to enable duplicate logging on the firewalls to send to both cloud logging and Panorama.

New tenants (and tenants upgraded from XDR to XSIAM) will work with the new direct integration of Next-Generation Firewall and Panorama into Cortex. For such tenants, there’s no option to use the Strata Logging Service integration.

For tenants where customers have integrated directly with Strata Logging Service, the configured integrations, such as Next-Generation Firewall and Prisma Access, can be migrated to Cortex Cloud in either of the following ways before the license expires:

-   More than two weeks before the license for existing integrations with Strata Logging Service expires, manually migrate the integrations, using the corresponding Migrate Devices buttons on the Data Sources & Integrations page. Make sure you select all your devices to connect directly to Cortex Cloud.
    
-   Two weeks prior to the end of your Strata Logging Service license, Cortex Cloud will automatically migrate your integrations to your Strata Logging Service.
    
    **Note:**
    
    Roll-back of Strata Logging Service integration migration is not supported.
    

**Prerequisite:**

Ensure that you have completed the following on the NGFW or Panorama side:

-   For Panorama only, ensure that the Panorama Cloud Services plugin is installed.
    
-   Enable log forwarding profiles on firewall rules.
    

On the Cortex Cloud side, ensure that you have user role permissions for Data Collection > Data Sources & Integrations.

Configuration of data ingestion from multiple accounts requires Super User permissions on both the Cortex Cloud tenant and on the device accounts.

**Note**: Cross CSP (Cloud Service Provider) is supported only within the same SFDC hierarchy. Consequently, MSSP use cases where the customer owns one end of the solution are not supported.

**Note:**

If your firewalls are located in a different region, or bandwidth issues are encountered due to large log size, you can ingest NGFW logs in CEF format, using the Syslog collector. However, the Syslog solution is not as powerful nor as comprehensive as this data collector, and should only be used when this data collector cannot be used. For more information, see Ingest Next-Generation Firewall logs using the Syslog collector.

##### Set up detection data ingestion

**Note:**

In the following procedure, general information is provided for NGFW and Panorama. For detailed instructions, consult the documentation for your specific devices and Panorama version.

1.  In Cortex Cloud, navigate to Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New, search for NGFW, then hover over and click Add.
    
3.  Select Add NGFW Device or Add Panorama Device, and then do one of the following:
    
    -   For devices in your account, select one or more devices from Select FW/Panorama devices.
        
    -   To include devices from other accounts, select Select devices from other accounts, and then select one or more FW or Panorama devices from other accounts. For cross-account connections, you must have Super User permissions on the Cortex tenant account and the device account.
        
        **Important:**
        
        This cross-account support is limited to the same SFDC hierarchy; it does not extend to MSSP scenarios where the customer and provider own separate ends of the solution.
        
    
    Devices already connected are listed at the end. A device may be connected via Strata Logging Service, or via Cortex Cloud. Rectify any streaming issues that may arise by checking configurations for the relevant connection type (Strata Logging Service or Cortex Cloud).
    
4.  To complete the onboarding process of your devices, on the Next Steps to Connect Your Devices page, expand the relevant device version, and follow the corresponding instructions.
    
5.  Click Connect to establish the instance.
    
    Connection is established regardless of the firewall credential status and can take up to several minutes, select Sync now to refresh your instances.
    
6.  Ensure that you pull your cloud logging licenses on the firewall before proceeding to configure the firewall.
    
7.  In the user interface for setting up firewalls, for Strata Logging Service/Cloud Logging, enable the following options directly, or using device templates.
    
    (For example, go to Device → Setup → Management → Cloud Logging section)
    
    1.  Select Enable Strata Logging Service.
        
    2.  Select Enable Enhanced Application Logging.
        
    3.  (Optional, depending on your organization's requirements) Select Enable Duplicate Logging (Cloud and On-Premise).
        
8.  Depending on your PAN-OS or Panorama version, generate either a certificate or PSK.
    
    For PAN-OS and Panorama versions 10.1 and later, each firewall requires a separate certificate. Certificates need to be requested through the Customer Support portal. To sign in to the portal, click [here](https://support.paloaltonetworks.com/Support/Index). For PAN-OS and Panorama versions 10.0 and earlier, you are only required to generate one global PSK for all the firewall devices.
    
    **Note:**
    
    Cortex Cloud does not validate your firewall credentials, you must ensure the certificates or PSK details have been updated in your firewalls in order for data to stream.
    
9.  Onboard the certificates.
    
10.  Define a Log Forwarding profile.
     
11.  Map the Log Forwarding profile to a Security Policy Rule.
     
12.  Verify that the connection between the firewalls and Strata Logging Service is valid.
     
13.  Push the configuration changes to the firewalls.
     
14.  Validate that your data is streaming. It might be necessary to create traffic before you verify data streaming.
     
     To ensure the data is streaming into your tenant:
     
     -   In your NGFW Standalone Firewall Devices, track the Last communication timestamp.
         
     -   Run XQL Query: **dataset = panw_ngfw_system_raw| filter log_source_id = "[NGFW device SN]"**
         
     
15.  (Optional) Manage your Instance.
     
     After you create the NGFW instance, on the page, expand the NGFW to track the status of your Standalone Firewall Devices and Panorama Devices.
     
     Select the ellipses to Request Certificate, if required, or Delete the instance.
     

**Note:**

It can take an hour or longer after connecting the firewall in Cortex Cloud until you start seeing notifications that the certificate has been approved, and that the logging service license has appeared on the firewall.

When Cortex Cloud begins receiving detection data, the console begins stitching logs with other Palo Alto Network-generated logs to form stories. Use the XQL Search dataset `panw_ngfw_*_raw` to query your data, where the following logs are supported:

-   [Authentication Logs](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/log-forwarding-schema-reference/network-logs/network-authentication-log.html): panw_ngfw_auth_raw
    
-   [File Data Logs](https://docs.paloaltonetworks.com/strata-logging-service/log-reference/network-logs/network-file-log): panw_ngfw_filedata_raw
    
-   [Global Protect Logs](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/log-forwarding-schema-reference/network-logs/network-globalprotect-log.html): panw_ngfw_globalprotect_raw
    
-   [Hipmatch Logs](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/log-forwarding-schema-reference/network-logs/network-hip-match-log.html): panw_ngfw_hipmatch_raw\*
    
-   [System Logs](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/log-forwarding-schema-reference/common-logs/common-system-log.html): panw_ngfw_system_raw
    
-   [Threat Logs](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/log-forwarding-schema-reference/network-logs/network-threat-log.html): panw_ngfw_threat_raw\*
    
-   [Traffic Logs](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/log-forwarding-schema-reference/network-logs/network-traffic-log.html): panw_ngfw_traffic_raw\*
    
-   [URL Logs](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/log-forwarding-schema-reference/network-logs/network-url-log.html): panw_ngfw_url_raw\*
    
-   [User ID Logs](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/log-forwarding-schema-reference/network-logs/network-userid-log.html): panw_ngfw_userid_raw
    
-   [Configuration Logs](https://docs.paloaltonetworks.com/strata-logging-service/log-reference/common-logs/common-configuration-log): panw_ngfw_config_raw
    
-   [Tunnel Logs](https://docs.paloaltonetworks.com/strata-logging-service/log-reference/network-logs/network-tunnel-log): panw_ngfw_tunnel_raw
    

\*These datasets use the query field names as described in the [Cortex schema](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/log-forwarding-schema-reference.html) documentation.

For stitched raw data, you can query the `xdr_data` dataset or use any preset designated for stitched data, such as `network_story`. For query examples, refer to the in-app XQL Library. When relevant, Cortex Cloud can also generate Cortex Cloud issues (Analytics, Correlation Rules, IOC, and BIOC only) from Strata Logging Service detection data. While Correlation Rules issues are generated on non-normalized and normalized logs, Analytics, IOC, and BIOC issues are only generated on normalized logs.

**Note:**

IOC and BIOC issues are applicable on stitched data only, and are not available on raw data.

**Tip:**

You can see an overview of ingestion status for all log types, and a breakdown of each log type and its daily consumption quota on the NGFW Ingestion Dashboard.

#### Ingest Next-Generation Firewall logs using the Syslog collector

Use the Syslog collector to ingest NGFW logs in CEF format. This method is useful when your firewalls are located in a different region, or bandwidth issues are encountered due to large log size.

**Notice:**

Requires the Data Collection add-on.

Use the Syslog collector to ingest Next-Generation Firewall (NGFW) logs in CEF format. This method is useful when your firewalls are located in a different region, or bandwidth issues are encountered due to large log size. When possible, we recommend that you ingest NGFW logs using the dedicated Next-Generation Firewall data collector instead of the Syslog collector.

**Note:**

In the following procedure, general information is provided for NGFW and Panorama. For detailed instructions, consult the documentation for your specific devices and Panorama version, to ensure that you have configured log forwarding correctly for all the log types that you would like to forward to Cortex Cloud. The following steps only cover configuration of the custom log schema (CEF) for a given syslog server. They do not replace the administrator guide’s configuration coverage of log forwarding.

##### Configure the firewall/Panorama for log forwarding to Cortex Cloud

1.  To configure the device to include its IP address in the header of Syslog messages, select Panorama/Device → Setup → Management, click the Edit icon in the Logging and Reporting Settings section, and navigate to the Log Export and Reporting tab.
    
2.  From the Syslog HOSTNAME Format menu, select ipv4-address or ipv6-address, and click OK.
    
3.  Select Device → Server Profiles → Syslog, and click Add.
    
4.  Enter a server profile Name and Location (Location refers to a virtual system, if the device is enabled for virtual systems).
    
5.  On the Servers tab of the Syslog Server Profiles window, click Add, and enter the following information for the Syslog server:
    
    -   Name
        
    -   Syslog Server (IP address)
        
    -   Transport, Port (default 514 for UDP)
        
    -   Facility (default LOG_USER)
        
    
6.  Select the Custom Log Format tab and click configure the log formats as follows:
    
    **Note:**
    
    To avoid the possible effects of line formatting, do not copy/paste the message formats directly into the PAN-OS web interface. Instead, paste into a text editor, remove any carriage return or line feed characters, and then copy and paste into the web interface.
    
    **Note:**
    
    From version 10.0 and later, the log format documented for log types (Traffic, Threat, and URL) exceeds the maximum supported 2048 characters in the Custom Log Format tab on the firewall and Panorama. Select the CEF keys and values to limit the number of characters to 2048, as per your requirements.
    
    | Log Type | Custom Format |
    | :-- | :-- |
    | Traffic | CEF:0|PANW|NGFW_CEF|$sender_sw_version|$subtype|$type|1| __firewall_type=firewall.traffic __timestamp=$start __tz=$high_res_timestamp log_type=$type subtype=$subtype log_time=$cef-formatted-receive_time time_generated=$cef-formatted-time_generated log_source_id=$serial log_source_name=$device_name sequence_no=$seqno source_ip=$src dest_ip=$dst source_port=$sport dest_port=$dport nat_source=$natsrc nat_dest=$natdst nat_source_port=$natsport nat_dest_port=$natdport protocol=$proto action=$action source_user=$srcuser dest_user=$dstuser xff_ip=$xff_ip app=$app app_category=$category_of_app app_sub_category=$subcategory_of_app rule_matched=$rule rule_matched_uuid=$rule_uuid severity=1 vsys=$vsys vsys_name=$vsys_name from_zone=$from to_zone=$to inbound_if=$inbound_if outbound_if=$outbound_if session_id=$sessionid source_device_category=$src_category source_device_profile=$src_profile source_device_model=$src_model source_device_vendor=$src_vendor source_device_osfamily=$src_osfamily source_device_osversion=$src_osversion source_device_mac=$src_mac dest_device_category=$dst_category dest_device_profile=$dst_profile dest_device_model=$dst_model dest_device_vendor=$dst_vendor dest_device_osfamily=$dst_osfamily dest_device_osversion=$dst_osversion dest_device_mac=$dst_mac bytes_sent=$bytes_sent bytes_received=$bytes_received packets_received=$pkts_received packets_sent=$pkts_sent total_time_elapsed=$elapsed session_end_reason=$session_end_reason url_category=$category |
    | Threat | CEF:0|PANW|NGFW_CEF|$sender_sw_version|$threatid|$type|$number-of-severity| __firewall_type=firewall.threat __timestamp=$cef-formatted-time_generated __tz=$high_res_timestamp log_type=$type subtype=$subtype log_time=$cef-formatted-receive_time time_generated=$cef-formatted-time_generated log_source_id=$serial log_source_name=$device_name sequence_no=$seqno source_ip=$src dest_ip=$dst source_port=$sport dest_port=$dport nat_source=$natsrc nat_dest=$natdst nat_source_port=$natsport nat_dest_port=$natdport protocol=$proto action=$action source_user=$srcuser dest_user=$dstuser xff=$xff xff_ip=$xff_ip app=$app app_category=$category_of_app app_sub_category=$subcategory_of_app rule_matched=$rule rule_matched_uuid=$rule_uuid severity=$number-of-severity vsys=$vsys vsys_name=$vsys_name from_zone=$from to_zone=$to inbound_if=$inbound_if outbound_if=$outbound_if session_id=$sessionid source_device_category=$src_category source_device_profile=$src_profile source_device_model=$src_model source_device_vendor=$src_vendor source_device_osfamily=$src_osfamily source_device_osversion=$src_osversion source_device_mac=$src_mac dest_device_category=$dst_category dest_device_profile=$dst_profile dest_device_model=$dst_model dest_device_vendor=$dst_vendor dest_device_osfamily=$dst_osfamily dest_device_osversion=$dst_osversion dest_device_mac=$dst_mac misc=$misc threat_id=$threatid threat_name=$threat_name threat_category=$thr_category direction=$direction user_agent=$user_agent |
    | URL | CEF:0|PANW|NGFW_CEF|$sender_sw_version|$subtype|$type|$number-of-severity| __firewall_type=firewall.url __timestamp=$cef-formatted-time_generated __tz=$high_res_timestamp log_type=$type subtype=$subtype log_time=$cef-formatted-receive_time time_generated=$cef-formatted-time_generated log_source_id=$serial log_source_name=$device_name sequence_no=$seqno source_ip=$src dest_ip=$dst source_port=$sport dest_port=$dport nat_source=$natsrc nat_dest=$natdst nat_source_port=$natsport nat_dest_port=$natdport protocol=$proto action=$action source_user=$srcuser dest_user=$dstuser xff=$xff xff_ip=$xff_ip app=$app app_category=$category_of_app app_sub_category=$subcategory_of_app rule_matched=$rule rule_matched_uuid=$rule_uuid severity=$number-of-severity vsys=$vsys vsys_name=$vsys_name from_zone=$from to_zone=$to inbound_if=$inbound_if outbound_if=$outbound_if session_id=$sessionid source_device_category=$src_category source_device_profile=$src_profile source_device_model=$src_model source_device_vendor=$src_vendor source_device_osfamily=$src_osfamily source_device_osversion=$src_osversion source_device_mac=$src_mac dest_device_category=$dst_category dest_device_profile=$dst_profile dest_device_model=$dst_model dest_device_vendor=$dst_vendor dest_device_osfamily=$dst_osfamily dest_device_osversion=$dst_osversion dest_device_mac=$dst_mac uri=$misc threat_id=$threatid threat_name=$threat_name threat_category=$thr_category direction=$direction user_agent=$user_agent url_category=$category url_category_list=$url_category_list content_type=$contenttype http_method=$http_method http_headers=$http_headers http2_connection=$http2_connection referer=$referer pcap_id=$pcap_id |
    | File Data | CEF:0|PANW|NGFW_CEF|$sender_sw_version|$threatid|$type|$number-of-severity| __firewall_type=firewall.filedata __timestamp=$cef-formatted-time_generated __tz=$high_res_timestamp log_type=$type subtype=$subtype log_time=$cef-formatted-receive_time time_generated=$cef-formatted-time_generated log_source_id=$serial log_source_name=$device_name sequence_no=$seqno source_ip=$src dest_ip=$dst source_port=$sport dest_port=$dport nat_source=$natsrc nat_dest=$natdst nat_source_port=$natsport nat_dest_port=$natdport protocol=$proto action=$action source_user=$srcuser dest_user=$dstuser xff=$xff xff_ip=$xff_ip app=$app app_category=$category_of_app app_sub_category=$subcategory_of_app rule_matched=$rule rule_matched_uuid=$rule_uuid severity=$number-of-severity vsys=$vsys vsys_name=$vsys_name from_zone=$from to_zone=$to inbound_if=$inbound_if outbound_if=$outbound_if session_id=$sessionid source_device_category=$src_category source_device_profile=$src_profile source_device_model=$src_model source_device_vendor=$src_vendor source_device_osfamily=$src_osfamily source_device_osversion=$src_osversion source_device_mac=$src_mac dest_device_category=$dst_category dest_device_profile=$dst_profile dest_device_model=$dst_model dest_device_vendor=$dst_vendor dest_device_osfamily=$dst_osfamily dest_device_osversion=$dst_osversion dest_device_mac=$dst_mac misc=$misc threat_id=$threatid threat_name=$threat_name threat_category=$thr_category direction=$direction user_agent=$user_agent file_url=$file_url filedigest=$filedigest filetype=$filetype pcap_id=$pcap_id |
    
7.  Configure Escaping characters as follows:
    
    -   Escaped Characters: \\=
        
    -   Escape Character: \\
        
    
    
    

##### Configure Syslog collection

Set up a Syslog collector for the logs, as explained in Activate Syslog Collector. In Task 4, ensure that you set Format to CEF.

### Ingest data from Prisma Access

Learn how to ingest detection data from Prisma Access.

**Notice:**

Requires the Data Collection add-on.

You can forward data from Prisma Access to Cortex Cloud. When your Cortex Cloud tenant begins receiving detection data, it begins stitching logs with other Palo Alto Networks-generated logs to form stories. Use the XQL Search to query the data.

Collection of data from multiple accounts is supported. Super User permissions on both the Cortex Cloud tenant accounts and the Prisma Access accounts are required for this use case.

New tenants (and tenants upgraded from XDR to XSIAM) will work with the new direct integration of Next-Generation Firewall and Panorama into Cortex. For such tenants, there’s no option to use the Strata Logging Service integration.

For tenants where customers have integrated directly with Strata Logging Service, the configured integrations, such as Next-Generation Firewall and Prisma Access, can be migrated to Cortex Cloud in either of the following ways before the license expires:

-   More than two weeks before the license for existing integrations with Strata Logging Service expires, manually migrate the integrations, using the corresponding Migrate Devices buttons on the Data Sources & Integrations page. Make sure you select all your devices to connect directly to Cortex Cloud.
    
-   Two weeks prior to the end of your Strata Logging Service license, Cortex Cloud will automatically migrate your integrations to your Strata Logging Service.
    
    **Note:**
    
    Roll-back of Strata Logging Service integration migration is not supported.
    

**Prerequisite:**

Configuration of data ingestion from multiple accounts requires Super User permissions in both Cortex Cloud tenant and Prisma Access accounts.

The logs ingested by Prisma Access are the same as the logs ingested by Next-Generation Firewall. For more information, refer to Ingest data from Next-Generation Firewall.

To ingest detection data from Prisma Access:

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New, search for Prisma Access, then hover over it and click Add or Add Instance.
    
    **Note:**
    
    Cortex Cloud does not validate your Prisma Access account credentials. You must ensure the account has been deployed in order for data to stream.
    
3.  In the Connect Prisma Access dialog box, you can choose to connect Prisma Access to this account or other accounts.
    
    -   To connect Prisma Access to this account, click Connect.
        
    -   To connect Prisma Access to other accounts, click Connect Prisma Access from other accounts and select the account from the accounts listed. Click Connect.
        
    
    Connection can take up to several minutes.
    
    On the Data Sources & Integrations page, expand Prisma Access to track the status of your instance.
    
4.  Validate that your data is streaming.
    
    To ensure the data is streaming into your tenant, using XQL, query Next-Generation Firewall raw datasets `panw_ngfw_<*>_raw` using the field: `is_prisma_mobile`.
    
5.  (Optional) Manage your Instance.
    
    After you create the Prisma Access instance, on the Data Sources & Integrations page, expand the Prisma Access integration to track the connection, or, if you want, to Delete the instance.

### Ingest logs from Prisma Access Browser

Ingest Prisma Browser logs into Cortex Cloud.

**Notice:**

Requires the Data Collection add-on.

Prisma Browser is a Palo Alto Networks browser designed specifically for enterprise use, and is fortified with security features to protect users and organizations. You can configure Cortex Cloud to ingest Prisma Browser logs into a dataset called `panw_prisma_access_browser_raw`, that can be queried using XQL. This integration gives you visibility into issues that are generated by the browser. The ingested data can also be used for performing threat hunting queries and correlations within the Cortex platform.

Only one instance of this collector can be created per Cortex Cloud tenant.

1.  In Cortex Cloud, select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New, search for and select Prisma Access Browser, click Add or Add Another Instance.
    
3.  In the Connect Prisma Access Browser dialog box, select the checkbox for Connect Prisma Access Browser to this account.
    
4.  Click Connect.
    
    Connection can take up to several minutes.
    
    On the Data Sources & Integrations page, expand Prisma Access Browser to track the status of your instance.
    
5.  Validate that data is streaming to your tenant by using XQL to query the dataset `panw_prisma_access_browser_raw`.
    

After you have created a Prisma Browser instance, you can use the Data Sources & Integrations page to view information about the integration, or delete the instance.

### Ingest detection data from Strata Logging Service

Learn how to ingest detection data from Strata Logging Service.

To streamline the connection and management of all Palo Alto Networks generated logs across products in Cortex Cloud with a Strata Logging Service, Cortex Cloud can ingest detection data from Strata Logging Service in a more flexible manner using the Strata Logging Service data collector.

You can configure the Strata Logging Service data collector to take logs from other Palo Alto Networks products already logging to 1 or more existing Strata Logging Service.

Cortex Cloud supports streaming data directly from Prisma Access accounts and New-Generation Firewalls (NGFW) and Panorama devices to your Cortex Cloud tenants using the Cortex Native Data Lake. Existing integrations should be migrated to the Cortex Native Data Lake. Make sure you select all your devices to connect directly to Cortex Cloud. Integrations not migrated manually will be migrated automatically 2 weeks before the end of the contract with Strata Logging Service.

For stitched raw data, use the XQL query `xdr_data` dataset or any preset designated for stitched data, such as `network_story`. For query examples, refer to the in-app XQL Library. Cortex Cloud can also generate Cortex Cloud issues (Analytics, Correlation Rules, IOC, and BIOC only) when relevant from Strata Logging Service detection data. While Correlation Rules issues are generated on non-normalized and normalized logs, Analytics, IOC, and BIOC issues are only generated on normalized logs.

**Note:**

IOC and BIOC issues are applicable on stitched data only and are not available on raw data.

To ingest detection data from Strata Logging Service.

1.  [Activate the Strata Logging Service](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/cortex-data-lake-getting-started/activate-cortex-data-lake-toc/activate-cortex-data-lake-easy).
    
    You can configure Cortex Cloud to take Palo Alto generated firewall logs from other Palo Alto Networks products already logging to an existing Strata Logging Service.
    

4.  Select Data Lake Instance.
    
    Select one or more existing Strata Logging Service instances that you want to connect to this Strata Logging Service instance.
    
5.  Save your Strata Logging Service configuration.
    
    Once events start to come in, a green check mark appears underneath the Strata Logging Service configuration.
    
6.  (Optional) Manage your Strata Logging Service Collector.
    
    After you create the Strata Logging Service Collector, you can make additional changes, as needed.
    
    -   Delete the Strata Logging Service Collector.
        
    
7.  After Cortex Cloud begins receiving data from a Strata Logging Service, you can use XQL Search to search for specific data, using the `xdr_data` dataset.

### IoT Security

Learn more about the IoT Security content pack integration in Cortex Cloud.

You can configure collecting IoT Security logs and data using an integration configured in Data Sources or from Marketplace:

| IoT Security | Description |
| --- | --- |
| Data Source overview | The Palo Alto Networks IoT Security solution discovers unmanaged devices, detects behavioral anomalies, recommends policy based on risk, and automates enforcement without the need for additional sensors or infrastructure. The Cortex Cloud IoT Security integration enables you to ingest alerts and device information from your IoT Security instance. |
| Link to Data Source instructions | Ingest alerts and assets from IoT Security |
| Links to content pack/integration details | The [IoT by Palo Alto Networks](https://cortex.marketplace.pan.dev/marketplace/details/PaloAltoNetworks_IoT/) content pack enables Cortex Cloud to integrate with the Palo Alto Networks IoT Security Portal for retrieving device details, listing and managing alerts and vulnerabilities, and integrating with ticketing systems like ServiceNow for streamlined incident response. It contains the PANW IoT ServiceNow Tickets Check playbook, the PANW IoT Incident Handling with ServiceNow playbook, the PANW IoT Alert Handling with ServiceNow playbook, the **`iot-security-get-raci`** automation script, the iot-security-alert-post-processing automation script, the **`iot-security-check-servicenow`** automation script, and the **`iot-security-vuln-post-processing`** automation script, along with the IoT Alert and IoT Vulnerability issue types and custom issue fields. [Palo Alto Networks IoT](https://xsoar.pan.dev/docs/reference/integrations/palo-alto-networks-io-t): Use this integration to wrap around the IoT Security Portal APIs for operations such as getting a device detail by ID, listing devices, listing alerts and vulnerabilities, and resolving alerts and vulnerabilities. The integration provides the API wrapper that supports actions for retrieving device information and managing IoT alerts and vulnerabilities. |

#### Ingest alerts and assets from IoT Security

Ingest alerts and device data from IoT Security.

**Notice:**

Requires the Data Collection add-on.

The Palo Alto Networks IoT Security solution discovers unmanaged devices, detects behavioral anomalies, recommends policy based on risk, and automates enforcement without the need for additional sensors or infrastructure. The Cortex Cloud IoT Security integration enables you to ingest alerts and device information from your IoT Security instance.

To receive data, configure the settings in Cortex Cloud for the IoT Security data collector in Settings → Data Sources & Integrations.

As soon as data collection begins, Cortex Cloud displays the IoT Security alerts in the Cortex Cloud Issues table and groups them into cases. The IoT Security issues are updated every 15 minutes. IoT security alerts which were resolved before the integration aren’t added to the Cortex Cloud table. Cortex Cloud adds device activities detected by IoT Security into the Cortex Cloud Assets table. Device activities are updated every five minutes.

Cortex Cloud automatically creates a new dataset for device activities (`panw_iot_security_devices_raw`) and a new dataset for issues (`panw_iot_security_alerts_raw`), which you can use to initiate XQL Search queries and create Correlation Rules.

Before you configure the IoT Security Collector, generate an access key and a key ID for the integration.

1.  Log in to the PAN IoT Security portal and click your user name.
    
2.  Select Preferences.
    
3.  In the User Role & Access section, Create an API Access Key.
    
4.  Download and save the access key and key ID in a secure location.
    

For more information about the PAN IoT Secuity API, see [Get Started with the IoT Security API](https://docs.paloaltonetworks.com/iot/iot-security-api-reference/iot-security-api-overview/get-started-with-the-iot-security-api).

Configure the IoT Security alerts and assets collection in Cortex Cloud.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New, search for IoT Security Collector, then hover over it and click Add.
    
3.  Specify the following parameters.
    
    -   Customer ID: Tenant domain part of the FQDN used for your IoT Security account. For example, in `yourcorp.iot.paloaltonetworks.com`, the customer ID is `yourcorp`. The customer ID is unique and case sensitive. After you save the integration instance, you can't edit the Customer ID.
        
    -   Access Key and Key ID previously generated for the integration.
        
    -   Integration Scope: Select at least one of the two values, Alerts and Devices depending on which information you want to ingest.
        
    
4.  Click Test to validate access, and then click Enable.
    
    When events start to come in, a green check mark appears underneath the IoT Security Collector configuration with the data and time that the data was last synced.
    
5.  (Optional) Manage your IOT Security Collector.
    
    After you enable the IOT Security Collector, you can make additional changes as needed. To modify a configuration, select any of the following options.
    
    -   Edit the IOT Security Collector settings.
        
    -   Disable the IOT Security Collector.
        
    -   Delete the IOT Security Collector.
        
    
6.  After Cortex Cloud begins receiving data from IOT Security, you can use the XQL Search to search for logs in the new datasets, `panw_iot_security_devices_raw` for device activities, and `panw_iot_security_alerts_raw` for issues.

### Collecting URL and File log types

Learn about the implications of turning off or on collection of URL and File logs.

For Palo Alto Networks integrations, you can choose whether to collect URL and File type logs. These logs enhance your cyber analytics, correlation rules and visibility for investigation. However, if you want to reduce ingestion charges, you can globally turn off collection of URL and File log types for all Palo Alto Networks Integrations.

When collection is turned off, some detectors won’t detect cyber attacks or provide full context, and correlation rules won’t be able to detect cyber events. For a full list of affected detectors, see Detectors connected to URL and File log types.Detectors connected to URL and File log types

You can also calculate the amount of ingestion that URL and File log types are consuming by looking at the NGFW dashboard. This dashboard provides an overview of the PAN-NGFW ingestion status of all log types (including URL and File log types) and their daily consumption quota.

You can turn on or off URL and File log types collection on the page.

## Cloud Posture and Runtime Security data sources

Learn more about the Cloud Posture and Runtime Security data sources in Cortex Cloud.

Cortex Cloud Posture Management and Cortex Cloud Runtime Security have their own data sources that you can use to gain complete visibility and real-time control over security risks to your cloud data. These sources utilize cloud-native APIs to discover, contextualize, monitor, and protect assets across multi-cloud environments, as well as specialized services like Snowflake and Microsoft 365.

Relevant Cloud Posture and Runtime data source types:

-   **Managed and third-party cloud registries**: Automatically scans container images for vulnerabilities in registries like Amazon ECR, Docker Hub, and JFrog.
    
-   **Posture management connectors**: Provides specialized onboarding to identify misconfigurations in SaaS and data platforms like Snowflake and Microsoft 365 (Posture).
    
-   **Discovery engine**: Performs regular scans and uses Event Assisted Ingestion (EAI) to track near-real-time changes to cloud assets and VMs.
    
-   **Serverless function security**: Provides agentless scanning for vulnerabilities in serverless code and pipelines for AWS Lambda, GCP, and Azure functions.
    
-   **Cloud data security (DSPM)**: Discovers and classifies sensitive data across managed storage, such as S3 and Cloud SQL, and self-managed databases.

### How to onboard Databricks

How to get started with the third-party Databricks data source.

#### Overview

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
            
        
    

#### Add the Databricks data source

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

#### Verify the Cortex Gateway connection

At the end of the onboarding process, a pending request for Databricks approval is automatically created and displayed on the Cortex Gateway screen. In order to complete the onboarding process, approve the pending request. If you do not have permissions, contact your Cortex Cloud administrator.

For more information, see Egress configurations.Egress configurations

### How to onboard on-premise file shares to Cortex Cloud Data Security

Set up Data Security for on-premise file shares using Broker VM.

#### Overview of working with on-premise file shares

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

#### Activate DSPM Fileshare

Learn more about activating a Broker VM with the DSPM Fileshare applet.

**Danger:**

-   Set up and configure Broker VM
    
-   Know the complete path to the files and folders that you want Cortex Cloud to monitor.
    
-   Necessary user permissions to access the network shares. For the SMB connection type, you need the user name and password.
    

##### How to activate the DSPM Fileshare applet

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  On the Brokers tab, find Broker VM, and in the APPS column, click \+ ADD. In the list of applets, click DSPM Fileshare.
    
    **Note:**
    
    The applet list displays only the applets for which you have permissions.
    
3.  Configure the DSPM Fileshare settings according to the following steps.
    
    File Share Connection
    
    | Field | Description |
    | --- | --- |
    | Connection Type | **NFS (Network File System):** A distributed file system protocol that lets networked computers share files remotely, making them appear as if they're stored locally. Operating at the application layer, it uses Remote Procedure Calls (RPCs) for clients to access a server's files and directories.; **SMB (Server Message Block):** A network file-sharing protocol that provides shared access to resources like files, printers, and serial ports across a network. It enables client applications to remotely interact with files and other assets stored on a server. It is the default file-sharing protocol for Microsoft Windows operating systems. This connection type requires a username and a password. |
    | Path | Specify the host and path to the folder containing the files that you want Cortex Cloud Data Security to monitor. |
    | Username | For the SMB connection type only. |
    | Password | For the SMB connection type only. |
    | Test Connection | Select to validate the connection permissions. |
    
    **Note:**
    
    By default, all configured connections are saved.
    
4.  On the File Share Connection screen, click \+ Add a Connection.
    
    **Note:**
    
    For details regarding the connection fields, see the table above under File Share Connection.
    
5.  In the File Share Connection field, replace the text with a name for the new connection.
    
6.  Select a connection type.
    
7.  Provide the path to the shared folder (the host and path).
    
8.  For SMB connections only, provide a username and password.
    
9.  Optionally, do the following:
    
    1.  Turn on the Classification toggle. This enables 2,500 random files to be scanned and classified each time.
        
    2.  In the Scan every list, select the cadence of how often the files are to be scanned. If you want the scans to occur less frequently, choose the Custom option and enter the amount of days, weeks, or months that you require.
        
    
10.  Click Test Connection to ensure the connection works properly.
     
11.  Click Save.
     

**Note:**

You can add multiple connections under a single instance of the DSPM Fileshare applet by returning to the File Share Connection screen and clicking Add Connection. Each new connection can be of either the NFS or SMB connection type.

Other actions

Once the DSPM Fileshare applet is activated, you can perform the following actions:

-   Edit
    
-   **Deactivate:** On the Broker VMs screen, in the ADD column, in the context menu, click Deactivate.
    
-   **Delete:** On the File Share Connection screen, click the Delete icon next to the connection you want to remove.
    

Inventory list

Each new connection that is created correlates to an asset in the inventory. You can see the connections by clicking Inventory → All Assets → Data → Storage Buckets.

### How to onboard Microsoft 365

How to get started with the Microsoft 365 data source.

#### Overview

You can add Microsoft 365 as a third-party data source in Cortex Cloud Data Security.

**Danger:**

-   You have generated a Globally Unique Identifier (GUID), also known as a Universally Unique Identifier (UUID). You will need this ID for the tenant you want to use for the Microsoft 365 instance.
    
-   In order to use Microsoft 365, you must be registered with Microsoft Azure.
    

#### Configuration

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Microsoft 365, then hover over it and click Add.
    
4.  On the Microsoft 365 integration instance settings page, do the following:
    
    1.  In the Display Name field, enter a name for your Microsoft 365 integration instance.
        
    2.  In the Tenant ID field, enter a tenant ID.
        
    3.  In the Region list, select a region.
        
    
5.  Click Next.
    

#### Authorization

1.  On the Microsoft 365 integration instance settings page, if you are an administrator, click the click to authorize link.
    
2.  If you do not have administrator permissions, follow the instructions on screen and click Close.
    

The Microsoft 365 integration instance should now appear in the list of data sources on the Data Sources & Integrations page.

### Ingest logs and data from Okta

Learn more about Ingesting logs and data from Okta for use in Cortex Cloud.

Product availability and licensing

The options available in the UI depend on your specific product license:

| Feature | Cloud Posture Security | Cloud Runtime Security | Cortex XDR Cloud | Cortex XSIAM NG SIEM, Cortex XSIAM Enterprise, and Cortex XSIAM Premium | Cortex XSIAM Enterprise Plus |
| --- | --- | --- | --- | --- | --- |
| Collect Logs | Enabled | Enabled with Data Collection add-on | Enabled with Data Collection add-on | Enabled | Enabled |
| Collect Configuration | Enabled | Enabled | Enabled with Cloud Posture Security or Cloud Runtime Security add-on | Enabled with Cloud Posture Security or Cloud Runtime Security add-on | Disabled |

**Prerequisite:**

**Administrator privileges**: Your Okta user must have a role capable of creating API tokens, such as Read-only Administrator, Super Administrator, or Organization Administrator. For more information, see the [Okta Administrators Documentation](https://help.okta.com/en-us/Content/Topics/Security/Administrators.htm?cshid=ext_Security_Administrators).

To receive logs and configuration data from Okta, configure the Data Sources & Integrations settings in Cortex Cloud. Once enabled, the system immediately begins ingesting activity logs and identity configuration metadata, according to your configuration settings.

Activity logs are searchable using the Cortex Query Language (XQL). For more information, see Perform advanced Identity Security investigations using XQL.

Configuration data is used for Identity Security visibility and is searchable in Identity Security → Identity Asset Inventory and using the `ciem_permissions_with_last_access` dataset.

API rate limits and monitoring

The Okta API enforces concurrent rate limits. To prevent service disruption:

-   The Okta data collector includes a mechanism that automatically reduces the amount of requests whenever an error is received from the Okta API indicating that too many requests have already been sent.
    
-   To ensure you are notified when this occurs, an alert is displayed in the Notification Area and a record is added to the Management Audit Logs.
    

How to configure the Okta collection?

Step 1: Configure Okta for integration

The same Okta domain, API token, and permissions are used for both log and configuration collection, as both features utilize the same Okta API.

Perform these steps in your Okta Admin Console to prepare for the connection.

1.  Identify your Okta Domain:
    
    1.  From the Okta Dashboard, click the down arrow under your name in the top-right corner.
        
    2.  Copy the Org URL, such as `https://example.okta.com`, and save it for the Okta Domain field in Cortex Cloud.
        
    
    For more information, see the [Okta Documentation](https://developer.okta.com/docs/guides/find-your-domain/findorg/).
    
2.  Obtain your authentication token in Okta:
    
    1.  Select Security → API → Tokens, and click Create token.
        
    2.  Set the following parameters for the token:
        
        -   What do you want your token to be named?: Specify the name for your token, which is used for tracking API calls.
            
        -   API calls made with this token must originate from: Select Any IP.
            
        
    3.  Click Create token. You may need to login to Okta again using your MFA administrator credentials.
        
    4.  Your token is successfully created. Copy the Token Value and record it immediately. You will need this for the TOKEN field in Cortex Cloud. Once you close the dialog box by clicking Ok, got it, you won't be able to access the token again and will have to create a new one if you didn't record it.
        

Step 2: Configure the Okta Collector in Cortex Cloud

1.  Select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New, search for Okta, then hover over it and click Add.
    
3.  Integrate the Okta authentication service with Cortex Cloud:
    
    1.  Enter the Okta Domain (Org URL) and Token obtained in Step 1.
        
    2.  Collect Logs: Select this option to ingest activity logs.
        
    3.  (Optional) Define an Event Filter to configure collection for events of your choosing.
        
        -   All events are collected by default unless you define an Okta API Filter expression, such as `filter=eventType eq “user.session.start”`.
            
        -   For Okta information to be woven into authentication stories, `“user.authentication.sso”` events must be collected.
            
        
    4.  Collect Configuration: Select this option to provide deep visibility into identities and permissions, offering comprehensive insights into users, user groups, and applications. It specifically highlights the permissions granted to Okta users in cloud environments, centralizing group memberships to secure your identity landscape.
        
    5.  Test the connection.
        
    6.  Click Enable.
        

Step 3. Accessing the data

Data is routed differently depending on which collection option is enabled:

Activity Data (using Collect Logs)

-   **XQL**: Searchable using the Cortex Query Language (XQL). For more information, see Perform advanced Identity Security investigations using XQL.
    

Configuration data (using Collect Configuration)

-   **Identity inventory**: Access the data in the Identity Asset Inventory within the Cortex Cloud Identity Security module (Identity Security → Identity Asset Inventory).
    
-   **XQL**: Use the following dataset for CIEM (Cloud Infrastructure Entitlements Management) visibility: `ciem_permissions_with_last_access`

### Activate Registry Scanner
The Broker VM provides a Registry Scanner applet that scans and secures your container image registries. It supports Docker V2 or JFrog self-hosted registries located on-premises or in private cloud networks.

**Notice:**

**Note:**

-   You cannot activate the Registry Scanner directly on a new or existing Broker VM. You can only activate or deactivate existing Registry Scanner applets. To activate or deactivate existing applets, see Step 4 under Verify Registry Scanner connection section.
    

#### Verify Registry Scanner connection

After the registry scanner is initialized, perform the following steps to verify that the Registry Scanner applet is connected to the Broker VM:

**Prerequisite:**

-   To initialize registry scanning on your Broker VM, you must first add the necessary data connectors. For details, see:
    
    -   Connect Docker Hub registry
        
    -   Connect Docker V2 compliant container registry
        
    -   Connect GitLab container registry
        
    -   Connect Harbor registry
        
    -   Connect JFrog container registry
        
    -   Connect Sonatype Nexus registry
        
    
-   When sizing your Broker VM, consider the following recommendations:
    
    -   **Disk Size:** Calculate the required disk space by multiplying the average container image size in your environment by 10. This factor accounts for simultaneous operations with a buffer.
        
        For example, If your average image size is 500 MB, allocate at least 5 GB of disk space (500 MB \* 10 = 5000 MB = 5 GB).
        
    -   **CPU:** Allocate a minimum of 8 CPU cores.
        
    -   **Memory:** Allocate a minimum of 16 GB of RAM.
        
    

1.  Go to Settings → Configurations → Data Broker → Broker VMs.
    
2.  On either the Brokers or Clusters tab, find the Broker VM.
    
3.  In the APPS column for the Broker VM, verify that the Registry Scanner app appears.
    
4.  Select the Registry Scanner app to open a window displaying the following information:
    
    
    
    -   Connection: Shows the app's current connection status. You can also Deactivate the app.
        
        To reactivate the Registry Scanner app, do one of the following:
        
        -   On the Brokers tab, locate the Broker VM, select +Add in the APPS column, and then choose Registry Scanner.
            
        -   On the Clusters tab, locate the Broker VM, select +Add in the APPS column, and then choose Registry Scanner.
            
        
        If the Registry Scanner app is not listed in the drop-down menu when you click +Add, it means that the registry scanning was not configured for that Broker VM. You must first add the data connectors.
        
    -   Resources: Shows the percentage of CPU, Memory, and Disk resources used by the app.
        
    
5.  To manage the Registry Scanner applet, see:
    
    -   Manage a Docker Hub connector
        
    -   Manage a Docker V2 connector
        
    -   Manage a Gitlab Container Registry connector
        
    -   Manage a Harbor connector
        
    -   Manage a JFrog connector
        
    -   Manage a Sonatype connector

### How to onboard Snowflake

How to get started with the third-party Snowflake data source.

#### Overview

Integrate Cortex Cloud Data Security with your Snowflake account to gain comprehensive visibility into any data and posture risk existing in your Snowflake environment. This integration enables automated scanning of all assets in Snowflake, including data classification and risk assessment.

You can add Snowflake as a third-party data source in Cortex Cloud Data Security .

**Prerequisite:**

-   In order to use Snowflake, you must be registered with one of these cloud providers: Amazon AWS, Microsoft Azure, or Google Cloud Platform (GCP).
    
-   Ensure you have the necessary account permissions to onboard. It is recommended to use `Account Admin` as the role for the onboarding.
    

#### Configuration Step

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
    

#### Establish Connection Step

1.  Open your Snowflake console in a new tab.  
    
2.  Using the copy or download icons, copy or download the script in the Generated script text box and paste it into a new worksheet in Snowflake.
    
3.  Select the entire script and select Run all.
    
4.  Once the script runs without errors, come back to the Snowflake screen and click Verify Connection to check if the instance is detected.
    

#### Verify Connection Step

1.  A success or failure message appears on the screen.
    
2.  If a success message appears, you can do the following: 
    
    -   View the instance's information in the Snowflake Posture instances.
        
    -   View the assets in Asset Inventory, once the first scan is complete.
        
    

#### Delete a Snowflake instance

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, select the Snowflake integration or filter to search for it and then select it.
    
3.  On the Snowflake page, right click the row of the integration instance you want to delete.
    
4.  From the drop down menu, select Settings and from the integration instance settings page select the Delete checkbox and then click Delete.
    
    The Snowflake instance is now removed, including all previous scans.

### Activate Transporter

Activate a Broker VM with a Transporter applet.

The Transporter over Broker VM enables secure communication between your self-hosted Version Control Systems (VCS) and Cortex Cloud. This solution addresses the need for secure code scanning without exposing your internal network to the cloud.

**Prerequisites:**

-   Permissions: To configure and manage Transporter applet settings, you must have permissions to manage Broker Service configurations (such as an Instance Administrator)
    
-   Set up and configure Broker VMSet up and configure Broker VM
    
-   Confirm that your Broker is v 28 or above
    
-   Whitelist IP addresses to enable access to Cortex Cloud resources. The IP addresses for the Transporter are in the Broker VM Resources section of the Enable access to required PANW resources document
    
-   Open port `4052`, which is required for the Transporter's IP address communication
    
-   Open Port `443` (outbound), which is required for the Broker VM to pull data from your version control system (VCS)
    

#### License

To gain access to and use the Transporter applet, you must possess one of these license types: Cloud Posture Security or Runtime Management) or XSIAM Premium. If you plan to use the Transporter for Code Security scanning, you will also need the Code Security add-on license.

**Warning:**

The Transporter applet is not supported for FedRAMP customers.

#### How to activate the Transporter applet

1.  Select Settings → Configurations → Broker VMs (under Data Broker.
    
2.  Select the Brokers tab → locate your Broker VM → hover and click + Add under the Apps column → AppSec Transporter.
    
3.  Configure the Transporter connection in the provided fields:
    
    -   Transporter Name (required). Requires a unique name as you can integrate multiple applets for different integrations
        
    -   Provider Self Signed CA Certificate Path: Specify the file path for a custom Certificate Authority (CA) certificate used by the Transporter to securely communicate with services
        
    
4.  Click Save.
    
5.  Verify connectivity: Navigate to the Apps column and verify that your AppSec Transporter applet has been added and displays a connected status.
    
6.  **Next step**: After activating the Transporter, proceed to configure the Transporter applet on your self-managed VCS data source instance.
    
    For more information, refer to Set up a Transporter on your VCS.
    

#### Manage Transporter applets

To manage Transporter applet configurations, disable connections, or deactivate an applet, navigate to the Broker VMs page. From there, select your Appsec Transporter under the App column.

-   **Edit applet configurations**: Select the Appsec Transporter under the App column → Configure. You are redirected to the Transporter applet settings to manage its configurations
    
-   **Disable applet connection for a single integration**:
    
    1.  Select the Appsec Transporter under the App column → Configure.
        
    2.  On the Transporter applet configurations page, click on the specific Transporter applet → Disable.
        
        This disables the specific integration, but it can be re-enabled.
        
    
-   **Deactivate an applet** (all connections): Select the Appsec Transporter under the App column → Deactivate → Confirm when prompted
    
    All existing connections are deleted but their configurations are saved in the database. When adding a new connection, you'll be prompted if you want to reuse previous configurations.

## Administration and troubleshooting

Learn more about the administration and troubleshooting of the different data collector integrations in Cortex Cloud.

This section explains the generic information that is relevant for all data collector integrations.

### Manage instances
You can manage the instances configured for a data source on the Data Sources & Integrations page. You can edit, delete, enable, or disable instances, and refresh log data.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find an integration by clicking on a data source name in the table or filtering for it, then select the data source.
    
3.  Right click the relevant instance. From the menu, you can perform actions such as:
    
    -   Enable or disable an Instance.
        
    -   Refresh log data (by selecting Refresh).
        
    -   Edit the instance.
        
    -   Delete the instance.
        
        If you delete all the instances for a Data Source, the Data Source is not listed on the Data Sources & Integrations page.

#### Add a new data source or instance

Use the Data Source Onboarder to add a new data source or instance in Cortex Cloud.

You can add a new data source with the Data Source Onboarder. The Onboarder installs the data source, sets up an instance, configures playbooks and scripts, and other recommended content. The Onboarder offers default (customizable) options and displays all configured content in a summary screen at the end of the process.

1.  Navigate to the Settings → Data Sources & Integrations page.
    
2.  Select one of the following options:
    
    -   Add a new data source: Click \+ Add New.
        
    -   Add a new data source integration instance: Select an existing data source and click Add Instance. Then skip to Step 4.
        
    
3.  Select a data source to onboard and click Add.
    
    Hovering over a data source displays information about the data source and its integrations. Data sources that are already integrated are highlighted green and show Connect Another Instance. To see details of existing integrations, click on the number of integrations.
    
    The data sources are drawn from the Marketplace, Custom Collectors, and integrations. If you search for a data source and No Data Sources Found, click Try searching the Marketplace, to view the marketplace page prefiltered for your search. If there are no available options in the Marketplace, you can use one of the Custom Collectors to build your own.
    
    **Note:**
    
    -   If a data source contains multiple integrations, the integration configured as the default integration will used by the Data Onboarder. The default integration of the content pack is indicated in each content pack's documentation. The other integrations are available for configuration in the Data Sources & Integrations page after installing the content pack.
        
    -   Not all content packs are supported.
        
    -   When adding XDR data sources, the Data Source Onboarder is not available. However, you can still enable the data source; Cortex Cloud creates an instance and lists it on the Data Sources & Integrations page.
        
    
4.  In the settings configuration pane, complete the mandatory fields in the Connect section.
    
    For more information about the fields, click the question mark icon.
    
5.  (Optional) Under Collect, select Fetched alerts and complete the fields.
    
6.  Under Recommended Content, review and customize the options.
    
    The items in this section are content-specific. Some options are view only, and others are customizable. Click on each option for more information:
    
    -   Classifiers & Mappers
        
    -   Data Normalization: Parsing rules and data models
        
    -   Correlations: Correlation rules included in the pack
        
    -   Automation: Playbooks and Scripts included in the pack.
        
        You can select the Playbooks and Scripts that you want to enable. By default, recommended options are selected. Any unselected content is added as disabled content. Depending on the selected playbook, some scripts are mandatory.
        
    -   Dashboards & Reports: Recommended dashboards, widgets, and reports
        
    
    **Notes:**
    
    -   If you are adding a new instance to an existing data source, these options are View only.
        
        You can adjust the view-only options on the relevant page in the system, for example Correlations, Playbooks, or Scripts.
        
    -   Cortex Cloud automatically installs content packs with required dependencies and updates any pre-installed optional content packs. You can also Select additional content packs with optional dependencies to be configured during connection.
        
    
7.  Test the configuration.
    
    If the test fails, you can Run Test & Download Debug Log to debug the error.
    
8.  Connect the data source.
    
9.  Review the configuration in the summary screen.
    
    If errors occurred during the test, you can click See Details and Back to Edit to revise your configuration. For advanced configuration, click on any item to open a new window to the relevant page in the system (for example, Correlations or Playbooks) filtered by the configuration.
    
10.  Click Finish to return to the Data Sources & Integrations page.

#### How to configure the scanning settings for supported services

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

#### Manage cloud instances

You can manage the cloud instances configured for a CSP on the Data Sources & Integrations page. You can check the status, edit, delete, enable, or disable instances, and initiate discovery scan.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find the cloud instance by clicking the CSP name or using the Search field.
    
3.  In the row for the cloud instance, click View Details. The Cloud Instances page is displayed, filtered by the CSP you selected.
    
4.  In the Cloud Instances page, you can filter the results by any heading and value.
    
5.  Click on an instance name to open the details pane for that instance.
    
6.  You can perform the following actions on each cloud instance:
    
    | Action | Instructions |
    | --- | --- |
    | Discover Now | To initiate a discovery scan, in the row for the cloud instance, right-click and select Discover Now. Alternatively, in the details pane, click the more options icon and select Discover Now. |
    | Enable/Disable | In the row for the cloud instance, right-click and select Enable or Disable. Alternatively, in the details pane, click the more options icon and select Enable or Disable. |
    | Delete | In the row for the cloud instance, right-click and select Delete. Alternatively, in the details pane, click the more options icon and select Delete. |
    | Create a new instance | Click New Instance and select the type of CSP of which you want to create a new instance. Follow the onboarding wizard to define its settings. |
    | Edit configuration | In the row for the cloud instance, right-click and select Configuration. Alternatively, in the details pane, click the edit button. Follow the onboarding wizard to edit the cloud instance's settings. (Optional) Under Show advanced settings, select Automation and select a log level for the automation integration logs. You must execute the updated template in the CSP environment for the configuration changes to be applied. |
    

##### Monitor cloud integration instance health

Monitoring cloud integration instance health ensures continuous, reliable operation, facilitating issue response and improving overall security posture.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  In the relevant cloud integration instance row, click the View Details link and then click a specific Instance Name.
    
    From the list of health statuses, you can click the following to see automation instance health status:
    
    -   Permissions: Shows any permission issues or missing permissions for the instance.
        
    -   Automation: Indicates any errors during automation instance creation or configuration.
        
        **Note:**
        
        Currently, automation permission errors or missing automation permissions do not affect the Automation health status. You can view any permission errors or missing permissions in the the Permissions health status.

#### Update cloud permissions after Cortex release updates

Manage permission updates for your cloud instances following new feature releases or bug fixes.

This topic provides guidance on how to manage permission updates for your cloud instances following new feature releases or bug fixes. It outlines how users are notified of required permission changes and provides step-by-step instructions for granting necessary permissions to ensure continued functionality and security.

**Danger:**

-   Ensure that the user account used to modify permissions has the necessary privileges within both the Cortex platform and your cloud environment, for example, AWS or Azure.
    
-   You received a notification regarding a new version available that requires permission updates, or viewed a Needs Update status in the Data Sources & Integrations page.
    

##### Procedure

1.  Navigate to the Data Sources & Integrations page.
    
2.  Do the following to identify instances requiring updates:
    
    1.  For the relevant instance, locate the Update Status column.
        
    2.  Filter or sort by this column to quickly identify instances marked as Needs Update. The message on the page indicates the number of instances that need updating.
        
    
    **Note:**
    
    Instances requiring updates will not change their connection status, for example, Connected, Warning, Error, Disabled, due to the pending permission update.
    
3.  Do the following to access the connector's permissions section:
    
    1.  Click the name of the specific cloud connector instance that requires permission updates. The connector's detailed view appears.
        
    2.  Within the connector's detailed view, locate and select the permissions section.
        
    
4.  Review missing permissions. In the permissions section, the missing permission names or changes in permission scope is indicated.
    
5.  Follow the on-screen instructions to grant the required permissions, or refer to the specific permission names or scopes provided.
    
6.  After making the necessary permission adjustments, click Save or Apply Changes within the connector's configuration.
    
7.  Return to the Data Sources & Integrations page and verify that the updated status of the instance shows as up-to-date, or the update is in progress.
    
8.  Monitor the instance's health and functionality to confirm the changes have taken effect and the connector is operating as expected.
    
    If you encounter issues during the permission update process, check the generated health alerts for more specific details.

#### Pending cloud instances
In Cortex Cloud, a pending cloud instance refers to a cloud instance created after Cortex Cloud generates an authentication template, but before that template has been fully executed within the Cloud Service Provider (CSP) environment.

A pending cloud instance is created each time you complete the onboarding wizard for a new CSP and click Save. You can view all cloud instances, including those in a pending state, by navigating to Cloud Instances. Ensure you remove any default filters that might exclude instances with a "pending" status.

A single pending instance can be leveraged to create multiple cloud instances, all sharing the same configurations defined during the cloud onboarding process. Pending instances are automatically deleted after 30 days.

##### Manage pending cloud instances

There are some actions that can be performed specifically on cloud instances with a status of "pending".

| Action | Instructions |
| --- | --- |
| Manually connect an instance | After the authentication template has been executed in the CSP, you can manually connect the Cortex Cloud cloud instance to the CSP by right-clicking the pending cloud instance and selecting Manually connect an instance. For more about this process, see Manually connect a cloud instance. |
| View Details | To review the configuration settings defined in the onboarding wizard for a pending instance, right-click the instance and select View Details. This is helps you distinguish between pending instances when you want to create a new cloud instance from an existing pending instance or when you want to manually connect an instance. |
| Re-download Connection Template | The authentication template that you download from the onboarding wizard is valid for seven days from when it was downloaded. If you want to create a new cloud instance from a pending instance after the authentication template has expired, you can right-click the pending instance and select Re-download Connection Template. You must then execute the template in the CSP. |
| Delete | To delete a pending instance, right-click the pending instance and select Delete. |

#### Troubleshoot errors on cloud instances

You can troubleshoot errors on cloud instances by drilling down on an instance from the Data Sources & Integrations page.

To help you to troubleshoot errors on a cloud instance, Cortex Cloud provides the following visibility and drilldown options:

-   Overall status of an instance that indicates the health of your instance.
    
-   A breakdown of the security capabilities enabled on an instance, detailing the status of each capability along with any open errors or issues.
    
-   Additional XQL drill down options to query the history of error and recovery events for each security capability.
    

How to troubleshoot errors on a cloud instance

1.  Navigate to Settings → Data Sources & Integrations.
    
    Under Cloud Service Provider, review the status of the instances that were onboarded for the service provider. If the status shows Warning or Error, hover over the service provider and click View Details.
    
2.  On the Cloud Instances page review the list of instances that were onboarded and their overall status. The status is displayed as follows:
    
    -   Connected: The connector is enabled and has no issues.
        
    -   Warning: The connector is enabled and has minor issues. For example, some accounts or capabilities are in warning or error status.
        
    -   Error: The connector is enabled and has substantial errors. For example, an authentication failure, an outpost failure, major permissions issues, or (for organization level accounts) the majority of the accounts in the instance are in error status.
        
    -   Disabled: The connector is disabled.
        
    
3.  To understand why an instance is showing a Warning or Error status, click on the instance name.
    
    The cloud instance panel provides a breakdown of the security capabilities and the accounts onboarded on the instance. Review the information in the following sections:
    
    | Section | Context |
    | --- | --- |
    | Header | Displays the overall status of the instance and the following information about the account, as specified during onboarding: Scope of the instance: The number of accounts onboarded on the instance and their status. See the Accounts section for more information about the individual accounts and the type of account (single account or organization).; Scan mode: Cloud Scan or Outpost. For accounts using Outpost, information is displayed about the status of the Outpost account and the account ID.; Resource Tags: Tags defined during onboarding. |
    | Security Capabilities | Displays a breakdown of the security capabilities enabled on the instance and their individual statuses. Click on any item that shows a warning or error status to see the open errors and issues that contributed to the status: Errors are factual objects that are automatically created when problems occur, and provide insight into the current status of the capability. For example, if a permission is missing, an error is displayed. Browse and filter the errors to better understand and resolve the problem.; Issues are actionable objects that are triggered when detected problems exceed defined thresholds. Issues are manageable, trackable, and provide remediation suggestions and automations. The issues displayed in the panel are open issues that are specifically related to the selected connector with the selected capability in the observed scope (single account or organization). Click an issue to start investigating it. |
    | Accounts | Lists the accounts that are onboarded on the instance and their individual status. If multiple accounts are onboarded on the instance, click on each account to filter the page information by account, and drill-down to the security capability statuses for each account. |
    
4.  If the instance shows an Outpost error, go to the All Outposts page and find the outpost account that is being used by this instance. Right click the Outpost account to view the open errors and issues for the account.
    
5.  If the account shows Permission errors, use the side panel to check which permissions are missing. You can also Edit the instance to redeploy the cloud setup template, which should normally resolve the error.
    
6.  Further investigate errors by running XQL queries on the `cloud_health_auditing` dataset.
    
    This dataset records error and recovery events for the security capabilities in cloud instances. By querying this dataset you can see information about when the error started, the prevalence of the error, and whether there is a recurrency pattern. See the specific fields descriptions and query examples for each security capability.
    
    **Note:**
    
    Errors related to collection of audit logs in the cloud instance are recorded in the `collection_auditing` dataset. For more information, see Audit logs fields and query examples.
    
7.  Set up correlation rules to trigger issues when errors occur in cloud security capabilities. See the following examples.
    

##### Outpost fields and query examples

You can review Outpost entries in the `cloud_health_auditing` dataset to see Outpost activity over time, or to search for errors on specific accounts. Outpost entries are added to the dataset as follows:

-   An error occurred on an Outpost account that disabled or prevented an operation. This is audited as Error.
    
-   An exceptional condition occurred on an Outpost account that might cause problems if not resolved. This is audited as Warning.
    
-   The Outpost account returns to normal function. This is audited as Informational.
    

The following table describes the fields for Outpost entries:

| Field | Description |
| --- | --- |
| Account | Cloud account ID of the Outpost |
| Name | Category of the error, or a brief description of the event |
| Resource ID | Outpost ID |
| Capability | Outpost |
| Region | Region where the event occurred, or All regions. |
| Classification | Type of entry (Error, Warning, or Informational) |
| Message | Description of the error or Connected for informational entries. |
| Error | Details about the error. For informational entries this is blank. |

Example 152. Examples of Outpost queries

-   Identify Outpost errors on all Outpost accounts in the eu-west-3 region:
    
    ```
    dataset = cloud_health_auditing | filter capability = "Outpost" and classification = "Error" and region = "eu-west-3"
    ```
    
-   See all entries (error, warning, and recovery) for Outpost_1 on cloud account Account_A:
    
    ```
    dataset = cloud_health_auditing | filter capability = "Outpost" and resource_id = “Outpost_1” and account = "Account_A"
    ```
    

  

##### Permissions fields and query examples

You can review Permissions entries in the `cloud_health_auditing` dataset to see Permissions activity over time, or to search for errors on specific accounts. Permissions entries are added to the dataset as follows:

-   A permission problem was found. This is audited as Error.
    
-   An exceptional condition occurred that might cause problems if not resolved. This is audited as Warning.
    
-   A permission problem is resolved. This is audited as Informational.
    

The following table describes the fields for Permissions entries:

| Field | Description |
| --- | --- |
| Account | Name of the account where the event occurred, or All accounts. |
| Connector | Name of the connector where the event occurred |
| Name | Permission name |
| Capability | Permissions |
| Classification | Type of entry (Error, Warning, or Informational) |
| Message | Description of the error or Granted for informational entries. |

##### Discovery engine fields and query examples

You can review Discovery engine entries in the `cloud_health_auditing` dataset to see Discovery activity over time, or to search for errors on specific accounts. Discovery entries are added to the dataset as follows:

-   An API exec problem is found. This is audited as Error.
    
-   An exceptional condition occurred that might cause problems if not resolved. This is audited as Warning.
    
-   An API exec problem is resolved. This is audited as Informational.
    

The following table describes the fields for Discovery engine entries:

| Field | Description |
| --- | --- |
| Account | Name of the account where the event occurred, or All accounts |
| Connector | Name of the connector where the event occurred |
| Name | Asset name |
| Capability | Discovery |
| Region | Region where the event occurred, or All regions. |
| Classification | Type of entry (Error, Warning, or Informational) |
| Message | Description of the error or Connected for informational entries. |

Example 153. Examples of Discovery engine queries

-   Identify API exec errors on the Discovery engine for all accounts on the AWS_1 connector:
    
    ```
    dataset = cloud_health_auditing | filter capability = "Discovery" and connector = "AWS_1" and classification = “Error”
    ```
    
-   See all Discovery engine activity on connector AWS_1 for Account_ A in the af-south-1 region:
    
    ```
    dataset = cloud_health_auditing | filter capability = "Discovery" and connector = "AWS_1" and account = "accountA" and region = "af-south-1"
    ```
    

  

##### Agentless Disk Scanning (ADS) fields and query examples

You can review ADS entries in the `cloud_health_auditing` dataset to see ADS activity over time, or to search for errors on specific accounts. ADS entries are added to the dataset as follows:

-   ADS failed to scan an asset. This is audited as Failed.
    
-   ADS successfully scanned an asset. This is audited as Scanned.
    
-   The asset or host is not supported by ADS. This is audited as Unsupported.
    
-   The asset or Host was excluded from the scan. This is audited as Excluded.
    

| Field | Description |
| --- | --- |
| Account | Name of the account to which the asset belongs |
| Connector | ID of the connector |
| Name | Name of the asset |
| Resource ID | Asset ID |
| Capability | ADS |
| Region | Region where the asset is located |
| Classification | Type of entry (Failed, Unsupported, Excluded, Scanned) |
| Message | Description of the error, or Connected for informational entries. |
| Error | Details about the error. For informational entries this is blank. |
| Type | Type of asset that was scanned |
| Scope | Scope of the asset (Asset, Region, or Account) |

Example 154. Examples of ADS queries

-   Identify failed ADS scans on connector "a8df43e848dd42778ae7efd5a706a0fc" for EC2 assets at the asset scope level, filtered by region (northamerica-northeast2-a):
    
    ```
    dataset = cloud_health_auditing | filter capability = "ADS" and classification = "failed" and connector = “a8df43e848dd42778ae7efd5a706a0fc” and type = "EC2_INSTANCE" and scope = "Asset" and region = "northamerica-northeast2-a" 
    ```
    
-   See all ADS scans (failed and successful) on connector "a8df43e848dd42778ae7efd5a706a0fc" for EC2 assets belonging to Account_A:
    
    ```
    dataset = cloud_health_auditing | filter capability = "ADS" and connector = “a8df43e848dd42778ae7efd5a706a0fc” and type = "EC2" and account = “Account_A”
    ```
    

  

##### Data Security Scanning (DSPM) fields and query examples

You can review DSPM entries in the `cloud_health_auditing` dataset to see DSPM activity over time, or to search for errors on specific accounts. DSPM entries are added to the dataset as follows:

-   DSPM failed to scan an asset. This is audited as Failed.
    
-   DSPM successfully scanned an asset. This is audited as Success.
    

The following table describes the fields for DSPM entries:

| Field | Description |
| --- | --- |
| Account | Name of the account to which the asset belongs |
| Connector | Name of the connector where the event occurred |
| Name | Name of the asset |
| Resource ID | Asset ID |
| Capability | DSPM |
| Region | Region where the asset is located |
| Classification | Type of entry (Failed or Success) |
| Message | Description of the error, or Connected for informational entries. |
| Error | Details about the error. For informational entries this is blank. |
| Type | Type of asset that was scanned |
| Scope | Scope of the asset (Asset, Region, or Account) |

Example 155. Examples of DSPM queries

-   Identify failed DSPM scans on the AWS_1 connector for S3 asset types, filtered by region (ap-east-1):
    
    ```
    dataset = cloud_health_auditing | filter capability = "DSPM" and classification = “Error” and connector = “AWS_1” and type = "S3_BUCKET" and region = "ap-east-1"
    ```
    
-   See all DSPM scans (failed and successful) on the AWS_1 connector, for all scanned assets on Account_A:
    
    ```
    dataset = cloud_health_auditing | filter capability = "DSPM" and account = "Account_A" and connector = “AWS_1”
    ```
    

  

##### Registry scanning fields and query examples

You can review Registry scanning entries in the `cloud_health_auditing` dataset to see Registry scanning activity over time, or to search for errors on specific accounts. Registry scanning entries are added to the dataset as follows:

-   The Registry scanner failed to scan an asset. This is audited as Failed.
    
-   The Registry scanner successfully scanned an asset. This is audited as Scanned.
    

The following table describes the fields for Registry scanning entries:

| Field | Description |
| --- | --- |
| Account | Name of the account to which the asset belongs |
| Connector | Name of the connector where the event occurred |
| Resource ID | Asset ID |
| Capability | Registry |
| Classification | Type of entry (Scanned or Failed) |
| Error | Details about the error. For informational entries this is blank |
| Scope | Scope of the asset (Asset or Account) |

Example 156. Examples of Registry scanning queries

-   Identify failed scans on connector GCP_1:
    
    ```
    dataset = cloud_health_auditing | filter capability = "Registry" and classification = “error” and connector = “GCP_1”
    ```
    
-   Review all registry scans (failed and successful) on connector GCP_1 for asset Asset_A:
    
    ```
    dataset = cloud_health_auditing | filter capability = "Registry" and connector = “GCP_1” and ressource_id = "Asset_A"
    ```
    

  

##### Audit logs fields and query example

You can review Audit logs entries in the `collection_auditing` dataset. Querying this dataset can help you see the connectivity changes of an instance over time, the escalation or recovery of the connectivity status, and the error, warning, and informational messages related to status changes. For more information about this dataset, see Verify collector connectivity.

The following table describes the fields for Audit logs entries:

| Field | Description |
| --- | --- |
| Instance | Instance name |
| Log type | Type of logs affected |
| Classification | Type of entry (Error, Warning, or Informational) |
| Collector type | Type of the collector |
| Description | Description of the error, or Connected for informational entries. |

Example 157. Audit logs query example

Identify disruptions (errors) in audit log collection on connector AWS_1:

```
dataset = collection_auditing | filter instance = “AWS_1” and log_type = "Audit Logs" and classification = “Error”
```

  

##### Correlation rule examples

The following examples show how to set up correlation rules to trigger Health Collection issues when errors occur on a specific security capability.

Example rule for DSPM errors

In this example, a correlation rule will trigger a Health Collection issue if a DSPM scan fails on an AWS_S3 asset on the AWS_1 connector.

Example XQL:

```
dataset = cloud_health_auditing | filter capability = "DSPM" and classification = “Error” and type = "AWS_S3" and scope = "Asset" and connector = “AWS_1”
```

Additional fields to specify in the correlation rule:

| Field | Value |
| --- | --- |
| Time Schedule | Hourly |
| Query time frame | 1 Hour |
| Issue Suppression | Select Enable issue suppression. |
| Action | Select Generate Issue. |
| Issue Domain | Health |
| Severity | Medium |
| Category | Collection |

Example rule for Outpost errors

In this example, a correlation rule will trigger a Health Collection issue if an error is recorded on account Outpost_A in the us-east-1 region.

Example XQL:

```
dataset = cloud_health_auditing | filter capability = "Outpost" and account = "Outpost_A" and region = "eu-west-3" and classification = "Error"
```

Additional fields to specify in the correlation rule:

| Field | Value |
| --- | --- |
| Time Schedule | Hourly |
| Query time frame | 1 Hour |
| Issue Suppression | Select Enable issue suppression. |
| Action | Select Generate Issue. |
| Issue Domain | Health |
| Severity | Medium |
| Category | Collection |

#### Manage Kubernetes Connector instances

You can manage the Kubernetes Connector instances on the Data Sources & Integrations page. You can check the status, edit, or delete Kubernetes Connector instances.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find the Kubernetes instance by clicking on the Kubernetes name or using the Search field.
    
3.  In the row for the Kubernetes instance, click View Details. The Kubernetes Connectors page is displayed with all deployed Kubernetes Connectors. To view all Kubernetes clusters, including ones that are not yet deployed, go to the Kubernetes Connectivity Management page.
    
4.  In the Kubernetes Connectors page, click on a cluster name to open the details pane for that instance.
    
5.  You can perform the following actions on each Kubernetes Connector instance:
    
    | Action | Instructions |
    | --- | --- |
    | Open Cluster Details | In the details pane, click the more options icon and select Open Cluster Details. The Asset Card for that Kubernetes cluster is displayed. |
    | --- | --- |
    | Edit Connector | In the row for the Kubernetes instance, right-click and select Edit. Alternatively, in the details pane, click the more options icon and select Edit Connector. In Edit Kubernetes Connector, edit the configurations and click Apply Changes.You must execute the updated template in the Kubernetes environment for the configuration changes to be applied. |
    | Delete Connector | In the row for the Kubernetes instance, right-click and select Delete. Alternatively, in the details pane, click the more options icon and select Delete Connector. To remove the connector, you must manually run Kubernetes commands to delete the resources in the Kubernetes environment. The commands are listed [here](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#delete). |
    

##### Kubernetes Connectivity Management

Navigate to Settings → Data Sources & Integrations and find the Kubernetes instances by clicking on the Kubernetes name or using the Search field. In the Kubernetes Connectors page, click Kubernetes Connectivity Management to view all detected Kubernetes clusters. Here, you can check if a cluster is connected, view the status, and see the connector version. When a new version of the Kubernetes Connector is available, you can update it here.

**Note:**

After uninstalling the Kubernetes connector, the connector status updates to Not connected 48 hours after the uninstall process is initiated.

### Integrations

Set up an integration instance and start ingesting cases/indicators.

Integrations are mechanisms through which Cortex Cloud connects and communicates with other products. These integrations can be executed through REST APIs, webhooks, and other techniques. Integrations enable you to orchestrate and automate SOC operations.

#### Integrations installed from a content pack

Integrations are included in content packs, which you download and install from Marketplace (go to Settings → Configurations → Marketplace). After you download and install a content pack that includes an integration, you need to configure the integration by adding an instance. You can have multiple instances of an integration, for example, to connect to different environments. Additionally, if you are an MSSP and have multiple tenants, you could configure a separate instance for each tenant.

**Note:**

-   In addition to content packs that you install from Marketplace, related content packs are automatically downloaded when you adopt playbooks or edit tasks that require content items such as scripts or integrations.
    

Cortex Cloud comes out-of-the-box with integrations to help you onboard, such as:

-   Mail Sender
    
    Sends email notifications to users.
    
-   Generic Export Indicators Service
    
    Provides an endpoint with a list of indicators as a service for the system indicators. For more information about how to set up the integration, see Export indicators.Export indicators
    
-   Palo Alto Networks WildFire Reports
    
    Generates a Palo Alto Networks WildFire PDF report. For more information, see [Palo Alto Networks WildFire Reports](https://xsoar.pan.dev/docs/reference/integrations/wild-fire-reports).
    
-   Rasterize
    
    Converts URLs, PDF files, and emails to an image file or PDF file. For more information, see [Rasterize](https://xsoar.pan.dev/docs/reference/integrations/rasterize).
    

#### Create an integration

You can create an integration, by adding parameters, commands, arguments, and outputs as well as writing the necessary integration code. You should have a working Cortex Cloud tenant and programming experience with Python.

1.  Navigate to the Settings → Data Sources & Integrations page and click \+ Add New.
    
2.  In the Add Data Source or Integrations page click Create Integration and select Import File.
    
3.  Drag and drop or browse to and select the relevant integration file.
    

For more information about how to create an integration, including an example, see [Create an Integration](https://xsoar.pan.dev/docs/tutorials/tut-integration-ui).

#### Configure an integration

From the Data Sources & Integrations page, you can perform actions on an integration such as:

| Action | Description |
| --- | --- |
| Add an instance | Configure an integration instance to connect and communicate with other products. For more information, see Add an integration instance. After configuring the instance, you can also enable/disable the integration instance, copy the instance, and view the integration fetch history. |
| View the integration's source | View the integration settings and source code. To access this functionality, select an integration from the table and click ⋮. |
| Edit the integration's source code | Edit the integration settings and source code. For more information about editing the integration's source code, see [Create an Integration](https://xsoar.pan.dev/docs/tutorials/tut-integration-ui). \*\*Note:\*\* If the integration was installed from a content pack, you need to duplicate the integration before editing. |
| Duplicate the integration | If you want to change the source code, and settings, or download the integration, you need to duplicate the integration. To access this functionality, select an integration from the table and click ⋮. |
| Show integration commands | Show the commands the integration contains. To access this functionality, select an integration from the table and click ⋮. |
| Delete an integration instance | Although you cannot delete an integration installed from a content pack (unless a duplicate), you can delete an integration instance by either right-clicking an instance and either selecting Delete or by right-clicking an instance and selecting Settings and then deleting from the settings configuration pane. |
| Set an integration instance to run always whenever the integration is called or on demand | For each integration instance, you have the option of setting the instance to be used only On Demand, when it is specified with the `using` argument in a playbook or the CLI. By default, the settings is Always and the integration instance is used whenever the integration is called. |

#### Use integration commands

The command line interface (CLI) enables you to run system commands, integration commands, scripts, etc from the Cases War Room, Issues War Room, or Playground CLI. The CLI auto-complete feature allows you to find relevant commands, scripts, and arguments.

Cortex Cloud uses the "`!`" such as `!ad-create-user username=[name of user]`

Under each integration, you can view a list of commands.

**Note:**

Integration commands are only available when the integration instance is enabled. Some commands depend on a successful connection between Cortex Cloud and third-party integrations.

You can run the CLI commands in the Playground or in a case/issue War Room. The Playground is a non-production environment where you can safely develop and test automation scripts, APIs, commands, etc. It is an investigation area that is not connected to a live (active) investigation.

When running the command, the results are returned in the War Room or Playground and also in a JSON format in Context Data.

**Tip:**

In the Playground, you can clear the context data, if needed, which deletes everything in the Playground context data, but does not affect the actual issue or case. To clear the context, run `!DeleteContext all=yes'` from the CLI or click Clear Context Data while viewing the context data.

#### Integration use cases

Common integration use cases for Cortex Cloud, including analytics and SIEM, authentication, case management, data enrichment, threat intelligence, forensics and malware.

The following categories are common use cases for Cortex Cloud integrations. While this list is not meant to be exhaustive, it's a starting point to understand what use cases are supported by Cortex Cloud and third-party integrations.

##### Analytics and SIEM

Top use cases:

-   Fetch issues with relevant filters.
    
-   Create, close, and delete issues/events/cases.
    
-   Update issues - update status, assignees, severity, SLA, and more.
    
-   Get events related to an issue/case for enrichment/investigation purposes.
    
-   Query SIEM (consider aggregating logs).
    

These integrations usually include the Fetch Issues or Fetch Alerts option for an integration instance configuration. The integration may also include integration commands enabling you to list or retrieve issues or related information.

Analytics & SIEM integration Example: ArcSight ESM

##### Authentication and Identity Management

Top use cases:

-   Use credentials from the authentication vault to configure instances in Cortex Cloud. (Save credentials in: Settings → Configurations → Integrations → Credentials.) Integrations that use credentials from the vault should have the Switch to credentials option.
    
-   Lock/Delete Account – Use an integration to lock/unlock a third-party account.
    
-   Reset Account - Perform a reset password command for a third-party account.
    
-   Lock an external credentials vault - in case of an emergency (if the vault has been compromised), allow the option to lock/unlock the entire vault via an integration.
    
-   Step-Up authentication - Enforce Multi-Factor Authentication for an account.
    
-   Create, update, and delete users.
    
-   Manage user groups.
    
-   Block users, force a change of passwords.
    
-   Manage access to resources and applications.
    
-   Create, update, and delete roles.
    

Authentication integration example: CyberArk AIM v2 (Partner Contribution)

##### Case Management

Top use cases:

-   Create, get, edit, close a ticket or issue, and add and view comments.
    
-   Assign a ticket/issue to a specified user.
    
-   List all tickets, and filter by name, date, and assignee.
    
-   Get details about a managed object, update, create, or delete.
    
-   Add and manage users.
    

Case Management/Ticketing integration example: ServiceNow V2

##### Data Management and Threat Intelligence

Top use cases:

-   Enrich information about different IOC types: Upload object for scan and get the scan results. (If there’s an option to upload private/public, the default should be set to private.) Search for former scan results about an object to get information about a sample without uploading it yourself. Enrich information and scoring for the object.
    
-   Add indicators to the system and search for existing indicators.
    
-   Add indicators to the exclusion list.
    
-   Calculate DBot Score for indicators.
    
-   Enrich asset – get vulnerability information for an asset (or a group of assets) in the organization.
    
-   Generate/trigger a scan on specified assets.
    
-   Get a scan report including vulnerability information for a specified scan and export it.
    
-   Get details for a specified vulnerability.
    
-   Scan assets for a specific vulnerability.
    

Data Enrichment & Threat Intelligence integration example: Unit 42 Intelligence.

##### Email

Top use cases:

-   Get message – download the email itself, retrieve metadata, and body.
    
-   Download attachments for a given message.
    
-   Manage senders – block/allow specified mail senders.
    
-   Manage URLs – block/allow the sending of specified URLs.
    
-   Encode/decode URLs in messages
    
-   Release a held message when a gateway has placed a suspicious message on hold.
    

Email Gateway integration example: MimeCast v2

##### Endpoint

Top use cases:

-   Fetch issues and events
    
-   Get event details (from a specified alert)
    
-   Quarantine a file
    
-   Isolate and contain endpoints
    
-   Update indicators (for example, network and hashes) by policy (can be block, monitor) – deny list
    
-   Add indicators to the exclusion list
    
-   Search for indicators in the system (see indicators and related issues/events)
    
-   Download a file based on the hash and the path
    
-   Trigger scans on specified hosts
    
-   Update .DAT files for signatures and compare existing .DAT files to the newest one on the Cortex Cloud tenant
    
-   Get information for a specified host (OS, users, addresses, hostname)
    
-   Get policy information and assign policies to endpoints
    

##### Forensics and Malware Analysis

Top use cases:

-   Submit a file and get a report (detonation)
    
-   Submit a URL and get a report (detonation)
    
-   Search for past analysis (input being a hash/URL)
    
-   Retrieve a PCAP file
    
-   Retrieve screenshots taken during analysis
    

Forensic and Malware Analysis example: Cuckoo Sandbox

##### Network Security

Top use cases:

-   Create block/accept policies (source, destination, port), for IP addresses and domains
    
-   Add addresses and ports (services) to predefined groups, create groups, and more
    
-   Support custom URL categories
    
-   Fetch network logs for a specific address for a configurable time frame
    
-   URL filtering categorization change request
    
-   Built-in blocked rule command for fast blocking
    
-   If there is a Management Firewall, allow the option to manage policy rules through it
    
-   Get/fetch issues
    
-   Get PCAP file, packet
    
-   Get network logs filtered by time range, IP addresses, ports, and more
    
-   Create/manage/delete policies and rules
    
-   Update signatures from an online source/upload + get the last signature update information
    
-   Install policy (if existing)
    

Network Security Firewall integration examples: Tufin (Partner Contribution), Protectwise

##### Vulnerability Management

Top use cases:

-   Enrich asset – get vulnerability information for an asset (or a group of assets) in the organization.
    
-   Generate/trigger a scan on specified assets
    
-   Get a scan report including vulnerability information for a specified scan and export it
    
-   Get details for a specified vulnerability
    
-   Scan assets for a specific vulnerability
    

Vulnerability Management integration example: Tenable.sc

#### Add an integration instance

Configure an integration instance to use integration commands in playbooks, the case and issue War Rooms, and the Playground.

To use a downloaded integration, you must configure an integration instance.

Before you begin:

-   Content packs containing integrations are downloaded when you adopt playbooks and configure playbook tasks. The content pack must be downloaded before you can configure an integration instance.
    
-   Consider whether you want to add credentials, which enable you to save login information without exposing usernames, passwords, certificates, and SSH keys. For more information, see Manage credentials.Manage credentials
    
-   Although you can view integration documentation when adding an instance, [https://xsoar.pan.dev/](https://xsoar.pan.dev/docs/reference/index) has more detailed information about integrations, including commands, outputs, and recommended permissions.
    

1.  Navigate to Settings → Data Sources & Integrations and search for the integration for which you want to add an instance.
    
2.  Select the integration and click Add Instance.
    
3.  Add the parameters as required.
    
4.  (Optional) To check that the integration instance is working correctly, click Test.
    
5.  Save & Exit.
    
    You can expand the integration to see more details about the integration instance, enable or disable the integration instance, and copy the instance.
    
    If you encounter an error, see Troubleshoot Integrations.Troubleshoot Integrations
    
6.  By default, the integration instance is used whenever the integration is called. If you want to only use the integration instance when specified with the `using` argument in a playbook or the CLI, change the integration instance setting from Always to On Demand. For example, you might have two instances of an integration and want to use one instance as the default and the other instance only for manual testing on demand.

#### Configure integration permissions

Integration permissions enable you to restrict running commands to specific roles in integrations.

You can use role-based access control (RBAC) to restrict running commands to specific roles at the integration instance level. If you have multiple instances of the same integration, you can assign different roles (permission levels) for the same command in each instance.

For example, you may want limit the roles that can run potentially harmful commands, such as the ability to isolate endpoints.

Users who do not have permission to run a command cannot do the following:

-   Run the command from the CLI.
    
-   Complete pending tasks in a Work Plan that uses the restricted command.
    
-   Edit arguments for playbook tasks that use the restricted command.
    
-   Select the command when editing a playbook.
    
-   Leverage the restricted command when executing a reputation command, such as IP, Domain, and File.
    

If you have multiple instances of the same integration, you can assign different roles (permission levels) for the same command in each instance.

To view or edit integration permissions:

1.  Go to Settings → Configurations → Data Collection → Integration Permissions.
    
    You can see a list of all enabled integrations.
    
2.  Select the integration.
    
    You can see the following:
    
    -   INSTANCE: Lists all instances for the integration.
        
    -   COMMANDS: Lists all commands for the integration.
        
    -   PERMITTED ROLES: Lists the roles that have permission to run the command. Default is No Restrictions.
        
    
3.  For a specific command, restrict the roles that can run the command.
    
    1.  Go to the relevant command.
        
    2.  Click Edit.
        
    3.  In the PERMITTED ROLES, column, select the roles that you want to allow running the command.
        
    
4.  Save the integration permissions.

#### Fetch issues from an integration instance

Configure a third-party integration instance to fetch issues into Cortex Cloud cases for investigation.

You can poll third-party integration instances for events and turn them into Cortex Cloud issues (fetching). Many integrations support fetching, but not all support this feature. You can view each integration in the [Developer Hub](https://xsoar.pan.dev/docs/reference/index).

When setting up an instance, you can configure the integration instance to fetch events. You can also set the interval for which to fetch new issues by configuring the Issue Fetch Interval field. The fetch interval default is 1 minute. This enables you to control the interval in which an integration instance reaches out to third-party platforms to fetch issues into Cortex Cloud.

**Note:**

-   In some integrations, the Issue Fetch interval is called Feed Fetch Interval.
    
-   If the integration instance does not have the Issue Fetch Interval field, you need to add this field by editing the integration settings. If the integration is from a content pack, you need to create a copy of the integration. Any future updates to this integration will not be applied to the copy integration.
    
-   If you turn off fetching for a while and then turn it on or disable the instance and enable it, the instance remembers the last run and pulls all events that occurred while it was off. If you don't want this to happen, verify that the instance is enabled and click Reset the “last run” timestamp when editing the instance. Also, note that "last run" is retained when an instance is renamed.
    

After configuring the instance, you may need to set up a correlation rule to ingest issues.

Correlation rules are predefined logic or patterns that Cortex Cloud uses to identify relationships between disparate events occurring across an organization's IT environment. If the conditions specified in the rule are met, Cortex Cloud generates an issue.

How to fetch issues

1.  Navigate to Settings → Data Sources & Integrations, find and select the integration, and click Add Instance.
    
2.  In the integration's dialog box, select Fetch issues.
    
    After this setting is enabled, Cortex Cloud searches for events that occurred within the time frame set for the integration, which is based on the specific integration. The default is 10 minutes, but it can be changed in the integration script.
    
3.  (Optional) In the Issue Fetch Interval field, set the interval of hours and minutes to fetch alerts (default 1 minute).
    
4.  (Optional) If the Issue Fetch Interval field does not appear, add it to the integration.
    
    Relevant for any issue fetching integration:
    
    1.  For integrations installed from a content pack, select the duplicate integration button.
        
        If you have already duplicated the integration, click the Edit integration’s source button.
        
    2.  In the Basic section, select the Fetch issues checkbox.
        
        In the Parameters section, you can see that the **`IssueFetchInterval`** parameter is added. Change the default value if necessary.
        
    3.  Click Save to save the changes.
        
5.  To generate issues, add correlation rules, as required.
    
    **Note:**
    
    Some content packs include preconfigured correlation rules, but you should review them to see if they suit your use case and duplicate them if required. Go to Threat Management → Detection Rules → Correlations, search for the relevant rule, right-click, and select Preview Rule. For example, the ServiceNow v2 Alerts (automatically generated) correlation rule uses the following XQL Query:
    
    ```
    dataset = servicenow_v2_generic_alert_raw
    | filter _alert_data != null
    | alter alert_severity = json_extract_scalar(_alert_data, "$.severity")
    | alter alert_category = json_extract_scalar(_alert_data, "$.alert_category")
    | alter alert_name = json_extract_scalar(_alert_data, "$.alert_name")
    | alter alert_description = json_extract_scalar(_alert_data, "$.alert_description")
    ```
    
    You may want to update the query by defining complex, multi-source detection logic or add filters, such as alert severity or assignee.

##### Map fields to issue types

You can create independent mappers for integrations.

Mappers enable you to map information from incoming events to the issue fields that you have in your system. You can map to system issue fields or custom issue fields.

Mapping event attributes or issue fields takes place in two stages. First you map all of the fields that are common to all issues in the default mapping. Second, you map the additional fields that are specific for each issue indicator type, or overwrite the mapping that you used in the default mapping.

**Note:**

In the Classification & Mapping page, the mapping does not indicate for which issue types they are configured. Therefore, when creating a mapper, it is best practice to add to the mapper name, the issue types the mapper is for. For example, Mail Listener - Phishing.

**Note:**

When mapping a list, we recommend you map to a multi select field. Short text fields do not support lists. If you do need to map a list to a short text field, add a transformer in the relevant playbook task, to split the data back into a list.

You can use this procedure for creating a classifier or duplicating an existing mapper for issue types.

1.  Navigate to Settings → Configurations → Object Setup → Issues → Classification & Mapping.
    
2.  Click New and select Issue Mapper (incoming). The Issue Mapper maps all of the fields you are pulling from the integrations to the issue fields in your layouts.
    
3.  Under Get data, select from where you want to pull the information based on where you want to map the issue types.
    
    -   Pull from instance - select an existing integration instance.
        
    -   Select schema - when supported by the integration, this pulls all of the fields for the integration from the database. This enables you to see all of the fields for each given event type that the integration supports.
        
    -   Upload JSON - upload a formatted JSON file which includes the field you want to map.
        
    
4.  Under Issue Type, start by mapping out the Common Mapping. This mapping includes the fields that are common to all of the issue types and will save time having to define these fields individually in each issue type.
    
5.  Click the event attribute to which you want to map. You can further manipulate the field using filters and transformers.
    
    You can click Auto Map to automatically map fields with common or similar names to fields in Cortex Cloud . For example, Severity to Importance or Description to Description.
    
6.  Repeat this process for the other issue types for which this mapping is relevant.
    
7.  Click Save.
    
8.  Go to Settings → Data Sources & Integrations.
    
    1.  Select the integration instance to which you want to apply the mapper.
        
    2.  In the integration settings, under Mapper (incoming) select the mapper you created and click Save.

##### Classify events using a classifier for issue types

Classify events using a classification key in an integration ingestion.

When an integration fetches issues, it populates the rawJSON object in the issue object. The rawJSON object contains all of the attributes for the event. For example, source, when the event was created, the priority that was designated by the integration, etc. When classifying the event, you want to select an attribute that can determine the event type.

You can use this procedure for creating a classifier or duplicating an existing classifier.

1.  Go to Settings → Configurations → Object Setup → Issues → Classification & Mapping.
    
2.  Click New and select Issue Classifier.
    
    If you want to duplicate the classifier, select the relevant classifier and then duplicate it.
    
3.  Under Get data, select from where you want to pull the information based on which you will classify the issue types.
    
    -   Pull from instance - select an existing integration instance.
        
    -   Select schema - when supported by the integration, this will pull all the fields for the integration from the database from which you can select by which to classify the events.
        
    -   Upload JSON - upload a formatted JSON file which includes the field by which you want to classify.
        
    
4.  In the Select Instance field, select the instance from where you want to choose the value.
    
5.  In the Data fetched from select the value by which you want to classify the events.
    
6.  Drag values from the Unmapped Values column to the relevant issue type on the right.
    
    You can optionally choose a default issue type for unclassified issues from Direct unclassified events to: Select.
    
    
    
7.  Click Save.
    
8.  Go to Settings → Data Sources & Integrations.
    
    1.  Select the integration to which you want to apply the classifier.
        
    2.  In the integration settings, under Classifier, select the classifier you created and click Save.

#### Troubleshoot Integrations

Learn how to troubleshoot your integration in Cortex Cloud.

The Troubleshooting Instances dashboard provides you with insight into command execution errors. When troubleshooting integrations, we recommend the following steps:

-   Use the Test button in the integration instance.
    
-   Verify the integration settings. Check settings such as usernames, URLs, and passwords.
    
-   Download the debug log file and review its contents.
    
    In the following example, you receive a 401 unauthorized error code after testing the integration.
    
    
    
    Click Run Test & Download Debug Log, to download the debug file locally. You can verify what server the URL request is being forwarded to and any other reasons as to why you received this error code. The 401 unauthorized error code usually relates to invalid error credentials, expired tokens, or incorrect API settings.
    
-   Enable verbose or debug-level logging on the integration.
    

If you are unable to fix the integration, contact Customer Support for further assistance.

#### Forward requests to long-running integrations

Configure and manage long-running integrations to export internal data from Cortex Cloud.

Some long-running integrations provide internal data via API calls to your third-party software, such as a firewall. You can set up Cortex Cloud to allow third-party software to access long-running integrations installed either on the Cortex Cloud tenant or on an engine.

Long-running integrations provide internal data via API calls such as:

| Integration | Description | See More |
| --- | --- | --- |
| O365 Teams (Using Graph API) | Get authorized access to a user's Teams app in a personal or organizational account. | [O365 Teams (Using Graph API)](https://xsoar.pan.dev/docs/reference/integrations/microsoft-graph-teams) |
| Generic Webhook | Creates cases on event triggers. The trigger can be any query posted to the integration. | [Generic Webhook](https://xsoar.pan.dev/docs/reference/integrations/generic-webhook) |
| Generic Export Indicators Service | Use the Generic Export Indicators Service integration to provide an endpoint with a list of indicators as a service for the system indicators. \*\*Note:\*\* This integration replaces the External Dynamic list integration, which is deprecated. For more information about how to set up the integration, see Manage external dynamic lists.Manage external dynamic lists | Generic Export IndicatorsExport indicators |
| Microsoft Teams | Send messages and notifications to team members. | [Microsoft Teams](https://xsoar.pan.dev/docs/reference/integrations/microsoft-teams) |
| TAXII Server | Provides TAXII Services for system indicators (Outbound feed). | [TAXII Server](https://xsoar.pan.dev/docs/reference/integrations/taxii-server) |
| TAXII2 Server | Provides TAXII2 Services for system indicators (outbound feed). You can choose to use TAXII v2.0 or TAXII v2.1. | [TAXII2 Server](https://xsoar.pan.dev/docs/reference/integrations/taxii2-server) |
| PingCastle | Listens for PingCastle XML reports. | [PingCastle](https://xsoar.pan.dev/docs/reference/integrations/ping-castle) |
| Publish List | Publishes Cortex Cloud lists for external consumption. | [Publish List](https://cortex.marketplace.pan.dev/marketplace/details/PublishList/) |
| Simple API Proxy | Provides a simple API proxy to restrict privileges or minimize the number of credentials issued at the API. | [Simple API Proxy](https://cortex.marketplace.pan.dev/marketplace/details/SimpleAPIProxy/) |
| Syslog v2 | Opens cases automatically from Syslog clients. | [Syslog v2](https://xsoar.pan.dev/docs/reference/integrations/syslog-v2) |
| Web File Repository | Make your environment ready for testing purposes for your playbooks or automations to download files from a web server. | [Web File Repository](https://xsoar.pan.dev/docs/reference/integrations/web-file-repository#context-output) |

**Note:**

-   When running on the tenant, you can only use long-running integrations provided by Cortex Cloud, you cannot create custom ones. Custom long-running integrations are supported only on engines at this time.
    
-   Configuring custom certificates or private API Keys in the long-running integration instance is supported only on engines, not on the Cortex Cloud tenant.
    
-   If you have configured a range of Approved IP Ranges under Allowed Sessions on the Security Settings page, any incoming communication must be from approved IP addresses.
    

##### Credentials

For long-running integrations running on a tenant, you must set a username and password. For long-running integrations running on an engine, we strongly recommend setting a username and password, but it is not required.

Users with sufficient permissions can set the username and password for specific integration instances from the Data Sources & Integrations page.

##### Test the long-running integration connection

-   **Integration instance running on a tenant**
    
    You can use CURL commands from any terminal to access and test the long-running integration. The string `xdr` in the URL must be replaced by `crtx` and the data URL must always be prefixed by `ext-`.
    
    **Note:**
    
    For the TAXII Server and TAXII2 Server integrations, the `xdr` string is automatically replaced by `crtx`. For the Microsoft Teams integration, you can use the `microsoft-teams-create-messaging-endpoint` command to get the correct messaging endpoint based on the server URL, the server version, and the instance configurations. For more information, see [Microsoft Teams](https://xsoar.pan.dev/docs/reference/integrations/microsoft-teams).
    
    Example:
    
    **Tenant URL**: https://crtx-cnt-onr-xsiam-dran-9c0.xdr-qa2-uat.us.com
    
    **Request URL**: https://ext-crtx-cnt-onr-xsiam-dran-9c0.crtx-qa2-uat.us.com/xsoar/instance/execute/edl_instance_01\\?q\\=type:ip
    
    **CURL**: curl -v -u user:pass https://ext-crtx-cnt-onr-xsiam-dran-9c0.crtx-qa2-uat.us.com/xsoar/instance/execute/edl_instance_01\\?q\\=type:ip
    
-   **Integration instance running on an engine**
    
    You can use CURL commands from any terminal to access and test the long-running integration at the engine URL:
    
    `http://<engine-address>:<integration listen port>/`
    
    For example, `curl -v -u user:pass http://<engine_address>:<listen_port>/?n=50`
    

Curl request parameters

When sending a curl request to the URL, use the following parameters:

| Argument | Description | Example |
| --- | --- | --- |
| **`n`** | The maximum number of entries in the output. If no value is provided, will use the value specified in the List Size parameter in the integration instance settings. | **`https://ext-<tenant-address>/instance/execute/<ExportIndicators_instance_name>?n=50`** |
| **`s`** | The starting entry index from which to export the indicators. | **`https://ext-<tenant-address>/instance/execute/<ExportIndicators_instance_name>?s=10&n=50`** |
| **`v`** | The output format. Supports PAN-OS (text), CSV, JSON, mwg, and proxysg (alias: bluecoat). | **`https://ext-<tenant-address>/instance/execute/<ExportIndicators_instance_name>?v=json`** |
| **`q`** | The query is used to retrieve indicators from the system. | **`https://ext-<tenant-address>/instance/execute/<ExportIndicators_instance_name>?q="type:ip and sourceBrand:my_source"`** |
| **`t`** | Only with mwg format. The type is indicated at the top of the exported list. Supports: string, applcontrol, dimension, category, ip, mediatype, number, and regex. | **`https://ext-<tenant-address>/instance/execute/<ExportIndicators_instance_name>?v=mwg&t=ip`** |
| **`sp`** | If set, will strip ports off URLs; otherwise, will ignore URLs with ports. | **`https://ext-<tenant-address>/instance/execute/<ExportIndicators_instance_name>?v=text&sp`** |
| **`di`** | Only with PAN-OS (text) format. If set, will ignore URLs that are not compliant with PAN-OS URL format instead of being rewritten. | **`https://ext-<tenant-address>/instance/execute/<ExportIndicators_instance_name>?v=text&di`** |
| **`cr`** | If set, will strip protocols off URLs. | **`https://ext-<tenant-address>/instance/execute/<ExportIndicators_instance_name>?v=text&pr`** |
| **`cd`** | Only with proxysg format. The default category for the exported indicators. | **`https://ext-<tenant-address>/instance/execute/<ExportIndicators_instance_name>?v=proxysg&cd=default_category`** |
| **`ca`** | Only with proxysg format. The categories that will be exported. Indicators not in these categories will be classified as the default category. | **`https://ext-<tenant-address>/instance/execute/<ExportIndicators_instance_name>?v=proxysg&ca=category1,category2`** |
| **`tr`** | Only with PAN-OS (text) format. Whether to collapse IPs. 0 - Do not collapse.; 1 - Collapse to ranges.; 2 - Collapse to CIDRs | **`https://ext-<tenant-address>/instance/execute/<ExportIndicators_instance_name>?q="type:ip and sourceBrand:my_source"&tr=1`** |
| **`tx`** | Whether to output CSV formats as textual web pages. | **`https://ext-<tenant-address>/instance/execute/<ExportIndicators_instance_name>?v=csv&tx`** |

##### Define a listening port for long-running integrations

When configuring a long-running integration instance, you may need to define a listening port.

-   **Integration Instance Running on a Tenant**
    
    If the long-running integration runs on the Cortex Cloud tenant, you do not need to enter a Listen Port in the instance settings. The system auto-selects an unused port for the long-running integration when the instance is saved.
    
-   **Integration Instance Running on an Engine**
    
    You must set the Listen Port for access when configuring a long-running integration instance on an engine. Use a unique port for each long-running integration instance. Do not use the same port for multiple instances.

### Verify collector connectivity

Verify collector connectivity and troubleshoot collector errors.

You can verify the connectivity status of a collector instance on the Data Sources & Integrations page. Instances are grouped by integration, and the Instances Status column shows icons that summarize the instance statuses for the integration. Click the integration to see details for each individual instance.

#### Troubleshooting collector errors

**Note:**

For more information on troubleshooting data collector applet errors, see Troubleshoot Broker VM applet connectivity.

Where can I see if I have a connectivity error on a collector instance?

On the Data Sources & Integrations page, instances in error status display an error icon. Hover over the error icon next to the instance name to see the error message as received from the API.

Where can I trace the connectivity changes of a collector instance?

Each status change of an instance is logged in the `collection_auditing` dataset. Querying this dataset can help you see all the connectivity changes of an instance over time, the escalation or recovery of the connectivity status, and the error, warning, and informational messages related to status changes.

Example 158. 

This example searches for status changes on Strata IOT integrations:

```
dataset = collection_auditing 
|filter collector_type = "STRATA_IOT"
```

### Overview of data ingestion metrics

Learn more about the data ingestion health metrics in the `metrics_source` dataset and the `metrics_view` preset.

**Prerequisite:**

For Cortex Cloud to monitor data ingestion health and create health issues, you must enable Cortex - Analytics. Go to Configurations → Cortex - Analytics. For more information, see Enable the Analytics Engine and Identity Analytics.Enable the Analytics Engine and Identity Analytics

The data ingestion metrics are calculated in 5-minute aggregation periods and saved to the `metrics_source` dataset and `metrics_view` preset. These metrics measure the amount, size, and rate at which logs are ingested by a data source:

| Metric | Description |
| --- | --- |
| total_size_bytes | Total size (in bytes) of the logs collected during the aggregation period. |
| total_size_rate | Average size (in bytes per second) of the logs collected during the aggregation period. |
| total_event_count | Total number of logs collected during the aggregation period |
| total_event_rate | Average number (in count per second) of logs collected during the aggregation period. |

In the `metrics_source` dataset, the data ingestion metrics are saved alongside additional fields that describe the data source associated with the metrics. Only entries with ingestion metric values greater than zero are saved in the dataset. Entries with zero values are not saved in this dataset.

`metrics_view` is a preset for data in the `metrics_source` dataset. The preset also simulates completion of entries with zero values in data ingestion metrics at runtime, which allows effective use of metrics. Therefore, when investigating disruptions in data collection, we recommend using the `metrics_view` preset in XQL queries and correlation rules.

In addition, you can create your own custom logic for data ingestion health monitoring by setting up correlation rules that monitor the data ingestion metrics. For more information, see Creating correlation rules to monitor data ingestion health.

The following table describes all the fields in the `metrics_source` dataset and `metrics_view` preset:

Read more...

| Field | Type | Description |
| --- | --- | --- |
| total_size_bytes | Integer | Total size (in bytes) of the logs collected during the aggregation period. |
| total_size_rate | Integer | Average size (in bytes per second) of the logs collected during the aggregation period. |
| total_event_count | Integer | Total number of logs collected during the aggregation period. |
| total_event_rate | Integer | Average number (in count per second) of logs collected during the aggregation period. |
| data_freshness_max_delay | Float | Maximum delay value from all log entries in a record between log creation at the source and ingestion into Cortex Cloud (in seconds). |
| data_freshness_median | Float | Median delay value from all log entries in a record between log creation at the source and ingestion into Cortex Cloud (in seconds). |
| data_freshness_ninetieth_percentile | Float | Ninetieth percentile of delay values from all log entries in a record between log creation at the source and ingestion into Cortex Cloud (in seconds). |
| last_seen | Datetime | Time that the last logs were collected. |
| _vendor | String | Vendor of the observing data source. |
| _product | String | Product name of the observing data source. |
| _device_id | String | (For firewall devices) Device ID |
| _log_type | String | (For firewall devices) Log type |
| _collector_name | String | (Event Metadata) Name of the collector instance. |
| _collector_id | String | (Event Metadata) ID of the XDR Collector. |
| _collector_ip | String | (Event Metadata) IP address of the XDR Collector. |
| _reporting_device_name | String | (Event Metadata) Host name of the device where the log originated. |
| _reporting_device_ip | String | (Event Metadata) IP Address of the device where the log originated. |
| _final_reporting_device_name | String | (Event Metadata) Hostname of the device that the log was extracted from. |
| _final_reporting_device_ip | String | (Event Metadata) IP of the device that the log was extracted from. |
| _broker_device_name | String | (Event Metadata) Host name of the Broker VM. |
| _broker_device_ip | String | (Event Metadata) IP address of the Broker VM. |
| _broker_device_id | String | (Event Metadata) ID of the Broker VM. |
| _time | Datetime | Timestamp of the interval. |
| _insert_timestamp | Datetime | Recorded time of the entry. |

#### Creating correlation rules to monitor data ingestion health

See examples of correlation rules for monitoring data ingestion health.

In addition to the OOTB Ingestion health issues, you can build your monitoring logic for ingestion by creating correlation rules that are specific to your requirements. You can create rules that monitor the data ingestion metrics for a specific source within a specific timeframe, and trigger ingestion health issues if there is a deviation from the regular pattern of log collection.

The following examples can help you set up your own correlation rules with the data ingestion metrics:

Example 1: No logs collected from a data source for 1 hour

In this example, the correlation runs every hour and calculates the number of logs that are collected for each data source over the previous hour. If no logs are collected for a data source during an aggregation period, a security issue is triggered.

Example XQL:

```
preset = metrics_view  
| comp sum(total_event_count) as total_event_count_sum by _collector_id, _collector_ip, 
_collector_name, _collector_type, _final_reporting_device_ip, _final_reporting_device_name,
 _broker_device_id, _vendor, _product 
| filter total_event_count_sum = 0
```

Addition fields to specify in the correlation rule:

| Field | Value |
| --- | --- |
| Time Schedule | Hourly |
| Query time frame | 1 Hour |
| Issue Suppression | Select Enable issue suppression. |
| Fields | Uncheck **`total_event_rate_sum`**, leave other fields checked. |
| Action | Select Generate issue. |
| Issue Domain | Health |
| Severity | High |
| Type | Ingestion |
| Issue Fields Mapping | Select Use preconfigured fields to map the fields that are relevant to data ingestion health. |

Example 2: No logs received from a Firewall for 20 minutes

In this example, the correlation runs every 20 minutes and calculates the number of logs that are received for each firewall in a lookup dataset during the last 20 minutes. If no logs are received from a device during an aggregation period, a security issue is triggered.

Example XQL:

```
preset = metrics_view  
| join conflict_strategy = left  type = inner (dataset = ngfw_device_Id_keepalive 
| fields _device_id) as devices devices._device_id = _device_id  | comp sum(total_event_count)
 as total_event_count_sum by _device_id, _product,_vendor 
| filter total_event_count_sum = 0
```

Addition fields to specify in the correlation rule:

| Field | Value |
| --- | --- |
| Time Schedule | Every 20 minutes |
| Query time frame | 20 minutes |
| Issue Suppression | Select Enable issue suppression. |
| Fields | Uncheck **`total_event_rate_sum`**, leave other fields checked. |
| Action | Select Generate issue. |
| Issue Domain | Health |
| Severity | High |
| Type | Collection |
| Issues Fields Mapping | Select Use preconfigured fields to map the fields that are relevant to data ingestion health. |

#### Measuring data freshness

Learn more about the data freshness metrics collected by Cortex Cloud.

Cortex Cloud provides metrics that calculate the freshness of your ingested data and highlight delays in your data collection. The metrics calculate the freshness delay value by measuring the difference between log creation at the source (`_TIME`) and ingestion into Cortex Cloud (`_INSERT_TIME`).

Metrics are collected and calculated per data source during five-minute aggregation periods and allocated into the following buckets. The recorded freshness delay value is the top value in the range of the bucket:

-   0 to 30 seconds → 30 seconds
    
-   30 to 60 seconds → 60 seconds
    
-   60 seconds to 5 minutes → 300 seconds
    
-   5 minutes to 1 hour → 3,600 seconds
    
-   1 hour to 24 hours→ 86,400 seconds
    
-   24 hours to week→ 604,800 seconds
    

| Metric | Description |
| --- | --- |
| data_freshness_max_delay | Maximum freshness delay value among all log entries in an aggregation period. This reflects the worst case. |
| data_freshness_median | Median freshness delay value among all log entries in an aggregation period. 50% of values are smaller than the median, and 50% of values are higher or equal to the median. |
| data_freshness_ninetieth_percentile | Ninetieth percentile of delay values among all log entries in an aggregation period. This delay value is 90% higher than other log entry differences. It reflects the worst case, but eliminates the spikes. |

The metrics are saved to the `metrics_source` dataset and are also available in the `metrics_view` preset.

**Note:**

-   The max_delay metric is taken from the maximum bucket value with a restricted limit; therefore, metrics show whole numbers.
    
-   The median and ninetieth_percentile metrics are statistical calculations that give an approximation of the real value; therefore, metrics show decimal numbers.
    
-   Time slots with a zero log count or zero byte count display records with zero values. Subsequently, the data freshness metrics will also have zero values.
    
-   Timezone differences between `_TIME` and `_INSERT_TIME` might cause time skews with negative differences. Negative differences are rounded to zero values.

### About health issues

Cortex Cloud provides health issues to help you monitor the health and integrity of supported Cortex Cloud resources. Health issues comprise ingestion, collection, correlation, and event forwarding errors.

**Prerequisite:**

For Cortex Cloud to monitor data ingestion health and create health issues, you must enable the following settings under Configurations:

Cortex - Analytics: Go to Configurations → Cortex - Analytics. For more information, see Enable the Analytics Engine and Identity Analytics.Enable the Analytics Engine and Identity Analytics

Cortex Cloud provides health issues to help you monitor the health and integrity of supported Cortex Cloud resources. Health issues provide insights into health drifts, such as failure events or status changes. The issues help you stay on top of your health related errors and ensure optimal performance in Cortex Cloud. In addition, you can set up notifications on health issues.

Health issues are associated with the Health Domain. When setting up notification forwarding or other configurations for health issues, use the filter Issue Domain = Health.

To view health issues, go to Settings → Health Issues, or on the Issues page select the Health Domain table view. Click an issue to see more details in the issue card, or right-click to take actions and investigate an issue. For more information, see Investigate and resolve health issues.

**Note:**

The Health Issues page displays issues that were triggered after July 2024. To see health issues that were triggered before this date, click Legacy Health Issues.

#### Types of health issues

Cortex Cloud provides the following types of OOTB health issues:

-   **Ingestion issues**: Triggered by interruptions in data ingestion, or deviation from the calculated ingestion baseline
    
-   **Correlation issues**: Triggered by correlation rules that complete with an error status
    
-   **Automation issues**: Triggered by system monitoring of metrics and thresholds for potential automation misconfigurations that can cause performance issues. Automation issues are processed daily to provide an aggregated status of multiple threshold crossings.
    

**Note:**

Cortex Cloud enforces the dedup logic to health issues. This logic reduces the likelihood of identical health issues from flooding the issues dataset.

#### Query health issue data

Health issues are associated with the Health domain. To query health issue data, use the following XQL:

```
dataset = alerts | filter alert_domain = "DOMAIN_HEALTH"
```

#### Health issue field descriptions

The following table describes the health issue fields.

| Field | Description |
| --- | --- |
| Issue ID | A unique identifier that Cortex Cloud assigns to each issue. |
| Issue Name | Name of the issue. |
| Issue Type | Type of health issue. |
| Issue Source | Source of the issue. |
| Broker VM ID | ID of the Broker VM. |
| Broker VM Name | Host name of the Broker VM. |
| Broker VM IP | IP address of the Broker VM. |
| Collector Name | Name of the collector instance. |
| Collector Type | Type of the collector. |
| Description | Text summary of the event including the issue source, issue name, and severity. |
| Device ID | Firewall device ID. |
| Excluded | Whether the issue is excluded. |
| External ID | Issue ID as recorded in the detector from which this issue was sent. |
| Final Reporting Device IP | IP of the device from which the log was extracted. |
| Final Reporting Device Name | Hostname of the device from which the log was extracted. |
| Ingestion Failure Duration | Amount of time that logs were not received or a drop in log ingestion was detected in minutes. |
| Observation Time | Time that the issue was observed in the system. |
| Playbook | Playbook that was run. |
| Playbook run status | Status of the playbook. |
| Product | Product name of the observing data source. |
| Resolution Status | Status that was assigned to this issue when it was triggered (or modified). Right-click an issue to change the status. If you set the status to Resolved, select a resolution reason. |
| Reporting Device Name | Host name of the device where the log originated. |
| Reporting Device IP | IP Address of the device where the log originated. |
| Severity | Severity level that was assigned to this issue when it was triggered (or modified). |
| Starred | Whether the issue is starred by starring configuration. |
| Vendor | Vendor of the observing data source. |
| XDR Collector ID | ID of the XDR Collector. |
| XDR Collector IP | IP address of the XDR Collector. |
| XDR Collector Name | Host name of the XDR Collector. |

#### Investigate and resolve health issues

You can investigate and take action on health issues from the Health Issues page and the Issues Table.

The following tasks explain how to investigate and resolve health issues. You can see health issues on the following pages:

-   Go to Settings → Health Issues
    
-   Go to Cases & Issues → Issues and change the table view to Health Domain.
    

##### Investigate data ingestion errors

A data ingestion issue identifies disruption in the data ingestion pipeline. For example, a data source is not sending logs, or there is a significant drop in log collection compared to the calculated ingestion baseline.

1.  Identify the error: Type = Ingestion.
    
2.  Right-click and select Investigate in XQL query.
    
    The Query Builder opens and runs a prefilled query to display related data ingestion metrics entries.
    
3.  Review the query results.
    
    The results provide context for the issue and the events leading up to it. For more information about data ingestion metrics and setting up correlation rules with your own data ingestion logic, see Monitor data ingestion health.
    
4.  Investigate data collector errors. Return to the Health Issues page, right-click the issue, and select Pivot to views → View collector details.
    
    Depending on the type of collector in error, the relevant data collector settings page opens, filtered by data collector.
    

##### Investigate correlation errors

A correlation issue identifies errors in your correlation rules.

1.  Identify the error: Type = Correlation.
    
2.  Right-click and select Investigate Correlation Auditing.
    
    The Query Builder opens and runs a prefilled query to display related correlation execution records.
    
3.  Review the query results.
    
    Identify the correlation rule in error and take steps to resolve the error. For more information about how Cortex Cloud identifies correlation rule errors, see Monitor correlation rules.
    

##### Investigate automation errors

Automation issues identify potential misconfigurations in automations, enabling you to take a proactive approach to fixing misconfiguration issues before they affect system performance.

1.  Identify the error: Type = Automation.
    
2.  Click the automation health issue to view the details of the related case or component.
    
3.  Based on the details of the automation health issue, review any related automations, such as playbooks and integrations, for possible misconfigurations.

#### Monitor data ingestion health

Learn more about data ingestion health monitoring.

Cortex Cloud collects granular data ingestion metrics that provide an insight into the data ingestion pipeline, and identify disruptions in data collection. With these metrics you can trace data collection from a specific source, and see a breakdown by data source attributes such as Collector Name and Final Reporting Device.

You can use these metrics in Cortex Query Language (XQL) queries to investigate disruption and degradation in log collection. You can also create correlation rules that use your own data ingestion logic to trigger issues when disruption occurs for a specific data source within a specific timeframe.

In addition, Cortex Cloud has a built-in data ingestion monitoring and issues mechanism that monitors the availability and overall health of data ingestion in your environment, and triggers ingestion health issues if disruptions occur.

##### Related topics

-   Overview of data ingestion metrics
    
-   Creating correlation rules to monitor data ingestion health
    
-   Measuring data freshness
    
-   About health issues

#### Monitor correlation rules

You can monitor your correlation executions with the `correlations_auditing` dataset.

Cortex Cloud audits all correlation executions in the `correlations_auditing` dataset. The dataset records the query initiation times, end times, retry attempts, failure reasons, and other useful metrics. .

In the `correlations_auditing` dataset, audit entries are added as follows:

-   The rule starts executing. This is audited with the status of Initiated or Initiated Manually.
    
-   The rule completes successfully. This is audited as Completed.
    
-   The rule completes with errors. This is audited as Error.
    

**Note:**

In the dataset, the Query start time and Query end time indicate the timeframe of the data that was queried. The actual start and end times of the correlation rule execution are recorded in the _time field for the Initiated and Completed entries.

##### Field descriptions for the correlations_auditing dataset

The following table describes the fields in the correlations_auditing dataset:

| Field | Description |
| --- | --- |
| _time | Timestamp of the audit. For entries with an Initiated or Initiated Manually status, this is the start time of the correlation rule execution. For entries with a Completed or Error status, this is the end time of the rule execution. |
| _id | Unique identifier of the audit entry. |
| Rule ID | Unique identification number for the correlation rule. |
| Name | Correlation rule name. |
| Status | The status of the correlation rule query. Possible values are Initiated, Initiated Manually, Completed, and Error. |
| Query start time | The start time of the query timeframe. |
| Query end time | The end time of the query timeframe. |
| Time frame | Time frame for the query. |
| Failure reason | For correlation rules with errors, this field displays the error message. |
| Retry attempts | Number of retry attempts before the query initiated or failed to run. |
| Schedule | Scheduled frequency to execute the correlation rule. |
| Rule creation time | Date and time that the correlation rule was created. |
| Rule modification time | Date and time that the correlation rule was last modified. |
| Description | Description of the correlation rule. |
| Severity | Defined severity of the correlation rule. |
| Dataset | Target data set, as defined in the correlation rule |
| Suppression status | Whether issue suppression is Enabled or Disabled. |
| Suppression duration | Duration for which to ignore additional events that match the issue suppression criteria. |
| Suppression fields | Fields on which the issue suppression is based. |
| Timezone | Timezone on which the scheduled frequency is based. |
| MITRE ATT&CK Tactic | MITRE ATT&CK tactic that the correlation rule attempted to generate. |
| MITRE ATT&CK Technique | MITRE ATT&CK technique that the correlation rule attempted to generate. |
| Issue category | Category of issue as configured when creating the rule. |
| Source | Source of the correlation rule. |
| XQL search | XQL query for the correlation rule. |
| Drill-down query | XQL query configured for further investigation. |
| Issue name | Name of the issue that the correlation rule will generate. |
