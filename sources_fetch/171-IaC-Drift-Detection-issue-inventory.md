---
title: "IaC Drift Detection issue inventory"
tocId: "AdEVfTtX_FhaZ~CzXomFng"
contentId: "5cxQXv_zou5w_77v6s~UAQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/IaC-Drift-Detection-issue-inventory"
depth: 2
---

# IaC Drift Detection issue inventory
The IaC drift detection issues inventory includes these default properties. Use the Table Settings Menu to view additional fields.

| Property | Description |
| --- | --- |
| Severity | The level of risk associated with the drift finding. Values: Informational, Low , Medium, High, Critical, Unknown |
| Name | The specific name or title of the finding, clearly identifying the detected security issue resulting from the configuration drift |
| Code IaC Resource | The name of the IaC resource (code asset) in the repository that corresponds to the drifted Cloud Resource. This is the source of truth that failed to prevent the drift |
| Cloud Resource | The specific type of the live cloud asset that experienced drift (such as AWS Internet Gateway, Azure Security Group) |
| Framework | The Infrastructure as Code (IaC) framework or language used to define the original code asset (such as CloudFormation, Terraform) |
| Repository | The version control repository where the problematic IaC code or configuration files reside |
| AppSec Policy ID | The ID of the Application Security policy that created the drift issue |
| Data Source | The version control system from which the original data for the IaC asset was pulled (such as GitHub, GitLab) |
| Cloud Provider | The cloud service provider hosting the drifted resource (such as AWS, Azure, GCP) |
| Branch | The specific branch in the version control repository containing the IaC definition |
| SLA | The deadline or status of the issue remediation timeline based on the organization's Service Level Agreement. For more information, refer to Service Lead Agreements (SLA) |
| File Path | The full directory path to the specific IaC file within the repository |
| Status | The current lifecycle state of the drift issue. Values: Approaching, On Track, Overdue |
| Created | The timestamp when the issue was created |
| Backlog Status | Indicates whether the issue is classified as pre-existing technical debt (Backlog) or a newly introduced misconfiguration (New). For more information, refer to Backlog baseline |
| Assignee | The individual responsible for addressing and resolving the issue |
| Business Application | The business application associated with the drifted IaC resource and the corresponding cloud asset. For more information about business applications, refer to Defining Business Applications |