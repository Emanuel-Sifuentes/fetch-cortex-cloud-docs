---
title: "CI/CD pipeline issues"
tocId: "Z0ogtICwRgChEg3exkAY~Q"
contentId: "aCLPAhLN9AA9blqMWiMNDQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/CI/CD-pipeline-issues"
depth: 2
---

# CI/CD pipeline issues
All Medium, High and Critical CI/CD pipeline findings detected in an organization's environment are categorized by Cortex Cloud as CI/CD risk issues. This approach allows for targeted remediation efforts. Only manual fixes are available for CI/CD pipeline risk issues.

The CI/CD Risks Issues table is a filtered instance of the broader Issues table found under Cases & Issues, meaning it exclusively displays issues categorized as CI/CD risks. However, the CI/CD Risks Issues table only displays issues generated from findings detected during periodic scans. In contrast, the comprehensive Issues table includes all CI/CD risks issues, regardless of their detection source, such as periodic, pull request (PR), and continuous integration (CI) scans.

## How to access CI/CD pipeline risk issues

To access CI/CD pipeline risks issues, under Modules, select Application Security → Issues → CI/CD Risks.

## CI/CD pipeline risk issue inventory

Below are selected properties of the CI/CD pipeline risks issues inventories.

| Property | Description |
| --- | --- |
| Severity | The CI/CD pipeline risk severity level. Values: Critical, High, Medium, Low, Informational, unknown |
| Issue Name | The name assigned to the CI/CD pipeline risk issue. Corresponds to the CI/CD rule that detected the risk |
| Category | The type of issue. Values: Code, Configuration |
| Description | A description of the issue |
| Finding ID | The identifier of the finding on which the issue is based |
| Provider | The version control system (such as GitHub) or CI tool (such as GitHub Actions) hosting the CI/CD pipeline in which the issue was detected |
| Asset Name | The name of the asset in which the issue was detected |
| Asset ID | The identifier of the asset in which the issue was detected |
| Asset Category | The category of the asset (such as a repository, CI/CD Pipeline) in which the issue was detected |
| Status | The status of the issue. Values: New, Resolved, Under Investigation |
| Domain | Fixed value: Posture |
| Last Updated | The most recent scan that detected the finding which generated the issue |
| Backlog Status | Backlog Status: Indicates if the issue is categorized as Backlog (pre-existing technical debt) or New (a recently introduced vulnerability). To understand how issues are categorized as backlog/new, refer to Issue/Finding classification by scanner |