---
title: "Manage issues detected in repositories"
tocId: "XFKaw1xR7iQNEmATlat_Bg"
contentId: "JsQOjD9HJVPnq~ZbxvjDZQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Manage-issues-detected-in-repositories"
depth: 2
---

# Manage issues detected in repositories
The **Repositories** assets inventory provides an overview of the security issues identified by various scanners that analyze the repository's code and configuration. This includes the number and severity of issues detected in each repository.

You can remediate these issues directly from the asset inventory:

1.  Select a repository from the inventory table.
    
    A card is displayed with expanded repository details, including these types of issues detected during repository scans organized by tab according to category. Refer to In-depth repository asset information for more details about available issue categories in repository assets.
    
2.  Click on a tab including an issue.
    
    A list of issues for the selected type is displayed.
    
3.  Select an issue from the list.
    
    A card with detailed issue information, including remediation options, is displayed.
    
4.  Remediate the issue:
    
    -   For Secrets exposure, refer to Secrets issues
        
    -   For IaC misconfiguration, refer to IaC misconfiguration issues
        
    -   SCA vulnerabilities:
        
        -   For CVE vulnerabilities, refer to Software Composition Analysis (SCA) vulnerability issues
            
        -   For package operational risks, refer to Package integrity issuesPackage integrity issues
            
        -   For package integrity (license miscompliance), refer to License miscompliance issues
            
        
    -   For SAST CWE weaknesses, refer to SAST code weaknesses (CWEs)SAST code weaknesses (CWEs)
        
    

**Note**

You can also find the repository issues in the general issue inventory table, and in the dedicated inventory of issues for each scanner type (_see step 4 above for details_).