---
title: "Overview"
tocId: "6cLyylz4z_EXQEdpzIr9Xg"
contentId: "kX94Vyk4hbUm8NBrbTtZ4Q"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Overview"
depth: 2
---

# Overview
You can manage Cortex Cloud Application Security scans through dedicated periodic branch and pull request (PR) scans inventories, which provide a central view of scan health, status, scope, and detected issues. This enables efficient tracking, analysis, and management of scans for vulnerability insights

In addition, you can configure native scanners, optimize settings, and monitor scan health to streamline your scan management process and enhance your security posture.

## How to access Cortex Cloud Application Security scan management

To access scan management:

1.  Under Modules, select Application Security.
    
2.  Under Scans, select a scan type:
    
    -   Branch Periodic Scanning: Scans code branches on a schedule to identify vulnerabilities early in development. For more information about branch periodic scans, refer to Branch periodic scans
        
    -   Pull Request Scans: Scans code changes within pull requests to prevent the introduction of new vulnerabilities. For more information about pull request scans, refer to Pull Request scans
        
    

## Scan data presentation

Periodic and pull request scan details are presented on the Cortex Cloud console across three levels of granularity: an inventory table providing a list of scans, a side panel providing general scan details including a high-level breakdown of the findings and issues detected during the scan, and an expanded description card, providing detailed information about the issues generated from these scans.

**Note**

While scans provide a comprehensive inventory of all issues detected during a scan, dedicated inventories are also maintained for specific scan types for more granular management. For more information, refer to Infrastructure as Code (IaC) misconfiguration scanner, Secrets scanners and Software Composition Analysis (SCA ) scanners.