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

### Amazon Web Services

Learn more about collecting Amazon Web Services data using a Cloud Service Provider (CSP) onboarding data source in Cortex Cloud.

Follow a wizard to onboard your Amazon Web Services (AWS) environment. The AWS onboarding wizard is designed to facilitate the seamless setup of AWS data into Cortex Cloud.

| Amazon Web Services vendor | Description |
| --- | --- |
| Link to full configuration Cloud Service Provider (CSP) onboarding data source instructions for Cortex Cloud Premium license. | Onboard Amazon Web Services |
| Link to basic configuration Cloud Service Provider (CSP) onboarding data source instructions for Cortex Cloud NG SIEM, Cortex Cloud Enterprise license, and Cortex Cloud Enterprise+ licenses. | Onboard Amazon Web Services with basic configuration |

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

### Oracle Cloud Infrastructure

Learn more about collecting Oracle Cloud Infrastructure data using a Cloud Service Provider (CSP) onboarding data source in Cortex Cloud.

Follow a wizard to onboard your Oracle Cloud Infrastructure (OCI) environment. The OCI onboarding wizard is designed to facilitate the seamless setup of OCI data into Cortex Cloud.

| Oracle Cloud Infrastructure vendor | Description |
| --- | --- |
| Link to full configuration Cloud Service Provider (CSP) onboarding data source instructions for Cortex Cloud Premium license. | Onboard Oracle Cloud Infrastructure |
| Link to basic configuration Cloud Service Provider (CSP) onboarding data source instructions for Cortex Cloud NG SIEM, Cortex Cloud Enterprise license, and Cortex Cloud Enterprise+ licenses. | Onboard Oracle Cloud Infrastructure with basic configuration |

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

## Cloud service provider (CSP) onboarding

Learn about onboarding your cloud service provider to Cortex Cloud.

Onboard your cloud service provider (CSP) from the Data Sources & Integrations page.

### Ingest cloud assets

Explains how to onboard cloud service providers from the Data Sources & Integrations page.

Cortex Cloud provides a unified, normalized asset inventory for cloud assets. This capability provides deeper visibility to all the assets and superior context for incident investigation.

The cloud service provider (CSP) onboarding wizard is designed to facilitate the seamless setup of CSP data into Cortex Cloud. The guided experience requires minimal user input; simply define the scope of your CSP accounts and specify the scan mode. For full control of the CSP setup, you can use the advanced settings. Based on the onboarding settings, Cortex Cloud generates an authentication template to establish trust to the CSP and grant permissions to Cortex Cloud. The template must be executed in the CSP to complete the onboarding process. Execution of the template grants the permissions and includes a component that notifies Cortex Cloud of the execution details and a new cloud instance is created.

**Note:**

The cloud accounts being onboarded must be owned by the customer performing the onboarding process.

You can leverage your CSP hierarchy and choose whether to onboard individual accounts one at a time or collection of accounts (such as organization in AWS and GCP or management group in Azure). Various options are available for each CSP to allow you to customize your data collection.

Cortex Cloud supports two scan modes:

-   **Cloud scan:** (Recommended) The scanning takes place within the Cortex Cloud cloud environment. No additional setup is needed.
    
-   **Outpost scan:** The scanning is performed on infrastructure deployed to a CSP account owned by you. The CSP account should be a dedicated account for the outpost, free from other resources. Each CSP account can host only one outpost. This mode requires additional cloud provider permissions and may incur additional cloud costs.
    

To allow you to fine tune your CSP data collection, you can modify the scope of data collection by including or excluding specific regions. If you selected to collect data from an organizational unit that is not the lowest on the CSP hierarchy (such as organization or organizational unit in AWS, organization or folder in GCP, and tenant or management group in Azure), you can also modify the scope by including or excluding specific accounts, projects, or subscriptions. If you choose to include specific accounts, only those specified accounts will be included, even if additional accounts are added to the CSP after onboarding. If you choose to exclude specific accounts, any new accounts added to the CSP after onboarding will be included in the scope. Excluded accounts are not visible in Cortex Cloud.

The advanced settings allow you to select which Cortex Cloud modules you want to enable for this CSP. By default, the following security capabilities are enabled:

-   Discovery engine
    
-   Cloud security posture management
    
-   Cloud infrastructure entitlement management
    
-   Agentless disk scanning
    
-   AI security posture management
    

The additional security capabilities you can enable include:

-   XSIAM analytics: Analyzes your endpoint data to develop a baseline and raise Analytics and Analytics BIOC alerts when anomalies and malicious behaviors are detected.
    
-   Data security posture management: An agentless multi-cloud data security solution that discovers, classifies, protects, and governs sensitive data.
    
-   Registry scanning: Scan container registry images for vulnerabilities. malware, and secrets. You can configure your initial preference for scanning your registry. Any newly discovered registry, repository or image in the account will be scanned by default.

### Onboard Amazon Web Services

Follow the AWS onboarding wizard and Cortex Cloud creates a custom CloudFormation authentication template to be deployed in AWS CloudFormation.

Follow this wizard to onboard your Amazon Web Services (AWS) environment. The AWS onboarding wizard is designed to facilitate the seamless setup of AWS data into Cortex Cloud. The guided experience requires minimal user input; simply define the scope of your AWS accounts and specify the scan mode. For full control of the setup, you can use the advanced settings. Based on the onboarding settings, Cortex Cloud generates a CloudFormation authentication template to establish trust with AWS and grant permissions to Cortex Cloud. The template must be executed in AWS CloudFormation to complete the onboarding process. Execution of the template grants the permissions and includes a component that notifies Cortex Cloud of the execution details, and a new cloud instance is created.

#### Before you begin:

-   Ensure you have access to AWS Management Console.
    
-   Ensure you have the Required AWS permissions.
    

To onboard AWS:

1.  Select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Amazon Web Services (AWS), then hover over it and click Add.
    
4.  In the AWS onboarding wizard, select the type of AWS environment:
    
    -   **Government:** AWS GovCloud environments for compatibility with FedRAMP-certified tenants.
        
    -   **Commercial:** (Default) Standard cloud deployment typically used for private and public sector organizations that do not require isolated government-specific infrastructure.
        
    
5.  Select the scope for this data source:
    
    -   **Organization:** (Default) A collection of AWS accounts that are managed centrally.
        
    -   **Organizational Unit:** A group of AWS accounts within an organization. An organizational unit can also contain other organizational units.
        
    -   **Account:** A specific AWS member account.
        
    
6.  Choose the Scan Mode:
    
    -   **Cloud Scan:** (Recommended) Security scanning is performed in the Cortex Cloud cloud environment.
        
    -   **Scan with Outpost:** Security scanning is performed on infrastructure deployed to a cloud account owned by you. If you select this option, choose the outpost account to use for this instance.
        
        **Note:**
        
        Scanning with an outpost may require additional CSP permissions and may incur additional CSP costs.
        
    
7.  (Optional) Click Show advanced settings to define advanced settings:
    
    -   **Instance Name:** Enter a unique instance name or leave it empty to be automatically populated. The automatic naming convention is the CSP name followed by the ID of the scope unit selected in the onboarding wizard. For example, when onboarding an Amazon Web Services account, the automatic name would be `AWS-<accountID>` where `<accountID>` is the ID of the account onboarded.
        
    -   **Scope Modifications:** Use these settings to fine-tune your AWS scope, you can modify the scope by including or excluding specific regions. If you selected a Government environment, only AWS GovCloud regions are displayed. Additionally, if you selected an organization or organizational unit as the scope, you can modify the scope by including or excluding specific accounts. If you choose to include specific accounts, only those specified accounts will be included, even if additional accounts are added to your AWS environment after onboarding. If you choose to exclude specific accounts, any new accounts added to your AWS environment after onboarding will be included in the scope.
        
        **Note:**
        
        When onboarding an AWS organization or organizational unit (OU), Cortex Cloud creates IAM resources in every account within that organization or OU. This occurs even if you choose to exclude specific accounts from being scanned. While excluded accounts will not be scanned and will not appear in the asset inventory, the IAM resources may still be present.
        
    -   **Additional Security Capabilities:** Choose which security capabilities you want to benefit from. Some security capabilities are enabled by default and can be modified. Adding security capability typically requires additional cloud provider permissions. For detailed information on the permissions required, see Cloud service provider permissions. The additional security capabilities you can enable include:
        
        -   **XSIAM analytics:** Analyzes your endpoint data to develop a baseline and raise Analytics and Analytics BIOC alerts when anomalies and malicious behaviors are detected.
            
        -   **Data security posture management:** An agentless data security scanner that discovers, classifies, protects, and governs sensitive data. DSPM is not currently available in AWS GovCloud environments.
            
        -   **Registry scanning:** A container registry scanner that scans registry images for vulnerabilities. malware, and secrets. For more details, see Configure registry scanning for cloud accounts Configure registry scanning for cloud accounts
            
        -   **Serverless functions scanning:** Implement serverless scanning to detect and remediate vulnerabilities within serverless functions during the development lifecycle. Seamless integration into CI/CD pipelines enables automated security scans for a continuously secure pre-production environment.
            
            See Required AWS permissions for Cortex Cloud onboarding for the specific permissions you need to grant in your AWS account for scanning outposts and accessing logs.
            
        -   **Automation:** Use automation to pre-configure a list of integrations and associated commands to automate security issue responses. Commands can be utilized individually or as part of custom playbooks for issue remediation.
            
            -   **Log Level:** (Optional - for Automation only) Configure the automation integration logging level. Possible values are:
                
                -   Off (Default)
                    
                -   Debug
                    
                -   Verbose
                    
                
            
        -   **Agentless disk scanning:** (Recommended) Implement agentless disk scanning to remotely detect and remediate vulnerabilities during the development lifecycle.
            
        
    -   **Cloud Tags:** Define tags and tag values to be added to any new resource created by Cortex Cloud in the cloud environment. Note: The `managed_by = paloaltonetworks` tag is automatically added to all resources. This tag is mandatory. You cannot edit or remove this tag.
        
    -   **Log Collection Configuration:** To maximize security coverage, include the collection of audit logs using CloudTrail. This may require additional cloud service provider permissions. For detailed information on the permissions required, see Log Collection. Select the collection method:
        
        -   Automated collection: Have Cortex Cloud collect audit logs using AWS resources in your AWS environment. You can also choose to Collect data events.
            
            **Note:** For the purpose of collecting audit logs, Cortex Cloud automatically provisions dedicated AWS resources in your AWS environment, specifically an AWS CloudTrail trail, an Amazon SQS queue, and an Amazon S3 bucket. As a result, you may incur increased AWS costs, primarily due to CloudTrail event logging. While the trail defaults to capturing both read and write management events, the majority of these costs are typically associated specifically with read management events.
            
            To help manage these costs, you may manually modify the trail (`` cortex-trail-`<aws_account_id>` ``) configuration in the AWS Management Console to disable read events. While this reduces detection coverage, it should significantly lower CloudTrail-related charges. It is important to note that these manual changes will be overwritten during future Cortex Cloud updates, but they can serve as a temporary measure for cost control.
            
        -   Custom (user defined): Select this option if you want to use an existing Amazon S3 bucket for storing your CloudTrail logs. When you select this option, you will need to enter the following details when manually executing the CloudFormation authentication template in CloudFormation: CloudTrail bucket name, CloudTrail SNS ARN, and if relevant, the CloudTrail KMS ARN.
            
            You must ensure that the KMS key region and the SNS topic region are the exact same as the AWS region where you are deploying the CloudFormation stack.
            
        
    
8.  Click Save. Cortex Cloud creates an instance in the pending state.
    
9.  To complete the process, deploy the CloudFormation authentication template in AWS CloudFormation using one of the following methods:
    
    -   **Automated:** (Recommended) Click Execute in AWS to connect to AWS CloudFormation and create the stack. If you select Automated, you must already be logged in to AWS CloudFormation.
        
    -   **Manual:** Click Download CloudFormation to download the CloudFormation authentication template file.
        
    
    The CloudFormation authentication template is reusable and can be executed as many times as you want to create new cloud instances with the settings you defined in the onboarding wizard.
    
10.  Click Close.
     

Cortex Cloud generates a CloudFormation authentication template based on the settings you configured in the AWS onboarding wizard.

**Next step:** Follow the instructions to deploy the CloudFormation authentication template in AWS CloudFormation to create a stack.

###### Required AWS permissions for Cortex Cloud onboarding

Use the following template to create a dedicated role with the permissions required for onboarding AWS to Cortex Cloud:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CortexCloudOnboarding",
      "Effect": "Allow",
      "Action": [
        "iam:GetRole",
        "iam:UpdateAssumeRolePolicy",
        "iam:GetPolicyVersion",
        "iam:GetPolicy",
        "iam:UpdateRoleDescription",
        "iam:DeletePolicy",
        "iam:ListRoles",
        "iam:CreateRole",
        "iam:DeleteRole",
        "iam:AttachRolePolicy",
        "iam:PutRolePolicy",
        "iam:CreatePolicy",
        "iam:PassRole",
        "iam:CreateServiceLinkedRole",
        "iam:DetachRolePolicy",
        "iam:ListPolicyVersions",
        "iam:DeleteRolePolicy",
        "iam:UpdateRole",
        "iam:DeleteServiceLinkedRole",
        "iam:ListRolePolicies",
        "iam:GetRolePolicy",
        "iam:DeletePolicyVersion",
        "iam:SetDefaultPolicyVersion",
        "lambda:\*",
        "kms:\*",
        "s3:\*",
        "sqs:\*",
        "sns:\*",
        "cloudtrail:\*",
        "cloudformation:\*"
      ],
      "Resource": "\*"
    }
  ]
}
```

To enable serverless function scanning, grant the following permissions in your AWS account for scanning outposts and accessing logs:

```
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Effect": "Allow",
     "Action": [
       "lambda:GetFunction",
       "lambda:GetFunctionConfiguration",
       "lambda:GetLayerVersion",
       "iam:GetRole"
     ],
     "Resource": "\*"
   }
 ]
}
```

#### Onboard Amazon Web Services with basic configuration

Follow the basic configuration AWS onboarding wizard to enable audit log collection and asset, and Cortex Cloud creates a custom CloudFormation template to be deployed in AWS CloudFormation.

**Notice:**

Onboarding Amazon Web Services (AWS) using the basic configuration is included with Cortex Cloud NG SIEM, Cortex Cloud Enterprise, and Cortex Cloud Enterprise+ licenses. For onboarding AWS with a Cortex Cloud Premium license, see Onboard Amazon Web Services.

This procedure describes how to onboard your AWS environment for Cortex Cloud NG SIEM, Cortex Cloud Enterprise, and Cortex Cloud Enterprise+ licenses. After you onboard your AWS environment, Cortex Cloud begins to discover cloud assets and collect audit logs.

Use the AWS onboarding wizard to onboard your AWS environment. The guided experience requires minimal user input. Based on the onboarding settings, Cortex Cloud generates an authentication template to establish trust with AWS and grant permissions to Cortex Cloud. The template must be executed in AWS to complete the onboarding process. Execution of the template grants the permissions and includes a component that notifies Cortex Cloud of the execution details, and a new cloud instance is created.

##### Before you begin:

-   Ensure you have access to AWS Management Console.
    
-   Ensure you have the Required AWS permissions.
    

To onboard AWS using the basic configuration:

1.  Select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Amazon Web Services (AWS), then hover over it and click Add.
    
4.  In the onboarding wizard, select the scope for this data source:
    
    -   **Organization:** (Default) A collection of AWS accounts that are managed centrally.
        
    -   **Organizational Unit:** A group of AWS accounts within an organization. An organizational unit can also contain other organizational units.
        
    -   **Account:** A specific AWS member account.
        
    
5.  (Optional) Click Show advanced settings to define advanced settings:
    
    -   **Instance Name:** Enter a unique instance name or leave it empty to be automatically populated. The automatic naming convention is the CSP name followed by the ID of the scope unit selected in the onboarding wizard. For example, when onboarding an AWS account, the automatic name would be `AWS-<accountID>` where `<accountID>` is the ID of the account onboarded.
        
    -   **Scope Modifications:** Use these settings to fine-tune your AWS scope, you can modify the scope by including or excluding specific regions. Additionally, if you selected an organization or organizational unit as the scope, you can modify the scope by including or excluding specific accounts. If you choose to include specific accounts, only those specified accounts will be included, even if additional accounts are added to your AWS environment after onboarding. If you choose to exclude specific accounts, any new accounts added to your AWS environment after onboarding will be included in the scope.
        
        **Note:**
        
        When onboarding an AWS organization or organizational unit (OU), Cortex Cloud creates IAM resources in every account within that organization or OU. This occurs even if you choose to exclude specific accounts from being scanned. While excluded accounts will not be scanned and will not appear in the asset inventory, the IAM resources may still be present.
        
    -   **Additional Security Capabilities:** Choose which security capabilities you want to benefit from. Some security capabilities are enabled by default and can be modified. Adding security capability typically requires additional cloud provider permissions. For detailed information on the permissions required, see Cloud service provider permissions. The additional security capabilities you can enable include:
        
        -   **XSIAM analytics:** Analyzes your endpoint data to develop a baseline and raise Analytics and Analytics BIOC alerts when anomalies and malicious behaviors are detected.
            
        -   **Automation:** Use automation to pre-configure a list of integrations and associated commands to automate security issue responses. Commands can be utilized individually or as part of custom playbooks for issue remediation.
            
        
    -   **Cloud Tags:** Define tags and tag values to be added to any new resource created by Cortex Cloud in the cloud environment. Note: The `managed_by = paloaltonetworks` tag is automatically added to all resources. This tag is mandatory. You cannot edit or remove this tag.
        
    -   **Log Collection Configuration:** To maximize security coverage, include the collection of audit logs using CloudTrail. This may require additional cloud service provider permissions. For detailed information on the permissions required, see Log Collection. Select the collection method:
        
        -   Automated collection: Have Cortex Cloud collect audit logs using AWS resources in your AWS environment. Select Collect data events to collect data events.
            
            **Note:** For the purpose of collecting audit logs, Cortex Cloud automatically provisions dedicated AWS resources in your AWS environment, specifically an AWS CloudTrail trail, an Amazon SQS queue, and an Amazon S3 bucket. CloudTrail event logging typically increases AWS costs. While the trail defaults to capturing both read and write management events, the majority of these costs are typically associated specifically with read management events.
            
            To help manage these costs, you may manually modify the trail (`` cortex-trail-`<aws_account_id>` ``) configuration in the AWS Management Console to disable read events. While this reduces detection coverage, it should significantly lower CloudTrail-related charges. It is important to note that these manual changes will be overwritten during future Cortex Cloud updates, but they can serve as a temporary measure for cost control.
            
        -   Custom (user defined): Select this option if you want to use an existing Amazon S3 bucket for storing your CloudTrail logs. When you select this option, you will need to enter the following details when manually executing the CloudFormation authentication template in CloudFormation: CloudTrail bucket name, CloudTrail SNS ARN, and if relevant, the CloudTrail KMS ARN.
            
            You must ensure that the KMS key region and the SNS topic region are the exact same as the AWS region where you are deploying the CloudFormation stack.
            
        
    
6.  Click Save. Cortex Cloud creates an instance in the pending state.
    
7.  To complete the process, execute the CloudFormation authentication template in AWS CloudFormation using one of the following methods:
    
    -   **Automated:** (Recommended) Click Execute in AWS to connect to AWS CloudFormation and create the stack. If you select Automated, you must already be signed in to AWS CloudFormation.
        
    -   **Manual:** Click Download CloudFormation to download the CloudFormation authentication template file.
        
    
    The CloudFormation authentication template is reusable and can be executed as many times as you want to create new cloud instances with the settings you defined in the wizard.
    
8.  Click Close.
    

Cortex Cloud generates a CloudFormation authentication template based on the settings you configured in the AWS onboarding wizard.

**Next step:** Deploy the CloudFormation authentication template in AWS CloudFormation to create a stack.

###### Required AWS permissions for Cortex Cloud onboarding

Use the following JSON template to create a dedicated role with the permissions required for onboarding AWS to Cortex Cloud:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CortexCloudOnboarding",
      "Effect": "Allow",
      "Action": [
        "iam:GetRole",
        "iam:UpdateAssumeRolePolicy",
        "iam:GetPolicyVersion",
        "iam:GetPolicy",
        "iam:UpdateRoleDescription",
        "iam:DeletePolicy",
        "iam:ListRoles",
        "iam:CreateRole",
        "iam:DeleteRole",
        "iam:AttachRolePolicy",
        "iam:PutRolePolicy",
        "iam:CreatePolicy",
        "iam:PassRole",
        "iam:CreateServiceLinkedRole",
        "iam:DetachRolePolicy",
        "iam:ListPolicyVersions",
        "iam:DeleteRolePolicy",
        "iam:UpdateRole",
        "iam:DeleteServiceLinkedRole",
        "iam:ListRolePolicies",
        "iam:GetRolePolicy",
        "iam:DeletePolicyVersion",
        "iam:SetDefaultPolicyVersion",
        "lambda:\*",
        "kms:\*",
        "s3:\*",
        "sqs:\*",
        "sns:\*",
        "cloudtrail:\*",
        "cloudformation:\*"
      ],
      "Resource": "\*"
    }
  ]
}
```

#### Manually upload template to AWS

Learn how to manually create a stack in AWS Management Console using the CloudFormation file downloaded in the onboarding wizard.

When you have downloaded the CloudFormation template file in the onboarding wizard, you must connect to AWS Management Console to create a stack using the template file.

**Prerequisite:**

Before you begin, ensure you have:

-   An AWS account
    
-   Access to AWS Management Console
    
-   Permission to create a stack and its resources in AWS CloudFormation
    

1.  In AWS Management Console, navigate to [CloudFormation](https://console.aws.amazon.com/cloudformation/).
    
2.  On the Stacks page, click Create stack, and then select With new resources (standard).
    
3.  On the Create stack page, in Prerequisite - Prepare template, select Choose an existing template.
    
4.  In Specify template, select Upload a template file, then click Choose file and upload the template downloaded from your Cortex Platform. Click Next.
    
5.  In the Specify stack details page, enter a Stack name.
    
6.  In Parameters, enter a unique Amazon Resource Name (ARN) for the custom CortexPlatformRole role, and an ExternalID.
    
7.  If you have enabled custom log collection, enter the following details:
    
    -   CloudTrailKmsArn: (Optional) The ARN of the AWS KMS key used to encrypt the CloudTrail log files.
        
    -   CloudTrailLogBucket: The name of the Amazon S3 bucket where CloudTrail stores the log files.
        
    -   CloudTrailSnsArn: The ARN of the Amazon SNS topic that CloudTrail uses to send notifications when new log files are delivered.
        
    
    **Note:**
    
    You must ensure that the KMS key region and the SNS topic region are the exact same as the AWS region where you are deploying the CloudFormation stack.
    
    Click Next and Next again.
    
8.  In Review, acknowledge that CloudFormation might create IAM resources with custom names and click Submit. The stack is complete when it appears in the Stacks list with status of CREATE_COMPLETE.
    

When the template is successfully uploaded to AWS and the stack creation is complete, the initial discovery scan is started. When the scan is complete, you can view the discovered assets in Asset Inventory.

#### Configure AWS integration instances and monitor integration instance health

Enable automations from Data Sources & Integrations and monitor AWS integration instance health.

You can streamline and simplify configuring AWS integration instances within the Data Sources & Integrations page. This includes granting the necessary permissions for the platform to execute commands, scripts, and playbooks as part of issue response. All automation permissions are added to the Terraform as part of the setup process.

##### Configure a new or existing AWS integration instance

**Note:**

If you have not yet onboarded your cloud integration, see Ingest cloud assets.

You can configure a new AWS integration instance or edit an existing AWS integration instance, for example to enable automations.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Select the AWS integration row.
    
    -   To configure a new AWS integration instance: Click Add Instance.
        
    -   To edit an existing AWS integration instance:
        
    
3.  (Optional) Under Show advanced settings, select Automation and select a log level for the automation integration logs.
    
4.  If the instance is not enabled, in the row for the AWS integration instance, right-click and select Enable. Alternatively, click the more options icon and select Enable.
    
5.  Manually upload the template (Terraform) to the relevant cloud provider.
    
    An automation integration instance with the same name as the cloud integration instance is automatically created and automation permissions are automatically updated in the system. For more information, see Ingest cloud assets.
    

##### Monitor AWS integration instance health

Monitoring AWS integration instance health ensures continuous, reliable operation, facilitating issue response and improving overall security posture.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  In the AWS integration instance row, click the View Details link and then click a specific Instance Name.
    
    From the list of health statuses, you can click the following to see automation instance health status:
    
    -   Permissions: Shows any permission issues or missing permissions for the instance.
        
    -   Automation: Indicates any errors during automation instance creation or configuration.
        
        **Note:**
        
        Currently, automation permission errors or missing automation permissions do not affect the Automation health status. You can view any permission errors or missing permissions in the the Permissions health status.

### Onboard Google Cloud Platform

Follow the GCP onboarding wizard, and Cortex Cloud creates a custom authentication template to be applied in GCP.

Follow this wizard to onboard your Google Cloud Platform (GCP) environment. The GCP onboarding wizard is designed to facilitate the seamless setup of GCP data into Cortex Cloud. The guided experience requires minimal user input; simply define the scope of your GCP accounts and specify the scan mode. For full control of the setup, you can use the advanced settings. Based on the onboarding settings, Cortex Cloud generates an authentication template to establish trust to GCP and grant permissions to Cortex Cloud. The template must be applied in GCP to complete the onboarding process. Application of the template grants the permissions and includes a component that notifies Cortex Cloud of the execution details, and a new cloud instance is created.

#### Before you begin:

-   Ensure you have cccess to Google Cloud Console.
    
-   Ensure you have an admin user with the required admin GCP permissions.
    
-   Ensure you have the following APIs in the GCP project you are onboarding:
    
    -   [Cloud Resource Manager API](https://console.cloud.google.com/apis/api/cloudresourcemanager.googleapis.com)
        
    -   [Identity and Access Management (IAM) API](https://console.cloud.google.com/apis/api/iam.googleapis.com)
        
    -   [Cloud Pub/Sub API](https://console.cloud.google.com/apis/api/pubsub.googleapis.com) (if audit logs are enabled)
        
    -   If you plan on enabling Automation as an additional security capability, enable the following APIs:
        
        -   [Kubernetes Engine API](https://console.cloud.google.com/apis/api/container.googleapis.com)
            
        -   [Compute Engine API](https://console.cloud.google.com/apis/api/compute.googleapis.com)
            
        -   [Service Usage API](https://console.cloud.google.com/apis/api/serviceusage.googleapis.com)
            
        -   [Cloud Storage API](https://console.cloud.google.com/apis/api/storage-component.googleapis.com)
            
        
    

To onboard GCP:

1.  Select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Google Cloud Platform (GCP), then hover over it and click Add.
    
4.  In the GCP onboarding wizard, choose the scope for this data source:
    
    -   **Organization:** (Default) A collection of GCP projects that are managed centrally.
        
    -   **Folder:** A GCP folder can contain projects, folders, or a combination of both projects and folders.
        
    -   **Project:** A specific GCP project.
        
    
5.  Choose the Scan Mode:
    
    -   **Cloud Scan:** (Recommended) Security scanning is performed in the Cortex Cloud cloud environment.
        
    -   **Scan with Outpost:** Security scanning is performed on infrastructure deployed to a cloud account owned by you. If you select this option, choose the outpost account to use for this instance.
        
        **Note:**
        
        Scanning with an outpost may require additional CSP permissions and may incur additional CSP costs.
        
    
6.  (Optional) Click Show advanced settings to define advanced settings:
    
    -   **Instance Name:** Enter a unique instance name or leave it empty to be automatically populated. The automatic naming convention is the CSP name followed by the ID of the scope unit selected in the onboarding wizard. For example, when onboarding a Google Cloud Platform project, the automatic name would be `GCP-<projectID>` where `<projectID>` is the ID of the project onboarded.
        
    -   **Scope Modifications:** To allow you to fine-tune your GCP data collection, you can modify the scope by including or excluding specific regions. Additionally, if you selected an organization or folder as the scope, you can modify the scope by including or excluding specific projects. If you choose to include specific projects, only those specified projects will be included, even if additional projects are added to your GCP environment after onboarding. If you choose to exclude specific projects, any new projects added to your GCP environment after onboarding will be included in the scope. Excluded projects are not visible in Cortex Cloud.
        
    -   **Additional Security Capabilities:** Enable additional Cortex security add-ons, if available. This may require additional cloud provider permissions. For detailed information on the permissions required, see Cloud service provider permissions. The additional security capabilities you can enable include:
        
        -   **XSIAM analytics:** Analyzes your endpoint data to develop a baseline and raise Analytics and Analytics BIOC alerts when anomalies and malicious behaviors are detected.
            
        -   **Data security posture management:** An agentless multi-cloud data security solution that discovers, classifies, protects, and governs sensitive data.
            
        -   **Registry scanning:** Scan container registry images for vulnerabilities. malware, and secrets. You can configure your initial preference for scanning your registry. Any newly discovered registry, repository, or image in the account will be scanned by default. For more details, see Configure registry scanning for cloud accountsConfigure registry scanning for cloud accounts
            
        -   **Serverless functions scanning (Gen 1 only):** Implement serverless scanning to detect and remediate vulnerabilities within serverless functions during the development lifecycle. Seamless integration into CI/CD pipelines enables automated security scans for a continuously secure pre-production environment.
            
        -   **Automation:** Use automation to pre-configure a list of integrations and associated commands to automate security issue responses. Commands can be utilized individually or as part of custom playbooks for issue remediation.
            
        -   **Agentless disk scanning:** (Recommended) Implement agentless disk scanning to remotely detect and remediate vulnerabilities during the development lifecycle.
            
        
    -   **Log Level:** (Optional - for Automation only) Configure the automation integration logging level. Possible values are:
        
        -   Off (Default)
            
        -   Debug
            
        -   Verbose
            
        
    -   **Cloud Tags:** Define tags and tag values to be added to any new resource created by Cortex Cloud in the cloud environment. Note: The `managed_by = paloaltonetworks` tag is automatically added to all resources. This tag is mandatory. You cannot edit or remove this tag.
        
    -   **Log Collection Configuration:** To maximize security coverage, include collection of audit logs (GCP Pub/Sub). This may require additional cloud service provider permissions. For detailed information on the permissions required, see Cloud service provider permissions.
        
    -   Connect to GCP Workspace: Gain a comprehensive view of your Google Workspace identities and security. This provides you with detailed information on your users, groups, and organizational units, and collects security event logs to help you detect threats, improve your security posture, and meet compliance requirements.
        
        **Note:**
        
        If you want to connect to your GCP Workspace, you must first complete onboarding with the option disabled. Once the GCP cloud instance is created, perform the steps detailed in Connect Google Workspace with your GCP cloud instance.
        
    
7.  Click Save.
    
8.  Download the template file by clicking Download Terraform and then click Close.
    
    The Terraform authentication template is reusable and can be applied as many times as you want to create new instances with the settings you defined in the GCP onboarding wizard. The Terraform authentication template is valid for seven days from when it was created.
    

Cortex Cloud generates a Terraform authentication template based on the settings you configured in the GCP onboarding wizard.

**Next step:** Apply the Terraform authentication template in GCP.

###### Required admin GCP permissions for Cortex Cloud onboarding

Use the following template to create a dedicated role with the permissions required for onboarding GCP to Cortex Cloud.

```
{
  "title": "CortexCloudOnboarding",
  "description": "Custom role with permissions required for onboarding Cortex Cloud",
  "stage": "GA",
  "includedPermissions": [
    "iam.roles.create",
    "iam.roles.delete",
    "iam.roles.get",
    "iam.roles.list",
    "iam.roles.update",
    "iam.serviceAccounts.create",
    "iam.serviceAccounts.delete",
    "iam.serviceAccounts.get",
    "iam.serviceAccounts.getIamPolicy",
    "iam.serviceAccounts.list",
    "iam.serviceAccounts.setIamPolicy",
    "iam.serviceAccounts.update",
    "logging.sinks.create",
    "logging.sinks.delete",
    "logging.sinks.get",
    "logging.sinks.update",
    "pubsub.subscriptions.create",
    "pubsub.subscriptions.delete",
    "pubsub.subscriptions.getIamPolicy",
    "pubsub.subscriptions.setIamPolicy",
    "pubsub.subscriptions.update",
    "pubsub.topics.create",
    "pubsub.topics.delete",
    "pubsub.topics.getIamPolicy",
    "pubsub.topics.setIamPolicy",
    "pubsub.topics.update",
    "resourcemanager.folders.get",
    "resourcemanager.folders.getIamPolicy",
    "resourcemanager.folders.list",
    "resourcemanager.folders.setIamPolicy",
    "resourcemanager.organizations.get",
    "resourcemanager.organizations.getIamPolicy",
    "resourcemanager.organizations.setIamPolicy",
    "resourcemanager.projects.get",
    "resourcemanager.projects.getIamPolicy",
    "resourcemanager.projects.list",
    "resourcemanager.projects.setIamPolicy"
  ]
}
```

#### Onboard Google Cloud Platform with basic configuration

Follow the basic configuration GCP onboarding wizard to enable audit log collection and asset, and Cortex Cloud creates a custom authentication template to be applied in GCP.

This procedure describes how to onboard your GCP environment for Cortex Cloud NG SIEM, Cortex Cloud Enterprise, and Cortex Cloud Enterprise+ licenses. After you onboard your GCP environment, Cortex Cloud begins to discover cloud assets and collect audit logs.

Use the GCP onboarding wizard to onboard your GCP environment. The guided experience requires minimal user input. Based on the onboarding settings, Cortex Cloud generates an authentication template to establish trust with GCP and grant permissions to Cortex Cloud. The authentication template must be applied in GCP to complete the onboarding process. Execution of the authentication template grants the permissions and includes a component that notifies Cortex Cloud of the execution details, and a new cloud instance is created.

##### Before you begin:

-   Ensure you have cccess to Google Cloud Console.
    
-   Ensure you have an admin user with the required admin GCP permissions.
    
-   Ensure you have the following APIs in the GCP project you are onboarding:
    
    -   [Cloud Resource Manager API](https://console.cloud.google.com/apis/api/cloudresourcemanager.googleapis.com)
        
    -   [Identity and Access Management (IAM) API](https://console.cloud.google.com/apis/api/iam.googleapis.com)
        
    -   [Cloud Pub/Sub API](https://console.cloud.google.com/apis/api/pubsub.googleapis.com) (if audit logs are enabled)
        
    -   If you plan on enabling Automation as an additional security capability, enable the following APIs:
        
        -   [Kubernetes Engine API](https://console.cloud.google.com/apis/api/container.googleapis.com)
            
        -   [Compute Engine API](https://console.cloud.google.com/apis/api/compute.googleapis.com)
            
        -   [Service Usage API](https://console.cloud.google.com/apis/api/serviceusage.googleapis.com)
            
        -   [Cloud Storage API](https://console.cloud.google.com/apis/api/storage-component.googleapis.com)
            
        
    

To onboard GCP using the basic configuration:

1.  Select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Google Cloud Platform (GCP), then hover over it and click Add.
    
4.  In the GCP onboarding wizard, select the scope for this data source:
    
    -   **Organization:** (Default) A collection of GCP projects that are managed centrally.
        
    -   **Folder:** A GCP folder can contain projects, folders, or a combination of both projects and folders.
        
    -   **Project:** A specific GCP project.
        
    
5.  (Optional) Click Show advanced settings to define advanced settings:
    
    -   **Instance Name:** Enter a unique instance name or leave it empty to be automatically populated. The automatic naming convention is the CSP name followed by the ID of the scope unit selected in the onboarding wizard. For example, when onboarding a GCP organization, the automatic name would be `GCP-<orgID>` where `<orgID>` is the ID of the organization onboarded.
        
    -   **Scope Modifications:** Use these settings to fine-tune your GCP scope, you can modify the scope by including or excluding specific regions. Additionally, if you selected an organization or folder as the scope, you can modify the scope by including or excluding specific projects. If you choose to include specific projects, only those specified projects will be included, even if additional projects are added to your GCP environment after onboarding. If you choose to exclude specific projects, any new projects added to your GCP environment after onboarding will be included in the scope.
        
    -   **Additional Security Capabilities:** Choose which security capabilities you want to benefit from. Some security capabilities are enabled by default and can be modified. Adding security capability typically requires additional cloud provider permissions. For detailed information on the permissions required, see Cloud service provider permissions. The additional security capabilities you can enable include:
        
        -   **XSIAM analytics:** Analyzes your endpoint data to develop a baseline and raise Analytics and Analytics BIOC alerts when anomalies and malicious behaviors are detected.
            
        -   **Automation:** Use automation to pre-configure a list of integrations and associated commands to automate security issue responses. Commands can be utilized individually or as part of custom playbooks for issue remediation.
            
        
    -   **Cloud Tags:** Define tags and tag values to be added to any new resource created by Cortex Cloud in the cloud environment. Note: The `managed_by = paloaltonetworks` tag is automatically added to all resources. This tag is mandatory. You cannot edit or remove this tag.
        
    -   **Log Collection Configuration:** To maximize security coverage, include the collection of audit logs (GCP Pub/Sub). This may require additional cloud service provider permissions. For detailed information on the permissions required, see Google Cloud Platform provider permissions.
        
    
6.  Click Save. Cortex Cloud creates an instance in the pending state.
    
7.  Download the Terraform authentication template by clicking Download Terraform and then click Close.
    
    The Terraform authentication template is reusable and can be applied as many times as you want to create new instances with the settings you defined in the GCP onboarding wizard. The Terraform authentication template is valid for seven days from when it was created.
    

Cortex Cloud generates a Terraform authentication template based on the settings you configured in the GCP onboarding wizard.

**Next step:** Apply the Terraform authentication template in GCP.

###### Required admin GCP permissions for Cortex Cloud onboarding

Use the following template to create a dedicated role with the permissions required for onboarding GCP to Cortex Cloud.

```
{
  "title": "CortexCloudOnboarding",
  "description": "Custom role with permissions required for onboarding Cortex Cloud",
  "stage": "GA",
  "includedPermissions": [
    "iam.roles.create",
    "iam.roles.delete",
    "iam.roles.get",
    "iam.roles.list",
    "iam.roles.update",
    "iam.serviceAccounts.create",
    "iam.serviceAccounts.delete",
    "iam.serviceAccounts.get",
    "iam.serviceAccounts.getIamPolicy",
    "iam.serviceAccounts.list",
    "iam.serviceAccounts.setIamPolicy",
    "iam.serviceAccounts.update",
    "logging.sinks.create",
    "logging.sinks.delete",
    "logging.sinks.get",
    "logging.sinks.update",
    "pubsub.subscriptions.create",
    "pubsub.subscriptions.delete",
    "pubsub.subscriptions.getIamPolicy",
    "pubsub.subscriptions.setIamPolicy",
    "pubsub.subscriptions.update",
    "pubsub.topics.create",
    "pubsub.topics.delete",
    "pubsub.topics.getIamPolicy",
    "pubsub.topics.setIamPolicy",
    "pubsub.topics.update",
    "resourcemanager.folders.get",
    "resourcemanager.folders.getIamPolicy",
    "resourcemanager.folders.list",
    "resourcemanager.folders.setIamPolicy",
    "resourcemanager.organizations.get",
    "resourcemanager.organizations.getIamPolicy",
    "resourcemanager.organizations.setIamPolicy",
    "resourcemanager.projects.get",
    "resourcemanager.projects.getIamPolicy",
    "resourcemanager.projects.list",
    "resourcemanager.projects.setIamPolicy"
  ]
}
```

#### Manually upload template to GCP

Learn how to manually deploy the Terraform template file in Google Cloud Console.

When you have downloaded the Terraform template file in the onboarding wizard, you must connect to Google Cloud Console to create a stack using the template file.

**Prerequisite:**

Before you begin, ensure you have:

-   A GCP account.
    
-   Permission to create the required resources in Google Cloud Deployment Manager.
    
-   Installed Terraform on your local machine. You can download Terraform from the official [Terraform website](https://www.terraform.io/downloads.html) and follow the installation instructions for your operating system.
    
-   Installed the [GCP gcloud CLI tool](https://cloud.google.com/sdk/docs/install#linux).
    
-   Reviewed the introduction to Terraform for Cloud service provider (CSP) onboarding to understand the underlying logic of how Terraform interacts with your cloud environment.
    

1.  Open your local terminal (Command prompt, PowerShell, or Terminal).
    
2.  Log in to your GCP account using the gcloud CLI:
    
    ```
    gcloud auth login
    ```
    
3.  Create a directory on your local machine to store and run the Terraform code. If you have more than one GCP connector, you need a separate directory for each one:
    
    **Note:**
    
    The directory you create must be a subdirectory of the home directory.
    
    ```
    mkdir -p ~/terraform/gcp-connector-1
    ```
    
4.  Navigate to the directory you created and extract the Terraform files. Ensure all necessary Terraform files are present (`main.tf`, `template_params.tfvars`, etc).
    
    **Important:**
    
    You must not delete or move the Terraform files from this folder. It will prevent you from being able to edit your cloud instance in the future.
    
    ```
    cd ~/terraform/gcp-connector-1
    tar -xzvf <your_template>.tar.gz
    ```
    
5.  Initialize Terraform in your project directory:
    
    ```
    terraform init
    ```
    
6.  Apply your Terraform configuration using the downloaded parameter file. When prompted, enter the project ID if you configured one in the onboarding wizard:
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
    The Terraform template is deployed.
    

When the template is successfully uploaded to GCP, the initial discovery scan is started. When the scan is complete, you can view your cloud assets in Asset Inventory.

#### Connect Google Workspace with your GCP cloud instance
To gain full visibility into GCP permissions and identity relationships, highlight risks, and offer proper remediation, Cortex Cloud must ingest user, group, and group membership data from your Google Workspace. You need to create a custom role in Google Workspace, assign it specific privileges, and then assign your Cortex Cloud service account to this newly created role.

**Prerequisite:**

Ensure you have the Super Admin role in Google Workspace.

1\. Create a Cortex Cloud role in Google Workspace

1.  Log in to your [Google Admin Console](https://admin.google.com/).
    
2.  In the left menu, select Account → Admin roles.
    
3.  Click Create new role.
    
4.  In the Role info page, enter a name for the role, such as `cortex-cloud-security-role`.
    
5.  (Optional) Enter a description.
    
6.  Click Continue.
    
7.  In the Select Privileges page, in the Privilege Name list, under Admin API, select the following privileges:
    
    -   Organization Units > Read (This automatically selects the Organizational Units > Read permission. Leave it selected.)
        
    -   Users > Read
        
    -   Groups > Read
        
    
8.  Click Continue and then click Create Role.
    

2\. Assign the Cortex Cloud service account to the created role

1.  In Cortex Cloud, navigate to Settings → Data Sources & Integrations and select Google Cloud Platform (GCP) → View details.
    
2.  Identify the GCP cloud instance and click the instance name to open the details pane for that instance.
    
3.  In the details pane, click the more options icon at the top right corner and then select Authorization Details.
    
4.  Copy the value of Cortex discovery role.
    
5.  Log in to your [Google Admin Console](https://admin.google.com/).
    
6.  In the left menu, select Account → Admin roles.
    
7.  Select the role created previously and click Assign role.
    
8.  Click Assign service accounts and paste the value of the Cortex discovery role. Click Add.
    
9.  Click Assign role.
    

Your Cortex Cloud service account has been successfully granted the necessary permissions in Google Workspace to ingest user, group, and group membership data. It may take several hours for the results to appear in Cortex Cloud, depending on the size of your cloud estate.

3\. Enable Google Workspace in your GCP cloud instance

**Prerequisites:**

-   Ensure you have the organization ID of the Google Workspace you want to connect:
    
    -   Log in to your [Google Admin Console](https://admin.google.com/). and navigate to Account → Account settings → Profile. Next to Customer ID is your organization ID.
        
    
-   Ensure the organization ID you want to connect meets one of the following requirements:
    
    -   It must already be defined within your Domain Restricted Principles policy.
        
    -   It is the Workspace organization ID to which the GCP organization you have onboarded in this cloud instance belongs.
        
    

1.  In Cortex Cloud, navigate to Settings → Data Sources & Integrations and select Google Cloud Platform (GCP) → View details.
    
2.  Identify the GCP cloud instance and click Configuration at the right end of the cloud instance row.
    
3.  In the Google Cloud Provider (GCP) onboarding wizard, click Show advanced settings.
    
4.  Under Discovery Enhancements, select Connect to GCP Workspace.
    
5.  Enter the organization ID of your Google Workspace. You can enter more than one organization ID.
    
6.  Click Save.
    

You have successfully enabled the Google Workspace in your GCP cloud instance.

#### Configure GCP integration instances and monitor integration instance health

Enable automations from Data Sources & Integrations and monitor GCP integration instance health.

You can streamline and simplify configuring GCP integration instances within the Data Sources & Integrations page. This includes granting the necessary permissions for the platform to execute commands, scripts, and playbooks as part of issue response. All automation permissions are added to the Terraform as part of the setup process.

##### Configure a new or existing GCP integration instance

**Note:**

If you have not yet onboarded your cloud integration, see Ingest cloud assets.

You can configure a new GCP integration instance or edit an existing GCP integration instance, for example to enable automations.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  In the GCP integration row:
    
    -   To configure a new GCP integration instance: Click ⋮ and then click Add New Instance or click View Details and from the New Instance drop down select the GCP cloud service provider.
        
    -   To edit an existing GCP integration instance: Click View Details and then click the configuration pencil icon.
        
    
3.  (Optional) Under Show advanced settings, select Automation and select a log level for the automation integration logs.
    
4.  If the instance is not enabled, in the row for the GCP integration instance, right-click and select Enable. Alternatively, click the more options icon and select Enable.
    
5.  Manually upload the template (Terraform) to the relevant cloud provider.
    
    An automation integration instance with the same name as the cloud integration instance is automatically created and automation permissions are automatically updated in the system. For more information, see Ingest cloud assets.
    

##### Monitor GCP integration instance health

Monitoring GCP integration instance health ensures continuous, reliable operation, facilitating issue response and improving overall security posture.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  In the GCP integration instance row, click the View Details link and then click a specific Instance Name.
    
    From the list of health statuses, you can click the following to see automation instance health status:
    
    -   Permissions: Shows any permission issues or missing permissions for the instance.
        
    -   Automation: Indicates any errors during automation instance creation or configuration.
        
        **Note:**
        
        Currently, automation permission errors or missing automation permissions do not affect the Automation health status. You can view any permission errors or missing permissions in the the Permissions health status.

#### Monitor GCP resources inside service perimeters

Learn how to grant authorization to Cortex Cloud to scan within your GCP service perimeter.

A service perimeter can provide an additional layer of security for your GCP projects. It serves as a fortified boundary around your Google Cloud resources. While resources inside the perimeter can communicate freely, the perimeter is designed to prevent unauthorized communication to Google Cloud services beyond its confines.

To enable Cortex Cloud to scan assets and resources within your GCP perimeter, you must authorize Cortex Cloud's identities to access the perimeter from within GCP. If you have a perimeter set up in your GCP project and you have not authorized Cortex Cloud's identities to scan the perimeter, you will receive the following error:

Request is prohibited by organization's policy. vpcServiceControlsUniqueIdentifier: {{`<GCP-perimeter-ID>`}}

**Note:**

Each GCP cloud instance is assigned a scope within GCP. If the scope, whether it be organization, folder, or project, includes any projects with a service perimeter, this procedure must be performed for that cloud instance to authorize Cortex Cloud to scan the resources in the perimeter.

Obtain Cortex Cloud identity details

1.  In your Cortex Cloud tenant, select Settings → Data Sources & Integrations.
    
2.  Hover over the Google Cloud Platform (GCP) row and select View Details.
    
3.  In the Cloud Instances page, identify the GCP instance with the perimeter, right-click it and select Details.
    
4.  In the details pane, click the more options icon and select Authorization Details.
    
5.  The authorization values that you need to add as approved identities in GCP are listed in the Authorization Details dialog box.
    

Add Cortex Cloud authorization values to GCP perimeter

1.  Log into [Google Cloud Platform Console](https://console.cloud.google.com/).
    
2.  Navigate to VPC Service Controls.
    
3.  In the list of perimeters, select the perimeter to which you want to grant access to Cortex Cloud.
    
4.  In the Service perimeter details screen, click Edit.
    
5.  In the Edit service perimeter screen, select Ingress policy.
    
6.  In the Ingress rules pane, click Add an ingress rule.
    
7.  Enter a Title for the ingress rule.
    
8.  In the From section, under Identities, select Select identities & groups.
    
9.  Click Add identities. In the Add identities pane, under Search identities, paste Cortex discovery role from Cortex Cloud's Authorization Details dialog box. If there are more authorized values, paste each of them under Search identities. Click Add identities.
    
10.  In the To section, under Resources, select Select projects.
     
11.  Click Add projects. In the Add projects pane, select the relevant projects.
     
12.  Under Operations or IAM roles, select All operations.
     
13.  Click Next to add an egress rule.
     
14.  In the Egress rules pane, click Add an egress rule.
     
15.  Enter a Title for the egress rule.
     
16.  In the From section, under Identities, select Select identities & groups.
     
17.  Click Add identities. In the Add identities pane, under Search identities, paste Cortex discovery role from Cortex Cloud's Authorization Details dialog box. If there are more authorized values, paste each of them under Search identities. Click Add identities.
     
18.  In the To section, under Resources, select Select projects.
     
19.  Click Add projects. In the Add projects pane, select the relevant projects.
     
20.  Click Save. Confirm the changes and click Confirm.
     

The Cortex Cloud authorization values have been added as approved identities in GCP.

### Onboard Microsoft Azure

Follow the Azure onboarding wizard, and Cortex creates a custom authentication template to be executed in Azure.

Follow this wizard to onboard your Microsoft Azure environment. The Microsoft Azure onboarding wizard is designed to facilitate the seamless setup of Microsoft Azure data into Cortex Cloud. The guided experience requires minimal user input; simply define the scope of your Microsoft Azure accounts and specify the scan mode. For full control of the setup, you can use the advanced settings. Based on the onboarding settings, Cortex Cloud generates an authentication template to establish trust with Microsoft Azure and grant permissions to Cortex Cloud. The template must be applied to complete the onboarding process. Application of the authentication template grants the permissions and includes a component that notifies Cortex Cloud of the execution details, and a new cloud instance is created.

Microsoft Azure private resources are not currently discoverable.

#### Before you begin:

-   Ensure you have a Microsoft Azure subscription.
    
-   Ensure you have the admin permissions required to onboard Microsoft Azure or the built-in Security Administrator role.
    
-   Obtain the tenant ID and subscription ID. You can view these in the Microsoft Azure Portal in Management groups.
    

How to onboard Azure:

1.  Select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Microsoft Azure, then hover over it and click Add.
    
4.  In the onboarding wizard, select the type of Microsoft Azure environment:
    
    -   **Government:** Microsoft Azure Government environments for compatibility with FedRAMP-certified tenants.
        
    -   **Commerical:** (Default) Standard cloud deployment typically used for private and public sector organizations that do not require isolated government-specific infrastructure.
        
    
5.  Select the scope for this data source.
    
    -   **Tenant:** (Default) A specific instance of Azure Active Directory, which can contain several subscriptions.
        
    -   **Management Group:** A collection of Microsoft Azure subscriptions.
        
    -   **Subscription:** A collection of Microsoft Azure resources associated with a specific Microsoft Azure tenant.
        
    
6.  Choose the Scan Mode:
    
    -   **Cloud Scan:** (Recommended) Security scanning is performed in the Cortex Cloud cloud environment.
        
    -   **Scan with Outpost:** Security scanning is performed on infrastructure deployed to a cloud account owned by you. If you select this option, choose the outpost account to use for this instance or create a new outpost. For more information on outposts, see Outposts.
        
        Scanning with an outpost may require additional CSP permissions and may incur additional CSP costs.
        
    
7.  Select an approved tenant ID from the Tenant ID list. If no tenant IDs have been approved, enter the tenant ID. Click Approve in Azure to add Cortex Cloud as an approved application on this tenant. When the tenant ID is approved, it appears with a green check next to it.
    
8.  (Optional) Click Show advanced settings to define advanced settings:
    
    -   **Instance Name:** Enter a unique instance name or leave it empty to be automatically populated. The automatic naming convention is the CSP name followed by the ID of the scope unit selected in the onboarding wizard. For example, when onboarding an Azure tenant, the automatic name would be `AZURE-<tenantID>` where `<tenantID>` is the ID of the tenant onboarded.
        
    -   **Scope Modifications:** To fine-tune your Microsoft Azure data collection, you can modify the scope by including or excluding specific regions. If you selected a Government environment, only Microsoft Azure Government regions are displayed. Additionally, if you selected a tenant or management group as the scope, you can modify the scope by including or excluding specific subscriptions. If you choose to include specific subscriptions, only those specified subscriptions will be included, even if additional subscriptions are added to your Microsoft Azure environment after onboarding. If you choose to exclude specific subscriptions, any new subscriptions added to your Microsoft Azure environment after onboarding will be included in the scope. Excluded subscriptions are not visible in Cortex Cloud.
        
    -   **Additional Security Capabilities:** Choose which security capabilities you want to benefit from. Some security capabilities are enabled by default and can be modified. Adding security capability typically requires additional cloud provider permissions. For detailed information on the permissions required, see Cloud service provider permissions. The additional security capabilities you can enable include:
        
        -   -   **XSIAM analytics:** Analyzes your endpoint data to develop a baseline and raise Analytics and Analytics BIOC alerts when anomalies and malicious behaviors are detected.
                
            -   **Data security posture management:** An agentless multi-cloud data security solution that discovers, classifies, protects, and governs sensitive data. DSPM is not currently available in Microsoft Azure Government environments.
                
            -   **Registry scanning:** Scan container registry images for vulnerabilities. malware, and secrets. You can configure your initial preference for scanning your registry. Any newly discovered registry, repository or image in the account will be scanned by default. For more details, see Configure registry scanning for cloud accountsConfigure registry scanning for cloud accounts
                
            -   **Serverless functions scanning:** Implement serverless scanning to detect and remediate vulnerabilities within serverless functions during the development lifecycle. Seamless integration into CI/CD pipelines enables automated security scans for a continuously secure pre-production environment.
                
            -   **Automation:** Use automation to pre-configure a list of integrations and associated commands to automate security issue responses. Commands can be utilized individually or as part of custom playbooks for issue remediation.
                
                -   **Log Level:** (Optional - for Automation only) Configure the automation integration logging level. Possible values are:
                    
                    -   Off (Default)
                        
                    -   Debug
                        
                    -   Verbose
                        
                    
                
            -   **Agentless disk scanning:** (Recommended) Implement agentless disk scanning to remotely detect and remediate vulnerabilities during the development lifecycle.
                
            
        
    -   **Cloud Tags:** Define tags and tag values to be added to any new resource created by Cortex Cloud in the cloud environment. Note: The `managed_by = paloaltonetworks` tag is automatically added to all resources. This tag is mandatory. You cannot edit or remove this tag.
        
    -   **Log Collection Configuration:** To maximize security coverage, include the collection of audit logs (Event Hub). This may require additional cloud service provider permissions. For detailed information on the permissions required, see Cloud service provider permissions.
        
    
9.  Click Save.
    
10.  To complete the process, download the authentication template:
     
     -   For onboarding Azure tenants and management groups, click one of the following:
         
         -   Download Terraform to download a Terraform file and proceed to Finalize onboarding by applying the Terraform template's configuration.
             
             To onboard all subscriptions within a management group or tenant, our authentication template uses Azure Resource Management (ARM) templates internally. The ARM templates are encoded with base64 and located inside the `template_params.tfvars` file as the `policy_template` variable.
             
         -   Azure Resource Manager to download a `tar.gz` file and proceed to Finalize onboarding of tenants and management groups by deploying the Microsoft Azure Resource Manager (ARM) template.
             
         
     -   For onboarding Azure subscriptions, click one of the following:
         
         -   Download Terraform to download a Terraform file and proceed to Finalize onboarding by applying the Terraform template's configuration.
             
         -   Azure Resource Manager to download a JSON file and proceed to Finalize onboarding of subscriptions by deploying the Microsoft Azure Resource Manager (ARM) template.
             
         
     
     The authentication template is reusable and can be executed as many times as you want to create new cloud instances with the settings you defined in the onboarding wizard.
     
11.  Click Close.
     

Cortex Cloud generates an authentication template based on the settings you configured in the Microsoft Azure onboarding wizard.

###### Required Azure permissions for Cortex Cloud onboarding

Use the following template to create a dedicated role with the permissions required for onboarding Microsoft Azure to Cortex Cloud.

```
{
  "Name": "CortexCloudOnboarding",
  "IsCustom": true,
  "Description": "Custom role with permissions for Cortex Cloud onboarding",
  "Actions": [
    "Microsoft.Authorization/roleAssignments/read",
    "Microsoft.Authorization/roleAssignments/write",
    "Microsoft.Authorization/roleAssignments/delete",
    "Microsoft.Authorization/roleDefinitions/read",
    "Microsoft.Authorization/roleDefinitions/write",
    "Microsoft.Authorization/roleDefinitions/delete",
    "Microsoft.Authorization/roleManagementPolicies/read",
    "Microsoft.Authorization/roleManagementPolicies/write",
    "Microsoft.Authorization/roleManagementPolicyAssignments/read",
    "Microsoft.EventHub/clusters/read",
    "Microsoft.EventHub/clusters/write",
    "Microsoft.EventHub/clusters/delete",
    "Microsoft.EventHub/clusters/namespaces/read",
    "Microsoft.EventHub/namespaces/read",
    "Microsoft.EventHub/namespaces/write",
    "Microsoft.EventHub/namespaces/delete",
    "Microsoft.EventHub/namespaces/authorizationRules/read",
    "Microsoft.EventHub/namespaces/authorizationRules/write",
    "Microsoft.EventHub/namespaces/authorizationRules/delete",
    "Microsoft.EventHub/namespaces/eventhubs/read",
    "Microsoft.EventHub/namespaces/eventhubs/write",
    "Microsoft.EventHub/namespaces/eventhubs/delete",
    "Microsoft.EventHub/namespaces/eventhubs/authorizationRules/read",
    "Microsoft.EventHub/namespaces/eventhubs/authorizationRules/write",
    "Microsoft.EventHub/namespaces/eventhubs/authorizationRules/delete",
    "Microsoft.EventHub/namespaces/eventhubs/consumergroups/read",
    "Microsoft.EventHub/namespaces/eventhubs/consumergroups/write",
    "Microsoft.EventHub/namespaces/eventhubs/consumergroups/delete",
    "Microsoft.Insights/diagnosticSettings/write",
    "Microsoft.ManagedIdentity/userAssignedIdentities/read",
    "Microsoft.ManagedIdentity/userAssignedIdentities/write",
    "Microsoft.ManagedIdentity/userAssignedIdentities/delete",
    "Microsoft.PolicyInsights/remediations/read",
    "Microsoft.PolicyInsights/remediations/write",
    "Microsoft.PolicyInsights/remediations/delete",
    "Microsoft.PolicyInsights/remediations/listDeployments/read",
    "Microsoft.PolicyInsights/remediations/cancel/action",
    "Microsoft.Resources/deploymentScripts/read",
    "Microsoft.Resources/deploymentScripts/write",
    "Microsoft.Resources/deploymentScripts/delete",
    "Microsoft.Resources/deploymentScripts/logs/read",
    "Microsoft.Resources/deployments/read",
    "Microsoft.Resources/deployments/write",
    "Microsoft.Resources/deployments/delete",
    "Microsoft.Resources/deployments/operations/read",
    "Microsoft.Resources/deployments/operationstatuses/read",
    "Microsoft.Resources/deployments/cancel/action",
    "Microsoft.Resources/deployments/exportTemplate/action",
    "Microsoft.Resources/deployments/validate/action",
    "Microsoft.Resources/deployments/whatIf/action",
    "Microsoft.Resources/subscriptions/resourceGroups/read",
    "Microsoft.Resources/subscriptions/resourceGroups/write",
    "Microsoft.Resources/subscriptions/resourceGroups/delete",
    "Microsoft.Resources/subscriptions/resourceGroups/moveResources/action",
    "Microsoft.Resources/subscriptions/resourceGroups/validateMoveResources/action",
    "Microsoft.Resources/subscriptions/resourcegroups/deployments/read",
    "Microsoft.Resources/subscriptions/resourcegroups/deployments/write",
    "Microsoft.Resources/subscriptions/resourcegroups/deployments/operations/read",
    "Microsoft.Resources/subscriptions/resourcegroups/deployments/operationstatuses/read",
    "Microsoft.Resources/subscriptions/resourcegroups/resources/read",
    "Microsoft.Storage/storageAccounts/read",
    "Microsoft.Storage/storageAccounts/write",
    "Microsoft.Storage/storageAccounts/delete",
    "Microsoft.Storage/storageAccounts/blobServices/containers/read",
    "Microsoft.Storage/storageAccounts/blobServices/containers/write",
    "Microsoft.Storage/storageAccounts/blobServices/containers/delete",
    "Microsoft.aadiam/diagnosticsettings/read",
    "Microsoft.aadiam/diagnosticsettings/write",
    "Microsoft.aadiam/diagnosticsettings/delete",
    "microsoft.aadiam/azureADMetrics/providers/Microsoft.Insights/diagnosticSettings/write",
    "microsoft.aadiam/tenants/providers/Microsoft.Insights/diagnosticSettings/write"
  ],
  "NotActions": [],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": [
    <SUBSCRIPTION_ID> or <MANAGEMENT_GROUP_ID> or <TENANT_ID>
  ]
}
```

Where `<SUBSCRIPTION_ID>`, `<MANAGEMENT_GROUP_ID>`, or `<TENANT_ID>` is replaced with the ID of the scope you are onboarding.

#### Onboard Microsoft Azure with basic configuration

Follow the basic configuration Microsoft Azure onboarding wizard to enable audit log collection and asset, and Cortex Cloud creates a custom authentication template.

**Notice:**

Onboarding Microsoft Azure using the basic configuration is included with Cortex Cloud NG SIEM, Cortex Cloud Enterprise, and Cortex Cloud Enterprise+ licenses. For onboarding Microsoft Azure with a Cortex Cloud Premium license, see Onboard Microsoft Azure.

This procedure describes how to onboard your Microsoft Azure environment for Cortex Cloud NG SIEM, Cortex Cloud Enterprise, and Cortex Cloud Enterprise+ licenses. After you onboard your Microsoft Azure environment, Cortex Cloud begins to discover cloud assets and collect audit logs.

Use the Microsoft Azure onboarding wizard to onboard your Microsoft Azure environment. The guided experience requires minimal user input. Based on the onboarding settings, Cortex Cloud generates an authentication template to establish trust with Microsoft Azure and grant permissions to Cortex Cloud. The template must be applied in Microsoft Azure to complete the onboarding process. Application of the template grants the permissions and includes a component that notifies Cortex Cloud of the execution details, and a new cloud instance is created.

##### Before you begin:

-   Ensure you have a Microsoft Azure subscription.
    
-   Ensure you have the admin permissions required to onboard Microsoft Azure or the built-in Security Administrator role.
    
-   Obtain the tenant ID and subscription ID. You can view these in the Microsoft Azure Portal in Management groups.
    

To onboard Microsoft Azure using the basic configuration:

1.  Select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Microsoft Azure, then hover over it and click Add.
    
4.  In the onboarding wizard, select the scope for this data source:
    
    -   **Tenant:** (Default) A specific instance of Azure Active Directory, which can contain several subscriptions.
        
    -   **Management Group:** A collection of Microsoft Azure subscriptions.
        
    -   **Subscription:** A collection of Microsoft Azure resources associated with a specific Microsoft Azure tenant.
        
    
5.  Select an approved tenant ID from the Tenant ID list. If no tenant IDs have been approved, enter the tenant ID. Click Approve in Azure to add Cortex Cloud as an approved application on this tenant. When the tenant ID is approved, it appears with a green check next to it.
    
6.  (Optional) Click Show advanced settings to define advanced settings:
    
    -   **Instance Name:** Enter a unique instance name or leave it empty to be automatically populated. The automatic naming convention is the CSP name followed by the ID of the scope unit selected in the onboarding wizard. For example, when onboarding an Azure tenant, the automatic name would be `AZURE-<tenantID>` where `<tenantID>` is the ID of the tenant onboarded.
        
    -   **Scope Modifications:** To fine-tune your Microsoft Azure data collection, you can modify the scope by including or excluding specific regions. If you selected a Government environment, only Microsoft Azure Government regions are displayed. Additionally, if you selected a tenant or management group as the scope, you can modify the scope by including or excluding specific subscriptions. If you choose to include specific subscriptions, only those specified subscriptions will be included, even if additional subscriptions are added to your Microsoft Azure environment after onboarding. If you choose to exclude specific subscriptions, any new subscriptions added to your Microsoft Azure environment after onboarding will be included in the scope. Excluded subscriptions are not visible in Cortex Cloud.
        
    -   **Additional Security Capabilities:** Choose which security capabilities you want to benefit from. Some security capabilities are enabled by default and can be modified. Adding security capability typically requires additional cloud provider permissions. For detailed information on the permissions required, see Cloud service provider permissions. The additional security capabilities you can enable include:
        
        -   **XSIAM analytics:** Analyzes your endpoint data to develop a baseline and raise Analytics and Analytics BIOC alerts when anomalies and malicious behaviors are detected.
            
        -   **Automation:** Use automation to pre-configure a list of integrations and associated commands to automate security issue responses. Commands can be utilized individually or as part of custom playbooks for issue remediation.
            
        
    -   **Cloud Tags:** Define tags and tag values to be added to any new resource created by Cortex Cloud in the cloud environment. Note: The `managed_by = paloaltonetworks` tag is automatically added to all resources. This tag is mandatory. You cannot edit or remove this tag.
        
    -   **Log Collection Configuration:** To maximize security coverage, include the collection of audit logs (Event Hub). This may require additional cloud service provider permissions. For detailed information on the permissions required, see Cloud service provider permissions.
        
    
7.  Click Save. Cortex Cloud creates an instance in the pending state.
    
8.  To complete the process, download the authentication template:
    
    -   For onboarding Microsoft Azure tenants and management groups, click one of the following:
        
        -   Download Terraform to download a Terraform file and proceed to Finalize onboarding by applying the Terraform template's configuration.
            
            To onboard all subscriptions within a management group or tenant, our authentication template uses Azure Resource Management (ARM) templates internally. The ARM templates are encoded with base64 and located inside the `template_params.tfvars` file as the `policy_template` variable.
            
        -   Azure Resource Manager to download a `tar.gz` file and proceed to Finalize onboarding of tenants and management groups by deploying the Microsoft Azure Resource Manager (ARM) template.
            
        
    -   For onboarding Azure subscriptions, click one of the following:
        
        -   Download Terraform to download a Terraform file and proceed to Finalize onboarding by applying the Terraform template's configuration.
            
        -   Azure Resource Manager to download a JSON file and proceed to Finalize onboarding of subscriptions by deploying the Microsoft Azure Resource Manager (ARM) template.
            
        
    
    The CloudFormation authentication template is reusable and can be executed as many times as you want to create new cloud instances with the settings you defined in the onboarding wizard.
    
9.  Click Close.
    

Cortex Cloud generates an authentication template based on the settings you configured in the Microsoft Azure onboarding wizard.

###### Required Azure permissions for Cortex Cloud onboarding

Use the following template to create a dedicated role with the permissions required for onboarding Microsoft Azure to Cortex Cloud.

```
{
  "Name": "CortexCloudOnboarding",
  "IsCustom": true,
  "Description": "Custom role with permissions for Cortex Cloud onboarding",
  "Actions": [
    "Microsoft.Authorization/roleAssignments/read",
    "Microsoft.Authorization/roleAssignments/write",
    "Microsoft.Authorization/roleAssignments/delete",
    "Microsoft.Authorization/roleDefinitions/read",
    "Microsoft.Authorization/roleDefinitions/write",
    "Microsoft.Authorization/roleDefinitions/delete",
    "Microsoft.Authorization/roleManagementPolicies/read",
    "Microsoft.Authorization/roleManagementPolicies/write",
    "Microsoft.Authorization/roleManagementPolicyAssignments/read",
    "Microsoft.EventHub/clusters/read",
    "Microsoft.EventHub/clusters/write",
    "Microsoft.EventHub/clusters/delete",
    "Microsoft.EventHub/clusters/namespaces/read",
    "Microsoft.EventHub/namespaces/read",
    "Microsoft.EventHub/namespaces/write",
    "Microsoft.EventHub/namespaces/delete",
    "Microsoft.EventHub/namespaces/authorizationRules/read",
    "Microsoft.EventHub/namespaces/authorizationRules/write",
    "Microsoft.EventHub/namespaces/authorizationRules/delete",
    "Microsoft.EventHub/namespaces/eventhubs/read",
    "Microsoft.EventHub/namespaces/eventhubs/write",
    "Microsoft.EventHub/namespaces/eventhubs/delete",
    "Microsoft.EventHub/namespaces/eventhubs/authorizationRules/read",
    "Microsoft.EventHub/namespaces/eventhubs/authorizationRules/write",
    "Microsoft.EventHub/namespaces/eventhubs/authorizationRules/delete",
    "Microsoft.EventHub/namespaces/eventhubs/consumergroups/read",
    "Microsoft.EventHub/namespaces/eventhubs/consumergroups/write",
    "Microsoft.EventHub/namespaces/eventhubs/consumergroups/delete",
    "Microsoft.Insights/diagnosticSettings/write",
    "Microsoft.ManagedIdentity/userAssignedIdentities/read",
    "Microsoft.ManagedIdentity/userAssignedIdentities/write",
    "Microsoft.ManagedIdentity/userAssignedIdentities/delete",
    "Microsoft.PolicyInsights/remediations/read",
    "Microsoft.PolicyInsights/remediations/write",
    "Microsoft.PolicyInsights/remediations/delete",
    "Microsoft.PolicyInsights/remediations/listDeployments/read",
    "Microsoft.PolicyInsights/remediations/cancel/action",
    "Microsoft.Resources/deploymentScripts/read",
    "Microsoft.Resources/deploymentScripts/write",
    "Microsoft.Resources/deploymentScripts/delete",
    "Microsoft.Resources/deploymentScripts/logs/read",
    "Microsoft.Resources/deployments/read",
    "Microsoft.Resources/deployments/write",
    "Microsoft.Resources/deployments/delete",
    "Microsoft.Resources/deployments/operations/read",
    "Microsoft.Resources/deployments/operationstatuses/read",
    "Microsoft.Resources/deployments/cancel/action",
    "Microsoft.Resources/deployments/exportTemplate/action",
    "Microsoft.Resources/deployments/validate/action",
    "Microsoft.Resources/deployments/whatIf/action",
    "Microsoft.Resources/subscriptions/resourceGroups/read",
    "Microsoft.Resources/subscriptions/resourceGroups/write",
    "Microsoft.Resources/subscriptions/resourceGroups/delete",
    "Microsoft.Resources/subscriptions/resourceGroups/moveResources/action",
    "Microsoft.Resources/subscriptions/resourceGroups/validateMoveResources/action",
    "Microsoft.Resources/subscriptions/resourcegroups/deployments/read",
    "Microsoft.Resources/subscriptions/resourcegroups/deployments/write",
    "Microsoft.Resources/subscriptions/resourcegroups/deployments/operations/read",
    "Microsoft.Resources/subscriptions/resourcegroups/deployments/operationstatuses/read",
    "Microsoft.Resources/subscriptions/resourcegroups/resources/read",
    "Microsoft.Storage/storageAccounts/read",
    "Microsoft.Storage/storageAccounts/write",
    "Microsoft.Storage/storageAccounts/delete",
    "Microsoft.Storage/storageAccounts/blobServices/containers/read",
    "Microsoft.Storage/storageAccounts/blobServices/containers/write",
    "Microsoft.Storage/storageAccounts/blobServices/containers/delete",
    "Microsoft.aadiam/diagnosticsettings/read",
    "Microsoft.aadiam/diagnosticsettings/write",
    "Microsoft.aadiam/diagnosticsettings/delete",
    "microsoft.aadiam/azureADMetrics/providers/Microsoft.Insights/diagnosticSettings/write",
    "microsoft.aadiam/tenants/providers/Microsoft.Insights/diagnosticSettings/write"
  ],
  "NotActions": [],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": [
    <SUBSCRIPTION_ID> or <MANAGEMENT_GROUP_ID> or <TENANT_ID>
  ]
}
```

Where `<SUBSCRIPTION_ID>`, `<MANAGEMENT_GROUP_ID>`, or `<TENANT_ID>` is replaced with the ID of the scope you are onboarding.

#### Finalize Microsoft Azure onboarding by executing the authentication template

Learn how to execute the authentication template file in Microsoft Azure for subscriptions, tenants, and management groups. We provide instructions both for applying the Terraform template's configuration and for deploying the Microsoft Azure Resource Manager (ARM) template.

While onboarding Microsoft Azure with the onboarding wizard, you have to choose one of the following options for executing an authentication template: Download Terraform or Azure Resource Manager.

After running the wizard, you finalize the onboarding by executing the template to provision the resources for subscriptions, management groups, and tenants in your cloud environment.

After the template is successfully executed, the initial discovery scan starts. When the scan completes, view your cloud assets in Asset Inventory.

##### Finalize onboarding by applying the Terraform template's configuration

If you selected the Download Terraform option in the Microsoft Azure onboarding wizard, execute the template with the CLI. You decide, based on your own use case, how you would like to perform the CLI commands, for example, locally or in CloudShell.

**Prerequisite:**

Before you begin, ensure you have:

-   An Azure subscription.
    
-   A user with the required permissions for the relevant scope (subscription, management group, tenant). We recommend you create a dedicated role.
    
-   Tenant ID and subscription ID. You can view these in Microsoft Azure Portal in Management groups.
    
-   Installed Terraform on your local machine. You can download Terraform from the official [Terraform website](https://www.terraform.io/downloads.html) and follow the installation instructions for your operating system.
    
    **Tip:**
    
    Review the Introduction to Terraform for Cloud service provider (CSP) onboarding to get familiar with how Cortex works with Terraform for cloud onboarding.
    
-   Installed the [Azure CLI tool](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).
    

1.  In your local terminal, log in to your Azure account using the Azure CLI:
    
    ```
    az login
    ```
    
2.  Create a directory on your local machine to store and run the Terraform code. If you have more than one Azure connector, you need a separate directory for each one:
    
    ```
    mkdir -p ~/terraform/azure-connector-1
    ```
    
3.  Navigate to the directory you created and extract the Terraform files. Ensure all necessary Terraform files are present (`main.tf`, `template_params.tfvars`, and so on).
    
    **Important:**
    
    Do not delete or move the Terraform files from this folder. It will prevent you from being able to edit your cloud instance in the future.
    
    ```
    cd ~/terraform/azure-connector-1
    tar -xzvf <your_template>.tar.gz.
    ```
    
4.  Initialize Terraform in your project directory:
    
    ```
    terraform init
    ```
    
5.  Apply your Terraform configuration using the downloaded parameter file:
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
    -   When the CLI prompts you for a Group ID, enter the management group ID or the root tenant ID where you want to create Cortex Cloud resources.
        
    -   When the CLI prompts you for a Subscription ID, enter the subscription ID where you want to create Cortex Cloud resources. (This subscription is typically a subscription that the security team manages.)
        
    
6.  When prompted, review the actions the Terraform will perform and approve them by entering **`yes`**.
    

The Terraform template is executed.

##### Finalize onboarding of subscriptions by deploying the Microsoft Azure Resource Manager (ARM) template

If you selected the Azure Resource Manager option in the Microsoft Azure onboarding wizard to onboard subscriptions, deploy the template with the CLI. You decide, based on your use case, how you would like to perform the CLI commands, for example, locally or in CloudShell.

**Prerequisite:**

Before you begin, ensure you have:

-   An Azure subscription.
    
-   A user with the required permissions for the relevant scope (subscription, management group, tenant). We recommend you create a dedicated role.
    
-   Tenant ID and subscription ID. You can view these in Microsoft Azure Portal in Management groups.
    
-   Installed the [Azure CLI tool](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).
    
-   Authorization to create management group policies.
    

1.  In your local terminal or CloudShell, log in to your Azure account using the Azure CLI:
    
    ```
    az login
    ```
    
2.  Deploy the template file.
    
    az deployment sub create \\
       --location `<LOCATION>` \\
       --subscription `<SUBSCRIPTION_ID>` \\
       --template-file `<JSON_TEMPLATE>` 
    
    where:
    
    -   `<LOCATION>` is the location of the management group, such as `eastus` or `westus`.
        
    -   `<SUBSCRIPTION_ID>` is the ID of the subscription you want to onboard.
        
    -   `<JSON_TEMPLATE>` is the JSON template file that you downloaded at the end of the onboarding wizard.
        
    

To verify the deployment was successful, check the Azure Portal under the "Deployments" section of the targeted subscription.

##### Finalize onboarding of tenants and management groups by deploying the Microsoft Azure Resource Manager (ARM) template

If you selected the Azure Resource Manager option in the Microsoft Azure onboarding wizard to onboard tenants or management groups, deploy the template with the CLI using Bash in CloudShell.

**Prerequisite:**

Before you begin, ensure you have:

-   An Azure subscription.
    
-   A user with the required permissions for the relevant scope (subscription, management group, tenant). We recommend you create a dedicated role.
    
-   Tenant ID and subscription ID. You can view these in Microsoft Azure Portal in Management groups.
    
-   Installed the [Azure CLI tool](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).
    
-   Authorization to create management group policies.
    

1.  To prepare for deployment, execute the following commands in a Bash-compliant terminal, such as the Bash environment in Azure Cloud Shell:
    
    | Step | Command |
    | --- | --- |
    | Create a folder on your local machine to store the `tar` file. If you have more than one Azure connector, you need a separate directory for each one. | `mkdir -p ~/azure-connector-1` |
    | Navigate to the directory you created and extract the files. | `cd ~/azure-connector-1 tar -xzvf <your_template>.tar.gz.` |
    
2.  Deploy the template file: `bash onboard.sh`
    
    When prompted, enter the following values:
    
    -   The Azure region where you want the resources to be created, such as `eastus` or `westus`.
        
    -   The ID of the management group or tenant that you want to onboard.
        
    -   The ID of the subscription where the deployment script will run.
        
    

To verify the deployment was successful, check the Azure Portal under the "Deployments" section of the targeted management group, or tenant.

See also

-   Introduction to Terraform for Cloud service provider (CSP) onboardingIntroduction to Terraform for Cloud service provider (CSP) onboarding

#### Configure Azure integration instances and monitor integration instance health

Enable automations from Data Sources & Integrations and monitor Azure integration instance health.

You can streamline and simplify configuring Azure integration instances within the Data Sources & Integrations page. This includes granting the necessary permissions for the platform to execute commands, scripts, and playbooks as part of issue response. All automation permissions are added to the Terraform as part of the setup process.

##### Configure a new or existing Azure integration instance

**Note:**

If you have not yet onboarded your cloud integration, see Ingest cloud assets.

You can configure a new Azure integration instance or edit an existing Azure integration instance, for example to enable automations.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  In the Azure integration row:
    
    -   To configure a new Azure integration instance: Click ⋮ and then click Add New Instance or click View Details and from the New Instance drop down select the Azure cloud service provider.
        
    -   To edit an existing Azure integration instance: Click View Details and then click the configuration pencil icon.
        
    
3.  (Optional) Under Show advanced settings, select Automation and select a log level for the automation integration logs.
    
4.  If the instance is not enabled, in the row for the Azure integration instance, right-click and select Enable. Alternatively, click the more options icon and select Enable.
    
5.  Manually upload the template (Terraform) to the relevant cloud provider.
    
    An automation integration instance with the same name as the cloud integration instance is automatically created and automation permissions are automatically updated in the system. For more information, see Ingest cloud assets.
    

##### Monitor Azure integration instance health

Monitoring Azure integration instance health ensures continuous, reliable operation, facilitating issue response and improving overall security posture.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  In the Azure integration instance row, click the View Details link and then click a specific Instance Name.
    
    From the list of health statuses, you can click the following to see automation instance health status:
    
    -   Permissions: Shows any permission issues or missing permissions for the instance.
        
    -   Automation: Indicates any errors during automation instance creation or configuration.
        
        **Note:**
        
        Currently, automation permission errors or missing automation permissions do not affect the Automation health status. You can view any permission errors or missing permissions in the the Permissions health status.

### Onboard Oracle Cloud Infrastructure

Follow the OCI onboarding wizard, and Cortex Cloud creates a custom authentication template to be applied in OCI.

Follow this wizard to onboard your Oracle Cloud Infrastructure (OCI) environment. The OCI onboarding wizard is designed to facilitate the seamless setup of OCI data into Cortex Cloud. This guided experience requires minimal user input. For full control of the setup, you can use the advanced settings. Based on the onboarding settings, Cortex Cloud generates a Terraform authentication template to establish trust with OCI and grant permissions to Cortex Cloud. Application of the Terraform authentication template completes the onboarding process. The Terraform authentication template grants the permissions, includes a component that notifies Cortex Cloud of the execution details, and a new cloud instance is created.

#### Before you begin:

-   Ensure you have access to the Oracle Cloud Infrastructure console
    
-   Permissions for all of the following are required:
    
    -   Creation of identity groups (for more information, refer to [Managing Groups](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managinggroups.htm))
        
    -   Policies (for more information, refer to [How Policies Work](https://docs.oracle.com/en-us/iaas/Content/Identity/Concepts/policies.htm#How_Policies_Work))
        
    -   Tag namespaces in the root compartment (for more information, refer to [Tags and Tag Namespace Concepts](https://docs.oracle.com/en-us/iaas/Content/Tagging/Tasks/managingtagsandtagnamespaces.htm))
        
    
-   If you enable audit log collection, you must first Configure the OCI connector for log collection. If you want to use bucket replication, see [Object Storage Replication](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/usingreplication.htm).
    

To onboard OCI:

1.  Select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Oracle Cloud Infrastructure, then hover over it and click Add.
    
4.  (Optional) Enter a unique instance name.
    
    If you don't enter a name, the wizard will apply the default name, `OCI-<TENANCY_OCID>`.
    
5.  (Optional) Click Show advanced settings to define advanced settings:
    
    -   Scope Modifications: You can modify the scope by including or excluding specific Compartments. If you choose to include specific compartments, only the specified compartments and their sub-compartments will be included. This setting will affect future sub-compartments added to your OCI environment after onboarding. If you choose to exclude specific compartments, this setting will also affect their sub-compartments.
        
        **Note**: The root compartment is always onboarded, and only the sub-compartment scope can be modified.
        
        Excluded compartments are not visible in Cortex Cloud.
        
    -   Additional Security Capabilities: Enable additional Cortex Cloud security add-ons, if available. This may require additional cloud provider permissions. For detailed information on the permissions required, see Cloud service provider permissions. The additional security capabilities you can enable include:
        
        -   **Data security posture management:** An agentless multi-cloud data security solution that discovers, classifies, protects, and governs sensitive data.
            
        -   **Serverless functions scanning (Gen 1 only):** Implement serverless scanning to detect and remediate vulnerabilities within serverless functions during the development lifecycle. Seamless integration into CI/CD pipelines enables automated security scans for a continuously secure pre-production environment.
            
        -   **Registry scanning:** Scan container registry images for vulnerabilities. malware, and secrets. You can configure your initial preference for scanning your registry. Any newly discovered registry, repository, or image in the account will be scanned by default. For more details, see Configure registry scanning for cloud accountsConfigure registry scanning for cloud accounts
            
        -   **Agentless disk scanning:** (Recommended) Implement agentless disk scanning to remotely detect and remediate vulnerabilities during the development lifecycle.
            
        
    -   **Cloud Tags:** Define tags and tag values to be added to any new resource created by Cortex Cloud in the cloud environment. Note: The `managed_by = paloaltonetworks` tag is automatically added to all resources. This tag is mandatory. You cannot edit or remove this tag.
        
    -   **Log Collection Configuration:** To maximize security coverage, enable the collection of audit logs. This may require additional cloud service provider permissions. For detailed information on the permissions required, see Cloud service provider permissions. Enter the following details for each preexisting OCI storage bucket that you intend to use for log collection:
        
        -   Region: The geographic OCI region where the bucket is located. For example, "us-phoenix-1".
            
        -   Bucket Name: The name of the OCI storage bucket.
            
        -   Compartment OCID: The Oracle Cloud Identifier (OCID) of the compartment that contains the bucket.
            
        
    
6.  Click Save.
    
7.  Download the OCI authentication template by clicking Download Terraform.
    
    The Terraform authentication template is reusable and can be executed as many times as you want to create new instances with the settings you defined in the wizard. The Terraform authentication template is valid for seven days from when it was created.
    
8.  Click Close.
    

Cortex Cloud generates a Terraform authentication template based on the settings you configured in the OCI onboarding wizard.

**Next step:** Apply the Terraform authentication template in OCI.

#### Onboard Oracle Cloud Infrastructure with basic configuration

Follow the basic configuration OCI onboarding wizard to enable audit log collection and asset, and Cortex Cloud creates a custom authentication template to be deployed in OCI.

**Notice:**

Onboarding Oracle Cloud Infrastructure (OCI) using the basic configuration is included with Cortex Cloud NG SIEM, Cortex Cloud Enterprise, and Cortex Cloud Enterprise+ licenses. For onboarding OCI with a Cortex Cloud Premium license, see Onboard Oracle Cloud Infrastructure.

This procedure describes how to onboard your OCI environment for Cortex Cloud NG SIEM, Cortex Cloud Enterprise, and Cortex Cloud Enterprise+ licenses. After you onboard your OCI environment, Cortex Cloud begins to discover cloud assets and collect audit logs.

Follow this wizard to onboard your Oracle Cloud Infrastructure (OCI) environment. The OCI onboarding wizard is designed to facilitate the seamless setup of OCI data into Cortex Cloud. This guided experience requires minimal user input. For full control of the setup, you can use the advanced settings. Based on the onboarding settings, Cortex Cloud generates a Terraform authentication template to establish trust with OCI and grant permissions to Cortex Cloud. Application of the Terraform authentication template completes the onboarding process. The Terraform authentication template grants the permissions, includes a component that notifies Cortex Cloud of the execution details, and a new cloud instance is created.

##### Before you begin:

-   Ensure you have access to the Oracle Cloud Infrastructure console
    
-   Permissions for all of the following are required:
    
    -   Creation of identity groups (for more information, refer to [Managing Groups](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managinggroups.htm))
        
    -   Policies (for more information, refer to [How Policies Work](https://docs.oracle.com/en-us/iaas/Content/Identity/Concepts/policies.htm#How_Policies_Work))
        
    -   Tag namespaces in the root compartment (for more information, refer to [Tags and Tag Namespace Concepts](https://docs.oracle.com/en-us/iaas/Content/Tagging/Tasks/managingtagsandtagnamespaces.htm))
        
    
-   If you enable audit log collection, you must first Configure the OCI connector for log collection. If you want to use bucket replication, see [Object Storage Replication](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/usingreplication.htm).
    

To onboard OCI using the basic configuration:

1.  Select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Oracle Cloud Infrastructure, then hover over it and click Add.
    
4.  (Optional) Enter a unique instance name.
    
    If you don't enter a name, the wizard will apply the default name, `OCI-<TENANCY_OCID>`.
    
5.  (Optional) Click Show advanced settings to define advanced settings:
    
    -   Scope Modifications: You can modify the scope by including or excluding specific Compartments. If you choose to include specific compartments, only the specified compartments and their sub-compartments will be included. This setting will affect future sub-compartments added to your OCI environment after onboarding. If you choose to exclude specific compartments, this setting will also affect their sub-compartments.
        
        **Note**: The root compartment is always onboarded, and only the sub-compartment scope can be modified.
        
        Excluded compartments are not visible in Cortex Cloud.
        
    -   **Cloud Tags:** Define tags and tag values to be added to any new resource created by Cortex Cloud in the cloud environment. Note: The `managed_by = paloaltonetworks` tag is automatically added to all resources. This tag is mandatory. You cannot edit or remove this tag.
        
    -   **Log Collection Configuration:** To maximize security coverage, enable the collection of audit logs. This may require additional cloud service provider permissions. For detailed information on the permissions required, see Cloud service provider permissions. Enter the following details for each preexisting OCI storage bucket that you intend to use for log collection:
        
        -   Region: The geographic OCI region where the bucket is located. For example, "us-phoenix-1".
            
        -   Bucket Name: The name of the OCI storage bucket.
            
        -   Compartment OCID: The Oracle Cloud Identifier (OCID) of the compartment that contains the bucket.
            
        
    
6.  Click Save. Cortex Cloud creates an instance in the pending state.
    
7.  Download the OCI authentication template by clicking Download Terraform.
    
    The Terraform authentication template is reusable and can be executed as many times as you want to create new instances with the settings you defined in the wizard. The Terraform authentication template is valid for seven days from when it was created.
    
8.  Click Close.
    

Cortex Cloud generates a Terraform authentication template based on the settings you configured in the OCI onboarding wizard.

**Next step:** Apply the Terraform authentication template in OCI.

#### Manually upload template to OCI

Learn how to manually deploy the Terraform template files in Oracle Cloud Infrastructure (OCI).

When you have downloaded the Terraform template files in the onboarding wizard, you must log in to the Oracle Cloud Infrastructure (OCI) CLI tool to deploy the template file. For more information about the OCI CLI tool, refer [Oracle documentation](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/cliconcepts.htm).

**Prerequisite:**

Before you begin, ensure you have:

-   An Oracle Cloud Infrastructure account and the tenancy OCID.
    
-   Permission to deploy a custom template and create its resources in OCI.
    
-   Installed Terraform on your local machine. You can download Terraform from the official [Terraform website](https://www.terraform.io/downloads.html) and follow the installation instructions for your operating system.
    
-   Installed the OCI CLI tool, and authenticated with a key pair or token-based credentials.
    

1.  Log in to [OCI](https://www.oracle.com/il-en/cloud/sign-in.html) and open Cloud Shell.
    
2.  Create a directory on your local machine to store and run the Terraform code. If you have more than one OCI connector, you need a separate directory for each one. For example:
    
    ```
    mkdir -p ~/terraform/oci-connector-1
    ```
    
3.  Navigate to the directory you created and extract the Terraform files. Ensure all necessary Terraform files are present (`main.tf`, `template_params.tfvars`, and so on). For example:
    
    ```
    cd ~/terraform/oci-connector-1
    tar -xzvf <your_template>.tar.gz.
    ```
    
4.  Initialize Terraform in your project directory:
    
    ```
    terraform init
    ```
    
    It might take several seconds until the initialization is complete.
    
5.  Apply your Terraform configuration using the downloaded parameter file. When prompted to enter a value, enter the tenancy OCID.
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
6.  When prompted, review the actions the Terraform will perform, and approve them by entering **`yes`**.
    
    The Terraform template is deployed.
    

When the template is successfully uploaded to OCI, the initial discovery scan starts. When the scan is complete, you can view your cloud assets in Asset Inventory. You can also view details about the instance by hovering over the instance on the Data Sources & Integrations page, and then clicking View Details.

#### Configure the OCI connector for log collection

Create an OCI service connector and define the log source within OCI and the connector's target as the OCI bucket you want to use for audit log collection.

In order to enable audit log collection in Cortex Cloud, you must first create an OCI service connector. For more details, see [Creating a Connector with a Logging Source](https://docs.oracle.com/en-us/iaas/Content/connector-hub/create-service-connector-logging-source.htm). After you have created the OCI service connector, you can proceed to Onboard Oracle Cloud Infrastructure and enable collection of audit logs.

1.  Log in to the [OCI Console](https://cloud.oracle.com/). Open the navigation menu and go to Analytics and AI → Connector Hub.
    
2.  On the Connectors page, click Create connector.
    
3.  On the Create Connector page, enter a descriptive name for the new connector (for example, `CortexCloud_Log_Exporter`). Click Create connector.
    
4.  Select the Compartment where you want to store the new connector resource.
    
5.  Set the Source service to Logging.
    
6.  Set the Target service to Object Storage. This is the storage bucket that Cortex Cloud will read from.
    
7.  Under Configure target, configure the storage bucket to send the log data to:
    
    -   Compartment: Select the compartment that contains the bucket that you want to use.
        
    -   Bucket: Select the name of the bucket that you want to send the data to.
        
    -   Object Name Prefix: (Optional) Enter a prefix value.
        
    -   Show additional options: (Optional) Click this link to enter values for batch size (in MBs) and batch time (in milliseconds).
        
    
8.  (Optional) Add one or more tags to the connector. Select Show Advanced Options to show the Add Tags section.
    
9.  Click Create. When the connector is ready, the connector's details page opens.
    

When you onboard your OCI environment and select to Collect Audit Logs, enter the OCI region, the bucket name, and the compartment OCID.

### Manually connect a cloud instance
When onboarding your cloud instance using the onboarding wizard, after you download the authentication template and execute it in your cloud environment, notification is sent to Cortex Cloud and a cloud instance is created. This connection between your cloud environment and the Cortex Cloud cloud instance typically occurs automatically.

There are several scenarios when the instance should be connected manually:

-   You executed the template in your cloud environment and your environment is an air-gapped network. In this case, the notification to create the instance in Cortex Cloud does not happen.
    
-   You have executed the template, but the instance has not appeared in Cloud Instances. This is often due to connectivity or firewall issues.
    
-   You have a specific need to connect the instance manually.
    

To manually connect a cloud instance, you need to identify the pending instance you want to connect. In Cloud Instances, remove the default filter that excludes pending instances. Right-click on a pending instance and select View Details to see the configuration details of that specific pending instance. After you have identified the pending instance you want to connect manually, right-click and select Manually connect an instance. For more information on pending instances, see Pending cloud instances.

AWS

In AWS Management Console, navigate to [CloudFormation](https://console.aws.amazon.com/cloudformation/). Use the following table to guide you on where to obtain the necessary input for the manual onboarding. Not every field appears in every manual onboarding instance.

| Connect Instance input field | Value |
| --- | --- |
| Organization ID | Onboarded organization ID. |
| Organizational Unit ID | Onboarded organizational unit ID. |
| Account ID | Onboarded account ID. |
| Role ARN | The value of Outputs → CORTEXXDRARN. |
| External ID | The value of Parameters → ExternalID. |
| Audit Logs SQS URL | The value of Resources → CloudTrailLogsQueue. |
| Audit Logs Role ARN | The value of Resources → CloudTrailReadRole → ARN. |
| Audit Logs Audience | Automatically populated. |
| Outpost Scanner Role ARN | The value of Resources → CortexPlatformScannerRole → ARN. |

GCP

1.  Open your local terminal (Command prompt, PowerShell, or Terminal).
    
2.  Log in to your GCP account using the gcloud CLI:
    
    ```
    gcloud auth login
    ```
    
3.  Display the values of all defined output variables in your Terraform configuration, formatted as a JSON object:
    
    ```
    terraform output -json
    ```
    

Use the following table to guide you on which values in the output map to the necessary input for the manual onboarding. Not every field appears in every manual onboarding instance.

| Connect Instance input field | Value |
| --- | --- |
| Organization ID | organization_id.value |
| Project ID | project_id.value |
| Folder ID | folder_id.value |
| Service Account Email | service_account_email.value |
| Audit Logs Audit Pubsub Subscription ID | resources_data.value.AUDIT_LOGS.audit_pubsub_subscription_id |
| Audit Logs Service Account Email | resources_data.value.AUDIT_LOGS.audit_service_account_email |
| Outpost Scanner Service Account Email | resources_data.value.OUTPOST_SCANNER.outpost_scanner_service_account_email |

Azure with Terraform

1.  Open your local terminal (Command prompt, PowerShell, or Terminal).
    
2.  Log in to your Azure account using the Azure CLI:
    
    ```
    az login
    ```
    
3.  Display the values of all defined output variables in your Terraform configuration, formatted as a JSON object:
    
    ```
    terraform output -json
    ```
    

Use the following table to guide you on which values in the output map to the necessary input for the manual onboarding. Not every field appears in every manual onboarding instance.

| Connect Instance input field | Value |
| --- | --- |
| Resource Group Location (only for subscription scope) | Onboarded resource group location |
| Resource Group Name | Automatically populated |
| Audit Logs Audience | Automatically populated |
| Audit Logs Storage Account Name | resources_data.value.AUDIT_LOGS.storage_account_name |
| Audit Logs Tenant ID | Automatically populated |
| Audit Logs Client ID | resources_data.value.AUDIT_LOGS.client_id |
| Audit Logs Namespace | resources_data.value.AUDIT_LOGS.namespace |
| Audit Logs Eventhub Name | resources_data.value.AUDIT_LOGS.eventhub_name |
| Audit Logs Azure Audit Eventhub Consumer Group Name | resources_data.value.AUDIT_LOGS.azure_audit_eventhub_consumer_group_name |

Azure Portal

-   Navigate to the [Microsoft Azure Portal](http://portal.azure.com) and log in.
    

Use the following table to guide you on which values in the output map to the necessary input for the manual onboarding. Not every field appears in every manual onboarding instance.

| Connect Instance input field | Value |
| --- | --- |
| Resource Group Location (only for subscription scope) | Onboarded resource group location |
| Resource Group Name | Automatically populated |
| Audit Logs Audience | Automatically populated |
| Audit Logs Storage Account Name | Navigate to Storage accounts and filter by resource group. |
| Audit Logs Tenant ID | Automatically populated |
| Audit Logs Client ID | Navigate to App registrations and sort by time. The default name starts with "auditlogsapp". |
| Audit Logs Namespace | Navigate to Event Hubs and filter by resource group. |
| Audit Logs Eventhub Name | Navigate to Event Hubs and select the Event Hub Namespace. Under Event Hubs, take the value in the Name column. |
| Audit Logs Azure Audit Eventhub Consumer Group Name | Navigate to Event Hubs -and select the Event Hub Namespace and then the Event Hub. Under Consumer Groups, use the value in the Name column, but not ‘$Default’. |

### Edit your onboarded CSP configuration
In order to make changes to your onboarded CSP configuration, you first modify the cloud instance settings in Cortex Cloud and download an updated authentication template. After uploading the updated template to the CSP environment, you execute the template and then the changes take affect.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Identify the Cloud Service Provider you want to update and click View Details.
    
3.  In the Cloud Instances page, identify the cloud instance you want to edit and click the Configuration pencil to edit the instance.
    
4.  Make changes to the configuration settings. Click Save.
    
    If the changes you made require reexecuting the authentication template, you will be prompted to to download the file. Click Download CloudFormation or Download Terraform as relevant to your CSP type.
    
    **Important:**
    
    When using Terraform authentication templates, you must execute the updated Terraform template from the same folder where the original Terraform template was executed.
    
5.  In the Cloud Instances page, a notification appears stating that there are pending changes for the cloud instance you updated. These changes are not applied until you execute the updated template in the CSP environment.
    
6.  Execute the updated authentication template in your CSP environment by selecting the appropriate procedure below.
    

Amazon Web Services

After you have downloaded the updated CloudFormation authentication template, connect to AWS Management Console to perform a direct update to the stack using the updated template file. With a direct update, you submit a template or input parameters that specify updates to the resources in the stack, and CloudFormation immediately deploys them.

1.  Log in to the AWS Management Console and open the [CloudFormation console](https://console.aws.amazon.com/cloudformation/).
    
2.  On the Stacks page, select the existing stack that you want to update.
    
3.  In the stack details pane, select Update stack → Make a direct update.
    
4.  On the Update stack page, select Replace existing template.
    
5.  Under Specify template, select Upload a template file. Select the updated authentication template you downloaded from Cortex Cloud.
    
6.  Click Next and Next again.
    
7.  Select to acknowledge that AWS CloudFormation might create IAM resources with custom names. Click Next.
    
8.  Click Submit. The stack update is complete when it appears in the Stacks list with status of UPDATE_COMPLETE.
    

Google Cloud Platform

After you have downloaded the updated Terraform template file, connect to Google Cloud Console to update the stack using the updated template file.

1.  Open your local terminal (Command prompt, PowerShell, or Terminal).
    
2.  Log in to your GCP account using the gcloud CLI:
    
    ```
    gcloud auth login
    ```
    
3.  Navigate to the directory you originally used for the Terraform template when onboarding your CSP and extract the Terraform files.
    
    ```
    cd ~/terraform/gcp-connector-1
    tar -xzvf <your_template>.tar.gz
    ```
    
4.  Initialize the upgrade of the Terraform in your project directory:
    
    ```
    terraform init -upgrade
    ```
    
5.  Apply your Terraform configuration using the downloaded parameter file. When prompted, enter the project ID if you configured one in the onboarding wizard:
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
    The updated Terraform template is deployed.
    

Microsoft Azure Resource Manager using the CLI

After you have downloaded the updated authentication template file, lot in to Azure portal to update the stack using the updated template file.

1.  Log in to the Azure portal. Select Cloud Shell from the top navigation and then select Bash.
    
2.  Navigate to the directory you originally used for the authentication template when onboarding your CSP and extract the files.
    
    ```
    cd ~/azure-connector-1
    tar -xzvf <your_template>.tar.gz.
    ```
    
3.  In Cloud Shell, run the onboard.sh file:
    
    ```
    bash onboard.sh
    ```
    
    The updated authentication template is deployed.
    

Microsoft Azure subscriptions

After you have downloaded the updated authentication template file, use the same method you used initially to execute the template in Microsoft Azure:

#### Execute the Terraform authentication template

1.  Open your local terminal (Command prompt, PowerShell, or Terminal).
    
2.  Log in to your Azure account using the Azure CLI:
    
    ```
    az login
    ```
    
3.  Navigate to the directory you originally used for the Terraform template when onboarding your CSP and extract the Terraform files.
    
    ```
    cd ~/terraform/azure-connector-1
    tar -xzvf <your_template>.tar.gz.
    ```
    
4.  Initialize the upgrade of the Terraform in your project directory:
    
    ```
    terraform init -upgrade
    ```
    
5.  Apply your Terraform configuration using the downloaded parameter file. :
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
    The updated Terraform template is deployed.
    

#### Deploy the authentication template in Azure Resource Manager

1.  Open your local terminal.
    
2.  Log in to your Azure account using the Azure CLI:
    
    ```
    az login
    ```
    
3.  Deploy the updated template file:
    
    ```
    az deployment sub create  --location <LOCATION>  --subscription <SUBSCRIPTION_ID> --template-file <JSON_TEMPLATE> 
    ```
    
    where:
    
    -   `<LOCATION>` is the location of the resource group. (For example, eastus or westus.)
        
    -   `<SUBSCRIPTION_ID>` is the ID of the subscription you want to onboard.
        
    -   `<JSON_TEMPLATE>` is the JSON template file that you downloaded at the end of the onboarding wizard.
        
    
    The updated template is deployed.

### Outposts

An outpost enables you to have security scans performed on infrastructure in a cloud account owned by you.

An outpost is a dedicated set of infrastructure resources that extends the reach of Cortex Cloud into your environment. It serves as a secure, localized point for scanning assets across cloud providers and on-premises workloads.

By establishing a trusted relationship between Palo Alto Networks and your environment, the outpost allows for deep security analysis—such as identifying vulnerabilities or classifying sensitive data—while ensuring that your live workloads remain unaffected. This architecture helps you maintain strict data residency and compliance by performing scans locally within a demarcated area of your network.

**Important:**

Outpost scan is an alternative to the recommended standard cloud scan. Cloud scan is recommended because it is fully managed by Palo Alto Networks and incurs no compute costs for your organization. Outpost scan is an advanced deployment model reserved for specific data residency or architectural requirements.

#### What's Next?

-   Review outpost fundamentals
    
-   Plan your outpost
    
-   Create your outpost

#### Outpost fundamentals and planning

An outpost enables you to have security scans performed on infrastructure in a cloud account owned by you. Learn about outpost fundamentals and what to consider when planning your outpost.

This topic explains the basic fundamentals for planning and deploying outpost infrastructure.

**Important:**

While outposts provide maximum control over the scanning environment, cloud scan mode is the recommended default for most organizations.

##### When to choose outpost scan

Cloud scan offers lower operational overhead, faster onboarding, and Palo Alto Networks assumes the associated cloud compute costs.

Outpost scan mode should typically only be reserved for specific architectural requirements or strict data residency constraints.

If you determine you do need outpost scanning, consider the following differences between the scan modes, which might impact your decision.

| Cloud Scan (Recommended) | Outpost Scan |
| --- | --- |
| Configure a managed outpost when there is sufficient trust between you and Cortex Cloud. Cortex accesses your environment more extensively and with less mediation. | Choose to deploy and manage your own outpost if: If you operate in a high-regulated market with a healthy “mistrust” of vendors.; For compliance with certain regulations for which Cortex is not compliant “out of the box.” In these cases, you might prefer to keep your data within your own network boundary. |
| The cloud resources involved are charged to Palo Alto Networks instead of to you. | This mode requires additional cloud provider permissions and may incur additional cloud costs. |
| Cortex-managed outposts require zero management from you. | Outposts incur some additional maintenance overhead. This includes securing the outpost, managing the necessary IAM roles and permissions, upgrading versions, and adjusting cloud provider quotas to meet workload demands. Actively manage your capacity and quotas to meet the workload requirements. |
| For DSPM, your actual data is accessible to Palo Alto Networks—not just metadata. Rest assured, your data are deleted after scanners have completed. Zero trust security is used to secure your data in Palo Alto Networks-owned accounts. | For DSPM, only metadata is accessible to Palo Alto Networks—not your actual data. |
| DSPM on SaaS (such as for Snowflake and Office 365) is currently supported only for cloud scan. | DSPM on SaaS (such as for Snowflake and Office 365) is not supported for outpost scan. |

##### Outpost security concepts and component handling

This section presents outpost-related concepts and a high-level overview of how outposts perform scanning on your resources and data without putting them at risk. For a deeper understanding, contact your Palo Alto Networks representative.

| Concept | Description |
| --- | --- |
| Trust model | Cortex Cloud interacts with your environment via dedicated IAM roles within the outpost. This establishes a secure trust relationship that adheres to the principle of least privilege. |
| Data security and residency | Outposts utilize a regionally symmetric architecture, processing data locally within the same cloud region and provider where it resides. Only metadata is ever sent back to Cortex Cloud. |
| Scan operations | Scanning is performed by task-specific, ephemeral VMs built from hardened and continuously patched images. These instances are automatically terminated and all temporary resources are purged immediately after a scan completes. |
| Secure orchestration storage (such as buckets) | Scanner VMs operate in isolated private subnets without direct internet or Cortex Cloud access. They communicate exclusively through encrypted, cloud-native storage used for operational data and scan results—never raw customer data. |
| Temporary processing storage (such as artifact buckets) | For specific scans where direct data sharing is restricted, data is temporarily placed in encrypted regional storage for analysis. Cortex Cloud has no read permissions on this storage, and all data is deleted immediately after the job finishes. |
| Scanner isolation | Each scanner VM is purpose-built with a strictly defined set of permissions and network access tailored to its specific job. This ensures complete compartmentalization between different scan types. |
| Data encryption | Security is enforced through universal encryption at rest and in transit. Advanced egress filtering locks down external traffic to verified destinations, and secrets are managed via your own cloud-native secret management service. |

##### Outpost planning

Before creating outposts, we recommend you become familiar with how outposts work and then plan accordingly. For example, some points to consider include:

-   A dedicated account is required for the outpost account. Make sure the dedicated account is free from other resources.
    
-   Each cloud account (AWS account, Azure subscription, GCP project) can host only one outpost.
    
-   An individual outpost instance is strictly bound to a single Cortex Cloud tenant and cannot be used to scan resources belonging to a different tenant or organization.
    
-   Using an outpost requires additional cloud provider permissions and may incur additional cloud costs.
    
-   Familiarize yourself with the needed permissions and resources expected to be added to the outpost during creation.
    

For exact implementation details, contact your Palo Alto Networks representative.

##### About outpost creation

After planning, you can create and configure your outpost in the following ways:

-   Before onboarding your Cortex Cloud with the cloud service provider (CSP) onboarding wizard, create an outpost by navigating to Settings → Data Sources & Integrations → Outposts.
    
-   Alternatively, while onboarding your Cortex Cloud with the cloud service provider (CSP) onboarding wizard, the wizard prompts you to choose a scan mode: Cloud scan or Outpost scan. When choosing Outpost scan, you have the opportunity to create your outpost. To start the cloud service provider (CSP) onboarding wizard, navigate to Settings → Data Sources & Integrations → Add New.
    

**Note:**

Before you create your outpost, verify that your internet connection is active. An active internet connection is necessary for the notification to be sent to Cortex Cloud to create the new outpost.

For details, see Create an outpost.

##### What's next?

-   Create your outpost
    
-   View and manage existing outposts by navigating to Settings → Data Sources & Integrations → Outposts

#### Create an outpost

Create an outpost for security scanning performed on infrastructure in a cloud account owned by you.

This topic provides instructions for creating an outpost for different CSPs.

**Important:**

While outposts provide maximum control over the scanning environment, cloud scan mode is the recommended default for most organizations. For details, see When to choose outpost scan.

Creating an outpost comprises the following phases:

1.  Planning
    
2.  Running the outpost creation wizard in Cortex Cloud to generate an outpost authentication template for the relevant CSP. This template establishes trust with the CSP and grant the necessary permissions to  Cortex Cloud. Described below.
    
3.  Executing the template in the CSP to create the outpost, initially in pending status. Described below.
    
4.  Running the CSP onboarding wizard Cortex Cloud to generate an authentication template for the relevant CSP (AWS, GCP, Azure).
    
5.  Executing the authentication template in the CSP to onboard the CSP and ingest its data sources.
    

##### Run the outpost creation wizard to generate a template

Start the outpost creation wizard by navigating to Settings → Data Sources & Integrations → Outposts and clicking New Outpost.

**Note:**

Verify that your internet connection is active. An active internet connection is necessary for notifications to be sent to Cortex Cloud for creating the new outpost. If you are unable to establish an internet connection, contact customer support for a manual workaround.

Perform the steps according to your CSP.

AWS

1.  In Create AWS Outpost, select the type of AWS environment:
    
    -   **Commercial:** (Default) Standard cloud deployment typically used for private and public sector organizations that do not require isolated government-specific infrastructure.
        
    -   **Government:** AWS GovCloud environments for compatibility with FedRAMP-certified tenants.
        
    
2.  (Optional) Define tags and tag values to be added to any new resource created by Cortex in the cloud environment. Click Next.
    
3.  Click Download Terraform to download the Terraform template file.
    
    Execute the Terraform template in the CSP to create the outpost.
    

GCP

1.  In Create GCP Outpost, select the type of GCP environment:
    
    -   **Commercial:** (Default) Standard cloud deployment typically used for private and public sector organizations that do not require isolated government-specific infrastructure.
        
    -   **Government:** GCP Assured Workloads for compatibility with FedRAMP-certified tenants.
        
    
2.  Enter the project ID of the GCP project.
    
3.  (Optional) Define tags and tag values to be added to any new resource created by Cortex in the cloud environment. Click Next.
    
4.  Click Download Terraform to download the Terraform template file.
    
    Execute the Terraform template in the CSP to create the outpost.
    

Azure

**Note:**

When creating an outpost for a specific Azure subscription, the outpost account must be in the same Azure organization as the monitored subscriptions.

1.  In Create Azure Outpost, select the type of Microsoft Azure environment:
    
    -   **Commerical:** (Default) Standard cloud deployment typically used for private and public sector organizations that do not require isolated government-specific infrastructure.
        
    -   **Government:** Microsoft Azure Government environments for compatibility with FedRAMP-certified tenants.
        
    
2.  Enter the tenant ID of the Azure tenant in which you want to establish the outpost.
    
3.  (Optional) Define tags and tag values to be added to any new resource created by Cortex in the cloud environment. Click Next.
    
4.  Click Download Terraform to download the Terraform template file.
    
    Execute the Terraform template in the CSP to create the outpost.
    

##### Execute the template in the CSP to finalize the outpost

When you have downloaded the Terraform template file in the onboarding wizard, log in to the CSP and execute the template file.

Perform the steps according to your CSP.

AWS

**Prerequisite:**

Before you begin, ensure you have:

-   An AWS account
    
-   Permission to create a stack and its resources in AWS
    
-   Installed Terraform on your local machine. You can download Terraform from the official [Terraform website](https://www.terraform.io/downloads.html) and follow the installation instructions for your operating system.
    
-   Installed the AWS CLI tool and configured your profile with the `aws configure sso` wizard.
    

1.  Open your local terminal (Command prompt, PowerShell, or Terminal).
    
2.  Log in to your AWS account using the AWS CLI:
    
    aws sso login --profile `<my-profile>`
    
    Where `<my-profile>` is the profile you configured with the `aws configure sso` wizard.
    
3.  Create a directory on your local machine to store and run the Terraform code. If you are creating more than one outpost, you need a separate directory for each one:
    
    ```
    mkdir -p ~/terraform/aws-outpost-1
    ```
    
4.  Navigate to the directory you created and extract the Terraform files.
    
    ```
    cd ~/terraform/aws-outpost-1
    tar -xzvf <your_template>.tar.gz
    ```
    
5.  Initialize Terraform in your project directory:
    
    ```
    terraform init
    ```
    
6.  Apply your Terraform configuration using the downloaded parameter file. When prompted, enter the subscription ID:
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
7.  When prompted, review the actions Terraform will perform and approve them by entering **`yes`**.
    
    The Terraform template is deployed, and your outpost is created. To view all outposts and their details, navigate to Settings → Data Data Sources & Integrations → Outposts.
    

GCP

**Danger:**

Before you begin, ensure you have:

-   A GCP account
    
-   Permission to create the required resources in Google Cloud Deployment Manager
    
-   Installed Terraform on your local machine. You can download Terraform from the official [Terraform website](https://www.terraform.io/downloads.html) and follow the installation instructions for your operating system.
    
-   Installed the GCP gcloud CLI tool
    

1.  Open your local terminal (Command Prompt, PowerShell, or Terminal).
    
2.  Log in to your GCP account using the gcloud CLI:
    
    ```
    gcloud auth login
    ```
    
3.  Create a directory on your local machine to store and run the Terraform code. If you are creating more than one outpost, you need a separate directory for each one:
    
    ```
    mkdir -p ~/terraform/gcp-outpost-1
    ```
    
4.  Navigate to the directory you created and extract the Terraform files.
    
    ```
    cd ~/terraform/gcp-outpost-1
    tar -xzvf <your_template>.tar.gz
    ```
    
5.  Initialize Terraform in your project directory:
    
    ```
    terraform init
    ```
    
6.  Apply your Terraform configuration using the downloaded parameter file. When prompted, enter the project ID:
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
7.  When prompted, review the actions Terraform will perform and approve them by entering **`yes`**.
    
    The Terraform template is deployed, and your outpost is created. To view all outposts and their details, navigate to Settings → Data Sources & Integrations → Outposts.
    

Azure

**Danger:**

Before you begin, ensure you have:

-   An active Azure subscription.
    
-   Installed the Azure CLI tool.
    
-   Permission to deploy a custom template and create its resources in Microsoft Azure ("Owner" or "Contributor" on the designated outpost subscription scope, and Active Directory "Cloud Application Administrator" or "Application Administrator" privileged roles).
    
-   Installed Terraform 1.9.4 or above on your local machine. You can download Terraform from the official [Terraform website](https://www.terraform.io/downloads.html) and follow the installation instructions for your operating system.
    
-   A static egress IP assigned to the machine running this Terraform. This is used to configure the Azure Storage IP whitelist (Recommended). Without this, future runs of this Terraform may fail on Azure storage configurations.
    

1.  Open your local terminal (Command Prompt, PowerShell, or Terminal).
    
2.  Log in to your Azure account using the Azure CLI:
    
    ```
    az login
    ```
    
3.  If prompted, select the subscription_id of the designated subscription, or run:
    
    az account set --subscription `<subscription_id>`
    
    Where `<subscription_id>` is the subscription ID of the designated subscription.
    
4.  Create a directory on your local machine to store and run the Terraform code. If you are creating more than one outpost, you need a separate directory for each one:
    
    ```
    mkdir -p ~/terraform/azure-outpost-1
    ```
    
5.  Navigate to the directory you created and extract the Terraform files.
    
    ```
    cd ~/terraform/azure-outpost-1
    tar -xzvf <your_template>.tar.gz
    ```
    
6.  Initialize Terraform in your project directory:
    
    ```
    terraform init
    ```
    
7.  Apply your Terraform configuration using the downloaded parameter file. When prompted, enter the subscription ID:
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
8.  When prompted for `var.storaage_account_ip_whitelist`, you can leave it empty to enable access from any public IP to the storage accounts. We recommend you to limit access to selected IPs. To limit access, enter a comma-separated list of public IP addresses, including your local machine's egress IP (to enable the completion of the Terraform run). For example: `8.8.8.8, 8.8.4.4`
    
9.  Review the actions Terraform will perform and approve them by entering **`yes`**.
    
10.  It is important to create a backup of the Terraform state file using one of the following methods:
     
     Back up the `terraform.tfstate` and `terraform.tfstate.backup` files or use Terraform backend to save the state.
     
     -   Create copies of the `terraform.tfstate` and `terraform.tfstate.backup` files. These can then be moved to the working folder to allow Terraform to upgrade or destroy the created resources as necessary.
         
     -   Ensure you're using a backend block in your Terraform configuration. For more information, see [Backend block configuration overview](https://developer.hashicorp.com/terraform/language/backend).
         
     
     The Terraform template is deployed, and your outpost is created. To view all outposts and their details, navigate to Settings → Data Sources & Integrations → Outposts.
     

##### What's next?

After you have executed the template in your CSP:

-   The necessary permissions are granted and a notification is sent to Cortex Cloud with the execution details.
    
-   A new outpost is created in pending status and can be viewed in the Outpost page at Settings → Data Sources & Integrations → Outposts.
    

Continue the CSP onboarding by running and executing the CSP onboarding wizard to generate an authentication template for the relevant CSP (AWS, GCP, Azure).

Troubleshooting

If you have successfully executed the template in your cloud service provider and no new outpost has been created, verify that your internet connection is active. An active internet connection is necessary for the notification to be sent to Cortex Cloud to create the new outpost. If you are unable to establish an internet connection, contact customer support for a manual workaround.

### Introduction to Terraform for Cloud service provider (CSP) onboarding

Introductory concepts for working with Terraform to facilitate cloud onboarding.

Terraform is an open-source Infrastructure as Code (IaC) tool that allows you to define and provision cloud infrastructure using declarative configuration files. Instead of manually creating resources in a cloud console, you use Terraform templates to automate the setup required for Cortex Cloud.

#### Key Terraform concepts

These concepts explain the underlying logic of how Terraform interacts with your cloud environment.

##### Infrastructure as Code (IaC)

[Infrastructure as Code](https://developer.hashicorp.com/terraform/intro) allows you to manage your network and security settings through declarative configuration (text) files. Terraform reads these files and compares them to your actual cloud environment to determine which resources need to be created, updated, or deleted to match the template.

##### The Terraform state file (.tfstate)

The `.tfstate` [state file](https://developer.hashicorp.com/terraform/language/state) is a local record that maps your template configuration to the real resources in your cloud. The state file acts as a database that maps your configuration to real-world resources.

Each time you execute a Terraform template (such as by using plan or apply commands), Terraform compares the state file with the actual cloud environment to ensure everything is in sync. If there are differences, Terraform attempts to sync between the template and the cloud. Any resources that differ from the template are synced to match the template definition.

It is critical that you follow the following rules:

-   Never delete the `.tfstate` file. If this file is lost, Terraform loses its "memory" of what it created, making it difficult to update or offboard (delete) those resources later.
    
-   Always run Terraform commands from the original folder where you initialized the template to ensure access to the `.tfstate` file.
    
-   If using a cloud-based terminal (like Azure Cloud Shell), ensure your files are saved to a persistent directory so the `.tfstate` file is not lost when the session ends.
    

#### Authentication and CLI prerequisites

Terraform does not have its own login; it uses the credentials for each cloud service provider. Before executing Terraform templates provided by Cortex Cloud, configure and authenticate using your cloud provider's Command Line Interface (CLI):

-   **AWS**: Configure the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
    
-   **Azure**: Log in to the [Azure CLI (az)](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).
    
-   **GCP**: Initialize the [Google Cloud CLI (gcloud)](https://cloud.google.com/sdk/docs/install).
    
-   **OCI**: Configure the [OCI CLI](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/cliconcepts.htm). We recommend you use [token based authentication](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/clitoken.htm).
    

#### Core Terraform commands

While Terraform has many features, the Cortex Cloud onboarding process typically only uses the following core commands.

**Important:**

Always run these commands in the same folder where the original `.tf` files and `.terraform` folder live—this is where the [state](https://docs.google.com/document/d/1BmX1BEqveiHrmv-O4BIS76EyOD1BYpYfKGUbHSKYAMo/edit?tab=t.0#heading=h.jyu9w6io0myj) is stored.

##### The `terraform init` command

The `terraform init` command prepares Terraform for the actual actions it will perform, such as downloading any required modules and cloud provider plugins.

Command: `terraform init`

Run this command when:

-   It is the first time the template is going to be executed.
    
-   There are changes to the template that necessitate updates to modules that have changed.
    

##### The `terraform apply` command

The `terraform apply` command previews the changes and executes the template to create or update the cloud resources.

Command: `terraform apply --var-file=template_params.tfvars [-auto-approve]`

When running the command, you must pass the template parameter file as an argument. 

This command requests confirmation before making any changes. Type **yes** for the changes to be made. You can bypass the confirmation by passing `-auto-approve` to the apply command.

The first time this command is run, this command also creates the `.tfstate` state file. This file stores the state of the cloud resources at the time the command is executed.

**Important:**

This `.tfstate` state file is critical because it is needed by the `terraform destroy` command to clean up created resources. It is critical that you never delete this file.

##### The `terraform destroy` command

The `terraform destroy` command removes all resources created by the `terraform apply` command. This is the standard way to offboard the CSP.

Command: `terraform destroy --var-file=template_params.tfvars [-auto-approve]`

Run this command: 

-   To off-board.
    
-   To re-onboard. Before re-onboarding, clean up existing resources before re-onboarding.
    

When running the command, you must pass the template parameter file as an argument. 

This command requests confirmation before making any changes. Type **yes** for the changes to be made. You can bypass the confirmation by passing `-auto-approve` to the apply command.

#### Standard Terraform deployment workflows

The lifecycle of a Cortex Cloud resource involves the following primary workflows: 

-   The initial provisioning of resources.
    
-   The subsequent updating of those resources as requirements change, or as Cortex releases new updates and features.
    

##### Initial template onboarding

The onboarding process involves the initial translation of your cloud configuration into live cloud resources.

-   **Preparation**: Download the necessary provider plugins, and then download and extract the Terraform template configuration files, such as `.tf` and `.tfvars`, into the working directory.
    
-   **Initialization**: Prepare the local environment for a specific template by executing this command from inside the template folder:
    
    `terraform init`
    
-   **Application**: Apply the configuration to the cloud provider using the specific variable file (such as `template_params.tfvars`) to define your unique environment settings. Execute this command from inside the template folder:
    
    `terraform apply --var-file=template_params.tfvars`
    

##### Upgrades

As Cortex releases new features or updates, or you have changes to your own cloud infrastructure, you must update the existing template. This workflow involves merging new configuration files into your existing local directory while strictly maintaining the original state file.

This "upgrade" scenario relies on the state file to identify what has changed. By reconfiguring the initialization and applying the new files, Terraform identifies the differences and modifies the existing resources rather than recreating them from scratch.

-   **Reconfiguration**: Updates the existing working template folder to account for changes in the underlying template structure, such as by copying new files into the folder. You can replace existing files but do not delete any files. 
    
-   **Synchronization**: Updates the live cloud resources to align with the new template definition while preserving your existing variables. Execute the following commands:
    
    `terraform init -reconfigure`
    
    `terraform apply --var-file=template_params.tfvars`
    

#### Working in Cloud Shell environments

If you are onboarding using a browser-based terminal (like Azure Cloud Shell or GCP Cloud Shell) instead of locally, make sure to adhere to the following:

-   **Keep the original folder**: You must always run commands from the original folder where you initialized Terraform.
    
-   **Persistence**: Ensure your session is saved to a persistent home folder (such as `~/`). If the session ends and the folder is deleted, your `.tfstate` file will be lost, which prevents easy cleanup or resource management.
    

| CSP | Folder for Persistence |
| --- | --- |
| Azure | See [Persist files in Azure Cloud Shell](https://learn.microsoft.com/en-us/azure/cloud-shell/persisting-shell-storage) |
| AWS | `~/` |
| GCP | `~/` |
| OCI | `~/` |

### Container Registry Scanning

#### Overview of container registry scanning
Container Registry Scanning identifies vulnerabilities, malware, and secrets, providing comprehensive protection for containerized applications across various cloud environments without manual intervention.

Cortex Cloud supports scanning of registries through the following methods:

-   **Managed Cloud Registries**: The container registry scanner automatically detects and scans container registries and images within your onboarded cloud accounts. Supported registries include Amazon Elastic Container Registry (ECR), Azure Container Registry (ACR), Google Artifact Registry (GAR), and Oracle Cloud Infrastructure (OCI) Artifact Registry.
    
-   **Third-Party Integrations**: The container registry scanner supports agentless scanning of container images by direct integration with various third-party registries, independent of the cloud account onboarding process. These integrations include a streamlined, user-friendly connector configuration experience for the following:
    
    -   Docker Hub
        
    -   Docker V2 compliant registriesConnect Docker V2 compliant container registry
        
    -   GitLab Container Registry
        
    -   Harbor Registry
        
    -   JFrog Container RegistryConnect JFrog container registry
        
    -   Sonatype Nexus Repository Manager
        
    

After you onboard your container registries, Runtime Security ensures that all containers and images are scanned at regular intervals and that you are notified about any deviation from your security policies and best practices.

##### Registry Components
To understand how container registry scanning works, it's essential to understand its core components:

-   **Container registry:** A container registry is a service for publishing, maintaining, and securely distributing container images, providing a centralized hub for managing and accessing containerized application components across your organization. This scanning helps to enable proactive identification and remediation of security risks before deployment which means you will be using only trusted and compliant images in production environments.
    
-   **Container image repository:** Within a container registry, container images are organized into multiple repositories to improve management, access control, collaboration, and security isolation. Each repository should ideally contain images related to a specific application, service, or project, allowing for granular permissioning and security policies. Images within a repository often share a common base image or purpose, making it easier to apply consistent security controls across related components.
    
-   **Image Tags:** Image tags are essential for identifying and managing container image versions within a repository, enabling the selection and deployment of appropriate builds. From a security perspective, tags facilitate tracking vulnerable images, deploying patched versions, and maintaining image provenance for auditing. There are two common formats for referencing image tags:
    
    -   image:tag – A human-readable label that can be reassigned to different versions. For example, myapp:latest or myapp:v1.0.0.
        
    -   image@sha – A cryptographic hash that provides an immutable reference to a specific image version. For example, myapp@sha256:abc123.
        
    

While human-readable tags like myapp:latest (reassignable) and myapp:v1.0.0 are common, using immutable tags such as myapp@sha256:abc123 provides a cryptographically secure and verifiable reference, crucial for ensuring the integrity and trustworthiness of deployed images.

-   **Image Digest:** A cryptographic digest (SHA-256 hash) uniquely identifies a container image's content, providing a strong guarantee of immutability. Unlike user-defined image tags, which can be reassigned, using the digest as a tag ensures that even if an image is renamed or retagged, its content remains verifiably identical, making it a critical element for security auditing and ensuring the integrity of deployed applications. Relying on image digests helps prevent potential supply chain attacks where malicious actors might attempt to replace images with compromised versions.

##### How Container Registry Scanning Works
The process of container registry scanning consists of three key phases: discovery, scanning, and evaluation.

1.  **Discovery**: The connector discovers all registries, repositories, and tags within the account.
    
2.  **Scanning**: The connector extracts software bills of materials (SBOMs), malware indicators, and secrets from each image.
    
3.  **Evaluation**: Scan results are evaluated for vulnerabilities, malware, and secrets, and asset findings are created accordingly.

#### Configure registry scanning for cloud accounts
Configuring registry scanning ensures that only verified and compliant images are deployed across your cloud environments. You can configure container registry scanning during the onboarding process for managed registries such as Amazon Elastic Container Registry (ECR), Azure Container Registry (ACR), Google Artifact Registry (GAR), and Oracle Cloud Infrastructure (OCI) Artifact Registry.

If an account is already onboarded, you can modify its configuration to enable registry scanning as an Additional Security Capability to scan images for vulnerabilities, malware, and secrets.

**Prerequisite:**

Ensure that you have performed the all steps till Additional Security Capabilities as listed in the onboarding wizard for the required CSP:

-   Onboard Amazon Web ServicesOnboard Amazon Web Services
    
-   Onboard Google Cloud PlatformOnboard Google Cloud Platform
    
-   Onboard Microsoft AzureOnboard Microsoft Azure
    
-   Onboard Oracle Cloud InfrastructureOnboard Oracle Cloud Infrastructure
    

To configure registry scanning, do the following:

1.  Under Additional Security Capabilities, select Registry Scanning, then click Edit Preferences.
    
    
    
2.  In Initial Scan Configuration, set your scanning process to focus on recently added or modified container images and exclude older ones that do not align with your current scanning objectives. This setting helps avoid unnecessary scans. Choose one of the following options:
    
    -   All: Scans all container images, including all versions (tags), in all discovered repositories.
        
    -   Latest Tags: Scans only images tagged 'latest' in all discovered repositories.
        
    -   Days Modified: Scans container images created or modified in the last few days. You can select a range of up to **90** days for the scan.
        
    
3.  Select Save.
    
    After you configure your container registries, the system automatically starts a new scan. The connection process can take up to 15 minutes. To check the status of the data connector and view the registry scan results, go to the Cloud Instances page and select the relevant Instance Name from the list.
    
4.  **Next Steps**.
    
    -   After the scan completes, you can view the scanned images in the Container Image page. For more details, see Container Image assets.
        
    -   You can also modify your cloud instances to manage them effectively. For more details, see Managing Cloud Instances.

#### Modify the container registry scanning scope
Using the Modify Scanning Scope option, you can define conditions to automatically exclude selected scopes from scanning. These conditions can be based on the registry, repository, or tag. After you set the scope, the exclusion conditions are automatically applied to newly discovered images in the account.

To modify the scanning scope, do the following:

1.  Navigate to Settings → Data Sources.
    
2.  In the Cloud Provider section, locate the provider where your assets are stored and click View Details.
    
3.  On the Cloud Instances page, click the instance name for which you want to modify the scope.
    
4.  Under the Accounts section, select the account, right-click, and choose Edit.
    
5.  Under the Registry Scanning Scope, enable Modify Scanning Scope.
    
6.  From the list of images, select the image you want to modify.
    
7.  Alternatively, you can also filter for a specific image by clicking the Filter icon and selecting Registry, Repository ,or Tags option and then adding the desired value to refine your search.
    
    The search results are applied automatically, even if you do not select Save.
    
8.  Click Save to confirm your modifications.
    

This ensures that the specified scanning scope is customized based on your needs.

#### Scan re-evaluation process
After the initial scan has been completed, the scan re-evaluation process ensures that container images remain secure over time without requiring a full re-scan.

Instead of manually triggering new scans, the scan re-evaluation process automatically reassesses existing scan results every **24 hours** using the latest threat intelligence feeds. This approach reduces the need for resource-intensive re-scans, while maintaining up-to-date security assessments.

By continuously monitoring container images for emerging threats, you can proactively mitigate risks and ensure compliance with security best practices.

#### Connect Docker Hub registry
The Docker Hub registry connector allows you to connect your public or private Docker Hub account to scan and secure container images against vulnerabilities, malware, and exposed secrets.

How to connect Docker Hub registry

Follow the wizard to connect your Docker Hub registry with Cortex Cloud.

1.  Navigate to Settings → Data Sources & Integrations and click \+ Add New.
    
2.  On the Add Data Sources or Integrations page, search for Docker Hub, then hover over it and click Add.
    
3.  The Instance Name is automatically populated. You can change it to a more meaningful name.
    
4.  Choose the Scan Mode, and then follow the steps for that mode to configure the connection.
    
    Cloud Scan
    
    Security scanning is performed in the Cortex Cloud environment when you select this mode.
    
    1.  Select the appropriate Cloud Provider and Region for the Cortex Cloud environment to use for registry scanning.
        
        As a best practice, choose the region closest to your registry deployment to achieve the best scanning throughput and potentially reduce cloud costs.
        
    2.  (Optional) Enable Allow access by IPs to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so the scanner can access the registry during the scanning process.
        
    3.  Choose the relevant Repository Access for scanning:
        
        Authenticated access
        
        Discover and scan private and public repositories within the given account.
        
        1.  Under Authentication Method, enter your private Docker Hub account credentials (Username and Password) for authentication.
            
        
        Public access only
        
        Discover and scan images within a specific public repository.
        
        1.  Enter your public Docker Hub Repository Name.
            
            To specify an official Docker Hub repository, enter `library/`, followed by the short string used to designate the repo. For example, to scan the images in the official Alpine Linux repository, enter `library/alpine`.
            
        2.  Under Authentication Method, enter your public Docker Hub account user credentials (Username and Password) for authentication.
            
        
    4.  Select Next.
        
    
    Scan with Outpost
    
    Security scanning is performed on infrastructure deployed to a cloud account that you own. This mode requires additional cloud provider permissions and may incur extra costs.
    
    **Prerequisite:**
    
    Ensure an Outpost is connected to your tenant.
    
    1.  Choose a Cloud Provider to initialize registry scanning.
        
        **Note:**
        
        If you choose Azure as the Cloud Provider, you must also select the Tenant Id. The Tenant Id is required to approve Cortex as an enterprise application in your Azure tenant.
        
    2.  Choose Outpost account to use for this instance. If no Outposts are shown, you can Create a new one. For more details, see Outposts.
        
        **Note:**
        
        If you choose Azure as the cloud provider, only Outposts associated with the selected tenant ID are displayed.
        
    3.  Select the Region where the registry is hosted.
        
    4.  (Optional) Enable Allow access by IPs if you want to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so that the scanner can access the registry during the scanning process.
        
    5.  Choose the relevant Repository Access for scanning:
        
        Authenticated access
        
        Discover and scan private and public repositories within the given account.
        
        1.  Under Authentication Method, enter your private Docker Hub account credentials (Username and Password) for authentication.
            
        
        Public access only
        
        Discover and scan images within a specific public repository.
        
        1.  Enter your public Docker Hub Repository Name.
            
            To specify an official Docker Hub repository, enter `library/`, followed by the short string used to designate the repo. For example, to scan the images in the official Alpine Linux repository, enter `library/alpine`.
            
        2.  Under Authentication Method, enter your public Docker Hub account user credentials (Username and Password) for authentication.
            
        
    6.  Select Next.
        
    
    Scan with Broker VM
    
    Security scanning in private networks is done using broker VM infrastructure when you select this mode.
    
    **Prerequisites:**
    
    -   Set up and configure Broker VM
        
    -   Configure High Availability Cluster
        
    
    1.  Choose a Scan with Broker VM mode to initiate registry scanning. You can select either a standalone Broker VM or a High Availability (HA) Cluster.
        
    2.  Select Applicable Broker VMs.
        
        Choose the appropriate Broker VM or Cluster from the list configured in your tenant.
        
        **Note:**
        
        -   The list of Broker VMs displays only VMs that support registry scanning.
            
        -   The list of high-availability Clusters displays only clusters that contain at least one VM supporting registry scanning.
            
        -   The registry scanning status for each VM appears in brackets if it was previously activated for that specific VM.
            
        
        If the list does not display any Broker VMs or Clusters, Add New Broker VM or Add New Cluster. For more details, see Set up and configure Broker VM.
        
    3.  Choose the relevant Repository Access for scanning:
        
        Authenticated access
        
        Discover and scan private and public repositories within the given account.
        
        1.  Under Authentication Method, enter your private Docker Hub account credentials (Username and Password) for authentication.
            
        
        Public access only
        
        Discover and scan images within a specific public repository.
        
        1.  Enter your public Docker Hub Repository Name.
            
            To specify an official Docker Hub repository, enter `library/`, followed by the short string used to designate the repo. For example, to scan the images in the official Alpine Linux repository, enter `library/alpine`.
            
        2.  Under the Authentication Method, enter your public Docker Hub account user credentials (Username and Password) for authentication.
            
        
    4.  Select Next.
        
    
5.  In Initial Scan Configuration, set your scanning process to focus on recently added or modified container images and exclude older ones that do not align with your current scanning objectives. This setting helps avoid unnecessary scans. Choose one of the following options:
    
    -   All: Scans all container images, including all versions (tags), in all discovered repositories.
        
    -   Latest Tag: Scans only images tagged 'latest' in all discovered repositories.
        
    -   Days Modified: Scans container images created or modified in the last few days. You can select a range of up to **90** days for the scan.
        
    
6.  Select Save.
    
    When the Docker Hub data source is saved, a new data connector is created, and the initial discovery scan begins. The connection process may take up to 15 minutes.
    
7.  To check the connector status and scan results, follow these steps:
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  Find the Docker Hub instance from the list of 3rd Party Data Sources connectors, or use Search.
        
    3.  In the Docker Hub instance row, select View Details. The Docker Hub Instances page appears.
        
    4.  On the Docker Hub Instances page, you can filter results by any heading and value.
        
    5.  Select an Instance Name to open the details pane. The details pane contains the following granular information:
        
        | Instance Details | Description |
        | --- | --- |
        | Status | Shows the status of the connector: Connected, Error, Warning, Disabled, or Pending. |
        | Applet Status on Broker VM | Shows the status of the Registry Scanner applet on the Broker VM page. This status is visible only when the Scan with Broker VM mode is selected. |
        | Repositories | Shows the number of scanned repositories in the registry. |
        | Scan Mode | Shows the selected scan mode for the data connector, such as Cloud Scan, Scan with Outpost, or Scan with Broker VM. |
        | Security Capabilities | Shows a breakdown of the security capabilities enabled on the instance and their individual statuses. For example, select Registry Scanning when it shows a warning or error status to see the open errors and issues that contributed to the status. |
        
8.  **Next Steps**
    
    After the scan is complete, you can view the scanned images on the Container Images Inventory page. For more details, see Container Image assets.
    
    If you have selected the Scan with Broker VM option, then a Registry Scanner applet is created on the selected Broker VM or Cluster. For details, see Verify Registry Scanner connection.

##### Manage a Docker Hub connector
After you add a Docker Hub connector, you can modify the connector settings and configure the scanning scope to control which images are scanned in the connected registry.

To manage the connector, follow these steps:

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find the Docker Hub data source from the list of data sources, or use the filter to search.
    
3.  Select the Docker Hub row. A pane opens with a list of integration instances and their details.
    
    You can create a new instance by selecting Add Instance and following the onboarding wizard to define the settings.
    
4.  Right click an instance to perform actions on it as follows:
    
    | Action | Instructions |
    | --- | --- |
    | Edit | Edit the Docker integration instance.  \*\*Note:\*\* If you selected Scan with Broker VM mode, you can't change to a different scan mode (such as Cloud Discovery or Scan with Outpost) when you edit the instance.; When editing an instance configured for Scan with Broker VM, you must re-enter your authentication credentials, including Username, Password, and CA certificate. |
    | Exclude/Include images | Define conditions to automatically exclude or include specific images while scanning. Conditions can be based on Repository or Tags. These conditions apply automatically to newly discovered images in the account. |
    | Disable | Stops image scanning for the connector without deleting it. |
    | Delete | Removes the connector. |

#### Connect Docker V2 compliant container registry
A Docker V2-compliant registry is a registry service that complies with the specifications and requirements outlined in the Docker Registry HTTP API V2. This API defines the protocol for interacting with a Docker registry, a repository where Docker images are stored and from which they can be pulled or pushed.

To scan public and private repositories on Docker Hub, use the Docker Hub registry connector.

How to connect Docker V2

Follow the wizard to use the Docker V2 connector in Cortex Cloud to scan and secure container images from any container registry that supports the Docker V2 protocol, ensuring comprehensive security.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Add Data Sources or Integrations page, click \+ Add New, search for Docker V2, then hover over it and click Add.
    
3.  The Instance Name is automatically populated. You can change it to a more meaningful name.
    
4.  Choose the Scan Mode, and then follow the steps for that mode to configure the connection.
    
    Cloud Scan
    
    Security scanning is performed in the Cortex Cloud environment when you select this mode.
    
    1.  Select the appropriate Cloud Provider and Region for the Cortex environment to use for registry scanning.
        
        As a best practice, choose the region closest to your registry deployment to achieve the best scanning throughput and potentially reduce cloud costs.
        
    2.  (Optional) Enable Allow access by IP’s to specify a static IP address for the scanner to use. Ensure the static IP is allowed through your firewall so the scanner can access the registry during the scanning process.
        
    3.  Enter the Registry URL. This must match the URL you use with the **docker login** command.
        
        Equivalent URL: `https://docker.io/`
        
        If you are using a CA certificate for authentication, enter the server IP address instead of the Registry URL.
        
    4.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
        Use your **Docker ID** as the username (for example, john0907) and **not** your email address.
        
    5.  (Optional) Expand Show Advanced Settings, and then enter the CA certificate in PEM format for Cortex to validate the Docker registry v2.
        
        Ensure that the Custom CA certificate that you use is not revoked by the issuing authority.
        
    6.  Select Next.
        
    
    Scan with Outpost
    
    Security scanning is performed on infrastructure deployed to a cloud account that you own. This mode requires additional cloud provider permissions and may incur extra costs.
    
    **Prerequisite:**
    
    Ensure an Outpost is connected to your tenant. Outposts
    
    1.  Choose a Cloud Provider to initialize registry scanning.
        
        **Note:**
        
        If you choose Azure as the Cloud Provider, you must also select the Tenant Id. The Tenant Id is required to approve Cortex as an enterprise application in your Azure tenant.
        
    2.  Choose Outpost account to use for this instance. If no Outposts are shown, you can Create a new one. For more details, see Outposts.
        
        **Note:**
        
        If you choose Azure as the cloud provider, only Outposts associated with the selected tenant ID are displayed.
        
    3.  Select the Region where the registry is hosted.
        
    4.  (Optional) Enable Allow access by IP’s if you want to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so that the scanner can access the registry during the scanning process.
        
    5.  Enter the Registry URL. This must match the URL you use with the **docker login** command.
        
        Equivalent URL: `https://docker.io/`
        
        If you are using a CA certificate for authentication, enter the server IP address instead of the Registry URL.
        
    6.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
        Use your **Docker ID** as the username (for example, john0907) and **not** your email address.
        
    7.  (Optional) Expand Show advanced settings, and then enter the CA certificate in PEM format for Cortex to validate the Docker registry v2.
        
        Ensure that the Custom CA certificate that you use is not revoked by the issuing authority.
        
    8.  Select Next.
        
    
    Scan with Broker VM
    
    Security scanning in private networks is performed using broker VM infrastructure when you select this mode.
    
    **Prerequisite:**
    
    Ensure one of the following is configured:
    
    -   Set up and configure Broker VM.
        
    -   Configure High Availability Cluster.
        
    
    1.  Choose a Scan with Broker VM mode to initiate registry scanning. You can select either a standalone Broker VM or a High Availability (HA) Cluster.
        
    2.  Select Applicable Broker VMs.
        
        Choose the appropriate Broker VM or Cluster from the list configured in your tenant.
        
        **Note:**
        
        -   The list of Broker VMs displays only VMs that support registry scanning.
            
        -   The list of high-availability Clusters displays only clusters that contain at least one VM supporting registry scanning.
            
        -   The registry scanning status for each VM appears in brackets if it was previously activated for that specific VM.
            
        
        If the list does not display any Broker VMs or clusters, Add New Broker VM or Add New Cluster. For more details, see Set up and configure Broker VM.
        
    3.  Enter the Registry URL. This must match the URL you use with the **docker login** command.
        
        Equivalent URL: `https://docker.io/`
        
        If you are using a CA certificate for authentication, enter the server IP address instead of the Registry URL.
        
    4.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
        Use your **Docker ID** as the username (for example, john0907) and **not** your email address.
        
    5.  (Optional) Expand Show advanced settings, and then enter the CA certificate in PEM format for Cortex to validate the Docker registry v2.
        
        Ensure that the Custom CA certificate that you use is not revoked by the issuing authority.
        
    6.  Select Next.
        
    
5.  In the Initial Scan Configuration, set your scanning process to focus on recently added or modified container images and exclude older ones that do not align with your current scanning objectives. This setting helps avoid unnecessary scans. Choose one of the following options:
    
    -   All: Scans all container images, including all versions (tags), in all discovered repositories.
        
    -   Latest Tag: Scans only images tagged **'latest'** in all discovered repositories.
        
    -   Days Modified: Scans container images that have been created in the last few days. You can select a range of up to **90** days for the scan.
        
    
6.  Select Save.
    
    When the Docker V2 data source is saved successfully, a new data connector is created, and the initial discovery scan begins. The connection process can take up to 15 minutes.
    
7.  To check the connector status and scan results, follow these steps:
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  Find the Docker V2 integration from the list of data sources, or filter for it.
        
    3.  Select the Docker V2 instance row. A pane opens with a list of integration instances and their details showing the following information:
        
        | Instance Details | Description |
        | --- | --- |
        | Status | Shows the status of the connector: Connected, Error, Warning, Disabled, or Pending. |
        | Applet Status on Broker VM | Shows the status of the Registry Scanner applet on the Broker VM page. This status is visible only when the Scan with Broker VM mode is selected. |
        | Repositories | Shows the number of scanned repositories in the registry. |
        | Scan Mode | Shows the selected scan mode for the data connector, such as Cloud Scan, Scan with Outpost, or Scan with Broker VM. |
        | Security Capabilities | Shows a breakdown of the security capabilities enabled on the instance and their individual statuses. For example, select Registry Scanning when it shows a warning or error status to see the open errors and issues that contributed to the status. |
        
8.  Next Steps
    
    After the scan is complete, you can view the scanned images on the Container Images Inventory page. For more details, see Container Images assets.
    
    If you have selected the Scan with Broker VM option, then a Registry Scanner applet is created on the selected Broker VM or Cluster. For details, see Verify Registry Scanner connection.

##### Manage a Docker V2 connector
After you add a Docker V2 connector, you can modify the connector settings and configure the scanning scope to control which images are scanned in the connected registry.

To manage the connector, follow these steps:

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find the Docker V2 data source from the list of data sources, or filter to search.
    
3.  Select the Docker V2 row. A pane opens with a list of integration instances and their details.
    
    You can create a new instance by selecting Add Instance and following the onboarding wizard to define the settings.Connect Docker V2 compliant container registry
    
4.  Right click an instance to perform actions on it as follows:
    
    | Action | Instructions |
    | --- | --- |
    | Edit | Edit the Docker V2 instance. \*\*Note:\*\* If you selected Scan with Broker VM mode, you can't change to a different scan mode (such as Cloud Discovery or Scan with Outpost) when you edit the instance.; When editing an instance configured for Scan with Broker VM, you must re-enter your authentication credentials, including Username, Password, and CA certificate. |
    | Exclude/Include images | Define conditions to automatically exclude or include specific images while scanning. Conditions can be based on Repository or Tags. These conditions apply automatically to newly discovered images in the account. |
    | Delete | Removes the connector. |
    | Disable | Stops image scanning for the connector without deleting it. |

#### Connect GitLab container registry
Configure Cortex Cloud to scan your GitLab Container Registry without using administrator credentials. Use a GitLab Personal Access Token (PAT) to authenticate Cortex to access the GitLab Container Registry. This allows Cortex to list all container registries or images, and secure them from vulnerabilities, malware, and secrets.

How to connect GitLab registry

Follow the wizard to connect the GitLab Container Registry connector in Cortex Cloud.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Add Data Sources or Integrations page, click \+ Add New, search for GitLab Container Registry, then hover over it and click Add.
    
3.  The Instance Name is automatically populated. You can change it to a more meaningful name.
    
4.  Choose the Scan Mode, and then follow the steps provided for that mode to configure the connection.
    
    Cloud Scan
    
    Security scanning is done in the Cortex Cloud environment when you select this mode.
    
    1.  Select the appropriate Cloud Provider and Region for the Cortex environment to use for registry scanning.
        
        As a best practice, choose the region closest to your registry deployment to achieve the best scanning throughput and potentially reduce cloud costs.
        
    2.  (Optional) Enable Allow access by IPs to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so the scanner can access the registry during the scanning process.
        
    3.  Choose the relevant Account Type for Gitlab deployments:
        
        Gitlab Cloud (Saas)
        
        1.  (Optional) Enter the Group Id.
            
            You can enter a single group ID or a list of group IDs separated by a comma. The group ID is used to locate all the registries within a specific group.
            
        2.  (Optional) Enter the Project Id.
            
            You can enter a Gitlab Project ID or a list of project IDs separated by a comma. The project ID is used to locate all the registries located within a specific project.
            
            **Note:**
            
            When both the group ID and project ID are provided, the system retrieves container images from all projects within the specified group as well as from the specified project.
            
            If neither the group ID nor the project ID is provided, the system retrieves container images from all registries (across all groups and projects) accessible to the authenticated user or token in GitLab.
            
        3.  Under Authentication Method, enter your Gitlab Access Token.
            
        
        Gitlab Self-Hosted
        
        1.  Enter the Registry URL.
            
            If you are using a CA certificate, enter the server IP address instead of the registry url.
            
        2.  (Optional) Enter the Group id.
            
            You can enter a single group ID or a list of group IDs separated by a comma. The group ID is used to locate all the registries within a specific group.
            
        3.  (Optional) Enter the Project Id.
            
            You can enter a Gitlab Project ID or a list of project IDs separated by a comma. The project ID is used to locate all the registries located within a specific project.
            
            **Note:**
            
            When both the group ID and project ID are provided, the system retrieves container images from all projects within the specified group as well as from the specified project.
            
            If neither the group ID nor the project ID is provided, the system retrieves container images from all registries (across all groups and projects) accessible to the authenticated user or token in GitLab.
            
        4.  Enter the Api Domain. You must enter the base URL for the Gitlab API.
            
        5.  Under Authentication Method, enter your Gitlab Access Token.
            
        6.  (Optional) Expand Show Advanced Settings, and then enter the CA certificate in PEM format for Cortex to validate the Gitlab registry.
            
        
    4.  Select Next.
        
    
    Scan with Outpost
    
    Security scanning is done on infrastructure deployed to a cloud account that you own. This mode requires additional cloud provider permissions and may incur extra costs.
    
    **Prerequisite:**
    
    Ensure an Outpost is connected to your tenant.
    
    1.  Choose a Cloud Provider to initialize registry scanning.
        
        **Note:**
        
        If you choose Azure as the Cloud Provider, you must also select the Tenant Id. The Tenant Id is required to approve Cortex as an enterprise application in your Azure tenant.
        
    2.  Choose Outpost account to use for this instance. If no Outposts are shown, you can Create a new one. For more details, see Outposts.
        
        **Note:**
        
        If you choose Azure as the cloud provider, only Outposts associated with the selected tenant ID are displayed.
        
    3.  Select the Region where the registry is hosted.
        
    4.  (Optional) Enable Allow access by IPs if you want to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so that the scanner can access the registry during the scanning process.
        
    5.  Choose the relevant Account Type for Gitlab deployments:
        
        Gitlab Cloud (Saas)
        
        1.  (Optional) Enter the Group Id.
            
            You can enter a single group ID or a list of group IDs separated by a comma. The group ID is used to locate all the registries within a specific group.
            
        2.  (Optional) Enter the Project Id.
            
            You can enter a Gitlab Project ID or a list of project IDs separated by a comma. The project ID is used to locate all the registries located within a specific project.
            
            **Note:**
            
            When both the group ID and project ID are provided, the system retrieves container images from all projects within the specified group as well as from the specified project.
            
            If neither the group ID nor the project ID is provided, the system retrieves container images from all registries (across all groups and projects) accessible to the authenticated user or token in GitLab.
            
        3.  Under Authentication Method, enter your Gitlab Access Token.
            
        
        Gitlab Self-Hosted
        
        1.  Enter the Registry URL.
            
            If you are using a CA certificate, enter the server IP address instead of the registry url.
            
        2.  (Optional) Enter the Group Id. You can enter a single group ID or a list of group IDs separated by a comma. The group ID is used to locate all the registries within a specific group.
            
        3.  (Optional) Enter the Project Id. You can enter a Gitlab Project ID or a list of project IDs separated by a comma. The project ID is used to locate all the registries located within a specific project.
            
            **Note:**
            
            When both the group ID and project ID are provided, the system retrieves container images from all projects within the specified group as well as from the specified project.
            
            If neither the group ID nor the project ID is provided, the system retrieves container images from all registries (across all groups and projects) accessible to the authenticated user or token in GitLab.
            
        4.  Enter the Api Domain. You must enter the base URL for the Gitlab API.
            
        5.  Under Authentication Method, enter your Gitlab Access Token.
            
        6.  (Optional) Expand Show Advanced Settings, and then enter the custom CA certificate in PEM format for Cortex to validate the Gitlab registry.
            
        
    6.  Select Next.
        
    
    Scan with Broker VM
    
    Security scanning in private networks is done using broker VM infrastructure when you select this mode.
    
    **Prerequisite:**
    
    -   Set up and configure Broker VM
        
    -   Configure High Availability Cluster
        
    
    1.  Choose a Scan with Broker VM mode to initiate registry scanning. You can select either a standalone Broker VM or a High Availability (HA) Cluster.
        
    2.  Select Applicable Broker VMs.
        
        Choose the appropriate Broker VM or Cluster from the list configured in your tenant.
        
        **Note:**
        
        -   The list of Broker VMs displays only VMs that support registry scanning.
            
        -   The list of high-availability Clusters displays only clusters that contain at least one VM supporting registry scanning.
            
        -   The registry scanning status for each VM appears in brackets if it was previously activated for that specific VM.
            
        
        If the list does not display any Broker VMs or Clusters, Add New Broker VM or Add New Cluster. For more details, see Set up and configure Broker VM.
        
    3.  Choose the relevant Account Type for Gitlab deployments:
        
        Gitlab Cloud (Saas)
        
        1.  (Optional) Enter the Group Id. You can enter a single group ID or a list of group IDs separated by a comma. The group ID is used to locate all the registries within a specific group.
            
        2.  (Optional) Enter the Project Id. You can enter a Gitlab Project ID or a list of project IDs separated by a comma. The project ID is used to locate all the registries located within a specific project.
            
            **Note:**
            
            When both the group ID and project ID are provided, the system retrieves container images from all projects within the specified group as well as from the specified project.
            
            If neither the group ID nor the project ID is provided, the system retrieves container images from all registries (across all groups and projects) accessible to the authenticated user or token in GitLab.
            
        3.  Under Authentication Method, enter your Gitlab Access Token.
            
        
        Gitlab Self-Hosted
        
        1.  Enter the Gitlab Registry URL.
            
            If you are using a CA certificate, enter the server IP address instead of the registry url.
            
        2.  (Optional) Enter the Group Id. You can enter a single group ID or a list of group IDs separated by a comma. The group ID is used to locate all the registries within a specific group.
            
        3.  (Optional) Enter the Project Id. You can enter a Gitlab Project ID or a list of project IDs separated by a comma. The project ID is used to locate all the registries located within a specific project.
            
            **Note:**
            
            When both the group ID and project ID are provided, the system retrieves container images from all projects within the specified group as well as from the specified project.
            
            If neither the group ID nor the project ID is provided, the system retrieves container images from all registries (across all groups and projects) accessible to the authenticated user or token in GitLab.
            
        4.  Enter the Api Domain. You must enter the base URL for the Gitlab API.
            
        5.  Under Authentication Method, enter your Gitlab Access Token.
            
        6.  (Optional) Expand Show Advanced Settings, and then enter the CA certificate in PEM format for Cortex to validate the Gitlab registry.
            
        
    4.  Select Next.
        
    
5.  In Initial Scan Configuration, set your scanning process to focus on recently added or modified container images and exclude older ones that do not align with your current scanning objectives. This setting helps avoid unnecessary scans. Choose one of the following options:
    
    -   All: Scans all container images, including all versions (tags), in all discovered repositories.
        
    -   Latest Tag: Scans only images tagged 'latest' in all discovered repositories.
        
    -   Days Modified: Scans container images created or modified in the last few days. You can select a range of up to **90** days for the scan.
        
    
6.  Select Save.
    
    When the Gitlab data source is saved successfully, a new data connector is created, and the initial discovery scan is started. The connection process may take up to 15 minutes.
    
7.  To check connector status and scan results, follow these steps:
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  Find the Gitlab Container Registry instance from the list of 3rd Party Data Sources connectors, or use Search.
        
    3.  In the Gitlab Container Registry instance row, select View Details. The Gitlab Instances page appears.
        
    4.  On the Gitlab Instances page, you can filter results by any heading and value.
        
    5.  Select an instance name to open the details pane. The details pane contains the following granular information:
        
        | Instance Details | Description |
        | --- | --- |
        | Status | Shows the status of the connector: Connected, Error, Warning, Disabled, or Pending. |
        | Applet Status on Broker VM | Shows the status of the Registry Scanner applet on the Broker VM page. This status is visible only when the Scan with Broker VM mode is selected. |
        | Repositories | Shows the number of scanned repositories in the registry. |
        | Scan Mode | Shows the selected scan mode for the data connector, such as Cloud Scan, Scan with Outpost, or Scan with Broker VM. |
        | Security Capabilities | Shows a breakdown of the security capabilities enabled on the instance and their individual statuses. For example, select Registry Scanning when it shows a warning or error status to see the open errors and issues that contributed to the status. |
        
8.  **Next Steps**.
    
    -   After the scan is complete, you can view the list of scanned images on the Container Images Inventory page. For more details, see Container Image assets.
        
    -   If you have selected the Scan with Broker VM option, then a Registry Scanner applet is created on the selected Broker VM or Cluster. For details, see Verify Registry Scanner connection.

##### Manage a Gitlab Container Registry connector
After you add a Gitlab Container Registry connector, you can modify the connector settings and configure the scanning scope to control which images are scanned in the connected registry.

To manage the connector, follow these steps:

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find the Gitlab Container Registry data source from the list of data sources, or use the filter to search.
    
3.  Select the Gitlab Container Registry row. A pane opens with a list of integration instances and their details.
    
    You can create a new instance by selecting Add Instance following the onboarding wizard to define the settings.
    
4.  Right click an instance to perform actions on it as follows:
    
    | Action | Instructions |
    | --- | --- |
    | Edit | Edit the Gitlab instance.  \*\*Note:\*\* If you selected Scan with Broker VM mode, you can't change to a different scan mode (such as Cloud Discovery or Scan with Outpost) when you edit the instance.; When editing an instance configured for Scan with Broker VM, you must re-enter your authentication credentials, including Username, Password, and CA certificate. |
    | Exclude/Include images | Define conditions to automatically exclude or include specific images in scanning. Conditions can be based on Repository or Tags. These conditions apply automatically to newly discovered images in the account. |
    | Delete | Removes the connector. |
    | Disable | Stops image scanning for the connector without deleting it. |

#### Connect Harbor registry
Cortex Cloud allows you to scan and secure your container images from vulnerabilities, malware, and secrets after you authenticate and connect your Harbor registry account.

How to connect Harbor

Follow the wizard to use the Harbor connector in Cortex Cloud to scan and secure container images.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Add Data Sources or Integrations page, click \+ Add New, search for Harbor, then hover over it and click Add.
    
3.  The Instance Name is automatically populated. You can change it to a more meaningful name.
    
4.  Choose the Scan Mode, and then follow the steps for that mode to configure the connection.
    
    Cloud Scan
    
    Security scanning is performed in the Cortex cloud environment when you select this mode.
    
    1.  Select the appropriate Cloud Provider and Region for the Cortex environment to use for registry scanning.
        
        As a best practice, choose the region closest to your registry deployment to achieve the best scanning throughput and potentially reduce cloud costs.
        
    2.  (Optional) Enable Allow access by IP’s to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so the scanner can access the registry during the scanning process.
        
    3.  Enter the Registry URL.
        
        Use the base URL of the Harbor registry. For example:
        
        `https://harbor.yourdomain.com`
        
        `https://harbor.yourdomain.com:8443` (with a specific port)
        
        Alternatively, if you are using a CA certificate, enter the server IP address instead of the registry URL. For example:
        
        `https://35.209.190.220`
        
        `https://35.210.190.225:8084` (with a custom port)
        
    4.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
        If you have configured a robot account for automated access, use the robot account’s username and secret/token as authentication credentials.
        
        For example: `docker login harbor.example.com -u 'robot$<your-robot-account-name>' -p '<your-robot-token>'`
        
    5.  (Optional) Expand Show advanced settings and then enter a custom CA certificate in PEM format for Cortex to validate the Harbor registry. Ensure that the Custom CA certificate that you use is not revoked by the issuing authority.
        
    6.  Select Next.
        
    
    Scan with Outpost
    
    Security scanning is done on infrastructure deployed to a cloud account that you own. This mode requires additional cloud provider permissions and may incur extra costs.
    
    **Prerequisite:**
    
    Ensure an Outpost is connected to your tenant.
    
    1.  Choose a Cloud Provider to initialize registry scanning.
        
        **Note:**
        
        If you choose Azure as the Cloud Provider, you must also select the Tenant Id. The Tenant Id is required to approve Cortex as an enterprise application in your Azure tenant.
        
    2.  Choose Outpost account to use for this instance. If no Outposts are shown, you can Create a new one. For more details, see Outposts.
        
        **Note:**
        
        If you choose Azure as the cloud provider, only Outposts associated with the selected tenant ID are displayed.
        
    3.  Select the Region where the registry is hosted.
        
    4.  (Optional) Enable Allow access by IP’s if you want to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so that the scanner can access the registry during the scanning process.
        
    5.  Enter the Registry URL.
        
        Use the base URL of the Harbor registry. For example:
        
        `https://harbor.yourdomain.com`
        
        `https://harbor.yourdomain.com:8443` (with a specific port)
        
        Alternatively, if you are using a CA certificate, enter the server IP address instead of the registry URL. For example:
        
        `https://35.209.190.220`
        
        `https://35.209.190.220:8084` (with a custom port)
        
    6.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
        If you have configured a robot account for automated access, use the robot account’s username and secret/token as authentication credentials.
        
        For example: `docker login harbor.example.com -u 'robot$<your-robot-account-name>' -p '<your-robot-token>'`
        
    7.  (Optional) Expand Show advanced settings and then enter a custom CA certificate in PEM format for Cortex to validate the Harbor registry. Ensure that the Custom CA certificate that you use is not revoked by the issuing authority.
        
    8.  Select Next.
        
    
    Scan with Broker VM
    
    Security scanning in private networks is performed using broker VM infrastructure when you select this mode.
    
    **Prerequisite:**
    
    Ensure one of the following is configured:
    
    -   Set up and configure Broker VM.
        
    -   Configure High Availability Cluster.
        
    
    1.  Choose a Scan with Broker VM mode to initiate registry scanning. You can select either a standalone Broker VM or a High Availability (HA) Cluster.
        
    2.  Select Applicable Broker VMs.
        
        Choose the appropriate Broker VM or Cluster from the list configured in your tenant.
        
        **Note:**
        
        -   The list of Broker VMs displays only VMs that support registry scanning.
            
        -   The list of high-availability Clusters displays only clusters that contain at least one VM supporting registry scanning.
            
        -   The registry scanning status for each VM appears in brackets if it was previously activated for that specific VM.
            
        
        If the list does not display any Broker VMs or clusters, Add New Broker VM or Add New Cluster. For more details, see Set up and configure Broker VM.
        
    3.  Enter the Registry URL.
        
        Use the base URL of the Harbor registry. For example:
        
        `https://harbor.yourdomain.com`
        
        `https://harbor.yourdomain.com:8443` (with a specific port)
        
        Alternatively, if you are using a CA certificate, enter the server IP address instead of the registry URL. For example:
        
        `https://35.209.190.220`
        
        `https://35.210.190.225:8443` (with a custom port)
        
    4.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
        If you have configured a robot account for automated access, use the robot account’s username and secret/token as authentication credentials.
        
        For example: `docker login harbor.example.com -u 'robot$<your-robot-account-name>' -p '<your-robot-token>'`
        
    5.  (Optional) Expand Show advanced settings and then enter a custom CA certificate in PEM format for Cortex to validate the Harbor registry. Ensure that the Custom CA certificate that you use is not revoked by the issuing authority.
        
    6.  Select Next.
        
    
5.  In the Initial Scan Configuration, set your scanning process to focus on recently added or modified container images and exclude older ones that do not align with your current scanning objectives. This setting helps avoid unnecessary scans. Choose one of the following options:
    
    -   All: Scans all container images, including all versions (tags), in all discovered repositories.
        
    -   Latest Tag: Scans only images tagged **'latest'** in all discovered repositories.
        
    -   Days Modified: Scans container images that have been created in the last few days. You can select a range of up to **90** days for the scan.
        
    
6.  Select Save.
    
    When the Harbor data source is saved successfully, a new data connector is created, and the initial discovery scan begins. The connection process may take up to 15 minutes.
    
7.  To check connector status and scan results, follow these steps:
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  Find the Harbor instance from the list of 3rd Party Data Sources connectors, or use Search.
        
    3.  In the Harbor instance row, select View Details. The Harbor Instances page appears.
        
    4.  On the Harbor Instances page, you can filter results by any heading and value.
        
    5.  Select an instance name to open the details pane. The details pane contains the following granular information:
        
        | Instance Details | Description |
        | --- | --- |
        | Status | Shows the status of the connector: Connected, Error, Warning, Disabled, or Pending. |
        | Applet Status on Broker VM | Shows the status of the Registry Scanner applet on the Broker VM page. This status is visible only when the Scan with Broker VM mode is selected. |
        | Repositories | Shows the number of scanned repositories in the registry. |
        | Scan Mode | Shows the selected scan mode for the data connector, such as Cloud Scan, Scan with Outpost, or Scan with Broker VM. |
        | Security Capabilities | Shows a breakdown of the security capabilities enabled on the instance and their individual statuses. For example, select Registry Scanning when it shows a **warning** or **error status** to see the open errors and issues that contributed to the status. |
        
8.  **Next Steps**.
    
    After the scan is complete, you can view the scanned details on the Container Images Inventory page. For more details, see Container Images assets.
    
    If you have selected the Scan with Broker VM option, then a Registry Scanner applet is created on the selected Broker VM or Cluster. For details, see Verify Registry Scanner connection.

##### Manage a Harbor connector
After successfully adding a connector, you can modify the connector settings and configure the scanning scope to control which images are scanned in the connected registry.

To manage the connector, follow these steps:

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find the Harbor data source from the list of data sources, or use the filter to search.
    
3.  Select the Harbor row. A pane opens with a list of integration instances and their details.
    
    You can create a new instance by selecting Add Instance and following the onboarding wizard to define the settings.
    
4.  Right click an instance to perform actions on it as follows:
    
    | Action | Instructions |
    | --- | --- |
    | Edit | Edit the Harbor instance. \*\*Note:\*\* If you selected Scan with Broker VM mode, you can't change to a different scan mode (such as Cloud Discovery or Scan with Outpost) when you edit the instance.; When editing an instance configured for Scan with Broker VM, you must re-enter your authentication credentials, including Username, Password, and CA certificate. |
    | Exclude/Include images | Define conditions to automatically exclude or include specific images while scanning. Conditions can be based on Repository or Tags. These conditions apply automatically to newly discovered images in the account. |
    | Delete | Removes the connector. |
    | Disable | Stops image scanning for the connector without deleting it. |

#### Connect JFrog container registry
Cortex Cloud allows you to scan and secure your container images from vulnerabilities, malware, and secrets after you authenticate and connect your JFrog account. This process ensures robust artifact management and enhanced security.

How to connect JFrog

Follow the wizard to connect your JFrog Container Registry with Cortex Cloud.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Add Data Sources or Integrations page, click \+ Add New, search for JFrog, then hover over it and click Add.
    
3.  Select Image scanning to continue scanning your container images.
    
    If you want to enable Software Composition Analysis (SCA) scanning for your private packages, then select Package resolution for code scanning and refer to JFrog Artifactory for more details.
    
4.  The Instance Name is automatically populated. You can change it to a more meaningful name.
    
5.  Choose the Scan Mode, and then follow the steps provided for that mode to configure the connection.
    
    Cloud Scan
    
    Security scanning is done in the Cortex cloud environment when you select this mode.
    
    1.  Select the appropriate Cloud Provider and Region for the Cortex environment to use for registry scanning.
        
        As a best practice, choose the region closest to your registry deployment to achieve the best scanning throughput and potentially reduce cloud costs.
        
    2.  (Optional) Enable Allow access by IPs to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so the scanner can access the registry during the scanning process.
        
    3.  Choose the relevant Account Type for JFrog deployments:
        
        JFrog Cloud (Saas)
        
        1.  Enter your JFrog Account Name.
            
            For example, the scanner connects to `https://myaccount.jfrog.io`, where `<myaccount>` is your actual account name.
            
        2.  Under Authentication Method, enter your JFrog account credentials (Username and Password) for authentication.
            
        
        JFrog Self-Hosted
        
        1.  Enter the JFrog Artifactory URL as the Registry URL.
            
            For example, `https://artifactory.example.com/artifactory`, where `<artifactory.example.com>` is your server's domain or IP address.
            
        2.  Under Authentication Method, enter your JFrog user credentials (Username and Password) for authentication.
            
        3.  (Optional) Expand Show Advanced Settings, and then enter the CA certificate in PEM format for Cortex to validate the JFrog Artifactory registry.
            
        
    4.  Select Next.
        
    
    Scan with Outpost
    
    Security scanning is done on infrastructure deployed to a cloud account that you own. This mode requires additional cloud provider permissions and may incur extra costs.
    
    **Prerequisite:**
    
    Ensure an Outpost is connected to your tenant.
    
    1.  Choose a Cloud Provider to initialize registry scanning.
        
        **Note:**
        
        If you choose Azure as the Cloud Provider, you must also select the Tenant Id. The Tenant Id is required to approve Cortex as an enterprise application in your Azure tenant.
        
    2.  Choose Outpost account to use for this instance. If no Outposts are shown, you can Create a new one. For more details, see Outposts.
        
        **Note:**
        
        If you choose Azure as the cloud provider, only Outposts associated with the selected tenant ID are displayed.
        
    3.  Select the Region where the registry is hosted.
        
    4.  (Optional) Enable Allow access by IPs if you want to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so that the scanner can access the registry during the scanning process.
        
    5.  Choose the relevant Account Type for JFrog deployments:
        
        JFrog Cloud (Saas)
        
        1.  Enter your JFrog Account Name.
            
            For example, the scanner connects to `https://myaccount.jfrog.io`, where `<myaccount>` is your actual account name.
            
        2.  Under Authentication Method, enter your JFrog account credentials (Username and Password) for authentication.
            
        
        JFrog Self-Hosted
        
        1.  Enter the JFrog Artifactory URL as the Registry URL.
            
            For example, `https://artifactory.example.com/artifactory`, where `<artifactory.example.com>` is your server's domain or IP address.
            
        2.  Under Authentication Method, enter your JFrog user credentials (Username and Password) for authentication.
            
        3.  (Optional) Expand Show Advanced Settings, and then enter the custom CA certificate in PEM format for Cortex to validate the JFrog Artifactory registry.
            
        
    6.  Select Next.
        
    
    Scan with Broker VM
    
    Security scanning in private networks is done using broker VM infrastructure when you select this mode.
    
    **Prerequisite:**
    
    -   Set up and configure Broker VM
        
    -   Configure High Availability Cluster
        
    
    1.  Choose a Scan with Broker VM mode to initiate registry scanning. You can select either a standalone Broker VM or a High Availability (HA) Cluster.
        
    2.  Select Applicable Broker VMs.
        
        Choose the appropriate Broker VM or Cluster from the list configured in your tenant.
        
        **Note:**
        
        -   The list of Broker VMs displays only VMs that support registry scanning.
            
        -   The list of high-availability Clusters displays only clusters that contain at least one VM supporting registry scanning.
            
        -   The registry scanning status for each VM appears in brackets if it was previously activated for that specific VM.
            
        
        If the list does not display any Broker VMs or Clusters, Add New Broker VM or Add New Cluster. For more details, see Set up and configure Broker VM.
        
    3.  Choose the relevant Account Type for JFrog deployments:
        
        JFrog Cloud (Saas)
        
        1.  Enter your JFrog Account Name.
            
            For example, the scanner connects to `https://myaccount.jfrog.io`, where `<myaccount>` is your actual account name.
            
        2.  Under Authentication Method, enter your JFrog account credentials (Username and Password) for authentication.
            
        
        JFrog Self-Hosted
        
        1.  Enter the JFrog Artifactory URL as the Registry URL.
            
            For example, `https://artifactory.example.com/artifactory`, where `<artifactory.example.com>` is your server's domain or IP address.
            
        2.  Under Authentication Method, enter your JFrog user credentials (Username and Password) for authentication.
            
        3.  (Optional) Expand Show Advanced Settings.
            
            1.  Select Use insecure connection to pull images if you want to allow image pull from the registry over an HTTP connection instead of HTTPS.
                
            2.  Enter the CA certificate in PEM format for Cortex to validate the JFrog Artifactory registry.
                
            
        
    4.  Select Next.
        
    
6.  In Initial Scan Configuration, set your scanning process to focus on recently added or modified container images and exclude older ones that do not align with your current scanning objectives. This setting helps avoid unnecessary scans. Choose one of the following options:
    
    -   All: Scans all container images, including all versions (tags), in all discovered repositories.
        
    -   Latest Tag: Scans only images tagged 'latest' in all discovered repositories.
        
    -   Days Modified: Scans container images created or modified in the last few days. You can select a range of up to **90** days for the scan.
        
    
7.  Select Save.
    
    When the JFrog data source is saved successfully, a new data connector is created, and the initial discovery scan is started. The connection process may take up to 15 minutes.
    
8.  To check connector status and scan results, follow these steps:
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  Find the JFrog Artifactory instance from the list of 3rd Party Data Sources connectors, or use Search.
        
    3.  In the JFrog Artifactory instance row, select View Details. The JFrog Artifactory Instances page appears.
        
    4.  On the JFrog Artifactory Instances page, you can filter results by any heading and value.
        
    5.  Select an instance name to open the details pane. The details pane contains the following granular information:
        
        | Instance Details | Description |
        | --- | --- |
        | Status | Shows the status of the connector: Connected, Error, Warning, Disabled, or Pending. |
        | Applet Status on Broker VM | Shows the status of the Registry Scanner applet on the Broker VM page. This status is visible only when the Scan with Broker VM mode is selected. |
        | Repositories | Shows the number of scanned repositories in the registry. |
        | Scan Mode | Shows the selected scan mode for the data connector, such as Cloud Scan, Scan with Outpost, or Scan with Broker VM. |
        | Security Capabilities | Shows a breakdown of the security capabilities enabled on the instance and their individual statuses. For example, select Registry Scanning when it shows a warning or error status to see the open errors and issues that contributed to the status. |
        
9.  **Next Steps**.
    
    -   After the scan is complete, you can view the list of scanned images on the Container Images Inventory page. For more details, see Container Image assets.
        
    -   If you have selected the Scan with Broker VM option, then a Registry Scanner applet is created on the selected Broker VM or Cluster. For details, see Verify Registry Scanner connection.

##### Manage a JFrog connector
After you add a JFrog connector, you can modify the connector settings and configure the scanning scope to control which images are scanned in the connected registry.

To manage the connector, follow these steps:

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find the JFrog integration from the list of data sources, or use the filter to search.
    
3.  Select the JFrog row. A pane opens with a list of integration instances and their details.
    
    You can create a new instance by selecting Add Instance and following the onboarding wizard to define the settings.Connect Docker V2 compliant container registry
    
4.  Right click an instance to perform actions on it as follows:
    
    | Action | Instructions |
    | --- | --- |
    | Edit | Edit the JFrog Artifactory instance. \*\*Note:\*\* If you selected Scan with Broker VM mode, you can't change to a different scan mode (such as Cloud Discovery or Scan with Outpost) when you edit the instance.; When editing an instance configured for Scan with Broker VM, you must re-enter your authentication credentials, including Username, Password, and CA certificate. |
    | Exclude/Include images | Define conditions to automatically exclude or include specific images while scanning. Conditions can be based on Repository or Tags. These conditions apply automatically to newly discovered images in the account. |
    | Delete | Removes the connector. |
    | Disable | Stops image scanning for the connector without deleting it. |

#### Connect Sonatype Nexus registry
Configure Cortex Cloud to scan your Nexus Registry. This allows Cortex to list all container registries or images, and secure them from vulnerabilities, malware, and secrets.

How to connect Nexus registry

Follow the wizard to use the Sonatype Nexus registry connector in Cortex Cloud.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Add Data Sources or Integrations page, click \+ Add New, search for Sonatype, then hover over it and click Add.
    
3.  The Instance Name is automatically populated. You can change it to a more meaningful name.
    
4.  Choose the Scan Mode, and then follow the steps for that mode to configure the connection.
    
    Cloud Scan
    
    Security scanning is done in the Cortex cloud environment when you select this mode.
    
    1.  Select the appropriate Cloud Provider and Region for the Cortex environment to use for registry scanning.
        
        As a best practice, choose the region closest to your registry deployment to achieve the best scanning throughput and potentially reduce cloud costs
        
    2.  (Optional) Enable Allow access by IP’s to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so the scanner can access the registry during the scanning process.
        
    3.  Enter the Registry URL.
        
        Enter the hostname, or Fully Qualified Domain Name (FQDN), and the connector port for the Nexus registry’s login server in the following format:
        
        https://`<hostname>:<connector_port>` ,
        
        `<hostname>`— unique name assigned when the Nexus registry was created
        
        `<connector_port>`— https connector for the specific Nexus repository.
        
        For example:
        
        `https://ec2-100-25-223-135.compute-1.amazonaws.com:8083`
        
        `https://35.209.190.220:8084`
        
        **Note:**
        
        If you are using a CA certificate, enter the server IP address instead of the registry url.
        
    4.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
    5.  (Optional) Expand Show advanced settings and then enter a custom CA certificate in PEM format for Cortex to validate the Nexus registry.
        
    6.  Select Next.
        
    
    Scan with Outpost
    
    Security scanning is done on infrastructure deployed to a cloud account that you own. This mode requires additional cloud provider permissions and may incur extra costs.
    
    **Prerequisite:**
    
    Ensure an Outpost is connected to your tenant. Outposts
    
    1.  Choose a Cloud Provider to initialize registry scanning.
        
        **Note:**
        
        If you choose Azure as the Cloud Provider, you must also select the Tenant Id. The Tenant Id is required to approve Cortex as an enterprise application in your Azure tenant.
        
    2.  Choose Outpost account to use for this instance. If no Outposts are shown, you can Create a new one. For more details, see Outposts.
        
        **Note:**
        
        If you choose Azure as the cloud provider, only Outposts associated with the selected tenant ID are displayed.
        
    3.  Select the Region where the registry is hosted.
        
    4.  (Optional) Enable Allow access by IP’s if you want to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so that the scanner can access the registry during the scanning process.
        
    5.  Enter the Registry URL.
        
        Enter the hostname, or Fully Qualified Domain Name (FQDN), and the connector port for the Nexus registry’s login server in the following format:
        
        `<https://<hostname>:<connector_port>`.
        
        `<hostname>`— unique name assigned when the registry was created.
        
        `<connector_port>`— https connector for the specific Nexus repository.
        
        For example:
        
        `https://ec2-100-25-223-135.compute-1.amazonaws.com:8083`
        
        `https://35.209.190.220:8084`
        
        **Note:**
        
        If you are using a CA certificate, enter the server IP address instead of the registry URL.
        
    6.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
    7.  (Optional) Expand Show advanced settings and then enter a custom CA certificate in PEM format for Cortex to validate the Nexus registry.
        
    8.  Select Next.
        
    
    Scan with Broker VM
    
    Security scanning in private networks is done using broker VM infrastructure when you select this mode.
    
    **Prerequisite:**
    
    Ensure one of the following is configured:
    
    -   Set up and configure Broker VM.
        
    -   Configure High Availability Cluster.
        
    
    1.  Choose a Scan with Broker VM mode to initiate registry scanning. You can select either a standalone Broker VM or a High Availability (HA) Cluster.
        
    2.  Select Applicable Broker VMs.
        
        Choose the appropriate Broker VM or Cluster from the list configured in your tenant.
        
        **Note:**
        
        -   The list of Broker VMs displays only VMs that support registry scanning.
            
        -   The list of high-availability Clusters displays only clusters that contain at least one VM supporting registry scanning.
            
        -   The registry scanning status for each VM appears in brackets if it was previously activated for that specific VM.
            
        
        If the list does not display any Broker VMs or clusters, Add New Broker VM or Add New Cluster. For more details, see Set up and configure Broker VM.
        
    3.  Enter the Registry URL.
        
        Enter the hostname, or Fully Qualified Domain Name (FQDN), and the connector port for the Nexus registry’s login server in the following format:
        
        `<https://<hostname>:<connector_port>`
        
        `<hostname>`— unique name assigned when the registry was created.
        
        `<connector_port>`— https connector for the specific Nexus repository.
        
        For example:
        
        `https://ec2-100-25-223-135.compute-1.amazonaws.com`
        
        `https://35.209.190.220:8084`
        
        **Note:**
        
        If you are using a CA certificate, enter the server IP address instead of the registry URL.
        
    4.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
    5.  (Optional) Expand Show advanced settings and then enter a custom CA certificate in PEM format for Cortex to validate the Nexus registry.
        
    6.  Select Next.
        
    
5.  In the Initial Scan Configuration, set your scanning process to focus on recently added or modified container images and exclude older ones that do not align with your current scanning objectives. This setting helps avoid unnecessary scans. Choose one of the following options:
    
    -   All: Scans all container images, including all versions (tags), in all discovered repositories.
        
    -   Latest Tag: Scans only images tagged **'latest'** in all discovered repositories.
        
    -   Days Modified: Scans container images that have been created in the last few days. You can select a range of up to **90** days for the scan.
        
    
6.  Select Save.
    
    When the Sonatype data source is saved successfully, a new data connector is created, and the initial discovery scan begins. The connection process may take up to 15 minutes.
    
7.  To check the connector status and scan results, follow these steps:
    
    1.  Go to Settings → Data Sources & Integrations.
        
    2.  Find the Sonatype instance from the list of 3rd Party Data Sources connectors, or use Search.
        
    3.  In the Sonatype instance row, select View Details. The Sonatype Instances page appears.
        
    4.  On the Sonatype Instances page, you can filter results by any heading and value.
        
    5.  Select an instance name to open the details pane. The details pane contains the following granular information:
        
        | Instance Details | Description |
        | --- | --- |
        | Status | Shows the status of the connector: Connected, Error, Warning, Disabled, or Pending. |
        | Applet Status on Broker VM | Shows the status of the Registry Scanner applet on the Broker VM page. This status is visible only when the Scan with Broker VM mode is selected. |
        | Repositories | Shows the number of scanned repositories in the registry. |
        | Scan Mode | Shows the selected scan mode for the data connector, such as Cloud Scan, Scan with Outpost, or Scan with Broker VM. |
        | Security Capabilities | Shows a breakdown of the security capabilities enabled on the instance and their individual statuses. For example, select Registry Scanning when it shows a warning or error status to see the open errors and issues that contributed to the status. |
        
8.  **Next Steps**.
    
    -   After the scan is complete, you can view the list of scanned images on the Container Images Inventory page. For more details, see Container Images assets.
        
    -   If you have selected the Scan with Broker VM option, then a Registry Scanner applet is created on the selected Broker VM or Cluster. For details, see Verify Registry Scanner connection.

##### Manage a Sonatype connector
After you add a Sonatype connector, you can modify the connector settings and configure the scanning scope to control which images are scanned in the connected registry.

To manage the connector, follow these steps:

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Select the Sonatype data source from the list of data sources, or filter to search.
    
3.  Select the Sonatype row. A pane opens with a list of integration instances and their details.
    
    You can create a new instance by selecting Add Instance and following the onboarding wizard to define the settings.
    
4.  Right click an instance to perform actions on it as follows:
    
    | Action | Instructions |
    | --- | --- |
    | Edit | Edit the Sonatype instance. \*\*Note:\*\* If you had selected Scan with Broker VM mode, you can't change to a different scan mode (such as Cloud Discovery or Scan with Outpost) when you edit the instance.; When editing an instance configured for Scan with Broker VM, you must re-enter your authentication credentials, including Username, Password, and CA certificate. |
    | Exclude/Include images | Define conditions to automatically include or exclude specific images while scanning. Conditions can be based on Repository or Tags. These conditions apply automatically to newly discovered images in the account. |
    | Delete | Removes the connector. |
    | Disable | Stops image scanning for the connector without deleting it. |

### Cloud service provider permissions

Grant the correct cloud service provider permissions for Cortex Cloud.

When you set up Cortex Cloud to collect data from your cloud environments, the onboarding wizard will ensure that the correct permissions are granted for Cortex Cloud. The following tables list the permissions required for each of the options available in the onboarding wizards.

Review the permissions required for each cloud service provider:

-   Amazon Web Services
    
-   Google Cloud Platform
    
-   Microsoft Azure
    
-   Oracle Cloud Infrastructure

#### Amazon Web Services provider permissions

List of Amazon Web Services provider permissions for Cortex Cloud.

When onboarding Amazon Web Services, Cortex Cloud creates an authentication template that requests the permissions needed for monitoring your cloud environment. Depending on which security capabilities you select in the onboarding wizard, different permissions are requested. The following tables are organized by security module and list the CSP permissions being requested as well as the purpose (and where relevant, the scope):

-   Agentless Disk Scanning
    
-   DSPM
    
-   Discovery Engine
    
-   Registry Scan
    
-   Log Collection
    
-   Automations
    
-   Serverless Scan
    
-   Outposts
    

Agentless Disk Scanning

| Permission | Scope | Purpose |
| --- | --- | --- |
| ec2:CopyImage | Images created with managed_by: `paloaltonetworks` tag | Create disk from Image |
| ec2:CopySnapshot | Snapshots copied with managed_by: `paloaltonetworks` tag | Re-encrypt snapshot with Palo Alto Network's KMS key |
| ec2:CreateSnapshot | Snapshots created with managed_by: `paloaltonetworks` tag | Create disk snapshot |
| ec2:CreateTags | Only as part of CopyImage, CreateSnapshot and CopySnapshot operations | Add tags for permission scoping and cost visibility |
| ec2:DeleteSnapshot | Snapshots with managed_by: `paloaltonetworks` tag | Delete scanned snapshot |
| ec2:DeregisterImage | Images with managed_by: `paloaltonetworks` tag | Delete ephemeral re-encrypted image |
| ec2:DescribeImages | Images with managed_by: `paloaltonetworks` tag | Retrieve image creation status |
| ec2:DescribeSnapshots | Snapshots with managed_by: `paloaltonetworks` tag | Retrieve snapshot creation status |
| ec2:ModifySnapshotAttribute | Snapshots with managed_by: `paloaltonetworks` tag; The snapshots can be shared only with the outpost account | Share snapshot with the outpost account |
| kms:CreateGrant | Palo Alto Network's and customer KMS keys; Only EC2 services can use this permission | Create a new grant for a customer master key (CMK), such as to allow the re-encrypt operation |
| kms:DescribeKey | Palo Alto Network's KMS key; Only EC2 services can use this permission | Retrieve detailed information about a customer master key (CMK), such as to allow and support a re-encrypt operation |
| kms:GenerateDataKeyWithoutPlaintext | Palo Alto Network's KMS key; Only EC2 services can use this permission | Generate a data key for client-side encryption, such as to allow and support a re-encrypt operation |

DSPM

| Permission | Scope | Purpose |
| --- | --- | --- |
| arn:aws:iam::aws:policy/AmazonMemoryDBReadOnlyAccess | All DynamoDB resources in the account | Grant read-only access to the MemoryDB resources |
| cloudwatch:GetMetricStatistics | All DynamoDB tables in the account | Get usage statistics, which are used to ensure that classification processes do not interfere with production environments |
| dynamodb:DescribeTable | All DynamoDB tables in the account | Get information about DynamoDB tables in the account |
| dynamodb:Scan | All DynamoDB tables in the account | Access data in DynamoDB tables in the account for performing environment-wide discovery and data classification, ensuring no assets are left unmonitored |
| iam:PassRole | Palo Alto Networks scanner role | Create export tasks for RDS snapshots |
| kms:CreateGrant | KMS keys in the account | Enable the created EC2 instance to send a CreateGrant request to the AWS KMS for a customer master key (CMK) so that it, for example, can share an encrypted snapshot with an outpost account (re-encryption) |
| kms:DescribeKey | KMS keys in the account | Retrieve detailed information about a customer master key (CMK), such as to allow and support a re-encrypt operation |
| kms:GenerateDataKeyWithoutPlaintext | AWS account | Generate a data key for client-side encryption, such as encrypting a created snapshot |
| rds:AddTagsToResource | All RDS database instances and clusters in the account | Create unique tags for the created RDS resourceCreateDBSnapshots in order to find them at a later stage. This permission is needed for performing environment-wide discovery and data classification, ensuring no assets are left unmonitored. |
| rds:CancelExportTask | All RDS database instances and clusters in the account | Cancel export tasks in case of failure or termination of the classification process. This permission is needed for performing environment-wide discovery and data classification, ensuring no assets are left unmonitored. |
| rds:CreateDBClusterSnapshot | All RDS database instances and clusters in the account | Create a snapshot for the RDS clusters that need to be scanned at a later stage. This permission is needed for performing environment-wide discovery and data classification, ensuring no assets are left unmonitored. |
| rds:CreateDBSnapshot | All RDS database instances and clusters in the account | Create a snapshot for the RDS instances that need to be scanned at a later stage. This permission is needed for performing environment-wide discovery and data classification, ensuring no assets are left unmonitored. |
| rds:DeleteDBSnapshot | Snapshots created by Palo Alto Networks | Delete snapshots created as part of the classification process |
| rds:Describe\* | All RDS database instances and clusters in the account | Describe permissions to enable Palo Alto Networks to get metadata information on the RDS instance |
| rds:List\* | All RDS database instances and clusters in the account | List permissions to enable Palo Alto Networks to understand which instances and snapshots exist in the account |
| rds:StartExportTask | All RDS database instances and clusters in the account | Export data from the snapshots to an S3 bucket |
| s3:DeleteObject\* | Buckets created by Palo Alto Networks | Delete stale objects that were created |
| s3:Get\* | All S3 buckets in the account | Enable Palo Alto Networks to read data within S3 buckets |
| s3:List\* | All S3 buckets in the account | Allow the listing of all S3 objects |
| s3:PutObject\* | Buckets created by Palo Alto Networks | Write data to an object in Palo Alto Networks’ bucket to export data from the RDS instances |

Discovery Engine

| Permission | Purpose |
| --- | --- |
| apigateway:GetDomainNames | Retrieve API Gateway custom domain names |
| arn:aws:iam::aws:policy/AmazonSQSReadOnlyAccess | Grant read-only access to Amazon Simple Queue Service (SQS), allowing the retrieval of SQS queue attributes, messages, and configurations |
| arn:aws:iam::aws:policy/AWSOrganizationsReadOnlyAccess | Grant read-only access to AWS organizations, allowing the ability to list and view configurations, metadata, and logs across AWS organizations |
| arn:aws:iam::aws:policy/ReadOnlyAccess | Grant read-only access to AWS services and resources, allowing the ability to list and view configurations, metadata, and logs across AWS resources |
| arn:aws:iam::aws:policy/SecurityAudit | Grant access to read security configuration metadata, allowing users to inspect IAM configurations, security policies, CloudTrail logs, and other security-relevant settings |
| bedrock-agent:GetAgents | Retrieve details of Bedrock agents |
| bedrock-agent:GetDataSource | Retrieve details of a specific data source |
| bedrock-agent:GetKnowledgeBases | Retrieve details of knowledge bases |
| bedrock-agent:ListAgentAliases | List aliases associated with an agent |
| bedrock-agent:ListAgentKnowledgeBases | List knowledge bases linked to agents |
| bedrock-agent:ListAgents | List all Bedrock agents |
| bedrock-agent:ListDataSource | List available data sources |
| bedrock:ListCustomModel | List custom AI models in Amazon Bedrock |
| cloudcontrolapi:GetResource | Retrieve the state of an AWS resource managed via the Cloud Control API |
| cloudformation:AmazonCloudFormation | General permission related to CloudFormation resource management |
| cloudformation:StackStatus | Retrieve the status of CloudFormation stacks |
| cloudformation:StackSummary | Provide a summary of CloudFormation stacks |
| cloudwatch:describeAlarms | Describe all alarms currently owned by the user's account |
| comprehendmedical:ListEntitiesDetectionV2Jobs | List entity detection jobs in Comprehend Medical |
| configservice:DescribeDeliveryChannels | Retrieve details of AWS Config delivery channels |
| connect-campaigns:DescribeCampaign | Describe a specific campaign |
| connect-campaigns:ListCampaigns | Provide a summary of all campaigns |
| controltower:ListLandingZones | List landing zones for AWS Control Tower |
| controltower:ListTagsForResource | List tags for AWS Control Tower resources |
| DirectConnect:\* | Enable all GET permissions for AWS Direct Connect |
| DirectConnect:DescribeConnections | List Direct Connect connections and their attributes |
| DirectConnect:DescribeDirectConnectGateways | Retrieve details about Direct Connect gateway |
| DirectConnect:DescribeVirtualInterfaces | Display all virtual interfaces for an AWS account |
| DS:DescribeDirectories | Grant read access to directory details in AWS Directory Service |
| DS:ListTagsForResource | List tags associated with a specific AWS Directory Service resource |
| elasticfilesystem:DescribeFileSystemPolicy | Retrieve policies associated with an EFS file system |
| elasticloadbalancingv2:DescribeSSLPolicies | Retrieve details of ELB SSL policies |
| forecast:ListTagsForResource | List tags associated with an Amazon Forecast resource |
| glue:GetConnections | List connection configurations for AWS Glue |
| glue:GetResourcePolicies | Retrieve Glue Data Catalog policies |
| Glue:GetSecurityConfigurations | Retrieve security configurations for AWS Glue |
| iam:AmazonIdentityManagement | General IAM access for identity and access management |
| iam:AttachedPolicy | Retrieve policies attached to IAM identities |
| iam:PolicyRole | List IAM roles associated with a policy |
| iam:RoleDetail | Retrieve detailed information about IAM roles |
| lakeformation:\* | Enable all GET permissions for AWS Lake Formation |
| memorydb:DescribeSnapshots | Retrieve information about cluster snapshots |
| memorydb:DescribeSubnetGroups | Retrieve a list of subnet group |
| opensearchserverless:ListCollections | List collections in OpenSearch Serverless |
| s3-control:GetAccessPointPolicy | Retrieve an S3 access point policy |
| s3-control:GetAccessPointPolicyStatus | Retrieve the status of an access point policy |
| s3-control:GetPublicAccessBlock | Retrieve the public access block configuration for an account |
| s3-control:ListAccessPoints | List S3 access points that are owned by the current account that's associated with the specified bucket |
| servicecatalog-appregistry:ListApplications | List applications in AWS AppRegistry |
| servicecatalog-appregistry:ListAttributeGroups | List attribute groups in AppRegistry |
| workspaces:\* | Enable all GET permissions for Amazon WorkSpaces |
| WorkSpaces:DescribeTags | List tags associated with WorkSpaces resources |
| WorkSpaces:DescribeWorkspaceDirectories | Retrieve details about WorkSpaces directories |
| WorkSpaces:DescribeWorkspaces | List and describe WorkSpaces instances |

Registry Scan

| Permission | Scope | Purpose |
| --- | --- | --- |
| ecr:BatchGetImage | All ECR images in the account | Get detailed information for an image, required to pull the image |
| ecr:GetDownloadUrlForLayer | All ECR images in the account | Used in the process of pulling images, to fetch the URL for the various layers that make up the image |
| ecr:GetAuthorizationToken | All ECR images in the account | Used to create a login token for pulling images from ECR |

Log Collection

| Permission | Scope | Purpose |
| --- | --- | --- |
| kms:Decrypt | The specific KMS key used for CloudTrail encryption in the current account and region | Decrypt ciphertext using a customer master key (CMK) |
| s3:GetObject | The Cortex CloudTrail logs S3 bucket and its objects | Grant permission to download objects from the configured S3 bucket |
| s3:ListBucket | The Cortex CloudTrail logs S3 bucket and its objects | Grant permission to see the specific bucket |
| sqs:ChangeMessageVisibility | The specific Cortex CloudTrail logs SQS queue | Manage log message visibility during processing, such as to extend processing time for log messages to prevent timeouts |
| sqs:DeleteMessage | The specific Cortex CloudTrail logs SQS queue | Grant permission to delete consumed messages, preventing re-processing of the same message |
| sqs:GetQueueAttributes | The specific Cortex CloudTrail logs SQS queue | Grant permission to retrieve SQS queue attributes, used for metrics and monitoring |
| sqs:ReceiveMessage | The specific Cortex CloudTrail logs SQS queue | Grant permission to consume messages from the SQS queue to receive bucket notification messages |

Automations

Retrieve configuration details and metadata for a Lambda function R and downloads the source code

| Permission | Command that requires this permission | Purpose |
| --- | --- | --- |
| acm:UpdateCertificateOptions | aws-acm-certificate-options-update | Update the options for a specified ACM certificate |
| elasticloadbalancing:ModifyLoadBalancerAttributes | aws-elb-load-balancer-attributes-modify | Modify the attributes of a specified load balancer |
| rds:AddTagsToResource |  | Add unique tags to a specific Amazon RDS resource, such as to find them at a later stage |
| rds:CreateTenantDatabase |  | Create a new tenant database within a RDS DB instance |
| rds:ModifyDBCluster | aws-rds-db-cluster-modify | Modify a DB cluster for remediation of an issue detected due to the rule: AWS RDS DB Cluster Publicly Accessible |
| rds:ModifyDBClusterSnapshotAttribute | aws-rds-db-cluster-snapshot-attribute-modify | Modify DB cluster snapshot attributes for remediation of an issue detected due to the rule: AWS RDS DB Cluster Snapshot Publicly Accessible |
| rds:ModifyDBInstance | aws-rds-db-instance-modify | Modify a DB instance for remediation of an issue detected due to the rule: AWS RDS DB Instance Publicly Accessible |
| rds:ModifyDBSnapshotAttribute | aws-rds-db-snapshot-attribute-modify | Modify DB snapshot attributes for remediation of an issue detected due to the rule: AWS RDS DB Snapshot Publicly Accessible |
| rds:ModifyEventSubscription | aws-rds-event-subscription-modify | Modify an existing RDS event subscription |
| s3:PutBucketAcl | aws-s3-bucket-acl-put | Block public ACLs for remediation of an issue detected due to the rule: S3 Bucket Public Read Access. By applying a different policy, the permission can be used to explicitly deny public access or removes public access entirely. |
| s3:PutBucketLogging | aws-s3-bucket-logging-put | Configure server access logging for remediation of an issue detected due to the rule: AWS S3 Bucket Logging Disabled |
| s3:PutBucketPolicy | aws-s3-bucket-policy-put | Block public policy for remediation of an issue detected due to the rule: S3 Bucket Policy Public Access |
| s3:PutBucketPublicAccessBlock | aws-s3-public-access-block-update | Block public access for remediation of an issue detected due to the rule: AWS S3 Bucket Public Access Block Disabled |
| s3:PutBucketVersioning | aws-s3-bucket-versioning-put | Enable versioning for remediation of an issue detected due to the rule: AWS S3 Bucket Versioning Disabled |
| s3:GetBucketPolicy | aws-s3-bucket-policy-get | Retrieve the resource-based access policy attached to an Amazon S3 bucket |
| s3:GetBucketPublicAccessBlock | aws-s3-public-access-block-get | Block public access for remediation of an issue detected due to the rule: AWS S3 Bucket Public Access Block Disabled |
| s3:GetEncryptionConfiguration | aws-s3-bucket-encryption-get | Retrieve the default server-side encryption settings applied to a bucket |
| s3:DeleteBucketPolicy | aws-s3-bucket-policy-delete | Remove the entire access policy associated with a bucket |
| s3:PutObject | aws-s3-file-upload | Upload a new object or replace an existing object within a bucket |
| s3:GetObject | aws-s3-file-download | Download an object from a bucket |
| s3:GetBucketWebsite | aws-s3-bucket-website-get | Retrieve of the configuration details for static website hosting on a bucket |
| s3:GetBucketAcl | aws-s3-bucket-acl-get | Retrieve of the Access Control List (ACL) that controls access to a bucket |
| s3:DeleteBucketWebsite | aws-s3-bucket-website-delete | Remove the static website configuration from a bucket |
| s3:PutBucketOwnershipControls | aws-s3-bucket-ownership-controls-put | Define and enforce the ownership controls configuration for a bucket |
| ec2:AuthorizeSecurityGroupIngress | aws-ec2-security-group-ingress-authorize | Allow inbound network access for remediation of an issue detected due to the rule: AWS EC2 Security Group with Ingress Rule Not Authorized |
| ec2:ModifyImageAttribute | aws-ec2-image-attribute-modify | Revoke image launch permissions for remediation of an issue detected due to the rule: AWS EC2 AMI Publicly Accessible |
| ec2:ModifyInstanceAttribute | aws-ec2-instance-attribute-modify | Disassociate a security group for mitigation of an issue detected due to the rule: AWS EC2 instance with network path from the internet (0.0.0.0/0) |
| ec2:ModifyInstanceMetadataOptions | aws-ec2-instance-metadata-options-modify | Modify EC2 instance metadata options for remediation of an issue detected due to the rule: AWS EC2 Instance Not Using IMDSv2 |
| ec2:ModifySnapshotAttribute | aws-ec2-snapshot-attribute-modify | Revoke snapshot restore permissions for remediation of an issue detected due to the rule: AWS EC2 Snapshot Publicly Accessible |
| ec2:RevokeSecurityGroupEgress | aws-ec2-security-group-egress-revoke | Block outbound traffic for remediation of an issue detected due to the rule: AWS EC2 instance with network path to the internet (0.0.0.0/0) |
| ec2:RevokeSecurityGroupIngress | aws-ec2-security-group-ingress-revoke | Block inbound network access for remediation of an issue detected due to the rule: AWS EC2 instance with network path from the internet (0.0.0.0/0) |
| ec2:CreateSecurityGroup | aws-ec2-security-group-create | Create a new network security group |
| ec2:DeleteSecurityGroup | aws-ec2-security-group-delete | Delete an existing network security group |
| ec2:DescribeSecurityGroups | aws-ec2-security-groups-describe | Retrieve information about the security groups in the account |
| ec2:DescribeInstances | aws-ec2-instances-describe | Retrieve information about the EC2 instances in the account |
| ec2:AuthorizeSecurityGroupEgress |  | Authorize outbound network access for a security group |
| ec2:StartInstances | aws-ec2-instances-start | Start one or more stopped EC2 instances |
| ec2:StopInstances | aws-ec2-instances-stop | Stop one or more stopped EC2 instances |
| ec2:TerminateInstances | aws-ec2-instances-terminate | Terminate one or more running EC2 instances |
| ec2:RunInstances | aws-ec2-instances-run | Running (launch) a new EC2 instance |
| ec2:CreateTags | aws-ec2-tags-create | Add tags for an EC2 instance |
| ec2:CreateSnapshot | aws-ec2-snapshot-create | Create a point-in-time snapshot of an EBS volume/disk |
| ec2:DescribeVpcs | aws-ec2-vpcs-describe | Retrieve information about the VPCs in the account |
| ec2:DescribeSubnets | aws-ec2-subnets-describe | Retrieve information about the subnets in the account |
| ec2:DescribeIpamResourceDiscoveries | aws-ec2-ipam-resource-discoveries-describe | Retrieve details about IPAM resource discovery configurations |
| ec2:DescribeIpamResourceDiscoveryAssociations | aws-ec2-ipam-resource-discovery-associations-describe | Retrieve details about associations between IPAM and resource discoveries |
| ec2:DescribeImages | aws-ec2-latest-ami-get | Retrieve information about AMIs or container images |
| ec2:CreateNetworkAcl | aws-ec2-network-acl-create | Create a new network access control list (ACL) |
| ec2:GetIpamDiscoveredPublicAddresses | aws-ec2-ipam-discovered-public-addresses-get | Retrieve discovered public IP addresses from IPAM |
| ec2:ModifySubnetAttribute | aws-ec2-subnet-attribute-modify | Modify a specific attribute of a subnet |
| cloudtrail:UpdateTrail | aws-cloudtrail-trail-update | Disable CloudTrail log file validation for remediation of an issue detected due to the rule: AWS CloudTrail Log File Validation Disabled |
| cloudtrail:StartLogging | aws-cloudtrail-logging-start | Start logging for remediation of an issue detected due to the rule: AWS CloudTrail Logging Stopped |
| cloudtrail:DescribeTrails | aws-cloudtrail-trails-describe | Retrieve information about the trails configured in CloudTrail |
| eks:UpdateClusterConfig | aws-eks-cluster-config-update | Update EKS cluster configuration for remediation of an issue detected due to the rule: AWS EKS Cluster Public Access Enabled |
| eks:DescribeCluster | aws-eks-cluster-describe | Retrieve detailed information about a specific EKS cluster |
| eks:AssociateAccessPolicy | aws-eks-access-policy-associate | Associatie an access policy with an EKS cluster |
| ecs:UpdateClusterSettings | aws-ecs-cluster-settings-update | Modifiy the settings for an existing ECS cluster |
| iam:DeleteLoginProfile | aws-iam-login-profile-delete | Delete a login profile for remediation of an issue detected due to the rule: AWS IAM User with Active Console Password |
| iam:GetAccountAuthorizationDetails |  | Retrieve information about all IAM users, roles, policies, and groups in the account |
| iam:GetAccountPasswordPolicy | aws-iam-account-password-policy-get | Get account password policy for investigation of an issue detected due to the rule: AWS IAM Account Password Policy Not Configured |
| iam:PassRole |  | Pass an IAM role to an AWS service by an entity |
| iam:PutUserPolicy | aws-iam-user-policy-put | Suspend access for user for mitigation of an issue detected due to the rule: AWS IAM Users with Administrator Access Permissions |
| iam:RemoveRoleFromInstanceProfile | aws-iam-role-from-instance-profile-remove | Remove role from instance profile for remediation of an issue detected due to the rule: AWS EC2 with IAM instance profile |
| iam:UpdateAccessKey | aws-iam-access-key-update | Deactivate access key for remediation of an issue detected due to the rule: AWS IAM User Active Access Keys Unused for 90 days |
| iam:UpdateAccountPasswordPolicy | aws-iam-account-password-policy-update | Configure account password policy for remediation of an issue detected due to the rule: AWS IAM Account Password Policy Not Configured |
| kms:CreateGrant |  | Enable the created EC2 instance to send a CreateGrant request to the AWS KMS so that it can share the encrypted snapshot, such as with an outpost account (re-encryption) |
| kms:Decrypt |  | Decrypt ciphertext using a customer master key (CMK) |
| kms:DescribeKey |  | Retrieve detailed information about a customer master key (CMK) |
| kms:GenerateDataKey |  | Generate a data key for client-side encryption |
| kms:EnableKeyRotation | aws-kms-key-rotation-enable | Activate automatic rotation for a customer master key (CMK) |
| lambda:GetFunctionConfiguration |  | Retrieve the configuration details for a Lambda function |
| lambda:GetFunctionUrlConfig | aws-lambda-function-url-config-get | Retrieve the configuration details for a Lambda function URL |
| lambda:GetPolicy | aws-lambda-policy-get | Retrieve the access policy associated with a Lambda function |
| lambda:InvokeFunction | aws-lambda-invoke | Execute a specified Lambda function |
| lambda:UpdateFunctionUrlConfig | aws-lambda-function-url-config-update | Update the configuration details for a Lambda function URL |
| secretsmanager:CreateSecret |  | Create a new secret in Secrets Manager |
| secretsmanager:RotateSecret |  | Set up or initiate rotation for a secret |
| secretsmanager:TagResource |  | Add tags to a secret or resource in Secrets Manager |
| ce:GetCostAndUsage |  | Retrieve detailed cost and usage data for the account |
| ce:GetCostForecast |  | Retrieve a forecast of future costs and usage |
| budgets:DescribeBudgets |  | Retrieve the configured budgets for the account |
| budgets:DescribeNotificationsForBudget |  | Retrieve the notification details associated with a specific budget |

Serverless Scan

| Permission | Scope | Purpose |
| --- | --- | --- |
| lambda:GetFunction | All Lambda functions in the account | View the configuration and metadata of a specific Lambda function and download the source code |
| lambda:GetFunctionConfiguration | All Lambda functions in the account | View only the configuration of a specific Lambda function |
| lambda:GetLayerVersion | All Lambda layers in the account | View the details of a specific version of a Lambda layer and download their source code |
| iam:GetRole | All IAM roles in the account | View details of a specific IAM role and assume the role of the monitored account from an outpost |

Outposts

| **Permission** | **Scope** | **Purpose** |
| --- | --- | --- |
| ec2:AllocateAddress | Resources with the request tag: `managed_by: paloaltonetworks` | Allocate a static public IP address for use with a proxy VM |
| ec2:AssociateAddress | Resources with the request tag: `managed_by: paloaltonetworks` | Associate a static public IP address with a network interface for use with a proxy VM |
| ec2:AttachVolume | Volumes in the specified AWS account with the `managed_by: paloaltonetworks` | Attach volume to scanner VM during deployment |
| ec2:CreateNetworkInterface | Any region in the specified AWS account with the tag `managed_by: paloaltonetworks`; applies to network interfaces, subnets, and security groups. | Create a network interface for a scanner or proxy VM within managed subnets and security groups |
| ec2:CreateTags | Resources with the request tag: managed_by: `paloaltonetworks` tag | For adding tags to all resources |
| ec2:CreateVolume | Volumes with the request tag: managed_by: `paloaltonetworks` tag | Perform the create volume operation in EC2 |
| ec2:CreateVpcEndpoint | The VPC endpoint being created must: Have the request tag: `managed_by: paloaltonetworks`; Only reference Palo Alto Networks-managed network components (VPCs, security groups, subnets, and route tables, and so on, with the request tag: `managed_by: paloaltonetworks`); Connect to an approved VpceServiceName service as defined by policy | Create endpoints that are used by scanners to access managed services using private IP addresses |
| ec2:DeleteNetworkInterface | Network interfaces with the request resource tag: `managed_by: paloaltonetworks` | Perform the delete network interface operation in EC2 |
| ec2:DeleteVolume | Volumes in the specified account with the request tag: `managed_by: paloaltonetworks` | Perform the delete volume operation in EC2 |
| ec2:DeleteVpcEndpoints | VPC endpoints in the specified account with the resource tag: `managed_by: paloaltonetworks` | Perform the delete VPC endpoints operation in EC2 |
| ec2:DescribeAccountAttributes | \* | Describe account attributes in EC2 |
| ec2:DescribeAddresses | \* | Perform the describe addresses operation in EC2 |
| ec2:DescribeAvailabilityZones | \* | Perform the describe availability zones operation in EC2 |
| ec2:DescribeImages | \* | Perform the describe images operation in EC2 |
| ec2:DescribeInstances | \* | Perform the describe instances operation in EC2 |
| ec2:DescribeInstanceTypes | \* | Perform the describe instance types operation in EC2 |
| ec2:DescribeKeyPairs | \* | Perform the describe key pairs operation in EC2 |
| ec2:DescribeNetworkInterfaces | \* | Perform the describe network interfaces operation in EC2 |
| ec2:DescribeSecurityGroups | \* | Perform the describe security groups operation in EC2 |
| ec2:DescribeSubnets | \* | Perform the describe subnets operation in EC2 |
| ec2:DescribeVolumeAttribute | Volumes in the specified account with the request tag: `managed_by: paloaltonetworks` | Perform the describe volume attribute operation in EC2 |
| ec2:DescribeVolumes | \* | Perform the describe volumes operation in EC2 |
| ec2:DescribeVolumesModifications | \* | Perform the describe volumes modifications operation in EC2 |
| ec2:DescribeVolumeStatus | \* | Perform the describe volume status operation in EC2 |
| ec2:DescribeVpcEndpoints | \* | Perform the describe VPC endpoints operation in EC2 |
| ec2:DescribeVpcs | \* | Perform the describe VPC operation in EC2 |
| ec2:DetachVolume | Volumes in the specified account with the request tag: `managed_by: paloaltonetworks` | Perform the detach volume operation in EC2 |
| ec2:DisassociateAddress | Volumes with the resource tag: `managed_by: paloaltonetworks` | Perform the disassociate address operation in EC2 |
| ec2:GetSpotPlacementScores | \* | Perform the get spot placement scores operation for prioritization of an availability zone for spot instance deployment |
| ec2:ImportVolume | Volumes in the specified account with the request tag: `managed_by: paloaltonetworks` | Perform the import volume operation in EC2 |
| ec2:ModifyInstanceAttribute | Instances in the specified account, where both of the following conditions are met: The target EC2 instance has the resource tag: `managed_by: paloaltonetworks`; The modify action must be specifically related to changing the value of the SourceDestCheck attribute | Perform the modify instance attribute operation in EC2 |
| ec2:ModifyVolume\* | Volumes in the specified account with the request tag: `managed_by: paloaltonetworks` | Perform the modify volume\* operation in EC2 |
| ec2:ReleaseAddress | Resources with the resource tag: `managed_by: paloaltonetworks` | Perform the release address operation in EC2 |
| ec2:RunInstances | The new EC2 instance must be launched into a network environment (VPC, subnets, security groups, and key pairs) that is already designated as `managed_by: paloaltonetworks`, and if the request correctly specifies that the newly-created instance, network interfaces, and volumes are also tagged as `managed_by: paloaltonetworks`. The use of source snapshots for volumes is permitted without any tagging restrictions | Run (launch) a scanner and/or proxy VM |
| ec2:TerminateInstances | EC2 instances with the tag: `managed_by: paloaltonetworks` | Perform the terminate instances operation in EC2 |
| iam:CreateServiceLinkedRole | The role being created must be exclusively for the Amazon Redshift service | Perform the create service linked role operation in IAM |
| iam:PassRole | Limited to the specific list of roles designated as 'scanner roles' within the account | Perform the pass role operation in IAM |
| kms:\* | Keys must be accessed through a legitimate, identified AWS service (such as S3, RDS, EC2, and so on) | Perform the \* operation in KMS |
| kms:ReEncryptFrom | The request must be initiated by the Amazon EC2 service and be contextually tied to the encryption of an EBS volume or snapshot | Perform the re-encrypt from operation in KMS |
| redshift-data:BatchExecuteStatement | \* | Execute a list of SQL statements in a single batch |
| redshift-data:CancelStatement | \* | Stop a currently running SQL statement or a batch of statements |
| redshift-data:Describe\* | \* | Provide detailed status and information about a previously executed SQL statement |
| redshift-data:ExecuteStatement | \* | Run a single SQL statement asynchronously against a Redshift cluster or workgroup |
| redshift-data:GetStatementResult | \* | Retrieve the result set (data) from a SQL statement that has finished execution |
| redshift-data:List\* | \* | List the IDs of all SQL statements executed within the past week |
| redshift-serverless:CreateNamespace | Creation request includes tag: `managed_by: paloaltonetworks` | Create a Redshift Serverless namespace |
| redshift-serverless:CreateWorkgroup | Creation request includes tag: `managed_by: paloaltonetworks` | Create a Redshift Serverless workgroup   |
| redshift-serverless:DeleteNamespace | Namespaces tagged with: `managed_by: paloaltonetworks` | Permanently delete a Redshift Serverless namespace and all associated data |
| redshift-serverless:DeleteWorkgroup | Workgroup tagged with: `managed_by: paloaltonetworks` | Delete a Redshift Serverless workgroup, removing its associated compute resources |
| redshift-serverless:GetCredentials | \* | Request temporary credentials to connect directly to the database within a workgroup |
| redshift-serverless:GetNamespace | \* | Retrieve configuration and status details for a specific namespace |
| redshift-serverless:GetWorkgroup | \* | Retrieve configuration and status details for a specific workgroup |
| redshift-serverless:ListNamespaces | \* | List summary information for all namespaces in the current account and region |
| redshift-serverless:ListTagsForResource | \* | List all the tags currently attached to a specified Redshift Serverless resource |
| redshift-serverless:ListWorkgroups | \* | List summary information for all workgroups in the current account and region |
| redshift-serverless:RestoreFromSnapshot | \* | Create a new namespace and restore its data from a specified backup snapshot |
| redshift-serverless:TagResource | \* | Apply, modify, or update tags on a Redshift Serverless resource. This is crucial for cost allocation and governance |
| s3:DeleteObject | The bucket must be owned by the user's current AWS account. | Delete a specified object from artifact bucket |
| s3:GetBucketPolicy | The bucket must be owned by the user's current AWS account. | Retrieve the resource-based access policy attached to an Amazon S3 bucket |
| s3:GetObject | Users can read (download) any file from the `${cf_template_bucket}` Also, users can read files from any S3 bucket they own that begins with the prefix `${bucket_name}-`, with specific access paths defined for the general bucket contents and files within the `output/`, `input/`, and `output/logs/` folders | Retrieve the contents of a specified object from an Amazon S3 bucket |
| s3:GetObjectAttributes | Users can read the metadata (attributes) of files from any S3 bucket they own that begins with the prefix: `${bucket_name}-` This permission applies to files located anywhere within that bucket, but the specific paths are detailed as the general bucket contents and files within the `output/`, `input/`, and `output/logs/` folders | Fetch system-defined metadata and object attributes for an S3 object |
| s3:ListBucket | Users can view: The list of contents for the specific `${cf_template_bucket}`; The contents of any S3 bucket they own that has a name starting with the prefix `${bucket_name}-` | List the objects or common prefixes in an Amazon S3 bucket |
| s3:PutBucketPolicy | S3 buckets that users own and whose name begins with the prefix: `${bucket_name}-` | Apply or update a resource-based access policy in an Amazon S3 bucket |
| s3:PutObject | Users can Upload files to the specific `${cf_template_bucket}` without restriction.; Upload files to any S3 bucket users own that begins with the prefix: `${bucket_name}-` This upload permission applies broadly to the general contents of these prefixed buckets, including files placed specifically in the `input/`, `output/`, and `output/logs/` subfolders | Upload or replace an object in an Amazon S3 bucket |
| sqs:DeleteMessage | Messages from any SQS queue that is already tagged with `managed_by: paloaltonetworks` and whose name begins with the prefix: `${queue_prefix}-` | For bucket communications |
| sqs:GetQueueUrl | URL for any SQS queue that is already tagged with managed_by: paloaltonetworks and whose name begins with the prefix: `${queue_prefix}-` | For bucket communications |
| sqs:ListQueues | URL for any SQS queue that is already tagged with `managed_by: paloaltonetworks` and whose name begins with the prefix: `${queue_prefix}-` | For bucket communications |
| sqs:ReceiveMessage | Messages from any SQS queue that is already tagged with `managed_by: paloaltonetworks` and whose name begins with the prefix: `${queue_prefix}-` | For bucket communications |
| ssm:AddTagsToResource | SSM Parameter named cortex-outposts-..., but only if the tagging request itself includes the `managed_by:` `paloaltonetworks` tag | Perform the add tags to resource operation in SSM. |
| ssm:DeleteParameter | SSM parameter named `cortex-outposts-...`, but only if that specific parameter resource is already tagged with `managed_by: paloaltonetworks` | Delete a secret that was used for unmanaged container image registries by key |
| ssm:GetParameter | SSM parameter named `cortex-outposts-...`, but only if that specific parameter resource is already tagged with `managed_by: paloaltonetworks` | This outpost-specific permission's purpose is to get a secret by key for unmanaged container image registries |
| ssm:PutParameter | Group of SSM parameter store parameters in a specified AWS account with the request tag: `managed_by: paloaltonetworks` | Put secret for unmanaged container image registries |
| sts:AssumeRole | Resource belongs to a different AWS account than the current account | Provide temporary security credentials by assuming the specified IAM role through STS |

#### Google Cloud Platform provider permissions

List of Google Cloud Platform provider permissions for Cortex Cloud.

When onboarding Google Cloud Platform, Cortex Cloud creates an authentication template that requests the permissions needed for monitoring your cloud environment. Depending on which security capabilities you select in the onboarding wizard, different permissions are requested. The following tables are organized by security module and list the CSP permissions being requested as well as the purpose (and where relevant, the scope):

-   Agentless Disk Scanning 
    
-   DSPM 
    
-   Discovery Engine 
    
-   Log Collection 
    
-   Registry Scan 
    
-   Automations 
    
-   Serverless Scan 
    
-   Outposts 
    

Agentless Disk Scanning

| Permission | Scope | Purpose |
| --- | --- | --- |
| compute.disks.create | Disks with "cortex-scan-" prefix | Create disk from image |
| compute.disks.delete | Disks with "cortex-scan-" prefix | Delete created disk |
| compute.disks.get | Disks with "cortex-scan-" prefix | Retrieve disk creation status |
| compute.disks.setLabels | Disks with "cortex-scan-" prefix | Set label for disks |
| compute.images.get | Images with "cortex-scan-" prefix | Retrieve image metadata |
| compute.snapshots.create | Snapshots with "cortex-scan-" prefix | Create disk snapshot |
| compute.snapshots.delete | Snapshots with "cortex-scan-" prefix | Delete scanned snapshot |
| compute.snapshots.get | Snapshots with "cortex-scan-" prefix | Retrieve snapshot creation status |
| compute.snapshots.setLabels | Snapshots with "cortex-scan-" prefix | Add snapshot labels for a cost visibility |
| compute.snapshots.useReadOnly | Snapshots with "cortex-scan-" prefix | Attach snapshot to a scanner VM |

DSPM

| Permission | Scope | Purpose |
| --- | --- | --- |
| artifactregistry.repositories.downloadArtifacts | All Artifact Registry Repositories in the project (or higher) | Download or retrieve artifacts (like container images and packages) from an Artifact Registry repository. This is necessary for a DSPM scanner to inspect the content for security and compliance assessment. |
| bigquery.bireservations.get | All BigQuery instances | Get BigQuery bireservations for classification purposes |
| bigquery.capacityCommitments.get | All BigQuery instances | Get BigQuery capacity commitments for classification purposes |
| bigquery.capacityCommitments.list | All BigQuery instances | List BigQuery capacity commitments for classification purposes |
| bigquery.config.get | All BigQuery instances | Get BigQuery configurations for classification purposes |
| bigquery.datasets.get | All BigQuery instances | Get BigQuery datasets for classification purposes |
| bigquery.datasets.getIamPolicy | All BigQuery instances | Get BigQuery dataset IAM policies for classification purposes |
| bigquery.models.getData | All BigQuery instances | List BigQuery model data for classification purposes |
| bigquery.models.getMetadata | All BigQuery instances | Get BigQuery model metadata for classification purposes |
| bigquery.models.list | All BigQuery instances | List BigQuery models for classification purposes |
| bigquery.routines.get | All BigQuery instances | Get BigQuery routines for classification purposes |
| bigquery.routines.list | All BigQuery instances | List BigQuery routines for classification purposes |
| bigquery.tables.export | All BigQuery instances | Export BigQuery tables |
| bigquery.tables.get | All BigQuery instances | Get BigQuery tables for classification purposes |
| bigquery.tables.getData | All BigQuery instances | Get BigQuery table data for classification purposes |
| bigquery.tables.getIamPolicy | All BigQuery instances | Get BiqQuery table IAM policies for classification purposes |
| bigquery.tables.list | All BigQuery instances | List BigQuery tables for classification purposes |
| bigtable.backup.create | All Bigtable instances | Create Bigtable backups for standard cloud and outpost deployments |
| bigtable.backup.delete | All Bigtable instances | Delete Bigtable backups on standard cloud and outpost deployments |
| bigtable.backups.get | All Bigtable instances | Get Bigtable backup metadata for standard cloud, outpost, and scanner-based deployments |
| bigtable.backups.list | All Bigtable instances | List Bigtable backups for standard cloud, outpost, and scanner-based deployments |
| bigtable.backups.restore | All Bigtable instances | Restore Bigtable from backup |
| bigtable.clusters.get | All Bigtable instances | Get Bigtable cluster metadata for standard cloud and scanner-based deployments |
| bigtable.clusters.list | All Bigtable instances | List Bigtable clusters for standard cloud and scanner-based deployments |
| bigtable.instances.get | All Bigtable instances | Get Bigtable instance metadata for standard cloud and scanner-based deployments |
| bigtable.instances.list | All Bigtable instances | List Bigtable instances for standard cloud and scanner-based deployments |
| bigtable.tables.get | All Bigtable instances | Get Bigtable table metadata for standard cloud and scanner-based deployments |
| bigtable.tables.list | All Bigtable instances | List Bigtable instances for standard cloud, outpost, and scanner-based deployments |
| cloudsql.backupRuns.create | All Cloud SQL instances | Create CloudSQL backup runs for classification purposes for standard cloud and outpost deployments |
| cloudsql.backupRuns.delete | All Cloud SQL instances | Delete CloudSQL backup runs for standard cloud and outpost deployments |
| cloudsql.backupRuns.get | All CloudSQL instances | Get CloudSQL backup run metadata for classification purposes for standard cloud, outpost, and scanner-based deployments |
| cloudsql.backupRuns.list | All Cloud SQL instances | List CloudSQL backup runs for classification purposes for standard cloud and outpost deployments |
| roles/cloudfunctions.viewer (Built-in role, managed by GCP) | All Cloud Functions in the project (or higher) | Read the configuration and metadata of all Cloud Functions resources in the project. This is necessary for inventory and security posture assessment. |
| roles/container.clusterViewer (Built-in role, managed by GCP) | All Google Kubernetes Engine (GKE) Clusters in the project (or higher) | Read the configuration and status of all Google Kubernetes Engine (GKE) clusters in the project for posture assessment |
| roles/firebaserules.viewer (Built-in role, managed by GCP) | All Firebase Security Rules in the project (or higher) | Read the configuration and contents of Firebase Security Rules for posture assessment |
| roles/storage.objectViewer (Built-in role, managed by GCP) | All objects (files) in all Cloud Storage buckets in the project (or higher) | Read the data and metadata of objects (files) in Cloud Storage buckets, but cannot modify or delete them. This is required for data scanning and inventory. |

Discovery Engine

| Permission | Purpose |
| --- | --- |
| accesscontextmanager.accessLevels.list | List Access Context Manager (GCP ACM) access levels |
| accesscontextmanager.accessPolicies.list | List Access Context Manager (GCP ACM) policies |
| accesscontextmanager.servicePerimeters.list | List Access Context Manager (GCP ACM) service perimeters |
| aiplatform.batchPredictionJobs.list | List AI Platform batch prediction jobs |
| aiplatform.nasJobs.list | List AI Platform Neural Architecture Search (NAS) jobs |
| analyticshub.dataExchanges.list | List Analytics Hub data exchanges |
| analyticshub.listings.getIamPolicy | Get IAM policy for Analytics Hub listings |
| analyticshub.listings.list | List Analytics Hub listings |
| baremetalsolution.instances.list | List Bare Metal Solution instances |
| baremetalsolution.luns.list | List Bare Metal Solution LUNs (Logical Unit Numbers) |
| baremetalsolution.networks.list | List Bare Metal Solution networks |
| baremetalsolution.nfsshares.list | List Bare Metal Solution NFS shares |
| baremetalsolution.volumes.list | List Bare Metal Solution volumes |
| cloudscheduler.jobs.list | List Cloud Scheduler jobs |
| cloudsecurityscanner.scans.list | List Cloud Security Scanner scans |
| composer.imageversions.list | List Composer image versions |
| datamigration.connectionprofiles.getIamPolicy | Get IAM policy for data migration connection profiles |
| datamigration.connectionprofiles.list | List data migration connection profiles |
| datamigration.conversionworkspaces.getIamPolicy | Get IAM policy for data migration conversion workspaces |
| datamigration.conversionworkspaces.list | List data migration conversion workspaces |
| datamigration.migrationjobs.getIamPolicy | Get IAM policy for data migration jobs |
| datamigration.migrationjobs.list | List data migration jobs |
| datamigration.privateconnections.getIamPolicy | View the access policy for a Database Migration Service private connection |
| datamigration.privateconnections.list | List data migration private connections |
| notebooks.locations.list | List notebook locations |
| notebooks.schedules.list | List notebook schedules |
| roles/cloudfunctions.viewer (Built-in role, managed by GCP) | Read the configuration and metadata of all Cloud Functions resources in the project. This is necessary for inventory and security posture assessment. |
| roles/container.clusterViewer (Built-in role, managed by GCP) | Read the configuration and status of all Google Kubernetes Engine (GKE) clusters in the project for posture assessment |
| roles/firebaserules.viewer (Built-in role, managed by GCP) | Read the configuration and contents of Firebase Security Rules for posture assessment |
| roles/storage.objectViewer (Built-in role, managed by GCP) | Read the data and metadata of objects (files) in Cloud Storage buckets, but cannot modify or delete them. This is required to view the content and details of all stored data assets for inventory. |
| roles/viewer (Built-in role, managed by GCP) | Grant read-only access to view resources and data across all Google Cloud services within the project. This is the broadest read permission required for comprehensive asset inventory. |
| run.jobs.getIamPolicy | Get IAM policy of Cloud Run jobs |
| run.jobs.list | List Cloud Run jobs |
| run.services.list | List Cloud Run services |
| serviceusage.services.use | Use cloud services |
| storage.buckets.get | Get metadata of a storage bucket |
| storage.buckets.getIamPolicy | Get IAM policy of a storage bucket |
| storage.buckets.list | List storage buckets |
| storage.buckets.listEffectiveTags | List effective tags of storage buckets |
| storage.buckets.listTagBindings | List tag bindings of storage buckets |
| storage.objects.getIamPolicy | Get IAM policy of storage objects |

Log Collection

| Permission | Purpose |
| --- | --- |
| roles/pubsub.subscriber (Built-in role, managed by GCP) | Grants access to consume messages from the subscription where audit logs are stored |

Registry Scan

| Permission | Scope | Purpose |
| --- | --- | --- |
| roles/iam.serviceAccountTokenCreator | Access to this permission is limited to a specific Service Account defined within an outpost. No account other than the defined Service Account can access the permission and access is limited to the permissions defined on the target SA. | Impersonate to a specific service account |
| artifactregistry.repositories.downloadArtifacts | All artifacts listed in the GAR of the customer's account | Needed in order to download images from the Google Artifact Registry (GAR) |

Automations

|   Permission | Command that requires this permission | Purpose |
| --- | --- | --- |
| compute.firewalls.create | gcp-compute-firewall-insert |  |
| compute.firewalls.get | gcp-compute-firewall-get |  |
| compute.firewalls.list | gcp-compute-firewall-list |  |
| compute.firewalls.update |  |  |
| compute.images.get | gcp-compute-image-get |  |
| compute.instanceGroups.get | gcp-compute-instance-group-get |  |
| compute.instances.get | gcp-compute-instance-get |  |
| compute.instances.list | gcp-compute-instances-list |  |
| compute.instances.setLabels | gcp-compute-instance-labels-set |  |
| compute.instances.setMetadata |  |  |
| compute.instances.setServiceAccount |  |  |
| compute.instances.setTags | gcp-compute-network-tag-set |  |
| compute.instances.start | gcp-compute-instance-start |  |
| compute.instances.stop | gcp-compute-instance-stop |  |
| compute.networks.create | gcp-compute-network-insert |  |
| compute.networks.get | gcp-compute-network-get |  |
| compute.networks.list | gcp-compute-network-list |  |
| compute.networks.updatePolicy |  |  |
| compute.regions.get | gcp-compute-region-get |  |
| compute.snapshots.get | gcp-compute-snapshot-get |  |
| compute.snapshots.list | gcp-compute-snapshots-list |  |
| compute.subnetworks.get |  |  |
| compute.subnetworks.list |  |  |
| compute.subnetworks.setPrivateIpGoogleAccess |  |  |
| compute.subnetworks.update |  |  |
| compute.zones.get | gcp-compute-zone-get |  |
| container.clusters.get |  |  |
| container.clusters.list |  |  |
| container.clusters.update |  |  |
| resourcemanager.projects.getIamPolicy |  |  |
| resourcemanager.projects.setIamPolicy |  |  |
| storage.buckets.get | gcp-storage-bucket-get; gcp-storage-bucket-policy-list; gcp-storage-bucket-policy-set |  |
| storage.buckets.getIamPolicy | gcp-storage-bucket-list; gcp-storage-bucket-get; gcp-storage-bucket-policy-list; gcp-storage-bucket-policy-set |  |
| storage.buckets.getIpFilter | gcp-storage-bucket-list; gcp-storage-bucket-get |  |
| storage.buckets.list | gcp-storage-bucket-list |  |
| storage.buckets.setIamPolicy | gcp-storage-bucket-policy-set; gcp-storage-bucket-object-policy-set |  |
| storage.buckets.update | gcp-storage-bucket-policy-set |  |
| storage.objects.getIamPolicy | gcp-storage-bucket-objects-list; gcp-storage-bucket-object-policy-list |  |
| storage.objects.list | gcp-storage-bucket-objects-list |  |
| cloudidentity.groups.memberships.delete | gcp-iam-group-membership-delete | Revoke permissions from the Access Control List (ACL). This is to remediate an issue detected by the rule: "GCP Storage buckets are publicly accessible to all authenticated users" |
| cloudasset.assets.searchAllResources | gcp-compute-instances-aggregated-list-by-ip | Search and retrieve the metadata for all Google Cloud resources (VMs, buckets, networks, and so on) within a specified scope (project, folder, or organization). This is required for comprehensive asset discovery and to gain a unified, auditable view of the entire GCP environment. |

Serverless Scan

| Permission | Purpose |
| --- | --- |
| cloudfunctions.functions.get | Read the metadata of a specific Cloud function. Needed for reading function metadata. |
| cloudfunctions.functions.sourceCodeGet | Read and download the source code of a deployed Cloud function. Needed to download function source code for scanning. |
| storage.objects.get | Read the data of a specific object in a Cloud storage bucket. Needed to download function source code for scanning. |

Outposts

| Permission | Purpose |
| --- | --- |
| roles/compute.admin | Grant full administrative control over Compute Engine resources (VMs, disks, networks, and so on), but not the project-wide IAM |
| roles/bigtable.admin | Grant full administrative control over Bigtable instances, clusters, and tables |
| roles/bigtable.reader | Read all data and metadata from Bigtable tables. This is necessary for Data Security Posture Management (DSPM) scanners so they can get data from the customer environment |
| roles/cloudsql.client | Connect to and execute data operations (read/write) on Cloud SQL databases |
| roles/iam.serviceAccountUser | Allow a user or service to delegate its identity by acting as a service account for running workloads (for example, VMs, Cloud Run, or GKE) |
| roles/iam.serviceAccountTokenCreator | Allow a user or service to impersonate a service account directly by creating access tokens, signing blobs, or signing JSON Web Tokens (JWTs). Useful for workload identity federation or automation. |
| roles/cloudkms.cryptoKeyEncrypterDecrypter | Encrypt and decrypt data using a specific Cloud Key Management Service (Cloud KMS) cryptographic key |
| roles/cloudkms.viewer | Read the details and metadata of cryptographic keys and key rings in Cloud KMS |
| roles/secretmanager.secretAccessor | For use by outpost only: Allow reading secret values from the Secret Manager |
| roles/servicenetworking.serviceAgent | Allow the Google-managed service accounts to manage private service networking connections |
| roles/pubsub.subscriber | Consume messages from a Pub/Sub subscription for inter-service communication (for example, bucket events) |
| bigquery.jobs.create | Create an export job to transfer data from BigQuery to Google Cloud Storage (GCS). Used from ST. |
| cloudsql.databases.create | Create databases as part of the instance restore. Used from ST. |
| cloudsql.databases.delete | Delete databases as part of the instance cleanup operation. Used from ST. |
| cloudsql.databases.update | Modify database properties as part of the instance restore operation. Used from ST. |
| cloudsql.databases.get | Retrieve database details as part of the instance restore operation. Used from ST. |
| cloudsql.databases.list | List databases as part of the instance restore operation. Used from ST. |
| cloudsql.instances.list | List Cloud SQL instances as part of the instance restore operation. Used from ST. |
| cloudsql.instances.get | Retrieve instance details as part of the instance restore operation. Used from ST. |
| cloudsql.instances.connect | Connect to a Cloud SQL instance for data scanning. Used from scanners. |
| cloudsql.instances.create | Create a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| cloudsql.instances.delete | Delete Cloud SQL instances as part of the instance cleanup operation. Used from ST. |
| cloudsql.instances.login | Log into a Cloud SQL instance for data scanning. Used from scanners. |
| cloudsql.instances.restart | Restart a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| cloudsql.instances.restoreBackup | Restore a Cloud instance from a backup as part of the instance restore operation. Used from ST. |
| cloudsql.instances.update | Modify Cloud SQL instance properties as part of the instance restore operation. Used from ST. |
| cloudsql.instances.createTagBinding | Apply a TagKey and TagValue to a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| cloudsql.instances.deleteTagBinding | Update (remove) TagKey and TagValue from a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| cloudsql.instances.listTagBindings | List instance tags as part of the instance restore operation. Used from ST. |
| cloudsql.users.create | Create a new user for a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| cloudsql.users.delete | Delete an existing user from a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| cloudsql.users.update | Modify the settings of a user on a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| cloudsql.users.get | Retrieve instance users as part of the instance restore operation. Used from ST. |
| cloudsql.users.list | List all users on a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| secretmanager.secrets.create | Create a new Secret Manager secret for use by a scanner |
| secretmanager.secrets.update | Update secret metadata such as labels and replication settings |
| secretmanager.secrets.delete | Delete an existing Secret Manager secret |
| secretmanager.secrets.get | View the metadata and configuration of a Secret Manager secret |
| secretmanager.secrets.list | List all Secret Manager secrets within a project |
| secretmanager.versions.access | Access the actual secret payload (value) for a specific secret version |
| secretmanager.versions.add | Add a new version containing updated data to an existing secret |
| secretmanager.versions.destroy | Permanently destroy a secret version (irreversable) |
| secretmanager.versions.disable | Disable an existing secret version, making its payload inaccessible |
| secretmanager.versions.enable | Enable a previously-disabled secret version, making its payload accessible |
| secretmanager.versions.get | View the metadata and state of a secret version |
| secretmanager.versions.list | List all versions associated with a Secret Manager secret |
| storage.objects.create | Upload or create a new object (file) in a Cloud Storage bucket for scan runner communication |
| storage.objects.delete | Delete an existing object (file) from an artifact bucket |
| storage.objects.list | List all objects (files) contained within a Cloud Storage bucket |
| cloudkms.cryptoKeyVersions.create | Create a new version for a cryptographic key, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeyVersions.destroy | Permanently destroy a cryptographic key version, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeyVersions.get | Retrieve the details and metadata of a cryptographic key version, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeyVersions.list | List all versions of a cryptographic key, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeyVersions.update | Modify the settings and state of a cryptographic key version, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeyVersions.useToDecrypt | Use a cryptographic key version to decrypt data, used for Bigtable encryption. Used from scanner. |
| cloudkms.cryptoKeyVersions.useToEncrypt | Use a cryptographic key version to encrypt data, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeys.create | Create a new cryptographic key, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeys.setIamPolicy | Set the IAM policy (permissions) for a cryptographic key, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeys.getIamPolicy | Retrieve the IAM policy (permissions) for a cryptographic key, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeys.update | Modify the properties of a cryptographic key, used for Bigtable encryption. Used from ST. |
| cloudkms.keyRings.create | Create a new key ring to hold cryptographic keys, used for Bigtable encryption. Used from ST. |

#### Microsoft Azure provider permissions

List of Microsoft Azure provider permissions for Cortex Cloud.

When onboarding Microsoft Azure, Cortex Cloud creates an authentication template that requests the permissions needed for monitoring your cloud environment. Depending on which security capabilities you select in the onboarding wizard, different permissions are requested. The following tables are organized by security module and list the CSP permissions being requested as well as the purpose (and where relevant, the scope):

-   Agentless Disk Scanning
    
-   DSPM
    
-   Discovery Engine
    
-   Log Collection
    
-   Registry Scan
    
-   Outposts
    
-   Onboarding managed identity
    
-   Automations
    

Agentless Disk Scanning

| Permission | Scope | Purpose |
| --- | --- | --- |
| Microsoft.Compute/disks/delete | No scoping | Delete a scanned disk, after image scanning, ensuring resource cleanup |
| Microsoft.Compute/disks/read | Management Group | Retrieve disk status and properties to verify the disk is ready, such as for image scanning |
| Microsoft.Compute/disks/write | Management Group | Create a disk from the volume's image, for image scanning |
| Microsoft.Compute/galleries/images/delete | Resource groups starting with the prefix `cortex-` | Delete a temporary gallery image, for legacy image scanning |
| Microsoft.Compute/galleries/images/read | Management Group | Read a gallery image in order to create a disk for image scanning |
| Microsoft.Compute/galleries/images/versions/delete | Resource groups starting with the prefix `cortex-` | Delete a temporary gallery image version after legacy image scanning |
| Microsoft.Compute/galleries/images/versions/write | Resource groups starting with the prefix `cortex-` | Create a temporary gallery image version, for legacy image scanning |
| Microsoft.Compute/galleries/images/write | Resource groups starting with the prefix `cortex-` | Create a temporary gallery image, for legacy image scanning |
| Microsoft.Compute/snapshots/delete | Resource groups starting with the prefix `cortex-` | Delete a scanned snapshot after instance/image scanning |
| Microsoft.Compute/snapshots/read | Management Group | Read source snapshot's data to facilitate the conversion of a snapshot to a disk that will be attached to a scanner |
| Microsoft.Compute/snapshots/write | Resource groups starting with the prefix `cortex-` | Create a disk snapshot, before instance/image scanning |
| Microsoft.Compute/virtualMachines/read | Management Group | Allow disk snapshot operations, for instance scanning |

DSPM

| Permission | Scope | Purpose |
| --- | --- | --- |
| Microsoft.CognitiveServices/\*/action | All deployments | Read and scan OpenAI files and other Azure AI data resources |
| Microsoft.CognitiveServices/\*/read | All deployments | Discover of OpenAI resources and other Azure AI services |
| Microsoft.DocumentDB/databaseAccounts/listKeys/\* | Entire subscription | Get SAS token of CosmosDB to enable access |
| Microsoft.Network/networkSecurityGroups/delete | Resource groups starting with the prefix `cortex-` | Delete security groups |
| Microsoft.Network/networkSecurityGroups/join/action | Resource groups starting with the prefix `cortex-` | Associate a network security group with a subnet or network interface |
| Microsoft.Network/networkSecurityGroups/securityRules/delete | Resource groups starting with the prefix `cortex-` | Delete security rules for a security group |
| Microsoft.Network/networkSecurityGroups/securityRules/write | Resource groups starting with the prefix `cortex-` | Create or update security rules within a network security group |
| Microsoft.Network/networkSecurityGroups/write | Resource groups starting with the prefix `cortex-` | Create or update a network security group |
| Microsoft.Network/routeTables/delete | Resource groups starting with the prefix `cortex-` | Delete a route table from a subscription |
| Microsoft.Network/routeTables/join/action | Resource groups starting with the prefix `cortex-` | Associate a route table with a subnet |
| Microsoft.Network/routeTables/write | Resource groups starting with the prefix `cortex-` | Create or update a route table |
| Microsoft.Network/virtualNetworks/delete | Resource groups starting with the prefix `cortex-` | Delete a virtual network |
| Microsoft.Network/virtualNetworks/join/action | Resource groups starting with the prefix `cortex-` | Associate a virtual network with a subnet |
| Microsoft.Network/virtualNetworks/subnets/delete | Resource groups starting with the prefix `cortex-` | Delete a virtual network subnet |
| Microsoft.Network/virtualNetworks/subnets/join/action | Resource groups starting with the prefix `cortex-` | Associate a subnet with a resource |
| Microsoft.Network/virtualNetworks/subnets/write | Resource groups starting with the prefix `cortex-` | Create or update a subnet |
| Microsoft.Network/virtualNetworks/write | Resource groups starting with the prefix `cortex-` | Create or update a virtual network |
| Microsoft.Sql/managedInstances/databases/write | Resource groups starting with the prefix `cortex-` | Used for copying PITR of SQL managed instances to Palo Alto Networks' resource group, enabling Palo Alto Networks to restore and scan it |
| Microsoft.Sql/managedInstances/delete | Resource groups starting with the prefix `cortex-` | Clean stale assets such as Palo Alto Networks' Azure SQL Managed Instance |
| Microsoft.Sql/managedInstances/write | Resource groups starting with the prefix `cortex-` | Create SQL Managed Instance for classification of managed instances |
| Microsoft.Sql/servers/databases/delete | Resource groups starting with the prefix `cortex-` | Clean stale assets such as Palo Alto Networks' Azure SQL server databases |
| Microsoft.Sql/servers/databases/read | Resource groups starting with the prefix `cortex-` | Get configurations on Azure SQL databases |
| Microsoft.Sql/servers/databases/resume/action | Resource groups starting with the prefix `cortex-` | Copy and manage SQL databases in Azure SQL server |
| Microsoft.Sql/servers/databases/write | Resource groups starting with the prefix `cortex-` | Copy and manage SQL databases in Azure SQL server |
| Microsoft.Sql/servers/delete | Resource groups starting with the prefix `cortex-` | Clean stale assets such as Palo Alto Networks' Azure SQL server |
| Microsoft.Sql/servers/privateEndpointConnectionsApproval/action | Resource groups starting with the prefix `cortex-` | Connection using endpoints |
| Microsoft.Sql/servers/virtualNetworkRules/write | Resource groups starting with the prefix `cortex-` | Configure network accessibility from the scanning VMs on Palo Alto Networks' Azure SQL servers |
| Microsoft.Sql/servers/write | Resource groups starting with the prefix `cortex-` | Create and manage Palo Alto Networks' Azure SQL servers |
| Microsoft.Storage/\*/read | Entire subscription | Read blob data for data classification |
| Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read | All blobs | Enable classification of data in storage blobs |
| Microsoft.Storage/storageAccounts/blobServices/generateUserDelegationKey/action | Entire subscription | Get SAS token of blobServices to enable access |
| Microsoft.Storage/storageAccounts/fileServices/fileshares/files/read | All fileshares | Enable classification of data in storage fileshares |
| Microsoft.Storage/storageAccounts/ListAccountSas/action | Entire subscription | Get access SAS token to the storage account to scan file share instances using API |
| Microsoft.Storage/storageAccounts/listKeys/action | Entire subscription | Get access key to the storage account to scan file share instances using API |
| Microsoft.Storage/storageAccounts/PrivateEndpointConnectionsApproval/action | Entire subscription | Enable a scan by assigning private endpoints to a storage account located in a private network |
| Microsoft.Storage/storageAccounts/tableServices/tables/entities/read | All storage tables | Enable classification of data in storage tables |
| \*/read | Entire subscription | Read-only access, used to get metadata of all managed data assets in the subscription |

Discovery Engine

| Permission | Scope | Purpose |
| --- | --- | --- |
| AuditLog.Read.All | Tenants or management groups using Microsoft Graph | Read all audit log data for any tenant or management group |
| Directory.Read.All | Tenants or management groups using Microsoft Graph | Read full property sets for all directory objects |
| Domain.Read.All | Tenants or management groups using Microsoft Graph | Read all domain properties in a tenant |
| EntitlementManagement.Read.All | Tenants or management groups using Microsoft Graph | Read all access packages, assignments, and catalog configurations |
| GroupMember.Read.All | Tenants or management groups using Microsoft Graph | Read all group memberships in the directory |
| Group.Read.All | Tenants or management groups using Microsoft Graph | Read full property sets for all groups without editing group membership |
| IdentityProvider.Read.All | Tenants or management groups using Microsoft Graph | Read all identity provider configurations |
| Microsoft.Advisor/configurations/read | Management Group | Read Advisor configuration |
| Microsoft.AlertsManagement/prometheusRuleGroups/read | Management Group | Read Prometheus rule groups |
| Microsoft.AlertsManagement/smartDetectorAlertRules/read | Management Group | Read smart detector alert rules |
| Microsoft.AnalysisServices/servers/read | Management Group | Read Analysis Services servers |
| Microsoft.ApiManagement/service/apis/diagnostics/read | Management Group | Read diagnostics info of APIs |
| Microsoft.ApiManagement/service/apis/policies/read | Management Group | Read policies on APIs |
| Microsoft.ApiManagement/service/apis/read | Management Group | Read API details |
| Microsoft.ApiManagement/service/identityProviders/read | Management Group | Read API Management identity providers |
| Microsoft.ApiManagement/service/portalsettings/read | Management Group | Read developer portal settings |
| Microsoft.ApiManagement/service/products/policies/read | Management Group | Read policies on API products |
| Microsoft.ApiManagement/service/products/read | Management Group | Read API products |
| Microsoft.ApiManagement/service/read | Management Group | Read API Management service info |
| Microsoft.ApiManagement/service/tenant/read | Management Group | Read tenant info in API Management |
| Microsoft.AppConfiguration/configurationStores/read | Management Group | Read Azure App Configuration stores |
| Microsoft.app/containerapps/read | Management Group | Read App container apps |
| Microsoft.AppPlatform/Spring/apps/read | Management Group | Read Spring apps in Azure App Platform |
| Microsoft.AppPlatform/Spring/read | Management Group | Read Azure App Platform Spring resource info |
| Microsoft.Attestation/attestationProviders/read | Management Group | Read attestation providers |
| Microsoft.Authorization/classicAdministrators/read | Management Group | Read classic administrators info |
| Microsoft.Authorization/locks/read | Management Group | Read resource locks |
| Microsoft.Authorization/permissions/read | Management Group | Read permissions |
| Microsoft.Authorization/policyAssignments/read | Management Group | Read policy assignments |
| Microsoft.Authorization/policyDefinitions/read | Management Group | Read policy definitions |
| Microsoft.Authorization/roleAssignments/read | Management Group | Read role assignments |
| Microsoft.Authorization/roleDefinitions/read | Management Group | Read role definitions |
| Microsoft.Automanage/configurationProfiles/Read | Management Group | Read Automanage configuration profiles |
| Microsoft.Automation/automationAccounts/credentials/read | Management Group | Read credentials in automation accounts |
| Microsoft.Automation/automationAccounts/hybridRunbookWorkerGroups/read | Management Group | Read hybrid runbook worker groups |
| Microsoft.Automation/automationAccounts/read | Management Group | Read automation accounts |
| Microsoft.Automation/automationAccounts/runbooks/read | Management Group | Read runbooks |
| Microsoft.Automation/automationAccounts/variables/read | Management Group | Read variables in automation accounts |
| Microsoft.AzureStackHCI/Clusters/Read | Management Group | Read Azure Stack HCI clusters |
| Microsoft.Batch/batchAccounts/pools/read | Management Group | Read batch account pools |
| Microsoft.Batch/batchAccounts/read | Management Group | Read batch accounts |
| Microsoft.Blueprint/blueprints/read | Management Group | Read blueprints |
| Microsoft.BotService/botServices/read | Management Group | Read bot services |
| Microsoft.Cache/redisEnterprise/read | Management Group | Read Redis Enterprise caches |
| Microsoft.Cache/redis/firewallRules/read | Management Group | Read firewall rules on Redis cache |
| Microsoft.Cache/redis/read | Management Group | Read Redis caches |
| Microsoft.Cdn/profiles/afdendpoints/read | Management Group | Read CDN profile AFD endpoints |
| Microsoft.Cdn/profiles/afdendpoints/routes/read | Management Group | Read routes of CDN profile AFD endpoints |
| Microsoft.Cdn/profiles/customdomains/read | Management Group | Read custom domains in CDN profiles |
| Microsoft.Cdn/profiles/endpoints/customdomains/read | Management Group | Read custom domains of CDN endpoints |
| Microsoft.Cdn/profiles/endpoints/read | Management Group | Read CDN profile endpoints |
| Microsoft.Cdn/profiles/origingroups/read | Management Group | Read origin groups in CDN profiles |
| Microsoft.Cdn/profiles/read | Management Group | Read CDN profiles |
| Microsoft.Cdn/profiles/securitypolicies/read | Management Group | Read CDN profile security policies |
| Microsoft.Chaos/experiments/read | Management Group | Read Chaos experiments |
| Microsoft.classicCompute/domainNames/read | Management Group | Read Classic Compute domain names |
| Microsoft.ClassicCompute/VirtualMachines/read | Management Group | Read classic compute virtual machines |
| Microsoft.ClassicNetwork/networkSecurityGroups/read | Management Group | Read classic network security groups |
| Microsoft.ClassicNetwork/reservedIps/read | Management Group | Read classic network reserved IPs |
| Microsoft.ClassicNetwork/virtualNetworks/read | Management Group | Read classic virtual networks |
| Microsoft.ClassicStorage/StorageAccounts/read | Management Group | Read classic storage accounts |
| Microsoft.CognitiveServices/accounts/deployments/read | Management Group | Read deployments in Cognitive Services accounts |
| Microsoft.CognitiveServices/accounts/models/read | Management Group | Read models in Cognitive Services accounts |
| Microsoft.CognitiveServices/accounts/raiPolicies/read | Management Group | Read RAI policies in Cognitive Services accounts |
| Microsoft.CognitiveServices/accounts/read | Management Group | Read Cognitive Services accounts |
| Microsoft.CognitiveServices/models/read | Management Group | Read Cognitive Services models |
| Microsoft.Communication/CommunicationServices/Read | Management Group | Read Communication Services |
| Microsoft.Compute/availabilitySets/read | Management Group | Read availability sets |
| Microsoft.Compute/cloudServices/read | Management Group | Read cloud services |
| Microsoft.Compute/cloudServices/roleInstances/read | Management Group | Read cloud service role instances |
| Microsoft.Compute/diskEncryptionSets/read | Management Group | Read disk encryption sets |
| Microsoft.Compute/disks/beginGetAccess/action | Management Group | Begin get access on disks (action) |
| Microsoft.Compute/disks/read | Management Group | Read disks |
| Microsoft.Compute/galleries/images/read | Management Group | Read gallery images |
| Microsoft.Compute/galleries/read | Management Group | Read galleries |
| Microsoft.Compute/hostGroups/read | Management Group | Read host groups |
| Microsoft.Compute/snapshots/read | Management Group | Read snapshots |
| Microsoft.Compute/virtualMachineScaleSets/networkInterfaces/read | Management Group | Read network interfaces of VM scale sets |
| Microsoft.Compute/virtualMachineScaleSets/publicIPAddresses/read | Management Group | Read public IP addresses of VM scale sets |
| Microsoft.Compute/virtualMachineScaleSets/read | Management Group | Read virtual machine scale sets |
| Microsoft.Compute/virtualMachineScaleSets/virtualmachines/instanceView/read | Management Group | Read instance view of VM scale set VMs |
| Microsoft.Compute/virtualMachineScaleSets/virtualMachines/networkInterfaces /ipConfigurations/publicIPAddresses/read | Management Group | Read public IPs of VM scale set VM NICs IP configurations |
| Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read | Management Group | Read virtual machines in VM scale sets |
| Microsoft.Compute/virtualMachines/extensions/read | Management Group | Read VM extensions |
| Microsoft.Compute/virtualMachines/instanceView/read | Management Group | Read VM instance view |
| Microsoft.Compute/virtualMachines/read | Management Group | Read virtual machines |
| Microsoft.Confluent/organizations/Read | Management Group | Read Confluent organizations |
| Microsoft.Container/containerGroups/containers/exec/action | Management Group | Execute commands in a container |
| Microsoft.ContainerInstance/containerGroups/containers/exec/action | Management Group | Execute commands in container instances |
| Microsoft.ContainerInstance/containerGroups/read | Management Group | Read container groups |
| Microsoft.ContainerRegistry/registries/metadata/read | Management Group | Read container registry metadata |
| Microsoft.ContainerRegistry/registries/pull/read | Management Group | Read/pull from container registries |
| Microsoft.ContainerRegistry/registries/read | Management Group | Read container registries |
| Microsoft.ContainerRegistry/registries/webhooks/getCallbackConfig/action | Management Group | Get webhook callback configurations |
| Microsoft.ContainerService/managedClusters/read | Management Group | Read managed Kubernetes clusters |
| Microsoft.Dashboard/grafana/read | Management Group | Read Grafana dashboards |
| Microsoft.DataBoxEdge/dataBoxEdgeDevices/read | Management Group | Read DataBox Edge devices |
| Microsoft.Databricks/accessConnectors/read | Management Group | Read Databricks access connectors |
| Microsoft.Databricks/workspaces/read | Management Group | Read Databricks workspaces |
| Microsoft.Datadog/monitors/read | Management Group | Read Datadog monitors |
| Microsoft.DataFactory/datafactories/read | Management Group | Read Data Factory data factories |
| Microsoft.DataFactory/factories/integrationruntimes/read | Management Group | Read Data Factory integration runtimes |
| Microsoft.DataFactory/factories/linkedservices/read | Management Group | Read Data Factory linked services |
| Microsoft.DataFactory/factories/read | Management Group | Read Data Factories |
| Microsoft.DataLakeAnalytics/accounts/dataLakeStoreAccounts/read | Management Group | Read Data Lake Analytics associated Data Lake Store accounts |
| Microsoft.DataLakeAnalytics/accounts/firewallRules/read | Management Group | Read Data Lake Analytics firewall rules |
| Microsoft.DataLakeAnalytics/accounts/read | Management Group | Read Data Lake Analytics accounts |
| Microsoft.DataLakeAnalytics/accounts/storageAccounts/read | Management Group | Read Data Lake Analytics storage accounts |
| Microsoft.DataLakeStore/accounts/firewallRules/read | Management Group | Read Data Lake Store firewall rules |
| Microsoft.DataLakeStore/accounts/read | Management Group | Read Data Lake Store accounts |
| Microsoft.DataLakeStore/accounts/trustedIdProviders/read | Management Group | Read Data Lake Store trusted ID providers |
| Microsoft.DataLakeStore/accounts/virtualNetworkRules/read | Management Group | Read Data Lake Store virtual network rules |
| Microsoft.DataMigration/services/read | Management Group | Read Data Migration services |
| Microsoft.DataShare/accounts/read | Management Group | Read Data Share accounts |
| Microsoft.DBforMariaDB/servers/firewallRules/read | Management Group | Read MariaDB server firewall rules |
| Microsoft.DBforMariaDB/servers/read | Management Group | Read MariaDB servers |
| Microsoft.DBforMySQL/flexibleServers/configurations/read | Management Group | Read MySQL flexible server configurations |
| Microsoft.DBforMySQL/flexibleServers/databases/read | Management Group | Read MySQL flexible server databases |
| Microsoft.DBforMySQL/flexibleServers/firewallRules/read | Management Group | Read MySQL flexible server firewall rules |
| Microsoft.DBforMySQL/flexibleServers/read | Management Group | Read MySQL flexible servers |
| Microsoft.DBforMySQL/servers/firewallRules/read | Management Group | Read MySQL server firewall rules |
| Microsoft.DBforMySQL/servers/read | Management Group | Read MySQL servers |
| Microsoft.DBforMySQL/servers/virtualNetworkRules/read | Management Group | Read MySQL server virtual network rules |
| Microsoft.DBforPostgreSQL/flexibleServers/configurations/read | Management Group | Read PostgreSQL flexible server configurations |
| Microsoft.DBforPostgreSQL/flexibleServers/databases/read | Management Group | Read PostgreSQL flexible server databases |
| Microsoft.DBforPostgreSQL/flexibleServers/firewallRules/read | Management Group | Read PostgreSQL flexible server firewall rules |
| Microsoft.DBforPostgreSQL/flexibleServers/read | Management Group | Read PostgreSQL flexible servers |
| Microsoft.DBforPostgreSQL/servers/configurations/read | Management Group | Read PostgreSQL server configurations |
| Microsoft.DBforPostgreSQL/servers/firewallRules/read | Management Group | Read PostgreSQL server firewall rules |
| Microsoft.DBforPostgreSQL/servers/read | Management Group | Read PostgreSQL servers |
| Microsoft.DBforPostgreSQL/serversv2/firewallRules/read | Management Group | Read PostgreSQL servers v2 firewall rules |
| Microsoft.DesktopVirtualization/applicationgroups/read | Management Group | Read Desktop Virtualization application groups |
| Microsoft.DesktopVirtualization/hostpools/read | Management Group | Read Desktop Virtualization host pools |
| Microsoft.DesktopVirtualization/hostpools/sessionhostconfigurations/read | Management Group | Read Desktop Virtualization host pool session host configurations |
| Microsoft.DesktopVirtualization/hostpools/sessionhosts/read | Management Group | Read Desktop Virtualization host pool session hosts |
| Microsoft.DesktopVirtualization/workspaces/providers/Microsoft.Insights/diagnosticSettings/read | Management Group | Read Desktop Virtualization workspace diagnostic settings |
| Microsoft.DesktopVirtualization/workspaces/read | Management Group | Read Desktop Virtualization workspaces |
| Microsoft.DevCenter/devcenters/read | Management Group | Read DevCenter devcenters |
| Microsoft.Devices/iotHubs/privateLinkResources/Read | Management Group | Read IoT Hubs private link resources |
| Microsoft.Devices/iotHubs/Read | Management Group | Read IoT Hubs |
| Microsoft.DevTestLab/schedules/read | Management Group | Read DevTestLab schedules |
| Microsoft.DigitalTwins/digitalTwinsInstances/read | Management Group | Read Digital Twins instances |
| Microsoft.DocumentDB/cassandraClusters/read | Management Group | Read DocumentDB Cassandra clusters |
| Microsoft.DocumentDB/databaseAccounts/listConnectionStrings/action | Management Group | List connection strings of DocumentDB accounts (action) |
| Microsoft.DocumentDB/databaseAccounts/listKeys/action | Management Group | List keys of DocumentDB accounts (action) |
| Microsoft.DocumentDB/databaseAccounts/read | Management Group | Read DocumentDB database accounts |
| Microsoft.DocumentDB/databaseAccounts/readonlykeys/action | Management Group | List readonly keys of DocumentDB accounts (action) |
| Microsoft.DomainRegistration/domains/Read | Management Group | Read Domain registrations |
| Microsoft.Easm/workspaces/read | Management Group | Read Easm workspaces |
| Microsoft.Elastic/monitors/read | Management Group | Read Elastic monitors |
| Microsoft.EventGrid/domains/privateLinkResources/read | Management Group | Read Event Grid domains private link resources |
| Microsoft.EventGrid/domains/read | Management Group | Read Event Grid domains |
| Microsoft.EventGrid/namespaces/read | Management Group | Read Event Grid namespaces |
| Microsoft.EventGrid/partnerNamespaces/read | Management Group | Read Event Grid partner namespaces |
| Microsoft.EventGrid/topics/privateLinkResources/read | Management Group | Read Event Grid topics private link resources |
| Microsoft.EventGrid/topics/read | Management Group | Read Event Grid topics |
| Microsoft.EventHub/clusters/read | Management Group | Read EventHub clusters |
| Microsoft.EventHub/namespaces/authorizationRules/read | Management Group | Read EventHub namespaces authorization rules |
| Microsoft.EventHub/namespaces/eventhubs/authorizationRules/read | Management Group | Read EventHub event hub authorization rules |
| Microsoft.EventHub/namespaces/eventhubs/read | Management Group | Read EventHub event hubs |
| Microsoft.EventHub/namespaces/ipfilterrules/read | Management Group | Read EventHub IP filter rules |
| Microsoft.EventHub/Namespaces/PrivateEndpointConnections/read | Management Group | Read EventHub Namespace private endpoint connections |
| Microsoft.EventHub/namespaces/read | Management Group | Read EventHub namespaces |
| Microsoft.EventHub/namespaces/virtualnetworkrules/read | Management Group | Read EventHub virtual network rules |
| Microsoft.HDInsight/clusters/applications/read | Management Group | Read HDInsight cluster applications |
| Microsoft.HDInsight/clusters/read | Management Group | Read HDInsight clusters |
| Microsoft.HealthBot/healthBots/Read | Management Group | Read HealthBot bots |
| Microsoft.HealthcareApis/workspaces/read | Management Group | Read Healthcare APIs workspaces |
| Microsoft.HybridCompute/machines/read | Management Group | Read Hybrid Compute machines |
| Microsoft.Insights/actionGroups/read | Management Group | Read Insights action groups |
| Microsoft.Insights/ActivityLogAlerts/read | Management Group | Read Insights activity log alerts |
| Microsoft.Insights/Components/read | Management Group | Read Insights components |
| Microsoft.Insights/DataCollectionEndpoints/Read | Management Group | Read Insights data collection endpoints |
| Microsoft.Insights/DataCollectionRules/Read | Management Group | Read Insights data collection rules |
| Microsoft.Insights/diagnosticSettings/read | Management Group | Read Insights diagnostic settings |
| Microsoft.Insights/eventtypes/values/read | Management Group | Read Insights event type values |
| Microsoft.Insights/LogProfiles/read | Management Group | Read Insights log profiles |
| Microsoft.Insights/MetricAlerts/Read | Management Group | Read Insights metric alerts |
| Microsoft.IoTCentral/IoTApps/read | Management Group | Read IoT Central applications |
| Microsoft.KeyVault/vaults/keys/read | Management Group | Read Key Vault keys |
| Microsoft.KeyVault/vaults/privateLinkResources/read | Management Group | Read Key Vault private link resources |
| Microsoft.KeyVault/vaults/read | Management Group | Read Key Vault vaults |
| Microsoft.Kusto/Clusters/Databases/read | Management Group | Read Kusto cluster databases |
| Microsoft.Kusto/clusters/read | Management Group | Read Kusto clusters (alternative) |
| Microsoft.Kusto/Clusters/read | Management Group | Read Kusto clusters |
| Microsoft.LabServices/labs/read | Management Group | Read Lab Services labs |
| Microsoft.LoadTestService/loadTests/read | Management Group | Read Load Test Service tests |
| Microsoft.Logic/integrationAccounts/read | Management Group | Read Logic integration accounts |
| Microsoft.Logic/workflows/read | Management Group | Read Logic workflows |
| Microsoft.Logic/workflows/versions/read | Management Group | Read Logic workflow versions |
| Microsoft.MachineLearningServices/workspaces/computes/read | Management Group | Read Machine Learning Services workspace computes |
| Microsoft.MachineLearningServices/workspaces/outboundRules/read | Management Group | Read Machine Learning Services workspace outbound rules |
| Microsoft.MachineLearningServices/workspaces/read | Management Group | Read Machine Learning Services workspaces |
| Microsoft.ManagedIdentity/userAssignedIdentities/read | Management Group | Read Managed Identity user assigned identities |
| Microsoft.ManagedServices/marketplaceRegistrationDefinitions/read | Management Group | Read Managed Services marketplace registration definitions |
| Microsoft.ManagedServices/registrationAssignments/read | Management Group | Read Managed Services registration assignments |
| Microsoft.Management/managementGroups/descendants/read | Management Group | Read Management Groups descendants |
| Microsoft.Management/managementGroups/read | Management Group | Read Management Groups |
| Microsoft.Management/managementGroups/subscriptions/read | Management Group | Read Management Groups subscriptions |
| Microsoft.Maps/accounts/read | Management Group | Read Maps accounts |
| Microsoft.Migrate/moveCollections/read | Management Group | Read Migrate move collections |
| Microsoft.MixedReality/ObjectAnchorsAccounts/read | Management Group | Read Mixed Reality Object Anchors accounts |
| Microsoft.monitor/accounts/read | Management Group | Read Monitor accounts |
| Microsoft.NetApp/netAppAccounts/capacityPools/read | Management Group | Read NetApp capacity pools |
| Microsoft.NetApp/netAppAccounts/capacityPools/volumes/read | Management Group | Read NetApp capacity pool volumes |
| Microsoft.NetApp/netAppAccounts/read | Management Group | Read NetApp accounts |
| Microsoft.Network/applicationGateways/read | Management Group | Read Application Gateways |
| Microsoft.Network/ApplicationGatewayWebApplicationFirewallPolicies/read | Management Group | Read Application Gateway Web Application Firewall Policies |
| Microsoft.Network/applicationSecurityGroups/read | Management Group | Read Application Security Groups |
| Microsoft.Network/azurefirewalls/read | Management Group | Read Azure Firewalls |
| Microsoft.Network/bastionHosts/read | Management Group | Read Bastion Hosts |
| Microsoft.Network/connections/read | Management Group | Read Network Connections |
| Microsoft.Network/ddosProtectionPlans/read | Management Group | Read DDoS Protection Plans |
| Microsoft.Network/dnsZones/read | Management Group | Read DNS Zones |
| Microsoft.Network/expressRouteCircuits/authorizations/read | Management Group | Read ExpressRoute Circuit authorizations |
| Microsoft.Network/expressRouteCircuits/peerings/connections/read | Management Group | Read ExpressRoute Circuit peerings connections |
| Microsoft.Network/expressRouteCircuits/peerings/peerConnections/read | Management Group | Read ExpressRoute Circuit peer connections |
| Microsoft.Network/expressRouteCircuits/peerings/read | Management Group | Read ExpressRoute Circuit peerings |
| Microsoft.Network/expressRouteCircuits/read | Management Group | Read ExpressRoute Circuits |
| Microsoft.Network/expressRouteCrossConnections/peerings/read | Management Group | Read ExpressRoute Cross Connections peerings |
| Microsoft.Network/expressRouteCrossConnections/read | Management Group | Read ExpressRoute Cross Connections |
| Microsoft.Network/expressRouteGateways/expressRouteConnections/read | Management Group | Read ExpressRoute Gateways connections |
| Microsoft.Network/expressRouteGateways/read | Management Group | Read ExpressRoute Gateways |
| Microsoft.Network/expressRoutePorts/authorizations/read | Management Group | Read ExpressRoute Ports authorizations |
| Microsoft.Network/expressRoutePorts/links/read | Management Group | Read ExpressRoute Ports links |
| Microsoft.Network/expressRoutePortsLocations/read | Management Group | Read ExpressRoute Ports locations |
| Microsoft.Network/expressRoutePorts/read | Management Group | Read ExpressRoute Ports |
| Microsoft.Network/firewallPolicies/read | Management Group | Read Firewall Policies |
| Microsoft.Network/frontDoors/backendPools/read | Management Group | Read Front Door backend pools |
| Microsoft.Network/frontDoors/frontendEndpoints/read | Management Group | Read Front Door frontend endpoints |
| Microsoft.Network/frontDoors/healthProbeSettings/read | Management Group | Read Front Door health probe settings |
| Microsoft.Network/frontDoors/loadBalancingSettings/read | Management Group | Read Front Door load balancing settings |
| Microsoft.Network/frontDoors/read | Management Group | Read front doors |
| Microsoft.Network/frontDoors/routingRules/read | Management Group | Read Front Door routing rules |
| Microsoft.Network/frontDoors/rulesEngines/read | Management Group | Read Front Door rules engines |
| Microsoft.Network/frontDoorWebApplicationFirewallPolicies/read | Management Group | Read Front Door Web Application Firewall Policies |
| Microsoft.NetworkFunction/azureTrafficCollectors/read | Management Group | Read Azure Traffic Collectors |
| Microsoft.Network/loadBalancers/read | Management Group | Read Load Balancers |
| Microsoft.Network/localnetworkgateways/read | Management Group | Read Local Network Gateways |
| Microsoft.Network/locations/usages/read | Management Group | Read Network locations usage |
| Microsoft.Network/natGateways/read | Management Group | Read NAT Gateways |
| Microsoft.Network/networkInterfaces/effectiveNetworkSecurityGroups/action | Management Group | View and/or execute effective network security groups action |
| Microsoft.Network/networkInterfaces/effectiveRouteTable/action | Management Group | Execute effective route table on NICs action |
| Microsoft.Network/networkInterfaces/read | Management Group | Read Network Interfaces |
| Microsoft.Network/networkSecurityGroups/defaultSecurityRules/read | Management Group | Read Network Security Groups default security rules |
| Microsoft.Network/networkSecurityGroups/read | Management Group | Read Network Security Groups |
| Microsoft.Network/networkSecurityGroups/securityRules/read | Management Group | Read Network Security Groups security rules |
| Microsoft.Network/networkWatchers/queryFlowLogStatus/\* | Management Group | Query NSG network watcher flow log status |
| Microsoft.Network/networkWatchers/read | Management Group | Read network watcher settings |
| Microsoft.Network/networkWatchers/read | Management Group | Read Network Watchers |
| Microsoft.Network/networkWatchers/securityGroupView/action | Management Group | View and/or execute effective security group view action |
| Microsoft.Network/p2sVpnGateways/read | Management Group | Read P2S VPN Gateways |
| Microsoft.Network/privateDnsZones/ALL/read | Management Group | Read Private DNS Zones ALL |
| Microsoft.Network/privateDnsZones/read | Management Group | Read Private DNS Zones |
| Microsoft.Network/privateEndpoints/privateDnsZoneGroups/read | Management Group | Read Private Endpoints DNS Zone Groups |
| Microsoft.Network/privateEndpoints/read | Management Group | Read Private Endpoints |
| Microsoft.Network/privateLinkServices/read | Management Group | Read Private Link Services |
| Microsoft.Network/publicIPAddresses/read | Management Group | Read Public IP Addresses |
| Microsoft.Network/publicIPPrefixes/read | Management Group | Read Public IP Prefixes |
| Microsoft.Network/routeFilters/read | Management Group | Read Route Filters |
| Microsoft.Network/routeFilters/routeFilterRules/read | Management Group | Read Route Filter Rules |
| Microsoft.Network/routeTables/read | Management Group | Read Route Tables |
| Microsoft.Network/routeTables/routes/read | Management Group | Read Route Table Routes |
| Microsoft.Network/serviceEndpointPolicies/read | Management Group | Read Service Endpoint Policies |
| Microsoft.Network/serviceEndpointPolicies/serviceEndpointPolicyDefinitions/read | Management Group | Read Service Endpoint Policy Definitions |
| Microsoft.Network/trafficManagerProfiles/read | Management Group | Read Traffic Manager Profiles |
| Microsoft.network/virtualnetworkgateways/connections/read | Management Group | Read Virtual network gateways connections |
| Microsoft.Network/virtualNetworkGateways/read | Management Group | Read Virtual Network Gateways |
| Microsoft.Network/virtualNetworks/read | Management Group | Read Virtual Networks |
| Microsoft.Network/virtualNetworks/subnets/read | Management Group | Read Virtual Network Subnets |
| Microsoft.Network/virtualNetworks/virtualNetworkPeerings/read | Management Group | Read Virtual Network Peerings |
| Microsoft.Network/virtualWans/read | Management Group | Read Virtual WANs |
| Microsoft.Network/virtualwans/vpnconfiguration/action | Management Group | Download and/or executie VPN configuration action |
| Microsoft.Network/vpnServerConfigurations/read | Management Group | Read VPN Server Configurations |
| Microsoft.NotificationHubs/Namespaces/NotificationHubs/read | Management Group | Read Notification Hubs |
| Microsoft.NotificationHubs/Namespaces/read | Management Group | Read Notification Hub namespaces |
| Microsoft.OperationalInsights/clusters/read | Management Group | Read Operational Insights clusters |
| Microsoft.OperationalInsights/querypacks/read | Management Group | Read Operational Insights query packs |
| Microsoft.OperationalInsights/workspaces/read | Management Group | Read Operational Insights workspaces |
| Microsoft.OperationalInsights/workspaces/tables/read | Management Group | Read Operational Insights workspace tables |
| Microsoft.Orbital/spacecrafts/read | Management Group | Read Orbital spacecrafts |
| Microsoft.PowerBIDedicated/capacities/read | Management Group | Read Power BI Dedicated capacities |
| Microsoft.PowerBIDedicated/servers/read | Management Group | Read Power BI Dedicated servers |
| Microsoft.Quantum/Workspaces/Read | Management Group | Read Quantum Workspaces |
| Microsoft.RecoveryServices/vaults/backupPolicies/read | Management Group | Read Recovery Services Vault backup policies |
| Microsoft.RecoveryServices/Vaults/backupProtectedItems/read | Management Group | Read Recovery Services Vault backup protected items |
| Microsoft.RecoveryServices/Vaults/read | Management Group | Read Recovery Services Vaults |
| Microsoft.RedHatOpenShift/openShiftClusters/read | Management Group | Read Red Hat OpenShift clusters |
| Microsoft.Relay/Namespaces/read | Management Group | Read Relay namespaces |
| Microsoft.Resources/Resources/read | Management Group | Read generic resources |
| Microsoft.Resources/subscriptions/providers/read | Management Group | Read subscription providers |
| Microsoft.Resources/subscriptions/read | Management Group | Read subscriptions |
| Microsoft.Resources/subscriptions/resourceGroups/read | Management Group | Read resource groups |
| Microsoft.Resources/subscriptions/resourceGroups/write | Management Group | Write resource groups |
| Microsoft.Resources/templateSpecs/read | Management Group | Read template specs |
| Microsoft.SaaS/applications/read | Management Group | Read SaaS applications |
| Microsoft.Search/searchServices/dataSources/read | Entire Subscription | Read Azure Search service data sources |
| Microsoft.Search/searchServices/indexers/read | Entire Subscription | Read Azure Search service indexers |
| Microsoft.Search/searchServices/indexes/documents/read | Entire Subscription | Read Azure Search service indexer documents |
| Microsoft.Search/searchServices/indexes/read | Entire Subscription | Read Azure Search service indexes |
| Microsoft.Search/searchServices/listAdminKeys/action | Entire Subscription | Retrieve the administrative API keys required to authenticate and manage the search service |
| Microsoft.Search/searchServices/listQueryKeys/action | Entire Subscription |  |
| Microsoft.Search/searchServices/PrivateEndpointConnectionsApproval/action | Entire Subscription |  |
| Microsoft.Search/searchServices/read | Entire Subscription | Read Azure Search services |
| Microsoft.Security/advancedThreatProtectionSettings/read | Management Group | Read Security advanced threat protection settings |
| Microsoft.Security/automations/read | Management Group | Read Security automations |
| Microsoft.Security/autoProvisioningSettings/read | Management Group | Read Security auto provisioning settings |
| Microsoft.Security/iotSecuritySolutions/read | Management Group | Read IoT Security Solutions |
| Microsoft.Security/locations/jitNetworkAccessPolicies/read | Management Group | Read Just-in-Time network access policies |
| Microsoft.Security/locations/read | Management Group | Read Security locations |
| Microsoft.Security/pricings/read | Management Group | Read Security pricings |
| Microsoft.Security/secureScores/read | Management Group | Read Security secure scores |
| Microsoft.Security/securityContacts/read | Management Group | Read Security contacts |
| Microsoft.Security/settings/read | Management Group | Read Security settings |
| Microsoft.Security/workspaceSettings/read | Management Group | Read Security workspace settings |
| Microsoft.ServiceBus/namespaces/authorizationRules/read | Management Group | Read Service Bus namespace authorization rules |
| Microsoft.ServiceBus/namespaces/networkrulesets/read | Management Group | Read Service Bus namespace network rule sets |
| Microsoft.ServiceBus/namespaces/privateEndpointConnections/read | Management Group | Read Service Bus namespace private endpoint connections |
| Microsoft.ServiceBus/namespaces/providers/Microsoft.Insights/diagnosticSettings/read | Management Group | Read Service Bus namespace diagnostic settings |
| Microsoft.ServiceBus/namespaces/queues/read | Management Group | Read Service Bus queues |
| Microsoft.ServiceBus/namespaces/read | Management Group | Read Service Bus namespaces |
| Microsoft.ServiceBus/namespaces/topics/read | Management Group | Read Service Bus topics |
| Microsoft.ServiceBus/namespaces/topics/subscriptions/read | Management Group | Read Service Bus topic subscriptions |
| Microsoft.ServiceFabric/clusters/read | Management Group | Read Service Fabric clusters |
| Microsoft.SignalRService/SignalR/read | Management Group | Read SignalR Service SignalR |
| Microsoft.SignalRService/WebPubSub/read | Management Group | Read SignalR Web PubSub |
| Microsoft.Solutions/applications/read | Management Group | Read Solutions applications |
| Microsoft.Sql/managedInstances/databases/read | Management Group | Read SQL managed instances databases |
| Microsoft.Sql/managedInstances/databases/transparentDataEncryption/read | Management Group | Read SQL managed instances databases Transparent Data Encryption |
| Microsoft.Sql/managedInstances/encryptionProtector/Read | Management Group | Read SQL managed instances encryption protector |
| Microsoft.Sql/managedInstances/read | Management Group | Read SQL managed instances |
| Microsoft.Sql/managedInstances/vulnerabilityAssessments/Read | Management Group | Read SQL managed instances vulnerability assessments |
| Microsoft.Sql/servers/administrators/read | Management Group | Read SQL server administrators |
| Microsoft.Sql/servers/auditingSettings/read | Management Group | Read SQL server auditing settings |
| Microsoft.Sql/servers/databases/auditingSettings/read | Management Group | Read SQL server databases auditing settings |
| Microsoft.Sql/servers/databases/dataMaskingPolicies/read | Management Group | Read SQL server databases data masking policies |
| Microsoft.Sql/servers/databases/dataMaskingPolicies/rules/read | Management Group | Read SQL server databases data masking policies rules |
| Microsoft.Sql/servers/databases/read | Management Group | Read SQL server databases |
| Microsoft.Sql/servers/databases/securityAlertPolicies/read | Management Group | Read SQL server databases security alert policies |
| Microsoft.Sql/servers/databases/transparentDataEncryption/read | Management Group | Read SQL server databases Transparent Data Encryption |
| Microsoft.Sql/servers/encryptionProtector/read | Management Group | Read SQL server encryption protector |
| Microsoft.Sql/servers/firewallRules/read | Management Group | Read SQL server firewall rules |
| Microsoft.Sql/servers/read | Management Group | Read SQL servers |
| Microsoft.Sql/servers/securityAlertPolicies/read | Management Group | Read SQL server security alert policies |
| Microsoft.Sql/servers/vulnerabilityAssessments/read | Management Group | Read SQL server vulnerability assessments |
| Microsoft.SqlVirtualMachine/sqlVirtualMachines/read | Management Group | Read SQL Virtual Machines |
| Microsoft.StorageCache/caches/read | Management Group | Read Storage Cache caches |
| Microsoft.StorageCache/Subscription/caches/read | Management Group | Read Storage Cache subscription caches |
| Microsoft.StorageMover/storageMovers/read | Management Group | Read Storage Mover storage movers |
| Microsoft.Storage/storageAccounts/blobServices/read | Management Group | Read Storage blob services |
| Microsoft.Storage/storageAccounts/fileServices/read | Management Group | Read Storage file services |
| Microsoft.Storage/storageAccounts/fileServices/shares/read | Management Group | Read Storage file shares |
| Microsoft.Storage/storageAccounts/listKeys/action | Management Group | List Storage account keys (action) |
| Microsoft.Storage/storageAccounts/providers/Microsoft.Insights/diagnosticSettings/read | Management Group | Read Storage account diagnostic settings |
| Microsoft.Storage/storageAccounts/queueServices/read | Management Group | Read Storage queue services |
| Microsoft.Storage/storageAccounts/read | Management Group | Read Storage accounts |
| Microsoft.Storage/storageAccounts/tableServices/read | Management Group | Read Storage table services |
| Microsoft.StorageSync/storageSyncServices/privateLinkResources/read | Management Group | Read Storage Sync private link resources |
| Microsoft.StorageSync/storageSyncServices/read | Management Group | Read Storage Sync services |
| Microsoft.StreamAnalytics/clusters/Read | Management Group | Read Stream Analytics clusters |
| Microsoft.StreamAnalytics/streamingjobs/Read | Management Group | Read Stream Analytics streaming jobs |
| Microsoft.Subscription/Policies/default/read | Management Group | Read Subscription default policies |
| Microsoft.Synapse/privateLinkHubs/privateLinkResources/read | Management Group | Read Synapse private link hubs private link resources |
| Microsoft.Synapse/privateLinkHubs/read | Management Group | Read Synapse private link hubs |
| Microsoft.Synapse/workspaces/privateLinkResources/read | Management Group | Read Synapse workspace private link resources |
| Microsoft.Synapse/workspaces/read | Management Group | Read Synapse workspaces |
| Microsoft.Synapse/workspaces/sparkConfigurations/read | Management Group | Read Synapse workspaces spark configurations |
| Microsoft.Synapse/workspaces/sqlPools/geoBackupPolicies/read | Management Group | Read Synapse workspaces SQL pools geo backup policies |
| Microsoft.Synapse/workspaces/sqlPools/read | Management Group | Read Synapse workspaces SQL pools |
| Microsoft.VideoIndexer/accounts/read | Management Group | Read Video Indexer accounts |
| Microsoft.VisualStudio/Account/Read | Management Group | Read Visual Studio accounts |
| Microsoft.Web/certificates/read | Management Group | Read Web certificates |
| Microsoft.Web/customApis/read | Management Group | Read Web custom APIs |
| Microsoft.Web/hostingEnvironments/Read | Management Group | Read Web hosting environments |
| Microsoft.Web/serverfarms/Read | Management Group | Read Web server farms |
| Microsoft.web/serverfarms/sites/read | Management Group | Read Server farms sites |
| Microsoft.Web/sites/basicPublishingCredentialsPolicies/Read | Management Group | Read Web sites basic publishing credentials policies |
| Microsoft.web/sites/config/appsettings/read | Management Group | Read Web sites app settings |
| Microsoft.Web/sites/config/list/action | Management Group | Execute action to list Web site configuration |
| Microsoft.Web/sites/config/read | Management Group | Read Web sites configuration |
| Microsoft.web/sites/functions/action | Management Group | Invoke or trigger specific Azure Functions hosted within a Web App/Function App |
| Microsoft.web/sites/functions/read | Management Group | Read Web Sites functions |
| Microsoft.Web/sites/privateEndpointConnections/Read | Management Group | Read Web sites private endpoint connections |
| Microsoft.Web/sites/publishxml/Action | Management Group | Retrieve the publishing profile (XML) used to authenticate and deploy code or configurations to the Azure Web App |
| Microsoft.Web/sites/read | Management Group | Read Web sites |
| Microsoft.Web/sites/Read | Management Group | Read Web sites |
| Microsoft.Web/sites/slots/Read | Management Group | Read Web sites slots |
| Microsoft.Web/staticSites/Read | Management Group | Read Web static sites |
| Microsoft.Workloads/monitors/read | Management Group | Read Workloads monitors |
| Organization.Read.All | Tenants or management groups using Microsoft Graph | Read all properties and data of the current Azure Active Directory (AD) organization (tenant) |
| Policy.Read.All | Tenants or management groups using Microsoft Graph | Read all policies configured in Azure Active Directory (AD) |
| Policy.ReadWrite.AuthenticationMethod | Tenants or management groups using Microsoft Graph | Read and write (configure/modify) all user authentication methods in Azure Active Directory (AD) |
| \*/read | Management Group | Read-only access, used to get metadata of all managed data assets in the subscription |
| RoleManagement.Read.All | Tenants or management groups using Microsoft Graph | Read all Azure Active Directory (AD) role definitions and role assignments within the organization |
| User.Read.All | Tenants or management groups using Microsoft Graph | Read the full set of profile properties and data for every user in the organization's directory |

Log Collection

| Permission | Scope | Purpose |
| --- | --- | --- |
| Azure Event Hubs Data Receiver | Event Hub namespaces starting with the prefix `CortexEventHubNamespace` | Used for audit log collection. Logs are collected via Event Hubs and are later collected. |
| Storage Blob Data Contributor | Resources starting with the prefix `cxa` | Used for audit log collection. Logs are stored in a dedicated storage account and are later collected. |

Registry Scan

| Permission | Scope | Purpose |
| --- | --- | --- |
| Microsoft.ContainerRegistry/registries/metadata/read | Management Group | Enable the retrieval of manifest and tag information for images stored in the container registry |
| Microsoft.ContainerRegistry/registries/pull/read | Management Group | Enable the pulling (downloading) of container images from the repository for scanning or deployment |
| Microsoft.ContainerRegistry/registries/read | Management Group | Enable the reading of general properties and metadata about the container registry itself |
| Microsoft.ContainerRegistry/registries/webhooks/getCallbackConfig/action | Management Group | Enable the retrieval of the callback URL and configuration details for a registry webhook |

Outposts

| Permission | Scope | Purpose |
| --- | --- | --- |
| Microsoft.Compute/disks/delete | Resource group | Delete disks after scanning has finished. This action is critical for remediation and resource hygiene, preventing data exfiltration, and reducing the attack surface. For example, the outpost can delete dangling disks, which are a significant security risk. |
| Microsoft.Compute/disks/read | Resource group | Retrieve disk metadata for identifying, for example, dangling disks. |
| Microsoft.Compute/disks/write | Resource group | Create a disk from a snapshot before attaching it to a workload. This permission is essential for dynamic scanning and analysis. It enables the creation of a temporary disk copy from a snapshot, a necessary step to analyze a workload without affecting the live environment. |
| Microsoft.Compute/locations/usages/read | Resource group | View regional usage and quota limits for compute resources |
| Microsoft.Compute/skus/read | Resource group | View available VM sizes (SKUs) for dynamic size selection |
| Microsoft.Compute/virtualMachines/delete | Resource group | Delete a scanner or proxy VM. This permission is necessary for secure lifecycle management. It ensures that Cortex Cloud can clean up and delete temporary VMs, such as scanner or proxy VMs, after a security task is complete. This prevents them from becoming an unmonitored risk. |
| Microsoft.Compute/virtualMachines/read | Resource group | View a scanner or proxy VM |
| Microsoft.Compute/virtualMachines/write | Resource group | Create a scanner or proxy VM. This is a core provisioning permission required to dynamically deploy security resources. This is needed for creating ephemeral scanner or proxy VMs that are spun up to perform specific security tasks. |
| Microsoft.ManagedIdentity/userAssignedIdentities/assign/action | Resource group | Assign a user-assigned managed identity to a resource. This is a fundamental permission for secure, credential-less access. It allows the outpost to assign a managed identity to a resource, which is a best practice for securely authenticating to other Azure services without needing to store or manage static credentials. |
| Microsoft.Network/applicationSecurityGroups/joinIpConfiguration/action | Resource group | Attach an NIC IP configuration to an Application Security Group. This permission is required for Cortex Cloud to perform its core security functions, ensuring it has the necessary access to monitor and manage resources within the customer's account. |
| Microsoft.Network/networkInterfaces/delete | Resource group | Delete NICs. This delete permission is critical for network security hygiene. It allows Cortex to clean up temporary or unused network resources, such as network interfaces (NICs) or public IPs, to prevent them from becoming dangling resources and a potential security risk. |
| Microsoft.Network/networkInterfaces/join/action | Resource group | Attach NICs to VMs. This permission is necessary for secure network configuration. It enables Cortex to connect a VM's network interface to the correct subnet or security group, ensuring it can communicate securely and in accordance with the network's security policy. |
| Microsoft.Network/networkInterfaces/read | Resource group | View network interface (NIC) properties. |
| Microsoft.Network/networkInterfaces/write | Resource group | Create or update NICs. This write permission is required to configure the network for secure operations. It allows Cortex to create or update network components like NICs, public IPs, or private endpoints, which is necessary to ensure secure and isolated communication for its security tools. |
| Microsoft.Network/networkSecurityGroups/join/action | Resource group | Associate NICs or subnets with a Network Security Group. This permission is necessary for secure network configuration. It enables Cortex to connect a VM's network interface to the correct subnet or security group, ensuring it can communicate securely and in accordance with the network's security policy. |
| Microsoft.Network/operations/read | Resource group | View available network-related operations used for work with private endpoints. |
| Microsoft.Network/privateEndpoints/delete | Resource group | Delete permission is critical for network security hygiene. It allows Cortex to clean up temporary or unused network resources, such as network interfaces (NICs) or public IPs, to prevent them from becoming dangling resources and a potential security risk. |
| Microsoft.Network/privateEndpoints/read | Resource group | View private endpoint properties. |
| Microsoft.Network/privateEndpoints/write | Resource group | Create or update private endpoints. This write permission is required to configure the network for secure operations. It allows Cortex to create or update network components like NICs, public IPs, or private endpoints, which is necessary to ensure secure and isolated communication for its security tools. |
| Microsoft.Network/publicIPAddresses/delete | Resource group | Delete unused public IPs. This delete permission is critical for network security hygiene. It allows Cortex to clean up temporary or unused network resources, such as network interfaces (NICs) or public IPs, to prevent them from becoming dangling resources and a potential security risk. |
| Microsoft.Network/publicIPAddresses/join/action | Resource group | Attach public IPs to NIC of proxy VM. This permission is necessary for secure network configuration. It enables Cortex to connect a VM's network interface to the correct subnet or security group, ensuring it can communicate securely and in accordance with the network's security policy. |
| Microsoft.Network/publicIPAddresses/read | Resource group | List existing static public IPs that can be used by proxy VMs. |
| Microsoft.Network/publicIPAddresses/write | Resource group | Create or update public IPs. This write permission is required to configure the network for secure operations. It allows Cortex to create or update network components like NICs, public IPs, or private endpoints, which is necessary to ensure secure and isolated communication for its security tools. |
| Microsoft.Network/virtualNetworks/subnets/join/action | Resource group | Attach NICs to a subnet. This permission is necessary for secure network configuration. It enables Cortex to connect a VM's network interface to the correct subnet or security group, ensuring it can communicate securely and in accordance with the network's security policy. |
| Microsoft.Network/virtualNetworks/subnets/joinViaServiceEndpoint/action | Resource group | Enable usage of a subnet’s service endpoint by scanner VM to access managed services. This permission is necessary for secure network configuration. It enables Cortex to connect a VM's network interface to the correct subnet or security group, ensuring it can communicate securely and in accordance with the network's security policy. |
| Microsoft.ResourceGraph/resources/read | Resource group | Query spot eviction history rates using Azure Resource Graph for dynamic VM size selection. |

Onboarding managed identity

Managed identity is used by compliance policy to onboard the subscriptions.

| Permission | Scope | Purpose |
| --- | --- | --- |
| Microsoft.Authorization/policyAssignments/\* | Management Group and Tenant | Assign compliance policies. When onboarding, we assign a compliance policy to the selected management group or tenant. |
| Microsoft.Authorization/policyDefinitions/\* | Management Group and Tenant | Define compliance policies to ensure all subscriptions within a management group are fully onboarded |
| Microsoft.Authorization/\*/read | Management Group and Tenant | Read audit log collection |
| Microsoft.Authorization/roleAssignments/\* | Management Group and Tenant | Assign role to the onboarding identity. Used to onboard subscriptions. Roles and assignments are used by different modules to grant minimal access to the monitored subscription. |
| Microsoft.Authorization/roleDefinitions/\* | Management Group and Tenant | Create a role for the onboarding identity. Used to onboard subscriptions. Roles and assignments are used by different modules to grant minimal access to the monitored subscription. |
| Microsoft.Compute/galleries/\* | Management Group and Tenant | Used to onboard the ADS module. Gallery is used for image scanning |
| Microsoft.EventHub/namespaces/\* | Management Group and Tenant | Audit logs are collected by Event Hubs and later collected for analysis |
| Microsoft.Insights/diagnosticSettings/\* | Management Group and Tenant | Diagnostic settings are part of the audit logs that are collected by Event Hubs and later collected for analysis |
| Microsoft.Resources/deployments/\* | Management Group and Tenant | Used to create deployments that will onboard future subscriptions. The deployments are created by remediation tasks for the Cortex compliance policy created when first onboarding. |
| Microsoft.Resources/subscriptions/read | Management Group and Tenant | Facilitate onboarding of subscriptions in the defined scope |
| Microsoft.Resources/subscriptions/resourceGroups/\* | Management Group and Tenant | Used to onboard subscriptions. The resource group is used by different modules for scanning and to facilitate workload separation. |

Automations

| Permission | Scope | Purpose |
| --- | --- | --- |
| Microsoft.Authorization/policyAssignments/read | Subscription | Read the configuration of Microsoft Defender for Cloud policy assignments |
| Microsoft.Authorization/policyAssignments/write | Subscription | Apply Microsoft Defender for Cloud policy assignments to enable security configurations monitoring. This helps remediate issues detected by the "Azure Microsoft Defender for Cloud security configurations monitoring is set to disabled" rule. |
| Microsoft.Compute/disks/read | Subscription | Read the configuration of the Azure VM disk |
| Microsoft.Compute/disks/write | Subscription | Modify the Azure VM disk configuration to disable public network access. This helps remediate issues detected by the "Azure VM disk configured with public network access" rule. |
| Microsoft.Compute/virtualMachines/powerOff/action | Subscription | Power off an existing Azure Virtual Machine. This permission is specifically required to change the state of a VM from `Running` to `Stopped` or `Deallocated`. It is necessary when you want the VM to stop running and thus stop incurring compute charges, unlike the delete permission which removes the resource entirely. Required for command: `azure-vm-instance-power-off` |
| Microsoft.Compute/virtualMachines/read | Subscription | Read the status and configuration details of an existing Azure Virtual Machine (VM). This permission is necessary for any monitoring, inventory, or auditing system that needs to know information like the VM size, operating system, network configuration, tags, and whether the VM is currently running or stopped. Required for command: `azure-vm-instance-details-get` |
| Microsoft.Compute/virtualMachines/start/action | Subscription | Power on an existing Azure Virtual Machine (VM) to change the state of a VM from `Stopped` to `Running`. Required for command: `azure-vm-instance-start` |
| Microsoft.Consumption/budgets/read | Subscription | Read the configuration and current status of established Azure budgets |
| Microsoft.Consumption/usageDetails/read | Subscription | Read detailed usage information for resources, including costs and quantity |
| Microsoft.ContainerRegistry/registries/read | Subscription | Read the configuration of the Azure Container Registry (ACR) |
| Microsoft.ContainerRegistry/registries/write | Subscription | Update the Azure Container Registry (ACR) configuration to disable exports. This helps remediate issues detected by the "Azure Container Registry with exports enabled" rule. |
| Microsoft.CostManagement/forecast/read | Subscription | Read predictive forecasts and historical trends for future Azure costs |
| Microsoft.DBforMySQL/flexibleServers/configurations/read | Subscription | Read the configuration settings of the Azure MySQL flexible server |
| Microsoft.DBforMySQL/flexibleServers/configurations/write | Subscription | Update the Azure MySQL flexible server configuration to enforce SSL. This helps remediate issues detected by the "Azure MySQL database flexible server SSL enforcement is disabled" rule. |
| Microsoft.DBforPostgreSQL/servers/configurations/read | Subscription | Read the configurations of the Azure PostgreSQL server |
| Microsoft.DBforPostgreSQL/servers/configurations/write | Subscription | Update the Azure PostgreSQL server configurations to enable the connection throttling parameter. This helps remediate issues detected by the "Azure PostgreSQL database server with connection throttling parameter is disabled" rule. |
| Microsoft.DBforPostgreSQL/servers/read | Subscription | Read the configuration of the Azure PostgreSQL server |
| Microsoft.DBforPostgreSQL/servers/write | Subscription | Update the Azure PostgreSQL server configuration to enable the SSL connection feature. This helps remediate issues detected by the "Azure PostgreSQL database server with SSL connection disabled" rule. |
| Microsoft.DocumentDB/databaseAccounts/read | Subscription | Read the configuration of the Azure Cosmos DB database account |
| Microsoft.DocumentDB/databaseAccounts/write | Subscription | Modify the Azure Cosmos DB account to disable key-based metadata write authentication. This helps remediate issues detected by the "Azure Cosmos DB key based authentication is enabled" rule. |
| Microsoft.Insights/logprofiles/read | Subscription | Read the configuration of the Azure Activity Log profile |
| Microsoft.Insights/logprofiles/write | Subscription | Set the Azure Activity Log retention period to 365 days or more. This helps remediate issues detected by the "Azure Activity Log retention should not be set to less than 365 days" rule. |
| Microsoft.KeyVault/vaults/read | Subscription | Read the configuration and properties of the Azure Key Vault |
| Microsoft.KeyVault/vaults/write | Subscription | Modify the Key Vault configuration to ensure it is recoverable. This helps remediate issues detected by the "Azure Key Vault is not recoverable" rule. |
| Microsoft.Network/networkInterfaces/read | Subscription | Read the list of Network Security Group (NSG) Interfaces. Required for command: `azure-nsg-network-interfaces-list` |
| Microsoft.Network/networkSecurityGroups/read | Subscription | Read the list of the Network Security Groups (NSGs). Required for command: `azure-nsg-security-groups-list` |
| Microsoft.Network/networkSecurityGroups/securityRules/delete | Subscription | Delete a Network Security Group (NSG) rule to stop overly permissive outbound traffic. This helps remediate issues detected by the "Azure Network Security Group with overly permissive outbound rule" rule. Required for command: `azure-nsg-security-rule-delete` |
| Microsoft.Network/networkSecurityGroups/securityRules/read | Subscription | Read the configuration of a Network Security Group (NSG) rule to assess traffic permissions. Required for command: `azure-nsg-security-rule-get` |
| Microsoft.Network/networkSecurityGroups/securityRules/write | Subscription | Modify a Network Security Group (NSG) rule to stop overly permissive outbound traffic. This helps remediate issues detected by the "Azure Network Security Group with overly permissive outbound rule" rule. Required for command: `azure-nsg-security-rule-create` |
| Microsoft.Network/publicIPAddresses/read | Subscription | Read and list the Network Security Group (NSG) and VM public IP addresses and details. Required for commands: `azure-nsg-public-ip-addresses-list` and `azure-vm-public-ip-details-get` |
| Microsoft.Resources/subscriptions/read | Subscription | Read the status and details of an Azure subscription. Required for command: a`zure-nsg-subscriptions-list` |
| Microsoft.Resources/subscriptions/resourceGroups/read | Subscription | Read the status and details of resource groups within a subscription. Required for command: `azure-nsg-resource-group-list` |
| Microsoft.Sql/servers/databases/securityAlertPolicies/read | Subscription | Read the security alert policy configuration for an Azure SQL Database |
| Microsoft.Sql/servers/databases/securityAlertPolicies/write | Subscription | Update the security alert policy for an Azure SQL Database to enable email notifications for Threat Detection. This helps remediate issues detected by the "Azure SQL Databases with disabled Email service and co-administrators for Threat Detection" rule. |
| Microsoft.Sql/servers/databases/transparentDataEncryption/read | Subscription | Read the Transparent Data Encryption (TDE) status for an Azure SQL database |
| Microsoft.Sql/servers/databases/transparentDataEncryption/write | Subscription | Enable Transparent Data Encryption (TDE) on an Azure SQL database. This helps remediate issues detected by the "Azure SQL database Transparent Data Encryption (TDE) encryption disabled" rule. |
| Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read | Subscription | Read or download the content of a blob (file) stored in Azure Storage. This permission is necessary for any application or user that needs to access the actual data stored inside the containers of an Azure Storage Account. Required for commands: `azure-storage-container-blob-get` and `azure-storage-container-blob-property-get` |
| Microsoft.Storage/storageAccounts/blobServices/containers/blobs/tags/read | Subscription | Read the index tags (metadata) applied to a specific blob (file) in Azure Storage. This permission is necessary for any application or user that needs to query or filter blobs based on the custom tags applied to them, without necessarily reading the entire blob content. Required for command: `azure-storage-container-blob-tag-get` |
| Microsoft.Storage/storageAccounts/blobServices/containers/blobs/tags/write | Subscription | Write, set, or update the index tags (metadata) applied to a specific blob (file) in Azure Storage. This permission is necessary for any application or user that needs to modify the custom index tags on blobs, which is crucial for data lifecycle management and searching. Required for command: `azure-storage-container-blob-tag-set` |
| Microsoft.Storage/storageAccounts/blobServices/containers/blobs/write | Subscription | Write, upload, or create a new blob (file) in Azure Storage, or overwrite the content of an existing blob. This permission is necessary for any application or user that needs to store new data or modify existing file data within the containers of an Azure Storage Account. Required for command: `azure-storage-container-blob-property-set` |
| Microsoft.Storage/storageAccounts/blobServices/containers/delete | Subscription | Enable delete functionality on the Azure Storage account blob service containers. Required for command: `azure-storage-container-delete` |
| Microsoft.Storage/storageAccounts/blobServices/containers/read | Subscription | Read the configuration of Azure Storage account blob service containers. Required for command: `azure-storage-container-property-get` |
| Microsoft.Storage/storageAccounts/blobServices/containers/setAcl/action | Subscription | Set or modify the access control list (ACL) for folders or files within a storage container |
| Microsoft.Storage/storageAccounts/blobServices/containers/write | Subscription | Enable modification of Azure Storage account blob service containers. Required for command: `azure-storage-blob-containers-update` |
| Microsoft.Storage/storageAccounts/blobServices/read | Subscription | Read the configuration of the Azure Storage account blob service. Required for command: `azure-storage-blob-service-properties-get` |
| Microsoft.Storage/storageAccounts/blobServices/write | Subscription | Enable soft delete functionality on the Azure Storage account blob service. This helps remediate issues detected by the "Azure Storage account soft delete is disabled" rule. |
| Microsoft.Storage/storageAccounts/read | Subscription | Read the configuration of the Azure Storage Account |
| Microsoft.Storage/storageAccounts/write | Subscription | Enable access for trusted Microsoft services. This helps remediate issues detected by the "Azure Storage Account 'Trusted Microsoft Services' access not enabled" rule. |
| Microsoft.Web/sites/config/read | Subscription | Read the configuration settings of the Azure App Service Web app |
| Microsoft.Web/sites/config/write | Subscription | Set the HTTP version to 2.0 within the Azure App Service Web app configuration. This helps remediate issues detected by the "Azure App Service Web app doesn't use HTTP 2.0" rule. |
| Microsoft.Web/sites/read | Subscription | Read the status and properties of the Azure App Service Web app |
| Microsoft.Web/sites/write | Subscription | Set the HTTPS-only feature for the Azure App Service Web app to enforce redirection from HTTP to HTTPS. This helps remediate issues detected by the "Azure App Service Web app doesn't redirect HTTP to HTTPS" rule. Required for command: `azure-webapp-update` |

#### Oracle Cloud Infrastructure provider permissions

List of Oracle Cloud Infrastructure provider permissions for Cortex Cloud.

ADS

| Permission | Module | Scope | Purpose |
| :-- | :-: | :-- | :-- |
| Admit group CortexOutpostGroup of tenancy CortexOutpost to use volumes in tenancy | ADS | In tenancy | Allow creation of backups from volumes |
| Admit group CortexOutpostGroup of tenancy CortexOutpost to use key-delegate in tenancy | ADS | In tenancy | Re-encrypt backups during copy/restore operations |
| Admit group CortexOutpostGroup of tenancy CortexOutpost to associate keys in tenancy with volumes in tenancy CortexOutpost | ADS | Volumes in tenancy | Associate encryption keys with volumes during backup/restore |
| Admit group CortexOutpostGroup of tenancy CortexOutpost to use tag-namespaces in tenancy | ADS | In tenancy | Enable tagging for permission scoping, resource tracking, and cost visibility |
| Admit group CortexOutpostGroup of tenancy CortexOutpost to manage boot-volume-backups in tenancy where request.operation != 'DeleteBootVolumeBackup' | ADS | Excludes delete | Allow full management of boot volume backups except deletion |
| Admit group CortexOutpostGroup of tenancy CortexOutpost to manage boot-volume-backups in tenancy where target.resource.tag.cortex_m-o-lcaas_id.panw_capability = 'cortex-scan-platform' | ADS | Only boot-volume-backups tagged with panw_capability = cortex-scan-platform | Restrict deletion to Cortex scan-related resources only |
| Admit group CortexOutpostGroup of tenancy CortexOutpost to read all-resources in tenancy | ADS | In tenancy | Read-only access to all resources |

Discovery Engine

"Discovery Engine" read only access. Grants read-only access to OCI tenancy and resources.

Registry Scan

Table 8. Dynamic Group Permissions

| Permission | Scope | Purpose |
| --- | --- | --- |
| Allow dynamic-group registry-scan to manage buckets in tenancy | Tag-scoped (project_id) | Manage Object Storage buckets for scan artifacts/results |
| Allow dynamic-group registry-scan to manage objects in tenancy | Tag-scoped (project_id) | Upload/download image layers, manifests, and reports |
| Allow dynamic-group registry-scan to read secret-bundles in tenancy | Tag-scoped (project_id) | Retrieve registry credentials from OCI Vault |
| Endorse dynamic-group registry-scan to read repos in any-tenancy | Cross-tenancy | Allow cross-tenancy image pulls for scans |

  

Table 9. Inherited Base Permissions for Registry scanning

| Permission | Scope | Purpose |
| --- | --- | --- |
| Allow any-user to manage buckets in tenancy | Tag-scoped (project_id) | Create/manage buckets for scan data |
| Allow any-user to manage objects in tenancy | Tag-scoped (project_id) | Read/write objects (artifacts, logs, results) |
| Allow any-user to use keys in tenancy | Tag-scoped (project_id) | Decrypt secrets for registry access |
| Allow any-user to manage secret-versions in tenancy | Tag-scoped (project_id) | Rotate credentials and manage secret versions |
| Allow any-user to manage secrets in tenancy | Tag-scoped (project_id) | Create/update secrets for scanners |
| Allow any-user to manage secret-family in tenancy | Tag-scoped (project_id) | Broader secret-management rights |
| Allow any-user to manage vaults in tenancy | Tag-scoped (project_id) | Create/administer Vaults for key and secret storage |
| Allow any-user to inspect tag-family in tenancy | Global | Discover tag namespaces/definitions |
| Allow any-user to use tag-family (namespace=cortex_cloud, managed_by=PANW) | Restricted | Restrict tag usage to Palo Alto-managed groups |
| Endorse any-group to use tag-namespaces in any-tenancy | Cross-tenancy | Allow tag namespace usage across tenancies |

## Generic on-premise data collectors

Learn more about collecting data from generic on-premise data sources in Cortex Cloud.

You can collect data from generic on-premise data collectors that are not necessarily tied to a specific vendor, but are crucial for a wide range of log sources. The following are supported:

-   **Broker VM data collector applets**: Enables ingesting different types of data from the Broker VM, which has a number of data collector applets.
    
-   **XDR Collectors**: Enables using the XDR Collectors (XDRC) configuration that is dedicated for on-premise data collection on Windows and Linux machines to gather and process logs and events from multiple sources.

### Broker VM data collector applets

The Broker VM has a number of data collector applets that you can configure to ingest different types of data. These data collector applets are in addition to the others that are available in the Settings → Configurations → Data Collection → Collection Integrations page with a Data Collection add-on.

Some data collector applets require the Data Collection add-on.

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
