# Onboard and configure Cortex Cloud

Learn about the deployment preparation and procedures to onboard and configure Cortex Cloud.

Plan and prepare your Cortex Cloud deployment. Then, activate and configure your Cortex Cloud tenant using the Deployment steps.

Onboard your cloud assets for automation and core analytics, data ingestion, enterprise runtime security, cloud posture security and cloud runtime security.

Depending on your license and add-ons, onboard your cloud assets and modules.

## Plan and prepare

Learn more about deployment considerations and onboarding steps.

### Prepare for deployment

Before you get started with Cortex Cloud, consider the following:

-   Determine the amount of log storage you need for your Cortex Cloud deployment. Talk to your partner or sales representative to determine whether you must purchase additional storage within the Cortex Cloud tenant.
    
-   Determine the region in which you want to host Cortex Cloud and any associated services, such as Directory Sync Service. If you plan to stream data from a Strata Logging Service instance, it must be in the same region as Cortex Cloud. For more information, see Cortex Cloud supported regions.

## Deployment steps and checklist

Review the steps to onboard and configure Cortex Cloud.

Review the plan and prepare considerations, and then use the onboarding checklist to deploy and onboard successfully Cortex Cloud.

-   **Step 1**: Activate Cortex Cloud. Activate and log in to Cortex Gateway.
    
-   **Step 2**: Configure user roles and access.
    
-   **Step 3**: Onboard data sources.
    
-   Perform a health check.

### Activate Cortex Cloud

Learn how to activate your tenant.

To activate a tenant, you need to log in to Cortex Gateway, a centralized portal for activating and managing tenants, users, roles, and user groups. After activating the tenant, you can then access the tenant. You must repeat this task for each tenant if you have multiple tenants. The activation process involves accessing Cortex Gateway, activating the tenant, and then accessing the tenant's resources.

**Prerequisite:**

-   The Cortex Cloud activation email.
    
-   A Customer Support Portal (CSP) account.
    
    You need to set up your CSP account. For more information, see [How to Create Your CSP User Account](https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClNVCA0).
    
    When you create a CSP account, you can set up two-factor authentication (2FA) to log into the CSP by using an Email, Okta Verify, or Google Authenticator (non-FedRAMP accounts). For more information, see [How to Enable a Third Party IdP](https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA14u000000sZ8mCAE).
    
-   You have one of the following roles assigned:
    
    | Role | Description |
    | --- | --- |
    | CSP role | The Super User role is assigned to your CSP account. The user who creates the CSP account is granted the Super User role. |
    | Cortex role | You must have the Account Admin role. If you are the first user to access Cortex Gateway with the CSP Super User role, you are automatically granted Account Admin permissions for the Cortex Gateway. You can also add Account Admin users as required. In the Cortex Gateway, you can activate new tenants, access existing tenants, and create and manage role-based access control (RBAC) for all of your tenants. |
    

How to activate Cortex Cloud

1.  Log in to [Cortex Gateway](https://cortex-gateway.paloaltonetworks.com/signin/).
    
    You can also access the link from the activation email.
    
2.  Enter your username and password or multi-factor authentication (if set up) by using your Customer Support Portal account credentials to sign in.
    
    After you sign in, you can view the following:
    
    -   If you are a CSP Account Admin, you can see tenants allocated to your CSP account and ready for activation. After activation, you cannot move your tenant to a different CSP account.
        
    -   Tenant details such as license type, number of endpoints, and purchase date.
        
    -   Tenants that were activated and are now available. If you have more than one Customer Support Portal account, the tenants are displayed according to the Customer Support Portal account name.
        
    
3.  In the Available for Activation section, use the serial number to locate the tenant that needs activation, and then click Activate.
    
4.  On the Tenant Activation page, define the following:
    
    | Parameter | Description |
    | --- | --- |
    | Tenant Name | Enter the name of the tenant. Use a unique name across your company account up to 59 characters long. |
    | Region |  |
    | Tenant Subdomain | DNS record associated with your tenant. Enter a name that will be used to access the tenant directly using the full URL: `https://<subdomain>xdr.<region>.paloaltonetworks.com` |
    
5.  Review and agree to the terms and conditions of the Privacy policy, Terms of Use, and EULA , and then Activate your tenant.
    
    **Note:**
    
    Activation can take about an hour and does not require you to remain on the activation page. Cortex Cloud sends a notification to your email when the process is complete.
    
6.  After activation, from Cortex Gateway, in the Available Tenants, when hovering over the activated tenant, do the following:
    
    -   Ensure that you can successfully access the tenant by clicking the Cortex Cloud tenant name (when the tenant is active).
        
    -   In the dialog box, view the tenant status, region, serial number, and license details.
        
        **Note:**
        
        You can only change the subdomain once, and it cannot be undone.
        
        After deleting the subdomain, you can reuse it after 7 days.
        
    
7.  Enable and verify access to  Cortex Cloud communication servers, storage buckets, and various resources in your firewall configuration. For more information, see Enable access to required PANW resources.

#### Cortex Cloud supported regions

Supported regions in which you want to host Cortex Cloud and any associated services.

The following table lists the regions available to host Cortex Cloud and any associated Cortex services:

##### Americas

| Country | Description |
| --- | --- |
| US (United States) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of the United States. |
| Brazil (BR) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Brazil. |
| Canada (CA) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Canada. However, if you have a WildFire Canada cloud subscription, consider the following: You cannot send file submissions for bare-metal analysis.; You will not be protected against macOS-borne zero-day threats. However, you will receive protection against other macOS malware in regular WildFire updates. |

##### EMEA (Europe, the Middle East, Africa)

| Country | Description |
| --- | --- |
| France (FA) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of France. |
| Germany (DE) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Germany. |
| Israel (IL) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Israel. |
| Italy (IT) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Italy. |
| Netherlands (Europe) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Europe. |
| Poland (PL) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Poland. |
| Qatar (QT) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Qatar. |
| Saudi Arabia (SA) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Saudi Arabia. |
| South Africa (ZA) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of South Africa. |
| Spain (ES) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Spain. |
| Switzerland (CH) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Switzerland. |
| UK (United Kingdom) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of the United Kingdom. |

##### JPAC (Asia-Pacific)

| Country | Description |
| --- | --- |
| Australia (AU) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Australia. |
| Delhi (DL) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Delhi. |
| India (IN) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of India. |
| Indonesia (ID) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Indonesia. |
| Japan (JP) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Japan. |
| Singapore (SG) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Singapore. |
| South Korea (KR) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of South Korea. |
| Taiwan (TW) | All Cortex Cloud logs and ingested data remain hosted within the boundaries of Taiwan. |

#### Enable access to required PANW resources

Learn more about enabling network access to the Cortex Cloud resources.

After you receive your account details, enable and verify access to  Cortex Cloud communication servers, storage buckets, and various resources in your firewall configuration. Some of the IP addresses required for access are registered in the United States. As a result, some GeoIP databases do not correctly pinpoint the location where IP addresses are used. All customer data is stored in your deployment region, regardless of the IP address registration, and data transmission is restricted through any infrastructure to that region.

Before configuring your firewall, review these guidelines:

-   Palo Alto Networks App-IDs (firewall policy): If you are using a Palo Alto Networks Firewall, you can simplify your configuration by using App-IDs. If you add the specific App-IDs (for example, `cortex-xdr`, `traps-management-service`) to your firewall security policy, you do not need to allow specific IP addresses listed below manually
    
-   App-ID limitations: A dash (—) indicates there is no App-ID coverage for a specific resource. For these rows, you must configure your firewall to allow access based on the IP address and port.
    
-   Rule direction: Enable access from the Cortex XDR Agent to the tenant (outbound); this traffic does not need to be bidirectional.
    
-   Google Cloud Platform (GCP): For resources listing IP ranges in the GCP, go to the official JSON feeds for the specific IP addresses required for your deployment:
    
    -   Global subnets: [https://www.gstatic.com/ipranges/goog.json](https://www.gstatic.com/ipranges/goog.json)
        
    -   Regional ranges: [https://www.gstatic.com/ipranges/cloud.json](https://www.gstatic.com/ipranges/cloud.json)
        
    
-   SSL decryption: If you use SSL decryption and experience difficulty connecting the Cortex XDR agent to the server, we recommend that you add the FQDNs required for access to your SSL Decryption Exclusion list in Device → Certificate Management → SSL Decryption Exclusion.
    

**Note:**

**``_`<tenant-name>`_``** refers to the selected subdomain of your Cortex Cloud tenant, and **``_`<region>`_``** is the region in which your tenant is deployed. For more information, see Cortex Cloud supported regions.

The following table lists the required resources by region, including FQDNs, IP addresses, ports, and App-ID coverage for your deployment:

| FQDN | IP Addresses and Port | App-ID Coverage |
| --- | --- | --- |
| **Egress** |
| **``_`<tenant-name>`_.xdr._`<region>`_.paloaltonetworks.com``** Used to connect to the Cortex Cloud tenant. | IP address by region: US (United States): 35.244.250.18:443; EU (Europe): 35.227.237.180:443; CA (Canada): 34.120.31.199:443; UK (United Kingdom): 34.120.87.77:443; JP (Japan): 35.241.28.254:443; SG (Singapore): 34.117.211.129:443; AU (Australia): 34.120.229.65:443; DE (Germany): 34.98.68.183:443; IN (India): 35.186.207.80:443; DL (Delhi): 34.8.67.192:443; CH (Switzerland): 34.111.6.153:443; PL (Poland): 34.117.240.208:443; TW (Taiwan): 34.160.28.41:443; QT (Qatar): 35.190.0.180:443; FA (France): 34.111.134.57:443; IL (Israel): 34.111.129.144:443; SA (Saudi Arabia): 35.244.157.127:443; ID (Indonesia): 34.111.58.152:443; ES (Spain): 34.111.188.248:443; IT (Italy): 34.8.224.70:443; KR (South Korea): 34.54.5.247:443; ZA (South Africa): 34.149.165.12:443; BR (Brazil): 34.96.83.202:443 | **`cortex-xdr`** |
| **`distributions.traps.paloaltonetworks.com`** Used for the first request in registration flow where the agent passes the distribution id and obtains the **``ch-_`<tenant-name>`_.traps.paloaltonetworks.com``** of its tenant. | IP address: 35.223.6.69; Port: 443 | **`traps-management-service`** |
| **``https://lrc-_`<region>`_.paloaltonetworks.com``** **``wss://lrc-_`<region>`_.paloaltonetworks.com``** Used in live terminal flow. | IP address by region: US (United States): 35.190.88.43:443; EU (Europe): 35.244.251.25:443; CA (Canada): 35.203.99.74:443; UK (United Kingdom): 35.242.159.176:443; JP (Japan): 34.84.201.32:443; SG (Singapore): 34.87.61.186:443; AU (Australia): 35.244.66.177:443; DE (Germany): 34.107.61.141:443; IN (India): 35.200.146.253:443; DL (Delhi): 34.131.116.135:443; CH (Switzerland): 34.65.213.226:443; PL (Poland): 34.118.62.80:443; TW (Taiwan): 34.80.34.30:443; QT (Qatar): 34.18.34.73:443; FA (France): 34.163.57.57:443; IL (Israel): 34.165.43.106:443; SA (Saudi Arabia): 34.166.54.6:443; ID (Indonesia): 34.101.214.157:443; ES (Spain): 34.175.18.78:443; IT (Italy): 34.154.154.5:443; KR (South Korea): 34.22.66.91:443; ZA (South Africa): 34.35.56.170:443; BR (Brazil): 34.151.236.197:443 | **`cortex-xdr`** |
| **`panw-xdr-installers-prod-us.storage.googleapis.com`** Used to download installers for upgrade actions from the server. This storage bucket is used for all regions. | IP ranges in GCP; Port: 443 | **`cortex-xdr`** |
| **`panw-xdr-payloads-prod-us.storage.googleapis.com`** Used to download the executable for the live terminal for XDR agents earlier than version 7.1.0. This storage bucket is used for all regions. | IP ranges in GCP; Port: 443 | **`cortex-xdr`** |
| **`global-content-profiles-policy.storage.googleapis.com`** Used to download content updates. | IP ranges in GCP; Port: 443 | **`cortex-xdr`** |
| **``panw-xdr-evr-prod-_`<region>`_.storage.googleapis.com``** Used to download extended verdict request results in scanning. | IP ranges in GCP; Port: 443 | **`cortex-xdr`** |
| **``https://_`<region>`_-docker.pkg.dev``** Used to download the Kubernetes image from the registry for Kubernetes agents installation. \*\*Note:\*\* Refer to **Regional Docker registry mapping** for your specific tenant location and corresponding Docker registry URL. | IP ranges in GCP; Port: 443 |  |
| **Regional Docker registry mapping** |
| **Tenant location** | **GCP region** | **Registry URL** |
| UK Netherlands (EU) United States (US) Canada (CA) South Korea (KR) Singapore (SG) Australia (AU) Japan (JP) India (IN) Germany (DE) France (FR) | europe-west2 europe-west4 us-central1 northamerica-northeast1 asia-northeast3 asia-southeast1 australia-southeast1 asia-northeast1 asia-south1 europe-west3 europe-west9 | europe-west2-docker.pkg.dev europe-west4-docker.pkg.dev us-central1-docker.pkg.dev northamerica-northeast1-docker.pkg.dev asia-northeast3-docker.pkg.dev asia-southeast1-docker.pkg.dev australia-southeast1-docker.pkg.dev asia-northeast1-docker.pkg.dev asia-south1-docker.pkg.dev europe-west3-docker.pkg.dev europe-west9-docker.pkg.dev |
| **``dc-_`<tenant-name>`_.traps.paloaltonetworks.com``** Used for EDR data upload. | IP address by region: US (United States): 34.98.77.231:443; EU (Europe): 34.102.140.103:443; CA (Canada): 34.96.120.25:443; UK (United Kingdom): 35.244.133.254:443; JP (Japan): 34.95.66.187:443; SG (Singapore): 34.120.142.18:443; AU (Australia): 34.102.237.151:443; DE (Germany): 34.107.161.143:443; IN (India): 34.120.213.187:443; DL (Delhi): 136.110.132.208:443; CH (Switzerland): 34.149.180.250:443; PL (Poland): 35.190.13.237:443; TW (Taiwan): 34.149.248.76:443; QT (Qatar): 34.107.129.254:443; FA (France): 34.36.155.211:443; IL (Israel): 34.128.157.130:443; SA (Saudi Arabia): 34.107.213.85:443; ID (Indonesia): 34.128.156.84:443; ES (Spain): 34.120.102.147:443; IT (Italy): 34.8.234.58:443; KR (South Korea): 34.54.155.245:443; ZA (South Africa): 35.190.79.68:443; BR (Brazil): 136.110.146.246:443 | **`traps-management-service`** |
| **``ch-_`<tenant-name>`_.traps.paloaltonetworks.com``** Used for all other requests between the agent and its tenant server, including heartbeat, uploads, action results, and scan reports. | IP address by region: US (United States): 34.98.77.231:443; EU (Europe): 34.102.140.103:443; CA (Canada): 34.96.120.25:443; UK (United Kingdom): 35.244.133.254:443; JP (Japan): 34.95.66.187:443; SG (Singapore): 34.120.142.18:443; AU (Australia): 34.102.237.151:443; DE (Germany): 34.107.161.143:443; IN (India): 34.120.213.188:443; DL (Delhi): 136.110.132.208:443; CH (Switzerland): 34.149.180.250:443; PL (Poland): 35.190.13.237:443; TW (Taiwan): 34.149.248.76:443; QT (Qatar): 34.107.129.254:443; FA (France): 34.36.155.211:443; IL (Israel): 34.128.157.130:443; SA (Saudi Arabia): 34.107.213.85:443; ID (Indonesia): 34.128.156.84:443; ES (Spain): 34.120.102.147:443; IT (Italy): 34.8.234.58:443; KR (South Korea): 34.54.155.245:443; ZA (South Africa): 35.190.79.68:443; BR (Brazil): 136.110.146.246:443 | **`traps-management-service`** |
| **``api-_`<tenant-name>`__`.xdr.`__`<region>`_.paloaltonetworks.com``** Used for API requests and responses and to connect to an engine. | IP address by region: US (United States): 35.222.81.194:443; EU (Europe): 34.90.67.58:443; CA (Canada): 35.203.82.121:443; UK (United Kingdom): 34.89.56.78:443; JP (Japan): 34.84.125.129:443; SG (Singapore): 34.87.83.144:443; AU (Australia): 35.189.18.208:443; DE (Germany): 34.107.57.23:443; IN (India): 35.200.158.164:443; DL (Delhi): 34.131.165.103:443; CH (Switzerland): 34.65.248.119:443; PL (Poland): 34.116.216.55:443; TW (Taiwan): 35.234.8.249:443; QT (Qatar): 34.18.46.240:443; FA (France): 34.155.222.152:443; IL (Israel): 34.165.156.139:443; SA (Saudi Arabia): 34.166.58.79:443; ID (Indonesia): 34.128.115.238:443; ES (Spain): 34.175.30.176:443; IT (Italy): 34.154.195.120:443; KR (South Korea): 34.64.54.175:443; ZA (South Africa): 34.35.64.191:443; BR (Brazil): 34.39.136.78:443 | — |
| **``cc-_`<tenant-name>`_.traps.paloaltonetworks.com``** Used for get-verdict requests. | IP address by region: US (United States): 35.224.140.142:443; EU (Europe): 34.90.71.103:443; CA (Canada): 35.203.35.23:443; UK (United Kingdom): 34.89.42.214:443; JP (Japan): 34.84.225.105:443; SG (Singapore): 35.247.161.94:443; AU (Australia): 35.201.23.188:443; DE (Germany): 35.242.201.199:443; IN (India): 35.244.57.196:443; DL (Delhi): 34.131.47.126:443; CH (Switzerland): 34.65.137.215:443; PL (Poland): 34.116.213.71:443; TW (Taiwan): 35.229.186.216:443; QT (Qatar): 34.18.53.229:443; FA (France): 34.155.110.169:443; IL (Israel): 34.165.2.110:443; SA (Saudi Arabia): 34.166.53.160:443; ID (Indonesia): 34.101.155.198:443; ES (Spain): 34.175.205.166:443; IT (Italy): 34.154.230.76:443; KR (South Korea): 34.64.228.117:443; ZA (South Africa): 34.35.13.198:443; BR (Brazil): 34.39.195.104:443 | **`traps-management-service`** |
| **Broker VM Resources** Required for deployments that use Broker VM features |
| [xdr-ova-installers-prod-us.storage.googleapis.com](http://xdr-ova-installers-prod-us.storage.googleapis.com) Used to download Broker VM images from the server. This storage bucket is used for all regions. | IP ranges in GCP; Port: 443 | **`cortex-xdr`** |
| **``br-_`<tenant-name>`__`.xdr.`__`<region>`_.paloaltonetworks.com``** | IP address by region: US (United States): 104.155.131.72:443; EU (Europe): 34.91.128.226:443; CA (Canada): 34.95.8.232:443; UK (United Kingdom): 35.197.219.110:443; JP (Japan):34.85.74.43:443; SG (Singapore): 34.87.167.125:443; AU (Australia): 35.244.93.0:443; DE (Germany): 35.198.112.13:443; IN (India): 35.200.234.99:443; DL (Delhi): 34.131.131.141:443; CH (Switzerland): 34.65.51.103:443; PL (Poland): 34.116.176.97:443; TW (Taiwan): 34.80.230.166:443; QT (Qatar): 34.18.37.73:443; FA (France): 34.155.90.61:443; IL (Israel): 34.165.24.222:443; SA (Saudi Arabia): 34.166.55.153:443; ID (Indonesia): 34.101.101.170:443; ES (Spain): 34.175.182.55:443; IT (Italy): 34.154.168.139:443; KR (South Korea): 34.64.46.249:443; ZA (South Africa): 34.35.45.251:443; BR (Brazil): 35.198.38.182:443 | — |
| **`distributions.traps.paloaltonetworks.com`** | IP address: 35.223.6.69; Port: 443 | **`traps-management-service`** |
| **`time.google.com`**; **`pool.ntp.org`** | UDP port: 123 | — |
| **App Login and Authentication** |
| identity.paloaltonetworks.com (SSO) | IP address: 34.120.119.85; Port: 443 | — |
| login.paloaltonetworks.com (SSO) | IP address: 34.102.139.110; Port: 443 | — |
| **In-App Help Center and Notifications** |
| data.pendo.io | Port: 443 | — |
| pendo-static-5664029141630976.storage.googleapis.com | Port: 443 | — |
| **Email Notifications** |
| — | IP address for all regions: 159.183.150.248 | — |
| **Ingress** These IPs are used for communication between Cortex Cloud and your resources. Use them when sending data out from your tenant. | | | US (United States)- 34.132.108.184; 34.69.63.16
; EU (Europe)-   34.147.107.51; 34.91.26.125
; CA (Canada)-   35.203.108.13; 35.203.101.162
; UK (United Kingdom)-   35.242.180.163; 34.105.173.229
; JP (Japan)-   35.200.3.131; 34.146.181.233
; SG (Singapore)-   35.240.243.57; 34.126.183.208
; AU (Australia)-   34.151.83.236; 34.116.67.90
; DE (Germany)-   35.234.118.195; 34.89.183.45
; IN (India)-   35.200.175.78; 34.93.9.198
; CH (Switzerland)-   34.65.108.153; 34.65.155.169
; PL (Poland)-   34.118.48.171; 34.116.202.235
; TW (Taiwan)-   34.80.133.68; 35.234.18.10
; QT (Qatar)-   34.18.34.118; 34.18.39.155
; FA (France)-   34.155.5.117; 34.155.41.247
; IL (Israel)-   34.165.33.165; 34.165.27.131
; SA (Saudi Arabia)-   34.166.61.81; 34.166.58.213
; ID (Indonesia)-   34.128.126.138; 34.128.82.158
; ES (Spain)-   34.175.46.46; 34.175.80.182
; IT (Italy)-   34.154.23.156; 34.154.186.12
; KR (South Korea)-   34.64.93.168; 34.64.237.45
; ZA (South Africa):-   34.35.42.196; 34.35.79.219 | **`cortex-xdr`** |
| **Outbound IPs for engines** | | | IP addresses by region US (United States)- 35.225.156.101; 34.69.88.119
; EU (Europe)-   34.147.67.188; 34.90.16.31
; CA (Canada)-   35.203.57.162; 35.203.90.79
; UK (United Kingdom)-   34.142.3.42; 34.142.44.136
; JP (Japan)-   34.146.60.215; 34.84.93.160
; SG (Singapore)-   35.240.144.192; 35.240.255.15
; AU (Australia)-   35.244.73.76; 35.201.22.63
; DE (Germany)-   34.107.83.197; 34.159.53.97
; IN (India)-   35.244.5.205; 34.93.118.113
; DL (Delhi)-   34.131.207.151; 34.126.212.40
; CH (Switzerland)-   34.65.222.25; 34.65.233.60
; PL (Poland)-   34.118.92.214; 34.116.223.119
; TW (Taiwan)-   104.199.223.229; 34.81.38.132
; QT (Qatar)-   34.18.39.0; 34.18.32.96
; FA (France)-   34.155.197.131; 34.155.5.100
; IL (Israel)-   34.165.46.47; 34.165.17.246
; SA (Saudi Arabia)-   34.166.58.243; 34.166.54.238
; ID (Indonesia)-   34.101.125.66; 34.101.218.184
; ES (Spain)-   34.175.255.99; 34.175.230.35
; IT (Italy)-   34.154.173.134; 34.154.229.60
; KR (South Korea)-   34.64.189.205; 34.64.45.118
; ZA (South Africa)-   34.35.70.193; 34.35.80.189
; BR (Brazil)-   35.199.96.109; 34.39.161.254 | — |
| **Collect third-party data from your SaaS and Cloud resources** | | — | IP address by region. US (United States)- 34.66.69.154; 35.202.21.123
; AU (Australia)-   35.197.181.108; 35.197.175.44
; CA (Canada)-   34.95.33.72; 34.95.62.136
; SG (Singapore)-   35.247.148.38; 35.247.173.40
; JP (Japan)-   34.85.68.167; 34.84.99.239
; IN (India)-   34.93.3.196; 34.93.175.218
; DL (Delhi)-   34.131.111.87; 34.131.101.138
; DE (Germany)-   34.89.197.46; 34.107.3.224
; UK (United Kingdom)-   34.105.227.146; 34.105.137.22
; EU (Europe)-   34.90.70.107; 35.204.129.196
; CH (Switzerland)-   34.65.225.124; 34.65.89.6
; PL (Poland)-   34.118.71.237; 34.118.124.130
; TW (Taiwan)-   35.201.142.86; 35.189.176.163
; QT (Qatar)-   34.18.44.71; 34.18.30.132
; FA (France)-   34.163.125.167; 34.163.155.105
; IL (Israel)-   34.165.131.171; 34.165.120.206
; SA (Saudi Arabia)-   34.166.59.20; 34.166.53.242
; ID (Indonesia)-   34.101.158.32; 34.101.79.159
; ES (Spain)-   34.175.27.251; 34.175.198.50
; IT (Italy)-   34.154.208.247; 34.154.243.11
; KR (South Korea)-   34.64.107.163; 34.64.84.25
; ZA (South Africa):-   34.35.69.156; 34.35.60.86
; BR (Brazil)-   34.39.177.125; 34.39.140.36 | **`cortex-xdr`** |
| **Log Forwarding to a Syslog Receiver** |
| See Integrate a syslog receiver. |  |  |

##### FedRAMP and US Federal Government required resources

The following table lists the required resources for the federal government of the United States, including FQDNs, IP addresses, ports, and App-ID coverage for your deployment:

| FQDN | IP Addresses and Port | App-ID Coverage |
| --- | --- | --- |
| **Egress** |
|  | FedRAMP Moderate 34.122.220.113:443; 35.223.83.172:443 FedRAMP High 34.136.155.252:443; 34.133.46.50:443 |  |
| **Outbound IPs for Engines** |
|  | FedRAMP Moderate 34.123.127.174:443; 34.71.135.18:443 FedRAMP High 34.123.153.175:443; 35.223.253.2:443 |  |
| **`distributions-prod-fed.traps.paloaltonetworks.com`** Used for the first request in registration flow where the agent passes the distribution ID and obtains the **``ch-_`<tenant-name>`_.traps.paloaltonetworks.com``** of its tenant | IP address: 104.198.132.24; Port: 443 | **`traps-management-service`** |
| **`wss://lrc-fed.paloaltonetworks.com`** Used in live terminal flow. | IP address: 35.188.188.91; Port: 443 | **`cortex-xdr`** |
| **`panw-xdr-installers-prod-fr.storage.googleapis.com`** Used to download installers for upgrade actions from the server. | IP ranges in GCP; Port: 443 | **`cortex-xdr`** |
| **`panw-xdr-payloads-prod-fr.storage.googleapis.com`** Used to download the executable for the live terminal for Cortex XDR agents earlier than version 7.1.0. | IP ranges in GCP; Port: 443 | **`cortex-xdr`** |
| **`global-content-profiles-policy-prod-fr.storage.googleapis.com`** Used to download content updates. | IP ranges in GCP; Port: 443 | **`cortex-xdr`** |
| **`panw-xdr-evr-prod-fr.storage.googleapis.com`** Used to download extended verdict request results in scanning. | IP ranges in GCP; Port: 443 | **`cortex-xdr`** |
| **`app-proxy.federal.paloaltonetworks.com`** | IP address: 35.186.217.42; Port: 443 | — |
| **``dc-_`<tenant-name>`_.traps.paloaltonetworks.com``** Used for EDR data upload. | IP address: 130.211.195.231; Port: 443 | **`traps-management-service`** |
| **``ch-_`<tenant-name>`_.traps.paloaltonetworks.com``** Used for all other requests between the agent and its tenant server including heartbeat, uploads, action results, and scan reports. | IP address: 130.211.195.231; Port: 443 | **`traps-management-service`** |
| **``api-_`<tenant-name>`__`.xdr.`_federal.paloaltonetworks.com``** Used for API requests and responses. | IP address: 130.211.195.231; Port: 443 | — |
| **``cc-_`<tenant-name>`_.traps.paloaltonetworks.com``** Used for get-verdict requests. | IP address: 35.222.50.74; Port: 443 | **`traps-management-service`** |
| **Broker VM resources** Required for deployments that use Broker VM features |
| **``br-_`<tenant-name>`__`.xdr.`_federal.paloaltonetworks.com:443``** | IP address: 34.71.185.11; Port: 443 | — |
|  | Port: 443 | — |
| **`distributions-prod-fed.traps.paloaltonetworks.com`** | IP address: 104.198.132.24; Port: 443 | **`traps-management-service`** |
|  | UDP port: 123 | — |
| **App login and authentication** |
| identity.paloaltonetworks.com (SSO) | IP address: 34.107.215.35; Port: 443 | — |
| login.paloaltonetworks.com (SSO) | IP address: 34.107.190.184; Port: 443 | — |
| **Collect third-party data from your SaaS and Cloud resources** |
| — | IP addresses 34.68.217.16; 34.69.175.202 | **`cortex-xdr`** |
| **Log Forwarding to a Syslog Receiver** | | See Integrate a syslog receiver. |

### Upgrade from Prisma Cloud to Cortex Cloud

#### About the Upgrade Helper
If you are a Prisma Cloud customer, you can use the Upgrade Helper to copy data from your Prisma Cloud tenant to your new Cortex Cloud tenant. If you have not received your entitlement details to activate your Cortex Cloud tenant, contact your account team to learn more about tenant activation and the upgrade process.

**Note:**

Your Prisma Cloud tenant remains available and fully operational during the agreed upgrade period.

The Upgrade Helper provides a gradual and flexible upgrade experience, while Prisma Cloud and Cortex Cloud run in parallel during the transition period. It enables you to copy configurations from your Prisma Cloud tenant into your Cortex Cloud tenant at your own pace.

-   Administrators can use the Upgrade Helper at any stage of the upgrade process, as many times as needed. If you copied a record previously, it gets updated and overwritten with the latest details from Prisma Cloud during each run.
    
    For example, when you copy custom permission groups the second time, all custom roles that you previously created in the Cortex Cloud tenant are overwritten with the latest configurations.
    
-   Choose exactly what to copy and what to skip. This allows you to choose a clean start or do a selective migration of content.
    
-   The Upgrade Helper does not modify any existing content in your Prisma Cloud tenant.
    

The following table lists the types of content that are copied from your Prisma Cloud tenant to your Cortex Cloud tenant during the upgrade process:

| Upgrade Helper Section | Content Item Name in Prisma Cloud | Content Item Name in Cortex Cloud |
| --- | --- | --- |
| Global Configurations | Permission Groups and Roles | Roles and User Groups |
| CSPM Configurations | Policies | Rules |
| Custom Alert Rules | Custom Policies | | Notifications | Automation Rules |
| Custom Compliance Standards | Custom Compliance Standards |
| CWP Configurations | Rules and Their Collections | Policies and Their Asset Groups |
| Application Security Configurations | Policy Labels | Application Security Rule Labels |
| Custom Policies | Application Security Custom Rules | | Enforcement Rules | Application Security Policies |
| Non-default Scanned Branches | Non-default Scanned Branches | | Git History & Validate Secrets | Git History & Validate Secrets |
| Developer Suppressions | Application Security Policies | | AppDNA Discovery Criteria | Application Criteria |

#### Link Cortex Cloud to Prisma Cloud
To link your Cortex Cloud tenant to a Prisma Cloud tenant, first obtain the Access Key from Prisma Cloud, and then paste it in the Link Tenant section of the Upgrade Helper to establish the link.

Obtain the Prisma Cloud tenant access key

1.  Log in to your Prisma Cloud tenant as an administrator.
    
2.  Go to Settings → Enterprise Settings .
    
3.  Click Generate Token in the Cortex Cloud Tenant Linking section.
    
4.  Copy the Access Key.
    

Link from Cortex Cloud

1.  Log in to Cortex Cloud as an administrator.
    
2.  Navigate to Settings → Configurations → Upgrade Helper.
    
3.  Click Create Link in the Link Tenant section.
    
4.  Enter the Prisma Cloud Access Key.
    
5.  Review the details of the Prisma Cloud tenant, such as Tenant Name, Tenant ID, and Region.
    
6.  Click Connect.

#### Copy content
After you successfully link your Cortex Cloud tenant to your Prisma Cloud tenant, you can choose content items to copy. You can either copy all supported content (recommended) or select specific items to copy.

How to copy selected content

1.  In your Cortex tenant, navigate to Settings → Configurations → Upgrade Helper.
    
2.  Select the checkbox next to the item you want to copy and click Copy Selected.
    
3.  Review the message and if you are ready to proceed, click Proceed with Copy.
    
    The Copy content started successfully message is displayed.
    
    Upon successful completion, a message shows the number of items that were copied from the Prisma Cloud tenant.
    
4.  Click View Log to view the error messages (info and warning). The log shows records that were not copied.You can also export the log.

##### Copy Global configurations
###### Roles and user groups

When you copy Roles and User Groups in the Upgrade Helper, the Prisma Cloud Custom Permission Groups and Roles are copied to Cortex Cloud as corresponding roles and user groups.

###### Assign roles and user groups

Users created through the customer support portal are assigned to the relevant user groups. If your organization uses single sign-on (SSO) for authentication, user roles and groups won't be assigned based on Prisma Cloud mappings. In this case, you will need to handle role assignment by SAML group mapping. Learn more about [authenticating users](https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM/Cortex-XSIAM-Documentation/Set-up-authentication).

###### Verify copied roles and user groups

After you follow the steps listed in Copy configurations, navigate to Settings → Configurations → Access Management to view the copied items.

**Note:**

Keep the following caveats in mind:

-   Scope-Based Access Control (SBAC) configurations, such as resources or account lists are not copied. You can manually assign scope-based access to the relevant users or groups.
    
-   When migrating permission groups and roles, the total count of items successfully copied may be lower than the initial number selected. This is expected behavior. The discrepancy in counts can occur for the following reasons:
    
    **Default Entities**: System-default items that are already mapped in the Cortex environment are automatically excluded from the operation, as migration is not required. The initial total count shown for processing will reflect this exclusion.
    
    **Validation Failures**: Entities that fail validation checks, such as those with duplicate names, will be skipped and not copied.
    
    **Empty Mappings**: Items that result in an empty configuration after the permission mapping process (e.g., a group that contains no valid permissions in the target system) will be skipped, as no corresponding entity can be created.
    
    Reference the migration logs for specific details on any skipped entities.

##### Copy CSPM configurations
###### Rules

When you copy Rules in the Upgrade Helper, the following actions occur:

-   Prisma Cloud Custom Policies (Config, Attack Path, and Data) are copied as Detection Rules in Cortex Cloud.
    
-   The enabled/disabled state of the default policies is also applied to the corresponding Detection Rules in Cortex Cloud.
    

###### Verify copied rules

After you follow the steps listed in Copy configurations, navigate to Posture Management → Rules & Policies → Rules → Cloud Security to view the list of rules that were copied.

###### Custom policies

When you copy Custom Policies in the Upgrade Helper, the Prisma Cloud Custom Alert Rules are copied as Policies in Cortex Cloud.

###### Verify copied policies

After you follow the steps listed in Copy configurations, navigate to Posture Management → Rules & Policies → Policies → Cloud Security to view the list of policies that were copied.

When verifying the list of policies, note the following details:

-   The policy name will have a prisma_cloud_copy suffix.
    
-   To verify that the prisma_cloud_alert_rule label was added to your policies, click the three dots next to Create Policy and select Labels from under Add Columns.
    
-   Click on a policy to view its details and review the issues that were generated.
    

| Alert Rule name in Prisma Cloud | Result after copying to Cortex Cloud |
| --- | --- |
| Alert rule default config or attack | Policies are created |
| Alert rule custom config or attack path | | Alert rule with custom compliance standard filter |
| Alert rule with Email and Slack notification setup | | Alert rule without Email notification setup |
| Alert rule with CIEM policies | Policies are not created: IAM policy; Attack path with CIEM finding |
| Alert rule with network or audit event policies | Policies are not created: Network; Audit event; Anomaly |

###### Automation rules

When you copy Automation Rules in the Upgrade Helper, the Prisma Cloud Notifications are copied as Automation Rules in Cortex Cloud.

You can copy Prisma Cloud notifications that were configured for:

-   Alert rules with default Config or Attack Path policies
    
-   Alert rules with Slack and Email notification setup
    

###### Verify copied notifications

After you follow the steps listed in Copy configurations, navigate to Investigation & Response → Automation → Automation Rules to view the list of notifications that were copied.

The notification type is Email and has a prisma_cloud_copy suffix. You can view the corresponding Policy ID and the email recipient.

| Alert rule in Prisma Cloud | Notification channels configured for alert rule in Prisma Cloud | Result after copying to Cortex Cloud |
| --- | --- | --- |
| Alert rule with default Config or Attack Path policies | Email | Automation rule is created with Email |
| Alert rule with Slack and Email | Slack and Email |
| Alert rule with no Email | Slack | Automation rule is not created |
| Alert rule with custom Config or Attack Path policies | Not applicable | ## Custom compliance standards When you copy Custom Compliance Standards in the Upgrade Helper, the Prisma Cloud Custom Compliance Standards are copied to Cortex Cloud. ## Verify copied compliance standards After you follow the steps listed in Copy configurations, navigate to Posture Management → Compliance → Standards to view the list of custom compliance standards that were copied.

##### Copy CWP configurations
###### Policies and their asset groups

When you copy Policies and Their Asset Groups in the Upgrade Helper, the Prisma Cloud Custom Rules and their Collections are copied as Policies and their Asset Groups in Cortex Cloud.

Prisma Cloud Runtime Rules for vulnerabilities and compliance are copied to equivalent Cortex Cloud Policies for vulnerabilities, malware, and misconfiguration.

Policy scope is handled as follows:

-   Each Prisma Cloud rule has a scope of one or more Collections.
    
-   The Cortex Cloud policies are scoped to Asset Groups with properties that match as closely as possible to the relevant Collections.
    

###### Verify copied rules

After you follow the steps listed in Copy configurations, navigate to Posture Management → Rules & Policies → Cloud Workload to view the list of rules that were copied.

##### Copy Cortex Cloud Application Security configurations
###### Scope

The following configurations can be automatically copied or converted from Prisma Cloud to Cortex Cloud.

###### Copy and apply out-of-the-box Prisma Cloud policy labels to Cortex Cloud Application Security rules

Automatically copy out-of-the-box Prisma Cloud policy labels and apply them to their corresponding Application Security rules in Cortex Cloud.

**Important:**

If labels are imported into Cortex Cloud less than three hours after they were last added or modified in Prisma Cloud, they may not be included in the import.

IMPORTANT:

-   **Scope of conversion**: Only default policy labels are converted. Labels for custom policies will be converted as part of the custom policies import process
    
-   **Naming convention**: Labels will be renamed and be added with a `-{prisma id}_copy` suffix to ensure there is no duplication, particularly in multi-tenant environments
    
-   **Conversion behavior**:
    
    -   Only labels that contain the `-{prisma id}_copy` suffix will be copied
        
    -   If a label was manually changed after the initial conversion, a subsequent conversion will not override it
        
    

###### Import Prisma Cloud custom policies as custom Cortex Cloud Application Security rules

-   **Policy creation**: Custom Prisma Cloud policies will be created as new custom Cortex Cloud Application Security rules on Cortex Cloud
    
-   **Naming convention**: Imported policies will be renamed with the suffix `-{prisma id}_copy`. This ensures no duplication in multi-tenant environments
    
-   **Scope of conversion**: `Build` and `Build & Run` policy types are supported. If the policy type is `Build & Run`, only the `Build` rules component are converted
    
-   **Excluded data**: Compliance data is not copied
    
-   **Info severity level conversion**: Policies with an Info severity will be converted to Low severity
    
-   **Conversion behavior**: Re-running the import process will override the newly created rules
    

###### Convert Prisma Cloud Enforcement rules to Cortex Cloud Application Security policies

Prisma Cloud Enforcement rules will be copied and converted into Cortex Cloud Application Security policies. The following outlines the key changes and behaviors of this conversion.

**Scope**

-   **Rule merging**: Enforcement rules that share similar logic and conditions will be combined into a single Cortex Cloud Application Security policy
    
-   **Exception rules**: Only default Enforcement rules will be converted. Any custom exception rules will not be carried over and will need to be reconfigured
    
-   **Severity conversion**: Rules with an `Info` severity will be converted to `Low`
    

**Behavior**

-   **Conversion behavior**: Re-running the conversion process will override the newly created policies
    
-   **Multi-tenant use case**: Since a tenant can only have one set of Enforcement rules, running the process from another tenant will override the policies of the previous tenant
    

**Copy confirmation**

When Cortex Cloud Application Security policies are selected without labels, you will be prompted to confirm your choice with the following options:

-   It is recommended to copy labels together with Enforcement rules. In order to automatically convert enforcement labels you must have also selected the default rule labels option. if you did not, the Enforcement rules will be migrated without the label, and you will need to reconfigure the label if required
    
-   Option 1: Proceed with Copy.
    
-   Option 2: Go Back to Selection (to select Labels).
    

###### Convert Prisma Cloud developer suppressions as Cortex Cloud Application Security policies

When importing developer suppression settings from Prisma Cloud to Cortex Cloud, they are copied and adapted into the corresponding policy configuration, updating or modifying the policy's existing developer suppression settings as needed.

-   **Global vs. per-policy configuration**: While this was a global setting in Prisma Cloud, on Cortex Cloud developer suppressions are configured per policy
    
-   **Scope**: This setting only applies to custom policies created prior to the conversion. Any custom policy created after the conversion process will need to be configured manually
    
-   **Conversion behavior**: Executing the process again will override the policies' developer suppressions settings
    
-   **Multi-tenant use case**: Running the process from another tenant will override the previous tenants' settings
    

###### Copy Git History & Validate Secrets settings

Copy Prisma Cloud advanced secrets settings for Git History and Secrets Validation to Cortex Cloud.

-   **Global vs. per-repository configuration**: While these were global settings in Prisma Cloud, on Cortex Cloud they are configured per repository
    
-   **Scope**: These settings only apply to repositories that were onboarded prior to the migration. Any repositories onboarded after the migration will need to have these settings configured manually
    
-   **Conversion behavior**: Executing the conversion process again will override the settings on all repositories
    
-   **Multi-tenant use case**: Running this process from another tenant will override the previous tenants' settings
    

###### Copy non-default scanned branches

Copy your non-default Prisma Cloud scanned branches through the Scanned Branches setting.

-   **Scope**: Prisma Cloud non-default scanned branches will be copied as scanned branches to the Cortex Cloud Set Scanned Branches configuration settings. Repositories must be onboarded prior to initiating the conversion. Any repositories onboarded after the migration will only be scanned on their default branch
    
-   **Scan behavior**: If selected, the relevant repositories will be scanned only on these imported non-default branches. On Cortex Cloud you have the flexibility to scan up to ten different branches. This can be manually configured after the conversion is complete
    
-   **Conversion behavior**: Executing the conversion again will override the settings on all repositories
    

###### Convert AppDNA Discovery Criteria to Cortex Cloud Application Criteria

Convert your Prisma Cloud Application Discovery criteria into Cortex Cloud Application Criteria.

Cortex Cloud Application Criteria correlates assets across both code and cloud environments. It uses code-to-cloud graph technology to automate application discovery, as opposed to the Prima Cloud AppDNA functionality, which was limited to cloud-only discovery.

-   **Tag logic**: While Prisma Cloud supported matching all possible combinations of multiple tags, Cortex Cloud uses a strict `AND` logic. Only assets that match all selected tags will be grouped into an application
    
-   **Excluded Criteria**: Any manual applications or discovery criteria that include specific repositories will not be migrated. These will need to be recreated manually in Cortex Cloud if needed
    
-   **Conversion behavior**: Executing the conversion again will override the converted criteria settings

#### Migrate Cortex CLI
To migrate from Prisma Cloud to Cortex Cloud, transition your workflows from your commercial version of **Checkov CLI**, which is used for SCA, Secrets, and IaC scanning in local or build environments, and the **TwistCLI**, which is used for container image scanning, to the Cortex CLI. The Cortex CLI provides a single, consistent command-line interface for scanning across **Cloud Workload Protection** (CWP), **API Security**, and **Cortex Cloud Application Security**.

**Prerequisites:**

Before you begin, ensure you have the following:

-   **Cortex Cloud API key**: An active API key for your Cortex Cloud tenant with associated CLI role permissions. Refer to Manage API keys for more information
    
-   **Install the Cortex CLI**. You can find the installation instructions here
    

##### Authentication

The Cortex CLI offers a consistent authentication method across all its supported modules (CWP, Application Security, and API Security). You can authenticate using one of two methods: environment variables or command-line flags.

##### Authenticate via environment variables

Setting environment variables is the recommended method for authentication as it prevents your API credentials from being exposed in your command history and codebase:

1.  Create an environment configuration file named `cortex.env`.
    
2.  Save the cortex.env file in your working directory → add your credentials to the file as variables.
    

The Cortex CLI uses the following environment variables:

-   `CORTEX_API_KEY_ID`: Your unique API key ID
    
-   `CORTEX_API_KEY`: Your API key
    
-   `CORTEX_API_URL`: Your tenant URL (for example https://api-tenantname.paloaltonetworks.com/)
    

##### Authenticate via command-line flags

You can also authenticate by providing your API credentials and base URL directly in the command.

```
cortexcli code scan --api-base-url <CORTEX_API_BASE_URL> --api-key-id <YOUR_API_KEY_ID> --api-key <YOUR_API_KEY> --directory ./my-app
```

Replace these placeholders:

-   `--api-key-id`: Your unique API key ID
    
-   `--api-key`: Your API key
    
-   `--api-base-url`: Your API base URL
    

##### Key changes: commands and functionality

The main change is the command you use to initiate a scan. Instead of the `checkov` or `twistcli` commands, you now use the `cortexcli` command with its subcommands.

| Prisma Cloud command | Cortex CLI command | Description |
| --- | --- | --- |
| `checkov` | `cortexcli code scan` | The base command for all code scanning operations |
| `twistcli images scan` | `cortexcli image scan` | The base command for all container image scanning operations |

##### Migrate Checkov to the Cortex CLI

Migrate your existing Checkov workflows using the following resources to map your essential commands and flags.

**Flag references**

-   For Cortex CLI flags applicable to all supported Cortex Cloud modules, refer to the Cortex CLI common command line reference guide documentation
    
-   For specific Cortex Cloud Application Security flags, refer to Cortex CLI Cortex Cloud Application Security command line reference
    
-   For `checkov` flags, refer to the [CLI Command Reference](https://www.checkov.io/2.Basics/CLI%20Command%20Reference.html)
    

##### Cortex Cloud Application Security\-specific flags

Here are some common Application Security flags to get you started:

-   `--directory`: Specifies the directory path to be scanned. This is a required argument for most Application Security scan commands
    
-   `--repo-id`: Identifies the repository being scanned. This command links the scan results to the correct repository within Cortex Cloud
    
-   `--branch`: Specifies the branch of the repository being scanned
    
-   `-upload-mode`: Determines the method for uploading data, with options for upload, no-upload, and no-code
    

##### Scan output and reporting

The output of a scan can be saved in various formats. The following table maps the output formats and commands.

|  | Checkov | Cortex CLI |
| --- | --- | --- |
| Output formats | cli; sarif; json; spdx; Junitxml; Cyclonedx; cyclonedx_json | CSV; sarif; Junitxml; GitLab SAST; Cyclonedx |
| --- | --- | --- |
| Output command | `-o [FORMAT]` | `--output [FORMAT]` |

##### Use cases: migrate Checkov to Cortex CLI

Here are some common Checkov workflows and their equivalents using the Cortex CLI tool.

**Case #1: Basic directory scan**

To perform a basic scan on a local directory:

-   **Checkov**: `checkov --directory`
    
-   **Cortex CLI**: `cortexcli code scan --directory`
    

**Case #2: Scan and upload to your tenant**

-   **Checkov**: By default, scan results are uploaded to your tenant if you have an API token. For example, `checkov -d . --repo-id my-org/my-repo` will upload scan results
    
-   **Cortex CLI**: `cortexcli appsec scan [scan type] --directory . --repo-id my-org/my-repo --branch main --upload-mode upload`
    

**Case #3: Scan without uploading output**

Get scan results in your terminal without uploading them to your tenant.

-   **Checkov**: `checkov -d --skip-results-upload`
    
-   **Cortex CLI**: cortexcli appsec scan --directory . --upload-mode no-upload
    

**Advanced use case: CI/CD Pipeline Integration**

You can integrate the Cortex CLI directly into your CI/CD pipelines to enable automated code scans by adding code snippets to your build script or pipeline configuration, such as a YAML file (See here for Cortex CLI snippets (such as GitHub Actions, Jenkins and more)).

When updating your CI/CD pipeline, replace the legacy `checkov` step with the new `cortex scan` command.

Docker image limitation: The Cortex CLI does not support SCA scans. You must update your pipelines to download the `corteccli` binary directly if your workflow relies on this functionality.

Example 1. Example: GitHub Actions workflow

These examples demonstrate a GitHub Actions workflow in both legacy and the new Cortex CLI environments.

-   **Checkov YAML step**
    
    This example shows a typical step using `checkov-action`.
    
    ```
    \- name: Run Checkov scan
      uses: bridgecrewio/checkov-action@v12
      with:
        directory: ./terraform
        framework: terraform
        quiet: true # Don't output results to stdout
    ```
    
-   **Cortex CLI YAML step**
    
    This new step calls the **Cortex CLI** directly. It uses GitHub secrets to securely provide API credentials. Note the prerequisites in the YAML (such as `Node.js v22`). For a list of requirements, refer to both the general requirements (Connect Cortex CLI) and Application Security specific requirements (Cortex CLI for Code Security).
    
    ```
     name: Cortex CLI Code Scan
    on:
      push:
        branches:
          - main
      workflow_dispatch:
    env:
      CORTEX_API_KEY: ${{secrets.CORTEX_API_KEY}}
      CORTEX_API_KEY_ID: ${{secrets.CORTEX_API_KEY_ID}}
      CORTEX_API_URL: https://api-viso-cq3sdpg7uyd6vqk66ccjyv.xdr-qa2-uat.us.paloaltonetworks.com
      
    jobs:
      cortex-code-scan:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout Repository
          uses: actions/checkout@v2
        
        - name: Set up Node.js
          uses: actions/setup-node@v4
          with:
            node-version: 22
        - name: Verify Node.js Version
          run: node -v
        - name: Download cortexcli
          run: |
            set -x
            crtx_resp=$(curl "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=amd64" \\
              -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
              -H "Authorization: ${CORTEX_API_KEY}")
            crtx_url=$(echo $crtx_resp | jq -r ".signed_url")
            curl -o cortexcli $crtx_url
            chmod +x cortexcli
            ./cortexcli --version
        - name: Run Cortex CLI Code Scan
          run: |
            ./cortexcli \\
              --api-base-url "${CORTEX_API_URL}" \\
              --api-key "${CORTEX_API_KEY}" \\
              --api-key-id "${CORTEX_API_KEY_ID}" \\
              code scan \\
              --directory "${{github.workspace}}" \\
              --repo-id "${{github.repository}}" \\
              --branch "${{github.ref_name}}" \\
              --source "GITHUB_ACTIONS" \\
              --create-repo-if-missing
    ```
    

  

##### Migrate TwistCLI to the Cortex CLI

To help you transition your TwistCLI workflows, this section provides both the necessary flag references and a practical example to guide you in implementing your most common use cases. You can use the following references to map your existing TwistCLI workflows to their Cortex CLI equivalents.

-   For TwistCLI flags, refer to [Scan Images with twistcli](https://docs.prismacloud.io/en/enterprise-edition/content-collections/runtime-security/tools/twistcli-scan-images)
    
-   For `cortexcli` flags common to all supported Cortex Cloud modules, refer to Cortex CLI common command line reference guide
    
-   For specific Cloud Workload Protection (CWP) flags, refer to Cloud Workload Protection command line reference
    

**Use case: Scan a container image**

Here is how you can map your TwistCLI image scan command to the Cortex CLI.

-   **Legacy Twistcli command**
    
    ```
    ./twistcli images scan \\
      --address "your Prisma Cloud Console URL" \\
      --user "your_access_key_id" \\
      --password "your_secret_key" \\
      ubuntu:latest
    ```
    
-   **Cortex CLI command**
    
    ```
    cortexcli image scan <container image path>
    ```

### Set up users and roles

Learn how to set up users and roles in Cortex Cloud.

Cortex Cloud uses both Role-Based Access Control (RBAC) and Scope-Based Access Control (SBAC) to manage roles with specific permissions for controlling user access.

RBAC helps manage access to Cortex Cloud components and Cortex Query Language (XQL) datasets, so that users, based on their roles, are granted minimal access required to accomplish their tasks.

SBAC refines the RBAC permissions by granting access only to the relevant data that the user requires for their designated role. Users with Access Management permission can apply scopes to limit the data and content that users can be granted access to in Cortex Cloud, which are divided into different scoping areas. The scoping areas include Assets, Cases and Issues, and Endpoints, which can be applied as relevant to the enforcement area or entity. For more information on user scopes, see Manage user scope.

Cortex Gateway and the tenant have different options and requirements.

| Location | Details |
| --- | --- |
| Cortex Gateway | A centralized portal for managing roles, user groups, and users for all tenants. Any roles and user groups created in Cortex Gateway are available for all tenants. In Cortex Gateway, on the Permissions page, you can manage users that have been added to your Customer Support Portal account or view users that have been created in the tenant using SSO (you cannot edit SSO users in Cortex Gateway). All users must have at least one role or belong to at least one user group to be saved in the Cortex Gateway. You can exclude different tenants or different Cortex products. For more information, see [Cortex Gateway Administrator Guide](https://docs-cortex.paloaltonetworks.com/r/Cortex/Cortex-Gateway-Administrator-Guide). Only users with the Account Admin role can manage roles, tenants, and user groups in Cortex Gateway. |
| Cortex Cloud tenant | (Recommended) All permissions and roles are specific to the tenant and exist only at the tenant level. Advanced settings, such as SBAC and Dataset access management, can be defined at the tenant level. Managing users, roles, scopes, user groups, and authentication settings in Cortex Cloud requires View/Edit RBAC permissions for Access Management (under Configurations). Account Admin and Instance Administrator roles are granted this permission by default. For more information, see Manage user roles. |

Predefined user roles

Role-based access control (RBAC) enables you to use predefined Palo Alto Networks roles to assign access rights to Cortex Cloud users. You can manage roles for all Cortex Cloud tenants and services in the Gateway or in the Cortex Cloud tenant. By assigning roles, you enforce the separation of access among functional or regional areas of your organization.

Each role extends specific privileges to users. The way you configure administrative access depends on the security requirements of your organization. Use roles to assign specific access privileges to administrative user accounts.

You can manage role permissions in Cortex Cloud , which are listed by the various components according to the sidebar navigation in Cortex Cloud. Some components include additional action permissions, such as pivot (right-click) options, to which you can also assign access, but only when you’ve given the user View/Edit permissions to the applicable component.

The default Palo Alto Networks roles provide a specific set of access rights to each role. You cannot edit the default roles directly, but you can save them as new roles and edit the permissions of the new roles. To view the predefined permissions for each default role, go to Settings → Configurations → Access Management → Roles.

**Note:**

Some features are license-dependent. Accordingly, users may not see a specific feature if the feature is not supported by the license type or if they do not have access based on their assigned role or scope.

| Default Role | Description |
| --- | --- |
| Account Admin | A Super User role that is assigned directly to the user in Cortex Gateway and has full access to all Cortex products in your account, including all tenants added in the future. The Account Admin can assign roles for Cortex instances and activate Cortex tenants specific to the product. \*\*Note:\*\* The user who activated the Cortex product is assigned the Account Admin role. You cannot create additional Account Admin roles in the Cortex Cloud tenant. If you do not want the user to have Account Admin permission, you must remove the Account Admin role in Cortex Gateway. |
| Instance Administrator | View and edit permissions for all components and access all pages in the Cortex Cloud tenant. The Instance Administrator can also make other users an Instance Administrator for the tenant. If the tenant has predefined or custom roles, the Instance Administrator can assign those roles to other users. |
| Viewer | View the majority of the features for this instance. |
| Developer | Have limited permissions primarily focused on viewing and monitoring security information. Access and analyze scan results, track progress, and collaborate with security teams. Does not include ability to modify detection rules, enforcements, or directly address security issues. |
| CLI Read Only Role | View scripts, playbooks, credentials, and CLI tool. |
| CLI Role | View scripts, playbooks, and credentials. View and edit permission for CLI tool. |
| AppSec Admin | Full permissions for all Cloud Application Security-related activities. Create and modify detection rules within the Code/Build domain, track progress, and adjust enforcements as needed. Additionally, triage and investigate findings, issues, and cases spanning from code to cloud. The role also includes complete visibility into all cloud assets. |
| Security Admin | Can triage and investigate issues and cases, respond (excluding Live Terminal), and edit profiles and policies. |
| AI Security Administrator | Manage all aspects of AI security in the organization. |
| AI Security Viewer | Views and investigates all issues and findings on AI security. |
| Data Security Administrator | View and manage all data security information, including objects and data patterns. |
| Data Security Viewer | View all data security information, including objects and data patterns. |
| Identity Security Administrator | The Identity Security Administrator has full access to all general Admin and Identity Security capabilities. |
| Identity Security Viewer | The Identity Security Viewer can view the majority of the features for this Identity Security and can edit reports. |

#### User group management

Create user groups and assign roles and users to further refine your requirements.

Users are assigned roles and permissions either by being assigned a role directly or by being assigned membership in one or more user groups.  A user group can only be assigned to a single role, but users can be added to multiple groups if they require multiple roles. You can also nest groups to achieve the same effect.  Users who have multiple roles through either method will receive the highest level of access based on the combination of their roles. The same principle for users with multiple roles is followed for both the Role-Based Access Control (RBAC) access permissions and the Scope-Based Access Control (SBAC) granular scoping, so that users receive the highest level of access by combining their roles.

Example 2. 

-   Joe has an Analyst role and is a member of the Tier-1 Analyst user group, which is assigned the Triage role.  Joe has the permissions of the Analyst role and the Triage role. Joe is assigned 2 roles, and has the highest permission based on the combination of both roles.
    
-   John is a member of two user groups - Tier-1 Analyst and Tier-2 Analyst. One group is configured to use the Triage role and the other group is configured to use the Incident Response role.  John is assigned both roles and has the highest permissions based on the combination of all roles.
    
-   Jack is a member of the Tier-2 user group, which has an Incident response role.  This user group is included in a Tier-3 user group (Threat Hunter role), added as a nested group.  Jack is assigned both roles and has the highest permissions based on the combination of all roles.
    

  

On the User Groups page, you can create a new user group for several different system users or groups. You can see information including the details of all user groups, the roles, nested groups, IdP groups (SAML), and when the group was created/updated.

You can also right-click in the table to edit, save as a new group, remove (delete) a group, and copy text to the clipboard.

**Note:**

You can create user groups in the tenant or Cortex Gateway. User groups created in Cortex Gateway cannot be mapped to SAML groups. Only user groups created in the tenant support SAML group mapping and scoring. We recommend creating user groups in the Cortex tenant because:

-   User groups are available for all tenants, and you may want different user groups in different tenants, such as dev/prod.
    
-   You can apply granular scoping for a user role by granting access only to the relevant data that the user requires for their designated role in the tenant. You also need to enable scope-based access control in the Server Settings page. For more information, see Manage user scope.
    
    Before configuring SBAC, ensure that you review Understand scoping in the Manage user scope section.
    

How to create a user group

1.  Go to Settings → Configurations → Access Management → User Groups.
    
    If creating in Cortex Gateway, go to Permission Management → User Groups.
    
2.  To create a new user group for several different system users or groups, click New Group, and add the following parameters:
    
    | Parameter | Description |
    | --- | --- |
    | Name | Name of the user group. |
    | Description | Description of the user group. |
    | Group for product | (Cortex Gateway only) If you have multiple products, select the relevant Cortex product. |
    | Role | Select the group role associated with this user group. You can only have a single role designated per group. In Cortex Gateway, you can only select either Instance Administrator or a custom role created in the Gateway. |
    | Users | Select the users you want to belong to this user group. \*\*Note:\*\* If users have been created in the CSP, but you want them to access the tenant through SSO only, skip this field and add only SAML group mapping after SSO is set up, otherwise, users can access the tenant through both the CSP and SSO. If you have not yet created any users, skip this field and add them later. See [Set up authentication](https://docs-cortex.paloaltonetworks.com/r/Cortex-XSOAR/8/Cortex-XSOAR-Cloud-Documentation/Set-up-authentication) . |
    | Nested Groups | Lists any nested groups associated with this user group. If you have an existing group, you can add a nested group. User groups can include multiple users and nested groups, which inherit the permissions of parent user groups. The user group will have the highest level of permission. For example: Group A has Tier-1 Analyst permissions; Group B has Tier-2 Analyst permissions If you add Group A as a nested group in Group B, Group A inherits Group B's permissions (Tier-1 and Tier-2 permissions). In Cortex Gateway, you can only add user groups that are created in Cortex Gateway. |
    | SAML Group Mapping | (Relevant when creating a user group in the Cortex tenant only.) Maps the SAML group membership to this user group. For example, you have defined a `Cortex Admins` group. You need to name this group exactly how it appears in Okta. You can add multiple groups by separating them with a comma. \*\*Note:\*\* When using Azure AD for SSO, the SAML group mapping needs to be provided using the group object ID (GUID) and not the group name. If you have not set up SSO in your tenant, skip this field and add it later. After you have added it, follow the procedure relevant to your IdP. For example, see [Set up Okta as the identity using SAML 2.0](https://docs-cortex.paloaltonetworks.com/r/Cortex-XSOAR/8/Cortex-XSOAR-Cloud-Documentation/Set-up-Okta-as-the-Identity-Provider-Using-SAML-2.0) . |
    
3.  (Optional) When creating the user group in the tenant, configure granular scoping for the user group.
    
    If creating the user group in the Cortex Gateway, you can skip this step, as scoping is only supported in the tenant.
    
    1.  Click the Scope tab.
        
    2.  Expand the scoping areas that you want to grant the user role access to in the tenant by clicking the chevron icon (\>) beside the scoping area title, and make any changes required. The following table explains the options available to configure:
        
        | Scoping Area | Granular Scoping Configurations |
        | --- | --- |
        | Cases and Issues | Set the Scope by selecting one of the following: No cases and issues: Defines access to no cases and issues.; All cases and issues: Defines access to all cases and issues. Users can view cases or issues referencing assets within their scope. Use the Assets section to define which assets are in scope.; Select domains: Defines access to the domains selected to view their related cases and issues. Under Select domains, define the specific domains that you want to grant access. |
        
    
    **Important:**
    
    By default, Enable Scope Based Access Control is disabled in Settings → Configurations → General → Server Settings, and granular scoping is not enforced. Before enabling SBAC, we recommend that an administrator or a user with Access Management permissions first ensures that the users, user groups, and API Keys defined in Cortex Cloud are granted the required access by assigning the relevant scopes. For more information, see Manage user scope.
    
4.  Click Create to create the user group.

#### Assign user roles and groups

Learn how to assign users to roles and user groups.

Assign roles directly to users or create user groups and assign roles to those groups. We recommend creating user groups (with a user role), and assigning users to those user groups rather than creating direct roles for each user.

**Note:**

If an existing user in the Cortex Gateway no longer has a role or a user group assigned, the user is revoked. Any roles, user groups, or egress configurations created by that user are shown as created by Revoked user instead of the user’s email address.

Assign a user/user group to a role

Cortex Cloud provides predefined built-in user roles that provide specific access rights that cannot be modified. You can also create custom, editable user roles. If a user does not have any Cortex Cloud access permissions that are assigned specifically to them, the field displays **No-Role**.

1.  Select Settings → Configurations → Access Management → Users.
    
2.  Right-click the relevant user, and select Edit User Permissions.
    
    **Tip:**
    
    To apply the same settings to multiple users, select them, and then right-click and select Edit Users Permissions.
    
3.  Ensure the Role tab is selected.
    
4.  Under Role, select the default or custom role.
    
5.  (Optional) Under User Groups, add the user to a group.
    
6.  (Optional) Under Show Accumulated Permissions:
    
    1.  Do one of the following:
        
        -   Select all to view the combined permissions for every role and user group assigned to the user.
            
        -   Select a specific role assigned to the user to view the available permissions for that role.
            
        
    2.  Under Components, expand each list to view the permissions.
        
    
    **Important:**
    
    Setting Cortex Query Language (XQL) dataset access permissions for a user role can only be performed from Cortex Cloud Access Management. For more information, see Manage user roles.
    
7.  (Optional) You can configure and manage granular scoping:
    
    1.  Click the Scope tab.
        
    2.  Under Scope Definition, expand the scoping areas that you want to grant the user role access to in the tenant by clicking the chevron icon (\>) beside the scoping area title, and make any changes required. The following table explains the options available to configure:
        
        **Important:**
        
        Before configuring, ensure that you review Understand scoping in the Manage user scope section.
        
        | Scoping Area | Granular Scoping Configurations |
        | --- | --- |
        | Assets | Set the Scope by selecting one of the following: No assets: No asset is accessible.; All assets: Defines access to all assets.; Select asset groups: Defines access to the specific assets associated with the Asset Groups selected, and to view all their related cases, issues, and findings for these specific assets and Asset Groups. Under Select asset groups, define the specific asset groups that you want to grant access. Only Asset Groups relevant for scoping are listed, which are asset groups that are using only the asset attributes listed in Manage user scope (under Understand scoping → Scoping Areas → Assets). The scoping of assets also affects the scoping of cases, issues, and findings. \*\*Note:\*\* Visibility of Security domain Issues that refer to assets with agents is controlled by the Endpoints scoping configuration. |
        | Cases and Issues | Set the Scope by selecting one of the following: No cases and issues: Defines access to no cases and issues.; All cases and issues: Defines access to all cases and issues. Users can view cases or issues referencing assets within their scope. Use the Assets section to define which assets are in scope.; Select domains: Defines access to the domains selected to view their related cases and issues. Under Select domains, define the specific domains that you want to grant access. Users can only view cases or issues referencing assets and endpoints within their scope. Use the Assets section to define which assets are in scope. When selecting All cases and issues or Select domains, you can separately configure access to issues and cases that lack an asset reference or where the referenced asset is not in All Assets and All Endpoints inventories. To provide access, select the Allow access to cases and issues that are not referencing known assets or endpoints checkbox. Once selected, you can specifically control which users have access to issues and cases that lack Affected Assets (as seen in the issue’s panel) and Assets (as seen in the case's panel), or where the listed assets are not part of the Asset or Endpoint inventories. When the assets listed are not part of the inventories, the asset string is typically non-clickable. In some cases, such as for identity-related issues, assets may open a dedicated User Risk View, which differs from the standard inventories panels. In the Issues and Cases tables, such items can be identified by empty values in the following columns: Asset IDs, Target Agent Identifier, and Source Agent Identifier. |
        | Endpoints | Set the Scope by selecting one of the following: No endpoints: Defines access to no endpoints with no ability to view their related agent management and enterprise policies.; All endpoints: Defines access to all endpoints with the ability to view their related agent management and enterprise policies. This configuration can impact the visibility of related Security domain Cases and Issues, but will not affect asset visibility.; Select specific (at least one required): Defines specific access to all endpoint groups by selecting Endpoint Groups or all endpoint tags by selecting Endpoint Tags to view their related agent management and enterprise policies. This configuration can impact the visibility of related Security domain Cases and Issues, but will not affect asset visibility. |
        
    
    **Important:**
    
    By default, Enable Scope Based Access Control is disabled in Settings → Configurations → General → Server Settings, and granular scoping is not enforced. Before enabling SBAC, we recommend that an administrator or a user with Access Management permissions first ensures that the users, user groups, and API Keys defined in Cortex Cloud are granted the required access by assigning the relevant scopes. For more information, see Manage user scope.
    
8.  Click Save.
    

##### Perform additional tasks

For more information about additional tasks such as creating a custom role, modifying a user's role, or removing a user's role, see Manage user access or [Cortex Gateway Administrator Guide](https://docs-cortex.paloaltonetworks.com/r/Cortex/Cortex-Gateway-Administrator-Guide).

### Manage API keys
API keys are used to manage and secure API interactions. An API key is essentially a unique string of alphanumeric characters that acts as a credential, allowing a specific user or application to access and interact with a particular API. When you request data or perform an action through an API call, you must include this API key in the header. Cortex Cloud then verifies the key's authenticity and, if valid, grants the requested access.

#### How to create an API key

1.  Select Settings → Configurations → Integrations → API Keys → New Key.
    
2.  In the Role tab, perform for the following:
    
    1.  Under Security Level, select the type of API Key you want to generate: Advanced or Standard. The Advanced API key hashes the key using a nonce, a random string, and a timestamp to prevent replay attacks. cURL does not support this but it is suitable with scripts.
        
    2.  Under Role, select the desired level of access for this key. You can select from predefined roles or custom roles. Roles are available according to what was defined in either the Cortex Gateway or Cortex Cloud Access Management. You can view the configuration of the role selected by expanding the sections under Components. For more information, see Assign user roles and groups.
        
    3.  (Optional) Under Comment, provide a comment that describes the purpose of the API key.
        
    4.  (Optional) If you want to define a time limit on the API key authentication, select Enable Expiration Date, and select the expiration date and time. You can track the expiration date of each API key in the API Keys page. In addition, Cortex Cloud displays a API Key Expiration notification in the Notification Center one week and one day prior to the defined expiration date.
        
3.  (Optional) To configure and manage granular scoping for Scope-Based Access Control (SBAC), click the Scope tab, and under Scope Definition, expand the scoping areas that you want to grant the user role access to for this API by clicking the chevron icon (\>) beside the scoping area title. The following table explains the options available to configure:
    
    **Important:**
    
    Before configuring, ensure that you review Understand scoping in the Manage user scope section.
    
    | Scoping Area | Granular Scoping Configurations |
    | --- | --- |
    | Assets | Set the Scope by selecting one of the following: No assets: No asset is accessible.; All assets: Defines access to all assets.; Select asset groups: Defines access to the specific assets associated with the Asset Groups selected, and to view all their related cases, issues, and findings for these specific assets and Asset Groups. Under Select asset groups, define the specific asset groups that you want to grant access. Only Asset Groups relevant for scoping are listed, which are asset groups that are using only the asset attributes listed in Manage user scope (under Understand scoping → Scoping Areas → Assets). The scoping of assets also affects the scoping of cases, issues, and findings. \*\*Note:\*\* Visibility of Security domain Issues that refer to assets with agents is controlled by the Endpoints scoping configuration. |
    | Cases and Issues | Set the Scope by selecting one of the following: No cases and issues: Defines access to no cases and issues.; All cases and issues: Defines access to all cases and issues. Users can view cases or issues referencing assets within their scope. Use the Assets section to define which assets are in scope.; Select domains: Defines access to the domains selected to view their related cases and issues. Under Select domains, define the specific domains that you want to grant access. Users can only view cases or issues referencing assets and endpoints within their scope. Use the Assets section to define which assets are in scope. When selecting All cases and issues or Select domains, you can separately configure access to issues and cases that lack an asset reference or where the referenced asset is not in All Assets and All Endpoints inventories. To provide access, select the Allow access to cases and issues that are not referencing known assets or endpoints checkbox. Once selected, you can specifically control which users have access to issues and cases that lack Affected Assets (as seen in the issue’s panel) and Assets (as seen in the case's panel), or where the listed assets are not part of the Asset or Endpoint inventories. When the assets listed are not part of the inventories, the asset string is typically non-clickable. In some cases, such as for identity-related issues, assets may open a dedicated User Risk View, which differs from the standard inventories panels. In the Issues and Cases tables, such items can be identified by empty values in the following columns: Asset IDs, Target Agent Identifier, and Source Agent Identifier. |
    | Endpoints | Set the Scope by selecting one of the following: No endpoints: Defines access to no endpoints with no ability to view their related agent management and enterprise policies.; All endpoints: Defines access to all endpoints with the ability to view their related agent management and enterprise policies. This configuration can impact the visibility of related Security domain Cases and Issues, but will not affect asset visibility.; Select specific (at least one required): Defines specific access to all endpoint groups by selecting Endpoint Groups or all endpoint tags by selecting Endpoint Tags to view their related agent management and enterprise policies. This configuration can impact the visibility of related Security domain Cases and Issues, but will not affect asset visibility. |
    
    **Important:**
    
    By default, Enable Scope Based Access Control is disabled in Settings → Configurations → General → Server Settings, and granular scoping is not enforced. Before enabling SBAC, we recommend that an administrator or a user with Access Management permissions first ensures that the users, user groups, and API Keys defined in Cortex Cloud are granted the required access by assigning the relevant scopes. For more information, see Manage user scope.
    
4.  Click Generate to generate the API key.
    
5.  Copy the generated API key and click Done.
    
    **Important:**
    
    You will not be able to view the API key again after you complete this step. Ensure that you copy the API key before closing the notification.
    

#### Actions available on API Keys

Below are some of the main pivot (right-click) options for actions available on each API key listed in the API Keys table. Only tasks that need further explanation are explained below.

| Action | Description |
| --- | --- |
| View Examples | Copies the Python 3 example, so you can edit it to set up your own API calls. |
| Copy text to clipboard / Copy entire row | Copies the value of an API setting, such as the ID, to the clipboard by right-clicking the setting and selecting Copy text to clipboard. You can copy all the settings of an API key by right-clicking and selecting Copy entire row. |
| Filter API keys | Filters the API keys by selecting one of the filter options, such as Show rows 30 days prior to.... You can then adjust the filter options to filter the API keys according to all the available fields. |

### Set up authentication

Authenticate Cortex Cloud users using SAML 2.0 or Cortex Gateway.

You can create users in the Customer Support Portal or by using SAML Single Sign-On (SSO) in the tenant. Users authenticate by doing the following:

-   Authenticate through the Customer Support Portal
    
    When users log into Cortex Gateway or the tenant (provided they are assigned a role) they are prompted to sign into the Customer Support Portal using their username and password or 2FA (if set up). This is the default method of authentication.
    
    After you have created users, add them to user groups or assign roles directly.
    
-   Authenticate using SAML single sign-on in the Cortex Cloud tenant
    
    Users can be authenticated using your IdP provider such as Okta, Ping, or Azure AD. You can use any IdP that supports SAML 2.0. After you configure the SSO integration you need to map group SAML group membership to user groups in Cortex Cloud.
    

SSO authentication has the following advantages:

-   Removes the administrative burden of requiring separate accounts to be configured through the Customer Support Portal.
    
-   Enforces multi-factor authentication (MFA) and any conditional access policies on the user login at the IdP before granting a user access to Cortex Cloud.
    
-   Maps SAML group memberships to user groups and roles, allowing you to manage role-based access control.
    
-   Removes access to Cortex Cloud when a user is removed or disabled in the IdP.
    

Customer Support Portal authentication, by contrast, is useful if you have users who need the same permissions across multiple tenants. If you use SSO for multiple tenants, you must set up the SSO configuration separately for each tenant, both in the IdP and in Cortex Cloud.

If you want to restrict the user login through SSO only, remove any direct role and user group mapping for the user on Cortex Gateway or the Cortex Cloud tenant. This removes Customer Support Portal access for the user. You then need to ensure that you add the SAML group mapping. The user can access and acquire the user group and roles based on SAML group mapping. Once completed, the user is able to access Cortex Cloud using SSO only and will not be able to use Customer Support Portal login method.

**Tip:**

You should have at least one user in the Customer Support Portal for backup, in case of any authentication issues with your IdP provider.

#### Authenticate users through the Customer Support Portal

Authenticate Cortex Cloud users when using the Customer Support Portal.

When you add users to your Customer Support Portal account, users are sent an invitation to join. After they accept, users can access Cortex Gateway and tenants, but they cannot view any tenants in the Gateway and cannot view any data in the tenant unless they are assigned a direct role or user group role. Only Account Admins can make any changes in Cortex Gateway.

**Note:**

You must be assigned the Super User role in the Customer Support Portal to add users in the Customer Support Portal.

The first Super User who logs into Cortex Gateway is automatically assigned the Account Admin role and has access to the tenant. The user who activates the Cortex Cloud tenant will also be assigned the Account Admin role (if there is no current Account Admin role) or Instance Admin (if there is an existing Account Admin role) and will have access to the tenant. Any additional users including Super Users need to be assigned access to the tenant.

When users log into Cortex Gateway or the tenant they are prompted to sign into the Customer Support Portal using their username and password. This is the default method of authentication.

**Note:**

After users are added to the Customer Support Portal and they accept the invitation, you can manage them in Cortex Gateway or the Cortex Cloud tenant.

How to authenticate users through the Customer Support Portal

1.  Add users to your Customer Support Portal account, by logging into [https://support.paloaltonetworks.com/](https://support.paloaltonetworks.com/) and doing one of the following:
    
    -   In your Customer Support User Account, create users.
        
        1.  On the left-hand side menu, select Members → Create New User .
            
        2.  Add the member details and click Submit.
            
            An email is sent to the user which must be accepted within seven days.
            
            For more detailed information including how to reset the invitation, see [How a Super User Creates a New Customer Support Portal User Account](https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClNPCA0).
            
        
    -   Send an Account Registration Link.
        
        A registration link is generated by a Customer Support Portal account Super User and shared with users who need to create a login for access to the account.
        
        1.  On the left-hand side menu, select Account Management → Account Details, and click User Access.
            
        2.  In the Account Registration link, click Create.
            
        3.  Copy and send the link to the users you want to add.
            
            When clicking the link, users are required to enter their registration details and submit them to the Customer Support Portal.
            
            After users have submitted their details, the Super User receives a notification that a user has been created.
            
        
        For more information about how to generate, regenerate, or disable a link, see [How to Use the Account Registration Link](https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClNXCA0).
        
    
2.  Log in to [Cortex Gateway](https://cortex-gateway.paloaltonetworks.com/accounts) .
    
    After the user accepts the invitation, you see the added users. You must assign a role to the user directly or add them to user groups in Cortex Gateway or in the Cortex Cloud tenant.

#### Authenticate users using SSO

Set up authentication in the Cortex Cloud tenant using SSO.

Cortex Cloud enables you to authenticate system users securely across enterprise-wide applications and websites with one set of credentials using single sign-on (SSO) with SAML 2.0. System users can authenticate using your organization's Identity Provider (IdP), such as Okta or PingOne. You can integrate with any IdP that is supported by SAML 2.0.

Configuring SSO with SAML 2.0 is dependent on your organization’s IdP. Some of the parameter values need to be supplied from your organization’s IdP and some need to be added to your organization’s IdP. You must have sufficient knowledge about IdPs, how to access your organization’s IdP, which values to add to Cortex Cloud, and which values to add to your IdP fields.

**Note:**

-   To set up SSO authentication in the tenant, you must be assigned an Instance Administrator or Account Admin role.
    
-   SAML 2.0 users must log in to Cortex Cloud using the FQDN (full URL) of the tenant. To allow login directly from the IdP to , you must set the relay state on the IdP to the FQDN of the tenant.
    
-   If you have multiple tenants, you must set up the SSO configuration separately for each tenant, both in the IdP and in Cortex Cloud.
    
-   Create groups in Cortex Cloud that correspond to the groups in your IDP.  Add the appropriate SAML group mapping from your IdP to each of the user groups in Cortex Cloud.
    
-   When a user logs in for the first time, the user account is automatically created (JIT provisioning), provided you mapped groups. This process requires either using the default role option or ensuring that SSO groups are properly mapped to Cortex Cloud groups. If the user belongs to a group that has a mapping, the user will be granted access automatically upon login.
    
-   If you are using AWS SSO, the `Application ACS URL` refers to the `Single Sign-On URL` and the `Application SAML Audience` refers to the `Audience URL (SP Entity ID)`. Both values can be copied from the Authentication Settings in Cortex Cloud.
    

If you are configuring Okta or Azure, follow the procedure in Okta or Azure AD. You can also adapt these instructions for use with any similar SAML 2.0 IdP.

1.  If you want to add another SSO connection to enable managing user groups with different roles and different IdPs, click Add SSO Connection.
    
    Different SSO parameters for an SSO are displayed to configure according to your organization’s additional IdP.
    
    **Note:**
    
    -   The first SSO cannot be deleted, it can only be deactivated by toggling SSO Enabled to off.
        
    -   The Domain parameter is predefined for the first SSO.
        
        If you add additional SSO providers, you must provide the email Domain in the SSO Integration settings for all providers except the first. Cortex Cloud uses this domain to determine to which identity provider to send the user for authentication.
        
    -   When mapping IdP user groups to Cortex Cloud user groups, you must include the group attribute for each IdP you want to use. For example, if you are using Microsoft Azure and Okta, your Cortex Cloud user group SAML Group Mapping field must include the IdP groups for each provider. Each group name is separated by a comma.
        
    
2.  Set the following parameters using your organization’s IdP.
    
    -   **General parameters**
        
    -   **IdP Attribute Mapping**
        
    -   **Advanced Settings** (optional)
        
    
3.  Save your changes.
    
    Whenever an SSO user logs in to Cortex Cloud, the following login options are available.
    
    -   Sign-in with SSO
        
        If you have enabled more than one SSO provider, an optional email field appears. If the user does not enter an email address or if the email address does not match an existing domain, the user is automatically directed to the default IdP provider (the first in the list of SSO providers in the Authentication Settings). If the user enters an email address and it matches a domain listed in the Domain field in the SSO Integration settings for one of your IdPs, Sign-In with SSO sends the user to the IdP associated with that email domain.
        
    

##### General parameters

| Parameter | Description |
| --- | --- |
| IdP SSO or Metadata URL | Select the option that meets your organization's requirements. Indicates your SSO URL, which is a fixed, read-only value based on your tenant's URL using the format **``https://_`<name of tenant>`_.crtx.paloaltonetworks.com/idp/saml``**. For example, **`https://tenant1.crtx.paloaltonetworks.com/idp/saml`** You need this value when configuring your IdP. |
| IdP SSO URL | Specify your organization’s SSO URL, which is copied from your organization’s IdP. |
| Metadata URL |
| Audience URI (SP Entity ID) | Indicates your Service Provider Entity ID, also known as the ACS URL. It is a fixed, read-only value using the format, **``https://_`<name of tenant>`_.paloaltonetworks.com``**. For example `https://tenant1.crtx.paloaltonetworks.com`. You need this value when configuring your organization’s IdP. |
| Default Role | (Optional) Select the default role that you want any user to automatically receive when they are granted access to Cortex Cloud through SSO. This is an inherited role and is not the same as a direct role assigned to the user. |
| IdP Issuer ID | Specify your organization’s IdP Issuer ID, which is copied from your organization’s IdP. |
| X.509 Certificate | Specify your X.509 digital certificate, which is copied from your organization’s IdP. |
| Domain | Relevant only for multiple SSOs. For one SSO, this is a fixed, read-only value. Associate this IdP with a specific email domain (user@<domain>). When logging in, users are redirected to the IdP associated with their email domain or to the default IdP if no association exists. |

##### IdP attribute mapping

These IdP attribute mappings are dependent on your organization’s IdP.

| Parameter | Description |
| --- | --- |
| Email | Specify the email mapping according to your organization’s IdP. |
| Group Membership | Specify the group membership mapping according to your organization’s IdP. \*\*Note:\*\* Cortex Cloud requires the IdP to send the group membership as part of the SAML token. Some IdPs send values in a format that include a comma, which is not compatible with Cortex Cloud. In that case, you must configure your IdP to send a single value without a comma for each group membership. For example, if your IdP sends the Group DN (a comma-separated list), by default, you must configure IdP to send the Group CN (Common Name) instead. |
| First Name | Specify the first name mapping according to your organization’s IdP. |
| Last Name | Specify the last name mapping according to your organization’s IdP. |

##### Advanced settings

The following advanced settings are optional to configure and some are specific for a particular IdP.

| Parameter | Description |
| --- | --- |
| Relay State | (Optional) Specify the URL for a specific page that you want users to be directed to after they’ve been authenticated by your organization’s IdP and log in to Cortex Cloud. |
| IdP Single logout URL | (Optional) Specify your IdP single logout URL provided by your organization’s IdP to ensure that when a user initiates a logout from Cortex Cloud, the identity provider logs the user out of all applications in the current identity provider login session. |
| SP Logout URL | (Optional) Indicates the Service Provider logout URL that you need to provide when configuring a single logout from your organization’s IdP to ensure that when a user initiates a logout from Cortex Cloud, the identity provider logs the user out of all applications in the current identity provider login session. This field is read-only and uses the following format `https://<name of tenant>.crtx.paloaltonetworks.com/idp/logout`, such as `https://tenant1.crtx.paloaltonetworks.com/idp/logout`. |
| Service Provider Public Certificate | (Optional) Specify your organization’s IdP service provider public certificate. |
| Service Provider Private Key (Pem Format) | (Optional) Specify your organization’s IdP service provider private key in Pem Format. |
| Remove SAML RequestedAuthnContext | (Optional) Requires users to log in to Cortex Cloud using additional authentication methods, such as biometric authentication. Selecting this removes the error generated when the authentication method used for previous authentication is different from the one currently being requested. See [here](https://learn.microsoft.com/en-us/troubleshoot/azure/active-directory/error-code-aadsts75011-auth-method-mismatch) for more details about the `RequestedAuthnContext` authentication mismatch error. |
| Force Authentication | (Optional) Requires users to reauthenticate to access the Cortex Cloud tenant if requested by the idP, even if they already authenticated to access other applications. |

##### Troubleshoot SSO issues

The following list describes the common errors and issues when using SAML 2.0 authentication.

-   Errors in your IdP could mean the Service Provider Entity ID and/or Service Identifier are not properly configured in the IdP or in the Cortex Cloud settings.
    
-   SAML attributes from the IdP are not properly mapped in Cortex Cloud. The attributes are case sensitive and must exactly match in your IdP and in the Cortex Cloud IdP Attributes Mapping.
    
-   Group memberships from the IdP have not been properly mapped to Cortex Cloud user groups. Verify the values your identity provider is sending, to properly map the groups in Cortex Cloud.
    
-   The identity provider is not configured to sign both the SAML response and the assertion on the login token. Your IdP must be configured to sign both to ensure a secure login.
    
-   If you require further troubleshooting, we recommend using your browser's built-in developer tools or additional browser plugins to capture the login request and SAML token.

#### Set up Okta as the Identity Provider Using SAML 2.0
This topic provides specific instructions for using Okta to authenticate your Cortex Cloud users. As Okta is a third-party software, specific procedures, and screenshots may change without notice. We encourage you to also review the [Okta documentation for app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps_apps.htm).

To configure SAML SSO in Cortex Cloud, you must be a user who can access the Cortex Cloud tenant and have either the Account Admin or Instance Administrator role assigned.

##### Task 1. Configure Okta Groups

Within Okta, assign users to [groups](https://help.okta.com/asa/en-us/content/topics/adv_server_access/docs/setup/create-a-group.htm) that match the user groups they will belong to in Cortex Cloud. Users can be assigned to multiple Okta groups and receive permissions associated with multiple user groups in Cortex Cloud. Use an identifying word or phrase, such as Cortex Cloud, within the group names. For example, Cortex Cloud Analysts. This allows you to send only relevant group information to Cortex Cloud, based on a filter you will set in the group attribute statement.

Create a list of the Okta groups and their corresponding Cortex Cloud user groups (or the Cortex Cloud user groups you intend to create) and save this list for later use when configuring user groups in Cortex Cloud.

##### Task 2. Copy Single SSO and Audience URI Values from Cortex Cloud

1.  Expand the SSO Integration settings.
    
2.  Copy and save the values for Single Sign-On URL and Audience URI (SP Entity ID).
    
    Both values are needed to configure your IdP settings.
    
    You cannot save the enabled SSO Integration at this time, as it requires values from your IdP.
    

##### Task 3. Configure Cortex Cloud Application in Okta

1.  In Okta, create a Cortex Cloud application and Edit the SAML Settings.
    
2.  Paste the Single sign-on URL and the Audience URI (SP Entity ID) that you copied from the Cortex Cloud SSO settings. The Audience URI should also be pasted in the Default RelayState field, which allows users to log in to Cortex Cloud directly from the Okta dashboard.
    
3.  Click Show Advanced Settings, verify that Okta is configured to sign both the response and the assertion signature for the SAML token, and then click Hide Advanced Settings.
    
4.  Cortex Cloud requires the IdP to send four attributes in the SAML token for the authenticating user.
    
    -   Email address
        
    -   Group membership
        
    -   First Name
        
    -   Last Name
        
    
    Configure Okta to send group memberships of the users using the `memberOf` attribute. Use the word or phrase you selected when configuring Okta groups (such as Cortex Cloud) to create a filter for the relevant groups.
    
5.  Copy the exact names of the attribute statements from Okta and save them, as they are required to configure the Cortex Cloud SSO integration. In the example above, the names are FirstName, LastName, Email, and memberOf. The attribute names are case-sensitive.
    

##### Task 4. Copy IdP SSO URL, Identity Provider Issuer, and X.509 Certificate Values

1.  In Okta, from your Cortex Cloud application page, click View SAML setup instructions. If you do not see this button, verify you are on the Sign On tab of the application.
    
2.  Copy and save the values for Identity Provider Single Sign-On URL, Identity Provider Insurer, and the X.509 Certificate. These values are needed to configure your Cortex Cloud SSO Integration.
    

##### Task 5. Configure the Cortex Cloud SSO Integration

1.  Expand the SSO Integration settings.
    
2.  Use the following table to complete the SSO Integration settings, based on the values you saved from Okta.
    
    | Okta | Cortex Cloud Field |
    | --- | --- |
    | Identity Provider Single Sign-On URL | IdP SSO URL |
    | Identity Provider Issuer | IdP Issuer ID |
    | X.509 Certificate | X.509 Certificate |
    
3.  In the IdP Attributes Mapping section, enter the attribute names from Okta. The names are case-sensitive and must match exactly.
    
4.  Save your settings.
    

##### Task 6. Map SAML Group Memberships to Cortex Cloud User Groups

1.  Right-click a user group and select Edit Group.
    
2.  In the SAML Group Mapping field add the Okta group(s) that should be associated with this user group. Multiple groups should be separated with a comma. The Okta group name must match the exact value sent in the token.
    
3.  Save your settings.
    
4.  Repeat for each user group.
    

##### Task 7. Test SSO Login

1.  Go to the Cortex Cloud tenant URL and Sign-In with SSO.
    
    **Note:**
    
    When using SAML 2.0, users are required to authenticate by logging in directly at the tenant URL. They cannot log in via Cortex Gateway.
    
2.  After authentication to Okta, you are redirected again to the Cortex Cloud tenant.
    
3.  When logged in, validate that you have been assigned the proper roles.
    
    To view your role and any role assigned to a user group you are a member of, click your name in the bottom left-hand corner, and click About.

#### Set up Azure AD as the Identity Provider Using SAML 2.0
This topic provides specific instructions for using Azure AD to authenticate your Cortex Cloud users. As Azure AD is a third-party software, specific procedures, and screenshots may change without notice. We encourage you to also review the [Azure AD documentation](https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-setup-sso).

To configure SAML SSO in Cortex Cloud, you must be a user who can access the Cortex Cloud tenant and have either the Account Admin or Instance Administrator role assigned.

The following video is a step-by-step guide configuring SSO for Azure AD: [Azure AD SSO](https://www.youtube.com/watch?v=nwF3hY3wgc0).

##### Task 1. Configure Azure AD Security Groups

Within Azure AD, assign users to [security groups](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/how-to-manage-groups) that match the user groups they will belong to in Cortex Cloud. Users can be assigned to multiple Azure AD groups and receive permissions associated with multiple user groups in Cortex Cloud. Use an identifying word or phrase, such as Cortex Cloud, within the group names. For example, Cortex Cloud Analysts. This allows you to send only relevant group information to Cortex Cloud, based on a filter you will set in the group attribute statement.

##### Task 2. Copy Single SSO and Audience URI Values from Cortex Cloud

1.  By default, SSO is disabled in Cortex Cloud.
    
2.  Expand the SSO Integration settings.
    
3.  Copy and save the values for Single Sign-On URL and Audience URI (SP Entity ID).
    
    Both values are needed to configure your IdP settings.
    
    **Important:**
    
    When copying the Single Sign-On URL value, remove `idp/saml` and leave the trailing `/`.
    
    For example, if the Single Sign-On URL is `https://clientname.panproduct.region.paloaltonetworks.com/idp/saml`, just copy `https://clientname.panproduct.region.paloaltonetworks.com/`.
    
4.  You cannot save the enabled SSO Integration at this time, as it requires values from your IdP.
    

##### Task 3. Configure Cortex Cloud Application in Azure AD

1.  From within Azure AD, create a Cortex Cloud application and Edit the Basic SAML Configuration.
    
    
    
2.  Paste the Single sign-on URL and the Audience URI (SP Entity ID) that you copied from the Cortex Cloud SSO settings. The Single sign-on URL from Cortex Cloud should be pasted in the Reply URL and the Sign on URL fields. The Audience URI (SP Entity ID) value from Cortex Cloud should be pasted in the Identifier (Entity ID) and Relay State fields. This allows users to log in to Cortex Cloud directly from Azure AD.
    
    
    
3.  In the SAML Certificates section, click Edit and verify that Azure is configured to sign both the response and the assertion.
    
    
    
4.  To have Azure AD send group membership for the user in the SAML token, you must \+ Add a group claim in the Attributes & Claims section. Send the Security groups, using the source attribute Group ID. Use the word or phrase you selected when configuring Azure AD security groups (such as Cortex Cloud) to create a filter. Customize the name of the group claim as memberOf.
    
    
    
5.  In addition to group membership, verify that there are also claims for:
    
    -   Email address
        
    -   First Name
        
    -   Last Name
        
    

##### Task 4. Copy Login URL, Azure ID Identifier, and Attribute Claims

1.  In Azure, from the Single sign-on page, in the Set up Cortex Cloud Production section, copy the values for the Login URL and Azure AD Identifier. You need these values to configure the SSO Integration in Cortex Cloud.
    
    
    
2.  Edit Attributes & Claims and copy the values in the Claim name column. The claim name is case sensitive. You need these values to configure the SSO Integration in Cortex Cloud.
    
    **Note:**
    
    The default attributes shown on the main single sign-on page in Azure AD are not the values you need. You must click Edit next to Attributes and Claims to view and copy the actual values.
    
    
    

##### Task 5. Download the Certificate

From the SAML Certificates section in Azure AD, Download the Certificate (Base64). You need the contents of this file to configure the Cortex Cloud SSO Integration.

##### Task 6. Copy the Source IDs for Azure AD Security Groups

The claim for the membership attribute that is sent to Cortex Cloud uses the Object Id of the group. The Object Id is different from the Azure AD security group name. You can find the Object Id for each of your Azure AD security groups by navigating to Users and groups in Azure AD, clicking on the group name, and viewing the Object id. Create a list of the group names and corresponding Object Ids for every Azure AD security group you want to map to a Cortex Cloud user group.

##### Task 7. Configure the Cortex Cloud SSO Integration

1.  By default, SSO is disabled in Cortex Cloud.
    
2.  Expand the SSO Integration settings.
    
3.  Use the following table to complete the SSO Integration settings, based on the values you saved from Azure AD.
    
    | Azure AD | Cortex Cloud Field |
    | --- | --- |
    | Login URL | IdP SSO URL |
    | Azure AD Identifier | IdP Issuer ID |
    | Contents of the downloaded certificate file. | X.509 Certificate |
    
4.  In the IdP Attributes Mapping section, enter the attribute claim names from Azure AD. The names are case sensitive and must match exactly.
    
    **Note:**
    
    The attribute claim name must exactly match the value sent by your IdP. In some cases, this may be the full attribute name/namespace, depending on the configuration of our IdP
    
    
    
5.  (Optional) Under Advanced Settings, select the checkboxes for ADFS and Compress encode URL (ADFS). In some circumstances, these fields may be required by your Azure AD configuration.
    
6.  Save your settings.
    

##### Task 8. Map SAML Group Memberships to Cortex Cloud User Groups

1.  Right-click a user group and select Edit Group.
    
2.  In the SAML Group Mapping field add the Azure AD group(s) Object Ids that should be associated with this user group. Multiple Object Ids should be separated with a comma. The Azure AD group Object Id must match the exact value sent in the token.
    
3.  Save your settings.
    
4.  Repeat for each user group.
    

##### Task 9. Test SSO Login

1.  Go to the Cortex Cloud tenant URL and Sign-In with SSO.
    
    **Note:**
    
    When using SAML 2.0, users are required to authenticate by logging in directly at the tenant URL. They cannot log in via Cortex Gateway.
    
2.  After authentication to Azure AD, you are redirected again to the Cortex Cloud tenant.
    
3.  When logged in, validate that you have been assigned the proper roles.
    
    To view your role and any role assigned to a user group you are a member of, click your name in the bottom left-hand corner, and click About.

### Cloud service provider (CSP) onboarding

Learn about onboarding your cloud service provider to Cortex Cloud.

Onboard your cloud service provider (CSP) from the Data Source page.

#### Ingest cloud assets

Explains how to onboard cloud service providers from the Data Sources & Integrations page.

Cortex Cloud provides a unified, normalized asset inventory for cloud assets. This capability provides deeper visibility to all the assets and superior context for incident investigation.

The cloud service provider (CSP) onboarding wizard is designed to facilitate the seamless setup of CSP data into Cortex Cloud. The guided experience requires minimal user input; simply define the scope of your CSP accounts and specify the scan mode. For full control of the CSP setup, you can use the advanced settings. Based on the onboarding settings, Cortex Cloud generates an authentication template to establish trust to the CSP and grant permissions to Cortex Cloud. The template must be executed in the CSP to complete the onboarding process. Execution of the template grants the permissions and includes a component that notifies Cortex Cloud of the execution details and a new cloud instance is created.

**Note:**

The cloud accounts being onboarded must be owned by the customer performing the onboarding process.

You can leverage your CSP hierarchy and choose whether to onboard individual accounts one at a time or collection of accounts (such as organization in AWS and GCP or management group in Azure). Various options are available for each CSP to allow you to customize your data collection.

Cortex Cloud supports two scan modes:

-   **Cloud scan:** (Recommended) The scanning takes place within the Cortex Cloud cloud environment. No additional setup is needed.
    
-   **Outpost scan:** The scanning is performed on infrastructure deployed to a CSP account owned by you. The CSP account should be a dedicated account for the outpost, free from other resources. Each CSP account can host only one outpost. This mode requires additional cloud provider permissions and may incur additional cloud costs.
    

To allow you to fine tune your CSP data collection, you can modify the scope of data collection by including or excluding specific regions. If you selected to collect data from an organizational unit that is not the lowest on the CSP hierarchy (such as organization or organizational unit in AWS, organization or folder in GCP, and tenant or management group in Azure), you can also modify the scope by including or excluding specific accounts, projects, or subscriptions. If you choose to include specific accounts, only those specified accounts will be included, even if additional accounts are added to the CSP after onboarding. If you choose to exclude specific accounts, any new accounts added to the CSP after onboarding will be included in the scope. Excluded accounts are not visible in Cortex Cloud.

The advanced settings allow you to select which Cortex Cloud modules you want to enable for this CSP. By default, the following security capabilities are enabled:

-   Discovery engine
    
-   Cloud security posture management
    
-   Cloud infrastructure entitlement management
    
-   Agentless disk scanning
    
-   AI security posture management
    

The additional security capabilities you can enable include:

-   XSIAM analytics: Analyzes your endpoint data to develop a baseline and raise Analytics and Analytics BIOC alerts when anomalies and malicious behaviors are detected.
    
-   Data security posture management: An agentless multi-cloud data security solution that discovers, classifies, protects, and governs sensitive data.
    
-   Registry scanning: Scan container registry images for vulnerabilities. malware, and secrets. You can configure your initial preference for scanning your registry. Any newly discovered registry, repository or image in the account will be scanned by default.

#### Onboard Amazon Web Services

Follow the AWS onboarding wizard and Cortex Cloud creates a custom CloudFormation authentication template to be deployed in AWS CloudFormation.

Follow this wizard to onboard your Amazon Web Services (AWS) environment. The AWS onboarding wizard is designed to facilitate the seamless setup of AWS data into Cortex Cloud. The guided experience requires minimal user input; simply define the scope of your AWS accounts and specify the scan mode. For full control of the setup, you can use the advanced settings. Based on the onboarding settings, Cortex Cloud generates a CloudFormation authentication template to establish trust with AWS and grant permissions to Cortex Cloud. The template must be executed in AWS CloudFormation to complete the onboarding process. Execution of the template grants the permissions and includes a component that notifies Cortex Cloud of the execution details, and a new cloud instance is created.

##### Before you begin:

-   Ensure you have access to AWS Management Console.
    
-   Ensure you have the Required AWS permissions.
    

To onboard AWS:

1.  Select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Amazon Web Services (AWS), then hover over it and click Add.
    
4.  In the AWS onboarding wizard, select the type of AWS environment:
    
    -   **Government:** AWS GovCloud environments for compatibility with FedRAMP-certified tenants.
        
    -   **Commercial:** (Default) Standard cloud deployment typically used for private and public sector organizations that do not require isolated government-specific infrastructure.
        
    
5.  Select the scope for this data source:
    
    -   **Organization:** (Default) A collection of AWS accounts that are managed centrally.
        
    -   **Organizational Unit:** A group of AWS accounts within an organization. An organizational unit can also contain other organizational units.
        
    -   **Account:** A specific AWS member account.
        
    
6.  Choose the Scan Mode:
    
    -   **Cloud Scan:** (Recommended) Security scanning is performed in the Cortex Cloud cloud environment.
        
    -   **Scan with Outpost:** Security scanning is performed on infrastructure deployed to a cloud account owned by you. If you select this option, choose the outpost account to use for this instance.
        
        **Note:**
        
        Scanning with an outpost may require additional CSP permissions and may incur additional CSP costs.
        
    
7.  (Optional) Click Show advanced settings to define advanced settings:
    
    -   **Instance Name:** Enter a unique instance name or leave it empty to be automatically populated. The automatic naming convention is the CSP name followed by the ID of the scope unit selected in the onboarding wizard. For example, when onboarding an Amazon Web Services account, the automatic name would be `AWS-<accountID>` where `<accountID>` is the ID of the account onboarded.
        
    -   **Scope Modifications:** Use these settings to fine-tune your AWS scope, you can modify the scope by including or excluding specific regions. If you selected a Government environment, only AWS GovCloud regions are displayed. Additionally, if you selected an organization or organizational unit as the scope, you can modify the scope by including or excluding specific accounts. If you choose to include specific accounts, only those specified accounts will be included, even if additional accounts are added to your AWS environment after onboarding. If you choose to exclude specific accounts, any new accounts added to your AWS environment after onboarding will be included in the scope.
        
        **Note:**
        
        When onboarding an AWS organization or organizational unit (OU), Cortex Cloud creates IAM resources in every account within that organization or OU. This occurs even if you choose to exclude specific accounts from being scanned. While excluded accounts will not be scanned and will not appear in the asset inventory, the IAM resources may still be present.
        
    -   **Additional Security Capabilities:** Choose which security capabilities you want to benefit from. Some security capabilities are enabled by default and can be modified. Adding security capability typically requires additional cloud provider permissions. For detailed information on the permissions required, see Cloud service provider permissions. The additional security capabilities you can enable include:
        
        -   **XSIAM analytics:** Analyzes your endpoint data to develop a baseline and raise Analytics and Analytics BIOC alerts when anomalies and malicious behaviors are detected.
            
        -   **Data security posture management:** An agentless data security scanner that discovers, classifies, protects, and governs sensitive data. DSPM is not currently available in AWS GovCloud environments.
            
        -   **Registry scanning:** A container registry scanner that scans registry images for vulnerabilities. malware, and secrets. For more details, see Configure registry scanning for cloud accounts Configure registry scanning for cloud accounts
            
        -   **Serverless functions scanning:** Implement serverless scanning to detect and remediate vulnerabilities within serverless functions during the development lifecycle. Seamless integration into CI/CD pipelines enables automated security scans for a continuously secure pre-production environment.
            
            See Required AWS permissions for Cortex Cloud onboarding for the specific permissions you need to grant in your AWS account for scanning outposts and accessing logs.
            
        -   **Automation:** Use automation to pre-configure a list of integrations and associated commands to automate security issue responses. Commands can be utilized individually or as part of custom playbooks for issue remediation.
            
            -   **Log Level:** (Optional - for Automation only) Configure the automation integration logging level. Possible values are:
                
                -   Off (Default)
                    
                -   Debug
                    
                -   Verbose
                    
                
            
        -   **Agentless disk scanning:** (Recommended) Implement agentless disk scanning to remotely detect and remediate vulnerabilities during the development lifecycle.
            
        
    -   **Cloud Tags:** Define tags and tag values to be added to any new resource created by Cortex Cloud in the cloud environment. Note: The `managed_by = paloaltonetworks` tag is automatically added to all resources. This tag is mandatory. You cannot edit or remove this tag.
        
    -   **Log Collection Configuration:** To maximize security coverage, include the collection of audit logs using CloudTrail. This may require additional cloud service provider permissions. For detailed information on the permissions required, see Log Collection. Select the collection method:
        
        -   Automated collection: Have Cortex Cloud collect audit logs using AWS resources in your AWS environment. You can also choose to Collect data events.
            
            **Note:** For the purpose of collecting audit logs, Cortex Cloud automatically provisions dedicated AWS resources in your AWS environment, specifically an AWS CloudTrail trail, an Amazon SQS queue, and an Amazon S3 bucket. As a result, you may incur increased AWS costs, primarily due to CloudTrail event logging. While the trail defaults to capturing both read and write management events, the majority of these costs are typically associated specifically with read management events.
            
            To help manage these costs, you may manually modify the trail (`` cortex-trail-`<aws_account_id>` ``) configuration in the AWS Management Console to disable read events. While this reduces detection coverage, it should significantly lower CloudTrail-related charges. It is important to note that these manual changes will be overwritten during future Cortex Cloud updates, but they can serve as a temporary measure for cost control.
            
        -   Custom (user defined): Select this option if you want to use an existing Amazon S3 bucket for storing your CloudTrail logs. When you select this option, you will need to enter the following details when manually executing the CloudFormation authentication template in CloudFormation: CloudTrail bucket name, CloudTrail SNS ARN, and if relevant, the CloudTrail KMS ARN.
            
            You must ensure that the KMS key region and the SNS topic region are the exact same as the AWS region where you are deploying the CloudFormation stack.
            
        
    
8.  Click Save. Cortex Cloud creates an instance in the pending state.
    
9.  To complete the process, deploy the CloudFormation authentication template in AWS CloudFormation using one of the following methods:
    
    -   **Automated:** (Recommended) Click Execute in AWS to connect to AWS CloudFormation and create the stack. If you select Automated, you must already be logged in to AWS CloudFormation.
        
    -   **Manual:** Click Download CloudFormation to download the CloudFormation authentication template file.
        
    
    The CloudFormation authentication template is reusable and can be executed as many times as you want to create new cloud instances with the settings you defined in the onboarding wizard.
    
10.  Click Close.
     

Cortex Cloud generates a CloudFormation authentication template based on the settings you configured in the AWS onboarding wizard.

**Next step:** Follow the instructions to deploy the CloudFormation authentication template in AWS CloudFormation to create a stack.

###### Required AWS permissions for Cortex Cloud onboarding

Use the following template to create a dedicated role with the permissions required for onboarding AWS to Cortex Cloud:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CortexCloudOnboarding",
      "Effect": "Allow",
      "Action": [
        "iam:GetRole",
        "iam:UpdateAssumeRolePolicy",
        "iam:GetPolicyVersion",
        "iam:GetPolicy",
        "iam:UpdateRoleDescription",
        "iam:DeletePolicy",
        "iam:ListRoles",
        "iam:CreateRole",
        "iam:DeleteRole",
        "iam:AttachRolePolicy",
        "iam:PutRolePolicy",
        "iam:CreatePolicy",
        "iam:PassRole",
        "iam:CreateServiceLinkedRole",
        "iam:DetachRolePolicy",
        "iam:ListPolicyVersions",
        "iam:DeleteRolePolicy",
        "iam:UpdateRole",
        "iam:DeleteServiceLinkedRole",
        "iam:ListRolePolicies",
        "iam:GetRolePolicy",
        "iam:DeletePolicyVersion",
        "iam:SetDefaultPolicyVersion",
        "lambda:\*",
        "kms:\*",
        "s3:\*",
        "sqs:\*",
        "sns:\*",
        "cloudtrail:\*",
        "cloudformation:\*"
      ],
      "Resource": "\*"
    }
  ]
}
```

To enable serverless function scanning, grant the following permissions in your AWS account for scanning outposts and accessing logs:

```
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Effect": "Allow",
     "Action": [
       "lambda:GetFunction",
       "lambda:GetFunctionConfiguration",
       "lambda:GetLayerVersion",
       "iam:GetRole"
     ],
     "Resource": "\*"
   }
 ]
}
```

##### Manually upload template to AWS

Learn how to manually create a stack in AWS Management Console using the CloudFormation file downloaded in the onboarding wizard.

When you have downloaded the CloudFormation template file in the onboarding wizard, you must connect to AWS Management Console to create a stack using the template file.

**Prerequisite:**

Before you begin, ensure you have:

-   An AWS account
    
-   Access to AWS Management Console
    
-   Permission to create a stack and its resources in AWS CloudFormation
    

1.  In AWS Management Console, navigate to [CloudFormation](https://console.aws.amazon.com/cloudformation/).
    
2.  On the Stacks page, click Create stack, and then select With new resources (standard).
    
3.  On the Create stack page, in Prerequisite - Prepare template, select Choose an existing template.
    
4.  In Specify template, select Upload a template file, then click Choose file and upload the template downloaded from your Cortex Platform. Click Next.
    
5.  In the Specify stack details page, enter a Stack name.
    
6.  In Parameters, enter a unique Amazon Resource Name (ARN) for the custom CortexPlatformRole role, and an ExternalID.
    
7.  If you have enabled custom log collection, enter the following details:
    
    -   CloudTrailKmsArn: (Optional) The ARN of the AWS KMS key used to encrypt the CloudTrail log files.
        
    -   CloudTrailLogBucket: The name of the Amazon S3 bucket where CloudTrail stores the log files.
        
    -   CloudTrailSnsArn: The ARN of the Amazon SNS topic that CloudTrail uses to send notifications when new log files are delivered.
        
    
    **Note:**
    
    You must ensure that the KMS key region and the SNS topic region are the exact same as the AWS region where you are deploying the CloudFormation stack.
    
    Click Next and Next again.
    
8.  In Review, acknowledge that CloudFormation might create IAM resources with custom names and click Submit. The stack is complete when it appears in the Stacks list with status of CREATE_COMPLETE.
    

When the template is successfully uploaded to AWS and the stack creation is complete, the initial discovery scan is started. When the scan is complete, you can view the discovered assets in Asset Inventory.

##### Configure AWS integration instances and monitor integration instance health

Enable automations from Data Sources & Integrations and monitor AWS integration instance health.

You can streamline and simplify configuring AWS integration instances within the Data Sources & Integrations page. This includes granting the necessary permissions for the platform to execute commands, scripts, and playbooks as part of issue response. All automation permissions are added to the Terraform as part of the setup process.

Configure a new or existing AWS integration instance

**Note:**

If you have not yet onboarded your cloud integration, see Ingest cloud assets.

You can configure a new AWS integration instance or edit an existing AWS integration instance, for example to enable automations.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Select the AWS integration row.
    
    -   To configure a new AWS integration instance: Click Add Instance.
        
    -   To edit an existing AWS integration instance:
        
    
3.  (Optional) Under Show advanced settings, select Automation and select a log level for the automation integration logs.
    
4.  If the instance is not enabled, in the row for the AWS integration instance, right-click and select Enable. Alternatively, click the more options icon and select Enable.
    
5.  Manually upload the template (Terraform) to the relevant cloud provider.
    
    An automation integration instance with the same name as the cloud integration instance is automatically created and automation permissions are automatically updated in the system. For more information, see Ingest cloud assets.
    

Monitor AWS integration instance health

Monitoring AWS integration instance health ensures continuous, reliable operation, facilitating issue response and improving overall security posture.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  In the AWS integration instance row, click the View Details link and then click a specific Instance Name.
    
    From the list of health statuses, you can click the following to see automation instance health status:
    
    -   Permissions: Shows any permission issues or missing permissions for the instance.
        
    -   Automation: Indicates any errors during automation instance creation or configuration.
        
        **Note:**
        
        Currently, automation permission errors or missing automation permissions do not affect the Automation health status. You can view any permission errors or missing permissions in the the Permissions health status.

#### Onboard Google Cloud Platform

Follow the GCP onboarding wizard, and Cortex Cloud creates a custom authentication template to be applied in GCP.

Follow this wizard to onboard your Google Cloud Platform (GCP) environment. The GCP onboarding wizard is designed to facilitate the seamless setup of GCP data into Cortex Cloud. The guided experience requires minimal user input; simply define the scope of your GCP accounts and specify the scan mode. For full control of the setup, you can use the advanced settings. Based on the onboarding settings, Cortex Cloud generates an authentication template to establish trust to GCP and grant permissions to Cortex Cloud. The template must be applied in GCP to complete the onboarding process. Application of the template grants the permissions and includes a component that notifies Cortex Cloud of the execution details, and a new cloud instance is created.

##### Before you begin:

-   Ensure you have cccess to Google Cloud Console.
    
-   Ensure you have an admin user with the required admin GCP permissions.
    
-   Ensure you have the following APIs in the GCP project you are onboarding:
    
    -   [Cloud Resource Manager API](https://console.cloud.google.com/apis/api/cloudresourcemanager.googleapis.com)
        
    -   [Identity and Access Management (IAM) API](https://console.cloud.google.com/apis/api/iam.googleapis.com)
        
    -   [Cloud Pub/Sub API](https://console.cloud.google.com/apis/api/pubsub.googleapis.com) (if audit logs are enabled)
        
    -   If you plan on enabling Automation as an additional security capability, enable the following APIs:
        
        -   [Kubernetes Engine API](https://console.cloud.google.com/apis/api/container.googleapis.com)
            
        -   [Compute Engine API](https://console.cloud.google.com/apis/api/compute.googleapis.com)
            
        -   [Service Usage API](https://console.cloud.google.com/apis/api/serviceusage.googleapis.com)
            
        -   [Cloud Storage API](https://console.cloud.google.com/apis/api/storage-component.googleapis.com)
            
        
    

To onboard GCP:

1.  Select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Google Cloud Platform (GCP), then hover over it and click Add.
    
4.  In the GCP onboarding wizard, choose the scope for this data source:
    
    -   **Organization:** (Default) A collection of GCP projects that are managed centrally.
        
    -   **Folder:** A GCP folder can contain projects, folders, or a combination of both projects and folders.
        
    -   **Project:** A specific GCP project.
        
    
5.  Choose the Scan Mode:
    
    -   **Cloud Scan:** (Recommended) Security scanning is performed in the Cortex Cloud cloud environment.
        
    -   **Scan with Outpost:** Security scanning is performed on infrastructure deployed to a cloud account owned by you. If you select this option, choose the outpost account to use for this instance.
        
        **Note:**
        
        Scanning with an outpost may require additional CSP permissions and may incur additional CSP costs.
        
    
6.  (Optional) Click Show advanced settings to define advanced settings:
    
    -   **Instance Name:** Enter a unique instance name or leave it empty to be automatically populated. The automatic naming convention is the CSP name followed by the ID of the scope unit selected in the onboarding wizard. For example, when onboarding a Google Cloud Platform project, the automatic name would be `GCP-<projectID>` where `<projectID>` is the ID of the project onboarded.
        
    -   **Scope Modifications:** To allow you to fine-tune your GCP data collection, you can modify the scope by including or excluding specific regions. Additionally, if you selected an organization or folder as the scope, you can modify the scope by including or excluding specific projects. If you choose to include specific projects, only those specified projects will be included, even if additional projects are added to your GCP environment after onboarding. If you choose to exclude specific projects, any new projects added to your GCP environment after onboarding will be included in the scope. Excluded projects are not visible in Cortex Cloud.
        
    -   **Additional Security Capabilities:** Enable additional Cortex security add-ons, if available. This may require additional cloud provider permissions. For detailed information on the permissions required, see Cloud service provider permissions. The additional security capabilities you can enable include:
        
        -   **XSIAM analytics:** Analyzes your endpoint data to develop a baseline and raise Analytics and Analytics BIOC alerts when anomalies and malicious behaviors are detected.
            
        -   **Data security posture management:** An agentless multi-cloud data security solution that discovers, classifies, protects, and governs sensitive data.
            
        -   **Registry scanning:** Scan container registry images for vulnerabilities. malware, and secrets. You can configure your initial preference for scanning your registry. Any newly discovered registry, repository, or image in the account will be scanned by default. For more details, see Configure registry scanning for cloud accountsConfigure registry scanning for cloud accounts
            
        -   **Serverless functions scanning (Gen 1 only):** Implement serverless scanning to detect and remediate vulnerabilities within serverless functions during the development lifecycle. Seamless integration into CI/CD pipelines enables automated security scans for a continuously secure pre-production environment.
            
        -   **Automation:** Use automation to pre-configure a list of integrations and associated commands to automate security issue responses. Commands can be utilized individually or as part of custom playbooks for issue remediation.
            
        -   **Agentless disk scanning:** (Recommended) Implement agentless disk scanning to remotely detect and remediate vulnerabilities during the development lifecycle.
            
        
    -   **Log Level:** (Optional - for Automation only) Configure the automation integration logging level. Possible values are:
        
        -   Off (Default)
            
        -   Debug
            
        -   Verbose
            
        
    -   **Cloud Tags:** Define tags and tag values to be added to any new resource created by Cortex Cloud in the cloud environment. Note: The `managed_by = paloaltonetworks` tag is automatically added to all resources. This tag is mandatory. You cannot edit or remove this tag.
        
    -   **Log Collection Configuration:** To maximize security coverage, include collection of audit logs (GCP Pub/Sub). This may require additional cloud service provider permissions. For detailed information on the permissions required, see Cloud service provider permissions.
        
    -   Connect to GCP Workspace: Gain a comprehensive view of your Google Workspace identities and security. This provides you with detailed information on your users, groups, and organizational units, and collects security event logs to help you detect threats, improve your security posture, and meet compliance requirements.
        
        **Note:**
        
        If you want to connect to your GCP Workspace, you must first complete onboarding with the option disabled. Once the GCP cloud instance is created, perform the steps detailed in Connect Google Workspace with your GCP cloud instance.
        
    
7.  Click Save.
    
8.  Download the template file by clicking Download Terraform and then click Close.
    
    The Terraform authentication template is reusable and can be applied as many times as you want to create new instances with the settings you defined in the GCP onboarding wizard. The Terraform authentication template is valid for seven days from when it was created.
    

Cortex Cloud generates a Terraform authentication template based on the settings you configured in the GCP onboarding wizard.

**Next step:** Apply the Terraform authentication template in GCP.

###### Required admin GCP permissions for Cortex Cloud onboarding

Use the following template to create a dedicated role with the permissions required for onboarding GCP to Cortex Cloud.

```
{
  "title": "CortexCloudOnboarding",
  "description": "Custom role with permissions required for onboarding Cortex Cloud",
  "stage": "GA",
  "includedPermissions": [
    "iam.roles.create",
    "iam.roles.delete",
    "iam.roles.get",
    "iam.roles.list",
    "iam.roles.update",
    "iam.serviceAccounts.create",
    "iam.serviceAccounts.delete",
    "iam.serviceAccounts.get",
    "iam.serviceAccounts.getIamPolicy",
    "iam.serviceAccounts.list",
    "iam.serviceAccounts.setIamPolicy",
    "iam.serviceAccounts.update",
    "logging.sinks.create",
    "logging.sinks.delete",
    "logging.sinks.get",
    "logging.sinks.update",
    "pubsub.subscriptions.create",
    "pubsub.subscriptions.delete",
    "pubsub.subscriptions.getIamPolicy",
    "pubsub.subscriptions.setIamPolicy",
    "pubsub.subscriptions.update",
    "pubsub.topics.create",
    "pubsub.topics.delete",
    "pubsub.topics.getIamPolicy",
    "pubsub.topics.setIamPolicy",
    "pubsub.topics.update",
    "resourcemanager.folders.get",
    "resourcemanager.folders.getIamPolicy",
    "resourcemanager.folders.list",
    "resourcemanager.folders.setIamPolicy",
    "resourcemanager.organizations.get",
    "resourcemanager.organizations.getIamPolicy",
    "resourcemanager.organizations.setIamPolicy",
    "resourcemanager.projects.get",
    "resourcemanager.projects.getIamPolicy",
    "resourcemanager.projects.list",
    "resourcemanager.projects.setIamPolicy"
  ]
}
```

##### Manually upload template to GCP

Learn how to manually deploy the Terraform template file in Google Cloud Console.

When you have downloaded the Terraform template file in the onboarding wizard, you must connect to Google Cloud Console to create a stack using the template file.

**Prerequisite:**

Before you begin, ensure you have:

-   A GCP account.
    
-   Permission to create the required resources in Google Cloud Deployment Manager.
    
-   Installed Terraform on your local machine. You can download Terraform from the official [Terraform website](https://www.terraform.io/downloads.html) and follow the installation instructions for your operating system.
    
-   Installed the [GCP gcloud CLI tool](https://cloud.google.com/sdk/docs/install#linux).
    
-   Reviewed the introduction to Terraform for Cloud service provider (CSP) onboarding to understand the underlying logic of how Terraform interacts with your cloud environment.
    

1.  Open your local terminal (Command prompt, PowerShell, or Terminal).
    
2.  Log in to your GCP account using the gcloud CLI:
    
    ```
    gcloud auth login
    ```
    
3.  Create a directory on your local machine to store and run the Terraform code. If you have more than one GCP connector, you need a separate directory for each one:
    
    **Note:**
    
    The directory you create must be a subdirectory of the home directory.
    
    ```
    mkdir -p ~/terraform/gcp-connector-1
    ```
    
4.  Navigate to the directory you created and extract the Terraform files. Ensure all necessary Terraform files are present (`main.tf`, `template_params.tfvars`, etc).
    
    **Important:**
    
    You must not delete or move the Terraform files from this folder. It will prevent you from being able to edit your cloud instance in the future.
    
    ```
    cd ~/terraform/gcp-connector-1
    tar -xzvf <your_template>.tar.gz
    ```
    
5.  Initialize Terraform in your project directory:
    
    ```
    terraform init
    ```
    
6.  Apply your Terraform configuration using the downloaded parameter file. When prompted, enter the project ID if you configured one in the onboarding wizard:
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
    The Terraform template is deployed.
    

When the template is successfully uploaded to GCP, the initial discovery scan is started. When the scan is complete, you can view your cloud assets in Asset Inventory.

##### Connect Google Workspace with your GCP cloud instance
To gain full visibility into GCP permissions and identity relationships, highlight risks, and offer proper remediation, Cortex Cloud must ingest user, group, and group membership data from your Google Workspace. You need to create a custom role in Google Workspace, assign it specific privileges, and then assign your Cortex Cloud service account to this newly created role.

**Prerequisite:**

Ensure you have the Super Admin role in Google Workspace.

1\. Create a Cortex Cloud role in Google Workspace

1.  Log in to your [Google Admin Console](https://admin.google.com/).
    
2.  In the left menu, select Account → Admin roles.
    
3.  Click Create new role.
    
4.  In the Role info page, enter a name for the role, such as `cortex-cloud-security-role`.
    
5.  (Optional) Enter a description.
    
6.  Click Continue.
    
7.  In the Select Privileges page, in the Privilege Name list, under Admin API, select the following privileges:
    
    -   Organization Units > Read (This automatically selects the Organizational Units > Read permission. Leave it selected.)
        
    -   Users > Read
        
    -   Groups > Read
        
    
8.  Click Continue and then click Create Role.
    

2\. Assign the Cortex Cloud service account to the created role

1.  In Cortex Cloud, navigate to Settings → Data Sources & Integrations and select Google Cloud Platform (GCP) → View details.
    
2.  Identify the GCP cloud instance and click the instance name to open the details pane for that instance.
    
3.  In the details pane, click the more options icon at the top right corner and then select Authorization Details.
    
4.  Copy the value of Cortex discovery role.
    
5.  Log in to your [Google Admin Console](https://admin.google.com/).
    
6.  In the left menu, select Account → Admin roles.
    
7.  Select the role created previously and click Assign role.
    
8.  Click Assign service accounts and paste the value of the Cortex discovery role. Click Add.
    
9.  Click Assign role.
    

Your Cortex Cloud service account has been successfully granted the necessary permissions in Google Workspace to ingest user, group, and group membership data. It may take several hours for the results to appear in Cortex Cloud, depending on the size of your cloud estate.

3\. Enable Google Workspace in your GCP cloud instance

**Prerequisites:**

-   Ensure you have the organization ID of the Google Workspace you want to connect:
    
    -   Log in to your [Google Admin Console](https://admin.google.com/). and navigate to Account → Account settings → Profile. Next to Customer ID is your organization ID.
        
    
-   Ensure the organization ID you want to connect meets one of the following requirements:
    
    -   It must already be defined within your Domain Restricted Principles policy.
        
    -   It is the Workspace organization ID to which the GCP organization you have onboarded in this cloud instance belongs.
        
    

1.  In Cortex Cloud, navigate to Settings → Data Sources & Integrations and select Google Cloud Platform (GCP) → View details.
    
2.  Identify the GCP cloud instance and click Configuration at the right end of the cloud instance row.
    
3.  In the Google Cloud Provider (GCP) onboarding wizard, click Show advanced settings.
    
4.  Under Discovery Enhancements, select Connect to GCP Workspace.
    
5.  Enter the organization ID of your Google Workspace. You can enter more than one organization ID.
    
6.  Click Save.
    

You have successfully enabled the Google Workspace in your GCP cloud instance.

##### Configure GCP integration instances and monitor integration instance health

Enable automations from Data Sources & Integrations and monitor GCP integration instance health.

You can streamline and simplify configuring GCP integration instances within the Data Sources & Integrations page. This includes granting the necessary permissions for the platform to execute commands, scripts, and playbooks as part of issue response. All automation permissions are added to the Terraform as part of the setup process.

Configure a new or existing GCP integration instance

**Note:**

If you have not yet onboarded your cloud integration, see Ingest cloud assets.

You can configure a new GCP integration instance or edit an existing GCP integration instance, for example to enable automations.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  In the GCP integration row:
    
    -   To configure a new GCP integration instance: Click ⋮ and then click Add New Instance or click View Details and from the New Instance drop down select the GCP cloud service provider.
        
    -   To edit an existing GCP integration instance: Click View Details and then click the configuration pencil icon.
        
    
3.  (Optional) Under Show advanced settings, select Automation and select a log level for the automation integration logs.
    
4.  If the instance is not enabled, in the row for the GCP integration instance, right-click and select Enable. Alternatively, click the more options icon and select Enable.
    
5.  Manually upload the template (Terraform) to the relevant cloud provider.
    
    An automation integration instance with the same name as the cloud integration instance is automatically created and automation permissions are automatically updated in the system. For more information, see Ingest cloud assets.
    

Monitor GCP integration instance health

Monitoring GCP integration instance health ensures continuous, reliable operation, facilitating issue response and improving overall security posture.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  In the GCP integration instance row, click the View Details link and then click a specific Instance Name.
    
    From the list of health statuses, you can click the following to see automation instance health status:
    
    -   Permissions: Shows any permission issues or missing permissions for the instance.
        
    -   Automation: Indicates any errors during automation instance creation or configuration.
        
        **Note:**
        
        Currently, automation permission errors or missing automation permissions do not affect the Automation health status. You can view any permission errors or missing permissions in the the Permissions health status.

##### Monitor GCP resources inside service perimeters

Learn how to grant authorization to Cortex Cloud to scan within your GCP service perimeter.

A service perimeter can provide an additional layer of security for your GCP projects. It serves as a fortified boundary around your Google Cloud resources. While resources inside the perimeter can communicate freely, the perimeter is designed to prevent unauthorized communication to Google Cloud services beyond its confines.

To enable Cortex Cloud to scan assets and resources within your GCP perimeter, you must authorize Cortex Cloud's identities to access the perimeter from within GCP. If you have a perimeter set up in your GCP project and you have not authorized Cortex Cloud's identities to scan the perimeter, you will receive the following error:

Request is prohibited by organization's policy. vpcServiceControlsUniqueIdentifier: {{`<GCP-perimeter-ID>`}}

**Note:**

Each GCP cloud instance is assigned a scope within GCP. If the scope, whether it be organization, folder, or project, includes any projects with a service perimeter, this procedure must be performed for that cloud instance to authorize Cortex Cloud to scan the resources in the perimeter.

Obtain Cortex Cloud identity details

1.  In your Cortex Cloud tenant, select Settings → Data Sources & Integrations.
    
2.  Hover over the Google Cloud Platform (GCP) row and select View Details.
    
3.  In the Cloud Instances page, identify the GCP instance with the perimeter, right-click it and select Details.
    
4.  In the details pane, click the more options icon and select Authorization Details.
    
5.  The authorization values that you need to add as approved identities in GCP are listed in the Authorization Details dialog box.
    

Add Cortex Cloud authorization values to GCP perimeter

1.  Log into [Google Cloud Platform Console](https://console.cloud.google.com/).
    
2.  Navigate to VPC Service Controls.
    
3.  In the list of perimeters, select the perimeter to which you want to grant access to Cortex Cloud.
    
4.  In the Service perimeter details screen, click Edit.
    
5.  In the Edit service perimeter screen, select Ingress policy.
    
6.  In the Ingress rules pane, click Add an ingress rule.
    
7.  Enter a Title for the ingress rule.
    
8.  In the From section, under Identities, select Select identities & groups.
    
9.  Click Add identities. In the Add identities pane, under Search identities, paste Cortex discovery role from Cortex Cloud's Authorization Details dialog box. If there are more authorized values, paste each of them under Search identities. Click Add identities.
    
10.  In the To section, under Resources, select Select projects.
     
11.  Click Add projects. In the Add projects pane, select the relevant projects.
     
12.  Under Operations or IAM roles, select All operations.
     
13.  Click Next to add an egress rule.
     
14.  In the Egress rules pane, click Add an egress rule.
     
15.  Enter a Title for the egress rule.
     
16.  In the From section, under Identities, select Select identities & groups.
     
17.  Click Add identities. In the Add identities pane, under Search identities, paste Cortex discovery role from Cortex Cloud's Authorization Details dialog box. If there are more authorized values, paste each of them under Search identities. Click Add identities.
     
18.  In the To section, under Resources, select Select projects.
     
19.  Click Add projects. In the Add projects pane, select the relevant projects.
     
20.  Click Save. Confirm the changes and click Confirm.
     

The Cortex Cloud authorization values have been added as approved identities in GCP.

#### Onboard Microsoft Azure

Follow the Azure onboarding wizard, and Cortex creates a custom authentication template to be executed in Azure.

Follow this wizard to onboard your Microsoft Azure environment. The Microsoft Azure onboarding wizard is designed to facilitate the seamless setup of Microsoft Azure data into Cortex Cloud. The guided experience requires minimal user input; simply define the scope of your Microsoft Azure accounts and specify the scan mode. For full control of the setup, you can use the advanced settings. Based on the onboarding settings, Cortex Cloud generates an authentication template to establish trust with Microsoft Azure and grant permissions to Cortex Cloud. The template must be applied to complete the onboarding process. Application of the authentication template grants the permissions and includes a component that notifies Cortex Cloud of the execution details, and a new cloud instance is created.

Microsoft Azure private resources are not currently discoverable.

##### Before you begin:

-   Ensure you have a Microsoft Azure subscription.
    
-   Ensure you have the admin permissions required to onboard Microsoft Azure or the built-in Security Administrator role.
    
-   Obtain the tenant ID and subscription ID. You can view these in the Microsoft Azure Portal in Management groups.
    

How to onboard Azure:

1.  Select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Microsoft Azure, then hover over it and click Add.
    
4.  In the onboarding wizard, select the type of Microsoft Azure environment:
    
    -   **Government:** Microsoft Azure Government environments for compatibility with FedRAMP-certified tenants.
        
    -   **Commerical:** (Default) Standard cloud deployment typically used for private and public sector organizations that do not require isolated government-specific infrastructure.
        
    
5.  Select the scope for this data source.
    
    -   **Tenant:** (Default) A specific instance of Azure Active Directory, which can contain several subscriptions.
        
    -   **Management Group:** A collection of Microsoft Azure subscriptions.
        
    -   **Subscription:** A collection of Microsoft Azure resources associated with a specific Microsoft Azure tenant.
        
    
6.  Choose the Scan Mode:
    
    -   **Cloud Scan:** (Recommended) Security scanning is performed in the Cortex Cloud cloud environment.
        
    -   **Scan with Outpost:** Security scanning is performed on infrastructure deployed to a cloud account owned by you. If you select this option, choose the outpost account to use for this instance or create a new outpost. For more information on outposts, see Outposts.
        
        Scanning with an outpost may require additional CSP permissions and may incur additional CSP costs.
        
    
7.  Select an approved tenant ID from the Tenant ID list. If no tenant IDs have been approved, enter the tenant ID. Click Approve in Azure to add Cortex Cloud as an approved application on this tenant. When the tenant ID is approved, it appears with a green check next to it.
    
8.  (Optional) Click Show advanced settings to define advanced settings:
    
    -   **Instance Name:** Enter a unique instance name or leave it empty to be automatically populated. The automatic naming convention is the CSP name followed by the ID of the scope unit selected in the onboarding wizard. For example, when onboarding an Azure tenant, the automatic name would be `AZURE-<tenantID>` where `<tenantID>` is the ID of the tenant onboarded.
        
    -   **Scope Modifications:** To fine-tune your Microsoft Azure data collection, you can modify the scope by including or excluding specific regions. If you selected a Government environment, only Microsoft Azure Government regions are displayed. Additionally, if you selected a tenant or management group as the scope, you can modify the scope by including or excluding specific subscriptions. If you choose to include specific subscriptions, only those specified subscriptions will be included, even if additional subscriptions are added to your Microsoft Azure environment after onboarding. If you choose to exclude specific subscriptions, any new subscriptions added to your Microsoft Azure environment after onboarding will be included in the scope. Excluded subscriptions are not visible in Cortex Cloud.
        
    -   **Additional Security Capabilities:** Choose which security capabilities you want to benefit from. Some security capabilities are enabled by default and can be modified. Adding security capability typically requires additional cloud provider permissions. For detailed information on the permissions required, see Cloud service provider permissions. The additional security capabilities you can enable include:
        
        -   -   **XSIAM analytics:** Analyzes your endpoint data to develop a baseline and raise Analytics and Analytics BIOC alerts when anomalies and malicious behaviors are detected.
                
            -   **Data security posture management:** An agentless multi-cloud data security solution that discovers, classifies, protects, and governs sensitive data. DSPM is not currently available in Microsoft Azure Government environments.
                
            -   **Registry scanning:** Scan container registry images for vulnerabilities. malware, and secrets. You can configure your initial preference for scanning your registry. Any newly discovered registry, repository or image in the account will be scanned by default. For more details, see Configure registry scanning for cloud accountsConfigure registry scanning for cloud accounts
                
            -   **Serverless functions scanning:** Implement serverless scanning to detect and remediate vulnerabilities within serverless functions during the development lifecycle. Seamless integration into CI/CD pipelines enables automated security scans for a continuously secure pre-production environment.
                
            -   **Automation:** Use automation to pre-configure a list of integrations and associated commands to automate security issue responses. Commands can be utilized individually or as part of custom playbooks for issue remediation.
                
                -   **Log Level:** (Optional - for Automation only) Configure the automation integration logging level. Possible values are:
                    
                    -   Off (Default)
                        
                    -   Debug
                        
                    -   Verbose
                        
                    
                
            -   **Agentless disk scanning:** (Recommended) Implement agentless disk scanning to remotely detect and remediate vulnerabilities during the development lifecycle.
                
            
        
    -   **Cloud Tags:** Define tags and tag values to be added to any new resource created by Cortex Cloud in the cloud environment. Note: The `managed_by = paloaltonetworks` tag is automatically added to all resources. This tag is mandatory. You cannot edit or remove this tag.
        
    -   **Log Collection Configuration:** To maximize security coverage, include the collection of audit logs (Event Hub). This may require additional cloud service provider permissions. For detailed information on the permissions required, see Cloud service provider permissions.
        
    
9.  Click Save.
    
10.  To complete the process, download the authentication template:
     
     -   For onboarding Azure tenants and management groups, click one of the following:
         
         -   Download Terraform to download a Terraform file and proceed to Finalize onboarding by applying the Terraform template's configuration.
             
             To onboard all subscriptions within a management group or tenant, our authentication template uses Azure Resource Management (ARM) templates internally. The ARM templates are encoded with base64 and located inside the `template_params.tfvars` file as the `policy_template` variable.
             
         -   Azure Resource Manager to download a `tar.gz` file and proceed to Finalize onboarding of tenants and management groups by deploying the Microsoft Azure Resource Manager (ARM) template.
             
         
     -   For onboarding Azure subscriptions, click one of the following:
         
         -   Download Terraform to download a Terraform file and proceed to Finalize onboarding by applying the Terraform template's configuration.
             
         -   Azure Resource Manager to download a JSON file and proceed to Finalize onboarding of subscriptions by deploying the Microsoft Azure Resource Manager (ARM) template.
             
         
     
     The authentication template is reusable and can be executed as many times as you want to create new cloud instances with the settings you defined in the onboarding wizard.
     
11.  Click Close.
     

Cortex Cloud generates an authentication template based on the settings you configured in the Microsoft Azure onboarding wizard.

###### Required Azure permissions for Cortex Cloud onboarding

Use the following template to create a dedicated role with the permissions required for onboarding Microsoft Azure to Cortex Cloud.

```
{
  "Name": "CortexCloudOnboarding",
  "IsCustom": true,
  "Description": "Custom role with permissions for Cortex Cloud onboarding",
  "Actions": [
    "Microsoft.Authorization/roleAssignments/read",
    "Microsoft.Authorization/roleAssignments/write",
    "Microsoft.Authorization/roleAssignments/delete",
    "Microsoft.Authorization/roleDefinitions/read",
    "Microsoft.Authorization/roleDefinitions/write",
    "Microsoft.Authorization/roleDefinitions/delete",
    "Microsoft.Authorization/roleManagementPolicies/read",
    "Microsoft.Authorization/roleManagementPolicies/write",
    "Microsoft.Authorization/roleManagementPolicyAssignments/read",
    "Microsoft.EventHub/clusters/read",
    "Microsoft.EventHub/clusters/write",
    "Microsoft.EventHub/clusters/delete",
    "Microsoft.EventHub/clusters/namespaces/read",
    "Microsoft.EventHub/namespaces/read",
    "Microsoft.EventHub/namespaces/write",
    "Microsoft.EventHub/namespaces/delete",
    "Microsoft.EventHub/namespaces/authorizationRules/read",
    "Microsoft.EventHub/namespaces/authorizationRules/write",
    "Microsoft.EventHub/namespaces/authorizationRules/delete",
    "Microsoft.EventHub/namespaces/eventhubs/read",
    "Microsoft.EventHub/namespaces/eventhubs/write",
    "Microsoft.EventHub/namespaces/eventhubs/delete",
    "Microsoft.EventHub/namespaces/eventhubs/authorizationRules/read",
    "Microsoft.EventHub/namespaces/eventhubs/authorizationRules/write",
    "Microsoft.EventHub/namespaces/eventhubs/authorizationRules/delete",
    "Microsoft.EventHub/namespaces/eventhubs/consumergroups/read",
    "Microsoft.EventHub/namespaces/eventhubs/consumergroups/write",
    "Microsoft.EventHub/namespaces/eventhubs/consumergroups/delete",
    "Microsoft.Insights/diagnosticSettings/write",
    "Microsoft.ManagedIdentity/userAssignedIdentities/read",
    "Microsoft.ManagedIdentity/userAssignedIdentities/write",
    "Microsoft.ManagedIdentity/userAssignedIdentities/delete",
    "Microsoft.PolicyInsights/remediations/read",
    "Microsoft.PolicyInsights/remediations/write",
    "Microsoft.PolicyInsights/remediations/delete",
    "Microsoft.PolicyInsights/remediations/listDeployments/read",
    "Microsoft.PolicyInsights/remediations/cancel/action",
    "Microsoft.Resources/deploymentScripts/read",
    "Microsoft.Resources/deploymentScripts/write",
    "Microsoft.Resources/deploymentScripts/delete",
    "Microsoft.Resources/deploymentScripts/logs/read",
    "Microsoft.Resources/deployments/read",
    "Microsoft.Resources/deployments/write",
    "Microsoft.Resources/deployments/delete",
    "Microsoft.Resources/deployments/operations/read",
    "Microsoft.Resources/deployments/operationstatuses/read",
    "Microsoft.Resources/deployments/cancel/action",
    "Microsoft.Resources/deployments/exportTemplate/action",
    "Microsoft.Resources/deployments/validate/action",
    "Microsoft.Resources/deployments/whatIf/action",
    "Microsoft.Resources/subscriptions/resourceGroups/read",
    "Microsoft.Resources/subscriptions/resourceGroups/write",
    "Microsoft.Resources/subscriptions/resourceGroups/delete",
    "Microsoft.Resources/subscriptions/resourceGroups/moveResources/action",
    "Microsoft.Resources/subscriptions/resourceGroups/validateMoveResources/action",
    "Microsoft.Resources/subscriptions/resourcegroups/deployments/read",
    "Microsoft.Resources/subscriptions/resourcegroups/deployments/write",
    "Microsoft.Resources/subscriptions/resourcegroups/deployments/operations/read",
    "Microsoft.Resources/subscriptions/resourcegroups/deployments/operationstatuses/read",
    "Microsoft.Resources/subscriptions/resourcegroups/resources/read",
    "Microsoft.Storage/storageAccounts/read",
    "Microsoft.Storage/storageAccounts/write",
    "Microsoft.Storage/storageAccounts/delete",
    "Microsoft.Storage/storageAccounts/blobServices/containers/read",
    "Microsoft.Storage/storageAccounts/blobServices/containers/write",
    "Microsoft.Storage/storageAccounts/blobServices/containers/delete",
    "Microsoft.aadiam/diagnosticsettings/read",
    "Microsoft.aadiam/diagnosticsettings/write",
    "Microsoft.aadiam/diagnosticsettings/delete",
    "microsoft.aadiam/azureADMetrics/providers/Microsoft.Insights/diagnosticSettings/write",
    "microsoft.aadiam/tenants/providers/Microsoft.Insights/diagnosticSettings/write"
  ],
  "NotActions": [],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": [
    <SUBSCRIPTION_ID> or <MANAGEMENT_GROUP_ID> or <TENANT_ID>
  ]
}
```

Where `<SUBSCRIPTION_ID>`, `<MANAGEMENT_GROUP_ID>`, or `<TENANT_ID>` is replaced with the ID of the scope you are onboarding.

##### Finalize Microsoft Azure onboarding by executing the authentication template

Learn how to execute the authentication template file in Microsoft Azure for subscriptions, tenants, and management groups. We provide instructions both for applying the Terraform template's configuration and for deploying the Microsoft Azure Resource Manager (ARM) template.

While onboarding Microsoft Azure with the onboarding wizard, you have to choose one of the following options for executing an authentication template: Download Terraform or Azure Resource Manager.

After running the wizard, you finalize the onboarding by executing the template to provision the resources for subscriptions, management groups, and tenants in your cloud environment.

After the template is successfully executed, the initial discovery scan starts. When the scan completes, view your cloud assets in Asset Inventory.

###### Finalize onboarding by applying the Terraform template's configuration

If you selected the Download Terraform option in the Microsoft Azure onboarding wizard, execute the template with the CLI. You decide, based on your own use case, how you would like to perform the CLI commands, for example, locally or in CloudShell.

**Prerequisite:**

Before you begin, ensure you have:

-   An Azure subscription.
    
-   A user with the required permissions for the relevant scope (subscription, management group, tenant). We recommend you create a dedicated role.
    
-   Tenant ID and subscription ID. You can view these in Microsoft Azure Portal in Management groups.
    
-   Installed Terraform on your local machine. You can download Terraform from the official [Terraform website](https://www.terraform.io/downloads.html) and follow the installation instructions for your operating system.
    
    **Tip:**
    
    Review the Introduction to Terraform for Cloud service provider (CSP) onboarding to get familiar with how Cortex works with Terraform for cloud onboarding.
    
-   Installed the [Azure CLI tool](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).
    

1.  In your local terminal, log in to your Azure account using the Azure CLI:
    
    ```
    az login
    ```
    
2.  Create a directory on your local machine to store and run the Terraform code. If you have more than one Azure connector, you need a separate directory for each one:
    
    ```
    mkdir -p ~/terraform/azure-connector-1
    ```
    
3.  Navigate to the directory you created and extract the Terraform files. Ensure all necessary Terraform files are present (`main.tf`, `template_params.tfvars`, and so on).
    
    **Important:**
    
    Do not delete or move the Terraform files from this folder. It will prevent you from being able to edit your cloud instance in the future.
    
    ```
    cd ~/terraform/azure-connector-1
    tar -xzvf <your_template>.tar.gz.
    ```
    
4.  Initialize Terraform in your project directory:
    
    ```
    terraform init
    ```
    
5.  Apply your Terraform configuration using the downloaded parameter file:
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
    -   When the CLI prompts you for a Group ID, enter the management group ID or the root tenant ID where you want to create Cortex Cloud resources.
        
    -   When the CLI prompts you for a Subscription ID, enter the subscription ID where you want to create Cortex Cloud resources. (This subscription is typically a subscription that the security team manages.)
        
    
6.  When prompted, review the actions the Terraform will perform and approve them by entering **`yes`**.
    

The Terraform template is executed.

###### Finalize onboarding of subscriptions by deploying the Microsoft Azure Resource Manager (ARM) template

If you selected the Azure Resource Manager option in the Microsoft Azure onboarding wizard to onboard subscriptions, deploy the template with the CLI. You decide, based on your use case, how you would like to perform the CLI commands, for example, locally or in CloudShell.

**Prerequisite:**

Before you begin, ensure you have:

-   An Azure subscription.
    
-   A user with the required permissions for the relevant scope (subscription, management group, tenant). We recommend you create a dedicated role.
    
-   Tenant ID and subscription ID. You can view these in Microsoft Azure Portal in Management groups.
    
-   Installed the [Azure CLI tool](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).
    
-   Authorization to create management group policies.
    

1.  In your local terminal or CloudShell, log in to your Azure account using the Azure CLI:
    
    ```
    az login
    ```
    
2.  Deploy the template file.
    
    az deployment sub create \\
       --location `<LOCATION>` \\
       --subscription `<SUBSCRIPTION_ID>` \\
       --template-file `<JSON_TEMPLATE>` 
    
    where:
    
    -   `<LOCATION>` is the location of the management group, such as `eastus` or `westus`.
        
    -   `<SUBSCRIPTION_ID>` is the ID of the subscription you want to onboard.
        
    -   `<JSON_TEMPLATE>` is the JSON template file that you downloaded at the end of the onboarding wizard.
        
    

To verify the deployment was successful, check the Azure Portal under the "Deployments" section of the targeted subscription.

###### Finalize onboarding of tenants and management groups by deploying the Microsoft Azure Resource Manager (ARM) template

If you selected the Azure Resource Manager option in the Microsoft Azure onboarding wizard to onboard tenants or management groups, deploy the template with the CLI using Bash in CloudShell.

**Prerequisite:**

Before you begin, ensure you have:

-   An Azure subscription.
    
-   A user with the required permissions for the relevant scope (subscription, management group, tenant). We recommend you create a dedicated role.
    
-   Tenant ID and subscription ID. You can view these in Microsoft Azure Portal in Management groups.
    
-   Installed the [Azure CLI tool](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).
    
-   Authorization to create management group policies.
    

1.  To prepare for deployment, execute the following commands in a Bash-compliant terminal, such as the Bash environment in Azure Cloud Shell:
    
    | Step | Command |
    | --- | --- |
    | Create a folder on your local machine to store the `tar` file. If you have more than one Azure connector, you need a separate directory for each one. | `mkdir -p ~/azure-connector-1` |
    | Navigate to the directory you created and extract the files. | `cd ~/azure-connector-1 tar -xzvf <your_template>.tar.gz.` |
    
2.  Deploy the template file: `bash onboard.sh`
    
    When prompted, enter the following values:
    
    -   The Azure region where you want the resources to be created, such as `eastus` or `westus`.
        
    -   The ID of the management group or tenant that you want to onboard.
        
    -   The ID of the subscription where the deployment script will run.
        
    

To verify the deployment was successful, check the Azure Portal under the "Deployments" section of the targeted management group, or tenant.

See also

-   Introduction to Terraform for Cloud service provider (CSP) onboardingIntroduction to Terraform for Cloud service provider (CSP) onboarding

##### Configure Azure integration instances and monitor integration instance health

Enable automations from Data Sources & Integrations and monitor Azure integration instance health.

You can streamline and simplify configuring Azure integration instances within the Data Sources & Integrations page. This includes granting the necessary permissions for the platform to execute commands, scripts, and playbooks as part of issue response. All automation permissions are added to the Terraform as part of the setup process.

Configure a new or existing Azure integration instance

**Note:**

If you have not yet onboarded your cloud integration, see Ingest cloud assets.

You can configure a new Azure integration instance or edit an existing Azure integration instance, for example to enable automations.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  In the Azure integration row:
    
    -   To configure a new Azure integration instance: Click ⋮ and then click Add New Instance or click View Details and from the New Instance drop down select the Azure cloud service provider.
        
    -   To edit an existing Azure integration instance: Click View Details and then click the configuration pencil icon.
        
    
3.  (Optional) Under Show advanced settings, select Automation and select a log level for the automation integration logs.
    
4.  If the instance is not enabled, in the row for the Azure integration instance, right-click and select Enable. Alternatively, click the more options icon and select Enable.
    
5.  Manually upload the template (Terraform) to the relevant cloud provider.
    
    An automation integration instance with the same name as the cloud integration instance is automatically created and automation permissions are automatically updated in the system. For more information, see Ingest cloud assets.
    

Monitor Azure integration instance health

Monitoring Azure integration instance health ensures continuous, reliable operation, facilitating issue response and improving overall security posture.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  In the Azure integration instance row, click the View Details link and then click a specific Instance Name.
    
    From the list of health statuses, you can click the following to see automation instance health status:
    
    -   Permissions: Shows any permission issues or missing permissions for the instance.
        
    -   Automation: Indicates any errors during automation instance creation or configuration.
        
        **Note:**
        
        Currently, automation permission errors or missing automation permissions do not affect the Automation health status. You can view any permission errors or missing permissions in the the Permissions health status.

#### Onboard Oracle Cloud Infrastructure

Follow the OCI onboarding wizard, and Cortex Cloud creates a custom authentication template to be applied in OCI.

Follow this wizard to onboard your Oracle Cloud Infrastructure (OCI) environment. The OCI onboarding wizard is designed to facilitate the seamless setup of OCI data into Cortex Cloud. This guided experience requires minimal user input. For full control of the setup, you can use the advanced settings. Based on the onboarding settings, Cortex Cloud generates a Terraform authentication template to establish trust with OCI and grant permissions to Cortex Cloud. Application of the Terraform authentication template completes the onboarding process. The Terraform authentication template grants the permissions, includes a component that notifies Cortex Cloud of the execution details, and a new cloud instance is created.

##### Before you begin:

-   Ensure you have access to the Oracle Cloud Infrastructure console
    
-   Permissions for all of the following are required:
    
    -   Creation of identity groups (for more information, refer to [Managing Groups](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managinggroups.htm))
        
    -   Policies (for more information, refer to [How Policies Work](https://docs.oracle.com/en-us/iaas/Content/Identity/Concepts/policies.htm#How_Policies_Work))
        
    -   Tag namespaces in the root compartment (for more information, refer to [Tags and Tag Namespace Concepts](https://docs.oracle.com/en-us/iaas/Content/Tagging/Tasks/managingtagsandtagnamespaces.htm))
        
    
-   If you enable audit log collection, you must first Configure the OCI connector for log collection. If you want to use bucket replication, see [Object Storage Replication](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/usingreplication.htm).
    

To onboard OCI:

1.  Select Settings → Data Sources & Integrations.
    
2.  On the Data Sources & Integrations page, click \+ Add New.
    
3.  On the Add Data Sources or Integrations page, search for Oracle Cloud Infrastructure, then hover over it and click Add.
    
4.  (Optional) Enter a unique instance name.
    
    If you don't enter a name, the wizard will apply the default name, `OCI-<TENANCY_OCID>`.
    
5.  (Optional) Click Show advanced settings to define advanced settings:
    
    -   Scope Modifications: You can modify the scope by including or excluding specific Compartments. If you choose to include specific compartments, only the specified compartments and their sub-compartments will be included. This setting will affect future sub-compartments added to your OCI environment after onboarding. If you choose to exclude specific compartments, this setting will also affect their sub-compartments.
        
        **Note**: The root compartment is always onboarded, and only the sub-compartment scope can be modified.
        
        Excluded compartments are not visible in Cortex Cloud.
        
    -   Additional Security Capabilities: Enable additional Cortex Cloud security add-ons, if available. This may require additional cloud provider permissions. For detailed information on the permissions required, see Cloud service provider permissions. The additional security capabilities you can enable include:
        
        -   **Data security posture management:** An agentless multi-cloud data security solution that discovers, classifies, protects, and governs sensitive data.
            
        -   **Serverless functions scanning (Gen 1 only):** Implement serverless scanning to detect and remediate vulnerabilities within serverless functions during the development lifecycle. Seamless integration into CI/CD pipelines enables automated security scans for a continuously secure pre-production environment.
            
        -   **Registry scanning:** Scan container registry images for vulnerabilities. malware, and secrets. You can configure your initial preference for scanning your registry. Any newly discovered registry, repository, or image in the account will be scanned by default. For more details, see Configure registry scanning for cloud accountsConfigure registry scanning for cloud accounts
            
        -   **Agentless disk scanning:** (Recommended) Implement agentless disk scanning to remotely detect and remediate vulnerabilities during the development lifecycle.
            
        
    -   **Cloud Tags:** Define tags and tag values to be added to any new resource created by Cortex Cloud in the cloud environment. Note: The `managed_by = paloaltonetworks` tag is automatically added to all resources. This tag is mandatory. You cannot edit or remove this tag.
        
    -   **Log Collection Configuration:** To maximize security coverage, enable the collection of audit logs. This may require additional cloud service provider permissions. For detailed information on the permissions required, see Cloud service provider permissions. Enter the following details for each preexisting OCI storage bucket that you intend to use for log collection:
        
        -   Region: The geographic OCI region where the bucket is located. For example, "us-phoenix-1".
            
        -   Bucket Name: The name of the OCI storage bucket.
            
        -   Compartment OCID: The Oracle Cloud Identifier (OCID) of the compartment that contains the bucket.
            
        
    
6.  Click Save.
    
7.  Download the OCI authentication template by clicking Download Terraform.
    
    The Terraform authentication template is reusable and can be executed as many times as you want to create new instances with the settings you defined in the wizard. The Terraform authentication template is valid for seven days from when it was created.
    
8.  Click Close.
    

Cortex Cloud generates a Terraform authentication template based on the settings you configured in the OCI onboarding wizard.

**Next step:** Apply the Terraform authentication template in OCI.

##### Manually upload template to OCI

Learn how to manually deploy the Terraform template files in Oracle Cloud Infrastructure (OCI).

When you have downloaded the Terraform template files in the onboarding wizard, you must log in to the Oracle Cloud Infrastructure (OCI) CLI tool to deploy the template file. For more information about the OCI CLI tool, refer [Oracle documentation](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/cliconcepts.htm).

**Prerequisite:**

Before you begin, ensure you have:

-   An Oracle Cloud Infrastructure account and the tenancy OCID.
    
-   Permission to deploy a custom template and create its resources in OCI.
    
-   Installed Terraform on your local machine. You can download Terraform from the official [Terraform website](https://www.terraform.io/downloads.html) and follow the installation instructions for your operating system.
    
-   Installed the OCI CLI tool, and authenticated with a key pair or token-based credentials.
    

1.  Log in to [OCI](https://www.oracle.com/il-en/cloud/sign-in.html) and open Cloud Shell.
    
2.  Create a directory on your local machine to store and run the Terraform code. If you have more than one OCI connector, you need a separate directory for each one. For example:
    
    ```
    mkdir -p ~/terraform/oci-connector-1
    ```
    
3.  Navigate to the directory you created and extract the Terraform files. Ensure all necessary Terraform files are present (`main.tf`, `template_params.tfvars`, and so on). For example:
    
    ```
    cd ~/terraform/oci-connector-1
    tar -xzvf <your_template>.tar.gz.
    ```
    
4.  Initialize Terraform in your project directory:
    
    ```
    terraform init
    ```
    
    It might take several seconds until the initialization is complete.
    
5.  Apply your Terraform configuration using the downloaded parameter file. When prompted to enter a value, enter the tenancy OCID.
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
6.  When prompted, review the actions the Terraform will perform, and approve them by entering **`yes`**.
    
    The Terraform template is deployed.
    

When the template is successfully uploaded to OCI, the initial discovery scan starts. When the scan is complete, you can view your cloud assets in Asset Inventory. You can also view details about the instance by hovering over the instance on the Data Sources & Integrations page, and then clicking View Details.

##### Configure the OCI connector for log collection

Create an OCI service connector and define the log source within OCI and the connector's target as the OCI bucket you want to use for audit log collection.

In order to enable audit log collection in Cortex Cloud, you must first create an OCI service connector. For more details, see [Creating a Connector with a Logging Source](https://docs.oracle.com/en-us/iaas/Content/connector-hub/create-service-connector-logging-source.htm). After you have created the OCI service connector, you can proceed to Onboard Oracle Cloud Infrastructure and enable collection of audit logs.

1.  Log in to the [OCI Console](https://cloud.oracle.com/). Open the navigation menu and go to Analytics and AI → Connector Hub.
    
2.  On the Connectors page, click Create connector.
    
3.  On the Create Connector page, enter a descriptive name for the new connector (for example, `CortexCloud_Log_Exporter`). Click Create connector.
    
4.  Select the Compartment where you want to store the new connector resource.
    
5.  Set the Source service to Logging.
    
6.  Set the Target service to Object Storage. This is the storage bucket that Cortex Cloud will read from.
    
7.  Under Configure target, configure the storage bucket to send the log data to:
    
    -   Compartment: Select the compartment that contains the bucket that you want to use.
        
    -   Bucket: Select the name of the bucket that you want to send the data to.
        
    -   Object Name Prefix: (Optional) Enter a prefix value.
        
    -   Show additional options: (Optional) Click this link to enter values for batch size (in MBs) and batch time (in milliseconds).
        
    
8.  (Optional) Add one or more tags to the connector. Select Show Advanced Options to show the Add Tags section.
    
9.  Click Create. When the connector is ready, the connector's details page opens.
    

When you onboard your OCI environment and select to Collect Audit Logs, enter the OCI region, the bucket name, and the compartment OCID.

#### Manually connect a cloud instance
When onboarding your cloud instance using the onboarding wizard, after you download the authentication template and execute it in your cloud environment, notification is sent to Cortex Cloud and a cloud instance is created. This connection between your cloud environment and the Cortex Cloud cloud instance typically occurs automatically.

There are several scenarios when the instance should be connected manually:

-   You executed the template in your cloud environment and your environment is an air-gapped network. In this case, the notification to create the instance in Cortex Cloud does not happen.
    
-   You have executed the template, but the instance has not appeared in Cloud Instances. This is often due to connectivity or firewall issues.
    
-   You have a specific need to connect the instance manually.
    

To manually connect a cloud instance, you need to identify the pending instance you want to connect. In Cloud Instances, remove the default filter that excludes pending instances. Right-click on a pending instance and select View Details to see the configuration details of that specific pending instance. After you have identified the pending instance you want to connect manually, right-click and select Manually connect an instance. For more information on pending instances, see Pending cloud instances.

AWS

In AWS Management Console, navigate to [CloudFormation](https://console.aws.amazon.com/cloudformation/). Use the following table to guide you on where to obtain the necessary input for the manual onboarding. Not every field appears in every manual onboarding instance.

| Connect Instance input field | Value |
| --- | --- |
| Organization ID | Onboarded organization ID. |
| Organizational Unit ID | Onboarded organizational unit ID. |
| Account ID | Onboarded account ID. |
| Role ARN | The value of Outputs → CORTEXXDRARN. |
| External ID | The value of Parameters → ExternalID. |
| Audit Logs SQS URL | The value of Resources → CloudTrailLogsQueue. |
| Audit Logs Role ARN | The value of Resources → CloudTrailReadRole → ARN. |
| Audit Logs Audience | Automatically populated. |
| Outpost Scanner Role ARN | The value of Resources → CortexPlatformScannerRole → ARN. |

GCP

1.  Open your local terminal (Command prompt, PowerShell, or Terminal).
    
2.  Log in to your GCP account using the gcloud CLI:
    
    ```
    gcloud auth login
    ```
    
3.  Display the values of all defined output variables in your Terraform configuration, formatted as a JSON object:
    
    ```
    terraform output -json
    ```
    

Use the following table to guide you on which values in the output map to the necessary input for the manual onboarding. Not every field appears in every manual onboarding instance.

| Connect Instance input field | Value |
| --- | --- |
| Organization ID | organization_id.value |
| Project ID | project_id.value |
| Folder ID | folder_id.value |
| Service Account Email | service_account_email.value |
| Audit Logs Audit Pubsub Subscription ID | resources_data.value.AUDIT_LOGS.audit_pubsub_subscription_id |
| Audit Logs Service Account Email | resources_data.value.AUDIT_LOGS.audit_service_account_email |
| Outpost Scanner Service Account Email | resources_data.value.OUTPOST_SCANNER.outpost_scanner_service_account_email |

Azure with Terraform

1.  Open your local terminal (Command prompt, PowerShell, or Terminal).
    
2.  Log in to your Azure account using the Azure CLI:
    
    ```
    az login
    ```
    
3.  Display the values of all defined output variables in your Terraform configuration, formatted as a JSON object:
    
    ```
    terraform output -json
    ```
    

Use the following table to guide you on which values in the output map to the necessary input for the manual onboarding. Not every field appears in every manual onboarding instance.

| Connect Instance input field | Value |
| --- | --- |
| Resource Group Location (only for subscription scope) | Onboarded resource group location |
| Resource Group Name | Automatically populated |
| Audit Logs Audience | Automatically populated |
| Audit Logs Storage Account Name | resources_data.value.AUDIT_LOGS.storage_account_name |
| Audit Logs Tenant ID | Automatically populated |
| Audit Logs Client ID | resources_data.value.AUDIT_LOGS.client_id |
| Audit Logs Namespace | resources_data.value.AUDIT_LOGS.namespace |
| Audit Logs Eventhub Name | resources_data.value.AUDIT_LOGS.eventhub_name |
| Audit Logs Azure Audit Eventhub Consumer Group Name | resources_data.value.AUDIT_LOGS.azure_audit_eventhub_consumer_group_name |

Azure Portal

-   Navigate to the [Microsoft Azure Portal](http://portal.azure.com) and log in.
    

Use the following table to guide you on which values in the output map to the necessary input for the manual onboarding. Not every field appears in every manual onboarding instance.

| Connect Instance input field | Value |
| --- | --- |
| Resource Group Location (only for subscription scope) | Onboarded resource group location |
| Resource Group Name | Automatically populated |
| Audit Logs Audience | Automatically populated |
| Audit Logs Storage Account Name | Navigate to Storage accounts and filter by resource group. |
| Audit Logs Tenant ID | Automatically populated |
| Audit Logs Client ID | Navigate to App registrations and sort by time. The default name starts with "auditlogsapp". |
| Audit Logs Namespace | Navigate to Event Hubs and filter by resource group. |
| Audit Logs Eventhub Name | Navigate to Event Hubs and select the Event Hub Namespace. Under Event Hubs, take the value in the Name column. |
| Audit Logs Azure Audit Eventhub Consumer Group Name | Navigate to Event Hubs -and select the Event Hub Namespace and then the Event Hub. Under Consumer Groups, use the value in the Name column, but not ‘$Default’. |

#### Edit your onboarded CSP configuration
In order to make changes to your onboarded CSP configuration, you first modify the cloud instance settings in Cortex Cloud and download an updated authentication template. After uploading the updated template to the CSP environment, you execute the template and then the changes take affect.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Identify the Cloud Service Provider you want to update and click View Details.
    
3.  In the Cloud Instances page, identify the cloud instance you want to edit and click the Configuration pencil to edit the instance.
    
4.  Make changes to the configuration settings. Click Save.
    
    If the changes you made require reexecuting the authentication template, you will be prompted to to download the file. Click Download CloudFormation or Download Terraform as relevant to your CSP type.
    
    **Important:**
    
    When using Terraform authentication templates, you must execute the updated Terraform template from the same folder where the original Terraform template was executed.
    
5.  In the Cloud Instances page, a notification appears stating that there are pending changes for the cloud instance you updated. These changes are not applied until you execute the updated template in the CSP environment.
    
6.  Execute the updated authentication template in your CSP environment by selecting the appropriate procedure below.
    

Amazon Web Services

After you have downloaded the updated CloudFormation authentication template, connect to AWS Management Console to perform a direct update to the stack using the updated template file. With a direct update, you submit a template or input parameters that specify updates to the resources in the stack, and CloudFormation immediately deploys them.

1.  Log in to the AWS Management Console and open the [CloudFormation console](https://console.aws.amazon.com/cloudformation/).
    
2.  On the Stacks page, select the existing stack that you want to update.
    
3.  In the stack details pane, select Update stack → Make a direct update.
    
4.  On the Update stack page, select Replace existing template.
    
5.  Under Specify template, select Upload a template file. Select the updated authentication template you downloaded from Cortex Cloud.
    
6.  Click Next and Next again.
    
7.  Select to acknowledge that AWS CloudFormation might create IAM resources with custom names. Click Next.
    
8.  Click Submit. The stack update is complete when it appears in the Stacks list with status of UPDATE_COMPLETE.
    

Google Cloud Platform

After you have downloaded the updated Terraform template file, connect to Google Cloud Console to update the stack using the updated template file.

1.  Open your local terminal (Command prompt, PowerShell, or Terminal).
    
2.  Log in to your GCP account using the gcloud CLI:
    
    ```
    gcloud auth login
    ```
    
3.  Navigate to the directory you originally used for the Terraform template when onboarding your CSP and extract the Terraform files.
    
    ```
    cd ~/terraform/gcp-connector-1
    tar -xzvf <your_template>.tar.gz
    ```
    
4.  Initialize the upgrade of the Terraform in your project directory:
    
    ```
    terraform init -upgrade
    ```
    
5.  Apply your Terraform configuration using the downloaded parameter file. When prompted, enter the project ID if you configured one in the onboarding wizard:
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
    The updated Terraform template is deployed.
    

Microsoft Azure Resource Manager using the CLI

After you have downloaded the updated authentication template file, lot in to Azure portal to update the stack using the updated template file.

1.  Log in to the Azure portal. Select Cloud Shell from the top navigation and then select Bash.
    
2.  Navigate to the directory you originally used for the authentication template when onboarding your CSP and extract the files.
    
    ```
    cd ~/azure-connector-1
    tar -xzvf <your_template>.tar.gz.
    ```
    
3.  In Cloud Shell, run the onboard.sh file:
    
    ```
    bash onboard.sh
    ```
    
    The updated authentication template is deployed.
    

Microsoft Azure subscriptions

After you have downloaded the updated authentication template file, use the same method you used initially to execute the template in Microsoft Azure:

##### Execute the Terraform authentication template

1.  Open your local terminal (Command prompt, PowerShell, or Terminal).
    
2.  Log in to your Azure account using the Azure CLI:
    
    ```
    az login
    ```
    
3.  Navigate to the directory you originally used for the Terraform template when onboarding your CSP and extract the Terraform files.
    
    ```
    cd ~/terraform/azure-connector-1
    tar -xzvf <your_template>.tar.gz.
    ```
    
4.  Initialize the upgrade of the Terraform in your project directory:
    
    ```
    terraform init -upgrade
    ```
    
5.  Apply your Terraform configuration using the downloaded parameter file. :
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
    The updated Terraform template is deployed.
    

##### Deploy the authentication template in Azure Resource Manager

1.  Open your local terminal.
    
2.  Log in to your Azure account using the Azure CLI:
    
    ```
    az login
    ```
    
3.  Deploy the updated template file:
    
    ```
    az deployment sub create  --location <LOCATION>  --subscription <SUBSCRIPTION_ID> --template-file <JSON_TEMPLATE> 
    ```
    
    where:
    
    -   `<LOCATION>` is the location of the resource group. (For example, eastus or westus.)
        
    -   `<SUBSCRIPTION_ID>` is the ID of the subscription you want to onboard.
        
    -   `<JSON_TEMPLATE>` is the JSON template file that you downloaded at the end of the onboarding wizard.
        
    
    The updated template is deployed.

#### Outposts

An outpost enables you to have security scans performed on infrastructure in a cloud account owned by you.

An outpost is a dedicated set of infrastructure resources that extends the reach of Cortex Cloud into your environment. It serves as a secure, localized point for scanning assets across cloud providers and on-premises workloads.

By establishing a trusted relationship between Palo Alto Networks and your environment, the outpost allows for deep security analysis—such as identifying vulnerabilities or classifying sensitive data—while ensuring that your live workloads remain unaffected. This architecture helps you maintain strict data residency and compliance by performing scans locally within a demarcated area of your network.

**Important:**

Outpost scan is an alternative to the recommended standard cloud scan. Cloud scan is recommended because it is fully managed by Palo Alto Networks and incurs no compute costs for your organization. Outpost scan is an advanced deployment model reserved for specific data residency or architectural requirements.

##### What's Next?

-   Review outpost fundamentals
    
-   Plan your outpost
    
-   Create your outpost

##### Outpost fundamentals and planning

An outpost enables you to have security scans performed on infrastructure in a cloud account owned by you. Learn about outpost fundamentals and what to consider when planning your outpost.

This topic explains the basic fundamentals for planning and deploying outpost infrastructure.

**Important:**

While outposts provide maximum control over the scanning environment, cloud scan mode is the recommended default for most organizations.

###### When to choose outpost scan

Cloud scan offers lower operational overhead, faster onboarding, and Palo Alto Networks assumes the associated cloud compute costs.

Outpost scan mode should typically only be reserved for specific architectural requirements or strict data residency constraints.

If you determine you do need outpost scanning, consider the following differences between the scan modes, which might impact your decision.

| Cloud Scan (Recommended) | Outpost Scan |
| --- | --- |
| Configure a managed outpost when there is sufficient trust between you and Cortex Cloud. Cortex accesses your environment more extensively and with less mediation. | Choose to deploy and manage your own outpost if: If you operate in a high-regulated market with a healthy “mistrust” of vendors.; For compliance with certain regulations for which Cortex is not compliant “out of the box.” In these cases, you might prefer to keep your data within your own network boundary. |
| The cloud resources involved are charged to Palo Alto Networks instead of to you. | This mode requires additional cloud provider permissions and may incur additional cloud costs. |
| Cortex-managed outposts require zero management from you. | Outposts incur some additional maintenance overhead. This includes securing the outpost, managing the necessary IAM roles and permissions, upgrading versions, and adjusting cloud provider quotas to meet workload demands. Actively manage your capacity and quotas to meet the workload requirements. |
| For DSPM, your actual data is accessible to Palo Alto Networks—not just metadata. Rest assured, your data are deleted after scanners have completed. Zero trust security is used to secure your data in Palo Alto Networks-owned accounts. | For DSPM, only metadata is accessible to Palo Alto Networks—not your actual data. |
| DSPM on SaaS (such as for Snowflake and Office 365) is currently supported only for cloud scan. | DSPM on SaaS (such as for Snowflake and Office 365) is not supported for outpost scan. |

###### Outpost security concepts and component handling

This section presents outpost-related concepts and a high-level overview of how outposts perform scanning on your resources and data without putting them at risk. For a deeper understanding, contact your Palo Alto Networks representative.

| Concept | Description |
| --- | --- |
| Trust model | Cortex Cloud interacts with your environment via dedicated IAM roles within the outpost. This establishes a secure trust relationship that adheres to the principle of least privilege. |
| Data security and residency | Outposts utilize a regionally symmetric architecture, processing data locally within the same cloud region and provider where it resides. Only metadata is ever sent back to Cortex Cloud. |
| Scan operations | Scanning is performed by task-specific, ephemeral VMs built from hardened and continuously patched images. These instances are automatically terminated and all temporary resources are purged immediately after a scan completes. |
| Secure orchestration storage (such as buckets) | Scanner VMs operate in isolated private subnets without direct internet or Cortex Cloud access. They communicate exclusively through encrypted, cloud-native storage used for operational data and scan results—never raw customer data. |
| Temporary processing storage (such as artifact buckets) | For specific scans where direct data sharing is restricted, data is temporarily placed in encrypted regional storage for analysis. Cortex Cloud has no read permissions on this storage, and all data is deleted immediately after the job finishes. |
| Scanner isolation | Each scanner VM is purpose-built with a strictly defined set of permissions and network access tailored to its specific job. This ensures complete compartmentalization between different scan types. |
| Data encryption | Security is enforced through universal encryption at rest and in transit. Advanced egress filtering locks down external traffic to verified destinations, and secrets are managed via your own cloud-native secret management service. |

###### Outpost planning

Before creating outposts, we recommend you become familiar with how outposts work and then plan accordingly. For example, some points to consider include:

-   A dedicated account is required for the outpost account. Make sure the dedicated account is free from other resources.
    
-   Each cloud account (AWS account, Azure subscription, GCP project) can host only one outpost.
    
-   An individual outpost instance is strictly bound to a single Cortex Cloud tenant and cannot be used to scan resources belonging to a different tenant or organization.
    
-   Using an outpost requires additional cloud provider permissions and may incur additional cloud costs.
    
-   Familiarize yourself with the needed permissions and resources expected to be added to the outpost during creation.
    

For exact implementation details, contact your Palo Alto Networks representative.

###### About outpost creation

After planning, you can create and configure your outpost in the following ways:

-   Before onboarding your Cortex Cloud with the cloud service provider (CSP) onboarding wizard, create an outpost by navigating to Settings → Data Sources & Integrations → Outposts.
    
-   Alternatively, while onboarding your Cortex Cloud with the cloud service provider (CSP) onboarding wizard, the wizard prompts you to choose a scan mode: Cloud scan or Outpost scan. When choosing Outpost scan, you have the opportunity to create your outpost. To start the cloud service provider (CSP) onboarding wizard, navigate to Settings → Data Sources & Integrations → Add New.
    

**Note:**

Before you create your outpost, verify that your internet connection is active. An active internet connection is necessary for the notification to be sent to Cortex Cloud to create the new outpost.

For details, see Create an outpost.

###### What's next?

-   Create your outpost
    
-   View and manage existing outposts by navigating to Settings → Data Sources & Integrations → Outposts

##### Create an outpost

Create an outpost for security scanning performed on infrastructure in a cloud account owned by you.

This topic provides instructions for creating an outpost for different CSPs.

**Important:**

While outposts provide maximum control over the scanning environment, cloud scan mode is the recommended default for most organizations. For details, see When to choose outpost scan.

Creating an outpost comprises the following phases:

1.  Planning
    
2.  Running the outpost creation wizard in Cortex Cloud to generate an outpost authentication template for the relevant CSP. This template establishes trust with the CSP and grant the necessary permissions to  Cortex Cloud. Described below.
    
3.  Executing the template in the CSP to create the outpost, initially in pending status. Described below.
    
4.  Running the CSP onboarding wizard Cortex Cloud to generate an authentication template for the relevant CSP (AWS, GCP, Azure).
    
5.  Executing the authentication template in the CSP to onboard the CSP and ingest its data sources.
    

###### Run the outpost creation wizard to generate a template

Start the outpost creation wizard by navigating to Settings → Data Sources & Integrations → Outposts and clicking New Outpost.

**Note:**

Verify that your internet connection is active. An active internet connection is necessary for notifications to be sent to Cortex Cloud for creating the new outpost. If you are unable to establish an internet connection, contact customer support for a manual workaround.

Perform the steps according to your CSP.

AWS

1.  In Create AWS Outpost, select the type of AWS environment:
    
    -   **Commercial:** (Default) Standard cloud deployment typically used for private and public sector organizations that do not require isolated government-specific infrastructure.
        
    -   **Government:** AWS GovCloud environments for compatibility with FedRAMP-certified tenants.
        
    
2.  (Optional) Define tags and tag values to be added to any new resource created by Cortex in the cloud environment. Click Next.
    
3.  Click Download Terraform to download the Terraform template file.
    
    Execute the Terraform template in the CSP to create the outpost.
    

GCP

1.  In Create GCP Outpost, select the type of GCP environment:
    
    -   **Commercial:** (Default) Standard cloud deployment typically used for private and public sector organizations that do not require isolated government-specific infrastructure.
        
    -   **Government:** GCP Assured Workloads for compatibility with FedRAMP-certified tenants.
        
    
2.  Enter the project ID of the GCP project.
    
3.  (Optional) Define tags and tag values to be added to any new resource created by Cortex in the cloud environment. Click Next.
    
4.  Click Download Terraform to download the Terraform template file.
    
    Execute the Terraform template in the CSP to create the outpost.
    

Azure

**Note:**

When creating an outpost for a specific Azure subscription, the outpost account must be in the same Azure organization as the monitored subscriptions.

1.  In Create Azure Outpost, select the type of Microsoft Azure environment:
    
    -   **Commerical:** (Default) Standard cloud deployment typically used for private and public sector organizations that do not require isolated government-specific infrastructure.
        
    -   **Government:** Microsoft Azure Government environments for compatibility with FedRAMP-certified tenants.
        
    
2.  Enter the tenant ID of the Azure tenant in which you want to establish the outpost.
    
3.  (Optional) Define tags and tag values to be added to any new resource created by Cortex in the cloud environment. Click Next.
    
4.  Click Download Terraform to download the Terraform template file.
    
    Execute the Terraform template in the CSP to create the outpost.
    

###### Execute the template in the CSP to finalize the outpost

When you have downloaded the Terraform template file in the onboarding wizard, log in to the CSP and execute the template file.

Perform the steps according to your CSP.

AWS

**Prerequisite:**

Before you begin, ensure you have:

-   An AWS account
    
-   Permission to create a stack and its resources in AWS
    
-   Installed Terraform on your local machine. You can download Terraform from the official [Terraform website](https://www.terraform.io/downloads.html) and follow the installation instructions for your operating system.
    
-   Installed the AWS CLI tool and configured your profile with the `aws configure sso` wizard.
    

1.  Open your local terminal (Command prompt, PowerShell, or Terminal).
    
2.  Log in to your AWS account using the AWS CLI:
    
    aws sso login --profile `<my-profile>`
    
    Where `<my-profile>` is the profile you configured with the `aws configure sso` wizard.
    
3.  Create a directory on your local machine to store and run the Terraform code. If you are creating more than one outpost, you need a separate directory for each one:
    
    ```
    mkdir -p ~/terraform/aws-outpost-1
    ```
    
4.  Navigate to the directory you created and extract the Terraform files.
    
    ```
    cd ~/terraform/aws-outpost-1
    tar -xzvf <your_template>.tar.gz
    ```
    
5.  Initialize Terraform in your project directory:
    
    ```
    terraform init
    ```
    
6.  Apply your Terraform configuration using the downloaded parameter file. When prompted, enter the subscription ID:
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
7.  When prompted, review the actions Terraform will perform and approve them by entering **`yes`**.
    
    The Terraform template is deployed, and your outpost is created. To view all outposts and their details, navigate to Settings → Data Data Sources & Integrations → Outposts.
    

GCP

**Danger:**

Before you begin, ensure you have:

-   A GCP account
    
-   Permission to create the required resources in Google Cloud Deployment Manager
    
-   Installed Terraform on your local machine. You can download Terraform from the official [Terraform website](https://www.terraform.io/downloads.html) and follow the installation instructions for your operating system.
    
-   Installed the GCP gcloud CLI tool
    

1.  Open your local terminal (Command Prompt, PowerShell, or Terminal).
    
2.  Log in to your GCP account using the gcloud CLI:
    
    ```
    gcloud auth login
    ```
    
3.  Create a directory on your local machine to store and run the Terraform code. If you are creating more than one outpost, you need a separate directory for each one:
    
    ```
    mkdir -p ~/terraform/gcp-outpost-1
    ```
    
4.  Navigate to the directory you created and extract the Terraform files.
    
    ```
    cd ~/terraform/gcp-outpost-1
    tar -xzvf <your_template>.tar.gz
    ```
    
5.  Initialize Terraform in your project directory:
    
    ```
    terraform init
    ```
    
6.  Apply your Terraform configuration using the downloaded parameter file. When prompted, enter the project ID:
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
7.  When prompted, review the actions Terraform will perform and approve them by entering **`yes`**.
    
    The Terraform template is deployed, and your outpost is created. To view all outposts and their details, navigate to Settings → Data Sources & Integrations → Outposts.
    

Azure

**Danger:**

Before you begin, ensure you have:

-   An active Azure subscription.
    
-   Installed the Azure CLI tool.
    
-   Permission to deploy a custom template and create its resources in Microsoft Azure ("Owner" or "Contributor" on the designated outpost subscription scope, and Active Directory "Cloud Application Administrator" or "Application Administrator" privileged roles).
    
-   Installed Terraform 1.9.4 or above on your local machine. You can download Terraform from the official [Terraform website](https://www.terraform.io/downloads.html) and follow the installation instructions for your operating system.
    
-   A static egress IP assigned to the machine running this Terraform. This is used to configure the Azure Storage IP whitelist (Recommended). Without this, future runs of this Terraform may fail on Azure storage configurations.
    

1.  Open your local terminal (Command Prompt, PowerShell, or Terminal).
    
2.  Log in to your Azure account using the Azure CLI:
    
    ```
    az login
    ```
    
3.  If prompted, select the subscription_id of the designated subscription, or run:
    
    az account set --subscription `<subscription_id>`
    
    Where `<subscription_id>` is the subscription ID of the designated subscription.
    
4.  Create a directory on your local machine to store and run the Terraform code. If you are creating more than one outpost, you need a separate directory for each one:
    
    ```
    mkdir -p ~/terraform/azure-outpost-1
    ```
    
5.  Navigate to the directory you created and extract the Terraform files.
    
    ```
    cd ~/terraform/azure-outpost-1
    tar -xzvf <your_template>.tar.gz
    ```
    
6.  Initialize Terraform in your project directory:
    
    ```
    terraform init
    ```
    
7.  Apply your Terraform configuration using the downloaded parameter file. When prompted, enter the subscription ID:
    
    ```
    terraform apply --var-file=template_params.tfvars
    ```
    
8.  When prompted for `var.storaage_account_ip_whitelist`, you can leave it empty to enable access from any public IP to the storage accounts. We recommend you to limit access to selected IPs. To limit access, enter a comma-separated list of public IP addresses, including your local machine's egress IP (to enable the completion of the Terraform run). For example: `8.8.8.8, 8.8.4.4`
    
9.  Review the actions Terraform will perform and approve them by entering **`yes`**.
    
10.  It is important to create a backup of the Terraform state file using one of the following methods:
     
     Back up the `terraform.tfstate` and `terraform.tfstate.backup` files or use Terraform backend to save the state.
     
     -   Create copies of the `terraform.tfstate` and `terraform.tfstate.backup` files. These can then be moved to the working folder to allow Terraform to upgrade or destroy the created resources as necessary.
         
     -   Ensure you're using a backend block in your Terraform configuration. For more information, see [Backend block configuration overview](https://developer.hashicorp.com/terraform/language/backend).
         
     
     The Terraform template is deployed, and your outpost is created. To view all outposts and their details, navigate to Settings → Data Sources & Integrations → Outposts.
     

###### What's next?

After you have executed the template in your CSP:

-   The necessary permissions are granted and a notification is sent to Cortex Cloud with the execution details.
    
-   A new outpost is created in pending status and can be viewed in the Outpost page at Settings → Data Sources & Integrations → Outposts.
    

Continue the CSP onboarding by running and executing the CSP onboarding wizard to generate an authentication template for the relevant CSP (AWS, GCP, Azure).

Troubleshooting

If you have successfully executed the template in your cloud service provider and no new outpost has been created, verify that your internet connection is active. An active internet connection is necessary for the notification to be sent to Cortex Cloud to create the new outpost. If you are unable to establish an internet connection, contact customer support for a manual workaround.

#### Introduction to Terraform for Cloud service provider (CSP) onboarding

Introductory concepts for working with Terraform to facilitate cloud onboarding.

Terraform is an open-source Infrastructure as Code (IaC) tool that allows you to define and provision cloud infrastructure using declarative configuration files. Instead of manually creating resources in a cloud console, you use Terraform templates to automate the setup required for Cortex Cloud.

##### Key Terraform concepts

These concepts explain the underlying logic of how Terraform interacts with your cloud environment.

Infrastructure as Code (IaC)

[Infrastructure as Code](https://developer.hashicorp.com/terraform/intro) allows you to manage your network and security settings through declarative configuration (text) files. Terraform reads these files and compares them to your actual cloud environment to determine which resources need to be created, updated, or deleted to match the template.

The Terraform state file (.tfstate)

The `.tfstate` [state file](https://developer.hashicorp.com/terraform/language/state) is a local record that maps your template configuration to the real resources in your cloud. The state file acts as a database that maps your configuration to real-world resources.

Each time you execute a Terraform template (such as by using plan or apply commands), Terraform compares the state file with the actual cloud environment to ensure everything is in sync. If there are differences, Terraform attempts to sync between the template and the cloud. Any resources that differ from the template are synced to match the template definition.

It is critical that you follow the following rules:

-   Never delete the `.tfstate` file. If this file is lost, Terraform loses its "memory" of what it created, making it difficult to update or offboard (delete) those resources later.
    
-   Always run Terraform commands from the original folder where you initialized the template to ensure access to the `.tfstate` file.
    
-   If using a cloud-based terminal (like Azure Cloud Shell), ensure your files are saved to a persistent directory so the `.tfstate` file is not lost when the session ends.
    

##### Authentication and CLI prerequisites

Terraform does not have its own login; it uses the credentials for each cloud service provider. Before executing Terraform templates provided by Cortex Cloud, configure and authenticate using your cloud provider's Command Line Interface (CLI):

-   **AWS**: Configure the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
    
-   **Azure**: Log in to the [Azure CLI (az)](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).
    
-   **GCP**: Initialize the [Google Cloud CLI (gcloud)](https://cloud.google.com/sdk/docs/install).
    
-   **OCI**: Configure the [OCI CLI](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/cliconcepts.htm). We recommend you use [token based authentication](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/clitoken.htm).
    

##### Core Terraform commands

While Terraform has many features, the Cortex Cloud onboarding process typically only uses the following core commands.

**Important:**

Always run these commands in the same folder where the original `.tf` files and `.terraform` folder live—this is where the [state](https://docs.google.com/document/d/1BmX1BEqveiHrmv-O4BIS76EyOD1BYpYfKGUbHSKYAMo/edit?tab=t.0#heading=h.jyu9w6io0myj) is stored.

The `terraform init` command

The `terraform init` command prepares Terraform for the actual actions it will perform, such as downloading any required modules and cloud provider plugins.

Command: `terraform init`

Run this command when:

-   It is the first time the template is going to be executed.
    
-   There are changes to the template that necessitate updates to modules that have changed.
    

The `terraform apply` command

The `terraform apply` command previews the changes and executes the template to create or update the cloud resources.

Command: `terraform apply --var-file=template_params.tfvars [-auto-approve]`

When running the command, you must pass the template parameter file as an argument. 

This command requests confirmation before making any changes. Type **yes** for the changes to be made. You can bypass the confirmation by passing `-auto-approve` to the apply command.

The first time this command is run, this command also creates the `.tfstate` state file. This file stores the state of the cloud resources at the time the command is executed.

**Important:**

This `.tfstate` state file is critical because it is needed by the `terraform destroy` command to clean up created resources. It is critical that you never delete this file.

The `terraform destroy` command

The `terraform destroy` command removes all resources created by the `terraform apply` command. This is the standard way to offboard the CSP.

Command: `terraform destroy --var-file=template_params.tfvars [-auto-approve]`

Run this command: 

-   To off-board.
    
-   To re-onboard. Before re-onboarding, clean up existing resources before re-onboarding.
    

When running the command, you must pass the template parameter file as an argument. 

This command requests confirmation before making any changes. Type **yes** for the changes to be made. You can bypass the confirmation by passing `-auto-approve` to the apply command.

##### Standard Terraform deployment workflows

The lifecycle of a Cortex Cloud resource involves the following primary workflows: 

-   The initial provisioning of resources.
    
-   The subsequent updating of those resources as requirements change, or as Cortex releases new updates and features.
    

Initial template onboarding

The onboarding process involves the initial translation of your cloud configuration into live cloud resources.

-   **Preparation**: Download the necessary provider plugins, and then download and extract the Terraform template configuration files, such as `.tf` and `.tfvars`, into the working directory.
    
-   **Initialization**: Prepare the local environment for a specific template by executing this command from inside the template folder:
    
    `terraform init`
    
-   **Application**: Apply the configuration to the cloud provider using the specific variable file (such as `template_params.tfvars`) to define your unique environment settings. Execute this command from inside the template folder:
    
    `terraform apply --var-file=template_params.tfvars`
    

Upgrades

As Cortex releases new features or updates, or you have changes to your own cloud infrastructure, you must update the existing template. This workflow involves merging new configuration files into your existing local directory while strictly maintaining the original state file.

This "upgrade" scenario relies on the state file to identify what has changed. By reconfiguring the initialization and applying the new files, Terraform identifies the differences and modifies the existing resources rather than recreating them from scratch.

-   **Reconfiguration**: Updates the existing working template folder to account for changes in the underlying template structure, such as by copying new files into the folder. You can replace existing files but do not delete any files. 
    
-   **Synchronization**: Updates the live cloud resources to align with the new template definition while preserving your existing variables. Execute the following commands:
    
    `terraform init -reconfigure`
    
    `terraform apply --var-file=template_params.tfvars`
    

##### Working in Cloud Shell environments

If you are onboarding using a browser-based terminal (like Azure Cloud Shell or GCP Cloud Shell) instead of locally, make sure to adhere to the following:

-   **Keep the original folder**: You must always run commands from the original folder where you initialized Terraform.
    
-   **Persistence**: Ensure your session is saved to a persistent home folder (such as `~/`). If the session ends and the folder is deleted, your `.tfstate` file will be lost, which prevents easy cleanup or resource management.
    

| CSP | Folder for Persistence |
| --- | --- |
| Azure | See [Persist files in Azure Cloud Shell](https://learn.microsoft.com/en-us/azure/cloud-shell/persisting-shell-storage) |
| AWS | `~/` |
| GCP | `~/` |
| OCI | `~/` |

#### Container Registry Scanning

##### Overview of container registry scanning
Container Registry Scanning identifies vulnerabilities, malware, and secrets, providing comprehensive protection for containerized applications across various cloud environments without manual intervention.

Cortex Cloud supports scanning of registries through the following methods:

-   **Managed Cloud Registries**: The container registry scanner automatically detects and scans container registries and images within your onboarded cloud accounts. Supported registries include Amazon Elastic Container Registry (ECR), Azure Container Registry (ACR), Google Artifact Registry (GAR), and Oracle Cloud Infrastructure (OCI) Artifact Registry.
    
-   **Third-Party Integrations**: The container registry scanner supports agentless scanning of container images by direct integration with various third-party registries, independent of the cloud account onboarding process. These integrations include a streamlined, user-friendly connector configuration experience for the following:
    
    -   Docker Hub
        
    -   Docker V2 compliant registriesConnect Docker V2 compliant container registry
        
    -   GitLab Container Registry
        
    -   Harbor Registry
        
    -   JFrog Container RegistryConnect JFrog container registry
        
    -   Sonatype Nexus Repository Manager
        
    

After you onboard your container registries, Runtime Security ensures that all containers and images are scanned at regular intervals and that you are notified about any deviation from your security policies and best practices.

###### Registry Components
To understand how container registry scanning works, it's essential to understand its core components:

-   **Container registry:** A container registry is a service for publishing, maintaining, and securely distributing container images, providing a centralized hub for managing and accessing containerized application components across your organization. This scanning helps to enable proactive identification and remediation of security risks before deployment which means you will be using only trusted and compliant images in production environments.
    
-   **Container image repository:** Within a container registry, container images are organized into multiple repositories to improve management, access control, collaboration, and security isolation. Each repository should ideally contain images related to a specific application, service, or project, allowing for granular permissioning and security policies. Images within a repository often share a common base image or purpose, making it easier to apply consistent security controls across related components.
    
-   **Image Tags:** Image tags are essential for identifying and managing container image versions within a repository, enabling the selection and deployment of appropriate builds. From a security perspective, tags facilitate tracking vulnerable images, deploying patched versions, and maintaining image provenance for auditing. There are two common formats for referencing image tags:
    
    -   image:tag – A human-readable label that can be reassigned to different versions. For example, myapp:latest or myapp:v1.0.0.
        
    -   image@sha – A cryptographic hash that provides an immutable reference to a specific image version. For example, myapp@sha256:abc123.
        
    

While human-readable tags like myapp:latest (reassignable) and myapp:v1.0.0 are common, using immutable tags such as myapp@sha256:abc123 provides a cryptographically secure and verifiable reference, crucial for ensuring the integrity and trustworthiness of deployed images.

-   **Image Digest:** A cryptographic digest (SHA-256 hash) uniquely identifies a container image's content, providing a strong guarantee of immutability. Unlike user-defined image tags, which can be reassigned, using the digest as a tag ensures that even if an image is renamed or retagged, its content remains verifiably identical, making it a critical element for security auditing and ensuring the integrity of deployed applications. Relying on image digests helps prevent potential supply chain attacks where malicious actors might attempt to replace images with compromised versions.

###### How Container Registry Scanning Works
The process of container registry scanning consists of three key phases: discovery, scanning, and evaluation.

1.  **Discovery**: The connector discovers all registries, repositories, and tags within the account.
    
2.  **Scanning**: The connector extracts software bills of materials (SBOMs), malware indicators, and secrets from each image.
    
3.  **Evaluation**: Scan results are evaluated for vulnerabilities, malware, and secrets, and asset findings are created accordingly.

##### Configure registry scanning for cloud accounts
Configuring registry scanning ensures that only verified and compliant images are deployed across your cloud environments. You can configure container registry scanning during the onboarding process for managed registries such as Amazon Elastic Container Registry (ECR), Azure Container Registry (ACR), Google Artifact Registry (GAR), and Oracle Cloud Infrastructure (OCI) Artifact Registry.

If an account is already onboarded, you can modify its configuration to enable registry scanning as an Additional Security Capability to scan images for vulnerabilities, malware, and secrets.

**Prerequisite:**

Ensure that you have performed the all steps till Additional Security Capabilities as listed in the onboarding wizard for the required CSP:

-   Onboard Amazon Web ServicesOnboard Amazon Web Services
    
-   Onboard Google Cloud PlatformOnboard Google Cloud Platform
    
-   Onboard Microsoft AzureOnboard Microsoft Azure
    
-   Onboard Oracle Cloud InfrastructureOnboard Oracle Cloud Infrastructure
    

To configure registry scanning, do the following:

1.  Under Additional Security Capabilities, select Registry Scanning, then click Edit Preferences.
    
    
    
2.  In Initial Scan Configuration, set your scanning process to focus on recently added or modified container images and exclude older ones that do not align with your current scanning objectives. This setting helps avoid unnecessary scans. Choose one of the following options:
    
    -   All: Scans all container images, including all versions (tags), in all discovered repositories.
        
    -   Latest Tags: Scans only images tagged 'latest' in all discovered repositories.
        
    -   Days Modified: Scans container images created or modified in the last few days. You can select a range of up to **90** days for the scan.
        
    
3.  Select Save.
    
    After you configure your container registries, the system automatically starts a new scan. The connection process can take up to 15 minutes. To check the status of the data connector and view the registry scan results, go to the Cloud Instances page and select the relevant Instance Name from the list.
    
4.  **Next Steps**.
    
    -   After the scan completes, you can view the scanned images in the Container Image page. For more details, see Container Image assets.
        
    -   You can also modify your cloud instances to manage them effectively. For more details, see Managing Cloud Instances.

##### Modify the container registry scanning scope
Using the Modify Scanning Scope option, you can define conditions to automatically exclude selected scopes from scanning. These conditions can be based on the registry, repository, or tag. After you set the scope, the exclusion conditions are automatically applied to newly discovered images in the account.

To modify the scanning scope, do the following:

1.  Navigate to Settings → Data Sources.
    
2.  In the Cloud Provider section, locate the provider where your assets are stored and click View Details.
    
3.  On the Cloud Instances page, click the instance name for which you want to modify the scope.
    
4.  Under the Accounts section, select the account, right-click, and choose Edit.
    
5.  Under the Registry Scanning Scope, enable Modify Scanning Scope.
    
6.  From the list of images, select the image you want to modify.
    
7.  Alternatively, you can also filter for a specific image by clicking the Filter icon and selecting Registry, Repository ,or Tags option and then adding the desired value to refine your search.
    
    The search results are applied automatically, even if you do not select Save.
    
8.  Click Save to confirm your modifications.
    

This ensures that the specified scanning scope is customized based on your needs.

##### Scan re-evaluation process
After the initial scan has been completed, the scan re-evaluation process ensures that container images remain secure over time without requiring a full re-scan.

Instead of manually triggering new scans, the scan re-evaluation process automatically reassesses existing scan results every **24 hours** using the latest threat intelligence feeds. This approach reduces the need for resource-intensive re-scans, while maintaining up-to-date security assessments.

By continuously monitoring container images for emerging threats, you can proactively mitigate risks and ensure compliance with security best practices.

##### Connect Docker Hub registry
The Docker Hub registry connector allows you to connect your public or private Docker Hub account to scan and secure container images against vulnerabilities, malware, and exposed secrets.

How to connect Docker Hub registry

Follow the wizard to connect your Docker Hub registry with Cortex Cloud.

1.  Navigate to Settings → Data Sources & Integrations and click \+ Add New.
    
2.  On the Add Data Sources or Integrations page, search for Docker Hub, then hover over it and click Add.
    
3.  The Instance Name is automatically populated. You can change it to a more meaningful name.
    
4.  Choose the Scan Mode, and then follow the steps for that mode to configure the connection.
    
    Cloud Scan
    
    Security scanning is performed in the Cortex Cloud environment when you select this mode.
    
    1.  Select the appropriate Cloud Provider and Region for the Cortex Cloud environment to use for registry scanning.
        
        As a best practice, choose the region closest to your registry deployment to achieve the best scanning throughput and potentially reduce cloud costs.
        
    2.  (Optional) Enable Allow access by IPs to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so the scanner can access the registry during the scanning process.
        
    3.  Choose the relevant Repository Access for scanning:
        
        Authenticated access
        
        Discover and scan private and public repositories within the given account.
        
        1.  Under Authentication Method, enter your private Docker Hub account credentials (Username and Password) for authentication.
            
        
        Public access only
        
        Discover and scan images within a specific public repository.
        
        1.  Enter your public Docker Hub Repository Name.
            
            To specify an official Docker Hub repository, enter `library/`, followed by the short string used to designate the repo. For example, to scan the images in the official Alpine Linux repository, enter `library/alpine`.
            
        2.  Under Authentication Method, enter your public Docker Hub account user credentials (Username and Password) for authentication.
            
        
    4.  Select Next.
        
    
    Scan with Outpost
    
    Security scanning is performed on infrastructure deployed to a cloud account that you own. This mode requires additional cloud provider permissions and may incur extra costs.
    
    **Prerequisite:**
    
    Ensure an Outpost is connected to your tenant.
    
    1.  Choose a Cloud Provider to initialize registry scanning.
        
        **Note:**
        
        If you choose Azure as the Cloud Provider, you must also select the Tenant Id. The Tenant Id is required to approve Cortex as an enterprise application in your Azure tenant.
        
    2.  Choose Outpost account to use for this instance. If no Outposts are shown, you can Create a new one. For more details, see Outposts.
        
        **Note:**
        
        If you choose Azure as the cloud provider, only Outposts associated with the selected tenant ID are displayed.
        
    3.  Select the Region where the registry is hosted.
        
    4.  (Optional) Enable Allow access by IPs if you want to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so that the scanner can access the registry during the scanning process.
        
    5.  Choose the relevant Repository Access for scanning:
        
        Authenticated access
        
        Discover and scan private and public repositories within the given account.
        
        1.  Under Authentication Method, enter your private Docker Hub account credentials (Username and Password) for authentication.
            
        
        Public access only
        
        Discover and scan images within a specific public repository.
        
        1.  Enter your public Docker Hub Repository Name.
            
            To specify an official Docker Hub repository, enter `library/`, followed by the short string used to designate the repo. For example, to scan the images in the official Alpine Linux repository, enter `library/alpine`.
            
        2.  Under Authentication Method, enter your public Docker Hub account user credentials (Username and Password) for authentication.
            
        
    6.  Select Next.
        
    
    Scan with Broker VM
    
    Security scanning in private networks is done using broker VM infrastructure when you select this mode.
    
    **Prerequisites:**
    
    -   Set up and configure Broker VM
        
    -   Configure High Availability Cluster
        
    
    1.  Choose a Scan with Broker VM mode to initiate registry scanning. You can select either a standalone Broker VM or a High Availability (HA) Cluster.
        
    2.  Select Applicable Broker VMs.
        
        Choose the appropriate Broker VM or Cluster from the list configured in your tenant.
        
        **Note:**
        
        -   The list of Broker VMs displays only VMs that support registry scanning.
            
        -   The list of high-availability Clusters displays only clusters that contain at least one VM supporting registry scanning.
            
        -   The registry scanning status for each VM appears in brackets if it was previously activated for that specific VM.
            
        
        If the list does not display any Broker VMs or Clusters, Add New Broker VM or Add New Cluster. For more details, see Set up and configure Broker VM.
        
    3.  Choose the relevant Repository Access for scanning:
        
        Authenticated access
        
        Discover and scan private and public repositories within the given account.
        
        1.  Under Authentication Method, enter your private Docker Hub account credentials (Username and Password) for authentication.
            
        
        Public access only
        
        Discover and scan images within a specific public repository.
        
        1.  Enter your public Docker Hub Repository Name.
            
            To specify an official Docker Hub repository, enter `library/`, followed by the short string used to designate the repo. For example, to scan the images in the official Alpine Linux repository, enter `library/alpine`.
            
        2.  Under the Authentication Method, enter your public Docker Hub account user credentials (Username and Password) for authentication.
            
        
    4.  Select Next.
        
    
5.  In Initial Scan Configuration, set your scanning process to focus on recently added or modified container images and exclude older ones that do not align with your current scanning objectives. This setting helps avoid unnecessary scans. Choose one of the following options:
    
    -   All: Scans all container images, including all versions (tags), in all discovered repositories.
        
    -   Latest Tag: Scans only images tagged 'latest' in all discovered repositories.
        
    -   Days Modified: Scans container images created or modified in the last few days. You can select a range of up to **90** days for the scan.
        
    
6.  Select Save.
    
    When the Docker Hub data source is saved, a new data connector is created, and the initial discovery scan begins. The connection process may take up to 15 minutes.
    
7.  To check the connector status and scan results, follow these steps:
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  Find the Docker Hub instance from the list of 3rd Party Data Sources connectors, or use Search.
        
    3.  In the Docker Hub instance row, select View Details. The Docker Hub Instances page appears.
        
    4.  On the Docker Hub Instances page, you can filter results by any heading and value.
        
    5.  Select an Instance Name to open the details pane. The details pane contains the following granular information:
        
        | Instance Details | Description |
        | --- | --- |
        | Status | Shows the status of the connector: Connected, Error, Warning, Disabled, or Pending. |
        | Applet Status on Broker VM | Shows the status of the Registry Scanner applet on the Broker VM page. This status is visible only when the Scan with Broker VM mode is selected. |
        | Repositories | Shows the number of scanned repositories in the registry. |
        | Scan Mode | Shows the selected scan mode for the data connector, such as Cloud Scan, Scan with Outpost, or Scan with Broker VM. |
        | Security Capabilities | Shows a breakdown of the security capabilities enabled on the instance and their individual statuses. For example, select Registry Scanning when it shows a warning or error status to see the open errors and issues that contributed to the status. |
        
8.  **Next Steps**
    
    After the scan is complete, you can view the scanned images on the Container Images Inventory page. For more details, see Container Image assets.
    
    If you have selected the Scan with Broker VM option, then a Registry Scanner applet is created on the selected Broker VM or Cluster. For details, see Verify Registry Scanner connection.

###### Manage a Docker Hub connector
After you add a Docker Hub connector, you can modify the connector settings and configure the scanning scope to control which images are scanned in the connected registry.

To manage the connector, follow these steps:

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find the Docker Hub data source from the list of data sources, or use the filter to search.
    
3.  Select the Docker Hub row. A pane opens with a list of integration instances and their details.
    
    You can create a new instance by selecting Add Instance and following the onboarding wizard to define the settings.
    
4.  Right click an instance to perform actions on it as follows:
    
    | Action | Instructions |
    | --- | --- |
    | Edit | Edit the Docker integration instance.  \*\*Note:\*\* If you selected Scan with Broker VM mode, you can't change to a different scan mode (such as Cloud Discovery or Scan with Outpost) when you edit the instance.; When editing an instance configured for Scan with Broker VM, you must re-enter your authentication credentials, including Username, Password, and CA certificate. |
    | Exclude/Include images | Define conditions to automatically exclude or include specific images while scanning. Conditions can be based on Repository or Tags. These conditions apply automatically to newly discovered images in the account. |
    | Disable | Stops image scanning for the connector without deleting it. |
    | Delete | Removes the connector. |

##### Connect Docker V2 compliant container registry
A Docker V2-compliant registry is a registry service that complies with the specifications and requirements outlined in the Docker Registry HTTP API V2. This API defines the protocol for interacting with a Docker registry, a repository where Docker images are stored and from which they can be pulled or pushed.

To scan public and private repositories on Docker Hub, use the Docker Hub registry connector.

How to connect Docker V2

Follow the wizard to use the Docker V2 connector in Cortex Cloud to scan and secure container images from any container registry that supports the Docker V2 protocol, ensuring comprehensive security.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Add Data Sources or Integrations page, click \+ Add New, search for Docker V2, then hover over it and click Add.
    
3.  The Instance Name is automatically populated. You can change it to a more meaningful name.
    
4.  Choose the Scan Mode, and then follow the steps for that mode to configure the connection.
    
    Cloud Scan
    
    Security scanning is performed in the Cortex Cloud environment when you select this mode.
    
    1.  Select the appropriate Cloud Provider and Region for the Cortex environment to use for registry scanning.
        
        As a best practice, choose the region closest to your registry deployment to achieve the best scanning throughput and potentially reduce cloud costs.
        
    2.  (Optional) Enable Allow access by IP’s to specify a static IP address for the scanner to use. Ensure the static IP is allowed through your firewall so the scanner can access the registry during the scanning process.
        
    3.  Enter the Registry URL. This must match the URL you use with the **docker login** command.
        
        Equivalent URL: `https://docker.io/`
        
        If you are using a CA certificate for authentication, enter the server IP address instead of the Registry URL.
        
    4.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
        Use your **Docker ID** as the username (for example, john0907) and **not** your email address.
        
    5.  (Optional) Expand Show Advanced Settings, and then enter the CA certificate in PEM format for Cortex to validate the Docker registry v2.
        
        Ensure that the Custom CA certificate that you use is not revoked by the issuing authority.
        
    6.  Select Next.
        
    
    Scan with Outpost
    
    Security scanning is performed on infrastructure deployed to a cloud account that you own. This mode requires additional cloud provider permissions and may incur extra costs.
    
    **Prerequisite:**
    
    Ensure an Outpost is connected to your tenant. Outposts
    
    1.  Choose a Cloud Provider to initialize registry scanning.
        
        **Note:**
        
        If you choose Azure as the Cloud Provider, you must also select the Tenant Id. The Tenant Id is required to approve Cortex as an enterprise application in your Azure tenant.
        
    2.  Choose Outpost account to use for this instance. If no Outposts are shown, you can Create a new one. For more details, see Outposts.
        
        **Note:**
        
        If you choose Azure as the cloud provider, only Outposts associated with the selected tenant ID are displayed.
        
    3.  Select the Region where the registry is hosted.
        
    4.  (Optional) Enable Allow access by IP’s if you want to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so that the scanner can access the registry during the scanning process.
        
    5.  Enter the Registry URL. This must match the URL you use with the **docker login** command.
        
        Equivalent URL: `https://docker.io/`
        
        If you are using a CA certificate for authentication, enter the server IP address instead of the Registry URL.
        
    6.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
        Use your **Docker ID** as the username (for example, john0907) and **not** your email address.
        
    7.  (Optional) Expand Show advanced settings, and then enter the CA certificate in PEM format for Cortex to validate the Docker registry v2.
        
        Ensure that the Custom CA certificate that you use is not revoked by the issuing authority.
        
    8.  Select Next.
        
    
    Scan with Broker VM
    
    Security scanning in private networks is performed using broker VM infrastructure when you select this mode.
    
    **Prerequisite:**
    
    Ensure one of the following is configured:
    
    -   Set up and configure Broker VM.
        
    -   Configure High Availability Cluster.
        
    
    1.  Choose a Scan with Broker VM mode to initiate registry scanning. You can select either a standalone Broker VM or a High Availability (HA) Cluster.
        
    2.  Select Applicable Broker VMs.
        
        Choose the appropriate Broker VM or Cluster from the list configured in your tenant.
        
        **Note:**
        
        -   The list of Broker VMs displays only VMs that support registry scanning.
            
        -   The list of high-availability Clusters displays only clusters that contain at least one VM supporting registry scanning.
            
        -   The registry scanning status for each VM appears in brackets if it was previously activated for that specific VM.
            
        
        If the list does not display any Broker VMs or clusters, Add New Broker VM or Add New Cluster. For more details, see Set up and configure Broker VM.
        
    3.  Enter the Registry URL. This must match the URL you use with the **docker login** command.
        
        Equivalent URL: `https://docker.io/`
        
        If you are using a CA certificate for authentication, enter the server IP address instead of the Registry URL.
        
    4.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
        Use your **Docker ID** as the username (for example, john0907) and **not** your email address.
        
    5.  (Optional) Expand Show advanced settings, and then enter the CA certificate in PEM format for Cortex to validate the Docker registry v2.
        
        Ensure that the Custom CA certificate that you use is not revoked by the issuing authority.
        
    6.  Select Next.
        
    
5.  In the Initial Scan Configuration, set your scanning process to focus on recently added or modified container images and exclude older ones that do not align with your current scanning objectives. This setting helps avoid unnecessary scans. Choose one of the following options:
    
    -   All: Scans all container images, including all versions (tags), in all discovered repositories.
        
    -   Latest Tag: Scans only images tagged **'latest'** in all discovered repositories.
        
    -   Days Modified: Scans container images that have been created in the last few days. You can select a range of up to **90** days for the scan.
        
    
6.  Select Save.
    
    When the Docker V2 data source is saved successfully, a new data connector is created, and the initial discovery scan begins. The connection process can take up to 15 minutes.
    
7.  To check the connector status and scan results, follow these steps:
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  Find the Docker V2 integration from the list of data sources, or filter for it.
        
    3.  Select the Docker V2 instance row. A pane opens with a list of integration instances and their details showing the following information:
        
        | Instance Details | Description |
        | --- | --- |
        | Status | Shows the status of the connector: Connected, Error, Warning, Disabled, or Pending. |
        | Applet Status on Broker VM | Shows the status of the Registry Scanner applet on the Broker VM page. This status is visible only when the Scan with Broker VM mode is selected. |
        | Repositories | Shows the number of scanned repositories in the registry. |
        | Scan Mode | Shows the selected scan mode for the data connector, such as Cloud Scan, Scan with Outpost, or Scan with Broker VM. |
        | Security Capabilities | Shows a breakdown of the security capabilities enabled on the instance and their individual statuses. For example, select Registry Scanning when it shows a warning or error status to see the open errors and issues that contributed to the status. |
        
8.  Next Steps
    
    After the scan is complete, you can view the scanned images on the Container Images Inventory page. For more details, see Container Images assets.
    
    If you have selected the Scan with Broker VM option, then a Registry Scanner applet is created on the selected Broker VM or Cluster. For details, see Verify Registry Scanner connection.

###### Manage a Docker V2 connector
After you add a Docker V2 connector, you can modify the connector settings and configure the scanning scope to control which images are scanned in the connected registry.

To manage the connector, follow these steps:

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find the Docker V2 data source from the list of data sources, or filter to search.
    
3.  Select the Docker V2 row. A pane opens with a list of integration instances and their details.
    
    You can create a new instance by selecting Add Instance and following the onboarding wizard to define the settings.Connect Docker V2 compliant container registry
    
4.  Right click an instance to perform actions on it as follows:
    
    | Action | Instructions |
    | --- | --- |
    | Edit | Edit the Docker V2 instance. \*\*Note:\*\* If you selected Scan with Broker VM mode, you can't change to a different scan mode (such as Cloud Discovery or Scan with Outpost) when you edit the instance.; When editing an instance configured for Scan with Broker VM, you must re-enter your authentication credentials, including Username, Password, and CA certificate. |
    | Exclude/Include images | Define conditions to automatically exclude or include specific images while scanning. Conditions can be based on Repository or Tags. These conditions apply automatically to newly discovered images in the account. |
    | Delete | Removes the connector. |
    | Disable | Stops image scanning for the connector without deleting it. |

##### Connect GitLab container registry
Configure Cortex Cloud to scan your GitLab Container Registry without using administrator credentials. Use a GitLab Personal Access Token (PAT) to authenticate Cortex to access the GitLab Container Registry. This allows Cortex to list all container registries or images, and secure them from vulnerabilities, malware, and secrets.

How to connect GitLab registry

Follow the wizard to connect the GitLab Container Registry connector in Cortex Cloud.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Add Data Sources or Integrations page, click \+ Add New, search for GitLab Container Registry, then hover over it and click Add.
    
3.  The Instance Name is automatically populated. You can change it to a more meaningful name.
    
4.  Choose the Scan Mode, and then follow the steps provided for that mode to configure the connection.
    
    Cloud Scan
    
    Security scanning is done in the Cortex Cloud environment when you select this mode.
    
    1.  Select the appropriate Cloud Provider and Region for the Cortex environment to use for registry scanning.
        
        As a best practice, choose the region closest to your registry deployment to achieve the best scanning throughput and potentially reduce cloud costs.
        
    2.  (Optional) Enable Allow access by IPs to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so the scanner can access the registry during the scanning process.
        
    3.  Choose the relevant Account Type for Gitlab deployments:
        
        Gitlab Cloud (Saas)
        
        1.  (Optional) Enter the Group Id.
            
            You can enter a single group ID or a list of group IDs separated by a comma. The group ID is used to locate all the registries within a specific group.
            
        2.  (Optional) Enter the Project Id.
            
            You can enter a Gitlab Project ID or a list of project IDs separated by a comma. The project ID is used to locate all the registries located within a specific project.
            
            **Note:**
            
            When both the group ID and project ID are provided, the system retrieves container images from all projects within the specified group as well as from the specified project.
            
            If neither the group ID nor the project ID is provided, the system retrieves container images from all registries (across all groups and projects) accessible to the authenticated user or token in GitLab.
            
        3.  Under Authentication Method, enter your Gitlab Access Token.
            
        
        Gitlab Self-Hosted
        
        1.  Enter the Registry URL.
            
            If you are using a CA certificate, enter the server IP address instead of the registry url.
            
        2.  (Optional) Enter the Group id.
            
            You can enter a single group ID or a list of group IDs separated by a comma. The group ID is used to locate all the registries within a specific group.
            
        3.  (Optional) Enter the Project Id.
            
            You can enter a Gitlab Project ID or a list of project IDs separated by a comma. The project ID is used to locate all the registries located within a specific project.
            
            **Note:**
            
            When both the group ID and project ID are provided, the system retrieves container images from all projects within the specified group as well as from the specified project.
            
            If neither the group ID nor the project ID is provided, the system retrieves container images from all registries (across all groups and projects) accessible to the authenticated user or token in GitLab.
            
        4.  Enter the Api Domain. You must enter the base URL for the Gitlab API.
            
        5.  Under Authentication Method, enter your Gitlab Access Token.
            
        6.  (Optional) Expand Show Advanced Settings, and then enter the CA certificate in PEM format for Cortex to validate the Gitlab registry.
            
        
    4.  Select Next.
        
    
    Scan with Outpost
    
    Security scanning is done on infrastructure deployed to a cloud account that you own. This mode requires additional cloud provider permissions and may incur extra costs.
    
    **Prerequisite:**
    
    Ensure an Outpost is connected to your tenant.
    
    1.  Choose a Cloud Provider to initialize registry scanning.
        
        **Note:**
        
        If you choose Azure as the Cloud Provider, you must also select the Tenant Id. The Tenant Id is required to approve Cortex as an enterprise application in your Azure tenant.
        
    2.  Choose Outpost account to use for this instance. If no Outposts are shown, you can Create a new one. For more details, see Outposts.
        
        **Note:**
        
        If you choose Azure as the cloud provider, only Outposts associated with the selected tenant ID are displayed.
        
    3.  Select the Region where the registry is hosted.
        
    4.  (Optional) Enable Allow access by IPs if you want to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so that the scanner can access the registry during the scanning process.
        
    5.  Choose the relevant Account Type for Gitlab deployments:
        
        Gitlab Cloud (Saas)
        
        1.  (Optional) Enter the Group Id.
            
            You can enter a single group ID or a list of group IDs separated by a comma. The group ID is used to locate all the registries within a specific group.
            
        2.  (Optional) Enter the Project Id.
            
            You can enter a Gitlab Project ID or a list of project IDs separated by a comma. The project ID is used to locate all the registries located within a specific project.
            
            **Note:**
            
            When both the group ID and project ID are provided, the system retrieves container images from all projects within the specified group as well as from the specified project.
            
            If neither the group ID nor the project ID is provided, the system retrieves container images from all registries (across all groups and projects) accessible to the authenticated user or token in GitLab.
            
        3.  Under Authentication Method, enter your Gitlab Access Token.
            
        
        Gitlab Self-Hosted
        
        1.  Enter the Registry URL.
            
            If you are using a CA certificate, enter the server IP address instead of the registry url.
            
        2.  (Optional) Enter the Group Id. You can enter a single group ID or a list of group IDs separated by a comma. The group ID is used to locate all the registries within a specific group.
            
        3.  (Optional) Enter the Project Id. You can enter a Gitlab Project ID or a list of project IDs separated by a comma. The project ID is used to locate all the registries located within a specific project.
            
            **Note:**
            
            When both the group ID and project ID are provided, the system retrieves container images from all projects within the specified group as well as from the specified project.
            
            If neither the group ID nor the project ID is provided, the system retrieves container images from all registries (across all groups and projects) accessible to the authenticated user or token in GitLab.
            
        4.  Enter the Api Domain. You must enter the base URL for the Gitlab API.
            
        5.  Under Authentication Method, enter your Gitlab Access Token.
            
        6.  (Optional) Expand Show Advanced Settings, and then enter the custom CA certificate in PEM format for Cortex to validate the Gitlab registry.
            
        
    6.  Select Next.
        
    
    Scan with Broker VM
    
    Security scanning in private networks is done using broker VM infrastructure when you select this mode.
    
    **Prerequisite:**
    
    -   Set up and configure Broker VM
        
    -   Configure High Availability Cluster
        
    
    1.  Choose a Scan with Broker VM mode to initiate registry scanning. You can select either a standalone Broker VM or a High Availability (HA) Cluster.
        
    2.  Select Applicable Broker VMs.
        
        Choose the appropriate Broker VM or Cluster from the list configured in your tenant.
        
        **Note:**
        
        -   The list of Broker VMs displays only VMs that support registry scanning.
            
        -   The list of high-availability Clusters displays only clusters that contain at least one VM supporting registry scanning.
            
        -   The registry scanning status for each VM appears in brackets if it was previously activated for that specific VM.
            
        
        If the list does not display any Broker VMs or Clusters, Add New Broker VM or Add New Cluster. For more details, see Set up and configure Broker VM.
        
    3.  Choose the relevant Account Type for Gitlab deployments:
        
        Gitlab Cloud (Saas)
        
        1.  (Optional) Enter the Group Id. You can enter a single group ID or a list of group IDs separated by a comma. The group ID is used to locate all the registries within a specific group.
            
        2.  (Optional) Enter the Project Id. You can enter a Gitlab Project ID or a list of project IDs separated by a comma. The project ID is used to locate all the registries located within a specific project.
            
            **Note:**
            
            When both the group ID and project ID are provided, the system retrieves container images from all projects within the specified group as well as from the specified project.
            
            If neither the group ID nor the project ID is provided, the system retrieves container images from all registries (across all groups and projects) accessible to the authenticated user or token in GitLab.
            
        3.  Under Authentication Method, enter your Gitlab Access Token.
            
        
        Gitlab Self-Hosted
        
        1.  Enter the Gitlab Registry URL.
            
            If you are using a CA certificate, enter the server IP address instead of the registry url.
            
        2.  (Optional) Enter the Group Id. You can enter a single group ID or a list of group IDs separated by a comma. The group ID is used to locate all the registries within a specific group.
            
        3.  (Optional) Enter the Project Id. You can enter a Gitlab Project ID or a list of project IDs separated by a comma. The project ID is used to locate all the registries located within a specific project.
            
            **Note:**
            
            When both the group ID and project ID are provided, the system retrieves container images from all projects within the specified group as well as from the specified project.
            
            If neither the group ID nor the project ID is provided, the system retrieves container images from all registries (across all groups and projects) accessible to the authenticated user or token in GitLab.
            
        4.  Enter the Api Domain. You must enter the base URL for the Gitlab API.
            
        5.  Under Authentication Method, enter your Gitlab Access Token.
            
        6.  (Optional) Expand Show Advanced Settings, and then enter the CA certificate in PEM format for Cortex to validate the Gitlab registry.
            
        
    4.  Select Next.
        
    
5.  In Initial Scan Configuration, set your scanning process to focus on recently added or modified container images and exclude older ones that do not align with your current scanning objectives. This setting helps avoid unnecessary scans. Choose one of the following options:
    
    -   All: Scans all container images, including all versions (tags), in all discovered repositories.
        
    -   Latest Tag: Scans only images tagged 'latest' in all discovered repositories.
        
    -   Days Modified: Scans container images created or modified in the last few days. You can select a range of up to **90** days for the scan.
        
    
6.  Select Save.
    
    When the Gitlab data source is saved successfully, a new data connector is created, and the initial discovery scan is started. The connection process may take up to 15 minutes.
    
7.  To check connector status and scan results, follow these steps:
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  Find the Gitlab Container Registry instance from the list of 3rd Party Data Sources connectors, or use Search.
        
    3.  In the Gitlab Container Registry instance row, select View Details. The Gitlab Instances page appears.
        
    4.  On the Gitlab Instances page, you can filter results by any heading and value.
        
    5.  Select an instance name to open the details pane. The details pane contains the following granular information:
        
        | Instance Details | Description |
        | --- | --- |
        | Status | Shows the status of the connector: Connected, Error, Warning, Disabled, or Pending. |
        | Applet Status on Broker VM | Shows the status of the Registry Scanner applet on the Broker VM page. This status is visible only when the Scan with Broker VM mode is selected. |
        | Repositories | Shows the number of scanned repositories in the registry. |
        | Scan Mode | Shows the selected scan mode for the data connector, such as Cloud Scan, Scan with Outpost, or Scan with Broker VM. |
        | Security Capabilities | Shows a breakdown of the security capabilities enabled on the instance and their individual statuses. For example, select Registry Scanning when it shows a warning or error status to see the open errors and issues that contributed to the status. |
        
8.  **Next Steps**.
    
    -   After the scan is complete, you can view the list of scanned images on the Container Images Inventory page. For more details, see Container Image assets.
        
    -   If you have selected the Scan with Broker VM option, then a Registry Scanner applet is created on the selected Broker VM or Cluster. For details, see Verify Registry Scanner connection.

###### Manage a Gitlab Container Registry connector
After you add a Gitlab Container Registry connector, you can modify the connector settings and configure the scanning scope to control which images are scanned in the connected registry.

To manage the connector, follow these steps:

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find the Gitlab Container Registry data source from the list of data sources, or use the filter to search.
    
3.  Select the Gitlab Container Registry row. A pane opens with a list of integration instances and their details.
    
    You can create a new instance by selecting Add Instance following the onboarding wizard to define the settings.
    
4.  Right click an instance to perform actions on it as follows:
    
    | Action | Instructions |
    | --- | --- |
    | Edit | Edit the Gitlab instance.  \*\*Note:\*\* If you selected Scan with Broker VM mode, you can't change to a different scan mode (such as Cloud Discovery or Scan with Outpost) when you edit the instance.; When editing an instance configured for Scan with Broker VM, you must re-enter your authentication credentials, including Username, Password, and CA certificate. |
    | Exclude/Include images | Define conditions to automatically exclude or include specific images in scanning. Conditions can be based on Repository or Tags. These conditions apply automatically to newly discovered images in the account. |
    | Delete | Removes the connector. |
    | Disable | Stops image scanning for the connector without deleting it. |

##### Connect Harbor registry
Cortex Cloud allows you to scan and secure your container images from vulnerabilities, malware, and secrets after you authenticate and connect your Harbor registry account.

How to connect Harbor

Follow the wizard to use the Harbor connector in Cortex Cloud to scan and secure container images.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Add Data Sources or Integrations page, click \+ Add New, search for Harbor, then hover over it and click Add.
    
3.  The Instance Name is automatically populated. You can change it to a more meaningful name.
    
4.  Choose the Scan Mode, and then follow the steps for that mode to configure the connection.
    
    Cloud Scan
    
    Security scanning is performed in the Cortex cloud environment when you select this mode.
    
    1.  Select the appropriate Cloud Provider and Region for the Cortex environment to use for registry scanning.
        
        As a best practice, choose the region closest to your registry deployment to achieve the best scanning throughput and potentially reduce cloud costs.
        
    2.  (Optional) Enable Allow access by IP’s to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so the scanner can access the registry during the scanning process.
        
    3.  Enter the Registry URL.
        
        Use the base URL of the Harbor registry. For example:
        
        `https://harbor.yourdomain.com`
        
        `https://harbor.yourdomain.com:8443` (with a specific port)
        
        Alternatively, if you are using a CA certificate, enter the server IP address instead of the registry URL. For example:
        
        `https://35.209.190.220`
        
        `https://35.210.190.225:8084` (with a custom port)
        
    4.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
        If you have configured a robot account for automated access, use the robot account’s username and secret/token as authentication credentials.
        
        For example: `docker login harbor.example.com -u 'robot$<your-robot-account-name>' -p '<your-robot-token>'`
        
    5.  (Optional) Expand Show advanced settings and then enter a custom CA certificate in PEM format for Cortex to validate the Harbor registry. Ensure that the Custom CA certificate that you use is not revoked by the issuing authority.
        
    6.  Select Next.
        
    
    Scan with Outpost
    
    Security scanning is done on infrastructure deployed to a cloud account that you own. This mode requires additional cloud provider permissions and may incur extra costs.
    
    **Prerequisite:**
    
    Ensure an Outpost is connected to your tenant.
    
    1.  Choose a Cloud Provider to initialize registry scanning.
        
        **Note:**
        
        If you choose Azure as the Cloud Provider, you must also select the Tenant Id. The Tenant Id is required to approve Cortex as an enterprise application in your Azure tenant.
        
    2.  Choose Outpost account to use for this instance. If no Outposts are shown, you can Create a new one. For more details, see Outposts.
        
        **Note:**
        
        If you choose Azure as the cloud provider, only Outposts associated with the selected tenant ID are displayed.
        
    3.  Select the Region where the registry is hosted.
        
    4.  (Optional) Enable Allow access by IP’s if you want to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so that the scanner can access the registry during the scanning process.
        
    5.  Enter the Registry URL.
        
        Use the base URL of the Harbor registry. For example:
        
        `https://harbor.yourdomain.com`
        
        `https://harbor.yourdomain.com:8443` (with a specific port)
        
        Alternatively, if you are using a CA certificate, enter the server IP address instead of the registry URL. For example:
        
        `https://35.209.190.220`
        
        `https://35.209.190.220:8084` (with a custom port)
        
    6.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
        If you have configured a robot account for automated access, use the robot account’s username and secret/token as authentication credentials.
        
        For example: `docker login harbor.example.com -u 'robot$<your-robot-account-name>' -p '<your-robot-token>'`
        
    7.  (Optional) Expand Show advanced settings and then enter a custom CA certificate in PEM format for Cortex to validate the Harbor registry. Ensure that the Custom CA certificate that you use is not revoked by the issuing authority.
        
    8.  Select Next.
        
    
    Scan with Broker VM
    
    Security scanning in private networks is performed using broker VM infrastructure when you select this mode.
    
    **Prerequisite:**
    
    Ensure one of the following is configured:
    
    -   Set up and configure Broker VM.
        
    -   Configure High Availability Cluster.
        
    
    1.  Choose a Scan with Broker VM mode to initiate registry scanning. You can select either a standalone Broker VM or a High Availability (HA) Cluster.
        
    2.  Select Applicable Broker VMs.
        
        Choose the appropriate Broker VM or Cluster from the list configured in your tenant.
        
        **Note:**
        
        -   The list of Broker VMs displays only VMs that support registry scanning.
            
        -   The list of high-availability Clusters displays only clusters that contain at least one VM supporting registry scanning.
            
        -   The registry scanning status for each VM appears in brackets if it was previously activated for that specific VM.
            
        
        If the list does not display any Broker VMs or clusters, Add New Broker VM or Add New Cluster. For more details, see Set up and configure Broker VM.
        
    3.  Enter the Registry URL.
        
        Use the base URL of the Harbor registry. For example:
        
        `https://harbor.yourdomain.com`
        
        `https://harbor.yourdomain.com:8443` (with a specific port)
        
        Alternatively, if you are using a CA certificate, enter the server IP address instead of the registry URL. For example:
        
        `https://35.209.190.220`
        
        `https://35.210.190.225:8443` (with a custom port)
        
    4.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
        If you have configured a robot account for automated access, use the robot account’s username and secret/token as authentication credentials.
        
        For example: `docker login harbor.example.com -u 'robot$<your-robot-account-name>' -p '<your-robot-token>'`
        
    5.  (Optional) Expand Show advanced settings and then enter a custom CA certificate in PEM format for Cortex to validate the Harbor registry. Ensure that the Custom CA certificate that you use is not revoked by the issuing authority.
        
    6.  Select Next.
        
    
5.  In the Initial Scan Configuration, set your scanning process to focus on recently added or modified container images and exclude older ones that do not align with your current scanning objectives. This setting helps avoid unnecessary scans. Choose one of the following options:
    
    -   All: Scans all container images, including all versions (tags), in all discovered repositories.
        
    -   Latest Tag: Scans only images tagged **'latest'** in all discovered repositories.
        
    -   Days Modified: Scans container images that have been created in the last few days. You can select a range of up to **90** days for the scan.
        
    
6.  Select Save.
    
    When the Harbor data source is saved successfully, a new data connector is created, and the initial discovery scan begins. The connection process may take up to 15 minutes.
    
7.  To check connector status and scan results, follow these steps:
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  Find the Harbor instance from the list of 3rd Party Data Sources connectors, or use Search.
        
    3.  In the Harbor instance row, select View Details. The Harbor Instances page appears.
        
    4.  On the Harbor Instances page, you can filter results by any heading and value.
        
    5.  Select an instance name to open the details pane. The details pane contains the following granular information:
        
        | Instance Details | Description |
        | --- | --- |
        | Status | Shows the status of the connector: Connected, Error, Warning, Disabled, or Pending. |
        | Applet Status on Broker VM | Shows the status of the Registry Scanner applet on the Broker VM page. This status is visible only when the Scan with Broker VM mode is selected. |
        | Repositories | Shows the number of scanned repositories in the registry. |
        | Scan Mode | Shows the selected scan mode for the data connector, such as Cloud Scan, Scan with Outpost, or Scan with Broker VM. |
        | Security Capabilities | Shows a breakdown of the security capabilities enabled on the instance and their individual statuses. For example, select Registry Scanning when it shows a **warning** or **error status** to see the open errors and issues that contributed to the status. |
        
8.  **Next Steps**.
    
    After the scan is complete, you can view the scanned details on the Container Images Inventory page. For more details, see Container Images assets.
    
    If you have selected the Scan with Broker VM option, then a Registry Scanner applet is created on the selected Broker VM or Cluster. For details, see Verify Registry Scanner connection.

###### Manage a Harbor connector
After successfully adding a connector, you can modify the connector settings and configure the scanning scope to control which images are scanned in the connected registry.

To manage the connector, follow these steps:

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find the Harbor data source from the list of data sources, or use the filter to search.
    
3.  Select the Harbor row. A pane opens with a list of integration instances and their details.
    
    You can create a new instance by selecting Add Instance and following the onboarding wizard to define the settings.
    
4.  Right click an instance to perform actions on it as follows:
    
    | Action | Instructions |
    | --- | --- |
    | Edit | Edit the Harbor instance. \*\*Note:\*\* If you selected Scan with Broker VM mode, you can't change to a different scan mode (such as Cloud Discovery or Scan with Outpost) when you edit the instance.; When editing an instance configured for Scan with Broker VM, you must re-enter your authentication credentials, including Username, Password, and CA certificate. |
    | Exclude/Include images | Define conditions to automatically exclude or include specific images while scanning. Conditions can be based on Repository or Tags. These conditions apply automatically to newly discovered images in the account. |
    | Delete | Removes the connector. |
    | Disable | Stops image scanning for the connector without deleting it. |

##### Connect JFrog container registry
Cortex Cloud allows you to scan and secure your container images from vulnerabilities, malware, and secrets after you authenticate and connect your JFrog account. This process ensures robust artifact management and enhanced security.

How to connect JFrog

Follow the wizard to connect your JFrog Container Registry with Cortex Cloud.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Add Data Sources or Integrations page, click \+ Add New, search for JFrog, then hover over it and click Add.
    
3.  Select Image scanning to continue scanning your container images.
    
    If you want to enable Software Composition Analysis (SCA) scanning for your private packages, then select Package resolution for code scanning and refer to JFrog Artifactory for more details.
    
4.  The Instance Name is automatically populated. You can change it to a more meaningful name.
    
5.  Choose the Scan Mode, and then follow the steps provided for that mode to configure the connection.
    
    Cloud Scan
    
    Security scanning is done in the Cortex cloud environment when you select this mode.
    
    1.  Select the appropriate Cloud Provider and Region for the Cortex environment to use for registry scanning.
        
        As a best practice, choose the region closest to your registry deployment to achieve the best scanning throughput and potentially reduce cloud costs.
        
    2.  (Optional) Enable Allow access by IPs to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so the scanner can access the registry during the scanning process.
        
    3.  Choose the relevant Account Type for JFrog deployments:
        
        JFrog Cloud (Saas)
        
        1.  Enter your JFrog Account Name.
            
            For example, the scanner connects to `https://myaccount.jfrog.io`, where `<myaccount>` is your actual account name.
            
        2.  Under Authentication Method, enter your JFrog account credentials (Username and Password) for authentication.
            
        
        JFrog Self-Hosted
        
        1.  Enter the JFrog Artifactory URL as the Registry URL.
            
            For example, `https://artifactory.example.com/artifactory`, where `<artifactory.example.com>` is your server's domain or IP address.
            
        2.  Under Authentication Method, enter your JFrog user credentials (Username and Password) for authentication.
            
        3.  (Optional) Expand Show Advanced Settings, and then enter the CA certificate in PEM format for Cortex to validate the JFrog Artifactory registry.
            
        
    4.  Select Next.
        
    
    Scan with Outpost
    
    Security scanning is done on infrastructure deployed to a cloud account that you own. This mode requires additional cloud provider permissions and may incur extra costs.
    
    **Prerequisite:**
    
    Ensure an Outpost is connected to your tenant.
    
    1.  Choose a Cloud Provider to initialize registry scanning.
        
        **Note:**
        
        If you choose Azure as the Cloud Provider, you must also select the Tenant Id. The Tenant Id is required to approve Cortex as an enterprise application in your Azure tenant.
        
    2.  Choose Outpost account to use for this instance. If no Outposts are shown, you can Create a new one. For more details, see Outposts.
        
        **Note:**
        
        If you choose Azure as the cloud provider, only Outposts associated with the selected tenant ID are displayed.
        
    3.  Select the Region where the registry is hosted.
        
    4.  (Optional) Enable Allow access by IPs if you want to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so that the scanner can access the registry during the scanning process.
        
    5.  Choose the relevant Account Type for JFrog deployments:
        
        JFrog Cloud (Saas)
        
        1.  Enter your JFrog Account Name.
            
            For example, the scanner connects to `https://myaccount.jfrog.io`, where `<myaccount>` is your actual account name.
            
        2.  Under Authentication Method, enter your JFrog account credentials (Username and Password) for authentication.
            
        
        JFrog Self-Hosted
        
        1.  Enter the JFrog Artifactory URL as the Registry URL.
            
            For example, `https://artifactory.example.com/artifactory`, where `<artifactory.example.com>` is your server's domain or IP address.
            
        2.  Under Authentication Method, enter your JFrog user credentials (Username and Password) for authentication.
            
        3.  (Optional) Expand Show Advanced Settings, and then enter the custom CA certificate in PEM format for Cortex to validate the JFrog Artifactory registry.
            
        
    6.  Select Next.
        
    
    Scan with Broker VM
    
    Security scanning in private networks is done using broker VM infrastructure when you select this mode.
    
    **Prerequisite:**
    
    -   Set up and configure Broker VM
        
    -   Configure High Availability Cluster
        
    
    1.  Choose a Scan with Broker VM mode to initiate registry scanning. You can select either a standalone Broker VM or a High Availability (HA) Cluster.
        
    2.  Select Applicable Broker VMs.
        
        Choose the appropriate Broker VM or Cluster from the list configured in your tenant.
        
        **Note:**
        
        -   The list of Broker VMs displays only VMs that support registry scanning.
            
        -   The list of high-availability Clusters displays only clusters that contain at least one VM supporting registry scanning.
            
        -   The registry scanning status for each VM appears in brackets if it was previously activated for that specific VM.
            
        
        If the list does not display any Broker VMs or Clusters, Add New Broker VM or Add New Cluster. For more details, see Set up and configure Broker VM.
        
    3.  Choose the relevant Account Type for JFrog deployments:
        
        JFrog Cloud (Saas)
        
        1.  Enter your JFrog Account Name.
            
            For example, the scanner connects to `https://myaccount.jfrog.io`, where `<myaccount>` is your actual account name.
            
        2.  Under Authentication Method, enter your JFrog account credentials (Username and Password) for authentication.
            
        
        JFrog Self-Hosted
        
        1.  Enter the JFrog Artifactory URL as the Registry URL.
            
            For example, `https://artifactory.example.com/artifactory`, where `<artifactory.example.com>` is your server's domain or IP address.
            
        2.  Under Authentication Method, enter your JFrog user credentials (Username and Password) for authentication.
            
        3.  (Optional) Expand Show Advanced Settings.
            
            1.  Select Use insecure connection to pull images if you want to allow image pull from the registry over an HTTP connection instead of HTTPS.
                
            2.  Enter the CA certificate in PEM format for Cortex to validate the JFrog Artifactory registry.
                
            
        
    4.  Select Next.
        
    
6.  In Initial Scan Configuration, set your scanning process to focus on recently added or modified container images and exclude older ones that do not align with your current scanning objectives. This setting helps avoid unnecessary scans. Choose one of the following options:
    
    -   All: Scans all container images, including all versions (tags), in all discovered repositories.
        
    -   Latest Tag: Scans only images tagged 'latest' in all discovered repositories.
        
    -   Days Modified: Scans container images created or modified in the last few days. You can select a range of up to **90** days for the scan.
        
    
7.  Select Save.
    
    When the JFrog data source is saved successfully, a new data connector is created, and the initial discovery scan is started. The connection process may take up to 15 minutes.
    
8.  To check connector status and scan results, follow these steps:
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  Find the JFrog Artifactory instance from the list of 3rd Party Data Sources connectors, or use Search.
        
    3.  In the JFrog Artifactory instance row, select View Details. The JFrog Artifactory Instances page appears.
        
    4.  On the JFrog Artifactory Instances page, you can filter results by any heading and value.
        
    5.  Select an instance name to open the details pane. The details pane contains the following granular information:
        
        | Instance Details | Description |
        | --- | --- |
        | Status | Shows the status of the connector: Connected, Error, Warning, Disabled, or Pending. |
        | Applet Status on Broker VM | Shows the status of the Registry Scanner applet on the Broker VM page. This status is visible only when the Scan with Broker VM mode is selected. |
        | Repositories | Shows the number of scanned repositories in the registry. |
        | Scan Mode | Shows the selected scan mode for the data connector, such as Cloud Scan, Scan with Outpost, or Scan with Broker VM. |
        | Security Capabilities | Shows a breakdown of the security capabilities enabled on the instance and their individual statuses. For example, select Registry Scanning when it shows a warning or error status to see the open errors and issues that contributed to the status. |
        
9.  **Next Steps**.
    
    -   After the scan is complete, you can view the list of scanned images on the Container Images Inventory page. For more details, see Container Image assets.
        
    -   If you have selected the Scan with Broker VM option, then a Registry Scanner applet is created on the selected Broker VM or Cluster. For details, see Verify Registry Scanner connection.

###### Manage a JFrog connector
After you add a JFrog connector, you can modify the connector settings and configure the scanning scope to control which images are scanned in the connected registry.

To manage the connector, follow these steps:

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Find the JFrog integration from the list of data sources, or use the filter to search.
    
3.  Select the JFrog row. A pane opens with a list of integration instances and their details.
    
    You can create a new instance by selecting Add Instance and following the onboarding wizard to define the settings.Connect Docker V2 compliant container registry
    
4.  Right click an instance to perform actions on it as follows:
    
    | Action | Instructions |
    | --- | --- |
    | Edit | Edit the JFrog Artifactory instance. \*\*Note:\*\* If you selected Scan with Broker VM mode, you can't change to a different scan mode (such as Cloud Discovery or Scan with Outpost) when you edit the instance.; When editing an instance configured for Scan with Broker VM, you must re-enter your authentication credentials, including Username, Password, and CA certificate. |
    | Exclude/Include images | Define conditions to automatically exclude or include specific images while scanning. Conditions can be based on Repository or Tags. These conditions apply automatically to newly discovered images in the account. |
    | Delete | Removes the connector. |
    | Disable | Stops image scanning for the connector without deleting it. |

##### Connect Sonatype Nexus registry
Configure Cortex Cloud to scan your Nexus Registry. This allows Cortex to list all container registries or images, and secure them from vulnerabilities, malware, and secrets.

How to connect Nexus registry

Follow the wizard to use the Sonatype Nexus registry connector in Cortex Cloud.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Add Data Sources or Integrations page, click \+ Add New, search for Sonatype, then hover over it and click Add.
    
3.  The Instance Name is automatically populated. You can change it to a more meaningful name.
    
4.  Choose the Scan Mode, and then follow the steps for that mode to configure the connection.
    
    Cloud Scan
    
    Security scanning is done in the Cortex cloud environment when you select this mode.
    
    1.  Select the appropriate Cloud Provider and Region for the Cortex environment to use for registry scanning.
        
        As a best practice, choose the region closest to your registry deployment to achieve the best scanning throughput and potentially reduce cloud costs
        
    2.  (Optional) Enable Allow access by IP’s to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so the scanner can access the registry during the scanning process.
        
    3.  Enter the Registry URL.
        
        Enter the hostname, or Fully Qualified Domain Name (FQDN), and the connector port for the Nexus registry’s login server in the following format:
        
        https://`<hostname>:<connector_port>` ,
        
        `<hostname>`— unique name assigned when the Nexus registry was created
        
        `<connector_port>`— https connector for the specific Nexus repository.
        
        For example:
        
        `https://ec2-100-25-223-135.compute-1.amazonaws.com:8083`
        
        `https://35.209.190.220:8084`
        
        **Note:**
        
        If you are using a CA certificate, enter the server IP address instead of the registry url.
        
    4.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
    5.  (Optional) Expand Show advanced settings and then enter a custom CA certificate in PEM format for Cortex to validate the Nexus registry.
        
    6.  Select Next.
        
    
    Scan with Outpost
    
    Security scanning is done on infrastructure deployed to a cloud account that you own. This mode requires additional cloud provider permissions and may incur extra costs.
    
    **Prerequisite:**
    
    Ensure an Outpost is connected to your tenant. Outposts
    
    1.  Choose a Cloud Provider to initialize registry scanning.
        
        **Note:**
        
        If you choose Azure as the Cloud Provider, you must also select the Tenant Id. The Tenant Id is required to approve Cortex as an enterprise application in your Azure tenant.
        
    2.  Choose Outpost account to use for this instance. If no Outposts are shown, you can Create a new one. For more details, see Outposts.
        
        **Note:**
        
        If you choose Azure as the cloud provider, only Outposts associated with the selected tenant ID are displayed.
        
    3.  Select the Region where the registry is hosted.
        
    4.  (Optional) Enable Allow access by IP’s if you want to specify a static IP address for the scanner to use. Make sure the static IP is allowed through your firewall so that the scanner can access the registry during the scanning process.
        
    5.  Enter the Registry URL.
        
        Enter the hostname, or Fully Qualified Domain Name (FQDN), and the connector port for the Nexus registry’s login server in the following format:
        
        `<https://<hostname>:<connector_port>`.
        
        `<hostname>`— unique name assigned when the registry was created.
        
        `<connector_port>`— https connector for the specific Nexus repository.
        
        For example:
        
        `https://ec2-100-25-223-135.compute-1.amazonaws.com:8083`
        
        `https://35.209.190.220:8084`
        
        **Note:**
        
        If you are using a CA certificate, enter the server IP address instead of the registry URL.
        
    6.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
    7.  (Optional) Expand Show advanced settings and then enter a custom CA certificate in PEM format for Cortex to validate the Nexus registry.
        
    8.  Select Next.
        
    
    Scan with Broker VM
    
    Security scanning in private networks is done using broker VM infrastructure when you select this mode.
    
    **Prerequisite:**
    
    Ensure one of the following is configured:
    
    -   Set up and configure Broker VM.
        
    -   Configure High Availability Cluster.
        
    
    1.  Choose a Scan with Broker VM mode to initiate registry scanning. You can select either a standalone Broker VM or a High Availability (HA) Cluster.
        
    2.  Select Applicable Broker VMs.
        
        Choose the appropriate Broker VM or Cluster from the list configured in your tenant.
        
        **Note:**
        
        -   The list of Broker VMs displays only VMs that support registry scanning.
            
        -   The list of high-availability Clusters displays only clusters that contain at least one VM supporting registry scanning.
            
        -   The registry scanning status for each VM appears in brackets if it was previously activated for that specific VM.
            
        
        If the list does not display any Broker VMs or clusters, Add New Broker VM or Add New Cluster. For more details, see Set up and configure Broker VM.
        
    3.  Enter the Registry URL.
        
        Enter the hostname, or Fully Qualified Domain Name (FQDN), and the connector port for the Nexus registry’s login server in the following format:
        
        `<https://<hostname>:<connector_port>`
        
        `<hostname>`— unique name assigned when the registry was created.
        
        `<connector_port>`— https connector for the specific Nexus repository.
        
        For example:
        
        `https://ec2-100-25-223-135.compute-1.amazonaws.com`
        
        `https://35.209.190.220:8084`
        
        **Note:**
        
        If you are using a CA certificate, enter the server IP address instead of the registry URL.
        
    4.  Under Authentication Method, enter the Username and Password of the registry that you want to connect.
        
    5.  (Optional) Expand Show advanced settings and then enter a custom CA certificate in PEM format for Cortex to validate the Nexus registry.
        
    6.  Select Next.
        
    
5.  In the Initial Scan Configuration, set your scanning process to focus on recently added or modified container images and exclude older ones that do not align with your current scanning objectives. This setting helps avoid unnecessary scans. Choose one of the following options:
    
    -   All: Scans all container images, including all versions (tags), in all discovered repositories.
        
    -   Latest Tag: Scans only images tagged **'latest'** in all discovered repositories.
        
    -   Days Modified: Scans container images that have been created in the last few days. You can select a range of up to **90** days for the scan.
        
    
6.  Select Save.
    
    When the Sonatype data source is saved successfully, a new data connector is created, and the initial discovery scan begins. The connection process may take up to 15 minutes.
    
7.  To check the connector status and scan results, follow these steps:
    
    1.  Go to Settings → Data Sources & Integrations.
        
    2.  Find the Sonatype instance from the list of 3rd Party Data Sources connectors, or use Search.
        
    3.  In the Sonatype instance row, select View Details. The Sonatype Instances page appears.
        
    4.  On the Sonatype Instances page, you can filter results by any heading and value.
        
    5.  Select an instance name to open the details pane. The details pane contains the following granular information:
        
        | Instance Details | Description |
        | --- | --- |
        | Status | Shows the status of the connector: Connected, Error, Warning, Disabled, or Pending. |
        | Applet Status on Broker VM | Shows the status of the Registry Scanner applet on the Broker VM page. This status is visible only when the Scan with Broker VM mode is selected. |
        | Repositories | Shows the number of scanned repositories in the registry. |
        | Scan Mode | Shows the selected scan mode for the data connector, such as Cloud Scan, Scan with Outpost, or Scan with Broker VM. |
        | Security Capabilities | Shows a breakdown of the security capabilities enabled on the instance and their individual statuses. For example, select Registry Scanning when it shows a warning or error status to see the open errors and issues that contributed to the status. |
        
8.  **Next Steps**.
    
    -   After the scan is complete, you can view the list of scanned images on the Container Images Inventory page. For more details, see Container Images assets.
        
    -   If you have selected the Scan with Broker VM option, then a Registry Scanner applet is created on the selected Broker VM or Cluster. For details, see Verify Registry Scanner connection.

###### Manage a Sonatype connector
After you add a Sonatype connector, you can modify the connector settings and configure the scanning scope to control which images are scanned in the connected registry.

To manage the connector, follow these steps:

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  Select the Sonatype data source from the list of data sources, or filter to search.
    
3.  Select the Sonatype row. A pane opens with a list of integration instances and their details.
    
    You can create a new instance by selecting Add Instance and following the onboarding wizard to define the settings.
    
4.  Right click an instance to perform actions on it as follows:
    
    | Action | Instructions |
    | --- | --- |
    | Edit | Edit the Sonatype instance. \*\*Note:\*\* If you had selected Scan with Broker VM mode, you can't change to a different scan mode (such as Cloud Discovery or Scan with Outpost) when you edit the instance.; When editing an instance configured for Scan with Broker VM, you must re-enter your authentication credentials, including Username, Password, and CA certificate. |
    | Exclude/Include images | Define conditions to automatically include or exclude specific images while scanning. Conditions can be based on Repository or Tags. These conditions apply automatically to newly discovered images in the account. |
    | Delete | Removes the connector. |
    | Disable | Stops image scanning for the connector without deleting it. |

#### Cloud service provider permissions

Grant the correct cloud service provider permissions for Cortex Cloud.

When you set up Cortex Cloud to collect data from your cloud environments, the onboarding wizard will ensure that the correct permissions are granted for Cortex Cloud. The following tables list the permissions required for each of the options available in the onboarding wizards.

Review the permissions required for each cloud service provider:

-   Amazon Web Services
    
-   Google Cloud Platform
    
-   Microsoft Azure
    
-   Oracle Cloud Infrastructure

##### Amazon Web Services provider permissions

List of Amazon Web Services provider permissions for Cortex Cloud.

When onboarding Amazon Web Services, Cortex Cloud creates an authentication template that requests the permissions needed for monitoring your cloud environment. Depending on which security capabilities you select in the onboarding wizard, different permissions are requested. The following tables are organized by security module and list the CSP permissions being requested as well as the purpose (and where relevant, the scope):

-   Agentless Disk Scanning
    
-   DSPM
    
-   Discovery Engine
    
-   Registry Scan
    
-   Log Collection
    
-   Automations
    
-   Serverless Scan
    
-   Outposts
    

Agentless Disk Scanning

| Permission | Scope | Purpose |
| --- | --- | --- |
| ec2:CopyImage | Images created with managed_by: `paloaltonetworks` tag | Create disk from Image |
| ec2:CopySnapshot | Snapshots copied with managed_by: `paloaltonetworks` tag | Re-encrypt snapshot with Palo Alto Network's KMS key |
| ec2:CreateSnapshot | Snapshots created with managed_by: `paloaltonetworks` tag | Create disk snapshot |
| ec2:CreateTags | Only as part of CopyImage, CreateSnapshot and CopySnapshot operations | Add tags for permission scoping and cost visibility |
| ec2:DeleteSnapshot | Snapshots with managed_by: `paloaltonetworks` tag | Delete scanned snapshot |
| ec2:DeregisterImage | Images with managed_by: `paloaltonetworks` tag | Delete ephemeral re-encrypted image |
| ec2:DescribeImages | Images with managed_by: `paloaltonetworks` tag | Retrieve image creation status |
| ec2:DescribeSnapshots | Snapshots with managed_by: `paloaltonetworks` tag | Retrieve snapshot creation status |
| ec2:ModifySnapshotAttribute | Snapshots with managed_by: `paloaltonetworks` tag; The snapshots can be shared only with the outpost account | Share snapshot with the outpost account |
| kms:CreateGrant | Palo Alto Network's and customer KMS keys; Only EC2 services can use this permission | Create a new grant for a customer master key (CMK), such as to allow the re-encrypt operation |
| kms:DescribeKey | Palo Alto Network's KMS key; Only EC2 services can use this permission | Retrieve detailed information about a customer master key (CMK), such as to allow and support a re-encrypt operation |
| kms:GenerateDataKeyWithoutPlaintext | Palo Alto Network's KMS key; Only EC2 services can use this permission | Generate a data key for client-side encryption, such as to allow and support a re-encrypt operation |

DSPM

| Permission | Scope | Purpose |
| --- | --- | --- |
| arn:aws:iam::aws:policy/AmazonMemoryDBReadOnlyAccess | All DynamoDB resources in the account | Grant read-only access to the MemoryDB resources |
| cloudwatch:GetMetricStatistics | All DynamoDB tables in the account | Get usage statistics, which are used to ensure that classification processes do not interfere with production environments |
| dynamodb:DescribeTable | All DynamoDB tables in the account | Get information about DynamoDB tables in the account |
| dynamodb:Scan | All DynamoDB tables in the account | Access data in DynamoDB tables in the account for performing environment-wide discovery and data classification, ensuring no assets are left unmonitored |
| iam:PassRole | Palo Alto Networks scanner role | Create export tasks for RDS snapshots |
| kms:CreateGrant | KMS keys in the account | Enable the created EC2 instance to send a CreateGrant request to the AWS KMS for a customer master key (CMK) so that it, for example, can share an encrypted snapshot with an outpost account (re-encryption) |
| kms:DescribeKey | KMS keys in the account | Retrieve detailed information about a customer master key (CMK), such as to allow and support a re-encrypt operation |
| kms:GenerateDataKeyWithoutPlaintext | AWS account | Generate a data key for client-side encryption, such as encrypting a created snapshot |
| rds:AddTagsToResource | All RDS database instances and clusters in the account | Create unique tags for the created RDS resourceCreateDBSnapshots in order to find them at a later stage. This permission is needed for performing environment-wide discovery and data classification, ensuring no assets are left unmonitored. |
| rds:CancelExportTask | All RDS database instances and clusters in the account | Cancel export tasks in case of failure or termination of the classification process. This permission is needed for performing environment-wide discovery and data classification, ensuring no assets are left unmonitored. |
| rds:CreateDBClusterSnapshot | All RDS database instances and clusters in the account | Create a snapshot for the RDS clusters that need to be scanned at a later stage. This permission is needed for performing environment-wide discovery and data classification, ensuring no assets are left unmonitored. |
| rds:CreateDBSnapshot | All RDS database instances and clusters in the account | Create a snapshot for the RDS instances that need to be scanned at a later stage. This permission is needed for performing environment-wide discovery and data classification, ensuring no assets are left unmonitored. |
| rds:DeleteDBSnapshot | Snapshots created by Palo Alto Networks | Delete snapshots created as part of the classification process |
| rds:Describe\* | All RDS database instances and clusters in the account | Describe permissions to enable Palo Alto Networks to get metadata information on the RDS instance |
| rds:List\* | All RDS database instances and clusters in the account | List permissions to enable Palo Alto Networks to understand which instances and snapshots exist in the account |
| rds:StartExportTask | All RDS database instances and clusters in the account | Export data from the snapshots to an S3 bucket |
| s3:DeleteObject\* | Buckets created by Palo Alto Networks | Delete stale objects that were created |
| s3:Get\* | All S3 buckets in the account | Enable Palo Alto Networks to read data within S3 buckets |
| s3:List\* | All S3 buckets in the account | Allow the listing of all S3 objects |
| s3:PutObject\* | Buckets created by Palo Alto Networks | Write data to an object in Palo Alto Networks’ bucket to export data from the RDS instances |

Discovery Engine

| Permission | Purpose |
| --- | --- |
| apigateway:GetDomainNames | Retrieve API Gateway custom domain names |
| arn:aws:iam::aws:policy/AmazonSQSReadOnlyAccess | Grant read-only access to Amazon Simple Queue Service (SQS), allowing the retrieval of SQS queue attributes, messages, and configurations |
| arn:aws:iam::aws:policy/AWSOrganizationsReadOnlyAccess | Grant read-only access to AWS organizations, allowing the ability to list and view configurations, metadata, and logs across AWS organizations |
| arn:aws:iam::aws:policy/ReadOnlyAccess | Grant read-only access to AWS services and resources, allowing the ability to list and view configurations, metadata, and logs across AWS resources |
| arn:aws:iam::aws:policy/SecurityAudit | Grant access to read security configuration metadata, allowing users to inspect IAM configurations, security policies, CloudTrail logs, and other security-relevant settings |
| bedrock-agent:GetAgents | Retrieve details of Bedrock agents |
| bedrock-agent:GetDataSource | Retrieve details of a specific data source |
| bedrock-agent:GetKnowledgeBases | Retrieve details of knowledge bases |
| bedrock-agent:ListAgentAliases | List aliases associated with an agent |
| bedrock-agent:ListAgentKnowledgeBases | List knowledge bases linked to agents |
| bedrock-agent:ListAgents | List all Bedrock agents |
| bedrock-agent:ListDataSource | List available data sources |
| bedrock:ListCustomModel | List custom AI models in Amazon Bedrock |
| cloudcontrolapi:GetResource | Retrieve the state of an AWS resource managed via the Cloud Control API |
| cloudformation:AmazonCloudFormation | General permission related to CloudFormation resource management |
| cloudformation:StackStatus | Retrieve the status of CloudFormation stacks |
| cloudformation:StackSummary | Provide a summary of CloudFormation stacks |
| cloudwatch:describeAlarms | Describe all alarms currently owned by the user's account |
| comprehendmedical:ListEntitiesDetectionV2Jobs | List entity detection jobs in Comprehend Medical |
| configservice:DescribeDeliveryChannels | Retrieve details of AWS Config delivery channels |
| connect-campaigns:DescribeCampaign | Describe a specific campaign |
| connect-campaigns:ListCampaigns | Provide a summary of all campaigns |
| controltower:ListLandingZones | List landing zones for AWS Control Tower |
| controltower:ListTagsForResource | List tags for AWS Control Tower resources |
| DirectConnect:\* | Enable all GET permissions for AWS Direct Connect |
| DirectConnect:DescribeConnections | List Direct Connect connections and their attributes |
| DirectConnect:DescribeDirectConnectGateways | Retrieve details about Direct Connect gateway |
| DirectConnect:DescribeVirtualInterfaces | Display all virtual interfaces for an AWS account |
| DS:DescribeDirectories | Grant read access to directory details in AWS Directory Service |
| DS:ListTagsForResource | List tags associated with a specific AWS Directory Service resource |
| elasticfilesystem:DescribeFileSystemPolicy | Retrieve policies associated with an EFS file system |
| elasticloadbalancingv2:DescribeSSLPolicies | Retrieve details of ELB SSL policies |
| forecast:ListTagsForResource | List tags associated with an Amazon Forecast resource |
| glue:GetConnections | List connection configurations for AWS Glue |
| glue:GetResourcePolicies | Retrieve Glue Data Catalog policies |
| Glue:GetSecurityConfigurations | Retrieve security configurations for AWS Glue |
| iam:AmazonIdentityManagement | General IAM access for identity and access management |
| iam:AttachedPolicy | Retrieve policies attached to IAM identities |
| iam:PolicyRole | List IAM roles associated with a policy |
| iam:RoleDetail | Retrieve detailed information about IAM roles |
| lakeformation:\* | Enable all GET permissions for AWS Lake Formation |
| memorydb:DescribeSnapshots | Retrieve information about cluster snapshots |
| memorydb:DescribeSubnetGroups | Retrieve a list of subnet group |
| opensearchserverless:ListCollections | List collections in OpenSearch Serverless |
| s3-control:GetAccessPointPolicy | Retrieve an S3 access point policy |
| s3-control:GetAccessPointPolicyStatus | Retrieve the status of an access point policy |
| s3-control:GetPublicAccessBlock | Retrieve the public access block configuration for an account |
| s3-control:ListAccessPoints | List S3 access points that are owned by the current account that's associated with the specified bucket |
| servicecatalog-appregistry:ListApplications | List applications in AWS AppRegistry |
| servicecatalog-appregistry:ListAttributeGroups | List attribute groups in AppRegistry |
| workspaces:\* | Enable all GET permissions for Amazon WorkSpaces |
| WorkSpaces:DescribeTags | List tags associated with WorkSpaces resources |
| WorkSpaces:DescribeWorkspaceDirectories | Retrieve details about WorkSpaces directories |
| WorkSpaces:DescribeWorkspaces | List and describe WorkSpaces instances |

Registry Scan

| Permission | Scope | Purpose |
| --- | --- | --- |
| ecr:BatchGetImage | All ECR images in the account | Get detailed information for an image, required to pull the image |
| ecr:GetDownloadUrlForLayer | All ECR images in the account | Used in the process of pulling images, to fetch the URL for the various layers that make up the image |
| ecr:GetAuthorizationToken | All ECR images in the account | Used to create a login token for pulling images from ECR |

Log Collection

| Permission | Scope | Purpose |
| --- | --- | --- |
| kms:Decrypt | The specific KMS key used for CloudTrail encryption in the current account and region | Decrypt ciphertext using a customer master key (CMK) |
| s3:GetObject | The Cortex CloudTrail logs S3 bucket and its objects | Grant permission to download objects from the configured S3 bucket |
| s3:ListBucket | The Cortex CloudTrail logs S3 bucket and its objects | Grant permission to see the specific bucket |
| sqs:ChangeMessageVisibility | The specific Cortex CloudTrail logs SQS queue | Manage log message visibility during processing, such as to extend processing time for log messages to prevent timeouts |
| sqs:DeleteMessage | The specific Cortex CloudTrail logs SQS queue | Grant permission to delete consumed messages, preventing re-processing of the same message |
| sqs:GetQueueAttributes | The specific Cortex CloudTrail logs SQS queue | Grant permission to retrieve SQS queue attributes, used for metrics and monitoring |
| sqs:ReceiveMessage | The specific Cortex CloudTrail logs SQS queue | Grant permission to consume messages from the SQS queue to receive bucket notification messages |

Automations

Retrieve configuration details and metadata for a Lambda function R and downloads the source code

| Permission | Command that requires this permission | Purpose |
| --- | --- | --- |
| acm:UpdateCertificateOptions | aws-acm-certificate-options-update | Update the options for a specified ACM certificate |
| elasticloadbalancing:ModifyLoadBalancerAttributes | aws-elb-load-balancer-attributes-modify | Modify the attributes of a specified load balancer |
| rds:AddTagsToResource |  | Add unique tags to a specific Amazon RDS resource, such as to find them at a later stage |
| rds:CreateTenantDatabase |  | Create a new tenant database within a RDS DB instance |
| rds:ModifyDBCluster | aws-rds-db-cluster-modify | Modify a DB cluster for remediation of an issue detected due to the rule: AWS RDS DB Cluster Publicly Accessible |
| rds:ModifyDBClusterSnapshotAttribute | aws-rds-db-cluster-snapshot-attribute-modify | Modify DB cluster snapshot attributes for remediation of an issue detected due to the rule: AWS RDS DB Cluster Snapshot Publicly Accessible |
| rds:ModifyDBInstance | aws-rds-db-instance-modify | Modify a DB instance for remediation of an issue detected due to the rule: AWS RDS DB Instance Publicly Accessible |
| rds:ModifyDBSnapshotAttribute | aws-rds-db-snapshot-attribute-modify | Modify DB snapshot attributes for remediation of an issue detected due to the rule: AWS RDS DB Snapshot Publicly Accessible |
| rds:ModifyEventSubscription | aws-rds-event-subscription-modify | Modify an existing RDS event subscription |
| s3:PutBucketAcl | aws-s3-bucket-acl-put | Block public ACLs for remediation of an issue detected due to the rule: S3 Bucket Public Read Access. By applying a different policy, the permission can be used to explicitly deny public access or removes public access entirely. |
| s3:PutBucketLogging | aws-s3-bucket-logging-put | Configure server access logging for remediation of an issue detected due to the rule: AWS S3 Bucket Logging Disabled |
| s3:PutBucketPolicy | aws-s3-bucket-policy-put | Block public policy for remediation of an issue detected due to the rule: S3 Bucket Policy Public Access |
| s3:PutBucketPublicAccessBlock | aws-s3-public-access-block-update | Block public access for remediation of an issue detected due to the rule: AWS S3 Bucket Public Access Block Disabled |
| s3:PutBucketVersioning | aws-s3-bucket-versioning-put | Enable versioning for remediation of an issue detected due to the rule: AWS S3 Bucket Versioning Disabled |
| s3:GetBucketPolicy | aws-s3-bucket-policy-get | Retrieve the resource-based access policy attached to an Amazon S3 bucket |
| s3:GetBucketPublicAccessBlock | aws-s3-public-access-block-get | Block public access for remediation of an issue detected due to the rule: AWS S3 Bucket Public Access Block Disabled |
| s3:GetEncryptionConfiguration | aws-s3-bucket-encryption-get | Retrieve the default server-side encryption settings applied to a bucket |
| s3:DeleteBucketPolicy | aws-s3-bucket-policy-delete | Remove the entire access policy associated with a bucket |
| s3:PutObject | aws-s3-file-upload | Upload a new object or replace an existing object within a bucket |
| s3:GetObject | aws-s3-file-download | Download an object from a bucket |
| s3:GetBucketWebsite | aws-s3-bucket-website-get | Retrieve of the configuration details for static website hosting on a bucket |
| s3:GetBucketAcl | aws-s3-bucket-acl-get | Retrieve of the Access Control List (ACL) that controls access to a bucket |
| s3:DeleteBucketWebsite | aws-s3-bucket-website-delete | Remove the static website configuration from a bucket |
| s3:PutBucketOwnershipControls | aws-s3-bucket-ownership-controls-put | Define and enforce the ownership controls configuration for a bucket |
| ec2:AuthorizeSecurityGroupIngress | aws-ec2-security-group-ingress-authorize | Allow inbound network access for remediation of an issue detected due to the rule: AWS EC2 Security Group with Ingress Rule Not Authorized |
| ec2:ModifyImageAttribute | aws-ec2-image-attribute-modify | Revoke image launch permissions for remediation of an issue detected due to the rule: AWS EC2 AMI Publicly Accessible |
| ec2:ModifyInstanceAttribute | aws-ec2-instance-attribute-modify | Disassociate a security group for mitigation of an issue detected due to the rule: AWS EC2 instance with network path from the internet (0.0.0.0/0) |
| ec2:ModifyInstanceMetadataOptions | aws-ec2-instance-metadata-options-modify | Modify EC2 instance metadata options for remediation of an issue detected due to the rule: AWS EC2 Instance Not Using IMDSv2 |
| ec2:ModifySnapshotAttribute | aws-ec2-snapshot-attribute-modify | Revoke snapshot restore permissions for remediation of an issue detected due to the rule: AWS EC2 Snapshot Publicly Accessible |
| ec2:RevokeSecurityGroupEgress | aws-ec2-security-group-egress-revoke | Block outbound traffic for remediation of an issue detected due to the rule: AWS EC2 instance with network path to the internet (0.0.0.0/0) |
| ec2:RevokeSecurityGroupIngress | aws-ec2-security-group-ingress-revoke | Block inbound network access for remediation of an issue detected due to the rule: AWS EC2 instance with network path from the internet (0.0.0.0/0) |
| ec2:CreateSecurityGroup | aws-ec2-security-group-create | Create a new network security group |
| ec2:DeleteSecurityGroup | aws-ec2-security-group-delete | Delete an existing network security group |
| ec2:DescribeSecurityGroups | aws-ec2-security-groups-describe | Retrieve information about the security groups in the account |
| ec2:DescribeInstances | aws-ec2-instances-describe | Retrieve information about the EC2 instances in the account |
| ec2:AuthorizeSecurityGroupEgress |  | Authorize outbound network access for a security group |
| ec2:StartInstances | aws-ec2-instances-start | Start one or more stopped EC2 instances |
| ec2:StopInstances | aws-ec2-instances-stop | Stop one or more stopped EC2 instances |
| ec2:TerminateInstances | aws-ec2-instances-terminate | Terminate one or more running EC2 instances |
| ec2:RunInstances | aws-ec2-instances-run | Running (launch) a new EC2 instance |
| ec2:CreateTags | aws-ec2-tags-create | Add tags for an EC2 instance |
| ec2:CreateSnapshot | aws-ec2-snapshot-create | Create a point-in-time snapshot of an EBS volume/disk |
| ec2:DescribeVpcs | aws-ec2-vpcs-describe | Retrieve information about the VPCs in the account |
| ec2:DescribeSubnets | aws-ec2-subnets-describe | Retrieve information about the subnets in the account |
| ec2:DescribeIpamResourceDiscoveries | aws-ec2-ipam-resource-discoveries-describe | Retrieve details about IPAM resource discovery configurations |
| ec2:DescribeIpamResourceDiscoveryAssociations | aws-ec2-ipam-resource-discovery-associations-describe | Retrieve details about associations between IPAM and resource discoveries |
| ec2:DescribeImages | aws-ec2-latest-ami-get | Retrieve information about AMIs or container images |
| ec2:CreateNetworkAcl | aws-ec2-network-acl-create | Create a new network access control list (ACL) |
| ec2:GetIpamDiscoveredPublicAddresses | aws-ec2-ipam-discovered-public-addresses-get | Retrieve discovered public IP addresses from IPAM |
| ec2:ModifySubnetAttribute | aws-ec2-subnet-attribute-modify | Modify a specific attribute of a subnet |
| cloudtrail:UpdateTrail | aws-cloudtrail-trail-update | Disable CloudTrail log file validation for remediation of an issue detected due to the rule: AWS CloudTrail Log File Validation Disabled |
| cloudtrail:StartLogging | aws-cloudtrail-logging-start | Start logging for remediation of an issue detected due to the rule: AWS CloudTrail Logging Stopped |
| cloudtrail:DescribeTrails | aws-cloudtrail-trails-describe | Retrieve information about the trails configured in CloudTrail |
| eks:UpdateClusterConfig | aws-eks-cluster-config-update | Update EKS cluster configuration for remediation of an issue detected due to the rule: AWS EKS Cluster Public Access Enabled |
| eks:DescribeCluster | aws-eks-cluster-describe | Retrieve detailed information about a specific EKS cluster |
| eks:AssociateAccessPolicy | aws-eks-access-policy-associate | Associatie an access policy with an EKS cluster |
| ecs:UpdateClusterSettings | aws-ecs-cluster-settings-update | Modifiy the settings for an existing ECS cluster |
| iam:DeleteLoginProfile | aws-iam-login-profile-delete | Delete a login profile for remediation of an issue detected due to the rule: AWS IAM User with Active Console Password |
| iam:GetAccountAuthorizationDetails |  | Retrieve information about all IAM users, roles, policies, and groups in the account |
| iam:GetAccountPasswordPolicy | aws-iam-account-password-policy-get | Get account password policy for investigation of an issue detected due to the rule: AWS IAM Account Password Policy Not Configured |
| iam:PassRole |  | Pass an IAM role to an AWS service by an entity |
| iam:PutUserPolicy | aws-iam-user-policy-put | Suspend access for user for mitigation of an issue detected due to the rule: AWS IAM Users with Administrator Access Permissions |
| iam:RemoveRoleFromInstanceProfile | aws-iam-role-from-instance-profile-remove | Remove role from instance profile for remediation of an issue detected due to the rule: AWS EC2 with IAM instance profile |
| iam:UpdateAccessKey | aws-iam-access-key-update | Deactivate access key for remediation of an issue detected due to the rule: AWS IAM User Active Access Keys Unused for 90 days |
| iam:UpdateAccountPasswordPolicy | aws-iam-account-password-policy-update | Configure account password policy for remediation of an issue detected due to the rule: AWS IAM Account Password Policy Not Configured |
| kms:CreateGrant |  | Enable the created EC2 instance to send a CreateGrant request to the AWS KMS so that it can share the encrypted snapshot, such as with an outpost account (re-encryption) |
| kms:Decrypt |  | Decrypt ciphertext using a customer master key (CMK) |
| kms:DescribeKey |  | Retrieve detailed information about a customer master key (CMK) |
| kms:GenerateDataKey |  | Generate a data key for client-side encryption |
| kms:EnableKeyRotation | aws-kms-key-rotation-enable | Activate automatic rotation for a customer master key (CMK) |
| lambda:GetFunctionConfiguration |  | Retrieve the configuration details for a Lambda function |
| lambda:GetFunctionUrlConfig | aws-lambda-function-url-config-get | Retrieve the configuration details for a Lambda function URL |
| lambda:GetPolicy | aws-lambda-policy-get | Retrieve the access policy associated with a Lambda function |
| lambda:InvokeFunction | aws-lambda-invoke | Execute a specified Lambda function |
| lambda:UpdateFunctionUrlConfig | aws-lambda-function-url-config-update | Update the configuration details for a Lambda function URL |
| secretsmanager:CreateSecret |  | Create a new secret in Secrets Manager |
| secretsmanager:RotateSecret |  | Set up or initiate rotation for a secret |
| secretsmanager:TagResource |  | Add tags to a secret or resource in Secrets Manager |
| ce:GetCostAndUsage |  | Retrieve detailed cost and usage data for the account |
| ce:GetCostForecast |  | Retrieve a forecast of future costs and usage |
| budgets:DescribeBudgets |  | Retrieve the configured budgets for the account |
| budgets:DescribeNotificationsForBudget |  | Retrieve the notification details associated with a specific budget |

Serverless Scan

| Permission | Scope | Purpose |
| --- | --- | --- |
| lambda:GetFunction | All Lambda functions in the account | View the configuration and metadata of a specific Lambda function and download the source code |
| lambda:GetFunctionConfiguration | All Lambda functions in the account | View only the configuration of a specific Lambda function |
| lambda:GetLayerVersion | All Lambda layers in the account | View the details of a specific version of a Lambda layer and download their source code |
| iam:GetRole | All IAM roles in the account | View details of a specific IAM role and assume the role of the monitored account from an outpost |

Outposts

| **Permission** | **Scope** | **Purpose** |
| --- | --- | --- |
| ec2:AllocateAddress | Resources with the request tag: `managed_by: paloaltonetworks` | Allocate a static public IP address for use with a proxy VM |
| ec2:AssociateAddress | Resources with the request tag: `managed_by: paloaltonetworks` | Associate a static public IP address with a network interface for use with a proxy VM |
| ec2:AttachVolume | Volumes in the specified AWS account with the `managed_by: paloaltonetworks` | Attach volume to scanner VM during deployment |
| ec2:CreateNetworkInterface | Any region in the specified AWS account with the tag `managed_by: paloaltonetworks`; applies to network interfaces, subnets, and security groups. | Create a network interface for a scanner or proxy VM within managed subnets and security groups |
| ec2:CreateTags | Resources with the request tag: managed_by: `paloaltonetworks` tag | For adding tags to all resources |
| ec2:CreateVolume | Volumes with the request tag: managed_by: `paloaltonetworks` tag | Perform the create volume operation in EC2 |
| ec2:CreateVpcEndpoint | The VPC endpoint being created must: Have the request tag: `managed_by: paloaltonetworks`; Only reference Palo Alto Networks-managed network components (VPCs, security groups, subnets, and route tables, and so on, with the request tag: `managed_by: paloaltonetworks`); Connect to an approved VpceServiceName service as defined by policy | Create endpoints that are used by scanners to access managed services using private IP addresses |
| ec2:DeleteNetworkInterface | Network interfaces with the request resource tag: `managed_by: paloaltonetworks` | Perform the delete network interface operation in EC2 |
| ec2:DeleteVolume | Volumes in the specified account with the request tag: `managed_by: paloaltonetworks` | Perform the delete volume operation in EC2 |
| ec2:DeleteVpcEndpoints | VPC endpoints in the specified account with the resource tag: `managed_by: paloaltonetworks` | Perform the delete VPC endpoints operation in EC2 |
| ec2:DescribeAccountAttributes | \* | Describe account attributes in EC2 |
| ec2:DescribeAddresses | \* | Perform the describe addresses operation in EC2 |
| ec2:DescribeAvailabilityZones | \* | Perform the describe availability zones operation in EC2 |
| ec2:DescribeImages | \* | Perform the describe images operation in EC2 |
| ec2:DescribeInstances | \* | Perform the describe instances operation in EC2 |
| ec2:DescribeInstanceTypes | \* | Perform the describe instance types operation in EC2 |
| ec2:DescribeKeyPairs | \* | Perform the describe key pairs operation in EC2 |
| ec2:DescribeNetworkInterfaces | \* | Perform the describe network interfaces operation in EC2 |
| ec2:DescribeSecurityGroups | \* | Perform the describe security groups operation in EC2 |
| ec2:DescribeSubnets | \* | Perform the describe subnets operation in EC2 |
| ec2:DescribeVolumeAttribute | Volumes in the specified account with the request tag: `managed_by: paloaltonetworks` | Perform the describe volume attribute operation in EC2 |
| ec2:DescribeVolumes | \* | Perform the describe volumes operation in EC2 |
| ec2:DescribeVolumesModifications | \* | Perform the describe volumes modifications operation in EC2 |
| ec2:DescribeVolumeStatus | \* | Perform the describe volume status operation in EC2 |
| ec2:DescribeVpcEndpoints | \* | Perform the describe VPC endpoints operation in EC2 |
| ec2:DescribeVpcs | \* | Perform the describe VPC operation in EC2 |
| ec2:DetachVolume | Volumes in the specified account with the request tag: `managed_by: paloaltonetworks` | Perform the detach volume operation in EC2 |
| ec2:DisassociateAddress | Volumes with the resource tag: `managed_by: paloaltonetworks` | Perform the disassociate address operation in EC2 |
| ec2:GetSpotPlacementScores | \* | Perform the get spot placement scores operation for prioritization of an availability zone for spot instance deployment |
| ec2:ImportVolume | Volumes in the specified account with the request tag: `managed_by: paloaltonetworks` | Perform the import volume operation in EC2 |
| ec2:ModifyInstanceAttribute | Instances in the specified account, where both of the following conditions are met: The target EC2 instance has the resource tag: `managed_by: paloaltonetworks`; The modify action must be specifically related to changing the value of the SourceDestCheck attribute | Perform the modify instance attribute operation in EC2 |
| ec2:ModifyVolume\* | Volumes in the specified account with the request tag: `managed_by: paloaltonetworks` | Perform the modify volume\* operation in EC2 |
| ec2:ReleaseAddress | Resources with the resource tag: `managed_by: paloaltonetworks` | Perform the release address operation in EC2 |
| ec2:RunInstances | The new EC2 instance must be launched into a network environment (VPC, subnets, security groups, and key pairs) that is already designated as `managed_by: paloaltonetworks`, and if the request correctly specifies that the newly-created instance, network interfaces, and volumes are also tagged as `managed_by: paloaltonetworks`. The use of source snapshots for volumes is permitted without any tagging restrictions | Run (launch) a scanner and/or proxy VM |
| ec2:TerminateInstances | EC2 instances with the tag: `managed_by: paloaltonetworks` | Perform the terminate instances operation in EC2 |
| iam:CreateServiceLinkedRole | The role being created must be exclusively for the Amazon Redshift service | Perform the create service linked role operation in IAM |
| iam:PassRole | Limited to the specific list of roles designated as 'scanner roles' within the account | Perform the pass role operation in IAM |
| kms:\* | Keys must be accessed through a legitimate, identified AWS service (such as S3, RDS, EC2, and so on) | Perform the \* operation in KMS |
| kms:ReEncryptFrom | The request must be initiated by the Amazon EC2 service and be contextually tied to the encryption of an EBS volume or snapshot | Perform the re-encrypt from operation in KMS |
| redshift-data:BatchExecuteStatement | \* | Execute a list of SQL statements in a single batch |
| redshift-data:CancelStatement | \* | Stop a currently running SQL statement or a batch of statements |
| redshift-data:Describe\* | \* | Provide detailed status and information about a previously executed SQL statement |
| redshift-data:ExecuteStatement | \* | Run a single SQL statement asynchronously against a Redshift cluster or workgroup |
| redshift-data:GetStatementResult | \* | Retrieve the result set (data) from a SQL statement that has finished execution |
| redshift-data:List\* | \* | List the IDs of all SQL statements executed within the past week |
| redshift-serverless:CreateNamespace | Creation request includes tag: `managed_by: paloaltonetworks` | Create a Redshift Serverless namespace |
| redshift-serverless:CreateWorkgroup | Creation request includes tag: `managed_by: paloaltonetworks` | Create a Redshift Serverless workgroup   |
| redshift-serverless:DeleteNamespace | Namespaces tagged with: `managed_by: paloaltonetworks` | Permanently delete a Redshift Serverless namespace and all associated data |
| redshift-serverless:DeleteWorkgroup | Workgroup tagged with: `managed_by: paloaltonetworks` | Delete a Redshift Serverless workgroup, removing its associated compute resources |
| redshift-serverless:GetCredentials | \* | Request temporary credentials to connect directly to the database within a workgroup |
| redshift-serverless:GetNamespace | \* | Retrieve configuration and status details for a specific namespace |
| redshift-serverless:GetWorkgroup | \* | Retrieve configuration and status details for a specific workgroup |
| redshift-serverless:ListNamespaces | \* | List summary information for all namespaces in the current account and region |
| redshift-serverless:ListTagsForResource | \* | List all the tags currently attached to a specified Redshift Serverless resource |
| redshift-serverless:ListWorkgroups | \* | List summary information for all workgroups in the current account and region |
| redshift-serverless:RestoreFromSnapshot | \* | Create a new namespace and restore its data from a specified backup snapshot |
| redshift-serverless:TagResource | \* | Apply, modify, or update tags on a Redshift Serverless resource. This is crucial for cost allocation and governance |
| s3:DeleteObject | The bucket must be owned by the user's current AWS account. | Delete a specified object from artifact bucket |
| s3:GetBucketPolicy | The bucket must be owned by the user's current AWS account. | Retrieve the resource-based access policy attached to an Amazon S3 bucket |
| s3:GetObject | Users can read (download) any file from the `${cf_template_bucket}` Also, users can read files from any S3 bucket they own that begins with the prefix `${bucket_name}-`, with specific access paths defined for the general bucket contents and files within the `output/`, `input/`, and `output/logs/` folders | Retrieve the contents of a specified object from an Amazon S3 bucket |
| s3:GetObjectAttributes | Users can read the metadata (attributes) of files from any S3 bucket they own that begins with the prefix: `${bucket_name}-` This permission applies to files located anywhere within that bucket, but the specific paths are detailed as the general bucket contents and files within the `output/`, `input/`, and `output/logs/` folders | Fetch system-defined metadata and object attributes for an S3 object |
| s3:ListBucket | Users can view: The list of contents for the specific `${cf_template_bucket}`; The contents of any S3 bucket they own that has a name starting with the prefix `${bucket_name}-` | List the objects or common prefixes in an Amazon S3 bucket |
| s3:PutBucketPolicy | S3 buckets that users own and whose name begins with the prefix: `${bucket_name}-` | Apply or update a resource-based access policy in an Amazon S3 bucket |
| s3:PutObject | Users can Upload files to the specific `${cf_template_bucket}` without restriction.; Upload files to any S3 bucket users own that begins with the prefix: `${bucket_name}-` This upload permission applies broadly to the general contents of these prefixed buckets, including files placed specifically in the `input/`, `output/`, and `output/logs/` subfolders | Upload or replace an object in an Amazon S3 bucket |
| sqs:DeleteMessage | Messages from any SQS queue that is already tagged with `managed_by: paloaltonetworks` and whose name begins with the prefix: `${queue_prefix}-` | For bucket communications |
| sqs:GetQueueUrl | URL for any SQS queue that is already tagged with managed_by: paloaltonetworks and whose name begins with the prefix: `${queue_prefix}-` | For bucket communications |
| sqs:ListQueues | URL for any SQS queue that is already tagged with `managed_by: paloaltonetworks` and whose name begins with the prefix: `${queue_prefix}-` | For bucket communications |
| sqs:ReceiveMessage | Messages from any SQS queue that is already tagged with `managed_by: paloaltonetworks` and whose name begins with the prefix: `${queue_prefix}-` | For bucket communications |
| ssm:AddTagsToResource | SSM Parameter named cortex-outposts-..., but only if the tagging request itself includes the `managed_by:` `paloaltonetworks` tag | Perform the add tags to resource operation in SSM. |
| ssm:DeleteParameter | SSM parameter named `cortex-outposts-...`, but only if that specific parameter resource is already tagged with `managed_by: paloaltonetworks` | Delete a secret that was used for unmanaged container image registries by key |
| ssm:GetParameter | SSM parameter named `cortex-outposts-...`, but only if that specific parameter resource is already tagged with `managed_by: paloaltonetworks` | This outpost-specific permission's purpose is to get a secret by key for unmanaged container image registries |
| ssm:PutParameter | Group of SSM parameter store parameters in a specified AWS account with the request tag: `managed_by: paloaltonetworks` | Put secret for unmanaged container image registries |
| sts:AssumeRole | Resource belongs to a different AWS account than the current account | Provide temporary security credentials by assuming the specified IAM role through STS |

##### Google Cloud Platform provider permissions

List of Google Cloud Platform provider permissions for Cortex Cloud.

When onboarding Google Cloud Platform, Cortex Cloud creates an authentication template that requests the permissions needed for monitoring your cloud environment. Depending on which security capabilities you select in the onboarding wizard, different permissions are requested. The following tables are organized by security module and list the CSP permissions being requested as well as the purpose (and where relevant, the scope):

-   Agentless Disk Scanning 
    
-   DSPM 
    
-   Discovery Engine 
    
-   Log Collection 
    
-   Registry Scan 
    
-   Automations 
    
-   Serverless Scan 
    
-   Outposts 
    

Agentless Disk Scanning

| Permission | Scope | Purpose |
| --- | --- | --- |
| compute.disks.create | Disks with "cortex-scan-" prefix | Create disk from image |
| compute.disks.delete | Disks with "cortex-scan-" prefix | Delete created disk |
| compute.disks.get | Disks with "cortex-scan-" prefix | Retrieve disk creation status |
| compute.disks.setLabels | Disks with "cortex-scan-" prefix | Set label for disks |
| compute.images.get | Images with "cortex-scan-" prefix | Retrieve image metadata |
| compute.snapshots.create | Snapshots with "cortex-scan-" prefix | Create disk snapshot |
| compute.snapshots.delete | Snapshots with "cortex-scan-" prefix | Delete scanned snapshot |
| compute.snapshots.get | Snapshots with "cortex-scan-" prefix | Retrieve snapshot creation status |
| compute.snapshots.setLabels | Snapshots with "cortex-scan-" prefix | Add snapshot labels for a cost visibility |
| compute.snapshots.useReadOnly | Snapshots with "cortex-scan-" prefix | Attach snapshot to a scanner VM |

DSPM

| Permission | Scope | Purpose |
| --- | --- | --- |
| artifactregistry.repositories.downloadArtifacts | All Artifact Registry Repositories in the project (or higher) | Download or retrieve artifacts (like container images and packages) from an Artifact Registry repository. This is necessary for a DSPM scanner to inspect the content for security and compliance assessment. |
| bigquery.bireservations.get | All BigQuery instances | Get BigQuery bireservations for classification purposes |
| bigquery.capacityCommitments.get | All BigQuery instances | Get BigQuery capacity commitments for classification purposes |
| bigquery.capacityCommitments.list | All BigQuery instances | List BigQuery capacity commitments for classification purposes |
| bigquery.config.get | All BigQuery instances | Get BigQuery configurations for classification purposes |
| bigquery.datasets.get | All BigQuery instances | Get BigQuery datasets for classification purposes |
| bigquery.datasets.getIamPolicy | All BigQuery instances | Get BigQuery dataset IAM policies for classification purposes |
| bigquery.models.getData | All BigQuery instances | List BigQuery model data for classification purposes |
| bigquery.models.getMetadata | All BigQuery instances | Get BigQuery model metadata for classification purposes |
| bigquery.models.list | All BigQuery instances | List BigQuery models for classification purposes |
| bigquery.routines.get | All BigQuery instances | Get BigQuery routines for classification purposes |
| bigquery.routines.list | All BigQuery instances | List BigQuery routines for classification purposes |
| bigquery.tables.export | All BigQuery instances | Export BigQuery tables |
| bigquery.tables.get | All BigQuery instances | Get BigQuery tables for classification purposes |
| bigquery.tables.getData | All BigQuery instances | Get BigQuery table data for classification purposes |
| bigquery.tables.getIamPolicy | All BigQuery instances | Get BiqQuery table IAM policies for classification purposes |
| bigquery.tables.list | All BigQuery instances | List BigQuery tables for classification purposes |
| bigtable.backup.create | All Bigtable instances | Create Bigtable backups for standard cloud and outpost deployments |
| bigtable.backup.delete | All Bigtable instances | Delete Bigtable backups on standard cloud and outpost deployments |
| bigtable.backups.get | All Bigtable instances | Get Bigtable backup metadata for standard cloud, outpost, and scanner-based deployments |
| bigtable.backups.list | All Bigtable instances | List Bigtable backups for standard cloud, outpost, and scanner-based deployments |
| bigtable.backups.restore | All Bigtable instances | Restore Bigtable from backup |
| bigtable.clusters.get | All Bigtable instances | Get Bigtable cluster metadata for standard cloud and scanner-based deployments |
| bigtable.clusters.list | All Bigtable instances | List Bigtable clusters for standard cloud and scanner-based deployments |
| bigtable.instances.get | All Bigtable instances | Get Bigtable instance metadata for standard cloud and scanner-based deployments |
| bigtable.instances.list | All Bigtable instances | List Bigtable instances for standard cloud and scanner-based deployments |
| bigtable.tables.get | All Bigtable instances | Get Bigtable table metadata for standard cloud and scanner-based deployments |
| bigtable.tables.list | All Bigtable instances | List Bigtable instances for standard cloud, outpost, and scanner-based deployments |
| cloudsql.backupRuns.create | All Cloud SQL instances | Create CloudSQL backup runs for classification purposes for standard cloud and outpost deployments |
| cloudsql.backupRuns.delete | All Cloud SQL instances | Delete CloudSQL backup runs for standard cloud and outpost deployments |
| cloudsql.backupRuns.get | All CloudSQL instances | Get CloudSQL backup run metadata for classification purposes for standard cloud, outpost, and scanner-based deployments |
| cloudsql.backupRuns.list | All Cloud SQL instances | List CloudSQL backup runs for classification purposes for standard cloud and outpost deployments |
| roles/cloudfunctions.viewer (Built-in role, managed by GCP) | All Cloud Functions in the project (or higher) | Read the configuration and metadata of all Cloud Functions resources in the project. This is necessary for inventory and security posture assessment. |
| roles/container.clusterViewer (Built-in role, managed by GCP) | All Google Kubernetes Engine (GKE) Clusters in the project (or higher) | Read the configuration and status of all Google Kubernetes Engine (GKE) clusters in the project for posture assessment |
| roles/firebaserules.viewer (Built-in role, managed by GCP) | All Firebase Security Rules in the project (or higher) | Read the configuration and contents of Firebase Security Rules for posture assessment |
| roles/storage.objectViewer (Built-in role, managed by GCP) | All objects (files) in all Cloud Storage buckets in the project (or higher) | Read the data and metadata of objects (files) in Cloud Storage buckets, but cannot modify or delete them. This is required for data scanning and inventory. |

Discovery Engine

| Permission | Purpose |
| --- | --- |
| accesscontextmanager.accessLevels.list | List Access Context Manager (GCP ACM) access levels |
| accesscontextmanager.accessPolicies.list | List Access Context Manager (GCP ACM) policies |
| accesscontextmanager.servicePerimeters.list | List Access Context Manager (GCP ACM) service perimeters |
| aiplatform.batchPredictionJobs.list | List AI Platform batch prediction jobs |
| aiplatform.nasJobs.list | List AI Platform Neural Architecture Search (NAS) jobs |
| analyticshub.dataExchanges.list | List Analytics Hub data exchanges |
| analyticshub.listings.getIamPolicy | Get IAM policy for Analytics Hub listings |
| analyticshub.listings.list | List Analytics Hub listings |
| baremetalsolution.instances.list | List Bare Metal Solution instances |
| baremetalsolution.luns.list | List Bare Metal Solution LUNs (Logical Unit Numbers) |
| baremetalsolution.networks.list | List Bare Metal Solution networks |
| baremetalsolution.nfsshares.list | List Bare Metal Solution NFS shares |
| baremetalsolution.volumes.list | List Bare Metal Solution volumes |
| cloudscheduler.jobs.list | List Cloud Scheduler jobs |
| cloudsecurityscanner.scans.list | List Cloud Security Scanner scans |
| composer.imageversions.list | List Composer image versions |
| datamigration.connectionprofiles.getIamPolicy | Get IAM policy for data migration connection profiles |
| datamigration.connectionprofiles.list | List data migration connection profiles |
| datamigration.conversionworkspaces.getIamPolicy | Get IAM policy for data migration conversion workspaces |
| datamigration.conversionworkspaces.list | List data migration conversion workspaces |
| datamigration.migrationjobs.getIamPolicy | Get IAM policy for data migration jobs |
| datamigration.migrationjobs.list | List data migration jobs |
| datamigration.privateconnections.getIamPolicy | View the access policy for a Database Migration Service private connection |
| datamigration.privateconnections.list | List data migration private connections |
| notebooks.locations.list | List notebook locations |
| notebooks.schedules.list | List notebook schedules |
| roles/cloudfunctions.viewer (Built-in role, managed by GCP) | Read the configuration and metadata of all Cloud Functions resources in the project. This is necessary for inventory and security posture assessment. |
| roles/container.clusterViewer (Built-in role, managed by GCP) | Read the configuration and status of all Google Kubernetes Engine (GKE) clusters in the project for posture assessment |
| roles/firebaserules.viewer (Built-in role, managed by GCP) | Read the configuration and contents of Firebase Security Rules for posture assessment |
| roles/storage.objectViewer (Built-in role, managed by GCP) | Read the data and metadata of objects (files) in Cloud Storage buckets, but cannot modify or delete them. This is required to view the content and details of all stored data assets for inventory. |
| roles/viewer (Built-in role, managed by GCP) | Grant read-only access to view resources and data across all Google Cloud services within the project. This is the broadest read permission required for comprehensive asset inventory. |
| run.jobs.getIamPolicy | Get IAM policy of Cloud Run jobs |
| run.jobs.list | List Cloud Run jobs |
| run.services.list | List Cloud Run services |
| serviceusage.services.use | Use cloud services |
| storage.buckets.get | Get metadata of a storage bucket |
| storage.buckets.getIamPolicy | Get IAM policy of a storage bucket |
| storage.buckets.list | List storage buckets |
| storage.buckets.listEffectiveTags | List effective tags of storage buckets |
| storage.buckets.listTagBindings | List tag bindings of storage buckets |
| storage.objects.getIamPolicy | Get IAM policy of storage objects |

Log Collection

| Permission | Purpose |
| --- | --- |
| roles/pubsub.subscriber (Built-in role, managed by GCP) | Grants access to consume messages from the subscription where audit logs are stored |

Registry Scan

| Permission | Scope | Purpose |
| --- | --- | --- |
| roles/iam.serviceAccountTokenCreator | Access to this permission is limited to a specific Service Account defined within an outpost. No account other than the defined Service Account can access the permission and access is limited to the permissions defined on the target SA. | Impersonate to a specific service account |
| artifactregistry.repositories.downloadArtifacts | All artifacts listed in the GAR of the customer's account | Needed in order to download images from the Google Artifact Registry (GAR) |

Automations

|   Permission | Command that requires this permission | Purpose |
| --- | --- | --- |
| compute.firewalls.create | gcp-compute-firewall-insert |  |
| compute.firewalls.get | gcp-compute-firewall-get |  |
| compute.firewalls.list | gcp-compute-firewall-list |  |
| compute.firewalls.update |  |  |
| compute.images.get | gcp-compute-image-get |  |
| compute.instanceGroups.get | gcp-compute-instance-group-get |  |
| compute.instances.get | gcp-compute-instance-get |  |
| compute.instances.list | gcp-compute-instances-list |  |
| compute.instances.setLabels | gcp-compute-instance-labels-set |  |
| compute.instances.setMetadata |  |  |
| compute.instances.setServiceAccount |  |  |
| compute.instances.setTags | gcp-compute-network-tag-set |  |
| compute.instances.start | gcp-compute-instance-start |  |
| compute.instances.stop | gcp-compute-instance-stop |  |
| compute.networks.create | gcp-compute-network-insert |  |
| compute.networks.get | gcp-compute-network-get |  |
| compute.networks.list | gcp-compute-network-list |  |
| compute.networks.updatePolicy |  |  |
| compute.regions.get | gcp-compute-region-get |  |
| compute.snapshots.get | gcp-compute-snapshot-get |  |
| compute.snapshots.list | gcp-compute-snapshots-list |  |
| compute.subnetworks.get |  |  |
| compute.subnetworks.list |  |  |
| compute.subnetworks.setPrivateIpGoogleAccess |  |  |
| compute.subnetworks.update |  |  |
| compute.zones.get | gcp-compute-zone-get |  |
| container.clusters.get |  |  |
| container.clusters.list |  |  |
| container.clusters.update |  |  |
| resourcemanager.projects.getIamPolicy |  |  |
| resourcemanager.projects.setIamPolicy |  |  |
| storage.buckets.get | gcp-storage-bucket-get; gcp-storage-bucket-policy-list; gcp-storage-bucket-policy-set |  |
| storage.buckets.getIamPolicy | gcp-storage-bucket-list; gcp-storage-bucket-get; gcp-storage-bucket-policy-list; gcp-storage-bucket-policy-set |  |
| storage.buckets.getIpFilter | gcp-storage-bucket-list; gcp-storage-bucket-get |  |
| storage.buckets.list | gcp-storage-bucket-list |  |
| storage.buckets.setIamPolicy | gcp-storage-bucket-policy-set; gcp-storage-bucket-object-policy-set |  |
| storage.buckets.update | gcp-storage-bucket-policy-set |  |
| storage.objects.getIamPolicy | gcp-storage-bucket-objects-list; gcp-storage-bucket-object-policy-list |  |
| storage.objects.list | gcp-storage-bucket-objects-list |  |
| cloudidentity.groups.memberships.delete | gcp-iam-group-membership-delete | Revoke permissions from the Access Control List (ACL). This is to remediate an issue detected by the rule: "GCP Storage buckets are publicly accessible to all authenticated users" |
| cloudasset.assets.searchAllResources | gcp-compute-instances-aggregated-list-by-ip | Search and retrieve the metadata for all Google Cloud resources (VMs, buckets, networks, and so on) within a specified scope (project, folder, or organization). This is required for comprehensive asset discovery and to gain a unified, auditable view of the entire GCP environment. |

Serverless Scan

| Permission | Purpose |
| --- | --- |
| cloudfunctions.functions.get | Read the metadata of a specific Cloud function. Needed for reading function metadata. |
| cloudfunctions.functions.sourceCodeGet | Read and download the source code of a deployed Cloud function. Needed to download function source code for scanning. |
| storage.objects.get | Read the data of a specific object in a Cloud storage bucket. Needed to download function source code for scanning. |

Outposts

| Permission | Purpose |
| --- | --- |
| roles/compute.admin | Grant full administrative control over Compute Engine resources (VMs, disks, networks, and so on), but not the project-wide IAM |
| roles/bigtable.admin | Grant full administrative control over Bigtable instances, clusters, and tables |
| roles/bigtable.reader | Read all data and metadata from Bigtable tables. This is necessary for Data Security Posture Management (DSPM) scanners so they can get data from the customer environment |
| roles/cloudsql.client | Connect to and execute data operations (read/write) on Cloud SQL databases |
| roles/iam.serviceAccountUser | Allow a user or service to delegate its identity by acting as a service account for running workloads (for example, VMs, Cloud Run, or GKE) |
| roles/iam.serviceAccountTokenCreator | Allow a user or service to impersonate a service account directly by creating access tokens, signing blobs, or signing JSON Web Tokens (JWTs). Useful for workload identity federation or automation. |
| roles/cloudkms.cryptoKeyEncrypterDecrypter | Encrypt and decrypt data using a specific Cloud Key Management Service (Cloud KMS) cryptographic key |
| roles/cloudkms.viewer | Read the details and metadata of cryptographic keys and key rings in Cloud KMS |
| roles/secretmanager.secretAccessor | For use by outpost only: Allow reading secret values from the Secret Manager |
| roles/servicenetworking.serviceAgent | Allow the Google-managed service accounts to manage private service networking connections |
| roles/pubsub.subscriber | Consume messages from a Pub/Sub subscription for inter-service communication (for example, bucket events) |
| bigquery.jobs.create | Create an export job to transfer data from BigQuery to Google Cloud Storage (GCS). Used from ST. |
| cloudsql.databases.create | Create databases as part of the instance restore. Used from ST. |
| cloudsql.databases.delete | Delete databases as part of the instance cleanup operation. Used from ST. |
| cloudsql.databases.update | Modify database properties as part of the instance restore operation. Used from ST. |
| cloudsql.databases.get | Retrieve database details as part of the instance restore operation. Used from ST. |
| cloudsql.databases.list | List databases as part of the instance restore operation. Used from ST. |
| cloudsql.instances.list | List Cloud SQL instances as part of the instance restore operation. Used from ST. |
| cloudsql.instances.get | Retrieve instance details as part of the instance restore operation. Used from ST. |
| cloudsql.instances.connect | Connect to a Cloud SQL instance for data scanning. Used from scanners. |
| cloudsql.instances.create | Create a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| cloudsql.instances.delete | Delete Cloud SQL instances as part of the instance cleanup operation. Used from ST. |
| cloudsql.instances.login | Log into a Cloud SQL instance for data scanning. Used from scanners. |
| cloudsql.instances.restart | Restart a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| cloudsql.instances.restoreBackup | Restore a Cloud instance from a backup as part of the instance restore operation. Used from ST. |
| cloudsql.instances.update | Modify Cloud SQL instance properties as part of the instance restore operation. Used from ST. |
| cloudsql.instances.createTagBinding | Apply a TagKey and TagValue to a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| cloudsql.instances.deleteTagBinding | Update (remove) TagKey and TagValue from a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| cloudsql.instances.listTagBindings | List instance tags as part of the instance restore operation. Used from ST. |
| cloudsql.users.create | Create a new user for a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| cloudsql.users.delete | Delete an existing user from a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| cloudsql.users.update | Modify the settings of a user on a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| cloudsql.users.get | Retrieve instance users as part of the instance restore operation. Used from ST. |
| cloudsql.users.list | List all users on a Cloud SQL instance as part of the instance restore operation. Used from ST. |
| secretmanager.secrets.create | Create a new Secret Manager secret for use by a scanner |
| secretmanager.secrets.update | Update secret metadata such as labels and replication settings |
| secretmanager.secrets.delete | Delete an existing Secret Manager secret |
| secretmanager.secrets.get | View the metadata and configuration of a Secret Manager secret |
| secretmanager.secrets.list | List all Secret Manager secrets within a project |
| secretmanager.versions.access | Access the actual secret payload (value) for a specific secret version |
| secretmanager.versions.add | Add a new version containing updated data to an existing secret |
| secretmanager.versions.destroy | Permanently destroy a secret version (irreversable) |
| secretmanager.versions.disable | Disable an existing secret version, making its payload inaccessible |
| secretmanager.versions.enable | Enable a previously-disabled secret version, making its payload accessible |
| secretmanager.versions.get | View the metadata and state of a secret version |
| secretmanager.versions.list | List all versions associated with a Secret Manager secret |
| storage.objects.create | Upload or create a new object (file) in a Cloud Storage bucket for scan runner communication |
| storage.objects.delete | Delete an existing object (file) from an artifact bucket |
| storage.objects.list | List all objects (files) contained within a Cloud Storage bucket |
| cloudkms.cryptoKeyVersions.create | Create a new version for a cryptographic key, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeyVersions.destroy | Permanently destroy a cryptographic key version, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeyVersions.get | Retrieve the details and metadata of a cryptographic key version, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeyVersions.list | List all versions of a cryptographic key, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeyVersions.update | Modify the settings and state of a cryptographic key version, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeyVersions.useToDecrypt | Use a cryptographic key version to decrypt data, used for Bigtable encryption. Used from scanner. |
| cloudkms.cryptoKeyVersions.useToEncrypt | Use a cryptographic key version to encrypt data, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeys.create | Create a new cryptographic key, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeys.setIamPolicy | Set the IAM policy (permissions) for a cryptographic key, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeys.getIamPolicy | Retrieve the IAM policy (permissions) for a cryptographic key, used for Bigtable encryption. Used from ST. |
| cloudkms.cryptoKeys.update | Modify the properties of a cryptographic key, used for Bigtable encryption. Used from ST. |
| cloudkms.keyRings.create | Create a new key ring to hold cryptographic keys, used for Bigtable encryption. Used from ST. |

##### Microsoft Azure provider permissions

List of Microsoft Azure provider permissions for Cortex Cloud.

When onboarding Microsoft Azure, Cortex Cloud creates an authentication template that requests the permissions needed for monitoring your cloud environment. Depending on which security capabilities you select in the onboarding wizard, different permissions are requested. The following tables are organized by security module and list the CSP permissions being requested as well as the purpose (and where relevant, the scope):

-   Agentless Disk Scanning
    
-   DSPM
    
-   Discovery Engine
    
-   Log Collection
    
-   Registry Scan
    
-   Outposts
    
-   Onboarding managed identity
    
-   Automations
    

Agentless Disk Scanning

| Permission | Scope | Purpose |
| --- | --- | --- |
| Microsoft.Compute/disks/delete | No scoping | Delete a scanned disk, after image scanning, ensuring resource cleanup |
| Microsoft.Compute/disks/read | Management Group | Retrieve disk status and properties to verify the disk is ready, such as for image scanning |
| Microsoft.Compute/disks/write | Management Group | Create a disk from the volume's image, for image scanning |
| Microsoft.Compute/galleries/images/delete | Resource groups starting with the prefix `cortex-` | Delete a temporary gallery image, for legacy image scanning |
| Microsoft.Compute/galleries/images/read | Management Group | Read a gallery image in order to create a disk for image scanning |
| Microsoft.Compute/galleries/images/versions/delete | Resource groups starting with the prefix `cortex-` | Delete a temporary gallery image version after legacy image scanning |
| Microsoft.Compute/galleries/images/versions/write | Resource groups starting with the prefix `cortex-` | Create a temporary gallery image version, for legacy image scanning |
| Microsoft.Compute/galleries/images/write | Resource groups starting with the prefix `cortex-` | Create a temporary gallery image, for legacy image scanning |
| Microsoft.Compute/snapshots/delete | Resource groups starting with the prefix `cortex-` | Delete a scanned snapshot after instance/image scanning |
| Microsoft.Compute/snapshots/read | Management Group | Read source snapshot's data to facilitate the conversion of a snapshot to a disk that will be attached to a scanner |
| Microsoft.Compute/snapshots/write | Resource groups starting with the prefix `cortex-` | Create a disk snapshot, before instance/image scanning |
| Microsoft.Compute/virtualMachines/read | Management Group | Allow disk snapshot operations, for instance scanning |

DSPM

| Permission | Scope | Purpose |
| --- | --- | --- |
| Microsoft.CognitiveServices/\*/action | All deployments | Read and scan OpenAI files and other Azure AI data resources |
| Microsoft.CognitiveServices/\*/read | All deployments | Discover of OpenAI resources and other Azure AI services |
| Microsoft.DocumentDB/databaseAccounts/listKeys/\* | Entire subscription | Get SAS token of CosmosDB to enable access |
| Microsoft.Network/networkSecurityGroups/delete | Resource groups starting with the prefix `cortex-` | Delete security groups |
| Microsoft.Network/networkSecurityGroups/join/action | Resource groups starting with the prefix `cortex-` | Associate a network security group with a subnet or network interface |
| Microsoft.Network/networkSecurityGroups/securityRules/delete | Resource groups starting with the prefix `cortex-` | Delete security rules for a security group |
| Microsoft.Network/networkSecurityGroups/securityRules/write | Resource groups starting with the prefix `cortex-` | Create or update security rules within a network security group |
| Microsoft.Network/networkSecurityGroups/write | Resource groups starting with the prefix `cortex-` | Create or update a network security group |
| Microsoft.Network/routeTables/delete | Resource groups starting with the prefix `cortex-` | Delete a route table from a subscription |
| Microsoft.Network/routeTables/join/action | Resource groups starting with the prefix `cortex-` | Associate a route table with a subnet |
| Microsoft.Network/routeTables/write | Resource groups starting with the prefix `cortex-` | Create or update a route table |
| Microsoft.Network/virtualNetworks/delete | Resource groups starting with the prefix `cortex-` | Delete a virtual network |
| Microsoft.Network/virtualNetworks/join/action | Resource groups starting with the prefix `cortex-` | Associate a virtual network with a subnet |
| Microsoft.Network/virtualNetworks/subnets/delete | Resource groups starting with the prefix `cortex-` | Delete a virtual network subnet |
| Microsoft.Network/virtualNetworks/subnets/join/action | Resource groups starting with the prefix `cortex-` | Associate a subnet with a resource |
| Microsoft.Network/virtualNetworks/subnets/write | Resource groups starting with the prefix `cortex-` | Create or update a subnet |
| Microsoft.Network/virtualNetworks/write | Resource groups starting with the prefix `cortex-` | Create or update a virtual network |
| Microsoft.Sql/managedInstances/databases/write | Resource groups starting with the prefix `cortex-` | Used for copying PITR of SQL managed instances to Palo Alto Networks' resource group, enabling Palo Alto Networks to restore and scan it |
| Microsoft.Sql/managedInstances/delete | Resource groups starting with the prefix `cortex-` | Clean stale assets such as Palo Alto Networks' Azure SQL Managed Instance |
| Microsoft.Sql/managedInstances/write | Resource groups starting with the prefix `cortex-` | Create SQL Managed Instance for classification of managed instances |
| Microsoft.Sql/servers/databases/delete | Resource groups starting with the prefix `cortex-` | Clean stale assets such as Palo Alto Networks' Azure SQL server databases |
| Microsoft.Sql/servers/databases/read | Resource groups starting with the prefix `cortex-` | Get configurations on Azure SQL databases |
| Microsoft.Sql/servers/databases/resume/action | Resource groups starting with the prefix `cortex-` | Copy and manage SQL databases in Azure SQL server |
| Microsoft.Sql/servers/databases/write | Resource groups starting with the prefix `cortex-` | Copy and manage SQL databases in Azure SQL server |
| Microsoft.Sql/servers/delete | Resource groups starting with the prefix `cortex-` | Clean stale assets such as Palo Alto Networks' Azure SQL server |
| Microsoft.Sql/servers/privateEndpointConnectionsApproval/action | Resource groups starting with the prefix `cortex-` | Connection using endpoints |
| Microsoft.Sql/servers/virtualNetworkRules/write | Resource groups starting with the prefix `cortex-` | Configure network accessibility from the scanning VMs on Palo Alto Networks' Azure SQL servers |
| Microsoft.Sql/servers/write | Resource groups starting with the prefix `cortex-` | Create and manage Palo Alto Networks' Azure SQL servers |
| Microsoft.Storage/\*/read | Entire subscription | Read blob data for data classification |
| Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read | All blobs | Enable classification of data in storage blobs |
| Microsoft.Storage/storageAccounts/blobServices/generateUserDelegationKey/action | Entire subscription | Get SAS token of blobServices to enable access |
| Microsoft.Storage/storageAccounts/fileServices/fileshares/files/read | All fileshares | Enable classification of data in storage fileshares |
| Microsoft.Storage/storageAccounts/ListAccountSas/action | Entire subscription | Get access SAS token to the storage account to scan file share instances using API |
| Microsoft.Storage/storageAccounts/listKeys/action | Entire subscription | Get access key to the storage account to scan file share instances using API |
| Microsoft.Storage/storageAccounts/PrivateEndpointConnectionsApproval/action | Entire subscription | Enable a scan by assigning private endpoints to a storage account located in a private network |
| Microsoft.Storage/storageAccounts/tableServices/tables/entities/read | All storage tables | Enable classification of data in storage tables |
| \*/read | Entire subscription | Read-only access, used to get metadata of all managed data assets in the subscription |

Discovery Engine

| Permission | Scope | Purpose |
| --- | --- | --- |
| AuditLog.Read.All | Tenants or management groups using Microsoft Graph | Read all audit log data for any tenant or management group |
| Directory.Read.All | Tenants or management groups using Microsoft Graph | Read full property sets for all directory objects |
| Domain.Read.All | Tenants or management groups using Microsoft Graph | Read all domain properties in a tenant |
| EntitlementManagement.Read.All | Tenants or management groups using Microsoft Graph | Read all access packages, assignments, and catalog configurations |
| GroupMember.Read.All | Tenants or management groups using Microsoft Graph | Read all group memberships in the directory |
| Group.Read.All | Tenants or management groups using Microsoft Graph | Read full property sets for all groups without editing group membership |
| IdentityProvider.Read.All | Tenants or management groups using Microsoft Graph | Read all identity provider configurations |
| Microsoft.Advisor/configurations/read | Management Group | Read Advisor configuration |
| Microsoft.AlertsManagement/prometheusRuleGroups/read | Management Group | Read Prometheus rule groups |
| Microsoft.AlertsManagement/smartDetectorAlertRules/read | Management Group | Read smart detector alert rules |
| Microsoft.AnalysisServices/servers/read | Management Group | Read Analysis Services servers |
| Microsoft.ApiManagement/service/apis/diagnostics/read | Management Group | Read diagnostics info of APIs |
| Microsoft.ApiManagement/service/apis/policies/read | Management Group | Read policies on APIs |
| Microsoft.ApiManagement/service/apis/read | Management Group | Read API details |
| Microsoft.ApiManagement/service/identityProviders/read | Management Group | Read API Management identity providers |
| Microsoft.ApiManagement/service/portalsettings/read | Management Group | Read developer portal settings |
| Microsoft.ApiManagement/service/products/policies/read | Management Group | Read policies on API products |
| Microsoft.ApiManagement/service/products/read | Management Group | Read API products |
| Microsoft.ApiManagement/service/read | Management Group | Read API Management service info |
| Microsoft.ApiManagement/service/tenant/read | Management Group | Read tenant info in API Management |
| Microsoft.AppConfiguration/configurationStores/read | Management Group | Read Azure App Configuration stores |
| Microsoft.app/containerapps/read | Management Group | Read App container apps |
| Microsoft.AppPlatform/Spring/apps/read | Management Group | Read Spring apps in Azure App Platform |
| Microsoft.AppPlatform/Spring/read | Management Group | Read Azure App Platform Spring resource info |
| Microsoft.Attestation/attestationProviders/read | Management Group | Read attestation providers |
| Microsoft.Authorization/classicAdministrators/read | Management Group | Read classic administrators info |
| Microsoft.Authorization/locks/read | Management Group | Read resource locks |
| Microsoft.Authorization/permissions/read | Management Group | Read permissions |
| Microsoft.Authorization/policyAssignments/read | Management Group | Read policy assignments |
| Microsoft.Authorization/policyDefinitions/read | Management Group | Read policy definitions |
| Microsoft.Authorization/roleAssignments/read | Management Group | Read role assignments |
| Microsoft.Authorization/roleDefinitions/read | Management Group | Read role definitions |
| Microsoft.Automanage/configurationProfiles/Read | Management Group | Read Automanage configuration profiles |
| Microsoft.Automation/automationAccounts/credentials/read | Management Group | Read credentials in automation accounts |
| Microsoft.Automation/automationAccounts/hybridRunbookWorkerGroups/read | Management Group | Read hybrid runbook worker groups |
| Microsoft.Automation/automationAccounts/read | Management Group | Read automation accounts |
| Microsoft.Automation/automationAccounts/runbooks/read | Management Group | Read runbooks |
| Microsoft.Automation/automationAccounts/variables/read | Management Group | Read variables in automation accounts |
| Microsoft.AzureStackHCI/Clusters/Read | Management Group | Read Azure Stack HCI clusters |
| Microsoft.Batch/batchAccounts/pools/read | Management Group | Read batch account pools |
| Microsoft.Batch/batchAccounts/read | Management Group | Read batch accounts |
| Microsoft.Blueprint/blueprints/read | Management Group | Read blueprints |
| Microsoft.BotService/botServices/read | Management Group | Read bot services |
| Microsoft.Cache/redisEnterprise/read | Management Group | Read Redis Enterprise caches |
| Microsoft.Cache/redis/firewallRules/read | Management Group | Read firewall rules on Redis cache |
| Microsoft.Cache/redis/read | Management Group | Read Redis caches |
| Microsoft.Cdn/profiles/afdendpoints/read | Management Group | Read CDN profile AFD endpoints |
| Microsoft.Cdn/profiles/afdendpoints/routes/read | Management Group | Read routes of CDN profile AFD endpoints |
| Microsoft.Cdn/profiles/customdomains/read | Management Group | Read custom domains in CDN profiles |
| Microsoft.Cdn/profiles/endpoints/customdomains/read | Management Group | Read custom domains of CDN endpoints |
| Microsoft.Cdn/profiles/endpoints/read | Management Group | Read CDN profile endpoints |
| Microsoft.Cdn/profiles/origingroups/read | Management Group | Read origin groups in CDN profiles |
| Microsoft.Cdn/profiles/read | Management Group | Read CDN profiles |
| Microsoft.Cdn/profiles/securitypolicies/read | Management Group | Read CDN profile security policies |
| Microsoft.Chaos/experiments/read | Management Group | Read Chaos experiments |
| Microsoft.classicCompute/domainNames/read | Management Group | Read Classic Compute domain names |
| Microsoft.ClassicCompute/VirtualMachines/read | Management Group | Read classic compute virtual machines |
| Microsoft.ClassicNetwork/networkSecurityGroups/read | Management Group | Read classic network security groups |
| Microsoft.ClassicNetwork/reservedIps/read | Management Group | Read classic network reserved IPs |
| Microsoft.ClassicNetwork/virtualNetworks/read | Management Group | Read classic virtual networks |
| Microsoft.ClassicStorage/StorageAccounts/read | Management Group | Read classic storage accounts |
| Microsoft.CognitiveServices/accounts/deployments/read | Management Group | Read deployments in Cognitive Services accounts |
| Microsoft.CognitiveServices/accounts/models/read | Management Group | Read models in Cognitive Services accounts |
| Microsoft.CognitiveServices/accounts/raiPolicies/read | Management Group | Read RAI policies in Cognitive Services accounts |
| Microsoft.CognitiveServices/accounts/read | Management Group | Read Cognitive Services accounts |
| Microsoft.CognitiveServices/models/read | Management Group | Read Cognitive Services models |
| Microsoft.Communication/CommunicationServices/Read | Management Group | Read Communication Services |
| Microsoft.Compute/availabilitySets/read | Management Group | Read availability sets |
| Microsoft.Compute/cloudServices/read | Management Group | Read cloud services |
| Microsoft.Compute/cloudServices/roleInstances/read | Management Group | Read cloud service role instances |
| Microsoft.Compute/diskEncryptionSets/read | Management Group | Read disk encryption sets |
| Microsoft.Compute/disks/beginGetAccess/action | Management Group | Begin get access on disks (action) |
| Microsoft.Compute/disks/read | Management Group | Read disks |
| Microsoft.Compute/galleries/images/read | Management Group | Read gallery images |
| Microsoft.Compute/galleries/read | Management Group | Read galleries |
| Microsoft.Compute/hostGroups/read | Management Group | Read host groups |
| Microsoft.Compute/snapshots/read | Management Group | Read snapshots |
| Microsoft.Compute/virtualMachineScaleSets/networkInterfaces/read | Management Group | Read network interfaces of VM scale sets |
| Microsoft.Compute/virtualMachineScaleSets/publicIPAddresses/read | Management Group | Read public IP addresses of VM scale sets |
| Microsoft.Compute/virtualMachineScaleSets/read | Management Group | Read virtual machine scale sets |
| Microsoft.Compute/virtualMachineScaleSets/virtualmachines/instanceView/read | Management Group | Read instance view of VM scale set VMs |
| Microsoft.Compute/virtualMachineScaleSets/virtualMachines/networkInterfaces /ipConfigurations/publicIPAddresses/read | Management Group | Read public IPs of VM scale set VM NICs IP configurations |
| Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read | Management Group | Read virtual machines in VM scale sets |
| Microsoft.Compute/virtualMachines/extensions/read | Management Group | Read VM extensions |
| Microsoft.Compute/virtualMachines/instanceView/read | Management Group | Read VM instance view |
| Microsoft.Compute/virtualMachines/read | Management Group | Read virtual machines |
| Microsoft.Confluent/organizations/Read | Management Group | Read Confluent organizations |
| Microsoft.Container/containerGroups/containers/exec/action | Management Group | Execute commands in a container |
| Microsoft.ContainerInstance/containerGroups/containers/exec/action | Management Group | Execute commands in container instances |
| Microsoft.ContainerInstance/containerGroups/read | Management Group | Read container groups |
| Microsoft.ContainerRegistry/registries/metadata/read | Management Group | Read container registry metadata |
| Microsoft.ContainerRegistry/registries/pull/read | Management Group | Read/pull from container registries |
| Microsoft.ContainerRegistry/registries/read | Management Group | Read container registries |
| Microsoft.ContainerRegistry/registries/webhooks/getCallbackConfig/action | Management Group | Get webhook callback configurations |
| Microsoft.ContainerService/managedClusters/read | Management Group | Read managed Kubernetes clusters |
| Microsoft.Dashboard/grafana/read | Management Group | Read Grafana dashboards |
| Microsoft.DataBoxEdge/dataBoxEdgeDevices/read | Management Group | Read DataBox Edge devices |
| Microsoft.Databricks/accessConnectors/read | Management Group | Read Databricks access connectors |
| Microsoft.Databricks/workspaces/read | Management Group | Read Databricks workspaces |
| Microsoft.Datadog/monitors/read | Management Group | Read Datadog monitors |
| Microsoft.DataFactory/datafactories/read | Management Group | Read Data Factory data factories |
| Microsoft.DataFactory/factories/integrationruntimes/read | Management Group | Read Data Factory integration runtimes |
| Microsoft.DataFactory/factories/linkedservices/read | Management Group | Read Data Factory linked services |
| Microsoft.DataFactory/factories/read | Management Group | Read Data Factories |
| Microsoft.DataLakeAnalytics/accounts/dataLakeStoreAccounts/read | Management Group | Read Data Lake Analytics associated Data Lake Store accounts |
| Microsoft.DataLakeAnalytics/accounts/firewallRules/read | Management Group | Read Data Lake Analytics firewall rules |
| Microsoft.DataLakeAnalytics/accounts/read | Management Group | Read Data Lake Analytics accounts |
| Microsoft.DataLakeAnalytics/accounts/storageAccounts/read | Management Group | Read Data Lake Analytics storage accounts |
| Microsoft.DataLakeStore/accounts/firewallRules/read | Management Group | Read Data Lake Store firewall rules |
| Microsoft.DataLakeStore/accounts/read | Management Group | Read Data Lake Store accounts |
| Microsoft.DataLakeStore/accounts/trustedIdProviders/read | Management Group | Read Data Lake Store trusted ID providers |
| Microsoft.DataLakeStore/accounts/virtualNetworkRules/read | Management Group | Read Data Lake Store virtual network rules |
| Microsoft.DataMigration/services/read | Management Group | Read Data Migration services |
| Microsoft.DataShare/accounts/read | Management Group | Read Data Share accounts |
| Microsoft.DBforMariaDB/servers/firewallRules/read | Management Group | Read MariaDB server firewall rules |
| Microsoft.DBforMariaDB/servers/read | Management Group | Read MariaDB servers |
| Microsoft.DBforMySQL/flexibleServers/configurations/read | Management Group | Read MySQL flexible server configurations |
| Microsoft.DBforMySQL/flexibleServers/databases/read | Management Group | Read MySQL flexible server databases |
| Microsoft.DBforMySQL/flexibleServers/firewallRules/read | Management Group | Read MySQL flexible server firewall rules |
| Microsoft.DBforMySQL/flexibleServers/read | Management Group | Read MySQL flexible servers |
| Microsoft.DBforMySQL/servers/firewallRules/read | Management Group | Read MySQL server firewall rules |
| Microsoft.DBforMySQL/servers/read | Management Group | Read MySQL servers |
| Microsoft.DBforMySQL/servers/virtualNetworkRules/read | Management Group | Read MySQL server virtual network rules |
| Microsoft.DBforPostgreSQL/flexibleServers/configurations/read | Management Group | Read PostgreSQL flexible server configurations |
| Microsoft.DBforPostgreSQL/flexibleServers/databases/read | Management Group | Read PostgreSQL flexible server databases |
| Microsoft.DBforPostgreSQL/flexibleServers/firewallRules/read | Management Group | Read PostgreSQL flexible server firewall rules |
| Microsoft.DBforPostgreSQL/flexibleServers/read | Management Group | Read PostgreSQL flexible servers |
| Microsoft.DBforPostgreSQL/servers/configurations/read | Management Group | Read PostgreSQL server configurations |
| Microsoft.DBforPostgreSQL/servers/firewallRules/read | Management Group | Read PostgreSQL server firewall rules |
| Microsoft.DBforPostgreSQL/servers/read | Management Group | Read PostgreSQL servers |
| Microsoft.DBforPostgreSQL/serversv2/firewallRules/read | Management Group | Read PostgreSQL servers v2 firewall rules |
| Microsoft.DesktopVirtualization/applicationgroups/read | Management Group | Read Desktop Virtualization application groups |
| Microsoft.DesktopVirtualization/hostpools/read | Management Group | Read Desktop Virtualization host pools |
| Microsoft.DesktopVirtualization/hostpools/sessionhostconfigurations/read | Management Group | Read Desktop Virtualization host pool session host configurations |
| Microsoft.DesktopVirtualization/hostpools/sessionhosts/read | Management Group | Read Desktop Virtualization host pool session hosts |
| Microsoft.DesktopVirtualization/workspaces/providers/Microsoft.Insights/diagnosticSettings/read | Management Group | Read Desktop Virtualization workspace diagnostic settings |
| Microsoft.DesktopVirtualization/workspaces/read | Management Group | Read Desktop Virtualization workspaces |
| Microsoft.DevCenter/devcenters/read | Management Group | Read DevCenter devcenters |
| Microsoft.Devices/iotHubs/privateLinkResources/Read | Management Group | Read IoT Hubs private link resources |
| Microsoft.Devices/iotHubs/Read | Management Group | Read IoT Hubs |
| Microsoft.DevTestLab/schedules/read | Management Group | Read DevTestLab schedules |
| Microsoft.DigitalTwins/digitalTwinsInstances/read | Management Group | Read Digital Twins instances |
| Microsoft.DocumentDB/cassandraClusters/read | Management Group | Read DocumentDB Cassandra clusters |
| Microsoft.DocumentDB/databaseAccounts/listConnectionStrings/action | Management Group | List connection strings of DocumentDB accounts (action) |
| Microsoft.DocumentDB/databaseAccounts/listKeys/action | Management Group | List keys of DocumentDB accounts (action) |
| Microsoft.DocumentDB/databaseAccounts/read | Management Group | Read DocumentDB database accounts |
| Microsoft.DocumentDB/databaseAccounts/readonlykeys/action | Management Group | List readonly keys of DocumentDB accounts (action) |
| Microsoft.DomainRegistration/domains/Read | Management Group | Read Domain registrations |
| Microsoft.Easm/workspaces/read | Management Group | Read Easm workspaces |
| Microsoft.Elastic/monitors/read | Management Group | Read Elastic monitors |
| Microsoft.EventGrid/domains/privateLinkResources/read | Management Group | Read Event Grid domains private link resources |
| Microsoft.EventGrid/domains/read | Management Group | Read Event Grid domains |
| Microsoft.EventGrid/namespaces/read | Management Group | Read Event Grid namespaces |
| Microsoft.EventGrid/partnerNamespaces/read | Management Group | Read Event Grid partner namespaces |
| Microsoft.EventGrid/topics/privateLinkResources/read | Management Group | Read Event Grid topics private link resources |
| Microsoft.EventGrid/topics/read | Management Group | Read Event Grid topics |
| Microsoft.EventHub/clusters/read | Management Group | Read EventHub clusters |
| Microsoft.EventHub/namespaces/authorizationRules/read | Management Group | Read EventHub namespaces authorization rules |
| Microsoft.EventHub/namespaces/eventhubs/authorizationRules/read | Management Group | Read EventHub event hub authorization rules |
| Microsoft.EventHub/namespaces/eventhubs/read | Management Group | Read EventHub event hubs |
| Microsoft.EventHub/namespaces/ipfilterrules/read | Management Group | Read EventHub IP filter rules |
| Microsoft.EventHub/Namespaces/PrivateEndpointConnections/read | Management Group | Read EventHub Namespace private endpoint connections |
| Microsoft.EventHub/namespaces/read | Management Group | Read EventHub namespaces |
| Microsoft.EventHub/namespaces/virtualnetworkrules/read | Management Group | Read EventHub virtual network rules |
| Microsoft.HDInsight/clusters/applications/read | Management Group | Read HDInsight cluster applications |
| Microsoft.HDInsight/clusters/read | Management Group | Read HDInsight clusters |
| Microsoft.HealthBot/healthBots/Read | Management Group | Read HealthBot bots |
| Microsoft.HealthcareApis/workspaces/read | Management Group | Read Healthcare APIs workspaces |
| Microsoft.HybridCompute/machines/read | Management Group | Read Hybrid Compute machines |
| Microsoft.Insights/actionGroups/read | Management Group | Read Insights action groups |
| Microsoft.Insights/ActivityLogAlerts/read | Management Group | Read Insights activity log alerts |
| Microsoft.Insights/Components/read | Management Group | Read Insights components |
| Microsoft.Insights/DataCollectionEndpoints/Read | Management Group | Read Insights data collection endpoints |
| Microsoft.Insights/DataCollectionRules/Read | Management Group | Read Insights data collection rules |
| Microsoft.Insights/diagnosticSettings/read | Management Group | Read Insights diagnostic settings |
| Microsoft.Insights/eventtypes/values/read | Management Group | Read Insights event type values |
| Microsoft.Insights/LogProfiles/read | Management Group | Read Insights log profiles |
| Microsoft.Insights/MetricAlerts/Read | Management Group | Read Insights metric alerts |
| Microsoft.IoTCentral/IoTApps/read | Management Group | Read IoT Central applications |
| Microsoft.KeyVault/vaults/keys/read | Management Group | Read Key Vault keys |
| Microsoft.KeyVault/vaults/privateLinkResources/read | Management Group | Read Key Vault private link resources |
| Microsoft.KeyVault/vaults/read | Management Group | Read Key Vault vaults |
| Microsoft.Kusto/Clusters/Databases/read | Management Group | Read Kusto cluster databases |
| Microsoft.Kusto/clusters/read | Management Group | Read Kusto clusters (alternative) |
| Microsoft.Kusto/Clusters/read | Management Group | Read Kusto clusters |
| Microsoft.LabServices/labs/read | Management Group | Read Lab Services labs |
| Microsoft.LoadTestService/loadTests/read | Management Group | Read Load Test Service tests |
| Microsoft.Logic/integrationAccounts/read | Management Group | Read Logic integration accounts |
| Microsoft.Logic/workflows/read | Management Group | Read Logic workflows |
| Microsoft.Logic/workflows/versions/read | Management Group | Read Logic workflow versions |
| Microsoft.MachineLearningServices/workspaces/computes/read | Management Group | Read Machine Learning Services workspace computes |
| Microsoft.MachineLearningServices/workspaces/outboundRules/read | Management Group | Read Machine Learning Services workspace outbound rules |
| Microsoft.MachineLearningServices/workspaces/read | Management Group | Read Machine Learning Services workspaces |
| Microsoft.ManagedIdentity/userAssignedIdentities/read | Management Group | Read Managed Identity user assigned identities |
| Microsoft.ManagedServices/marketplaceRegistrationDefinitions/read | Management Group | Read Managed Services marketplace registration definitions |
| Microsoft.ManagedServices/registrationAssignments/read | Management Group | Read Managed Services registration assignments |
| Microsoft.Management/managementGroups/descendants/read | Management Group | Read Management Groups descendants |
| Microsoft.Management/managementGroups/read | Management Group | Read Management Groups |
| Microsoft.Management/managementGroups/subscriptions/read | Management Group | Read Management Groups subscriptions |
| Microsoft.Maps/accounts/read | Management Group | Read Maps accounts |
| Microsoft.Migrate/moveCollections/read | Management Group | Read Migrate move collections |
| Microsoft.MixedReality/ObjectAnchorsAccounts/read | Management Group | Read Mixed Reality Object Anchors accounts |
| Microsoft.monitor/accounts/read | Management Group | Read Monitor accounts |
| Microsoft.NetApp/netAppAccounts/capacityPools/read | Management Group | Read NetApp capacity pools |
| Microsoft.NetApp/netAppAccounts/capacityPools/volumes/read | Management Group | Read NetApp capacity pool volumes |
| Microsoft.NetApp/netAppAccounts/read | Management Group | Read NetApp accounts |
| Microsoft.Network/applicationGateways/read | Management Group | Read Application Gateways |
| Microsoft.Network/ApplicationGatewayWebApplicationFirewallPolicies/read | Management Group | Read Application Gateway Web Application Firewall Policies |
| Microsoft.Network/applicationSecurityGroups/read | Management Group | Read Application Security Groups |
| Microsoft.Network/azurefirewalls/read | Management Group | Read Azure Firewalls |
| Microsoft.Network/bastionHosts/read | Management Group | Read Bastion Hosts |
| Microsoft.Network/connections/read | Management Group | Read Network Connections |
| Microsoft.Network/ddosProtectionPlans/read | Management Group | Read DDoS Protection Plans |
| Microsoft.Network/dnsZones/read | Management Group | Read DNS Zones |
| Microsoft.Network/expressRouteCircuits/authorizations/read | Management Group | Read ExpressRoute Circuit authorizations |
| Microsoft.Network/expressRouteCircuits/peerings/connections/read | Management Group | Read ExpressRoute Circuit peerings connections |
| Microsoft.Network/expressRouteCircuits/peerings/peerConnections/read | Management Group | Read ExpressRoute Circuit peer connections |
| Microsoft.Network/expressRouteCircuits/peerings/read | Management Group | Read ExpressRoute Circuit peerings |
| Microsoft.Network/expressRouteCircuits/read | Management Group | Read ExpressRoute Circuits |
| Microsoft.Network/expressRouteCrossConnections/peerings/read | Management Group | Read ExpressRoute Cross Connections peerings |
| Microsoft.Network/expressRouteCrossConnections/read | Management Group | Read ExpressRoute Cross Connections |
| Microsoft.Network/expressRouteGateways/expressRouteConnections/read | Management Group | Read ExpressRoute Gateways connections |
| Microsoft.Network/expressRouteGateways/read | Management Group | Read ExpressRoute Gateways |
| Microsoft.Network/expressRoutePorts/authorizations/read | Management Group | Read ExpressRoute Ports authorizations |
| Microsoft.Network/expressRoutePorts/links/read | Management Group | Read ExpressRoute Ports links |
| Microsoft.Network/expressRoutePortsLocations/read | Management Group | Read ExpressRoute Ports locations |
| Microsoft.Network/expressRoutePorts/read | Management Group | Read ExpressRoute Ports |
| Microsoft.Network/firewallPolicies/read | Management Group | Read Firewall Policies |
| Microsoft.Network/frontDoors/backendPools/read | Management Group | Read Front Door backend pools |
| Microsoft.Network/frontDoors/frontendEndpoints/read | Management Group | Read Front Door frontend endpoints |
| Microsoft.Network/frontDoors/healthProbeSettings/read | Management Group | Read Front Door health probe settings |
| Microsoft.Network/frontDoors/loadBalancingSettings/read | Management Group | Read Front Door load balancing settings |
| Microsoft.Network/frontDoors/read | Management Group | Read front doors |
| Microsoft.Network/frontDoors/routingRules/read | Management Group | Read Front Door routing rules |
| Microsoft.Network/frontDoors/rulesEngines/read | Management Group | Read Front Door rules engines |
| Microsoft.Network/frontDoorWebApplicationFirewallPolicies/read | Management Group | Read Front Door Web Application Firewall Policies |
| Microsoft.NetworkFunction/azureTrafficCollectors/read | Management Group | Read Azure Traffic Collectors |
| Microsoft.Network/loadBalancers/read | Management Group | Read Load Balancers |
| Microsoft.Network/localnetworkgateways/read | Management Group | Read Local Network Gateways |
| Microsoft.Network/locations/usages/read | Management Group | Read Network locations usage |
| Microsoft.Network/natGateways/read | Management Group | Read NAT Gateways |
| Microsoft.Network/networkInterfaces/effectiveNetworkSecurityGroups/action | Management Group | View and/or execute effective network security groups action |
| Microsoft.Network/networkInterfaces/effectiveRouteTable/action | Management Group | Execute effective route table on NICs action |
| Microsoft.Network/networkInterfaces/read | Management Group | Read Network Interfaces |
| Microsoft.Network/networkSecurityGroups/defaultSecurityRules/read | Management Group | Read Network Security Groups default security rules |
| Microsoft.Network/networkSecurityGroups/read | Management Group | Read Network Security Groups |
| Microsoft.Network/networkSecurityGroups/securityRules/read | Management Group | Read Network Security Groups security rules |
| Microsoft.Network/networkWatchers/queryFlowLogStatus/\* | Management Group | Query NSG network watcher flow log status |
| Microsoft.Network/networkWatchers/read | Management Group | Read network watcher settings |
| Microsoft.Network/networkWatchers/read | Management Group | Read Network Watchers |
| Microsoft.Network/networkWatchers/securityGroupView/action | Management Group | View and/or execute effective security group view action |
| Microsoft.Network/p2sVpnGateways/read | Management Group | Read P2S VPN Gateways |
| Microsoft.Network/privateDnsZones/ALL/read | Management Group | Read Private DNS Zones ALL |
| Microsoft.Network/privateDnsZones/read | Management Group | Read Private DNS Zones |
| Microsoft.Network/privateEndpoints/privateDnsZoneGroups/read | Management Group | Read Private Endpoints DNS Zone Groups |
| Microsoft.Network/privateEndpoints/read | Management Group | Read Private Endpoints |
| Microsoft.Network/privateLinkServices/read | Management Group | Read Private Link Services |
| Microsoft.Network/publicIPAddresses/read | Management Group | Read Public IP Addresses |
| Microsoft.Network/publicIPPrefixes/read | Management Group | Read Public IP Prefixes |
| Microsoft.Network/routeFilters/read | Management Group | Read Route Filters |
| Microsoft.Network/routeFilters/routeFilterRules/read | Management Group | Read Route Filter Rules |
| Microsoft.Network/routeTables/read | Management Group | Read Route Tables |
| Microsoft.Network/routeTables/routes/read | Management Group | Read Route Table Routes |
| Microsoft.Network/serviceEndpointPolicies/read | Management Group | Read Service Endpoint Policies |
| Microsoft.Network/serviceEndpointPolicies/serviceEndpointPolicyDefinitions/read | Management Group | Read Service Endpoint Policy Definitions |
| Microsoft.Network/trafficManagerProfiles/read | Management Group | Read Traffic Manager Profiles |
| Microsoft.network/virtualnetworkgateways/connections/read | Management Group | Read Virtual network gateways connections |
| Microsoft.Network/virtualNetworkGateways/read | Management Group | Read Virtual Network Gateways |
| Microsoft.Network/virtualNetworks/read | Management Group | Read Virtual Networks |
| Microsoft.Network/virtualNetworks/subnets/read | Management Group | Read Virtual Network Subnets |
| Microsoft.Network/virtualNetworks/virtualNetworkPeerings/read | Management Group | Read Virtual Network Peerings |
| Microsoft.Network/virtualWans/read | Management Group | Read Virtual WANs |
| Microsoft.Network/virtualwans/vpnconfiguration/action | Management Group | Download and/or executie VPN configuration action |
| Microsoft.Network/vpnServerConfigurations/read | Management Group | Read VPN Server Configurations |
| Microsoft.NotificationHubs/Namespaces/NotificationHubs/read | Management Group | Read Notification Hubs |
| Microsoft.NotificationHubs/Namespaces/read | Management Group | Read Notification Hub namespaces |
| Microsoft.OperationalInsights/clusters/read | Management Group | Read Operational Insights clusters |
| Microsoft.OperationalInsights/querypacks/read | Management Group | Read Operational Insights query packs |
| Microsoft.OperationalInsights/workspaces/read | Management Group | Read Operational Insights workspaces |
| Microsoft.OperationalInsights/workspaces/tables/read | Management Group | Read Operational Insights workspace tables |
| Microsoft.Orbital/spacecrafts/read | Management Group | Read Orbital spacecrafts |
| Microsoft.PowerBIDedicated/capacities/read | Management Group | Read Power BI Dedicated capacities |
| Microsoft.PowerBIDedicated/servers/read | Management Group | Read Power BI Dedicated servers |
| Microsoft.Quantum/Workspaces/Read | Management Group | Read Quantum Workspaces |
| Microsoft.RecoveryServices/vaults/backupPolicies/read | Management Group | Read Recovery Services Vault backup policies |
| Microsoft.RecoveryServices/Vaults/backupProtectedItems/read | Management Group | Read Recovery Services Vault backup protected items |
| Microsoft.RecoveryServices/Vaults/read | Management Group | Read Recovery Services Vaults |
| Microsoft.RedHatOpenShift/openShiftClusters/read | Management Group | Read Red Hat OpenShift clusters |
| Microsoft.Relay/Namespaces/read | Management Group | Read Relay namespaces |
| Microsoft.Resources/Resources/read | Management Group | Read generic resources |
| Microsoft.Resources/subscriptions/providers/read | Management Group | Read subscription providers |
| Microsoft.Resources/subscriptions/read | Management Group | Read subscriptions |
| Microsoft.Resources/subscriptions/resourceGroups/read | Management Group | Read resource groups |
| Microsoft.Resources/subscriptions/resourceGroups/write | Management Group | Write resource groups |
| Microsoft.Resources/templateSpecs/read | Management Group | Read template specs |
| Microsoft.SaaS/applications/read | Management Group | Read SaaS applications |
| Microsoft.Search/searchServices/dataSources/read | Entire Subscription | Read Azure Search service data sources |
| Microsoft.Search/searchServices/indexers/read | Entire Subscription | Read Azure Search service indexers |
| Microsoft.Search/searchServices/indexes/documents/read | Entire Subscription | Read Azure Search service indexer documents |
| Microsoft.Search/searchServices/indexes/read | Entire Subscription | Read Azure Search service indexes |
| Microsoft.Search/searchServices/listAdminKeys/action | Entire Subscription | Retrieve the administrative API keys required to authenticate and manage the search service |
| Microsoft.Search/searchServices/listQueryKeys/action | Entire Subscription |  |
| Microsoft.Search/searchServices/PrivateEndpointConnectionsApproval/action | Entire Subscription |  |
| Microsoft.Search/searchServices/read | Entire Subscription | Read Azure Search services |
| Microsoft.Security/advancedThreatProtectionSettings/read | Management Group | Read Security advanced threat protection settings |
| Microsoft.Security/automations/read | Management Group | Read Security automations |
| Microsoft.Security/autoProvisioningSettings/read | Management Group | Read Security auto provisioning settings |
| Microsoft.Security/iotSecuritySolutions/read | Management Group | Read IoT Security Solutions |
| Microsoft.Security/locations/jitNetworkAccessPolicies/read | Management Group | Read Just-in-Time network access policies |
| Microsoft.Security/locations/read | Management Group | Read Security locations |
| Microsoft.Security/pricings/read | Management Group | Read Security pricings |
| Microsoft.Security/secureScores/read | Management Group | Read Security secure scores |
| Microsoft.Security/securityContacts/read | Management Group | Read Security contacts |
| Microsoft.Security/settings/read | Management Group | Read Security settings |
| Microsoft.Security/workspaceSettings/read | Management Group | Read Security workspace settings |
| Microsoft.ServiceBus/namespaces/authorizationRules/read | Management Group | Read Service Bus namespace authorization rules |
| Microsoft.ServiceBus/namespaces/networkrulesets/read | Management Group | Read Service Bus namespace network rule sets |
| Microsoft.ServiceBus/namespaces/privateEndpointConnections/read | Management Group | Read Service Bus namespace private endpoint connections |
| Microsoft.ServiceBus/namespaces/providers/Microsoft.Insights/diagnosticSettings/read | Management Group | Read Service Bus namespace diagnostic settings |
| Microsoft.ServiceBus/namespaces/queues/read | Management Group | Read Service Bus queues |
| Microsoft.ServiceBus/namespaces/read | Management Group | Read Service Bus namespaces |
| Microsoft.ServiceBus/namespaces/topics/read | Management Group | Read Service Bus topics |
| Microsoft.ServiceBus/namespaces/topics/subscriptions/read | Management Group | Read Service Bus topic subscriptions |
| Microsoft.ServiceFabric/clusters/read | Management Group | Read Service Fabric clusters |
| Microsoft.SignalRService/SignalR/read | Management Group | Read SignalR Service SignalR |
| Microsoft.SignalRService/WebPubSub/read | Management Group | Read SignalR Web PubSub |
| Microsoft.Solutions/applications/read | Management Group | Read Solutions applications |
| Microsoft.Sql/managedInstances/databases/read | Management Group | Read SQL managed instances databases |
| Microsoft.Sql/managedInstances/databases/transparentDataEncryption/read | Management Group | Read SQL managed instances databases Transparent Data Encryption |
| Microsoft.Sql/managedInstances/encryptionProtector/Read | Management Group | Read SQL managed instances encryption protector |
| Microsoft.Sql/managedInstances/read | Management Group | Read SQL managed instances |
| Microsoft.Sql/managedInstances/vulnerabilityAssessments/Read | Management Group | Read SQL managed instances vulnerability assessments |
| Microsoft.Sql/servers/administrators/read | Management Group | Read SQL server administrators |
| Microsoft.Sql/servers/auditingSettings/read | Management Group | Read SQL server auditing settings |
| Microsoft.Sql/servers/databases/auditingSettings/read | Management Group | Read SQL server databases auditing settings |
| Microsoft.Sql/servers/databases/dataMaskingPolicies/read | Management Group | Read SQL server databases data masking policies |
| Microsoft.Sql/servers/databases/dataMaskingPolicies/rules/read | Management Group | Read SQL server databases data masking policies rules |
| Microsoft.Sql/servers/databases/read | Management Group | Read SQL server databases |
| Microsoft.Sql/servers/databases/securityAlertPolicies/read | Management Group | Read SQL server databases security alert policies |
| Microsoft.Sql/servers/databases/transparentDataEncryption/read | Management Group | Read SQL server databases Transparent Data Encryption |
| Microsoft.Sql/servers/encryptionProtector/read | Management Group | Read SQL server encryption protector |
| Microsoft.Sql/servers/firewallRules/read | Management Group | Read SQL server firewall rules |
| Microsoft.Sql/servers/read | Management Group | Read SQL servers |
| Microsoft.Sql/servers/securityAlertPolicies/read | Management Group | Read SQL server security alert policies |
| Microsoft.Sql/servers/vulnerabilityAssessments/read | Management Group | Read SQL server vulnerability assessments |
| Microsoft.SqlVirtualMachine/sqlVirtualMachines/read | Management Group | Read SQL Virtual Machines |
| Microsoft.StorageCache/caches/read | Management Group | Read Storage Cache caches |
| Microsoft.StorageCache/Subscription/caches/read | Management Group | Read Storage Cache subscription caches |
| Microsoft.StorageMover/storageMovers/read | Management Group | Read Storage Mover storage movers |
| Microsoft.Storage/storageAccounts/blobServices/read | Management Group | Read Storage blob services |
| Microsoft.Storage/storageAccounts/fileServices/read | Management Group | Read Storage file services |
| Microsoft.Storage/storageAccounts/fileServices/shares/read | Management Group | Read Storage file shares |
| Microsoft.Storage/storageAccounts/listKeys/action | Management Group | List Storage account keys (action) |
| Microsoft.Storage/storageAccounts/providers/Microsoft.Insights/diagnosticSettings/read | Management Group | Read Storage account diagnostic settings |
| Microsoft.Storage/storageAccounts/queueServices/read | Management Group | Read Storage queue services |
| Microsoft.Storage/storageAccounts/read | Management Group | Read Storage accounts |
| Microsoft.Storage/storageAccounts/tableServices/read | Management Group | Read Storage table services |
| Microsoft.StorageSync/storageSyncServices/privateLinkResources/read | Management Group | Read Storage Sync private link resources |
| Microsoft.StorageSync/storageSyncServices/read | Management Group | Read Storage Sync services |
| Microsoft.StreamAnalytics/clusters/Read | Management Group | Read Stream Analytics clusters |
| Microsoft.StreamAnalytics/streamingjobs/Read | Management Group | Read Stream Analytics streaming jobs |
| Microsoft.Subscription/Policies/default/read | Management Group | Read Subscription default policies |
| Microsoft.Synapse/privateLinkHubs/privateLinkResources/read | Management Group | Read Synapse private link hubs private link resources |
| Microsoft.Synapse/privateLinkHubs/read | Management Group | Read Synapse private link hubs |
| Microsoft.Synapse/workspaces/privateLinkResources/read | Management Group | Read Synapse workspace private link resources |
| Microsoft.Synapse/workspaces/read | Management Group | Read Synapse workspaces |
| Microsoft.Synapse/workspaces/sparkConfigurations/read | Management Group | Read Synapse workspaces spark configurations |
| Microsoft.Synapse/workspaces/sqlPools/geoBackupPolicies/read | Management Group | Read Synapse workspaces SQL pools geo backup policies |
| Microsoft.Synapse/workspaces/sqlPools/read | Management Group | Read Synapse workspaces SQL pools |
| Microsoft.VideoIndexer/accounts/read | Management Group | Read Video Indexer accounts |
| Microsoft.VisualStudio/Account/Read | Management Group | Read Visual Studio accounts |
| Microsoft.Web/certificates/read | Management Group | Read Web certificates |
| Microsoft.Web/customApis/read | Management Group | Read Web custom APIs |
| Microsoft.Web/hostingEnvironments/Read | Management Group | Read Web hosting environments |
| Microsoft.Web/serverfarms/Read | Management Group | Read Web server farms |
| Microsoft.web/serverfarms/sites/read | Management Group | Read Server farms sites |
| Microsoft.Web/sites/basicPublishingCredentialsPolicies/Read | Management Group | Read Web sites basic publishing credentials policies |
| Microsoft.web/sites/config/appsettings/read | Management Group | Read Web sites app settings |
| Microsoft.Web/sites/config/list/action | Management Group | Execute action to list Web site configuration |
| Microsoft.Web/sites/config/read | Management Group | Read Web sites configuration |
| Microsoft.web/sites/functions/action | Management Group | Invoke or trigger specific Azure Functions hosted within a Web App/Function App |
| Microsoft.web/sites/functions/read | Management Group | Read Web Sites functions |
| Microsoft.Web/sites/privateEndpointConnections/Read | Management Group | Read Web sites private endpoint connections |
| Microsoft.Web/sites/publishxml/Action | Management Group | Retrieve the publishing profile (XML) used to authenticate and deploy code or configurations to the Azure Web App |
| Microsoft.Web/sites/read | Management Group | Read Web sites |
| Microsoft.Web/sites/Read | Management Group | Read Web sites |
| Microsoft.Web/sites/slots/Read | Management Group | Read Web sites slots |
| Microsoft.Web/staticSites/Read | Management Group | Read Web static sites |
| Microsoft.Workloads/monitors/read | Management Group | Read Workloads monitors |
| Organization.Read.All | Tenants or management groups using Microsoft Graph | Read all properties and data of the current Azure Active Directory (AD) organization (tenant) |
| Policy.Read.All | Tenants or management groups using Microsoft Graph | Read all policies configured in Azure Active Directory (AD) |
| Policy.ReadWrite.AuthenticationMethod | Tenants or management groups using Microsoft Graph | Read and write (configure/modify) all user authentication methods in Azure Active Directory (AD) |
| \*/read | Management Group | Read-only access, used to get metadata of all managed data assets in the subscription |
| RoleManagement.Read.All | Tenants or management groups using Microsoft Graph | Read all Azure Active Directory (AD) role definitions and role assignments within the organization |
| User.Read.All | Tenants or management groups using Microsoft Graph | Read the full set of profile properties and data for every user in the organization's directory |

Log Collection

| Permission | Scope | Purpose |
| --- | --- | --- |
| Azure Event Hubs Data Receiver | Event Hub namespaces starting with the prefix `CortexEventHubNamespace` | Used for audit log collection. Logs are collected via Event Hubs and are later collected. |
| Storage Blob Data Contributor | Resources starting with the prefix `cxa` | Used for audit log collection. Logs are stored in a dedicated storage account and are later collected. |

Registry Scan

| Permission | Scope | Purpose |
| --- | --- | --- |
| Microsoft.ContainerRegistry/registries/metadata/read | Management Group | Enable the retrieval of manifest and tag information for images stored in the container registry |
| Microsoft.ContainerRegistry/registries/pull/read | Management Group | Enable the pulling (downloading) of container images from the repository for scanning or deployment |
| Microsoft.ContainerRegistry/registries/read | Management Group | Enable the reading of general properties and metadata about the container registry itself |
| Microsoft.ContainerRegistry/registries/webhooks/getCallbackConfig/action | Management Group | Enable the retrieval of the callback URL and configuration details for a registry webhook |

Outposts

| Permission | Scope | Purpose |
| --- | --- | --- |
| Microsoft.Compute/disks/delete | Resource group | Delete disks after scanning has finished. This action is critical for remediation and resource hygiene, preventing data exfiltration, and reducing the attack surface. For example, the outpost can delete dangling disks, which are a significant security risk. |
| Microsoft.Compute/disks/read | Resource group | Retrieve disk metadata for identifying, for example, dangling disks. |
| Microsoft.Compute/disks/write | Resource group | Create a disk from a snapshot before attaching it to a workload. This permission is essential for dynamic scanning and analysis. It enables the creation of a temporary disk copy from a snapshot, a necessary step to analyze a workload without affecting the live environment. |
| Microsoft.Compute/locations/usages/read | Resource group | View regional usage and quota limits for compute resources |
| Microsoft.Compute/skus/read | Resource group | View available VM sizes (SKUs) for dynamic size selection |
| Microsoft.Compute/virtualMachines/delete | Resource group | Delete a scanner or proxy VM. This permission is necessary for secure lifecycle management. It ensures that Cortex Cloud can clean up and delete temporary VMs, such as scanner or proxy VMs, after a security task is complete. This prevents them from becoming an unmonitored risk. |
| Microsoft.Compute/virtualMachines/read | Resource group | View a scanner or proxy VM |
| Microsoft.Compute/virtualMachines/write | Resource group | Create a scanner or proxy VM. This is a core provisioning permission required to dynamically deploy security resources. This is needed for creating ephemeral scanner or proxy VMs that are spun up to perform specific security tasks. |
| Microsoft.ManagedIdentity/userAssignedIdentities/assign/action | Resource group | Assign a user-assigned managed identity to a resource. This is a fundamental permission for secure, credential-less access. It allows the outpost to assign a managed identity to a resource, which is a best practice for securely authenticating to other Azure services without needing to store or manage static credentials. |
| Microsoft.Network/applicationSecurityGroups/joinIpConfiguration/action | Resource group | Attach an NIC IP configuration to an Application Security Group. This permission is required for Cortex Cloud to perform its core security functions, ensuring it has the necessary access to monitor and manage resources within the customer's account. |
| Microsoft.Network/networkInterfaces/delete | Resource group | Delete NICs. This delete permission is critical for network security hygiene. It allows Cortex to clean up temporary or unused network resources, such as network interfaces (NICs) or public IPs, to prevent them from becoming dangling resources and a potential security risk. |
| Microsoft.Network/networkInterfaces/join/action | Resource group | Attach NICs to VMs. This permission is necessary for secure network configuration. It enables Cortex to connect a VM's network interface to the correct subnet or security group, ensuring it can communicate securely and in accordance with the network's security policy. |
| Microsoft.Network/networkInterfaces/read | Resource group | View network interface (NIC) properties. |
| Microsoft.Network/networkInterfaces/write | Resource group | Create or update NICs. This write permission is required to configure the network for secure operations. It allows Cortex to create or update network components like NICs, public IPs, or private endpoints, which is necessary to ensure secure and isolated communication for its security tools. |
| Microsoft.Network/networkSecurityGroups/join/action | Resource group | Associate NICs or subnets with a Network Security Group. This permission is necessary for secure network configuration. It enables Cortex to connect a VM's network interface to the correct subnet or security group, ensuring it can communicate securely and in accordance with the network's security policy. |
| Microsoft.Network/operations/read | Resource group | View available network-related operations used for work with private endpoints. |
| Microsoft.Network/privateEndpoints/delete | Resource group | Delete permission is critical for network security hygiene. It allows Cortex to clean up temporary or unused network resources, such as network interfaces (NICs) or public IPs, to prevent them from becoming dangling resources and a potential security risk. |
| Microsoft.Network/privateEndpoints/read | Resource group | View private endpoint properties. |
| Microsoft.Network/privateEndpoints/write | Resource group | Create or update private endpoints. This write permission is required to configure the network for secure operations. It allows Cortex to create or update network components like NICs, public IPs, or private endpoints, which is necessary to ensure secure and isolated communication for its security tools. |
| Microsoft.Network/publicIPAddresses/delete | Resource group | Delete unused public IPs. This delete permission is critical for network security hygiene. It allows Cortex to clean up temporary or unused network resources, such as network interfaces (NICs) or public IPs, to prevent them from becoming dangling resources and a potential security risk. |
| Microsoft.Network/publicIPAddresses/join/action | Resource group | Attach public IPs to NIC of proxy VM. This permission is necessary for secure network configuration. It enables Cortex to connect a VM's network interface to the correct subnet or security group, ensuring it can communicate securely and in accordance with the network's security policy. |
| Microsoft.Network/publicIPAddresses/read | Resource group | List existing static public IPs that can be used by proxy VMs. |
| Microsoft.Network/publicIPAddresses/write | Resource group | Create or update public IPs. This write permission is required to configure the network for secure operations. It allows Cortex to create or update network components like NICs, public IPs, or private endpoints, which is necessary to ensure secure and isolated communication for its security tools. |
| Microsoft.Network/virtualNetworks/subnets/join/action | Resource group | Attach NICs to a subnet. This permission is necessary for secure network configuration. It enables Cortex to connect a VM's network interface to the correct subnet or security group, ensuring it can communicate securely and in accordance with the network's security policy. |
| Microsoft.Network/virtualNetworks/subnets/joinViaServiceEndpoint/action | Resource group | Enable usage of a subnet’s service endpoint by scanner VM to access managed services. This permission is necessary for secure network configuration. It enables Cortex to connect a VM's network interface to the correct subnet or security group, ensuring it can communicate securely and in accordance with the network's security policy. |
| Microsoft.ResourceGraph/resources/read | Resource group | Query spot eviction history rates using Azure Resource Graph for dynamic VM size selection. |

Onboarding managed identity

Managed identity is used by compliance policy to onboard the subscriptions.

| Permission | Scope | Purpose |
| --- | --- | --- |
| Microsoft.Authorization/policyAssignments/\* | Management Group and Tenant | Assign compliance policies. When onboarding, we assign a compliance policy to the selected management group or tenant. |
| Microsoft.Authorization/policyDefinitions/\* | Management Group and Tenant | Define compliance policies to ensure all subscriptions within a management group are fully onboarded |
| Microsoft.Authorization/\*/read | Management Group and Tenant | Read audit log collection |
| Microsoft.Authorization/roleAssignments/\* | Management Group and Tenant | Assign role to the onboarding identity. Used to onboard subscriptions. Roles and assignments are used by different modules to grant minimal access to the monitored subscription. |
| Microsoft.Authorization/roleDefinitions/\* | Management Group and Tenant | Create a role for the onboarding identity. Used to onboard subscriptions. Roles and assignments are used by different modules to grant minimal access to the monitored subscription. |
| Microsoft.Compute/galleries/\* | Management Group and Tenant | Used to onboard the ADS module. Gallery is used for image scanning |
| Microsoft.EventHub/namespaces/\* | Management Group and Tenant | Audit logs are collected by Event Hubs and later collected for analysis |
| Microsoft.Insights/diagnosticSettings/\* | Management Group and Tenant | Diagnostic settings are part of the audit logs that are collected by Event Hubs and later collected for analysis |
| Microsoft.Resources/deployments/\* | Management Group and Tenant | Used to create deployments that will onboard future subscriptions. The deployments are created by remediation tasks for the Cortex compliance policy created when first onboarding. |
| Microsoft.Resources/subscriptions/read | Management Group and Tenant | Facilitate onboarding of subscriptions in the defined scope |
| Microsoft.Resources/subscriptions/resourceGroups/\* | Management Group and Tenant | Used to onboard subscriptions. The resource group is used by different modules for scanning and to facilitate workload separation. |

Automations

| Permission | Scope | Purpose |
| --- | --- | --- |
| Microsoft.Authorization/policyAssignments/read | Subscription | Read the configuration of Microsoft Defender for Cloud policy assignments |
| Microsoft.Authorization/policyAssignments/write | Subscription | Apply Microsoft Defender for Cloud policy assignments to enable security configurations monitoring. This helps remediate issues detected by the "Azure Microsoft Defender for Cloud security configurations monitoring is set to disabled" rule. |
| Microsoft.Compute/disks/read | Subscription | Read the configuration of the Azure VM disk |
| Microsoft.Compute/disks/write | Subscription | Modify the Azure VM disk configuration to disable public network access. This helps remediate issues detected by the "Azure VM disk configured with public network access" rule. |
| Microsoft.Compute/virtualMachines/powerOff/action | Subscription | Power off an existing Azure Virtual Machine. This permission is specifically required to change the state of a VM from `Running` to `Stopped` or `Deallocated`. It is necessary when you want the VM to stop running and thus stop incurring compute charges, unlike the delete permission which removes the resource entirely. Required for command: `azure-vm-instance-power-off` |
| Microsoft.Compute/virtualMachines/read | Subscription | Read the status and configuration details of an existing Azure Virtual Machine (VM). This permission is necessary for any monitoring, inventory, or auditing system that needs to know information like the VM size, operating system, network configuration, tags, and whether the VM is currently running or stopped. Required for command: `azure-vm-instance-details-get` |
| Microsoft.Compute/virtualMachines/start/action | Subscription | Power on an existing Azure Virtual Machine (VM) to change the state of a VM from `Stopped` to `Running`. Required for command: `azure-vm-instance-start` |
| Microsoft.Consumption/budgets/read | Subscription | Read the configuration and current status of established Azure budgets |
| Microsoft.Consumption/usageDetails/read | Subscription | Read detailed usage information for resources, including costs and quantity |
| Microsoft.ContainerRegistry/registries/read | Subscription | Read the configuration of the Azure Container Registry (ACR) |
| Microsoft.ContainerRegistry/registries/write | Subscription | Update the Azure Container Registry (ACR) configuration to disable exports. This helps remediate issues detected by the "Azure Container Registry with exports enabled" rule. |
| Microsoft.CostManagement/forecast/read | Subscription | Read predictive forecasts and historical trends for future Azure costs |
| Microsoft.DBforMySQL/flexibleServers/configurations/read | Subscription | Read the configuration settings of the Azure MySQL flexible server |
| Microsoft.DBforMySQL/flexibleServers/configurations/write | Subscription | Update the Azure MySQL flexible server configuration to enforce SSL. This helps remediate issues detected by the "Azure MySQL database flexible server SSL enforcement is disabled" rule. |
| Microsoft.DBforPostgreSQL/servers/configurations/read | Subscription | Read the configurations of the Azure PostgreSQL server |
| Microsoft.DBforPostgreSQL/servers/configurations/write | Subscription | Update the Azure PostgreSQL server configurations to enable the connection throttling parameter. This helps remediate issues detected by the "Azure PostgreSQL database server with connection throttling parameter is disabled" rule. |
| Microsoft.DBforPostgreSQL/servers/read | Subscription | Read the configuration of the Azure PostgreSQL server |
| Microsoft.DBforPostgreSQL/servers/write | Subscription | Update the Azure PostgreSQL server configuration to enable the SSL connection feature. This helps remediate issues detected by the "Azure PostgreSQL database server with SSL connection disabled" rule. |
| Microsoft.DocumentDB/databaseAccounts/read | Subscription | Read the configuration of the Azure Cosmos DB database account |
| Microsoft.DocumentDB/databaseAccounts/write | Subscription | Modify the Azure Cosmos DB account to disable key-based metadata write authentication. This helps remediate issues detected by the "Azure Cosmos DB key based authentication is enabled" rule. |
| Microsoft.Insights/logprofiles/read | Subscription | Read the configuration of the Azure Activity Log profile |
| Microsoft.Insights/logprofiles/write | Subscription | Set the Azure Activity Log retention period to 365 days or more. This helps remediate issues detected by the "Azure Activity Log retention should not be set to less than 365 days" rule. |
| Microsoft.KeyVault/vaults/read | Subscription | Read the configuration and properties of the Azure Key Vault |
| Microsoft.KeyVault/vaults/write | Subscription | Modify the Key Vault configuration to ensure it is recoverable. This helps remediate issues detected by the "Azure Key Vault is not recoverable" rule. |
| Microsoft.Network/networkInterfaces/read | Subscription | Read the list of Network Security Group (NSG) Interfaces. Required for command: `azure-nsg-network-interfaces-list` |
| Microsoft.Network/networkSecurityGroups/read | Subscription | Read the list of the Network Security Groups (NSGs). Required for command: `azure-nsg-security-groups-list` |
| Microsoft.Network/networkSecurityGroups/securityRules/delete | Subscription | Delete a Network Security Group (NSG) rule to stop overly permissive outbound traffic. This helps remediate issues detected by the "Azure Network Security Group with overly permissive outbound rule" rule. Required for command: `azure-nsg-security-rule-delete` |
| Microsoft.Network/networkSecurityGroups/securityRules/read | Subscription | Read the configuration of a Network Security Group (NSG) rule to assess traffic permissions. Required for command: `azure-nsg-security-rule-get` |
| Microsoft.Network/networkSecurityGroups/securityRules/write | Subscription | Modify a Network Security Group (NSG) rule to stop overly permissive outbound traffic. This helps remediate issues detected by the "Azure Network Security Group with overly permissive outbound rule" rule. Required for command: `azure-nsg-security-rule-create` |
| Microsoft.Network/publicIPAddresses/read | Subscription | Read and list the Network Security Group (NSG) and VM public IP addresses and details. Required for commands: `azure-nsg-public-ip-addresses-list` and `azure-vm-public-ip-details-get` |
| Microsoft.Resources/subscriptions/read | Subscription | Read the status and details of an Azure subscription. Required for command: a`zure-nsg-subscriptions-list` |
| Microsoft.Resources/subscriptions/resourceGroups/read | Subscription | Read the status and details of resource groups within a subscription. Required for command: `azure-nsg-resource-group-list` |
| Microsoft.Sql/servers/databases/securityAlertPolicies/read | Subscription | Read the security alert policy configuration for an Azure SQL Database |
| Microsoft.Sql/servers/databases/securityAlertPolicies/write | Subscription | Update the security alert policy for an Azure SQL Database to enable email notifications for Threat Detection. This helps remediate issues detected by the "Azure SQL Databases with disabled Email service and co-administrators for Threat Detection" rule. |
| Microsoft.Sql/servers/databases/transparentDataEncryption/read | Subscription | Read the Transparent Data Encryption (TDE) status for an Azure SQL database |
| Microsoft.Sql/servers/databases/transparentDataEncryption/write | Subscription | Enable Transparent Data Encryption (TDE) on an Azure SQL database. This helps remediate issues detected by the "Azure SQL database Transparent Data Encryption (TDE) encryption disabled" rule. |
| Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read | Subscription | Read or download the content of a blob (file) stored in Azure Storage. This permission is necessary for any application or user that needs to access the actual data stored inside the containers of an Azure Storage Account. Required for commands: `azure-storage-container-blob-get` and `azure-storage-container-blob-property-get` |
| Microsoft.Storage/storageAccounts/blobServices/containers/blobs/tags/read | Subscription | Read the index tags (metadata) applied to a specific blob (file) in Azure Storage. This permission is necessary for any application or user that needs to query or filter blobs based on the custom tags applied to them, without necessarily reading the entire blob content. Required for command: `azure-storage-container-blob-tag-get` |
| Microsoft.Storage/storageAccounts/blobServices/containers/blobs/tags/write | Subscription | Write, set, or update the index tags (metadata) applied to a specific blob (file) in Azure Storage. This permission is necessary for any application or user that needs to modify the custom index tags on blobs, which is crucial for data lifecycle management and searching. Required for command: `azure-storage-container-blob-tag-set` |
| Microsoft.Storage/storageAccounts/blobServices/containers/blobs/write | Subscription | Write, upload, or create a new blob (file) in Azure Storage, or overwrite the content of an existing blob. This permission is necessary for any application or user that needs to store new data or modify existing file data within the containers of an Azure Storage Account. Required for command: `azure-storage-container-blob-property-set` |
| Microsoft.Storage/storageAccounts/blobServices/containers/delete | Subscription | Enable delete functionality on the Azure Storage account blob service containers. Required for command: `azure-storage-container-delete` |
| Microsoft.Storage/storageAccounts/blobServices/containers/read | Subscription | Read the configuration of Azure Storage account blob service containers. Required for command: `azure-storage-container-property-get` |
| Microsoft.Storage/storageAccounts/blobServices/containers/setAcl/action | Subscription | Set or modify the access control list (ACL) for folders or files within a storage container |
| Microsoft.Storage/storageAccounts/blobServices/containers/write | Subscription | Enable modification of Azure Storage account blob service containers. Required for command: `azure-storage-blob-containers-update` |
| Microsoft.Storage/storageAccounts/blobServices/read | Subscription | Read the configuration of the Azure Storage account blob service. Required for command: `azure-storage-blob-service-properties-get` |
| Microsoft.Storage/storageAccounts/blobServices/write | Subscription | Enable soft delete functionality on the Azure Storage account blob service. This helps remediate issues detected by the "Azure Storage account soft delete is disabled" rule. |
| Microsoft.Storage/storageAccounts/read | Subscription | Read the configuration of the Azure Storage Account |
| Microsoft.Storage/storageAccounts/write | Subscription | Enable access for trusted Microsoft services. This helps remediate issues detected by the "Azure Storage Account 'Trusted Microsoft Services' access not enabled" rule. |
| Microsoft.Web/sites/config/read | Subscription | Read the configuration settings of the Azure App Service Web app |
| Microsoft.Web/sites/config/write | Subscription | Set the HTTP version to 2.0 within the Azure App Service Web app configuration. This helps remediate issues detected by the "Azure App Service Web app doesn't use HTTP 2.0" rule. |
| Microsoft.Web/sites/read | Subscription | Read the status and properties of the Azure App Service Web app |
| Microsoft.Web/sites/write | Subscription | Set the HTTPS-only feature for the Azure App Service Web app to enforce redirection from HTTP to HTTPS. This helps remediate issues detected by the "Azure App Service Web app doesn't redirect HTTP to HTTPS" rule. Required for command: `azure-webapp-update` |

##### Oracle Cloud Infrastructure provider permissions

List of Oracle Cloud Infrastructure provider permissions for Cortex Cloud.

ADS

| Permission | Module | Scope | Purpose |
| :-- | :-: | :-- | :-- |
| Admit group CortexOutpostGroup of tenancy CortexOutpost to use volumes in tenancy | ADS | In tenancy | Allow creation of backups from volumes |
| Admit group CortexOutpostGroup of tenancy CortexOutpost to use key-delegate in tenancy | ADS | In tenancy | Re-encrypt backups during copy/restore operations |
| Admit group CortexOutpostGroup of tenancy CortexOutpost to associate keys in tenancy with volumes in tenancy CortexOutpost | ADS | Volumes in tenancy | Associate encryption keys with volumes during backup/restore |
| Admit group CortexOutpostGroup of tenancy CortexOutpost to use tag-namespaces in tenancy | ADS | In tenancy | Enable tagging for permission scoping, resource tracking, and cost visibility |
| Admit group CortexOutpostGroup of tenancy CortexOutpost to manage boot-volume-backups in tenancy where request.operation != 'DeleteBootVolumeBackup' | ADS | Excludes delete | Allow full management of boot volume backups except deletion |
| Admit group CortexOutpostGroup of tenancy CortexOutpost to manage boot-volume-backups in tenancy where target.resource.tag.cortex_m-o-lcaas_id.panw_capability = 'cortex-scan-platform' | ADS | Only boot-volume-backups tagged with panw_capability = cortex-scan-platform | Restrict deletion to Cortex scan-related resources only |
| Admit group CortexOutpostGroup of tenancy CortexOutpost to read all-resources in tenancy | ADS | In tenancy | Read-only access to all resources |

Discovery Engine

"Discovery Engine" read only access. Grants read-only access to OCI tenancy and resources.

Registry Scan

Table 2. Dynamic Group Permissions

| Permission | Scope | Purpose |
| --- | --- | --- |
| Allow dynamic-group registry-scan to manage buckets in tenancy | Tag-scoped (project_id) | Manage Object Storage buckets for scan artifacts/results |
| Allow dynamic-group registry-scan to manage objects in tenancy | Tag-scoped (project_id) | Upload/download image layers, manifests, and reports |
| Allow dynamic-group registry-scan to read secret-bundles in tenancy | Tag-scoped (project_id) | Retrieve registry credentials from OCI Vault |
| Endorse dynamic-group registry-scan to read repos in any-tenancy | Cross-tenancy | Allow cross-tenancy image pulls for scans |

  

Table 3. Inherited Base Permissions for Registry scanning

| Permission | Scope | Purpose |
| --- | --- | --- |
| Allow any-user to manage buckets in tenancy | Tag-scoped (project_id) | Create/manage buckets for scan data |
| Allow any-user to manage objects in tenancy | Tag-scoped (project_id) | Read/write objects (artifacts, logs, results) |
| Allow any-user to use keys in tenancy | Tag-scoped (project_id) | Decrypt secrets for registry access |
| Allow any-user to manage secret-versions in tenancy | Tag-scoped (project_id) | Rotate credentials and manage secret versions |
| Allow any-user to manage secrets in tenancy | Tag-scoped (project_id) | Create/update secrets for scanners |
| Allow any-user to manage secret-family in tenancy | Tag-scoped (project_id) | Broader secret-management rights |
| Allow any-user to manage vaults in tenancy | Tag-scoped (project_id) | Create/administer Vaults for key and secret storage |
| Allow any-user to inspect tag-family in tenancy | Global | Discover tag namespaces/definitions |
| Allow any-user to use tag-family (namespace=cortex_cloud, managed_by=PANW) | Restricted | Restrict tag usage to Palo Alto-managed groups |
| Endorse any-group to use tag-namespaces in any-tenancy | Cross-tenancy | Allow tag namespace usage across tenancies |

### Onboard the Kubernetes Connector

To onboard your Kubernetes cluster, choose the capabilities that fit your needs and download the Helm chart values. Install the Helm charts in your Kubernetes environment to grant Cortex Cloud permissions to collect the data.

Follow this wizard to deploy your Kubernetes Connector. The Kubernetes onboarding wizard is designed to facilitate the seamless setup of Kubernetes data into Cortex Cloud. The guided experience requires minimal user input; simply select the capabilities that fit your needs and download the custom installer file. For full control of the setup, you can use the advanced settings. Based on the onboarding settings, Cortex Cloud then creates a custom installer file for running in your Kubernetes environment. This file, once executed in your Kubernetes environment, grants Cortex Cloud the necessary permissions to collect the data. The installer file must be executed in your Kubernetes environment to complete the onboarding process. The connector then appears in Kubernetes Connectors.

1.  Navigate to Settings → Data Sources & Integrations.
    
2.  On the Add Data Sources & Integrations page, click Create Integration, search for Kubernetes, then hover over it and click Add Another Instance.
    
3.  In the Kubernetes Connect onboarding wizard, enable the solutions that fit your needs:
    
    -   Posture Management: (Enabled by default) A lightweight posture management solution for continuous discovery, policy enforcement, and proactive scanning of vulnerabilities, secrets, malware, compliance, and misconfigurations.
        
    -   Realtime Protection: A solution that monitors workloads in real time to detect and block malicious activity, instantly preventing attacks as they happen.
        
    
4.  (Optional) Click Edit to configure advanced settings and then click Apply Changes:
    
    -   Posture Management:
        
        | Setting | Notes |
        | --- | --- |
        | Scan Cadence (Hours) | Define how often to scan (from every one to 24 hours). Default is 12 hours. |
        | Policy Enforcement by the Admission Controller | Select to allow enforcement policies to be configured, ensuring that only compliant resources are admitted into the cluster. |
        | Registry Scanning (OpenShift Only) | Select this option to scan OpenShift Platform Registry images for vulnerabilities, malware, and exposed secrets. Select the scanning configuration option to enable security checks for your images: All (Default) Scans all container images, including all versions (tags), in all discovered repositories.; Latest tag: Scans only images tagged 'latest' in all discovered repositories.; Day modified: Scans container images created or modified in the last few days. You can select a range of up to 90 days for the scan. The default is set to 7. Refer to OpenShift container registry for information on the instances that were automatically created by the Kubernetes deployment.OpenShift container registry |
        
    -   Realtime Protection:
        
        **Note:**
        
        This option is not supported for Fargate.
        
        **Note:**
        
        Enabling Realtime Protection installs the agent on your Kubernetes clusters as a DaemonSet.
        
        | Setting | Notes |
        | --- | --- |
        | Node Selector | Enter node labels to have the agent run on nodes that match the node labels. |
        | Run on all nodes (Including Master)/Run only on master node |  |
        | Deployment Platform | Select the Kubernetes deployment platform: Standard; Bottlerocket OS; Google GCOS; OpenShift |
        
    
5.  (Optional) Click Edit Profile to customize the Kubernetes Connector's profile:
    
    | Setting | Notes |
    | --- | --- |
    | Profile Name | A profile name is automatically generated, including the date and time of creation. You can manually change the profile name. |
    | Version | Select which version of the Kubernetes Connector to install. |
    | Cluster Resource Identifier | (Optional) Enter the Kubernetes cluster resource identifier. If you do not specify the resource identifier, the installer will identify the cluster on its own. \*\*Note:\*\* For Fargate, you must provide the cluster resource identifier. The format of the identifier is `arn:aws:eks:<region>:<account-id>:cluster/<cluster-name>`. |
    | Namespace | Enter the name for the Kubernetes namespace. The default is "panw". To ensure proper data parsing in an AWS Fargate environment, a Fargate Profile must be explicitly configured for the namespace where the connector is installed (typically panw) and for the kube-system namespace if the cluster is fully Fargate-based. Because the system identifies Fargate clusters by scanning for active workloads during deployment, a Fargate profile that contains no running pods will not be recognized as such. Furthermore, since this detection occurs at installation, any transition from EC2 to Fargate requires an agent update to trigger a new scan and ensure the environment is correctly identified and monitored. |
    | Proxy Gateway | Enable this option if network traffic between Cortex Cloud and your Kubernetes cluster must route through a proxy gateway. Enter the following details: Proxy IP: The full IP address and port number for your HTTP proxy server. For example: `192.168.1.1:8080`; Authentication: Select None or Basic. Enter the username and password for a proxy user account that has permission to pass traffic to the Kubernetes cluster. \*\*Note:\*\* Basic authentication is only supported in Posture Management. If deploying Realtime Protection, select None . |
    | Auto Upgrade | Enable Auto Upgrade to ensure the Kubernetes Connector and its installed capabilities are automatically updated to a newer version when available. This minimizes manual maintenance and ensures continuous access to the latest features and security patches. Select the Upgrade Strategy: Latest Available Version (GA): Automatically upgrade to the newest version as soon as it is released to gain immediate access to all new features.; One release before the latest one (N-1): Maintain a policy to always remain one version behind the latest available release. \*\*Note:\*\* If you install the latest version but select the N-1 strategy, this policy will take effect starting from the next upgrade cycle (it will not immediately downgrade your current installation). Select Advanced to customize the upgrade schedule. Define whether to be upgraded immediately or to delay the upgrade by a specified number of days. You can then specify the preferred day and time for the upgrade to be applied. |
    
6.  Click Generate.
    
7.  To complete the onboarding of the Kubernetes Connector, you must download the Helm chart values `values.yaml` and run it in your Kubernetes environment: `helm repo add cortex https://paloaltonetworks.github.io/cortex-cloud --force-update`
    
8.  Install the Helm charts in your Kubernetes environment: ``helm upgrade --install konnector cortex/konnector --wait-for-jobs --create-namespace --namespace panw --values `<profile-name>`.values.yaml``
    
9.  Verify the deployment succeeded when you see "Status: Deployed".
    
    When the Kubernetes Connector is deployed, the initial discovery scan is started, and the connector appears in Data Sources & Integrations → Kubernetes → Kubernetes Connectors.

#### What's new in Kubernetes Connector?
This topic describes the changes, additions, known issues, and fixes for each version of the Kubernetes Connector. If Auto Upgrade is enabled in your Kubernetes Connector, you will automatically enjoy the latest released features without having to manually upgrade to the new version.

##### Kubernetes Connector releases

Cortex Cloud supports the following current Kubernetes Connector versions. Click the link to view the new features, addressed issues, and known issues per release.

| Release version | Release notes | Release date |
| --- | --- | --- |
| 1.3 | Kubernetes Connector version 1.3 | Nov 9, 2025 |
| 1.2 | Kubernetes Connector version 1.2 | July 20, 2025 |

##### Kubernetes Connector version 1.3

New features

The following section describes the new features introduced in Kubernetes Connector version 1.3.

| Feature | Description |
| --- | --- |
| Unified Kubernetes Onboarding | Streamlined Kubernetes onboarding process in a single, easy-to-use wizard. Now you can discover all available security capabilities based on your license, configure everything in one flow, and deploy your entire solution with one consolidated installer. |
| Kubernetes Connector | Supports AKS, EKS, GKE, managed OpenShift, self-managed Kubernetes vanilla clusters, and self-managed OpenShift with a Kubernetes Native installation method of Helm Installer. For more details, see Supported Kubernetes distributions. |
| KSPM Dashboard | A visual overview of your Kubernetes security posture. It includes inventory insights, protection coverage, most vulnerable clusters, malware and secrets detected, and more. |
| Compliance standards | Enjoy out-of-the-box CIS compliance standards for Kubernetes environments (CIS EKS, CIS GKE, CIS AKS, CIS OpenShift, and CIS Kubernetes). |
| Secrets, malware, and vulnerabilities | Generate secret, malware, and vulnerabilities posture issues by declaring policies on Kubernetes clusters |

Known limitations

The following table describes known limitations in the Kubernetes Connector release.

| Feature | Description |
| --- | --- |
| Connector onboarding and cluster identifier | The Kubernetes Connector automatically calculates the Kubernetes cluster cloud identifier by using the metadata service (for EKS and GKE) and cluster resources (for AKS). For EKS and GKE, the metadata service must be enabled. |

##### Kubernetes Connector version 1.2

New features

The following section describes the new features introduced in Kubernetes Connector version 1.2.

| Feature | Description |
| --- | --- |
| Kubernetes Connector Onboarding | Supports AKS, EKS, GKE, managed OpenShift, and self-managed Kubernetes Vanilla clusters, with a Kubernetes Native installation method of Helm Installer. |
| KSPM Dashboard | A visual overview of your Kubernetes security posture. It includes inventory insights, protection coverage, riskiest clusters, and more. |
| Compliance standards | Enjoy out-of-the-box CIS compliance standards for Kubernetes environments (CIS EKS, CIS GKE, CIS AKS, CIS OpenShift, and CIS Kubernetes). |
| Secrets, malware, and vulnerabilities | Generate secret, malware, and vulnerabilities posture issues by declaring policies on Kubernetes clusters |
| Kubernetes internet exposure | r |

Known limitations

The following table describes known limitations in the Kubernetes Connector release.

| Feature | Description |
| --- | --- |
| Connector onboarding and cluster identifier | The Kubernetes Connector automatically calculates the Kubernetes cluster cloud identifier by using the metadata service (for EKS and GKE) and cluster resources (for AKS). For EKS and GKE, the metadata service must be enabled. |

#### Supported Kubernetes distributions
The following are the supported Kubernetes platform versions for the Kubernetes connector (Posture Management). The table shows the latest version that is supported. We support n-3 versions of each supported Kubernetes environment.

| Kubernetes environment | Notes |
| --- | --- |
| Managed clusters | Amazon Elastic Kubernetes Service (EKS); Microsoft Azure Kubernetes Service (AKS); Google Kubernetes Engine (GKE) |
| Managed OpenShift | Managed Openshift clusters, including ROSA (Red Hat OpenShift on AWS), are supported. |
| Self-Managed | We support every CNCF-certified Kubernetes solution. We've tested our solution on: Self-managed vanilla/on-premise Kubernetes clusters.; Self-managed OpenShift Kubernetes clusters.; Rancher Distributions (RKE and RKE2). |

The following are the Kubernetes platforms that are supported with Cortex XDR agents (Real-time protection).

This table shows the Kubernetes platform versions that have been compatibility tested. The table shows the latest version that has been tested. All versions that are not EOL, up to the latest version are supported.

| Linux Kubernetes Platform | Version |
| --- | --- |
| Unmanaged Kubernetes (k8s) | 1.30 |
| Amazon Elastic Kubernetes Service (EKS) | 1.33 |
|  | BottleRocket OS x86_64 User mode agent only |  |
| BottleRocket OS aarch64 User mode agent only |  |
| Microsoft Azure Kubernetes Service (AKS) | 1.33 |
|  | CBL-mariner 2 x86_64 |  |
| Google Kubernetes Engine (GKE) | 1.33 |
|  | Google Container-Optimized OS (COS)\* x86_64 User mode agent only |  |
| Google Kubernetes Engine (GKE) Autopilot |  |
| Oracle Kubernetes Engine (OKE) | 1.33 |
| Red Hat Openshift Container Platform (OCP) | 4.16 |
|  | RHCOS\* x86_64 User mode agent only |  |
| SUSE Rancher Kubernetes Engine 2 (RKE2) | 1.28 |
| Talos | 1.8.3 |

**Note:**

In Google Container-Optimized OS release 100 and earlier, where the FANOTIFY EXEC flag is not supported, the Kernel configuration may be partial for the user mode agent to properly function. In such cases, the agent will fallback to asynchronous mode.

In RHCOS version 4.12 and earlier, the Kernel configuration may be partial for the user mode agent to properly function. In such cases, the agent will fallback to asynchronous mode.

## Post-deployment steps
Perform post-deployment tasks such as setting up your environment, creating automation rules, and managing user roles and access management.

### Set up your environment

Learn more about setting up the Cortex Cloud environment based on your preferences.

To create a more personalized user experience, Cortex Cloud enables you to customize and configure the following:

-   Server settings
    
-   Security settings
    
-   Log forwarding

#### Configure server settings

Configure server settings such as keyboard shortcuts, timezone, and timestamp format.

You can configure server settings such as keyboard shortcuts, timezone, timestamp format, and custom logos for communications task emails to create a more personalized user experience in Cortex Cloud. Go to Settings → Configurations → General → Server Settings.

**Note:**

Keyboard shortcuts, timezone, and timestamp format are not set universally and only apply to the user who sets them.

| Server Setting | Description |
| --- | --- |
| Keyboard Shortcuts | Enables you to change the default shortcut settings.  The shortcut value must be a keyboard letter, A through Z, and cannot be the same for both shortcuts. |
| Timezone | Select a specific timezone. The timezone affects the timestamps displayed in Cortex Cloud, auditing logs and when exporting files. |
| Timestamp Format | The format in which to display Cortex Cloud data. The format affects the timestamps displayed in Cortex Cloud, auditing logs and when exporting files. This setting is configured per user and not per tenant. |
| Email Contacts | A list of email addresses  Cortex Cloud can be used as a distribution list. The defined email addresses are used to send product maintenance, updates, and new version notifications. These addresses are in addition to the email addresses registered with your Customer Support Portal account. |
| Custom Logo | By default, the Cortex Cloud logo displays on communication task emails. You can replace the default logo with a custom logo to match your organization's branding. Supported file formats are PNG, JPEG, SVG, and GIF. The minimum recommended image dimensions are 50px height and 50px width. The recommended maximum file size is 100 KB. |
| AI Configuration | Enable or disable the Cortex Agentic Assistant (Agents & LLM Experience).; Enable or disable AI case summarization capabilities. \*\*Note:\*\* The Cortex Agentic Assistant and AI case summarization are currently available for users in limited regions. For more information, see Cortex Agentic Assistant. |
| Password Protection (for downloaded files) | Enable password protection when downloading retrieved files from an endpoint. This prevents users from opening potentially malicious files. Administrator permissions required. \*\*Note:\*\* If the Password Protection (for downloaded files) setting under Settings → Configuration → General → Server Settings is enabled, enter the password 'suspicious' to download the file. |
| Google Maps Key | Enter the Google Maps API key to display the physical location of an entity on a Google map. |
| Scope-Based Access Control (SBAC) | Enforces granular scoping on users with a scoping configuration. A user can inherit scoping configurations from a user group, or have the scoping configuration applied directly on top of the role assigned from either a user group or a generated API Key. By default, Enable Scope Based Access Control is disabled and granular scoping is not enforced. Before enabling SBAC, we recommend that an administrator or a user with Access Management permissions first ensure that the users, user groups, and API Keys defined in Cortex Cloud are granted the required access by assigning the relevant scopes. For more information, see Manage user scope. (Optional) If enabled, you can select the Endpoint Scoping Mode, which is defined per tenant: Permissive: Enables users with at least one scope tag to access the relevant entity with that same tag.; Restrictive: Users must have all the scoped tags that are tagged within the relevant entity of the system. |
| XQL Configuration | Enables setting case sensitivity across Cortex Cloud. By default, this setting is set to **`false`** and field values are evaluated as case insensitive. This setting overwrites any other default configuration except for BIOCs, which will remain case-insensitive no matter what this configuration is set to. |
| Define the cases target MTTR per issue severity | Determines within how many days and hours you want issues resolved according to the issue severity Critical, High, Medium, and Low. The defined MTTR is used to display the Resolved Issue MTTR dashboard widgets. |
| Impersonation Role | The type of role permissions granted to the Palo Alto Networks Support team when opening support tickets. We recommend that role permissions be granted only for a specific time frame, and full administrative permissions be granted only when specifically requested by the Support team. Role permissions include: Read-only: Default setting; grants read-only access to your tenant.; Support-related actions: Grants permissions to tech support file collection, dump file collection, investigation query, correlation rule, BIOC and IOC rule editing, alert starring, exclusion, and exception editing; Full role permissions: No limitations are applied; grants full permissions to all actions and content on your tenant Permission Reset Timeframe: Determines how long role permissions are valid. |
| Case display modes | Allow users the access the Cases page in legacy mode. |
| Caching | Improve performance on the Cases and Issues pages by enabling a temporary data cache. |

#### Configure security settings

Configure security settings such as session expiration, user login expiration, and dashboard expiration.

You can configure security settings such as how long users can be logged in Cortex Cloud, and from which domains and IP ranges users can log in.

| Settings | Options | Description |
| --- | --- | --- |
| Session Expiration | User Login Expiration | The number of hours (between 1 and 24) after which the user's login session expires. You can also choose to automatically log users out after a specified period of inactivity. |
| Dashboard Expiration | Whether the Dashboard page expires at the same time as the user login session or after seven days. This is useful when you view a dashboard on a separate screen. For example, if you select seven days for dashboards and eight hours for login expiration, and you are currently viewing the Dashboard page, the dashboard expiration takes priority (seven days). This ensures that the Dashboard page continues to display the widgets for an extended period. |
| Allowed Sessions | Approved Domains | The domains from which you want to allow user access (login) to Cortex Cloud. You can add or remove domains as necessary. |
| Approved IP Ranges | The IP ranges from which you want to allow user access (login) to Cortex Cloud. You can also choose to limit API access from specific IP addresses. |
| User Expiration | Deactivate Inactive User | Deactivate an inactive user, and also set the user deactivation trigger period. By default, user expiration is disabled. When enabled, enter the number of days after which inactive users should be deactivated. |
| Same-Site Cookie Policy | Strict | Configure your Cortex tenant's SameSite cookie security policy by selecting between two settings to control how users log in from external links: Strict (Recommended): Requires users to reauthenticate when clicking a link from another site, even if they are already signed in.; Lax: Offers a more seamless experience by allowing users to access the tenant directly from external links without needing to log in again. Yet, we advise against this setting for security reasons. |
| Lax |
| Allowed Domains | Domain Name |  |

#### Data and log forwarding

Stay informed and updated about events in your system by forwarding logs and data to an external service, such as a syslog receiver, a Slack channel, or an email account.

To stay informed about important alerts and events, you can configure your notifications and specify the type of data and logs you want to forward. You can forward logs and data to an email account, a Slack channel, or a syslog receiver. In addition, cases and issues can be forwarded to third-party systems including Splunk, Amazon SQS, Amazon S3, and Webhook.

##### Forward logs and data from Cortex Cloud to external services

Learn how to forward logs and data from Cortex Cloud to external third-party services such as email, Slack, syslog, and Splunk.

You can forward logs, cases, and issues from Cortex Cloud to an external service. By forwarding logs and data, you can manage alerts and investigations in external systems and meet data retention requirements. Available services include the following:

-   **Slack channel and/or syslog receiver:** Configure the external application with Cortex Cloud. After the application is configured, configure notification forwarding, specifying the data/log type you want to forward.
    
-   **Email distribution list:** Configure notification forwarding, specifying the data/log type you want to forward.
    
-   Splunk, Amazon SQS, Amazon S3, and Webhook: Only cases and issues can be forwarded to these services. The external application must be configured in Cortex Cloud and egress configured in the Cortex Gateway before forwarding to these services.
    

The following table shows the log types supported for each notification type:

###### Configure external applications for forwarding

Configure external applications so you can forward data to services such as syslog servers, Slack, Splunk, Amazon SQS, Amazon S3, and Webhook.

Data and logs can be forwarded to third-party external services. The external service must be configured in Cortex Cloud before you set up notification forwarding.

Before forwarding cases or issues to Splunk, Amazon S3, Amazon SQS, or Webhook, you need to configure egress in the Cortex Gateway. You do not need to configure egress for email, Slack, or syslog forwarding.

**Note:**

-   No prior configuration is required to send data or logs to an email distribution list.
    
-   Only cases and issues can be forwarded to Slack, Amazon S3, Amazon SQS, Splunk, and Webhook.
    
-   To forward data to Amazon SQS, the following permissions are required: `sqs:GetQueueAttributes`, `sqs:ListQueues`, `sqs:SendMessage`, `sqs:SendMessageBatch`, `tag:GetResources`, and `iam:GetRole`.
    
-   To forward data to Amazon S3, the following permissions are required: `s3:PutMessage`, `s3:PutObject`, and `s3:ListBucket`.
    

Task 1: Configure egress in Cortex Gateway

To forward data to Amazon S3, Amazon SQS, Splunk, or Webhook, you must first configure egress in Cortex Gateway. You do not need to configure egress to forward to Slack, email, or a syslog server.

**Note:**

Only a user with Account Admin or Instance Admin permissions can configure egress. For more information, see Egress configurations.Egress configurations

| Flow | Path | Example |
| --- | --- | --- |
| External Storage: AWS S3 | <bucket_name> Enter the name of the AWS S3 bucket to allow access. | `my-example-bucket` |
| Webhook | <host> Enter the host name of the Webhook endpoint. | `webhook.mycompany.com` |
| External storage: AWS SQS | <queue_name> Enter the name of the AWS SQS queue. | `my-example-queue` |
| Splunk | <host> Enter the host or domain name of the Splunk instance. | `splunk.mycompany.com` |

1.  In the [Cortex Gateway](https://cortex-gateway.paloaltonetworks.com/signin/), go to Permission Management → Egress Configurations → Path.
    
2.  Select the account name and tenant.
    
3.  In the Flow field, select the third-party service you want to forward to.
    
    **Note:**
    
    For Amazon SQS or Amazon S3, you need to provide the queue/bucket name. For Webhook or Splunk, you need to provide the domain, including any subdomain. Note that the path does not include HTTP or HTTPS.
    
4.  Add the configuration.
    

Task 2: Configure access in your firewall

If you are forwarding to Splunk or Webhook, add the IP addresses for your tenant region to your firewall. For more information, refer to the list of ingress IPs in Enable access to required PANW resources.Enable access to required PANW resources

Task 3: Configure external application

**Note:**

You can also configure external applications when you create a new forwarding configuration. After defining the configuration and setting the scope, you can Add Application and follow the instructions below for any of these destinations.

1.  Go to Settings → Configurations → Integrations → External Applications → Add Application.
    
2.  Choose one of the following applications:
    
    Amazon S3
    
    1.  Enter the S3 URI.
        
    2.  Click Verify.
        
        **Note:**
        
        If egress has not been configured in the Cortex Gateway, verification will fail and a message will display that the endpoint does not match any approved routes.
        
    3.  After verification is successful, you can enter the instance name and optional description.
        
    4.  Enter the Role ARN (Amazon Resource Name).
        
    5.  Enter the AWS region. For example, `eu-central-1`.
        
    6.  (Optional) Select the maximum duration to collect data before writing to a new file. The default is one hour.
        
    7.  Test the connection.
        
    
    Amazon SQS
    
    1.  Enter the Queue URL from Amazon SQS.
        
    2.  Click Verify.
        
        **Note:**
        
        If egress has not been configured in the Cortex Gateway, verification will fail and a message will display that no approved routes were found.
        
    3.  After verification is successful, you can enter the name and optional description.
        
    4.  Select either IAM Role or IAM Access Keys.
        
        -   For IAM Role, enter the Role ARN (Amazon Resource Name).
            
        -   For IAM Access Keys, enter the Access Key and Secret Key.
            
        
    5.  Test the connection.
        
    
    Slack
    
    For Slack, see Integrate Slack for outbound notifications.
    
    Syslog
    
    For syslog server configuration, see Integrate a syslog receiver.
    
    Splunk
    
    1.  Enter the Splunk HTTP event collector URL. The URL can include a port. The connection must be HTTPs.
        
    2.  Click Verify.
        
        **Note:**
        
        If egress has not been configured in the Cortex Gateway, verification will fail and a message will display that the endpoint does not match any approved routes.
        
    3.  After verification is successful, you can enter the instance name and optional description.
        
    4.  Enter the authentication token for secure access to your Splunk instance.
        
    5.  Test the connection.
        
    
    Webhook
    
    1.  Enter the Webhook URL. The URL can include a port. The connection must be HTTPs.
        
    2.  Click Verify.
        
        **Note:**
        
        If egress has not been configured in the Cortex Gateway, verification will fail and a message will display that the endpoint does not match any approved routes.
        
    3.  After verification is successful, you can enter the instance name and optional description.
        
    4.  (Optional) Show advanced settings to add HTTP headers.
        
    5.  Test the connection.
        
    
3.  Click Connect.
    

Task 4: Configure notification forwarding

Configure notification forwarding to email or external services. For more information, see Configure notification forwarding.

###### Integrate a syslog receiver

Define syslog settings and then configure notification forwarding to receive notifications about issues and reports.

A syslog receiver can be a physical or virtual server, a SaaS solution, or any service that accepts syslog messages.

To send Cortex Cloud notifications to your syslog receiver, you first need to define the settings for the syslog receiver. After this is complete, you can configure notification forwarding.

Enable access

Before you begin, enable access to the following Cortex Cloud IP addresses for your region in your firewall.

Americas

| Region | Log Forwarding address |
| --- | --- |
| United States - Americas (US) | 35.232.87.9, 35.224.66.220 |
| United States - Government | 104.198.222.185, 35.239.59.210 |
| Brazil (BR) | 35.247.234.13, 34.39.178.116 |
| Canada (CA) | 35.203.54.204, 35.203.52.255 |

EMEA (Europe, Middle East, Africa)

| Region | Log Forwarding IP Addresses |
| --- | --- |
| France (FA) | 34.163.100.253, 34.155.72.149 |
| Germany (DE) | 35.234.95.96, 35.246.192.146 |
| Israel (IL) | 34.165.194.4, 34.165.101.105 |
| Italy (IT) | 34.154.0.173, 34.154.71.94 |
| Netherlands - Europe (EU) | 34.90.202.186, 34.90.105.250 |
| Poland (PL) | 34.118.45.145, 34.118.126.170 |
| Qatar (QT) | 34.18.48.182, 34.18.43.40 |
| Saudi Arabia (SA) | 34.166.50.215, 34.166.55.72 |
| South Africa (ZA) | 34.35.70.253, 34.35.10.167 |
| Spain (ES) | 34.175.83.90, 34.175.230.150 |
| Switzerland (CH) | 34.65.228.95, 34.65.74.83 |
| United Kingdom (UK) | 34.105.227.105, 34.105.149.197 |

JPAC (Asia-Pacific)

| Region | Log Forwarding IP Addresses |
| --- | --- |
| Australia (AU) | 35.189.38.167, 34.87.219.39 |
| Delhi (DL) | 34.126.223.198, 34.131.110.15 |
| India (IN) | 34.93.247.41, 34.93.183.131 |
| Indonesia (ID) | 34.101.248.99, 34.101.176.232 |
| Japan (JP) | 34.84.88.183, 35.243.76.189 |
| Singapore (SG) | 35.240.192.37, 34.87.125.227 |
| South Korea (KR) | 34.64.198.58, 34.47.86.20 |
| Taiwan (TW) | 35.234.2.208, 35.185.171.91 |

###### How to send issues or logs to a syslog receiver

1.  Go to Settings → Configurations → Integrations → External Applications → Add Application and select Syslog.
    
2.  Define the following parameters:
    
    | Parameter | Description |
    | --- | --- |
    | Name | Unique name for the server profile. |
    | Destination | IP address or fully qualified domain name (FQDN) of the syslog receiver. |
    | Port | Port number to send syslog messages. |
    | Facility | Select one of the syslog standard values. The value maps to how your syslog server uses the facility field to manage messages. For details on the facility field, see [RFC 5424](https://tools.ietf.org/html/rfc5424). |
    | Protocol | Method of communication with the syslog receiver: TCP: No validation is made on the connection with the syslog receiver. However, if an error occurred with the domain used to make the connection, the Test connection will fail.; UDP: No error checking, error correction, or acknowledgment. No validation is done for the connection or when sending data.; TCP + SSL: Cortex Cloud validates the syslog receiver certificate and uses the certificate signature and public key to encrypt the data sent over the connection. |
    | Certificate | The communication between Cortex Cloud and the syslog destination can use TLS. In this case, upon connection, Cortex Cloud validates that the syslog receiver has a certificate signed by either a trusted root CA or a self-signed certificate. You may need to merge the Root and Intermediate certificate if you receive a certificate error when using a public certificate. If your syslog receiver uses a self-signed CA, upload your self-signed syslog receiver CA. If you only use a trusted root CA leave the certificate field empty. \*\*Note:\*\* Up to TLS 1.3 is supported.; Verify the self-signed CA includes your public key. You can ignore certificate errors. For security reasons, this is not recommended. If you choose this option, data and logs will be forwarded even if the certificate contains errors. |
    
3.  Test the parameters to ensure a valid connection, and click Connect when ready.
    
    You can define up to five syslog receivers. Upon success, the table displays the syslog servers and their status.
    
    After you integrate with your syslog receiver, configure your forwarding settings. For more information see, Configure notification forwarding.
    

###### Syslog receiver test message errors

When configuring a syslog message, Cortex Cloud sends a test message. If a test message cannot be sent, Cortex Cloud displays an error message to help you troubleshoot.

The following table includes descriptions and suggested solutions for the error messages:

| Error Message | Description | Suggested Solution |
| --- | --- | --- |
| Host Resolving Failed | The IP address or hostname you provided doesn't exist, or can't be resolved. | Ensure you have the correct IP address or the hostname. |
| Configured Local Address | The IP address or hostname you provided is internal and can't be used. | Ensure you have the correct IP address or the hostname. |
| Wrong Certificate Format | The certificate you uploaded is in an unexpected format and can't be used. The certificate must be an ASCII string or a bytes-like object. | Re-create the certificate in the correct format, for example: -----BEGIN CERTIFICATE-----MIIDHTCCAgWgAwIBAgIQSwieRyGdh6BNRQyp406bnTANBgkqhkiG9w0BAQsFADAhMR8wHQYDVQQDExZTVVJTLUNoYXJsaWVBbHBoYS1Sb290MB4XDTIwMDQzMDE4MjEzNFoXDTMwMDQzMDE4MzEzNFowITEfMB0GA1UEAxMWU1VSUy1DaGFybGllQWxwaGEtUm9vdDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJHH2HR/CzVzm9lOIu6rrtF9opYeIJdtgJR2Le7w4M56lFKIoziAfZD9qR0DqXpAV+42PZC8Oe4ueweD44OKTnaofbOxQvygelvHkFyAj+oz0VppzhmeUXh1Eux96QKB+Q+vSm8FbNlBL2SI8RhceYsWtZe5vBm/zDdV2alO5LJ3rEj9ycG1a7re1wSDQ67NaSrny+C/7IL5utlVspcgjslEiGM7D30uKszpq3CCeV9f7aPHCVZbbFRBxe4cbgZjGvE7Mm1OBbsypMT3z8jmSj7Kz5ui6R8mlqtll5MkIGtvmc1aypJHKrobwcs2ozEmLiVR0F1oJrl+PIZy5MXhBUcCAwEAAaNRME8wCwYDVR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFIJ1ZhG0dkgwF8OOB/eT4u/9yowaMBAGCSsGAQQBgjcVAQQDAgEAMA0GCSqGSIb3DQEBCwUAA4IBAQBvDQ4Epr0zxQHuyziDtlauddVsrLpckljHc+dCIhBvGMzGEj47Cb0c/eNt6tHrPThyzRxOHd9GBMX4AxLccPNuCZdWIRTgb4SYzDspGEYDK7v/N5+FvpYdWRgB4msUXhHt36ivH450XuY8Slt+qbQWNVU2+xIkMSSA3mUwnK+hz1GwO/Zc2JYOaVZUrW39EuzNePJ+O6BlgMRMRPNGzgT+xSxt316r/QnVA2sk4IXshdGGMG0VcuzBCyeuiCRP5/2QeFthas5EoXbdlB5eK3VzqLtiKyua/kS/hPuKahN9mI8FZ4TNB+nd6+eRQs2nsnbVOFmmOYu5KkGnDOjTzRh4-----END CERTIFICATE----- |
| Connection Timed Out | Cortex Cloud didn’t connect to the syslog receiver in the expected time. This could be because your firewall blocked the connection or because the configuration of the syslog server caused it to drop the connection. | Check the firewall logs and the connection using Wireshark. |
| Connection Refused | The syslog receiver refused the connection. This could be because your firewall blocked the connection or because the configuration of the syslog server caused it to drop the connection. | Check the firewall logs and the connection using Wireshark. |
| Connection Reset | The connection was reset by the syslog receiver. This could be because your firewall blocked the connection or because the configuration of the syslog receiver caused it to drop the connection. | Check the firewall logs and the connection using Wireshark. |
| Certificate Verification Failed | The uploaded certificate couldn’t be verified for one of the following reasons. The certificate doesn't correspond to the certificate on the syslog receiver and cannot be validated.; The certificate doesn’t have the correct hostname.; You are using a certificate chain and didn’t merge the certificates into one certificate. | Incorrect certificate: to check that the certificate you are uploading corresponds to the server syslog certificate, use the following openssl command. openssl verify -verbose -CAfile cortex_upload_certificate syslog_certificate If the certificate is correct, the result is `syslog_certificate: OK`.; Incorrect hostname: make sure that the hostname/ip in the certificate matches the syslog server.; Certificate chain: If you are using a list of certificates, merge the chain into one certificate. You can concatenate the certificates using the following cat command in Linux or macOS. cat intermediate_cert root_cert > merged_syslog.crt If the concatenated certificate doesn’t work, change the order of the root and intermediate certificates, and try again. To verify that the chain certificate was saved correctly, use the following OpenSSL command. openssl verify -verbose -CAfile cortex_upload_certificate syslog_certificate If the certificate is correct, the result is `syslog_certificate: OK`. |
| Connection Terminated Abruptly | The firewall or the syslog receiver dropped the connection unexpectedly. This could be because the firewall on the customer side limits the number of connections, the configuration on the syslog receiver drops the connection, or the network is unstable. | Check the firewall logs and the connection using Wireshark. |
| Host Unreachable | The network configuration is faulty, and the connection can't reach the syslog receiver. | Check the network configuration to make sure everything is configured correctly, like a firewall or a load balancer which may be accidentally directing the connection to a dead server. |
| SSL Error | Unknown SSL error. | To investigate the issue, contact support. |
| Connection Unavailable | General error. | To investigate the issue, contact support. |

###### Integrate Slack for outbound notifications

Learn how to integrate Cortex Cloud with your Slack workspace and stay updated on important alerts and events.

Integrate Cortex Cloud with your Slack workspace to manage and highlight your issues and reports. Creating a Cortex Cloud Slack channel ensures that defined issues are exposed on laptop and mobile devices using the Slack interface. Unlike email notifications, Slack channels provide dedicated spaces where you can contact specific members regarding your issues.

How to integrate Slack with Cortex Cloud

1.  Go to Settings → Configurations → Integrations → External Applications → Add Application and click Slack.
    
2.  Click Ok to go to an external Slack page to install Cortex Cloud on your Slack workspace.
    
    **Note:**
    
    You are directed to the Slack browser to install Cortex Cloud. You can only use this link to install Cortex Cloud on Slack. Attempting to install from Slack Marketplace will redirect you to Cortex Cloud documentation.
    
3.  Click Submit.
    
    Upon successful installation, Cortex Cloud displays the workspace to which you connected.
    

What to do next

After you integrate with your Slack workspace, configure your forwarding settings. For more information see, Configure notification forwarding. To send reports to Slack, see Run or schedule reports.

###### Configure notification forwarding

Learn how to create a forwarding configuration that specifies the log type you want to forward.

After you integrate with an external service such as Slack, a syslog server, Amazon S3, Amazon SQS, Webhook, or Splunk, create a forwarding configuration that specifies the data or log type you want to forward. You can configure notifications for issues, cases, and logs. To send reports to email or Slack, see Run or schedule reports.

**Prerequisite:**

Before you can select an external service for notification forwarding, you must integrate the external service with Cortex Cloud. For more information, see Configure external applications for forwarding. No prior configuration is required to send data to an email distribution list.

How to configure notifications

1.  Select Settings → Configurations → General → Notifications → Add Forwarding Configuration.
    
2.  Enter a name for the configuration.
    
3.  Select the data or log type you want to forward:
    
    -   Issues: Send notifications for specific issue types.
        
        **Note:**
        
        -   **Forwarding destinations**: Only issues and cases can be forwarded to Slack, Splunk, Amazon SQS, Amazon S3, or Webhook.
            
        -   **Notification forwarding by domain**: To configure notification forwarding for issues by domain, select Issues and filter the Issues table by Issue Domain.
            
        -   **Alert vs. issue format**:By default, new configurations use the issue format, but you can select the alert format if needed, when forwarding to email, Slack, or a syslog server. You cannot forward issues in the alert format to Splunk, Amazon SQS, Amazon S3, or Webhook.
            
            Existing legacy configurations are not automatically updated and continue to send notifications in the alert format. To use the issue format, edit the existing configuration.
            
        
    -   Agent Audit Logs: Send notifications for audit logs reported by your Cortex XDR agents.
        
    -   Management Audit Logs: Send notifications for audit logs about events related to your Cortex Cloud tenant.
        
    -   Cases—Send notifications for specific cases.
        
    
    **Note:**
    
    Not all data and log types can be sent to all external services. For more information, see Forward logs and data from Cortex Cloud to external services.Forward logs and data from Cortex Cloud to external services
    
4.  (Optional) Enter a description of the forwarding configuration.
    
5.  Click **Next**, and under **Scope**, filter which issues, cases, or logs you want included in a notification.
    
    For example, for a filter set to `Severity = Medium, Category = Configuration`, Cortex Cloud sends the issues or events matching this filter as a notification.
    
6.  Click **Next**.
    
7.  Select email or the external service you want to forward to.
    
    Email (Issues, cases, logs)
    
    1.  Enable the email option and click Email to expand the form.
        
    2.  Enter the email address for your Distribution List.
        
    3.  For issue forwarding, you can define the Grouping Timeframe, which is the time frame, in minutes, to specify how often Cortex Cloud sends notifications. Every 20 issues aggregated within this time frame are sent together in one notification, sorted according to severity. To send a notification when one issue is generated, set the time frame to **`0`**. The grouping time frame for case and management audit log is 10 minutes and cannot be modified.
        
    4.  (Optional) Define your email configuration:
        
        1.  In the Distribution List, add the email addresses to which you want to send email notifications.
            
        2.  Choose whether you want Cortex Cloud to provide an auto-generated subject.
            
        3.  Choose the format you want to send the email. If you choose Alert, you can choose the Standard or Legacy format. For more information about the legacy format, see Log format for IOC and BIOC issues.
            
    
    6.  Choose whether you want Cortex Cloud to provide an auto-generated subject or enter your own subject.
        
    7.  By default, data is sent in the issue format. You can also choose Alert format, Standard or Legacy. For more information about the legacy format, see Log format for IOC and BIOC issues.
        
    
    **Note:**
    
    The Grouping Timeframe defines the time frame, in minutes, of how often Cortex Cloud sends notifications. Every 20 issues or 20 events aggregated within this time frame are sent together in one notification, sorted according to severity. To send a notification when one issue or event is generated, set the time frame to **`0`**.
    
    Syslog server (Issues, logs)
    
    1.  Enable the Syslog option and click Syslog to expand the form.
        
    2.  Select a syslog receiver. Cortex Cloud displays the list of receivers integrated with your Cortex Cloud tenant.
        
    3.  Choose the format you want to send the syslog. If you choose Alert, you can choose the Standard or Legacy format. For more information about the legacy format, see Log format for IOC and BIOC issues.
        
    
    Slack (Issues, cases)
    
    1.  Enable the Slack option and click Slack to expand the form.
        
    2.  Enter the Slack channel name and select from the list of available channels. Slack channels are managed independently of Cortex Cloud in your Slack workspace. After integrating your Slack account with your Cortex Cloud tenant, Cortex Cloud displays a list of specific Slack channels associated with the integrated Slack workspace.
        
    3.  Choose the format you want to send the syslog. If you choose Alert, you can choose the Standard or Legacy format. For more information about the legacy format, see Log format for IOC and BIOC issues.
        
    
    Amazon S3, Amazon SQS, Splunk, or Webhook (Issues, cases)
    
    1.  Enable the Amazon S3, Amazon SQS, Splunk, or Webhook option and click to expand the form.
        
    2.  Select the instance name.
        
    
8.  Click Next.
    
9.  Review the forwarding configuration and click Create.

###### Monitor administrative activity

View all Cortex Cloud administrator-initiated actions taken on issues, cases, and live terminal sessions.

From Settings → Management Audit Logs, you can track the status of all administrative and investigative actions. Cortex Cloud stores audit logs for 365 days (instead of 180 days, which was the retention period in the past). Use the page filters to narrow the results or manage tables to add or remove fields as needed.

To ensure you and your colleagues stay informed about administrative activity, you can configure notification forwarding to forward your Management Audit log to an email distribution list, Syslog server, or Slack channel.

The following table describes the default **and optional fields** that you can view in alphabetical order.

| Field | Description |
| --- | --- |
| Email | Email address of the administrative user |
| Description | Descriptive summary of the administrative action. Hover over this field to view more detailed information in a popup tooltip. This enables you to know exactly what has changed, and, if necessary, roll back the change. |
| Host Name | Name of any relevant affected hosts |
| ID | Unique ID of the action |
| Result | Result of the administrative action: Success, Partial, or Fail. |
| Subtype | Subcategory of action |
| Timestamp | Time and date of the action |
| Type | Type of activity logged, one of the following: Agent Configuration: Configuration of a particular Cortex XDR agent on a particular endpoint.; Agent Installation: Installation of the Cortex XDR agent on a particular endpoint.; Issue Exclusions: Suppression of particular issues from Cortex Cloud .; Issue Notifications: Modification of the format or timing of issues.; Issue Rules: Modification of issue rules.; API Key: Modification of the Cortex Cloud API key.; Authentication: User sessions started, along with the user name that started the session.; Broker API: Operation related to the Broker application programming interface (API).; Broker VM: Operation related to the Broker virtual machine (VM).; Dashboards: Use of particular dashboards.; Device Control Permanent Exceptions: Modification of permanent device control exceptions.; Device Control Profile: Modification of a device control profile.; Device Control Temporary Exceptions: Modification of temporary device control exceptions.; Disk Encryption Profile: Modification of a disk encryption profile.; Endpoint Administration: Management of endpoints.; Endpoint Groups: Management of endpoint groups.; Extensions Policy: Modification of extension policy settings, including host firewall and disk encryption.; Extensions Profiles: Modification of extension profile settings.; Global Exceptions: Management of global exceptions.; Host Firewall Profile: Modification of a host firewall profile.; Host Insights: Initiation of Host Insights data collection scan (Host Inventory and Vulnerability Assessment).; Case Management: Actions taken on cases and on the assets, issues, and artifacts in cases.; Ingest Data: Import of data for immediate use or storage in a database.; Integrations: Integration operations, such as integrating Slack for outbound notifications.; Licensing: Any licensing-related operation.; Live Terminal: Remote terminal sessions created and actions taken in the file manager or task manager, a complete history of commands issued, their success, and the response.; Managed Threat Hunting: Activity relating to managed threat hunting.; MSSP: Management of security services providers.; Policy & Profiles: Activity related to managing policies and profiles.; Prevention Policy Rules: Modification of prevention policy rules.; Protection Policy: Modification of the protection policy.; Protection Profile: Modification of the protection profile.; Public API: Authentication activity using an associated Cortex Cloud API key.; Query Center: Operations in the Query Center.; Remediation: Remediation operations.; Reporting: Any reporting activity.; Response: Remedial actions taken. For example: Isolate a host, undo host isolation, add a file hash signature to the block list, or undo the addition to the block list.; Rules: Modification of rules.; Rules Exceptions: Creation, editing, or deletion under Rules exceptions.; SaaS Collection: Any collected SaaS data.; Script Execution: Any script execution.; Starred Cases: Modification of starred cases.; Vulnerability Assessment: Any vulnerability assessment activity. |
| User Name | The user who performed the action. |

##### Data and log notification formats

Cortex Cloud provides you with different formats for its log notifications.

When Cortex Cloud cases, issues, and logs are forwarded to email or a third-party system, notifications are sent in a specific format.

**Note:**

Issues can be forwarded to email, syslog servers, and Slack in the alert format, if you prefer. The alert format can be selected when you configure your forwarding notification.

###### Management audit log messages

View the types of Cortex Cloud management audit log messages that are sent.

Cortex Cloud management audit log messages are sent based on the various log types, for example, Action Center, Issue Rules, or Authentication.

List of log types

-   Action Center
    
-   Agent Configuration
    
-   Agent Exception Rules
    
-   Issue Exclusion
    
-   Issue Management
    
-   Issue Notifications
    
-   Issue Rules
    
-   Issue Exclusions
    
-   Allowed Domains
    
-   API Key
    
-   Apps
    
-   Asset Inventory
    
-   Asset Roles
    
-   Asset Tag Rules
    
-   Asset Uploads
    
-   Authentication
    
-   Automation Rules
    
-   Automation Settings
    
-   Broker API
    
-   Broker VMs
    
-   Business Unit Change
    
-   SaaS Collection
    
-   Custom Fields
    
-   Dashboards
    
-   Datasets
    
-   Dataset Views
    
-   Data Retention
    
-   Device Control Custom Device
    
-   Device Control Permanent Exceptions
    
-   Extensions Policy Rules
    
-   Device Control Profile
    
-   Device Control Temporary Exceptions
    
-   Agent Installation
    
-   EDL Management
    
-   Effective IP Ranges
    
-   Endpoint Groups
    
-   Endpoint Administration
    
-   Event Forwarding
    
-   Device Control Violations
    
-   Device Permanent Exceptions
    
-   Device Temp Exceptions
    
-   Disk Encryption Visibility
    
-   Featured Alert Fields
    
-   Forensics
    
-   Global Exceptions
    
-   Host Insights
    
-   Disk Encryption Profile
    
-   Host Firewall
    
-   Host Firewall Profile
    
-   Case Domains
    
-   Case Layout Rules
    
-   Case Management
    
-   Case Properties
    
-   Case Timeline Event
    
-   Indicator rules
    
-   Ingest Data
    
-   Integrations
    
-   Layout Rules
    
-   Licensing
    
-   Live Terminal
    
-   Lookups
    
-   Managed Detection & Response
    
-   Managed Threat Hunting
    
-   MSSP
    
-   Permissions
    
-   Playbook Triggers
    
-   Policy & Profiles
    
-   Prevention Policy Rules
    
-   Prisma Integration
    
-   Extensions Profile
    
-   Public API
    
-   Query Center
    
-   Query Library
    
-   Remediation
    
-   Remediation Path Rules
    
-   Reporting
    
-   Response
    
-   Rules
    
-   Rules Exceptions
    
-   Scoring Rules
    
-   XDR Collector Configuration
    
-   XDR Collectors Groups
    
-   XDR Collectors Policy
    
-   XDR Collectors Profile
    
-   Script Execution
    
-   Security Settings
    
-   Server Settings
    
-   Starred Incidents
    
-   Support
    
-   System
    
-   Tenant Takeover
    
-   Vulnerability Assessment
    
-   Vulnerability Tests
    
-   XCloud Integration
    
-   XDM Config
    
-   XQL Parsing Rules
    
-   Public API
    
-   Cortex Automation
    
    -   Sub Type—Command - War Room
        
        -   Status—Success
            
        -   Severity—Informational
            
        -   Details— `IncidentID:({ID}), IncidentType:({type}), IncidentName:({name}), Command:({command}), Arguments:({arg1})="arg1val" ({arg2})="arg2val" ({argn})="argnval", ID: ({num})`
            
        
    -   Sub Type—Command - Playground
        
        -   Status—Success
            
        -   Severity—Informational
            
        
    
-   XSOAR Migration

###### Issue notification format

Learn about the formats used to forward issues to third-party services.

Issues can be forwarded to the following:

-   Email distribution list
    
-   Syslog server
    
-   Slack
    
-   Splunk, Amazon SQS, Amazon S3, or Webhook
    

###### Email account

Cortex Cloud sends issues to email accounts based on the settings you configure. Email messages also include an issue code snippet of the fields according to the columns in the Issue table.

The notification format is as follows:

-   If only one issue exists in the queue, a single-issue email format is sent.
    
-   If more than one issue was grouped in the time frame, all the issues in the queue are forwarded together in a grouped email format.
    

Example 3.  

Single-issue email message

```
Email Subject: Issue: <issue_name>
	Email Body:
	    Issue Name: Suspicious Process Creation
	    Severity: High
	    Source: Correlation
	    Category: Malware 
	    Action: Detected
	    Host: <host name>
	    Username:<user name>
	    Excluded: No
	    Starred: Yes 
	    Issue: <link to the tenant issue view>
	    Case: <link to the tenant case view>
```

  

Example 4.  

Grouped issue email message

```
Email Subject: Issues: <first_highest_severity_issue> + x others
	Email Body:
	   Issue Name: Suspicious Process Creation
	   Severity: High
	   Source: Correlation
	   Category: MalwareAction: Detected
	   Host: <host name>
	   Username:<user name>
	   Excluded:No
	   Starred: Yes
	   Issue: <link to the tenant issue view>
           Case: <link to the tenant case view>
	   Issue Name: Behavioral Threat Protection
	   Issue ID: 2412
	   Description: A really cool detection
	   Severity: Medium
	   Source: Correlation
	   Category: Exploit
	   Action: Prevented
	   Host: <host name>
	   Starred: Yes
	   Case: <link to the tenant issue view>
	   Issue: <link to the tenant case view>
	   Notification Name: “My notification policy 2 ”
	   Notification Description: “Starred issues with medium severity”
```

  

Example 5.  

Email attachment

```
{
    "original_issue_json":{
        "uuid":"<UUID Value>",
        "recordType":"threat",
        "customerId":"<Customer ID>",
        "severity":4,
        "...",
        
    "is_pcap":null,
    "contains_featured_host":[
        "NO"
    ],
    "contains_featured_user":[
        "YES"
    ],
    "contains_featured_ip":[
        "YES"
    ],
    "events_length":1,
    "is_excluded":false
    
}
```

  

###### Slack channel, Splunk, Amazon S3, Amazon SQS, Webhook

You can send issue notifications to a single Slack contact or a Slack channel, or to Splunk, Amazon S3, Amazon SQS, or Webhook. Notifications are similar to the email format.

###### Syslog receiver

Issue notifications forwarded to a syslog receiver are sent in a CEF format RF 5425.

| Section | Description |
| --- | --- |
| Syslog header | `<9>: PRI (considered a priority field)1: version number2020-03-22T07:55:07.964311Z: timestamp of when alert/log was sentcortexxdr: host name` |
| CEF header | `HEADER/Vendor="Palo Alto Networks" (as a constant string)HEADER/Device Product="Cortex XDR" (as a constant string)HEADER/Product Version= Cortex XDR version (2.0/2.1....)HEADER/Severity=(integer/0 - Unknown, 6 - Low, 8 - Medium, 9 - High)HEADER/Device Event Class ID=alert sourceHEADER/name =alert name` |
| CEF body | `end=timestamp shost=endpoint_name deviceFacility=facility cat=category externalId=external_id request=request cs1=initiated_by_process cs1Label=Initiated by (constant string) cs2=initiator_commande cs2Label=Initiator CMD (constant string) cs3=signature cs3Label=Signature (constant string) cs4=cgo_name cs4Label=CGO name (constant string) cs5=cgo_command cs5Label=CGO CMD (constant string) cs6=cgo_signature cs6Label=CGO Signature (constant string) dst=destination_ip dpt=destination_port src=source_ip spt=source_port fileHash=file_hash filePath=file_path targetprocesssignature=target_process_signature tenantname=tenant_name tenantCDLid=tenant_id CSPaccountname=account_name initiatorSha256=initiator_hash initiatorPath=initiator_path osParentName=parent_name osParentCmd=parent_command osParentSha256=parent_hash osParentSignature=parent_signature osParentSigner=parent_signer incident=incident_id act=action suser=actor_effective_username` |

Example 6. 

```
end=timestamp shost=endpoint_name deviceFacility=facility cat=category externalId=external_id request=request cs1=initiated_by_process cs1Label=Initiated by (constant string) cs2=initiator_commande cs2Label=Initiator CMD (constant string) cs3=signature cs3Label=Signature (constant string) cs4=cgo_name cs4Label=CGO name (constant string) cs5=cgo_command cs5Label=CGO CMD (constant string) cs6=cgo_signature cs6Label=CGO Signature (constant string) dst=destination_ip dpt=destination_port src=source_ip spt=source_port fileHash=file_hash filePath=file_path targetprocesssignature=target_process_signature tenantname=tenant_name tenantCDLid=tenant_id CSPaccountname=account_name initiatorSha256=initiator_hash initiatorPath=initiator_path osParentName=parent_name osParentCmd=parent_command osParentSha256=parent_hash osParentSignature=parent_signature osParentSigner=parent_signer incident=incident_id act=action suser=actor_effective_username
```

###### Management Audit log notification format

An email account or a syslog receiver are the notification channels through which the Management Audit log is communicated.

Cortex Cloud forwards the Management Audit log to these external data sources:

-   **Email account:** Sent according to the settings you configured. For more information, see Configure notification forwarding.
    
-   **Syslog receiver:** Sent in a [CEF format RFC 5425](https://tools.ietf.org/html/rfc5425) according to the following mapping:
    
    | Section | Description |
    | --- | --- |
    | Syslog header | `<9>: PRI (considered a prioirty field)1: version number2020-03-22T07:55:07.964311Z: timestamp of when issue /log was sentcortexxdr: host name` |
    | CEF header | `HEADER/Vendor="Palo Alto Networks" (as a constant string)HEADER/Device Product="Cortex XDR" (as a constant string)HEADER/Device Version= Cortex XDR version (2.0/2.1....)HEADER/HEADER/Severity=(integer/0 - Unknown, 6 - Low, 8 - Medium, 9 - High)HEADER/Device Event Class ID="Management Audit Logs" (as a constant string)HEADER/name = type` |
    | CEF body | `suser=user end=timestamp externalId=external_id cs1Label=email (constant string) cs1=user_mail cs2Label=subtype (constant string) cs2=subtype cs3Label=result (constant string) cs3=result cs4Label=reason (constant string) cs4=reason msg=event_description tenantname=tenant_name tenantCDLid=tenant_id CSPaccountname=csp_id` |
    

Example 8. 

```
3/18/2012:05:17.567 PM<14>1 2020-03-18T12:05:17.567590Z cortexxdr - - - CEF:0|Palo Alto Networks|Cortex XDR|Cortex XDR x.x |Management Audit Logs|REPORTING|6|suser=test end=1584533117501 externalId=5820 cs1Label=email cs1=test@paloaltonetworks.com cs2Label=subtype cs2=Slack Report cs3Label=result cs3=SUCCESS cs4Label=reason cs4=None msg=Slack report 'scheduled_1584533112442' ID 00 to ['CUXM741BK', 'C01022YU00L', 'CV51Y1E2X', 'CRK3VASN9'] tenantname=test tenantCDLid=11111 CSPaccountname=00000
```

###### Log format for IOC and BIOC issues

An email account or a syslog receiver are the notification channels through which IOC and BIOC issues are communicated.

Cortex Cloud logs IOC and BIOC issues. If you configure Cortex Cloud to forward logs in the legacy format, when issue logs are forwarded from Cortex Cloud, each log record has the following format:

-   **Email account:** Each field is labeled, one line per field.
    
    Example 9. 
    
    ```
    edrData/action_country: 
    edrData/action_download: 
    edrData/action_external_hostname: 
    edrData/action_external_port: 
    edrData/action_file_extension: pdf
    edrData/action_file_md5: null
    edrData/action_file_name: XORXOR2614081980.pdf
    ...
    xdr_sub_type: BIOC - Credential Access
    bioc_category_enum_key: null
    alert_action_status: null
    agent_data_collection_status: null
    attempt_counter: null
    case_id: null
    global_content_version_id: 
    global_rule_id: 
    is_whitelisted: false
    ```
    
      
    
-   **Syslog format**
    
    Example 10. 
    
    ```
    "/edrData/action_country","/edrData/action_download","/edrData/action_external_hostname","/edrData/action_external_port","/edrData/action_file_extension","/edrData/action_file_md5","/edrData/action_file_name","/edrData/action_file_path","/edrData/action_file_previous_file_extension","/edrData/action_file_previous_file_name","/edrData/action_file_previous_file_path","/edrData/action_file_sha256","/edrData/action_file_size","/edrData/action_file_remote_ip","/edrData/action_file_remote_port","/edrData/action_is_injected_thread","/edrData/action_local_ip","/edrData/action_local_port","/edrData/action_module_base_address","/edrData/action_module_image_size","/edrData/action_module_is_remote","/edrData/action_module_is_replay","/edrData/action_module_path","/edrData/action_module_process_causality_id","/edrData/action_module_process_image_command_line","/edrData/action_module_process_image_extension","/edrData/action_module_process_image_md5","/edrData/action_module_process_image_name","/edrData/action_module_process_image_path","/edrData/action_module_process_image_sha256","/edrData/action_module_process_instance_id","/edrData/action_module_process_is_causality_root","/edrData/action_module_process_os_pid","/edrData/action_module_process_signature_product","/edrData/action_module_process_signature_status","/edrData/action_module_process_signature_vendor","/edrData/action_network_connection_id","/edrData/action_network_creation_time","/edrData/action_network_is_ipv6","/edrData/action_process_causality_id","/edrData/action_process_image_command_line","/edrData/action_process_image_extension","/edrData/action_process_image_md5","/edrData/action_process_image_name","/edrData/action_process_image_path","/edrData/action_process_image_sha256","/edrData/action_process_instance_id","/edrData/action_process_integrity_level","/edrData/action_process_is_causality_root","/edrData/action_process_is_replay","/edrData/action_process_is_special","/edrData/action_process_os_pid","/edrData/action_process_signature_product","/edrData/action_process_signature_status","/edrData/action_process_signature_vendor","/edrData/action_proxy","/edrData/action_registry_data","/edrData/action_registry_file_path","/edrData/action_registry_key_name","/edrData/action_registry_value_name","/edrData/action_registry_value_type","/edrData/action_remote_ip","/edrData/action_remote_port","/edrData/action_remote_process_causality_id","/edrData/action_remote_process_image_command_line","/edrData/action_remote_process_image_extension","/edrData/action_remote_process_image_md5","/edrData/action_remote_process_image_name","/edrData/action_remote_process_image_path","/edrData/action_remote_process_image_sha256","/edrData/action_remote_process_is_causality_root","/edrData/action_remote_process_os_pid","/edrData/action_remote_process_signature_product","/edrData/action_remote_process_signature_status","/edrData/action_remote_process_signature_vendor","/edrData/action_remote_process_thread_id","/edrData/action_remote_process_thread_start_address","/edrData/action_thread_thread_id","/edrData/action_total_download","/edrData/action_total_upload","/edrData/action_upload","/edrData/action_user_status","/edrData/action_username","/edrData/actor_causality_id","/edrData/actor_effective_user_sid","/edrData/actor_effective_username","/edrData/actor_is_injected_thread","/edrData/actor_primary_user_sid","/edrData/actor_primary_username","/edrData/actor_process_causality_id","/edrData/actor_process_command_line","/edrData/actor_process_execution_time","/edrData/actor_process_image_command_line","/edrData/actor_process_image_extension","/edrData/actor_process_image_md5","/edrData/actor_process_image_name","/edrData/actor_process_image_path","/edrData/actor_process_image_sha256","/edrData/actor_process_instance_id","/edrData/actor_process_integrity_level","/edrData/actor_process_is_special","/edrData/actor_process_os_pid","/edrData/actor_process_signature_product","/edrData/actor_process_signature_status","/edrData/actor_process_signature_vendor","/edrData/actor_thread_thread_id","/edrData/agent_content_version","/edrData/agent_host_boot_time","/edrData/agent_hostname","/edrData/agent_id","/edrData/agent_ip_addresses","/edrData/agent_is_vdi","/edrData/agent_os_sub_type","/edrData/agent_os_type","/edrData/agent_session_start_time","/edrData/agent_version","/edrData/causality_actor_causality_id","/edrData/causality_actor_effective_user_sid","/edrData/causality_actor_effective_username","/edrData/causality_actor_primary_user_sid","/edrData/causality_actor_primary_username","/edrData/causality_actor_process_causality_id","/edrData/causality_actor_process_command_line","/edrData/causality_actor_process_execution_time","/edrData/causality_actor_process_image_command_line","/edrData/causality_actor_process_image_extension","/edrData/causality_actor_process_image_md5","/edrData/causality_actor_process_image_name","/edrData/causality_actor_process_image_path","/edrData/causality_actor_process_image_sha256","/edrData/causality_actor_process_instance_id","/edrData/causality_actor_process_integrity_level","/edrData/causality_actor_process_is_special","/edrData/causality_actor_process_os_pid","/edrData/causality_actor_process_signature_product","/edrData/causality_actor_process_signature_status","/edrData/causality_actor_process_signature_vendor","/edrData/event_id","/edrData/event_is_simulated","/edrData/event_sub_type","/edrData/event_timestamp","/edrData/event_type","/edrData/event_utc_diff_minutes","/edrData/event_version","/edrData/host_metadata_hostname","/edrData/missing_action_remote_process_instance_id","/facility","/generatedTime","/recordType","/recsize","/trapsId","/uuid","/xdr_unique_id","/meta_internal_id","/external_id","/is_visible","/is_secdo_event","/severity","/alert_source","/internal_id","/matching_status","/local_insert_ts","/source_insert_ts","/alert_name","/alert_category","/alert_description","/bioc_indicator","/matching_service_rule_id","/external_url","/xdr_sub_type","/bioc_category_enum_key","/alert_action_status","/agent_data_collection_status","/attempt_counter","/case_id","/global_content_version_id","/global_rule_id","/is_whitelisted"
    ```
    
      
    

Field prefixes for BIOC and IOC issue logs

| Field Name | Description |
| --- | --- |
| /edrData/action_file\* | Fields that begin with this prefix describe attributes of a file for which Traps reported activity. |
| edrData/action_module\* | Fields that begin with this prefix describe attributes of a module for which Traps reported module loading activity. |
| edrData/action_module_process\* | Fields that begin with this prefix describe attributes and activity related to processes reported by Traps that load modules such as DLLs on the endpoint. |
| edrData/action_process_image\* | Fields that begin with this prefix describe attributes of a process image for which Traps reported activity. |
| edrData/action_registry\* | Fields that begin with this prefix describe registry activity and attributes such as key name, data, and previous value for which Traps reported activity. |
| edrData/action_network | Fields that begin with this prefix describe network attributes for which Traps reported activity. |
| edrData/action_remote_process\* | Fields that begin with this prefix describe attributes of remote processes for which Traps reported activity. |
| edrData/actor\* | Fields that begin with this prefix describe attributes about the acting user that initiated the activity on the endpoint. |
| edrData/agent\* | Fields that begin with this prefix describe attributes about the Traps agent deployed on the endpoint. |
| edrData/causality_actor\* | Fields that begin with this prefix describe attributes about the causality group owner. |

Additional fields for BIOC and IOC issue logs

| Field Name | Description |
| --- | --- |
| /severity | Severity assigned to the issue: SEV_010_INFO; SEV_020_LOW; SEV_030_MEDIUM; SEV_040_HIGH; SEV_090_UNKNOWN |
| /alert_source | Source of the issue: BIOC or IOC |
| /local_insert_ts | Date and time when Cortex Cloud – Investigation and Response ingested the app. |
| /source_insert_ts | Date and time the issue was reported by the issue source. |
| /alert_name | If the issue was generated by Cortex Cloud – Investigation and Response, the issue name will be the specific Cortex Cloud rule that created the issue (BIOC or IOC rule name). If from an external system, it will carry the name assigned to it by Cortex Cloud . |
| /alert_category | Issue category based on the issue source. BIOC issue categories:- OTHER; PERSISTENCE; EVASION; TAMPERING; FILE_TYPE_OBFUSCATION; PRIVILEGE_ESCALATION; CREDENTIAL_ACCESS; LATERAL_MOVEMENT; EXECUTION; COLLECTION; EXFILTRATION; INFILTRATION; DROPPER; FILE_PRIVILEGE_MANIPULATION; RECONNAISSANCE ; IOC issue categories:- HASH; IP; PATH; DOMAIN_NAME; FILENAME; MIXED |
| /alert_description | Text summary of the event including the issue source, issue name, severity, and file path. For alerts generated by BIOC and IOC rules, Cortex Cloud displays detailed information about the rule. |
| /bioc_indicator | A JSON representation of the rule characteristics. For example: [{""pretty_name"":""File"",""data_type"":null, ""render_type"":""entity"",""entity_map"":null}, {""pretty_name"":""action type"", ""data_type"":null,""render_type"":""attribute"", ""entity_map"":null},{""pretty_name"":""="", ""data_type"":null,""render_type"":""operator"", ""entity_map"":null},{""pretty_name"":""all"", ""data_type"":null,""render_type"":""value"", ""entity_map"":null},{""pretty_name"":""AND"", ""data_type"":null,""render_type"":""connector"", ""entity_map"":null},{""pretty_name"":""name"", ""data_type"":""TEXT"", ""render_type"":""attribute"", ""entity_map"":""attributes""}, {""pretty_name"":""="",""data_type"":null, ""render_type"":""operator"", ""entity_map"":""attributes""}, {""pretty_name"":""\*.pdf"",""data_type"":null, ""render_type"":""value"", ""entity_map"":""attributes""}]" |
| /bioc_category_enum_key | Issue category based on the issue source. An example of a BIOC issue category is Evasion. An example of a Traps issue category is Exploit Modules. |
| /alert_action_status | Action taken by the issue sensor with action status displayed in parenthesis: Detected; Detected (Download); Detected (Post Detected); Detected (Prompt Allow); Detected (Reported); Detected (Scanned); Prevented (Blocked); Prevented (Prompt Block) |
| /case_id | Unique identifier for the incident. |
| /global_content_version_id | Unique identifier for the content version in which a Palo Alto Networks global BIOC rule was released. |
| /global_rule_id | Unique identifier for an issue generated by a Palo Alto Networks global BIOC rule. |
| /is_whitelisted | Boolean indicating whether the issue is excluded or not. |

###### Analytics log format

Learn about the syntax and different variables that are used in the analytics log format.

Cortex Cloud Analytics logs issues as analytics issue logs. If you configure Cortex Cloud to forward logs in the legacy format, each log record has the following format:

-   **Syslog format:**
    
    Example 11. 
    
    ```
    sub_type,time_generated,id,version_info/document_version,version_info/magnifier_version,version_info/detection_version,alert/url,alert/category,alert/type,alert/name,alert/description/html,alert/description/text,alert/severity,alert/state,alert/is_whitelisted,alert/ports,alert/internal_destinations/single_destinations,alert/internal_destinations/ip_ranges,alert/external_destinations,alert/app_id,alert/schedule/activity_first_seen_at,alert/schedule/activity_last_seen_at,alert/schedule/first_detected_at,alert/schedule/last_detected_at,user/user_name,user/url,user/display_name,user/org_unit,device/id,device/url,device/mac,device/hostname,device/ip,device/ip_ranges,device/owner,device/org_unit,files
    ```
    
      
    
-   **Email account:** Each field is labeled, one line per field.
    
    Example 12. 
    
    ```
    sub_type: Update
    time_generated: 1547717480
    id: 4
    version_info/document_version: 1
    version_info/magnifier_version: 1.8
    version_info/detection_version: 2019.2.0rc1
    alert/url: https:\\/\\/ddc1...
    alert/category: Recon
    alert/type: Port Scan
    alert/name: Port Scan 
    alert/description/html: \\t<ul>\\n\\t\\t<li>The device....
    alert/description/text: The device ...
    ...
    device/id: 2-85e40edd-b2d1-1f25-2c1e-a3dd576c8a7e
    device/url: https:\\/\\/ddc1 ...
    device/mac: 00-50-56-a5-db-b2
    device/hostname: DC1ENV3APC42
    device/ip: 10.201.102.17
    device/ip_ranges: "[{""max_ip"":""..."",""name"":""..."",""min_ip"":""..."",""asset"":""""}]"
    device/owner: 
    device/org_unit: 
    files: []
    ```
    
      
    

Fields for analytics issue logs

| Field Name | Definition |
| --- | --- |
| sub_type | Issue log subtype. Values are: `New:` First log record for the issue with this record `id`.; `Update:` Log record identifies an update to a previously logged issue.; `StateOnlyUpdate:` Issue state is updated. For internal use only. |
| time_generated | Time the log record was sent to the Cortex Cloud tenant. Value is a Unix Epoch timestamp. |
| id | Unique identifier for the issue. Any given issue can generate multiple log records—one when the issue is initially generated, and then additional records every time the issue status changes. This ID remains constant for all such issue records. You can obtain the current status of the issue by looking for log records with this id and the most recent `alert/schedule/last_detected_at` timestamp. |
| version_info/document_version | Identifies the log schema version number used for this log record. |
| version_info/magnifier_version | The version number of the Cortex Cloud – Analytics instance that wrote this log record. |
| version_info/detection_version | Identifies the version of the Cortex Cloud – Analytics detection software used to generate the issue. |
| alert/url | Provides the full URL to the issue page in the Cortex Cloud – Analytics user interface. |
| alert/category | Identifies the issue category, which is a reflection of the anomalous network activity location in the attack life cycle. Possible categories are: `C&C:` The network activity is possibly the result of malware attempting to connect to its Command & Control server.; `Exfiltration:` A large amount of data is being transferred to an endpoint that is external to the network.; `Lateral:` The network activity is indicative of an attacker who is attempting to move from one endpoint to another on the network.; `Malware:` A file has been discovered on an endpoint that is probably malware or riskware. Malware issues can also be generated based on network activity that is indicative of automated malicious traffic generation.; `Recon:` The network activity is indicative an attacker that is exploring the network for endpoints and other resources to attack. |
| alert/type | Identifies the categorization to which the issue belongs. For example Tunneling Process, Sandbox Detection, Malware, and so forth. |
| alert/name | The issue name as it appears in the Cortex Cloud – Analytics user interface. |
| alert/description/html | The issue textual description in HTML formatting. |
| alert/description/text | The issue textual description in plain text. |
| alert/severity | Identifies the issue severity. These severities indicate the likelihood that the anomalous network activity is a real attack. `High:` The issue is confirmed to be a network attack.; `Medium:` The issue is suspicious enough to require additional investigation.; `Low:` The issue is unverified. Whether the issue is indicative of a network attack is unknown. |
| alert/state | Identifies the issue state. `Open:` The issue is currently active and should be undergoing triage or investigation by the network security analysts.; `Reopened:` The issue was previously resolved or dismissed, but new network activity has caused Cortex Cloud – Analytics to reopen the issue.; `Archived:` No action was taken on the issue in the Cortex Cloud – Analytics user interface, and no further network activity has occurred that caused it to remain active.; `Resolved:` Network personnel have taken enough action to end the attack.; `Dismissed:` The anomaly has been examined and deemed to be normal, sanctioned, network activity. |
| alert/is_whitelisted | Indicates whether the issue is whitelisted. Whitelisting indicates that anomalous-appearing network activity is legitimate. If an issue is whitelisted, then it is not visible in the Cortex Cloud – Analytics user interface. Issues can be dismissed or archived and still have a whitelist rule. |
| alert/ports | List of ports accessed by the network entity during its anomalous behavior. |
| alert/internal_destinations/single_destinations | Network destinations that the entity reached, or tried to reach, during the course of the network activity that caused Cortex Cloud – Analytics to generate the issue. This field contains a sequence of JSON objects, each of which contains the following fields: `ip:` The destination IP address.; `name:` The destination name (for example, a host name). |
| alert/internal_destinations/ip_ranges | IP address range subnets that the entity reached, or tried to reach, during the course of the network activity that caused Cortex Cloud – Analytics to generate the issue. This field contains a sequence of JSON objects, each of which contains the following fields: `max_ip:` Last IP address in the subnet.; `min_ip:` First IP address in the subnet.; `name:` Subnet name. |
| alert/external_destinations | Provides a list of destinations external to the monitored network that the entity tried to reach, or actually reached, during the activity that generated this issue. This list can contain IP addresses or fully qualified domain names. |
| alert/app_id | The App-ID associated with this issue. |
| alert/schedule/activity_first_seen_at | Time when Cortex Cloud – Analytics first detected the network activity that caused it to generate the issue. Be aware that there is frequently a delay between this timestamp, and the time when Cortex Cloud – Analytics generates an issue (see the `alert/schedule/first_detected_at` field). |
| alert/schedule/activity_last_seen_at | Time when Cortex Cloud – Analytics last detected the network activity that caused it to generate the issue. |
| alert/schedule/first_detected_at | Time when Cortex Cloud – Analytics first alerted on the network activity. |
| alert/schedule/last_detected_at | Time when Cortex Cloud – Analytics last alerted on the network activity. |
| user/user_name | The name of the user associated with this issue. This name is obtained from Active Directory. |
| user/url | Provides the full URL to the user page in the Cortex Cloud – Analytics user interface for the user who is associated with the issue. |
| user/display_name | The user name as retrieved from Active Directory. This is the user name displayed within the Cortex Cloud – Analytics user interface for the user who is associated with this issue. |
| user/org_unit | The organizational unit of the user associated with this issue, as identified using Active Directory. |
| device/id | A unique ID assigned by Cortex Cloud – Analytics to the device. All issues generated due to activity occurring on this endpoint will share this ID. |
| device/url | Provides the full URL to the device page in the Cortex Cloud – Analytics user interface. |
| device/mac | The MAC address of the network card in use on the device. |
| device/hostname | The device host name. |
| device/ip | The device IP address. |
| device/ip_ranges | Identifies the subnet or subnets that the device is on. This sequence can contain multiple inclusive subnets. Each element in this sequence is a JSON object with the following fields: `asset:` The asset name assigned to the device from within the Cortex Cloud – Analytics user interface.; `max_ip:` Last IP address in the subnet.; `min_ip:` First IP address in the subnet.; `name:` Subnet name. |
| device/owner | The user name of the person who owns the device. |
| device/org_unit | The organizational unit that owns the device, as identified by Active Directory. |
| files | Identifies the files associated with the issue. Each element in this sequence is a JSON object with the following fields: `full_path:` The file full path (including the file name).; `md5:` The file MD5 hash. |

### Cortex MCP server
Learn how to install, configure, and use the Cortex MCP Server with Cortex Cloud.

#### Cortex MCP server overview

The Cortex MCP server enables you to leverage Cortex's powerful capabilities directly through natural language. Use built-in tools to manage cases and issues and conduct investigations, with the flexibility to create and customize new tools to fit specific use cases and workflows.

The Cortex MCP Server enables you to access Cortex's powerful features directly within your Large Language Model (LLM) apps. Built on the Model Context Protocol (MCP), a standard for connecting AI models to work with other applications and tools, enabling you to query your Cortex tenant and conduct investigations using natural language.

**Note:**

This feature is in **Beta**.

##### Key capabilities

-   Investigate
    
    Use the built-in tools to manage cases and issues, and conduct investigations.
    
-   Customize
    
    Create, customize, and fine-tune tools to fit specific use cases and workflows.
    
-   Flexible client
    
    The Cortex MCP Server is provided as a downloadable file that can be installed on a local machine or a container. While these instructions use Claude Desktop as the MCP client, you can use any client that supports MCP. More detailed setup instructions are provided in a README file included in the download.
    

**Note:**

The Cortex MCP Server empowers you to integrate AI into your security workflows using natural language. When using LLM-based suggestions, always review and approve actions suggested by the AI before they're executed. We recommend deploying the Cortex MCP server in a secure environment where access is limited to authorized users.

To install, configure, and use the Cortex MCP server:

1.  Install the Cortex MCP server
    
2.  Configure the MCP client
    
3.  (Optional) Create custom Cortex MCP server tools
    
4.  Use the Cortex MCP server

##### Install the Cortex MCP server

Download, install, and configure the MCP server on your local machine or a container.

With the Cortex MCP Server, you can use natural language in your MCP client to investigate and manage cases and issues. The MCP Server can be run within a Docker container or a Poetry virtual environment. .

This documentation contains instructions for configuring and using the Cortex MCP server. More detailed setup instructions are provided in a README file included in the download.

These instructions use Claude Desktop, but you can use any client that supports MCP.

**Prerequisites:**

If you are running the Cortex MCP server in a Poetry virtual environment, you must have Python 3.13 or higher.

If you plan to run the Cortex MCP server in a Docker container, you must have Docker installed.

###### Step 1: Create an API key

**Note:**

The MCP Server uses public APIs to communicate and is limited by the license quotas available in your tenant. This is particularly relevant when running XQL queries. For more information on running XQL query APIs, see [Run XQL query APIs](https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM-Platform-APIs/Run-XQL-query-APIs).

1.  Select Settings → Configurations → Integrations → API Keys → New Key.
    
2.  In the Role tab, perform for the following:
    
    1.  Under Security Level, select Standard.
        
    2.  Under Role, select the desired level of access for this key. You can select from predefined roles or custom roles. Roles are available according to what was defined in either the Cortex Gateway or the tenant's Access Management. You can view the configuration of the role selected by expanding the sections under Components.
        
        **Note:**
        
        It is critical to avoid assigning excessive permissions when creating an API key for the Cortex MCP Server. Since the key has both read and write capabilities, overly broad permissions can lead to unintended actions and potentially compromise your environment. Ensure the key follows the principle of least privilege and is granted only the minimum required access.
        
    3.  (Optional) Under Comment, provide a comment that describes the purpose of the API key.
        
    4.  (Optional) If you want to define a time limit on the API key authentication, select Enable Expiration Date, and select the expiration date and time. You can track the expiration date of each API key in the API Keys page. In addition, a API Key Expiration notification appears in the Notification Center one week and one day prior to the defined expiration date.
        
3.  (Optional) If Scope-Based Access Control (SBAC) is enabled for the tenant, click Scope, and under Scope Definition, select the scope areas that you want to limit the user role to access for this API.
    
4.  Click Generate to generate the API key.
    
5.  Copy the generated API key and click Done.
    
    **Important:**
    
    To configure the Cortex MCP Server, you need the Cortex API URL, Cortex API key, and Cortex API key ID. You will not be able to view the API key again after you complete this step. Ensure that you copy the API key before closing the notification.
    

###### Step 2: Download and install the Cortex MCP server

1.  Go to Settings → Configurations → Integrations → Cortex MCP Server.
    
2.  Download MCP File
    
3.  (Optional) Download the checksum file and run a command such as `shasum` (Linux/macOS) or `certutil` (Windows) to verify the integrity and authenticity of the file. For example: `shasum -a 256 -c cortex-checksum.zip.sha256`.
    
4.  Extract the .zip file.
    
5.  Follow the detailed instructions in the README.md file located in the top directory. Instructions are provided for both Docker and Poetry and include the following:
    
    Docker
    
    -   Create an .env file with the environment variables.
        
        **Note:**
        
        When using Docker, we recommend using an .env file to set the Cortex API credentials as environment variables. While the credentials can be provided in the MCP client configuration settings, the .env file provides safer handling of API credentials and makes your configuration easily reproducible.
        
    -   Build and run the Docker container.
        
    
    Poetry
    
    -   Install Poetry.
        
    -   Create and activate a virtual environment.
        
    -   Install project dependencies.
        
    -   Provide the required variables in the Python runtime environment.
        
    

###### Step 3: Run the Docker container or start the server in the Poetry virtual environment

**Note:**

By default, stdio (standard input/output) is used. You can also configure Streamable HTTP, to send requests directly to the tenant instead of through the MCP client. Streamable HTTP can be useful for testing in the browser without a MCP client and to bypass limits that may be in place for your MCP client. For Docker, you can include the Streamable HTTP variables in the .env file. You can also include it as a flag when you start the server in the Python virtual environment.

Docker

`docker run --env-file .env -it cortex-mcp`

Poetry virtual environment

`python src/main.py`

When using the Poetry virtual environment, you can also start the server using the CLI command `python src/cli.py start [OPTIONS`, where [OPTIONS] includes the API key id, API key, the Cortex PAPI server URL, and the log level.

###### Use the CLI

From the CLI, you can run three commands.

-   `start`: Start the Cortex MCP server. Relevant only for the Poetry virtual environment.
    
-   `update`: Any new or updated components provided by Cortex are automatically downloaded into the remote_components folder.  During each update, the folder is fully replaced and all existing contents are recreated. Do not add custom tools to this directory, as it is managed entirely by Cortex and is overwritten at every update.
    
-   `version`: Display the current version of the Cortex MCP Server.
    

Additional information about the CLI is available in the README file located in the `src` directory.

##### Configure the MCP client

Configure your local MCP client to communicate with the Cortex MCP server.

After you have downloaded and installed the Cortex MCP server, you need to configure your local MCP client to communicate with the Cortex MCP server. The instructions below use Claude Desktop, but any MCP client can be used.

1.  In the Claude Desktop app, navigate to Settings → Developer → Edit Config. The configuration file opens in your default text editor.
    
    For reference, the file is located at:
    
    -   macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
        
    -   Windows: `%APPDATA%\Claude\claude_desktop_config.json`
        
    
2.  Add the `mcpServers` configuration to the file. The examples below are provided for local client (Poetry virtual environment) and container (Docker). The exact details of your `mcpServers` configuration depend on your specific installation.
    
    Poetry virtual environment
    
    ```
    {
      "mcpServers": {
        "Cortex MCP Server": {
          "command": "python",
          "args": [
            "/path/to/cortex-mcp/src/main.py"
          ],
           "env": {
              "CORTEX_MCP_PAPI_URL": "https://api.cortex.example.com",
              "CORTEX_MCP_PAPI_AUTH_HEADER": "<your_api_key>", 
              "CORTEX_MCP_PAPI_AUTH_ID": "<your_api_key_id",
              "MCP_TRANSPORT": "stdio/streamable-http"
       }
        }
      }
    }
    ```
    
    Docker Container
    
    ```
    {
      "mcpServers": {
        "Cortex MCP Server": {
          "command": "docker",
          "args": [
            "run",
            "--env-file",
            "/path/to/.env",
            "-i",
            "--rm",
            "cortex-mcp"
          ]
        }
      }
    }
    ```
    
3.  Save the changes to the configuration file and restart Claude Desktop for the changes to take effect.
    
4.  Verify the connection to the Cortex MCP server. You should see the Cortex MCP server running in the Developer settings and a hammer icon may appear in the input box, indicating the MCP tools are available.

##### Use the Cortex MCP server

Use the MCP server to investigate and manage cases and issues from your local MCP client.

The Cortex MCP server provides built-in tools to manage cases and issues and conduct investigations.

Built-in tools include, but are not limited to:

-   **get_assets**: Fetch all assets, or a filtered subset of assets, based on criteria such as category, region or provider.
    
-   **get_assets_by_id**: Fetch detailed information about the asset specified by the asset ID.
    
-   **get_cases**: Fetch all cases, or a filtered subset of cases matching specific criteria such as domain, status, severity or specific case Id.
    
-   **get_issues**: Fetch all issues, or a filtered subset of issues matching specific criteria such as domain, severity, detection method or specific issue ID.
    
-   **get_assessment_results**: Fetch the results of all or filtered compliance assessments from the Cortex platform.
    
-   **get_filtered_endpoints**: Fetch a filtered list of endpoints managed by the XDR agents based on their status, XDR agent status, and other filters.
    

When you run the `update` command in the Cortex MCP server, new or updated tools provided by Cortex are automatically downloaded.

You also have the flexibility to create and customize your own tools to fit specific use cases and workflows. For more information, see Create custom Cortex MCP server tools.

###### Use case examples

**Note:**

The built-in tools retrieve information, but do not write to the tenant. You can create your own tools that include write actions. The examples below include both.

-   Show me the top ten most critical cases and create a graphical representation for my manager to review.
    
-   Give me the details for case ID 12345 and create a visual timeline.
    
-   Isolate endpoint WIN-123 because it may be compromised.
    
-   Retrieve full details for endpoint XXXX.
    
-   Add a note to case 12345 saying ‘Escalated to Tier 2 for further investigation.

##### Create custom Cortex MCP server tools

Create your own customized tools to manage cases and issues.

You can build your own tools using OpenAPI or Python to manage cases, handle issues, and conduct investigations. More detailed information can be found in the README file located in the `src/usecase` directory. Tools are based on Cortex API endpoints.

To view the Cortex Cloud API documentation, see [Cortex Cloud Platform APIs](https://docs-cortex.paloaltonetworks.com/r/Cortex-Cloud-Platform-APIs/Cortex-Cloud-Platform-APIs).

**Note:**

Any new or updated components provided by Cortex are automatically downloaded into the remote_components folder.  During each update, the folder is fully replaced and all existing contents are recreated. Do not add custom tools to this directory, as it is managed entirely by Cortex and is overwritten at every update.

OpenAPI

You can create an OpenAPI specification for a specific API endpoint.

1.  Create a YAML file in the `/custom_components/openapi` directory with the name of the MCP component. For example: `custom_cortex_component.yaml`.
    
2.  Base your custom OpenAPI component on the Cortex API documentation structure for a specific endpoint. We recommend viewing the built-in tools, located at `/builtin_components/openapi`, as a reference.
    
3.  After you define the OpenAPI specification, the Cortex MCP server collects it automatically and it is ready for use.
    
4.  Test your new MCP component by running the Cortex MCP server and writing a prompt that uses your new component.
    

Python

We recommend using Python for more complex MCP components that require custom logic. MCP components in Python are defined in a module.

1.  Create a new Python file in the `/custom_components` directory.
    
2.  Define a class that inherits from the `BaseModule` class with the required methods. We recommend viewing the built-in modules, located at `/builtin_components`, as a reference.
    
3.  After you define a class, the Cortex MCP server collects it automatically and it is ready for use.
    
4.  Test your new MCP component by adding an end-to-end test in the `tests/e2e` directory or run the MCP server and write a prompt that uses your new component.

### Manage user roles and access management

Learn how to manage access for users, user roles, user groups, and Single Sign-On (SSO) for users on a specific Cortex Cloud tenant.

**Prerequisite:**

Managing users, roles, scopes, user groups, authentication settings in Cortex Cloud Access Management requires View/Edit RBAC permissions for Access Management (under Configurations). Account Admin and Instance Administrator roles are granted this permission by default. For more information, see _Predefined user roles_ in Set up users and roles.

Access management enables you to control who can access the different parts of your organization's resources. It ensures only authorized users can interact with sensitive data.

Cortex Cloud uses a combination of Role-Based Access Control (RBAC) and Scope-Based Access Control (SBAC) to ensure scalability and granular control.

What is the difference between RBAC and SBAC?

RBAC assigns permissions based on a user's organizational role, such as Investigator or Responder, establishing a clear hierarchy and set of capabilities for each role and simplifying management by linking access to job functions. RBAC does this by helping to manage access to Cortex Cloud components and Cortex Query Language (XQL) datasets, so that users, based on their roles, are granted minimal access required to accomplish their tasks.

SBAC refines RBAC by granting access only to the relevant data that the user requires for their designated role. Users with Access Management permission apply scopes to limit the data and content that users can be granted access to in Cortex Cloud, which are divided into different scoping areas. The scoping areas include Assets, Cases and Issues, and Endpoints, which can be applied as relevant to the enforcement area or entity.

For example, an Investigator role might have access to asset information based on the RBAC permissions, but SBAC granular scoping could limit that investigator's view and control to only assets within a particular scoping area. This hybrid approach ensures scalability and granular control, significantly strengthening system security.

Understanding more about access management concepts

You can manage access for users, and create and assign user roles and user groups for a specific tenant. When Single Sign-On (SSO) is enabled, you can manage SSO for users.

#### Users

You can manage access permissions and activities for users allocated to a specific Customer Support Portal account and tenant. All users must belong to a user group or have an assigned role.

#### User roles

User roles enable you to define the type of access and actions a user can perform. User roles are assigned to users, user groups, or API keys.

**Note:**

For more information on assigning user roles when generating an API key, see Manage API keys.

Predefined user roles

Cortex Cloud provides predefined built-in user roles that provide specific access rights that cannot be modified. You can also create custom, editable user roles. To view the predefined permissions for each default role, go to Settings → Configurations → Access Management → Roles.

Dataset access permissions

You can also set dataset access permissions using user roles or set specific permissions using role-based access control (RBAC). Configuring administrative access depends on the security requirements of your organization. Dataset permissions control dataset access for all components, while RBAC controls access to a specific component. By default, dataset access management is disabled, and users have access to all datasets. If you enable dataset access management, you must configure access permissions for each dataset type, and for each user role. When a dataset component is enabled for a particular role, the Issues and Cases pages include information about datasets. For more information on how to set dataset access permissions, see Manage user roles.

**Note:**

Some features are license-dependent. Accordingly, users may not see a specific feature if the feature is not supported by the license type or if they do not have access based on their assigned role or scope.

#### User groups and scoping areas

You can use user groups to streamline configuration activities by grouping together users whose access permission requirements are similar. Import user groups from Active Directory, or create them from scratch in Cortex Cloud.

Users with Access Management permission can further restrict access of these user groups, specifically for the designated role and list of users configured in the user group by granting access only to the relevant data that the user requires for their designated role. This is performed by applying scopes to limit the data and content that users can be granted access to in Cortex Cloud, which are divided into different scoping areas. The scoping areas include Assets, Cases and Issues, and Endpoints, which can be applied as relevant to the enforcement area or entity. This enables you to adhere to your company's security policies of limiting user access by specifying, for example, which groups of assets users can access and what actions they can perform.

**Note:**

For features where scoping is not applicable, Role-Based Access Control (RBAC) is used and can be configured when managing user roles. For more information, see Manage user roles.

#### Single Sign-On

Manage your SSO integration with the Security Assertion Markup Language (SAML) 2.0 standard to securely authenticate system users across enterprise-wide applications and websites, with one set of credentials. This configuration allows system users to authenticate using your organization's Identity Provider (IdP), such as Okta or PingOne. You can integrate any IdP with Cortex Cloud supported by SAML 2.0.

SSO with SAML 2.0 configuration activities are dependent on your organization’s IdP. Some of the field values need to be obtained from your organization’s IdP, and some values need to be added to your organization’s IdP. It is your responsibility to understand how to access your organization’s IdP to provide these fields, and to add any fields from Cortex Cloud to your IdP.

After SSO configuration is complete, when you sign in as an SSO user, the Cortex Cloud permissions granted to you after logging in, either from the group mapping or from the default role configuration, are effective throughout the entire session for the defined maximum session length. Maximum session length is defined in your Cortex Cloud Session Security Settings. This applies even if the default role configuration is updated, or the group membership settings were changed.

#### Manage user roles

Manage user roles that are assigned to Cortex Cloud users or user groups in Cortex Cloud Access Management.

**Prerequisite:**

Managing user roles in Cortex Cloud Access Management requires View/Edit RBAC permissions for Access Management (under Configurations). Account Admin and Instance Administrator roles are granted this permission by default. For more information, see _Predefined user roles_ in Set up users and roles.

Review the following topics:

-   Set up users and roles
    
-   User group management
    
-   Assign user roles and groups
    
-   Manage user roles and access management
    

Manage user roles that are assigned to Cortex Cloud users, user groups, or API keys. User roles enable you to define the type of access and actions a user can perform.

You can only set dataset access permissions from a user role in Cortex Cloud Access Management for the tenant. When creating user roles from the Cortex Gateway, these settings are disabled. By default, dataset access management is disabled, and users have access to all datasets. If you enable dataset access management, you must configure access permissions for each dataset type, and for each user role. When a dataset component is enabled for a particular role, the Issues and Cases pages include information about datasets.

##### Create a user role

1.  Select Settings → Configurations → Access Management → Roles.
    
2.  Click New Role.
    
3.  Under Role Name, enter a name for the user role.
    
4.  (Optional) Under Description, enter a description for the user role.
    
5.  Under Components, expand each list and select the permissions for each of the components.
    
6.  Under Datasets (Disabled), you have two options for setting the Cortex Query Language (XQL) dataset access permissions for the user role:
    
    -   Set the user role with access to all XQL datasets by leaving the dataset access management as disabled (default).
        
    -   Set the user role with limited access to certain XQL datasets by selecting the Enable dataset access management toggle and selecting the datasets under the different dataset category headings.
        
    
7.  Click Save.
    

##### Edit a user role

1.  Select Settings → Configurations → Access Management → Roles.
    
2.  Right-click the relevant user role, and select Edit Role.
    
3.  (Optional) Under Role Name, modify the name for the user role.
    
4.  (Optional) Under Description, enter a description for the user role or modify the current description.
    
5.  Under Components, expand each list and select the permissions for each of the components.
    
6.  Under Datasets, you have two options for setting the Cortex Query Language (XQL) dataset access permissions for the user role:
    
    -   Set the user role with access to all XQL datasets by disabling the Enable dataset access management toggle.
        
    -   Set the user role with limited access to certain XQL datasets by selecting the Enable dataset access management toggle and selecting the datasets under the different dataset category headings.
        
    
7.  Click Save.
    

##### Create new role based on an existing role

1.  Select Settings → Configurations → Access Management → Roles.
    
2.  Right-click the relevant user role, and select Save As New Role.
    
3.  (Optional) Under Role Name, modify the name for the user role.
    
4.  (Optional) Under Description, enter a description for the user role or modify the current description.
    
5.  Under Components, expand each list and select the permissions for each of the components.
    
6.  Under Datasets, you have two options for setting the Cortex Query Language (XQL) dataset access permissions for the user role:
    
    -   Set the user role with access to all XQL datasets by disabling the Enable dataset access management toggle.
        
    -   Set the user role with limited access to certain XQL datasets by selecting the Enable dataset access management toggle and selecting the datasets under the different dataset category headings.
        
    
7.  Click Save.

#### Manage user access

Manage access permissions for Cortex Cloud users.

**Prerequisite:**

Managing users, roles, scopes, user groups, authentication settings in Cortex Cloud Access Management requires View/Edit RBAC permissions for Access Management (under Configurations). Account Admin and Instance Administrator roles are granted this permission by default. For more information, see _Predefined user roles_ in Set up users and roles.

Review the following topics:

-   Set up users and roles
    
-   User group management
    
-   Assign user roles and groups
    
-   Manage user roles and access management
    
-   Manage user scope
    

Manage access permissions for Cortex Cloud users.

##### Edit user permissions

Update a user's role and scope, add a user to a user group, and view permissions based on the role, scope, and user groups assigned to the user.

You can configure granular scoping for Scope-Based Access Control (SBAC) by granting access only to the relevant data that the user requires for their designated role. Administrators apply scopes to limit the data and content that users can be granted access to in Cortex Cloud, which are divided into different scoping areas. The scoping areas include Assets, Cases and Issues, and Endpoints, which can be applied as relevant to the enforcement area or entity. For more information, see Manage user scope.

**Note:**

You can only reduce the permissions of an Account Admin user via Cortex Gateway.

1.  Select Settings → Configurations → Access Management → Users.
    
2.  Right-click the relevant user, and select Edit User Permissions.
    
    **Tip:**
    
    To apply the same settings to multiple users, select them, and then right-click and select Edit User Permissions.
    
3.  In the Role tab, under Role, select the default or custom role.
    
4.  (Optional) Under User Groups, add the user to a group.
    
5.  (Optional) Under Show Accumulated Permissions:
    
    1.  Do one of the following:
        
        -   Select all to view the combined permissions for every role and user group assigned to the user.
            
        -   Select a specific role assigned to the user to view the available permissions for that role.
            
        
    2.  Under Components, expand each list to view the permissions to the various Cortex Cloud components.
        
    3.  Under Datasets, there are two possibilities for viewing a user's dataset access permissions:
        
        -   When dataset access management is enabled and the user has access to certain Cortex Query Language (XQL) datasets, the datasets are listed.
            
        -   When dataset access management is disabled and users have access to all XQL datasets, the text No dataset has been selected is displayed.
            
        
    
    **Note:**
    
    User permissions for components and datasets are based on the access permissions set in the user role. For more information on editing these user role permissions, see Manage user roles.
    
6.  (Optional) You can configure granular scoping:
    
    1.  Click the Scope tab.
        
    2.  Under Scope Definition, expand the scoping areas that you want to grant the user role access to in the tenant by clicking the chevron icon (\>) beside the scoping area title, and make any changes required. The following table explains the options available to configure:
        
        **Important:**
        
        Before configuring, ensure that you review Understand scoping in the Manage user scope section.
        
        | Scoping Area | Granular Scoping Configurations |
        | --- | --- |
        | Assets | Set the Scope by selecting one of the following: No assets: No asset is accessible.; All assets: Defines access to all assets.; Select asset groups: Defines access to the specific assets associated with the Asset Groups selected, and to view all their related cases, issues, and findings for these specific assets and Asset Groups. Under Select asset groups, define the specific asset groups that you want to grant access. Only Asset Groups relevant for scoping are listed, which are asset groups that are using only the asset attributes listed in Manage user scope (under Understand scoping → Scoping Areas → Assets). The scoping of assets also affects the scoping of cases, issues, and findings. \*\*Note:\*\* Visibility of Security domain Issues that refer to assets with agents is controlled by the Endpoints scoping configuration. |
        | Cases and Issues | Set the Scope by selecting one of the following: No cases and issues: Defines access to no cases and issues.; All cases and issues: Defines access to all cases and issues. Users can view cases or issues referencing assets within their scope. Use the Assets section to define which assets are in scope.; Select domains: Defines access to the domains selected to view their related cases and issues. Under Select domains, define the specific domains that you want to grant access. Users can only view cases or issues referencing assets and endpoints within their scope. Use the Assets section to define which assets are in scope. When selecting All cases and issues or Select domains, you can separately configure access to issues and cases that lack an asset reference or where the referenced asset is not in All Assets and All Endpoints inventories. To provide access, select the Allow access to cases and issues that are not referencing known assets or endpoints checkbox. Once selected, you can specifically control which users have access to issues and cases that lack Affected Assets (as seen in the issue’s panel) and Assets (as seen in the case's panel), or where the listed assets are not part of the Asset or Endpoint inventories. When the assets listed are not part of the inventories, the asset string is typically non-clickable. In some cases, such as for identity-related issues, assets may open a dedicated User Risk View, which differs from the standard inventories panels. In the Issues and Cases tables, such items can be identified by empty values in the following columns: Asset IDs, Target Agent Identifier, and Source Agent Identifier. |
        | Endpoints | Set the Scope by selecting one of the following: No endpoints: Defines access to no endpoints with no ability to view their related agent management and enterprise policies.; All endpoints: Defines access to all endpoints with the ability to view their related agent management and enterprise policies. This configuration can impact the visibility of related Security domain Cases and Issues, but will not affect asset visibility.; Select specific (at least one required): Defines specific access to all endpoint groups by selecting Endpoint Groups or all endpoint tags by selecting Endpoint Tags to view their related agent management and enterprise policies. This configuration can impact the visibility of related Security domain Cases and Issues, but will not affect asset visibility. |
        
    
    **Important:**
    
    By default, Enable Scope Based Access Control is disabled in Settings → Configurations → General → Server Settings, and granular scoping is not enforced. Before enabling SBAC, we recommend that an administrator or a user with Access Management permissions first ensures that the users, user groups, and API Keys defined in Cortex Cloud are granted the required access by assigning the relevant scopes. For more information, see Manage user scope.
    
7.  Click Save.
    

##### Import multiple users

Use a CSV file to import users who belong to a Customer Support Portal account, and assign them roles that are defined in Cortex Cloud. You can use the CSV template provided in Cortex Cloud, or prepare a CSV file from scratch.

1.  Select Settings → Configurations → Access Management → Users.
    
2.  Click Import Multiple User Roles.
    
3.  Do one of the following:
    
    -   To use the CSV template, click Download example file, and replace the example values with your values.
        
    -   Prepare a CSV file from scratch. Make sure the file includes these columns:
        
        -   User email: Email address of the user belonging to a Customer Support Portal account, for example, john.smith1@exampleCompany.com.
            
        -   Role name: Name of the role that you want to assign to this user, for example, Privileged Responder. The role must already exist in Cortex Cloud.
            
        -   Is an account role: A boolean value that defines whether the user is designated with an Account Admin role in Cortex Gateway. Set the value to TRUE; otherwise, the value is set to FALSE (default).
            
        
    
4.  Locate the file and drag it to the dialog box.
    
5.  Click Import.
    

##### View user permissions

View all of the permissions currently assigned to a user.

1.  Select Settings → Configurations → Access Management → Users.
    
2.  Right-click the relevant user, and select Edit User Permissions.
    
    **Tip:**
    
    To apply the same settings to multiple users, select them, and then right-click and select Edit User Permissions.
    
3.  In the Role tab, under Show Accumulated Permissions, do one of the following:
    
    -   Select all to view the combined permissions for every role and user group assigned to the user.
        
    -   Select a specific role assigned to the user to view the available permissions for that role.
        
    
4.  Under Components, expand each list to view the permissions to the various Cortex Cloud components.
    
5.  Under Datasets, there are two possibilities for viewing a user's dataset access permissions:
    
    -   When dataset access management is enabled and the user has access to certain Cortex Query Language (XQL) datasets, the datasets are listed.
        
    -   When dataset access management is disabled and users have access to all XQL datasets, the text No dataset has been selected is displayed.
        
    
6.  To view the granular scoping configurations granted to the user role, click the Scope tab, and under Scope Definition, expand the scoping areas to view the settings by clicking the chevron icon (\>) beside the scoping area title. The scoping areas include Assets, Cases and Issues, and Endpoints.
    

##### Hide user

There might be instances where you want to hide a user from the list of users, for example, a user that has a Customer Support Portal Super User role but isn't active on your Cortex Cloud tenant. After you hide a user, they will no longer be displayed in the list of users when Show User Subset is selected on the Users page.

1.  Select Settings → Configurations → Access Management → Users.
    
2.  Right-click the relevant user, and select Hide User.
    

##### Add user to a user group

1.  Select Settings → Configurations → Access Management → Users.
    
2.  Right-click the relevant user, and select Edit User Permissions.
    
    **Tip:**
    
    To apply the same settings to multiple users, select them, and then right-click and select Edit User Permissions.
    
3.  Under User Groups, add the user to a group.
    
4.  Click Save.
    

##### Deactivate user

You cannot deactivate a user who has an Account Admin role.

1.  Select Settings → Configurations → Access Management → Users.
    
2.  Right-click the relevant user, and select Deactivate User.
    
3.  Click Deactivate.
    

##### Remove role assigned to user

You cannot remove a user who has an Account Admin role.

1.  Select Settings → Configurations → Access Management → Users.
    
2.  Right-click the relevant user, and select Remove User Role.
    
3.  Click Remove.

##### User access reference information
The following is a list of common fields on the Users page:

| Field | Description |
| --- | --- |
| Show User Subset | Displays all users except for hidden users. |
| User Type | Indicates whether a user was defined in Cortex Cloud using the Customer Support Portal, SSO (single sign-on) using your organization’s IdP, or both Customer Support Portal/SSO. |
| Direct XDR Role | Name of the role specifically assigned to a user. When a user does not have any Cortex Cloud access permissions assigned specifically to them, the field displays No-Role. |
| Groups | Lists the groups to which a user belongs. Any group that was imported from Active Directory displays AD beside the group name. If a user group has scoping permissions, the users in the group are granted permissions according to the user group settings, even if the user does not have configured scope settings. |
| Group Roles | Lists the group roles based on the groups to which a user belongs. Hovering over the group role displays the group associated with this role. |
| Scope | Lists a summary of the granular scoping configured for the user. |
| Groups Scope | Lists a summary of the granular scoping configured in the user groups that the user belongs to |

#### Manage user scope

Learn about Scope-Based Access Control (SBAC) and how to assign users to specific scoping areas in your organization.

**Prerequisite:**

-   Configuring user scopes in Cortex Cloud Access Management requires View/Edit RBAC permissions for Access Management (under Configurations). Account Admin and Instance Administrator roles are granted this permission by default. For more information, see _Predefined user roles_ in Set up users and roles.
    
-   By default, Enable Scope Based Access Control is disabled in Settings → Configurations → General → Server Settings, and granular scoping is not enforced. Before enabling SBAC, we recommend that you first ensure that the users, user groups, and API Keys defined in Cortex Cloud are granted the required access by assigning the relevant scopes.
    

Review the following topics:

-   Set up users and roles
    
-   User group management
    
-   Assign user roles and groups
    
-   Manage user roles and access management
    

##### What is SBAC?

Cortex Cloud enables you to use Scope-Based Access Control (SBAC) in combination with Role-Based Access Control (RBAC) to define precise access controls according to your organization's security policies. While RBAC defines what a role can access and the actions that can be performed, SBAC determines the specific data and content displayed when accessing these areas and performing those actions.

Users with Access Management permission apply scopes to limit the data and content that users can be granted access to in Cortex Cloud, which are divided into different scoping areas. The scoping areas include Assets, Cases and Issues, and Endpoints, which can be applied as relevant to the enforcement area or entity. For example, an Investigator role might have access to asset information based on the RBAC permissions, but the SBAC granular scoping configuration could limit that investigator's view and control to only assets within a particular scoping area. This hybrid approach ensures scalability and granular control, significantly strengthening system security by ensuring only authorized users are granted access to the relevant data that the user requires for their designated role.

Granular scoping for all scoping areas is configured in users, user groups, or API Keys according to the designated user role. Users are granted granular scoping access based on the user role assigned to them either in a user group or directly.

##### Things to consider before configuring SBAC

Before you begin setting Scope-Based Access Control (SBAC) granular scoping, consider the following information:

-   SBAC is disabled by default, which means that users have access to all content and data in the areas they have access to according to the RBAC permissions defined in their role.
    
-   To best address Cases that span across all scopes, we recommend that there always be designated users with full access to all cases, issues, assets, and findings.
    
-   Policies and playbook execution can affect items outside the user’s scope, even though scoped users can’t view them. As a result, we recommend that users who write policies be granted access to all relevant policy assets, so they can review the effects of the policies.
    
-   Some areas and features in Cortex Cloud do not comply with SBAC. In these cases, use RBAC permissions to restrict access. For more information, see Functional areas that respect and don't respect SBAC.
    
-   Respecting SBAC has some performance overhead when opening the Cases, Issues, Findings, and Assets tables, which can take more time.
    
-   In Reports, SBAC applies when a report is manually generated, not when it is accessed in any other way. Scheduled reports do not run in any user context and are not subject to SBAC.
    

##### Understand scoping

##### Scoping areas

User Groups, Users, and API Keys can be scoped according to the following scoping areas:

-   **Assets**: Provides access to the assets associated with asset groups, and enables you to access their related cases, issues, and findings. When using asset groups, you can limit access based only on this list of attributes: Asset Class, Category, Provider, Region, Organization, Realm, Business Application Names, Kubernetes Cluster, Kubernetes Namespace, Code Repository, and Asset Tags.
    
    -   When you create or edit an Asset Group, the changes are applied immediately to new assets and to existing assets that have been updated. Yet, it can take a few hours for the changes to appear on existing assets that have not been updated.
        
    
-   **Cases and Issues**: Provides access to domains to view their related cases and issues.
    
-   **Endpoints**: Applies scoping on an endpoint as an entity and provides access to Endpoint Groups and Endpoint Tags to view their related agent management and enterprise policies.
    
    **Note:**
    
    This configuration can impact the visibility of the related Security domain in the Cases and Issues scope area, but with not affect asset visibility.
    

##### Scoping Behaviors

-   When applicable, all conditions must be met to apply the scope configuration. For example, an issue with an affected asset is accessible only if the asset is in scope and the issue's domain is in scope. Similarly, a Case with multiple issues, where some have affected assets and others have affected endpoints, will be inaccessible if the Endpoint condition is set to 'No Endpoints,' even if the affected assets satisfy the Assets condition.
    
-   If only a subset of affected assets, endpoints, or issue domains are within a user's scope, the user can still view the full list of all items within a Case they have access to. While items outside of their scope remain visible in the list, the user cannot access further details or open the specific cards for those out-of-scope assets, endpoints, or issues.
    
-   Cases and Issues of deleted assets do not have affected assets and so are not affected by asset-led SBAC or Endpoints.
    
-   The behavior of cases and issues with affected endpoints depends on the Endpoint Scoping mode.
    
-   XQL queries that use the `cases`, `issues`, `findings`, and `asset_inventory` datasets respect only the Assets scoping area configurations.
    

##### Functional areas that respect and don't respect SBAC

It is important to review both the functional areas and features in Cortex Cloud that are respected and not fully respected so you can decide what actions to take in your tenant.

Functional areas respected

Scope-Based Access Control (SBAC) applies to the following functional areas in Cortex Cloud:

**Important:**

Some areas and features in Cortex Cloud do not respect SBAC. In these cases, use RBAC permissions to restrict access.

| Functional Area | Description | Related scoping area |
| --- | --- | --- |
| Cases, Issues, Findings, and Assets tables | View and manage cases, issues, findings, and assets, and take actions in these tables. | Assets; Cases and Issues; Endpoints |
| Dashboard and Reports | Scoping takes place only on the following: XQL-related widgets based on XQL queries that use the `cases`, `issues`, `findings`, and `asset_inventory` datasets, and respect only the Assets scoping area configurations.; Agent-related widgets. \*\*Note:\*\* XQL-based dashboard widgets may require a few hours to initially reflect changes to the list or definitions of asset groups used for scoping. To view the most current data immediately, refresh the dashboard or its XQL widgets. | Assets; Cases and Issues; Endpoints |
| Public APIs | Public APIs that access Cases, Issues, Findings, and Assets information respect Scope-Based Access Control (SBAC). | Assets; Cases and Issues |
| Cortex Query Language (XQL) | When using XQL with `cases`, `issues`, `findings`, and `asset_inventory` datasets, keep in the mind the following: XQL respects asset-led SBAC when accessing these datasets, including when using XQL queries and XQL widgets.; XQL queries that use these datasets, respect only the Assets scoping area configurations. \*\*Note:\*\* For Cases and Issues domains, a workaround is to create a Dataset View for each required combination of domains, and allow the relevant entity access only to this Dataset View, not to the underlying `cases` and `issues` datasets. | Assets |
| Endpoint Administration table | View endpoints and take actions on endpoints. | Endpoints |
| Policy Management | Create and edit Prevention policies and profiles, Extension policies and profiles, and global and device Exceptions that are within the scope of the user. | Endpoints |
| Action Center | View and take actions only on endpoints that are within the scope of the user. | Endpoints |
| Identity Security | View and manage identity assets, permissions, and issues that are within the scope of the user. For more information, see Manage RBAC and SBAC in Cortex Cloud Identity Security. | Assets; Cases and Issues |
| Cloud Workload Policies | View Cloud Workload Policies when user access is scoped to any of the available options: All assets, No assets, or Select asset groups. When no SBAC restriction is applied, the user’s access is determined solely by their RBAC permissions. For more information, see Cloud Workload Policies and Rules. | Assets |

SBAC not fully respected functional areas

Ensure that you review the points below that explain the main functional areas with limitations with respecting SBAC, so you can decide how to handle this in your tenant. A suggested action is provided when applicable.

-   Access to datasets: Access to the `alerts` and `incidents` datasets do not support SBAC. As a result, consider limiting users from accessing these datasets by excluding access to the datasets mentioned above using Dataset Views, and only enabling access to `cases` and `issues` datasets that respect SBAC.
    
-   Graph Search: Graph Search does not support SBAC. It is currently a Beta feature and is only available in the tenant using a feature flag.
    
-   Command Centers: Aggregate numbers in Command Centers can also sum up data that is not in the user scope. When pivoting from Command Centers to the Cases, Issues, Findings, and Assets tables, these tables do respect SBAC. We recommend limiting the users who access Command Centers, and these users should be granted a broader scope. For all other users, disable access in RBAC settings (Dashboards & Reports → Command Center Dashboards).
    
-   Host Inventory
    
    We recommend disabling access in RBAC settings (Investigation & Response → Search → Host Insights).
    
-   Timeline widget
    
    As a workaround, you can disable access through RBAC permissions by disabling Dashboards (Dashboards & Reports → Dashboards).
    
-   Notification Center
    
-   Agent Installation widget: This widget is not available for scoped users.
    
-   Drop-downs of cases and issues domains: Drop-downs of these domains display all domains.
    
-   KSPM dashboard: Users can access all information on the dashboard when their user access is scoped to view All assets or assigned to the Instance Administrator role. Otherwise, users with granular scoping set to No assets or Select asset groups will have limited access to the dashboard. For more information on the KSPM dashboard, see [KSPM dashboard](https://docs-cortex.paloaltonetworks.com/r/Cortex-CLOUD/KSPM-Documentation/KSPM-dashboard).
    
-   Cloud Workload Policies: Users with SBAC granular scoping (in addition to the RBAC permissions required for Cloud Workload Policies) can only view Cloud Workload Policies when their access is scoped to any of the available options: All assets, No assets, or Select asset groups. When no SBAC restriction is applied, the user’s access is determined solely by their RBAC permissions. As a result, if you want users to be able to edit and modify Cloud Workload Policies, use the RBAC permissions. For more information on Cloud Workload Policies, see Cloud Workload Policies and Rules.
    

###### [Feature Change] Visibility for cases and issues without Inventory Assets

**Important:**

Action Required: Recent security enhancements enforce stricter default permissions for cases and issues that lack specific asset or endpoint references. This notice explains how to include access to these items if your users' visibility has been impacted.

To improve data security, Cortex Cloud now restricts access by default for cases and issues that do not reference a specific asset or that involve assets not found in your standard inventories.

What's changed?

You can now specifically control which users have access to issues and cases that lack Affected Assets (as seen in the issue’s panel) and Assets (as seen in the case's panel), or where the listed assets are not part of the Asset or Endpoint inventories. When the assets listed are not part of the inventories, the asset string is typically non-clickable. In some cases, such as for identity-related issues, assets may open a dedicated User Risk View, which differs from the standard inventories panels.

In the Issues and Cases tables, such items can be identified by empty values in the following columns:

-   Asset IDs
    
-   Target Agent Identifier
    
-   Source Agent Identifier
    

Why does this matter?

The default behavior changed. By default, only Account and Instance Admins have access to these cases and issues. If your team previously relied on viewing these items, they will no longer see them until a manual adjustment is made.

How to restore access?

1.  Choose one of the following:
    
    -   To edit the role for a user or user group, select Settings → Configurations → Access Management.
        
    -   To edit the role of an API key, select Settings → Configurations → Integrations → API Keys.
        
    
2.  Edit the relevant User, User Group, or API Key.
    
3.  In the Scope tab, under Cases and Issues, enable the checkbox: Allow access to cases and issues that are not referencing known assets or endpoints.
    
4.  Save your changes.
    
    Once enabled, an (Extended) label appears next to the scope level.
    

##### How to configure granular scoping

Granular scoping is configured in users, user groups, or API keys, and applied to the user roles assigned. Users are then granted granular scoping access according to the user roles assigned to them in a user group or directly. The instructions below explain how to configure granular scoping according to Palo Alto Networks best practices.

Granular scoping is disabled and not enforced in Cortex Cloud by default. Before enabling SBAC, we recommend that an administrator or a user with Access Management permissions first ensure that the users, user groups, and API Keys defined in Cortex Cloud are granted the required access by assigning the relevant scopes. This user can then assign a scoping area to a Cortex Cloud user (non-administrator), so the non-administrator user can manage only the specific scoping areas that are predefined within that scope.

Any changes made to the granular scoping of a user, user group, or API key are recorded on the Management Audit Logs page (Settings → Management Audit Logs). These events are categorized with the Type set to Permissions and the Subtype set to Scope Edit.

**Note:**

Make sure to assign the required default granular scoping for users. This depends on the structure and divisions within your organization and the particular purpose of each organizational unit to which scoped users belong.

1.  Ensure that you have the necessary administrator-level permissions.
    
2.  Verify that the users, user groups, and API keys defined in Cortex Cloud are assigned the relevant scopes.
    
    -   To verify the granular scoping of a user, select Settings → Configurations → Access Management → Users, right-click the user name, and select Edit User Permissions.
        
    -   To verify the granular scoping of a user group, select Settings → Configurations → Access Management → User Groups, right-click the user group, and select Edit Group.
        
    -   To verify the granular scoping of an API key, select Settings → Configurations → Integrations → API Keys, right-click the API key, and select Edit.
        
    
3.  In the Scope tab, expand the scoping areas to review the current granular scoping definitions by clicking the chevron icon (\>) beside the scoping area title, and make any changes required. The following table explains the options available to configure:
    
    **Important:**
    
    Before configuring, ensure that you review the Understand scoping section.
    
    | Scoping Area | Granular Scoping Configurations |
    | --- | --- |
    | Assets | Set the Scope by selecting one of the following: No assets: No asset is accessible.; All assets: Defines access to all assets.; Select asset groups: Defines access to the specific assets associated with the Asset Groups selected, and to view all their related cases, issues, and findings for these specific assets and Asset Groups. Under Select asset groups, define the specific asset groups that you want to grant access. Only Asset Groups relevant for scoping are listed, which are asset groups that are using only the asset attributes listed in Manage user scope (under Understand scoping → Scoping Areas → Assets). The scoping of assets also affects the scoping of cases, issues, and findings. \*\*Note:\*\* Visibility of Security domain Issues that refer to assets with agents is controlled by the Endpoints scoping configuration. |
    | Cases and Issues | Set the Scope by selecting one of the following: No cases and issues: Defines access to no cases and issues.; All cases and issues: Defines access to all cases and issues. Users can view cases or issues referencing assets within their scope. Use the Assets section to define which assets are in scope.; Select domains: Defines access to the domains selected to view their related cases and issues. Under Select domains, define the specific domains that you want to grant access. Users can only view cases or issues referencing assets and endpoints within their scope. Use the Assets section to define which assets are in scope. When selecting All cases and issues or Select domains, you can separately configure access to issues and cases that lack an asset reference or where the referenced asset is not in All Assets and All Endpoints inventories. To provide access, select the Allow access to cases and issues that are not referencing known assets or endpoints checkbox. Once selected, you can specifically control which users have access to issues and cases that lack Affected Assets (as seen in the issue’s panel) and Assets (as seen in the case's panel), or where the listed assets are not part of the Asset or Endpoint inventories. When the assets listed are not part of the inventories, the asset string is typically non-clickable. In some cases, such as for identity-related issues, assets may open a dedicated User Risk View, which differs from the standard inventories panels. In the Issues and Cases tables, such items can be identified by empty values in the following columns: Asset IDs, Target Agent Identifier, and Source Agent Identifier. |
    | Endpoints | Set the Scope by selecting one of the following: No endpoints: Defines access to no endpoints with no ability to view their related agent management and enterprise policies.; All endpoints: Defines access to all endpoints with the ability to view their related agent management and enterprise policies. This configuration can impact the visibility of related Security domain Cases and Issues, but will not affect asset visibility.; Select specific (at least one required): Defines specific access to all endpoint groups by selecting Endpoint Groups or all endpoint tags by selecting Endpoint Tags to view their related agent management and enterprise policies. This configuration can impact the visibility of related Security domain Cases and Issues, but will not affect asset visibility. |
    
4.  Click Save.
    
5.  Repeat **steps 2 to 4** until you have configured all users, user groups, and API keys with the correct granular scoping access.
    
6.  Enable granular scoping in Cortex Cloud.
    
    1.  Select Settings → Configurations → General → Server Settings, and select the Enable Scope Based Access Control toggle.
        
    2.  (Optional) You can select the Endpoint Scoping Mode, which is defined per tenant:
        
        -   Permissive: Enables users with at least one scope tag to access the relevant entity with that same tag.
            
        -   Restrictive: Users must have all the scoped tags that are tagged within the relevant entity of the system.
            
        
    3.  Click Save.
        
    
    When you are finished, all the users in Cortex Cloud are now able to use Cortex Cloud only within the granular scoping granted according to their assigned user roles.

#### Manage access to objects

Learn more about managing access to objects in Cortex Cloud.

Cortex Cloud enforces least-privileged access by allowing you to manage access for individual instances of custom (user-defined) Dashboards. Access management for these items is handled through a common experience for per-object access, which allows you to treat these tools as distinct objects with their own access settings.

-   **Custom objects**: User-defined objects that can be fully managed, shared, or deleted by the Owner or an authorized Editor.
    
-   **System objects**: Out-of-the-box objects provided by Palo Alto Networks. These are available to any user with access to Dashboards and cannot be deleted or have their ownership changed, though they can often be duplicated to create a custom version.
    

Key concepts

Before configuring access, it is important to understand the different states and roles that define an object's security access.

General access states

The General access setting determines the baseline visibility for an object:

-   **Restricted** (default): The object is visible only to the Owner and those specifically shared with.
    
-   **Public**: The object is visible to all users who have that component enabled in their role permissions. Any user with access to the component can view both Public and System objects, and those with the required role permissions can also edit the Public custom objects.
    

Per-object roles

-   **Owner**: The person who created the object. Every object has an assigned Owner responsible for managing its lifecycle and access. Owners have full control, including the ability to edit content, delete the object, and, depending on tenant-level settings, share the object with other principals (users, user groups, or API keys) as an Editor or Viewer.
    
-   **Editor**: Can view and modify the object. If authorized by tenant-level settings, they can also manage access for others.
    
-   **Viewer**: Can view the object and its data but cannot make any changes to the object's configuration or access settings.
    

**Administrative access**: Account and Instance Administrators have inherent visibility into all objects (including Restricted ones) regardless of whether they have been explicitly shared with them. They can also Change Owner for any object.

Keep in mind the following

While Per-object access controls the visibility of the dashboard, the underlying data remains governed by Scope-Based Access Control (SBAC). A user must have the appropriate SBAC permissions to view the data available through an object.

Sharing icons

The following icons indicate the sharing status and origin of an object in management tables:

-   : A Restricted object you created that is not shared with anyone else.
    
-   : An object you created that is currently shared with other users, groups, or API keys.
    
-   : An object created by another user that has been shared with you.
    
-   : A Palo Alto Networks object provided out-of-the-box. These are Public, cannot be deleted, and ownership cannot be transferred.
    

How to configure access to objects?

Configuring access follows a top-down workflow:

1.  Tenant-level settings: Establish the "rules of engagement" for the entire instance.
    
2.  Role permissions: Enable specific components and define additional capabilities for those roles.
    
3.  Per-object access: Manage visibility and access levels for specific dashboards.
    
4.  Scope-Based Access Control (SBAC): Ensure the user has the required permissions to view the underlying data available through the object.
    

Step 1: Configure tenant-level access settings

Administrators first establish the "rules of engagement" for all objects. These settings are located under Settings → Configurations → Access Management → Objects:

-   Owners can Share objects they created: Allows the creator (Owner) of an object to share it with users, user groups, or API keys.
    
    -   Editors can also Share objects with others: Allows users with Editor access to further share the object with additional principals (users, user groups, and API keys).
        
    
-   Owners and editors can change the general access (default): Allows the object owner and any user with Editor access to modify the object's General access settings (Restricted or Public) using the drop-down menu in the object's sharing settings.
    

Step 2: Set role permissions

Once tenant-level policies are established, configure individual roles to allow users to interact with specific components:

1.  Select Settings → Configurations → Access Management → Roles.
    
2.  Right-click the relevant user role, and select Edit Role.
    
3.  Under Components, expand each list, set the applicable component to one of the following:
    
    -   Disabled: The component is hidden from the user's navigation menu. The user cannot access any objects associated with this component, even if they were previously shared with them.
        
    -   Enabled: The component is visible in the user's navigation menu. The user can view Public objects and any Restricted objects shared with them.
        
    
4.  Define additional capabilities.
    
    If enabled, refine capabilities using the following checkboxes:
    
    -   Create [Object]: Allows the user to create new instances; the user is automatically designated as the Owner, which grants the inherent right to edit, delete, and manage sharing for that specific object.
        
    -   Edit Public [Object]: Allows the user to modify custom objects that have been set to Public General access, even if they are not the owner.
        
    

Once a component is enabled using role permissions, sharing is managed at the individual object level. Owners and authorized editors can share with other principals (users, user groups, or API keys) directly on the object.

Step 3. Configuring per-object access

For more information on managing visibility and access levels for specific dashboards, see the following topics:

-   Manage access to custom dashboards
    

Step 4. Configure SBAC permissions

For more information on managing user scope so users have the permissions necessary to view the data available through the object, see Manage user scope.

How to change an object owner

To ensure continuity when personnel changes occur or a user leaves the organization, the ownership of an object (a dashboard) can be changed.

-   **Administrative privilege**: Only Account and Instance Administrators can change the owner of an object. Other users who are Owners and Editors cannot perform this action.
    
-   **Change Owner**: Using the Change Owner action in the management table of the specific object, administrators can select a new user to take over full control. Once changed, the new user assumes all Owner-level rights, including the ability to edit, delete, and share with other principals (users, user groups, and API keys).
    

Access examples

Granular per-object access supports various organizational security requirements:

1.  **Use only by SOC team**: A "flat" structure where all analysts can see all objects. This is the default setting for the tenant. By default, newly created custom objects, such as a specific investigation dashboard, are Restricted and visible only to the creator; the owner can then make them Public to allow the entire team to view or edit them based on their role permissions.
    
2.  **Both SOC team and Internal threat**: Specific objects, such as sensitive dashboards, are created by a member of the Internal Threat team and made accessible only to the Internal Threat user group. First, an administrator must enable the tenant-level access settings that allow users to share objects. Members of the Internal Threat team then create these objects and share them only with their peers or their specific user group. Members of the SOC team do not have access to these dashboards, as they are not visible or accessible to any users who have not been explicitly granted access.
    
3.  **Both SOC team and Cloud team**: Provides department isolation. Each team only accesses its own dashboards; the SOC team cannot see Cloud team objects, and vice versa.

##### Manage access to custom dashboards

Learn more about managing access to custom dashboards in Cortex Cloud.

The Dashboard Manager serves as the central repository for your visualizations. By using object-level access, you can ensure that custom (user-defined) dashboards, such as those used for sensitive executive reporting or specialized department views, are only accessible to authorized users and user groups. The permissions assigned to your role, combined with the ownership of specific objects, directly determine the content available to you; you can only access dashboards where you are the Owner, dashboards that have been explicitly shared with you (or your user group), or dashboards marked as Public.

**Prerequisite:**

-   **Configure tenant-level settings**: An administrator must first establish the sharing framework under Settings → Configurations → Access Management → Objects.
    
    The configuration of these settings defines the authorized sharing workflows for custom dashboards:
    
    -   **Enable "Owners can Share objects they created"**: Grants owners the ability to share dashboards with specific users and user groups. In the Dashboard Manager, this enables the Share option.
        
    -   **Disable "Owners can Share objects they created"**: Restricts owners to managing only General access (Public vs. Restricted). In the Dashboard Manager, this replaces the Share option with the Manage Access option.
        
    
-   **Define Scope-Based Access Control (SBAC)**: While object-level sharing grants access to the dashboard's layout and configuration, users must also have the appropriate SBAC permissions to view the actual data populated within the widgets. If a user has access to a shared dashboard but lacks the required data scope for the underlying datasets, the dashboard will load, but the widgets may appear empty or display an error.
    

For more information on these prerequisites, see Manage access to objects.

Understanding widget behavior

Because dashboards are composed of multiple widgets, it is important to understand how access is applied to these individual components:

-   **Widgets are not objects**: Unlike dashboards, individual widgets are not treated as independent objects. They do not have their own "Share" dialog and cannot be shared independently. Within the Widget Library, a widget is set to either Restricted (visible only to the creator) or Public (visible to all with Widget Library access).
    
-   **Inherited access**: Any user who has been granted access to a custom dashboard (as a Viewer or Editor) can see all the widgets contained within that dashboard, including those marked as Restricted. This means you may see a widget on a shared dashboard that you cannot see in the Widget Library even if you have access to it.
    
    -   **Dashboard Editors**: Can edit the dashboard layout, but the widget is only available in their Widget Library for editing when the widget is Public.
        
    -   **Dashboard Viewers**: Can't make any changes to dashboards or widgets that are Restricted.
        
    

How to configure access to custom dashboards

Step 1: Set role-level permissions

Role permissions define the functional capabilities for dashboards and the Widget Library, and determine what actions a user can take.

1.  Select Settings → Configurations → Access Management → Roles.
    
2.  Right-click the relevant user role, and select Edit Role.
    
3.  Under Components, expand Dashboards & Reports, and locate Dashboards.
    
4.  Configure access state:
    
    -   Disabled: Users cannot navigate to Dashboards & Reports → Dashboard Manager or Dashboards & Reports → Widget Library. Dashboards cannot be shared with this role. If the user previously owned or had access to shared dashboards, they are no longer available.
        
    -   Enabled: Allows dashboards to be accessed and managed according to defined sub-permissions. Grants access to the Widget Library as explained below in Manage the Widget Library.
        
    
5.  If Enabled, assign specific capabilities to control the UI:
    
    -   Create Dashboards: Enables the New Dashboard button on the Dashboard Manager page, allowing the user to create new custom dashboard objects. The user who performs this action becomes the Owner of the object and is granted the inherent right to edit, delete, and manage sharing for that specific object..
        
    -   Edit Public Dashboards: Allows the user to modify custom dashboards set to Public, even if they are not the owner.
        
    
6.  Click Save.
    

Step 2: Manage the widget library

The Widget Library is the central repository for predefined and custom widgets and is intended for browsing and selecting widgets to add to a dashboard. Access to and visibility within the Widget Library is determined by role-level permissions and your specific access level to the dashboards where those widgets reside:

-   **Access to the Widget Library**: To access the Widget Library, your role must have the Create Dashboards or Edit Public Dashboards capability. Users who only have "View" permissions for dashboards cannot access the Widget Library.
    
-   **Widget Library visibility**: Visibility within the Widget library depends on ownership and inherited dashboard and widget permissions:
    
    -   **Public and personal widgets**: You can always see widgets you created (Restricted) and widgets marked as Public.
        
    -   **Inherited access via dashboards**: If a Restricted widget was created by another user but is part of a dashboard shared with you, you won't see it in the Widget Library and it can't be edited (unless you are an administrator).
        
    
    **Note:**
    
    If you're designated as an Editor, you can always duplicate the widget and make your changes on the copy.
    

Step 3: Manage sharing for a custom dashboard

Once a custom dashboard exists in the Dashboard Manager, the Owner (or an authorized Editor) defines who can see or edit it.

1.  Select Dashboards & Reports → Dashboard Manager.
    
2.  Locate the custom dashboard that you want to share in the table.
    
3.  Right-click the custom dashboard and select the available access option. The menu option you see depends on your tenant-level settings:
    
    -   Share: Use this if your admin enabled sharing. It allows you to grant access to specific users/groups and change the General access (Public/Restricted).
        
    -   Manage Access: Use this if sharing is disabled. It is a restricted view that only allows you to toggle the General access between Public and Restricted. You cannot grant access to specific individuals.
        
    
4.  (If sharing is enabled) Search for the User or User Group, and assign the access level: Viewer (read-only) or Editor (can modify and share).
    
5.  Set the General access state:
    
    -   Restricted: Private to the Owner and the others granted access.
        
    -   Public: Visible to all users with the Dashboard component enabled in their role.
        
    
6.  Click Save.
    

Sharing icons in the Dashboard Manager

The following icons help you identify the security access of your custom dashboards:

-   : A Restricted custom dashboard you created that is not shared with anyone else.
    
-   : A custom dashboard you created that is currently shared with other users or user groups.
    
-   : A custom dashboard created by another user that has been shared with you.
    
-   : A standard system dashboard provided by Palo Alto Networks. These are always Public and cannot be deleted or edited, and their ownership cannot be transferred. Yes, you can Duplicate a system dashboard to create a custom version that you can then modify and share.
    

Change owner of a dashboard

To ensure continuity when personnel changes occur or to hand off management of a resource, only administrators can change the ownership of a custom dashboard.

**Note:**

Only Account Administrators and Instance Administrators have the authority to change the owner of an object.

1.  Select Dashboards & Reports → Dashboard Manager.
    
2.  Right-click the custom dashboard in the table and select Change owner.
    
3.  Select the new owner from the list of users, and click Change.

### Configure the Cortex Agentic Assistant

Create and manage agents and actions in the Agents Hub and configure access to the Cortex Agentic Assistant.

Create and manage agents and actions in the Agents Hub, configure access to the Cortex Agentic Assistant to create an AI agent workforce.

#### Agentic Assistant components and concepts

Learn about the key components and concepts, such as agents and actions in the Cortex Agentic Assistant

The Cortex Agentic Assistant uses the following components and concepts:

| Name | Description |
| --- | --- |
| Actions | Actions wrap diverse capabilities (such as playbooks, scripts, and commands) to make them accessible and executable by an agent. You can use out-of-the-box system actions or register new actions. |
| Agent | An agent is a virtual persona that creates and executes domain-specific plans, at your request, to assist in your day-to-day SOC operations. An agent has roles and permissions that provide guardrails. Each agent is assigned a collection of actions that it can use as part of plans. The agent chooses the most relevant actions to fulfill a user's request. Agents process user requests, create plans, and orchestrate actions based on their goals and permissions (RBAC and SBAC). You can use the following types of agents: System agents that are provided by Cortex Cloud for specific use cases.; Custom agents that users have created. Some agents provide relevant chat conversation starters under the chat prompt. For examples of conversation starters, see Agentic Assistant use cases. \*\*Note:\*\* Agents are bound by the same rules and robust permissions as a human user. In addition, you can mark actions that make real-world changes in production systems as sensitive, requiring a quick manual review and confirmation, ensuring peace of mind before critical system changes are made. |
| Plan | A sequence of actions that run in parallel or sequentially to satisfy a user request. The agent dynamically chooses relevant actions to resolve the prompt. |
| Conversation | A sequence of user requests that maintains context across interactions. |
| Request | A user request from the agent with an end goal, triggering a plan. |

#### Agents Hub

Learn about personal and system agents in in the Agents Hub

In Cortex Cloud, you can interact with agents in the Agentic Assistant chat to automate case and issue investigation and response. Agents create and execute plans, which are sequences of actions (such as playbooks, scripts, and commands) designed to fulfill your requests.

Actions and agents are managed in the Agents Hub. To open the Agents Hub, click on the agent chat icon  in the upper right hand corner, click the side panel icon  to expand the menu if needed, and then click the Agents Hub menu item.

**Note:**

To manage agents in the Agents Hub, you must have the proper permissions. For more information, see Agentic Assistant role-based access control.

The Agents Hub includes the following components:

-   **Actions**
    
    Actions wrap diverse content items (such as playbooks, scripts, AI prompts, and commands) to make them accessible and executable by an agent. Cortex Cloud provides system actions, and you can also create your own actions. Custom actions can be created from scripts, commands, and AI prompts.
    
    You can register new actions through the Agents Hub or from the Scripts or AI Prompts page. Actions can include functionality such as sending emails, extracting data, enriching information, or opening support cases. Multiple actions can be created from a single script, command, or AI prompt, if needed. An action can be added to multiple agents.
    
-   **Agents**
    
    An agent is a virtual persona that creates and executes domain-specific plans, at your request, to assist in your day-to-day SOC operations. An agent has roles and permissions that provide guardrails. Each agent is assigned a collection of actions that it can use as part of plans.
    
    The agent chooses the most relevant actions to fulfill a user's request. Agents process user requests, create plans, and orchestrate actions based on the user's goals and permissions (RBAC and SBAC).
    
    Cortex Cloud provides system agents, and you can also create custom agents. In the Agentic Assistant chat, you can select any system agent, any agent you created, or any public agent.
    
    Agents can only use actions that have been assigned to them, and execution is limited to the user's existing permissions.
    
-   From the Agents tab of the Agents Hub, you can hover over any agent card to see the View option. Click View to see all the actions assigned to the agent and their status.
    

In the Agents Hub, you can do the following:

-   Register scripts, commands, and AI prompts as custom actions. After a script, command, or AI prompt is registered as a custom action, it can be assigned to agents and used in plans. For more information, see Manage actions.
    
-   View system actions and edit existing custom actions.
    
-   Build agents and assign actions to agents.
    
-   Enable and disable system agents. System agents have access to system actions that are assigned to the agent.
    
-   Start a chat with any agent, by clicking the more options icon on the agent card and clicking Start chat.

##### Manage actions

Manage actions that can be used by agents.

Actions wrap diverse capabilities (such as playbooks, scripts, AI prompts, and commands) to make them accessible and executable by an agent. You can use out-of-the-box system actions or register new actions.

**Note:**

To manage actions in the Agents Hub, you must have the correct permissions. For more information, see Agentic Assistant role-based access control.

There are two types of actions in the Agents Hub:

-   **System actions**: Cortex Cloud contains more than 50 out-of-the-box system actions that can be disabled or enabled, but cannot be edited or deleted. 
    
    To find and install additional content packs that include actions, go to Marketplace and select Content pack includes and Actions.
    
    **Tip:**
    
    System actions may rely on content packs that need to be installed and configured.
    
-   **Custom actions**: Users can register existing or new scripts, commands, and AI prompts as actions. Custom actions can be edited, deleted, enabled, or disabled.
    

Any action marked as sensitive to require user approval requires explicit user approval before execution.  This is particularly crucial for operations that might alter system reality or affect an organization’s budget, such as isolating an endpoint or revoking user access. System actions are marked sensitive if they affect system reality. When creating custom actions, you decide which actions should be marked as sensitive for your organization.

Manage existing actions

From the Actions tab of the Agents Hub, click ⋮ for an action to edit, delete, or disable an existing custom action. System actions can only be enabled or disabled.

Search, filter, and sort actions

You can use the dropdown filter to search all actions, custom actions, system actions, enabled actions, or disabled actions.

You can sort actions by most used, creation time, or update time.

##### Register actions

Register custom actions that can be used by agents.

You can register scripts, commands, and AI prompts as actions in the Agents Hub. After a script, command, or AI prompt is registered as an action, it can be added to one or more agents. The agents can then execute the action as part of plans.

**Note:**

To register actions, ensure you have the correct permissions. For more information, see Agentic Assistant role-based access control.

When you register an action, you provide a description, goal, and, optionally, a few-shot examples. This information helps agents understand how the action should be used.

When registering or editing an action, you can choose which specific inputs and outputs are visible to the LLM. For example, a script might have two inputs and five outputs, but for this action, only one input and two outputs are required, and only those are included in the action. This helps to create more focused actions and reduces unnecessary complexity.

**Important:**

A single content item can be registered as different actions, with each action using different inputs and outputs from the same script. Only register the same script, command, or AI prompt as a new action if it is required for your use case, as providing an agent with many actions with overlapping abilities can reduce the ability of the agent to choose the most appropriate action.

While you can create multiple actions from a single content item, each action must have a different name.

If you try to register a script, command, or AI prompt that is already registered, you are presented with a list of the actions already using it, and you can review and decide if any of them are relevant for your current use case. If not, you can register the script, command, or AI prompt again as a different action.

How to register an action

1.  Do one of the following:
    
    -   Click the Agentic Assistant icon in the upper right hand corner and expand the side panel  to access the Agents Hub menu item. From the Actions tab of the Agents Hub, click Register new action.
        
    -   Within the script creation or editing screen, click ⋮ when viewing or editing a script and select Register as action.
        
    -   Within the AI Prompts library, select a prompt and click the more options icon to Register as action.
        
    
2.  If you clicked Register as action from the Scripts or AI Prompts page, the name is prepopulated in the Content chosen field. If you clicked Register action from the Agents Hub, select script, command, or AI prompt for the Type of content and select the content you want to register.
    
3.  Enter an action Name, a short description of what the action does. Example: `Extract email`.
    
4.  Describe the Goal of the action.
    
5.  (Optional) By default, Mark action as sensitive to require user approval is selected, and the agent prompts the user to approve before executing the action. If you do not want the action marked as sensitive, clear the checkbox.
    
6.  (Optional) Provide Few-shot examples to help the agent understand the context and the appropriate situations to invoke a specific action.
    
7.  Click Next.
    
8.  Choose your Action Parameters:
    
    **Note:**
    
    Mandatory arguments cannot be deselected.
    
    1.  Choose which arguments and inputs to include in the action. If a content item contains descriptions of the inputs, the descriptions are prepopulated. If not, you can provide short descriptions. The descriptions help the agent understand the purpose of each input.
        
    2.  (Optional) Enter a default value for each input. The default value is used when the user does not specify the input.
        
    3.  Choose which script outputs to include in the action. If the content item contains descriptions of the outputs, the descriptions are prepopulated. If not, you can provide short descriptions. The descriptions help the agent understand the purpose of each output.
        
9.  Save changes.

##### Manage agents

Edit, disable, or delete existing agents.

Agents create and execute step-by-step plans dynamically, choosing relevant actions based on a user's request. Each agent has a model, a user context, a conversation context, and a set of actions that it can perform.  Users engage with agents through conversations in the chat interface.

Agents can only use actions that have been assigned to them, and execution is limited by the user's permissions.

Permissions for the Agentic Assistant and the Agents Hub can be found under CORTEX AGENTIC ASSISTANT in the role permissions when creating or edit a role. For more information, see Agentic Assistant role-based access control.

There are two types of agents in the Cortex Agentic Assistant:

-   **Custom agents**: Each user can create one or more agents that have the same or fewer permissions as the user, ensuring agents operate with the least necessary privileges required. These permissions automatically update if the user’s roles or permissions change. When users create custom agents, they can create a private agent only they can access, or a public agent all users can access.
    
-   **System agents**: System agents come out-of-the-box and are not linked to a specific user; instead, they possess their own defined roles and permissions. A system agent may include actions that the user does not have permission to execute.  All users have access to all system agents, but plan execution is limited by the permissions of the individual user.
    
    **Tip:**
    
    System agents can include actions that require additional content packs to be installed and configured. To view all actions assigned to a system agent, including actions not available due to missing content, click on the system agent in the Agents Hub. There may be actions assigned to a system agent that are not relevant to your organization. For example, the Case Investigation agent includes the action ServiceNow - Create Ticket, but you would only install and configure the relevant content pack if you wanted to create tickets in ServiceNow.
    

###### Agent management

You can edit, delete, disable, or enable custom agents by clicking the more options ⋮ icon for the agent.

You can edit, enable, or disable system agents by clicking the more options ⋮ for the agent. The edit option for system agents is limited to adding specific instructions for the agent such as tone, style, format, and priorities.

You can click on an Agent to view all actions assigned to the agent. There are three possible statuses for actions assigned to an agent:

-   **Enabled** (green circle with a check mark): The action is enabled and available for the agent to use.
    
-   **Disabled** (grey circle with an x): The action has been disabled and is not available for the agent to use.
    
-   **Unavailable content** (grey circle with a horizontal line): The content the action is based on is not available. To use the action, the content item must be installed and configured.
    
    **Note:**
    
    In some cases, an agent may include actions with content items that are not relevant for all licenses. If that occurs, the grey circle appears, but you are not able to install the related content.
    

###### Search, filter, and sort existing agents

You can use the dropdown filter to search all agents, custom agents, enabled agents, or disabled agents.

You can sort agents by most used, creation time, or update time.

##### Build agents

Build new agents.

You can build custom agents in Cortex Cloud to execute plans and assist in investigations. Custom agents have the same or fewer permissions as the user who creates them. For example, you might want to create an agent with all of your permissions to use for certain investigations, but also create a read-only agent that provides you with information, but does not execute actions on real-world systems. You can create custom agents that are private or that are shared for all users.

When you build an agent, it should contain all actions that you require for your workflow. Agents are self-contained and cannot communicate with other agents or access actions that are not assigned to the agent.

**Note:**

To build agents in the Agents Hub, you must have view/edit permissions. For more information, see Agentic Assistant role-based access control.

1.  Click on the agent chat icon  in the upper right hand corner, click the side panel icon  to expand the menu if needed, and then click the Agents Hub menu item.
    
2.  From the Agents tab of the Agents Hub, click Create agent.
    
3.  Complete the following agent detail fields:
    
    | Field | Description | Required |
    | --- | --- | --- |
    | Agent Name | A short description name for the agent. Each agent must have a different name. | Yes |
    | Color | The color for the icon that appears in the agent list. | No |
    | Description | A description of the agent's purpose or area. | Yes |
    | Specific Instructions | Provide the agent with detailed customized instructions. You can include a wide range of directives, from describing the agent's role and preferred terminology to step-by-step processes and structure of the output. **Role**: What the agent is supposed to be or act as. Defines its identity and primary function. Example A: SOC tier 1 analyst. As a tier 1 analyst you are responsible for triaging alerts and concluding if an alert is a true or false positive. Example B: Incident response analyst. As an incident response analyst you are responsible for investigating and conducting forensics of relevant artifacts related to an incident. You provide conclusions about the incident and TTP's used by the threat actor.; **Instructions**: The specific rules and behavioral guidelines that tell the agent how to operate and respond. Example: Follow the NIST framework, provide clear and concise recommendations, use critical thinking when conducting analysis.; **Structure**: How the agent should format and organize its responses. Examples of possible formats: JSON, Markdown, Array, enum. | No |
    | Agent access | Choose whether to make the agent a Public Agent. Public agents can be accessed by all users with View/Edit permissions to Interact with Agents. By default, custom agents are only available for the users who created them. | No |
    | Conversation starters | Include up to four prompts that appear under the prompt bar when the user interacts with the agent. Conversation starters help users understand what the agent can do and how to initiate a request. | No |
    
4.  Click Next to proceed to the Access Control page.
    
5.  Define which roles and actions the agent can access. To save an agent, there must be at least one role or action selected.
    
    **Note:**
    
    If you clear the checkbox for a role, all actions associated with that role are also cleared. The exception is if another role is also selected, which is associated with the same actions.
    
    If you clear the checkbox for an action, all roles associated with that action are cleared. For example, if you select the Investigator role, and Send Mail and Tavily Extract are both actions associated with that role, clearing the check box for Investigator also clears the check box for Send Mail and Tavily Extract. If you then reselect the Send Mail action, the Investigator role is not automatically selected.
    
    Not all actions are associated with a role.
    
    For an agent to be able to run XQL queries, you must add the Cortex - Run XQL Query action. This action is included by default for all system agents.
    
6.  If needed, register one or more new actions by clicking New Action and following the steps in Manage actions.
    
7.  Save Agent.

##### Expand agent capabilities with MCP integrations

Learn how Agentic agents can leverage tools on third-party MCP servers.

Cortex Agentic Assistant supports native interaction with external environments via the Model Context Protocol (MCP). Agentic Assistant agents can use tools from third-party MCP servers to retrieve data and perform tasks in external systems. For example, an agent can open a Jira issue or check GitHub to see if security scans in a workflow are being bypassed..

The Cortex Agentic Assistant connects to external MCP servers using streamable HTTP and supports both OAuth-based and Authless servers. The MCP server must be accessible via a URL. To communicate with third-party MCP servers, you install the relevant content pack from Marketplace and configure an integration instance. The integration connects to the third-party MCP server to discover available tools and automatically generate agentic actions.

**Note:**

For agentic actions to be created from tools on an MCP server, the tools must have input and output descriptions on the MCP server. These descriptions are required for Cortex Cloud to understand the tools' capabilities and the correct use cases.

MCP integrations

To find MCP content packs, filter for MCP under Types in Marketplace. Examples of MCP content packs include Cloudflare MCP, GitHub MCP, and Atlassian Cloud MCP. You can also use the Generic MCP content pack to connect to MCP servers that do not have their own specific content pack. Each MCP integration includes instructions for providing the required parameters, such as the URL and authentication details.

You can create multiple integration instances for each MCP integration. For example, you might configure one instance of the GitHubMCP integration to connect to a environment with read tools and another instance to connect to an environment with both read and write tools. In addition, the GenericMCP integration can be used to connect to multiple MCP servers, each with a separate integration instance.

When you Test the integration instance, Cortex Cloud verifies server connectivity.

**Note:**

If you are using OAuth-based authentication, the Test button returns an error containing the command to run in the playground in order to test the connection.

All configured MCP integration instances can be viewed in the Settings → Data Sources & Integrations page. You can view each integration instance and verify the status of the connection, Test the connection, enable or disable the integration instance, and view the last discovery timestamp.

MCP tool actions

The integration instance checks hourly for new or changed tools exposed by the third-party MCP server. The same checks are also performed every time an integration instance is saved. All discovered tools are automatically registered as AI actions, with the type MCP Tool. Actions are created once per MCP integration instance. If you have multiple integration instances for the same MCP server, multiple actions are created for the same tools. The server name, the tool name, and the name of the integration instance are all included in the name of the action. Actions created through tool discovery are system actions. The actions cannot be edited, but you can enable and disable them and also select or clear the checkbox to mark the action as a sensitive action that requires manual approval. By default, all actions registered from MCP servers are marked as sensitive.

**Note:**

-   If an MCP tool is removed from the MCP server, the action will be unavailable due to missing content. If the tool is restored on the MCP server, the action is automatically reenabled.
    

Agents and permissions

To use MCP tool actions, they must be added to custom agents in the Agents Hub. By default, all users with access to the custom agent can use all of the available tools. To restrict access to MCP tools, go to Settings → Configurations → Data Collection → Integration Permissions. You can restrict access for MCP integration instance commands to one or more roles. If you restrict access, only users in the permitted roles can use these actions.

#### Agentic Assistant role-based access control

Configure permissions to access Cortex Agentic Assistant features.

Instance and Account admins have full control over the permissions and access that users have to the Cortex Agentic Assistant. Cortex Cloud uses role-based access control (RBAC) to manage access to the chat, as well as access to view, create, edit, delete, disable, and enable Agents and Actions in the Agents Hub.

By default, Instance and Account admins have full view/edit permissions enabled. When editing or creating other roles, in the Cortex Agentic Assistant → Agents section, you can select the following:

| Permission | Description |
| --- | --- |
| View/Edit | When selected (and nothing else is checked in this section), the user role can only see actions and public agents in the Agents Hub, but cannot interact with agents. You can also select the following permissions: Interact with agents: Users can trigger Agents in the Cortex Agentic Assistant. Users can access their own agents, public agents and system agents.; Manage actions: Users can view, create, update, and delete actions. ; Manage agents: Users can view, create, update, and delete their own custom agents.; Agents admin: Users can view, create, update, and delete all actions and agents. Users can enable or disable system actions and agents. |
| View | N/A |
| None | The user role does not see any agents and can’t use the chat. The Agents Hub is not visible to the user. Cortex Agentic Assistant is only available for navigation and insights. |

**Note:**

Agents are limited by the individual permissions of the user. For example, if users do not have sufficient permissions to isolate an endpoint, they cannot use an agent to isolate an endpoint.

### XQL query management

Administrators can set controls on running XQL queries.

You can find Query Management options under Settings → Configurations → General → Query Management. These options enable administrators to set controls on running queries.

#### Set query limits

**Danger:**

Setting query limits requires View/Edit permissions for Configurations → Query Management.

Administrators can set query limits that control user-generated XQL queries within a tenant. Setting query limits helps to prevent resource strain and optimize tenant performance. You can control the following query settings:

-   Concurrent queries per user
    
    Prevent system overload by setting a maximum number of concurrent queries that a user can run.
    
    The concurrent query limit is applied per user.
    
    If a user is running a high number of queries and is approaching the concurrent query limit, a system message warns that a high query load is impacting their performance. If a user exceeds the defined limit of concurrent queries, new queries are blocked until the number of active queries drops below the limit.
    
    The user can view all of their In Progress queries from the Query Center, and cancel active queries to avoid being blocked and improve query performance. For more information, see Edit and run queries in Query Center.
    
    If a user is blocked, other users of the tenant can continue to run queries. By default, query limits apply to all users of the tenant, but you can exclude specific roles and groups from these limits. 
    
    Queries that are included in the concurrent queries calculation include:
    
    -   Cortex Query Language (XQL) investigation queries, including cold and hot storage, XDM templates, XDR templates, free text search, and queries from the query library.
        
    -   Scheduled queries and scheduled reports.
        
        **Note:**
        
        A scheduled query or report is run on behalf of the user that originally created it, even if it is edited and run by another user.
        
    -   XQL widget queries in dashboards and reports
        
    -   XQL public API queries (cold and hot storage)
        
    -   BIOC test queries.
        
    -   Correlation rule test queries.
        
    -   XQL queries run from playbook tasks.
        
    
    **Note:**
    
    -   Queries run by correlation rules are not restricted by the query limit.
        
    -   Very short queries do not count towards concurrent queries.
        
    
-   Query duration timeout
    
    Prevent long running queries by setting a timeout duration for queries to automatically stop long running queries and reserve tenant resources.
    
    Only integer values are supported for this field. In addition, the query timeout is an approximate value.
    
    **Note:**
    
    To ensure optimal system performance, all queries (user-generated and otherwise) adhere to a default timeout limit of 60 minutes that is defined by Palo Alto that takes priority over the administrator defined value. Therefore, regardless of the value specified in this field, queries will be stopped after 60 minutes.
    
    You can override the default timeout limit by including the `config max_runtime_minutes` stage in your query to increase the query timeout value, up-to the administrator defined value. For more information about this stage, see max_runtime_minutes.
    

How to set a query limit

1.  Go to Settings → Configurations → General → Query Management.
    
2.  Under Query Limits select Enabled.
    
3.  Under Concurrent Queries Per User, specify the maximum number of queries a user is allowed to run concurrently. Queries exceeding this limit will be blocked.
    
    Important considerations:
    
    -   A value of 0 will prevent all queries from running. 
        
    -   Setting a very low or very high limit could adversely affect overall query execution speed and system resources.
        
    
4.  Under Query Timeout specify the maximum duration (in minutes) that any query can run. 
    
    By default, the query duration timeout is set to 60 minutes for all queries regardless of the value specified in this field. For more information, see the explanation above regarding **Query timeout duration**.
    
5.  Under Excluded User Groups or Roles, choose specific user groups or roles that should be excluded from the query limits.
    
6.  Click Save.
    
7.  Changes to the query limit settings are recorded in the Management Audit Logs.
    

#### Restrict query visibility

Administrators can restrict non-admin users and API keys to viewing and managing only their own query history, which enhances tenant privacy and reduces operational noise. By limiting access to users' own search activities, you can secure sensitive investigations and ensure that API usage adheres to strict visibility controls.

The following areas in the Query Builder are affected when you restrict query visibility:

-   Query History tab: Users and API keys see an access only the queries they initiated. Queries which are run implicitly on their behalf, such as background reports, BIOCs, or dashboards, are hidden from this view to reduce noise and maintain focus.
    
-   Active Queries tab: Users and API keys view and manage any query they initiated, regardless of the source, including dashboards and widgets, allowing them to cancel operations they triggered.
    
-   Scheduled Queries tab: Users see only the queries they personally scheduled.
    

##### Query restriction use cases

Restricting the access of users and APIs to only their own queries addresses specific operational and security needs:

-   Reduce operational noise: Restricting visibility to only user-initiated Investigation or Simple Search sources in Query History makes the view more relevant to the analyst's immediate workflow.
    
-   Prevent insider threat visibility: When investigating another user within the same tenant, restricting visibility prevents the individual being examined from seeing queries about themselves. Enabling this restriction protects the integrity of internal investigations.
    
-   Secure API keys: Restricting API key access to their own queries prevents users from retrieving results using execution ID guessing. This aligns API privacy standards with the User Interface.
    

**Note:**

Query visibility is subject to Role-Based Access Control (RBAC); users can't see queries for datasets they do not have permission to access.

How to enable query visibility restrictions

1.  Go to Settings → Configurations → General → Query Management.
    
2.  Under Enforce query privacy for non-admins,
    
    -   Enable: Non-admin users can only see and manage their own query activity.
        
    -   Disable: Non-admin users can view all queries in the tenant.
        
    
3.  Click Save.
    

Changes to the query visibility settings are recorded in the Management Audit Logs.

### Customize cases and issues

#### Customize cases and issues

Customize your cases and issues for specific requirements.

While cases and issues are configured to work OOTB, users with specific requirements can customize them for specific needs or scenarios.

##### Set up case scoring

Set up case scoring and define scoring rules.

To set up case scoring you need to define scoring rules.

###### Enable and define scoring rules

1.  Select Cases & Issues → Case Configuration → Case Scoring → Scoring Rules and enable User Scoring Rules.
    
    The Scoring Rules table displays the user-defined rules and sub-rules.
    
2.  Click Add Scoring Rule.
    
3.  In the Create New Scoring Rule dialog, define the rule criteria:
    
    1.  Under Rule Name, enter a unique name for your rule.
        
    2.  Under Score, define the score that Cortex Cloud should apply to issues that matching the rule criteria.
        
    3.  Under Base Rule, select whether to create a top-level rule (labeled Root) or a sub-rule (labeled _Rule Name (ID:#)_). By default, rules are defined at the root level.
        
    4.  Select or deselect Apply score only to first issue of case.
        
        By selecting this option you choose to apply the score only to the first issue that matches the defined rule. Subsequent issues of the same case will not receive a score from this rule. By default, a score is applied only to the first issue that matches the defined rule and sub-rule.
        
    5.  In the issue table, use the filters to define the attributes you want to include in the rule match criteria. For example, you can select issues with High severity, issues by category, or issues associated with certain assets or asset providers.
        
        **Tip:**
        
        Right-click an issue field to add it as match criteria.
        
    
    Example 13. Example
    
    With this rule, Cortex Cloud assigns a score of 30 to any XDR BIOC issues with a severity level of Critical:
    
    -   Score = 30
        
    -   Base Rule = Root
        
    -   Filters:
        
        `Issue Source=XDR BIOC AND Severity=Critical`
        
    
      
    
4.  Click Create.
    
    You are automatically redirected to the Scoring Rules table.
    
5.  In the Scoring Rules table, click Save to save your scoring rule.
    
    **Note:**
    
    For scoped users, a small lock icon indicates that you don't have permissions to edit a rule.
    

###### Revise existing scoring rules

In the Scoring Rules table, take the following actions to review your rules and sub-rules:

-   Use the arrows to rearrange rule priorities. Make sure to click Save after any changes.
    
-   Select one or more rules and right-click to see the available actions.
    

###### Scope-Based Access Control considerations

Case Scoring supports Scope-Based Access Control (SBAC). If you're a scoped user, a small lock icon indicates that you don't have permissions to edit a rule. The following parameters are considered when editing a scoring rule:

-   If Scope-Based Access Control (SBAC) is enabled and Endpoint Scoping Mode is set to restrictive mode, you can edit a rule if you are scoped to all tags in the rule.
    
-   If Scope-Based Access Control (SBAC) is enabled and Endpoint Scoping Mode is set to permissive mode, you can edit a rule if you are scoped to at least one tag listed in the rule.
    
-   To change the order of a rule, you must have permissions to the other rules of which you want to change the order.
    
-   If a rule was added when set to restrictive mode, and then changed to permissive (or vice versa), you will only have view permissions.

##### Create a starring configuration
You can proactively star issues and the cases to which they are linked by creating a starring configuration:

1.  Select Cases & Issues → Case Configuration → Starred Issues.
    
2.  Select Add Starring Configuration.
    
3.  Under Configuration Name, enter a name to identify your starring configuration.
    
4.  (Optional) Under Comment, enter a descriptive comment.
    
5.  In the issue table, use the filters to define the issue attributes you want to include in the match criteria. For example, you can select issues with High severity, issues by category, or issues associated with certain assets or asset providers.
    
    **Tip:**
    
    Right-click an issue field to add it as match criteria.
    
6.  Click Create.
    

###### Scope-Based Access Control considerations

Case starring supports Scope-Based Access Control (SBAC). The following parameters are considered when editing a starring configuration:

-   If Scope-Based Access Control (SBAC) is enabled and the Endpoint Scoping Mode is set to restrictive mode, you can edit a configuration if you are scoped to all tags in the configuration.
    
-   If Scope-Based Access Control (SBAC) is enabled and the Endpoint Scoping Mode is set to permissive mode, you can edit a configuration if you are scoped to at least one tag listed in the configuration.
    
-   If a policy was added when set to restrictive mode, and then changed to permissive (or vice versa), you will only have view permissions.

##### Create custom case statuses and resolution reasons

You can create custom case status and resolutions that are that are tailored to your workflow.

**Note:**

Before you create a custom status, please review the built-in options. For more information, see Resolution reasons for cases and issues.

We recommend using the built-in statuses and resolution reasons where possible. Custom statuses and resolution reasons might not be supported by all content, and status syncing can take time.

In addition, custom statuses affect Cortex Cloud’s ability to learn, correctly identify, and score future cases.

You can create custom cases statuses and custom resolution reasons that are tailored to your workflow. Custom case statuses and resolution reasons apply to case and issue statuses, and can also be used in playbooks.

Adding custom ,case statuses and resolution reasons requires a View/Edit RBAC permission for Case Properties (under Configurations → Object Setup).

**Note:**

After creation, custom statuses and resolution reasons cannot be deleted or modified.

How to create custom case statuses

1.  Go to Configurations → Object Setup → Cases → Properties.
    
    The existing statuses and resolution types are listed.
    
2.  In the Add another status field, type a new status and click Save.
    
3.  Click Edit to rearrange the order of the statuses. This order is presented when you set a status or select a resolution type.

##### Create a sync profile

You can set up inbound and outbound sync profiles to define field mapping between Cortex Cloud issues and an external application.

Sync profiles provide a blueprint for how information is exchanged between Cortex Cloud issues and external applications, by defining field mapping. This ensures that relevant data, such as Status or Description, is accurately transferred and maintains consistency, even if the systems use different terminology.

When you link an issue with an external application (such as Jira), or set up an automation, you can select the sync profile you want to use. Cortex Cloud provides default outbound and inbound sync profiles, or you can create custom sync profiles as described in the following procedure.

How to create a sync profile

1.  Go to Settings → Configurations → Object Setup → Issues → Sync Profiles.
    
2.  Click New Profile.
    
3.  Type a profile name and description.
    
4.  Under Integration, select the external application with which you want to map fields, such as Jira V3 or ServiceNow V2.
    
5.  Under Sync Direction, select Inbound or Outbound. 
    
    If you select Inbound, you will define field mapping from the external application to Cortex Cloud. If you select Outbound, you will define field mapping from Cortex Cloud to the external application.
    
    **Note:**
    
    If an issue is using bi-directional syncing, you need to provide both an Inbound and an outbound sync profile.
    
6.  Under Field Mapping, select a field to map and select the corresponding field. For example, Jira: Priority, Cortex: Severity.
    
7.  Define one or more values for each field that you want to map.
    
    **Note:**
    
    -   Blank fields are skipped.
        
    -   You must define exact values.
        
    -   Custom status values are not currently supported.
        
    -   Support is currently limited to a specific set of fields.
        
    
8.  Click Save.
    
    Example 14. 
    
    In this example, the sync profile specifies Inbound mapping from Jira v3 fields to Cortex fields.

### Dashboards and reports
Dashboards consist of visualized data powered by fully customizable widgets, which enable you to analyze data from inside or outside Cortex Cloud, in different formats such as graphs, pie charts, or text. Cortex Cloud displays the predefined dashboards when you log in. You can also create custom dashboards that are based on the predefined dashboards, or built to your specifications, and you can save any of your dashboards as reports.

From the Dashboard & Reports menu, you can view and manage your dashboards and reports from the dashboard and incidents table, and view alert exclusions.

-   Dashboard: Provides dashboards that you can use to view high-level statistics about your agents and incidents.
    
-   Reports: View all the reports that Cortex Cloud administrators have run.
    
-   Customize: Create and manage a new dashboard and reports.
    
    -   Dashboards Manager: Add new dashboards with customized widgets to surface the statistics that matter to you most.
        
    -   Reports Templates: Build reports using pre-defined templates, or customize a report. Reports can be generated on-demand scheduled.
        
    -   Widget Library: Search, view, edit, and create widgets based on predefined widgets and user-created custom widgets.
