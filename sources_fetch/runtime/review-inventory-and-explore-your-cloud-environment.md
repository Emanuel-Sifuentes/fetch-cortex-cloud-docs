# Review inventory and explore your cloud environment

## Asset management

A comprehensive overview and management interface for all assets in your environment, ensuring complete visibility, control, and protection.

A comprehensive overview and management interface for all assets in your environment, ensuring complete visibility, control, and protection.

### All Assets

Learn about the All Assets page, under Asset Inventory.

The All Assets page provides a centralized repository containing information about all assets within your environment, including enterprise, multi-cloud, code, and external surfaces. Dedicated asset modules allow multi-method asset coverage, such as agent, agentless, logs, from various sources. Having full visibility of assets allows for timely incident response, effective threat hunting, and attack surface reduction.

The asset card provides a unified view of an asset, consolidating attributes, enhancements, and related cases, issues, or findings. The Highlights section provides an overview of the security risks associated with the asset. When you click an asset, the asset card opens in a tab, enabling users to easily switch between multiple asset cards at the same time.

On each Asset card, you can perform the following actions:

-   Leave comments for collaboration, and perform actions on the asset, depending on the type.
    
-   Share links for easy access.
    
-   View asset data: see all relevant data and raw information connected to the asset.
    
-   Use Cortex Assistant/Cortex Agentic Assistant for insights and recommendations.
    

Category, class, and type are terms used to facilitate the organization and classification of assets.

-   **Class**: represents the highest-level grouping of assets based on their general purpose or domain. It is a broad classification that defines the overall function of the assets.
    
    -   Examples: Compute, Network, Data
        
    
-   **Category**: represents a more detailed grouping within a class. It categorizes assets based on their normalized function or common type, regardless of the provider or implementation.
    
    -   Examples: For Compute: Virtual Machine, Container
        
    -   For Data: Bucket, Database
        
    
-   **Type**: the most specific level of classification and represents the provider-specific name for a particular asset within a category. This level directly refers to the specific implementation of an asset.
    
    -   Examples: For the Virtual Machine category: EC2 Instance (AWS), Compute Engine Instance (GCP).
        
    

**Note:**

When working with the Asset Inventory page, consider the following:

-   To maintain an accurate and clutter-free asset inventory, an automated cleanup process periodically removes outdated assets in the background.
    

Fields on the All Assets page

The following is a list of the fields displayed on the All Assets page. The assets shown, and their data, depend on your system's licensing.

| Column | Description |
| --- | --- |
| Name | Displays the name that describes the asset. |
| Provider | The provider that hosts cloud assets, such as GCP, AWS, or Azure. |
| Class | Grouping of assets according to industry standards. For example, Compute, Network, and Storage. |
| Category | Asset types given by each cloud vendor are normalized into this field. |
| Type | A type is the most specific level of classification and represents the provider-specific name for a particular asset within a category. \*\*Note:\*\* The options available are dependent on your license. |
| Region | Displays the region as provided by the Cloud provider. |
| Realm | Account ID. |
| Tags | Users can add information about the asset by adding tags. |
| Cases breakdown | The Cases attached to the asset. |
| Critical cases | When a critical Case is attached to an asset, the number of High or Critical cases appears in brackets. |
| Issues breakdown | The Issues attached to the asset. |
| Critical issues | When a critical Issue is attached to an asset, the number of high or critical cases appears in brackets. |
| Groups | Users can group assets using asset groups. The asset group indicates which assets are grouped together. |
| First observed | Timestamp of when the asset was first observed by the source that reported it. |
| Last observed | Timestamp of when the asset was last observed by the source that reported it. |

Asset tabs

Assets are separated by their respective classes. The following table describes the tabs shown under All Assets.

| Tab | Description |
| --- | --- |
| AI | Provides a detailed view of AI-related assets, their attributes, and associated risks. Key metrics at the top summarize the number of Assets at Risk, AI resources across cloud environments like AWS, Azure, and GCP, and the presence of AI Assets With Sensitive Data. |
| All Cloud | Asset inventory of cloud accounts and applications. |
| APIs | Provides a comprehensive view of APIs in your organization, including their distribution across cloud platforms, exposure status, and detailed attributes. Key metrics at the top summarize: APIs per Cloud; APIs per Service; Internet Exposed APIs |
| Application | The Application Inventory provides a high-level summary and detailed insights into the applications within your environment, including their classification, providers, and categories. Click View Dashboard to navigate to a detailed dashboard for deeper analysis. |
| Code | This section provides an overview of code assets, including all code repositories, Infrastructure as Code (IaC) resources, CI/CD pipelines, and software packages. Click View Dashboard to navigate to a detailed dashboard for deeper analysis. |
| Compute | The Compute Inventory provides a detailed overview of compute resources, including virtual machines, containers, serverless functions, Kubernetes clusters, general devices, and other compute assets across your environment. Click View Dashboard to navigate to a detailed dashboard for deeper analysis. |
| Data | The Data Inventory provides an overview of data assets and their associated risks, including the number of Assets at Risk, data stored in AWS, Azure, and GCP, Sensitive Assets, and assets marked as Open to the World. |
| Device | Overview of assets with devices that have a Cortex XDR agent installed. |
| External Surface | The All External Surface Inventory provides an overview of external-facing assets, including services versus websites, domains versus certificates, and their distribution across providers. |
| Identity | The Identity section provides an overview of identity-related assets, including All Identity Assets, Human Identities, Non-Human Identities, Cloud Service Accounts, IAM Groups, and IAM Policies, giving visibility into both user and service-based identities and their associated permissions. Click View Dashboard to navigate to a detailed dashboard for deeper analysis. |
| Network | The Network section provides an overview of network-related assets, including All Network resources, Load Balancers, Network Interfaces, Security Groups, and Subnets, offering visibility into the network infrastructure and security configurations within your environment. Click View Dashboard to navigate to a detailed dashboard for deeper analysis. |
| Security Services | This section provides a complete overview of the security services being actively managed within your environment. |
| All Other Assets | All assets that are uncategorized. |

#### Container Images
Overview

Container Images are fundamental, immutable assets that package applications and their dependencies for consistent deployment across cloud environments. Each image is uniquely identified by a SHA256 digest, ensuring content verifiability throughout its lifecycle across build, deploy, and run stages. You can assign multiple names and tags to a single container image, allowing you to reference the same image in various contexts and versions within container registries.

##### Container Image Types

Understanding the different types of container images helps you manage assets, investigate findings, and resolve related issues more efficiently. You can also use this information to: 

-   query assets by image Type using graph searches or XQL
    
-   group assets based on image classification
    
-   apply cloud workload policies to monitor and protect your environment
    

The following table summarizes each container image type, its purpose, and key characteristics to help you effectively manage container images.

| Image Type | Description | Key Characteristics |
| --- | --- | --- |
| Core Image | Represents the immutable content of the container image itself. | **Purpose:** Forms the foundation for other image types: Build, Registry, and Runtime Images. **Properties:** Identified by a unique SHA256 digest.; Contains file-related findings (for example, vulnerabilities, secrets, malware).; Has no scope and cannot directly be part of an asset group or policy, as it purely represents the image's content.; Does **not** include issues. **Relationships with other image types:** Can reference another Core Image as its base, establishing a hierarchical relationship between images.; Can be the "base of" another Core Image. **User Interaction:** You can query Core Image assets through XQL.; Find Core Images listed under Inventory → All Assets → Compute → Container Images |
| Build Image | Represents a container image created from a CI/CD pipeline or build processes. | **Purpose:** Exists when discovered through CLI scanning in the platform.; Helps with build traceability and integrity verification. **Properties:** Includes build metadata such as build time, source code repository, and build environment.; Contains findings and issues related to the build image. **Relationships with other image types:** A Build Image represents a Core Image, and a Core Image can be represented by a Build Image. **User Interaction:** You can query Build Image assets through XQL.; Find Build Images listed under Inventory → All Assets → Compute → Container Images |
| Registry Image | Represents a container image stored within a container registry (for example, AWS ECR, Azure ACR, Google GAR, JFrog Artifactory, Docker). | **Purpose:** Exists only when discovered through cloud discovery or registry scanning for onboarded registries.; Helps manage images within registries and ensures compliance with registry policies. **Properties:** Includes registry-specific findings (for example, retention policy, FQDN, repository name, image tags, manifest digests). **Relationship with other image types:** The container image registry contains an image repository, and a Registry Image resides within the image repository.; A Registry Image represents a Core Image, and a Core Image can be represented by a Registry Image. **User Interaction:** You can query Registry Image assets through XQL.; Find Registry Images listed under Inventory → All Assets → Compute → Container Images |
| Runtime Image | Represents container images stored, running, or defined in a workload asset (such as VMs, Kubernetes workloads). | **Purpose:** Exists when discovered through Agentless Disk scan and XDR agent scan.; Ensures that runtime images adhere to security policies and provides visibility into their deployment and operational state. **Properties:** Contains findings related to its deployment and operational state, such as configuration deviations and security policy violations. File-related findings are derived from the connected Core Image. **Relationships with other images:** A Runtime Image "represents" a Core Image, linking the runtime state to the immutable content of the image.; A Core Image is "represented by" a Runtime Image, ensuring that any findings related to the image files are considered during runtime evaluations. **User Interactions:** You can query Runtime Image assets through XQL.; Find Runtime images listed under Inventory → All Assets → Compute → Container Images |

##### Container Images asset inventory

The Container Images asset inventory provides a centralized view of all scanned container images and their details across your environments. The platform enables efficient tracking and management of your container images, ensuring compliance with security and governance standards. 

You can directly access container image issues and findings within the inventory, which allows you to prioritize and remediate them without navigating to a separate remediation section.

To access container image assets:

1.  Go to Inventory.
    
2.  All Assets → Compute → Container Images.
    

##### Explore the container images inventory

The Container Image assets inventory includes a dashboard with OS Distro, OS Version, and Base Image widgets displayed by default, and an inventory table. Selecting a widget automatically filters the inventory table based on the widget's criteria.

The inventory table includes the following fields. You can filter results by any heading and value:

| Fields | Description |
| --- | --- |
| Asset ID | A unique identifier assigned to the image. |
| Provider | The provider that hosts cloud assets, such as AWS, Azure, Docker, GCP, JFrog Artifactory, OCI, and Not Applicable (for core images). |
| Asset Type | Types of container images: Core Image: Represents the immutable content of the container image itself. It is identified by a unique SHA256 digest, ensuring that any alteration to its content results in the creation of a new Core Image.; Build Image: Represents the image created from a pipeline or build process, capturing the context of the build environment and time.; Registry Image: Represents the container image stored in an artifact repository within a container registry. It exists only when discovered as part of cloud discovery or registry scan for onboarded registries.; Runtime Image:  Represents container images stored, running, or defined in a workload asset (VMs, Kubernetes workloads), identified by its name and digest in the runtime environment. |
| Name | The container image name. |
| Image Type | Image file format. For example, Docker and OCI formats. |
| Image Identifier | A unique identifier assigned to a specific version of a container image, used to distinguish it from other images and ensure consistency across deployments. |
| Names | Aggregation of all the observed image names over time. |
| Realms | Indicates which connector the registry belongs to. For managed registries (such as ECR, GAR, and ACR), this field shows the CSP account. |
| SDLC Stages | Shows the SDLC stage when the image was created. For example, Runtime. |
| Base Image | Indicates whether an image is a base image (Yes) or a non-base (derived or application-specific) image (No). |
| Base Image | Displays the number of images derived from the base image. For example, Base image |2 indicates there are two images derived from it. |
| Tags | Labels assigned to container images to identify and reference specific versions or variants. |
| Digest | A unique, content-based SHA256 hash that immutably identifies a specific container image version. |
| Architecture | The CPU architecture for which the container image is built. For example, amd64, arm64, x86 |
| Image OS | The base operating system environment version the container image uses. For example, 12.10 |
| OS Distribution | The operating system (OS) distribution name. For example, Debian. |
| Operating System | Operating system details of the image. For example, Linux. |
| OS Version | The version or release number of that OS distribution. For example, 20.04 for Ubuntu) |
| OS Concat | Shows combined values of OS distribution and OS version. For example, Debian 11 or Debian bookworm. |
| Size | Size of the container image in bytes. |
| First Observed | Timestamp of when the image was first observed by the source that reported it. |
| Last Observed | Timestamp of when the image was last observed by the source that reported it. |
| Scanners | List of scanners that have scanned the container image. As the container image can be scanned by multiple scanners, the values are stored as a concatenated string of all scanner types. If no scanner data exists for an asset in the database, the default value is an empty array. This column is hidden from the default view. |
| Last Scan | Timestamp of the most recent scan time for the container image, considering all scanners that have scanned it. If no scan data exists in the database for the container image, the default value is 0. This column is hidden from the default view. |

##### Expanded Container Images asset information

On the Container Image page, select an asset in the inventory table to open a detailed Asset card, which provides additional, in-depth information about the asset. The information is organized into tabs, including an Overview tab (displayed by default) that provides highlights and a general summary, while contextual tabs focus on particular properties of the asset. The card also includes details about detected risks, allowing you to explore them directly from the asset inventory. You can also perform actions on the asset using the Actions menu.

##### Container Image summary

The Container Image Summary, displayed at the top of the card, provides concise details about the image, such as its type, cloud provider, and name.

Overview

The Overview tab summarizes container image Highlights, Properties, Scan information details, and Relationships between the current image and its Core Image.

Highlights include:

-   Critical/High issues: An aggregation of critical and high issues associated with the container image. Clicking on this property redirects you to the Issues page, filtered by specific asset and severity level.
    
-   Visibility timeline: When the container image was first and last detected.
    
-   Risk summary: The risks associated with the container image, grouped by category (cases, issues, and findings). Each category includes the total number of associated risks, as well as a specific count for each severity level.
    

Properties include:

-   Includes identifying information and cloud location of the container image: Name, ID (such as ARN in AWS), cloud Provider, cloud Region, and Account ID.
    
-   Additional details: Includes Asset category, Asset Groups, Image Digest, Base image name along with its URL (if present), and Image name.
    

OS/ARCH includes:

OS information:  Includes OS related information for that container image, such as OS distro, OS release, size in bytes, operating system, Docker Labels, and the type of architecture the image is compatible with.

Scan management includes:

Information about the last scan, including scanner name, version, and scan status for vulnerabilities, compliance, secrets, and malware.

Relationships include:

Information about how each logical image (Build, Registry, Runtime) is linked to the Core Image it represents, ensuring that any findings related to the Core Image are contextualized within the scope of the logical images.

This feature enables you to precisely identify the registry and repository source of any running image, directly linking runtime security findings to their origin. As a result, you can rapidly answer complex audit and security questions, such as determining which registry images are currently deployed in runtime.

SBOM

The SBOM tab displays details about the Software Bill of Materials (SBOM) generated by the scanning process. Exposed properties include Type, Name, Binary Packages, Version, Path, and License.

Export SBOM: You can export the entire SBOM, or selected attributes from any of the tabs in the expanded card: 

Select menu → file format. Supported formats: `XML`, `json`

Vulnerabilities

The Vulnerabilities tab provides inventories for Findings, Packages, and Layers, enabling you to assess potential risks and prioritize remediation efforts.

Findings: Displays a list of findings, along with their associated CVE ID and description, EPSS score, CVSS score and severity, CVE risk factors, affected software, and fix versions, when available. 

Packages: Displays a list of packages, their name and version, the total number of vulnerabilities found within each package, a breakdown of vulnerabilities by severity level and count, their EPSS (Exploit Prediction Scoring System), which estimates the likelihood of exploitation; CVSS (Common Vulnerability Scoring System), which rates the technical severity of the vulnerability; location; base image vulnerability; and whether a fix is available.

Layers: Displays the various layers and their contents within a container image.

Applications

The Applications tab identifies any embedded applications within the image, helping you assess security risks associated with the bundled software.

#### Kubernetes Cluster

Learn about the Kubernetes Cluster feature, under the Asset Inventory page.

Navigate to Inventory → All Assets → Compute → Kubernetes Cluster for a Kubernetes Clusters assets overview. Reference the assets overview page to comprehensively assess the overall security posture of your Kubernetes (K8s) environment.

Select any cluster, to view all resources within it and any connected clusters. The Cluster details panel provides a detailed breakdown of assets, and the nodes within each cluster. Choose any of the following tabs for additional information:

-   Click Resource Explorer to view the clusters components and identify any security breaches. Disconnected clusters do not show any data. Ensure all clusters are connected for maximum protection.
    
-   Select the Vulnerabilities tab to to see a list of all cluster nodes. Click on any cluster to further analyze the vulnerability. You can also find specific container images in the vulnerability list and view the container images, namespaces, and associated K8s deployment. Options include:
    
    -   Container Image Vulnerability Findings: Displays all the vulnerabilities found in the container images running within the cluster. Select any cluster to view vulnerability details such as Max CVSS Severity, Associated K8s Resource Type, etc.
        
    -   Kubernetes Nodes Vulnerability Findings: Provides a detailed view of vulnerabilities effecting the Kubernetes worker and master nodes. Select any node from the table view to see more information, such as Node type, associated Vulnerabilities, and Max CVSS Severity.
        
        **Note:**
        
        The Vulnerabilities tab is only available if the cluster you wish to analyze has a K8s connector.
        
    

Select Kubernetes Connectivity Management to manage the connector-connectivity of cluster assets, including connector versions, upgrades, statuses, and more. Here, you can check if a cluster is connected, view the status, and see the connector version. You can also update to a new connector version when one is released.

#### Virtual Machine Image Scanning
Cortex VM image scanning is an Agentless Scanning feature that enables you to inspect the risks and vulnerabilities of a cloud workload without installing an agent or affecting the execution of your workload.

Agentless Scanning of VM images is automatically enabled upon onboarding a cloud account to Cortex Cloud. Disabling this feature will prevent VM images on your account from being scanned for vulnerabilities and risks, thereby reducing your account's overall security coverage.

Cortex Agentless scanning extends to _private VM images_ across the following major cloud platforms:

-   _Amazon Web Services (AWS)_: Cortex exclusively scans private Amazon Machine Images (AMIs).
    

-   _Microsoft Azure_: Scanning is limited to private Gallery versioned Images.
    

-   _Google Cloud Platform (GCP)_: Cortex Cloud supports scanning of private VM images.
    

Once you onboard your cloud account with Cortex Cloud, it is continuously scanned regardless of how many workloads are under that account. Whether you add or remove hosts and containers, agentless scanning keeps your workload’s security issues visible.

##### VM Images Page
Navigate to Inventory → All Assets → Compute → VM images for Agentless VM Image scanning overview.

The VM images page shows the following section.

_Widget Panel:_ It provides ‘at-a-glance’ information on VM images grouped by Cloud Providers, OS distribution and architecture.

_VM images Table:_ The VM images table displays all the VM images added to your account. The following list of fields is displayed on the VM Images page.

| Column   | Description |
| --- | --- |
| Provider | Cloud Account Provider |
| Name | Name of the VM image |
| Region | Geographical location within a cloud provider's infrastructure where that VM image is located |
| Architecture | Architecture of the VM image. For example: x86_64 |
| Image OS | The OS distribution version. For example: 2020 or 20 |
| OS Distribution | Operating System distribution details |
| Operating System  | Operating System on the VM image |
| OS version  | Version of the operating system |
| Tags | User-defined label to correlate VM images and Instances |
| Size  | Size of the VM image |
| Created At | The time when the VM Image was created in the Cloud provider |
| First Observed | The first scan time of the VM image |
| Last Observed | The last scan time of the VM image |
| Scanners | List of scanners that have successfully scanned the Core Image asset. As the core image can be scanned by multiple scanners, the values are stored as a concatenated string of all scanner types. If no scanner data exists for an asset in the database, the default value is an empty array. This column is hidden from the default view. \*\*Note:\*\* The data in the Scanners column is accurate only for Core Image assets. Ignore the Scanners value for assets categorized as Registry, Build, or Runtime images, as it may not reflect an accurate scan status. |
| Last Scan | The Last Scan time reflects the most recent scan across all scanners for a Core Image. If no scan data is available in the database for the core image, the default value is 0. This column is hidden from the default view. \*\*Note:\*\* The Last Scan value is only accurate for Core Image assets; ignore the Last Scan values for Registry, Build, and Runtime images, as they may be incorrect. |

##### VM Image Details Page
Navigate to Inventory → All Assets → Compute → VM images. Click on a VM image, and the VM image card opens in a tab, enabling users to easily switch between multiple VM cards at a glance.

The VM image card provides a unified view of a VM image, consolidating VM details and related configuration issues and vulnerabilities found during VM image scanning.

On each VM image card, you can perform the following actions:

Overview

-   View VM details like OS details, findings, Cases and more.
    
-   VM scan Information. For example: In-Progress, completed and more.
    
-   View the relationship graph between the VM instance and the VM Image. If the VM image is not used to create any VM instance, the graph section will show no results. This feature enables you to precisely identify the registry and repository source of any running image, directly linking runtime security findings to their origin. As a result, you can rapidly answer complex audit and security questions, such as determining which registry images are currently deployed in runtime.
    

Configurations

This tab lists all the cloud configuration issues seen during the VM image scanning.

Asset Configuration JSON section provides the details of the VM image in JSON format.

Vulnerabilities

Vulnerabilities\- Lists all the vulnerability findings during VM image scans.

Packages - All the packages with related vulnerabilities found during the VM image scans.

#### Cortex Cloud discovery catalog

Cortex Cloud discovers assets across CSPs by querying APIs to build a complete inventory and provide visibility.

Cortex Cloud provides visibility into cloud infrastructure by discovering assets and services across connected Cloud Service Providers (CSPs). The platform queries specific provider APIs to build and maintain a complete inventory.

##### What information is included in the discovery catalog

The discovery catalog provides an up-to-date inventory of your cloud assets. Information is gathered using an efficient, event-driven process that ensures the catalog reflects the current state of your environment.

How information is gathered

The data in the catalog comes from two primary methods:

-   Periodic Scans: The discovery engine runs full scans using Resource Ingestion Templates (RITs) twice a day to gather comprehensive data.
    
-   Event Assisted Ingestion (EAI): For near real-time updates, EAI monitors cloud audit logs. When a supported asset is created or changed, a targeted scan is triggered to update that specific resource almost immediately.
    

Criteria for inclusion

A resource is included as a distinct asset in the catalog only if it meets a specific criterion:

-   The Resource Ingestion Template (RIT) used to discover the resource must have a defined resource_type.
    
-   If the resource_type field is blank, the information gathered may be used to enrich other assets, but it will not create a new, standalone asset in the catalog.
    
-   The asset information is structured using a Class > Category > Type hierarchy.

### Network configuration

Cortex Cloud Network Configuration provides a representation of your network assets by collecting and analyzing your network resources.

Network asset visibility is a crucial investigative tool for discovering rogue devices and preventing malicious activity within your network. The number of managed and unmanaged assets in your network provides vital information for assessing security exposure and tracking network communication effectively.

Cortex Cloud Network Configuration accurately represents your network assets by collecting and analyzing the following network resources:

-   User-defined IP Address Ranges and Domain Names associated with your internal network.
    
-   EDR data collected by Firewall Logs.
    
-   Cortex Cloud Agent Logs.
    
-   ARP Cache
    
-   Broker VM Network Mapper
    

In addition to the network resources, Cortex Cloud allows you to configure a Windows Agent Profile to scan your endpoints using Ping. This scan provides updated identifiers of your network assets, such as IP addresses and OS platforms. The scan is automatically distributed by Cortex Cloud to all the agents configured in the profile and cannot be initiated by request.

With the data aggregated by Cortex Cloud Network Configuration, you can locate and manage your assets more effectively and reduce the amount of research required to:

-   Distinguish between assets managed and unmanaged by a Cortex Cloud agent.
    
-   Identify assets that are part of your internal network.
    
-   Monitor network data communications both within and outside your network.

#### Configure your network parameters

Define the IP address ranges and domain names used by Cortex Cloud to identify your network assets.

Internal IP address ranges and domain names must be defined in order to track and identify assets in the network. This enables Cortex Cloud to analyze, locate, and display your network assets.

##### Define internal IP address ranges

1.  In Cortex Cloud, select Assets Network Configuration.
    
2.  Define an IP address range.
    
    By default, Cortex Cloud creates Private Network ranges that specify reserved industry-approved ranges. These ranges can only be renamed.
    
    To Add New Range, select either:
    
    -   Create New.
        
        1.  In the Create IP Address Range dialog box, enter the IP address Name and IP Address, Range or CIDR values.
            
            **Note:**
            
            You can add a range that is fully contained in an existing range, however, you cannot add a new range that partially intersects with another range.
            
        2.  Click Save.
            
        
    -   Upload from File
        
        1.  In the Upload IP Address Range dialogue box, drag and drop or search for a CSV file listing the IP address ranges. Download example file to view the correct format.
            
        2.  Click Add.
            
        
    

##### Define domain names

1.  In Cortex Cloud , select Assets → Network Configuration → Internal Domain Suffixes.
    
2.  In the Internal Domain Suffixes section, +Add the domain suffix you want to include as part of your internal network. For example, **`acme.com`**.
    
3.  Select  to add to the Domains List.
    

##### IP address ranges fields

| FIELD | DESCRIPTION |
| --- | --- |
| Range Name | Name of the IP address range defined. |
| First IP Address | First IP address value of the defined range. |
| Last IP Address | Last IP address value of the defined range. |
| Active Assets | Number of assets within the defined range that have reported Cortex Agent logs or appeared in your Network Firewall Logs. |
| Active Managed Assets | Number of assets within the defined range reported Cortex Cloud Agent logs. |
| Modified By | Username of the user who last changed the range. |
| Modification Time | The timestamp shows when this range was last changed. |

### Asset Groups

Learn about the Asset Groups feature, under the Asset Inventory.

By grouping assets based on shared attributes, you can address them collectively. This enables more efficient bulk actions and simplifies both filtering and scoping within the inventory and across the platform.

To create an Asset Group:

1.  Navigate to Inventory → Assets → Groups → Add Group.
    
2.  Define a meaningful Group Name that represents the group's purpose to improve usability. You can choose between two types of Asset Groups:
    
    -   Dynamic Groups: Use the filters Provider or Realm, to group current and future assets that meet the defined criteria. Click Create Dynamic Group to save.
        
    -   Static Groups: Manually select individual assets to include in a group. After selection, click Create Static Group.
        
    
3.  Add an optional Description to further clarify.
    

#### Use cases

Once your Asset Group has been defined, you can use it in specific areas of the platform for the following:

-   Enrich asset data: Add information to a set of assets that isn't directly stored on the asset itself.
    
-   Reuse asset groups: Reference the same group across different areas of Cortex Cloud, for example, in Policies and Rules.
    

**Note:**

When you create or edit an Asset Group, the changes are applied immediately to new assets and to existing assets that have been updated. However, it may take a few hours for the changes to appear on existing assets that have not been updated.

### Asset Roles

View asset roles and the number of assets that are associated with each role. Learn how to manage asset roles for users and endpoints.

**Note:**

Asset Roles are available only if the Identity Threat Module add-on is enabled.

Cortex Cloud continuously analyzes your users and endpoints, and automatically classifies them based on their activities under asset roles, for example, Domain Controller, Administrator, and Executive User. You can edit, add, and fine-tune the assets associated with each asset role at any time.

Fine-tuned asset roles aid Cortex Cloud Analytics in the following areas.

-   Enhancement of the accuracy of the analytics that runs on assets, enabling better detection of uncommon activities by the asset based on the baseline for the asset role.
    
-   Asset role visualization in the Incident view, the User view, and the Host view as background information for risk assessment.
    
-   Analysis of User and Host peer groups for score trend comparison over selected timelines.
    

You can add users and endpoints to any asset role manually or by importing a CSV file.

You can remove users from asset roles manually and override the automatically detected asset roles.

The tag family for asset roles provides the ability to slice and dice alerts and incidents. Automated and customizable asset role classification is based on constant analysis of the users and hosts in your network. You can edit and manage the User Asset Roles and Host Asset Roles to meet the needs of your organization.

The Asset Roles Configuration page displays the asset roles, their type, the number of assets that are associated with each asset role, and the last modification date. On this page, you can refresh the data, filter it, and change the layout.

To edit an asset role, right-click and select Edit Asset Role. Depending on the type of asset, you can manage the user asset role list or the endpoint asset role list for the asset role.

#### Manage Asset Roles for Endpoints

Learn how to edit the host lists assigned to asset roles.

**Note:**

Endpoint Role Management is available only if the Identity Threat Module add-on is enabled.

The Edit Endpoint Role page enables you to edit the host lists assigned to asset roles. You may want to exclude some endpoints from certain asset roles even if Cortex Cloud automatically detected the endpoint as having this asset role. For example, if an endpoint is reassigned to another user and you want their Analytics to be adjusted accordingly.

The Endpoints list on the page displays the endpoints classified under the asset role, if the asset role was assigned automatically or edited manually for the endpoint, the last modification date, and the modifier.

To access the Edit Endpoint Role page, from Asset Role Configuration, right-click to select the endpoint asset role and click Edit Asset Role.

Included Endpoints displays all the endpoints Cortex Cloud automatically detects as having this asset role and the endpoints you specify manually as having this asset role. Excluded Endpoints displays the endpoints that were manually removed from an asset role. When you exclude an endpoint, it remains in the Excluded Endpoints list and if detected automatically again in the future as having this role, will not be included in the role list.

If you want to remove an endpoint from the list of endpoints with this asset role, right-click the endpoint and select Exclude Endpoint. The endpoint is then listed under Excluded Endpoints for this asset role. When you exclude an endpoint from an asset role, by default Cortex Cloud also removes the endpoint from the parent asset roles of the current asset role. To remove the endpoint from the child asset role, but to leave it in any of its parent asset roles, click Advanced Exclusion Settings, and select Don't Exclude next to the name of the parent asset role(s).

To include an Excluded endpoint back in the asset role, in the Excluded Endpoints list, right-click the endpoint and select Delete Endpoint. If the endpoint was automatically detected as having this asset role. it will be added back to the Included Endpoints list again. Otherwise, the next time Cortex Cloud scans the assets and automatically detects their asset roles, this endpoint will be included in the asset role list.

To include endpoints from your system manually in an asset role list, in the asset role page, click Add Endpoint. Select the endpoint from the displayed endpoint list, which displays the endpoints managed by the tenant. You can only add endpoints that have the Cortex Cloud agent installed on them.

Manually added endpoints are analyzed by Analytics when it runs next and are displayed in the Incident view and the Host Risk view.

To delete a manually added endpoint from the Included Endpoints list, right-click and Delete Endpoint.

**Note:**

Deleting a manually added endpoint removes the endpoint from the Included Endpoints list. If this endpoint is detected automatically as having this asset role in the future, it will appear in the Included Endpoints list.

Excluding a manually added endpoint ensures that even if in the future the endpoint is detected as having this asset role, this detection is overridden and the endpoint isn't included in the asset role.

To change the name of an endpoint, right-click the endpoint name and Edit Endpoint.

#### Manage Asset Roles for Users

Learn how to edit the user lists assigned to asset roles.

**Note:**

User Role Management is available only if the Identity Threat Module add-on is enabled.

The Edit User Role page enables you to edit the user lists assigned to asset roles. You may want to exclude some users from certain asset roles even if Cortex Cloud automatically detected the user as having this asset role. For example, if a user's position in the organization is changed and you want their Analytics to be adjusted accordingly.

The User list on the page displays the users classified under the asset role, if the asset role was assigned automatically or edited manually for the user, the last modification date, and the modifier.

To access the Edit User Role page, from Asset Roles Configuration, right-click to select the user asset role and click Edit Asset Role.

Some asset roles are nested under parent asset roles which are higher in the hierarchy of asset roles. The information icon next to the asset role name provides the name of the parent rule this asset role may be nested under. For example, an Admin User asset role may be a child asset role of the parent asset role Sensitive User.

Included Users displays all the users Cortex Cloud automatically detects as having this asset role and the users you specify manually as having this asset role. Excluded Users displays the users that were manually removed from an asset role. When you exclude a user from an asset role, it remains in the Excluded Users list and even if it's detected automatically again in the future as having this asset role, it will not be included in the asset role list.

If you want to remove a user from the list of users with this asset role, right-click the user and select Exclude User. The user is then listed under Excluded Users for this asset role. When you exclude a user from an asset role, by default Cortex Cloud also removes the user from the parent asset roles of the current asset role. To remove the user from the child asset role, but to leave it in any of its parent asset roles, click Advanced Exclusion Settings, and select Don't Exclude next to the name of the parent asset role(s).

To include an excluded user back in the asset role, right-click the user in the Excluded Users list and select Delete User. If the user was automatically detected as having this asset role, it will be added back to the Included Users list again. Otherwise, the next time Cortex Cloud analyzes the assets and automatically detects their asset roles, this user will be included in the asset role list.

To include users from your system manually in an asset role list, in the asset role page, click Add User.

-   To add one or more users manually, click Add New, and then type the user names one by one in the format Netbios\\samAccount.
    
-   To add users from a CSV file, click Import from File. You can use the example file provided to structure your CSV file.
    

Manually added users are also analyzed by Analytics when it runs next, and are displayed in the Incident view and the User Risk view.

To delete a manually added user from the Included Users, right-click and Delete User.

**Note:**

Deleting a manually added user removes the user from the Included Users list. If this user is detected automatically as having this asset role in the future, it will appear in the Included Users list again.

Excluding a manually added user ensures that even if in the future the user is detected as having this asset role, this detection is overridden and the user isn't included in the asset role.

To change the name of a user, right-click the user name and Edit User.

##### Honey user

Honey users are decoy users designed to attract potential attackers.

**Prerequisite:**

The honey user role is available only if the Identity Threat Module add-on is enabled.

A honey user is a decoy account designed to mimic a legitimate user within your environment. This kind of user looks attractive to potential attackers, with access to many assets, and is used for triggering alerts if accessed.

One of the techniques used by an attacker trying to gain access to your network is attempting to use the credentials of accounts in your organization. By setting up honey users, you can detect these access attempts as soon as they occur. Unlike genuine user accounts, honey users have no legitimate purpose within the organization, making any activity involving them inherently suspicious. Cortex Cloud uses its out-of-the-box Identity Threat Module to automatically detect activity on the honey user role for identifying suspicious activities.

To use a honey user account for detection, you must configure it manually.

Configure a honey user

1.  In Assets → Asset Roles Configuration, right click to select Honey User.
    
2.  Click Edit Asset Role.
    
3.  Select Add User → Add New and enter the honey user account details in the NetBIOS\\SAM Account format.

### Manage Asset Scores

Learn how to view and investigate User Scores and Host Scores using the Asset Scores page.

The Asset Scores page provides a central location from which you can view and investigate information relating to User Scores and Host Scores in your network.

**Note:**

The Hosts tab is available if the Identity Threat Module add-on is enabled.

Cortex Cloud aggregates Workday and Active Directory data to create a list of user and host assets within your network. When alerts and incidents occur, they are associated with a host or user asset and Cortex Cloud calculates a score that represents the risk level of each asset. This score helps to identify high-risk assets in your organization and detect compromised accounts and malicious activities.

To Include System Users in the table, select the Include System Users checkbox: system users are SYSTEM, administrators, NT authority, and others.

**Note:**

As new alerts are associated with incidents, the User and Host Scores are recalculated. You can view the latest User and Host Scores on the Asset Scores page, or track the Score trend on the User Risk View and Host Risk View.

To investigate your users and hosts:

1.  Select Assets → Asset Scores. Use the toggle in the page header to switch between the Users and Hosts tabs.
    
2.  Filter and review your assets.
    
    The fields in the Users tab
    
    | Field | Description |
    | --- | --- |
    | Starred | Whether the user is included in the watchlist. |
    | Score | Represents the Cortex Cloud high-risk user score. The score is updated continuously as new alerts are associated with incidents. |
    | User name | Name of the user as provided by Cortex Cloud. |
    | Full name | Name of the user as provided by Workday or Active Directory. |
    | Department | Department of the user as provided by Workday or Active Directory. |
    | Email | Email of the user as provided by Workday or Active Directory. |
    | Member of | (Derived from AD) The security groups that the user is associated with. |
    | Featured | Whether the user is flagged as a featured user in the platform. |
    | Location | Location of the user as provided by Workday or Active Directory. |
    | Last login | Last date and time the user accessed Cortex Cloud. |
    | Asset role | Asset roles that the user is associated with. |
    
    The fields in the Hosts tab
    
    | Field | Description |
    | --- | --- |
    | Starred | Whether the host is included in the watchlist. |
    | Hostname | Unique ID of the host. |
    | Score | Host score. |
    | IP | IP on which the endpoint is running. |
    | Has XDR agent | Whether the endpoint has an XDR agent installed. |
    | Users | Users assigned to the endpoint. |
    | Agent installation date | Date and time that the XDR agent was installed. |
    | Last communication | Date and time of last communication. |
    | Operating system | Operating system with which the endpoint is running. |
    | Endpoint isolated | Whether the endpoint is isolated. |
    | Featured | Whether the host is flagged as a featured host in the platform. |
    | Tags | Endpoint tags applied to the host. |
    | Group names | User groups that the host is associated with. |
    | Asset role | Asset roles that the host is associated with. |
    
3.  To investigate further, right-click on a selected host or user and click Open User Risk View or Open Host Risk View. For more information, see Investigate a user and Investigate a host.Investigate a userInvestigate a host
    
    **Note:**
    
    Some User Associated Insights may not appear as part of the User Associated Incidents due to the insight generation mechanism. For example, when an insight related to one of the assets in an incident is generated a few days after the associated incident, the insight may not be associated with the incident.

### Vulnerability Assessment

Perform a vulnerability assessment of all endpoints in your network using Cortex Cloud. This includes CVE, endpoint, and application analysis.

Cortex Cloud vulnerability assessment enables you to identify and quantify the security vulnerabilities on an endpoint. After evaluating the risks to which each endpoint is exposed and the vulnerability status of an installed application in your network, you can mitigate and patch these vulnerabilities on all the endpoints in your organization.

Vulnerability Assessment

Vulnerability Assessment uses an advanced algorithm to collect extensive details on CVEs from comprehensive databases and to produce an in-depth analysis of the endpoint vulnerabilities.

**Prerequisites:**

The following are prerequisites for Cortex Cloud to perform a vulnerability assessment.

| Requirement | Description |
| --- | --- |
| Licenses and Add-ons |  |
| Supported Platforms | **Windows**- Cortex XDR agent 8.3 or a later release.; Cortex Cloud collects all the information about the operating system and the installed applications, and calculates CVE.; CVEs that apply to applications that are installed by one user aren't detected when another user without the application installed is logged in during the scan. ; **MacOS**- Cortex XDR agent 8.3 or a later release.; Cortex Cloud collects all the information about the operating system and the installed applications, and calculates CVE. |
| Setup and Permissions | Ensure Host Inventory Data Collection is enabled for your Cortex XDR agent.Set up agent settings profiles |
| Certificates for Windows and macOS | When Advanced Vulnerability and Assessment is enabled, these certificates are a prerequisite for Windows and macOS. Download the certificates from [here](https://docs-cortex.paloaltonetworks.com/v/u/EJVLvtinTtrAb~Na9XuXag). Import the _Digicert Trusted Root G4_ certificate into the Trusted Root Certification Authorities store in the local machine.; In some environments, if the scan does not initialize, the _DigiCert Trusted G4 Code Signing RSA4096 SHA384 2021 CA1_ certificate, may also be required. Import the signed certificate into the Intermediate Certification Authorities store in the local machine. |
| Limitations | Some CVEs may be outdated if the Cortex XDR agent wasn't updated recently.; Application versions which have reached end-of-life (EOL) may have their version listed as 0. This doesn't affect the detection of the CVEs.; Some applications are listed twice. One of the instances may display `invalid version`, however, this doesn't affect the functionality.; The scanning process may impact performance on the Cortex XDR agent during scanning. The scan may take up to two minutes. |

You can access the Vulnerability Assessment panel from Inventory+Endpoints → Host Inventory → Vulnerability Assessment.

After enabling the feature for the first time, it may take up to a week to get the updated data into the platform. Re-collecting the data from all endpoints in your network could take up to 6 hours. After that, Cortex Cloud initiates periodical recalculations to rescan the endpoints and retrieve the updated data. If at any point you want to force data recalculation, click Recalculate. The recalculation performed by any user on a tenant updates the list displayed to every user on the same tenant.

#### CVE Analysis

To evaluate the extent and severity of each CVE across your endpoints, you can drill down into each CVE in Cortex Cloud and view all the endpoints and applications in your environment that are impacted by the CVE. Cortex Cloud retrieves the latest information from the NIST public database. From Inventory → Endpoints → Host Inventory → Vulnerability Assessment, select CVEs on the upper-right bar. This information is also available in the `va_cves` dataset, which you can use to build queries in XQL Search.

If you have the Identity Threat Module enabled, you can also view the CVE analysis in the Host Risk View. To do so, from Inventory → Assets → Asset Scores, select the Hosts tab, right click on any endpoint, and select Open Host Risk View.

For each vulnerability, Cortex Cloud displays the following default and optional values.

| Value | Description |
| --- | --- |
| **Affected endpoints** | The number of endpoints that are currently affected by this CVE. For excluded CVEs, the affected endpoints are N/A. |
| **Applications** | The names of the applications affected by this CVE. |
| **CVE** | The name of the CVE. \*\*Tip:\*\* You can click each individual CVE to view in-depth details about it on a panel that appears on the right. |
| **Description** | The general NIST description of the CVE. |
| **Excluded** | Indicates whether this CVE is excluded from all endpoint and application views and filters, and from all Host Insights widgets. |
| **Platforms** | The name and version of the operating system affected by this CVE. |
| **Severity** | The severity level (Critical, High, Medium, or Low) of the CVE as ranked in the NIST database. |
| **Severity score** | The CVE severity score is based on the NIST Common Vulnerability Scoring System (CVSS). Click the score to see the full CVSS description. |

You can perform the following actions from Cortex Cloud as you analyze the existing vulnerabilities:

-   **View CVE details**: Left-click the CVE to view in-depth details about it on a panel that appears on the right. Use the in-panel links as needed.
    
-   **View a complete list of all endpoints in your network that are impacted by a CVE**: Right-click the CVE and then select View affected endpoints.
    
-   **Learn more about the applications in your network that are impacted by a CVE**: Right-click the CVE and then select View applications.
    
-   **Exclude irrelevant CVEs from your endpoints and applications analysis**: Right-click the CVE and then select Exclude. You can add a comment if needed, as well as Report CVE as incorrect for further analysis and investigation by Palo Alto Networks. The CVE is grayed out and labeled Excluded and no longer appears on the Endpoints and Applications views in Vulnerability Assessment, or in the Host Insights widgets. To restore the CVE, you can right-click the CVE and Undo exclusion at any time.
    
    **Note:**
    
    The CVE will be removed/reinstated to all views, filters, and widgets after the next vulnerability recalculation.
    

#### Endpoint Analysis

To help you assess the vulnerability status of an endpoint, Cortex Cloud provides a full list of all installed applications and existing CVEs per endpoint and also assigns each endpoint a vulnerability severity score that reflects the highest NIST vulnerability score detected on the endpoint. This information helps you to determine the best course of action for remediating each endpoint. From Inventory → Endpoints+Host Inventory → Vulnerability Assessment, select Endpoints on the upper-right bar. This information is also available in the va_endpoints dataset. In addition, the host_inventory_endpoints preset lists all endpoints, CVE data, and additional metadata regarding the endpoint information. You can use this dataset and preset to build queries in XQL Search.

For each vulnerability, Cortex XDR displays the following default and optional values.

| Value | Description |
| --- | --- |
| **CVEs** | A list of all CVEs that exist on applications that are installed on the endpoint. |
| **Endpoint ID** | Unique ID assigned by Cortex Cloud that identifies the endpoint. |
| **Endpoint name** | Hostname of the endpoint. \*\*Tip:\*\* You can click each individual endpoint to view in-depth details about it on a panel that appears on the right. |
| **Last Reported Timestamp** | The date and time of the last time the Cortex XDR agent started the process of reporting its application inventory to Cortex Cloud. |
| **MAC address** | The MAC address associated with the endpoint. |
| **IP address** | The IP address associated with the endpoint. |
| **Platform** | The name of the platform running on the endpoint. |
| **Severity** | The severity level (Critical, High, Medium, or Low) of the CVE as ranked in the NIST database. |
| **Severity score** | The CVE severity score based on the NIST Common Vulnerability Scoring System (CVSS). Click the score to see the full CVSS description. |

You can perform the following actions from Cortex Cloud as you investigate and remediate your endpoints:

-   **View endpoint details**: Left-click the endpoint to view in-depth details about it on a panel that appears on the right. Use the in-panel links as needed.
    
-   **View a complete list of all applications installed on an endpoint**: Right-click the endpoint and then select View installed applications. This list includes the application name, and version, of applications on the endpoint. If an installed application has known vulnerabilities, Cortex Cloud also displays the list of CVEs and the highest Severity.
    
-   (Windows only) **Isolate an endpoint from your network**: Right-click the endpoint and then select Isolate the endpoint before or during your remediation to allow the Cortex Cloud agent to communicate only with Cortex Cloud .
    
-   (Windows only) **View a complete list of all KBs installed on an endpoint**: Right-click the endpoint and then select View installed KBs. This list includes all the Microsoft Windows patches that were installed on the endpoint and a link to the Microsoft official Knowledge Base (KB) support article. This information is also available in the `host_inventory_kbs` preset, which you can use to build queries in XQL Search.
    
-   **Retrieve an updated list of applications installed on an endpoint**: Right-click the endpoint and then select Rescan endpoint.
    

#### Application Analysis

You can assess the vulnerability status of applications in your network using the Host inventory. Cortex Cloud compiles an application inventory of all the applications installed in your network by collecting from each Cortex XDR agent the list of installed applications. For each application on the list, you can see the existing CVEs and the vulnerability severity score that reflects the highest NIST vulnerability score detected for the application. Any new application installed on the endpoint will appear in Cortex Cloud within 24 hours. Alternatively, you can re-scan the endpoint to retrieve the most updated list.

**Note:**

Starting with macOS 10.15, Mac built-in system applications are not reported by the Cortex XDR agent and are not part of the Cortex Cloud Application Inventory.

From Inventory → Endpoints → Host Inventory, select Applications.

-   To view the details of all the endpoints in your network on which an application is installed, right-click the application and select View endpoints.
    
-   To view in-depth details about the application, left-click the application name.
