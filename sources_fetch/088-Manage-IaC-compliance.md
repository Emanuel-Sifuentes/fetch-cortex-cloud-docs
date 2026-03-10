---
title: "Manage IaC compliance"
tocId: "EqnIiYos0a2~nCanO9GQpQ"
contentId: "UPbOX0woAQw4rGjG6yfPvg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Manage-IaC-compliance"
depth: 2
---

# Manage IaC compliance
Manage IaC compliance assessments and reports directly in the tenant to generate and download audit-ready compliance evidence. You can view mapped rules, enforce compliance via policies, and filter issues by specific regulatory controls.

## View IaC compliance rules mapped to compliance standards and controls

You can view and modify compliance standards mapped to specific IaC rules in AppSec Rules to control which rules are evaluated for compliance and ensure that findings are correctly attributed to the intended compliance framework.

1.  Navigate to Modules → Application Security → AppSec Rules.
    
2.  Filter the table by IaC -supported Compliance Standards OR Compliance Controls attributes.
    
    **Danger**
    
    Add these properties to the IaC Rules table through the Table Settings Menu, as they are not exposed by default.
    

## Create Cortex Cloud Application Security policies with IaC compliance conditions

Create policies to include or exclude findings based on specific IaC compliance standards and controls. This provides precise control over automated issue creation and build-blocking.

1.  Navigate to Modules → Application Security → AppSec Polices → Add Policy.
    
2.  Follow the standard procedure in the policy wizard. The configuration for all steps remains the same, except for the Conditions step.
    
3.  On the Conditions step of the wizard.
    
    1.  Apply a compliance filter: Select either Compliance Standard or Compliance Control as the attribute.
        
    2.  Select the required values for the standard or control.
        

## Manage IaC compliance issues and findings

IaC Compliance issues and findings are found under the respective IaC Misconfigurations tables. You can filter IaC misconfiguration findings and issues by compliance standards and controls to isolate risks relevant to specific regulatory frameworks. This allows you to prioritize remediation based on your organization's required security controls.

**Danger**

Add these properties to the tables table through the Table Settings Menu, as they are not exposed by default.

1.  Navigate to Modules → Application Security → IaC Misconfigurations (under Issues).
    
2.  -   **For IaC Compliance issues**:
        
        -   Filter the table by IaC-supported Compliance Standards OR Compliance Controls attributes.
            
        -   View Compliance Standards and Compliance Controls in the Issues table by adding these properties through the Table Settings Menu.
            
        -   The IaC issues side card includes a Compliance Standards tab with additional details about IaC Compliance Standards and Controls.
            
        
    -   **For IaC Compliance findings**:
        
        -   Select the Findings tab in the IaC issues page.
            
        -   View IaC-supported Compliance Standards and Compliance Controls in the Findings table by adding these properties through the Table Settings Menu.
            
        -   The Compliance Standards tab in the IaC findings side panel displays the specific standards and controls mapped to the Cortex Cloud Application Security rules.