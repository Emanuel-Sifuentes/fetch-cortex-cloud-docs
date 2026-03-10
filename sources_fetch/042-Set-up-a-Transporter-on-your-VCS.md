---
title: "Set up a Transporter on your VCS"
tocId: "Hu9dJwYR3Og4K3ehcP3BAQ"
contentId: "QlfqRTh1gppiQ51Rq4eoOA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Set-up-a-Transporter-on-your-VCS"
depth: 2
---

# Set up a Transporter on your VCS

Setup a Transporter on your version control system.

You configure a Transporter when onboarding your on-premises version control system (VCS). This setup is performed on the Configure Domain step of the onboarding wizard. GitHub Server, GitLab self-managed and Bitbucket Data Center version control systems support the Transporter integration, where it functions as a network tunnel.

**Prerequisites**

-   Ensure you have user permissions to onboard data sources.
    
    **Note**
    
    The dedicated AppSec Admin role includes the required permissions.
    
-   Before you begin you must setup a Transporter applet on your Broker VM. Refer to Set up a Transporter applet on Broker VM for more information
    

1.  Onboard your VCS on-premises data source: Select Settings → Data Sources & Integrations → \+ Add New → , and search for your VCS on-premises data source.
    
2.  Configure the Transporter on the Configure Domain step of the wizard:
    
    1.  Select your Broker VM from the provided menu.
        
    2.  Select the Transporter applet associated with the selected Broker VM from the Transporter Connection menu.
        
3.  Complete the steps required to onboard the VCS data source: Refer to Onboard version control systems for more information about onboarding VCS data sources.
    

**Note**

**GitLab Enterprise webhook internal IP restriction**: GitLab Enterprise's security policies prevent webhook subscriptions to internal IP addresses (such as broker addresses). These subscriptions can only be enabled through specific instance configuration. For more information, refer to [https://docs.gitlab.com/security/webhooks/](https://docs.gitlab.com/security/webhooks/).