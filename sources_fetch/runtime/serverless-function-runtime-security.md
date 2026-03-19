# Serverless function runtime security

## Overview
Cortex Cloud enables runtime monitoring within a cloud environment by embedding Cortex XDR agent directly into the code of the serverless function. This allows for real-time monitoring of code execution, processes, networking, and filesystem activity, along with the enforcement of policies to permit or deny these actions. This in-depth runtime visibility enhances the overall security of your serverless functions.

Policy violations are detected and logged in Cortex Issues to allow for effective scoping and analysis in order to thoroughly assess the issues.

### Use cases

-   **Visibility of policy violations in issues**: Use the Issues entity to view the policy violations of serverless functions that have occurred.  You can drill down and view information such as region, cloud function runtime, the specific serverless function name which indicates the issue that’s occurred, cloud function request id which is the instance id from the cloud provider.
    
-   **Monitor serverless functions in your cloud environment**: After embedding the agent in the function, the agent monitors for policy violations as defined in the profile you have configured.
    

### Supported platforms

Runtime protection for serverless functions is available for Cortex Cloud Runtime Security, Cortex XSIAM Premium, Cortex XSIAM Enterprise, and Cortex XSIAM NG Siem licenses.

-   Supported runtime environments: Python, Node.js.
    
-   Supported architecture: x86_64
    
-   Supported cloud provider: Amazon Web Services (AWS)
    

### User roles and permissions

Granting access and configuration permissions to serverless function capabilities in the Cortex tenant, you must verify that the user has the correct settings in the linked role.

1.  Go to  Settings+Configuration+Access Management → Roles.
    
2.  Go to the relevant role, right-click and select Edit Role and in the Components tab, verify under Inventory, that Agent Profiles, Agent Installations and Agent Extension Policies are configured to View/Edit.

## Set up serverless function protection
Setting up serverless function protection includes:

1.  Configure restriction profile for serverless functions
    
2.  Create a new policy rule for serverless functions
    
3.  Create a serverless function agent package

## Serverless runtime issues
You can view all serverless function issues detected by an agent and generated from policy violations under Issues (under Cases & Issues) inventories.

Every policy violation creates an issue per type:

-   Process activity - enables specifying specific allowed list processes, blocking all processes except the main process and detecting crypto mining attempts.
    
-   Network activity - enables monitoring and enforcement of DNS resolutions, inbound and outbound network connections.
    
-   Filesystem activity - enables defining specific paths in an allowed or denied list.
    

Additional issues from specific policy violation are raised, which include the same cloud provider, region, runtime, function name, function version, issue name and issue description, will be suppressed.

The Issues page includes the following information indicating unique serverless function issues raised by agents:

| Field | Description |
| --- | --- |
| Domain | For serverless, this is set to Security. |
| Category | For serverless, this is set to Cloud. |
| Name | For serverless, the relevant issue name appears: Serverless function Network Policy violation for outbound ports; Serverless function Network Policy violation for listening ports; Serverless function Network Policy violation for DNS; Serverless function Network Policy violation for IPs; Serverless function File system Policy violation; Serverless function Process Policy violation |
| Detection method | For serverless, this is set to XDR agent. |
| Severity | For serverless, this is always set to High. |
| Cloud Function Runtime | Python; Node.JS |
| Cloud Function Request ID | Instance id from the cloud provider. |

**Note:**

Issues triggered within 24 hours, sharing the same name and description, will be aggregated into cases along with issues from the same function per execution.
