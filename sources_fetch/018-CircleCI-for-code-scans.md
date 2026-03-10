---
title: "CircleCI for code scans"
tocId: "fjWuoSJTjTasn_lSFbxLlA"
contentId: "nEYbrjoZEU9GMvB9hhPA7A"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/CircleCI-for-code-scans"
depth: 2
---

# CircleCI for code scans
Integrate Cortex Cloud Application Security with your CircleCI system to allow dynamic, automated, and context-specific code scans across your codebase. This integration provides continuous scanning of your workflows, triggered by code changes or pipeline events, ensuring security checks are performed and issues are detected as early as possible.

Code scans are executed using the Cortex CLI, and include automated shift-left actions based on scan results.

**Note**

CircleCI onboarding offers both code and CI/CD scanning. A single integrated instance supports either code or CI scanning, but not both. If you require both code and CI scanning for your CircleCi environment, you must create two separate integrations, selecting the appropriate scanning type for each. To onboard CircleCI for CI/CD scans, refer to CircleCI for CI/CD pipeline scans.

**Prerequisite**

Before you begin:

-   **User permissions**: Ensure the user performing the integration has permissions to edit pipeline configurations (such as YAML files) and manage secrets/credentials within the CI platform to store the Cortex Cloud API key securely
    

### Onboarding steps

1.  On the Cortex Cloud console:
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Enter CircleCI in the search bar → Hover over the displayed search result → Connect.Search for and hover over CircleCI and click Add, or Add Another Instance if an instance is already onboarded.
        
2.  On the Select Integration step of the CircleCI integration wizard, select Code Scan → Next.
    
3.  On the Add Environment Variables step of the wizard.
    
    1.  Select Generate API key.
        
        The API key secret and API key ID values are generated and populate their respective fields.
        
    2.  Select your system architecture.
        
    3.  Click Next.
        
4.  Create a context in CircleCI and name it cortex-secrets.
    
    **Important**
    
    The cortex-secrets naming convention for the context is mandatory to ensure functionality and must not be changed.
    
5.  Store your Cortex Cloud API Key and API ID within the cortex-secrets context.
    
    -   If you have an API key:
        
        1.  Copy the CORTEX_API_KEY and CORTEX_API_KEY_ID variable names from their respective fields in the wizard.
            
        2.  Add the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values as separate environment variables (secrets) to the cortex-secrets context.
            
        
    -   If you do not have an API key:
        
        1.  Click Generate API key → Copy the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values from their respective fields.
            
        2.  Add the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values as separate environment variables to the cortex-secrets context.
            
        
    
    **Note**
    
    Do not change the names of the environment variables provided by Cortex Cloud. They are required for proper integration and functionality.
    
    For more information on context in CircleCI, refer to [Using contexts in CircleCI](https://circleci.com/docs/contexts/).
    
6.  Copy and paste the pre-populated code from the Configure Job step of the integration wizard into your `.circleci/config.yaml` file, and click Done.
    
7.  In your `.circleci/config.yaml` file:
    
    -   Verify that the YAML file includes a Docker container image
        
    -   Verify that the context is `cortex-secrets`
        
    -   In the `docker run` command, replace `--repo-id REPO_OWNER/REPO_NAME` values with your repository owner and repository name
        
    
8.  Check that the The integration will be created once CircleCI authorizes message is displayed in the final step of the wizard and click Close .
    
9.  Verify integration and confirm that the your integrated CircleCI instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, search for CircleCI in the search bar.
        
    2.  Hover over and select the resulting entry.
        
    3.  Verify that the status of your CircleCI instance is Connected.
        
10.  Next step: View scan results and mitigate issues.
     

### CircleCI code scan workflow template

This circle workflow example automates code scanning using the Cortex CLI. The workflow contains placeholder values (often in brackets) and generic terms (such as dev) that you must replace with your environment-specific information before use

```
version: 2.1

executors:
  docker-executor:
    docker:
      - image: cimg/base:stable  # Replace with a suitable image or executor
    environment:
      CORTEX_API_URL: "https://{CORTEX_URL}
      CORTEX_CLI_VERSION: "0.8.11"

jobs:
  setup-environment:
    executor: docker-executor
    steps:
      - checkout
      - setup_remote_docker
      - run:
          name: Get Temporary Token and Pull Docker Image
          command: |
            export TOKEN_RESPONSE=$(curl --location "${CORTEX_API_URL}/public_api/cas/v1/cortex-cli/create-token" \\
                                        --header "Authorization: ${CORTEX_API_KEY}" \\
                                        --header "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
                                        --header "Content-Type: application/json" \\
                                        --data "{}" -s)
            export TEMP_TOKEN=$(echo "$TOKEN_RESPONSE" | jq -r '.token')
            docker pull distributions-dev.traps.paloaltonetworks.com/cli-docker/${TEMP_TOKEN}/method:amd64-${CORTEX_CLI_VERSION}-dev
            docker tag distributions-dev.traps.paloaltonetworks.com/cli-docker/${TEMP_TOKEN}/method:amd64-${CORTEX_CLI_VERSION}-dev cortexcli:${CORTEX_CLI_VERSION}
      - run:
          name: Run Cortex CLI Container
          # Replace owner/repo with your actual repository information
          command: |
            docker run --rm cortexcli:${CORTEX_CLI_VERSION} \\
                        --api-base-url ${CORTEX_API_URL} \\
                        --api-key ${CORTEX_API_KEY} \\
                        --api-key-id ${CORTEX_API_KEY_ID} \\
                        code scan \\
                        --directory . \\
                        --repo-id <REPLACE WITH REPO_OWNER/REPO_NAME> \\
                        --branch "${CIRCLE_BRANCH}"

workflows:
  version: 2
  build:
    jobs:
      - setup-environment:
          context: cortex-secrets
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