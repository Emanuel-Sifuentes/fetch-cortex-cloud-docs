---
title: "Create CI/CD compliance reports"
tocId: "lDySrzD8m6Mn_2QlDsNqHA"
contentId: "~HQjWKjrr6~kRGWJcP9GjQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Create-CI/CD-compliance-reports"
depth: 3
---

# Create CI/CD compliance reports
The following steps describe the workflow for creating CI/CD compliance reports.

| Step | Description |
| --- | --- |
| Step 1. Create an Asset Group. | Create an Asset Group |
| Step 2. Create an Assessment Profile. | Create an Assessment Profile |
| Step 3. View reports. | View and access reports |

## Create an Asset Group

Create an asset group to define a logical collection of your CI/CD assets (such as specific repositories or pipelines within a provider like GitHub). This step scopes your security assessments, ensuring that subsequent compliance checks and scans performed by an assessment profile are applied to the relevant resources.

1.  Navigate to Inventory → Groups → \+ Add Group.
    
2.  On the Create New Assets Group screen:
    
    1.  Provide a group name (required) and description.
        
    2.  From the Filter menu in the Assets table, select Provider → \[Type of provider\].
        
        **Note**
        
        The CI/CD module supports GitHub and GitLab provider types.
        
    3.  Select Create Dynamic Group, or select assets from the list that is displayed, and click Create Static Group.
        
    
    **Note**
    
    For more information about about Asset Groups, refer to Asset Groups.Asset Groups
    

## Create an Assessment Profile

Create an assessment profile, which configures the specific security standards and initiates the scans against the assets defined in your asset group.

1.  Navigate to Posture Management → Compliance → Assessment Profiles → Create New Assessment.
    
2.  On the General step of the wizard.
    
    1.  Provide a profile name (required) and description (optional), and select Generate a scheduled report.
        
    2.  Specify the email recipients for the report.
        
    3.  Set the Evaluation frequency (required).
        
    4.  Click Next.
        
3.  On the Standards and Asset Group step of the wizard.
    
    1.  Select a standard.
        
        **Note**
        
        CIS GitLab Benchmark, CIS GitHub Benchmark, and the OWASP Top 10 CI/CD Risks standards are supported.
        
    2.  Select your asset group from the list and click Next.
        
    
4.  Review the details on the Summary step of the wizard and click Create.
    

**Note**

For more information about assessment profiles, refer to Use an assessment profile to run compliance checks on your assets.Use an assessment profile to run compliance checks on your assets

## View and access reports

The email recipients defined in the assessment profile will receive the compliance report.

To view the compliance scan results:

-   Navigate to Posture Management → Compliance → Reports.
    

For more information about compliance assessment reports, refer to View and manage compliance assessments and reports.View and manage compliance assessments and reports