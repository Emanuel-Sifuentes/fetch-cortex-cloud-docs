# Network exposure detection

Cortex Cloud improves network security posture in your public cloud environments. It identifies assets exposed to the internet so you can prioritize and remediate risks.

Cortex Cloud improves network security posture in your public cloud environments. It identifies assets exposed to the internet so you can prioritize and remediate risks.

Cortex Cloud publishes network exposure findings and issues based on out-of-the-box and custom [cloud security rules and policies](https://docs-cortex.paloaltonetworks.com/r/Cortex-CLOUD/Cortex-Cloud-Posture-Management-Documentation/Create-a-Network-Exposure-Rule). Security teams can review these findings and issues to gain visibility into network exposures, finding answers to the following questions:

-   Which assets are exposed to the internet?
    
-   Which assets can connect to the internet?
    
-   Which assets can communicate across VPCs or cloud accounts?
    
-   Which protocols, ports, or services are exposed to the internet?
    
-   What is the network path between the source and destination?

## What is Cloud Network Analyzer?

Cloud Network Analyzer (CNA) in Cortex Cloud determines which assets are exposed to the internet, have unrestricted access to the internet, or can laterally move within a cloud account.

Cloud Network Analyzer (CNA) in Cortex Cloud determines which assets—such as virtual machines, databases, containers, and serverless functions—are exposed to the internet, have unrestricted access to the internet, or can laterally move within a cloud account.

CNA creates an internal network topology to map the path between the internet and the asset. This map provides insights about existing network security controls, including security groups and internet gateways.

CNA helps you identify the following:

-   Workloads exposed to access from the internet
    
-   Workloads that have unrestricted outbound access to the internet
    
-   Overly permissive security groups attached to sensitive workloads
    
-   Production applications connected to testing or staging environments between cloud accounts or VPCs
    
-   Object storage buckets with sensitive data exposed through network connectivity to external cloud accounts or networks
    
-   Kubernetes services exposed to access from the internet, their underlying endpoints, and associated deployments
    

### Detection capabilities: inbound, outbound, east-west

CNA supports inbound, outbound, and east-west exposure detection.

CNA detects which assets are exposed to the internet, have unrestricted access to the internet, or can laterally move within a cloud account. CNA supports three types of internet exposure detection:

-   **Inbound:** Data or requests entering your network from external sources
    
-   **Outbound:** Data or requests leaving your network to external destinations
    
-   **East-west:** Data or requests moving laterally within your network
    

Inbound exposure detection is referred to as “Internet exposure detection” in this documentation.

## Internet exposure detection

CNA detects assets that are exposed to unrestricted public network access. This is called internet exposure detection.

CNA detects assets that are exposed to unrestricted public network access. It uses three different methods to determine if an asset is exposed to the internet:

-   Checks whether a routing path exists from source to destination.
    
-   Verifies the effectiveness of all cloud-native network security policies in the path.
    
-   Checks inbound reachability from the internet.
    

When CNA identifies an asset that is potentially exposed to the internet, it requests confirmation from an external scanning service. After the external scan finishes, CNA publishes network exposure findings and issues, as well as an internal network topology to map the path between the internet and the asset. You can review this information and mitigate risks.

### External network scanning service

The external network scanning service works with CNA by performing a scan.

When CNA determines that an asset is potentially exposed to the internet, it forwards the public IP address or a fully qualified domain name (FQDN) to the external scanning service. The service verifies whether the IP or FQDN already exists in its database. If a match is found, the service notifies CNA and sends the additional information retrieved by the scan. The scan covers the entire internet rather than a subset of IP addresses owned by Cortex Cloud customers.

The following diagram illustrates what happens when CNA examines a virtual machine:

As illustrated in the diagram:

1.  CNA analyzes the network configuration and determines that the virtual machine is reachable from the internet.
    
2.  CNA passes the public IP address, FQDN, protocol, and port information to the external network scanning service.
    
3.  The external network scanning service confirms whether the asset’s public IP address or FQDN is reachable from the internet.
    
4.  If the virtual machine is exposed to the internet, CNA publishes findings and issues with additional information such as asset information, network path, and remediation guidance.
    

#### External scanning service details

The external network scanning service collects protocol, port, and server information.

The external network scanning service scans the entire internet CIDRs two times a day to identify assets that are exposed to the internet. The service is [CFAA](https://www.justice.gov/jm/jm-9-48000-computer-fraud) compliant and unintrusive. It establishes a session to each exposed IP address and collects the minimum amount of information required for CNA to validate the exposure.

The external network scanning service collects the following information:

| **Information type** | **Examples** |
| --- | --- |
| Protocol and port | tcp/80, tcp/443, tcp/22 |
| Server information (Service or daemon connected to an exposed port) | Apache, Microsoft IIS, OpenSSH |

If the exposed asset is a web service, the external network scanning service also collects HTTP server response code details. If an IP address or an FQDN does not respond to requests, the service retries in the next scanning cycle.

#### Scanned ports

The external network scanning service scans the following protocols and ports.

The external network scanning service scans the following protocols and ports.

The following list of ports and protocols is not exhaustive. For current and complete lists, contact your customer success team.

-   **Protocols:** FTS, FTP, HTTP, POP3, Postgres, RDP, SSH, SSL, TCP, Telnet, UDP, VNC, XMPP
    
-   **Ports:** 0, 20, 21, 22, 23, 25, 53, 67, 68, 80, 81, 82, 83, 88, 110, 111, 118, 123, 135, 137, 138, 139, 143, 161, 179, 389, 401, 443, 444, 445, 465, 500, 502, 554, 587, 593, 808, 873, 888, 943, 987, 990, 993, 995, 1000, 1024, 1025, 1026, 1028, 1112, 1234, 1250, 1433, 1434, 1443, 1521, 1717, 1723, 1900, 1911, 2001, 2002, 2078, 2080, 2082, 2083, 2084, 2085, 2086, 2087, 2096, 2121, 2160, 2161, 2222, 2323, 2443, 2483, 2484, 2525, 3000, 3052, 3306, 3333, 3388, 3389, 3390, 3443, 3493, 3905, 3909, 3917, 3929, 3975, 3978, 4002, 4100, 4117, 4172, 4343, 4430, 4433, 4443, 4444, 4500, 4506, 4567, 4786, 4911, 5000, 5001, 5060, 5061, 5222, 5269, 5351, 5353, 5432, 5443, 5555, 5632, 5800, 5900, 5901, 5902, 5903, 5904, 5905, 5906, 5907, 5908, 5909, 5910, 5916, 5984, 5985, 5986, 6001, 6002, 6363, 6379, 6443, 7001, 7080, 7170, 7443, 7547, 7777, 8000, 8005, 8008, 8009, 8010, 8015, 8020, 8080, 8081, 8082, 8083, 8085, 8088, 8090, 8094, 8139, 8140, 8159, 8194, 8195, 8196, 8197, 8198, 8209, 8210, 8211, 8212, 8213, 8214, 8215, 8216, 8217, 8218, 8219, 8220, 8282, 8290, 8291, 8292, 8293, 8294, 8333, 8443, 8444, 8530, 8531, 8800, 8880, 8887, 8888, 8899, 8991, 8999, 9000, 9002, 9042, 9080, 9091, 9092, 9100, 9200, 9418, 9443, 9444, 9595, 9983, 9997, 10000, 10010, 10443, 11211, 11495, 11553, 12345, 16010, 17185, 17516, 17778, 18080, 18574, 20249, 21242, 22460, 25789, 25827, 27017, 28080, 30005, 30006, 30010, 30083, 30303, 32400, 37443, 37777, 38080, 38520, 40000, 40005, 42713, 44344, 44818, 47001, 47693, 47808, 49501, 49502, 50001, 50067, 50070, 50580, 50805, 50995, 50996, 50997, 51005, 51007, 51200, 51401, 52200, 52311, 52590, 52869, 53300, 53524, 53631, 54041, 54498, 54528, 55918, 56222, 58000, 58603, 60000, 60243, 60443, 61337, 62078
    

##### External scan IP ranges

The external network scanning service uses the following IP ranges.

The external network scanning service uses the following IP ranges. Exclude these IP ranges from anti-scanning rules.

-   35.203.210.0/24
    
-   35.203.211.0/24
    
-   144.86.173.0/24
    
-   147.185.132.0/24
    
-   147.185.133.0/24
    
-   162.216.149.0/24
    
-   162.216.150.0/24
    
-   172.105.147.0/24
    
-   198.235.24.0/24
    
-   205.210.31.0/24
    

### Internet exposure rules

Cortex Cloud includes out-of-the box internet exposure rules and allows you to define custom internet exposure rules. See Create a Network Exposure Rule .

### Supported asset types

CNA detects internet exposure for the following cloud services and asset types.

CNA detects internet exposure for the following cloud services and asset types:

| **Provider/ Service** | **AWS** | **Azure** | **GCP** |
| --- | --- | --- | --- |
| **Managed virtual machines** | Amazon EC2 | Azure Virtual Machines | GCP Compute Instances |
| **Managed databases** | RDS; Redshift | Azure SQL; Azure Database for Postgresql; Azure Database for MySQL; Cosmos DB | – |
| **Serverless functions** | AWS Lambda | – | – |
| **Managed Kubernetes** | EKS (Services behind load balancer and ingress) | AKS (Services behind load balancer and ingress) | GKE (Services behind load balancer and ingress) |

CNA supports Kubernetes containers exposed to the internet behind a load balancer or behind an ingress.

### Internet exposure detection for Kubernetes services

CNA detects workloads exposed to the internet in Kubernetes clusters using Kubernetes configuration analysis and external scanning.

CNA detects workloads exposed to the internet in Kubernetes clusters using Kubernetes configuration analysis and external scanning. The workloads must meet these requirements:

-   Kubernetes clusters must be onboarded to Cortex Cloud as described in Onboard the Kubernetes Connector.Onboard the Kubernetes Connector
    
-   Managed Kubernetes offerings in AWS (EKS, ROSA), Azure (AKS, ARO), and GCP (GKE) are supported.
    
-   Supported workloads include ReplicaSet, Deployment, DaemonSet, StatefulSet, and CronJob.
    

A workload is considered reachable from the internet when the following criteria are met:

-   The Kubernetes workload is exposed behind a load balancer or an ingress.
    
-   Kubernetes network policies permit inbound traffic.
    

### Internet exposure detection for instances deployed behind a Palo Alto Networks Next-Generation firewall

CNA detects inbound exposure of workloads deployed behind a Palo Alto Networks Next-Generation firewall (NGFW).

CNA detects inbound exposure of workloads deployed behind a Palo Alto Networks Next-Generation firewall (NGFW). To scale security appliances in AWS, you can use Gateway Load Balancers (GWLBs) for "transparent" firewall deployments where AWS encapsulates/decapsulates traffic. This topology is considered isolated or distributed, since the firewall deployment is “embedded” within the VPC.

The following diagram illustrates a network topology supported by CNA:

The example network topology includes a single VPC where traffic to the target web server (top right) is forced to go through the GWLB (and thus through the NGFW VM-Series instances) to allow firewall inspection of the incoming and outgoing traffic. In a real-life scenario, there may be several firewall instances in the GWLB target group, however for brevity the diagram only shows one. The firewall EC2 instance itself (bottom right) is detected as a NGFW based on its image.

Cortex Cloud analyzes your VPC topology and verifies that it is similar to the one described in this example. Next, it verifies that the GWLB target group instances are NGFW VM-Series instances.

**Note:**

Currently, CNA supports only an isolated architecture with an [AWS Gateway Load Balancer](https://docs.paloaltonetworks.com/vm-series/10-2/vm-series-deployment/set-up-the-vm-series-firewall-on-aws/vm-series-integration-with-gateway-load-balancer) (GWLB) within a single VPC. Other more centralized topologies including one security VPC that forwards traffic to other workload VPCs are currently not supported.

## Outbound exposure detection

CNA supports outbound internet exposure detection, detecting workloads that based on their security configurations has unrestricted internet access.

CNA supports outbound internet exposure detection. If CNA detects a workload that based on their security configurations has unrestricted internet access, CNA generates a finding.

This helps you determine which assets have potentially unrestricted access to the internet, taking into account the effect of cloud native security controls, network firewalls and NAT gateways. It allows you to:

-   Visualize the complete network path of an asset from source to destination.
    
-   Periodically re-validate the status of an exposed asset.
    
-   Find which security group or firewall rule is causing the exposure.
    

### Outbound exposure rules

Outbound exposure rules do not have out of the box rules, but you can create custom ones. See Create a Network Exposure Rule.

### Supported asset types

CNA can detect outbound internet exposure in the following cloud services and asset types:

| **Provider/ Service** | **AWS** | **Azure** | **GCP** |
| --- | --- | --- | --- |
| **Managed virtual machines** | Amazon EC2 | – | – |

## East-west exposure detection

CNA supports east-west exposure detection, detecting workloads that have unrestricted access across their VPC in the same cloud account.

CNA supports east-west exposure detection. The east-west exposure detection capability allows CNA to detect VMs that have unrestricted access across their VPC in the same cloud account. This strengthens the visibility and security of your cloud environments by providing insights on which assets can access resources on different VPCs, namespaces, and cloud accounts. You can also find out details about an asset that is exposed to the internet, such as whether that asset can establish network sessions in violation of a compliance regulation.

This helps you determine which assets have potentially unrestricted access to the other internal resources, taking into account the effect of cloud native security controls, network firewalls, VPC peerings, and Kubernetes network security policies and transit gateways. This allows you to:

-   Visualize the complete network path of an asset from source to destination.
    
-   Periodically re-validate the status of an exposed asset.
    
-   Find the security group, Kubernetes network security policy, or firewall rule causing the exposure.
    

### East-west exposure rules

East-west exposure rules do not have out of the box rules, but you can create custom ones. See Create a Network Exposure Rule.

### Supported asset types

CNA can detect east-west exposure in the following cloud services and asset types:

| **Provider/ Service** | **AWS** | **Azure** | **Azure** |
| --- | --- | --- | --- |
| **Managed virtual machines** | Amazon EC2 | – | – |

## Investigate an internet exposure

You can investigate an internet exposure by navigating to Cases & Issues or using Graph Search.

You can investigate assets exposed to the internet by reviewing issues detected by Cloud Network Analyzer or by using Graph Search.

### Investigate internet exposure issues

investigate assets exposed to the internet by navigating to Cases & Issues.

Review internet exposure issues to learn which assets are exposed to the internet. You can find internet exposure issues under **Cases & Issues**.

1.  Go to **Cases & Issues**.
    
2.  Select the **Detection Method** filter and then select the **Cloud Network Analyzer** as the **Detecting Engine**.
    
3.  Select a specific issue to investigate. You can review:
    
    -   Affected asset
        
    -   Policy that triggered the exposure
        
    -   Exposure details (Public IP, FQDN, protocol, port, and HTTPs response code)
        
    -   Exposure path
        
    
4.  From an issue, you can navigate to a specific affected asset and investigate further by clicking on the **Network** tab. The Network tab provides in-depth visibility over specific network details and internal network reachability:
    
    **Note:**
    
    The Network tab is currently only available for virtual machines.
    
    **Note:**
    
    The Network tab is only displayed when you have access to the main asset and associated ones, such as security groups, VPCs and subnets. For more information on Scope-Based Access Control (SBAC) for configuring granular scoping, see Manage user scope.Manage user scope
    
    -   **Networking Details:** Access details such as where the VM is deployed, connected subnets, and associated network security controls. Review a visual representation of the asset and all the private IPs connected to it.
        
    -   **Networking Security Rules:** An interface to investigate the network rules associated with the asset.
        
    

### Investigate internet-exposed assets using Graph Search

Use Graph Search to investigate assets exposed to the internet.

You can use What is Graph Search? to search for and investigate internet-exposed assets.What is Graph Search?

1.  Go to Investigation and Response → Search → Query Builder → Graph Search.
    
2.  Define a query that finds selected assets where Internet Exposed = True:
    
    1.  Select one or more specific asset types that are supported by CNA exposure detection, such as a Virtual Machine or a Kubernetes Workload.
        
    2.  Add a condition WHERE Internet Exposed = True.
        
    
3.  Click Search.
    
4.  Click on an object and then click on View Details to view details of the asset.
    
5.  Investigate further by clicking on the Network tab. The Network tab provides in-depth visibility over specific network details and internal network reachability:
    
    **Note:**
    
    The Network tab is currently only available for virtual machines.
    
    **Note:**
    
    The Network tab is only displayed when you have access to the main asset and associated ones, such as security groups, VPCs and subnets. For more information on Scope-Based Access Control (SBAC) for configuring granular scoping, see Manage user scope.Manage user scope
    
    -   **Networking Details:** Access details such as where the VM is deployed, connected subnets, and associated network security controls. Review a visual representation of the asset and all the private IPs connected to it.
        
    -   **Networking Security Rules:** An interface to investigate the network rules associated with the asset.
