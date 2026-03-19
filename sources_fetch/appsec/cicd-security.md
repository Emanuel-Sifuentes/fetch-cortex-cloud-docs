# CI/CD Security

CI/CD security safeguards software components and process throughout the SDLC.

CI/CD security scans for code and configuration violations in the pipeline safeguard software components and processes throughout the automated CI/CD pipeline. These scans address the security of the initial code commit and the automated build processes by identifying code vulnerabilities and misconfigurations within your codebase and pipeline configurations. By catching these violations early, they contribute to maintaining the integrity, confidentiality, and availability of modern software systems and fostering trust within the pipeline's operations.

## CI/CD Security use cases

-   **CI/CD onboarding**: Integrate your CI/CD pipelines and related systems with the CI/CD module to gain centralized visibility and consolidate code risks, enabling security insights and pipeline hardening
    
-   **CI/CD assets**: Identify and manage all critical CI/CD assets, including collaborators, CI/CD instances, CI/CD pipelines and version control system (VCS) organizations, to gain a comprehensive view of your attack surface
    
-   **Supply Chain security**: Secure your SDLC by gaining visibility into and controlling third-party dependencies, open-source components, build artifacts, and CI/CD pipeline configurations and activities. Identify and mitigate risks introduced throughout the build and deployment processes, ensuring a secure software delivery
    
-   **CI/CD risks**: Understand and mitigate common CI/CD risks, including [OWASP Top 10 CI/CD security risks](https://owasp.org/www-project-top-10-ci-cd-security-risks/), by gaining visibility into pipeline security posture, visualizing breach pathways, and identifying exposed credentials
    
-   **CI/CD rules**: Define and enforce granular security rules within your CI/CD pipelines to block insecure code from reaching production and apply consistent security policies across repositories, registries, and runtime environments
    
-   **CI/CD policies**: Create and apply comprehensive security policies across your entire software supply chain, enforcing them throughout the SDLC to harden delivery pipelines and ensure only vetted code reaches production
    
-   **CI/CD Compliance**: Scan CI/CD rules against selected compliance standards such CIS GitHub to generate comprehensive and recurring compliance reports. This ensures continuous, verifiable adherence for auditing

## CI/CD Security user roles and permissions
Cortex Cloud offers dedicated user roles for CI/CD Security: AppSec Admin and DevSecOps, each with specific areas of responsibilities. When assigning roles to users, it's recommended to align them with the user's required responsibilities within the application security framework.

The AppSec Admin has full permissions for all Cortex Cloud Application Security\-related activities. They can create and modify detection rules within the Code/Build domain, track progress, and adjust enforcements as needed. Additionally, they can triage and investigate findings, issues, and cases spanning from code to cloud. The role also includes complete visibility into all cloud assets.

The DevSecOps role is specifically designed as an intermediary, possessing more permissions than a Developer but fewer than an AppSec Admin. This role actively manages security processes and tools to embed security directly into development and operations workflows. Responsibilities include managing and resolving security issues, performing scan management, and improving the overall application security posture by integrating security practices throughout the development and operations lifecycle.

Permissions assigned to predefined roles cannot be modified. However, you can save a predefined role as a new custom role. This custom role can then be edited to meet specific organizational needs, offering a balance between standardized roles and customizable access control.

Dedicated CI/CD Security roles include permissions that extend beyond CI/CD Security itself. In addition to these dedicated users, other roles within your tenant are also granted specific permissions to CI/CD Security. You can view all permissions granted to user roles in your tenant by navigating to Settings → Configurations → Roles → select a role.

## CI/CD Assets

Identify and manage all CI/CD assets—collaborators, VCS, instances, pipelines—for a complete view of your software supply chain attack surface.

CI/CD assets are the fundamental components that enable your automated software delivery pipeline. These include your collaborators, version control system (VCS) organizations (the top-level structures within VCS platforms that contain your repositories, code, and configurations), CI/CD instances (the tools that execute your pipeline) and CI/CD pipelines (the automated workflows that build, test, and deploy your software).

VCS Repositories are part of both ASPM and CI/CD asset modules. Refer to Repositories as assets for more information about repository assets.

Visibility into these assets allows you to understand your CI/CD environment. In addition, the assets display associated risks identified through CI/CD security scans, allowing you to remediate CI/CD issues directly from the dedicated asset inventories.

### CI/CD Instances as assets
The CI/CD Instances inventory provides a centralized view of all CI/CD pipeline tool instances (such as GitHub Actions and Jenkins) across your environment, enabling efficient tracking and management of your CI/CD instances. You can access and analyze instance details and properties, as well as review CI instance configurations and identify configuration issues.

#### Explore CI/CD Instance assets
To access CI/CD pipeline instances, under Inventory, select All Assets → Code → Category → CI/CD Instances.

The CI/CD Instances assets page includes a dashboard and an inventory. The dashboard includes a Provider widget, displaying the types of CI/CD providers configured (for example, GitHub Actions) and the number of instances for each provider. You can filter the inventory by selecting a provider type.

##### CI/CD instance inventory

The following table describes selected CI/CD instance properties displayed in the inventory table.

Read more...

| Property | Description |
| --- | --- |
| Name | The name of the CI/CD pipeline instance, often including a descriptor that indicates its environment or purpose, such as "Jenkins-prod" for a Jenkins instance in a production environment |
| Provider | The provider or system of the CI/CD pipeline instance, such as Jenkins |
| URL | The web address where the CI/CD pipeline instance can be accessed |
| Last Observed | The date when the last scan was conducted on the CI/CD pipelines in the instance. Use the column filter to choose a specific date range (custom, 7 days, 30 days) instead of the default 24 hours |
| Pipeline Count | The amount of CI/CD pipelines associated with the instance. Clicking on the value opens the Pipelines tab of the description card for additional information about the associated pipelines |

#### In-depth CI/CD pipeline instance asset information
Click an asset in the inventory table to open its side card, providing in-depth information organized into several tabs. The Overview tab (default display) offers highlights and a general summary. Additional contextual tabs provide specific details, including a Code to Cloud tab (providing context on the asset's path to production), an Applications tab (displaying the applications associated with this asset), and tabs focusing on specific issue types detected within the asset, such as Secrets and Vulnerabilities.

##### CI/CD pipeline instance summary

The CI/CD pipeline instance summary, displayed at the top of the card, provides concise details about the CI/CD instance, such as its name, the provider (for example GitHub Actions), and specific pipeline configurations.

Overview

The Overview tab summarizes the CI/CD pipeline instance highlights and properties.

**Highlights**:

-   Critical/High issues: An aggregation of critical and high issues associated with the CI/CD pipeline instance
    
-   Deployed: Indicates whether the CI/CD pipeline instance has been deployed and is currently active within your cloud environment or infrastructure
    
-   **Risk summary**: The amount of issues and findings associated with the pipeline instance and their severity level. Selecting an issue or finding redirects to the issues or findings page, filtered by the selected issue or finding
    
-   **Visibility timeline**: When the CI/CD pipeline instance was first and last detected
    

**Properties**:

-   Asset details, including Asset Id, Asset Category (fixed value: CI/CD Instance), Provider (CI tool such as Jenkins and GitHub Actions) and Asset Groups associated with the CI/CD pipeline instance
    
-   Instance URL: Link to the specific CI/CD instance
    

The Highlights section and other asset properties only display attributes when their corresponding indicators are present. For example, if an asset is not deployed, its deployment-related attributes will not show up; similarly, if there are no detected issues, those highlights or properties will not appear.

Configurations

The Configurations tab provides a table of CI/CD instance configuration issues. The following table provides selected CI/CD configuration instance issue properties.

| Property | Description |
| --- | --- |
| Severity (icon) | The severity level of the issue |
| Issue Name | The issue identifier |
| Asset Name | The asset in which the issue was detected |
| Assigned To | The person or entity assigned to remediate the issue |
| Creation Date | When the issue was initially detected |
| Issue Status | The status of the issue |

Pipelines

The Pipelines tab displays a list of CI/CD pipelines associated with the CI/CD instance.

| Property | Description |
| --- | --- |
| Pipeline Name | The name of the CI/CD pipeline. |
| Pipeline File Path | The location of the configuration file that defines the CI/CD pipeline within the associated repository |
| Related Repositories | A list of repositories that are associated with the CI/CD pipeline |
| Last Observed | The timestamp indicating the most recent time this specific CI/CD pipeline was detected |
| Application IDs | Unique identifiers assigned to the application(s) that this CI/CD pipeline builds, tests, or deploys |

#### Manage CI/CD pipeline instances
You can perform the following actions CI/CD instances.

##### Asset actions

-   Right-click on an asset in an inventory table to access the Actions menu, where you can perform the following actions:
    
    -   Open in new tab: Opens the description tab of the asset for detailed analysis of the issue
        
    -   View asset data: Opens a new pop-up window displaying the data retrieved for the asset during the most recent scan in either JSON (default) or tree view. This raw data provides a comprehensive and unformatted view of the asset's properties and attributes as they were initially ingested
        
    -   Copy text to clipboard: Copies the selected text to the clipboard
        
    -   Copy entire row: Copies the entire selected row data
        
    -   Show/hide rows: Stand on data in a row and filter the entire inventory to show or hide assets based on the selected attribute
        
    -   Open in Cortex Assistant/Open in Cortex Agentic Assistant: Opens the repository in Cortex Assistant or Cortex Agentic Assistant.
        
    
-   **Export asset data**: Click the download icon (showing Export to file when hovering over the icon) in the top right of any asset page to export the asset data

### CI/CD Pipelines as assets
The CI/CD Pipelines assets provide a centralized view of all CI/CD pipeline assets across your environments, enabling efficient tracking and management. You can access and analyze CI/CD pipeline details, properties and insights including deployment status, whether deployed, active or new and a summary of findings and issues associated with pipelines. This allows you to assess the security and operational status of your pipelines.

#### Explore CI/CD Pipeline assets
To access CI/CD pipelines assets, under Inventory, select All Assets → Code → CI/CD Pipelines.

The CI/CD pipelines assets page includes a dashboard and an inventory.

##### CI/CD Pipeline assets dashboard

The dashboard includes a widget detailing the CI pipeline providers. You can filter by provider.

##### CI/CD Pipeline assets inventory

The following table describes selected CI/CD Pipeline asset properties displayed in the inventory table.

| Property | Description |
| --- | --- |
| Name | The unique identifier assigned to the pipeline |
| Provider | The tool or service that supplied the pipeline, such as GitHub Actions or Jenkins |
| Repository | The code repository which stores the source code, pipeline configurations, and related assets used for the CI/CD process |
| CI File Path | The specific location or directory path where the CI configuration file is stored |
| CI Instance | The individual occurrence of the CI associated with the pipeline |

#### In-depth CI/CD pipeline asset information
Click an asset in the inventory table to open its side card, providing in-depth information organized into several tabs. The Overview tab (default display) offers highlights and a general summary. Additional contextual tabs provide specific details, including a Code to Cloud tab (providing context on the asset's path to production), an Applications tab (displaying the applications associated with this asset), and tabs focusing on specific issue types detected within the asset, such as Secrets and Vulnerabilities.

##### CI/CD Pipeline asset summary

The CI/CD Pipeline asset summary, displayed at the top of the card, provides concise details about the CI/CD pipeline assets, such as its name, the platform used (for example GitHub Actions) and specific pipeline configurations.

Overview

The Overview tab summarizes CI/CD pipeline asset highlights and properties.

**Highlights**:

-   Critical/High issues: An aggregation of critical and high issues associated with the CI/CD pipeline asset
    
-   Deployed: Indicates whether the CI/CD pipeline asset has been deployed and is currently active within your cloud environment or infrastructure
    
-   New: Indicates whether the CI/CD pipeline asset was created during the past 30 days
    
-   Active: Indicates whether the CI/CD pipeline asset is active and processing tasks
    
-   **Risk summary**: Displays the total amount of risks associated with the pipeline asset grouped by category (cases, issues and findings ) and their severity level. Selecting a risk category will redirect you to more information
    
-   **Visibility timeline**: When the CI/CD pipeline assets were first and last detected
    

**Properties**:

-   Asset details, including Asset Id, Asset Types and Asset Groups associated with the CI/CD pipelines asset
    
-   Applications: Lists the applications that include this pipeline assets as part of their defined assets or configuration
    
-   **CI/CD configuration**:
    
    -   Provider: The platform or service that hosts and manages the CI/CD pipeline, such as Jenkins and GitHub Actions
        
    -   CI File Repository: The location or repository where the configuration files for the CI/CD pipeline are stored
        
    -   CI Instance: The specific instance or environment where the CI/CD pipeline is executed
        
    
-   Last Job Execution: The most recent execution of a job within the CI/CD pipeline
    
-   Contributors: The individuals or entities who have made contributions to the CI/CD pipeline. This information allows collaboration within the CI/CD pipeline's development process
    

**Note:**

The Highlights section and other asset properties only display attributes when their corresponding indicators are present. For example, if an asset is not deployed, its deployment-related attributes will not show up; similarly, if there are no detected issues, those highlights or properties will not appear.

Code to Cloud

The Code to Cloud tab describes the integrated flow of a selected CI/CD pipeline, showing its journey from code commit to deployment. The graph visualizes the path to production, showcasing the pipeline's central role in orchestrating the flow from the repository, through its build and test stages, to the image it creates, and finally to the traced runtime resource it deploys.

For more information on Cortex Cloud Code to Cloud, refer to Code to Cloud.

Applications

The Applications tab provides an overview of the applications associated with this CI/CD pipeline, including the application risk score, business criticality, business owners and path to production. The path to production provides a graphical representation the application software development lifecycle, including the CI/CD pipeline role within the workflow.

For more information about applications, refer to Applications.Applications

##### Instances

The Instances tab displays a list of CI instances associated with the pipeline. The following table displays CI instance properties.

| Property | Description |
| --- | --- |
| Instance Name | The name of the specific CI/CD instance |
| Instance ID | The identifier for the specific CI/CD instance |
| Instance Provider | The name of the CI/CD tool or platform that manages the instance (such as Jenkins, GitHub Actions |
| Instance URL | An address that allows you to access the user interface or details page of the specific CI/CD instance within its native platform |
| Last Observed | The timestamp indicating the most recent time this specific CI/CD instance was detected |

#### Manage CI/CD pipeline assets
You can perform the following actions on CI/CD pipeline assets.

##### Asset actions

-   Right-click on an asset in an inventory table to access the Actions menu, where you can perform the following actions:
    
    -   Open in new tab: Opens the description tab of the asset for detailed analysis of the issue
        
    -   View asset data: Opens a new pop-up window displaying the data retrieved for the asset during the most recent scan in either JSON (default) or tree view. This raw data provides a comprehensive and unformatted view of the asset's properties and attributes as they were initially ingested
        
    -   Copy text to clipboard: Copies the selected text to the clipboard
        
    -   Copy entire row: Copies the entire selected row data
        
    -   Show/hide rows: Stand on data in a row and filter the entire inventory to show or hide assets based on the selected attribute
        
    -   Open in Cortex Assistant/Open in Cortex Agentic Assistant: Opens the repository in Cortex Assistant or Cortex Agentic Assistant.
        
    
-   **Export asset data**: Click the download icon (showing Export to file when hovering over the icon) in the top right of any asset page to export the asset data

### Version Control System (VCS) Organizations as assets
The VCS Organizations asset inventory provides a centralized view of all VCS Organizations that are integrated with Cortex Cloud, including their repositories and properties. The platform enables efficient discovery and management of these VCS organization assets, providing insights and analysis to contextualize their importance within your ecosystem and assess their risk posture. You can directly access related issues and findings within the VCS Organizations asset inventory, allowing you to prioritize and remediate them without navigating to a separate remediation section.

#### Explore VCS Organization assets
To access VCS Organization assets, under Inventory, select All Assets → Code → VCS Organizations.

The VCS Organization assets page includes a dashboard and an inventory.

##### VCS Organization asset dashboard

The Providers widget is displayed by default on the dashboard, showing the distribution of VCS organizations across integrated version control systems. Selecting a VCS within the widget sorts the inventory table accordingly.

##### VCS Organization asset inventory

The asset inventory table includes exposed properties as well as selected key properties that are available but not displayed by default.

| Property/attribute | Description |
| --- | --- |
| VCS Organization Name | The VCS organization name |
| VCS Organization Provider | The version control system (such as GitHub) that the organization is associated with |
| VCS Organization URL | The web address (URL) of the VCS organization's main page on the respective version control system provider (such as the main GitHub organization page) |
| First Observed | The date of the scan that initially detected the VCS organization |
| Observation Time | The date that the VCS organization data was last updated |
| VCS Organization Connected Apps | A list of applications created within Cortex Cloud that have a connection or association with this specific VCS organization entity |
| Application IDs | A list of the unique identifiers (IDs) assigned to the applications that are connected to or associated with this specific VCS organization entity |

#### In-depth VCS Organization asset information
Click an asset in the inventory table to open its side card, providing in-depth information organized into several tabs. The Overview tab (default display) offers highlights and a general summary. Additional contextual tabs provide specific details, including Configurations (displaying an inventory of configurations for all associated VCS organization assets) and Identity (providing a view of users within the VCS Organization).

##### VCS Organization asset summary

The VCS Organization asset summary, displayed at the top of the card, provides concise details about the VCS Organization, such as its name and associated VCS.

Overview

The Overview tab summarizes VCS Organization highlights, properties, repositories and members.

**Highlights**:

-   Critical/High issues: An aggregation of critical and high issues associated with the VCS Organization
    
-   Deployed: Indicates whether the VCS Organization has been deployed and is currently active within your cloud environment or infrastructure
    
-   Public Repository: Indicates whether the VCS Organization is a public repository, indicating its visibility to the public
    
-   **Risk summary**: The amount of risks associated with the VCS Organization grouped by category (cases, issues and findings) and their severity level
    
-   **Visibility timeline**: When the collaborator was first and last detected
    

**Properties**:

-   Asset (VCS organization) details, including Asset Id, Asset Category and Asset Groups associated with the VCS Organization
    
-   Provider: the VCS associated with the VCS Organization
    
-   **Organization Owners**: Users with full administrative control over the version control organization, including members, repositories, and settings
    

**Repositories**: A table of repositories associated with the VCS Organization. Enables you to quickly identify specific repositories of interest and gain a comprehensive understanding of the organization's overall repository structure. The table repository properties such as name, scanned branch, visibility, last commit and associated technologies. Selecting a repository opens its asset card directly within VCS Organization assets, allowing quick access to repository details without having to redirect to the dedicated Repository assets page.

**Note:**

The Highlights section and other asset properties only display attributes when their corresponding indicators are present. For example, if an asset is not deployed, its deployment-related attributes will not show up; similarly, if there are no detected issues, those highlights or properties will not appear.

Configurations

The Configurations tab displays an inventory of configurations for all associated VCS organization assets, and an inventory of top configurations issues (VCS & CI/CD Risks) related to the organization.

The table includes the following properties:

-   Severity level (icon): Indicates the level of severity of the configuration issue
    
-   Asset Name: The name of the resource in which the misconfiguration was detected
    
-   Assigned To: The person or team responsible for addressing the vulnerability
    
-   Creation Date: The date when the vulnerability was detected
    

Identity

The Identity tab provides a view of users within the VCS Organization, outlining their access levels and the repositories they are collaborators on, along with the timestamp of the latest commit for each repository

#### Manage VCS organization assets
You can perform the following actions on VCS organization assets.

##### Asset actions

-   Right-click on an asset in an inventory table to access the Actions menu, where you can perform the following actions:
    
    -   Open in new tab: Opens the description tab of the asset for detailed analysis of the issue
        
    -   View asset data: Opens a new pop-up window displaying the data retrieved for the asset during the most recent scan in either JSON (default) or tree view. This raw data provides a comprehensive and unformatted view of the asset's properties and attributes as they were initially ingested
        
    -   Copy text to clipboard: Copies the selected text to the clipboard
        
    -   Copy entire row: Copies the entire selected row data
        
    -   Show/hide rows: Stand on data in a row and filter the entire inventory to show or hide assets based on the selected attribute
        
    -   Open in Cortex Assistant/Open in Cortex Agentic Assistant: Opens the repository in Cortex Assistant or Cortex Agentic Assistant.
        
    
-   **Export asset data**: Click the download icon (showing Export to file when hovering over the icon) in the top right of any asset page to export the asset data

### VCS Collaborators-as-assets
The VCS Collaborator (collaborators) asset inventory provides a centralized view of all collaborators (users) who interact with VCS repositories, CI/CD pipelines, and related assets. The platform enables efficient discovery and management of these assets, providing insights and analysis to contextualize their importance within your ecosystem and assess their risk posture. You can directly access related issues and findings within the Collaborator asset inventory, allowing you to prioritize and remediate them without navigating to a separate remediation section.

#### How to access Collaborator assets

-   To access Collaborator assets, under Identity, select Human Identities → select VCS Collaborator from the Type filter.

#### In-depth Collaborator asset information
Click an asset in the inventory table to open its side card, providing in-depth information organized into several tabs.

##### Collaborator asset summary

The Collaborator asset summary, displayed at the top of the card, provides concise details about the collaborator, such as their name and the version control system that the collaborator is associated with.

Overview

The Overview tab summarizes the collaborator highlights and properties.

**Highlights** include:

-   Critical/High issues: An aggregation of critical and high issues associated with the collaborator
    
-   New: Whether the collaborator was recently added to the VCS organization
    
-   Inactive: Indicates whether the collaborator has had no commits within the last time period
    

**Properties** include:

-   **Risk Summary**: The amount of risks associated with the collaborator grouped by category (cases, issues and findings) and their severity level
    
-   Asset details, including Asset Id, Asset Types and Asset Groups associated with the collaborator
    
-   **Visibility timeline**: When the collaborator was first and last detected
    
-   **Identity and Affiliation**:
    
    -   Username: the alias associated with the collaborator
        
    -   User Type: The classification of the collaborator's account (such as individual user, service account, bot), indicating the nature of their access and activity
        
    -   VCS Organization: The specific version control system organization to which the collaborator belongs or has access
        
    -   Emails: "The email addresses associated with the collaborator's account, used for communication and notifications
        
    
-   **Access and Activity**:
    
    -   Team Membership: The teams or groups within the VCS Organization to which the collaborator belongs, defining their access permissions and collaborative roles
        
    -   Last Commit: The timestamp of the collaborator's most recent commit to a repository within the associated VCS Organization, indicating their recent activity
        
    

The Highlights section and other asset properties only display attributes when their corresponding indicators are present. For example, if an asset is not deployed, its deployment-related attributes will not show up; similarly, if there are no detected issues, those highlights or properties will not appear.

Access

The Access tab provides a list of assets that a VCS Collaborator has access to within your environment. It details the specific assets they can interact with, the level of permission granted, and the timestamp of their most recent code commit to that asset.

#### Manage Collaborator assets
You can perform the following actions collaborator assets.

##### Asset actions

-   Right-click on an asset in an inventory table to access the Actions menu, where you can perform the following actions:
    
    -   Open in new tab: Opens the description tab of the asset for detailed analysis of the issue
        
    -   View asset data: Opens a new pop-up window displaying the data retrieved for the asset during the most recent scan in either JSON (default) or tree view. This raw data provides a comprehensive and unformatted view of the asset's properties and attributes as they were initially ingested
        
    -   Copy text to clipboard: Copies the selected text to the clipboard
        
    -   Copy entire row: Copies the entire selected row data
        
    -   Show/hide rows: Stand on data in a row and filter the entire inventory to show or hide assets based on the selected attribute
        
    -   Open in Cortex Assistant/Open in Cortex Agentic Assistant: Opens the repository in Cortex Assistant or Cortex Agentic Assistant.
        
    
-   **Export asset data**: Click the download icon (showing Export to file when hovering over the icon) in the top right of any asset page to export the asset data

## Supply Chain Inventories

Supply Chain: Gain full visibility by tracking detected tools in your environment and cross-referencing them against a catalog of Cortex-recognized, trusted technologies.

The Software Supply Chain provides comprehensive visibility into the tools, services, and third-party integrations that operate across your software development and delivery processes. It includes two complementary inventories:

-   Supply Chain Tools: Lists tools and their associated risk factors detected in your environment
    
-   Supply Chain Catalog: Cortex Cloud's centralized registry of recognized supply-chain tools and their associated risk factors
    

Together, these inventories allow you to assess tool usage, coverage, and security posture—identifying unused, vulnerable, or unapproved tools before they expand your attack surface.

### Execution environments

Cortex Cloud supports these Supply Chain Tool execution environments:

-   **Third party pipelines**: Third-party plugins integrated with Cortex Cloud, provide visibility into installations, locations, and CVE vulnerabilities within your pipeline environment. This allows for prioritized remediation, effectively reducing your attack surface by identifying and removing unused or vulnerable plugins.
    
    Supported pipeline environments include:
    
    -   GitHub Actions
        
    -   Jenkins plugins
        
    -   **CircleCI Orbs**
        
    -   **Azure Extensions**
        
    
    Additionally, these pipelines often incorporate third-party executables into their workflows. Cortex Cloud offers enhanced visibility into these third-party services, transforming unreadable data into actionable insights for improved security posture.
    
-   **VCS third parties**: **VCS Apps**. Third-party applications and webhooks in your version control system. This enables removal of unused assets, management of permissions, and adherence to the principle of least privilege
    
-   **Executables**: Standalone programs or scripts executed within your CI/CD pipelines. These may include custom scripts, third-party command-line tools, or other executable files. The inventory provides insights into their usage, deployment locations, and potential security risks
    
-   **Remote Scripts (URL)**. Executable scripts fetched from a remote URL during pipeline execution. The inventory provides insights into their origin, usage, and potential security risks, addressing the unique challenges of untrusted remote code
    
-   **Webhooks**: Automated, event-driven communications that trigger actions across your CI/CD pipeline and integrated services. Cortex Cloud provides an inventory of these webhooks, enabling you to assess their usage, coverage, and potential security risks
    

### Tool status

Tools are categorized by status: Approved, Pending Review, or Rejected (but still in use). When initially detected, tools are assigned a Pending Review status by default, requiring further action to change the status to Approved or Rejected. Rejected does not mean the tool is not in use. It allows application security practitioners and DevOpsSec personnel to search for and remove these tools as needed.

You can modify the tool status by right-clicking on a tool in both Supply Chain Tool and Supply Chain Catalog inventories:

-   In the inventory table, right-click on a tool → Change Status → select a status
    
-   From the Overview tab on the Supply Chain side-panel.
    
    -   Initial selection: Select a status from the available options
        
    -   When modifying a previous selection: Select Edit → select a status
        
    

For information about changing a tool status, refer to Overview

### Using the inventories

-   Use Supply Chain Tools to view and manage tools detected in your environment, review usage, and prioritize remediation
    
-   Use the Supply Chain Catalog to cross-reference detected tools against Cortex Cloud\-supported ones, identify coverage gaps, and evaluate risk before integrating new tools or replacing existing ones
    

**Note:**

Although attributes are identical across inventories, their values for the same tool can differ, most commonly in Risk Factors and Type. This is because the inventory reflects your live environment, which may include different versions or configurations than the catalog—for example, a package may not have been upgraded or may be deployed differently.

### Supply Chain Tools
The Supply Chain Tools inventory provides detailed information about individual tools, including deployments, areas of non-use, and functionality detected in your SDLC. This data allows you to assess tool usage, coverage, and potential security risks.

#### Use cases

-   **Tool visibility:** Gain visibility into all tools used across CI/CD pipelines and VCSs
    
-   **Third-Party tools:** Discover and monitor all external tools (webhooks, executables, apps, plugins) integrated into your CI/CD pipelines and VCSs
    
-   **Detailed Tool insights:** Access detailed information on each tool (creator, risk factors such as deprecation or low usage, usage evidence, first seen date, category) to evaluate approval status and assess risk
    
-   **Rejected Tool Monitoring:** Manage tool approval status by approving or rejecting tools found in pipelines/VCSs, identifying non-compliant usage
    
-   **Usage:** View tool usage indicators by category across pipelines/VCSs for management reporting internal as well as external usage

#### Supply Chain Tools
The Supply Chain Tools inventory table provides a detailed list of your organization's CI/CD pipeline tools and VCS Apps, allowing you to view and manage your organization's supply chain tools from a single, centralized location. You can review tool usage, third-party integrations, and risk assessments, including creator information, usage evidence, and category details. Additionally, you can filter tools by status (approved, rejected, uncategorized) and category, search for specific tools, and identify top risks to ensure policy adherence and prioritize remediation.

##### How to access Supply Chain Tools

To access Supply Chain Tools, select Modules → Application Security → Supply Chain Tools (under 3rd Party Tools).

##### Supply Chain Tools inventory

The inventory table describes the exposed Supply Chain tool properties. You can view additional properties through the Table Settings Menu.

| Property/ Attribute | Description |
| --- | --- |
| Name | The name of the Supply Chain tool |
| Risk Factors | Risk factors associated with the tool, as assessed by Cortex Cloud, help you identify and prioritize potential risks for tools and components based on their likely impact and exploitability. Values include Archived, Not verified, Unsecured URL and Outdated Version. For tools in your environment, risk factors are specific to the exact version you have, whereas catalog risk factors reflect the tool’s general profile. To understand the specific reasoning behind a risk factor, hover over it to view a detailed explanation |
| Status | The tool status. Values: Approved, Pending, Rejected |
| Usage | The amount of CI/CD pipelines in which the tool was used. Includes a link which opens the location in which the tool is used |
| Type | The type of tool |
| Category | The category associated with the tool, such as Version Control System (VCS), Continuous Integration (CI) Servers and Build Automation Tools |

#### Expanded Supply Chain tool information
When you click a tool's entry in the inventory table, a side card will open to display detailed information. The information is organized into three tabs: the Overview tab, which provides a summary of the tool's key details and is the default view; the Vulnerabilities tab, which lists any associated security vulnerabilities (CVEs); and the Actions tab, which outlines available mitigation options for the tool.

Overview

The Overview tab includes these details:

-   Name: The name of the tool
    
-   Description: A description of the tool usage and a link to its third-party origin, such as a public repository, documentation portal, or the vendor's official website
    
-   **PAN insights**: Cortex Cloud mitigation recommendations based on risk factors to address relevant supply-chain threats
    
-   **Timestamp**: When the tool was initially detected
    
-   Category: The tool type, such as code scanning and analytics
    
-   Usage: The amount of assets using this tool
    
-   Status: The current status of the tool. Values include Approved, Pending Review, Rejected. You can manually override the system-assigned status
    
-   Approve / Reject: Approve or reject the tool.
    
    **Note:**
    
    **AppSec Admin** user permissions are required to perform these actions.
    
-   **Execution environments**: A list of execution environments associated with the tool. Details include: name, the number of assets using the tool and the scan type
    

Usage

The Usage tab provides a list of the execution environments associated with the tool. Details include

-   The asset name in which the tool runs (such as a pipeline). Selecting the name opens the asset in a side-car without having to navigate to the dedicated Assets page
    
-   The type of asset, such as CI/CD pipeline, CI/CD instance, or Organization (for VCS Apps)
    
-   Evidence of the tool in the environment - the location of the file containing the tool
    
-   When the tool was initially detected.
    

##### Vulnerabilities

The **Vulnerabilities** tab is displayed whenever one or more tools has a risk factor that is a result of a Common Vulnerability and Exposure (CVE). This tab provides a consolidated list of all CVEs impacting the tools. The table includes these properties:

-   Name. The unique identifier for the CVE entry. For example, CVE-2023-25764. This name is a clickable link that directs you to a detailed report on the vulnerability from a public database
    
-   CVSS Score. The numerical score assigned to the vulnerability based on the Common Vulnerability Scoring System (CVSS). This score indicates the severity of the vulnerability, with a higher number representing a greater risk
    
-   Asset: The specific asset affected by the CVE
    

##### Comments

Select the Comments icon in the side-panel to add comments directly to catalog items, enabling collaboration and internal notes between security and development teams regarding component usage, justification, or deprecation status.

### Supply Chain Catalog
The Supply Chain Catalog is Cortex Cloud's centralized registry of Cortex Cloud supported supply-chain tools and their associated risk factors. The catalog is distinct from the inventory displayed on the Supply Chain Tools page, which lists tools detected in your environment. Some tools may be displayed in both inventories - for example if you use Semgrep, which is also included in the catalog.

#### Use case

Use the catalog to cross-reference against your inventory to identify coverage gaps, assess exposure, and benchmark your security posture before integrating new tools or to replace existing ones that may be at risk.

#### How to access the Supply Chain Catalog

To access the Supply Chain Catalog, select Modules → Application Security → Supply Chain Catalog (under 3rd party tools).

#### Supply Chain Catalog inventory

This inventory includes a list of all supply chain tools in the Catalog. The inventory table properties are identical to the Supply Chain Tools inventory table. For information about these properties, refer to Supply Chain Tools.

#### Expanded Supply Chain catalog information

When you click a tool's entry in the inventory table, a side card opens to display detailed information. The information is organized into three tabs:

-   Overview: Provides a summary of the tool's key details and is the default view
    
-   Vulnerabilities Lists any associated security vulnerabilities (CVEs)
    
-   Actions: Outlines available mitigation options for the tool
    

The details provided in these tabs are identical to the details displayed in the expanded Supply Chain Tool Catalog. For information about these properties, refer to Expanded Supply Chain tool information.

## CI/CD Risks

CI/CD risks identify vulnerabilities and misconfigurations in pipelines, then prioritize them into actionable issues for efficient remediation.

CI/CD pipeline risks are a set of predefined rules that identify pipeline vulnerabilities. Scans analyze both code and configurations of integrated VCS and CI/CD systems and pipelines, as well as their inter-connectivity, to detect these risks. The risks are classified based on security categories including attack vectors, misconfigurations, and bad practices found throughout your CI/CD pipelines.

CI/CD pipeline risk findings, detected during scans, are displayed in a dedicated table for analysis and investigation. Cortex Cloud Application Security then applies context and prioritizes these findings to create CI/CD pipeline risk issues. These issues represent the smallest unit of risk that can be remediated, and are displayed in their own dedicated inventory. You can remediate CI/CD pipeline risk issues manually by applying suggested fixes.

**Note:**

Cortex Cloud Application Security CI/CD pipeline scans create a comprehensive inventory of all CI/CD pipelines in your environment. For more information refer to CI/CD Pipelines as assets.

### CI/CD pipeline issues
All Medium, High and Critical CI/CD pipeline findings detected in an organization's environment are categorized by Cortex Cloud as CI/CD risk issues. This approach allows for targeted remediation efforts. Only manual fixes are available for CI/CD pipeline risk issues.

The CI/CD Risks Issues table is a filtered instance of the broader Issues table found under Cases & Issues, meaning it exclusively displays issues categorized as CI/CD risks. However, the CI/CD Risks Issues table only displays issues generated from findings detected during periodic scans. In contrast, the comprehensive Issues table includes all CI/CD risks issues, regardless of their detection source, such as periodic, pull request (PR), and continuous integration (CI) scans.

#### How to access CI/CD pipeline risk issues

To access CI/CD pipeline risks issues, under Modules, select Application Security → Issues → CI/CD Risks.

#### CI/CD pipeline risk issue inventory

Below are selected properties of the CI/CD pipeline risks issues inventories.

| Property | Description |
| --- | --- |
| Severity | The CI/CD pipeline risk severity level. Values: Critical, High, Medium, Low, Informational, unknown |
| Issue Name | The name assigned to the CI/CD pipeline risk issue. Corresponds to the CI/CD rule that detected the risk |
| Category | The type of issue. Values: Code, Configuration |
| Description | A description of the issue |
| Finding ID | The identifier of the finding on which the issue is based |
| Provider | The version control system (such as GitHub) or CI tool (such as GitHub Actions) hosting the CI/CD pipeline in which the issue was detected |
| Asset Name | The name of the asset in which the issue was detected |
| Asset ID | The identifier of the asset in which the issue was detected |
| Asset Category | The category of the asset (such as a repository, CI/CD Pipeline) in which the issue was detected |
| Status | The status of the issue. Values: New, Resolved, Under Investigation |
| Domain | Fixed value: Posture |
| Last Updated | The most recent scan that detected the finding which generated the issue |
| Backlog Status | Backlog Status: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability). To understand how issues are categorized as backlog/new, refer to Issue/Finding classification by scanner |

### Expanded CI/CD risks issue information
Clicking an issue in the table opens a detailed side card that serves as a centralized workspace for investigation and remediation. The card opens on the Overview tab, which presents general details, metadata, and a summary of the evidence, while the War Room tab provides an audit trail of all automatic and manual actions taken on the issue, offering context on how it has been investigated over time. The Actions tab lists available remediation options, and for IaC and vulnerability issues, the Code to Cloud tab displays related resources and lineage between code and runtime, allowing you to understand the impact of the issue across environments.

Overview

-   **Timestamp**: When the issue was created and last updated
    
-   Status: The issue status. Values: New, In Progress, Resolved. You can set the status as required
    
-   Assignee: The entity assigned to mitigate the issue. You can assign the issue from the menu in the field
    
-   Description: A description of the risk and the impact that the issue could potentially have on your SDLC
    
-   Asset details: Includes Asset (The impacted asset. Clicking on the asset opens the asset side card without needing to navigate away to the asset section) and Asset Type (The specific asset type in which the IaC resource was identified)
    
-   Evidence: Provides evidence and contextual details within your SDLC containing the IaC misconfiguration issue:
    
    -   **Issue source**
        
        -   Data Source: The system or integration from which the issue data was originally pulled (such as GitHub or a CI/CD pipeline). Click the icon next to the data source to navigate to the data source itself
            
        -   Category: The scanner category. Configuration is the immutable value
            
        -   AppSec Rule: The security rule that detected this issue. Includes a link to the rule
            
        -   AppSec Policy: The violated security standard that lead to the creation of the issue. Includes a link to the policy
            
        -   Collaborator: The individual or team responsible for contributing to the code or configuration where the issue was identified
            
        
    -   **Code context**
        
        -   Scanner Type: AppSec CI/CD Risk Scanner is the immutable scanner type
            
        -   Scanner Source: Cortex AppSec is the immutable scanner source
            
        -   Repository Name: The name of the version control repository where the issue was located
            
        -   Branch: The specific branch within the repository containing the issue
            
        -   Framework: The infrastructure as code (IaC) framework used (such as CloudFormation, Terraform)
            
        -   File Path: The exact location of the issue within the repository file structure
            
        -   First Hash: The commit hash of the first commit where this specific issue was introduced or detected
            
        -   Commit Hash: The commit hash of the most recent commit that modified the code where the issue was detected
            
        -   Commit Time: The timestamp of the most recent commit that modified the code where the issue was detected
            
        
    -   Remediation: Suggested steps to remediate the issue
        
    

**Note:**

Different issue types include different properties; therefore, not all properties are available for every issue.

Actions

Provides suggested solutions. No automated solutions are available for CI/CD risk issues.

#### War Room

The War Room provides an audit trail of all automatic or manual actions taken on an issue, serving as a dedicated space to review and interact with your issue. Each issue has a unique War Room. With machine learning insights, the Cortex Cloud platform suggests the most effective analysts and command sets to help you address issues efficiently.

### VCS and CI/CD pipeline risk findings
VCS and CI/CD pipeline scans produce findings, which are potential security risks in your VCS repositories and CI/CD pipeline configurations. These insights help assess and analyze the security posture of your VCS's and CI/CD pipelines.

The CI/CD risks Findings table is a filtered instance of the broader Findings table found under Cases & Issues, meaning it exclusively displays findings categorized as CI/CD pipeline risk findings. However, CI/CD pipeline risk Findings only displays findings detected during periodic scans. In contrast, the comprehensive Findings table includes all CI/CD pipeline risk findings regardless of their detection source, such as periodic, pull request (PR), and continuous integration (CI) scans.

The following table describes selected properties of the Findings table.

| Property | Description |
| --- | --- |
| Name | The name of the finding |
| Created | When the finding was initially detected |
| Last Updated | The last detection date of the finding |
| Provider | The VCS including the CI/cD pipeline |
| Sub Category | The CI/CD category that the findings belongs to. Values include: 3rd Party Services; Artifact Integrity Validation; Credential Hygiene; Data Protection; Dependency Chains; Identity & Access Management; Input Validation; Flow Control Mechanisms; Pipeline-Based Access Controls (PBAC); Poisoned Pipeline Execution (PPE); System Configuration |
| Detection Method | The engine used to detect VCS and CI/CD findings. Default value: CI/CD Security |
| Finding ID | The unique identifier assigned to the finding |

#### Expanded Findings details

Click on a finding in the inventory table to open the Findings side card, which provides additional details about the finding.

-   **Finding summary**: Found at the top of the card. Includes the finding name, ID and type (Configuration for CI/CD risk findings)
    
-   Description: A description of the finding including its location
    
-   **Timestamp**: When the finding was last updated
    
-   Asset details: Includes Asset (The impacted asset. Clicking on the asset opens the asset side card without needing to navigate away to the asset section) and Asset Type (The specific asset type in which the CI/CD risk was identified)
    
-   Evidence: Provides evidence and contextual details within your SDLC containing the CI/CD risk finding:
    
    -   **Finding source**
        
        -   Data Source: The system or integration from which the finding data was originally pulled (such as GitHub or a CI/CD pipeline). Click the icon next to the data source to navigate to the data source itself
            
        -   Run ID: The unique identifier of the specific scan execution during which this finding was detected
            
        -   Collaborator: The individual or team responsible for contributing to the code or configuration where the finding was identified
            
        
    -   **Code context**
        
        -   Repository: The name of the version control repository where the finding was located
            
        -   Branch: The specific branch within the repository containing the finding
            
        -   File Path: The exact location of the finding within the repository file structure
            
        -   First Hash: The commit hash of the first commit where this specific finding was introduced or detected
            
        
    -   **Scan metadata**
        
        -   Run ID: The unique identifier of the specific scan execution during which this finding was detected
            
        
    
-   Code: The file and code including the CI/CD risk in which the finding was detected

## CI/CD Rules

CI/CD rules detect security threats within your pipelines.

CI/CD rules are designed to detect security threats within your application security environment, which includes the various components, configurations, and interactions within your application that can potentially introduce vulnerabilities or pose risks to its security. CI/CD rules identify and flag issues based on predefined criteria, ensuring that potential threats are proactively detected and addressed to enhance the overall security posture of your application.

CI/CD rules cover a wide range of security best practices, inspired by compliance frameworks such as OWASP top 10 CI/CD Risks, as well as additional best practices beyond regulatory requirements.

**Note:**

-   Out-of-the-box rules cannot be modified
    
-   Custom CI/CD rules are not supported

### CI/CD rules roles and permissions
These user roles and permissions are required for CI/CD rules:

-   Dedicated AppSec Admins and DevSecOps user roles only have **View** permissions
    
-   Roles with Rules Read permission can view detection rules

### CI/CD rules inventory
The CI/CD rules inventory includes both out-of-the-box and custom rules.

To access the inventory:

1.  Under Modules, select Application Security → AppSec Rules (under Policy Management).
    
2.  In the Filter panel, select Scanner → CI/CD Security.
    

The following list lists the exposed AppSec Rules table properties. Additional settings are found under Menu settings.

| Field/Property | Description |
| --- | --- |
| Severity | The priority level assigned to findings identified by the rule |
| Rule Name | The rule name |
| Rule Description | A description of the rule |
| Framework/Language | The framework or language that the detection rule applies to (for example, GitHub, Terraform, JavaScript) |
| Labels | Labels assigned to the rule |
| Policies Count | The amount of policies that include the rule. Selecting the count redirects to the AppSec Policies page, sorted by the policies associated with the rule |
| Issues Count | The amount of issues detected by the rule. Selecting the count redirects to the CI/CD Risks page, sorted by the issues detected by the rule |
| Scanner | CI/CD Security. This value is immutable |
| Last modified | The date and time when the rule was most recently updated |
| Mapped Cloud Security Rule | The specific runtime cloud security policy that correlates with this AppSec rule. This mapping enables you to trace a security issue from its definition in code to its manifestation in the live cloud environment, ensuring end-to-end visibility |

## CI/CD Policies

Control CI/CD security: view system & custom policies. Create and manage policies to ensure pipeline integrity and compliance.

CI/CD policies define how a system should respond to threats in pipelines. It includes conditions that trigger the policy, the scope of its application, and the actions to be taken when these conditions are met. When a policy detects a threat, it generates an issue for remediation.

Cortex Cloud provides out-of-the-box CI/CD policies. In addition, you can create custom policies to tailor it to your specific business or infrastructure requirements. Out-of-the-box policies cannot be modified directly. However, you can create a custom policy by cloning the existing one. This allows you to make changes to the original policy according to your requirements. Refer to Manage CI/CD policies for more information.

**Tip:**

For Cortex Cloud Code policies, refer to Application Security Policies.

### CI/CD policies user roles and permissions
These user roles and permissions are required for CI/CD policies:

-   -   Roles with Policies View/Edit permissions can create and modify detection policies
        
    -   Roles with Policies Read permissions can view detection policies
        
    -   An AppSec Admins user role has View/Edit permissions
        
    -   A DevSecOps user role only has View permissions

### CI/CD policies inventory
The CI/CD policies inventory includes both out-of-the-box and custom policies.

To access the inventory:

1.  Under Modules, select Cortex Cloud Application Security → AppSec Policies (under Policy Management).
    
2.  In the filter panel, select Scan Type → CI/CD Risk.
    

The following list describes the policy fields/properties exposed in the inventory table. Select Table Settings Menu to view and add additional properties to the table.

| Properties/attribute | Description |
| --- | --- |
| Policy Name | The name of the CI/CD policy |
| Status | Whether the policy is enabled or disable |
| Description | A description of the CI/CD policy |
| Scan Type | CI/CD Risks is the immutable value |
| Conditions | The specific criteria that trigger the policy |
| Actions | Actions to take when the policy detects its target risk |
| Scope | The assets to be evaluated by the policy |
| Trigger | Trigger types that define when the condition will be evaluated. Options include Periodic scan, Pull Request scan and CI scan |
| Last Triggered | The last time that the policy was triggered |
| Created By | The user or entity that created the policy |
| Modified by | The user or entity that modified the policy |
| Modification Time | The timestamp of the most recent change to the policy |
| Open Issues | The amount of issues detected by the policy that remain unresolved |

#### Expanded policy details

Selecting a policy opens a side panel where you can review additional details:

-   **Metadata**:
    
    -   **Policy details**: Name and description of the policy
        
    -   **Policy ownership**: Information on the policy's creator and last modifier
        
        **Note:**
        
        To view all out-of-the-box (OOTB) policies, filter by `Policy Owner = System`.
        
    -   **Timestamps**: The last time the policy was modified and last triggered
        
    
-   **Scope**: The asset type the policy applies to, along with a table summarizing the policy conditions, trigger, and actions, displayed as follows:
    
    -   When: The trigger that initiates the policy action, such as Periodic, Pull Request, or CI scans
        
    -   If: Conditions that are applied to the policy. For example: `(Finding Type = CI/CD Risks) AND (Severity = Critical)`
        
    -   Then: Triggered actions for the policy, such as Create issue and Block PR

### Create custom CI/CD policies
Create custom CI/CD policies to enable tailored security checks across your pipelines.

1.  Under Modules, select Application Security → AppSec Policies (under Policy Management).
    
2.  Click Add Policy on the Policies page.
    
3.  Provide a policy name (required) and description on the General step of the wizard that is displayed, and click Next.
    
4.  Define the policy conditions on the Define Conditions step of the wizard.
    
    1.  Define the criteria for your policy to evaluate.
        
        -   Trigger (Required): For CI/CD policies, the only supported trigger type is Periodic scan.
            
            **Note:**
            
            PR Scan and CI Scan triggers are automatically disabled and unchecked. They can only be enabled if other scan types (that is non-CI/CD risk scans such as Secrets) are also selected, and will only run on non-CI/CD risks types of scans
            
        -   Conditions (Required). Configure conditions for CI/CD risks by selecting CI/CD Risks as the Finding Type: Select Add Filter → Finding Type → CI/CD Risks.
            
            **Note:**
            
            You can combine multiple conditions to create complex rules for when the policy should apply.
            
            Example 109. EXAMPLE
            
            Create conditions that apply to a CI/CD policy which detects high severity CI/CD risks on GitHub: Select Add Filter → Finding Type → CI/CD Risks → AND → Provider → [VCS/CI/CD system] → AND → Severity: → High.
            
              
            
            For more information about CI/CD Risks as the finding type, refer to Finding Type attribute for CI/CD Risks below.
            
        -   Developer Suppressions: A developer suppression is an inline comment added during code development to exclude specific findings from being evaluated by a policy. You can choose to either apply or skip these suppressions
            
            -   Apply: When you select this option, a new condition is automatically added to each existing condition group, ensuring the policy respects developer suppressions
                
            -   Skip: This option causes the policy to evaluate all findings, even those suppressed by a developer
                
            
        
    2.  Click Next.
        
5.  Define the policy scope on the Define Scope step of the wizard.
    
    1.  Define the scope of the assets to be evaluated by the policy using one of these methods. Options include Asset Groups and Matching Criteria.
        
        -   Asset Groups: Select the asset groups on which this policy and its chosen detection rules will be evaluated. You can only select asset groups that are assigned to you as part of your scope
            
            For more information about Cortex Cloud Application Security Asset Groups, refer to SBAC Scope-based access control for Cortex Cloud Application SecuritySBAC Scope-based access control for Cortex Cloud Application Security
            
        -   Matching Criteria: When selected, displays a list of assets. You can define the policy's scope by using Matching Criteria, which allows you to build filters using the query builder. Only those assets that satisfy these criteria will be included in the policy's scope
            
            **Note:**
            
            -   SBAC scope limitations do not apply to Matching Criteria
                
            -   For CI/CD policies, you can filter Matching Criteria by VCS Organization Name, CI/CD Pipeline [Name/ID], CI/CD Instance [Name/ID] or Collaborator [Name/Email/MFA Enabled/Last Observed]
                
            
        
    2.  Click Next.
        
6.  Periodic Scan trigger: This trigger is automatically enabled and locked (checked and disabled from being unchecked), as CI/CD Risks scans only run on Periodic scans
    
    Define **actions** to be taken when a policy is triggered on the Define Action step of the wizard.
    
    1.  Specify which actions to take when the policy detects its target risk:
        
        -   Create a new issue: Create an issue if policy conditions within the selected scope are met. This is the only available action for CI/CD Risks policies
            
        -   Block:
            
            -   Block a CI run if the policy conditions within the selected scope are met. Available when CI scan is selected as the evaluation method
                
            -   Block a build pull request (PR) if the policy conditions within the selected scope are met. Available when CI scan is selected as the evaluation method
                
            
        -   Report:
            
            -   Enable reporting via CLI if policy conditions within the selected scope are met. Available when CI scan is selected as the evaluation method
                
            -   Enable reporting of a pull request (PR) comment if policy conditions within the selected scope are met. Available when PR scan is selected as the evaluation method
                
            
        
    2.  Click Create.
        
        The policy is created. You are redirected to the Policies page, which displays the newly created policy.
        

#### Finding Type attribute for CI/CD Risks

When CI/CD Risks is selected as the finding type, the following apply:

-   Periodic Scan trigger: This trigger is automatically enabled and locked (checked and disabled from being unchecked), as CI/CD Risks scans only run on Periodic scans
    
-   PR Scan and CI Scan triggers: These triggers are automatically disabled and unchecked. They can only be enabled if other scan types (that is non-CI/CD risk scans such as Secrets) are also selected, and will only run on non-CI/CD risks types of scans
    
-   CI/CD risks attributes include Severity, AppSec Rule, AppSec Rule Label, Backlog Status, Subcategory, Provider (such as GitHub) and Finding Type (which enables you to enlarge the policy scope to include additional scanner types)
    
    For more information about Backlog Status, refer to Backlog baseline.

### Manage CI/CD policies
Manage your custom CI/CD policies to maintain an effective application security posture and adapt your security rules to evolving threats and requirements.

To manage policies, right-click on a policy in the table or select a policy and then select the menu in the side panel. The following actions are available:

-   Edit policy: Redirects to the policy wizard, allowing you to modify the policy
    
    **Note:**
    
    You cannot edit out-of-the-box (OOTB) policies.
    
-   Duplicate policy: Clone OOTB policies as templates for creating custom policies. When this option is selected, the policy wizard is displayed with the original policy configurations, allowing you to modify them as required
    
    **Note:**
    
    The duplicated policy will include the word "clone" in its name and must be renamed.
    
-   Disable policy: Deactivate the policy without deleting it. Future scans will not trigger the policy, but existing issues detected by the policy will persist. Bulk actions are supported, allowing you to disable multiple policies simultaneously
    
-   Delete policy: Permanently remove the policy from your environment. Issues detected by the policy will persist. Bulk deletions are supported
