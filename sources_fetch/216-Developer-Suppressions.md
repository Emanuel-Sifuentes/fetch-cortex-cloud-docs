---
title: "Developer Suppressions"
tocId: "WwwLgZy8nD2KKc4LM9CKqw"
contentId: "wPiLMTedtOmpCorS4tfnZA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Developer-Suppressions"
depth: 1
---

# Developer Suppressions
Developer suppressions enable you to temporarily ignore specific scan findings that are known or acceptable in your code. You can apply a suppression inline in the code using inline comments or an annotation, or manage them from supported IDEs (see IDE integrations).

When added in code, a suppression comment is placed next to the relevant line. The scanner still creates the finding, but marks it as Suppressed rather than excluding it. This ensures that the finding remains visible for audit, while removing it from active remediation workflows.

You can also create policies that use developer suppressions as a condition. For more information, refer to Application Security Policies.

Use suppressions only for valid exceptions (for example, a false positive or an approved design decision), and include a clear justification. Scope each suppression to the minimal code element (line or block) and review them regularly to prevent technical debt.

## Guidelines

-   **Default branch behavior**: Suppressions on the default branch apply to both pull request (PR) comments and CI/CD runs
    
-   **Periodic scans**: When a suppression is added to a PR, it will not take effect in the periodic scan until the PR is merged
    
-   **Merging PRs**: When a PR containing a suppression is merged into the default branch, the suppression specific to that asset is applied to the default branch. As a result, subsequent pull requests and periodic scans will no longer flag the suppressed issue
    

## Suppressing checks

The general pattern for inline suppressions is:

```
#cortex:skip=<rule_id>:<suppression_comment>
```

-   `rule_id` : The ID of the specific check
    
-   `suppression_comment`: An explanation included in scan output
    

## Examples

The following examples show how to add inline suppressions to ignore specific findings. Each suppression includes a check ID and an optional comment explaining the reason, such as a false positive or an approved deviation.

**Note**

The check IDs and rule names are placeholders for illustration purposes and do not correspond to actual checks.

## Terraform

The following comment skips the `APPSEC_AWS_20` check for the **foo-bucket S3** resource. This check ensures that the S3 bucket is private. It is skipped here because the bucket is intentionally public.

```
resource "aws_s3_bucket" "foo-bucket" {
  region        = var.region
  # cortex:skip=APPSEC_AWS_20:The bucket is a public static content host
  bucket        = local.bucket_name
  force_destroy = true
  acl           = "public-read"
}
```

## CloudFormation

CloudFormation checks can be suppressed either with an inline comment next to the resource or using the resource’s Metadata section.

-   **Option #1 Inline Comment**
    
    The following comment skips the `APPSEC_AWS_16` check for this **RDS** instance, with a comment explaining that encryption at rest is intentionally handled or not required.
    
    ```
    Resources:
      MyDB:
        Type: 'AWS::RDS::DBInstance'
        # cortex:skip=APPSEC_AWS_16:Ensure all data stored in the RDS is securely encrypted at rest
        Properties:
          DBName: 'mydb'
          DBInstanceClass: 'db.t3.micro'
          Engine: 'mysql'
          MasterUsername: 'master'
          MasterUserPassword: 'password'
    ```
    
-   **Option #2 Metadata Section**
    
    Suppresses a check using the CloudFormation Metadata section, with a reason provided.
    
    ```
    Resources:
      MyDB:
        Metadata:
          cortex:
            skip:
              - id: "APPSEC_AWS_157"
                comment: "Ensure that RDS instances have Multi-AZ enabled"
        Type: "AWS::RDS::DBInstance"
        Properties:
          DBName: "mydb"
          DBInstanceClass: "db.t3.micro"
          Engine: "mysql"
          MasterUsername: "master"
          MasterUserPassword: "password"
    ```
    

## Dockerfile

Comments can be added to any line in the Dockerfile.

The following comment skips specific Dockerfile checks using inline comments while providing a reason for each suppression.

```
# cortex:skip=APPSEC_DOCKER_5: No need to skip the python check in this image
# cortex:skip=APPSEC_DOCKER_7: No need to skip graph check in this image
FROM alpine:3.3
RUN apk --no-cache add nginx
EXPOSE 3000 80 443 22
# cortex:skip=APPSEC_DOCKER_1: required for nginx to run
CMD ["nginx", "-g", "daemon off;"]
```

## Kubernetes

To suppress checks in Kubernetes manifests, annotate using the following format:

```
cortex.io/skip#: <rule_id>=<suppression_comment>
```

```
apiVersion: v1
kind: Pod
metadata:
  name: mypod
  annotations:
    cortex.io/skip1: APPSEC_K8S_20=Ignore privilege escalation
    cortex.io/skip2: APPSEC_K8S_14
    cortex.io/skip3: APPSEC_K8S_11=BestEffort QoS, no CPU limits
spec:
  containers:
    - name: app
      image: nginx
```

## Secrets

Inline suppressions for secrets can be added before, after, or next to the infringing line.

```
Resources:
  MyDB:
    Type: 'AWS::RDS::DBInstance'
    Properties:
      DBName: 'mydb'
      DBInstanceClass: 'db.t3.micro'
      Engine: 'mysql'
      MasterUsername: 'master'
      # cortex:skip=APPSEC_SECRET_6 before it
      MasterUserPassword: 'password' # cortex:skip=APPSEC_SECRET_6 or next to it
```

## Software Composition Analysis (SCA)

Inline suppressions allow you to ignore specific CVEs, license violations, or all CVEs for a specific package directly in dependency files. Each skip includes a check ID (or package identifier) and an optional reason for the suppression. The exact syntax depends on the package manager.

-   For **Python** (`requirements.txt`), **.NET** (`Paket`), **Java/Kotlin** `(gradle.properties`), **Ruby** (`Gemfile`)
    
    The skip comment can be added anywhere in the file.
    
    ```
    # cortex:skip=CVE-2019-19844: Ignore CVE-2019-19844 for all packages in this file
    # cortex:skip=jinja2[APPSEC_LIC_1]: Ignore non-OSI license violations for jinja2
    django==1.2
    jinja2==3.1.0
    ```
    
-   For **JavaScript** (`package.json`, `bower,json`)
    
    -   Skip comments can be placed in the metadata section of the non-lock file. When scanning with lock files (for example `yarn.lock`), the suppression applies to related violations.
        
        ```
        {
          "name": "my-package",
          "version": "1.0.0",
          "//": [
            "cortex:skip=express[APPSEC_LIC_2]: ignore unknown license violations for express",
            "cortex:skip=CVE-2023-123: ignore this CVE for this file"
          ],
          "dependencies": {
            "express": "4.17.1",
            "lodash": "4.17.21"
          }
        }
        ```
        
    -   Single skip comment alternative:
        
        ```
        "//": "cortex:skip=CVE-2023-123: ignore this CVE for this file"
        ```
        
    
-   For **Java** (`pom.xml`), **.NET** (`*.cspro`j)
    
    Skip comments can be placed anywhere in the file.
    
    ```
    <!--cortex:skip=CVE-2023-123: ignore this CVE for the file-->
    <!--cortex:skip=junit[APPSEC_LIC_1]: ignore non-compliant license findings for junit-->
    <dependencies>
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-web</artifactId>
        <version>5.3.9</version>
      </dependency>
      <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13.2</version>
        <scope>test</scope>
      </dependency>
    </dependencies>
    ```
    
-   **Go** (`go.mod`), **Java**/**Kotlin** (`build.gradle`)
    
    Skip comments can be added anywhere in the file. For Go, a skip in `go.mod` also applies to `go.sum`. The following example is for `go.mod`.
    
    ```
    module example.com/myproject
    
    go 1.17
    
    require (
        github.com/gin-gonic/gin v1.7.4
        github.com/go-sql-driver/mysql v1.6.0
        // cortex:skip=CVE-2023-123: ignore this CVE for this file
        // cortex:skip=github.com/go-sql-driver/mysql[APPSEC_LIC_2]: ignore license violations for this package
    )
    ```