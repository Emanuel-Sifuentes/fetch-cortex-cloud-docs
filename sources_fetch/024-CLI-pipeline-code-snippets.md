---
title: "CLI pipeline code snippets"
tocId: "kjCxhxOCjRB68siV6D9fOg"
contentId: "akzwZjVaZUGzfRHQCCyvsw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/CLI-pipeline-code-snippets"
depth: 1
---

# CLI pipeline code snippets
You can integrate the Cortex CLI directly into your CI/CD pipelines to enable automated code scans by adding code snippets to your to your build script or pipeline configuration, such as a `YAML` or `Groovy` file. Both `ARM` and `AMD` architectures are supported, ensuring you can scan your codebase regardless of your runner’s environment.

**Danger**

**User permissions**: Ensure the user performing the integration has permissions to edit pipeline configurations (such as YAML files).

**User permissions**: Ensure the user performing the integration has permissions to edit pipeline configurations (such as YAML files).

You must replace placeholder variables with your own credentials and environment-specific details.

## AWS CodeBuild

-   For AMD architecture
    
    ```
    version: 0.2
    env:
      variables:
        CORTEX_API_URL: <your_cortex_api_url>
        CORTEX_CLI_VERSION: "0.13.14"
      secrets-manager:
        CORTEX_API_KEY: "CORTEX_API_KEY"   
        CORTEX_API_KEY_ID: "CORTEX_API_KEY_ID"
    phases:
      install:
        commands:
          - apt-get update
          - apt-get install -y curl jq git
      pre_build:
        commands:
          - echo "Getting repo name"
          - export CODEBUILD_ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)  
          - export CODEBUILD_GIT_BRANCH="$(git symbolic-ref HEAD --short 2>/dev/null)"
          - |
            if \[ "$CODEBUILD_GIT_BRANCH" = "" \] ; then
              export CODEBUILD_GIT_BRANCH="$(git rev-parse HEAD | xargs git name-rev | cut -d' ' -f2 | sed 's/remotes\\/origin\\///g')";
            fi
          - export CODEBUILD_PROJECT=${CODEBUILD_BUILD_ID%:$CODEBUILD_LOG_PATH}
          - echo "Downloading cortexcli"
          - |
            crtx_resp=$(curl "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=amd64" \\
              -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
              -H "Authorization: ${CORTEX_API_KEY}")
          - crtx_url=$(echo "$crtx_resp" | jq -r ".signed_url")
          - curl -o cortexcli "$crtx_url"
          - chmod +x cortexcli
          - ./cortexcli --version
          
      build:
        commands:
          - |
            ./cortexcli \\
                       --api-base-url "${CORTEX_API_URL}" \\
                       --api-key "${CORTEX_API_KEY}" \\
                       --api-key-id "${CORTEX_API_KEY_ID}" \\
                       code scan \\
                       --directory "$(pwd)" \\
                       --repo-id $CODEBUILD_ACCOUNT_ID/$CODEBUILD_PROJECT \\
                       --branch $CODEBUILD_GIT_BRANCH \\
                       --source AWS_CODE_BUILD \\
                       --create-repo-if-missing
    artifacts:
      files:
        - '\*\*/\*'
    ```
    
-   For ARM architecture
    
    ```
    version: 0.2
    env:
      variables:
        CORTEX_API_URL: <your_cortex_api_url> 
        CORTEX_CLI_VERSION: "0.13.16"
      secrets-manager:
        CORTEX_API_KEY: "CORTEX_API_KEY"   
        CORTEX_API_KEY_ID: "CORTEX_API_KEY_ID"
    phases:
      install:
        commands:
          - apt-get update
          - apt-get install -y curl jq git
      pre_build:
        commands:
          - echo "Getting repo name"
          - export CODEBUILD_ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)  
          - export CODEBUILD_GIT_BRANCH="$(git symbolic-ref HEAD --short 2>/dev/null)"
          - |
            if \[ "$CODEBUILD_GIT_BRANCH" = "" \] ; then
              export CODEBUILD_GIT_BRANCH="$(git rev-parse HEAD | xargs git name-rev | cut -d' ' -f2 | sed 's/remotes\\/origin\\///g')";
            fi
          - export CODEBUILD_PROJECT=${CODEBUILD_BUILD_ID%:$CODEBUILD_LOG_PATH}
          - echo "Downloading cortexcli"
          - |
            crtx_resp=$(curl "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=arm64" \\
              -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
              -H "Authorization: ${CORTEX_API_KEY}")
          - crtx_url=$(echo "$crtx_resp" | jq -r ".signed_url")
          - curl -o cortexcli "$crtx_url"
          - chmod +x cortexcli
          - ./cortexcli --version
          
      build:
        commands:
          - |
            ./cortexcli \\
                       --api-base-url "${CORTEX_API_URL}" \\
                       --api-key "${CORTEX_API_KEY}" \\
                       --api-key-id "${CORTEX_API_KEY_ID}" \\
                       code scan \\
                       --directory "$(pwd)" \\
                       --repo-id $CODEBUILD_ACCOUNT_ID/$CODEBUILD_PROJECT \\
                       --branch $CODEBUILD_GIT_BRANCH \\
                       --source AWS_CODE_BUILD \\
                       --create-repo-if-missing
    artifacts:
      files:
        - '\*\*/\*'
    ```
    

## Azure Pipelines

-   For AMD architecture
    
    ```
    trigger:
      branches:
        include: \['\*'\]
    pr:
      branches:
        include: \['\*'\]
    pool:
      vmImage: ubuntu-latest
    variables:
      CORTEX_API_URL: <your_cortex_api_url> 
      MIN_LOG_LEVEL: "DEBUG"
    steps:
    - checkout: self
      clean: true
    - task: NodeTool@0
      displayName: "Use Node.js 22.x"
      inputs:
        versionSpec: "22.x"
    - bash: |
        set -euo pipefail
        sudo apt-get update
        sudo apt-get install -y --no-install-recommends jq ca-certificates curl
        BASE="${CORTEX_API_URL%/}"
        URL="$BASE/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=amd64"
        set +x
        CRTX_URL=$(curl -fsSL "$URL" \\
          -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
          -H "Authorization: ${CORTEX_API_KEY}" | jq -r '.signed_url')
        set -x
        curl -fsSL -o cortexcli "$CRTX_URL"
        chmod +x cortexcli
      displayName: "Download cortexcli (amd64)"
      env:
        CORTEX_API_URL: $(CORTEX_API_URL)
        CORTEX_API_KEY_ID: $(CORTEX_API_KEY_ID)
        CORTEX_API_KEY: $(CORTEX_API_KEY)
    - bash: |
        set -euo pipefail
        ./cortexcli \\
          --api-base-url "${CORTEX_API_URL}" \\
          --api-key "${CORTEX_API_KEY}" \\
          --api-key-id "${CORTEX_API_KEY_ID}" \\
          code scan \\
          --directory "$(Build.SourcesDirectory)" \\
          --repo-id "$(Build.Repository.Name)" \\
          --branch "$(Build.SourceBranchName)" \\
          --source "CORTEX_CLI" \\
          --create-repo-if-missing
      displayName: "Cortex CLI Code Scan"
      env:
        CORTEX_API_URL: $(CORTEX_API_URL)
        CORTEX_API_KEY_ID: $(CORTEX_API_KEY_ID)
        CORTEX_API_KEY: $(CORTEX_API_KEY)
        MIN_LOG_LEVEL: $(MIN_LOG_LEVEL)
    ```
    
-   For ARM architecture
    
    ```
    trigger:
      branches:
        include: \['\*'\]
    pr:
      branches:
        include: \['\*'\]
    variables:
      CORTEX_API_URL: <your_cortex_api_url> 
    pool:
      name: arm
      demands:
        - Agent.OS -equals Linux
    steps:
    - checkout: self
      clean: true
    - task: NodeTool@0
      displayName: "Use Node.js 22.x"
      inputs: { versionSpec: "22.x" }
    - bash: |
        set -euo pipefail
        BASE="${CORTEX_API_URL%/}"
        URL="$BASE/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=arm64"
        set +x
        CRTX_URL=$(curl -fsSL "$URL" \\
          -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
          -H "Authorization: ${CORTEX_API_KEY}" | jq -r '.signed_url')
        set -x
        curl -fsSL -o cortexcli "$CRTX_URL"
        chmod +x cortexcli
      displayName: "Download cortexcli (arm64)"
      env:
        CORTEX_API_URL: $(CORTEX_API_URL)
        CORTEX_API_KEY_ID: $(CORTEX_API_KEY_ID)
        CORTEX_API_KEY: $(CORTEX_API_KEY)
    - bash: |
        set -euo pipefail
        ./cortexcli \\
          --api-base-url "${CORTEX_API_URL}" \\
          --api-key "${CORTEX_API_KEY}" \\
          --api-key-id "${CORTEX_API_KEY_ID}" \\
          code scan \\
          --directory "$(Build.SourcesDirectory)" \\
          --repo-id "$(Build.Repository.Name)" \\
          --branch "$(Build.SourceBranchName)" \\
          --source "CORTEX_CLI" \\
          --create-repo-if-missing
      displayName: "Cortex CLI Code Scan (ARM64)"
      env:
        CORTEX_API_URL: $(CORTEX_API_URL)
        CORTEX_API_KEY_ID: $(CORTEX_API_KEY_ID)
        CORTEX_API_KEY: $(CORTEX_API_KEY)
    ```
    

## Bitbucket

-   For AMD architecture
    
    ```
    image: ubuntu:24.04
    clone:
      depth: full
    pipelines:
      default:
        - step:
            name: Cortex CLI Code Scan (Hosted AMD64)
            script:
              - set -euo pipefail
              - apt-get update && apt-get install -y --no-install-recommends curl jq ca-certificates tar gzip file
              - curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
              - apt-get install -y nodejs
              - node -v && npm -v
              - export CORTEXCLI_HOME="/root/.cortexcli"; rm -rf "$CORTEXCLI_HOME" || true; mkdir -p "$CORTEXCLI_HOME"
              - |
                CRTX_URL=$(curl -fsSL "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=amd64" \\
                  -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
                  -H "Authorization: ${CORTEX_API_KEY}" | jq -r '.signed_url')
                curl -fsSL -o cortexcli "$CRTX_URL"
                chmod +x cortexcli
                ./cortexcli --version
              - |
                ./cortexcli \\
                  --api-base-url "${CORTEX_API_URL}" \\
                  --api-key "${CORTEX_API_KEY}" \\
                  --api-key-id "${CORTEX_API_KEY_ID}" \\
                  code scan \\
                  --directory "${BITBUCKET_CLONE_DIR}" \\
                  --repo-id "${BITBUCKET_REPO_FULL_NAME}" \\
                  --branch "${BITBUCKET_BRANCH}" \\
                  --source "CORTEX_CLI" \\
                  --create-repo-if-missing \\
                  --upload-mode no-upload
            artifacts:
              - cortexcli
    ```
    
-   For ARM architecture
    
    ```
    image: node:22-bookworm
    
    pipelines:
      default:
        - step:
            name: Cortex CLI Code Scan
            runs-on:
              - self.hosted
              - linux.arm64 
            script:
              - set -euo pipefail
              - apt-get update && apt-get install -y --no-install-recommends curl jq ca-certificates file
              - export CORTEXCLI_HOME="/root/.cortexcli"; rm -rf "$CORTEXCLI_HOME" || true; mkdir -p "$CORTEXCLI_HOME"
    
              - |
                set +x
                CRTX_URL=$(curl -fsSL "${CORTEX_API_URL%/}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=arm64" \\
                  -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
                  -H "Authorization: ${CORTEX_API_KEY}" | jq -r '.signed_url')
                set -x
                curl -fsSL -o cortexcli "$CRTX_URL"
                chmod +x cortexcli
                ./cortexcli --version
    
              # Run the scan
              - |
                ./cortexcli \\
                  --api-base-url "${CORTEX_API_URL}" \\
                  --api-key "${CORTEX_API_KEY}" \\
                  --api-key-id "${CORTEX_API_KEY_ID}" \\
                  code scan \\
                  --directory "${BITBUCKET_CLONE_DIR}" \\
                  --repo-id "${BITBUCKET_REPO_FULL_NAME}" \\
                  --branch "${BITBUCKET_BRANCH}" \\
                  --source "CORTEX_CLI" \\
                  --create-repo-if-missing
            artifacts:
              - cortexcli
    ```
    

## CircleCI

-   For AMD architecture
    
    ```
    version: 2.1
    jobs:
      cortex-code-scan:
        docker:
          - image: cimg/node:22.17.0  # Replace with a suitable image or executor
        environment:
          CORTEX_API_URL: <your_cortex_api_url>
        steps:
          - checkout
          - run:
              name: Download cortexcli
              command: |
                set -x
                crtx_resp=$(curl "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=amd64" \\
                  -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
                  -H "Authorization: ${CORTEX_API_KEY}")
                crtx_url=$(echo $crtx_resp | jq -r ".signed_url")
                curl -o cortexcli $crtx_url
                chmod +x cortexcli
                ./cortexcli --version
          - run:
              name: Run Cortex CLI Code Scan
              command: |
                ./cortexcli \\
                  --api-base-url "${CORTEX_API_URL}" \\
                  --api-key "${CORTEX_API_KEY}" \\
                  --api-key-id "${CORTEX_API_KEY_ID}" \\
                  code scan \\
                  --directory "$(pwd)" \\
                  --repo-id "${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}" \\
                  --branch "${CIRCLE_BRANCH}" \\
                  --source "CIRCLE_CI" \\
                  --create-repo-if-missing
    workflows:
      cortex-scan-workflow:
        jobs:
          - cortex-code-scan:
              context: cortex-secrets
    ```
    
-   For ARM architecture
    
    ```
    version: 2.1
    jobs:
      cortex-code-scan:
        docker:
          - image: <Replace with image supporting node js version 22 or higher>
        environment:
          CORTEX_API_URL: <your_cortex_api_url> 
        steps:
          - checkout
          - run:
              name: Download cortexcli
              command: |
                set -x
                crtx_resp=$(curl "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=arm64" \\
                  -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
                  -H "Authorization: ${CORTEX_API_KEY}")
                crtx_url=$(echo $crtx_resp | jq -r ".signed_url")
                curl -o cortexcli $crtx_url
                chmod +x cortexcli
                ./cortexcli --version
          - run:
              name: Run Cortex CLI Code Scan
              command: |
                ./cortexcli \\
                  --api-base-url "${CORTEX_API_URL}" \\
                  --api-key "${CORTEX_API_KEY}" \\
                  --api-key-id "${CORTEX_API_KEY_ID}" \\
                  code scan \\
                  --directory "$(pwd)" \\
                  --repo-id "${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}" \\
                  --branch "${CIRCLE_BRANCH}" \\
                  --source "CIRCLE_CI" \\
                  --create-repo-if-missing
    workflows:
      cortex-scan-workflow:
        jobs:
          - cortex-code-scan:
              context: cortex-secrets
    ```
    

## GitHub Actions

-   For AMD architecture
    
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
      CORTEX_API_URL: <your_cortex_api_url> 
      
    jobs:
      cortex-code-scan:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout Repository
          uses: actions/checkout@v2
        
        - name: Set up Node.js
          uses: actions/setup-node@v4
          with:
            node-version: 22
        - name: Verify Node.js Version
          run: node -v
        - name: Download cortexcli
          run: |
            set -x
            crtx_resp=$(curl "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=amd64" \\
              -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
              -H "Authorization: ${CORTEX_API_KEY}")
            crtx_url=$(echo $crtx_resp | jq -r ".signed_url")
            curl -o cortexcli $crtx_url
            chmod +x cortexcli
            ./cortexcli --version
        - name: Run Cortex CLI Code Scan
          run: |
            ./cortexcli \\
              --api-base-url "${CORTEX_API_URL}" \\
              --api-key "${CORTEX_API_KEY}" \\
              --api-key-id "${CORTEX_API_KEY_ID}" \\
              code scan \\
              --directory "${{github.workspace}}" \\
              --repo-id "${{github.repository}}" \\
              --branch "${{github.ref_name}}" \\
              --source "GITHUB_ACTIONS" \\
              --create-repo-if-missing
    ```
    
-   For ARM architecture
    
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
      CORTEX_API_URL: <your_cortex_api_url>
      
    jobs:
      cortex-code-scan:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout Repository
          uses: actions/checkout@v2
        
        - name: Set up Node.js
          uses: actions/setup-node@v4
          with:
            node-version: 22
        - name: Verify Node.js Version
          run: node -v
        - name: Download cortexcli
          run: |
            set -x
            crtx_resp=$(curl "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=arm64" \\
              -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
              -H "Authorization: ${CORTEX_API_KEY}")
            crtx_url=$(echo $crtx_resp | jq -r ".signed_url")
            curl -o cortexcli $crtx_url
            chmod +x cortexcli
            ./cortexcli --version
        - name: Run Cortex CLI Code Scan
          run: |
            ./cortexcli \\
              --api-base-url "${CORTEX_API_URL}" \\
              --api-key "${CORTEX_API_KEY}" \\
              --api-key-id "${CORTEX_API_KEY_ID}" \\
              code scan \\
              --directory "${{github.workspace}}" \\
              --repo-id "${{github.repository}}" \\
              --branch "${{github.ref_name}}" \\
              --source "GITHUB_ACTIONS" \\
              --create-repo-if-missing
    ```
    

## GitLab Runner

-   For AMD architecture
    
    ```
    stages: \[scan\]
    variables:
      CORTEX_API_URL: <your_cortex_api_url>
    cortex_code_scan:
      image: node:22-bookworm@sha256:bb6834c0669aa71cbc8d94606561a721adf489f6b93d7b8b825f0cf1b498c2c4
      tags: \["amd64"\]
      stage: scan
      rules:
        - when: on_success
      before_script:
        - uname -m
        - set -euo pipefail
        - apt-get update
        - apt-get install -y --no-install-recommends curl jq ca-certificates tar gzip file
        - export CORTEXCLI_HOME="/root/.cortexcli"; rm -rf "$CORTEXCLI_HOME" || true; mkdir -p "$CORTEXCLI_HOME"
        - |
          # avoid leaking secrets in logs
          set +x
          CRTX_URL=$(curl -fsSL "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=amd64" \\
            -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
            -H "Authorization: ${CORTEX_API_KEY}" | jq -r '.signed_url')
          set -x
          curl -fsSL -o cortexcli "$CRTX_URL"
          chmod +x cortexcli
          ./cortexcli --version
      script:
        - |
          ./cortexcli \\
            --api-base-url "${CORTEX_API_URL}" \\
            --api-key "${CORTEX_API_KEY}" \\
            --api-key-id "${CORTEX_API_KEY_ID}" \\
            code scan \\
            --directory "${CI_PROJECT_DIR}" \\
            --repo-id "${CI_PROJECT_PATH}" \\
            --branch "${CI_COMMIT_REF_NAME}" \\
            --source "CORTEX_CLI" \\
            --upload-mode no-upload \\
            --create-repo-if-missing
      artifacts:
        when: always
        paths: \[cortexcli\]
        expire_in: 1 day
    ```
    
-   For ARM architecture
    
    ```
    stages: \[scan\]
    variables:
      CORTEX_API_URL: <your_cortex_api_url> 
    cortex_code_scan:
      image: node:22-bookworm
      stage: scan
      rules:
        - when: on_success
      before_script:
        - set -euo pipefail
        - apt-get update
        - apt-get install -y --no-install-recommends curl jq ca-certificates tar gzip file
        - export CORTEXCLI_HOME="/root/.cortexcli"; rm -rf "$CORTEXCLI_HOME" || true; mkdir -p "$CORTEXCLI_HOME"
        - |
          # avoid leaking secrets in logs
          set +x
          CRTX_URL=$(curl -fsSL "${CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=arm64" \\
            -H "x-xdr-auth-id: ${CORTEX_API_KEY_ID}" \\
            -H "Authorization: ${CORTEX_API_KEY}" | jq -r '.signed_url')
          set -x
          curl -fsSL -o cortexcli "$CRTX_URL"
          chmod +x cortexcli
          ./cortexcli --version
      script:
        - |
          ./cortexcli \\
            --api-base-url "${CORTEX_API_URL}" \\
            --api-key "${CORTEX_API_KEY}" \\
            --api-key-id "${CORTEX_API_KEY_ID}" \\
            code scan \\
            --directory "${CI_PROJECT_DIR}" \\
            --repo-id "${CI_PROJECT_PATH}" \\
            --branch "${CI_COMMIT_REF_NAME}" \\
            --source "CORTEX_CLI" \\
            --upload-mode no-upload \\
            --create-repo-if-missing
      artifacts:
        when: always
        paths: \[cortexcli\]
        expire_in: 1 day
    ```
    

## Jenkins

-   For AMD architecture
    
    ```
    pipeline {
        agent {
            docker {
                image 'cimg/node:22.17.0' // Replace with a suitable image or executor
                args '-u root'
            }
        }
        environment {
            CORTEX_API_KEY = credentials('CORTEX_API_KEY')
            CORTEX_API_KEY_ID = credentials('CORTEX_API_KEY_ID')
            CORTEX_API_URL = <your_cortex_api_url> 
        }
        stages {
            stage('Checkout Repository') {
                steps {
                      git branch: 'main', url: 'this-is-repository-url-example'
                      stash includes: '\*\*/\*', name: 'source'
                }
            }
            stage('Install Dependencies') {
                steps {
                    sh '''
                    apt update
                    apt install -y curl jq git
                    '''
                }
            }
            stage('Download cortexcli') {
                steps {
                    script {
                        def response = sh(script: """
                            curl --location '${env.CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=amd64' \\
                              --header 'Authorization: ${env.CORTEX_API_KEY}' \\
                              --header 'x-xdr-auth-id: ${env.CORTEX_API_KEY_ID}' \\
                              --silent
                        """, returnStdout: true).trim()
                        def downloadUrl = sh(script: """echo '${response}' | jq -r '.signed_url'""", returnStdout: true).trim()
                        sh """
                            curl -o cortexcli '${downloadUrl}'
                            chmod +x cortexcli
                            ./cortexcli --version
                        """
                    }
                }
            }
            stage('Run Scan') {
            // Replace the repo-id with your repository like: owner/repo
                steps {
                    script {
                        unstash 'source'
                        sh """
                        ./cortexcli \\
                          --api-base-url "${env.CORTEX_API_URL}" \\
                          --api-key "${env.CORTEX_API_KEY}" \\
                          --api-key-id "${env.CORTEX_API_KEY_ID}" \\
                          code scan \\
                          --directory "\\$(pwd)" \\
                          --repo-id <REPLACE WITH REPO_OWNER/REPO_NAME> \\
                          --branch <REPLACE WITH BRANCH> \\
                          --source "JENKINS" \\
                          --create-repo-if-missing
                        """
                    }
                }
            }
        }
    }
    ```
    
-   For ARM architecture
    
    ```
    pipeline {
        agent {
            docker {
                image 'cimg/node:22.17.0' // Replace with a suitable image or executor
                args '-u root'
            }
        }
        environment {
            CORTEX_API_KEY = credentials('CORTEX_API_KEY')
            CORTEX_API_KEY_ID = credentials('CORTEX_API_KEY_ID')
            CORTEX_API_URL = <your_cortex_api_url> 
        }
        stages {
            stage('Checkout Repository') {
                steps {
                      git branch: 'main', url: 'this-is-repository-url-example'
                      stash includes: '\*\*/\*', name: 'source'
                }
            }
            stage('Install Dependencies') {
                steps {
                    sh '''
                    apt update
                    apt install -y curl jq git
                    '''
                }
            }
            stage('Download cortexcli') {
                steps {
                    script {
                        def response = sh(script: """
                            curl --location '${env.CORTEX_API_URL}/public_api/v1/unified-cli/releases/download-link?os=linux&architecture=arm64' \\
                              --header 'Authorization: ${env.CORTEX_API_KEY}' \\
                              --header 'x-xdr-auth-id: ${env.CORTEX_API_KEY_ID}' \\
                              --silent
                        """, returnStdout: true).trim()
                        def downloadUrl = sh(script: """echo '${response}' | jq -r '.signed_url'""", returnStdout: true).trim()
                        sh """
                            curl -o cortexcli '${downloadUrl}'
                            chmod +x cortexcli
                            ./cortexcli --version
                        """
                    }
                }
            }
            stage('Run Scan') {
            // Replace the repo-id with your repository like: owner/repo
                steps {
                    script {
                        unstash 'source'
                        sh """
                        ./cortexcli \\
                          --api-base-url "${env.CORTEX_API_URL}" \\
                          --api-key "${env.CORTEX_API_KEY}" \\
                          --api-key-id "${env.CORTEX_API_KEY_ID}" \\
                          code scan \\
                          --directory "\\$(pwd)" \\
                          --repo-id <REPLACE WITH REPO_OWNER/REPO_NAME> \\
                          --branch <REPLACE WITH BRANCH> \\
                          --source "JENKINS" \\
                          --create-repo-if-missing
                        """
                    }
                }
            }
        }
    }
    ```