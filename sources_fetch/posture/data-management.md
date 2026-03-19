# Data management

## Broker VM

Set up a Broker VM to establish a secure connection in which you can route your endpoints, and collect and forward logs and files for analysis.

Set up and configure the Broker VM to create a secure connection for routing endpoints, collecting logs, and forwarding logs and files for analysis.  Learn how to manage the Broker VM, and implement it within a high availability (HA) cluster setup.

### What is the Broker VM?

Learn about the Cortex Cloud Broker virtual machine (VM) and why use it in your network configuration.

The Palo Alto Networks Broker VM is a secured virtual machine, integrated with Cortex Cloud, that bridges your network and Cortex Cloud. By setting up the Broker VM, you establish a secure connection in which you can route your endpoints, collect logs, and forward logs and files for analysis.

Cortex Cloud can leverage the Broker VM to run different services separately using the same Palo Alto Networks authentication. After you complete the initial setup, the Broker VM automatically receives updates and enhancements from Cortex Cloud, providing you with new capabilities without having to install a new VM or manually update the existing VM.

**Note:**

The Broker VM is a closed, hardened appliance. To maintain its security integrity and performance standards, third-party agents cannot be installed on the Broker VM.

### Set up and configure Broker VM

Learn more about how to set up and configure a Broker VM as a standalone broker or add the broker to a high availability (HA) cluster.

You can set up a standalone Broker VM or add a Broker VM to a High Availability (HA) cluster to prevent a single point of failure. For more information, see Broker VM High Availability Cluster.

#### Setup

To set up the Broker virtual machine (VM), you need to deploy an image created by Palo Alto Networks on your network or supported cloud infrastructure and activate the available applications. You can set up several Broker VMs for the same tenant to support larger environments. Ensure each environment matches the necessary requirements.

#### Requirements

Before you set up the Broker VM, verify you meet the following requirements:

Hardware

For standard installation, use a minimum of a 4-core processor, 8 GB RAM, and 512 GB disk.

-   If you only intend to use the Broker VM for the agent proxy, you can use a 2-core processor.
    
-   If you intend to use the Broker VM for the agent installer and content caching, you must use a minimum of an 8-core processor and increase the disk space allocated for data storage to 1024 GB. For more information, see Increase Broker VM storage allocated for data caching.
    

**Note:**

The Broker VM comes with a 512 GB disk. Therefore, deploy the Broker VM with thin provisioning, meaning the hard disk can grow up to 512 GB but will do so only if needed.

Bandwidth

Bandwidth is higher than 10 mbit/s.

When the Broker VM is collecting data, the optimal outgoing bandwidth into the Cortex Cloud server should be about 25% of the incoming data traffic into the Broker VM applets.

**Important:**

There can be instances in which the Broker VM requires up to 50% of the incoming bandwidth as outgoing. Such instances can be, network instability between the Broker VM and Cortex Cloud, or data that is being collected, but not well compressed.

Virtual machine compatibility

Ensure that your virtual machine (VM) is compatible with one of the following options and install the applicable broker image according to the installation steps provided:

| Infrastructure | Image Type | Broker Image Installation |
| --- | --- | --- |
| Alibaba Cloud | QCOW2 | Set up Broker VM on Alibaba Cloud |
| Amazon Web Services (AWS) | VMDK | Set up Broker VM on Amazon Web Services |
| Google Cloud Platform | VMDK | Set up Broker VM on Google Cloud Platform (GCP) |
| KVM | QCOW2 | Set up Broker VM on KVM using Ubuntu |
| Microsoft Azure | VHD (Azure) | Set up Broker VM on Microsoft Azure |
| Microsoft Hyper-V 2012 | VHD | Hyper-V 2012 or later Set up Broker VM on Microsoft Hyper-V |
| Nutanix Hypervisor | QCOW2 | Nutanix AHV 10.3 or later Set up Broker VM on Nutanix Hypervisor |
| VMware ESXi | OVA | VMware ESXi 6.5 or later Set up Broker VM on VMware ESXi using vSphere Client |

Communication between services and applications

Enable communication between the Broker Service, and other Palo Alto Networks services and applications.

**Important:**

The internal network for the Broker VM must be unique and reserved. Other devices should not use the same IP as the Broker VM internal network as it can lead to communication issues with the Broker VM.

| FQDN, Protocol, and Port | Description |
| --- | --- |
| (Default) **`time.google.com`**; **`pool.ntp.org`** UDP port 123 | Broker's NTP server used for broker registration and communication encryption. The Broker VM provides default servers you can use, or you can define an NTP server of your choice. |
| **``br-_`<XDR tenant>`_.xdr.<region>.paloaltonetworks.com``** HTTPS over TCP port 443 | Broker Service server depending on the region of your deployment, such as **`us`** or **`eu`**. |
| **`distributions.traps.paloaltonetworks.com`** HTTPS over TCP port 443 | Information needed to communicate with your Cortex Cloud tenant. Used by tenants deployed in all regions. |
| **``br-_`<xdr-tenant>`_.xdr.federal.paloaltonetworks.com``** HTTPS over TCP port 443 | Broker Service server for Federal (US Government) deployment. |
| **`distributions-prod-fed.traps.paloaltonetworks.com`** HTTPS over TCP port 443 | Used by tenants with Federal (US Government) deployment |
| From Broker VM version 19.x.x and later, you can navigate to the following URL to open the Broker VM web console: **`https://<broker_vm_ip_address>.:4443`** HTTPS over TCP port 4443 | Broker VM web console \*\*Note:\*\* When DHCP is not enabled in your network and there isn't an IP address for your Broker VM, configure the Broker VM with a static IP using the serial console menu. |

Enable access to Cortex Cloud

Enable access to Cortex Cloud from the Broker VM to allow communication between agents and collectors and Cortex Cloud. The Broker VM communicates with the Cortex Cloud tenant with TLS 1.2 (or higher, if that applies).

**Important:**

If you use SSL decryption in your firewalls and proxies, see the Understanding CA certificate functionality in Broker VM deployments section below. In addition, verify that the proxies used support HTTP/2, gRPC-specific headers, and HTTP/2 trailers, and the inspection policies support gRPC traffic. Any devices that you use with this configuration should also support these standards.

When adding a CA certificate to the broker is not possible, ensure that you’ve added the Broker Service FQDNs to the SSL Decryption Exclusion list on your firewalls. For more information on adding a trusted self-signed certificate authority, see Update the Trusted CA Certificate for the Broker VM in Task 1. Configure the Broker VM settings.

#### Understanding CA certificate functionality in Broker VM deployments

The Broker VM utilizes a CA certificate to establish trust with intermediary network devices, such as firewalls performing SSL/TLS decryption, positioned between the Broker VM and the tenant environment. Failure of the Broker VM to validate the certificate presented by an intermediate network component results in the termination of the SSL/TLS connection.

This CA certificate is optional to configure depending on your system configurations and helps provide more flexibility in securing communications between the Broker VM and the tenant according to your preferences and network topology. Specifically, it can help facilitate all communication between the Broker VM and tenant, such as the following:

-   Broker VM configuration: Secure transmission of configuration parameters.
    
-   Broker VM upgrades: Authenticated delivery and execution of upgrade packages.
    
-   Metric Uploads: Encrypted and authenticated transfer of operational metrics to the tenant.
    

**Note:**

-   When configuring a Local Agent Settings applet with installer and content caching, you need to configure an SSL certificate for the Broker VM as explained in the task below. For more information on specific requirements for the Local Agent Settings applet, see Activate Local Agent Settings.
    
-   Keep in mind that several Broker VM applets, such as the Syslog Collector and Kafka Collector, have their own dedicated CA certificate bundle.
    

#### Initial Setup

Perform the following procedures in the order listed below.

**Note:**

When a Broker VM is disconnected for more than 30 days, it will have to go through a re-registration process.

##### Task 1. Generate a token for your broker

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  Click Add Broker → Generate Token, and copy to your clipboard. The token is valid for 24 hours. A new token is generated each time you select Generate Token.
    
    You'll paste this token after configuring settings and the Broker VM is registered in Task 2. Register your Broker VM.
    

##### Task 2. Open the Broker VM URL

Depending on the Broker VM version, navigate to either of the following URLs:

-   From Broker VM version 19.x.x and later: **`https://<broker_vm_ip_address>.:4443`**
    
-   From Broker VM version 18.x.x and earlier: **`https://<broker_vm_ip_address>/`**
    

**Note:**

When DHCP is not enabled in your network and there isn't an IP address for your Broker VM, configure the Broker VM with a static IP using the serial console menu.

##### Task 3. Log in and set a new password

Log in with the default password **`!nitialPassw0rd`**, and then define your own unique password. The password must contain a minimum of eight characters, contain letters and numbers, and at least one capital letter and one special character.

#### How to configure Broker VM settings

Perform the following procedures in the order listed below.

##### Task 1. Configure the Broker VM settings

1.  Define the network interfaces settings.
    
    Review the pre-configured Name, IP address, and MAC Address, and select the Address Allocation: DHCP (default) or Static. If you choose Static, define the static IP address, Netmask, Default Gateway, and DNS Server settings, and then save your configurations.
    
    **Important:**
    
    When configuring more than one network interface, ensure that only one Default Gateway is defined. The rest must be set to `0.0.0.0`, which configures them as undefined. In addition, we recommend assigning each network interface to a different subnet, as oppose to configuring two interfaces on the same subnet which can potentially cause unexpected behavior.
    
    You can also specify which of the network interfaces is designated as the Admin and can be used to access the Broker VM web interface. Only one interface can be assigned for this purpose from all of the available network interfaces on the Broker VM, and the rest should be set to Disable.
    
2.  (Optional) Set the internal network settings (requires Broker VM 14.0.42 and later).
    
    Specify a network subnet to avoid the Broker VM dockers colliding with your internal network. By default, the Network Subnet is set to `172.17.0.1/16`.
    
    **Important:**
    
    Internal IP must be:
    
    -   Formatted as **`prefix/mask`**, for example **`192.0.2.1/24`**.
        
    -   Must be within `/8` to `/24` range.
        
    -   Cannot be configured to end with a zero.
        
    
    For Broker VM version 9.0 and earlier, Cortex Cloud will only accept `172.17.0.0/16`.
    
3.  (Optional) Configure a proxy server address and other related details to route Broker VM communication.
    
    1.  Select the proxy Type as HTTP, SOCKS4, or SOCKS5.
        
        For any proxy selected, you must ensure the proxy supports HTTP/2, gRPC-specific headers, and HTTP/2 trailers, and the inspection policies support gRPC traffic. Any devices that you use with this configuration should also support these standards.
        
        **Note:**
        
        You can configure another Broker VM as a proxy server for this Broker VM by selecting the HTTP type. When selecting HTTP to route Broker VM communication, you need to add the IP Address and Port number (set when activating the Agent Proxy) for another Broker VM registered in your tenant. This designates the other Broker VM as a proxy for this Broker VM.
        
    2.  Specify the proxy Address (IP or FQDN), Port, and an optional User and Password. Select the pencil icon to specify the password. Avoid using special characters in the proxy username and password.
        
    3.  Save your configurations.
        
4.  (Optional) Configure your NTP servers (requires Broker VM 8.0 and later).
    
    Specify the required server addresses using the FQDN or IP address of the server.
    
5.  (Optional) Allow SSH connections to the Broker VM (Requires Broker VM 8.0 and later).
    
    **Important:**
    
    -   We strongly recommend disabling SSH connectivity when it's not being used. Therefore, activate SSH connectivity when it's needed and disable it right afterwards.
        
    -   When generating a new SSH key ensure to avoid embedding the domain-style username, by not using any backslashes (`\`) in the comment field, to ensure the SSH key passes validation.
        
    
    Enable or disable SSH connections to the Broker VM. SSH access is authenticated using a public key, provided by the user. Using a public key grants remote access to colleagues and Cortex Cloud support who need the private key. You must have Instance Administrator role permissions to configure SSH access.
    
    To enable connection, generate an RSA Key Pair, and enter the public key in the SSH Public Key section. Once one SSH public key is added, you can Add Another. When you are finished, Save your configuration.
    
    When using PuTTYgen to create your public and private key pairs, you need to copy the public key generated in the Public key for pasting into OpenSSH authorized_keys file box, and paste it in the Broker VM SSH Public Key section as explained above. This public key is only available when the PuTTYgen console is open after the public key is generated. If you close the PuTTYgen console before pasting the public key, you will need to generate a new public key.
    
    When you SSH the Broker VM using PuTTY or a command prompt, you need to use the **`admin`** username. For example:
    
    ```
    ssh -i [/path/to/private.key] admin@[broker_vm_address]
    ```
    
6.  (Optional) Update the SSL Server certificates for the Broker VM.
    
    Upload your signed server certificate and key to establish a validated secure SSL connection between your endpoints and the Broker VM. Ensure the Private Key is uploaded in an unencrypted format. When you configure the server certificate and the key files in the Broker VM, Cortex Cloud automatically updates them in the tenant UI. Cortex Cloud validates that the certificate and key match, but does not validate the Certificate Authority (CA).
    
    **Note:**
    
    The Palo Alto Networks Broker VM supports only strong cipher SHA256-based certificates. MD5/SHA1-based certificates are not supported.
    
7.  Update the Trusted CA Certificate for the Broker VM.
    
    Upload your Certificate Authority (CA) bundle file associated with the public TLS certificates belonging to the applicable firewalls, and click Save. These applicable firewalls include SSL/TLS decryption. For example, when [configuring Palo Alto Networks NGFW to decrypt SSL](https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClmyCAC) using a self-signed certificate, you need to ensure the Broker VM can validate a self-signed CA by uploading the `cert_ssl-decrypt.crt` file on the Broker VM.
    
    **Note:**
    
    -   If adding a CA certificate to the Broker VM is not possible, ensure that you’ve added the Broker Service FQDNs to the SSL Decryption Exclusion list on your firewalls. See Enable Access to Cortex XDR.
        
    -   If you need to enable legacy SSL renegotiation, use the Broker VM Serial console.
        
    
8.  (Optional) Configure the advanced settings of the Broker VM.
    
    -   Only use recommended cipher suites: Select this to use a limited set of strong cipher suites for Broker VM communications. You must enable this option to comply with Spain's Esquema Nacional de Seguridad (ENS) National Security Framework. It is critical that you configure this option before you register the Broker VM with a tenant for compliance reasons.
        
    
9.  (Optional) Collect and Generate New Logs (Requires Broker VM 8.0 and later). Your Cortex Cloud logs will download automatically after approximately 30 seconds.
    

##### Task 2. Register your Broker VM

Register and enter your unique Token, created in the Broker VMs page. This can take up to 30 seconds.

After a successful registration, Cortex Cloud displays a notification.

You are directed to Settings → Configurations → Data Broker → Broker VMs. The Broker VMs page displays your Broker VM details and allows you to edit the defined configurations.

**Note:**

If you need to enable legacy SSL renegotiation, use the Broker VM Serial console.

#### Broker VM image installations

Learn more about the Broker VM image types available that are compatible with your viirtual machine (VM).

Ensure that your virtual machine (VM) is compatible with one of the following options and install the applicable broker image according to the installation steps provided:

| Infrastructure | Image Type | Broker Image Installation |
| --- | --- | --- |
| Alibaba Cloud | QCOW2 | Set up Broker VM on Alibaba Cloud |
| Amazon Web Services (AWS) | VMDK | Set up Broker VM on Amazon Web Services |
| Google Cloud Platform | VMDK | Set up Broker VM on Google Cloud Platform (GCP) |
| KVM | QCOW2 | Set up Broker VM on KVM using Ubuntu |
| Microsoft Azure | VHD (Azure) | Set up Broker VM on Microsoft Azure |
| Microsoft Hyper-V 2012 | VHD | Hyper-V 2012 or later Set up Broker VM on Microsoft Hyper-V |
| Nutanix Hypervisor | QCOW2 | Nutanix AHV 10.3 or later Set up Broker VM on Nutanix Hypervisor |
| VMware ESXi | OVA | VMware ESXi 6.5 or later Set up Broker VM on VMware ESXi using vSphere Client |

##### Set up Broker VM on Microsoft Azure

Learn how to set up your Cortex Cloud Broker virtual machine (VM) on Microsoft Azure.

After you download your Cortex Cloud Broker VHD (Azure) image, you need to upload it to Azure as a storage blob.

**Prerequisite:**

Download a Cortex Cloud Broker VM VHD (Azure) image. For more information, see the virtual machine compatibility requirements in Set up and configure Broker VM.

Perform the following procedures in the order listed below.

###### Task 1. Extract the downloaded VHD (Azure) image

Make sure you extract the zipped hard disk file on a server that has more then 512 GB of free space.

**Note:**

Extraction can take up to a few hours.

###### Task 2. Create a new storage blob on your Azure account by uploading the VHD file

Upload from Microsoft Windows or Ubuntu.

Windows

1.  Verify you have:
    
    -   Windows PowerShell version 5.1 or later.
        
    -   .NET Framework 4.7.2 or later.
        
    
2.  Open PowerShell and run `Set-ExecutionPolicy unrestricted`.
    
    -   `[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12`
        
    -   `Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201-Force`
        
    
3.  Install `azure cmdlets`.
    
    `Install-Module -Name Az -AllowClobber`
    
4.  Connect to your Azure account.
    
    `Connect-AzAccount`
    
5.  Start the upload.
    
    -   For Azure PowerShell:
        
        ```
        Set-AzStorageBlobContent -Container $containerName -File $localFilePath -Context $storageContext -BlobType Page
        ```
        
    -   For Azure CLI:
        
        ```
        az storage blob upload -f <vhd to upload> -n <vhd name> -c <container name> --account-name <account name>
        ```
        
    
    **Note:**
    
    Upload can take up to a few hours.
    

Linux

1.  Install Azure util.
    
    There are two different ways to install the Azure util.
    
    **Note:**
    
    For more information, see the [Azure Documentation](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-linux?view=azure-cli-latest&pivots=apt).
    
    -   Option 1:
        
        ```
        curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
        ```
        
    -   Option 2:
        
        1.  Get the packages needed for the installation process:
            
            ```
            sudo apt-get update
            sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release
            ```
            
        2.  Download and install the Microsoft signing key:
            
            ```
            sudo mkdir -p /etc/apt/keyrings
            curl -sLS https://packages.microsoft.com/keys/microsoft.asc |
              gpg --dearmor | sudo tee /etc/apt/keyrings/microsoft.gpg > /dev/null
            sudo chmod go+r /etc/apt/keyrings/microsoft.gpg
            ```
            
        3.  Add the Azure CLI software repository:
            
            ```
            AZ_DIST=$(lsb_release -cs)
            echo "Types: deb
            URIs: https://packages.microsoft.com/repos/azure-cli/
            Suites: ${AZ_DIST}
            Components: main
            Architectures: $(dpkg --print-architecture)
            Signed-by: /etc/apt/keyrings/microsoft.gpg" | sudo tee /etc/apt/sources.list.d/azure-cli.sources
            ```
            
        4.  Update repository information and install the `azure-cli` package:
            
            ```
            sudo apt-get update
            sudo apt-get install azure-cli
            ```
            
        
    
2.  Connect to Azure.
    
    `az login`
    
3.  Start the upload.
    
    `az storage blob upload -f <vhd to upload> -n <vhd name> -c <container name> --account-name <account name>`
    

###### Task 3. Add and configure a new disk in Azure

1.  In the Azure home page, navigate to Azure services → Disks and Add a new disk.
    
2.  Navigate to the Create a managed disk → Basics page, and define the following information:
    
    Read more...
    
    | Heading | Parameter |
    | --- | --- |
    | Project details | Resource group: Select your resource group. |
    | Disk details | Disk name: Enter a name for the disk object. |
    | Region: Select your preferred region. |
    | Source type: Select **`Storage Blob`**. Additional fields are displayed, which you can define as follows: Source blob: Read more...-   Select Browse. You are directed to the Storage accounts page.; From the navigation panel, select the bucket and then container to which you uploaded the Cortex Cloud VHD image.; In the Container page, Select your VHD image.
    ; OS type: Select Linux; VM generation: Select Gen 1 |
    
3.  Check you settings by clicking Review + create.
    

###### Task 4. Create the Broker VM disk

1.  Create your Broker VM disk, and after deployment is complete, click Go to resource.
    
2.  In your created Disks page, click Create VM.
    
3.  In the Create a virtual machine page, define the following:
    
    Configuration steps:
    
    | Heading | Parameter |
    | --- | --- |
    | Instance details | (Optional) Virtual machine name: Enter the same name as the disk name you defined. |
    | Size: Select the size according to your company guidelines. Select Next to navigate to the Networking tab. |
    | Network interface | NIC network security group: Select Advanced. |
    | Configure network security group: Select HTTPS to be able to access the Broker VM Web UI, and SSH to allow for remote access when troubleshooting. Make sure to allow these connection to the Broker VM from secure networks only. |
    
4.  To check your settings, click Review + create.
    
5.  Create your VM.
    
    After deployment is complete, click Go to resource. You are directed to your VM page.
    
    **Note:**
    
    Creating the VM can take up to 15 minutes. The Broker VM Web UI is not accessible during this time.
    
6.  Ensure that the VM you created contains an Outbound port rule that allows the broker to reach the Azure Instance Metadata Service using the IP address `169.254.169.254` and port `80`. For more information about the Azure Instance Metadata Service, see the [Azure Documentation](https://learn.microsoft.com/en-us/azure/virtual-machines/instance-metadata-service?tabs=windows).
    
    To configure an outbound rule on your VM, select Networking → Network settings, and under the Rules → Outbound port rules section, you can either:
    
    **Note:**
    
    For more information on creating a rule in an Azure VM, see [Create a Security Rule](https://learn.microsoft.com/en-us/azure/virtual-network/manage-network-security-group?tabs=network-security-group-portal#create-a-security-rule) in the Azure Documentation.
    
    -   Configure a new outbound port rule by selecting Create port rule → Outbound port rule and setting the following settings in the Add outbound security rule dialog box:
        
        -   Destination: Select IP Addresses.
            
        -   Destination IP addresses/CIDR ranges: Enter the IP address as `169.254.169.254`.
            
        -   Destination port ranges: Enter the port as `80`.
            
        -   Protocol: Select TCP.
            
        -   Name: Enter a unique name for this new outbound port rule, such as AzureInstanceMetadataService.
            
        
        Click Add to create the new outbound port rule.
        
    -   Edit an existing outbound port rule and ensure that the settings provided above for creating a new outbound port rule match what is already configured in the rule.

##### Set up Broker VM on Alibaba Cloud

Learn how to set up your Cortex Cloud Broker virtual machine (VM) on Alibaba Cloud.

After you download your Cortex Cloud Broker virtual machine (VM) QCOW2 image, you need to upload it to Alibaba Cloud. Since the image file is larger than 5G, you need to download the `ossutil` utility file provided by Alibaba Cloud to upload the image.

**Prerequisite:**

Download a Cortex Cloud Broker VM QCOW2 image. For more information, see the virtual machine compatibility requirements in Set up and configure Broker VM.

Perform the following procedures in the order listed below.

###### Task 1. Download the `ossutil` utility file provided by Alibaba Cloud

The download is dependent on the operating system and infrastructure you are using.

-   Alibaba Cloud supports using the following operating systems for the utility file: Windows, Linux, and macOS.
    
-   Supported architectures: x86 (32-bit and 64-bit) and ARM (32-bit and 64-bit)
    

For more information on downloading the utility, see the [Alibaba Cloud documentation](https://www.alibabacloud.com/help/doc-detail/120075.htm?spm=a2c63.p38356.879954.4.4a3265d0RjYjwJ#concept-303829).

###### Task 2. Upload the image file to Alibaba Cloud using the utility file you downloaded

The command is dependent on the operating system and architecture you are using. Below are a few examples of the commands to use based on the different operating systems and architectures, which you may need to modify based on your system requirements.

Linux (using CLI)

-   Format
    
    ```
    ./ossutil64 cp Downloads/<name of Broker VM QCOW2 image> oss://<directory name>/<file name for uploaded image>
    ```
    
-   Example
    
    ```
    ./ossutil64 cp Downloads/QCOW2_broker-vm-14.0.1.qcow2 oss://kvm-images-qcow2/Cortex Cloud
                                           -broker-vm-14.0.1.qcow2
    ```
    

macOS (using CLI)

-   Format
    
    ```
    ./ossutilmac64 cp Downloads/<name of Broker VM QCOW2 image oss://<directory name>/<file name for uploaded image>
    ```
    
-   Example
    
    ```
    ./ossutilmac64 cp Downloads/QCOW2_broker-vm-14.0.1.qcow2 oss://kvm-images-qcow2/Cortex Cloud
                                           -broker-vm-14.0.1.qcow2
    ```
    

Windows (using CMD)

-   Format for 64-bit
    
    ```
    D:\\ossutil>ossutil64.exe cp Downloads\\<name of Broker VM QCOW2 image> oss://<directory name>/<file name for uploaded image>
    ```
    
-   Example for 64-bit
    
    ```
    D:\\ossutil>ossutil64.exe cp Downloads\\QCOW2_broker-vm-14.0.1.qcow2 oss://kvm-images-qcow2/Cortex Cloud
                                           -broker-vm-14.0.1.qcow2
    ```
    

**Note:**

For Linux and Windows uploads, you can use Alibaba Cloud’s graphical management tool called [ossbrowser](https://partners-intl.aliyun.com/help/doc-detail/209974.htm?spm=a2c63.p38356.b99.270.7ae22454encexz).

###### Task 3. Create the image file in the Alibaba Cloud format

1.  Open the [Alibaba Cloud console](https://homenew-intl.console.aliyun.com/).
    
2.  Select Hamburger menu → Object Storage Service → <directory name>, where the <directory name> is the directory you configured when uploading the image. For example, in the step above the <directory name> used in the examples provided is kvm-images-qcow2.
    
    **Note:**
    
    The Object Storage Service must be created in the same Region as the image of the virtual machine.
    
3.  From the list of images displayed, find the row for the Broker VM QCOW2 image that you uploaded, and click View Details.
    
4.  In the URL field of the View Details right-pane displayed, copy the internal link for the image in Alibaba cloud. The URL that you copy ends with .com and you should not include any of the text displayed after this.
    
5.  Select Hamburger menu → Elastic Compute Service → Instances & Images → Images.
    
6.  In the Import Images area on the Images page, click Import Images.
    
7.  In the Import Images window, set the following parameters:
    
    -   OSS Object Address: This field is a combination of the internal link that you copied for the Broker VM image and the file name for the uploaded image, using this format <internal link>/<file name for uploaded image>. Paste the internal link for the Broker VM QCOW2 image in Alibaba Cloud that you copied, and add the following text after the .com: /<file name for uploaded image>.
        
    -   Image Name: Specify a name for the image.
        
    -   Operating System/Platform: Leave Linux configured and change CentOS to Ubuntu.
        
    -   System Architecture: Leave the default x86_64 selected.
        
    -   Leave the rest of the fields as defined by the default or change them according to your system requirements.
        
    
8.  Click OK.
    
    A notification is displayed indicating that image was imported successfully. Once the Status for the imported image in the Images page changes to Available, you will know the process is complete. This can take a few minutes.
    

###### Task 4. Create a new VM in Alibaba Cloud

1.  Select Hamburger menu → Elastic Compute Service → Instances & Images → Instances.
    
2.  Create Instance to open a wizard to define the VM machine.
    
3.  Define the Basic Configurations screen by setting these parameters:
    
    Read more...
    
    -   Billing Method: Select the applicable billing method according to your system requirements.
        
    -   Region: Ensure the Region selected is the same as the OSS Object Address.
        
    -   Instance Type: Set these settings according to your system requirements.
        
    -   Selected Instance Type Quantity: Set these settings according to your system requirements.
        
    -   Image: Select Custom Image, and in the field select the image that you imported to Alibaba Cloud.
        
    -   Storage (Optional): Set these settings according to your system requirements.
        
    -   Snapshot (Optional): Set these settings according to your system requirements.
        
    
4.  Click Next.
    
5.  Define the Networking screen by setting these parameters:
    
    Read more...
    
    -   Network Type: Select the applicable Network Type and update the field according to your system configuration.
        
    -   Public IP Address (Optional): Enable the instance to access the public network.
        
    -   Security Group: You must select a Security Group for setting network access controls for the instance. Ensure that port 22 and port 443 are allowed in the security group rules to access the Broker VM.
        
    -   Elastic Network Interface (Optional): Add an ENI according to you system requirements.
        
    
6.  Click Next.
    
7.  Define the System Configurations screen by setting these parameters:
    
    Read more...
    
    -   Logon Credentials: Select Inherit Password From Image.
        
    -   Instance Name: You can either leave the default instance name or specify a new name for the VM instance.
        
    -   Description (Optional): Specify a description for the VM instance.
        
    -   The rest of the fields are optional to configure.
        
    
8.  Click Next.
    
9.  (Optional) Define the Grouping screen according to your system requirements.
    
10.  Click Next.
     
11.  Review the Preview screen settings, select ECS Terms of Service and Product Terms of Service, and click Create Instance.
     
     A dialog box is displayed indicating that the VM instance has been created. Click Console to bring you back to the Instances page, where you can see the IP Address listed to connect to the VM instance.
     

###### Task 5. Reboot the Broker VM

Reboot the Broker VM before logging in for the first time.

##### Set up Broker VM on Amazon Web Services

Learn how to set up your Cortex Cloud Broker virtual machine (VM) on AWS.

After you download your Cortex Cloud Broker VMDK image, you can convert the image to an Amazon Web Services (AWS) Amazon Machine Image (AMI) using the AWS CLI. The task below explains how to do this on Linux.

**Prerequisite:**

-   Download a Cortex Cloud Broker VM VMDK image. For more information, see the virtual machine compatibility requirements in Set up and configure Broker VM.
    
-   You need to set up an AWS VM Import role (**`vmimport`**) before you continue with the steps to convert the image as it is required for the **`import-snapshot`** CLI command. You can use a different role, if the role **`vmimport`** doesn't exist or doesn't have the required permissions. You'll need an Administrator role or the necessary permissions to create these permissions. For more information on setting up an AWS VM Import role and the permissions required, see [Required service role](https://docs.aws.amazon.com/vm-import/latest/userguide/vmie_prereqs.html#vmimport-role).
    

To convert the image to AWS, perform the following procedures in the order listed below.

###### Task 1. Create an IAM User with Proper Permissions

You need to log in using an AWS Identity and Access Management (IAM) user, where the permissions are defined in the IAM policy to use the virtual machine Import and export.

1.  Log in to the [AWS IAM Console](https://console.aws.amazon.com/iam/home), and in the navigation pane, select Access Management → Users → Add Users.
    
2.  Select Access key - Programmatic access as the AWS credential type, and click Next: Permissions.
    
3.  Select Attach Existing Policies directly → Create Policy,
    
4.  In the JSON tab, copy and paste the following syntax to define the policy:
    
    ```
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "s3:GetBucketLocation",
            "s3:GetObject",
            "s3:PutObject"
          ],
          "Resource": ["arn:aws:s3:::mys3bucket","arn:aws:s3:::mys3bucket/\*"]
        },
        {
          "Effect": "Allow",
          "Action": [
            "ec2:CancelConversionTask",
            "ec2:CancelExportTask",
            "ec2:CreateImage",
            "ec2:CreateInstanceExportTask",
            "ec2:CreateTags",
            "ec2:DescribeConversionTasks",
            "ec2:DescribeExportTasks",
            "ec2:DescribeExportImageTasks",
            "ec2:DescribeImages",
            "ec2:DescribeInstanceStatus",
            "ec2:DescribeInstances",
            "ec2:DescribeSnapshots",
            "ec2:DescribeTags",
            "ec2:ExportImage",
            "ec2:ImportInstance",
            "ec2:ImportVolume",
            "ec2:StartInstances",
            "ec2:StopInstances",
            "ec2:TerminateInstances",
            "ec2:ImportImage",
            "ec2:ImportSnapshot",
            "ec2:DescribeImportImageTasks",
            "ec2:DescribeImportSnapshotTasks",
            "ec2:CancelImportTask"
          ],
          "Resource": "\*"
        }
      ]
    }
    ```
    
5.  Click Next until you can specify the Policy name, and then click Create Policy.
    
6.  Select the policy that you created above based on the syntax you added.
    
7.  Complete the user creation process.
    
8.  After confirmation that the user is created, record the following user information, which you will need later.
    
    -   User name
        
    -   Access key ID
        
    -   Secret access key
        
    

###### Task 2. Setup AWS CLI

You can run the AWS CLI commands using one of the two options below.

Option 1: AWS CloudShell (Recommended - No Installation)

AWS CloudShell is a browser-based shell that is pre-authenticated with your Console credentials.

1.  Log in to the AWS Management Console.
    
2.  Select the Region where your S3 bucket is located.
    
3.  Click the CloudShell icon () on the top navigation bar.
    

Option 2: External Terminal

Install the AWS CLI and configure it with the IAM user that you created.

1.  Login to the server with admin privilege and install the AWS CLI.
    
    ```
    # sudo bash
    # apt update
    # apt install awscli
    ```
    
2.  Run the following command to configure the AWS CLI:
    
    ```
    # aws configure
    ```
    
    You need to specify the proper configurations for the following:
    
    -   AWS Access Key ID: The Access key ID for the IAM user you created.
        
    -   AWS Secret Access Key: The Secret access key for the IAM user you created.
        
    -   Default region name: The Region where you've defined the IAM user you created.
        
    
    You are now ready to implement commands in the AWS CLI.
    

###### Task 3. Create an AMI Image

To create an AMI image, you need to download Broker VM VMDK file from the Cortex Cloud Web Console, import this file to your S3 bucket, and then convert the VMDK file to an AMI Image.

1.  In the Cortex Cloud Web Console , select Settings → Configurations → Data Broker → Broker VMs → Add Broker → VMDK.
    
2.  Download the VMDK file, such as **`broker-vm-<broker-vm-version>.vmdk`**, to your computer.
    
3.  Navigate and log in to your AWS account.
    
4.  In the AWS Console, navigate to Services → Storage → S3 → Buckets.
    
5.  In the S3 buckets page, \+ Create bucket to upload your Broker VM image to this bucket.
    
    Specify a unique name for the S3 bucket and use the default configurations.
    
6.  Upload the Broker VM VMDK you downloaded from Cortex Cloud to the AWS S3 bucket.
    
    Run
    
    `# aws s3 cp ~/<path/to/broker-vm-version.vmdk> s3://<your_bucket/broker-vm-version.vmdk>`
    
7.  Prepare the following configurations files on your hard drive.
    
    configuration.json
    
    1.  Run the following command in the terminal:
        
        ```
        # vi configuration.json
        ```
        
    2.  Copy and paste the following syntax into the json file.
        
        In S3Bucket, replace <your_bucket> with the Bucket Name and not its ARN Name. S3Key is the VMDK filename, which you should replace instead of <broker-vm-version.vmdk>.
        
        ```
        	{
        		"Description":"Cortex Cloud Broker VM <version>",
        		"Format":"vmdk",
        		"UserBucket":{
        			"S3Bucket":"<your_bucket>",
        			"S3Key":"<broker-vm-version.vmdk>"
        		}
        	}
        ```
        
    
    trust-policy.json
    
    1.  Run the following command in the terminal:
        
        ```
        # vi trust-policy.json
        ```
        
    2.  Copy and paste the following syntax into the json file.
        
        ```
        {
           "Version": "2012-10-17",
           "Statement": [
              {
                 "Effect": "Allow",
                 "Principal": { "Service": "vmie.amazonaws.com" },
                 "Action": "sts:AssumeRole",
                 "Condition": {
                    "StringEquals":{
                       "sts:Externalid": "vmimport"
                    }
                 }
              }
           ]
        }
        ```
        
    
    role-policy.json
    
    1.  Run the following command in the terminal.
        
        ```
        # vi role-policy.json
        ```
        
    2.  Copy and paste the following syntax into the json file. Replace the <disk-image-file-bucket> and <export-bucket> with the correct bucket name. You can specify \* to configure access to all your S3 buckets.
        
        ```
        {
           "Version":"2012-10-17",
           "Statement":[
              {
                 "Effect": "Allow",
                 "Action": [
                    "s3:GetBucketLocation",
                    "s3:GetObject",
                    "s3:ListBucket" 
                 ],
                 "Resource": [
                    "arn:aws:s3:::<disk-image-file-bucket>",
                    "arn:aws:s3:::<disk-image-file-bucket>/\*"
                 ]
              },
              {
                 "Effect": "Allow",
                 "Action": [
                    "s3:GetBucketLocation",
                    "s3:GetObject",
                    "s3:ListBucket",
                    "s3:PutObject",
                    "s3:GetBucketAcl"
                 ],
                 "Resource": [
                    "arn:aws:s3:::<export-bucket>",
                    "arn:aws:s3:::<export-bucket>/\*"
                 ]
              },
              {
                 "Effect": "Allow",
                 "Action": [
                    "ec2:ModifySnapshotAttribute",
                    "ec2:CopySnapshot",
                    "ec2:RegisterImage",
                    "ec2:Describe\*",
                    "ec2:ImportSnapshot", 
                    "ec2:DescribeImportSnapshotTasks"
                 ],
                 "Resource": "\*"
              }
           ]
        }
        ```
        
    
8.  Use the **`create-role`** command to create a role named **`vmimport`** and grant VM import and export access to the **`trust-policy.json`** file.
    
    `# aws iam create-role --role-name vmimport --assume-role-policy-document "file://trust-policy.json"`
    
9.  Use the **`put-role-policy`** command to attach the policy to the **`vmimport`** role created above.
    
    `# aws iam put-role-policy --role-name vmimport --policy-name vmimport --policy-document "file:// role-policy.json"`
    
10.  Create a snapshot from the VMDK file.
     
     Run the following command to start the import process:
     
     ```
     # aws ec2 import-snapshot --description "<Cortex Cloud Broker VM <Version>" --disk-container "file://configuration.json"
     ```
     
     To track the progress, use the task `id` value from the output and run:
     
     ```
     # aws ec2 describe-import-snapshot-tasks --import-task-ids import-snap-<task-id>
     ```
     
     Example 121. 
     
     Completed status output example:
     
     ```
     {
         "ImportSnapshotTasks": [
             {
                 "Description": "Broker VM <version> snapshot import",
                 "ImportTaskId": "import-snap-12346b69617c1395t",
                 "SnapshotTaskDetail": {
                     ...
                     "DiskImageSize": 2976817664.0,
                     "Format": "vmdk",
                     "SnapshotId": "snap-1234567890",
                     "Status": "completed",
                     "UserBucket": {
                         "S3Bucket": "broker-vm",
                         "S3Key": "broker-vm-<version>.vmdk"
                     }
                 },
                 "Tags": []
             }
         ]
     }
     ```
     
       
     
11.  Register the AMI from the snapshot.
     
     Once the `describe-import-snapshot-tasks` command shows a status of `completed`, a new Snapshot has been created in your account. You must now register this snapshot as an AMI.
     
     1.  Locate the snapshot ID.
         
         In the output of your completed task, find the `SnapshotId`, for example `snap-0123456789abcdef0`. Alternatively, you can find it in the AWS Console:
         
         1.  Navigate to Services → EC2
             
         2.  In the left sidebar, under Elastic Block Store, select Snapshots.
             
         3.  Locate the snapshot with the description you provided during the import.
             
     2.  Create the image from the snapshot.
         
         1.  Select the checkbox next to your snapshot.
             
         2.  Select Actions → Create image from snapshot.
             
     3.  Specify mandatory settings in the Create image from snapshot section.
         
         To ensure the Broker VM functions correctly, configure these settings in the following sections:
         
         -   Image settings
             
             -   Architecture: x86_64
                 
             -   Root device name: `/dev/sda1`
                 
             -   Virtualization type: Hardware-assisted virtualization
                 
             -   Boot mode: Legacy BIOS
                 
             
         -   Block device mappings - optional
             
             -   Size (GIB): `480GB`
                 
             -   Volume type: General Purpose SSD (gp3)
                 
             -   IOPS: `3000`
                 
             -   Throughput (MB/s): 125
                 
             
         
     
     Once the task is complete, the AMI Image is ready for use.
     
12.  (Optional) After the AMI image has been created, you can define a new name for the image.
     
     Select Services → EC2 → IMAGES → AMIs and locate your AMI image using the task ID. Select the pencil icon to specify a new name.
     

###### Task 4. Launch a Broker VM Instance in AWS EC2

You can launch the a Broker VM instance in AWS EC2 using the AMI Image created.

**Important:**

A t3.xlarge (16 GB RAM) is the lowest machine type that can be used as an instance type to meet the mandatory 4 vCPU requirement.

1.  To view the AMI image that you added, select Services → EC2 → Images → AMIs.
    
2.  Select EC2 → Instances, and click Launch instances to create an instance of the AMI image.
    
3.  In the Launch Instance Wizard define the instance according to your company requirements and Launch.
    
4.  (Optional) In the Instances page, locate your instance and use the pencil icon to rename the instance Name.
    
5.  Define HTTPS and SSH access (optional) to your instance.
    
    Right-click your instance, and select Networking → Change Security Groups.
    
    In the Change Security Groups pop-up, select HTTPS to be able to access the Broker VM Web UI, and SSH to allow for remote access when troubleshooting. Make sure to allow these connections to the Broker VM from secure networks only.
    
    **Note:**
    
    Assigning security groups can take up to 15 minutes.
    
6.  Verify the Broker VM has started correctly.
    
    Locate your instance, right-click, and select Instance Settings → Get Instance Screenshot.
    
    You are directed to your Broker VM console listing your Broker details.
    

###### Task 5. Register the Broker VM

Registration of the Broker VM to Cortex Cloud is performed from the Broker VM Web Console.

1.  Obtain a registration token from the Cortex Cloud Web Console by selecting Settings → Configurations → Data Broker → Broker VMs → Add Broker → Generate Token.
    
2.  Determine the IP Address of the EC2 instance and use it to open the Broker VM Web Console, such as **`https://<ip_address>:4443`**.
    
3.  Complete the registration process by entering the token information.

##### Set up Broker VM on Google Cloud Platform (GCP)

Learn more about how to set up your Cortex Cloud Broker VM on Google Cloud Platform.

You can deploy the Broker VM on Google Cloud Platform. The Broker VM allows communication with external services through the installation and setup of applets such as the Syslog collector applet.

To set up the Broker VM on the Google Cloud Platform, install the VMDK image provided in Cortex Cloud.

**Prerequisite:**

-   Download a Cortex Cloud Broker VM VMDK image. For more information, see the virtual machine compatibility requirements in Set up and configure Broker VM.
    
-   To complete the set up, you must have G Cloud installed and have an authenticated user account.
    

Perform the following procedures in the order listed below.

###### Task 1. Create a Google Cloud Storage bucket in G Cloud

From G Cloud, create a Google Cloud Storage bucket to store the Broker VM image.

1.  [Create a project in GCP](https://cloud.google.com/resource-manager/docs/creating-managing-projects) and enable Google Cloud Storage, for example, brokers-project. Make sure you have defined a default network.
    
2.  [Create a bucket](https://cloud.google.com/storage/docs/creating-buckets) to store the image, such as broker-vms.
    

###### Task 2. Set up the GCP project

Open a command prompt and run the following:

gcloud config set project _`<project-name>`_

###### Task 3. Upload the VMDK image to the Google Cloud Storage bucket

Upload the VMDK image to the bucket, run the following:

gsutil cp _`</path/to/broker.vmdk>`_ gs://_`<bucket-name>`_

###### Task 4. Import the GCP image

You can import the GCP image using either G Cloud CLI or Google Cloud console.

**Note:**

The import tool uses Cloud Build API, which must be enabled in your project. For the import to work, Cloud Build service account must have **`compute.admin`** and **`iam.serviceAccountUser`** roles. When using the Google Cloud console to import the image, you will be prompted to add these permissions automatically.

gcloud CLI

**Danger:**

Before importing a GCP image using the gcloud CLI, ensure that you update the Google Cloud components to version 371.0.0 and above using the following command:

```
gcloud components update
```

The following command uses the minimum required parameters. For more information on permissions and available parameters, refer to the [Google Cloud SDK](https://cloud.google.com/sdk/gcloud/reference/beta/compute/images/import).

Open a command prompt and run the following:

```
gcloud compute images import <VMDK image> --data-disk --source-file="gs://<image path>" --network=<network_name> --subnet=<subnet_name> --zone=<region> --async
```

###### Task 5. Create a new instance of the image

When the Google Compute completes the image creation, create a new instance.

1.  From the Google Cloud Platform, select Compute Engine → VM instances.
    
2.  Click Create instance.
    
3.  In the Boot disk option, choose Custom images and select the image you created.
    
4.  Set up the instance according to your needs.
    
    If you are using the Broker VM to facilitate only Agent Proxy, use e2-startdard-2. If you are using the Broker VM for multiple applets, use e2-standard-4.
    

###### Task 6. Allow the 4443 port in your firewall configuration by creating a firewall rule

1.  From the Google Cloud menu, select VPC network → Firewall, and click CREATE FIREWALL RULE.
    
2.  Set the following parameters for the rule:
    
    -   Name: Name of the rule.
        
    -   Network: Select the applicable network where the Broker VM resides.
        
    -   Direction of traffic: Select Ingress (default).
        
    -   Targets: Select All instances in the network.
        
    -   Source IPv4 ranges: Enter the IP network of computers that will be connecting to the Broker VM. To include all machines, enter `0.0.0.0/0`.
        
    -   TCP: Enter port 4443.
        
    
3.  Click CREATE.
    
    The rule is listed under VPC firewall rules.
    

###### Task 7. Verify that the firewall rule is assigned to the Broker VM

1.  From the Google Cloud menu, select Compute Engine → VM instances.
    
2.  For the specific Broker VM containing the rule, select the ellipse to display More actions, and select View network details.
    
3.  In the Firewall and routes details section, select the FIREWALLS tab.
    
4.  Verify that the firewall rule is listed.
    

You can now connect to the Broker VM web console using the Broker VM IP address. Connect with https over port 4443 using the format `https://<ip address>:4443`.

##### Set up Broker VM on KVM using Ubuntu

Learn set up your Cortex Cloud Broker virtual machine (VM) on a KVM using Ubuntu.

After you download your Cortex Cloud Broker virtual machine (VM) QCOW2 image, you need to upload it to a kernel-based Virtual Machine (KVM). The instructions below provide an example of doing this on the latest Ubuntu.

**Prerequisite:**

Download a Cortex Cloud Broker VM QCOW2 image. For more information, see the virtual machine compatibility requirements in Set up and configure Broker VM.

1.  Open your kernel-based Virtual Machine (KVM) on Ubuntu.
    
2.  Click the New VM icon () to open the Create a new virtual machine wizard.
    
3.  In the Step 1 screen of the wizard, select Import existing disk image, and click Forward.
    
4.  Define the Step 2 screen of the wizard:
    
    -   Provide the existing storage path:
        
        1.  Browse to the downloaded QCOW2 image file.
            
        2.  Click Browse Local, select the QCOW2 image file that you downloaded, and click Open.
            
        
    -   OS type: Leave the Generic option selected.
        
    -   Version: Leave the Generic option selected.
        
    
5.  Click Forward.
    
6.  Define the Step 3 screen of the wizard:
    
    -   Memory (RAM): Specify 8192 (8 GB) of memory.
        
    -   CPUs: Specify 4 CPUs.
        
    
7.  Click Forward.
    
8.  In the Step 4 screen of the wizard, set a Name for your new VM.
    
9.  Click Finish.
    
    You new VM is now listed and available to use.

##### Set up Broker VM on Microsoft Azure

Learn how to set up your Cortex Cloud Broker virtual machine (VM) on Microsoft Azure.

After you download your Cortex Cloud Broker VHD (Azure) image, you need to upload it to Azure as a storage blob.

**Prerequisite:**

Download a Cortex Cloud Broker VM VHD (Azure) image. For more information, see the virtual machine compatibility requirements in Set up and configure Broker VM.

Perform the following procedures in the order listed below.

###### Task 1. Extract the downloaded VHD (Azure) image

Make sure you extract the zipped hard disk file on a server that has more then 512 GB of free space.

**Note:**

Extraction can take up to a few hours.

###### Task 2. Create a new storage blob on your Azure account by uploading the VHD file

Upload from Microsoft Windows or Ubuntu.

Windows

1.  Verify you have:
    
    -   Windows PowerShell version 5.1 or later.
        
    -   .NET Framework 4.7.2 or later.
        
    
2.  Open PowerShell and run `Set-ExecutionPolicy unrestricted`.
    
    -   `[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12`
        
    -   `Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201-Force`
        
    
3.  Install `azure cmdlets`.
    
    `Install-Module -Name Az -AllowClobber`
    
4.  Connect to your Azure account.
    
    `Connect-AzAccount`
    
5.  Start the upload.
    
    -   For Azure PowerShell:
        
        ```
        Set-AzStorageBlobContent -Container $containerName -File $localFilePath -Context $storageContext -BlobType Page
        ```
        
    -   For Azure CLI:
        
        ```
        az storage blob upload -f <vhd to upload> -n <vhd name> -c <container name> --account-name <account name>
        ```
        
    
    **Note:**
    
    Upload can take up to a few hours.
    

Linux

1.  Install Azure util.
    
    There are two different ways to install the Azure util.
    
    **Note:**
    
    For more information, see the [Azure Documentation](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-linux?view=azure-cli-latest&pivots=apt).
    
    -   Option 1:
        
        ```
        curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
        ```
        
    -   Option 2:
        
        1.  Get the packages needed for the installation process:
            
            ```
            sudo apt-get update
            sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release
            ```
            
        2.  Download and install the Microsoft signing key:
            
            ```
            sudo mkdir -p /etc/apt/keyrings
            curl -sLS https://packages.microsoft.com/keys/microsoft.asc |
              gpg --dearmor | sudo tee /etc/apt/keyrings/microsoft.gpg > /dev/null
            sudo chmod go+r /etc/apt/keyrings/microsoft.gpg
            ```
            
        3.  Add the Azure CLI software repository:
            
            ```
            AZ_DIST=$(lsb_release -cs)
            echo "Types: deb
            URIs: https://packages.microsoft.com/repos/azure-cli/
            Suites: ${AZ_DIST}
            Components: main
            Architectures: $(dpkg --print-architecture)
            Signed-by: /etc/apt/keyrings/microsoft.gpg" | sudo tee /etc/apt/sources.list.d/azure-cli.sources
            ```
            
        4.  Update repository information and install the `azure-cli` package:
            
            ```
            sudo apt-get update
            sudo apt-get install azure-cli
            ```
            
        
    
2.  Connect to Azure.
    
    `az login`
    
3.  Start the upload.
    
    `az storage blob upload -f <vhd to upload> -n <vhd name> -c <container name> --account-name <account name>`
    

###### Task 3. Add and configure a new disk in Azure

1.  In the Azure home page, navigate to Azure services → Disks and Add a new disk.
    
2.  Navigate to the Create a managed disk → Basics page, and define the following information:
    
    Read more...
    
    | Heading | Parameter |
    | --- | --- |
    | Project details | Resource group: Select your resource group. |
    | Disk details | Disk name: Enter a name for the disk object. |
    | Region: Select your preferred region. |
    | Source type: Select **`Storage Blob`**. Additional fields are displayed, which you can define as follows: Source blob: Read more...-   Select Browse. You are directed to the Storage accounts page.; From the navigation panel, select the bucket and then container to which you uploaded the Cortex Cloud VHD image.; In the Container page, Select your VHD image.
    ; OS type: Select Linux; VM generation: Select Gen 1 |
    
3.  Check you settings by clicking Review + create.
    

###### Task 4. Create the Broker VM disk

1.  Create your Broker VM disk, and after deployment is complete, click Go to resource.
    
2.  In your created Disks page, click Create VM.
    
3.  In the Create a virtual machine page, define the following:
    
    Configuration steps:
    
    | Heading | Parameter |
    | --- | --- |
    | Instance details | (Optional) Virtual machine name: Enter the same name as the disk name you defined. |
    | Size: Select the size according to your company guidelines. Select Next to navigate to the Networking tab. |
    | Network interface | NIC network security group: Select Advanced. |
    | Configure network security group: Select HTTPS to be able to access the Broker VM Web UI, and SSH to allow for remote access when troubleshooting. Make sure to allow these connection to the Broker VM from secure networks only. |
    
4.  To check your settings, click Review + create.
    
5.  Create your VM.
    
    After deployment is complete, click Go to resource. You are directed to your VM page.
    
    **Note:**
    
    Creating the VM can take up to 15 minutes. The Broker VM Web UI is not accessible during this time.
    
6.  Ensure that the VM you created contains an Outbound port rule that allows the broker to reach the Azure Instance Metadata Service using the IP address `169.254.169.254` and port `80`. For more information about the Azure Instance Metadata Service, see the [Azure Documentation](https://learn.microsoft.com/en-us/azure/virtual-machines/instance-metadata-service?tabs=windows).
    
    To configure an outbound rule on your VM, select Networking → Network settings, and under the Rules → Outbound port rules section, you can either:
    
    **Note:**
    
    For more information on creating a rule in an Azure VM, see [Create a Security Rule](https://learn.microsoft.com/en-us/azure/virtual-network/manage-network-security-group?tabs=network-security-group-portal#create-a-security-rule) in the Azure Documentation.
    
    -   Configure a new outbound port rule by selecting Create port rule → Outbound port rule and setting the following settings in the Add outbound security rule dialog box:
        
        -   Destination: Select IP Addresses.
            
        -   Destination IP addresses/CIDR ranges: Enter the IP address as `169.254.169.254`.
            
        -   Destination port ranges: Enter the port as `80`.
            
        -   Protocol: Select TCP.
            
        -   Name: Enter a unique name for this new outbound port rule, such as AzureInstanceMetadataService.
            
        
        Click Add to create the new outbound port rule.
        
    -   Edit an existing outbound port rule and ensure that the settings provided above for creating a new outbound port rule match what is already configured in the rule.

##### Set up Broker VM on Nutanix Hypervisor

Learn how to set up your Cortex Cloud Broker virtual machine (VM) on Nutanix Hypervisor.

After you download your Cortex Cloud Broker virtual machine (VM) QCOW2 image, you need to upload it to a Nutanix hypervisor. Nutanix AHV 10.3 or later is supported.

**Prerequisite:**

Download a Cortex Cloud Broker VM QCOW2 image. For more information, see the virtual machine compatibility requirements in Set up and configure Broker VM.

Perform the following procedures in the order listed below.

###### Task 1. Upload the downloaded QCOW2 image file to a Nutanix hypervisor

1.  Select Compute → Images, and click Add Image.
    
2.  In the Add Images page, ensure the Image Source is set to Image File, and click Add File.
    
3.  Select the downloaded QCOW2 file and click Open. Additional fields related to the QCOW2 file are automatically displayed in the Add Image page, where the Name and Type of file are automatically populated. Ensure the Type is set to Disk.
    
4.  (Optional) Define the rest of the fields displayed for the QCOW2 file.
    
5.  Click Next.
    
6.  Select the location by defining the Placement Method and Select Clusters settings.
    
7.  Click Save.
    
    The image is now listed in the list of images.
    
    **Note:**
    
    Saving the image to Nutanix hypervisor can take time as it’s a large file. We recommend verifying periodically that the connection is alive for the upload process to finish successfully.
    

###### Task 2. Create a new VM

1.  Select Compute → VMs, and click Create VM.
    
2.  In the Create VM screen, set the following Configuration fields, and ensure the advanced settings options are not selected:
    
    Read more...
    
    -   Name: Specify a name for the new VM.
        
    -   Description (Optional): Specify a description to identify the VM.
        
    -   Number of VMs: Select the number of VMs you want to create. The default is set to 1.
        
    -   VM Properties
        
        -   CPU: Select 4 CPUs.
            
        -   Cores per CPU: Select the number of cores to create for each CPU. The default number is 1.
            
        -   Memory: Select 8GB as the allotted memory for the VM.
            
        
    
3.  Click Next.
    
4.  Set the Resources fields:
    
    Disks
    
    Attach Disk and set the following field settings:
    
    -   Type: Leave the default Disk type.
        
    -   Operation: Select Clone from Image.
        
    -   Image: Select the QCOW2 image file that you uploaded.
        
    -   Capacity: Specify the capacity of the image file as 512 GB.
        
    -   Bus Type—Leave the default SCUI selected.
        
    
    When you finish, click Save.
    
    Networks
    
    Attach to Subnet and set the following field settings.
    
    -   Subnet: Select the subnet from the list.
        
    -   Network Connection State: Leave the default Connected option selected.
        
    
    When you finish, click Save.
    
    Boot Configuration
    
    Leave the default Legacy BIOS Mode selected.
    
5.  Verify the Shield VM Security Settings options are not selected.
    
6.  Click Next.
    
7.  Set the Management fields, where you can leave the default settings for the various fields.
    
8.  Click Next.
    
9.  Click Create VM.
    
    The VM is now listed in the list of VMs.
    
    **Note:**
    
    Creating the VM can take up to 15 minutes. The Broker VM Web user interface is not accessible during this time.
    

###### Task 3. Review the VM details for connecting to the VM

Select Summary and you can use the IP Addresses and Host IP listed to connect to the VM.

##### Set up Broker VM on VMware ESXi using vSphere Client

Learn more about how to set up you Cortex Cloud Broker VM on VMware ESXi.

To set up the Broker VM on VMware ESXi, you deploy the OVA image provided in Cortex Cloud. VMware ESXi 6.5 or later is supported. The instructions below provide an example of doing this using vSphere Client 7.0.3.01400.

**Prerequisite:**

-   Ensure you have a virtualization platform installed that is compatible with an OVA image, and have an authenticated user account.
    
-   Download a Cortex Cloud Broker VM OVA image. For more information, see the virtual machine compatibility requirements in Set up and configure Broker VM.
    

Deploy the Broker VM OVA image on vSphere Client

1.  From vSphere Client, right-click an inventory object for the virtual machine of your broker, and select Deploy OVF Template.
    
2.  In the Select an OVF template page of the wizard, select Local file, click UPLOAD FILES to select the OVA image file that you downloaded, and click NEXT.
    
3.  In the Select a name and folder page, enter a unique name for the virtual machine, select a deployment location, and click NEXT.
    
4.  In the Select a compute resource page, select a resource where to run the deployed VM template, and click NEXT.
    
5.  In the Review details page, verify the OVA template details, and click NEXT.
    
6.  In the Select storage page, define where and how to store the files for the deployed OVA template, and click NEXT. For more information on the options available, see the [VMware vSphere documentation](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.vm_admin.doc/GUID-17BEDA21-43F6-41F4-8FB2-E01D275FE9B4.html).
    
7.  In the Select networks page, select a source network and map it to a destination network, and click NEXT.
    
    The Source Network column lists all networks that are defined in the OVA template.
    
8.  In the Ready to complete page, review the details and click FINISH.
    
    A new task for creating the virtual machine is displayed in the Recent Tasks pane. When the Status of the task reaches 100%, the task is complete, and the new virtual machine is created on the selected resource.
    
9.  Navigate to the resource where the new virual machine is created, right-click the resource, and select Power → Power On.

#### Broker VM data collector applets

Learn more about the different Broker VM data collector applets available to configure.

**Notice:**

Some data collector applets require the Data Collection add-on.

The Broker VM has a number of data collector applets that you can configure to ingest different types of data. These data collector applets are in addition to the others that are available in the Settings → Data Sources & Integrations page.

For more information on activating the Broker VM applets, see Generic on-premise data collectors.

### Manage Broker VM

Learn more about managing your Broker VMs from the management console.

After you configure the Broker VMs, you can manage these brokers from the Cortex Cloud management console in the Broker VMs page.

When managing a Broker VM, the options differ for a standalone Broker VM versus a Broker VM node that is added to a high availability (HA) cluster. Certain configuration options that are only relevant for a Broker VM cluster node, such as Remove from Cluster, are only displayed when the Broker VM is a cluster peer.

Select Settings → Configurations → Data Broker → Broker VMs to view detailed information regarding your registered Broker VMs in the Brokers tab.

#### Understanding the Broker VM table

The Broker VMs table enables you to monitor and mange your Broker VM and applet connectivity status, version management, device details, and usage metrics. A status icon is displayed in the following columns, where the colors can indicate different statuses:

-   Device Name: Indicates whether the Broker machine is registered and connected to Cortex Cloud.
    
    -   Black: Disconnected to Cortex Cloud
        
    -   Red: Disconnected from Cortex Cloud
        
    -   Green: Connected
        
    
-   Version: Indicates whether the Broker VM is running the latest version.
    
    -   Orange: Past Version
        
    -   Green: Latest Version
        
    
-   Apps: Indicates whether the available Broker VM data collector applets are connected to Cortex Cloud.
    
    -   Green (Connected): Indicates the applet has no issues.
        
    -   Orange (Warning): Indicates the applet has minor issues.
        
    -   Red (Error): Indicates the applet has errors.
        
    
    **Note:**
    
    For more information on troubleshooting errors and warnings for these broker applets, see Troubleshoot Broker VM applet errors.
    

#### Broker VM table field descriptions

The following table describes common fields that you can add to the Brokers table using the column manager and lists the fields in alphabetical order.

**Note:**

Certain fields are also exposed in the Clusters tab, when a Broker VM node is added to a High Availability (HA) cluster, and each cluster node is expanded to view the Broker VM nodes table. An asterisk (\*) is beside every field that is also included in the Broker VM nodes table for each HA cluster.

| Field | Description |
| --- | --- |
| ALL interfaces | All IP addresses of the different interfaces on the device. |
| APPS\* | List of active or inactive applets and the connectivity status for each. |
| CLUSTER NAME\* | Indicates the name of the HA cluster that the Broker VM has been added to. For a standalone Broker VM, which isn't added to any HA cluster, this field is empty. |
| CPU USAGE\* | CPU usage percentage of the Broker VM device that is synced every 5 minutes. |
| CONFIGURATION STATUS\* | Broker VM configuration status. Status is defined by the following according to changes made to any of the Broker VM configurations: up to date: Broker VM configuration changes made through the Cortex Cloud console have been applied.; in progress: Broker VM configuration changes made through the Cortex Cloud console are being applied.; submitted: Broker VM configuration changes made through the Cortex Cloud console have reached the Broker VM and awaiting implementation.; failed: Broker VM configuration changes made through the Cortex Cloud console have failed. Need to open a Palo Alto Networks support ticket. |
| DEVICE ID | Device ID allocated to the Broker VM by Cortex Cloud after registration. |
| DEVICE NAME\* | Same as the Device ID. A icon notifies of an expired Broker VM. To reconnect, generate a new token and re-register your Broker VM as described in steps 1 through 7 of [Configure the Broker VM](urn:resource:component:924525). Once registered, all previous Broker VM configurations are reinstated. |
| DISK USAGE\* | Disk usage percentage from the total allocated for data caching in the Broker VM. Inside the brackets is displayed how much this is in GB from the total disk size in GB. A notification is added to the Notification Center whenever the disk space is low disk and whenever the disk size is increased. |
| EXTERNAL INTERFACE | The IP interface the Broker VM is using to communicate with the server. For AWS and Azure cloud environments, the field displays the Internal IP value. |
| LAST SEEN | Indicates when the Broker VM was last seen on the network. |
| MEMORY USAGE\* | Memory usage percentage of the Broker VM that is synced every 5 minutes. |
| STATUS\* | Connection status of the Broker VM. Status is defined by either Connected or Disconnected. Disconnected Broker VMs do not display CPU Usage, Memory Usage, and Disk Usage information. Notifications about the Broker VM losing connectivity to Cortex Cloud appear in the Notification Center. |
| UPGRADE TIME | Timestamp of when the Broker VM was upgraded. |
| VERSION\* | Version number of the Broker VM. If the status indicator is not green, then the Broker VM is not running the latest version. Notifications about the available new Broker VM version appear in the Notification Center. |

#### Maintenance releases

Cortex Cloud updates and enhances the Broker VM automatically through maintenance releases. The Broker VM version release process uses several security measures and tools to ensure that every released version is highly secure. These include the following.

-   CIS Server Level 1 and 2 benchmarks (using a 3rd party product)
    
-   Vulnerability scanning for containers running on the Broker VM
    
-   Vulnerability scanning for the host kernel
    
-   Periodic 3rd party penetration testing

#### Edit Broker VM Configuration

Learn more about editing the configuration of a Broker VM.

After configuring and registering your Broker VM, you can edit existing configurations and define additional settings in the Broker VMs page in the Brokers tab. When you have a high availability (HA) cluster configured, you can also edit any Broker VM nodes configurations in the Clusters tab from the Broker VMs table under the Cluster.

Perform the following procedures in the order listed below.

##### Task 1. Open the Configurations page for the Broker VM

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  In the Broker VMs table, locate your Broker VM, right-click, and select Configure.
    
    If the Broker VM is disconnected, you can only View the configurations.
    
    **Note:**
    
    For all Broker VM nodes added to a HA cluster, you can also Configure the Broker VM nodes from the Clusters tab.
    

##### Task 2. Define the settings in the Configurations page

Network Interfaces, Proxy Server, NTP Server, and SSH Access

Edit the existing Network Interfaces, Proxy Server, NTP Server, and SSH Access configurations.

Device Name (Requires Broker VM 8.0 and later)

Device Name

Change the name of your Broker VM device name by selecting the pencil icon. The new name will appear in the Brokers table.

FQDN

Set your Broker VM FQDN as it will be defined in your Domain Name System (DNS). This enables connection between the WEF and WEC, acting as the subscription manager. The Broker VM FQDN settings affect the WEC and Agent Installer and Content Caching.

(Optional) Internal Network (Requires Broker VM 8.0 and later)

Specify a network subnet to avoid the Broker VM dockers colliding with your internal network. By default, the Network Subnet is set to `172.17.0.1/16`.

**Note:**

Internal IP must be:

-   Formatted as **`prefix/mask`**, for example **`192.0.2.1/24`**.
    
-   Must be within `/8` to `/24` range.
    
-   Cannot be configured to end with a zero.
    

For Broker VM version 9.0 and lower, Cortex Cloud accepts only `172.17.0.0/16`.

Auto Upgrade

Enable or Disable automatic upgrade of the Broker VM. By default, auto upgrade is enabled at Any time for all 7 days of the week, but you can also set the Days in Week and Specific time for the automatic upgrades. If you disable auto-upgrade, new features and improvements will require manual upgrade.

Monitoring

Enable or Disable of local monitoring of the Broker VM usage statistics in Prometheus metrics format, allowing you to tap in and export data by navigating to **`http://<broker_vm_address>:9100/metrics/`**. By default, monitoring your Broker VM is disabled. For more information with an example of how to set up Prometheus and Grafana to monitor the Broker VM, see Monitor Broker VM using Prometheus.

(Optional) SSH Access

Broker VM 7.4.5 and earlier

Enable/Disable ssh Palo Alto Networks support team SSH access by using a Cortex Cloud token.

Enabling allows Palo Alto Networks support team to connect to the Broker VM remotely, not the customer, with the generated password. If you use SSL decryption in your firewalls, you need to add a trusted self-signed CA certificate on the Broker VM to prevent any difficulties with SSL decryption. For example, when [configuring Palo Alto Networks NGFW to decrypt SSL](https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClmyCAC) using a self-signed certificate, you need to ensure the Broker VM can validate a self-signed CA by uploading the `cert_ssl-decrypt.crt` file on the Broker VM.

**Note:**

Make sure you save the password before closing the window. The only way to re-generate a password is to disable ssh and re-enable.

Broker VM 14.0.42 and later

Customize the login banner displayed, when logging into SSH sessions on the Broker VM in the Welcome Message field by overwriting the default welcome message with a new one added in the field. When the field is empty, the default message is used.

Broker UI Password

Reset your current Broker VM Web UI password. Define and Confirm your new password. Password must be at least 8 characters.

(Optional) SSL Server Certificate section (Requires Broker VM 10.1.9 and later)

Upload your signed server certificate and key to establish a validated secure SSL connection between your endpoints and the Broker VM. When you configure the server certificate and the key files in the tenant UI, Cortex Cloud automatically updates them in the Broker VM UI, even when the Broker VM UI is disabled.

Cortex Cloud validates that the certificate and key match, but does not validate the Certificate Authority (CA).

When you are done, Save your changes.

#### Increase Broker VM storage allocated for data caching

Learn more about increasing the storage allocated for data caching in the Broker VM.

The storage allocated for data caching in the Broker VM is fixed at around 346.4 GB using a Logical Volume Manager (LVM). You can increase the disk space allocated to attain better resilience during network and connectivity issues by adding a new disk. The disk needs to be added manually to an applicable hypervisor that your broker supports, so that the Broker VM automatically detects the physical disk and allows you to connect to it. Extending the existing disk is not supported.

When allocating storage for data caching, ensure you are aware of the following:

-   You must allocate the entire disk as opposed to portions of the disk.
    
-   You can connect multiple disks to increase the data caching space according to your requirements.
    
-   Once a disk is connected, It's not possible to dismiss a disk that has already been allocated, or to reduce the disk space of the data caching.
    
-   Adding a disk requires formatting and deleting all its contents.
    

**Warning:**

This operation is irreversible, and will make the disk become an integral part of the broker, where disconnecting the disk will result in errors and data loss.

How to increase the Broker VM disk size

1.  Gracefully shutdown the applicable Broker VM in the hypervisor to manually add a disk.
    
2.  Add a disk manually through the hypervisor portal. This step involves accessing the portal and attaching a new disk to the VM.
    
    **Note:**
    
    Follow your hypervisor documentation to understand how to add a persistent disk storage to your VM.
    

4.  Select Settings → Configurations → Data Broker → Broker VMs.
    
5.  In the Broker VMs table, locate your Broker VM, and wait for a few minutes until the status of the Broker VM is Connected, right-click, and select Configure.
    
6.  Scroll down to the Storage section, verify that your disk is detected with a new line that reads New disk detected with the correct disk name and disk size, and click Add to data caching space.
    
    **Note:**
    
    If your disk is not listed and you didn't shutdown your Broker VM in your hypervisor before manually adding a disk to the VM, you'll need to reboot the Broker VM before the disk details are detected by the Broker VM. This can be performed either in the hypervisor or directly in the Broker VMs page.
    
7.  In the ARE YOU SURE? dialog box that is displayed, confirm that you want to add the new disk to the broker's data caching space and are aware of all the ramifications by clicking Yes, add.
    
8.  To apply your changes, click Save.
    
    Once completed, a notification is added to the Notification Center indicated whether the disk size was increased successfully. If not, the notification includes the errors encountered during the process.
    
    In addition, when the disk is added successfully, the total size of the disk space available is updated in the DISK USAGE column on the Broker VMs page.

#### Monitor Broker VM using Prometheus

Learn more on monitoring the Broker VM using Prometheus.

You can enable local monitoring of the Broker VM to provide usage statistics in a Prometheus metrics format. You can tap in and export data by navigating to `http://<broker_vm_address>:9100/metrics/`. By default, monitoring is disabled.

**Prerequisite:**

To monitor the Broker VM using Prometheus, ensure that you enable monitoring on the Broker VM. This is performed after configuring and registering your Broker VM, when you can edit existing configurations and define additional settings in the Broker VMs page.

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  In the Broker VMs table, locate your Broker VM, right-click, and select Configure.
    
    **Note:**
    
    For all Broker VM nodes added to a HA cluster, you can also Configure the Broker VM nodes from the Clusters tab.
    
3.  In the Broker VM Configurations page, select Monitoring from the left pane.
    
4.  Clear the Use Default (Disabled) checkbox.
    
5.  In the Montoring menu, select Enabled.
    
6.  Click Save.
    

##### How to set up Prometheus and Grafana to monitor the Broker VM

Below is an example of how to set up Prometheus and Grafana to monitor the Broker VM. This is set up using a docker compose on an Ubuntu machine to monitor the CPU usage.

Perform the following procedures in the order listed below.

##### Task 1. Install Docker and Docker Compose

1.  Update your Ubuntu system:
    
    ```
    sudo apt update
    ```
    
2.  Install Docker:
    
    **Note:**
    
    For more information on Docker, see the [Docker website](https://www.docker.com/).
    
    ```
    sudo apt install docker.io
    ```
    
3.  Start the Docker service:
    
    ```
    sudo systemctl start docker
    ```
    
4.  Enable Docker to start on boot:
    
    ```
    sudo systemctl enable docker
    ```
    
5.  Install Docker Compose:
    
    ```
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    ```
    
    ```
    sudo chmod +x /usr/local/bin/docker-compose
    ```
    

##### Task 2. Create a Docker Compose file

This task includes setting up Prometheus and Grafana.

1.  Create a file named `docker-compose.yml`, and open it for editing:
    
    ```
    vim docker-compose.yml
    ```
    
2.  Add the following content to the file:
    
    ```
    version: '3.8'
    services:
      prometheus:
        image: prom/prometheus:latest
        container_name: prometheus
        restart: unless-stopped
        volumes:
         - ./prometheus.yml:/etc/prometheus/prometheus.yml
         - prometheus_data:/prometheus
       command:
         - '--config.file=/etc/prometheus/prometheus.yml'
         - '--storage.tsdb.path=/prometheus'
         - '--web.console.libraries=/etc/prometheus/console_libraries'
         - '--web.console.templates=/etc/prometheus/consoles'
         - '--web.enable-lifecycle'
         - '--log.level=debug'
       ports:
         - '9090:9090'
     grafana:
       image: grafana/grafana-enterprise
       container_name: grafana
       restart: unless-stopped
       ports:
        - '3000:3000'
       volumes:
         - grafana_data:/var/lib/grafana
    volumes:
      grafana_data: {}
      prometheus_data: {}
    ```
    
3.  Save and close the file.
    

##### Task 3. Create a Prometheus configuration file

You need to configure Prometheus to scrape the Broker VM metrics by creating a Prometheus configuration file.

1.  Create a Prometheus configuration file named `prometheus.yml` in the same directory as the `docker-compose.yml` file that you created above.
    
2.  Open the `prometheus.yml` file for editing:
    
    ```
    vim prometheus.yml
    ```
    
3.  Add the following content to the file:
    
    ```
    global:
      scrape_interval: 15s
      scrape_timeout: 10s
    scrape_configs:
      - job_name: 'prometheus'
        static_configs:
          - targets: ['<your server IP address>:9090']
      - job_name: 'node'
        static_configs:
          - targets: ['<Broker VM IP address>:9100']
    ```
    
4.  Save and close the file.
    

##### Task 4. Run Docker Compose

1.  In the terminal, run the following command from the project directory:
    
    ```
    docker-compose up -d
    ```
    
2.  Verify that Prometheus is running correctly:
    
    ```
    docker-compose logs -f prometheus
    ```
    

##### Task 5. Access Grafana and Set Up Prometheus as a Data Source

1.  Open a web browser and go to `http://<your server>:3000`.
    
2.  Log in to Grafana using the default credentials.
    
    -   Username: `admin`
        
    -   Password: `admin`
        
    
3.  Set up Prometheus as a data source:
    
    1.  In the left pane, select Administation → Data sources.
        
    2.  Click Add data source, and select Prometheus.
        
    3.  Under HTTP, set the URL to `http://<your server IP address>:9090`.
        
    4.  To verify the connection, click Save & Test.
        

##### Task 6. Create Dashboards in Grafana

You can now create dashboards in Grafana to visualize the data from Prometheus.

1.  In Grafana, on the left pane, click Dashboards.
    
2.  Select New and create a new dashboard.
    
3.  Add a panel to the dashboard and configure the dashboard to display the Prometheus metrics that you want.
    
4.  To monitor CPU usage, use the following metric:
    
    ```
    100 - (avg by (instance) (rate(node_cpu_seconds_total{job="node",mode="idle"}[1m])) \* 100)
    ```

#### Collect Broker VM Logs

Learn more about collecting logs from a Broker VM to review them as part of an investigation.

Cortex Cloud enables you to collect your Broker VM logs directly from the Cortex Cloud management console.

You can collect logs by either regenerating the most up-to-date logs and downloading them once they are ready, or downloading the current logs from the last creation date reflected in the TIMESTAMP.

1.  Select Settings → Configurations → Data Broker → Broker VMs to view the Broker VMs table in the Brokers tab.
    
2.  Locate your Broker VM, right-click and select either Generate New Logs or Download Logs (<TIMESTAMP>).
    
    **Note:**
    
    The Download Logs (<TIMESTAMP>) is only displayed when you’ve downloaded your logs previously using Generate New Logs.
    
    Logs are generated automatically, but can take up to a few minutes depending on the size of the logs.

#### Upgrade Broker VM

Learn more about upgrading the Broker VM from the Cortex Cloud management console.

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  In either the Brokers or Clusters tab, locate your Broker VM, right-click, and select Upgrade Broker version.
    
    Upgrading your Broker VM takes approximately 5 minutes.
    
    **Important:**
    
    After a Broker VM upgrade, your broker may require a reboot to finish installing important updates. A notification about this will be sent to your Cortex Cloud console Notification Center.

#### Import Broker VM Configuration

Learn more about importing one Broker VM configuration to another.

**Important:**

This option can only be used on Broker VMs with version 20.0 and later, and is only suitable for importing a configuration of brokers in the same version, or from a broker in an older version to a broker in a newer version.

Importing Broker VM configurations allows you to copy, including applet settings, the configuration of one Broker VM to another. The import overrides the Broker VM and applet settings in the target Broker VM.

1.  To replace the Broker VM configuration, right-click the Broker VM and select Import Configuration.
    
2.  Select the Broker VM that has the configuration that you want to import.
    
3.  (Optional) After the import is complete and the new configurations are applied to the target Broker VM, you can choose to shutdown the original Broker VM (default configuration). This step ensures that there are no conflicts in data collection and applets operation.
    
4.  Select the confirmation checkbox.
    
5.  Click Import.
    
    After a successful import, the new configurations are immediately applied to the target Broker VM.
    
    **Important:**
    
    If your source Broker VM configuration includes a WEC applet, you'll need to ensure that you update the DNS record of this Broker VM's FQDN to point to the target Broker VM IP address.

#### Open Live Terminal

Learn more about remotely connecting to a Cortex Cloud Broker VM.

Cortex Cloud enables you to connect remotely to a Broker VM directly from Cortex Cloud.

1.  In Cortex Cloud, select Settings → Configurations → Data Broker → Broker VMs table.
    
2.  Locate the Broker VM you want to connect to, right-click and select Open Live Terminal.
    
    Cortex Cloud opens a CLI window where you can perform the following commands:
    
    Logs
    
    Broker VM logs are located in `/data/logs/folder` and contain the applet name in the file name.
    
    Example 122. 
    
    Folder `/data/logs/[applet name]`, containing `container_ctrl_[applet name].log`
    
      
    
    Ubuntu commands
    
    The Broker VM allows commands which do not require Sudo.
    
    Example 123. 
    
    `route` or `ifconfig -a`
    
      
    
    Sudo commands
    
    Broker VM supports the commands listed in the following table. All the commands are located in the `/home/admin/sbin` folder.
    
    Cortex Cloud requires you use the following values when running commands:
    
    Applet Names
    
    -   CSV Collector: `file_collector`
        
    -   Database Collector: `db_collector`
        
    -   Files and Folders Collector: `log_collector`
        
    -   FTP Collector: `ftp_collector`
        
    -   Kafka Collector: `kafka_collector`
        
    -   Local Agent Settings: `tms_proxy`
        
    -   NetFlow Collector: `netflow_collector`
        
    -   Network Mapper: `network_mapper`
        
    -   Syslog Collector: `anubis`
        
    -   Windows Event Collector: `wec`
        
    
    Services
    
    -   Upgrade: `zenith_upgrade`
        
    -   Frontend service: `webui`
        
    -   Sync with Cortex Cloud: `cloud_sync`
        
    -   Internal messaging service (RabbitMQ): `rabbitmq-server`
        
    -   Upload metrics to Cortex Cloud: `metrics_uploader`
        
    -   Prometheus node exporter: `node_exporter`
        
    -   Backend service: `backend`
        
    
    The following table displays the available commands in alphabetical order:
    
    Read more...
    
    | Command | Description | Example |
    | --- | --- | --- |
    | `applets_restart` | Restarts one or more applets. | `sudo ./sbin/applets_restart wec` |
    | `applets_start` | Start one or more applets. | `sudo ./sbin/applets_start wec` |
    | `applets_status` | Check the status of one or more applets. | `sudo ./sbin/applets_status wec` |
    | `applets_stop` | Stop one or more applets. | `sudo ./sbin/applets_stop wec` |
    | `hostnamectl` | Check and update the machine hostname on a Linux operating system. | `sudo ./sbin/hostnamectl set-hostname <new_host_name>` Restart machine after running command. |
    | `kill` | Linux kill command. | `sudo ./sbin/kill [some pid]` |
    | `restart_routes` | Invoke a restart of the routing service after updating your static network route configuration file, `/etc/network/routes`. The `/etc/network/routes` configuration file is a standard Ubuntu routes configuration file and can be edited directly. The admin user that you logged in with, when using the remote terminal or via SSH, has read/write permissions to this file. | `sudo ./sbin/restart_routes` \*\*Note:\*\* You can either `restart_routes` or reboot the Broker VM for the changes in the `/etc/network/routes` file to take affect. |
    | `route` | Modify your IP address routing. | `sudo ./sbin/route` |
    | `services_restart` | Restarts one or more services. OS services are not supported. | `sudo ./sbin/services_restart cloud_sync` |
    | `services_start` | Start one or more services. | `sudo ./sbin/services_start cloud_sync` |
    | `services_status` | Check the status of one or more services. | `sudo ./sbin/services_status cloud_sync` |
    | `services_stop` | Stop one or more services. | `sudo ./sbin/services_restart cloud_sync` |
    | `set_ui_password.sh` | Change the password of the Broker VM Web UI. Run the command, enter the new password followed by Ctrl+D. | `sudo ./sbin/set_ui_password.sh` |
    | `squid_tail` | Display the Proxy applet Squid log file in real-time. | `sudo ./sbin/squid_tail` |

#### Add Broker VM to cluster

Learn more about adding a Broker VM to a high availability cluster.

You can add standalone Broker VMs to a high availability (HA) cluster from either the Brokers tab or Clusters tab.

You can only add a Broker VM to a cluster, when the Broker VM version is 19.0 and later, the STATUS is Connected, and the Broker VM version isn't older than the cluster version.

Once you add a Broker VM to a cluster, the Broker VM becomes a cluster node and is added to the cluster folder in the Clusters tab. If it is the only peer Broker VM in the cluster, it is designated as the Primary node; otherwise, it is designated as a standby node.

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  Add a Broker VM in one of the following tabs:
    
    Brokers tab
    
    1.  Right-click a standalone Broker VM, and select Add Broker to Cluster.
        
    2.  In the Select Cluster field, choose the cluster that you want this Broker VM to be added to.
        
    
    Clusters tab
    
    1.  Right-click a cluster node, and select Add Broker to Cluster.
        
    2.  In the Select broker field, choose the standalone Broker VM that you want to add to this cluster.
        
    
3.  Click Add Broker.
    
    Adding a Broker VM to a cluster overrides all previous Broker VM settings and disables all active applets on this Broker VM. When the Broker VM is added to a cluster, the cluster configuration and cluster applet settings propagate to the Broker VM. The state of the applets on the Broker VM is dependent on the applet mode and Broker VM node role in the cluster. When the operation completes, a notification is added to the Notification Center.

#### Switchover Primary Node in Cluster

Learning more about changing the role of the current Primary node in a HA cluster.

You can manually change the role of the current Primary node in a high availability (HA) cluster from both the Brokers tab and Clusters tab of the Broker VMs page.

There are various reasons for changing the role of the current Primary node to another node in the HA cluster, for example, to perform maintenance, by initiating a manual switchover.

The option is only available for a Primary node, and only if there is another available standby node that is connected in the cluster.

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  In either the Brokers tab or Clusters tab, right-click a Primary Broker VM node, and select Switchover.
    
3.  If multiple standby nodes are connected in the cluster, select the node that you want to change to Primary in the Select broker menu. When only one standby node is configured, skip this step.
    
4.  Click Switchover.
    
    When the switchover is completed, the roles of the node are switched. The new node is designated as Primary and the old node becomes a standby node. In addition, a notification is added to the Notification Center.

#### Remove from Cluster

Learn more about removing a Broker VM node from a high availability cluster.

You can remove a Broker VM node from a high availability (HA) cluster in either the Brokers tab or Clusters tab of the Broker VMs page. This option is only available if the Broker VM is currently a member of a cluster.

When a Broker VM node is removed from a HA cluster, it becomes a standalone Broker VM. All its configuration settings, including applet settings, are reset to default like a newly created Broker VM. If you remove a Primary node, an automatic failover occurs.

You can remove a Broker VM node from a cluster if the current node STATUS is Connected.

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  In either the Brokers tab or Clusters tab, right-click a Broker VM node, and select Remove from Cluster.
    
3.  Follow the instructions in the dialog box, and click Remove.
    
    When removing the last node in the cluster, all applets in this cluster become Inactive, and the cluster becomes Unavailable.
    
    When the Broker VM receives the new configuration, the Broker VM becomes a standalone Broker VM with settings reset to default.
    
    **Note:**
    
    If you've enabled a Load Balancer Health-Check on the cluster, you need to exclude this Broker VM from your Load Balancer settings.

### Broker VM High Availability Cluster

Learn more about creating Broker VMs in a High Availability Cluster

High availability (HA) is a deployment in which at least two Broker VMs are placed in a Broker VM cluster, and their configuration is synchronized to prevent a single point of failure on your network at the hardware and application level. A heartbeat connection between the Broker VM nodes and the Cortex Cloud Server ensures seamless failover if a node fails. Setting up a HA cluster provides redundancy and enables data collection continuity.

#### Cluster Architecture

The Clusters tab on the **`Broker VMs`** page enables you to view your cluster configurations, which display the associated nodes, node statuses, applets configured, and applet statuses. You can add as many clusters as you want in a tenant. Each Cortex Cloud cluster can include as many nodes as you need. The cluster operation is fully managed from the tenant, and there is no need to install additional components. There is no need for cluster nodes to communicate with one another on the network. In each cluster, one Broker VM is designated as the Primary cluster node, and the rest of the nodes are designated as standby nodes. The cluster architecture is dependent on the type of applets configured in the cluster. Applets on cluster nodes run either in the active/active mode or in the active/passive mode and exhibit different behaviors as detailed in the table below.

Applet mode table

| Applet Mode | Applet Behavior | Applets |
| --- | --- | --- |
| active/active | The applets that operate in the active/active mode listen simultaneously on all the nodes in the cluster to achieve High Availability and Load Balancing. Failure of an applet on a particular node causes all traffic to be redistributed to the remaining nodes in the HA cluster. Any applet that is a listener is active/active to ensure the source can send data, and anyone can pick it up based on availability. \*\*Note:\*\* For Load Balancing, you must install a Load Balancer in your network, which will distribute the incoming data between the nodes. | The active/active applets are: Syslog Collector; Netflow Collector; Windows Event Collector; Local Agent Settings |
| active/passive | The applets that operate in the active/passive mode retrieve data from the source, and run only on the Primary Node designated in the cluster. The other nodes are synchronized and ready to transition from standby to the active Primary Node should there be a failover. In this mode, all nodes share the same configuration settings, while only one operates at a given time. Any applet that is going outbound and pulling data is active/passive as the applet should only have one active Primary Node at a point in time, and the rest of the nodes should be passive. | The active/passive applets are: Kafka Collector; Network Mapper; CSV Collector; FTP Collector; Files and Folders Collector; DB Collector; Registry Scanner |

**Note:**

The following applets aren't supported when configuring Broker VMs in HA clusters: DSPM Fileshare, Registry Scanner, and Transporter.

#### Automatic Failover

In each cluster, whenever there's a failure on the Primary node, Cortex Cloud automatically switches to one of the standby nodes, initiates the applets on the new Primary node, and continues data collection on that node. Any successful or unsuccessful failover attempt displays an issue in the notification area and is logged in the Management Audit Logs table.

The following conditions can trigger a failover for the Primary node:

-   Connectivity issues between a Primary node and the Cortex Cloud server
    
-   Application failure, such as failing to start an applet or an applet crashes
    
-   Any failure of one of the internal components, such as MariaDB, Redis, RabbitMQ, or Docker engine
    
-   Hardware failure, including:
    
    -   Running out of disk space
        
    -   CPU usage of more than 95% for more than 10 minutes
        
    -   Memory usage of more than 95% for more than 10 minutes
        
    

#### Manual Switchover

At any time, you can change the role of the current Primary node in the cluster to another node in the HA cluster, for example, to perform maintenance, by initiating a manual switchover.

#### Automatic Upgrades

You can configure automatic upgrades within Broker VM HA cluster nodes to update cluster nodes without noticeable downtime or other disruption of the HA cluster service by implementing the rolling upgrade mechanism. An automatic upgrade is performed in the following order:

1.  Standby nodes are upgraded one by one.
    
2.  The Primary node is switched over to one of the upgraded standby nodes.
    
3.  The previous Primary node, now a standby node, is upgraded.

#### Configure High Availability Cluster

Learn how to configure a High Availablity Cluster.

You can create a High Availability (HA) cluster by either creating a new cluster from scratch and then adding applets and Broker VM nodes to the cluster, or by creating a new cluster from an existing standalone Broker VM. There is no limit to the number of clusters and nodes that you can add.

There are a number of different ways that you can configure the HA cluster to acheive fault tolerance depending on your system requirements. For example, once a cluster is created from scratch, you can start by configuring the applets that you want the cluster to maintain and then adding the Broker VM nodes that will be managed by the cluster to maintain this configuration, or vise versa. When you create a new cluster from an existing Broker VM, the cluster inherits the applets already configured, which can help save time with your cluster configuration.

##### Guidelines

Note the following guidelines:

-   For the cluster to start working and provide services, you need at least one operational node. Until this node is added, the cluster is unavailable. Once a node is added, the cluster begins operating, but it's not considered healthy. 
    
-   For the cluster to be healthy and maintain HA and redundancy, you need at least two working nodes in the cluster.
    
-   For active/active applets that require load balancing, you must install a Load Balancer in your network to distribute the incoming data between the nodes.
    

**Prerequisite:**

Be sure you do the following task before creating a cluster from an existing Broker VM:

-   If the Broker VM is explicitly specified in some Agent Settings profile, which means Cortex Cloud agents retrieve release upgrades and content updates from this Broker VM, you must change the Broker VM's current designated role. To do this, you need to modify the Agent Settings profile by removing the specific selection of this broker as a Download Source for XDR agents (Endpoints → Policy Management → Prevention → Profiles → Edit Profile → Download Source → Broker Selection). After you create the cluster for this broker, you can go back the Agent Settings profile and select the cluster that you created from this broker to be used as a Download Source for XDR agents.
    

Perform the following procedures in the order listed below.

##### Task 1. Open the Broker VMs page in Cortex Cloud

Select Settings → Configurations → Data Broker → Broker VMs.

###### Task 2: Determine how you want to create an HA cluster.

-   To create a cluster and then add Broker VMs to the cluster, click Add Cluster.
    
-   To create a new cluster from an existing Broker VM in the Brokers tab, right-click a standalone Broker VM, and click Create a Cluster from this Broker.
    
    **Important:**
    
    -   You can only create a new cluster from an existing Broker VM, when the Broker VM version is 19.0 and later, and the STATUS is Connected.
        
    -   The Create a Cluster from this Broker option is only listed if the Broker VM is not already added to a cluster.
        
    

##### Task 3. Set the applicable parameters

Define the following parameters:

Load Balancer FQDN

Specify the domain name of your Load Balancer FQDN as configured in your local DNS server. The Load Balancer FQDN settings affect the Windows Event Collector and Local Agent Settings applets.

When creating a cluster from an existing Broker VM and either a WEC or Local Agent Settings applet are enabled in the Broker VM, the Load Balancer FQDN is mandatory to configure, and is automatically populated based on the Broker VM settings.

Load Balancer Health Check options

Implementing a Load Balancer requires exposing a health check API that is called by the Load Balancer at regular intervals. You can access the health check page by sending an HTTP request to `http[s]://<Broker VM IP>:<port>/health/`. A successful HTTP response of `200 OK` as the status code indicates the Broker VM’s readiness to receive logs.

Disabled/Enabled toggle

When Disabled the Load Balancer Health Check listening port is blocked. When Enabled (default), the listening port is opened, and you must define the Port number (default 8088) and Protocol (default **`HTTP`**).

**Note:**

The Broker VM Load Balancer Health Check requires HTTP/1.1 or higher. Legacy HTTP/1.0 is no longer supported. Ensure your external load balancer is configured to use HTTP/1.1 or above when performing health checks.

**Important:**

When the Protocol is set to HTTPS, you may need to perform a few follow-up steps to establish a validated secure SSL connection with the Broker VM.

-   If you're using your own Certificate Authority (CA) to sign the certificates, you'll need to place the CA in the client, such as the Load Balancer, and upload the certificates to the Broker VM.
    
-   If you're using a Trusted CA Signed SSL Certificate, you'll only need to upload it to the Broker VM.
    
-   If the SSL Server Certificates of the Broker VM are self-signed certificates, no further steps are necessary.
    

Auto Upgrade options

You can configure automatic upgrades within Broker VM HA cluster nodes to update cluster nodes without noticeable down-time or other disruption of the HA cluster service by implementing the rolling upgrade mechanism. Setting automatic upgrades includes these parameters:

Auto Upgrade

In a HA cluster configuration, the rolling upgrades process is automatically performed by default whenever a new version of the Broker VM is available.

If you want to upgrade the Broker VM nodes manually, clear the Use Default (Enabled) checkbox, and set Auto Upgrade to Disabled. You can manually upgrade the Broker VM nodes individually by right-clicking the Broker VM and selecting Upgrade Broker version.

Days In Week

You can configure the days in the week that the rolling upgrades are performed. By default, the upgrades are configured to run every day.

Schedule

You can configure whether the rolling upgrades are performed at any time during the day or at a specific time by setting a time range of at least 4 hours.

Once configured, the rolling upgrades are only performed when the cluster STATUS is Healthy. An automatic upgrade is performed in the following order:

Read more...

1.  Standby nodes are upgraded one by one.
    
2.  The Primary node is switched over to one of the upgraded standby nodes.
    
3.  The previous Primary node, now a standby node, is upgraded.
    

##### Task 4. Save your changes

Click Save.

The cluster is now listed in the Clusters tab of the Broker VMs page, whose output differs depending on how the cluster was created:

New cluster added

When the cluster is added from scratch, the cluster is listed as an empty folder, and you can start to add Broker VM nodes and applets to this cluster. While the cluster doesn’t have any peer nodes, the STATUS is Unavailable.

Cluster added from an existing Broker VM

When the cluster is added from an existing Broker VM, the cluster inherits all applet settings from the Broker VM. You can leave the configuration as is or add/remove additional applets as desired. This node automatically becomes the first node (Primary) in the cluster. You can now add other Broker VM nodes to this HA cluster. While the cluster contains only one Broker VM node, the STATUS is Warning.

##### Task 5. Add Broker VMs to your cluster as you require to achieve fault tolerance and high availability

For the cluster to be healthy and maintain HA and redundancy, you need at least two working nodes in the cluster.

-   To add Broker VM, see Add Broker VM to cluster.
    
-   To add applets, see Add applet to cluster.

#### Manage Broker VM clusters

Learn more about managing your broker VM clusters from the Clusters tab of the Broker VMs page.

After you've configured a cluster, you can manage all your Broker VM clusters from the Clusters tab on the **`Broker VMs`** page (Settings → Configurations → Data Broker → Broker VMs → Clusters).

The Clusters tab displays in a heirarchical view the clusters with their nodes, performance stats, applets configured, and the state of each applet. You can right-click any cluster to open a menu listing the tasks available management options.

##### View cluster details

Learn more about viewing the details of any particular cluster.

The Clusters tab of the Broker VMs page (Settings → Configurations → Data Broker → Broker VMs) enables you to view detailed information regarding your High Availability (HA) cluster.

The Clusters table enables you to monitor and mange your cluster nodes and applets, and view stats.

In addition, when each cluster is expanded, a table is displayed, which enables you to view detailed information regarding the various Broker VM nodes that are currently added to your cluster. If you haven't added any Broker VM nodes to a particular cluster, the table is empty.

###### Clusters Table

The following table describes all the fields that are available in the Clusters table. You can hide any field column using the column manager.

| Fields | Description |
| --- | --- |
| CLUSTER NAME | Beside the full name of each cluster, a status indicator is displayed with one of the following colors: Green: Healthy, the Primary node and all available standby nodes are connected and operating with no warnings, and all activated applets are running without a problem.; Orange: Warning as the system has detected errors in the cluster, but the applets can still be running. For example, all applets are running normally in the Primary Broker VM, but no available standby nodes are detected, or the Primary node is operating fine, but there is an applet that failed to start in one of the standby nodes. The errors must be addressed as soon as possible.; Red: Critical as the system has detected one or more critical errors in the cluster, and nodes are not able to run some applets. For example, an error was detected in some Primary applet and no standby node is available for failover. All errors must be addressed as soon as possible.; Black: Unavailable as the cluster doesn’t have any peer nodes configured. |
| STATUS | Connection status of the cluster according to the statuses and colors explained in the CLUSTER NAME field above. Unavailable clusters do not display CPU USAGE, MEMORY USAGE, and DISK USAGE information. Notifications about the cluster losing connection between applets and Broker VM nodes appear in the Notification Center. |
| CPU USAGE | Average CPU utilization between all nodes in the cluster as a percentage. |
| MEMORY USAGE | Sum of all memory in use out of the sum of the total memory on all nodes in the cluster as a percentage. |
| DISK USAGE | Sum of all disk space in use out of the sum of the total disk space on all nodes in the cluster as a percentage. |
| APPS | List of active applets and the connectivity status for each. Colors depict the following statuses: Green (Connected): Indicates the applet has no issues.; Orange (Warning): Indicates the applet has minor issues.; Red (Error): Indicates the applet has errors.; White (Inactive): Indicates the applet is inactive. \*\*Note:\*\* For more information on troubleshooting errors and warnings for these applets, see Troubleshoot Broker VM applet errors. |

###### Cluster Broker VM Nodes Table

The fields that are available in the Broker VM nodes table for each cluster are similar to many of the fields that are displayed in the table for the Broker VMs in the Brokers tab. For more information on these fields, see Manage Broker VM.

##### Edit cluster

Learn how to edit a High Availability cluster.

After configuring a high availability (HA) cluster, you can always edit the cluster configurations from the Clusters tab of the Broker VMs page.

An HA cluster is always configurable no matter what the status of the cluster or whether it has any Broker VM nodes added.

1.  Select Settings → Configurations → Data Broker → Broker VMs, and select the Clusters tab.
    
2.  In the Clusters table, locate the cluster, right-click, and select Configure.
    
3.  In the Cluster Configurations window, you can edit the parameters based on your previous settings. For more information on each of these settings, see Configure High Availability Cluster.
    
4.  Update the cluster with your changes.

##### Add applet to cluster

Learn more about adding an applet to a High Availability cluster.

You can add an applet to a high availability (HA) cluster from the Clusters tab of the Brokers VM page.

You can always add an applet to a cluster, even if the cluster status is Unavailable or Error. When an applet is added to a cluster without any Broker VM nodes, the cluster status is Unavailable and the cluster APPS status displays as Inactive.

1.  Select Settings → Configurations → Data Broker → Broker VMs, and select the Clusters tab.
    
2.  In the Clusters table, locate the cluster that you want to add an applet.
    
3.  You can either right-click the cluster, and select Add App → <name of applet>, or in the APPS column, left-click Add → <name of applet>.
    
    The applet is only available for you to add to the cluster if it hasn't already been added.
    
    **Note:**
    
    With Cortex XDR Prevent, it's only relevant to configure a HA cluster with a Local Agent Settings applet as this is the only applet supported for this product license. The other applets are collector applets, which are only available in Cortex XDR Pro or Cortex XSIAM.
    
4.  Configure your applet.
    
    The various applets that you can configure are the same as when configuring a standalone Broker VM. For more information on a particular applet configuration, locate the applet in the Set up Broker VM section in the Cortex Cloud Admin Guide.
    
    The applet is listed with a status indicator in the APPS column, where the colors depict the following statuses:
    
    -   Green (Connected): Indicates the applet has no issues.
        
    -   Orange (Warning): Indicates the applet has minor issues.
        
    -   Red (Error): Indicates the applet has errors.
        
    -   White (Inactive): Indicates the applet is inactive.
        
    
    **Note:**
    
    For more information on troubleshooting errors and warnings for these applets, see Troubleshoot Broker VM applet errors.
    
    Once the applet configuration is changed in a cluster, the changes are automatically applied to the cluster nodes depending on the applet and cluster node role. For example, if you add the Kafka Collector, which is an "active/passive" applet, the applet is automatically initiated and enters an active state on the Primary node and is on standby on the standby nodes. While if you add the Syslog Collector "active/active" applet, the changes automatically propagate so that the applet is active on all cluster nodes, including Primary and standby.

##### Add Broker VM to cluster

Learn more about adding a Broker VM to a high availability cluster.

You can add standalone Broker VMs to a high availability (HA) cluster from either the Brokers tab or Clusters tab.

You can only add a Broker VM to a cluster, when the Broker VM version is 19.0 and later, the STATUS is Connected, and the Broker VM version isn't older than the cluster version.

Once you add a Broker VM to a cluster, the Broker VM becomes a cluster node and is added to the cluster folder in the Clusters tab. If it is the only peer Broker VM in the cluster, it is designated as the Primary node; otherwise, it is designated as a standby node.

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  Add a Broker VM in one of the following tabs:
    
    Brokers tab
    
    1.  Right-click a standalone Broker VM, and select Add Broker to Cluster.
        
    2.  In the Select Cluster field, choose the cluster that you want this Broker VM to be added to.
        
    
    Clusters tab
    
    1.  Right-click a cluster node, and select Add Broker to Cluster.
        
    2.  In the Select broker field, choose the standalone Broker VM that you want to add to this cluster.
        
    
3.  Click Add Broker.
    
    Adding a Broker VM to a cluster overrides all previous Broker VM settings and disables all active applets on this Broker VM. When the Broker VM is added to a cluster, the cluster configuration and cluster applet settings propagate to the Broker VM. The state of the applets on the Broker VM is dependent on the applet mode and Broker VM node role in the cluster. When the operation completes, a notification is added to the Notification Center.

##### Remove cluster

Learn more about removing a high availability cluster.

You can remove a high availability (HA) cluster in the Clusters tab of the Broker VMs page.

When removing a cluster, the cluster is disassembled and the cluster object is deleted. All nodes in the cluster are reverted back to standalone Broker VMs with their settings reset to default as a newly created Broker VMs.

If you've configured load balancing for any "active/active" applets configured, you need to update your Load Balancer configuration settings to stop sending logs to these Broker VM nodes.

You cannot remove a cluster that is used as a download source from which the Cortex Cloud agents retrieve release upgrades and content updates. You'll need to change the cluster's current designated role before removing a cluster.

1.  Select Settings → Configurations → Data Broker → Broker VMs.
    
2.  In the Clusters tab, right-click a cluster, and select Remove Cluster.
    
3.  Follow the instructions in the REMOVE CLUSTER window, whose instructions differ depending on the type of cluster you are trying to remove, and Remove the cluster.

### Broker VM notifications

Learn about the notifications that are relevant to Cortex Cloud Broker VMs.

To help you monitor your Broker VM version, connectivity, and high availability clusters, Cortex Cloud sends notifications to your Cortex Cloud console Notification Center.

Cortex Cloud sends the following notifications:

Add Cluster

Notifies when a cluster was added.

Applet Activated

Notifies when an applet is activated on a cluster.

Applet configuration

Notifies when an applet on a cluster configuration was updated.

Applet Deactivated

Notifies when an applet is deactivates on a cluster.

Broker VM Connectivity

Notifies when the Broker VM has lost connectivity to Cortex Cloud .

Broker VM Disk Usage

Notifies when the Broker VM is utilizing over 90% of the allocated disk space.

Cluster Configuration

-   Notifies when a Broker VM node was added to a cluster.
    
-   Notifies when a Broker VM node was removed from a cluster.
    
-   Notifies when the configuration for the cluster needs to be set.
    

Cluster failover

-   Notifies when a failover is initiated in the cluster from one Broker VM node to another.
    
-   Notifies when a failover completed successfully. The Broker VM is now Primary in the cluster.
    
-   Notifies when a failover in the cluster completed with errors and error message.
    
-   Notifies when couldn't perform a failover in the cluster as there is no available standby node with sufficient redundancy.
    

Cluster health declined

-   Notifies when failed to detect an available standby Broker VM node in the cluster.
    
-   Notifies when critical errors detected in the cluster and there is no available standby Broker VM node for failover.
    

Cluster health recovered

Notifies when detected an available standby Broker VM node in the cluster.

Disk space allocation on <name of broker> broker

Notifies whether the disk space allocated for data caching in the Broker VM has been increased successfully. If not, the notification includes the errors encountered during the process. For more information on allocating disk space to the Broker VM, see Increase Broker VM storage allocated for data caching.

<Device ID> Broker VM requires a reboot

Notifies after a Broker VM update whether a broker needs a reboot to finish installing important updates.

New Broker VM Version

Notifies when a new Broker VM version has been released.

-   If the Broker VM Auto Upgrade is disabled, the notification includes a link to the latest release information. It is recommend you upgrade to the latest version.
    
-   If the Broker VM Auto Upgrade is enabled, 12 hours after the release you are notified of the latest upgrade, or you are notified that the upgrade failed. In such a case, open a Palo Alto Networks Support Ticket.
    

Reinstall Broker VM <Broker VM name> with a new image

For all brokers that were deployed with an old Broker VM image, downloaded prior to July 9th, 2023 (installed with Ubuntu 18.04 or earlier), the Broker VM must be reinstalled with a new image (installed with Ubuntu 20.04 or later) before upgrading to the latest version. The name of the Broker VM to upgrade is indicated with a link to the instructions.

Remove Cluster

Notifies when a cluster was removed.

To ensure you stay informed about Broker VM activity, you can also configure notification forwarding to forward your Broker audit logs to an email distribution list or Syslog server. For more information about the Broker VM audit logs, see Broker VM Activity in the Cortex Cloud Administrator Guide.

### Monitor Broker VM activity

Learn more about the monitored Cortex Cloud Broker VM activities.

Cortex Cloud logs entries for events related to the Broker VM monitored activities. Cortex Cloud stores the logs for 365 days. To view the Broker VM audit logs, select Settings → Management Audit Logs.

To ensure you and your colleagues stay informed about Broker VM activity, you can Configure notification forwarding to forward your Broker VM audit logs to an email distribution list or Syslog server.

You can customize your view of the logs by adding or removing filters to the Management Audit Logs table. You can also filter the page result to narrow down your search. The following table describes the default and optional fields that you can view in the Cortex Cloud Management Audit Logs table:

**Note:**

Certain fields are exposed and hidden by default. An asterisk (\*) is beside every field that is exposed by default.

| Field | Description |
| --- | --- |
| Description\* | Log message that describes the action. |
| Email | Email of the user who performed the action. |
| Host Name\* | Name of any relevant affected hosts. |
| ID | Unique ID of the action. |
| Reason | This field is not applicable for Broker VM logs. |
| Result\* | The result of the action ( `Success`, `Fail`, or `N/A`) |
| Severity\* | Severity associated with the log: `Critical` ; `High` ; `Medium` ; `Low` ; `Informational` |
| Timestamp\* | Date and time when the action occurred. |
| Type\* and Sub-Type\* | Additional classifications of Broker VM logs (Type and Sub-Type): Broker VMs:- Action on device; Add Cluster; Applet Activated; Applet Configuration; Applet connection_test Action; Applet Deactivated; Applet License Expired; Applet Mount Share Action; Applet Mount Share Test Action; Applet preview Action; Applet Scan Now Action; Applet Set Configuration; Applet Unmount All Shares Action; Authentication succeeded; Broker Log; Cluster Configuration; Cluster Failover; Cluster health declined; Cluster health recovered; Cluster Switchover; Device configuration; Disconnect; Register; Remove Cluster; Remove Device; Rolling Upgrades; Subscription Created; Subscription Deleted; Subscription Edited ; Broker API:- Authentication failed |
| User Name\* | Name of the user who performed the action. |

## Dataset management

Learn more about managing your datasets and understanding your overall data storage, period-based retention.

**Prerequisite:**

Dataset Management requires View/Edit RBAC permissions for Data Management (under Configurations → Data Management), which are the same permissions required for Parsing Rules, Data Model Rules, and Event Forwarding.

The Dataset Management page enables you to manage your datasets and understand your overall data storage duration for different retention periods and datasets based on your hot and cold storage licenses, and retention add-ons that extend your storage. You can view details about your Cortex Cloud licenses and retention add-ons by selecting Settings → Cortex Cloud License.

**Important:**

Cortex Cloud enforces retention on all log-type datasets excluding Host Inventory, Vulnerability Assessment, Metrics, and Users.

### Hot and cold storage

Your current hot and cold storage licenses, including the default license retention and any additional retention add-ons to extend storage, are listed within the Hot Storage License and Cold Storage License sections of the Dataset Management page. Whenever you extend your license retention, depending on your requirements and license add-ons for both hot storage and cold storage, the add-ons are listed.

**Note:**

Cold storage, in addition to a cold storage license, requires compute units (CU) to run cold storage queries. For more information on CU, see Manage compute units.

### Additional hot storage

You can expand your license retention to include flexible Hot Storage based retention to help accommodate varying storage requirements for different retention periods and datasets. This add-on license is available to purchase based on your storage requirements for a minimum of 1,000 GB. If this license is purchased, an Additional Storage subheading in the Hot Storage License section is displayed on the Dataset Management page with a bar indicating how much of the storage is used.

**Note:**

Only datasets that are already handled as part of the GB license are supported for this license. In addition, the retention configuration is only available in Cortex Cloud, as opposed to the public APIs.

### Edit the retention plan

On any dataset configured to use Additional Hot Storage, you can edit the retention period. This enables you to view the current retention details for hot and cold storage and configure the retention. This includes setting the amount of flexible hot storage-based retention designated for a dataset and the priority for the dataset's hot storage.

How to edit the retention plan

1.  Select Settings → Configurations → Data Management → Dataset Management.
    
2.  In the Datasets table, right-click any dataset designated with flexible hot storage, and select Edit Retention Plan.
    
3.  Set the following parameters:
    
    -   Additional hot storage: Set the amount of flexible hot storage-based retention designated for this dataset in months, where a month is calculated as 31 days.
        
    -   Hot Storage Priority: Select the priority designated for this dataset's hot storage as either Low, Medium, or High.
        
    
4.  Click Save.
    

### Datasets table

For each dataset listed in the table, the following information is available:

**Note:**

-   Certain fields are exposed and hidden by default. An asterisk (\*) is beside every field that is exposed by default.
    
-   Datasets include dataset permission enforcements in the Cortex Query Language(XQL), Query Center, and XQL Widgets. For example, to view or access any of the **`endpoints`** and **`host_inventory`** datasets, you need role-based access control (RBAC) permissions to the Endpoint Administration and Host Inventory views. Managed Security Services Providers (MSSP) administration permissions are not enforced on child tenants, but only on the MSSP tenant. 
    

| Field | Description |
| --- | --- |
| \*TYPE | Displays the type of dataset based on the method used to upload the data. The possible values include: Correlation, Lookup, Raw, Snapshot, System, and User. For more information on each dataset type, see What are datasets?.What are datasets? |
| \*LOG UPDATE TYPE | Event logs are updated either continuously (Logs) or the current state is updated periodically (State) as detailed in the Last Updated column. |
| \*LAST UPDATED | Last time the data in the dataset logs were updated. \*\*Important:\*\* This column is updated once a day. Therefore, if the dataset was created or updated by the target or lookup flows, it's possible that the Last Updated value is a day behind when the queries or reports were run as it was before this column was updated. |
| \*ADDITIONAL STORAGE | Amount of flexible hot storage-based retention designated for this dataset in months, where a month is calculated as 31 days. |
| \*TOTAL DAYS STORED | Actual number of days that the data is stored in the Cortex Cloud tenant, which is comprised of the HOT RANGE + the COLD RANGE. |
| \*HOT RANGE | Details the exact period of the Hot Storage from the start date to the end date. |
| \*COLD RANGE | Details the exact period of the Cold Storage from the start date to the end date. |
| \*TOTAL SIZE STORED | Actual size of the data that is stored in the Cortex Cloud tenant. This number is dependent on the events stored in the hot storage. For the **`xdr_data`** dataset, where the first 31 days of storage are included with your license, the first 31 days are not included in the TOTAL SIZE STORED number. |
| \*ADDITIONAL SIZE STORED | Actual size of the additional flexible hot storage data that is stored in the Cortex Cloud tenant in GB. This number is dependent on the events stored in the hot storage. |
| \*AVERAGE DAILY SIZE | Average daily amount stored in the Cortex Cloud tenant. This number is dependent on the events stored in the hot storage. |
| \*HOT STORAGE PRIORITY | Indicates the priority set for the dataset's hot storage as either Low, Medium, or High. |
| \*TOTAL EVENTS | Number of total events/logs that are stored in the Cortex Cloud tenant. This number is dependent on the events stored in the hot storage. |
| \*AVERAGE EVENT SIZE | Average size of a single event in the dataset (TOTAL SIZE STORED divided by the TOTAL EVENTS). This number is dependent on the events stored in the hot storage. |
| \*TTL | For lookup datasets, displays the value of the time to live (TTL) configured for when lookup entries expire and are removed automatically from the dataset. The possible values are: Forever: Lookup entries never expire (default).; Custom: Lookup entries expire according to a set number of days, hours, and minutes. The maximum number of days is 99999. For more information, see Set time to live for lookup datasets. |
| DEFAULT QUERY TARGET | Details whether the dataset is configured to use as your default query target in XQL Search, so when you write your queries you do not need to define a dataset. By default, only the **`xdr_data`** dataset is configured as the DEFAULT QUERY TARGET and this field is set to Yes. All other datasets have this field set to No. When setting multiple default datasets, your query does not need to mention any of the dataset names, and Cortex Cloud queries the default datasets using a **`join`**. |
| TOTAL HOT RETENTION | Total hot storage retention configured for the dataset in months, where a month is calculated as 31 days. |
| TOTAL COLD RETENTION | Total cold storage retention configured for the dataset in months, where a month is calculated as 31 days. |

### Dataset views

Cortex Cloud supports creating dataset views in the `Dataset Management` page to enhance data efficiency and security. Dataset views provide a virtual representation of data from one or more datasets, based on the Cortex Query Language (XQL) query defined, and provide multiple benefits, such as joining datasets into logical subsets through defined queries, manipulating data without altering underlying datasets, and segregating data for specific user needs or access privileges through the Role-based access control (RBAC) settings.

Once a dataset view is created, you can edit or delete the dataset view by right-clicking the dataset view in the Dataset Views table. A dataset view can only be deleted if there are no other dependencies. For example, if a Correlation Rule is based on a dataset view, you wouldn't be able to delete the dataset view until you removed the dataset view from the XQL query of the Correlation Rule.

Cortex Cloud logs entries for events related to creating, editing, and deleting datasets or dataset views. These monitored activities are available to view in the datasets and dataset views audit logs in the Management Audit Logs. For more information, see Monitor datasets and dataset views activity.

Building XQL dataset view queries

When building an XQL query to define a dataset view, the query is built in the same way as creating a query through the Query Builder. Yet, it's important to be aware of the following points that are specific for dataset view queries:

-   The following features are unsupported in dataset view queries:
    
    -   RT Correlation Rules
        
    -   Query Library
        
    -   Presets
        
    -   Cold storage queries (`cold_dataset = <dataset name>`)
        
    
-   Only the following XQL stages are supported when building a dataset view query:
    
    -   `alter`
        
    -   `dedup`
        
    -   `fields`
        
    -   `filter`
        
    -   `join`
        
    -   `replacenull`
        
    -   `union`
        
    
-   Once the dataset view is created, it is listed as an available `dataset` when building your XQL queries as long as you have the necessary permissions to access the dataset view in the Role-based access control (RBAC) settings.
    

How to create a dataset view

1.  Select Settings → Configurations → Data Management → Dataset Management → Dataset Views.
    
2.  Click New Datset View.
    
3.  Enter a Name and Description (optional) for the dataset view.
    
4.  Create your XQL query for the dataset view by typing in the query box.
    
5.  (Optional) Click Run to view the query results.
    
    The query must contain no errors, including using only supported commands, to run; otherwise, the Run button remain disabled.
    
6.  Click Save.
    
    **Note:**
    
    You'll only be able to save the dataset view if the query contains no errors; otherwise, the Save button is disabled.
    
    Once the dataset view is created, you can now control user access permissions through Role-based access control (RBAC).
    

Dataset views access permissions

**Notice:**

Managing Roles requires an Account Admin or Instance Administrator role. For more information, see Predefined user roles.

Access permissions for dataset views are configured in the same way that you set dataset access permissions for any dataset through user roles in Cortex Cloud Access Management. Cortex Cloud uses role-based access control (RBAC) to manage roles with specific permissions for controlling user access. RBAC helps manage access to Cortex Cloud components and datasets, so that users, based on their roles, are granted minimal access required to accomplish their tasks. Once the user role is configured to access these dataset views, you can now assign the user role to the designated users or user groups, who you want to access these dataset views.

How to set access permissions for dataset views

1.  Select Settings → Configurations → Access Management.
    
2.  Configure a user role with the dataset views that you want users to access.
    
    1.  Select Roles.
        
    2.  You can perform one of the following:
        
        -   To create a new role to assign the dataset views, click New Role, and set a Role Name and Description (optional).
            
        -   To edit an existing user role with these dataset views, right-click the relevant user role, and select Edit Role.
            
        -   To create a new role based on an existing role, right-click the relevant user role, select Save As New Role, and set a Role Name and Description (optional).
            
        
    3.  Under Datasets, you have two options for setting the Cortex Query Language (XQL) dataset access permissions for the user role:
        
        -   Set the user role with access to all XQL datasets by disabling the Enable dataset access management toggle.
            
        -   Set the user role with limited access to certain XQL datasets by selecting the Enable dataset access management toggle and selecting the datasets under the different dataset category headings.
            
        
    4.  Scroll down to Dataset View and select the particular dataset views that you want assigned to this user role.
        
    5.  Click Save.
        
    
    **Note:**
    
    For more information on user roles, see Manage user roles.
    
3.  Assign the user role with the dataset views configured to the designated users or user groups. For more information, see Assign a user to a role.
    

Dataset Views table

For each dataset view listed in the table, information is available. Here are descriptions on the columns that may require further explanation:

| Field | Description |
| --- | --- |
| SOURCE QUERY | Displays the query used to create the dataset view. |
| IS VALID | Details whether the query for the dataset view is still valid or not. |
| RELATED TABLES | Details the other datasets that are related to this dataset view. |

### What are datasets?

Learn how to import, delete, and interact with custom or third-party datasets in Cortex Cloud.

**Prerequisite:**

Dataset Management requires View/Edit RBAC permissions for Data Management (under Configurations → Data Management), which are the same permissions required for Parsing Rules, Data Model Rules, and Event Forwarding.

Cortex Cloud runs every Cortex Query Language (XQL) query against a dataset. A dataset is a collection of column:value sets. If you do not specify a dataset in your query, Cortex Cloud runs the query against the default datasets configured, which is by default `xdr_data`. The `xdr_data` dataset contains all of the endpoint and network data that Cortex Cloud collects. You can always change the default datasets using the set to default option. You can also upload datasets as a CSV, TSV, or JSON file that contains the data you are interested in querying. These uploaded datasets are called lookup datasets.

It's also possible to create dataset views, which provide a virtual representation of data from one or more datasets, based on the Cortex Query Language (XQL) query defined. Dataset views enhance data efficiency and security. For example, by segregating data for specific user needs or access privileges through the Role-based access control (RBAC) settings. For more information, see Dataset views.Dataset management

To query other datasets, you have the following options:

-   Set a dataset as default, which enables you to query the datasets without specifying them in the query.
    
-   Name a specific dataset at the beginning of your query with the `dataset` stage command.
    

Dataset types

The type of dataset is based on the method used to upload the data. The possible types include:

-   Correlation: A dataset containing data saved from a correlation rule.
    
-   Lookup: A dataset containing key-value pairs that can be used as a reference to correlate to events. For example, a user list with corresponding access privileges. You can import or create a lookup dataset, and then reference the values for a certain key, run queries and take action. For more information, see Lookup datasets.
    
-   Raw: Every dataset where PANW data is ingested out-of-the-box or third-party data is ingested using a configured dedicated collector.
    
-   Snapshot: A dataset that contains only the last successful snapshot of the data, such as Workday or ServiceNow CMDB tables.
    
-   System: Cortex Cloud datasets that are created out-of-the-box.
    
-   User: If saved by a query using the **`target`** command, the Type can be either User or Lookup.
    

Datasets in XQL

**Important:**

By default, forensic datasets are not included in XQL query results, unless the dataset query is explicitly defined to use a forensic dataset.

Cortex Query Language (XQL) supports using different languages for dataset and field names. In addition, when setting up your XQL query, it is important to keep in mind the following:

-   The dataset formats supported are dependent on the data retention offerings available in Cortex Cloud according to whether you want to query hot storage or cold storage.
    
    -   Hot Storage queries are performed on a dataset using the format **`dataset = <dataset name>`**. This is the default option.
        
        ```
        dataset = xdr_data
        ```
        
    -   Cold Storage queries are performed using the format **`cold_dataset = <dataset name>`**.
        
        ```
        cold_dataset = xdr_data
        ```
        
    
-   Dataset refresh times: While most out-of-the-box system datasets are ingested in near real-time, the following datasets have specific refresh schedules.
    
    -   `endpoints`: Refreshed every hour.
        
    -   `pan_dss_raw`: Refreshed daily.
        
    -   Forensics datasets: Data collection behavior depends on your Agent Settings profile.
        
        -   Default: Data is collected as a one-time snapshot and does not update.
            
        -   Scheduled: If you specify a collection interval, the value represents the number of hours between updates, such as an interval of 24 equals once per day.
            
        -   Minimum: The shortest allowable interval is 12 hours.
            
        
    
-   Query against a dataset by selecting it with the `dataset` command when you create an XQL query. For more information, see Create XQL query.
    
-   After your query runs, you can always save your query results as a dataset. You can use the target stage command to save query results as a dataset.
    
-   Schema changes to datasets may not be reflected in the autocomplete suggestions and deﬁnitions as you type in real time the XQL query and can appear with a slight delay.
    

#### Managing datasets and dataset views

You can manage your datasets and dataset views in Cortex Cloud from the Settings → Configurations → Data Management → Dataset Management page.

Below are some of the main tasks available for all dataset types by right-clicking a particular dataset or dataset view listed in either the Datasets or Dataset Views table. Only tasks that need further explanation are explained below. Datasets and dataset views can only be deleted if there are no other dependencies. For example, if a Correlation Rule is based on a dataset or dataset view or dataset view, you wouldn't be able to delete the dataset or dataset view until you removed the dataset view from the XQL query of the Correlation Rule.

**Note:**

For more information on tasks specific to lookup datasets, see Lookup datasets.

View Schema

Select View Schema to view the schema information for every field found in the dataset or dataset view result set in the Schema tab after running the query in XQL. Each system field in the schema is written with an underscore (`_`) before the name of the field in the FIELD NAME column in the table.

**Note:**

Schema changes to datasets may not be reflected in the autocomplete suggestions and deﬁnitions as you type in real time the XQL query and can appear with a slight delay.

Set as default

Select Set as default to query the dataset without having to specify it in your queries in XQL by typing `dataset = <name of dataset>`. Once configured, the DEFAULT QUERY TARGET column entry for this dataset is set to Yes in the Datasets table. By default, this option is not available when right-clicking the `xdr_data` dataset as this dataset is the only dataset configured as the DEFAULT QUERY TARGET as it contains all of the endpoint and network data that Cortex Cloud collects. Once you Set as default another dataset, you can always remove it by right-clicking the dataset and selecting Remove from defaults. When setting multiple default datasets, your query does not need to mention any of the dataset names, and Cortex Cloud queries the default datasets using a `join`. This option is only relevant for datasets.

Copy text to clipboard

Select Copy text to clipboard to copy the name of the dataset or dataset view to your clipboard.

### Lookup datasets

Learn more about lookup datasets to correlate data from a data source with events in your environment.

**Prerequisite:**

Dataset Management requires View/Edit RBAC permissions for Data Management (under Configurations → Data Management), which are the same permissions required for Parsing Rules, Data Model Rules, and Event Forwarding.

Lookup datasets enable you to correlate data from a data source you provide with the events in your environment. For example, you can create a lookup with a list of high-value assets, terminated employees, or service accounts in your environment. Use lookups in your search, detection rules, and threat hunting. Lookups are stored as name-value pairs and are cached for optimal query performance and low latency.

Lookup tables support low-frequency changes of up to 1200 modifications per day. Changes are implemented whenever a lookup dataset is edited, where only one person or user can edit the file at a given time. Concurrent users editing the file are not supported.

Use case scenarios

-   Investigate threats and respond to cases quickly with the rapid import of IP addresses, file hashes, and other data from CSV files. After you import the data, use lookup name-value pairs for joins and filters in threat hunting and general queries.
    
-   Import business data as a lookup. For example, import user lists with privileged system access, or terminated employees. Then, use the lookup to create allow lists and blocklists to detect or prevent those users from logging in to the network.
    
-   Create allow lists to suppress issues from a group of users, such as users from authorized IP addresses that perform tasks that would normally trigger the issue. Prevent benign events from becoming issues.
    
-   Enrich event data. Use lookups to enrich your event data with name-value combinations derived from external data sources.
    

How are lookup datasets created?

You can import or create a lookup dataset, and then reference the values for a certain key, run queries, and take action. Lookup datasets are created by any of the following methods:

-   Manual upload from a CSV, TSV, or JSON file to Cortex Cloud from the Dataset Management page. For more information, see Import a lookup dataset.
    
-   Automatic upload by the Files and Folders Collector.
    
-   Query results are saved to a lookup dataset. If saved using the **`target`** stage, the Type can be either User or Lookup. For more information, see the target stage.
    
    **Important:**
    
    When you create or add data to a lookup dataset using the `target` stage, the `_time` field won't be included by default unless you explicitly add it with the `fields` stage.
    

After a lookup, a dataset is imported, you can always edit the dataset to update the data manually by right-clicking the dataset and selecting Edit.

**Note:**

A lookup dataset can only be deleted if there are no other dependencies. For example, if a Correlation Rule is based on a lookup dataset, you wouldn't be able to delete the lookup dataset until you removed the dataset from the XQL query of the Correlation Rule.

#### Import a lookup dataset

Learn more about importing data from an external file to create or update a lookup dataset in Cortex Cloud.

**Prerequisite:**

Dataset Management requires View/Edit RBAC permissions for Data Management (under Configurations → Data Management), which are the same permissions required for Parsing Rules, Data Model Rules, and Event Forwarding.

You can import data from CSV, TSV, or JSON files into Cortex Cloud to create or update lookup datasets.

**Prerequisite:**

When uploading a CSV, TSV, or JSON file, ensure that the file meets the following requirements:

-   The maximum size for the total data to be imported into a lookup dataset is 30 MB from the Dataset Management page. Otherwise, the limit is 50 MB using Cortex Query Language (XQL) or APIs.
    
-   Field names can contain characters from different languages, special characters, numbers (**`0-9`**), and underscores (**`_`**).
    
-   Field names can't exceed 128 characters.
    
-   Field names can't contain duplicate names, white spaces, or carriage returns.
    
-   The file doesn't contain a byte array (binary data) as it can't be uploaded.
    
-   Each line in the JSON file must represent one JSON object. Ensure no brackets enclose the objects at the top-level.
    

Example 125. 

Here's an example of a JSON file in the correct format for upload:

```
{"firstName": "NAME_1", "SurName": "NAME_11", "employeeID": {"id": "ID_AAAAA_2"}}
{"firstName": "NAME_2", "SurName": "NAME_22", "employeeID": {"id": "ID_AAAAA_3"}}
{"firstName": "NAME_3", "SurName": "NAME_32", "employeeID": {"id": "ID_AAAAA_4"}}
```

  

1.  Select Settings → Configurations → Data Management → Dataset Management → \+ Lookup.
    
2.  Browse to your CSV, TSV, or JSON file. You can only upload a TSV file if it contains a `.tsv` file extension.
    
3.  (Optional) Under Name, type a new name for the target dataset.
    
    By default, Cortex Cloud uses the name of the original file as the dataset name. You can change this name to something that will be more meaningful for your users when they query the dataset. For example, if the original file name is mrkdptusrsnov23.json, you can save the dataset as marketing_dept_users_Nov_2023.
    
    Dataset names can contain special characters from different languages, numbers (**`0-9`**) and underscores (**`_`**). You can create dataset names using uppercase characters, but in queries, dataset names are always treated as if they are lowercase.
    
    **Important:**
    
    The name of a dataset created from a TSV file must always include the extension. For example, if the original file name is `mrkdptusrsnov23.tsv`, you can save the dataset with the name `marketing_dept_users_Nov_2023.tsv`.
    
4.  Replace the existing data in the dataset overwrites the data in an existing lookup dataset with the contents of the new file.
    
5.  Click Add to add the file as a lookup.
    
6.  After receiving a notification reporting that the upload succeeded, Refresh  to view it in your list of datasets.
    
    If the upload fails for any reason, you'll receive a notification in the Notification Center.

#### Download JSON file of lookup dataset

Learn more about downloading a lookup dataset as a JSON file.

**Prerequisite:**

Dataset Management requires View/Edit RBAC permissions for Data Management (under Configurations → Data Management), which are the same permissions required for Parsing Rules, Data Model Rules, and Event Forwarding.

You can only download a JSON file for a lookup dataset, where the Type set to Lookup on the Dataset Management page. This option is not available for any other dataset type.

When you download a lookup dataset with field names in a foreign language, the downloaded JSON file displays the fields as `COL_<randomstring>` as opposed to returning the fields in the foreign language as expected.

1.  Open the Settings → Configurations → Data Management → Dataset Management page.
    
2.  In the Datasets table, right-click the lookup dataset that you want to download as a JSON file, and select Download.

#### Set time to live for lookup datasets

Learn more about setting the time to live (TTL) for lookup datasets in Cortex Cloud.

**Prerequisite:**

Dataset Management requires View/Edit RBAC permissions for Data Management (under Configurations → Data Management), which are the same permissions required for Parsing Rules, Data Model Rules, and Event Forwarding.

You can specify when lookup entries expire and are removed automatically from the lookup dataset by configuring the time to live (TTL). The time period of the TTL interval is based on when the data was last updated. The default is forever and the entries never expire. You can also configure a specific time according to the days, hours, and minutes. Expired elements are removed from the lookup dataset by a scheduled job that runs every five minutes.

1.  Open the Settings → Configurations → Data Management → Dataset Management page.
    
2.  In the Datasets table, right-click the lookup dataset, and select Set TTL.
    
3.  Select one of the following to configure when lookup dataset entries expire and are removed:
    
    -   Forever: Lookup entries never expire (default).
        
    -   Custom: Lookup entries expire according to a set number of days, hours, and minutes. The maximum number of days is 99999.
        
    
4.  Click Save.
    
    The TTL column in the Datasets table is updated with the changes and these changes are applied immediately on all existing lookup entries.

### Monitor datasets and dataset views activity

Learn more about the monitored Cortex Cloud datasets and dataset views activities.

**Prerequisite:**

Dataset Management requires View/Edit RBAC permissions for Data Management (under Configurations → Data Management), which are the same permissions required for Parsing Rules, Data Model Rules, and Event Forwarding.

Cortex Cloud logs entries for events related to datasets and dataset views monitored activities. Cortex Cloud stores the logs for 365 days. To view the datasets and dataset views audit logs, select Settings → Management Audit Logs.

You can customize your view of the logs by adding or removing filters to the Management Audit Logs table. You can also filter the page result to narrow down your search. The following table describes the default and optional fields that you can view in the Cortex Cloud Management Audit Logs table:

**Note:**

Certain fields are exposed and hidden by default. An asterisk (\*) is beside every field that is exposed by default.

| Field | Description |
| --- | --- |
| Description\* | Log message that describes the action. |
| Email | Email of the user who performed the action. |
| Host Name\* | This field is not applicable for datasets and dataset views logs. |
| ID | Unique ID of the action. |
| Reason | This field is not applicable for datasets and dataset views logs. |
| Result\* | The result of the action ( `Success`, `Fail`, or `N/A`) |
| Severity\* | Severity associated with the log: `Critical`; `High`; `Medium`; `Low`; `Informational` |
| Timestamp\* | Date and time when the action occurred. |
| Type\* and Sub-Type\* | Additional classifications of dataset and dataset view logs (Type and Sub-Type): Datasets:- Create Dataset; Delete Dataset; Update Dataset ; Dataset Views:- Create Dataset View; Delete Dataset View; Update Dataset View |
| User Name\* | Name of the user who performed the action. |

## Manage compute units

Learn more about managing and tracking your compute units usage for API and Cold Storage XQL queries.

Cortex Cloud uses compute units (CU) for these types of queries:

-   API Queries: When running Cortex Query Language (XQL) queries on your data sources using APIs, each XQL query API consumes CU based on the timeframe, complexity, and number of API response results.
    
-   Cold Storage Queries: Cold Storage is a data retention offering for cheaper storage, usually for long-term compliance needs, with limited search options. You can perform queries on Cold Storage data using the following dataset formats:
    
    -   For typical cold storage queries: `cold_dataset = <dataset name>`
        
    -   For historical data imported into cold storage queries: `cold_dataset = archive_<dataset name>`.
        
        **Note:**
        
        For more information, see Import historical data into cold storage.Import historical data into cold storage
        
    
    These cold storage queries consume CU according to the following calculations:
    
    -   Amount of data queried. 1CU for querying 35GB of data.
        
    -   Timeframe, complexity, and the number of Cold Storage response results of each XQL Cold Storage query.
        
    
    When you query Cold Storage data, the rewarmed data is saved in a temporary hot storage cache that is available for subsequent queries on the same time range at no additional cost. The rewarmed data is available in the cache for 24 hours, and on each re-query, the cached data is extended for 24 hours, for up to 7 days.
    
    **Note:**
    
    The CU consumption of cold storage queries is based on the number of days in the query time frame. For example, when querying 1 hour of a specific day, the CU of querying this entire day is consumed. When querying 1 hour that extends past 2 days, such as from 23:50 to 00:50 of the following day, the CU of querying these two days is consumed.

### Compute units usage

Learn more about how to compute units CU) works according to your license and available options after reaching your quota.

Cortex Cloud provides a free daily quota of compute units (CU) allocated according to your license size. Queries called without enough quota will fail. To expand your investigation capabilities, you can purchase additional CU by enabling the Compute Unit add-on.

The Compute Unit add-on provides an additional 1 compute unit per day for a year, in addition to your free annual quota. For example, if you have allocated 1,825 free annual CU, with the add-on, you will have a total of 2,190 annual compute units. The Compute Unit add-on is calculated on an annual basis, starting from the procurement of your add-on license. The minimum purchase amount is 50 compute units.

You can configure the daily consumption limit for your compute units according to your organizational needs and change it when needed. For example, you can set a lower limit on a daily basis, and during an incident investigation, you can change it to a higher limit that enables you to consume more compute units.

Your unused compute unit balance cannot be transferred from one licensing period to the next.

To gauge how many CU you require, Cortex Cloud provides a 30-day free trial period with 1/12 of your allocated annual CU quota to run XQL API and Cold Storage queries. You can then track the cost of each XQL API and Cold Storage query responses, and the Compute Units Usage page. In addition, Cortex Cloud sends a notification when the Compute Units add-on has reached your daily threshold.

**Note:**

To enable the add-on, select Settings → Configurations → Cortex Cloud License → Addons tile, and select the Compute Unit tile and Enable.

How to manage your CU usage for your queries

1.  Select Settings → Configurations → Data Management → Compute Unit Usage.
    
2.  In Annual Usage in Compute Units, monitor the number of free compute units per license year, the number of purchased compute units per license year, and the ratio of used compute units to your yearly total compute units.
    
    If you have Edit permissions for Public APIs, you can customize the Daily limit to cater to your needs.
    
    -   Divide annual quota evenly: Total annual compute units divided by 365.
        
    -   1% of annual quota: 1% of the total annual compute units.
        
    -   No limit
        
    -   Custom: Configure a daily amount that is equal to or greater than your daily average calculated over a year (annual total/365). Use only integers.
        
    
    The default daily limit is the annual quota divided evenly.
    
    For Managed Security tenants, the values calculated are the total daily usage of parent and child tenants.
    
3.  In Compute Units Usage , view the compute unit usage over the past 30 days or over the past 12 months. For Managed Security tenants, make sure you select the tenant for which you want to display the information from the MSSP Tenant Selection drop-down menu.
    
    -   Compute Units Usage over the Last 30 Days: Hover over each bar to view the total number of units used each day. The daily compute units are calculated at 00:00 UTC time. The red line represents your daily limit for that day. If you change the daily limit a few times on a specific day, the displayed limit is the last number you configured on that day. Select a bar to display in the Compute Unit Usage table the list of queries executed on the selected day.
        
    -   Compute Units Usage over the Last 12 Months: Hover over each bar to view the total number of compute units used each month. The dotted gray line represents your average annual limit per month. You can use the 12-month display to plan how many compute units you need in the next licensing period.
        
    
4.  In the Compute Units Usage table, investigate all the queries that were executed on your tenant. For Managed Security tenants, make sure you select from the MSSP Tenant Selection drop-down menu the tenant for which you want to display the information. You can filter and sort according to the following fields.
    
    -   ID: Unique identifier representing the executed XQL API query.
        
    -   Timestamp
        
        -   For XQL API: date and time of query execution.
            
        
    -   Type: Indicates the type of query performed.
        
    -   PAPI Key ID: API Key ID used to execute XQL APIs.
        
    -   Query: The query description.
        
    -   Compute Unit Usage: Displays how many query units were used to execute the query.
        
    -   Tenant: Appears only in a Managed Security tenant. Displays which tenant executed an API query or Cold Storage query.
        
    
5.  Investigate the XQL API or Cold Storage query results.
    
    In the Compute Units Usage table, locate an XQL API or Cold Storage query, right-click, and select Show Results.
    
    The query is displayed in the query ﬁeld of the Query Builder, where you can view the query results. For more information, see How to build XQL queries.

## Manage instances
You can manage the instances configured for a data source on the Data Sources & Integrations page. You can edit, delete, enable, or disable instances, and refresh log data.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find an integration by clicking on a data source name in the table or filtering for it, then select the data source.
    
3.  Right click the relevant instance. From the menu, you can perform actions such as:
    
    -   Enable or disable an Instance.
        
    -   Refresh log data (by selecting Refresh).
        
    -   Edit the instance.
        
    -   Delete the instance.
        
        If you delete all the instances for a Data Source, the Data Source is not listed on the Data Sources & Integrations page.

### Add a new data source or instance

Use the Data Source Onboarder to add a new data source or instance in Cortex Cloud.

You can add a new data source with the Data Source Onboarder. The Onboarder installs the data source, sets up an instance, configures playbooks and scripts, and other recommended content. The Onboarder offers default (customizable) options and displays all configured content in a summary screen at the end of the process.

1.  Navigate to the Settings → Data Sources & Integrations page.
    
2.  Select one of the following options:
    
    -   Add a new data source: Click \+ Add New.
        
    -   Add a new data source integration instance: Select an existing data source and click Add Instance. Then skip to Step 4.
        
    
3.  Select a data source to onboard and click Add.
    
    Hovering over a data source displays information about the data source and its integrations. Data sources that are already integrated are highlighted green and show Connect Another Instance. To see details of existing integrations, click on the number of integrations.
    
    The data sources are drawn from the Marketplace, Custom Collectors, and integrations. If you search for a data source and No Data Sources Found, click Try searching the Marketplace, to view the marketplace page prefiltered for your search. If there are no available options in the Marketplace, you can use one of the Custom Collectors to build your own.
    
    **Note:**
    
    -   If a data source contains multiple integrations, the integration configured as the default integration will used by the Data Onboarder. The default integration of the content pack is indicated in each content pack's documentation. The other integrations are available for configuration in the Data Sources & Integrations page after installing the content pack.
        
    -   Not all content packs are supported.
        
    -   When adding XDR data sources, the Data Source Onboarder is not available. However, you can still enable the data source; Cortex Cloud creates an instance and lists it on the Data Sources & Integrations page.
        
    
4.  In the settings configuration pane, complete the mandatory fields in the Connect section.
    
    For more information about the fields, click the question mark icon.
    
5.  (Optional) Under Collect, select Fetched alerts and complete the fields.
    
6.  Under Recommended Content, review and customize the options.
    
    The items in this section are content-specific. Some options are view only, and others are customizable. Click on each option for more information:
    
    -   Classifiers & Mappers
        
    -   Data Normalization: Parsing rules and data models
        
    -   Correlations: Correlation rules included in the pack
        
    -   Automation: Playbooks and Scripts included in the pack.
        
        You can select the Playbooks and Scripts that you want to enable. By default, recommended options are selected. Any unselected content is added as disabled content. Depending on the selected playbook, some scripts are mandatory.
        
    -   Dashboards & Reports: Recommended dashboards, widgets, and reports
        
    
    **Notes:**
    
    -   If you are adding a new instance to an existing data source, these options are View only.
        
        You can adjust the view-only options on the relevant page in the system, for example Correlations, Playbooks, or Scripts.
        
    -   Cortex Cloud automatically installs content packs with required dependencies and updates any pre-installed optional content packs. You can also Select additional content packs with optional dependencies to be configured during connection.
        
    
7.  Test the configuration.
    
    If the test fails, you can Run Test & Download Debug Log to debug the error.
    
8.  Connect the data source.
    
9.  Review the configuration in the summary screen.
    
    If errors occurred during the test, you can click See Details and Back to Edit to revise your configuration. For advanced configuration, click on any item to open a new window to the relevant page in the system (for example, Correlations or Playbooks) filtered by the configuration.
    
10.  Click Finish to return to the Data Sources & Integrations page.

### Manage cloud instances

You can manage the cloud instances configured for a CSP on the Data Sources & Integrations page. You can check the status, edit, delete, enable, or disable instances, and initiate discovery scan.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find the cloud instance by clicking the CSP name or using the Search field.
    
3.  In the row for the cloud instance, click View Details. The Cloud Instances page is displayed, filtered by the CSP you selected.
    
4.  In the Cloud Instances page, you can filter the results by any heading and value.
    
5.  Click on an instance name to open the details pane for that instance.
    
6.  You can perform the following actions on each cloud instance:
    
    | Action | Instructions |
    | --- | --- |
    | Discover Now | To initiate a discovery scan, in the row for the cloud instance, right-click and select Discover Now. Alternatively, in the details pane, click the more options icon and select Discover Now. |
    | Enable/Disable | In the row for the cloud instance, right-click and select Enable or Disable. Alternatively, in the details pane, click the more options icon and select Enable or Disable. |
    | Delete | In the row for the cloud instance, right-click and select Delete. Alternatively, in the details pane, click the more options icon and select Delete. |
    | Create a new instance | Click New Instance and select the type of CSP of which you want to create a new instance. Follow the onboarding wizard to define its settings. |
    | Edit configuration | In the row for the cloud instance, right-click and select Configuration. Alternatively, in the details pane, click the edit button. Follow the onboarding wizard to edit the cloud instance's settings. (Optional) Under Show advanced settings, select Automation and select a log level for the automation integration logs. You must execute the updated template in the CSP environment for the configuration changes to be applied. |
    

#### Monitor cloud integration instance health

Monitoring cloud integration instance health ensures continuous, reliable operation, facilitating issue response and improving overall security posture.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  In the relevant cloud integration instance row, click the View Details link and then click a specific Instance Name.
    
    From the list of health statuses, you can click the following to see automation instance health status:
    
    -   Permissions: Shows any permission issues or missing permissions for the instance.
        
    -   Automation: Indicates any errors during automation instance creation or configuration.
        
        **Note:**
        
        Currently, automation permission errors or missing automation permissions do not affect the Automation health status. You can view any permission errors or missing permissions in the the Permissions health status.

### Update cloud permissions after Cortex release updates

Manage permission updates for your cloud instances following new feature releases or bug fixes.

This topic provides guidance on how to manage permission updates for your cloud instances following new feature releases or bug fixes. It outlines how users are notified of required permission changes and provides step-by-step instructions for granting necessary permissions to ensure continued functionality and security.

**Danger:**

-   Ensure that the user account used to modify permissions has the necessary privileges within both the Cortex platform and your cloud environment, for example, AWS or Azure.
    
-   You received a notification regarding a new version available that requires permission updates, or viewed a Needs Update status in the Data Sources & Integrations page.
    

#### Procedure

1.  Navigate to the Data Sources & Integrations page.
    
2.  Do the following to identify instances requiring updates:
    
    1.  For the relevant instance, locate the Update Status column.
        
    2.  Filter or sort by this column to quickly identify instances marked as Needs Update. The message on the page indicates the number of instances that need updating.
        
    
    **Note:**
    
    Instances requiring updates will not change their connection status, for example, Connected, Warning, Error, Disabled, due to the pending permission update.
    
3.  Do the following to access the connector's permissions section:
    
    1.  Click the name of the specific cloud connector instance that requires permission updates. The connector's detailed view appears.
        
    2.  Within the connector's detailed view, locate and select the permissions section.
        
    
4.  Review missing permissions. In the permissions section, the missing permission names or changes in permission scope is indicated.
    
5.  Follow the on-screen instructions to grant the required permissions, or refer to the specific permission names or scopes provided.
    
6.  After making the necessary permission adjustments, click Save or Apply Changes within the connector's configuration.
    
7.  Return to the Data Sources & Integrations page and verify that the updated status of the instance shows as up-to-date, or the update is in progress.
    
8.  Monitor the instance's health and functionality to confirm the changes have taken effect and the connector is operating as expected.
    
    If you encounter issues during the permission update process, check the generated health alerts for more specific details.

### Pending cloud instances
In Cortex Cloud, a pending cloud instance refers to a cloud instance created after Cortex Cloud generates an authentication template, but before that template has been fully executed within the Cloud Service Provider (CSP) environment.

A pending cloud instance is created each time you complete the onboarding wizard for a new CSP and click Save. You can view all cloud instances, including those in a pending state, by navigating to Cloud Instances. Ensure you remove any default filters that might exclude instances with a "pending" status.

A single pending instance can be leveraged to create multiple cloud instances, all sharing the same configurations defined during the cloud onboarding process. Pending instances are automatically deleted after 30 days.

#### Manage pending cloud instances

There are some actions that can be performed specifically on cloud instances with a status of "pending".

| Action | Instructions |
| --- | --- |
| Manually connect an instance | After the authentication template has been executed in the CSP, you can manually connect the Cortex Cloud cloud instance to the CSP by right-clicking the pending cloud instance and selecting Manually connect an instance. For more about this process, see Manually connect a cloud instance. |
| View Details | To review the configuration settings defined in the onboarding wizard for a pending instance, right-click the instance and select View Details. This is helps you distinguish between pending instances when you want to create a new cloud instance from an existing pending instance or when you want to manually connect an instance. |
| Re-download Connection Template | The authentication template that you download from the onboarding wizard is valid for seven days from when it was downloaded. If you want to create a new cloud instance from a pending instance after the authentication template has expired, you can right-click the pending instance and select Re-download Connection Template. You must then execute the template in the CSP. |
| Delete | To delete a pending instance, right-click the pending instance and select Delete. |

### Manage Kubernetes Connector instances

You can manage the Kubernetes Connector instances on the Data Sources & Integrations page. You can check the status, edit, or delete Kubernetes Connector instances.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find the Kubernetes instance by clicking on the Kubernetes name or using the Search field.
    
3.  In the row for the Kubernetes instance, click View Details. The Kubernetes Connectors page is displayed with all deployed Kubernetes Connectors. To view all Kubernetes clusters, including ones that are not yet deployed, go to the Kubernetes Connectivity Management page.
    
4.  In the Kubernetes Connectors page, click on a cluster name to open the details pane for that instance.
    
5.  You can perform the following actions on each Kubernetes Connector instance:
    
    | Action | Instructions |
    | --- | --- |
    | Open Cluster Details | In the details pane, click the more options icon and select Open Cluster Details. The Asset Card for that Kubernetes cluster is displayed. |
    | --- | --- |
    | Edit Connector | In the row for the Kubernetes instance, right-click and select Edit. Alternatively, in the details pane, click the more options icon and select Edit Connector. In Edit Kubernetes Connector, edit the configurations and click Apply Changes.You must execute the updated template in the Kubernetes environment for the configuration changes to be applied. |
    | Delete Connector | In the row for the Kubernetes instance, right-click and select Delete. Alternatively, in the details pane, click the more options icon and select Delete Connector. To remove the connector, you must manually run Kubernetes commands to delete the resources in the Kubernetes environment. The commands are listed [here](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#delete). |
    

#### Kubernetes Connectivity Management

Navigate to Settings → Data Sources & Integrations and find the Kubernetes instances by clicking on the Kubernetes name or using the Search field. In the Kubernetes Connectors page, click Kubernetes Connectivity Management to view all detected Kubernetes clusters. Here, you can check if a cluster is connected, view the status, and see the connector version. When a new version of the Kubernetes Connector is available, you can update it here.

**Note:**

After uninstalling the Kubernetes connector, the connector status updates to Not connected 48 hours after the uninstall process is initiated.

### Troubleshoot errors on cloud instances

You can troubleshoot errors on cloud instances by drilling down on an instance from the Data Sources & Integrations page.

To help you to troubleshoot errors on a cloud instance, Cortex Cloud provides the following visibility and drilldown options:

-   Overall status of an instance that indicates the health of your instance.
    
-   A breakdown of the security capabilities enabled on an instance, detailing the status of each capability along with any open errors or issues.
    
-   Additional XQL drill down options to query the history of error and recovery events for each security capability.
    

How to troubleshoot errors on a cloud instance

1.  Navigate to Settings → Data Sources & Integrations.
    
    Under Cloud Service Provider, review the status of the instances that were onboarded for the service provider. If the status shows Warning or Error, hover over the service provider and click View Details.
    
2.  On the Cloud Instances page review the list of instances that were onboarded and their overall status. The status is displayed as follows:
    
    -   Connected: The connector is enabled and has no issues.
        
    -   Warning: The connector is enabled and has minor issues. For example, some accounts or capabilities are in warning or error status.
        
    -   Error: The connector is enabled and has substantial errors. For example, an authentication failure, an outpost failure, major permissions issues, or (for organization level accounts) the majority of the accounts in the instance are in error status.
        
    -   Disabled: The connector is disabled.
        
    
3.  To understand why an instance is showing a Warning or Error status, click on the instance name.
    
    The cloud instance panel provides a breakdown of the security capabilities and the accounts onboarded on the instance. Review the information in the following sections:
    
    | Section | Context |
    | --- | --- |
    | Header | Displays the overall status of the instance and the following information about the account, as specified during onboarding: Scope of the instance: The number of accounts onboarded on the instance and their status. See the Accounts section for more information about the individual accounts and the type of account (single account or organization).; Scan mode: Cloud Scan or Outpost. For accounts using Outpost, information is displayed about the status of the Outpost account and the account ID.; Resource Tags: Tags defined during onboarding. |
    | Security Capabilities | Displays a breakdown of the security capabilities enabled on the instance and their individual statuses. Click on any item that shows a warning or error status to see the open errors and issues that contributed to the status: Errors are factual objects that are automatically created when problems occur, and provide insight into the current status of the capability. For example, if a permission is missing, an error is displayed. Browse and filter the errors to better understand and resolve the problem.; Issues are actionable objects that are triggered when detected problems exceed defined thresholds. Issues are manageable, trackable, and provide remediation suggestions and automations. The issues displayed in the panel are open issues that are specifically related to the selected connector with the selected capability in the observed scope (single account or organization). Click an issue to start investigating it. |
    | Accounts | Lists the accounts that are onboarded on the instance and their individual status. If multiple accounts are onboarded on the instance, click on each account to filter the page information by account, and drill-down to the security capability statuses for each account. |
    
4.  If the instance shows an Outpost error, go to the All Outposts page and find the outpost account that is being used by this instance. Right click the Outpost account to view the open errors and issues for the account.
    
5.  If the account shows Permission errors, use the side panel to check which permissions are missing. You can also Edit the instance to redeploy the cloud setup template, which should normally resolve the error.
    
6.  Further investigate errors by running XQL queries on the `cloud_health_auditing` dataset.
    
    This dataset records error and recovery events for the security capabilities in cloud instances. By querying this dataset you can see information about when the error started, the prevalence of the error, and whether there is a recurrency pattern. See the specific fields descriptions and query examples for each security capability.
    
    **Note:**
    
    Errors related to collection of audit logs in the cloud instance are recorded in the `collection_auditing` dataset. For more information, see Audit logs fields and query examples.
    
7.  Set up correlation rules to trigger issues when errors occur in cloud security capabilities. See the following examples.
    

#### Outpost fields and query examples

You can review Outpost entries in the `cloud_health_auditing` dataset to see Outpost activity over time, or to search for errors on specific accounts. Outpost entries are added to the dataset as follows:

-   An error occurred on an Outpost account that disabled or prevented an operation. This is audited as Error.
    
-   An exceptional condition occurred on an Outpost account that might cause problems if not resolved. This is audited as Warning.
    
-   The Outpost account returns to normal function. This is audited as Informational.
    

The following table describes the fields for Outpost entries:

| Field | Description |
| --- | --- |
| Account | Cloud account ID of the Outpost |
| Name | Category of the error, or a brief description of the event |
| Resource ID | Outpost ID |
| Capability | Outpost |
| Region | Region where the event occurred, or All regions. |
| Classification | Type of entry (Error, Warning, or Informational) |
| Message | Description of the error or Connected for informational entries. |
| Error | Details about the error. For informational entries this is blank. |

Example 152. Examples of Outpost queries

-   Identify Outpost errors on all Outpost accounts in the eu-west-3 region:
    
    ```
    dataset = cloud_health_auditing | filter capability = "Outpost" and classification = "Error" and region = "eu-west-3"
    ```
    
-   See all entries (error, warning, and recovery) for Outpost_1 on cloud account Account_A:
    
    ```
    dataset = cloud_health_auditing | filter capability = "Outpost" and resource_id = “Outpost_1” and account = "Account_A"
    ```
    

  

#### Permissions fields and query examples

You can review Permissions entries in the `cloud_health_auditing` dataset to see Permissions activity over time, or to search for errors on specific accounts. Permissions entries are added to the dataset as follows:

-   A permission problem was found. This is audited as Error.
    
-   An exceptional condition occurred that might cause problems if not resolved. This is audited as Warning.
    
-   A permission problem is resolved. This is audited as Informational.
    

The following table describes the fields for Permissions entries:

| Field | Description |
| --- | --- |
| Account | Name of the account where the event occurred, or All accounts. |
| Connector | Name of the connector where the event occurred |
| Name | Permission name |
| Capability | Permissions |
| Classification | Type of entry (Error, Warning, or Informational) |
| Message | Description of the error or Granted for informational entries. |

#### Discovery engine fields and query examples

You can review Discovery engine entries in the `cloud_health_auditing` dataset to see Discovery activity over time, or to search for errors on specific accounts. Discovery entries are added to the dataset as follows:

-   An API exec problem is found. This is audited as Error.
    
-   An exceptional condition occurred that might cause problems if not resolved. This is audited as Warning.
    
-   An API exec problem is resolved. This is audited as Informational.
    

The following table describes the fields for Discovery engine entries:

| Field | Description |
| --- | --- |
| Account | Name of the account where the event occurred, or All accounts |
| Connector | Name of the connector where the event occurred |
| Name | Asset name |
| Capability | Discovery |
| Region | Region where the event occurred, or All regions. |
| Classification | Type of entry (Error, Warning, or Informational) |
| Message | Description of the error or Connected for informational entries. |

Example 153. Examples of Discovery engine queries

-   Identify API exec errors on the Discovery engine for all accounts on the AWS_1 connector:
    
    ```
    dataset = cloud_health_auditing | filter capability = "Discovery" and connector = "AWS_1" and classification = “Error”
    ```
    
-   See all Discovery engine activity on connector AWS_1 for Account_ A in the af-south-1 region:
    
    ```
    dataset = cloud_health_auditing | filter capability = "Discovery" and connector = "AWS_1" and account = "accountA" and region = "af-south-1"
    ```
    

  

#### Agentless Disk Scanning (ADS) fields and query examples

You can review ADS entries in the `cloud_health_auditing` dataset to see ADS activity over time, or to search for errors on specific accounts. ADS entries are added to the dataset as follows:

-   ADS failed to scan an asset. This is audited as Failed.
    
-   ADS successfully scanned an asset. This is audited as Scanned.
    
-   The asset or host is not supported by ADS. This is audited as Unsupported.
    
-   The asset or Host was excluded from the scan. This is audited as Excluded.
    

| Field | Description |
| --- | --- |
| Account | Name of the account to which the asset belongs |
| Connector | ID of the connector |
| Name | Name of the asset |
| Resource ID | Asset ID |
| Capability | ADS |
| Region | Region where the asset is located |
| Classification | Type of entry (Failed, Unsupported, Excluded, Scanned) |
| Message | Description of the error, or Connected for informational entries. |
| Error | Details about the error. For informational entries this is blank. |
| Type | Type of asset that was scanned |
| Scope | Scope of the asset (Asset, Region, or Account) |

Example 154. Examples of ADS queries

-   Identify failed ADS scans on connector "a8df43e848dd42778ae7efd5a706a0fc" for EC2 assets at the asset scope level, filtered by region (northamerica-northeast2-a):
    
    ```
    dataset = cloud_health_auditing | filter capability = "ADS" and classification = "failed" and connector = “a8df43e848dd42778ae7efd5a706a0fc” and type = "EC2_INSTANCE" and scope = "Asset" and region = "northamerica-northeast2-a" 
    ```
    
-   See all ADS scans (failed and successful) on connector "a8df43e848dd42778ae7efd5a706a0fc" for EC2 assets belonging to Account_A:
    
    ```
    dataset = cloud_health_auditing | filter capability = "ADS" and connector = “a8df43e848dd42778ae7efd5a706a0fc” and type = "EC2" and account = “Account_A”
    ```
    

  

#### Data Security Scanning (DSPM) fields and query examples

You can review DSPM entries in the `cloud_health_auditing` dataset to see DSPM activity over time, or to search for errors on specific accounts. DSPM entries are added to the dataset as follows:

-   DSPM failed to scan an asset. This is audited as Failed.
    
-   DSPM successfully scanned an asset. This is audited as Success.
    

The following table describes the fields for DSPM entries:

| Field | Description |
| --- | --- |
| Account | Name of the account to which the asset belongs |
| Connector | Name of the connector where the event occurred |
| Name | Name of the asset |
| Resource ID | Asset ID |
| Capability | DSPM |
| Region | Region where the asset is located |
| Classification | Type of entry (Failed or Success) |
| Message | Description of the error, or Connected for informational entries. |
| Error | Details about the error. For informational entries this is blank. |
| Type | Type of asset that was scanned |
| Scope | Scope of the asset (Asset, Region, or Account) |

Example 155. Examples of DSPM queries

-   Identify failed DSPM scans on the AWS_1 connector for S3 asset types, filtered by region (ap-east-1):
    
    ```
    dataset = cloud_health_auditing | filter capability = "DSPM" and classification = “Error” and connector = “AWS_1” and type = "S3_BUCKET" and region = "ap-east-1"
    ```
    
-   See all DSPM scans (failed and successful) on the AWS_1 connector, for all scanned assets on Account_A:
    
    ```
    dataset = cloud_health_auditing | filter capability = "DSPM" and account = "Account_A" and connector = “AWS_1”
    ```
    

  

#### Registry scanning fields and query examples

You can review Registry scanning entries in the `cloud_health_auditing` dataset to see Registry scanning activity over time, or to search for errors on specific accounts. Registry scanning entries are added to the dataset as follows:

-   The Registry scanner failed to scan an asset. This is audited as Failed.
    
-   The Registry scanner successfully scanned an asset. This is audited as Scanned.
    

The following table describes the fields for Registry scanning entries:

| Field | Description |
| --- | --- |
| Account | Name of the account to which the asset belongs |
| Connector | Name of the connector where the event occurred |
| Resource ID | Asset ID |
| Capability | Registry |
| Classification | Type of entry (Scanned or Failed) |
| Error | Details about the error. For informational entries this is blank |
| Scope | Scope of the asset (Asset or Account) |

Example 156. Examples of Registry scanning queries

-   Identify failed scans on connector GCP_1:
    
    ```
    dataset = cloud_health_auditing | filter capability = "Registry" and classification = “error” and connector = “GCP_1”
    ```
    
-   Review all registry scans (failed and successful) on connector GCP_1 for asset Asset_A:
    
    ```
    dataset = cloud_health_auditing | filter capability = "Registry" and connector = “GCP_1” and ressource_id = "Asset_A"
    ```
    

  

#### Audit logs fields and query example

You can review Audit logs entries in the `collection_auditing` dataset. Querying this dataset can help you see the connectivity changes of an instance over time, the escalation or recovery of the connectivity status, and the error, warning, and informational messages related to status changes. For more information about this dataset, see Verify collector connectivity.

The following table describes the fields for Audit logs entries:

| Field | Description |
| --- | --- |
| Instance | Instance name |
| Log type | Type of logs affected |
| Classification | Type of entry (Error, Warning, or Informational) |
| Collector type | Type of the collector |
| Description | Description of the error, or Connected for informational entries. |

Example 157. Audit logs query example

Identify disruptions (errors) in audit log collection on connector AWS_1:

```
dataset = collection_auditing | filter instance = “AWS_1” and log_type = "Audit Logs" and classification = “Error”
```

  

#### Correlation rule examples

The following examples show how to set up correlation rules to trigger Health Collection issues when errors occur on a specific security capability.

Example rule for DSPM errors

In this example, a correlation rule will trigger a Health Collection issue if a DSPM scan fails on an AWS_S3 asset on the AWS_1 connector.

Example XQL:

```
dataset = cloud_health_auditing | filter capability = "DSPM" and classification = “Error” and type = "AWS_S3" and scope = "Asset" and connector = “AWS_1”
```

Additional fields to specify in the correlation rule:

| Field | Value |
| --- | --- |
| Time Schedule | Hourly |
| Query time frame | 1 Hour |
| Issue Suppression | Select Enable issue suppression. |
| Action | Select Generate Issue. |
| Issue Domain | Health |
| Severity | Medium |
| Category | Collection |

Example rule for Outpost errors

In this example, a correlation rule will trigger a Health Collection issue if an error is recorded on account Outpost_A in the us-east-1 region.

Example XQL:

```
dataset = cloud_health_auditing | filter capability = "Outpost" and account = "Outpost_A" and region = "eu-west-3" and classification = "Error"
```

Additional fields to specify in the correlation rule:

| Field | Value |
| --- | --- |
| Time Schedule | Hourly |
| Query time frame | 1 Hour |
| Issue Suppression | Select Enable issue suppression. |
| Action | Select Generate Issue. |
| Issue Domain | Health |
| Severity | Medium |
| Category | Collection |

### Monitor serverless function scan health and status
You can monitor and manage the health and status of your integrated serverless function scans through detailed insights. By tracking and analyzing scan data, you can troubleshoot errors and mitigate detected vulnerabilities, ensuring the overall health of your serverless functions.

#### How to access serverless function scan health management

1.  Navigate to Settings → Data Sources (under Data Collection).
    
2.  Hover over a Cloud Service Provider (such as Amazon Web Services (AWS) → View Details.
    
3.  Right-click on an instance on the Cloud Instances page → Details.
    
    The status of the latest serverless function scan for this cloud provider instance is displayed in the Serverless Scanning field under Security Capabilities.
    
4.  Select Serverless Scanning to open the capability card providing details of the latest serverless function including a status bar and the following data:
    
    -   Total Assets: A summary of the serverless function assets scanned including:
        
        -   Success: The number of serverless function assets that were successfully scanned without detecting any security vulnerabilities according to the defined scan policies
            
        -   Issues: The number of serverless function assets where one or more security vulnerabilities, misconfigurations, or other potential problems were identified during the scan
            
        -   Excluded: The number of serverless function assets that were excluded from the scan
            
        -   Unsupported: The number of serverless function assets that could not be scanned due to limitations in the scanning tool's capabilities or incompatibility with the specific type or configuration of these assets
            
        -   Pending: The number of serverless function assets that are currently awaiting scanning or whose scan results are still being processed. These assets have not yet been fully assessed, and their final status is yet to be determined
            
        
    -   Errors: Lists the serverless function scan errors from the Health log in an inventory table. Selecting an item from the Account Name column opens the All Assets inventory page (in a new tab) filtered by the serverless function asset. Clicking on the asset opens a description card with details of the error including the account, region, asset and timestamp, as well as the code in which the error was detected

## About health issues

Cortex Cloud provides health issues to help you monitor the health and integrity of supported Cortex Cloud resources. Health issues comprise ingestion, collection, correlation, and event forwarding errors.

**Prerequisite:**

For Cortex Cloud to monitor data ingestion health and create health issues, you must enable the following settings under Configurations:

Cortex - Analytics: Go to Configurations → Cortex - Analytics. For more information, see Enable the Analytics Engine and Identity Analytics.Enable the Analytics Engine and Identity Analytics

Cortex Cloud provides health issues to help you monitor the health and integrity of supported Cortex Cloud resources. Health issues provide insights into health drifts, such as failure events or status changes. The issues help you stay on top of your health related errors and ensure optimal performance in Cortex Cloud. In addition, you can set up notifications on health issues.

Health issues are associated with the Health Domain. When setting up notification forwarding or other configurations for health issues, use the filter Issue Domain = Health.

To view health issues, go to Settings → Health Issues, or on the Issues page select the Health Domain table view. Click an issue to see more details in the issue card, or right-click to take actions and investigate an issue. For more information, see Investigate and resolve health issues.

**Note:**

The Health Issues page displays issues that were triggered after July 2024. To see health issues that were triggered before this date, click Legacy Health Issues.

### Types of health issues

Cortex Cloud provides the following types of OOTB health issues:

-   **Ingestion issues**: Triggered by interruptions in data ingestion, or deviation from the calculated ingestion baseline
    
-   **Correlation issues**: Triggered by correlation rules that complete with an error status
    
-   **Automation issues**: Triggered by system monitoring of metrics and thresholds for potential automation misconfigurations that can cause performance issues. Automation issues are processed daily to provide an aggregated status of multiple threshold crossings.
    

**Note:**

Cortex Cloud enforces the dedup logic to health issues. This logic reduces the likelihood of identical health issues from flooding the issues dataset.

### Query health issue data

Health issues are associated with the Health domain. To query health issue data, use the following XQL:

```
dataset = alerts | filter alert_domain = "DOMAIN_HEALTH"
```

### Health issue field descriptions

The following table describes the health issue fields.

| Field | Description |
| --- | --- |
| Issue ID | A unique identifier that Cortex Cloud assigns to each issue. |
| Issue Name | Name of the issue. |
| Issue Type | Type of health issue. |
| Issue Source | Source of the issue. |
| Broker VM ID | ID of the Broker VM. |
| Broker VM Name | Host name of the Broker VM. |
| Broker VM IP | IP address of the Broker VM. |
| Collector Name | Name of the collector instance. |
| Collector Type | Type of the collector. |
| Description | Text summary of the event including the issue source, issue name, and severity. |
| Device ID | Firewall device ID. |
| Excluded | Whether the issue is excluded. |
| External ID | Issue ID as recorded in the detector from which this issue was sent. |
| Final Reporting Device IP | IP of the device from which the log was extracted. |
| Final Reporting Device Name | Hostname of the device from which the log was extracted. |
| Ingestion Failure Duration | Amount of time that logs were not received or a drop in log ingestion was detected in minutes. |
| Observation Time | Time that the issue was observed in the system. |
| Playbook | Playbook that was run. |
| Playbook run status | Status of the playbook. |
| Product | Product name of the observing data source. |
| Resolution Status | Status that was assigned to this issue when it was triggered (or modified). Right-click an issue to change the status. If you set the status to Resolved, select a resolution reason. |
| Reporting Device Name | Host name of the device where the log originated. |
| Reporting Device IP | IP Address of the device where the log originated. |
| Severity | Severity level that was assigned to this issue when it was triggered (or modified). |
| Starred | Whether the issue is starred by starring configuration. |
| Vendor | Vendor of the observing data source. |
| XDR Collector ID | ID of the XDR Collector. |
| XDR Collector IP | IP address of the XDR Collector. |
| XDR Collector Name | Host name of the XDR Collector. |

### Investigate and resolve health issues

You can investigate and take action on health issues from the Health Issues page and the Issues Table.

The following tasks explain how to investigate and resolve health issues. You can see health issues on the following pages:

-   Go to Settings → Health Issues
    
-   Go to Cases & Issues → Issues and change the table view to Health Domain.
    

#### Investigate data ingestion errors

A data ingestion issue identifies disruption in the data ingestion pipeline. For example, a data source is not sending logs, or there is a significant drop in log collection compared to the calculated ingestion baseline.

1.  Identify the error: Type = Ingestion.
    
2.  Right-click and select Investigate in XQL query.
    
    The Query Builder opens and runs a prefilled query to display related data ingestion metrics entries.
    
3.  Review the query results.
    
    The results provide context for the issue and the events leading up to it. For more information about data ingestion metrics and setting up correlation rules with your own data ingestion logic, see Monitor data ingestion health.
    
4.  Investigate data collector errors. Return to the Health Issues page, right-click the issue, and select Pivot to views → View collector details.
    
    Depending on the type of collector in error, the relevant data collector settings page opens, filtered by data collector.
    

#### Investigate correlation errors

A correlation issue identifies errors in your correlation rules.

1.  Identify the error: Type = Correlation.
    
2.  Right-click and select Investigate Correlation Auditing.
    
    The Query Builder opens and runs a prefilled query to display related correlation execution records.
    
3.  Review the query results.
    
    Identify the correlation rule in error and take steps to resolve the error. For more information about how Cortex Cloud identifies correlation rule errors, see Monitor correlation rules.
    

#### Investigate automation errors

Automation issues identify potential misconfigurations in automations, enabling you to take a proactive approach to fixing misconfiguration issues before they affect system performance.

1.  Identify the error: Type = Automation.
    
2.  Click the automation health issue to view the details of the related case or component.
    
3.  Based on the details of the automation health issue, review any related automations, such as playbooks and integrations, for possible misconfigurations.
