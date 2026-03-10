---
title: "Create custom CI/CD policies"
tocId: "3xf8Pcmi2971tOU0HqcV_g"
contentId: "YYMnWSC3wW2gm6cMm58sig"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Create-custom-CI/CD-policies"
depth: 2
---

# Create custom CI/CD policies
Create custom CI/CD policies to enable tailored security checks across your pipelines.

1.  Under Modules, select Application Security → AppSec Policies (under Policy Management).
    
2.  Click Add Policy on the Policies page.
    
3.  Provide a policy name (required) and description on the General step of the wizard that is displayed, and click Next.
    
4.  Define the policy conditions on the Define Conditions step of the wizard.
    
    1.  Define the criteria for your policy to evaluate.
        
        -   Trigger (Required): For CI/CD policies, the only supported trigger type is Periodic scan.
            
            **Note**
            
            PR Scan and CI Scan triggers are automatically disabled and unchecked. They can only be enabled if other scan types (that is non-CI/CD risk scans such as Secrets) are also selected, and will only run on non-CI/CD risks types of scans
            
        -   Conditions (Required). Configure conditions for CI/CD risks by selecting CI/CD Risks as the Finding Type: Select Add Filter → Finding Type → CI/CD Risks.
            
            **Note**
            
            You can combine multiple conditions to create complex rules for when the policy should apply.
            
            Example 17. EXAMPLE
            
            Create conditions that apply to a CI/CD policy which detects high severity CI/CD risks on GitHub: Select Add Filter → Finding Type → CI/CD Risks → AND → Provider → \[VCS/CI/CD system\] → AND → Severity: → High.
            
              
            
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
            
            **Note**
            
            -   SBAC scope limitations do not apply to Matching Criteria
                
            -   For CI/CD policies, you can filter Matching Criteria by VCS Organization Name, CI/CD Pipeline \[Name/ID\], CI/CD Instance \[Name/ID\] or Collaborator \[Name/Email/MFA Enabled/Last Observed\]
                
            
        
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
        

## Finding Type attribute for CI/CD Risks

When CI/CD Risks is selected as the finding type, the following apply:

-   Periodic Scan trigger: This trigger is automatically enabled and locked (checked and disabled from being unchecked), as CI/CD Risks scans only run on Periodic scans
    
-   PR Scan and CI Scan triggers: These triggers are automatically disabled and unchecked. They can only be enabled if other scan types (that is non-CI/CD risk scans such as Secrets) are also selected, and will only run on non-CI/CD risks types of scans
    
-   CI/CD risks attributes include Severity, AppSec Rule, AppSec Rule Label, Backlog Status, Subcategory, Provider (such as GitHub) and Finding Type (which enables you to enlarge the policy scope to include additional scanner types)
    
    For more information about Backlog Status, refer to Backlog baseline.