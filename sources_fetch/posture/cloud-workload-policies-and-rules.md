# Cloud Workload Policies and Rules
Cloud Workload Policies and Rules help organizations maintain security compliance, prevent misconfigurations, and reduce risks across cloud environments.

-   **Cloud Workload Policies** define organizational security objectives by combining detection logic with preventive actions across selected asset scopes. Policies can generate issues and proactively block misconfigurations before they reach runtime, ensuring workloads remain compliant with security requirements throughout the Software Development Life Cycle (SDLC). They leverage identified security risks and enforce controls at the right stages of development and operations, such as during CI pipelines or in runtime environments.
    
-   **Cloud Workload Rules** define the detection logic for misconfigurations and their applicable asset types, specifying the criteria and conditions used to identify security risks. These rules can be selected and enforced through Misconfiguration Policies within the designated policy asset scope.
    

Together, Policies define which risks must be addressed and what actions to take, while Rules specify how those risks are detected through precise logic and conditions.

**Prerequisite:**

Users need View/Edit RBAC permissions (under Policies → Compute Policies) or the Instance Administrator role to view, edit, and modify Cloud Workload Policies policies.

**Important:**

Users with SBAC granular scoping (in addition to the RBAC permissions required for Cloud Workload Policies) can only view Cloud Workload Policies, when their access is scoped to any of the available options: All assets, No assets, or Select asset groups. For more information on granular scoping, see Manage user scope. When no SBAC restriction is applied, the user’s access is determined solely by their RBAC permissions.Manage user scope

## How policies and rules work together
_Cloud Workload Policies_ serve as enforcement mechanisms that govern the responses to the identified findings, whereas _Cloud Workload Rules_ establish the criteria for evaluation but do not initiate any actions unless incorporated within a policy. 

In the absence of an associated policy, rules exist solely as evaluative criteria and do not generate alerts or trigger any response actions. Policies determine how findings from rules are escalated to issues or preventive measures.

## Cloud Workload Policies
Cloud Workload Policies help you prevent and manage security violations in your cloud runtime instances. They enable you to apply detection logic to specific asset groups at the desired SDLC stage, and define what action needs to be taken if the conditions are met.

Depending on the nature of the security violation, a Cloud Workload Policy allows you to

-   _Prevent the violation_. Enable proactive prevention of the violation. For example: Block an S3 bucket deployment that is open to the public.
    
-   _Create an issue_. Create an issue when violation is seen. For example: Create an issue when an AWS credential file is found on a Linux server.
    

**Note:**

Issues are automatically resolved when the finding is no longer applicable to the asset or when the affected asset is removed from the inventory.

For more details on Prevent and create issues, see Cloud Workload Preventive Action.

A Cortex Cloud Workload Policy has the following elements:

-   SDLC Evaluation Stage: The SDLC stage at which the policy is applied and evaluated. Depending on the policy type, one or more of the following stages may be available:
    
    -   CI: The stage during which a pipeline builds the artifact. After building the artifact, the pipeline pushes it to a registry.
        
    -   Deploy: The stage when the artifact is pushed to a cloud instance for running.
        
    -   Runtime: The stage when the artifact is running on a cloud instance.
        
    
-   Rule (Conditions): The logical conditions that will trigger the evaluation of this policy.
    
-   Scope: A filter specifying which assets the rule applies to.
    
-   Action: The response triggered when the rule evaluates successfully (only when part of a policy). Based on the rules included in the policy, it can create an issue or prevent the security violation.

### Types of Cloud Workload Policies
-   **Misconfiguration policies:** Enables you to assess various workloads for misconfigurations against relevant security standards and your organization’s security guidelines. You can include both predefined and custom rules in these policies to either prevent violations or create issues for violations.
    
-   **Malware policies:** Enable you to detect and manage malicious files within cloud workloads. These policies analyze files based on predefined parameters such as file name, path, size, and detection method.
    
-   **Secret policies:** Enable you to identify and protect sensitive information—such as API keys and credentials—within workloads.
    
-   **Trusted Image policies:** Enable you to ensure the authenticity, integrity, and security of container images and VMs deployed into your Kubernetes environments. This includes actions such as limiting allowed image sources, mitigating possible image tampering, and more.

#### Trusted image cloud workload policies

Trusted image policies ensure the integrity and security of container images and VMs deployed into Kubernetes environments. Using these policies, you can be assured that your images are from a trusted source, are built on approved and validated base images, and are free from unauthorized modifications.

Trusted image policies ensure the integrity and security of container images and VMs deployed into Kubernetes environments. This topic details the policy enforcement logic that Cortex uses to determine if an image is trusted, what action to take, and which issues to generate.

Images are evaluated to see if they:

-   Match the trusted image policy criteria.
    
-   Should be allowed or prevented, based on policy criteria and scope.
    
-   Should trigger the creation of security or posture issues when untrusted.
    

**Note:**

Registry scanning is for finding problems that are objectively issues regardless of context, organization, or scope. Trust, however, is subjective. Depending on the scope and other factors, an issue may or may not be problematic, and can change over time depending on the context.

Trusted image policy actions

When defining a trusted image policy, you determine what actions should be taken if an image is not trusted.

-   Create an Issue. The image is allowed to run, but a violation is recorded as a posture and/or security issue. For the purposes of this documentation, we refer to this as an **issue-only** action.
    
    The primary purpose of trusted image policies with the issue-only action is auditing and compliance. These violations are identified by Cortex periodic scans.
    
    The issue-only action assesses trust across a range of assets, including Kubernetes workloads (which are cloud-agnostic, supporting AWS, Azure, GCP, OCI), virtual machines (VMs).
    
-   Prevent and Create an Issue. Images created after this policy is enabled will be blocked from running if they don't meet the trust criteria, and a violation will also be recorded as a security issue. For images that were already running—and which don't meet the trust criteria—a posture issue is created.For the purposes of this documentation, we will refer to this as the **prevent** action.
    
    These issues block deployment in real-time.
    
    The prevent action is cloud-agnostic (supports AWS, Azure, GCP, OCI) and enforced at the Kubernetes cluster level via the admission controller.
    

Before you begin working with trusted image policies

Consider the following prerequisite:

-   All trusted image policies are designed for runtime security enforcement. However, to ensure that policies with the prevent action can successfully block untrusted images, the policy's scope must be on a Kubernetes cluster where the admission controller is enabled.
    

Trusted image policy enforcement logic

The evaluation of trusted image policies is based on logic that determines the following critical outcomes: Which container images are trusted in a given scope and which violations result in the creation of security and posture issues.

-   **Utilizing an "OR-based" approach**
    
    Cortex utilizes an "OR-based" approach, with no explicit priority or rule order when resolving policy conflicts.
    
    This enables Cortex to prioritize the most permissive result among conflicting policies with prevent actions, while enforcing the most restrictive result between policies with issue-only actions.
    
    -   **Prevent actions**: Minimizing prevention, and allowing as many images as possible to be trusted, is desirable in order to avoid blocking workloads from running.
        
    -   **Issue creation**: Minimizing the number of issues generated is desirable to avoid issue redundancy, unnecessary analysis, and issue handling.
        
    
    Understanding the approach and the logic behind it helps you create policies efficiently.
    
    Recommendations include:
    
    -   When possible, the optimal way to define all trust criteria is to define the criteria in one policy.
        
    -   If you are defining cluster-level trust criteria along with other options at the namespace/registry level, understand that because there are no priority/order options, you must plan your policies accordingly.
        
    
-   **Trusting and allowing images by scope**
    
    Trusted image policies provide granular control by ensuring that policies only impact the specific environment (scope) for which they are defined. An image can be trusted in one scope and untrusted in another. For example, a third party image may be trusted in your Development environment but immediately untrusted in your Production environment.
    
    If you have not defined any trusted image policies for a specific scope, the default behavior is that all images within that scope are implicitly trusted However, once a policy is defined for a scope, any image not explicitly trusted by that policy is automatically untrusted.
    
    Policy enforcement is directly tied to the defined scope. When you define the Asset Group scope for a policy (for example, a specific cluster's Test namespace), the policy applies only to the resources within that exact definition. The more narrowly defined your scope, the more targeted the policy's enforcement will be, ensuring the enforcement does not affect unrelated resources.
    
    If multiple policies with prevent actions cover the same scope, the logic is additive (allow-wins). As long as at least one of those policies results in the image being trusted, the image will be allowed to run.
    
    **Note:**
    
    Trusted image policies do not override other policies and their rules, such as malware policies, misconfiguration policies, and secrets policies.
    
-   **Generating issues**
    
    The following points clarify the logic for generating runtime security issues and posture issues based on your defined policies:
    
    -   **Runtime security issues**:
        
        A runtime security issue is generated only if an image is untrusted by all policies. If at least one policy trusts the image, no runtime security issue is created. Additionally, each policy with a prevent action that identifies an issue will generate only one corresponding runtime security issue.
        
    -   **Posture issues**:
        
        For policies with the prevent action:
        
        -   if an image is prevented from running, no posture issues are created by any policy within that scope.
            
        -   Posture issues are created if images that are running violate any policy within the scope.
            
        
        For policies with the issue-only action, posture issues are created at the granular level of one issue per untrusted image per policy that fails the trust criteria. The posture Issues are created on the relevant asset type and are titled accordingly:
        
        -   **Kubernetes workload asset type**: The issue title will be Untrusted image running in Kubernetes workload X.
            
        -   **Virtual machine asset type**: The issue title will be Untrusted image running in Virtual Machine Y.
            
        
        For each issue regardless of asset type, the description will be either:
        
        -   **For untrusted images**:
            
            [AssetType] [AssetName] is running the image {ImageName}. that does not comply with the trust criteria defined in the Trusted Images policy [PolicyName].
            
        -   **For cases when there's missing information:**
            
            [AssetType] [AssetName] is running the image {ImageName}. Information is missing to determine compliance with the trust criteria defined in the Trusted Images policy [PolicyName].
            
        
        The issues will also include the image name, a link to the image asset page, the relevant Kubernetes hierarchy (cluster and namespace) for Kubernetes workloads only, and more.
        
    
-   **Policy evaluation: Handling unknown, missing or partial image data**
    
    Situations may arise where insufficient information is available at the time of deployment to conclusively arrive at a trust verdict. This means Cortex cannot confirm an image's trusted or untrusted status. Examples of such situations where there is a lack of complete image metadata include:
    
    -   **Initial discovery or missing scan data**: If an image is being evaluated for the first time, some vital information may be temporarily unavailable that would generally have been derived from a prior comprehensive scan, such as the image's Base Layer data or its CLI scan status.
        
    -   **Partial deployment metadata**: The trust criteria specified in your trusted image policy may include image metadata that is not present in the deployment file. For example, a policy might mandate a specific tag, but the Kubernetes deployment resource uses only the image digest (SHA) and omits the tag.
        
    
    Cortex handles these situations differently based on the policy's action:
    
    -   **For policies with issue-only actions**: Cortex creates a posture issue and a runtime security issue, flagging the image as potentially untrusted due to insufficient data. The image is allowed to deploy, but the issue prompts the user to investigate the data gap.
        
    -   **For policies with prevent actions**: Cortex relies on the user-defined Action when trust verdict is unavailable value in the policy's action section.
        
    
    **Caution:**
    
    The default behavior for the prevent action when trust criteria are unavailable is Create an Issue. Be aware that changing this default will mean an incomplete deployment file can block a workload.
    
-   **Policy decision logic for workloads**
    
    Situations might arise where within the same workload, multiple images or multiple policies yield conflicting trust results. When these conflicts occur—such as one policy trusting an image while another prevents it, or a single deployment containing both trusted and untrusted images—Cortex relies on the following defined logic to determine the final deployment outcome and what issues, if any, are generated.
    
    -   **For policies with issue-only actions**: Any time an image fails the trust criteria for an Issue-only action policy, a Posture Issue is created. This action is non-blocking; the image is allowed to deploy regardless of the issue.
        
    -   **For policies with prevent actions**:
        
        -   **Conflicting allow vs. prevent policies**: If multiple prevent action policies apply to a single image within a workload, and one policy allows the image while another does not trust it, the image is ultimately trusted and allowed to run. This follows the "Allow-Wins" principle.
            
        -   **Conflicting Images within the same workload**: If a single workload (meaning, one deployment) contains both trusted and untrusted images, the entire deployment is blocked. The security risk posed by the single untrusted image prevents the entire workload from running.
            
        
    

Policy enforcement examples

This section provides examples that help illustrate the policy enforcement logic described above.

Example: Handling contradictory policies

This example illustrates how Cortex determines how to allow or prevent images, and create issues, when multiple policies conflict.

1.  User deploys the **docker.io/library/alpine:1.2.3 image**.
    
2.  Trusted image policies are validated at set periodic scan intervals or when a resource is deployed.
    
3.  Two trusted image policies with prevent actions evaluate the image to determine its trust status. Cortex uses an "OR-based" evaluation for conflicting prevent action policies to determine if the image is trusted.
    
4.  Policy 1 allows the image because the image is in the **docker.io** registry. So even though Policy 2 does not trust the image, the trust verdict is trusted and image deployment proceeds.
    
5.  No runtime security issues are created because the image is trusted by one policy—namely, Policy 1.
    
6.  No posture issues are created because:
    
    -   There are no policies with issue-only actions—only policies with prevent actions.
        
    -   The user defined two trusted registries, and a trusted image comes from one of them.
        
        The user does not anticipate any further issues.
        
    

Example: Preventing images based on policies with prevent actions

This example illustrates how Cortex determines how images are prevented from deployment in cases where a data verdict is unavailable.

1.  User deploys the **production:alpine@sha256:554443** image with the base image of **base2**.
    
2.  Trusted image policies are validated at set periodic scan intervals or when a resource is deployed.
    
3.  Three policies with prevent actions evaluate the image to determine its trust status. Cortex uses an "OR-based" evaluation for conflicting policies to determine if the image is trusted.
    
    -   Policy 1's criteria **production/alpine:1.2.3** only partially match the deployed image's full image identifier,  **production:alpine@sha256:554443**. For example, the deployed image is missing the tag.
        
        If the image developer built the image, pushed it to the registry, and tagged it as **:1.2.3**, and that specific content generated the digest **sha256:554443...**, then they are a match at that moment in time. But this could change, so there is no definitive trust verdict.
        
        Because policy 1 has a prevent action with the additional **Action when trust verdict is unavailable** option set to **Prevent and create an issue**, the image is untrusted.
        
    -   Policy 2, with its issue-only action, only trusts **base1** images, so this policy considers the image untrusted.
        
    -   Policy 3, with its issue-only action, requires the image to have been scanned by a CLI scanner, so the image is untrusted.
        
    
4.  Because all three policies do not trust the image, the image is prevented and deployment does not proceed.
    
5.  A runtime security issue is created because of at least one policy does not trust the image. Only one runtime security issue is created, even though three policies don't trust the image.
    
    No posture issues are created because the image was prevented. Posture images must be actionable, and no actions can be taken on a prevented image.
    

Example: Allowing images based on policies with prevent actions

This example illustrates how Cortex determines how images are allowed to deploy in cases where a data verdict is unavailable.

1.  User deploys the **production:alpine@sha256:554443** image with the base image of **base2**.
    
2.  Trusted image policies are validated at set periodic scan intervals or when a resource is deployed.
    
3.  Three policies evaluate the image to determine its trust status. Cortex uses an "OR-based" evaluation for conflicting policies to determine if the image is trusted.
    
    -   Policy 1's criteria **production/alpine:1.2.3** only partially match the deployed image's full image identifier, **production:alpine@sha256:554443**. For example, the image is missing the tag.
        
        If the image developer built the image, pushed it to the registry, and tagged it as **:1.2.3**, and that specific content generated the digest **sha256:554443...**, then they are a match at that moment in time. But this could change, so there is no definitive trust verdict.
        
        Because policy 1 has a prevent action with the additional Action when trust verdict is unavailable option set to Create an issue, the image is trusted.
        
    -   Policy 2, with its issue-only action, only trusts **base1** images, so the policy considers the image is untrusted.
        
    -   Policy 3, with its issue-only action, requires the image to have been scanned by a CLI scanner, so the image is considered untrusted.
        
    
4.  The image is allowed and deployment proceeds, because one of the three policies trusts the image and Cortex uses an "OR-based" approach.
    
5.  No runtime security issue is created because of the trust verdict is to trust and allow.
    
    No posture issues are created because the image was prevented. Posture images must be actionable, and no actions can be taken on a prevented image.

### Cloud Workload Policies page
The **Cloud Workload Policies** page allows users to manage policies that define security and compliance actions for cloud workloads. Users can create, edit, filter, and manage policies through a structured table and widget panel.

**Note:**

Keep the following caveats in my mind when working with Policies:

-   Instance Administrators are able to view all facets of policies without restrictions, even if Scope Based Access Control (SBAC) roles are in effect. Learn more about SBAC.Manage user scope
    
-   If you’ve been assigned a custom role with View/Edit permissions limited by SBAC, you may not be able to view certain policies.
    
-   You can further narrow your search on the Inventory page by using SBAC to limit the scope of the finding, issue, and case counts.
    

The Cloud Workload Policies page displays all the configured policies with the following fields.

**Policy table columns**

| **Field** | **Description** |
| --- | --- |
| **Policy Type** | Defines the policy category: **Misconfigurations, Secrets, Malware, Trusted Images**. |
| **Policy Name** | The user-defined name of the policy. |
| **Action** | Defines the action taken when conditions match: **Create an Issue** (logs an issue) or **Prevent and Create an Issue** (prevents the action and logs an issue). |
| **Severity** | The severity level of the issue created: **Critical, High, Medium, Low, or Informational**. |
| **Asset Groups** | Predefined groups of assets to which the policy applies. |
| **Open Issues** | The number of unresolved issues associated with the policy. |
| **Conditions** | Define the detection rule by specifying the criteria that match relevant malware, secret, or trusted image findings. |
| **Exceptions** | Defines the exclusion criteria to omit malware, secret, or trusted image findings that meet specific conditions you want to exclude from the policy. |
| **Evaluation Stage** | Indicates at which stage in the **SDLC** the policy is evaluated. |
| **Description** | Additional details about the policy. |
| **Created By** | The user who created the policy. |
| **Last Modified** | The timestamp of the last modification. |

#### Widgets panel
The **Cloud Workload Policies** page includes a widget panel that provides a visual summary of policies:

-   **Policies by Type:** Displays policies categorized as misconfiguration, secret, trusted images, or malware.
    
-   **Policies by Evaluation Stage:** Shows the distribution of policies based on SDLC evaluation stages: Runtime, Deploy, or CI.

##### Show or hide the widget panel
The widget panel provides a visual summary of policies based on policy type or evaluation stage.

To hide the widget panel, do the following:

1.  Navigate to **Posture Management** → **Rules & Policies** → **Policies** → **Cloud Workload**.
    
2.  On the Cloud Workload Policies page, click the Widget Panel icon at the top of the page.
    
3.  The panel toggles between visible and hidden states.

#### Change the layout of the policies table
1.  Navigate to **Posture Management** → **Rules & Policies** → **Policies** → **Cloud Workload**.
    
2.  In the Cloud Workload Policies page, click the More Options icon (**⋮**).
    
3.  In the Layout tab, do the following:
    
    -   To remove columns, go to the **In View** section and search for a specific column. Click **\-** next to the column to remove it from the table.
        
    -   To reorder columns, go to the **In View** section. Click and drag columns up or down to rearrange the columns.
        
    -   To add new columns, go to the **Add Columns** section. Click **+** next to the columns to include them in the table.
        
    
4.  The table layout updates automatically based on your selections.

#### Policy Details Panel
The policy details panel is displayed when you click a policy in the policy table. To view details of a cloud workload policy:

1.  Navigate to **Posture Management** → **Rules & Policies** → **Policies** → **Cloud Workload**.
    
2.  In the **Cloud Workload Policies** page, select the policy you want to check.
    

The policy panel displays the following details related to the selected policy:

-   Policy details.
    
-   Related rule settings.
    
-   The number of issues opened as part of the policy. You can click on the link to navigate to the Issues and Cases section to check the issue details.
    

From the policy detail panel, you can:

-   Enable or disable the policy
    
-   Edit the policy
    
-   Save as new
    
-   Delete the policy

### Enable or disable a Cloud Workload Policy
1.  Navigate to **Posture Management** → **Rules & Policies** → **Policies** → **Cloud Workload**.
    
2.  In the Cloud Workload Policies page, click on the policy you want to enable or disable.
    
3.  In the Details page, click the toggle button at the top to enable or disable the policy.

### Create a Cloud Workload Policy
You can create policies to address specific types of security risks or compliance requirements.

To create a cloud workload policy:

Navigate to **Posture Management** → **Rules & Policies** → **Policies** → **Cloud Workload**. 

In the Cloud Workload Policy page, click Create Policy and select the type of policy you want to create:

Misconfiguration Policy

1.  Enter a unique name and description. Note that these are mandatory fields.
    
2.  The Evaluation Stage will be selected as Runtime.
    
    **Note:**
    
    The Evaluation stage for Misconfiguration policies is supported only in the Runtime SDLC stage and is enforceable through the Kubernetes Admission Controller for clusters on-boarded using the Posture Management (KSPM) Connector.
    
3.  Click Next
    
4.  The **Summary** section on the right displays a real-time, interactive view of all policy configurations as users progress through the wizard. It **automatically updates** to reflect the current selections and settings, enabling seamless navigation between fields from any step in the wizard. It includes the following sections:
    
    -   **General** – Policy name and description.
        
    -   **Rules** – No. of selected rules and the asset types relevant to the selected rules.
        
    -   **Scope** - The defined scopes included in the policy and SDLC stage.
        
    
5.  In the Rules section:
    
    -   Click on Add Rules to select the rules that identify the violations that you want to track.
        
        A new window opens, displaying a list of all the existing predefined OOTB rules. See Rules filters for details on applying filters to refine the list of rules.
        
        **Note:**
        
        Use Create a new Custom Detection Rule to define and add new custom rules as required.
        
    -   After completing your selection, click Select to confirm. The chosen rules are displayed in the Rules section, where you can toggle between the Cards and Grid view to display the rules in your preferred layout.
        
    -   In the Rules section, you can select one or more rules to modify the Severity, Policy Action and Remediation values, either individually or in bulk.
        
        **Note:**
        
        Each rule may support different actions. While some include both Create an Issue and Prevent and Create an Issue, others provide only the Create an Issue option.
        
    
6.  In the Scope section, for the Scope Selection Method , select Asset Groups or Default Asset Scopes, depending on your preference.
    
    1\. If you select Asset Groups, you can choose between the following options:
    
    Select existing Asset groups
    
    The displayed list shows all Asset Groups available in the Runtime SDLC stageYou can select the asset group to which you want this policy to apply.
    
    Click Preview Selection to view all relevant Compute Assets associated with the selected asset groups.
    
    **Note:**
    
    All non-relevant (non-compute) assets are automatically excluded from the included asset list.
    
    Add Group
    
    Click on Add Group. A new window opens to create a new **Compute Asset group**.
    
    -   Enter a unique Group name and Description.
        
    -   The displayed list of **Compute Assets** in the table is **pre-filtered** to show only the **relevant assets** based on the **rules selected in the previous section**. The **asset list is dynamically updated** and restricted to the applicable asset types of the selected rules, ensuring that users can select only valid and compatible assets for the new Compute Asset Group.
        
        You can filter these assets using the Show filter Panel button based on the fields Asset ID, Name, Provider and more.
        
    -   When only an **asset filter** is defined, the system creates a **dynamic asset group**, that automatically includes assets that meet the specified filter criteria.
        
        **Note:**
        
        Currently, dynamic asset groups for Kubernetes Prevent Policies support only the following attributes:
        
        -   **Kubernetes Resource Cluster**: The cloud identifier for the cluster.
            
        -   **Kubernetes Resource Namespace**: The namespace where the resource is located.
            
        -   **Kubernetes Resource Labels**: The labels assigned to the resource.
            
        -   **Kubernetes Resource Category**: The category of the resource (Identity, Workload, Configuration, or Network).
            
        -   **Kubernetes Resource Creation Time**: The time the resource was created.
            
        -   **Kubernetes Resource Name**: The name of the resource.
            
        
        When **specific assets are manually selected** from the asset list, a **static asset group is created**, containing only the explicitly chosen assets.
        
    
    2\. On selecting Default Asset Scopes, you can further select the Assets Scope from the predefined **Asset Scopes** that are filtered based on the **selected rules in the previous section** and their applicable **Asset Types**. The Scope options are dynamically updated and limited to the applicable asset types of the selected rules, ensuring that users can select only valid and compatible scopes.
    
7.  Click Done to complete the process and create the new Misconfiguration Workload Policy.
    

Malware Policy

1.  Enter a unique name and description. Note that these are mandatory fields.
    
2.  Select an SDLC Evaluation Stage. The following options are available.
    
    -   CI
        
    -   Runtime
        
    -   Deploy
        
    
3.  Click Next.
    
4.  The **Summary** section on the right provides a real-time, readable view of all policy configurations as users progress through the wizard. It automatically updates to reflect current selections and settings. It includes the following sections:
    
    -   **General** – Policy name and description.
        
    -   **Conditions** – Selected rule filter and exclusion criteria.
        
    -   **Scope** - The defined scopes included in the policy and SDLC stage.
        
    -   Actions - Selected action type.
        
    
5.  Configure the settings specific to the evaluation stage you select.
    
    CI
    
    -   In the Conditions section, define the detection rule by specifying the criteria to identify relevant malware findings. You may also include exclusion criteria to filter out any malware findings that meet specific conditions you wish to exclude from this policy.
        
    -   Click Next.
        
    -   In the Scope section, select the checkbox to confirm that this selection applies the policy and its detection rules to All Cloud Workload Build Container Image asset types available at the CI SDLC stage.
        
    -   Click Next.
        
    -   In the Action section:
        
        -   For Select an action, choose the option to Create an issue to log an issue if the policy is violated or Prevent and create an issue to prevent and create an issue.
            
            **Note:**
            
            See Cloud Workload Preventive Action, to learn more about the Prevent action behavior and prerequisites.
            
            If the Prevent and create an issue action is selected, the preventive actions in the CI pipeline will trigger a Fail Pipeline by returning an exit code of 2 in the CI tool.
            
        -   Under Issue Severity, choose **Critical, High, Medium or Low** to define the issue severity.
            
        -   In the Remediation Guidance field, enter the optional remediation instructions.
            
        
    
    -   Click Done to complete the process and create the new Cloud Malware Workload Policy.
        
    
    Runtime
    
    -   In the Conditions section, define the detection rule by specifying the criteria to identify relevant malware findings. You may also include exclusion criteria to filter out any malware findings that meet specific conditions you wish to exclude from this policy.
        
    -   Click Next.
        
    -   In the Scope section, for the Scope Selection Method, select Asset Groups or Default Asset Scopes, depending on your requirement.
        
        -   If you select Asset Groups, you can choose between the following options:
            
            Select existing Asset groups
            
            The displayed list contains all the asset groups for the Cloud Workload Container Images, Container Instances, Hosts (VM Instances), Serverless Functions or Kubernetes Workloads asset types that are available at the Runtime SDLC stage.
            
            Add Group
            
            -   Click on Add Group. A new window opens to create a new **Compute Asset group**.
                
            -   The displayed list of **Compute Assets** in the table is **pre-filtered** to show only only the **Compute asset types** as  Cloud Workload Container Images, Container Instances, Hosts (VM Instances), Serverless Functions or Kubernetes Workloads asset types, ensuring that users can select only valid and compatible assets for the new Compute Asset Group.
                
                You can filter these assets using the Show filter Panel button based on the fields Asset ID, Name, Provider and more.
                
            -   When only an **asset filter** is defined, the system creates a **dynamic asset group**, that automatically includes assets that meet the specified filter criteria.
                
                When **specific assets are manually selected** from the asset list, a **static asset group is created**, containing only the explicitly chosen assets.
                
            
            You can then select the asset group to which you want this policy to apply.
            
        -   On selecting Default Asset Scopes, you can further select the Asset Scopes as:
            
            -   All Cloud Workload Assets)
                
                **Note:**
                
                Choosing this option results in the automatic selection of all other asset scopes in the list.
                
            -   All Cloud Workload Hosts(VM Instances)
                
            -   All Cloud Workload Container Images
                
            -   All Cloud Workload Container Instances
                
            -   All Cloud Workload Kubernetes Workloads
                
            -   All Cloud Workload Serverless Functions
                
            
        
    -   Click Next.
        
    -   In the Action section:
        
        -   For Select an Action, choose the option to Create an issue to log an issue if the policy is violated or Prevent and create an issue to prevent and create an issue.
            
            **Note:**
            
            See Cloud Workload Preventive Action, to learn more about the Prevent action behavior and prerequisites.
            
        -   Under Issue Severity, choose **Critical, High, Medium or Low** to define the issue severity.
            
        -   In the Remediation Guidance field, enter the optional remediation instructions.
            
        
    
    -   Click Done to complete the process and create the new Cloud Malware Workload Policy.
        
    
    Deploy
    
    -   In the Conditions section, define the detection rule by specifying the criteria to identify relevant malware findings. You may also include exclusion criteria to filter out any malware findings that meet specific conditions you wish to exclude from this policy.
        
    -   Click Next.
        
    -   In the Scope section, for the Scope Selection Method, select Registry Images in Cloud Workload Asset Groups or the All Cloud Workload Registry Images, depending on your requirement.
        
        -   If you select Registry Images in Cloud Workload Asset Groups ,this policy applies only to Cloud Workload Container Registry Images asset types in those groups that are available at the Deploy SDLC stage. A list of all these available asset groups is displayed. You can then select the asset group to which you want this policy to apply.
            
        -   On selecting All Cloud Workload Registry Images, the policy and its detection rules will apply to All Cloud Workload Container Registry Images asset types available at Deploy SDLC Stage.
            
        
    -   Click Next.
        
    -   In the Action section:
        
        -   For Select an Action, the default option is Create an issue to log an issue if the policy is violated.
            
        -   Under Issue Severity, choose **Critical, High, Medium or Low** to define the issue severity.
            
        -   In the Remediation Guidance field, enter the optional remediation instructions.
            
        
    -   Click Done to complete the process and create the new Cloud Malware Workload Policy.
        
    

Secret Policy

-   Enter a unique name and description. Note that these are mandatory fields.
    
-   Select an SDLC Evaluation Stage. The following options are available.
    
    -   CI
        
    -   Runtime
        
    -   Deploy
        
    

-   Click Next.
    
-   The Summary section on the right provides a real-time, readable view of all policy configurations as users progress through the wizard. It automatically updates to reflect current selections and settings. It includes the following sections:
    
    -   **General** – Policy name and description.
        
    -   **Conditions** – Selected rule filter and exclusion criteria.
        
    -   **Scope** - The defined scopes included in the policy and SDLC stage.
        
    -   **Actions** - Selected action type.
        
    
-   Configure the settings specific to the evaluation stage you select.
    
    CI
    
    -   In the Conditions section, define the detection rule by specifying the criteria to identify relevant malware findings. You may also include exclusion criteria to filter out any malware findings that meet specific conditions you wish to exclude from this policy.
        
    -   Click Next.
        
    -   In the Scope section, select the checkbox to confirm that this selection applies the policy and its detection rules to All Cloud Workload Build Container Images asset types available at the CI SDLC stage.
        
    -   Click Next.
        
    -   In the Action section:
        
        -   For Select an action, choose the option to Create an issue to log an issue if the policy is violated or Prevent and create an issue to prevent and create an issue.
            
            **Note:**
            
            See Cloud Workload Preventive Action, to learn more about the Prevent action behavior and prerequisites.
            
        -   Under Issue Severity, choose **Critical, High, Medium or Low** to define the issue severity.
            
        -   In the Remediation Guidance field, enter the optional remediation instructions.
            
        
    -   Click Done to complete the process and create the new Cloud Malware Workload Policy.
        
    
    Runtime
    
    -   In the Conditions section, define the detection rule by specifying the criteria to identify relevant malware findings. You may also include exclusion criteria to filter out any malware findings that meet specific conditions you wish to exclude from this policy.
        
    -   Click Next.
        
    -   In the Scope section, for the Scope Selection Method, select Asset Groups or Default Asset Scopes, depending on your requirement.
        
        -   If you select Asset Groups, you can choose between the following options:
            
            Select existing Asset groups
            
            The displayed list contains all the asset groups for the **Cloud Workload Container Images, Container Instances, Hosts (VM Instances), Serverless Functions or Kubernetes Workloads** asset types that are available at the Runtime SDLC stage.
            
            Add Group
            
            -   Click on Add Group. A new window opens to create a new Compute Asset group.
                
            -   The displayed list contains all the asset groups for only the **Compute asset types** as **Cloud Workload Container Images, Container Instances, Hosts (VM Instances), Serverless Functions or Kubernetes Workloads**, ensuring that users can select only valid and compatible assets for the new Compute Asset Group.
                
                You can filter these assets using the Show filter Panel button based on the fields Asset ID, Name, Provider and more.
                
            -   When only an asset filter is defined, the system creates a **dynamic asset group** that automatically includes assets that meet the specified filter criteria.
                
                When **specific assets are manually selected** from the asset list, **a static asset group is created,** containing only the explicitly chosen assets.
                
            
            You can then select the asset group to which you want this policy to apply.
            
        -   On selecting Default Asset Scope, you can further select the Asset Scopes as
            
            -   All Cloud Workload Assets
                
                **Note:**
                
                Choosing this option results in the automatic selection of all other asset scopes in the list.
                
            -   All Cloud Workload Hosts(VM Instances)
                
            -   All Cloud Workload Container Images
                
            -   All Cloud Workload Container Instances
                
            -   All Cloud Workload Kubernetes Workloads
                
            -   All Cloud Workload Serverless Functions
                
            
        -   Click Next.
            
        
    -   In the Action section:
        
        -   For Select an action, choose the option to Create an issue to log an issue if the policy is violated or Prevent and create an issue to prevent and create an issue.
            
            **Note:**
            
            See Cloud Workload Preventive Action, to learn more about the Prevent action behavior and prerequisites.
            
        -   Under Issue Severity, choose **Critical, High, Medium or Low** to define the issue severity.
            
        -   In the Remediation Guidance field, enter the optional remediation instructions.
            
        
    -   Click Done to complete the process and create the new Cloud Malware Workload Policy.
        
    
    Deploy
    
    -   In the Conditions section, define the detection rule by specifying the criteria to identify relevant malware findings. You may also include exclusion criteria to filter out any malware findings that meet specific conditions you wish to exclude from this policy.
        
    -   Click Next.
        
    -   In the Scope section, for the Scope Selection Method select Registry Images in Cloud Workload Asset Groups or the All Cloud Workload Registry Images, depending on your requirement.
        
        -   If you select Registry Images in Cloud Workload Asset Groups ,this policy applies only to Cloud Workload Container Registry Images asset types in those groups that are available at the Deploy SDLC stage. A list of all these available asset groups is displayed. You can then select the asset group to which you want this policy to apply.
            
        -   On selecting All Cloud Workload Registry Images, the policy and its detection rules will apply to All Cloud Workload Container Registry Images asset types available at Deploy SDLC Stage.
            
        
    -   Click Next.
        
    -   In the Action section:
        
        -   For Select an Action, the default option is Create an issue to log an issue if the policy is violated.
            
        -   Under Issue Severity, choose **Critical, High, Medium or Low** to define the issue severity.
            
        -   In the Remediation Guidance field, enter the optional remediation instructions.
            
        
    -   Click Done to complete the process and create the new Cloud Malware Workload Policy.
        
    

Trusted Images

1.  Enter a unique name and description. Note that these are mandatory fields. The SDLC Evaluation Stage is preset to Runtime.
    
2.  Click Next.
    
3.  Configure the policy's condition settings.
    
    1.  In the Conditions section, specify the criteria to identify relevant images.
        
        You can specify criteria to define both broad policies and strict policies, for example: `Trust images (from registryX or registryY) OR (digestA or digestB)`. An example of criteria for a broad policy could be `all images from gcr.io/myorg/` while an example of criteria for a strict policy could be: `gcr.io/myorg/app@sha256:abc123`.
        
        You can also include exclusion criteria to filter out any images that meet specific conditions for exclusion from this policy.
        
        Because trust is subjective, context-dependent, and scope-based, we recommend you create finely-tuned criteria. For example, an image might be trusted in a low-risk demo environment because it has relaxed patching requirements, but it would be instantly blocked as untrusted in a production environment. For more information, see Trusted Image Policies.
        
        Considerations for specifying criteria for the policy's conditions
        
        -   If you include a base image as a criterion in your trusted image policy, ensure that the base image itself is successfully scanned and pre-ingested into the system.
            
        -   Do not use Scanned by CLI = Yes as the sole criterion for establishing image trust. The CLI scanning status is generally used as an indicator that contributes to overall trustworthiness. Instead, combine the CLI scanning status with stronger, verifiable identifiers like the image registry, signature, and/or base image.
            
        -   Define trust criteria only using metadata that is consistently and explicitly included in your deployment files. The policy cannot establish trust if the required metadata (for example, a specific tag or label) is missing from the image definition.
            
        -   Avoid using mutable tags as criteria for establishing image trust. Because the underlying image associated with a mutable tag can change without warning, basing trust on it can lead to unexpected outcomes. We strongly recommend enforcing immutable tags—a hallmark of secure, mature CI/CD pipelines—which is supported by all major registries (such as Docker Hub, ACR, ECR, GAR).
            
        -   When using trust criteria that rely on image metadata, such as the base layer information or specific tags, we recommend that you pre-ingest the images into Cortex Cloud. While it is possible to base trust on an image which has not been pre-ingested, omitting this step can significantly impact the performance of your policy evaluation, which can slow down critical CI/CD workflows.
            
        
    2.  Click Next.
        
    
4.  Configure the policy's scope settings.
    
    1.  In the Scope section, for the Scope Selection Method select Asset Groups or Default Asset Scopes.
        
        -   **Asset Groups**. The policy applies only to Cloud workload container images, container instances, hosts (VM instances), serverless functions or Kubernetes workload asset types in those groups that are available at the Runtime SDLC stage. A list of available asset groups is displayed. You can then select the asset group to which you want this policy to apply.
            
            We recommend narrowing the asset group scope to ensure that a policy only checks relevant assets. For more information, see Trusted Images Policies.
            
            Consider the following when specifying criteria for the policy's scope:
            
            -   Exclude system-critical Kubernetes namespaces, such as **kube-system**, from the policy scope to avoid interfering with core cluster operations.
                
            -   If you select an asset group that contains a specific namespace, the policy will apply only to resources in that namespace—not the entire cluster.
                
            
        -   **Default Asset Scopes**. On selecting Default Asset Scopes , you can further select the Asset Types:
            
            -   All Cloud Workload Assets
                
            -   All Cloud Workload Container Images
                
            -   All Cloud Workload Kubernetes Workloads
                
            -   All Cloud Workload Serverless Functions
                
            -   All Cloud Workload Hosts (VM Instances)
                
            
        
    2.  Click Next.
        
    
5.  Configure the policy's action settings. In the Action section:
    
    1.  For Select an Action, choose either Create an issue to log an issue if the policy is violated or Prevent and create an issue to prevent and create an issue. For more information, see Preventative action.
        
    2.  If you select Prevent and create an issue as the policy's action, an additional Action when trust verdict is unavailable option becomes available. This is for situations where there is insufficient information available for determining if the image is trusted. The default is Prevent and create an issue.
        
    3.  Under Issue Severity, choose Critical, High, Medium, or Low to define the issue severity.
        
    4.  In the Remediation Guidance field, enter optional remediation instructions.
        
    
    Issues are automatically closed when the affected asset is removed from the inventory or when the policy is deleted. You can manually close issues at any time.
    
6.  Click Done to complete the process and create the new policy.

### Use an existing policy to create a new Cloud Workload policy
1.  Navigate to **Posture Management** → **Rules & Policies** → **Policies** → **Cloud Workload**.
    
2.  In the Cloud Workload Policies page, click the policy you want to enable or disable.
    
3.  In the **Details** page, click the **More Options** icon (**⋮**) and then select **Save as new**.
    
4.  Modify the necessary fields in the **Policy Name, Conditions, Scope,** and **Actions** screens.
    
5.  Click **Done** to create the new custom policy.

### Edit a Cloud Workload Policy
1.  Navigate to **Posture Management** → **Rules & Policies** → **Policies** → **Cloud Workload**.
    
2.  In the Cloud Workload Policies page, click the policy you want to enable or disable.
    
3.  In the **Details** page, click the **Edit** icon.
    
4.  Make the necessary changes.
    
5.  Click **Done** to save the changes.

### Delete a Cloud Workload Policy
1.  Navigate to **Posture Management** → **Rules & Policies** → **Policies** → **Cloud Workload**.
    
2.  In the Cloud Workload Policies page, click the policy you want to delete.
    
3.  In the **Details** page, click the **More Options** icon (**⋮**) and then select **Delete policy**.
    
4.  Click **Delete** to confirm.

### Cloud Workload Preventive Action
Some Cloud Workload policies provide a Prevent and Create an Issue action that enforces compliance during deployments.

#### **Prevention action for Runtime stage Policies**

The Prevent action at Runtime applies only to Kubernetes Workload Images assets.

When a Kubernetes Workload image violates a policy, the Kubernetes Admission Controller (on clusters where the KSPM Connector is deployed and Admission Control is enabled) can block it from being admitted to the cluster.

For all other asset types within the policy scope, no runtime prevention will occur. Instead, the violation will result in an Issue being created.

##### **Prerequisites**

Ensure that your cluster has the Posture Management (KSPM) Connector deployed with the Admission Controller functionality enabled.

You can manage these deployments from the Kubernetes Connectivity Management page.

To access the Kubernetes Connectivity Management, navigate to the following URL in your tenant environment: https://[TENANT-ADDRESS]/cwp/k8s-management.Kubernetes connectivity management

##### **Important considerations**

-   **Recommended Approach**: Begin with the Create an Issue action to validate results before selecting Prevent and Create an Issue. This helps prevent potential disruptions to your applications or development workflows.
    
-   **Impact on New Deployments**: The Prevent and Create an Issue action affects only new or future deployments that meet the prevention criteria. It does not impact cloud workload assets that are already deployed.
    

#### **Prevention action for CI stage Policies**

Prevention actions in the CI stage triggers a pipeline failure by returning an exit code of 2 in the CI tool.

## Cloud Workload Rules
**Rules**: Cloud Workload Rules define the criteria for identifying security violations. This criteria can be applied to assets in your cloud environment and to findings generated by Cortex Cloud.

Rules only enable the detection of security violations. They must be included in a policy to trigger a preventive response or generate an alert in the form of an issue.

### Default (pre-defined) Rules
Cortex Cloud includes a number of pre-defined rules to secure your cloud runtimes. These rules are used by default policies to prevent security violations and create issues.

### Custom (user-defined) Rules
Custom Rules or Custom Detection Rules allow you to define and implement tailored security and compliance checks within cloud workloads. These rules enable organizations to detect specific conditions, vulnerabilities, or misconfigurations that might not be covered by built-in system rules.

A custom rule consists of the following components:

-   **Scanner:** Defines the mechanism by which the rule inspects the cloud assets. You need to select the scanner type that will implement the rule. Every time the selected scanner runs, all the rules associated with that scanner are also executed. The available scanner types are:
    
    -   Agentless Disk Scan: Rules that use Agentless Disk Scanner to inspect the container images on which the Agentless scanner runs. You can specify different rules for containers running different OSes. For example, you can create a rule that checks for incorrect or malicious entries in the etc\\hosts file on Windows images.
        
    -   [Kubernetes Connector:](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/Cortex-XDR-Cloud-Documentation/What-s-new-in-Kubernetes-Connector) Rules that use the Kubernetes Connector scanner to inspect Kubernetes environment variables and resources such as Namespaces, ReplicaSets, Deployments and more.
        
    -   [XDR Agent:](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/Cortex-XDR-Cloud-Documentation/Install-Cortex-XDR-agents) Rules that use XDR Agent Scanner to perform custom compliance checks by executing user-defined Python scripts, offering a tailored approach to compliance validation.
        
    
-   Rule (Condition): Defines the detection criteria. This is specified as Rego or Python statements that evaluate assets, findings, and their associated attributes to identify security violations based on the selected scanner.
    
-   Severity: The selected value is included in issues that are created as a result of rule violation.
    
-   Compliance Controls: Associates the custom rule with a custom compliance control. If the rule detects the security violation, it will invoke the corresponding compliance control, thereby including the violation in relevant compliance reports.

### Cloud Workload Rules page
The **Cloud Workload Rules** page allows users to manage rules. Users can create, edit, filter, and manage rules.

**Note:**

Keep the following caveats in my mind when working with Rules:

-   Instance Administrators are able to view all facets of Rules without restrictions, even if Scope Based Access Control (SBAC) roles are in effect. Learn more about SBAC.Manage user scope
    
-   If you’ve been assigned a custom role with View/Edit permissions limited by SBAC, you may not be able to view specific Rules.
    
-   You can further narrow your search in a Rules table by using SBAC to limit the scope of the finding, issues, and case counts.
    

The Widget section enables the users to get 'at-a-glance' based on Platform, Rule type and Scanner type.

The Cloud Workload Rules page displays both the default rules and user-configured rules, with the following fields.

**Rule table columns**

| Column Name | Description |
| --- | --- |
| **Rule ID** | A unique identifier assigned to each rule. |
| **Rule Name** | The name of the rule, typically defined by the user or system. |
| **Description** | A brief summary of the rule's purpose and functionality. |
| **Policies** | Lists the policies in which the rule is included. |
| **Controls** | Compliance controls associated with the rule for regulatory adherence. |
| **Platform** | Specifies the platform or environment the rule applies to. For example: **Linux, Windows** or **Kubernetes**. |
| **Scanner** | The tool or method used to evaluate findings, such as _Inventory Scanner_, _Agentless Disk Scan, Host Scanner, Kubernetes Connector or Kubernetes File System Scanner_ . |
| Severity | Defines the severity of the rule. |
| **Data Type** | The type of data the rule evaluates. For example: **Hosts** or **Kubernetes Resources** |
| **Created By** | The user who created the rule. |
| **Last Modified** | The date and time the rule was last updated. |
| **Rule Type** | Indicates whether the rule is a **Built-in** or Custom rule. |
| Remediation | Defines the remediation steps to address the detected misconfiguration. |
| **Applicable assets** | Supported applicable asset types. |
| **Available actions** | Indicates whether the available action is **Prevent and Create an Issue** or **Create an Issue** |
| **Standards** | Associated compliance standards or controls |
| **Open issue** | No. of open issue related to this rule. |

#### Filter page results
You can use Show filter Panel button in the upper-right corner of the Rules page to filter the existing rules based on different filter criteria, as described below:

Table 6. Rule Filter table

| Filter | Allowed Values |
| --- | --- |
| Rule Name | Rule names and empty values |
| Description | Rule description and empty values |
| Policies | No. of policies |
| Controls | No. of controls |
| Platform | _Linux, Windows and Kubernetes_ |
| Scanner | _Agentless Disk Scan, Host Scanner, Kubernetes Connector, Kubernetes File System Scanner_ and _Inventory Scanner_ |
| Data type | _Hosts, Kubernetes Resources_ |
| Severity | _Informational, Low, Medium, High_ and _Critical_ |
| Created by | System or specific username |
| Last modified | Selected date and time |
| Rule type | _Built-in_ and _Custom_ |
| Remediation | Remediation values |
| Applicable assets | Supported applicable asset types |
| Available actions | _Prevent and Create an Issue_ and _Create an Issue_ |
| Standards | Associated compliance standards or controls |
| Open Issues | No. of open issue |
| Rule ID | Unique Id of a rule |

#### Change the layout of the rules table
1.  Navigate to **Posture Management > Rules > Cloud Workload**.
    
2.  In the **Cloud Workload Rules** page, click the **More Options** icon (**⋮**).
    
3.  In the **Layout** tab, do the following:
    
    -   To add or remove columns, search for a specific column and:
        
        -   Click **+** to add it to the table.
            
        -   Click **\-** to remove it from the table.
            
        
    -   To reorder columns, go to the **In View** section and **click and drag** columns up or down.
        
    -   To add new columns, go to the **Add Columns** section and click **+** to include them in the table.
        
    
4.  The table layout updates automatically based on your selections.

#### Rule details panel
The rule panel displays the following details related to the selected rule:

-   Details of the rule like scanner details, remediation details and more.
    
-   Compliance Controls for the rule.
    

This panel enables you to:

-   Edit the rule
    
-   Save as new
    
-   Delete the rule

### Create a new Custom Detection Rule

Create Custom Detection Rules to check your organization’s assets.

Creating Custom Detection Rules give you the flexibility to define and enforce security best practices tailored to your organization's objectives, as well as regulatory requirements not already covered by the compliance standards in our catalog.

#### Before you begin

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
    | Define the Rule (Rego) | Use Rego to define the custom detection logic. Use the default code in this box as a reference or starting point. Click [read here](https://www.openpolicyagent.org/docs/latest/policy-language/#learning-rego) for more information how to use Rego syntax. |
    
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
    
    ##### Create an issue
    
    Under Posture Management → Policies → Cloud Workload, add the Custom Detection Rule to a Policy. This policy automatically runs the rule and creates an issue if the check fails.
    
    ##### Monitor compliance adherence
    
    Under Posture Management → Compliance → Catalogs → Standards, create a custom standard that includes the custom control associated with the Custom Detection Rule, and then create an assessment profile that runs the custom standard. You can then monitor the compliance results in a report. For more information, see Monitor and track compliance adherence.

### Use an existing rule to create a new Custom Detection Rule
1.  Navigate to **Posture Management** → **Rules & Policies** → **Rules** → **Cloud Workload**.
    
2.  In the **Cloud Workload Rules** page, click the policy you want to enable or disable.
    
3.  In the **Details** page, click the **More Options** icon (**⋮**) and then select **Save as new**.
    
4.  Modify the fields as required.
    
5.  Click **Create** to create the new custom detection rule.

### Edit a Custom Detection Rule
1.  Navigate to **Posture Management** → **Rules & Policies** → **Rules** → **Cloud Workload**.
    
2.  In the **Cloud Workload Rules** page, click the rule you want to edit.
    
3.  In the **Details** page, click the **More Options** icon (**⋮**) and then click **Edit**.
    
4.  Make the necessary changes.
    
5.  Click **Update** to save the changes.

### Delete a Custom Detection Rule
1.  Navigate to **Posture Management** → **Rules & Policies** → **Rules** → **Cloud Workload**.
    
2.  In the **Cloud Workload Rules** page, click the rule you want to delete.
    
3.  In the **Details** page, click the **More Options** icon (**⋮**) and then select **Delete**.
    
4.  In the confirmation message, click **Delete**.
