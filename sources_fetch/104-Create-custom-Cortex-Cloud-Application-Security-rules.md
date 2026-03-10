---
title: "Create custom Cortex Cloud Application Security rules"
tocId: "e5nS9ovLWZ9GjaG_rFCJeA"
contentId: "nOSPkaRPbMRY~sgV2W7uuw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Create-custom-Cortex-Cloud-Application-Security-rules"
depth: 2
---

# Create custom Cortex Cloud Application Security rules
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
            
            Example 10. Example
            
            If IAM is the category, and Overly Permissive is the sub-category, the finding type description is: "Based on the categorization, finding type will be "Overly permissive IAM policies configuration found in infrastructure as code"".
            
              
            
        -   Framework: The framework or language that the rule is designed to apply to, such as Terraform, CloudFormation and ARM
            
        -   Labels: Assign tags to rules to help categorize, filter, and organize them for easier identification and management
            
        -   Mapped Runtime Rule: Select a runtime rule from the menu to map to your custom build time rule. This enhances your code-to-cloud visibility, allowing you to prioritize findings which are detected in both build and deployed environments
            
        
    2.  Click Next.
        
3.  On the Rule Configuration screen.
    
    1.  Provide your rule definition as YAML.
        
        **Note**
        
        See Configure YAML file properties below for more details.
        
    2.  Validate the code: Click Validate Code.
        
    3.  Provide suggested remediation in AsciiDoc format.
        
    4.  Click Done.
        
        The rule is displayed in the rules inventory table.
        
    
    **Note**
    
    Scanning/testing behavior is not supported.