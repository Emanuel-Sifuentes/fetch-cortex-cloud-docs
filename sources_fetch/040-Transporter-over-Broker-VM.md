---
title: "Transporter over Broker VM"
tocId: "IFxmThFkS_WfhAU3V~mKrg"
contentId: "hFwQrLEGgmE_JjzyGpYaJQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Transporter-over-Broker-VM"
depth: 1
---

# Transporter over Broker VM

Transporter over Broker VM sets up a secure communication channel between your VCS and Cortex.

The Transporter over Broker VM enables secure communication between your self-hosted Version Control Systems (VCS) and Cortex Cloud. This solution addresses the need for secure code scanning without exposing your internal network to the cloud.

## Use cases

-   **Enhanced security**: Establish a secure network tunnel for your self-hosted VCS, eliminating the need to open direct IP access to the cloud for scanning
    
-   **Seamless Integration**: Leverage the existing Cortex Cloud Broker VM infrastructure to deploy and manage the Transporter applet
    
-   **Simplified management**: Configure and manage the Transporter applet directly through the Cortex Cloud console
    
-   **Automated updates**: The Broker VM automatically receives updates and enhancements, providing new capabilities to the Transporter without manual intervention
    

## License

To gain access to the Transporter applet, you must have a Cloud license (Posture Management or Runtime Management) or a XSIAM Premium license.

**Warning**

The Transporter applet is not supported for FedRAMP customers.

## Key components

The Transporter over Broker VM solution includes the following key components:

-   **Transporter applet** This component runs within your internal network, specifically on a Broker VM. The applet requires access to your self-hosted version control providers (VCS) such as GitHub Server.
    
    The Transporter:
    
    -   Establishes and maintains secure, long-lived connections to both your tenant and your VCS providers
        
    -   Operates based on events from the VCS provider or triggers initiated from your tenant
        
    
-   **Broker VM**: In the Cortex Cloud Application Security environment, the Broker VM is a secured virtual machine (VM) designed to host the Transporter applet within your network. The Transporter applet is installed as an application or connector directly onto the Broker VM.
    
    **Note**
    
    -   The broker enables multiple connections, allowing a single Transporter applet to connect to various VCS instances
        
    -   Multiple Transporter applets cannot be created on a single Broker VM. Each Broker VM is limited to a single Transporter applet instance
        
    
-   **Cortex Tenant**: Serves as the central cloud platform with several key functions in the Transporter system:
    
    -   Acts as the cloud endpoint for the secure, long-lived WebSocket tunnel established by the Transporter applet running on your Broker VM
        
    -   Links the Transporter applet to your self-managed VCS data sources, utilizing the secure tunnel for all communication.
        
    -   Receives the data uploaded by the Transporter from your environment
        
    -   Server as the scanner execution environment and results
        
    -   Provides the interface for configuring and managing the Transporter system, as well as reviewing and managing the scan results
        
    -   Monitors the status and health of your Transporter applets, providing visibility into their operation
        
    

## Set up the Transporter

The order for setting up the Transporter solution is as follows:

**Prerequisites**

-   Ensure you have the necessary permissions and have already set up your Broker VM
    
-   Confirm that your Broker is v 28 or above
    
-   Whitelist IP addresses to enable access to Cortex Cloud resources. The IP addresses for the Transporter are in the Broker VM Resources section of the Enable access to required PANW resources documentEnable access to required PANW resources
    
-   Open port `4052` (inbound), which is required for the Transporter's IP address communication
    
-   Open Port `443` (outbound), which is required for the Broker VM to pull data from the your version control system (VCS)
    

1.  Set up the Transporter applet on your Broker VM.
    
2.  Onboard the Transporter on your VCS.