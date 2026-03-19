# Marketplace

Use the Marketplace, a centralized content portal, to manage content packs in Cortex Cloud.

Marketplace is a centralized content portal enabling you to manage downloaded content in Cortex Cloud. Marketplace content is organized into content packs.

You can view Marketplace content packs from within Cortex Cloud.

## Cortex Marketplace

Search the Cortex Marketplace and find content. Search by use cases, integrations, and categories.

Content in Marketplace is organized into content packs to support specific security orchestration use cases. Content packs are created by Palo Alto Networks, technology partners, contributors, and customers.

In Marketplace, content includes the following:

| Content | Description |
| --- | --- |
| Actions | Actions wrap diverse capabilities (such as playbooks, scripts, and commands) to make them accessible and executable by an agent. |
| Classifiers | Classification determines the type of issue/indicator that is created for events ingested from a specific integration. You create a classifier and define that classifier in an integration. Mappers map the fields from your third-party integration to the fields in your issue/indicator layouts. |
| Correlation Rules | Analyzes the correlation of multiple events from multiple sources by using the Cortex Cloud XQL-based engine for creating these correlation (scheduled) rules. Issues can then be triggered based on these rules with a defined time frame and schedule. |
| Dashboards | Dashboards consist of visualized data powered by fully customizable widgets, which enable you to analyze data from inside or outside Cortex Cloud, in different formats such as line charts, tables, text, etc. |
| Data Model Rules | Data Model rules enable you to normalize logs for out-of-the-box analytics and data enrichment. This allows you to do the following: Map 3rd-party data to a consolidated schema with predefined data types.; Enjoy auto-complete and mapping suggestions.; Map multiple datasets to one Data Model. Some content packs contain out-of-the-box default Data Model Rules. |
| Indicator types and fields | Indicators are categorized by indicator type, which determines the indicator layout and fields that are displayed and which scripts are run on indicators of that type. |
| Integrations | You can define the following integrations: (SOAR) Automation: Add your 3rd-party security and alert management vendors, which can then trigger events from these integrations that become issues in Cortex Cloud. Once the issues are created, you can run playbooks on these issues to enrich them with information from other products in your system, which helps you complete the picture.; Collection (SIEM): Add integrations that collect raw events, such as logs. These integrations are separate from automation integrations so that you can add a collection integration that requires read permissions without having to add automation (read and write permissions). |
| Issue types and fields | All issues that are ingested into Cortex Cloud are assigned an issue type when they are classified. After you classify the issue, you can then map the relevant fields to the issue. Issue types contain fields that are relevant to the issue type. |
| Layouts and layout rules | Enables you to add rules, which define the layout of issues and notifications, When installed, the layout rules are enabled and added as Default Rules. When deleted, all related layout rules (including all Rule sections) are removed from the Default Rules tab. |
| Parsing rules | Enables you to add rules, which remove non-required data for analytics, hunting, or regulation, reduce data storage costs, pre-process all incoming data, etc. When installed, the parsing rules are enabled and added as Default Rules. When deleted, all related parsing rules (including all Rule sections) are removed from the Default Rules tab. |
| Playbooks | You can automate many security processes, including handling investigations and managing tickets and security responses that were previously handled manually. When an issue is ingested, the playbook runs and an issue is created. |
| Reports | Reports contain statistical data in the form of widgets (from a dashboard), which enable you to analyze data from inside or outside Cortex Cloud, in different formats such as line charts, tables, text from information, etc. |
| Scripts | Perform specific actions and are comprised of commands, which are used in playbook tasks and when running commands in the issue War Room. |

Cortex Cloud supports free content packs, which are either Cortex Cloud or partner-supported content packs. You can restrict a user role from managing content packs in Marketplace when defining/editing user roles.

In Marketplace, you can browse all content packs (including installed content) or view only installed content packs.

You can search for content packs by entering text in the search bar and selecting the relevant content pack from the search results.

You can sort content packs by latest update, best match, recommended, number of downloads, and filter according to the following criteria:

-   **Use cases:** Filter according to high-level use cases.
    
-   **Integrations:** Filter according to the integration included in the content pack.
    
-   **Categories:** Filter according to content pack categories.
    
-   **Published:** Filter according to whether published by Cortex Cloud or by Cortex Cloud technology partners.
    
-   **Content Pack Includes:** Filter according to the content of the content pack, such as scripts, integrations, playbooks, and actions.
    
-   **Tags:** Filter according to tags, such as Issues, Actions, Network, and Security.
    

When clicking a content pack you can view detailed information including content that it installs (such as scripts, playbooks, and integrations), dependencies (what content packs are required or optional) and version history (including whether you want to roll back to earlier versions).

You can view Marketplace content packs from within Cortex Cloud (go to Settings → Configurations → Marketplace) or at [Cortex Developer Docs Marketplace](https://cortex.marketplace.pan.dev/marketplace/).

## Content Pack Support Types

Types of content packs support - Cortex supported, Partner-Supported, Developer-Supported, Community-Supported.

Marketplace includes the following content pack support types:

**Cortex Cloud\-Supported content packs**

Applies only to content packs published by Palo Alto Networks. These content packs are supported and maintained by Palo Alto Networks according to the [Palo Alto Networks End User Support Agreement](https://www.paloaltonetworks.com/content/dam/pan/en_US/assets/pdf/legal/palo-alto-networks-global-customer-support-services-terms-and-conditions-eusa.pdf).

**Note:**

Palo Alto Networks is not liable for and does not warrant or support any content pack produced by a third-party publisher.

Palo Alto Networks does not support content packs that do not have official available documentation.

**Partner-Supported content packs**

Applies to content packs published by Cortex Cloud Technology Partners. Support and maintenance is provided by the Technology Partner, whose contact information appears in the content pack details.

Cortex Cloud Technology Partners are required to join the industry-standard support framework, [TSANet](https://www.tsanet.org/), to deliver support to our mutual customers. Customers engage directly with the partner for support and maintenance of the partner-supported content pack.

**Developer-Supported content packs**

Applies to content packs published by third-party developers. Support and maintenance is provided by the publishing developer, whose contact information appears in the content pack details.

Customers engage directly with the publishing developer. Support and maintenance is provided voluntarily by the publishing developer. Additional information from the user community may be available at [Cortex XSOAR Live Discussions](https://live.paloaltonetworks.com/t5/cortex-xsoar-discussions/bd-p/Cortex_XSOAR_Discussions).

**Community-Supported content packs**

Applies to content packs published by Palo Alto Networks or third-party developers. No support or maintenance is provided by the publisher for these content packs.

Palo Alto Networks ensures that these content packs are updated to use the latest and most secure Docker images through an automated process. However, functionality may not be fully tested. We recommend fully testing and reviewing Community content packs before updating production systems.

## Cortex Cloud content

The type of content in Cortex Cloud

In Cortex Cloud, content includes individual content entities that you create such as individual playbooks and scripts, preinstalled content packs, and content packs that are downloaded from Marketplace when you adopt and edit playbooks.

Content packs are created by Palo Alto Networks and technology partners. Content in Marketplace is organized into content packs to support specific security orchestration use cases.

You can view your installed Marketplace content packs from within Cortex Cloud.

In Cortex Cloud, content includes the following:

| Content | Description |
| --- | --- |
| Actions | Actions wrap diverse capabilities (such as playbooks, scripts, and commands) to make them accessible and executable by an agent. |
| Integrations | Integrations allow you to respond to events and perform actions on third-party security and alert management vendors. |
| Playbooks | You can automate many security processes, including handling investigations and managing tickets and security responses that were previously handled manually. |
| Scripts | Perform specific actions and are comprised of commands, which are used in playbook tasks and when running commands in the issue War Room. |

## Manage content packs

Install, delete, update, and revert content packs.

You can install, delete, update, and revert content packs. Before you install a content pack, you should review the content pack to see what it includes and the various dependencies. The following is the information you can view:

-   **Details:** General information about the content pack such as installation, content, version, author, and status.
    
-   **Content:** The content to be installed, such as scripts or integrations.
    
-   **Dependencies:** Details of any required content packs and optional content packs that may need to be installed with your content pack.
    
-   **Version History:** View the currently installed version, earlier versions, available updates, and revert if required.
    

### Dependencies

In Cortex Cloud content packs, some objects are dependent on other objects. For example, an issue may be dependent on a playbook, an issue type, and an issue field. A script may be dependent on another script, or an integration. When you place a content pack in your cart, mandatory dependencies including  required content packs are added automatically to ensure that the content pack installs correctly.

Optional content packs are used by the content pack you want to install, but are not necessary for installation. When you place a content pack in your cart, you can choose which optional content pack to install. When you install optional content packs, mandatory dependencies in the optional content pack are automatically included.

**Note:**

Optional content packs that are already installed are treated like they are required content packs to preserve content integrity.

Install a content pack

You can only install one content pack at a time. Cortex Cloud automatically adds any content that is required to install the content pack. You can also add any optional content packs that use the content pack you want to install.

If you receive an error message when you try to install a content pack, you need to fix the error before installing. If a warning message is issued, you can still download the content pack, but you should fix the problem; otherwise, the content may not work correctly.

**Note:**

Cortex Cloud includes a built-in default mail sender. You also have the option of installing a different mail sender content pack, such as [Microsoft Exchange Online](https://cortex.marketplace.pan.dev/marketplace/details/MicrosoftExchangeOnline/).

1.  Go to Settings → Configurations → Marketplace → Browse and locate the content pack you want to install.
    
2.  Click the required content pack and review the contents.
    
3.  Click Install to add the content pack to the Cart.
    
4.  (Optional) If the content pack includes optional content, select the content packs you want to add.
    
    The Cart displays the number of items you are installing, including any required content packs. You can log in and out, but the content packs remain in the Cart until you click either Empty cart or Install.
    
5.  Click Install.
    
6.  After installation, click Refresh content.
    

**Note:**

In addition to content packs that you install from Marketplace, related content packs are automatically downloaded when you adopt playbooks or edit tasks that require content items such as scripts or integrations.

Update a content pack

Content packs are updated for bug fixes, enhancements, and more. Marketplace is updated every 2 hours and when there is an update available for a content pack, you will see a notification in the Installed Content Packs tab in Marketplace.

In the Version History tab of a content pack, you can see the currently installed version, earlier versions, and available updates. You can revert to a previous version of a content pack if required.

All dependent content packs update automatically with the content pack.

**Tip:**

You can also find content packs that require updates by going to Settings → Data Sources & Integrations and filtering by Pack Version = Update Available. If you click on an integration in the filtered list, there is a link to the content pack in Marketplace for updates.

**Note:**

Third-party product integrations are developed and tested against a specific product version. For products that are on-prem or cloud-based with specific API versions, the version developed and tested against will be included in the integration's documentation. Newer versions of the product are not always immediately tested, and it is expected that products maintain API compatibility upon release of newer product versions. When upgrading to a newer product version, it is highly recommended to test the integration in a dev environment before deploying to production.

**Caution:**

If you want to downgrade, any content that depends on the content pack including any customizations may be deleted if it does not exist in the target content pack version.

1.  In the Show field of the Installed Content Packs tab, select Update available to display the content packs that are available to update.
    
2.  Click the content pack you want to update.
    
3.  In the Version History tab of the content pack, view the available updates.
    
4.  Click Update. If there is more than one update available, click the version to update.
    
    If you choose to install the latest version it includes the previous version. If you have made any customizations these are included in any update. If any dependencies require updating, these are automatically added.
    
5.  Click Install.
    
6.  After the content pack installs, click Refresh content.
    

Revert a content pack

You can revert to an earlier version of an installed content pack. Items that are not included in the version are also deleted, such as detached playbooks or scripts that use other scripts from the content pack. This may cause other content packs to stop working

1.  In the Installed Content Packs tab, click the content pack you want to revert.
    
2.  In the Version History tab, select the version to which you want to revert.
    
3.  Click Revert to this version. The version will be added to your Cart.
    
4.  In the Cart, click Downgrade.
    

Delete a content pack

When you delete a content pack, all content is deleted, including all detached and customized content.

**Caution:**

If another content pack is dependent on the content pack you want to delete, it may break the other content pack. You can reinstall the content pack, but you cannot restore detached and customized content.

1.  Go to Settings → Configurations → Marketplace → Installed Content Packs.
    
2.  In the Content Packs Library section, search for the content pack and select the content pack you want to delete.
    
3.  Click the trash can icon.
    
4.  Review the warning message and click Delete.

## Marketplace FAQs

Frequently Asked Questions about Cortex Cloud Marketplace Content

**Should Marketplace content always be updated?**

Marketplace updates are a source for bug fixes and provide new commands for integrations and scripts. It’s best practice to update content packs to the newest available version. If you encounter any issue with content updates, you can revert to a previous version with one click.

**When can Marketplace content be updated?**

You can update content while the system is in use. If a playbook, for example, is running on an issue while you update that playbook, the original version of the playbook will continue to run without a problem. If the playbook includes an integration command that has been updated, and the update occurs before the playbook reaches this task, the new version of the integration command will be used.

**When should content items be duplicated versus detached?**

To edit a content item, the item must be detached or custom content. When content items are detached, they do not receive updates from Marketplace. There are two options for editing content items:

-   Detach content items (such as playbooks and automations) and edit the content items. If you want to receive content updates in the future, you can reattach the content item, but the modifications you made while the item was detached will be overwritten with the content update.
    
-   Duplicate the content item and edit the copy. When a content item is duplicated it becomes a custom content item, and therefore will not receive updates, but you can view updates to the original content item.
    

**How does Marketplace content differ from custom content?**

After Marketplace content is installed you can detach or duplicate the content and customize the content as needed. Custom content is, by definition, detached and does not receive updates.

**How can content updates be rolled back? Are dependencies automatically rolled back as well?**

You can view all versions of a content pack in Marketplace and revert to earlier versions there. When you revert a content pack, only the content pack is reverted, not the pack dependencies.

## Content changes when upgrading Cortex Cloud versions

Content updates when upgrading Cortex Cloud versions.

Cortex Cloud will be upgraded automatically approximately every 3 months. During the upgrade, the following core content packs may automatically upgrade to a newer version:

-   Aggregated Scripts
    
-   Atlassian Jira
    
-   AWS
    
-   Azure
    
-   Base
    
-   Common Playbooks
    
-   Common Scripts
    
-   Core
    
-   Cortex Lock
    
-   Cortex Response And Remediation
    
-   Cortex REST API
    
-   Filters And Transformers
    
-   GCP
    
-   Microsoft Teams
    
-   Rasterize
    
-   ServiceNow
    
-   Slack
    
-   Unit 42 Threat Intelligence by Palo Alto Networks
    
-   WildFire by Palo Alto Networks
