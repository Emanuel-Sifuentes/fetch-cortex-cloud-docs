# Review and prioritize posture issues

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

#### Causality view

See the causality of an issue—the entire process execution chain that led up to the issue in the Cortex Cloud app.

The causality view provides an interactive visualization of a Causality Instance (CI) associated with an issue. On this view you can see the causality (cause and effect) of events of the entire process execution chain that led up to the issue. By automating the dot-connection process, Cortex Cloud helps you to streamline your investigations by providing immediate, actionable insights into security issues and the related processes in the causality chain.

To open the casualty, right-click on an issue in the Cases or Issues pages. The causality view comprises the causality instance chain, Information overview, Forensics highlights, and the All Events table. Click on nodes on the causality chain to see details about each entity in the Information overview and All Events table. You can also take actions on the processes in the chain by clicking Actions or right-clicking a specific node.

  Show me more

The following sections describe the different areas of the causality view:

##### Causality instance chain

Includes the graphical representation of the Causality Instance (CI), built from process nodes, events, and issues. The chain presents the process execution and might include events that the processes caused, and issues that were triggered by the events or processes.

The Causality Group Owner (CGO) is displayed on the left side of the chain. The CGO is the process that is responsible for all the other processes, events, and issues in the chain. You need the entire CI to fully understand why the issue occurred. The process node displays icons to indicate when an RPC protocol or code injection event was executed on another process from either a local or remote host.

-    Injected Node
    
-    Remote IP address
    

Causality data is displayed as follows:

-   Visualization of the branch between the CGO and the actor process of the issue/event.
    
-   Displays up to nine additional process branches that reveal issues related to the issue/event. Branches containing issues with the nearest timestamp to the original issue/event are displayed first.
    
-   Causality cards that contain more causality data display a Showing Partial Causality flag. You can manually add additional child or parent processes branches by right-clicking on the process nodes displayed in the graph.
    

##### Navigation

You can move the chain, extend it, and modify it. To adjust the appearance of the CI chain, use the size controls on the right. You can also move the chain by selecting and dragging it. To return the chain to its original position and size, click  in the lower-right of the CI graph.

##### Identity Threat data

When the Identity Threat Module is enabled, Cortex Cloud displays the anomaly that triggered the issue against the backdrop of baseline behavior for some issues. To see the profiles that are generated by the detector, Open Issue Visualization. Each tab displays the factors that triggered the issue, the event and the baseline information in tabular format or in timeline format, depending on the type of event. The graphs display the information in full mode, covering 30 days.

-   The tabular view displays the baseline behavior in a table, with the anomaly highlighted and in a separate line.
    
-   The timeline view displays the highlighted atypical value, and if applicable, the minimum, maximum, and average values, for the selected period.
    

##### Actions

Hover over a process node to display a Process Information pop-up listing useful information about the process. From any process node, you can also right-click to display additional actions that you can perform during your investigation:

-   **Show parents and children:** If the parent is not presented by default, you can display it. If the process has children, Cortex Cloud opens a dialog displaying the Children Process Start Time, Name, CMD, and Username details.
    
-   **Hide branch:** Hide a branch from the causality view.
    
-   **Add to block list or allow list, terminate, or quarantine a process:** If after investigating the activity in the CI chain, you want to take action on the process, you can select the desired action to allow or block the process across your organization.
    
    In the causality view of a **Detection (Post Detected)** type issue, you can also Terminate process by hash.
    

##### Information overview

Summarizes information about the selected node in the causality chain.

If you select an issue node, you can see the issue name, source, timestamp, severity, the action taken, the tags assigned to it, and MITRE ATT&CK tactics and techniques identified. If more than one issues is available, you can scroll through the related issues.

If you select a process node, you can see the path, parent Pid, Sha256, associated username, and MITRE ATT&CK details. You can also see the Wildfire Score and download the Wildfire report.

##### Forensics Highlights

Forensics Highlights serves as the central cockpit for investigating and navigating the entire causality view, offering a comprehensive breakdown of events, processes, and different activities to uncover and respond to potential threats with precision. In each section, you can click on data points to highlight the related process in the CI. Forensic Highlights includes the following sections:

-   MITRE ATT&CK: Explore forensic insights aligned with the MITRE ATT&CK framework to correlate adversarial techniques with forensics data.
    
-   Script Engines: Delve into detailed activity logs of script engines to uncover potential execution of malicious scripts and code.
    
-   Issus: Gain clarity on triggered issues for the entire causality chain.
    
-   Process: Investigate process activities to identify unusual behavior or unauthorized process executions.
    
-   Network: Analyze forensic data related to network activities, highlighting potential threats in communication flows.
    
-   File: Uncover file-related forensic evidence to pinpoint suspicious file operations or unauthorized access.
    
-   Registry: Examine registry-level insights to detect tampering or malicious configuration changes.
    
-   System Calls: Track low-level system call activities for signs of exploitation or atypical behavior.
    
-   RPC Calls: Analyze RPC (Remote Procedure Call) forensic data to trace unauthorized remote operations.
    

##### All Events table

The All Events table displays up to 100,000 related events for the process node which matches the issue criteria that were not triggered in the issues table, but are informational. The Prevention Actions tab displays the actions Cortex Cloud takes on the endpoint based on the threat type discovered by the agent.

To continue the investigation, you can perform the following actions from the right-click pivot menu:

-   Add <path type> to malware profile allow list from the Process and File table. For example, target_process_path, src_process_path, file_path, or os_parent_path.
    
-   For the behavioral threat protection results, you can take action on the initiator to add it to an allow list or block list, terminate it, or quarantine it.
    
-   Revise the event results to see possible related events near the time of an event using an updated timestamp value to Show rows 30 days prior or 30 days after.
    

**Tip:**

To view statistics for files on VirusTotal, you can pivot from the Initiator MD5 or SHA256 value of the file on the Files tab.

##### Cloud causality view

See the causality of a cloud-type issue—the entire process execution chain that led up to the issue in the Cortex Cloud app.

On the cloud causality view you can analyze and respond to Cortex Cloud issues and cloud audit logs. On this view you can see the causality (cause and effect) of events of the entire process execution chain that led up to the issue. The cloud causality view presents the event identity and /or IP address and the actions performed by the identity on the cloud resource. On each node in the CI chain, Cortex Cloud provides information to help you understand what happened around the event.

The following sections describe the different areas of the cloud causality view:

###### Causality instance chain

Includes the graphical representation of the Causality Instance (CI) along with other information and capabilities to enable you to conduct your analysis.

The view presents a single event CI chain. The CI chain is built from Identity and Resource nodes. The Identity node represents for example keys, service accounts, and users, while the Resource node represents for example network interfaces, storage buckets, or disks. When available, the chain might also include an IP address and issue that were triggered on the Identity and Cloud Resource.

Causality data is displayed as follows:

-   Identity node: Displays the name of the identity, generated issue information, and if available the associated IP address.
    
    To further investigate the user
    
    1.  Hover over an Identity node to display, if available, the identity Analytics Profiles.
        
    2.  Select the Identity node to display in the Entity Data section additional information about the Identity entity.
        
    3.  Select the issue icon to display additional information in the Forensic Highlights section.
        
    
-   IP address node: Displays the IP address associated with the Identity.
    
-   Operations: Lists the type of operations performed by the identity on the cloud resources. Hover over the operation to display the original operation name as provided by the cloud Provider.
    
-   Cloud resource node: Displays the referenced resource on which the operation was performed. For more information about the cloud resources icons, see Key of cloud causality icons.
    
    To further investigate the resource
    
    1.  Hover over a resource node to display, if available, the resource Analytics Profiles and Resource Editors statistics.
        
    2.  Select the resource node to display in the Entity Data section additional information about the resource entity.
        
    

###### Navigation

You can move the chain, extend it, and modify it. To adjust the appearance of the CI chain, use the size controls on the right. You can also move the chain by selecting and dragging it. To return the chain to its original position and size, click  in the lower-right of the CI graph.

###### Information Overview

Summarizes information about the issue you are analyzing, including the type of Cloud Provider, Project, and Region on which the event occurred. Select View Raw Log to view the raw log as provided by the Cloud Provider in JSON format.

###### All Events table

Displays up to 100,000 related events and up to 1,000 related issues. In the All Events table, Cortex Cloud displays detailed information about each of the related events. To simplify your investigation, Cortex Cloud scans your Cortex Cloud data aggregating the events that have the same Identity or Resource and displays the entry with an  aggregated icon. Right-click and select Show Grouped Events to view the aggregated entries.

Entries highlighted in red indicate that the specific event created an issue. To continue the investigation, right-click to View in XQL. To continue the investigation, in the Issues table, right-click an issue to see the available actions.

###### Key of cloud resource icons

The following table lists the cloud resource icons:

| Icon | Type of Resource |
| --- | --- |
|  | Compute instance resource |
|  | Disk resource |
|  | General resource |
|  | Image resource |
|  | Network interface resource |
|  | Security group (FW rule) resource |
|  | Storage bucket resource |
|  | Virtual private cloud (VPC) resource |

##### SaaS causality view

Learn more about the SaaS causality view used to identify and investigate SaaS-specific data associated with SaaS-related issues and SaaS audit logs.

The SaaS causality view provides a powerful way to analyze and investigate software-as-a-service (SaaS) related issues for audit stories, such as Office 365 audit logs and normalized logs, by highlighting the most relevant events and issues associated with a SaaS-related issue. To help you identify and investigate SaaS-specific data associated with SaaS-related issues and SaaS audit logs, Cortex Cloud displays a SaaS causality view, which enables you to swiftly investigate a SaaS issue by displaying the series of events and artifacts that are shared with the issue.

A SaaS causality view is only available when Cortex Cloud is configured to collect SaaS audit logs and data. For example, this is possible by configuring an Office 365 data collector or Google Workspace data collector with the applicable SaaS audit logs. This enables you to investigate any Cortex Cloud issue generated from any IOC, BIOC, or correlation rules, including SaaS events. The SaaS causality view is available from the Issues table, or from the Query Results after running a query on the SaaS related data. From both places, you can right-click to pivot to the SaaS causality view.

The scope of the SaaS causality view is the Causality Instance (CI) of an event to which this issue pertains. The SaaS causality view presents the event identity and /or IP address and the actions performed by the identity on the SaaS resource. On each node in the CI chain, Cortex Cloud provides information to help you understand what happened around the event.

The SaaS causality view contains the following sections:

###### Information Overview

Summarizes information about the issue you are analyzing, including the type of SaaS provider, project, and region on which the event occurred. Select View Raw Log to view the raw log as provided by the SaaS provider in JSON format.

###### SaaS causality instance chain

Includes the graphical representation of the SaaS Causality Instance (CI) along with other information and capabilities to enable you to conduct your analysis.

The SaaS causality view presents a single event CI chain. The CI chain is built from Identity and Resource nodes. The Identity node represents for example keys, service accounts, and users, while the Resource node represents for example network interfaces, storage buckets, or disks. When available, the chain can also include an IP address and issues that were triggered on the Identity and SaaS resource.

-   Identity node: Displays the name of the identity, generated issue information, and if available the associated IP address.
    
    To further investigate the user
    
    1.  Hover over an Identity node to display, if available, the identity Analytics Profiles.
        
    2.  Select the Identity node to display in the Entity Data section additional information about the Identity entity.
        
    3.  Select the issue icon to display additional information in the Forensics Highlights tab.
        
    
-   IP address node: Displays the IP address associated with the Identity.
    
-   Resource node: Displays the referenced resource on which the operation was performed. Cortex Cloud displays information on the following resources.
    
    To further investigate the resource
    
    1.  Hover over a Resource node to display, if available, the resource Analytics Profiles and Resource Editors statistics.
        
    2.  Select the Resource node to display in the Entity Data section additional information about the Resource entity.
        
    

###### Navigation

You can move the chain, extend it, and modify it. To adjust the appearance of the CI chain, use the size controls on the right. You can also move the chain by selecting and dragging it. To return the chain to its original position and size, click  in the lower-right of the CI graph.

###### All Events table

Displays up to 100,000 related events and up to 1,000 related issues. In the All Events table, Cortex Cloud displays detailed information about each of the related events. To simplify your investigation, Cortex Cloud scans your Cortex Cloud data aggregating the events that have the same Identity or Resource and displays the entry with an  aggregated icon. Right-click and select Show Grouped Events to view the aggregated entries.

Entries highlighted in red indicate that the specific event created an issue. To continue the investigation, right-click to View in XQL. To continue the investigation, in the Issues table, right-click an issue to see the available actions.

###### Key of SaaS resources

The following table lists the SaaS resource icons:

| Icon | Type of resource |
| --- | --- |
|  | Google Workspace Admin Console |
|  | Google Workspace for Google Drive |
|  | Microsoft Office 365 Exchange Online |
|  | Microsoft 365 Office Groups |
|  | Microsoft Office 365 OneDrive |
|  | Microsoft Office 365 SharePoint Online |
|  | Microsoft Office 365 Skype for Business |
|  | Microsoft Office 365 Teams |

##### Timeline

From the Cortex Cloud tenant you can view the sequence (or timeline) of events and issues that are involved in any particular threat.

The Timeline provides a forensic timeline of the sequence of events, issues, and informational BIOCs, and correlation rules involved in an attack. While the causality view of an issue surfaces related events and processes that Cortex Cloud identifies as important or interesting, the Timeline displays all related events, issues, and informational BIOCs and correlation rules over time.

**Note:**

The Timeline view is not available when investigating cloud Cortex Cloud issues and cloud audit logs or SaaS-related issues for 501 audit events, such as Office 365 audit logs and normalized logs. Only the applicable cloud causality view and SaaS causality view is available for this data.

The Timeline comprises the following parts:

###### CGO and process instances that are part of the CGO

Cortex Cloud displays the Causality Group Owner (CGO) and the host on which the CGO ran in the top left of the timeline. The CGO is the parent process in the execution chain that Cortex Cloud identified as being responsible for initiating the process tree. In the example above, `wscript.exe` is the CGO and the host it ran on was `HOST488497`. You can also click the blue corner of the CGO to view and filter related processes from the Timeline. This will add or remove the process and related events or issues associated with the process from the Timeline.

###### Timespan

By default, Cortex Cloud displays a 24-hour period from the start of the investigation and displays the start and end time of the CGO at either end of the timescale. You can move the slide bar to the left or right to focus on any time-gap within the timescale. You can also use the time filters above the table to focus on set time periods.

###### Activity

Depending on the type of activities involved in the CI chain of events, the activity section can present any of the following three lanes across the page:

-   Issues: The issue icon indicates when the issue occurred.
    
-   BIOCs and correlation rules: The category of the issue is displayed on the left (for example tampering or lateral movement). Each BIOC event also indicates a color associated with the issue severity. An informational severity can indicate something interesting has happened but there were not any triggered issues. These events are likely benign but are byproducts of the actual issue.
    
-   Event Information: The event types include process execution, outgoing or incoming connections, failed connections, data upload, and data download. Process execution and connections are indicated by a dot. One dot indicates one connection while many dots indicates multiple connections. Uploads and Downloads are indicated by a bar graph that shows the size of the upload and download.
    

The lanes depict when the activity occurred and provide additional statistics that can help you investigate. For BIOC, correlation rules, and issues, the lanes also depict activity nodes, highlighted with their severity color: high (red), medium (yellow), low (blue), or informational (gray), and provide additional information about the activity when you hover over the node.

###### Related events, issues, and informational BIOCs

Cortex Cloud displays up to 100,000 issues, BIOCs and Correlation Rules (triggered and informational), and events. Click on a node in the activity area of the Timeline to filter the results. You also can create filters to search for specific events.

##### Network causality view

The network causality view shows a chain of individual network processes that triggered an issue as part of a particular sequence of operation.

On the network causality view you can analyze and respond to stitched firewall and endpoint issues. On this view you can see the causality (cause and effect) of events of the entire process execution chain that led up to the issue. The network causality view presents the network processes that triggered the issue, generated by Cortex Cloud, Palo Alto Networks next-generation firewalls, and supported sources, such as 3rd party network sources.

On each node in the CI chain, Cortex Cloud provides information to help you understand what happened around the issue. The CI chain visualizes the firewall logs, endpoint files, and network connections that triggered issues connected to a security event.

**Note:**

The network causality view displays only the information it collects from the detectors. It is possible that the CI may not show some of the firewall or agent processes.

The following sections describe the different areas of the network causality view:

###### Causality instance chain

Includes the graphical representation of the Causality Instance (CI) along with other information and capabilities to enable you to conduct your analysis.

The Causality View presents a CI chain for each of the processes and the network connection. The CI chain is built from process nodes, events, and issues. The chain presents the process execution and might also include events that these processes caused and issues that were triggered by the events or processes. The Causality Group Owner (CGO) is displayed on the left side of the chain. The CGO is the process that is responsible for all the other processes, events, and issues in the chain. You need the entire CI to fully understand why the issue occurred.

The color of a process node correlates to the WildFire verdict.

WildFire verdict descriptions

-   Blue: Benign.
    
-   Yellow: Grayware.
    
-   Red: Malware.
    
-   Light gray: Unknown verdict.
    
-   Dark gray: The verdict is inconclusive.
    
    You can view and download the WildFire report in the Entity Data section.
    

###### Navigation

You can move the chain, extend it, and modify it. To adjust the appearance of the CI chain, use the size controls on the right. You can also move the chain by selecting and dragging it. To return the chain to its original position and size, click  in the lower-right of the CI graph.

###### Actions

Hover over a process node to display a Process Information pop-up listing useful information about the process. From any process node, you can also right-click to display additional actions that you can perform during your investigation:

-   **Show parents and children:** If the parent is not presented by default, you can display it. If the process has children, Cortex Cloud opens a dialog displaying the Children Process Start Time, Name, CMD, and Username details.
    
-   **Hide branch:** Hide a branch from the causality view.
    
-   **Add to block list or allow list, terminate, or quarantine a process:** If after investigating the activity in the CI chain, you want to take action on the process, you can select the desired action to allow or block the process across your organization.
    
    In the causality view of a **Detection (Post Detected)** type issue, you can also Terminate process by hash.
    

###### Information Overview

Summarizes information about the issue you are analyzing, including the host name, the process name on which the issue was raised, and the host IP address. For issues raised on endpoint data or activity, this section also displays the endpoint connectivity status and operating system.

###### Host isolation

You can choose to isolate the host, on which the issue was triggered, from the network or initiate a live terminal session to the host to continue investigation and remediation.

###### All Events table

Displays all related events for the process node which match the issue criteria that were not triggered in the issue table but are informational. You can also export the table results to a tab-separated values (TSV) file.

For the Behavioral Threat Protection table, right-click to add to allow list or block list, terminate, and quarantine a process.

**Tip:**

To view statistics for files on VirusTotal, you can pivot from the Initiator MD5 or SHA256 value of the file on the Files tab.

##### Causality icons key
The following tables describe the causality chain icons, broken down by type:

###### Action icons

Causality action icons mark the actions that were taken on a process or event. Pending actions are shown with a dotted line.

| Icon | Description |
| --- | --- |
|   | Blocklist |
|   | Quarantine |
|   | Allowlist |

###### Causality alert icons

Causality alert icons indicate the type of alert that was triggered.

| Icon | Description |
| --- | --- |
|  | 3rd party |
|  | XDR Agent |
|  | Analytics |
|  | BIOC |
|  | Firewall |
|  | General alert |
|  | Identity analytics |
|  | IOC |

Example 43. 

A number next to the alert icon indicates that there are multiple alerts. This icon show that there are three alerts and the selected alert is a BIOC alert. You can scroll through the alerts in the Information Overview.

  

###### Cloud event icons

Cloud event icons indicate the type of cloud event or process.

| Icon | Description |
| --- | --- |
|  | Cloud admin |
|  | Compute disks |
|  | Compute instances |
|  | Container escaped |
|  | Drive |
|  | Exchange |
|  | General resource |
|  | Groups |
|  | Images |
|  | Network |
|  | Onedrive |
|  | Security groups- FW rules |
|  | Sharepoint |
|  | Skype |
|  | Storage buckets |
|  | Subnets |
|  | Teams |
|  | VPCs |

###### Event icons

Event icons indicate the type of activity that occurred.

| Icon | Description |
| --- | --- |
|  | DotNet |
|  | Event log |
|  | File |
|  | Firewall |
|  | Host |
|  | Host group |
|  | Identity analytics |
|  | Internet |
|  | Malware |
|  | Mobile |
|  | Module load |
|  | Multi-user |
|  | Network |
|  | Potential prevention |
|  | Range |
|  | Registry |
|  | TCP Protocol |
|  | Server |
|  | Unknown event |
|  | User session |
|  | VOIP |
|  | VPN |

###### Left node icons

Left node icons provide additional information about a process.

| Icon | Description |
| --- | --- |
|  | Injected node |
|  | Last actor |
|  | Remote terminal session |
|  | RPC |
|  | Unknown process |

###### Node icons

Node icons indicate the type of process or event that occurred in the chain.

| Icon | Description |
| --- | --- |
|  | Adobe |
|  | Attachment |
|  | Chrome |
|  | Remote IP Address |
|  | Email |
|  | Endpoint |
|  | Excel |
|  | Firefox |
|  | Generic process |
|  | Internet Explorer |
|  | IP address |
|  | Link |
|  | mySQL |
|  | Outlook |
|  | Powerpoint |
|  | Putty |
|  | Sender |
|  | Unknown |
|  | User |
|  | Word |

###### Other icons

| Icons | Description |
| --- | --- |
|  | Benign |
|  | Container |
|  | Causality Group Owner (CGO). |
|  | Default |
|  | Grayware |
|  | In-evaluation |
|  | Malware |
|  | Quarantine |
|  | Still running |
|  | Unknown sample |
|  | User |
|  | WF download |
|  | WF download unsuccessful |

###### Examples

Example 44.  

The following example shows a XDR Agent alert was triggered on a File.

  

Example 45.  

In this example, a NGFW alert was triggered on a TCP Protocol that called a remote IP address, that created an unknown process.

  

Example 46.  

In this example, the highlighted process node represents the real parent that executed the process. Click on the node for more details about the parent process. The pen icon on the first process nodes indicates that this process is "last actor". The syringe icon on the last process node indicates that this process is an "injected node".

  

Example 47.  

In this example, two alerts were triggered on an email that was sent to two recipients and included attachments and links.

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

##### Create profile exceptions

You can create profile exceptions for agent related issues.

For Cortex XDR agent related issues, you can create profile exceptions for Window processes, BTP, and JAVA deserialization issues directly from the Issues table.

1.  Identify an XDR Agent issue which has a category of Exploit, right-click and select Manage Issue+Create issue exception.
    
2.  Select an Exception Scope:
    
    -   Global: Apply the exception across your organization.
        
    -   Profile: Apply the exception to an existing profile or click and enter a Profile Name to create a new profile.
        
    
3.  Click Add to add the scope.
    
4.  (Optional) View your profile exceptions.
    
    1.  Go to Inventory+Endpoints → Policy Management → Profiles.
        
    2.  In the Profiles table, locate the OS in which you created your global or profile exception and right-click to view or edit the exception properties.

##### Investigate contributing events

You can investigate the events created by an issue.

When investigating an issue generated by a correlation rule, you can view all of the events created for the issue. You can have up to 1000 events per correlation rule.

In addition, if the correlation rule includes a drilldown query you can run the query in the Query Builder. The drilldown query provides additional information about an issue for further investigation.

How to investigate contributing events

1.  From the Issues table, locate an issue created by a correlation rule.
    
2.  Right-click the row, and select Manage Issue → Investigate Contributing Events.
    
3.  (Optional) Open the drilldown query, if available.
    
    Right-click the row and select Manage Issue → Open Drilldown Query.
    
    The drilldown query can accept parameters from the issue output for the correlation rule. In addition, the issue time frame used to run the drilldown query provides more details about the issue generated by the correlation rule. The time frame is the minimum and maximum timestamps of the events for the issue. If there is only one event, the event timestamp is the time frame used for the query.

##### Create a featured field

You can label specific issue attributes as featured fields.

To help you to track issues involving specific hosts, users, and IP addresses, you can label specific issue attributes as featured fields. Issues that contain a matching featured field value are identified with a  flag in the Name field of the Issues table. After setting up featured fields, you can use them filter the Issues table and to create case scoring rules.

**Note:**

Featured Active Directory values are displayed in the User and Host fields accordingly.

How to create a featured field

1.  Go to Cases & Issues → Case Configuration → Featured Fields and select a type of featured field.
    
2.  Click Add featured <field-type> and select one of the following options:
    
    -   Create New
        
        To create a new featured field from scratch, enter one or more field-type values and click Add.
        
    -   Upload from File
        
        To upload field values from a CSV file, upload your file and click Import. Click Download example file to ensure you are using the correct format.
        
    
3.  Find issues containing featured fields.
    
    In the Issues table, use the Contains Featured filters.
    
4.  (Optional) Create a case scoring rule using the Contains Featured fields to further highlight and prioritize issues containing the Host, User, and IP address attributes. For more information, see [???](urn:resource:component:1159841).

##### View generating BIOC or IOC rule

You can view the BIOC or IOC rules that generated issues directly from the Issues table.

You can easily view and edit the BIOC and IOC rules that generated issues directly from the Issues table:

1.  From the Issues page, locate issues with Detection methods: XDR BIOC and XDR IOC.
    
2.  Right-click the row, and select Manage Issue → View generating rule.
    
    Cortex Cloud opens the BIOC rule that generated the issue in the BIOC Rules page. If the rule has been deleted, an empty table is displayed.
    
3.  Review the rule, if necessary, right-click to perform available actions.

##### Add a file path to a malware profile allow list

You can add a file path to an existing malware profile.

During investigation, if you deem a file path to be safe, you can add the file path to an existing malware profile allow list directly from the Issues table.

1.  In the Issues table, select the Initiator Path, CGO path, and/or File Path field values you want to add to your malware profile allow list.
    
2.  Right-click and select Add <path type> to malware profile allow list.
    
3.  In the Add <path type> to malware profile allow list dialog, select from your existing Profiles and Modules to which you want to add the file path to the allow list.
    
4.  (Optional) View your Malware profile allow list.
    
    1.  Go to Inventory+Endpoints → Policy Management → Prevention → Profiles and locate the malware profile you selected.
        
    2.  Right-click, select Edit Profile and locate in the Files / Folders in Allow List section the path file you added.
        

For more information about malware prevention profiles, see Set up malware prevention profiles.Set up malware prevention profiles

##### Retrieve additional issue details

Access additional information relating to an issue, including related files and memory content analysis.

To help you with issue analysis, Cortex Cloud can provide related files and memory content analysis.

1.  From the Issues page, locate the issue for which you want to retrieve information.
    
2.  Right-click anywhere in the issue, and select one of the following options:
    
    -   Retrieve Additional Data: Cortex Cloud can provide related files and additional analysis of the memory contents when an exploit protection module raises an issue.
        
        -   Select Retrieve issue data and analyze to retrieve issue data consisting of the memory contents at the time the issue was raised. You can also enable Cortex Cloud to automatically retrieve issue data for every relevant issue. After Cortex Cloud receives the data and performs the analysis, it issues a verdict for the issue. You can monitor the retrieval and analysis progress from the Action Center (pivot to view Additional data). When the analysis is complete, it displays the verdict in the **Advanced Analysis** field.
            
        -   Retrieve related files: To further examine files that are involved in an issue, you can request the agent send them to the Cortex Cloud tenant. If multiple files are involved, the tenant supports up to 20 files and 200MB in total size. The agent collects all requested files into one archive and includes a log in JSON format containing additional status information. When the files are successfully uploaded, you can download them from the Action Center for up to one week.
            
        -   Pivot to views → View in source system: For issues ingested from third-party vendors, this option pivots to the issue in the third-party system.
            
            To enable this feature, ensure that Cortex Cloud has a correlation rule that contains the External URL field. For more information, refer to Create a correlation rule.
            
        
    -   (For PAN NGFW source type issues) Download triggering packet: Download the session PCAP containing the first 100 bytes of the triggering packet directly from Cortex Cloud. To access the PCAP, you can download the file from the Issues table, Cases, or Causality view.
        
    
3.  Navigate to Investigation & Response+Response → Action Center to view the retrieval status.
    
4.  Download the retrieved files locally.
    
    In the Action Center, wait for the data retrieval action to complete successfully. Then, right-click the action row and select Additional Data. From the Detailed Results view, right-click the row and select Download Files. A ZIP folder with the retrieved data is downloaded locally.
    
    **Tip:**
    
    If you require assistance from Palo Alto Networks support to investigate the issue, make sure to provide the downloaded ZIP file.

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

### Investigate endpoints

You can investigate and take actions on your endpoints in the Action Center.

You can investigate and take actions on your endpoints in the Action Center.

#### Overview of the Action Center

From the Action Center, you can track the progress of all investigation, response, and maintenance actions performed on your endpoints.

The Action Center is a central location from which you can track the progress of all investigation, response, and maintenance actions performed on your Cortex Cloud protected endpoints. To access the Action Center, go to Investigation & Response → Response → Action Center.

The main All Actions tab displays the most recent actions initiated in your deployment. To narrow down the results, use the table filters. You can also choose from the filtered Action Center views to see details of the following actions:

-   File Quarantine: View details about quarantined files on your endpoints. You can also switch to an Aggregated by SHA256 view that collapses results per file and lists the affected endpoints in the Scope field.
    
-   Block List and Allow List: View files that are permitted and blocked from running on your endpoints regardless of file verdict.
    
    **Note:**
    
    Blocking files on endpoints is enforced by the endpoint malware profile. To block a hash value, ensure the hash value is configured in the Malware security profile.
    
    Select Override Report mode to allow the agent to block hashes, even if the Malware Profile is set to Report.
    
-   Endpoint Isolation: View the endpoints in your organization that have been isolated from the network. For more information, see Isolate an endpoint.Isolate an endpoint
    
-   External Dynamic List: View the list of IP addresses and domain names in your EDL. For more information, see Manage external dynamic lists.Manage external dynamic lists
    
-   Endpoint Blocked IP Addresses: View remote IP addresses that the Cortex XDR agent has automatically blocked from communicating with endpoints in your network.
    
-   Agent Scripts Library: View Palo Alto Networks and administrator-uploaded scripts that you can run on your endpoints.
    

For actions that can take a while to complete, the Action Center tracks the action progress and displays the action status and current progress description for each stage. For example, after initiating an agent upgrade action, Cortex Cloud monitors all stages from the Pending request until the action status is Completed. Throughout the action lifetime, you can view the number of endpoints on which the action was successful and the number of endpoints on which the action failed. After a period of 90 days since the action creation, the action is removed from Cortex Cloud and is no longer displayed in the Action Center. You cannot delete actions manually.

##### Initiate and monitor endpoint actions

Take these steps to initiate and monitor actions on your endpoints.

In the Action Center you can initiate and monitor actions on your endpoints. In addition, you can initiate endpoint actions when viewing details about an endpoint on the All Endpoints page.

###### Initiate an endpoint action from the Action Center

Create new administrative actions using the Action Center wizard:

1.  Go to Investigation & Response → Response → Action Center → New Action.
    
2.  Select the action you want to initiate and follow the required steps and parameters you need to define for each action.
    
    Cortex Cloud displays only the endpoints eligible for the action you want to perform.
    
3.  Review the action summary and click Done.
    
    Cortex Cloud will inform you if any of the agents in your action scope will be skipped.
    
4.  Track your action.
    
    Track the new action in the Action Center. The action status is updated according to the action progress.
    

###### Monitor endpoint actions

1.  Go to Investigation & Response → Response → Action Center.
    
2.  Select the relevant view from the left-side menu on the Action Center page.
    
3.  Use the table filters to filter the results.
    
4.  Take further actions. Right-click the action to see the available options:
    
    -   **Additional data:** Display additional details for the action, such as file paths for quarantined files or operating systems for agent upgrades. For actions with Status, Failed or Completed with partial success, you can create an upgrade action to rerun the action on endpoints that have not been completed successfully.
        
    -   **Archive:** Archive the action for future reference. You can select multiple actions to archive at the same time.
        
    -   **Cancel for Pending endpoints:** Cancel the original action for agents that are still in `Pending` status.
        
    -   **Download output:** Download a zip file with the files received from the endpoint for actions such as file and data retrieval.
        
    -   **Rerun:** Launch the Define an Action wizard populated with the same details as the original action.
        
    -   **Run on additional agents:** Launch the action wizard populated with the details as the original action except for the agents which you have to fill in.
        
    -   **Restore:** Restore quarantined files.

##### Action Center reference information

See descriptions of the fields in the Action Center.

The following table describes both the default and additional optional fields that you can view from the All Actions tab of the Action Center and lists the fields in alphabetical order.

Read more...

| Field | Description |
| --- | --- |
| Action Type | Type of action initiated on the endpoint. |
| Agent Restart | Status of the restart action on the endpoint. Statuses: In progress: Action initiated, but no start indication from agent after stop.; Failed: Agent reports failed back to the Cortex Cloud server if it was started after more than 10 minutes after restart initiation.; Expired: After 4 days.; Success: Agent reports success to the Cortex Cloud server if it was started within 10 minutes after restart initiation. |
| Created By | Name of the user who initiated the action. |
| Creation Timestamp | Date and time the action was created. |
| Description | Action scope of affected endpoints and additional data relevant to each of the specific actions, such as agent version, file path, and file hash. |
| Expiration Date | Time the action will expire. To set an expiration date, the action must apply to one or more endpoints. By default, Cortex Cloud assigns a 30-day expiration limit to the following actions: Agent Uninstall; Agent Upgrade; Files Retrieval; Isolate; Cancel Endpoint Isolation Additional actions such as malware scans, quarantine, and endpoint data retrieval are assigned a 4-day expiration limit. After the expiration limit, the status for any remaining Pending actions on endpoints change to Expired and these endpoints will not perform the action. |
| Status | Current status of the action. |
| Additional data: If additional details are available for an action or for specific endpoints, you can pivot to the Additional data view. You can also export the additional data to a TSV file. The page can include details in the following fields but varies depending on the type of action. |
| Endpoint Name | Target host name of each endpoint for which an action was initiated. |
| IP Addresses | IP address associated with the endpoint. |
| Status | Status of the action for the specific endpoint. (Linux)—Completed with Partial Success for a single endpoint that did not complete the action successfully. |
| Action Last Update | Time at which the last status update occurred for the action. |
| Advanced Analysis | For Retrieve issue data requests related to Cortex Cloud issues triggered by exploit protection modules, Cortex Cloud can analyze the memory state for additional verdict verification. This field displays the analysis progress and resulting verdict. |
| Action Parameters | Summary of the action including the issue name and ID. |
| Additional Data | Malicious Files | Additional data, if any is available, for the action. For malware scans, this field is titled Malicious Files and indicates the number of malicious files identified during the scan. |

#### Manage endpoints

You can view and take actions on endpoints on the All Endpoints page.

The All Endpoints page provides a central location from which you can view and manage the endpoints on which the agent is installed. To access the All Endpoints page, go to Inventory → Endpoints → All Endpoints.

To ensure the All Endpoints table is displaying the most accurate list of endpoints, you can perform a one-time or periodic cleanup of duplicated entities. After the cleanup, duplicated entities are removed leaving only one endpoint entry, which is the last endpoint to connect with the server. Deleted endpoint data is retained for 90 days from the last connection timestamp. If a deleted endpoint reconnects, Cortex Cloud recovers and redisplays the endpoint’s existing data.

Go to Settings → Configurations → General → Agent Configurations → Endpoint Administration Cleanup. Enable the Periodic duplicate cleanup and select either One-time cleanup or define a periodic cleanup to run according to the Host Name, Host IP Address, and/or MAC Address fields at a specific time interval.

##### Endpoint actions

The right-click pivot menu displays the actions you can perform on your endpoints. For more information about these actions, see the topics in this section, and the topics under Manage endpoint protection.

**Note:**

For the Include endpoints from auto upgrade action, you cannot enable auto upgrade for Mobile, VDI, and TS installations.

##### All Endpoints reference information

The following table describes both the default and additional optional fields that you can view in the All Endpoints table and lists. Clicking on a row in the All Endpoints table opens a detailed view of the endpoint.

| Field | Description |
| --- | --- |
| Active Directory | Active Directory Groups and Organizational Units to which the user belongs. |
| Assigned Extensions Policy | Policy related to extensions and devices connected to the endpoint. |
| Assigned Prevention Policy | Policy assigned to the endpoint. |
| Agent Version | Agent version that is installed on the endpoint. |
| Auto Upgrade Status | When Cortex XDR agent auto upgrades are enabled, this field indicates the action status. \*\*Note:\*\* If an endpoint is excluded, the auto upgrade profile configuration is not available. If you exclude the endpoint from auto upgrade while the auto upgrade action is In progress, the ongoing upgrade will still take place. |
| Cloud Account ID | Unique identifier for the cloud account that owns or manages the workload. |
| Cloud Info | IBM and Alibaba Cloud metadata reported by the workload. |
| Cloud Instance ID | (Agent 8.9 and later) Unique identifier for the cloud instance hosting the workload. |
| Cloud Provider | (Agent 8.9 and later) Cloud service provider hosting the workload. |
| Cloud Region | (Agent 8.9 and later) Geographical region of the cloud infrastructure where the workload is hosted. |
| Cluster Name | (Agent 8.9 and later) Cluster name to which the workload belongs. |
| Content Auto Update | Whether automatic content updates are Enabled or Disabled for the endpoint in the agent settings profile. |
| Content Release Timestamp | Time and date of when the current content version was released. |
| Content Rollout Delay (days) | If you configured delayed content rollout, the number of days for delay is displayed here. |
| Content Status | Status of the content version on the relevant endpoint. The Cortex Cloud tenant attempts to contact an endpoint and check the content version over a 7-day period. After this period the tenant displays one of the following statuses: Up to Date: The endpoint is running with the latest content version; Waiting for Update: Cortex Cloud is in the process of updating the new content version. Depending on your bandwidth and network connection, updating the content version may take time.; Outdated: The endpoint is running on an outdated content version.; Offline: The endpoint is disconnected. \*\*Note:\*\* Content Status is calculated every 30 minutes. Therefore, there might be a delay of up to 30 minutes in displaying the data. |
| Content Version | Content update version used with the agent. |
| Disabled Capabilities | List of capabilities that were disabled on the endpoint. Options are Live Terminal, Script Execution, and File Retrieval. You can disable these capabilities during agent installation on the endpoint or through Endpoint Administration. Disabling any of these actions is irreversible. If you later want to enable the action on the endpoint, you must uninstall the agent and install a new package on the endpoint. |
| Domain | Domain or workgroup to which the endpoint belongs. \*\*Note:\*\* Only supported for Windows and macOS. |
| Endpoint Alias | If you assigned an alias to represent the endpoint in Cortex Cloud, the alias is displayed here. To set an endpoint alias, right-click in the endpoint row, select Endpoint Control → Change Endpoint Alias. The alias can contain any of the following characters: `a-Z, 0-9, !@#$%^&:()-'{}~_.` |
| Endpoint ID | Unique ID that identifies the endpoint. |
| Endpoint Isolated | Isolation status, either: Isolated: The endpoint has been isolated from the network with communication permitted to only Cortex Cloud and to any IP addresses and processes included in the allow list.; Not Isolated: Normal network communication is permitted on the endpoint.; Pending Isolation: The isolation action has reached the server and is pending contact with the endpoint.; Pending Isolation Cancellation: The cancel isolation action has reached the server and is pending contact with the endpoint. |
| Endpoint Name | Hostname of the endpoint. If the agent enables Pro features, this field also includes a PRO badge. For Android endpoints, the hostname comprises the <`firstname`\>`—`<`lastname`\> of the registered user, with a separating dash. |
| Endpoint Status | Registration status of the agent on the endpoint: Connected: The agent has checked in within 10 minutes for standard endpoints, and within 3 hours for mobile endpoints.; Connection Lost: The agent has not checked in within 30 to 180 days for standard endpoints, and between 90 minutes and 6 hours for VDI and temporary sessions.; Disconnected: The agent has not checked in within the defined inactivity window: between 10 minutes and 30 days for standard and mobile endpoints, and between 10 minutes and 90 minutes for VDI and temporary sessions.; VDI Pending Log-on: (Windows only) Indicates a non-persistent VDI endpoint is waiting for user logon, after which the agent consumes a license and starts enforcing protection.; Uninstalled: The agent has been uninstalled from the endpoint. |
| Endpoint Type | Type of endpoint. |
| Endpoint Version | Versions of the agent that runs on the endpoint. |
| First Seen | Date and time the agent first checked in (registered) with Cortex Cloud. |
| Golden Image ID | For endpoints with a System Type of Golden Image, the image ID is a unique identifier for the golden image. |
| Group Names | Endpoint Groups to which the endpoint is a member, if applicable. |
| Incompatibility Mode | Agent incompatibility status, either: Agent Incompatible: The agent is incompatible with the environment and cannot recover.; OS Incompatible: The agent is incompatible with the operating system. When agents are compatible with the operating system and environment, this field is blank. |
| Isolation Date | Date and time of when the endpoint was Isolated. Displayed only for endpoints in Isolated or Pending Isolation Cancellation status. |
| Install Date | Date and time at which the agent was first installed on the endpoint. |
| Installation Package | Installation package name used to install the agent. |
| Installation Type | Type of installation. |
| IP Address | Last known IPv4 address of the endpoint. |
| IPv6 Address | Last known IPv6 address of the endpoint. |
| Is EDR Enabled | Whether EDR data is enabled on the endpoint. |
| Last Certificate Enforcement Fallback | (For Windows and MacOS Endpoints) If Certificate Enforcement is Enabled, this column shows the date and time of use of a fallback certificate from the local store. If no fallback is used, this will remain empty. |
| Last Content Update Time | Time and date when the agent last deployed a content update. |
| Last Origin IP | Last IPv4 address from which the XDR agent connected. |
| Last Origin IPv6 | Last IPv6 address from which the XDR agent connected. |
| Last Scan | Date and time of the last malware scan on endpoint. |
| Last Seen | Date and time of the last change in an agent's status. This can occur when Cortex Cloud receives a periodic status report from the agent (once an hour), a user performed a manual Check In, or a security event occurred. \*\*Note:\*\* Changes to the agent status can take up to ten minutes to display on Cortex Cloud . |
| Last Used Proxy | IP address and port number of proxy that was last used for communication between the agent and Cortex Cloud. |
| Last Used Proxy Port | Last proxy port used on endpoint. |
| Linux Operation Mode | (Agent 7.7 and later for Linux) Type of operation mode your Linux endpoint is running by the agent. |
| Last Upgrade Failure Reason | Reason an upgrade failed. |
| Last Upgrade Source | Source of the upgrade installation file. |
| Last Upgrade Status | Status of the last upgrade. |
| Last Upgrade Status Time | Date and time of the last upgrade. |
| MAC Address | Endpoint MAC address that corresponds to the IP address. Currently, this information is available only for IPv4 addresses. |
| Mobile ID | Unique identifier of the agent located on an Android or iOS mobile. |
| Network Interface   | Relationship between the MAC address and the IP address for agents that can report the network interfaces information. Information is displayed in JSON format, and searches can be performed on attributes in JSON. |
| Network Location | (Agent 7.1 and later for Windows and agent 7.2 and later for macOS and Linux) Endpoint location is reported by the agent when you enable this capability in the Agent Settings profile. |
| Operating System | Name of the operating system. |
| Operational Status | Cortex XDR agent operational status: **Protected:** The agent is running as configured and did not report any exceptions.; **Partially protected:** The agent reported one or more exceptions. Clicking on the row shows in the detailed view why an endpoint may be partially protected.; **Unprotected:** The Cortex XDR agent was shut down. |
| OS Description | Operating system version name. |
| OS Type | Name of the operating system. |
| OS Version | Operating system version number. |
| Platform | Platform architecture. |
| Proxy | IP address and port number of the configured proxy server. |
| Scan Status | Malware scan status. |
| Managed Device | Whether an iOS device has a corporate profile installed on it and is to some extent controlled and managed by the corporation. |
| Tags | Tags associated with the endpoint. Tags created in the agent are displayed with a shield icon. |
| User | User that was last logged into the endpoint. On Android endpoints, the Cortex Cloud tenant identifies the user from the email prefix specified during app activation. |

#### Retrieve files from an endpoint

You can retrieve files from one or more endpoints by initiating a files retrieval request.

During an investigation, you can retrieve files from one or more endpoints by initiating a files retrieval request. For each file retrieval request, Cortex Cloud supports up to:

-   20 files
    
-   500MB in total size
    
-   10 different endpoints
    

The request instructs the agent to locate the files on the endpoint and upload them to Cortex Cloud. The agent collects all requested files into one archive and includes a log in JSON format containing additional status information. When the files are successfully uploaded, you can download them from the Action Center.

How to retrieve files from an endpoint

1.  Go to Investigation & Response → Response → Action Center → New Action.
    
2.  Select Files Retrieval.
    
3.  Select the operating system and enter the paths for the files you want to retrieve. Press **ADD** after each completed path.
    
    **Note:**
    
    You cannot define a path using environment variables on Mac and Linux endpoints.
    
4.  Click Next.
    
5.  Select the target endpoints (up to 10) from which you want to retrieve files and click Next.
    
6.  Review the action summary and click Done.
    
    To track the status of a file retrieval action, return to the Action Center. Cortex Cloud retains retrieved files for up to 30 days.
    
    If at any time you need to cancel the action, right-click, and select Cancel for pending endpoint. You can cancel the retrieval action only if the endpoint is still in Pending status and no files have been retrieved from it yet. The cancellation does not affect endpoints that are already in the process of retrieving files.
    
7.  To view additional data and download the retrieved files, right-click the action and select Additional data.
    
    This view displays all endpoints from which files are being retrieved, including their IP Address, Status, and Additional Data such as error messages of names of files that were not retrieved.
    
8.  When the action status is Completed Successfully, right-click the action and download the retrieved files logs.
    
    **Note:**
    
    If the Password Protection (for downloaded files) setting under Settings → Configuration → General → Server Settings is enabled, enter the password 'suspicious' to download the file.
    

##### Disable file retrieval

If you want to prevent Cortex Cloud from retrieving files from an endpoint running the agent, you can disable this capability during agent installation or later on from the All Endpoints page. Disabling script execution is irreversible. If you later want to re-enable this capability on the endpoint, you must re-install the agent. See the XDR agent administrator’s guide for more information.

**Note:**

Disabling File Retrieval does not take effect on file retrieval actions that are in progress.

#### Retrieve support logs from an endpoint

Retrieve support logs from an endpoint when additional forensic data is needed.

When you need to investigate or share additional forensic data, you can initiate a request to retrieve all the support logs and issue data dump files from an endpoint. After Cortex Cloud receives the logs, you can download the log files or generate a secured link to access them on the Cortex Cloud server.

How to retrieve support files

1.  Retrieve support files.
    
    1.  Go to Investigation & Response → Response → Action Center → \+ New Action.
        
    2.  Select Retrieve Support File and click Next.
        
    3.  Select the target endpoints (up to 10) from which you want to retrieve logs and click Next.
        
    4.  Review the action summary and click Done.
        
        In the next heartbeat, the agent will retrieve the request to package and send all logs to Cortex Cloud .
        
    
    You can also retrieve support files from the All Endpoints table by right-clicking and selecting Endpoint Control → Retrieve Support File.
    
2.  In the Action Center, locate your Support File Retrieval action type and wait for the Status field to display Completed Successfully.
    
    If you need to cancel the action, you can right-click it and select Cancel for pending endpoint. You can cancel the retrieval action only if the endpoint is still in `Pending` status and no files have been retrieved from it yet. The cancellation does not affect endpoints that are already in the process of retrieving files.
    
3.  When the status is Completed Successfully, right-click and select Additional data.
    
    In the Actions table, you can see the endpoints from which support files were retrieved.
    
4.  Select an endpoint, right-click and select either Download files or Generate support file link.
    
    Cortex Cloud retains retrieved files for up to 30 days.
    
    The secured link is valid for only 7 days. Following the 7 day period, in order to access the files, you will need to initiate a new support file link.
    
    To open the file you will need the support file password. For more information, see Retrieve support file password.

#### Scan an endpoint for malware

The agent can scan your Windows and Mac endpoints and attached removable drives for dormant malware that is not actively attempting to run.

In addition to blocking the execution of malware, the Cortex XDR agent can scan your Windows, Mac and Linux endpoints and attached removable drives for dormant malware that is not actively attempting to run. The agent examines the files on the endpoint according to the Malware Security Profile that is in effect on the endpoint (quarantine settings, unknown file upload, etc.) When a malicious file is detected during the scan, the agent reports the malware to Cortex Cloud so you can manually take action to remove the malware before it is triggered and attempts to harm the endpoint.

You can scan the endpoint in the following ways:

-   **System scan:** Initiate a full system scan on demand from Endpoints Administration for an endpoint, as explained in the following procedure.
    
-   **Periodic scan:** Configure periodic full scans that run on the endpoint as part of the malware security profile. To configure periodic scans, see Set up malware prevention profiles.
    
-   **Custom scan:** (Windows, requires agent v7.1 or later) The end user can initiate a scan on demand to examine a specific file or folder. For more information, see the Cortex XDR Agent Administrator's Guide for Windows.
    

##### Initiate a full system scan

You can initiate full scans of one or more endpoints from the All Endpoints table or the Action Center. After initiating a scan, you can monitor the scan progress in the Action Center. Scan time varies depending on the number of endpoints, connectivity to those endpoints, and the number of files for which Cortex Cloud needs to obtain verdicts.

1.  Select Investigation & Response → Response → Action Center → New Action.
    
2.  Select Malware Scan.
    
3.  Click Next.
    
4.  Select the target endpoints (up to 100) on which you want to scan for malware.
    
    Scanning is available on Windows, Mac and Linux endpoints. Cortex Cloud automatically filters out any endpoints for which scanning is not supported. Scanning is also not available for inactive endpoints.
    
5.  Click Next.
    
6.  Review the action summary and click Done. Cortex Cloud initiates the action at the next heartbeat and sends the request to the agent to initiate a malware scan.
    
7.  To track the status of a scan, return to the Action Center.
    
    When the status is Completed Successfully, you can view the scan results.
    
8.  View the scan results.
    
    After an agent completes a scan, it reports the results to Cortex Cloud. To view the scan results for an endpoint:
    
    1.  In the Action Center, right-click the scan action and select Additional data.
        
        Cortex Cloud displays additional details about the endpoint.
        
    2.  Right-click the endpoint for which you want to view the scan results and select View related security events.
        
        Cortex Cloud displays a filtered list of malware issues for files that were detected on the endpoint during the scan.

### Investigate files
You can take actions to manage and investigate files, including:

-   Manage file execution on your endpoints by adding file hashes to your allow and block lists.
    
-   Quarantine files and manage the files automatically quarantined by Cortex Cloud.
    
-   Review the file verdict and the WildFire Analysis Report for a file.
    
-   Import hashes from the Endpoint Security Manager or from external feeds.

#### Manage file execution

Set rules for the execution (or running) of particular files on your endpoints in Cortex Cloud.

You can manage file execution on your endpoints by adding file hashes to your allow and block lists. If you trust a certain file and know it to be benign, you can add the file hash to the allow list. This allows the file to be executed on all your endpoints regardless of the WildFire or local analysis verdict. Similarly, if you want to always block a file from running on your endpoints, you can add the associated hash to the block list.

Adding files to the allow and block lists takes precedence over any other policy rules that are applied to these files. In the Action Center, you can monitor the allow and block list actions performed in your network, and add or remove files from these lists.

Supported file types are:

| Operating system | Supported file types |
| --- | --- |
| Windows | PE, PE64; doc, docx, xls, xlsx (only if they contain macro files); PS1 |
| Mac | macho, DMG |
| Linux | ELF |

How to add a file to the allow or block list or allow list

1.  Go to Investigation & Response → Response → Action Center → New Action.
    
2.  Select Add to Block List or Add to Allow List.
    
3.  Enter the SHA-256 hash of the file and click →.
    
    You can add up to 100 file hashes at one time. If you add a comment, it is added to all the hashes you added in this action.
    
4.  Click Next.
    
5.  Review the summary and click Done.
    
    In the next heartbeat, the agent retrieves the updated lists from Cortex Cloud.
    
6.  You are automatically redirected to the Block List or Allow List that corresponds to the action in the Action Center.
    
7.  To manage the file hashes on the Block List or the Allow List, right-click a file to see the available actions.

#### Manage quarantined files

You can review and manage all files that have been quarantined by the agent due to a security case.

When the agent detects malware on a Windows endpoint, you can take additional precautions to quarantine the file. When the agent quarantines malware, it moves the file from the location on a local or removable drive to a local quarantine folder (`%PROGRAMDATA%\Cyvera\Quarantine`) where it isolates the file. This prevents the file from attempting to run again from the same path or causing any harm to your endpoints.

To evaluate whether an executable file is considered malicious, the agent calculates a verdict using information from the following sources in order of priority:

-   Hash exception policy
    
-   WildFire threat intelligence
    
-   Local analysis
    

##### How to quarantine a file

You can quarantine a file in the following ways:

-   Enable the agent to automatically quarantine malicious executables by configuring quarantine settings in a Malware prevention profile. For more information, see Set up malware prevention profiles.Set up malware prevention profiles
    
-   Right-click a specific file from the causality view and select Quarantine. For more information, see [???](urn:resource:component:1159449).
    

##### View and manage quarantined files

1.  To view the quarantined files in your network, go to Investigation & Response → Response → Action Center → File Quarantine.
    
    Toggle between the Detailed and Aggregated By SHA256 tabs to see information on your quarantined files.
    
2.  Review details about quarantined files.
    
    In the Detailed view, filter and review the Endpoint Name, Domain, File Path, Quarantine Source, and Quarantine Date of all the quarantined files. You can take the following actions:
    
    -   Reinstate a quarantined file: Right-click one or more rows and select Restore all files by SHA256.
        
        **Note:**
        
        This will restore all files with the same hash on all of your endpoints.
        
    -   Review the quarantined file inspection results on VirusTotal: Right-click the Hash field and select Open in VirusTotal.
        
    -   Drill down on the hash value: Right-click the Hash field and select Open Hash View. You can see each of the process executions, file operations, cases, actions, and threat intelligence reports relating to the hash value.
        
    -   Search for where the hash value appears in Cortex Cloud: Right-click the Hash field and select Open in Quick Launcher.
        
    -   Export to file: Click the icon on the top right corner to download a detailed list of the quarantined hashes in a TSV format.
        
    
3.  In the Aggregated by SHA256 view, filter and review the Hash, File Name, File Path, and Scope of all the quarantined files. You can take the following actions:
    
    -   Open the Quarantine Details page: Right-click a row and select Additional Data to open the page detailing the Endpoint Name, Domain, File Path, Quarantine Source, and Quarantine Date of a specific file hash.
        
    -   Reinstate a file hash: Right-click and select Restore.
        
    -   Permanently delete quarantined files on the endpoint: Right-click and select Delete all files by SHA256.

#### Review WildFire analysis details

For each file, Cortex Cloud receives a file verdict and the WildFire Analysis Report detailing additional information you can use to assess the nature of a file.

For each file, Cortex Cloud receives a file verdict and the [WildFire Analysis Report](https://docs.paloaltonetworks.com/wildfire/9-1/wildfire-admin/monitor-wildfire-activity/wildfire-analysis-reportsclose-up). This report contains detailed sample information and behavior analysis in different sandbox environments, leading to the WildFire verdict. You can use the report to assess whether the file poses a real threat on an endpoint. The details in the WildFire analysis report for each event vary depending on the file type and the behavior of the file.

Drill down into WildFire analysis details

WildFire analysis details are available for files that receive a WildFire verdict. The Analysis Reports section includes the WildFire analysis for each testing environment based on the observed behavior for the file.

1.  Open the WildFire report.
    
    If you are investigating a case in the case detail view you can see artifact details on the Key Assets & Artifacts tab. Under Artifacts, identify a file with a WildFire verdict and click Wildfire Analysis Report (). If you are analyzing an issue, hover over the issue and Investigate. You can open () the WildFire report of any file included in the issue's Causality Chain.
    
    **Note:**
    
    Cortex Cloud displays the preview of WildFire reports that were generated within the last couple of years. To view a report that was generated more than two years ago, you can download the report.
    
2.  Analyze the WildFire report.
    
    On the left side of the report, you can see all the environments in which the Wildfire service tested the sample. If a file is low risk and WildFire can easily determine that it is safe, only static analysis is performed on the file. Select the testing environment to review the summary and additional details. To learn more about the behavior summary, see [WildFire Analysis Reports—Close Up](https://docs.paloaltonetworks.com/wildfire/9-1/wildfire-admin/monitor-wildfire-activity/wildfire-analysis-reportsclose-up).
    
3.  (Optional) Download the WildFire report.
    
    If you want to download the WildFire report as it was generated by the WildFire service, click (). The report is downloaded in PDF format.
    

Report an incorrect verdict to Palo Alto Networks

If you know the WildFire verdict is incorrect, for example, WildFire assigned a Malware verdict to a file you wrote and know to be Benign, you can report an incorrect verdict to Cortex Cloud to request the verdict change.

1.  Open the WildFire report and verify the verdict that you are reporting.
    
2.  Click Report Verdict as Incorrect ().
    
3.  Under Suggested Verdict, suggest a new verdict.
    
4.  Under Comment, enter any details that can help us to better understand why you disagree with the verdict.
    
5.  Under Email, verify your email address.
    
6.  Click OK.
    
    The threat team will perform further analysis of the sample to determine whether it should be reclassified. If a malware sample is determined to be safe, the signature for the file is disabled in an upcoming antivirus signature update. If a benign file is determined to be malicious, a new signature is generated. After the investigation is complete, you will receive an email describing the action that was taken.

#### Import file hash exceptions

You can import file hash exceptions from the Endpoint Security Manager or from external feeds.

The Action Center displays information on files that are quarantined, or included in the allow list and block list. To import hashes from the Endpoint Security Manager or from external feeds, take the following steps:

1.  Go to Investigation & Response → Response → Action Center → New Action.
    
2.  Select Import Hash Exceptions.
    
3.  Drag your file to the drop area.
    
    Files must be in csv format, for example `Verdict_Override_Exports.csv`. If necessary, resolve any conflicts encountered during the upload and retry.
    
4.  Click Next.
    
5.  Review the action summary, and click Done.
    
    Cortex Cloud imports your hashes. Depending on the assigned verdict, Cortex Cloud then distributes them to the allow list or block list.

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

### Response actions

During the case investigation, various response actions are available.

To assist you with your investigation, Cortex Cloud provides response actions for investigating and remediating endpoints. For example, if you detect a compromised endpoint you can isolate it from your network. This action prevents the endpoint from communicating with other internal or external devices, and thereby reducing an attacker’s mobility on your network.

For response actions that rely on the Cortex XDR agent, the following table describes the supported platforms and minimum agent version. A dash (—) indicates that the setting is not supported.

| Module | Windows | Mac | Linux |
| --- | --- | --- | --- |
| **Initiate a Live Terminal Session** Initiates a remote connection to an endpoint, enabling you to investigate and respond to security events. Using `Live Terminal` you can manage files in the file system, manage active processes, and run operating system or Python commands. | ✓ Agent 6.1 and later | ✓ Agent 7.0 and later | ✓ Agent 7.0 and later |
| **Isolate an Endpoint** Halts all network access on the endpoint except for traffic to Cortex Cloud. This prevents a compromised endpoint from communicating with other internal or external devices. | ✓ Agent 6.0 and later | ✓ Agent 7.3 and later on macOS 10.15.4 and later | ✓ Agent 7.7 and later |
| **Run Scripts on an Endpoint** Allows executing Python 3.7 scripts on your endpoints directly from Cortex Cloud, including out-of-the-box scripts or your own Python scripts and code snippets. | ✓ Agent 7.1 and later | ✓ Agent 7.1 and later | ✓ Agent 7.1 and later |
| **Remediate Changes from Malicious Activity** Investigates suspicious causality process chains and cases on your endpoints, and provides suggested actions for remediating processes, files and registry keys on your endpoint that were changed as a result of malicious activity. | ✓ Agent 7.2 and later | — | — |
| **Search and Destroy Malicious Files** Searches for the presence of known and suspected malicious files on endpoints, and destroys the file on endpoints where it exists. | ✓ Agent 7.2 and later | ✓ Agent 7.3 and later on macOS 10.15.4 and later | — |

#### Initiate a Live Terminal session

Initiate a Live Terminal session from the Cortex Cloud management console to control the endpoint remotely.

To investigate and respond to security events on endpoints, you can use the Live Terminal to initiate a remote connection to an endpoint. The remote connection is facilitated by the Cortex XDR agent by using a remote procedure call. With the Live Terminal you can manage remote endpoints, and perform investigation and response actions on endpoints. Actions include:

-   Navigating and managing files in the file system.
    
-   Managing active processes.
    
-   Running operating system commands and Python commands.
    
-   Downloading files of up to 200 MB and uploading files of up to 40 MB.
    

Live Terminal is supported for endpoints that meet the following requirements:

| Operating System | Requirements |
| --- | --- |
| Windows | Traps 6.1 or a later release.; Windows 7 SP1 or a later release.; Windows update patch for [WinCRT (KB 2999226)](https://support.microsoft.com/en-us/help/2999226/update-for-universal-c-runtime-in-windows). To verify the Hotfixes that are installed on the endpoint, run the **`systeminfo`** command from a command prompt.; Endpoint activity reported within the last 90 minutes (as identified by the Last Seen time stamp in the endpoint details). |
| Mac | Cortex XDR agent 7.0 or a later release.; macOS 10.12 or a later release.; Endpoint activity reported within the last 90 minutes (as identified by the Last Seen time stamp in the endpoint details). |
| Linux | Cortex XDR agent 7.0 or a later release.; Any Linux supported version as listed in _Where Can I Install the Cortex XDR Agent?_ in the Palo Alto Networks Compatibility Matrix.; Endpoint activity reported within the last 90 minutes (as identified by the Last Seen time stamp in the endpoint details). |

**Note:**

You can run PowerShell 5.0 or a later release on Live Terminal of Windows.

##### Initiate a Live Terminal session

1.  You can initiate a Live Terminal session from Inventory → Endpoints → All Endpoints page. Right-click an endpoint and select Security Operations → Initiate Live Terminal. It might take the Cortex XDR agent a few minutes to facilitate the connection.
    
    You can also initiate a Live Terminal as a response action to a security event. If the endpoint is inactive or does not meet the requirements, the option is disabled.
    
2.  Use the Live Terminal to investigate and take action on the endpoint.
    
    **Tip:**
    
    You can fine-tune the Live Terminal session visibility on the endpoint by adjusting the User Interface options in your Agent Settings Profile.
    
3.  When you are finished, Disconnect the Live Terminal session.
    
    After you terminate the Live Terminal session, you can save a session report that logs all actions from the Live Terminal session. The report is available for download as a text file report when you close the live terminal session.
    
    Example 69. 
    
    The following example displays a sample session report:
    
    ```
    Live Terminal Session Summary
    Initiated by user username@paloaltonetworks.com on target TrapsClient1 at Jun 27th 2019 14:17:45
    
    Jun 27th 2019 13:56:13	Live Terminal session has started	[success]
    Jun 27th 2019 14:00:45	Kill process calc.exe (4920)	[success]
    Jun 27th 2019 14:11:46	Live Terminal session end request	[success]
    Jun 27th 2019 14:11:47	Live Terminal session has ended	[success]
    
    
    No artifacts marked as interesting
    ```
    
      
    

##### Manage processes from a Live Terminal session

From the Live Terminal you can monitor processes running on the endpoint. The Task Manager displays the task attributes, owner, and resources used. If you discover an anomalous process while investigating the cause of a security event, you can take immediate action to terminate the process or the whole process tree, and block processes from running.

1.  From the Live Terminal session, open the Task Manager to navigate the active processes on the endpoint.
    
    You can toggle between a sorted list of processes and the default process tree view (). You can also export the list of processes and process details to a comma-separated values file. If the process is known as malware, the row displays a red indicator and identifies the file using a malware attribute.
    
2.  Right-click the process to take the following actions:
    
    -   Terminate process: Terminate the process or the entire process tree.
        
    -   Suspend process: To stop an attack while investigating the cause, you can suspend a process or process tree without killing it entirely.
        
    -   Resume process: Resume a suspended process.
        
    -   Open in VirusTotal: VirusTotal aggregates known malware from antivirus products and online scan engines. You can scan a file using the VirusTotal scan service to check for false positives or verify suspected malware.
        
    -   Get WildFire verdict: WildFire evaluates the file hash signature to compare it against known threats.
        
    -   Get file hash: Obtain the SHA256 hash value of the process.
        
    -   Download Binary: Download the file binary to your local host for further investigation and analysis. You can download files up to 200MB in size.
        
    -   Mark as Interesting: Add an Interesting tag to a process so that you can easily locate the process in the session report.
        
    -   Remove from Interesting: If no threats are found, you can remove the Interesting tag.
        
    -   Copy Value: Copy the cell value to your clipboard.
        
    
3.  To end the Live Terminal session, select Disconnect.
    
    Choose whether to save the session report including files and tasks marked as interesting. Administrator actions are not saved to the endpoint.
    

##### Manage files from a Live Terminal session

The File Explorer enables you to navigate the file system on the remote endpoint and take the following actions:

-   Create, move, delete, or download files, folders, and drives, including connected external drives and devices such as USB drives and CD-ROM.
    
    **Note:**
    
    Network drives are not supported.
    
-   View file attributes, creation and last modified dates, and the file owner.
    
-   Investigate files for malicious content.
    

How to manage files from a Live Terminal

1.  From the Live Terminal session, open the File Explorer.
    
2.  Double click to navigate through each file directory. To locate a specific file, you can search for any filename rows on the screen from the search bar.
    
3.  From the top right hand menu you can take the following actions:
    
    -   Create a new directory
        
    -   Export the table as a CSV file.
        
    
4.  Right click a file or folder to see the available actions, including:
    
    -   Rename files and folders.
        
    -   Move and delete files and folders.
        
    -   Download a file.
        
    -   Open in VirusTotal: VirusTotal aggregates known malware from antivirus products and online scan engines. You can scan a file using the VirusTotal scan service to check for false positives or verify suspected malware.
        
    -   Get WildFire verdict: WildFire evaluates the file hash signature to compare it against known threats.
        
    -   Get file hash: Obtain the SHA256 hash value of the file.
        
    -   Download Binary: Download the file binary to your local host for further investigation and analysis. You can download files up to 200MB in size.
        
    -   Mark as Interesting: Add an Interesting tag to a file or directory so that you can easily locate the file in the session report.
        
    -   Remove from Interesting: If no threats are found, you can remove the Interesting tag.
        
    -   Copy Value: Copy the cell value to your clipboard.
        
    
5.  Select Disconnect to end the live terminal session.
    
    Choose whether to save the live terminal session report including files and tasks marked as interesting. Administrator actions are not saved to the endpoint.
    

##### Run operating system commands from a Live Terminal session

The Live Terminal provides a command line interface for running operating system commands on a remote endpoint. Each command runs independently and is not persistent.

**Note:**

On Windows endpoints, you cannot run GUI-based cmd commands like `winver` or `appwiz.cpl`.

How to run operating system commands

1.  From the Live Terminal session, select Command Line.
    
2.  Type your command on the command line and press Shift + Enter to execute the command.
    
    For example, you can manage files or launch batch files. You can enter or paste the commands into the command line interface, or you can upload a script.
    
    Example 70. 
    
    To chain multiple commands together use `&&`, as shown in the following example:
    
    ```
    cd c:\\windows\\temp\\ && <command1> && <command2>
    ```
    
      
    
3.  To end the Live Terminal session, select Disconnect.
    
    Choose whether to save the session report including files and tasks marked as interesting. Administrator actions are not saved to the endpoint.
    

##### Run Python commands and scripts from a Live Terminal session

The Live Terminal provides a Python command line interface for running Python commands and scripts. The Python command interpreter uses Unix command syntax and supports Python 3 with standard Python libraries.

1.  From the Live Terminal session, select Python to start the python command interpreter on the remote endpoint.
    
2.  Run Python commands or scripts as required.
    
    You can enter or paste the commands into the command line interface, or you can upload a script.
    
3.  When you are finished, Disconnect the Live Terminal session.
    
    Choose whether to save the live terminal session report including files and tasks marked as interesting. Administrator actions are not saved to the endpoint.
    

##### Disable Live Terminal sessions

If you want to prevent Cortex Cloud from initiating Live Terminal remote sessions on an endpoint that is running the Cortex XDR agent, you can disable this capability during agent installation or through Cortex Cloud Endpoint Administration. Disabling script execution is irreversible. If you later want to re-enable this capability on the endpoint, you must re-install the Cortex XDR agent.

**Note:**

Disabling Live Terminal does not take effect on sessions that are in progress.

#### Isolate an endpoint

In the event that an endpoint is compromised, you can immediately isolate it to reduce an attacker’s mobility.

When you isolate an endpoint, you halt all network access on the endpoint except for traffic to Cortex Cloud. This can prevent a compromised endpoint from communicating with other endpoints, thereby reducing an attacker’s mobility on your network. After the agent receives the instruction to isolate the endpoint and carries out the action, Cortex Cloud shows an Isolated status. To ensure an endpoint remains in isolation, agent upgrades are not available for isolated endpoints.

When isolated, the endpoint will still allow:

-   DHCP and HTTPS outgoing traffic for root user
    
-   DNS traffic
    

**Note:**

IP-based file storage protocol traffic will also be blocked. This might affect endpoint functionality if the endpoint uses such mounts.

Network isolation is supported for endpoints that meet the following requirements:

| Operating System | Prerequisites |
| --- | --- |
| Windows | Agent 6.0 or later.; (VDI) Network isolation allow list in the agent settings profile is configured to ensure VDI sessions remain uninterrupted. For more information, see Set up agent settings profiles.Set up agent settings profiles |
| Mac | Agent 7.3 or later.; MacOS 10.15.4 or later.; Cortex Cloud Network extension is enabled on the endpoint. Network isolation on Mac endpoints does not terminate active connections that were initiated before the agent was installed on the endpoint. |
| Linux | iptables and ip6tables.; Agent 7.7 or later.; Linux kernel with the following enabled:- CONFIG_NETFILTER; CONFIG_IP_NF_IPTABLES; CONFIG_IP_NF_MATCH_OWNER ; Network isolation allow list configured in the agent settings profile. Network isolation on Linux endpoints is based on the defined IP addresses and ports. |

How to isolate an endpoint

1.  Go to Investigation & Response → Response → Action Center → New Action and select Isolate.
    
    You can also initiate the action (for one or more endpoints) from the Isolation page of the Action Center or from Endpoints → Endpoint Management → Endpoint Administration.
    
2.  Enter a Comment to provide additional background or other information that explains why you isolated the endpoint.
    
    After you isolate an endpoint, Cortex Cloud displays the Isolation Comment under Action Center → Isolation. If needed, you can edit the comment from the right-click pivot menu.
    
3.  Click Next.
    
4.  Select the target endpoint that you want to isolate from your network.
    
    **Tip:**
    
    If needed, Filter the list of endpoints.
    
5.  Click Next.
    
6.  Review the action summary and click Done when finished.
    
    In the next heartbeat, the agent will receive the isolation request from Cortex Cloud.
    
7.  To track the status of an isolation action, go to Action Center → Currently Applied Actions → Endpoint Isolation.
    
    If after initiating an isolation action, you can cancel the action by right-clicking the action and selecting Cancel for pending endpoint. You can cancel the isolation action only if the endpoint is still in `Pending` status and has not been isolated yet.
    
8.  After you remediate the endpoint, cancel endpoint isolation to resume normal communication.
    
    You can cancel isolation from Actions Center → Isolation or from Endpoints → Endpoint Management → Endpoint Administration. From either place right-click the endpoint and select Endpoint Control → Cancel Endpoint Isolation.
    

**Note:**

If file system operations become unresponsive during isolation, such as being unable to list folder content, unmount the mounted network shares.

#### Pause endpoint protection

Disable the Cortex XDR agent protection capabilities on an endpoint.

As of agent 7.7 and above, you can pause the agent protection capabilities on one or more endpoints while maintaining connectivity with Cortex Cloud. By only pausing the protection and retaining connectivity, the agent will run with all the profiles disabled, but continue to send data and take actions from the server. When you are ready, you can resume the endpoint protection.

**Note:**

Pausing your endpoint protection modules leaves your machines exposed to risks.

How to pause endpoint protection modules

1.  Go to Inventory+Endpoints → All Endpoints.
    
2.  In the All Endpoints page, select the endpoints on which you want to pause protection, right-click and select Endpoint Control → Pause Endpoint Protection.
    
3.  Verify the endpoints, add an optional comment that appears in the Management Audit log, and Pause the protection.
    
    Paused endpoints display a pause icon in the Endpoint Name field, and one of the following the action statuses in Manual Protection Pause field:
    
    -   Protection Active
        
    -   Pending Pause
        
    -   Protection Paused
        
    -   Pending Activation
        
    
4.  When you are ready to resume protection, select the paused endpoints, right-click and select Endpoint Control → Resume Endpoint Protection and Resume protection on the listed endpoints.
    
    The All Endpoint table fields are updated accordingly.
    
5.  Track your pause and resume endpoint protection actions.
    
    Go to Investigation & Response → Response → Action Center and locate Action Type Pause Endpoint Protection or Resume Endpoint Protection.

#### Remediate changes from malicious activity

You can obtain action remediation suggestions from Cortex Cloud about malicious causality chains that have been detected.

When investigating cases and causality chains you might need to restore and revert changes made to your endpoints as result of a malicious activity. To avoid manually searching for the affected files and registry keys on your endpoints, you can request remediation suggestions.

**Prerequisite:**

To initiate remediation suggestions, you must have the following system requirements:

-   An App Administrator, Privileged Responder, or Privileged Security Admin role permissions which include the remediation permissions.
    
-   EDR data collection enabled.
    
-   Agent version 7.2 or above on Windows endpoints.
    

How to initiate remediation suggestions

1.  You can initiate a remediation suggestions analysis from the following places:
    
    -   In the Cases view, click the more options icon in the cases panel and select Remediation Suggestions.
        
        **Note:**
        
        Endpoints that are part of the Case view and do not meet the required criteria are excluded from the remediation analysis.
        
    -   In the Causality View:
        
        -   Right-click any process node involved in the causality chain and select Remediation Suggestion.
            
        -   Select Actions → Remediation Suggestions.
            
        
    
    Analysis can take a few minutes. You can minimize the analysis pop-up if desired while navigating to other pages.
    
2.  Review the remediation suggestion summary and details.
    
    Field descriptions
    
    | Field | Description |
    | --- | --- |
    | Original Event Description | Summary of the initial event that triggered the malicious causality chain. |
    | Original Event Timestamp | Timestamp of the initial event that triggered the malicious causality chain. |
    | Endpoint Name | Hostname of the endpoint. |
    | IP Address | IP address associated with the endpoint. |
    | Endpoint Status | Connectivity status of the endpoint. |
    | Domain | Domain or workgroup to which the endpoint belongs, if applicable. |
    | Endpoint ID | Unique ID assigned by Cortex Cloud that identifies the endpoint. |
    | Suggested Remediation | Action suggested by the remediation scan for you to apply to the causality chain process: Delete File.; Restore File.; Rename File.; Delete Registry Value.; Restore Registry Value.; Terminate Process Available when selecting Remediation Suggestions for a node in the Causality View.; Terminate Causality Terminate the entire causality chain of processes that have been executed under the process tree of the listed Causality Group Owner (GCO) process name.; Manual Remediation Requires you to take manual action to revert or restore. |
    | Suggested Remediation Description | Summary of the remediation suggestion to apply to the file or registry. |
    | Remediation Status | Status of the applied remediation. |
    | Remediation Date | Displays the timestamp of when all of the endpoint artifacts were remediated. If missing a successful remediation, the field will not display the timestamp. |
    
3.  Select one or more rows, right-click and select Remediate.
    
4.  Track your remediation process.
    
    Go to Investigation & Response+Response → Action Center → All Actions and locate your remediation process in the Action Type field. Right-click Additional data to open the Detailed Results window.

#### Search and destroy malicious files

Cortex Cloud enables you to effectively hunt down any identified malicious file that may exist on any of your endpoints.

To take immediate action on known and suspected malicious files, you can search and destroy the files. After identifying the presence of a malicious file, you can immediately destroy the file from any or all endpoints on which the file exists.

The agent builds a local database on the endpoint with a list of all the files, including their path, hash, and additional metadata. Depending on the number of files and the disk size of each endpoint, it can take a few days for Cortex Cloud to complete the initial endpoint scan and populate the files database. You cannot search an endpoint until the initial scan is complete and all file hashes are calculated.

After the initial scan is complete, the agent retains a snapshot of the endpoint files inventory. The agent maintains the files database by initiating periodic scans and closely monitoring all actions performed on the files.

You can search for specific files according to the file hash, the file full path, or a partial path using regex parameters from the Action Center or the Query Builder. When you find the file, you can select it in the search results and destroy the file by hash or by path. If you already know the path or hash, you can also destroy a file from the Action Center without performing a search. When you destroy a file by hash, all the file instances on the endpoint are removed.

You can validate a hash against VirusTotal and WildFire to provide additional context before initializing the File Destroy action.

**Note:**

The Cortex Cloud agent does not include the following information in the local files inventory:

-   Information about files that existed on the endpoint and were deleted before the Cortex Cloud agent was installed.
    
-   Information about files where the file size exceeds the maximum file size for hash calculations that are pre-configured in Cortex Cloud .
    
-   If the Agent Settings Profile on the endpoint is configured to monitor common file types only, then the local files inventory includes information about these file types only. You cannot search or destroy file types that are not included in the list of common file types.
    

**Prerequisite:**

The following are prerequisites to enable Cortex Cloud to search and destroy files on your endpoints:

-   Supported platforms:
    
    -   **Windows:** Cortex XDR agent version 7.2 or a later. If you plan to enable Search and Destroy on VDI sessions, you must perform the initial scan on the Golden Image.
        
    -   **Mac:** Cortex XDR agent version 7.3 or a later release running on macOS version 10.15.4 or later.
        
    -   **Linux:** Not supported.
        
    
-   Setup and permissions:
    
    -   Ensure File Search and Destroy is enabled for your Cortex XDR agent.
        
    

##### Search a file

You can search for files on the endpoint by file hash or file path. The search returns all instances of this file on the endpoint. You can then immediately destroy all of the file instances on the endpoint, or upload the file to Cortex Cloud for further investigation.

You can search for a file using the Query Builder, or use the Action Center wizard as described in the following workflow.

1.  From the Action Center select New Action → File Search.
    
2.  Configure the search method:
    
    -   To search by hash, enter the file SHA256 value. When you search by hash, you can also search for deleted instances of this file on the endpoint.
        
    -   To search by path, enter the specific path for the file on the endpoint or specify the path using wildcards. When you provide a partial path or partial file name using \*, the search will return all the results that match the partial expression. Note the following limitations:
        
        -   The file path must begin with a drive name, for example: **`c:\`**.
            
        -   You must specify the exact path folder hierarchy, for example **`c:\users\user\file.exe`**. You must specify the exact path folder hierarchy also when you replace folder names with wildcards, by using a wildcard for each folder in the hierarchy. For example, **`c:\*\*\file.exe`**.
            
        
    
    Click Next.
    
3.  Select the target endpoints on which you want to search for the file. Cortex Cloud displays only endpoints eligible for file search. Click Next.
    
4.  Review the summary and initiate the search.
    
    Cortex Cloud displays the summary of the file search action. If you need to change your settings, go Back. If all the details are correct, click Run. The File search action is added to the Action Center.
    
5.  Review the search results.
    
    In the Action Center, you can monitor the action progress in real-time and view the search results for all target endpoints. For a detailed view of the results, right-click the action and select Additional data. Cortex Cloud displays the search criteria, timestamp, and real-time status of the action on the target endpoints. You can:
    
    -   **View results by file (default view):** Cortex Cloud displays the first 100 instances of the file from every endpoint. Each search result includes details about the endpoint (such as endpoint status, name, IP address, and operating system) and details about the file instance (such as full file name and path, hash values, and creation and modification dates).
        
    -   **View the results by endpoint:** For each endpoint in the search results, Cortex Cloud displays details about the endpoint (such as endpoint status, name, IP address, and operating system), the search action status, and details about the file (whether it exists on the endpoint or not, how many instances of the file exist on the endpoint, and the last time the action was updated).
        
    
    If not all endpoints in the query scope are connected or the search has not completed, the search action remains in Pending status.
    
6.  (Optional) Destroy a file.
    
    After you located the malicious file instances on all your endpoints, proceed to destroy all the file instances on the endpoint. From the search results Additional data, right-click the file to immediately Destroy by path, Destroy by hash, or Get file to upload it to Cortex Cloud for further examination.
    

##### Destroy a file

When you know a file is malicious, you can destroy all of its instances on your endpoints, directly from Cortex Cloud. You can destroy a file immediately from the File search action result, or initiate a new action from the Action Center. When you destroy a file, the Cortex Cloud agent deletes all the file instances on the endpoint. To destroy a file from the file search results, see Search a file.

1.  From the Action Center select New Action → Destroy File.
    
2.  To destroy by hash, provide the SHA256 of the file. To destroy by path, specify the exact file path and file name. Click Next.
    
3.  Select the target endpoints from which you want to remove the file. Cortex Cloud displays only endpoints eligible for file destroy. When you’re done, click Next.
    
4.  Review the summary and initiate the action.
    
    Cortex Cloud displays the summary of the file destroy action. If you need to change your settings, go Back. If all the details are correct, click Run. The File destroy action is added to the Action Center.

#### Manage external dynamic lists

Configure and manage your external dynamic lists in Cortex Cloud.

**Notice:**

This functionality is not supported for XDR Prevent.

An External Dynamic List (EDL) is a text file hosted on an external web server that your Palo Alto Networks firewall uses to provide control over user access to IP addresses and domains that the Cortex Cloud has found to be associated with an alert.

Cortex Cloud hosts two external dynamic lists you can configure and manage.

-   IP Addresses EDL
    
-   Domain Names EDL
    

To maintain an EDL, you must meet the following requirements:

-   Cortex Cloud Pro per GB or Cortex Pro per Endpoint license
    
-   An App Administrator, Privileged Investigator, or Privileged Security Admin role which includes EDL permissions
    
-   Palo Alto Networks firewall running PAN-OS 9.0 or a later release
    
-   Access to your Palo Alto Networks firewall configuration
    

1.  Enable EDL.
    
    1.  Navigate to Settings → Configurations → Integrations → External Dynamic List Integration.
        
    2.  Enable External Dynamic List and enter the Username and Password that the Palo Alto Networks firewall should use to access the EDL.
        
2.  Test the URL connection.
    
    Testing is currently only available using the following curl and Windows PowerShell commands:
    
    **For Linux/OS/Windows**
    
    **`curl https://edl-<tenant-name>.xdr.<region>.paloaltonetworks.com/block_list?type=ip -u <user>:<password>`**
    
    **For Windows PowerShell version 5 and later**
    
    **`[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12$username = "username"$password = "password"$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $username,$password)))`**
    
3.  Record the IP Addresses EDL URL and the Domains EDL URL. You will need these URLs in the coming steps to point the firewall to these lists.
    
4.  Save the EDL configuration.
    
5.  Enable the firewall to authenticate the EDL.
    
    1.  Download and save the following root certificate: [https://certs.godaddy.com/repository/gd-class2-root.crt](https://certs.godaddy.com/repository/gd-class2-root.crt).
        
    2.  On the firewall, select Device → Certificate Management → Certificates and Import the certificate. Make sure to give the device certificate a descriptive name, and select OK to save the certificate.
        
    3.  Select Device → Certificate Management → Certificate Profile and Add a new [certificate profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/certificate-management/configure-a-certificate-profile).
        
    4.  Give the profile a descriptive name and Add the certificate to the profile.
        
    5.  Select OK to save the certificate profile.
        
6.  Set the Cortex Cloud EDL as the source for a firewall EDL.
    
    For more detailed information about how Palo Alto Networks firewall EDLs work, how you can use EDLs, and how to configure them, review how to [Use an External Dynamic List in Policy](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/use-an-external-dynamic-list-in-policy).
    
    1.  On the firewall, select Objects → External Dynamic Lists and Add a new list.
        
    2.  Define the list Type as either IP List or Domain List.
        
    3.  Enter the IP Addresses Block List URL or the Domains Block List URL that you recorded in the last step as the list Source.
        
    4.  Select the Certificate Profile that you created in the last step.
        
    5.  Select Client Authentication and enter the username and password that the firewall must use to access the EDL.
        
    6.  Use the Repeat field to define how frequently the firewall retrieves the latest list from Cortex Cloud .
        
    7.  Click OK to add the new EDL.
        
7.  Select Policies → Security and Add or edit a security policy rule to add the Cortex Cloud EDL as match criteria to a security policy rule.
    
    Review the different ways you can [Enforce Policy on an External Dynamic List](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/use-an-external-dynamic-list-in-policy/enforce-policy-on-an-external-dynamic-list); this topic describes the complete workflow to add an EDL as match criteria to a security policy rule.
    
    1.  Select Policies → Security and Add or edit a security policy rule.
        
    2.  In the Destination tab, select Destination Zone and select the external dynamic list as the Destination Address.
        
    3.  Click OK to save the security policy rule and Commit your changes.
        
        You do not need to perform an additional commit or make any subsequent configuration changes for the firewall to enforce the EDL as part of your security policy; even as you update the Cortex Cloud EDL, the firewall will enforce the list most recently retrieved from Cortex Cloud .
        
        **Tip:**
        
        You can also use the IP list and URL lists as part of a URL Filtering policy, or the domain list as part of a custom Anti-Spyware profile.
        
8.  Add an IP address or Domain to your EDL.
    
    You can add to your IP address or Domain lists as you triage alerts from the Action Center or throughout Cortex Cloud .
    
    **Note:**
    
    Ensure EDL sizes don’t exceed your [firewall model limit](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/use-an-external-dynamic-list-in-policy/external-dynamic-list).
    
    To add an IP address or Domain from the Action Center, select Add to EDL. You can choose to enter the IP address or Domain you want to add Manually or choose to Upload File.
    
    During investigation, you can also Add to EDL from the Actions menu that is available from investigation pages such as the Incidents View, Causality View, IP View, or Quick Launcher.
    
9.  At any time, you can view and make changes to the IP addresses and domain name lists.
    
    1.  Navigate to Investigation & Response → Response → Action Center → Currently Applies Actions → External Dynamic List.
        
    2.  Review your IP addresses and domain names lists.
        
    3.  If desired, select New Action to add additional IP addresses and domain names.
        
    4.  If desired, select one or more IP addresses or domain names, right-click and Delete any entries that you no longer want included on the lists.

#### Collect a memory image

Collect a memory image from a Windows endpoint.

**Notice:**

This functionality has the following license requirements:

-   Forensics add-on license.
    

Certain forensic artifacts exist only in the computer’s memory, such as volatile data created by running processes. The Memory Collection option enables Cortex Cloud to capture the memory of a Windows endpoint. After the memory image has been captured from the Cortex Cloud endpoint, the image is available to download. Use the image to perform a full analysis using industry-standard tools.

How to collect a memory image

1.  From the Action Center select New Action → Memory Collection.
    
2.  Select the target Windows endpoint from which you want to collect the memory image (only one endpoint at a time). Click Next.
    
3.  Review the summary and initiate the action.
    
    A summary of the memory collection action is displayed. If you need to change your settings, click Back. If all the details are correct, click Done. The Memory Collection action is added to the Action Center.
    
4.  Review the collection results.
    
    In the Action Center, you can monitor the action progress in real-time and view the status for the target endpoint. For a detailed view of the results, right-click the action and select Additional data. Cortex Cloud displays the action, timestamp, and real-time status of the action on the target endpoint.
    
5.  Download the file of the image.
    
    In the Detailed Results - Memory Collection screen, right-click the action and select Download files.
    
    The file is downloaded to the local computer.

### Forensics
**Notice:**

Requires the Forensics add-on

#### Forensic investigations

Learn about forensics, how to create forensic investigations, how to create and manage data collections, and how to assess other forensic related settings.

Investigations are comprised of one or more data collections from endpoints within an environment. Grouping the collections within a single location enables you to focus on the endpoints relevant to your investigation. When searching for data, you can select two types of collections:

-   Hunt collections enable you to search for a specific activity across a large number of hosts. A hunt collection provides more details about where something occurred. Examples of this type of collection are, finding which endpoints ran a piece of malware, which users accessed a particular file, or which endpoints were accessed by a specific user.
    
-   Triage collections enable you to collect detailed information about specific activities that occurred on an endpoint. The triage functionality is configurable and supports the collection of all currently supported forensic artifacts, user-defined file paths, a full file listing for all of the connected drives, full event logs, and registry hives. The amount of data collected during a triage can be large, so triages are limited to ten or fewer endpoints per collection.

##### Manage an investigation

Manage an investigation by adding collections, managing alerts, adjusting the timeline, analyzing assets and artifacts.

Forensic investigations streamlines your case response, data collection, threat hunting and analysis of your endpoint. By using the Forensic Investigation, you can find the source and scope of the attack and to determine what, if any, data was accessed. It provides a single location for grouping, tracking, and analyzing all forensic data collections.

Forensic Investigations enables you to do the following:

-   View any alerts triggered during data ingested as part of the investigation.
    
-   Tag relevant evidence for inclusion for the Investigation Timeline.
    
-   Export collected data for long-term retention.
    
-   Set user permissions that can be assigned to investigations allowing you to restrict access to the Investigation page including the Investigation Timeline and collection details.
    

The Forensic Investigation fields shows information relating to the investigation.

| Field | Description |
| --- | --- |
| Investigation | Name of the investigation. |
| Status | Present status of the investigation: Open; Close pending: After selecting close, the investigation status changes to close pending. It takes 24 hours until officially removed from the investigations repository. This gives the users a chance to revert back if necessary. |
| Evidence collections | Number of completed collections from the total collections. |
| New alerts | Total count of alerts for the collection where the Resolution Status\=New. |
| Total alerts | Total number of alerts for data collected in the investigation You can click the link to open the investigation on the Alerts tab. |
| Created | Timestamp of when the investigation was created. |

###### Create a new investigation

Learn how to create a forensics investigation. This includes adding a collection, exporting the data collection, managing alerts and key assets & artifacts.

Create a forensics investigation that includes all the relevant forensics data. This includes adding collections (hunts and triages), exporting the data collections, managing alerts and evaluating key assets & artifacts.

1.  Select Investigation & Response → Forensics.
    
2.  Click New Investigation.
    
3.  In the Create New Investigation wizard, enter a name and description (optional) for the investigation.
    
4.  In the Permissions table, select the users to whom you want to grant access to the investigation data.
    
    **Note:**
    
    To set up user permissions, you must have Scope-Based Access Control (SBAC) enabled.
    
    Refer to User permissions for detailed information on permissions.
    
5.  Click Save to save the investigation in the Forensic Investigations table or click Save & Start A Collection to start the process of adding collections.
    
6.  In the New Collection widget, select Triage or Hunt.
    
7.  The investigation is saved to the Forensic Investigations table.
    
8.  Click UTC Timezone to configure the timezone and timestamp format. Refer to Configure server settings for information on setting up your timezone.Configure server settings

###### Edit an investigation

Edit an existing investigation from the Forensic Investigations page.

From the list of active investigations, you can edit the name, description or update the user permissions for the investigation.

1.  From the Forensic Investigations table, right-click one of the investigations and select Edit.
    
2.  In the Edit Investigation widget, you can update the Investigation Name, Description, and Permissions. For more information, refer to User permissions.

###### Close an investigation

Close an existing investigation from the Forensic Investigations page.

From the list of ongoing investigations, you can close an investigation. You might want to close an investigation if resolved, or if you want to cancel the investigation.

**Note:**

When you close an investigation, Palo Alto Networks has a grace period of 24 hours before deleting any collections associated with the investigation. During this timeframe, you have the option to cancel the close investigation action.

1.  From the Forensic Investigations table, right-click an investigation and select Close.
    
2.  In the Close Investigation widget, you can view all evidence collections exported for the investigation.
    
3.  In the Forensic Investigation table, the status of the investigation changes to Close Pending, and the timestamp displays the time the investigation expires and the investigation data is deleted.
    
4.  Right-click an investigation pending closure to display the following options::
    
    -   Edit: Update the investigation name, description, or adjust user permissions.
        
    -   Open: Cancel the close request.
        
    -   Permanently delete: Delete the investigation and all associated data immediately. This action can't be canceled.

###### User permissions

You can assign users to the investigation for them to view and manage the investigation.

By default, investigation permissions utilize the role-based access control (RBAC) settings configured in the system. Users must have a role with the Forensic permissions set to View in order to view forensic investigations. In order to create investigations or collections, a user must have a role where the Forensics permissions is set to View/Edit. Without either role, a user cannot interact with the forensics interface.

If Scope-Based Access Control (SBAC) is enabled on your system, from the Permissions table, you can select the users from which to assign permissions to the investigation.

Users with account administrator or instance administrator roles have access to investigations and can't be cleared from the Permissions table. They can view and edit all Investigations, including adding/removing users, creating/deleting collections, closing the Investigation. This prevents investigation lockout in the event of a user leaving before the Investigation is complete.

**Note:**

Even if a user does not have access to view an investigation via the Forensics Investigations page, they can still query the results of the collections using an XQL query.

The Permissions fields describe the following information:

| Field | Description |
| --- | --- |
| User Name | Name of the user as logged in the Settings+Configurations → Access Management → Users. |
| Email | The user's email as logged in the Settings+Configurations → Access Management → Users. |
| User Type | Indicates whether the user was defined in Cortex Cloud using the CSP (Customer Support Portal), SSO (single sign-on) using your organization’s IdP, or both CSP/SSO. |
| Role | Name of the role assigned specifically to the user that is not inherited from somewhere else, such as a User Group. When the user does not have any Cortex Cloud access permissions that are assigned specifically to them, the field displays No-Role. |
| Permissions | Options are None, View, View/Edit |

##### Data collection

This section includes information related to each collection type.

The data collection section includes information related to each collection type.

###### Hunting

Search for specific data across a large number of hosts.

Hunting enables investigators to search for specific data across a large number of hosts. Hunt collections provide more details about where something occurred. Hunting examples include finding which endpoints executed a piece of malware, which users accessed a particular file, or which endpoints were accessed by a specific user.

###### Create a hunt

Hunt collections enable you to search endpoints for suspicious activity to contribute to helping resolve the investigation.

Select hunt collections when you want to search for a specific activity across a large number of hosts. Hunt Collections gather more details about where something occurred. For example, use a hunt to find which endpoints executed a piece of malware, which users accessed a particular file, or which endpoints a specific user authenticated to.

When adding a new hunt collection, you can select from various artifact types for Windows, macOS and Linux.

1.  In the New Hunt Collection wizard, in the Hunt Collection Name, enter a name that will be easy to find in the collections table.
    
2.  Select the Platform, Windows, macOS or Linux.
    
3.  Select one of the time range options:
    
    -   One Time Collection: Run the hunt collection only once.
        
    -   Repeat Collection Every: Run the hunt collection every x hours set.
        
    -   Schedule: Range of days during the week and time frame.
        
    
4.  In Description , enter information that is relevant to the collection you are creating.
    
5.  In Maximum Concurrent Endpoints, enter the maximum number of endpoints that will run the searches at the same time within the time range specified. The default is 200 endpoints.
    
6.  On the Configuration page, refer to Configure Collection for information about each artifact.
    

**Note:**

You can save hunts in an incomplete state and edit them later. After a hunt has run, you cannot edit it. Instead, you can duplicate the hunt with the same configuration.

###### Hunt results

The hunt results page consolidates information collected by the Cortex XDR agent enabling you to investigate and take action on your endpoints.

The hunt results page consolidates information collected by the Cortex XDR agent enabling you to investigate and take action on your endpoints.

###### Review process execution search results

Manage the process execution artifacts collected from the endpoints.

The Process Execution table displays a normalized table containing an overview of all of the different process execution artifacts collected from the endpoints. Investigate the following detailed fields:

**Note:**

The grouping button () shows the number of affected endpoints grouped by executable name. This enables you to perform hunting via frequency analysis (referred to as stacking) and provides a birds eye view of potential malware files that require further analysis.

| Field | Description |
| --- | --- |
| Context | Contextual details relating to the executed process such as files opened, command line arguments, or process run count. |
| Executable Name | Name of the executable. |
| Executable Path | Path of the executable. |
| Hostname | Name of the host on which the process resided. |
| MDS | MDS value of the executable file, if available on the file system. |
| SHA1 | SHA1 value of the executable file, if available on the file system. |
| SHA256 | SHA256 value of the executable file, if available on the file system. |
| Timestamp | Timestamp associated with the executable file or process execution. |
| Type | Type of process artifact. |
| User | User name associated with the execution artifact. |
| Verdict | WildFire verdict for the following process execution artifacts. Prefetch; Recentfilecache; Shimcache; UserAssist If there is a WildFire verdict, the relevant **Verdict** is displayed. Unknown; Benign; Malware; Grayware Also, a link to the WildFire analysis report is available for review. |

###### Review file access

Manage file access collected from endpoints.

The File Access table displays a normalized table containing an overview of all of the different file access artifacts collected from the endpoints. Investigate the following detailed fields:

| Field | Description |
| --- | --- |
| Hostname | Name of the host on where the file access artifact resided. |
| Path | Path of the accessed file or folder. |
| Timestamp | Timestamp associated with the accessed file or folder. |
| Type | Type of file access artifact. |
| User | User name of who accessed the file or folder, if available. |

###### Review persistence search results

Manage persistence artifacts collected from the endpoints.

The Persistence table displays a normalized table containing an overview of all of the application persistence artifacts collected from the endpoints. Investigate the following detailed fields:

**Note:**

The grouping button () shows the number of affected endpoints grouped by file path. This enables you to perform hunting via frequency analysis (referred to as stacking) and provides a birds eye view of potential malware files that require further analysis.

| Field | Description |
| --- | --- |
| Command | Command to be executed. |
| Endpoint ID | Unique identifier of the endpoint on which the persistence mechanism resides. |
| File Path | Path of a secondary executable (often a dll) associated with this persistence mechanism. |
| File SHA256 | SHA256 value of the file. |
| Hostname | Name of the host on which the persistence mechanism resides. |
| Image Path | Path of the executable associated with this persistence mechanism. |
| Name | Name associated with persistence mechanism, if available. |
| Registry Path | Path of the registry value. |
| Timestamp | Timestamp associated with the persistence mechanism. |
| Type | Type of persistence mechanism. |
| User | User account associated with persistence mechanism. |
| User SID | User account associated with persistence mechanism. |
| Verdict | WildFire verdict for the following persistence artifacts. Drivers; Registry; Scheduled Tasks; Services; Startup Folder If there is a WildFire verdict, the relevant **Verdict** is displayed. Unknown; Benign; Malware; Grayware Also, a link to the WildFire analysis report is available for review. |

###### Review network data search results

Manage the different network artifacts collected on the endpoints.

The Network table displays an overview of the different types of network artifacts collected on the endpoints. Investigate the following detailed fields:

| Field | Description |
| --- | --- |
| Hostname | Name of the host on which the network activity occurred. |
| Interface | Type of network interface. |
| IP Address | IP address associated with network activity. |
| Resolution | Network data type associated with the IP address. |
| Type | Type of network artifact. |

###### Review remote access search results

Manage the remote access artifacts collected from the endpoints.

The Remote Access table displays a normalized table containing an overview of all of the remote access artifacts collected from the endpoints. Investigate the following detailed fields:

| Field | Description |
| --- | --- |
| Connection ID | Unique Identifier associated with the particular remote access connection found in this row. |
| Connection Type | Type of remote access connection. |
| Duration | Duration of remote access connection. |
| Endpoint ID | A unique ID assigned by Cortex XDR that identifies the endpoint. |
| Hostname | Name of the host on which the remote access occurred. |
| Message | Description of activity related to this remote access collection. |
| Source Host | Origination host of remote access connection. |
| Timestamp | Date and time of the remote access activity. |
| Type | Type of remote access artifact. |
| User | User account associated with remote access connection. |

###### Review archive history search results

Manage archive processes that were executed on an endpoint.

The Archive History table displays an overview of the different types of archive processes that were executed on an endpoint. Investigate the following detailed fields:

| Field | Description |
| --- | --- |
| Hostname | Name of the host on which the archive history was found. |
| Timestamp | Timestamp associated with archive history file. |
| Type | Type of archive history artifact. 7-Zip Folder History; WinRAR ArcHistory |
| Path | Path of archive history file. |
| User | User account associated with archive history file. |

###### Linux

The collection results for the Core Linux artifacts include information about each artifact.

| Artifact | Result Details |
| --- | --- |
| Auditd Rules | Auditd Rules artifact in Linux forensics refers to the log data collected by the Linux Audit Daemon, a core component of security auditing. It records a detailed, chronological trail of system events based on a set of pre-configured rules. |
| Authorized Keys | Shows the public keys that are permitted to log in as a specific user via SSH. Attackers can add their own keys to this file to gain persistent access to a system. |
| Environment Variables | Lists environment variables for a given context (for example: a user's shell or a specific process). These variables define the execution environment and can contain important paths, configurations, or sensitive data. |
| File Listing | Shows information about the timeline of file system activity. |
| Files & Processes | Lists files opened by processes. This is crucial for mapping processes to the files and network sockets they are interacting with, which can reveal hidden activities, loaded libraries, or active network connections. |
| Firewall Rules | Lists control network traffic. Analyzing these rules is crucial for understanding the network security posture and identifying potentially malicious or overly permissive configurations. |
| System-Wide Configuration | Shows key-value pairs parsed from various configuration files in the `/etc` directory, for example: /`etc/resolv.conf` for DNS settings. This artifact helps understand the system's network and operational configuration. |
| Kernel Modules | Lists kernel modules on the system, their state, and the associated file path. Malicious actors may use custom kernel modules (rootkits) to hide their presence or gain privileged access. |
| Known Hosts | Lists the files that store the public keys of SSH servers a user has connected to. This helps to verify the server's identity and prevent man-in-the-middle attacks by alerting the user if the server's key changes. |
| Mounted Filesystems | Lists all mounted file systems, their sources (devices), types, and unique identifiers. This is useful for discovering connected storage and network shares, and understanding the file system layout. |
| Network Connections | Shows the lists of active network connections and listening ports. Essential for identifying unauthorized network communications, malware command and control (C2) channels, or unexpected listening services. |
| Running Processes | Shows a detailed snapshot of running processes on the system. This includes process identifiers, user context, executable path, parent-child relationships, state, and performance metrics. It is a cornerstone artifact for live system analysis. |
| System Information | Provides fundamental hardware and system information, including manufacturer, model, UUID, and memory details. This helps to identify and profile the system. |
| Systemd Service | Lists the system daemons or services (for example, from systemd). Analyzing these is key to understanding what long-running processes are configured on the system and to spot malicious or unnecessary services. |
| User Login & Session History | Shows records of user login sessions from the last command, showing who logged in, from where, and for how long. This is essential for auditing user access and investigating unauthorized logins. |

###### Hunt status

In the Actions table, you can scroll or use the filters to see the status of any search within a hunt across any of the targeted endpoints.

Hunts consist of searches across multiple endpoints and those searches can take time to return results from all of the targeted endpoints. To view the status of all of the searches contained within a hunt, go to Investigation & Response → Forensics. From the investigations table, click the investigation link. From the Collections tab, select Hunt and from the Status column of the hunt, click Actions. This launches a new browser tab displaying the Actions table. Within the Actions table, you can scroll or use the filters to see the status of any search within a hunt across any of the targeted endpoints.

Using this information, you can identify the successful and failed searches and take the necessary action.

| Field | Description |
| --- | --- |
| Endpoint name | Agent hostname. |
| Endpoint ID | Agent unique ID. |
| Action ID | A unique identifier for the agent action. |
| Name | Name of search. |
| Status | Shows one of the following statuses of the search: Pending; In progress; Completed successfully; Failed; Timeout |
| Artifact category | Name of category for the search.  Example: `Process execution` |
| Artifact | Artifact targeted by this search. Example: `Amcache` |
| Results | Number of results received for the search. |
| Last updated | Latest time results were received for this action. |
| Parameters | The string that describes the search parameters. Example: `C:\Users\* File Name Regex: *\.exe` |
| Creation time | Timestamp when the search was created. |

###### Triage

Triage collection gathers a wide range of artifacts that can be used to help understand the event that occurred on an endpoint.

Triage enables you to do a in-depth analysis of a specific endpoint to fully understand the activities that occurred on that endpoint. The triage functionality is configurable and supports the collection of all currently supported forensic artifacts, user-defined file paths, a full file listing for all of the connected drives, full event logs, and registry hives. The amount of data collected during a triage can be large, so triages are limited to ten or fewer endpoints per collection.

###### Create a triage

Triage collections enable you to obtain additional information for certain activities that have occurred on the endpoints. This helps towards the forensics analytics of an investigation.

Use triage collections when a certain activity, group of activities, or the actions of a specific user on that endpoint have been identified, and additional information is required. The triage functionality collects detailed system information, including a full file listing for all of the connected drives, full event logs, and registry hives, to provide you with a complete, holistic picture of an endpoint.

Triage supports data collection from both online and offline hosts, on both Windows and macOS platforms.

1.  In the Triage Collection Name field, enter a name that will be easy to find in the collections table.
    
2.  Select the Platform either Windows, macOS or Linux.
    
3.  In the Description field, enter information that is relevant to the collection you are creating .
    
4.  For Triage Type, you can select Offline or Online or both.
    
5.  Select Offline to upload archives containing forensic data collected by the Offline Collector. After the archive is uploaded, the data is extracted and ingested into the Forensics tables on the tenant. Import Offline Triage supports uploading packages created on Windows, macOS, and Linux platforms.
    
6.  Click Save Collection and Exit or click Next to continue.
    
7.  On the Configuration page, refer to Configure Collection for information about each artifact.
    
8.  You can select a preset from Select Presets (Windows/macOS/Linux) to copy the options for artifacts, volatiles, and file collections from another collection.
    
    You can also click Save new preset to save the current collection as a potential triage collection.
    
9.  Click Save Collection and Exit or click Next to continue.

###### Upload an offline triage package

Use the Upload Offline Triage to upload archives containing forensic data collected by the offline collector.

The Forensics Triage feature enables you to create a custom, standalone executable package that collects all of the forensic artifacts in the configuration.

Use the Upload Offline Triage to upload archives containing forensic data collected by the offline collector. After the archive has been uploaded, the data is extracted and ingested into the forensics table on the tenant. Upload Offline Triage supports uploading packages created on both the Windows and macOS platforms..

1.  In Cortex Cloud, select Investigation & Response → Forensics.
    
2.  Click the link of the relevant investigation.
    
3.  When in the Collections page, search for or select the triage and click the menu options button () to select Upload Offline Package.
    
4.  Drag and drop or use the browse link to search for the file. More than one offline triage package can be uploaded at a time.
    
    **Note:**
    
    Do not upload memory images captured by the Offline Triage Collector. These images are collected for analysis using third-party tools and are not intended for upload.
    
5.  Click Done.

###### Offline triage collection

Offline triage collection is supported for endpoints with no network connection or no Cortex XDR agent currently installed.

The Forensics add-on provides a triage collection option for endpoints with no network connection or no Cortex XDR agent currently installed.

Note that the procedure differs between Windows, macOS, and Linux.

###### Windows

1.  Select Investigation & Response → Forensics.
    
2.  Click the investigation link and from the Collections tab, find the triage and click the menu options button ()/ Depending on the system type of the endpoint, select Download 32-bit Collector or Download 64-bit Collector .
    
3.  Copy the downloaded file to a location accessible from the targeted endpoint.
    
4.  From the endpoint, open the folder containing the offline triage collector and right-click on the executable file cortex-xdr-payload.exe and select `Run as administrator`.
    
    The `cortex-xdr-payload.exe` opens a command window that displays the status of each artifact collection.
    
    After the collection is completed, a zip file with the hostname and a timestamp in the file name is created in the same directory as the executable.
    
5.  From the Collections page, select the triage and click the menu options button () and select Upload Offline Package.
    
6.  In the Import Offline Triage dialog, browse for or drag and drop the zip file, and click Done.
    
    The triage file is ingested, and the results are available for review.
    
    **Note:**
    
    Security software running on the endpoint (including the Cortex agent) can interfere with or block the execution of the offline triage collector. Disable any security software on the endpoint while the collector is running, or whitelist the collector in your security software before running the offline triage collector.
    

###### macOS

1.  Select Investigation & Response → Forensics.
    
2.  Click the investigation link and from the Collections tab, find the triage and click the menu options button () and select Download Collector.
    
3.  Open the folder containing the zip file and run the command `xattr -c <triage_configuration_name>.zip` to remove any extended attributes that macOS might have applied to the file.
    
4.  Copy the downloaded zip file to a destination that is accessible from the targeted endpoint.
    
5.  From the endpoint, open the folder containing the offline triage collector and run the cortex-xdr-payload.exe file, or from a command line, enter: `sudo cortex-xdr-payload`.
    
    After the collection is completed, a zip file with the hostname and a timestamp in the file name is created in the same directory as the executable.
    
6.  From the Collections page, select the triage and click the menu options button () and select Upload Offline Package.
    
7.  In the Import Offline Triage dialog, browse for or drag and drop the zip file, and click Done.
    
    The triage file is ingested, and the results are available for review.
    
    **Note:**
    
    Security software running on the endpoint (including the Cortex agent) can interfere with or block the execution of the offline triage collector. Disable any security software on the endpoint while the collector is running, or whitelist the collector in your security software before running the offline triage collector.
    

###### Linux

1.  Select Investigation & Response → Forensics.
    
2.  Click the investigation link and from the Collections tab, find the triage and click the menu options button () and select Download x86 Collector or Download ARM64 Collector.
    
3.  Copy the downloaded zip file to a destination that is accessible from the targeted endpoint.
    
4.  From the endpoint, open the folder containing the offline triage collector and run the cortex-xdr-payload file, or from a command line, enter: `sudo ./cortex-xdr-payload`.
    
    After the collection is completed, a zip file with the hostname and a timestamp in the file name is created in the same directory as the executable.
    
5.  From the Collections page, select the triage and click the menu options button () and select Upload Offline Package.
    
6.  In the Import Offline Triage dialog, browse for or drag and drop the zip file, and click Done.
    
    The triage file is ingested, and the results are available for review.
    
    **Note:**
    
    Security software running on the endpoint (including the Cortex agent) can interfere with or block the execution of the offline triage collector. Disable any security software on the endpoint while the collector is running, or whitelist the collector in your security software before running the offline triage collector.

###### Triage results

You can drill down from the triage collection to review the results.

The Triage collection results page provides an overview of the different types of triage collections initiated on an endpoint.

The triage results page is divided into the following tabs:

-   Artifacts: Display all of the artifact categories collected. Refer to Hunt Results for more information on the artifacts.
    
-   Host Timeline: Displays a list of normalized, per-host timelines that include multiple forensic artifacts in a single table.

###### Triage status

From the Actions table, you can view the search status of all the artifacts for the triage.

You can drill down to the Actions table from the status link of the triage to view the search the status of all the artifacts for the triage.

| Field | Description |
| --- | --- |
| Endpoint name | Agent hostname. |
| Endpoint ID | Agent unique ID. |
| Action ID | Unique identifier for this agent action. |
| Type | Type of collection. Example: `Amcache, File Collection, Event Logs` |
| Path | Path for files, registry path for registry artifacts. |
| Status | Displays one of the following statuses of the search: Pending: agent action sent; In progress: SAM not sent; Results received: received SAM results; Timeout: SAM timed out; Ingesting: Ingestion started; Uploaded: data received, but not parsed; Ingested: ingestion completed; Partially ingested: ingested with errors; Failed: ingestion failed |
| Details | Shows the detailed output from the ingestion script. Example: `Ingested X of Y records` |
| Collected | Time the data was collected. |
| Download expiration | Time when bucket data (raw files) is to be deleted. |
| Preset | Name of the triage configuration. |
| Collection Type | Collection type. |
| Triage ID | Unique ID associated with this triage data. |

###### Configure collection
On the configuration page, select the relevant categories and artifacts for collection.

###### Configuration for collection

**Note:**

When search fields are specified, the search is limited based on those filters. If more than one entry is in a search filter field, the search returns entries that match any of them. For example: A File Search with two specified paths ("C:\\Test\\\*" and "C:\\Windows\\\*") will return results from both the Test and Windows folders.

If you specify multiple search fields, the search returns entries that match all the selected criteria. For example: A File Search with one path ("C:\\Test") and one size filter (">= 100MB") will return results from the Test folder that are greater than or equal to 100 megabytes.

Not all artifacts within an artifact category support the same search fields. If an artifact does not support one of the specified fields, then that filter is not applied to the search results. For example, in Windows, a Process Execution search with the search field User Name="jsmith" will filter the CidSizeMRU, LastVisitedPidlMRU, and UserAssist artifacts for that user name. That user name will not filter results from the Amcache, Prefetch, and Shimcache artifacts because those artifacts do not have a User Name field.

You can create a search query by adding any of the following artifacts available for both triage and hunt collections:

| Category from Hunt Collection | Default Timeout | Artifacts collected from endpoint(s) \*\*Note:\*\* Data collected during a Triage Collection is categorized into Artifacts, Volatiles, and File Collection | Supported Filters |
| --- | --- | --- | --- |
| Archive History (Windows only) | 60 minutes | (Windows) 7-Zip Folder History: A registry key containing a list of archive files accessed using 7-Zip.; (Windows) WinRAR ArcHistory: A registry key containing a list of archive files accessed using WinRAR. | File Name: regular expression (case-insensitive) Example: [0-9A-F]{8}\\.exe; File Path: path (wildcards ? \* \*\* supported) Example: C:Windows\\Temp\\\*\*\\\*.exe |
| Browser History | 60 minutes | (Windows, macOS) Chrome; (Windows, macOS) Chromium-Based; (Windows, macOS) Firefox; (Windows) Edge-Anaheim; (Windows) Edge-Spartan; (Windows) Internet Explorer; (macOS) Quarantine; (macOS) Safari | URL: goog\*.\\.com; History File Path: path (wildcards ? \* \*\* supported) Example: C:\\Users\\\*\\AppData\\Local\\BraveSoftware\\Brave-Browser\\\*\\History |
| Command History | 60 minutes | (Windows) PSReadline: A record of commands typed into a PowerShell terminal by the user. The history file is enabled by default, starting with PowerShell 5 on Windows 10 or newer.; (macOS) Shell History: Commands recorded to the history files for Bash and Zsh shells. | Search Regex: regular expression (case-insensitive) Example: [0-9A-F]{8}\\.exe |
| Deleted Files (Windows only) | 180 minutes | (Windows) Recycle Bin: A Folder used by Windows as temporary storage for deleted files before permanent deletion. | File Name: regular expression (case-insensitive) Example: [0-9A-F]{8}\\.exe; File Path: path (wildcards ? \* \*\* supported) Example: C:Windows\\Temp\\\*\*\\\*.exe; User Search: User SID or User Name selector. Example: ACME\\jsmith |
| File Access | 60 minutes | (Windows) Jumplists: A feature of the Windows Taskbar that provides shortcuts to users for recently accessed files or applications.; (Windows) OpenSavePidlMRU: A registry key containing a list of recently opened and saved files for a user’s account.; (Windows) Recent Files: Contents of the shortcut (.lnk) files found in a user's Recent folder. These files represent files recently accessed for a user account.; (Windows) ShellBags: Registry keys that record user layout preferences for each folder with which the user interacts.; (Windows) TypedPaths: A registry key containing a list of paths that the user typed into the Windows Explorer path bar.; (macOS) Recent Documents: Plist files located within a user's Library directory that contain a list of documents accessed by that user. | Target File Name: regular expression (case-insensitive) Example: [0-9A-F]{8}\\.exe; Target File Path: path (wildcards ? \* \*\* supported) Example: C:Windows\\Temp\\\*\*\\\*.exe; User Search: User SID or User Name selector. Example: ACME\\jsmith |
| File Search | 180 minutes | (Windows, macOS) File Search: Search for a file across endpoints by specifying a file path that can include wildcards, and then filter those results based on the file size, the file name (supports regular expressions), or file hash (MD5, SHA1, or SHA256). | File Path: path (wildcards ? \* \*\* supported) Example: C:Windows\\Temp\\\*\*\\\*.exe; File Name: regular expression (case-insensitive) Example: [0-9A-F]{8}\\.exe; File Hash: Supports MD5, SHA1, and SHA256. Example: f9d9b9ded9a67aa3cfdbd5002f3b524b265c4086c188e1be7c936ab25627bf01; Size Example: >= 100 MB |
| Log Search | 180 minutes | (Windows) Event Log: A component of Microsoft Windows, where the user can view a record of events that occurred within a system or process.; (macOS) Apple Unified Logs: Predicate is a custom filter component for Apple Unified Logs. | Event Log Channel: Does not support wildcards. Example: Security; Event ID: Example: 4624; Providers: Does not support wildcards. Example: Security; Message: regular expression (case-insensitive) Example: [0-9A-F]{8}\\.exe; Predicate: Custom filter component for Apple Unified Logs. Example: eventType=logEvent AND eventMessage Contains abc |
| Network Data | 60 minutes | (Windows) ARP Cache: A cache of Address Resolution Protocol (ARP) records for resolved MAC and IP addresses.; (Windows) DNS Cache: A cache of Domain Name System (DNS) records for resolved domains and IP addresses.; (Windows, macOS) Hosts File: Listing of entries from the etc/hosts file.; (macOS) Recent Places: A plist file located within a user's Library directory that contains a list of recently accessed servers and hosts. | IP Address: IPv4 or IPv6 addresses. Example: 10.0.0.5; Domain: regular expression (case-insensitive) Example: goo.\*\\.com; Path: path (wildcards ? \* \*\* supported) Example: /Volumes/VMware\*; User Search: User SID or User Name selector. Example: ACME\\jsmith |
| Persistence | 60 minutes | (Windows) Drivers: Windows device drivers installed on each endpoint.; (Windows) Registry Persistence: A collection of registry keys that can be used for malware persistence.; (Windows) Scheduled Tasks: Tasks used to execute Windows programs or scripts at specified intervals.; (Windows) Services: Windows applications that run in the background and do not require user interaction.; (Windows) Shim Databases: Databases used by the Application Compatibility Infrastructure to apply shims to executables for backwards compatibility. These databases can be used to inject malicious code into legitimate processes and maintain persistence on an endpoint.; (Windows) Startup Folder: Contents of the shortcut .lnk files found in the Startup folder for both the system and users. The folders are used to launch applications during system startup or user logon.; (Windows) WMI Persistence: List of WMI EventConsumers and any EventFilters that are bound to them using a FilterToConsumerBinding. WMI EventConsumers can be used for fileless malware persistence.; (macOS) Cron: A system utility that executes programs or scripts at specified intervals.; (macOS) Launchd: Listing of applications and daemons configured to launch using the launchd process.; (macOS) Login Items: Plist files that contain applications, files, or folders configured to launch during user login. | Registry Path: path (wildcards ? \* \*\* supported) Example: HKEY_USERS\\\*\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\\*; Executable Path: path (wildcards ? \* \*\* supported) Example: C:Windows\\Temp\\\*\*\\test.exe; User Search: User SID or User Name selector. Example: ACME\\jsmith; SHA256: Supports SHA256 hashes. Example: f9d9b9ded9a67aa3cfdbd5002f3b524b265c4086c188e1be7c936ab25627bf01; Command: regular expression (case-insensitive) Example: /bin/sh /private/etc/periodic/weekly/.\* |
| Process Execution | 60 minutes | (Windows) Amcache: A registry hive used by the Application Compatibility Infrastructure to cache the details of executed or installed programs.; (Windows) Background Activity Monitor: Per-user registry keys created by Background Activity Monitor (BAM) service to store the full paths of executable files and a timestamp, indicating when they were last executed.; (Windows) CidSizeMRU: A registry key containing a list of recently launched applications.; (Windows) LastVisitedPidlMRU: A registry key containing a list of the applications and folder paths associated with recently opened files found in the user’s OpenSavePidMRU key.; (Windows) Prefetch: A type of file created to optimize application startup in Windows. These files contain a run count for each application, between one and eight timestamps of the most recent executions, and a record of all the files opened for a set duration after the application was started.; (Windows) Recentfilecache: A cache created by the Application Compatibility Infrastructure to store the details of executed or installed programs (Windows 7 only).; (Windows) Shimcache: A registry key used by the Application Compatibility Infrastructure to cache details about local executables.; (Windows) UserAssist: A registry value that records a count for each application that a user launches via the Windows UI.; (Windows) Windows Activities: A database containing user activity for a particular Microsoft user account, potentially across multiple devices. This is also called the Windows Timeline.; (macOS) CoreAnalytics: A diagnostic log that contains details of files executed on the system.; (macOS) Recent Applications: A plist file located within a user's Library directory that contains a list of applications opened by that user. | Executable File Name: regular expression (case-insensitive) Example: [0-9A-F]{8}\\.exe; Executable Path: path (wildcards ? \* \*\* supported) Example: C:Windows\\Temp\\\*\*\\test.exe; User Search: User SID or User Name selector. Example: ACME\\jsmith; SHA256: Supports SHA256 hashes. Example: f9d9b9ded9a67aa3cfdbd5002f3b524b265c4086c188e1be7c936ab25627bf01 |
| Registry Search (Windows only) | 180 minutes | (Windows) Registry Search: Registry listings collected during Forensic investigation. | Path: path (wildcards ? \* \*\* supported) Example: HKEY_USERS\\\*\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\\*; Data: regular expression (case-insensitive) Example: [0-9A-F]{8}\\.exe |
| Remote Access (Windows only) | 60 minutes | (Windows) AnyDesk Connection Logs: Records of activity found in the AnyDesk connection logs.; (Windows) AnyDesk Trace Logs: Records of activity found in the AnyDesk trace logs.; (Windows) LogMein: Records of activity found in the LogMeIn event logs.; (Windows) TeamViewer: Records of incoming TeamViewer connections found in the Connections_incoming.txt file.; (Windows) User Access Logging: A Windows Server feature that records details about client access to the server. Only found on Windows Server 2012 and newer. | IP Address: IPv4 or IPv6 addresses Example: 10.0.0.5; User Search: User SID or User Name selector. Example: ACME\\jsmith |
| System Statistics (Windows only) | 60 - 120 minutes | (Windows) Application Resource Usage: A table in the System Resource Usage database that stores statistics pertaining to resource usage by running applications.; (Windows) Network Connectivity Usage: A table in the System Resource Usage database that stores statistics pertaining to network connections, containing the start time and duration of the connections for each network interface.; (Windows) Network Data Usage: A table in the System Resource Usage database that stores statistics pertaining to network data usage for running applications. Includes application path, network interface, bytes sent, and bytes received. | Application: path (wildcards ? \* \*\* supported) Example: C:Windows\\Temp\\\*\*\\test.exe; User Search: User SID or User Name selector. Example: ACME\\jsmith |
| User Searches | 60 minutes | (Windows) WordWheelQuery: Registry key containing a list of terms that a user searched for in Windows Explorer.; (macOS) Spotlights Shortcuts: A plist file that contains the Spotlight search terms entered by each user and the items that they selected from the search results. | User Search: User SID or User Name selector. Example: PANW\\jsmith; Search Regex: regular expression (case-insensitive) Example: [0-9A-F]{8}\\.exe |
| **Linux** |
| Core Linux | 60 minutes | Authorized Keys: Contains public keys that are permitted to log in as a specific user via SSH. Attackers can add their own keys to this file to gain persistent access to a system. | Comment: regular expression (case-sensitive) Example: tar\\cvzf.\* |
| Known Hosts: The known_hosts file stores the public keys of SSH servers that a user has connected to. This helps to verify the server's identity and prevent man-in-the-middle attacks by alerting the user if the server's key changes. | Host: IP or hostname (regular expression) Example: 4\\.2\\.2\\.\*, \*\\.google\\.com | | System Information: Provides fundamental hardware and system information, including manufacturer, model, UUID, and memory details. This helps identify and profile the system. | File Name: regular expression (case-sensitive) Example: [0-9A-F]{8} |
| Systemd Journal: | None required | | Running Processes: A detailed snapshot of running processes on the system. This includes process identifiers, user context, executable path, parent-child relationships, state, and performance metrics. It is a cornerstone artifact for live system analysis. | File Name: regular expression (case-sensitive) Example: [0-9A-F]{8}; Process Owner: Entries are either numeric UIDs or text usernames. Example: 1001; Path: file path Example: /usr/local/share/\*/bin/\* |
| Network Connections: Lists active network connections and listening ports. Essential for identifying unauthorized network communications, malware command and control (C2) channels, or unexpected listening services. | Local IP: IPv4 or IPv6 addresses Example: 10.0.0.5; Local Port; Local IP; Remote IP; Remote Port; Netstat Command Line; Netstat Process Name; Netstat Process Path | | Firewall Rules: Firewall rules (for example, from iptables) that control network traffic. Analyzing these rules is important for understanding the network security posture and identifying potentially malicious or overly permissive configurations. \*\*Note:\*\* Supported only for the UFW tool (Firewall managment tool for some Linux distributions such as Ubuntu) | Source: regular expression (case-insensitive) Example: [0-9A-F]{8}\\.exe; Destination: regular expression (case-insensitive) Example: [0-9A-F]{8}\\.exe |
| Kernel Modules: Lists kernel modules on the system, their state, and the associated file path. Malicious actors may use custom kernel modules (rootkits) to hide their presence or gain privileged access. | Module Name: regular expression (case-insensitive); Module Path: path | | Environment Variables: Lists environment variables for a given context (for example, a user's shell or a specific process). These variables define the execution environment and can contain important paths, configurations, or sensitive data. | Key: regular expression (case-sensitive); Value: regular expression (case-sensitive) |
| Mounted Filesystems: Lists all mounted file systems, their sources (devices), types, and unique identifiers. This is useful for discovering connected storage, network shares, and understanding the file system layout. | None required | | User Login & Session History: Records of user login sessions from the last command, showing who logged in, from where, and for how long. This is essential for auditing user access and investigating unauthorized logins. | User Login |
| Command History: Detailed records of commands from user shell history files (for example, bash_history, .zsh_history). This artifact is essential for tracking user activity and command execution. | Command:; Executed by: Entries are either numeric UIDs or text usernames. Example: 1001 | | Auditd Rules: Refers to the log data collected by the Linux Audit Daemon, which is a core component of security auditing. It records a detailed, chronological trail of system events based on a set of pre-configured rules. | Command:; Executed by: Entries are either numeric UIDs or text usernames. Example: 1001; Auditd Exe: |
| System-Wide Configuration: Key-value pairs parsed from various configuration files within the `/etc` directory, such as `/etc/resolv.conf` for DNS settings. This artifact helps understand the system's network and operational configuration. | Source: regular expression (case-insensitive) Example: [0-9A-F]{8}\\.exe | | File Listing: A plain text file used in digital forensics to create a detailed timeline of a file system activity. | File Name: regular expression (case-sensitive) Example: [0-9A-F]{8}; User Id: Entries are either numeric UIDs or text usernames. Example: 100001; Group Id: Entries are either numeric GIDs or text group names. Example: 0, 1 |
| Files & Processes: The artifact lists the files opened by the processes. This listing is essential for mapping a process directly to the files, loaded libraries, and network sockets it's using, which can immediately reveal hidden activities or active connections. | File Name: regular expression (case-sensitive) Example: [0-9A-F]{8}; User Id: Entries are either numeric UIDs or text usernames. Example: 100001 | | System Configuration Files: Shell profile files (for example, .bashrc, .profile) that contain commands and configurations executed at session startup. They are analyzed for persistence mechanisms, aliases, and malicious environment modifications. | None required |
| Service Status: Lists system daemons or services (for example, from systemd). Analyzing these is key to understanding which long-running processes are configured on the system and to spot malicious or unnecessary services. | File Name: regular expression (case-sensitive) Example: [0-9A-F]{8}; Path: file path Example: Example: /usr/local/share/\*/bin/\*; Command: |

##### Analysis and documentation

Learn more about your investigation by reviewing the additional data for analysis and documentation purposes.

Forensic investigations include additional data for analysis and documentation purposes.

-   Alerts
    
-   Forensics Timeline
    
-   Key Assets & Artifacts

###### Review alerts

The alerts table displays all the collections within the investigation that has identified suspicious or malicious activity within the forensics data sets.

The alerts table displays all the collections within the investigation that has identified suspicious or malicious activity within the forensics data sets.

The following actions are available for a selected alert.

-   Change status
    
-   Change severity
    
-   Investigate causality chain
    
-   Run playbook
    
-   Manage alerts

###### Investigation timeline

Investigation timeline shows the tagged forensic artifacts that were tagged. The tags display details of the forensic data collected from the endpoints.

The Timeline page enables you to view the list of forensic artifacts that were tagged. The tags display details of the forensic data collected from the endpoints.

The Timeline table displays the following fields:

| Field | Description |
| --- | --- |
| Hostname | Name of the host machine. |
| Timestamp | Timestamp associated with the artifact. |
| Type | Forensic artifact of which a tag was added. |
| Description | Name of the timestamp field. |
| Tags | There are three default tags to choose from. legitimate; malicious; suspicious You can also create your own tags. |
| User | User account associated with the forensic artifact. |
| Data | Data summary for the tagged item. |
| Mitre Att&ck Tactic | Displays the type of MITRE ATT&CK tactic of the tagged item. |
| Mitre Att&ck Technique | Displays the type of MITRE ATT&CK technique of the tagged item. |
| Notes | Displays notes entered by the user. |

1.  Edit a timeline entry:
    
    You can edit a tag of an artifact in the Timeline table.
    
    1.  Locate the relevant item to update the tag.
        
    2.  Right-click and select Edit timeline entry.
        
    3.  In Edit timeline entry, update the information as required and then click Save to update the changes.
        
2.  Clear a timeline entry:
    
    You can remove a tag from the artifact in the Timeline table.
    
    1.  Locate the relevant item to remove the tag.
        
    2.  Right-click and select Clear timeline entry. The tag is removed from the artifact and the row is removed from the Timeline table.

###### Key assets & artifacts

Displays the forensic investigation based on the tagged data and aligns it to the corresponding category.

Key assets & artifacts are automatically created based on the tagged data from the investigation timeline of the investigation and are divided among the categories:

-   Data Access: Displays all the items that have been tagged in the File Access tables.
    

The following table for Endpoints displays the endpoints that have at least one or more items tagged:

| Field | Description |
| --- | --- |
| Endpoint Name | Name of the endpoint. |
| Endpoint Type | Displays the endpoint type: Mobile; Server; Workstation; Kubernetes Node |
| Endpoint Status | Displays the status of the endpoint: Connected; Connected Lost; Deleted; Disconnected; Uninstalled; VDI Pending Login; Forensics Offline; Partial Registration |
| Earliest Activity | Timestamp of the earliest tagged item in the incident timeline for the endpoint. |
| Latest Activity | Timestamp of the last tagged item in the incident timeline for the endpoint. |
| IP Address | List of associated IP addresses. |
| IPv6 Address | List of associated IPv6 addresses. |
| First Seen | Timestamp of first seen. |
| Last Seen | Timestamp of last seen. |
| Endpoint Isolated | Displays the status of endpoint isolation: Pending Isolation Cancellation; Pending Isolation; Isolated; Not Isolated |
| Isolation Date | Isolation date of the endpoint. |

The following table for Malware shows all the items that have been tagged in the Process Execution or Persistence tables.

| Field | Description |
| --- | --- |
| File Name | Name of the artifact collected from the endpoint. |
| Path | Executable path. |
| Tags | Assigned tags to the artifact. |
| SHA256 | SHA256 value of the executable file. |
| Verdicts | WildFire verdicts. |
| User | User name of the person who ran the process. |
| Mitre ATT&CK Tactic | Tactic selected during tagging. |
| Mitre ATT&CK Technique | Technique selected during tagging. |
| Platform | Operating system of the endpoint: Windows; macOS; Linux; Android |
| Created | Creation timestamp of the file accessed. |
| Accessed | Accessed timestamp of the file accessed. |
| Modified | Modified timestamp of the file accessed. |

The following table forUsers displays any artifact data with a non-null user field that has been tagged.

| Field | Description |
| --- | --- |
| Username | Username of the person who ran the process. |
| Domain | Domain of the user's computer. |
| ID | Indicates the operating system: UID for macOS and Linux; SID for Windows |
| Earliest Activity | Timestamp of the earliest tagged item in the Incident Timeline for the user. |
| Latest Activity | Timestamp of the last tagged item in the Incident Timeline for the user. |

The following table for Network Indicators displays the event logs with the IP addresses that have been tagged.

| Field | Description |
| --- | --- |
| Indicator | Data field that was tagged. |
| Type | IP Address; Hostname; URL |
| Country | Geolocation data for IP addresses. |
| Flag | Flag of the geolocated country. |
| Organization | Organization associated with the IP address. |

The following table for Data Access displays all the items that have been tagged in the File Access tables.

| Field | Description |
| --- | --- |
| Path | Path of the accessed file. |
| User | User name of the person who accessed the file. |
| Created | Creation timestamp of the file accessed. |
| Accessed | Accessed timestamp of the file accessed. |
| Modified | Modified timestamp of the file accessed. |
| Size | Size of the file. |

##### Export

Select the export option to export data collection for long-term retention or offline analysis.

You can export the data collection for long-term retention or offline analysis.

From the collections page, choose a search item from a hunt collection or the endpoint from a triage collection and click the export icon (). For export of all items, select the Export All option from the Exports button at the top of the Collections page.

**Note:**

You can export a collection more than once.

To view the status of the export, click the Exports button.

The Investigation Exports table displays the status of the requested exports for the selected collection. The compressed export data expires from the bucket after 30 days.

| Field | Description |
| --- | --- |
| Collection name | Displays the name of the triage or hunt. For triage, the endpoint name of the triaged host is displayed. |
| Exported | Displays the time when the exported package was created (compressed). |
| Exported by | Displays the name of the user who requested the export. |
| Export expiration | Displays the timestamp of when the bucket data (compressed data) will be deleted. The timestamp changes to red after the timestamp and the last column shows _Expired_. |
| Status | Indicates how many tables from the collections have been successfully exported to a bucket. |
| Download button | Enables you to download the the compressed (zip) export of the collection. |
| Bin icon | Enables you to delete the compressed export file. |

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

### Research a known threat

Cortex Cloud enables you to investigate any threat, also referred to as a lead, which has been detected.

This topic describes the steps you can take to investigate a lead. A lead can be:

-   An issue from a non-Palo Alto Networks system with information relevant to endpoints or firewalls.
    
-   Users or hosts that have been reported as acting abnormally.
    
-   Information from online articles or other external threat intelligence that provides well-defined characteristics of the threat.
    

To research a known threat

1.  Use threat intelligence to build a Cortex Query Language (XQL) query using the Query Builder.
    
    For example, if external threat intelligence indicates a confirmed threat involving specific files or behaviors, search for those characteristics.
    
2.  Review and refine the query results by using filters and running follow-up queries to find the information you are looking for.
    
3.  Select an event of interest, and open the Causality view.
    
    Review the chain of execution and data, navigate through the processes on the tree, and analyze the information.
    
4.  Open the Timeline to view the sequence of events over time. If deemed malicious, take action using one or more of the response actions.
    
5.  Inspect the information again, and identify any characteristics you can use to create a BIOC or correlation rule.
    
    If you can create a BIOC or correlation rule, test and tune it as needed. For more information, see Create a correlation rule and Create a BIOC rule.Create a correlation rule
