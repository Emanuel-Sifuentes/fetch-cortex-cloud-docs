# Review and report your security posture and progress

## Monitor dashboards and reports

### About dashboards

Learn more about dashboards, which help you to monitor system activity and security operations in your environment.

Dashboards help you monitor system activity and security operations in your environment. Each dashboard consists of widgets that summarize information about your tenant's activities in a graphical or tabular format, enabling you to effectively monitor your cases and overall activity in your environment.

When you sign in to Cortex Cloud, your default dashboard is displayed. To change the displayed dashboard, you can select from the list of predefined and custom dashboards using the dashboard menu, or manage them centrally from the Dashboard Manager.

On each dashboard, you can see the selected Time Range on the right side of the header. To see the last updated status for each widget, hover over a widget and if required, Refresh the data. You can also select widget specific time frames from the menu on an XQL widget.

Predefined dashboard filters are displayed in the dashboard header. A filter icon on a widget indicates that the widget data is filtered. Hover over the icon to see details of the filters applied.

Click the dashboard menu to see additional actions, including the option to save the dashboard as a report template, set it as your default dashboard, and pause automatic dashboard refresh.

#### Types of dashboards

Cortex Cloud provides the following types of dashboards:

-   **Command Center dashboards**: These are system-provided dashboards that offer interactive, high-level overviews of system status, data ingestion, and security operations with built-in drilldowns. These dashboards are not editable. For more information, see Command Center dashboards.
    
-   **Predefined dashboards**: These are read-only dashboards tailored for common use cases and system setups to assist in both security operations and posture management. These dashboards provide immediate visibility into various aspects of your environment, including active threats, asset risk levels, and data ingestion health. You can create reports and custom dashboards that are based on predefined dashboards. For more information, see Predefined dashboards.
    
-   **Custom dashboards**: These are user-defined dashboards that provide the flexibility to design views according to your own specifications. You can base custom dashboards on the predefined dashboards or create a new dashboard from scratch, and save your custom dashboards as reports. Ownership and access for these dashboards are managed through the Share or Manage Access options in the Dashboard Manager. For more information, see Build custom dashboards and reports.
    

#### Manage your dashboards

You can view and manage all predefined and custom dashboards from the Dashboard Manager. The actions you can perform on a dashboard depend on its visibility status and the permissions granted to your role.

**Important:**

The ability to create, edit, or share custom dashboards is governed by access management. If certain options are unavailable, contact your administrator. For more information, see Manage access to custom dashboards.

From the Dashboard Manager, you can take the following actions:

-   **Manage visibility**: Custom dashboards can be set to either Public or Restricted.
    
    -   Public: Visible to all users with appropriate role permissions to view dashboards.
        
    -   Restricted: Visible only to the dashboard Owner and the specific users or user groups who have been granted explicit access through sharing.
        
    
-   **Create, edit, and delete custom dashboards**: You can build new dashboards to suit your specific needs. While you cannot edit predefined dashboards, you can save them as a new custom dashboard to use as a starting template. Restricted dashboards can be viewed and edited by the Owner and any users or user groups granted explicit access. Yet, only the Owner (the creator) or an administrator can delete a custom dashboard.
    
-   **Manage access**: If permitted by your administrator, you can share custom dashboards you own with other users or user groups, granting them either Viewer or Editor permissions. Dashboards can be shared with users, user groups, and API keys.
    
-   **Select your default dashboard**: Set any available dashboard as the primary view when you log in.
    
-   **Create report templates**: Use a dashboard layout as the basis for a scheduled report.
    
-   **Import and export dashboards**: Administrators can import and export dashboards in a JSON format, which enables transferring configurations between environments for onboarding, migration, backup, and sharing. It's also possible to bulk export and import multiple dashboards at a time.
    
    **Note:**
    
    -   Dashboards that are based on custom infrastructure cannot be exported.
        
    -   When importing a dashboard that already exists in the system, the imported dashboard overwrites the existing dashboard. To avoid overwriting the existing dashboard, duplicate and rename the existing dashboard before importing the new dashboard.
        
    

#### Dashboard sharing icons

The following icons in the Dashboard Manager (under the Source column) help you identify the security access and status of your dashboards:

-   :
    
    -   A Restricted custom dashboard you created (Owner) that is not currently shared with anyone else.
        
    -   A custom dashboard you created that is currently shared with other users or user groups.
        
    
-   : A custom dashboard created by another user that has been shared with you (either individually or through a user group).
    
-   : A standard system dashboard provided by Palo Alto Networks. These are always Public and can't be deleted, or have their ownership transferred.

#### Command Center dashboards

Learn more about Command Center dashboards, which are system-provided dashboards.

Command Center dashboards are system-provided dashboards that offer interactive, high-level overviews of your security operations, data ingestion, and system status. From the Command Center dashboards, click on elements of interest to drill down to additional dashboards and associated pages.

These dashboards are read-only and are provided by Palo Alto Networks to ensure instant visibility into your environment. Because these are system-provided dashboards, they are always Public and visible to all authorized users. Palo Alto Networks also provides regular updates to these dashboards to ensure they reflect the latest system capabilities.

**Note:**

-   Access to these dashboards requires RBAC permissions under Dashboards & Reports. The Dashboards component must be Enabled in your role and requires View permissions for Command Center Dashboards. If certain options are unavailable, contact your administrator. For more information, Manage access to custom dashboards.
    
-   The dashboards are available in dark mode only. They are not editable, and you can't create dashboard templates or reports from them.
    
-   Some of the dashboard’s animations are not fully supported by the Safari web browser. We recommend that you view the dashboard with an alternative web browser.

##### Cortex Agentic Assistant dashboard

See a dynamic overview of how AI Agentic technology is utilized across your organization.

**Danger:**

The Cortex Agentic Assistant is only available after it is enabled, and for tenants in certain regions. For more information, see Cortex Agentic Assistant.

The **Cortex Agentix Assistant** dashboard enables you to view how Cortex Cloud uses AI Agentic technology to power your SOC. Use this dashboard to identify key areas of utilization and find opportunities to drive greater adoption and optimize your automation strategies.

Because this is a system-provided dashboard, it is Public by default and visible to all authorized users. It cannot be edited, deleted, or have its ownership transferred.

**Note:**

Access to this dashboard requires RBAC permissions under Dashboards & Reports. The Dashboards component must be Enabled in your role and requires View permissions for Command Center Dashboards. If certain options are unavailable, contact your administrator. For more information, see Manage access to custom dashboards.

The primary information displayed on the Cortex Agentix Assistant dashboard is listed below. Start exploring the dashboard by clicking on each element to view a pop-up containing detailed metrics and usage information:

-   Pre-configured Triggers: Playbooks that were triggered by automation rules. Clicking on Pre-configured Triggers shows how many rules were triggered and the top automation rules. For more information about rule-based automation, see Create an automation rule.
    
-   User Prompts: Clicking on User Prompts shows the number of users who created the user prompts and usage over the past seven days.
    
-   Agent Grid: The grid shows the five AI agents that users engaged with most frequently in the past seven days. Clicking on an agent opens the agent card, which provides more details about the roles that can access the agent and the actions available to the agent. Other Agents represent all other enabled agents, such as system and custom agents. Clicking on Other Agents brings to you the Agentix Hub, where you can view all agents.

##### Cloud Security Operations

###### Cloud Security Operations
The Cloud Security Operations dashboard helps you rapidly assess your security posture and resolve issues with the largest impact. As a security architect or engineer, you can leverage the dashboard to assess the efficiency with which your team responds to security issues on an ongoing basis, without spending any extra time gathering and grouping issue details, identifying owners, and kickstarting the remediation process. Contextual views also link to other areas of the Cortex Cloud platform for a deeper security context. With the Cloud Security Operations dashboard, you can:

-   Reduce noise and maximize impact: Use the dashboard’s curated views to focus on the most important issues prioritized by criticality and impact, and tasks that maximize the output of your efforts.
    
-   Improve situational awareness and visibility: The dashboard interface helps you learn about your security estate, identify security gaps, and track progress against key performance indicators such as Issue Burn Down and Mean Time To Remediation (MTTR)
    
-   Customize your view: The dashboard provides a default view for each of the widgets while giving you the option to customize views to capture the insights you need.
    

**Note:**

Command Center data may not match the counts on the Issues page, and you may observe inconsistencies. This is because dashboard data is a snapshot of issues identified, whereas the Issues page provides the most up-to-date view of risks across your cloud assets. In addition, the Issues pages do not support all the currently available filters on the Command Center dashboard.

###### Dashboard Widgets
The Cloud Security Operations dashboard provides the widgets described below to help you rapidly remediate the issues that require immediate attention.

| **Widget** | **Description** |
| --- | --- |
| Posture Issues Resolved | Provides a count of the total number of Posture issues you have resolved over the selected time period across all issue categories and compares it with the number of issues resolved over the previous equivalent time period. By default, the count reflects the number of Critical and High severity issues you have resolved over the last 7 day period, while the percentage change indicates the relative change from the previous 7-day period. Issues are based on rule violations on a specified scope of resources. Select any portion of the issues highlighted to see a list view of resolved issues. |
| Open Posture Issues | Provides a cumulative snapshot count of the total number of Posture issues that remain unresolved in your environment and tracks the relative change in this count over the selected time frame. By default, the count reflects the total number of Critical and High severity issues still unresolved in your environment, while the percentage change indicates the relative change in this count over the last 7 days. Select the **Related Posture Cases** donut chart to see Critical and High issues grouped into remediable Posture Cases. The displayed count shows you the number of Open Issues that can be addressed by resolving the corresponding Posture Case category. Choose from one of the time-ranges specified in the filter options to narrow your search. |
| Open Posture Issues by Age | Provides a total count of unresolved Posture issues sorted by the time period since they first originated in the system. Select any time range to view a detailed list of Issues defined by how long they have remained unresolved. |
| Posture Issue Burndown | Provides a trendline of the total number of open and resolved Posture issues over time across all issue categories. By default, the trendlines track the number of open and resolved issues over the last 7 days. This daily point in time snapshot captured can be adjusted by severity level. Select the filter option to narrow issues displayed by Issue Type (Attack Paths, Configuration, Data etc.) or Time Range. |
| Mean Time to Remediation Issues (MTTR) | Provides a graphical view of the Mean Time to Remediation (MTTR) for issues across all categories, within the Posture domain, over a selected time range. By default, the chart displays the MTTR trends for Critical and High severity issues, as well as, the combined MTTR across both severities over the last 7-day period. Switch to the table view to compare the 7-day average MTTR with the average across the previous 7-day period. The severity level displayed in the list view is set by the levels selected in the global filter. This can be adjusted on the **View MTTR Insights** side-panel. The **View MTTR Insights** side-panel also lists the top ten Accounts/Issues with the highest MTTR for further analysis. Select the filter option to narrow down issues displayed by Issue Type (Attack Paths, Configuration, Data etc.) or Severity. |
| Top 3 Posture Cases | Top 3 unresolved Posture Cases based on the count of Posture issues within the cases with domain as posture. Click on any Posture Case to be redirected to a detailed view of the case. Select the filter option to narrow down issues displayed by Posture Cases status or time range. Select **View All Posture Cases** to see a comprehensive list of all open Posture Cases containing Crttical and High severity Issues. |
| Open Posture Issues by Type | Provides a breakdown of all open Posture issues listed by all applicable Issue Type (Attack Paths, Configuration, Data, Code, etc.) and Severity. Click on any issue to be redirected to the Issues view. Select the filter option to narrow down issues by a specific time range. You can also toggle between graph and table view here. |
| Top Impacted Assets | Displays the top five assets with the highest number of Posture issues. Additional account and asset details are also provided. Click on any asset to view more details in the Assets side panel. Assets can be filtered by type, category, and time range. Graph and table toggle is also available to customize your view |
| Top Impacted Accounts | Lists the account with the highest number of unresolved Posture issues, sorted by issue count and broken down by severity. Select a filter to narrow your search by time range or issue type. |

**Note:**

The Last updated time indicated on each widget may differ as widget data is gathered at varying intervals.

###### Generate Reports
You can also share Cloud Security Operations dashboard reports with stakeholders to keep them abreast of the security status of your cloud assets. Select the **Save as a report template** to create a shareable template. Next, navigate to **Report Templates** to Edit, Delete, or **Generate a Report** that can be scheduled for wider distribution.

###### Filter Options
Use one of the multiple filter options provided to further focus on the most impactful issues. Filter options include:

-   **Severity Filter:** Select a severity level from the drop-down to apply the filter globally across all widgets. Click **Run** to update all existing widgets to the selected severity level. Severity can also be adjusted individually at the widget level. Filter settings at the widget level are saved, global filters are however not saved.
    
-   **Time Range Filter:** By default the time range is set to 7 days. This can be updated to 24 hours, 7 or 30 days, and a Custom time frame and applied across all widgets.

##### Cortex Cloud Command Center

Introduction to the Cortex Cloud Command Center and its capabilities.

###### Overview

Cortex Cloud Command Center serves as your centralized landing experience designed to provide immediate visibility into your security posture and current environmental status. It presents a high-level summary of your account health, asset distribution, and assets at risk to help you get a snapshot of your compliance and vulnerability posture. Through a unified view of your security domains, you can monitor open threat cases and posture issues sorted by severity and impact. This interface provides direct pathways to your inventory searches, operational dashboards, graphs, and compliance reports while highlighting top-priority issues.

The following image shows the Cortex Cloud Command Center dashboard:

###### Interactive Navigation and Drilldown

All metrics, status indicators, and list items in Cortex Cloud Command Center are interactive. Selecting a high-level summary element opens a filtered view of the underlying data, allowing you to move from environmental overviews to your asset inventories, threat cases, or remediation workflows.

###### Environmental Health and Inventory

This section displays your cloud footprint and its operational status.

-   **Provider health summary**: You can monitor your account counts and percentage health across cloud providers to verify scanning status.
    
-   **Asset class distribution**: This view categorizes your infrastructure into classes such as AI, Compute, Identity, API, Data, and Network, displaying the total count and the number of your assets currently at risk.
    

###### Risk and Threat Analysis

These widgets centralize your active security investigations and prioritize your response efforts.

The Cortex case engine consolidates open issues into open cases, which are further analyzed and displayed as follows:

-   Active Threat Cases: This component displays your total open threat cases by severity and provides a trend analysis of your created and resolved cases
    
-   Posture Cases: You can review your Posture cases, categorized by severity, with indicators for available manual and automated remediations.
    

###### Prioritized Risk and Compliance Summaries

The lower sections of Cortex Cloud Command Center aggregate your high-impact risks and regulatory status to assist in cross-functional prioritization.

-   Vulnerability Summary: This section displays a quantitative count of unique risky vulnerability issues, categorized by critical and high severity, weaponized exploits, and available fixes.
    
-   Top Risky Vulnerabilities: You can access a prioritized list of specific vulnerabilities sorted by CVSS and EPSS scores, which includes the publish date and the number of your impacted assets for each entry.
    
-   Compliance Summary: This view provides your overall compliance score and a breakdown of your compliance standards by score.
    
-   Standards Status: You can monitor the specific assessment percentage for individual standards, such as ISO-27001, and see the total number of controls assessed within each framework.
    

In addition, navigation links are provided, enabling you to select Manage Vulnerabilities or View Compliance Center to transition from these summaries to your specialized management environments.

#### Predefined dashboards

Learn more about predefined dashboards, which are out-of-the-box dashboards providedby Palo Alto Networks.

Cortex Cloud provides predefined dashboards that display widgets tailored to the dashboard type. The dashboards can help you monitor different aspects of your environment. To access your default dashboard, select Dashboards & Reports → Dashboard. From the dashboard header, a drop-down menu lists all available predefined and custom dashboards. The available dashboards depend on your license type.

Since predefined dashboards are system-managed and cannot be edited or deleted, you can create your own copy of a dashboard by selecting Save as new. This allows you to edit the widgets and configuration from your own custom version while preserving the original one.

Access and visibility

Since these dashboards are provided directly by Palo Alto Networks, they follow a standard access model:

-   **Always Public**: These dashboards are always Public and visible to all authorized users. Unlike custom dashboards, you do not need to manage a list of who can see them.
    
-   **Role permissions**: Your visibility and access to these dashboards are set by your administrator through your user role. If you are unable to view specific dashboards or perform certain actions, contact your administrator to ensure your role permissions are configured correctly.
    
-   **Data scoping**: While the dashboard structure is public, the data you see within the widgets is automatically filtered based on your authorized data scope. For example, you will only see information for the asset groups you are permitted to view.
    

Available predefined dashboards

| Dashboard name | Description |
| --- | --- |
| Agent Management | Provides an overview of the deployed agents in your organization, their statuses and content versions, and a breakdown by OS type. |
| AI Security | The Cortex Cloud AI Security overview dashboard serves as the central hub for information on the AI ecosystem within the organization. It provides a comprehensive overview of AI security posture and is designed to help users quickly access relevant information. The layout and organization of the dashboard are tailored to guide you in understanding the AI environment and determining the next steps to take for effective AI governance. For more information, see What is Cortex Cloud AI Security?. |
| API security Management | Provides an overview of your API security landscape. You can view all the information and statistics applicable to threats and vulnerabilities of APIs across the cloud and services in your environment. Using this information, you can manage and implement security measures to safeguard the APIs running in your environment. The predefined dashboard for API security management, you can view data for: Risky API Funnel; Attack traffic over time; Attacks by region; Risks by severity over time; Total attacks per type; Asset count by sensitive data type; Number of APIs |
| Application Security | Provides an overview of application security posture with asset and code/pipeline issue insights. |
| Automation Insights | Provides a high-level overview of automation, focusing on issues automatically closed and execution trends. |
| Case Management | Provides a breakdown of the top cases and hosts in your environment, and an overview of the top case assignees. \*\*Note:\*\* Select the star in the right corner of a widget to filter the data for cases that match case-starring policies. A purple star indicates that the widget is displaying only starred cases. The starring filter is persistent and continues to show the filtered results until you clear the star. |
| Cortex Cloud Command Center | A central hub that provides a prioritized high-level summary of cloud accounts, provider scanning health, and asset distribution across all cloud providers, tracking progress over time with 90-day trends for Threat and Posture cases. For more information, see Cortex Cloud Command Center. |
| Cloud Security Operations | Provides an overview of your cloud security operations dashboard helps you rapidly assess your security posture and resolve issues with the largest impact. For more information, see Cloud Security Operations. |
| Data Security | Discover and visualize all your data assets across the different cloud services, which will help you understand where the sensitive data is, how it is used and how it is moving across the organization. For more information, see What is Cortex Cloud Data Security?. |
| Identity Security | You can use the Identity Security dashboard to ensure that your identity estate is fully covered from a security perspective. The Identity Security dashboard helps you perform actions such as monitoring your identity inventory, detecting the top critical issues and findings in your environment, identifying risky identities, discovering admins and admins at risk, and analyzing 3rd-party access. For more information, see What is Cortex Cloud Identity Security?. |
| KSPM | Provides insights into your Kubernetes environment, including clusters, assets, and resources. Receive critical security information related to vulnerabilities, malware, secrets, and other available scanners. Identify areas lacking protection and take action to secure your clusters. For more information on onboarding your Kubernetes environment, see Onboard the Kubernetes Connector. \*\*Note:\*\* Users can access all information on the dashboard when their user access is scoped to view All assets or assigned to the Instance Administrator role. Otherwise, users with granular scoping set to No assets or Select asset groups will have limited access to the dashboard. For more information on Scope-Based Access Control (SBAC), see Manage user scope.Manage user scope |
| My Dashboard | Provides an overview of the cases and MTTR for the logged-in user. |
| Troubleshooting Instances | Provides a detailed view of command and execution errors at the instance level, helping diagnose and resolve issues with specific integrations. |
| Troubleshooting Playbooks | Provides the ability to identify and resolve issues with playbooks and tasks through focused error analysis and runtime metrics. |

#### Reports

Create, edit, and customize reports in Cortex Cloud. Schedule reports with Cron expressions.

Reports contain statistical data in the form of widgets, which enable you to analyze data from inside or outside Cortex Cloud, in different formats such as graphs, pie charts, or text from information. After generating a report, it also appears in the Reports tab, so you can use the report again.

##### Report templates

View, import, export, create, and modify report templates

On the Report Templates page, you can view, delete, import, export, create, and modify report templates. You can also select and generate multiple reports.

### Build custom dashboards and reports

Custom dashboards and reports can support your day-to-day operations by providing options that are tailored to your unique workflow.

You can create custom dashboards and reports that are tailored to your unique workflow and support your day-to-day operations. With custom dashboards and reports, you have the flexibility to base your dashboard or report on an existing template, or build a new template from scratch.

Access and visibility

Your ability to view and manage dashboards and reports is based on your user permissions and the visibility status of the specific dashboard:

-   **Dashboard Manager**: This is the central repository for your visualizations. You can only access dashboards where you are the Owner, dashboards that have been explicitly shared with you (or your user group), or dashboards marked as Public.
    
-   **Role requirements**: To create or manage dashboards, your administrator must Enable the Dashboards component in your user role. The specific actions you can take, such as creating new dashboards or editing public ones, depend on the sub-permissions assigned to your role. For more information, see Manage access to custom dashboards,
    

Dashboard components

Dashboards and reports are built from widgets. You can drag any widgets from the Widget Library on to your dashboard or report and arrange them. Cortex Cloud provides predefined widgets for you to use. In addition, you can create custom widgets that are built on Cortex Query Language (XQL) queries or custom scripts and provide the flexibility to query specific data, and select the graphical format you require (such as table, line graph, or pie chart).

-   **Widget Library**: The Widget Library is the central repository for predefined and custom widgets and is intended solely for browsing and selecting widgets to add to a dashboard.
    
-   **Widget visibility**: Those with access to the Widget Library will only see widgets in the Widget Library that are Public or widgets that were created by you (Restricted). You cannot see Restricted widgets created by other users in the Widget Library, even if you have access to a dashboard containing those widgets.
    
-   **Inherited access**:
    
    -   If a custom dashboard is shared with you, you can see all widgets contained within that dashboard, but you will never have permission to view or edit those specific widgets in the Widget Library (unless you are the owner, administrator, or it's a public widget).
        
    -   If you don't have permission to edit a widget, create a copy of the widget.

#### Build a custom dashboard

Build customized dashboards to display and filter the information that is most relevant to you.

Build customized dashboards to display and filter the information that is most relevant to you. You can build custom dashboards based on predefined dashboard templates, or you can build a new dashboard from scratch.

By default, all new custom dashboards are Restricted and visible only to you (the Owner). Once created, you can use the Dashboard Manager to share the dashboard with specific users or groups, or make it Public to all authorized users.

1.  Select Dashboards & Reports → Dashboard Manager → New Dashboard, or in the Dashboard Manager right-click an existing dashboard and select Save as new.
    
2.  In the Dashboard Builder, under Dashboard Name, enter a unique name for the dashboard.
    
3.  Under Dashboard Type, choose a built-in dashboard template or a blank template, and click Next.
    
4.  (Optional) Change the toggle to Real Data to see how the dashboard looks with actual data from your environment.
    
5.  Add widgets to the dashboard. From the Widget Library, drag widgets on to the dashboard.
    
    **Note:**
    
    -   For agent-related widgets, you can apply an endpoint scope to refine the displayed data to only show results from specific endpoint groups. Select the menu on the top right corner of the widget, select Groups, and select one or more endpoint groups.
        
    -   For case-related widgets, you can refine the displayed data to only show results from cases that match a case starring configuration. A purple star indicates that the widget is displaying only starred cases. For more information, see Case starring.
        
    
6.  (Optional) Configure fixed filters and inputs.
    
    What are fixed filters and inputs?
    
    Add fixed filters to your dashboard to provide dashboard users with useful dashboard filters that are based on predefined or dynamic input values. Any defined filters are displayed in the dashboard header.
    
    Fixed filters are based on XQL widgets with dynamic parameters. If a dashboard contains these widgets, the Add Filters & Inputs option is displayed. For more information, see Configure filters and inputs for custom XQL widgets.
    
7.  (Optional for dashboards with custom XQL widgets) Configure dashboard drilldowns.
    
    What are dashboard drilldowns?
    
    Add drilldowns to your dashboard to provide interactive data insights when clicking on data points, table rows, or other visualization elements.
    
    Dashboard drilldowns are based on XQL widgets. To add a drilldown to an XQL widget, click on the widget menu, and select Add drilldown. For more information, see Configure dashboard drilldowns.
    
8.  Under Time Range, set a time range for your dashboard.
    
    By default, the widgets use the dashboard timeframe. You can change the widget timeframe from the widget menu.
    
9.  When you have finished customizing your dashboard, click Next.
    
10.  (Optional) To set the custom dashboard as your default view when logging in, select Define as default dashboard.
     
11.  Click Generate to complete your dashboard.

#### Manage your Widget Library

Create, search, and view custom widgets in Cortex Cloud, or use predefined widgets.

The Widget Library is the central repository where you can view, create, and manage all predefined and custom widgets. All of your predefined and custom widgets are available in the Widget Library under Dashboards & Reports → Widget Library.

The Widget Library displays predefined widgets and user-created custom Cortex Query Language (XQL) widgets.

From the Widget Library, you can select widgets to add to your dashboards or reports, or use existing widgets as templates for new ones. You can search for a widget by name, and use the filter to view only specific widget types. For example, you can filter for all widgets that use a certain chart type, or only view custom widgets you have created.

Access and visibility

Your ability to see and use widgets in the Widget Library is based on your user permissions and the visibility status of the widget:

-   **Public widgets**: These include all predefined system widgets and any custom widgets that have been marked as Public. These widgets are visible to all users in the Widget Library who have the appropriate permissions to view dashboards and widgets.
    
-   **Restricted widgets**: These are custom widgets that are visible only to the Owner (the creator) within the Widget Library.
    
    **Note:**
    
    Unlike dashboards, individual widgets cannot be shared with other users directly from the Widget Library. Yet, if you add a Restricted widget to a dashboard and then share that dashboard, other users who have access to the dashboard will also be able to see that specific widget.
    

Widget management actions

From the Widget Library you can take the following actions:

-   **Create custom widgets based on XQL search queries**: Build new widgets from scratch using Cortex Query Language (XQL). By default, all new custom widgets you create are Restricted and visible only to you. For more information see Create custom XQL widgets.
    
-   **Search for custom and predefined widgets**: Widgets are grouped by category for easier discovery.
    
-   **Edit or delete custom widgets**: You can modify or remove custom widgets that you own.
    
    **Note:**
    
    Any dashboards or reports that include the widget are affected by the changes.
    
-   **Manage visibility**: If you are the Owner of a custom widget, you can change its status from Restricted to Public. This makes the widget available in the Widget Library for all other users who have the required permissions. For more information, see Manage access to custom dashboards.

### Fine-tune dashboards and reports

Fine tune your custom dashboards and report by adding custom XQL widgets, fixed filters and inputs, and dashboard drilldowns.

You can fine-tune your custom dashboards and reports to tailor them to suit your specific needs.

The following dashboard features enhance the functionality of your dashboards, by refining the data displayed and enabling dashboard users to filter and manipulate the displayed data. Click on the tabs to see each feature.

Custom script widgets

Build custom widgets based on scripts, to display data from third-party systems. These widgets can display pie, column, and line charts, as well as single value results. A single value result can, optionally, be presented as a time duration. By default, new custom script widgets are Restricted and visible only to the creator in the Widget Library.

Custom XQL widgets

Personalize the information that you display on your custom dashboards and reports by creating custom XQL widgets and adding them to your dashboard. By default, new custom XQL widgets are Restricted and visible only to the creator in the Widget Library. These widgets can query specific information that is unique to your workflow, and define the graphical format you require (such as table, line graph, or pie chart). In addition, you can add variables to your custom XQL widget that provide dynamic input values for dashboard filters.

Fixed filters and inputs

Enable dashboard users to alter the scope of a dashboard by selecting from predefined or dynamic input values.

Dashboard drilldowns

Enable dashboard users to access interactive data insights when clicking on data points in widgets. Drilldowns can trigger contextual changes on the dashboard, or they can link to an XQL search, a custom URL, another dashboard, or a report. Users can hover over a widget to see details about the drilldown, and click a value to trigger the drilldown.

#### Create a custom widget using a script

Create a custom script based widget. Use custom widgets in dashboards and reports.

You can use scripts in custom widgets to create dynamic widgets for more complex calculations and to present data from third-party systems. For examples of creating widgets using scripts, see Script-based widget examples.

Before creating a script-based widget in the Widgets Library, you need to create or upload the script to the Scripts page. In the Widgets Library, you can change elements of the visual presentation. Because these widgets can contain unique logic or sensitive data queries, they are now managed as individual items with specific access rules.

Access and permissions

The ability to create and manage script-based widgets is determined by your role permissions and the widget's visibility:

-   **Creation rights**: To create a script-based widget, your user role must allow you to create scripts and build dashboards. These permissions are set by your administrator. For more information, see Manage access to custom dashboards.
    
-   **Widget Library visibility**:
    
    -   Restricted: New script widgets are Restricted by default. They are only visible to you within the Widget Library.
        
    -   Public: If you want other users to be able to find and reuse your script in their own dashboards, the widget must be set to Public.
        
    

How to create a script-based widget

1.  **Create the script**: Select Investigation & Response → Automation → Scripts. You can upload an existing script or create a new one. Cortex Cloud supports JavaScript, Python and PowerShell. You can create a script for one of the following chart types:
    
    -   Pie
        
    -   Column
        
    -   Line
        
    -   Single Value
        
    
2.  **Configure for the Widget Library**: In the Script Settings, add the widget tag to the script. This tag ensures the script is recognized as a visualization tool and becomes available in the Widget Library.
    
3.  **Create the Custom Script Widget**: Select Dashboards & Reports → Widget Library, click Create custom widget, and select Script.
    
4.  **Define the widget properties**:
    
    -   Name and Description: Give your widget a clear name so you can identify it later in the Widget Library.
        
    -   Script: Select the script you created in step 1 from the list.
        
        **Note:**
        
        If you have added arguments to the script, these appear when creating a widget.
        
    
5.  **Set visibility**: Use the Public widget toggle to determine how the widget appears in the Widget Library. Leave it unselected (default) to keep the widget Restricted (visible only to you) or select it to make the widget Public (visible to all users with Widget Library access).
    
6.  **Preview and save**: Run a preview to ensure the script executes correctly and displays the data as intended, then click Save.
    
7.  **Configure the display (Chart Editor)**: Use the Chart Editor to choose the graph type and the subtype, and to enable or disable the graph legend.
    
    **Note:**
    
    Available options are Pie, Column, Line, and Single Value.
    
    To display the result of the script as a time duration, choose the graph type Single Value and enable Show as Time. You can then select the Time Unit (millisecond, second, minute, or hour) and the Display format.
    
8.  **Add to reports or dashboards**: Once saved to the Widget Library, you can add this script-based widget to any custom dashboard or include it when building a report template.
    

Managing existing script widgets

You can manage your script widgets directly from the Widget Library:

-   **Reusability**: Any widget marked as Public can be searched for and added to any dashboard by other users.
    
-   Editing: Only the person who created the script widget (the owner) or an administrator can modify the underlying script code in the Automation section.

##### Script-based widget examples

Create script based widgets based on scripts for reports and dashboards in Cortex Cloud.

You can use script-based widgets to perform calculations on and visualize third-party data.

**Note:**

Add the widget tag in the script settings to make the script available for use in script-based widgets. For more information, see Create a script.

The following are sample Python scripts for the graph types Single Value, Pie, Line, and Column.

###### Single value

This example shows how to use a script with an API call to return a single value in a widget. Use this example to build your own script that pulls in third-party data to display a single value.

**Note:**

If your script returns a time duration, configure the widget with the graph type Single Value and enable Show as Time..

Example:

```
import requests

def main():
    api_key = 'PUTYOURKEYHERE'
    symbol = 'PANW'
    api_url = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={api_key}'

    response = requests.get(api_url)
    data = response.json()

    price_str = data['Global Quote']['05. price']
    price_int = int(float(price_str))

    return_results(price_int)

if __name__ in ('__main__', '__builtin__', 'builtins'):
    main()
```

###### Pie, Line, or Column Chart

Example 1

The following example script creates random, mock data to simulate a stock price fluctuating over a short period of time. Use this example to build your own script that brings in third-party data and display trends using a pie, line, or column chart.

```
import random
import json
from datetime import datetime, timedelta

def main():
    chart_data = []
    start_time = datetime.strptime("13:00", "%H:%M")

    # Start the price at a realistic value
    current_price = 202.0

    # Simulate 50 data points
    for i in range(50):
        # Generate a time label in 1-minute jumps
        time_label = (start_time + timedelta(minutes=i)).strftime("%H:%M")

        # Create the data point for the chart
        data_point = {
            "name": time_label,
            "data": [int(current_price)],
            "groups": []
        }
        chart_data.append(data_point)

        # Simulate the next price by adding a small change to the current price
        price_change = random.uniform(-1.5, 1.5) # A small drift up or down
        current_price += price_change

    # Return the data formatted exactly as in your working script
    return_results({
        "Type": 1,
        "ContentsFormat": "json",
        "Contents": json.dumps(chart_data)
    })

if __name__ in ('__main__', '__builtin__', 'builtins'):
    main()
```

When used in a widget:

Example 2

The following example script generates simulated data representing the count of security incidents (or other events) broken down by severity level for each day of the week (Monday to Friday). Use this example to build your own script to create a stacked column chart. Configure the widget with graph type Column subtype Stacked.

```
import json
import random

def main():
    chart_data = []
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    severities = ["Critical", "High", "Medium", "Low", "Info"]

    for day in days:
        groups_list = []
        daily_total = 0

        for severity in severities:
            count = 0
            if severity == "Critical":
                count = random.randint(0, 5)
            elif severity == "High":
                count = random.randint(5, 15)
            elif severity == "Medium":
                count = random.randint(10, 25)
            elif severity == "Low":
                count = random.randint(20, 50)
            else:
                count = random.randint(5, 30)

            daily_total += count
            groups_list.append({"name": severity, "data": [count]})

        chart_data.append({
            "name": day,
            "data": [daily_total],
            "groups": groups_list
        })

    return_results({
        "Type": 1,
        "ContentsFormat": "json",
        "Contents": json.dumps(chart_data)
    })
```

When used in a widget:

#### Create custom XQL widgets

You can create custom XQL widgets based on a Cortex Query Language (XQL) query, and add parameters that you can configure as fixed filters or dashboard drilldowns.

With custom Cortex Query Language (XQL) widgets you can personalize the information that you display on your custom dashboards and reports. You can build widgets that query specific information that is unique to your workflow, and define the graphical format you require, such as table, line graph, or pie chart.

All of your predefined and custom XQL widgets are available in the Widget Library. From the Widget Library, you can browse all widgets by category, create new XQL widgets, and edit and delete existing XQL widgets.

Access and visibility

-   **Role permissions**: Your visibility and access to these widgets are set by your administrator through your user role. For more information, see Manage access to custom dashboards.
    
-   **Visibility settings**: By default, custom XQL widgets are Restricted. They are visible to you in the Widget Library and on any dashboards you have shared. If you want other users to be able to find and reuse your widget from the Widget Library, you must set it to Public.
    
-   **Inherited access and reuse**:
    
    -   **Dashboards**: If you add a Restricted XQL widget to a dashboard and share that dashboard, authorized viewers and editors of that dashboard can see the widget data even if they cannot see the widget in their own Widget Library.
        
    

How to create a custom XQL widget

1.  Select Dashboards & Reports → Widget Library, click Create custom XQL widget, and select XQL.
    
2.  Enter a widget name and an optional description.
    
3.  Set the visibility for the widget.
    
    Use the Public widget toggle to determine how the widget appears in the Widget Library. Leave it unselected (default) to keep the widget Restricted (visible only to you) or select it to make the widget Public (visible to all users with Widget Library access).
    
4.  Define an XQL query that searches for the data you require.
    
    Select XQL Helper to view commonly used commands with example syntax. For more information, see How to build XQL queries.
    
    **Tip:**
    
    You can create a generic dashboard for multiple views of the same dataset by using an asterisk (\*) when defining the dataset in the XQL widget as `dataset = <dataset_name>*`. The placement of the asterisk in the dataset name ensures that any view containing this prefix text is displayed in the results.
    
    Example 82. 
    
    The dataset in a query is defined as:
    
    ```
    dataset = amazon_aws_raw\*
    ```
    
    If there are multiple datasets that begin with `amazon_aws_raw` in their name, such as `amazon_aws_raw_eu_view` and `amazon_aws_raw_us1_view`, these views will be included.
    
      
    
5.  Select Preview to review the search results.
    
    **Note:**
    
    Cortex Query Language (XQL) queries generated from the Widget Library do not appear in the Query Center. The results are used only for creating the custom widget.
    
6.  (Optional) Add parameters to the query to enable dashboard filters or drilldowns.
    
    You can use parameters to filter widget data on a dashboard or report, and create drilldowns on dashboards. Base your filters on fields and values in the query results.
    
    1.  In the search results, identify a field by which you want to filter.
        
    2.  Using the `filter` stage, define parameters prefixed with `$`.
        
    3.  To specify parameters with a single predefined value, use the `=` operator. To specify parameters with multiple values (predefined or dynamic), use the `IN` operator.
        
        Example of a single value parameter
        
        Example 83. Single value parameters
        
        The following query defines the `$domain` parameter for filtering dashboard data by domain, based on the `domain` field in the `agent_auditing` dataset.
        
        Single value parameters are based on static predefined values. In this example, the dashboard user will be able to select a domain from a list of predefined domains.
        
        ```
        dataset = agent_auditing | filter domain = $domain
        ```
        
          
        
        Example of a multiple value parameter
        
        Example 84. Multiple value parameters
        
        The following query defines the `$endpointname` parameter for filtering dashboard data by one or more endpoint names, based on the `endpoint_name` field in the `agent_auditing` dataset.
        
        You can configure this parameter with static predefined values, or dynamic values that are pulled from an XQL query.
        
        ```
        dataset = agent_auditing | filter endpoint_name IN ($endpointname)
        ```
        
          
        
    4.  (Optional) Under Assign Parameters (default values), define default values for the parameters. When you add the widget to a dashboard or report, the data will be automatically populated. Alternatively, you can configure all input values when you set up a dashboard or report.
        
7.  (Optional) Change the default time period against which to run your query from the time picker at the top right of the window. You can select the required Time frame from any of the following options available:
    
    -   Preset time ranges easily available to select from, such as 24 hours and 30 days.
        
    -   Recently used selections from your previous queries.
        
    -   Relative time: Define the time frame as the last <number> minutes, days, or hours by setting the number.
        
    -   Calendar: Create a customized time period by selecting the date range from the calendar and the specific Start Time and End Time.
        
    
    **Note:**
    
    -   Whenever the time period is changed in the query window, the `config timeframe` is automatically set to the time period defined, but this won't be visible as part of the query. Only if you manually type in the `config timeframe` will this be seen in the query.
        
    -   These time picker options are available in XQL queries when using the Query Builder, XQL Widgets, and when defining XQL Widgets in Reports and Dashboards.
        
    
8.  In the Query Results section, to graph the results either:
    
    Use Chart Editor
    
    Under Query Results → Chart Editor (), manually build and view the graph using the selected graph parameters:
    
    -   Main
        
        -   Graph Type: Type of graphs and output options available: Area, Bubble, Column, Funnel, Gauge, Line, Map, Pie, Scatter, Single Value, or Word Cloud.
            
            **Note:**
            
            To display the result of as a time duration, choose the graph type Single Value and enable Show as Time. You can then select the Time Unit (millisecond, second, minute, or hour) and the Display format.
            
        -   Subtype and Layout: Depending on the selected type of graph, choose from the available display options.
            
        -   Header: Title your graph.
            
        -   Show Callouts: Display numeric values on graph.
            
        
    -   Data
        
        -   X-axis: Select a field with a string value.
            
        -   Y-axis: Select a field with a numeric value.
            
        -   (Optional) Series: For an area, bubble, column, line, map, or scatter chart, you can specify a field (column) to group chart results based on y-axis values. This option is only displayed when one of the supported graph types are selected, and a single y-axis value is selected.
            
        
    -   Depending on the selected type of graph, customize the Color, Font, and Legend.
        
    
    Use XQL query
    
    Enter the visualization parameters in the XQL query section.
    
    You can express any chart preferences in XQL. This is helpful when you want to save your chart preferences in a query and generate a chart every time that you run it. To define the parameters, either:
    
    -   Define the following query:
        
        Example 85. 
        
        ```
        view graph type = column subtype = grouped header = “Test 1” xaxis = _time yaxis = _product,action_total_upload series = _vendor
        ```
        
          
        
    -   Select ADD TO QUERY to insert your chart preferences into the query itself.
        
    
9.  Save the widget.
    
    The custom widget appears in the list of existing widgets.

##### Configure filters and inputs for custom XQL widgets

Learn more about configuring fixed filters on your dashboards to enable dashboard users to alter the scope of the dashboard.

Define fixed filters on your dashboards to enable dashboard users to alter the scope of the dashboard by selecting from predefined or dynamic values. You can define filters with free text, single select, and multiple select input values. After configuration, anyone who views your dashboard can use the fixed filters in the dashboard header.

**Prerequisite:**

Fixed filters are based on parameters that are defined in custom XQL widgets. Before you can configure fixed filters, take the following steps:

1.  Create custom XQL widgets with parameters. For more information, see Create custom XQL widgets.
    
2.  Add the widgets to a custom dashboard. For more information, see Build a custom dashboard.
    

Access and visibility

-   **Role permissions**: Your ability to configure and use these filters is governed by your administrator through your user role. For more information, see Manage access to custom dashboards.
    
-   **Widget visibility**:
    
    -   **Restricted widgets**: If you add a Restricted XQL widget with parameters to a dashboard, only users with whom you have shared that dashboard can interact with its filters.
        
    -   **Inherited access**: When a dashboard is shared, authorized viewers can use the configured filters to narrow down the dashboard's results, even if they do not have direct access to the underlying XQL widgets in the Widget Library.
        
    

How to configure fixed dashboard filters

1.  Initiate the dashboard editor using one of the following methods:
    
    -   **From the Dashboard page**: Select Dashboards & Reports → Dashboard, click the ellipse menu (vertical ellipses) in the header, and select Edit dashboard.
        
    -   **From the Dashboard Manager**: Select Dashboards & Reports → Dashboard Manager, right-click the custom dashboard you want to modify, and select Edit.
        
    
2.  Click Add Filters & Inputs.
    
    **Note:**
    
    This option only appears if the dashboard contains custom XQL widgets with defined parameters.
    
3.  Under Parameter Title, enter a name that identifies the parameter for dashboard users.
    
4.  On the FILTERS & INPUTS panel, click +Add an input and select one of the following options:
    
    -   Single Select: To specify a single predefined value.
        
    -   Multi Select: To specify multiple predefined or dynamic values.
        
    -   Free text/number: To specify a single free text value.
        
    
    Guidelines
    
    -   Select an option that corresponds with the parameter configured in the XQL widget query. Parameters with single predefined or free text values use the `=` operator, and parameters with multiple values, use the `IN` operator.
        
    -   Predefined values are most suitable for filtering fields that have static values, such as status fields with a limited number of available options.
        
    -   Dynamic values help you to filter with values that change often. You can configure an XQL query that extracts all of the values that are available for that field. For example, in the `endpoints` dataset, the `endpoint_name` field values can change frequently.
        
    
5.  Click Parameter and select the specific parameter from your XQL widgets that you want to configure.
    
    **Note:**
    
    You can define up to four parameter filters on a single dashboard or report.
    
6.  If you selected Single Select or Multi Select values, click Dropdown Options and specify input values. When you generate the dashboard, these input values appear in a dropdown list for selection.
    
    -   To configure Predefined inputs for Single Select and Multi Select values, manually type the list values.
        
        Guidelines
        
        -   The values must support the parameter type. For example, for `$name` specify characters and for `$num` specify numbers.
            
        -   If you uploaded numbers in a string, specify each number in quotes, for example "500".
            
        
    -   To configure Dynamic inputs for Multi Select values, click XQL Query to fetch dynamic values.
        
        Guidelines
        
        In the XQL Query Builder, configure a query that includes the `field` stage and the name of the column from which to take the dropdown values. All values in the specified `field` will be available for selection, and the values are dynamically updated.
        
        Example 86. Example
        
        In this example, the endpoint_name field is configured. The dashboard user will be able to filter by one or more values from the `endpoint_name` field.
        
        `dataset =endpoints | fields endpoint_name`
        
          
        
        **Note:**
        
        If you specify more than one field, only the first field value is used.
        
    
7.  Under Default Value, select a value to ensure the widget is automatically populated when the dashboard is opened.
    
8.  Click Save Filters & Inputs and save your dashboard.
    
    **Tip:**
    
    After the initial setup, when you access your dashboard the filters and inputs might need further refinement. You can make changes to the configured parameters in the XQL widgets, and update the Filters & Inputs on your dashboard until you are satisfied with the results.

##### Configure dashboard drilldowns

Learn more about configuring drilldowns on custom dashboards providing interactive data insights when clicking data points in a widget.

**Prerequisite:**

To configure drilldowns your dashboard must contain custom XQL widgets. In addition, if you want to configure in-dashboard drilldowns your custom XQL widget must contain one or more parameters. For more information about configuring parameters in custom XQL widgets, see Create custom XQL widgets.

Dashboard drilldowns can trigger contextual changes on the dashboard, or they can link to an XQL search, a custom URL, another dashboard, or a report. You configure drilldowns on individual widgets. After a drilldown is configured, clicking the widget triggers the drilldown. You can configure a dashboard drilldown to enable users to investigate specific data points by clicking a widget. After configuration, any user with authorized access to the dashboard can use these drilldowns.

Access and visibility

-   **Role permissions**: Your ability to configure and interact with drilldowns is set by your administrator through your user role. For more information, see Manage access to custom dashboards.
    
-   **Inherited access**: Drilldowns respect the sharing settings of the dashboard. If you share a dashboard containing a drilldown that leads to a Restricted widget or a private query, the authorized viewers of that dashboard can still execute that drilldown and see the resulting data within the context of that dashboard.
    
-   **Target visibility**: If a drilldown is configured to open a different dashboard, the user must have at least Viewer access to that target dashboard to view it.
    

How to configure dashboard drilldowns

1.  Initiate the dashboard editor using one of the following methods:
    
    -   **From the Dashboard page**: Select Dashboards & Reports → Dashboard, click the ellipse menu (vertical ellipses) in the header, and select Edit dashboard.
        
    -   **From the Dashboard Manager**: Select Dashboards & Reports → Dashboard Manager, right-click the custom dashboard you want to modify, and select Edit.
        
    
2.  On the widget you want to use as the trigger, click the vertical ellipses and select Add Drilldown.
    
3.  In the Widget Drilldown dialog box, select the Action on Click:
    
    -   In-Dashboard Drilldown­: Interactively filters the dashboard data. Filters are based on the parameters defined in the custom XQL widgets on the dashboard.
        
        Define the following values:
        
        | Field | Action |
        | --- | --- |
        | Parameters | Select the parameter by which to filter. You can choose any parameter that is defined in the XQL query of the widget. \*\*Note:\*\* If the selected parameter is configured in other XQL widgets on the dashboard, these widgets are also affected by the drilldown. |
        | Value | When a user clicks the widget, the dashboard is filtered by this value. Type your own value.; Select a variable from which to capture the clicked value, for example, the $y-axis.value in a chart. For more information, see Variables in drilldowns. |
        
    -   Link to dashboard: Opens a target dashboard.
        
        Define the following values:
        
        | Field | Action |
        | --- | --- |
        | Dashboard | Select the target dashboard. |
        | (Optional) Parameter | Select parameters by which to filter the data on the target dashboard. Parameters are only available if there are parameters defined in the widgets on the _target_ dashboard. |
        | (Optional) Value | When a user clicks the widget, this value is configured as a parameter on the target dashboard. Type your own value.; Select a variable from which to capture the clicked value in the source dashboard, for example, the $y-axis.value in a chart. For more information, see Variables in drilldowns. |
        
    -   Open XQL Search: Runs an XQL query based on the clicked value.
        
        Define the following values:
        
        | Field | Action |
        | --- | --- |
        | XQL Query | Define the query that you want to run on drilldown. Type **`$`** to see autocomplete options for variables that are available in the widget drilldown. For example, in a table widget $first.name selects the leftmost column name in the table. For more information, see Variables in drilldowns. |
        
        In the following example two parameters are passed from a table widget to an XQL query. The first parameter with the cell value that the user clicked on, and a second parameter with the cell value in the request_url column in the row that the user clicked.
        
        ```
        dataset=xdr_data
        |filter event_type=**$y_axis.value** and requestUri=**$row.request_url**
        |fields action_download, action_remote_ip as remote_ip,
        actor_process_image_name as process_name
        |comp count_distinct(action_download) as total_download by process_name,
        remote_ip, remote_hostname
        |sort desc total_download
        |limit 10
        |view graph type=single subtype=standard xaxis=remote_ip yaxis=total_download
        ```
        
    -   Open custom URL: Opens an external URL based on a clicked value.
        
        Define the following values:
        
        | Field | Action |
        | --- | --- |
        | URL Address | Type the URL. To create a dynamic drilldown, you can include Available parameters. For more information about the parameters, see Variables in drilldowns. |
        
        In the following URL, the **`$x_axis.value`** parameter represents cortex products names. On drilldown, the $x_axis.value is replaced with the clicked product name in the pie chart.
        
        https://www.paloaltonetworks.com/cortex/cortex-$x_axis.value
        
        
        
    -   Generate Report: Runs a report from a clicked value.
        
    
4.  Save the changes for the widget and dashboard.

###### Variables in drilldowns

Learn about the widget variable values that you can use in dashboard drilldowns.

The following tabs are organized according to widget type and describes the widget variables that are available in drilldowns. The variable defines the value to capture in the drilldown, according to the element that is clicked. The captured value is then configured as a parameter by which to filter data on drilldown.

Chart

(Area, Bubble, Column, Funnel, Line, Map, Pie, Scatter, or Word Cloud)

-   **`$x_axis.name`**: Selects the x-axis name.
    
-   **`$x_axis.value`**: Selects the x-axis value for the clicked value.
    
-   **`$y_axis.name`**: Selects the y-axis name.
    
-   **`$y_axis.value`**: Selects the y-axis value for the clicked value.
    

Single value or gauge

-   **`$y_axis.name`**: Selects the y-axis name that the single value represents.
    
-   **`$y_axis.value`**: Selects the y-axis value for the clicked value.
    

Table

-   **`$first.name`**: Selects the leftmost column name in the table.
    
-   **`$first.value`**: Selects the leftmost value in the clicked table row.
    
-   **`$clicked.name`**: Selects the column name of the clicked value.
    
-   **`$clicked.value`**: Selects the value in the clicked table cell.
    
-   **`$row.<field_name>`**: Selects the field (column) from the clicked table row.

### Run or schedule reports

You can run reports that are based on dashboard templates, or you can create reports from scratch.

You can generate reports using pre-designed dashboard templates, or create custom reports from scratch with widgets from the Widget Library. You can also schedule your reports to run regularly or just once. All generated reports are saved under Dashboards & Reports → Reports.

To take actions on existing report templates, go to Dashboards & Reports → Report Templates. On this page you can also import and export report templates in a JSON format, which enables you to transfer your configurations between environments for onboarding, migration, backup, and sharing. You can bulk export and import multiple report templates at a time.

**Note:**

-   Report templates that are based on custom infrastructure cannot be exported.
    
-   If you import a report template that already exists in the system, the imported template will overwrite the existing template. If you do not want to overwrite the existing template, duplicate and rename the existing template before importing the new template.
    
-   You can also quickly create a report template from an existing dashboard by right-clicking the dashboard in the Dashboard Manager and selecting Save as report template.
    

Access and visibility

-   **Role permissions**: Your ability to run and schedule reports is set by your administrator through your user role.
    
-   **Widget visibility in reports**: Reports can include both Public and Restricted widgets. When you add a widget to a report template, the report will display the data from that widget to all report recipients, regardless of whether the recipients have access to that specific widget in their own Widget Library.
    
-   **Data scoping**: Reports pre-fetch data based on the scope of the user who last saved the template. Ensure the template creator has the appropriate data permissions to provide the intended results for the report recipients.
    

Dashboard sharing icons

The following icons in the Dashboard Manager (under the Source column) and in the Dashboards page header menu help you identify the security access of your dashboards:

-   :
    
    -   A Restricted custom dashboard you created (Owner) that is not currently shared with anyone else.
        
    -   A custom dashboard you created that is currently shared with other users or user groups.
        
    
-   : A custom dashboard created by another user that has been shared with you (either individually or through a user group).
    
-   : A standard system dashboard provided by Palo Alto Networks. These are always Public and can't be deleted, or have their ownership transferred.
    

#### Run a report based on a dashboard

You can generate a report based on an existing dashboard.

1.  Select Dashboards & Reports → Dashboard Manager.
    
2.  Right-click the dashboard you want to use, and select Save as report template.
    
3.  Enter a unique name for the report and an optional description, and click Save.
    
4.  Select Dashboards & Reports → Report Templates.
    
5.  Locate your new report template, right-click it, and select:
    
    -   Generate Report: To run the report immediately.
        
    -   Edit: To modify parameters or configure a schedule.
        
    
6.  After your report completes, you can download it from the Dashboards & Reports → Reports page.
    

#### Create a new report template

You can base your report on an existing template, or you can start with a blank template.

1.  Select Dashboards & Reports → Report Templates, and click New Template.
    
2.  Enter a unique name for the report and an optional description.
    
    **Note:**
    
    The report name and description will be displayed in the report header and are not editable during customization.
    
3.  Under Data Timeframe, select the duration for the report. Custom time frames are limited to one month.
    
4.  Choose a Report Type (a built-in template or blank) and click Next.
    
5.  Customize your report.
    
    Cortex Cloud offers mock data to help you visualize the data's appearance (default view). To see how the report would look with real data in your environment, switch to Real Data. Select the Preview in A4 icon to see how the report is displayed in an A4 format.
    
6.  Add or remove widgets to the report. From the widget library, drag widgets on to the report layout. You can add both standard system widgets and your custom (Public or Restricted) widgets.
    
    **Note:**
    
    -   For agent-related widgets, you can apply an endpoint scope to refine the displayed data to only show results from specific endpoint groups.
        
        Select the menu on the top right corner of the widget, select Groups, and select one or more endpoint groups.
        
    -   For case-related widgets, you can refine the displayed data to only show results from cases that match a case starring configuration. A purple star indicates that the widget is displaying only starred cases. For more information, see Case starring.
        
    
7.  (Optional) Add filters to the report. Adding filters and inputs to the report gives you the flexibility to filter report data based on default values that you define.
    
    If you selected a report template with default filters, the filters are displayed at the top of the dashboard. To edit the filters, click Add Filters & Inputs.
    
    You can configure basic filters that provide predefined static values, as explained in the following steps. Alternatively you can define dynamic filters that are based on predefined parameters in custom XQL widgets, as explained in Configure filters and inputs for custom XQL widgets.
    
    1.  Click Add Filters & Inputs to define parameters for the report data.
        
    2.  On the FILTERS & INPUTS panel, select a parameter for which to configure a filter.
        
    3.  Under Value, select one or more filter values.
        
        If no values are selected, the filter name shows an error symbol and you cannot save the filter.
        
    4.  Add more filters as required. You can drag the filters to change the priority.
        
    5.  Click Save Filters & Inputs.
        
8.  Click Next.
    
9.  Configure the report execution:
    
    -   Generate now: To run a single instance immediately.
        
    -   Schedule: Define a recurring timeframe for automatic generation.
        
    
10.  (Optional) Configure Email Distribution or Slack recipients for the PDF.
     
     **Note:**
     
     To send reports to Slack, Slack must be configured as an external application in Cortex Cloud. For more information, see Integrate Slack for outbound notifications
     
11.  (Optional) Select Attach CSV to include raw data from XQL widgets.
     
     From the menu, select one or more of your custom widgets to attach to the report. The CSV files of the widgets are attached to the report along with the report PDF. Depending on how you selected to send the report, the CSV file is attached as follows:
     
     -   Email: Sent as separate attachments for each widget. The total size of the attachment in the email cannot exceed 20 MB.
         
     -   Slack: Sent within a ZIP file that includes the PDF file.
         
     
12.  Click Save Template.
     
13.  After your report completes, you can download it from the Dashboards & Reports → Reports page.
     
     In the Name field, icons indicate the number of attached files for each report. Reports with multiple PDF and CSV files are marked with a zip icon. Reports with a single PDF are marked with a PDF icon.
     

#### Configure the notification rule for a failed report

You can receive an email or send a notification to a syslog server if a report fails to run due to a timeout or fails to upload to the GCP bucket.

1.  Under Settings → Configurations → General → Notifications, click \+ Add Forwarding Configuration.
    
2.  Enter a name and a description for your rule, and under Log Type, select Management Audit Logs.
    
3.  Use a filter to select the Type as **`Reporting`**, Subtype as **`Run Report`**, and Result as Fail.
    
4.  Enter a distribution list to receive notifications by email or select a syslog server.
    
5.  Click Next.
    
6.  Review settings and click Create.
