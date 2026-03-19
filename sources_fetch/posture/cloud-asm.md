# Cloud ASM

## What is Cloud ASM?

Cloud ASM provides visibility into all the assets in your cloud infrastructure that are exposed to the internet.

Cloud Attack Surface Management (ASM) brings ASM capabilities to cloud security posture management, providing visibility into all the assets in your cloud infrastructure that are exposed to the internet.

Cloud ASM includes the following capabilities:

-   **Discovery of unmanaged cloud services**: Identify internet-exposed cloud services that are unmanaged, so you can onboard them into Cortex Cloud for comprehensive cloud security and policy enforcement.
    
-   **Confirmation of internet exposure:** ASM internet scan data is used to reinforce CNA detections to provide high-confidence detections of inadvertent internet exposure. This joint approach combines inside-out and outside-in assessments to reduce false-positives.
    
-   **Monitoring of managed and unmanaged cloud services**: Gain ongoing visibility into the risks on cloud services through regular ASM scans and issues and findings for cloud-related attack surface detections.
    

### What is unmanaged cloud?

**Managed cloud**—Cloud services that were discovered in an ASM scan and can be correlated with preexisting cloud assets that have been onboarded into your asset inventory. For example, if an ASM scan finds a service on AWS that is also in your cloud inventory, the asset is considered a managed cloud asset.

**Unmanaged cloud**—Cloud services that were discovered by an ASM scan, were attributed to you based on domain, subdomain, or TLS certificate, but cannot be correlated to the IPs or FQDNs of any onboarded cloud assets. For example, if a scan detects a service on an Azure asset that has not been onboarded into your cloud inventory, it is considered an unmanaged cloud asset.

If an ASM scan finds a service on unsupported cloud provider (such as HiNet), it is considered "not applicable" because it cannot be onboarded and converted to a managed asset.

## Cloud ASM concepts

### Scanning

Cortex Cloud provides targeted scanning of customer networks from an attributed scanning infrastructure.

Attack Surface Management (ASM) in Cortex Cloud uses data collected from global internet scans as well open-source intelligence about the internet to maintain a complete inventory of all the internet-facing assets that belong to an organization. The following topics describe the scans that Cortex Cloud uses to map and monitor your attack surface.

#### Scanning cadences

Cortex Cloud scans the internet for new services at varying cadences based on factors such as port, protocol, cloud provider ranges, and customer-attributed assets.

Cortex Cloud scans the internet to discover new services at varying cadences depending on several factors such as port, protocol, cloud provider ranges, and customer-attributed assets. All responsive services are monitored regularly.

Below is a list of our targeted scanning cadences:

-   **Discovery Scans**
    
    -   **Global Base**— twice per week discovery of approximately 250 of the most common ports on all IPv4 space.
        
    -   **Global Extended**—low background rate discovery of the remaining 65k ports, excluding those covered in KAM base and KAM extended.
        
    -   **KAM (Known Assets Monitoring) Base**—daily discovery of approximately 300 of the most common ports on customer-attributed assets.
        
    -   **KAM Extended**—weekly discovery of approximately 2800 of the most common ports on customer-attributed assets. These do not overlap with KAM Base.
        
    
-   **Monitoring Scans**
    
    -   Daily on all responsive services.
        
    
-   **Attack Surface Testing Scans**
    
    -   Daily on configured services.

#### Scanning ports and protocols

Cortex Cloud detects protocol-validated services on the IPv4 and IPv6 space of the internet.

Cortex Cloud detects protocol-validated services on the IPv4 and IPv6 space of the internet through a series of specialized payloads that target specific port-protocol pairs. Following are examples of some of the protocols and ports on which Cortex Cloud checks for active services throughout a standard global scan.

**Note:**

The following lists are not exhaustive. For current and complete lists, contact your customer success team.

-   **Sample protocols**: SSL, FTS, SSH, Telnet, HTTP, POP3, RDP, FTP, XMPP, Postgres, VNC, UDP, etc
    
-   **Sample Ports**: 0, 20, 21, 22, 23, 25, 53, 67, 68, 80, 81, 82, 83, 88, 110, 111, 118, 123, 135, 137, 138, 139, 143, 161, 179, 389, 401, 443, 444, 445, 465, 500, 502, 554, 587, 593, 808, 873, 888, 943, 987, 990, 993, 995, 1000, 1024, 1025, 1026, 1028, 1112, 1234, 1250, 1433, 1434, 1443, 1521, 1717, 1723, 1900, 1911, 2001, 2002, 2078, 2080, 2082, 2083, 2084, 2085, 2086, 2087, 2096, 2121, 2160, 2161, 2222, 2323, 2443, 2483, 2484, 2525, 3000, 3052, 3306, 3333, 3388, 3389, 3390, 3443, 3493, 3905, 3909, 3917, 3929, 3975, 3978, 4002, 4100, 4117, 4172, 4343, 4430, 4433, 4443, 4444, 4500, 4506, 4567, 4786, 4911, 5000, 5001, 5060, 5061, 5222, 5269, 5351, 5353, 5432, 5443, 5555, 5632, 5800, 5900, 5901, 5902, 5903, 5904, 5905, 5906, 5907, 5908, 5909, 5910, 5916, 5984, 5985, 5986, 6001, 6002, 6363, 6379, 6443, 7001, 7080, 7170, 7443, 7547, 7777, 8000, 8005, 8008, 8009, 8010, 8015, 8020, 8080, 8081, 8082, 8083, 8085, 8088, 8090, 8094, 8139, 8140, 8159, 8194, 8195, 8196, 8197, 8198, 8209, 8210, 8211, 8212, 8213, 8214, 8215, 8216, 8217, 8218, 8219, 8220, 8282, 8290, 8291, 8292, 8293, 8294, 8333, 8443, 8444, 8530, 8531, 8800, 8880, 8887, 8888, 8899, 8991, 8999, 9000, 9002, 9042, 9080, 9091, 9092, 9100, 9200, 9418, 9443, 9444, 9595, 9983, 9997, 10000, 10010, 10443, 11211, 11495, 11553, 12345, 16010, 17185, 17516, 17778, 18080, 18574, 20249, 21242, 22460, 25789, 25827, 27017, 28080, 30005, 30006, 30010, 30083, 30303, 32400, 37443, 37777, 38080, 38520, 40000, 40005, 42713, 44344, 44818, 47001, 47693, 47808, 49501, 49502, 50001, 50067, 50070, 50580, 50805, 50995, 50996, 50997, 51005, 51007, 51200, 51401, 52200, 52311, 52590, 52869, 53300, 53524, 53631, 54041, 54498, 54528, 55918, 56222, 58000, 58603, 60000, 60243, 60443, 61337, 62078

#### Scanning activity
Cortex Xpanse at Palo Alto Networks takes an outside-in approach to network security and asset management. We continuously scan the global internet to monitor our customers' internet-facing attack surface and discover emerging threats.

Our scanning activity on the ranges below is CFAA-compliant. You can mark our ranges as non-malicious in your system so that you stop getting alerts, or configure your firewall to drop traffic from our ranges.

```
35.203.210.0/23
144.86.173.0/24
147.185.132.0/23
162.216.149.0/24
162.216.150.0/24
172.105.147.0/24
198.235.24.0/24
205.210.31.0/24
216.25.88.0/21

2604:a940:300:5b6:0:0:0:0/64 
2604:a940:301:225:0:0:0:0/64 
2604:a940:302:118:0:0:0:0/64 
```

If you believe you have discovered abuse associated with Cortex Xpanse scans, please contact us at scaninfo@paloaltonetworks.com.

### Network mapping

Through a network mapping process, Cortex Cloud discovers and attributes assets to organizations.

Attack Surface Management (ASM) in Cortex Cloud discovers and intelligently attributes assets to organizations, helping you discover and protect previously unknown internet-connected systems. Through this network mapping process, you will understand your organization's true public-facing network perimeter.

#### Asset discovery and attribution

Cortex Cloud uses a variety of methods to discover and attribute internet-facing assets to your organization. These methods include:

-   **Domain Registration**—Domain registry information mentions information about your organization. Cortex Cloud pulls Whois registration information and updates it in your Cortex Cloud instance approximately biweekly.
    
-   **Certificate**—An IP range advertised one of your certificates.
    
-   **DNS**—A DNS record points to an IP in your IP range. Cortex Cloud gets its domains and DNS data from a combination of active and passive global collection techniques.
    
-   **Self-Provided**—The asset was on an IP address list provided by your organization or was attributed by Cortex Cloud for a reason other than those listed above.
    

#### Human-in-the-loop

An expert analyst oversees a human-in-the-loop system which leverages our proprietary AI models to produce network maps of the highest confidence and completeness.

Your Internet-facing assets are always under attack from targeted and opportunistic attackers. Without a continuously updated, accurate inventory of those assets, you leave unknown or unmonitored assets exposed to threats. Cortex Cloud discovers and helps remediate any exposures on those assets.

A primary advantage of Cortex Cloud is combining leading-edge automated network mapping analysis with expert insights and validation. Cortex XSIAM experts understand the intricacies and idiosyncrasies of asset scanning and attribution. The end-result for Cortex Cloud customers is fewer false positives and development of naming schemas and patterns that lead to broader asset discovery than what you see with fully automated scanning engines alone.

## Enable Cloud ASM

Enable Cloud ASM data discovery to discover all your unmanaged cloud services and cloud services exposed to the internet.

Cloud ASM data discovery is disabled by default. You can enable it or disable it at any time.

**Note:**

Discovered services will increase workload consumption. ASM data will begin to appear in your tenant and be included in your licensing workload meter within 72 hours.

How to enable or disable Cloud ASM

1.  Navigate to Settings → Configurations → Attack Surface → Data Management.
    
2.  Toggle the Enable Attack Surface Data switch on or off.

## Attack Surface Management detections
The Attack Surface Management module creates findings and issues based on the following types of detections:

-   Attack surface rules
    
-   Externally inferred CVEs

### Attack surface rules

Attack surface rules are used to identify risks in your attack surface.

An _attack surface rule_ is a definition managed by Cortex Cloud that identifies risks on a customer's attack surface. Attack Surface Rules match on ASM global scan results to detect exposed or misconfigured customer-owned assets. When an attack surface rule is enabled, Cortex Cloud will generate findings as well as issues for observations that match that rule.

To view attack surface rules, navigate to Modules → Attack Surface → Policies → Attack Surface Rules.

The following table describes each field in the Attack Surface Rules table.

Read more...

| Field | Description |
| --- | --- |
| ASM Alert Categories | A categorization done by the Cortex Cloud security research team often with input from customers or in reference to published materials such the the BOD-22-01 or BOD-23-02 from CISA. |
| Description | Description of what the attack surface rule is looking for. |
| Estimated Alert Count | Estimated number of alerts that Xpanse will create if this attack surface rule is enabled. |
| Has Remediation Rule | Indicates whether a remediation path rule has been created for this attack surface rule. Applies only to systems with the Active Response addon module. |
| Modified | Date of the most recent update to the attack surface rule. |
| Remediation Guidance | Guidance on how to remediate or mitigate the alerts created by this attack surface rule. |
| Rule ID | ID for this attack surface rule. |
| Rule Name | Name of the attack surface rule. |
| Severity | Severity of the risk identified by the attack surface rule. Issues are created with the same severity as the attack surface rule that triggered them. See Default attack surface rule severity for default severity settings. |
| Status | Enabled or Disabled. An enabled attack surface rule creates an issue when it detects an instance of that rule. See Default attack surface rule enablement status for details about the default enablement status. |

#### Manage attack surface rules

On the Attack Surface Rules page you can enable or disable rules and change the severity to align with your organization’s specific needs and priorities.

1.  Navigate to Modules → Attack Surface → Policies → Attack Surface Rules.
    
2.  Select one or more rules and right-click to perform one of the following actions:
    
    -   Enable or Disable the rule—Some rules are enabled by default, but many are designed to be opt-in.
        
    -   Change the default Severity of the rule—All attack surface rules have a predefined default Severity setting of Low, Medium, or High. Critical is never a predefined default, but you can set it as the default.
        
    

When you first enable an attack surface rule, you can expect to see new findings within 24 hours if any instances of that rule are detected on your attack surface. When you disable an attack surface rule, Cortex Cloud will stop creating new issues for that rule, but any existing open issues will remain open until you change the status.

#### Default attack surface rule severity

The Cortex security research team determines the default severity setting for an attack surface rule based on a number of details. We may adjust the default severity when new threat information becomes available. Changes to the default severity will never override any changes you make to a rule’s severity.

| Default Severity | Description |
| --- | --- |
| Critical | None of the attack surface rules are rated as Critical by default. This severity is reserved for customers to elevate the attack surface rules or individual issues they deem critical for their organization. |
| High | High severity rules identify risks that most organizations would consider important to remediate in a timely manner. This primarily includes known insecure versions of software with published high or critical severity CVEs and external services that are inherently risky to expose directly on the internet. For example: A known-insecure version of software with a known high-score CVE. These may include CVEs with weaponized exploits.; Devices and services that are inherently risky to be exposed to the public internet (RDP, building control systems, databases, etc). These are often targets for opportunistic attackers who are scanning the internet and can use brute force or use other tactics to gain access to an organization’s systems. |
| Medium | Medium severity rules identify risks that we believe some organizations would consider important to remediate, but may not be important to everyone. For example: A service type with known vulnerabilities that could reasonably be expected to be publicly visible on the internet but where we cannot infer insecure versions with high confidence.; A service that may or may not be expected to be publicly visible on the internet; Something that an organization may or may not be expected to remediate (e.g. a certificate expiring in 30 days). |
| Low | Low severity rules are unlikely to be consequential to most organizations. These include the following types of risks: Services that could be expected to be exposed to the internet, but where the attack surface rule will not exclusively surface vulnerable instances (in these cases, they may be paired with a higher priority "insecure" version of the rule for known vulnerable instances).; Services that could be of interest but pose minimal attack surface risk. Attack surface rules that capture these services exist primarily for visibility purposes.; Low-signal findings where reliably detecting the service is considered low confidence. Attack surface rules where the impact of exposure is high but the detection signal is low are also classified as Low severity. |

#### Default attack surface rule enablement status

Attack surface rules are enabled or disabled by default. You can change the enablement status for a rule or set of rules at any time.

If a rule is made available to only a select set of customers (typically due to customer request), we will set the rule to enabled by default, regardless of the severity.

In general, most attack surface rules are disabled by default. This approach ensures that customers stay in control of their overall risk assessment. We encourage you to routinely review the attack surface rules and Enable them so they begin generating issues.

The internal Cortex decision to enable a rule by default weighs the likelihood of generating numerous issues that may not be relevant to all customers versus the risk of a customer missing something important to them.

#### Attack surface rule deprecation

Cortex Cloud is committed to providing the most accurate attack surface rules. Our security research team continuously reviews and refines the attack surface rules to ensure that our rules effectively reflect the evolving threat landscape and new technologies. When a rule is marked as "deprecated" in Cortex Cloud, it signifies that the rule is no longer recommended for active use by customers and is slated for eventual removal from the platform. A deprecated rule will continue to function for a transitional period, but deprecation indicates an important update in our recommended best practices and upcoming rule enhancements.

### Externally inferred CVEs
Cortex Cloud identifies externally inferred CVEs by comparing the product name and version of an active service, if identifiable, with CVEs for those products in the National Vulnerability Database (NVD). We categorize externally inferred CVE matches as high or medium confidence based on the version information that is available on the service and from NVD.

-   **High Confidence Match**—Precise version information is available both from the service and from NVD. Cortex Cloud generates issues for high-confidence externally inferred CVEs.
    
-   **Medium Confidence Match**—Part of the version information from the service matches the NVD entry for the CVE, but the version information from the service or from NVD has additional characters. Cortex Cloud creates findings for medium-confidence externally inferred CVEs but will not generate issues.
    

**Note:**

An externally inferred CVE might impact your service or asset, but additional investigation is required to confirm that the CVE is actually present.

The following table provides examples of externally inferred CVE matches.

Read more...

| Service information available from ASM scan | CVE information available from NVD | Match result | Details |
| --- | --- | --- | --- |
| Apache v 2.4.49 | CVE-2021-41773Affects cpe:2.3:a:apache:http_server:2.4.49:\*:\*:\*:\*:\*:\*:\* | High Confidence Match | Because the CPE information from NVD matches the version of Apache indicated from the scan, this is a high confidence match. |
| Apache v 2.4.49c | CVE-2021-41773Affects cpe:2.3:a:apache:http_server:2.4.49:\*:\*:\*:\*:\*:\*:\* | Medium Confidence Match | Because the version numbers from the service and the NVD information match, except for the additional character in the version from the service, this is a medium confidence match. |
| Apache v 2.4.50 | CVE-2021-41773Affects cpe:2.3:a:apache:http_server:2.4.49:\*:\*:\*:\*:\*:\*:\* | No Match | Because the CPE information from NVD indicates a version of Apache that is different than the one we saw in the scan, this does not match. |
| Apache v 2.4.50 (Running on Red Hat Enterprise Linux 6 (RHEL6), which is not affected by this CVE) | CVE-2022-22719Affects cpe:2.3:a:apache:http_server:\*:\*:\*:\*:\*:\*:\*:\* (up to and including 2.4.52) | High Confidence Match | Because the CPE information from NVD matches the version of apache indicated from the scan, this is a high confidence match. Cortex Cloud cannot determine if mitigating controls are in place or the underlying OS, so this pairing will still generate a high confidence match. |
| Apache (any version number) | CVE-2012-3526Affects cpe:2.3:a:apache:http_server:\*:\*:\*:\*:\*:\*:\*:\* | No match | Because this CVE does not indicate any specific version number, we do not consider it a match for any version of Apache http_server, regardless of version information. |

## Attack surface assets

The assets discovered in an attack surface management scan are called External Surface assets.

The internet-facing assets that were discovered in an attack surface management (ASM) scan and attributed to your organization are available in the inventory on the Inventory → Assets → All Assets → External Surface pages. For information about External Surface assets, including domains, certificates, services, see External Surface assets.External Surface assets

## Review your unmanaged cloud services

Review your unmanaged cloud services in your External Surface inventory.

Review your unmanaged cloud services in your External Surface inventory. Unmanaged cloud services are cloud services that were discovered in an ASM scan and cannot be correlated with cloud assets that were previously onboarded into your inventory.

1.  Navigate to Inventory → Assets → All Assets → External Surface → Services.
    
2.  On the Service Inventory page, filter the list of services using the filter Partially Onboarded \= Yes.

## Review unmanaged cloud issues

View your unmanaged cloud issues, including service details.

The attack surface rule Unmanaged Cloud Service creates findings when ASM scans detect unmanaged cloud services. This rule is enabled by default, which means it will also create issues. Perform these steps to view your unmanaged cloud issues:

1.  Navigate to Cases & Issues → Issues.
    
2.  Filter the Issues table using the filter Attack Surface Rule ID \= UnmanagedCloudService.
    
3.  Click on an issue to display the issue details, including the unmanaged cloud service information.

## Attack Surface Management FedRAMP support
Cortex Cloud supports the following Attack Surface Management (ASM) features in FedRAMP Moderate and High environments.

| **Feature** | **FedRAMP Mod** | **FedRAMP High** |
| --- | --- | --- |
| ASM Asset Inventory | Yes | Yes |
| Attack Surface Rules | Yes | Yes |
| Emerging Vulnerabilities | Yes | Yes |
| Attack Surface Testing | Yes | Yes |
| Cloud ASM Enrichment | No | No |
| Remediation Confirmation Scanning | No | No |
| Global Lookup | No | No |
| Digital Risk Protection | No | No |
| Asset Uploads and Removals | No | Yes |
