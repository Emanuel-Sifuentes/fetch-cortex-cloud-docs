---
title: "GitHub Actions"
tocId: "OMdgh8r8T9NxBY9pEHhDVw"
contentId: "ZJmrJTQ4O8sI0nhiqGQ10Q"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/GitHub-Actions"
depth: 2
---

# GitHub Actions
Integrate Cortex Cloud Application Security with GitHub Actions to allow dynamic, automated, and context-specific scans within your development workflow. This includes continuous scanning of your workflows whenever changes are pushed or triggered, integrating security checks, and detecting issues as soon as they are introduced.

**Prerequisite**

Before you begin:

-   **User permissions**: Ensure the user performing the integration has permissions to edit pipeline configurations (such as YAML files) and manage secrets/credentials within the CI platform to store the Cortex Cloud API key securely
    

### Onboarding steps

1.  On the Cortex Cloud console:
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for and hover over GitHub Actions, and click Add, or Add Another Instance if an instance is already onboarded.
        
2.  On the Add Environment Variables step of the wizard.
    
    1.  Select Generate API key.
        
        The API key secret and API key ID values are generated and populate their respective fields.
        
    2.  Optional: Change the default system architecture detected by the system.
        
    3.  Click Next.
        
3.  Store your Cortex Cloud API key and API key ID in the GitHub Actions Secrets credential store.
    
    -   If you have an API key:
        
        1.  Copy the CORTEX_API_KEY and CORTEX_API_KEY_ID variable names from their respective fields in the wizard.
            
        2.  Add the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values as separate environment variables (secrets) to the GitHub Actions Secrets credential store.
            
        
    -   If you do not have an API key:
        
        1.  Click Generate API key → Copy the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values from their respective fields
            
        2.  Add the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values as separate environment variables (secrets) to the GitHub Actions Secrets credential store.
            
        
    
    **Note**
    
    Do not change the names of the environment variables provided by Cortex Cloud. They are required for proper integration and functionality.
    
    For more information on passing secrets as environment variables to GitHub Actions, refer to [Using secrets in GitHub Actions](https://docs.github.com/actions/security-guides/encrypted-secrets).
    
4.  Copy and paste the pre-populated sample code from the Configure Job step of the integration wizard into your GitHub Actions job configuration → Done
    
    **Note**
    
    The code is only a reference. Replace the placeholder values with your build-specific values.
    
5.  Ensure that the **Connector Created Successfully** message is displayed in the final step of the wizard, and click **Close**.
    
6.  Verify integration and confirm that the your integrated GitHub Actions instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, search for GitHub Actions in the search bar.
        
    2.  Hover over the resulting entry and click View Details.
        
    3.  Locate your instance and verify that the status is Connected.
        
7.  Next step: View scan results and mitigate issues.
    

### GitHub Actions code scan workflow template

This GitHub Actions workflow example automates code scanning using the Cortex CLI. The workflow contains placeholder values (often in brackets) and generic terms (such as `dev`) that you must replace with your environment-specific information before use.

```
name: Cortex CLI Code Scan

on:
  push:
    branches:
      - main
  workflow_dispatch:

env:
  CORTEX_API_KEY: ${{secrets.CORTEX_API_KEY}}
  CORTEX_API_KEY_ID: ${{secrets.CORTEX_API_KEY_ID}}
  CORTEX_API_URL: https://<CORTEX_URL>
  CORTEX_CLI_VERSION: 0.8.11
  
jobs:
  download-and-execute:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Repository
      uses: actions/checkout@v2
    
    - name: Set up QEMU
      uses: docker/setup-qemu-action@v2
      with:
        platforms: arm64
        
    - name: Install Dependencies
      run: |
        sudo apt-get update
        sudo apt-get install -y jq curl

    - name: Get Temporary Token
      run: |
        TOKEN_RESPONSE=$(curl --location "${CORTEX_API_URL}/public_api/cas/v1/cortex-cli/create-token" \\
          --header "Authorization: ${CORTEX_API_KEY}" \\
          --header "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
          --header 'Content-Type: application/json' \\
          --data '{}')
        TEMP_TOKEN=$(echo $TOKEN_RESPONSE | jq -r '.token')
        echo "TEMP_TOKEN=$TEMP_TOKEN" >> $GITHUB_ENV

    - name: Pull Docker Image
      run: |
        docker pull distributions-dev.traps.paloaltonetworks.com/cli-docker/${{env.TEMP_TOKEN}}/method:arm64-${{env.CORTEX_CLI_VERSION}}-dev
        docker tag distributions-dev.traps.paloaltonetworks.com/cli-docker/${{env.TEMP_TOKEN}}/method:arm64-${{env.CORTEX_CLI_VERSION}}-dev cortexcli:${{env.CORTEX_CLI_VERSION}}

    - name: Run Docker Container
      run: |
        docker run --rm --platform linux/arm64 cortexcli:${{env.CORTEX_CLI_VERSION}} \\
          --api-base-url ${CORTEX_API_URL} \\
          --api-key ${CORTEX_API_KEY} \\
          --api-key-id ${CORTEX_API_KEY_ID} \\
          code scan \\
          --directory . \\
          --repo-id ${{github.repository}}
```

### Manage data source integrations

Manage data source integrations to maintain current configurations and align with evolving security requirements.

1.  Navigate to Settings → Data Sources & Integrations and use the Vendor filter to located the required integration.
    
2.  Select your vendor from the list.
    
    The integrated instances for the selected vendor are displayed.
    
3.  **Actions**: Right-click on an instance and select an option:
    
    -   Edit instance: Redirects to the Select Repositories step of the integration wizard, where you can modify configurations for the selected instance
        
    -   Delete instance: When confirmed, deletes the instance, including data from previous scans
        
    -   Copy entire row: Copies all column values for the selected row to the clipboard
        
    
    **Note**
    
    Requisite RBAC permissions are required for edit and delete operations.
    
4.  **Instance details view**: When you select (click into) a specific integration instance, the UI shows two main sections:
    
    -   Quick instance details (top summary widgets)
        
    -   Grid/Table (repositories, applications, or workspaces depending on type)
        
    
    The view adapts based on the category of the integration: VCS, CI/CD or external vendor integrations. Refer to Instance details view by integration below for more information.
    

#### What gets deleted/cleaned up

| Data Category | Action |
| --- | --- |
| Integration configuration | Deleted |
| Integration coverage details | Deleted |
| Mapped repositories | All repositories deselected |
| Repository cache | Deleted |
| Repository cache metadata | Deleted |
| Webhook subscriptions | Deleted + unsubscribe tasks generated |
| Webhook subscription tasks | Deleted |
| Webhook change logs | Set to expire in 2 weeks |
| External projects | Deleted |
| External project scans | Deleted |
| Findings | Closed |
| Issues | Resolved |
| Repository assets | Deleted |
| Organization assets | Deleted |
| Collaborator assets | Deleted |
| CI/CD graph entities | Deleted |
| CI/CD pipeline/instance assets | Deleted |
| Repository tools | Deleted |

#### Instance details view by integration

When you select a specific integration instance, the UI adapts based on the type category: VCS, CI/CD or external vendor integrations.

## Quick instance details (top summary widgets)

| Widget | VCS (GitHub, GitLab and so on ) | CI/CD (Jenkins, CircleCI and so on) | External vendor (Snyk, Semgrep, and so on) | Collector |
| --- | --- | --- | --- | --- |
| Status | Yes (Connected/Warning/Error/Disabled) + "Review health" link | Yes (Same) | Yes (Same) | Yes + **Execution log** link |
| Domain | Yes (if enterprise/self-managed) | No | Yes | No |
| Finding Source | No | No | Yes (3rd Party SAST / 3rd Party SCA) | Yes |
| Repositories / Applications | Yes Repositories (count) | Yes Repositories (count) | Yes Applications (count) | Yes Repositories (count) |
| Instance Type | Yes: Cloud | Yes: Cloud | Yes: Cloud | Yes: Cloud |
| Version | Yes (if available) | Yes (if available) | Yes (if available) | Yes (if available) |

## Grid/table content (below summary)

| Aspect | VCS | CI/CD | External Vendor | Collector |
| --- | --- | --- | --- | --- |
| Grid Title | Repositories | Repositories | Applications | Repositories |
| Data Source URL | /api/cas/v1/repositories/table | /api/cas/v1/repositories/table | /api/cas/v1/external-projects/table | /api/cas/v1/repositories/table |

## Context menu actions by type

| Action | VCS | CI/CD | External vendor | HCP Terraform | Collector |
| --- | --- | --- | --- | --- | --- |
| Set Scanned Branches | Yes | No | No | No | No |
| Scan Repository | Yes | No | No | No | No |
| Scan Configuration | Yes | No | No | No | No |
| Scan Application | No | No | Yes | No | No |
| Change Mapping | No | No | Yes | No | No |
| Remove Repository | Yes | Yes | No | Yes | No |
| Remove Application | No | No | Yes | No | No |

## Instances list view (selection list)

| Column | VCS | CI/CD | Terraform | External vendor | Collector |
| --- | --- | --- | --- | --- | --- |
| Connector Name | Yes | Yes | Yes | Yes | Yes |
| Status | Yes | Yes | Yes | Yes | Yes |
| Repositories | Yes | Yes | Yes (Workspaces) | Yes (Projects) | Yes |
| Finding Source | No | No | No | No | Yes |
| Created At | Yes | Yes | Yes | Yes | No |

## Header actions

| Action | VCS / CI/CD / External vendor / Terraform | Collector |
| --- | --- | --- |
| Edit Instance | Yes | Yes |
| Remove Instance | Yes | Yes |
| Copy API URL | No | Yes |
| Disable/Enable Instance | No | Yes |
| Test Ingestion | No | Yes |