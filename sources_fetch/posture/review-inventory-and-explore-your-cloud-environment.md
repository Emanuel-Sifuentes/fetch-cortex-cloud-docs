# Review inventory and explore your cloud environment

## Inventory management

### Asset management

A comprehensive overview and management interface for all assets in your environment, ensuring complete visibility, control, and protection.

A comprehensive overview and management interface for all assets in your environment, ensuring complete visibility, control, and protection.

#### All Assets

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

##### Container Images
Overview

Container Images are fundamental, immutable assets that package applications and their dependencies for consistent deployment across cloud environments. Each image is uniquely identified by a SHA256 digest, ensuring content verifiability throughout its lifecycle across build, deploy, and run stages. You can assign multiple names and tags to a single container image, allowing you to reference the same image in various contexts and versions within container registries.

###### Container Image Types

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

###### Container Images asset inventory

The Container Images asset inventory provides a centralized view of all scanned container images and their details across your environments. The platform enables efficient tracking and management of your container images, ensuring compliance with security and governance standards. 

You can directly access container image issues and findings within the inventory, which allows you to prioritize and remediate them without navigating to a separate remediation section.

To access container image assets:

1.  Go to Inventory.
    
2.  All Assets → Compute → Container Images.
    

###### Explore the container images inventory

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

###### Expanded Container Images asset information

On the Container Image page, select an asset in the inventory table to open a detailed Asset card, which provides additional, in-depth information about the asset. The information is organized into tabs, including an Overview tab (displayed by default) that provides highlights and a general summary, while contextual tabs focus on particular properties of the asset. The card also includes details about detected risks, allowing you to explore them directly from the asset inventory. You can also perform actions on the asset using the Actions menu.

###### Container Image summary

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

##### Kubernetes Cluster

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

##### External Surface assets

The External Surface inventory provides a searchable, filterable view of all your internet-facing assets.

The External Surface inventory provides a searchable, filterable view of the internet-facing assets that Cortex Cloud has discovered and attributed to your organization, including certificates, domains, and services.

**Note:**

Cloud ASM data must be enabled before the External Surface asset inventory will populate. See Enable Cloud ASM.

The following sections provide information about each External Surface asset type.

###### Certificates

Certificates (also known as digital or public key certificates) are used when establishing encrypted communication channels to identify and authenticate a trusted party. Certificates are typically used for SSL/TLS, HTTPS, FTPS, SSH, and VPN connections. The most common use of certificates is for HTTPS-based websites, which enable a web browser to validate that an HTTPS web server is an authentic website. 

Cortex XSIAM tracks information for each certificate, such as Issuer, Public key, Public Key Algorithm, Subject, Subject Alternative Names, Subject Organization, Subject Country, and Subject State. Cortex XSIAM also tracks the following “cryptographic health” checks for each certificate:

-   Is it self-signed?
    
-   Is wildcard?
    
-   Is domain control validated?
    
-   Expired when scanned?
    
-   Public key bits
    
-   Signature algorithm
    

These health checks are referred to in the asset details as Certificate Classifications.

###### Domains

The External Surface inventory includes all domains that Cortex XSIAM has attributed to your organization and whether each domain has a recent resolution. Root domains and subdomains are displayed as separate entries in the inventory. However, if an organization owns a wildcard DNS entry, we group all subdomains of that wildcard that resolve to the same IP address under that one wildcard domain asset entry. We also collapse subdomains under the parent domain if we observe more than 1,000 subdomains.

Cortex XSIAM collects domains and DNS data from a combination of active and passive global collection techniques. For DNS scanning, Cortex XSIAM sends a BIND version query as the payload. This approach still identifies DNS servers that are not BIND compliant as their response informs us of a DNS server’s existence.

###### Services

The External Surface inventory includes all internet-facing services attributed to your organization. A service can be any internet-facing device or software that communicates on a _domain:port_ or _IP:port_ pair that responds to scanners on an application-level protocol over the public internet.

Services include classifications which are fingerprint-based identifiers of software, technologies, and behaviors observed on the service. Classifications can be either active or inactive based on the most recent observations of a service. In addition to classifications, services will also include banner, response, and header information from Cortex Cloud data collection.

###### Services field descriptions

The Services table includes the fields.

| Field | Description |
| --- | --- |
| Active classifications | Facts that have been inferred about each of your services by examining a response for fingerprints. Classifications cover a variety of details including: Identifying specific software and versions.; Configuration details of note.; Identifying when the services do not implement best practices like web security headers or certificate security standards. Some Classifications merely note that a fact is true or false, like Missing Cache Control Header. Other Classifications provide additional information, such as a version number for “nginx Server”. These details are viewable in the services table and on the details page for the service by clicking the name of the service in the All External Services table. |
| Business units | A Business Unit is a designation to classify assets. Cortex Cloud tracks business units as a means to identify owning organizations of these assets. Business units become extremely important when an organization has subsidiaries and groups established through M&A activities. |
| Discovery type | Services are identified with one of the following two discovery types, depending on the level of confidence Cortex Cloud has in attributing it to your organization. Directly Discovered: services that are definitively associated with an asset that belongs to your organization. Examples include:- It is hosted on one of your on-prem IP ranges.; The service advertises one of your organization's certificates.; It is on a managed cloud resource that is known to be yours. ; Colocated with your Services: the service is running on the same IP as a different directly-discovered service. In a multi-tenant hosting environment, these co-located services may belong to other organizations but can sometimes pose adjacency risks to your services hosted on that IP. If your organization has “single-tenant environment only” policies with 3rd party hosting providers, you can use this functionality to identify possible violations of that policy. |
| Domain | The most recent domain on which the service is running. |
| Externally detected providers | The provider of the asset is determined by an external assessment. |
| Externally inferred CVEs | Externally Inferred CVEs are identified by comparing the product name and version of active service, if identifiable, with CVES for those products in the National Vulnerability Database. Additional investigation may be required to confirm if the CVE is present. Click on the service to view the service details, which include the complete list of all the externally inferred CVEs. |
| Externally inferred vulnerability score | This score is based on the highest CVSSv3 score for Externally Inferred CVEs on this service. If there is no CVSSv3 score for the CVE, then the CVSSv2 score is used. This field applies only to services with Externally Inferred CVEs. |
| First observed | When the asset was first observed via any of the sources. |
| Inactive Classifications | Previously observed classifications that are no longer observed. |
| IP addresses | Array column specifying a list of IPs associated with this asset. |
| Is active | Yes— indicates the service is active, which means that the service has been observed recently.; No— indicates the service is inactive, which means Cortex Cloud no longer sees it on the internet. |
| Last observed | When the asset was last observed via any of the sources. |
| Port | The most recent port for the service. |
| Protocol | The application-level protocol on the public internet over which Cortex XSIAM validated the service. |
| Service name | The service type along with the specific domain:port or IP:port pair for the service. |
| Service type | The type of server or software for the service. |

#### Serverless function assets

##### Overview
You can manage Cortex Cloud Application Security scans through dedicated periodic branch and pull request (PR) scans inventories, which provide a central view of scan health, status, scope, and detected issues. This enables efficient tracking, analysis, and management of scans for vulnerability insights

In addition, you can configure native scanners, optimize settings, and monitor scan health to streamline your scan management process and enhance your security posture.

###### How to access Cortex Cloud Application Security scan management

To access scan management:

1.  Under Modules, select Application Security.
    
2.  Under Scans, select a scan type:
    
    -   Branch Periodic Scanning: Scans code branches on a schedule to identify vulnerabilities early in development. For more information about branch periodic scans, refer to Branch periodic scans
        
    -   Pull Request Scans: Scans code changes within pull requests to prevent the introduction of new vulnerabilities. For more information about pull request scans, refer to Pull Request scans
        
    

###### Scan data presentation

Periodic and pull request scan details are presented on the Cortex Cloud console across three levels of granularity: an inventory table providing a list of scans, a side panel providing general scan details including a high-level breakdown of the findings and issues detected during the scan, and an expanded description card, providing detailed information about the issues generated from these scans.

**Note:**

While scans provide a comprehensive inventory of all issues detected during a scan, dedicated inventories are also maintained for specific scan types for more granular management. For more information, refer to Infrastructure as Code (IaC) misconfiguration scanner, Secrets scanners and Software Composition Analysis (SCA ) scanners.

##### Explore the serverless functions inventory
The Serverless Functions assets inventory includes a dashboard with provider, class, and category widgets displayed by default, and an inventory table. Selecting a widget will automatically filter the inventory table based on the widget's criteria.

###### Serverless functions asset inventory

The inventory table includes general asset properties, as well as these unique attributes:

| Property/attribute | Description |
| --- | --- |
| Category | Serverless Functions |
| Type | Lamda Function - for AWS; Google Cloud Function - for GCP; Azure App Service Web App Function - for Azure |
| Class | Serverless functions belong to the Compute asset class |

##### Expanded serverless function asset information
Click an asset in the inventory table to open its side card, providing in-depth information organized into several tabs. The Overview tab (default display) offers highlights and a general summary. Additional contextual tabs provide specific details, including a Code to Cloud tab (providing context on the asset's path to production), an Applications tab (displaying the applications associated with this asset), and tabs focusing on specific issue types detected within the asset, such as Secrets and Vulnerabilities.

###### Serverless function summary

The serverless function summary, displayed at the top of the card, provides concise details about the serverless function including cloud provider, category, region and account ID.

Overview

The Overview tab summarizes serverless function highlights, properties, scan management details and provides a list of entities with access to the serverless function.

Highlights include:

-   Critical/High issues: An aggregation of critical and high issues associated with the serverless function. Clicking on this property redirects to the Issues page, filtered by specific asset and severity level
    
-   **Visibility timeline**: When the serverless function was first and last detected
    
-   **Risk summary**: The risks associated with the serverless function, grouped by category (cases, issues and findings). Each category includes the total number of associated risks, as well as a specific count for each severity level
    

Properties include:

-   **Identification and Location**: Includes identifying information and cloud location of the serverless function: Name, ID (such as **ArN** in AWS), cloud provider, cloud region and account ID
    
-   **Configuration and Environment**: Includes the fundamental setup and execution context of the serverless function. It includes the function category, type (the specific serverless compute service being used such as AWS Lambda, Azure Functions, Google Cloud Functions) and runtime (such as Python and Node.js)
    

**Scan management**: Includes information about the last scan, including date, scanner name, version and scan status.

Identities with access to this asset: Lists the top most privileged identities on the asset, ranked by their recent activity and highlighting those who have recently used their high-level permissions.

SBOM

The SBOM tab displays details about the Software Bill of Materials (SBOM) that was generated by the scanning process. Exposed properties include Type, Name, Binary Packages, Version, Path and License.

**Export SBOM**: You can export the entire SBOM, or selected attributes from any of the tabs in the expanded card: Select menu → file format. Supported formats: `XML`, `json`.

Access

The Access tab includes two inventories:

-   **Access permissions** (Who can access this asset): Exposed properties include Source, Grantor, Access Levels, Access to Data Labels, Last Used, Permission Scope and Excessive Policies
    
-   **Identity access scope** (Where can this identity access): Exposed properties include Grantor, Destination, Access Level, Last Used, Access to Data Labels, Configured By and Destination ID
    

Vulnerabilities

The Vulnerabilities tab provides inventories for Findings and Packages, enabling you to assess potential risks and prioritize remediation efforts.

-   Findings: Displays a list of findings, along with their associated CVE ID and description, EPSS score, CVSS score and severity, CVE risk factors, affected software and fix versions, when available
    
-   Packages: Displays a list of packages, their name and version, the total number of vulnerabilities found within each package, a breakdown of vulnerabilities by severity level and count, their EPSS (Exploit Prediction Scoring System), which estimates the likelihood of exploitation, CVSS (Common Vulnerability Scoring System), which rates the technical severity of the vulnerability, location, base image vulnerability, and whether a fix is available
    

**Note:**

For details of all serverless function issues generated by Cortex Cloud from vulnerability findings, refer to Serverless function usage.

#### Network configuration

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

##### Configure your network parameters

Define the IP address ranges and domain names used by Cortex Cloud to identify your network assets.

Internal IP address ranges and domain names must be defined in order to track and identify assets in the network. This enables Cortex Cloud to analyze, locate, and display your network assets.

###### Define internal IP address ranges

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
            
        
    

###### Define domain names

1.  In Cortex Cloud , select Assets → Network Configuration → Internal Domain Suffixes.
    
2.  In the Internal Domain Suffixes section, +Add the domain suffix you want to include as part of your internal network. For example, **`acme.com`**.
    
3.  Select  to add to the Domains List.
    

###### IP address ranges fields

| FIELD | DESCRIPTION |
| --- | --- |
| Range Name | Name of the IP address range defined. |
| First IP Address | First IP address value of the defined range. |
| Last IP Address | Last IP address value of the defined range. |
| Active Assets | Number of assets within the defined range that have reported Cortex Agent logs or appeared in your Network Firewall Logs. |
| Active Managed Assets | Number of assets within the defined range reported Cortex Cloud Agent logs. |
| Modified By | Username of the user who last changed the range. |
| Modification Time | The timestamp shows when this range was last changed. |

#### Asset Groups

Learn about the Asset Groups feature, under the Asset Inventory.

By grouping assets based on shared attributes, you can address them collectively. This enables more efficient bulk actions and simplifies both filtering and scoping within the inventory and across the platform.

To create an Asset Group:

1.  Navigate to Inventory → Assets → Groups → Add Group.
    
2.  Define a meaningful Group Name that represents the group's purpose to improve usability. You can choose between two types of Asset Groups:
    
    -   Dynamic Groups: Use the filters Provider or Realm, to group current and future assets that meet the defined criteria. Click Create Dynamic Group to save.
        
    -   Static Groups: Manually select individual assets to include in a group. After selection, click Create Static Group.
        
    
3.  Add an optional Description to further clarify.
    

##### Use cases

Once your Asset Group has been defined, you can use it in specific areas of the platform for the following:

-   Enrich asset data: Add information to a set of assets that isn't directly stored on the asset itself.
    
-   Reuse asset groups: Reference the same group across different areas of Cortex Cloud, for example, in Policies and Rules.
    

**Note:**

When you create or edit an Asset Group, the changes are applied immediately to new assets and to existing assets that have been updated. However, it may take a few hours for the changes to appear on existing assets that have not been updated.

#### Vulnerability Assessment

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

##### CVE Analysis

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
    

##### Endpoint Analysis

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
    

##### Application Analysis

You can assess the vulnerability status of applications in your network using the Host inventory. Cortex Cloud compiles an application inventory of all the applications installed in your network by collecting from each Cortex XDR agent the list of installed applications. For each application on the list, you can see the existing CVEs and the vulnerability severity score that reflects the highest NIST vulnerability score detected for the application. Any new application installed on the endpoint will appear in Cortex Cloud within 24 hours. Alternatively, you can re-scan the endpoint to retrieve the most updated list.

**Note:**

Starting with macOS 10.15, Mac built-in system applications are not reported by the Cortex XDR agent and are not part of the Cortex Cloud Application Inventory.

From Inventory → Endpoints → Host Inventory, select Applications.

-   To view the details of all the endpoints in your network on which an application is installed, right-click the application and select View endpoints.
    
-   To view in-depth details about the application, left-click the application name.
