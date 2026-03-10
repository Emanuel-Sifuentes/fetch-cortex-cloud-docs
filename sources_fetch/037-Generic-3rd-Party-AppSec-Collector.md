---
title: "Generic 3rd Party AppSec Collector"
tocId: "ez7mGY1jkQaAuKjwVMErnw"
contentId: "kGgOo4QSmOolGzyYcXcrbg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Generic-3rd-Party-AppSec-Collector"
depth: 2
---

# Generic 3rd Party AppSec Collector
The 3rd Party AppSec Collector automatically uploads Static Application Security Testing (SAST) data from third-party tools that support SARIF (Static Analysis Results Interchange Format) output. This allows you to view your SAST data directly within Cortex Cloud. Once SARIF files are uploaded, they are parsed to create code findings. These findings can then be elevated to issues, either manually or automatically, depending on your configured policies.

**Important**

File uploads are limited to a maximum size of 10 MB.

After onboarding the 3rd Party AppSec Collector, you can view SAST code weaknesses generated from ingested SARIF findings in these locations:

-   On the Code Weaknesses page under Cortex Cloud Application Security Issues
    
    For more information about SAST issues under Code Weaknesses issues, refer to Manage code weaknesses
    
-   Under dedicated Code Weaknesses tabs on the Repositories or Business Applications assets pages, where relevant SAST issues have been identified for that asset.
    
    -   For more information about SAST issues on the Code Weaknesses tab under Repositories assets, refer to In-depth repository asset information
        
    -   For more information about SAST issues on the Code Weaknesses tab under Business Applications assets, refer to Business application expanded asset details