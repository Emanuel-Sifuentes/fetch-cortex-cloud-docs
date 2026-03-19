# Application Security Posture Management (ASPM)

ASPM centralizes AppSec monitoring across the SDLC. It aggregates findings from tools such as IaC and SCA to provide a holistic view and prioritize risks.

ASPM is a comprehensive and integrated approach designed to centralize and automate the continuous monitoring, evaluation, and enhancement of an organization's application security throughout its entire software lifecycle - from initial code development through deployment and ongoing operations in cloud or on-premises environments.

ASPM functions as a unified governance layer. It aggregates, correlates, and assesses security signals and findings from various application security testing tools (such as SAST, DAST, and SCA) and other critical data sources, providing a holistic, real-time, and actionable view of an application's overall security landscape. This unified approach directly addresses challenges like fragmented visibility, siloed security teams, inefficient resource allocation, and delayed remediation.

ASPM secures your applications by treating each as a dynamic, logical entity, encompassing its complex array of components. This includes custom code, open-source libraries, APIs, microservices, Infrastructure as Code (IaC) configurations, runtime environments (like containers), and data flows. By identifying and prioritizing these applications as single entities, ASPM enables focused monitoring and safeguarding of high-priority assets across the entire Software Development Lifecycle (SDLC), including VCS repositories, CI/CD pipelines, and container registries. This ensures you can effectively identify, prioritize, and remediate critical issues that could impact key business systems, thereby continuously reducing the risk of vulnerabilities and breaches.

## ASPM use cases
The primary use cases for the ASPM platform include:

-   **Comprehensive visibility**: Gain a holistic, unified view of your application security posture across all stages of the software development lifecycle (SDLC), enabling you to identify and address vulnerabilities and misconfigurations
    
    -   **Applications**: insights into the SDLC of your critical business applications
        
    -   **Code to cloud**: Visualize and understand the relationship between your source code and deployed cloud resources, enabling you to identify and prioritize risks associated with your deployments
        
    -   **CI/CD systems**: Monitor and analyze the security configurations and activities within your CI/CD pipelines to identify and mitigate risks introduced during the build and deployment processes
        
    -   **Third party ingestion**: Integrate security findings from third-party scanners and security tools to gain a centralized view of your security posture and correlate findings across your development lifecycle
        
    
-   **Contextual risk prioritization and proactive detection**: Prioritize remediation efforts based on a data-driven risk assessment that combines code-level vulnerabilities, runtime behaviors, and infrastructure configurations. Proactively detect critical issues such as exposed application secrets, IaC misconfigurations, SCA CVE vulnerabilities, package operational risks, and license miscompliance, all within the context of your application's architecture and potential impact on business operations. This allows you to focus on the most impactful threats and address them before they are exploited, ensuring a robust security posture
    
-   **Effective prevention**: Enforce security policies and prevent security risks from impacting your applications
    
-   **Actionable remediation**: Improve your security posture with actionable remediation guidance for identified security risks. The platform offers automated remediation for IaC misconfigurations and CVE vulnerabilities, in addition to clear steps for manual fixes for all categories of detected risks

## ASPM key features
The Cortex Cloud ASPM solution provides the following key features to help you gain comprehensive control over your application security posture:

-   **Command Center**: A central dashboard providing a real-time overview of your organization's Application Security program, including security coverage, issue distribution (total, prevented, prioritized), and identification of riskiest applications
    
-   **Coverage**: Provides detailed visibility into the security monitoring status of Application Security assets (such as VCS repositories and CI/CD pipelines) by security scanners, highlighting coverage percentages, gaps, and scanner success/failure rates
    
-   **Backlog Management**: Enables categorization of issues and findings as New or Backlog (technical debt), allowing for differentiated management, filtering, and policy enforcement to prioritize new vulnerabilities
    
-   **Application Builder**: Facilitates the definition and management of applications, automatically discovering and associating all relevant assets across the SDLC (from code to cloud) to provide a centralized and holistic view of application risk
    
-   **Application side card**: Offers a unified, high-level summary of risks across the full application lifecycle, aggregating insights from multiple security domains, displaying key risk metrics, and showing application topology
    
-   **Code-to-Cloud context**: Provides end-to-end visibility by mapping code-level issues (such as IaC misconfigurations and CVEs) to deployed assets and runtime issues, enabling full lifecycle insight from development through CI/CD to production
    
-   **Generic 3rd party SARIF Collector**: Automates the ingestion of findings from diverse third-party scanners directly into the platform via SARIF file uploads, providing unique API access, real-time ingestion status, and detailed execution logs to streamline security workflows

## ASPM user roles and permissions
The AppSec Admin role is the dedicated user role for ASPM, granting full permissions for all application security-related activities. They can create and modify detection rules within the Code/Build domain, track progress, and adjust enforcements as needed. Additionally, they can triage and investigate findings, issues, and cases spanning from code to cloud. The role also includes complete visibility into all cloud assets.

Permissions assigned to the AppSec Admin role cannot be modified. However, you can save this role as a new custom role which can then be edited to meet specific organizational needs, offering a balance between standardized roles and customizable access control.

You can view AppSec Admin permissions in the tenant by navigating to Settings → Configurations → Roles → AppSec Admin.

## Code to Cloud

Code to Cloud context maps asset lineage across the SDLC. By connecting repos, pipelines, and infra, it provides end-to-end traceability from code to runtime.

Code to Cloud context is the correlation engine that maps and maintains the full lineage of assets across the SDLC. By connecting repositories, pipelines, and infrastructure, it provides end-to-end traceability from source code to runtime resources.

Full Code to Cloud (C2C) coverage is achieved when Cortex Cloud can resolve the following chain: **Repository → Pipeline → Image → (optional Registry) → Runtime resources (including VMs, VM images, and IaC-defined infrastructure)**. This lineage mapping connects repositories, pipelines, images, VMs, VM images, IaC-defined infrastructure, and runtime assets back to their originating code, pipelines, IaC resources, and OSS packages—providing full lifecycle context rather than isolated runtime visibility.

When relationships cannot be resolved—for example, due to missing YOR tags or pipeline integrations, Cortex Cloud detects coverage gaps and provides specific configuration steps to fix them. If any part of this chain is unsupported or disconnected, the tenant provides only a partial view, isolating code-side or cloud-side components without end-to-end links. This limits bidirectional impact analysis: code issues cannot be traced to runtime for prioritization by actual exposure, and vulnerabilities cannot be traced back to their source code or owner.

By establishing deterministic links between code, build artifacts, and runtime infrastructure, Code to Cloud context enables the following:

-   **Bidirectional traceability**: Trace runtime issues back to the specific line of code, developer, or pipeline that introduced them
    
-   **Contextual application grouping**: Automatically groups related assets into business applications, allowing you to manage risk based on actual business impact
    
-   **Precision prioritization**: Prioritize remediation based on actual exposure, such as whether a vulnerability is active or internet-facing, and its potential business impact
    
-   **Drift detection**: Compare the intended state defined in Infrastructure-as-Code (IaC) templates against the actual state of runtime resources to identify unmanaged changes.
    
    -   **For IaC drift detection policies**: To configure the security baselines and specific rule mappings that drive this detection logic, see Create IaC Drift Detection policiesCreate IaC Drift Detection policies
        
    -   **For IaC Drift Detection issues**: To investigate, prioritize, and remediate the specific runtime discrepancies identified by these scans, see IaC Drift Detection scansIaC Drift Detection scans
        
    

### Core components and mechanisms

-   **Asset Lineage Graph**: This queryable graph database automatically maps the relationships between upstream assets (code repos, packages, IaC resources) and downstream assets (container images, virtual machines, runtime workloads, and cloud services). It is populated by ingesting metadata from:
    
    -   **VCS and CI/CD**: Captures repository metadata, build logs, and pipeline run data
        
    -   **Build artifacts**: Extracts deterministic links (such as image digests) from container and VM image builds
        
    -   Runtime Scanners: Maps running workloads back to their build sources via the Cloud or Kubernetes connectors
        
    
-   **Infrastructure-as-Code (IaC) Traceability (`YOR`)**: To bridge the gap between static IaC files and dynamic cloud resources, Cortex Cloud leverages `YOR` tags:
    
    -   **Automated mapping**: `YOR` applies unique trace tags to IaC resources. Cortex Cloud uses these tags to link a Terraform or CloudFormation template to the specific cloud asset it provisioned (for example, IaC Resource → Cloud Asset)
        
    -   **Gap analysis**: If YOR tags are missing, the Asset Lineage Graph cannot complete the link. The system will prompt you to initiate tagging via the [yor website](https://yor.io/) to unlock full visibility
        
    
-   **Drift detection logic**: Code to Cloud enables drift detection by treating Git as the single source of truth. The system correlates the declared state (from VCS) with the runtime state (from CSPM integrations). Drift is only flagged when a runtime change violates a security policy that is not violated in the source code, ensuring focus on security-relevant regressions rather than operational noise

### Supported integrations
To build the asset lineage, Cortex Cloud requires integration with specific providers across your stack.

| Component | Supported provider/build tool |
| --- | --- |
| VCS | GitHub, GitLab, Bitbucket, Azure DevOps |
| CI/CD | GitHub Actions, GitLab CI/CD, Azure Pipeline, Jenkins, CircleCI |
| Containers | Docker CLI → Container image, docker compose, docker buildx, Kaniko |
| VM images | AWS EC2 Image Builder, Packer → AWS AMI |
| IaC | Terraform (.tf), CloudFormation (.yml, .json) |

### Code to Cloud visibility

Manage security risk across the SDLC by tracing technical asset lineage. View asset dependencies and runtime context in assets, issues, and policies.

Code to Cloud context is integrated throughout the user interface to help you visualize dependencies and enforce security.

-   **Topology graph**: Located in the **Business Applications** side card, this tab visualizes the entire path to production (`Code → Build → Deploy → Run`), allowing you to see how assets are interconnected
    
-   Dedicated Cortex Cloud Application Security asset inventories: Repository, Software Package and IaC Resources side cards include Code to Cloud tab. This graph maps the specific asset to its upstream source and downstream runtime deployments
    
-   Issue investigation: Vulnerabilities and IaC Misconfiguration issues include a Code to Cloud tab. This view traces the specific defect from the code file to the impacted runtime resource, helping verify if a vulnerability is actively deployed
    
-   **Policy enforcement**: Policies can be configured with runtime conditions. For example, you can block a build only if the detected vulnerability affects an asset that is destined for an internet-facing environment. For more information on creating policies, refer to Create Cortex Cloud Application Security policies

### Code to Cloud troubleshooting
If the Code to Cloud lineage is incomplete, specific signals may be missing. Common issues include:

-   **Missing YOR Tags (IaC Resources)**: IIaC resources without tags cannot be mapped to runtime. The system will prompt you to tag these resources
    
-   **Missing Pipeline Integrations (Repositories)**: If pipeline integrations are missing, the link between code and build artifacts breaks
    
-   **Inactive Pipeline**: Lineage is generated during pipeline runs. If a pipeline is integrated but has not run, trigger a build to generate the necessary artifacts and establish the connection
    

**Note:**

Empty state messages and troubleshooting guidance for missing lineage are only visible to users with an active license.

## ASPM Command Center

The ASPM Command Center is your central hub for real-time application security posture management across the SDLC. It offers critical insights to identify risks, track compliance, and enable secure development, transforming data into actionable cases.

The ASPM Command Center acts as a central hub for managing your application security posture across the entire Software Development Lifecycle (SDLC), from code to cloud. It offers a high-level, real-time view of your organization, providing critical insights into:

-   **Overall security trends**: Track how your application security posture is evolving over time
    
-   **Policy compliance**: Monitor adherence to your security policies throughout the SDLC
    
-   **Coverage**: Gain visibility into scanned and unscanned assets, helping you identify and address security gaps
    
-   **Critical risks**: Quickly identify and understand your most significant security threats
    

The ASPM Command Center provides a single, centralized view to track progress, prioritize actions, and explore key areas such as vulnerabilities, security coverage, and issue prioritization. It visualizes the data flow of issues from various sources—through blocking and prioritization—to their aggregation into actionable cases, helping you identify critical gaps, reduce risk, and focus on the most significant threats.

### Use cases

-   **Data source and issue overview**: View all your connected data sources including version control systems (VCS), data ingested from 3rd-party sources, CI/CD pipelines, and registries, along with the issues generated by Cortex Cloud from findings detected within these data sources
    
-   **Coverage**: Assess your total security coverage of scanned assets, including coverage per data source, providing immediate insight into the completeness of your security monitoring efforts and highlighting areas where coverage needs to be improved
    
-   **Deduplication and prioritization**: Analyze security issues by determining which were blocked by guardrails and which were deduplicated and aggregated for further action. This streamlines the volume of issues, ensuring your focus remains on the most impactful threats by presenting a refined set of prioritized issues
    
-   **Riskiest applications**: Identify your applications most at risk. This view presents a list of critical applications and the overall count of high and critical cases across all applications, enabling rapid prioritization of top security concerns
    

### Key performance indicators (KPIs) and widgets

The ASPM Command Center also features Key Performance Indicators (KPI) and widgets for a high-level overview:

-   Total Coverage widget: Shows the percentage and absolute number of total assets scanned. Clicking this widget redirects you to the AppSec Coverage page
    
-   Riskiest Applications widget: Presents a list of your most vulnerable applications, detailing the number of cases and their criticality. Selecting an app from this list opens the application case side panel directly within the ASPM Command Center, without the need to leave the command center and navigate to the dedicated Cases page
    
-   AI Guardrails: AI-recommended guardrails help shift your security posture from detection to prevention by analyzing scan findings and suggesting high-impact blocking policies. Recommendations address both protecting known-good code (Lockdown) and reducing recurring risk patterns (Stop the bleeding), and are prioritized using context-aware analysis of deployed environments and backend risk scoring. Select Explore to redirect to the AppSec Policies page, where you can review, customize, and enforce the recommended guardrails
    
    Refer to AI-recommended guardrails for more information.
    

For tailored analysis, the ASPM Command Center Overview page includes severity filters, allowing you to refine the displayed data based on the criticality of issues.

### ASPM Command Center workflow
The ASPM Command Center is designed to provide a comprehensive, interactive, and actionable overview of your application security posture. It streamlines the complex journey of security findings from their origin, through prioritization and aggregation, to resolution, empowering you to maintain a strong application security posture.

The ASPM Command Center is an interactive graph that visually represents your application security workflow, moving from general data sources to a prioritization funnel, to specific, actionable cases. This visualization helps you quickly understand your security posture.

#### Data sources and coverage

The first section of the graph focuses on your data sources, including both onboarded and third-party sources, categorized into CI/CD Pipelines and VCS & 3rd Party data sources. In this section interactive elements provide more detailed information:

-   **Data source overview**: Hovering over a data source provides a quick overview of its coverage
    
-   **Total coverage insights**: The More Coverage Details tab opens a dedicated Total Coverage page within the ASPM Command Center. This page displays the overall amount and percentage of each data source type out of your total, along with a granular breakdown of scanner coverage (SAST, SCA, Secrets, IAC), showing the same detailed metrics
    
-   **Increase coverage**: The Click to Increase Coverage link directs you to the AppSec Coverage page, which enables you to enhance your security coverage
    
-   **Issue count**: Each data source also displays the number of issues detected
    

#### Prioritization and aggregation funnel

Clicking on the prioritization and aggregation part of the graph provides a dedicated view within the ASPM Command Center, displaying the security funnel. This page includes:

-   Issues: The initial volume of security issues
    
    **Note:**
    
    Breakdown by type: Issues are further broken down by type (such as IAC or Secrets).
    
-   Open After Guardrails: The amount of issues that persist after being filtered by your security guardrails, including those blocked in PRs
    
-   Prioritized: Issues refined by parameters such as context, impact, probability, and issues not found in deployed applications
    
-   Cases generated: At the end of this funnel, the number of cases generated post-prioritization and aggregation are displayed, with a breakdown prioritized by application, type, and severity
    

#### Case management

In the ASPM Command Center Overview page, the final section of the graph summarizes your cases: It displays the total count of open and closed cases. Open cases are further broken down by critical and high severity, alongside a summary of closed cases.

## Applications

Build and manage applications as holistic entities. Gain centralized visibility across the SDLC to monitor assets and remediate threats based on business risk.

Applications are a single, holistic entity that encompasses their entire lifecycle and all its components, from custom code to open-source libraries and infrastructure configurations. This dynamic, logical entity allows for focused monitoring and protection of high-priority assets throughout your software delivery life-cycle (SDLC). Cortex Cloud provides you with the tools to build, manage, and gain visibility into your applications.

-   **Build applications to your needs**. You can create business applications by selecting and associating components, starting with either code or cloud assets
    
-   **Manage application assets**: The business application assets inventory gives you a centralized view of all applications and their interconnected assets throughout your SDLC
    
-   **Application management and visibility**: Cortex Cloud provides tools for managing the security issues detected in your applications, allowing you to prioritize, analyze, and mitigate threats based on business criticality
    

By centralizing these functions, Cortex Cloud helps you to identify, prioritize, and remediate issues that could impact your most critical business systems.

### Defining Business Applications

Define Business Applications automatically using tag-based criteria or manually with the Application Builder to map assets and prioritize app risk.

Business Applications allow you to define, group, and maintain assets that constitute a logical application with a unified business context. This enables a precise Code to Cloud security posture by correlating risks across the entire development lifecycle.

You can build applications using one of these methods:

-   **Application Criteria**: Automatically create and maintain multiple applications in bulk by defining Application Criteria. Criteria allow you to dynamically set rules that group assets into applications based on existing cloud tags or code-based attributes. This ensures consistent grouping and scalable application visibility while reducing manual effort
    
-   **Application Builder**: Provide a starting point from either code or cloud, and Cortex Cloud Application Security automatically maps related assets across the application lifecycle

#### Defining business applications by Criteria

The Criteria process uses tag-based criteria as the single source of truth to automatically define application assets and enable Code-to-Cloud risk correlation in real-time.

Defining business applications by Criteria allows you to automatically create and maintain application boundaries using organizational metadata from integrated sources. You can define criteria based on **Cloud tags** (for example AWS tags) or code-based **Version Control System (VCS) entities**, such as organizations, projects, and repositories.

These criteria define the authoritative definitive logic for application grouping, enabling Cortex Cloud to correlate security risks across the entire Code to Cloud lifecycle—from source code through to CI/CD pipelines, deployments, and runtime environments.

By automatically linking assets and enriching applications with business context (such as criticality, owner, and business unit), criteria-based applications through Criteria eliminate manual boundary management, and ensure consistent, real-time application visibility as your environment evolves.

##### Key benefits

-   **Automated application mapping**: Define Criteria based on cloud tags or code-based VCS entities to automatically create and scale applications that align with your code structure and organizational patterns
    
-   **Automatic asset enrichment**: Generate applications enriched with code, build, deploy, and runtime assets using the Cortex Cloud relationship algorithm
    
-   **Reduced manual effort**: Eliminate time-consuming, manual mapping of assets to their applications
    
-   **Real-time accuracy**: Update application maps automatically in response to changes in underlying infrastructure and asset tagging or code repositories
    
-   **Holistic security posture**: Gain a complete application-centric view of your security posture across your SDLC

#### Define applications by VCS criteria
Use VCS Criteria to automatically generate and maintain Business Applications based on your code hierarchy. Unlike manual creation, this method creates a dynamic rule set: as developers create new repositories that match your criteria, they are automatically recognized and onboarded as Business Applications without manual intervention.

**Prerequisites:**

-   **Data source**: Your Version Control System (e.g., GitHub, GitLab) must already be onboarded as a Data Source
    
-   **Permissions**: You must have View/Edit permissions for Access Management
    
-   **SBAC**: You can only create applications from VCS entities (Organizations, Projects, or Repositories) that are already included in your SBAC Asset Groups
    

1.  Under Modules, select Application Security → Business Applications (under Application Management) → Create Applications → New Criteria.
    
2.  On the General step.
    
    1.  Select Code as the source type.
        
        **Note:**
        
        This workflow allows you to unify assets across disparate providers (such as grouping a GitHub repository and a Bitbucket repository into one application) if they share naming conventions
        
    2.  Provide a Criteria name (required) and description.
        
    3.  Click Next.
        
3.  On the Define Criteria step.
    
    Define Grouping logic: Determine how Cortex Cloud constructs the boundaries of your applications. These settings control whether an application is defined as a single repository or a broader organization, and how the system handles assets with identical names across your environment. Connected runtime and deployment assets are automatically linked to these boundaries to provide a complete view of the application lineage
    
    1.  **Group by** (required): Select the VCS entity level that represents a distinct application in your architecture (such as Organization, Project, or Repository).
        
        This setting defines the application perimeter. For example, selecting Repository creates a separate application for every repository found, whereas selecting Organization aggregates all assets within an organization into a single application.
        
    2.  Merge organizations/projects/repositories with identical names (optional): Group entities with identical names within the selected provider.
        
    3.  Unify applications across providers (optional): Group entities with identical names across all selected providers.
        
    4.  Click Next.
        
4.  On the Scope step.
    
    Apply filters to strictly define which VCS entities are processed. Select any combination of provider entities (one or multiple) to refine the application’s scope, for instance, by organization alone or by organization + project + repository for precision. This ensures the scope aligns precisely with the desired segment of your VCS structure.
    
    The scope remains dynamic: newly matching assets join automatically as your environment evolves, while those that stop matching drop out. This maintains an up-to-date inventory tied to the chosen VCS entities.
    
    1.  Select a VCS provider to evaluate.
        
    2.  Configure rules to limit scope. Set specific conditions, such as: Organization Name Contains Production.
        
        Only assets matching these rules will trigger the creation of an application.
        
    3.  Click Next.
        
5.  On the Metadata step.
    
    Configure rules to automatically assign ownership and risk levels to the generated applications.
    
    1.  Business Owner: Assign application ownership by syncing with your VCS provider (such as GitHub or GitLab)
        
    2.  Configure Business Criticality:
        
        1.  Select a default severity level.
            
        2.  **Severity override**: It is recommended to enable **Internet exposure override** to automatically elevate the severity of internet-exposed assets to Critical, ensuring accurate risk prioritization.
            
    3.  Click Done.
        
        Cortex Cloud will begin processing your criteria. Navigate to the Business Applications list to verify that your new applications have been generated and populated with assets.

#### Manage application criteria
After defining your application criteria, you can monitor their status and manage their lifecycle from a centralized view.

##### View application Criteria

View and manage the rules that govern your application definitions.

To view Application Criteria, under Modules, select Application Security → Application Criteria (under Application Management).

The table below lists all configured Application Criteria, detailing the properties that define how Cortex Cloud groups assets:

-   Name: The user-defined name for this criteria set
    
-   Tags: The specific tag keys selected from the cloud provider
    
-   Creation Method: Indicates the origin of the criteria definition
    
-   Created By: The entity that created the criteria
    
-   Assets: The count of logical applications and the total number of associated assets grouped by this criteria
    
-   Last Updated: The timestamp of the last modification to the criteria set
    

##### Manage application Criteria

-   You can delete application Criteria: On the Application Criteria screen, right-click on a criteria in the table → Delete.
    
-   To delete **all** application Criteria, select all Criteria → Delete.
    
    Deleting the criteria will remove all applications created by it. This process is irreversible.

#### Define applications by cloud tag-based criteria
Creating applications through cloud entities (Accounts, Subscriptions, or Resource Groups) is the foundational step for runtime-driven risk correlation. By defining these grouping rules, you enable Cortex Cloud to unify infrastructure assets within a specific Cloud Service Provider (CSP) and automatically link runtime environments to their associated deployment pipelines and originating source code. This environmental context is required for precise exploitability-aware prioritization and comprehensive Cloud to Code visibility.

Grouping is limited to assets within a single cloud provider, and assets with the same tag key and value across accounts or projects in the same provider are included in the same application. Cross-provider grouping is not supported.

**Prerequisites:**

**Permissions**: You must have View/Edit permissions for Access Management, or a role that includes these permissions.

1.  Under Modules, select Application Security → Business Applications (under Application Management) → Create Applications → New Criteria.
    
2.  On the General step of the application Criteria wizard.
    
    1.  Select Cloud.
        
        **Note:**
        
        You can only create applications based on the entities from onboarded Cloud accounts listed in the Cloud card.
        
    2.  Provide a Criteria name (required) and description.
        
    3.  Click Next.
        
3.  On the Define Criteria step of the wizard.
    
    1.  Select a cloud provider to define where assets will be discovered for the application.
        
        The system automatically retrieves all available tag keys from that provider.
        
    2.  Select the organizational tags you will use for automatic asset grouping:
        
        -   **Selection limit**: Select between one and five tags
            
        -   **Grouping logic**: When multiple tags are selected, an `AND` condition is applied. Only assets that contain **all** the chosen tag keys will be included in the resulting application
            
        
        **Note:**
        
        **Kubernetes (K8S) labels**: K8S labels are supported as tags for asset grouping only when they originate from a supported cloud provider; AWS, GCP, Azure, or OCI.
        
    3.  Click Next.
        
4.  On the Metadata step.
    
    1.  **Map application metadata**: Map existing infrastructure tags to these application metadata fields. This ensures the automatically created application definition inherits the required security and business context from its grouped assets and reduces the need for manual updates after the application is created.
        
        -   Application Name: Specifies which tag key should be used to derive the application name ( for example, if you specify app-name as the source tag, applications will be named based on values found in the app-name tag
            
        -   Business Criticality: Determines which tag key contains business criticality information (such as `criticality`). How it works: Extracts criticality levels (Critical, High, Medium, Low) from the specified tag and assigns the highest criticality level found across assets. If not specified or no value found, defaults to Medium
            
        -   Business Owner: Map to a tag key which contain business owner information, allowing you to define the entity responsible for the application (such as `owner`)
            
        -   Business Unit: Map to a tag key containing business unit information by defining the relevant department within the organization that uses or owns the application (such as `org`)
            
        
    2.  Select Done.
        
        The configured values are assigned to their corresponding application fields, creating the criteria set and ensuring that mapped metadata is applied to all matching assets.
        
    3.  Verification: On the Business Applications page, confirm the success notification is displayed, and that the newly created applications, based on the defined criteria, are displayed in the list. You may need to wait some time for the applications to populate, especially for large applications gathering substantial data.

#### How to manually build an application

Manually build an application by adding assets, starting from either the code or run side.

You can build your application by adding assets, starting from either the code or run side. This process covers your entire code-to-cloud journey: Code, Build, Deploy, Run. Your application is then automatically built from the assets you select on your chosen starting side, and other assets are added automatically based on their connections.

**Prerequisites:**

Before you begin, ensure you have connected the necessary data sources. Refer to How to onboard data sources for more information.How to onboard data sources

1.  Under Modules, select Application Security → Business Applications (under Application Management) → New Application → New Application.
    
2.  In the Add a New Application dialog box:
    
    1.  Provide the required details:
        
        -   Application name (required): A user-provided name
            
        -   Category (required): Default - Business Application
            
        -   Description: A description of the application. Provides context for users interacting with the application
            
        -   Business Criticality (required): The level of importance of the application to your organization. This helps prioritize resources and attention based on the application's impact to your business objectives
            
        -   Business owner: The individual or team responsible for the application from a business perspective
            
        
    2.  Click Create.
        
3.  On the Applications page: Add assets to your application, starting with either code or cloud assets:
    
    -   **Add code assets from the Code pane**:
        
        1.  Select a version control system (VCS) from the list that is displayed.
            
        2.  Choose one or more of the following from their respective dropdown lists (multiple selections allowed): a specific VCS instance, an organization, or a repository.
            
            **Note:**
            
            These filters are represented by icons displayed on the Code pane after selecting a VCS.
            
        3.  Click Done (on the Code pane).
            
            After connecting your VCS, Prisma: Cortex automatically identifies and associates all build-time (such as source code, build scripts, Dockerfiles, CI tools), deploy (such as Kubernetes manifests, Helm charts, Terraform scripts), and runtime assets (such as running containers, virtual machines, cloud instances).
            
        
    -   **Add cloud assets from the Run pane**:
        
        1.  Select an option:
            
            -   Click Add Assets by Provider to select a cloud service provider
                
            -   Click Add Assets by Tag or optionally select Kubernetes Namespace, Kubernetes Cluster, VPC, Organization or Resource tag to automatically populate the application with runtime assets associated with those entities. These filters are represented by an icon displayed under Run (after selecting a cloud provider)
                
            
        2.  Select an instance of your connected provider from the list that is displayed.
            
        3.  Click Done (on the Run pane).
            
            After connecting your cloud service provider, Cortex Cloud automatically identifies, associates and displays all Code (VCS repositories), build-time (such as source code, build scripts, Dockerfiles, CI/CD pipelines) and deploy assets (such as Kubernetes manifests, Helm charts, Terraform scripts).
            
        
    
4.  Click Finish to create the application.
    
    The application is displayed on both the All Applications and its dedicated asset page (business).
    

**Note:**

To edit application assets, click the Clear All icon before clicking Finish. This clears all application data, allowing you to restart the application building process from the beginning.

### Application management and visibility
You can view and manage your applications from the following interfaces:

-   The **Business Applications** asset inventory provides a focused view that allows you to analyze and manage business assets, including seeing all of your interconnected assets, tracing their path to production, and managing issues directly from the asset's side card: Navigate to Inventory → All Assets → Business Applications (under Application)
    
-   Dedicated Application tabs in the side panels of Cortex Cloud Application Security asset categories, such as IaC Resources, Repositories and Software Packages, which list assets associated with applications. For example, see Applications

### Business application assets
The Business Application asset inventory provides visibility into all business applications and their interconnected assets generated throughout your software development lifecycle (SDLC), serving as a centralized repository for business application inventory management. Additionally, the interface details the risks detected in your business applications, allowing you to prioritize, manage, and mitigate potential threats based on business criticality.

To access the Business Application asset inventory, under Inventory, select All Assets → Business Application.

The Business Application asset inventory includes a dashboard with a widget of all issues detected in the application by severity level and a table including a list of applications.

**Controls**: You can filter the table to narrow results or export the table data from the Download icon.

The following fields are exposed in the application inventory table. To add additional table properties, select Menu settings → [property].

| Field | Description |
| :-- | :-- |
| Name | The application name |
| Business Owner | The individual or team responsible for the application from a business perspective, as provided when creating the application |
| Criticality | The importance of the application to the business as defined when creating the application |
| Assets | The amount of assets associated with the application |
| Creation Method | Whether the application was created using criteria (Auto) or manually |
| Risk | Represents the overall assessed risk level for the application |
| Criteria Name | The configured criteria name |
| Last Updated | Timestamp showing the most recent application update |

#### Business application expanded asset details
Click an application in the inventory table to open its side card, providing in-depth information organized into several tabs. The Overview tab (default display) offers highlights and a general summary. Additional contextual tabs provide specific details, including a Topology tab (providing context on the application path to production), and tabs focusing on specific issue types detected within the asset, such as Secrets and Vulnerabilities.

Overview

The Overview tab summarizes application highlights, metadata and properties.

-   Highlights: Includes properties such as deployment status
    
-   **Visibility timeline**: When the application was first and last detected
    
-   Asset properties, including Asset Id, Asset Category, Asset Groups and associated with the application
    
-   Application risks:
    
    -   **Risk summary**: The amount of risks associated with the application assets grouped by category (cases, issues and findings) and their severity level. For more information about issues, refer to Cortex Cloud Application Security code scannersCortex Cloud Application Security code scanners
        
    -   Risk Score: A value representing the overall security risk of an application, based on various underlying metrics. This helps in assessing and prioritizing the application's security posture and potential vulnerabilities
        
    
-   Coverage: Evaluate the application security coverage via its scanned asset percentage
    
-   Business Criticality: As defined when creating the application. See How to manually build an application for more informationHow to manually build an application
    
-   Business Owners: The entity associated with the application
    
-   **Criteria**: The criteria used to create the application
    
-   Creation Method: Indicates if the application was created through a manual selection of assets or automatically (such as via automation or discovery)
    

Topology

The Topology tab visualizes your application's asset relationships across the entire software development lifecycle (SDLC). It maps interconnected assets including code repositories, pipelines, container images, and workloads, providing a comprehensive representation of the code-to-cloud journey. You can view the topology either as a visual representation or as an asset inventory by selecting the Graph or Inventory (default) tabs respectively.

**Note:**

The topology graph is available only when all application components (code, pipeline, build and deploy), are configured.

##### Topology graph

The graph displays the application path to production, organized into four key SDLC sections:

-   **CODE**: Displays source code repositories and VCS organizations, allowing you to understand code organization and repository structure:
    
    -   Providers: GitHub, GitLab, Azure Repos, Bitbucket
        
    -   Key relationships: Organizations contain repositories; repositories are forked from others
        
    
-   **BUILD**: Displays CI/CD pipelines, visualizing build processes and pipeline dependencies:
    
    -   Providers: GitHub Actions, GitLab CI/CD, Jenkins, Azure Pipelines, CircleCI
        
    -   Key relationships: Repositories trigger pipelines; pipelines build container images
        
    
-   **Deploy**: Displays container registries and image repositories, allowing you to track image lineage and registry organization:
    
    -   Providers: Docker Hub, Google Artifact Registry (GAR), Amazon ECR, Azure ACR
        
    -   Key relationships: Registries contain image repositories; pipelines build specific container images
        
    
-   **Run**: Displays runtime architecture, including compute, storage, networking, and identity assets, allowing you to understand runtime architecture and resource dependencies
    
    -   Assets: Kubernetes clusters/workloads, virtual machines, serverless functions, storage buckets, load balancers, and IAM policies
        
    -   Providers: AWS, GCP, Azure
        
    -   Key relationships: Images run on instances, workloads use service accounts, functions access storage buckets
        
    

**Navigating the graph**

Use the following controls to manage the view and investigate assets:

-   **Node actions**: Click any asset node to view basic details. Select View Details in the popup to open the asset side-car for comprehensive information without leaving the topology view
    
-   **Search and highlight**: Search for specific assets by name to highlight matching nodes and navigate directly to them in the graph
    
-   **Group nodes**: Toggle this to organize assets into logical clusters (such as Container Images), simplifying complex graphs. Click a group to expand it
    
-   **Layers**: Apply filters to view assets based on specific criteria, such as public internet exposure, related cases, or associated runtime events
    

**Filtering and layout options**

Customize the display to focus on relevant information:

-   **Section filtering**: Toggle visibility for specific SDLC sections (CODE, BUILD, DEPLOY, RUN) to isolate parts of the lifecycle
    
-   **Provider filtering**: Filter assets by cloud or VCS provider (such as Show only AWS or GitHub assets)
    
-   **Layout options**: Choose a visualization style:
    
    -   Hierarchical: Top-to-bottom flow (Code → Build → Deploy → Run).
        
    -   Force-Directed: Physics-based layout.
        
    -   Circular: Circular arrangement.
        
    

**Understanding relationships**

Edges connecting nodes represent specific interactions or dependencies, including:

-   **CONTAINS**: Hierarchical containment (such as Org → Repo)
    
-   **TRIGGERS**: Activation (such as Repo → Pipeline)
    
-   **BUILDS**: Creation (such as Pipeline → Image)
    
-   **RUNS ON**: Runtime execution (such as Image → Container Instance)
    
-   **USES/ACCESSES**: Resource usage or data access
    

**Common workflows**

-   **Investigate critical vulnerabilities**: Identify a critical CVE, locate the affected repository in the graph, and trace relationships forward to see if vulnerable versions are currently deployed as running instances
    
-   **Track Code to Cloud misconfigurations**: Identify IaC issues (code) and trace them to deployed cloud resources to ensure fixes are applied at the source to prevent future misconfigured deployments
    
-   **Audit secret exposure**: Locate repositories with privileged secrets and trace them to the DEPLOY or RUN sections to see if those secrets are active in production environments
    
-   **Understand application architecture**: Filter for the RUN section to identify runtime components, then trace back to source repositories to document deployment paths for compliance.
    

##### Topology inventory

The Inventory table displays all assets associated with the business application. Selecting an asset opens its side card directly without having to navigate away to the dedicated asset inventory.

-   **Asset details**: Displays properties such as Name, Provider, Type, Region, and timestamps for First/Last Observed
    
-   **Risk context**: Includes breakdowns of associated cases, critical issues, and vulnerability severity
    
-   **Table controls**: Filter the table by property or adjust the table settings to add/remove columns
    
-   **Export** icon: Download the inventory as a `.tsv` file. See Export business application data for more information
    

Vulnerabilities

The Vulnerabilities tab displays SCA vulnerability issues detected across the application assets. This tab includes a a continuous funnel graph and a section detailing the riskiest repositories.

The graph displays the following vulnerability metrics, filtered by default for Critical and High severity:

-   All: The total amount of vulnerabilities detected in the application and its assets
    
-   Exploitable: The subset of total vulnerabilities that are exploitable
    
-   Fixable: The subset of total vulnerabilities that have an available fix
    
-   Deployed: The subset of vulnerabilities detected in deployed application assets
    

You can filter the graph to display any combination of severities (Critical, High, Medium, and Low). Selecting any stage of the funnel (such as Fixable) redirects you to the main Issues inventory, filtered to display vulnerabilities that that match the criteria you selected (for example, issues that have available fixes).

A known limitation is that only up to 4,000 issues will be displayed in the Issues inventory when redirecting from the graph, even if the count in a particular stage (such as Deployed) is higher.

The Riskiest repositories section lists the repositories with the highest risk, based on the number and severity of known vulnerabilities detected in the application. It also displays risk metrics such as whether the repository is deployed.

This section displays the following details for each repository:

-   VCS
    
-   Repository location
    
-   Branch
    
-   Last commit date
    

Selecting a repository from the list redirects you to the main Issues inventory, filtered to display all vulnerability issues for that specific repository. It includes the total number and a breakdown of issues by severity level.

Selecting the branch link opens that repository's asset side-card directly, allowing you to view more details without navigating away.

Configurations

The Configurations tab displays IaC misconfiguration issues detected across the application assets. This tab includes a graph and a section detailing top IaC misconfiguration rules.

The graph displays the following IaC misconfiguration metrics, filtered by default for Critical and High severity:

-   All: The total number of misconfigurations detected in the application and its assets
    
-   Fixable: The total number of misconfigurations that have an available fix
    
-   Deployed: The total number of misconfigurations detected in deployed application assets
    

You can filter the graph to display any combination of severities (Critical, High, Medium, and Low). Selecting any of these categories (such as Fixable) redirects you to the tenant's main Issues inventory. This page will be filtered to display all IaC Misconfiguration issues for this specific application that match the criteria you selected (for example, issues that have available fixes).

A known limitation is that only up to 4,000 issues will be displayed in the Issues inventory when redirecting from the graph, even if the count in a particular category (such as Deployed) is higher.

The Top IaC misconfiguration rules section helps you identify and focus on the most urgent issues by highlighting misconfigurations detected from a matching rule in both the source code and the deployed cloud environment. It includes the total number and a breakdown of issues by severity level.

Selecting one of these matching rule sets redirects you to the main Issues inventory, filtered to display all IaC misconfiguration issues detected by that specific IaC rule set.

Secrets

The Secrets tab displays exposed Secrets issues detected across the application assets. This tab includes a graph and a section detailing the Riskiest repositories.

The graph displays the following Secrets metrics, filtered by default for Critical and High severity:

-   All: The total number of Secrets detected in the application and its assets
    
-   Valid: The total number of detected Secrets that have been verified as active and functional
    
-   Privileged: The total number of Secrets that are valid and provide high-level access
    

You can filter the graph to display any combination of severities (Critical, High, Medium, and Low). Selecting any of these categories (such as Valid) redirects you to the tenant's main Issues inventory. This page will be filtered to display all Secrets issues for this specific application that match the criteria you selected (for example, issues that are validated).

A known limitation is that only up to 4,000 issues will be displayed in the Issues inventory when redirecting from the graph, even if the count in a particular category (such as Valid) is higher.

The Riskiest repositories section identifies the repositories with the highest risk, based on the number and severity of known Secrets detected in its assets. It includes the total number and breakdown of issues by severity level.

-   VCS
    
-   Repository location
    
-   Branch
    
-   Last commit date
    

Selecting a repository from the list redirects you to the main Issues inventory, filtered to display all Secrets issues for that specific repository.

Selecting the branch link opens that repository's asset side-card directly, allowing you to view more details without navigating away.

Code Weaknesses

The Code Weaknesses tab displays SAST code weakness issues detected across the application assets. This tab includes a graph and a section detailing the Riskiest repositories.

The graph displays the following code weakness metrics, filtered by default for Critical and High severity:

-   All: The total number of code weaknesses detected in the application and its assets
    
-   Labels: The total number of code weaknesses that are categorized by specific labels
    
-   Deployed: The total number of code weaknesses detected in deployed application assets
    

You can filter the graph to display any combination of severities (Critical, High, Medium, and Low). Selecting any of these categories (such as Deployed) redirects you to the main Issues inventory. This page will be filtered to display all Code Weakness issues for this specific application that match the criteria you selected.

A known limitation is that only up to 4,000 issues will be displayed in the Issues inventory when redirecting from the graph, even if the count in a particular category is higher.

The Riskiest repositories section identifies the repositories with the highest risk, based on the number, severity, and type of code weaknesses detected—including those deployed to production.

This section displays the total count and type of issues for each repository, along with:

-   VCS
    
-   Repository location
    
-   Branch
    
-   Last commit date
    

Selecting a repository item redirects you to the tenant's main Issues inventory, which is filtered to display all code weakness issues for that specific repository.

Selecting the branch link opens that repository's asset side card directly, allowing you to view more details without navigating away.

#### Export business application data
You can export application security data for reporting, sharing metrics, or audit evidence. Cortex Cloud offers two export workflows: a portfolio-level overview or an application-level deep dive. Data is downloaded to your local host in a `.tsv` file format.

##### Export global portfolios

You can export the high-level inventory for all defined business applications. This is used for reporting on the organization’s overall risk posture, business criticality, and security coverage.

1.  Navigate to Inventory → All Assets → Business Applications.
    
2.  Select the Export icon on the main table header.
    
    A file containing high-level summary data of all your business applications is downloaded.
    

##### Export individual application asset data

You can export the granular technical details for a single Business Application. This allows for tracing the Code to Cloud lineage and verifying the security status of every asset within a specific service.

1.  From the Business Application inventory, click on an application name to open the Application side card.
    
2.  Select the Topology tab.
    
3.  Ensure the view is set to Inventory.
    
4.  Select the Export icon within the Topology section.
    
    A file containing data of all the assets associated with the business application is downloaded.

### Scope user access to applications (Application SBAC)
Scope user access to applications to ensure users only have permission, visibility, and actions within the applications explicitly assigned to them. This enforces clear security boundaries and provides consistent, application-level control across all application-related assets and issues, minimizing a user’s broad or unnecessary access by enforcing per-user application-level control and ensuring users can only access what’s relevant to them.

Application SBAC defines security boundaries and policies around the application entity itself. It provides granular, application-aware control, transitioning from infrastructure-wide permissions to application-specific enforcement.

#### Key features

-   **Granular access control** (Implicit Deny Model): Enforces explicit user access to specific applications and their associated assets—such as repositories, packages, and vulnerabilities. Access to any application or asset not explicitly listed is automatically denied
    
-   **Contextual data filtering**: Use the Business Application Names as a universal filter to scope data views (such as dashboards) to a selected application
    

#### Application-based scope across the platform

-   ASPM Command Center: Limits the interactive security workflow graph in the ASPM Command Center to only the applications the user is authorized for
    
-   Dashboards: Application scope automatically narrows platform-wide data into application-specific insights
    
-   Coverage: Evaluate the security maturity of your application by identifying connected data sources and their coverage status of the application's assets, assessing the scanner coverage status of onboarded assets, and understanding which scanners (such as SCA, Secrets, IaC) that are actively analyzing the application's codebase and build
    

#### Application SBAC setup and workflow

1.  Platform enablement: Enable SBAC at the tenant level.
    
2.  Create or edit an Asset Group to include application assets.
    
3.  Scope user access to an an application.
    
    1.  Assign application-based SBAC to a User Group.
        
    2.  Add users to the User Group.
        
4.  **Resulting visibility**: Users see only the applications and related assets they are authorized to manage, based on the applied application scope.
    

#### Manage user access

Configure user scopes in Cortex Cloud by navigating to Settings → Configurations → Access Management. You must possess the necessary View/Edit RBAC permissions for Access Management. These permissions are granted by default to the Account Admin and Instance Administrator roles.

#### Enable SBAC in the Cortex Cloud tenant
Before configuring Application scope, SBAC must be enabled at the tenant level.

**Prerequisite:**

**RBAC permissions**: To configure user scopes you must have Administrator or **View/Edit** RBAC permissions for Access Management (under Configurations).

-   Navigate to Settings → Configurations → General → Server Settings → Enable Scope Based Access Control.
    

**Note:**

**Exclusions** (roles not governed by SBAC): Certain roles cannot have SBAC applied. For these roles, access and permissions are managed through Role-Based Access Control (RBAC). You must manually ensure that these roles have all necessary base permissions (for example **Edit/View permissions to assets**), because SBAC is bypassed and does not impose its usual restrictions. As a result, functional access for these roles is determined solely by their RBAC configuration.

#### Create an application-based Asset Group
Create an application-based Asset Group if no appropriate group exists or if the application’s permissions must be isolated from existing groups.

1.  Navigate to Inventory → Groups → \+ Add Group.
    
2.  On the Create New Assets Group page.
    
    1.  Provide a Group Name (required) and Description (optional).
        
    2.  Enable the Use only the fields supported by scoping in Access Management configuration.
        
    3.  Select Filter panel → Business Application Names → choose an application.
        
    4.  Click Create Dynamic Group.
        
        The Asset Group is scoped to applications.
        
    
    **Note:**
    
    You cannot create SBAC based on static groups.
    
    For more information about Asset Groups, refer to Asset Groups.

#### Scope user access to an application
Scoping user access by application ensures that permissions are applied consistently across all related assets. Users receive access through their membership in application-scoped User Groups.

##### Assign application-based SBAC to a User Group

Define a User Group with SBAC permissions by setting its scope to include assets in Asset Groups that have application properties configured.

1.  Navigate to Settings → Configurations → User Groups (under Access Management).
    
2.  Right-click on a group in the table → Edit Group → select the Scope tab.
    
3.  Define the application scope:
    
    1.  **Scope assets**: Select Assets → Select asset groups → select an Asset Group associated with applications.
        
    2.  **Scope cases and issues**: Select Cases and Issues → All cases and issues.
        
4.  Click Save.
    

**Note:**

For more information about User Groups, refer to User group management.

##### Add users to the application-scoped User Group

Add users to the User Group so they inherit the application-specific permissions and access to all related child resources, such as repositories.

1.  Select Settings → Configurations → Users (under Access Management).
    
2.  Right-click the relevant user → select Edit User Permissions.
    
3.  Select the Scope tab.
    
4.  Scope assets: Select the chevron icon (>) in the Assets field → Select Asset groups → select the user group scoped to the application (see above).
    
5.  Scope cases and issues: Select the chevron icon (>) in the Cases and Issues field → Select All Cases and issues.
    
6.  Click Save.

#### Create application-scoped policies
The process for creating an Cortex Cloud Application Security application-scoped policy is the same as for a standard policy. The only difference is on the Scope step of the wizard, where you can restrict the policy to a specific application(s) and their associated assets. If your user access is application-scoped, you can create policies only within your assigned scope. All other steps remain unchanged.

**Note:**

Application-scoped policies apply to both code and CI/CD configuration policies.

1.  Navigate to Modules → Application Security → AppSec Polices (under Policy Management) → Add Policy.
    
2.  Configure the General and Conditions steps of the wizard.
    
3.  On the Scope step of the wizard.
    
    1.  Select Asset Types as the scope.
        
    2.  Select Add Filter → Business Application Names → enter the required application name.
        
    3.  Click Next.
        
4.  Complete the remaining steps in the wizard to create the policy.
    
    The policy is displayed in the general AppSec Policies table, which reflects your application scope, displaying only the policies associated with applications you can access. Users with broader permissions can filter by Business Application Names to find application-scoped policies.
    

For more information about creating Cortex Cloud Application Security policies, refer to Create Cortex Cloud Application Security policies.

## Repositories as assets
The Repository asset inventory provides comprehensive visibility of all your repositories integrated with Cortex Cloud Application Security, providing detailed information and insights into repository artifacts, configurations, and dependencies. You can directly access issues, and findings related to repository assets from the Repository assets page, allowing you to prioritize and remediate them without having to navigate to a separate remediation section.

### Explore repository assets
To access repository assets, under Inventory, select All Assets → Repositories (under Code).

The Repositories assets page includes a dashboard and an inventory.

#### Repository dashboard

The dashboard includes two widgets:

-   Providers: Displays connected version control providers (such as GitHub and GitLab) and the number of repositories found in each provider
    
-   Privacy State: Shows the distribution between public and private repositories and the amount of repositories in each category
    

Selecting an item in either widget filters the table accordingly.

#### Repository asset inventory

The following table describes selected Repository properties of the inventory table.

| Property | Description |
| --- | --- |
| Repository Name | The name of the repository in the version control system (VCS). |
| Repository Provider | The VCS platform hosting the repository, such as GitHub, GitLab, or Bitbucket |
| Repository Organization | The organizational structure (such as project, team, platform) that contains and manages the repository |
| Repository labels | Labels associated with the repository |
| Application Ids | The identifier of the application to which the repository belongs, indicating it is part of the application's assets. |
| First observed | The date the repository was initially detected in a scan |
| Observation time | The date the repository was last updated |
| Scanned Branches | The branch of the repository that is scanned (default: main/master) |

### In-depth repository asset information
Click an asset in the inventory table to open its side card, providing in-depth information organized into several tabs. The Overview tab (default display) offers highlights and a general summary. Additional contextual tabs provide specific details, including a Code to Cloud tab (providing context on the asset's path to production), an Applications tab (displaying the applications associated with this asset), and tabs focusing on specific issue types detected within the asset, such as Secrets and Vulnerabilities.

**Repository asset summary**

The repository asset summary, displayed at the top of the card, provides concise details about the repository, including the organization and repository and the version control system to which it belongs.

Overview

The Overview tab summarizes repository highlights, properties and scan information.

**Highlights** provide key security and operational insights related to the repository:

-   Critical/ High issues: An aggregation of critical and high issues discovered within the repository assets across all scan types (IaC, Secrets, SCA) as well as ingested third party SAST findings. Selecting this field redirects to the main issues table, filtered by the repository and its critical and high issues
    
-   Deployed: Whether the repository is deployed
    
-   Public: Whether the repository is public
    
-   **Risk summary**: The amount of cases, issues and findings associated with the repository, including their severity. Selecting cases or issues redirects to their respective main pages, automatically filtered by the repository, where you can view more detailed information
    
    For more information about issues and findings, refer to Cortex Cloud Application Security code scannersCortex Cloud Application Security code scanners
    
-   **Visibility timeline**: When the repository issues were first and last detected
    

**Properties**:

-   Asset details, including the Asset Id, Asset Category, Asset Group and Account ID associated with the repository
    
-   Repository details: Provides information about the repository. This includes the provider (such as a version control system hosting the repository, for example as GitHub), the scanned branch, the programming languages or technologies used within the repository (such as Terraform), its visibility configuration (public or private), whether it's exposed to the internet, archived, the timestamp of the last commit, and a list of owners
    

**Scan information**

A list of scans conducted on the repository. Details include the scan type (Periodic, CI, PR), the specific branch of the package that was scanned, the timestamp of the last scan, the health status of the scan (Completed, Failed, Partially, In progress), and the PR/CI status of the scan (Passed, Failed).

For more information about scan management, refer to Overview.

The Highlights section and other asset properties only display attributes when their corresponding indicators are present. For example, if an asset is not deployed, its deployment-related attributes will not show up; similarly, if there are no detected issues, those highlights or properties will not appear.

Code to Cloud

The Code to Cloud tab describes the integrated flow of a selected Infrastructure as Code (IaC) asset, from development to its deployed state. The graph visualizes the path to production, showing the IaC resource's journey from the repository node where it's hosted, through the CI/CD system, and finally to the traced runtime resource it provisions.

For more information on Cortex Cloud Code to Cloud, refer to Code to Cloud.

Applications

The Applications tab provides an overview of the applications associated with the repository, including a graphical representation of their path to production, which incorporates the repository role within the workflow.

For more information about applications, refer to Applications.

Vulnerabilities

The Vulnerabilities tab provides a list of vulnerabilities identified within the repository in your environment. Each vulnerability includes details regarding its severity level, associated CVE identifier, CVSS score, initial detection date, and assigned team member or group responsible for remediation.

The table includes the following default properties. Click on the Table Settings Menu for additional properties.

-   Severity: The vulnerability severity level
    
-   Issue Name: The CVE identifier
    
-   Asset Name: The asset in which the vulnerability was detected. Selecting this attribute displays the asset side card without having to navigate away from the Repository page
    
-   Branch: The branch in which the vulnerability was detected
    
-   CVSS Score: The Common Vulnerability Scoring System score that quantifies the severity of the vulnerability
    
-   Assigned To: The person or team responsible for addressing the vulnerability
    
-   Dependency Type: Indicates whether the dependency is direct (explicitly declared in your project) or transitive (pulled in by one of your other dependencies)
    
-   Backlog Status: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability)
    
-   Creation Date: The date when the vulnerability was detected
    

For more information about SCA vulnerabilities, Software Composition Analysis (SCA) vulnerability issues

IaC Configurations

The IaC Configurations tab displays an inventory of IaC misconfiguration across all repository assets.

The table includes the following default properties. Click on the Table Settings Menu for additional properties.

-   Severity level: Indicates the level of severity of the IaC misconfiguration
    
-   Issue Name: The IaC misconfiguration identifier
    
-   Asset Name: The name of the IaC resource in which the misconfiguration occurred. Selecting this attribute displays the asset side card without having to navigate away from the Repository page
    
-   Branch: The branch in which the IaC misconfiguration was detected
    
-   Assigned To: The person or team responsible for addressing the issue
    
-   Creation Date: The date when the issue was detected
    

For more information about IaC misconfiguration, refer to Infrastructure as Code (IaC) misconfiguration scanner.

CI/CD Configuration

The CI/CD Configuration tab includes a table with the following exposed properties, listing CI/CD Risks. Click on the Table Settings Menu for additional properties.

-   Severity level: Indicates the level of severity of the risk
    
-   Name: The risk identifier
    
-   Asset Name: The asset in which the risk was detected
    
-   Description: A description of the risk
    
-   Asset Category: The asset category associated with the risk
    

Secrets

The Secrets tab displays an inventory of Secrets detected within the repository.

The table includes the following exposed properties. Click on the Table Settings Menu for additional properties.

-   Severity level: Indicates the level of severity of the exposed Secrets
    
-   Issue Name: The Secrets identifier
    
-   Branch: The branch in which the secret was detected
    
-   Assigned To: The person or team responsible for addressing the Secrets
    
-   Backlog Status: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability)
    
-   Creation Date: The date when the Secrets were initially detected
    

For more information about Secrets, refer to Secrets scanners.

Package Integrity

The Package Inventory tab provides details about the popularity and maintenance of packages identified within the repository. It also includes an inventory of package operational risk issues and license issues, offering a comprehensive view of the package's overall health and compliance.

The License Issue table includes the following properties. Click on the Table Settings Menu for additional properties.

-   **Severity** level: Indicates the level of severity of the package license miscompliance
    
-   Issue Name: The package license miscompliance identifier
    
-   License Name: The name of the license associated with the package. This indicates the specific license agreement that is potentially being violated
    
-   Asset Name: The name of the asset that uses the package with the license miscompliance. This identifies where the license issue occurs
    
-   Branch: The branch of the codebase where the asset with the license issue is located
    

The Operational Risk Issues table includes the following properties. Click on the Table Settings Menu for additional properties.

-   Severity: Indicates the level of severity of the package operational risk
    
-   Issue Name: The package operational risk identifier
    
-   Asset Name: The name of the asset that uses the package with the package operational risk
    
-   Branch: The branch of the codebase where the asset with the package operational risk is located
    
-   Assigned To: The person or team responsible for addressing the package operational risk
    
-   Creation Date: The date when the package operational risk was initially detected
    

For more information on Package Operational Risks, refer to Package Integrity.

Code Weaknesses

The Code Weaknesses tab provides an inventory of ingested SAST (Static Application Security Testing) CWEs (Common Weakness Enumerations) identified within the repository. Each CWE is listed with its corresponding severity level, allowing you to prioritize remediation efforts based on the potential impact on the repository's security posture.

The CWE table includes the following properties. Click on the Table Settings Menu for additional properties.

-   Severity level: Indicates the level of severity of the CWE issue
    
-   Name: The CWE identifier
    
-   Branch: The branch of the codebase where the asset with the code weakness is located
    
-   Backlog Status: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability)
    
-   Assigned To: The person or team responsible for addressing the CWE issue
    
-   Creation Date: The date when the CWE issue was detected
    

For more information about about third party code weaknesses, refer to Manage code weaknesses.

### Manage Repository assets
You can perform these actions on repository assets.

Right-click on a row in the inventory table to take the following actions:

-   Open in new tab: Opens the asset description card in a new tab
    
-   View asset data: Display asset data. Formats: JSON, Tree View
    
-   Copy text to clipboard: Duplicate selected text for easy pasting elsewhere
    
-   Copy entire row: Duplicate the entire row of data for easy pasting elsewhere
    
-   Show/hide rows with [Asset_Name]: Show/hide rows matching the [asset name] of the selected row
    

-   Open in Cortex Assistant/Open in Cortex Agentic Assistant: Displays the repository asset in Cortex Assistant or Cortex Agentic Assistant.
    
-   Ingest Sarif: Allows you to upload a file to ingest third party Sarif data

### Export Software Bill of Materials (SBOM)
You can generate and export a Software Bill of Materials (SBOM) for a specific repository to gain a comprehensive inventory of its software components and their dependencies. To create a SBOM:

1.  Select a repository from the Repository asset inventory.
    
2.  Click more options (represented by three dots).
    
3.  Configure the following settings from the Export SBOM dialog box:
    
    1.  Level: Level of data: Select the scope of data to include in the SBOM: Options: Repository, Organization (downloads the SBOM for the entire VCS organization associated with the repository)
        
    2.  Format: Output format: Select the output format for the SBOM. Options:
        
        -   `CycloneDX` v1.4: XML or JSON
            
        -   `CycloneDX` v1.5: XML or JSON
            
        -   `CycloneDX` v1.6: XML or JSON
            
        -   `SDPX` v2.3: JSON

### Manage issues detected in repositories
The **Repositories** assets inventory provides an overview of the security issues identified by various scanners that analyze the repository's code and configuration. This includes the number and severity of issues detected in each repository.

You can remediate these issues directly from the asset inventory:

1.  Select a repository from the inventory table.
    
    A card is displayed with expanded repository details, including these types of issues detected during repository scans organized by tab according to category. Refer to In-depth repository asset information for more details about available issue categories in repository assets.
    
2.  Click on a tab including an issue.
    
    A list of issues for the selected type is displayed.
    
3.  Select an issue from the list.
    
    A card with detailed issue information, including remediation options, is displayed.
    
4.  Remediate the issue:
    
    -   For Secrets exposure, refer to Secrets issues
        
    -   For IaC misconfiguration, refer to IaC misconfiguration issues
        
    -   SCA vulnerabilities:
        
        -   For CVE vulnerabilities, refer to Software Composition Analysis (SCA) vulnerability issues
            
        -   For package operational risks, refer to Package integrity issuesPackage integrity issues
            
        -   For package integrity (license miscompliance), refer to License miscompliance issues
            
        
    -   For SAST CWE weaknesses, refer to SAST code weaknesses (CWEs)SAST code weaknesses (CWEs)
        
    

**Note:**

You can also find the repository issues in the general issue inventory table, and in the dedicated inventory of issues for each scanner type (_see step 4 above for details_).

## Coverage
In Application Security Posture Management (ASPM), Coverage provides a comprehensive overview of your security posture across the SDLC (code, build, deploy). It offers visibility into scanned and unscanned assets, active scanners, and implemented guardrails, enabling you to identify and address security gaps for continuous protection.

### Use cases

-   **Data source coverage**: Identify onboarded and partially onboarded version control systems (VCS) and third-party integrations, ensuring all relevant data is available for analysis
    
-   **Scanner coverage**: Determine which Static Application Security Testing (SAST) (sourced solely from third-party ingestion), Software Composition Analysis (SCA), Secrets, Infrastructure as Code (IaC), CI/CD misconfiguration and security posture management (SPM), and malware (image scans) are actively scanning your codebase and build
    
-   **Guardrail coverage**: Understand which security policies and guardrails are applied at each stage, and assess their effectiveness
    
-   **Stage-specific maturity**: Evaluate the coverage and maturity of your security posture at each stage of the SDLC, enabling targeted improvements
    
-   **Application-specific coverage**: Gain a granular view of your application's security coverage, including data sources, scanners, and policies applied at each stage
    
-   **Global and application scores**: Understand the global and application-specific security coverage scores, reflecting the overall maturity of your security posture

### Coverage in the user interface
To access Coverage, navigate to Modules, → Application Security → AppSec Coverage.

This interface offers a comprehensive overview of your application security coverage, presenting key metrics and visualizations related to application data sources, scanners, and guardrails. Interactive widgets provide a summary of your coverage. When you apply a filter through a widget, all data displayed on the dashboard, including the asset inventory, will dynamically reflect the selected filter criteria. The asset inventory provides detailed information about application assets in your SDLC for in-depth analysis of your security posture. You can also see all issues for specific assets by selecting them in the inventory table.

#### Application-specific coverage

You can focus on the security posture of your critical business applications, allowing you to prioritize remediation efforts for your most important assets. To view application-specific data, select Add Filters → Applications → enter the unique application name as provided when creating it.

#### Coverage by data source

This widget provides metrics based on the coverage of the data source such as version control systems (GitHub and so on), CI tools (Jenkins and so on), Repositories (JFrog) and third party data sources (such as Veracode). In addition, insights are provided, such as the amount of assets added recently or whether a data source is not connected.

#### Coverage by status

This widget provides coverage metrics based on the percentage of scanned repositories out of the total amount of repositories. Values: scanned, partially scanned, unscanned.

#### Coverage by scanner type

This widget provides metrics based on the coverage of the scan types, including code scanners (vulnerabilities, code weaknesses, secrets, IaC misconfigurations) and images (malware).

#### Asset coverage inventory table

The asset coverage inventory table displays a list of assets. Table properties include:

| Property | Description |
| --- | --- |
| Asset Type | The type of asset scanned, such as repositories or container image repositories |
| Name | The name of the scanned asset |
| Applications | The type of applications associated with the asset |
| Scanners Data | Informations about the scanners that were applied to the asset. Upon hovering on the scanner, additional data the type of scanner and its status; enabled or disabled |
| Last scan status | The status of the last scan: Completed, not scanned yet, in progress and error |

## Urgency
Prioritize issues by Urgency, a context-aware metric to help you focus remediation efforts on the issues that pose the greatest real-world risk in your code. Unlike **Severity**, which is a static measure of an issue's technical risk, Urgency dynamically evaluates risk based on deployment context.

The Urgency enrichment highlights risks based on specific, high-impact factors:

-   **Deployment status**: Identifies issues actively deployed in production
    
-   **Runtime exposure**: Indicates deployed assets that are in use, exposed to the internet, or can be exploited to leverage privileged capabilities in case of an attack
    
-   **Data impact**: Flags deployed assets that can access sensitive data
    
-   **Business criticality**: Prioritizes issues impacting your most critical business assets
    

### How Urgency is calculated

Urgency is calculated as a dynamic risk score derived from **Probability** (likelihood of exploitation) and **Impact** (potential damage). It leverages multiple sources of data across your code-to-cloud environment:

-   **Applications**: Data from applications created in Cortex Cloud
    
-   **Runtime**: Data from deployed and running assets
    
-   **Code**: Findings from native Cortex Cloud Application Security scanners and ingested third party sources
    
-   **Risk metadata**: External threat context aggregated from third-party sources
    
-   **Asset metadata**: Contextual information associated with the asset where the finding was detected, including any enrichments. For example, a vulnerability is a finding on a software package, and its enrichment could include related repository data
    

For a detailed breakdown of the parameters defined by each scanner type, see Urgency metrics

### Urgency levels

-   Top Urgent: Requires immediate mitigation
    
-   Urgent: Mitigate as soon as possible
    
-   Not Urgent: Requires attention, but can be addressed within your organization SLA (Service Level Agreement)
    
-   Not Applicable: Includes two options:
    
    -   For periodic scans: Urgency has not yet been calculated and will be calculated in the next periodic scan
        
    -   Not calculated for PR (Pull Request) or CI (Continuous Integration) scans
        
    

### How Urgency appears in the tenant

**Persona and permissions**: This feature is designed for AppSec Admins, DevOps or Developer persona, and requires the View role under RBAC.

In Cortex Cloud Application Security, Urgency is applied to issues detected from CVE Vulnerabilities, Secrets, IaC Misconfigurations, and Code Weaknesses periodic scanners. It is displayed in the tenant as follows:

-   **Issue Inventory**: An Urgency column displays the urgency score assigned to the issue. You can filter by this column to focus on the most critical issues
    
-   **Issue side-card**: The Overview tab of an issue side panel displays a Urgency Details section, listing all the code-to-cloud data sources used to calculate the Urgency score. A code-to-cloud graph displays where the Urgency context was detected across your software development lifecycle
    

For more information on Urgency by type of scanner issue, refer to:

-   CVE vulnerabilities: Detailed vulnerability issue informationDetailed vulnerability issue information
    
-   Secrets: Detailed Secrets issue informationDetailed Secrets issue information
    
-   IaC misconfiguration: Detailed IaC misconfiguration issue informationDetailed IaC misconfiguration issue information
    
-   Code weaknesses: Detailed code weakness issue informationDetailed code weakness issue information

### Urgency metrics
The following table outlines Urgency metrics by scanner, detailing each metric's description, values, and evidence.

| **Scanner type** | **Metric** | **Description** | **Values** | **Evidence** |
| --- | --- | --- | --- | --- |
| **Vulnerabilities** | Application Business Criticality | The highest criticality level among all applications linked to an issue’s affected assets. If no application is attached, the value is `None`. Link the affected asset to its relevant application to ensure the urgency is calculated correctly | Critical, High, Medium, Low, Info, None + Name | The Application Name + ID (only one) |
| Access Sensitive Data | At least one deployed asset affected by this issue has access to sensitive data | True, False + Finding ID | Finding ID (only one) | | Leverage Privileged Capabilities | At least one deployed asset affected by this issue has the ability to leverage privileged capabilities. In the next version, we’ll provide permission-level details | True, False + Finding ID | Finding ID (only one) |
| Used in Image | Indicates whether the vulnerable package present in the code is also included in the built image | True, False | — | | Is Deployed | At least one deployed asset is affected by this issue | True, False | — |
| Internet Exposed | At least one affected deployed asset is accessible from the internet, increasing the likelihood of exploitation | True, False | — | | Loaded into Memory | The vulnerable package is actively loaded into memory in at least one deployed asset | True, False, Unknown | — |
| Runtime Agent Protection | Percentage of affected deployed assets with runtime protection enabled. Only active agents are counted. Effective if ≥80% of deployed assets are protected | 0–100% | — | | EPSS Score | Estimated probability that this CVE will be exploited within the next 30 days | 0–100% | — |
| CISA KEV | Indicates whether this CVE is listed in CISA’s Known Exploited Vulnerabilities catalog | True, False | — | | CVSS Score | Industry-standard severity score for vulnerabilities (Common Vulnerability Scoring System) | 0–10 | — |
| Exploit Maturity | Level of confidence in the existence of a known exploit | POC, Active, None | — | | Exploit Availability | Indicates whether an exploit is available to attackers | Public, Private | — |
| Package Operational Risk | Risk level based on low maintenance, limited popularity, or outdated support | High, Medium, Low | — | | Fixable | Indicates whether a known fix is available for this CVE | True, False | — |
| **Secrets** | Application Business Criticality | The highest criticality level among all applications linked to an issue’s affected assets. If no application is attached, the value is `None`. Link the affected asset to its relevant application to ensure urgency is calculated correctly | Critical, High, Medium, Low, Info, None + Name | The Application Name + ID (only one) |
| Access Sensitive Data | Indicates whether the secret provides access to sensitive data | True, False + Finding ID | Finding ID (only one) | | Leverage Privileged Capabilities | Indicates whether the secret can be used to perform privileged operations | True, False + Finding ID | Finding ID (only one) |
| Visibility | Indicates whether the code repository where the secret was found is public | Private, Public | — | | Validation | Indicates whether the exposed secret is valid and whether it has high privileges | Privileged, Valid, Invalid, Unavailable | — |
| Found in History | Indicates whether the secret was found in the version history of the repository | True, False | — |
| **IaC Misconfigurations** | Application Business Criticality | The highest criticality level among all applications linked to an issue’s affected assets. If no application is attached, the value is `None`. Link the affected asset to its relevant application to ensure urgency is calculated correctly | Critical, High, Medium, Low, Info, None + Name | The Application Name + ID (only one) |
| Access Sensitive Data | At least one deployed asset affected by this issue has access to sensitive data | True, False + Finding ID | Finding ID (only one) | | Leverage Privileged Capabilities | At least one deployed asset affected by this issue has the ability to leverage privileged capabilities. In the next version, we’ll provide permission-level details | True, False + Finding ID | Finding ID (only one) |
| \# Affected Assets | The number of deployed cloud assets affected by this issue | Number | — | | Severity | The issue's inherent severity (static rating, not including any user-applied override) | Critical, High, Medium, Low, Info, None + Name | — |
| Internet Exposed | At least one affected deployed asset is accessible from the internet, increasing the likelihood of exploitation | True, False | — | | Is Deployed | At least one deployed asset is affected by this issue | True, False | — |
| **Code Weaknesses** | Application Business Criticality | The highest criticality level among all applications linked to an issue’s affected assets. If no application is attached, the value is `None`. Link the affected asset to its relevant application to ensure urgency is calculated correctly | Critical, High, Medium, Low, Info, None + Name | The Application Name + ID (only one) |
| Access Sensitive Data | At least one deployed asset affected by this issue has access to sensitive data | True, False + Finding ID | Finding ID (only one) | | Leverage Privileged Capabilities | At least one deployed asset affected by this issue has the ability to leverage privileged capabilities. In the next version, we’ll provide permission-level details | True, False + Finding ID | Finding ID (only one) |
| Is Deployed | At least one deployed asset is affected by this issue | True, False | Asset ID (only one) | | Severity | The issue's inherent severity (static rating, not including any user-applied override) | Critical, High, Medium, Low, Info, None | — |
| Internet Exposed | At least one affected deployed asset is accessible from the internet, increasing the likelihood of exploitation | True, False | — | | Runtime Agent Protection | Percentage of affected deployed assets with runtime protection enabled. Only active agents are counted. Effective if ≥80% of deployed assets are protected | 0–100% | — |
| CWE Top 25 | Indicates whether the issue maps to one of the CWE Top 25 Most Dangerous Software Weaknesses | True, False | — | | OWASP Top 10 | Indicates whether the issue maps to one of the OWASP Top 10 Web Application Security Risks | True, False | — |

## Backlog baseline

Backlog represents pre-existing code issues discovered by a scanner's first run or by new rules.

In managing application security, it's crucial to distinguish between backlog issues and new issues. Backlog issues represent the security technical debt- vulnerabilities that existed in a code repository or branch before a security scanner's initial run, or were uncovered by new scanner capabilities or rules. This collection defines a historical **backlog point** for a codebase. New issues are fresh vulnerabilities introduced into the codebase, typically through recent changes such as pull requests. This classification allows you to implement tailored security policies and prioritize remediation efforts more effectively.

### Backlog use cases
-   **Gain granular visibility into security technical debt**: AppSec Admins need a clear, detailed picture of their security technical debt. This means being able to see the number of issues classified as **backlog** and **new** per repository and branch within an Cortex Cloud Application Security dashboard. This granular view allows managers to understand the full scope of their technical debt and identify areas where new vulnerabilities are still being introduced (bleeding)
    
-   **Monitor and optimize security program performance**: To effectively manage security initiatives, AppSec Admins require a way to track the trend of **backlog** and **new** issues over time, both in total and broken down by each scanner (IaC, Secret, Vulnerability, SAST). Displaying this trend data in a dashboard widget helps you understand the pace of issue resolution across teams and pinpoint areas that may require escalation or additional resources
    
-   **Streamline prioritization and remediation by scanner**: Cortex Cloud Application Security practitioners, development managers, and business owners need to efficiently prioritize and act on security findings. This is achieved by seeing, for each scanner, which issues are classified as **backlog** and **new**. This scanner-specific view allows for targeted remediation efforts, ensuring teams can focus on the most relevant and impactful issues based on their origin and status. This also includes the ability to integrate scanner-specific issue counts into broader dashboards like **DevChamp** and **DevSecOps** for cross-functional awareness
    
-   **Implement differentiated security policies**: To ensure the system accurately reflects an organization's specific context, it must allow for customizable issue classification. This includes defining a historical cutoff date for when issues in existing repositories are considered **backlog** and **new**, and setting parameters such as treating new vulnerabilities discovered on existing Software Bill of Materials (SBOMs) as **new** issues. This flexibility ensures the backlog/new distinction is meaningful and actionable for all stakeholders.

### Issue/Finding classification by scanner
This table details how security issues and findings are classified as either Backlog or New based on their originating scanner and specific detection scenarios

| Scanner | Backlog | New Issue | Comment |
| --- | --- | --- | --- |
| IaC | The first time an IaC detection rule ran against the code repository | Issues added through pull requests that are created by a detection rule which previously ran against this repository | If a new AppSec rule runs against the code repository, the detected issue is considered a Backlog issue |
| Secrets | The first time a secret was detected on the code repository with a specific signature (out-of-the-box or customer-created) | A secret that was added in a pull request | If a new signature is added/changed in the secret signature engine (by the vendor or by the user), its first run will be considered a Backlog issue |
| SCA Vulnerabilities | The first time the SCA scanner created an SBOM of the code repository and identified vulnerabilities | A vulnerability found in a pull request on a new or updated package | If there is a new vulnerability on an existing package version, it is considered a Backlog issue; If you set the global parameter issues on existing SBOM are considered new, it will be considered a new issue |
| SAST | The first time the SAST scanner sends results on this code repository and file | A SAST finding that was found on a pull request | This classification also applies if you import a SARIF file for a repository. \*\*Note:\*\* In some cases/vendors, this is not accurate as findings are deleted every time new findings are uploaded. In such cases, the feature may not be accurate or supported; For SAST, the vendor does not support policy in pull requests |

**Note:**

**Scanner updates and new detections**: When a security scanner is updated to support new languages, detection rules, or capabilities, any issues discovered by these new features for existing code are classified as part of the backlog.

### Using Backlog
You can leverage the Backlog and New issue classifications across the platform as follows.

-   **Role-Based Access Control (RBAC) / Standard-Based Access Control (SBAC)**: Access and permissions will be managed systematically:
    
    -   By default, only AppSec Admins have permission to configure the issues on existing SBOM are considered new setting
        
    -   Permissions for all other capabilities, such as viewing issues or applying policies, are defined by the existing RBAC/SBAC policies and the user's specific issue management capabilities
        
    
-   **Policies/Scope**: The system supports Backlog and New attributes for policies, allowing for differentiated enforcement. Refer to Create Cortex Cloud Application Security policies for more informationCreate Cortex Cloud Application Security policies
    
-   **Multi-Branch Support**: The Backlog/New classification is consistent across development workflows:
    
    -   The Backlog/New classification is maintained independently for every branch
        
    -   The system allows policies to be defined and applied for specific branches, enabling you to tailor security rules (for example, enforcing stricter policies for New critical issues on main branches, or allowing Backlog issues on development branches) based on their classification
        
    
-   You can filter the **Cortex Cloud Application Security dashboard** to display information according to the Backlog/New classification
    
-   **Issues and Findings**: The Backlog/New classification is standardized across data for both findings and issues under the Backlog Status field, which is found under the Overview tab of both findings and issues side cards. For example, refer to Secrets issuesSecrets issues
    
-   The **API** provides comprehensive access to classified issue data:
    
    -   You can retrieve all backlog issues, or filter them per scanner
        
    -   You can retrieve all new issues, or filter them per scanner
        
    -   You can retrieve new issues within the backlog, either all of them or filtered per scanner
        
    -   You can disable the issues on existing SBOM are considered new flag programmatically, provided you have the required permissions

## Service Lead Agreements (SLA)

Application Security SLA defines deadlines for fixing security issues based on severity, ensuring timely remediation and improving team performance.

Cortex Cloud Application Security SLA defines remediation timeframes for security issues based on their severity, ensuring timely fixes and improving team performance. It sets clear expectations for how quickly threats must be addressed and provides a measurable metric for tracking responsiveness, identifying bottlenecks, and strengthening overall security posture.

Cortex Cloud Application Security SLAs apply to issues detected during periodic code scans. Each severity level has an assigned remediation timeframe to support consistent issue management.

The default target remediation timeframes are:

-   Critical: 7 days
    
-   High: 14 days
    
-   Medium: 30 days
    
-   Low: 90 days
    

You can modify these values as required.

### SLA status and monitoring

SLA status provides immediate risk context for prioritization of issues. The system automatically calculates and updates each issue’s SLA status based on periodic scans and the configured timeframes.

There are three SLA status values:

-   On Track: The issue is within its assigned remediation timeframe
    
-   Approaching: The issue's SLA will be breached in a configurable number of days (the Approaching threshold). This status alerts you before an issue becomes overdue
    
-   Overdue: The issue has breached its SLA
    

### Roles and responsibilities

-   **AppSec practitioners**:
    
    -   Define and configure the SLA targets for each severity level
        
    -   Track the SLA status for all Cortex Cloud Application Security issues across the organization
        
    -   Generate reports and dashboards to measure team performance and identify trends
        
    
-   **Developers** / **DevSecOps**:
    
    -   Be aware of and adhere to the SLA commitments for all assigned issues
        
    -   Actively monitor and prioritize issues that are nearing or have exceeded their SLA
        
    

### Use cases and features

-   **For AppSec practitioners**:
    
    -   **Overdue dashboard**: Get a clear overview of all Approaching and Overdue issues. This allows you to quickly identify problematic areas and contact the relevant teams
        
    -   **Centralized SLA tracking**: The SLA status for each issue is displayed directly in the Cortex Cloud Application Security issues tables
        
    -   **Categorized overdue issues**: Filter overdue issues by domain (such as SAST, SCA, IaC, Secrets) to understand which areas require additional attention
        
    -   **Detailed issue information**: A side panel on each issue provides a comprehensive view of its SLA details, including the configured time and how many days have passed, helping you understand its priority
        
    
-   **For developers** :
    
    -   **SLA visibility**: See the specific SLA you need to follow for each issue, ensuring you are always aware of your commitments
        
    -   **Overdue issues**: Easily identify and filter issues that are past their SLA, so you can prioritize and fix them immediately
        
    -   **Upcoming overdue issues**: Anticipate and prepare for issues that will become overdue in a configurable number of days, allowing you to take preventative action

### Configure and monitor Cortex Cloud Application Security SLAs
These procedures defining remediation timeframes and the methods available for monitoring issue compliance against the defined SLAs.

#### Configure SLA Remediation Targets

Define remediation timeframes to track issue compliance with the configured SLAs. The system automatically calculates and updates each issue’s SLA status during periodic scans based on these timeframes.

1.  Navigate to Settings → Configurations → Application Configuration (under Application Security).
    
2.  Define the target SLA for each severity level: assigning a value in days → Save.
    
    Default values:
    
    -   Critical: 7 days
        
    -   High: 14 days
        
    -   Medium: 30 days
        
    -   Low: 90 days
        
    
3.  Set the approaching SLA threshold: Specify the number of days → Save.
    
    This threshold enables proactive remediation and minimizes the risk of issues becoming Overdue.
    

#### Monitor SLA status

SLA status provides immediate risk context for prioritization. Status tracking is integrated across the Cortex Cloud Application Security Command Center dashboard, the Issues tables, and their side panels.

-   **Cortex Cloud Application Security Dashboard**:
    
    Displays a widget showing the number of Critical and High severity issues that are Overdue or Approaching SLA. The widget breaks down SLA status by scanner (for example, Secrets or IaC). Selecting a scanner opens the relevant issues page, filtered by scanner, severity, and SLA status.
    
    You can access the Cortex Cloud Application Security dashboard from the the Application Security dashboard.
    
-   **Issues table**:
    
    The SLA status is integrated directly into the issues table, to provide context and help you track each issue.
    
    To view SLA under Issues tables, under **Modules** select Application Security → [type of issue such as Secrets. If SLA is not displayed by default, select it from the Table Settings Menu.
    
    **SLA values**:
    
    -   On Track: The issue is within its assigned remediation timeframe
        
    -   Approaching: The issue's SLA will be breached in a configurable number of days (the Approaching threshold). This status alerts you before an issue becomes overdue
        
    -   Overdue: The issue has breached its SLA
        
    
    Hovering over an issue's SLA status will show a tooltip with additional details.
    
-   **SLA in an issue side panel**:
    
    Clicking on any individual issue opens a side panel. The Overview tab displays the current SLA status of the issue (such as Overdue). Hovering over this status provides additional details, including the issue severity, the total time allotted for remediation, and a countdown of the time remaining until the SLA is breached or since it was breached.

## Compliance for Cortex Cloud Application Security
Cortex Cloud Application Security integrates compliance controls directly into your development ecosystem, enabling a shift-left approach to regulatory adherence. The framework maps **Infrastructure as Code (IaC) misconfigurations** and **CI/CD security risk** findings to supported industry standards.

The compliance framework automatically maps IaC misconfiguration rules (such as unencrypted storage or open security groups) and CI/CD security risks (such as insecure runner configurations or lack of branch protection) to supported industry standards. This enables targeted reporting and granular filtering by specific controls, such as CIS Benchmarks or OWASP requirements.

By configuring automated policies to alert developers or block builds when violations occur, you ensure that neither vulnerable infrastructure nor insecure delivery pipelines reach production.

### Monitor and track compliance adherence

Monitor and track compliance adherence for your infrastructure code and CI/CD pipeline assets by checking whether your templates and configurations adhere to industry standards or your organization's best practices.

To view compliance-related details, navigate to Posture Management → Compliance.

For more information about managing compliance in Cortex Cloud, including assessments and reports, refer to Monitor and track compliance adherence.

### Infrastructure-as-Code (IaC) compliance
IaC compliance focuses on the security posture of your cloud resource definitions (Terraform, CloudFormation) before deployment. By analyzing templates, Cortex Cloud identifies misconfigurations that violate specific regulatory frameworks.

#### Supported IaC compliance standards

The IaC scanner maps findings to the following compliance standards and frameworks:

Industry standards

-   **PCI DSS (Payment Card Industry Data Security Standard)**
    
    -   PCI DSS v3.2.1 - Payment card data protection requirements
        
    -   PCI DSS v4.0 - Latest PCI DSS requirements
        
    -   PCI DSS v4.0.1 - Updated PCI DSS v4.0 requirements
        
    
-   **NIST (National Institute of Standards and Technology)**
    
    -   NIST 800-53 Rev4 - Security and privacy controls for federal information systems
        
    -   NIST 800-53 Rev 5 - Updated security and privacy controls
        
    -   NIST SP 800-171 Revision 2 - Protecting Controlled Unclassified Information
        
    -   NIST SP 800-171 Revision 3 - Latest CUI protection requirements
        
    -   NIST SP 800-172 - Enhanced security requirements for CUI
        
    -   NIST CSF - Cybersecurity Framework
        
    -   NIST CSF v2.0 - Updated Cybersecurity Framework
        
    
-   **ISO Standards**
    
    -   ISO 27001:2013 - Information security management systems
        
    -   ISO/IEC 27001:2022 - Latest information security management standard
        
    
-   **HIPAA (Health Insurance Portability and Accountability Act)**
    
    Security and privacy requirements for healthcare data
    
-   **GDPR (General Data Protection Regulation)**
    
    European Union data protection and privacy requirements
    
-   **SOX (Sarbanes-Oxley Act)**
    
    Financial reporting and corporate governance requirements
    
-   **CCPA (California Consumer Privacy Act)**
    
    California data privacy requirements
    

Cloud provider benchmarks

-   **CIS (Center for Internet Security) Benchmarks**
    
    -   **AWS:**
        
        -   CIS v1.2.0 (AWS)
            
        -   CIS AWS 3 Tier Web Architecture Benchmark v.1.0.0
            
        
    -   **Azure:**
        
        -   CIS v1.1 (Azure)
            
        -   CIS v1.2.0 (Azure)
            
        -   CIS v1.3.0 (Azure)
            
        -   CIS v1.3.1 (Azure)
            
        -   CIS v1.4.0 (Azure)
            
        -   CIS v1.5.0 (Azure) - Level 1
            
        -   CIS v2.0.0 (Azure) Level 1
            
        -   CIS v2.1 (Azure) Level 1
            
        -   CIS v2.1.0 (Azure) Level 1
            
        
    -   **GCP (Google Cloud Platform):**
        
        -   CIS v1.0.0 (GCP)
            
        -   CIS v1.1.0 (GCP)
            
        -   CIS v1.2.0 (GCP)
            
        -   CIS v1.3.0 (GCP)
            
        -   CIS v2.0.0 (GCP) Level 1
            
        -   CIS v3.0 (GCP) Level 1
            
        -   CIS v3.0.0 (GCP) Level 1
            
        -   CIS v4.0.0 (GCP) Level 1
            
        
    -   **GKE (Google Kubernetes Engine):**
        
        -   CIS v1.1.0 (GKE)
            
        -   CIS v1.2.0 (GKE)
            
        -   CIS v1.3.0 (GKE) - Level 1
            
        -   CIS v1.4.0 (GKE) - Level 1
            
        -   CIS v1.5.0 (GKE) - Level 1
            
        
    -   **OCI (Oracle Cloud Infrastructure):**
        
        -   CIS v1.2.0 (OCI)
            
        -   CIS v2.0.0 (OCI) - Level 2
            
        -   CIS v3.0.0 (OCI) - Level 2
            
        
    
-   **CIS Controls**
    
    -   CIS Controls v7.1 - Implementation groups for cybersecurity
        
    -   CIS Controls v8 - Updated cybersecurity controls
        
    -   CIS Controls v8.1 - Latest CIS Controls version
        
    

#### Rule mapping logic

To ensure consistency between build-time and run-time security, IaC compliance relies on a unified mapping logic.

IaC rules in Cortex Cloud are mapped to corresponding runtime CSPM (Cloud) or KSPM (Kubernetes) rules.

If an IaC rule is mapped to a runtime rule, it automatically inherits the compliance standards and controls associated with that runtime rule. This ensures that a violation detected in code (IaC) is categorized under the same compliance control as if it were detected in the cloud.

#### Scan types

IaC compliance scanning is available in the following scan types: 

-   Periodic scans: scheduled repository scans
    
-   PR scans: pull request validation
    
-   Branch scans: branch-specific scans
    
-   External project scans: third-party project analysis

### Manage IaC compliance
Manage IaC compliance assessments and reports directly in the tenant to generate and download audit-ready compliance evidence. You can view mapped rules, enforce compliance via policies, and filter issues by specific regulatory controls.

#### View IaC compliance rules mapped to compliance standards and controls

You can view and modify compliance standards mapped to specific IaC rules in AppSec Rules to control which rules are evaluated for compliance and ensure that findings are correctly attributed to the intended compliance framework.

1.  Navigate to Modules → Application Security → AppSec Rules.
    
2.  Filter the table by IaC -supported Compliance Standards OR Compliance Controls attributes.
    
    **Danger:**
    
    Add these properties to the IaC Rules table through the Table Settings Menu, as they are not exposed by default.
    

#### Create Cortex Cloud Application Security policies with IaC compliance conditions

Create policies to include or exclude findings based on specific IaC compliance standards and controls. This provides precise control over automated issue creation and build-blocking.

1.  Navigate to Modules → Application Security → AppSec Polices → Add Policy.
    
2.  Follow the standard procedure in the policy wizard. The configuration for all steps remains the same, except for the Conditions step.
    
3.  On the Conditions step of the wizard.
    
    1.  Apply a compliance filter: Select either Compliance Standard or Compliance Control as the attribute.
        
    2.  Select the required values for the standard or control.

### CI/CD Compliance

CI/CD compliance ensures adherence to industry standards: CIS GitLab/GitHub and OWASP Top 10.

Cortex Cloud enhances your CI/CD compliance posture by assessing pipeline asset adherence to industry standards and your organization's best practices. Cortex Cloud supports compliance checks against the CIS GitLab Benchmark v1.0.1, CIS GitHub Benchmark v1.0.0, and the OWASP Top 10 CI/CD Risks v2025.

To access Compliance, select Posture Management → Compliance → Reports or Assessment.

#### Create CI/CD compliance reports
The following steps describe the workflow for creating CI/CD compliance reports.

| Step | Description |
| --- | --- |
| Step 1. Create an Asset Group. | Create an Asset Group |
| Step 2. Create an Assessment Profile. | Create an Assessment Profile |
| Step 3. View reports. | View and access reports |

##### Create an Asset Group

Create an asset group to define a logical collection of your CI/CD assets (such as specific repositories or pipelines within a provider like GitHub). This step scopes your security assessments, ensuring that subsequent compliance checks and scans performed by an assessment profile are applied to the relevant resources.

1.  Navigate to Inventory → Groups → \+ Add Group.
    
2.  On the Create New Assets Group screen:
    
    1.  Provide a group name (required) and description.
        
    2.  From the Filter menu in the Assets table, select Provider → [Type of provider].
        
        **Note:**
        
        The CI/CD module supports GitHub and GitLab provider types.
        
    3.  Select Create Dynamic Group, or select assets from the list that is displayed, and click Create Static Group.
        
    
    **Note:**
    
    For more information about about Asset Groups, refer to Asset Groups.
    

##### Create an Assessment Profile

Create an assessment profile, which configures the specific security standards and initiates the scans against the assets defined in your asset group.

1.  Navigate to Posture Management → Compliance → Assessment Profiles → Create New Assessment.
    
2.  On the General step of the wizard.
    
    1.  Provide a profile name (required) and description (optional), and select Generate a scheduled report.
        
    2.  Specify the email recipients for the report.
        
    3.  Set the Evaluation frequency (required).
        
    4.  Click Next.
        
3.  On the Standards and Asset Group step of the wizard.
    
    1.  Select a standard.
        
        **Note:**
        
        CIS GitLab Benchmark, CIS GitHub Benchmark, and the OWASP Top 10 CI/CD Risks standards are supported.
        
    2.  Select your asset group from the list and click Next.
        
    
4.  Review the details on the Summary step of the wizard and click Create.
    

**Note:**

For more information about assessment profiles, refer to Use an assessment profile to run compliance checks on your assets.

##### View and access reports

The email recipients defined in the assessment profile will receive the compliance report.

To view the compliance scan results:

-   Navigate to Posture Management → Compliance → Reports.
    

For more information about compliance assessment reports, refer to View and manage compliance assessments and reports.

## Application Security Policies

AppSec policies define threat responses by setting conditions, scope, and actions. Use out-of-the-box policies or clone them to create custom ones.

An Cortex Cloud Application Security policies define how to respond to application security threats. The policy evaluates raw findings, such as CVE vulnerabilities or IaC misconfigurations detected by scanners, against defined conditions and scope to determine whether they should be raised as actionable issues. This keeps all scan data visible while ensuring that only findings that meet your risk criteria require action.

Cortex Cloud Application Security policies serve two primary functions:

-   **Detection**: Automating the creation of issues for specific security findings to prioritize remediation
    
-   **Prevention**: Blocking pull requests (PRs) or CI/CD builds that introduce security risks, ensuring threats are stopped before they reach production
    

### Use cases

-   **Automate workflows**: Automatically generate issues only when specific criteria are met, rather than for every raw scanner finding
    
-   **Enforce gates**: Block PRs or fail CI/CD pipelines when critical vulnerabilities or misconfigurations are detected
    
-   **Ensure compliance**: Enforce specific regulatory requirements such as PCI-DSS, HIPAA, or SOC2
    
-   **Prioritize risk**: Focus remediation efforts on high-impact issues by filtering out noise based on severity or context
    

### Policy types and categories

Policies are categorized based on their focus and their origin:

-   **By focus**:
    
    -   **Code security policies**: Address risks in the code-to-cloud workflow, including secrets, CVE vulnerabilities, IaC misconfigurations, and license violations
        
    -   **CI/CD configuration policies**: Scan the pipeline infrastructure itself (such as, GitHub Actions, Jenkins) to detect misconfigurations and risky settings in workflows
        
    -   **Drift detection policies**: Identify discrepancies between the desired infrastructure state defined in IaC templates and the actual runtime configuration of cloud resources to prevent unauthorized manual modifications and mitigate environmental drift
        
    
-   **By origin**:
    
    -   **Out-of-the-Box (OOTB):** Disabled by default. These Cortex Cloud Application Security\-provided policies pre-configured according to security best practices. The policies are immutable but can be cloned to serve as templates for custom configurations
        
    -   **AI Guardrails:** AI-driven policy recommendations generated through the analysis of historical security findings and organizational patterns to optimize detection accuracy
        
    -   **Custom Policies:** User-defined policies tailored to meet specific organizational requirements or unique infrastructure environments
        
    

### Core components

Cortex Cloud Application Security policies are built around core components, Conditions, Scope, Triggers, and Actions, that define their logic and execution. For a detailed explanation of each component, to Create Cortex Cloud Application Security policies.

### User roles and permissions
These user roles and permissions are required for AppSec policies:

-   Roles with Policies View/Edit permissions can create and modify detection policies
    
-   Roles with Policies Read permissions can view detection policies
    
-   An AppSec Admins user role has View/Edit permissions
    
-   A DevSecOps user role only has View permissions

### Policies inventory
The Cortex Cloud Application Security policies inventory includes both out-of-the-box and custom policies.

To access Cortex Cloud Application Security polices, under Modules, select Cortex Cloud Application Security → AppSec Policies (under Policy Management).

The following list describes the policy properties exposed by default in the inventory table. Additional properties can be added to the table from the Table Settings Menu.

| Field/attribute | Description |
| --- | --- |
| Policy Name | The name of the Cortex Cloud Application Security policy |
| Status | Whether the policy is enabled or disabled. Disabled policies are greyed out but remain clickable, allowing you to open the policy side panel |
| AI-Recommended (label) | Indicates the policy was generated from an AI-recommended guardrail without modification |
| Description | A description of the Cortex Cloud Application Security policy |
| Conditions | The specific criteria used to determine when policy actions are applied |
| Actions | The steps taken when the policy conditions and scope are met |
| Scope | The type of assets to be evaluated by the policy. See for more information about policy scope |
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
        
    -   If: Conditions that are applied to the policy. For example: `(Finding Type = IaC   Misconfiguration) AND (Severity = Critical)`
        
    -   Then: Triggered actions for the policy, such as Create issue and Block PR

### AI-recommended guardrails

AI-recommended guardrails automate risk prevention by analyzing your organization’s security data to suggest granular, context-aware guardrails that lock down clean environments and block recurring risks.

The Cortex Cloud Application Security AI-recommended guardrails shift your security posture from reactive detection to proactive, automated prevention. By analyzing your organization’s historical security data and risk profile, the AI engine detects gaps and suggests granular, context-aware policies tailored to your specific environment. Unlike static policies, these recommendations are data-driven responses designed to maximize immediate risk reduction with minimal operational overhead.

#### Enforcement strategies

The intelligence engine categorizes recommendations into two primary strategic models designed to reduce technical debt and prevent regression.

-   **Lockdown scopes** (posture preservation): Maintains the integrity of clean code scopes. The AI identifies repositories or applications currently free of high-severity vulnerabilities and recommends policies to prevent new risks from being introduced into these clean scopes
    
-   **Stop the bleeding** (risk containment): Targets recurring issue patterns. The engine analyzes the last 30 days of data to identify persistent risks, such as a specific vulnerable package appearing across multiple repositories, and suggests policies to block these components
    

#### Context-aware prioritization

The engine prioritizes guardrails for **Critical** and **High** severity issues, specifically those affecting assets detected in **deployed environments**, ensuring that guardrails address actual exposure rather than theoretical risk

#### Discovery and application

While guardrails are technically managed as policies, the workflow for AI recommendations spans two interface areas:

-   **Discovery (ASPM Command Center)**: The Command Center serves as the discovery layer, presenting the most impactful opportunities for risk reduction
    
-   **Enforcement (AppSec Policies)**: Recommendations are reviewed, customized, and formally applied as active enforcement policies within the AppSec Policies list
    

#### Supported scopes

Currently, AI-recommended guardrails are generated based exclusively on findings from the Software Composition Analysis (SCA) scanner. They do not currently support data from third-party scanners, Secrets, or Infrastructure as Code (IaC) scanners

#### Manage AI-recommended guardrails
AI-recommended guardrails are tailored to your environment's findings. Applying these recommendations converts them into active enforcement policies across your organization.

For more information on AI-recommended guardrails, refer to AI-recommended guardrails.

**Note:**

Recommended guardrails are generated based exclusively on findings from the Cortex Cloud Application Security Software Composition Analysis (SCA) scanner. They do not support SCA data ingested from third-party scanners, nor do they currently support other finding categories, such as Secrets or Infrastructure as Code (IaC).

To review, implement, or dismiss AI-recommended guardrails:

1.  Access AI-recommended policies:
    
    -   From the ASPM Command Center: Select Explore in the AI Guardrails section
        
    -   From the AppSec Policies page: Navigate to Modules → Application Security → AppSec Policies → click AI Recommendations
        
        **Note:**
        
        The total amount of available recommended guardrails is displayed on the AI Recommendations button.
        
    
2.  Select an action based on your requirements:
    
    -   Apply: Immediately converts the recommendation into an active policy. Use this for high-confidence suggestions where you do not need to modify parameters
        
    -   View Assets: Redirects you to the Scope step of the AppSec Policies wizard, where you can validate the specific list of repositories or business applications that the AI engine has identified for inclusion in the policy’s enforcement perimeter
        
    -   View Evidence: Redirects to the relevant Findings page, automatically filtered to display the specific instances of the identified risk, such as a vulnerable package
        
    -   View Details: Redirects to the Summary step of the AppSec Policies wizard, allowing you to validate the suggested policy configuration, including scope, conditions and actions, before creating the policy.
        
        -   Review the parameters. Use the Back and Next buttons to navigate the wizard and modify policy parameters as seeded
            
        -   Select Done to approve and create the policy immediately without additional navigation
            
        
    -   Dismiss: If the recommendation is not relevant:
        
    

##### Monitor active guardrails

Once applied, policies based on AI guardrail recommendations are displayed in the AppSec Policies table and are tagged as AI-Recommended for easy filtering and reporting.

**Note:**

The AI-Recommended tag is only assigned to recommendations applied as-is, that is, without modifications. Edited recommendations generate policies without this label.

##### Next step: Investigate and remediate SCA issues

Investigate and remediate vulnerabilities detected by your AI-Recommended policies to secure your software dependencies and strengthen your software supply chain. For more information reefer to Software Composition Analysis (SCA) vulnerability issues.

### Create Cortex Cloud Application Security policies
You can create custom policies to detect and prevent security risks across your software development environments and workflows. Cortex Cloud Application Security policies define how to respond to code and configuration drift, either by blocking risks (prevent) or creating issues for remediation (detect). To enhance and automate protection, you can use AI Guardrails, which analyze real security findings to recommend tailored policies. These tools help enforce consistent, automated responses to threats and infrastructure deviations across your code and CI/CD environments before they reach production.

Cortex Cloud Application Security policies are categorized into the following types based on their focus:

-   Code Security policies
    
-   AI-recommended guardrails
    
-   CI/CD Configuration policiesCreate CI/CD configuration policies
    
-   Create IaC Drift Detection policiesCreate IaC Drift Detection policies
    

#### Policy evaluation overview

AppSec Policies consists of four core pillars: Scope, Conditions, Triggers, and Actions. Together, these components define which assets are evaluated, what is evaluated, when evaluation occurs, and how enforcement is applied. AppSec Policies support multiple triggers and actions.

-   **Conditions** (The logic)
    
    Defines what constitutes a violation by selecting a scanner or multiple scanners and applying attribute filters.
    
-   **Scope** (The target)
    
    The scope resolves to a specific list of Repositories and or Business Applications. You can apply filters to narrow the scope, for example, to a single repository or application.
    
-   **Triggers** (The timing)
    
    Triggers define when and where a policy is evaluated. A policy can be evaluated in one or more of the following contexts:
    
    -   **Periodic scans**: Runs on a scheduled basis
        
    -   **Pull Requests (PRs)**: Runs whenever code is committed to a PR
        
    -   **Continuous Integration (CI) scans**: Runs during pipeline execution
        
    
    The selected triggers determine where the policy logic is applied.
    
-   **Actions** (The outcome)
    
    Defines what happens when a condition is met within the scope at the triggered time.
    
    -   **Detect**: Create an issue
        
    -   **Prevent** : Block a pull request (PR) or fail a CI run (PR and CI triggers only)
        
    -   **Report**: Add a PR comment or CI report (PR and CI triggers only)
        
    
    If multiple actions are selected for a single trigger, all selected actions are executed.
    
    Example 96. Example
    
    **Parameters**:
    
    -   **Condition**: Critical vulnerability
        
    -   **Trigger**: Pull request
        
    -   **Actions**: Prevent, Report, Detect
        
    
    **Result**
    
    When a pull request scan detects a critical vulnerability:
    
    -   The pull request is blocked
        
    -   A comment is added to the pull request
        
    -   An issue is created for the detected vulnerability
        
    
      
    

#### Multiple policies matching a single finding

If a single finding matches multiple policies, actions from all matching policies are evaluated. Each action is executed only once.

Example 97. Example

**Parameters**:

-   **Policy A**: Prevent (Block PR), Detect (Create an issue)
    
-   **Policy B**: Detect (Create an issue)
    
-   **Policy C**: Report (PR comment)
    

**Result**:

When the finding is detected:

-   The pull request is blocked
    
-   One issue is created
    
-   A PR comment is added
    

  

**Note:**

When an issue is created, only the first policy ID that triggered the issue is associated with it.

#### Viewing blocking policies

When a CI scan is blocked by a policy, the blocking policy is shown in the **CI Scan Health** view under the **Blocking Policy** column.

The same behavior applies to pull request (PR) scans. When a PR is blocked, the blocking policy appears in the PR scan details.

#### Third-party scanner limitations

Policies applied to third-party scanners are currently supported with the following limitations:

-   Only **periodic scan** triggers are supported
    
-   Only the Create an Issue action is available

#### Create code security policies
Code policies automatically prevent and detect security risks across your code-to-cloud workflow, ensuring threats are stopped before they reach production. They address secrets, CVE vulnerabilities, IaC misconfigurations, code weaknesses, and package-related risks—including operational risks and license violations. These policies support results from third-party scanners and apply to periodic scans, pull requests, and CI-triggered scans.

**Prioritize risk with context**

To ensure security efforts are focused and effective, you can integrate contextual information into your policies:

-   **Code-to-cloud context**: Create policies to prioritize and act on issues that pose the greatest security risk to deployed production assets
    
-   **Application context**: Align Scope-Based Access Control (SBAC) policies with an application-specific purpose and business sensitivity to ensure relevant and effective security enforcement across its lifecycle. For more information about creating application-scoped policies, refer to Scope user access to applications (Application SBAC)
    

Using runtime and application contexts focuses efforts on high-impact issues and reduce noise.

1.  Under Modules, select Application Security → AppSec Policies → \+ Add Policy.
    
2.  On the General step of the policy creation wizard.
    
    1.  Select Code Scanners (default) as the policy type.
        
    2.  Provide a unique policy name (required) and description.
        
    3.  Click Next.
        
3.  On the Conditions step of the wizard, select Add Filters to define the conditions that apply to the policy. By default, the Finding Type field is displayed with all scanner types selected.
    
    1.  Modify the Finding Type (optional): Select one or more scanners. The policy will only evaluate findings generated by the selected scanners.
        
        Scanner options include: Select All, Vulnerability, Secrets, IaC Misconfiguration, License, Operational Risk, Code Weakness.
        
        **Considerations**:
        
        -   You can select multiple finding types (scanners) to broaden the policy's coverage, allowing it to apply to multiple security categories simultaneously. By default multiple scanners are selected, limiting the available filters
            
        -   Selecting specific scanners narrows the policy scope to particular risk categories (such as Secrets) and unlocks the filtering attributes unique to the scanner on the Conditions screen
            
        
    2.  Click AND to select an attribute to filter the findings for the selected Finding Type (scanner).
        
        When applying filters to the selected finding types, the system's logic adapts based on the attributes you choose, creating a tailored policy that targets the specific risk patterns you are looking for.
        
        **Filter logic**:
        
        Using `AND` and `OR` operators allows you to broaden policy coverage while maintaining dedicated logic for each Finding Type, giving precise control over how different conditions are evaluated.
        
        -   `AND` logic within a bracket: All conditions in a single bracket must be met for the policy action to apply
            
        -   `OR` logic between brackets: Multiple brackets can be combined with the OR operator to define separate evaluation rules for different sets of conditions
            
        
        Example 98. Example
        
        In this example, the policy applies to findings that meet the first set of conditions (Secrets with Critical severity) or the second set (IaC with High severity).
        
        ```
        [Finding Type = Secrets AND Severity = Critical] 
        OR 
        [Finding Type = IaC AND Severity = High]
        ```
        
          
        
    3.  Select a value for the filter.
        
    4.  Click Next.
        
    
    **Note:**
    
    For a detailed list of all available attributes and their values by scanner type, refer to Cortex Cloud Application Security code policy Condition attributes .
    
4.  On the Scope step of the wizard, narrow the policy scope to relevant assets using one of these methods: Asset Types or Asset Groups.
    
    1.  If selecting Asset Types:
        
        1.  An unfiltered list of Cortex Cloud Application Security assets in the inventory is displayed.
            
        2.  Narrow the scope of the assets to be checked by the policy: Select Add Filter → [Filter type] → [Filter value].
            
            You can filter assets by:
            
            -   Category. Values: Application, Repository.
                
                **Application context**: If you select Business Applications as the type of Category, a list of business applications is displayed, and the policy is scoped to evaluates these applications. You can narrow the scope of the policy to specific applications by applying additional filters, such as Business Application Names.
                
            -   Business Application Names. Value: String
                
            -   Business Application Criticality. Values: Select All, Critical, High, Medium, Low
                
            -   Application Business Owner. Values: String
                
            -   Repository Name: Values: String
                
            -   Repository ID: Values: String
                
            -   Is Public Repository: Values: Select All, Yes, No
                
            -   Has Deployed Assets (Runtime context): Values: Select All, Yes, No
                
            -   Has Internet-exposed deployed assets (Runtime context): Values: Select All, Yes, No
                
            -   Has deployed assets with access to sensitive data (Runtime context): Values: Select All, Yes, No
                
            -   Has deployed assets with privileged capabilities (Runtime context): Values: Select All, Yes, No
                
            -   Provider: Values: AWS Code Build, AWS Code Commit, Azure Repos, Bitbucket, Bitbucket Data Center, Circle CI, Cortex CLI, GiHub, GitHub Actions, GitLab, GitLab Self-Managed, HCP Terraform Tasks, HCP Terraform Enterprise Run Tasks, Jenkins
                
            
            **Note:**
            
            SBAC scope-based limitations do not apply to Asset Types
            
    2.  If selecting Asset Groups: Select the asset groups against which this policy and its chosen detection rules will be evaluated. You can only select asset groups that you are assigned to you as part of your scope.
        
        **Application context** (SBAC): For more information about Cortex Cloud Application Security Asset Groups, refer to SBAC Scope-based access control for Cortex Cloud Application Security.SBAC Scope-based access control for Cortex Cloud Application Security
        
        **Note:**
        
        When selecting Asset Groups, the code policy is evaluated only on the application and repository assets included in the group.
        
    3.  Click Next.
        
    
    **Note:**
    
    For each application that matches the criteria, the policy is evaluated only on the repositories associated with that application.
    
5.  On the Triggers & Action step of the wizard.
    
    1.  Select one or more trigger types that define when the condition will be evaluated. You must select at least one trigger.
        
        -   Periodic Scan: Automated security scans that run every 12 hours
            
        -   PR (Pull Request)Scan: Security scans triggered automatically by events in your version control system when a Pull Request (PR) or Merge Request (MR) is created or updated
            
        -   CI Scan: Security scans that run as part of your build pipeline, including checks on your code and configurations.
            
        
        **Note:**
        
        If you select only Code Weaknesses as the Finding Type in the condition step (indicating a third-party scanner), the PR and CI triggers are disabled, leaving only Periodic Scan enabled.
        
    2.  Specify which actions to take when the policy detects its target risk. You must select at least one action for each selected trigger.
        
        | Periodic scan | PR scan | CI scan |
        | --- | --- | --- |
        | Create an issue (required); Override Severity | Block PR; PR Comment; Create an issue; Override Severity | Block CI; CLI Report; Create an issue; Override Severity |
        
        **Table Legend**
        
        -   Create an issue: Create an issue if policy conditions within the selected scope are met. You can control when an issue is created—for example, during periodic scans but not in pull request scans. You can also assign different severities based on the trigger, allowing lower severity for issues detected after a block compared to those found during periodic scans
            
        -   Block: Block a run if the policy conditions within the selected scope are met
            
        -   PR Comment: Automatically posts a comment on a pull request when the policy conditions for the selected trigger are met
            
        -   CLI Report: Enable reporting via CLI if policy conditions within the selected scope are met. Available when CI scan is selected as the evaluation method
            
        -   Override Severity: Manually override the default severity that the system assigns to the issue
            
        
    3.  Click Next.
        
6.  On the Summary step of the wizard: Review the policy settings and click Done.
    
    This step provides an overview of the configured policy, including its name and description, the configured scope, and a table of conditions, triggers, and actions. The table splits conditions by trigger, since not all selected triggers apply to all selected Finding Types—for example, Code Weaknesses. It also displays the user who created the policy and the creation date.
    
    You can view the custom policy that you created in the general policies table on the AppSec Policies page.
    

##### Next step: Investigate and remediate issues

Investigate and remediate issues identified by your scanners to mitigate risks across your code, dependencies, and infrastructure. For more information, refer to Code Security scanners.

##### Cortex Cloud Application Security code policy Condition attributes

Learn about Application Security code policy Condition filters and attributes.

Condition attributes are data fields used to filter findings. The list includes common attributes - including the Finding Type attribute - as well as scanner-specific attributes, which are displayed after you select a scanner as the Finding Type. You can select multiple attributes, from both common and scanner-specific lists, to create precise filters and target policies more effectively.

###### Common Condition attributes

-   Severity. Values: Select All, Critical, High, Medium, Low
    
-   Backlog Status. Values: Select All, Backlog, New
    
    For more information about Backlog Status, refer to Backlog baseline
    
-   Respect Developer Suppression. Values: Select All, Yes, No. For more information on developer suppressions, see Developer Suppressions below
    
-   Category. The top-level domain for organizing security findings. Values: Configuration, Vulnerability, Malware, Identity, Data, Code, Posture, Brand Protection
    
-   Finding Type: See below for detailed information
    

###### Finding Type-specific attributes (scanner-specific)

The Finding Type filter allows you to select the scan types that the policy will apply to. Multiple selection is supported.

Finding Type properties include: Select All, Secrets, IaC Misconfigurations, Vulnerabilities, Licenses, Operational Risk and Code Weaknesses

After selecting Finding Type as the filter, you can further refine the policy criteria by selecting specific attributes of the finding type using the `AND` operator.

Example 99. Example

When License is selected as the finding type, these following package attributes are available for filtering: License Type, Package Deprecated, Package Maintained, Package Operational Risk and Package Popularity. If you select License Type, a list of selectable licenses (such as Artistic 2.0, APSL) are displayed.

  

The following table describes the scanner type attributes.

| Attribute | Description |
| --- | --- |
| Secrets | Severity- Logic: Equal to, greater than, less than; Severity level: Critical, High, Medium, Low ; AppSec Rule- Logic: Is, Is not; Rules: Multi-selection list of available detection rules or type-in field ; Secret Validity- Logic: Is, Is not; Values: Privileged, Valid, Invalid, Unknown ; AppSec Rule Labels- Logic: Is, Is not; Labels: Multi-selection list of available labels |
| IaC misconfiguration | Has an automated fix:- Logic: Is, Is not; Values: Select All, Yes, No ; AppSec Rule- Logic: Is, Is not; Rules: Multi-selection list of available detection rules ; IaC tag- Logic: Is, Is not; Tags: [One or more tags, separated by commas or spaces] ; AppSec Rule Labels- Logic: Is, Is not; Labels: [Multi-selection list of available labels or type-in field] ; IaC Compliance- Logic: Is, Is not; Values: - Compliance Standard; Compliance Control |
| Vulnerabilities | Risk Factors- Logic: Is, Is not; Values: Critical severity, High severity, Medium severity, Has fix, Remote execution, DoS-Low, DoS-High, Recent vulnerability, Exploit exists in the wild, Exploit exists -POC, Attack complexity: low, Attack vector: network ; CVE ID- Logic: Is, Is not; CVE IDs: [Multiple CVE IDs can be entered, separated by commas or spaces] ; CVE Fix Available Date: Range: Select a start and end date; CVE Publish Date: Range: Select a start and end time; CVSS Score- Logic: Is equal to, is not equal to, is equal or greater than, is equal or less than; Score: Number between 0-10 ; EPSS- Logic: Is equal to, is not equal to, is equal or greater than, is equal or less than; Number between 0.00–1.00 ; Has a fix:- Logic: Is, Is not; Values: Select All, Yes, No ; Is KEV- Logic: Is, Is not; Values: Select All, Yes, No ; Package Name- Logic: Is, Is not, Contains, Does not contain; Package Name: [Package name string] ; Package Deprecated- Logic: Is, Is not; Values: Select All, Yes, No ; Package Maintained- Logic: Is, Is not; Values: Infrequently Maintained, Moderately Maintained, Frequently Maintained ; Package Popularity- Logic: Is, Is not; Values: Select All, Low, Medium, High ; Package Operational Risk- Logic: Is, Is not; Values: Select All, Low, Medium, High ; Package Version- Logic: Equal to, not equal to, greater than, less than; Version: [Package version string] |
| License | License Type- Logic: Is, Is not; Licenses: Multi-selection list of available license types ; AppSec Rule: See above; AppSec Rule Label: See above; Package Deprecated: See above; Package Maintained: See above; Package Name: See above; Package Operational Risk: See above; Package Popularity: See above; Package Version: See above |
| Operational risk | Popularity: See Package Popularity above; Maintained: See Package Maintained above; Deprecated: See Package Deprecated above; Package Name: See above; Package Version: See above |
| Code Weaknesses | CWE:- Logic: Contains, does not contain, equals, does not equal; Values: [CWE ID (text string)] ; Language:- Logic: Contains, does not contain, equals, does not equal; Values: [Supported program language, such as Java (text string)] ; OWASP Category:- Logic: Contains, does not contain, equals, does not equal; Values: [Top 10 OWASP CWE categories (text string)] ; Source:- Logic: Contains, does not contain, equals, does not equal; Values: [Text string] |

###### Developer Suppressions

Apply developer suppressions through the Respect Developer Suppression attribute. Options: Select All, Yes, No.

-   **No**: If you do not select the Respect Developer Suppressions attribute, no additional action is taken, and developer suppressions are not considered in the policy
    
-   **Yes**: If you select the Respect Developer Suppressions attribute, a new condition is automatically added to each existing condition group, ensuring the policy respects developer suppressions
    

Precedence rule: If both a global suppression setting and a condition-level filter for Respect Developer Suppression are present, the condition-level filter will always take precedence during policy evaluation.

###### Build queries with Finding Types

You can select the Finding Type attribute at the beginning of a new query and also after each `OR` operator. When an AND operator follows a selected Finding Type, the available attributes for filtering will be limited to those relevant to that specific Finding Type. The OR operator, however, provides access to all available attribute options.

Example 100. Example

`finding type = Vulnerabilities AND CVSS>9 AND has a fix = true) OR (finding type = Operational Risk AND maintenance = LOW) OR (finding type = IaC misconfiguration AND IaC tag = kuku`

#### Create IaC Drift Detection policies
IaC Drift Detection policies define the conditions under which configuration drift is identified, prioritized, and surfaced as security issues. By creating these policies, you control how the platform evaluates deviations between your IaC baseline and the live cloud configuration, ensuring that drift is detected consistently and aligned with your security and compliance requirements.

1.  Navigate to Modules → Application Security → AppSec Policies → Add Policies.
    
2.  On the General step of the wizard.
    
    1.  Select Drift Detection Scanner.
        
    2.  Provide a policy name (required) and description (optional).
        
    3.  Click Next.
        
3.  On the Conditions step of the wizard:, IaC Drift is selected as the default Finding Type. Select the IaC Drift attributes that define the policy. Options include:
    
    -   AppSec Rule: Filters the policy scope to trigger only when the detected drift specifically violates a particular named security rule (such as S3-Bucket-Public-Read-Access). This allows fine-grained control over which security findings count as a policy violation
        
    -   AppSec Rule Label: Filters the policy based on custom tags or categories assigned to the underlying security rule. This is useful for grouping similar risks (such as grouping all rules labeled Networking-Exposed)
        
    -   Backlog Status: Filters the policy based on whether the resulting issue is categorized as New (a recently introduced misconfiguration) or Backlog (pre-existing technical debt)
        
    -   Severity: Filters the policy to trigger only when the drift is classified above a certain risk level (for example, only trigger an issue if the drift severity is Critical or High)
        
    -   IaC Tag: Filters the policy based on custom metadata tags found within the IaC code (such as checking only resources tagged with Environment: Production). This is useful for isolating high-priority business applications
        
    
4.  On the Scope step of the wizard.
    
    Limit policy evaluation by defining which code repositories or business applications are scanned and which cloud resources are evaluated for drift. At evaluation time, the policy engine constructs the runtime resource set strictly based on the defined scope.
    
    -   If selecting Asset Types: Narrow the scope of the policy using these attributes:
        
        -   Provider: Cloud service provider (such as AWS), version control systems (such as GitHub) and CI tools (such as Jenkins)
            
        -   Category: Values include Application, Repository
            
        -   Business Application Names: Enter a custom text string
            
        -   Application Business Criticality: Define the policy according to a business application's criticality. Values: Select All, Critical, High, Medium, Low
            
        -   Application Business Owner: Enter a custom text string
            
        -   Cloud Account: The cloud account number or name
            
        -   Cloud Region: The specific cloud region
            
        -   Repository Name: The name of a specific repository. Enter a custom text string
            
        -   Repository ID. The repository identifier
            
        -   Is public repository: Whether the repository is public or if the application is built from public source code. Values: Select All, Yes, No
            
        -   Has deployed assets: Whether the asset (repository or application) includes deployed assets. Values: Select All, Yes, No
            
        -   Has internet-exposed deployed assets: Whether the asset (repository or application) includes deployed assets. Values: Select All, Yes, No
            
        -   Has deployed assets with access to sensitive data: Whether the asset (repository or application) includes deployed assets with access to sensitive data (such as credit cards). Values: Select All, Yes, No
            
        -   Has deployed assets with privileged capabilities: Whether the asset (repository or application) includes deployed assets with privileged capabilities (such as Admin permissions). Values: Select All, Yes, No
            
        
        At evaluation time, only cloud resources that fall within this Cloud Asset scope are included, and issues are created exclusively for resources in this defined set.
        
    -   If selecting Asset Groups: Choose Asset Groups to apply mandatory runtime constraints to members of existing, pre-defined asset collections. For IaC Drift, Asset Groups support filtering based on deployed cloud environment characteristics:
        
        -   Provider (Cloud)
            
        -   Cloud Account (realm)
            
        -   Cloud Region
            
        
        At evaluation time, the policy engine constructs the runtime resource set strictly based on these filters.
        
    
5.  On the Triggers & Actions step of the wizard.
    
    1.  Periodic Scan is currently the only supported trigger for Drift Detection policies. Create an issue is the action configured by default.
        
    2.  Select Next.
        
    
6.  On the Summary step: Review the policy settings and click Done.
    
    This step provides an overview of the configured policy, including its name and description, the configured scope, and a table of conditions, triggers, and actions. The table also displays the user who created the policy and the creation date.
    
    You can view the custom policy that you created in the general policies table on the AppSec Policies page.
    

##### Next step: Investigate and remediate drift

Once your policies identify configuration drift, investigate the issue and apply remediation options to align your runtime environment with your IaC baseline. For more information, refer to IaC Drift Detection scans.

#### Manage Cortex Cloud Application Security policies
Manage your custom Cortex Cloud Application Security policies to maintain an effective application security posture and adapt your security rules to evolving threats and requirements.

To manage policies, right-click on a policy in the table or select a policy and then select the menu in the side panel. The following actions are available:

-   Edit: Redirects to the policy wizard, allowing you to modify the policy
    
    **Note:**
    
    You cannot edit out-of-the-box (OOTB) policies.
    
-   Duplicate: Clone default policies as templates for creating custom policies. When this option is selected, the policy wizard is displayed with the original policy configurations, allowing you to modify them as required
    
    **Note:**
    
    The duplicated policy will include the word "clone" in its name and must be renamed.
    
-   Disable: Enable or deactivate the policy without deleting it. Future scans will not trigger the policy, but existing issues detected by the policy will persist. Bulk actions are supported, allowing you to disable multiple policies simultaneously
    
-   Enable: Activates the policy configuration, making it active for all subsequent scans and enforcement gates.
    
-   Delete policy (Custom policies only): Permanently remove the policy from your environment. Issues detected by the policy will persist. Bulk deletions are supported

## Application Security Rules

AppSec rules detect security threats using predefined criteria based on standard compliance frameworks and best practices. Custom rules are supported.

Cortex Cloud Application Security rules are designed to detect security threats within your application security environment, which includes the various components, configurations, and interactions within your application that can potentially introduce vulnerabilities or pose risks to its security. Cortex Cloud Application Security rules identify and flag issues based on predefined criteria, ensuring that potential threats are proactively detected and addressed to enhance the overall security posture of your application.

Cortex Cloud Application Security rules cover a wide range of security best practices, inspired by compliance frameworks such as PCI, GDPR, ISO 27001:2013, and NIST, as well as additional best practices beyond regulatory requirements.

In addition to default rules, you can create custom rules to tailor to your specific security requirements.

**Note:**

Out-of-the-box rules cannot be modified directly. However, you can create a custom rule by cloning the existing one. This allows you to make changes to the original rule according to your requirements. Refer to Manage Cortex Cloud Application Security custom rules for more information.

### Roles and permissions
These user roles and permissions are required for AppSec rules:

-   Users with Rules Read permission can view detection rules
    
-   Users with rules Rules View/Edit permissions can create and modify detection rules
    
-   Both AppSec Admins and DevSecOps roles only have **view** permissions

### Rules inventory
To access Cortex Cloud Application Security rules, under Modules select Application Security → AppSec Rules (under Policy Management).

The Cortex Cloud Application Security rules inventory includes both out-of-the-box and custom rules. The following list describes rules fields/properties displayed in the inventory table. By default, rules are displayed according to severity and then alphabetically. Details are provided for properties that require explanation. You can enable or disable rules by checking the box next to the rule name in the table.

| Attribute/Property | Description |
| --- | --- |
| Rule Name | The rule name |
| Rule Description | A description of the rule |
| Severity | The severity level assigned to findings identified by the rule |
| Scanner | The type of Application Security scanner configured to detect violations of this rule |
| Policies Count | The amount of policies that included the rule in its configuration |
| Last modified | The date and time when the rule was most recently updated |
| Labels | Labels assigned to the rule |
| Framework/Language | The framework or language that the detection rule applies to (for example, GitHub, Terraform, JavaScript) |
| Issues Count | The amount of issues generated from findings detected by the rule. Select the value to navigate directly to the dedicated Issues page for the corresponding scan type, Filtered by the issues detected by the rule |
| Mapped Cloud Security Rule | The corresponding Cloud Security Posture Management (CSPM) rule ID that is linked to this Application Security rule. This mapping enables unified policy enforcement and ensures consistent security governance from code to cloud |

#### How to search for Cortex Cloud Application Security rules

Use filters to find specific rules or categories.

Example 101. Examples

-   To filter rules relating to Secrets, select filter icon → Scanner (from the Select field) → Secrets (from the Value field).
    
-   To view custom rules only, select Mode from the Select field, not equals as the operator, and Out-of -the-box as the value
    
-   Sort rules according to their attributes, such as issue severity, to prioritize remediation efforts

### Create custom Cortex Cloud Application Security rules
Create custom Cortex Cloud Application Security rules to tailor your security measures to address specific and unique threats to your organization that are not covered by default rules. Custom rules run across branch periodic, PR, and CI scans.

Use the custom rule builder to create rules from scratch or clone and customize existing rules, enabling you to tailor them to meet your specific requirements effectively.

You can create custom rules for:

-   **Secrets** scans
    
-   **IaC** scans. Supported frameworks include Terraform, TFPlan (with automatic application of Terraform custom rules), CloudFormation, Kubernetes, Bicep, Helm, Kustomize, Helm and ARM. These scans also apply to serverless deployments
    

To create custom rules:

1.  Under Modules select Application Security → AppSec Rules (under Policy Management) → Add Rule.
    
2.  On the New Rule dialog box:
    
    1.  Provide these details:
        
        -   Name: The name of the rule
            
        -   Impact: Describes the potential impact of a detected violation. This description is displayed in the Issues page as well as PR Comments
            
        -   Severity(required): Determines the priority level assigned to findings identified by the rule
            
        -   Scanner (required): The type of scanner to be used to detect issues based on the rule
            
        -   Category (required): Refines the scope of the rule. Values include General, IAM, Monitoring, Networking, Public, Storage, Compute, Kubernetes, Logging, and AI/Machine Learning
            
        -   Subcategory (required): Further refines the scope of the rule by specifying particular attributes within the selected category
            
            After selecting the category and sub-category, a description of the rule finding that will be based on these selections is displayed.
            
            Example 102. Example
            
            If IAM is the category, and Overly Permissive is the sub-category, the finding type description is: "Based on the categorization, finding type will be "Overly permissive IAM policies configuration found in infrastructure as code"".
            
              
            
        -   Framework: The framework or language that the rule is designed to apply to, such as Terraform, CloudFormation and ARM
            
        -   Labels: Assign tags to rules to help categorize, filter, and organize them for easier identification and management
            
        -   Mapped Runtime Rule: Select a runtime rule from the menu to map to your custom build time rule. This enhances your code-to-cloud visibility, allowing you to prioritize findings which are detected in both build and deployed environments
            
        
    2.  Click Next.
        
3.  On the Rule Configuration screen.
    
    1.  Provide your rule definition as YAML.
        
        **Note:**
        
        See Configure YAML file properties below for more details.
        
    2.  Validate the code: Click Validate Code.
        
    3.  Provide suggested remediation in AsciiDoc format.
        
    4.  Click Done.
        
        The rule is displayed in the rules inventory table.
        
    
    **Note:**
    
    Scanning/testing behavior is not supported.

### Manage Cortex Cloud Application Security custom rules
You can manage Cortex Cloud Application Security detection rules to customize and optimize your security configurations according to your specific needs and preferences: On the AppSec Rules inventory, right-click on a rule or click to open the side panel → select an option:

-   Edit: Opens the Edit Rule wizard, allowing you to manage existing rules
    
-   Duplication: Opens the selected rule in a New Rule dialog box, allowing you to save a copy of the rule. This allows you to customize default rules according to your requirements

### Configure YAML file properties
You can leverage YAML templates to create complex rules tailored to specific compliance or security requirements. Cortex Cloud Application Security rules support attribute-based and connection-state rules.

#### Rule attributes properties (YAML)

The following YAML attributes are used to define the properties of the rules.

-   provider: Specifies the cloud provider or source for the resources
    
-   definition: Contains the logic and conditions for the rule, including attributes, operators, and resource connections
    
-   resource_type: Defines the type of the specific cloud resource
    
-   cond_type: Represents the condition type for applying the rule. Options: attributes, connection, filter, resource
    
-   attribute: Refers to the specific attribute or property of the cloud resource being evaluated
    
-   value: Represents the value that the attribute of the cloud resource should meet for the rule condition
    

#### Attribute-based rules

Attributes define resource property configurations. The YAML syntax for attribute configurations aligns with the framework targeted by the rule, such as Terraform, to define the desired resource state. Cortex Cloud Application Security IaC rules identify and flag any resource that deviates from this defined state as a violation.

Each resource must include one of the following conditions:

-   **Contain the specified attribute values**. For example, if a rule states that the `region` attribute must be `us-west-2`, then a resource will only pass this part of the rule if it includes the `region` attribute, and the value of that attribute is `us-west-2`
    
-   **Match the attribute's presence**. For example, if a rule states "the `encryptionEnabled` attribute must be present," then a resource will only pass if it includes the `encryptionEnabled` attribute, regardless of its value
    
-   **Match the attribute's absence**: For example, if a rule says "the `publicAccessAllowed` attribute must be absent," then a resource will only pass if it does not include the `publicAccessAllowed` attribute
    

Example 103. EXAMPLE

In this example, the attribute check flags any `aws_redshift_cluster` resource where the `automated_snapshot_retention_period` is not `0`.

```
definition:
     cond_type: "attribute"
     resource_types:
     - "aws_redshift_cluster"
     attribute: "automated_snapshot_retention_period"
     operator: "not_equals"
     value: "0"
```

  

**Supported Operators**: Attribute operators apply differently based on the scan type:

-   For `IaC` scans: All attribute operators are supported
    
-   For `Secrets` scans: You must implicitly use the `regex` operator. Even if `regex` is not explicitly defined, pattern matching is applied automatically. For example, in the following secret rule, regex is implicitly applied:
    
    ```
    cond_type: "secrets"
     value:
       - "[A-Za-z0-9]{8,20}"
       - "my-super-secret-password-regex"
    ```
    

The table below explains how to use attributes with matching keys and values.

| Operators | Values |
| --- | --- |
| `Equals` | `equals` |
| `Not Equals` | `not_equals` |
| `Regex Match` | `regex_match` |
| `Not Regex Match` | `not_regex_match` |
| `Exists` | `exists` |
| `Not Exists` | `not_exists` |
| `One Exists` | `one_exists` |
| `Any` | `any` |
| `Contains` | `contains` |
| `Not Contains` | `not_contains` |
| `Within` | `within` |
| `Starts With` | `starting_with` |
| `Not Starts With` | `not_starting_with` |
| `Ends With` | `ending_with` |
| `Not Ends With` | `not_ending_with` |
| `Greater Than` | `greater_than` |
| `Greater Than Or Equal` | `greater_than_or_equal` |
| `Less Than` | `less_than` |
| `Less Than Or Equal` | `less_than_or_equal` |
| `Subset` | `subset` |
| `Not Subset` | `not_subset` |
| `Intersects` | `intersects` |
| `Not Intersects` | `not_intersects` |

#### Limitation of nesting in `NOT` blocks

Nesting connection condition types within a `NOT` block is not currently supported. The following example displays an unsupported 'NOT' block for connection condition types.

Example 104. 

```
definition:
  not:
    cond_type: "connection"
    resource_types:
      - "aws_elb"
    connected_resource_types:
      - "aws_security_group"
    operator: "exists"
```

  

#### Using JSONPath with operators

Operators within this system support advanced attribute targeting through _JSONPath_ expressions. To apply an operator to a JSONPath result, prefix the operator with `jsonpath_`. This allows for flexible and precise data extraction and comparison. For example: `jsonpath_length_equals` or `jsonpath_length_exists` .

#### Connection-based rules

Connection state in a rule defines whether resources of different types are connected or disconnected. This helps enforce security controls and architectural constraints by specifying allowed or prohibited relationships between resources.

Example 105. EXAMPLE

In this example, `aws_lb` and `aws_elb` must be connected to `aws_security_group` or `aws_default_security_group` to be compliant.

```
definition:
       cond_type: "connection"
       resource_types:
           - "aws_elb"
           - "aws_lb"
       connected_resource_types:
         - "aws_security_group"
         - "aws_default_security_group"
       operator: "exists"
```

  

The table below explains how to use Connection State types with matching keys and values.

| Key | Type | Value |
| --- | --- | --- |
| `cond_type` | string | A connection must exist between the specified resources |
| `resource_type` | collection of strings | Use either `all` or [included resource type from list] |
| `connected_resource_types` | collection of strings | Use either `all` or [included resource type from list] |
| `operator` | string | `exists`/`not exists` |

The table below explains how to use Connection State operators:

| Connection State Operators | Value |
| --- | --- |
| Exists | exists |
| Not Exists | not_exists |

#### Logical operators (AND/OR)

A rule can include layers of defined attributes, connection state, or both. To define the relationship between them, use `AND`/`OR` logical operators. You can customize the attributes, connection state, or both across multiple layers.

Example 106.  

In this example, the attribute property is evaluated using `OR` logic to enforce compliance checks for ensuring all AWS databases have a backup policy.

Read more...

```
metadata:
 name: "Ensure all AWS databases have Backup Policy"
 guidelines: "In case of non-compliant resource - add a backup policy configuration for the resource"
 category: "storage"
 severity: "medium"
scope:
  provider: "aws"
definition:
 or:
   - cond_type: "attribute"
     resource_types:
     - "aws_rds_cluster"
     - "aws_db_instance"
     attribute: "backup_retention_period"
     operator: "not_exists"
   - cond_type: "attribute"
     resource_types:
     - "aws_rds_cluster"
     - "aws_db_instance"
     attribute: "backup_retention_period"
     operator: "not_equals"
     value: "0"
   - cond_type: "attribute"
     resource_types:
     - "aws_redshift_cluster"
     attribute: "automated_snapshot_retention_period"
     operator: "not_equals"
     value: "0"
   - cond_type: "attribute"
     resource_types:
     - "aws_dynamodb_table"
     attribute: "point_in_time_recovery"
     operator: "not_equals"
     value: "false"
   - cond_type: "attribute"
     resource_types:
     - "aws_dynamodb_table"
     attribute: "point_in_time_recovery"
     operator: "exists"
```

  

Example 107.  

In this example, both `AND`/`OR` logical operators are utilized to evaluate both attribute and connection state properties in order to enforce compliance checks for ensuring that all Application Load Balancers (ALBs) are only connected to HTTPS listeners.

Read more...

```
metadata:
  name: "Ensure all ALBs are connected only to HTTPS listeners"
  guidelines: "In case of non-compliant resource - change the definition of the listener/listener_rul protocol value into HTTPS"
  category: "networking"
  severity: "high"
scope:
  provider: "aws"
definition:
  and:
  - cond_type: "filter"
    value:
    - "aws_lb"
    attribute: "resource_type"
    operator: "within"
  - cond_type: "attribute"
    resource_types:
    - "aws_lb"
    attribute: "load_balancer_type"
    operator: "equals"
    value: "application"
  - or:
    - cond_type: "connection"
      resource_types:
      - "aws_lb"
      connected_resource_types:
      - "aws_lb_listener"
      operator: "not_exists"
    - and:
      - cond_type: "connection"
        resource_types:
        - "aws_lb"
        connected_resource_types:
        - "aws_lb_listener"
        operator: "exists"
      - cond_type: "attribute"
        resource_types:
        - "aws_lb_listener"
        attribute: "certificate_arn"
        operator: "exists"
      - cond_type: "attribute"
        resource_types:
        - "aws_lb_listener"
        attribute: "ssl_policy"
        operator: "exists"
      - cond_type: "attribute"
        resource_types:
        - "aws_lb_listener"
        attribute: "protocol"
        operator: "equals"
        value: "HTTPS"
      - or:
        - cond_type: "attribute"
          resource_types:
          - "aws_lb_listener"
          attribute: "default_action.redirect.protocol"
          operator: "equals"
          value: "HTTPS"
        - cond_type: "attribute"
          resource_types:
          - "aws_lb_listener"
          attribute: "default_action.redirect.protocol"
          operator: "not_exists"
      - or:
        - cond_type: "connection"
          resource_types:
          - "aws_lb_listener_rule"
          connected_resource_types:
          - "aws_lb_listener"
          operator: "not_exists"
        - and:
          - cond_type: "connection"
            resource_types:
            - "aws_lb_listener_rule"
            connected_resource_types:
            - "aws_lb_listener"
            operator: "exists"
          - or:
            - cond_type: "attribute"
              resource_types:
              - "aws_lb_listener_rule"
              attribute: "default_action.redirect.protocol"
              operator: "equals"
              value: "HTTPS"
            - cond_type: "attribute"
              resource_types:
              - "aws_lb_listener_rule"
              attribute: "default_action.redirect.protocol"
              operator: "not_exists"
```

  

Example 108.  

In this example, `OR` logic is applied to custom secrets defined as part of a policy aiming to enforce security measures by restricting the addition of certain types of secrets.

Read more...

```
metadata:
  name: "My Secret"
  guidelines: "Don't add secrets"
  category: "secrets"
  severity: "high"
definition:
  cond_type: "secrets"
  value:
    - "[A-Za-z0-9]{8,}"
    - "my-super-secret-password-regex"
```

## Manage code weaknesses

Ingest third-party SAST findings to create actionable issues, enabling you to prioritize and track remediation and enhancing your security posture.

You can ingest Static Application Security Testing (SAST) findings from third-party vendors. These findings are raw security observations from your external scanners that Cortex Cloud then uses to generate actionable issues. These issues are prioritized by Cortex Cloud Application Security, enabling you to remediate specific code weaknesses.

Cortex Cloud Application Security default policies enrich and categorize ingested Critical and High SAST findings detected in your organization's environment as issues (also known as Code Weaknesses). Issues represent the smallest unit for remediating SAST-identified CWEs.

**Note:**

You can customize policies to define which findings are categorized as issues.

### Ingest SAST findings

Currently, Cortex Cloud Application Security supports Snyk and Semgrep data ingestion. To onboard your tools, refer to these guides:

-   Semgrep
    
-   Snyk
    

### Access code weakness issues and findings

To view and manage SAST code weaknesses, you can use the dedicated Application Security issues views or access them through broader asset inventories.

**Primary access points**

-   **Dedicated issues view**: To access SAST code violation issues, under Modules, select Application Security → Issues → Code Weaknesses
    
-   **View findings**: To view SAST findings, navigate to Code Weaknesses issues and select the Findings tab
    
-   **Global Issues inventory**: Access SAST issues from the general Cortex Cloud All Issues inventory: In Cases and Issues, navigate to Issues → AppSec Issues (under All Issues) → SAST Scanner (as the Detection Method value)
    

**Issues in asset inventories**

You can also view SAST CWE issues within the following asset inventories: Navigate to Inventory → All Assets, and select one of the following inventories:

-   Repositories: Select an asset to open the side table and then open the Code Weaknesses tab
    
-   Business Applications: Select an application to open the side table and then open the Code Weaknesses tab
    
-   All Code Inventory: Filter the table by **Provider=Semgrep or Snyk** to view these vendor assets

### Code weaknesses issue inventory
The SAST code weakness issues inventory includes the following fields.

| Property | Description |
| --- | --- |
| Severity | Severity level of the code weakness issue (such as Critical, High, Medium, Low) |
| Name | Short, descriptive name of the code weakness issue (such as "SQL Injection," "Cross-Site Scripting") |
| CWE(s) | Common weakness enumeration (CWE) identifiers associated with the issue |
| OWASP Categories | Top 10 OWASP categories |
| Asset Name | Name of the repository affected by the CWE issue (such as library name, file name) |
| Language | Programming language in which the CWE issue was detected (such as Java, Python, JavaScript) |
| Branch | The specific branch or version of the code where the CWE issue was detected |
| File Path | Path to the file or location within the code where the CWE issue was detected |
| Data Source | The 3rd party data source for the code weakness such as GitLab or GitHub |
| Risk Factors | Classifies the issue based on industry-standard categories, such as OWASP Top 10, CWE Top 25, providing a standardized understanding of its type and prevalence |
| Status | The issue status. Values: New, In Progress, Resolved. You can set the status as required |
| Backlog Status | Backlog Status: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability). To understand how issues are categorized as backlog/new, refer to Issue/Finding classification by scanner |
| Created | When the issue was created |
| Assignee | The entity assigned to mitigate the issue |

Selecting an issue in the table opens a card with tabs including additional information about the issues, including suggested remediation.

Summary

A summary of the code weakness including the severity level, the CWE identity and the type of engine that detected the weakness.

Overview

The Overview tab provides general details of the SAST CWE:

-   Description: Provides a summary of the CWE and its potential impact
    
-   Status: Displays the current state of the issue
    
-   **Timestamps**: Provides the date the issue was created and last updated
    
-   Assignee: Assign the CWE issue to the appropriate team member remediation using the dropdown menu
    
-   Affected Assets: Identifies the version control system and repository containing the CWE
    
-   Evidence:
    
    -   Details and the location in the codebase of the code containing the CWE, including vulnerability classifications (such as OWASP) specific code lines and functions
        
    -   **Commit details**: Includes the commit hash, committer, and the assigned user responsible for remediation
        
    
-   AppSec Rule: The detection rule that flagged the issue
    
-   Weakness Details: The CWE identifier with a link to the weakness in the MITRE database
    
-   Remediation: Suggested manual remediation steps to address the CWE issue
    

Actions

The Actions tab displays suggested steps to mitigate the CWE issue.

### Detailed code weakness issue information
Clicking an issue in the table opens a detailed side card that serves as a centralized workspace for investigation and remediation. The card opens on the Overview tab, which presents general details, metadata, and a summary of the evidence, while the War Room tab provides an audit trail of all automatic and manual actions taken on the issue, offering context on how it has been investigated over time. The Actions tab lists available remediation options, and for IaC and vulnerability issues, the Code to Cloud tab displays related resources and lineage between code and runtime, allowing you to understand the impact of the issue across environments.

Overview

-   **Issue metadata**
    
    -   **Timestamp**: When the issue was created and last updated
        
    -   Status: Displays the current state of the issue. Values: New, In Progress, Resolved. You can set the status manually as required.
        
        **Note**:
        
        -   Status changes are permanent in the current state (no automatic reopening)
            
        -   If a previously resolved finding reappears in a new scan, a new issue may be created
            
        -   Resolved status: The issue is marked as addressed and removed from active management; it no longer affects system metrics
            
        
    -   Assignee: You can assign the issue to a person responsible for resolving this issue. Human entities are not supported
        
    -   Rule: The Cortex Cloud Application Security rule that detected the finding. Selecting the link in the field redirects to the AppSec Rules table, filtered by the selected rule (Only applies to IaC, Secrets and CI/CD rules)
        
    -   Policy: The violated security standard that led to the detection and creation of the issue. Selecting the link in the field redirects to the AppSec Policies table, filtered by the selected policy
        
    -   SLA (Service Level Agreement): Indicates the remediation timeline status for security issues. For example Overdue indicates that the issue has exceeded the target remediation timeframe. For more information about SLA, refer to Service Lead Agreements (SLA)
        
    -   Backlog Status: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability). To understand how issues are categorized as backlog or new, refer to Issue/Finding classification by scanner
        
    
-   Description: Provides a concise technical summary of the specific security finding detected. It identifies what the issue is by referencing standard identifiers (such as the CVE ID for vulnerabilities or the CWE name for code weaknesses) and explaining the nature of the flaw, misconfiguration, or risk within the asset
    
-   Impact: Defines the security or operational consequences of an unresolved or exploited issue. Use this field to translate technical findings into business risk, such as unauthorized access
    
-   Affected Assets: The specific asset in which the issue was identified. Clicking on the asset opens the asset side card without needing to navigate away to the asset table
    
-   **Related affected assets**: Assets associated with the primary asset based on the specific scanner used. Examples include package managers (such as pip) for vulnerabilities, IaC frameworks (such as Terraform) for misconfigurations, and third-party detection engines (such as Semgrep) for code weaknesses
    
-   Linked Cases: The number and severity of cases associated with this issue. Selecting the link opens the Cases side-card for more information without having to navigate away
    
-   Evidence: Provides evidence and contextual details about the issue:
    
    -   Data Source: The system or integration from which the issue data was originally pulled (such as GitHub or a CI/CD pipeline). Click the icon next to the data source to navigate to the data source itself
        
    -   **Location**: The exact technical context of a finding, linking security findings to specific lines of code or infrastructure files:
        
        **Examples**:
        
        -   **Vulnerabilities** (SCA): Identifies the manifest file path (such as `package-lock.json`) and the specific line where the vulnerable package is declared, providing a declaration snippet as context
            
        -   **IaC misconfigurations**: Points to the configuration file (such as main.tf) and the resource block's start and end lines. Context includes the full resource configuration and the specific resource identifier
            
        -   **Secrets**: Locates the file and line number of the exposure, providing a code snippet with the secret redacted for security
            
        -   **Code Weaknesses (SAST)**: References the source code file path and the start/end lines of the flaw. Context displays the vulnerable code snippet and the affected function or method name
            
        
    -   Collaborator: The individual or team responsible for contributing to the code or configuration where the issue was identified
        
    -   Commit Hash: The commit hash of the most recent commit that modified the code where the issue was detected
        
    -   Commit Time: The timestamp of the most recent commit that modified the code where the issue was detected
        
    
-   Urgency Details includes:
    
    -   **Summary**: The issue's urgency level, a breakdown of its contributing metrics, and the date it was last updated (Tip: Hover over a metric for more information)
        
    -   **Urgency context graph**: The Urgency graph provides a node-and-edge visualization that maps the structural relationship between a vulnerable asset and its connected infrastructure. By surfacing the asset hierarchy and deployment paths, the graph offers the context necessary to evaluate the scope and potential blast radius of an issue's urgency across the environment. This visualization allows you to analyze the specific deployment and runtime dependencies where the issue was detected. The urgency level itself is determined by metrics derived from the analysis of the connected assets.
        
        **Supported scanners**: Vulnerabilities (SCA), Secrets, Code Weaknesses (ingested from third -party vendors) and IaC misconfigurations.
        
        **Graph structure**:
        
        -   **Nodes** (assets): Represents assets such as repository or pipeline, that are linked to the specific asset where the issue was detected.
            
            Clicking on a node opens a side card showing: Clicking on a node opens a side card showing initial details about the asset. Selecting View Details opens the asset side card without navigating away, displaying asset details, asset-specific information, and related context for that asset.
            
        -   **Edges** (relationships): The edges in the Urgency graph represent relationships between different asset types in the code-to-cloud deployment pipeline. These relationships trace how code flows from repositories through to runtime environments, providing the structural data required to calculate urgency metrics. By analyzing these relationships, Cortex Cloud determines the urgency level based on metrics such as whether the code is actively deployed, internet-exposed, accessing sensitive data, or leveraging privileged capabilities within its runtime environment.
            
        
    -   **Interactive controls**:
        
        -   **Layers control**: Toggle visibility of Code, Build, or Runtime layers to focus on specific pipeline segments
            
        -   **Group nodes**: Collapse multiple related nodes (such as assets within the same organization or namespace) into a single group node to manage visual density
            
        -   **Search and filter**: Locate specific nodes by typing an asset name or ID. Matching nodes are highlighted and the graph auto-focuses on the results
            
        -   **Zoom and pan**: Navigate large topologies using zoom buttons, **Fit to View**, or drag-and-drop panning
            
        
    
    For more information about Urgency levels, refer to Urgency.
    
-   Remediation: Suggested steps to mitigate the issue. For the most efficient resolution, use the Actions tab, which provides a complete list of remediation options, including PR fixes where available
    

**Note:**

Different issue types include different properties; therefore, not all properties are available for every issue.

Actions

The Actions tab displays suggested steps to mitigate the CWE issue. Only suggested manual fixes are available.

#### War Room

The War Room provides an audit trail of all automatic or manual actions taken on an issue, serving as a dedicated space to review and interact with your issue. Each issue has a unique War Room. With machine learning insights, the Cortex Cloud platform suggests the most effective analysts and command sets to help you address issues efficiently.

### Code weakness findings
SAST CWE findings are based on ingested third party (such as Semgrep) data. Findings are potential security vulnerabilities identified within your source code based on common weakness enumerations (CWEs). These insights help assess and analyze the security posture of your applications by identifying weaknesses in your codebase.

**Note:**

Findings on the Cortex platform are not intended for direct action; but rather represent data collected by the platform. They must be promoted to issues to enable mitigation efforts to secure your codebase.

To access code weakness findings, navigate to code weakness issues (see SAST code weaknesses (CWEs)) and click the Findings tab.SAST code weaknesses (CWEs)

The following table displays selected code weakness findings properties.

Read more...

| Property | Description |
| --- | --- |
| Name | Short, descriptive name of the CWE finding (such as "SQL Injection," "Cross-Site Scripting") |
| CWE(s) | CWE identifier(s) associated with the finding (such as CWE-79, CWE-119) |
| OWASP Categories | Relevant Top 10 OWASP categories associated with the finding (but can be from different years) |
| Asset Name | Name of the repository affected by the CWE finding |
| Language | Programming language in which the CWE finding was detected (such as Java, Python, JavaScript) |
| Branch | The specific branch or version of the code where the CWE finding was detected |
| File Path | Path to the file or location to the code wherein the CWE finding was detected |
| Git User | Username of the Git user who last modified the file containing the finding |
| Data Source | Source of the CWE finding information |
| Created | Timestamp of when the CWE finding was first detected. |
| Finding ID | Unique identifier assigned to a specific finding |

Selecting a finding from the table provides additional details:

-   Overview: Includes when the finding was last updated, the category associated with the finding, and the name and link to the asset where the finding was detected
    
-   Details: The location of the finding, the third party data source that detected the finding, the CWE category, the initial hash and commit, and rule ID
