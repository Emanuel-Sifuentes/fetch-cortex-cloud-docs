# Graph Search

Learn more about Graph Search in Cortex Cloud.

## What is Graph Search?

Learn more about how to use Graph Search to search assets, findings, and their contextual data.

**Prerequisite:**

Graph Search requires View or View/Edit RBAC permissions for Graph Search under Investigation & Response → Search.

Graph Search provides an interactive and visually intuitive way for you to search assets and findings by their relationship types and map them out in real-time. The resulting graphical illustration helps provide a unified and comprehensive view of complex relationships between assets, security findings, and contextual data that tie them together. This information without a clear visual representation in the form of a model can be difficult to understand through the data alone. The graph results can help you better grasp the full stack of your organization's posture and the associated risks it drives, including attack paths and discovering hidden risks. These results can be used to make informed decisions in less time to improve your security posture and operational efficiency.

Graph Search queries are created using the built-in query interface embedded in the Query Builder. Every query is structured to use a certain pattern and includes default data objects that you define by selecting the ones you want to query from the data collected in the applicable datasets based on the data sources configured. The resulting graph provides an illustration of your selections, which you can export to a PNG, SVG, or TSV file. In addition, Graph Search contains a Query Library for saving and managing your own queries, queries shared with you, and built-in Graph Search queries provided by Palo Alto Networks.

  Show me around Graph Search

## Get started with Graph Search queries

Learn more about how to get started before building a Graph Search query.

**Notice:**

This feature is included with a Cortex XSIAM Premium license. It is also included with any other Cortex XSIAM license that has the Cloud Posture Security or Cloud Runtime Security add-on.

**Prerequisite:**

Graph Search requires View or View/Edit RBAC permissions for Graph Search under Investigation & Response → Search.

Before you start to search assets and findings by their relationships by building Graph Search queries, consider the following:

-   **Understand your assets and findings data**: Graph Search queries are based on the current data that has been collected for assets and findings from the data sources configured and then sent to the Unified Asset Inventory (UAI), which is displayed in the All Assets page (Inventory → Assets → All Assets). The built-in query interface enables you to filter the parameter values by selecting the relevant data from your assets and findings. Ensure to familiarize yourself with this data to build your queries.
    
    -   For more information on assets, see All Assets.
        
    -   For more information on findings, see Findings and events.
        
    
-   **Learn more about the query structure using the built-in interface**: Although the Graph Search queries are built using a built-in interface, you should understand the query structure to ensure that you build the queries correctly. For more information, see How to build Graph Search queries?.
    
-   **Understand the Graph Search query results**: Once your query is complete, you can search for the results. The results can be viewed in a graph or table format. For more information, Understand Graph Search query results.
    
-   **Try out some examples**: To help you feel confident with building Graph Search queries, start by following our step-by-step examples and tailor them for your environment. For more information, see Graph Search examples.
    
-   **Learn more about the Graph Search Query Library and run the built-in queries**: Graph Search contains a Query Library for saving and managing your own queries, queries shared with you, and built-in Graph Search queries provided by Palo Alto Networks. We recommend that you run these built-in queries as these examples provide common, important, and popular use cases. For more information, see Manage the Graph Search Query Library.

## How to build Graph Search queries?

Learn more about building Graph Search queries using the built-in query interface.

**Prerequisite:**

Graph Search requires View or View/Edit RBAC permissions for Graph Search under Investigation & Response → Search.

You can build Graph Search queries using the built-in query interface embedded in the Query Builder. Graph queries are composed of assets, findings, and relationship types that connect them. These data objects are represented by nodes and edges, and the paths are found based on the contextual data. Every query is structured to use a certain pattern and includes these default data objects that you define by selecting the available assets and findings that you want to query in the graph. The output is provided by default in a Graph format, but you can also view the results as a Table format. The resulting graph provides an illustration of the nodes, node attributes, and edges that can connect two nodes based on your selections in the query.

To support multi-cloud and hybrid environments efficiently and intuitively, Graph Search queries use a normalized data model that attempts to optimize finding categories of assets and findings. A subset of assets and finding types, referred to as nodes and edges, is supported. For more information, see Supported assets and findings.

You submit Graph Search queries using the Investigation & Response → Search → Query Builder → Graph Search built-in query interface.

  Show me around the Graph Search built-in query interface

Keywords in the query interface

There are different key words that are included in the Graph Search query interface, which, as you select them, guide you through the query-building process:

-   FIND: Defines the start of any Graph Search query, which is followed by the relevant node (entity) types.
    
-   Select (mandatory): Opens the node picker dialog box, where you can select the different node types. Multiple nodes are defined with an `OR` relationship between them. The top-level node selection acts as the root of the query. There are two different types of nodes, where each node has its own unique shape, icon, and color:
    
    -   **Asset nodes**: Each asset node is depicted as a circle in the resulting graph, where the color and icon displayed is dependent on the asset category and class types selected. There are multiple class types available for each asset node category selected. Once a class type is selected in the node picker dialog box, and you hover over it, all the available asset types are listed. For more information, see All Assets.
        
    -   **Finding nodes**: Each finding node is depicted as a diamond in the resulting graph, where the color and icon displayed is dependent on the finding type selected. There is only one category type available for each finding selected.
        
    
-   WHERE: List of conditions that apply to the node types that were selected following the `FIND`/`THAT` statements. The conditions are based on node attributes and their values. At each level of the query, the relationship between node attribute conditions is `AND`. No other logical operator is available.
    
    For each attribute type, there is a defined behavior for filtering data:
    
    -   Array values with `OR` relationship.
        
    -   Multi-selection (`OR` relationship) from a predefined ENUM.
        
    -   Multi-selection (`OR` relationship) from a list of data objects that exist in the Graph Search database. For example, the scope of cloud accounts enables you to choose from the available cloud account object that exists in the database.
        
    
    The attribute operators are used to define the standard operators, such as `Contains` and `Greater than`. Depending on the attribute selected, different attribute operators are available.
    
-   THAT: Defines the relationship between nodes as every `THAT` marks an edge to the next node type. The possible edges are selected based on the graph schema. You can add a THAT statement to a Graph Search query by clicking the + icon available on each line of the query interface.
    

Providing feedback

Use the Have Feedback? link in the Graph Search query interface to provide valuable feedback about the feature and any improvements you'd recommend.

## Understand Graph Search query results

Learn more about the Graph Search query results.

**Prerequisite:**

Graph Search requires View or View/Edit RBAC permissions for Graph Search under Investigation & Response → Search.

Review the following topics:

-   How to build Graph Search queries?
    

Once the query is completed, you can search for your query results. The results displayed are dependent on your data.

You can view the Graph Search query results in two formats:

-   Graph (default): Displays the paths on the graph that matched the node types and conditional attributes in the query. Each result is a full path of the matching query.
    
-   Table: Displays the results in a table, where each row in the table represents a different path in the graph that goes through all the matching node types and attributes as they appear in the Graph Search query. Every asset and finding table shows different default columns. For more information, see Table view columns. You can view the full asset information of any cell in the table by clicking the cell.
    

You can export the Graph Search results as a PNG, SVG, or TSV file. You can always edit the query once the results are displayed, which means that the old results are discarded and the new results are displayed. In addition, you can save the results to the Query Library.

Graph output

The Graph Search resulting graph displays the paths according to the nodes and conditional attributes that you selected in your query. Here are a few things to keep in mind when viewing the graph results:

-   There are two different types of nodes, where each node has its own unique shape, icon, and color:
    
    -   **Asset nodes**: Each asset node is depicted as a circle in the resulting graph, where the color and icon displayed is dependent on the asset category and class types selected. There are multiple class types available for each asset node category selected. Once a class type is selected in the node picker dialog box and you hover over it, all the available asset types are listed according to the data collected. For more information, see All Assets.
        
    -   **Finding nodes**: Each finding node is depicted as a diamond in the resulting graph, where the color and icon displayed is dependent on the finding type selected. There is only one category type available for each finding selected.
        
    
-   In the resulting query, nodes are automatically grouped together to keep the graph looking cleaner and less busy. Nodes are grouped together when there are at least five nodes that meet the following conditions:
    
    -   The node isn't a root node.
        
    -   The path is identical.
        
    -   For asset nodes, the nodes have the same class and category type.
        
    -   For finding nodes, the nodes have the same category type.
        
    
    A grouped node icon is displayed as a duplicate node. For example, if it's a group node, the icon looks like two shapes, one on top of another. When you select the group node, a dialog box opens displaying all the nodes included in the group.
    
-   When you select each node, or hover on it and select More Info, you'll see more information displayed in a dialog box. You can click View Details to drill down even further on the node to display more information on the node depending on the data collected for that asset or finding node selected.
    
-   Vulnerability finding nodes automatically display under the node the breakdown of severity.
    
-   Every Graph Search query returns a maximum of 50 paths with an indication displayed at the bottom of the page of the total number of results.
    
-   On the right side of the graph results, there are different icons that can help you drilldown into your graph results:
    
    -   + and \- icons: Use the plus and minus icons to zoom in and out of the graph.
        
    -   : Use the diamond icon to center your graph after you've manipulated the output.
        
    -   : Use the layers icon to easily add or remove additional information to the graph without having to define these parameters in your Graph Search query. You can decide when to include these built-in layers, as needed. The following are available:
        
        -   Public Exposure to the Internet: Tracks the asset nodes with internet exposure that could be targeted for external surface attacks by displaying the exposure path. A Globe node called Internet is added to the graph, which links all exposed asset nodes to this Globe node. You can expand this connection by clicking the + icon to reveal the full internet path to include, for example, the NIC, Subnet, and Gateway. In the exposure path, you can select each node, or hover on it and select More Info, you'll see more information displayed in a dialog box. You can click View Details to drill down even further on the asset node to display more information on the node depending on the data collected for that asset node selected. Internet paths are collapsed by default.
            
        -   Related Cases: Displays the number of related Cases for each asset node with a breakdown by severity.
            
        -   Runtime Events: Adds 100 most recent runtime events to the graph results, which are refreshed every hour. This enables you to investigate real-time activity and identify critical events, such as access to sensitive information typically contained in a storage bucket, which generate issues and cases. All the bucket nodes in the path include a runtime icon  underneath and run an animation on all the bucket and virtual machine nodes. You can click the runtime icon to reveal more info, such as connection details and runtime events. Click Show Recent Events to display the Runtime Events table with more details on the last 100 events.
            
        
        The results from the different layers are displayed in tabs in the node dialog box, which enables you to quickly switch from one layer to the other.
        
    -   : Use the Group nodes icon to group by the Cloud Provider, Cloud Account, or Cloud Region. Selecting one of these grouping enables you to view the graph results in an aggregated format, providing a clearer and more organized perspective of the data. This feature also helps to Identify patterns and trends more easily in your data by grouping similar entities together. In the future, the Group nodes feature will be expanded to enable additional groupings.
        
    

  Show me an example of Graph Search results with general tips and tricks

  Show me how to use the layers and group node icons in the Graph Search results

This example focuses on using the layers icon to add or remove additional information to the graph and how to group information together using the Group node icon.

Table view columns

Below is a list of the different columns displayed by default in the assets and findings tables.

Asset table

Below is a list of the default columns that are displayed within any asset table, where the names of the columns can change slightly depending on the asset selected. In addition, some assets have additional columns.

-   All assets tables:
    
    -   Asset Name
        
    -   Asset Type
        
    -   Asset Category
        
    -   Asset Provider
        
    -   Asset Realm
        
    
-   All assets additional columns:
    
    -   <name of asset> ID
        
    
-   Identity finding additional columns:
    
    -   Identity Account Access
        
    -   Identity Admin Permissions
        
    -   Identity Cloud Region
        
    -   Identity Empty
        
    -   Identity Excessive
        
    -   Identity Guest
        
    -   Identity Has MFA
        
    -   Identity Last Login
        
    -   Identity Last Used
        
    

Finding table

Below is a list of the default columns that are displayed with in any finding table, where the names of the columns can change slightly depending on the finding selected. In addition, some findings have additional columns.

-   All findings tables:
    
    -   Finding Name
        
    -   Finding Category
        
    
-   Vulnerability finding additional columns:
    
    -   Vulnerability Finding Package ID
        
    -   Vulnerability Finding CVE ID
        
    -   Vulnerability Finding Severity
        
    -   Vulnerability Finding Fix Versions
        
    -   Vulnerability EPSS Score
        
    -   Vulnerability Package ID
        
    -   Vulnerability Exploitable
        
    -   Vulnerability Affected Versions
        
    -   Vulnerability Status
        
    -   Vulnerability CVE Vendor Link
        
    -   Vulnerability Fix Date
        
    -   Vulnerability Publish Date
        
    -   Vulnerability Derived from Base Image
        
    -   Vulnerability CVSS Score
        
    -   Vulnerability CVSS Vector
        
    -   Vulnerability Has a Fix
        
    -   Vulnerability Fix Versions
        
    -   Vulnerability Severity
        
    -   Vulnerability CVE ID
        
    
-   Malware finding additional columns:
    
    -   Malware Finding File Path
        
    -   Malware Finding SHA256
        
    -   File Permissions
        
    -   File Name
        
    -   File Size
        
    -   File Path
        
    -   File Last Modified Time
        
    -   Verdict
        
    -   SHA256
        
    
-   Data finding additional columns:
    
    -   Data Finding Secret Location
        
    -   Data Finding Secret Snippet
        
    -   Secret Snippet
        
    -   Secret Location
        
    -   File Path
        
    -   File Code Line

## Create Graph Search query

Learn how to create Graph Search queries in Cortex Cloud.

**Prerequisite:**

Graph Search requires View or View/Edit RBAC permissions for Graph Search under Investigation & Response → Search.

Review the following topics:

-   Get started with Graph Search queries
    
-   How to build Graph Search queries?
    
-   Understand Graph Search query results
    
-   Graph Search examples
    
-   Manage the Graph Search Query Library
    

Build Graph Search queries to search your assets and findings by their relationship types and map them out in a unified and understandable view. You can build Graph Search queries using the built-in query interface embedded in the Query Builder.

1.  Select Investigation & Response → Search → Query Builder → Graph Search.
    
2.  From inside the Graph Search query interface at the top of the Graph Search page, click Select to open the entity picker dialog box.
    
3.  Choose the assets and findings nodes that you want to query.
    
    Keep in mind that multiple nodes are defined with an `OR` relationship between them. The top level node selection acts as the root of the query.
    
4.  To apply a condition to the assets or findings nodes that you've selected, click WHERE. Otherwise, skip to the next step.
    
    Select the applicable field (termed node attribute), operator, and value for the condition you want to define. The operators and values change according to the node attribute (field) that you select. At each level of the query, the relationship between node attribute conditions is `AND`. No other logical operator is available.
    
5.  To define a relationship between the assets or findings nodes already selected and a new node, click +.
    
6.  Define the THAT statement by selecting the new assets and findings nodes that you want to relate to the other nodes.
    
7.  To apply a condition to the new asset and findings nodes that you've selected, repeat step **#4**.
    
8.  Repeat steps **#5** to **#7** until you've finished building your query logic.
    
9.  When your query is complete, or at any time that you want to view the query results, click Search.
    
    The Graph Search results are displayed in a graph format by default. You can toggle to Table to view the results in a table format. In addition, you can export the graph results using the icon at the top of the page to a PNG, SVG, or TSV file.
    
    **Tip:**
    
    -   After running the query, you can view the complete query by hovering over the last THAT... in the Graph Search query interface, and the query is displayed in a tooltip.
        
    -   If your query doesn't find any results or you want to change your query for any reason, you can always click anywhere in the Graph Search query interface, where your existing query is defined, to display the complete query, update your query, and rerun the search.
        
    
10.  You can save your query to the Query Library by clicking Save Query.
     
     1.  Set these parameters:
         
         -   Query Name: Specify a unique name for the Graph Search query. Query names must be unique in both private and shared lists, which includes other people’s queries.
             
         -   Query Description (Optional): Specify a descriptive name for your Graph Search query.
             
         -   Labels (Optional): Specify a label that is associated with your Graph Search query. You can add a label and then select Create Label, or select a label from the list, if any exist from a previous query. Adding a label to your Graph Search query enables you to search for queries using this label in the Query Library.
             
         -   Share with others: You can either set the Graph Search query to be private and only accessible by you (default) or move the toggle to Share with others the query, so that other users using the same tenant can access the query in their Query Library.
             
         
     2.  Click Save.
         
         A notification appears confirming that the query was saved successfully to the library, and closes on its own after a few seconds.
         
         The Graph Search query that you added is now listed as the first entry in the Query Library.
         
     
     **Note:**
     
     For more information about the Query Library, see Manage the Graph Search Query Library.

## Graph Search examples

Learn how to build Graph Search queries by working through a few examples.

**Notice:**

This feature is included with a Cortex XSIAM Premium license. It is also included with any other Cortex XSIAM license that has the Cloud Posture Security or Cloud Runtime Security add-on.

**Prerequisite:**

Graph Search requires View or View/Edit RBAC permissions for Graph Search under Investigation & Response → Search.

Review the following topics:

-   Get started with Graph Search queries
    
-   How to build Graph Search queries?
    
-   Understand Graph Search query results
    
-   Create Graph Search query
    

The best way to learn how to create Graph Search queries is to try out a few examples. The examples below provide a good guide to creating Graph Search queries. One thing to keep in mind if you try these queries in your own environment, the search results can differ according to your data collected.

Example 208. 

This example takes you through building a query with asset nodes. The query looks at the virtual machines (VMs) in your network that are connected to the Internet, attached to a Network Interface, are contained in a subnet, and are part of a virtual private cloud (VPC).

### Step 1: Search for all VMs on your network

-   Select Compute → Virtual Machine, and click Search.
    

**Graph Search results:** A graph displaying all the virtual machines in your network, where some are connected to the internet, and some are not connected to the internet.

### Step 2: Filter the VMs to only display the ones connected to the Internet

1.  Click Edit Query, and define the following WHERE statement:
    
    -   Select field = Internet Exposed
        
    -   Leave the equal (\=) operator.
        
    -   Select values = true.
        
    
2.  Click Search.
    

**Graph Search results:** A graph displaying all the virtual machines in your network that are connected to the internet.

### Step 3. Display the VM connected to the Internet with an attachment to a Network Interface

1.  Click Edit Query and then +.
    
2.  Define the THAT statement by selecting Network → Network Interface.
    
3.  Click Search.
    

**Graph Search results:** A graph displaying all the virtual machines in your network that are connected to the internet with a network interface attached.

### Step 4. Display the VM connected to the Internet with an attachment to a Network Interface and is contained in a subnet

1.  Click Edit Query and then +.
    
2.  Define the THAT statement by selecting Network → Subnet.
    
3.  Click Search.
    

**Graph Search results:** A graph displaying all the virtual machines in your network that are connected to the internet with a network interface attached, and are contained in a subnet.

### Step 5. Display the VM connected to the Internet with an attachment to a Network Interface, is contained in a subnet, and is part of a VPC

1.  Click Edit Query and then +.
    
2.  Define the THAT statement by selecting Network → VPC.
    
3.  Click Search.
    

**Graph Search results:** A graph displaying all the virtual machines in your network that are connected to the internet with a network interface attached, are contained in a subnet, and part of a VPC.

## Manage the Graph Search Query Library

Learn more about the Cortex Cloud Graph Search Query Library to manage your queries.

**Prerequisite:**

Graph Search requires View or View/Edit RBAC permissions for Graph Search under Investigation & Response → Search.

Cortex Cloud provides as part of Graph Search a Query Library for saving and managing your own queries, queries shared with you, and built-in Graph Search queries provided by Palo Alto Networks to help illustrate how to build meaningful Graph Search queries on your data. When creating a query in Graph Search or managing your Graph Search queries from the Query Center, you can save queries to your personal query library as part of the Query Library. You can also decide whether the Graph Search query is shared with others (on the same tenant) in their Query Library or unshare it, so it is only visible to you. You can also view the Graph Search queries that are shared by others (on the same tenant) in your Query Library.

### How to access the Query Library?

The Query Library is accessible from the Graph Search page. By default, it's open as a separate pane at the bottom of the page. Whenever the Query Library is closed, you can always click Query Library at the top right corner of the page to reopen it.

### What does the Query Library include?

The Query Library consists of two tables called Query Library (default) and My Recents, which you can toggle. The Query Library table lists all the Graph Search queries available in your Query Library, while the My Recents table only lists the Graph Search queries that you've run from the Graph Search page, Query Library table, My Recents table, and Query Center.

The queries listed in your Query Library table have different icons to help you identify the different states of the queries:

-   Created by me and unshared.
    
-   Created by me and shared.
    
-   Created by someone else and shared.
    
-   Created by Palo Alto Networks.
    

### Adding queries to the Query Library

Graph Search queries can be added to the Query Library in multiple ways.

1.  Save a query to your personal query library.
    
    You can do this in following ways:
    
    -   **From Graph Search in the Query Builder**
        
        1.  Select Investigation & Response → Search → Query Builder → Graph Search.
            
        2.  From inside the Graph Search query interface at the top of the Graph Search page, click Select to open the entity picker dialog box, and define the parameters of your query.
            
        3.  Click Search to run your query and view the query results.
            
        4.  Click Save Query.
            
        
    -   **From Graph Search in the My Recents table of the Query Library**
        
        1.  Select Investigation & Response → Search → Query Builder → Graph Search.
            
        2.  Click Query Library.
            
        3.  Toggle to My Recents to open your recent queries.
            
        4.  Right-click anywhere in the Graph Search query row, and select Save query to library.
            
        
    -   **From the Query Center**
        
        1.  Select Investigation & Response → Search → Query Center.
            
        2.  Locate the Graph Search query that you want to save to the Query Library.
            
        3.  Right-click anywhere in the Graph Search query row, and select Save query to library.
            
        
    
2.  Set these parameters:
    
    -   Query Name: Specify a unique name for the Graph Search query. Query names must be unique in both private and shared lists, which includes other people’s queries.
        
    -   Query Description (Optional): Specify a descriptive name for your Graph Search query.
        
    -   Labels (Optional): Specify a label that is associated with your Graph Search query. You can add a label and then select Create Label, or select a label from the list, if any exist from a previous query. Adding a label to your Graph Search query enables you to search for queries using this label in the Query Library.
        
    -   Share with others: You can either set the Graph Search query to be private and only accessible by you (default) or move the toggle to Share with others the query, so that other users using the same tenant can access the query in their Query Library.
        
    
3.  Click Save.
    
    A notification appears confirming that the query was saved successfully to the library, and closes on its own after a few seconds.
    
    The Graph Search query that you added is now listed as the first entry in the Query Library.
    

### Managing Graph Search queries in the Query Library

As needed, you can return to your queries in the Query Library to manage your queries in both the Query Library and My Recents tables. Here are the actions available to you, where the options differ depending on the table and states of the query:

-   Filter the list of queries using the filters displayed on the column headings of the table.
    
-   Run: Run the Graph Search query from either the Query Library and My Recents tables. This pivot (right-click) option will close the Query Library to display the query results.
    
-   Save as new: Duplicate the query and save it as a new query. This pivot (right-click) option is only available from the Query Library table for all queries.
    
-   Save query to library: This pivot (right-click) option is only available from the My Recents table.
    
-   Share with others: If your query is currently unshared, you can share with other users on the same tenant your query, which will be available in their Query Library. This pivot (right-click) option is only available from the query menu of the Query Library table when your query is unshared.
    
-   Unshare: If your query is currently shared with other users, you can Unshare the query and remove it from their Query Library. This pivot (right-click) option is only available from the query menu of the Query Library table when your query is shared with others. You can only Unshare a query that you created. If another user created the query, this option is disabled in the query menu.
    
-   Remove the query. You can only remove queries that you created. If another user created the query or for Palo Alto Networks, this pivot (right-click) option is disabled in the query menu.

## Edit and run queries in Query Center

Learn more about viewing the results of a query, modifying a query, and rerunning queries from Query Center.

From the Query Center you can take action on the Completed and In Progress queries that are running on your tenant.

Right-click a query to see the available options, where some of the options differ depending on the type of query you've selected. The pivot (right-click) options described below are some of the ones that may require further explanation.

**Note:**

If query limits are applied to your tenant, the number of concurrent running queries is limited per user. If query usage is reaching the defined limit, a system message warns you that a high query load is impacting performance. If you exceed the limit, new queries are blocked until query usage drops. You can view all active queries under Query Center → Active Queries, and cancel queries to reduce the load.

### View the results of a query

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
    

### Run a query

You can run a query for a Graph Search query.

1.  Select Investigation & Response → Search → Query Center → Query History.
    
2.  Identify the Graph Search query by looking in the Query Name and Query Description columns.
    
    The Query Description column displays the parameters that were defined for a query. If necessary, use the filter on the column to reduce the number of queries displayed.
    
3.  Right-click anywhere in the Graph Search query row and select Run query.
    
    You have the option to Run in same tab or Show in new tab.
    
4.  (Optional) The Graph Search results are displayed in a graph format by default. You can toggle to Table to view the results in a table format. In addition, you can always export the graph results using the icon at the top of the page to a PNG, SVG, or TSV file. Table results can only be exported to a TSV file.
    
5.  (Optional) Perform additional investigation on the graph or table results.
    
    On the graph results, you can either hover or select different nodes for further investigation. While in the table results, you can select any cell in the table for further investigation.
    

### Modify a query

After you view the query results of an XQL query or run a Graph Search query as explained in the tasks above, you can change your search parameters to refine the search results or correct a search parameter.

-   For queries created in XQL, type your changes in the XQL query field where the original query is listed and the results are displayed in the Query Results tab. After modifying the query, you can run, schedule, or save the query.
    
-   For queries created with a Query Builder template, the defined parameters are shown at the top of the Results page. Select Back to edit to modify the query with the template format or Continue in XQL to open the query in XQL.
    
-   For Graph Search queries, the graph results are displayed. Click anywhere in the Graph Search query interface, where your existing query is defined, to display the complete query, update your query, and rerun the search.
    

### Schedule a query to run

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
    

### Cancel a query

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

### Query Center reference information

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

## Supported assets and findings
**Prerequisite:**

Graph Search requires View or View/Edit RBAC permissions for Graph Search under Investigation & Response → Search.

The following tables list the supported assets and findings that can be used in Graph Search.

Supported assets table

Below are the asset classes and asset categories that are supported. When clicking on any asset category, the applicable asset types are displayed in the entity picker of the Graph Search user interface for building query based on the available data.

| Asset Class Name | Asset Category |
| --- | --- |
| AI | AI Model; AI Workspace; Dataset; Model Endpoint |
| Code | CI/CD Pipeline; Repository |
| Compute | Container Image; Container Image Repository; Container Instance; Container Registry; Kubernetes Cluster; Registry Image; Runtime Image; Serverless Function; Virtual Machine; Virtual Machine Image |
| Data | Database; Disk; Bucket |
| Identity | Group; Identity; Policy; Service Account |
| Network | Gateway; Load Balancer; Network Interface; Subnet; VPC |
| Organization | Account; Organization; Organization Unit |

Supported findings table

Below are the findings categories that are supported, along with the name of the category that you select in the entity picker of the Graph Search user interface.

| Finding Category Name | Finding Category to Select in Graph Search |
| --- | --- |
| Configuration | Configuration Finding |
| Data | Data Finding |
| Identity | Identity Finding |
| Malware | Malware Finding |
| Posture | Posture Finding |
| Vulnerability | Vulnerability Finding |

## FAQ on Graph Search

Answer some frequently asked questions relating to Graph Search.

**Prerequisite:**

Graph Search requires View or View/Edit RBAC permissions for Graph Search under Investigation & Response → Search.

Here are a number of Frequently Asked Questions (FAQ) about Graph Search:

**Question 1**: What data is currently searchable in Graph Search?

**Answer 1**: For this release, a number of assets and findings are supported. For the upcoming releases we will roll out more assets and provide the ability to model new services. For more information on the supported assets and findings, see Supported assets and findings.

**Question 2**: Can the Graph Search results be exported and in what formats?

**Answer 2**: For this release, you can export the Graph Search results to a PNG, SVG, and TSV file.

**Question 3**: Can the Graph Search results be grouped in the output?

**Answer 3**: Yes, there are two types of groupings possible - automatic groupings and manual groupings that you can apply to the graph results displayed.

Automatic groupings

Nodes are automatically grouped together to keep the graph looking cleaner and less busy. Nodes are grouped together when there are at least five nodes that meet the following conditions:

-   The node isn't a root node.
    
-   The path is identical.
    
-   For asset nodes, the nodes have the same class and category type.
    
-   For finding nodes, the nodes have the same category type.
    

A grouped node icon is displayed as a duplicate node. For example, if it's a group node, the icon looks like two shapes, one on top of another. When you select the group node, a dialog box opens displaying all the nodes included in the group.

Manual groupings

When reviewing the graph results of any Graph Search query, you can use the Group nodes icon to group by the Cloud Provider, Cloud Account, or Cloud Region. Selecting one of these grouping enables you to view the graph results in an aggregated format, providing a clearer and more organized perspective of the data. This feature also helps to Identify patterns and trends more easily in your data by grouping similar entities together. In the future, the Group nodes feature will be expanded to enable additional groupings.

**Question 4**: How are the Graph Search query results displayed?

**Answer 4**: The query results are displayed in a graph (default) or table format. In a graph format the paths on the graph that matched the node types and conditional attributes in the query are displayed. Each result is a full path of the matching query. Yet, in a table format the results are displayed in a table, where each row in the table represents a different path in the graph that goes through all the matching node types and attributes as they appear in the Graph Search query. You can view the full asset information of any cell in the table by clicking the cell. Every asset and finding table shows different default columns.

**Question 5**: Are there any built-in manipulations to the query results that I can apply or are automatically displayed without having to update and rerun the Graph Search query?

**Answer 5**: Yes, the following are available:

-   On the right side of the graph results, there are different icons that can help you drilldown into your graph results. These two icons provide built-in manipulations without having to make any changes to your Graph Search query:
    
    -   : Use the layers icon to easily add or remove additional information to the graph without having to define these parameters in your Graph Search query. You can decide when to include these built-in layers, as needed. The following are available:
        
        -   Public Exposure to the Internet: Tracks the asset nodes with internet exposure that could be targeted for external surface attacks by displaying the exposure path. A Globe node called Internet is added to the graph, which links all exposed asset nodes to this Globe node. You can expand this connection by clicking the + icon to reveal the full internet path to include, for example, the NIC, Subnet, and Gateway. In the exposure path, you can select each node, or hover on it and select More Info, you'll see more information displayed in a dialog box. You can click View Details to drill down even further on the asset node to display more information on the node depending on the data collected for that asset node selected. Internet paths are collapsed by default.
            
        -   Related Cases: Displays the number of related Cases for each asset node with a breakdown by severity.
            
        -   Runtime Events: Adds 100 most recent runtime events to the graph results, which are refreshed every hour. This enables you to investigate real-time activity and identify critical events, such as access to sensitive information typically contained in a storage bucket, which generate issues and cases. All the bucket nodes in the path include a runtime icon  underneath and run an animation on all the bucket and virtual machine nodes. You can click the runtime icon to reveal more info, such as connection details and runtime events. Click Show Recent Events to display the Runtime Events table with more details on the last 100 events.
            
        
    -   : Use the Group nodes icon to group by the Cloud Provider, Cloud Account, or Cloud Region. Selecting one of these grouping enables you to view the graph results in an aggregated format, providing a clearer and more organized perspective of the data. This feature also helps to Identify patterns and trends more easily in your data by grouping similar entities together. In the future, the Group nodes feature will be expanded to enable additional groupings.
        
    
-   Vulnerability finding nodes automatically display under the node a breakdown of severity.
    

**Question 6**: Are Graph Search queries accessible from the Query Library and are there any built-in queries that come out-of-the-box to view?

**Answer 6**: Cortex Cloud provides as part of Graph Search a Query Library for saving and managing your own queries, queries shared with you, and built-in Graph Search queries provided by Palo Alto Networks to help illustrate how to build meaningful Graph Search queries on your data.
