---
title: "Explore IaC assets"
tocId: "SrzUZR14L3aej_eGgkCShA"
contentId: "gb2JePGaPzp6AnNnKOtgHA"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Explore-IaC-assets"
depth: 2
---

# Explore IaC assets
To access IaC assets, under Inventory, select All Assets → Code → IaC Resources.

The IaC Resources assets page includes a dashboard and an inventory.

## IaC resources dashboard

The dashboard includes three widgets. To focus the IaC asset inventory on a specific set of resources, select a value in a widget and then choose Filter in, or Filter out to exclude a specific resource from the results.

-   Cloud Providers: Displays the total amount of IaC resources categorized by connected cloud providers (such as AWS and GCP) and the number of IaC resources found in each provider.
    
-   Frameworks: Displays connected frameworks (such as Terraform and Kubernetes) and the number of IaC resources found in each framework
    
-   Drifted Resources: Shows the total number of IaC resources with detected drift, broken down by cloud provider. Each provider displays its own drift count.
    

## Asset inventory filters

IaC Asset Inventory filters allow you to refine the displayed list of IaC resources based on precise criteria such as framework, provider, resource type and name and so on, enabling focused security investigation.

You can filter specifically by Drift Resources to narrow the inventory to resources with configuration deviations from the IaC source, helping you focus on high-risk, untracked changes.

## IaC resource asset inventory

The following table describes selected IaC resource properties of the inventory.

| Property | Description |
| --- | --- |
| Asset ID | The identifier assigned to the IaC resource |
| Provider | The version control system containing the IaC resource |
| Name | The unique identifier for the IaC resource within the system |
| Resource Type | The type of configurations or artifacts represented in the Infrastructure as Code (IaC) assets, such as Dockerfile, AWS Internet Gateway and AWS EKS Addon |
| Type | The classification of artifacts or resources within IaC assets, such as Dockerfile resource and Terraform resource |
| Cloud Provider | The cloud provider where this IaC resource is deployed, such as AWS, Azure, or GCP |
| Repository | The version control system repository where the IaC code for this resource is stored |
| File Path | The relative path to the IaC provider file within the repository that defines this resource |
| End Line | The line number indicating the conclusion or endpoint of the configuration code for a particular IaC resource within the specified file. Example: for `/vpc.tf (62-66)`, the end line refers to line 66, marking the conclusion of the configuration related to the IaC resource defined in the 'vpc.tf' Terraform file |
| Framework | The IaC framework used to define and manage this resource, such as Terraform or CloudFormation |
| Branch | The specific branch of the repository where the IaC asset is located |
| First Observed | The date and time when this IaC resource was first discovered by the system. |
| Type Category | Fixed value: IaC Resource |