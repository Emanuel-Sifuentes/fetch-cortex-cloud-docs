---
title: "JFrog Artifactory"
tocId: "QSrDjPExZJW4lqusH7CpCg"
contentId: "pG2VPVxIEYnBT2s_AxHlUg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/JFrog-Artifactory"
depth: 2
---

# JFrog Artifactory
Onboard JFrog Artifactory to authorize the Software Composition Analysis (SCA) scanner to resolve packages stored in your private Artifactory instance. By retrieving dependency metadata directly from the registry, the scanner can build accurate dependency trees and reliably detect vulnerabilities in your private libraries.

## Integration scope

-   SCA vs Image scanning: to build accurate dependency trees. It does not support container image scanning. To scan images, you must configure a separate JFrog Artifactory instance. To integrate JFrog Artifactory for image scans, refer to Connect JFrog container registry.Connect JFrog container registry
    
-   You can onboard only one JFrog Artifactory instance. Within that instance, you can configure one integration for each supported package manager type
    

## Supported environments

Supports both JFrog Artifactory Cloud (SaaS) and JFrog Artifactory Self-Hosted (On-Premises) environments.JFrog Cloud Artifactory (SaaS)

## Supported package managers

-   `Maven`: Supports mirroring
    
-   `Gradle`
    
-   `NPM`: