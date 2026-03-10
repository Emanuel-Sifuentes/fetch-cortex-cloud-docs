---
title: "How to manually build an application"
tocId: "5GjnYpE~qh2NIgywoVoIFA"
contentId: "StR14TbHCOnN455tiNonYg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/How-to-manually-build-an-application"
depth: 3
---

# How to manually build an application

Manually build an application by adding assets, starting from either the code or run side.

You can build your application by adding assets, starting from either the code or run side. This process covers your entire code-to-cloud journey: Code, Build, Deploy, Run. Your application is then automatically built from the assets you select on your chosen starting side, and other assets are added automatically based on their connections.

**Prerequisites**

Before you begin, ensure you have connected the necessary data sources. Refer to How to onboard data sources for more information.How to onboard data sources

1.  Under Modules, select Application Security → Business Applications (under Application Management) → New Application → New Application.
    
2.  In the Add a New Application dialog box:
    
    1.  Provide the required details:
        
        -   Application name (required): A user-provided name
            
        -   Category (required): Default - Business Application
            
        -   Description: A description of the application. Provides context for users interacting with the application
            
        -   Business Criticality (required): The level of importance of the application to your organization. This helps prioritize resources and attention based on the application's impact to your business objectives
            
        -   Business owner: The individual or team responsible for the application from a business perspective
            
        
    2.  Click Create.
        
3.  On the Applications page: Add assets to your application, starting with either code or cloud assets:
    
    -   **Add code assets from the Code pane**:
        
        1.  Select a version control system (VCS) from the list that is displayed.
            
        2.  Choose one or more of the following from their respective dropdown lists (multiple selections allowed): a specific VCS instance, an organization, or a repository.
            
            **Note**
            
            These filters are represented by icons displayed on the Code pane after selecting a VCS.
            
        3.  Click Done (on the Code pane).
            
            After connecting your VCS, Prisma: Cortex automatically identifies and associates all build-time (such as source code, build scripts, Dockerfiles, CI tools), deploy (such as Kubernetes manifests, Helm charts, Terraform scripts), and runtime assets (such as running containers, virtual machines, cloud instances).
            
        
    -   **Add cloud assets from the Run pane**:
        
        1.  Select an option:
            
            -   Click Add Assets by Provider to select a cloud service provider
                
            -   Click Add Assets by Tag or optionally select Kubernetes Namespace, Kubernetes Cluster, VPC, Organization or Resource tag to automatically populate the application with runtime assets associated with those entities. These filters are represented by an icon displayed under Run (after selecting a cloud provider)
                
            
        2.  Select an instance of your connected provider from the list that is displayed.
            
        3.  Click Done (on the Run pane).
            
            After connecting your cloud service provider, Cortex Cloud automatically identifies, associates and displays all Code (VCS repositories), build-time (such as source code, build scripts, Dockerfiles, CI/CD pipelines) and deploy assets (such as Kubernetes manifests, Helm charts, Terraform scripts).
            
        
    
4.  Click Finish to create the application.
    
    The application is displayed on both the All Applications and its dedicated asset page (business).
    

**Note**

To edit application assets, click the Clear All icon before clicking Finish. This clears all application data, allowing you to restart the application building process from the beginning.