---
title: "Create IaC Drift Detection policies"
tocId: "CyXqO1faOladPKNktlZP5Q"
contentId: "lFMO3WV~TC8lgEEj~qGH7g"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Create-IaC-Drift-Detection-policies"
depth: 3
---

# Create IaC Drift Detection policies
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
    

## Next step: Investigate and remediate drift

Once your policies identify configuration drift, investigate the issue and apply remediation options to align your runtime environment with your IaC baseline. For more information, refer to IaC Drift Detection scans.