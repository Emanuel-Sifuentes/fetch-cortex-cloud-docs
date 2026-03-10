---
title: "Define applications by cloud tag-based criteria"
tocId: "3e54TnlbuaSUs~Ra2GH_cA"
contentId: "zOsFlZWbTwkpHXgxCXp5Lg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Define-applications-by-cloud-tag-based-criteria"
depth: 3
---

# Define applications by cloud tag-based criteria
Creating applications through cloud entities (Accounts, Subscriptions, or Resource Groups) is the foundational step for runtime-driven risk correlation. By defining these grouping rules, you enable Cortex Cloud to unify infrastructure assets within a specific Cloud Service Provider (CSP) and automatically link runtime environments to their associated deployment pipelines and originating source code. This environmental context is required for precise exploitability-aware prioritization and comprehensive Cloud to Code visibility.

Grouping is limited to assets within a single cloud provider, and assets with the same tag key and value across accounts or projects in the same provider are included in the same application. Cross-provider grouping is not supported.

**Prerequisites**

**Permissions**: You must have View/Edit permissions for Access Management, or a role that includes these permissions.

1.  Under Modules, select Application Security → Business Applications (under Application Management) → Create Applications → New Criteria.
    
2.  On the General step of the application Criteria wizard.
    
    1.  Select Cloud.
        
        **Note**
        
        You can only create applications based on the entities from onboarded Cloud accounts listed in the Cloud card.
        
    2.  Provide a Criteria name (required) and description.
        
    3.  Click Next.
        
3.  On the Define Criteria step of the wizard.
    
    1.  Select a cloud provider to define where assets will be discovered for the application.
        
        The system automatically retrieves all available tag keys from that provider.
        
    2.  Select the organizational tags you will use for automatic asset grouping:
        
        -   **Selection limit**: Select between one and five tags
            
        -   **Grouping logic**: When multiple tags are selected, an `AND` condition is applied. Only assets that contain **all** the chosen tag keys will be included in the resulting application
            
        
        **Note**
        
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