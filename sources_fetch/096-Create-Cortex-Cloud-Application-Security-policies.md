---
title: "Create Cortex Cloud Application Security policies"
tocId: "ZycVB5tP9HpEUAlwChkRiA"
contentId: "qNYV2_Ia8aZmoO1~cR~j_Q"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Create-Cortex-Cloud-Application-Security-policies"
depth: 2
---

# Create Cortex Cloud Application Security policies
You can create custom policies to detect and prevent security risks across your software development environments and workflows. Cortex Cloud Application Security policies define how to respond to code and configuration drift, either by blocking risks (prevent) or creating issues for remediation (detect). To enhance and automate protection, you can use AI Guardrails, which analyze real security findings to recommend tailored policies. These tools help enforce consistent, automated responses to threats and infrastructure deviations across your code and CI/CD environments before they reach production.

Cortex Cloud Application Security policies are categorized into the following types based on their focus:

-   Code Security policies
    
-   AI-recommended guardrails
    
-   CI/CD Configuration policiesCreate CI/CD configuration policies
    
-   Create IaC Drift Detection policiesCreate IaC Drift Detection policies
    

## Policy evaluation overview

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
    
    Example 4. Example
    
    **Parameters**:
    
    -   **Condition**: Critical vulnerability
        
    -   **Trigger**: Pull request
        
    -   **Actions**: Prevent, Report, Detect
        
    
    **Result**
    
    When a pull request scan detects a critical vulnerability:
    
    -   The pull request is blocked
        
    -   A comment is added to the pull request
        
    -   An issue is created for the detected vulnerability
        
    
      
    

### Multiple policies matching a single finding

If a single finding matches multiple policies, actions from all matching policies are evaluated. Each action is executed only once.

Example 5. Example

**Parameters**:

-   **Policy A**: Prevent (Block PR), Detect (Create an issue)
    
-   **Policy B**: Detect (Create an issue)
    
-   **Policy C**: Report (PR comment)
    

**Result**:

When the finding is detected:

-   The pull request is blocked
    
-   One issue is created
    
-   A PR comment is added
    

  

**Note**

When an issue is created, only the first policy ID that triggered the issue is associated with it.

### Viewing blocking policies

When a CI scan is blocked by a policy, the blocking policy is shown in the **CI Scan Health** view under the **Blocking Policy** column.

The same behavior applies to pull request (PR) scans. When a PR is blocked, the blocking policy appears in the PR scan details.

### Third-party scanner limitations

Policies applied to third-party scanners are currently supported with the following limitations:

-   Only **periodic scan** triggers are supported
    
-   Only the Create an Issue action is available