# Review and prioritize posture issues

## Cases and issues

### Overview of cases
Understand how cases work in Cortex Cloud.

#### What are cases?

A case provides the full contextual story of a problem that impacts your organization's security, giving you an end-to-end view of the problem and streamlining your understanding of what needs to be solved and how.

A case is a defined problem created by connecting related issues into a single story. It shows the impacted assets and key data in one place, helping you focus on the threats that matter most, reduce noise, and resolve the problem efficiently using automation. Each case is unique and requires its own investigation.

Cases comprise the following objects:

-   **Issues:** Problems detected in your environment that exceed defined thresholds or surpass your organization's accepted level of risk and threat tolerance.
    
-   **Assets:** Specific entities impacted in a case and how they fit into the case story.
    
-   **Artifacts:** Objects to which behavior or influence can be attributed, such as filenames, processes, domains, and IP addresses.
    

To see a list of all cases, go to Cases & Issues → Cases.

##### Case creation

A case can be created automatically from an issue or manually by a user. When new issues are detected, Cortex Cloud checks them against existing cases. If there is no matching case, a new case is created. When an issue is linked to a case, all associated assets and artifacts are also linked. After case creation, new issues can match the case until the grouping threshold is met.

A case is automatically generated for any issue with Medium severity or higher that falls into one of these categories:

-   It is assigned to the Security domain.
    
-   It is assigned to the Posture domain and has a High severity.
    
-   It was generated from the public API or created from correlations.
    

While most low-severity issues do not create cases, specific analytic rules can trigger case creation for low-severity issues when action is deemed necessary. Low-severity issues created from correlation rules are not grouped into cases.

For more information about how cases are built, see Case grouping.

#### Resolving cases with AI

AI tools can help you through the case analysis and resolution process.

To simplify and accelerate case resolution, Cortex Cloud integrates advanced generative intelligence directly into the case management lifecycle. By leveraging built-in machine learning and intelligent grouping logic, Cortex Cloud shifts the focus from resolving isolated issues to a holistic approach that resolves the case as a whole:

-   **Intelligent case grouping:** Cortex Cloud automatically consolidates related issues, assets and artifacts into a single unified case that reveals the full scope of an attack.
    
-   **SmartScore prioritization:** Each case is assigned a SmartScore based on its severity and calculated risk. This enables teams to focus on the most critical cases first, ensuring that high-impact security threats, posture gaps, or health issues are handled with appropriate urgency.
    
-   **AI summarization:** Agentic AI is integrated in the case resolution process to automatically summarize context, help you investigate entities, and suggest remediation actions.
    
-   **Guided resolution:** The Resolution Center guides you to resolution with actionable tasks that are designed to remediate the entire case as a single entity, significantly accelerating the path to resolution.
    

##### Agentic AI

Cortex Cloud leverages Agentic AI to collaborate on investigations and actively accelerate the entire resolution lifecycle.

| Feature | Description |
| --- | --- |
| AI-generated case summaries | Instantly analyzes the case’s full scope and impact and accelerates triage. |
| Agentic Assistant | The autonomous "brain" of Cortex Cloud. It utilizes AI agents that plan, reason, and investigate complex threats, such as cloud identity theft or container breaches. These agents have access to case context and can create plans and perform actions such as running commands, playbooks, and scripts.  The Agentic Assistant chat provides an interactive and intelligent way to simplify and streamline complex security operations. Enter a prompt using natural language, and your agent plans and executes the most relevant actions to fulfill your request. |
| Resolution Center | Provides actionable remediation tasks, recommendations, and progress tracking to guide you step-by-step to a complete resolution. With playbook task tracking across all issues and in-context links to the Workplan, you can manage tasks awaiting action, monitor work in progress, and review completed items. |

#### Case lifecycle

Understand the lifecycle of a case.

Cortex Cloud handles cases through a structured process that moves from identification to resolution.

| Stage | Description |
| --- | --- |
| Detection | Signals or findings surface across the environment. |
| Issue generation | Raw data is converted into structured, defined as Issues. |
| Case grouping | Issues are evaluated for case qualification. If the issue qualifies it is grouped into a case with related issues, or if no match is found, a new case is generated. |
| Case analysis | Examination of context, relationships, and evidence. |
| Response | Application of remediation actions to mitigate the threat. |
| Resolution | Final confirmation that the issues in the case are fully addressed. |

#### Case thresholds

Case grouping thresholds are implemented to keep cases manageable.

To keep cases manageable, Cortex Cloud implements case grouping thresholds. When the case reaches a threshold, it stops accepting issues and groups subsequent related issues in a new case.

-   30 days have passed since case creation.
    
-   14 days have passed since the last issue was detected.
    
-   A case reaches the 1,000 issue limit.
    

You can track the threshold status in the `Issues Grouping Status` field in the cases table.

##### Auto-resolved cases

If a case is resolved with the status `Resolved - Auto Resolved`, Cortex Cloud reopens the case within a six-hour window if a matching issue occurs. The six-hour period is defined by the timestamp of the last issue that was grouped into the case. After the six-hour period, any new issues are linked to a new case for a new investigation.

#### Case scope and impact

A case's scope and impact is determined by the assigned severity, score, and domain.

The prioritization and governance of cases are determined by the case **Severity**, **Score**, and **Domain**. Together, these factors define the operational urgency and the investigative boundaries of a case.

-   **Severity:** This attribute reflects the immediate risk level. Cortex Cloud employs a logic where the overall case severity is dictated by the most critical issue linked to it. This ensures that high-impact threats are instantly visible to responders without being diluted by lower-level activity.
    
-   **Score:** The case score provides a quantitative measure of risk. While severity indicates the severity of a case, the score offers a granular numerical value used for precise ranking.
    
-   **Domain:** This categorizes the case context for example Security or Health. The domain determines the case’s scope, directing it to the appropriate specialized team.
    

By aligning these three factors, Cortex Cloud automates the transition from detection to response, ensuring the most critical risks are addressed by the right experts.

#### Case and issue domains

Cortex Cloud assigns each case and issue to a domain. Domains help you to organize and manage your work efforts, and differentiate between use cases.

Depending on the objects identified in a case or issue, each case and issue is assigned to a domain that reflects the root cause and the system areas of operation.

Domains are a contextual boundary that allow you to manage and prioritize each use case and help you to differentiate between your security use cases and non-security use cases. Domains help you to organize and manage your work efforts, streamline the assignment of cases, and enable you to create tailored experiences for each domain.

When an issue is created, Cortex Cloud automatically assigns it to a domain, and the same domain is assigned to the associated case.

Each case and issue is assigned to a single domain. You cannot change the assigned domain, however cases can be linked to issues from different domains.

##### Built-in domains

Cortex Cloud provides the following built-in domains:

| Domain | Description |
| --- | --- |
| Security | For cases and issues that are associated with case response activities for detecting, preventing, and blocking threats as they occur in runtime. For example, the identification of malware in a file, a compromised endpoint, or a phishing attempt. These cases can be assigned to a SOC analyst who specializes in blocking and remediating attacks. |
| Posture | For cases and issues that are associated with risk management activities to detect and mitigate risks to assets in the environment before they occur in runtime, and improve resilience. For example, misconfigurations in cloud instances, over-permissive users, or the detection of secrets or shadow data. These cases can be assigned to an analyst who specializes in strengthening the security posture. The Posture domain has subcategories that define the posture issue (Configurations, Vulnerability, Identity, etc). |
| Health | For cases and issues that are associated with health monitoring activities, to ensure optimal platform performance and gain insights into health drifts. For example, disruptions in data ingestion, collector connectivity errors, correlation rule errors, and event forwarding errors. |

### Case concepts

#### Issues, findings, and events

Understand how issues, findings, and events are related to cases.

Understand how issues, findings, and events are related to cases.

##### Issues
Issues identify the problems that you need to solve in your environment. Cortex Cloud creates issues when problems occur in your environment that cross defined thresholds, or surpass your organization's accepted level of risk and threat tolerance.

Each issue comprises a defined framework of:

-   **What happened:** A description of the problem
    
-   **How is your environment impacted:** Affected assets or the impact of this issue in your environment
    
-   **Contributing evidence:** Data that supports our analysis and observations
    
-   **Recommended actions:** Automations, playbooks, and manual suggestions
    

Issues are created from findings or from events that occur in your environment. When an issue is created, Cortex Cloud assesses the content of the issue and assigns it to a new or existing case. In addition, according to the content of the issue, it is assigned to a domain that reflects the operational use case of the issue, such as Security or Health. Using case grouping logic, Cortex Cloud then determines whether to link the issue to a case.

When you open a case, you can see all issues that are linked to the case. Review the **Grouping graph** to see why the issues were grouped together in the case. For more information about how issues are grouped in cases, see Case grouping.

In addition, Cortex Cloud offers the flexibility to:

-   Manually link and unlink issues from cases. Issues can also be linked to multiple cases. For more information, see Link or unlink issues from a case.
    
-   Mirror Cortex issues with external applications (for example, Atlassian Jira). For more information, see Issue syncing.
    
-   Create issues from custom rules that you define. For example, correlation rules, malware rules, and vulnerability rules. For more information about setting up rules, see What are detection rules?.

##### Findings and events

Findings and events form the core of our knowledge data lake. **Findings** provide context about the current state of the assets in your environment and **Events** are logged activities that occur in your environment.

Findings and events form the core of our knowledge data lake.

###### Findings

**Findings** are non-actionable, informational objects that provide context about the _current state_ of the assets in your environment.

To gather findings, Cortex Cloud periodically scans the assets in your environment and collects raw data about vulnerabilities, compliance, exposures, malware, secrets, and other posture-related information about the asset. This raw data is processed, saved to datasets, and recorded as findings. 

Each time the assets are scanned, the findings are updated to reflect the current state of the assets. Therefore, the finding for an asset will change over time.

Each finding is categorized according to its context, for example Configuration, Vulnerability, Compliance, or Identity, and is related directly to the scanned asset. When you investigate an asset through the Asset Inventory, you can see any findings that were collected for the asset. 

Findings themselves are not issues, however findings that match a specific logic can generate issues. You can also set up your own rules to trigger issues when certain types of findings are recorded. For example, you can set up Compliance rules that will create issues if specific compliance fails are identified in compliance findings.

To view findings:

-   View all findings. From the the Issues page click Findings.
    
-   See findings for a specific asset. From the Asset Inventory, select a specific asset to open the asset card. If findings are available for the asset you can click to open the finding card.
    
-   Search the `Findings` data set to see the findings collected over time for an asset.
    

###### Events

**Events** are logged activities that occur in your environment.

Cortex Cloud collects event logs that audit the activities that occur in your environment. The logs are ingested from various sources, such as Palo Alto Networks Next-Generation Firewall (NGFW), Prisma Access, third-party sources, and EDRs. These logs provide a complete picture of the events that occur in the environment and the activities surrounding the events.

When certain malicious objects (such as malware) are discovered in the event logs, an issue is created. During case investigation, you can query your event logs to see information about the actors and processes that triggered the issue.

#### Case grouping

Cortex Cloud uses a specific case grouping logic to build cases.

Case grouping is a Precision AI™-powered capability that eliminates alert fatigue by automatically consolidating related issues and artifacts into a single unified case. Case grouping links issues that originate from the same attack flow or involve the same entity to reveal the full scope of a case. This approach replaces manual correlation with automated context, allowing you to focus on resolving complete problems rather than triaging isolated events.

##### Grouping methodologies

The key grouping methodologies of case grouping are:

-   **Artifact association:** Groups issues that share core artifacts (for example, SHA256, HostName, UserName).
    
-   **Exact match detection:** Groups similar detections for the same entities.
    
-   **Related entities:** Groups detections involving related assets within a close timeframe to highlight possible connections.
    

##### Case qualification for issues

Not all issues create cases. When a new issue is created, it is evaluated to determine if it meets the criteria for case promotion. If the issue qualifies, the system attempts to correlate it with an existing case; if no match is found, a new case is generated. Issues that do not meet these requirements are categorized as Insights.

The qualification logic varies by domain. For the Security domain, the system promotes issues with Medium severity and above, as well as select Low-severity analytics. Other domains employ more selective promotion based on specific criteria. This logic is dynamic and may be updated to reflect ongoing research and threat relevance.

Cortex Cloud applies the following logic when building cases:

-   **Automatic promotion criteria:** Issues with the following conditions automatically generate a new case, or join existing cases:
    
    -   Assigned to the **Security** domain with **Medium** severity or higher
        
    -   Assigned to the **Posture** domain and with **High** severity.
        
    -   Generated from the **public API** or created from **correlations**.
        
    

-   **Low severity handling:** Most low severity issues do not initiate case creation, unless specific analytic rules deem action necessary. Low severity issues generated from correlation rules are not grouped into cases.
    
-   **Case grouping thresholds:** To keep cases manageable, Cortex Cloud enforces specific grouping thresholds. For more information see Case thresholds.
    

##### Grouping artifacts

The grouping algorithm evaluates extracted artifacts to determine whether an issue should join an existing case or initiate a new one. Each artifact type is governed by specific logic that accounts for its unique lifecycle and reliability. For example, grouping by Username may be subject to temporal constraints, while IP address logic varies based on whether the address is public, private, or dynamically allocated (DHCP).

These proprietary grouping logics are continuously tuned and updated. As a result, artifact behavior and correlation may change over time.

##### Integration with SmartScore

Case grouping and SmartScore work together to improve triage efficiency. While case grouping provides the full context of an attack, **SmartScore** assigns a numerical value to that context, indicating the urgency and impact of the case. This allows you to prioritize the most critical cases first.

##### Limitations

Case grouping is natively supported within built-in domains only, for example Security.

#### Case scoring

Learn about the different case scoring methods.

A case score is a numeric value that indicates the urgency of a case. Scoring can help you to streamline the process of prioritizing and investigating your cases, and help you to identify the cases that require immediate attention.

##### Types of scoring

Cortex Cloud uses the following scoring methods:

-   Rule-based scoring: The score is determined by user-defined scoring rules that match the issues linked to the case.
    
    You create scoring rules that define scores for issues with specific attributes or assets. You can base scoring rules on:
    
    -   Hostnames
        
    -   Asset objects, such as asset names, classes, categories, groups, providers, and business application names.
        
    -   IP addresses
        
    -   Users
        
    -   Active Directory, or Azure groups and organization units
        
        (Requires the Cloud Identity Engine to be configured).
        
    
    When an issue is created, Cortex Cloud searches for scoring rules that match the issue. An issue can match multiple rules or sub-rules. If a match is found, Cortex Cloud assigns the scores of the matching rules to the issue. If multiple rules match the issue, the issue score is an aggregation of the rule scores. By default, a score is applied only to the first issue in the case that matches the defined rule and sub-rule.
    
    You can create a rule hierarchy by setting up sub-rules. If an issue matches one or more sub-rules, the sub-rule scores are also aggregated in the issue score. However, a sub-rule score is only applied to an issue if the top-level rule was a match.
    
    To determine the case score, Cortex Cloud calculates the combined issue score total for all issues in the case. You can see a breakdown of the score by clicking on the score in the details pane.
    
-   Manual scoring: The score is defined by the user.
    

##### How Cortex Cloud assigns the score

For Cortex Cloud to provide effective rule-based scores, you must define accurate scoring rules that are suitable for your environment and workflows.

When a case is created, Cortex Cloud searches for a match between your scoring rules and the issues linked to a case. If a match is found, a rule-based score is assigned.

You can view the assigned score on the Cases page.

#### Case starring

Starring cases can help you to prioritize and filter your cases.

To help you focus on the most important cases, you can star a case. Starring enables you to narrow down the scope of cases on the Cases page. Cortex Cloud identifies starred cases with a purple star.

You can star cases manually, or create a starring configuration. A starring configuration automatically categorizes and stars cases that contain issues with specific attributes. For example, you can define a starring configuration that stars all issues containing specific assets, hosts, or business application names. If an issue matches the attributes in the starring configuration, the issue and case linked to the issue are starred.

You can manage all starring configurations under Case & Issues → Case Configuration → Starred Issues. For more information see Create a starring configuration.

#### What is Causality?

Learn more about Causality in Cortex Cloud.

Causality is the idea of telling a story in a simple and coherent manner and in a proper context. With the purpose of leading security teams to actionable outcomes.

Palo Alto Networks products, such as Next-Generation Firewall (NGFW) or the Cortex XDR Agent, can be configured to send rich and detailed data about all activities to the Strata Logging Service, not only items related to attacks. This means that millions of data points are collected about every entity every single day. Analyzing so much data as log lines is practically impossible, so Cortex Cloud takes these data points and continuously stitches them automatically to ‘Causality Chains’. This automates the dot-connection process that an investigator would otherwise have to do manually during an investigation. This process happens constantly for all collected data points, such as processes, files, network connections, and more, regardless of prevention, detection, or alerts of any kind. With causality, when analysts decide to investigate alerts or go on a hunt, they don't need to manually connect the dots getting distracted with millions of irrelevant data points, and instead they can focus only on data related to the investigation.

Even the most complicated investigations take just a few moments for a novice analyst, during which causality reveals answers to critical questions, such as:

-   What was the root cause?
    
-   What might be the damage?
    
-   What’s the scope? Are there any related issues?
    
-   Who’s involved?
    
-   Which steps are required to contain, mitigate and recover?
    
-   Are similar threats prevalent in the environment?
    
-   What can be done to reduce the risk of the same thing happening again?
    

To achieve this, Palo Alto Networks invested and patented the causality engine and the ways it works.

How it works

Causality chains are built using a deep understanding of each operating system (OS) and the way it works, which processes fulfil the various functions and more. Causality chains in Windows, macOS, and Linux work with the same guidelines, with different processes and methods used to decide how to build chains.

There are some processes in the OS that have very specific roles to fill. For example, `services.exe` and `explorer.exe` are used mainly to spawn other processes. This means that causality chains don’t show these processes by default and start from their child processes as these are only OS processes doing their job; yet, you can manually add them by right clicking on the Causality Group Owner (CGO) and adding the parent process.

Cortex Cloud tracks Remote Procedure Call (RPC) requests between processes and it doesn't break the casualty chain into sub chains, so the analyst still sees the full chain of execution, including actions done via RPC. Same goes for code injection, as Cortex Cloud tracks the new threads that are started as a result of such actions and can tie anything that happens as a result to the original injecting processes and its causality chain.

Spawners

Processes that are used to spawn other sub processes are called spawners. Those processes are known to start other processes as part of the normal flow of the operating system (OS). Examples of such processes are `explorer.exe`, `services.exe`, `wininit.exe`, `userinitt.exe`, and more. When spawner processes are started by a non-spawner process, they are not considered spawners. In Cortex Cloud, we don’t distinguish between a Causality Group Owner (CGO) and spawner, calling both CGO.

Example 37. 

-   `userinit.exe` starts `explorer.exe`: `explorer.exe` is considered a spawner, as this is what we expect to see in the OS.
    
-   `cmd.exe` starts `explorer.exe`: `explorer.exe` is NOT considered as a spawner as it’s not the role of `cmd.exe` to start `explorer.exe`.
    

  

The child processes of a spawner are considered as CGOs and they start off the causality chain.

Causality Chain

When a malicious file, behavior, or technique is detected, Cortex Cloud correlates available data across your detection sensors to display the sequence of activity that led to the alert. This sequence of events is called the causality chain. The causality chain is built from processes, events, insights, and alerts associated with the activity. During the alert investigation, you should review the entire causality chain to fully understand why the alert occurred.

Causality Analysis Engine

The Causality Analysis Engine correlates activity from all detection sensors to establish causality chains that identify the root cause of every alert. The Causality Analysis Engine also identifies a complete forensic timeline of events that helps you to determine the scope and damage of an attack and provide an immediate response. The Causality Analysis Engine determines the most relevant artifacts in each alert and aggregates all alerts related to an event into an incident.

Causality Group Owner (CGO)

The Causality Group Owner (CGO) is the process in the causality chain that the Causality Analysis Engine identified as being responsible for or causing the activities that led to the alert. A CGO is always the child of a spawner, so it’s the first process in the operating system (OS) chain of execution that is not loaded by default as part of what’s expected in a normal OS flow. All sub-processes started by the CGO are linked to it, and help analysts quickly identify the root cause of why something happened.

**Note:**

There are no CGOs in the Cloud Causality View, when investigating cloud Cortex Cloud alerts and Cloud Audit Logs, or SaaS Causality View, when investigating SaaS-related alerts for 501 audit events, such as Office 365 audit logs and normalized logs.

CID

Each causality chain gets a unique ID called  a CID. All actions on this chain, such as process execution, registry changes, and network connections, receive the same ID. This means that whenever the user queries about a given action, for example who connected to a malicious IP, the response not only includes the process who performed it or the user, it includes all actions related to the same CID. This shows the entire chain of execution alongside all other actions performed with the connection to the malicious IP.

This concept is important because any alert that is triggered about any action is also mapped to the same CID, meaning that one chain of execution displays all processes and alerts associated with the relevant CID. Alerts on the same CID is also one of the methods Cortex Cloud uses to group alerts into an incident.

### Analyze and resolve cases

Learn how to analyze and resolve cases.

The following sections explain how to review, analyze, and resolve cases. You can start reviewing the cases in your environment on the Cases page.

#### Review all cases

Start reviewing your open cases on the **Cases** page.

The main **Cases** page is the starting point for monitoring and managing all cases in your environment. It provides visibility into all cases and their current status, helping you track progress, investigate individual cases, and take remediation actions. Severity indicators, scores, and starred icons help you quickly identify your high-priority cases.

You can access the **Cases** page from **Cases & Issues → Cases**. By default, all open cases are displayed.

##### Viewing modes

The cases page supports the following viewing modes:

-   **Split view (default)**
    
    Displays cases in a split-pane layout that highlights key details and enables you to quickly compare cases, prioritize urgent items, and assess severity and impact at a glance.
    
-   **Table view**
    
    Displays cases in a table layout with widgets that summarize the table data. Widgets are customizable, allowing you to tailor the table for structured analysis and review.
    

Click the **Display** menu to switch between modes. Any changes that you make to the case fields persist between modes.

**Note:**

The legacy view is also available for users who prefer this format. From the Actions menu select Switch to legacy view.

##### Saved table views

Saved table views are saved filter configurations of table data that help you to focus on the data that most matters to you. You can filter your table data by domain, context, work queue, or other criteria, and save configurations that support your workflow.

The default view on the Cases page is **All Cases**. Click on the arrow next to All Cases to see all available saved views. If you change the table filters, you will see a Modified label next to the view name. You can create a new saved views. Once you have change the table filters, click the three dots next to the view name to save the new configuration, update an existing saved view, or revert to the original configuration.

#### Start case analysis

Understand the case analysis and resolution process.

To start analyzing a case, open the case from the main **Cases** page. In the Split view, click a case to open it in the side panel. To open a case in a full page layout, right-click a case in the list and select View case in new tab.

The case card opens a dedicated workspace where you can fully understand, investigate, and resolve the case from start to finish.

The case card brings together case context, correlated issues, affected assets, and remediation actions in one place. It helps you quickly understand the case context, see how events are connected, and take action with confidence. Click through the view to dive into investigation data, resolution tasks, and AI assistance without switching pages or losing context, keeping your focus on resolution.

##### Case analysis and resolution process

##### Core components

The following table describes the core components of case analysis and resolution:

| Component | Description | Link to detailed information |
| --- | --- | --- |
| Agentic Assistant | Provides side-by-side support by recognizing case context, delivering advanced summarization, and helping you pivot to additional investigative views. | Agentic Assistant- Case Investigation agent |
| AI-generated case title and description | Helps you quickly understand the scope and nature of the case by summarizing key case details. | AI-generated case summaries |
| Case overview | Breaks down case components to help you understand how the case was built: **Grouping graph:** Illustrates issue relationships; **Evidence:** Details casualties and events; **Issue feed:** Narrates the case story; **Associated assets, artifacts, and MITRE ATT&CK tactics**: Provides additional context and links to detailed views and actions | Analyze case details |
| Detailed view | Provides detailed information about the investigation in a tabular format, for example Timeline and War Room. | Detailed View |
| Resolution Center | Guides you towards resolution by presenting actionable remediation steps and enables you to track all related playbook tasks without opening individual playbooks. | Resolution Center |

##### Agentic Assistant- Case Investigation agent

The Agentic assistant provides side-by-side support throughout the case analysis and resolution process.

The **Agentic Assistant** is a context-aware, generative intelligence tool embedded directly within the case card. It is designed to act as a side-by-side partner for security analysts, eliminating the need to pivot away from the investigation to consolidate complex data.

When you open the Agentic Assistant you can select the agent that is best suited for each task. The dedicated Case Investigation agent can help you with your case investigation. It specializes in advanced summarization, and recognizes the context of the case, ensuring every insight provided is highly relevant and grounded in the specific issues, assets, and telemetry of the current investigation.

For more information about using other agents in the Agentic Assistant, see Get started with Agentic Assistant chat.

Core functionalities of the Case Investigation agent

To streamline case analysis, the assistant provides the following areas of support:

-   Dynamic summarization of log data and issues into clear, actionable narratives, including:
    
    -   **Executive overviews:** High-level summaries that focus on impact and risk.
        
    -   **Extended technical overviews:** Deep-dive summaries that outline the technical progression of the threat.
        
    
-   Focused contextual inquiries to extract specific details without manual filtering. You can ask targeted questions regarding:
    
    -   **Issue deep-dives:** Understanding the specific triggers and severity of an issue.
        
    -   **Asset relationships:** Identifying which users or devices are at the center of the activity.
        
    -   **Asset and artifact investigation:** Understanding the impact and risk of the assets and artifacts in the investigation.
        
    
-   Intelligent pivoting and clarification to help you navigate through complex investigations:
    
    -   **Entity-specific prompts:** By clicking **Ask AI** next to a specific entity (such as an IP address or file hash), the assistant launches with a pre-configured prompt tailored to that specific object.
        
    -   **Investigation guidance:** It suggests potential next steps and actions, and links to detailed views

#### Establish case context
Before you start to analyze the case, review the case title and description to establish case context. You can also review the case score, assignee, and decide whether to star the case.

##### AI-generated case summaries

AI generated case summaries helps you quickly understand the scope and nature of the case by summarizing key case details.

To gain immediate situational awareness, Cortex Cloud automatically builds a narrative of the case using **AI-generated titles and descriptions**. This summarized context allows you to quickly grasp the scope of a case and provides a clear starting point for your investigation.

Leveraging LLM-based summarization, the system analyzes complex data to produce a human-readable overview of:

-   The nature of the threat or activity
    
-   The key issues and artifacts involved
    
-   The affected assets or identities
    

View the AI-generated case summary

When you open a case, the case title and summary is automatically generated. As an investigation evolves, the case context is updated. Each time new data or issues are added, the system regenerates the title and description to ensure your situational awareness reflects the most current information available.

**Note:**

The AI-generated title and description is a calculated value that is regenerated each time you open a case.

This value is not a saved static description, therefore it is not reflected in the saved case names in the list of cases in the **Split view** , or in the **Case Name** and **Case Description** columns in the **Table view**.

System-generated case titles and descriptions

In addition to the AI-generated case titles and summaries, Cortex Cloud automatically generates static case titles and descriptions that are stored in the cases dataset. These are generated at the time of case creation based on correlated issues, behaviors, and contextual data.

These static descriptions are used when AI-generated case summaries are unavailable or disabled. In addition, they are reflected in the case title in the List of cases in the **Split view**, and the **Case Name** and **Case Description** columns in the **Table view.**

You can manually update these values. From the **Actions**  menu select **Edit case details**.

Single issue cases

For cases that contain a single issue, the case title and description directly reflect the issue’s title and description. In addition, AI-generated case summaries are not available. If more issues are linked to the case, Cortex Cloud generates a case title and description to reflect the issues in the case, and a AI case title and summary is available.

Limitations

-   **Supported regions:** AI-generated case titles and summaries are available only in supported regions. For more information, see Cortex Agentic Assistant.
    
-   **Supported domains:** AI-generated case titles and summaries are only supported for cases assigned to the **Security** and **Posture** domains.
    
-   **Single-issue cases:** For cases that contain a single issue, AI-generated case summaries are not available. Instead, the case title and description directly reflect the issue’s title and description. If more issues are linked to the case, an AI case title and summary is generated.
    

Enable AI summarization

To enable AI case summarization on your tenant, go to Configurations → General → Server Settings → AI Configuration and enable the following settings:

-   Agents & LLM Experience
    
-   AI Case Summarization
    

You can also turn AI summarization on or off for a specific case. Take the following steps:

1.  Open the case, click the **Actions** menu.
    
2.  Select **Edit case details**.
    
3.  Switch the Summarize with AI toggle.

##### Assess case severity and score

Review the case severity and score, and see a breakdown of how the score was calculated.

You can review the severity and score assigned to the case, and update them if necessary.

Review case severity

The severity value indicates the urgency of a case. Possible values are **Critical**, **High**, **Medium**, and **Low**. Click on the assigned severity to change the value.

Review the case score

The assigned case score is displayed in the cases header. This score indicates the urgency and impact of the case.

Click on the case score to see the assigned scoring method. For more information about scoring types and how Cortex Cloud assigns a score, see Case scoring.

See a breakdown of the score

You can see details about the scoring method and the assigned score.

1.  On the **Cases** page, click on the menu icon to switch to the detailed view.
    
2.  Click on an assigned score.
    

If you are not satisfied with the score, you can change the scoring method or overwrite the score by setting the score manually. If you see a discrepancy with the assigned score, consider the following:

-   For rule-based scores, revise your scoring rules.
    
-   For SmartScores, help to improve the accuracy of SmartScore. **Give feedback** by hovering over the displayed score.
    

Change the scoring method or set the score manually

You can change the default scoring method. In addition, if Cortex Cloud was unable to assign a score, you can set the score manually.

1.  Click on the assigned score.
    
    If no score was assigned, in the case investigation pane, click the more options icon and select Manage Score.
    
2.  Select a different scoring method, or click **Set score manually** and define a new score.

##### Update case attributes

You can update the case title and description, and choose whether to star a case.

When you start reviewing a case, you can update the case title and description, assign the case, and star a case.

###### Assign a case

You can assign or reassign a case by clicking on the assigned field.

If the case contains unassigned issues, or the issues are not assigned to the case assignee, a dialog opens with options for assigning the issues.

###### Update the case title and description

A case title and description is automatically generated for each case. In addition, AI-generated case summaries are automatically generated when you open a case to provide case context.

You can manually update the saved case description, as required.

1.  Select a case and open the Actions  menu.
    
2.  Select Edit case details.
    
3.  Update the values in the Case title and Case description fields.
    
    **Note:**
    
    The defined values are shown in the Case Name and Case Description columns in the Table view, and saved to the `cases` dataset. The case title is also shown the list of cases in the Split view.
    
    These values do not replace the AI-generated case title and summary. If the Summarize with AI toggle is enabled, AI-generated case summaries are automatically generated when you open a case. For more information about how Cortex Cloud generates case titles and descriptions, see AI-generated case summaries.
    
4.  Save your changes.
    

###### Star or un-star a case

You can manually star or un-star a case:

1.  Go to Cases & Issues → Cases and select the case that you want to star.
    
2.  Depending on the selected view, take the following action:
    
    -   In the **Split** view, open the Actions menu and select Edit case details. Switch the toggle to star or un-star the case.
        
    -   In the **Table** view, select one or more cases and right-click. Select whether to star or un-star the cases.

#### Analyze case details

You can analyze detailed information about the case in the **Overview** section of the Case card.

Once you have established the initial context, you can use the case **Overview** to deconstruct the case and understand how its underlying components are connected. Use the following sections within the **Overview** to review the full scope of activity:

-   **Grouping Graph:** View a visual mapping of how issues and artifacts are linked together, including details on shared artifacts, to better understand the underlying grouping logic.
    
-   **Evidence:** Trace issue causality chains and recorded events to follow the attack sequence from the initial root cause to the final recorded activity.
    
-   **Issue feed** Review the case’s story in a chronological visualization that maps the case lifecycle and highlights key case information, with the option to group by attribute.
    
-   **Associated assets and artifacts:** Drill down into the specific identities, endpoints, and digital artifacts associated with the case to assess the threat's footprint.
    
-   **MITRE ATT&CK tactics and techniques:** Review the specific tactics and techniques identified in issues linked to the case to align your investigation with industry-standard adversary behaviors.
    

The following topics describe each section of the Case **Overview**.

**Note:**

If you prefer a tabular or legacy layout, switch the case card to the **Detailed view**.

This view preserves the legacy tab based format and custom layouts, ensuring full backward compatibility. You can switch between the new case experience and the legacy view based on personal workflow preferences. For more information, see Detailed View.

##### Grouping graph

Gain insight into why issues were grouped in a case.

The **Grouping Graph** is a visual representation of the logic used to group issues in a case. It provides transparency into why specific issues are linked, illustrating the relationships between data points and the underlying decision-making process of the analysis engine.

By revealing these connections, the graph offers key insights into the case narrative, visualizes the overall scope, and identifies common artifacts for investigation.

Understanding case grouping

Cortex Cloud automatically matches issues and artifacts into a unified case based on a specific grouping logic. This allows you to resolve the entire scope of a case rather than treating detections in isolation. The logic is driven by the following factors:

-   **Artifact association:** Issues sharing core artifacts, for example the same file hash or IP.
    
-   **Similarity clustering:** Issues with similar detection patterns on the same entities.
    
-   **Related entities:** Detections on related assets occurring within a close timeframe or context.
    
-   **Linked and merged issues:** Issues that were manually linked to the case and merged issues.
    

Related issues are added to the case until a specific **grouping threshold** is met. In the **Grouping Graph** you can see whether case grouping is active or inactive. For more information about case grouping and case thresholds, see Case grouping.

Core components of the Grouping Graph

The graph uses a structured hierarchy of edges and nodes to represent the primary elements of a case:

| Component | Description |
| --- | --- |
| Edges | Represent the relationship between graph entities to show why they were linked. Edges display as lines that link nodes and entities together. Each full line represents a direct relationship. The system defines three edge types: **Case > Issue:** Links the case to the issue that initiated its creation.; **Issue > Artifact:** Links an issue to an associated artifact. This indicates that the issue is the source of the artifact in the case.; **Artifact > Issue:** Links an artifact to an issue or issue cluster. This indicates that the artifact is the source of the issues in the case. Edges display as: **Solid line:** Connects the case node to its originating issue, as well as to related artifacts and additional issues later grouped into the case.; **Broken line:** Connects similar, manually linked, or merged issues to the case. The connection type is indicated by a label:-   **linked:** Issues manually linked to the case; **similar:** Issues grouped by similarity clustering; **merged:** Issues merged into the case |
| Case node | The central anchor node to which all other elements are connected. |
| Issue nodes | Visualized with parent/child relationships to show how primary threats spawned secondary activities. |
| Clusters | Groups of issues that are automatically clustered to keep the visual workspace organized, with details of the total issue count in the cluster and severity breakdown. Issues are clustered if they: Share a common artifact.; Are manually linked to the case.; Have been merged.; Are identified as similar through similarity clustering. \*\*Note:\*\* Similar issues are displayed as individual entities rather than in a parent/child hierarchy. |
| Artifacts | Represent artifacts that are linked to the issues in the case. Artifacts include user names, IPs, and causality chains. Causality chains link issues in the same causality chain to the case. |

Explore the graph

You can interact with the graph to uncover deeper layers of data without leaving the case view:

-   **Expand and break down:** Click elements within the graph to expand clusters and view additional node details, such as severity, domains, and current status.
    
-   **Review issues and artifacts:** Hover over any entity in the graph to open a quick-view panel containing high-level details such as severity, domain, and current status. Hover over a cluster to see a breakdown of the severities contained within it.
    
-   **Deep dive into issues:** Click an issue node and select **Open Issue** to view a detailed issue card with granular details about the issue.
    

Example 38. 

The following table breaks down the components in this example:

| Label | Explanation |
| --- | --- |
| 1 | Solid edge linking the case node to the issue that initiated case creation. |
| 2 | The issue that initiated case creation. |
| 3 | Casualty chain related to the initial issue. |
| 4 | Cluster of issues. These issues are part of the same causality chain as the initial issue. You can see that there are 13 issues in the cluster, and their severity breakdown. |
| 5 | Broken edge linking to a cluster of issues that were manually linked to the case. This is indicated by the linked label. |
| 6 | User name related to one or more issues in the linked issues cluster. |
| 7 | Issue related to the user name. |
| 8 | Case grouping is inactive label. This indicates that the case is no longer accepting new matching issues, which happens when a case grouping threshold is met. For more information, see Case thresholds. |

##### Evidence

Review the Evidence section of the Case card to see details of causalities and events.

The **Evidence** tab allows you to trace issue causality chains to follow the sequence of events from the initial root cause to the final recorded activity. If casualties are not available, the Events table lists related events for the process node which matches the issue criteria that were not triggered in the issues table, but are informational.

By mapping these dependencies, you can pinpoint exactly how a threat entered your environment and identify the specific actions taken at each stage of the attack. This insight helps you move beyond seeing what happened to understanding the attacker's path, enabling you to implement more effective containment and remediation strategies.

How to investigate a causality chain

The causality chains are listed according to the Causality Group Owner (CGO), expand the CGO card you want to investigate. Each CGO card displays the CGO name, the following CGO event details, and the causality chain:

-   CGO name
    
-   Issue sources associated with the entire causality chain
    
-   Execution time of the causality chain
    
-   Number of issues that include the CGO according to severity.
    

Expand the causality chain to further investigate in the full Causality view. For more information, see Causality view.

##### Issue feed

See a chronological visualization of the case lifecycle in the issue feed.

The issue feed provides a chronological visualization of the case lifecycle, highlighting key case information from initial detection to the most recent activity. Key features include:

-   **Issue count:** See the total number of issues linked to the case.
    
-   **High level details:** Review issue details in the timeline, or click an issue to open the full issue card. When an issue is resolved, the issue status and title is dimmed.
    
-   **Contextual insights:** View integrated insights directly within the timeline (when available), providing extra layers of intelligence on why specific events were flagged.
    
-   **Unified progression:** Gain immediate clarity on the speed of an attack, helping you distinguish between rapid automated threats and slow-moving lateral movement.
    
-   **Group issues by attribute:** Sort the issues in the timeline with the **Group By** option that allows you cluster issues and insights by selected criteria, such as category, severity, or detection method.

##### Associated assets and artifacts

Review the associated assets and artifacts identified in the case

This section displays the technical entities involved in the case, such as endpoints, hosts, IP addresses, and files. Assets and artifacts are organized by class, such as User, Hash, or IP. Malicious artifacts as identified by WildFire are highlighted red.

Hover over an asset or artifact to see key details about the entity. Click on an asset to see full details in the asset card.

To investigate further, click Ask AI next to an asset or artifact to open the **Agentic Assistant** with an automatically generated prompt tailored to the selected entity. You can also use the **Actions**  menu next to an asset or artifact to drill down to dedicated views or take direct actions on the asset or artifact.

**Note:**

If you do not have permissions to access an asset of a case (which is shown as grayed out and locked), check your scoping permissions in Manage Users or Manage User Groups.

For more information about dedicated asset and artifact views, see Investigate artifacts and assets.

##### MITRE ATT&CK tactics and techniques
The MITRE ATT&CK card maps observed behaviors to relevant tactics and techniques associated with the issues linked to the case. For increased visibility, click **Insights** to include tactics and techniques from low severity insights.

To see a full breakdown by MITRE ATT&CK tactic and technique, including the number of issues in which a tactic was identified, open the full view.

**Note:**

This component is available for cases associated with the Security domain or custom domains.

##### Detailed View

Switch to the Detailed View to see a breakdown of case information in a table-based format.

The **Detailed View** in the case card provides a table-based format and custom layouts, ensuring full backward compatibility. You can switch between the **Overview** and the **Detailed View** based on your workflow preferences.

The **Detailed View** supports deep inspection and manual analysis while maintaining access to the same underlying case data. It includes the following tabs:

| Tab | Description |
| --- | --- |
| Issues & Insights | Displays a list of issues and insights linked to the case. Click on an issue or insight to open the issue card. |
| Key Assets & Artifacts | Displays asset and artifact information of the key artifacts, hosts, and users associated with the case. Hover over an icon for more information, or click the more options icon to see the available views and actions. For more information about investigating key assets and artifacts, see [Investigate artifacts and assets](https://docs-cortex.paloaltonetworks.com/r/5CAbsl8idaK8R43ZLhoTOw/9iYYSP0ohrxNDwUOYYArZw). |
| Timeline | Displays a chronological representation of issues and actions relating to the case. Each timeline entry represents a type of action that was triggered in the issue. Issues that include the same artifacts are grouped into one timeline entry and display the common artifact in an interactive link. Click on an entry to view additional details in the Details pane. You can also filter the timeline by action type. Depending on the type of action, you can select the entry to further investigate and take action on it. |
| Case War Room | The Case War Room is a collection of the Active Response investigation actions, artifacts, and collaboration pieces for an issue or case. It is a chronological journal of the case investigation. You can run commands and playbooks from the War Room and filter the entries for easier viewing. The War Room facilitates real-time investigation. Powered by ChatOps, the War Room helps you perform different tasks related to their case investigation using CLI commands. For example, running real-time security actions through the CLI, without switching consoles, and running security playbooks, scripts, and commands. For more information, see [Use the War Room in an investigation](https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM/Cortex-XSIAM-3.x-Documentation/Use-the-War-Room-in-an-investigation) |
| Executions | Displays the causality chains associated with the case. On this tab, you can investigate a causality chain and take actions on a host. For more information, see [Causality view](https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM/Cortex-XSIAM-3.x-Documentation/Causality-view). |

###### Investigate issues and insights

The Issues & Insights tab displays a table of the issues and insights associated with the case.

1.  Use the toggle to switch between issues and insights, and add filters to the table to refine the displayed entries.
    
2.  Click an issue to open the issue investigation panel. This panel provides detailed information about an issue, enables you to take actions on an issue, open the causality, and start remediation.
    
3.  If required, you can unlink the issue from the case or link it to other related cases. Click the more options icon and select Manage issue+Link to case or Unlink from case.
    

**Note:**

When an issue is resolved, it remains linked to a case. Once all of the issues in a case are resolved, the case is automatically closed.

###### Run an automation on an issue

You can run or rerun an automation on one or more issues. If there is currently an automation running on one or more of the selected issues, the Run Automation option does not appear. If an automation is running on the issue, but has been paused (for example, waiting for a user action), you can select to rerun the automation or select a new automation.

1.  In the Issues & Insights tab, right-click one or more issues and click Run Automation.
    
2.  If the issues have an automation already assigned, choose Rerun current Automation or Choose another Automation. If the playbooks do not have an automation assigned, select a action to run and define the action parameters.
    
3.  Run the automation.
    

###### Investigate key assets and artifacts

The Key Assets & Artifacts tab displays all the case assets and artifact information of hosts, users, and key artifacts associated with the case.

1.  Investigate artifacts.
    
    In the Artifacts section, review the artifacts associated with the case. Each artifact displays, if available, the artifact information and available actions according to the type of artifact: File, IP Address, and Domain.
    
2.  Investigate hosts.
    
    In the Hosts section, review the hosts associated with the case. Each host displays, if available, host information and available actions.
    
    To further investigate the host, select the host name to display the Details panel. The panel is only available for hosts with the agent installed and displays the host name, whether it’s connected, along with the Endpoint Details, Agent Details, Network, and Policy information details. If the Details panel is not available, click the more options icon next to a host name to see the available options.
    
3.  Investigate users.
    
    In the Users section, review the users associated with the case. Each user displays, if available, the user information and available actions
    

###### Investigate the case timeline

The Timeline tab is a chronological representation of issues and actions relating to the case.

1.  Navigate to the Timeline tab and filter the actions according to the action type.
    
2.  Investigate a timeline entry.
    
    Each timeline entry is a representation of a type of action that was triggered in the issue. Issues that include the same artifacts are grouped into one timeline entry and display the common artifact in an interactive link. Depending on the type of action, you can select the entry, host names, and artifacts to further investigate the action:
    
    -   Locate the action you want to investigate:
        
        -   For Quick Actions and Case Management Actions, you can add and view comments relating to the action.
            
        -   For Issues, click the action to open the Details panel. In the panel, go to the Issues tab to view the issues table filtered by issues ID, the Key Assets to view a list of Hosts and Users associated to the issue, and an option to add Comments.
            
        
    -   Select the Host name to display the endpoint data, if available.
        
    -   Select the Artifact to display the following type of information:
        
        -   Hash artifact: Displays the Verdict, File name, and Signature status of the hash value. Select the hash value to view the Wildfire Analysis Report, Add to Block list, Add to Allow list and Search file.
            
        -   Domain artifact: Displays the IP address and VT score of the domain. Select the domain name to Add to EDL.
            
        -   IP address: Display whether the IP address is Internal or External, the Whois findings, and the VT score. Expand Whois to view the findings and Add to EDL.
            
        
    -   In action entries that involved more artifacts, expand Additional artifacts found to further investigate.

##### Issue card

On the Issue card, you can see details of the selected issue and take actions on an issue.

The Issue card provides a full breakdown of an issue, helping you understand the root cause and take action through relevant evidence, remediation guidance, and response options.

The issue card supports full case investigation by retaining case context. Once you have finished reviewing an issue, close the card to return to the initial case investigation.

Each issue card adapts to the type of issue you’re investigating, surfacing the most relevant information and tools at every stage of the workflow. While layouts may vary, most issues share a common set of tabs designed to support triage, investigation, and resolution.

| Tab | Description |
| --- | --- |
| Overview | Displays a description of the issue and provides key information, including: Assignee; Status; Time at which the issue was created and updated; Suggested automations to run on the issue. Click the automation to open to the Work Plan tab with details of the automation.; Affected Assets with links to the affected asset cards; Cases linked to the issue; (For issues related to Container images) Related Affected Assets displays the assets that are related to the assets listed under Affected Assets. For example, if one of the associated assets is a container image running on a VM, the VM will be listed under this section. The Evidence section contains information to help you investigate the issue, such as the causality chain. \*\*Note:\*\* This section is context-specific and shows data according to the issue context. |
| Issue Information | Displays a summary of the issue, such as issue details , indicators, and outstanding tasks. Some fields are informational and some can be edited. Includes the following sections (depending on the layout): ISSUE DETAILS: A summary of the issue, such as type, severity, and when the issue occurred. You can update these fields as required.; COMMAND AND TASK RESULTS: Lists any manual commands and playbook task results.; WORK PLAN: View or take action on the following:- Playbook tasks: When a playbook runs, any outstanding tasks appear. You can take various actions here or in the Work Plan tab.; To-Do Tasks: An ad-hoc item that is not attached to the Work Plan. Create tasks for users to complete as part of an investigation. These are like a To-Do list that you keep in an investigation on an ad-hoc basis, rather than the Work Plan, which follows a pre-defined process. You can view or create To-Do tasks. ; NOTES: Helps you understand specific actions taken, and allows you to view conversations between analysts to see how they arrived at a certain decision. You can see the thought process behind identifying key evidence and identifying similar cases.; MALICIOUS OR SUSPICIOUS INDICATORS: A list of any malicious or suspicious indicators. If you have the Threat Intel add-on, you can pivot to the Indicators page, where you can take further action on the indicator.; INDICATORS HANDLING: Take actions on indicators from the displayed options. |
| Technical Information | Displays an overview of the information collected about the investigation, such as indicators, email information, URL screenshots, etc. When you run a playbook, the sections are automatically completed. |
| Investigation Tools | Enables you to take action on the issue, such as converting a JSON file to CSV and checking if the IP address is in CIDR. |
| War Room | A comprehensive collection of all investigation actions, artifacts, and collaboration. It is a chronological journal of the issue investigation. Each issue has a unique War Room. For information, see Use the War Room in an investigation. |
| Work Plan | A visual representation of the running playbook that is assigned to the issue. For more information, see Use the Work Plan in an investigation. |
| Actions | Recommended actions to resolve the issue. |

#### Resolve the case

You can start remediating a case by reviewing the actions in the Resolution Center.

After analyzing a case, you can start remediation in the Resolution Center. This process involves executing specific tasks to address the problems identified in the case. Once the remediation tasks are completed and verified, you can officially close the case to reflect its updated status and maintain an accurate audit trail.

##### Resolution Center

Review the remediation action in the Resolution Center to start resolving a case.

The **Resolution Center** is the primary workspace for managing and resolving cases. With a focused, action-oriented flow, you can focus on resolving the entire case rather than investigating isolated issues. By removing fragmented navigation, this workspace allows you to work without context switching, enabling you to open and run playbooks within the case context and quickly review the status of all tasks for all issues in the case.

The **Resolution Center** guides you toward resolution by answering the question, **What should I do next?** You can track your progress using four specialized tabs:

Pending

This tab acts as your to-do list for case actions. It displays any tasks waiting for execution or playbook tasks that require your input.

-   **Task details:** You can view the task summary and assignee, listed in order they were created.
    
-   **Play book execution:** Each task shows its source (Issue ID and Automation Name). You can click the Issue ID to open the issue card or click the playbook to open the workplan.
    

If the playbook is already in progress but requires user input, the label shows the status of the playbook. Click the label to open the Workplan and directly execute the playbook task.

**Note:**

Tasks that are already In Progress but still require your input will appear in both the Pending and In Progress tabs.

Recommended

Lists suggested playbooks and response actions to help remediate issues linked to the case.

-   **Task details:** You can see details of the recommended tasks, including the name of the source that triggered the recommendation.
    
-   **Consolidated tasks:** If the same action is recommended for multiple issues, it is only listed once. Review the labels on a task to see the issues for which the task is relevant.
    
-   **Playbook execution:** Click a playbook to preview and execute it in the **Work Plan**. If the playbook applies to multiple issues, you can choose which issues to run it against.
    
-   **Recommended response actions:** Click a recommended action to open a dialog with detailed steps for executing the action.
    

In Progress

Track currently running automations and remediation workflows in real time.

-   **Real-time tracking:** This tab shows all active playbooks, including those in the run queue.
    
-   **Status details:** Each record includes the playbook name, related issue, and current status (Error, Waiting, or Running).
    
-   **Navigation:** You can click any playbook to open the Work Plan or click an Issue ID to view the associated issue card.
    

Done

This tab provides a clear audit trail of your resolution steps.

You can review a list of completed playbooks and actions. Each record includes the playbook name, the related issue, the completion time, and the final status.

##### Collaborative notes and comments
Located within the **Resolution Center**, the **Notepad** and **Comments** panels enable team-wide communication and documentation. This workspace ensures all analysts stay aligned by maintaining a continuous record of the investigation.

Capabilities include:

-   **Notepad:** Record critical evidence, observations, and investigative steps to maintain a shared history for the case.
    
-   **Comments:** Share progress updates and discuss the case with team members in real-time.

##### Resolve a case
You can resolve a case in the following ways:

-   Manually on the Cases page:
    
    -   Click the case status and select Resolved.
        
    -   In the Resolve case dialog, select the resolution reason and leave a comment.
        
    -   Select whether to resolve all of the issues in the case, and whether to create an exclusion.
        
    -   Click Resolve.
        
    
-   In the API, run the `Update Case` command .
    

**Note:**

If a case is resolved with the status `Resolved - Auto Resolved`, Cortex Cloud can reopen the case for up-to six hours if a new issue is triggered that matches the case. The six-hour period is defined by the timestamp of the last issue that was grouped into the case. After the six-hour period, any new issues are linked to a new case for a new investigation.

##### Resolution reasons for cases and issues

Describes the resolution reasons for cases and issues.

When you resolve a case or issue, you must also specify a resolution reason. The following table describes the resolution reasons for selection.

| Resolution reason | Description |
| --- | --- |
| Resolved - True Positive | The case or issue was correctly identified by Cortex Cloud as a real threat, and the case was successfully handled and resolved. \*\*Note:\*\* Cases and issues resolved as True Positive and False Positive help Cortex Cloud to identify real threats in your environment by comparing future cases and associated issues to the resolved cases. Therefore, the handling and scoring of future cases is affected by these resolutions. |
| Resolved - False Positive | The case or issue is not a real threat. \*\*Note:\*\* Cases and issues resolved as True Positive and False Positive help Cortex Cloud to identify real threats in your environment by comparing future cases and associated issues to the resolved cases. Therefore, the handling and scoring of future cases is affected by these resolutions. |
| Resolved - Security Testing | The case or issue is related to security testing or simulation activity, such as a BAS, pentest, or red team activity. |
| Resolved - Known Issue | The case or issue is related to an existing issue or an issue that is already being handled. |
| Resolved - Duplicate Case | The case or issue is a duplicate of another case. |
| Resolved - Risk Accepted | The case or issue is related to a known mitigation or impact. |

#### Additional case actions

##### Create a case

You can manually create a new case, assign it to a specific domain, and define custom fields for the case.

**Note:**

To create a case manually, you must have View/Edit permission for Cases and Issues selected under Settings → Configurations → Access Management → Roles → Components → Cases & Issues.

You can create a case directly from the Cases page.

1.  On the Cases page click New Case.
    
2.  Under Case Details, specify the name, severity, and (Optional) description.
    
    The severity of a manually generated case cannot be low.
    
3.  Under Issue Details, select the issues to link to the case, or create a new issue.
    
    **Tip:**
    
    The issues that you link to a case can be linked to multiple cases, and the issue domains do not need to match the case domain.
    
4.  Under Issue Fields, define the following:
    
    **Note:**
    
    This option is only relevant for certain domains.
    
    -   MITRE ATT&CK tactics and techniques to assign to the case.
        
    -   Custom issue fields.
        
    
5.  (Optional) Under Playbook, specify playbook run settings. By default, a playbook is run Automatically by trigger.
    
    **Note:**
    
    This option is only relevant for certain domains.
    
6.  Click Create new case.
    
    Each case creation generates one issue. The name, the severity, and the description of the generated issue mirrors the name, the severity, and the description of the case.
    
    **Note:**
    
    You can't attach files to manually created cases.

##### Merge a case

You can merge cases from the Table view of the Cases page.

You can merge cases you think belong together.

1.  On the **Cases** page, click the Display menu and switch to the Table view.
    
2.  Select the cases you want to merge, right-click and select Merge cases.
    

Information about merging scores and case assignees

Case assignees are managed as follows:

-   If both cases have been assigned, the merged case takes the target case assignee.
    
-   If both cases are unassigned, the merged case remains unassigned.
    
-   If the target case is assigned and the source case is unassigned, the merged case takes the target assignee.
    
-   If the target case is unassigned and the source case is assigned, the merged case takes the existing assignee.
    
-   In the merged case, all source context data is lost even if the target case does or doesn't contain context data. If the target case contains context data, that context data is preserved in the merged case.

## Investigation and response

### Investigate issues

Cortex Cloud generates issues to bring your attention to security risks in your framework.

Issues help you to monitor and control the security of your system framework by notifying you about risks to security in your framework. Cortex Cloud generates issues from the following:

-   Rules that you set up, such as BIOC, IOC, correlation rules, malware rules, and vulnerability rules.
    
-   Findings
    
    Findings themselves are not issues, but findings that match a specific logic can generate issues.
    
-   Agents
    
-   Firewalls
    
-   Analytics
    
-   Integrations
    
    Integrations enable you to ingest events, such as phishing emails, SIEM events, from third-party security and management vendors. You might need to configure the integrations to determine how events are classified as events. For example, for email integrations, you might want to classify items based on the subject field, but for SIEM events, you want to classify by event type.

#### Overview of the Issues page

The Issues page consolidates all non-informational issues from your detection sources.

The Issues page consolidates all non-informational issues from your detection sources. By default, the Issues page displays the security issues received over the last seven days. To access the Issues page, go to Cases & Issues → Issues.

Each issue is linked to one or more cases. A case provides the full story of a problem by linking related issues, assets, and artifacts in one place. To make sure that you understand the full picture of how an issue fits into the bigger picture, we recommend that you start your investigation from the Cases page. You can see the issues linked to a case in the Issues & Insights tab of the selected case. Click on an issue to open the Issue card. For more information, see Issue card.

For issues associated with the Health domain, these issues are not linked to cases and should be investigated individually. You can also see Health domain issues on the Health Issues page. For more information, see About health issues.

**Note:**

Every 12 hours, the system enforces a cleanup policy to remove the oldest issues once the maximum limit is exceeded. The default issue retention period in Cortex Cloud is 186 days.

##### Standardized format of user names in issues

Cortex Cloud processes and displays the names of users in the following standardized format, also termed “normalized user”.

**``_`<company domain>`__`<username>`_``**

As a result, any issue triggered based on network, authentication, or login events displays the User Name in the standardized format in the Issues and Cases pages. This impacts every issue for Cortex Cloud Analytics and Cortex Cloud Analytics BIOC, including Correlation, BIOC, and IOC issues triggered on one of these event types.

##### Deduplicated FW issues

To reduce noise in your environment, if firewall issues with the same name and host are raised within 24 hours, the issues are deduplicated. A label indicates the number of deduplicated issues up to 1,000 issue counts, larger quantities display as 1000+.

##### Featured fields

You can highlight issues that are important to you by tagging speciﬁc issue attributes, such as host names, user names, IP addresses, and Active Directory, as featured fields. This can help you track issues. For more information, see Create a featured field.

##### Issue fields

To see a full list of issue fields and descriptions, run the following query in the Query Builder:

```
datamodel dataset = issues
```

#### Link or unlink issues from a case
You can link and unlink issues from cases. An issue can be assigned to more than one case, and the case domain can be different from the issue domain.

Link issues to a case

From the Issues page, select one or more issues that you want to link, right-click and select Manage Issue+Link to case. You can select one or more case to link the issues.

Unlink an issue from a case

From the Issues page, select the issue that you want to unlink, right-click and select Manage Issue+Unlink from case. You can select one or more cases to unlink the issue. You cannot bulk select issues to unlink.

#### Run an automation on an issue

Save time and expense by using playbooks and Quick Actions to automatically investigate and take remedial action on issues.

You can automate issue investigation and remediation by running a playbook or Quick Action on one or more issues. Automations can help to improve efficiency by automating and standardizing your workflows, promoting consistent and effective case response and management. For example, automations can automatically remediate a case by interacting with a third-party integration or open tickets in a ticketing system such as Jira.

You can view the playbook that is running on an issue or the playbooks that have already run in the Work Plan for an issue. You can view Quick Actions in the War Room for an issue.

**Note:**

In addition to automation, some playbooks contain manual tasks that prompt the analyst for input. This enables you to enhance an automation workflow with analyst input.

You can run automations in the following ways:

Manually run a playbook or Quick Action on one or more issues

1.  Right-click one or more issues in the Issues table and select Run Automation.
    
    If there is currently an automation running on one or more of the selected issues, the Run Automation option does not appear. If an automation is running on the issue, but has been paused (for example, waiting for a user action), you can select to rerun the automation or select a new automation.
    
2.  If the issues have an automation already assigned, choose Rerun current Automation or Select another Automation. If the issues do not have an automation assigned, Select Automation.
    
3.  If you are not rerunning the current assigned automation, select an automation to run for the selected issue(s).
    
4.  Click Run.
    

**Note:**

You can also manually select a playbook to run from the Issue Work Plan tab.

Apply automation rules

You can create automation rules that automatically run a playbook or Quick Action when an issue is created that meets specific criteria. For more information, see Create an automation rule.

For more information, see Automation in Cortex Cloud.

#### Use the War Room in an investigation

Use the War Room for real-time investigation into a case, to filter war room entries, and to disable indicator notifications.

The War Room contains an audit trail of all automatic or manual actions that take place in a case or issue. A War Room is where you can review and interact with your case or issue. Cortex Cloud provides machine learning insights to suggest the most effective analysts and command-sets. Each case and issue has a unique War Room.

Within Cortex Cloud, real-time investigation is facilitated through the War Room, which is powered by ChatOps. In the War Room you can take the following actions:

-   Run real-time security actions through the CLI, without switching consoles
    
-   Run security playbooks, scripts, and commands
    
-   Collaborate and execute remote actions across integrated products
    
-   Capture case context from different sources.
    
-   Document all actions in one source.
    
-   Communicate with others for joint investigations.
    

**Note:**

The case War Room is usually used for communication capabilities, but unlike the issue War Room, it does not include playbook specific entries. The case War Room enables you to investigate an entire case, not just an issue.

Every case has a War Room, but every user has access, subject to permissions, to a private War Room called the Playground.

##### The Playground

The Playground is a non-production environment where you can safely develop and test data, such as scripts, APIs, and commands. It is an investigation area that is not connected to a live (active) investigation.

To access the Playground, do one of the following:

-   Go to Investigation & Response → Automation → Playground
    
-   In any browser, type `https://<tenant>.<region>.paloaltonetworks.com/playground`
    

**Tip:**

In the Playground, you can clear the context data, if needed, which deletes everything in the Playground context data, but does not affect the actual issue or case. To clear the context, run `!DeleteContext all=yes'` from the CLI or click Clear Context Data while viewing the context data.

##### The War Room

When you open the War Room, you can see all the actions taken on a case, such as commands and notes in several formats such as Markdown, and HTML. When Markdown, HTML, or geographical information is received, the content is displayed in the relevant format.

To view specific data entries, you can filter entries by selecting the relevant checkbox, such as:

-   Chats: Shows communication between team members.
    
-   Notes: Any entries marked as notes.
    
-   Files: Anything uploaded to the War Room in a playbook, script, or by the analyst.
    
-   Issue History: Any issue field that was modified.
    
-   Commands and playbook tasks: Any actions taken by playbook tasks or run manually by the analyst.
    
-   Tags: Any tags added to the investigation.
    

**Note:**

Cortex Cloud does not index notes and chats.

In each War Room entry, you can take the following actions:

| Action | Description |
| --- | --- |
| Mark as note | Marks the entry as a note, which can help you understand why certain action was taken and assist future decisions. You can also add a note by doing the following: Upload a file to the War Room by selecting Mark as Note.; If the Issue Overview tab includes a NOTES section, add it to the section.; In a playbook task (Advanced tab) Tasks can be automatically added from script outputs as notes.; In the CLI by running the `` !markAsNote entryIDs=<`ID of the war room entry>` `` command. In the relevant War Room entry, click Copy to CLI to retrieve the `ID of the War Room entry`. When marked as a note, it is highlighted, so you can easily find them in the War Room or the Issue Overview tab. |
| View artifact in new tab | Opens a new tab for the artifact. |
| Detach from task | Removes a task from the artifact. |
| Attach to a task | Adds a task to the artifact. |
| Add tags | Add any relevant tags to use that help you find relevant information. |
| Copy to CLI | ID: Entry IDs are used to uniquely identify War Room entries and take the format `<ENTRY_IDENTIFER>@<CASE_ID>`, for example, `54925dc3-a972-4489-8bef-793331fa6c77@1`. Many out-of-the-box commands and scripts use entry IDs arguments to pass in files as inputs.; URL: Copy the URL which is a direct link to the War Room entry To find the entry ID or URL of an entry in the War Room, click on the vertical ellipsis icon at the upper right of the entry, then copy the value. |

##### Run Commands in the War Room CLI

Cortex Cloud enables you to run system commands, integration commands, and scripts from an integrated command line interface (CLI), which enables you to make comments in your case (in plain text or Markdown) and to execute automation scripts, system commands, and integration commands. This gives SOC teams the power to execute automations ad-hoc to support their investigations or make notes as they investigate cases.

In the CLI, you can run various commands by typing the following:

| Action | Description |
| --- | --- |
| `!` | Runs integration commands, scripts, and built-in commands, such as adding evidence and assigning an analyst. |

You can find relevant commands, scripts, and arguments with the CLI’s auto-complete feature. This also includes fuzzy searching to help you find relevant commands based on keywords. If you type the exclamation mark (!) and start typing, autocomplete populates with options that might suit your needs. For example, if you want to work with tasks, type `!task`, and all commands and scripts that include the `task` in their name will display.

**Tip:**

You can use the up/down arrow buttons in the CLI to do a reverse history search for previous commands with the same prefix.

Special characters

| Characters | Description |
| --- | --- |
| `&&, ||, !, {, }, [, ], (, ), ~, *, ?` | To use these characters, place them within single or double quotes. An escape character `\` is not required. |
| `\, \n, \t, \r, ", ^, :,` comma, and space | To use these characters, place them within single or double quotes and use an escape character `\`. |

Common arguments

The following common arguments are available for every script run from the CLI.

| Argument Name | Description |
| --- | --- |
| auto-extract | Whether/when to extract indicators. Possible values: `inline`: Extracts indicators within the indicator extraction run context (synchronously).; `outofBand`: Extracts indicators in parallel (asynchronously) to other actions.; `none`: Does not extract indicators (recommended for scripts with large outputs when indicator extraction is not required). |
| execution-password | Supplies a password to run a password-protected script. |
| execution-timeout | Defines how long a command waits in seconds before it times out. |
| extend-context | Select which information from the raw JSON you want to add to the context data. For a single value: `contextKey=RawJsonOutputPath` For multiple values: `contextKey1=RawJsonOutputPath1::contextKey2=RawJsonOutputPath2` |
| ignore-outputs | Possible values: `true` or `false`. If set to `true`, it does not store outputs in the context (besides extend context). |
| raw-response | Possible values: `true` or `false`. If set to `true`, it returns the raw JSON result from the script. |
| retry-count | Determines how many times the script attempts to run before generating an error. |
| retry-interval | Determines the wait time (in seconds) between each script execution. |
| using | Selects which integration instance runs the command. |
| using-brand | Selects which integration runs the command. If the selected integration has multiple instances, the script may run multiple times. Use the `using` argument to select a single integration instance. |
| using-category | Selects which category of integrations runs the command. If the selected category includes multiple integration instances, the script may run multiple times. Use the `using` argument to select a single integration instance. |

Access attributes in the Unified Asset Inventory

Commands you run in the War Room can automatically populate parameters such as region, account id, and tags, based on asset data. Commands can reference UIA attributes for the relevant asset(s) in the issue context and use those attributes as input. The issue must contain the relevant `Asset ID`.

The syntax to reference attributes in the UAI is `${asset.xdm.asset.attributename}`. To find the property path in the XDM data set, see the asset data card for the asset in the Inventory page. For example, to print the region for the asset, enter `!print value=${asset.xdm.asset.cloud.region}`. You can also run commands and scripts directly on the asset using `${asset.xdm.asset}`.

Run commands in the Automations browser

You can view and run commands and scripts (not system commands, operations, and notifications) in the Automations Browser, by clicking  next to the CLI.

The Automations Browser enables you to run commands and all associated arguments. The scripts and commands are separated into sections such as scripts and built-in commands. In each argument, you can do the following:

-   Hardcode the value
    
-   Use a dynamic value
    
    You can dynamically pass information into the argument by clicking the curly bracket. For example, the `EmailAskUser` command asks a user a question via email. In the `email` argument, rather than typing the user's email address, you can send it to whoever created the case.
    
    1.  In the email field, click the curly brackets.
        
    2.  In the search box, enter `created`.
        
    3.  Under CASE DETAILS click Created by.
        
        The email argument appears as `${alert.dbotCreatedBy}`.
        
    4.  Run the command.
        
        An email is sent to the user who created the case.
        
    
    You can use transformers and filters to filter and transform data from the command.
    

Common arguments when using the Automations browser

| Argument | Description |
| --- | --- |
| Using | Selects which integration instance runs the command. |
| Extend context | Determines the wait time (in seconds) between each script execution. For a single value: `contextKey=RawJsonOutputPath` For multiple values: `contextKey1=RawJsonOutputPath1::contextKey2=RawJsonOutputPath2` |
| Ignore outputs | Does not store outputs in the context (besides extend context). |
| Execution timeout (seconds) | Defines how long a command waits in seconds before it times out. |
| Number of retries | Determines how many times the script attempts to run before generating an error. |
| Retry interval (seconds) | Determines the wait time (in seconds) between each script execution. |

Examples using the CLI

To run the print script with a value of `"hello"` and the key `a` from the context:

`!Print value="hello ${a}"`

To run the Python command returning Hello World using escape characters:

`!py script="demisto.results(\"hello world\")"`

To run the Python command returning Hello World using backticks:

`` !py script=`demisto.results("hello world")` ``

#### Use the Work Plan in an investigation

A Work Plan is a visual representation of the running playbook that is assigned to a case. Use it to monitor and manage a playbook workflow.

The Work Plan is a visual representation of the running playbook assigned to the issue. Playbooks enable you to automate many security processes, such as managing your investigations and handling tickets. Work Plans enable you to monitor and manage a playbook workflow, and add new tasks to tailor the playbook to a specific investigation.

In an investigation, when you open the Work Plan tab you can see the playbook, the playbook name, and navigation tools.

By default, the Follow checkbox is checked, which allows you to see the playbook executing in real-time. The playbook moves when a task is completed.

In the Work Plan you can do the following:

| Action | Description |
| --- | --- |
| Change the default playbook | On the left-hand side of the window, select the playbook you want to run. When changing the playbook, all completed tasks are removed and the new playbook will run. If you select playbooks several times you can view the history of which playbooks ran. |
| Rerun the playbook | When changing the playbook, select the current playbook to run again. |
| View inputs and outputs | View the inputs and outputs of each task that has run. You can't view inputs and outputs of any task that hasn't run. |
| Manage tasks | View, create, and edit a playbook task. For each task, you can do the following: Designate tasks as complete either manually or by running a script.; Assign an owner.; Set a due date.; Add comments and completed notes, as required.; View any automation exclusion policies that affected the task execution. Automation exclusion policies prevent automated remediation on critical assets specified by admins. The Policies tab only appears if the task includes a command or script affected by an automation exclusion policy. You can manage these tasks in the CLI by using the `/task` command. |
| Export to a PNG | Export the Work plan to a PNG format for easy analysis. |

The color coding and symbols in the Work Plan help you to easily troubleshoot errors or respond to manual steps. The following table displays the playbook tasks and icons in the Work Plan.

**Important:**

A playbook will not continue its execution path if a prior task has failed; you must resolve the failed task before subsequent tasks can run.

##### Playbook tasks and icons in the Work Plan

| Task | Description |
| --- | --- |
|  | →**Standard manual task** An arrow with a light blue square background indicates a standard manual task. The following are kinds of standard tasks. Manual Standard task (no lightning bolt logo): These tasks are used where usually it's not possible to automate them. You can add comments, assign them to an owner, and set a due date. The analyst who is responsible for the investigation needs to complete the task before the Work Plan can continue. A user icon ( ) indicates the task requires manual inputs.; Automated Standard task (with lightning bolt script logo): A single command or script that is set to automatically run when the Work Plan execution reaches this step. Some scripts need arguments in order to run - make sure to set them up properly. If left empty, the analyst who is responsible for the investigation will need to complete them so the script will run and the Work Plan can continue.; Automated Standard task (with Builtin logo): A single system command or script that is set to automatically run when the Work Plan reaches this step. Some scripts need arguments in order to run - make sure to set them up properly. If left empty, the analyst who is responsible for the investigation will need to complete them so the script will run and the Work Plan can continue.; Automated Standard task (with Multi Command logo): A generic single command or script that can be used with multiple integrations is set to automatically run when the Work Plan reaches this step. Some scripts need arguments in order to run - make sure to set them up properly. If left empty, the analyst who is responsible for the investigation will need to complete them so the script will run and the Work Plan can continue. |
|  | **Conditional task** A diamond icon in a purple square background indicates a conditional task used as decision trees in your Work Plan. The following are kinds of conditional tasks. Manual conditional task. A user icon ( ) indicates the task requires manual inputs.a; Automated conditional task (with the lightning bolt script logo).; Automated conditional task that uses a system script (with the Builtin logo). |
|  | **Data collection task / Communication task** The speech bubble in a turquoise background  indicates a data collection task. This task prompts the receivers to respond to a multi-question form and submit replies, even if they are not Cortex users. A user icon ( ) indicates the task requires manual inputs. |
|  | **Sub-playbook task** The workflow icon in a blue background indicates that the task is a playbook nested within the parent playbook. You can view the playbook by opening the task and selecting Open sub-playbook. |
|  | **Task containing an error** Scripts or sub-playbooks that have errors are designated by a red triangle. You need to open the script or sub-playbook to review the errors. |
|  | **Task containing a deprecated script or needs to be updated** Scripts or sub-playbooks that have updates or are deprecated are designated by a yellow triangle. You need to update the scripts, integration commands, or sub-playbook tasks to their most current version. |
|  | **Set to skip** When a task is set to skip, the skip icon will be orange. |
|  | **Breakpoint** When the Work Plan reaches a breakpoint, the task has an orange line at the top to indicate the breakpoint. |
|  | **Overridden inputs or outputs** When a task is set to have overridden inputs or outputs, the word Input or Output appears in orange. |
|  | **Pending/in queue task** When the Work Plan starts to run, all tasks that are about to be performed are gray. |
|  | **Running/ in progress task** A spinning circle inside the gray square indicates a running/in progress  task. |
|  | **Completed task** The green square indicates a completed task. |
|  | **Waiting task** The orange square indicates that the task is pending action. If you hover over the icon on the top left corner, details about the reason the task is in waiting mode appear. The user icon ( ) indicates the task requires you to open it and manually mark it as complete. A speech bubble icon () indicates the task is waiting for a questionnaire to be completed. |
|  | **Failed task** The red warning icon indicates that the task failed to complete as expected and requires manual inspection and troubleshooting. Contact your Cortex Cloud administrator. If you hover on the icon on the top left corner, details about the specific problem appear. If a red warning icon is paired with the clock icon (), the task’s SLA is overdue. |
|  | **Skipped task** The task will look faded to indicate it was not executed. This can happen if this task was set to be skipped when an error occurs, or if it is in a branch that was not executed if a condition wasn’t met. |

##### Add ad-hoc tasks to the Work Plan

As part of your issue investigation, within the Work Plan you can create tasks for a specific iteration of a playbook. The task type can be an automation or another playbook. For example, within a manual task, you might need to enrich some data and run an investigation playbook.

When you create a task, add a name, automation, and description. The name and description should be meaningful so that the task corresponds to the data that you are collecting.

1.  In the Cases page, select the case to update.
    
2.  In the Issues & Insights tab, click the issue to add the task to and then click the Work Plan tab.
    
3.  In the Work Plan, go to the task where you want to add a new task and click the + sign at the bottom right-hand corner of the task.
    
    The ad-hoc task is added after the task you clicked.
    
4.  Select the task type.
    
    -   Standard: Runs a single automation.
        
    -   Playbook: Runs a playbook to enhance the investigation.
        
        The playbook functions as any playbook would and requires you to define the inputs and outputs, as well as any other details.
        
    -   Click Save.
        
    
5.  To run the Work Plan again click the Run Again icon.

#### Issue syncing

Set up integrations that mirror Cortex issues with external applications, such as Jira or ServiceNow.

You can set up integrations in Cortex Cloud that mirror Cortex issues with external applications, such as Atlassian Jira or ServiceNow. When mirroring issues (also referred to as issue syncing), you can make changes in an external application that will be reflected in Cortex Cloud, and vice versa. If an issue is mirrored with an external application, you have the following options:

-   **Link the ticket to the issue:** If an issue is linked to a ticket, the ticket number is displayed in the Overview section of the issue card. You see details about the status of the ticket by clicking on the ticket number.
    
-   **Sync changes between the issue and the ticket:** If an issue is synced to a ticket, changes are synchronized in an outbound, inbound, or bi-directional flow.
    

**Note:**

Multiple tickets can be linked to an issue with outbound syncing. Issues with inbound syncing can be linked to a single ticket only.

##### Set up an external integration to sync with issues

Before you can sync issues with external applications, you must set up and configure your integration instance. Complete the following steps:

1.  Install the content pack.
    
    1.  To install from the Data Sources & Integrations page: Navigate to Settings → Data Sources & Integrations, click \+ Add New., and search for the relevant content pack.
        
        To install from Marketplace: Navigate to Settings → Configurations → Marketplace. and browse for the relevant content pack.
        
    2.  Install the relevant content pack, for example Atlassian Jira or ServiceNow.
        
    
2.  Connect an integration instance.
    
    1.  Navigate to Settings → Data Sources & Integrations.
        
    2.  Search for the relevant data source (for example Atlassian Jira) select it, and click Add Instance.
        
    3.  Enter instance details in the required fields and click Connect.
        
    

##### Manually create a synced ticket

**Prerequisite:**

You must set up an integration before you can sync issues. For more information, see Set up an integration for mirroring issues.

You can manually sync existing issues with external applications.

1.  From the **Issues** page, right-click an issue and select Run Automation → Select Automation.
    
2.  Under Quick Actions, select the action you want to configure, such as Create Jira Ticket or Create ServiceNow Ticket.
    
3.  Define the required ticket parameters.
    
    **Note:**
    
    Using issue fields as variables is not currently supported.
    
4.  Under Using, select the name of the instance to execute the command.
    
    **Warning:**
    
    If you leave this field blank, all configured instances will be used.
    
5.  Under Sync Configuration, the following options are displayed, depending on your selection:
    
    -   Link to issue: select this option if you want the issue to be linked to the created ticket. You must check this option if you want to sync the issue with the ticket.
        
    -   Sync Direction: select the syncing configuration:
        
        -   Inbound: Sync changes from the external ticket with the Cortex Cloud issue.
            
        -   Outbound: Sync changes from the Cortex Cloud issue with the external ticket.
            
        -   Bi-directional: Sync changes in both directions.
            
        -   None: Do not sync changes between the Cortex Cloud issue with the external ticket. If you select this option, the tickets are still linked, but changes are not synced. You can update this option at any time to start syncing.
            
        
    -   Define the inbound and/or outbound sync profiles.
        
        Depending on the selected option, select sync profiles that define field mapping between the issue and the external ticket. You can use the default sync profiles or you can create custom profiles. For more information about sync profiles, see Create a sync profile.
        
        **Note:**
        
        You can only define a single inbound profile. If you change the inbound sync profile the current profile is overwritten.
        
        You can define multiple outbound profiles; one issue can update multiple tickets.
        
    
6.  Click OK.
    
    After ticket creation, the ticket number is shown in the Issue card. Click on the ticket number to see details about the created ticket and syncing configuration. In addition, the execution is recorded in the **War Room** tab. If there is a error in the requested action, you can see details in the audit.
    
7.  View or edit the syncing configuration. For more information, see View, update, or resolve a ticket.
    

Example 39. 

The following example shows an automation run on an issue to create a ServiceNow ticket that is synced in an outbound flow with the ticket.

  

##### Run a War Room command to create and sync a ticket

You can run the following command in the War Room to create an external ticket and define the syncing configuration:

```
!jira-create-issue-quick-action summary="<summary>" project_key="<key>" issue_type_name="<type>" 
description="<description>" using="<instance>" mirroring_link_to_object="true" 
mirroring_sync_direction="<syncDirection>" mirroring_outbound_profile_id="<profileID>"
```

**Tip:**

You can find a sync profile ID under Settings → Configurations → Object Setup → Issues → Sync Profiles. By default the ID field is not displayed in the table. Click the three dot menu and add it to the table layout.

Example 40. 

The following example creates a Jira Bug ticket for the Project Key SCRUM, with an Outbound sync configuration:

```
!jira-create-issue-quick-action summary="Restrict ingress on AWS Network ACLs for admin ports 22 and 3349" 
project_key="SCRUM" issue_type_name="Bug" description="We identified that multiple AWS Network ACLS are 
allowing inbound (ingress) traffic on admin ports" using="JiraV3" mirroring_link_to_object="true" 
mirroring_sync_direction="OUTBOUND" mirroring_outbound_profile_id="h8e14996-8695-5396-9g87-f08suu907486"
```

  

##### Create an automation rule for syncing issues with external tickets

**Prerequisite:**

You must set up an integration before you can sync issues. For more information, see Set up an integration for mirroring issues.

You can set up automation rules that create external tickets when certain issues occur and define the syncing configuration for transferring data between the issues and tickets.

1.  Go to Investigation & Response → Automation → Automation Rules.
    
2.  Click Add Automation Rule.
    
3.  Enter a name and description for the rule.
    
4.  Select whether to enable the rule after creation.
    
5.  Under Rule Conditions, define the WHEN, and IF conditions. For more information about rule conditions, see Create an automation rule.
    
6.  Under THEN select the desired automation, such as Create Jira Ticket and complete the following fields:
    
    1.  Define the required ticket parameters.
        
        **Note:**
        
        Using issue fields as variables is not currently supported.
        
    2.  Under Using, select the name of the instance to execute the command.
        
        **Warning:**
        
        If you leave this field blank, all configured instances will be used.
        
    3.  Under Sync Configuration, the following options are displayed, depending on your selection:
        
        -   Link to issue: select this option if you want the issue to be linked to the created ticket. You must check this option if you want to sync the issue with the ticket.
            
        -   Sync Direction: select the syncing configuration:
            
            -   Inbound: Sync changes from the external ticket with the Cortex Cloud issue.
                
            -   Outbound: Sync changes from the Cortex Cloud issue with the external ticket.
                
            -   Bi-directional: Sync changes in both directions.
                
            -   None: Do not sync changes between the Cortex Cloud issue with the external ticket. If you select this option, the tickets are still linked, but changes are not synced. You can update this option at any time to start syncing.
                
            
        -   Define the inbound and/or outbound sync profiles.
            
            Depending on the selected option, select sync profiles that define field mapping between the issue and the external ticket. You can use the default sync profiles or you can create custom profiles. For more information about sync profiles, see Create a sync profile.
            
            **Note:**
            
            You can only define a single inbound profile. If you change the inbound sync profile the current profile is overwritten.
            
            You can define multiple outbound profiles; one issue can update multiple tickets.
            
        
    4.  Click OK.
        
        If a ticket is created, the ticket number is shown in the Issue card. You can click on the ticket number to see details about the created ticket and syncing configuration. In addition, the execution is recorded in the **War Room** tab. If there is a error in the requested action, you can see details in the audit.
        
    
7.  Click Create.
    
    The rule is added to the Automation Rules page. If required, drag to reorder the rules.
    

Example 41. 

The following example shows an automation rule that creates a Jira ticket with bi-directional syncing when a Critical Posture issue is triggered.

  

##### View, update, or resolve a ticket

Once you have set up ticket syncing, you can view, update and resolve the issue and external ticket as required The changes are reflected according to the defined syncing configuration.

1.  To open the ticket details, in the Overview section of the issue card, click on the external ticket number.
    
    A panel opens with details of the external ticket. You can see the external ticket number, the sync configuration, and details of the ticket.
    
2.  Open the linked ticket by clicking on the external ticket number in the panel.
    
3.  Update the fields as required.
    
    The updates are logged in the ticket history.
    
    **Note:**
    
    -   The inbound syncing flow runs every two minutes, and the outbound syncing flow runs every five minutes.
        
    -   In a bi-directional set-up, if the same field is updated in both tickets, the most recently updated value is used.
        
    -   In the external ticket, the logged history shows updates to the ticket. The user name that is logged with the history reflects the user token of the user who configured the data source.
        
    
4.  Resolve the ticket.
    
    **Note:**
    
    After an issue is resolved, ticket syncing remains active for up-to seven days. Therefore, you still update, change, or reopen the issue or external ticket and the tickets will continue to sync.
    

##### Edit or disable ticket syncing

You can change the syncing configuration between a ticket and an issue from the issue card.

1.  In the Overview section of the issue card, click on the external ticket number.
    
    A panel opens with details of the ticket.
    
2.  Click on the settings icon.
    
3.  Under Sync Configuration, change the syncing configuration as required.
    
    **Note:**
    
    If you change the selected inbound sync profile, the original sync profile is immediately overwritten.
    
4.  To disable ticket syncing, take one of the following actions:
    
    -   To pause ticket syncing, set the Sync Direction value to None.
        
        This temporarily stops the tickets from syncing, but the tickets are still linked. You can update the syncing configuration at any time to resume ticket syncing.
        
    -   To unlink the tickets, uncheck Link to issue.
        
        This action is not reversable.
        
    
5.  Click Save.
    

##### Add playbook tasks to create external tickets

**Prerequisite:**

You must set up an integration before you can sync issues. For more information, see Set up an integration for mirroring issues.

You can add a playbook task that creates external tickets and defines the syncing configuration.

1.  Open a new or existing playbook and add a new task.
    
2.  Select the Task Type and add a task name.
    
3.  Select one of the following scripts:
    
    -   `jira-create-issue-quick-action (Jira V3)`
        
    -   `servicenow-create-issue-quick-action (Jira V3)`
        
    
4.  Under Inputs, add fields for the ticket parameters.
    
    Example 42. 
    
    This example defines fields for a Jira ticket.
    
    -   Summary: AWS Network ACLs allow ingress traffic on Admin ports
        
    -   Project Key: SCRUM
        
    -   Issue Type: Bug
        
    -   Description: We identified that multiple AWS Network ACLS are allowing inbound (ingress) traffic on admin ports
        
    
      
    
5.  Under Sync Configuration, the following options are displayed, depending on your selection:
    
    -   Link to issue: select this option if you want the issue to be linked to the created ticket.
        
    -   Sync Direction: select the syncing configuration:
        
        -   Inbound: Sync changes from the external ticket with the Cortex Cloud issue.
            
        -   Outbound: Sync changes from the Cortex Cloud issue with the external ticket.
            
        -   Bi-directional: Sync changes in both directions.
            
        -   None: Do not sync changes between the Cortex Cloud issue with the external ticket.
            
        
    -   Define the inbound and outbound sync profiles.
        
        Depending on the selected option, select sync profiles that define field mapping between the issue and the external ticket. You can use the default sync profiles or you can create custom profiles. For more information about sync profiles, see Create a sync profile.
        
        **Note:**
        
        You can only define a single inbound profile. If you change the inbound sync profile the current profile is overwritten.
        
        You can define multiple outbound profiles; one issue can update multiple tickets.
        
    
6.  Save the playbook.
    

##### Limitations of issue mirroring

Consider the following limitations of issue mirroring:

-   Issue syncing requires the latest version of Atlassian Jira (V3) and ServiceNow (V2).
    
-   Issue syncing is currently supported in Atlassian Jira (V3) and ServiceNow (V2) only.
    
-   You can sync up to 50K objects.
    
-   You can create a maximum of 200 sync profiles.
    
-   Cortex Cloud supports up-to 100 Inbound syncs across all synced tickets over a two-minute time period. Any additional changes beyond this limit will not be synced.
    
-   If a connector instance is deleted or disabled, tickets are no longer synced and external ticket information is not available.
    
-   Custom statuses are not supported.
    
-   Currently, a specific set of fields is supported.

#### Issue investigation actions

##### Copy issues

You can copy an issue into memory.

You can copy issue text into memory and paste it into an email. This is helpful if you need to share or discuss a specific issue with someone. If you copy a field value, you can also paste it into a search or begin a query.

How to copy an issue value

1.  From the Issues page, right-click the issue you want to send.
    
2.  Select one of the following options: .
    
    -   Copy text to clipboard
        
    -   Copy entire row
        
    -   Copy issue URL
        
    
    Cortex Cloud saves the copied text to memory.
    
3.  Paste the URL into an email or use it as needed to share the information.

##### Update issue fields

Use a playbook, script, or command to update issue fields.

You can update issue fields by running the `setIssue` and `setIssueStatus` commands in the CLI, in a script, or a playbook task.

-   **`setIssue`:** Sets values for specific issue fields. The supported fields are presented in the list of arguments.
    
    Example 48. Examples of the setIssue command in the CLI
    
    The following examples show how to run the `setIssue` command in the CLI. You can run CLI commands in the War Room. When you start typing the CLI provides the available options and if you select an enum field, the CLI provides the available values.
    
    -   To change the issue severity to `high`, run
        
        ```
        !setIssue severity=high
        ```
        
    -   To change the issue severity to `high` and star the issue, run
        
        ```
        !setIssue severity=high starred=true
        ```
        
    
      
    
-   **`setIssueStatus`:** Sets the status or resolution value for an issue. This command supports the `status` argument, which presents a list of status and resolution type values. The selected status is set in the `custom_status` field.
    
    If you specify a resolution status, the issue is closed and the `resolution_status` and `closeReason` fields are updated to the same value as the `custom_status` field. If you specify a New, Reopened, or Under Investigation status, the issue remains open and the `resolution_status` and `closeReason` fields are empty.
    
    **Tip:**
    
    You can create custom issue statuses and resolution reasons, and use the `setIssueStatus` command to set these custom statuses for issues.
    
    For example, when a user starts investigating an issue, the issue status is automatically changed from New to Under Investigation. In some cases, it is useful to create an interim status, such as Triage. After you create the custom status, the new status will be available for selection. To create a custom status, follow the instructions in Create custom case statuses and resolution reasons.
    
    Example 49. Examples of using the setIssueStatus command in the CLI
    
    The following examples show how to run the `setIssueStatus` command in the CLI. You can run CLI commands in the War Room. When you start typing, the CLI provides the available options and if you select an enum field, the CLI provides the available values.
    
    -   To change the issue status to `Resolved - Known Issue`, run
        
        ```
        !setIssueStatus status="Resolved - Known Issue"
        ```
        
    -   To change the issue status to custom status `Triage`, run
        
        ```
        !setIssueStatus status=Triage
        ```
        
        **Note:**
        
        You must create a custom status before you can select it.
        
    
      
    
    Example 50. Example of using the setIssueStatus command in a playbook
    
    The following example shows how the `setIssueStatus` command can be used in a playbook task. In this example, the task sets a custom issue status (Triage). The custom issue status was created before setting up the playbook.

##### Export issue details to a file

You can review issue details offline by exporting issues to a TSV file.

To archive, continue investigation offline, or parse issue details, you can export issues to a tab-separated values (TSV) file:

1.  From the Issues page, adjust the filters to identify the issues you want to export.
    
2.  When you are satisfied with the results, click the download icon ().
    
    The icon is grayed out when there are no results.
    
    Cortex Cloud exports the filtered result set to the TSV file.

##### Exclude an issue

You can exclude issues that are not deemed to be a threat.

During the process of triaging and investigating issues, you might determine that an issue does not indicate threat. You can choose to exclude the issue, which hides the issue, excludes it from cases, and excludes it from search query results.

You can also set up issue exclusion rules that automatically exclude issues that match certain criteria. For more information, see Issue exclusions.

How to exclude an issue

1.  From the Issues page, locate the issue you want to exclude.
    
2.  Right-click the row, and select Manage Issue → Exclude Issue.
    
    A notification displays indicating the exclusion is in progress.

##### Query case and issue data

You can run queries on case and issue data with the `cases` and `issues` datasets.

Cortex Cloud uses Cortex Query Language (XQL) as the primary language for searching, analyzing, and transforming security data. XQL allows for highly efficient querying across vast amounts of security telemetry, such as:

-   Threat hunting: Proactively search your entire environment for malicious activity, anomalies, and indicators of compromise (IOCs). Formulate queries to look for specific patterns of behavior that might indicate an ongoing attack, even if no alert has been triggered.
    
-   Investigation: When a case or issue is generated, XQL allows security analysts to drill down into the underlying data, understand the full scope of an attack, identify affected assets, and trace the attacker's actions.
    
-   Forensics: Extract detailed information about past events for post-incident analysis and compliance audits.
    
-   Reports and dashboards: Create custom reports and dashboards to visualize security posture, track key metrics, and communicate insights to stakeholders.
    

To view and use sample investigative queries, such as the Top Unresolved High Severity Cases query, go to Investigation & Response → Search → Query Builder → XQL → Query Library. For more information about using XQL, see Cortex Cloud XQL.Cortex Cloud XQL

You can query case and issue data in the `cases` and `issues` datasets. When using the `issues` dataset, keep in mind the following:

-   Informational issues are not included in this dataset.
    

The `issues` dataset is categorized by domain. To query only security issues, use the following XQL:

```
dataset = issues | filter issue_domain = "SECURITY"
```

To query only posture issues, use the following XQL:

```
dataset = issues | filter issue_domain = "POSTURE"
```

### Review findings

Review findings for an asset to gain insights into an asset’s posture status.

Findings provide knowledge about an asset by leveraging the data we collect from various sources. This process helps build a more accurate and comprehensive understanding of the asset’s current state, including its configuration, behavior, and context within the environment. Additionally, findings provide visibility into potential exposures and vulnerabilities, contributing to a clearer assessment of the asset’s risk level. By continuously analyzing and updating findings, we can maintain an up-to-date view of the asset’s security posture and support more informed decision-making for detection, prioritization, and remediation efforts. For more information, see Findings and events.

Click on a finding from any location in the UI to open the findings card. For more information, see Findings card. To view all findings, go to Issues+Findings table. You can also see findings for a specific asset by opening the asset card.

  Show me more

#### Types of findings

The following table describes the different types of findings:

**Note:**

| Type | Description |
| --- | --- |
| Code | Discovery of security issues within application source code, such as bugs, logic flaws, and insecure coding practices. |
| Compliance | Discovery of compliance violations that do not adhere to the security standards for your organization. |
| Configuration | Discovery of incorrect settings or configurations in systems, applications, or devices that reduce the environment's resilience and increase the potential for compromise. |
| Data | Discovery of sensitive data misuse, secrets, and shadow data. |
| Identity | Discovery of suspicious user identities, highlighting authentication and access control to prevent unauthorized access and minimize the risk of over-permissive access rights that could lead to security breaches. |
| Malware | Discovery of malicious files within cloud workloads. |
| Posture | Discovery of posture risks that might expose critical assets to potential cyberattacks and operational disruption. |
| Vulnerability | Discovery of weaknesses or flaws in software or hardware that attackers can exploit to gain unauthorized access, disrupt operations, or steal data. |

#### Set up rules to trigger issues from findings

Findings themselves are not issues, but findings that match a specific logic can generate issues. You can also set up your own policies and rules to trigger issues when the following types of findings are recorded:

-   Compliance, Malware, or Secrets findings, for more information, see Cloud workload policies and rules.Introduction
    
-   Vulnerability findings, for more information, see Vulnerability policies.
    

#### Query findings data

You can query finding data in the `findings` data set.

Example 51. 

The following query searches for all findings for AssetA:

```
dataset = findings | filter xdm.finding.asset_name = "AssetA"
```

#### Findings card

The Findings card provides information about a selected finding, including the Finding ID, category, and associated asset.

The Findings card displays information about the selected finding. On this card you can see the following information.

**Note:**

The information in this card is context specific, therefore some sections are not available for all findings.

| Section | Description |
| --- | --- |
| Header | Finding ID, name, category (such as, Vulnerability or Compliance), time created, and time updated. |
| Description | Reason that the finding was created. |
| Impact | Information about the possible impact of the finding on your system. |
| Asset | Name and type of the affected asset. To investigate the asset, click on the asset name to open a new tab displaying the asset card. |
| Evidence | Visualization of the finding in your environment. |
| Data | Normalized finding data. |

### Investigate artifacts and assets

You can investigate specific artifacts and assets on dedicated views related to IP address, Network Assets, and File and Process Hash information.

From the Cases view, open the Key Assets & Artifact tab to see the assets and artifacts that are associated with the case, including hosts, IP addresses, and users. Icons represent properties of the artifacts and assets. Hover over an icon for more information. Click the more options icon to drill down in dedicated views, or take actions on the asset or artifact. The Key Assets & Artifact tab shows the following information:

-   Artifacts
    
    To aid you with threat investigation, Cortex Cloud displays the WildFire-issued verdict for each key artifact in a case. To provide additional verification sources, you can integrate external threat intelligence services with Cortex Cloud.
    
-   Assets
    
    Displays Hosts and Users details. For hosts with a Cortex XDR agent installed, click on the host name to see more information in the Details panel.

#### Investigate an IP address

Investigate cases, connections, and threat intelligence reports related to a specific IP address on the IP View.

Drill down on an IP address on the IP View. On this view, you can investigate and take actions on IP addresses, and see detailed information about an IP address over a defined 24-hour or 7-day time frame. In addition, to help you determine whether an IP address is malicious, the IP View displays an interactive visual representation of the collected activity for a specific IP address.

How to investigate an IP address

1.  Open the IP View.
    
    Right-click the IP address that you want to investigate and select Open IP View.
    
2.  In the left panel, review the overview of the IP address.
    
    The overview displays network operations, cases, actions, and threat intelligence information relating to the selected IP address, and provides a summary of the network operations and processes related to the IP address.
    
    The displayed information and available actions are context-specific.
    
    1.  Add an Alias or Comment to the IP address.
        
    2.  Review the location of the IP address. By default, Cortex Cloud displays information on whether the IP address is an internal or external IP address.
        
        -   External—Connection Type: Incoming displaying IP address is located outside of your organization. Displays the country flag if the location information is available.
            
        -   Internal—Connection Type: Outgoing displaying IP address is from within your organization. The XDR Agent icon is displayed if the endpoint identified by the IP address had an agent installed at that point in time.
            
        
    3.  Identify the IOC severity.
        
        The color of the IP address value is color-coded to indicate the IOC severity.
        
    4.  Review threat intelligence for the IP address.
        
        Depending on the threat intelligence sources that are integrated with Cortex Cloud, the following threat intelligence might be available:
        
        -   Virus Total score and report
            
            **Note:**
            
            Requires a license key. Select Settings → Configurations → Integrations → Threat Intelligence.
            
        -   Whois identification data for the specific IP address.
            
        -   IOC Rule, if applicable, includes the IOC Severity, Number of hits, and Source.
            
        -   EDL IP address if the IP address was added to an EDL.
            
        
    5.  Review the related cases.
        
        Recent Open Cases lists the most recent cases that contain the IP address as part of the case’s key artifacts, according to the Last Updated timestamp. If the IP address belongs to an endpoint with a Cortex XDR agent installed, the cases are displayed according to the hostname rather than the IP address. To dive deeper into a specific case, select the case ID.
        
3.  In the right-hand view, use the filter criteria to refine the scope of the IP address information that you want to visualize in the map.
    
    In the Type field, select Host Insights to pivot to the Asset View of the host associated with the IP address, or select Network Connections to display the IP View of the network connections made with the IP address.
    
4.  Review the selected data.
    
    -   Select each node for additional information.
        
    -   Select Recent Outgoing Connections to view the most recent connections made by the IP address. Search all Outgoing Connections to run a Network Connections query on all the connections made by the IP address.
        
    
5.  Perform actions on IOC or EDL.
    
    Depending on the current IOC and EDL status, the Actions button is displayed.

#### Investigate an asset

Investigate host assets and view host insights on the Asset View.

Drilldown on an asset on the Asset View. On this view you can investigate host assets, view host insights, and see a list of cases related to a host.

**Note:**

The Asset view is available for hosts with a Cortex XDR agent installed.

How to investigate an asset

1.  Open the Asset View.
    
    Identify a host with a Cortex XDR agent installed and select Open Asset View.
    
2.  In the left panel, review the overview of the host asset.
    
    The overview displays the host name and any related cases.
    
    1.  Add an Alias or Comment to the host name.
        
    2.  Review the related cases.
        
        Recent Open Cases lists the most recent cases that contain the host as part of the case’s key artifacts, according to the Last Updated timestamp. To dive deeper into a specific case, select the Case ID.
        
3.  In the right hand view, use the filter criteria to refine the scope of the host information that you want to display.
    
    In the Type field, select one of the following:
    
    -   Host Insights: View a list of the host artifacts.
        
    -   Network Connections: Pivot to the IP view displaying the IP addresses associated with the host.
        
    -   Host Risk View: View insights and profiling information. Available with the the Identity Threat Module.
        
    
4.  Review the data.
    
    Select Run insights collection to initiate a new collection. The next time the Cortex XDR agent connects, the insights are collected and displayed.
    
5.  Perform actions on the host.

#### Investigate a file and process hash

Investigate cases, actions, and threat intelligence reports related to a specific file or process hash on the Hash View.

Drilldown on a file or process hash on the Hash View. On this view you can investigate and take actions on SHA256 hash processes and files, and see information about a specific SHA256 hash over a defined 24-hour or 7-day time frame. In addition, you can drill down on each of the process executions, file operations, cases, actions, and threat intelligence reports relating to the hash.

How to investigate a file or process hash

1.  Open the Hash View.
    
    Identify the file or process hash that you want to investigate and select Open Hash View.
    
2.  In the left panel, review the overview of the hash.
    
    1.  Review the signature of the hash, if available.
        
    2.  Identify the WildFire verdict.
        
        The color of the hash value is color-coded to indicate the WildFire report verdict:
        
        WildFire color key
        
        -   Blue—Benign
            
        -   Yellow—Grayware
            
        -   Red—Malware
            
        -   Light gray—Unknown verdict
            
        -   Dark gray—The verdict is inconclusive
            
        
    3.  Add an Alias or Comment to the hash value.
        
    4.  Review threat intelligence for the hash.
        
        Depending on the threat intelligence sources that are integrated with Cortex Cloud, the following threat intelligence might be available:
        
        -   Virus Total score and report.
            
            **Note:**
            
            Requires a license key. Go to Settings → Configurations → Integrations → Threat Intelligence.
            
        -   IOC Rule, if applicable, including the IOC Severity, Number of hits, and Source according to the color-coded values:
            
        -   WildFire analysis report.
            
        
    5.  Review if the hash has been added to:
        
        -   Allow List or Block List.
            
        -   Quarantined, select the number of endpoints to open the Quarantine Details view.
            
        
    6.  Review the recent open cases that contain the hash as part of the case's Key Artifacts according to the Last Updated timestamp. To dive deeper into specific cases, select the Case ID.
        
3.  In the right hand view, use the filter criteria to refine the scope of the IP address information that you want to visualize.
    
    Filter criteria
    
    | Filter | Description |
    | --- | --- |
    | Event Type | Main set of values that you want to display. The values depend on the selected type of process or file. |
    | Primary | Set of values that you want to apply as the primary set of aggregations. Values depend on the selected Event Type. |
    | Secondary | Set of values that you want to apply as the secondary set of aggregations. |
    | Showing | Number of Primary and Secondary aggregated values to display. |
    | Timeframe | Time period over which to display your defined set of values. |
    
4.  Review the selected data.
    
    To view the most recent processes executed by the hash, select Recent Process Executions. To run a query on the hash, select Search all Process Executions.
    
5.  (Optional) Perform actions on the hash.

#### Investigate a user

Investigate user assets associated with your cases.

Drill down on a user in the User Risk View or the User View. In this view Cortex Cloud aggregates all of the data collected for a user, displays the information in graphs and tables, and provides further drilldown options for easy investigation. Cortex Cloud uses Identity Analytics to aggregate information on a user and displays insights about the user.

**Notice:**

If the Identity Threat module is enabled, you can open the User Risk View. This view displays insights and profiling information to help you investigate issues and cases. Viewing anomalies in the context of baseline behavior facilitates risk assessment and shortens the time you require for making verdicts.

If the Identity Threat module is _not_ enabled you can open the User View. This view displays an overview of the user and information about the user's score and activity.

You can take the following actions to investigate a user:

-   Assess the user's behavior and score.
    
-   Star the user to be included in the watchlist.
    
-   (User Risk View only) Review the user's working hours and related issues.
    
-   (User Risk View only) Analyze the user's behavior over time and compare it to their peers with the same asset role.
    

How to investigate a user

1.  Right-click a user name and select Open User Risk View or Open User Card.
    
    **Tip:**
    
    You can also see a list of all users under Inventory → Assets → Asset Scores.
    
2.  Select the timeframe to view the user's details.
    
    **Note:**
    
    Cortex Cloud normalizes and displays case and issue times in your time zone. If you're in a half-hour time zone, the activity in the Issues & Insights Heatmap is displayed in the whole-hour time slot preceding it. For example, if you're in a UTC +4.5 time zone, the time displayed for the activity will be UTC +4.5, however, the visualization in the Issues & Insights Heatmap will be in the UTC +4 slot.
    
3.  Investigate the user.
    
    User Risk view
    
    **Notice:**
    
    The User Risk view is available with the ITDR add-on. Depending on your permissions, some information may be limited by your scope.
    
    The User Risk view provides a centralized and interactive overview of user identity activities and risk scores, enabling you to investigate user events across core identity data sources. It enables you to identify and prioritize high-risk users quickly, gives you immediate context for identity-related risks, helps prevent missed indicators of compromise, and accelerates triage by offering proactive mitigation strategies.
    
    Customize the User Risk view for your use case by dragging and dropping each widget to position it where you want in the layout. You can also collapse the widgets to hide or show content as needed.
    
    ###### User identity and risk score
    
    The user identity and risk score at the top provide an at-a-glance summary of the user's identity and risk posture. The user risk score displays the score assigned on the last day of the selected time frame and the change in the score for the selected time frame. The score is updated continuously as new issues are associated with cases.
    
    Click the user to view more information about them in a panel that opens on the right. You can see the user's title, department, primary location and endpoint, when the user was created in the organization and when their last activity took place. You can also see their tags and the highlighted tags.
    
    The highlight widgets under the username provide an overview of the user's risk posture. They change according to the selected tab, Risk Assessment or Activities. The elements in the widgets are clickable and filter the information displayed in the tabs.
    
    ###### Risk Assessment
    
    Investigate user risk changes in detail.
    
    -   **Highlights**
        
        -   Case Breakdown: Open cases withing the selected timeframe, with a breakdown of how many cases were opened within each risk severity. Click the different severities to filter the rest of the page to display only the information relevant to that severity level.
            
        -   Mitre Att&ck Overview: Mitre Att&ck tactics and techniques detected for the user.
            
        
    -   **Main section**
        
        -   User Risk Score Trend: The graph is based on new cases created within the selected time frame, and updates on past cases that are still active. The straight line represents the user score, which is based on the scores of the cases associated with the user.
            
            The bubbles in the graph represent the number of issues and insights generated on the selected day. Bigger bubbles indicate more issues and insights, and a possible risk.
            
            Drill down on a score for a specific day by clicking a bubble. Alternatively, review the user information for the selected timeframe (Last 7D, 30D, or custom timeframe).
            
            For users with associated asset roles, compare the data with other peers with the same asset role. In the Risk Score Trend graph click Compare To and select an asset role to which you want to compare the data.
            
            The dashed line presents the average score for peers with the same asset role as the user, over the same time period. Hover over a bubble on the dashed line to see the Average score for the selected peer and a breakdown of the score per endpoint. Click Show _x_ Users to see a full breakdown of the score on the Peer Score Breakdown, filtered by the selected asset role. From the Peer Score Breakdown, you can select any user name and pivot to additional views for further investigation.
            
        -   User Cases: Related cases triggered for the user for the selected timeframe or severity selected in the Case Breakdown widget. If you are drilling down on a score, you can see the cases that contributed to the total score on the selected day. Review the following data:
            
            -   The Status column provides visibility into the reason for the score change. For example, if a case is resolved, its score will decrease, bringing down the user score.
                
            
        -   Issues & Insights: All detection activities associated with the user. The issues are grouped into buckets according to MITRE ATT&CK tactics. Click on a tactic to filter the issues in the table. To further investigate an issue, click the issue to open the Issue Panel and click Investigate.
            
        -   Mitre Att&ck Matrix Breakdown: Detailed information about the Mitre Att&amp;ck tactics and techniques detected. Click Open Mitre Triage to remediate the threat.
            
        
    
    ###### Activities
    
    Investigate user activities in detail.
    
    -   **Highlights**
        
        -   Common User Locations: A breakdown of the countries from which the user connected in the past few weeks.
            
        -   Common Operating Systems: A breakdown of the operating systems that the user used to connect in the past few weeks.
            
        -   Failed Logins: Details about failed login attempts by this user.
            
        
    -   **Main section**
        
        -   Activity Timeline: Consolidated timeline view aggregating the activities of the user from different sources like Auth, Cloud, Endpoint into a single chronological stream. Displays the volume and type of activities over the selected time period.
            
            The interactive graph visualizes the volume and type of activities over the selected time period. Each bar represents a unit of time, for example hour or day. Click a specific bar to filter the Activity Timeline list to show events only from that time frame.
            
            The list provides a detailed, chronologically ordered timeline of individual events. Each event includes its timestamp, description, event type, and data source icon.
            
        -   Issues & Insights Heatmap: Grid visualizing the volume and density of user activity across specific times of the day and days of the week. It aggregates events to show when a user is most active versus when they are inactive.
            
            The widget compares the user's actual activity data with their regular activity hours and highlights any differences or anomalies in the user's expected activity.
            
            The cells are marked according to the activity that took place, and a dashed frame indicates that Cortex Cloud detected uncommon activity in the time slot.
            
            -   A dashed ribbon highlights discrepancies between regular activity hours and actual activity.
                
            -   A colored ribbon indicates the level of activity on a specific day/hour.
                
            -   A numbered ribbon indicates the number of issues and insights that occurred on a specific day/hour.
                
            
        -   Login Attempts: Details of the user's login attempts and whether the attempts were successful. To further investigate login activity for the user, click View In XQL to link to a prefilled query in the Query Builder. Using Cortex Query Language you can create queries to refine your search.
            
        -   Authentication Attempts: User's latest authentication attempts during the selected timeframe. You can see details of the related authentication attempts, and whether the attempts were successful. To further investigate authentication attempts by the user, click View In XQL to link to a prefilled query in the Query Builder. Using Cortex Query Language you can create queries to refine your search.
            
        -   SaaS Logs: User's SAAS Log activity during the selected timeframe or on the day selected in the Score Trend graph. You can see details of the SaaS logs that were ingested into the platform in the context of the user.
            
            To further investigate SaaS log activity for the user, click View In XQL to link to a prefilled query in the Query Builder. Using Cortex Query Language you can refine your search.
            
        
    
    User View
    
    Review the sections of the User View. Depending on your permissions, some information might be limited by your scope.
    
    1.  In the left panel, review the overview of the user. The displayed information is aggregated by Cortex Cloudfrom cases, Workday, and Active Directory data.
        
        The User Score displays the score that is currently assigned to the user and is updated continuously as new issues are associated with cases.
        
    2.  Review the Score Trend graph.
        
        The graph is based on new cases created within the selected time frame, and updates on past cases that are still active. The straight line represents the user score, which is based on the scores of the cases associated with the user.
        
        Select a score to display in the Cases table, the cases that contributed to the total user score on a specific day.
        
    3.  Click a score to drill down on the score for a specific day. Alternatively, review the user information for the selected timeframe (Last 7D, 30D, or custom timeframe).
        
        The widgets in the right panel reflect the selected timeframe.
        
    4.  Review the Related Cases for the selected timeframe or score selected in the Score Trend graph. If you are drilling down on a score, you can see the cases that contributed to the total score on the selected day. Review the following data:
        
        -   The Status column provides visibility into the reason for the score change. For example, if a case is resolved, its score will decrease, bringing down the host score.
            
        -   The Points column displays the risk score that the case contributed to the host score. The points are calculated according to SmartScore or Case Scoring Rules.
            
        
    5.  Review the following additional widgets:
        
        -   User Associated Insights
            
        -   Top 5 Hosts Logged Into
            
        -   Top 5 Authentication Target Hosts
            
        -   Top 5 Authentication Source Hosts
            
        -   Recent Login
            
        -   Recent Authentications

### Cortex Assistant

Cortex Assistant is designed to streamline processes by simplifying case triaging, investigation, and remediation. It enables you to seamlessly uncover new insights on hashes, hosts, and more. You can get tailored suggestions, and run actions in natural language from anywhere without losing context.

Cortex Assistant is an innovative tool specifically developed to streamline various processes, including case triaging, investigation, and remediation. By utilizing Cortex Assistant, you can uncover valuable insights on a wide range of entities such as hashes, hosts, and more. Its primary objective is to simplify these tasks, allowing for a more efficient workflow and enhanced productivity.

**Note:**

If you are in an eligible region and have enabled the Cortex Agentic Assistant, the Cortex Agentic Assistant replaces the Cortex Assistant. The Cortex Assistant is available if you do not have access to the Cortex Agentic Assistant based on the tenant region or you have not enabled it. For more information, see Cortex Agentic Assistant.

One of the key features of Cortex Assistant is its ability to provide personalized suggestions based on your specific needs and context. This helps you find the most relevant information and solutions quickly and effortlessly.

Cortex Assistant allows users to execute commands using natural language from anywhere within the interface. This means that users can interact with the tool seamlessly, without losing their train of thought or context.

#### Access Cortex Assistant

Cortex Assistant is conveniently accessible from the main menu in the left pane, ensuring easy navigation and usage. Alternatively, you can right-click on specific entities, such as an asset name or IP address, and select Open in Cortex Assistant to immediately open the Cortex Assistant with a focus on that entity.

To increase usability, you can create a personalized keyboard shortcut: Settings → Configurations → Server Settings → Keyboard Shortcuts and choose the shortcut you want to use. You can use this shortcut anytime, from anywhere within Cortex Cloud, to instantly open Cortex Assistant. If you highlight an entity and open Cortex Assistant with the keyboard shortcut, it will open with a focus on that entity.

#### What can Cortex Assistant do for you?

-   Perform investigations of entities such as cases, hashes, hosts, domains, IP addresses, and users, using advanced XQL queries and activate tailored responses.
    
-   Use Cortex Assistant as a navigation tool to search for information, perform common investigation tasks, or initiate response actions.
    

#### Responsible AI

Cortex Assistant is developed in accordance with responsible AI principles. Customer data is not used to train the AI models, and your data is private and secure. For added security, user prompts are processed within the tenant's region. Safety and security measures include user confirmation for write actions and adherence to RBAC permissions. At the same time, explainability is maintained by providing the logic behind answers and offering a feedback option for user opinions.

#### Cortex Assistant layout

Understand the main components in Cortex Assistant: search bar, insights and suggestions, action log, and feedback.

Cortex Assistant consists of the following primary components:

##### Search bar

The search bar is located at the top of the Cortex Assistant screen. This is where you interact with Cortex Assistant, providing a centralized location to access assistance, obtain insights, and navigate the platform efficiently.

##### Insights and suggestions

You can find Cortex Assistant's responses to your queries in the insights and suggestions area. The insights section includes all the important information Cortex Assistant can provide in response to your query.

Below that, Cortex Assistant offers suggestions, which are divided into three columns, each with specific functionalities:

-   Investigate: Choose from the recommended relevant questions you can ask to further your investigation. Responses leverage advanced XQL queries.
    
-   Respond: Take action by running recommended playbooks or scripts, enabling you to initiate response actions based on Cortex Assistant's suggestions.

#### Cortex Assistant capabilities

Understand Cortex Assistant's capabilities and how to use them.

##### Entity investigation

The Cortex Assistant conducts investigations on entities entered in the search bar. It can investigate a range of entities, including hosts, users, hashes, domains, IP addresses, and cases. To initiate an investigation, enter the entity name in the search bar or ask specific questions about the entity, such as "What are the events related to <entity>?". You can then select from the relevant options displayed in the Investigate column, which includes a comprehensive set of Cortex XQL library queries for conducting investigations. A summary of the entity's details is displayed. For more details, click Show me more.

**Note:**

In some cases, if the prompt does not include at least one recognizable entity such as an IP, hash, user, asset, domain, case, or XQL query, no response is returned.

##### Respond

After entering an entity in the Cortex Assistant search bar, you have the option to take action by selecting one of the suggestions listed in the Respond column. These suggestions encompass a variety of actions, such as running playbooks and scripts, performing scans, and collecting support files.

**Note:**

When you choose an option from the Respond column, Cortex Assistant will always prompt you to approve the action before executing.

##### RBAC

Cortex Assistant uses Cortex’s role-based access control (RBAC) to control the type of access and actions a user can perform in Cortex Cloud. Suggestions and responses offered by Cortex Assistant will be customized according to that specific user’s RBAC access. A user with Admin rights can manage user roles that are assigned to Cortex Cloud users or user groups in Cortex Cloud by selecting Settings → Configurations → Access Management.

For more information on user roles and groups, see Manage user roles and access management.

##### Navigation mode

Use Cortex Assistant to navigate in Cortex Cloud. You can search in navigation mode by entering a forward slash “/” in the search bar, followed by your search string. For example, typing `/issues` searches for all pages that include the term "issues" and allows you to navigate to them directly.

Additionally, you can enter multiple search terms, and Cortex Assistant will search for pages that include either of the terms (as if there were a logical OR between the words).

### Automation
Automation leverages playbooks and Quick Actions to execute predefined workflows, use context data to make informed decisions, and interact with lists to store and retrieve information as needed during the automation process.

#### Automation in Cortex Cloud

Automate response to issues, using playbooks and Quick Actions, triggered automatically by automation rules or manually from an issue.

Automation enables you to improve efficiency and response times by performing actions on one or more issues, either automatically in response to predetermined conditions or manually triggered during your investigation workflow. In Cortex Cloud, you can use playbooks, scripts, commands, and Quick Actions to streamline operations, accelerate triage, and boost productivity.

The Automation Insights dashboard provides a high level overview of your automations.

-   **Playbooks**
    
    Playbooks enable you to organize and document security monitoring, orchestration, and response activities. Playbooks are self-contained, fully documented prescriptive procedures that query, analyze, and take action based on the gathered results.
    
    Playbooks are built from regular tasks, quick actions, and sub-playbooks. Playbook tasks can run out-of-the-box or custom scripts and integrations to communicate with third-party systems. You can use out-of-the-box playbooks as is, or customize them according to your requirements. You can also reuse individual playbook tasks as building blocks for new playbooks, saving time and streamlining knowledge retention.
    
    Playbooks can run automatically on issues based on automation rules or manually on one or more issues.
    
    **Note:**
    
    You can build end-to-end automation workflows from within the playbook editor, including creating automation rules, configuring integration instances, and creating and editing tasks. For more information, see Playbooks.
    
-   **Scripts and commands**
    
    Cortex Cloud includes built-in commands, as well as commands and scripts from the core content packs. In addition, when you adopt playbooks, any necessary scripts and integrations for the playbook are automatically downloaded. You can also write your own scripts or edit existing scripts.
    
    Scripts and commands can be used in playbook tasks or run manually from the War Room.
    
-   **Quick Actions**
    
    Quick actions are single commands that enable you to respond rapidly without requiring complex playbooks.
    
    Quick Actions can be included within playbooks, run automatically on issues based on automation rules, or run manually on one or more issues.
    

##### Automation rules

Automation rules enable you to run playbooks or Quick Actions automatically on issues, based on preset criteria. Automation rules follow a WHEN / IF / THEN structure. For example, WHEN an issue is created, IF the severity is critical, THEN set the case assignee to a specific analyst. For more information, see Create an automation rule.

##### Manually trigger automation

Playbooks and Quick Actions can also be run on demand. For more information, see Run an automation on an issue.Run an automation on an issue

#### Quick Actions
Quick Actions are preset single commands that enable you to automate basic tasks such as creating tickets in third-party systems, sending Slack messages, and changing issue severity.

You can create quick actions using the following:

-   **Automation rules**: You can create predefined rules to run Quick Actions as issues are created. For more information, see Create an automation rule
    
-   **Playbooks**: You can use Quick Actions as tasks within playbooks.
    

When investigating an issue, in the Issues table, you can right-click to Run an Automation on one or more issues. For more information, see Run an automation on an issue.Run an automation on an issue

By default, Quick Actions run using all available integration instances that contain the command. When selecting a Quick Action to run on an issue or to use for an automation rule, you can also choose one specific integration instance.

When you run an automation from the Issues table, in some cases the system provides recommended Quick Actions, based on the context. Quick Actions may also be provided in Recommended Automation Rules.

**Note:**

Quick Actions appear as War Room entries, but do not appear in the Work Plan.

##### Access attributes in the Unified Asset Inventory

Quick Actions can automatically populate parameters such as region, account id, and tags, based on asset data. When a Quick Action is triggered manually by a user or automatically through an automation rule, it can reference UIA attributes for the relevant asset(s) in the issue context and use those attributes as input. The issue must contain the relevant `Asset ID`.

The syntax to reference attributes in the UAI is `${asset.xdm.asset.attributename}`. To find the property path in the XDM data set, see the asset data card for the asset in the Inventory page. For example, to print the region for the asset, enter `!print value=${asset.xdm.asset.cloud.region}`. You can also run Quick Actions directly on the asset using `${asset.xdm.asset}`.

#### Automation Exclusion Center

Automation exclusion policies prevent commands and scripts from performing remediation on critical assets.

Automation exclusion policies enable you to protect critical assets from automated remediation, without having to detach and customize playbooks and scripts.

Automation exclusion policies prevent commands and scripts from performing automated remediation actions on critical assets, such as users, IP addresses, and domains. For example, a playbook task might block multiple domains, but mission-critical domains in the policy list would not be blocked.

Automation exclusion policies apply any time a relevant command or script runs, whether in a playbook task, a Quick Action, or the CLI. If you configure a policy to allow overrides, users can manually run the command in the War Room, using the `override-policy` parameter. Any command triggered with the `override-policy` parameter appears in the Management Audit Logs. If you attempt to use the `override-policy` parameter and the policy does not allow overrides, an error entry appears in the War Room.

When an automation exclusion policy prevents a command or script from a remediation action, the exclusion appears in the issue War Room.

When a playbook task contains a command or script that is included in an automation exclusion policy, a Policy tab appears in the task details pane, showing the relevant policy.

To enable an automation exclusion policy, add critical assets to a list. Each policy uses one or more lists to exclude assets from remediation. By default, all policies are enabled, but lists are empty until assets are added to the list.

**Note:**

By default, all users have read and edit permissions to lists. When creating a list of critical assets, we recommend limiting the read and edit permissions to specific roles.

User Hard Remediation and User Soft Remediation policies can also use asset groups, enabling automatic updates of critical assets without requiring you to edit a list. These remediation policies can contain lists, asset groups, or a combination of lists and asset groups.

Policies can be enabled or disabled, and lists can be edited, but you cannot add or remove policies.

Each policy can include one or more scripts or commands. Commands and scripts only appear if the content is installed. The policy affects only these scripts and commands. Scripts and commands cannot be added, edited, or removed from the policy.

By default, only admin users have access to the Automation Exclusion Center page. You can also provide other roles with View or View/Edit access to the Automation Exclusion Center. When creating or editing a role, the permission can be found under Investigation & Response → Automations.

Policies can be sorted, filtered, and searched using the category, status, policy, exclude, and description columns.

##### Manage automation exclusion policies

Automation exclusion policies prevent commands and scripts from performing remediation on critical assets. Edit lists of critical assets and enable/disable policies.

Automation exclusion policies prevent commands and scripts from performing automated remediation actions on critical assets, such as users, IP addresses, and domains. For example, a playbook task might block multiple domains, but mission-critical domains in the policy list would not be blocked.

Admin users and all roles with read/write permissions to the Automation Exclusion Center can edit, disable, and enable policies.

1.  Go to Settings → Configurations → Automation → Automation Exclusion Center.
    
2.  Right-click on a policy and choose Edit.
    
3.  From the Edit Policy page, you can do the following:
    
    -   Enable or disable the policy. Policies are enabled by default.
        
    -   Enable or disable policy overrides. If you enable policy overrides, users can manually run the commands and scripts on the excluded critical assets, using the `override-policy` parameter. Use of the `override-policy` parameter is included in the Management Audit Logs.
        
    -   Select one or more lists of excluded assets.
        
        Clicking the list icon opens a new browser tab for the Lists page, where you can create and edit lists.
        
        **Note:**
        
        For the IAM User Hard Remediation and User Soft Remediation policies, we recommend including username, email, and ID for each user you want to exclude. Example: `username1, user@example.com, userID112`.
        
        Each list can be filtered by conditions, such as `Equals`, `Ends with`, and `Doesn't include`. For example, you can exclude all email addresses with your company's domain using the `Ends with` filter.
        
    -   For IAM User Hard Remediation and User Soft Remediation policies, you can also select asset groups. These policies can include only lists, only asset groups, or a combination of asset groups and lists.
        
    -   Under THEN skip execution of the following commands and scripts, click to view the scripts and commands affected by the policy. Commands only appear if they are part of an active integration instance. You cannot edit the list of scripts and commands.
        
    
4.  Save your changes.
    

**Note:**

You can also right click on a policy from the main Automation Exclusion Center page to disable or enable the policy.

If you click on a list name in the Exclude column, that list opens in the Lists page.

#### Playbooks
Playbooks automate and standardize workflows, ensuring consistent and efficient incident response and management.

**Prerequisite:**

To provide playbook access, first set the Cases & Issues RBAC permission to View or View/Edit and then set the Playbooks permission to View or View/Edit.

To completely restrict playbook access, first set the Cases & Issues RBAC permission to None and then set the Playbooks permission to None.

##### Playbooks overview

Cortex Cloud playbooks enable you to structure and automate many of your security processes. Parse case information, interact with users, and remediate.

Playbooks are a series of tasks that run in a predefined flow to save time and improve the efficiency and results of the investigation and response process. They enable you to automate many security processes, including handling investigations and managing tickets. For example, a playbook task can parse the information in an issue, whether it is an email or a PDF attachment.

###### One-stop playbook development

Before you start building your playbook,  go to the Playbooks page and review the Org playbook list, which are playbooks that are currently used in your organization. On the Playbook Catalog page, you can find available out-of the-box playbooks that are not in use in your organization which you can adopt and use. If an existing playbook does not meet your use case, you can develop a playbook from scratch. Whether editing an existing playbook or creating a new one, you can manage the entire automation development flow in the playbook editor, including creating and editing tasks, configuring automation rules to trigger your playbooks, and setting up all relevant integrations.

###### Task Library

The Task Library in the playbook editor contains the following objects you can add to your playbook. For example, you can create new tasks from scripts, repurpose existing tasks, and use existing playbooks as sub-playbooks.

Playbook tasks display unique logos to more easily identify task type and origin, for example third-party integration commands, built-in scripts and tasks, and tasks requiring manual inputs.

| Task Library Object | Action | See More |
| --- | --- | --- |
| Quick Actions | Add single commands requiring minimal configuration. | See topic. |
| Commands & Scripts | Add commands and scripts from integrations that you install and configure instances for as needed. | See topic. |
| Playbooks | Add sub-playbooks to your playbook from your Org repository or from the Playbooks Catalog. | See topic. |
| AI Prompt | Add AI prompts with inputs and outputs that run automatically. | See topic. |
| Manual Tasks | Add tasks from playbooks in your Org repository. | See topic. |
| Header | Add section headers to organize your playbook. | See topic. |
| Blank Task | Create a new task from scratch. | See topic. |

###### Post-development playbook testing

After developing the playbook (including setting automation rules to trigger the playbook), run the debugger to initially test the playbook.

After verifying the playbook is triggered and runs properly with issues, it is ready to use in production.

You can see which playbook ran for an issue by going to Cases & Issues, selecting Issues and scrolling to the Playbook column. You can view or update the playbook by selecting an issue and clicking the Work Plan tab. Select another playbook to run from the dropdown list.

You can see which playbook ran in a case, if any, by going to Cases & Issues, selecting Cases and looking at the Automation section in the Overview tab for the case. You can view or update the playbook by going to the Issues & Insights tab, selecting an issue, and then clicking the Work Plan tab. In the Work Plan, you can select another playbook to run from the dropdown list.

For more information, see Investigate cases.Investigate cases

##### Playbook development checklist

Follow the playbook development flow to create playbooks that structure and automate many of your security processes.

The playbook development checklist follows the logical flow for developing a playbook.

We recommend that you review the following steps to successfully implement your playbook.

| Step | Details | See More |
| --- | --- | --- |
| Step 1. Plan your playbook | During the initial planning stage when designing your use case, start defining the playbook flow. Consider the process you want to automate and the steps and the decisions during the process. These steps and decisions become the playbook tasks. | See topic |
| Step 2. Build your playbook | Consider whether to use a playbook out-of-the-box, customize an existing playbook, or create a new playbook from scratch. Create playbook tasks, inputs, and outputs. Maintain playbook versioning to keep track of playbook development history. | See topic |
| Step 3. Customize your playbook | Fine tune your playbook for your needs, including extracting indicators, extending context, and adding issue fields to the system. | See topic |
| Step 4. Test your playbook | Debug errors in your playbook. Use playbook metadata to troubleshoot playbook performance. | See topic |

##### Plan your playbook

Considerations when planning your playbook.

When defining the workflow of your playbook, consider the following:

-   What processes do you need to automate?
    
-   Are there any decisions that require manual intervention?
    
-   Are there any time-sensitive aspects to the playbook?
    
-   When is the case considered remediated?

##### Manage playbooks

Navigate the Playbooks page.

The Playbooks page is organized to help easily access and utilize playbooks specific to your use cases. It contains two main sections, key playbook details on the top and a table listing all the playbooks in your Org repository on the bottom.

###### Playbook status

Playbook statuses enable tracking the progress of automation tasks and identifying any issues or delays. If needed, you can then take corrective actions to ensure smooth workflow execution and operational efficiency. The status includes how many playbooks:

-   Are in your Org repository
    
-   Are enabled
    
-   Are active
    
-   Are using an automation rule
    
-   Are used as sub-playbooks
    
-   Ran in the past week
    

###### The Org repository table

The playbooks listed in the Org repository table have been either adopted by or built by your organization. The table shows high level details about the playbooks, including:

-   Playbook name
    
-   Description
    
-   Status
    
-   Source
    
-   Enabled and disabled automation rules associated with the playbook
    
-   How many playbooks it serves as a sub-playbook in
    
-   Last updated
    
-   Updated by
    
-   The content pack the playbook is a part of
    
-   Playbook tags
    

When you right-click a specific playbook, you can choose to open it in the editor, duplicate, disable, download, or remove it.

Playbooks in your Org Playbooks can be triggered to run by automation rules or can be manually run on one or more issues.

Playbooks that you adopted are part of content packs. When a playbook is adopted, the content pack for that playbook is downloaded and appears in Marketplace. If you remove a playbook from your Org Playbooks, the content pack remains installed, but the playbook is no longer available for automation rules or manual runs.

###### Playbook Catalog

The Playbook Catalog contains all the playbooks available in Marketplace, organized by cards. You can search for a playbook, and the system also recommends playbooks based on name, tag, or description.

Clicking a card provides a preview of the playbook. If it is relevant for your use case, click Adopt this playbook to bring it into your Org repository and make it available to run.

**Note:**

-   The library by default shows only playbooks that are not adopted. Click the Show Adopted checkbox to show the adopted playbooks, indicated by an Adopted mark.
    
-   The library shows the most updated playbook version. Adopting an older version than shown should be done through Marketplace.
    
-   Adopting a playbook does not make it run. Some content packs include recommended automation rules. When you configure automation rules, you can view the recommendations. See Create an automation rule.

##### Build your playbook

Use an out-of-the-box playbook, customize an existing playbook, or create a new playbook based on your organization's needs.

Depending on your use case, you can use or customize a system playbook or develop a new playbook from scratch.

Developing a new playbook from scratch enables a tailored solution for your use case, whereas customizing a system playbook can save time, reduce complexity, and be a more efficient way to meet your organization's specific security and issue response needs.

Follow these steps to build a playbook.

| Task | Description | See More |
| --- | --- | --- |
| Task 1. Choose from existing playbooks or create your own | Search for an out-of-the-box playbook to use, customize it, or create one based on your use case. | See topic. |
| Task 2. Configure playbook settings | Define playbook settings, such as playbook triggers, inputs and outputs, and general settings. | See topic. |
| Task 3. Add objects from the Task Library | The Task Library contains Quick Actions, scripts, sub-playbooks, and tasks that enable you to communicate with end users, set conditions, and store relevant data. | See topic. |
| Task 4. Add custom playbook features | Customize your playbook, including adding scripts and sub-playbook loops, filtering and transforming data, extracting indicators, extending context, creating issue fields, and polling. | See topic. |
| Task 5. Test and debug the playbook | Set breakpoints, conditional breakpoints, skip tasks, and input and output overrides in the playbook debugger. | See topic. |
| Task 6. Manage playbook content | Save versions of your playbook in Cortex Cloud. | See topic. |

###### Task 1. Choose from existing playbooks or create your own

Use an existing playbook from your Org repository or search for a playbook in the Playbook Catalog. Customize an existing playbook, or create a new playbook based on your use case.

Go to the Investigation & Response → Automation → Playbooks page to find an existing playbook, customize it, or create a playbook.

Find an existing playbook

Playbooks in your Org Repository have already been adopted by your organization and are available to run. The Playbook Catalog contains all available playbooks in Marketplace that you can adopt into your Org Repository. You can preview before adopting.

1.  View the list of playbooks on the main Playbooks page in the Org Repository table. You can also search for a playbook that exists in the Org Repository by clicking Add Filter.
    
    Use free text in the search box, entering part or all of the playbooks' names or description. You can also search for an exact match of the playbook name by putting quotation marks around the search text. For example, searching for **`"Block Account - Generic"`** returns the playbook with that name.
    
    Search for more than one exact match by including the logical operator "or" in-between your search texts in quotation marks. For example, searching for **`"Block Account - Generic" or "NGFW Scan"`** returns the two playbooks with those names. Wildcards are not supported in free text search.
    
    **Tip:**
    
    If there are additional relevant playbooks in Marketplace that are not in your Org repository, you can click Explore them now to see them in the Playbook Catalog and choose to adopt.
    
2.  Click Playbook Catalog to browse all available playbooks in Marketplace that you can adopt. Click Playbook Library to go back to the main Playbooks page.
    
    1.  Click a playbook card for a preview of the playbook.
        
    2.  Click Adopt this playbook to add the playbook to your Org repository.
        
        A confirmation message displays when the playbook is successfully added.
        
    3.  Click View in Org Playbooks to select the adopted playbook from the Org repository table.
        
    

You can use the playbook as-is, or customize it as needed.

Edit a playbook

From the list of playbooks in your Org repository, right-click the playbook you want to edit and select Open in Editor. You can also duplicate, disable, download, or delete the playbook.

When you adopt a playbook, it is locked and you can only make limited changes to the playbook settings from the Playbook Starts task.

When you adopt a playbook, tasks and sub-playbooks that require configuration appear with an red triangle and an exclamation mark, enabling you to locate and configure all necessary components.

**Note:**

When a task inside of a sub-playbook is not configured, the alert is propagated to the main playbook. If multiple sub-playbooks are nested, and any of the sub-playbooks have non-configured components, the alert appears in the main playbook as well as in the sub-playbooks. Alerts also appear for the individual non-configured tasks within the sub-playbooks.

To reduce visual noise, you can dismiss certain alerts for unnecessary non-configured components such as sub-playbooks, scripts, and commands. You can dismiss an alert only if leaving the component in its non-configured state will not lead to a playbook error. For example, if the task must execute for the playbook to proceed, you cannot dismiss the alert.

When you click on the red triangle, you have the option to Dismiss Alert. After an alert is dismissed, the triangle is grey. Clicking on the grey triangle gives you the option to Mark as alert and revert to the red triangle. Alerts can be dismissed in both system and custom playbooks, and you do not need to duplicate a system playbook to dismiss an alert.

For full editing capabilities, right-click and select Open in Editor or Duplicate, which creates a copy of the playbook to edit, for example for a system playbook.

You can then configure the playbook settings or add quick actions, scripts, AI prompts, sub-playbooks, or tasks from the Task Library.

**Tip:**

-   To open multiple playbooks at the same time, edit the first playbook and then click New next to the playbook name to create a new tab. You can either create a new playbook, or add an existing one.
    
-   You can view recently modified or deleted playbooks by clicking version history for all playbooks .
    

Create a playbook

1.  In the Playbooks page, click \+ Build New Playbook.
    
2.  In the Create new pop up, enter a name, description, and tags for the playbook and click Save.
    
    A blank playbook opens in the playbook editor. You can then configure the playbook settings or add quick actions, AI prompts, scripts, sub-playbooks, or tasks from the Task Library.
    

###### Collapse and expand playbook sections

You can easily navigate playbooks and focus on the parts you need to work on by collapsing and expanding playbook sections. Collapsing sections provides a condensed view of the playbook flow, reducing visual clutter and enabling quick access to specific sections. Expanding sections allows you to view or edit specific parts of a playbook while keeping the rest of the playbook compact and maintaining focus on the relevant playbook details. You can also hover over a section header to highlight all tasks under the section and easily identify the section scope.

To collapse and expand a section, in the Playbooks page, after selecting a playbook from the library or creating a new playbook and adding tasks, click  on a section header.

When you collapse a section, you can see the number of tasks included under the section. For example:

Click  to collapse or expand the entire playbook.

  Show me more

###### Task 2. Configure playbook settings

Define playbook triggers, inputs and outputs, and general settings when you customize or create a new playbook.

After selecting the playbook you want to edit or after creating a new playbook, configure playbook settings as relevant, including:

-   Triggers: Define the condition applied to a specific issue that will trigger the playbook to run. Leave these settings empty to use the playbook as a sub-playbook or to only run the playbook manually.
    
    For more information, see Create an automation rule.
    
-   Inputs and outputs: Define and fill in input and output parameters required for the playbook to function correctly, grouping them as needed.
    
    Playbook input and output grouping
    
    Playbook input and output fields are collected into groups. This organizes the inputs and outputs, providing clarity and context to understand which inputs are relevant to which playbook flow.
    
    Playbook group permissions
    
    Users with permission to edit playbooks can add, edit, and delete groups and input and output fields. Users without this permission can only view groups, inputs, and outputs.
    
    Work with playbook input and output groups
    
    You can do the following with groups:
    
    -   Add or delete a group. Deleting a group deletes all the fields defined in the group.
        
    -   Change the name and/or description of the group.
        
    -   Change the order groups appear by dragging.
        
    -   Collapse and expand a group.
        
    
    Manage input or output fields within a group
    
    You can do the following with input or output fields within a group:
    
    -   Add, edit, or delete fields within a group. Input or output fields are always part of a group.
        
    -   Move fields between groups by dragging.
        
    -   Change field order within a group by dragging.
        
    
-   General settings: Define roles for edit access and whether to run the playbook in Quiet Mode. In Quiet Mode, playbook tasks do not save inputs and outputs or extract indicators. Tasks are not indexed, so you cannot search on the results of the specific tasks. All the information is still available in the context data, and errors and warnings are written to the War Room.
    

How to configure playbook settings

1.  In the playbook editor, click the settings wheel on the Playbook Starts task.
    
    The Playbook Settings pane opens, showing the playbook name, description and tags at the top. You can edit these fields by clicking the pencil icon.
    
    The pane opens with the Triggers tab on the bottom.
    
    **Note:**
    
    If the playbook has inputs and outputs, the Playbook Starts task will show back and forth arrows. Clicking them opens the Playbook Settings pane Inputs/Outputs tab.
    
    The playbook is by default Enabled. If the playbook is disabled, it will not run on an issue.
    
2.  In the Triggers tab, under Automation Rules, define the rule that will trigger the playbook.
    
    1.  Click Add a rule.
        
    2.  Set the name and description for the rule.
        
        The Status is by default enabled.
        
    3.  Define the condition and select the issue to apply the condition to that will trigger the playbook.
        
        To add rule conditions, in the Issues table use the filter to select a field and its value or right-click on a table cell to select that field and value.
        
        For example, to define a trigger condition for Malware issues with severity Critical, find a Malware issue with Critical severity in the Issues table, right click the cell in the Name column and select Show rows with 'Malware', and right click the cell in the Severity column and select Show rows with 'Critical'. This sets the filter for this condition.
        
    4.  Click Create.
        
    
    **Note:**
    
    This rule will trigger the playbook to run if no other Automation Rule triggers the playbook first. You can view and edit the order the rules run in the Automation Rules page.
    
    Playbooks lists any playbooks that use this playbook as a sub-playbook.
    
3.  In the Inputs/Outputs tab, add groups with input and output fields.
    
    Add a group
    
    1.  Click \+ Add Input Group or \+ Add Output Group.
        
    2.  Enter a group name and description and click the check mark.
        
    3.  Add fields to the group.
        
        **Note:**
        
        If you do not add any fields, the group will be deleted when you click Save.
        
    
    Add an input field in a group
    
    1.  Within a group, click \+ Add Input at the bottom of the list of input fields. You may need to scroll down to see it.
        
    2.  Enter the input field Name (required), Value, and Description.
        
    3.  When you are done adding fields, click Save.
        
    
    Add an output field in a group
    
    1.  Within a group, click \+ Add Output or \+ Add Manually at the bottom of the list of output fields. You may need to scroll down to see these options.
        
        -   If you click \+ Add Output, select from the outputs from previous tasks.
            
        -   If you click \+ Add Manually, enter the context path and description for the output.
            
        
    2.  When you are done adding fields, click Save.
        
    
4.  In the General tab, configure the following:
    
    -   Add roles for edit access to the playbook.
        
    -   Optionally select Quiet Mode for playbooks with a heavy data load that might adversely affect performance.
        
        In Quiet Mode, playbook tasks do not save inputs and outputs or extract indicators. Tasks are not indexed, so you cannot search on the results of the specific tasks. All the information is still available in the context data, and errors and warnings are written to the War Room.
        
        In the War Room (under the Case War Room tab for cases, and the War Room tab for issues) you can run the **!getInvPlaybookMetadata** command to analyze the size of playbook tasks in a specific issue Work Plan to determine whether to implement Quiet Mode for playbooks or tasks.

###### Task 3. Add objects from the Task Library

Using the Task Library, add Quick Actions, scripts and commands, sub-playbooks, and tasks to customize or create a new playbook.

The Task Library contains the following objects you can add to your playbook. For example, you can create new tasks from scripts, repurpose existing tasks, and use existing playbooks as sub-playbooks.

| Task Library Object | Action | Possible task types | See More |
| --- | --- | --- | --- |
| Quick Actions | Add a Quick Action to run a single command with minimal configuration required. Only predefined Quick Actions are available. | Standard task; Conditional task | See topic. |
| Commands & Scripts | Add commands and scripts from integrations that you configure instances for as needed. | Standard task; Conditional task | See topic. |
| Playbooks | Add sub-playbooks to your playbook from your Org repository or from the Playbooks Catalog. | Not relevant | See topic. |
| AI Prompts | Add tasks containing a natural language AI prompt with inputs and outputs that interact with the Cortex Cloud built-in LLM as part of your automation. | AI prompt | See topic. |
| Manual Tasks | Add tasks from playbooks in your Org repository. | Standard task; Conditional task; Data collection task; Section Header task | See topic. |
| Header | Add section headers to organize your playbook. | Section Header task | See topic. |
| Blank Task | Create a new task from scratch. | Standard task; Conditional task; Data collection task; Section Header task | See topic. |

###### Playbook task types

Playbooks have different task types for each action you want to take. When you add an object from the Task Library, you associate it with a task type in the Task Details pane.

The possible task types are:

| Task type | Description |
| --- | --- |
| Standard | Standard tasks can be configured to prompt for a response, such as prompting an analyst to verify the severity or classification of an issue before proceeding with automated actions. They can also be automated tasks such as parsing a file or enriching indicators. Automated tasks are based on scripts that exist in the system. These scripts can be created by you or come out-of-the-box as part of a content pack. For example, the **`!ad-get-user`** command retrieves detailed information about a user account using the Active Directory Query V2 integration. You can also automatically remediate an issue by interacting with a third-party integration, open tickets in a ticketing system such as Jira, or detonate a file using a sandbox. |
| Conditional | Conditional tasks validate conditions based on values or parameters and take appropriate direction in the playbook workflow, like a decision tree in a flow chart. For example, a conditional task may ask whether indicators are found. If yes, you can have a task to enrich them, and if not you can proceed to determine that the issue is not malicious. Alternatively, you can use conditional tasks to check if a certain integration is available and enabled in your system. If yes, you can use that integration to perform an action, and if not, you can continue on a different branch in the decision tree. Conditional tasks can also be used to communicate with users through a single question survey, the answer to which determines how a playbook will proceed. |
| Data Collection | Data collection tasks interact with users through a survey, for example to collect responses or escalate an issue. All responses are collected and recorded in the issue context data, from a single user or multiple users. You can use the survey questions and answers as input for subsequent playbook tasks. You can collect responses in custom fields, for example, a grid field. |
| AI Prompt | AI tasks use natural language prompts to interact with the Cortex Cloud built-in LLM. You provide the inputs and the LLM generates the outputs. AI tasks enable your playbook to perform complex analysis, generate reports, create emails, and generate responses dynamically. |
| Section Header | Use a section header task to group related tasks to organize and manage the flow of your playbook. For example, in a phishing playbook you would have a section for the investigative phase of the playbook such as indicator enrichment, and a section for communication tasks with the user who reported the phishing. You can easily navigate playbooks and focus on the parts you need to work on by collapsing and expanding playbook sections. Collapsing sections provides a condensed view of the playbook flow, reducing visual clutter and enabling quick access to specific sections. Expanding sections allows you to view or edit specific parts of a playbook while keeping the rest of the playbook compact and maintaining focus on the relevant playbook details. You can also hover over a section header to highlight all tasks under the section and easily identify the section scope. |

Playbook task icons

The different playbook tasks appear in the playbook editor with unique logos to more easily identify the task type and origin, for example third-party integration commands, built-in scripts and tasks, and tasks requiring manual inputs.

Playbook task icons in the playbook editor

| Task | Description |
| --- | --- |
|  | →**Standard manual task** An arrow with a light blue square background indicates a standard manual task. The following are kinds of standard tasks. Manual Standard task (no lightning bolt script logo): These tasks are used where usually it's not possible to automate them. You can add comments, assign them to an owner, and set a due date. The analyst who is responsible for the investigation needs to complete the task before the playbook can continue running. A user icon ( ) indicates the task requires manual inputs.; Automated Standard task (with lightning bolt script logo): A single command or script that is set to automatically run when the playbook execution reaches this step. Some scripts need arguments in order to run - make sure to set them up properly. If left empty, the analyst who is responsible for the investigation will need to complete them so the script will run and the playbook can continue its execution.; Automated Standard task (with Builtin logo): A single system command or script that is set to automatically run when the playbook execution reaches this step. Some scripts need arguments in order to run - make sure to set them up properly. If left empty, the analyst who is responsible for the investigation will need to complete them so the script will run and the playbook can continue its execution.; Automated Standard task (with Multi Command logo): A generic single command or script that can be used with multiple integrations is set to automatically run when the playbook reaches this step. Some scripts need arguments in order to run - make sure to set them up properly. If left empty, the analyst who is responsible for the investigation will need to complete them so the script will run and the playbook can continue its execution. |
|  | **Conditional task** A diamond icon in a purple square background indicates a conditional task used as a decision tree in your playbook. The following are kinds of conditional tasks. Manual conditional task. A user icon ( ) indicates the task requires manual input.; Automated conditional task (with the lightning bolt script logo).; Automated conditional task that uses a system script (with the Builtin logo). |
|  | **Data collection task / Communication task** The speech bubble in a turquoise background indicates a data collection task. This task prompts the receivers to respond to a multi-question form and submit replies, even if they are not Cortex users. A user icon ( ) indicates the task requires manual input. |
|  | **Sub-playbook task** The workflow icon in a blue background indicates that the task is a playbook nested within the parent playbook. You can view the playbook by opening the task and selecting Open sub-playbook. The red warning icon indicates the sub-playbook is not ready to use. Open it to review the errors. |
|  | **Task containing an error** Scripts or sub-playbooks that have errors are designated by a red triangle. You need to open the script or sub-playbook to review the errors. |
|  | **Task containing a deprecated script or needs to be updated** Scripts or sub-playbooks that have updates or are deprecated are designated by a yellow triangle. You need to update the scripts, integration commands, or sub-playbook tasks to their most current version. |
|  | **Set to skip** For the debugger, when a task is set to skip, the skip icon will be orange. |
|  | **Breakpoint** For the debugger, when the playbook reaches a breakpoint, the task has an orange line at the top to indicate the breakpoint. |
|  | **Overridden inputs or outputs** For the debugger, when a task is set to have overridden inputs or outputs, the word Input or Output appears in orange. |
|  | **Pending/in queue task** When the playbook starts to run, all tasks that are about to be performed are grayed out. |
|  | **Running/ in progress task** A spinning circle inside the gray square indicates a running/in progress task. |
|  | **Completed task** The green square indicates a completed task. |
|  | **Waiting task** The orange square indicates that the task is pending action. If you hover over the icon in the top left corner, details about the reason the task is in waiting mode appear. The user icon ( ) indicates the task requires you to open it and manually mark it as complete. A speech bubble icon () indicates the task is waiting for a questionnaire to be completed. |
|  | **Failed task** The red warning icon indicates that the automation failed to complete as expected and requires manual inspection and troubleshooting. Contact your Cortex Cloud administrator. If you hover on the icon in the top left corner, details about the specific problem appear. If a red warning icon is paired with the clock icon (), the task’s SLA is overdue. |
|  | **Skipped task** The task will look faded to indicate it was not executed. This can happen if this task was set to be skipped when an error occurs, or if it is in a branch that was not executed if a condition wasn’t met. |

###### Add Quick Actions, commands, and scripts

Using the Task Library, add Quick Actions, commands, and scripts.

Adding Quick Actions, commands, and scripts to playbooks enables automating repetitive tasks and executing custom actions to enhance efficiency and streamline workflow processes.

###### Add Quick Actions

Quick Actions are predefined commands that require minimal configuration and can be added to playbooks.

1.  From the Task Library pane, click Quick Actions.
    
2.  Hover over the Quick Action you want and drag it onto the playbook editor.
    
3.  In the Task Details pane, select the Task Type the script will be based on, either Standard Task or Conditional Task.
    
    -   Standard task: Use a Standard task when an analyst needs to run a Quick Action and then proceed in the playbook.
        
    -   Conditional task: Use a Conditional task to validate conditions based on values or parameters and take appropriate direction in the playbook workflow.
        
    
    **Note:**
    
    If the Quick Action requires an integration instance and it is not yet configured, you have the option to create an integration instance from within the playbook editor.
    
4.  Configure the Quick Action inputs.
    
    Each Quick Action has its own set of required and optional input arguments. You can set each argument to a specific value (by typing directly on the line under the argument name), or you can click the curly brackets to define a source field to populate the argument.
    
5.  Click OK.
    
6.  Connect the task you added by dragging and dropping a wire.
    

###### Add commands and scripts

**Note:**

If you want to add a script that is not yet adopted, Cortex Cloud automatically installs the content pack containing the script. If the script requires an integration instance, you are prompted to configure one.

1.  From the Task Library pane, click Commands & Scripts.
    
2.  Search for a specific script, or click an integration from the list.
    
    If you click an integration, it expands to show all the scripts it includes.
    
    **Tip:**
    
    If your needs require a custom script, use the Agentic Assistant with the Automation Engineer agent to leverage the Cortex AgentiX built-in LLM to quickly and efficiently generate functional Python scripts from natural language prompts. For more information, see Create a script.
    
3.  Hover over the script you want and drag it onto the playbook editor. The Task Details pane opens.
    
    A green check mark next to the script indicates the script is adopted and the integration instance containing the script is configured.
    
    You are notified if any relevant integration instances require updates. Once installed, you are prompted to configure integration instance settings.
    
4.  If the content pack containing the script you want is not installed, it will automatically install. You then configure an integration instance, if required, by clicking Create an instance now.
    
    If the script belongs to multiple content packs, select from a drop down list which one to install.
    
    If you add the script and it requires an integration instance, Cortex Cloud indicates you need to set up an integration to run the script.
    
5.  In the integration instance settings pane, enter values for the settings fields.
    
6.  Click Save & Exit for the integration instance.
    
7.  Select the Task Type the script will be based on, either Standard Task or Conditional Task.
    
    -   Standard task: Use a Standard task when you want to perform a manual or automated action as part of a workflow, for example, when an analyst needs to confirm information or escalate a case.
        
    -   Conditional task: Use a Conditional task to validate conditions based on values or parameters and take appropriate direction in the playbook workflow.
        
    
8.  Configure the script or command settings as follows.
    
    | Tab | Details |
    | --- | --- |
    | Inputs | Each script has its own set of input arguments (or none). You can set each argument to a specific value (by typing directly on the line under the argument name), or you can click the curly brackets to define a source field to populate the argument. \*\*Note:\*\* Commands you run in the War Room can automatically populate parameters such as region, account ID, and tags, based on asset data. Commands can reference UIA attributes for the relevant asset(s) in the issue context and use those attributes as input. The issue must contain the relevant `Asset ID`. The syntax to reference attributes in the UAI is `${asset.xdm.asset.attributename}`. To find the property path in the XDM data set, see the asset data card for the asset in the Inventory page. For example, to print the region for the asset, enter `!print value=${asset.xdm.asset.cloud.region}`. You can also run commands and scripts directly on the asset using `${asset.xdm.asset}`. |
    | Outputs | Each script has its own set of output arguments (or none). |
    | Mapping | Map the output from a playbook task directly to an issue field. The value for an output key populates the specified field per issue. This is a good alternative to using a task with the `setIssue` command. \*\*Note:\*\* The output value is dynamic and is derived from the context at the time that the task is processed. As a result, parallel tasks that are based on the same output may return inconsistent results. In the Mapping tab, click Add custom output mapping.; Under Outputs, select the context output to map to an issue field. Click the curly brackets to see a list of the output parameters available from the script.; Under Field to fill, select the field that you want to populate with the output.; Click Save. |
    | Advanced | Includes the following fields. Using: Choose which integration instance will execute the command, or leave empty to use all integration instances.; Extend context: Append the extracted results of the action to the context. For example, "newContextKey1=path1::newContextKey2=path2" returns "\\[path1:'aaa',path2: 'bbb', newContexKey1: 'aaa',newContextKey2:'bbb'\\]"; Ignore outputs: If set to true, will not store outputs into the context (besides the extended outputs).; Execution timeout (seconds): Sets the command execution timeout in seconds.; Indicator Extraction mode: Choose when to extract indicators:-   Use system default: This is the default setting.; None: Do not perform indicator extraction; Inline: Before other playbook tasks; Out of band: While other tasks are running
    ; Mark results as note; Run without a worker; Skip this branch if this script/playbook is unavailable; Quiet Mode: When in quiet mode, tasks do not display inputs and outputs or extract indicators. Errors and warnings are still documented. You can turn quiet mode on or off at the task or playbook level. |
    | Details | Includes the following fields. Tag the result with: Add a tag to the task result. You can use the tag to filter entries in the War Room.; Task description (Markdown supported): Provide a description of what this task does. You can enter objects from the context data in the description. For example, in a communication task, you can use the recipient’s email address. The value for the object is based on what appears in the context every time the task runs. |
    | On Error | Includes the following fields. Number of retries: How many times the task should retry running if there is an error. Default is 0.; Retry interval (seconds): How long to wait between retries. Default is 30 seconds. The maximum retry interval is 800 seconds (13.3 minutes). If you enter a value greater than 800 seconds, the retry interval will be limited to 800 seconds.; Error handling: How the task should behave if there is an error while running the script. Options are:-   Stop; Continue; Continue on error path(s) This option configures the task to handle potential errors that may occur when executing the current task's script. |
    
9.  Click OK.
    
10.  Connect the task you added by dragging and dropping a wire.

###### Add sub-playbooks

Using the Task Library, add sub-playbooks.

Sub-playbooks are playbooks that are nested under other playbooks. They appear as tasks in the parent playbook flow and are indicated by the sub-playbook icon . A sub-playbook can also be a parent playbook in a different use case.

Since sub-playbooks are building blocks that can be used in other playbooks and use cases, you should define generic inputs for them.

Inputs can be passed to sub-playbooks from the parent playbook, used and processed in the sub-playbook, and sent as output to the parent playbook.

1.  From the Task Library pane, click Playbooks.
    
2.  Find the relevant sub-playbook by either searching for a specific playbook by name in your Org repository from the Org Playbooks tab, or by adopting a playbook from the Playbooks catalog tab.
    
    You can sort alphabetically (ABC) or by Last Modified.
    
3.  Hover over the playbook you want and drag it onto the playbook editor.
    
    When you adopt a playbook from the Playbooks Catalog, installation may take some time.
    
    When you adopt a system playbook, it is locked and you can only make limited changes to the playbook settings from the Playbook Starts task. For full editing capabilities, click ⋮ and select either Duplicate (create a copy of the playbook to edit) or Edit Playbook (detach the playbook). A detached playbook does not receive updates in future content releases. If you reattach the playbook, the latest content updates will be applied and any edits you made will be overridden.
    
    1.  If after adopting a playbook you see a warning  indicating the sub-playbook is not ready to use, click the playbook to open its Task Details pane.
        
    2.  In the error message, click the Open it link to view the sub-playbook in a new tab in the playbook editor.
        
    3.  Scroll through the sub-playbook. If there is a task that requires integration setup, click the task to open the Task Details pane and click the Create an instance now link.
        
    4.  In the integration instance settings pane, enter values for the settings fields.
        
    5.  Click Save & Exit for the integration instance.
        
    
4.  Configure the sub-playbook.
    
    1.  In your main playbook editor, click the sub-playbook you added. The Task Details pane opens.
        
    2.  Click the Open sub-playbook link to open the sub-playbook in a new tab. You can then view and edit the tasks in the sub-playbook.
        
    3.  Click the curly brackets next to the sub-playbook name to select the data source for the sub-playbook.
        
    4.  Configure the sub-playbook settings from the following tabs.
        
        | Tab | Settings |
        | --- | --- |
        | Inputs | Any required input arguments for the sub-playbook. |
        | Outputs | Any outputs defined for the sub-playbook. |
        | Advanced | Skip this branch if this script/playbook is unavailable; Quiet Mode: Determines whether this task uses the playbook default setting for quiet mode. When in quiet mode, tasks do not display inputs and outputs or extract indicators. Errors and warnings are still documented. You can turn quiet mode on or off at the task or playbook level. |
        | Loop | Click one of the following options to define loop settings: None: (Default) The sub-playbook does not loop.;-   Built-in: Use built-in functions to define loop settings:
            
            | Option | Description |
            | --- | --- |
            | Exit when | Enables you to define when to exit the loop. Click {} and expand the source category. Hover over the required source and click **Filter & Transform** to the left of the source to manipulate the data. |
            | Equals (String) | Select the operator to define how the values should be evaluated. |
            | Max iterations | The number of times the loop should run. \*\*Tip:\*\* Balance between the number of iterations and the interval so you do not overload the server. |
            | Sleep | The number of seconds to wait between iterations. recommends that you balance between the number of iterations and the number of seconds to wait between iterations so you don't overload the server. |
            
        -   For each input: Runs the sub-playbook based on defined inputs. Enter the number of seconds to wait between iterations.
            
        -   Choose Loop automation: Select the automation from the drop-down list to define when to exit the loop. The parameters that appear are applicable to the selected automation.
            
        For more information, see Configure a sub-playbook loop.
        
         |
        | Details | Task description (Markdown supported): Displays a description for this playbook (if one exists). |
        
    
5.  Select whether the outputs of the sub-playbook are Shared globally or Private to sub-playbook (default).
    
6.  Click OK.
    
7.  Connect the sub-playbook you've added by dragging and dropping a wire.

###### Add AI prompt tasks

Using the Task Library, add AI prompt tasks to a playbook.

AI prompt tasks enable automated interaction with the Cortex Cloud built-in Large Language Model (LLM) as a single step in a playbook. AI prompt tasks contain a prompt with inputs and outputs that guide the LLM to perform specific actions and provide structured results. For example, you can use an AI prompt task to prompt the LLM to identify malware categories.

You can add the same AI prompt task more than once to a playbook, and each instance will have its settings saved locally to that specific task.

From the Task Library, you can choose system (built-in) AI prompt tasks that contain well-defined prompts for common use cases. You can duplicate and edit these tasks, or create a custom AI prompt task based on your needs.

Example 52. System AI prompt tasks in the Task Library

The following are examples of available system AI-based tasks.

| Task name | Inputs | Outputs | Prompt |
| --- | --- | --- | --- |
| IssueSummaryAndRemediation | issue The issue details which will be sent to the LLM for summarization. | llm.summary The LLM output summary. | IssueSummaryAndRemediation prompt You are an experienced Security Operations Center (SOC) analyst with a deep understanding of security alert analysis and remediation. Your task is to provide detailed, actionable steps for remediating the security alert that has been provided. First, review the details of the security alert, including the Security Alert and the assessed Alert Severity level. Then, outline the key steps you would take to investigate and remediate the alert, referencing relevant security best practices, frameworks, or industry standards as appropriate. Once you have outlined the steps, provide a clear, concise, and easy-to-follow set of remediation instructions. Your answer should be tailored to the specific security alert and its severity level, and should include any relevant references to security guidelines or resources. Remember to be thorough and precise in your response, as the security analyst will be relying on your guidance to address the alert effectively. General Scope and Instructions: 1. Only provide remediation steps for the alert. 2. Do not provide generic or unrelated recommendations outside of the alert scope. Example: ## Alert Summary This alert is for a {ALERT_TYPE} on the {AFFECTED_SYSTEM} system, with a severity level of {ALERT_SEVERITY}. ## Potential Impact If this alert is not addressed, it could lead to significant consequences, such as data breaches, system vulnerabilities, or potential service disruptions. ## Remediation Steps 1. [Step 1 remediation instruction] 2. [Step 2 remediation instruction] 3. [Step 3 remediation instruction] ## Recap Add a recap section. Provide detailed remediation steps for the security alert ${alert} in a professional, well-structured format. |
| MalwareReportSummary | report_id The report ID which will be sent to the LLM for summarization. | llm.summary The LLM output summary. | MalwareReportSummary prompt You are a highly specialized Malware Analyst, with deep expertise in analyzing and interpreting sandbox execution reports. Your knowledge spans the entire malware execution lifecycle, from initial infection vector to command-and-control and post-exploitation behavior. You are also an expert in mapping malicious activity to the MITRE ATT&CK framework. Your sole purpose is to analyze and summarize malware sandbox reports. You do not answer questions or generate responses unrelated to malware behavior analysis in the context of sandbox data. Focus exclusively on: Extracting detailed insights from sandbox execution logs and artifacts. Mapping observed behaviors to MITRE ATT&CK techniques. Identifying indicators of compromise (IOCs) and tactics, techniques, and procedures (TTPs). Only document IOCs with suspicious or malicious context, do not list IOCs for known or benign indicators. Describing the malware behavior across the whole kill chain. Recommending remediation actions and next steps for investigation. Analyze the following malware sandbox execution report and provide a comprehensive, structured analysis: Summarize the malware behavior across the entire attack kill chain (Initial Access → Execution → Persistence → Privilege Escalation → Defense Evasion → Credential Access → Discovery → Lateral Movement → Collection → Exfiltration → C2). Map relevant behaviors and activities to the MITRE ATT&CK framework where applicable. Highlight any notable techniques, unusual behaviors, or key insights from the malware execution. List any IOCs observed (domains, IPs, hashes, file paths, etc.). Provide remediation recommendations based on observed behavior. Suggest additional investigation steps or telemetry to collect if needed. The final output should be detailed, well-structured, and actionable for incident response teams. |
| VulnerabilityReportSummary | report_id The report ID which will be sent to the LLM for summarization. | llm.summary The LLM output summary. | VulnerabilityReportSummary prompt You are a vulnerability assessment analyst responsible for reviewing and analyzing vulnerability scan results provided in JSON format. Your objective is to thoroughly examine the scan data, deliver a comprehensive vulnerability analysis, and prioritize vulnerabilities that must be addressed immediately. General Instructions: 1. Only provide recommendations related to the data in the report. 2. Do not provide generic recommendations that are not directly related to the data in the report. Example: ### Steps for Analysis: Perform your assessment considering the following key criteria: 1. Criticality: - Consider vulnerability severity ratings (Critical, High, Medium, Low, Informational). - Evaluate CVSS base scores and severity definitions. 2. Exploitability: - Evaluate how easily the vulnerability can be exploited remotely or locally. - Analyze the complexity of exploitation, including the attack vector, required privileges, and user interaction. - Identify if active exploits or proof-of-concept exploits exist in the wild. 3. Environmental Factors: - Consider the importance of assets (e.g., business-critical servers, database hosts, publicly exposed systems). - Assess network accessibility of affected systems (internal vs. externally exposed systems). - Reflect on regulatory compliance requirements relevant to affected assets (e.g., PCI-DSS, HIPAA, GDPR). ### Deliverable: Provide your analysis in the following structured format: #### 1. Executive Summary: - Briefly summarize overall risk status based on scan results. #### 2. Detailed Vulnerability Analysis: For each vulnerability identified: - Plugin Name &amp; ID - CVE Identifier (if applicable) - Affected Asset(s) - Severity Rating &amp; CVSS Base Score - Exploitability Assessment: - Describe the likelihood and complexity of exploitation. - Reference if active exploits are known. - Environmental Impact: - Explain potential business impact based on asset role and exposure. - Highlight any compliance risks or regulatory impacts. #### 3. Prioritized Recommendations: - Provide a clearly ranked list (high-priority first) of vulnerabilities to remediate. - Include justification for prioritization based on criticality, exploitability, and environmental factors. - Suggest remediation actions for each vulnerability. ### Important Considerations: - Clearly justify each decision to ensure transparency. - Maintain concise yet informative language suitable for both technical and managerial audiences. - Emphasize vulnerabilities posing immediate and significant risk to the organization security posture. Please analyze the provided vulnerability scan results in detail. For each identified vulnerability: Describe the vulnerability clearly, including its type, affected service/component, and any relevant technical details. Assess severity based on industry-standard metrics (e.g., CVSS score or equivalent). Evaluate exploitability, noting whether known public exploits exist and how easily the vulnerability could be leveraged in practice. Recommend remediation or mitigation steps to address the issue (e.g., patching, configuration changes, compensating controls). Then, prioritize all vulnerabilities based on a combination of: 1. Exploitability (known exploits, attack complexity, likelihood of exploitation) 2. Severity (potential impact if exploited) 3. Exposure level (e.g., internet-facing systems, critical internal services) Provide a ranked list of vulnerabilities with a clear explanation of why each one should be prioritized. If applicable, highlight quick wins — high-risk vulnerabilities that can be easily fixed. |

  

###### Add system AI prompt tasks

System AI prompt tasks come with pre-defined prompts, inputs, and outputs that are non-editable and cannot be removed, you can only set the inputs with issue context or specific values. If you need to change a system task, you can duplicate it from the AI Prompts page and then edit the copy.

1.  From the Task Library pane, click AI Prompt.
    
2.  In the System tab, find the relevant built-in AI prompt task from the list.
    
    Use free text in the search box to find a prompt.
    
3.  Select the AI prompt task you want and drag the task onto the playbook editor.
    
    The Task Details pane opens, and the Task Type is automatically set to **`AI Task`**.
    
4.  Configure the relevant AI prompt task parameters.
    
    AI prompt task parameter tabs
    
    | Tab | Settings |
    | --- | --- |
    | Inputs | System AI prompt task input definitions (name, description, type) are fixed and non-editable. Includes the following fields. Prompt: The prompt that is passed to the LLM together with the inputs. System AI prompt task prompts are not editable. In the prompt, inputs are marked with **`${}`** as placeholders that will be filled with values. You can expand the prompt for better readability.; Extracted Inputs: Set the input values within the prompt. Input values can be set with either context path or a specific value.  Mandatory inputs are indicated with an asterisk. |
    | Outputs | AI prompt task outputs are fixed and non-editable. |
    | Advanced | Includes the following fields. Extend context: Append the extracted results of the action to the context. For example, "newContextKey1=path1::newContextKey2=path2" returns "\\[path1:'aaa',path2: 'bbb', newContexKey1: 'aaa',newContextKey2:'bbb'\\]"; Ignore outputs: If set to true, will not store outputs into the context (besides the extended outputs).; Execution timeout (seconds): Sets the command execution timeout in seconds.; Indicator Extraction mode: Choose when to extract indicators:-   Use system default: This is the default setting.; None: Do not perform indicator extraction; Inline: Before other playbook tasks; Out of band: While other tasks are running
    ; Mark results as note; Run without a worker; Skip this branch if this script/playbook is unavailable; Quiet Mode: When in quiet mode, tasks do not display inputs and outputs or extract indicators. Errors and warnings are still documented. You can turn quiet mode on or off at the task or playbook level. |
    | Details | Includes the following fields. Tag the result with: Add a tag to the task result. You can use the tag to filter entries in the War Room.; Task description (Markdown supported): Provide a description of what this task does. You can enter objects from the context data in the description. For example, in a communication task, you can use the recipient’s email address. The value for the object is based on what appears in the context every time the task runs. |
    | On Error | Includes the following fields. Number of retries: How many times the task should retry running if there is an error. Default is 0.; Retry interval (seconds): How long to wait between retries. Default is 30 seconds. The maximum retry interval is 800 seconds (13.3 minutes). If you enter a value greater than 800 seconds, the retry interval will be limited to 800 seconds. |
    
5.  Click OK.
    
6.  Connect the system AI prompt task you added by dragging and dropping a wire.
    
    If you need to perform different actions based on the AI prompt task results, add a conditional task immediately after the AI prompt task in the playbook.
    

###### Add custom AI prompt tasks

You can create or edit a custom AI prompt task or edit a duplicated system AI prompt.

1.  From the Task Library pane, click AI Prompt.
    
2.  In the System tab, select Local AI Prompt to create a new AI prompt task.
    
    Or in the Custom tab, search for an existing custom AI prompt tasks or select Local AI Prompt to create a new AI prompt task. If you want to use an existing custom AI prompt task, drag it onto the playbook editor.
    
    **Note:**
    
    Selecting Local AI Prompt creates a local version of the task within your playbook. Any future updates made to the Prompts Library will not sync to this specific task.
    
    Choose Local AI Prompt if you need to customize the logic for a specific workflow and want to ensure its behavior remains unchanged, even if the Prompts Library is updated with improvements such as refined prompt engineering, security patches, and model optimizations.
    
3.  In the Task Details pane, configure the AI prompt task.
    
    1.  Set the AI prompt task name.
        
        The AI prompt task name must start with a letter. Spaces and special characters are not supported.
        
    2.  Set the AI prompt task parameters.
        
        AI prompt task parameter tabs
        
        | Tab | Settings |
        | --- | --- |
        | Inputs | Expand this section to show the following fields: Prompt: Define a natural language prompt that will be passed to the LLM together with the inputs. Mark placeholders for inputs using square brackets [ ].; Extracted Inputs: The list of inputs defined within the prompt. The order you define the inputs in the prompt matches their appearance here. Inputs can be set with either context path or specific value. You can choose whether the input is a variable using ${<input name>}. Mandatory inputs are indicated with an asterisk. The Prompt Helper also provides a list of prompt tips, including: Be clear and specific Tell the AI exactly what you need. Imagine you're asking a new team member for help – the more precise you are, the better they can assist. The same goes for our AI! What to do: Instead of vague questions like "Tell me about malware," try to be very specific. Think about:-   The goal: What do you want to achieve? (for example, "Summarize," "Identify," "Explain," "Generate ideas"); The topic: What is the subject? (for example, "Phishing emails," "Vulnerability reports," "Security policies"); Any details: What specific information is important? (for example, "From last week's incidents," "For non-technical executives," "Highlighting critical threats")
        ; Examples:-   Bad prompt: "Tell me about that virus ${VirusName}."; Good prompt: "Analyze the attached malware report from ${Path} and summarize the key indicators of compromise (IOCs) for our incident response team."
        Provide context and background Give the AI the full picture. Our AI doesn't know everything about your specific situation. Giving it background information helps it understand the "why" behind your request. What to do: Include relevant details that help the AI understand the situation or your specific needs.-   Role: Tell the AI to act as a specific persona (for example, "Act as a security analyst," "You are a CISO," "As a technical writer"). This helps it tailor its language and focus.; Audience: Who is the information for? (for example, "For a technical audience," "For a board meeting," "For a general user"). This influences the complexity and depth of the response.; Key Information: What specific data points or previous steps are relevant? (for example, "Based on the recent network scan results," "Considering the new compliance regulations").
        ; Examples:-   Bad prompt: "Write a report."; Good prompt:"You are a cybersecurity consultant. Write a brief executive summary report for our CEO detailing the top three critical vulnerabilities identified in our recent penetration test report from ${Path} and suggest immediate actions."
        Ask for the desired format Guide the AI's output structure. If you have a specific way you want the information presented, tell the AI upfront. This saves you time on reformatting. What to do: Clearly state how you want the AI's response to be structured.-   Lists: "Provide a bulleted list of..." or "Give me 5 key points."; Tables: "Create a table with columns for [X], [Y], and [Z]."; Summaries/reports: "Generate a concise summary," "Draft a formal report," or "Write a brief email."; Length: "Keep it under 200 words," or "Provide a detailed analysis."
        ; Examples:-   Bad Prompt: "What are the latest threats?; "Good Prompt: "List the top 5 emerging cyber threats relevant to financial services, with a brief explanation for each, presented as a bulleted list."
        Few-shot prompting Use few-shot prompting when you need the AI prompt task to learn a new pattern or format quickly without extensive fine-tuning, especially for tasks with limited data. What to do: Provide several examples of the desired input and output to guide the AI's response.; Examples of good prompts: "You are a SOC analyst that needs to enrich CVE ${CVEId} , use the following structure:" Sample structures:-   CVE Description: Apache Struts 2.5.x before 2.5.14, 2.3.x before 2.3.34, and 2.x.x before 2.3.x.x.x.x allows remote attackers to execute arbitrary code via a crafted Content-Type header.; CVSS:9.8 (Critical)Impact: Remote Code Execution (RCE), potential for complete system compromise, data theft, and denial of service. Affects web applications built with Apache Struts, widely used in enterprise environments.; Risk Score: 10/10 - Extremely High. Exploitability is high due to public exploits and widespread usage of the affected software.; CVE Description: Microsoft Windows MSHTML Remote Code Execution Vulnerability. This vulnerability exists in the way MSHTML engine handles specially crafted files. An attacker could host a specially crafted website or send a specially crafted document that, when opened, could allow remote code execution.; CVSS:8.8 (High)Impact: Remote Code Execution (RCE), arbitrary code execution in the context of the current user. Affects all Windows versions. Could lead to system compromise and data exfiltration. Often exploited via phishing campaigns.; Risk Score: 9/10 - Very High. Widespread target, often exploited through user interaction, making it a common attack vector. |
        | Outputs | AI prompt task outputs are fixed and non-editable. |
        | Advanced | Includes the following fields. Extend Issue context: Append the extracted results of the action to the context. For example, "newContextKey1=path1::newContextKey2=path2" returns "\\[path1:'aaa',path2: 'bbb', newContexKey1: 'aaa',newContextKey2:'bbb'\\]"; Ignore outputs: If set to true, will not store outputs into the context (besides the extended outputs).; Execution timeout (seconds): Sets the command execution timeout in seconds. Default is 10 seconds.; Indicator Extraction mode: Choose when to extract indicators:-   Use system default: This is the default setting.; None: Do not perform indicator extraction; Inline: Before other playbook tasks; Out of band: While other tasks are running
        ; Mark results as note; Run without a worker; Skip this branch if this script/playbook is unavailable; Quiet Mode: When in quiet mode, tasks do not display inputs and outputs or extract indicators. Errors and warnings are still documented. You can turn quiet mode on or off at the task or playbook level. |
        | Details | Includes the following fields. Tag the result with: Add a tag to the task result. You can use the tag to filter entries in the War Room.; Task description (Markdown supported): Provide a description of what this task does. You can enter objects from the context data in the description. For example, in a communication task, you can use the recipient’s email address. The value for the object is based on what appears in the context every time the task runs. |
        | Timers | Timer.start: The trigger for starting to send a message or survey to recipients. You can change this trigger or add a trigger for Timer.stop or Timer.pause. Select the trigger timer field from the drop down.; Add Trigger: You can add other trigger timer fields from the drop down. |
        | On Error | Includes the following fields. Number of retries: How many times the task should retry running if there is an error. Default is 0.; Retry interval (seconds): How long to wait between retries. Default is 30 seconds. The maximum retry interval is 800 seconds (13.3 minutes). If you enter a value greater than 800 seconds, the retry interval will be limited to 800 seconds. |
        
    
4.  Click Save.
    
    The AI prompt task appears in the playbook editor.
    
5.  Connect the task you've added by dragging and dropping a wire.
    
    If you need to perform different actions based on the AI prompt task results, add a conditional task immediately after the AI prompt task in the playbook.
    
6.  Click Save Playbook.
    

###### AI prompt task error handling

It is recommended to configure error handling, which can include specifying a return value in case the AI prompt task fails. Potential errors include the LLM not being responsive (timeout), the LLM returning an invalid output, exceeding a threshold, or the LLM being turned off.

The reason for failure is logged in the War Room.

**Tip:**

If an AI prompt task returns a **`504 Error`** with the status **`DEADLINE_EXCEEDED`**, it is likely due to the task requiring more time to process than the default setting allows. To resolve this, open the Task Details pane of the AI task and select the Advanced tab, then increase the Execution timeout (seconds) based on how complex your prompt is and how long you expect the AI response to be. For example, for complex tasks such as generating a full vulnerability report, you many need to increase the timeout from the 10 second default to 120 seconds or higher.

###### Add manual tasks and blank tasks

Using the Task Library, add manual tasks and or blank tasks.

 Cortex Cloud supports different task types for different actions to be taken in a playbook.

You can a manual task or a blank task from the Task Library.

Add a manual task

Manual Tasks contains a list of playbooks from your Org repository with the manual tasks they contain. A manual task does not run a script and may require manual inputs. By default, they are ordered by latest updated playbook. You can also order the playbooks alphabetically.

1.  From the Task Library pane, click Manual Tasks.
    
2.  Click a playbook to view the tasks contained within that playbook.
    
3.  Hover over the task you want and and drag it onto the playbook editor.
    
    By default, a user icon ( ) indicates the task requires manual inputs. You can change the task settings to automate it.
    
4.  Connect the playbook you added by dragging and dropping a wire.
    
5.  Save the playbook.
    

Add a blank task

A Blank Task can be used to create a custom task from scratch.

1.  From the Task Library pane, click Blank Task.
    
2.  In the Task Details pane, select the Task Type you want.
    
    The following are the types of tasks you can create for your playbook.
    
    -   Standard task: Use a Standard task when an analyst needs to confirm information or escalate a case.
        
    -   Conditional task: Use a Conditional task to validate conditions based on values or parameters and take appropriate direction in the playbook workflow.
        
    -   Data Collection task: Use a Data Collection task to interact with users in your organization.
        
    -   Section Header: Use a Section Header task to group related tasks to organize and manage the flow of your playbook.
        
    
3.  Enter a meaningful name in the Task Name field.
    
4.  Configure the settings relevant for the task type you selected. For more information, see:
    
    -   Create a standard task
        
    -   Create a conditional task
        
    -   Create a communication task
        
    -   Create a section header
        
    
5.  Click Save.
    
    The task is added in the playbook editor.
    
6.  Connect the tasks you've added in their logical order by dragging and dropping a wire from one task to another.
    
7.  Save the playbook.

###### Create a standard task

Define a Standard task in Cortex Cloud.

Standard tasks can be manual tasks such as manual verification to prompt an analyst to verify the severity or classification of an issue before proceeding with automated actions. They can also be automated tasks such as parsing a file or enriching indicators.

1.  From the Task Library pane, click the task you want, for example Blank Task.
    
2.  In the Task Details pane, select the Standard icon for Task Type.
    
3.  Enter a meaningful name in the Task Name field for the task that corresponds to the data you are collecting.
    
4.  Select the options you want to configure for the Standard task.
    
    Standard tasks include the following field and tabs.
    
    | Field / tab | Settings |
    | --- | --- |
    | Choose script field | From a drop down list, select a script for the playbook to run. In the following tabs you can set: Inputs: Each script has its own set of input arguments (or none). You can set each argument to a specific value (by typing directly on the line under the argument name) or you can click the curly brackets to define a source field to populate the argument.; Outputs: Each script has its own set of output arguments (or none).; Mapping: Map the output from a playbook task directly to an issue field. The value for an output key populates the specified field per issue. This is a good alternative to using a task with the `setIssue` command. \*\*Note:\*\* The output value is dynamic and is derived from the context at the time that the task is processed. As a result, parallel tasks that are based on the same output may return inconsistent results.-   In the Mapping tab, click Add custom output mapping.; Under Outputs, select the output parameter whose output you want to map. Click the curly brackets to see a list of the output parameters available from the script.; Under Field to fill, select the field that you want to populate with the output.; Click Save.
    ; Advanced: Includes the following fields.-   Using: Choose which integration instance will execute the command, or leave empty to use all integration instances.; Extend context: Append the extracted results of the action to the context. For example, "newContextKey1=path1::newContextKey2=path2" returns "\\[path1:'aaa',path2: 'bbb', newContexKey1: 'aaa',newContextKey2:'bbb'\\]"; Ignore outputs: If set to true, will not store outputs into the context (besides the extended outputs).; Execution timeout (seconds): Sets the command execution timeout in seconds.; Indicator Extraction mode: Choose when to extract indicators:
    -   None: Do not perform indicator extraction; Inline: Before other playbook tasks; Out of band: While other tasks are running
    ; Mark results as note; Mark results as evidence; Run without a worker; Skip this branch if this script/playbook is unavailable; Quiet Mode: When in quiet mode, tasks do not display inputs and outputs or extract indicators. Errors and warnings are still documented. You can turn quiet mode on or off at the task or playbook level. ; Details: Includes the following fields.-   Tag the result with: Add a tag to the task result. You can use the tag to filter entries in the War Room.; Task description (Markdown supported): Describe what this task does. You can enter objects from the context data in the description. For example, in a communication task, you can use the recipient’s email address. The value for the object is based on what appears in the context every time the task runs.
    ; On Error: Includes the following fields.-   Number of retries: How many times the task should retry running if there is an error. Default is 0.; Retry interval (seconds): How long to wait between retries. Default is 30 seconds. The maximum retry interval is 800 seconds (13.3 minutes). If you enter a value greater than 800 seconds, the retry interval will be limited to 800 seconds.; Error handling: How the task should behave if there is an error. Options are:
    -   Stop; Continue; Continue on error path(s) This option configures the task to handle potential errors that may occur when executing the current task's script. |
    | Manual task settings tab | Default assignee: Assign an owner to this task.; Only the assignee can complete the task: Stop the playbook from proceeding until the task assignee completes the task. By default, in addition to the task assignee, the default administrator can also complete the blocked task. You can also block tasks until a user with an external email address completes the task.; Task SLA: Set the SLA in granularity of weeks, days, hours, and minutes.; Set task Reminder at: Set a reminder for the task in the granularity of weeks, days, hours, and minutes. |
    | Advanced tab | Quiet Mode: Determines whether this task uses the playbook default setting for quiet mode. When in quiet mode, tasks do not display inputs and outputs or extract indicators. Errors and warnings are still documented. You can turn quiet mode on or off at the task or playbook level. |
    | Details tab | Tag the result with: Add a tag to the task result. You can use the tag to filter entries in the War Room.; Task description (Markdown supported): Provide a description of what this task does. You can enter objects from the context data in the description. For example, in a communication task, you can use the recipient’s email address. The value for the object is based on what appears in the context every time the task runs. |
    
5.  Click Save.
    
    The task is added in the playbook editor.
    
    If you selected a system script in the settings, the task logo indicates Builtin.
    
6.  Connect the tasks you've added in their logical order by dragging and dropping a wire from one task to another.
    
7.  Save the playbook.

###### Create a conditional task

Create a Conditional task in a playbook.

Conditional tasks are used for determining different paths for your playbook. For example, in a playbook for handling phishing emails, a conditional task can be used to check if an email contains suspicious attachments. If the attachment is identified as malicious, the playbook can automatically quarantine the email; otherwise, it can proceed to manual review by a security analyst.

Conditional task types

You can create different types of conditional tasks.

-   Built-in: Creates a logical statement using an entity from within the playbook. For example, in an access investigation playbook, you can determine that if the Asset ID of the person whose account was being accessed exists in a VIP list, set the issue severity to High. Otherwise, proceed as normal.
    
-   Manual: Creates a conditional task that must be manually resolved. For example, a security analyst is prompted to review and validate a suspicious file. The playbook task might involve instructions for the analyst to analyze the file, determine if it is malicious, and provide feedback or take specific actions based on their assessment.
    
-   Ask: Creates a single-question survey communication task, the answer to which determines how a playbook proceeds. For more details about ask tasks, see Create a communication task.
    
-   Choose script: Creates a conditional task based on the result of a script. For example, check if an IP address is internal or external using the `IsIPInRanges` script. When using a script, the inputs and outputs are generated by the automation script.
    

How to create a conditional task

1.  From the Task Library pane, click the task you want, for example Blank Task.
    
2.  In the Task Details pane, select the Conditional Task Type.
    
3.  In the Task Name field, type a meaningful name for the task that corresponds to the data you are collecting.
    
4.  Select the relevant conditional task option. Some field configurations are required, and some are optional.
    
    Built-in
    
    -   Condition: Define one or more logical conditions for the task.
        
    -   Details: Includes the following fields.
        
        -   Tag the result with: Add a tag to the task result. You can use the tag to filter entries in the War Room.
            
        -   Task description (Markdown supported): Provide a description of what this task does. You can enter objects from the context data in the description. For example, in a communication task, you can use the recipient’s email address. The value for the object is based on what appears in the context every time the task runs.
            
        
    -   Advanced: Determines whether this task uses the playbook default setting for Quiet Mode. When in Quiet Mode, tasks do not display inputs and outputs or extract indicators. Errors and warnings are still documented. You can turn Quiet Mode on or off at the task or playbook level.
        
    -   On Error: Includes the following fields.
        
        -   Number of retries: How many times the task should retry running if there is an error. Default is 0.
            
        -   Retry interval (seconds): How long to wait between retries. Default is 30 seconds.
            
        
    
    Manual
    
    -   Manual task settings: Includes the following fields.
        
        -   Default assignee: Assign an owner to this task.
            
        -   Only the assignee can complete the task: Stop the playbook from proceeding until the task assignee completes the task. By default, in addition to the task assignee, the default administrator can also complete the blocked task. You can also block tasks until a user with an external email address completes the task.
            
        -   Task SLA: Set the SLA in granularity of weeks, days, hours, and minutes.
            
        -   Set task Reminder at: Set a reminder for the task in granularity of weeks, days, hours, and minutes.
            
        
    -   Advanced: Determines whether this task uses the playbook default setting for Quiet Mode. When in Quiet Mode, tasks do not display inputs and outputs or extract indicators. Errors and warnings are still documented. You can turn Quiet Mode on or off at the task or playbook level.
        
    -   Details: Includes the following fields.
        
        -   Tag the result with: Add a tag to the task result. You can use the tag to filter entries in the War Room.
            
        -   Task description (Markdown supported): Provide a description of what this task does. You can enter objects from the context data in the description. For example, in a communication task, you can use the recipient’s email address. The value for the object is based on what appears in the context every time the task runs.
            
        
    
    Ask
    
    -   Message: Includes the following fields.
        
        -   Ask by: The method for sending the message and survey. Options are:
            
            -   Task (can always be completed directly in the Workplan)
                
            -   Generated link (appears in the context data)
                
            -   Email
                
            
        -   To: The message and survey recipients. You can define by:
            
            -   Selecting from a predefined drop down list.
                
            -   Manually typing email addresses for users and/or external users.
                
            -   Clicking the context icon to define recipients from a context data source.
                
            
        -   CC of the email: A CC email address.
            
        -   Subject of the email: The message subject that displays to message recipients. You can write the survey question in the subject field or in the message body field.
            
        -   Message body: The text that displays in the body of the message. This field is optional, but if you don't write the survey question in the subject field, include it in the message body. This is a long-text field.
            
        -   Reply options: Reply options are sent via the selected channels as options for an answer.
            
        -   Require users to authenticate: Enable this option to have your SAML or AD authenticate the recipient before allowing them to answer. You must first set up an authentication integration instance and check Use this instance for external users authentication only in the integration instance settings.
            
        
    -   Timing: Includes the following fields.
        
        -   Retry interval (minutes): Determines the wait time between each execution of a command. For example, the frequency (in minutes) that a message and survey are resent to recipients before the response is received.
            
        -   Number of retries: Determines how many times a command attempts to run before generating an error. For example, the maximum number of times a message is sent. If a reply is received, no additional retry messages will be sent.
            
        -   Task SLA: Set the SLA in granularity of weeks, days, and hours.
            
        -   Set task Reminder at: Set a task reminder in the granularity of weeks, days, and hours.
            
        -   Complete automatically if SLA passed without a reply: Select this checkbox to complete the task if the SLA is breached before a reply is received. You can select yes or no.
            
        
    -   Advanced: Includes the following fields.
        
        -   Using: Choose which integration instance will execute the command, or leave empty to use all integration instances.
            
        -   Extend context: Append the extracted results of the action to the context. For example, "newContextKey1=path1::newContextKey2=path2" returns "\\[path1:'aaa',path2: 'bbb', newContexKey1: 'aaa',newContextKey2:'bbb'\\]"
            
        -   Ignore outputs: If set to true, will not store outputs into the context (besides the extended outputs).
            
        -   Execution timeout (seconds): Sets the command execution timeout in seconds.
            
        -   Indicator Extraction mode: Choose when to extract indicators:
            
            -   None: Do not perform indicator extraction
                
            -   Inline: Before other playbook tasks
                
            -   Out of band: While other tasks are running
                
            
        -   Mark results as note
            
        -   Mark results as evidence
            
        -   Run without a worker
            
        -   Skip this branch if this script/playbook is unavailable
            
        -   Quiet Mode: When in quiet mode, tasks do not display inputs and outputs or extract indicators. Errors and warnings are still documented. You can turn quiet mode on or off at the task or playbook level.
            
        
    -   Details: Includes the following fields.
        
        -   Tag the result with: Add a tag to the task result. You can use the tag to filter entries in the War Room.
            
        -   Task description (Markdown supported): Describe what this task does. You can enter objects from the context data in the description. For example, in a communication task, you can use the recipient’s email address. The value for the object is based on what appears in the context every time the task runs.
            
        
    
    Choose script
    
    From a drop-down list, select a script for the playbook to run. In the following tabs, you can set:
    
    -   Inputs: Each script has its own set of input arguments (or none). You can set each argument to a specific value (by typing directly on the line under the argument name), or you can click the curly brackets to define a source field to populate the argument.
        
    -   Outputs: Each script has its own set of output arguments (or none).
        
    -   Mapping:
        
        Map the output from a playbook task directly to an issue field.
        
        The value for an output key populates the specified field per issue. This is a good alternative to using a task with a `setIssue` command.
        
        **Note:**
        
        The output value is dynamic and is derived from the context at the time that the task is processed. As a result, parallel tasks that are based on the same output may return inconsistent results.
        
        1.  In the Mapping tab, click Add custom output mapping.
            
        2.  Under Outputs, select the output parameter whose output you want to map. Click the curly brackets to see a list of the output parameters available from the automation.
            
        3.  Under Field to fill, select the field that you want to populate with the output.
            
        4.  Click Save.
            
        
    -   Advanced: Includes the following fields.
        
        -   Using: Choose which integration instance will execute the command, or leave empty to use all integration instances.
            
        -   Extend context: Append the extracted results of the action to the context. For example, "newContextKey1=path1::newContextKey2=path2" returns "\\[path1:'aaa',path2: 'bbb', newContexKey1: 'aaa',newContextKey2:'bbb'\\]"
            
        -   Ignore outputs: If set to true, will not store outputs into the context (besides the extended outputs).
            
        -   Execution timeout (seconds): Sets the command execution timeout in seconds.
            
        -   Indicator Extraction mode: Choose when to extract indicators:
            
            -   None: Do not perform indicator extraction
                
            -   Inline: Before other playbook tasks
                
            -   Out of band: While other tasks are running
                
            
        -   Mark results as note
            
        -   Mark results as evidence
            
        -   Run without a worker
            
        -   Skip this branch if this script/playbook is unavailable
            
        -   Quiet Mode: When in quiet mode, tasks do not display inputs and outputs or extract indicators. Errors and warnings are still documented. You can turn quiet mode on or off at the task or playbook level.
            
        
    -   Details: Includes the following fields.
        
        -   Tag the result with: Add a tag to the task result. You can use the tag to filter entries in the War Room.
            
        -   Task description (Markdown supported): Provide a description of what this task does. You can enter objects from the context data in the description. For example, in a communication task, you can use the recipient’s email address. The value for the object is based on what appears in the context every time the task runs.
            
        
    -   On Error: Includes the following fields.
        
        -   Number of retries: How many times the task should retry running if there is an error. Default is 0.
            
        -   Retry interval (seconds): How long to wait between retries. Default is 30 seconds.
            
        -   Error handling: How the task should behave if there is an error. Options are:
            
            -   Stop
                
            -   Continue
                
            -   Continue on error path(s)
                
                This option configures the task to handle potential errors that may occur when executing the current task's script.
                
            
        
    
5.  Click Save.
    
    The task is added in the playbook editor.
    
    If you selected a system script in the settings, the task logo indicates Builtin.
    
6.  Connect the tasks you've added in their logical order by dragging and dropping a wire from one task to another.
    
7.  Save the playbook.

###### Create a communication task

Communication tasks in playbooks enable you to send surveys and collect data. Ask task, data collection task.

Communication tasks enable you to send surveys to users, both internal and external, to collect data for an issue. The collected data can be used for issue analysis, and also as input for subsequent playbook tasks. For example, you can send a scheduled survey requesting analysts to send specific issue updates or send a single (stand-alone) question survey to determine how an issue was handled.

There are two types of communication tasks:

-   **Ask tasks**: A conditional task that sends a single question survey. The answer is used to determine how the playbook proceeds.
    
-   **Data collection tasks**: A data collection task sends a survey of one or more questions. The answers are recorded in context data and can be used as input for subsequent tasks.
    

###### About ask tasks

An ask task is a type of conditional task that sends a single question survey, the answer to which determines how a playbook proceeds. If you send the survey to multiple users, the first answer received is used, and subsequent responses are disregarded. For more information about ask task settings, see Create a conditional task.

Because this is a conditional task, you need to create a condition for each of the answers. For example, if the survey answers include, **`Yes, No, and Maybe`**, there should be a corresponding condition (path) in the playbook for each of these answers.

Users interact with the survey directly from the message, meaning the question appears in the message and they click an answer from the message.

The survey question and the first response is recorded in the issue context data. This enables you to use this response as the input for subsequent playbook tasks.

For all ask conditional tasks, a link is generated for each possible answer the recipient can select. If the survey is sent to more than one user, a unique link is created for each possible answer for each individual recipient. These links are visible in the context data of the issue's Work Plan. The links appear under Ask.Links in the context data.

Example 53. Send a survey

In this example, the message and survey will be sent to recipients every hour for six hours, until a reply is received (it is repeated every 60 minutes, 6 times). The SLA is six hours. If the SLA is breached, the playbook will proceed according to the Yes condition.

  

Example 54. Send email to users

In this example, a message and survey are sent by email to all users with the Analyst role. We are not including a message body because the message subject is the survey question we want recipients to answer. There are three reply options, Yes, No, and Not sure. In the playbook, we will only add conditions for the Yes and No replies. We require recipient authentication, which first involves setting up authentication.

  

###### Create a data collection task

The data collection task is a multi-question survey (form) that survey recipients access from a link in the message. Users do not need to log in to access the survey, which is located on a separate site.

All responses are collected and recorded in the issue context data, whether you receive responses from a single user or multiple users. This enables you to use the survey questions and answers as input for subsequent playbook tasks. If responses are received from multiple users, data for multi-select fields and grid fields are aggregated. For all other field types, the response received most recently will override previous responses as it displays in the field. All responses are always available in the context data.

For all data collection tasks, a single link is generated for each recipient of the survey. These links are visible in the context data of the issue's Work Plan. The links appear in the context data under the Links section of that survey.

You can include the following types of questions in the survey.

-   Stand alone questions. These are presented to users directly in the message, and from which users answer directly in the message (not an external survey).
    
-   Field-based questions. These are based on a specific issue field (either system or custom), for example, an Asset ID field. The response (data) received for these fields automatically populates the field for this issue. For single-select field based questions, the default option is taken from the field’s defined default.
    

How to create a Data Collection task

1.  From the Task Library pane, click the task you want, for example Blank Task.
    
2.  In the Task Details pane, select the Data Collection Task Type.
    
3.  Enter a meaningful name in the Task Name field for the task that corresponds to the data you are collecting.
    
4.  Select the communication options you want to use to collect the data.
    
    Tabs and configuration fields
    
    | Tab | Configuration fields in the tab |
    | --- | --- |
    | Message | Ask by: The method for sending the message and survey. Options are:-   Task (can always be completed directly in the Workplan); Generated link (appears in the context data): A link to the data collection survey is available in the context data of the task.; Email: If you select this option, enter below the subject and message of the email and the email addresses of the users who should receive this message or survey.
    ; To: The message and survey recipients. You can define by:-   Selecting from a predefined drop down list.; Manually typing email addresses for users and/or external users.; Clicking the context icon to define recipients from a context data source.
    ; CC of the email: A CC email address.; Subject of the email: The message subject that displays to message recipients. You can write the survey question in the subject field or in the message body field.; Message body: The message question body to be used in the notification sent to the given users along with the reply options.; Require users to authenticate: Enable this option to have your SAML or AD authenticate the recipient before allowing them to answer. You must first set up an authentication integration instance and check Use this instance for external users authentication only in the integration instance settings. |
    | Questions | Web Survey Title: The title displayed for the web survey.; Short Description: A description displayed above the questions on the web survey. Click Preview to see how it displays.; Question: A question to ask recipients.; Answer Type: The field type for the answer field. Options are:-   Short text; Long text; Number; Single Select (requires you to define a reply option); Multi select/Array (requires you to define a reply option); Date picker; Attachments
    ; Mandatory: If this checkbox is selected for a question, survey recipients will not be able to submit the survey until they answer this question.; Help Message: The message that displays when users hover over the question mark help button for the survey question.; Placeholder: A sample value displayed until a real value is entered. \*\*Note:\*\* You can drag questions to rearrange the order in which they display in the survey. |
    | Timing | Retry interval (minutes): Determines the wait time between each execution of a command. For example, the frequency (in minutes) that a message and survey are resent to recipients before the response is received.; Number of retries: Determines how many times a command attempts to run before generating an error. For example, the maximum number of times a message is sent. If a reply is received, no additional retry messages will be sent. \*\*Note:\*\* Retries are not supported for data collection tasks that have errors sending emails (indicated by a server timeout). This is because retries only work on automation execution failures, not on email delivery issues. ; Task SLA: Set the SLA in granularity of weeks, days, and hours.; Set task Reminder at: Set a task reminder in granularity of weeks, days, and hours.; Complete automatically if:-   Reached task SLA (with or without a reply): This option is grayed out.; Received <enter a number> reply |
    | Details | Tag the result with: Add a tag to the task result. You can use the tag to filter entries in the War Room.; Task description (Markdown supported): Describe what this task does. You can enter objects from the context data in the description. For example, in a communication task, you can use the recipient’s email address. The value for the object is based on what appears in the context every time the task runs. |
    | Advanced | Using: Choose which integration instance will execute the command, or leave empty to use all integration instances.; Extend context: Append the extracted results of the action to the context. For example, "newContextKey1=path1::newContextKey2=path2" returns "\\[path1:'aaa',path2: 'bbb', newContexKey1: 'aaa',newContextKey2:'bbb'\\]"; Ignore outputs: If set to true, will not store outputs into the context (besides the extended outputs).; Execution timeout (seconds): Sets the command execution timeout in seconds.; Indicator Extraction mode: Choose when to extract indicators:-   None: Do not perform indicator extraction; Inline: Before other playbook tasks; Out of band: While other tasks are running
    ; Mark results as note; Mark results as evidence; Run without a worker; Skip this branch if this script/playbook is unavailable; Quiet Mode: When in quiet mode, tasks do not display inputs and outputs or extract indicators. Errors and warnings are still documented. You can turn quiet mode on or off at the task or playbook level. |
    
5.  (Optional) To customize the look and feel of your email message, click Preview.
    
    You can determine the color scheme and how the text in the message header and body appear, as well as the appearance and text of the button the user clicks to submit the survey.
    
    If you configured a custom logo in server settings, it will appear in the preview.
    
    **Note:**
    
    When customizing HTML for data collection emails, do not apply CSS styles directly to the **`<body>`** tag. Cortex Cloud injects your HTML as a fragment into an existing email template and removes the **`<body>`** tag to ensure valid HTML structure. Any styles applied to the **`<body>`** tag will be lost. To ensure your formatting renders correctly, wrap your content in a container element such as a **`<div>`** or **`<span>`** and apply your styles to that container.
    
    ```
    <body>
        <div style="font-family: sans-serif;">Content</div>
    </body>
    ```
    
6.  Click Save.
    
    The task is added in the playbook editor.
    
    A user icon ( ) indicates the task requires manual inputs.
    
7.  Connect the tasks you've added in their logical order by dragging and dropping a wire from one task to another.
    
8.  Save the playbook.
    

Data collection task examples

Stand-alone question with a single-select answer

In this example, we create a stand-alone question, with a single-select answer. This question is not mandatory. If we selected the First option is default checkbox, the reply option "0" is the default value in the answer field.

Field-based using a custom field

In this example, we create a question based on a custom issue field that is marked as mandatory. You can add a question based on a field. To add a field, click the Add Question based on field.

###### Configure communication task authentication

When sending a form in a communication task, you can configure user authentication to ensure only authorized users gain access to the form.

The authorized users are usually external users not in Cortex Cloud, and they will not be able to access anything else in Cortex Cloud.

Set up playbook communication task authentication

1.  Set up your SSO if it is not already configured. See Authenticate users using SSO for more details.
    
2.  In the Task details of your playbook communication task, check Require users to authenticate to have your SAML or AD authenticate the recipient before allowing them access to the form.

###### Create a section header

Section headers are used to manage the flow of your playbook and help you organize your tasks efficiently.

Section headers are used to manage the flow of your playbook and help you organize your tasks efficiently. You create a section header to group a number of related tasks.

1.  From the Task Library pane, click Header or Blank Task.
    
2.  In the Task Details pane, for Task Type, select the Section Header icon.
    
3.  Enter a meaningful name in the Task Name field for the section header.
    
4.  In the Details tab, configure the following.
    
    -   Tag the result with: Add a tag to the task result. You can use the tag to filter entries in the War Room.
        
    -   Sub Section: If selected, this section becomes a subsection of the parent section above it, and it collapses when its parent section collapses.
        
    -   Task description (Markdown supported): Provide a description of what this task does. In the Playbooks page, click  on the section header to display the description.
        
    
5.  Click Save.

###### Configure script error handling in a playbook

When defining a task, you can decide if the playbook continues, stops, or continues on an error path.

You can determine how the playbook behaves if there are script errors during execution.

When defining a standard task that uses a script or a conditional task that uses an script, you can define how a playbook task continues by selecting one of the following options:

-   Stop: The playbook stops, if the task errors during execution. For example, if the task requires a manual review, you may want the playbook to stop until completion.
    
-   Continue: The playbook continues to execute if the task errors. For example, the playbook task requires EWS, but EWS is not required for the playbook to proceed.
    
-   Continue on error path: If a task errors, the playbook continues on an error path.
    
    The error path may be useful if you want to take action on an error, like clean-up, retry, etc. You may also want to handle errors in different ways. For example, in case of a quota expired error you may want to retry in 1 minute, but if you receive an internal error 500, you may want to stop the playbook.
    
    You may want to create a separate path when an analyst manually reviews the issue and research is needed outside Cortex Cloud. Once an analysis is complete, you can add a task to consider escalating to a customer and, if so, generate a report which can be attached to a ticket system such as Jira or ServiceNow.
    
    Instead of a playbook waiting on manual input, which displays an error state, such as missing an argument in a script, you can add a separate path for these kinds of issues.
    

**Note:**

Use the **`GetErrorsFromEntry`** script (part of the Common Scripts Pack) to check whether the given entry returns an error and returns an error message. For example, when using the script in a playbook, you can fetch the error message from a given task, such as a runtime error. You can then add a step in the playbook flow to send those error messages to the relevant stakeholder through Slack, email, opening a Jira ticket, etc.

When errors are created, they are added to context under **`task.id.error`**.

How to set up error handling in your playbook

1.  In a playbook, edit a task or create a task from the Task Library.
    
2.  In the Task Details pane, set the Task Type to either Standard or Conditional.
    
    **Note:**
    
    You can set up script error handling only when running a script in a Standard task or a Conditional task. For more information about error handling settings for these tasks, see Create a standard task or Create a conditional task.
    
    Built-in, Manual, and Ask Conditional tasks have On Error settings for number of retries and retry interval, but not Error Handling.
    
3.  Select a script.
    
4.  Click the On Error tab.
    
5.  In the Number of retries field, type the number of times the tasks attempts to run before generating an error.
    
6.  In the Retry Interval (seconds) field, type the wait time between retrying the task.
    
7.  In the Error Handling field, select one of the following:
    
    -   Stop
        
    -   Continue
        
    -   Continue on error path(s)
        
    
8.  Click Save.
    
9.  When adding a connector from this task to the next task, a dialog box appears which enables you to select one of the following paths:
    
    -   Standard Path: When adding a task to this path, it executes without any exceptions.
        
        If you select the Standard Path, the task continues on this path and executes without exceptions.
        
    -   Error Path: When adding a task to this path, it executes where the source task errors during execution.
        
        If you select Error path, if the task errors, the playbook continues with this path.

###### Task 4. Add custom playbook features

Use an out-of-the-box playbook, create a new playbook, or customize an existing one based on your organization's needs.

You can customize your playbook to do the following.

| Custom action | Description |
| --- | --- |
| Configure a sub-playbook loop | Automate the execution of a series of actions in a sub-playbook loop to enable handling repetitive tasks efficiently, increasing workflow productivity and consistency. |
| Filter and transform data | Filters extract relevant data to help focus on relevant information and discard irrelevant or unnecessary data. Transformers take one value and transform or render it to another value or format. |
| Use scripts | Perform specific automated actions using commands which are also used in playbook tasks and in the War Room. Configure script error handling. |
| Extended contextExtend context | Save additional data from the raw response of commands that return data. |
| Update issue fields with playbook tasks | Use the setIssue script to set and update all system issue fields. |
| Create an automation rule | Create conditions so if an issue with specific characteristics is created, a suitable response is issued via a playbook. |

###### Task 5. Test and debug the playbook

Use an out-of-the-box playbook, create a new playbook, or customize an existing one based on your organization's needs.

The debugger provides a test environment where you can make changes to data and playbook logic and view the results in real-time to test and troubleshoot playbooks. You can see exactly what is written to the context at each step and which indicators are extracted.

For more information, see Test your playbook.

###### Task 6. Manage playbook content

Use an out-of-the-box playbook, create a new playbook, or customize an existing one based on your organization's needs.

Manage playbook content by saving versions of your playbook in Cortex Cloud to maintain version history.

Cortex Cloud also manages playbook editing conflicts by only allowing one user at a time to edit a playbook and locking it for other users to edit. It automatically clears the playbook edit lock when the user currently editing the playbook saves the playbook, closes the editor, logs out, or when their session expires. In addition, you can grant a permission to designated users so they can manually unlock playbooks from the Playbooks page or editor.

For more details, see Manage playbook content.

##### Customize your playbook

Customize your playbook to extract indicators, extend context, update issue fields, filter and transform data, run scripts, and perform triggered actions, and sub-playbook loops.

Customizing a playbook helps you automate tasks to match your needs, making workflows more efficient, accurate, and easier to integrate with your existing processes.

###### Configure a sub-playbook loop

Configure a sub-playbook to run in a loop.

Looping uses sub-playbooks to create loops within the main playbook. When running the loop, the values are calculated based on the context data for the sub-playbook and not the main playbook.

**Note:**

Consider the following when adding a loop:

-   The maximum number of loops (default is 100). A high number of loops or a high wait time combined with a large number of issues may affect performance.
    
-   Periodically check looping conditions to ensure they are still valid for the data set.
    
-   If you want a sub playbook task to loop over an array passed into its input, you need to configure a loop. Otherwise it takes in the whole array and runs once.
    

How to create a sub-playbook loop

1.  In the Playbooks page, select the parent playbook that contains the sub-playbook task you want to run in a loop.
    
2.  Right click and select Edit.
    
    If the playbook is installed from a content pack, you need to duplicate or detach the playbook before editing.
    
3.  Click the sub-playbook for which you want to create the loop.
    
4.  In the Task Details pane, click the Loop tab.
    
5.  Click one of the following options to define loop settings:
    
    -   None: (Default) The sub-playbook does not loop.
        
    -   Built-in: Use built-in functions to define loop settings:
        
        | Option | Description |
        | --- | --- |
        | Exit when | Enables you to define when to exit the loop. Click {} and expand the source category. Hover over the required source and click **Filter & Transform** to the left of the source to manipulate the data. |
        | Equals (String) | Select the operator to define how the values should be evaluated. |
        | Max iterations | The number of times the loop should run. \*\*Tip:\*\* Balance between the number of iterations and the interval so you do not overload the server. |
        | Sleep | The number of seconds to wait between iterations. recommends that you balance between the number of iterations and the number of seconds to wait between iterations so you don't overload the server. |
        
    -   For each input: Runs the sub-playbook based on defined inputs. Enter the number of seconds to wait between iterations.
        
    -   Choose Loop automation: Select the automation from the drop-down list to define when to exit the loop. The parameters that appear are applicable to the selected automation.
        
    
6.  To save the changes, click OK.
    

###### Example: Exit looping after running for all inputs

In the parent playbook (the task that contains the sub-playbook), you can configure to exit a loop running the sub-playbook automatically when the last item in the sub-playbook input is executed.

-   If the input is a single item, the sub-playbook runs once, but if the input is a list of items (such as a list of issue IDs), the sub-playbook runs as many times as there are items in the list. Each iteration of the sub-playbook uses the next item in the list as the input.
    
-   If there are multiple input lists with the same amount of items, the sub-playbook runs once for each set of inputs.
    
-   If there are multiple input lists with different amounts of items, the sub-playbook runs the first set of inputs, followed by the second, third, and so on, until the end.
    
    For example:
    
    | Input | Value |
    | --- | --- |
    | Input x | 1,2,3,4 |
    | Input y | a,b,c,d |
    | Input z | 9 |
    
    The first loop: 1, a, 9
    
    The second loop: 2, b, 9
    
    The third loop: 3, c, 9
    
    The fourth loop: 4, d, 9

###### Filter and transform data

Use filters and transformers to manipulate data. Use filters and transformers in playbook tasks or when mapping an instance.

In Cortex Cloud, data is extracted and collected from various sources, such as playbook tasks and command results, and presented in JSON format. The data can be manipulated by using filters and transformers.

Filters

Filters enable you to extract relevant data which you can use elsewhere in Cortex Cloud. For example, if an issue has several files with varying file types and extensions, you can filter the files by file extension or file type, and use the filtered files in a detonation playbook. You can filter as many objects as required. Cortex Cloud automatically calculates the context root to which to filter. You can change the context root as necessary.

**Caution:**

You can change the context data root to filter, but it is not recommended to select a different root, as it affects the filter results. The drop-down list displays the filter root for backward compatibility.

Transformers

Transformers modify or format data to make it suitable for further processing or presentation. For example, you can convert a date in non-Unix format to Unix format. Another example is applying the **`count`** transformer, which renders the number of elements. When you have more than one transformer, they apply in the order that they appear. You can reorder them using click-and-drag.

Add filters and transformers in a playbook task

1.  Create or edit a playbook task.
    
2.  In the field you want to add a filter or transformer (for example, inputs or outputs), click the curly brackets and then select Filters and Transformers.
    
3.  In the Get field, type or select data you want to filter or transform. For example, **`EWS.Items.Name`**.
    
4.  (Optional) To filter the data, do the following.
    
    1.  In the Filter section, click Add filter.
        
        When adding a filter, the context root to filter is automatically populated.
        
    2.  Select the data you want to filter.
        
    3.  Select the filter operators.
        
    4.  Add the value.
        
    5.  Click the checkbox to save the filter.
        
5.  (Optional) To apply transformers to the field, click Add transformer.
    
    1.  Click the transformer and select the relevant transformer.
        
        By default, the transformer is set to `To upper case(String)`. Click it to pick a different transformer, for example to change the date format for when issues occurred.
        
    2.  Select the transformer operators.
        
    3.  Click the tick box to save.
        
6.  (Optional) To test the filter or transformation click Test and select the investigation or add it manually.
    

Example: Filter items with an EXE extension

In this example, we want to filter all EWS Item names that have the extension **`exe`**.

1.  From the Filters & transformers window, in the Get field, type **`EWS.Items.Name`** to extract all Item names in EWS.
    
    The context root to filter is **`EWS,Items`**.
    
    
    
2.  In the Filter section, click Add filter.
    
3.  In the left-hand side, add **`Extension`** to the filter.
    
4.  Select Equals (String) → ignore case.
    
5.  In the right-hand side add **`exe`**.
    
    
    
6.  Click the tick box to save the filter.
    
7.  Click Test.
    
    You should see Item names are filtered with the extension **`exe`**.
    

Example (advanced): Filter hostname for the last resolved time

In this example, we want to see the **`LastResolved`** time only from the **`demisto.com`** host name.

This is part of the data where we want to filter:

```
{
    "IP": [
       {
        "Address": "192.168.10.96",
        "AutoFocus": {
            "Resolutions": [
                {
                    "Hostname": "79463wwfqq,dattolocal.net",
                    "LastResolved": "2022-08-02 04:01:02"
                },
                {
                    "Hostname": "demisto.com",
                    "LastResolved": "2022-09-10 09:47:17"
                },
                {
                    "Hostname": "securesense.call4pchelp.com",
                    "LastResolved": "2022-04-22 11:49:06"
                }
            ]
        }
       },
       {
        "Address":"192.168.10.96",
        "AutoFocus": {
            "Resolutions":[
                {
                    "Hostname":"79463wwfqq,dattolocal.net",
                    "LastResolved":"2022-08-02 04:01:02"
                },
                {
                    "Hostname":"demisto.com",
                    "LastResolved":"2022-09-10 09:47:17"
                },
                {
                    "Hostname":"securesense.call4pchelp.com",
                    "LastResolved":"2022-04-22 11:49:06"
                }
            ]
        }
       }
    ]
}
```

1.  From the Filters & transformers window, in the Get field, type **`IP.AutoFocus.Resolutions.LastResolve`**.
    
    
    
2.  In the Filter section, click Add filter.
    
    Cortex Cloud automatically calculates that the context root to filter is **`IP.AutoFocus.Resolutions`**.
    
    
    
3.  In the left-hand side, add **`Hostname`** to the filter.
    
4.  Select Equals (String) → Ends with
    
5.  In the right-hand side add **`demisto.com`**.
    
6.  Click the checkbox to save.
    
    
    
7.  Click Test.
    
    
    

Create custom filters and transformers

If you require a filter or transformer that is not provided out-of-the-box, you can create your own by creating a script and then adding to the operators window.

1.  Select Investigation & Response → Automation → Scripts → New Script.
    
2.  Type a meaningful name for the script, and click Save.
    
3.  To create a filter operator script, do the following:
    
    1.  In the Tags field, add the **`filter`** tag.
        
        If you want a custom transformer that operates on an entire array rather than on each individual item, you need to add the **`entirelist`** tag.
        
    2.  In the Arguments section, add the following arguments:
        
        | Argument | Description |
        | --- | --- |
        | left | Mark as mandatory. This argument defines the left-side value of the transformer operation. In this example, this is the value being checked if it falls within the range specified in the right-side value. |
        | right | Mark as mandatory. This argument defines the right-side value of the transformer operation. In this example, this is the range to check if the left-side value is in. |
        
    3.  Add the script syntax and save.
        
4.  To create a transformer operator script do the following:
    
    1.  In the Tags field, add the **`transformer`** tag.
        
    2.  In the Arguments section, add the following arguments:
        
        | Argument | Description |
        | --- | --- |
        | value | Mark as mandatory. The value to transform. In this example, this is the UNIX epoch timestamp to convert to ISO format. |
        
    3.  Add the script syntax and save.
        
5.  Go to the filters and transformers window and select the operator.

###### Filter considerations, categories, and built-in filters

Filters in playbook tasks are defined built-in according to categories.

You can use built-in filters to define your filter, they are grouped by category. Before defining a filter, consider the following.

###### Filter considerations

-   Filters try to cast the transformed value and arguments to the appropriate type. The task fails if casting fails. For example, “a” Equals {“some”: “object”} => Error
    
-   If the filter's left-side value expects a single item but receives a list, the filter passes if at least one item meets the requirements. For example, [“a”, “b”, “c”] Equals “b” => true.
    
-   If the filter's left-side value expects a list but receives a single item, it converts it to a list with a single item. For example, “a” Contains “a” => True.
    
-   Some custom filters are implemented as scripts with the `filter` tag. You can find examples in the playbook automation task description.
    
-   Filters in conditional tasks do not iterate the items of the root. Instead, they fetch the left-side value and the right-side value and compare them.
    

###### Filter categories and built-in filters

When adding a filter, clicking the default Equals (String) field opens a search window showing the available built-in filters. They are defined by category as follows:

###### General

General filters such as Contains, Doesn’t Contain, In, and Is empty.

| Filter | Description |
| --- | --- |
| Contains | Tests whether the value on the left is contained in the value on the right. Can be used for any kind of object (not limited to a string). |
| Doesn't Contain | Tests whether the value on the left is NOT contained in the value on the right. Can be used for any kind of object (not limited to a string). |
| Has length of | Tests whether a list specified on the left has the number of items specified on the right. |
| In | Tests whether the value on the left is contained in the object on the right. |
| Is defined | Tests whether a key on the left exists in context. \*\*Note:\*\* `Is defined` considers false and empty strings and lists to be defined values. If you don't want those to be included as defined, use `Is not empty`. |
| Is empty | Tests whether the value of a key is empty. |
| Is not empty | Tests whether the value of a key is NOT empty. |
| Not defined | Tests whether a key on the left does NOT exist in context. \*\*Note:\*\* `Not defined` considers false and empty strings and lists to be defined values. If you don't want those to be included as defined, use `Is empty`. |
| Not in | Tests whether the value on the left is NOT contained in the object on the right. |

###### String

Determines the relationship between the left-side string value and the right-side string value, such as starts with, includes, and in the list. The string filter returns partial matches as True.

| Filter | Description |
| --- | --- |
| Doesn't end with | Tests whether the string on the left is NOT the end of the string on the right. |
| Doesn't equal | Tests whether the strings are NOT the same. |
| Doesn't include | Tests whether the string on the right is NOT a substring of the string on the left. |
| Doesn't start with | Tests whether the string on the right is NOT the beginning of the string on the left. |
| Ends with | Tests whether the string on the left is the end of the string on the right. |
| Equals | Tests whether the strings are the same. |
| Has length | Tests whether the two strings have the same length. |
| In list | Tests whether the string on the left is in the list on the right. |
| Includes | Tests whether the string on the right is a substring of the string on the left. |
| Matches - regex | Tests whether the string on the left matches the regex on the right. Uses Go-style regex. |
| Not in list | Tests whether the string on the left is NOT a substring of the string on the right. |
| Starts with | Tests whether the string on the right is the beginning of the string on the left. |
| StringContainsArray | Tests whether a substring or an array of substrings on the left is within a string array on the right. Supports single strings as well. For example, for substrings ['a', 'b', 'c'] in string 'a' the script returns true. |

###### Number

Determines the relationship between the left-side number value and the right-side number value, such as Equals, Greater than, and Less than.

| Filter | Description |
| --- | --- |
| Doesn't equal | Tests whether the number on the left does NOT equal the number on the right. |
| Equals | Tests whether the number on the left equals the number on the right. |
| Greater or equal | Tests whether the number on the left is greater than or equal to the number on the right. |
| Greater than | Tests whether the number on the left is greater than the number on the right. |
| InRange | Tests whether the number on the left is within a range specified on the right. For example, if the left value is 4, and the range on the right is 1,8, the condition is true. |
| Less or equal | Tests whether the number on the left is less than or equal to the number on the right. |
| Less than | Tests whether the number on the left is less than the number on the right. |

###### Date

Determines whether the left-side time value is earlier than, later than, or the same time as the right-side time value.

| Filter | Description |
| --- | --- |
| After | Tests whether the date on the left is after the date on the right. |
| AfterRelativeDate | Tests whether the date on the left occurred after the provided relative time (such as '6 months ago') on the right. Returns True or False. |
| Before | Tests whether the date on the left is before the date on the right. |
| Same as | Tests whether the two dates are the same. |

Supported time and date formats

| Format | Example |
| --- | --- |
| ANSIC | Tues Jan _2 15:04:05 2019 |
| UnixDate | Tues Jan _2 15:04:05 MST 2019 |
| RubyDate | Tues Jan 02 15:04:05 -0700 2019 |
| RFC822 | 02 Jan 19 15:04 MST |
| RFC822Z | 02 Jan 19 15:04 -0700 // RFC822 with numeric zone |
| RFC850 | Tuesday, 02-Jan-19 15:04:05 MST |
| RFC1123 | Tues, 02 Jan 2019 15:04:05 MST |
| RFC1123Z | Tues, 02 Jan 2019 15:04:05 -0700 // RFC1123 with numeric zone |
| RFC3339 | 2019-01-02T15:04:05Z07:00 |
| RFC3339Nano | 2019-01-02T15:04:05.999999999Z07:00 |
| Kitchen | 3.04PM |
| Stamp | Jan _2 15:04:05 |
| StampMilli | Jan _2 15:04:05.000 |
| StampMicro | Jan _2 15:04:05.000000 |
| StampNano | Jan _2 15:04:05.000000000 |

###### Boolean

Determines whether a field is true or false, or the string representation is true or false.

| Filter | Description |
| --- | --- |
| Is false | Tests whether the value on the left evaluates to false. |
| Is true | Tests whether the value on the left evaluates to true. |

###### Other

Miscellaneous filters, including CheckIfSubdomain and IsInCidrRanges.

| Filter | Description |
| --- | --- |
| CheckIfSubdomain | Tests whether the value on the left is a subdomain of the value on the right. |
| CIDRBiggerThanPrefix | Tests whether the CIDR prefix on the left is bigger than the defined maximum prefix on the right. |
| GreaterCidrNumAddresses | Tests whether the number of available addresses in IPv4 or IPv6 CIDR on the right is greater than the input given on the left. |
| IsInCidrRanges | Tests whether the IPv4 address on the left is contained in at least one of the comma-delimited CIDR ranges on the right. Multiple IPv4 addresses can be passed in a comma-delimited list and each address is tested. |
| IsNotInCidrRanges | Tests whether the IPv4 address on the left is NOT contained in at least one of the comma-delimited CIDR ranges on the right. Multiple IPv4 addresses can be passed in a comma-delimited list and each address is tested. |
| IsRFC1918Address | Tests whether an IPv4 address on the left is in the private RFC-1918 address space (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) on the right. |
| LowerCidrNumAddresses | Tests whether the number of available addresses in IPv4 or IPv6 CIDR on the right is less than the input given on the left. |

###### Transformer considerations, categories, and built-in transformers

Use transformers in playbook tasks according to the following considerations.

You can use built-in transformers to define your transformer, they are grouped by category. Before defining a transformer, consider the following.

###### Transformer considerations

-   Transformers try to cast the transformed value (and arguments) to the necessary type. Tasks will fail if casting has failed, for example **`{“some”: “object”}`** To upper case => **`Error`**.
    
-   Some transformers are applied on each item of the result. For example, **`a, b, c`** To upper case => **`A, B, C`**.
    
-   Some transformers operate on the entire list. For example, **`a, b, c`** count => **`3`**.
    
-   Some custom transformers are implemented as scripts with the **`transformer`** tag. You can find examples in the playbook automation task description.
    

###### Transformer categories and built-in transformers

When adding a transformer, clicking the default To upper case (String) field opens a search window showing the available built-in transformers. They are defined by category as follows.

| Transformer category | Description | Built-in transformers |
| --- | --- | --- |
| General | Generic transformers | General built-in transformers
| Name | Description | Example |
| --- | --- | --- |
| Unique | Returns a de-duped version of a list. | **`a, b, a, c, d, a, b`** => **`a, b, c, d`** |
| Slice | Returns part of a specified list in a range of **`from`** index (included) through **`to`** index (not included) **`from`**: Zero based index at which to begin extraction (default: 0). **`to`**: Zero based index before which to end extraction (default: list length). | **`a, b, c, d`** from: **`1,`** to: **`3`** \=> **`b, c`** |
| Slice by item | Returns part of a list specified in a range of from item (included) through to item (not included). **`from`**: Item from which to begin the extraction. If not specified, extracts from the beginning of the list. **`to`**: Item before which to end the extraction. If not specified, extracts from the end of the list. | **`a, b, c, d`** from: **`b, to: d`** \=> **`b, c`** |
| Sort | Sorts an entire list. Supports strings and numbers. descending: **`true`** to sort in descending order, default is false. | **`b, c, a`** => **`a, b, c`** **`2.1, 1.2, 3.4`** descending: **`true`** => **`3.4, 2.1, 1.2`** |
| Get index | Get item at the given index. **`index`**: Index of the item to get. | **`b, c, a`** index: **`0`** =>**`b`** **`b, c, a`** index **`-1`** => **`nil`** |
| Splice | Adds or removes items to/from an array. **`index`**: (required) Zero-based index at which to begin add/remove items. **`deleteCount`**: Number of elements to remove from ‘index’, default is 0. **`item`**: Item to add to the array after ‘index’ position. | **`a, b, c, d,`**index: **`1`** deleteCount: **`2`**\=> **`a, d`** **`a, b, c, d,`** index: **`2`** item: **`w`** => **`a, b, c, w, d`** |
| Index of | Returns the first index of the element in the array, or -1 if not found. **`item`**: Item to locate in the array. **`fromLast`**: **`true`** to get the index from last. (default is false). | **`a, b, a, c, d, a, b,`** item: **`b`** \=> **`1`** **`a, b, a, c, d, a, b,`** item: **`a`** fromLast: **`true`** \=> **`5`** **`a, b, a, c, d, a, b,`** item: **`w`** \=> **`-1`** |
| Get field | Extracts a given field from the given object. **`field`**: (required) The field to extract from the result | **`{“name”: “john”, “color”: “white”} field: “color”`** “white” |
| Stringify | Converts the given item to a string. | **`{ “name”:“john”, “color”: “white” }`** =>**`‘{“name”:“john”,“color”:“white”}’`** |
| Count | Returns the number of elements. | **`b, c, a`** => **`3`** **`null`** => **`0`** **`a`** => **`1`** |
| Join | Concatenates all elements. **`separator`**: Specifies a string to separate each pair of adjacent elements of the array, default is an empty string. | **`b, c, a`** separator: **`,`** \=> **`b,c,a`** **`b, c, a`** \=> **`bca`** |

 |
| String | String transformers \*\*Note:\*\* To make regex case non-sensitive, use the **`(?i)`** prefix (for example **`(?i)yourRegexText`**. | String built-in transformers

| Name | Description | Example |
| --- | --- | --- |
| replace match | Returns a string with some or all matches of a regex pattern, and replaces with a specified string. regex: A regex pattern to be replaced by the replaceWith argument. replaceWith: The string that replaces the string specified in the toReplace argument, default is an empty string.Detailed RegEx syntax can be found at [https://github.com/google/re2/wiki/Syntax](https://github.com/google/re2/wiki/Syntax). | **`pluto,is,not,a,planet regex: “,” replaceWith: “;”`** =>**`“pluto;is;not;a;planet”`** **`“pluto is not a planet”`** regex **`.*to`** replaceWith **`vega`** \=> **`vega is not a planet`** |
| Substring | Returns a subset of a string between one index and another, or through the end of the string. from (required): An integer between 0 and the length of the string, specifying the offset into the string of the first character to include in the returned substring. to (optional): An integer between 0 and the length of the string, which specifies the offset into the string of the first character not to include in the returned substring. | **`pluto is not a planet`** from: **`4`** to: **`10`** => **`o is n`**” |
| Split | Splits a string into an array of strings, using a specified delimiter string to determine where to make each split. delimiter: Specifies the string which denotes the points at which each split should occur, default delimiter is**`,`**. | **`hello world,bye bye world`** => **`hello world, bye bye world`** **`hello world`** delimiter => **`hello, world`** |
| Split & trim | Splits a string into an array of strings and removes whitespace from both ends of the string, using a specified delimiter string to determine where to make each split.Argumentsdelimiter: Specifies the string which denotes the points at which each split should occur (default delimiter is**`”,”)`**. | **`hello & world`** delimiter: **`&`** => **`hello, world`** |
| From string | Returns a subset of a string from the first from string occurrence. from (required): String to substring from. | **`pluto is not a planet`** from: **`pluto is`** => **`not a planet`** |
| To string | Returns a subset of a string until the first to string occurrence. to (required): String to substring until. | **`pluto is not a planet`** to: **`a planet`** => **`pluto is not`** |
| concat | Returns a string concatenated with given prefix and suffix. prefix: A prefix to concat to the start of the argument. suffix: A suffix to concat to the end of the argument. | **`night`** prefix **`good`** => **`good night`** **`night`** suffix **`shift`**\=> **`night shift`** |

 |
| Number | Number transformers | Number built-in transformers

| Name | Description | Example |
| --- | --- | --- |
| Floor | Returns the highest integer less than or equal to the number. | **`1.2`**\=> **`1`** |
| Ceil | Returns the lowest integer greater than or equal to the number. | **`1.2`** =>**`2`** |
| Round | Returns the nearest integer, rounding half way from zero. | **`7.68`** => **`8`** **`2.43`** => **`2`** **`2.5`** => **`3`** |
| Absolute | Returns the absolute value of the given number. | **`-2`** => **`2`** |
| Decimal precision | Truncates the number of digits after the decimal point, according to the by argument. by: Number of digits to keep after the decimal point, default is 0. | **`8.6666`** by: **`2`** => **`8.66`** |
| Modulus (remainder) | The modular operator (%) returns the division remainder. by (required): Modulo by, default:0 | **`20`** by: **`3`**\=> **`2`** |
| To percent | Converts a number to a percent. withsign: Specify true to include %. Default is false | **`0.22`** => **`20`** **`0.22`** withsign: **`true`** =>**`20%`** |
| Quadratic equation | Returns the result of the Quadratic Formula.b (required): The b number of: ax2 + bx + c = 0, default is 0.c (required): The c number of: ax2 + bx + c = 0, default is 0. | **`1`** b: **`3`** c: **`2`**\=> **`-1.00, -2.00`** **`3`** b: **`2`** c: **`4`**\=> **`(-0.333 +1.106i), (-0.333 -1.106i)`** |

 |
| Date | Date transformers | Date built-in transformers

| Name | Description | Example |
| --- | --- | --- |
| Date to string | Converts any date to a specified string format. The date input must be in ISO format. For example, **`2021-10-06T13:44:07`**. The default output format is RFC822. **`format:`** The desired string output format. For example, if you want to convert to RFC822 format, enter **`02 Jan 06 15:04 MST`**. The following are available output format options: Layout = **`01/02 03:04:05PM '06 -0700`** // The reference time, in numerical order; RFC3339Nano = **`2006-01-02T15:04:05.999999999Z07:00`**; Kitchen = **`3:04PM`** // Handy time stamps; Stamp = **`Jan _2 15:04:05`**; StampMilli = **`Jan _2 15:04:05.000`**; StampMicro = **`Jan _2 15:04:05.000000`**; StampNano = **`Jan _2 15:04:05.000000000`** This transformer is in [GO](https://pkg.go.dev/time) language. | **`2021-10-06T13:44:07 => 06 Oct 21 13:44 EDT`** |
| Date to Unix | Converts any date to Unix format. | **`Mon, 02 Jan 2006 15:04:05 MST`** => **`1136214245`** |

Supported time and date formats

| Format | Example |
| --- | --- |
| ANSIC | Tues Jan _2 15:04:05 2019 |
| UnixDate | Tues Jan _2 15:04:05 MST 2019 |
| RubyDate | Tues Jan 02 15:04:05 -0700 2019 |
| RFC822 | 02 Jan 19 15:04 MST |
| RFC822Z | 02 Jan 19 15:04 -0700 // RFC822 with numeric zone |
| RFC850 | Tuesday, 02-Jan-19 15:04:05 MST |
| RFC1123 | Tues, 02 Jan 2019 15:04:05 MST |
| RFC1123Z | Tues, 02 Jan 2019 15:04:05 -0700 // RFC1123 with numeric zone |
| RFC3339 | 2019-01-02T15:04:05Z07:00 |
| RFC3339Nano | 2019-01-02T15:04:05.999999999Z07:00 |
| Kitchen | 3.04PM |
| Stamp | Jan _2 15:04:05 |
| StampMilli | Jan _2 15:04:05.000 |
| StampMicro | Jan _2 15:04:05.000000 |
| StampNano | Jan _2 15:04:05.000000000 |

 |

###### Extend context

Extend context to retrieve specific information from integrations or commands and map to fields.

By design, integrations do not write all of the data returned from a command to the context. This prevents large context size and enables you to store only the most relevant information.

The Extend Context feature enables you to save additional data from the raw response of the command. For example, when a command runs to retrieve events from a SIEM, only some of the event fields are written to context, according to the integration design. With Extend Context, you can save additional fields specific to your use case.

Extend Context can also be used when the same command runs multiple times in the same playbook, but the outputs need to be saved to different context keys. For example, you can execute the **`!ad-get-user`** command twice, once to retrieve the user's information and again to retrieve the user's manager’s information. By default, an integration command writes the data from the same command to the same context key. By using Extend Context, you can write the command’s response to a custom context key of your choice.

You can extend context either in a playbook task or directly from the command line. Whichever method you use, first run your command with the **`raw-response=true`** flag. This helps you identify the information that you want to add to your extended data.

Filter for specific keys from lists of dictionaries

You can use DT to get select keys of interest from a command that returns a list of dictionaries containing many keys. For example, the `findIndicators` automation returns a long list of indicator properties, but you may only be interested in saving the value and the indicator_type to minimize the size of the context data. For more information about DT, [see Cortex XSOAR Transform Language (DT)](https://xsoar.pan.dev/docs/integrations/dt).

Example 55. 

1.  Run the command **`!findIndicators size=2 query="type:IP" raw-response=true`**.
    
    You will see a list of two dictionaries containing 20+ items.
    
2.  Use the following value for extend-context to save only value and indicator_type into a context key called FoundIndicators:
    
    ```
    !findIndicators size=2 query="type:IP" extend-context=\`FoundIndicators=.={"value": val.value, "indicator_type": val.indicator_type}\`
    ```
    
3.  Use the following value for extend-context to save only the issue name, status, and id to a key called FoundIssues:
    
    ```
    !SearchIssuesV2 id=<ANY_ISSUE_ID> extend-context=\`FoundIssues=Contents.data={"name": val.name, "status": val.status, "id": val.id}\` ignore-outputs=true
    ```
    

  

###### Extend context in a playbook task

1.  Go to the **Advanced** tab of the relevant playbook task, such as a Data Collection task.
    
2.  In the Extend Context field, enter the name of the field in which you want the information to appear and the value you want to return. For example, using the **`!ad-get-user`** command, enter **`name="john" attributes=displayname`** to place the user's name in the **`displayName`** key.
    
    The following image shows the result of the **`!IPReuptation ip=20.8.1.5 raw-response=true`** command.
    
    
    
    To include more than one field, separate the fields with a double colon. For example: **`attributes=displayName::manager=attributes.manager`**
    
3.  To output only the values for Extend context and ignore the standard output for the command, select the Ignore Outputs checkbox.
    
    While this will improve performance, only the values that you request in the Extend Context field are returned. You cannot use Field Mapping as there is no output to which to map the fields.
    

###### Extend context using the CLI

1.  Run your command with the extend-context flag **``!_`<commandName>`__`<argumentName> <value>`_extend-context=contextKey=JsonOutputPath``**.
    
    For example, to add the user and manager fields to context use the ad-get-user command, as follows:
    
    **`!ad-get-user=${user.manager.username} extend-context=manager=attributes.manager::attributes=displayName`**
    
2.  To output only the values that you set as Extend context, run the command with the ignore-ouput flag=true. **`!ad-get-user=${user.manager.username} extend-context=manager=attributes.manager::attributes=displayName ignore-output=true`**

###### Extract indicators

Extract indicators from Cortex Cloud issue fields and enrich them with commands and scripts.

In Cortex Cloud, the indicator extraction feature extracts indicators from issue fields and enriches them using commands and scripts.

How to set up indicator extraction in a playbook task

1.  Select the playbook where you want to add indicator extraction, and click Edit.
    
2.  In the playbook, click a task to open the Task Details pane.
    
3.  Click the Advanced tab.
    
4.  For Indicator Extraction mode, select the mode you want to use (default is none).
    
5.  Click OK.
    

###### Indicator extraction modes

Indicator extraction supports the following modes:

-   **None:** Indicators are not extracted automatically. Use this option when you do not want to further evaluate the indicators.
    
-   **Inline:** Indicators are extracted within the context that indicator extraction runs (synchronously). The findings are added to the context data. For example, if indicator extraction for a playbook task is inline, extraction occurs before the next playbook tasks run.
    
    **Note:**
    
    This configuration may delay playbook execution (issue creation).
    
    While indicator creation is asynchronous, indicator extraction and enrichment are run synchronously. Data is placed into the issue context and is available via the context for subsequent tasks.
    
-   **Out of band:** Indicators are extracted in parallel (asynchronously) to other actions. The extracted data will be available within the issue, however, it is not available for immediate use in task inputs or outputs because the information is not available in real-time.
    
    **Note:**
    
    When using out of band, the extracted indicators do not appear in the context. If you want the extracted indicators to appear select inline.
    

###### Troubleshoot indicator extraction

If indicators are not extracted, check whether the indicator mode is set to none. Even if you select the relevant issue fields and the indicators to extract, if the mode is set to none, indicators do not extract.

###### Update issue fields with playbook tasks

Use the setIssue script to set and update all system issue fields.

During the investigation you can set and update issue fields using the setIssue script in a playbook task.

**Note:**

-   The setIssue script includes all available fields; use the scroll bar to see all the fields.
    
-   The `name` field has a limit of 600 characters. If there are more than 600 characters, you can shorten the `name` field to under 600 characters and then include the full information in a long text field such as the `description` field.
    

For more information, see Update issue fields

##### Test your playbook

Set breakpoints, conditional breakpoints, skip tasks, and input and output overrides in the playbook debugger.

The debugger provides a test environment where you can make changes to data and playbook logic and view the results in real-time to test and troubleshoot playbooks. You can see exactly what is written to the context at each step and which indicators are extracted.

To open a detached system playbook, a copy of a system playbook, or a custom playbook in the debugger, select the playbook and click Edit.

To open an attached playbook in the debugger, select the playbook and click View to access the debugger. While editing a playbook, sub-playbooks can be opened directly in the debugger by choosing Open sub-playbook in the task pane.

In some cases, you may have a playbook that includes two or more copies of the same sub-playbook. When you set breakpoints, override inputs or outputs, or skip tasks in sub-playbook A, the same changes apply to the identical sub-playbook B. In addition, if you set a breakpoint, override inputs or outputs, or skip tasks within a loop in a playbook, that setting will be applied every time the loop executes.

Running the debugger involves the following actions.

###### Choose test data

The debugger uses test data to execute the playbook, so you can see what your expected results would be. The following are options for test data.

**Note:**

The debugger does not support using **`parentIncidentFields`**.

1.  **New Mock Issue:** By default, the debugger runs using an empty mock issue. An empty mock issue is useful to test simple functionality, such as a playbook that does simple tasks such as parsing inputs.
    
2.  **Existing Issue:** You can select an existing issue. Using an existing issue in the debugger does not change the original issue. Click the Debugger Panel and in the Test data field, select an existing issue. The last fifty issues appear in the drop-down, as well as any issues you own or are a member of, or that you have participated in.
    
    **Note:**
    
    Using an existing issue in the debugger does not affect the original issue or change the original context data.
    

###### Set a breakpoint

At the breakpoint, you can override inputs and outputs to see how changes affect playbook execution. In addition, conditional breakpoints set conditions for the playbook to proceed. The playbook only pauses if your condition is met, letting you manipulate data to see how different scenarios impact how the playbook runs. For example, you can set a conditional breakpoint to pause the playbook when a phishing issue targets a member of a VIP asset list. If there are no VIPs in this issue, the execution does not pause. If there is a VIP in the issue, you can check that the member was properly identified by the playbook task.

Breakpoints do not apply to manual tasks, as a manual task will always pause the playbook run unless you skip the manual task. When the playbook reaches a breakpoint, no new tasks begin, but parallel tasks that have already begun continue. Breakpoints can be set in both the parent playbook and sub-playbooks.

1.  To set a breakpoint, go to a task and click on the breakpoint button. When a breakpoint is set, the breakpoint button changes to orange.
    
    
    
2.  After a breakpoint is reached, click the task to override inputs and outputs if needed.
    
3.  When you are finished with the task, run the debugger, and in the task, select an option for the playbook to continue.
    
    For an automated task, you have the options Run automation now or Complete Manually. If you choose Complete Manually, click on Mark Completed for the playbook to continue.
    
    For a task that is a sub-playbook, click Run playbook now for the playbook to continue.
    
    For a conditional task, choose which branch the playbook should follow and click Mark Completed for the playbook to continue. The default branch is else.
    
    When the playbook reaches a breakpoint, the task has an orange line at the top to indicate the breakpoint.
    
    
    
    Breakpoint alerts are also displayed at the top of the playbook, enabling you to navigate between multiple breakpoints that have been reached in the playbook or sub-playbooks.
    

###### Start and stop the debugger

The debugger runs the playbook with the permissions of the logged in user. If a user runs potentially harmful commands, they are logged to the audit trail with the user’s username. When the user sets breakpoints, skips tasks, or overrides inputs or outputs, those changes only apply to the individual user’s session and do not permanently change the playbook. Using an existing issue as test data does not affect the original issue or change the original context data. When tasks run, however, they execute the same as they would without the debugger. For example, if you run the debugger and a task adds an item to a list, that item will be in the real list, accessible across for all users with permission to view that list.

Breakpoints pause playbook execution before a specific task. When the playbook is paused, the Debugger Panel displays the current state of context data, indicators, and task information.

To start the debugger, click Run. When you click Stop, the debugger stops, and the context data is reset to the original issue data. In the case of a new mock issue, the context data is cleared and the context is empty. Any breakpoints, skips, or overrides you applied are still available.

###### Override inputs and outputs

The debugger enables you to temporarily override inputs and outputs for a playbook run and to view the results in real time. When you override an input or output in the debugger, the change is saved only in the debugger view and only for the user who made the change. If after testing you decide to keep the temporary changes you made and apply them permanently to the playbook for all users, you need to cancel the override and edit the task. Tasks can be edited directly in the debugger or outside of the debugger using the standard playbook editing options.

You can override task inputs or outputs before or during a playbook run to troubleshoot tasks that fail or to try different input and outputs as part of playbook development. If you override an input or output during a playbook run, the override is applied to the run if the playbook has not yet reached that task. If you edit (permanently change) inputs during a playbook run, the changes only take effect the next time you run the playbook. You cannot use filters or transformers for overrides.

1.  To override an input or output, open the task and hover over any existing input or output. Click Override Input.
    
    
    
2.  Enter a new input or output that will be used only in the debugger. For output overrides, you can enter a value, an array of values, or JSON. For input overrides, you can only enter plain text.
    
3.  Click OK to save your changes.
    
    The playbook task card displays a label indicating that the task input or output has been overridden.
    

###### Skip tasks

For testing purposes, you may want to skip a task that for example closes a port in a firewall, deletes an email, or sends a notification to a manager. Or you might skip a task where the integration has not yet been configured. By skipping a task and overriding the output, you can provide the data necessary to complete the playbook run. When you skip a conditional task, you can choose which branch runs after the skipped task, enabling you to test different outcomes for multiple branches.

You might need to skip tasks within a playbook:

-   To check if a particular task is causing an issue.
    
-   To avoid performing tasks not relevant for your troubleshooting.
    
-   To skip tasks with potentially harmful results such as blocking a user or opening a port in a firewall.
    
-   To skip tasks for integrations that are not yet configured.
    

How to skip a task

1.  Click the ‘skip’ button for the task.
    
    When a task is set to skip, the ‘skip’ button will be orange.
    
    
    
2.  If the output is required for the playbook to proceed, click the task and override inputs and outputs.
    

###### View context data, indicators, and task information

Within the debugger panel, you can view the context data during the playbook run as well as the indicators as they are extracted by clicking any completed task in the playbook while the debugger is running.

You can see the results of that task in the debugger panel.

###### Troubleshoot playbook performance

Obtain playbook metadata to troubleshoot performance issues.

You can analyze playbook metadata such as task inputs and outputs, the amount of storage each task input/output uses, and the type of task. This is useful when troubleshooting your custom playbook if your system has slowed down and is using high CPU usage, memory, or storage (disk space).

Get data from XQL datasets

You can leverage XQL for flexible and adjustable playbook and script tracking to provide performance and execution data for debugging. The following datasets are available for querying and dashboards:

-   playbook_tasks: Data about task executions within playbooks.
    
-   playbook_runs: Data about playbook runs and statuses.
    
-   scripts_and_commands_metrics: Data about scripts and commands used in playbook tasks.
    

Get playbook metadata using the CLI

After an issue has been assigned to a playbook you can analyze it to see its tasks inputs/outputs storage. You can filter the data according to the KB used in each task input/output.

From the Cases & Issues → Cases page, in the Case War Room tab the following command in the CLI.

``!getInvPlaybookMetaData issueId=_`<issue ID>`_ minSize=_`<size of the data you want to return in KB. Default is 10>`_``

To view the playbook metadata that is used in issue number 964, in the CLI type `!getInvPlaybookMetaData incidentid=”964” minSize=”0”!getInvPlaybookMetaData incidentid=”964” minSize=”0”.`

Use the Troubleshooting Playbooks dashboard

From the Troubleshooting Playbooks dashboard, you can view playbook and task errors, average playbook run time, and execution by status for manual and automated tasks. You can also pivot to the XQL view for more detailed data analysis.

Increase the execution timeout for AI prompt tasks

AI prompt tasks have a default execution timeout of 10 seconds. If an AI prompt task returns a **`504 Error`** with the status **`DEADLINE_EXCEEDED`**, it is likely due to the task requiring more time to process than the default setting allows. To resolve this, open the Task Details pane of the AI task and select the Advanced tab, then increase the Execution timeout (seconds) value based on the complexity of the prompt and the expected length of the LLM response. For example, for complex tasks such as generating a full vulnerability report, you many need to increase the timeout from the 10 second default to 120 seconds or higher.

##### Manage playbook content

Manage playbook content and avoid concurrent playbook editing.

###### Save versions of your playbook in Cortex Cloud

You can save versions of a playbook as you are developing it. When you save a version of a playbook, add a meaningful comment so that you will be able to recognize the changes you made in that version at a later time. The version is saved with the name of the playbook, your commit message, an indication of what the change was (modify, insert), the date the playbook was saved, and the name of the author who last saved it. If necessary, you can access the playbook’s version history and revert your playbook to a previous version.

1.  In a playbook, after making changes, click the list next to Save Playbook and then click Save version for current Playbook.
    
    
    
2.  Enter a description of the change that was made to the current version.
    
3.  Click Update Playbook.
    
4.  To access a version of a playbook:
    
    1.  Click the icon next to New Playbook. The tooltip displays Version history for all Playbooks.
        
        
        
    2.  Search for the required playbook. The description that was entered when the version was saved should help you locate the version you now require.
        
    3.  Click Restore to restore the required version of the playbook.
        

###### Playbook editing conflict management

If multiple users simultaneously attempt to edit the same playbook, they could overwrite each other's changes in the playbook editor. To prevent users from accidentally losing their work, the playbook editor only allows the first user to edit and save. Subsequent users are automatically placed in View Mode Only, and a banner in the playbook editor clearly shows who is currently editing the playbook. The subsequent users can still view, debug, run, duplicate, and download the playbook.

**Note:**

Opening a playbook does not immediately lock it. A playbook is considered to be in edit mode only when a user makes a modification that causes the Save button to become available.

The playbook is automatically unlocked when the user currently editing the playbook saves the playbook, closes the editor, logs out, or when their session expires. In addition, users with playbook View/Edit and Unlock permission can click Unlock in the banner on the Playbooks page or directly in the playbook editor to force-unlock the playbook.

**Important:**

Manually unlocking a playbook may cause version conflicts. This turns off concurrent editing protection, and if the original user is still editing, their changes might be lost or overwritten.

The playbook Unlock permission is located under Settings → Configurations → Access Management → Roles. Edit a role and go to Investigation & Response → Automations → Playbooks. Ensure you have View/Edit permissions selected.

##### Best practices

Best practices for building and working with playbooks.

The following guidelines are best practices for building playbooks as well as optimizing playbook design and performance. Whether you are just starting or are creating advanced workflows, we recommend reviewing these recommendations carefully so your playbooks have a clear logical flow and run correctly and efficiently.

###### Best practices for building your playbook

Use clear task names and descriptions

Describe tasks clearly. Tasks should be clear to someone not familiar with the playbook workflow. This applies to task names, task descriptions, and the playbook description. When naming tasks, the guideline should be that users can understand what the playbook does by reading the task names, without having to open individual tasks to view the details.

| Clear | Unclear |
| --- | --- |
| Task name: Check if the IP is Private | Task name: IP Check |

Define playbook inputs and outputs properly

-   **Group related input fields**.
    
    Grouping inputs organizes the input fields and provides clarity and context to understand which inputs are relevant to which playbook flow.
    
-   **Use Pascal case for input names**.
    
    Use the PascalCase convention for inputs, keeping in mind that inherently capitalized terms should be kept in upper case. For example, the `Entity ID` input should be named `EntityID` and `MITRE Technique` should be `MITRETechnique`.
    
-   **Define outputs properly**.
    
    When configuring playbook outputs, configure sub-keys as much as possible, do not limit configuration to only the root keys. For example, instead of outputting `File`, output `File.Name`, `File.Size`, etc. This helps when viewing the outputs of the playbook within another playbook.
    

Configure playbook task inputs correctly

-   **Avoid using Cortex Cloud Transform Language (DT) in the Get input field definition**.
    
    If you need to use [DT](https://xsoar.pan.dev/docs/integrations/dt) for complex processing and you think a new filter or transformer would provide a better alternative to your DT solution, you can request the feature or contribute it. Consider using DT only if it can drastically simplify the playbook or improve performance.
    

Define playbook logic carefully

In each task, make sure appropriate logical operations are performed on input data. For example:

-   **Avoid race conditions**.
    
    Be aware of potential race conditions. When you want to add multiple values to the same key, do not use multiple tasks that run `Set`, `SetAndHandleEmpty`, or any other script that sets data in context at the same time, because a race condition can cause your data to be overwritten by the same tasks. This is especially problematic when trying to append data. Instead, run the tasks one after the other or use scripts to append the data instead of setting a new value to the key.
    
-   **Determine where inputs are coming from**.
    
    Verify whether the data you're getting is `As value` (simple value) or `From Previous Tasks` (from context).
    
-   **Filter your inputs correctly so the task runs efficiently**.
    
    Tasks take their inputs from the context, not directly from the previous tasks (even if it says from previous tasks). For an example of a task not receiving the right context, see this bug (since fixed) in a playbook:
    
    
    
    The playbook begins by classifying the emails as internal or external. It then checks the reputation of external email addresses if any were found. That happens on the right side of the image. We expect that branch to run only if external addresses are found.
    
    
    
    However, we did not apply a filter to the last task that gets the reputation on the right side:
    
    This means that if both internal and external email addresses are found, we proceed with both branches (internal and external) of the playbook, and the task that gets the reputation runs without an applied filter, effectively taking all the emails we have in the inputs. The correct task input should have been:
    
    
    
-   **Select Ignore case for input names**.
    
    Use `ignore-case` option where possible, especially when checking Boolean playbook inputs such as `True` which users may end up configuring as `true` with a lowercase t:
    
    
    
-   When working with two lists, if you need multiple items from list A, which are also in list B, use the `in` filter instead of the `equals` or `contains` filters.
    
    | Correct Method | Incorrect Method |
    | --- | --- |
    | Get the IP addresses that `are in` the list of inputs.  | Get the IP addresses where the addresses `contain` the list. This is incorrect because they don't contain the list, they contain individual items from it. |
    
-   Differentiate between checking if `a specific element exists` versus checking if `an` element equals something. This is a common mistake that can lead to tests working in some situations, but not all.
    
    | Correct Method | Incorrect Method |
    | --- | --- |
    | Check if `any object` where the NetworkType is External `exists`.  | Check if the NetworkType `of the IP object is External`. This is incorrect because the IP object may contain multiple IPs, some internal and some external.  |
    
-   Run `one or more tasks` based on the `object types` versus running `either one task or the other` based on `the type of one object`.
    
    | Correct Method | Incorrect Method |
    | --- | --- |
    | Check the existence of both object types and run tasks for the types found.  | Check if there is either an internal or an external IP, and take only one path even if both types exist.  |
    

Define playbook loops correctly

Use playbook loops only where needed. Loops are needed when certain actions have to be performed on specific pairs of data.

| Correct Method Example | Incorrect Method Example |
| --- | --- |
| Either use filters and transformers or loop through each separate indicator to verify they're creating the correct relationships. | A user has a playbook that creates relationships for multiple indicator types. All indicator types and malware families are in their `${inputs.Domain}` and `${inputs.MFam}` playbook inputs. The user wrongly assumes that when creating the relationships, the correct malware families in `${inputs.MFam}` correspond to the correct domains in ${inputs.Domain}.  |

###### Best practices for optimizing playbook design and performance

In order to minimize your case response time and make sure the system runs optimally, it's important to follow design and performance guidelines.

Use latest playbook and script versions

Playbooks

When returning to work on a playbook after a break, verify you’re working on the latest version. Reattach the playbook if it’s detached, and update it to ensure you’re not editing an older version and introducing regressions. If you don’t want to reattach your playbook, or you’re still working on your custom version, we recommend reviewing the release notes to see what changes were made to the out-of-the-box playbook and copying those changes to your version.

**Note:**

If you reattach a detached playbook, any customizations you have made to the playbook will be overwritten when the playbook updates to the current version.

Scripts

Update scripts and integration commands in playbook tasks to their most current version. Scripts that have updates or are deprecated are designated by a yellow triangle.

Break up large playbooks into sub-playbooks

If a playbook has more than thirty tasks, consider breaking the tasks into multiple sub-playbooks. Sub-playbooks can be reused, managed easily when upgrading, and they make it easier to follow the main playbook.

Sub-playbooks are playbooks that are used from within a parent playbook, as building blocks. The parent playbook is the main playbook that runs on the investigation, and each sub-playbook has a specific goal/responsibility.

-   Parent playbooks usually have a `closeInvestigation` task at the end because they are the main playbook for that issue.
    
-   Parent playbooks usually contain inputs that are passed down to sub-playbooks. Certain `True`/`False` flags may come from the parent playbook inputs.
    

Remove unused playbook tasks

For production playbooks, remove playbook tasks that are not connected to the playbook workflow.

Set the playbook to run in quiet mode

Run playbooks in quiet mode to reduce the issue number size and execute playbooks faster.

Only extract indicators when needed

When indicator extraction is enabled for a playbook task, the task by default tries to extract all indicator types from the task Results. (The Results entry is the information printed to the War Room, not the outputs of the task). Extracting all indicator types can slow down the playbook, so it is important to only extract indicators as needed. For example, for the ParseEmailFilesV2 script which prints email information to the War Room, extraction should be enabled in order to extract email addresses, URLs, and other indicators. However, if your task runs the Sleep script, there is no point in extracting indicators.

Set the Indicator Extraction mode to None in the playbook task Advanced tab.

Use retries

Retries help ensure smoother playbook execution and more efficient progress tracking.

Use retries when a task might temporarily fail but is expected to succeed later. This helps handle issues like network glitches, service downtime, or rate limits by retrying the task again after a short wait.

**Note:**

Retries are not supported for data collection tasks that have errors sending emails (indicated by a server timeout). This is because retries only work on automation execution failures, not on email delivery issues.

Minimize disk usage, CPU usage, and API calls

Consider the following:

-   Do I need to do this action in multiple tasks?
    
-   Can these tasks run in parallel instead of synchronously?
    
-   Where applicable, am I setting realistic timeouts, search windows, intervals?
    
-   Can I consolidate the API calls into one call? If not, can an integration enhancement solve this by accepting arrays as input instead of running multiple times for each input?
    
-   Am I unnecessarily storing the same data twice? Do I have the data I need already stored?
    
-   Where applicable, can I run this playbook without a loop?
    
-   What extractions are running in my issue?
    

Get data from XQL datasets

You can leverage XQL for flexible and adjustable playbook and script tracking to provide performance and execution data. The following datasets are available for querying and dashboards:

-   playbook_tasks: Data about task executions within playbooks.
    
-   playbook_runs: Data about playbook runs and statuses.
    
-   scripts_and_commands_metrics: Data about scripts and commands used in playbook tasks.

#### AI Prompts
On the AI Prompts page (Investigation → Response → Automation → AI Prompts), you can view, edit, and manually create prompts.

##### AI prompts role-based access control

Configure permissions to access AI prompts.

Instance and Account admins have full control over the permissions and access that users have to AI prompts. Cortex Cloud uses role-based access control (RBAC) to manage access to the AI prompts library, as well as access to create, edit and delete prompts in the prompts library and in the playbook editor.

By default, Instance and Account admins have full view/edit permissions enabled. When editing or creating other roles, in the CORTEX AGENTIC ASSISTANT section, you can enable AI Prompts. If you enable the feature for a role, the user can view prompts in the AI prompts library. In addition, after enabling AI Prompts, you can select the following:

| Permission | Description |
| --- | --- |
| Manage prompts library | When selected, the user role can create, edit, and delete prompts in the AI prompts library. |
| Manage prompts in playbook editor | When selected, the user role can create and edit AI prompts in the playbook editor. |

##### Use existing prompts

Edit prompts to use in playbooks and run in the War Room.

Using an existing prompt allows you to quickly achieve reliable results by leveraging proven, pre-built instructions instead of starting from scratch. You can access the existing prompts from the Prompts Library, a centralized repository that helps you create, search, and edit your AI prompts. It enables turning prompts into reusable assets that can be shared across your organization and bring repeatability and control to your AI operations. The Prompts Library provides a dedicated space for organizing prompts across all your playbooks or for registering them as Actions and assigning them to Agents, and is particularly useful for managing long and complex prompts.

1.  Navigate to Investigation & Response → Automation → AI Prompts and in the Prompts Library search for the prompt you want to use.
    
    -   Use free text in the search box to find an existing prompt. From the Basic dropdown, you can search for a prompt by Basic (name and tag), Name, or Tag.
        
    -   You can search for an exact match of the prompt name by putting quotation marks around the search text. For example, searching for **`"VulnerabilityReportSummary"`** returns the prompt with that name. You can search for more than one exact match by including the logical operator "or" in between your search texts in quotation marks. For example, searching for **`"IssueSummaryAndRemediation" or "VulnerabilityReportSummary"`** returns the two prompts with those names. Wildcards are not supported in free text search.
        
    -   You can sort the prompts in the library alphabetically, by modified date, by system, or custom, and you can filter for disabled or deprecated prompts.
        
    -   The Prompt Helper also provides a list of prompt writing tips, including:
        
        Be clear and specific
        
        Tell the AI exactly what you need.
        
        Imagine you're asking a new team member for help – the more precise you are, the better they can assist. The same goes for our AI!
        
        -   What to do: Instead of vague questions like "Tell me about malware," try to be very specific. Think about:
            
            -   The goal: What do you want to achieve? (for example, "Summarize," "Identify," "Explain," "Generate ideas")
                
            -   The topic: What is the subject? (for example, "Phishing emails," "Vulnerability reports," "Security policies")
                
            -   Any details: What specific information is important? (for example, "From last week's incidents," "For non-technical executives," "Highlighting critical threats")
                
            
        -   Examples:
            
            -   Bad prompt: "Tell me about that virus ${VirusName}."
                
            -   Good prompt: "Analyze the attached malware report from ${Path} and summarize the key indicators of compromise (IOCs) for our incident response team."
                
            
        
        Provide context and background
        
        Give the AI the full picture.
        
        Our AI doesn't know everything about your specific situation. Giving it background information helps it understand the "why" behind your request.
        
        -   What to do: Include relevant details that help the AI understand the situation or your specific needs.
            
            -   Role: Tell the AI to act as a specific persona (for example, "Act as a security analyst," "You are a CISO," "As a technical writer"). This helps it tailor its language and focus.
                
            -   Audience: Who is the information for? (for example, "For a technical audience," "For a board meeting," "For a general user"). This influences the complexity and depth of the response.
                
            -   Key Information: What specific data points or previous steps are relevant? (for example, "Based on the recent network scan results," "Considering the new compliance regulations").
                
            
        -   Examples:
            
            -   Bad prompt: "Write a report."
                
            -   Good prompt:"You are a cybersecurity consultant. Write a brief executive summary report for our CEO detailing the top three critical vulnerabilities identified in our recent penetration test report from ${Path} and suggest immediate actions."
                
            
        
        Ask for the desired format
        
        Guide the AI's output structure.
        
        If you have a specific way you want the information presented, tell the AI upfront. This saves you time on reformatting.
        
        -   What to do: Clearly state how you want the AI's response to be structured.
            
            -   Lists: "Provide a bulleted list of..." or "Give me 5 key points."
                
            -   Tables: "Create a table with columns for [X], [Y], and [Z]."
                
            -   Summaries/reports: "Generate a concise summary," "Draft a formal report," or "Write a brief email."
                
            -   Length: "Keep it under 200 words," or "Provide a detailed analysis."
                
            
        -   Examples:
            
            -   Bad Prompt: "What are the latest threats?
                
            -   "Good Prompt: "List the top 5 emerging cyber threats relevant to financial services, with a brief explanation for each, presented as a bulleted list."
                
            
        
        Few-shot prompting
        
        Use few-shot prompting when you need the AI prompt to learn a new pattern or format quickly without extensive fine-tuning, especially for tasks with limited data.
        
        -   What to do: Provide several examples of the desired input and output to guide the AI's response.
            
        -   Examples of good prompts:
            
            "You are a SOC analyst that needs to enrich CVE ${CVEId} , use the following structure:"
            
            Sample structures:
            
            -   CVE Description: Apache Struts 2.5.x before 2.5.14, 2.3.x before 2.3.34, and 2.x.x before 2.3.x.x.x.x allows remote attackers to execute arbitrary code via a crafted Content-Type header.
                
            -   CVSS:9.8 (Critical)Impact: Remote Code Execution (RCE), potential for complete system compromise, data theft, and denial of service. Affects web applications built with Apache Struts, widely used in enterprise environments.
                
            -   Risk Score: 10/10 - Extremely High. Exploitability is high due to public exploits and widespread usage of the affected software.
                
            -   CVE Description: Microsoft Windows MSHTML Remote Code Execution Vulnerability. This vulnerability exists in the way MSHTML engine handles specially crafted files. An attacker could host a specially crafted website or send a specially crafted document that, when opened, could allow remote code execution.
                
            -   CVSS:8.8 (High)Impact: Remote Code Execution (RCE), arbitrary code execution in the context of the current user. Affects all Windows versions. Could lead to system compromise and data exfiltration. Often exploited via phishing campaigns.
                
            -   Risk Score: 9/10 - Very High. Widespread target, often exploited through user interaction, making it a common attack vector.
                
            
        
    
2.  Click Edit. If the prompt you want to use is locked, click ⋮ and then select Duplicate Prompt.
    
    System prompts, are by default locked, which means they are not editable. To edit a system prompt, you need to make a copy.
    
3.  Edit the prompt and settings as needed.
    
    For details about prompt settings, see Create a prompt.
    
4.  (Recommended) Click Optimize to optimize and improve the prompt edits based on predefined system guidelines.
    
    The suggested prompt replaces the existing one. You can undo the optimization if needed.
    
5.  Save the prompt version.
    
6.  (Recommended) Click Test to validate your prompt.
    
    1.  In the Arguments section, provide values for any inputs your prompt requires. These inputs are used to simulate how the prompt will behave in a live playbook, or how the prompt as an Action for an Agent will run as part of an executed plan.
        
        You can add input values manually.
        
    2.  Click Run.
        
        The tests are executed in a Playground environment. Review the output generated by the AI to validate the prompt's behavior and ensure it produces the expected results. The output is typically a text summary or another structured format that you have defined.
        
        In each run result, you can take the following actions:
        
        | Action | Description |
        | --- | --- |
        | Mark as note | Marks the entry as a note, which can help you understand why certain action was taken and assist future decisions. When marked as a note, it is highlighted, so you can easily find it in the War Room or the Issue Overview tab. |
        | View artifact in new tab | Opens a new tab for the artifact. |
        | Download artifact | Downloads the run details to a text file, including the AI task name,, the prompt name, user name and password, and the result. |
        | Add tags | Add any relevant tags to use that help you find relevant information. |
        
    
7.  (Optional) Click ⋮ and select Register new Action to register the prompt as an Action and make it available for Agents. For more information, see Manage actions.Manage actions
    
8.  (Optional) Add the prompt to a playbook.
    
    1.  Edit or create a playbook.
        
    2.  In the playbook editor, expand the Task Library and select AI Prompts.
        
        The System tab contains system prompts, and the Custom tab contains custom prompts.
        
    3.  Select the relevant prompt and drag it onto the playbook editor.
        
        The Task Details pane opens for the prompt. You can view system prompt details, and you can view and edit custom prompt details.
        
    4.  Click OK.
        
        The prompt appears in the playbook editor.

##### Create a prompt

Create or edit an out-of-the-box prompt, including detach and attach and automation settings.

Creating a prompt enables you to turn your own custom requests into reusable, shareable AI prompts in playbooks and as Actions for Agents.

1.  Navigate to Investigation & Response → Automation → AI Prompts and click \+ New Prompt.
    
2.  Add an identifying name for the prompt.
    
3.  Save the prompt.
    
4.  Enter prompt settings.
    
    Basic settings
    
    Define the relevant basic prompt parameters.
    
    | Parameter | Description |
    | --- | --- |
    | Name | An identifying name for the prompt. |
    | Description | A meaningful description of the prompt. If you want to register the prompt as an action, make the description as detailed as possible. For example, for the Cortex - Blocklist Files action, the description is: Blocklists the specified SHA256 file hashes in Cortex by adding them to Cortex's blocklist. Skips any that already exist in Cortex's allowlist or blocklist. Optionally returns detailed results with counts of added and skipped hashes. |
    | Tags | Predefined prompt identifiers. For example, if a prompt is intended for phishing, tagging it with the phishing tag helps organize, classify, and manage the prompt among other prompts. |
    
    Advanced settings
    
    Define settings to help optimize your prompt.
    
    | Parameter | Description |
    | --- | --- |
    | Temperature | Temperature enables customizing for pinpoint accuracy or diverse outputs by controlling the randomness of AI responses. The value must be between 0 and 2. Lower values (0-0.3) produce more focused, deterministic responses. Higher values (0.7-2) produce more creative, varied responses. You can set the value by entering a number or by adjusting the number on a slider. |
    | Max Output Tokens | Max Output Tokens ensure responses adhere to specific length constraints by setting the maximum number of tokens the AI model can generate in response. Default is 2500 tokens. You can set the value by entering a number or by adjusting the number on a slider. |
    
5.  Enter the prompt in the Prompt pane as well as any relevant inputs.
    
    Inputs can be set with either context path or specific value. You can choose whether the input is a variable using ${<input name>}.
    
    The Prompt Helper also provides a list of prompt writing tips, including:
    
    Be clear and specific
    
    Tell the AI exactly what you need.
    
    Imagine you're asking a new team member for help – the more precise you are, the better they can assist. The same goes for our AI!
    
    -   What to do: Instead of vague questions like "Tell me about malware," try to be very specific. Think about:
        
        -   The goal: What do you want to achieve? (for example, "Summarize," "Identify," "Explain," "Generate ideas")
            
        -   The topic: What is the subject? (for example, "Phishing emails," "Vulnerability reports," "Security policies")
            
        -   Any details: What specific information is important? (for example, "From last week's incidents," "For non-technical executives," "Highlighting critical threats")
            
        
    -   Examples:
        
        -   Bad prompt: "Tell me about that virus ${VirusName}."
            
        -   Good prompt: "Analyze the attached malware report from ${Path} and summarize the key indicators of compromise (IOCs) for our incident response team."
            
        
    
    Provide context and background
    
    Give the AI the full picture.
    
    Our AI doesn't know everything about your specific situation. Giving it background information helps it understand the "why" behind your request.
    
    -   What to do: Include relevant details that help the AI understand the situation or your specific needs.
        
        -   Role: Tell the AI to act as a specific persona (for example, "Act as a security analyst," "You are a CISO," "As a technical writer"). This helps it tailor its language and focus.
            
        -   Audience: Who is the information for? (for example, "For a technical audience," "For a board meeting," "For a general user"). This influences the complexity and depth of the response.
            
        -   Key Information: What specific data points or previous steps are relevant? (for example, "Based on the recent network scan results," "Considering the new compliance regulations").
            
        
    -   Examples:
        
        -   Bad prompt: "Write a report."
            
        -   Good prompt:"You are a cybersecurity consultant. Write a brief executive summary report for our CEO detailing the top three critical vulnerabilities identified in our recent penetration test report from ${Path} and suggest immediate actions."
            
        
    
    Ask for the desired format
    
    Guide the AI's output structure.
    
    If you have a specific way you want the information presented, tell the AI upfront. This saves you time on reformatting.
    
    -   What to do: Clearly state how you want the AI's response to be structured.
        
        -   Lists: "Provide a bulleted list of..." or "Give me 5 key points."
            
        -   Tables: "Create a table with columns for [X], [Y], and [Z]."
            
        -   Summaries/reports: "Generate a concise summary," "Draft a formal report," or "Write a brief email."
            
        -   Length: "Keep it under 200 words," or "Provide a detailed analysis."
            
        
    -   Examples:
        
        -   Bad Prompt: "What are the latest threats?
            
        -   "Good Prompt: "List the top 5 emerging cyber threats relevant to financial services, with a brief explanation for each, presented as a bulleted list."
            
        
    
    Few-shot prompting
    
    Use few-shot prompting when you need the AI prompt task to learn a new pattern or format quickly without extensive fine-tuning, especially for tasks with limited data.
    
    -   What to do: Provide several examples of the desired input and output to guide the AI's response.
        
    -   Examples of good prompts:
        
        "You are a SOC analyst that needs to enrich CVE ${CVEId} , use the following structure:"
        
        Sample structures:
        
        -   CVE Description: Apache Struts 2.5.x before 2.5.14, 2.3.x before 2.3.34, and 2.x.x before 2.3.x.x.x.x allows remote attackers to execute arbitrary code via a crafted Content-Type header.
            
        -   CVSS:9.8 (Critical)Impact: Remote Code Execution (RCE), potential for complete system compromise, data theft, and denial of service. Affects web applications built with Apache Struts, widely used in enterprise environments.
            
        -   Risk Score: 10/10 - Extremely High. Exploitability is high due to public exploits and widespread usage of the affected software.
            
        -   CVE Description: Microsoft Windows MSHTML Remote Code Execution Vulnerability. This vulnerability exists in the way MSHTML engine handles specially crafted files. An attacker could host a specially crafted website or send a specially crafted document that, when opened, could allow remote code execution.
            
        -   CVSS:8.8 (High)Impact: Remote Code Execution (RCE), arbitrary code execution in the context of the current user. Affects all Windows versions. Could lead to system compromise and data exfiltration. Often exploited via phishing campaigns.
            
        -   Risk Score: 9/10 - Very High. Widespread target, often exploited through user interaction, making it a common attack vector.
            
        
    
6.  (Optional) Click Optimize to optimize and improve the prompt based on predefined system guidelines.
    
    The suggested prompt replaces the existing one. You can undo the optimization if needed.
    
7.  Click Save Version to save the prompt version.
    
8.  (Recommended) Click Test to validate your prompt.
    
    1.  In the Arguments section, provide values for any inputs your prompt requires. These inputs are used to simulate how the prompt will behave in a live playbook, or how the prompt as an Action for an Agent will run as part of an executed plan.
        
        You can add input values manually.
        
    2.  Click Run.
        
        The tests are executed in a Playground environment. Review the output generated by the AI to validate the prompt's behavior and ensure it produces the expected results. The output is typically a text summary or another structured format that you have defined.
        
    
9.  (Optional) Click ⋮ and select Register new Action to register the prompt as an Action and make it available for Agents. For more information, see Manage actions.Manage actions
    
10.  (Optional) Add the prompt as an AI prompt task to a playbook.
     
     1.  Edit or create a playbook.
         
     2.  In the playbook editor, expand the Task Library and select AI Prompts.
         
         The System tab contains system AI prompt tasks, and the Custom tab contains custom AI prompt tasks.
         
     3.  Select the relevant AI prompt task and drag it onto the playbook editor.
         
         The Task Details pane opens with the prompt appearing in the Prompt field.
         
     4.  Click OK.
         
         The prompt appears in the playbook editor.

#### Create an automation rule

Learn how to create an automation rule for an issue.

Automation rules allow users to automatically respond to events by defining trigger conditions and desired actions to perform once the condition is met.

**Important:**

Automation rules apply to Medium and higher severity issues. They also apply to Low severity Analytic issues and Low severity ABIOC issues that are tagged with Identity or Cloud.

Rules are evaluated in order, and only the first rule that matches the trigger conditions is executed.

The rules consist of three parts: WHEN, IF, and THEN.

-   WHEN: Stands for the trigger type, for instance, issue, case, or audit log. WHEN is set to Issue is created.
    
-   IF: Stands for the conditions that need to be met for the rule to run.
    
-   THEN: The action that the user wants to perform: playbook or Quick action.
    

In the Automation Rules page, you can create or edit an automation rule, use recommended automation rules, edit a playbook, and change the order of priority. You can also delete or disable/enable an automation rule. When you disable an automation rule, the automation does not run for the selected condition.

**Note:**

You can also define the conditions that trigger a specific playbook in the playbook editor. For more information, see Task 2. Configure playbook settings

Create or edit an automation rule

Create an automation rule for issues where conditions from the automation rule are met, so that the automation, whether it is a Quick Action or a playbook, automatically runs.

1.  Go Investigation & Response → Automation → Automation Rules.
    
2.  Click Add Automation Rule or right-click a rule, select Edit rule, or click the edit button.
    
3.  Define the rule name and conditions:
    
    1.  Enter a rule name and set the rule status.
        
    2.  Under Rule Conditions:
        
        -   For If, click +Add Condition and from the Issues table, use the filter to set the criteria for the rule, and then click Save.
            
            For example, filter the field Severity, and then select the value Critical. The Issues table returns all issues where the severity=critical.
            
        -   For Then, click +Add Automation and from the Select Automations window, select the action you want to run.
            
            You can search for the action or select a Quick Actions or a Playbook from the Org Playbooks or from the Playbook Catalog.
            
            **Note:**
            
            Quick Actions, by default, run using all available integration instances that contain the command. When selecting a Quick Action for an automation rule, you can instead choose one specific integration instance to use.
            
            Click  to view the description and the tasks of the playbook.
            
            For example, for the IF condition where severity=critical, select the Quick Action - Create Jira Ticket. The automation rule is triggered when a critical severity issue is detected, which then runs the selected automation, the Quick Action - Create Jira Ticket.
            
            For more information on Quick Actions, see Quick Actions.
            
            For more information on Playbooks, see Manage playbooks.
            
        
    3.  Save the automation rule.
        
    

Add a recommended automation rule

You can add automation rules recommended by Cortex Cloud.

1.  Go to Investigation & Response → Automation → Automation Rules.
    
2.  Click View Recommendations.
    
3.  In the Automation Rule Recommendations table, view and select the required recommended automation rules to add to the Automation Rules table.
    
    For playbooks, you can click the playbook name to preview. For Quick Actions, you can view the description and available parameters.
    
4.  Click Add Selected rules.
    
5.  Verify the order of the automation rule and change the order (if required),
    
6.  Save the changes to the Automation Rules table.
    

After you create an automation rule, the rule is added to the Automation Rules table. In the Automation Rules table, you can do the following:

-   Set the priority of the automation rules, so when an issue is created, the first rule takes priority, then the second, third, etc. Only the first matching rule is executed.
    
    New rules created manually are added to the bottom of the table.
    
-   View details of the automation rules that have been created.
    
    By default, you can see the condition, automation, and the creation dates and source. You can add columns and filters as required. To edit, disable, or delete an automation rule, right-click on the rule.
    

Scope-based access control for automation rules

Automation rules support SBAC (scope-based access control). The following parameters are considered when editing a rule:

-   If Scope-Based Access Control (SBAC) is enabled and Endpoint Scoping Mode is set to restrictive mode, you can edit an automation rule if you are scoped to all tags in the rule.
    
-   If Scope-Based Access Control (SBAC) is enabled and Endpoint Scoping Mode is set to permissive mode, you can edit an automation rule if you are scoped to at least one tag listed in the rule.
    
-   As a scoped user who has editing permissions to a rule, you can change the order among other rules that are locked.
    
-   If a rule was added when set to restrictive mode, and then changed to permissive (or vice versa), you will only have view permissions.

#### Scripts

Scripts perform specific automated actions using commands that are used in playbook tasks and in the War Room.

On the Scripts page, you can view, edit, and create scripts in JavaScript, Python, or PowerShell. When creating a script, you can access all Cortex Cloud APIs, including access to alerts, and investigations, and share data to the War Room. Scripts can receive and access arguments and can be password protected.

##### Use existing scripts

Edit scripts to use in playbooks and run in the War Room.

Using or modifying an existing script enables you to quickly leverage proven functionality and save significant time and effort developing a new script from scratch.

For example, you can use scripts from the Base and Common Scripts content packs that provide basic and reusable functions that can streamline your playbook development.

Common scripts

Cortex Cloud comes out-of-the-box with several common scripts that can be used in playbooks and commands (from the War Room), the majority of which are contained in the Base and Common Scripts content packs.

The Base content pack is a core pack that helps you get started and includes scripts that can be used in other JavaScript, Python, and PowerShell scripts. The Common Scripts content pack includes scripts that are commonly used, such as EmailReputation, RunDockerCommand, and ConvertXMLToJson.

Common Scripts contain code (such as functions and variables) that can be used across scripts and can be embedded when writing your scripts and integrations. Common Scripts are reusable modules or functions that provide additional functionality and capabilities to interact with APIs. Instead of duplicating code across multiple scripts or integrations, developers can create common scripts containing commonly used API interactions, such as authentication, data retrieval, or data manipulation. For example, in the **`CommonServer`** script, the **`tableToMarkdown`** function takes a JSON and transforms it into markdown. You can call this function from integrations and scripts that you author.

On the Scripts page, you can view/edit common scripts such as:

-   CommonServer
    
    The CommonServer script contains JavaScript functions and variables that can be used when writing your scripts and integrations.
    
    The script contains nearly 200 functions/variables, such as **`tabletoMarkdown`**, **`closeInvestigation`**, and **`SetSeverity`**.
    
    You can copy the script and add new functions/variables, or add your functions to the CommonUserServer script. You can also use your scripts to override the existing scripts in the CommonServer script.
    
-   CommonServerPython
    
    The CommonServerPython script contains Python functions that can be used when writing your scripts and integrations.
    
    The script contains over 400 functions, such as **`appendContext`**, **`vtCountPositives`** (which counts the number of detected URLs in the War Room entry), and **`datetime_to_string`**, (which converts a DateTime object into a string).
    
    You can copy the script and add new functions/variables, or add your functions to the CommonServerUserPython script. You can also use your scripts to override the existing scripts in the CommonServerPython script.
    
-   CommonServerPowerShell
    
    The CommonServerPowerShell script contains PowerShell arguments/functions that can be used when writing your scripts and integrations.
    
    The script contains many arguments/functions, such as **`SetIntegrationContext`**, **`Write-HostToLog`** (which writes to the demisto.log), and **`ReturnOutputs`** (which returns results to the user more intuitively).
    
    You can copy the script and add new arguments/functions or add your own to the CommonServerUserPowerShell script. You can also use your scripts to override the existing scripts in the CommonServerPowerShell script.
    

1.  Navigate to Investigation & Response → Automation → Scripts and in the Scripts Library search for the script you want to use.
    
    -   Use the free text in the search box to find an existing script. From the search drop-down, you can:
        
        -   Perform a basic search by Basic (name and tag), Name, or Tag.
            
        -   Perform an advanced search for specific words In Script or Everywhere (including the script name and tags).
            
        
    -   You can search for an exact match of the script name by putting quotation marks around the search text. For example, searching for **`"AddKeyToList"`** returns the script with that name. You can search for more than one exact match by including the logical operator "or" in between your search texts in quotation marks. For example, searching for **`"AnalyzeTimestampIntervals" or "AddKeyToList"`** returns the two scripts with those names. Wildcards are not supported in free text search.
        
    -   You can sort the scripts in the library alphabetically, by modified date, by system, or custom, and you can filter for disabled or deprecated scripts.
        
    -   The [Script Helper](https://xsoar.pan.dev/docs/concepts/xsoar-ide#the-script-helper) also provides a list of available alphabetically ordered commands and scripts.
        
    
2.  Click Edit. If the script you want to use is locked, you first need to duplicate it.
    
    If a script is installed from a content pack, by default, the script is locked, which means that it is not editable.
    
3.  In the Agentic Assistant pane, start a conversation with the Automation Engineer agent to edit the script, or manually edit the script code and define the script settings.
    
    For more information, see Use the Automation Engineer agent to accelerate script development and deployment. For details about script settings, see Create a script.Create a script
    
4.  Save the script version.
    
5.  (Recommended) Validate your script.
    
    1.  Click Test.
        
    2.  In the Arguments section, provide values for any inputs your prompt requires. These inputs are used to simulate how the script will behave in a live playbook, or how the script registered as an Action and assigned to an Agent will run as part of an executed plan.
        
        You can add input values manually.
        
    3.  Click Run.
        
        The scripts are executed in the Playground. Review the output generated by the script to validate its behavior and ensure it produces the expected results. The output is typically a text summary or another structured format that you have defined.
        
        In each run result, you can take the following actions:
        
        | Action | Description |
        | --- | --- |
        | Edit | Edit the entry, mark it as a note, preview it, or delete it. |
        | Mark as note | Marks the entry as a note, which can help you understand why certain action was taken and assist future decisions. When marked as a note, it is highlighted, so you can easily find it in the War Room or the Issue Overview tab. |
        | View artifact in new tab | Opens a new tab for the artifact. |
        | Add tags | Add any relevant tags to use that help you find relevant information. |
        
    
6.  (Optional) Click ⋮ next to the Edit button and select Register new Action to register the script as an action and make it available for agents. For more information, see Manage actions.Manage actions

##### Create a script

Create or edit an out-of-the-box script, including detach and attach and automation settings.

Creating custom scripts in Cortex Cloud helps meet your organization’s specific needs to automate repetitive tasks, streamline security operations, and make case response more efficient.

1.  Navigate to Investigation & Response → Automation → Scripts and click New Script.
    
2.  Add an identifying name for the script.
    
3.  Click Save.
    
4.  In the Agentic Assistant pane, start a conversation with the Automation Engineer agent to create the script, or manually create the script code and define the script settings.
    
    For more information, see Use the Automation Engineer agent to accelerate script development and deployment. For details about script settings, see Create a script.Create a script
    
5.  Save the script version.
    
6.  (Recommended) Click Test to validate your script.
    
    1.  In the Arguments section, provide values for any inputs your prompt requires. These inputs are used to simulate how the script will behave in a live playbook, or how the script registered as an Action and assigned to an Agent will run as part of an executed plan.
        
        You can add input values manually.
        
    2.  Click Run.
        
        The tests are executed in a Playground environment. Review the output generated by the AI to validate the script's behavior and ensure it produces the expected results. The output is typically a text summary or another structured format that you have defined.
        
        **Tip:**
        
        If there is an error, you can copy the error message from the test result into the Agentic Assistant prompt and ask the Automation Engineer agent to correct the error.
        
        In each run result, you can take the following actions:
        
        | Action | Description |
        | --- | --- |
        | Mark as note | Marks the entry as a note, which can help you understand why certain action was taken and assist future decisions. When marked as a note, it is highlighted, so you can easily find it in the War Room or the Issue Overview tab. |
        | View artifact in new tab | Opens a new tab for the artifact. |
        | Download artifact | Downloads the run details to a text file, including the AI task name,, the script name, user name and password, and the result. |
        | Add tags | Add any relevant tags to use that help you find relevant information. |
        
    
7.  (Optional) Click ⋮ and select Register new Action to register the script as an Action. For more information, see Manage actions.Manage actions
    

**Note:**

-   You can enable/disable a script in the Settings without having to duplicate the script.
    
-   You can view recently modified or deleted scripts by clicking the version history for all scripts .
    

###### Basic script settings

Define the relevant Basic script parameters.

| Parameter | Description |
| --- | --- |
| Name | An identifying name for the script. |
| Language type | Select the script language type. \*\*Important:\*\* If you choose Python, from the Agentic Assistant you can use the Automation Engineer agent. |
| Description | A meaningful description of the script. |
| Tags | Predefined script identifiers. For example, if a script is intended for phishing, tagging it with the phishing tag helps organize, classify, and manage the script among other scripts. Organizations can also implement policies or restrictions based on tags associated with scripts. For example, they may restrict certain users from accessing or executing a script tagged for phishing. |
| Enabled | Whether the script is available for playbook tasks and indicator types, or to run in the CLI. |

###### Arguments

You can create, edit, or delete arguments as required.

| Parameter | Description |
| --- | --- |
| Argument | An identifying name. |
| Mandatory | Makes the argument mandatory. |
| Default | Makes the argument the default. |
| Sensitive | Hides the argument from being displayed in the UI and in logs. |
| Description | A meaningful description of the argument. |
| Default | The default value for the argument. |
| Is array | Specifies that the argument is an array. |
| List options | A comma-separated list of argument values. |

You can create, edit, or delete outputs as required. Define the outputs according to types such as string, number, date, and Boolean. For more information, see [Context and Outputs](https://xsoar.pan.dev/docs/integrations/context-and-outputs).

| Parameter | Description |
| --- | --- |
| Context Path | A dot-notation representation of the path to access the Context. For example, **`ThreatStream.Analysis.ReportID`**. |
| Description | A short description of what the context path represents. For example, the ID of the report submitted to the sandbox. |
| Type | The value type of the context path, such as string, number, and date, enables Cortex Cloud to format the data correctly. |

###### Script permissions

| Parameter | Description |
| --- | --- |
| Password Protect | Enables you to add a password for the script, which will be required when running the script from the CLI. |

###### Advanced

| Parameter | Description |
| --- | --- |
| Timeout (seconds) | Time (in seconds) before the script times out. Default is 180. |
| Docker image name | For Python scripts, this is the name of the Docker image to use for the script. Cortex Cloud supports the following Python versions: 2.7; 3.0 and later You can change the Docker image. The default Docker image that Cortex Cloud uses is `demisto/python3`, but you can use other Docker images. |
| Run on a separate container | Runs the script on a separate container. |

###### Depends on commands

You can set the commands that the script depends on directly from these settings. You still have the option to set the dependencies in the script YAML file.

###### Edit existing code or create new code

Modify parameters, logic, or integrations within a script to adapt it to specific use cases, optimize performance, and address evolving security needs without starting from scratch.

The [Script Helper](https://xsoar.pan.dev/docs/concepts/xsoar-ide#the-script-helper) provides a list of available alphabetically ordered commands and scripts.

##### Use the Automation Engineer agent to accelerate script development and deployment

Use the AI-powered Automation Engineer agent to create, modify, explore, and understand scripts.

The **Automation Engineer** agent is a conversational AI that simplifies Python script creation and management through an intuitive, interactive experience. It enables you to generate, query, iterate, and refine automation scripts with the Agentic Assistant natural language chat prompt.

Automation Engineer agent scripting capabilities include:

-   Initial code generation: Generate a full script from a simple prompt. For example, "Generate a script to change the verdict of a given indicator based on user input, including documentation notes and debug messages."
    
    The agent uses security best practices and AgentiX SDK to generate tailor-made Python scripts.
    
-   Existing script modification: For example, “Add a check to ensure the indicator exists before proceeding with the verdict change, and return an error if it does not.”
    
-   Iterative bug fixing: For example, "Provide specific error messages for the agent to analyze and automatically repair."
    
-   API compatibility updates: For example, "Detect and replace deprecated API calls across an entire script."
    
-   Logic simplification: Ask the agent to refactor complex code to be more readable or to remove redundant conditionals for simple lookups.
    
-   Script explanation: Ask the agent questions about system or custom scripts, including asking how the script works. You can ask the agent to explain the specific script currently open or pose general technical questions regarding script logic and the AgentiX SDK.
    
-   Input and error validation: Enhance script robustness by asking the agent to add specific try/except blocks or validate that inputs like username are not empty.
    
-   SDK and command guidance: Ask the agent for technical details on using the AgentiX SDK or the proper syntax for running commands within a script.
    

When you download or update content packs, the new or updated scripts are immediately ready for the Automation Engineer agent to recommend and use.

**Note:**

The Automation Engineer agent is available with the Cortex Agentic Assistant, for users with script editing permissions. For more information, see Cortex Agentic Assistant and Agentic Assistant role-based access control.

How to use the Automation Engineer agent

1.  From the Investigation & Response → Automation → Scripts page, either choose an existing script or create a new script.
    
    For a new script:
    
    1.  Click \+ New Script, give the script a name, and click Save.
        
    2.  Click . The Agentic Assistant pane opens with the Automation Engineer agent automatically selected.
        
    
    For an existing script:
    
    1.  In the Scripts Library, search for the script you want to use.
        
        Search tips
        
        -   Use the free text in the search box to find an existing script. From the search drop-down, you can:
            
            -   Perform a basic search by Basic (name and tag), Name, or Tag.
                
            -   Perform an advanced search for specific words In Script or Everywhere (including the script name and tags).
                
            
        -   You can search for an exact match of the script name by putting quotation marks around the search text. For example, searching for **`"AddKeyToList"`** returns the script with that name. You can search for more than one exact match by including the logical operator "or" in between your search texts in quotation marks. For example, searching for **`"AnalyzeTimestampIntervals" or "AddKeyToList"`** returns the two scripts with those names. Wildcards are not supported in free text search.
            
        -   You can sort the scripts in the library alphabetically, by modified date, by system, or custom, and you can filter for disabled or deprecated scripts.
            
        -   The [Script Helper](https://xsoar.pan.dev/docs/concepts/xsoar-ide#the-script-helper) also provides a list of available alphabetically ordered commands and scripts.
            
        
    2.  Click Edit. The Agentic Assistant pane automatically opens with the Automation Engineer agent selected.
        
        If a script is installed from a content pack, by default, the script is locked, which means that it is not editable. To edit a system script, you first need to duplicate it.
        
    
    If you are in the middle of a chat with a different agent, you are prompted to start a new chat with the Automation Engineer agent.
    
    If you start a chat with one script and switch to another script, you are prompted to start a new chat.
    
2.  In the Agentic Assistant pane, enter a natural language prompt describing what you need the agent to do, including:
    
    -   Explain what the script does.
        
    -   Fix code errors: If there are errors in the script code, you can ask the Automation Engineer agent to suggest a correction.
        
    -   Add documentation notes to the script: Ask to include explanations and inline comments.
        
    -   Add arguments to the script: Define the inputs your script should accept. Each argument should include a name, type, whether it is required, and optionally a default value.
        
        Examples:
        
        -   **`days — number, optional, default: 3`**
            
        -   **`email — string, required`**, **`email="soc@company.com`**
            
        
    -   Add outputs to the script: Describe what the script should return to the context, for example, **`recentIncidentsSummary — string, a human-readable summary of incidents`**.
        
    -   Include debug logging: Request to include contextual log messages in the script.
        
    -   Include error handling: Ask to include try/except blocks with informative error logs.
        
    
    **Tip:**
    
    -   Use detailed prompts, for example, **`Get failed logins from last 24 hours and return as a table`**.
        
    -   Clearly define argument names, types, and default values.
        
    -   Mention if you expect the output in a specific format, such as a table, JSON, or plain text.
        
    
    Example 56. 
    
    The following are sample prompts:
    
    ```
    Fetch all open incidents from the last 3 days. 
    Generate a summary table with ID, name, and severity. 
    Email the summary to the given address.
    
    Arguments:
    - days (number, default: 3)
    - email (string, required)
    
    Output:
    - incidentsSummary (string): a human-readable table of incident details
    ```
    
    ```
    Explain what this script does
    ```
    
    ```
    How do I use the SDK to execute a search command?
    ```
    
    ```
    I got this error: <KeyError>: <userId>. Fix it.
    ```
    
      
    
3.  Click  or **`Enter`** to submit the prompt.
    
    The Agentic Assistant then displays:
    
    -   The plan describing the steps the Automation Engineer agent took.
        
    -   A script preview card that includes the following details:
        
        -   The script name.
            
        -   The script revision number (#).
            
        -   Script metadata: The number of lines, arguments, and outputs.
            
        -   An expand icon that shows the new script code with the option to Use this revision.
            
        -   ⋮ that includes Use this revision or Copy code.
            
        
    
    The first line of the generated script indicates it was generated by AgentiX, with the date time of the latest update.
    
4.  Use natural language in the prompt to modify the generated script as needed.
    
    Example 57. 
    
    For the script generated from the sample prompt above, enter the following modification to add sorting:
    
    ```
    Modify the sorting behavior so that all 1s (threats) come before all 0s (safe events). Keep the rest of the script structure the same.
    1 / 1
    ```
    
      
    
    **Note:**
    
    If you make manual edits in the script and don't save the changes and you then modify the script with the Automation Engineer agent, you are prompted to confirm overwriting the manual edits.
    
5.  (Optional) Access an earlier script revision by clicking ⋮ and then Use this revision on the script preview card of the revision you want to use.
    
6.  Continue modifying and submitting prompts until the script works as intended.
    
7.  For a new script, click Save Version. For an existing script that was edited, click Use this revision and then Save Version.
    
8.  (Recommended) Validate your script.
    
    1.  Click Test.
        
    2.  In the Arguments section, provide values for any inputs your prompt requires. These inputs are used to simulate how the script will behave in a live playbook, or how the script registered as an Action and assigned to an Agent will run as part of an executed plan.
        
        You can add input values manually.
        
    3.  Click Run.
        
        The scripts are executed in the Playground. Review the output generated by the script to validate its behavior and ensure it produces the expected results. The output is typically a text summary or another structured format that you have defined.
        
        **Tip:**
        
        If there is an error, you can copy the error message from the test result into the Agentic Assistant prompt and ask the Automation Engineer agent to correct the error.
        
        In each run result, you can take the following actions:
        
        | Action | Description |
        | --- | --- |
        | Edit | Edit the entry, mark it as a note, preview it, or delete it. |
        | Mark as note | Marks the entry as a note, which can help you understand why certain action was taken and assist future decisions. When marked as a note, it is highlighted, so you can easily find it in the War Room or the Issue Overview tab. |
        | View artifact in new tab | Opens a new tab for the artifact. |
        | Add tags | Add any relevant tags to use that help you find relevant information. |

##### Change the Docker image in a script

Use Docker to run Python scripts in a controlled environment in Cortex Cloud.

Docker enables you to run scripts from an image in a controlled environment that isolates and safeguards the tenant. It also simplifies environment setup by packaging dependencies and configurations within an image, ensuring consistent execution across different systems. By default, Cortex Cloud pulls images from the `Demisto` Docker image registry in GitHub, which are used in scripts as needed.  Cortex Cloud scripts have the relevant Docker image already selected.

You may want to select a different Docker image for your script. In Cortex Cloud, you can select a different Docker image from a dropdown that is pulled from the `Demisto` Docker image registry. In GitHub, the [dockerfiles-info branch](https://github.com/demisto/dockerfiles-info/tree/master) contains information about each image to help you find one that is relevant.

Change the Docker image for a script

1.  Edit the script.
    
2.  Under ADVANCED, in the Docker image name field, click X to clear the current selection and then select a Docker image name from the dropdown menu.
    
    For more information about changing the Docker image for a script, see the Advanced tab in Create a script.
    
3.  Save your changes.

###### Connect an engine to an image registry

Connect via an engine to your own authenticated Docker image registry.

Using an engine to communicate with an image registry streamlines deployment by managing dependencies, ensuring version control, and facilitating scalability, load balancing, and secure access to private images.

To use an engine, you need to connect the engine to an authenticated Docker image registry and then set it up in the tenant.

**Note:**

This procedure uses the `--username` and `--password` command line options to pass the username and password directly. For environments where command history or logs are visible to others, consider more secure methods like Docker configuration files for handling authentication in production or CI/CD environments. For more details, see [docker login](https://docs.docker.com/engine/reference/commandline/login/) or [podman-login](https://docs.podman.io/en/stable/markdown/podman-login.1.html).

1.  Open a terminal on the machine where your engine is running.
    
2.  Run `docker login` with username and password.
    
    ```
    docker login --username=<your-username> --password=<your-password> <registry-url>
    ```
    
    Replace `<your-username>`, `<your-password>`, and `<registry-url>` with your Docker registry credentials and the URL of your Docker image registry.
    
3.  (Optional) Search for or pull a Docker image.
    
    After logging in successfully, you can optionally validate access to images by searching for an image or pulling an image from the registry to your local machine using the `docker search` or `docker pull` command.
    
    ```
    docker search <registry-url>/<image-name>:<tag>
    docker pull <registry-url>/<image-name>:<tag>
    ```
    
    Replace `<registry-url>`, `<image-name>`, and `<tag>` with your registry URL, the name of the Docker image, and the image tag, respectively.
    
4.  In the tenant, set up the engine to pull images from a private image registry.

#### Context data

Use context data to assist with the investigation and remediation process.

Context data is a map (dictionary) that stores structured data related to an issue, including issue fields and automations data. You can use context data to pass data between playbook tasks, and create scripts that map data into case and issue fields.

##### Issue context data
When an issue is generated, context data is captured from the issue fields and from any automations, such as commands, playbooks, and scripts. Context data includes keys (strings) and values (numbers, maps, arrays, and strings).

To see context data for an issue, open the issue card and click the Issue Context Data icon .

Consider the following information when working with context data:

-   When an issue is created, the issue field data is stored under the `issue` key in the context data. When an investigation is opened and commands are run, the data returned from those commands is stored outside of the main `issue` key.
    
-   Issue context data is split into two tabs. The Issue tab contains the context data from the issue fields and the commands run on the issue. The Case tab contains the parent case fields and other case data. None of this data is added to the context data for the parent case unless you add it.
    
-   You can add keys and values to the context data. This is useful when developing playbooks, and other automations. For more information, see Add context data to an issue.
    
-   When running automations on an issue, the issue can access context data from its parent case; however, it cannot access context data from other issues. If you want to use context data from other issues, add it to the parent case.

##### Case context data
Context data is written to issues and not to cases. Therefore, the case context might be empty unless you previously added context data to the case.

To see context data for a case, open a case, click the Actions menu and select View context data.

Adding context data from issues to a parent case can help you with the following tasks:

-   **Remediation**: You can add context data from an issue, such as the issue status, actions, or ID, to its parent case's context data. This allows other playbooks to use the parent case context.
    
    For example, if you have multiple issues in a case, you can add context data from each of the issues to the parent case. You can then use the case context data in playbooks, and avoid running duplicate actions on the issues.
    
-   **Case assignment**: You can see if an analyst has been assigned to the case or other issues.
    
-   **Insights at the case level**: For automation engineers, you can set responses based on characteristics in the case.
    

For more information, see Add context data to a case.

##### Search context data

Use Query to search for specific items in the context data of a case or issue.

You can use Query to search within the context data JSON for specific items and expand nested keys. Open the context data panel for an issue or case, as explained in Issue context data or Case context data, and type in the Search field.

Example context:

```
{
  "HelloWorld": {
    "Alerts": [
      {
        "name": "Example 1",
        "alert_status": "ACTIVE"
      },
      {
        "name": "Example 2",
        "alert_status": "CLOSED"
      },
      {
        "name": "Example 3",
        "alert_status": "ACTIVE"
      }
    ]
  }
}
```

Search examples:

-   `${c}` finds the value of the object c.
    
-   `${HelloWorld.Alert(val.name == 'Example 1')}` shows the full object for the alert named "Example 1", as stored in the context data.
    
-   `${HelloWorld.Alert(val.alert_status === "ACTIVE")}` shows the full object for all alerts in context with status "ACTIVE".
    
-   `${HelloWorld.Alert(val.alert_status == 'ACTIVE').name}` fetches the HelloWorld.Alert.name of all alerts in context with status "ACTIVE".

##### Add context data to an issue

Use a script, command, or playbook to add context data to an issue to be used in playbooks or other automations.

You can add keys and values to an issue's context data to be used in playbooks or other automations.

To add context data to an issue, run the `Set` command in CLI, in a script, or in a playbook task. The Set command enables you to set a value under a specific key. For more information about the Set command, see [Set](https://xsoar.pan.dev/docs/reference/scripts/set).

###### Use the CLI

Run the `!Set` command in the issue War Room.

1.  Open an issue and select the War Room tab.
    
2.  Run the `!Set` command.
    
    Example 58. Example
    
    The following example adds the key and value `hello:world` to the issue context data.
    
    ```
    !set key="hello" value="world"
    ```
    
      
    

###### Use a script

In the JSON file, add `Set` to the `demisto.executeCommand` key.

Example 59. Example

The following example adds the key and value `hello:world` to the issue context data.

```
demisto.executeCommand("Set", {"key":"hello", "value":"world"})
```

  

###### Use a playbook

Use the `Set` script in a standard task.

Example 60. Example

An issue's context data contains the following values:

```
{  
   "Account":
    {
      "firstName": "Bob",
      "lastName": "Jones",
    }
}
```

For an automation, you need to use the full name value. You can use the `Set` script to add an new `fullName` value to the JSON:

Result:

```
{  
   "Account":
    {
      "firstName": "Bob",
      "fullName": "Bob Jones"
      "lastName": "Jones",
    }
}
```

##### Add context data to a case

Use a script, command, or playbook to add context data to a case to be used in playbooks or other automations.

You can add keys and values to a case's context data to be used in playbooks or other automations. By default, context data is added to cases only. To run automations on a case, add context data to the case from its related issues.

To add context data to a case, run the `setParentIncidentContext` command in the CLI, in a script, or in a playbook task.

###### Use the CLI

Run the `!setParentIncidentContext` command in the issue War Room or the Case War Room.

**Note:**

If you run the command in the issue War Room, the data is added to the following places:

-   The case context data.
    
-   The issue context data under the case tab.
    

If you run the command in the Case War Room, the data is added to the case context data only.

Run the command in the issue War Room

1.  Open an issue and select the War Room tab.
    
2.  Run the `!setParentIncidentContext` command.
    
    Example 61. Example
    
    The following example adds the key and value `hello:world` to the case and issue context data.
    
    ```
    !setParentIncidentContext key="hello" value="world"
    ```
    
      
    

Run the command in the case War Room

1.  Open a case and switch to the Detailed view.
    
2.  Select the Case War Room tab.
    
3.  Run the `!setParentIncidentContext` command.
    
    Example 62. Example
    
    The following example adds the key and value `hello:world` to the case context data.
    
    ```
    !setParentIncidentContext key="hello" value="world"
    ```
    
      
    

###### Use a script

In any script that runs in an issue, the data is written to the issue context data. If you want to add the data to the case context from your script, run the `setParentIncidentContext` using the `demisto.executeCommand` key, as follows:

`demisto.executeCommand("setParentIncidentContext", {"key":"<key>", "value":"<value>"})`

Example 63. Example

The following example creates a new key name `AuditID` with a `90210` value to your script.

```
demisto.executeCommand("setParentIncidentContext", {"key":"AuditID", "value":"90210"})
```

  

###### Use a playbook

When a playbook runs, the playbook data is written to the issue context data. To write the data to the parent case context data, use the `setParentIncidentContext` script in a standard task.

Example 64. 

The following example adds the TicketID to the case context. To see a full use case that includes this standard task, see Use context data in a playbook.

##### Delete context data from a case

You can delete context data from a case by running a command in the Case War Room or the issue War Room.

Run the `!deleteParentIncidentContext` command to delete all context data or a specific key in the Case War Room or issue War Room.

Use the issue War Room

1.  Identify an issue and click  to Investigate the issue.
    
2.  In the issue investigation panel, select the War Room tab.
    
3.  Run the `!deleteParentIncidentContext` command.
    

Use the case War Room

1.  In the case investigation panel, select the Case War Room tab.
    
2.  Run the `!deleteParentIncidentContext` command.
    

Example 65. Example

The following example deletes the key and value `hello:world` from the case or issue context.

```
!deleteParentIncidentContext key="hello" value="world"
```

##### Use context data in a playbook

Learn how to use context data in playbook tasks, and how to update context data from a playbook.

In Cortex Cloud you can use context data (from an issue or case) in playbooks, and you can use playbook tasks to update context data. You can:

-   Use the information stored in the issue context data as task inputs and outputs in a playbook.
    
    -   To access data that is stored in the issue context data, use the keyword `issue`.
        
        Example 66. 
        
        To access a the `status` value in the issue context data, use the following syntax:
        
        ```
        ${issue.status}
        ```
        
          
        
    -   To access data that is stored in the parent case context data, use the keyword `parentIncidentContext`.
        
        Example 67. 
        
        To access the `hostname` value in the case context data, use the following syntax:
        
        ```
        ${parentIncidentContext.hostname}
        ```
        
          
        
    
-   Set a breakpoint in a playbook that reviews context data after a specific task.
    
    This is available when using the debugger. As context data may be updated during a playbook run, setting a breakpoint enables you to pause the playbook execution, review the context data, and take action if necessary. Breakpoints can be useful when designing and troubleshooting playbooks. For more information, see Test your playbook.
    
-   Add a task that writes playbook data to the case context.
    
    When you add data to the case context, you can use this data to run playbooks on any of the issues that are included in the case.
    
    To write playbook data to the case context, use the `setParentIncidentContext` script in a standard task. For more information, see Add context data to a case.
    
    **Caution:**
    
    Users with Trigger Playbook permissions on a given issue may still be able to modify the parent case via commands and scripts, even without full access to the case.
    

For more information about playbooks, see Playbooks overview.

###### Context data in sub-playbooks

By default, the context data for sub-playbooks is stored in a separate context key. Consider the following information:

-   When a task in a main playbook accesses context data, it does not have direct access to sub-playbook data.
    
-   When a task in a sub-playbook accesses context data, it does not have direct access to the main playbook data.
    
-   If the sub-playbook has been configured to share globally, the sub-playbook context data is available to the main playbook and vice versa.
    

###### Use case: Use context data in a Jira ticketing system

In this use case, a Jira ticketing system is used to manage issues and reduce duplicate tickets.

**Issue:** When an action is taken on an endpoint, some cases contain multiple issues for the same endpoint. If each issue runs a playbook on the same endpoint, duplicate tickets are created for each case.

**Solution:** This playbook checks existing endpoints and Case IDs and decides whether to create a new ticket or to add the data to an existing ticket, and therefore, reduces duplicate tickets in the case.

The playbook flow is described in the following steps:

1.  After checking that the Jira v3 integration is enabled, in this task the playbook adds the `EndpointFromAlerts` key to the case context by retrieving the `alert.hostname` and using the `setParentIncidentContext` script.
    
    
    
2.  In this task, the playbook checks if there is an open ticket for the case by retrieving the `parentIncidentContext.TicketID`.
    
    
    
3.  If there is no open ticket, a new ticket is created in Jira and the TicketID is added to the case context.
    
    
    
4.  If there is an open ticket, this task checks whether there is an open ticket for the endpoint by comparing the `alert.hostname` (issue endpoint) to the `parentIncidentContent.EndpointFromAlerts` key.
    
    
    
5.  After retrieving the `alert.hostname` in the `parentIncidentContext.EndpointFromAlerts` context, if there is no open ticket for the endpoint, the playbook updates the Jira ticket for the case.
    
    In this example, you can see that the `EndpointFromAlerts` and `TicketID` has been added to the case context data.

#### Lists

Use lists to store data for use in playbooks and scripts.

Create and edit lists for use in playbooks and scripts.

A list is a data container for storing data and is mainly used in _playbooks_ and _scripts_ but can be accessed anywhere the context button appears (double-curly brackets). For example, in a playbook task, access the data in a list via the context button under Lists, or by using the path `${lists.<list_name>}`. Different types of data can be stored in a list, for example, text, string, numbers, Markdown, HTML, CSS, and JSON objects.  

**Note:**

The maximum size of a list is 209715 characters.

##### Use cases

The following are use cases for lists: 

-   **Defining HTML templates**: An HTML template can be defined as part of a communication task.
    
-   **Configuring Automation Exclusion Policies**: Create lists of critical assets that should be excluded from automated remediation. For more information, see Manage automation exclusion policies.
    
-   **Organizing Network Security**: Use lists to keep track of internal networks and their corresponding IP addresses. Compare them to a set list to ensure only authorized connections are allowed through.
    
-   **Store Data Objects**: For example, a list of URLs, which you can call as an input for scripts and playbooks.
    
-   **Prioritizing Case Response**: Create lists to identify critical assets, such as important users or servers. This helps improve incident management by prioritizing the most important incidents.

##### Create a list

Create a list that can be accessed later, such as in a playbook script or managed in the CLI (War Room or Playground).

To create a Text, Markdown, HTML, CSS, or JSON list type:

1.  Go to Settings → Configurations → Object Setup → Lists → Add a List.
    
2.  Enter a name for the list.
    
3.  From the list, select the Content Type.
    
4.  Set Permissions for the list. By default, all roles can read and edit the list. You can instead choose specific roles to have read only or read and edit access.
    
    **Note:**
    
    If you intend to use the list as part of an Automation Exclusion Policy, we recommend choosing specific roles for read and edit access. For more information on using lists in exclusion policies, see Manage automation exclusion policies.Manage automation exclusion policies
    
5.  Add content as required. For an example of a JSON list and how to use it, see Use cases: JSON lists.
    
6.  To save, do one of the following:
    
    -   Click Save.
        
    -   Click Save Version to save your changes in Version history for all Lists. This allows you to revisit and restore previous versions. 
        
    

**Note:**

If you want to edit a list from a content pack, you need to duplicate or detach a list. Detached lists do not receive updated content in subsequent Cortex Cloud content releases. To retain an updated list, reattach it.

##### List commands

Use list commands in the War Room, Playground, playbooks, and scripts.

Use the following list commands in the CLI in the War Room and Playground, scripts, and playbook tasks:

| Command | Description | Arguments |
| --- | --- | --- |
| getList | Retrieves the contents of the specified list. | listName: The name of the list for which to retrieve the contents. |
| createList | Creates a list with the supplied data and overwrites any existing list data. | listName: The name of the list to which to add items.; listData: The data to add to the new list and overwrites any existing list data. |
| addToList | Appends the supplied items to the specified list. If you add multiple items, make sure you use the same list separator that the list currently uses, for example, a comma or a semicolon. | listName: The name of the list to which to append items.; listData: The data to add to the specified list. The data will be appended to the existing data in the list. |
| setList | Adds the supplied data to the specified list and overwrites existing list data. | listName: The name of the list to which to add items.; listData: The data to add to the specified list. The data overwrites the existing data in the list. |
| removeFromList | Removes a single item from the specified list. | listName: The name of the list from which to remove an item.; listData: The item to remove from the specified list. |

Example 68. 

In this example, a manageOOOusers script uses the **`getList`**, **`createList`**, and **`setList`** commands.

```
register_module_line('ManageOOOusers', 'start', __line__())

def _get_current_user():
    current_username = demisto.executeCommand("getUsers", {"current": True})
    if isError(current_username):
        demisto.debug(f"failed to get current username - {get_error(current_username)}")
        return
    else:
        return current_username[0]["Contents"][0]['username']

def main():
    # get current time
    now = datetime.now()

    # args
    list_name = demisto.getArg("listname")
    username = demisto.getArg("username")

    option = demisto.getArg("option")
    days_off = now + timedelta(days=int(demisto.getArg("daysoff")))
    off_until = days_off.strftime("%Y-%m-%d")

    # update list name to start with 'OOO', so we can't overwrite other lists with this
    if not list_name.startswith("OOO"):
        list_name = f"OOO {list_name}"

    current_user = _get_current_user()
    if not current_user and not username:
        return_error('Failed to get current user. Please set the username argument in the script.')

    if not username:
        # Current user was found, running script on it.
        username = current_user
    else:
        # check if provided username is a valid user
        users = demisto.executeCommand("getUsers", {})
        if isError(users):
            return_error(f'Failed to get users: {str(get_error(users))}')
        users = users[0]['Contents']

        users = [x['username'] for x in users]
        if username not in users:
            return_error(message=f"{username} is not a valid user")

    # get the out of office list, check if the list exists, if not create it:
    ooo_list = demisto.executeCommand("getList", {"listName": list_name})[0]["Contents"]
    if isError(ooo_list):
        return_error(f'Failed to get users out of office: {str(get_error(ooo_list))}')

    if "Item not found" in ooo_list:
        demisto.results(demisto.executeCommand("createList", {"listName": list_name, "listData": []}))
        ooo_list = demisto.executeCommand("getList", {"listName": list_name})[0]["Contents"]

    # check status of the list, and add/remove the user from it.
    if not ooo_list:
        list_data = []
    else:
        list_data = json.loads(ooo_list)
    if option == "add":
        # check if user is already in the list, and remove, to allow updating
        list_data = [i for i in list_data if not (i['user'] == username)]
        list_data.append({"user": username,
                          "offuntil": off_until,
                          "addedby": current_user if current_user else 'DBot'})
    else:
        # remove the user from the list.
        list_data = [i for i in list_data if not (i['user'] == username)]

    set_list_res = demisto.executeCommand("setList", {"listName": list_name, "listData": json.dumps(list_data)})
    if isError(set_list_res):
        return_error(f'Failed to update the list {list_name}: {str(get_error(set_list_res))}')

    # welcome back, or see ya later!
    if option == "add":
        demisto.results(f"Vacation mode engaged until {off_until}, enjoy the time off {username}")
    else:
        demisto.results(f"Welcome back {username}, it's like you never left!")

if __name__ in ('__builtin__', 'builtins', '__main__'):
    main()

register_module_line('ManageOOOusers', 'end', __line__())
```

##### Use cases: JSON lists

Manage JSON lists in Cortex Cloud that can be accessed by automations, playbooks, etc. List commands, lists arrays separators delimiters

List data can be stored in various structures, including JSON format. When accessing a valid JSON file from within a _playbook_, it is automatically parsed as a JSON object (list). Depending on how you store the data, you may need to transform a list into an array. For example, when using non-built-in commands in a script or looping over items in a list, we recommend converting the list into an array. Working with JSON files in playbooks typically involves the following:

-   Extract the data from a JSON object
    
-   Extract a subset of the data
    
-   Filter extracted data
    
-   Apply transformers to extracted data.
    

###### Extract data from a JSON object

Create a JSON list and use the **Set** automation to create a new context key that can extract the data from the list.

1.  Create a List:
    
    1.  In the Name field, type `Test1`.
        
    2.  Select Settings → Configurations → Object Setup → Lists → Add a List.
        
    3.  In the Content Type field, select JSON and add the following content:
        
        ```
        {    
            "domain": {
                "name": "mwidomain",
                "prod_mode": "prod",
                "user": "weblogic",
                "admin": {
                    "servername": "AdminServer",
                    "listenport": "8001"
                },
                "machines": [
                    {
                        "refname": "Machine1",
                        "name": "MWINODE01"
                    },
                    {
                        "refname": "Machine2",
                        "name": "MWINODE02"
                    }
                ],
                "clusters": [
                    {
                        "refname": "Cluster1",
                        "name": "App1Cluster",
                        "machine": "Box1"
                    },
                    {
                        "refname": "Cluster1",
                        "name": "App2Cluster",
                        "machine": "Box2"
                    }
                ],
                "servers": [
                    {
                        "name": "ms1",
                        "port": 9001,
                        "machine": "Box1",
                        "clusterrefname": "Cluster1"
                    },
                    {
                        "name": "ms2",
                        "port": 9002,
                        "machine": "Box2",
                        "clusterrefname": "Cluster2"
                    }
                ]
            }
        }
        ```
        
    4.  Save the list.
        
2.  Create a playbook task with the Set automation:
    
    1.  Select Investigation & Response → Automation → Playbooks → New Playbook.
        
    2.  Name the playbook, and click Save.
        
    3.  Click Create Task and provide a task name.
        
    4.  In the Choose Script field, select Set .
        
        The Set script sets a value in context under the key entered.
        
    5.  In the key field, define a context key name for the data. For example, JSONData.
        
        
        
    6.  In the value field, set the list you want to extract by clicking the curly brackets.
        
    7.  Click Filters And Transformers.
        
    8.  In the Get field, click the curly brackets, and in the Select source for value section, select the list you created in step 1: Test1.
        
    9.  In the Fetch data field, select an issue to test the data.
        
    10.  Click Test.
         
         In this example, the test results have found the list data.
         
         
         
    11.  When the test completes, click Save.
         
    12.  Save the task and playbook.
         
3.  Check all the data is stored in the context key you defined by testing the playbook using the debugger:
    
    1.  Click Run.
        
    2.  Open the Debugger Panel.
        
        The key you defined, JSONData, holds the data in context from the JSON object.
        
        
        

###### Extract a subset of the data

In a playbook, you can extract subsets of context data to analyze a specific information set. This approach also applies when working with lists, such as extracting a subset of data from a JSON object. In this example, we extract server information from the list created above.

1.  In a playbook, create a task.
    
    1.  In the Choose Script field, select Set .
        
    2.  In the key field, define a context key name for the data; for example, JSONDataSubset.
        
    3.  In the value field, set the list you want to extract by clicking the curly brackets.
        
    4.  Click Filters And Transformers.
        
    5.  In the Get field, enter **`lists.Test1.domain.servers`**.
        
    6.  In the Fetch data field, select an issue to test the data.
        
    7.  Click Test.
        
    8.  When the test completes, click Save.
        
    9.  Save the task and the playbook.
        
2.  Check that all the data is stored in the context key you defined by testing the playbook using the debugger.
    
    1.  Click **`Run`** Debugger Panel.
        
    2.  The key you defined (JSONDataSubset) holds the subset of the data in context from the JSON object.
        
        
        

###### Filter extracted data

You can filter the extracted data subset to analyze it on a more granular level. In this example, we filter Box1 information from the list created in Extract the data from a JSON Object above.

1.  Re-open the task you created above.
    
2.  Click the value field.
    
3.  Under Filter, click Add Filter.
    
4.  Set the condition you want to filter.
    
    In this example, retrieve the list of machines named **`Box1`** from **`Test1`** list by setting the filter **`lists.Test1.domain.servers.machine Equals Box1`**.
    
    
    
5.  Click Test.
    
6.  Check whether the data subset was accessed successfully by selecting the data source from an issue. You can see the results returned **`machine: Box1`**.
    
    
    

###### Apply transformers to extracted data

In general, in a playbook task, you can transform (apply changes) to the data extracted. This also applies to working with lists ,such as transforming extracted data from a JSON object. In this example, we extract the first element from the list created in the 'Extract Data from a JSON Object' section above and transform it to uppercase.

1.  Re-open the task, click the contents of the value field, and keep the current filters.
    
2.  In the Apply transformers on the field, click Add transformer.
    
3.  Add the following transformers to the extracted data:
    
    1.  Add the **`Get index (General)`** transformer to extract a specific machine element.
        
        Set **`index: 0`** to extract the first element from the list.
        
    2.  Add the **`To upper case (String`**) transformer.
        
        The **`To upper case (String)`** transformer does not work on lists, only on individual elements. Therefore, the **`Get index (General)`** transformer should be applied before adding the **`To upper case (String)`** transformer.
        
    
    
    
4.  In the Fetch Data field, select an issue to test and click Test.

##### Transform a list into an array

Create a transformer to split a list into an array when adding or editing a task in a playbook or when mapping an integration instance in Cortex Cloud.

Create a transformer to split a list into an array, add or edit a task in a _playbook_, or map an instance.

1.  Go to Investigation & Response → Automation → Playbooks and create or edit a playbook.
    
2.  Select Create Task.
    
3.  In the Choose script field, select the Set automation.
    
4.  In the Key field, enter the key name.
    
5.  In the value field, click {}
    
6.  Add a transformer.
    
    1.  Click Filters And Transformers.
        
    2.  In the Get field, click {}.
        
    3.  Expand the Lists node and select a list to transform.
        
    4.  In Apply transformers on the field, click Add transformer.
        
    5.  Search for and select Split.
        
    6.  (Optional) In the delimiter field, type the delimiter used to separate the items in the string (default is ",").
        
    7.  Click Save.
        
7.  Save the task and playbook.

#### Integrations

Configure and use integrations to connect with third-party systems and automate workflows.

Integrations enable you to extend Cortex Cloud. Integrations are included in content packs and must be configured for use.

##### Integrations in Cortex Cloud

Integrations enable you to connect with third-party services and provide opportunities for increased automation.

Integrations enable Cortex Cloud to connect and communicate with other products.

Integrations are part of content packs. When you adopt a playbook from the Playbook Catalog, the related content pack is automatically downloaded. In some cases, the content pack includes an integration. Content packs containing integrations are also automatically downloaded as you configure playbook tasks that require integration commands.

To use an integration, you must configure an integration instance. This can be done within the playbook workflow or on the Automation and feed integrations page. You can have multiple instances of an integration, for example, to connect to different environments.

On the Automation and feed integrations page, you can do the following:

| Option | Description |
| --- | --- |
| Add instance | Configure an integration instance to connect and communicate with other products. For more information, see Add an integration instance. After configuring the instance, you can also enable/disable the integration instance, copy the instance, and view the integration fetch history. |
| View integration source | View the integration settings and source code. |
| Delete | Although you can't delete an integration installed from a content pack, you can delete an integration instance. |
| View integration commands | Below each installed integration, you can click Show commands to view a list of the integration's commands and a description of each command. |
| Version history | When you view the source code, you can also see the history of the integration and revert to previous installed versions. |

You can view the version history for all installed integrations (the last 100 changes) by clicking the Version History button at the top of the .

##### Add an integration instance

Configure an integration instance to use integration commands in playbooks, the case and issue War Rooms, and the Playground.

To use a downloaded integration, you must configure an integration instance.

Before you begin:

-   Content packs containing integrations are downloaded when you adopt playbooks and configure playbook tasks. The content pack must be downloaded before you can configure an integration instance.
    
-   Consider whether you want to add credentials, which enable you to save login information without exposing usernames, passwords, certificates, and SSH keys. For more information, see Manage credentials.Manage credentials
    
-   Although you can view integration documentation when adding an instance, [https://xsoar.pan.dev/](https://xsoar.pan.dev/docs/reference/index) has more detailed information about integrations, including commands, outputs, and recommended permissions.
    

1.  Navigate to Settings → Data Sources & Integrations and search for the integration for which you want to add an instance.
    
2.  Select the integration and click Add Instance.
    
3.  Add the parameters as required.
    
4.  (Optional) To check that the integration instance is working correctly, click Test.
    
5.  Save & Exit.
    
    You can expand the integration to see more details about the integration instance, enable or disable the integration instance, and copy the instance.
    
    If you encounter an error, see Troubleshoot Integrations.Troubleshoot Integrations
    
6.  By default, the integration instance is used whenever the integration is called. If you want to only use the integration instance when specified with the `using` argument in a playbook or the CLI, change the integration instance setting from Always to On Demand. For example, you might have two instances of an integration and want to use one instance as the default and the other instance only for manual testing on demand.

##### Use integration commands in the CLI

Use integration commands within the War Room or Playground.

The command line interface (CLI) enables you to run system commands, integration commands, and scripts in the War Room for a case or issue, or in the Playground. The Playground is a non-production environment where you can safely develop and test scripts and commands. It is an investigation area that is not connected to a live (active) investigation.

On the Marketplace page, under each integration, you can view a list of commands. Integration commands are only available when the integration instance is enabled. Some commands depend on a successful connection between Cortex Cloud and third-party integrations.

The CLI auto-complete feature allows you to find relevant commands, scripts, and arguments.

Cortex Cloud uses the "`!`" such as `!ad-create-user username=[name of user]`.

When running commands from the CLI, the results are returned in the War Room or Playground and also in JSON format in the context data.

**Tip:**

In the Playground, you can clear the context data, if needed, which deletes everything in the Playground context data, but does not affect the actual issue or case. To clear the context, run `!DeleteContext all=yes'` from the CLI or click Clear Context Data while viewing the context data.

##### Troubleshoot Integrations

Learn how to troubleshoot your integration in Cortex Cloud.

The Troubleshooting Instances dashboard provides you with insight into command execution errors. When troubleshooting integrations, we recommend the following steps:

-   Use the Test button in the integration instance.
    
-   Verify the integration settings. Check settings such as usernames, URLs, and passwords.
    
-   Download the debug log file and review its contents.
    
    In the following example, you receive a 401 unauthorized error code after testing the integration.
    
    
    
    Click Run Test & Download Debug Log, to download the debug file locally. You can verify what server the URL request is being forwarded to and any other reasons as to why you received this error code. The 401 unauthorized error code usually relates to invalid error credentials, expired tokens, or incorrect API settings.
    
-   Enable verbose or debug-level logging on the integration.
    

If you are unable to fix the integration, contact Customer Support for further assistance.

##### Manage credentials
Credentials simplify and compartmentalize administrative tasks, and enable you to save login information without exposing usernames, passwords, certificates, and SSH keys. You can reuse credentials across multiple systems, for example, when using the same administrator password across multiple endpoints.

After you set up a credential, you can configure integration instances to use it instead of entering the name and password manually.

How to add credentials to an integration instance

1.  Create the credential.
    
    1.  Select Settings → Configurations → Integrations → Credentials → New Credential.
        
    2.  Add the following parameters:
        
        | Parameters | Description |
        | --- | --- |
        | Credential Name | The name of the credential. You select this name when adding the credential to the integration instance. |
        | Username | The username for the credential. |
        | Workgroup | The workgroup to associate this credential with. Relevant for third-party services, such as Active Directory, CyberArk, and HashiCorps. |
        | Password | The password for the credential. For example, add the API Key when defining the API credential. |
        | Certificate | Certificate or SSH to use for the credential. |
        
    3.  Save the credential.
        
2.  Add the credential to the integration instance.
    
    1.  Go to Settings → Data Sources & Integrations and select the integration.
        
    2.  Click Add Instance.
        
    3.  Locate the relevant section and click Switch to credentials.
        
        If there is more than one credential, select the relevant credential.
        
    4.  Test and Save & Exit the integration instance.

#### Engines

Install, manage, configure, and troubleshoot engines.

Install an engine in your remote network, enabling effortless communication with Cortex Cloud. Easily configure and manage the engine to fit your specific needs, and explore how to leverage it for seamless integrations.

##### What is an engine?
An engine is a proxy server application that is installed on a remote machine and enables communication between the remote machine and the Cortex Cloud tenant. You can run playbooks, scripts, commands, and integrations on the remote machine, and the results are returned to the tenant.

While the Cortex Cloud tenant includes a user interface that allows security analysts to create and manage playbooks, investigate issues, and perform other tasks, the engine operates behind the scenes to execute these playbooks and automate security actions. The separation between the user interface and the engine allows for the scalable and efficient execution of security automation and orchestration.

You can install multiple engines on the same machine (Shell installation only), which is useful in a dev-prod environment where you do not want to have numerous engines in different environments and to manage those machines.

**Note:**

You cannot share a multiple-engine installation with a single-engine installation.

Engine architecture

Within the network, you need to allow the engine to access the Cortex Cloud’s IP address and listening port (by default, TCP 443). The engine always initiates the communication to Cortex Cloud.

Engine use cases

An engine can be used for the following purposes:

-   **Engine proxy**
    
    Cortex Cloud engines enable you to access internal or external services that are otherwise blocked by a firewall or a proxy. For example, if a firewall blocks external communication and you want to run the Rasterize integration, you need to install an engine to access the Internet.
    
-   **Engine load-balancing**
    
    Engines can be part of a load-balancing group, which enables the distribution of the command execution load. The load-balancing group uses an algorithm to efficiently share the workload for integrations that the group is assigned to, thereby speeding up execution time. In general, heavy workloads are caused by playbooks that run multiple commands.
    
    **Note:**
    
    When you add an engine to a load-balancing group, you cannot use that engine separately. The engine does not appear in the engines menu when configuring an integration instance, but you can choose the load-balancing group.

##### Engine requirements

Hardware, OS, and required URLs for engines.

You can install engines on all Linux environments. Docker/Podman needs to be installed before installing an engine. If you are using the shell installer for an engine, Docker/Podman is installed automatically.

**Note:**

The Cron package is required to install engines on a Linux machine.

Engine hardware requirements

If your hard drive is partitioned, we recommend a minimum of 50 GB for the `/var` partition.

| Component | Dev Environment Minimum | Production Minimum |
| --- | --- | --- |
| CPU | 8 CPU cores | 16 CPU cores |
| Memory | 16 GB RAM | 32 GB RAM |
| Storage | 100 GB | 100 GB |

Operating system requirements

You can deploy a Cortex Cloud engine on the following operating systems:

| Operating System | Supported Versions |
| --- | --- |
| Ubuntu | 18.04, 20.04, 22.04, 24.04 |
| RHEL | 8.x, 9.x Includes all minor versions. |
| Oracle Linux | 7.x, 8.9, 9.3, 9.4 |
| Amazon Linux | 2, Amazon Linux 2023 |
| Rocky Linux | 9.5, 9.6 |

**Note:**

CentOS 8.x reached End of Life (EOL) on December 31, 2021, and is no longer supported as an operating system.

CentOS 7.x reached End of Life (EOL) on June 30, 2024, and is no longer supported as an operating system.

Engine required URLs

You need to allow the following in the URLs for Cortex Cloud engines to operate properly. The URLs are needed to pull container images from public Docker registries.

The endpoint URL is: `wss://api-<tenant domain>.xdr.<region>.paloaltonetworks.com/xsoar/d1ws`. For example,

**Note:**

If you have configured a range of Approved IP Ranges under Allowed Sessions on the Security Settings page, the engine must communicate through one of the approved IPs.

| FUNCTION | SERVICE | PORT | DIRECTION |
| --- | --- | --- | --- |
| Integrations |  | Integration-specific ports | Outbound |
| Engine connectivity | HTTPS | 443 (configurable) | Outbound |
| Docker | https://registry-1.docker.io; https://registry.fedoraproject.org; https://registry.access.redhat.com; https://docker.io; https://registry.docker.io; https://auth.docker.io This URL may change at Docker’s discretion.; https://production.cloudflare.docker.com This URL may change at Docker’s discretion. | 443 | Outbound |

##### Install an engine

Install, deploy and configure Cortex Cloud engines.

When you install the engine, the `d1.conf` is installed on the engine machine, which contains engine properties such as proxy, log level, and log files. If Docker/Podman is already installed, the **`python.engine.docker`** and **`powershell.engine.docker`** keys are set to **`true`**. If Docker or Podman is not available when the engine is installed, the key is set to **`false`**. If so, you need to set the key to **`true`** after installing Docker and Podman. Verify that **`python.engine.docker`** and **`powershell.engine.docker`** configuration keys are present in the **`d1.conf`** file.

**Note:**

If you are using DEB, RPM, or Zip installation, install Docker or Podman.

Natively running Python or PowerShell integrations/scripts on Windows or Linux is not supported on Cortex Cloud engines.

###### Installation types

Cortex Cloud supports the following file types for installation on the engine machine:

-   Shell: For all Linux deployments, including Ubuntu and SUSE. Automatically installs Docker/Podman, downloads Docker/Podman images, enables remote engine upgrade, and allows installation of multiple engines on the same machine.
    
    The installation file is selected for you. Shell installation supports the purge flag, which by default is false. To uninstall an engine, run the installer with the purge flag enabled.
    
    **Note:**
    
    When upgrading an engine that was installed using the Shell installation, you can use the Upgrade Engine feature in the Engines page. For Amazon Linux 2 type engines, you need to upgrade these engine types using a zip-type engine and not use the Upgrade Engine feature.
    
    If you use the shell installer, Docker/Podman is automatically installed. We recommend using Linux and not Windows to be able to use the shell installer, which installs all dependencies.
    
-   DEB: For Ubuntu operating systems.
    
-   RPM: RHEL operating systems.
    
    **Note:**
    
    Use DEB and RPM installation when the shell installation is not available. You need to manually install Docker or Podman and any dependencies.
    
-   Zip: Used for Amazon Linux 2 machines.
    
-   Configuration: Configuration file for download. When you install one of the other options, this configuration file (`d1.conf` ) is installed on the engine machine.
    

**Important:**

For DEB/RPM engines, Python (including 3.x) and the containerization platform (Docker/Podman) must be installed and configured. For Docker or Podman to work correctly on an engine, [IPv4 forwarding](https://docs.docker.com/network/bridge/#enable-forwarding-from-docker-containers-to-the-outside-world) must be enabled.

###### How to install an engine

1.  Create an engine.
    
    1.  In the Engine Name field, add a meaningful name for the engine.
        
    2.  Select one of the installer types from the list.
        
    3.  (Optional) (Shell only) Select the checkbox to enable multiple engines to run on the same machine.
        
        If you have an existing engine, and you did not select the checkbox, and now you want to install another engine on the same machine, you need to delete the existing engine.
        
    4.  (Optional) Add any required configuration in JSON format.
        
    5.  Click OK to create the engine.
        
2.  For shell installation, do the following:
    
    **Tip:**
    
    For Linux systems, we recommend using the shell installer. If using Amazon Linux 2, use the zip installer (see step 4).
    
    1.  Move the `.sh` file to the engine machine using a tool such as SSH or PuTTY.
        
    2.  On the engine machine, grant execution permission by running the following command:
        
        **`chmod +x /<engine-file-path>`**
        
    3.  Install the engine by typing one of the following commands:
        
        With tools: **``sudo _`<engine-file-path>`_``**
        
        Without tools: **``sudo _`<engine-file-path> -- -tools=false`_``**
        
        **Note:**
        
        If you receive a **`permissions denied`** error, it is likely that you do not have permission to access the **`/tmp`** directory.
        
        If the installer fails to start due to a permissions issue, even if running as root, add one of the following two arguments when running the installer:
        
        -   `--target <path>` - Extracts the installer files into the specified custom path.
            
        -   `--keep` - Extracts the installer files into the current working directory (without cleaning at the end).
            
        
        If using installer options such as `-- -tools=false`, the option should come after the `--target` or `--keep` arguments. For example:
        
        `sudo ./d1-installer.sh --target /some/temp/dir -- -tools=false`
        
        If you set a custom path when you run the installer, you must also set a custom path for upgrading your engine or the upgrade will fail. For more information, see Upgrade an engine.
        
3.  For RPM/DEB installation, do the following:
    
    1.  Move the file to the required machine using a tool such as SSH or PuTTY.
        
    2.  Type one of the following installation commands:
        
        | Machine Type | Install Command |
        | --- | --- |
        | RHEL (RPM) | **`sudo rpm -Uvh d1-2.5_15418-1.x86_64.rpm`** |
        | Ubuntu (DEB) | **`sudo dpkg --install d1_xxx_amd64.deb`** |
        
    3.  Start the engine by running one of the following commands:
        
        | Machine Type | Start Command |
        | --- | --- |
        | RHEL (RPM) | **`sudo systemctl start d1`** |
        | Ubuntu (DEB) | **`sudo service d1 restart`** |
        
4.  For Zip installation on Amazon Linux 2, run the following commands:
    
    1.  Create the engine folder.
        
        **`mkdir /usr/local/demisto`**
        
    2.  Unzip the engine files to the folder created in the previous step.
        
        **`unzip ./d1.zip -d /usr/local/demisto`**
        
    3.  Allow the process to bind to low-numbered ports.
        
        **`setcap CAP_NET_BIND_SERVICE=+eip /usr/local/demisto/d1_linux_amd64`**
        
    4.  Change the owner of `/usr/local/demisto` to the demisto user.
        
        **`chown -R demisto:demisto /usr/local/demisto`**
        
    5.  In `/etc/systemd/system` edit the `d1.service` file as follows (adjust the directory and the name of the binary file if needed).
        
        ```
         [Unit]
        Description=Demisto Engine Service
        After=network.target
        [Service]
        Type=simple
        User=demisto
        WorkingDirectory=/usr/local/demisto
        ExecStart=/usr/local/demisto/d1_linux_amd64
        EnvironmentFile=/etc/environment
        Restart=always
        [Install]
        WantedBy=multi-user.target
        ```
        
    6.  Run the following commands:
        
        `chown root:root /etc/systemd/system/d1.service`
        
        `chmod 644 /etc/systemd/system/d1.service`
        
    7.  Run the engine process.
        
        **`systemctl start d1`**
        
    8.  Verify that the engine is running.
        
        **`systemctl status d1`**
        
5.  Verify that the engine you created is connected.
    
    1.  Locate your engine on the Engines page and check that it is connected.
        
6.  When the engine is connected, you can add the engine to a load-balancing group by clicking Load-Balancing Group on the Engines page.
    
    If you want to add the engine to a new group, click Add to new group from the list.
    
    When the engine is in the load-balancing group, it cannot be used as an individual engine and does not appear when configuring an engine from the list.
    
7.  (Optional) After installing the engine, you may want to set up a proxy, set up Docker hardening, configure the number of workers for the engine, or perform other related engine configurations. For more information, see Configure Engines. You can also configure an integration instance to run on the engine you created.

###### Docker

Cortex Cloud Docker installation, configuration, security, and troubleshooting guides.

Docker is a software framework for building, running, and managing containers.

**Note:**

This section is relevant when installing an engine.

Cortex Cloud maintains a repository of Docker images, available in the Docker Hub under the [Cortex](https://hub.docker.com/u/demisto/) organization.

Each Python/PowerShell script or integration has a specific Docker image listed in the YAML file. When the script or integration runs, if the specified Docker image is not available locally, it is downloaded from the Docker Hub or the Cortex Container Registry. The script or integration then runs inside the Docker container. For more information on Docker, see the [Docker documentation](https://docs.docker.com/) and [Using Docker](https://xsoar.pan.dev/docs/integrations/docker).

**Note:**

Docker images can be [downloaded](https://xsoar.pan.dev/docs/reference/articles/download-packs-offline) together with their relevant content packs for offline installation.

###### Install Docker

Install Docker on engines and troubleshoot the installation.

Docker is required for engines to run Python/Powershell scripts and integrations in a controlled environment.

If you use the Shell installer to install an engine, Docker is automatically installed. If using DEB and RPM installations, install Docker or Podman before installing an engine. The engine uses Docker to run Python scripts, PowerShell scripts, and integrations in a controlled environment. By packaging libraries and dependencies together, the environment remains the same, and scripts and integrations are not affected by different server configurations.

Cortex Cloud supports the latest Docker Engine release from Docker and the following corresponding supported Linux distributions:

-   5.3.15 and later
    
-   5.4.2 and later
    
-   5.5 and later
    

These Linux distributions include their own Docker Engine package. In addition, older versions of Docker Engine released within the last 12 months are supported unless there is a known compatibility issue with a specific Docker Engine version. In case of a compatibility issue, Cortex Cloud will publish an advisory notifying you to upgrade your Docker Engine version.

You can use a version that is not supported. However, when encountering an issue that requires Customer Support involvement, you may be asked to upgrade to a supported version before assistance can be provided.

###### Docker installation by operating system

If you need to install Docker before installing an engine, use the following procedures:

-   Red Hat
    
-   [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    
-   [Amazon Linux](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html#install_docker)
    
-   [Oracle Linux](https://docs.oracle.com/en/operating-systems/oracle-linux/docker/)
    

**Note:**

For Red Hat's Docker distribution, you need Mirantis Container Runtime (formerly Docker Engine - Enterprise) to run specific Docker-dependent integrations and scripts. For more information, see Install Docker distribution for Red Hat on an engine server.

To use the Mirantis Container Runtime (formerly Docker Engine - Enterprise) follow the [deployment guide](https://docs.mirantis.com/welcome/mcr) for your operating system distribution.

###### Verify Docker user and permissions

Verify Docker user

If you installed an engine before installing Docker, verify the `demisto` operating system user is part of the Docker operating system group.

1.  Run **`id demisto`** verify. For example:
    
    ```
    id demisto
    uid=997(demisto) gid=997(demisto) groups=997(demisto),998(docker)
    ```
    
    If needed, add the demisto user to the operating system group:
    
    ```
    sudo groupadd docker
    sudo usermod -aG docker demisto
    ```
    
    Remove these keys from the engine configuration file.
    
    ```
    python.executable
    python.executable.no.docker
    ```
    

Verify user permissions

To verify that the operating system user (demisto) has the necessary permissions and can run Docker containers, run the following command from the OS command line.

**`sudo -u demisto docker run --rm -it demisto/python:1.3-alpine python --version`**

If everything is configured properly you will receive the following output. `Python 2.7.14`.

###### Install Docker distribution for Red Hat on an engine server

Install Docker distribution for Red Hat.

Red Hat maintains its own package of Docker, which is the version used in OpenShift Container Platform environments, and is available in the RHEL Extras repository.

**Note:**

If running RHEL v8 or higher, the engine installs Podman packages and configures the operating system to enable Podman in rootless mode.

For more information about the different packages available to install on Red Hat, see the [Red Hat Knowledge Base Article](https://access.redhat.com/solutions/3092401) (requires a Red Hat subscription to access).

1.  Install [Red Hat’s Docker package](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux_atomic_host/7/html-single/getting_started_with_containers/index#using_the_docker_command_and_service).
    
2.  Run the following commands.
    
    **`systemctl enable docker.service`**
    
    **`systemctl restart docker.service`**
    
3.  Change ownership of the Docker daemon socket so members of the **`dockerroot`** user group have access.
    
    1.  Edit or create the file `/etc/docker/daemon.json`.
        
    2.  Enable OS group **`dockerroot`** access to Docker by adding the following entry to the `/etc/docker/daemon.json: "group": "dockerroot"`file. For example:
        
        **`{ "group": "dockerroot" }`**
        
    3.  Restart the Docker service by running the following command.
        
        **`systemctl restart docker.service`**
        
    4.  Install the engine
        
    5.  After the engine is installed, run the following command to add the **`demisto`** os user to the **`dockerroot`** os group (Red Hat uses dockerroot group instead of docker).
        
        **`usermod -aG dockerroot demisto`**
        
    6.  Restart the engine.
        
4.  Set the required SELinux permissions.
    
    The Cortex Cloud engine uses the `/var/lib/demisto/temp` directory (with subdirs) to copy files and receive files from running Docker containers. By default, when SELinux is in **enforcing** mode directories under **`/var/lib/`** it cannot be accessed by Docker containers.
    
    1.  To allow containers access to the `/var/lib/demisto/temp` directory, you need to set the correct SELinux policy type, by typing the following command.
        
        **`chcon -Rt svirt_sandbox_file_t /var/lib/demisto/temp`**
        
    2.  ( Optional) Verify that the directory has the **`container_file_t`** SELinux type attached by running the following command.
        
        **`ls -d -Z /var/lib/demisto/temp`**
        
    3.  Configure label confinement to allow Python and PowerShell containers to access other script folders.
        
        In the d1.conf file, set the following parameters:
        
        |  | Key | Value |
        | --- | --- | --- |
        | For Python containers | python.pass.extra.keys | \--security-opt=label=level:s0:c100,c200 |
        | For PowerShell containers | powershell.pass.extra.keys | \--security-opt=label=level:s0:c100,c200 |
        
    4.  Open any issue and in the issue War Room CLI, run the **`/reset_containers`** command.

###### Docker image security

Information about Cortex Cloud Docker image security practices.

The project that contains the source Dockerfiles used to build the images and the accompanying files is fully open source and [available for review](https://github.com/demisto/dockerfiles). Cortex Cloud uses the secure Docker Hub registry for its [Docker images](https://hub.docker.com/u/demisto). However, in an Engine environment, you can also use the PANW registry . You can view the Docker trust information for each image at the [image info branch](https://github.com/demisto/dockerfiles-info/blob/master/README.md).Use the Cortex XSOAR Container Registry

We automatically update our open-source Docker images and their accompanying dependencies (OS and Python). Examples of automatic updates can be viewed on [GitHub](https://github.com/demisto/dockerfiles/pull/700).

We maintain Docker image information, which includes information on Python packages, OS packages, and image metadata for all our Docker images. [Data image information](https://github.com/demisto/dockerfiles-info/blob/master/README.md) is updated nightly.

All of our images are continuously scanned using Prisma Cloud for known and newly published vulnerabilities, in two scenarios:

-   Every new image, and every new version of an image, are scanned before publishing to our public registries, as part of our CI/CD process.
    
-   All existing images are continuously scanned to check whether new vulnerabilities have been published and now exist in those images.
    

We evaluate all critical/high findings and actively work to prevent and mitigate security vulnerabilities.

Cortex Cloud ensures container images are fully patched and do not contain unnecessary packages. Patches and dependencies are applied automatically via our open-source Docker file build project.

###### Response Prioritization

We remediate any critical and high level vulnerabilities, irrespective of who found them. Issues may be discovered by external researchers, found during internal testing, encountered by customers or reported by other organizations and vendors.

Any vulnerability with a possible exploitation against our images would be responded to with utmost urgency. If we conclude that there is a risk for our customers we will issue an advisory with recommended actions and mitigations. Advisories are published at: [https://security.paloaltonetworks.com/](https://security.paloaltonetworks.com/).

In each version release (every 3 months,) we publish a new version of our content, which will use the latest and secure versions of our images.

###### Troubleshooting

-   Purge old and unused images periodically.
    
-   If you scanned the Docker images locally, and found some critical CVE’s - Make sure you use the latest version of the pack, as it should have the latest version of the image. In addition, purge the old and unused images with vulnerabilities.

###### Docker FAQs

Frequently asked questions (FAQ) about Docker in Cortex Cloud.

-   **Does Cortex Cloud use COPY or ADD for building images?**
    
    Cortex Cloud uses COPY for building images. The COPY instruction copies files from the local host machine to the container file system. Cortex Cloud does not use the ADD instruction, which could potentially retrieve files from remote URLs and perform operations such as unpacking, introducing potential security vulnerabilities.
    

-   **Should the** **`--restart flag`** **be used?**
    
    The --restart flag should not be used. Cortex Cloud manages the lifecycle of Docker images and restarts images as needed.
    

-   **Can we restrict containers from acquiring additional privileges by setting the no-new-privileges option?**
    
    Cortex Cloud does not support the no-new-privileges option. Some integrations and scripts may need to change privileges when running as a non-root user (such as Ping).
    

-   **Can we apply a daemon-wide custom seccomp profile?**
    
    The [default seccomp profile](https://docs.docker.com/engine/security/seccomp/) from Docker is strongly recommended. The default seccomp profile provides protection as well as wide application compatibility. While you can apply a custom seccomp profile, Cortex Cloud cannot guarantee that it won't block system calls used by an integration or script. If you apply a custom seccomp profile, you need to verify and test the profile with any integrations or scripts you plan to use.
    

-   **Can we use TLS authentication for docker daemon configuration?**
    
    TLS authentication is not used, because Cortex Cloud does not use Docker remote connections. All communication is done via the local Docker IPC socket.
    

-   **How do we set the logging level to** **`info`**?
    
    Set the log level in the [Docker daemon configuration file](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file).
    

-   **Can we restrict Linux kernel capabilities within containers?**
    
    The default Docker settings (recommended) include 14 kernel capabilities and exclude 23 kernel capabilities. Refer to Docker’s [full list of runtime privileges and Linux capabilities](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities).
    
    You can further exclude capabilities via advanced configuration, but will first need to verify that you are not using a script that requires the capability. For example, Ping requires **`NET_RAW`** capability.
    

-   **Is the Docker health check option implemented at runtime?**
    
    The Cortex Cloud tenant monitors the health of the containers and restarts/terminates containers as needed. The Docker health check option is not needed.
    

-   **Can we enable live restore?**
    
    Live restore is not used. Cortex Cloud uses ephemeral Docker containers. Every running container is stateless by design.
    

-   **Can we restrict network traffic between containers?**
    
    Cortex Cloud does not disable inter-container communication by default, as there are use cases where this might be needed. For example, a script communicating with a long running integration which listens on a port, may require inter-container communication. If inter-container communication is not required, it can be disabled by modifying the [Docker daemon configuration.](https://docs.docker.com/engine/reference/commandline/dockerd/)
    

-   **Can we enable user namespace remapping?**
    
    Cortex Cloud does not support user namespace remapping.
    

-   **How do we configure auditing for Docker files and directories?**
    
    Auditing is an operating system configuration, and can be enabled in the operating system settings. Cortex Cloud does not change the audit settings of the operating system.
    

-   **Can we disable the userland proxy?**
    
    If the kernel supports hairpin NAT, you can disable docker userland proxy settings by modifying the [Docker daemon configuration](https://docs.docker.com/engine/reference/commandline/dockerd/).
    

-   **Does Cortex Cloud support the AppArmor profile?**
    
    Cortex Cloud supports the default AppArmor profile (only relevant for Ubuntu with AppArmor enabled).
    

-   **Does Cortex Cloud support the SELinux profile?**
    
    Cortex Cloud supports the default SELinux profile (only relevant for RedHat with SELinux enabled).
    

-   **How does Cortex Cloud handle secrets management?**
    
    For Docker swarm services, a secret is a blob of data, such as password, SSH private keys, SSL certificates, or other piece of data that should not be transmitted over a network or stored unencrypted in a Docker file or in your application’s source code. Cortex Cloud manages integration credentials internally. It also supports using an [external credentials service](https://xsoar.pan.dev/docs/reference/articles/managing-credentials) such as CyberArk.

###### Troubleshoot Docker issues
The following provides troubleshooting solutions for Docker networking and performance issues.

Troubleshoot Docker networking issues

In Cortex Cloud, integrations and scripts run either on the tenant, or on an engine.

If you have Docker networking issues when using an engine, you need to modify the d1.conf file.

1.  On the machine where the Engine is installed, open the **`d1.conf`** file.
    
2.  Add the following to the **`d1.conf`** file:
    
    ```
    {
    	"LogLevel": "info",
    	"LogFile": "/var/log/demisto/d1.log",
    	"EngineURLs": [
    	"wss://1234.demisto.live/d1ws"
    	],
    					"BindAddress": ":443",
    	"EngineID": "XYZ",
    	"ServerPublic": "ABC"
    	"ArtifactsFolder": "",
    	"TempFolder": "",
    	"python.pass.extra.keys": "--network=host"
    	}
    ```
    
3.  Save the file.
    
4.  Restart the engine using **`systemctl restart d1`** or **`service d1 restart`**.
    

Troubleshoot Docker performance issues

This information is intended to help resolve the following Docker performance issues.

-   Containers are getting stuck.
    
-   The Docker process consumes a lot of resources.
    
-   Time synchronization issues between the container and the operating system.
    

**Cause**

The installed Docker package and its dependencies are not up to date.

**Workaround**

1.  Update the package manager cache.
    
    | Linux Distribution | Command |
    | --- | --- |
    | Debian | **`apt-get update`** |
    
2.  (Optional) Check for a newer version of the Docker package.
    
    | Linux Distribution | Command |
    | --- | --- |
    | Debian | **`apt-cache policy docker`** |
    
3.  Update the Docker package.
    
    | Linux Distribution | Command |
    | --- | --- |
    | Debian | **`apt-get update docker`** |

###### Configure Docker pull rate limit

Configure the Docker pull rate limit on public images. Create a Docker user account and receive a higher pull limit.

Docker enforces a [pull rate limit](https://www.docker.com/blog/scaling-docker-to-serve-millions-more-developers-network-egress/) on public images. The limit is based on an IP address or as a logged-in Docker hub user. The default limit (100 pulls per 6 hours) is usually high enough for Cortex Cloud's use of Docker images, but the rate limit may be reached if using a single IP address for a large organization (behind a NAT). If the rate limit is reached, the following error message is issued:

`Error response from daemon: toomanyrequests: You have reached your pull rate limit. You may increase the limit by authenticating and upgrading: https://www.docker.com/increase-rate-limit.`

To increase the limit:

1.  Sign up a free user [in the Docker hub](https://hub.docker.com/signup/).
    
    The pull limit is higher for a registered user (200 pulls per 6 hours).
    
2.  Authenticate the user on the engine machine by running the following command.
    
    **`sudo -u demisto docker login`**
    
3.  (Optional) Instead of manually logging in to Docker to pull images, you can edit the [Docker config file](https://docs.docker.com/engine/reference/commandline/login/) to use credentials from the file or from a credential store.

###### Change the Docker installation folder

Instructions for changing the default Docker folder.

The **`/var/lib/docker/`** folder is the default Docker folder for Ubuntu, Fedora, and Deblan in a standard engine installation.

To change the Docker folder:

1.  Stop the Docker daemon.
    
    **`sudo service docker stop`**
    
2.  Create a file called **`daemon.json`** under the **`/etc/docker`** directory with the following content:
    
    ```
    {
            "data-root": "<path to your Docker folder>"
      }
    ```
    
3.  Copy the current data directory to the new one.
    
    **`sudo rsync -aP /var/lib/docker/ <path to your Docker folder>`**
    
4.  Rename the old docker directory.
    
    **`sudo mv /var/lib/docker /var/lib/docker.bkp`**
    
5.  After confirming that the change was successful, you can remove the backup file.
    
    **`sudo rm -rf /var/lib/docker.bkp`**
    
6.  Start the Docker daemon.
    
    **`sudo service docker start`**

###### Docker hardening guide

Use the Docker Hardening Guide to configure the Cortex Cloud settings when running Docker containers.

The following describes the engine settings we recommend for securely running Docker containers.

When editing the configuration file, you can limit container resources, open file descriptors, limit available CPU, and more. For example, add the following keys to the configuration file:

`{"docker.run.internal.asuser": true,"limit.docker.cpu": true,"limit.docker.memory": true,"python.pass.extra.keys": "--pids-limit=256##--ulimit=nofile=1024:8192"}`

**Tip:**

We recommend reviewing _Docker network hardening_ below before changing any parameters in the configuration file.

To securely run Docker containers, we recommend using the latest Docker version.

You can _Check Docker Hardening Configurations_ to verify that the Docker container has been hardened according to the settings we recommend.

**Note:**

The settings below can also be applied to Podman, with the exception of limiting available memory, limiting available CPU, and limiting PIDS.

Docker network hardening

Docker creates its networking stack that enables containers to communicate with other networking endpoints. You can use iptables rules to restrict which networking sources the containers communicate with. By default, Docker uses a networking configuration that allows unrestricted communication for containers, so that containers can communicate with all IP addresses.

-   **Block network access to the host machine**
    
    Integrations and scripts running within containers do not usually require access to the host network. For added security, you can block network access from containers to services running on the engine machine.
    
    For example, to limit all source IPs from containers that use the IP ranges 172.16.0.0/12, run **`sudo iptables -I INPUT -s 172.16.0.0/12 -d 10.18.18.246 -j DROP`**. This also ensures that new Docker networks that use addresses in the IP address range of 172.16.0.0/12 are blocked from access to the host private IP. The default IP range used by Docker is 172.16.0.0/12. If you configured a different range in Docker's **`daemon.json`** config file, use the configured range. Alternatively, you can limit specific interfaces by using the interface name, such as **`docker0`**, as a source.
    
    1.  Add the following iptables rule for each private IP on the tenant machine:
        
        **``sudo iptables -I INPUT -s <_`IP address range`_> -d <_`host private ip address`_> -j DROP``**
        
    2.  (Optional) To view a list of all private IP addresses on the host machine, run **`sudo ifconfig -a`**
        
    

-   **Assign a Docker network for a Docker image**
    
    If your engine is installed on a cloud provider such as AWS or GCP, it is best practice to block containers from accessing the cloud provider’s instance metadata service. The metadata service is accessed via IP address **`169.254.169.254`**. For more information about the metadata service and the data exposed, see the AWS and GCP documentation
    
    There are cases where you might need to provide access to the metadata service. For example, access is required when using an AWS integration that authenticates via the available role from the instance metadata service. You can create a separate Docker network, without the blocked iptable rule, to be used by the AWS integration’s Docker container. For most AWS integrations, the relevant Docker image is: **`demisto/boto3py3`**
    
    1.  Create a new Docker network by running the following command:
        
        **`sudo docker network create -d bridge -o com.docker.network.bridge.name=docker-metadata aws-metadata`**
        
    2.  Edit the engine configuration file either by editing the `d1.conf` file, or If you installed via Shell, you can edit the configuration in the UI as well as editing the file directly. For details, see Configure engines.
        
    3.  Add the following key.
        
        **`"python.pass.extra.keys.demisto/boto3py3": "--network=aws-metadata"`**
        
    4.  Save the changes.
        
    5.  Restart the demisto service on the engine machine.
        
        **`sudo systemctl start d1`**
        
        (Ubuntu) **`sudo service d1 restart`**
        
    6.  Verify the configuration of your new Docker network:
        
        **`sudo docker network inspect aws-metadata`**
        
    

-   **Block internal network access**
    
    In some cases, you might need to block specific integrations from accessing internal network resources and allow the integrations to access only external IP addresses. We recommend this setting for the Rasterize integration when used to Rasterize untrusted URLs or HTML content, such as those obtained via external emails. With internal network access blocked, a rendered page in the Rasterize integration cannot perform an SSRF or DNS rebind attack to access internal network resources.
    
    1.  Create a new Docker network by running the following command:
        
        **`sudo docker network create -d bridge -o com.docker.network.bridge.name=docker-external external`**
        
    2.  Block network access to the host machine for the new Docker network:
        
        **`iptables -I INPUT -i docker-external -d <host private ip> -j DROP`**
        
    3.  Block network access to cloud provider instance metadata:
        
        **`sudo iptables -I DOCKER-USER -i docker-external -d 169.254.169.254/32 -j DROP`**
        
    4.  Block internal network access:
        
        **`sudo iptables -I DOCKER-USER -i docker-external -d 10.0.0.0/8 -j DROP`**
        
        **`sudo iptables -I DOCKER-USER -i docker-external -d 172.16.0.0/12 -j DROP`**
        
        **`sudo iptables -I DOCKER-USER -i docker-external -d 192.168.0.0/16 -j DROP`**
        
    5.  Edit the engine configuration file either by editing the `d1.conf` file, or If you installed via Shell, you can edit the configuration in the UI as well as editing the file directly. For details, see Configure engines.
        
    6.  Add the following key to run integrations that use the **`demisto/chromium`** Docker image with the Docker network **`external`**.
        
        **`"python.pass.extra.keys.demisto/chromium": "--network=external"`**
        
    7.  Save the changes.
        
    8.  Restart the demisto service on the engine machine.
        
        **`sudo systemctl start d1`**
        
        (Ubuntu) **`sudo service d1 restart`**
        
    9.  Verify the configuration of your new Docker network:
        
        **`sudo docker network inspect external`**
        
    

-   **Persist iptables rules**
    
    By default, iptables rules are not persistent after a reboot. To ensure your changes are persistent, save the iptables rules by following the recommended configuration for your Linux operating system:
    
    -   [Ubuntu](https://help.ubuntu.com/community/IptablesHowTo)
        
    -   [Red Hat and related operating system flavors](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/sec-setting_and_controlling_ip_sets_using_iptables)
        
    

Configure Docker images

You can apply more specific fine tuned settings to Docker images, according to the Docker image name or the Docker image name including the image tag. To apply settings to a Docker image name, add the advanced configuration key to the engine configuration file. If you apply Docker image specific settings, they will be used instead of the general **`python.pass.extra.keys`** setting. This overrides the general memory and CPU settings, as needed.

1.  Edit the engine configuration file either by editing the `d1.conf` file, or If you installed via Shell, you can edit the configuration in the UI as well as editing the file directly. For details, see Configure engines.
    
2.  Add the following key to apply settings to a Docker image name.
    
    **`"python.pass.extra.keys.<image_name>"`**
    
    For example, **`"python.pass.extra.keys.demisto/dl"`**.
    
    -   To apply settings to a Docker image name, including the image tag, use **`"python.pass.extra.keys.<image_name>": "<image_tag>"`**.
        
        For example, **`"python.pass.extra.keys.demisto/dl": "1.4"`**.
        
    -   To set the Docker images **`demisto/dl`** (all tags) to use a higher max memory value of 2g and to remain with the recommended PIDs and ulimit, add the following to the configuration file:**`"python.pass.extra.keys.demisto/dl": "--memory=2g##--ulimit=no- file=1024:8192##--pids-limit=256"`**
        
    
3.  Save the changes.
    
4.  Restart the demisto service on the engine machine.
    
    **`sudo systemctl start d1`**
    
    (Ubuntu) **`sudo service d1 restart`**
    

Run Docker with non-root internal users

For additional security isolation, we recommend to run Docker containers as non-root internal users. This follows the principle of least privilege.

1.  Edit the engine configuration file either by editing the `d1.conf` file, or If you installed via Shell, you can edit the configuration in the UI as well as editing the file directly. For details, see Configure engines.
    
2.  Add the following key:
    
    **`"docker.run.internal.asuser": true`**
    
3.  For containers that do not support non-root internal users, add the following key:
    
    **`"docker.run.internal.asuser.ignore" : "_A comma separated list of container names. The engine matches the container names according to the prefixes of the key values>_"`**
    
    For example, **`"docker.run.internal.asuser.ignore"="demisto/python3:","demisto/python:"`**
    
    The engine matches the key values for the following containers:
    
    ```
    demisto/python:1.3-alpine
    demisto/python:2.7.16.373
    demisto/python3:3.7.3.928
    demisto/python3:3.7.4.977
    ```
    
    The **`:`** character should be used to limit the match to the full name of the container. For example, using the **`:`** character does not find **`demisto/python-ubuntu:2.7.16.373`**.
    
4.  Save the changes.
    
5.  Restart the demisto service on the engine machine.
    
    **`sudo systemctl start d1`**
    
    (Ubuntu) **`sudo service d1 restart`**
    

Configure the memory limit support without swap limit capabilities

When a container exceeds the specified amount of memory, the container starts to swap. Not all Linux distributions have the swap limit support enabled by default.

-   Red Hat distributions usually have swap limit support enabled by default.
    
-   Ubuntu distributions usually have swap limit support disabled by default.
    

To protect the host from a container using too many system resources (either because of a software bug or a DoS attack), limit the resources available for each container. In the engine configuration file, some of these settings are set using the advanced parameter: **`python.pass.extra.keys`**. This key receives as a parameter full **`docker run`** options, separated with the **`##`** string.

How to check if your system supports swap limit capabilities

1.  On the engine machine, run the following command:
    
    **`sudo docker run --rm -it --memory=1g demisto/python:1.3-alpine true`**
    
2.  If **`swap limit capabilities`** is enabled, configure the memory limitation . (To test the memory, see step 5 of configure the memory limitation.)Docker hardening guideDocker hardening guide
    
3.  If you see the following message in the output (the message may vary between Docker versions):
    
    **`WARNING: Your kernel does not support swap limit capabilities or the cgroup is not mounted. Memory limited without swap.`**
    
    You have 2 options:
    
    -   Configure **`swap limit capabilities`** by following the [Docker documentation](https://docs.docker.com/config/containers/resource_constraints/).
        
    -   See How to configure the memory limit support without swap limit capabilities.
        
    
    If you see the **`WARNING: No swap limit support`** you can configure memory support without swap limit capabilities.
    

How to configure the memory limit support without swap limit capabilities

1.  Edit the engine configuration file either by editing the `d1.conf` file, or If you installed via Shell, you can edit the configuration in the UI as well as editing the file directly. For details, see Configure engines.
    
2.  Add the following key to disable swap memory enforcement:
    
    **`"python.pass.extra.keys": "--memory=1g##--memory-swap=-1"`**
    
    If you have the **`python.pass.extra.keys`** already set up with a value, add the value after the **`##`** separator.
    
3.  Save the changes.
    
4.  Restart the demisto service on the engine machine.
    
    **`sudo systemctl start d1`**
    
    (Ubuntu) **`sudo service d1 restart`**
    

Configure the memory limitation

We recommend limiting available memory for each container to 1 GB.

If **`swap limit capabilities`** is enabled (see **How to check if your system supports swap limit capabilities** above), in Cortex Cloud configure the memory limitation using the following advanced parameters.

1.  Edit the engine configuration file either by editing the `d1.conf` file, or If you installed via Shell, you can edit the configuration in the UI as well as editing the file directly. For details, see Configure engines.
    
2.  Add the following keys.
    
    **`"limit.docker.memory": true, "docker.memory.limit": "1g"`**
    
    **Note:**
    
    If you do not want to apply Docker memory limitations, you should explicitly set the advanced parameter: **`limit.docker.memory`** to **`false`**.
    
3.  Save the changes.
    
4.  Restart the demisto service on the engine machine.
    
    **`sudo systemctl start d1`**
    
    (Ubuntu) **`sudo service d1 restart`**
    
5.  Test the memory limit.
    
    1.  In the Script Name file, type **`TestMemory`**.
        
    2.  Add the following script:
        
        ```
        from multiprocessing import Process
        import os
        
        
        def big_string(size):
            sys.stdin = os.fdopen(0, "r")
            s = 'a' \* 1024
            while len(s) < size:
                s = s \* 2
            print('completed creating string of length: {}'.format(len(s)))
        
        
        size = 1 \* 1024 \* 1024 \* 1024
        p = Process(target=big_string, args=(size, ))
        p.start()
        p.join()
        if p.exitcode != 0:
            return_error("Return code from sub process indicates failure: {}".format(p.exitcode))
        else:
            print("Success allocating memory of size: {}".format(size))
        ```
        
    3.  In the SCRIPT SETTINGS section, select the script to run on the Single engine and select the engine where you want to run the script.
        
    4.  Save the script.
        
    5.  To test the memory limit, type **`!TestMemory`**. The command returns an error when it fails to allocate 1 GB of memory.
        
    

Configure the CPU, PIDs, and open file descriptors limit

Set the advanced parameters to configure the CPU limit, PIDs limit, and the open file descriptor limit.

1.  Edit the engine configuration file either by editing the `d1.conf` file, or If you installed via Shell, you can edit the configuration in the UI as well as editing the file directly. For details, see Configure engines.
    
2.  Add the following keys:
    
    | Parameter | Key |
    | --- | --- |
    | Available CPU limit | **`"limit.docker.cpu": true, "docker.cpu.limit": "_<CPU Limit>_"`** We recommend to limit each container to 1 CPU. (For example, **`1.0`**. Default is 1.0). |
    | PIDs limit | **`"python.pass.extra.keys": "--pids-limit=256"`** |
    | Open file descriptors limit | **`"python.pass.extra.keys": "--ulimit=nofile=1024:8192"`** |
    
3.  Save the changes.
    
4.  Restart the demisto service on the engine machine.
    
    **`sudo systemctl start d1`**
    
    (Ubuntu) **`sudo service d1 restart`**
    

Check Docker hardening configurations

Check your Docker hardening configurations on an engine by running the **`!DockerHardeningCheck`** command in the Case/Issue War Room CLI. The results show the following:

-   Non-root User
    
-   Memory
    
-   File descriptors
    
-   CPUs
    
-   PIDs
    

Before running the command, ensure that your engine is up and running.

1.  Update the **`DockerHardeningCheck`** script to run on the engine.
    
    1.  Go to Investigation & Response → Automation → Scripts → DockerHardeningCheck → Settings.
        
    2.  In the Run on field select Single engine and from the list, select the engine you want to run the script.
        
    3.  Save the script.
        
2.  Verify the Docker container has been hardened according to recommended settings. In the Case/Issue War Room CLI, run the **`!DockerHardeningCheck`** command.

###### Podman

Run Podman containers instead of Docker for RHEL v8.

[Podman](https://podman.io/) is a daemonless container engine for developing, managing, and running [OCI Containers](https://opencontainers.org/) on Linux systems. Containers can either be run as root or in rootless mode.

If you use the Shell installer to install an engine, Cortex Cloud automatically detects the container management type based on the operating system. For example, if your operating system is running RHEL v8 and higher, Cortex Cloud installs Podman packages and configures the operating system to enable Podman in rootless mode.

**Note:**

When upgrading an engine, the engine keeps the previously used container management type (regardless of distribution version).

If using PowerShell integrations, you may need to configure the default SELinux policy as Podman can affect processes that **`mmap`** to **`/dev/zero`**.

Docker hardening guidelines

Docker hardening guidelines can be applied to Podman, except Limit Available Memory, Limit Available CPU, and Limit PIDS.

###### Change the container storage directory
By default, Podman uses the **`$HOME/.local/share/containers/storage`** directory. To use a different directory for container storage, edit the [Podman config file](https://github.com/containers/podman/blob/main/vendor/github.com/containers/storage/storage.conf#L33) located at **`/home/demisto/.config/containers/storage.conf`**. If the Podman config file does not exist, you need to create it and change the ownership.

The new storage directory needs to be owned by the **demisto** user, otherwise, they will be denied access to it.

**Warning:**

Do not use NAS storage or a temporary (tmpfs) directory for the **`graphroot`** setting. The **`graphroot`** needs to be a local, non-temporary directory for Podman to work. For more information, see [https://en.wikipedia.org/wiki/Network-attached_storage](https://en.wikipedia.org/wiki/Network-attached_storage).

**Tip:**

We recommend reserving 150 GB for container storage, either in the /home partition or a different storage directory that you have set using the **`graphroot`** key.

1.  If the Podman config file does not exist:
    
    1.  Create the Podman config file.
        
        **`sudo mkdir -p /home/demisto/.config/containers`**
        
        **`cp /etc/containers/storage.conf /home/demisto/.config/containers`**
        
    2.  Change the ownership of the Podman config file.
        
        **`sudo chown -R demisto:demisto /home/demisto`**
        
    
2.  To set a different directory for container storage, change the key: **`graphroot`** in the **`storage.conf`** file. For example:
    
    **`graphroot = "/var/lib/containers/cortex-storage"`**
    
3.  Some additional changes are required in the storage.conf file. Comment out the **`runroot`** setting by adding a **`#`** (hash) before it. For example:
    
    **`#runroot = "/run/containers/storage"`**
    
    **Note:**
    
    Alternatively, the **`runroot`** setting may be set to some temporary directory that is accessible by the user demisto. If you choose to set the **`runroot`**, it must be a directory that is mounted as tmpfs (temporary filesystem), unlike the graphroot.
    
4.  Under [storage.options.overlay], uncomment the following line (remove the # from the start):
    
    **`mount_program = "/usr/bin/fuse-overlayfs"`**
    
5.  If the engine has already been installed, apply your changes to any existing containers:
    
    **`sudo -u demisto podman system migrate`**
    
6.  Verify the change (once the engine is installed):
    
    **`sudo -u demisto podman info | grep graph`**

###### Install Podman

Install Podman on engines for RHEL v8 or later.

When installing a new engine on RHEL 8 or later, the shell installer configures Podman automatically. There are some cases, however, where you might need to install Podman manually:

-   When using an installation method other than the shell installer (e.g., an RPM package) on RHEL 8 or later.
    
-   When the shell installer did not successfully install Podman.
    
-   When you want to migrate from Docker to Podman for an existing Cortex Cloud engine.
    

**Note:**

-   This procedure is intended for RHEL 8 or later. It may not work for other operating system types.
    
-   Do not use [NAS storage](https://en.wikipedia.org/wiki/Network-attached_storage) for the $HOME directory. The directory needs to be a local directory for Podman to work.
    

1.  For RHEL 8, install Podman by typing the following commands:
    
    -   **`sudo yum -y install slirp4netns fuse-overlayfs`**
        
    -   **`sudo yum -y module install container-tools`**
        
    
    For RHEL 9 or later, install Podman by typing the following command:
    
    -   **`sudo yum -y install slirp4netns fuse-overlayfs podman`**
        
    
2.  Run the following commands:
    
    -   **`sudo touch /etc/subuid /etc/subgid`**
        
    -   **`sudo mkdir -p /home/demisto`**
        
    -   **`sudo chown demisto:demisto /home/demisto`**
        
    
3.  Configure the **`unqualified-search-registries`** used by Podman.
    
    Podman by default uses the fedoraproject.org, redhat.com, and docker.io unqualified search registries. SinceCortex Cloud images use only the docker.io registry, you can speed up download times for container images by setting **`unqualified-search-registries`** to just docker.io.
    
    1.  Create or edit the **`/home/demisto/.config/containers/registries.conf`** config file.
        
    2.  In the file, set **`unqualified-search-registries = ["docker.io"]`**
        
        **Note:**
        
        If you edit the file with the **`root`** user, make sure to set the **`demisto`** user as file owner by running **`chown demisto:demisto /home/demisto/.config/containers/registries.conf`**
        
4.  Change the **`subuids`** and **`subgids`** by running the following command:
    
    **`sudo usermod --add-subuids 200000-265535 --add-subgids 200000-265535 demisto`**
    
5.  Migrate existing containers to Podman:
    
    **`sudo sh -c "cd /; runuser -u demisto -- podman system migrate"`**
    
6.  Set the **`net.ipv4.ping-group-range`**, by typing the following commands:
    
    -   **`sudo sh -c "echo 'net.ipv4.ping_group_range=0 2000000' > /etc/sysctl.d/demisto-ping.conf"`**
        
    -   **`sudo sysctl -w "net.ipv4.ping_group_range=0 2000000"`**
        
    
7.  As root user, edit the following **`config`** file:
    
    **`/usr/local/demisto/d1.conf`**
    
8.  Change the **`"container.engine.type": "docker"`** to **`“podman"`**.
    
    If this line does not exist, add the following line to the file:
    
    **`"container.engine.type": "podman"`**
    
    ```
    "Server": {
                    "HttpsPort": "443",
                    "ProxyMode": true
            },
            "container": {
                                    "engine": {
                                            "type": "podman"
                                    }
            },
            "db": {
                    "index": {
                            "entry": {
                                    "disable": true
    ```
    
9.  If the engine is running, restart the service.
    
    **`sudo systemctl restart d1`**
    
    **Note:**
    
    If the Allow running multiple engines on the same machine option is selected, run the command:
    
    **`sudo systemctl restart d1_<Engine _name>`**

###### Migrate From Docker to Podman

Switch from Docker to Podman when installing an engine for RHEL 8 or later.

Although Podman is set up automatically in an engine installation, it is possible to migrate from Docker to Podman in an existing engine. Follow the Podman installation instructions to migrate.

###### Troubleshoot Podman

Troubleshoot process leaks or installation issues for Podman in Cortex Cloud,

###### dbus-daemon process leak

Podman version 3.4.1 and lower has a [known issue](https://github.com/containers/podman/issues/9727) that dbus-daemon processes may leak when running in an environment containing the dbus-x11 OS package. The issue occurs when the dbus-x11 OS package is installed, for example, when installing an X11 desktop environment like GNOME desktop on the host machine. If you experience this issue, you see a large number of dbus-daemon processes owned by the demisto OS user. To check if you are affected by the issue, run the following command:

**`ps -fe | grep demisto | grep dbus-daemon`**

To fix this issue:

1.  Remove the dbus-x11 OS package and dependent packages by running the following command:
    
    **`sudo yum remove dbus-x11`**
    
2.  After removal you can kill the leaked dbus-daemon processes by running the following OS command:
    
    **`pgrep -u demisto dbus-daemon | xargs sudo kill`**
    

###### Invalid argument error

When Podman fails to run with an “Invalid argument” error, such as:

```
ERRO[0000] running \`/usr/bin/newuidmap 15936 0 1029 1 1 165536 65536 65537 200000 65536\`: newuidmap: write to uid_map failed: Invalid argument
Error: cannot set up namespace using "/usr/bin/newuidmap": exit status 1
```

This can be caused by duplicate lines for Cortex Cloud in `/etc/subuid` and `/etc/subgid`.

To fix this issue:

1.  Check if the `/etc/subuid` file contains multiple lines that start with the Cortex Cloud username (usually demisto). For example:
    
    ```
    alice:100000:65536
    demisto:165536:65536
    demisto:200000:65536
    splunk:331072:65536
    ```
    
2.  If this is the case, edit the file as root, and remove the extra line(s) for Cortex Cloud. The line you should keep is the one that ends with 200000:65536. Continuing with the above example, here is the end result:
    
    ```
    alice:100000:65536
    demisto:200000:65536
    splunk:331072:65536
    ```
    
3.  Repeat the above steps for the `/etc/subgid` file.
    

###### Verify Podman installation

When encountering errors in Cortex Cloud that are Podman related, such as:

-   **`failed to run "docker ps". stderr: [], err: [Timeout. Process killed (1400)`**
    
-   **`Timeout while waiting for pong response [error 'Read timed out (15s)`**
    
-   **`Error: error joining network namespace of container 06b8aec6eabe2e735128e3a72cb06c8ae2d97ade60a56ab555034442ea4e2a84: error retrieving network namespace at /tmp/podman-run-989/netns/cni-86dca01c-bd84-1aaf-85fb-72b659a8e42a: unknown FS magic on "/tmp/podman-run-993/netns/cni-86dca01c-bd84-1aaf-85fb-72b659a8e42a": 58465342`**
    

1.  Verify that Podman is running properly with the **`demisto`** OS user by performing the following steps:
    
    -   Change the OS user to **`demisto`** by running the following command:
        
        **`sudo su - -s /bin/bash demisto`**
        
    -   Check that your system complies with the minimum requirements, and view general system information such as host architecture, CPU, OS, registries, container storage path, etc., by running the following command:
        
        **`podman info`**
        
    -   Check all active running containers, container names, and IDs by running the following command:
        
        **`podman ps`**
        
    -   Check that Podman can run a container by running the following command:
        
        **`podman run --rm -t demisto/python3:3.10.4.29342 echo "podman is working"`**
        
    
    If any of the Podman commands are not working, try running with the **`--log-level=debug`** to receive additional details as to why it is failing. For example:
    
    `podman --log-level=debug ps`
    
    `podman --log-level=debug ps podman --log-level=debug run --rm -t demisto/python3:3.10.4.29342 echo "podman is working"`
    
2.  Reset the Podman Data Directories.
    
    If the Podman commands in step 1 are failing, you should clean the Podman working directories. Sometimes Podman's data directories get corrupted (for example, as a result of insufficient disk space).
    
    **Note:**
    
    This step removes all Podman images, including any custom images you may have created.
    
    1.  Stop the engine by running the following command:
        
        **`sudo systemctl stop d1`**
        
    2.  Ensure that all Podman containers of the **`demisto`** user are stopped by running the following command:
        
        **`ps -fe | grep demisto | grep 'podman run'`**
        
        If required, kill the running containers.
        
    3.  Delete the following directories (assuming the **`demisto`** OS user's home directory is at: /home/demisto)
        
        -   **`sudo rm -rf /home/demisto/.cache/containers/`**
            
        -   **`sudo rm -rf /home/demisto/.local/share/containers/`**
            
        -   **`sudo rm -rf /tmp/podman-run-$(id -u demisto)`**
            
        -   **`sudo rm -rf /tmp/containers-user-$(id -u demisto)`**
            
        -   **`sudo rm -rf /tmp/tmp/run-$(id -u demisto)`**
            
        
        **Note:**
        
        **`$(id -u demisto)`** is used to get the **`demisto`** user ID, which is part of the directory name. For example, **`/tmp/podman-run-993`**
        
        Not all the directories above may be present.
        
    4.  Start the engine by running the following command:
        
        **`sudo systemctl start d1`**
        
    5.  Verify that Podman is working properly with the **`demisto`** OS user by following step 1.
        

###### Unused containers are taking up resources

In some cases, if the Podman process crashes or is killed abruptly, it can leave containers on disk. You might see errors such as `error allocating lock for new container: allocation failed; exceeded num_lock` when the maximum number of locks used to manage containers is exhausted due to the unused containers that remain.

1.  Change to the demisto operating system user `sudo su - -s /bin/bash demisto`.
    
2.  Run `podman ps -a -f status=exited` to check for unused containers.
    
3.  Clean up the unused containers `podman container cleanup --rm -a`.
    
    **Note:**
    
    When you run `podman container cleanup --rm -a`, you might see a message such as `running or paused containers cannot be moved without force`. The message can be safely ignored, as it only pertains to current running containers, which are not removed.
    
4.  After cleanup, verify there are no remaining unused containers `podman ps -a -f status=exited`.
    

###### Keyring quota exceeded error

`Script failed to run: Docker code runner got container error: [Docker code script is in inconsistent state, ... error: [exit status 126] stderr: [Error: OCI runtime error: crun: create keyring ...: Disk quota exceeded]`

By default, Podman creates a `keyring` that is used by each container. The limit per user on the machine might be low, and Podman can reach the limit when running more containers than the `keyring` limit. To check the `keyring` usage, run the **`sudo cat /proc/key-users`** operating system command.

The command returns the usage for each UID (to retrieve the demisto user UID, run **`id demisto`** ). The fourth column shows the number of keys used out of the total number available. For more information about keys, see [Kernel Key Retention Service](https://www.kernel.org/doc/Documentation/security/keys.txt).

You can either increase the limit of max keyrings (increasing to 1000 is safe and reasonable) per user, as specified by your Linux vendor documentation or you can disable keyring creation by Podman. We recommend disabling keyring creation unless keyrings are used by Podman in other applications on the machine. To disable keyring creation by Podman, modify the `containers.conf` file and add the option `keyring = false` under the `"[containers]"` section. For more information, see the [Containers Engine Configuration File](https://github.com/containers/common/blob/main/docs/containers.conf.5.md).

###### error "exit status 125" and output "Error: chown ... operation not permitted "

If the container storage directory is not owned AND exclusively used by the demisto user, scripts will fail to run. See the Podman section for more information about assigning ownership of the storage directory.

###### Report a support case for installation issues

If the procedure set out in the Verify Podman installation section above does not solve the Podman issue and you require assistance from Support, do the following:

1.  Include the following files as part of the support case:
    
    -   **`/etc/containers/storage.conf`**
        
    -   **`/home/demisto/.config/containers/storage.conf`**
        
        If the file does not exist, indicate that there is no such file.
        
    -   **`/home/demisto/.config/containers/registries.conf`**
        
        If the file does not exist, indicate that there is no such file.
        
    
2.  Include the output of the following commands as the **`demisto`** user.
    
    **Note:**
    
    To change to the **`demisto`** OS user, run the following command:
    
    **`sudo su - -s /bin/bash demisto`**
    
    -   **`podman info`**
        
    -   **`podman images`**
        
    -   **`podman --log-level=debug ps`**
        
    -   **`podman --log-level=debug run --rm -t demisto/python3:3.10.4.29342 echo "podman is working"`**
        
    

###### Permission issues with directories under the /run path

When installing a Cortex Cloud engine on a RHEL system (version 8 or later), or when running an integration on such an engine, you get a permission error for a path under `/run` (for example `/run/user/0` or `/run/libpod`).

1.  In RHEL 9 only: Make sure the `container-tools` meta-package is installed by running:
    
    `yum -y install container-tools`
    
2.  Run the following commands:
    
    -   `cp /etc/containers/storage.conf /home/demisto/.config/containers/storage.conf`
        
    -   `chown demisto:demisto /home/demisto/.config/containers/storage.conf`
        
    -   `chmod 600 /home/demisto/.config/containers/storage.conf`
        
    
3.  Edit `/home/demisto/.config/containers/storage.conf`.
    
    -   Under `[storage]`, change `runroot` to some temporary directory that is accessible by user `demisto`.
        
        **Important:**
        
        The `runroot` must be located under the `tmpfs` file system type. This is required to clean Podman's run state on reboot and for performance reasons.
        
    -   Also under `[storage]`, change `graphroot` (where container images are stored) to any location that is owned and accessible by user `demisto`. We recommend using this standard path:
        
        `graphroot = "/home/demisto/.local/share/containers/storage"`
        
        **Caution:**
        
        Unlike the `runroot`, the `graphroot` must NOT be located under the `tmpfs` file system type. Using `tmpfs` for the `graphroot` might corrupt container images, causing command executions to fail. It also degrades performance by forcing Podman to needlessly re-pull images.
        
    -   Under `[storage.options.overlay]`, uncomment the following line (remove the # from the start):
        
        `mount_program = "/usr/bin/fuse-overlayfs"`
        
    
4.  Save the file and run the following.
    
    **Note:**
    
    You must switch to user `demisto` before running the "system migrate" (running it as root will have no effect).
    
    -   `su - demisto`
        
    -   `podman system migrate`
        
    
5.  Also as user `demisto`, run the following to ensure the path changes were applied:
    
    `podman info | grep Root`
    
    You should see the correct runRoot and graphRoot settings.
    
6.  As user `demisto`, verify the issue is resolved by running:
    
    `podman run hello-world`
    
7.  If the issue persists, purge Podman's database by running the following:
    
    **Note:**
    
    The "system migrate" must be done by the user demisto.
    
    -   `rm -rf /home/demisto/.local/share/containers/*`
        
    -   `podman system migrate`

##### Manage engines

Manage engines and load balancing groups.

You can view engine names, hosts, status, connection, and other engine information.

You can do the following:

| Option | Description |
| --- | --- |
| Load-Balancing Group | It is useful to create separate load-balancing groups. For example: Use separate load-balancing groups for different integrations and instances. Create Load-Balancing groups for certain tasks, which can help segregate the infrastructure of critical integrations.; Managed Security Service Providers may want to split internal engines and SaaS product engines.; If you have multiple AWS accounts that are not connected and do not want a single point of failure for AWS integrations that use STS. You can do the following: Add/remove engines to a load-balancing group You can only add the engine to the load-balancing group after you have connected the engine. If you want to remove the last engine from a specific load-balancing group, if one or more integration instances use that engine, you will get an error. Before moving the engine, you need to assign Run on to a different engine or no engine for each of the integration instance settings.; Create load-balancing groups When selecting Load-Balancing Group → Add to new group, you can create multiple load-balancing groups and decide which engines are part of each group. Users can move an engine from one group to another. A group will be deleted when the last engine is removed from it. Each engine can only belong to one group. |
| Upgrade Engine | Relevant for Shell installation only. If you didn't install an engine using the Shell installation, you will need to remove the engine and do a fresh installation. For more information, see Upgrade an engine. |
| Get Logs | Logs are located in **`/var/log/demisto`**. For multiple engines, logs are located in **``/var/log/demisto/_`<name of the engine>`_``**. For example, **`var/log/demisto.d1_e1`**. |
| Edit Configuration | Relevant for Shell installation only. Enables you to edit the `d1.conf` file without having to access the file on your remote machine. For more information, see Configure engines. |
| Download Configuration | Download the `d1.conf` file to view the attribute values. |
| Delete Engine | Deletes an engine from Cortex Cloud. To remove the engine from your remote machine, see Remove an engine. |

##### Upgrade an engine

Upgrade an engine on Cortex Cloud or directly on the remote machine.

Whenever there is a Cortex Cloud major version change or a change in tenant-engine protocol version, your engines require an upgrade. On the Engines page, the Status column shows those engines that require upgrades. You can upgrade an engine by doing the following:

-   If you installed the engine using the Shell installer, you can upgrade the engine on the Engines page.
    
-   If you didn't install the engine using the Shell installer, you need to remove the engine and do a fresh install.
    

###### Upgrade an engine (shell installations)

You can upgrade the engine on the Engines page if you have installed the engine using the shell installer. The engine must be connected during the upgrade.

Customize upgrade variables

Before upgrading, we recommend you review the upgrade variables and verify if any need to be set in the `/usr/local/demisto/upgrade.conf` file on the engine. For environments with multiple engines, the file is located at `/usr/local/demisto/<engine-name>/upgrade.conf`. In some cases, usually related to a web proxy server or a custom directory, if you do not configure the `upgrade.conf` file, the upgrade will fail.

The option to set custom upgrade variables is only available for shell installation.

| Variable | Description | Default |
| --- | --- | --- |
| https_proxy | The URL of a web proxy server to use when connecting with the server. The variable name is case sensitive. Other common proxy variables, such as `http_proxy` or `HTTPS_PROXY` are ignored. Use `https_proxy` even if your proxy address begins with `http://`. | Not set |
| SERVER_URLS | The URL to connect to for hash validation. Set this variable if your tenant's address has changed. Use your tenant's API address, with the `api-` prefix added, instead of the UI address. For example: `SERVER_URLS="api-example.us.paloaltonetworks.com"`. Include only the IP/hostname and, optionally, a port. Do not include `https://` or any path at the end. | Public tenant URL |
| TRUST_ANY_CERTIFICATE | Determines whether the connection's SSL certificate must be trusted. This variable must be empty `""` to require certificate trust. When set to `-k`, trusts any certificate. We recommend enabling this setting. Verify first that the engine host has the required CA root certificate, especially if using a proxy. | \-k |
| XSOAR_ENGINE_AUTO_UPGRADE_TMP_DIR | Specifies a directory to use for extracting upgrade files and executing the upgrade. For example, `XSOAR_ENGINE_AUTO_UPGRADE_TMP_DIR="/root/tmp/engine1"` For environments with multiple engines, each engine must use a different temporary directory. This variable must be set if you used the `--target` option in the shell installer. | By default, a random directory under the `/tmp` folder is used. |

Test upgrade connectivity

1.  Test the upgrade connectivity by creating a mock `d1_upgrade.sh` file :
    
    ```
    cd /usr/local/demisto
    echo test > d1_upgrade.sh
    ```
    
    After you create the file, the upgrade cron job removes the file within one minute.
    
2.  Check the upgrade log file `/var/log/demisto/demisto_install.log` for connection-related errors. For hosts with multiple engines, the log file can be found at `/tmp/<engine name>/demisto_install.log`.
    
3.  If the test is successful, the following message appears at the end of the log file, with a recent timestamp: `Validation HTTPS request returned: false`.
    
4.  If you find errors in the log, you may need to change the variables in the `upgrade.conf` file or to change your network configuration.
    

How to upgrade

1.  On the Engines page, select the checkbox for the engine that requires an upgrade.
    
2.  Click Upgrade Engine.
    
    When the upgrade finishes, the version appears in the Cortex Cloud Version column. The upgrade procedure can take several minutes.
    

###### Upgrade an engine (non-shell installations)

If you didn't use the Shell installer, you need to remove the engine and do a fresh install.

1.  On the Engines page, locate the engine that requires an update.
    
2.  In the Download link, click the relevant Download files.
    
3.  On the remote machine, do the following:
    
    -   Remove the existing engine. For more information, see Remove an engine.
        
    -   Install the engine you downloaded in step 2. For more information, see Install an engine.
        
    
    When the upgrade finishes, the version appears in the Cortex Cloud Version column. The upgrade procedure can take several minutes.
    

###### Related information

Troubleshoot engines.

##### Remove an engine

Remove an engine by running the relevant command, depending on your operating system.

You can remove an engine when it is no longer needed.

-   Run one of the following commands according to your operating system:
    
    | Installation | Command |
    | --- | --- |
    | RPM | Get the full package: **`rpm -qa | grep -i ^d1_*`** Remove the package: **``rpm -evv d1_ _`<package name>`_``** |
    | DEB | Get the full package: **`dpkg-query -W -f='${Package}' d1_*`** Remove the package: **``dpkg --purge _`<package name>`_``** |
    | SH | Remove an Engine: **``sudo _`<engine-file-path>`_ -- -purge``** |

##### Configure engines

Configure Cortex Cloud engines by editing the d1.conf file or modifying the configuration in the UI (for shell installations).

When installing an engine, a `d1.conf` file is installed on your machine. Some configurations can only be done by editing the d1.conf file. If you install via Shell, you can edit the configuration in the UI as well as edit the file directly.

A use case for modifying the engine configuration is if you want to generate engine logs for a specific log level.

Edit the `d1.conf` file

1.  On the machine on which you installed the engine, navigate to the `d1.conf` file:
    
    | Installation Type | Location |
    | --- | --- |
    | RPM, DEB, Shell | **`/usr/local/demisto`** If using multiple engines, the location is **``/usr/local/demisto/_`name of the engine>`_``**. For example, **`/usr/local/demisto/d1_e1`** |
    | ZIP | Same folder as the binary. |
    
2.  Modify the file as required. See Common properties when editing an engine configuration
    
    You can also Configure the engine to use a web proxy.
    

**Modify the configuration in Cortex Cloud (Shell installations only)**

Ensure that the data is in JSON format. The properties that you specify override the values defined in the `d1.conf` file.

1.  From the engines table, select the engine for which you want to modify the configuration.
    
2.  Click Edit Configuration.
    
3.  In the JSON formatted configuration dialog box, modify the properties as required. For more information, see Common properties when editing an engine configuration.
    
    
    

Common properties when editing an engine configuration

The following table describes the common properties when editing an engine configuration using the `d1.conf` file (located by default at **`/usr/local/demisto/`**) or in the JSON formatted configuration dialog box in Cortex Cloud.

| Property | Type | Values | Edit |
| --- | --- | --- | --- |
| **`http_proxy`** | String | The IP address of the HTTP proxy through which the engine communicates. For example, see Configure the engine to use a web proxy. | The engine `d1.conf` file. |
| **`https_proxy`** | String | The IP address of the HTTP/s proxy through which the engine communicates. For example, see Configure the engine to use a web proxy. | The engine `d1.conf` file. |
| **`LogLevel`** | String | **`debug`**; **`info`**; **`warning`** | The engine `d1.conf` file or in the JSON formatted configuration dialog box. |
| **`log.rolling.maxfilesize`** | String | The maximum size in MB to retain log files. Default is 20 MB. | The engine `d1.conf` file. |
| **`log.rolling.backups`** | String | The maximum number of log files to retain. Default is 3. | The engine `d1.conf` file. |
| **`log.rolling.maxage`** | String | The maximum number of days to retain old log files based on the time stamp encoded in the file name. Default is 0 (not to retain old log files based on age). \*\*Note:\*\* A day is defined as 24 hours and may not exactly correspond to calendar days due to daylight savings, leap seconds, etc. | The engine `d1.conf` file. |
| **`BindAddress`** | String | The port on which the engine listens for agent connection requests and communication task responses. | The engine `d1.conf` file. |
| **`EngineURLs`** | String array | An array of tenant addresses to which the engine tries to connect. If you change the tenant URL, you need to update this parameter. | The engine `d1.conf` file. \*\*Note:\*\* In addition, to support engine upgrades from the UI, edit the `/usr/local/demisto/upgrade.conf` file on the engine to include the `SERVER_URLS` setting with the new tenant's address. Include only the host, without https:// or any additional path at the end of the host name. For example: `SERVER_URLS="api-example.us.paloaltonetworks.com"` |
| **`LogFile`** | String | Path to the **`d1.log`** file. If you change the name or location of the **`d1.log`** file, you need to update this parameter. | The engine `d1.conf` file. |
| **`engine.handshake.max.retries.slow`** | String | The maximum time in minutes the engine will try to reconnect after losing communication. Default is 600 (10 hours). \*\*Note:\*\* If the engine loses communication for longer than this time, it will disconnect and you need to restart the service. | The engine `d1.conf` file. |

###### Configure the engine to use a web proxy

Configure a Cortex Cloud engine to use a web proxy by editing the d1.conf file.

Proxy settings can be configured in an engine by adding them as an engine configuration.

**Note:**

You need to [configure Docker](https://docs.docker.com/config/daemon/systemd/#httphttps-proxy) to use a proxy. When using a BlueCoat proxy, ensure you encode the values correctly.

1.  On the machine on which you installed the engine, navigate to the `d1.conf` file and add the following keys.
    
    | Key | Value | Description |
    | --- | --- | --- |
    | `http_proxy` | `` http://`<user:password@proxy-server:port#>` `` For example `http://user:password@proxy-server:3128` | Environment uses HTTP proxy. Special characters must be escaped. |
    | `https_proxy` | `` https://`user:password@proxy-server:port#` `` For example, `https://user:password@proxy-server:3128` | Environment uses HTTPS proxy. Special characters must be escaped. |
    | `no_proxy` | `` http://`<user:password@proxy-server:port#>` `` For example `http://user:password@proxy-server:3128` | For specific addresses, a proxy bypass will be applied. Special characters must be escaped. |
    
2.  If the environment variables are not set, or you wish to use different settings than those specified in the environment variables, set the configuration with your specific proxy details in the **`d1.conf`** file. For example:
    
    ```
    {"http_proxy": "http://proxy.host.local:8080",
    "https_proxy": "https://proxy.host.local:8443"
    "no_proxy": "https://proxy.host.local:8020"}
    ```
    
3.  Save the file.
    
4.  On the machine where you installed the engine, navigate to the `upgrade.conf` file and edit the file to set `https_proxy` to your proxy address. For example, `https_proxy="https://proxy.host.local:8443"`.
    
    **Note:**
    
    In an environment with a single engine, go to `/usr/local/demisto/upgrade.conf`. In an environment with multiple engines, go to `/usr/local/demisto/<engine-name>/upgrade.conf`, replacing <engine-name> with the name of the engine.
    
    Note that the key is in the `upgrade.conf` file and must be `https_proxy`, even if your proxy address starts with `http://`.
    
5.  Save the file.

###### Configure the engine to call the server without using a proxy

Configure an engine to call the server without using a proxy.

In some cases, due to specific environment architecture, you may need to configure the engine to use a proxy when working with integrations, but not use a proxy when calling the Cortex Cloud tenant.

1.  On the computer where you have installed the engine, go to the directory for `d1.conf` file.
    
    For RPM, DEB, Shell go to `/usr/local/demisto`.
    
2.  Add the following configuration:
    
    | Key | Value |
    | --- | --- |
    | **`engine.to.server.proxy`** | **`false`** (default is **`true`**) |

###### Use NGINX as a reverse proxy

Use NGINX as a reverse proxy to the Cortex Cloud engines.

NGINX can act as a reverse proxy that sits between internal applications and external clients, forwarding client requests to the appropriate application. Using NGINX as a reverse proxy in front of the engine enables you to provide network segmentation where the proxy can be put on a public subnet (DMZ) while the engine can be on a private subnet, only accepting traffic from the proxy. Additionally, NGINX provides a number of advanced load balancing and acceleration features that you can utilize.

If you want to use an engine (d1) through the reverse proxy, you need to modify `EngineURLs` in the `d1.conf` file to point to the host and port the NGINX server is listening on. In addition to supporting engine upgrades from the UI, edit the `/usr/local/demisto/upgrade.conf` file to add the `SERVER_URLS` setting. `SERVER_URLS` should be set to the proxy’s network address (host and port). For example: `SERVER_URLS="10.0.0.30:1234"`. For SERVER_URLS, include only the IP/hostname and, optionally, a port. Do not include https:// or any path at the end.

Install NGINX

You can install NGINX on the Red Hat/Amazon (yum) and Ubuntu Linux distributions. For full instructions and available distributions, see [NGINX documentation](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/#).

1.  On the engine, run one of the following commands according to your Linux system:
    
    -   **RedHat/Amazon:** **`sudo yum install nginx`**
        
    -   **Ubuntu:** **`sudo apt-get install nginx`**
        
    
2.  (Optional) Verify the NGINX installation by running the following command:
    
    **`sudo nginx -v`**
    

Generate a certificate for NGINX

You should not use self-signed certificates for production systems. It is recommended to use a properly signed certificate for production systems. These instructions are intended only for non-production setups.

1.  To use OpenSSL to generate a self-signed certificate, on the engine machine, run the following command:
    
    **`sudo openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout /etc/nginx/cert.key -out /etc/nginx/cert.crt`**
    
2.  When prompted, complete the on-screen instructions to complete the required fields.
    

Configure NGINX

1.  Open the following NGINX configuration file with your preferred editor:
    
    `/etc/nginx/conf.d/demisto.conf`
    
2.  Use the following configuration template:
    
    Replace **`DEMISTO_ENGINE`** with the appropriate hostname.
    
    ```
    # Replace DEMISTO_ENGINE with the appropriate hostname. If needed, change port 443 to the port on which the engine is listening.
    
    upstream demisto {
        server DEMISTO_ENGINE:443;
    }
    
    # Uncomment to redirect http to https (optional)
    # server {
    #     listen 80;
    #     return 301 https://$host$request_uri;
    # }
    
    server {
       # Change the port if you want NGINX to listen on a different port
        listen 443;
        
        ssl_certificate           /etc/nginx/cert.crt;
        ssl_certificate_key       /etc/nginx/cert.key;
    
        ssl on;
        ssl_session_cache  builtin:1000  shared:SSL:10m;
        ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
        ssl_prefer_server_ciphers on;
    
        access_log            /var/log/nginx/demisto.access.log;
    
        location / {
    
          proxy_set_header        Host $host;
          proxy_set_header        X-Real-IP $remote_addr;
          proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header        X-Forwarded-Proto $scheme;
    
          proxy_pass          https://demisto;
          proxy_read_timeout  90;
        }
    
        location ~ ^/(websocket|d1ws|d2ws) {
            proxy_pass https://demisto;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header Origin "";
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    ```
    
    **Note:**
    
    For multi-tenant deployments, replace **`location ~ ^/(websocket|d1ws|d2ws) {`** with **`location ~ ^/(acc_\S+/)?(websocket|d1ws|d2ws)`**
    
3.  Restart the NGINX server by typing the following command:
    
    **`sudo service nginx restart`**
    
4.  Verify you can access the engine by browsing to the NGINX server host.

###### Configure an engine to use custom certificates

Replace the self-signed certificate for an engine with a valid CA certificate for communication tasks.

You can replace the default self-signed certificate for the engine with your own certificate.

1.  Find the two files created by the engine. The default location is **`/usr/local/demisto`**.
    
    **`d1.key.pem`**
    
    **`d1.cert.pem`**
    
2.  Replace the contents of these files with your own certificates.
    
3.  Change file owner to demisto:
    
    **`chown -R demisto:demisto d1.key.pem`**
    
    **`chown -R demisto:demisto d1.cert.pem`**
    
4.  Set the file permissions:
    
    **`chmod 600 d1.key.pem`**
    
    **`chmod 644 d1.cert.pem`**

##### Use an engine in an integration

Use an engine or a load-balancing group of engines to fetch issues and run commands for an integration.

When you create an integration instance, you can select whether to fetch issues and run commands executed for the integration using the engine or a load-balancing group of engines. After you add the engine or load-balancing group to an integration instance, you can run commands using the engine or load-balancing group by specifying the **`using`** argument in the Issues War Room.

Before configuring an integration to run using multiple engines in a load-balancing group, we recommend that you test the integration using a single engine in the load-balancing group.

**Note:**

Long-running integrations should not run on load-balancing groups.

**Command Example**

**`!url url="www.cnn.com" using=urlscan.io_instance_1`**

##### Run a script using an engine

Run a script on an engine or load-balancing group to distribute the workload and improve performance.

You can run a script on an engine or load-balancing group to distribute the workload and improve performance.

1.  Go to Investigation & Response → Automation → Scripts.
    
2.  Select the script and click Settings.
    
3.  From the BASIC section, in the Run on field, select either a single engine or a load-balancing group.
    
    The option to select an engine or load-balancing group only appears if at least one engine or load-balancing group is connected.
    
4.  From the list, select the name of the engine or load-balancing group.
    
5.  Click Save.

##### Troubleshoot engines

Troubleshoot engines by accessing logs and viewing errors.

**Note:**

Ensure that pop-ups are not blocked by your browser.

**Debug engines**

The d1.log field appears whenever an engine is running. The d1.log field contains information necessary for your customer success team to debug any engine-related issue. The field displays any error, as well as noting whether the engine is connected.

Troubleshoot engine installation

**Note:**

If the installer fails to start due to a permissions issue, even if running as root, add one of the following two arguments when running the installer:

-   `--target <path>` - Extracts the installer files into the specified custom path.
    
-   `--keep` - Extracts the installer files into the current working directory (without cleaning at the end).
    

If using installer options such as `-- -tools=false`, the option should come after the `--target` or `--keep` arguments. For example:

`sudo ./d1-installer.sh --target /some/temp/dir -- -tools=false`

If you set a custom path when you run the installer, you must also set a custom path for upgrading your engine or the upgrade will fail. For more information, see Upgrade an engine.

After installing the engine, check that the engine is connected to the Cortex Cloud tenant and that it is running.

1.  If the engine is not connected, run the following command on the engine server to check if the engine service is running.
    
    **`sudo systemctl status d1`**
    
    **Note:**
    
    If the Allow running multiple engines on the same machine option is selected, run the command:
    
    **`sudo systemctl status d1_<Engine _name>`**
    
2.  Access the d1 log on the engine server.
    
    **`sudo tail -f /var/log/demisto/d1.log`**
    
    -   If the engine service is not running, and there’s nothing relevant in the log, run **`journalctl`** on the engine server to understand why the installation failed.
        
    -   If the engine service is running, review the errors to see if the engine is failing to connect or if there are other issues (ignore all errors related to `\d2ws`, because this is not the same as `d1ws`.) Most often, the server address is incorrect and you will see an error like this:
        
        `error Cannot connect to [wss://<mainServerIP/HostName>/d1ws]: wss://<mainServerIP/HostName>/d1ws: dial tcp: lookup localhost: no such host. . Waiting 3 seconds. Will try until…`
        
        In this case, navigate to `/usr/local/demisto/d1.conf` and change the **`EngineURLs`** parameter to an address the engine can reach. Check the addresses at the beginning of the _upgrade_engine.sh_ file. If the addresses are not correct, set the correct addresses in the `/usr/local/demisto/upgrade.conf` file, as a comma-separated list.
        
        The configurations that might affect the `upgrade_engine.sh` script are the following variables are located at the beginning of the script:
        
        -   **`SERVER_URLS`**
            
        -   **`TRUST_ANY_CERT`**
            
        
        If you make a change to the baseURLs configuration, you must apply the change in `/usr/local/demisto/d1.conf` AND in `/usr/local/demisto/upgrade.conf` under the SERVER_URLS var. For SERVER_URLS, specify only the IP/hostname and, optionally, a port. Do not include `https://` or any path at the end.
        
        If you make a change in the `engine.connection.trust_any_certificate` configuration, you must apply the change in `/usr/local/demisto/upgrade.conf` as follows:
        
        -   If the `engine.connection.trust_any_certificate` configuration was set to true (trust any certificate), set the TRUST_ANY_CERT variable to -k.
            
        -   If the `engine.connection.trust_any_certificate` configuration was set to false, the TRUST_ANY_CERT variable should be blank (““).
            
        
        **Note:**
        
        Any changes made to variables in the `upgrade_engine.sh` file are reset after each upgrade. We recommend instead using the `upgrade.conf` file to set variables.
        
    
    **Note:**
    
    You can ignore the following error: **`Cannot create folder '/var/lib/demisto'`**
    
3.  To check the connectivity from the engine to the Cortex Cloud tenant, see _Troubleshoot engine connectivity_ below.
    
4.  If the installation issue remains, open a support case with logs from the engine.
    
    1.  On the engine server, in `/usr/local/demisto/d1.conf`, set "LogLevel": "debug”.
        
    2.  Restart the d1 service and let it run for a few minutes.
        
        **`sudo systemctl restart d1`**
        
        **Note:**
        
        If the Allow running multiple engines on the same machine option is selected, run the command:
        
        **`sudo systemctl status d1_<Engine _name>`**
        
    3.  Capture a **`journalctl`**:
        
        **`journalctl --since "1 day ago" > engineTroubleshootingJournalctl.log`**
        
    4.  On the engine server, tar up the log, conf, **`journalctl`**, and install log on the engine.
        
        **`tar -cvzf engineLogs.tar.gz /var/log/demisto /usr/local/demisto/d1.conf /tmp/demisto_install.log engineTroubleshootingJournalctl.log`**
        

Troubleshoot engine upgrades

During an upgrade, the upgrade file is sent to the engine server. A cron job running on the engine server checks if that file exists. The most common upgrade error is that the job is not running, so the new installer does not run.

**Note:**

If the installer fails to start due to a permissions issue, even if running as root, add one of the following two arguments when running the installer:

-   `--target <path>` - Extracts the installer files into the specified custom path.
    
-   `--keep` - Extracts the installer files into the current working directory (without cleaning at the end).
    

If using installer options such as `-- -tools=false`, the option should come after the `--target` or `--keep` arguments. For example:

`sudo ./d1-installer.sh --target /some/temp/dir -- -tools=false`

1.  SSH to the machine.
    
2.  Check the d1 service status on the engine server. It is possible that it stopped or doesn't exist.
    
    **`sudo systemctl status d1`**
    
    **Note:**
    
    If the Allow running multiple engines on the same machine option is selected, run the command:
    
    **`sudo systemctl status d1_<Engine _name>`**
    
3.  Access the installer log on the engine server and review the error.
    
    **`sudo vi /tmp/demisto_install.log`**
    
4.  Rerun the installer on the engine using one of the following options. You can open a second window and run **`watch df -h`**. If the problem seems to be disk space, you should resolve the disk space issue and then rerun the installer.
    
5.  Do one of the following:
    
    -   Download the installer from the user interface and copy it to the engine.
        
        Add the following commands:
        
        `sudo chmod +x installer.sh`
        
        `sudo ./installer.sh -- -y`
        
    -   Verify that `/usr/local/demisto/d1_upgrade.sh` exists.
        
        1.  Run the following commands:
            
            `sudo chmod +x /usr/local/demisto/d1_upgrade.sh`
            
            `sudo /usr/local/demisto/d1_upgrade.sh`
            
        2.  If `d1_upgrade.sh` doesn't exist, check if `/usr/local/demisto/archived_d1_upgrade.sh` exists and that it was created at the time of the attempted upgrade.
            
        3.  If the file exists and was created at the time of the attempted upgrade, run the following commands on the engine server:
            
            `sudo chmod +x /usr/local/demisto/archived_d1_upgrade.sh`
            
            `sudo /usr/local/demisto/archived_d1_upgrade.sh`
            
        
    

Troubleshoot engine connectivity

The following provides instructions for troubleshooting connectivity issues from the engine to the endpoint.

1.  Follow the instructions in [network troubleshooting](https://xsoar.pan.dev/docs/reference/articles/troubleshooting-guide#host-based-networking).
    
2.  Ensure that the engine can reach the endpoint by running the following command on the server engine.
    
    **`sudo curl -kvv <endpointURL>`**
    
3.  If the engine could not reach the endpoint, try the IP with curl instruction adding the http(s)//, or try using ping.
    
    If this works, add the IP to the /etc/hosts file with the hostname and try to reach the endpoint again by running the following command on the engine server
    
    **`sudo curl -kvv <endpointURL>`**
    
    If this still fails, then this is an issue of connectivity between the engine and endpoint and you need to resolve this with your networking team.
    
4.  After connectivity has been confirmed via curl:
    
    -   Try connecting within Docker without passing host networking.
        
        **`docker run -it --rm demisto/netutils:1.0.0.6138 curl -kvv <endpointURL>`**
        
        If this succeeds but the integration still fails, it could be an integration credentials issue. In that case, open a [support case](https://support.paloaltonetworks.com/support).
        
    -   If, without passing the host networking fails, run the following:
        
        **`docker run -it --rm --network=host demisto/netutils:1.0.0.6138 curl -kvv <endpointURL>`**
        
        If this succeeds, add **`"python.pass.extra.keys": "--network=host" to /usr/local/demisto/d1.conf`** and retest the integration.
        
        If you see a Docker or SELinux issue, see Troubleshoot Docker networking issues .
        
    
5.  If the installation issue remains, open a support case with logs from the engine.
    
    1.  On the engine server, in `/usr/local/demisto/d1.conf`, set "LogLevel": "debug”.
        
    2.  Restart the d1 service and let it run for a few minutes.
        
        **`sudo systemctl restart d1`**
        
        **Note:**
        
        If the Allow running multiple engines on the same machine option is selected, run the command:
        
        **`sudo systemctl status d1_<Engine _name>`**
        
    3.  Capture a journalctl:
        
        **`journalctl --since "1 day ago" > engineTroubleshootingJournalctl.log`**
        
    4.  On the engine server, tar up the logs, conf, journalctl, and install log on the engine.
        
        **`tar -cvzf engineLogs.tar.gz /var/log/demisto /usr/local/demisto/d1.conf /tmp/demisto_install.log engineTroubleshootingJournalctl.log`**
        

Engine 443 error

This error might occur when a connection is established between an engine and the Cortex Cloud tenant, because, by default, Linux does not allow processes to listen on low-level ports.

**Error Message**

**`listen tcp :443: bind: permission denied`**

**Solution**

-   In the `d1.conf` file, change the port number to a higher one, for example, 8443.
    
-   Run this command: **`sudo setcap CAP_NET_BIND_SERVICE=+eip /path/to/binary`**. After running this command the server should be able to bind to low-numbered ports.
    

Bad handshake error

This error can occur in the engine logs relating to a bad handshake on the engine trying to connect to a Cortex Cloud tenant.

**Error Message**

**`Cannot connect to [wss:/xxx]: [wss://xxx|wss://xxx/]: websocket: bad handshake`**

**Solution**

Verify that time is synchronized on the engine to a reliable NTP source. When timing is off on the engine, this can cause a failure during the SSL/TLS handshake process. When time is resynced, connectivity from the engine to the parent server should be restored.

##### Troubleshoot integrations running on engines
The following are common errors that occur when integrations are running on an engine.

Troubleshoot engine import error or invalid syntax error

When running an integration on an engine, the most common errors are:

-   **`Broken Pipe`**
    
-   **`"ImportError: No module named...`**
    
-   **`Invalid syntax`**
    
-   **`Script failed to run: exec: “python”: executable file not found in $PATH (2603)`**
    

These errors could indicate that the engine is not using Docker.

1.  Use SSH to access the engine server.
    
2.  Make sure Docker is healthy.
    
    1.  Ensure that Docker is installed and is running.
        
        **`sudo systemctl status docker`**
        
        If the Docker status is not good, restart your Docker.
        
        **`sudo systemctl restart docker`**
        
    2.  Ensure Docker can run a container.
        
        **`sudo docker run hello-world`**
        
        If this fails, reinstall your Docker.
        
3.  Access the d1.conf file on the engine server.
    
    **`sudo vi /usr/local/demisto/d1.conf`**
    
4.  Add the **`"python.engine.docker": true`** configuration to the d1.conf file and remove any other configurations related to python and Docker, such as **`“python.executable.no.docker”`**.
    
5.  Restart the system on the engine server.
    
    **`sudo systemctl restart d1`**
    
    **Note:**
    
    If the Allow running multiple engines on the same machine option is selected, run the command:
    
    **`sudo systemctl restart d1_<Engine _name>`**
    
6.  Retest the integration from the user interface. This may take a few minutes because it may need to pull the relevant Docker image.
    

Troubleshoot permission denied

A common error message you may see when running integrations on engines is something like: **`Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/v1.35/images/json?t.`**

1.  Determine if you are using a Docker group or Dockerroot group by running one of the following on the server engine:
    
    -   **`ls -la /var/run/docker.sock`**
        
        The output from this command will show what user/group is running docker.sock. For example:
        
        ```
        srw-rw----. 1 root docker 0 Apr 12 20:32 /var/run/docker.sock
        ```
        
        shows that it’s a Docker group and not Dockerroot.
        
    -   **`cat /etc/group | grep docker`**
        
        This command shows if you are running Docker or Dockerroot.
        
    
    **Note:**
    
    Docker CE installations typically run Docker, while Docker EE installations typically run dockerroot.
    
2.  To fix a Docker user, run the following commands on the server engine:
    
    1.  **`sudo groupadd docker`**
        
    2.  **`sudo usermod -aG docker demisto`**
        
    3.  **`sudo systemctl restart docker`**
        
    4.  **`sudo systemctl restart d1`**
        
        **Note:**
        
        If the Allow running multiple engines on the same machine option is selected, run the command:
        
        **`sudo systemctl restart d1_<Engine _name>`**
        
3.  To fix a `dockerroot` user, run the following commands on the server engine:
    
    1.  **`sudo groupadd dockerroot`**
        
    2.  Set the dockerroot group in `/etc/docker/daemon.json`. For example: { "group": "dockerroot" }.
        
    3.  **`sudo usermod -aG dockerroot demisto`**
        
    4.  **`sudo chcon -Rt svirt_sandbox_file_t /var/lib/demisto/temp`**
        
    5.  **`sudo systemctl restart docker`**
        
    6.  **`sudo systemctl restart d1`**
        
        **Note:**
        
        If the Allow running multiple engines on the same machine option is selected, run the command:
        
        **`sudo systemctl restart d1_<Engine _name>`**

### Build XQL queries

Learn more about how to build Cortex Query Language (XQL) queries using the Query Builder.

To support investigation and analysis, you can search your data by creating queries in the Query Builder.

**Note:**

If you have the Cortex Agentic Assistant, you can use natural language prompts to create and run XQL queries within the chat interface. For more information, see Create and run XQL queries with Agentic Assistant chat.Cortex Agentic Assistant

#### About the Query Builder

The Query Builder facilitates threat detection, case expansion, and data analytics for suspected threats.

The Query Builder aids in the detection of threats by allowing you to search for indicators of compromise and suspicious patterns within data sources. It assists in expanding case investigations by identifying related events and entities, such as activities associated with specific user accounts or network lateral movement. In addition, the Query Builder enables data analytics on suspected threats, helping organizations analyze large volumes of data to identify trends, anomalies, and correlations that may indicate potential security issues. The Query Builder also provides an interactive and visually intuitive way for you to search assets and findings by their relationship types and map them out in real-time.

To support investigation and analysis, you can search all of the data ingested by Cortex Cloud by creating queries in the Query Builder. You can create queries that investigate leads, expose the root cause of an issue, perform damage assessment, and hunt for threats from your data sources.

Cortex Cloud provides different options in the Query Builder for creating queries:

-   XQL (Build your own queries)
    
    You can use the Cortex Query Language (XQL) to build complex and flexible queries that search specific datasets or presets, or the entire `xdr_data` dataset. With XQL Search, you create queries based on stages, functions, and operators. To help you build your queries, Cortex Cloud provides tools in the interface that provide suggestions as you type, or you can look up predefined queries, common stages and examples. For more information, see How to build XQL queries.
    
    **Note:**
    
    Schema changes to datasets may not be reflected in the autocomplete suggestions and deﬁnitions as you type in real time the XQL query, and can appear with a slight delay.
    
    **Tip:**
    
    When creating XQL queries, you can:
    
    -   Use the up and down arrow keys to navigate through the auto-suggestion commands and definitions.
        
    -   Select an auto-suggestion command by pressing either the Enter or Tab key.
        
    -   Press Shift+Enter to add a new line, and easily ignore the auto-suggestion output.
        
    -   Close the auto-suggestion output by pressing the Esc key.
        
    
-   Predefined queries for different types of entities
    
-   Graph Search to build queries to search assets, findings, and their contextual data. For more information, see How to build Graph Search queries?.

#### How to build XQL queries

Learn more about how to build XQL queries in the Query Builder.

The Cortex Query Language (XQL) enables you to query data ingested into Cortex Cloud for rigorous endpoint and network event analysis returning up to 1M results. To help you create an eﬀective XQL query with the proper syntax, the query ﬁeld in the user interface provides suggestions and deﬁnitions as you type.

XQL forms queries in stages. Each stage performs a specific query operation and is separated by a pipe character (|). Queries require a dataset, or data source, to run against. Unless otherwise specified, the query runs against the **`xdr_data`** dataset, which contains all log information that Cortex Cloud collects from all Cortex product agents, including EDR data, and PAN NGFW data. In XDM queries, you must specify the dataset mapped to the XDM that you want to run your query against.

**Important:**

Forensic datasets are not inlcuded by default in XQL query results, unless the dataset query is explicitly defined to use a forensic dataset.

##### Dataset query syntax

In a dataset query, unless otherwise specified, the query runs against the `xdr_data` dataset, which contains all log information that Cortex Cloud collects from all Cortex product agents, including EDR data, and PAN NGFW data. In a dataset query, if you are running your query against a dataset that has been set as default, there is no need to specify a dataset. Otherwise, specify a dataset in your query. The Dataset Queries lists the available datasets, depending on system configuration.

**Note:**

-   Users with different dataset permissions can receive different results for the same XQL query.
    
-   An administrator or a user with a predefined user role can create and view queries built with an unknown dataset that currently does not exist in Cortex Cloud. All other users can only create and view queries built with an existing dataset.
    
-   When you have more than one dataset or lookup, you can change your default dataset by navigating to Settings → Configurations → Data Management → Dataset Management, right-click on the appropriate dataset, and select Set as default. For more information about setting default datasets, see Dataset management.Dataset management
    

The basic syntax structure for querying datasets that are not mapped to the XDM is:

```
dataset = <dataset name> 
    | <stage1> ...
    | <stage2> ... 
    | <stage3> ...
```

or

```
dataset in (<dataset name>)
    | <stage1> ...
    | <stage2> ...
    | <stage3> ...
```

You can specify a dataset using one of the following formats, which is based on the data retention offerings available in Cortex Cloud.

-   Hot Storage queries use the format `dataset = <dataset name>`. This is the default option.
    
    Example 71. 
    
    ```
    dataset = xdr_data
    ```
    
      
    
-   Cold Storage queries use the format `cold_dataset = <dataset name>`.
    
    Example 72. 
    
    ```
    cold_dataset = xdr_data
    ```
    
      
    
    **Note:**
    
    You can build a query that investigates data in both a cold dataset and a hot dataset in the same query. In addition, as the hot storage dataset format is the default option and represents the fully searchable storage, this format is used throughout this guide for investigation and threat hunting. For more information on hot and cold storage, see Dataset management.Dataset management
    

When using the hot storage default format, this returns every `xdr_data` record contained in your Cortex Cloud instance over the time range that you provide to the Query Builder user interface. This can be a large amount of data, which may take a long time to retrieve. You can use a `limit` stage to specify how many records you want to retrieve.

There is no practical limit to the number of stages that you can specify. See Stages for information on all the supported stages.

In the `xdr_data` dataset, every user ﬁeld included in the raw data for network, authentication, and login events has an equivalent normalized user ﬁeld associated with it that displays the user information in the following standardized format:

`<company domain>\<username>`

For example, the `login_data` ﬁeld has the `login_data_dst_normalized_user` ﬁeld to display the content in the standardized format. To ensure the most accurate results, we recommend that you use these `normalized_user` ﬁelds when building your queries.

##### Additional components

XQL queries can contain different components, such as functions and stages, depending on the type of query you want to build. For a complete list of the syntax options available with example queries, see Stages and Functions.

##### Get started with XQL queries

Learn more about some important information before getting started with XQL queries.

Before you begin running XQL queries, consider the following information:

-   Use the interface to help you build queries
    
    Cortex Cloud offers features in the XQL search interface to help you build queries. For more information, see Useful XQL user interface features.
    
-   Understand query defaults and limitations
    
    Before you run a query, review this list to better understand query behavior and results. For more information, see Expected results when querying fields.
    
-   Translate Splunk queries to XQL
    
    If you have existing Splunk queries, you can translate them to XQL. For more information, see Translate to XQL.

##### Useful XQL user interface features

Learn about useful XQL query features in the user interface.

The user interface contains several useful features for querying data, and for viewing results:

-   XQL query: The XQL query field is where you define the parameters of your query. To help you create an effective XQL query, the search field provides suggestions and definitions as you type.
    
    **Note:**
    
    Schema changes to datasets may not be reflected in the autocomplete suggestions and deﬁnitions as you type in real time the XQL query and can appear with a slight delay.
    
    **Tip:**
    
    When creating XQL queries, you can:
    
    -   Use the up and down arrow keys to navigate through the auto-suggestion command suggestions and definitions.
        
    -   Select an auto-suggestion command by pressing either the Enter or Tab key.
        
    -   Press Shift+Enter to add a new line, and easily ignore the auto-suggestion output.
        
    -   Close the auto-suggestion output by pressing the Esc key.
        
    
-   Translate to XQL: Converts your existing Splunk queries to the XQL syntax. When you enable Translate to XQL , both an SPL query field and an XQL query field are displayed. You can easily add a Splunk query, which is converted automatically into XQL in the XQL query ﬁeld. This option is disabled by default.
    
-   Query Results: After you create and run an XQL query, you can view, filter, and visualize your Query Results.
    
-   XQL Helper: Describes common stage commands and provides examples that you can use to build a query.
    
-   Query Library: Contains common, predefined queries that you can use or modify to your liking. In addition, there is a personal query library for saving and managing your own queries so that you can share with others, and queries can be shared with you. For more information, see Manage your personal query library.
    
-   Schema: Contains schema information for every field found in the result set. This information includes the field name, data type, descriptive text (if available), and the dataset that contains the field. Contains the list of all the fields of all the datasets that were involved in the query.

##### XQL Query best practices

Learn about best practices for streamlining XQL queries.

Cortex Cloud includes built-in mechanisms for mitigating long-running queries, such as default limits for the maximum number of allowed issues. The following suggestions can help you to streamline your queries:

-   Add a smaller limit to queries by using a `limit` stage.
    
    The default results for any query is a maximum of 1,000,000 results, when no limit is explicitly stated in the query. Queries based on XQL query entities are limited to 10,000 results. Adding a smaller limit can greatly reduce the response time.
    
    Example 73. 
    
    ```
    dataset = microsoft_windows_raw 
    | fields \*host\* 
    | limit 100
    ```
    
      
    
-   Use a small time frame for queries by specifying the specific date and time in the Timeframe, such as selecting Relative time and defining Last 30 Minutes, instead of picking the nearest larger option available or defining an extended time period.
    
-   Use filters that exclude data, along with other possible filters.
    
-   Select the specific fields that you would like to see in the query results.

##### Expected results when querying fields

Learn what to expect in the query results when querying fields.

The following are returned when querying fields:

-   If specific fields are stated in the fieldsfields stage, those exact fields will be returned. 
    
-   The `_time` system field will not be added to queries that contain the `comp` stage.
    
-   All current system fields will be returned, even if they are not stated in the query.
    
-   Each new column in the result set created by the alter stage will be added as the last column. You can specify a different column order by modifying the field order in the fieldsfields stage of the query.
    
-   Each new column in the result set created by the comp stage will be added as the last column. Other fields that are not in the `group by / calculated` column will be removed from the result set, including the core fields and `_time` system field.comp
    
-   When no limit is explicitly stated in a `datamodel` query, a maximum of 1,000,000 results are returned (default). When this limit is applied to results using the limit stage, it will be indicated in the user interface.

##### Create XQL query

Learn how to create queries using the Cortex Query Language (XQL).

Review the following topics:

-   How to build XQL queries
    

Build Cortex Query Language (XQL) queries to analyze raw log data stored in Cortex Cloud. You can query datasets using specific syntax.

How to create a dataset query

1.  From Cortex Cloud, select Investigation & Response → Search → Query Builder.
    
2.  Click XQL.
    
3.  _(Optional)_ Change the default time period against which to run your query from the time picker at the top right of the window. You can select the required Timeframe from any of the following options available:
    
    -   Preset time ranges easily available to select from, such as 24 hours and 30 days.
        
    -   Recently used selections from your previous queries.
        
    -   Relative time: Define the time frame as the last <number> minutes, days, or hours by setting the number.
        
    -   Calendar: Create a customized time period by selecting the date range from the calendar and the specific Start Time and End Time.
        
    
    **Note:**
    
    -   Whenever the time period is changed in the query window, the `config timeframe` is automatically set to the time period defined for the entire query, including queries that are part of the `join` stage. Yet, this won't be visible as part of the query. Only if you manually type in the `config timeframe` will this be seen in the query.
        
    -   These time picker options are available in XQL queries when using the Query Builder, XQL Widgets, and when defining XQL Widgets in Reports and Dashboards.
        
    
4.  _(Optional)_ To translate Splunk queries to XQL queries, enable Translate to XQL. If you choose to use this feature, enter your Splunk query in the Splunk field, click the arrow icon () to convert to XQL, and then go to Step 6.
    
5.  Create your query by typing in the query field. Relevant commands, their definitions, and operators are suggested as you type.
    
    **Tip:**
    
    When creating XQL queries, you can:
    
    -   Use the up and down arrow keys to navigate through the auto-suggestion command suggestions and definitions.
        
    -   Select an auto-suggestion command by pressing either the Enter or Tab key.
        
    -   Press Shift+Enter to add a new line, and easily ignore the auto-suggestion output.
        
    -   Close the auto-suggestion output by pressing the Esc key.
        
    
    1.  (Optional) Specify a dataset.
        
        You only need to specify a dataset if you are running your query against a dataset that you have not set as default. Otherwise, the query runs against the **`xdr_data`** dataset. For more information, see How to build XQL queries.
        
        Example 74. 
        
        ```
        dataset = xdr_data
        ```
        
          
        
    2.  Press Enter, and then type the pipe character (**`|`**). Select a command, and complete the command using the suggested options.
        
    3.  Continue adding stages until your query is complete.
        
        Example 75. 
        
        ```
        dataset = xdr_data 
        | filter agent_os_type = ENUM.AGENT_OS_MAC
        | limit 250  
        ```
        
          
        
6.  Choose when to run your query:
    
    -   Run the query immediately.
        
    -   Run the query by the specified date and time, or on a specific date, by selecting the calendar icon ().
        
    
7.  _(Optional)_ The Save As options save your query for future use:
    
    -   BIOC Rule: When compatible, saves the query as a BIOC rule. The XQL query must contain a filter for the event_type field.
        
    -   Correlation Rule: When compatible, saves the query as a Correlation Rule. For more information, see What's a correlation rule?.
        
    -   Query to Library: Saves the query to your personal query library. For more information, see Manage your personal query library.
        
    -   Widget to Library: For more information, see Create custom XQL widgets.
        
    

**Tip:**

While the query is running, you can navigate away from the page. A notification is sent when the query has finished. You can also Cancel the query or run a new query, where you have the option to Run only new query (cancel previous) or Run both queries.

##### Review XQL query results

Learn more about reviewing the results returned from an XQL query.

Review the following topics:

-   How to build XQL queries
    
-   Create XQL query
    

The results of a Cortex Query Language (XQL) query are displayed in the Query Results tab.

**Note:**

It's also possible to graph the results displayed. For more information, see Graph query results.

###### Real-time query results

Cortex Cloud displays partial results for queries run in the Query Builder as they are received, subject to the limitations below. In a long-running query, viewing the initial findings enables you to refine, validate, or stop the query.

The partial results are displayed only in the Table tab. The results are added to the table as they are received in real time. The incremental query results aren't ordered, so they may not be in sequence.

###### Limitations

-   Real time query results are available only in the Query Builder and in free text query.
    
-   Real time results are displayed only for queries run on hot datasets.
    
-   The Sort option is available only after all the data is retrieved.
    
-   When you formulate complex queries, the results will be displayed when the query has finished running completely, and not in real time. Some of the clauses that are included in this restriction are:
    
    -   JOIN - incremental results are supported only when the secondary dataset is smaller in size
        
    -   SORT
        
    -   COMP
        
    -   WINDOWCOMP
        
    -   TOP
        
    

**Note:**

Results are received incrementally for the first 100K records, or up to 100MB worth of records, whichever comes first. After that, the next update is when the query has finished running completely.

###### Understanding the options available to investigate results

Use the following options in the Query Results tab to investigate your query results:

| Option | Use |
| --- | --- |
| Table tab | Displays results in rows and columns according to the entity ﬁelds. Columns can be filtered, using their filter icons. More options () displays table layout options, which are divided into different sections: In the Appearance section, you can Show line breaks for any text field in the Query Results. By default, the text in these fields are wrapped unless the Show line breaks option is selected. In addition, you can change the way rows and columns are displayed.; In the Log Format section, you can change the way that logs are displayed:- RAW: Raw format of the entity in the database.; JSON: Condensed JSON format with key value distinctions. NULL values are not displayed.; TREE: Dynamic view of the JSON hierarchy with the option to collapse and expand the different hierarchies. ; In the Search column section, you can find a specific column; enable or disable display of columns using the checkboxes. Show and hide rows according to a specific field in a specific event: select a cell, right-click it, and then select either Show rows with … or Hide rows with … |
| Graph tab | Use the Chart Editor to visualize the query results. |
| Advanced tab | Displays results in a table format which aggregates the entity ﬁelds into one column. You can change the layout, decide whether to Show line breaks for any text field in the results table, and change the log format from the  menu. Select Show more to pivot an Expanded View of the event results that include NULL values. You can toggle between the JSON and Tree views, search, and Copy to clipboard. |
| Export to File | Exports the results to a TSV (tab-separated values) ﬁle. More options () works in a similar way to how it works on the Table tab.; Show more in the bottom left corner of each row opens the Expanded View of the event results that also include NULL values. Here, you can toggle between the JSON and Tree views, search, and Copy to clipboard.; Log format options change the way that logs are displayed:-   RAW: Raw format of the entity in the database.; JSON: Condensed JSON format with key value distinctions. NULL values are not displayed.; TREE: Dynamic view of the JSON hierarchy with the option to collapse and expand the diﬀerent hierarchies. |
| Refresh | Refreshes the query results. |
| Free text search | Searches the query results for text that you specify in the free text search. Click the Free text search icon to reveal or hide the free text search field. |
| Filter | Enables you to ﬁlter a particular ﬁeld in the interface that is displayed to specify your ﬁlter criteria. For integer, boolean, and timestamp (such as `_time`) ﬁelds, we recommend that you use the Filter instead of the Free text search, in order to retrieve the most accurate query results. |
| Fields menu | Filters query results. To quickly set a ﬁlter, Cortex Cloud displays the top ten results from which you can choose to build your ﬁlter. This option is only available in the Table and Advanced tabs, From within the Fields menu, click on any ﬁeld (excluding JSON and array ﬁelds) to see a histogram of all the values found in the result set for that ﬁeld. This histogram includes: A count of the total number of times a value was found in the result set.; The value's frequency as a percentage of the total number of values found for the ﬁeld.; A bar chart showing the value's frequency. \*\*Note:\*\* In order for Cortex Cloud to provide a histogram for a ﬁeld, the ﬁeld must not contain an array or a JSON object. |

###### Available options for saving results

The Save As options save your query for future use:

-   BIOC Rule: When compatible, saves the query as a BIOC rule. The XQL query must contain a filter for the event_type field.
    
-   Correlation Rule: When compatible, saves the query as a Correlation Rule. For more information, see What's a correlation rule?.
    
-   Query to Library: Saves the query to your personal query library. For more information, see personal query library.
    
-   Widget to Library: For more information, see [???](urn:resource:component:1159521).
    

###### Investigating results in the Causality View or Timeline View

You can continue investigating the query results in the Causality View or Timeline by right-clicking the event and selecting the desired view. This option is available for the following types of events:

-   Process (except for those with an event sub-type of termination)
    
-   Network
    
-   File
    
-   Registry
    
-   Injection
    
-   Load image
    
-   System calls
    
-   Event logs for Windows
    
-   System authentication logs for Linux
    

For network stories, you can pivot to the Causality View only. For cloud Cortex Cloud events and Cloud Audit Logs, you can only pivot to the Cloud Causality View, while software-as-a-service (SaaS) related issues for audit stories, such as Office 365 audit logs and normalized logs, you can only pivot to the SaaS Causality View.

###### Add file path to Malware Profile allowed list

Add a file path to your existing Malware Profile allowed list by right-clicking a <path> field, such as target_process_path, and select Add <path type> to malware profile allow list.

##### Translate to XQL

Learn how to translate your Splunk queries to XQL queries in Cortex Cloud.

To help you easily convert your existing Splunk queries to the Cortex Query Language (XQL) syntax, Cortex Cloud includes a toggle called Translate to XQL in the query ﬁeld in the user interface. When building your XQL query and this option is selected, both a SPL query field and XQL query field are displayed, so you can easily add a Splunk query, which is converted to XQL in the XQL query field. This option is disabled by default, so only the XQL query field is displayed.

**Important:**

This feature is still in a Beta state and you will find that not all Splunk queries can be converted to XQL. This feature will be improved upon in the upcoming releases to support greater Splunk query translations to XQL.

Supported functions in Splunk

The following table details the supported functions in Splunk that can be converted to XQL in Cortex Cloud with an example of a Splunk query and the resulting XQL query. In each of these examples, the `xdr_data` dataset is used.

| Splunk Function/Stage | Splunk Query Example | Resulting XQL Query Example |
| --- | --- | --- |
| `avg` | `index=xdr_data | stats avg(dst_association_strength)` | `dataset in (xdr_data) | comp avg(dst_association_strength)` |
| `bin` | `index = xdr_data | bin _time span=5m` | `dataset in (xdr_data) | bin _time span=5m` |
| `coalesce` | `index= xdr_data | eval product_or_vendor_not_null=coalesce(_product, _vendor )` | `dataset in (xdr_data) | alter product_or_vendor_not_null = coalesce(_product, _vendor)` |
| `count` | `index=xdr_data | stats count(_product) BY _time` | `dataset in (xdr_data) | comp count(_product) by _time` |
| `ctime` | `index=xdr_data | convert ctime(field) as field` | `dataset in (xdr_data) | alter field = format_timestamp("%m/%d/%Y %H:%M:%S", to_timestamp(field))` |
| `earliest` | `index = xdr_data earliest=24d` | `dataset in (xdr_data) | filter _time >= to_timestamp(add(to_epoch(current_time()),2073600000))` |
| `eval` | `index=xdr_data | eval field = "test"` | `dataset in (xdr_data) | alter field = "test"` |
| `fillnull` | `index=xdr_data | fillnull value = "missing ipv6" agent_ip_addresses_v6` | `dataset in (xdr_data) | replacenull agent_ip_addresses_v6 = "missing ipv6"` |
| `floor` | `index=xdr_data | eval floor_test = floor(1.9)` | `dataset in (xdr_data) | alter floor_test = floor(1.9)` |
| `iplocation` | `index=xdr_data | inputlookup append=true my_lookup.csv` | `dataset in (xdr_data) | union (dataset=my_lookup | limit 1000000000)` |
| `iplocation` | `index = xdr_data | inputlookup agent_ip_addresses` | `dataset in (xdr_data) | iploc agent_ip_addresses loc_continent AS Continent, loc_country AS Country, loc_region AS Region, loc_city AS City, loc_latlon AS lon` |
| `isnotnull` | `index=xdr_data | eval x = isnotnull(agent_hostname)` | `dataset in (xdr_data)\n | alter x = if(agent_hostname != null, true, false)` |
| `isnull` | `index=xdr_data | eval x = isnull(agent_hostname)` | `dataset in (xdr_data)\n | alter x = if(agent_hostname = null, true, false)` |
| `json_extract` | `index= xdr_data | eval London=json_extract(dfe_labels,"dfe_labels{0}")` | `dataset in (xdr_data) | alter London = dfe_labels -> dfe_labels[0]{}` |
| `join` | `join agent_hostname [index = xdr_data]` | `join type=left conflict_strategy=right (dataset in (xdr_data)) as inner agent_hostname = inner.agent_hostname` |
| `latest` | `index = xdr_data latest=-24d` | `dataset in (xdr_data) |filter _time <= to_timestamp(add(to_epoch(date_floor(current_time(),"d")),-2073600000))` |
| `len` | `index = xdr_data | where uri != null | eval length = len(agent_ip_address)` | `dataset in (xdr_data) | filter agent_ip_addresses != null | alter agent_ip_address_length = len(agent_ip_addresses)` |
| `ltrim(<str>,<trim_chars>)` | `index=xdr_data | eval trimed_agent=ltrim("agent_hostname", "agent_")` | `dataset in (xdr_data) | alter trimed_agent = ltrim("agent_hostname", "agent_")` |
| `lower` | `index = xdr_data | eval field = lower("TEST")` | `dataset in (xdr_data) | alter field = lowercase("TEST")` |
| `max` | `index =xdr_data | stats max(action_file_size) by _product` | `dataset in (xdr_data) | comp max(action_file_size) by _product` |
| `md5` | `index=xdr_data | eval md5_test = md5("test")` | `dataset in (xdr_data) | alter md5_test = md5("test")` |
| `median` | `index = xdr_data | stats median(actor_process_file_size) by _time` | `dataset in (xdr_data) | comp median(actor_process_file_size) by _time` |
| `min` | `index =xdr_data | stats min(action_file_size) by _product` | `dataset in (xdr_data) | comp min(action_file_size) by _product` |
| `mvcount` | `index = xdr_data | where http_data != null | eval http_data_array_length = mvcount(http_data)` | `dataset in (xdr_data) | filter http_data != null | alter http_data_array_length = array_length(http_data)` |
| `mvdedup` | `index = xdr_data | eval s=mvdedup(action_app_id_transitions)` | `dataset in (xdr_data) | alter s = arraydistinct(action_app_id_transitions)` |
| `mvexpand` | `index = xdr_data | mvexpand dfe_labels limit = 100` | `dataset in (xdr_data) | arrayexpand dfe_labels limit 100` |
| `mvfilter` | `index = xdr_data | eval x = mvfilter(isnull(dfe_labels))` | `dataset in (xdr_data) | alter x = arrayfilter(dfe_labels, if("@element" = null, true, false) = true)` |
| `mvindex` | `index=xdr_data | eval field = mvindex(action_app_id_transitions, 0)` | `dataset in (xdr_data) | alter field = arrayindex(action_app_id_transitions, 0)` |
| `mvjoin` | `index=xdr_data | eval n=mvjoin(action_app_id_transitions, ";")` | `dataset in (xdr_data) | alter n = arraystring(action_app_id_transitions, ";")` |
| `pow` | `index=xdr_data | eval pow_test = pow(2, 3)` | `dataset in (xdr_data) | alter pow_test = pow(2, 3)` |
| `relative_time(X,Y)` | `index ="xdr_data" | where _time > relative_time(now(),"-7d@d")`; `index ="xdr_data" | where _time > relative_time(now(),"+7d@d")` | `dataset in (xdr_data) | filter _time > to_timestamp(add(to_epoch(date_floor(current_time(),"d")),-604800000))`; `dataset in (xdr_data)| filter _time > to_timestamp(add(to_epoch(date_floor(current_time(),"d")),604800000))` |
| `replace` | `index= xdr_data | eval description = replace(agent_hostname,"\("."NEW")` | `dataset in (xdr_data) | alter description = replace(agent_hostname, concat("\(", "NEW"))` |
| `rex` | `index=xdr_data action_local_ip!="0.0.0.0" | rex field=action_local_ip "(?<src_ip>\d+\.\d+\.\d+\.48)" | where src_ip != "" | table action_local_ip src_ip` | `dataset in (xdr_data) |filter (action_local_ip != "0.0.0.0" AND action_local_ip != null) | alter src_ip = arrayindex(regextract(action_local_ip, "(\d+\.\d+\.\d+\.48)"), 0) | filter src_ip != "" | fields action_local_ip, src_ip` |
| `round` | `index=xdr_data | eval round_num = round(3.5)` | `dataset in (xdr_data) | alter round_num = round(3.5)` |
| `rtrim` | `index=xdr_data | eval trimed_hostname=rtrim("agent_hostname", "hostname")` | `dataset in (xdr_data) | alter trimed_hostname = rtrim("agent_hostname", "hostname")` |
| `search` | `index = xdr_data | eval ip="192.0.2.56" | search ip="192.0.2.0/24"` | `dataset in (xdr_data) | alter ip = "192.0.2.56" | filter incidr(ip,"192.0.2.0/24") = true` |
| `sha256` | `index = xdr_data | eval sha256_test = sha256("test")` | `dataset in (xdr_data) | alter sha256_test = sha256("test")` |
| `sort (ascending order)` | `index = xdr_data | sort action_file_size` | `dataset in (xdr_data) | sort asc action_file_size | limit 10000` |
| `sort (descending order)` | `index = xdr_data | sort -action_file_size` | `dataset in (xdr_data) | sort desc action_file_size | limit 10000` |
| `spath` | `index = xdr_data | spath output=myfield input=action_network_http path=headers.User-Agent` | `dataset in (xdr_data) | alter myfield = json_extract(action_network_http ,"$.headers.User-Agent")` |
| `split` | `index = xdr_data | where mac != null | eval split_mac_address = split(mac, ":")` | `dataset in (xdr_data)\n | filter mac != null\n | alter split_mac_address = split(mac, ":")` |
| `stats` | `index=xdr_data | stats count(event_type) by _time` | `dataset in (xdr_data) | comp count(event_type) by _time` |
| `stats dc` | `index = xdr_data | stats dc(_product) BY _time` | `dataset in (xdr_data) | comp count_distinct(_product) by _time` |
| `strcat` | `index=xdr_data | strcat story_id "/" http_req_before_method comboIP` | `dataset in (xdr_data) | alter comboIP=concat(if(story_id!=null,story_id,""),"/",if(http_req_before_method!=null,http_req_before_method,""))` |
| `sum` | `index=xdr_data | where action_file_size != null | stats sum(action_file_size) by _time` | `dataset in (xdr_data) | filter action_file_size != null | comp sum(action_file_size) by _time` |
| `table` | `index = xdr_data | table _time, agent_hostname, agent_ip_addresses, _product` | `dataset in (xdr_data) | fields _time, agent_hostname, agent_ip_addresses, _product` |
| `tonumber` | `index=xdr_data | eval tonumber_test = tonumber("90210")` | `dataset in (xdr_data) | alter tonumber_test = to_number("90210")` |
| `top` | The following Splunk functions can be translated to XQL: `limit` `index = xdr_data | where action_app_id_risk > 0 | top limit=20 action_app_id_risk`; `countfield` `index = xdr_data |  top countfield=count_agent_hostname agent_hostname by _time`; `showcount` `index = xdr_data | where action_app_id_risk > 0 | top 3 showcount=t action_app_id_risk` ; `showperc` `index = xdr_data | where action_app_id_risk > 0 | top 3 showperc=t action_app_id_risk`; `percentfield` `index = xdr_data | top percentfield=agent_hostname_percentage agent_hostname by _time` | `limit` `dataset in (xdr_data) | filter action_app_id_risk > 0 | top 20 action_app_id_risk top_count as count, top_percent as percent`; `countfield` `dataset in (xdr_data) |top 10 agent_hostname by _time top_count as count_agent_hostname, top_percent as percent`; `showcount` `dataset in (xdr_data) | filter action_app_id_risk > 0 | top 3 action_app_id_risk top_count as count, top_percent as percent`; `showperc` `dataset in (xdr_data) | filter action_app_id_risk > 0 | top 3 action_app_id_risk top_count as count, top_percent as percent`; `percentfield` `dataset in (xdr_data) | top 10 agent_hostname by _time top_count as count, top_percent as agent_hostname_percentage` |
| `upper` | `index=xdr_data | eval field = upper("test")` | `dataset in (xdr_data) | alter field = uppercase("test")` |
| `var` | `index=xdr_data | stats var (event_type) by _time` | `dataset in (xdr_data) | comp var(event_type) by _time` |

How to translate a Splunk query to XQL syntax

1.  Select Investigation & Response → Search → Query Builder → XQL.
    
2.  Toggle to Translate to XQL, where both a SPL query field and XQL query field are displayed.
    
3.  Add your Splunk query to the SPL query field.
    
4.  Click the arrow ().
    
    The XQL query field displays the equivalent Splunk query using the XQL syntax.
    
    You can now decide what to do with this query based on the instructions explained in Create XQL query.

##### Graph query results

Cortex Cloud enables you to generate helpful visualizations of your XQL query results.

**Notice:**

Building Cortex Query Language (XQL) queries in the Query Builder requires a Data Collection add-on.

To help you better understand your Cortex Query Language (XQL) query results and share your insights with others, Cortex Cloud enables you to generate graphs and outputs of your query data directly from query results page.

1.  Select Investigation & Response → Search → Query Builder → XQL.
    
2.  Run an XQL query.
    
    Example 76. 
    
    Enter the following query:
    
    ```
    dataset = xdr_data 
    | fields action_total_upload, _time 
    | limit 10
    ```
    
    The query returns the `action_total_upload`, a number field, and `_time`, a string field, for up to 10 results.
    
      
    
3.  In the Query Results section, to graph the results either:
    
    Use Chart Editor
    
    Navigate to Query Results → Chart Editor () to manually build and view the graph using the selected graph parameters:
    
    -   Main
        
        -   Graph Type: Type of graphs and output options available: Area, Bubble, Column, Funnel, Gauge, Line, Map, Pie, Scatter, Single Value, or Word Cloud.
            
            **Note:**
            
            To display the result of as a time duration, choose the graph type Single Value and enable Show as Time. You can then select the Time Unit (millisecond, second, minute, or hour) and the Display format.
            
        -   Subtype and Layout: Depending on the selected type of graph, choose from the available display options.
            
        -   Header: Title your graph.
            
        -   Show Callouts: Display numeric values on the graph.
            
        
    -   Data
        
        -   X-axis: Select a field with a string value.
            
        -   Y-axis: Select a field with a numeric value.
            
        -   (Optional) Series: For an area, bubble, column, line, map, or scatter chart, you can specify a field (column) to group chart results based on y-axis values. This option is only displayed when one of the supported graph types are selected, and a single y-axis value is selected.
            
        
    -   Depending on the selected type of graph, customize the Color, Font, and Legend.
        
    
    Use XQL query
    
    Enter the visualization parameters in the XQL query section.
    
    You can express any chart preferences in XQL. This is helpful when you want to save your chart preferences in a query and generate a chart every time that you run it. To define the parameters, either:
    
    -   Define the following query:
        
        Example 77. 
        
        ```
        dataset = xdr_data 
        | view graph type = column header = "Test 1" xaxis = _time yaxis = action_total_upload series = _vendor
        ```
        
          
        
    -   Select ADD TO QUERY to insert your chart preferences into the query itself.
        
    
4.  (Optional) Create a custom widget.
    
    To easily track your query results, you can create custom widgets based on the query results. The custom widgets you create can be used in your custom dashboards and reports. For more information, see Create custom XQL widgets.
    
    Select Save to Widget Library to pivot to the Widget Library and generate a custom widget based on the query results.

#### XQL query entities

Learn more about the Cortex Query Language (XQL) entities available in the Query Builder.

With Query Builder, you can build complex queries for entities and entity attributes so that you can surface and identify connections between them. Cortex Cloud provides Cortex Query Language (XQL) queries for different types of entities in the Query Builder that search predefined datasets. The Query Builder searches the raw data and logs stored in Cortex Cloud tenant and for the entities and attributes you specify, it returns up to 1,000,000 results.

The Query Builder provides queries for the following types of entities:

-   Process: Search on process execution and injection by process name, hash, path, command line arguments, and more. See Create process query.
    
-   File: Search on file creation and modification activity by file name and path. See Create file query.
    
-   Network: Search network activity by IP address, port, host name, protocol, and more. See Create network query.
    
-   Image Load: Search on module load into process events by module IDs and more. See Create image load query.
    
-   Registry: Search on registry creation and modification activity by key, key value, path, and data. See Create registry query.
    
-   Event Log: Search Windows event logs and Linux system authentication logs by username, log event ID (Windows only), log level, and message. See Create event log query.
    
-   Network Connections: Search security event logs by firewall logs, endpoint raw data over your network. See Create network connections query.
    
-   Authentications: Search on authentication events by identity, target outcome, and more. See Create authentication query.
    
-   All Actions: Search across all network, registry, file, and process activity by endpoint or process. See Query across all entities.
    

The Query Builder also provides flexibility for both on-demand query generation and scheduled queries.

##### Create authentication query

Learn more about creating a query to investigate any authentication activity.

From the Query Builder, you can investigate authentication activity across all ingested authentication logs and data.

Some examples of authentication queries you can run include:

-   Authentication logs by severity
    
-   Authentication logs by the event message
    
-   Authentication logs for a specific source IP address
    

How to build an authentication query

1.  From Cortex Cloud , select Investigation & Response → Search → Query Builder.
    
2.  Select AUTHENTICATION.
    
3.  Enter the search criteria for the authentication query.
    
    By default, Cortex Cloud will return the activity that matches all the criteria you specify. To exclude a value, toggle the **`=`** option to **`=!`**.
    
4.  Choose when to run the query.
    
    Select the calendar icon to schedule a query to run on or before a specific date or Run to run the query immediately and view the results in the Query Center.
    
    While the query is running, you can always navigate away from the page and a notification is sent when the query completes. You can also Cancel the query or run a new query, where you have the option to Run only new query (cancel previous) or Run both queries.
    
5.  When you are ready, view the results of the query. For more information, see Review XQL query results.

##### Create event log query

Learn more about creating a query to investigate Windows and Linux event log attributes and investigate event logs across endpoints.

From the Query Builder you can search Windows and Linux event log attributes and investigate event logs across endpoints with a Cortex XDR agent installed.

Some examples of event log queries you can run include:

-   Critical level messages on specific endpoints.
    
-   Message descriptions with specific keywords on specific endpoints.
    

How to build an event log query

1.  From Cortex Cloud , select Investigation & Response → Search → Query Builder.
    
2.  Select EVENT LOG.
    
3.  Enter the search criteria for your Windows or Linux event log query.
    
    Define any event attributes for which you want to search. By default, Cortex XDR will return the events that match the attribute you specify. To exclude an attribute value, toggle the **`=`** option to **`=!`**. Attributes are:
    
    -   PROVIDER NAME: The provider of the event log.
        
    -   USERNAME: The username associated with the event.
        
    -   EVENT ID: The unique ID of the event.
        
    -   LEVEL: The event severity level.
        
    -   MESSAGE: The description of the event.
        
    
    To specify an additional exception (match this value except), click the + to the right of the value and specify the exception value.
    
4.  (_Optional_) Limit the scope to an endpoint or endpoint attributes:
    
    Specify one or more of the following attributes: Use a pipe (|) to separate multiple values.
    
    Use an asterisk (\*) to match any string of characters.
    
    -   HOST: HOST NAME, HOST IP address, HOST OS, HOST MAC ADDRESS, or INSTALLATION TYPE.
        
    -   INSTALLATION TYPE can be either Cortex XDR agent or Data Collector.
        
    -   PROCESS: NAME, PATH, CMD, MD5, SHA256, USER NAME, SIGNATURE, or PID.
        
    
5.  Specify the time period for which you want to search for events.
    
    Options are Last 24H (hours), Last 7D (days), Last 1M (month), or select a Custom time period.
    
6.  Choose when to run the query.
    
    Select the calendar icon to schedule a query to run on or before a specific date or Run to run the query immediately and view the results in the Query Center.
    
    While the query is running, you can always navigate away from the page, and a notification is sent when the query completes. You can also Cancel the query or run a new query, where you have the option to Run only new query (cancel previous) or Run both queries.
    
7.  When you are ready, view the results of the query. For more information, see Review XQL query results.

##### Create file query

Learn more about creating a query to investigate the connections between file activity and endpoints.

From the Query Builder you can investigate connections between file activity and endpoints. The Query Builder searches your logs and endpoint data for the file activity that you specify. To search for files on endpoints instead of file-related activity, build an XQL query. For more information, see How to build XQL queries.

Some examples of file queries you can run include:

-   Files modified on specific endpoints.
    
-   Files related to process activity that exist on specific endpoints.
    

How to build a file query

1.  From Cortex Cloud, select Investigation & Response → Search → Query Builder.
    
2.  Select FILE.
    
3.  Enter the search criteria for the file events query.
    
    -   File activity: Select the type or types of file activity you want to search: All, Create, Read, Rename, Delete, or Write.
        
    -   File attributes: Define any additional process attributes for which you want to search. Use a pipe (**`|`**) to separate multiple values (for example **`notepad.exe|chrome.exe`**). By default, Cortex Cloud will return the events that match the attribute you specify. To exclude an attribute value, toggle the **`=`** option to **`=!`**. Attributes are:
        
        -   NAME: File name.
            
        -   PATH: Path of the file.
            
        -   PREVIOUS NAME: Previous name of a file.
            
        -   PREVIOUS PATH: Previous path of the file.
            
        -   MD5: MD5 hash value of the file.
            
        -   SHA256: SHA256 hash value of the file.
            
        -   ACTION_DISK_DRIVER_NAME: The driver where the file was created.
            
        -   FILE_SYSTEM_TYPE: Operating system type where the file was run.
            
        -   ACTION_IS_VFS: Denotes if the file is on a virtual file system on the disk. This is relevant only for files that are written to disk.
            
        -   DEVICE TYPE: Type of device used to run the file: Unknown, Fixed, Removable Media, CD-ROM.
            
        -   DEVICE SERIAL NUMBER: Serial number of the device type used to run the file.
            
        
        To specify an additional exception (match this value except), click the + to the right of the value and specify the exception value.
        
    
4.  (Optional) Limit the scope to a specific acting process:
    
    Select +PROCESS and specify one or more of the following attributes for the acting (parent) process.
    
    Use a pipe (|) to separate multiple values. Use an asterisk (\*) to match any string of characters.
    
    -   NAME: Name of the parent process.
        
    -   PATH: Path to the parent process.
        
    -   CMD: Command-line used to initiate the process, including any arguments, up to 128 characters.
        
    -   MD5: MD5 hash value of the process.
        
    -   SHA256: SHA256 hash value of the process.
        
    -   USER NAME: User who executed the process.
        
    -   SIGNATURE: Signing status of the parent process: Signature Unavailable, Signed, Invalid Signature, Unsigned, Revoked, Signature Fail.
        
    -   SIGNER: Entity that signed the certificate of the parent process.
        
    -   PID: Process ID of the parent process.
        
    -   Run search for process, Causality, and OS actors—The causality actor—also referred to as the causality group owner (CGO)—is the parent process in the execution chain that the Cortex XDR agent identified as being responsible for initiating the process tree. The OS actor is the parent process that creates an OS process on behalf of a different indicator. By default, this option is enabled to apply the same search criteria to initiating processes. To configure different attributes for the parent or initiate the process, clear this option.
        
    
5.  (_Optional_) Limit the scope to an endpoint or endpoint attributes:
    
    Select +Host and specify one or more of the following attributes:
    
    -   HOST: HOST NAME, HOST IP address, HOST OS, HOST MAC ADDRESS, or INSTALLATION TYPE.
        
        INSTALLATION TYPE can be either Cortex XDR agent or Data Collector.
        
    -   PROCESS: NAME, PATH, CMD, MD5, SHA256, USER NAME, SIGNATURE, or PID.
        
    
    Use a pipe (|) to separate multiple values. Use an asterisk (\*) to match any string of characters.
    
6.  Specify the time period for which you want to search for events.
    
    Options are Last 24H (hours), Last 7D (days), Last 1M (month), or select a Custom time period.
    
7.  Choose when to run the query.
    
    Select the calendar icon to schedule a query to run on or before a specific date or Run to run the query immediately and view the results in the Query Center.
    
    While the query is running, you can always navigate away from the page and a notification is sent when the query completes. You can also Cancel the query or run a new query, where you have the option to Run only new query (cancel previous) or Run both queries.
    
8.  When you are ready, view the results of the query. For more information, see Review XQL query results.

##### Create image load query

Learn more about create a query to investigate the connections between image load activity, acting processes, and endpoints.

From the Query Builder, you can investigate connections between image load activity, acting processes, and endpoints.

Some examples of image load queries you can run include:

-   Module load into process events by module path or hash.
    

How to build an image load query

1.  From Cortex Cloud , select Investigation & Response → Search → Query Builder.
    
2.  Select IMAGE LOAD.
    
3.  Enter the search criteria for the image load activity query.
    
    -   Type of image activity: All, Image Load, or Change Page Protection.
        
    -   Identifying information about the image module: Full Module Path, Module MD5, or Module SHA256.
        
    
    By default, Cortex Cloud will return the activity that matches all the criteria you specify. To exclude a value, toggle the **`=`** option to **`=!`**.
    
4.  (Optional) To limit the scope to a specific source, click the + to the right of the value and specify the exception value.
    
    Specify one or more attributes for the source.
    
    Use a pipe (|) to separate multiple values. Use an asterisk (\*) to match any string of characters.
    
    -   NAME: Name of the parent process.
        
    -   PATH: Path to the parent process.
        
    -   CMD: Command-line used to initiate the process, including any arguments, up to 128 characters.
        
    -   MD5: MD5 hash value of the process.
        
    -   SHA256: SHA256 hash value of the process.
        
    -   USER NAME: User who executed the process.
        
    -   SIGNATURE: Signing status of the parent process: Signature Unavailable, Signed, Invalid Signature, Unsigned, Revoked, Signature Fail.
        
    -   SIGNER: Entity that signed the certificate of the parent process.
        
    -   PID: Process ID of the parent process.
        
    
    Run search for both the process and the Causality actor: The causality actor—also referred to as the causality group owner (CGO)—is the parent process in the execution chain that the app identified as being responsible for initiating the process tree. Select this option if you want to apply the same search criteria to the causality actor. If you clear this option, you can then configure different attributes for the causality actor.
    
5.  (_Optional_) Limit the scope to an endpoint or endpoint attributes:
    
    Specify one or more of the following attributes: Use a pipe (|) to separate multiple values.
    
    Use an asterisk (\*) to match any string of characters.
    
    -   HOST: HOST NAME, HOST IP address, HOST OS, HOST MAC ADDRESS, or INSTALLATION TYPE.
        
        INSTALLATION TYPE can be either Cortex XDR agent or Data Collector.
        
    -   PROCESS: NAME, PATH, CMD, MD5, SHA256, USER NAME, SIGNATURE, or PID.
        
    
6.  Specify the time period for which you want to search for events.
    
    Options are Last 24H (hours), Last 7D (days), Last 1M (month), or select a Custom time period.
    
7.  Choose when to run the query.
    
    Select the calendar icon to schedule a query to run on or before a specific date or Run to run the query immediately and view the results in the Query Center.
    
    While the query is running, you can always navigate away from the page and a notification is sent when the query completes. You can also Cancel the query or run a new query, where you have the option to Run only new query (cancel previous) or Run both queries.
    
8.  When you are ready, view the results of the query. For more information, see Review XQL query results.

##### Create network connections query

Learn more about creating a query to investigate the connections between firewall logs, endpoints, and network activity.

From the Query Builder, you can investigate network events stitched across endpoints and the Palo Alto Networks Next-Generation Firewall logs.

Some examples of a network query you can run include:

-   Source and destination of a process.
    
-   Network connections that included a specific App ID
    
-   Processes that created network connections.
    
-   Network connections between specific endpoints.
    

How to build a network connection query

1.  From Cortex Cloud , select Investigation & Response → Search → Query Builder.
    
2.  Select NETWORK CONNECTIONS.
    
3.  Enter the search criteria for the network events query.
    
    -   Network attributes: Define any additional process attributes for which you want to search. Use a pipe (**`|`**) to separate multiple values (for example **`80|8080`**). By default, Cortex Cloud will return the events that match the attribute you specify. To exclude an attribute value, toggle the **`=`** option to **`=!`**. Options are:
        
        -   APP ID: App ID of the network.
            
        -   PROTOCOL: Network transport protocol over which the traffic was sent.
            
        -   SESSION STATUS
            
        -   FW DEVICE NAME: Firewall device name.
            
        -   FW RULE: Firewall rule.
            
        -   FW SERIAL ID: Firewall serial ID.
            
        -   PRODUCT
            
        -   VENDOR
            
        
        To specify an additional exception (match this value except), click the + to the right of the value and specify the exception value.
        
    
4.  (Optional) To limit the scope to a specific source, click the + to the right of the value and specify the exception value.
    
    Specify one or more attributes for the source.
    
    Use a pipe (|) to separate multiple values. Use an asterisk (\*) to match any string of characters.
    
    -   HOST NAME: Name of the source.
        
    -   HOST IP: IP address of the source.
        
    -   HOST OS: Operating system of the source.
        
    -   PROCESS NAME: Name of the process.
        
    -   PROCESS PATH: Path to the process.
        
    -   CMD: Command-line used to initiate the process, including any arguments, up to 128 characters.
        
    -   MD5: MD5 hash value of the process.
        
    -   SHA256: SHA256 hash value of the process.
        
    -   PROCESS USER NAME: User who executed the process.
        
    -   SIGNATURE: Signing status of the parent process: Signature Unavailable, Signed, Invalid Signature, Unsigned, Revoked, Signature Fail.
        
    -   PID: Process ID of the parent process.
        
    -   IP: IP address of the process.
        
    -   PORT: Port number of the process.
        
    -   USER ID: ID of the user who executed the process.
        
    -   Run search for both the process and the Causality actor: The causality actor—also referred to as the causality group owner (CGO)—is the parent process in the execution chain that the app identified as being responsible for initiating the process tree. Select this option if you want to apply the same search criteria to the causality actor. If you clear this option, you can then configure different attributes for the causality actor.
        
    
5.  (Optional) Limit the scope to a destination.
    
    Use a pipe (|) to separate multiple values. Use an asterisk (\*) to match any string of characters.
    
    Specify one or more of the following attributes:
    
    -   REMOTE IP: IP address of the destination.
        
    -   COUNTRY: Country of the destination.
        
    -   Destination TARGET HOST,NAME, PORT, HOST NAME, PROCESS USER NAME, HOST IP, CMD, HOST OS, MD5, PROCESS PATH, USER ID, SHA256, SIGNATURE, or PID
        
    
6.  Specify the time period for which you want to search for events.
    
    Options are Last 24H (hours), Last 7D (days), Last 1M (month), or select a Custom time period.
    
7.  Choose when to run the query.
    
    Select the calendar icon to schedule a query to run on or before a specific date or Run to run the query immediately and view the results in the Query Center.
    
    While the query is running, you can always navigate away from the page and a notification is sent when the query completes. You can also Cancel the query or run a new query, where you have the option to Run only new query (cancel previous) or Run both queries.
    
8.  When you are ready, view the results of the query. For more information, see Review XQL query results.

##### Create network query

Learn more about creating a query to investigate the connections between network activity, acting processes, and endpoints.

From the Query Builder, you can investigate connections between network activity, acting processes, and endpoints.

Some examples of a network query you can run include:

-   Network connections to or from a specific IP address and port number.
    
-   Processes that created network connections.
    
-   Network connections between specific endpoints.
    

How to build a network query

1.  From Cortex Cloud , select Investigation & Response → Search → Query Builder.
    
2.  Select NETWORK.
    
3.  Enter the search criteria for the network events query.
    
    -   Network traffic type: Select the type or types of network traffic issues you want to search: Incoming, Outgoing, or Failed.
        
    -   Network attributes: Define any additional process attributes for which you want to search. Use a pipe (**`|`**) to separate multiple values (for example **`80|8080`**). By default, Cortex Cloud will return the events that match the attribute you specify. To exclude an attribute value, toggle the **`=`** option to **`=!`**. Options are:
        
        -   REMOTE COUNTRY: Country from which the remote IP address originated.
            
        -   REMOTE IP: Remote IP address related to the communication.
            
            **Note:**
            
            When you run the query, depending on the outcome of the results, the value specified in this field might be displayed in the `dst_ip` field in the query results. This occurs if an RDP event is recorded whereby a user connected from the source IP to the destination IP.
            
        -   REMOTE PORT: Remote port used to make the connection.
            
        -   LOCAL IP: Local IP address related to the communication. Matches can return additional data if a machine has more than one NIC.
            
        -   LOCAL PORT: Local port used to make the connection.
            
        -   PROTOCOL: Network transport protocol over which the traffic was sent.
            
        
        To specify an additional exception (match this value except), click the + to the right of the value and specify the exception value.
        
    
4.  (Optional) To limit the scope to a specific source, click the + to the right of the value and specify the exception value.
    
    Specify one or more attributes for the source.
    
    Use a pipe (|) to separate multiple values. Use an asterisk (\*) to match any string of characters.
    
    -   NAME: Name of the parent process.
        
    -   PATH: Path to the parent process.
        
    -   CMD: Command-line used to initiate the process, including any arguments, up to 128 characters.
        
    -   MD5: MD5 hash value of the process.
        
    -   SHA256: SHA256 hash value of the process.
        
    -   USER NAME: User who executed the process.
        
    -   SIGNATURE: Signing status of the parent process: Signature Unavailable, Signed, Invalid Signature, Unsigned, Revoked, Signature Fail.
        
    -   SIGNER: Entity that signed the certificate of the parent process.
        
    -   PID: Process ID of the parent process.
        
    -   Run search for process, Causality, and OS actors: The causality actor—also referred to as the causality group owner (CGO)—is the parent process in the execution chain that the Cortex XDR agent identified as being responsible for initiating the process tree. The OS actor is the parent process that creates an OS process on behalf of a different indicator. By default, this option is enabled to apply the same search criteria to initiating processes. To configure different attributes for the parent or initiate the process, clear this option.
        
    
5.  (_Optional_) Limit the scope to an endpoint or endpoint attributes:
    
    Specify one or more of the following attributes: Use a pipe (|) to separate multiple values.
    
    Use an asterisk (\*) to match any string of characters.
    
    -   HOST: HOST NAME, HOST IP address, HOST OS, HOST MAC ADDRESS, or INSTALLATION TYPE.
        
    -   INSTALLATION TYPE can be either Cortex XDR agent or Data Collector.
        
    -   PROCESS: NAME, PATH, CMD, MD5, SHA256, USER NAME, SIGNATURE, or PID.
        
    
6.  Specify the time period for which you want to search for events.
    
    Options are Last 24H (hours), Last 7D (days), Last 1M (month), or select a Custom time period.
    
7.  Choose when to run the query.
    
    Select the calendar icon to schedule a query to run on or before a specific date or Run to run the query immediately and view the results in the Query Center.
    
    While the query is running, you can always navigate away from the page and a notification is sent when the query completes. You can also Cancel the query or run a new query, where you have the option to Run only new query (cancel previous) or Run both queries.
    
8.  When you are ready, view the results of the query. For more information, see Review XQL query results.

##### Create process query

Learn more about creating a query to investigate connections between processes, child processes, and endpoints.

From the Query Builder you can investigate connections between processes, child processes, and endpoints.

For example, you can create a process query to search for processes executed on a specific endpoint.

How to build a process query

1.  From Cortex Cloud , select Investigation & Response → Search → Query Builder.
    
2.  Select PROCESS.
    
3.  Enter the search criteria for the process query.
    
    -   Process action: Select the type of process action you want to search: On process Execution or Injection into another process.
        
    -   Process attributes—Define any additional process attributes for which you want to search.
        
        Use a pipe (**`|`**) to separate multiple values. Use an asterisk (**`*`**) to match any string of characters.
        
        By default, Cortex Cloud will return results that match the attribute you specify. To exclude an attribute value, toggle the operator from **`=`** to **`!=`**. Attributes are:
        
        -   NAME: Name of the process. For example, `notepad.exe`.
            
        -   PATH: Path to the process. For example, `C:\windows\system32\notepad.exe`.
            
        -   CMD: Command-line used to initiate the process including any arguments, up to 128 characters.
            
        -   MD5: MD5 hash value of the process.
            
        -   SHA256: SHA256 hash value of the process.
            
        -   USER NAME: User who executed the process.
            
        -   SIGNATURE: Signing status of the process: Signature Unavailable, Signed, Invalid Signature, Unsigned, Revoked, Signature Fail.
            
        -   SIGNER: Signer of the process.
            
        -   PID: Process ID.
            
        -   PROCESS_FILE_INFO: Metadata of the process file, including file property details, file entropy, company name, encryption status, and version number.
            
        -   PROCESS_SCHEDULED_TASK_NAME: Name of the task scheduled by the process to run in the Task Scheduler.
            
        -   PROCESS_TOKEN_INFORMATION: Bitwise token of the process privileges.
            
        -   DEVICE TYPE: Type of device used to run the process: Unknown, Fixed, Removable Media, CD-ROM.
            
        -   DEVICE SERIAL NUMBER: Serial number of the device type used to run the process.
            
        
        To specify an additional exception (match this value except), click the + to the right of the value and specify the exception value.
        
    
4.  (Optional) Limit the scope to a specific acting process:
    
    Select +PROCESS and specify one or more of the following attributes for the acting (parent) process.
    
    -   NAME: Name of the parent process.
        
    -   PATH: Path to the parent process.
        
    -   CMD: Command-line used to initiate the parent process including any arguments, up to 128 characters.
        
    -   MD5: MD5 hash value of the parent process.
        
    -   SHA256: SHA256 hash value of the process.
        
    -   USER NAME: User who executed the process.
        
    -   SIGNATURE: Signing status of the parent process: Signed, Unsigned, N/A, Invalid Signature, Weak Hash
        
    -   SIGNER: Entity that signed the certificate of the parent process.
        
    -   PID: Process ID of the parent process.
        
    -   Run search on process, Causality and OS actors: The causality actor—also referred to as the causality group owner (CGO)—is the parent process in the execution chain that the Cortex XDR agent identified as being responsible for initiating the process tree. The OS actor is the parent process that creates an OS process on behalf of a different initiator. By default, this option is enabled to apply the same search criteria to initiating processes. To configure different attributes for the parent or initiate a process,
        
    
5.  (Optional) Limit the scope to an endpoint or endpoint attributes:
    
    Select +HOST and specify one or more of the following attributes:
    
    -   HOST: HOST NAME, HOST IP address, HOST OS, HOST MAC ADDRESS, or INSTALLATION TYPE.
        
        INSTALLATION TYPE can be Cortex XDR agent.
        
    -   PROCESS: NAME, PATH, CMD, MD5, SHA256, USER NAME, SIGNATURE, or PID.
        
    
6.  Specify the time period for which you want to search for events.
    
    Options are Last 24H (hours), Last 7D (days), Last 1M (month), or select a Custom time period.
    
7.  Choose when to run the query.
    
    Select the calendar icon to schedule a query to run on or before a specific date or Run to run the query immediately and view the results in the Query Center.
    
    While the query is running, you can always navigate away from the page and a notification is sent when the query completes. You can also Cancel the query or run a new query, where you have the option to Run only new query (cancel previous) or Run both queries.
    
8.  When you are ready, view the results of the query. For more information, see Review XQL query results.

##### Create registry query

Learn more about creating a query to investigate connections between registry activity, processes, and endpoints.

From the Query Builder you can investigate connections between registry activity, processes, and endpoints.

Some examples of a registry query you can run include:

-   Modified registry keys on specific endpoints.
    
-   Registry keys related to process activity that exist on specific endpoints.
    

How to build a registry query

1.  From Cortex Cloud , select Investigation & Response → Search → Query Builder.
    
2.  Select REGISTRY.
    
3.  Enter the search criteria for the registry events query.
    
    -   Registry action: Select the type or types of registry actions you want to search: Key Create, Key Delete, Key Rename, Value Set, or Value Delete.
        
    -   Registry attributes: Define any additional registry attributes for which you want to search. By default, Cortex Cloud will return the events that match the attribute you specify. To exclude an attribute value, toggle the **`=`** option to **`=!`**. Attributes are:
        
        -   KEY NAME: Registry key name.
            
            **Important:**
            
            Ensure the KEY NAME is entered as a real registry key name, and not as a symbolic link. Otherwise, the query will not retrieve results.
            
            Example 78. 
            
            Instead of `HKEY_LOCAL_MACHINE\System\CurrentControlSet`, which is a symbolic link, use `KEY_LOCAL_MACHINE\System\ControlSet001`.
            
              
            
            Example 79. 
            
            Instead of `HKEY_CURRENT_USER`, use `HKEY_USERS\<SID>`, where SID is either a SID of the current user or an asterisk (`*`) to represent any SID.
            
              
            
        -   DATA: Registry key data value.
            
        -   KEY PREVIOUS NAME: Name of the registry key before modification.
            
        -   VALUE NAME: Registry value name.
            
        
        To specify an additional exception (match this value except), click the + to the right of the value and specify the exception value.
        
    
4.  (Optional) To limit the scope to a specific source, click the + to the right of the value and specify the exception value.
    
    Specify one or more attributes for the source.
    
    Use a pipe (|) to separate multiple values. Use an asterisk (\*) to match any string of characters.
    
    -   NAME: Name of the parent process.
        
    -   PATH: Path to the parent process.
        
    -   CMD: Command-line used to initiate the process including any arguments, up to 128 characters.
        
    -   MD5: MD5 hash value of the process.
        
    -   SHA256: SHA256 hash value of the process.
        
    -   USER NAME: User who executed the process.
        
    -   SIGNATURE: Signing status of the parent process: Signature Unavailable, Signed, Invalid Signature, Unsigned, Revoked, Signature Fail.
        
    -   SIGNER: Entity that signed the certificate of the parent process.
        
    -   PID: Process ID of the parent process.
        
    -   Run search for process, Causality, and OS actors: The causality actor—also referred to as the causality group owner (CGO)—is the parent process in the execution chain that the Cortex XDR agent identified as being responsible for initiating the process tree. The OS actor is the parent process that creates an OS process on behalf of a different indicator. By default, this option is enabled to apply the same search criteria to initiating processes. To configure different attributes for the parent or initiate the process, clear this option.
        
    
5.  (_Optional_) Limit the scope to an endpoint or endpoint attributes:
    
    Specify one or more of the following attributes: Use a pipe (|) to separate multiple values.
    
    Use an asterisk (\*) to match any string of characters.
    
    -   HOST: HOST NAME, HOST IP address, HOST OS, HOST MAC ADDRESS, or INSTALLATION TYPE.
        
    -   INSTALLATION TYPE can be either Cortex XDR agent or Data Collector.
        
    -   PROCESS: NAME, PATH, CMD, MD5, SHA256, USER NAME, SIGNATURE, or PID.
        
    
6.  Specify the time period for which you want to search for events.
    
    Options are Last 24H (hours), Last 7D (days), Last 1M (month), or select a Custom time period.
    
7.  Choose when to run the query.
    
    Select the calendar icon to schedule a query to run on or before a specific date or Run to run the query immediately and view the results in the Query Center.
    
    While the query is running, you can always navigate away from the page and a notification is sent when the query completes. You can also Cancel the query or run a new query, where you have the option to Run only new query (cancel previous) or Run both queries.
    
8.  When you are ready, view the results of the query. For more information, see Review XQL query results.

##### Query across all entities

From the Cortex Cloud management console, you can search for endpoints and processes across all endpoint activity.

From the Query Builder you can perform a simple search for hosts and processes across all file events, network events, registry events, process events, event logs for Windows, and system authentication logs for Linux.

Some examples of queries you can run across all entities include:

-   All activities on a host
    
-   All activities initiated by a process on a host
    

How to build a query

1.  From Cortex Cloud , select Investigation & Response → Search → Query Builder.
    
2.  Select ALL ACTIONS.
    
3.  (Optional) Limit the scope to a specific acting process:
    
    Select Add Process to your search, and specify one or more of the following attributes for the acting (parent) process. Use a pipe (|) to separate multiple values. Use an asterisk (\*) to match any string of characters.
    
    | Field | Description |
    | --- | --- |
    | NAME | Name of the parent process. |
    | PATH | Path to the parent process. |
    | CMD | Command line used to initiate the parent process including any arguments, up to 128 characters. |
    | MD5 | MD5 hash value of the parent process. |
    | SHA256 | SHA256 hash value of the process. |
    | USER NAME | User who executed the process. |
    | SIGNATURE | Signing status of the parent process: Signed, Unsigned, N/A, Invalid Signature, Weak Hash. |
    | SIGNER | Entity that signed the certificate of the parent process. |
    | PID | Process ID of the parent process. |
    | Run search on process, Causality and OS actors | The causality actor, also referred to as the causality group owner (CGO), is the parent process in the execution chain that the agent identified as being responsible for initiating the process tree. The OS actor is the parent process that creates an OS process on behalf of a different initiator. By default, this option is enabled to apply the same search criteria to initiating processes. To configure different attributes for the parent or initiating process, clear this option. |
    
4.  (Optional) Limit the scope to an endpoint or endpoint attributes:
    
    Select Add Host to your search and specify one or more of the following attributes:
    
    -   HOST: HOST NAME, HOST IP address, HOST OS, HOST ADDRESS, or INSTALLATION TYPE.
        
    -   INSTALLATION TYPE can be either an agent, or data collector.
        
    -   PROCESS: NAME , PATH , CMD , MD5 , SHA256 , USER NAME , SIGNATURE, or PID.
        
        Use a pipe (|) to separate multiple values. Use an asterisk (\*) to match any string of characters.
        
    
5.  Specify the time period for which you want to search for events.
    
    Options are Last 24H (hours), Last7D (days), Last1M (month), or select a Custom time period.
    
6.  Choose when to run the query.
    
    Select the calendar icon to schedule a query to run on or before a specific date or Run the query immediately and view the results in the Query Center.
    
    While the query is running, you can always navigate away from the page and a notification is sent when the query completes. You can also Cancel the query or run a new query, where you have the option to Run only new query (cancel previous) or Run both queries.
    
7.  When ready, view the results in a query.

#### Overview of the Query Center

View information about the In Progress and Completed queries that that were run on the tenant.

The Query Center displays information about all queries that were run on the tenant, and the queries that are currently In Progress. The Query Center displays the following tabs:

-   Query History
    
    View and manage all completed Cortex Query Language (XQL) and Graph Search queries. On this tab you can view query results, re-run and adjust queries, and schedule when a query runs. You can also see details of cancelled queries, including the query type and source, and the name of the user who cancelled the query.
    
-   Active Queries
    
    View and manage all queries that are currently In Progress on the tenant. You can view details about a running query, including the user who ran the query, the context from which it ran, the source of the query, and the amount of time that the query has been running. From this tab you can also cancel active queries.
    

**Note:**

-   Very short queries might not be listed. 
    
-   You cannot cancel correlation queries.
    
-   The default retention period for historic queries is aligned with issue retention.

##### Edit and run queries in Query Center

Learn more about viewing the results of a query, modifying a query, and rerunning queries from Query Center.

From the Query Center you can take action on the Completed and In Progress queries that are running on your tenant.

Right-click a query to see the available options, where some of the options differ depending on the type of query you've selected. The pivot (right-click) options described below are some of the ones that may require further explanation.

**Note:**

If query limits are applied to your tenant, the number of concurrent running queries is limited per user. If query usage is reaching the defined limit, a system message warns you that a high query load is impacting performance. If you exceed the limit, new queries are blocked until query usage drops. You can view all active queries under Query Center → Active Queries, and cancel queries to reduce the load.

###### View the results of a query

You can view the original results of an XQL query when it was originally run in the Query Builder and added to the Query Center.

1.  Select Investigation & Response → Search → Query Center → Query History.
    
2.  Identify the XQL query by looking in the Query Name and Query Description columns.
    
    The Query Description column displays the parameters that were defined for a query. If necessary, use the filter on the column to reduce the number of queries displayed.
    
    Queries that were created from a Query Builder template are prefixed with the template name.
    
3.  Right-click anywhere in the XQL query row and select Show results.
    
    You have the option to Show results in new tab or Show results in same tab.
    
4.  (Optional) Export to file to export the results to a tab-separated values (TSV) file.
    
5.  (Optional) Perform additional investigation on the issues.
    
    Right-click a value in the results table to see the options for further investigation.
    

###### Run a query

You can run a query for a Graph Search query.

1.  Select Investigation & Response → Search → Query Center → Query History.
    
2.  Identify the Graph Search query by looking in the Query Name and Query Description columns.
    
    The Query Description column displays the parameters that were defined for a query. If necessary, use the filter on the column to reduce the number of queries displayed.
    
3.  Right-click anywhere in the Graph Search query row and select Run query.
    
    You have the option to Run in same tab or Show in new tab.
    
4.  (Optional) The Graph Search results are displayed in a graph format by default. You can toggle to Table to view the results in a table format. In addition, you can always export the graph results using the icon at the top of the page to a PNG, SVG, or TSV file. Table results can only be exported to a TSV file.
    
5.  (Optional) Perform additional investigation on the graph or table results.
    
    On the graph results, you can either hover or select different nodes for further investigation. While in the table results, you can select any cell in the table for further investigation.
    

###### Modify a query

After you view the query results of an XQL query or run a Graph Search query as explained in the tasks above, you can change your search parameters to refine the search results or correct a search parameter.

-   For queries created in XQL, type your changes in the XQL query field where the original query is listed and the results are displayed in the Query Results tab. After modifying the query, you can run, schedule, or save the query.
    
-   For queries created with a Query Builder template, the defined parameters are shown at the top of the Results page. Select Back to edit to modify the query with the template format or Continue in XQL to open the query in XQL.
    
-   For Graph Search queries, the graph results are displayed. Click anywhere in the Graph Search query interface, where your existing query is defined, to display the complete query, update your query, and rerun the search.
    

###### Schedule a query to run

You can schedule an XQL query to run on or before a specific date. Cortex Cloud creates a new query in the Query Center, and when the query completes, it displays a notification in the notification bar.

How to schedule a query

1.  Select Investigation & Response → Search → Query Center → Query History.
    
2.  Right-click anywhere in the query and then select Schedule.
    
3.  Choose a schedule option and the date and time that the query should run:
    
    -   Run one time query on a specific date
        
    -   Run query by date and time: Schedule a recurring query.
        
    
4.  Click OK to schedule the query.
    
    Cortex Cloud creates a new query and schedules it to run on or by the selected date and time.
    
5.  View the status of the scheduled query on the Scheduled Queries page.
    
    You can also make changes to the query, edit the frequency, view when the query will next run, or disable the query. For more information, see Manage scheduled queries.
    

###### Cancel a query

**Note:**

You can cancel your own queries. To cancel queries run by other users, you must have View/Edit permissions for Configurations → Query Management. By default, Instance administrators have View/Edit permission.

On the Active Queries tab you can cancel one or more In Progress queries. You might want to cancel long-running queries, or cancel queries to reduce tenant consumption. If query limits are applied to your tenant and you exceed the defined limit of concurrent running queries, new queries are blocked until the number of active queries falls below the threshold. Canceling active queries allows you to unblock and run new queries.

How to cancel a query

1.  Select Investigation & Response → Search → Query Center → Active Queries.
    
2.  Select one or more queries and click Cancel Selected Queries.
    

**Note:**

-   Cancelled queries show a Canceled status. You can see details of all canceled queries in the Query History tab.  
    
-   You cannot cancel correlation rule queries.
    
-   If you cancel a scheduled query, only the current query is cancelled. Future recurrences of the scheduled query are not affected.

###### Query Center reference information

Descriptions of the fields in the Query Center table.

The table below lists the common fields in the Query Center, where the options differ for an XQL query versus a Graph Search query.

**Note:**

Certain fields are exposed and hidden by default. An asterisk (\*) is beside every field that is exposed by default.

Query Center table

| Field | Description |
| --- | --- |
| BQL | Indicates whether the Cortex Query Language (XQL) query was created by the native search. Native search has been deprecated; this field allows you to view data for XQL queries performed before deprecation. |
| COMPUTE UNIT USAGE | For XQL queries, indicates the number of query units that were used to execute the API query and Cold Storage query. |
| ISSUED BY \* | For XQL queries, indicates the user who ran or scheduled the query. For Graph Search queries, indicates the user who ran the query. |
| DURATION (SEC) | Number of seconds it took to execute the XQL query. |
| EXECUTION ID | Unique identifier of XQL and Graph Search queries in the tenant. The identifier ID generated for queries executed in Cortex Cloud and XQL query API. |
| NUM OF RESULTS\* | Number of results returned by the query. |
| PUBLIC API | Whether the source executing the XQL query was an XQL query API. |
| QUERY DESCRIPTION\* | Query parameters used to run the query. |
| QUERY ID | Unique identifier of the query. |
| QUERY NAME\* | For saved queries, the Query Name identifies the query specified according to a randomly generated number.- XQL queries use the format XQL-QUERY-<number>, such as XQL-QUERY-12.; Graph Search queries use the format Graph-Query-<number>, such as Graph-Query-1247. ; For scheduled queries, the Query Name identifies the auto-generated name of the parent XQL query. Scheduled queries also display an icon to the left of the name to indicate that the XQL query is recurring. |
| QUERY STATUS\* | Status of the query, where the options differ based on the query type: XQL queries:- Queued: The query is queued and will run when there is an available slot.; Running; Failed; Partially completed: The query was stopped after exceeding the maximum number of permitted results. The default results for any query is a maximum of 1,000,000 results, when no limit is explicitly stated in the query. Queries based on XQL query entities are limited to 10,000 results. To reduce the number of results returned, you can adjust the query settings and rerun.; Stopped: The query was stopped by an administrator.; Completed; Deleted: The query was pruned. ; Graph Search queries:- Failed; Completed |
| QUERY SYNTAX | The exact syntax used to write the query. |
| RESULTS SAVED\* | For XQL queries, you can choose whether to save the query results, so the output of the field is either Yes or No. Yet, for Graph Search queries, the results can't be saved and must be run each time again, so the field is always No. |
| SIMULATED COMPUTE UNITS | Number of XQL query units that were used to execute the Hot Storage query. |
| Source | Source from which the query was run, for example Playbook, Report, or Investigation. |
| Source ID | ID of the source from where the query was run. |
| Source Name | Name of the source from where the query was run. |
| TIMESTAMP\* | Date and time the query was created. |
| XQL | Indicates whether the XQL query was created by an XQL search. |

#### Manage scheduled queries

Learn how to manage your scheduled and recurring queries.

The Scheduled Queries page displays information about your scheduled and recurring queries. From this page, you can edit scheduled query parameters, view previous executions, disable, and remove scheduled queries. Right-click a query to see the available options.

##### View executed queries

1.  Select Investigation & Response → Search → Scheduled Queries.
    
2.  Locate the scheduled query for which you want to view previous executions.
    
    If necessary, use the Filter to reduce the number of queries returned.
    
3.  Right-click anywhere in the query row, and select Show executed queries.
    
    Cortex Cloud filters the queries on the Query Center.
    

##### Edit the query frequency

1.  Select Investigation & Response → Search → Scheduled Queries.
    
2.  Locate the scheduled query that you want to edit.
    
    If necessary, use the Filter to reduce the number of queries returned.
    
3.  Right-click anywhere in the query row and then select Edit.
    
4.  Adjust the schedule settings, and then click OK.

##### Scheduled Queries reference information

Descriptions of the fields in the Scheduled Queries table.

The table below lists the common fields in the Scheduled Queries page.

**Note:**

Certain fields are exposed and hidden by default. An asterisk (\*) is beside every field that is exposed by default.

Scheduled Queries table

| Field | Description |
| --- | --- |
| BQL | Whether the query was created by the native search. Native search has been deprecated, this field allows you to view data for queries performed before deprecation. |
| ISSUED BY | User who ran or scheduled the query. |
| NEXT EXECUTION | For queries that are scheduled to run at a specific frequency, this displays the next execution time. For queries that were scheduled to run at a specific time and date, this field will show `None`. |
| PUBLIC API | Whether the source executing the query was an XQL query API. |
| QUERY DESCRIPTION | Query parameters used to run the query. |
| QUERY ID | Unique identifier of the query. |
| QUERY NAME | For saved queries, the Query Name identifies the query specified by the administrator.; For scheduled queries, the Query Name identifies the auto-generated name of the parent query. Scheduled queries also display an icon to the left of the name to indicate that the query is recurring.  |
| QUERY SYNTAX | The exact syntax used to write the query. |
| SCHEDULE TIME | Frequency or time at which the query was scheduled to run. |
| XQL | Whether the query was created by XQL search. |

#### Manage your personal query library

Cortex Cloud provides as part of the Query Library a personal library for saving and managing your own queries.

Cortex Cloud provides as part of the Query Library a personal query library for saving and managing your own queries. When creating a query in XQL Search or managing your queries from the Query Center, you can save queries to your personal library. You can also decide whether the query is shared with others (on the same tenant) in their Query Library or unshare it, so it is only visible to you. You can also view the queries that are shared by others (on the same tenant) in your Query Library.

The queries listed in your Query Library have different icons to help you identify the different states of the queries:

-   Created by me and unshared.
    
-   Create by me and shared.
    
-   Created by someone else and shared.
    

The Query Library contains a powerful search mechanism that enables you to search in any field related to the query, such as the query name, description, creator, query text, and labels. In addition, adding a label to your query enables you to search for these queries using these labels in the Query Library.

How to add a query to your personal query library

1.  Save a query to your personal query library.
    
    You can do this in two ways:
    
    -   **From the Query Builder**
        
        1.  Select Investigation & Response → Search → Query Builder → XQL.
            
        2.  In the XQL query field, define the parameters of your query.
            
        3.  Select Save as → Query to Library.
            
        
    -   **From the Query Center**
        
        1.  Select Investigation & Response → Search → Query Center.
            
        2.  Locate the query that you want to save to your personal query library.
            
        3.  Right-click anywhere in the query row, and select Save query to library.
            
        
    
2.  Set these parameters.
    
    -   Query Name: Specify a unique name for the query. Query names must be unique in both private and shared lists, which includes other people’s queries.
        
    -   Query Description (Optional): Specify a descriptive name for your query.
        
    -   Labels (Optional): Specify a label that is associated with your query. You can select a label from the list of predefined labels or add your label and then select Create Label. Adding a label to your query enables you to search for queries using this label in the Query Library.
        
    -   Share with others: You can either set the query to be private and only accessible by you (default) or move the toggle to Share with others the query, so that other users using the same tenant can access the query in their Query Library.
        
    
3.  Click Save.
    
    A notification appears confirming that the query was saved successfully to the library, and closes on its own after a few seconds.
    
    The query that you added is now listed as the first entry in the Query Library. The query editor is opened to the right of the query.
    
4.  Other available options.
    
    As needed, you can return to your queries in the Query Library to manage your queries. Here are the actions available to you.
    
    -   Edit the name, description, labels, and parameters of your query by selecting the query from the Query Library, hovering over the line in the query editor that you want to edit, and selecting the edit icon to edit the text.
        
    -   Search query data and metadata: Use the Query Library’s powerful search mechanism that enables you to search in any field related to the query, such as the query name, description, creator, query text, and label. The Search query data and metadata field is available at the top of your list of queries in the Query Library.
        
    -   Show: Filter the list of queries from the Show menu. You can filter by the Palo Alto Networks queries provided with Cortex Cloud , filter by the queries Created by Me, or filter by the queries Created by Others. To view the entire list, Select all (default).
        
    -   Save as new: Duplicate the query and save it as a new query. This action is available from the query menu by selecting the 3 vertical dots.
        
    -   Share with others: If your query is currently unshared, you can share with other users on the same tenant your query, which will be available in their Query Library. This action is only available from the query menu by selecting the 3 vertical dots when your query is unshared.
        
    -   Unshare: If your query is currently shared with other users, you can Unshare the query and remove it from their Query Library. This action is only available from the query menu by selecting the 3 vertical dots when your query is shared with others. You can only Unshare a query that you created. If another user created the query, this option is disabled in the query menu.
        
    -   Delete the query. You can only delete queries that you created. If another user created the query, this option is disabled in the query menu when selecting the 3 vertical dots.

### Quick Launcher

The Quick Launcher provides a quick, in-context shortcut that you can use to search for information, perform common investigation tasks, or initiate actions.

The Quick Launcher provides a quick, in-context shortcut that you can use to search for information, perform common investigation tasks, or initiate response actions from any place in Cortex Cloud. The tasks that you can perform with the Quick Launcher include:

-   Search for host, username, IP address, domain, filename, filepath, timestamp to easily launch the artifact and assets views.
    
    **Note:**
    
    For hosts, Cortex Cloud displays results for exact matches but supports the use of wildcard (**`*`**) which changes the search to return matches that contain the specified text. For example, a search of **`compy-7*`** will return any hosts beginning with **`compy-7`** such as **`compy-7000`**, **`compy-7abc`**, and so forth.
    
-   Search the Asset Inventory for a specific asset name or IP address. In addition, the following actions are available when searching for Asset Inventory data.
    
    -   Change search to <host name of asset> to display additional actions related to that host. This option is only relevant when searching for an IP address that is connected to an asset.
        
    -   Open in Asset Inventory is a pivot available when the host name of an asset is selected.
        
    
-   Begin Go To mode. Enter forward slash (/) followed by your search string to filter and navigate to Cortex Cloud pages. For example, **`/ rules`** searches for all pages that include **`rules`** and allows you to navigate to those pages. Select **`Esc`** to exit Go To mode.
    
-   Add a processes by SHA256 hash to the allow list or block list
    
-   Add domains or IP addresses to the EDL block list
    
-   Create a new IOC for an IP address, domain, hash, filename, or filepath
    
-   Isolate an endpoint
    
-   Open a terminal to a given endpoint
    
-   Initiate a malware scan on an endpoint
    

You can open the Quick Launcher by clicking the Quick Launcher icon located in the top navigation bar, or from the application menus, or by using the default keyboard shortcut: **`Ctrl-Shift+X`** on Windows or **`CMD+Shift+X`** on macOS. To change the default keyboard shortcut, select Settings → Configurations → General → Server Settings → Keyboard Shortcuts. The shortcut value must be a keyboard letter, A through Z, and cannot be the same as the Artifact and Asset Views defined shortcut.

You can also prepopulate searches in Quick Launcher by selecting text in the app or selecting a node in the Causality or Timeline Views.

## Customize cases and issues

### Customize cases and issues

Customize your cases and issues for specific requirements.

While cases and issues are configured to work OOTB, users with specific requirements can customize them for specific needs or scenarios.

#### Set up case scoring

Set up case scoring and define scoring rules.

To set up case scoring you need to define scoring rules.

##### Enable and define scoring rules

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
    

##### Revise existing scoring rules

In the Scoring Rules table, take the following actions to review your rules and sub-rules:

-   Use the arrows to rearrange rule priorities. Make sure to click Save after any changes.
    
-   Select one or more rules and right-click to see the available actions.
    

##### Scope-Based Access Control considerations

Case Scoring supports Scope-Based Access Control (SBAC). If you're a scoped user, a small lock icon indicates that you don't have permissions to edit a rule. The following parameters are considered when editing a scoring rule:

-   If Scope-Based Access Control (SBAC) is enabled and Endpoint Scoping Mode is set to restrictive mode, you can edit a rule if you are scoped to all tags in the rule.
    
-   If Scope-Based Access Control (SBAC) is enabled and Endpoint Scoping Mode is set to permissive mode, you can edit a rule if you are scoped to at least one tag listed in the rule.
    
-   To change the order of a rule, you must have permissions to the other rules of which you want to change the order.
    
-   If a rule was added when set to restrictive mode, and then changed to permissive (or vice versa), you will only have view permissions.

#### Create a starring configuration
You can proactively star issues and the cases to which they are linked by creating a starring configuration:

1.  Select Cases & Issues → Case Configuration → Starred Issues.
    
2.  Select Add Starring Configuration.
    
3.  Under Configuration Name, enter a name to identify your starring configuration.
    
4.  (Optional) Under Comment, enter a descriptive comment.
    
5.  In the issue table, use the filters to define the issue attributes you want to include in the match criteria. For example, you can select issues with High severity, issues by category, or issues associated with certain assets or asset providers.
    
    **Tip:**
    
    Right-click an issue field to add it as match criteria.
    
6.  Click Create.
    

##### Scope-Based Access Control considerations

Case starring supports Scope-Based Access Control (SBAC). The following parameters are considered when editing a starring configuration:

-   If Scope-Based Access Control (SBAC) is enabled and the Endpoint Scoping Mode is set to restrictive mode, you can edit a configuration if you are scoped to all tags in the configuration.
    
-   If Scope-Based Access Control (SBAC) is enabled and the Endpoint Scoping Mode is set to permissive mode, you can edit a configuration if you are scoped to at least one tag listed in the configuration.
    
-   If a policy was added when set to restrictive mode, and then changed to permissive (or vice versa), you will only have view permissions.

#### Create custom case statuses and resolution reasons

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

#### Create a sync profile

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
