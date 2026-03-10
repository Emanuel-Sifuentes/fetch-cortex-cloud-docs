---
title: "Jenkins for code scans"
tocId: "sPjMfvkMefipL6S45KOiQQ"
contentId: "yVawPSGVgRtnoZEW5MV~YA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Jenkins-for-code-scans"
depth: 2
---

# Jenkins for code scans
Integrate Cortex Cloud Application Security with your Jenkins server to allow dynamic, automated, and context-specific code scans across your codebase. This integration provides continuous scanning of your workflows, triggered by code changes or pipeline events, ensuring security checks are performed and issues are detected as early as possible.

Code scans are executed using the Cortex CLI, and include automated shift-left actions based on scan results.

**Note**

Jenkins onboarding offers both code and CI/CD scanning. A single integrated instance supports either code or CI scanning, but not both. If you require both code and CI scanning for your Jenkins servers, you must create two separate integrations, selecting the appropriate scanning type for each. To onboard Jenkins for CI/CD scans, refer to Jenkins for CI/CD pipeline scans.

**Prerequisite**

-   Grant **Administrator** permissions to the user integrating Cortex Cloud Application Security with Jenkins
    
-   Create an egress path to establish the designated route for outbound data transmission from Cortex Cloud to third party services. For more information about configuring egress paths, refer to Egress configurationsEgress configurations
    

### Onboarding steps

1.  On the Cortex Cloud console:
    
    1.  Navigate to Settings → Data Sources & Integrations → \+ Add New.
        
    2.  Search for and hover over Jenkins and click Add, or Add Another Instance if an instance is already onboarded.
        
2.  On the Select Integration step of the Jenkins integration, select Code Scan → Next.
    
3.  On the Add Environment Variables step of the wizard.
    
    1.  Select Generate API key.
        
        The API key secret and API key ID values are generated and populate their respective fields.
        
    2.  Select your system architecture.
        
    3.  Click Next.
        
4.  Store your Cortex Cloud API Key and API ID in the Jenkins Credentials store.
    
    **Danger**
    
    -   For Cortex Cloud Application Security CI tools, you must store secrets in Jenkins Credentials for use in your Jenkins pipelines using either of these methods:
        
        -   **Plain text storage**: Store secrets directly as plain text in Jenkins Credentials. Access them in your pipeline using the `credentials` function, which retrieves the secret directly as plain text
            
        -   **Credentials Binding Plugin**: Use the `withCredentials` function (requires installing the Credentials Binding Plugin) to securely bind credentials to environment variables within your pipeline
            
        
    -   The variable names CORTEX_API_KEY and CORTEX_API_KEY_ID must be used exactly as provided. They are part of a predefined system and cannot be changed without causing errors
        
    
    -   If you have an API key:
        
        1.  Copy the CORTEX_API_KEY and CORTEX_API_KEY_ID variable names from their respective fields in the wizard.
            
        2.  Add the CORTEX_API_KEY and CORTEX_API_KEY_ID names and their corresponding values as separate environment variables (secrets) to the Jenkins Credentials store.
            
        
    -   If you do not have an API key:
        
        1.  Click Generate API key → Copy the CORTEX_API_KEY and CORTEX_API_KEY_ID and their corresponding values from their respective fields.
            
        2.  Add the CORTEX_API_KEY and CORTEX_API_KEY_ID names and their corresponding values as separate environment variables (secrets) to the Jenkins Credentials store.
            
        
    
5.  On the Set repository step of the wizard: (Optional): Add the URL of the repository to be scanned, or skip this step if you are adding code scanning to an existing pipeline → Next.
    
    **Note**
    
    -   This step is only required for new pipelines
        
    -   For private repositories, ensure the necessary credentials are configured in Jenkins Credentials
        
    
6.  On the Configure Subscription step of the integration wizard.
    
    1.  Copy and paste the code from the Configure Subscription step of the integration wizard into your Jenkins pipeline.
        
    2.  In the `labels` property of your Jenkins configuration file, enter the label of a Jenkins node that is configured with Docker.
        
        **Note**
        
        This ensures your build runs within a Docker environment. If a node without Docker is used, the build will fail.
        
    3.  Optional: The provided code assumes that your Cortex Cloud access key and ID are stored as plain text in Jenkins Credentials. You can replace this method with your preferred secret management solution (such as the `withCredentials` function).
        
    4.  Click Done.
        
7.  Verify you receive the confirmation message on the last step of the wizard → Close.
    
8.  Verify integration and confirm that the your integrated Jenkins instance has a status of Connected.
    
    1.  On the Data Sources & Integrations page, search for Jenkins in the search bar.
        
    2.  Hover over and select the resulting entry.
        
    3.  Locate and verify that the status of your instance is Connected.
        
9.  Next step: View scan results and mitigate issues.
    

### Jenkins code scan workflow template (without checkout)

This Jenkins workflow example automates code scanning using the Cortex CLI. It does not include a step to checkout a repository. The workflow contains placeholder values (often in brackets) and generic terms (such as dev) that you must replace with your environment-specific information before use.

Read more...

```
pipeline {
    agent {
        docker {
            image 'jenkins/agent:alpine'
            args '-u root --privileged -v /var/run/docker.sock:/var/run/docker.sock'
            label '<REPLACE WITH LABEL OF NODE WITH DOCKER INSTALLED>' // Use a docker agent with docker installed
        }
    }

    environment {
        CORTEX_API_KEY = credentials('CORTEX_API_KEY')
        CORTEX_API_KEY_ID = credentials('CORTEX_API_KEY_ID')
        CORTEX_API_URL = '<YOUR_CORTEX_URL>'// Your placeholder
        CORTEX_CLI_VERSION = '0.8.11'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh '''
                apk add --no-cache jq docker
                '''
            }
        }

        stage('Get Temporary Token') {
            environment {
                TEMP_TOKEN = ""
            }
            steps {
                script {
                    def response = sh(script: """
                        curl --location '${env.CORTEX_API_URL}/public_api/cas/v1/cortex-cli/create-token' \\
                          --header 'Authorization: ${env.CORTEX_API_KEY}' \\
                          --header 'x-xdr-auth-id: ${env.CORTEX_API_KEY_ID}' \\
                          --header 'Content-Type: application/json' \\
                          --data '{}' \\
                          -s
                    """, returnStdout: true).trim()

                    env.TEMP_TOKEN = sh(script: """echo '${response}' | jq -r '.token'""", returnStdout: true).trim()
                }
            }
        }

        stage('Pull Docker Image') {
            steps {
                sh """
                docker pull distributions-dev.traps.paloaltonetworks.com/cli-docker/${env.TEMP_TOKEN}/method:amd64-${env.CORTEX_CLI_VERSION}-dev
                docker tag distributions-dev.traps.paloaltonetworks.com/cli-docker/${env.TEMP_TOKEN}/method:amd64-${env.CORTEX_CLI_VERSION}-dev cortexcli:${env.CORTEX_CLI_VERSION}
                """
            }
        }

        stage('Run Docker Container') {
            // Replace the repo-id with your repository like: owner/repo
            steps {
                unstash 'source'
                env.BRANCH = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                sh """
                docker run --rm --platform linux/amd64 cortexcli:${env.CORTEX_CLI_VERSION} \\
                  --api-base-url ${env.CORTEX_API_URL} \\
                  --api-key ${env.CORTEX_API_KEY} \\
                  --api-key-id ${env.CORTEX_API_KEY_ID} \\
                  code scan \\
                  --directory . \\
                  --repo-id <REPLACE WITH REPO_OWNER/REPO_NAME> \\
                  --branch $BRANCH
                """
            }
        }
    }
}
```

#### Jenkins code scan workflow template (with checkout)

This Jenkins workflow example automates code scanning using the Cortex CLI. It includes a step to checkout a repository. The workflow contains placeholder values (often in brackets) and generic terms (such as dev) that you must replace with your environment-specific information before use.

Read more...

```
pipeline {
    agent {
        docker {
            image 'jenkins/agent:alpine'
            args '-u root --privileged -v /var/run/docker.sock:/var/run/docker.sock'
            label '<REPLACE WITH LABLE OF NODE WITH DOCKER INSTALLED>' // Use a docker agent with docker installed
        }
    }

    environment {
        CORTEX_API_KEY = credentials('CORTEX_API_KEY')
        CORTEX_API_KEY_ID = credentials('CORTEX_API_KEY_ID')
        CORTEX_API_URL = '<YOUR_CORTEX_URL>' // Your placeholder
        CORTEX_CLI_VERSION = '0.8.11'
    }

    stages {
        stage('Checkout Repository') {
            steps {
                git branch: 'main', url: 'https://github-example.com/example-repo'
                stash includes: '\*\*/\*', name: 'source'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                apk add --no-cache jq docker
                '''
            }
        }

        stage('Get Temporary Token') {
            environment {
                TEMP_TOKEN = ""
            }
            steps {
                script {
                    def response = sh(script: """
                        curl --location '${env.CORTEX_API_URL}/public_api/cas/v1/cortex-cli/create-token' \\
                          --header 'Authorization: ${env.CORTEX_API_KEY}' \\
                          --header 'x-xdr-auth-id: ${env.CORTEX_API_KEY_ID}' \\
                          --header 'Content-Type: application/json' \\
                          --data '{}' \\
                          -s
                    """, returnStdout: true).trim()

                    env.TEMP_TOKEN = sh(script: """echo '${response}' | jq -r '.token'""", returnStdout: true).trim()
                }
            }
        }

        stage('Pull Docker Image') {
            steps {
                sh """
                docker pull distributions-dev.traps.paloaltonetworks.com/cli-docker/${env.TEMP_TOKEN}/method:amd64-${env.CORTEX_CLI_VERSION}-dev
                docker tag distributions-dev.traps.paloaltonetworks.com/cli-docker/${env.TEMP_TOKEN}/method:amd64-${env.CORTEX_CLI_VERSION}-dev cortexcli:${env.CORTEX_CLI_VERSION}
                """
            }
        }

        stage('Run Docker Container') {
            // Replace the repo-id with your repository like: owner/repo
            steps {
                unstash 'source'
                env.BRANCH = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                sh """
                docker run --rm --platform linux/amd64 cortexcli:${env.CORTEX_CLI_VERSION} \\
                  --api-base-url ${env.CORTEX_API_URL} \\
                  --api-key ${env.CORTEX_API_KEY} \\
                  --api-key-id ${env.CORTEX_API_KEY_ID} \\
                  code scan \\
                  --directory . \\
                  --repo-id <REPLACE WITH REPO_OWNER/REPO_NAME> \\
                  --branch $BRANCH
                """
            }
        }
    }
}
```

#### Manage data source integrations

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