# Onboard Data Sources

Onboard VCS, integrate CI tools, registries and ingest third-party data for a comprehensive view of your application and supply chain security.

Onboard your Version Control Systems (VCS), integrate your CI tools, private registries (currently JFrog Artifactory), and ingest third-party data from external vendors, to gain a comprehensive view of your application and supply chain security.

## Onboard VCS systems

By onboarding your VCS systems, you gain complete visibility into your repositories and pipeline assets and out-of-the-box CI/CD system capabilities.

-   **Visibility**
    
    -   **Asset mapping and inventory:** All repositories and their associated pipeline assets (such as GitHub Actions) are mapped, creating a complete inventory of your environment. This includes discovering forgotten or unauthorized devices and their connections
        
    -   **Vulnerability management:** The inventory allows you to identify and prioritize security vulnerabilities since you can't secure what you don't know exists
        
    -   **Compliance and auditing:** It provides the necessary data and logs to prove compliance during audits
        
    -   **Attack surface understanding:** It helps you understand and manage your potential attack surface
        
    
-   **CI/CD system capabilities**: Onboarding a VCS automatically integrates with specific CI/CD systems, triggering automated scans that identify supply chain security risks within your pipelines. For more information see Onboard CI/CD systems below
    

To onboard VCS systems, refer to Onboard version control systems.

## Onboard CI/CD systems

You can onboard CI/CD systems to scan for configuration threats in your organization's instance, pipelines, and individual repositories. While onboarding supported version control systems includes out-of-the-box CI/CD capabilities, you must explicitly onboard CircleCI and Jenkins to get code scanning for these systems. Onboarding CI/CD systems provides the following scans.

-   **Organization instance configuration threats:** This type of scan detects security issues at the level of the overall organization's instance of a version control system (VCS), such as GitHub. For example, it can flag risks such as **Project webhook SSL verification disabled** or **Variable is not scoped to an environment**.
    
-   **Pipeline configuration risks:** This scan identifies security risks within the configuration of your pipelines. Examples of risks it detects include **Excessive GitHub Action permissions, using an unpinned container image in a pipeline**, or **CI instance accesses cloud provider using insecure long-term credentials**
    
-   **Repository configuration issues:** This scan checks problems with the settings and configurations of individual code repositories. Examples include **Forking of a private repository is allowed** and **A change in settings so that a review is no longer required before merging code**
    

To onboard CI/CD systems, refer to Onboard CI/CD systems.

## Integrate CI tools to enable code scans through Cortex CLI

By integrating CI tools, you get two main benefits: code scans and streamlined security workflows. This is achieved by inserting code snippets directly into your existing CI workflows, which then run through the unified Cortex CLI to trigger automated security checks.

-   **Code scans**:
    
    -   **Code scanning for IaC (Infrastructure as Code):** Finds misconfigurations in your IaC files, ensuring your cloud and infrastructure environments are secure from the start
        
    -   **Software Composition Analysis (SCA) scans:** Identify vulnerabilities in open-source libraries and third-party components, along with license misconfigurations and package integrity issues
        
    -   **Secrets detection:** Finds hardcoded secrets, such as API keys and passwords, in your code and pipelines to prevent unauthorized access and data breaches
        
    
-   **Streamlined workflows:** By integrating security scans directly into your CI/CD pipelines, you achieve a shift-left security model, moving security from a final check to an early, continuous process within the development lifecycle.
    
    -   **Early threat detection:** You can identify and fix security threats as soon as they are introduced
        
    -   **Automated and seamless integration:** The use of code snippets and a unified CLI makes the security checks a seamless part of your existing CI process, requiring no manual intervention
        
    

To integrate CI tools through code snippets, refer to CLI pipeline code snippets

## Integrate with JFrog Artifactory

Integrate with JFrog Artifactory to provide the Cortex Cloud Application Security SCA scanner direct access to packages stored in Artifactory, a private registry. This access allows the scanner to retrieve dependency metadata and package contents, enabling full visibility, accurate dependency trees, and reliable detection of supply-chain vulnerabilities.JFrog Cloud Artifactory (SaaS)

## Ingest third-party data

-   **Expanded security coverage:** While Cortex Cloud Application Security provides robust native scanning, ingesting data from other security tools (such as SAST) expands your overall coverage. This creates a more comprehensive security profile, leaving no potential vulnerabilities unmonitored
    
-   **Contextual Enrichment:** Third-party data adds context to your existing security information. By ingesting this data, Cortex Cloud automatically correlates its findings with threats detected by Cortex Cloud Application Security scans. This helps you prioritize which vulnerabilities to address first based on the actual risks they pose, enabling more strategic and efficient remediation
    
-   **Leveraging existing investments:** You can maximize the value of your current security tools through Cortex Cloud , which powers the consolidation of your security data. Instead of operating in separate silos, your tools' data is integrated into a single, consolidated view of your security state within Cortex Cloud. This ensures that the data you have already collected from various sources is actively used to inform and strengthen your overall security strategy
    
    To ingest third-party data, refer to Ingest third-party data sources.
    

## Code replication and retention policies

Cortex Cloud does not replicate or store your application code unless your organization has subscribed to the Application Security add-on license. The data collected and displayed relates only to security findings and metadata, preserving the integrity and location of your source code.

## Disclaimer

While Cortex Cloud Application Security provides guidance during integration and explain the steps involved when you are redirected to third party version control systems (such as GitHub SaaS , GitLab SaaS and so on), Cortex Cloud Application Security does not assume responsibility for changes or variations in these platform processes. Always refer to the official documentation of the third party to ensure you are following their most current and precise instructions.

## Onboard version control systems
Connect Cortex Cloud Application Security with your version control systems (VCS) to gain comprehensive visibility into, and monitor, the systems, technologies, configurations, and pipelines that make your VCS platform.

These integrations trigger both periodic scans and scans on pull requests (PRs) via a webhook, enabling security scans to identify and remediate Infrastructure-as-Code (IaC) misconfigurations, exposed secrets and license non-compliance in your VCS environment. Scan results are displayed directly in PR comments and reports, allowing you to analyze, prioritize and fix issues as soon as they are detected.

**Note:**

Cortex Cloud Application Security (which includes IaC and Secrets scanning), is an add-on to a license (such as Posture Security) that must be purchased separately.

### Supported VCS data sources

Cortex Cloud Application Security currently supports the following VCS data source integrations:

-   AWS CodeCommit
    
-   Azure DevOps
    
-   Bitbucket CloudBitbucket Cloud
    
-   Bitbucket Data Center
    
-   GitHub Cloud
    
-   GitHub Enterprise (On-Prem)
    
-   GitLab SaaS
    
-   GitLab Self Managed (On-Prem)
    

Each integration requires a unique set of permissions and subscribed events.

### How to onboard a VCS data source

VCS data sources are listed in the Cortex data source catalog.

1.  Navigate to Settings → Data Sources & Integrations → \+ Add New → Show More → Code Repositories.
    
    **Tip:**
    
    Navigate to Settings → Data Sources & Integrations → \+ Add New → and enter your VCS data source in the search bar.
    
2.  From the search results, select a data source and follow the instructions in its configuration wizard to complete the settings configuration process.
    
    **Note:**
    
    **Disclaimer**: When onboarding with third-party data sources, we outline the required steps for setup, but we do not monitor these external resources, and they may change over time. Always refer to the relevant third-party documentation for the most current integration steps.
    

### Onboard an additional data source instance

To onboard an additional data source instance:

1.  On the Data Sources & Integrations page, select an integration from the table and click Add Instance.
    
2.  Complete the onboarding through the configuration wizard.
    

### Verify data source connectivity status and connected repositories

You can verify the connectivity status of data source instances and their connected repositories through one of these methods:

-   Navigate to Settings → Data Sources & Integrations. This page displays all data sources with their connected instances, including connectivity status and additional instance details.
    
-   When browsing the Data Source catalog, click a data source to view its details.
    

### Manage VCS instances

You can manage VCS data source instances. Hover over an instance and right-click to access the following actions:

1.  Select Settings → Data Sources & Integrations.
    
2.  Click a data source to see a list of its connected instances.
    
3.  Hover over an instance and right-click to access the following actions:
    
    -   Details: View details of the data source instance, including a list of connected repositories and organization, connectivity status, last scan date, and when initially connected.
        
    -   Edit instance: Opens the Select Repositories step of the integration wizard, allowing you to edit connected repositories. You can also edit the instance configuration by navigating back to the previous step of the wizard and modifying relevant details
        
    -   Delete instance: Deletes the entire instance
        
    -   Remove a connected repository: Right-click on a repository in the list, and click Remove Repository
        
    

### Manage findings and issues

For information about managing findings detected after onboarding data sources, and issues generated from findings refer to Code Security scanners.

### AWS CodeCommit
Integrate Cortex Cloud Application Security with your AWS CodeCommit version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This allows you to analyze, prioritize, and resolve detected issues efficiently.

###### How the integration works

To ensure security, the platform does not store or use your personal AWS credentials for scanning. Instead, the integration utilizes a cross-account trust relationship through a dedicated IAM Service Role. This relationship is secured using an External ID, a unique security identifier that prevents unauthorized third-party access.

-   **Deployment**: You deploy a CloudFormation template provided during onboarding. This template creates the necessary IAM roles and permissions automatically, requiring no manual configuration
    
-   **The service role**: This template creates a specific IAM role for cross-account access that trusts the platform. The trust policy is automatically configured with a unique **External ID** generated for your tenant. This role follows least privilege principles by requiring only necessary CodeCommit permissions and is limited to the platform AWS account
    
-   **Auditability**: All actions performed by the service role are logged in AWS CloudTrail, providing a permanent audit trail of all repository access and scanning activity for compliance monitoring
    
-   **Scanning policies**: The role includes the required policies for scanning operations and permissions for CodeCommit repository access
    
-   **Events**: The template configures a Simple Notification Service (SNS) topic with an HTTP subscription to the platform webhook URL. The template automatically applies an SNS Access Policy that allows CodeCommit to publish events and authorizes the platform to subscribe to the topic. When code changes occur, this topic pushes a notification to the webhook, triggering the platform to assume the service role and initiate a scan
    

**Danger:**

Before you begin, ensure the following:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   **AWS user permissions**: To onboard CodeCommit, the user logged into the AWS Console must have permissions to deploy the CloudFormation stack and authorize the creation of the following resources:
    
    -   `cloudformation:CreateStack`: Required to deploy the integration template
        
    -   `iam:CreateRole`: Required to allow the template to provision the Service Role for scanning operations
        
    -   `sns:CreateTopic`: Required to allow the template to provision notification triggers. **Note**: You must ensure your account is prepared to create an SNS topic for each required region if your Cloud account and stack are in different regions, as AWS requires SNS events to reside in the same region as the stack
        
        **Note:**
        
        During deployment, you must acknowledge the CAPABILITY_IAM setting in the AWS Console to allow the creation of these resources.
        
    
-   **Required scanning and policy permissions**
    
    The system requires specific permissions to access repositories and evaluate security conditions:
    
    -   **Scanning permissions**: Rights for the Service Role to access and scan CodeCommit repositories.
        
    -   **Policy permissions**: Rights to detect findings and handle issues generated from policies based on repository conditions and scan results.
        
    
    Once the stack is created, the new IAM Service Role will automatically possess permissions to perform scans and handle policy-generated issues. For the complete list of permissions, refer to Technical appendix: IAM Service Role permissions below
    
    **Note:**
    
    The permissions are configured entirely by the CloudFormation template; no manual action is required.
    

###### Onboarding steps

1.  Generate the template in the Cortex Cloud tenant.
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for AWS CodeCommit, hover over and click Add, or Add Another Instance if an instance is already onboarded.
        
    3.  Download and save the CloudFormation template (YAML file) or copy the link for your administrator.
        
2.  Create a stack on the **AWS** console.
    
    1.  Login to the AWS Console → search for CloudFormation → Create stack.
        
    2.  In the Specify template section, select Upload a template file → Choose file → upload the downloaded CloudFormation template → Next.
        
    3.  Provide a stack name → proceed through the configuration options..
        
    4.  Review the stack configurations → acknowledge the IAM resource creation → Submit.
        
3.  Select the repositories to be scanned from the Cortex Cloud tenant.
    
    1.  On the Data Sources & Integrations page, filter for AWS CodeCommit → select the AWS CodeCommit data source.
        
    2.  Locate and right-click click on your newly created connector.
        
        **Tip:**
        
        The instance ID is identical to the stack ID on the AWS platform.
        
    3.  Under Selection Options, choose the repositories to be connected to the instance:
        
        -   Permit all existing repositories
            
        -   Permit all existing and future repositories
            
        -   Select Choose from repository list and select repositories from the list
            
        
    4.  Click Save.
        
4.  Verify integration through the tenant or in AWS using either of these options:
    
    -   In Cortex Cloud: On the Data Sources & Integrations page, filter for AWS CodeCommit, select the AWS CodeCommit data source that is displayed, and verify that the status of your instance (connector) is Connected
        
    -   **In AWS**: Open CloudFormation → Stacks. Verify that the integration is displayed with a Create Complete status
        
    

###### Validate repository scan and view scan results

After connection, the platform automatically triggers a security scan of the repository. Scanning is supported for Infrastructure as Code (IAC) analysis, Software Composition Analysis (SCA), and Secrets detection.

1.  Navigate to Modules → Application Security → Periodic scans.
    
2.  Filter by Provider → AWS CodeCommit.
    
3.  Verify that the scan health of your repository is Completed.
    
4.  Select the repository.
    
5.  Review a summary of findings detected by the scans and issues generated by policies targeting the repository.
    
6.  **Next step**: Navigate to a dedicated issue table (such as Secrets) to understand and remediate the issue.
    

###### Troubleshooting

Review the following common issues and resolutions to resolve errors during stack creation, repository connection, or scanning processes.

-   **CloudFormation stack creation fails**
    
    Stack status shows CREATE_FAILED or ROLLBACK_COMPLETE
    
    -   Verify IAM permissions for stack creation
        
    -   Check for naming conflicts with existing stacks
        
    -   Review CloudFormation events for specific error messages
        
    -   Ensure CAPABILITY_IAM is granted
        
    
-   **Connection status shows WARNING or ERROR**
    
    Instance status not CONNECTED
    
    -   Verify CloudFormation stack is in CREATE_COMPLETE state
        
    -   Check IAM role trust relationship
        
    -   Ensure CodeCommit repository exists and is accessible
        
    -   Verify cross-account access permissions
        
    
-   **No scan results**
    
    Repository connected but no findings in tables
    
    -   Check repository contains scannable files
        
    -   Verify scan job completed successfully
        
    -   Review scanner logs for errors
        
    -   Ensure repository is not empty
        
    

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

###### Data protection

Cortex Cloud ensures the security and integrity of your code:

-   **Isolated scanning**: Repository contents are scanned within a strictly isolated sandbox environment to prevent cross-contamination
    
-   **Tenant isolation**: All security findings are stored with tenant isolation to ensure your data remains private and inaccessible to others
    
-   **No Persistence**: No repository credentials or sensitive secrets are stored within the platform infrastructure
    
-   **Temporary access**: Access is managed through secure cross-account IAM role assumption which provides temporary permissions without the need for static keys
    

###### Technical appendix: IAM Service Role permissions

-   **codecommit:GitPull**: Allows users to pull Git repository changes
    
-   **codecommit:ListBranches**: Grants the ability to list branches within a repository
    
-   **codecommit:GetBranch**: Required to get details about a branch in a repository
    
-   **codecommit:GetPullRequest**: Enables fetching details of a specific pull request
    
-   **codecommit:GetFolder**: Required to view the contents of a specified folder in a repository from the CodeCommit console
    
-   **codecommit:GetFile**: Required to view the encoded content of an individual file and its metadata in a repository from the CodeCommit console
    
-   **codecommit:GetBlob**: Allows fetching of an object (such as a file) from a repository
    
-   **codecommit:GetCommitsFromMergeBase**: Grants access to commits from the merge base of a branch
    
-   **codecommit:GetCommentsForPullRequest**: Allows retrieval of comments associated with a pull request
    
-   **codecommit:PostCommentReply**: Required to create a reply to a comment on a comparison between commits or on a pull request
    
-   **codecommit:UpdateComment**: Allows updating of comments on pull requests
    
-   **codecommit:PostCommentForPullRequest**: Required to post a comment on a pull request in a repository
    
-   **codecommit:GetComment**: Permits retrieval of a specific comment on a pull request
    
-   **codecommit:GetCommit**: Allows fetching details of a specific commit
    
-   **codecommit:GetDifferences**: Grants access to differences (changes) between commits, branches, and so on
    
-   **codecommit:BatchGetRepositories**: Enables batch retrieval of repository details
    
-   **codecommit:GetRepository:** Permits fetching details of a specific repository
    
-   **codecommit:ListRepositories**: Grants the ability to list repositories within an account
    
-   **codecommit:GetRepositoryTriggers**: Allows fetching of triggers configured for a repository
    
-   **codecommit:PutRepositoryTriggers:** Enables configuration of repository triggers
    
-   **codecommit:TestRepositoryTriggers**: Allows testing of repository triggers
    
-   **codecommit:GetTree**: Required to view the contents of a specified tree in a repository from the CodeCommit console. This is an IAM policy permission only, not an API action that you can call
    
-   **codecommit:GetReferences:** Permits fetching of references (branches, tags, etc.) in a repository
    
-   **codecommit:GetObjectIdentifier**: Grants access to object identifiers within a repository
    
-   **codecommit:GetCommitHistory**: Allows fetching of commit history for a repository
    
-   **codecommit:BatchGetPullRequests:** Required to return information about one or more pull requests in a repository. This is an IAM policy permission only, not an API action that you can call
    
-   **codecommit:BatchGetCommits**: Enables batch retrieval of commit details
    
-   **codecommit:GetCommentsForComparedCommit**: Required to return information about comments made on the comparison between two commits in a repository
    
-   **codecommit:PostCommentForComparedCommit**: Required to create a comment on the comparison between two commits in a repository
    
-   **codecommit:PostCommentReply:** Enables posting replies to comments on pull requests
    
-   **codecommit:ListPullRequests**: Required to return information about the pull requests for a repository
    
-   **codecommit:DeleteCommentContent:** Required to delete the content of a comment made on a change, file, or commit in a repository. Comments cannot be deleted, but the content of a comment can be removed if the user has this permission
    
-   **codecommit:CreateBranch**: Permits creation of branches within a repository
    
-   **codecommit:GetBranch**: Permits retrieval of branch details
    
-   **codecommit:CreateCommit**: Allows creation of commits in a repository
    
-   **codecommit:CreatePullRequest**: Enables creation of pull requests in a repository
    
-   **codecommit:PutFile**: Required to add a new or modified file to a repository from the CodeCommit console, CodeCommit API, or the AWS CLI
    
-   **codecommit:ListAssociatedApprovalRuleTemplatesForRepository**: Grants access to associated approval rule templates for a repository
    
-   **codecommit:ListApprovalRuleTemplates**: Allows listing of approval rule templates
    
-   **codecommit:GetApprovalRuleTemplate**: Required to return information about an approval rule template in an Amazon Web Services account
    
-   **codecommit:ListRepositoriesForApprovalRuleTemplate**: Permits listing of repositories associated with an approval rule template

### Azure DevOps
Integrate Cortex Cloud Application Security with your Azure DevOps version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This integration allows you to analyze, prioritize, and resolve detected issues efficiently.

System architecture overview: Cortex utilizes a secure Delegated Access Model, executing operations under the user's identity rather than an autonomous service account. This architecture supports multi-tenant configurations, allowing you to onboard organizations across distinct Microsoft Entra ID tenants using a single email identity. For more information, refer to Azure DevOps onboarding system architecture.

Before you begin:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   **Azure DevOps** permissions: Ensure the user performing the integration holds one of the following roles in Azure DevOps:
    
    -   Project Administrator: This permission is required to subscribe to webhooks. For more information, refer to the [Microsoft Integrate with service](https://learn.microsoft.com/en-us/azure/devops/service-hooks/overview?view=azure-devops#q-what-permissions-do-i-need-to-set-up-a-subscription) hook documentation
        
    -   Member of Project Collection Administrators: Required to subscribe to `build.complete` events and download the permissions report for CI/CD scans. As Organization owners are automatically part of this group, they also possess this permission
        
    
-   **Scope**: The Cortex application requires the following authorization scopes. These scopes are granted automatically when authorizing via Microsoft Entra ID. If you authenticate using a Personal Access Token (PAT), you must manually select these scopes during token creation
    
    **Note:**
    
    These required Cortex application permissions are displayed by Microsoft during authorization. Each permission includes a scope description, available from the dropdown next to it.
    
    | Scope | Description |
    | --- | --- |
    | `User.Read` | Sign in and read user profile |
    | `vso.agentpools` | Agent Pools (read) |
    | `vso.analytics` | Analytics (read) |
    | `vso.auditlog` | Audit Read Log |
    | `vso.build` | Build (read) |
    | `vso.code_write` | Code (read and write) |
    | `vso.entitlements` | Entitlements (Read) |
    | `vso.extension` | Extensions (read) |
    | `vso.graph` | Graph (read) |
    | `vso.identity` | Identity (read) |
    | `vso.memberentitlementmanage` | MemberEntitlement Management (read) |
    | `vso.packaging` | Packaging (read) |
    | `vso.project` | Project and team (read) |
    | `vso.release` | Release (read) |
    | `vso.serviceendpoint` | Service Endpoints (read) |
    | `vso.taskgroups_write` | Task Groups (read, create) |
    | `vso.tokens` | Delegated Authorization Tokens |
    | `vso.variablegroups_read` | Variable Groups (read) |
    | `vso.work_write` | Work items (read and write) |
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

###### Onboarding steps

**Step 1: Initiate in Cortex**

1.  In the Cortex Cloud tenant, navigate to Settings → Data Sources & Integrations → \+ Add New.
    
2.  Search for Azure DevOps, hover over it and click Add (or Add Another Instance if one already exists).
    

**Step 2: Select authentication method**

Select the method that aligns with your organization's security policy. Microsoft Entra ID is the recommended standard for long-term support.

**Option A: Authorize with Microsoft Entra ID (recommended)**

This method supports multi-tenant configurations.

1.  Select Microsoft Entra ID authentication → Authorize.
    
    **Important:**
    
    When redirected to the Microsoft login screen, do not immediately enter your email.
    
2.  Select Sign-in options → Sign in to an organization.
    
3.  Enter the specific Domain Name of the tenant you wish to onboard and click Next.
    
    **Note:**
    
    This forces Azure to bypass browser cookies and issue a token for the correct directory.
    
4.  Enter your Email address, review the requested scopes, and click Accept on the permissions prompt.
    

**Option B: Authorize with a Personal Access Token (PAT)**

1.  In Azure DevOps: Navigate to User Settings → Personal access tokens → \+ New Token.
    
2.  **Organization**: Select All accessible organizations.
    
3.  **Scopes**: Manually select all custom-defined scopes listed in the **Prerequisites** above.
    
4.  Copy and paste the generated token into the Access Token field in the Cortex onboarding wizard and click Authorize.
    

**Note:**

PATs are static. To onboard a different tenant, you must log in to that specific environment to generate a new token.

**Step 3: Configure repositories**

1.  Once authorized, you are redirected to the Select Repositories step.
    
2.  Select which repositories to scan from the Selection Options menu:
    
    -   Permit all existing repositories
        
    -   Permit all existing and future repositories (recommended)
        
    -   Choose from repository list
        
    
3.  Click Save.
    
4.  **Verification**:
    
    1.  On the Data Sources & Integrations page, search for Azure DevOps.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your instance and verify that the status of the instance is Connected.
        

###### Post-onboarding: subscribed events

Once successfully integrated, Cortex Cloud subscribes to the following events to trigger scans and notifications:

| Category | Event | Description |
| --- | --- | --- |
| Repositories | — | — |
| — | `git.pullrequest.created` | This event is triggered when a new pull request is created in a Git repository. It allows systems to be notified whenever a new pull request is initiated, enabling integration with other services or actions |
| — | `git.pullrequest.updated` | This event is triggered when an existing pull request is updated with new changes, comments, or other modifications. It allows systems to stay synchronized with the latest changes in pull requests |
| — | `git.push` | This event is triggered when new commits are pushed to a Git repository. It enables systems to track changes to the repository and perform actions such as triggering builds or running tests |
| — | `git.pullrequest.merged` | This event is triggered when a pull request is successfully merged into the target branch. It allows systems to take action after a pull request has been merged, such as deploying changes or updating related tasks |
| Organizations | — | — |
| — | `build.complete` | This event is triggered when a build process is completed within an Azure DevOps organization. It allows systems to react to the completion of build tasks, such as notifying stakeholders or triggering subsequent stages in a deployment pipeline |

**Validation**: You can validate the subscription by triggering an action in Azure DevOps and checking for a scan initiation. For example, to verify `git.push`: Push a commit to a connected repository. This should trigger a scan for secrets and IaC misconfigurations.

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

#### Azure DevOps onboarding system architecture
This topic details the authentication mechanisms, identity models, and multi-tenant data structures used by Cortex to integrate with Azure DevOps.

##### Authentication architecture

**Supported methods**

-   **Microsoft Entra ID (OAuth 2.0)**: The recommended standard for Cortex integrations, utilizing dynamic delegated tokens
    
    **Note:**
    
    Microsoft has announced the deprecation of legacy OAuth methods by 2026, making Entra ID the required standard for long-term support.
    
-   **Personal Access Tokens (PAT)**: A static token model where authentication is handled via a token generated directly within Azure DevOps. A PAT is cryptographically bound to the specific organization and user account active at the time of creation
    

**Global configuration**

-   **Ownership**: The Azure application used for OAuth is verified and owned by Cortex. It is registered in a fixed Cortex Microsoft Entra ID tenant that never changes
    
-   **Regional specificity**: To ensure regional compliance and performance, each Cortex region (such as US, EU) utilizes its own dedicated Azure application registration
    

##### The delegated execution and identity model

Cortex operates under a Delegated Access Model, distinguishing it from Service Principal or App-only access models.

**Secure conduit principles**

The Azure application registered by Cortex serves as the OAuth client and trusted identity, acting solely as a secure conduit to:

-   Authenticate the user
    
-   Obtain delegated access tokens
    
-   Call Azure DevOps APIs on behalf of that user
    

**Comparison: Cortex vs. GitHub Apps**

Unlike GitHub Apps, where the application becomes a first-class principal (autonomous actor) inside the customer environment, the Cortex Azure application **never operates independently** of a user’s delegated identity.

**Security and auditability**

-   **Permissions enforcement**: Every API call is evaluated using the user’s existing permissions. Cortex cannot exceed or bypass the access rights of the authenticated user. If a user lacks permission for an operation, the request is denied
    
-   **Audit trail**: In Azure DevOps audit logs, all activity appears as originating from the **individual user's identity**, not a Cortex-owned service account
    

##### Multi-tenant and multi-domain logic

Cortex employs a composite identifier logic to support complex organizational structures `[User Email]` + [`Microsoft Entra ID Tenant ID]`.

**Operational comparison: dynamic vs. manual**

The architectural difference between OAuth and PATs directly impacts onboarding effort.

-   **Entra ID (dynamic discovery)**: Because OAuth uses a dynamic tenant selection flow, a single authentication session can discover and connect multiple organizations tied to that tenant automatically
    
-   **Personal Access Token (PAT) (static/manual onboarding)**: A PAT lacks cross-organization visibility; it is strictly limited to the specific organization selected during its creation
    
    -   **Result**: Multi-tenant or multi-org onboarding via PAT is a strictly manual process. An administrator must generate and provide a unique PAT for every individual organization they wish to onboard
        
    

**The email + tenant logic**

-   **One email, multiple integrations**: A single user identity (email) can own multiple distinct integrations if they target different tenants (such as a Production tenant and a Sandbox tenant)
    
-   **Uniqueness constraint**: You cannot create two integrations for the same email on the same tenant
    
-   **Organization mapping**: Multiple Azure DevOps organizations can be mapped to a single integration if they reside under the same Entra ID tenant. Organizations in different tenants require separate integration instances
    
-   **PAT requirement**: Because a PAT is tied to a specific organization, users must provide a separate PAT for each organization they wish to onboard
    

**Architecture example**

The following scenario illustrates how Cortex maps users, tenants, and organizations. In this example, two Cortex integrations are created; one per email + tenant combination; even though the same user email is used across all environments.

**User email**: dev.user@company.com

**Microsoft Entra ID tenants**:

-   Tenant A (company.onmicrosoft.com)
    
-   Tenant B (subsidiary.onmicrosoft.com)
    

**Azure DevOps organizations**:

-   Org-1 → connected to Tenant A
    
-   Org-2 → connected to Tenant A
    
-   Org-3 → connected to Tenant B
    

**Resulting Cortex integrations**:

| **Cortex integration** | **Email** | **Entra ID tenant** | **Azure DevOps organizations** |
| --- | --- | --- | --- |
| Integration #1 | dev.user@company.com | Tenant A | Org-1, Org-2 |
| Integration #2 | dev.user@company.com | Tenant B | Org-3 |

##### User authorization and session handling

When using the recommended Microsoft Entra ID flow, Cortex redirects the user to the Microsoft identity platform: [https://login.microsoftonline.com/common/oauth2/v2.0/authorize](https://login.microsoftonline.com/common/oauth2/v2.0/authorize). To ensure security and multi-tenant accuracy, the architecture is designed to bypass standard browser session defaults.

Standard OAuth flow defaults to the user's last active session based on browser cookies. To prevent authorization against the wrong environment, Cortex enforces an explicit domain selection flow.

**Session Management**

-   **The problem**: Without architectural enforcement, Azure may automatically sign a user into their "Home" or "Last Used" directory, leading to token issuance for the wrong tenant
    
-   **The mechanism (explicit bypass)**: Users are directed to use the Sign-in option → Sign in to an organization workflow. By entering a specific Tenant ID or Domain, the user overrides cached browser credentials
    
-   **Result**: This ensures the authorization token is issued for the intended directory
    

**Consent**

After the explicit tenant selection and successful authentication, Microsoft prompts the user to consent to the requested scopes specifically for that tenant. This consent grant is what allows Cortex to act as a delegated agent, performing actions on the user's behalf.

##### Authorization scopes and event architecture

Cortex requires specific scopes to enable both API-based data retrieval and its event-driven architecture.

**Event subscription (Webhooks)**

Cortex subscribes to real-time events (such as `git.push`, `build.complete`) to trigger automated scans.

-   **Functional dependency**: There is no single **Webhook** permission in Azure DevOps. The ability to create subscriptions is derived from standard scopes
    
-   **Required scopes**:
    
    -   `vso.code_write`: Required for code-related events
        
    -   `vso.build`: Required for build-related events
        
    
-   **Impact**: Without these specific permissions, the event-driven architecture cannot function, and Cortex will revert to scheduled (polling) synchronization only

### Bitbucket Cloud

Integrate Bitbucket Cloud to scan for secrets, IaC misconfigurations, vulnerabilities, and license compliance to strengthen your VCS security posture.

Integrate Cortex Cloud Application Security with your Bitbucket Cloud version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This integration allows you to analyze, prioritize, and resolve detected issues efficiently.

###### How to integrate Bitbucket Cloud

**Prerequisite:**

Before you begin:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   In **Bitbucket**, grant the user performing the Cortex application authorization the following permissions. The level of access required depends on the modules you intend to use:
    
    -   For **code scanning**: The user must have `Write` access:
        
        -   **Workspace group with default repository access**: Add the user to a workspace group whose default repository access is set to `Write`
            
        -   **Repository permissions**: Ensure the user has `Write` permissions on each repository that the Cortex application needs to access: Go to Bitbucket > Repository Settings and grant the user write access to the relevant repositories
            
        
    -   **For CI/CD security module**: The user requires **Administrator** permissions for both **Projects** and **Repositories**
        
        **Note:**
        
        If you intend to use CI/CD security, you must grant Administrator access now to prevent integration errors later.
        
    
    For more information on Bitbucket Cloud permissions refer to the [Bitbucket Authentication](https://developer.atlassian.com/cloud/bitbucket/rest/intro/?branch=code-editor-not-limitation#authentication) methods documentation.
    
-   **Scope**: The Cortex application requires the following authorization scopes:
    
    Read more...
    
    -   **project**: Provides access to view the project or projects. This scope implies the repository scope, giving read access to all the repositories in a project or projects
        
    -   **repository**: Provides read access to a repository or repositories. Note that this scope does not give access to a repository’s pull requests. Includes 'access to the repo’s source code', 'clone over HTTPS', 'access the file browsing API', 'download zip archives of the repo’s contents', 'the ability to view and use the issue tracker on any repo (created issues, comment, vote, etc)', 'the ability to view and use the wiki on any repo (create/edit pages)'
        
    -   **repository:write**: Provides write (not admin) access to a repository or repositories. No distinction is made between public and private repositories. This scope implicitly grants the **repository** scope, which does not need to be requested separately. This scope alone does not give access to the pull requests API. Includes 'push access over HTTPS' and 'fork repos'
        
    -   **pullrequest**: Provides read access to pull requests. This scope implies the repository scope, giving read access to the pull request’s destination repository. Includes 'see and list pull requests', 'create and resolve tasks' and 'comment on pull requests'
        
    -   **pullrequest:write**: Implicitly grants the **pullrequest** scope and adds the ability to create, merge and decline pull requests. This scope also implicitly grants the **repository:write** scope, giving write access to the pull request’s destination repository. This is necessary to allow merging. Includes 'merge pull requests', 'decline pull requests', 'create pull requests' and 'approve pull requests'
        
    -   **issue**: The ability to interact with issue trackers the way non-repo members can. This scope doesn’t implicitly grant any other scopes and doesn’t give implicit access to the repository. Includes 'view, list and search issues', 'create new issues', 'comment on issues', 'watch issues' and 'vote for issues'
        
    -   **issue:write**: This scope implicitly grants the issue scope and adds the ability to transition and delete issues. This scope doesn’t implicitly grant any other scopes and doesn’t give implicit access to the repository. Includes 'transition issues' and 'delete issues'
        
    -   **webhook**: Gives access to webhooks. This scope is required for any webhook-related operation.
        
        This scope gives read access to existing webhook subscriptions on all resources the authorization mechanism can access, without needing further scopes. For example, a client can list all existing webhook subscriptions on a repository. The repository scope is not required. Existing webhook subscriptions for the issue tracker on a repo can be retrieved without the issue scope. All that is required is the webhook scope.
        
        To create webhooks, the client will need read access to the resource. For example, for issue:created, the client will need to have both the webhook and the issue scope. Includes 'list webhook subscriptions on any accessible repository, user, team, or snippet' and 'create/update/delete webhook subscriptions'
        
    -   **snippet**: Provides read access to snippets. No distinction is made between public and private snippets (public snippets are accessible without any form of authentication). Includes 'view any snippet' and 'create snippet comments'
        
    -   **email**: Ability to see the user’s primary email address. This should make it easier to use Bitbucket Cloud as a login provider for apps or external applications
        
    -   **account**: When used for:
        
        -   **user-related API**s: Gives read-only access to the user’s account information. Note that this doesn’t include any ability to change any of the data. This scope allows you to view the user’s: email addresses, language, location, website, full name, SSH keys, user groups
            
        -   **workspace-related API**s: Grants access to view the workspace’s: users, user permissions, projects
            
        
    -   **pipeline**: Gives read-only access to pipelines, steps, deployment environments and variables
        
    -   **pipeline:write**: Gives write access to pipelines. This scope allows a user to: stop pipelines, rerun failed pipelines, resume halted pipelines and trigger manual pipelines
        
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

###### Onboarding steps

1.  In the Cortex Cloud tenant.
    
    1.  Select Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for Bitbucket Cloud, hover over it, and click Add, or Add Another Instance if an instance is already onboarded.
        
    3.  Click Authorize on the Configure account step of the Bitbucket Cloud onboarding wizard.
        
        You are redirected to Bitbucket Cloud to authorize Cortex Cloud Application Security access.
        
2.  Authorize Cortex Cloud Application Security on Bitbucket Cloud: Review the requested permissions and then select Grant access.
    
    You are redirected to the Select Repositories step of the integration wizard.
    
3.  Choose the repositories to be connected to the instance:
    
    -   Permit all existing repositories
        
    -   Permit all existing and future repositories
        
    -   Select Choose from repository list and select repositories from the list
        
    
4.  Select Save to confirm the repository selection and then Close on the final step of the wizard.
    
    **Note:**
    
    Ensure that you receive the Instance Successfully Created message on this step, indicating successful instance creation.
    
5.  Verify integration:
    
    1.  On Data Sources & Integrations, search for Bitbucket Cloud.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your instance and verify that the status is Connected.
        
6.  Next step: View repository assets and mitigate detected issues.
    

###### Subscribed events

Below is a comprehensive list of events to which Cortex Cloud Application Security is subscribed (excluding events for the CI/CD module - see below). These events encompass various actions and changes occurring within your Bitbucket Cloud environment that trigger notifications and integrations with Cortex Cloud Application Security.

Read more...

-   **repo:push**: This event is triggered whenever a push operation occurs within a repository, indicating that new commits have been added or existing commits have been updated
    
-   **repo:fork**: This event occurs when a repository is forked, creating a copy of the original repository within the same or a different workspace
    
-   **repo:updated**: This event is triggered when there are updates or changes made to the repository settings or configuration
    
-   **repo:commit_comment_created**: This event occurs when a new comment is created on a commit within the repository
    
-   **repo:commit_status_created**: This event is triggered when a new status or check is created for a commit within the repository
    
-   **repo:commit_status_updated**: This event occurs when the status or check of a commit within the repository is updated
    
-   **issue:created**: This event is triggered when a new issue is created within the repository
    
-   **issue:comment_created**: This event occurs when a new comment is added to an existing issue within the repository
    
-   **issue:updated**: This event is triggered when an existing issue within the repository is updated or modified
    
-   **pullrequest:created**: This event occurs when a new pull request is created within the repository
    
-   **pullrequest:updated**: This event is triggered when an existing pull request within the repository is updated or modified
    
-   **pullrequest:fulfilled**: This event occurs when a pull request is fulfilled or merged into the target branch
    
-   **pullrequest:rejected**: This event is triggered when a pull request is rejected or closed without being merged
    

**Troubleshooting Instance Path Errors**

If your VCS instance shows an error with the message **Path was not approved in the egress**, you must ensure that your VCS organization's path is approved in the Cortex Gateway. For more information, refer to [Egress Configurations](https://docs-cortex.paloaltonetworks.com/r/Cortex/Cortex-Gateway-Administrator-Guide/Egress-configurations).

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

### Bitbucket Data Center
Integrate Cortex Cloud Application Security with your Bitbucket Data Center version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This integration allows you to analyze, prioritize, and resolve detected issues efficiently.

**Supported versions**: This integration supports Bitbucket Data Center and Data Center Server versions 8 and later.

###### How to integrate Bitbucket Data Center

**Prerequisite:**

Before you begin:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   In **Bitbucket**, grant the user performing the Cortex application authorization the following permissions:
    
    -   **Administrator** permissions for projects
        
    -   **Administrator** permissions for repositories
        
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

###### Onboarding steps

1.  **On Bitbucket Server**, create and copy a **Personal Access Token** (PAT).
    
    1.  Navigate to Bitbucket Server → Manage account → Account settings → Personal access tokens.
        
    2.  Provide a token name.
        
    3.  Select the Permissions scope.
        
        -   **Projects**: Administrator permissions
            
        -   **Repositories**: Administrator permissions
            
        
        **Note:**
        
        -   By default, the permissions of the access token are set according to your current access level. It is essential to define two levels of permissions, Project and Repository permissions. The Repository permissions inherit from Project permissions, requiring Repository permissions to match or exceed Project permissions
            
        -   Providing read and write permissions to the necessary repositories enables Cortex Cloud Application Security to copy files for scanning and access repository settings. This enables automated responses to pull requests, including creating fix PRs and adding comments
            
        
    4.  Select the Expire automatically option.
        
        **Note:**
        
        For additional security, it is recommended to set an expiry automatically. The expiry date of a token cannot be changed after it is created. You can see the expiry dates for all your tokens on Profile picture → Manage account → Personal access tokens.
        
    5.  Click Create.
        
    6.  Copy the generated token from the dialog.
        
    
    **Important:**
    
    Always refer to the [Bitbucket documentation](https://confluence.atlassian.com/bitbucketserver072/personal-access-tokens-1005335924.html) for information relating to creating a PAT.
    
2.  In the Cortex Cloud tenant.
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search forBitbucket Data Center, hover over it, and click Add, or Add Another Instance if an instance is already onboarded.
        
    3.  Enter your domain in the Configure Domain step of the wizard and click Next.
        
    4.  Optional: Connect a Transporter: Select your Broker VM and associated Transporter applet from the provided menus.
        
        **Note:**
        
        For more information about the Transporter, including setup instructions, refer to Transporter over Broker VM.
        
    5.  Click Next.
        
    6.  On the Create a Personal Access Token step of the wizard: Paste the Bitbucket PAT generated in **step 1** above in the provided field, and click Next.
        
    7.  Under Selection Options of the Select Repositories step of the wizard:
        
        -   Choose the repositories to be connected to the instance:
            
            -   Permit all existing repositories
                
            -   Permit all existing and future repositories
                
            -   Select Choose from repository list and select repositories from the list
                
            
        -   Click Save.
            
        
    8.  Click Close on the final step of the wizard.
        
        **Note:**
        
        Ensure that you receive the Instance Successfully Created message on this step, indicating successful instance creation.
        
3.  Verify integration:
    
    1.  On the Data Sources & Integrations page, search for Bitbucket Data Center.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your instance and verify that the status is Connected.
        
4.  Next step: View repository assets and mitigate detected issues.
    

###### Subscribed events

Below is a comprehensive list of events to which Cortex Cloud Application Security is subscribed. These events encompass various actions and changes occurring within your Bitbucket Data Center environment that trigger notifications and integrations with Cortex Cloud Application Security.

Read more...

-   **pr:merged**: This event occurs when a pull request is successfully merged into the repository
    
-   **pr:updated**: This event happens when the reviewer list for a pull request is updated
    
-   **pr:opened**: This event occurs when a new pull request is opened
    
-   **repo:added**: This event happens when a comment is added to the repository
    
-   **repo:forked**: This event occurs when a repository is forked
    
-   **repo:refs_changed**: This event happens when references in the repository are changed
    
-   **repo:edited**: This event occurs when a comment in the repository is edited
    
-   **pr:decline**d: This event occurs when a pull request is declined
    
-   **pr:deleted**: This event happens when a pull request is deleted
    
-   **pr:deleted**: This event occurs when a comment on a pull request is deleted
    
-   **repo:deleted**: This event happens when a comment in the repository is deleted
    
-   **pr:edited**: This event occurs when a comment on a pull request is edited
    
-   **pr:unapproved**: This event happens when a reviewer unapproves a pull request
    
-   **pr:modified**: This event occurs when a pull request is modified
    
-   **mirror:repo_synchronized**: This event occurs when a mirrored repository is synchronized
    
-   **pr:needs_work**: This event happens when a reviewer marks a pull request as needing work
    
-   **pr:approved**: This event occurs when a reviewer approves a pull request
    
-   **repo:modified**: This event occurs when the repository is modified
    
-   **pr:added**: This event occurs when a comment is added to a pull request
    

###### Subscribed events for the CI/CD module

These events are specific to the CI/CD module to which Cortex Cloud is subscribed. They encompass various actions and changes occurring within your CI/CD environment that trigger notifications and integrations with Cortex Cloud.

Read more...

| Event | Description |
| --- | --- |
| Project: proj:modified | This event occurs when a project undergoes modifications, such as changes to its name, description, or configuration settings. |
| Repository: repo:refs_changed | This event occurs when a push operation is performed, typically resulting in changes to the repository’s references. |
| Repository: repo:forked | This event occurs when a repository is forked, creating a separate copy of the repository under a different user or organization. |
| Repository: repomodified | This event occurs when the repository itself undergoes modifications, such as changes to its settings or configuration. |
| Repository: repoadded | This event occurs when a new comment is added to a commit within the repository. |
| Repository: repoedited | This event occurs when an existing comment on a commit is edited within the repository. |
| Repository: repodeleted | This event occurs when a comment on a commit is deleted within the repository. |
| Pull Request: pr:opened | This event occurs when a pull request is opened, indicating the initiation of a request to merge changes into the repository. |
| Pull Request: pr:from_ref_updated | This event occurs when the source branch of a pull request is updated with new changes. |
| Pull Request: pr:to_ref_updated | This event occurs when the target branch of a pull request is updated with new changes. |
| Pull Request: pr:modified | This event occurs when a pull request undergoes modifications, such as changes to its title, description, or metadata. |
| Pull Request: prupdated | This event occurs when the list of reviewers assigned to a pull request is updated. |
| Pull Request: prapproved | This event occurs when a reviewer approves a pull request. |
| Pull Request: prunapproved | This event occurs when a previously approved review on a pull request is revoked. |
| Pull Request: prneeds | This event occurs when a reviewer requests changes to be made to a pull request before it can be approved. |
| Pull Request: pr:merged | This event occurs when a pull request is successfully merged into the repository. |
| Pull Request: pr:declined | This event occurs when a pull request is declined or rejected, typically due to not meeting certain criteria or requirements. |
| Pull Request: pr:deleted | This event occurs when a pull request is deleted, either intentionally by a user or automatically due to certain conditions. |
| Pull Request: pradded | This event occurs when a new comment is added to a pull request. |
| Pull Request: predited | This event occurs when an existing comment on a pull request is edited. |
| Pull Request: prdeleted | This event occurs when a comment on a pull request is deleted. |

###### Rotate integration tokens

Rotate integration tokens to enhance security and prevent unauthorized access.

Create a **PUT** request: `PUT /code/api/v1/integration/token/&<integration_id>` with the following body:

```
{
"token": "new token"
}
```

To locate your integration ID:

1.  Under Cortex Cloud Application Security select Settings → Data Sources & Integrations.
    
2.  Hover over Bitbucket Data Center and click View Details.
    
3.  Select the required instance from the list and retrieve the cas_connector_id from the URL.
    

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

### GitHub Cloud
Integrate Cortex Cloud Application Security with your GitHub SaaS version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This integration allows you to analyze, prioritize, and resolve detected issues efficiently.

###### How to integrate GitHub SaaS

**Prerequisite:**

Before you begin:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   In GitHub, grant the user performing the Cortex application authorization the following permissions:
    
    -   **Organization Owner**: Only an Organization Owner can directly authorize and install the application
        
    
-   **Scope**: The Cortex application requires the following authorization scopes:
    
    -   **Read** access to Dependabot alerts, actions, actions variables, administration, deployments, discussions, metadata, packages, repository hooks, secret scanning alerts, secrets, and security events
        
    -   **Read and write** access to checks, code, commit statuses, issues, and pull requests
        
        **Note:**
        
        In contrast to GitLab SaaS , GitLab Self Managed (On-Prem) and Azure Repos, there is no individual record of each token used for authentication on the integrations page. However, Cortex Cloud Application Security retains and uses these tokens for necessary actions. Removing an integration will delete all associated tokens.
        
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

###### Onboarding steps

1.  On the Cortex Cloud tenant.
    
    1.  Select Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for GitHub (SaaS), hover over it and click Add, or Add Another Instance if an instance is already onboarded.
        
    3.  Click Authorize on the Configure account step of the GitHub SaaS onboarding wizard.
        
        You are redirected to your GitHub SaaS account in order to install and authorize Cortex AppSec), the GitHub App application handling the Cortex Cloud Application Security functionality.
        
2.  Install and authorize Cortex AppSec on GitHub SaaS.
    
    1.  Select your organization on which will be installed.
        
    2.  Select the repositories to be authorized.
        
    3.  Review the permissions granted the application.
        
    4.  Click Install & Authorize.
        
        You are redirected to the Select Repositories step of the GitHub SaaS installation wizard on the console.
        
        Refer to the [GitHub documentation](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party) for more on authorizing and installing GitHub SaaS Apps.
        
3.  On the Cortex XSIAM console.
    
    1.  Under Selection Options, choose the repositories to be connected to the instance:
        
        -   Permit all existing repositories
            
        -   Permit all existing and future repositories
            
        -   Select Choose from repository list and select repositories from the list
            
        
    2.  Click **Save**.
        
4.  Verify integration: On Data Sources, select Code Providers → GitHub SaaS → View more and confirm that the status of your integrated GitHub instance is 'Connected'.
    
5.  Verify integration and confirm that the your integrated GitHub SaaS instance has a status of Connected.
    
    1.  On Data Sources & Integrations, search for GitHub SaaS.
        
    2.  Hover over and select the resulting entry.
        
    3.  Verify that the status of your GitHub SaaS instance is Connected.
        
6.  View repository assets and mitigate detected issues.
    

###### Subscribed events

Below is a comprehensive list of events to which Cortex Cloud Application Security is subscribed. These events encompass various actions and changes occurring within your GitHub SaaS environment that trigger notifications and integrations with Cortex Cloud Application Security.

Read more...

| Event | Description |
| --- | --- |
| Create | Indicates the creation of a branch or tag |
| Commit comment | Refers to comments made on a commit or a 'diff' comment, which compares changes within a commit |
| Issues | Includes a wide range of actions such as opening, editing, deleting, transferring, pinning, unpinning, closing, reopening, assigning, unassigning, labeling, unlabeling, milestone management (milestoned, demilestoned), and locking or unlocking an issue |
| Public | Denotes changes made to a repository from private to public |
| Pull request | Represents actions related to pull requests, including assignment, enabling or disabling auto merge, closing, conversion to draft, demilestoning, dequeuing, editing, enqueuing, labeling, locking, milestone assignment, opening, readiness for review, reopening, removal of review requests, request for review, synchronization, unassignment, unlabeling, and unlocking |
| Pull request review comment | Indicates the creation, editing, or deletion of a comment on a pull request’s diff |
| Push | Refers to a Git push operation performed on a repository |
| Repository | Includes actions such as creation, deletion, archiving, unarchiving, publicizing, privatizing, editing, renaming, or transferring of a repository |

**Troubleshooting Instance Path Errors**

If your VCS instance shows an error with the message **Path was not approved in the egress**, you must ensure that your VCS organization's path is approved in the Cortex Gateway. For more information, refer to [Egress Configurations](https://docs-cortex.paloaltonetworks.com/r/Cortex/Cortex-Gateway-Administrator-Guide/Egress-configurations).

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

### GitHub Enterprise (On-Prem)
Integrate Cortex Cloud Application Security with your GitHub Enterprise (On-Prem) version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This integration allows you to analyze, prioritize, and resolve detected issues efficiently.

###### How to integrate GitHub Enterprise (On-Prem)

**Prerequisite:**

Before you begin:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   In **GitHub**, you must have Organization Owner permissions to install the Cortex application. Users with only repository-level admin permissions cannot complete the installation unless the organization explicitly allows non-owners to install GitHub Apps (in this instance the Cortex application)
    
-   **Scope**: The Cortex application requires the following authorization scopes:
    
    Read more...
    
    -   **repo**: Grants full access to public and private repositories, including read and write access to code, commit statuses, repository invitations, collaborators, deployment statuses, and the capability to subscribe the repository to receive new webhook notifications or events
        
        **Note:**
        
        In addition to repository-related resources, the repository scope also grants access to manage organization-owned resources, including projects, invitations, team memberships, and webhooks. This scope also grants the ability to manage projects owned by users
        
    -   **read:user**: Grants access to read a user’s profile data
        
    -   **read:repo_hook**: Grants read and ping access to hooks in public or private repositories
        
    -   **read:org**: Provides read-only access to organization membership, organization projects, and team membership
        
    -   **read:public_key:** Allows listing and viewing details for public keys
        
    -   **workflow**: Provides the ability to add and update GitHub Actions workflow files. Workflow files can be committed without this scope if the same file (with both the same path and contents) exists on another branch in the same repository. Workflow files can expose GITHUB_TOKEN, which may have a different set of scopes. For more information, refer to the [GitHub Actions Automatic token authentication](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token) token authentication documentation
        
    -   **admin:org_hook**: Grants read, write, ping, and delete access to organization hooks. Note: OAuth tokens will only be able to perform these actions on organization hooks created by the OAuth app. Personal access tokens will only be able to perform these actions on organization hooks created by a user
        
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    
-   To enable access from your environment to your Cortex Cloud tenant, add the applicable Cortex IP addresses to your allow list. This ensures that your network can receive inbound connections from Cortex Cloud when required.
    
    **Egress proxy IPs**
    
    Add the egress proxy IP addresses for your specific region to your allow list as follows.
    
    Read more...
    
    -   **AU (Australia)**
        
        -   34.151.83.236
            
        -   34.116.67.90
            
        
    -   **BR (Brazil)**
        
        -   34.151.223.178
            
        -   34.39.232.219
            
        
    -   **CA (Canada)**
        
        -   35.203.108.13
            
        -   35.203.101.16
            
        
    -   **CH (Switzerland)**
        
        -   34.65.108.153
            
        -   34.65.155.169
            
        
    -   **DE (Germany)**
        
        -   35.234.118.195
            
        -   34.89.183.45
            
        
    -   **EU (Europe)**
        
        -   34.147.107.51
            
        -   34.91.26.125
            
        
    -   **IN (India)**
        
        -   35.200.175.78
            
        -   34.93.9.198
            
        
    -   **ID (Indonesia)**
        
        -   34.128.126.138
            
        -   34.128.82.158
            
        
    
    -   **DL (Delhi)**
        
        -   34.131.41.243
            
        -   34.131.45.169
            
        
    -   **FA (France)**
        
        -   34.155.5.117
            
        -   34.155.41.247
            
        
    -   **IL (Israel)**
        
        -   34.165.33.165
            
        -   34.165.27.131
            
        
    -   **IT (Italy)**
        
        -   34.154.23.156
            
        -   34.154.186.12
            
        
    -   **JP (Japan)**
        
        -   35.200.3.131
            
        -   34.146.181.233
            
        
    -   **PL (Poland)**
        
        -   34.118.48.171
            
        -   34.116.202.235
            
        
    -   **PR (Puerto Rico)**
        
        -   35.224.117.2
            
        -   34.173.28.243
            
        
    -   **QT (Qatar)**
        
        -   34.18.34.118
            
        -   34.18.39.155
            
        
    
    -   **SA (Saudi Arabia)**
        
        -   34.166.61.81
            
        -   34.166.58.213
            
        
    -   **SG (Singapore)**
        
        -   35.240.243.57
            
        -   34.126.183.208
            
        
    -   **ZA (South Africa)**
        
        -   34.35.42.196
            
        -   34.35.79.219
            
        
    -   **KR (South Korea)**
        
        -   34.64.93.168
            
        -   34.64.237.45
            
        
    -   **ES (Spain)**
        
        -   34.175.46.46
            
        -   34.175.80.182
            
        
    -   **TW (Taiwan)**
        
        -   34.80.133.68
            
        -   35.234.18.10
            
        
    -   **UK (United Kingdom)**
        
        -   35.242.180.163
            
        -   34.105.173.229
            
        
    -   **US (United States)**
        
        -   34.132.108.184
            
        -   34.69.63.16
            
        
    

###### Onboarding steps

1.  In the Cortex Cloud tenant.
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for GitHub Enterprise (On-Prem), hover over it, and click Add, or Add Another Instance if an instance is already onboarded.
        
        Select Add Another Instance if the data source instance has already been configured.
        
    3.  Enter your domain in the Configure Domain step of the wizard.
        
        **Note:**
        
        The domain is the hostname associated with your GitHub Enterprise (On-Prem) instance.
        
    4.  Optional: Connect a Transporter: Select your Broker VM and associated Transporter applet from the provided menus.
        
        **Note:**
        
        For more information about the Transporter, including setup instructions, refer to Transporter over Broker VM.
        
    5.  Click Register.
        
        You are redirected to your GitHub Enterprise (On-Prem) instance to register Cortex AppSec as an OAuth application. Additionally, the Register OAUTH App step of the integration wizard is displayed.
        
    6.  Copy the Application Name, Homepage URL and Authorization Callback URL values from their respective fields.
        
2.  On the Register a new OAuth application screen of the GitHub Enterprise (On-Prem) console:
    
    1.  Paste the values copied in **step 1d** above in their respective fields.
        
    2.  Click Register application.
        
    3.  Once created, copy and save the the Client ID and Client Secret values for the new Cortex AppSec application.
        
        Click Authorize to complete the setup.
        
3.  On the Cortex Cloud console.
    
    1.  Select Next on the the Register OAUTH App step of the integration wizard.
        
        The Set Client ID and Secret step of the wizard is displayed.
        
    2.  Paste the Client ID and Client Secret values copied in _step 2c_ above, and click Authorize.
        
    3.  Under Selection Options of the Select Repositories step of the wizard, choose the repositories to be connected to the instance:
        
        -   Permit all existing repositories
            
        -   Permit all existing and future repositories
            
        -   Choose from repository list and select repositories from the list
            
        
    4.  Click Save.
        
    5.  Click Close on the final step of the wizard.
        
        **Note:**
        
        Ensure that you receive the Instance Successfully Created message on this step, indicating successful instance creation.
        
4.  Verify integration:
    
    1.  On the Data Sources & Integrations page, search for GitHub Enterprise (On-Prem).
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your instance and verify that the status of your GitHub Enterprise (On-Prem) instance is Connected.
        
5.  View repository assets and mitigate detected issues.
    

###### Subscribed events

The following list describes events that Cortex Cloud Application Security monitors on your GitHub Enterprise (On-Prem), covering actions and changes that trigger notifications and integrations.

-   **Repository** events: All events related to repositories
    
-   **Organization** events: Includes ['`organization`', `'membership`', '`team`'] events
    

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

### GitLab SaaS
Integrate Cortex Cloud Application Security with your GitLab SaaS version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This integration allows you to analyze, prioritize, and resolve detected issues efficiently.

###### How to integrate GitLab SaaS

**Prerequisite:**

Before you begin:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   In Gitlab, the following permissions are required to integrate the application:
    
    -   **Maintainer** (Project-level). Grants sufficient permissions to configure external integrations, manage repository access, and adjust CI/CD settings
        
    -   **Administrator** (Repository-level): Required to scan pull requests (PRs). This enables Cortex Cloud to set up subscription webhooks for the selected repositories
        
    
-   **Scope**: The Cortex application requires the following authorization scope:
    
    -   **api**: Grants full read and write access to the API, including all groups and projects, as well as permissions to interact with the container registry, the dependency proxy, and the package registry
        
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

###### Onboarding steps

1.  In the Cortex Cloud tenant.
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for GitLab (SaaS) , hover over it and click Add, or Add Another Instance if an instance is already onboarded.
        
    3.  Click Authorize on the Configure account step of the GitLab SaaS onboarding wizard.
        
        You are redirected to your GitLab SaaS account in order to install and authorize Cortex AppSec, the GitLab App application handling the Cortex Cloud Application Security functionality.
        
2.  On GitLab SaaS: Review the requested permissions and click Authorize Cortex AppSec.
    
    You are redirected to the Select Repositories step of the installation wizard on the console.
    
3.  On the Cortex Cloud console.
    
    1.  Under Selection Options, choose the repositories to be connected to the instance:
        
        -   Permit all existing repositories
            
        -   Permit all existing and future repositories
            
        -   Choose from repository list → select repositories from the list
            
        
    2.  Click Save.
        
        **Note:**
        
        A repository can only be integrated with a single instance. The first instance that connects with the repository will be the one that the repository is assigned to. This means that if multiple integrations attempt to connect to the same repository, only the first integration to establish the connection will be associated with that repository.
        
4.  Verify integration and confirm that the your integrated GitLab SaaS instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, search for GitLab SaaS in the search bar.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your instance and verify that the status of your GitLab SaaS instance is Connected.
        
5.  View repository assets and mitigate detected issues.
    

###### Subscribed events

Below is a comprehensive list of events to which Cortex Cloud Application Security is subscribed. These events encompass various actions and changes occurring within your GitLab SaaS environment that trigger notifications and integrations with Cortex Cloud Application Security:

Read more...

| Category | Event | Description |
| :-- | :-- | :-- |
| Projects | c | — |
| — | merge_requests_events | This event is triggered when merge or pull requests are created, updated, merged, closed, or have changes made to them |
| — | push_events | This event occurs whenever code changes are pushed to a repository, indicating new commits being added to the version control history |
| — | tag_push_events | This event is triggered when new tags are pushed to a repository |
| — | note_events | This event is generated when comments or notes are added to various objects within GitLab, such as issues, merge requests, or commits |
| — | confidential_note_events | Similar to note_events, but specifically for confidential comments or notes that are restricted to certain users or groups |
| — | issues_events | This event is triggered when issues are created, updated, closed, or have changes made to them |
| — | confidential_issues_events | Similar to issues_events, but specifically for confidential issues that are restricted to certain users or groups |
| — | job_events | This event occurs when jobs defined in CI/CD pipelines are created, updated, started, finished, or have changes made to them |
| — | pipeline_events | This event is generated when pipelines are created, updated, started, finished, or have changes made to them |
| — | wiki_page_events | This event occurs when changes are made to wiki pages within GitLab, including creation, updates, and deletions |
| — | deployment_events | This event is triggered when deployments are created, updated, started, finished, or have changes made to them |
| — | releases_events | This event occurs when releases are created, updated, published, or have changes made to them |
| Groups | — | — |
| — | subgroup_events | This event is specific to GitLab groups and occurs when changes are made to subgroups within a group hierarchy |

**Troubleshooting Instance Path Errors**

If your VCS instance shows an error with the message **Path was not approved in the egress**, you must ensure that your VCS organization's path is approved in the Cortex Gateway. For more information, refer to [Egress Configurations](https://docs-cortex.paloaltonetworks.com/r/Cortex/Cortex-Gateway-Administrator-Guide/Egress-configurations).

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

### GitLab Self Managed (On-Prem)
Integrate Cortex Cloud Application Security with your GitLab Self Managed (On-Prem) version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This integration allows you to analyze, prioritize, and resolve detected issues efficiently.

###### How to integrate GitLab Self Managed (On-Prem)

**Prerequisite:**

-   Authorize the user integrating Cortex Cloud Application Security with your GitLab Self Managed (On-Prem) instances with the following permissions:
    
    -   **Maintainer** permissions. Grants sufficient permissions to configure external integrations, manage repository access, and adjust CI/CD settings
        
    -   **api**: Grants full read and write access to the API, including all groups and projects, as well as permissions to interact with the container registry, the dependency proxy, and the package registry
        
    -   **Administrator repository permissions**: In order to scan pull requests (PRs), the user performing the integration must have administrative privileges for the repositories. This enables Cortex Cloud Application Security to set up subscription webhooks for the selected repositories
        
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

###### Onboarding steps

1.  In the Cortex Cloud tenant.
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for GitLab Self Managed (On-Prem) , hover over it, and click Add or Add Another Instance if an instance has already been onboarded.
        
    3.  Enter your domain in the Configure Domain step of the wizard and click Register.
        
        **Note:**
        
        The domain is the hostname associated with your GitLab Self Managed (On-Prem) instance.
        
        You are redirected to your GitLab Self Managed (On-Prem) instance register Cortex AppSec as an application. Additionally, the Register OAUTH App step of the integration wizard is displayed.
        
    4.  Optional: Connect a Transporter: Select your Broker VM and associated Transporter applet from the provided menus.
        
        **Note:**
        
        For more information about the Transporter, including setup instructions, refer to Transporter over Broker VM.
        
    5.  Copy the Application Name, Homepage URL and Authorization Callback URL values from their respective fields.
        
2.  On the GitLab Self Managed (On-Prem) console:
    
    1.  Access GitLab Self Managed (On-Prem) → User Settings → Applications.
        
    2.  Paste the values copied in **step 1d** above in their respective fields.
        
    3.  Select api as the application scope and then Save.
        
    4.  Once created, copy and save the generated Application ID and Secret values for the new Cortex AppSec application.
        
3.  On the Cortex Cloud console.
    
    1.  Select Next on the Register OAUTH App step of the wizard.
        
        The Set Client ID and Secret step of the wizard is displayed.
        
    2.  Paste the GitLab Self Managed (On-Prem) Application ID and Secret values copied in _step 2d_ above and click Next.
        
    3.  Under Selection Options of the Select Repositories step of the wizard, choose the repositories to be connected to the instance:
        
        -   Permit all existing repositories
            
        -   Permit all existing and future repositories
            
        -   Select Choose from repository list and select repositories from the list
            
        
    4.  Click Save.
        
    5.  Click Close on the final step of the wizard.
        
        **Note:**
        
        Ensure that you receive the Instance Successfully Created message on this step, indicating successful instance creation.
        
4.  Verify integration:
    
    1.  On the Data Sources & Integrations page, search for GitLab Self Managed (On-Prem).
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your instance and verify that the status of your GitLab Self Managed (On-Prem) instance is Connected.
        
5.  View repository assets and mitigate detected issues.
    

###### Manage GitLab Self Managed (On-Prem) integrations

To manage GitLab Self Managed (On-Prem) integrations, refer to Manage data source integrations.

###### Subscribed events

Below is a comprehensive list of events to which Cortex Cloud Application Security is subscribed. These events encompass various actions and changes occurring within your GitLab Self Managed (On-Prem) environment that trigger notifications and integrations with Cortex Cloud Application Security.

Read more...

| Category | Event | Description |
| --- | --- | --- |
| Projects | — | — |
| — | merge_requests_events | This event is triggered when merge or pull requests are created, updated, merged, closed, or have changes made to them |
| — | push_events | This event occurs whenever code changes are pushed to a repository, indicating new commits being added to the version control history |
| — | tag_push_events | This event is triggered when new tags are pushed to a repository |
| — | note_events | This event is generated when comments or notes are added to various objects within GitLab, such as issues, merge requests, or commits |
| — | confidential_note_events | Similar to note_events, but specifically for confidential comments or notes that are restricted to certain users or groups |
| — | issues_events | This event is triggered when issues are created, updated, closed, or have changes made to them |
| — | confidential_issues_events | Similar to issues_events, but specifically for confidential issues that are restricted to certain users or groups |
| — | job_events | This event occurs when jobs defined in CI/CD pipelines are created, updated, started, finished, or have changes made to them |
| — | pipeline_events | This event is generated when pipelines are created, updated, started, finished, or have changes made to them |
| — | wiki_page_events | This event occurs when changes are made to wiki pages within GitLab, including creation, updates, and deletions |
| — | deployment_events | This event is triggered when deployments are created, updated, started, finished, or have changes made to them |
| — | releases_events | This event occurs when releases are created, updated, published, or have changes made to them |
| Groups | — | — |
| — | subgroup_events | This event is specific to GitLab groups and occurs when changes are made to subgroups within a group hierarchy |
| System | repository_update_events | This event occurs whenever there are updates or changes made to a GitLab repository, including actions such as new commits, branch operations, tag updates, and modifications to repository settings |

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

## Onboard CI/CD systems
Onboard CI/CD systems to scan for configuration threats in your organization's instance, pipelines, and individual repositories. By onboarding supported version control systems (such as GitHub and GitLab) , you gain out-of-the-box CI/CD scanning capabilities. However, you must explicitly onboard CircleCI and Jenkins to enable scanning for these systems.

### CircleCI for CI/CD pipeline scans
Integrate Cortex Cloud Application Security CI/CD Security with your CircleCI system to enable automated and continuous scanning of your CI/CD pipelines. This integration provides proactive security checks, triggered by pipeline events or configuration changes, ensuring security issues are detected and remediated throughout the entire deployment lifecycle.

Pipeline scans are executed using the Cortex CLI, and include automated actions based on scan results to enforce security policies and prevent vulnerable deployments.

**Note:**

-   This integration utilizes a Personal Access Token (PAT) for authentication
    
-   CircleCI onboarding offers both code and CI/CD scanning. A single integrated instance supports either code or CI scanning, but not both. If you require both code and CI scanning for your CircleCi environment, you must create two separate integrations, selecting the appropriate scanning type for each. To onboard CircleCI for code scans, refer to CircleCI for code scans
    

**Prerequisite:**

Before you begin:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   **CircleCI user requirements**:
    
    -   **Permissions**: To enable Cortex Cloud visibility for all CircleCI projects, a version control system (VCS) user with integration permissions must be authorized (For example, Organization Owner permissions are required to onboard GitHub SaaS, while in GitLab SaaS you must be a Maintainer). This is because CircleCI's user base integrates with the VCS, inheriting its user permissions. For example, if a GitHub user has access to specific organizations and repositories, these entities are visible and available in CircleCI
        
    -   Best practice: Create a dedicated VCS user to integrate CircleCI with Cortex Cloud, to prevent the integration breaking if the user leaves the organization
        
    -   Ensure that the dedicated user follows all the organization’s projects in CircleCI
        
    -   Create a personal API token in CircleCI (see step 1 below). This is required to allow reading the configurations from CircleCI for all projects the user has access to
        
    

###### Onboarding steps

1.  Generate a personal API token on CircleCI.
    
    1.  Login to your CircleCI instance with your VCS user credentials.
        
    2.  Create and save a personal API token. For more information about CircleCI tokens, refer to [https://circleci.com/docs/managing-api-tokens/#creating-a-personal-api-token](https://circleci.com/docs/managing-api-tokens/#creating-a-personal-api-token).
        
2.  On the Cortex Cloud console:
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for and hover over CircleCI and click Add, or Add Another Instance if an instance is already onboarded.
        
    3.  On the Select Integration step of the integration wizard, select CI/CD System Scan → Next.
        
    4.  On the Enable CI/CD system scanning step of the integration wizard:
        
        1.  Enter an instance name: This can be any name you choose; it serves as an alias for your integration.
            
        2.  Paste the CircleCI personal API token that you generated in step 1 above → Done.
            
    5.  Verify that the Instance Successfully Created message is displayed in the last step of the wizard and click Close.
        
3.  Verify integration and confirm that the your integrated CircleCI instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, locate CircleCI.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your CircleCI instance and verify that the status is Connected and that Pipeline Risks is the instance type.
        
4.  Next step: View scan results and mitigate issues.
    

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

### Jenkins for CI/CD pipeline scans
Integrate Cortex Cloud Application Security CI/CD Security with your Jenkins servers to enable automated and continuous scanning of your CI/CD pipelines. This integration provides proactive security checks, triggered by pipeline events or configuration changes, ensuring security issues are detected and remediated throughout the entire deployment lifecycle.

Pipeline scans are executed using the Cortex CLI, and include automated actions based on scan results to enforce security policies and prevent vulnerable deployments.

**Note:**

Jenkins onboarding offers both code and CI/CD scanning. A single integrated instance supports either code or CI scanning, but not both. If you require both code and CI scanning for your Jenkins servers, you must create two separate integrations, selecting the appropriate scanning type for each. To onboard Jenkins for code scans, refer to Jenkins for code scans.

**Danger:**

Prerequisite

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   In **Jenkins**:
    
    -   To install and configure the Cortex plugin in Jenkins, you must be a Jenkins Administrator with **Overall/Administer** permissions
        
    -   Ensure the build server allows outbound HTTPS (`Port 443` traffic to the Cortex API URL
        
    

###### Onboarding steps

1.  On the Cortex Cloud console:
    
    1.  Select Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for and hover over Jenkins and click Add, or Add Another Instance if an instance is already onboarded.
        
2.  On the Select Integration step of the wizard, select CI/CD System Scan → Next.
    
3.  On the Create Instance step of the integration wizard: Provide a Jenkins plugin connector name → Next.
    
4.  On the Plugin installation step of the wizard:
    
    1.  Click Download to download the Cortex Cloud Application Security Jenkins `Cortex.Cloud.hpi` plugin file.
        
    2.  Copy and save the generated **JWT** token.
        
    3.  Click Done.
        
        **Note:**
        
        The integration is added on the console but integration is pending, and will only be completed after completing step 5 below. You can view the pending integration on the Jenkins Instances page: Select Data Sources → Jenkins → View Details. The type of integration is Pipeline Risks
        
5.  Install and configure the Cortex Cloud plugin on your Jenkins server:
    
    1.  Open Jenkins and select: Manage Jenkins → Plugins (under System Configuration) → Advanced settings.
        
    2.  Select Choose File (under the Deploy Plugin section) → browse for the Cortex.Cloud Plugin.hpi file → Upload → Deploy.
        
    3.  Configure the plugin:
        
        1.  Open Jenkins → Select Manage Jenkins → System (under System Configuration) → Cortex Cloud.
            
        2.  Fill in the provided fields:
            
            -   Cortex JWT Token: Paste the JWT token copied in _step 4b_ above.
                
            -   Cortex Reports Recurrence Period (Value: minutes): The frequency with which reports are generated. We recommend that you do not change the default value
                
            
        3.  Click Save.
            
            The Cortex Cloud Application Security plugin is integrated with your Jenkins system.
            
6.  Verify integration and confirm that the your integrated Jenkins instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, search for Jenkins.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate and verify that the status of your instance is Connected.
        
7.  Next step: View scan results and mitigate issues.
    

**Note:**

Always refer to the official [Jenkins documentation](https://www.jenkins.io/doc/book/managing/plugins/) when installing plugins on Jenkins servers.

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

## Integrate CI tools
By integrating CI tools, you get two main benefits: code scans and streamlined security workflows. This is achieved by inserting code snippets directly into your existing CI workflows, which then use the Cortex CLI to trigger automated security checks. This integration enables the platform to scan and detect exposed secrets, misconfigurations in your infrastructure-as-code (IaC) files, vulnerabilities in your Software Composition Analysis (SCA) packages and license non-compliance within your CI/CD pipelines.

You can integrate your CI tools and systems through the platform wizard or by directly adding a code snippet to your pipelines in supported systems.

### Integrate CI tools via the tenant UI wizard

Cortex Cloud Application Security supports the following CI tools for onboarding via the UI wizard:

-   AWS CodeBuild
    
-   CircleCI for code scans (For CircleCI CI/CD pipeline scans, refer to CI/CD)
    
-   Cortex CLI. For information about using the Cortex CLI, refer to Cortex CLI
    
-   GitHub Actions
    
-   Jenkins for code scans (For Jenkins CI/CD pipeline scans, refer to CI/CD)
    
-   Terraform Cloud (Run Tasks)Terraform Cloud (Run Tasks)
    
-   Terraform Enterprise (Run Tasks)Terraform Enterprise (Run Tasks)
    

#### Manage CI Tools

To access CI tool management, navigate to Settings → Data Sources & Integrations → hover over a CI tool → View Details.

You can perform the following actions on CI tools:

-   **Delete an instance**: Right-click on an instance of the CI tool → Delete instance → Delete
    
-   **Remove a connected repository**: Select an instance of the CI → right-click on a repository → Remove Repository
    
-   **Select the repository branches** to be scanned: Select an instance of the CI → right-click on a repository → Set Scanned Branches → select a branch/multiple branches → Save
    
-   Perform a **manual scan** of the repository: Select an instance of the CI → right-click on a repository → Scan Repository

### AWS CodeBuild
Integrate Cortex Cloud Application Security with your AWS CodeBuild instance to allow dynamic, automated, and context-specific scans within your development workflow. This includes continuous scanning of your workflow whenever changes are pushed or triggered, integrating security checks, and catching issues as soon as they are introduced. Additionally, it automates shift-left actions such as notifying developers or creating tickets, based on scan results.

**Prerequisite:**

Before you begin:

-   **User permissions**: Ensure the user performing the integration has permissions to edit pipeline configurations (such as YAML files) and manage secrets/credentials within the CI platform to store the Cortex Cloud API key securely
    

###### Onboarding steps

1.  On the Cortex Cloud console:
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for and hover over AWS CodeBuild, and click Add, or Add Another Instance if an instance is already onboarded.
        
    3.  On the Add Environment Variables step of the AWS CodeBuild integration wizard.
        
        1.  Select Generate API key.
            
            The API key secret and API key ID values are generated and populate their respective fields.
            
        2.  Select the system architecture that your tool runs on.
            
        3.  Click Next.
            
2.  Store your generated Cortex Cloud API key and API key ID in AWS Secrets Manager.
    
    -   If you have an API key.
        
        1.  Copy the CORTEX_API_KEY and CORTEX_API_KEY_ID variable names from their respective fields in the wizard.
            
        2.  Add the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values as separate environment variables (secrets) to the AWS Secrets Manager.
            
        
    -   If you do not have an API key:
        
        1.  Click Generate API key → Copy the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values from their respective fields.
            
        2.  Add the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values as separate environment variables (secrets) to the AWS Secrets Manager.
            
        
    
    **Note:**
    
    Do not change the names of the environment variables provided by Cortex Cloud. They are required for proper integration and functionality.
    
    For more information on storing secrets in AWS Secrets Manager, refer to [AWS Secrets Manager Documentation](https://docs.aws.amazon.com/secretsmanager/).
    
3.  Grant the **IAM service role** associated with your AWS CodeBuild project the necessary permissions to read the Cortex Cloud API key and Cortex Cloud API key ID from AWS Secrets Manager.
    
4.  Copy and paste the pre-populated sample code from the Configure Subscription step of the integration wizard into your `buildspec.yaml` configuration.
    
    **Note:**
    
    The code is only a reference. Replace the placeholder values with your build-specific values.
    
5.  Select Done in the wizard.
    
6.  Ensure that the **Connector Created Successfully** message is displayed in the final step of the wizard, and click **Close**.
    
7.  Verify integration and confirm that the your integrated AWS CodeBuild instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, search for AWS CodeBuild in the search bar.
        
    2.  Hover over the resulting entry and click View Details.
        
    3.  Verify that the status of your AWS CodeBuild instance is Connected.
        
8.  Next step: View scan results and mitigate issues.
    

###### AWS CodeBuild code scan workflow template

This AWS CodeBuild workflow example automates code scanning using the Cortex CLI. The workflow contains placeholder values (often in brackets) and generic terms (such as dev) that you must replace with your environment-specific information before use.

```
version: 0.2

env:
  variables:
    CORTEX_API_URL: "https://api-viso-hdkbzk6qphxpbehy758elo.xdr-qa2-uat.us.paloaltonetworks.com"
    CORTEX_CLI_VERSION: "0.8.11"
  secrets-manager:
    CORTEX_API_KEY: "CORTEX_API_KEY"
    CORTEX_API_KEY_ID: "CORTEX_API_KEY_ID"

phases:
  install:
    runtime-versions:
      docker: 19
    commands:
      - echo "Installing dependencies"
      - yum -y update
      - yum -y install jq curl

  pre_build:
    commands:
      - echo "Fetching temporary token"
      - |
        export TOKEN_RESPONSE=$(curl --location "${CORTEX_API_URL}/public_api/cas/v1/cortex-cli/create-token" \\
                                 --header "Authorization: ${CORTEX_API_KEY}" \\
                                 --header "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
                                 --header "Content-Type: application/json" \\
                                 --data "{}" -s)
      - export TEMP_TOKEN=$(echo "$TOKEN_RESPONSE" | jq -r '.token')
      - echo "Temporary token fetched"

      - echo "Pulling Docker image"
      - docker pull --platform linux/arm64 distributions-dev.traps.paloaltonetworks.com/cli-docker/${TEMP_TOKEN}/method:arm64-${CORTEX_CLI_VERSION}-dev

      - echo "Tagging Docker image"
      - docker tag distributions-dev.traps.paloaltonetworks.com/cli-docker/${TEMP_TOKEN}/method:arm64-${CORTEX_CLI_VERSION}-dev cortexcli:${CORTEX_CLI_VERSION}

      - echo "Setting Extra Environment Variables"
      - |
        export CODEBUILD_ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)
        export CODEBUILD_GIT_BRANCH="$(git symbolic-ref HEAD --short 2>/dev/null)"
        if [ "$CODEBUILD_GIT_BRANCH" = "" ] ; then
          export CODEBUILD_GIT_BRANCH="$(git rev-parse HEAD | xargs git name-rev | cut -d' ' -f2 | sed 's/remotes\\/origin\\///g')"
        fi
        export CODEBUILD_PROJECT=${CODEBUILD_BUILD_ID%:$CODEBUILD_LOG_PATH}

        echo "==> AWS CodeBuild Extra Environment Variables:"
        echo "==> CODEBUILD_ACCOUNT_ID = $CODEBUILD_ACCOUNT_ID"
        echo "==> CODEBUILD_GIT_BRANCH = $CODEBUILD_GIT_BRANCH"
        echo "==> CODEBUILD_PROJECT = $CODEBUILD_PROJECT"

  build:
    commands:
      - echo "Running Docker container"
      - |
        docker run --rm --platform linux/arm64 cortexcli:${CORTEX_CLI_VERSION} \\
                   --api-base-url ${CORTEX_API_URL} \\
                   --api-key ${CORTEX_API_KEY} \\
                   --api-key-id ${CORTEX_API_KEY_ID} \\
                   code scan \\
                   --directory . \\
                   --repo-id $CODEBUILD_ACCOUNT_ID/$CODEBUILD_PROJECT \\
                   --branch $CODEBUILD_GIT_BRANCH
```

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

### CircleCI for code scans
Integrate Cortex Cloud Application Security with your CircleCI system to allow dynamic, automated, and context-specific code scans across your codebase. This integration provides continuous scanning of your workflows, triggered by code changes or pipeline events, ensuring security checks are performed and issues are detected as early as possible.

Code scans are executed using the Cortex CLI, and include automated shift-left actions based on scan results.

**Note:**

CircleCI onboarding offers both code and CI/CD scanning. A single integrated instance supports either code or CI scanning, but not both. If you require both code and CI scanning for your CircleCi environment, you must create two separate integrations, selecting the appropriate scanning type for each. To onboard CircleCI for CI/CD scans, refer to CircleCI for CI/CD pipeline scans.

**Prerequisite:**

Before you begin:

-   **User permissions**: Ensure the user performing the integration has permissions to edit pipeline configurations (such as YAML files) and manage secrets/credentials within the CI platform to store the Cortex Cloud API key securely
    

###### Onboarding steps

1.  On the Cortex Cloud console:
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Enter CircleCI in the search bar → Hover over the displayed search result → Connect.Search for and hover over CircleCI and click Add, or Add Another Instance if an instance is already onboarded.
        
2.  On the Select Integration step of the CircleCI integration wizard, select Code Scan → Next.
    
3.  On the Add Environment Variables step of the wizard.
    
    1.  Select Generate API key.
        
        The API key secret and API key ID values are generated and populate their respective fields.
        
    2.  Select your system architecture.
        
    3.  Click Next.
        
4.  Create a context in CircleCI and name it cortex-secrets.
    
    **Important:**
    
    The cortex-secrets naming convention for the context is mandatory to ensure functionality and must not be changed.
    
5.  Store your Cortex Cloud API Key and API ID within the cortex-secrets context.
    
    -   If you have an API key:
        
        1.  Copy the CORTEX_API_KEY and CORTEX_API_KEY_ID variable names from their respective fields in the wizard.
            
        2.  Add the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values as separate environment variables (secrets) to the cortex-secrets context.
            
        
    -   If you do not have an API key:
        
        1.  Click Generate API key → Copy the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values from their respective fields.
            
        2.  Add the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values as separate environment variables to the cortex-secrets context.
            
        
    
    **Note:**
    
    Do not change the names of the environment variables provided by Cortex Cloud. They are required for proper integration and functionality.
    
    For more information on context in CircleCI, refer to [Using contexts in CircleCI](https://circleci.com/docs/contexts/).
    
6.  Copy and paste the pre-populated code from the Configure Job step of the integration wizard into your `.circleci/config.yaml` file, and click Done.
    
7.  In your `.circleci/config.yaml` file:
    
    -   Verify that the YAML file includes a Docker container image
        
    -   Verify that the context is `cortex-secrets`
        
    -   In the `docker run` command, replace `--repo-id REPO_OWNER/REPO_NAME` values with your repository owner and repository name
        
    
8.  Check that the The integration will be created once CircleCI authorizes message is displayed in the final step of the wizard and click Close .
    
9.  Verify integration and confirm that the your integrated CircleCI instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, search for CircleCI in the search bar.
        
    2.  Hover over and select the resulting entry.
        
    3.  Verify that the status of your CircleCI instance is Connected.
        
10.  Next step: View scan results and mitigate issues.
     

###### CircleCI code scan workflow template

This circle workflow example automates code scanning using the Cortex CLI. The workflow contains placeholder values (often in brackets) and generic terms (such as dev) that you must replace with your environment-specific information before use

```
version: 2.1

executors:
  docker-executor:
    docker:
      - image: cimg/base:stable  # Replace with a suitable image or executor
    environment:
      CORTEX_API_URL: "https://{CORTEX_URL}
      CORTEX_CLI_VERSION: "0.8.11"

jobs:
  setup-environment:
    executor: docker-executor
    steps:
      - checkout
      - setup_remote_docker
      - run:
          name: Get Temporary Token and Pull Docker Image
          command: |
            export TOKEN_RESPONSE=$(curl --location "${CORTEX_API_URL}/public_api/cas/v1/cortex-cli/create-token" \\
                                        --header "Authorization: ${CORTEX_API_KEY}" \\
                                        --header "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
                                        --header "Content-Type: application/json" \\
                                        --data "{}" -s)
            export TEMP_TOKEN=$(echo "$TOKEN_RESPONSE" | jq -r '.token')
            docker pull distributions-dev.traps.paloaltonetworks.com/cli-docker/${TEMP_TOKEN}/method:amd64-${CORTEX_CLI_VERSION}-dev
            docker tag distributions-dev.traps.paloaltonetworks.com/cli-docker/${TEMP_TOKEN}/method:amd64-${CORTEX_CLI_VERSION}-dev cortexcli:${CORTEX_CLI_VERSION}
      - run:
          name: Run Cortex CLI Container
          # Replace owner/repo with your actual repository information
          command: |
            docker run --rm cortexcli:${CORTEX_CLI_VERSION} \\
                        --api-base-url ${CORTEX_API_URL} \\
                        --api-key ${CORTEX_API_KEY} \\
                        --api-key-id ${CORTEX_API_KEY_ID} \\
                        code scan \\
                        --directory . \\
                        --repo-id <REPLACE WITH REPO_OWNER/REPO_NAME> \\
                        --branch "${CIRCLE_BRANCH}"

workflows:
  version: 2
  build:
    jobs:
      - setup-environment:
          context: cortex-secrets
```

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

### Connect Cortex CLI
Connect Cortex CLI to scan supported Cortex Cloud modules and gain insights into your security posture, enabling you to identify, analyze and address potential risks.

**Prerequisites:**

-   **System requirements**:
    
    -   **macOS** (Intel Core i7, such as Sequoia): To ensure all functionalities work correctly, you must install the `vectorscan` dependency via **Homebrew**, using this command: `brew install vectorscan`
        
    -   **RHEL 8.10** and **Red Hat UBI9**. The following prerequisites must be met:
        
        -   Install `patchelf`
            
        -   Install `zstd`
            
        
    -   **Ubuntu 20** requires the `prefetch` utility
        
    -   **Ubuntu (for linux-amd64)** also requires the `libhyperscan5` library. To install, run `sudo apt install libhyperscan5`
        
    -   **Linux for AppSec Module**: Support is provided for systems meeting the following specifications:
        
        -   **RHEL 10**: Kernel: 6.12, glibc: 2.39
            
        -   **Debian 12**: Kernel: 6.1.27, glibc: 2.36
            
        -   **Ubuntu**:
            
            -   Version 18.04 - Kernel: 4.15, glibc: 2.27
                
            -   Version 20.04 - Kernel: 5.4, glibc: 2.31
                
            -   Version 22.04 - Kernel: 5.15, Glibc: 2.35
                
            -   Version 24.04 - Kernel: 6.8, Glibc: 2.39
                
            
        
    -   Windows: AMD 64 and ARM 64
        
    
-   **For cURL-based downloads**:
    
    -   `curl`
        
    -   `jq`
        
        -   On **Ubuntu/Debian-based Linux** distributions: `sudo apt-get install jq`
            
        -   On **RedHat/CentOS/Fedora**: `sudo yum install jq`
            
        -   **macOS** (using `Homebrew`): `brew install jq`
            
        -   **Windows**:
            
            -   Download the executable from [jq GitHub releases](https://github.com/stedolan/jq/releases)
                
            -   If `Chocolatey` is installed: `choco install jq`
                
            
        
    
-   **Permissions**:
    
    -   **With upload results**: Requires a role with `CLI View/Edit` (write) permissions.
        
    -   **Local scan only**: Requires a role with `CLI Read Only` (read-only) permissions
        
    
    For more information refer to Cortex CLI.
    
-   **Roles**: There are no out-of-the-box CLI roles. The CLI authenticates via an API key. Ensure the API key associated with your role includes the required permissions
    
-   **API Security level**: The API key must be set to the `Standard` security level. CLI scans will fail if the security level is set to `Advanced`
    
-   **Best practice** (required for SCA vulnerability suppression):
    
    -   Run the CLI within your current working directory (<current_directory_path>). It is recommended to use the absolute file path for your current working directory
        
    -   Ensure that the `--repo-id` parameter includes the `<repo_owner_name>/<repo_name>` structure, with the `<repo_name>` matching the exact name of the directory
        
        Example 93. Example
        
        The present working directory is `Users/test/<repo_name>`. Therefore, the `--repo-id` parameter must be `--repo-id <repo_owner_name>/<repo_name>`, ensuring that `<repo_name>` precisely matches the directory name within the structure.
        
          
        
    -   For terminal actions performed by Cortex Cloud IDE extensions on Windows, Command Prompt (CMD) is the supported environment. PowerShell is not supported for these actions
        
    

1.  On your tenant:
    
    1.  Navigate to Settings → Data Sources → \+ Data Source.
        
    2.  Enter Cortex CLI in the search bar → Hover over the Cortex CLI card → Connect or Connect Another Instance.
        
2.  On the Configure step of the integration wizard.
    
    1.  Select your operating system from the menu.
        
    2.  Download the CLI binary: copy (or download) the command provided in the wizard and paste into your terminal.
        
    3.  Click Next.
        
        The Authenticate step of the wizard is displayed.
        
3.  On The Authenticate step of the wizard.
    
    1.  Generate an API:
        
        1.  Select Generate API key.
            
            -   This option creates a CLI role for the API key with CLI View/Edit options. It is recommended as it grants the API key permissions to not only access data, but also to upload or send data back
                
            -   If you do not select this option, the generated API key creates a CLI Read Only role with CLI View permissions only
                
            
            **Note:**
            
            The Cortex CLI requires an API key with the `Standard` security level.
            
        2.  Copy the the generated `API Key ID` and `API key` that are displayed in their respective fields.
            
        3.  Copy and save the the generated API key from the Retrieve your API key field.
            
            A code command is generated and displayed.
            
        4.  Verify that the generated API key is displayed under the API Keys inventory.
            
    2.  Download and save the CLI tool to your system:
        
        1.  Copy or download the provided code.
            
            **Note:**
            
            On macOS arm 64 architecture you must unpack the downloaded file to retrieve the executable.
            
        2.  Replace `${API_KEY}` in the code with your API key.
            
        3.  Retrieve and paste the Cortex Cloud public API URL in the code: Navigate to Settings → API Keys (under Configurations) → click Copy API URL .
            
    3.  Run the command in your terminal.
        
    4.  Click Done.
        
4.  Make the `cortexcli` file executable: run `chmod +x cortexcli`.
    

**Note:**

To add an additional CLI instance, navigate to Settings → Data Sources → select the menu for your connected CLI instance → \+ New Instance, and repeat the onboarding steps.

#### Download and run the Cortex CLI

1.  Download the CLI: Run `curl -k -u $CORTEX_API_ID::$CORTEX_API_KEY --output ./cortexcli $CORTEX_FQDN/api/v2/remote-li/{version}/{platform}/artifacts`
    
2.  Execute the CLI: Run `chmod +x cortexcli`.
    
3.  Verify installation: Run `cortexcli -v`.
    
    The CLI version is displayed.
    

#### Authentication

You can authenticate the Cortex CLI using one of two methods: command-line flags or an environment configuration file.

-   **Using command-line flags**: Provide your API credentials and base URL directly in the command using the following flags
    
    -   `--api-base-url`: [$CORTEX_API_BASE_URL]
        
    -   `--api-key`: [$CORTEX_API_KEY]
        
    -   `--api-key-id` [$CORTEX_KEY_ID]
        
    
    For more information about these flags, refer to Cortex CLI common command line reference guide.
    
-   **Using an environment configuration file**: Instead of using flags, you can create an environment configuration file named `cortex.env`. Save this file in your working directory and add your credentials as variables:
    
    -   `CORTEX_API_KEY`: <api key id>
        
    -   `CORTEX_API_KEY`: <secret>
        
    -   `CORTEX_API_BASE_URL`: <tenant URL>, for example `https://api-tenantname.paloaltonetworks.com/`
        
    

#### Cortex CLI usage

To execute a Cortex CLI scan, run `cortexcli [global flags] [module name] scan [module flags]`.

**Command breakdown**

-   Global flags:
    
    -   `--api-base-url <value>`
        
    -   `--api-key <value>`
        
    -   `--api-key-id <value>`
        
    
-   `cortexcli` acts as the global option, establishing the environment for subsequent Cortex CLI commands
    
-   Module name: Select the module (environment) to be scanned:
    
    -   `api` for API Security. For more information about API Security scans, refer to Cortex CLI for API Security
        
    -   `image` for CWP. For more information about CWP scans, refer to Cortex CLI for Cloud Workload Protection
        
    -   `code scan` for Cortex Cloud Application Security. For more informations about Cortex Cloud Application Security refer to Cortex CLI for Code Security
        
    
-   Module flags: The flags available for the selected command:
    
    -   For flags common to all environments, refer to Cortex CLI common command line reference guide
        
    -   For flags specific to CWP refer to Cloud Workload Protection command line referenceCloud Workload Protection command line reference
        
    -   For flags specific to API Security, refer to Cortex CLI API Security command line reference guide
        
    -   For flags specific to Cortex Cloud Application Security, refer to Cortex CLI Cortex Cloud Application Security command line reference
        
    

**Note:**

-   For more information about CLI usage for CWP, refer to Cortex CLI for Cloud Workload Protection
    
-   For more information about CLI usage for API Security, refer to Cortex CLI for API Security
    
-   For more information about CLI usage for Cortex Cloud Application Security, refer to Cortex CLI usage for Cortex Cloud Application Security

### GitHub Actions
Integrate Cortex Cloud Application Security with GitHub Actions to allow dynamic, automated, and context-specific scans within your development workflow. This includes continuous scanning of your workflows whenever changes are pushed or triggered, integrating security checks, and detecting issues as soon as they are introduced.

**Prerequisite:**

Before you begin:

-   **User permissions**: Ensure the user performing the integration has permissions to edit pipeline configurations (such as YAML files) and manage secrets/credentials within the CI platform to store the Cortex Cloud API key securely
    

###### Onboarding steps

1.  On the Cortex Cloud console:
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for and hover over GitHub Actions, and click Add, or Add Another Instance if an instance is already onboarded.
        
2.  On the Add Environment Variables step of the wizard.
    
    1.  Select Generate API key.
        
        The API key secret and API key ID values are generated and populate their respective fields.
        
    2.  Optional: Change the default system architecture detected by the system.
        
    3.  Click Next.
        
3.  Store your Cortex Cloud API key and API key ID in the GitHub Actions Secrets credential store.
    
    -   If you have an API key:
        
        1.  Copy the CORTEX_API_KEY and CORTEX_API_KEY_ID variable names from their respective fields in the wizard.
            
        2.  Add the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values as separate environment variables (secrets) to the GitHub Actions Secrets credential store.
            
        
    -   If you do not have an API key:
        
        1.  Click Generate API key → Copy the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values from their respective fields
            
        2.  Add the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values as separate environment variables (secrets) to the GitHub Actions Secrets credential store.
            
        
    
    **Note:**
    
    Do not change the names of the environment variables provided by Cortex Cloud. They are required for proper integration and functionality.
    
    For more information on passing secrets as environment variables to GitHub Actions, refer to [Using secrets in GitHub Actions](https://docs.github.com/actions/security-guides/encrypted-secrets).
    
4.  Copy and paste the pre-populated sample code from the Configure Job step of the integration wizard into your GitHub Actions job configuration → Done
    
    **Note:**
    
    The code is only a reference. Replace the placeholder values with your build-specific values.
    
5.  Ensure that the **Connector Created Successfully** message is displayed in the final step of the wizard, and click **Close**.
    
6.  Verify integration and confirm that the your integrated GitHub Actions instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, search for GitHub Actions in the search bar.
        
    2.  Hover over the resulting entry and click View Details.
        
    3.  Locate your instance and verify that the status is Connected.
        
7.  Next step: View scan results and mitigate issues.
    

###### GitHub Actions code scan workflow template

This GitHub Actions workflow example automates code scanning using the Cortex CLI. The workflow contains placeholder values (often in brackets) and generic terms (such as `dev`) that you must replace with your environment-specific information before use.

```
name: Cortex CLI Code Scan

on:
  push:
    branches:
      - main
  workflow_dispatch:

env:
  CORTEX_API_KEY: ${{secrets.CORTEX_API_KEY}}
  CORTEX_API_KEY_ID: ${{secrets.CORTEX_API_KEY_ID}}
  CORTEX_API_URL: https://<CORTEX_URL>
  CORTEX_CLI_VERSION: 0.8.11
  
jobs:
  download-and-execute:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Repository
      uses: actions/checkout@v2
    
    - name: Set up QEMU
      uses: docker/setup-qemu-action@v2
      with:
        platforms: arm64
        
    - name: Install Dependencies
      run: |
        sudo apt-get update
        sudo apt-get install -y jq curl

    - name: Get Temporary Token
      run: |
        TOKEN_RESPONSE=$(curl --location "${CORTEX_API_URL}/public_api/cas/v1/cortex-cli/create-token" \\
          --header "Authorization: ${CORTEX_API_KEY}" \\
          --header "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
          --header 'Content-Type: application/json' \\
          --data '{}')
        TEMP_TOKEN=$(echo $TOKEN_RESPONSE | jq -r '.token')
        echo "TEMP_TOKEN=$TEMP_TOKEN" >> $GITHUB_ENV

    - name: Pull Docker Image
      run: |
        docker pull distributions-dev.traps.paloaltonetworks.com/cli-docker/${{env.TEMP_TOKEN}}/method:arm64-${{env.CORTEX_CLI_VERSION}}-dev
        docker tag distributions-dev.traps.paloaltonetworks.com/cli-docker/${{env.TEMP_TOKEN}}/method:arm64-${{env.CORTEX_CLI_VERSION}}-dev cortexcli:${{env.CORTEX_CLI_VERSION}}

    - name: Run Docker Container
      run: |
        docker run --rm --platform linux/arm64 cortexcli:${{env.CORTEX_CLI_VERSION}} \\
          --api-base-url ${CORTEX_API_URL} \\
          --api-key ${CORTEX_API_KEY} \\
          --api-key-id ${CORTEX_API_KEY_ID} \\
          code scan \\
          --directory . \\
          --repo-id ${{github.repository}}
```

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

### Jenkins for code scans
Integrate Cortex Cloud Application Security with your Jenkins server to allow dynamic, automated, and context-specific code scans across your codebase. This integration provides continuous scanning of your workflows, triggered by code changes or pipeline events, ensuring security checks are performed and issues are detected as early as possible.

Code scans are executed using the Cortex CLI, and include automated shift-left actions based on scan results.

**Note:**

Jenkins onboarding offers both code and CI/CD scanning. A single integrated instance supports either code or CI scanning, but not both. If you require both code and CI scanning for your Jenkins servers, you must create two separate integrations, selecting the appropriate scanning type for each. To onboard Jenkins for CI/CD scans, refer to Jenkins for CI/CD pipeline scans.

**Prerequisite:**

-   Grant **Administrator** permissions to the user integrating Cortex Cloud Application Security with Jenkins
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

###### Onboarding steps

1.  On the Cortex Cloud console:
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for and hover over Jenkins and click Add, or Add Another Instance if an instance is already onboarded.
        
2.  On the Select Integration step of the Jenkins integration, select Code Scan → Next.
    
3.  On the Add Environment Variables step of the wizard.
    
    1.  Select Generate API key.
        
        The API key secret and API key ID values are generated and populate their respective fields.
        
    2.  Select your system architecture.
        
    3.  Click Next.
        
4.  Store your Cortex Cloud API Key and API ID in the Jenkins Credentials store.
    
    **Danger:**
    
    -   For Cortex Cloud Application Security CI tools, you must store secrets in Jenkins Credentials for use in your Jenkins pipelines using either of these methods:
        
        -   **Plain text storage**: Store secrets directly as plain text in Jenkins Credentials. Access them in your pipeline using the `credentials` function, which retrieves the secret directly as plain text
            
        -   **Credentials Binding Plugin**: Use the `withCredentials` function (requires installing the Credentials Binding Plugin) to securely bind credentials to environment variables within your pipeline
            
        
    -   The variable names CORTEX_API_KEY and CORTEX_API_KEY_ID must be used exactly as provided. They are part of a predefined system and cannot be changed without causing errors
        
    
    -   If you have an API key:
        
        1.  Copy the CORTEX_API_KEY and CORTEX_API_KEY_ID variable names from their respective fields in the wizard.
            
        2.  Add the CORTEX_API_KEY and CORTEX_API_KEY_ID names and their corresponding values as separate environment variables (secrets) to the Jenkins Credentials store.
            
        
    -   If you do not have an API key:
        
        1.  Click Generate API key → Copy the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values from their respective fields.
            
        2.  Add the CORTEX_API_KEY and CORTEX_API_KEY_ID names and their corresponding values as separate environment variables (secrets) to the Jenkins Credentials store.
            
        
    
5.  On the Set repository step of the wizard: (Optional): Add the URL of the repository to be scanned, or skip this step if you are adding code scanning to an existing pipeline → Next.
    
    **Note:**
    
    -   This step is only required for new pipelines
        
    -   For private repositories, ensure the necessary credentials are configured in Jenkins Credentials
        
    
6.  On the Configure Subscription step of the integration wizard.
    
    1.  Copy and paste the code from the Configure Subscription step of the integration wizard into your Jenkins pipeline.
        
    2.  In the `labels` property of your Jenkins configuration file, enter the label of a Jenkins node that is configured with Docker.
        
        **Note:**
        
        This ensures your build runs within a Docker environment. If a node without Docker is used, the build will fail.
        
    3.  Optional: The provided code assumes that your Cortex Cloud access key and ID are stored as plain text in Jenkins Credentials. You can replace this method with your preferred secret management solution (such as the `withCredentials` function).
        
    4.  Click Done.
        
7.  Verify you receive the confirmation message on the last step of the wizard → Close.
    
8.  Verify integration and confirm that the your integrated Jenkins instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, search for Jenkins in the search bar.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate and verify that the status of your instance is Connected.
        
9.  Next step: View scan results and mitigate issues.
    

###### Jenkins code scan workflow template (without checkout)

This Jenkins workflow example automates code scanning using the Cortex CLI. It does not include a step to checkout a repository. The workflow contains placeholder values (often in brackets) and generic terms (such as dev) that you must replace with your environment-specific information before use.

Read more...

```
pipeline {
    agent {
        docker {
            image 'jenkins/agent:alpine'
            args '-u root --privileged -v /var/run/docker.sock:/var/run/docker.sock'
            label '<REPLACE WITH LABEL OF NODE WITH DOCKER INSTALLED>' // Use a docker agent with docker installed
        }
    }

    environment {
        CORTEX_API_KEY = credentials('CORTEX_API_KEY')
        CORTEX_API_KEY_ID = credentials('CORTEX_API_KEY_ID')
        CORTEX_API_URL = '<YOUR_CORTEX_URL>'// Your placeholder
        CORTEX_CLI_VERSION = '0.8.11'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh '''
                apk add --no-cache jq docker
                '''
            }
        }

        stage('Get Temporary Token') {
            environment {
                TEMP_TOKEN = ""
            }
            steps {
                script {
                    def response = sh(script: """
                        curl --location '${env.CORTEX_API_URL}/public_api/cas/v1/cortex-cli/create-token' \\
                          --header 'Authorization: ${env.CORTEX_API_KEY}' \\
                          --header 'x-xdr-auth-id: ${env.CORTEX_API_KEY_ID}' \\
                          --header 'Content-Type: application/json' \\
                          --data '{}' \\
                          -s
                    """, returnStdout: true).trim()

                    env.TEMP_TOKEN = sh(script: """echo '${response}' | jq -r '.token'""", returnStdout: true).trim()
                }
            }
        }

        stage('Pull Docker Image') {
            steps {
                sh """
                docker pull distributions-dev.traps.paloaltonetworks.com/cli-docker/${env.TEMP_TOKEN}/method:amd64-${env.CORTEX_CLI_VERSION}-dev
                docker tag distributions-dev.traps.paloaltonetworks.com/cli-docker/${env.TEMP_TOKEN}/method:amd64-${env.CORTEX_CLI_VERSION}-dev cortexcli:${env.CORTEX_CLI_VERSION}
                """
            }
        }

        stage('Run Docker Container') {
            // Replace the repo-id with your repository like: owner/repo
            steps {
                unstash 'source'
                env.BRANCH = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                sh """
                docker run --rm --platform linux/amd64 cortexcli:${env.CORTEX_CLI_VERSION} \\
                  --api-base-url ${env.CORTEX_API_URL} \\
                  --api-key ${env.CORTEX_API_KEY} \\
                  --api-key-id ${env.CORTEX_API_KEY_ID} \\
                  code scan \\
                  --directory . \\
                  --repo-id <REPLACE WITH REPO_OWNER/REPO_NAME> \\
                  --branch $BRANCH
                """
            }
        }
    }
}
```

###### Jenkins code scan workflow template (with checkout)

This Jenkins workflow example automates code scanning using the Cortex CLI. It includes a step to checkout a repository. The workflow contains placeholder values (often in brackets) and generic terms (such as dev) that you must replace with your environment-specific information before use.

Read more...

```
pipeline {
    agent {
        docker {
            image 'jenkins/agent:alpine'
            args '-u root --privileged -v /var/run/docker.sock:/var/run/docker.sock'
            label '<REPLACE WITH LABLE OF NODE WITH DOCKER INSTALLED>' // Use a docker agent with docker installed
        }
    }

    environment {
        CORTEX_API_KEY = credentials('CORTEX_API_KEY')
        CORTEX_API_KEY_ID = credentials('CORTEX_API_KEY_ID')
        CORTEX_API_URL = '<YOUR_CORTEX_URL>' // Your placeholder
        CORTEX_CLI_VERSION = '0.8.11'
    }

    stages {
        stage('Checkout Repository') {
            steps {
                git branch: 'main', url: 'https://github-example.com/example-repo'
                stash includes: '\*\*/\*', name: 'source'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                apk add --no-cache jq docker
                '''
            }
        }

        stage('Get Temporary Token') {
            environment {
                TEMP_TOKEN = ""
            }
            steps {
                script {
                    def response = sh(script: """
                        curl --location '${env.CORTEX_API_URL}/public_api/cas/v1/cortex-cli/create-token' \\
                          --header 'Authorization: ${env.CORTEX_API_KEY}' \\
                          --header 'x-xdr-auth-id: ${env.CORTEX_API_KEY_ID}' \\
                          --header 'Content-Type: application/json' \\
                          --data '{}' \\
                          -s
                    """, returnStdout: true).trim()

                    env.TEMP_TOKEN = sh(script: """echo '${response}' | jq -r '.token'""", returnStdout: true).trim()
                }
            }
        }

        stage('Pull Docker Image') {
            steps {
                sh """
                docker pull distributions-dev.traps.paloaltonetworks.com/cli-docker/${env.TEMP_TOKEN}/method:amd64-${env.CORTEX_CLI_VERSION}-dev
                docker tag distributions-dev.traps.paloaltonetworks.com/cli-docker/${env.TEMP_TOKEN}/method:amd64-${env.CORTEX_CLI_VERSION}-dev cortexcli:${env.CORTEX_CLI_VERSION}
                """
            }
        }

        stage('Run Docker Container') {
            // Replace the repo-id with your repository like: owner/repo
            steps {
                unstash 'source'
                env.BRANCH = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                sh """
                docker run --rm --platform linux/amd64 cortexcli:${env.CORTEX_CLI_VERSION} \\
                  --api-base-url ${env.CORTEX_API_URL} \\
                  --api-key ${env.CORTEX_API_KEY} \\
                  --api-key-id ${env.CORTEX_API_KEY_ID} \\
                  code scan \\
                  --directory . \\
                  --repo-id <REPLACE WITH REPO_OWNER/REPO_NAME> \\
                  --branch $BRANCH
                """
            }
        }
    }
}
```

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

### Terraform Cloud (Run Tasks)
Integrate Cortex Cloud Application Security with Terraform Cloud (Run Tasks) to enable dynamic, automated, and context-specific scans in your Terraform workspace. Cortex Cloud Application Security scans Terraform (TF) frameworks for misconfigurations based on default and custom policies whenever changes are triggered, ensuring seamless security checks. It identifies issues such as infrastructure-as-code (IaC) misconfigurations, Software Composition Analysis (SCA ) vulnerabilities, exposed secrets, and license non-compliance, depending on the security scanners that you have subscribed to.

You can monitor and remediate issues directly in the Cortex Cloud Application Security console. Run statuses and violation details can be tracked in both Cortex Cloud Application Security and Terraform Cloud through streamlined run task reviews. For more information about streamlined tasks, refer to [https://www.hashicorp.com/blog/terraform-cloud-adds-streamlined-run-task-reviews](https://www.hashicorp.com/blog/terraform-cloud-adds-streamlined-run-task-reviews).

**Prerequisite:**

Before you begin:

-   **User permissions**: Ensure the user performing the integration has permissions to edit pipeline configurations (such as YAML files) and manage secrets/credentials within the CI platform to store the Cortex Cloud API key securely
    
-   Procure a [Terraform cloud license](https://www.hashicorp.com/products/terraform/pricing) that is either a trial license or a TF Cloud license at the TEAM & GOVERNANCE level
    
-   Terraform permissions: Grant the user or team the following permissions, depending on integration:
    
    -   _Manage Workspaces_ permissions at the organization level. These permissions are required to attach and manage the run task on workspaces or:
        
    -   _Administrator_ permissions on the workspace(s)
        
    
-   Create a Terraform **Organization**. For more information, refer to the[Terraform documentation](https://developer.hashicorp.com/terraform/cloud-docs/workspaces#creating-workspaces)
    
-   Create a Terraform **Workspace**: For more information, refer to the [Terraform documentation](https://developer.hashicorp.com/terraform/cloud-docs/workspaces#creating-workspaces)
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

###### Onboarding steps

1.  **On your Terraform Cloud platform**, create a Terraform **api token**.
    
    1.  Select your user/profile icon → User Settings.
        
    2.  Select the Tokens section from the left side menu.
        
    3.  Click Create an API token → provide a description → Create API token .
        
    4.  Copy and save the token+ Done.
        
        **Note:**
        
        Skip this step if you plan on using an existing token.
        
    
    For more information about Terraform API tokens, refer to the [Terraform API Tokens](https://developer.hashicorp.com/terraform/cloud-docs/users-teams-organizations/api-tokens) documentation.
    
2.  On the Cortex Cloud console.
    
    1.  Select Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for and hover over Terraform Cloud (Run Tasks) and click Add, or Add Another Instance if an instance is already onboarded.
        
3.  Provide your Terraform user or team API token on the Configure Account step of the wizard → Next.
    
4.  Select an organization from the Select Organization step of the wizard → Next.
    
5.  On the Select Workspace step of the wizard.
    
    1.  Select repositories from the Selection Options field.
        
        -   Permit all existing repositories
            
        -   Permit all existing and future repositories
            
        -   Choose from repository list
            
        
    2.  Select a run plan from the Run Stage field.
        
        -   Pre-plan: The scan runs before Terraform generates the plan
            
        -   Post-plan: The scan runs after Terraform generates the plan
            
        
        **Note:**
        
        Cortex Cloud Application Security performs a scan of Terraform templates on selected workspaces based on the Run Stage.
        
    3.  Click Save and then Close in the final verification step of the wizard.
        
6.  Verify integration and confirm that the your integrated Terraform Cloud (Run Tasks) instance has a status of Connected.
    
    1.  On Data Sources & Integrations page, search for Terraform Cloud (Run Tasks).
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your instance and verify that the status is Connected.
        
7.  Next step: View scan results and mitigate issues.
    

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

### Terraform Enterprise (Run Tasks)
Integrate Cortex Cloud Application Security with Terraform Enterprise (Run Tasks) to enable dynamic, automated, and context-specific scans in your Terraform workspace. Cortex Cloud Application Security scans Terraform (TF) frameworks for misconfigurations based on default and custom policies whenever changes are triggered, ensuring seamless security checks. It identifies infrastructure-as-code (IaC) misconfigurations, Software Composition Analysis (SCA ) vulnerabilities\*, exposed secrets, and license non-compliance issues, depending on the security scanners that you have subscribed to.

**Note:**

For container image vulnerabilities, Cortex Cloud Application Security performs 'Image Referencer' scans within Terraform Enterprise (Run Tasks), as full SCA scans are not currently supported.

You can monitor and remediate issues directly in the Cortex Cloud Application Security console. Run statuses and violation details can be tracked in both Cortex Cloud Application Security and Terraform Enterprise through streamlined run task reviews. For more information about streamlined tasks, refer to [https://www.hashicorp.com/blog/terraform-cloud-adds-streamlined-run-task-reviews](https://www.hashicorp.com/blog/terraform-cloud-adds-streamlined-run-task-reviews).

**Prerequisite:**

Before you begin:

-   Ensure access to a Terraform Enterprise console to enable you to provide a user or team token that authorizes Cortex Cloud Application Security to access workspaces and helps regulate run configurations
    
-   Terraform Enterprise version compatibility: Ensure _Run Tasks_ for workspaces on is compatible with version 1.1.9 and above
    
-   Terraform Enterprise user or team permissions: For a workspace integration of run tasks you need to ensure that the token used has the following permissions. These permissions enable Cortex Cloud to configure run tasks in the environment and scan plan files from your runs:
    
    -   **Manage run tasks** permissions at the organizational level. These permissions are required to create and manage the run task in the organization
        
    -   **Manage Workspaces** permissions at the organization level. These permissions are required to attach and manage the run task on workspaces or:
        
    -   **Administrator** permissions on the workspace(s)
        
        **Note:**
        
        For more on Terraform Run Task permissions refer to [Manage Run Tasks permissions](https://developer.hashicorp.com/terraform/enterprise/users-teams-organizations/permissions#organization-permissions).
        
    
-   Create a Terraform **Organization**. For more information, refer to the[Terraform documentation](https://developer.hashicorp.com/terraform/cloud-docs/workspaces#creating-workspaces)
    
-   Create a Terraform **Workspace**: For more information, refer to the [Terraform documentation](https://developer.hashicorp.com/terraform/cloud-docs/workspaces#creating-workspaces)
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

###### Onboarding steps

1.  **On your Terraform Enterprise platform**, create a Terraform **api token**.
    
    1.  Select your user/profile icon → User Settings.
        
    2.  Select the Tokens section from the left side menu.
        
    3.  Click Create an API token → provide a description → Create API token .
        
    4.  Copy and save the token+ Done.
        
        **Note:**
        
        Skip this step if you plan on using an existing token.
        
    
    For more information about Terraform API tokens, refer to the [Terraform API Tokens](https://developer.hashicorp.com/terraform/cloud-docs/users-teams-organizations/api-tokens) documentation.
    
2.  On the Cortex Cloud console:
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for and hover over Terraform Enterprise (Run Tasks) and click Add, or Add Another Instance if an instance is already onboarded.
        
3.  Provide your Terraform user or team API token on the Configure Account step of the wizard → Next.
    
4.  Select an organization from the Select Organization step of the wizard → Next.
    
5.  On theSelect Workspace step of the wizard:
    
    1.  Select repositories from the Selection Options field.
        
        -   Permit all existing repositories
            
        -   Permit all existing and future repositories
            
        -   Choose from repository list
            
        
    2.  Select a run plan from the Run Stage field.
        
        -   Pre-plan: The scan runs before Terraform generates the plan
            
        -   Post-plan: The scan runs after Terraform generates the plan
            
        
        **Note:**
        
        Cortex Cloud Application Security performs a scan of Terraform templates on selected workspaces based on the Run Stage.
        
    3.  Click Save.
        
6.  Click Save and then Close in the final verification step of the wizard.
    
7.  Verify integration and confirm that the your integrated Terraform Enterprise (Run Tasks) instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, search for Terraform Enterprise (Run Tasks) in the search bar.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate your instance and verify that the status is Connected.
        
8.  Next step: View scan results and mitigate issues.
    

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

## CLI pipeline code snippets
You can integrate the Cortex CLI directly into your CI/CD pipelines to enable automated code scans by adding code snippets to your to your build script or pipeline configuration, such as a `YAML` or `Groovy` file. Both `ARM` and `AMD` architectures are supported, ensuring you can scan your codebase regardless of your runner’s environment.

**Danger:**

**User permissions**: Ensure the user performing the integration has permissions to edit pipeline configurations (such as YAML files).

**User permissions**: Ensure the user performing the integration has permissions to edit pipeline configurations (such as YAML files).

You must replace placeholder variables with your own credentials and environment-specific details.

### AWS CodeBuild

#### For AMD architecture

```
version: 0.2
env:
  variables:
    CORTEX_API_URL: <your_cortex_api_url>
    CORTEX_CLI_VERSION: "0.13.14"
  secrets-manager:
    CORTEX_API_KEY: "CORTEX_API_KEY"   
    CORTEX_API_KEY_ID: "CORTEX_API_KEY_ID"
phases:
  install:
    commands:
      - apt-get update
      - apt-get install -y curl jq git
  pre_build:
    commands:
      - echo "Getting repo name"
      - export CODEBUILD_ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)  
      - export CODEBUILD_GIT_BRANCH="$(git symbolic-ref HEAD --short 2>/dev/null)"
      - |
        if [ "$CODEBUILD_GIT_BRANCH" = "" ] ; then
          export CODEBUILD_GIT_BRANCH="$(git rev-parse HEAD | xargs git name-rev | cut -d' ' -f2 | sed 's/remotes\\/origin\\///g')";
        fi
      - export CODEBUILD_PROJECT=${CODEBUILD_BUILD_ID%:$CODEBUILD_LOG_PATH}
      - echo "Downloading cortexcli"
      - |
        crtx_resp=$(curl "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=amd64" \\
          -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
          -H "Authorization: ${CORTEX_API_KEY}")
      - crtx_url=$(echo "$crtx_resp" | jq -r ".signed_url")
      - curl -o cortexcli "$crtx_url"
      - chmod +x cortexcli
      - ./cortexcli --version
      
  build:
    commands:
      - |
        ./cortexcli \\
                   --api-base-url "${CORTEX_API_URL}" \\
                   --api-key "${CORTEX_API_KEY}" \\
                   --api-key-id "${CORTEX_API_KEY_ID}" \\
                   code scan \\
                   --directory "$(pwd)" \\
                   --repo-id $CODEBUILD_ACCOUNT_ID/$CODEBUILD_PROJECT \\
                   --branch $CODEBUILD_GIT_BRANCH \\
                   --source AWS_CODE_BUILD \\
                   --create-repo-if-missing
artifacts:
  files:
    - '\*\*/\*'
```

#### For ARM architecture

```
version: 0.2
env:
  variables:
    CORTEX_API_URL: <your_cortex_api_url> 
    CORTEX_CLI_VERSION: "0.13.16"
  secrets-manager:
    CORTEX_API_KEY: "CORTEX_API_KEY"   
    CORTEX_API_KEY_ID: "CORTEX_API_KEY_ID"
phases:
  install:
    commands:
      - apt-get update
      - apt-get install -y curl jq git
  pre_build:
    commands:
      - echo "Getting repo name"
      - export CODEBUILD_ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)  
      - export CODEBUILD_GIT_BRANCH="$(git symbolic-ref HEAD --short 2>/dev/null)"
      - |
        if [ "$CODEBUILD_GIT_BRANCH" = "" ] ; then
          export CODEBUILD_GIT_BRANCH="$(git rev-parse HEAD | xargs git name-rev | cut -d' ' -f2 | sed 's/remotes\\/origin\\///g')";
        fi
      - export CODEBUILD_PROJECT=${CODEBUILD_BUILD_ID%:$CODEBUILD_LOG_PATH}
      - echo "Downloading cortexcli"
      - |
        crtx_resp=$(curl "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=arm64" \\
          -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
          -H "Authorization: ${CORTEX_API_KEY}")
      - crtx_url=$(echo "$crtx_resp" | jq -r ".signed_url")
      - curl -o cortexcli "$crtx_url"
      - chmod +x cortexcli
      - ./cortexcli --version
      
  build:
    commands:
      - |
        ./cortexcli \\
                   --api-base-url "${CORTEX_API_URL}" \\
                   --api-key "${CORTEX_API_KEY}" \\
                   --api-key-id "${CORTEX_API_KEY_ID}" \\
                   code scan \\
                   --directory "$(pwd)" \\
                   --repo-id $CODEBUILD_ACCOUNT_ID/$CODEBUILD_PROJECT \\
                   --branch $CODEBUILD_GIT_BRANCH \\
                   --source AWS_CODE_BUILD \\
                   --create-repo-if-missing
artifacts:
  files:
    - '\*\*/\*'
```


### Azure Pipelines

#### For AMD architecture

```
trigger:
  branches:
    include: ['\*']
pr:
  branches:
    include: ['\*']
pool:
  vmImage: ubuntu-latest
variables:
  CORTEX_API_URL: <your_cortex_api_url> 
  MIN_LOG_LEVEL: "DEBUG"
steps:
- checkout: self
  clean: true
- task: NodeTool@0
  displayName: "Use Node.js 22.x"
  inputs:
    versionSpec: "22.x"
- bash: |
    set -euo pipefail
    sudo apt-get update
    sudo apt-get install -y --no-install-recommends jq ca-certificates curl
    BASE="${CORTEX_API_URL%/}"
    URL="$BASE/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=amd64"
    set +x
    CRTX_URL=$(curl -fsSL "$URL" \\
      -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
      -H "Authorization: ${CORTEX_API_KEY}" | jq -r '.signed_url')
    set -x
    curl -fsSL -o cortexcli "$CRTX_URL"
    chmod +x cortexcli
  displayName: "Download cortexcli (amd64)"
  env:
    CORTEX_API_URL: $(CORTEX_API_URL)
    CORTEX_API_KEY_ID: $(CORTEX_API_KEY_ID)
    CORTEX_API_KEY: $(CORTEX_API_KEY)
- bash: |
    set -euo pipefail
    ./cortexcli \\
      --api-base-url "${CORTEX_API_URL}" \\
      --api-key "${CORTEX_API_KEY}" \\
      --api-key-id "${CORTEX_API_KEY_ID}" \\
      code scan \\
      --directory "$(Build.SourcesDirectory)" \\
      --repo-id "$(Build.Repository.Name)" \\
      --branch "$(Build.SourceBranchName)" \\
      --source "CORTEX_CLI" \\
      --create-repo-if-missing
  displayName: "Cortex CLI Code Scan"
  env:
    CORTEX_API_URL: $(CORTEX_API_URL)
    CORTEX_API_KEY_ID: $(CORTEX_API_KEY_ID)
    CORTEX_API_KEY: $(CORTEX_API_KEY)
    MIN_LOG_LEVEL: $(MIN_LOG_LEVEL)
```

#### For ARM architecture

```
trigger:
  branches:
    include: ['\*']
pr:
  branches:
    include: ['\*']
variables:
  CORTEX_API_URL: <your_cortex_api_url> 
pool:
  name: arm
  demands:
    - Agent.OS -equals Linux
steps:
- checkout: self
  clean: true
- task: NodeTool@0
  displayName: "Use Node.js 22.x"
  inputs: { versionSpec: "22.x" }
- bash: |
    set -euo pipefail
    BASE="${CORTEX_API_URL%/}"
    URL="$BASE/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=arm64"
    set +x
    CRTX_URL=$(curl -fsSL "$URL" \\
      -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
      -H "Authorization: ${CORTEX_API_KEY}" | jq -r '.signed_url')
    set -x
    curl -fsSL -o cortexcli "$CRTX_URL"
    chmod +x cortexcli
  displayName: "Download cortexcli (arm64)"
  env:
    CORTEX_API_URL: $(CORTEX_API_URL)
    CORTEX_API_KEY_ID: $(CORTEX_API_KEY_ID)
    CORTEX_API_KEY: $(CORTEX_API_KEY)
- bash: |
    set -euo pipefail
    ./cortexcli \\
      --api-base-url "${CORTEX_API_URL}" \\
      --api-key "${CORTEX_API_KEY}" \\
      --api-key-id "${CORTEX_API_KEY_ID}" \\
      code scan \\
      --directory "$(Build.SourcesDirectory)" \\
      --repo-id "$(Build.Repository.Name)" \\
      --branch "$(Build.SourceBranchName)" \\
      --source "CORTEX_CLI" \\
      --create-repo-if-missing
  displayName: "Cortex CLI Code Scan (ARM64)"
  env:
    CORTEX_API_URL: $(CORTEX_API_URL)
    CORTEX_API_KEY_ID: $(CORTEX_API_KEY_ID)
    CORTEX_API_KEY: $(CORTEX_API_KEY)
```


### Bitbucket

#### For AMD architecture

```
image: ubuntu:24.04
clone:
  depth: full
pipelines:
  default:
    - step:
        name: Cortex CLI Code Scan (Hosted AMD64)
        script:
          - set -euo pipefail
          - apt-get update && apt-get install -y --no-install-recommends curl jq ca-certificates tar gzip file
          - curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
          - apt-get install -y nodejs
          - node -v && npm -v
          - export CORTEXCLI_HOME="/root/.cortexcli"; rm -rf "$CORTEXCLI_HOME" || true; mkdir -p "$CORTEXCLI_HOME"
          - |
            CRTX_URL=$(curl -fsSL "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=amd64" \\
              -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
              -H "Authorization: ${CORTEX_API_KEY}" | jq -r '.signed_url')
            curl -fsSL -o cortexcli "$CRTX_URL"
            chmod +x cortexcli
            ./cortexcli --version
          - |
            ./cortexcli \\
              --api-base-url "${CORTEX_API_URL}" \\
              --api-key "${CORTEX_API_KEY}" \\
              --api-key-id "${CORTEX_API_KEY_ID}" \\
              code scan \\
              --directory "${BITBUCKET_CLONE_DIR}" \\
              --repo-id "${BITBUCKET_REPO_FULL_NAME}" \\
              --branch "${BITBUCKET_BRANCH}" \\
              --source "CORTEX_CLI" \\
              --create-repo-if-missing \\
              --upload-mode no-upload
        artifacts:
          - cortexcli
```

#### For ARM architecture

```
image: node:22-bookworm

pipelines:
  default:
    - step:
        name: Cortex CLI Code Scan
        runs-on:
          - self.hosted
          - linux.arm64 
        script:
          - set -euo pipefail
          - apt-get update && apt-get install -y --no-install-recommends curl jq ca-certificates file
          - export CORTEXCLI_HOME="/root/.cortexcli"; rm -rf "$CORTEXCLI_HOME" || true; mkdir -p "$CORTEXCLI_HOME"

          - |
            set +x
            CRTX_URL=$(curl -fsSL "${CORTEX_API_URL%/}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=arm64" \\
              -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
              -H "Authorization: ${CORTEX_API_KEY}" | jq -r '.signed_url')
            set -x
            curl -fsSL -o cortexcli "$CRTX_URL"
            chmod +x cortexcli
            ./cortexcli --version

          # Run the scan
          - |
            ./cortexcli \\
              --api-base-url "${CORTEX_API_URL}" \\
              --api-key "${CORTEX_API_KEY}" \\
              --api-key-id "${CORTEX_API_KEY_ID}" \\
              code scan \\
              --directory "${BITBUCKET_CLONE_DIR}" \\
              --repo-id "${BITBUCKET_REPO_FULL_NAME}" \\
              --branch "${BITBUCKET_BRANCH}" \\
              --source "CORTEX_CLI" \\
              --create-repo-if-missing
        artifacts:
          - cortexcli
```


### CircleCI

#### For AMD architecture

```
version: 2.1
jobs:
  cortex-code-scan:
    docker:
      - image: cimg/node:22.17.0  # Replace with a suitable image or executor
    environment:
      CORTEX_API_URL: <your_cortex_api_url>
    steps:
      - checkout
      - run:
          name: Download cortexcli
          command: |
            set -x
            crtx_resp=$(curl "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=amd64" \\
              -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
              -H "Authorization: ${CORTEX_API_KEY}")
            crtx_url=$(echo $crtx_resp | jq -r ".signed_url")
            curl -o cortexcli $crtx_url
            chmod +x cortexcli
            ./cortexcli --version
      - run:
          name: Run Cortex CLI Code Scan
          command: |
            ./cortexcli \\
              --api-base-url "${CORTEX_API_URL}" \\
              --api-key "${CORTEX_API_KEY}" \\
              --api-key-id "${CORTEX_API_KEY_ID}" \\
              code scan \\
              --directory "$(pwd)" \\
              --repo-id "${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}" \\
              --branch "${CIRCLE_BRANCH}" \\
              --source "CIRCLE_CI" \\
              --create-repo-if-missing
workflows:
  cortex-scan-workflow:
    jobs:
      - cortex-code-scan:
          context: cortex-secrets
```

#### For ARM architecture

```
version: 2.1
jobs:
  cortex-code-scan:
    docker:
      - image: <Replace with image supporting node js version 22 or higher>
    environment:
      CORTEX_API_URL: <your_cortex_api_url> 
    steps:
      - checkout
      - run:
          name: Download cortexcli
          command: |
            set -x
            crtx_resp=$(curl "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=arm64" \\
              -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
              -H "Authorization: ${CORTEX_API_KEY}")
            crtx_url=$(echo $crtx_resp | jq -r ".signed_url")
            curl -o cortexcli $crtx_url
            chmod +x cortexcli
            ./cortexcli --version
      - run:
          name: Run Cortex CLI Code Scan
          command: |
            ./cortexcli \\
              --api-base-url "${CORTEX_API_URL}" \\
              --api-key "${CORTEX_API_KEY}" \\
              --api-key-id "${CORTEX_API_KEY_ID}" \\
              code scan \\
              --directory "$(pwd)" \\
              --repo-id "${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}" \\
              --branch "${CIRCLE_BRANCH}" \\
              --source "CIRCLE_CI" \\
              --create-repo-if-missing
workflows:
  cortex-scan-workflow:
    jobs:
      - cortex-code-scan:
          context: cortex-secrets
```


### GitHub Actions

#### For AMD architecture

```
name: Cortex CLI Code Scan
on:
  push:
    branches:
      - main
  workflow_dispatch:
env:
  CORTEX_API_KEY: ${{secrets.CORTEX_API_KEY}}
  CORTEX_API_KEY_ID: ${{secrets.CORTEX_API_KEY_ID}}
  CORTEX_API_URL: <your_cortex_api_url> 
  
jobs:
  cortex-code-scan:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Repository
      uses: actions/checkout@v2
    
    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 22
    - name: Verify Node.js Version
      run: node -v
    - name: Download cortexcli
      run: |
        set -x
        crtx_resp=$(curl "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=amd64" \\
          -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
          -H "Authorization: ${CORTEX_API_KEY}")
        crtx_url=$(echo $crtx_resp | jq -r ".signed_url")
        curl -o cortexcli $crtx_url
        chmod +x cortexcli
        ./cortexcli --version
    - name: Run Cortex CLI Code Scan
      run: |
        ./cortexcli \\
          --api-base-url "${CORTEX_API_URL}" \\
          --api-key "${CORTEX_API_KEY}" \\
          --api-key-id "${CORTEX_API_KEY_ID}" \\
          code scan \\
          --directory "${{github.workspace}}" \\
          --repo-id "${{github.repository}}" \\
          --branch "${{github.ref_name}}" \\
          --source "GITHUB_ACTIONS" \\
          --create-repo-if-missing
```

#### For ARM architecture

```
name: Cortex CLI Code Scan
on:
  push:
    branches:
      - main
  workflow_dispatch:
env:
  CORTEX_API_KEY: ${{secrets.CORTEX_API_KEY}}
  CORTEX_API_KEY_ID: ${{secrets.CORTEX_API_KEY_ID}}
  CORTEX_API_URL: <your_cortex_api_url>
  
jobs:
  cortex-code-scan:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Repository
      uses: actions/checkout@v2
    
    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 22
    - name: Verify Node.js Version
      run: node -v
    - name: Download cortexcli
      run: |
        set -x
        crtx_resp=$(curl "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=arm64" \\
          -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
          -H "Authorization: ${CORTEX_API_KEY}")
        crtx_url=$(echo $crtx_resp | jq -r ".signed_url")
        curl -o cortexcli $crtx_url
        chmod +x cortexcli
        ./cortexcli --version
    - name: Run Cortex CLI Code Scan
      run: |
        ./cortexcli \\
          --api-base-url "${CORTEX_API_URL}" \\
          --api-key "${CORTEX_API_KEY}" \\
          --api-key-id "${CORTEX_API_KEY_ID}" \\
          code scan \\
          --directory "${{github.workspace}}" \\
          --repo-id "${{github.repository}}" \\
          --branch "${{github.ref_name}}" \\
          --source "GITHUB_ACTIONS" \\
          --create-repo-if-missing
```


### GitLab Runner

#### For AMD architecture

```
stages: [scan]
variables:
  CORTEX_API_URL: <your_cortex_api_url>
cortex_code_scan:
  image: node:22-bookworm@sha256:bb6834c0669aa71cbc8d94606561a721adf489f6b93d7b8b825f0cf1b498c2c4
  tags: ["amd64"]
  stage: scan
  rules:
    - when: on_success
  before_script:
    - uname -m
    - set -euo pipefail
    - apt-get update
    - apt-get install -y --no-install-recommends curl jq ca-certificates tar gzip file
    - export CORTEXCLI_HOME="/root/.cortexcli"; rm -rf "$CORTEXCLI_HOME" || true; mkdir -p "$CORTEXCLI_HOME"
    - |
      # avoid leaking secrets in logs
      set +x
      CRTX_URL=$(curl -fsSL "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=amd64" \\
        -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
        -H "Authorization: ${CORTEX_API_KEY}" | jq -r '.signed_url')
      set -x
      curl -fsSL -o cortexcli "$CRTX_URL"
      chmod +x cortexcli
      ./cortexcli --version
  script:
    - |
      ./cortexcli \\
        --api-base-url "${CORTEX_API_URL}" \\
        --api-key "${CORTEX_API_KEY}" \\
        --api-key-id "${CORTEX_API_KEY_ID}" \\
        code scan \\
        --directory "${CI_PROJECT_DIR}" \\
        --repo-id "${CI_PROJECT_PATH}" \\
        --branch "${CI_COMMIT_REF_NAME}" \\
        --source "CORTEX_CLI" \\
        --upload-mode no-upload \\
        --create-repo-if-missing
  artifacts:
    when: always
    paths: [cortexcli]
    expire_in: 1 day
```

#### For ARM architecture

```
stages: [scan]
variables:
  CORTEX_API_URL: <your_cortex_api_url> 
cortex_code_scan:
  image: node:22-bookworm
  stage: scan
  rules:
    - when: on_success
  before_script:
    - set -euo pipefail
    - apt-get update
    - apt-get install -y --no-install-recommends curl jq ca-certificates tar gzip file
    - export CORTEXCLI_HOME="/root/.cortexcli"; rm -rf "$CORTEXCLI_HOME" || true; mkdir -p "$CORTEXCLI_HOME"
    - |
      # avoid leaking secrets in logs
      set +x
      CRTX_URL=$(curl -fsSL "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=arm64" \\
        -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
        -H "Authorization: ${CORTEX_API_KEY}" | jq -r '.signed_url')
      set -x
      curl -fsSL -o cortexcli "$CRTX_URL"
      chmod +x cortexcli
      ./cortexcli --version
  script:
    - |
      ./cortexcli \\
        --api-base-url "${CORTEX_API_URL}" \\
        --api-key "${CORTEX_API_KEY}" \\
        --api-key-id "${CORTEX_API_KEY_ID}" \\
        code scan \\
        --directory "${CI_PROJECT_DIR}" \\
        --repo-id "${CI_PROJECT_PATH}" \\
        --branch "${CI_COMMIT_REF_NAME}" \\
        --source "CORTEX_CLI" \\
        --upload-mode no-upload \\
        --create-repo-if-missing
  artifacts:
    when: always
    paths: [cortexcli]
    expire_in: 1 day
```


### Jenkins

#### For AMD architecture

```
pipeline {
    agent {
        docker {
            image 'cimg/node:22.17.0' // Replace with a suitable image or executor
            args '-u root'
        }
    }
    environment {
        CORTEX_API_KEY = credentials('CORTEX_API_KEY')
        CORTEX_API_KEY_ID = credentials('CORTEX_API_KEY_ID')
        CORTEX_API_URL = <your_cortex_api_url> 
    }
    stages {
        stage('Checkout Repository') {
            steps {
                  git branch: 'main', url: 'this-is-repository-url-example'
                  stash includes: '\*\*/\*', name: 'source'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh '''
                apt update
                apt install -y curl jq git
                '''
            }
        }
        stage('Download cortexcli') {
            steps {
                script {
                    def response = sh(script: """
                        curl --location '${env.CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=amd64' \\
                          --header 'Authorization: ${env.CORTEX_API_KEY}' \\
                          --header 'x-xdr-auth-id: ${env.CORTEX_API_KEY_ID}' \\
                          --silent
                    """, returnStdout: true).trim()
                    def downloadUrl = sh(script: """echo '${response}' | jq -r '.signed_url'""", returnStdout: true).trim()
                    sh """
                        curl -o cortexcli '${downloadUrl}'
                        chmod +x cortexcli
                        ./cortexcli --version
                    """
                }
            }
        }
        stage('Run Scan') {
        // Replace the repo-id with your repository like: owner/repo
            steps {
                script {
                    unstash 'source'
                    sh """
                    ./cortexcli \\
                      --api-base-url "${env.CORTEX_API_URL}" \\
                      --api-key "${env.CORTEX_API_KEY}" \\
                      --api-key-id "${env.CORTEX_API_KEY_ID}" \\
                      code scan \\
                      --directory "\\$(pwd)" \\
                      --repo-id <REPLACE WITH REPO_OWNER/REPO_NAME> \\
                      --branch <REPLACE WITH BRANCH> \\
                      --source "JENKINS" \\
                      --create-repo-if-missing
                    """
                }
            }
        }
    }
}
```

#### For ARM architecture

```
pipeline {
    agent {
        docker {
            image 'cimg/node:22.17.0' // Replace with a suitable image or executor
            args '-u root'
        }
    }
    environment {
        CORTEX_API_KEY = credentials('CORTEX_API_KEY')
        CORTEX_API_KEY_ID = credentials('CORTEX_API_KEY_ID')
        CORTEX_API_URL = <your_cortex_api_url> 
    }
    stages {
        stage('Checkout Repository') {
            steps {
                  git branch: 'main', url: 'this-is-repository-url-example'
                  stash includes: '\*\*/\*', name: 'source'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh '''
                apt update
                apt install -y curl jq git
                '''
            }
        }
        stage('Download cortexcli') {
            steps {
                script {
                    def response = sh(script: """
                        curl --location '${env.CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=arm64' \\
                          --header 'Authorization: ${env.CORTEX_API_KEY}' \\
                          --header 'x-xdr-auth-id: ${env.CORTEX_API_KEY_ID}' \\
                          --silent
                    """, returnStdout: true).trim()
                    def downloadUrl = sh(script: """echo '${response}' | jq -r '.signed_url'""", returnStdout: true).trim()
                    sh """
                        curl -o cortexcli '${downloadUrl}'
                        chmod +x cortexcli
                        ./cortexcli --version
                    """
                }
            }
        }
        stage('Run Scan') {
        // Replace the repo-id with your repository like: owner/repo
            steps {
                script {
                    unstash 'source'
                    sh """
                    ./cortexcli \\
                      --api-base-url "${env.CORTEX_API_URL}" \\
                      --api-key "${env.CORTEX_API_KEY}" \\
                      --api-key-id "${env.CORTEX_API_KEY_ID}" \\
                      code scan \\
                      --directory "\\$(pwd)" \\
                      --repo-id <REPLACE WITH REPO_OWNER/REPO_NAME> \\
                      --branch <REPLACE WITH BRANCH> \\
                      --source "JENKINS" \\
                      --create-repo-if-missing
                    """
                }
            }
        }
    }
}
```

## Onboard private package registries
Onboard your private package registries to secure your internal software supply chain. While private registries protect your source code from public access, they also create visibility gaps for standard security scanners. By connecting these registries, you grant the Software Composition Analysis (SCA) scanner the access required to resolve private dependencies and build artifacts. This ensures that vulnerabilities hidden within your internal libraries are detected, enabling comprehensive risk visibility across your development environment.

Cortex Cloud Application Security currently supports JFrog registries.

### JFrog Artifactory
Onboard JFrog Artifactory to authorize the Software Composition Analysis (SCA) scanner to resolve packages stored in your private Artifactory instance. By retrieving dependency metadata directly from the registry, the scanner can build accurate dependency trees and reliably detect vulnerabilities in your private libraries.

#### Integration scope

-   SCA vs Image scanning: to build accurate dependency trees. It does not support container image scanning. To scan images, you must configure a separate JFrog Artifactory instance. To integrate JFrog Artifactory for image scans, refer to Connect JFrog container registry.
    
-   You can onboard only one JFrog Artifactory instance. Within that instance, you can configure one integration for each supported package manager type
    

#### Supported environments

Supports both JFrog Artifactory Cloud (SaaS) and JFrog Artifactory Self-Hosted (On-Premises) environments.JFrog Cloud Artifactory (SaaS)

#### Supported package managers

-   `Maven`: Supports mirroring
    
-   `Gradle`
    
-   `NPM`:

### Onboard JFrog Artifactory
Follow the steps below to configure the connection to your JFrog Artifactory instance.

**Prerequisite:**

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   JFrog permissions:
    
    -   The permissions associated with the user configured during the onboarding process determine the scope of scan results. Only repositories and artifacts the user can access are included
        
        Repository access: The Artifactory user must have Read access to the specific repositories you want to scan
        
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

###### Onboarding steps

1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
    
2.  Hover over JFrog Artifactory and click Add or Add Another Instance if an instance is already onboarded.
    
3.  Select Package resolution for code scanning as the integration type.
    
4.  Provide an instance name → Enable access by IPs (optional) → Next.
    
    **Note:**
    
    To authorize the scanner to connect through your firewall, select Enable access by IPs, and copy the displayed source IPs to your organization's allowlist.
    
5.  Fill in the provided fields and click Next.
    
    -   Registry URL: Enter your JFrog Artifactory URL.
        
        Example 94. Examples
        
        -   **For JFrog SaaS integrations**: `https://example.jfrog.io`
            
        -   **For JFrog on-premises integrations**: `https://artifactory.example.com`, where `<artifactory.example.com>` is your server domain or IP address
            
        
          
        
    -   Username (required): Your JFrog user name
        
    -   Password (required): Your JFrog password
        
    
6.  Select a package manager to configure a registry as private instead of the default public registry.
    
    **Note:**
    
    -   For Maven:
        
        -   Select Mirror Registry if this repository mirrors an external repository
            
        -   Use the Mirror Of value to define the duplication scope:
            
            -   `*` mirrors all requests
                
            -   Type a request `[value]`: Mirrors only specific requests (such as central).
                
            
        
    -   Package managers not listed will default to the public registry
        
    -   You can only proceed after selecting at least one package manager.
        
    
7.  (Optional): Select Add a package manager to set up an additional package manager.
    
8.  Click Save.
    
9.  **Verify integration**: Verify integration and confirm that the your integrated JFrog Artifactory instance is Connected.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  Filter the table by Provider=JFrog.
        
    3.  Select the resulting displayed instance.
        
    4.  On the Data Source side panel, verify that the Status displays Connected.
        

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

## Ingest third-party data sources
Cortex Cloud Application Security supports the following third party ingestions:

-   Semgrep
    
-   Snyk
    
-   SonarQube
    
-   Veracode
    
-   Generic 3rd Party AppSec Collector
    

**Note:**

Only onboarded and scanned repositories can be mapped.

### View ingested data

**SAST findings and issues**

-   Code Weaknesses issues page: View dedicated SAST issues on the SAST code weaknesses (CWEs) pageSAST code weaknesses (CWEs)
    
-   Asset inventories (Code Weaknesses tab):
    
    -   Repositories Refer to for more information
        
    -   Application : Refer to for more information
        
    

**CVE vulnerabilities findings and issues**

-   Vulnerabilities issues page. View CVE vulnerabilities on the Software Composition Analysis (SCA) vulnerability issues page
    
-   Asset inventories (Vulnerabilities tab):
    
    -   Repositories: Refer to for more information
        
    -   Application: Refer to for more information
        
    

**License miscompliance findings and issues**

-   Licenses issues page. View license miscompliance on the License miscompliance issues page
    
-   Asset inventories (Package Integrity tab):
    
    -   Repositories: Refer to for more information
        
    -   Application: Refer to for more information

### Semgrep

Cortex Cloud AppSec integrates with Semgrep to ingest SCA and SAST findings into the unified AppSec data model.

The Semgrep integration enables automated, periodic ingestion of Semgrep scan results from Semgrep-scanned projects. The integration supports two scan types that can be enabled independently or together:

-   **SCA (Software Composition Analysis)**: Ingests open-source dependency vulnerabilities, producing CVE-based vulnerability findings and software package assets
    
-   **SAST (Static Application Security Testing)**: Ingests code-level security vulnerabilities, producing findings with precise source code locations, CWE classifications, and commit attribution
    

**Pillar Alignment**: ASPM (posture and orchestration) - third-party integration: ingesting external security tool findings into the unified posture management platform.

**Functional responsibilities**

-   **AppSec managers (Governance)**: Consolidate Semgrep findings alongside native Cortex Cloud scan results for unified risk visibility, policy enforcement, and compliance reporting across the application portfolio
    
-   **AppSec Practitioners (Operations)**: Review Semgrep SCA and SAST findings in the Cortex Cloud Findings view, prioritize remediation using CVSS scores and CWE Top 25 classifications, and track fix version availability for vulnerable dependencies
    

**Prerequisite:**

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   Ensure that you have a connected version control system (VCS) and repositories
    
-   **Semgrep**: A valid Semgrep API token
    
    **Note:**
    
    -   To create a Semgrep API token, in Semgrep, navigate to Settings → Tokens → API tokens
        
    -   Ensure you select the **Web API** scope (sometimes labeled as Management or API access depending on your plan)
        
    -   The Web API permission authorizes Cortex Cloud to query the Semgrep API and retrieve your SCA/SAST findings
        
    
    For more information on Semgrep API tokens, refer to [Create a Semgrep app token](https://www.google.com/search?q=https://semgrep.dev/docs/deployment/add-semgrep-to-other-ci-providers/%23create-a-semgrep_app_token).
    
-   Create an egress path to establish the designated route for outbound data transmission from Semgrep to Cortex Cloud
    

#### Onboarding steps

1.  Select Settings → Data Sources & Integrations → \+ Add New.
    
2.  Search for and hover over Semgrep and click Add, or Add Another Instance if an instance is already onboarded.
    
3.  On the Configure Integration step of the integration wizard: Provide your Semgrep API key → Authorize.
    
4.  On the Select Issues Types step of the integration wizard.
    
    Select the type of data findings to ingest: SAST, SCA or both → Next.
    
5.  On the Select Projects step of the integration wizard.
    
    Review the detected Semgrep projects and confirm or manage their repository mappings:
    
    1.  Options:
        
        -   Accept the displayed mapping as detected by Cortex Cloud. This does not require any action on your part
            
        -   Automatically map projects: Select Automatically map future Semgrep projects to ensure maximum security coverage by automatically mapping current and future Semgrep projects to Cortex Cloud repositories
            
        -   Configure unmapped or mismatched projects: Manually configure mapping if Cortex Cloud cannot match a project to a repository or an update to the mapping is required: From the list of detected projects, select the project from the list, then choose the correct repository from the Repository dropdown menu
            
        
    2.  Click Save.
        
    
    **Note:**
    
    -   Mapping establishes relationships between Semgrep projects and Cortex Cloud code repositories, simplifying access management and enabling risk analysis at the repository level, including displaying findings on the tenant
        
    -   Only mapped projects are ingested
        
    
6.  Verify integration and confirm that your integrated Semgrep instance is Connected.
    
    1.  On the Data Sources & Integrations page, search for Semgrep.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate and verify that the status of your instance is Connected and that the mapped projects are displayed and connected.
        

Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance
        
        -   Add or remove repository mappings: Redirects to the Select Issue Type step of the integration wizard, from which the user can navigate to the Map to Repositories step, where you can modify configurations for the selected instance and Save.
            
        -   **Rotate the API key**: Navigate to the Configure Integration step, enter your new Semgrep API key, and Save.
            
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details and management**.
    
    Select an instance row to view comprehensive details of the ingested third-party instance, including:
    
    -   **Integration Health:** Connectivity status
        
    -   **Scope:** The number of applications associated with the integration
        
    -   **Mapping:** The Semgrep target projects and corresponding Cortex mapped repositories, including individual repository connection status
        
    -   **History:** The last ingestion date and the initial integration timestamp
        
    
    **Management Options**
    
    From this view, you can also access a management menu for each instance, allowing you to Edit the instance configuration or Delete the instance entirely from the system.
    

#### What gets cleaned up upon deletion

-   **Integration configuration**: The Semgrep integration record, including the API key, scan type selections, and repository mappings, is permanently deleted
    
-   **Ingested findings**: All SCA and SAST findings that were ingested from Semgrep are removed from the Vulnerabilities and Code Weaknesses tables. The findings are no longer queryable in the issues table, findings table, or platform-level findings table
    
-   **Issues derived from findings**: Issues that were created exclusively from Semgrep-ingested findings are removed. Issues that aggregate findings from multiple data sources (for example, a CVE detected by both Semgrep and a native Cortex scanner) retain the non-Semgrep findings
    
-   **Coverage status**: The Semgrep column on the AppSec Coverage page resets to Disabled for all previously mapped repositories. The aggregate Vulnerabilities and Code Weaknesses coverage columns update to reflect the removal of Semgrep scanning
    
-   **Policy evaluations**: Policy evaluation results that reference Semgrep-ingested findings are removed. Active policies remain configured but no longer match against Semgrep findings
    
-   **Dashboard metrics**: The AppSec Dashboard metrics update to exclude Semgrep-ingested findings from aggregated counts, charts, and trend data
    

**Important:**

Deletion is irreversible. To restore Semgrep findings after deletion, reconfigure the integration and wait for the next polling cycle to re-ingest findings from Semgrep.

#### Semgrep Software Composition Analysis (SCA) data ingestion

Cortex Cloud ingests, normalizes, and displays Software Composition Analysis (SCA) data from Semgrep

The Semgrep integration enables automated ingestion of Semgrep scan results into Cortex Cloud. The ingested findings appear alongside findings from native Cortex scanners (as well as other third-party integrations such as Snyk).

##### Key benefits

-   **Centralizing Semgrep findings**: Semgrep SCA findings are normalized into the same data model as native Cortex vulnerability findings, enabling unified triage, policy enforcement, and reporting
    
-   **Risk-Based Prioritization**: Semgrep SCA findings inherit the Cortex Cloud risk prioritization framework. Each finding is enriched with CVSS scores, EPSS scores, risk factor labels and contextual prioritization tags, enabling practitioners to focus on the most exploitable and business-critical vulnerabilities first
    
-   **Extending Coverage visibility**: The AppSec Coverage page displays a dedicated Semgrep column that indicates which repositories have Semgrep scanning enabled
    
-   **Enabling policy enforcement**: Semgrep SCA findings are evaluated against Application Security policies, enabling block actions on PRs and CI pipelines based on Semgrep-detected vulnerabilities
    

##### View SCA issues generated from ingested Semgrep findings

Issues generated from Semgrep findings are displayed in the Vulnerabilities issues table: Navigate to Application Security → Issues → Vulnerabilities.

The table displays all vulnerability issues across all data sources, including Semgrep. To identify Semgrep-originated vulnerability issues, use one of the following options:

-   **Identify Semgrep-origin issues in the issue side panel**
    
    1.  Open any vulnerability issue by selecting the row.
        
    2.  In the issue side panel, locate the Scanner field in the impact fields section, which identifies Semgrep as the originating scanner.
        
    
-   **Identify Semgrep-origin findings**:
    
    1.  Switch to the Findings tab (using the control at the top of the Vulnerabilities page).
        
    2.  Filter the Data Source column by SEMGREP to isolate Semgrep-originated findings.
        
    
-   **Navigate from the AppSec Coverage page**
    
    1.  Navigate to Application Security → AppSec Coverage.
        
    2.  Filter the Semgrep column (using the value `is_scanned_by_semgrep`) by ENABLED to identify repositories with active Semgrep scanning.
        
    3.  Select a repository to drill down into its findings.

#### Semgrep Static Application Security Testing (SAST) data ingestion

Cortex Cloud ingests, normalizes, and displays SAST data from Semgrep

The Semgrep integration enables automated ingestion of Semgrep SAST scan results into Cortex Cloud. The ingested findings appear alongside findings from native Cortex scanners and other third-party integrations (such as Snyk).

##### Key benefits

-   **Centralizing Semgrep findings**: Semgrep SAST findings are normalized into the same data model as native Cortex code weakness findings, enabling unified triage, policy enforcement, and reporting
    
-   **Extending Coverage visibility**: The AppSec Coverage page displays a dedicated Semgrep column that indicates which repositories have Semgrep scanning enabled, and a Code Weaknesses column that reflects aggregate SAST scanning status
    
-   **Enabling policy enforcement**: Semgrep SAST findings are evaluated against Application Security policies, enabling block actions on PRs and CI pipelines based on Semgrep-detected code weaknesses
    

##### View SAST issues generated from ingested Semgrep findings

Issues generated from Semgrep findings are displayed in the Code Weaknesses issues table: Navigate to Application Security → Issues → Code Weaknesses.

The table displays all code weakness issues across all data sources, including Semgrep, although the Data Source column displays the VCS provider. To identify Semgrep-originated vulnerability issues, use one of the following options:

-   **Identify Semgrep-origin issues in the issue side panel**
    
    1.  Open any code weakness issue by selecting the row.
        
    2.  In the issue side panel, locate the Scanner field in the impact fields section, which identifies Semgrep as the originating scanner.
        
    
-   **Identify Semgrep-origin findings**:
    
    1.  Switch to the Findings tab (using the segmented control at the top of the Code Weaknesses page).
        
    2.  Filter the Data Source column by SEMGREP to isolate Semgrep-originated findings.
        
    
-   **Navigate from the AppSec Coverage page**
    
    1.  Navigate to Application Security → AppSec Coverage.
        
    2.  Filter the Semgrep column (using the value `is_scanned_by_semgrep`) by ENABLED to identify repositories with active Semgrep scanning.
        
    3.  Select a repository to drill down into its findings.

### Snyk

Configure the Snyk integration to ingest SAST and SCA vulnerability findings into Cortex Cloud, unifying your software package assets and security code.

The Snyk integration connects Cortex Cloud to your Snyk organization, enabling automatic ingestion of security findings from Snyk-scanned repositories. The integration supports two scan types that can be enabled independently or together:

-   **SCA (Software Composition Analysis)**: Ingests open-source dependency vulnerabilities, producing software package assets and CVE-based vulnerability findings
    
-   **SAST (Static Application Security Testing)**: Ingests code-level security vulnerabilities, producing findings with precise source code locations, CWE classifications, and commit attribution
    

**Key benefits**

-   **Unified visibility**: Snyk findings appear alongside native scan results in the Asset inventory, and Issues and Findings views streamlines remediation and provides a clear, comprehensive view of your application security posture.
    
-   **Dual scan coverage**: Enable SCA, SAST, or both scan types per integration to match your Snyk deployment configuration
    
-   **Normalized Data**: Snyk findings are normalized into the Cortex Cloud data model, enabling cross-tool comparison, unified filtering, and consistent prioritization
    
-   **Automated Ingestion** After initial setup, findings are ingested automatically when external project scans are triggered
    

**Pillar Alignment**: ASPM (posture and orchestration) - Third-Party Integration: Ingesting external security tool findings into the unified posture management platform.

**Functional responsibilities**

-   **AppSec managers (Governance)**: Consolidate Snyk findings alongside native Cortex Cloud scan results for unified risk visibility, policy enforcement, and compliance reporting across the application portfolio
    
-   **AppSec Practitioners (Operations)**: Review Snyk SCA and SAST findings in the Cortex Cloud Findings view, prioritize remediation using CVSS scores and CWE Top 25 classifications, and track fix version availability for vulnerable dependencies
    

**Prerequisites:**

-   **Permissions**: The following user permissions are required:
    
    -   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
        
    -   Ensure that you have a connected version control system (VCS) and repositories
        
    -   **Snyk permissions and requirements**:
        
        -   **Permissions**: The Snyk API token must have direct organization-level access. The token must have explicit access to the specific Snyk organization being integrated. Group-level permissions alone are not sufficient because Snyk’s REST API requires explicit authorization at the individual Organization level to access scoped endpoints
            
        -   **Organization-Level (mandatory)**: Assign the **Org Collaborator** role to the specific organization
            
        -   **Recommended account type**: Generate and save the API token from a **Service Account**. Service accounts are decoupled from individual users, ensuring the integration remains uninterrupted even if an employee leaves the organization or changes roles
            
        -   **Access control**: These roles authorize Cortex Cloud to list applications and retrieve findings without granting excessive administrative privileges
            
        
    

Supported Snyk API endpoints:

| Region | API Hostname |
| --- | --- |
| US (default) | api.snyk.io |
| US (legacy) | api.us.snyk.io |
| EU | api.eu.snyk.io |
| AU | api.au.snyk.io |

#### Onboarding steps

1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
    
2.  Search for and hover over Snyk and click Add, or Add Another Instance if an instance is already onboarded.
    
3.  On the Configure Integration step of the integration wizard.
    
    1.  Configure Snyk parameters:
        
        -   Select your Snyk API URL from the menu (for example `API URLSNYK-US-02 (https://api.us.snyk.io/rest`))
            
        -   Enter your Snyk API token
            
        
    2.  Click Authorize.
        
4.  On the Select Organization step of the wizard: Enter your Snyk Organization ID → Next.
    
    **Note:**
    
    Select Test Connection to verify that Cortex Cloud can connect to your Snyk organization.
    
5.  On the Select Issue Types step of the wizard: Select the type of data findings to be ingested: SAST, SCA or both → Next.
    
    **Note:**
    
    -   SCA requires Snyk Open Source or Snyk Container projects configured in the organization
        
    -   SAST requires Snyk Code enabled and projects configured in the organization
        
    
6.  Select ingestion targets: On the Map to Repositories step of the wizard, review the detected Snyk projects and confirm or manage their repository mappings
    
    1.  -   Select Automatically map future Snyk applications to automatically map current and future Snyk projects to Cortex Cloud repositories. This is recommended to ensure maximum security coverage
            
        -   Configure unmapped or mismatched applications: Manually configure mapping if Cortex Cloud cannot match an application to a repository or an update to the mapping is required: From the list of detected applications, select the application from the list, then choose the correct repository from the Repository dropdown menu
            
        
    2.  Click Save.
        
    
    **Note:**
    
    -   Mapping establishes relationships between Snyk applications and Cortex Cloud code repositories, simplifying access management and enabling risk analysis at the repository level, including displaying findings on the tenant
        
    -   Only mapped applications are ingested
        
    
    After saving, Cortex Cloud triggers the initial scan ingestion for the selected targets.
    
7.  Verify integration and confirm that the your integrated Snyk instance has a status of Connected.
    
    1.  Navigate to Settings → Data Sources & Integrations → Filter for Snyk.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate and verify that the status of your instance is Connected and that the mapped applications are displayed and connected.
        

Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Issue Type step of the integration wizard, from which the user can navigate to the Map Repositories step, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details and management**.
    
    Select an instance row to view comprehensive details of the ingested third-party instance, including:
    
    -   **Integration Health:** Connectivity status and the Snyk domain
        
    -   **Scope:** The number of applications associated with the integration
        
    -   **Mapping:** The Snyk target and corresponding Cortex mapped repositories, including individual repository connection status
        
    -   **History:** The last ingestion date and the initial integration timestamp
        
    
    **Management Options**
    
    From this view, you can also access a management menu for each instance, allowing you to Edit the instance configuration or Delete the instance entirely from the system.
    

#### What gets cleaned up upon deletion

When a Snyk integration is deleted, findings and issues from previous Snyk scans are not closed/resolved. The deletion only removes:

-   The integration configuration itself
    
-   The external project mappings (Snyk organizations/projects)
    
-   The scan configuration records
    
-   CI/CD graph entities via lifecycle event
    

The findings and issues that were ingested from Snyk scans remain active in the system after the integration is deleted. This is a behavioral difference from VCS integrations where findings are closed and issues are resolved upon deletion.

#### Next step: View and manage ingested findings

After third-party scanner integration is configured, Cortex Cloud automatically ingests and normalizes the scan results.Operational management of these findings is consolidated based on the detection type:

-   Software Composition Analysis (SCA)sca-third-party-supply-chain
    
-   Static Application Security Testing (SAST)

#### Snyk Software Composition Analysis (SCA) ingestion
**Abstract:** How Cortex Cloud ingests, normalizes, and displays Software Composition Analysis (SCA) data from Snyk, including software package assets and CVE findings.

When the SCA scan type is enabled in the Snyk integration, Cortex Cloud ingests open-source dependency vulnerability data. For each Snyk target, the system fetches projects of the SCA type, retrieves associated findings, and produces both Software Package assets and Vulnerability findings. These raw findings are then enriched and, when they meet specific risk thresholds, elevated into actionable issues; the fundamental unit for remediation in Cortex Cloud.

##### Supported SCA ecosystems

The following Snyk project types are supported for SCA ingestion:

| Snyk project type | Package manager |
| --- | --- |
| npm | NPM |
| yarn / yarn-workspace | Yarn |
| pip / poetry | PyPI |
| maven | Maven |
| gradle | Gradle |
| gomodules / golang / golangdep / govendor | Go Modules |
| rubygems | RubyGems |
| nuget / paket | NuGet |
| composer | Composer |
| cocoapods | CocoaPods |
| hex | Hex |

##### Manage SCA issues generated from Snyk findings

You can view and manage SCA issues generated from ingested Snyk SCA findings to assess and manage vulnerabilities: Navigate to Modules → Application Security → Vulnerabilities (under Issues).

For more information about SCA issues and findings, refer to Software Composition Analysis (SCA) vulnerability issues.Software Composition Analysis (SCA) vulnerability issues

##### View Snyk SCA findings in Cortex Cloud

1.  Sign in to the Cortex Cloud console.
    
2.  In the tenant, navigate to Posture Management **Posture Management** > **Findings**.
    
3.  Apply filters to locate Snyk SCA findings:
    
    -   **Data Source:** SNYK
        
    -   **Detection Method:** CAS_CVE_SCANNER
        
    -   **Report Identifier:** ThirdParty_SNYK_SCA
        
    -   **Asset Type:** <LANGUAGE>_PACKAGE (e.g., JAVASCRIPT_PACKAGE)
        
    

##### SCA FAQs

-   **Does the Snyk integration generate SBOM reports?** No. The Snyk integration creates software package assets and vulnerability findings, but does not generate formal SBOM documents (CycloneDX/SPDX). Formal SBOM reports are only generated by the native Cortex Cloud SCA scanner during periodic repository scans
    
-   **Which vulnerability identifier is used when Snyk reports both a CVE and a SNYK ID?** CVE identifiers are prioritized. When a Snyk issue contains both, the CVE is used as the primary vulnerability ID

#### Snyk Static Application Security Testing (SAST) Findings
**Abstract:** A detailed guide on how Cortex Cloud ingests, normalizes, and displays Static Application Security Testing (SAST) code-level vulnerabilities from Snyk Code.

When the SAST scan type is enabled in the Snyk integration, Cortex Cloud ingests code-level security vulnerability data from Snyk Code. For each Snyk target, the system fetches projects of the SAST type, retrieves associated code issues with source location data, and produces code security findings.

##### SAST vulnerability findings

For each code vulnerability, a **SAST Finding** is created with the detection method CAS_SAST_SCANNER. Unlike SCA findings, SAST findings are associated with the repository asset itself and do not create individual software package assets.

| Field | Description | Example |
| --- | --- | --- |
| Rule Name | The vulnerability type name. | Cross-site Scripting (XSS) |
| Severity | The severity level. | HIGH, MEDIUM, LOW |
| CWE | Common Weakness Enumeration identifiers. | CWE-79, CWE-89, CWE-78 |
| File Path | The source file containing the vulnerability. | vulnerable-flask-app.py |
| Start/End Line | The line number where the vulnerability begins and ends. | 51 |
| Code Location | Column-level location information. | Lines 51-51, Columns 16-38 |
| Commit Hash | The Git commit SHA where the vulnerability was detected. | a67cbe59... |
| Language | The programming language, derived from the file extension. | Python |
| Description | The vulnerability description from Snyk. | Cross-site Scripting (XSS) |
| Prioritization Labels | CWE Top 25 or OWASP Top 10 classification. | ["CWE Top 25"] |
| Data Source | The reporting tool. | SNYK |
| Branch | The Git branch where the finding was detected. | main |

##### SAST-specific behaviors

-   **Source location data:** Each SAST finding includes precise source code location information extracted from Snyk Code, including file path, start/end line numbers, and start/end column numbers. This enables direct navigation to the vulnerable code.
    
-   **Commit attribution:** The Git commit hash associated with the vulnerability is captured from Snyk's source location data. This enables tracking which commit introduced the vulnerability.
    
-   **Prioritization labels:** Findings that match CWE Top 25 or OWASP Top 10 categories are automatically tagged with prioritization labels, enabling quick filtering for the most critical vulnerability classes.
    

##### CWE Classification

SAST findings are classified using CWE identifiers extracted from the Snyk issue classes. Common CWE types detected include:

| CWE | Vulnerability Type |
| --- | --- |
| CWE-79 | Cross-site Scripting (XSS) |
| CWE-89 | SQL Injection |
| CWE-78 | Command Injection |
| CWE-23 | Path Traversal |
| CWE-96 | Improper Neutralization of Directives in Statically Saved Code |
| CWE-400 | Regular Expression Denial of Service (ReDoS) |
| CWE-284 | Improper Access Control |

##### SAST data extraction summary

| Data Point | Snyk API Source |
| --- | --- |
| Rule name / Title | attributes.title |
| Severity | attributes.effective_severity_level |
| CWE | attributes.classes[] (type=weakness) |
| File path | location_data[].file_path |
| Line number | location_data[].line_number |
| End line number | location_data[].end_line_number |
| Column number | location_data[].column_number |
| End column number | location_data[].end_column_number |
| Commit hash | location_data[].commit_id |
| Branch | project_attributes.target_reference |
| Description | attributes.description |
| Status | attributes.status |
| Risk score | attributes.risk.score.value |

##### View Snyk SAST findings in Cortex Cloud

1.  Sign in to the Cortex Cloud console.
    
2.  Navigate to **Posture Management** > **Findings**.
    
3.  Apply filters to locate Snyk SAST findings:
    
    -   **Data Source:** SNYK
        
    -   **Detection Method:** CAS_SAST_SCANNER
        
    -   **Report Identifier:** ThirdParty_SNYK_SAST
        
    -   **Asset Type:** repository
        
    

##### SAST Troubleshooting and FAQs

-   **Missing SAST findings:**
    
    -   Verify that Snyk Code is enabled in your Snyk organization settings.
        
    -   Verify that the SAST scan type is enabled in the Cortex Cloud integration configuration.
        
    -   Verify that the selected targets have Snyk Code (SAST) projects, not just Open Source (SCA) projects.
        
    
-   **Are SAST findings linked to specific packages?** No. SAST findings are associated with the repository asset and reference specific source code files and line numbers. Only SCA findings create software package assets.
    

##### Manage SAST code weaknesses generated from ingested Snyk findings

You can view and manage SAST code weaknesses generated from ingested Snyk findings:

-   On the Code Weaknesses page under Cortex Cloud Application Security Issues
    
-   Under the Code Weaknesses tab of the Repositories assets page
    

For more information on SAST code weaknesses, refer to SAST code weaknesses (CWEs).SAST code weaknesses (CWEs)

### SonarQube
You can ingest SAST findings directly from SonarQube into Cortex Cloud Application Security. This allows you to use Cortex Cloud Application Security's analysis and visualization tools to identify critical vulnerabilities, prioritize remediation efforts, and improve your application code security.

SonarQube supports json output format.

**Prerequisite:**

-   Permissions: Ensure you have System Admin, AppSec Admin or GRBAC permissions. For more information on AppSec Admin permissions, refer to Code Security user roles and permissions
    
-   Ensure that you have a connected version control system (VCS) and repositories
    
-   Generate and copy a SonarQube API token. Ensure to assign Web API scope to the API token. Refer to the [SonarQube documentation](https://docs.sonarsource.com/sonarqube-server/latest/user-guide/managing-tokens/#generating-a-token) for more information
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    
    **Note:**
    
    The egress path is required for onboarding a self-hosted instance of SonarQube.
    

###### Onboarding steps

1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
    
2.  Search for and hover over Sonarqube and click Add, or Add Another Instance if an instance is already onboarded.
    
3.  On the Configure Integration step of the integration wizard:
    
    1.  Fill in the provided fields:
        
        -   API Token: Paste the generated SonarQube API token
            
        -   URL and Port: Provide the URL of your SonarQube instance. Port is optional
            
        -   Organization: The SonarQube organization to be associated with the data ingestion. Required for SonarQube Cloud
            
        
    2.  Click Accept.
        
4.  On the Select Applications step of the integration wizard:
    
    1.  Select an option:
        
        -   Accept the displayed mapping as detected by Cortex Cloud Application Security. This does not require any action on your part
            
        -   Manually configure mapping if Cortex Cloud Application Security could not match a project to a repository: Select Set in the Cortex Cloud Application Security Repository column, and select a repository from the list that is displayed
            
        -   Automatically map future SonarQube projects
            
        -   Manually modify mapping: Click Replace next to the existing mapped Cortex Cloud Application Security repository. This will open an option to select a different repository from the displayed list, allowing you to update the mapping
            
        
        **Note:**
        
        -   Mapping establishes relationships between SonarQube Applications and Cortex Cloud Application Security code repositories, simplifying access management and enabling risk analysis at the repository level, including displaying findings on the tenant
            
        -   Only mapped projects will be ingested
            
        
    2.  Click Save.
        
5.  Select Close on the Status step of the wizard to complete the integration, initiating an automatic ingestion of data from the integrated SonarQube projects.
    
    **Note:**
    
    Verify that the Connector Created Successfully message is displayed on the page.
    
6.  Verify integration and confirm that the your integrated SonarQube instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, search for SonarQube.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate and verify that the status of your SonarQube instance is Connected.
        

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

###### View SAST code weaknesses generated from ingested SonarQube findings

You can view SAST code weaknesses generated from ingested SonarQube findings:

-   On the Code Weaknesses page under Cortex Cloud Application Security Issues
    
-   Under the Code Weaknesses tab of the Repositories assets page
    

For more information on SAST code weaknesses, refer to SAST code weaknesses (CWEs).SAST code weaknesses (CWEs)

### Veracode
You can ingest SAST findings directly from Veracode into Cortex Cloud Application Security. This allows you to use Cortex Cloud Application Security's analysis and visualization tools to identify critical vulnerabilities, prioritize remediation efforts, and improve your application code security.

Veracode supports `Cyclonedx`, `json` and table output formats.

**Prerequisite:**

-   **Permissions**: The following user permissions are required:
    
    -   **Cortex Cloud**: Instance Admin, AppSec Admin or GRBAC permissions. For more information on AppSec Admin permissions, refer to Code Security user roles and permissions
        
    -   **Veracode**: At minimum, Reviewer permissions are required
        
    
-   Ensure that you have a connected version control system (VCS) system and repositories
    
-   Generate and copy a Veracode access key. The access key includes a key ID and secret
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

###### Onboarding steps

1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
    
2.  Search for and hover over Veracode and click Add, or Add Another Instance if an instance is already onboarded.
    
3.  On the Configure Integration step of the integration wizard:
    
    1.  Fill in the provided fields:
        
        -   Enter the Veracode key ID and secret from step **1b** into their respective fields
            
        -   Select your Veracode region from the Region dropdown
            
        
    2.  Click Authorize.
        
        The integrationSelect Applications step of the integration wizard is displayed, including a list of Veracode applications automatically mapped to Cortex Cloud Application Security repositories.
        
4.  Select an option, and click Save.
    
    -   Select Automatically map future Veracode applications to automatically map all future applications to Cortex Cloud Application Security repositories
        
    -   Manually map Veracode applications to Cortex Cloud Application Security repositories: Click on a Cortex Cloud Application Security repository and select the required repository
        
        **Note:**
        
        Only mapped applications will be ingested.
        
    
    1.  -   All current applications
            
        -   All current and future applications
            
            **Note:**
            
            This is the recommended option to ensure complete coverage and successful operation of all features.
            
        -   Only selected applications, and then select the applications from the menu
            
        
    2.  Click Next.
        
5.  On the Map to Repositories step of the wizard:
    
    1.  Select an option:
        
        -   Accept the displayed mapping as detected by Cortex Cloud Application Security . This does not require any action on your part
            
        -   Manually configure mapping if Cortex Cloud Application Security could not match a project to a repository: Select Set in the Cortex Cloud Application Security Repository column, and select a repository from the list that is displayed
            
        -   Reject mapping: Check the Don’t map any applications box
            
        -   Manually modify mapping: Click Replace next to the existing mapped Cortex Cloud repository. This will open an option to select a different repository from the displayed list, allowing you to update the mapping
            
        
        **Note:**
        
        -   Mapping establishes relationships between Veracode projects and Cortex Cloud Application Security code repositories, simplifying access management and enabling risk analysis at the repository level, including displaying findings on the tenant
            
        -   Only mapped projects will be ingested
            
        
    2.  Click Next.
        
6.  Select Done on the Status step of the wizard to complete the integration, initiating an automatic ingestion of data from the integrated Veracode projects.
    
    **Note:**
    
    Verify that the Connector Created Successfully message is displayed on the page.
    
7.  Verify integration and confirm that the your integrated Veracode instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, search for Veracode.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate and verify that the status of your Veracode instance is Connected.
        

###### Limitations

-   Currently, Veracode SAST ingestion supports Veracode periodic and CLI scans. Pull Request scans and other types are not supported
    
-   History, deduplication and DevEx features such as PR comments, IDE, CLI and enforcement are not supported
    

###### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

###### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

###### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

#### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

#### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

#### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

#### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

#### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

###### View SAST code weaknesses generated from ingested Veracode findings

You can view SAST code weaknesses generated from ingested Veracode findings:

-   On the Code Weaknesses page under Cortex Cloud Application Security Issues
    
-   Under the Code Weaknesses tab of the Repositories assets page
    

For more information on SAST code weaknesses, refer to SAST code weaknesses (CWEs).SAST code weaknesses (CWEs)

### Generic 3rd Party AppSec Collector
The 3rd Party AppSec Collector automatically uploads Static Application Security Testing (SAST) data from third-party tools that support SARIF (Static Analysis Results Interchange Format) output. This allows you to view your SAST data directly within Cortex Cloud. Once SARIF files are uploaded, they are parsed to create code findings. These findings can then be elevated to issues, either manually or automatically, depending on your configured policies.

**Important:**

File uploads are limited to a maximum size of 10 MB.

After onboarding the 3rd Party AppSec Collector, you can view SAST code weaknesses generated from ingested SARIF findings in these locations:

-   On the Code Weaknesses page under Cortex Cloud Application Security Issues
    
    For more information about SAST issues under Code Weaknesses issues, refer to Manage code weaknesses
    
-   Under dedicated Code Weaknesses tabs on the Repositories or Business Applications assets pages, where relevant SAST issues have been identified for that asset.
    
    -   For more information about SAST issues on the Code Weaknesses tab under Repositories assets, refer to In-depth repository asset information
        
    -   For more information about SAST issues on the Code Weaknesses tab under Business Applications assets, refer to Business application expanded asset details

#### Onboard the 3rd Party AppSec Collector
Before you begin, fulfill these prerequisites.

**Prerequisites:**

-   **Permissions**: The following Cortex Cloud user roles or RBAC permissions are required:
    
    -   **User roles**: CortexCortex Cloud Cloud Instance Admin, AppSec Admin
        
    -   **RBAC**: View/Edit permissions for Data Sources configurations are required when not using a dedicated user role
        
    
    For more information about user permissions and groups, refer to Assign user roles and groups.
    
-   Onboard the repository into the system before SARIF findings for that repository can be uploaded
    
-   **SARIF specifications**: The following table outlines the mandatory and optional JSON fields required to successfully validate and ingest SAST findings.
    
    Cortex Cloud Application Security supports only valid SARIF files that strictly adhere to the SARIF standard (v2.1.0). The collector will not ingest files with invalid formats or schema violations. Ensure your third-party tool output is validated before upload.
    
    | Field Path | Requirement | Description and Validation |
    | --- | --- | --- |
    | `version` | Mandatory | The SARIF version number. Must be explicitly set to the string value `2.1.0` |
    | `tool.driver.name` | Mandatory | A string identifying the primary analysis tool used |
    | `runs.tool.driver.rules` OR `runs.tool.extensions.rules` | Mandatory | At least one of these must be populated to define all ruleId's used in the results |
    | `run.results.ruleId` | Mandatory | The unique identifier for the specific rule violated. This must exactly match an id defined in the rules array |
    | `run.results[].locations[].physicalLocation.artifactLocation.uri` | Mandatory | The relative or absolute URI for the file where the finding was detected |
    | `run.results[].locations[].physicalLocation.region`, | Mandatory | The specific region within the file where the finding is located. This object must contain the `startLine` property to identify the location |
    | `run.results.message.text` | Mandatory | A human-readable, plain-text description of the finding. This is the primary text displayed to the user. |
    | `run.results.level` | Optional | The severity level of the finding. Allowed values are error, warning, note, or none. If omitted, a Low severity level is set by default |
    

1.  Select Settings → Data Sources & Integrations → \+ Add New → and enter 3rd Party AppSec Collector in the search bar.
    
2.  On the Configure Collector step of the integration wizard.
    
    1.  Provide a Collector Name (required): This is a free-text field. You can input any descriptive name.
        
        **Note:**
        
        We recommend using the `tool.driver.name` from the SARIF file.
        
    2.  Click Generate API Key to obtain the collector instance API key ID and key secret.
        
3.  On the API Key step of the integration wizard.
    
    1.  Copy and save the generated API key ID and API secret.
        
        **Warning:**
        
        The API key ID and API secret cannot be retrieved once the wizard is closed.
        
    2.  Copy the API URL.
        
        **Note:**
        
        This is the newly created generic collector API URL endpoint.
        
    3.  Select Next.
        
4.  (Optional): Validate the file format on the Test step of the wizard to ensure it meets all ingestion requirements.
    
    **Note:**
    
    Only the validity of the format is tested. No findings will be generated from the test file.
    
    1.  Browse and upload the required file.
        
        After upload, you'll see one of the following validation outcomes:
        
        -   Validation completed successfully
            
        -   Validation finished with warnings: One or more of the properties of at least one of the **results** of the SARIF format failed validation
            
        -   Validation failed: one of the mandatory fields is missing/wrong value. See SARIF mandatory fields in the prerequisites above
            
        
    2.  Select Done.
        
5.  Setup the data extraction to programmatically send the SARIF SAST results to the Cortex Cloud 3rd Party AppSec Collector instance via API.
    
    You need to add the following values to the API request:
    
    -   The Cortex Cloud API key ID and secret generated in **step 2** above
        
    -   The Cortex Cloud URL copied in **step 3** above
        
    -   Your Cortex Cloud repository ID. To retrieve the repository ID, under Inventory, navigate to All Assets → Repositories (under Code) → select a repository → copy the Asset ID value from the Properties section of the side card
        
    -   (Optional) Branch: Default unless specified
        
    
    Example 95. Example Setups
    
    -   `cURL`
        
        ```
        curl -X POST {API_URL_FROM_RESPONSE}?repository_id={repository_asset_id}&branch={branch_name} -H 'x-crtx-auth-id: {token_id}' -H 'Authorization: {api_token}' -H 'Content-Type: application/json' -d '{"example": "value"}' 
        ```
        
    -   Full `cURL` example
        
        Read more...
        
        ```
        curl --location '{base-URL}' \\
          --header 'Authorization:{API_KEY}' \\
          --header 'x-crtx-auth-id: {API_KEY_ID}' \\
          --header 'Content-Type: application/json' \\
          --data '{
            "$schema": "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json",
            "version": "2.1.0",
            "runs": [
              {
                "tool": {
                  "driver": {
                    "name": "Veracode Static Analysis Policy Scan",
                    "rules": [
                      {
                        "id": "78",
                        "name": "Improper Neutralization of Special Elements used in an OS Command ('\\\\''OS Command Injection'\\\\'')",
                        "shortDescription": {
                          "text": "CWE-78: Improper Neutralization of Special Elements used in an OS Command ('\\\\''OS Command Injection'\\\\'')"
                        },
                        "helpUri": "https://cwe.mitre.org/data/definitions/78.html",
                        "properties": {
                          "category": "STATIC",
                          "tags": [
                            "STATIC"
                          ]
                        },
                        "defaultConfiguration": {
                          "level": "error"
                        }
                      },
                      {
                        "id": "89",
                        "name": "Improper Neutralization of Special Elements used in an SQL Command ('\\\\''SQL Injection'\\\\'')",
                        "shortDescription": {
                          "text": "CWE-89: Improper Neutralization of Special Elements used in an SQL Command ('\\\\''SQL Injection'\\\\'')"
                        },
                        "helpUri": "https://cwe.mitre.org/data/definitions/89.html",
                        "properties": {
                          "category": "STATIC",
                          "tags": [
                            "STATIC"
                          ]
                        },
                        "defaultConfiguration": {
                          "level": "error"
                        }
                      }
                    ],
                    "version": "1.0"
                  }
                },
                "results": [
                  {
                    "level": "error",
                    "rank": 5,
                    "message": {
                      "text": "<span>This call to java.lang.ProcessBuilder.start() contains a command injection flaw.  The argument to the function is constructed using untrusted input.  If an attacker is allowed to specify all or part of the command, it may be possible to execute commands on the server with the privileges of the executing process.  The level of exposure depends on the effectiveness of input validation routines, if any. start() was called on the processBuilder object, which contains tainted data. The tainted data originated from an earlier call to AnnotationVirtualController.vc_annotation_entry.</span> <span>Validate all untrusted input to ensure that it conforms to the expected format, using centralized data validation routines when possible.  When using blocklists, be sure that the sanitizing routine performs a sufficient number of iterations to remove all instances of disallowed characters.  Most APIs that execute system commands also have a \\\\\\"safe\\\\\\" version of the method that takes an array of strings as input rather than a single string, which protects against some forms of command injection.</span> <span>References: <a href=\\\\\\"https://cwe.mitre.org/data/definitions/78.html\\\\\\">CWE</a> <a href=\\\\\\"https://owasp.org/www-community/attacks/Command_Injection\\\\\\">OWASP</a></span>"
                    },
                    "locations": [
                      {
                        "physicalLocation": {
                          "artifactLocation": {
                            "uri": "com/scalesec/vulnado/Cowsay.java"
                          },
                          "region": {
                            "startLine": 16
                          }
                        },
                        "logicalLocations": [
                          {
                            "name": "Cowsay.java",
                            "fullyQualifiedName": "com.scalesec.vulnado.Cowsay.run",
                            "kind": "function"
                          },
                          {
                            "fullyQualifiedName": "java.lang.ProcessBuilder.start",
                            "kind": "member",
                            "parentIndex": 0
                          }
                        ]
                      }
                    ],
                    "ruleId": "78",
                    "partialFingerprints": {
                      "context_guid": "",
                      "file_path": "",
                      "procedure": ""
                    }
                  },
                  {
                    "level": "error",
                    "rank": 4,
                    "message": {
                      "text": "<span>This database query contains a SQL injection flaw.  The call to java.sql.Statement.executeQuery() constructs a dynamic SQL query using a variable derived from untrusted input.  An attacker could exploit this flaw to execute arbitrary SQL queries against the database. The first argument to executeQuery() contains tainted data from the variable query. The tainted data originated from an earlier call to AnnotationVirtualController.vc_annotation_entry.</span> <span>Avoid dynamically constructing SQL queries.  Instead, use parameterized prepared statements to prevent the database from interpreting the contents of bind variables as part of the query.  Always validate untrusted input to ensure that it conforms to the expected format, using centralized data validation routines when possible.</span> <span>References: <a href=\\\\\\"https://cwe.mitre.org/data/definitions/89.html\\\\\\">CWE</a> <a href=\\\\\\"https://owasp.org/www-community/attacks/SQL_Injection\\\\\\">OWASP</a></span>"
                    },
                    "locations": [
                      {
                        "physicalLocation": {
                          "artifactLocation": {
                            "uri": "com/scalesec/vulnado/User.java"
                          },
                          "region": {
                            "startLine": 49
                          }
                        },
                        "logicalLocations": [
                          {
                            "name": "User.java",
                            "fullyQualifiedName": "com.scalesec.vulnado.User.fetch",
                            "kind": "function"
                          },
                          {
                            "fullyQualifiedName": "java.sql.Statement.executeQuery",
                            "kind": "member",
                            "parentIndex": 0
                          }
                        ]
                      }
                    ],
                    "ruleId": "89",
                    "partialFingerprints": {
                      "context_guid": "",
                      "file_path": "",
                      "procedure": ""
                    }
                  }
                ]
              }
            ]
          }'
        ```
        
    -   `Python 3`
        
        ```
        import requests
        import json
        
        def generic_collector(token_id, api_token):
            headers = {
                "Authorization": {token_id},
                "x-crtx-auth-id": {api_token},
                "Content-Type": "application/json"
            }
        
            body = json.dumps({"example": "value"})
            res = requests.post(url="{API_URL_FROM_RESPONSE}?repository_id={repository_asset_id}&branch={branch_name}",
                                headers=headers,
                                data=body)
            return res
        ```
        
    
      
    
6.  Validate the connector status.
    
    1.  Navigate to Settings → Data Sources & Integrations → and enter 3rd Party AppSec Collector in the search bar.
        
    2.  Select View Details.
        
    3.  Check that your instance is displayed on the Collector Instances page, and that the status of your instance is Connected.
        

##### Manage 3rd Party AppSec Collector instances

1.  Navigate to Settings → Data Sources & Integrations → and enter 3rd Party AppSec Collector in the search bar.
    
2.  Select View Details.
    
3.  Right-click on your instance → Edit instance.
    
    You are redirected to the Generic 3rd Party AppSec Collector onboarding wizard to modify required content.

## Manage data source integrations
Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note:**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

#### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

#### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

### Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

### Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

### Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

### Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

### Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

## Transporter over Broker VM

Transporter over Broker VM sets up a secure communication channel between your VCS and Cortex.

The Transporter over Broker VM enables secure communication between your self-hosted Version Control Systems (VCS) and Cortex Cloud. This solution addresses the need for secure code scanning without exposing your internal network to the cloud.

### Use cases

-   **Enhanced security**: Establish a secure network tunnel for your self-hosted VCS, eliminating the need to open direct IP access to the cloud for scanning
    
-   **Seamless Integration**: Leverage the existing Cortex Cloud Broker VM infrastructure to deploy and manage the Transporter applet
    
-   **Simplified management**: Configure and manage the Transporter applet directly through the Cortex Cloud console
    
-   **Automated updates**: The Broker VM automatically receives updates and enhancements, providing new capabilities to the Transporter without manual intervention
    

### License

To gain access to the Transporter applet, you must have a Cloud license (Posture Management or Runtime Management) or a XSIAM Premium license.

**Warning:**

The Transporter applet is not supported for FedRAMP customers.

### Key components

The Transporter over Broker VM solution includes the following key components:

-   **Transporter applet** This component runs within your internal network, specifically on a Broker VM. The applet requires access to your self-hosted version control providers (VCS) such as GitHub Server.
    
    The Transporter:
    
    -   Establishes and maintains secure, long-lived connections to both your tenant and your VCS providers
        
    -   Operates based on events from the VCS provider or triggers initiated from your tenant
        
    
-   **Broker VM**: In the Cortex Cloud Application Security environment, the Broker VM is a secured virtual machine (VM) designed to host the Transporter applet within your network. The Transporter applet is installed as an application or connector directly onto the Broker VM.
    
    **Note:**
    
    -   The broker enables multiple connections, allowing a single Transporter applet to connect to various VCS instances
        
    -   Multiple Transporter applets cannot be created on a single Broker VM. Each Broker VM is limited to a single Transporter applet instance
        
    
-   **Cortex Tenant**: Serves as the central cloud platform with several key functions in the Transporter system:
    
    -   Acts as the cloud endpoint for the secure, long-lived WebSocket tunnel established by the Transporter applet running on your Broker VM
        
    -   Links the Transporter applet to your self-managed VCS data sources, utilizing the secure tunnel for all communication.
        
    -   Receives the data uploaded by the Transporter from your environment
        
    -   Server as the scanner execution environment and results
        
    -   Provides the interface for configuring and managing the Transporter system, as well as reviewing and managing the scan results
        
    -   Monitors the status and health of your Transporter applets, providing visibility into their operation
        
    

### Set up the Transporter

The order for setting up the Transporter solution is as follows:

**Prerequisites:**

-   Ensure you have the necessary permissions and have already set up your Broker VM
    
-   Confirm that your Broker is v 28 or above
    
-   Whitelist IP addresses to enable access to Cortex Cloud resources. The IP addresses for the Transporter are in the Broker VM Resources section of the Enable access to required PANW resources document
    
-   Open port `4052` (inbound), which is required for the Transporter's IP address communication
    
-   Open Port `443` (outbound), which is required for the Broker VM to pull data from the your version control system (VCS)
    

1.  Set up the Transporter applet on your Broker VM.
    
2.  Onboard the Transporter on your VCS.

### Set up a Transporter applet on Broker VM

Setup a Transporter applet on Broker VM.

This section describes how to set up and configure a Transporter applet on a Broker VM.

**Prerequisite:**

Permissions: To configure and manage Transporter applet settings, you must have permissions to manage Broker Service configurations (such as an Instance Administrator)

1.  Setup a Broker VM.
    
    Refer to Set up and configure Broker VM for more information.
    
2.  Select Settings → Configurations → Broker VMs.
    
3.  Select the Brokers tab → locate your Broker VM → hover and click + Add under the Apps column → AppSec Transporter.
    
    A connector for AppSec Transporter is opened.
    
    **Note:**
    
    You cannot add a Transporter applet through Clusters.
    
4.  Configure the Transporter connection in the provided fields:
    
    -   Transporter Name (required). Requires a unique name as you can integrate multiple applets for different integrations
        
    -   Provider Self Signed CA Certificate Path: Specify the file path for a custom Certificate Authority (CA) certificate used by the Transporter to securely communicate with services
        
    
5.  Click Save.
    
6.  Verify integration and connectivity: Locate your AppSec Transporter applet under the Apps column. Click it to confirm it displays a Connected status.
    
    Proceed to configure the Transporter applet on your self-managed VCS data sources instance.
    

#### Add Connections

The broker enables multiple connections, allowing a single Transporter applet to connect to various VCS instances (such as GitHub and GitLab).

1.  Select your AppSec Transporter under the App column → Configure → Add Connection (on the redirected AppSec Transporter setup page).
    
2.  Repeat **steps 4-6** of Set up a Transporter applet on Broker VM above.
    

#### Manage Transporter applets

To manage Transporter applet configurations, disable connections, or deactivate an applet, navigate to the Broker VMs page. From there, select your Appsec Transporter under the App column.

-   **Edit applet configurations**: Select the Appsec Transporter under the App column → Configure. You are redirected to the Transporter applet settings to manage its configurations
    
-   **Disable applet connection for a single integration**:
    
    1.  Select the Appsec Transporter under the App column → Configure.
        
    2.  On the Transporter applet configurations page, click on the specific Transporter applet → Disable.
        
        This disables the specific integration, but it can be re-enabled.
        
    
-   **Deactivate an applet** (all connections): Select the Appsec Transporter under the App column → Deactivate → Confirm when prompted
    
    All existing connections are deleted but their configurations are saved in the database. When adding a new connection, you'll be prompted if you want to reuse previous configurations.

### Set up a Transporter on your VCS

Setup a Transporter on your version control system.

You configure a Transporter when onboarding your on-premises version control system (VCS). This setup is performed on the Configure Domain step of the onboarding wizard. GitHub Server, GitLab self-managed and Bitbucket Data Center version control systems support the Transporter integration, where it functions as a network tunnel.

**Prerequisites:**

-   Ensure you have user permissions to onboard data sources.
    
    **Note:**
    
    The dedicated AppSec Admin role includes the required permissions.
    
-   Before you begin you must setup a Transporter applet on your Broker VM. Refer to Set up a Transporter applet on Broker VM for more information
    

1.  Onboard your VCS on-premises data source: Select Settings → Data Sources & Integrations → \+ Add New → , and search for your VCS on-premises data source.
    
2.  Configure the Transporter on the Configure Domain step of the wizard:
    
    1.  Select your Broker VM from the provided menu.
        
    2.  Select the Transporter applet associated with the selected Broker VM from the Transporter Connection menu.
        
3.  Complete the steps required to onboard the VCS data source: Refer to Onboard version control systems for more information about onboarding VCS data sources.
    

**Note:**

**GitLab Enterprise webhook internal IP restriction**: GitLab Enterprise's security policies prevent webhook subscriptions to internal IP addresses (such as broker addresses). These subscriptions can only be enabled through specific instance configuration. For more information, refer to [https://docs.gitlab.com/security/webhooks/](https://docs.gitlab.com/security/webhooks/).
