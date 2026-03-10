---
title: "AWS CodeCommit"
tocId: "h9ZhYFmBmrMubAmsGXbnog"
contentId: "ZO91H9KoxF9~jbUTwtQZDg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/AWS-CodeCommit"
depth: 2
---

# AWS CodeCommit
Integrate Cortex Cloud Application Security with your AWS CodeCommit version control system (VCS) to enable security scans for exposed secrets, infrastructure-as-code (IaC) misconfigurations, vulnerabilities, package operational risks, and license compliance issues in your repositories. This allows you to analyze, prioritize, and resolve detected issues efficiently.

### How the integration works

To ensure security, the platform does not store or use your personal AWS credentials for scanning. Instead, the integration utilizes a cross-account trust relationship through a dedicated IAM Service Role. This relationship is secured using an External ID, a unique security identifier that prevents unauthorized third-party access.

-   **Deployment**: You deploy a CloudFormation template provided during onboarding. This template creates the necessary IAM roles and permissions automatically, requiring no manual configuration
    
-   **The service role**: This template creates a specific IAM role for cross-account access that trusts the platform. The trust policy is automatically configured with a unique **External ID** generated for your tenant. This role follows least privilege principles by requiring only necessary CodeCommit permissions and is limited to the platform AWS account
    
-   **Auditability**: All actions performed by the service role are logged in AWS CloudTrail, providing a permanent audit trail of all repository access and scanning activity for compliance monitoring
    
-   **Scanning policies**: The role includes the required policies for scanning operations and permissions for CodeCommit repository access
    
-   **Events**: The template configures a Simple Notification Service (SNS) topic with an HTTP subscription to the platform webhook URL. The template automatically applies an SNS Access Policy that allows CodeCommit to publish events and authorizes the platform to subscribe to the topic. When code changes occur, this topic pushes a notification to the webhook, triggering the platform to assume the service role and initiate a scan
    

**Danger**

Before you begin, ensure the following:

-   **Cortex Cloud user permissions**: Ensure you have View/Edit permissions for Data Sources and Integrations (RBAC: AppSec Admin or Instance Administrator)
    
-   **AWS user permissions**: To onboard CodeCommit, the user logged into the AWS Console must have permissions to deploy the CloudFormation stack and authorize the creation of the following resources:
    
    -   `cloudformation:CreateStack`: Required to deploy the integration template
        
    -   `iam:CreateRole`: Required to allow the template to provision the Service Role for scanning operations
        
    -   `sns:CreateTopic`: Required to allow the template to provision notification triggers. **Note**: You must ensure your account is prepared to create an SNS topic for each required region if your Cloud account and stack are in different regions, as AWS requires SNS events to reside in the same region as the stack
        
        **Note**
        
        During deployment, you must acknowledge the CAPABILITY_IAM setting in the AWS Console to allow the creation of these resources.
        
    
-   **Required scanning and policy permissions**
    
    The system requires specific permissions to access repositories and evaluate security conditions:
    
    -   **Scanning permissions**: Rights for the Service Role to access and scan CodeCommit repositories.
        
    -   **Policy permissions**: Rights to detect findings and handle issues generated from policies based on repository conditions and scan results.
        
    
    Once the stack is created, the new IAM Service Role will automatically possess permissions to perform scans and handle policy-generated issues. For the complete list of permissions, refer to Technical appendix: IAM Service Role permissions below
    
    **Note**
    
    The permissions are configured entirely by the CloudFormation template; no manual action is required.
    

### Onboarding steps

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
        
        **Tip**
        
        The instance ID is identical to the stack ID on the AWS platform.
        
    3.  Under Selection Options, choose the repositories to be connected to the instance:
        
        -   Permit all existing repositories
            
        -   Permit all existing and future repositories
            
        -   Select Choose from repository list and select repositories from the list
            
        
    4.  Click Save.
        
4.  Verify integration through the tenant or in AWS using either of these options:
    
    -   In Cortex Cloud: On the Data Sources & Integrations page, filter for AWS CodeCommit, select the AWS CodeCommit data source that is displayed, and verify that the status of your instance (connector) is Connected
        
    -   **In AWS**: Open CloudFormation → Stacks. Verify that the integration is displayed with a Create Complete status
        
    

### Validate repository scan and view scan results

After connection, the platform automatically triggers a security scan of the repository. Scanning is supported for Infrastructure as Code (IAC) analysis, Software Composition Analysis (SCA), and Secrets detection.

1.  Navigate to Modules → Application Security → Periodic scans.
    
2.  Filter by Provider → AWS CodeCommit.
    
3.  Verify that the scan health of your repository is Completed.
    
4.  Select the repository.
    
5.  Review a summary of findings detected by the scans and issues generated by policies targeting the repository.
    
6.  **Next step**: Navigate to a dedicated issue table (such as Secrets) to understand and remediate the issue.
    

### Troubleshooting

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
        
    

### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note**
    
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

## Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

## Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

## Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

## Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

## Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |

### Data protection

Cortex Cloud ensures the security and integrity of your code:

-   **Isolated scanning**: Repository contents are scanned within a strictly isolated sandbox environment to prevent cross-contamination
    
-   **Tenant isolation**: All security findings are stored with tenant isolation to ensure your data remains private and inaccessible to others
    
-   **No Persistence**: No repository credentials or sensitive secrets are stored within the platform infrastructure
    
-   **Temporary access**: Access is managed through secure cross-account IAM role assumption which provides temporary permissions without the need for static keys
    

### Technical appendix: IAM Service Role permissions

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