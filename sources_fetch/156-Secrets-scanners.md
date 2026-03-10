---
title: "Secrets scanners"
tocId: "Ql9k5qlNK4S3NIjkfXA9SQ"
contentId: "vpPYM0YCyKnFjF3YjOi2Rw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Secrets-scanners"
depth: 1
---

# Secrets scanners

Cortex Cloud Application Security Secrets scans identify sensitive data embedded in your codebase. This proactive scanning approach ensures that sensitive information is detected and addressed early in the Software Development Lifecycle, significantly reducing the risk of such issues reaching production environments.

**Secrets use cases**

-   **Detect exposed sensitive data**: Identify hardcoded credentials, API keys, passwords, tokens, encryption keys, certificates, and pass-phrases found directly within your source code or configuration files
    
-   **Prevent unauthorized access and data breaches**: By enabling the early identification of these exposures, secrets scans help prevent unauthorized access and potential data breaches that could compromise your infrastructure and applications
    

**Supported file types**: Cortex Cloud Application Security scans any plaintext files that are not encrypted, not compressed (for example, not .zip files) and not compiled (for example, not .jar files), for secrets. Additionally, entropy findings look for keywords to lower the noise, and those keywords must be in line with the high entropy string to be flagged.

**Entropy Analysis**: Cortex Cloud Application Security provides signatures that analyze the randomness of strings within the file. Highly random strings, often referred to as high entropy, can be indicative of a potential secret. To reduce false positives, Cortex Cloud Application Security considers specific keywords that might be associated with secrets alongside the randomness of the data for better accuracy.

You can create policies to automatically detect and prevent the introduction of vulnerable open-source components into your codebase. These policies ensure that all third-party dependencies align with your organization's security standards and risk tolerance, helping you maintain a secure software supply chain. For more information about creating secrets policies, refer to Create Cortex Cloud Application Security policies.