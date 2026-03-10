---
title: "Code to Cloud troubleshooting"
tocId: "GK7K6CrLREJAhCZTLAet1g"
contentId: "C21ltJl7VvaQkXsIW1eUHw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Code-to-Cloud-troubleshooting"
depth: 2
---

# Code to Cloud troubleshooting
If the Code to Cloud lineage is incomplete, specific signals may be missing. Common issues include:

-   **Missing YOR Tags (IaC Resources)**: IIaC resources without tags cannot be mapped to runtime. The system will prompt you to tag these resources
    
-   **Missing Pipeline Integrations (Repositories)**: If pipeline integrations are missing, the link between code and build artifacts breaks
    
-   **Inactive Pipeline**: Lineage is generated during pipeline runs. If a pipeline is integrated but has not run, trigger a build to generate the necessary artifacts and establish the connection
    

**Note**

Empty state messages and troubleshooting guidance for missing lineage are only visible to users with an active license.