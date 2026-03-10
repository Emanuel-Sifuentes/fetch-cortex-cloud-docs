---
title: "Manage AI-recommended guardrails"
tocId: "dsJY0oStR0Odx72lGzWplQ"
contentId: "rJ2X_R4hLQcMQxyc5nRtAw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Manage-AI-recommended-guardrails"
depth: 3
---

# Manage AI-recommended guardrails
AI-recommended guardrails are tailored to your environment's findings. Applying these recommendations converts them into active enforcement policies across your organization.

For more information on AI-recommended guardrails, refer to AI-recommended guardrails.

**Note**

Recommended guardrails are generated based exclusively on findings from the Cortex Cloud Application Security Software Composition Analysis (SCA) scanner. They do not support SCA data ingested from third-party scanners, nor do they currently support other finding categories, such as Secrets or Infrastructure as Code (IaC).

To review, implement, or dismiss AI-recommended guardrails:

1.  Access AI-recommended policies:
    
    -   From the ASPM Command Center: Select Explore in the AI Guardrails section
        
    -   From the AppSec Policies page: Navigate to Modules → Application Security → AppSec Policies → click AI Recommendations
        
        **Note**
        
        The total amount of available recommended guardrails is displayed on the AI Recommendations button.
        
    
2.  Select an action based on your requirements:
    
    -   Apply: Immediately converts the recommendation into an active policy. Use this for high-confidence suggestions where you do not need to modify parameters
        
    -   View Assets: Redirects you to the Scope step of the AppSec Policies wizard, where you can validate the specific list of repositories or business applications that the AI engine has identified for inclusion in the policy’s enforcement perimeter
        
    -   View Evidence: Redirects to the relevant Findings page, automatically filtered to display the specific instances of the identified risk, such as a vulnerable package
        
    -   View Details: Redirects to the Summary step of the AppSec Policies wizard, allowing you to validate the suggested policy configuration, including scope, conditions and actions, before creating the policy.
        
        -   Review the parameters. Use the Back and Next buttons to navigate the wizard and modify policy parameters as seeded
            
        -   Select Done to approve and create the policy immediately without additional navigation
            
        
    -   Dismiss: If the recommendation is not relevant:
        
    

## Monitor active guardrails

Once applied, policies based on AI guardrail recommendations are displayed in the AppSec Policies table and are tagged as AI-Recommended for easy filtering and reporting.

**Note**

The AI-Recommended tag is only assigned to recommendations applied as-is, that is, without modifications. Edited recommendations generate policies without this label.

## Next step: Investigate and remediate SCA issues

Investigate and remediate vulnerabilities detected by your AI-Recommended policies to secure your software dependencies and strengthen your software supply chain. For more information reefer to Software Composition Analysis (SCA) vulnerability issues.