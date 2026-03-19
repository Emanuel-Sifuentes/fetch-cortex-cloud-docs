# Endpoint security

## Endpoint protection

This topic provides an overview of traditional endpoint protection versus the protection of endpoints using Cortex Cloud.

Cyberattacks target endpoints to inflict damage, steal information or achieve other goals that involve taking control of computer systems. Attackers perpetrate cyberattacks either by causing a user to unintentionally run a malicious executable file, known as malware, or by exploiting a weakness in a legitimate executable file to run malicious code behind the scenes without the knowledge of the user.

One way to prevent these attacks is to identify files, dynamic-link libraries (DLLs), and other pieces of code to determine if they are malicious and, if so, to prevent the execution of these components by first matching each potentially dangerous code module against a list of specific, known threat signatures. The weakness of this is that it is time-consuming for signature-based antivirus (AV) solutions to identify newly created threats that are known only to the attacker (also known as zero-day attacks or exploits) and add them to the lists of known threats, which leaves endpoints vulnerable until signatures are updated.

Cortex Cloud takes a more efficient and effective approach to prevent attacks that eliminates the need for traditional AV. Rather than try to keep up with the ever-growing list of known threats, Cortex Cloud sets up a series of roadblocks that prevent the attacks at their initial entry points, the point where legitimate executable files are about to unknowingly allow malicious access to the system.

Cortex Cloud provides a multi-method protection solution with exploit protection modules that target software vulnerabilities in processes that open non-executable files and malware protection modules that examine executable files, DLLs, and macros for malicious signatures and behavior. Using this multi-method approach, along with AI analysis Cortex Cloud can prevent all types of attacks, whether these are known or unknown threats.

### Malware protection

Cortex Cloud prevents malware attacks and provides protection on endpoints based on the different operating systems.

Malicious files, known as malware, are often disguised as or embedded in non-malicious files. These files can attempt to gain control, gather sensitive information, or disrupt the normal operations of the system. Cortex Cloud prevents malware by employing the Malware Prevention Engine. This approach combines several layers of protection to prevent both known and unknown malware from causing harm to your endpoints. The mitigation techniques that the Malware Prevention Engine employs vary by endpoint type.

The Malware Prevention Engine uses mitigation methods that implements malware protection on endpoints based on the different operating systems.

Windows

| Malware protection type | Description |
| --- | --- |
| Anti tampering protection | Enables Cortex Cloud to protect against tampering attempts. |
| Anti webshell protection | Enables Cortex Cloud to protect endpoint processes from dropping malicious web shells. |
| ASP and ASPX file protection | Enables Cortex Cloud to protect endpoint from malicious ASP and ASPX files being written to the file system. |
| Credential gathering protection | Enables Cortex Cloud to protect endpoints from processes trying to access or steal passwords and other credentials. |
| Cryptominers protection | Enables Cortex Cloud to protect against attempts to locate or steal cryptocurrencies. |
| Dynamic kernel protection | Enables Cortex Cloud to protect endpoints from kernel-level threats such as bootkits, rootkits, and susceptible drivers. |
| Endpoint scanning | Enables Cortex Cloud to scan endpoints and attached removable drives for dormant, inactive malware. |
| Financial malware threat protection | Enables Cortex Cloud to protect against techniques specific to financial and banking malware. |
| Global behavioral threat protection rules | Enables Cortex Cloud to use rules to protect endpoints from malicious causality chains. |
| IIS protection | Enables Cortex Cloud to protect against Internet Information Server (IIS) attacks. |
| In-process shellcode protection | Enables Cortex Cloud to protect against in-process shellcode attack threats. |
| JScript file examination | Enables Cortex Cloud to detect and prevent malicious JScript files from being executed or written to disk on Windows-based endpoints. |
| LDAP query protection | Enables Cortex Cloud to analyze and act upon suspicious LDAP queries sent by the agent to a Domain Controller, to detect and block Active Directory reconnaissance attacks. |
| Malicious causality chain response | Enables Cortex Cloud to respond automatically when malicious causality chains are identified. |
| Malicious child process protection | Enables Cortex Cloud to prevent script-based attacks. Such attacks can be used to deliver malware by blocking targeted processes that are commonly used to bypass traditional security methods. |
| Malicious device protection | Enables Cortex Cloud to protect against the connection of potentially malicious devices to endpoints. |
| Network packet inspection | Enables Cortex Cloud to analyze network packet data for malicious behavior. |
| Office files with macros examination | Enables Cortex Cloud to analyze and prevent malicious macros embedded in Microsoft Office files (Word, Excel) from running on Windows endpoints. |
| On-demand file examination | Enables Cortex Cloud to scan endpoints and attached removable drives for dormant, inactive malware. |
| On-write file examination | Enables Cortex Cloud to monitor and take action on malicious files during the on-write process. |
| Password theft protection | Enables Cortex Cloud to prevent attacks that extract passwords from memory using the Mimikatz tool. |
| Portable executable and DLL | Enables Cortex Cloud to analyze and prevent malicious executable files and DLL files from running on Windows endpoints. |
| PowerShell script file examination | Enables Cortex Cloud to analyze and prevent malicious PowerShell script files from running on Windows endpoints. |
| Ransomware protection | Enables Cortex Cloud to protect against encryption-based activity associated with ransomware attacks. |
| Security measure bypass protection | Enables Cortex Cloud to protect endpoints from malicious actors attempting to bypass Windows built-in security controls. |
| UAC bypass prevention | Enables Cortex Cloud to protect against the User Access Control (UAC) bypass mechanism that is associated with privilege elevation attempts. |
| UEFI protection | Enables Cortex Cloud to protect endpoints from Unified Extensible Firmware Interface (UEFI) manipulation attempts. |
| VB script file protection | Enables Cortex Cloud to protect endpoints from malicious VB script files. |

macOS

| Malware protection type | Description |
| --- | --- |
| Anti tampering protection | Enables Cortex Cloud to protect against tampering attempts. |
| Anti webshell protection | Enables Cortex Cloud to protect endpoint processes from dropping malicious web shells. |
| Credential gathering protection | Enables Cortex Cloud to protect endpoints from processes trying to access or steal passwords and other credentials. |
| Cryptominers protection | Enables Cortex Cloud to protect against attempts to locate or steal cryptocurrencies. |
| DMG file examination | Enables Cortex Cloud to check DMG files for malware. |
| Endpoint scanning | Enables Cortex Cloud to scan endpoints and attached removable drives for dormant, inactive malware. |
| Financial malware threat protection | Enables Cortex Cloud to protect against techniques specific to financial and banking malware. |
| Global behavioral threat protection rules | Enables Cortex Cloud to use rules to protect endpoints from malicious causality chains. |
| Local file threat examination | Enables Cortex Cloud to detect malicious files on the endpoint. |
| Mach-O file examination | Enables Cortex Cloud to check Mach-O files for malware upon loading, and upon execution. |
| Malicious child process protection | Enables Cortex Cloud to prevent script-based attacks. Such attacks can be used to deliver malware by blocking targeted processes that are commonly used to bypass traditional security methods. |
| Malicious device protection | Enables Cortex Cloud to identify and block potentially malicious Human Interface Devices (HIDs), to prevent attacks that exploit device trust. |
| Network Packet Inspection Engine | Enables to detect abnormal network traffic patterns and prevent malicious activity. |
| Ransomware protection | Enables Cortex Cloud to protect against encryption-based activity associated with ransomware attacks. |

Linux

| Malware protection type | Description |
| --- | --- |
| Anti webshell protection | Enables Cortex Cloud to protect endpoint processes from dropping malicious web shells. |
| Container escaping protection | Enables Cortex Cloud to protect against container-escaping attempts. |
| Credential gathering protection | Enables Cortex Cloud to protect endpoints from processes trying to access or steal passwords and other credentials. |
| Cryptominers protection | Enables Cortex Cloud to protect against attempts to locate or steal cryptocurrencies. |
| ELF file examination | Enables Cortex Cloud to detect and prevent malicious ELF files from being executed or written to disk on Linux-based endpoints.; On-write file examination - Enables Cortex Cloud to monitor and take action on malicious files during the on-write process. |
| Endpoint scanning | Enables Cortex Cloud to scan endpoints and attached removable drives for dormant, inactive malware. |
| Financial malware threat protection | Enables Cortex Cloud to protect against techniques specific to financial and banking malware. |
| Global threat behavioral threat protection rules | Enables Cortex Cloud to use rules to protect endpoints from malicious causality chains. |
| Local file threat examination | Enables Cortex Cloud to detect malicious files on the endpoint. |
| Malicious child process protection | Enables Cortex Cloud to prevent process creation based on examination of suspicious relations between parent and child processes. |
| Reverse shell protection | Enables Cortex Cloud to prevent attempts to redirect standard input and output streams to network sockets. |

### Exploit protection

Cortex Cloud prevents exploit attempts and provides protection on endpoints based on the different operating systems.

An exploit is a sequence of commands that takes advantage of a bug or vulnerability in software or hardware to gain unauthorized access or control.

To combat an attack in which an attacker takes advantage of a software exploit or vulnerability, Cortex Cloud employs Endpoint Protection Modules (EPM). Each EPM targets a specific exploit type in the attack chain. Some capabilities that Cortex Cloud EPMs provide are reconnaissance prevention, memory corruption prevention, code execution prevention, and kernel protection.

The following table lists the types of exploits for which Cortex Cloud provides protection.

| Exploit protection type | Description |
| --- | --- |
| Reconnaissance prevention | Prevents attackers from probing the network for vulnerabilities while preserving the option to perform internal reconnaissance testing. |
| Memory corruption prevention | Prevents adversaries from exploiting memory corruption vulnerabilities. |
| Code execution prevention | Prevents malicious code that could allow attackers to deploy additional malware to steal sensitive data. |
| Kernel protection | Protects the kernel against kernel threats and exploits. |

### File analysis and protection flow

The Cortex XDR agent utilizes advanced multi-method protection and prevention techniques to protect from both known and unknown malware and software exploits.

The Cortex XDR agent utilizes advanced multi-method protection and prevention techniques to protect your endpoints from both known and unknown malware and software exploits.

#### Exploit protection for protected processes

In a typical attack scenario, an attacker attempts to gain control of a system by first corrupting or bypassing memory allocation or handlers. Using memory-corruption techniques, such as buffer overflows and heap corruption, a hacker can trigger a bug in the software or exploit a vulnerability in a process. The attacker must then manipulate a program to run code provided or specified by the attacker while evading detection. If the attacker gains access to the operating system, the attacker can then upload malware, such as Trojan horses (programs that contain malicious executable files), or can otherwise use the system to their advantage. The Cortex XDR agent prevents such exploit attempts by employing roadblocks—or traps—at each stage of an exploitation attempt.

When a user opens a non-executable file, such as a PDF or Word document, and the process that opened the file is protected, the Cortex XDR agent seamlessly injects code into the software. This occurs at the earliest possible stage before any files belonging to the process are loaded into memory. The Cortex XDR agent then activates one or more protection modules inside the protected process. Each protection module targets a specific exploitation technique and is designed to prevent attacks on program vulnerabilities based on memory corruption or logic flaws.

In addition to automatically protecting processes from such attacks, the Cortex XDR agent reports any security events to Cortex Cloud and performs additional actions as defined in the endpoint security policy. Common actions performed by the Cortex XDR agent include collecting forensic data and notifying the user about the event.

The default endpoint security policy protects the most vulnerable and most commonly used applications but you can also add other third-party and proprietary applications to the list of protected processes.

#### Malware Protection

The Cortex XDR agent provides malware protection in a series of four evaluation phases:

##### Phase 1: Evaluation of child process protection policy

When a user attempts to run an executable, the operating system attempts to run the executable as a process. If the process tries to launch any child processes, the Cortex XDR agent first evaluates the child process protection policy. If the parent process is a known targeted process that attempts to launch a restricted child process, the Cortex XDR agent blocks the child processes from running and reports the security event to Cortex Cloud. For example, if a user tries to open a Microsoft Word document (using the winword.exe process) and the document has a macro that tries to run a blocked child process (such as WScript), the Cortex XDR agent blocks the child process and reports the event to Cortex Cloud. If the parent process does not try to launch any child processes or tries to launch a child process that is not restricted, the Cortex XDR agent next moves to Phase 2: Evaluation of the restriction policy.

##### Phase 2: Evaluation of the restriction policy

The Cortex XDR agent verifies that the executable file does not violate any restriction rules. For example, you might have a restriction rule that blocks executable files launched from network locations. If a restriction rule applies to an executable file, the Cortex XDR agent blocks the file from executing and reports the security event to Cortex Cloud and, depending on the configuration of each restriction rule, the Cortex XDR agent can also notify the user about the prevention event.

If no restriction rules apply to an executable file, the Cortex XDR agent next moves to Phase 3: Hash verdict determination.

##### Phase 3: Hash verdict determination

The Cortex XDR agent calculates a unique hash using the SHA-256 algorithm for every file that attempts to run on the endpoint. Depending on the features that you enable, the Cortex XDR agent performs additional analysis to determine whether an unknown file is malicious or benign. The Cortex XDR agent can also submit unknown files to Cortex Cloud for in-depth analysis by WildFire.

**Note:**

To enhance performance and efficiency, hash verdict requests from the Cortex XDR agent will be routed to the WildFire service with the lowest latency. File uploads for analysis will strictly adhere to the designated Cortex Cloud and WildFire regions, ensuring data remains within the appropriate geographical boundaries.

To determine a verdict for a file, the Cortex XDR agent evaluates the file in the following order:

1.  **Hash exception**: A hash exception enables you to override the verdict for a specific file without affecting the settings in your Malware Security profile. The hash exception policy is evaluated first and takes precedence over all other methods to determine the hash verdict.
    
    For example, you may want to configure a hash exception for any of the following situations:
    
    -   You want to block a file that has a benign verdict.
        
    -   You want to allow a file that has a malware verdict to run. In general, we recommend that you only override the verdict for malware after you use available threat intelligence resources—such as WildFire—to determine that the file is not malicious.
        
    -   You want to specify a verdict for a file that has not yet received an official WildFire verdict.
        
    
    After you configure a hash exception, Cortex Cloud distributes it at the next heartbeat communication with any endpoints that have previously opened the file.
    
    When a file launches on the endpoint, the Cortex XDR agent first evaluates any relevant hash exception for the file. The hash exception specifies whether to treat the file as malware. If the file is assigned a benign verdict, the Cortex XDR agent permits it to open.
    
    If a hash exception is not configured for the file, the Cortex XDR agent next evaluates the verdict to determine the likelihood of malware.
    
2.  **Highly trusted signers** (Windows and Mac): The Cortex XDR agent distinguishes highly trusted signers such as Microsoft from other known signers. To keep parity with the signers defined in WildFire, Palo Alto Networks regularly reviews the list of highly trusted and known signers and delivers any changes with content updates. The list of highly trusted signers also includes signers that are included in the allow list from Cortex Cloud. When an unknown file attempts to run, the Cortex XDR agent applies the following evaluation criteria: Files signed by highly trusted signers are permitted to run, and files signed by prevented signers are blocked, regardless of the WildFire verdict. Otherwise, when a file is not signed by a highly trusted signer or by a signer included in the block list, the Cortex XDR agent next evaluates the WildFire verdict. For Windows endpoints, evaluation of other known signers takes place if the WildFire evaluation returns an unknown verdict for the file.
    
3.  **WildFire verdict**: If a file is not signed by a highly trusted signer on Windows and Mac endpoints, the Cortex XDR agent performs a hash verdict lookup to determine if a verdict already exists in its local cache.
    
    If the executable file has a malware verdict, the Cortex XDR agent reports the security event to Cortex Cloud , and, depending on the configured behavior for malicious files, the Cortex XDR agent performs one of the following actions.
    
    -   Blocks the file.
        
    -   Blocks and quarantines the file.
        
    -   Notifies the user about the file but still allows the file to execute.
        
    -   Logs the issue without notifying the user and allows the file to execute.
        
    
    If the verdict is benign, the Cortex XDR agent moves on to the next stage of evaluation Phase 4: Evaluation of Malware Protection Policy.
    
    If the hash does not exist in the local cache or has an unknown verdict, the Cortex XDR agent next evaluates whether the file is signed by a known signer.
    
4.  **Local analysis**: When an unknown executable, DLL, or macro attempts to run on a Windows or Mac endpoint, the Cortex XDR agent uses local analysis to determine if it is likely to be malware. On Windows endpoints, if the file is signed by a known signer, the Cortex XDR agent permits the file to run and does not perform additional analysis. For files on Mac endpoints and files that are not signed by a known signer on Windows endpoints, the Cortex XDR agent performs local analysis to determine whether the file is malware. Local analysis uses a static set of pattern-matching rules that inspect multiple file features and attributes, and a statistical model that was developed with machine learning on WildFire threat intelligence. The model enables the Cortex XDR agent to examine hundreds of characteristics for a file and issue a local verdict (benign or malicious) while the endpoint is offline or Cortex Cloud is unreachable. The Cortex XDR agent can rely on the local analysis verdict until it receives an official WildFire verdict or hash exception.
    
    Local analysis is enabled by default in a Malware Security profile. Because local analysis always returns a verdict for an unknown file, if you enable the Cortex XDR agent to Block files with unknown verdict, the agent only blocks unknown files if a local analysis error occurs or local analysis is disabled. To change the default settings (not recommended), see Set up malware prevention profiles.Set up malware prevention profiles
    

##### Phase 4: Evaluation of malware security policy

If the prior evaluation phases do not identify a file as malware, the Cortex XDR agent observes the behavior of the file and applies additional malware protection rules. If a file exhibits malicious behavior, such as encryption-based activity common with ransomware, the Cortex XDR agent blocks the file and reports the security event to the Cortex Cloud.

If no malicious behavior is detected, the Cortex XDR agent permits the file (process) to continue running but continues to monitor the behavior for the lifetime of the process.

### Endpoint protection capabilities

The endpoint protection capabilities vary depending on the platform (operating system) that is used on each of your endpoints.

Each security profile provides a tailored list of protection capabilities that you can configure for the platform you select. The following table describes the protection capabilities you can customize in a security profile. The table also indicates which platforms support the protection capability (a dash (—) indicates the capability is not supported).

| Protection capability | Windows | Mac | Linux |
| --- | --- | --- | --- |
| Exploit security profiles |
| **Browser exploits protection** Browsers can be subject to exploitation attempts from malicious web pages and exploit kits that are embedded in compromised websites. By enabling this capability, the Cortex XDR agent automatically protects browsers from common exploitation attempts. | ✓ | ✓ | — |
| **Logical exploits protection** Attackers can use existing mechanisms in the operating system—such as DLL-loading processes or built in system processes—to execute malicious code. By enabling this capability, the Cortex XDR agent automatically protects endpoints from attacks that try to leverage common operating system mechanisms for malicious purposes. | ✓ | ✓ | — |
| **Known vulnerable processes protection** Common applications in the operating system, such as PDF readers, Office applications, and even processes that are a part of the operating system itself can contain bugs and vulnerabilities that an attacker can exploit. By enabling this capability, the Cortex XDR agent protects these processes from attacks which try to exploit known process vulnerabilities. | ✓ | ✓ | ✓ |
| **Exploit protection for additional processes** To extend protection to third-party processes that are not protected by the default policy from exploitation attempts, you can add additional processes to this capability. | ✓ | ✓ | ✓ |
| **Operating system exploit protection** Attackers commonly leverage the operating system itself to accomplish a malicious action. By enabling this capability, the Cortex XDR agent protects operating system mechanisms such as privilege escalation and prevents them from being used for malicious purposes. | ✓ | ✓ | ✓ |
| **Unpatched vulnerabilities protection** If you have Windows endpoints in your network that are unpatched and exposed to a known vulnerability, Palo Alto Networks strongly recommends that you upgrade to the latest Windows Update that has a fix for that vulnerability. If you choose not to patch the endpoint, the Unpatched Vulnerabilities Protection capability allows the Cortex XDR agent to apply a workaround to protect the endpoints from the known vulnerability. | ✓ | — | — |
| Malware security profiles |
| **Behavioral threat protection** Prevents sophisticated attacks that leverage built-in OS executables and common administration utilities by continuously monitoring endpoint activity for malicious causality chains. | ✓ | ✓ | ✓ |
| **Credential gathering protection** Targets attempts to access and harvest passwords and credentials. | ✓ | ✓ | ✓ |
| **Anti webshell protection** Prevents web shell attacks by continuously monitoring endpoints for processes that try to drop malicious files. | ✓ | ✓ | ✓ |
| **Financial malware threat protection** Targets attempts to access or steal financial or banking information. | ✓ | ✓ | ✓ |
| **Cryptominers protection** Prevents cryptomining by monitoring for processes which attempt to locate or steal cryptocurrencies. | ✓ | ✓ | ✓ |
| **In-process shellcode protection** Targets attempts to run in-process shellcodes that load malicious code. | ✓ | — | — |
| **Ransomware protection** Targets encryption based activity associated with ransomware to analyze and halt ransomware before any data loss occurs. | ✓ | ✓ | — |
| **Prevent malicious child process execution** Prevents script-based attacks used to deliver malware by blocking known targeted processes from launching child processes commonly used to bypass traditional security approaches. | ✓ | ✓ | ✓ |
| **Portable executables and DLLs examination** Analyzes and prevents malicious executable and DLL files from running. | ✓ | ✓ | ✓ |
| **ELF files examination** Analyzes and prevents malicious ELF files from being executed or written to disk. | — | — | ✓ |
| **Local file threat examination** Analyzes and quarantines malicious PHP files arriving from the web server. | — | — | ✓ |
| **Office files examination** Analyzes and prevents malicious macros embedded in Microsoft Office files from running. | ✓ | — | — |
| **JScript files examination** Analyzes and prevent malicious JScript files from being executed or written to disk. | ✓ | — | — |
| **Mach-O files examination** Analyzes and prevents malicious mach-o files from loading and running. | — | ✓ | ✓ |
| **DMG files examination** Analyzes and prevents malicious DMG files from running. | — | ✓ | — |
| **Reverse shell protection** Detects suspicious or abnormal network activity from shell processes and terminate the malicious shell process. | — | — | ✓ |
| **Network packet inspection engine** Analyzes network packet data to detect malicious behavior. | ✓ | — | — |
| **Dynamic kernel protection** Protect the endpoint from kernel-level threats such as bootkits, rootkits, and susceptible drivers. | ✓ | — | — |
| **Container-escaping attempts** | — | — | ✓ |
| **Cryptocurrency wallets protection** Protection for cryptocurrency wallets stored on endpoints. | ✓ | ✓ | — |
| **LDAP query protection** Analyze and act upon suspicious LDAP queries sent by the agent to a Domain Controller, to detect and block Active Directory reconnaissance attacks. | ✓ | — | — |
| **Malicious device protection** Protect your systems from unauthorized hardware attacks and malicious USB devices. The Malicious Device Prevention module identifies and blocks Human Interface Device (HID) tools, such as the "USB Rubber Ducky", that exploit device trust to inject unauthorized keystrokes and similar actions. This feature reduces the physical attack surface, and prevents hardware-based social engineering threats from compromising data. | — | ✓ | — |
| Restrictions security profiles |
| **Execution paths** Many attack scenarios are based on writing malicious executable files to certain folders such as the local temp or download folder and then running them. Use this capability to restrict the locations from which executable files can run. | ✓ | — | — |
| **Network locations** To prevent attack scenarios that are based on writing malicious files to remote folders, you can restrict access to all network locations except for those that you explicitly trust. | ✓ | — | — |
| **Removable media** To prevent malicious code from gaining access to endpoints using external media such as a removable drive, you can restrict the executable files, that users can launch from external drives attached to the endpoints in your network. | ✓ | — | — |
| **Optical drive** To prevent malicious code from gaining access to endpoints using optical disc drives (CD, DVD, and Blu-ray), you can restrict the executable files, that users can launch from optical disc drives connected to the endpoints in your network. | ✓ | — | — |

### Endpoint protection modules

Security modules are activated for your endpoints depending on the chosen security profile and the operating system on the endpoint.

Each security profile applies multiple security modules to protect your endpoints from a wide range of attack techniques. While the settings for each security module are not configurable, the Cortex XDR agent activates a specific protection module depending on the type of attack, the configuration of your security policy, and the operating system of the endpoint.

When a security event occurs, the Cortex XDR agent logs details about the event including the security module employed by the Cortex XDR agent to detect and prevent the attack based on the technique. To help you understand the nature of the attack, the alert identifies the protection module the Cortex XDR agent employed.

The following table lists the modules and the platforms on which they are supported. A dash (—) indicates that the module is not supported.

| Module | Windows | Mac | Linux |
| --- | --- | --- | --- |
| **Anti-Ransomware** Targets encryption-based activity associated with ransomware and have the ability to analyze and halt ransomware activity before any data loss occurs. | ✓ | ✓ | — |
| **APC protection** Prevents attacks that change the execution order of a process by redirecting an asynchronous procedure call (APC) to point to the malicious shellcode. | ✓ | — | — |
| **Behavioral threat** Prevents sophisticated attacks that leverage built-in OS executables and common administration utilities by continuously monitoring endpoint activity for malicious causality chains. | ✓ | ✓ | ✓ |
| **Brute force protection** Prevents attackers from hijacking the process control flow by monitoring memory layout enumeration attempts. | — | — | ✓ |
| **Child process protection** Prevents script-based attacks that are used to deliver malware, such as ransomware, by blocking known targeted processes from launching child processes that are commonly used to bypass traditional security approaches. | ✓ | ✓ | ✓ |
| **Container escaping protection** Prevents container-escaping attempts | — | — | ✓ |
| **CPL protection** Protects against vulnerabilities related to the display routine for Windows Control Panel Library (CPL) shortcut images, which can be used as a malware infection vector. | ✓ | — | — |
| **Data Execution Prevention (DEP)** Prevents areas of memory defined to contain only data from running executable code. | ✓ | — | — |
| **DLL hijacking** Prevents DLL-hijacking attacks where the attacker attempts to load dynamic-link libraries on Windows operating systems from unsecured locations to gain control of a process. | ✓ | — | — |
| **DLL security** Prevents access to crucial DLL metadata from untrusted code locations. | ✓ | — | — |
| **Dylib hijacking** Prevents Dylib-hijacking attacks where the attacker attempts to load dynamic libraries on Mac operating systems from unsecured locations to gain control of a process. | — | ✓ | — |
| **Exploit kit fingerprint** Protects against the fingerprinting technique used by browser exploit kits to identify information: such as the OS or applications which run on an endpoint—that attackers can leverage when launching an attack to evade protection capabilities. | ✓ | — | — |
| **Font protection** Prevents improper font handling, a common target of exploits. | ✓ | — | — |
| **Gatekeeper enhancement** Enhances the macOS gatekeeper functionality that allows apps to run based on their digital signature. This module provides an additional layer of protection by extending gatekeeper functionality to bundles and child processes so you can enforce the signature level of your choice. | — | ✓ | — |
| **Hash exception** Halts execution of files that an administrator identified as malware regardless of the WildFire verdict. | ✓ | ✓ | ✓ |
| **Hot patch protection** Prevents the use of system functions to bypass DEP and address space layout randomization (ASLR). | ✓ | — | — |
| **Java deserialization** Blocks attempts to execute malicious code during the Java objects deserialization process on Java-based servers. | ✓ | — | ✓ |
| **JIT** Prevents an attacker from bypassing the operating system's memory mitigations using just-in-time (JIT) compilation engines. | ✓ | ✓ | — |
| **Kernel Integrity Monitor (KIM)** Prevents rootkit and vulnerability exploitation on Linux endpoints. On the first detection of suspicious rootkit behavior, the behavioral threat protection (BTP) module generates a Cortex XDR Agent alert. Cortex Cloud stitches logs about the process that loaded the kernel module with other logs relating to the kernel module to aid in the alert investigation. When the Cortex XDR agent detects subsequent rootkit behavior, it blocks the activity. | — | — | ✓ |
| **LDAP query protection** Analyzes and acts upon suspicious LDAP queries received by the Domain Controller, to detect and block Active Directory reconnaissance attacks. | ✓ | — | — |
| **Local analysis** Examines hundreds of characteristics of an unknown executable file, DLL, or macro to determine if it is likely to be malware. The local analysis module uses a static set of pattern-matching rules that inspect multiple file features and attributes, and a statistical model that was developed using machine learning on WildFire threat intelligence. | ✓ | ✓ | ✓ |
| **Local Threat Evaluation Engine (LTEE)** Protects against malicious PHP files arriving from the web server. | — | — | ✓ |
| **Local privilege escalation protection** Prevents attackers from performing malicious activities that require privileges that are higher than those assigned to the attacked or malicious process. | ✓ | ✓ | ✓ |
| **Malicious device protection** Protects your systems from unauthorized hardware attacks and malicious Human Interface Devices (HIDs) such as malicious USB devices. | — | ✓ | — |
| **Master Boot Record (MBR) Model** Protects against malicious Master Boot Record (MBR) manipulations. | ✓ | — | — |
| **Network packet inspection engine** Analyze network packet data to detect malicious behavior already at the network level. The engine leverages both Palo Alto Networks NGFW content rules, and new Cortex XDR content rules created by the Research Team which are updated through the security content. | ✓ | — | — |
| **Null dereference** Prevents malicious code from mapping to address zero in the memory space, making null dereference vulnerabilities unexploitable. | ✓ | — | — |
| **Restricted execution - local path** Prevents unauthorized execution from a local path. | ✓ | — | — |
| **Restricted execution - network location** Prevents unauthorized execution from a network path. | ✓ | — | — |
| **Restricted execution - removable media** Prevents unauthorized execution from removable media. | ✓ | — | — |
| **Reverse shell protection** Blocks malicious activity where an attacker redirects standard input and output streams to network sockets. | — | — | ✓ |
| **ROP** Protects against the use of return-oriented programming (ROP) by protecting APIs used in ROP chains. | ✓ | ✓ | ✓ |
| **SEH** Prevents hijacking of the structured exception handler (SEH), a commonly exploited control structure that can contain multiple SEH blocks that form a linked list chain, which contains a sequence of function records. | ✓ | — | — |
| **Shellcode protection** Reserves and protects certain areas of memory commonly used to house payloads using heap spray techniques. | — | — | ✓ |
| **ShellLink** Prevents shell-link logical vulnerabilities. | ✓ | — | — |
| **SO hijacking protection** Prevents dynamic loading of libraries from unsecured locations to gain control of a process. | — | — | ✓ |
| **SysExit** Prevents using system calls to bypass other protection capabilities. | ✓ | — | — |
| **UASLR** Improves or altogether implements ASLR (address space layout randomization) with greater entropy, robustness, and strict enforcement. | ✓ | — | — |
| **UEFI BTP** Reinforces the malware protection from pre-boot attacks. | ✓ | — | — |
| **Vulnerable drivers protection** Detect attempts to load vulnerable drivers. | ✓ | — | — |
| **WildFire** Leverages WildFire for threat intelligence to determine whether a file is malware. In the case of unknown files, Cortex XDR can forward samples to WildFire for in-depth analysis. | ✓ | ✓ | ✓ |
| **WildFire post-detection (malware and grayware)** Identifies a file that was previously allowed to run on an endpoint that is now determined to be malware. Post-detection events provide notifications for each endpoint on which the file is executed. | ✓ | ✓ | ✓ |

### Processes protected by exploit security policy

Application processes that run on your endpoint are protected by the exploit security policy.

By default, your exploit security profile protects endpoints from attack techniques that target specific processes. Each exploit protection capability protects a different set of processes that Palo Alto Networks researchers determine are susceptible to attack. The following tables display the processes that are protected by each exploit protection capability for each operating system.

| Windows processes protected by exploit security policy |
| --- |
| **Browser exploits protection** |
| [updated version of Adobe Flash Player for Firefox installed on endpoint]; browser_broker.exe; chrome.exe; firefox.exe | flashutil_activex.exe; iexplore.exe; microsoftedge.exe; microsoftedgecp.exe; opera_plugin_wrapper.exe | opera.exe; plugin-container.exe; safari.exe; webkit2webprocess.exe |
| **Logical exploits protection** |
| cliconfg.exe; dism.exe; dllhost.exe | excel.exe; migwiz.exe; mmc.exe | powerpnt.exe; sysprep.exe; winword.exe |
| **Known vulnerable processes protection** |
| 7z.exe; 7zfm.exe; 7zg.exe; acrobat.exe; acrord32.exe; acrord32info.exe; allplayer.exe; applemobiledeviceservice.exe; apwebgrb.exe; armsvc.exe; blazehdtv.exe; bsplayer.exe; cmd.exe; eqnedt32.exe; excel.exe; flashfxp.exe; fltldr.exe; fontdrvhost.exe; foxit reader.exe; foxitreader.exe; groovemonitor.exe; hxmail.exe; i_view32.exe; infopath.exe | ipodservice.exe; itunes.exe; ituneshelper.exe; journal.exe; jqs.exe; microsoft.photos.exe; msaccess.exe; mspub.exe; mstsc.exe; nginx.exe; notepad++.exe; nslookup.exe; outlook.exe; powerpnt.exe; pptview.exe; qttask.exe; quicktimeplayer.exe; rar.exe; reader_sl.exe; realconverter.exe; realplay.exe; realsched.exe; skype.exe; skypeapp.exe; skypehost.exe | SLMail.exe; soffice.exe; telnet.exe; unrar.exe; vboxservice.exe; vboxsvc.exe; vboxtray.exe; video.ui.exe; visio.exe; vlc.exe; vmware-authd.exe; vmware-hostd.exe; vmware-vmx.exe; vpreview.exe; vprintproxy.exe; wab.exe; w3wp.exe; winrar.exe; winword.exe; wireshark.exe; wmplayer.exe; wmpnetwk.exe; xpsrchvw.exe |
| **Operating system exploit protection** |
| ctfmon.exe; dllhost.exe; dns.exe; lsass.exe; msmpeng.exe | runtimebroker.exe; spoolsv.exe; svchost.exe; taskeng.exe | taskhost.exe; wmiprvse.exe; wmiprvse.exe; wwahost.exe |

| Mac processes protected by exploit security policy |
| --- |
| **Browser exploits protection** |
| com.apple.safariservices; com.apple.webkit.plugin; com.apple.webkit.plugin.64; com.apple.webkit.webcontent | firefox; firefox-bin; google chrome helper; google chrome | plugin-container; safari; seamonkey |
| **Logical exploits protection** |
| adobereader; app drive for google drive; app drop for dropbox; app for dropbox; app for facebook; app for google drive; app for googledocs; app for instagram; app for linkedin; app for youtube; com.apple.safariservices; com.apple.webkit.plugin; com.apple.webkit.plugin.64; com.apple.webkit.webcontent; document writer | firefox; firefox-bin; google chrome helper; google chrome; itunes helper; itunes; mail+ for yahoo; microsoft excel; microsoft outlook; microsoft powerpoint; microsoft remote desktop; microsoft word; miniwriterfree; parallels client; pdf reader pro free | pdf reader x; plugin-container; quicktime player; safari; seamonkey; slack; sonicwall mobile connect; textwrangler; vlc; vmware fusion services; vmware fusion; vpn shield; winmail.dat file viewer |
| **Known vulnerable processes protection** |
| adobereader; airmail; app drive for google drive; app drop for dropbox; app for dropbox; app for facebook; app for google drive; app for googledocs; app for instagram; app for linkedin; app for youtube; bbedit; c-lion; cisco anyconnect secure mobility client; com.apple.cloudphotosconfiguration | document writer; itunes helper; itunes; jump desktop; mail; mail+ for yahoo; messages; microsoft excel; microsoft outlook; microsoft powerpoint; microsoft remote desktop; microsoft word; miniwriterfree; parallels client; pdf reader pro free; pdf reader x | photos; photoshop; quickbooks; quicktime player; signal; slack; sonicwall mobile connect; telegram; textmate; textwrangler; thunderbird; vlc; vmware fusion services; vmware fusion; vpn shield; winmail.dat file viewer |

| Linux processes protected by exploit security policy |
| --- |
| **Known vulnerable processes protection** |
| anacron; apache2; authproxy; bluetoothd; charon; chronyd\*; couriertcpd; cron; crond; cupsd; cyrus_pop3d; danted; dhcpd; dovecot; exim; ftpd; httpd; ibserver; identd; lighttpd; java; kamailio \*chronyd is injected in some scenarios, depending on the OS. | mailman; master; mongod; mysqld; mysqld_safe; named; ndsd; nginx; nmbd; node; nscd; php; php5-fpm; pmmasterd; pop2d; pop3d; postgres; proftpd; qmgr; rpcbind; rsync | samba; saned; sendmail; sendmail.sendmail; smartd; smbd; snmpd; squid; squid3; starter; syslog-ng; tinyproxy; vsftpd; wickedd-dhcp4; wickedd-dhcp6; winbindd; xinetd |

### File Integrity Monitoring (FIM)

Learn about File Integrity Monitoring (FIM) capabilities in Cortex Cloud.

File Integrity Monitoring (FIM) serves as a security control designed to detect unauthorized or anomalous modifications to files and folders in the file system. Any change, such as, a new file being created or an existing file being modified, will trigger an event that is sent to the Cortex Platform.

Cortex XDR agent integrates FIM capabilities directly into its endpoint detection and response engine, enhancing the fidelity and actionable intelligence derived from file events. This also allows seamless deployment of FIM capabilities over workstations and servers with the XDR agent installed.

**Notice:**

FIM requires the Cortex Cloud Runtime Security add-on.

File Integrity Monitoring requires a Cortex XDR agent with version 8.9.0 and above. FIM capabilities can be enabled on the following platforms and environments. See [Where can I install Cortex XDR agent](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/Cortex-XDR-Compatibility-Matrix/Where-can-I-install-the-Cortex-XDR-agent) for full platform options.

| Platform | Available Implementation |
| --- | --- |
| Windows | Servers and workstations |
| Linux | User mode and Kernel mode |
| Kubernetes | Containerized environments \*\*Note:\*\* Google Kubernetes Engine (GKE) is currently not supported |

#### Configuration and implementation

FIM rules are used to define which files and folders should be monitored, and FIM rule groups are used to consolidate multiple FIM rules into a single entity.

Creating, modifying and viewing FIM rule groups and rules is be done in the Rule Groups page, located at the Inventory → Endpoints → File Integrity Monitoring menu.

First, a new rule group is created by choosing \+ New Group Add a new FIM rule group.

After defining the general settings of the group, set up FIM rules in the Rules section by selecting \+ Add rule with the following properties:

-   Description: a brief description of the rule and its purpose
    
-   Path: the path of the file or folder to be monitored. See the File and Folder path configuration section for more information.
    
-   Events To Monitor: type of events that should be monitored. Any will capture all events on the defined file path, Specific events allows the selection of specific event types as Delete, Create, Modify. When choosing Any, new types of events that may be added in the future will also be monitored.
    

Once created, a FIM rule group must be assigned to a specific File Integrity Monitoring extension profile. Apply File Integrity Monitoring profiles to your endpoint policies

**Note:**

It is recommended to create a policy that targets only the necessary files and folders.

#### Add a new FIM rule group

Create a new FIM rule group, then set up FIM rules in the Rules section by selecting \+ Add rule

1.  In Endpoints → File Integrity Monitoring → Rule groups, select +New Group.
    
2.  Fill in the General Settings.
    
    -   Assign a profile Name
        
    -   Add a brief Description to describe the rule group and its purpose.
        
    
3.  Select the Platform.
    
    -   For Linux, define the monitoring mode, Host or Containers
        
    
    **Note:**
    
    Platform cannot be changed once a rule group has been created
    
4.  For each rule add an optional description and the required path. Pay attention to the path restrictions and wildcard use shown below, File and Folder path configuration.
    
5.  Specify the events to monitor.
    
    -   Any will capture all events on the defined file path. New types of events that may be added in the future will also be monitored.
        
    -   Specific events allows the selection of the event types, Delete, Create, Modify.
        
    

**Note:**

A rule group can contain up to 100 rules.

#### Add a new FIM rule group profile

1.  In Inventory → Endpoints → Policy management → Extensions → Profiles, select +Add Profile and then select either Create New or Import from File.
    
2.  Select a Platform and click File Integrity Monitoring → Next.
    
3.  Fill in the General Information.
    
    Assign the profile Name and add an optional Description.
    
4.  Select the Platform. For Linux, define the monitoring mode, Host or Containers
    
5.  In FIM Rule Group Select +Manage Group.
    
    Select the required FIM Rule Groups.
    
6.  To save the FIM rule group definitions, click Create.
    
7.  It is allowed to add up to ten rule groups to a profile.
    

#### Apply File Integrity Monitoring profiles to your endpoint policies

After you define the required File Integrity Monitoring profiles, configure policies with File Integrity Monitoring and enforce them on your endpoints. Cortex Cloud applies File Integrity Monitoring policies on endpoints from beginning to end, as you’ve ordered them on the page. The first policy that matches the endpoint is applied. If no policies match, the default policy that enables all devices is applied.

1.  In Inventory → Endpoints → Policy management → Extensions → Policy Rules, select \+ New Policy or Import from File.
    
    **Note:**
    
    When importing a policy, select whether to enable the associated policy targets. Rules within the imported policy are managed as follows:
    
    -   New rules are added to the top of the list.
        
    -   Default rules override the default rule in the target tenant.
        
    -   Rules without a defined target are disabled until the target is specified.
        
    
2.  Configure settings for the File Integrity Monitoring policy.
    
    1.  Assign a policy name and select the platform. You can add a description.
        
    2.  Assign the File Integrity Monitoring profile you want to use in this rule.
        
    3.  Click Next.
        
    4.  Select the target endpoints on which to enforce the policy.
        
        Use filters or manual endpoint selection to define the exact target endpoints of the policy rules. If exists, the Group Name is filtered according to the groups within your defined user scope.
        
    5.  Click Done.
        
3.  Configure policy hierarchy.
    
    Drag the policies in the desired order of execution. The default policy that enables all devices on all endpoints is always the last one on the page and is applied to endpoints that don’t match the criteria in the other policies.
    
4.  Save the policy hierarchy.
    
    After the policy is saved and applied to the agents, Cortex Cloud enforces the File Integrity Monitoring policies on your environment.
    
5.  (Optional) Manage your policy rules.
    
    In the Prevention Policy Rules table, you can view and edit the policy you created and the policy hierarchy.
    
    1.  View your policy hierarchy.
        
    2.  Right-click to View Policy Details, Edit, Save as New, Disable, and Delete.
        
    3.  Select one or more policies, right-click and select Export Policies. You can choose to include the associated Policy Targets, Global Exceptions, and endpoint groups.
        

#### File and Folder path configuration

| Platform | Path restrictions |
| --- | --- |
| Windows | Must start with a valid root (e.g., C:\\ or \*\\); Has at least one valid segment or wildcard (asterisk) after each slash; Cannot end in a bare slash unless followed by a filename or wildcard (asterisk); Cannot contain invalid characters: < > : " | ? % \\; Cannot contain environment variables Example 15.  C:\\temp\\app.log (monitor a specific file); C:\\temp\\folder\\\* (monitor a folder and its content, recursively); \*\\app.config (monitor all files with a specific name in the file system)  
 |
| Linux | Must start with a valid root (/); Rules used to monitor folders must end with a forward slash (/); Wildcard (asterisk) is supported by regex, but only at the last element of the path (basename); Cannot contain invalid characters: < > : " | ? % \\; Cannot contain environment variables; Does not end with asterisk \* Example 16.  /tmp/sample.log (monitor a specific file); /tmp/folder/ (monitor a folder and its content, non-recursively); /tmp/folder/.\*\\.log (monitor all files with a specific suffix in a folder); /.\*\\.py (monitor all files with a specific suffix)  
 |

#### View File Integrity Monitoring events

After you apply File Integrity Monitoring rules in your environment, use the Inventory → Endpoints → File Integrity Monitoring page to monitor events. The most recent events are displayed on the page. You can sort the results and use the filters menu to narrow down the results.

Use XQL to view all FIM events by querying the ‘xdr_dataset’ with the filter ‘fim_event = TRUE’.

**Note:**

It is possible to ingest up to 15,000 events per day (24 hours) for each host/container.

### WildFire analysis concepts

Learn about the analysis concepts used by Wildfire.

#### File forwarding

Cortex Cloud sends unknown samples for in-depth analysis to WildFire. WildFire accepts up to 1,000,000 sample uploads per day and up to 1,000,000 verdict queries per day from each Cortex XDR tenant. The daily limit resets at 23:59:00 UTC. Uploads that exceed the sample limit are queued for analysis after the limit resets. WildFire also limits sample sizes to 300 MB. For more information, see the [WildFire documentation](https://docs.paloaltonetworks.com/wildfire.html).

For samples that the Cortex XDR agent reports, the agent first checks its local cache of hashes to determine if it has an existing verdict for that sample. If the Cortex XDR agent does not have a local verdict, the Cortex XDR agent queries Cortex Cloud to determine if WildFire has previously analyzed the sample. If the sample is identified as malware, it is blocked. If the sample remains unknown after comparing it against existing WildFire signatures, Cortex Cloud forwards the sample for WildFire analysis.

#### File type analysis

The Cortex XDR agent analyzes files based on the type of file, regardless of the file’s extension. For deep inspection and analysis, you can also configure your Cortex Cloud to forward samples to WildFire. A sample can be:

-   Any Portable Executable (PE) file including (but not limited to):
    
    -   Executable files
        
    -   Object code
        
    -   FON (Fonts)
        
    -   Microsoft Windows screensaver (.scr) files
        
    
-   Microsoft Office files containing macros opened in Microsoft Word (winword.exe) and Microsoft Excel (excel.exe):
    
    -   Microsoft Office 2003 to Office 2016—.doc and .xls
        
    -   Microsoft Office 2010 and later releases—.docm, .docx, .xlsm, and .xlsx
        
    
-   Dynamic-link library file including (but not limited to):
    
    -   .dll files
        
    -   .ocx files
        
    
-   Android application package (APK) files
    
-   Mach-o files
    
-   DMG files
    
-   Linux (ELF) files
    

For information on file-examination settings, see Set up malware prevention profiles.Set up malware prevention profiles

#### Verdicts

WildFire delivers verdicts to identify samples it analyzes as safe, malicious, or unwanted (grayware is considered obtrusive but not malicious):

-   **Unknown**: Initial verdict for a sample for which WildFire has received but has not analyzed.
    
-   **Benign**: The sample is safe and does not exhibit malicious behavior. If Low Confidence is indicated for the Benign verdict, Cortex Cloud can treat this hash as if the verdict is unknown and further run Local Analysis to get a verdict with higher confidence.
    
-   **Malware**: The sample is malware and poses a security threat. Malware can include viruses, worms, Trojans, Remote Access Tools (RATs), rootkits, botnets, and malicious macros. For files identified as malware, WildFire generates and distributes a signature to prevent future exposure to the threat.
    
-   **Grayware**: The sample does not pose a direct security threat but might display otherwise obtrusive behavior. Grayware typically includes adware, spyware, and Browser Helper Objects (BHOs).
    

**Note:**

In cases when the Cortex Cloud agent gets a failed status from the WF service due to a general error or unsupported file type, and the Local Analysis is set to disabled or not applicable, Cortex Cloud will not generate an alert on the file.

When WildFire is not available or integration is disabled, the Cortex XDR agent can also assign a local verdict for the sample using additional methods of evaluation: When the Cortex XDR agent performs local analysis on a file, it uses pattern-matching rules and machine learning to determine the verdict. The Cortex XDR agent can also compare the signer of a file with a local list of trusted signers to determine whether a file is malicious:

-   Local analysis verdicts:
    
    -   **Benign**: Local analysis determined the sample is safe and does not exhibit malicious behavior.
        
    -   **Malware**: The sample is malware and poses a security threat. Malware can include viruses, worms, Trojans, Remote Access Tools (RATs), rootkits, botnets, and malicious macros.
        
    
-   Trusted signer verdicts:
    
    -   **Trusted**: The sample is signed by a trusted signer.
        
    -   **Not Trusted**: The sample is not signed by a trusted signer.
        
    

#### Local verdict cache

The Cortex XDR agent stores hashes and the corresponding verdicts for all files that attempt to run on the endpoint in its local cache. The local cache scales in size to accommodate the number of unique executable files opened on the endpoint. On Windows endpoints, the cache is stored in the `C:\ProgramData\Cyvera\LocalSystem` folder on the endpoint. When service protection is enabled (see Set up agent settings profiles), the local cache is accessible only by the Cortex XDR agent and cannot be changed.Set up agent settings profiles

Each time a file attempts to run, the Cortex XDR agent performs a lookup in its local cache to determine if a verdict already exists. If known, the verdict is either the official WildFire verdict or manually set as a hash exception. Hash exceptions take precedence over any additional verdict analysis.

If the file is unknown in the local cache, the Cortex XDR agent queries Cortex Cloud for the verdict. If Cortex Cloud receives a verdict request for a file that was already analyzed, Cortex Cloud immediately responds to the Cortex XDR agent with the verdict.

If Cortex Cloud does not have a verdict for the file, it queries WildFire and optionally submits the file for analysis. While the Cortex XDR agent attempts to wait for an official WildFire verdict, it can use File analysis and protection flow to evaluate the file. After Cortex Cloud receives the verdict it responds to the Cortex XDR agent that requested the verdict.

For information on file-examination settings, see Set up malware prevention profiles.Set up malware prevention profiles

### Guidelines for keeping Cortex XDR agents and content updated

Learn more about how to control Cortex XDR agent and content upgrades.

This document covers a recommended strategy and best practices for managing agent and content updates to help reduce the risk of downtime in a production environment, while helping ensure timely delivery of security content and capabilities.

Keeping Cortex XDR agents up-to-date is essential for protecting against evolving threats and vulnerabilities. Regular updates ensure the latest security features for malware and exploit prevention, and compatibility with the latest software environments, which helps reduce the risk of attacks. This can also help organizations meet regulatory standards while maintaining strong overall protection.

Content updates, such as new threat intelligence or detection logic, are critical for defending against newly discovered cyber threats and malware and are designed to ensure that systems remain protected against the latest attacks. Content updates, released on a weekly basis, address compatibility issues as well, helping to achieve smooth operations alongside the Cortex XDR agent. Without regular content updates, security solutions may fail to detect new or evolving threats, leaving systems vulnerable to attacks.

The Cortex XDR agent can retrieve content updates immediately as they become available, or after a pre-configured delay period of up to 30 days. Alternatively, you can choose to select a specific version. In addition, to expedite testing and evaluation, the staging content provides a preview of the content update a week before its published GA.

**Important:**

When planning Cortex XDR agent upgrades and content updates, consult with the appropriate stakeholders and teams and follow the change management strategy in your organization.

Cortex Cloud can be configured to manage the deployment of agent and content updates by adjusting the following settings:

_AGENT UPGRADE SETTINGS_

**Agent settings per endpoint:**

-   **Agent Auto-Upgrade** is disabled by default. Before enabling agent auto-upgrade for Cortex XDR agents, make sure to consult with all relevant stakeholders in your organization. Enabling this option allows you to define the scope of the automatic updates, such as upgrading to the latest agent release, one release prior, only maintenance releases, or maintenance releases within a specific version.
    
-   **Upgrade Rollout** includes two options: Immediate, where the Cortex XDR agent automatically receives new releases, including maintenance updates and features, and Delayed, which lets you set a delay of 7 to 45 days after a version is released before upgrading endpoints.
    
-   **Agent Upgrade Scheduler** allows the upgrade task to be scheduled for specific days of the week and a specific time range.
    

**Global agent settings:** Configure the number of parallel upgrades to apply to all endpoints in your organization.

_CONTENT UPDATE SETTINGS_

**Content updates per endpoint:**

-   **Content Auto-Update** is enabled by default and automatically retrieves the latest content before deploying it on the endpoint. If you disable content updates, the agent will stop fetching updates from the Cortex Cloud tenant and will continue to operate with the existing content on the endpoint.
    
-   **Content Rollout:** The Cortex XDR agent can retrieve content updates immediately as they become available, after a pre-configured delay period of up to 30 days. Alternatively, you can choose to select a specific version. Utilize the staging content for early evaluation on test environments before the content is released to production.
    

**Global content updates:** Configure the content update cadence and bandwidth allocation within your organization. To enforce immediate protection against the latest threats, enable minor content updates. Otherwise, the content updates in your network occur only on major releases.

#### Guidelines for planning Cortex XDR agent upgrades

Use a phased rollout plan by creating batches for deploying updates. The specifics may vary based on your organization and its structure. Start with a control group, then deploy to 10% of your organization. Subsequently, allocate the remaining upgrades in batches that best suit your organization until achieving a full 100% rollout.

Example 17. 

The following is an example of a rollout plan for deploying a Cortex XDR agent upgrade:

**Phase 1: Control group rollout:** Start by selecting a control group of endpoints as early adopters. This group should consist of a diverse range of operating systems, devices, applications, and servers, with a focus on low-risk endpoints. After a defined testing period, such as one week, assess for any issues. If no problems are found, move to the next phase.

**Phase 2: 10% rollout:** Expand the rollout to 10% of the organization’s endpoints. This group should maintain the same variety as the control group but include low- to medium-risk endpoints. Monitor performance during the set period. If the rollout is successful with no issues, proceed to the next phase.

**Phase 3: 40% rollout:** After confirming the success of the 10% rollout, extend the deployment to 40% of the organization. Continue including a variety of endpoints while gradually incorporating some medium-risk endpoints. Ensure thorough testing during this phase before moving forward.

**Phase 4: 80% rollout:** Extend the deployment to 80% of the organization's endpoints. This batch should include a wide variety of endpoints, incorporating both medium and high-risk systems. After a careful monitoring period and confirmation that everything is stable, move to the final phase.

**Phase 5: Full rollout:** Complete the rollout by updating the remaining 20% of the organization’s endpoints. By this point, the majority of systems should have been thoroughly tested, reducing the risk of issues in the final stage. Once complete, 100% of the organization will be updated.

  

#### Guidelines for planning content updates

Content updates consist of detection rules and operational logic, and are typically released on a weekly basis. Staging content provides a preview of the content update a week before thepublished GA.

Use a phased rollout plan by creating batches for deploying updates. Start with a control group, then deploy to 10% of your organization. Subsequently, allocate the remaining upgrades in batches that best suit your organization until achieving a full 100% rollout.

For early evaluation, select a small test group or a lab environment for enabling the staging content preview.

Example 18. 

The following is an example of a rollout plan over a period of one week for deploying content updates:

**Phase 1: Control group rollout:** Keep the default configuration set to deploy content updates immediately.

**Phase 2: 10% rollout:** Content is automatically deployed on day 2 following a delay period defined in the profile.

**Phase 3: 60% rollout:** Content is automatically deployed on day 3 following a delay period defined in the profile.

**Phase 4: Full rollout:** Increase the deployment to include medium and high-risk systems, until the entire organization is updated.

  

#### How to configure agent and content update settings

The following information will help you select and configure the update settings.

##### Cortex XDR agent upgrades

Configure one or more of the settings described in this section to keep your Cortex XDR agents up-to-date.

Distribute agent upgrades to selected endpoints

1.  Create an agent installation package for each operating system version for which you want to upgrade the Cortex XDR agent.
    
    Note the installation package names.
    
2.  Select Inventory → Endpoints → All Endpoints.
    
    If needed, filter the list of endpoints. To reduce the number of results, use the endpoint name search and filters at the top of the page.
    
3.  Select the endpoints you want to upgrade.
    
    You can also select endpoints running different operating systems to upgrade the agents at the same time.
    
4.  Right-click your selection and select Endpoint Control → Upgrade Agent Version.
    
    For each platform, select the name of the installation package you want to push to the selected endpoints.
    
    You can install the Cortex XDR agent on Linux endpoints using a package manager. If you do not want to use the package manager, clear the option Upgrade to installation by package manager.
    
    When you upgrade an agent on a Linux endpoint that is not using a package manager, Cortex Cloud upgrades the installation process by default according to the endpoint Linux distribution.
    
    **Note:**
    
    The Cortex XDR agent keeps the name of the original installation package after every upgrade.
    
5.  Upgrade.
    
    Cortex Cloud distributes the installation package to the selected endpoints at the next heartbeat communication with the agent. To monitor the status of the upgrades, go to Investigation and Response → Response → Action Center.
    
    From the Action Center you can also view additional information about the upgrade (right-click the action and select Additional data) or cancel the upgrade (right-click the action and select Cancel Agent Upgrade).
    
    **Note:**
    
    -   Custom dashboards that include upgrade status widgets, and the All Endpoints page display upgrade status.
        
    -   During the upgrade process, the endpoint operating system might request a reboot. However, you do not have to perform the reboot for the Cortex XDR agent upgrade process to complete it successfully.
        
    -   After you upgrade on an endpoint with Cortex Cloud Device Control rules, you need to reboot the endpoint for the rules to take effect.
        
    

Agent settings per endpoint

**Note:**

These profiles can be configured on one or more endpoints, static/dynamic groups, tags, IP ranges, endpoint names, or other parameters that allow the creation of logical endpoint groups. See [how to define endpoint group](https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM/Cortex-XSIAM-Documentation/Define-endpoint-groups?tocId=3C79USa8cHopVLq9dxCMag).

1.  Go to Inventory → Endpoints → Policy Management → Profiles, and then edit an existing profile, add a new profile, or import from a file.
    
2.  If you're adding a new profile, select the operating system and Agent Settings. Then click Next.
    
    If you want to edit an existing profile, hover over Agent Settings for the operating system and click View Profile.
    
3.  Select Agent Upgrade. By default, this option is disabled.
    
    **Caution:**
    
    Before enabling Auto-Update for Cortex XDR agents, make sure to consult with all relevant stakeholders in your organization.
    

The following table describes the available Agent Auto-Upgrade options:

| Item | Options | Description |
| :-- | :-- | :-- |
| Automatic Upgrade Scope | Latest agent release (Default); One release before the latest one; Only maintenance releases; Only maintenance releases in a specific version | For One release before the latest one, Cortex Cloud upgrades the agent to the previous release before the latest, including maintenance releases. Major releases are numbered X.X, such as release 8.0, or 8.2. Maintenance releases are numbered X.X.X, such as release 8.2.2. For Only maintenance releases in a specific version, select the required release version. |
| Upgrade Rollout | Immediate (Default); Delayed | The Cortex XDR agent automatically fetches any new agent release, maintenance and new features. For Delayed, set the delay period (number of days) to wait after the version release before upgrading endpoints. Choose a value between 7 and 45. |
| Scheduling | Hours; Days of the week | Schedule the upgrade task for specific time and days of the week. |

Global agent settings

Configure the Cortex XDR agent upgrade scheduler and the number of parallel upgrades to apply to all endpoints in your organization.

1.  Go to Settings → Configurations → Agent Configurations, and scroll to Agent upgrade.
    
2.  Configure the Cortex XDR agent upgrade scheduler and the number of parallel upgrades.
    
    | Item | Description |
    | :-- | :-- |
    | Amount of parallel upgrades | During the first week of a new Cortex XDR agent release rollout, only a single batch of agents is upgraded. After that, auto-upgrades continue to be deployed across your network with the number of parallel upgrades as configured. Set the number of parallel agent upgrades, where the maximum is 500 agents. |
    

##### Content updates

When a new content update is available, Cortex Cloud notifies the Cortex XDR agent. The Cortex XDR agent then randomly chooses a time within a six-hour window during which it will retrieve the content update from Cortex Cloud. By staggering the distribution of content updates, Cortex Cloud reduces the bandwidth load and prevents bandwidth saturation due to the high volume and size of the content updates across many endpoints. You can view the distribution of endpoints by content update version from the dashboard.

You can configure whether to update content per endpoint or use the global settings.

Content update settings per endpoint

Configure content update options for agents within the organization to ensure it is always protected with the latest security measures.

**Note:**

These profiles can be configured on one or more endpoints, static/dynamic groups, tags, IP ranges, endpoint names, or other parameters that allow the creation of logical endpoint groups.

The following table describes the available Content Configuration options:

1.  Go to Inventory → Endpoints → Policy Management → Profiles, and then edit an existing profile, add a new profile, or import from a file.
    
2.  If you're adding a new profile, select the operating system and Agent Settings. Then click Next.
    
    If you want to edit an existing profile, hover over Agent Settings for the operating system and click View Profile.
    
3.  Select Content Configuration. By default, this option is Enabled.
    

| Item | Options | More details |
| :-- | :-- | :-- |
| Content Auto-Update | Enabled (Default); Disabled | When Content Auto-Update is enabled, the Cortex XDR agent retrieves the most updated content and deploys it on the endpoint. If you disable content updates, the agent stops retrieving them from the Cortex Cloud tenant, and keeps working with the current content on the endpoint. |
| Staging Content | Enabled; Disabled (Default) | Enable users to deploy agent staging content on selected test environments. Staging content is released before production content, allowing for early evaluation of the latest content update.  |
| Content Rollout | Immediate (Default); Delayed; Specific | The Cortex XDR agent can retrieve content updates immediately as they are available, after a pre-configured delay period of up to 30 days, or you can select a specific version. When you delay content updates, the Cortex XDR agent will retrieve the content according to the configured delay. For example, if you configure a delay period of two days, the agent will not use any content released in the last 48 hours. |

Global content update settings

1.  Go to Settings → Configurations → Agent Configurations, and scroll to Content Management.
    
2.  Configure the content update cadence and bandwidth allocation within your organization.
    
    | Item | Description |
    | :-- | :-- |
    | Enable bandwidth control | Based on the number of agents you want to update with content and upgrade packages, active or future agents, the Cortex Cloud calculator configures the recommended amount of Mbps (Megabits per second) required for a connected agent to retrieve a content update over a 24 hour period or a week. Cortex Cloud supports between 20 - 10000 Mbps, you can enter one of the recommended values or enter one of your own. For optimized performance and reduced bandwidth consumption, it is recommended that you install and update new agents with Cortex XDR agents 7.3 and later include the content package built in using SCCM. |
    | XDR Calculator for Recommended Bandwidth | Based on the number of agents you want to update with content and upgrade packages, active or future agents, the Cortex Cloud calculator configures the recommended amount of Mbps (Megabits per second) required for a connected agent to retrieve a content update over 24 hours or a week. This calculation is based on connected agents and includes an overhead for large content update. Cortex Cloud supports between 20 - 10000 Mbps. It is recommended to allocate a minimum of 20 Mbps, or you can enter a value. |
    | Enable minor content version updates | To enforce immediate protection against the latest threats, enable minor content updates. Otherwise, the content updates in your network occur only on major releases. |

### About content updates

To increase security coverage and quickly resolve any issues in policy, Palo Alto Networks can seamlessly deliver software packages called content updates.

To increase security coverage and quickly resolve any issues in policy, Palo Alto Networks can seamlessly deliver software packages for Cortex Cloud called content updates. Content updates can contain changes or updates to any of the following:

**Note:**

Cortex Cloud delivers the content update to the agent in parts and not as a single file, allowing the agent to retrieve only the updates and additions it needs.

-   Default security policy including exploit, malware, restriction, and agent settings profiles
    
-   Default compatibility rules per module
    
-   Protected processes
    
-   Local analysis logic
    
-   Trusted signers
    
-   Processes included in your block list by signers
    
-   Behavioral threat protection rules
    
-   Ransomware module logic including Windows network folders susceptible to ransomware attacks
    
-   Event Log for Windows event logs and Linux system authentication logs
    
-   Python scripts provided by Palo Alto Networks
    
-   Python modules supported in script execution
    
-   Maximum file size for hash calculations in File search and destroy
    
-   List of common file types included in File search and destroy
    
-   Network Packet Inspection Engine rules
    

When a new update is available, Cortex Cloud notifies the Cortex XDR agent. The Cortex XDR agent then randomly chooses a time within a six-hour window during which it will retrieve the content update from Cortex Cloud. By staggering the distribution of content updates, Cortex Cloud reduces the bandwidth load and prevents bandwidth saturation due to the high volume and size of the content updates across many endpoints. You can view the distribution of endpoints by content update version from the dashboard.

The Cortex Cloud research team releases more frequent content updates in-between major content versions to ensure your network is constantly protected against the latest and newest threats in the wild. When you enable minor content updates, the Cortex Cloud agent receives minor content updates, starting with the next content releases. Otherwise, if you do not wish to deploy minor content updates, your Cortex XDR agents will keep receiving content updates for major releases which usually occur on a weekly basis. The content version numbering format remains `XXX-YYYY`, where `XXX` indicates the version and `YYYY` indicates the build number. To distinguish between major and minor releases, XXX is rounded up to the nearest ten for every major release, and incremented by one for a minor release. For example, `1280-<build_num>` and `1290-<build_num>` are major releases, and `1281-<build_num>` , `1282-<build_num>`, and `1291-<build_num>` are minor releases.

To adjust content update distribution for your environment, you can configure the following optional settings:

-   Content management settings as part of the Cortex Cloud global agent configurations.
    
-   Content download source, as part of the Cortex Cloud agent setting profile.Set up agent settings profiles
    

Otherwise, if you want the Cortex XDR agent to retrieve the latest content from the server immediately, you can force the Cortex XDR agent to connect to the server using one of the following methods.

-   (Windows and Mac only) Perform manual check-in from the Cortex XDR agent console.
    
-   Initiate a check-in using the `Cytool checkin` command.

### Endpoint data collection

To aid in endpoint detection and issue investigation, the Cortex XDR agent collects endpoint information when an issue is generated.

When the Cortex XDR agent generates an issue on endpoint activity, a minimum set of metadata about the endpoint is sent to the server.

When you enable behavioral threat protection or EDR data collection in your endpoint security policy, the Cortex XDR agent can also continuously monitor endpoint activity for malicious event chains identified by Palo Alto Networks. The endpoint data that the Cortex XDR agent collects when you enable these capabilities varies by platform type.

#### Metadata collected for Cortex XDR agent issues

When the Cortex XDR agent generates an issue on endpoint activity, the following metadata is sent to the server:

| Field | Description |
| --- | --- |
| Absolute timestamp | Kernel system time |
| Relative timestamp | Uptime since the computer started |
| Thread ID | ID of the originating thread |
| Process ID | ID of the originating process |
| Process creation time | Part of the process unique ID per boot session (PID + creation time) |
| Sequence ID | Unique integer per boot session |
| Primary user SID | Unique identifier of the user |
| Impersonating user SID | Unique identifier of the impersonating user, if applicable |

#### EDR data collected for Windows endpoints

| Category | Events | Attributes |
| --- | --- | --- |
| Mount a device (volume and hardware) | Mount; Unmount | Storage device name; Storage device class GUID; Storage device class name; Storage device bus type; Storage device volume GUID; Storage device mount point; Storage device drive type; Storage device vendor ID; Storage device product ID; Storage device serial number; Storage device virtual volume image |
| Executable metadata | Process start | File size; File access time |
| Files | Create; Write; Delete; Rename; Move; Modification; Symbolic links; Read | Full path of the modified file before and after modification; SHA256 and MD5 hash for the file after modification; SetInformationFile for timestamps; File set security (DACL) information; Resolve hostnames on local network; Symbolic-link/hard-link and reparse point creation; File device type (regular file or Named Pipe) |
| Image (DLL) | Load | Full path; Base address; Target process-id/thread-id; Image size; Signature; SHA256 and MD5 hash for the DLL; File size; File access time |
| Process | Create; Terminate | Process ID (PID) of the parent process; PID of the process; Full path; Command line arguments; Integrity level to determine if the process is running with elevated privileges; Hash (SHA256 and MD5); Signature or signing certificate details |
| Thread | Injection | Thread ID of the parent thread; Thread ID of the new or terminating thread; Process that initiated the thread if from another process |
| Network | Accept; Connect; Create; Listen; Close; Bind | Source IP address and port; Destination IP address and port; Failed connection; Protocol (TCP/UDP); Resolve hostnames on local network |
| Network protocols | DNS request and UDP response; HTTP connect; HTTP disconnect; HTTP proxy parsing | Origin country; Remote IP address and port; Local IP address and port; Destination IP address and port if proxy connection; Network connection ID; IPv6 connection status (true/false); External hostname |
| Network statistics | On-close statistics; Periodic statistics | Upload volume on TCP link; Download volume on TCP link Traps sends statistics both when a connection is closed, and at periodic intervals while the connection remains open. |
| Registry | Registry value:- Deletion; Set ; Registry key:- Creation; Deletion; Rename; Addition; Modification (set information); Restore; Save \*\*Important:\*\* Registry key is collected as a real key name, and not as a symbolic link. Example 19. Instead of `HKEY_LOCAL_MACHINE\System\CurrentControlSet`, which is a symbolic link`, KEY_LOCAL_MACHINE\System\ControlSet001` will be collected. Example 20. Instead of `HKEY_CURRENT_USER`, `HKEY_USERS\<SID>` will be collected, where SID is a SID of the current user. | Registry path of the modified value or key; Name of the modified value or key; Data of the modified value |
| Session | Log on; Log off; Connect; Disconnect | Interactive log-on (log-on at a computer console using credentials such as a username and password); Session ID; Session State (equivalent to the event type); Local (physically on the computer) or remote (connected using a terminal services session) |
| Host status | Boot; Suspend; Resume | Host name; OS Version; Domain; Previous and current state |
| Agent status | Agent start |  |
| User presence | User Detection | Detection when a user is present or idle per active user session on the computer. |
| RPC calls | RpcCall; RpcPreCall | action_rpc_interface_uuid; action_rpc_interface_version_major; action_rpc_interface_version_minor; action_rpc_func_opnum; action_rpc_func_str_call_fields (optional); action_rpc_func_int_call_fields (optional); action_rpc_interface_name; action_rpc_func_name |
| System calls | Syscall types change frequently, and can be observed in each event's data. | action_syscall_string_params; action_syscall_int_params; action_syscall_target_instance_id; action_syscall_target_image_path; action_syscall_target_image_name; action_syscall_target_os_pid; action_syscall_target_thread_id; address_mapping |
| Event log | See the table below for the list of Windows Event Logs that can be sent to the server. |
| .Net events | .NET DLL Loaded; .NET DLL Loaded From Buffer; Amsi Bypass Attempt; Suspicious .NET To Win32 Calls; .NET To Native Shellcode Execution Attempt; Malicious C# Compilation and Execution Attempt; Powershell Script Execution; Obfuscated Powershell Execution Attempt; Deserialization Exploit Attempt; Webshell Execution Attempt; Suspicious ASPX execution; Exchange Vulnerability Attempt; SharePoint JWT Vulnerability Attempt | DotNetCommon_DotnetCallstack; DotNetCommon_CLRVersion; DotNetCommon_ContentVersion; DotNetCommon_EdrAssemblyVersion; DotNetCommon_AppDomainId; Other attributes may be added, depending on the event type and context. |

#### Windows event logs collected for Windows endpoints

Cortex XDR agents can send the following Windows Event Logs to the tenant.

For more information on how to set up Windows event logs collection, see Microsoft Windows security auditing setup.Microsoft Windows security auditing setup

| Path | Provider | Event IDs and Description |
| --- | --- | --- |
| Application | EMET |  |
| Application | Windows Error Reporting | Only for Windows Error Reporting (WER) events when an application stops unexpectedly |
| Application | Microsoft-Windows-User Profiles Service | **1511**: A user logged on with a temporary profile because Windows could not find the user's local profile.; **1518**: A profile could not be created using a temporary profile |
| Application | Application Error | **1000**: Application unexpected stop/hang events, similar to WER/1001. These events include the full path to the EXE file, or to the module with the fault. |
| Application | Application Hang | **1002**: Application unexpected stop/hang events, similar to WER/1001. These events include the full path to the EXE file, or to the module with the fault. |
| Microsoft-Windows-LDAP-client |  | **30**: Windows Event Collector (WEC) recommended event |
| Microsoft-Windows-CAPI2/Operational |  | Windows CAPI2 logging events: **11**: Build Chain; **70**: A Private Key was accessed; **90**: X509 object |
| Microsoft-Windows-DNS-Client/Operational |  | **3008**: A DNS query was completed without local machine name resolution events, and without empty name resolution events. |
| Microsoft-Windows-DriverFrameworks-UserMode/Operational |  | **2004**: Detection of User-Mode drivers loading, for potential BadUSB detection |
| Microsoft-Windows-PowerShell/Operational |  | **4103**: Block an activity; **4104**: Remote command; **4105**: Start command; **4106**: Stop command |
| Microsoft-Windows-PrintService | Microsoft-Windows-PrintService |  |
| Microsoft-Windows-TaskScheduler/Operational | Microsoft-Windows-TaskScheduler | **106, 129, 141, 142, 200, 201** |
| Microsoft-Windows-TerminalServices-RDPClient/Operational |  | **1024**: A terminal service (TS) attempted to connect to a remote server |
| Microsoft-Windows-Windows Defender/Operational |  | **1006**: Microsoft Defender Antivirus detected suspicious behavior; **1009**: Microsoft Defender Antivirus restored an item from quarantine |
| Microsoft-Antimalware-Scan-Interface |  | **1101**: Anti-Malware Scan Interface (AMSI) content scan event |
| Microsoft-Windows-Windows Defender/Operational |  | **1116**: Microsoft Defender Antivirus detected malware or other potentially unwanted software; **1119**: Microsoft Defender Antivirus encountered a critical error when taking action on malware or other potentially unwanted software |
| Microsoft-Windows-Windows Firewall With Advanced Security/Firewall | Microsoft-Windows-Windows Firewall With Advanced Security | **2004, 2005, 2006, 2009, 2033**: Windows Firewall With Advanced Security Local Modifications (Levels 0, 2, 4) |
| Security |  | **1102**: The Security log cleared events |
| Security | Microsoft-Windows-Eventlog | Event log service events specific to the Security channel |
| Security |  | **4880**: Certificate Authority Service stopped; **4881**: Certificate Authority Service started; **4896**: Certificate Authority database rows were deleted; **4898**: A Certificate Authority template was loaded |
| Security |  | Routing and Remote Access Service (RRAS) events (these are only generated on Microsoft IAS server) **6272**: User access was granted.; **6280**: User account unlocked |
| Security | Microsoft-Windows-Security-Auditing | **4624**: Successful logon; **4625**: Failed logon; **4634**: Logoff; **4647**: User initiated logoff; **4648**: Logon attempted, explicit credentials; **4649**: Replay attack; **4672**: Special privileges attempted login; **4768**: Kerberos TGT request; **4769**: Kerberos service ticket requested; **4770**: Kerberos service ticket renewal; **4771**: Kerberos pre-authentication failed; **4776**: Domain controller validation attempt; **4778**: Session was reconnected to a Windows station; **4800**: Workstation locked; **4801**: Workstation unlocked; **4802**: Screensaver was invoked; **4803**: Screensaver was dismissed |
| Security | Microsoft-Windows-Security-Auditing | **4720**: A user account was created; **4722**: A user account was enabled; **4723**: An attempt was made to change an account's password; **4724**: An attempt was made to reset an account’s password; **4725**: A user account was disabled; **4726**: A user account was deleted; **4727, 4731, 4754**: Creation of Groups; **4728, 4732, 4756**: Group member additions; **4729, 4733, 4757**: Group member removals; **4735, 4737, 4755, 4764**: Group changes; **4738**: A user account was changed; **4740**: A user account was locked out; **4741**: A computer account was created; **4742**: A computer account was changed; **4743**: A computer account was deleted; **4765, 4766**: SID history; **4767**: A user account was unlocked; **4780**: ACL set on accounts; **4781**: The name of an account was changed; **4799**: Group membership enumeration |
| Security | Microsoft-Windows-Security-Auditing | **4616**: System time was changed; **4821**: Kerberos service ticket was denied; **4822, 4823**: New Technology LAN Manager (NTLM) authentication failed; **4824**: Kerberos pre-authentication failed; **4825**: A user was denied access to Remote Desktop; **5058**: Key file operation; **5059**: Key migration operation |
| Security | Microsoft-Windows-Security-Auditing | **4698**: A scheduled task was created; **4702**: A scheduled task was updated; **4886**: Certificate Services received a certificate request; **4887**: Certificate Services approved a certificate request; **4899**: A Certificate Services template was updated; **4900**: Certificate Services template security was updated; **5140**: A network share object was accessed |
| Security | Microsoft-Windows-Security-Auditing | **4713**: Kerberos policy was changed on a domain controller |
| Security | Microsoft-Windows-Security-Auditing | **4662**: An operation was performed on an Active Directory object |

#### EDR data collected for Mac endpoints

| Category | Events | Attributes |
| --- | --- | --- |
| Files | Create; Write; Delete; Rename; Move; Open | Full path of the modified file before and after modification; SHA256 and MD5 hash for the file after modification |
| Process | Start; Stop | Process ID (PID) of the parent process; PID of the process; Full path; Command line arguments; Integrity level to determine if the process is running with elevated privileges; Hash (SHA256 and MD5); Signature or signing certificate details |
| Network | Accept; Connect; Connect Failure; Disconnect; Listen; Statistics | Source IP address and port; Destination IP address and port; Failed connection; Protocol (TCP/UDP); Aggregated send/receive statistics for the connection |
| Event log | Authentication | Provider Name; Data fields; Message |

#### EDR data collected for Linux endpoints

| Category | Events | Attributes |
| --- | --- | --- |
| Files | Create; Open; Write; Delete | Full path of the file; Hash of the file \*\*Note:\*\* For specific files only and only if the file was written. |
| Copy; Move (rename) | Full paths of both the original and the modified files | | Change owner (chown); Change mode (chmod) | Full path of the file; Newly set owner/attributes |
| Network | Listen; Accept; Connect; Connect failure; Disconnect | Source IP address and port for explicit binds; Destination IP address and port; Failed TCP connections; Protocol (TCP/UDP) |
| Process | Start | PID of the child process; PID of the parent process; Full image path of the process; Command line of the process; Hash of the image (SHA256 & MD5) |
| Stop | PID of the stopped process |
| Event log | Authentication | Provider Name; Data fields; Message |

## Install and manage endpoints

Learn how to set up profiles, policies and other settings for endpoint protection, how to install Cortex XDR agent on endpoints, and how to manage them after installation.

Endpoint protection starts with the Cortex XDR agent that is installed on each endpoint in your environment. The agent package that you install on endpoints contains many settings that are configured by default, out-of-the-box, to enable you to get protection up and running quickly. However, these settings can also be modified and used in different combinations, by using profiles, which are then mapped to policies, and by configuring global settings.

Several endpoint management tasks can be performed remotely by administrators, from Cortex Cloud. These include tasks such as applying tags and aliases to endpoints, upgrading the Cortex XDR agent, uninstalling and deleting the Cortex XDR agent, and more.

To stay up to date with the latest policy and endpoint status, Cortex Cloud communicates regularly with your Cortex XDR agents. For example, when you upgrade your endpoints to the latest release, Cortex Cloud creates an installation package and distributes it to the agent on their next communication. Similarly, the agent can send back data from the endpoint to Cortex Cloud, such as data gathered on the endpoint or tech support files. In Cortex Cloud, there are two types of communication.

### Set up endpoint protection

Set up endpoint protection profiles and policies, exceptions, endpoint hardening, and other endpoint settings.

Set up endpoint protection profiles and policies, exceptions, endpoint hardening, and other endpoint settings.

#### Set up endpoint profiles and exception rules

Endpoint security profiles can be used immediately, or customized, to protect your endpoints from threats.

Cortex Cloud provides default security profiles that you can use out-of-the-box to immediately begin protecting your endpoints from threats. These profiles are applied to endpoints by mapping them to policies, and then mapping the policies to endpoints.

While security rules enable you to block or allow files to run on your endpoints, security profiles help you customize and reuse settings across different groups of endpoints. When the Cortex XDR agent detects behavior that matches a rule defined in your security policy, the Cortex XDR agent applies the security profile that is attached to the rule for further inspection.

**Note:**

Profiles associated with one or more targets that are beyond the scope of your defined user permissions are locked, and cannot be edited.

##### Set up malware prevention profiles

Configure malware prevention profiles to control the actions taken by Cortex XDR agents when known malware, macros, and unknown files try to run.

Malware prevention profiles protect against the execution of malware including trojans, viruses, worms, and grayware. Malware prevention profiles serve two main purposes: to define how to treat behavior common with malware, such as ransomware or script-based attacks, and to define how to treat known malware and unknown files.

You can configure the action that Cortex XDR agents take when known malware, macros, and unknown files try to run on endpoints. By default, the Cortex XDR agent will receive the default profile that contains a pre-defined configuration for each malware protection capability supported by the platform. The default setting for each capability is shown in parentheses in the user interface. To fine-tune your malware prevention policy, you can override the configuration of each capability to block the malicious behavior or file, allow but report it, or disable the module.

For each setting that you override, clear the Use Default option, and select the setting of your choice.

**Note:**

In this profile, the Report options configure the endpoints to report the corresponding suspicious files, actions, processes, or behaviors to Cortex Cloud, without blocking them. The Disabled options configure the endpoints to neither analyze nor report the corresponding malware or behavior.

The tasks below are organized according to the operating systems used by your organization's endpoints.

###### Windows

1.  Add a new profile and define basic settings.
    
    1.  From Cortex Cloud, select Inventory → Endpoints → Policy Management → Prevention → Profiles. Click +Add Profile, and select whether to create a new profile, or to import a profile from a file.
        
        **Note:**
        
        New profiles based on imported profiles are added, and do not replace existing ones.
        
    2.  Select the Windows platform, and Malware as the profile type.
        
    3.  Click Next.
        
    4.  For Profile Name, enter a unique name for the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name will be visible from the list of profiles when you configure a policy rule.
        
    5.  For Description, to provide additional context for the purpose or business reason for creating the profile, enter a profile description. For example, you might include a case identification number or a link to a help desk ticket.
        
2.  Configure Portable Executable and DLL Examination. The Cortex XDR agent can analyze and prevent malicious executable files and DLL files from running on Windows endpoints.
    
    **Note:**
    
    As part of the anti-malware security flow, the Cortex XDR agent leverages the operating system's capability to identify revoked certificates for executables, and DLL files that attempt to run on the endpoint by accessing the Windows Certificate Revocation List (CRL). To allow the Cortex XDR agent access the CRL, you must enable internet access over port 80 for Windows endpoints. If the endpoint is not connected to the internet, or you experience delays with executables and DLLs running on the endpoint, contact Customer Support.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to run malware, it performs the configured action. |
    | Quarantine Malicious Executables | Disabled; Quarantine WildFire malware verdict; Quarantine WildFire and Local Analysis malware verdict | By default, the Cortex XDR agent blocks malware from running, but does not quarantine the file. You can enable one of the options to quarantine files, depending on the verdict issuer. \*\*Note:\*\* The Quarantine Malicious Executables feature is not available for malware identified on network drives. |
    | Action when file is unknown to WildFire | Allow; Run Local Analysis; Block | **Allow**: Unknown files are not blocked and local verdicts are not issued for them. **Run Local Analysis**: The Cortex XDR agent uses embedded machine learning to determine the likelihood that an unknown file is malware, and issues a local verdict for the file. **Block**: Block unknown files but do not run local analysis. In this case, unknown files remain blocked until the Cortex XDR agent receives an official WildFire verdict. |
    | Action when file is benign with low confidence | Allow; Run Local Analysis; Block | Select the action to take when a file with a Benign Low Confidence verdict from WildFire tries to run on the endpoint. When local analysis is enabled, the Cortex XDR agent uses embedded machine learning to determine the likelihood that an unknown file is malware, and issues a local verdict for the file. If you block this file but do not run a local analysis, the file remains blocked until the Cortex XDR agent receives a high-confidence WildFire verdict. To enable this capability, ensure that WildFire analysis scoring is also enabled in Global Agent Settings. \*\*Warning:\*\* For optimal user experience, we recommend that you set the action mode to either Allow or Run Local Analysis. |
    | Upload unknown files to WildFire | Enabled; Disabled | When enabled, the Cortex XDR agent sends unknown files to Cortex Cloud, and Cortex Cloud sends the files to WildFire for analysis. The file types that the Cortex XDR agent analyzes depend on the platform type. WildFire accepts files up to 300 MB in size. |
    | Treat Grayware as Malware | Enabled; Disabled | When enabled, Cortex Cloud treats all grayware with the same Action Mode as configured for malware. When disabled, grayware is considered benign, and is not blocked. |
    
3.  Configure options for Office Files with Macros Examination. The Cortex XDR agent can analyze and prevent malicious macros embedded in Microsoft Office files (Word, Excel) from running on Windows endpoints.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to run malware, it performs the configured action. |
    | Action when file is unknown to WildFire | Allow; Run Local Analysis; Block | Select the action to take when a file is not recognized by WildFire. When local analysis is enabled, the Cortex XDR agent uses embedded machine learning to determine the likelihood that an unknown file is malware, and issues a local verdict for the file. If you block unknown files, but do not run local analysis, unknown files remain blocked until the Cortex XDR agent receives an official WildFire verdict. |
    | Action when WildFire verdict is Benign Low Confidence | Allow; Run Local Analysis; Block | Select the action to take when a file with a Benign Low Confidence verdict from WildFire tries to run on the endpoint. When local analysis is enabled, the Cortex XDR agent uses embedded machine learning to determine the likelihood that an unknown file is malware, and issues a local verdict for the file. If you block this file but do not run a local analysis, the file remains blocked until the Cortex XDR agent receives a high-confidence WildFire verdict. To enable this capability, ensure that WildFire analysis scoring is also enabled in Global Agent Settings. \*\*Warning:\*\* For optimal user experience, we recommend that you set the action mode to either Allow or Run Local Analysis. |
    | Upload unknown files to WildFire | Enabled; Disabled | When enabled, the Cortex XDR agent sends unknown files to Cortex Cloud, and Cortex Cloud sends the files to WildFire for analysis. For macro analysis, the Cortex XDR agent sends the Microsoft Office file containing the macro. The file types that the Cortex XDR agent analyzes depend on the platform type. WildFire accepts files up to 300 MB in size. |
    | Examine Office files from network drives | Enabled; Disabled | You can enable the Cortex XDR agent to examine Microsoft Office files on network drives when they contain a macro that attempts to run. |
    
4.  Configure JScript File Examination to protect endpoints from JScript-based attacks by detecting and preventing malicious JScript files from being executed or written to disk.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to run malware, it performs the configured action. |
    | Quarantine Malicious Script Files | Disabled; Quarantine WildFire malware verdict; Quarantine WildFire and Local Analysis malware verdict | By default, the Cortex XDR agent blocks malware from running, but does not quarantine the file. You can enable one of the options to quarantine files, depending on the verdict issuer. |
    | Action when file is unknown to WildFire | Allow; Run Local Analysis; Block | **Allow**: Unknown files are not blocked and local verdicts are not issued for them. **Run Local Analysis**: The Cortex XDR agent uses embedded machine learning to determine the likelihood that an unknown file is malware, and issues a local verdict for the file. **Block**: Block unknown files but do not run local analysis. In this case, unknown files remain blocked until the Cortex XDR agent receives an official WildFire verdict. |
    | Upload unknown files to WildFire | Enabled; Disabled | When enabled, the Cortex XDR agent sends unknown files to Cortex Cloud, and Cortex Cloud sends the files to WildFire for analysis. The file types that the Cortex XDR agent analyzes depend on the platform type. WildFire accepts files up to 300 MB in size. |
    
5.  Configure PowerShell Script Files to analyze and prevent malicious PowerShell script files from running on Windows-based endpoints.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to run malicious PowerShell script files, it performs the configured action. |
    | Quarantine Malicious Script Files | Disabled; Quarantine WildFire malware verdict; Quarantine WildFire and Local Analysis malware verdict | By default, the Cortex XDR agent blocks malware from running, but does not quarantine the file. You can enable one of the options to quarantine files, depending on the verdict issuer. \*\*Note:\*\* The Quarantine Malicious Script Files feature is not available for malware identified on network drives. |
    | Action when file is unknown to WildFire | Allow; Run Local Analysis; Block | **Allow**: Unknown files are not blocked and local verdicts are not issued for them. **Run Local Analysis**: The Cortex XDR agent uses embedded machine learning to determine the likelihood that an unknown file is malware, and issues a local verdict for the file. **Block**: Block unknown files but do not run local analysis. In this case, unknown files remain blocked until the Cortex XDR agent receives an official WildFire verdict. |
    | Upload unknown files to WildFire | Enabled; Disabled | When enabled, the Cortex XDR agent sends unknown files to Cortex Cloud, and Cortex Cloud sends the files to WildFire for analysis. The file types that the Cortex XDR agent analyzes depend on the platform type. WildFire accepts files up to 300 MB in size. |
    
6.  For On-Write File Examination settings, configure the actions that Cortex Cloud should take during the on-write process for various file types.
    
    **Note:**
    
    -   If on-write actions were configured in earlier versions of Cortex Cloud, the same configuration has been preserved and applied globally for all file types.
        
    -   On-write file protection may have an impact on the resources required by the Cortex XDR agent.
        
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Portable Executable and DLL Examination | Enabled; Disabled | When a file type is enabled, the Cortex XDR agent monitors for malicious files during the on-write process, and if it finds any, it generates issues and quarantines the files. |
    | Office files with macros | Enabled; Disabled |
    | PowerShell script files | Enabled; Disabled |
    | ASP & ASPX files | Enabled; Disabled |
    | VBScript files | Enabled; Disabled |
    | JScript files | Enabled; Disabled |
    
7.  Configure ASP & ASPX Files to analyze and prevent malicious ASP and ASPX files from being written to the file system. If you want to enable this capability, enable On-write File Examination.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to write malicious ASP and ASPX files, it performs the configured action. When Action Mode is set to Block, quarantine is enabled. |
    | Action when file is unknown to WildFire | Allow; Run Local Analysis; Block | **Allow**: Unknown files are not blocked and local verdicts are not issued for them. **Run Local Analysis**: The Cortex XDR agent uses embedded machine learning to determine the likelihood that an unknown file is malware, and issues a local verdict for the file. **Block**: Block unknown files but do not run local analysis. In this case, unknown files remain blocked until the Cortex XDR agent receives an official WildFire verdict. |
    | Upload unknown files to WildFire | Enabled; Disabled | When enabled, the Cortex XDR agent sends unknown files to Cortex Cloud, and Cortex Cloud sends the files to WildFire for analysis. The file types that the Cortex XDR agent analyzes depend on the platform type. WildFire accepts files up to 300 MB in size. |
    
8.  Configure On-demand File Examination to scan endpoints and attached removable drives for dormant, inactive malware.
    
    **Note:**
    
    On-demand file protection may have an impact on the resources required by the Cortex XDR agent.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | End-User Initiated Local Scan | Enabled; Disabled | When enabled, the endpoint user can perform a local scan on the endpoint. |
    | Periodic Scan | Enabled; Disabled | \*\*Note:\*\* We recommend that you disable scheduled scanning. VDI machine scans are based on the golden image and additional files will be examined upon execution. Periodic scanning enables you to scan endpoints on a recurring basis without waiting for malware to run on the endpoint. When enabled, you can set the time interval (weekly or monthly) and the day and time at which to start scanning. In addition, you can choose to enable or disable scanning of removable media drives. Periodic scanning is persistent, and if the scan is scheduled to start while the endpoint is turned off, the scan will be initiated when the endpoint is turned on again. The scheduling of future scans is not affected by this delay. \*\*Note:\*\* When periodic scanning is enabled in your profile, the Cortex XDR agent initiates an initial scan when it is first installed on the endpoint, regardless of the periodic scanning scheduling time. |
    
9.  Configure VB Scripts Examination to analyze and prevent malicious VB script files from running.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to run malicious VB script files, it performs the configured action. |
    | Quarantine Malicious Files | Disabled; Quarantine WildFire malware verdict; Quarantine WildFire and Local Analysis malware verdict | The Cortex XDR agent can quarantine VB script files that WildFire or local analysis determine are malware. When disabled, the Cortex XDR agent does not quarantine malicious VB script files. |
    | Action when file is unknown to WildFire | Allow; Run Local Analysis; Block | **Allow**: Unknown files are not blocked and local verdicts are not issued for them. **Run Local Analysis**: The Cortex XDR agent uses embedded machine learning to determine the likelihood that an unknown file is malware, and issues a local verdict for the file. |
    | Upload unknown files to WildFire | Enabled; Disabled | When enabled, the Cortex XDR agent sends unknown files to Cortex Cloud, and Cortex Cloud sends the files to WildFire for analysis. The file types that the Cortex XDR agent analyzes depend on the platform type. WildFire accepts files up to 300 MB in size. |
    
10.  Configure LDAP Protection to analyze and act upon suspicious LDAP queries sent by the agent to a Domain Controller. This feature is designed to detect and block Active Directory reconnaissance attacks.
     
     **Notice:**
     
     Requires the ITDR add-on.
     
     **Note:**
     
     This feature only comes into effect after a restart.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects suspicious attempts to query a Domain Controller, it performs the configured action. |
     | Monitor and Collect Domain Controller LDAP Events | Enabled; Disabled | When set to Enabled, the Cortex XDR agent collects information about LDAP queries and creates events for them. These events can be used investigate suspicious LDAP queries. |
     
11.  Configure the Global Behavioral Threat Protection Rules. Use these rules to protect endpoints from malicious causality chains.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | The Cortex XDR agent protects against malicious causality chains, using behavioral threat protection rules. When the action mode is set to Block, the Cortex XDR agent terminates all processes and threads in the event chain up to the causality group owner (CGO). |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the processes and the artifacts, such as files, related to the CGO. When disabled, the Cortex XDR agent does not quarantine the CGO of an event chain, nor any scripts or files called by the CGO. |
     | Action Mode for Vulnerable Drivers Protection | Block; Report; Disabled | Behavioral threat protection rules can also detect attempts to load vulnerable drivers which can be used to bypass the Cortex XDR agent. As with other rules, Palo Alto Networks threat researchers can deliver changes to vulnerable driver rules with content updates. |
     | Advanced API Monitoring | Enabled; Disabled | When enabled, the Cortex XDR agent adds additional hooks in user mode processes for increased coverage of anti-exploit and anti-malware modules. |
     
12.  Configure Credential Gathering Protection to protect endpoints from processes trying to access or steal passwords and other credentials.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | The Cortex XDR agent protects against all processes and threads in the event chain up to the credential gathering process or file. When this module is disabled, the Cortex XDR agent does not analyze the event chain and does not block credential gathering. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the process or file related to the credential gathering event chain. |
     
13.  Configure Anti Webshell Protection to protect endpoint processes from dropping malicious web shells.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | In a causality chain, when the Cortex XDR agent detects a process that attempts to drop malicious web shells, it performs the configured action. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the processes or files that are related to the web shell drop event chain, and any scripts or files called by the web shell dropping process. |
     
14.  Configure Financial Malware Threat Protection to protect against techniques specific to financial and banking malware.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | In a causality chain, when the Cortex XDR agent detects a process that attempts to access or steal financial or banking information, the Cortex XDR agent performs the configured action. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the processes or files related to the financial information gathering event chain, and scripts or files called by the financial information gathering process. |
     | Crypto Wallet Protection | Enabled; Disabled | When enabled, provides protection for cryptocurrency wallets that are stored on endpoints. Cryptocurrency wallets store private keys that are used to access crypto assets. |
     
15.  Configure Cryptominers Protection to protect against attempts to locate or steal cryptocurrencies.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | In a causality chain, when the Cortex XDR agent detects a cryptomining process or file, the Cortex XDR agent performs the configured action. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the process or file detected during a cryptocurrency gathering attempt. |
     
16.  Configure In-process shellcode protection to protect against in-process shellcode attack threats.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | In a causality chain, when the Cortex XDR agent detects a process that attempts to run in-process shellcodes to load malicious code, the Cortex XDR agent performs the configured action. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the in-process shellcode processes or files related to a causality chain. |
     | Process Injection 32 Bit | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines 32 bit in-process shellcode processes or files related to a causality chain. Process injection 32 bit is set to Enabled by default for all new tenants created after 25 June 2023. For tenants created before this date, the default was set to Disabled. |
     | Shellcode AI Protection | Enabled; Disabled | When enabled, Precision AI-based detection rules use machine learning to detect and prevent in-memory shellcode attacks.When enabled, Precision AI-based detection rules use machine learning to detect and prevent in-memory shellcode attacks. |
     
17.  Configure Malicious Device Prevention to protect against the connection of potentially malicious devices to endpoints.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects the connection of potentially malicious external device to an endpoint, the Cortex XDR agent performs the configured action. |
     
18.  Configure UAC Bypass Prevention to protect against the User Access Control (UAC) bypass mechanism that is associated with privilege elevation attempts.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects a UAC bypass mechanism, the Cortex XDR agent performs the configured action. The Block option blocks all processes and threads in the event chain up to the UAC bypass mechanism. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the UAC bypass processes or files related to the chain, and any scripts or files released to the UAC bypass mechanism. |
     
19.  Configure Anti Tampering Protection to protect against tampering attempts.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects a tampering attempt, including modification and/or termination of the Cortex XDR agent, it performs the configured action. If you choose the Block option, you must also enable XDR Agent Tampering Protection in the Agent Settings profile, and ensure that both profiles are assigned to the same endpoints. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the processes or files that are related to the tampering attempt. |
     | Malicious Safe Mode Rebooting Protection | Block; Report; Disabled | Define the action to take when the Cortex XDR agent detects safe mode reboot attempts made suspiciously by other apps. |
     
20.  Configure IIS Protection to protect against Internet Information Server (IIS) attacks.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects a threat that targets an Internet Information Server (IIS), the Cortex XDR agent performs the configured action. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the processes or files that are related to the IIS attack. |
     
21.  Configure UEFI Protection, to protect the endpoint from Unified Extensible Firmware Interface (UEFI) manipulation attempts.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects UEFI manipulation attempts, it performs the configured action. When Block is selected, the Cortex XDR agent blocks all processes and threads in the event chain, up to the UEFI threat. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the processes or files that are related to the UEFI threat. |
     
22.  Configure Ransomware Protection to protect against encryption-based activity associated with ransomware attacks.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects ransomware activity locally on the endpoint or in pre-defined network folders, the Cortex XDR agent performs the configured action. |
     | Quarantine Malicious Process | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the processes that are related to the ransomware activity. The Quarantine Malicious Process option is only available if Action Mode is set to Block. |
     | Protection Mode | Normal; Aggressive | By default, Protection Mode is set to Normal, where the decoy files on the endpoint are present, but do not interfere with benign applications and end user activity on the endpoint. If you suspect your network has been infected with ransomware, and you need to provide better coverage, you can apply the Aggressive protection mode. Aggressive mode exposes more applications in your environment to the Cortex XDR agent decoy files. However, it also increases the likelihood that benign software is exposed to decoy files, generating false ransomware issues, and impairing user experience. |
     
23.  Configure Malicious Child Process Protection to prevent script-based attacks. Such attacks can be used to deliver malware by blocking targeted processes that are commonly used to bypass traditional security methods.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects known suspicious parent-child relationships that are used to bypass security, the Cortex XDR agent performs the configured action. When Block is selected, known suspicious child processes are blocked from starting. |
     
24.  To prevent attacks that extract passwords from memory using the Mimikatz tool, set Password Theft Protection to Enabled.
     
25.  Configure Respond to Malicious Causality Chains options, which define the automatic response actions taken by the Cortex XDR agent when it identifies malicious causality chains.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Terminate Connection and Block IP Address of Remote Causality Group Owner | Enabled; Disabled | When the Cortex XDR agent identifies a remote network connection that attempts to perform malicious activity—such as encrypting endpoint files—the agent can automatically block the IP address to close all existing communication, and to block new connections from this IP address to the endpoint. When Cortex Cloud blocks an IP address per endpoint, that address remains blocked throughout all agent profiles and policies, including any host-firewall policy rules. You can view the list of all blocked IP addresses per endpoint from the Action Center, as well as unblock them to re-enable communication as appropriate. |
     
26.  Configure the Network Packet Inspection Engine to analyze network packet data for malicious behavior.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Terminate session; Report; Disabled | By analyzing the network packet data, the Cortex XDR agent can already detect malicious behavior at the network level, and provide protection to the growing corporate network boundaries. The engine leverages both Palo Alto Networks NGFW content rules, and new Cortex XDR content rules created by the Cortex XDR Research Team. The Cortex XDR content rules are updated through the security content. This feature focuses on detecting outbound C2 activity. The Terminate session option configures Cortex XDR agents to analyze connections and to drop the malicious connections. The Report option configures XDR agents to analyze connections, to allow the transmission of packets in your network, but to report them to Cortex Cloud. |
     
27.  Configure Dynamic Kernel Protection to protect the endpoint from kernel-level threats such as bootkits, rootkits, and susceptible drivers.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When set to Block, this protection module loads during the boot process to protect the endpoint against malicious processes running at boot time. |
     
28.  Configure Dynamic Driver Protection to protect the endpoint against the abuse of Kernel drivers.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When set to Block, runtime prevention of driver-based attacks that attempt to escalate privileges or exploit the kernel. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the drivers that are a threat. |
     
29.  Configure Security Measures Bypass to protect the endpoint from malicious actors attempting to bypass Windows built-in security controls.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When set to Block, this protection module blocks techniques used by attackers to bypass endpoint security controls. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the processes that are related to bypass techniques. |
     
30.  Configure Breach and Attack Simulation (BAS) Tools settings.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Enabled; Disabled (default) | When BAS mode is enabled, BAS tools will receive special handling. Only the simulation itself is terminated. When BAS mode is disabled, BAS tools are treated like any other malicious process. Based on the profile settings, BAS tools will face the same prevention measures as all other threats \*\*Note:\*\* When you are actively evaluating with BAS tools, it is recommended to enable the BAS mode setting only for the duration of your evaluation, and for a limited number of agents. |
     
     **Note:**
     
     BAS tools mode with content older than version 1850 cannot be configured, the agent will be treated as Enabled.
     
31.  To save the profile, click Create.
     

What to do next

If you are ready to apply your new profile to endpoints, you do this by adding it to a policy rule. If you still need to define other profiles, you can do this later. During policy rule creation or editing, you select the endpoints to which to assign the policy. There are different ways of doing this, such as:

Create a policy rule from the Prevention Profiles page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Profiles.
    
2.  Right-click your new profile, and select Create a new policy rule using this profile.
    
3.  Configure the policy rule.
    

Edit an existing policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Right click an existing policy and select Edit.
    
3.  Add your new profile to the policy rule.
    

Create a new policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Click Add Policy.
    
3.  Configure a new policy that includes your new profile.
    

###### macOS

1.  Add a new profile and define basic settings.
    
    1.  From Cortex Cloud, select Inventory → Endpoints → Policy Management → Prevention → Profiles. Click +Add Profile, and select whether to create a new profile, or to import a profile from a file.
        
        **Note:**
        
        New profiles based on imported profiles are added, and do not replace existing ones.
        
    2.  Select the macOS platform, and Malware as the profile type.
        
    3.  Click Next.
        
    4.  For Profile Name, enter a unique name for the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name will be visible from the list of profiles when you configure a policy rule.
        
    5.  For Description, to provide additional context for the purpose or business reason for creating the profile, enter a profile description. For example, you might include a case identification number or a link to a help desk ticket.
        
2.  Configure Respond to Malicious Causality Chains. This is the agent's automatic response actions to malicious causality chains.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Terminate connection and block IP address of remote causality group owner | Enabled; Disabled | When enabled, the Cortex XDR agent terminates the connection and blocks the IP address of a remote causality group owner. |
    
3.  Configure the Network Packet Inspection Engine to detect malicious behavior.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Terminate Session; Report; Disabled | When the Cortex XDR agent detects malicious behavior, it performs the configured action. |
    
4.  Configure the Global Behavioral Threat Protection Rules. These rules can be used to protect endpoints from malicious causality chains.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | The Cortex XDR agent protects against malicious causality chains, using behavioral threat protection rules. When the action mode is set to Block, the Cortex XDR agent terminates all processes and threads in the event chain up to the causality group owner (CGO). |
    | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the processes and the artifacts, such as files, related to the CGO. When disabled, the Cortex XDR agent does not quarantine the CGO of an event chain, nor any scripts or files called by the CGO. |
    
5.  Configure Credential Gathering Protection to protect endpoints from processes trying to access or steal passwords and other credentials.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | The Cortex XDR agent protects against all processes and threads in the event chain up to the credential gathering process or file. When this module is disabled, the Cortex XDR agent does not analyze the event chain and does not block credential gathering. |
    | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the process or file related to the credential gathering event chain. |
    
6.  Configure Anti Webshell Protection to protect endpoint processes from dropping malicious web shells.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | In a causality chain, when the Cortex XDR agent detects a process that attempts to drop malicious web shells, it performs the configured action. |
    | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the processes or files that are related to the web shell drop event chain, and any scripts or files called by the web shell dropping process. |
    
7.  Configure Financial Malware Threat Protection to protect against techniques specific to financial and banking malware.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | In a causality chain, when the Cortex XDR agent detects a process that attempts to access or steal financial or banking information, the Cortex XDR agent performs the configured action. |
    | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the processes or files related to the financial information gathering event chain, and scripts or files called by the financial information gathering process. |
    | Crypto Wallet Protection | Enabled; Disabled | When enabled, provides protection for cryptocurrency wallets that are stored on endpoints. Cryptocurrency wallets store private keys that are used to access crypto assets. |
    
8.  Configure Cryptominers Protection to protect against attempts to locate or steal cryptocurrencies.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | In a causality chain, when the Cortex XDR agent detects a cryptomining process or file, the Cortex XDR agent performs the configured action. |
    | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the process or file detected during a cryptocurrency gathering attempt. |
    
9.  Configure Malicious Device Protection to identify and block potentially malicious Human Interface Devices (HIDs), such as the USB Rubber Ducky. This capability allows organizations to significantly reduce their physical attack surface and defend against social engineering-based hardware threats.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When set to Block, the Cortex XDR agent blocks malicious HIDs. When set to Report, an issue is generated, but no action is taken. |
    
10.  Configure Anti Tampering Protection to protect against tampering attempts.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects a tampering attempt, including modification and/or termination of the Cortex XDR agent, it performs the configured action. If you choose the Block option, you must also enable XDR Agent Tampering Protection in the Agent Settings profile, and ensure that both profiles are assigned to the same endpoints. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the processes or files that are related to the tampering attempt. |
     
11.  Configure Ransomware Protection to protect against encryption-based activity associated with ransomware attacks.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects ransomware activity locally on the endpoint or in pre-defined network folders, the Cortex XDR agent performs the configured action. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the files that are related to the ransomware activity. |
     
12.  Configure Malicious Child Process Protection to prevent script-based attacks. Such attacks can be used to deliver malware by blocking targeted processes that are commonly used to bypass traditional security methods.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects known suspicious parent-child relationships that are used to bypass security, the Cortex XDR agent performs the configured action. When Block is selected, known suspicious child processes are blocked from starting. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the files that are related to a malicious child process. |
     
13.  Configure On-demand File Examination to scan endpoints and attached removable drives for dormant, inactive malware.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Periodic Scan | Enabled; Disabled | \*\*Note:\*\* We recommend that you disable scheduled scanning. VDI machine scans are based on the golden image and additional files will be examined upon execution. Periodic scanning enables you to scan endpoints on a recurring basis without waiting for malware to run on the endpoint. When enabled, you can set the time interval (weekly or monthly) and the day and time at which to start scanning. In addition, you can choose to enable or disable scanning of removable media drives. Periodic scanning is persistent, and if the scan is scheduled to start while the endpoint is turned off, the scan will be initiated when the endpoint is turned on again. The scheduling of future scans is not affected by this delay. \*\*Note:\*\* When periodic scanning is enabled in your profile, the Cortex XDR agent initiates an initial scan when it is first installed on the endpoint, regardless of the periodic scanning scheduling time. |
     
14.  Configure Mach-O Execution Examination to check Mach-O files for malware upon execution.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to run malware, it performs the configured action. |
     | Quarantine malicious Mach-O files | Disabled; Quarantine WildFire malware verdict; Quarantine WildFire and Locals Analysis malware verdict | By default, the Cortex XDR agent blocks malware from running, but does not quarantine the file. You can enable one of the options to quarantine files, depending on the verdict issuer. \*\*Note:\*\* The Quarantine Malicious Mach-O Files feature is not available for malware identified on network drives. |
     | Action on unknown Mach-O files to WildFire | Allow; Run Local Analysis; Block | **Allow**: Unknown files are not blocked and local verdicts are not issued for them. **Run Local Analysis**: The Cortex XDR agent uses embedded machine learning to determine the likelihood that an unknown file is malware, and issues a local verdict for the file. **Block**: Block unknown files but do not run local analysis. In this case, unknown files remain blocked until the Cortex XDR agent receives an official WildFire verdict. |
     | Action when WildFire verdict is Benign Low Confidence | Allow; Run Local Analysis; Block | Select the action to take when a file with a Benign Low Confidence verdict from WildFire tries to run on the endpoint. When local analysis is enabled, the Cortex XDR agent uses embedded machine learning to determine the likelihood that an unknown file is malware, and issues a local verdict for the file. If you block this file but do not run a local analysis, the file remains blocked until the Cortex XDR agent receives a high-confidence WildFire verdict. \*\*Warning:\*\* For optimal user experience, we recommend that you set the action mode to either Allow or Run Local Analysis. |
     | Upload Mach-O files for cloud analysis | Enabled; Disabled | When enabled, the Cortex XDR agent sends unknown files to Cortex Cloud, and Cortex Cloud sends the files to WildFire for analysis. The file types that the Cortex XDR agent analyzes depend on the platform type. WildFire accepts files up to 300 MB in size. |
     | Treat Grayware as Malware | Enabled; Disabled | When enabled, Cortex Cloud treats all grayware with the same Action Mode as configured for malware. When disabled, grayware is considered benign, and is not blocked. |
     
15.  Configure Mach-O Loading Examination to detect and prevent execution of malicious Mach-O files when being loaded on macOS-based endpoints.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to run malware, it performs the configured action. |
     | Quarantine malicious Mach-O files | Disabled; Quarantine WildFire malware verdict; Quarantine WildFire and Locals Analysis malware verdict | By default, the Cortex XDR agent blocks malware from running, but does not quarantine the file. You can enable one of the options to quarantine files, depending on the verdict issuer. |
     | Action on unknown Mach-O files to WildFire | Allow; Run Local Analysis; Block | **Allow**: Unknown files are not blocked and local verdicts are not issued for them. **Run Local Analysis**: The Cortex XDR agent uses embedded machine learning to determine the likelihood that an unknown file is malware, and issues a local verdict for the file. **Block**: Block unknown files but do not run local analysis. In this case, unknown files remain blocked until the Cortex XDR agent receives an official WildFire verdict. |
     | Action when WildFire verdict is Benign Low Confidence | Allow; Run Local Analysis; Block | Select the action to take when a file with a Benign Low Confidence verdict from WildFire tries to run on the endpoint. When local analysis is enabled, the Cortex XDR agent uses embedded machine learning to determine the likelihood that an unknown file is malware, and issues a local verdict for the file. If you block this file but do not run a local analysis, the file remains blocked until the Cortex XDR agent receives a high-confidence WildFire verdict. \*\*Warning:\*\* For optimal user experience, we recommend that you set the action mode to either Allow or Run Local Analysis. |
     | Upload Mach-O files for cloud analysis | Enabled; Disabled | When enabled, the Cortex XDR agent sends unknown files to Cortex Cloud, and Cortex Cloud sends the files to WildFire for analysis. The file types that the Cortex XDR agent analyzes depend on the platform type. WildFire accepts files up to 300 MB in size. |
     | Treat Grayware as Malware | Enabled; Disabled | When enabled, Cortex Cloud treats all grayware with the same Action Mode as configured for malware. When disabled, grayware is considered benign, and is not blocked. |
     
16.  Configure Local File Threat Examination to enable detection of malicious files on the endpoint.
     
     **Note:**
     
     This module is supported by Cortex XDR agent 8.1.0 and later releases.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Enabled; Disabled | When enabled, the Local Threat-Evaluation Engine (LTEE) analyzes the endpoint for PHP files arriving from a web server and generates issues about any malicious PHP scripts. |
     | Terminate Malicious Processes | Enabled; Disabled | When enabled, the Cortex XDR agents terminates malicious PHP files on the endpoint. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines malicious files on the endpoint and does not quarantine updated files. |
     
17.  Configure DMG File Examination to check DMG files for malware.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to run malware in DMG files, it performs the configured action. |
     | Quarantine Malicious Executables | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines malicious executable DMG files. \*\*Note:\*\* The Quarantine Malicious Executables feature is not available for malware identified on network drives. |
     | Upload unknown files to WildFire | Enabled; Disabled | When enabled, the Cortex XDR agent sends unknown files to Cortex Cloud, and Cortex Cloud sends the files to WildFire for analysis. The file types that the Cortex XDR agent analyzes depend on the platform type. WildFire accepts files up to 300 MB in size. |
     
18.  Configure Breach and Attack Simulation (BAS) Tools settings.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Enabled; Disabled (default) | When BAS mode is enabled, BAS tools will receive special handling. Only the simulation itself is terminated. When BAS mode is disabled, BAS tools are treated like any other malicious process. Based on the profile settings, BAS tools will face the same prevention measures as all other threats \*\*Note:\*\* When you are actively evaluating with BAS tools, it is recommended to enable the BAS mode setting only for the duration of your evaluation, and for a limited number of agents. |
     
     **Note:**
     
     BAS tools mode with content older than version 1850 cannot be configured, the agent will be treated as Enabled.
     
19.  To save the profile, click Create.
     

What to do next

If you are ready to apply your new profile to endpoints, you do this by adding it to a policy rule. If you still need to define other profiles, you can do this later. During policy rule creation or editing, you select the endpoints to which to assign the policy. There are different ways of doing this, such as:

Create a policy rule from the Prevention Profiles page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Profiles.
    
2.  Right-click your new profile, and select Create a new policy rule using this profile.
    
3.  Configure the policy rule.
    

Edit an existing policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Right click an existing policy and select Edit.
    
3.  Add your new profile to the policy rule.
    

Create a new policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Click Add Policy.
    
3.  Configure a new policy that includes your new profile.
    

###### Linux

1.  Add a new profile and define basic settings.
    
    1.  From Cortex Cloud, select Inventory → Endpoints → Policy Management → Prevention → Profiles. Click +Add Profile, and select whether to create a new profile, or to import a profile from a file.
        
        **Note:**
        
        New profiles based on imported profiles are added, and do not replace existing ones.
        
    2.  Select the Linux platform, and Malware as the profile type.
        
    3.  Click Next.
        
    4.  For Profile Name, enter a unique name for the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name will be visible from the list of profiles when you configure a policy rule.
        
    5.  For Description, to provide additional context for the purpose or business reason for creating the profile, enter a profile description. For example, you might include an incident identification number or a link to a help desk ticket.
        
2.  Configure ELF Execution Examination to analyze ELF files on endpoints and prevent malicious ELF files from being executed.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to run malware in ELF files, it performs the configured action. |
    | Quarantine malicious ELF files | Disabled; Quarantine WildFire malware verdict; Quarantine WildFire and Local Analysis malware verdict | By default, the Cortex XDR agent blocks malware from running, but does not quarantine the file. You can enable one of the options to quarantine files, depending on the verdict issuer. \*\*Note:\*\* The Quarantine Malicious ELF Files feature is not available for malware identified on network drives. |
    | Action on unknown ELF files to WildFire | Allow; Run Local Analysis; Block | **Allow**: Unknown files are not blocked and local verdicts are not issued for them. **Run Local Analysis**: The Cortex XDR agent uses embedded machine learning to determine the likelihood that an unknown file is malware, and issues a local verdict for the file. **Block**: Block unknown files but do not run local analysis. In this case, unknown files remain blocked until the Cortex XDR agent receives an official WildFire verdict. |
    | Upload ELF files for cloud analysis | Enabled; Disabled | When enabled, the Cortex XDR agent sends unknown files to Cortex Cloud, and Cortex Cloud sends the files to WildFire for analysis. The file types that the Cortex XDR agent analyzes depend on the platform type. WildFire accepts files up to 300 MB in size. |
    | Treat Grayware as Malware | Enabled; Disabled | When enabled, Cortex Cloud treats all grayware with the same Action Mode as configured for malware. When disabled, grayware is considered benign, and is not blocked. |
    
3.  Configure Loaded Kernel Modules Examination to determine what Kernel modules have been installed on the endpoint.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects Kernel modules, it performs the configured action. |
    
4.  Configure Local File Threat Examination to enable detection of malicious files on the endpoint.
    
    **Note:**
    
    This module is supported by Cortex XDR agent 8.1.0 and later releases.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Enabled; Disabled | When enabled, the Local Threat-Evaluation Engine (LTEE) analyzes the endpoint for PHP files arriving from a web server and generates issues about any malicious PHP scripts. |
    | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines malicious files on the endpoint and does not quarantine updated files. |
    
5.  Configure On-write file examination to scan and take action on cross-platform files during the write process.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | ELF files | Enabled; Disabled | When enabled, the Cortex XDR agent monitors for malicious ELF files during the on-write process, and if it finds any, it generates issues and quarantines the files. ELF file examination is based on the extension, only. |
    | Portable executable files (Windows) | Enabled; Disabled | When enabled, the Cortex XDR agent monitors for portable executable files during the on-write process, and if it finds any, it generates issues. It can also perform these actions: **Quarantine malicious executables**: you can enable an option to quarantine files, depending on the verdict.; **Treat grayware as malware**: When enabled, a grayware verdict is considered malware. When disabled, grayware is considered benign. |
    | Mach-O files (macOS) | Enabled; Disabled | When enabled, the Cortex XDR agent monitors for malicious Mach-O files during the on-write process, and if it finds any, it generates alerts. It can also perform the following actions: **Quarantine malicious executables**: you can enable an option to quarantine files, depending on the verdict.; **Treat grayware as malware**: When enabled, a grayware verdict is considered malware. When disabled, grayware is considered benign. |
    
6.  Configure On-demand File Examination to scan endpoints for dormant, inactive malware.
    
    **Note:**
    
    Enabling on-demand scanning will automatically scan these core system directories: `/etc`, `/tmp`, `/home`, `/usr`, `/bin`, `/sbin`, `/lib`, `/var`, `/opt`, `/dev`, `/root`, `/boot`.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Periodic Scan | Enabled; Disabled | \*\*Note:\*\* We recommend that you disable scheduled scanning. VDI machine scans are based on the golden image and additional files will be examined upon execution. Periodic scanning enables you to scan endpoints on a recurring basis without waiting for malware to run on the endpoint. When enabled, you can set the time interval (weekly or monthly) and the day and time at which to start scanning. Periodic scanning is persistent, and if the scan is scheduled to start while the endpoint is turned off, the scan will be initiated when the endpoint is turned on again. The scheduling of future scans is not affected by this delay. \*\*Note:\*\* When periodic scanning is enabled in your profile, the Cortex XDR agent initiates an initial scan when it is first installed on the endpoint, regardless of the periodic scanning scheduling time. |
    | Scan Timeout | Number of hours | If a scan exceeds the number of hours configured here, the Cortex XDR agent stops the scan. |
    | Scan Additional Directories |  | If you want to scan additional directories, click +Add.; Enter a directory path. Use ? to match a single character or \* to match any string of characters in the directory path.; Press Enter or click the check mark.; To add additional folders, repeat these steps. |
    
7.  Configure the Global Behavioral Threat Protection Rules. These rules can be used to protect endpoints from malicious causality chains.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | The Cortex XDR agent protects against malicious causality chains, using behavioral threat protection rules. When the action mode is set to Block, the Cortex XDR agent terminates all processes and threads in the event chain up to the causality group owner (CGO). |
    | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the processes and the artifacts, such as files, related to the CGO. When disabled, the Cortex XDR agent does not quarantine the CGO of an event chain, nor any scripts or files called by the CGO. |
    
8.  Configure Credential Gathering Protection to protect endpoints from processes trying to access or steal passwords and other credentials.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | The Cortex XDR agent protects against all processes and threads in the event chain up to the credential gathering process or file. When this module is disabled, the Cortex XDR agent does not analyze the event chain and does not block credential gathering. |
    | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the process or file related to the credential gathering event chain. |
    
9.  Configure Financial Malware Threat Protection to protect against techniques specific to financial and banking malware.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | In a causality chain, when the Cortex XDR agent detects a process that attempts to access or steal financial or banking information, the Cortex XDR agent performs the configured action. |
    | Quarantine Malicious Files | Enabled; Disabled | In a causality chain, when the Cortex XDR agent detects a process that attempts to access or steal financial or banking information, the Cortex XDR agent performs the configured action. |
    
10.  Configure Cryptominers Protection to protect against attempts to locate or steal cryptocurrencies.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | In a causality chain, when the Cortex XDR agent detects a cryptomining process or file, the Cortex XDR agent performs the configured action. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the process or file detected during a cryptocurrency gathering attempt. |
     
11.  Configure Container Escaping Protection to protect against container-escaping attempts.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects container escaping attempts, it performs the configured action. |
     
12.  Configure Reverse Shell Protection to prevent attempts to redirect standard input and output streams to network sockets.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to redirect standard input and output streams to network sockets, it performs the configured action. |
     
13.  Configure Anti Webshell Protection to protect endpoint processes from dropping malicious web shells.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | In a causality chain, when the Cortex XDR agent detects a process that attempts to drop malicious web shells, it performs the configured action. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the processes or files that are related to the web shell drop event chain, and any scripts or files called by the web shell dropping process. |
     
14.  Configure Malicious Child Process Protection to prevent process creation based on examination of suspicious relations between parent and child processes. For this option, we support User Mode, and Kernel Mode for kernel versions 4.4 and later.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects known suspicious parent-child relationships that are used to bypass security, the Cortex XDR agent performs the configured action. When Block is selected, known suspicious child processes are blocked from starting. |
     | Quarantine Malicious Files | Enabled; Disabled | When enabled, the Cortex XDR agent quarantines the files that are related to a malicious child process. |
     
15.  Configure Breach and Attack Simulation (BAS) Tools settings.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Enabled; Disabled (default) | When BAS mode is enabled, BAS tools will receive special handling. Only the simulation itself is terminated. When BAS mode is disabled, BAS tools are treated like any other malicious process. Based on the profile settings, BAS tools will face the same prevention measures as all other threats \*\*Note:\*\* When you are actively evaluating with BAS tools, it is recommended to enable the BAS mode setting only for the duration of your evaluation, and for a limited number of agents. |
     
     **Note:**
     
     BAS tools mode with content older than version 1850 cannot be configured, the agent will be treated as Enabled.
     
16.  To save the profile, click Create.
     

What to do next

If you are ready to apply your new profile to endpoints, you do this by adding it to a policy rule. If you still need to define other profiles, you can do this later. During policy rule creation or editing, you select the endpoints to which to assign the policy. There are different ways of doing this, such as:

Create a policy rule from the Prevention Profiles page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Profiles.
    
2.  Right-click your new profile, and select Create a new policy rule using this profile.
    
3.  Configure the policy rule.
    

Edit an existing policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Right click an existing policy and select Edit.
    
3.  Add your new profile to the policy rule.
    

Create a new policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Click Add Policy.
    
3.  Configure a new policy that includes your new profile.

##### Set up exploit prevention profiles

Exploit prevention profiles control the action that the Cortex XDR agent takes when attempts to exploit software vulnerabilities or flaws occur.

Exploit prevention profiles block attempts to exploit system flaws in browsers, and in the operating system. For example, exploit prevention profiles help protect against exploit kits, illegal code execution, and other attempts to exploit process and system vulnerabilities.

You can configure the action that the Cortex XDR agent takes when attempts to exploit software vulnerabilities or flaws occur. To protect against specific exploit techniques, you can customize exploit protection capabilities in each exploit prevention profile. Default settings are shown in parentheses. To fine-tune your exploit prevention policy, you can override the configuration of each capability to block the malicious exploit, allow but report it, or disable the module.

To view which processes are protected by each capability, see Processes Protected by Exploit Security Policy.

For each setting that you override, clear the corresponding option to Use Default, and select the setting of your choice.

**Note:**

In this profile, the Report options configure the endpoints to report the corresponding exploit attempts to Cortex Cloud, without blocking them. The Disabled options configure the endpoints to neither analyze nor report the corresponding malware or behavior.

The tasks below are organized according to the operating systems used by your organization's endpoints.

###### Windows

1.  Add a new profile and define basic settings.
    
    1.  From Cortex Cloud, select Inventory → Endpoints → Policy Management → Prevention → Profiles. Click +Add Profile, and select whether to create a new profile, or to import a profile from a file.
        
        **Note:**
        
        New profiles based on imported profiles are added, and do not replace existing ones.
        
    2.  Select the Windows platform, and Exploit as the profile type.
        
    3.  Click Next.
        
    4.  For Profile Name, enter a unique name for the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name will be visible from the list of profiles when you configure a policy rule.
        
    5.  For Description, to provide additional context for the purpose or business reason for creating the profile, enter a profile description. For example, you might include a case identification number or a link to a help desk ticket.
        
2.  Configure Browser Exploits Protection, to protect endpoints from malicious or compromised websites.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to exploit browser processes for malicious purposes, it performs the configured action. |
    
3.  Configure Logical Exploits Protection to prevent execution of malicious code using common operating system mechanisms.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to execute malicious code using operating system mechanisms, it performs the configured action. |
    | Block List DLLs |  | The block list blocks the specified DLLs when they are run by a protected process, using the DLL Hijacking module. Click +Add to configure entries in your Block List.; Enter the name of the process that you want to block.; Enter the associated DLL name. The DLL folder or file must include the complete path. To complete the path, you can use environment variables or the asterisk (**`*`**) as a wildcard to match any string of characters (for example, **`*/windows32/`**). |
    
4.  Configure Known Vulnerable Processes Protection to automatically protect endpoints from attacks that try to leverage common operating system mechanisms for malicious purposes.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | Attackers can use existing mechanisms in the operating system to execute malicious code. When you set this option to Block, in order to block such code, you can also configure Java Deserialization Protection. |
    | Java Deserialization Protection | Enabled; Disabled | When enabled, the same action mode defined for the Known Vulnerable Process Protection is inherited here. |
    
5.  Configure Operating System Exploit Protection to prevent attackers from using operating system mechanisms for malicious purposes.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to use the operating system's own mechanisms to perform an attack, the Cortex XDR agent performs the configured action. |
    
6.  Configure Exploit Protection for Additional Processes to protect third-party processes running on endpoints.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | The Cortex XDR agent can protect third-party processes from exploitation. To protect these processes, define them in the Processes list below this field. If you select the Block option, we recommend that you perform testing and validation to ensure that there are no compatibility issues with the third-party processes that you have defined. \*\*Note:\*\* In exploit prevention profiles, if you change the action mode for processes, you must restart the protected processes for the following security modules to take effect on the process and its forked processes: Brute Force Protection; Java Deserialization; ROP; SO Hijacking |
    | Processes |  | If you want to add exploit protection for one or more additional third-party processes, add them here. Click +Add to configure entries in your Processes list.; Enter the file name of the process that you want to block, and press ENTER.; For additional processes, repeat the previous steps. |
    
7.  Configure Unpatched Vulnerabilities Protection to provide a temporary workaround for protecting unpatched endpoints from known vulnerabilities.
    
    **Note:**
    
    This step provides a temporary workaround for the following publicly known information-security vulnerabilities and exposures: CVE-2021-24074, CVE-2021-24086 and CVE-2021-24094.
    
    If you choose not to patch the endpoint, the Unpatched Vulnerabilities Protection capability allows the Cortex XDR agent to apply a workaround to protect the endpoints from the known vulnerability. It takes the Cortex XDR agent up to 6 hours to enforce your configured policy on the endpoints.
    
    **Note:**
    
    If you have Windows endpoints in your network that are unpatched and exposed to a known vulnerability, we strongly recommend that you upgrade to the latest Windows Update that has a fix for that vulnerability.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Modify IPv4 and IPv6 Settings | Do not modify system settings; Modify settings until the endpoint is patched; Revert system settings to your previous settings | To address known vulnerabilities [CVE-2021-24074](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-24074), [CVE-2021-24086](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-24086), and [CVE-2021-24094](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-24094), you can Modify IPv4 and IPv6 settings as follows: Do not modify system settings (default): Do not modify the IPv4 and IPv6 settings currently set on the endpoint, whether the current values are your original values or values that were modified as part of this workaround.; Modify system settings until the endpoint is patched: If the endpoint is already patched, this option does not modify any system settings. For unpatched endpoints, the Cortex XDR agent runs the following commands to temporarily modify the IPv4 and IPv6 settings until the endpoint is patched. After the endpoint is patched for [CVE-2021-24074](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-24074), [CVE-2021-24086](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-24086), and [CVE-2021-24094](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-24094), all modified Windows system settings as part of this workaround are automatically reverted to their values before modification. Palo Alto Networks strongly recommends that you review these commands before applying this workaround in your network to ensure your critical business components are not affected or harmed: `` `netsh int ipv6 set global reassemblylimit=0` `` This command disables IPv6 fragmentation on the endpoint. `` `netsh int ipv4 set global sourceroutingbehavior=drop` `` This command disables LSR / loose source routing for IPv4.; Revert system settings to your previous settings: Revert all Windows system settings to their values before modification as part of this workaround, regardless of whether the endpoint was patched or not. \*\*Warning:\*\* This workaround applies only to the specific [Windows versions listed as exposed to these CVEs](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-24086), and requires a Cortex XDR agent release 7.1 or later and content 167-51646 or later. This workaround is not recommended for non-persistent, stateless, or linked-clone environments. In some cases, enabling this workaround can affect the network functionality on the endpoint. |
    
8.  To save the profile, click Create.
    

What to do next

If you are ready to apply your new profile to endpoints, you do this by adding it to a policy rule. If you still need to define other profiles, you can do this later. During policy rule creation or editing, you select the endpoints to which to assign the policy. There are different ways of doing this, such as:

Create a policy rule from the Prevention Profiles page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Profiles.
    
2.  Right-click your new profile, and select Create a new policy rule using this profile.
    
3.  Configure the policy rule.
    

Edit an existing policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Right click an existing policy and select Edit.
    
3.  Add your new profile to the policy rule.
    

Create a new policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Click Add Policy.
    
3.  Configure a new policy that includes your new profile.
    

###### macOS

1.  Add a new profile and define basic settings.
    
    1.  From Cortex Cloud, select Inventory → Endpoints → Policy Management → Prevention → Profiles. Click +Add Profile, and select whether to create a new profile, or to import a profile from a file.
        
        **Note:**
        
        New profiles based on imported profiles are added, and do not replace existing ones.
        
    2.  Select the macOS platform, and Exploit as the profile type.
        
    3.  Click Next.
        
    4.  Enter a unique Profile Name for the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name will be visible from the list of profiles when you configure a policy rule.
        
    5.  For Description, to provide additional context for the purpose or business reason for creating the profile, enter a profile description. For example, you might include a case identification number or a link to a help desk ticket.
        
2.  Configure Browser Exploits Protection, to protect endpoints from malicious or compromised websites.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to exploit browser processes for malicious purposes, it performs the configured action. |
    
3.  Configure Logical Exploits Protection to prevent execution of malicious code using common operating system mechanisms.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to execute malicious code using operating system mechanisms, it performs the configured action. |
    
4.  Configure Known Vulnerable Processes Protection to automatically protect endpoints from attacks that try to leverage common operating system mechanisms for malicious purposes.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | Attackers can use existing mechanisms in the operating system to execute malicious code. When you set this option to Block, in order to block such code, you can also configure Java Deserialization Protection. |
    
5.  Configure Operating System Exploit Protection to prevent attackers from using operating system mechanisms for malicious purposes.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to use the operating system's own mechanisms to perform an attack, the Cortex XDR agent performs the configured action. |
    
6.  Configure Exploit Protection for Additional Processes to protect third-party processes running on endpoints.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | The Cortex XDR agent can protect third-party processes from exploitation. To protect these processes, define them in the Processes list below this field. If you select the Block option, we recommend that you perform testing and validation to ensure that there are no compatibility issues with the third-party processes that you have defined. \*\*Note:\*\* In exploit prevention profiles, if you change the action mode for processes, you must restart the protected processes for the following security modules to take effect on the process and its forked processes: Brute Force Protection; Java Deserialization; ROP; SO Hijacking |
    | Processes |  | If you want to add exploit protection for one or more additional third-party processes, add them here. Click +Add to configure entries in your Processes list.; Enter the file name of the process that you want to block, and press ENTER.; For additional processes, repeat the previous steps. |
    
7.  To save the profile, click Create.
    

What to do next

If you are ready to apply your new profile to endpoints, you do this by adding it to a policy rule. If you still need to define other profiles, you can do this later. During policy rule creation or editing, you select the endpoints to which to assign the policy. There are different ways of doing this, such as:

Create a policy rule from the Prevention Profiles page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Profiles.
    
2.  Right-click your new profile, and select Create a new policy rule using this profile.
    
3.  Configure the policy rule.
    

Edit an existing policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Right click an existing policy and select Edit.
    
3.  Add your new profile to the policy rule.
    

Create a new policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Click Add Policy.
    
3.  Configure a new policy that includes your new profile.
    

###### Linux

1.  Add a new profile and define basic settings.
    
    1.  From Cortex Cloud, select Inventory → Endpoints → Policy Management → Prevention → Profiles. Click +Add Profile, and select whether to create a new profile, or to import a profile from a file.
        
        **Note:**
        
        New profiles based on imported profiles are added, and do not replace existing ones.
        
    2.  Select the Linux platform, and Exploit as the profile type.
        
    3.  Click Next.
        
    4.  Enter a unique Profile Name for the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name will be visible from the list of profiles when you configure a policy rule.
        
    5.  For Description, to provide additional context for the purpose or business reason for creating the profile, enter a profile description. For example, you might include a case identification number or a link to a help desk ticket.
        
2.  Configure Known Vulnerable Processes Protection to automatically protect endpoints from attacks that try to leverage common operating system mechanisms for malicious purposes.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | Attackers can use existing mechanisms in the operating system to execute malicious code. When you set this option to Block, in order to block such code, you can also configure Java Deserialization Protection. |
    
3.  Configure Operating System Exploit Protection to prevent attackers from using operating system mechanisms for malicious purposes.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | When the Cortex XDR agent detects attempts to use the operating system's own mechanisms to perform an attack, the Cortex XDR agent performs the configured action. |
    
4.  Configure Exploit Protection for Additional Processes to protect third-party processes running on endpoints.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Report; Disabled | The Cortex XDR agent can protect third-party processes from exploitation. To protect these processes, define them in the Processes list below this field. If you select the Block option, we recommend that you perform testing and validation to ensure that there are no compatibility issues with the third-party processes that you have defined. \*\*Note:\*\* In exploit prevention profiles, if you change the action mode for processes, you must restart the protected processes for the following security modules to take effect on the process and its forked processes: Brute Force Protection; Java Deserialization; ROP; SO Hijacking |
    | Processes |  | If you want to add exploit protection for one or more additional third-party processes, add them here. Click +Add to configure entries in your Processes list.; Enter the file name of the process that you want to block, and press ENTER.; For additional processes, repeat the previous steps. |
    
5.  To save the profile, click Create.
    

What to do next

If you are ready to apply your new profile to endpoints, you do this by adding it to a policy rule. If you still need to define other profiles, you can do this later. During policy rule creation or editing, you select the endpoints to which to assign the policy. There are different ways of doing this, such as:

Create a policy rule from the Prevention Profiles page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Profiles.
    
2.  Right-click your new profile, and select Create a new policy rule using this profile.
    
3.  Configure the policy rule.
    

Edit an existing policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Right click an existing policy and select Edit.
    
3.  Add your new profile to the policy rule.
    

Create a new policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Click Add Policy.
    
3.  Configure a new policy that includes your new profile.

##### Set up agent settings profiles

Use agent settings profiles to customize Cortex XDR agent settings for different platforms and groups of users.

Use agent settings profiles to customize Cortex XDR agent settings for different platforms and groups of users.

The tasks below are organized according to the operating systems used by your organization's endpoints.

###### Windows

1.  Add a new profile and define basic settings.
    
    1.  Select Inventory → Endpoints → Policy Management → Prevention → Profiles. Click +Add Profile, and select whether to create a new profile or import a profile from a file.
        
        **Note:**
        
        New profiles based on imported profiles are added, and do not replace existing ones.
        
    2.  Select the Windows platform, and Agent Settings as the profile type.
        
    3.  Click Next.
        
    4.  For Profile Name, enter a unique name for the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name will be visible from the list of profiles when you configure a policy rule.
        
    5.  For Description, to provide additional context for the purpose or business reason for creating the profile, enter a profile description. For example, you might include a case identification number or a link to a help desk ticket.
        
2.  For Disk Quota, configure the amount of disk space to allot for Cortex XDR agent logs. Specify a value in MB from 100 to 10,000 (default is 5,000).
    
3.  Configure the User Interface options for Cortex Cloud.
    
    By default, Cortex Cloud uses the settings specified in the default agent settings profile and displays the default configuration in parentheses. When you select a setting other than the default, you override the default configuration for the profile.
    
    | Item | Options | More details |
    | --- | --- | --- |
    | Tray Icon | Visible (default); Hidden | Choose whether you want the Cortex XDR agent icon to be Visible or Hidden in the notification area (system tray). |
    | XDR Agent Console Access | Enabled; Disabled | When enabled, allows access to Cortex Cloud. |
    | XDR Agent User Notifications | Enabled; Disabled | Enable this option to operate display notifications in the notifications area on the endpoint. When you enable notifications, you can use the default notification messages that are displayed for each option, or provide custom text for each notification type. You can also customize a notification footer. Options include: Device Control Violation Notifications \*\*Note:\*\* Disabling Device Control Violation notifications is only supported on endpoints running Cortex XDR agent version 8.6 and above. ; Live Terminal User Notifications: You can select to Request end-user permission to start the session. If the end user denies the request, you will not be able to initiate a Live Terminal session on the endpoint.; Live Terminal Active Session Indication: Enable this option to display a blinking light () on the tray icon for the duration of the remote session to indicate to the end user that a Live Terminal session is in progress.; Persistent Isolation Notification; Endpoint Network Isolation Notification; Endpoint Network Un-Isolation Notification; Blocked Connectivity Notification; Exploit/Malware Events Set to Block; Restriction Events Set to Block; Restriction Events Set to Notify User; Notification Footer Text; USB Device Was Blocked; USB Disk Drive Was Allowed in Read-Only Mode \*\*Note:\*\* You can enable the option to maintain a persistent notification regarding the disconnection of the endpoint from the network. The settings Persistent Isolation Notification and Blocked Connectivity Notification must be enabled. Until the threat on the endpoint has been removed, the endpoint remains disconnected from the network. |
    
4.  Customize Agent Security settings. By default, the Cortex XDR agent protects all agent components. However, you can configure protection with more granularity for Cortex XDR agent services, processes, files, registry values and tampering protection.
    
    **Note:**
    
    In Traps 5.0.6 and later releases, when protection is enabled, access will be read-only. In earlier Traps releases, enabling protection disables all access to services, processes, files, and registry values.
    
    1.  Enable XDR Agent Tampering Protection.
        
        **Note:**
        
        If you choose the Enable option, you must also enable XDR Agent Tampering Protection in the malware profile and set it to Block. Ensure that both profiles are assigned to the same endpoints.
        
    2.  You can customize the following options:
        
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Service Protection | Enabled; Disabled | Protects against stopping agent services. When this protection is enabled, agent services won't accept operating system stop requests. |
    | Process Protection | Enabled; Disabled | Protects against attempts to tamper with agent processes; injecting into them, terminating them, reading, or writing into their virtual memory. |
    | File Protection | Enabled; Disabled | Protects against attempts to tamper with agent files; deleting, replacing, renaming, moving, or writing files/directories. |
    | Registry Protection | Enabled; Disabled | Protects against attempts to tamper with agent registry settings and agent policies, such as deleting, adding, and renaming registry keys or values which belong to the agent. |
    | Pipe Protection | Enabled; Disabled | Protects against attempts to tamper with the agent's pipe-based inter-process communication (IPC) mechanism. |
    
5.  For Uninstall Password, configure an uninstall password.
    
    Define and confirm an encrypted password that the user must specify to uninstall the Cortex XDR agent. The uninstall password, also known as the supervisor password, is also used to protect against tampering attempts using Cytool commands. The password must contain:
    
    -   8 to 32 characters
        
    -   At least one of each of the following:
        
        -   Lower-case letter
            
        -   Upper-case letter
            
        -   Number
            
        -   Special character: _!@#%_
            
        
    
6.  Configure Windows Security Center Integration.
    
    The Windows Security Center is a reporting tool that monitors the system health and security state of Windows endpoints on Windows 7 and later releases.
    
    **Note:**
    
    When you enable Cortex XDR agent registration with the Windows Security Center, Windows automatically shuts down Microsoft Defender on Windows-based workstation endpoints. If you still want to allow Microsoft Defender to run on a workstation endpoint where Cortex Cloud is installed, you must use the Disable option. However, Palo Alto Networks does not recommend running Windows Defender and the Cortex XDR agent on the same endpoint, because this might cause performance and incompatibility issues with Global Protect and other applications.
    
    On Windows-based servers, ensure that Windows Defender is disabled. This can be done using a Group Policy Object (GPO) or another group management tool of your choice.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Windows Security Integration | Enabled | The Cortex XDR agent registers with the Windows Security Center as an official Antivirus (AV) software product. As a result, Windows automatically shuts down Microsoft Defender on the endpoint, except for endpoints that are running Windows Server versions. To avoid performance issues, Palo Alto Networks recommends that you disable or remove Windows Defender from Windows Server-based endpoints where the Cortex XDR agent is installed. |
    | Enabled No Patches | (Traps 5.0 release only) Select this option if you want to register the agent with the Windows Security Center, but prevent Windows from automatically installing Meltdown/Spectra vulnerability patches on the endpoint. |
    | Disabled | The Cortex XDR agent does not register with the Windows Action Center. As a result, Windows Action Center might indicate that virus protection is off, depending on other security products that are installed on the endpoint. |
    | Report Agent Out of Date Status to Windows Security Center | Enabled; Disabled | When enabled, the Cortex XDR agent will report every time that the connection to the server is lost for more than seven days. Each time that the agent reconnects, the count restarts. This setting is available when Windows Security Integration is set to either Enabled or Enabled No Patches. |
    
7.  Configure Issues Data collection options.
    
    When the Cortex XDR agent generates issues for process-related activity on the endpoint, the agent collects the contents of memory and other data about the event, in what is known as an issue data dump file. You can configure the Cortex XDR agent to automatically upload issue data dump files to Cortex Cloud.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Issue Data Dump File Size | Small; Medium; Full | The Full option creates the largest and most complete set of information. |
    | Automatically Upload Issue Data Dump File | Enabled; Disabled | During event investigation, if automatic upload was disabled, you can still manually retrieve this data. |
    
8.  Enable XDR Pro Endpoint Capabilities, and then configure the capabilities required by your organization. The Cortex XDR Pro features are hidden until you enable this option.
    
    **Notice:**
    
    Requires a Cortex XDR Pro per Endpoint license. When you enable this feature, a Cortex XDR Pro per Endpoint license is consumed.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Monitor and Collect Enhanced Endpoint Data | Enabled; Disabled | By default, the Cortex XDR agent collects information about events that occur on the endpoint. If you enable Behavioral Threat Protection in a Malware security profile, the Cortex XDR agent also collects information about all active file, process, network, and registry activity on an endpoint. When you enable the Cortex XDR agent to monitor and collect enhanced endpoint data, Cortex Cloud shares the detailed endpoint information with other Cortex apps. The information can help to provide the endpoint context when a security event occurs, so that you can gain insight into the overall event scope during an investigation. The event scope includes all activities that took place during an attack, the endpoints that were involved, and the damage caused. When disabled, the Cortex XDR agent will not share endpoint activity logs. |
    | Enable Host Insights Capabilities | Enabled; Disabled | 
    **Notice:**
    
    Requires Host Insights add-on. When enabled, the various host insight capabilities can be configured. |
    | Endpoint Information Collection | Enabled; Disabled | When enabled, the Cortex XDR agent collects host inventory information such as users, groups, services, drivers, hardware, and network shares, as well as information about applications installed on the endpoint, including CVE and installed KBs for Vulnerability Assessment. |
    | File Search and Destroy Action Mode | Enabled; Disabled | When enabled, the Cortex XDR agent collects detailed information about files on the endpoint to create a files inventory database. The agent locally monitors any actions performed on these files and updates the local files inventory database in real-time. With this option you can also select the File Search and Destroy Monitored File Types where Cortex Cloud monitors all the files on the endpoint, or only common file types. If you choose Common file types, Cortex Cloud monitors the following file types: `bin, msi, doc, docx, docm, rtf, xls, xlsx, xlsm, pdf, ppt, pptx, pptm, ppsm, pps, ppsx, mpp, mppx, vsd, xsdx` and `wsf`. A hash will also be computed for these file types: `zip, pe,` and `ole`. File size is limited to 30 MB by default. Searches of files larger than 30 MB by hash are not supported. Additionally, you can exclude files that exist under a specific local path on the endpoint from inclusion in the files database. |
    | Monitor and Collect Forensics Data | Enabled; Disabled | 
    
    **Notice:**
    
    Requires Forensics Add-on. When enabled, the Cortex XDR agent collects detailed information about what happened on your endpoint, to create a forensics database. Define the following to enable collection and collection time intervals for the following entity types: Process Execution; File Access; Persistence; Command History; Network; Remote Access; Search Collections Data collected by the agent is displayed on the tenant's Forensics page. |
    | Distributed Network Scan | Enabled; Disabled \*\*Note:\*\* To enable access to these options, scroll down to Network Location Configuration, and set Action Mode to Enabled. | When enabled, the Cortex XDR agent scans your network using Ping or Nmap to provide updated identifiers of your unmanaged network assets. Ping scans return the IP address, MAC address, Hostname, and Platform, whereas Nmap will scan the most common ports for the IP address, Hostname, Platform, and OS version. Ping is a lighter scan, that generates icmp requests to peers and does not use external tools. Nmap will make more noise on the network, but the resulting can be better, and also supports operating system detection. Ping scans are performed in 30 minute intervals. Nmap scans are performed in 60 minute intervals. The scan is performed according to the subnets detected in each network interface found on the endpoint, and up to a maximum of ~1K IP addresses calculated according to agent_ip/22. For example, an agent with the IP address 121.121.121.121 will be assigned the scan range: 121.121.120.1 - 121.121.123.254 (1024 addresses). Each agent is assigned scan ranges randomly from all the scannable subnets, so the same agent can scan multiple subnets. The following criteria affect the scan: There must be at least two endpoints detected in order to assign a scan.; Network Location Configuration must be enabled.; Subnet masking settings and service name configurations influence the scan.; Excluded IP address ranges are not scanned. In the Network Location Configuration section, set the Action Mode to Enabled.; In the Distributed Network Scan section, set the Action Mode to Enabled.; In Scan Mode, select Nmap or Ping. \*\*Note:\*\* When using Nmap, the Cortex XDR agent downloads an Nmap driver for the duration of the scan and removes the driver upon completion. If an Nmap scan is in process, Cortex Cloud identifies the Nmap driver and places any additional scans in a queue. The scan is performed according to the subnets detected in each network interface found on the endpoint.; If you want to exclude IP address ranges, select Excluded IP Address Ranges. The IP address ranges are populated from your network configurations.; If you selected Nmap, enable or disable OS Fingerprinting of the IP address. Depending on the type of scan you defined, the agent Ping scan takes 30 minutes, and Nmap takes 60 minutes. Following each scan, Cortex XDR aggregates the IP addresses that were collected, and displays the results in the Asset Management table. |
    
9.  Configure XDR Cloud for hosts running on cloud platforms. By default (auto-detect mode), the agent detects whether an endpoint is a cloud-based (container) installation or a permanent installation, and uses license allocation accordingly.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | XDR Cloud | Auto-detect; Enabled | If you set this to Enabled in the profile, any agent using this profile will be treated as if it is a cloud-based agent for licensing purposes. |
    
10.  Configure Response Actions for specific applications or processes, using an Allow list.
     
     If you need to isolate an endpoint, but want to allow access for a specific application or process, add it to the Network Isolation Allow List. Keep the following considerations in mind:
     
     -   When you add a specific application to your allow list from network isolation, the Cortex XDR agent continues to block some internal system processes. This is because some applications, for example, ping.exe, can use other processes to facilitate network communication. As a result, if the Cortex XDR agent continues to block an application you included in your allow list, you may need to perform additional network monitoring to determine the process that facilitates the communication, and then add that process to the allow list.
         
     -   For VDI sessions, use of the network isolation response action can disrupt communication with the VDI host management system, thereby stopping access to the VDI session. Therefore, before using the response action, you must add the VDI processes and corresponding IP addresses to your allow list.
         
     
     1.  Click Add to add an entry to the allow list.
         
     2.  Specify the Process Path that you want to allow, and the IPv4 or IPv6 address of the endpoint. Use the **`*`** wildcard on either side to match any process or IP address. For example, specify **`*`** as the process path and an IP address to allow any process to run on the isolated endpoint with that IP address. Conversely, specify **`*`** as the IP address and a specific process path to allow the process to run on any isolated endpoint that receives this profile.
         
     3.  Click the check mark.
         
11.  Configure Backup Management to backup endpoint data.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Shadowcopy Activation | Enabled; Disabled | When enabled, the Cortex XDR agent automatically turns on the system protection of the endpoint. This ensures that the data is backed up and may be recovered in cases of any security breaches or loss of data. |
     | Disk Space Limitation | Disk space in MB | Limits the amount of disk space in MB that can be used for endpoint data backup. |
     
12.  Configure the method used to update content on your endpoints.
     
     **Warning:**
     
     If you disable or delay automatic-content updates provided by Palo Alto Networks, it may affect the security level in your organization.
     
     **Note:**
     
     -   If you disable content updates for a newly installed agent, the agent retrieves the content for the first time from Cortex Cloud, and then disables content updates on the endpoint.
         
     -   When you add a Cortex XDR agent to an endpoint group with a disabled content auto-upgrades policy, the policy is applied to the added agent as well.
         
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Content Auto-update | Enabled; Disabled (default) | By default, the Cortex XDR agent always retrieves the most updated content and deploys it on the endpoint, to ensure that it is always protected with the latest security measures. If you disable content updates, the agent stops retrieving them from the Cortex Cloud tenant, and keeps working with the current content on the endpoint. |
     | Content Staging | Enabled; Disabled (default) | Enable users to deploy agent staging content on selected test environments. Staging content is released before production content, allowing for early evaluation of the latest content update.  |
     | Content Rollout | Immediately; Delayed | The Cortex XDR agent can retrieve content updates immediately as they are available, or after a pre-configured delay period. When you delay content updates, the Cortex XDR agent will retrieve the content according to the configured delay. For example, if you configure a delay period of two days, the agent will not use any content released in the last 48 hours. |
     
13.  Agent Auto-Upgrade is disabled by default. Before enabling Auto-Update for Cortex XDR agents, make sure to consult with all relevant stakeholders in your organization.
     
     **Note:**
     
     Automatic upgrades are not supported with non-persistent VDI and temporary sessions.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Agent Auto-Upgrade | Enabled; Disabled (Default) |  |
     | Automatic Upgrade Scope | Latest agent release; One release before the latest one; Only maintenance releases; Only maintenance releases in a specific version | For One release before the latest one, Cortex Cloud upgrades the agent to the previous release before the latest, including maintenance releases. Major releases are numbered X.X, such as release 8.0, or 8.2. Maintenance releases are numbered X.X.X, such as release 8.2.2. For Only maintenance releases in a specific version, select the required release version. |
     | Upgrade Rollout | Immediate; Delayed | For Delayed, set the delay period (number of days) to wait after the version release before upgrading endpoints. Choose a value between 7 and 45. To control the number of parallel upgrades in your network, configure Global Agent Settings. \*\*Note:\*\* The delay timer starts from the date of the target agent version's availability in the tenant. |
     | Scheduling | Hours; Days of the week | Schedule the upgrade task for a specific time and days of the week. |
     
14.  Specify a Download Source, or multiple sources, from which Cortex XDR agent retrieves agent and content updates. The options provided help you to reduce external network bandwidth loads during updates. When all sources are selected, the download sources are prioritized in the following order: P2P > Broker VM > Cortex Cloud Server.
     
     To ensure your agents remain protected, the Cortex Server download source is always enabled to allow all Cortex XDR agents in your network to retrieve the content directly from the Cortex Cloud server on their following heartbeat.
     
     **Note:**
     
     Limitations in the content download process:
     
     -   When you install the Cortex XDR agent, the agent retrieves the latest content update version available. A freshly installed agent can take between five to ten minutes (depending on your network and content update settings) to retrieve the content for the first time. During this time, your endpoint is not protected.
         
     -   When you upgrade a Cortex XDR agent to a newer Cortex XDR agent version, if the new agent cannot use the content version running on the endpoint, the new content update will start within one minute in P2P, and within five minutes from Cortex Cloud.
         
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Select all | Selected; Clear | When selected, all download source options are enabled. |
     | P2P | 33221 (default port); custom port | Cortex Cloud deploys serverless peer-to-peer distribution to Cortex XDR agents in your LAN network by default. Within the six hour randomization window during which the Cortex XDR agent attempts to retrieve the new version, it will broadcast its peer agents on the same subnet twice: once within the first hour, and once again during the following five hours. If the agent did not retrieve the files from other agents in both queries, it will proceed to the next download source defined in your profile. To enable P2P, you must enable UDP and TCP over the port specified for P2P Port. By default, Cortex Cloud uses port 33221. You can change the port number, if required by your organization. |
     | Broker VM | Select all; Brokers; Clusters (only Broker VMs that are connected and configured for caching can be selected) | (Requires Broker VM 12.0 and later) If you have a Palo Alto Networks Broker VM in your network, you can leverage the Local Agent Settings applet to cache release upgrades and content updates. When the Broker VM is enabled and configured appropriately (refer to Activate Local Agent Settings) , it retrieves the latest installers and content files every 15 minutes, downloading them only if they are not already stored locally. The Broker VM stores this content for 7 days and agent installers for up to 30 days from the agent's last request. If the files are not available on the Broker VM at the time of the request, the agent proceeds to download the files directly from the Cortex Cloud server. When you select multiple Broker VMs, the agent chooses a Broker VM randomly for each download request. |
     
15.  Configure Network Location Configuration for your Cortex XDR agents. If you configure host firewall rules in your network, you must:
     
     -   Enable Network Location Configuration Action Mode, so that Cortex Cloud can test the network location of your device.
         
     -   Configure your network's DNS name and its internal IP address.
         
     
     If the Cortex XDR agent detects a network change on the endpoint, the agent triggers the device location test and re-calculates the policy according to the new location.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Enabled; Disabled | When Enabled, a domain controller (DC) test checks whether the device is connected to the internal network or not. If the device is connected to the internal network, it is determined to be in the organization. If the DC test fails or returns an external domain, Cortex Cloud performs a DNS connectivity test. |
     | DNS Name | Your network's DNS name | The Cortex XDR agent tests network location by submitting a Domain Name Server (DNS) name that is known only to the internal network. If the DNS returns the pre-configured internal IP address, the device is determined to be within the organization. If the DNS IP address cannot be resolved, the device is deemed to be located elsewhere. |
     | IP Address | Your network's DNS internal IP address | Enter the internal DNS IP address to be used by the DNS test. |
     
16.  Define Agent Proxy Settings.
     
     Select whether to Enable or Disable Direct Server Access for the agent when connected using a proxy.
     
17.  Configure Agent Certificates. For improved security, enforce the use of root CA that is provided by Palo Alto Networks rather than on the local machine.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Certificate Enforcement | Enabled; Disabled; Disabled (Notify) | When enabled, certificate enforcement is enabled. \*\*Note:\*\* If the Cortex XDR agent is initially unable to communicate without the local store, enforcement is not enabled and the agent will show as partially protected. When set to Disabled (Notify), Cortex XDR agents with this policy will trigger a banner in the server to notify customers about potential risk, and will direct them to change the certificate and the setting. The Last Certificate Enforcement Fallback column of the All Endpoints table is updated, and management audit logs related to the local store fallback are received by the server. When set to Disabled, Cortex XDR agents with this policy will trigger a banner in the server to notify customers about potential risk, and will direct them to change the certificate and the setting. The Last Certificate Enforcement Fallback column of the All Endpoints table is not updated, and no management audit logs related to the local store fallback are received by the server. |
     
18.  Configure Data Generation Providers, to define data generation provider types from which endpoints collect data. By default, all data generation provider types are enabled. We do not recommend disabling data generation providers unless really necessary, because it has an impact on the security coverage of your endpoints. Consult with Customer Support before you disable any of these options.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Disable Specific Data Generation Providers | Data Generation Module; Event Log Provider; System Call Provider; Remote Procedure Call Provider; .NET Provider; Device Driver IO Control Provider | To disable data collection from specific data generation provider types, select one or more options. If you select Data Generation Module, all provider types are disabled. |
     
19.  To save the profile, click Create.
     

What to do next

If you are ready to apply your new profile to endpoints, you do this by adding it to a policy rule. If you still need to define other profiles, you can do this later. During policy rule creation or editing, you select the endpoints to which to assign the policy. There are different ways of doing this, such as:

Create a policy rule from the Prevention Profiles page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Profiles.
    
2.  Right-click your new profile, and select Create a new policy rule using this profile.
    
3.  Configure the policy rule.
    

Edit an existing policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Right click an existing policy and select Edit.
    
3.  Add your new profile to the policy rule.
    

Create a new policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Click Add Policy.
    
3.  Configure a new policy that includes your new profile.
    

###### macOS

1.  Add a new profile and define basic settings.
    
    1.  Select Inventory → Endpoints → Policy Management → Prevention → Profiles. Click +Add Profile, and select whether to create a new profile or import a profile from a file.
        
        **Note:**
        
        New profiles based on imported profiles are added, and do not replace existing ones.
        
    2.  Select the macOS platform, and Agent Settings as the profile type.
        
    3.  Click Next.
        
    4.  Enter a unique Profile Name for the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name will be visible from the list of profiles when you configure a policy rule.
        
    5.  For Description, to provide additional context for the purpose or business reason for creating the profile, enter a profile description. For example, you might include a case identification number or a link to a help desk ticket.
        
2.  For Disk Quota, configure the amount of disk space to allot for Cortex XDR agent logs. Specify a value in MB from 100 to 10,000 (default is 5,000).
    
3.  Configure the User Interface options for Cortex Cloud.
    
    By default, Cortex Cloud uses the settings specified in the default agent settings profile and displays the default configuration in parentheses. When you select a setting other than the default, you override the default configuration for the profile.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Tray Icon | Visible (default); Hidden | Choose whether you want the Cortex XDR agent icon to be Visible or Hidden in the notification area (system tray). |
    | XDR Agent Console Access | Enabled; Disabled | When enabled, allows access to Cortex Cloud. |
    | XDR Agent User Notifications | Enabled; Disabled | Enable this option to operate display notifications in the notifications area on the endpoint. When you enable notifications, you can use the default notification messages that are displayed for each option, or provide custom text for each notification type. You can also customize a notification footer. Options include: Device Control Violation Notifications \*\*Note:\*\* Disabling Device Control Violation notifications is only supported on endpoints running Cortex XDR agent version 8.6 and above. ; Live Terminal User Notifications: You can select to Request end-user permission to start the session. If the end user denies the request, you will not be able to initiate a Live Terminal session on the endpoint. You can select to Request end-user permission to start the session. If the end user denies the request, you will not be able to initiate a Live Terminal session on the endpoint.; Live Terminal Active Session Indication: Enable this option to display a blinking light () on the status bar for the duration of the remote session to indicate to the end user that a Live Terminal session is in progress.; Persistent Isolation Notification; Endpoint Network Isolation Notification; Endpoint Network Un-Isolation Notification; Blocked Connectivity Notification; Exploit/Malware Events Set to Block; Restriction Events Set to Block; Restriction Events Set to Notify User; Notification Footer Text; USB Device Was Blocked; USB Disk Drive Was Allowed in Read-Only Mode \*\*Note:\*\* You can enable the option to maintain a persistent notification regarding the disconnection of the endpoint from the network. The settings Persistent Isolation Notification and Blocked Connectivity Notification must be enabled. Until the threat on the endpoint has been removed, the endpoint remains disconnected from the network. |
    
4.  For Agent Security, configure XDR Agent Tampering Protection (default is Enabled). By default, the Cortex XDR agent protects all agent components.
    
    **Note:**
    
    If you choose the Enabled option, you must also set Anti Tampering Protection in the malware security profile to Block, and ensure that both profiles are assigned to the same endpoints.
    
    **Note:**
    
    When protection is enabled, access to services, processes, files, and registry values will be read-only.
    
5.  For Uninstall Password, configure an uninstall password.
    
    Define and confirm an encrypted password that the user must specify to uninstall the Cortex XDR agent. The uninstall password, also known as the supervisor password, is also used to protect against tampering attempts via Cytool commands. The password must contain:
    
    -   8 to 32 characters
        
    -   At least one of each of the following:
        
        -   Lower-case letter
            
        -   Upper-case letter
            
        -   Number
            
        -   Special character: _!@#%_
            
        
    
6.  Configure Issues Data collection options.
    
    When the Cortex XDR agent generates issues for process-related activity on the endpoint, the agent collects the contents of memory and other data about the event, in what is known as an issue data dump file. You can configure the Cortex XDR agent to automatically upload issue data dump files to Cortex Cloud.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Issue Data Dump File Size | Small; Medium; Full | The Full option creates the largest and most complete set of information. |
    | Automatically Upload Issue Data Dump File | Enabled; Disabled | During event investigation, if automatic upload was disabled, you can still manually retrieve this data. |
    
7.  ### Notice
    
    Requires a Cortex XDR Pro per Endpoint license. When you enable this feature, a Cortex XDR Pro per Endpoint license is consumed.
    
    Enable XDR Pro Endpoint Capabilities, and then configure the capabilities required by your organization. The Cortex XDR Pro features are hidden until you enable this option.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Monitor and Collect Enhanced Endpoint Data | Enabled; Disabled | By default, the Cortex XDR agent collects information about events that occur on the endpoint. If you enable Behavioral Threat Protection in a Malware security profile, the Cortex XDR agent also collects information about all active file, process, network, and registry activity on an endpoint. When you enable the Cortex XDR agent to monitor and collect enhanced endpoint data, Cortex Cloud shares the detailed endpoint information with other Cortex apps. The information can help to provide the endpoint context when a security event occurs, so that you can gain insight into the overall event scope during an investigation. The event scope includes all activities that took place during an attack, the endpoints that were involved, and the damage caused. When disabled, the Cortex XDR agent will not share endpoint activity logs. |
    | Enable Host Insights Capabilities | Enabled; Disabled | 
    **Notice:**
    
    Requires Host Insights add-on. When enabled, the various host insight capabilities can be configured. |
    | Endpoint Information Collection | Enabled; Disabled | When enabled, the Cortex XDR agent collects Host Inventory information such as users, groups, services, drivers, hardware, and network shares, as well as information about applications installed on the endpoint, including CVE and installed KBs for Vulnerability Assessment. |
    | File Search and Destroy Action Mode | Enabled; Disabled | When enabled, the Cortex XDR agent collects detailed information about files on the endpoint to create a files inventory database. The agent locally monitors any actions performed on these files and updates the local files inventory database in real-time. With this option you can also select the File Search and Destroy Monitored File Types where Cortex Cloud monitors all the files on the endpoint, or only common file types. If you choose Common file types, Cortex Cloud monitors the following file types: `acm, apk, ax, bat, bin, bundle, csv, dll, dmg, doc, docm, docx, dylib, efi, hta, jar, js, jse, jsf, lua, mpp, mppx, mui, o, ocx, pdf, pkg, pl, plx, pps, ppsm, ppsx, ppt, pptm, pptx, py, pyc, pyo, rb, rtf, scr, sh, vds, vsd, wsf, xls, xlsm, xlsx, xsdx,` and `zip`. Additionally, you can exclude files that exist under a specific local path on the endpoint from inclusion in the files database. |
    | Monitor and Collect Forensics Data | Enabled; Disabled | 
    
    **Notice:**
    
    Requires Forensics Add-on. When enabled, the Cortex XDR agent collects detailed information about what happened on your endpoint, to create a forensics database. Define the following to enable collection and collection time intervals for the following entity types: Process Execution; File Access; Persistence; Command History; Network; Search Collections Data collected by the agent is displayed on the tenant's Forensics page. |
    
8.  Configure XDR Cloud for hosts running on cloud platforms. By default (auto-detect mode), the agent detects whether an endpoint is a cloud-based (container) installation or a permanent installation, and uses license allocation accordingly.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | XDR Cloud | Auto-detect; Enabled | If you set this to Enabled in the profile, any agent using this profile will be treated as if it is a cloud-based agent for licensing purposes. |
    
9.  Configure Response Actions for specific applications or processes, using an Allow list.
    
    If you need to isolate an endpoint, but want to allow access for a specific application or process, add it to the Network Isolation Allow List. Keep the following considerations in mind:
    
    When you add a specific application to your allow list from network isolation, the Cortex XDR agent continues to block some internal system processes. This is because some applications, for example, ping.exe, can use other processes to facilitate network communication. As a result, if the Cortex XDR agent continues to block an application you included in your allow list, you may need to perform additional network monitoring to determine the process that facilitates the communication, and then add that process to the allow list.
    
    1.  Click Add to add an entry to the allow list.
        
    2.  Specify the Process Path that you want to allow, and the IPv4 or IPv6 address of the endpoint. Use the **`*`** wildcard on either side to match any process or IP address. For example, specify **`*`** as the process path and an IP address to allow any process to run on the isolated endpoint with that IP address. Conversely, specify **`*`** as the IP address and a specific process path to allow the process to run on any isolated endpoint that receives this profile.
        
    3.  Click the check mark.
        
10.  Configure Backup Management.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Time Machine Activation | Enabled; Disabled | When enabled, this option automatically turns on the Time Machine setting of the endpoint. This ensures that the data is backed up and may be recovered in cases of any security breaches or loss of data. |
     
11.  Configure the method used to update content on your endpoints.
     
     **Warning:**
     
     If you disable or delay automatic-content updates provided by Palo Alto Networks, it may affect the security level in your organization.
     
     **Note:**
     
     If you disable content updates for a newly installed agent, the agent retrieves the content for the first time from Cortex Cloud, and then disables content updates on the endpoint.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Content Auto-update | Enabled (default); Disabled | By default, the Cortex XDR agent always retrieves the most updated content and deploys it on the endpoint, to ensure that it is always protected with the latest security measures. If you disable content updates, the agent stops retrieving them from the Cortex Cloud tenant, and keeps working with the current content on the endpoint. |
     | Staging Content | Enabled; Disabled (default) | Enable users to deploy agent staging content on selected test environments. Staging content is released before production content, allowing for early evaluation of the latest content update. |
     | Content Rollout | Immediately; Delayed | The Cortex XDR agent can retrieve content updates immediately as they are available, or after a pre-configured delay period. When you delay content updates, the Cortex XDR agent will retrieve the content according to the configured delay. For example, if you configure a delay period of two days, the agent will not use any content released in the last 48 hours. |
     
12.  Agent Auto-Upgrade is disabled by default. Before enabling Auto-Update for Cortex XDR agents, make sure to consult with all relevant stakeholders in your organization.
     
     **Note:**
     
     Automatic upgrades are not supported with non-persistent VDI and temporary sessions.
     
     When a Cortex XDR agent is added to an endpoint group, it inherits the group's policy, including the disabled content auto-upgrades setting.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Agent Auto-Upgrade | Enabled; Disabled (Default) |  |
     | Automatic Upgrade Scope | Latest agent release; One release before the latest one; Only maintenance releases; Only maintenance releases in a specific version | For One release before the latest one, Cortex Cloud upgrades the agent to the previous release before the latest, including maintenance releases. Major releases are numbered X.X, such as release 8.0, or 8.2. Maintenance releases are numbered X.X.X, such as release 8.2.2. For Only maintenance releases in a specific version, select the required release version. |
     | Upgrade Rollout | Immediate; Delayed | For Delayed, set the delay period (number of days) to wait after the version release before upgrading endpoints. Choose a value between 7 and 45. To control the agent auto upgrade scheduler and number of parallel upgrades in your network, configure Global Agent Settings. \*\*Note:\*\* The delay timer starts from the date of the target agent version's availability in the tenant. |
     | Scheduling | Hours; Days; Weeks | Schedule the upgrade task for a specific time and days of the week. |
     

14.  Specify a Download Source, or multiple sources, from which Cortex XDR agent retrieves agent and content updates. The options provided help you to reduce external network bandwidth loads during updates. When all sources are selected, the download sources are prioritized in the following order: P2P > Broker VM > Cortex Cloud Server.
     
     To ensure your agents remain protected, the Cortex Server download source is always enabled to allow all Cortex XDR agents in your network to retrieve the content directly from the Cortex Cloud server on their following heartbeat.
     
     **Note:**
     
     Limitations in the content download process:
     
     -   When you install the Cortex XDR agent, the agent retrieves the latest content update version available. A freshly installed agent can take between five to ten minutes (depending on your network and content update settings) to retrieve the content for the first time. During this time, your endpoint is not protected.
         
     -   When you upgrade a Cortex XDR agent to a newer Cortex XDR agent version, if the new agent cannot use the content version running on the endpoint, the new content update will start within one minute in P2P, and within five minutes from Cortex Cloud.
         
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Select all | Selected; Clear | When selected, all download source options are enabled. |
     | P2P | 33221 (default port); custom port | Cortex Cloud deploys serverless peer-to-peer distribution to Cortex XDR agents in your LAN network by default. Within the six hour randomization window during which the Cortex XDR agent attempts to retrieve the new version, it will broadcast its peer agents on the same subnet twice: once within the first hour, and once again during the following five hours. If the agent did not retrieve the files from other agents in both queries, it will proceed to the next download source defined in your profile. To enable P2P, you must enable UDP and TCP over the port specified for P2P Port. By default, Cortex Cloud uses port 33221. You can change the port number, if required by your organization. |
     | Broker VM | Select all; Brokers; Clusters (only Broker VMs that are connected and configured for caching can be selected) | (Requires Broker VM 12.0 and later) If you have a Palo Alto Networks Broker VM in your network, you can leverage the Local Agent Settings applet to cache release upgrades and content updates. When the Broker VM is enabled and configured appropriately (refer to Activate the Local Agent Settings) , it retrieves the latest installers and content every 6 hours. The Broker VM stores them for a 24-hour retention period since an agent last asked for them. If the files are not available on the Broker VM at the time of the request, the agent proceeds to download the files directly from the Cortex Cloud server. When you select multiple Broker VMs, the agent chooses a Broker VM randomly for each download request. |
     
15.  Configure Network Location Configuration for your Cortex XDR agents. If you configure host firewall rules in your network, you must:
     
     -   Enable Network Location Configuration Action Mode, so that Cortex Cloud can test the network location of your device.
         
     -   Configure your network's DNS name and its internal IP address.
         
     
     If the Cortex XDR agent detects a network change on the endpoint, the agent triggers the device location test and re-calculates the policy according to the new location.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Action Mode | Enabled; Disabled | When Enabled, a domain controller (DC) test checks whether the device is connected to the internal network or not. If the device is connected to the internal network, it is determined to be in the organization. If the DC test fails or returns an external domain, Cortex Cloud performs a DNS connectivity test. |
     | DNS Name | Your network's DNS name | The Cortex XDR agent tests network location by submitting a Domain Name Server (DNS) name that is known only to the internal network. If the DNS returns the pre-configured internal IP address, the device is determined to be within the organization. If the DNS IP address cannot be resolved, the device is deemed to be located elsewhere. |
     | IP Address | Your network's DNS internal IP address | Enter the internal DNS IP address to be used by the DNS test. |
     
16.  Define Agent Proxy Settings.
     
     Select whether to Enable or Disable Direct Server Access for the agent when connected using a proxy.
     
17.  Configure Agent Certificates. For improved security, enforce the use of root CA that is provided by Palo Alto Networks rather than on the local machine.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Certificate Enforcement | Enabled; Disabled; Disabled (Notify) | When enabled, certificate enforcement is enabled. \*\*Note:\*\* If the Cortex XDR agent is initially unable to communicate without the local store, enforcement is not enabled and the agent will show as partially protected. When set to Disabled (Notify), Cortex XDR agents with this policy will trigger a banner in the server to notify customers about potential risk, and will direct them to change the certificate and the setting. The Last Certificate Enforcement Fallback column of the All Endpoints table is updated, and management audit logs related to the local store fallback are received by the server. When set to Disabled, Cortex XDR agents with this policy will trigger a banner in the server to notify customers about potential risk, and will direct them to change the certificate and the setting. The Last Certificate Enforcement Fallback column of the All Endpoints table is not updated, and no management audit logs related to the local store fallback are received by the server. |
     
18.  To save the profile, click Create.
     

What to do next

If you are ready to apply your new profile to endpoints, you do this by adding it to a policy rule. If you still need to define other profiles, you can do this later. During policy rule creation or editing, you select the endpoints to which to assign the policy. There are different ways of doing this, such as:

Create a policy rule from the Prevention Profiles page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Profiles.
    
2.  Right-click your new profile, and select Create a new policy rule using this profile.
    
3.  Configure the policy rule.
    

Edit an existing policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Right click an existing policy and select Edit.
    
3.  Add your new profile to the policy rule.
    

Create a new policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Click Add Policy.
    
3.  Configure a new policy that includes your new profile.
    

###### Linux

1.  Add a new profile and define basic settings.
    
    1.  Select Inventory → Endpoints → Policy Management → Prevention → Profiles. Click +Add Profile, and select whether to create a new profile or import a profile from a file.
        
        **Note:**
        
        New profiles based on imported profiles are added, and do not replace existing ones.
        
    2.  Select the Linux platform, and Agent Settings as the profile type.
        
    3.  Click Next.
        
    4.  Enter a unique Profile Name for the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name will be visible from the list of profiles when you configure a policy rule.
        
    5.  For Description, to provide additional context for the purpose or business reason for creating the profile, enter a profile description. For example, you might include a case identification number or a link to a help desk ticket.
        
2.  For Disk Quota, configure the amount of disk space to allot for Cortex XDR agent logs. Specify a value in MB from 100 to 10,000 (default is 5,000).
    
3.  Configure Issues Data collection options.
    
    When the Cortex XDR agent generates issues for process-related activity on the endpoint, the agent collects the contents of memory and other data about the event, in what is known as an issue data dump file. You can configure the Cortex XDR agent to automatically upload issue data dump files to Cortex Cloud.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Issue Data Dump File Size | Small; Medium; Full | The Full option creates the largest and most complete set of information. |
    | Automatically Upload Issue Data Dump File | Enabled; Disabled | During event investigation, if automatic upload was disabled, you can still manually retrieve this data. |
    
4.  ### Notice
    
    Requires a Cortex XDR Pro per Endpoint license. When you enable this feature, a Cortex XDR Pro per Endpoint license is consumed.
    
    Enable XDR Pro Endpoint Capabilities, and then configure the capabilities required by your organization. The Cortex XDR Pro features are hidden until you enable this option.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Monitor and Collect Enhanced Endpoint Data | Enabled; Disabled | By default, the Cortex XDR agent collects information about events that occur on the endpoint. If you enable Behavioral Threat Protection in a Malware security profile, the Cortex XDR agent also collects information about all active file, process, network, and registry activity on an endpoint. When you enable the Cortex XDR agent to monitor and collect enhanced endpoint data, Cortex Cloud shares the detailed endpoint information with other Cortex apps. The information can help to provide the endpoint context when a security event occurs, so that you can gain insight into the overall event scope during an investigation. The event scope includes all activities that took place during an attack, the endpoints that were involved, and the damage caused. When disabled, the Cortex XDR agent will not share endpoint activity logs. |
    | Enable Host Insights Capabilities | Enabled; Disabled | 
    **Notice:**
    
    Requires Host Insights add-on When enabled, the various host insight capabilities can be configured. |
    | Endpoint Information Collection | Enabled; Disabled | When enabled, the Cortex XDR agent collects Host Inventory information such as users, groups, services, drivers, hardware, and network shares, as well as information about applications installed on the endpoint, including CVE and installed KBs for Vulnerability Assessment. |
    | Enable Compliance Collection | Enabled; Disabled |  |
    
5.  Configure XDR Cloud for hosts running on cloud platforms. By default (auto-detect mode), the agent detects whether an endpoint is a cloud-based (container) installation or a permanent installation, and uses license allocation accordingly.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | XDR Cloud | Auto-detect; Enabled | If you set this to Enabled in the profile, any agent using this profile will be treated as if it is a cloud-based agent for licensing purposes. |
    
6.  Configure Response Actions for specific applications or processes, using an Allow list.
    
    If you need to isolate an endpoint, but want to allow access for a specific application or process, add it to the Network Isolation Allow List. Keep the following considerations in mind:
    
    -   When you add a specific application to your allow list from network isolation, the Cortex XDR agent continues to block some internal system processes. This is because some applications, for example, ping.exe, can use other processes to facilitate network communication. As a result, if the Cortex XDR agent continues to block an application you included in your allow list, you may need to perform additional network monitoring to determine the process that facilitates the communication, and then add that process to the allow list.
        
    
    1.  Click Add to add an entry to the allow list.
        
    2.  Specify the Process Path that you want to allow, and the IPv4 or IPv6 address of the endpoint. Use the **`*`** wildcard on either side to match any process or IP address. For example, specify **`*`** as the process path and an IP address to allow any process to run on the isolated endpoint with that IP address. Conversely, specify **`*`** as the IP address and a specific process path to allow the process to run on any isolated endpoint that receives this profile.
        
    3.  Click the check mark.
        
7.  Configure settings to automatically Revert Endpoint Isolation of an agent. When this feature is enabled, agent isolation will be cancelled when a connection with the managing server is lost for the defined continuous period of time.
    
    1.  Either keep the recommended default setting (Enabled), or change it by selecting Disabled in the Revert Isolation field.
        
    2.  Set a time unit and enter the number of hours or days. We recommend 24 hours (default).
        
8.  Configure the method used to update content on your endpoints.
    
    **Warning:**
    
    If you disable or delay automatic-content updates provided by Palo Alto Networks, it may affect the security level in your organization.
    
    **Note:**
    
    -   If you disable content updates for a newly installed agent, the agent retrieves the content for the first time from Cortex Cloud, and then disables content updates on the endpoint.
        
    -   When you add a Cortex XDR agent to an endpoint group with a disabled content auto-upgrades policy, the policy is applied to the added agent as well.
        
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Content Auto-update | Enabled (default); Disabled | By default, the Cortex XDR agent always retrieves the most updated content and deploys it on the endpoint, to ensure that it is always protected with the latest security measures. If you disable content updates, the agent stops retrieving them from the Cortex Cloud tenant, and keeps working with the current content on the endpoint. |
    | Staging Content | Enabled; Disabled (default) | Enable users to deploy agent staging content on selected test environments. Staging content is released before production content, allowing for early evaluation of the latest content update. |
    | Content Rollout | Immediately; Delayed | The Cortex XDR agent can retrieve content updates immediately as they are available, or after a pre-configured delay period. When you delay content updates, the Cortex XDR agent will retrieve the content according to the configured delay. For example, if you configure a delay period of two days, the agent will not use any content released in the last 48 hours. |
    
9.  Agent Auto-Upgrade is disabled by default. Before enabling Auto-Update for Cortex XDR agents, make sure to consult with all relevant stakeholders in your organization.
    
    **Note:**
    
    Automatic upgrades are not supported with non-persistent VDI and temporary sessions.
    
    **Note:**
    
    Automatic upgrades are not supported for XDR agents running on K8s.
    
    | Item | Options | More details |
    | :-- | :-- | :-- |
    | Agent Auto-Upgrade | Enabled; Disabled (Default) |  |
    | Automatic Upgrade Scope | Latest agent release; One release before the latest one; Only maintenance releases; Only maintenance releases in a specific version | For One release before the latest one, Cortex Cloud upgrades the agent to the previous release before the latest, including maintenance releases. Major releases are numbered X.X, such as release 8.0, or 8.2. Maintenance releases are numbered X.X.X, such as release 8.2.2. For Only maintenance releases in a specific version, select the required release version. |
    | Upgrade Rollout | Immediate; Delayed | For Delayed, set the delay period (number of days) to wait after the version release before upgrading endpoints. Choose a value between 7 and 45. To control the agent auto upgrade scheduler and number of parallel upgrades in your network, configure Global Agent Settings. \*\*Note:\*\* The delay timer starts from the date of the target agent version's availability in the tenant. |
    
10.  Specify a Download Source, or multiple sources, from which Cortex XDR agent retrieves agent and content updates. The options provided help you to reduce external network bandwidth loads during updates. When all sources are selected, the download sources are prioritized in the following order: P2P > Broker VM > Cortex Cloud Server.
     
     To ensure your agents remain protected, the Cortex Server download source is always enabled to allow all Cortex XDR agents in your network to retrieve the content directly from the Cortex Cloud server on their following heartbeat.
     
     **Note:**
     
     Limitations in the content download process:
     
     -   When you install the Cortex XDR agent, the agent retrieves the latest content update version available. A freshly installed agent can take between five to ten minutes (depending on your network and content update settings) to retrieve the content for the first time. During this time, your endpoint is not protected.
         
     -   When you upgrade a Cortex XDR agent to a newer Cortex XDR agent version, if the new agent cannot use the content version running on the endpoint, the new content update will start within one minute in P2P, and within five minutes from Cortex Cloud.
         
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Select all | Selected; Clear | When selected, all download source options are enabled. |
     | P2P | 33221 (default port); custom port | Cortex Cloud deploys serverless peer-to-peer distribution to Cortex XDR agents in your LAN network by default. Within the six hour randomization window during which the Cortex XDR agent attempts to retrieve the new version, it will broadcast its peer agents on the same subnet twice: once within the first hour, and once again during the following five hours. If the agent did not retrieve the files from other agents in both queries, it will proceed to the next download source defined in your profile. To enable P2P, you must enable UDP and TCP over the port specified for P2P Port. By default, Cortex Cloud uses port 33221. You can change the port number, if required by your organization. |
     | Broker VM | Select all; Brokers; Clusters (only Broker VMs that are connected and configured for caching can be selected) | (Requires Broker VM 12.0 and later) If you have a Palo Alto Networks Broker VM in your network, you can leverage the Local Agent Settings applet to cache release upgrades and content updates. When the Broker VM is enabled and configured appropriately (refer to Activate the Local Agent Settings) , it retrieves the latest installers and content every 6 hours. The Broker VM stores them for a 24-hour retention period since an agent last asked for them. If the files are not available on the Broker VM at the time of the request, the agent proceeds to download the files directly from the Cortex Cloud server. When you select multiple Broker VMs, the agent chooses a Broker VM randomly for each download request. |
     
11.  Define Agent Proxy Settings.
     
     Select whether to Enable or Disable Direct Server Access for the agent when connected using a proxy.
     
12.  Configure Advanced Vulnerability Scanning for periodic Active Vulnerability Analysis (AVA) scans. This option is only available for tenants that are paired with Prisma Cloud.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Advanced Vulnerability Scanning | Enabled; Disabled |  |
     | Periodic Scan | 24 Hours; Custom | For the default setting, select 24 Hours. For other time frames, select Custom, and then configure the desired time frame. Where relevant, select the start day and time for the periodic scans. If you select monthly scans, you can also configure a timeout period, in hours. |
     
13.  Configure Agent Operation Mode. Three modes of operation exist:
     
     -   Kernel module-based operation, offering synchronous anti-malware protection, event collection from kernel level, and anti-lpe protection
         
     -   User Space Agent: user mode agent, for agents running Linux kernel 5.0.0 or higher, offering synchronous anti-malware and event collection from kernel level
         
     -   Neither of the above. When working in Kernel module-based operation running on an endpoint with an unsupported kernel, or installing with installation flag `--no-km` , or when working in User Space Agent mode on a Linux kernel older than 5.0.0, the agent will run in Asynchronous mode. In such cases, the anti-malware protection is asynchronous, and there is no event collection, no BTP, no EDR and no anti-lpe. This operation mode frequently shows "partially protected" endpoints. To avoid this, you can configure the profile to give preference to Kernel mode, but to switch to User Space Agent mode when the kernel module for an endpoint is not supported by a content update, and switch back when a the kernel module in use is supported in a newer content update.
         
     
     Endpoints running the Cortex XDR agent in Kernel mode can now be configured to automatically fall back to User Space Agent mode when a content update does not contain a kernel module for the kernel used by an endpoint.
     
     | Item | Options | More details |
     | :-- | :-- | :-- |
     | Mode | Kernel; User Space Agent | We recommend using Kernel mode.  \*\*Danger:\*\* User Space Agent mode requires Linux kernel 5.0.0 or higher. |
     | When Kernel Mode is unavailable, use User Space Mode | Enabled; Disabled | When Kernel mode is used, to ensure continued full protection when a kernel version is not supported by a content update, select the Enabled option. \*\*Note:\*\* User Space Agent mode requires Linux kernel 5.0.0 or higher. Endpoints running an older Linux kernel version with this fallback enabled, will not start using User Space Agent mode, and will operate asynchronously. When a newer content update supports the endpoint's kernel module, fallback is canceled, and Kernel mode is automatically resumed. |
     
14.  To save the profile, click Create.
     

What to do next

If you are ready to apply your new profile to endpoints, you do this by adding it to a policy rule. If you still need to define other profiles, you can do this later. During policy rule creation or editing, you select the endpoints to which to assign the policy. There are different ways of doing this, such as:

Create a policy rule from the Prevention Profiles page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Profiles.
    
2.  Right-click your new profile, and select Create a new policy rule using this profile.
    
3.  Configure the policy rule.
    

Edit an existing policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Right click an existing policy and select Edit.
    
3.  Add your new profile to the policy rule.
    

Create a new policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Click Add Policy.
    
3.  Configure a new policy that includes your new profile.

##### Set up restrictions prevention profiles

Restrictions prevention profiles limit where executables can run on an endpoint.

Restrictions prevention profiles limit the locations from which executables can run on an endpoint.

###### Windows

By default, the Cortex XDR agent receives a default profile that contains a pre-defined configuration for each restriction capability. The default setting for each capability is shown in parentheses in the user interface. To fine-tune your restrictions prevention policy, you can override the default configuration of each capability as follows. For each setting that you override, clear the Use Default option, and select the setting of your choice.

-   **Block:** Block file execution.
    
-   **Notify:** Allow file execution, but notify the user that the file is attempting to run from a suspicious location. The Cortex XDR agent also reports the event to Cortex Cloud.
    
-   **Report:** Allow file execution, but report it to Cortex Cloud.
    
-   **Disabled:** Disable the module, and do not analyze or report execution attempts from restricted locations.
    

Example 21. 

To customize the configuration for specific Cortex XDR agents, configure a new restrictions prevention profile and assign it to one or more policy rules. You can restrict files from running from specific local folders, or from removable media.

  

1.  Add a new profile and define basic settings.
    
    1.  From Cortex Cloud, select Inventory → Endpoints → Policy Management → Prevention → Profiles. Click +Add Profile, and select whether to create a new profile or import a profile from a file.
        
        **Note:**
        
        New profiles based on imported profiles are added, and do not replace existing ones.
        
    2.  Select the Windows platform, and Restrictions as the profile type.
        
    3.  Click Next.
        
    4.  For Profile Name, enter a unique name for the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name will be visible from the list of profiles when you configure a policy rule.
        
    5.  For Description, to provide additional context for the purpose or business reason for creating the profile, enter a profile description. For example, you might include a case identification number or a link to a help desk ticket.
        
2.  Configure Executable Files to restrict file execution to pre-defined locations.
    
    | Item | Option | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Notify; Report; Disabled | When the Cortex XDR agent detects execution of files from outside the pre-defined locations, it performs the configured action. To add files or folders to the Block List, click +Add, enter the path, and press Enter. To add more files or folders, click +Add again.-   You can use a wildcard to match a partial name for the folder and environment variables.; Use **`?`** to match any single character, or **`*`** to match any string of characters.; To match a folder, you must terminate the path with \* to match all files in the folder (for example, `c:\temp\*`).
    ; To add files or folders to the Allow List, define a list on the Legacy Agent Exceptions page. |
    
3.  Configure Network Location Files to restrict access to all network locations except for explicitly trusted ones.
    
    | Item | Option | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Notify; Report; Disabled | When the Cortex XDR agent detects execution of files from network locations that are not trusted, it performs the configured action. To add files or folders to the Allow List, define a list on the Legacy Agent Exceptions page. |
    
4.  Configure Removable Media Files to restrict file execution launched from external drives that are attached to endpoints in your network.
    
    | Item | Option | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Notify; Report; Disabled | When the Cortex XDR agent detects execution of files from removable media,it performs the configured action. To add files or folders to the Allow List, define a list on the Legacy Agent Exceptions page. |
    
5.  Configure Optical Drive Files to restrict file execution launched from optical disc drives that are attached to endpoints in your network.
    
    | Item | Option | More details |
    | :-- | :-- | :-- |
    | Action Mode | Block; Notify; Report; Disabled | When the Cortex XDR agent detects execution of files from an optical disc drive, it performs the configured action. To add files or folders to the Allow List, define a list on the Legacy Agent Exceptions page. |
    
6.  Configure Custom Prevention Rules.
    
    | Item | Option | More details |
    | :-- | :-- | :-- |
    | Action Mode | Enabled; Disabled | When user-defined BIOC prevention rules are present in the system, you can enable them here. Ensure that the user-defined BIOC prevention rules that you want to enable only contain the following: **Investigation types:** file_event; process_execution; remote_code_execution; network_event; windows_event_log; module_event **Subtypes:** file_event; network_event; registry_event; windows_event_log Other event subtypes are not supported here, and rules containing them will not be available for selection. \*\*Note:\*\* Configure custom BIOC prevention rules here: |
    
7.  To save the profile, click Create.
    

What to do next

If you are ready to apply your new profile to endpoints, you do this by adding it to a policy rule. If you still need to define other profiles, you can do this later. During policy rule creation or editing, you select the endpoints to which to assign the policy. There are different ways of doing this, such as:

Create a policy rule from the Prevention Profiles page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Profiles.
    
2.  Right-click your new profile, and select Create a new policy rule using this profile.
    
3.  Configure the policy rule.
    

Edit an existing policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Right click an existing policy and select Edit.
    
3.  Add your new profile to the policy rule.
    

Create a new policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Click Add Policy.
    
3.  Configure a new policy that includes your new profile.
    

###### macOS

1.  Add a new profile and define basic settings.
    
    1.  From Cortex Cloud, select Inventory → Endpoints → Policy Management → Prevention → Profiles. Click +Add Profile, and select whether to create a new profile or import a profile from a file.
        
        **Note:**
        
        New profiles based on imported profiles are added, and do not replace existing ones.
        
    2.  Select the macOS platform, and Restrictions as the profile type.
        
    3.  Click Next.
        
    4.  For Profile Name, enter a unique name for the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name will be visible from the list of profiles when you configure a policy rule.
        
    5.  For Description, to provide additional context for the purpose or business reason for creating the profile, enter a profile description. For example, you might include a case identification number or a link to a help desk ticket.
        
2.  Configure Custom Prevention Rules.
    
    | Item | Option | More details |
    | :-- | :-- | :-- |
    | Action Mode | Enabled; Disabled | When user-defined BIOC prevention rules are present in the system, you can enable them here. Ensure that the user-defined BIOC prevention rules that you want to enable only contain the following: **Investigation types:** file_event; process_execution; remote_code_execution; network_event; windows_event_log; module_event **Subtypes:** file_event; network_event; registry_event; windows_event_log Other event subtypes are not supported here, and rules containing them will not be available for selection. \*\*Note:\*\* Configure custom BIOC prevention rules here: |
    
3.  To save the profile, click Create.
    

What to do next

If you are ready to apply your new profile to endpoints, you do this by adding it to a policy rule. If you still need to define other profiles, you can do this later. During policy rule creation or editing, you select the endpoints to which to assign the policy. There are different ways of doing this, such as:

Create a policy rule from the Prevention Profiles page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Profiles.
    
2.  Right-click your new profile, and select Create a new policy rule using this profile.
    
3.  Configure the policy rule.
    

Edit an existing policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Right click an existing policy and select Edit.
    
3.  Add your new profile to the policy rule.
    

Create a new policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Click Add Policy.
    
3.  Configure a new policy that includes your new profile.
    

###### Linux

1.  Add a new profile and define basic settings.
    
    1.  From Cortex Cloud, select Inventory → Endpoints → Policy Management → Prevention → Profiles. Click +Add Profile, and select whether to create a new profile or import a profile from a file.
        
        **Note:**
        
        New profiles based on imported profiles are added, and do not replace existing ones.
        
    2.  Select the Linux platform, and Restrictions as the profile type.
        
    3.  Click Next.
        
    4.  For Profile Name, enter a unique name for the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name will be visible from the list of profiles when you configure a policy rule.
        
    5.  For Description, to provide additional context for the purpose or business reason for creating the profile, enter a profile description. For example, you might include a case identification number or a link to a help desk ticket.
        
2.  Configure Custom Prevention Rules.
    
    | Item | Option | More details |
    | :-- | :-- | :-- |
    | Action Mode | Enabled; Disabled | When user-defined BIOC prevention rules are present in the system, you can enable them here. Ensure that the user-defined BIOC prevention rules that you want to enable only contain the following: **Investigation types:** file_event; process_execution; remote_code_execution; network_event; windows_event_log; module_event **Subtypes:** file_event; network_event; registry_event; windows_event_log Other event subtypes are not supported here, and rules containing them will not be available for selection. \*\*Note:\*\* Configure custom BIOC prevention rules here: |
    
3.  To save the profile, click Create.
    

What to do next

If you are ready to apply your new profile to endpoints, you do this by adding it to a policy rule. If you still need to define other profiles, you can do this later. During policy rule creation or editing, you select the endpoints to which to assign the policy. There are different ways of doing this, such as:

Create a policy rule from the Prevention Profiles page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Profiles.
    
2.  Right-click your new profile, and select Create a new policy rule using this profile.
    
3.  Configure the policy rule.
    

Edit an existing policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Right click an existing policy and select Edit.
    
3.  Add your new profile to the policy rule.
    

Create a new policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Click Add Policy.
    
3.  Configure a new policy that includes your new profile.
    

###### Serverless Function

The profile configuration for serverless functions provides runtime protection across processes, networking and file type resources in your cloud environment.

The configuration of each of the resources is based on allow/deny lists.

-   Denied list (default): The system allows all resources to go through.
    
-   Denied with exceptions: The system allows all resources to go through except those specified in the list.
    
-   Allowed list : The system denies all resources to go through.
    
-   Allowed with exceptions: The system denies all resources to go through except those specified in the list.
    

1.  Add a new profile and define basic settings.
    
    1.  From Cortex Cloud, select Inventory → Endpoints → Policy Management → Prevention → Profiles. Click +Add Profile, and select whether to create a new profile or import a profile from a file.
        
        **Note:**
        
        New profiles based on imported profiles are added, and do not replace existing ones.
        
    2.  Select the Serverless Function platform, and Restrictions as the profile type and then click Next.
        
    3.  For Profile Name, enter a unique name for the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name will be visible from the list of profiles when you configure a policy rule.
        
    4.  For Description, to provide additional context for the purpose or business reason for creating the profile, enter a profile description.
        
2.  Configure Restrictions.
    
    | Item | Method | Setting details |
    | --- | --- | --- |
    | Process List | Allowed list Denied list | Add process Example 22.  `curl`  
     |
    | Networking | Allowed list Denied list |  |
    | Listing Ports |  | Add ports Example 23.  8080 8080-8083 - for range  
     |
    | Outbound Internet Ports |  | Add ports Example 24.  22 22-25 - for range  
     |
    | Outbound IPs |  | Add IPs Example 25.  198.51.100.0/24 198.51.100.1  
     |
    | Domains |  | Add domains Example 26.  example.com \*ample.co\* \* - for all domains. \*\*Note:\*\* Wildcards are supported.  
     |
    | Files & Folders | Allowed list Denied list | Add file paths and/or folders Example 27.  `/tmp/example/`  
     |
    

What to do next

If you are ready to apply your new profile to endpoints, you do this by adding it to a policy rule. If you still need to define other profiles, you can do this later. During policy rule creation or editing, you select the endpoints to which to assign the policy. There are different ways of doing this, such as:

Create a policy rule from the Prevention Profiles page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Profiles.
    
2.  Right-click your new profile, and select Create a new policy rule using this profile.
    
3.  Configure the policy rule.
    

Edit an existing policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Right click an existing policy and select Edit.
    
3.  Add your new profile to the policy rule.
    

Create a new policy rule from the Policy Rules page

1.  Navigate to Inventory → Endpoints → Policy Management → Prevention → Policy Rules.
    
2.  Click Add Policy.
    
3.  Configure a new policy that includes your new profile.

##### Set up exception profiles and rules

Exception profiles can be configured to override security policies for known processes, files, digital signers, URLs, BTP rules, telephone numbers, and other exceptions.

Exception profiles override the security policy in scenarios such as:

-   Allow a process or a file to run on an endpoint
    
-   Allow a known digital signer
    
-   Allow access to specific URLs (via Safari) or telephone numbers
    
-   Disable a specific behavioral threat protection (BTP) rule
    
-   Import exceptions from the Cortex Cloud support team

###### Exception configuration

Learn how to configure exceptions from your baseline policy.

To allow full granularity, Cortex Cloud enables you to create exceptions from your baseline policy. With these exceptions, you can remove specific folders or paths from evaluation, or disable specific security modules. You can configure exception rules for Cortex Cloud protection and prevention actions in a centralized location, and apply them across multiple profiles. The exceptions can be configured from Settings → Exception Configuration.

-   Issue Exclusion rules specify match criteria for issues that you want to suppress.
    
-   IOC/BIOC Suppression rules exclude one or more indicators from an IOC or BIOC rule that takes action on specific behaviors.
    
-   Disable Injection and Prevention rules specify exceptions that bypasses a process from prevention modules and injections.
    
-   Disable Prevention rules specify granular exceptions to prevention actions triggered for your endpoints.
    
-   Legacy Agent Exceptions define prevention profile exception rules for all endpoints.
    
-   Support Exception rules generate exceptions based on files provided by the support team.
    

To manage the Prevention profile exceptions from Exception Configuration, you must first migrate your existing exceptions configured via profiles. Your existing exception profiles are migrated per module.

Cortex Cloud simulates the migration to enable you to review the results before activating the migration.

How to migrate existing exceptions

1.  Select Settings → Exception Configuration → Legacy Exceptions and click Start Simulation.
    
2.  Review the Legacy Agent Exceptions and the Support Exception Rules.
    
3.  You can then Activate the new agent management page or Cancel to continue using the Prevention Profiles to configure individual exceptions.
    

**Important:**

If you don't migrate the legacy exceptions, you can continue to create exceptions through the profiles.

-   Add a new exceptions security profile
    
-   Add a global endpoint policy exception
    
-   Set up exploit prevention profiles
    
-   Set up malware prevention profilesSet up malware prevention profiles
    
-   Set up restrictions prevention profiles
    

After the migration, you can Add a support exception rule or Add a legacy exception rule.

###### Issue exclusions

Learn how to review and manage issue exclusions.

The Settings → Exception Configuration → Issue Exclusions page displays the issue exclusion rules in Cortex Cloud.

An Issue Exclusion is a rule that contains a set of issue match criteria for issues that you want to suppress in Cortex Cloud. You can add an Issue Exclusion rule from scratch, or base the exclusion on issues that you investigate in a case. After you create an exclusion rule, Cortex Cloud excludes the issues that match the criteria from cases and search query results, and no longer saves any of the matching issues that are generated in the future. If you select to apply the policy to historic results as well as future alerts, Cortex Cloud displays the historic alerts as unavailable.

**Note:**

-   The agent continues to generate excluded issues on the endpoint, but they are not saved or displayed in Cortex Cloud. Configuration of an issue exclusion does not remove or delete any of the logs that would have triggered the issue notification.
    
-   You can also set up issue exceptions by creating global endpoint policy exceptions. For more information, see Add a global endpoint policy exception.
    

The following table describes both the default fields and additional optional fields that you can add to the issue exclusions table, and lists the fields in alphabetical order.

| Field | Description |
| --- | --- |
| ☐ | Checkbox to select one or more issue exclusions on which you want to perform actions. |
| Backward Scan Status | Exclusion policy status for historic data, either enabled if you want to apply the policy to previous issues, or disabled if you don’t want to apply the policy to previous issues. |
| Comment | Administrator-provided comment that describes the purpose or reason for the exclusion policy. |
| Description | Text summary of the policy that displays the match criteria. |
| Modification Date | Date and time when the exclusion policy was created or modified. |
| Name | Descriptive name provided to identify the exclusion policy. |
| Policy ID | Unique ID assigned to the exclusion policy. |
| Status | Exclusion policy status, either enabled or disabled. |
| User | User that last modified the exclusion policy. |
| User Email | The administrative user's email address. |

###### Add an issue exclusion rule

Learn how to create a rule to exclude certain criteria from displaying issue notifications in Cortex Cloud.

Through the process of triaging issues or resolving a case, you may determine that a specific issue does not indicate a threat. If you want Cortex Cloud to exclude the display of issues that match certain criteria, you can create an issue exclusion rule.

After you create an exclusion rule, Cortex Cloud hides any future issues that match the criteria, and excludes the issues from cases and search query results. If you choose to apply the rule to historic results as well as future issues, the app marks any historic issues as unavailable.

**Note:**

If a case only contains issues with exclusions, Cortex Cloud changes the case status to Resolved - False Positive and sends an email notification to the issue assignee (if set).

There are two ways to create an exclusion rule. You can define the exclusion criteria when you investigate a case, or you can create an issue exclusion from scratch.

**Note:**

You can also set up issue exceptions by creating global endpoint policy exceptions. For more information, see Add a global endpoint policy exception.Add a global endpoint policy exception

Issue exclusions support Scope-Based Access Control (SBAC). For more information, see Manage user scope.Manage user scope

The following parameters are considered when editing a rule:

-   If Scope-Based Access Control (SBAC) is enabled and Endpoint Scoping Mode is set to restrictive mode, you can edit a rule if you are scoped to all tags in the rule.
    
-   If Scope-Based Access Control (SBAC) is enabled and Endpoint Scoping Mode is set to permissive mode, you can edit a rule if you are scoped to at least one tag listed in the rule.
    
-   If a rule was added when set to restrictive mode, and then changed to permissive (or vice versa), you will only have view permissions.
    

###### Build an issue exclusion policy from issues in a case

If after reviewing the case details, you want to suppress one or more issues from appearing in the future, create an exclusion policy based on the issues in the case. When you create a case from the Cases view, you can define the criteria based on the issues in the case. If desired, you can also create an issue exclusion policy from scratch.

1.  On the Cases page, expand the case, click the case's menu icon and, select Create Exclusion.
    
2.  Enter a name for your issue exclusion rule.
    
3.  Describe the reason or purpose of the rule.
    
4.  Use the issue filters to add any match criteria for the issue exclusion policy.
    
    You can also right-click a specific value in the issue to add it as match criteria. The app refreshes, to show you which issues in the case will be excluded. To see all matching issues, including those not related to the case, clear the option to Show only issues in the named case.
    
5.  Click Create to create the exclusion rule and confirm the action.
    
    If you need to make changes later, you can view, modify, or delete the exclusion rule from the Settings → Exception Configuration → Issue Exclusions page.
    

###### Build an issue exclusion rule from scratch

Build your own issue exclusion rule.

1.  Select Settings → Exception Configuration → Issue Exclusions.
    
2.  Select \+ Add an Issue Exclusion Rule.
    
3.  Enter a name for your issue exclusion rule.
    
4.  Describe the reason or purpose of the rule.
    
5.  Define the exclusion criteria.
    
    -   Use the filters at the top of the table to build your exclusion criteria.
        
    -   Use existing issue values to populate your exclusion criteria. To do so, right-click the column value on which you want to base your rule, and select Add issues with <value> to configuration.
        
    
    As you define the criteria, the app filters the results to display matches.
    
6.  Review the results.
    
    The issues in the table will be excluded from appearing in the app after the rule is created, and optionally, any existing issue matches will be displayed as unavailable.
    
    **Caution:**
    
    This action is irreversible. All historically excluded issues will remain excluded if you disable or delete the rule.
    
7.  Click Create to create the issue exception rule.

###### Add an IOC or BIOC rule exception

Learn how to add an IOC or BIOC rule exception.

If you want to create a rule to take action on specific behaviors but also want to exclude one or more indicators from the rule, you can create an IOC or BIOC rule exception. An indicator can include the SHA256 hash of a process, process name, process path, vendor name, user name, causality group owner (CGO) full path, or process command-line arguments. For more information about these indicators, see What are detection rules?. For each exception, you also specify the rule scope to which the exception applies.

In case you need to map fields returned in an XQL process query to your exception configuration, the following table provides a matrix for the criteria mentioned in this procedure to the fields returned in a process query.

| IOC/BIOC suppression rule conditions | Process query result fields |
| --- | --- |
| Process Sha256 | actor_process_image_sha256 |
| Process Name | actor_process_image_name |
| Process Path | actor_process_image_path |
| Signed By Vendor | actor_process_signature_vendor |
| User Name | actor_effective_username |
| Cgo Full Path | actor_process_command_line |
| Process Cmd   | causality_actor_process_image_path |

**Note:**

Cortex Cloud only supports exceptions with one attribute. See Add an alert exclusion rule to create advanced exceptions based on your filtered criteria.Add an alert exclusion rule

1.  Select Settings → Exceptions Configuration → IOC/BIOC Suppression Rules.
    
2.  Click \+ New Exception.
    
3.  Specify a rule name and an optional description.
    
4.  Configure the indicators and conditions that define the exception.
    
    You can use wildcards to match the command line.
    
5.  Select the scope of the exception, whether the exception applies to IOCs, BIOCs, or both.
    
    By default, all BIOC rules that match the criteria are excluded. To exclude only specific BIOC rules, select them from the provided rule list. You can add multiple rules.
    
6.  Save the exception rule.
    
    By default, activity matching the indicators does not trigger any rule. As an alternative, you can select one or more rules. After you save the exception, the Exceptions count for the rule increments. If you edit the rule later, you will also see the exception defined in the rule summary.
    

###### Export a rule exception

You can choose to export a BIOC rule exception.

1.  Select Settings → Exceptions Configuration → IOC/BIOC Suppression Rules.
    
2.  In the Exceptions table, locate the exception rule you want to export. You can select multiple rules.
    
3.  Right-click the rule or rules, and select Export.
    
    If one or more of the selected exceptions are applied to a specific BIOC rule, select one of the following options:
    
    -   Export anyway
        
    -   Export only non-specific Exceptions: Only export exceptions are applied on all BIOC rules
        
    -   Export all Exceptions as non-specific: Export and apply specific exceptions to BIOC rules

###### Add a disable prevention rule for endpoints

You can create granular exceptions to prevention actions defined for your endpoints.

You can create granular exceptions to prevention actions defined for your endpoints. In your disable prevention rules, you can specify hash types, file/folder paths, signers, certificate thumbprint, command line, or processes to exclude from the prevention actions triggered by specific security modules. These rules may be useful when you have processes that are essential to your organization, and must not be terminated. To cover all your endpoints, you can configure different exception rules per platform. Cortex Cloud still generates issues from the disabled rules.

**Important:**

-   All applicable prevention actions are skipped for the files and process that match the properties defined in the rule.
    
-   Consider the consequences of disabling a prevention rule before you add the exception, and monitor it over time.
    
-   You can only apply a Disable Prevention Rule to endpoints running Cortex XDR agents version 7.9 and later.
    

1.  Go to Settings → Exception Configuration → Disable Prevention Rules.
    
2.  Click +Add Rule.
    
3.  For Rule Name, enter a meaningful name for the rule.
    
4.  (Optional) Enter a description for the business reason or intent for the rule.
    
5.  Click Next.
    
6.  For Platform, select the operating system that you require.
    
7.  Under Target Properties, you can configure any combination of parameters. If a parameter is not specified, all values are allowed.
    
    When you specify two or more values, the exception is applied only if the file satisfies all the specified target properties.
    
    You can use wildcards for matching the Command Line or Files/Folders path.
    
    -   **Hash:** enter a specific SHA256 hash
        
    -   **Files/Folders:** specify the path to the required files or folders
        
    -   **Command Line:** specify a command line argument
        
    -   **Signer Name:** specify a trusted signer
        
    -   **Certificate Thumbprint:** specify a certificate thumbprint
        
    
8.  For Modules, select one or more security modules that won't trigger prevention actions.
    
    The actions triggered by the other modules are not affected.
    
9.  For Scope, select the scope for the rule:
    
    -   If you want to apply the rule to all endpoints, select Global (all endpoints).
        
    -   If you want to apply the rule to only specific exception profiles, click Exception Profiles, and then select them from the list.
        
    
10.  Click Next.
     
11.  Review the configurations for the exception, and if the risks are acceptable to you, select I understand the risk, and then click Create.

###### Add a disable injection and prevention rule

You can generate a temporary exception to bypass a process from prevention modules and injections.

You can generate a temporary exception to bypass a process from prevention modules and injections. You can specify paths, or command line, from both prevention and injection. This may be useful when you have processes that are essential to your organization and must not be terminated. Cortex Cloud still generates issues from data collections.

**Important:**

-   Exceptions are limited up to 48 hours by default and configurable up to one week.
    
-   Consider the consequences of disabling a prevention rule before you add the exception and monitor it over time.
    
-   You can only apply a Disable Prevention Rule to agents version 7.9 and later.
    

1.  Select Settings → Exception Configuration → Disable Injection and Prevention.
    
2.  Click +Add Injection Rule.
    
3.  Specify a rule name and an optional description.
    
4.  Select the platform. To cover all your endpoints, you can prevent different exception rules per platform.
    
5.  Add the Process Name , and specify the Path to bypass.
    
6.  Select the time limit for the exception rule.
    
7.  Select the Scope for the rule. If you want to apply the rule to only specific Exception Profiles, select them from the list.
    
8.  Enable the rule.
    
9.  Click Yes, to confirm that you acknowledge that the selected rules will be disabled.

###### Add a support exception rule for endpoints

Learn how to add a support exception rule.

You can define and manage exceptions based on files received from the customer support team. You can apply the rule across all of your endpoints or to specific profiles.

Keep in mind the following:

To manage the prevention profile exceptions from Exception Configuration, you must first migrate your existing exceptions configured via the Prevention profiles.

Your migrated rules are displayed on the Settings → Exception Configurations → Support Exception Rules page. For more information about the migration, see Exception configuration.Exception configuration

1.  From Settings → Exception Configuration → Support Exception Rules, click \+ Import from file.
    
2.  Locate the JSON file you received from the customer support team.
    
3.  Select to apply the rule to specific Profiles or select Global to apply to all endpoints.
    

**Important:**

If you don't migrate the legacy exceptions, you can continue to create exceptions through the profiles.

-   Add a new exceptions security profile
    
-   Add a global endpoint policy exception
    
-   Set up exploit prevention profiles
    
-   Set up malware prevention profilesSet up malware prevention profiles
    
-   Set up restrictions prevention profiles

###### Add a legacy exception rule for endpoints

Learn how to use Cortex Cloud Legacy Exception rules to configure an exception to prevention and protection modules on endpoints for selected profiles.

Legacy Exception rules enable you to configure an exception to prevention and protection modules on endpoints for selected profiles.

Items included in allow lists may continue to generate Cortex Cloud security events. If you want to exclude event reporting, configure this on the Issue Exclusions page (Settings → Exception Configurations → Issue Exclusions).

Keep in mind the following:

To manage the prevention profile exceptions from Exception Configuration, you must first migrate your existing exceptions configured via the prevention profiles.

Your migrated rules are displayed on the Settings → Exception Configurations → Legacy Agent Exceptions page. For more information about the migration, see Exception configuration.Exception configuration

1.  Select Settings → Exception Configurations → Legacy Agent Exceptions, and then click \+ Add Rule.
    
2.  Select the platform for which you want to create an agent exception.
    
3.  Select the module for which you want to create an exception. Optionally, select Select all to apply the exception to all profiles for this module or select specific profiles.
    
    | Type | Module | Platform | Parameters |
    | --- | --- | --- | --- |
    | Malware | Respond to Malicious Causality Chains | Windows, MacOS | Add to your allow list specific and known safe IP address or IP address ranges that you do not want Cortex Cloud to block. |
    |  | Behavioral Threat Protection | Windows, MacOS, Linux | Add to your allow list the file or folder path you want to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Office Files with Micros Examination | Windows | Add to your allow list the file or folder path you want to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Portable Executable and DLL Examination | Windows | Add to your allow list the file or folder path and the signers you want to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Malicious Child Process Protection | Windows, MacOS, Linux | Add to your allow list the parent processes that can launch child processes to your allow list with optional execution criteria. Specify the allow list criteria including the Parent Process Name, Child Process Name, and Command Line Params. Use ? to match a single character or \* to match any string of characters. |
    |  | Endpoint Scanning | Windows, MacOS, Linux | Add to your allow list the file or folder path and the signers you want to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |   | PDF Examination | Windows | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Credential Gathering Protection | Windows, MacOS, Linux | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Anti Webshell Protection | Windows, MacOS, Linux | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Financial Malware Threat Protection | Windows, MacOS, Linux | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Cryptominers Protection | Windows, MacOS, Linux | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | In-process Shellcode Protection | Windows | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Malicious Device Prevention | Windows | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | UAC Bypass Prevention | Windows | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Anti Tampering Protection | Windows, MacOS | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | UEFI Protection | Windows | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | PowerShell Script Files | Windows | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Mach-O Execution Examination | MacOS | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Mach-O Loading Examination | MacOS | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | DMG File Examination | MacOS | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Local File Threat Examination | Linux | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | ELF File Examination | Linux | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Reverse Shell Protection | Linux | Specify the Process Path. Local IP Address and port, and the Remote IP Address and port of the process you want to allow. Use ? to match a single character or \* to match any string of characters. |
    |  | Loaded Kernel Modules Examination | Linux | Add to your allow list the file or folder paths to exclude from evaluation.Use ? to match a single character or \* to match any string of characters. Please note that the exception applies to the kernel module, not the process that loads it. |
    |  | APK Files Examination | Android | Specify the signers you want to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | SMS and MMS Malicious URL filtering Allow list | iOS | Add to your allow list and known safe URLs that you do not want Cortex Cloud to block. |
    |  | Call and Messages Blocking Allow list | iOS | Add to your allow list names and phone numbers of contacts that you do not want Cortex Cloud to block. |
    |  | Dynamic Kernel Protection | Windows | Add to your allow list the file or folder path you want to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | ASP and ASPX File Examination | Windows | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | VB Scripts Examination | Windows | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | JScript File Examination | Windows | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | LDAP Query Protection | Windows | Add to your allow list specific and known safe IP address or IP address ranges that you do not want Cortex Cloud to block. Add to your allow list users whom you do not want to block. |
    |  | Operational Agent Exceptions | Windows | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. \*\*Note:\*\* This exception prevents the agent from examining the specified file. Use with caution, as it may unintentionally allow unwanted or malicious behavior to go undetected. |
    |  | Portable executable files (Windows) | Linux | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Mach-O files (macOS) | Linux | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    | Restrictions | Executable Files | Windows | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Network Location Files | Windows | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Optical Drive Files | Windows | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Removable Media Files | Windows | Add to your allow list the file or folder paths to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    | Exceptions | Process Exceptions | Windows, MacOS, Linux | Add to your allow list the process and the module names to exclude from evaluation. Use ? to match a single character or \* to match any string of characters. |
    |  | Operational Agent Exceptions | Windows | This option excludes any intervention from a given list of processes, which are specified by their full path. When you create this exception rule, it will disable the following modules: **All** anti-exploitation modules for the process.; **All** anti-malware modules, by disabling triggers such as on-execution, on-load, on-access, on-write, and on-demand.; \***Most** event collection operations based on tracking the process (\*some event collection operations might still occur, such as process events). Perform these steps: For Target Properties Process Path, enter the path of the process that you want to exclude, and press ENTER. To add additional processes, repeat this step.; For Scope, select a rule scope.-   Global: Apply this rule to all profiles; Profiles (existing or new): Apply this rule to a specific profile, or to multiple profiles. You can create a new profile from here, if necessary.
    ; Go to step 6. |
    
4.  For each module, enter the file or folder path that you want to add to the exception rule, and press ENTER. Repeat this step to add additional paths to the rule.
    
5.  Select the endpoint profiles to which you want to apply this rule.
    
6.  Click Next.
    
7.  Review the rule, and then select the warning message checkbox.
    
8.  Click Create.
    

**Important:**

If you don't migrate the legacy exceptions, you can continue to create exceptions through the profiles.

-   Add a new exceptions security profile
    
-   Add a global endpoint policy exception
    
-   Set up exploit prevention profiles
    
-   Set up malware prevention profilesSet up malware prevention profiles
    
-   Set up restrictions prevention profiles

###### Add a new exceptions security profile

Learn how to add a new exceptions security profile.

You can configure exceptions that apply to specific groups of endpoints or you can add a global endpoint policy exception.

**Important:**

To manage the exceptions from Exception Configuration, you must first migrate your existing exceptions configured via the exceptions security profiles.

To create new exception security profile rules using the Legacy Agent Exceptions management page, see Add a legacy exception rule for endpoints.

If you don't migrate the legacy exceptions, you can continue to create exceptions as described below.

How to create an endpoint-specific exception

1.  Add a new profile.
    
    1.  From Cortex Cloud, select Inventory → Endpoints → Policy Management → Prevention → Profiles → +Add Profile and select whether to Create New or Import from File a new profile.
        
        **Note:**
        
        New imported profiles are added and not replaced.
        
    2.  Select the platform to which the profile applies and Exceptions as the profile type.
        
    3.  Click Next.
        
2.  Define the basic settings.
    
    1.  Select a unique Profile Name to identify the profile. The name can contain only letters, numbers, or spaces, and must be no more than 30 characters. The name will be visible from the list of profiles when you configure a policy rule.
        
    2.  To provide additional context for the purpose or business reason for creating the profile, specify a profile Description. For example, you might include a case identification number or a link to a help desk ticket.
        
3.  Configure the exceptions profile.
    
    Configure a process exception
    
    1.  Select the operating system.
        
    2.  Enter the name of the process.
        
    3.  Select one or more endpoint protection modules that will allow this process to run. The modules displayed in the list are the modules relevant to the operating system defined for this profile.
        
        -   To apply the process exception on all security modules, Select all.
            
        -   To apply the process exception on the following exploit modules, select Disable Injection.
            
            APC Guard, CPL Execution Protection, DEP, DLL Hijacking Protection, DLL Security, EPM D02, Exception Heap Spray Check, Exception SysExist Check, Exploit Kit Fingerprinting Protection, Font Protection, Hot Patch Protection, JIT Mitigation, Library Preallocation, Memory Limit Heap Spray Check, Null Dereference Protection, Password Theft Protection, ROP Mitigation, SEH Protection, Shellcode Preallocation, UASLR
            
        
    4.  Click the adjacent arrow.
        
    5.  After you've added all the processes, select Create.
        
        You can return to the Process Execution profile from the Endpoint Profile page at any point and edit the settings. For example, if you want to add or remove security modules.
        
    
    Configure a support exception
    
    1.  Import the json file you received from the Palo Alto Networks support team by either browsing for it in your files or by dragging the file on the page.
        
    2.  Click Create.
        
    
    Configure module-specific exceptions relevant for the selected profile platform
    
    -   Behavioral Threat Protection Rule Exception: When you view an alert for a Behavioral Threat event that you want to allow in your network from now on, right-click the alert and Create alert exception. Review the alert data (Platform and Rule name) and select from the following options as needed.
        
        -   CGO hash: Causality Group Owner (CGO) hash value
            
        -   CGO signer: CGO signer entity (for Windows and Mac only)
            
        -   CGO process path: Directory path of the CGO process
            
        -   CGO command arguments: CGO command arguments. This option is available only if CGO process path is selected, and only if you are using Cortex XDR Agent 7.5 or later on your endpoints. After selecting this option, check the full path of each relevant command argument within quote marks. You can edit the displayed paths if needed.
            
        
        From Exception Scope, select Profile and click Create.
        
    -   Digital Signer Exception: When you view an issue for a Digital Signer Restriction that you want to allow in your network from now on, right-click the issue and Create issue exception. Cortex Cloud displays the issue data (Platform, Signer, and Generating Issue ID). Select Exception Scope: Profile and select the exception profile name. Click Add.
        
    -   Java Deserialization Exception: When you identify a Suspicious Input Deserialization issue that you believe to be benign and want to suppress future issues, right-click the issue and Create issue exception. Cortex Cloud displays the issue data (Platform, Process, Java executable, and Generating Issue ID). Select Exception Scope: Profile and select the exception profile name. Click Add.
        
    -   Local File Threat Examination Exception: When you view an issue for a PHP file that you want to allow in your network from now on, right-click the issue and Create issue exception. Cortex Cloud displays the issue data (Process, Path, and Hash). Select Exception Scope: Profile and select the exception profile name. Click Add.
        
    -   Gatekeeper Enhancement Exception: When you view a Gatekeeper Enhancement security issue for a bundle or specific source-child combination you want to allow in your network from now on, right-click the issue and Create issue exception. Cortex Cloud displays the issue data (Platform, Source Process, Target Process, and Issue ID). Select Exception Scope: Profile and select the exception profile name. Click Add. This exception allows Cortex Cloud to continue enforcing the Gatekeeper Enhancement protection module on the source process running other child processes.
        
    
    At any point, you can click the Generating Issue ID to return to the original issue from which the exception originated. You cannot edit module specific exceptions.
    
4.  Apply profiles to endpoints.
    
    If you want to remove an exceptions profile from your network, go to the Profiles page, right-click, and select Delete.

###### Add a global endpoint policy exception

Learn how to define and manage global endpoint policy exceptions in Cortex Cloud.

As an alternative to adding an endpoint-specific exception in policy rules, you can define and manage global exceptions that apply across all of your endpoints. On the Global Exception page, you can manage all the global exceptions in your organization for all platforms. Profiles associated with one or more targets that are beyond your defined user scope are locked and cannot be edited.

**Important:**

-   To manage the prevention profile exceptions from Exception Configuration, you must first migrate your existing exceptions configured via the Global exceptions.
    
-   Your migrated rules are displayed on the Settings → Exception Configurations → Legacy Agent Exceptions page. For more information about the migration, see Exception configuration.Exception configuration
    
-   To create new global endpoint policy exceptions using the Legacy Agent Exceptions page, see Add a legacy exception rule for endpoints.
    
-   If you don't migrate the legacy exceptions, you can continue to add exceptions as described below.
    

Add a global process exception

Configure exception rules forCortex Cloud protection and prevention actions in a centralized location, and apply them across multiple profiles.

1.  Go to Inventory → Endpoints → Policy Management → Policy Exceptions.
    
2.  Select Process exceptions.
    
    1.  Select the operating system.
        
    2.  Enter the name of the process.
        
    3.  Select one or more Endpoint Protection Modules that will allow this process to run. The modules displayed on the list are the modules relevant to the operating system defined for this profile. To apply the process exception on all security modules, Select all. To apply the process exception on all exploit security modules, select Disable Injection. Click the adjacent arrow to add the exception.
        
3.  After you add all exceptions, Save your changes.
    
    The new process exception is added to the Global Exceptions in your network and will be applied across all rules and policies. To edit the exception, select it and click the edit icon. To delete it, select it and click the delete icon.
    

Add a global support exception

Configure support exception rules for Cortex Cloud protection and prevention actions in a centralized location, and apply them across multiple profiles.

1.  Go to Inventory → Endpoints → Prevention → Global Exceptions.
    
2.  Select Support Exceptions.
    
    Import the JSON file you received from the Palo Alto NetworksPalo Alto Networks support team by either browsing for it in your files or by dragging and dropping the file on the page.
    
3.  Click Save.
    
    The new support exception is added to the Global Exceptions in your network and will be applied across all rules and policies.
    

Add a global behavioral threat protection rule exception

When you view a Behavioral Threat issue in the Issues table which you want to allow across your organization, you can create a global exception for that rule.

1.  Right-click the BTP issue and select Create issue exception.
    
2.  Review the issue metadata (platform and rule name) and then select from the following options as needed:
    
    1.  CGO hash Causality Group Owner (CGO) hash value.
        
    2.  CGO signer: CGO signer entity (for Windows and Mac only).
        
    3.  CGO process path: Directory path of the CGO process.
        
    4.  CGO command arguments: CGO command arguments. This option is available only if CGO process path is selected, and only if you are using Cortex XDR Agent 7.5 or later on your endpoints. After selecting this option, check the full path of each relevant command argument within quote marks. You can edit the displayed paths if needed.
        
    5.  From Exception Scope, select Global.
        
3.  Click Create.
    
    The relevant BTP exception is added to the Global Exceptions in your network and will be applied across all rules and policies. At any point, you can click the Generating Issue ID to return to the original issue from which the exception originated. To delete a specific global exception, select it and click X.
    
    **Note:**
    
    You cannot edit global exceptions generated from a BTP security event.
    

Add a global credential gathering protection exception

When you view a Credential Gathering Protection issue in the Issues table that you want to allow across your organization, you can create a global exception for that rule.

1.  Right-click the Credential Gathering Protection issue and select Create issue exception.
    
2.  Review the issue data (platform and module name) and then select from the following options as needed:
    
    1.  CGO hash: Causality Group Owner (CGO) hash value.
        
    2.  CGO signer: CGO signer entity (for Windows and Mac only).
        
    3.  CGO process path: Directory path of the CGO process.
        
    4.  CGO command arguments: CGO command arguments. This option is available only if CGO process path is selected. After selecting this option, check the full path of each relevant command argument within quote marks. You can edit the displayed paths if needed.
        
    5.  From Exception Scope, select Global.
        
3.  Click Create.
    
    The relevant exception is added to the Global Exceptions in your network and will be applied across all rules and policies. At any point, you can click the Generating Issue ID to return to the original issue from which the exception originated. To delete a specific global exception, select it and click X.
    
    **Note:**
    
    You cannot edit global exceptions generated from a Credential Gathering Protection security event.
    

Add a global anti webshell protection exception

When you view an Anti Webshell Protection issue in the Issues table that you want to allow across your organization, you can create a global exception for that rule.

1.  Right-click the Anti Webshell Protection issue and select Create issue exception.
    
2.  Review the issue data (platform and module name) and then select from the following options as needed:
    
    1.  CGO hash: Causality Group Owner (CGO) hash value.
        
    2.  CGO signer: CGO signer entity (for Windows and Mac only).
        
    3.  CGO process path: Directory path of the CGO process.
        
    4.  CGO command arguments: CGO command arguments. This option is available only if CGO process path is selected, and only if you are using Cortex XDR Agent 7.5 or later on your endpoints. After selecting this option, check the full path of each relevant command argument within quote marks. You can edit the displayed paths if needed.
        
    5.  From Exception Scope, select Global.
        
3.  Click Create.
    
    The relevant exception is added to the Global Exceptions in your network and will be applied across all rules and policies. At any point, you can click the Generating Issue ID to return to the original issue from which the exception originated. To delete a specific global exception, select it and click X.
    
    **Note:**
    
    You cannot edit global exceptions generated from an Anti Webshell Protection security event.
    

Add a global local analysis rules exception

When you view in the Issues table a Local Analysis issue that was triggered as a result of local analysis rules, you can create a global exception to allow the rules across your organization.

1.  Right-click the issue and select Create issue exception.
    
2.  Review the issue data (platform and rule name) and select Exception Scope:Global.
    
3.  Click Add.
    
    The relevant Local Analysis Rules exception is added to the Global Exceptions in your network and will be applied across all rules and policies. The exception allows all the rules that triggered the issue, and you cannot choose to allow only specific rules within the issue. At any point, you can click the Generating Issue ID to return to the original issue from which the exception originated. To delete a specific global exception, select it and click X. You cannot edit global exceptions generated from a local analysis security event.
    

Review advanced analysis exceptions

With Advanced Analysis, Cortex Cloud can provide a secondary validation of Cortex XDR agent issues raised by exploit protection modules. To perform the additional analysis, Cortex Cloud analyzes issue data sent by the Cortex XDR agent. If Advanced Analysis indicates an issue is benign, Cortex Cloud can automatically create exceptions and distribute the updated security policy to your endpoints.

By enabling Cortex Cloud to automatically create and distribute global exceptions you can minimize disruption for users when they subsequently encounter the same benign activity. To enable the automatic creation of Advanced Analysis Exceptions, configure the Advanced Analysis options in Settings → Configurations → General → Agent Configurations.

For each exception, Cortex Cloud displays the affected platform, exception name, and the relevant issue ID for which Cortex Cloud determined activity was benign. To drill down into the issue details, click the Generating Issue ID.

Add a global digital signer exception

When you view in the Issues table a Digital Signer Restriction issue for a digital signer you trust and want to allow from now on across your network, create a Global Exception for that digital signer directly from the issue.

1.  Right-click the issue and select Create issue exception.
    
    Review the issue data (Platform, signer, and issue ID) and select Exception Scope:Global.
    
2.  Click Add.
    
    The relevant digital signer exception is added to the Global Exceptions in your network and will be applied across all rules and policies. At any point, you can click the Generating Issue ID to return to the original issue from which the exception originated. To delete a specific global exception, select it and click X. You cannot edit global exceptions generated from a digital signer restriction security event.
    

Add a global java deserialization exception

When you view in the Issues table a Suspicious Input Desensitization issue for a Java executable you want to allow from now on across your network, create a global exception for that executable directly from the issue of the security event that prevented it.

1.  Right-click the issue and select Create issue exception.
    
    Review the issue data (Platform, Process, Java executable, and issue ID) and select Exception Scope: Global.
    
2.  Click Add.
    
    The relevant digital signer exception is added to the Global Exceptions in your network and will be applied across all rules and policies. At any point, you can click the Generating Issue ID to return to the original issue from which the exception originated. To delete a specific global exception, select it and click X. You cannot edit global exceptions generated from a digital signer restriction security event.
    

Add a global local file threat examination exception

When you view in the Issues table a Local Threat Detected issue for a PHP file you want to allow from now on across your network, create a global exception for that file directly from the issue of the security event that prevented it.

1.  Right-click the issue and select Create issue exception.
    
    Review the issue data (Process, Path, and Hash) and select Exception Scope: Global.
    
2.  Click Add.
    
    The relevant PHP file is added to the Global Exceptions in your network and will be applied across all rules and policies. At any point, you can click the Generating Issue ID to return to the original issue from which the exception originated. To delete a specific global exception, select it and click X. You cannot edit global exceptions generated from a local file threat examination exception restriction security event.
    

Add a global gatekeeper enhancement exception

When you view a Gatekeeper Enhancement security issue in the Issues table, you can create a global exception for this specific bundle or source-child combination only, while allowing Cortex Cloud to continue enforcing the Gatekeeper Enhancement protection module on the source process running other child processes.

1.  Right-click the issue and select Create issue exception.
    
    Review the issue data (Platform, Source Process, Target Process, and Issue ID) and select Exception Scope: Global.
    
2.  Click Add.
    
    The relevant source and target processes are added to the Global Exceptions in your network and will be applied across all rules and policies. At any point, you can click the Generating Issue ID to return to the original issue from which the exception originated. To delete a specific global exception, select it and click X. You cannot edit global exceptions generated from a gatekeeper enhancement security event.
    

Import and export exceptions

Select \+ Import/Export to Export your exceptions list and/or Import from File.

**Note:**

The exported file is encoded in Base64 and cannot be edited.

#### Define endpoint groups

Define an endpoint group and then apply policy rules and manage specific endpoints.

You can define an endpoint group and then apply policy rules and manage specific endpoints. If you set up Cloud Identity Engine, you can also leverage your Active Directory user, group, and computer details to define endpoint groups.

Do one of the following:

-   Create a dynamic group by enabling Cortex Cloud to populate your endpoint group dynamically using endpoint characteristics, such as an endpoint tag, partial hostname or alias, full or partial domain or workgroup name, IP address, range or subnets, installation type (VDI, temporary session or standard endpoint), agent version, endpoint type (workstation, server, mobile), user or operating system version.
    
-   Create a static group by selecting a list of specific endpoints.
    

**Note:**

Configuration based on user granular policy is optimized for VDI and session-persistent environments; it is not recommended for decentralized or traditional endpoint architectures.

After you define an endpoint group, you can then use it to target policy and actions to specific recipients. The Endpoint Groups page displays all endpoint groups along with the number of endpoints and policy rules linked to the endpoint group.

How to define an endpoint group

1.  Select Inventory → Endpoints → Groups → +Add Group.
    
2.  Select one of the following:
    
    -   Create New to create an endpoint group from scratch
        
    -   Upload From File using plain text files with a new line separator, to populate a static endpoint group from a file containing IP addresses, hostnames, or aliases.
        
    
3.  Enter a Group Name and optional description to identify the endpoint group. The name you assign to the group will be visible when you assign endpoint security profiles to endpoints.
    
4.  Determine the endpoint properties for creating an endpoint group:
    
    -   Dynamic: Use the filters to define the criteria you want to use to dynamically populate an endpoint group. Dynamic groups support multiple criteria selections and can use AND or OR operators. For endpoint names and aliases, and domains and workgroups, you can use **`*`** to match any string of characters. As you apply filters, Cortex Cloud displays any registered endpoint matches to help you validate your filter criteria.
        
    -   Static: Select specific registered endpoints that you want to include in the endpoint group. Use the filters, as needed, to reduce the number of results.
        
        When you create a static endpoint group from a file, the IP address, hostname, or alias of the endpoint must match an existing agent that has registered with Cortex Cloud. You can select up to 250 endpoints.
        
    
    **Note:**
    
    Disconnecting Cloud Identity Engine in your Cortex Cloud deployment can affect existing endpoint groups and policy rules based on Active Directory properties.
    
5.  Create the endpoint group.
    
    After you save your endpoint group, it is ready for use to assign security profiles to endpoints and in other places where you can use endpoint groups.
    

At any time, you can return to the Groups page to view and manage your endpoint groups. To manage a group, right-click the group and select the desired action:

-   Edit: View the endpoints that match the group definition, and optionally refine the membership criteria using filters.
    
-   Delete: Remove the endpoint group.
    
-   Save as new: Duplicate the endpoint group and save it as a new group.
    
-   Export group: Export the list of endpoints that match the endpoint group criteria to a tab separated values (TSV) file.
    
-   View endpoints: Pivot from an endpoint group to a filtered list of endpoints on the All Endpoints page where you can quickly view and initiate actions on the endpoints within the group.

#### Configure global agent settings

The different Cortex XDR agents that operate on your endpoints require configuration of different global settings.

In addition to the customizable Agent Settings Profiles for each Operating System and different endpoint targets, you can configure global Agent Configurations that apply to all the endpoints in your network.

1.  From Cortex Cloud, select Settings → Configurations → General → Agent Configurations.
    
2.  Set global uninstall password.
    
    The uninstall password is required to remove a Cortex XDR agent and to grant access to the agent security component on the endpoint. You can use the default uninstall **`Password1`** defined in Cortex Cloud or set a new one and Save. This global uninstall password applies to all the endpoints (excluding mobile) in your network. If you change the password later on, the new default password applies to all new and existing profiles to which it applied before. If you want to use a different password to uninstall specific agents, you can override the default global uninstall password by setting a different password for those agents in the Agent Settings profile. The selected password must satisfy the requirements enforced by Password Strength indicator.
    
    A new password must satisfy the following Password Strength indicator requirements:
    
    -   It must be 8 to 32 characters.
        
    -   It must contain at least one upper-case, at least one lower-case letter, at least one number, and at least one of the following characters: **`!@#%`**.
        
    
3.  Manage the content updates bandwidth and frequency in your network.
    
    -   Enable bandwidth control: Palo Alto Networks enables you to control your Cortex XDR agent network consumption by adjusting the bandwidth it is allocated. Based on the number of agents you want to update with content and upgrade packages, active or future agents, the Cortex Cloud calculator configures the recommended amount of Mbps (Megabits per second) required for a connected agent to retrieve a content update over a 24 hour period or a week. Cortex Cloud supports between 20 - 10000 Mbps, you can enter one of the recommended values or enter one of your own. For optimized performance and reduced bandwidth consumption, we recommend that you install and update new agents with the latest version, and include the content package built in using SCCM.
        
    -   Enable minor content version updates: The Cortex Cloud research team releases more frequent content updates in-between major content versions to ensure your network is constantly protected against the latest and newest threats in the wild. Enabled by default, the Cortex XDR agent receives minor content updates, starting with the next content releases. To learn more about the minor content numbering format, refer to the About content updates topic.
        
    
4.  Configure content bandwidth allocated for all endpoints.
    
    To control the amount of bandwidth allocated in your network to Cortex Cloud content updates, assign a Content bandwidth management value between 20-10,000 Mbps. To help you with this calculation, Cortex Cloud recommends the optimal value of Mbps based on the number of active agents in your network, and including overhead considerations for large content updates. Cortex Cloud verifies that agents attempting to download the content update are within the allocated bandwidth before beginning the distribution. If the bandwidth has reached its cap, the download will be refused and the agents will attempt again at a later time. After you set the bandwidth, Save the configuration.
    
5.  Configure the Cortex XDR agent number of parallel upgrades.
    
    If Agent auto upgrades are enabled for your Cortex XDR agents, you can control the automatic upgrade process in your network. To better control the rollout of a new Cortex XDR agent release in your organization, during the first week only a single batch of agents is upgraded. After that, auto-upgrades continue to be deployed across your network with number of parallel upgrades as configured.
    
    -   Amount of Parallel Upgrades: Set the number of parallel agent upgrades, where the maximum is 2000 agents. When you configure this, keep in mind your organization's bandwidth usage and resource consumption.
        
    
6.  Configure automated Advanced Analysis of Cortex XDR Agent alerts raised by exploit protection modules.
    
    Advanced Analysis is an additional verification method you can use to validate the verdict issued by the Cortex XDR agent. In addition, Advanced Analysis also helps Palo Alto Networks researchers tune exploit protection modules for accuracy.
    
    To initiate additional analysis you must retrieve data about the alert from the endpoint. You can do this manually on an alert-by-alert basis or you can enable Cortex Cloud to automatically retrieve the files.
    
    After Cortex Cloud receives the data, it automatically analyzes the memory contents and renders a verdict. When the analysis is complete, Cortex Cloud displays the results in the Advanced Analysis field of the Additional data view for the data retrieval action on the Action Center. If the Advanced Analysis verdict is benign, you can avoid subsequent blocked files for users that encounter the same behavior by enabling Cortex Cloud to automatically create and distribute exceptions based on the Advanced Analysis results.
    
    1.  Configure the desired options:
        
        -   Enable Cortex Cloud to automatically upload defined alert data files for advanced analysis. Advanced Analysis increases the Cortex Cloud exploit protection module accuracy.
            
        -   Automatically apply Advanced Analysis exceptions to your Global Exceptions list. This will apply all Advanced Analysis exceptions suggested by Cortex Cloud, regardless of the alert data file source.
            
        
    2.  Save the Advanced Analysis configuration.
        
7.  Configure the Cortex XDR Agent license revocation and deletion period.
    
    This configuration applies to standard endpoints only and does not impact the license status of agents for VDIs or Temporary Sessions.
    
    1.  Configure the desired options:
        
        -   Connection Lost (Days): Configure the number of days after which the license should be returned when an agent loses the connection to Cortex Cloud. Default is 30 days; Range is 2 to 60 days. Day one is counted as the first 24 hours with no connection.
            
        -   Agent Deletion (Days): Configure the number of days after which the agent and related data is removed from the Cortex Cloud management console and database. Default is 180 days; Range is 3 to 360 days and must exceed the Connection Lost value. Day one is the first 24 hours of lost connection.
            
        
    2.  Click Save to save the Agent Status configuration.
        
8.  Enable WildFire analysis scoring for files with Benign verdicts.
    
    The WildFire analysis score for files with a Benign verdict is used to indicate the level of confidence WildFire has in the Benign verdict. For example, a file by a trusted signer or a file that was tested manually gets a high confidence Benign score, whereas a file that did not display any suspicious behavior at the time of testing gets a lower confidence Benign score. To add an additional verification method to such files, enable this setting. After this, when Cortex Cloud receives a Benign Low Confidence verdict, the agent enforces the Malware Security profile settings you currently have in place (Run local analysis to determine the file verdict, Allow, or Block).
    
    **Note:**
    
    Disabling this capability takes immediate effect on new hashes, fresh agent installations, and existing security policies. It could take up to a week to take effect on existing agents in your environment pending agent caching.
    
9.  Enable Informative BTP Alerts.
    
    Behavioral threat protection (BTP) alerts have been given unique and informative names and descriptions, to provide immediate clarity into the events without having to drill down into each alert. Enable to display of the informative BTP rule alert names and descriptions. After you update the settings, new alerts include the changes while already existing alerts remain unaffected.
    
    **Note:**
    
    If you have any Cortex Cloud filters, starring policies, exclusion policies, scoring rules, log forwarding queries, or automation rules configured for XSOAR/3rd party SIEM, we advise you to update those to support the changes before activating the feature. For example, change the query to include the previous description that is still available in the new description, instead of searching for an exact match.
    
10.  Configure settings for periodic cleanup of duplicate entities in the endpoint administration table.
     
     When enabled, Periodic duplicate cleanup removes all duplicate entries of an endpoint from the endpoint table based on the defined parameters, leaving only the last occurrence of the endpoint reporting to the server. This enables you to streamline and improve the management of your endpoints. For example, when an endpoint reconnects after a hardware change, it may be re-registered, leading to confusion in the endpoint administration table regarding the real status of the endpoint. The cleanup leaves only the latest record of the endpoint in the table.
     
     -   Define whether to clean up according to Host Name, Host IP Address, MAC Address, or any combination of them. If not selected, the default is Host Name. When you select more than one parameter, duplicate entries are removed only if they include all the selected parameters.
         
     -   Configure the frequency of the cleanup: every 6 hours, 12 hours, 1 day, or 7 days. You can also select to perform an immediate One-time cleanup.
         
     
     Data for a deleted endpoint is retained for 90 days since the endpoint’s last connection to the system. If a deleted endpoint reconnects, Cortex Cloud recovers its existing data.

#### Apply profiles to endpoints

Learn how to apply security profiles to your endpoints, depending on the platform used.

Cortex Cloud provides out-of-the-box protection for all registered endpoints with a default security policy customized for each supported platform type. To customize your security policy, create or edit one or more security profiles, and then attach the profiles to a new or existing policy.

Each policy you create must apply to one or more endpoints or endpoint groups. The Prevention Policy Rules table lists all the policy rules per operating system. Rules associated with one or more targets that are beyond your defined user scope are locked and cannot be edited.

1.  From Cortex Cloud, create a policy rule.
    
    Do one of the following:
    
    -   Select Inventory → Endpoints → Policy Management → Prevention → Policy Rules, and select \+ New Policy or Import from File.
        
        **Note:**
        
        When importing a policy, select whether to enable the associated policy targets. Rules within the imported policy are managed as follows:
        
        -   New rules are added to the top of the list.
            
        -   Default rules override the default rule in the target tenant.
            
        -   Rules without a defined target are disabled until the target is specified.
            
        
    -   Select Inventory → Endpoints → Policy Management → Prevention → Profiles, right-click the profile you want to assign and click Create a new policy rule using this profile.
        
    
2.  Define a Policy Name and optional Description that describes the purpose or intent of the policy.
    
3.  Select the Platform for which you want to create a new policy.
    
4.  Select the desired Exploit, Malware, Restrictions, and Agent Settings profiles you want to apply in this policy.
    
    If you do not specify a profile, the Cortex XDR agent uses the default profile.
    
5.  Click Next.
    
6.  Use the filters to assign the policy to one or more endpoints or endpoint groups.
    
    Cortex Cloud automatically applies the platform filter you selected and, if it exists, the Group Name according to the groups within your defined user scope.
    
7.  Click Done.
    
8.  In the Policy Rules table, change the rule position, if needed, to order the policy relative to other policies.
    
    The Cortex XDR agent evaluates policies from top to bottom. When the Cortex XDR agent finds the first match it applies that policy as the active policy. To move the rule, select the arrows and drag the policy to the desired location in the policy hierarchy.
    
    Right-click to select one of the following options: View Policy Details, Edit, Save as New, Disable, and Delete.
    
9.  If you want to export policies, select one or more policies, right-click and select Export Policies. You can include the associated Policy Targets, Global Exceptions, and endpoint groups.
    
    **Note:**
    
    The exported file is encoded in Base64 and cannot be edited.

#### Create an agent installation package

Learn how to create a Cortex XDR agent installation package to deploy to your endpoints.

To install the Cortex XDR agent on the endpoint for the first time, create an agent installation package. Review [Where can I install the Cortex XDR agent](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/Cortex-XDR-Compatibility-Matrix/Where-can-I-install-the-Cortex-XDR-agent) for supported versions and operating systems.

To install the Cortex XDR agent software, you must use a valid installation package that exists in your Cortex Cloud management console. If you delete an installation package, new agents installed from this package are not able to register to Cortex Cloud, however, existing agents may re-register using the Agent ID generated by the installation package.

1.  From Cortex Cloud, select Inventory → Endpoints → Agent Installations.
    
2.  Click Create to create a new installer.
    
3.  Enter a unique name and an optional description to identify the installation package.
    
    The package name can contain letters, numbers, hyphens, underscores, commas, and spaces, and should not exceed 100 characters.
    
4.  Select the Package Type:
    
    -   Standalone Installer: Use for fresh installations and to upgrade agents on a registered endpoint that is connected to Cortex Cloud.
        
    -   Upgrade from ESM: Use this package to upgrade Traps agents which connect to the on-premises Traps Endpoint Security Manager to Cortex Cloud. For more information, see [Migrate from Traps Endpoint Security Manager](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/Migrate-from-Traps/Migrate-from-Traps-Endpoint-Security-Manager).
        
    -   (Linux only) Kubernetes Installer: Use for fresh installations and upgrades of Cortex XDR agents running on Kubernetes clusters.
        
        Guidelines for Kubernetes installer
        
        -   Settings for the Kubernetes installer cannot be changed after you create the installation package.
            
        -   For Version, select the desired Cortex XDR agent version.
            
            If the option Always deploy the latest agent version is displayed, do not select it.
            
        -   For the Agent Daemonset Namespace, it is recommended to use the default cortex-xdr namespace.
            
        -   For a more granular deployment, enter any labels or selectors in the Node Selector. The Cortex XDR agent will be deployed only on these nodes.
            
        -   To configure the Cortex XDR agent to communicate through a proxy, enter either the IP address and port number or enter the FQDN and port number. When you enter the FQDN, you can use both lowercase and uppercase letters. Avoid using special characters or spaces. Use commas to separate multiple addresses.
            
        
    -   Helm Installer: Use this package for fresh installations and upgrades of Cortex XDR agents running on Kubernetes clusters.
        
    -   Serverless Installer: Create an installation package for serverless function to deploy to your runtime platform.
        
        Guidelines for serverless installer
        
        ###### How to create an agent package for serverless function:
        
        1.  From Cortex Cloud, go to Inventory+Endpoints+Installations and click Create.
            
        2.  Add name, description and add any endpoint tags that will be added to the agent as part of the installation process.
            
        3.  For Package Type, select Serverless Function.
            
        4.  Configure the following settings for Serverless Function:
            
            1.  For Version, select the required Cortex agent version.
                
            2.  For Cloud Provider, AWS is configured for this release.
                
            3.  For Runtime, select one of the environments:
                
                -   node.js
                    
                -   python
                    
                
            4.  For Deployment Type, select the type:
                
                -   Embedded
                    
                -   AWS Layers
                    
                
            5.  If node.js and the deployment type, AWS Layers are selected, select one of the Modules:
                
                -   ECMAScript
                    
                -   CommonJS
                    
                
            6.  For Embed Default Profile From, select from the profile rules configured for serverless functions.
                
            
            **Note:**
            
            The profile will be applied if the security policy cannot be retrieved in real-time.
            
        
        The package is created and ready to be deployed.
        
        ###### How to deploy the package to your runtime environment:
        
        1.  From Cortex Cloud, go to Inventory+Endpoints+Installations and from the Agent Installations page, right click and select View Installation Instructions.
            
        2.  Depending on the runtime environment, the instructions are slightly different.
            
            -   Agent installation package for embedded python:
                
                1.  Download the serverless agent bundle.
                    
                2.  Log in to your AWS Management Console.
                    
                3.  Navigate to the AWS Lambda service, and unzip the serverless agent bundle in the main folder.
                    
                4.  Add the serverless agent to the function by importing the Cortex library and wrapping the function’s handler.
                    
                    **Note:**
                    
                    The Cortex serverless library must be imported after other libraries to activate the hooks that enable auditing.
                    
                
            -   Agent installation package for embedded node.js:
                
                1.  Download the serverless agent bundle.
                    
                2.  Log in to your AWS Management Console.
                    
                3.  Navigate to the AWS Lambda service, and unzip the serverless agent bundle in the main folder.
                    
                4.  Add the serverless agent to the function by importing the Cortex library and wrapping the function’s handler.
                    
                
            -   Agent installation package for node.js using AWS Layers in ECMAScript (JavaScript) runtime/Agent installation package for node.js in AWS Lambda using AWS Layers with CommonJS module format:
                
                1.  Download the serverless agent bundle.
                    
                2.  Log in to your AWS Management Console.
                    
                3.  Navigate to the AWS Lambda service, and upload the layer and add it to the function’s configuration.
                    
                4.  Save the current Lamba handler setting in the ORIGINAL_HANDLER environment variable.
                    
                5.  Change the Lambda handler setting to cortex.handler.
                    
                
            -   Agent installation package for python using AWS Layers in python runtime/Agent installation package for python in AWS Lambda using AWS Layers with python module format:
                
                1.  Download the serverless agent bundle.
                    
                2.  Log in to your AWS Management Console.
                    
                3.  Create a new AWS layer with the downloaded bundle, copy the new layer ARN value, and add the new layer using the copied ARN.
                    
                4.  Save the current Lamba handler setting in the ORIGINAL_HANDLER environment variable.
                    
                5.  Change the Lambda handler setting to cortex.handler.
                    
                
            
        
    
5.  Select the platform and relevant settings, and then click Create.
    
    Cortex Cloud prepares your installation package and displays it on the Agent Installations page.
    
6.  Download your installation package.
    
    When the status of the package shows `Completed`, right-click the package, and click Download.

##### Manage an agent installation package

Learn how to make changes such as deleting an agent installation package or editing the package name.

You can manage agent installation packages on the Agent Installations page. To manage a specific package, right-click the agent version, and select the desired action:

-   Edit the package name or description.
    
-   Delete the installation package. Deleting an installation package does not uninstall the Cortex XDR agent software from any endpoints.
    
    **Note:**
    
    Since Cortex Cloud relies on the installation package ID to approve agent registration during the installation, we recommend that you don't delete the installation package of active endpoints. If you install the Cortex XDR agent from a package after you delete it, Cortex Cloud denies the registration request leaving the agent in an unprotected state. Hiding the installation package removes it from the default list of available installation packages, and can be useful for preventing confusion within the management console main view. The hidden installation can be viewed by removing the default filter.
    
-   Copy text to clipboard to copy the text from a specific field in the row of an installation package.
    
-   Hide installation packages. Using the Hide option provides a quick method to filter out results based on a specific value in the table. You can also use the filters at the top of the page to build a filter from scratch. To create a persistent filter, save () it.

#### Harden endpoint security

By hardening your endpoints with Cortex XDR agent, you can make these endpoints more secure and safer from attackers.

You can extend the security on your endpoints beyond the Cortex XDR agent built-in prevention capabilities to provide increased network security coverage within your organization. By leveraging existing mechanisms and added capabilities, the Cortex XDR agent can enforce additional protections on your endpoints to provide a comprehensive security posture.

From Inventory → Endpoints → Policy Management → Extensions → Profiles, you can create profiles for the following hardened endpoint security capabilities.

-   Device controlDevice control
    
-   Host firewall
    
    -   Host firewall for Windows
        
    -   Host firewall for macOS
        
    
-   Disk encryption
    

The Extensions Profiles table lists the profile details per operating system. Profiles associated with one or more targets that are beyond your defined user scope are locked and cannot be edited.

| Field | Description |
| --- | --- |
| Associated Targets | Targets associated with the profile |
| Created By | Administrative user who created the profile |
| Created Time | Date and time at which the profile was created |
| Description | Optional description entered by an administrator to describe the profile |
| Modification Time | Date and time at which the profile was modified |
| Modified By | Administrative user who modified the profile |
| Name | Name provided to identify the security profile |
| Platform | Platform type of the profile |
| Summary | Summary of profile configuration |
| Type | Profile type |
| Usage Count | Number of policy rules that use the profile |

To apply the profiles, from Inventory → Endpoints → Policy Management → Extensions → Policy Rules, you can view all the policy rules per operating system. Rules associated with one or more targets that are beyond your defined user scope are locked and cannot be edited.

The following table describes for each capability the supported platforms and minimal agent version. A dash (—) indicates the setting is not supported.

| Module | Windows | Mac | Linux |
| --- | --- | --- | --- |
| Device Control Protects endpoints from loading malicious files from USB-connected removable devices (CD-ROM, disk drives, floppy disks, and Windows portable devices drives) and Bluetooth devices. Protects endpoints from malicious print jobs. | ✓ (Bluetooth from Cortex XDR agent version 8.6, print jobs from version 8.5) | ✓ (Bluetooth from Cortex XDR agent version 8.7, print jobs from version 8.5) | – |
| Host Firewall Protects endpoints from attacks originating in network communications to and from the endpoint. | ✓ | ✓ | – |
| Disk Encryption Provides visibility into endpoints that encrypt their hard drives using BitLocker or FileVault. | ✓ | ✓ | – |

##### Device control

Protect your Windows and macOS-based endpoints from connecting to malicious USB-connected removable devices, to Bluetooth devices, and to print jobs.

By default, all external USB and Bluetooth devices are allowed to connect to your Windows and macOS-based Cortex Cloud endpoints, and all print jobs are allowed. To protect endpoints from connecting to removable devices, such as disk drives, CD-ROM drives, floppy disk drives, Bluetooth devices, and other portable devices, that can contain malicious files, Cortex Cloud provides device control. Different types of print jobs can also be blocked.

Using device control, you can:

-   (Windows and macOS) Block all supported USB-connected devices for an endpoint group.
    
-   (Windows and macOS) Block a USB device type but add to your allow list a specific vendor from that list that will be accessible from the endpoint.
    
-   (Windows and macOS) Block connections to Classic Bluetooth devices or Low Energy Bluetooth services. These are two different Bluetooth protocols used for short-range wireless connections.
    
    -   Some examples of Classic Bluetooth devices include: laptop computers, tablets, telephones, audio/video devices, wearables, peripherals, imaging devices, health devices, toys, and so on.
        
    -   Some examples of Low Energy Bluetooth devices include: telephone alert status, microphone control, health sensors, insulin delivery, location and navigation, object transfer, and so on.
        
    
-   Temporarily block only some device types on an endpoint.
    
    -   USB devices (Windows and macOS)
        
    -   Bluetooth devices (Windows and macOS)
        
    
-   (Windows and macOS) Block some, or all, print jobs to local or network printers, or to file.
    

**Note:**

-   Operating systems report on devices in different ways. Sometimes, the same BLE device will report different services and interfaces, depending on the host's operating system. This may have an effect on the specific BLE services that are blocked for each operating system.
    
-   Depending on your defined user scope permissions, creating device profiles, policies, exceptions, and violations may be disabled.
    

The following are prerequisites to enforce device control policy rules on your endpoints:

| Platform | Prerequisites |
| --- | --- |
| Windows | For VDI: For VMware Horizon, you must disable Sharing → Allow access to removable storage in your VMware Horizon client settings. |
| Mac | No prerequisites |
| Linux | Not supported |
| Android | Not supported |
| iOS | Not supported |

The following limitations apply to device control on your endpoints:

| Platform | Device Type | Limitation |
| :-- | :-- | :-- |
| Windows | VDI | Virtual environments leverage different stacks that might not be subject to the Device Control policy rules that are enforced by the Cortex XDR agent and, therefore, could lead to USB devices that are allowed to connect to the VDI instance in contrast to the configured policy rules.; The Cortex XDR agent provides best-effort enforcement of the Device Control policy rules on VDI instances that are running on physical endpoints where a Cortex XDR agent is not deployed.; For Citrix Virtual Apps and Desktops, Cortex Cloud Device Control is supported on generic virtual channels only. |
| Windows | Bluetooth | Serial number queries are not supported.; If a profile is set to block specific Bluetooth Low Energy (BLE) services, Cortex Cloud only blocks the services set to Block, and not the functionality of the entire device. This means that if a device has multiple services, some of them might still be accessible, while others are blocked.; Cortex Cloud attempts to aggregate all related BLE services so that they appear under a single logical Bluetooth device control violation report. However, some Bluetooth devices might be reported in a separate violation report due to the way these devices are paired in the Windows operating system and because they reside outside the device container. ; Cortex Cloud cannot block low energy services or report device control violations on devices that do not report any LE services. The devices can, however, be blocked completely by setting the entire Bluetooth device to Block.; Exceptions can only be created when the Vendor field for the device is available in a violation report.; Exceptions for specific BLE devices cannot be created from a violation report. Exceptions for such devices can only be created by disabling the the blocked LE services in the policy.; If a Bluetooth device vendor is registered as a Vendor (with ID) in the regulatory organization that supervises USB devices, but is not registered as a Bluetooth device, exceptions cannot be created from a violation report. An alternate method for creating an exception is to create a separate profile for the endpoints using the BLE devices, and allow use of specific major and minor classes for these devices. |
| macOS | Bluetooth | Cortex Cloud cannot block low energy services or report device control violations on devices that do not report any LE services. The devices can, however, be blocked completely by setting the entire Bluetooth device to Block.; Exceptions can only be created when the Vendor field for the device is available in a violation report.; Exceptions for specific BLE devices cannot be created from a violation report. Exceptions for such devices can only be created by disabling the the blocked LE services in the policy.; If a Bluetooth device vendor is registered as a Vendor (with ID) in the regulatory organization that supervises USB devices, but is not registered as a Bluetooth device, exceptions cannot be created from a violation report. An alternate method for creating an exception is to create a separate profile for the endpoints using the BLE devices, and allow use of specific major and minor classes for these devices.; In some cases, when LE devices are blocked by XDR, the host's user interface might not reflect this, and they might appear as connected, when in fact they are blocked. In such cases, these devices retain their pairing status, even though they are blocked.; Some Apple devices, such as iPhones or iPads, might not be blocked because they employ protocols other than Bluetooth for inter-device communication.; Some complex Bluetooth and BLE devices, such as earphones with pre-paired charging cases, may not be blocked. |
| Linux | \- | Not supported |
| Android | \- | Not supported |
| iOS | \- | Not supported |

###### Device control profiles

To apply device control in your organization, define device control profiles that determine which device types Cortex Cloud blocks, and which it permits. There are two types of profiles:

| Profile | Description |
| --- | --- |
| Configuration Profile | Allow or block these device type groups: Disk Drives (USB-connected); CD-Rom Drives (USB-connected); Floppy Disk Drives (USB-connected); (Windows only) Windows Portable Devices (USB-connected); (Windows only) Bluetooth Devices (block, allow, or custom types)- The Custom option includes configuration options for specific Bluetooth Classes (Bluetooth Classic) device types, and for Low Energy Services (Bluetooth Low Energy). When you select an option in Bluetooth Classes, the right pane of the dialog box provides a detailed list of device types that belong to the selected class. You can choose all, or some of the items in this list. ; Print Jobs (all, or custom types)- When set to Block, all print jobs sent from the endpoint will be blocked.; When set to Custom, the following options are available: Network printer jobs only when outside Corp. network blocks print jobs sent to network printers while the endpoint is not on the corporate network. Network printer jobs (internal/VPN) blocks print jobs sent to network printers while the endpoint is connected to the network via VPN or an internal connection. Local printer jobs blocks print jobs sent to a printer which is directly connected to an endpoint. Printing to file (Windows only) blocks print jobs that are saved as a file. This option only blocks the print driver. \*\*Note:\*\* For network printer print jobs, ensure that you also configure the Agent Settings profile, Network Location Configuration option. This setting must be set to Enabled, and configured. If you do not enable and configure this setting, all network printer operations will be treated as internal network print jobs.; The Print Job option does not block connections to a printer, but blocks print jobs according to the type of print job. You cannot block use of a specific printer with this feature. Any print job that is not sent via the endpoint's printer spooler, such as a file uploaded to a remote software based printing service, will not be blocked.; Cortex Cloud relies on the [device class](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/system-defined-device-setup-classes-available-to-vendors) assigned by the operating system. Add a new device configuration profile. The Cortex XDR agent relies on the device class assigned by the operating system. For Windows endpoints only, you can configure additional device classes. Add a custom device class. |
| Exceptions Profile | Allow specific devices according to device types and vendor. You can further specify a specific product and/or product serial number. Add a new device exceptions profile. |

Device Configuration and Device Exceptions profiles are configured for each operating system separately. After you configure a device control profile, Apply device control profiles to your endpoints.

###### Add a new device configuration profile

1.  In Endpoints → Policy management → Extensions → Profiles, select +Add Profile and then select either Create New or Import from File.
    
2.  Select a Platform and click Device Configuration → Next.
    
3.  Fill in the General Information.
    
    Assign the profile Name and add an optional Description. The profile Type and Platform are set by Cortex Cloud.
    
4.  Configure Device Configuration.
    
    For each group of device types, select the desired action. To use the default option defined by Palo Alto Networks, leave Use Default selected.
    
    -   For Disk Drives only, you can also allow connecting in Read-only mode.
        
    -   For Print Jobs, you can choose the Custom option, and then select the desired print job type.
        
    -   For Bluetooth Devices, you can choose the Custom option, and then select the desired Bluetooth Classes or Low Energy Services type.
        
    
    **Note:**
    
    -   Currently, the default is set to Use Default (Allow), however, Palo Alto Networks may change the default definition at any time.
        
    
5.  To save your device profile definitions, click Create.
    
    If needed, you can edit, delete, or duplicate your profiles.
    
    **Note:**
    
    You cannot edit or delete the default profiles pre-defined in Cortex Cloud.
    
6.  (Optional) To define exceptions to your Device Configuration profile, Add a new device exceptions profile.
    
7.  Apply device control profiles to your endpoints.
    

###### Add a new device exceptions profile

1.  In Endpoints → Policy management → Extension → Profiles, select \+ New Profile or Import from File.
    
2.  Select Platform and click Device Exceptions → Next.
    
3.  Fill in the General Information.
    
    Assign the profile Name and add an optional Description. The profile Type and Platform are set by the system.
    
4.  Configure Device Exceptions.
    
    You can add devices to your allow list according to different sets of identifiers: vendor, product, and serial numbers.
    
    -   **Type**: Select the device type that you want to add to the allow list: Bluetooth, CD-ROM, Disk Drive, Floppy Disk, or Windows Portable Devices (Windows only).
        
    -   (Disk Drives only) **Permission**: Select the permissions you want to grant: Read only or Read/Write.
        
    -   **Vendor**: Select a specific vendor from the list or enter the vendor ID in hexadecimal code.
        
    -   (Optional) **Product**: Select a specific product (filtered by the selected vendor) to add to your allow list, or add your product ID in hexadecimal code.
        
    -   (Optional) **Serial Number**: Enter a specific serial number (pertaining to the selected product) to add to your allow list. Only devices with this serial number are included in the allow list. If you want to add serial number where the last character is a space character, use quotation marks. For example, `"K04M1972138 "`.
        
    
5.  To save your device exceptions profile, click Create.
    
    If needed, you can later edit, delete, or duplicate your profiles.
    
    **Note:**
    
    You cannot edit or delete the predefined profiles in Cortex Cloud.
    
6.  Apply device control profiles to your endpoints.
    

###### Apply device control profiles to your endpoints

After you define the required profiles for Device Configuration and Exceptions, you must configure Device Control policies and enforce them on your endpoints. Cortex Cloud applies Device Control policies on endpoints from beginning to end, as you’ve ordered them on the page. The first policy that matches the endpoint is applied. If no policies match, the default policy that enables all devices is applied.

1.  In Endpoints → Policy management → Extensions → Policy Rules, select \+ New Policy or Import from File.
    
    **Note:**
    
    When importing a policy, select whether to enable the associated policy targets. Rules within the imported policy are managed as follows:
    
    -   New rules are added to the top of the list.
        
    -   Default rules override the default rule in the target tenant.
        
    -   Rules without a defined target are disabled until the target is specified.
        
    
2.  Configure settings for the Device Control policy.
    
    1.  Assign a policy name and select the platform. You can add a description.
        
    2.  Assign the Device Type profile you want to use in this rule.
        
    3.  Click Next.
        
    4.  Select the target endpoints on which to enforce the policy.
        
        Use filters or manual endpoint selection to define the exact target endpoints of the policy rules. If exists, the Group Name is filtered according to the groups within your defined user scope.
        
    5.  Click Done.
        
3.  Configure policy hierarchy.
    
    Drag the policies in the desired order of execution. The default policy that enables all devices on all endpoints is always the last one on the page and is applied to endpoints that don’t match the criteria in the other policies.
    
4.  Save the policy hierarchy.
    
    After the policy is saved and applied to the agents, Cortex Cloud enforces the device control policies on your environment.
    
5.  (Optional) Manage your policy rules.
    
    In the Protection Policy Rules table, you can view and edit the policy you created and the policy hierarchy.
    
    1.  View your policy hierarchy.
        
    2.  Right-click to View Policy Details, Edit, Save as New, Disable, and Delete.
        
    3.  Select one or more policies, right-click and select Export Policies. You can choose to include the associated Policy Targets, Global Exceptions, and endpoint groups.
        
6.  Monitor device control violations.
    
    After you apply Device Control rules in your environment, you can use the Endpoints → Device Control Violations page to monitor all instances where end users attempted to connect restricted devices or print jobs, and Cortex Cloud blocked them on the endpoint. All violation logs are displayed on the page. You can sort the results and use the filters menu to narrow down the results. For each violation event, Cortex Cloud logs the following event details, where relevant and available for each device or print job:
    
    -   ID
        
    -   Timestamp for the violation event
        
    -   Host name of the endpoint
        
    -   Platform (operating system)
        
    -   Agent ID
        
    -   User name
        
    -   IP address
        
    -   Type of device
        
    -   GUID of the device
        
    -   Vendor ID of the device
        
    -   Vendor of the device
        
    -   Product name
        
    -   Serial number (not supported for Bluetooth devices on Windows-based endpoints)
        
    -   Print Job Type
        
    -   Document Name of a print job
        
    -   Additional Information
        
    -   Major Class
        
    -   Minor Class
        
    -   Vendor Type
        
    
    If you see a violation for which you’d like to define an exception on the device that triggered it, right-click the violation and select one of the following options:
    
    -   Add device to permanent exceptions: To ensure this device is always allowed in your network, select this option to add the device to the Device Permanent Exceptions list, the type of Permissions, and an optional comment.
        
    -   Add device to temporary exceptions: To allow this device only temporarily on the selected endpoint or on all endpoints, select this option and set the allowed time frame for the device, the type of Permissions, and an optional comment.
        
    -   Add device to a profile exception: Select this option to allow the device within an existing Device Exceptions profile, the type of Permissions, and an optional comment.
        
    
7.  Tune your device control exceptions.
    
    To better deploy device control in your network and allow further granularity, you can add devices on your network to your allow list and grant them access to your endpoints. Device control exceptions are configured per device and you must select the device category, vendor, and type of permission that you want to allow on the endpoint. Optionally, to limit the exception to a specific device, you can also include the product and/or serial number.
    
    Cortex Cloud enables you to configure the following exceptions:
    
    | Exception Name | Description |
    | --- | --- |
    | Permanent Exceptions | Permanent exceptions approve the device in your network across all Device Control policies and profiles. You can create them directly from the violation event that blocked the device, or through the Permanent Exceptions list. \*\*Note:\*\* Permanent exceptions apply across platforms, allowing the devices on all operating systems. Create a Permanent Exception. |
    | Temporary Exceptions | Temporary exceptions approve the device for a specific time period up to 30 days. You create a temporary exception directly from the violation event that blocked the device. Create a Temporary Exception. |
    | Profile Exceptions | Profile exceptions approve the device in an existing exceptions profile. You create a profile exception directly from the violation event that blocked the device. Create an Exception within a Profile. |
    
    1.  Create a Permanent Exception.
        
        Permanent device control exceptions are managed in the Permanent Exception list and are applied to all devices regardless of the endpoint platform.
        
        -   If you know in advance which device you’d like to allow throughout your network, create a general exception from the list:
            
            1.  Go to Endpoints → Policy Management → Extensions and select Device Permanent Exceptions on the left menu. The list of existing Permanent Exceptions is displayed.
                
            2.  Select Type, Permission, and Vendor.
                
            3.  (Optional) Select a specific product and/or enter a specific serial number for the device.
                
            4.  Click the adjacent arrow and Save. The exception is added to the Permanent Exceptions list and will be applied in the next heartbeat.
                
            
        -   Otherwise, you can create a permanent exception directly from the violation event that blocked the device in your network:
            
            1.  On the Device Control Violations page, right-click the violation event triggered by the device you want to permanently allow.
                
            2.  Select Add device to permanent exceptions. Review the exception data and change the defaults if necessary.
                
            3.  Click Save.
                
            
        
    2.  Create a temporary exception.
        
        1.  On the Device Control Violations page, right-click the violation event triggered by the device you want to temporarily allow.
            
        2.  Select Add device to temporary exceptions. Review the exception data and change the defaults if necessary. For example, you can configure the exception to this endpoint only or to all endpoints in your network, or set which device identifiers will be included in the exception.
            
        3.  Configure the exception Time Frame by defining the number of days or number of hours during which the exception will be applied, up to 30 days.
            
        4.  Click Save. The exception is added to the Device Temporary Exceptions list and will be applied in the next heartbeat.
            
        
    3.  Create an exception within a profile.
        
        1.  On the Device Control Violations page, right-click the violation event triggered by the device you want to add to a Device Exceptions profile.
            
        2.  Select the Profile from the list.
            
        3.  Save. The exception is added to the exceptions profile and will be applied in the next heartbeat.
            
        

###### Add a custom device class

(Windows only) You can include custom USB-connected device classes beyond Disk Drive, CD-ROM, Windows Portable Devices, and Floppy Disk Drives, such as USB connected network adapters. When you create a custom device class, you must supply Cortex Cloud the [official ClassGuid identifier](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/system-defined-device-setup-classes-available-to-vendors) used by Microsoft. Alternatively, if you configured a GUID value to a specific USB connected device, you must use this value for the new device class. After you add a custom device class, you can view it in Device Management and enforce any device control rules and exceptions on this device class.

1.  Go to Endpoints → Policy Management → Settings → Device Management.
    
    This is the list of all your custom USB-connected devices.
    
2.  Create the new device class.
    
    Select +New Device. Set a Name for the new device class, and supply a valid and unique GUID Identifier. For each GUID value, you can define one class type only.
    
3.  Save.
    
    The new device class is now available in Cortex Cloud as all other device classes.
    

###### Add a custom user notification

You can personalize the Cortex Cloud notification pop-up on the endpoint when the user attempts to connect a USB device that is either blocked on the endpoint or allowed in read-only mode. To edit the notifications, refer to Set up agent settings profiles.Set up agent settings profiles

**Note:**

Disabling Device Control Violation notifications is only supported on endpoints running Cortex XDR agent version 8.6 and above.

###### Ingest connect and disconnect events of USB devices

The Cortex Query Language (XQL) supports the ingestion of connect and disconnect events of USB devices that are reported by the agent. To view these USB device events in XQL Search, you must set the Device Configuration of the endpoint profile to Block. Otherwise, the USB events are not captured. The events are also captured when a group of device types are blocked on the endpoints with a permanent or temporary exception in place. For more information, see Add a new device configuration profile.

You can use XQL Search to query for this data and build widgets based on the **`xdr_data`** dataset, where the following use cases are supported:

-   Displaying devices by Vendor ID, Vendor Name, Product ID, and Product Name.
    
-   Displaying hosts that a specific device, based on the serial number, is connected.
    
-   Query for USB devices that are connected to specific hosts or groups of hosts.
    

Examples of XQL queries that query the USB device data.

-   This query returns the **`action_device_usb_product_name`** field from all **`xdr_data`** records, where the **`event_type`** is **`DEVICE`** and the **`event_sub_type`** is **`DEVICE_PLUG`**.
    
    ```
    dataset = xdr_data
    | filter event_type = DEVICE and event_sub_type = DEVICE_PLUG
    | fields action_device_usb_product_name
    ```
    
-   This query returns the **`action_device_usb_vendor_name`** field from all **`device_control`** records (preset of the **`xdr_data`** dataset) where the **`event_type`** is **`DEVICE`**.
    
    ```
    preset = device_control
    | filter event_type = DEVICE
    | fields action_device_usb_vendor_name
    ```

##### Host firewall

Control communications on your endpoints based on the network location of your device by using the Cortex XDR host firewall.

The Cortex Cloud host firewall enables you to control communications on your endpoints. To use the host firewall, you set rules that allow or block the traffic on the devices and apply them to your endpoints using host firewall policy rules. Additionally, you can configure different sets of rules based on the current location of your endpoints - within or outside your organization network. The Cortex Cloud host firewall rules leverage the operating system firewall APIs and enforce these rules on your endpoints, but not your Windows or Mac firewall settings.

The following apply Cortex Cloud host firewall policy rules on your endpoints:

| Platform | Requirements and Limitations |
| --- | --- |
| Windows | By default, Cortex firewall is disabled and Windows firewall has control. Enforcing Cortex firewall rules will take control away from Windows Firewall, and Windows firewall rules will no longer apply.; It is recommended to disable the windows firewall on endpoints running Windows 7 SP1 before applying the Cortex Cloud host firewall profile. |
| Mac | After you disable or remove the Cortex Cloud host-firewall policy on the endpoint, the system firewall on the endpoint is disabled.; You cannot configure the following Mac host firewall settings with the Cortex Cloud host firewall.-   `Automatically allow built-in software to receive incoming connections.`; `Automatically allow downloaded signed software to receive incoming connections.` |
| Linux | Not supported. |

###### Host firewall for Windows

Control communications on your endpoints based on the network location of your device by using the host firewall.

Enforce the Cortex Cloud host firewall policy in your organization to control communications on your endpoints and gain visibility into your network connections. The host firewall policy consists of unique rules groups that are enforced hierarchically and can be reused across all host firewall profiles. The Cortex Cloud host firewall rules are integrated with the Windows Security Center and leverage the operating system firewall APIs and enforce these rules on your endpoints, but not your operating system firewall settings. Once you deploy the host firewall, use the Host Firewall Events table to track the enforcement events in your organization.

To configure the Cortex Cloud host firewall in your network, follow this high-level workflow:

-   Ensure you meet the host firewall requirements and prerequisites.
    
-   **Create rules within rule groups:** Create host firewall rules groups that you can reuse across all host firewall profiles. Add rules to each group and prioritize the rules from top to bottom to create an enforcement hierarchy.
    
-   **Configure a profile:** Select one or more rule groups into a host firewall enforcement profile that you later associate with an enforcement policy. The profile can enforce different rules when the endpoint is located within the organization’s internal network, and when it is outside. Prioritize the groups within the profile from top to bottom to create an enforcement hierarchy.
    
-   **Configure a policy:** Add your host firewall profile to a new or existing policy that will be enforced on selected target endpoints.
    
-   **Monitor and troubleshoot:** View aggregated host firewall enforcement events, or all single host firewall activities the agent performed in your network. Cortex XDR Pro customers can also query the host firewall events using the new `host_firewall_events` dataset in XQL Search for data and network analysis.
    

###### Set up the host firewall

Set up your rule groups and host firewall profile.

###### Create a rules group

Group rules into Rules Groups that you can reuse across all host firewall profiles. A host firewall group includes one or more host firewall unique rules. The rules are enforced according to their order of appearance within the group, from top to bottom. After you create a rules group, you can assign the group to a host firewall profile. When you edit, re-prioritize, disable, or delete a rule from a group, the change takes effect in all policies where this group is included. To support this scalability and structure, every rule in Cortex Cloud is assigned a unique ID and must be contained within a group. Additionally, you can import existing firewall rules into Cortex Cloud, or export them in JSON format.

1.  Create a group.
    
    From Inventory → Endpoints → Host Firewall → Host Firewall Rules Groups, click +New Group on the upper bar.
    
2.  Fill in general information.
    
    Enter the rule name and optional description. To enforce the rules within the group in all policies they are associated with, Enable the group. When Disabled, the group exists but is not enforced.
    
3.  Create rules within the rules group.
    
    Create rules within rules groups to allow or block traffic on the endpoint. Use a variety of parameters to fine tune your policy such as specific protocols, applications, services, and more. For every group, you need to create its own list of rules. Each rule is assigned a unique ID and can be associated with a single group only.
    
    **Note:**
    
    -   A rule is always part of a rules group. It cannot stand on its own.
        
    -   A rule can belong to one rules group only and cannot be reused in different groups.
        
    
    1.  Configure rule settings.
        
        A host firewall rule allows or blocks the communication to and/or from an endpoint. Enter the rule Name, optional Description, and select the Platforms you want to associate the rule with.
        
        Fine-tune the rule by applying the action to the following parameters:
        
        -   Protocol: Select any of the 256 internet protocols:
            
            -   Any
                
            -   Custom
                
            -   TCP
                
            -   UDP
                
            -   ICMPv4
                
            -   ICMPv6
                
            
            Once you select one of the available protocols or enter the protocol number, you will be able to specify additional parameters per protocol as needed. For example, for TCP(6) you can set local and remote ports, whereas for ICMPv4(1) you can add the ICMP type and code.
            
            **Note:**
            
            When selecting ICMP protocol, you must enter a the ICMP Type and Code. Without these values the ICMP protocol is ignored by the Windows and macOS Cortex XDR agents.
            
        -   Direction: Select the direction of the communication this rule applies to: Inbound communication to the endpoint, Outbound communication from the endpoint, or Both.
            
        -   Action: Select whether the rule action is to Allow or Block the communication on the endpoint.
            
        -   Local/Remote IP Address: Configure the rule for specific local or remote IP addresses s and/or Ports. You can set a single IP address, multiple IP addresses separated by a comma, range of IP addresses separated by a hyphen, or a combination of these options.
            
        -   Depending on the type of platform you selected, define the Application, Service, and Bundle IDs of the Windows Settings and/or macOS Settings—Configure the rule for all applications/services or specific ones only by entering the full path and name. If you use system variables in the path definition, you must re-enforce the policy on the endpoint every time the directories and/or system variables on the endpoint change.
            
        -   Report Matched Traffic: When Enabled, enforcement events captured by this rule are reported periodically to Cortex Cloud and displayed in the Host Firewall Events table, whether the rule is set to Allow or Block the traffic. When Disabled, the rule is applied but enforcement events are not reported periodically.
            
        
    2.  Save rule.
        
        After you fill in all the details, you need to save the rule. If you know you need to create a similar rule, click Create another to save this rule and leave the specified parameters available for edit for the next rule. Otherwise, to save the rule and exit, click Create.
        
4.  Prioritize rules.
    
    The rules within the group are enforced by priority from top to bottom. By default, every new rule is added to the top of the already existing rules in the group, meaning it is assigned the highest priority and will be enforced first. To change the rules priority and order of enforcement within the group, click the rule priority number and drag the rule up or down the table to the proper row. Repeat this process to prioritize all the rules.
    
5.  Save.
    
    When you are done, click Create. The new rules group is created and can be associated with a host firewall profile.
    

###### Manage rules groups

After you create a group, you can perform additional actions. From Inventory+Endpoints → Host Firewall → Host Firewall Rules Groups, click a group:

-   **View group data:** From the Host Firewall Rules Groups table you can view details about all the existing rules groups in your organization. The table lists high level information about the group such as name, mode, and number of rules included. To view all rules within a group and all the profiles the group is associated with, click the expand icon.
    
-   **Edit group:** Right-click the group and Edit its settings.
    
-   Delete/Disable: To stop enforcing the rules within this group, right-click the group and Delete/Disable it. On the next heartbeat, its rule will be removed/disabled from all profiles this group is associated with.
    
-   **Import/Export group rules:** Using a JSON file, you can import rules into the Cortex Cloud host firewall or export them. Right-click the rule and Import/Export.
    

###### Manage rules

After you create a host firewall rule and assign it to a rules group, you can manage the rule settings and enforcement as follows.

-   **View/Edit:** Right-click the rule to view it or edit its parameters.
    
-   **Change priority:** Change the rule priority within the group by dragging its row up and down the rules list.
    
-   **Delete/Disable:** To stop enforcing the rule, you can right-click the rule and Delete/Disable it. On the next heartbeat, the rule will be removed/disabled in all profiles where this rules group is included.
    

###### Create a host firewall profile

Configure host firewall profiles that contain one or more rules groups. The groups are enforced according to their order of appearance within the profile, from top to bottom (and within each group, the rules are also enforced from top to bottom). You can also configure profiles based on the device location within your internal network. When you edit, re-prioritize, disable, or delete a rules group from a profile, the change takes effect on the next heartbeat in all policies where this profile is included.

1.  Create a profile.
    
    From Inventory → Endpoints → Policy Management → Extensions and select \+ Add Profile or Import from File.
    
2.  Select the platform and click Host Firewall → Next.
    
3.  Fill in General Information.
    
    Enter the profile name and optional description.
    
4.  Configure Report Settings.
    
    When the profile operates in report mode, Cortex Cloud overrides all rules set to Block traffic. Instead, the traffic is allowed to go through, and the enforcement event is reported as Override Block. You can configure a profile in report mode if you need for example to test new block rules before you actually apply them.
    
5.  Configure Internal and External Rule Groups.
    
    To apply location-based host firewall rules, you must first enable network location configuration in your Agent Settings Profile. When enabled, Cortex Cloud enforces the host firewall rules based on the current location of the device within the internal organization network (Internal Rules), enabling you for example to enforce more strict rules when the device is outside the office and in a public place (External Rules). If you disable the Location Based option, your policy will apply the internal set of rules only, and that will be applied to the device regardless of its location.Set up agent settings profiles
    
    Create a new rule or add a rules group to the Internal/External Groups:
    
    1.  Click +Add Group.
        
    2.  Select one or more groups, and click Add.
        
        To quickly apply the exact same rules in both cases, select Add as external/internal rules groups as well.
        
    3.  Review the rule group field details.
        
        The groups are listed according to the order of enforcement from top to bottom. To change this order, click on the group priority number and drag the group to the desired row.
        
        | Field | Description |
        | --- | --- |
        | Applicable Rules Count | Displays the number of rules in the specific group that are associated with the platform profile |
        | Created by | Displays the email address of the user that created the rule |
        | Creation Time | Date and time of when the rule was created |
        | Description | Description of the rule, if available |
        | Group ID | Unique rules group ID |
        | Group Name | Name of the group rules group |
        | Mode | Displays whether the rules group is enabled |
        | Modified by | Displays the email address of the last user that made changes to the group |
        | Modification Time | Date and time of when the group was modified |
        
    4.  (Optional) Select View Rules to view a list of all the rule details within the rules group. The table is filtered according to the rules associated with the platform profile you are creating.
        
    5.  Allow or Block the Default Action for Inbound/Outbound Traffic in the profile if you want to allow all network connections that have not been matched to any other rule in the profile.
        
6.  Save the profile.
    
    When you are done, click Create. You can now configure a host firewall policy.
    

###### Manage policy rules

After you create the host firewall extensions profile, you can perform additional actions. The changes take effect on the next heartbeat. From Inventory → Endpoints → Policy Management → Extensions → Policy Rules, right-click to:

-   Edit: Change the profile settings and Save. The change takes effect in all policies enforcing this profile.
    
-   Delete: The profile is deleted from all policies it was associated with, while the rules groups are not deleted and are still available in Cortex Cloud.
    
-   Save As New: Duplicate the profile, edit, and save as new.
    
-   Export Profile: Select one or more policies, right-click and select Export Policies. You can choose to include the associated Policy Targets, Global Exceptions, and endpoint groups.
    

###### Create a host firewall policy

After you define the required host firewall profiles, configure host firewall policies that will be enforced on your target endpoints. You can associate the profile with an existing policy, or create a new one.

1.  Create a policy.
    
    From Inventory → Endpoints → Policy Management → Extensions → Policy Rules, click +New Policy or Import from File.
    
    **Note:**
    
    When importing a policy, select whether to enable the associated policy targets. Rules within the imported policy are managed as follows.
    
    -   New rules are added to the top of the list.
        
    -   Default rules override the default rule in the target tenant.
        
    -   Rules without a defined target are disabled until target is specified.
        
    
2.  Fill in general information.
    
    Enter the policy name, description, and platform. Click Next.
    
3.  Select profile.
    
    Select the desired profile for host firewall from the drop-down list, and any other profiles you want to include in this policy. Click Next.
    
4.  Select endpoints.
    
    Select the target endpoints on which to enforce the policy. Use filters or manual endpoint selection to define the exact target endpoints of the policy. Click Done.
    
5.  Configure policy hierarchy.
    
    Drag and drop the policies in the desired order of execution, from top to bottom.
    
6.  Save the policy.
    
    After the policy is saved and applied to the agents, Cortex Cloud enforces the host firewall policies in your environment.
    

###### Monitor host firewall activity in your network

The Host Firewall Events table provides an aggregated view of the host firewall enforcement events in your network. An enforcement event represents the number of rule hits per endpoint in 60 minutes.

**Note:**

-   The data is aggregated and reported periodically every 60 minutes since the first time the host firewall policy was enforced on the endpoint, not every round hour.
    
-   The table lists enforcement events only for rules set to Report Matching Traffic.
    

Every enforcement event includes additional data such as the time of the first rule hit, the rule action, protocol, and more.

###### Collect detailed log files

To gain deeper visibility into all the host firewall activity that occurred on an endpoint, you can retrieve a log file listing all single actions the agent performed for all rules (whether set to Report Matched Traffic or not). The logs are stored in a cyclic 50MB file on the endpoint, which is constantly being re-written and overridden older logs. When you upload the file, the logs are loaded to the Host Firewall Events table. You can filter the table using the Event Source field to view only the aggregated periodic logs, or only non-aggregated on-demand logs.

To collect the log file, right-click the event containing the endpoint you are interested in and select Collect Detailed Host Firewall Logs. Alternatively, you can perform this action for multiple endpoints from Endpoints Administration.

###### Host firewall for macOS

Control communications on your endpoints based on the network location of your device by using the host firewall.

The Cortex Cloud host firewall enables you to control communications on your endpoints. To use the host firewall, you set rules that allow or block the traffic on the devices and apply them to your endpoints using Cortex Cloud host firewall policy rules. Additionally, you can configure different sets of rules based on the current location of your endpoints - within or outside your organization network. The Cortex Cloud host firewall rules leverage the operating system firewall APIs and enforce these rules on your endpoints, but not your Windows or Mac firewall settings.

To configure the Cortex Cloud host firewall in your network, follow this high-level workflow. Ensure you meet the host firewall requirements.

###### Enable network location configuration

If you want to apply location-based host firewall rules, you must first enable network location configuration in your agent settings profile. On every heartbeat, and if the Cortex XDR agent detects a network change on the endpoint, the agent triggers the device location test and re-calculates the policy according to the new location.Set up agent settings profiles

###### Add a new host firewall profile

Configure host firewall profiles that contain one or more rules groups. The groups are enforced according to their order of appearance within the profile, from top to bottom (and within each group, the rules are also enforced from top to bottom). You can also configure profiles based on the device location within your internal network. When you edit, re-prioritize, disable, or delete a rules group from a profile, the change takes effect on the next heartbeat in all policies where this profile is included.

Rules that were created on macOS 10 and Cortex XDR agent 7.5 and prior are managed only in the Legacy Host Firewall Rules and do not appear in the Rule Groups tables.

1.  From Inventory → Endpoints → Policy Management → Extensions Profiles → Profiles, select \+ New Profile or Import from File. Select the Platform and click Host Firewall → Next.
    
2.  Fill-in the General Information for the new profile.
    
    Assign a Profile Name and optional description to the profile.
    
3.  Define your Report Settings.
    
    When the profile operates in report mode, Cortex Cloud overrides all rules set to Block traffic. Instead, the traffic is allowed to go through, and the enforcement event is reported as Override Block. You can configure a profile in report mode if you need for example to test new block rules before you actually apply them.
    
4.  Configure Internal and External Rule Groups.
    
    To apply location-based host firewall rules, you must first enable network location configuration in your agent settings profile. When enabled, Cortex Cloud enforces the host firewall rules based on the current location of the device within the internal organization network (Internal Rules), enabling you for example to enforce more strict rules when the device is outside the office and in a public place (External Rules). If you disable the Location Based option, your policy will apply the internal set of rules only, and that will be applied to the device regardless of its location.Set up agent settings profiles
    
    Create a new rule or add a rules group to the Internal/External Groups.
    
    1.  Click +Add Group.
        
    2.  Select one or more groups, and click Add.
        
        To quickly apply the exact same rules in both cases, select Add as external/internal rules groups as well.
        
    3.  Review the rule group field details.
        
        The groups are listed according to the order of enforcement from top to bottom. To change this order, click on the group priority number and drag the group to the desired row.
        
        | Field | Description |
        | --- | --- |
        | Applicable Rules Count | Displays the number of rules in the specific group that are associated with the platform profile |
        | Created by | Displays the email address of the user that created the rule |
        | Creation Time | Date and time of when the rule was created |
        | Description | Description of the rule, if available |
        | Group ID | Unique rules group ID |
        | Group Name | Name of the group rules group |
        | Mode | Displays whether the rules group is enabled or not |
        | Modified by | Displays the email address of the last user that made changes to the group |
        | Modification Time | Date and time of when the group was modified |
        
    4.  (Optional) Select View Rules to view a list of all the rule details within the rules group. The table is filtered according to the rules associated with the platform profile you are creating.
        
        Any type protocol and specific ports cannot be edited. If saved as a new rule, the specific ports previously defined are removed from the cloned rule.
        
    5.  Allow or Block the Default Action for Inbound/Outbound Traffic in the profile if you want to allow all network connections that have not been matched to any other rule in the profile.
        
5.  (Optional) Manage Legacy Host Firewall Rules.
    
    Manage Host Firewall Rules created on macOS 10 and Cortex XDR agent 7.5 and earlier.
    
    1.  Enable Manage Host Firewall to allow Cortex Cloud to manage the host firewall on your Mac endpoints.
        
    2.  Configure the host firewall Internal and External settings.
        
        The host firewall settings allow or block inbound communication on your Mac endpoints. Enable or Disable the following actions:
        
        -   Stealth Mode: Hide your mac endpoint from all TCP and UDP networks by enabling the Apple Stealth mode on your endpoint.
            
        -   Block All Incoming Connections: Select where to block all incoming communications on the endpoint or not.
            
        -   Application Exclusions: Allow or block specific programs running on the endpoint using a Bundle ID.
            
        
        If the profile is location-based, you can define both internal and external settings.
        
6.  Save your profile.
    
    When you’re done, Create your host firewall profile.
    
7.  Apply host firewall profiles to your endpoints.
    

###### Apply host firewall profiles to your endpoints

After you define the required host firewall profiles, configure the Protection Policies and enforce them on your endpoints. Cortex Cloud applies Protection policies on endpoints from top to bottom, as you’ve ordered them on the page. The first policy that matches the endpoint is applied. If no policies match, the default policy that enables all communication to and from the endpoint is applied.

1.  From Inventory → Endpoints → Policy Management → Extensions → Policy Rules, select +New Policy or Import from File.
    
    **Note:**
    
    When importing a policy, select whether to enable the associated policy targets. Rules within the imported policy are managed as follows:
    
    -   New rules are added to the top of the list.
        
    -   Default rules override the default rule in the target tenant.
        
    -   Rules without a defined target are disabled until the target is specified.
        
    
2.  Configure settings for the host firewall policy.
    
    1.  Assign policy name, an optional description, and operating system.
        
    2.  Assign the host firewall profile you want to use in this rule.
        
    3.  Click Next.
        
    4.  Select the target endpoints on which to enforce the policy.
        
        Use filters or manual endpoint selection to define the exact target endpoints of the policy rules.
        
    5.  Click Done.
        
    
    Alternatively, you can associate the host firewall profile with an existing policy. Right-click the policy and select Edit. Select the Host Firewall profile and click Next. If needed, you can edit other settings in the rule, such as target endpoints and description. When you’re done, click Done.
    
3.  Configure policy hierarchy.
    
    Drag the policies in the desired order of execution.
    
4.  Save the policy hierarchy.
    
    After the policy is saved and applied to the agents, Cortex Cloud enforces the host firewall policies on your environment.
    

###### Monitor the host firewall activity on your endpoint

To view only the communication events on the endpoint to which the Cortex Cloud host firewall rules were applied, you can run the `Cytool firewall show` command.

Additionally, to monitor the communication on your macOS endpoint, you can use the following operating system utilities: From the endpoint System Preferences → Security and Privacy → Firewall → Firewall options, you can view the list of blocked and allowed applications in the firewall. The Cortex Cloud host firewall blocks only incoming communications on Mac endpoints, still allowing outbound communication initiated from the endpoint.

##### Disk encryption

For enhanced security, you can configure and apply disk encryption profiles to the disks of your Windows and Mac endpoints.

Cortex Cloud provides full visibility into encrypted Windows and Mac endpoints that were encrypted using BitLocker and FileVault, respectively. Additionally, you can apply Cortex Cloud Disk Encryption rule on the endpoints by creating disk encryption rules and policies that leverage BitLocker and FileVault capabilities.

Before you start applying disk encryption policy rules, ensure you meet the following requirements and refer to these known limitations:

| Requirement / Limitation | Windows | Mac |
| --- | --- | --- |
| Endpoint Prerequisites | The endpoint must be running a Microsoft Windows version that supports BitLocker.; The endpoint must be within the organization's network domain.; To allow the agent to encrypt the endpoint, Trusted Platform Module (TPM) must be supported and enabled on the endpoint.; Active Directory Domain Services is required for recovery key backup. | The endpoint must be running a macOS version that supports FileVault. |
| Disk Encryption Scope | You can enforce XDR disk encryption policy rules only on the Operating System volume. | You can enforce XDR disk encryption policy rules only on the Operating System volume.; The Cortex Cloud Disk Encryption profile for Mac can encrypt the endpoint disk, however, it cannot decrypt it. After you disable the Cortex Cloud policy rule on the endpoint, you can decrypt the endpoint manually. |
| Other | Group Policy configuration: Make sure the GPO configuration applying to the endpoint enables Save BitLocker recovery information to AD DS for operating system drives.; Make sure your Cortex Cloud disk encryption policy does not conflict with the GPO configuration to Choose drive encryption method and cipher strength. | Provide a FileVaultMaster certificate / institutional recovery key (IRK) that is signed by a valid authority.; It can take the agent up to 5 minutes to report the disk encryption status to Cortex Cloud if the endpoint was encrypted through Cortex Cloud, and up to one hour if it was encrypted through another MDM.; In line with the operating system requirements, the Cortex Cloud encryption profile will take place on the endpoint after the user logs off and back on, and approves the prompt to enable the endpoint encryption.; Palo Alto Networksrecommends that you do not apply an encryption enforcement from another MDM on the endpoint together with the Cortex Cloud encryption profile. |

Follow this high-level workflow to deploy the Cortex Cloud disk encryption in your network:

###### Monitor the endpoint encryption status

You can monitor the Encryption Status of an endpoint in the Inventory → Endpoints → Disk Encryption Visibility table. For each endpoint, the table lists both system and custom drives that were encrypted.

The following table describes both the default and additional optional fields that you can view in the Disk Encryption Visibility table per endpoint. The fields are in alphabetical order.

| Field | Description |
| --- | --- |
| Encryption Status | The endpoint encryption status can be: **Applying Policy:** Indicates that the Cortex Cloud disk encryption policy is in the process of being applied on the endpoint.; **Compliant:** Indicates that the Cortex XDR agent encryption status on the endpoint is compliant with the Cortex Cloud disk encryption policy.; **Not Compliant:** Indicates that the Cortex XDR agent encryption status on the endpoint is not compliant with the Cortex Cloud disk encryption policy.; **Not Configured:** Indicates that no disk encryption rules are configured on the endpoint.; **Not Supported:** Indicates that the operating system running on the endpoint is not supported by Cortex Cloud.; **Unmanaged:** Indicates that the endpoint encryption is not managed by Cortex Cloud. |
| Endpoint ID | Unique ID assigned by Cortex Cloud that identifies the endpoint. |
| Endpoint Name | Hostname of the endpoint. |
| Endpoint Status | Status of the endpoint, for more information, see Manage endpoints. |
| IP Address | Last known IPv4 or IPv6 address of the endpoint. |
| Last Reported | Date and time of the last change in the agent’s status, for more information, see Manage endpoints. |
| MAC Address | MAC address of the endpoint. |
| Operating System | Platform running on the endpoint. |
| OS Version | Name of the operating system version running on the endpoint. |
| Volume Status | Lists all the disks on the endpoint along with the status per volume, Decrypted or Encrypted. For Windows endpoints, Cortex Cloud includes the encryption method. |

You can also monitor the endpoint Encryption Status in your Endpoint Administration table.

###### Configure a disk encryption profile

1.  Under Inventory → Endpoints → Policy Management → Extensions → Profiles, select \+ New Profile or Import from File. Choose the Platform and select Disk Encryption. Click Next.
    
2.  Fill-in the general information for the new profile.
    
    Assign a name and an optional description to the profile.
    
3.  Enable disk encryption.
    
    To enable the Cortex XDR agent to apply disk encryption rules using the operating system disk encryption capabilities, Enable the Use disk encryption option.
    
4.  Configure Encryption details.
    
    -   For Windows:
        
        -   Encrypt or decrypt the system drives.
            
        -   Encrypt the entire disk or only the used disk space.
            
        
    -   For Mac:
        
        Inline with the operating system requirements, when the Cortex XDR agent attempts to enforce an encryption profile on an endpoint, the endpoint user is required to enter the login password. Limit the number of login attempts to one or three. Otherwise, if you do not force log in attempts, the user can continuously dismiss the operating system pop-up and the Cortex XDR agent will never encrypt the endpoint.
        
    
5.  (Windows only) Specify the Encryption methods per operating system.
    
    For each operating system (Windows 7, Windows 8-10, Windows 10 (1511), and above), select the encryption method from the corresponding list.
    
    **Note:**
    
    You must select the same encryption method configured by the Microsoft Windows Group Policy in your organization for the target endpoints. Otherwise, if you select a different encryption method than the one already applied through the Windows Group Policy, Cortex Cloud displays errors.
    
6.  (Mac only) Upload the FileVaultMaster certificate.
    
    To enable the Cortex XDR agent to encrypt your endpoint, or to help users who forgot their password to decrypt the endpoint, you must upload to Cortex Cloud the FileVaultMaster certificate / institutional recovery key (IRK). You must ensure the key is signed by a valid authority and upload a CER file only.
    
7.  Save your profile.
    
    When you’re done, Create your disk encryption profile.
    
8.  Apply disk encryption profile to your endpoints.
    

###### Apply disk encryption profile to your endpoints

After you define the required disk encryption profiles, configure Protection Policies and enforce them on your endpoints. Cortex Cloud applies Protection policies on endpoints from top to bottom, as you’ve ordered them on the page. The first policy that matches the endpoint is applied. If no policies match, the default policy that enables all communication to and from the endpoint is applied.

1.  Under Inventory → Endpoints → Policy Management → Extensions → Policy Rules, select +New policy or Import from File.
    
    **Note:**
    
    When importing a policy, select whether to enable the associated policy targets. Rules within the imported policy are managed as follows:
    
    -   New rules are added to the top of the list.
        
    -   Default rules override the default rule in the target tenant.
        
    -   Rules without a defined target are disabled until the target is specified.
        
    
2.  Configure settings for the disk encryption policy.
    
    1.  Assign a policy name and optional description.
        
        The platform will automatically be assigned to Windows.
        
    2.  Assign the disk encryption profile you want to use in this rule.
        
    3.  Click Next.
        
    4.  Select the target endpoints on which to enforce the policy.
        
        Use filters or manual endpoint selection to define the exact target endpoints of the policy rules. If exists, the Group Name is filtered according to the groups within your defined user scope.
        
    5.  Click Done.
        
    
    Alternatively, you can associate the disk encryption profile with an existing policy. Right-click the policy and select Edit. Select the Disk Encryption profile and click Next. If needed, you can edit other settings in the rule, such as target endpoints and description. When you’re done, click Done.
    
3.  Configure policy hierarchy.
    
    Drag and drop the policies in the desired order of execution.
    
4.  Save the policy hierarchy.
    
    After the policy is saved and applied to the agents, Cortex Cloud enforces the disk encryption policies on your environment.
    
5.  Select one or more policies, right-click and select Export Policies. You can choose to include the associated Policy Targets, Global Exceptions, and endpoint groups.
    
6.  Monitor the endpoint encryption status.

##### Host Inventory

Review the inventory of all your hosts (endpoints), and identify in the inventory any IT and security issues in your network.

With Host Inventory (Host Insights), you gain full visibility and inventory into the business and IT operational data on all your endpoints. By reviewing the inventory for all your hosts in a single place, you can quickly identify IT and security issues that exist in your network, such as identifying a suspicious service or autorun that was added to an endpoint.

The Cortex XDR agent scans the endpoint every 24 hours for any updates and displays the data found over the last 30 days. Alternatively, you can rescan the endpoint to retrieve the most updated data. It can take Cortex Cloud up to 6 hours to collect initial data from all endpoints in your network.

The following are prerequisites to enable Host Inventory for your Cortex Cloud instance:

| Requirement | Description |
| --- | --- |
| Licenses and Add-ons |  |
| Supported Platforms | Windows, Mac, and Linux. |
| Setup and Permissions | Ensure Host Inventory Data Collection is enabled for your Cortex XDR agent.Set up agent settings profiles |

The Cortex Cloud Host Inventory includes the following entities and information, according to the operating system running on the endpoint:

| Entity | Windows | Mac | Linux |
| --- | --- | --- | --- |
| Accessibility | – | ✓ | – |
| Applications | ✓ | ✓ | ✓ |
| Autoruns | ✓ | ✓ | ✓ |
| Daemons | – | ✓ | ✓ |
| Disks | ✓ | ✓ | ✓ |
| Drivers | ✓ | – | ✓ |
| Extensions | – | ✓ | – |
| Groups | ✓ | ✓ | ✓ |
| Mounts | – | ✓ | ✓ |
| Services | ✓ | – | – |
| Shares | ✓ | ✓ | ✓ |
| System Information | ✓ | ✓ | ✓ |
| Users | ✓ | ✓ | – |
| Users to Groups | ✓ | ✓ | ✓ |

For each entity, Cortex Cloud lists all the details about the entity, and the details about the endpoint it applies to. For example, the default Services view lists a separate row for every service on every endpoint:

Alternatively, to better understand the overall presence of each entity on the total number of endpoints, you can switch to an aggregated view (click ) and group the data by the main entity. You can also sort and filter according to the number of affected endpoints. For example, in the Services aggregated view, you can sort by the number of affected endpoints to identify the least commonly deployed service in your network. To get a closer view of all endpoints, right-click and select View affected endpoints.

###### View Host Inventory

To view the Host inventory, go to Inventory → Endpoints → Host Inventory. You can export the tables and respective asset views to a tab-separated values (TSV) file.

**Note:**

If you have Cloud Posture Security, Cloud Runtime Security, or Cortex XSIAM Premium licenses, go to Inventory → Host Insights → Host Inventory.

| Data | Description |
| --- | --- |
| Accessibility | Details about installed applications that require and were allowed special permissions to enable a camera, microphone, accessibility features, full disk access, or screen captures. |
| Applications | Details about all applications installed on your endpoints. For each application, Cortex Cloud lists the existing CVEs and the vulnerability severity score that reflects the highest NIST vulnerability score detected for the application. To further examine these vulnerabilities, see Application Analysis. |
| Autoruns | Details about executables that start automatically when the user logs in or boots the endpoint. Cortex Cloud displays information about autoruns that are configured in the endpoint Registry, startup folders, scheduled tasks, services, drivers, daemons, extensions, Crond tasks, login items, login, and logout hooks. For each autorun, Cortex Cloud lists the autorun type and configuration, such as startup method, CMD, user details, and image path. |
| Daemons | Details about all daemons that exist on the endpoint. For each daemon, Cortex Cloud lists the following details. Information about the daemon, such as the name, type, and path; Daemon state, indicating whether it is loaded, running, or not running |
| Disks | Details about the disk volumes that exist on an endpoint. For each disk that exists on an endpoint, Cortex Cloud lists details such as the drive type, name, file system, free space, and total size. |
| Drivers | Details about all the drivers installed on an endpoint. For each driver, Cortex Cloud lists all the following details: Information about the driver, such as the driver name, type, and path.; Listing details about the driver runtime configuration:-   Driver type; Whether the driver is currently running, in which mode, and the runtime state |
| Extensions | Details about the system and kernel extensions currently running on your Mac endpoints. For each extension, Cortex Cloud lists the following details: Extension type, name, path, and version; Extension state, indicating whether it is running, requires enabling, or unloaded |
| Groups | Details about all user groups defined on an endpoint. For each group, Cortex Cloud lists identifying details, such as name, SID/GID name, and type. |
| Mounts | Details about all the drives, volumes, and disks that were mounted on endpoints. For each mount, Cortex Cloud lists the mount point directory, file system type, mount spec, and GUID. |
| Services | Details about all the services running on an endpoint. For each service, Cortex Cloud lists all the following details: Information about the service, such as the service name, type, and path; Listing details about the service runtime configuration and status:-   Whether the service is currently running and what is the runtime state; Whether you can stop, pause, or delay the service start time; Whether the service requires interaction with the endpoint desktop; The name of the user who started the service and the start mode |
| Shares | Details about network shared folders defined on an endpoint. For each folder, Cortex Cloud lists all the following details: Shared network folder type: Disk Drive, Print Queue, Device, IPC, Disk Drive Admin, Print Queue Admin, Device Admin, IPC Admin; Identifying details such as folder name, description, and path; Whether the folder is limited to a maximum number of shares, and the maximum number of allowed shares |
| System Information | General system information about an endpoint. For each endpoint, Cortex Cloud lists all the following details: Information about the endpoint hardware, such as manufacturer, model, physical memory, processor architecture, and CPU; The operating system name and release running on the endpoint |
| Users | List of users whose credentials are stored on the endpoint. For each user, Cortex Cloud lists all the following details. Identifying details about the user, such as name and SID/UID; Details about the account, such as whether the account is active and the account type; Information about the password set for this user account, such as whether it is required to login, has an expiration date or can be changed |
| Users to Groups | A list mapping all the users, local and in your domain, to the existing user groups on an endpoint. \*\*Note:\*\* Cortex Cloud includes only the first 10,000 results per endpoint.; Cortex Cloud lists only users that belong to each group directly, and does not include users who belong to a group within the main group.; If a local users group includes a domain user (whose credentials are stored on the Domain Controller server and not on the endpoint), Cortex Cloud includes this user in the user-to-group mapping, but does not include it in the user's insights view. |

##### Vulnerability Assessment

Perform a vulnerability assessment of all endpoints in your network using Cortex Cloud. This includes CVE, endpoint, and application analysis.

Cortex Cloud vulnerability assessment enables you to identify and quantify the security vulnerabilities on an endpoint. After evaluating the risks to which each endpoint is exposed and the vulnerability status of an installed application in your network, you can mitigate and patch these vulnerabilities on all the endpoints in your organization.

Vulnerability Assessment

Vulnerability Assessment uses an advanced algorithm to collect extensive details on CVEs from comprehensive databases and to produce an in-depth analysis of the endpoint vulnerabilities.

**Prerequisites:**

The following are prerequisites for Cortex Cloud to perform a vulnerability assessment.

| Requirement | Description |
| --- | --- |
| Licenses and Add-ons |  |
| Supported Platforms | **Windows**- Cortex XDR agent 8.3 or a later release.; Cortex Cloud collects all the information about the operating system and the installed applications, and calculates CVE.; CVEs that apply to applications that are installed by one user aren't detected when another user without the application installed is logged in during the scan. ; **MacOS**- Cortex XDR agent 8.3 or a later release.; Cortex Cloud collects all the information about the operating system and the installed applications, and calculates CVE. |
| Setup and Permissions | Ensure Host Inventory Data Collection is enabled for your Cortex XDR agent.Set up agent settings profiles |
| Certificates for Windows and macOS | When Advanced Vulnerability and Assessment is enabled, these certificates are a prerequisite for Windows and macOS. Download the certificates from [here](https://docs-cortex.paloaltonetworks.com/v/u/EJVLvtinTtrAb~Na9XuXag). Import the _Digicert Trusted Root G4_ certificate into the Trusted Root Certification Authorities store in the local machine.; In some environments, if the scan does not initialize, the _DigiCert Trusted G4 Code Signing RSA4096 SHA384 2021 CA1_ certificate, may also be required. Import the signed certificate into the Intermediate Certification Authorities store in the local machine. |
| Limitations | Some CVEs may be outdated if the Cortex XDR agent wasn't updated recently.; Application versions which have reached end-of-life (EOL) may have their version listed as 0. This doesn't affect the detection of the CVEs.; Some applications are listed twice. One of the instances may display `invalid version`, however, this doesn't affect the functionality.; The scanning process may impact performance on the Cortex XDR agent during scanning. The scan may take up to two minutes. |

You can access the Vulnerability Assessment panel from Inventory+Endpoints → Host Inventory → Vulnerability Assessment.

After enabling the feature for the first time, it may take up to a week to get the updated data into the platform. Re-collecting the data from all endpoints in your network could take up to 6 hours. After that, Cortex Cloud initiates periodical recalculations to rescan the endpoints and retrieve the updated data. If at any point you want to force data recalculation, click Recalculate. The recalculation performed by any user on a tenant updates the list displayed to every user on the same tenant.

###### CVE Analysis

To evaluate the extent and severity of each CVE across your endpoints, you can drill down into each CVE in Cortex Cloud and view all the endpoints and applications in your environment that are impacted by the CVE. Cortex Cloud retrieves the latest information from the NIST public database. From Inventory → Endpoints → Host Inventory → Vulnerability Assessment, select CVEs on the upper-right bar. This information is also available in the `va_cves` dataset, which you can use to build queries in XQL Search.

If you have the Identity Threat Module enabled, you can also view the CVE analysis in the Host Risk View. To do so, from Inventory → Assets → Asset Scores, select the Hosts tab, right click on any endpoint, and select Open Host Risk View.

For each vulnerability, Cortex Cloud displays the following default and optional values.

| Value | Description |
| --- | --- |
| **Affected endpoints** | The number of endpoints that are currently affected by this CVE. For excluded CVEs, the affected endpoints are N/A. |
| **Applications** | The names of the applications affected by this CVE. |
| **CVE** | The name of the CVE. \*\*Tip:\*\* You can click each individual CVE to view in-depth details about it on a panel that appears on the right. |
| **Description** | The general NIST description of the CVE. |
| **Excluded** | Indicates whether this CVE is excluded from all endpoint and application views and filters, and from all Host Insights widgets. |
| **Platforms** | The name and version of the operating system affected by this CVE. |
| **Severity** | The severity level (Critical, High, Medium, or Low) of the CVE as ranked in the NIST database. |
| **Severity score** | The CVE severity score is based on the NIST Common Vulnerability Scoring System (CVSS). Click the score to see the full CVSS description. |

You can perform the following actions from Cortex Cloud as you analyze the existing vulnerabilities:

-   **View CVE details**: Left-click the CVE to view in-depth details about it on a panel that appears on the right. Use the in-panel links as needed.
    
-   **View a complete list of all endpoints in your network that are impacted by a CVE**: Right-click the CVE and then select View affected endpoints.
    
-   **Learn more about the applications in your network that are impacted by a CVE**: Right-click the CVE and then select View applications.
    
-   **Exclude irrelevant CVEs from your endpoints and applications analysis**: Right-click the CVE and then select Exclude. You can add a comment if needed, as well as Report CVE as incorrect for further analysis and investigation by Palo Alto Networks. The CVE is grayed out and labeled Excluded and no longer appears on the Endpoints and Applications views in Vulnerability Assessment, or in the Host Insights widgets. To restore the CVE, you can right-click the CVE and Undo exclusion at any time.
    
    **Note:**
    
    The CVE will be removed/reinstated to all views, filters, and widgets after the next vulnerability recalculation.
    

###### Endpoint Analysis

To help you assess the vulnerability status of an endpoint, Cortex Cloud provides a full list of all installed applications and existing CVEs per endpoint and also assigns each endpoint a vulnerability severity score that reflects the highest NIST vulnerability score detected on the endpoint. This information helps you to determine the best course of action for remediating each endpoint. From Inventory → Endpoints+Host Inventory → Vulnerability Assessment, select Endpoints on the upper-right bar. This information is also available in the va_endpoints dataset. In addition, the host_inventory_endpoints preset lists all endpoints, CVE data, and additional metadata regarding the endpoint information. You can use this dataset and preset to build queries in XQL Search.

For each vulnerability, Cortex XDR displays the following default and optional values.

| Value | Description |
| --- | --- |
| **CVEs** | A list of all CVEs that exist on applications that are installed on the endpoint. |
| **Endpoint ID** | Unique ID assigned by Cortex Cloud that identifies the endpoint. |
| **Endpoint name** | Hostname of the endpoint. \*\*Tip:\*\* You can click each individual endpoint to view in-depth details about it on a panel that appears on the right. |
| **Last Reported Timestamp** | The date and time of the last time the Cortex XDR agent started the process of reporting its application inventory to Cortex Cloud. |
| **MAC address** | The MAC address associated with the endpoint. |
| **IP address** | The IP address associated with the endpoint. |
| **Platform** | The name of the platform running on the endpoint. |
| **Severity** | The severity level (Critical, High, Medium, or Low) of the CVE as ranked in the NIST database. |
| **Severity score** | The CVE severity score based on the NIST Common Vulnerability Scoring System (CVSS). Click the score to see the full CVSS description. |

You can perform the following actions from Cortex Cloud as you investigate and remediate your endpoints:

-   **View endpoint details**: Left-click the endpoint to view in-depth details about it on a panel that appears on the right. Use the in-panel links as needed.
    
-   **View a complete list of all applications installed on an endpoint**: Right-click the endpoint and then select View installed applications. This list includes the application name, and version, of applications on the endpoint. If an installed application has known vulnerabilities, Cortex Cloud also displays the list of CVEs and the highest Severity.
    
-   (Windows only) **Isolate an endpoint from your network**: Right-click the endpoint and then select Isolate the endpoint before or during your remediation to allow the Cortex Cloud agent to communicate only with Cortex Cloud .
    
-   (Windows only) **View a complete list of all KBs installed on an endpoint**: Right-click the endpoint and then select View installed KBs. This list includes all the Microsoft Windows patches that were installed on the endpoint and a link to the Microsoft official Knowledge Base (KB) support article. This information is also available in the `host_inventory_kbs` preset, which you can use to build queries in XQL Search.
    
-   **Retrieve an updated list of applications installed on an endpoint**: Right-click the endpoint and then select Rescan endpoint.
    

###### Application Analysis

You can assess the vulnerability status of applications in your network using the Host inventory. Cortex Cloud compiles an application inventory of all the applications installed in your network by collecting from each Cortex XDR agent the list of installed applications. For each application on the list, you can see the existing CVEs and the vulnerability severity score that reflects the highest NIST vulnerability score detected for the application. Any new application installed on the endpoint will appear in Cortex Cloud within 24 hours. Alternatively, you can re-scan the endpoint to retrieve the most updated list.

**Note:**

Starting with macOS 10.15, Mac built-in system applications are not reported by the Cortex XDR agent and are not part of the Cortex Cloud Application Inventory.

From Inventory → Endpoints → Host Inventory, select Applications.

-   To view the details of all the endpoints in your network on which an application is installed, right-click the application and select View endpoints.
    
-   To view in-depth details about the application, left-click the application name.

#### Set a Cortex XDR agent Critical Environment version

Set the Cortex XDR agent as a Critical Environment (CE) version.

After you install the Cortex XDR agent and the agent registers with Cortex Cloud, you can set endpoints to run with a Cortex XDR agent Critical Environment (CE) version.

CE versions are designed for sensitive and highly regulated environments. These versions receive full content update coverage and contain the same feature set as the standard line it is based on. Please note, that some bug fixes, introducing higher stability risk, may not be incorporated into the maintenance releases of these lines. Support is provided for CE versions for 24 months, while support for standard versions is provided for 9 months.

**Note:**

To ensure the stability of the line, CE versions maintenance release cadence is longer than in the standard line, we recommend that deployment is adjusted accordingly.

Setting an endpoint with a CE agent version requires you to define your agent configurations which then allows you to do the following:

-   Create a CE agent installation package
    
-   Define the upgrade and auto-upgrade in the Agent Settings Profile
    

1.  Define your agent configuration.
    
    1.  Navigate to Settings → Configurations → General → Agent Configurations. Scroll down to Critical Environment Versions.
        
    2.  Click Enable Critical Environment Versions to be Created and Installed in the Tenant.
        
2.  Track endpoints with CE Agent versions.
    
    Navigate to Inventory → Endpoints → All Endpoints. In the table, locate the Version Type field to view whether the endpoint is defined as a Standard or Critical Environment agent.

#### Set an application proxy for Cortex XDR agents

Set an application-specific proxy for the Cortex XDR agent without affecting the communication of other applications on the endpoint.

In environments where agents communicate with the Cortex Cloud server through a wide-system proxy you can set an application-specific proxy for the Cortex XDR agent without affecting the communication of other applications on the endpoint. You can set the proxy during the agent installation, after installation using Cytool on the endpoint, or from All Endpoints in Cortex Cloud.

You can assign up to 10 different proxy servers per agent. The proxy server the agent uses is selected randomly and with equal probability. If communication fails between the agent and the Cortex Cloud server through the app-specific proxies, the agent resumes communication through the system-wide proxy defined on the endpoint. If that also fails, the agent directly resumes communication with Cortex Cloud.

When adding a proxy server, ensure it is in the Network Isolation Allow List if required. See _Set up agent setting profiles_, Response Actions.

**Warning:**

If adding a proxy to the allow list be aware of the following:

-   This allows any application on the isolated endpoint to communicate through that proxy, potentially allowing a threat actor or malware to bypass the isolation and reach external resources.
    
-   Ensure that no other non-security applications are utilizing this proxy if you choose to allow it.
    

How to set an agent proxy in Cortex Cloud

1.  From Cortex Cloud, select Inventory → Endpoints → All Endpoints.
    
2.  If needed, filter the list of endpoints.
    
3.  Select the row of the endpoint for which you want to set a proxy.
    
4.  Right-click the endpoint and select Endpoint Control → Set Agent Proxy.
    
5.  You can assign up to 10 different proxies per agent. For each proxy, enter the IP address and port number. You can also configure the proxy by entering the FQDN and port number. When you enter the FQDN, you can use all lowercase letters or all uppercase letters. Avoid using special characters or spaces.
    
    For example, `my.network.name:808,YOUR.NETWORK.COM:888,10.196.20.244:8080`.
    
6.  Click Set.
    
7.  If required, you can Disable Agent Proxy from the right-click menu.
    
    When you disable the proxy configuration, all proxies associated with that agent are removed. The agent resumes communication with the Cortex Cloud server through the system-wide proxy. If a system-wide proxy is not defined, the agent resumes direct communication with the Cortex Cloud server. If neither a system-wide proxy nor direct communication exists, the agent will disconnect from Cortex Cloud.

### Manage endpoint protection

The Cortex XDR agent is installed on each of your endpoints, and you can manage the agents using Cortex Cloud.

The Cortex XDR agent is installed on each of your endpoints, and you can perform various management activities on the agents, using Cortex Cloud.

#### Move agents between managing servers

You can move Cortex XDR agents to other Cortex Cloud managing servers.

You can move existing agents between Cortex Cloud managing servers directly from Cortex Cloud. This can be useful during migration, POCs, or to better manage your agent allocation between tenants. When you change the server that manages the agent, the agent transfers to the new managing server as a freshly installed agent, without any data that was stored on the original managing server. After the Cortex XDR agent registers with the new server, it can no longer communicate with the previous one.

**Prerequisite:**

Consider the following before making changes:

-   Endpoint type is not Kubernetes Node.
    
-   Installation type is not VDI.
    
-   Ensure you have administrator privileges for Cortex Cloud in the hub.
    

To register to another managing server, the Cortex XDR agent requires a distribution ID of an installation package on the target server in order to identify itself as a valid Cortex XDR agent. The agent must provide an ID of an installation package that matches the same operating system for the same or a previous agent version. For "same" version, this means all the levels of versioning information, including major version, minor version, patch version, and build number. For example, if you want to move a Cortex XDR Agent 8.x for Windows, you can select from the target managing server the ID of an installation package created for a Cortex XDR Agent 5.x for Windows. The operating system version can be different.

**Note:**

Cortex Cloud does not support moving agents between FedRamp and commercial tenants.

How to move Cortex XDR agents to other managing servers

1.  Obtain an installation package ID from the target managing server.
    
    1.  Log in to Cortex Cloud on the target management server, then navigate to Inventory → Endpoints → Agent Installations.
        
    2.  From the agent installations table, locate a valid installation package you can use to register the agent. Alternatively, you can create a new installation package if required.
        
    3.  Right-click the ID field and copy the value. Save this value, as you will need it later for the registration process. If the ID column is not displayed in the table, add it.
        
2.  Locate the Cortex XDR agent you want to move.
    
    Log in to the current managing server of the Cortex XDR agent and navigate to Inventory → Endpoints → All Endpoints.
    
3.  Change the managing server.
    
    1.  Select one or more agents that you want to move to the target server.
        
    2.  Right-click + Alt to open the options menu in advanced mode, and select Endpoint Control → Change managing server. This option is available only for an administrator in a supported Cortex Cloud version.
        
        
        
    3.  Enter the ID number of the installation package you obtained in Step 1. If you selected agents running on different operating systems, for example, Windows and Linux, you must provide an ID for each operating system. When done, click Move.
        
        
        
4.  Track the action.
    
    When you track the action in the Action Center, the original managing server will keep displaying In progress (Sent) status also after the action has ended successfully, since the agent no longer reports to this managing server. The new managing server will add this as a new agent registration action.

#### Manage endpoint tags

Segment your endpoints according to dynamic tags.

Endpoint tags enable multiple layers of segmentation to your endpoints. An endpoint tag is a dynamic entity that is created and assigned to one or more endpoints. The assigned endpoint tags can then be used to create Endpoint Groups, Policies, and Actions.

**Note:**

The following explanations use Windows operating system installation parameters and Cytool argument examples.

##### Create an endpoint tag

An endpoint tag can be created during installation of the Cortex XDR agent.

An endpoint tag can be created after installation either from the Cortex XDR agent or from the Cortex Cloud management console.

Add an endpoint tag as an installation parameter of the Cortex XDR agent's installer

Installer parameter: `run msiexec /i ... ENDPOINT_TAGS="Name1,Name2,Name3"`.

Cytool argument: `cytool endpoint_tags add "tag1 [,tag2,...,tagN]"`.

**Note:**

Tag names are case sensitive.

In Windows and Mac, a tag name can contain spaces.

Linux does not support tag names with spaces as command line arguments to the shell installer. Instead, tags can be set in the `/etc/panw/cortex.conf` configuration file, which supports all Linux installers.

Add an endpoint tag after installation

-   From the machine where the Cortex XDR agent is installed:
    
    1.  Navigate to the Cytool folder location and open the CLI as an administrator.
        
    2.  Cytool argument: `cytool endpoint_tags add "tag1 [,tag2, ...,tagN]"`.
        
        **Note:**
        
        Tag names are case sensitive and can contain spaces.
        
    
-   From the Cortex Cloud management console (Server)
    
    1.  Navigate to Inventory → Endpoints → All Endpoints.
        
    2.  Select one or more endpoints, right-click, and select Endpoint Control → Assign Endpoint Tags.
        
    3.  Select Add tag... and choose one or more tags from the list of existing tags or begin to type a new tag name to Create tag.
        
        **Note:**
        
        Tag names are case sensitive and can contain spaces.
        
    4.  (This step requires administrator permissions) To assign the tag to users or user groups, select Add selected tags to Users or Groups, and select the relevant Users and/or User Groups.
        
        **Note:**
        
        When SBAC is enabled, assigning tags may impact user permissions.
        
    5.  Click Save.
        
    

##### Remove an endpoint tag

Depending on where you created your tag, Server or Agent, you can choose to edit or remove the tags.

**Note:**

If you remove the tag and there are assigned users or user groups with scope settings, this can impact user permissions in the system.

Remove an Endpoint tag from the Cortex XDR agent

1.  Navigate to the Cytool folder location and open the CLI as an administrator.
    
2.  Cytool Argument: `cytool endpoint_tags remove "tag1 [,tag2, ...,tagN]"`.
    

Remove an Endpoint tag from the Cortex Cloud management console

1.  Navigate to Inventory → Endpoints → All Endpoints → Tags field.
    
2.  Select one or more endpoints, right-click, and select Endpoint Control → Remove Endpoint Tags.
    
3.  Click Save.
    

##### Track your endpoint tags

From the Cortex XDR agent

1.  Navigate to the Cytool folder location and open the CLI as an administrator.
    
2.  Cytool Argument: `cytool endpoint_tags list`.
    

From the Cortex Cloud management console

1.  Navigate to Inventory → Endpoints → All Endpoints → Tags field.
    
    All _Server_ and _Agent_ tags associated with the specific endpoint are displayed. Tags created in the XDR agent are displayed with a shield icon.
    
2.  You can filter and search the Tags field to find endpoints that have endpoint tags assigned to them.
    

##### Permanently remove Endpoint tags from the system

Using API, you can maintain the available tag list by permanently removing unused endpoint tags from your system.

-   `/public_api/v1/tags/agents/delete_permanently/`

#### Set an alias for an endpoint

Configure an alias to identify one or more endpoints by a name that is different from the endpoint hostname.

To identify one or more endpoints by a name that is different from the endpoint hostname, you can configure an alias. You can set an alias for a single endpoint or set an alias for multiple endpoints in bulk. To quickly search for the endpoints during an investigation and when you need to take action, you can use either the endpoint hostname or the alias.

1.  Select Inventory → Endpoints → All Endpoints.
    
2.  Select one or more endpoints.
    
3.  Right-click anywhere in the endpoint rows.
    
4.  Select Endpoint Control → Change Endpoint Alias.
    
5.  Enter the alias name and click Update.
    
    **Tip:**
    
    If you change your mind in the future, you can select Endpoint Control → Change Endpoint Alias again, and delete the required aliases.
    
6.  Use the Quick Launcher to search the endpoints by alias across Cortex Cloud.

#### Manage endpoint prevention profiles

You can manage the endpoint prevention profiles of your Cortex XDR agent endpoints in various ways, including editing, duplicating, and populating endpoint prevention policy rules.

After you create and customize your endpoint prevention profiles, you can manage them from the Prevention Profiles page as needed.

##### View the prevention policy rules that use a specific prevention profile

Before you modify or delete a profile, you can check which policy rules, if any, use the profile.

-   From Inventory → Endpoints → Policy Management → Prevention → Profiles, right-click the profile and select View policy Rules.
    
    Cortex Cloud opens the Prevention Policy Rules page on a new tab. This page is filtered, and only displays the rules that use the profile that you selected.
    

##### Edit, export, duplicate, or delete an endpoint prevention profile

Edit a profile:

1.  From Inventory → Endpoints → Policy Management → Prevention → Profiles, right-click the profile and select Edit.
    
2.  Make your changes, and then click Save.
    

Export a profile:

1.  From Inventory → Endpoints → Policy Management → Prevention → Profiles, right-click the profile and select Export Profile.
    
2.  Click Export. The profile is downloaded to your computer.
    

Duplicate a profile:

1.  From Inventory → Endpoints → Policy Management → Prevention → Profiles, right-click the prevention profile and select Save as New. A new profile is displayed, containing the values from the profile that you selected.
    
2.  Edit the profile name and description, edit any values that you want to change, and then click Create.
    
3.  Populate a new prevention policy rule with your new profile.
    

Delete a profile:

1.  If necessary, delete or detach any policy rules that use the profile before attempting to delete it.
    
2.  From Inventory → Endpoints → Policy Management → Prevention → Profiles, locate the profile that you want to remove. The profile's Usage Count cell must have a 0 (zero) value.
    
3.  Right-click the prevention profile and select Delete.
    
4.  To confirm the deletion, click Yes.
    

##### Populate a new prevention policy rule with a prevention profile

1.  From Inventory → Endpoints → Policy Management → Prevention → Profiles, right-click the profile and select Create a new policy rule using this profile.
    
    Cortex Cloud automatically populates the Platform selection based on your profile configuration, and assigns the profile based on the profile type.
    
2.  For Policy Name, enter a meaningful name, and optionally, add a description for the policy rule.
    
3.  Assign any additional profiles that you want to apply to your policy rule, and click Next. A list of endpoints is displayed.
    
4.  Select the target endpoints for the policy rule, or use the filters to define criteria for the policy rule to apply, and then click Next.
    
5.  Review the policy rule summary, and then click Done.
    

##### Create a new prevention policy rule for serverless function

1.  From Inventory → Endpoints → Policy Management → Prevention → Profiles, right-click the profile and select Create a new policy rule using this profile.
    
    Cortex Cloud automatically populates the Platform selection based on your profile configuration as well as the Restricitons selection with the selected profile.
    
2.  For Policy Name, enter a meaningful name, and optionally, add a description for the policy rule, and then click Next.
    
3.  Use the filters to define criteria for the policy rule to apply, and then click Next.
    
    Select from the following function parameters:
    
    -   Cloud provider
        
    -   Region
        
    -   Runtime
        
    -   Function version
        
    -   Endpoint name
        
    
4.  Review the policy rule summary, and then click Done.
    

**Note:**

The filter is stored within the policy definition and assessed during runtime to extract the functions that match the filter criteria.

##### View information about your endpoint prevention profiles

The following table displays the fields that are available on the Prevention Profiles page, in alphabetical order. The table includes both default fields and additional fields that are available in the column manager. To view this page, go to Inventory → Endpoints → Policy Management → Prevention → Profiles.

| Field | Description |
| :-- | :-- |
| Associated Targets | The endpoints or endpoint groups to which the profile is assigned |
| Created By | The administrator who created the prevention profile |
| Created Time | The date and time at which the prevention profile was created |
| Description | An optional description entered by an administrator to describe the prevention profile |
| Modification Time | The date and time at which the prevention profile was modified |
| Modified By | The administrator who modified the prevention profile |
| Name | The prevention profile name |
| Profile ID | The ID assigned to to the profile by Cortex Cloud |
| Summary | Summary of prevention profile configuration |
| Type | The prevention profile type, such as Malware or Agent Settings |
| Usage Count | The number of policy rules that use the profile. If you want to delete a profile, ensure that this cell displays "0". |

#### Upgrade Cortex XDR agents

You can upgrade the Cortex XDR agent software by using the appropriate method for the endpoint operating system.

After you install the Cortex XDR agent and the agent registers with Cortex Cloud, you can upgrade the Cortex XDR agent software using a method supported by the endpoint platform:

-   **Android:** Upgrade the app directly from the Google Play Store or push the app to your endpoints from an endpoint management system such as AirWatch.
    
-   **iOS:** Upgrade the app directly from the Apple App Store (agent version 8.6 or later), or push the app to your endpoints from an endpoint management system.
    
-   **Windows, Mac, or Linux:** Create new installation packages and push the Cortex XDR agent package to up to 5,000 endpoints from Cortex Cloud.
    

**Important:**

The following list includes important points to take into account when upgrading the Cortex XDR agent:

-   Review the recommended guidelines for keeping Cortex XDR agents and content updated. Read more here.
    
-   You cannot upgrade the Cortex XDR agent on VDI endpoints or a Golden Image.
    
-   You must reinstall (uninstall and install again) the relevant agent version on the Golden Image,
    
-   Installing a Golden Image for the Citrix App Layering environment must be performed on OS layer only.
    
-   Every new agent version installation must be performed on OS layer's version where the agent was not previously installed. There is no possibility to reinstall agent on the Golden Image for the Citrix App Layering environment.
    
-   You cannot enable auto-upgrade for Mobile, VDI, and TS installations.
    

**Warning:**

You must ensure that the System Extensions were approved on the endpoint. Otherwise, if the extensions were not approved, after the upgrade the extensions remain on the endpoint without any option to remove them which could cause the agent to display unexpected behavior. To check whether the extensions were approved, you can either verify that the endpoint is in Fully Protected state in Cortex Cloud, or execute the following command line on the endpoint to list the extensions: `systemextensionsctl list`. If you need to approve the extensions, follow the workflow explained in the Cortex XDR agent administration guide for approving System Extensions.

Upgrades are supported using actions that you can initiate from the Action Center or from All Endpoints as described in this workflow.

How to upgrade Cortex XDR agent software

1.  Create an agent installation package for each operating system version for which you want to upgrade the Cortex XDR agent.
    
    Note the installation package names.
    
2.  Select Inventory → Endpoints → All Endpoints.
    
    If needed, filter the list of endpoints. To reduce the number of results, use the endpoint name search and filters Filters at the top of the page.
    
3.  Select the endpoints you want to upgrade.
    
    You can also select endpoints running different operating systems to upgrade the agents at the same time.
    
4.  Right-click your selection and select Endpoint Control → Upgrade Agent Version.
    
    For each platform, select the name of the installation package you want to push to the selected endpoints.
    
    You can install the Cortex XDR agent on Linux endpoints using a package manager. If you do not want to use the package manager, clear the option Upgrade to installation by package manager.
    
    When you upgrade an agent on a Linux endpoint that is not using a package manager, Cortex Cloud upgrades the installation process by default according to the endpoint Linux distribution.
    
    **Note:**
    
    The Cortex XDR agent keeps the name of the original installation package after every upgrade.
    
5.  Upgrade.
    
    Cortex Cloud distributes the installation package to the selected endpoints at the next heartbeat communication with the agent. To monitor the status of the upgrades, go to Investigation & Response → Response → Action Center.
    
    From the Action Center you can also view additional information about the upgrade; right-click the action and select Additional data. Whilst the upgrade status is Pending, it can be canceled, right-click the action and select Cancel Agent Upgrade.
    
    **Note:**
    
    -   It is possible to cancel an upgrade if the Status is Pending. Once the Status is In Progress, the action is already received by the agent locally and cannot be canceled from the management console.
        
    -   Custom dashboards that include upgrade status widgets, and the All Endpoints page display upgrade status.
        
    -   During the upgrade process, the endpoint operating system might request a reboot. However, you do not have to perform the reboot for the Cortex XDR agent upgrade process to complete it successfully.
        
    -   After you upgrade on an endpoint with Cortex Cloud Device Control rules, you need to reboot the endpoint for the rules to take effect.

#### Restart agent

Learn how to restart the agent on the endpoint.

You can restart an agent from the Cortex Cloud tenant. This action is hidden by default.

As soon as the action is confirmed, the restart command triggers a restart of the agent on the endpoint.

1.  From Cortex Cloud, navigate to Inventory → Endpoints → All Endpoints. Select the relevant endpoint to restart and right-click + Alt, select Endpoint Control → Restart Agent, and click OK.
    
2.  Select I agree, and then click OK to confirm restarting the agent on all selected endpoints.

#### Uninstall the Cortex XDR agent

Uninstall Cortex XDR agent from one or more endpoints at any time using the Action Center, or one-by-one using the All Endpoints page.

If you want to uninstall the Cortex XDR agent from the endpoint, you can do so from the Cortex Cloud tenant at any time. You can uninstall them from an unlimited number of endpoints in a single bulk action using the Action Center. You can also uninstall each endpoint one-by-one, using the All Endpoints page. Uninstallation of an endpoint triggers the following lifespan flow:

-   When you uninstall the agent from the endpoint, the action is immediate. All agent files and protections are removed from the endpoint, leaving the endpoint unprotected.
    
-   The endpoint status changes to Uninstalled , and the license returns immediately to the license pool. After a retention period of 7 days, the agent is deleted from the database and is displayed in Cortex Cloud as Endpoint Name - `N/A (Uninstalled)`.
    
-   Data associated with the deleted endpoint is displayed in the Action Center tables and the Causality View for the standard 90-day retention period.
    
-   Issues that already include the endpoint data at the time of the issue creation are not affected.
    

**Note:**

-   Before upgrading a Cortex XDR agent running on macOS 10.15.4 or later, you must ensure that the System Extensions were approved on the endpoint. Otherwise, if the extensions were not approved, after the upgrade the extensions remain on the endpoint without any option to remove them which could cause the agent to display unexpected behavior. To check whether the extensions were approved, you can verify that the endpoint is in a Fully Protected state in Cortex XDR or execute the following command line on the endpoint to list the extensions: `systemextensionsctl` list. If you need to approve the extensions, follow the workflow explained in the Cortex XDR agent administration guide for approving System Extensions.
    
-   For iOS and Android endpoints, uninstallation will reset account registration and data, but the app itself will remain on the device until removed locally by the user. The endpoint will be disconnected, and the user will no longer be able to connect the app to the tenant account.
    

##### Uninstall endpoints using the Action Center

1.  Log in to Cortex Cloud.
    
    Go to Investigation & Response → ResponseAction Center.
    
2.  Click \+ New Action.
    
3.  Select Agent Uninstall.
    
4.  Click Next.
    
5.  Select the target endpoints (up to 100) from which you want to uninstall the Cortex XDR agent.
    
    **Tip:**
    
    If needed, use the filter to filter the list of endpoints by attribute or group name.
    
6.  Click Next.
    
7.  Review the action summary and click Done when finished.
    
8.  To track the status of the uninstallation, return to the Action Center.
    

##### Uninstall endpoints using the All Endpoints page

1.  Log in to Cortex Cloud.
    
    Go to Inventory → Endpoints → All Endpoints.
    
2.  Find and then right-click the agent that you want to uninstall, and select Endpoint Control → Uninstall Agent.
    
3.  In the confirmation dialog box that appears, select I agree, and click OK.

#### Clear agent database

Learn how to clear the Cortex XDR agent database.

If one or more Cortex XDR agents are having issues, you can attempt a reset by clearing the Cortex XDR agent state of one or more endpoints.

**Note:**

Clearing the agent database is supported on all platforms with Cortex XDR agent version 7.9 or later, and is available only when using the debugging mode.

Clearing the agent database is available only when using the debugging mode, and can be tracked in the Action Center.

1.  Clear Agent Database.
    
    1.  Navigate to Inventory → Endpoints → All Endpoints and select one or more endpoints for which you want to clear the database.
        
    2.  In Windows, press ALT and right-click, or in macOS press Option and right-click, to open the context menu in debugging mode.
        
    3.  Navigate to Endpoint Control → Clear Agent Database.
        
2.  Track progress of the Clear Database action.
    
    1.  Navigate to Investigation & Response → Response → Action Center.
        
    2.  In the All Actions table, filter the Action Type field according to Agent Database Cleanup.
        
        **Note:**
        
        You can only right-click to cancel the clear agent database for actions with a pending status.

#### Delete Cortex XDR agents

Delete endpoints from Cortex Cloud tenant views.

If you have an endpoint that you no longer want to track through Cortex Cloud, for example, if the endpoint disconnected from Cortex Cloud, or an endpoint where the Cortex XDR agent was uninstalled, you can delete the endpoint from the Cortex Cloud tenant views. Deleting an endpoint triggers the following lifespan flow:

-   The endpoint status changes to Deleted , and the license returns immediately to the license pool. After a retention period of 90 days, the agent is deleted from the database and is displayed in Cortex Cloud as Endpoint Name - `N/A (Deleted)`.
    
-   Data associated with the deleted endpoint is displayed in the Action Center tables and in the Causality View for the standard 90-day retention period.
    
-   Alerts that already include the endpoint data at the time of alert creation are not affected.
    

Additionally, Cortex Cloud automatically deletes agents after a long period of inactivity.

-   Standard agents are deleted after 180 days of inactivity. Where day one is the first 24 hours of continuous inactivity.
    
-   VDI and TS agents are deleted after 6 hours of inactivity.
    

**Note:**

To reinstate an endpoint, you have to uninstall and reinstall the agent.

The following workflow describes how to delete the Cortex XDR agent from one or more Windows, Mac, or Linux endpoints.

1.  Select Inventory → Endpoints → All Endpoints.
    
2.  Right-click the endpoint you want to remove.
    
    You can also select multiple endpoints if you want to perform a bulk delete.
    
3.  Select Endpoint Control → Delete Endpoint.

#### Manage agent tokens

Manage tokens per agent to retrieve the password used to run functions at the agent.

You can now run some of the agent functions that require administrative passwords using a unique token shared between Cortex Cloud and Cortex XDR agent.

Two types of tokens can be set:

-   **Rolling token:** Automatically generated per endpoint every fourteen days by the system and then sent to the relevant agent
    
-   **Temporary token:** Set a temporary token that is valid anywhere from one to twenty-one days.
    
    **Note:**
    
    Agent tokens are only supported for Windows and Mac.
    

1.  View agent password.
    
    You can view the password of the selected agent. The dialog box indicates whether the password is from a rolling token or a temporary token.
    
    1.  Select Inventory → Endpoints → All Endpoints → Endpoint Control → View Token.
        
    2.  Click the copy button to copy the password displayed and then click OK.
        
    
    You can now use the password to run functions at the agent.
    
2.  Add a temporary token.
    
    You can generate a temporary token for any of the agents for a specified number of days between 1-21 days. If the agent is disconnected, it gets the temporary token when the agent connects.
    
    **Note:**
    
    You can select a one or multiple agents to add a temporary token.
    
    1.  Select Inventory → Endpoints → All Endpoints → Endpoint Control → Set Temporary Token.
        
    2.  In the Token Expiration field, add the number of days for which to generate a temporary token for the agent, and then click the Add Token Expiration blue arrow.
        
    3.  Click the copy button to copy the password displayed and then click Create to begin generating the token.
        
    4.  Go to the Action Center to view which agent received the temporary token.
        
    
    You can now use the password to run functions on the agent.
    
3.  Retrieve the token using the token hash from the endpoint.
    
    If the endpoint is disconnected from the server at the point the rolling token was updated, it won’t be possible to run agent functions with the updated token from the server. You can still retrieve the password to run functions on the agent.
    
    1.  From the agent, run the `cytool.exe` to run the token query command. This command displays the current token of the endpoint.
        
    2.  Copy the token from the command line interface of the agent.
        
    3.  In the server, at the top of the page, click Retrieve Token.
        
    4.  In the Retrieve Token dialog box, in the Hash field, paste the token that you copied from the endpoint.
        
    5.  Click the copy button to copy the password displayed and then click OK.
        
        You can now use the password to run functions on the agent.

#### Retrieve support file password

Learn how to retrieve the password to access files from the Tech Support File (TSF), which is generated in a zip format protected by an encrypted password.

From Cortex XDR agent, the Tech Support File (TSF) is generated in a zip format protected by an encrypted password. The TSF file is archived inside another file which also includes a metadata file that contains a token. The token is used to retrieve the password to unzip the TSF file.

-   To retrieve the password for the TSF file from the endpoint, go to the Cortex Cloud server from the Tokens and Passwords option.
    
-   To retrieve the password for the TSF file from the server, go to the Action Center.
    

1.  Retrieve Support File Password from Inventory → Endpoints → All Endpoints.
    
    1.  At the top of the page, click the key icon  (Tokens and Passwords) and select Retrieve Support File Password.
        
    2.  In the Retrieve Support File Password dialog box, in the Encrypted Password field, paste the token that you copied from the metadata file located in the saved file when running the Cytool log collect.
        
    3.  Click the copy button to copy the password displayed and then click Ok. Use the password to unzip the TSF file.
        
2.  Retrieve Support File Password from Action Center → All Actions.
    
    1.  Right-click the relevant action of action type Support File Retrieval and select Additional Data.
        
    2.  Right-click the action and select Retrieve Support File Password.
        
    3.  In the Retrieve Support File Password dialog box, in the Encrypted Password field, paste the token that you copied from the metadata file located in the download file.
        
    4.  Click the copy button to copy the password displayed and then click Ok. Use the password to unzip the TSF file.

#### Monitor agent operational status

You can view the operational status of any Cortex XDR agent that you manage.

From the Cortex Cloud management console, you have full visibility into the Cortex XDR agent operational status on the endpoint, which indicates whether the agent is providing protection according to its predefined security policies and profiles. By observing the operational status on the endpoint, you can identify when the agent may suffer from a technical issue or misconfiguration that interferes with the agent’s protection capabilities or interaction with Cortex Cloud and other applications. The Cortex XDR agent reports the operational status as follows:

-   **Protected**: Indicates that the Cortex XDR agent is running as configured and did not report any exceptions to Cortex Cloud.
    
-   **Partially protected**: Indicates that the Cortex XDR agent reported one or more exceptions to Cortex Cloud.
    
-   **Unprotected**: Indicates that the Cortex XDR agent is not enforcing protection on the endpoint.
    
-   **Local Resource Impact**: Indicates that the Cortex XDR agent machine resources currently available for use, are not enough for the agent to operate smoothly.
    

You can monitor the Cortex XDR agent Operational Status in Inventory → Endpoints → All Endpoints. If the Operational Status field is missing, add it.

The operational status that the agent reports varies according to the exceptions reported by the XDR agent.

| Status | Description |
| --- | --- |
| Protected | **Windows, Mac, and Linux**: Indicates that all protection modules are running as configured on the endpoint. |
| Partially protected | Windows XDR data collection is not running, or not set; Behavioral threat protection is not running; Malware protection is not running; Exploit protection is not running Mac Operating system adaptive mode\*; XDR Data Collection is not running, or not set; Behavioral threat protection is not running; Malware protection is not running; Exploit protection is not running Linux Kernel module not loaded\*\*; Kernel module compatible but not loaded\*\*; Kernel version not compatible\*\*; XDR Data Collection is not running, or not set; Behavioral threat protection is not running; Anti-malware flow is asynchronous; Malware protection is not running; Exploit protection is not running \*\*Note:\*\* Any of the listed items could lead to a partially protected state. Refer to the Cortex Cloud management console for specific reasons for the state. |
| Unprotected | Windows, Mac, and Linux: Behavioral threat protection and Malware protection are not running; Exploit protection and malware protection are not running; The content is unavailable |
| Local Resource Impact | Windows, Mac, Linux Machine CPU impact on the agent operation; Machine memory impact on the agent operation In addition to the status, either one of the following sub-statuses appear: Low local available memory; No local available memory |
| **Caution:** Status can have the following implications on the endpoint: \*(`Status`): The exploit protection module is not running.; \*\*(`Status`):- XDR data collection is not running; Behavioral threat protection is not running; Anti-malware flow is asynchronous; Local privilege escalation protection is asynchronous |

#### Monitor agent activity

You can monitor the activity of any Cortex Cloud Cortex XDR agent that you manage.

The Cortex XDR agent logs entries for events that are monitored by the Cortex XDR agent, and hourly reports the logs back to Cortex Cloud. Cortex Cloud stores the logs for 365 days. To view the Cortex XDR agent logs, select Settings → Agent Audit Logs.

To ensure you and your colleagues stay informed about agent activity, you can configure notification forwarding, to forward your Agent Audit log to an email distribution list, Syslog server, or Slack channel. See the Configure Notifications Forwarding section.

You can customize your view of the logs by adding or removing filters to the Agent Audit Logs table. You can also filter the page result to narrow down your search. The following table describes the default and optional fields that you can view in the Cortex Cloud Agents Audit Logs table:

| Field | Description |
| --- | --- |
| Category | The XDR agent logs these endpoint events using one of the following categories: Audit: Successful changes to the agent indicating correct behavior.; Monitoring: Unsuccessful changes to the agent that may require administrator intervention.; Status: Indication of the agent status. |
| Description | Log message that describes the action. |
| Domain | Domain to which the endpoint belongs. |
| Endpoint ID | A unique ID assigned by the XDR agent. |
| Endpoint Name | Endpoint hostname. |
| Received Time | Date and time when the action was received by the agent and reported back to Cortex Cloud. |
| Result | The result of the action (Success, Fail, or N/A) |
| Severity | Severity associated with the log: Critical; High; Medium; Low; Informational |
| Type and Sub-Type | Additional classification of agent log (Type and Sub-Type): Installation:- Install; Uninstall; Upgrade ; Policy change:- Local Configuration Change; Content Update; Policy Update; Process Exception; Hash Exception ; Agent service:- Service start (reported only when the agent fails to start and the RESULT is `Fail`); Service stopped; Anti-Tampering (reported when anti-tamper protection is disabled locally on an agent) ; Agent modules:- Module initialization; Local analysis module; Local analysis feature extraction ; Agent status:- Fully protected; OS incompatible; Software incompatible; Kernel driver initialization; Kernel extension initialization; Proxy communication; Quota exceeded (reported when old prevention data is being deleted from the endpoint); Minimal content ; Action:- Endpoint Token; Scan; File retrieval; Terminate process; Isolate; Cancel isolation; Payload execution; Quarantine; Restore; Block IP address; Unblock IP address; Tagging |
| Timestamp | Date and time when the action occurred. |
| XDR Agent Version | The version of the XDR agent running on the endpoint. |

#### Monitor agent upgrade status

From Inventory → Endpoints → All Endpoints, you can view the upgrade status of any Cortex XDR agent that you manage.

From Cortex Cloud, you have full visibility into the Cortex XDR agent upgrade status on the endpoint. You can monitor the Cortex XDR agent statuses in Inventory → Endpoints → All Endpoints. If the upgrade status fields are missing, add them. Cortex XDR agents report upgrade statuses as follows:

| Status | Description |
| --- | --- |
| Last upgrade status | Displays the last upgrade status for each endpoint, and can be filtered by: In Progress: This is the first stage shown when an upgrade is initiated (There is no Pending status).; Completed Successfully; Failed; No Upgrade: No upgrade of any type has been initiated for the endpoint. Newly installed endpoints will also show this status until an upgrade is initiated by one of the upgrade methods. |
| Last upgrade status time | Displays a timestamp for the last time the upgrade status changed for each endpoint. This column can be filtered by date and time. |
| Last upgrade failure reason | When relevant, displays the reason for an upgrade failure. This column can be filtered by free text. |
| Last upgrade source | Displays the source that initiated the last upgrade, and can be filtered by the following: Manual Server Upgrade: The upgrade was manually initiated from the server.; Auto Upgrade: The endpoint was automatically upgraded according to the upgrade policy.; Local Manual Upgrade: The upgrade was manually initiated at the endpoint side. |

## Endpoint DLP

### Cortex Data Loss Prevention (DLP) module overview

Learn about Cortex Data Loss Prevention (DLP) module, which provides a solution to prevent sensitive data exfiltration.

The Cortex Data Loss Prevention (DLP) module provides a unified and flexible solution to prevent sensitive data exfiltration. It continuously enforces policies on endpoints (even offline) across web, local, and USB channels, protecting both on-premise and cloud environments.

After endpoint DLP is enabled, the DLP module is downloaded to all eligible endpoints.

This highlights Cortex's benefit of proactively safeguarding sensitive information. Future enhancements will include data-at-rest discovery, adaptive policies, and broader channel support.

**Prerequisite:**

-   Endpoint DLP add-on license
    
-   Cortex agent 9.1 and above for Windows and macOS
    

#### Supported platforms

-   Supported browsers for the Cortex data security extensions: Google Chrome and Microsoft Edge.
    
-   Supported platforms for the local applications:
    
    -   Windows: x64
        
    -   macOS
        
    

#### Supported file types and extensions

| File types/extensions | OS support |
| --- | --- |
| asm, bmp, c, c++, cgi, cpp, cs, csv, cxx, doc, docx, dotx, h, hpp, img, jav, java, jpeg, jpg, js, key, m, numbers, oxps, pages, pdf, pl, png, potx, ppsx, ppt, pptx, ps1, py, r, rb, rtf, s, S, tif, tiff, txt, v, vbs, verilog, vh, vhd1, vlg, vsd, vsdm, vsdx, xls, xlsx, xps, xsltx | Windows |
| Bmp, Csv, JavaClass, JavaScript, Jpg, Ole, Pdf, Perl, Plist, Png, PowerShell, Python, Rtf, Ruby, Txt, Vbs | macOS |

#### Agent limitations

-   Supported platforms: Windows and macOS
    
-   Minimum agent version: 9.1.0
    
-   USB channel on Windows:
    
    -   Before Windows 11 version 22H2, tracking is limited to files transferred to USB drives via File Explorer.
        
    -   Starting with Windows 11 22H2, all transfers via the Windows CopyFile API are tracked. This does not include 3rd party copy applications.
        
    
-   Archived files are not supported
    
-   Supported file size: up to 30Mb
    
-   Local applications:
    
    -   When the Dropbox Backup is enabled, it triggers a DLP alert when opening a sensitive file.
        
    -   Support for the WhatsApp app for Windows desktop is limited to the UWP edition. There is a new version of WhatsApp (v 2.3000.1209\* at the time of this publication) that embeds the web version of WhatsApp in a desktop application using Edge's Webview2 engine, which is not yet supported.
        
    

#### Use cases

-   Protecting personal information: Protects information like names, addresses, and credit card numbers to adhere to privacy policies (like GDPR or HIPAA).
    
-   Guarding company secrets: Prevents valuable designs, formulas, and business plans from falling into the wrong hands (like competitors).
    
-   Meeting legal rules: Helps businesses in specific industries (like healthcare or finance) follow strict laws about handling data.
    
-   Stopping leaks (accidental or intentional): Catches employees trying to email sensitive files to their accounts or upload them to unauthorized websites. It also helps prevent cybercriminals from stealing data.
    
-   Seeing and controlling data: Helps you locate all your important data and allows you to determine who can access it and how it can be utilized.
    

#### User roles and permissions

Cortex DLP now includes two new out-of-the-box roles:

-   Data security admin: Defines the policy and its key components, including applications.
    
-   Data security viewer: Review and analyze DLP-related issues.
    

Refer to Personas workflow for DLP for the steps on how to create and manage endpoint DLP in your environment.

Verify that the user has the correct permissions in the linked role for access and configuration permissions to DLP capabilities.

1.  Go to Settings → Configuration → Access Management → Roles.
    
2.  Go to the relevant role, right-click and select Edit Role , and in the Components tab, verify under Data Security that the settings are configured to View/Edit.

### Personas workflow for DLP

The data security administrator and data security viewer are responsible for identifying DLP requirements for creating data-in-motion rules and investigating issues and cases.

The workflow outlines the responsibilities of the data security administrator and data security viewer in identifying and assessing data protection requirements, creating data-in-motion rules, investigating DLP-related issues, and protecting the organization's assets and data properties.

#### Data security administrator

The data security administrator views and manages all data security information, including objects and data patterns.

They are responsible for creating and managing the data-in-motion rules, identifying and investigating DLP-type threats and attacks within an organization.

**Steps**:

1.  Configuring Endpoint DLP Settings: Configure the settings according to your organization's needs.
    
2.  Configuring sensitive data definitions: Identify and classify sensitive data (Data Profiles and Data Patterns).
    
3.  Configuring policies: Setting rules to apply to sensitive data.
    
4.  Investigate: Review and analyze DLP-related issues to gather information that will help reduce false positives, refine policies, and improve incident response and auditing.
    
5.  Refine policies: Adjust DLP rules to be more accurate, reduce false positives, and cover new risks.
    

#### Data security viewer

The data security viewer reviews and analyzes DLP-related issues to gather information that will help reduce false positives, refine policies, and improve incident response and auditing.

**Steps**:

1.  Investigate and remediate: For true incidents, stop the data loss and investigate what happened and why.
    
2.  Document and report: Create a record of the incident for legal and compliance purposes.
    
3.  Communicate and educate: Speak to the user involved and update security training to prevent future issues.

### Best Practices
The following guidelines are best practices for creating a DLP workflow to optimize DLP design and performance. Whether you are starting or building a new rule, we recommend reviewing these recommendations carefully so your DLP plan has a clear, logical flow and runs correctly and efficiently.

When defining a data-in-motion rule, start with a couple of endpoints to verify that the rule you created is working before implementing it for a wider audience.

#### Use clear rule names and descriptions

Describe rules clearly. Rules should be clear to someone not familiar with the DLP workflow. This applies to rule names and the rule description. When naming a data-in-motion rule, the guideline should be that users can understand what the rule does by reading the rule name alone, without needing to open the rule to view its details.

| Clear | Unclear |
| --- | --- |
| Block files classified as PII to Google Drive | Block PII file |
| \*\*Note:\*\* A good example would be to add the description from the Raised Issue Name of the specific Data-in-Motion rule. Block uploads to social networks | Block social network |

#### Select the appropriate action

Choosing to BLOCK a source will prevent it from reaching its destination. Be sure to consider the consequences before you decide to BLOCK or ALLOW. You can always use the REPORT action before to test that the rule is properly configured to identify the correct conditions and data.

#### Consider the source, destination, and data scope

If no source is defined, you must select the data scope. The data scope defines the data profile, which constitutes sensitive data for your organization and applies to both files and tables.

The source refers to the data we want to protect. When selecting the source, select the web application from which the file originated. The DLP process inspects data as it's being transmitted and takes action based on the policy.

| Endpoint type | Setting | Example |
| --- | --- | --- |
| Source | Custom web application group | Add a custom web application (should be configured before creating the rule) called **Sensitive sources** , which contains the following URLs: Workday.com; OurCorporatePortal.de \*\*Note:\*\* When adding a source, it becomes a mandatory requirement that must be met for the rule to trigger. You should only apply this setting if you want the rule to take action exclusively when files originate from those specific locations. |
| Destination | Web destination: None, Any, or Specific Web Application Group **Any** refers to any Web destination; Local destination | Catalog Web application group that includes: AI-meeting-assistant, AI-Writing-assistant categories; Local application group that includes: Slack, Telegram |
| Data scope | Data profiles | Financial |

Example 28. Process example:

Block files originating from the internal company portal (source) that are moving to the web application WhatsApp web (destination).

  

#### Refer to HITS in the data-in-motion table to understand the impact of the rules

HITS show the number of raised issues. This only appears when the BLOCK or REPORT action rules are matched.

Refer to Modules → Data Security → Data Security Issues → Threats, to view the details of the alert or incident that the DLP system has flagged. The issue is raised when a user action or system event matches the conditions of the data-in-motion rule.

A raised issue from DLP is an alert triggered by a DLP system. This alert indicates that someone has performed an action that violates a policy designed to protect sensitive data.

The DLP system automatically detects a policy violation, such as a user trying to download a document containing credit card information from Google Drive. This raises an issue. The issue includes details about the user, the type of data involved, and the action that was attempted.

Depending on the policy, the system might block the action, prompt the user with details on why it was blocked, and allow them to override the action or to add justification, or simply log and send the event to the XDR DLP console. Security teams then investigate these issues to determine if the activity was malicious, accidental, or a legitimate business need.

#### Verify Endpoint DLP settings

Go to Modules → Data Security → Endpoint Data-in-Motion Rules → Endpoint DLP Settings to configure the tenant settings for DLP.

DLP rule/s can override the End User Dialog settings with more specific definitions and texts.

### Configure DLP end-to-end
This section describes how to get up and running with Cortex DLP, including how to define Endpoint DLP settings, add applications and application groups, and define data-in-motion rules.

#### Onboarding checklist for DLP
We recommend following these steps to ensure all requirements for setting up DLP are met, protecting sensitive data, and maintaining compliance with your organization's standards.

| Step | Details | See More |
| --- | --- | --- |
| Step 1. Install the DLP browser extension | Install the DLP browser extension on your endpoint. This extension works with the DLP agent to monitor and enforce security policies on web-based activities. | See topic |
| Step 2. Check permissions for user roles | Refer to "Users and Roles" and verify that the settings for Data Security Admin are set up to create, manage, and remove data-in-motion rules. | See topic |
| Step 3. Add applications | Add local and web applications that can be added to the application group when selecting source and destination in the data-in-motion rule. | See topic |
| Step 4. Add application groups | Create application groups for the source and destination in the data-in-motion rule. | See topic |
| Step 5. Define DLP rules | Rules that control sensitive data transfers based on context, such as source, destination, and data classification. They enforce actions like block, allow, or report. | See topic |
| Step 6. Configure endpoint DLP settings | Configure your endpoint DLP settings to define the DLP setup for your organization. | See topic |
| Step 7. DLP status in all endpoints | View the installation of the extension status and the DLP status on each endpoint. | See topic |
| Step 8. Review threats | Track and investigate the issues triggered when a data-in-motion rule is violated | See topic |

##### Install DLP browser extension on your endpoint
For DLP activation, you must install the CDSx browser extension on your endpoint. This extension works with the DLP agent to monitor and enforce security policies on web-based activities.

**Note:**

The extensions are not enabled for Incognito or InPrivate modes in Chrome and Edge. It is recommended to disable these modes in the organization.

Enabling the extension in Cortex

1.  Navigate to Modules → Data Security → Endpoint Data-in-Motion Rules → Endpoint DLP Settings.
    
2.  For Cortex Data Security Extension (Web DLP Channel), select the browser extension activation mode. Refer to Configure endpoint DLP settings for more information.
    

###### Windows

Use a managed deployment platform like UEM, MDM, or group policy to push the browser extension to the endpoints.

Refer to the steps below to download the registry file (reg file), install, and configure settings to activate the extension on the endpoints.

**Important:**

Endpoints should be linked to the domain.

Select one of the following managed installation options:

**1\. Managed installation from group policy**

Extension ID & URL:

`aalncdhjokfcbldaemnehledpfpibopi;file:///C:\ProgramData\Cyvera\Everyone\CDSX\extension.xml`

**2\. Managed installation from Intune**

Extension ID & URL:

`aalncdhjokfcbldaemnehledpfpibopi;file:///C:\ProgramData\Cyvera\Everyone\CDSX\extension.xml`

**3\. Managed installation on Edge**

You must first deploy the CDSx extension from the Microsoft Edge policy.

1.  From the Microsoft 365 admin center, navigate to Settings+Microsoft Edge.
    
2.  Select the Configuration policies tab, and select +Create Policy.
    
3.  Enter a name (example: CDSx Extension Deployment), add an optional description, select the Policy type , and then click Next.
    
4.  In Settings, select +Add Setting. Search and select the ExtensionInstallForcelist policy.
    
5.  In the setting Control which extensions are installed silently, paste the following: `aalncdhjokfcbldaemnehledpfpibopi;file:///C:\ProgramData\Cyvera\Everyone\CDSX\extension.xml` and then click Next.
    
6.  In the Assignments section, select the target users or security groups and click Next.
    
7.  Review the settings and then click Review and create to complete the process.
    

**4\. Managed installation from the registry in Windows**

1.  Install/uninstall the extension using the following files:
    
    -   [install](https://docs-cortex.paloaltonetworks.com/v/u/cdsx_install.reg)
        
    -   [uninstall](https://docs-cortex.paloaltonetworks.com/v/u/cdsx_uninstall.reg.zip)
        
    
2.  Instead of step 1, you can also add the following to the registry using `reg IMPORT <file.reg>`:
    
    ```
    Windows Registry Editor Version 5.00
    
    ; ===== Start CDSX Policy
    ; Chrome
    [HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Google\\Chrome\\ExtensionSettings]
    
    [HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Google\\Chrome\\ExtensionSettings\\aalncdhjokfcbldaemnehledpfpibopi]
    "installation_mode"="force_installed"
    "update_url"="file:///C:\\\\ProgramData\\\\Cyvera\\\\Everyone\\\\CDSX\\\\extension.xml"
    "toolbar_pin"="force_pinned"
    
    ; Edge
    [HKEY_LOCAL_MACHINE\\Software\\Policies\\Microsoft\\Edge\\ExtensionSettings]
    
    [HKEY_LOCAL_MACHINE\\Software\\Policies\\Microsoft\\Edge\\ExtensionSettings\\aalncdhjokfcbldaemnehledpfpibopi]
    "installation_mode"="force_installed"
    "update_url"="file:///C:\\\\ProgramData\\\\Cyvera\\\\Everyone\\\\CDSX\\\\extension.xml"
    "toolbar_state"="force_shown"
    
    ; ===== End CDSX Policy
    ```
    

###### macOS

To enable the DLP browser extension on your endpoint, you must either create a configuration profile in JAMF or upload a predefined configuration profile in your MDM solution.

The predefined signed configuration profile includes the settings that are signed and cannot be modified. An unsigned version is also provided, should you prefer to sign yourself. Refer to DLP MDM profile for macOS to download the signed or unsigned configuration profile.DLP MDM profile for macOS

**Note:**

It is highly recommended to refer to Install the Cortex XDR Agent using JAMF for a comprehensive overview of setting up a JAMF profile.Install the Cortex XDR Agent Using JAMF

The following steps describe how to create a new configuration profile in JAMF to enable the DLP browser extension on your endpoint:

1.  From Configuration Profiles, click New.
    
2.  In the General page, enter a name and description.
    
3.  From the left pane, under the Options tab, select Application & Custom Settings and then click Upload.
    
4.  Add the following configuration details for each web browser:
    
    -   **Chrome**:
        
        -   Preference Domain: com.google.Chrome
            
        -   Property List:
            
            ```
            <?xml version="1.0" encoding="UTF-8"?>
            <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
            <plist version="1.0">
              <dict>
                <key>ExtensionSettings</key>
                <dict>
                  <key>aalncdhjokfcbldaemnehledpfpibopi</key>
                  <dict>
                    <key>installation_mode</key>
                    <string>force_installed</string>
                    <key>toolbar_pin</key>
                    <string>force_pinned</string>
                    <key>update_url</key>
                    <string>file:///Library/Application Support/PaloAltoNetworks/Traps/cdsx/extension.xml</string>
                  </dict>
                </dict>
              </dict>
            </plist>
            ```
            
        
    -   Edge:
        
        -   Preference Domain: com.microsoft.Edge
            
        -   Property List:
            
            ```
            <?xml version="1.0" encoding="UTF-8"?>
            <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
            <plist version="1.0">
              <dict>
                <key>ExtensionSettings</key>
                <dict>
                  <key>aalncdhjokfcbldaemnehledpfpibopi</key>
                  <dict>
                    <key>installation_mode</key>
                    <string>force_installed</string>
                    <key>toolbar_state</key>
                    <string>force_shown</string>
                    <key>update_url</key>
                    <string>file:///Library/Application Support/PaloAltoNetworks/Traps/cdsx/extension.xml</string>
                  </dict>
                </dict>
              </dict>
            </plist>
            ```
            
        
    
5.  Click Save.

##### Create endpoint applications
An effective data loss prevention (DLP) system allows an organization to define specific applications as sensitive. This enables the system to monitor and control the transmission of critical information, preventing its unauthorized release.

When creating a data-in-motion rule, you can provide the source of the sensitive data and must provide the intended destination. For the source and destination for the data-in-motion rule, you must select the relevant application groups ( custom local application group). The application groups are comprised of predefined endpoint applications as defined by Palo Alto (local application).

Predefined applications are indicated by Created by: Palo Alto Networks in the All Applications table. For predefined, you do not see the details such as URLS/Domains, Process names, Signers. You cannot edit or delete these applications.

The user can only create a Custom Web Application.

Endpoint application type:

-   **Custom Web application**: In DLP, a web application refers to any software accessed via a web browser (e.g., cloud services, webmail, social media). Web DLP focuses on inspecting and controlling sensitive data as it travels over these internet-based channels, preventing unauthorized sharing or exfiltration. Palo Alto Networks has it's own predefined applications list. The Palo Alto predefined web applications cannot be edited or removed.
    

After creating the application, you can select them from the application groups.

###### New custom web application

Add a custom web application that appears in the Custom Web-Application Group of the Endpoint Application Groups. You can select the source or destination when defining the data-in-motion rule.

1.  Navigate to Modules → Endpoint Data-in-Motion Rules → Endpoint Applications.
    
2.  Click New Application and select Custom Web Application.
    
3.  In New Custom Web Application , enter the application name, enter the URLs or domain of the web application, and then click .
    
    A web application is added to the list. You can add other custom web applications.
    
4.  After adding all the web applications, click Add.
    
    The web application is successfully added to the All Applications table as Type: Web.
    

Example:

-   Web: custom URLs
    
-   Local application: pre-defined applications
    
-   Catalog: a special group that includes SAAS applications, categories
    
-   Catalog web application groups: a special group that allows you to choose SAAS applications from PANs catalog and to use the predefined catalog

##### Create endpoint application groups
Data-in-motion rules require the definition of both a source and a destination, which can be specified using your pre-defined endpoint application groups.

Choose the relevant application group type.

-   **Catalog Web Application Group**: The catalog includes SAAS applications from PAN's predefined catalog and predefined web application categories.
    
    **Note:**
    
    The catalog contains a list of all supported and tested applications. If an application you need is not on the list, contact support for assistance.
    
-   Custom Local Application Group: For this group, select the available options from the pre-defined local applications.
    
    For example: Unsanctioned chat apps.
    
-   **Custom Web Application Group**: For this group, select the available options from the custom local applications. You can create a new web application.
    
    For example: AI chatbots.

##### Create data-in-motion rules
You can create data-in-motion policies to identify, control, and protect sensitive information as it moves across networks, between systems, or to devices.

Each rule defines an action, Allow, Block, or Report, from a specified source to a web destination. Rule conditions must include the channel destination, data profile, and type of data being accessed or moved. You can also configure responsive user dialogs for enforced events, which can be customized per rule. 

To create a data-in-motion rule:

1.  In Modules → Data Security → Enpoint Data-in-Motion Rules → Data-in-Motion Rules click Create New Rule.
    
2.  On the General page:
    
    1.  Enter a unique name and description.
        
    2.  Choose the Action to implement when the rule criteria are met, such as blocking the transfer or notifying relevant parties.
        
    3.  Select the Action for Partial Classification to implement when partial classification occurs. Partial classification refers to a situation where the classification process is incomplete, such as due to a timeout or classification failure.
        
    4.  Select the Severity of the rule you are creating.
        
        The Informational action enables logging an activity without interfering with the user’s workflow.
        
    5.  Enter a Raised Issue Name that will be used as the name for the issue created as a result of policy breaches.
        
    6.  Select to Disable/Enable Rule as required.
        
3.  On the Context & Data page:
    
    1.  For Source, select the Custom Web Application Groups
        
        The source is the origin of the data, whether it resides on a local drive (such as a PDF on a laptop) or within a web application (such as a file in OneDrive).
        
        Without a defined source, this rule applies to every file by default. You can make the policy more targeted by selecting a specific source.
        
        **Note:**
        
        Third-party application behaviour:
        
        -   When a file upload is blocked, the local application may display its own generic error message in response to the DLP restriction. In similar cases, some third-party applications might still proceed by sending a dummy file or an error placeholder instead of the actual data.
            
        
    2.  For Destination, select the relevant Application Groups. Refer to Create endpoint application groups for more information.
        
        Selecting Allow corporate accounts users to upload, lets corporate account users bypass the Block rule action and upload data from the web application.
        
        USB Channel: Select File Write/Copy to USB to enforce the rule on the USB device.
        
    3.  For Data Scope , select the relevant Data Profile.
        
        **Note:**
        
        To maximize data security, if you use Microsoft Purview for extensive manual and automated file classification tagging and are looking to integrate those labels directly with the DLP policies to trigger protective actions based on a file's sensitivity, refer to [How to use information protection labels in Cortex Cloud Data Security](https://docs-cortex.paloaltonetworks.com/r/Cortex-CLOUD/Cortex-Cloud-Posture-Management-Documentation/How-to-use-information-protection-labels-in-Cortex-Cloud-Data-Security).
        
4.  On the Target page:
    
    -   For Rule Target, select the endpoints to which this rule will apply.
        
        **Note:**
        
        Distribution of the Endpoint DLP package is restricted to agents assigned to the data-in-motion policy. This ensures that only endpoints requiring DLP functionality are affected, rather than all eligible endpoints in the tenant.
        
    
5.  On the User Interaction page, you can add the default pop-up message for each of the following events.
    
    1.  For End User Dialog, toggle ON/OFF to manage whether users see a message when the policy is violated.
        
    2.  In the Title, enter the default name for the dialog.
        
    3.  In the Body, enter the message to display in the dialog. You can choose to use the system's default text. This is also relevant for Reporting Mismatch and Rule Override.
        
        If enabled, the Rule Override allows the user to override the block policy and temporarily retry the operation (to move the file again) to complete the action. The user's response is recorded as part of the Issue.
        
    4.  In the Admin Email Link, enter the default admin email that will be added to the body.
        
    5.  In the Dialog Main Button Label, enter the text to use for the button to close the window.
        
6.  Click Next to create the rule.
    
7.  From the Data-In-Motion Rules table, click Save or move the rule down to change the priority, and then click Save.
    

###### Rule priority

Cortex processes these rules sequentially from top to bottom. To ensure the correct outcome, place Allow rules above Block rules.

As soon as a first match is found for a data movement event, that rule's action is applied, and no other rules are evaluated for that specific event. Each matched event creates an Issue, and the total number of issues appears as Hits in the rules table.

Modify rule priority by dragging rules. If a conflict arises while setting a rule's priority, for example, if another user updates the policy simultaneously, Cortex saves the rule as a draft to prevent loss of your work.

###### Example: Creating a data-in-motion rule

An employee at Company X sends an attachment containing financial information to the personal email address of another employee. This action violates the company’s data handling policy.

To help prevent this, you can create a data-in-motion rule with the following configuration:

| Field | Description | Example user input |
| --- | --- | --- |
| Rule Name | Provide a descriptive name for easy referencing. | Prevent Financial Data Transfer |
| Action | Specifies how data movement is controlled. Possible actions are: Block, Allow, or Report. | Block |
| Partial Classification | Select a fallback action if classification fails or exceeds a time threshold. | Block |
| Severity | Choose the severity level that the Issue will trigger. Possible options are: Critical, High, Medium, Low, Informational. | High |
| Raised Issue Name | The name appears on the Issues page when filtering for Endpoint DLP Issues. | Blocked Financial File Transfer |
| Source | The web application group the data transfer originates from. You can create and manage these custom groups to suit your preferences. | drive.google |
| Destination | Choose where the data is moving to. Possible options are: None, Any, Specific web application group. | Web Application Group |
| Local Application Groups | Select apps through which users might transfer sensitive data. | Zoom, Slack, TeamViewer, and WhatsApp. |
| Data Profile | Data Profiles are templates that define what kind of sensitive data to detect. Select data profile the rule applies to. For more information, see How to create and validate a custom data profile. | PHI, CCN (Credit Card Numbers), Financial, and PII. |

##### Configure endpoint DLP settings
Configure the endpoint DLP settings to manage your organization's DLP policies.

1.  In Default Actions & Thresholds, there are two parts.
    
    1.  Data-in-motion default action and threshold configurations:
        
        Select the fallback policy for instances when the DLP process fails or times out:
        
        -   Allow file movement (fail-open): Specifies the default action that allows the file to transfer, preventing service interruption.
            
        -   Block file movement (fail-close): Specifies the default action that blocks the file from transferring.
            
            **Note:**
            
            When a fail-close action occurs, the system creates a Data movement blocked by Endpoint DLP fail-close action issue.
            
        
    2.  Auto disablement of rule threshold
        
        This setting refers to rule suppression. When the number of hits exceeds the set number, the rule is disabled.
        
        Click Reset to revert to the default threshold as configured in the system.
        
        If a rule was suppressed, you can view details in Settings → Management Audit Logs.
        
2.  For Corporate Account Domain, add the web application resources.
    
3.  Cortex Data Security Extension (Web DLP Channel): This option enables you to manage how the DLP browser extension is installed/uninstalled. You can configure Chrome and Edge separately using one of the two modes. By default, MDM deploys the extension to the selected endpoints. Refer here to the steps on how to install the DLP browser extension.
    
    -   MDM: This option is the default for distributing and installing the extension on the selected endpoints using one of the supported management tools, such as Microsoft Intune for Windows or JAMF for macOS.
        
        After installation, the agent then communicates with the extension to activate endpoint DLP.
        
    -   Forced activation (by XDR): This option automatically installs the browser extension if it detects that it is missing, acting as a backup to ensure the extension is installed on the selected endpoints. The endpoint must be associated with a domain.
        
        **Note:**
        
        -   The agent does not force-install the extension if it is already managed by the MDM on the endpoint.
            
        -   The XDR agent ensures full coverage by force-installing the extension on both managed and unmanaged browsers. But if a browser becomes officially managed by the organization later, the extension must be redeployed through the central management console to maintain control.
            
        
    -   Disable: The extension is disabled.
        
        **Note:**
        
        In the case of MDM, the extension is user-managed, so Cortex doesn’t remove an installed MDM extension, it only disables communication with the DLP extension.
        
    
4.  In the End User Dialog section, you can add the default pop-up message for each of the following events:
    
    -   Enable User Interaction
        
        **Note:**
        
        You can specify the end-user message per rule.
        
    -   Reporting Mismatch (FP)
        
    -   Rule Overide
        
    
    For each of the options, enter the default text to display in the end-user dialog for each event.
    
    -   In the Title, enter the default name for the dialog.
        
    -   In the Body, enter the message to display in the dialog. You can choose to use the system's default text. This is also relevant for Reporting Mismatch and Rule Override
        
    -   In the Admin Email Link, enter the default admin email that will be added to the body.
        
    -   In the Dialog Main Button Label, enter the text to use for the button to close the window.

### DLP status in all endpoints
The All Endpoints page provides a central location from which you can view and manage the endpoints on which the agent is installed. In addition to the extensive information that Cortex offers on all its endpoints, you can now view DLP Status and DLP Extension Status. This enables you to track information about the DLP browser extension and its status.

By default, this option is hidden. If you are using DLP, you need to add the fields DLP Status and DLP Extension Status when analyzing the status of endpoints with DLP.

#### DLP status

DLP Status provides the following statuses:

**Note:**

It is recommended to work with the latest security content.

-   Active (Compatible)
    
-   Update required: Indicates that the system's engine version does not match the version defined in the policy, and an update is necessary.
    
-   Failed to start: Indicates that there was an initialization error. This could occur because of the DLP policy, or the DLP engine on the machine is not working.
    
-   Degraded: Indicates that there are specific issues, such as custom detector patterns that require pattern fixes that is causing DLP not to function.
    

#### DLP extension status

The agent monitors the endpoints for information when the extension is installed and performs periodic refreshes to ensure accurate results.

The DLP extension status shows the installation status of the extension on the endpoint:

-   Installed (x): The x represents the number of extensions installed.
    
-   Not installed: This indicates that the extension was either uninstalled or was never installed.
    
-   No value: Where DLP is not activated on the endpoint.
    
-   Installed but unactivated: This indicates that either a supported browser is not being used or the DLP extension has not been activated yet.
    
    **Note:**
    
    Close and reopen your browser to activate the DLP extension.
    

You can drill down from the endpoint to view details of the DLP Extension Status.

From the selected endpoint, right-click and select Endpoint Data → View DLP Extension Status. This opens a dialog box that shows the extension status for both Chrome and Edge extensions.

### Cortex DLP threat detection and issues
The Cortex DLP module prevents sensitive data exfiltration. If instances of data-in-motion rules have been violated, a DLP issue is generated. To view the DLP Issues, go to Data Security → Data Security Issues → Threats. The Detection Method is set to DLP.

DLP issues provide visibility into instances where Data-in-motion rules issues have been violated.

From Data Security → Data Security Issues → Threats, you can view the DLP issues. The Detection Method is set to DLP.

**Note:**

Access to this page is restricted to users with the roles: Data Security Admin, Instance Administrator, and Account Admin.

The parameters configured during rule creation are shown as issue attributes on this page. These include:

-   Name: Taken from the Raised Issue Name field defined when creating the rule.
    
-   Severity: The assigned severity level of the Issue.
    
-   Description: The predefined description from the rule.
    
-   Detection method: When an issue arises from a data-in-motion rule violation, its Detection Method is DLP.
    
-   Action: How the rule responded to the issue: Prevented (Blocked), Allow, or Report.
    

**Note:**

If the default action configured in Endpoint DLP Settings is set to Block file movement (fail-close), an issue is raised where the assigned severity is set to low, and includes the Name Data movement blocked by Endpoint DLP default action

#### View the DLP issue card panel

Click a DLP issue to open the DLP security card, where you can investigate the issue, take any actions required, and see the remediation suggestions.

From the three-dot menu, you can open the issue in a new tab, copy the issue URL, retrieve the file, or view raw data (JSON).

Some other important actions:

-   Retrieve File: From the asset card, click  to obtain a copy of the file that triggered the security alert.
    
-   Click  to open the related rule that triggered the issue.
    

At the top of the card, you can view information about the issue, including the severity, detection tags, category, and detection method. In the tabs, you can see more information about the cause of the issue, take any actions required, and see the remediation suggestions.

You can also see the details of the user who logged into the browser.

#### Overview

Displays a description of the issue and provides key information, such as the assignee, status, action taken, and time that the issue was created and updated.

You can also see the following:

-   Evidence: which includes data classification details such as Data Profiles, Data Patterns, Classification Status and Profile Indicators.
    
    Click the Profile Indicators link to view the list of sensitive data contained in the file.
    
    The graph enables you to view information on the relevant file and logged-in user details.
    
-   File that includes the Name, Hash, Path , and Data Volume of the file.
    
    The path shows the full path of the uploaded file.
    
-   Local Applications , which include Process Name, Signer, Application Name, and Application Group Name.
    
-   User Interaction that includes User Response.
    

#### War Room

A comprehensive collection of all investigation actions, artifacts, and collaboration. It is a chronological journal of the issue investigation. For information, see [Use the War Room in an investigation](https://docs-cortex.paloaltonetworks.com/r/5CAbsl8idaK8R43ZLhoTOw/Cg1dab6sbYCCUurXxJgmrA)

#### Work Plan

A visual representation of the running playbook that is assigned to the issue. For more information, see [Use the Work Plan in an investigation](https://docs-cortex.paloaltonetworks.com/r/5CAbsl8idaK8R43ZLhoTOw/Kgcz_RMlxf~FUWwvCT8cRQ).
