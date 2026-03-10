---
title: "Explore CI/CD Instance assets"
tocId: "qtGsa8u4j1Ov9f2gBpXpxg"
contentId: "mDu6dm84mFIoSzOk0z6uPQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Explore-CI/CD-Instance-assets"
depth: 3
---

# Explore CI/CD Instance assets
To access CI/CD pipeline instances, under Inventory, select All Assets → Code → Category → CI/CD Instances.

The CI/CD Instances assets page includes a dashboard and an inventory. The dashboard includes a Provider widget, displaying the types of CI/CD providers configured (for example, GitHub Actions) and the number of instances for each provider. You can filter the inventory by selecting a provider type.

## CI/CD instance inventory

The following table describes selected CI/CD instance properties displayed in the inventory table.

Read more...

| Property | Description |
| --- | --- |
| Name | The name of the CI/CD pipeline instance, often including a descriptor that indicates its environment or purpose, such as "Jenkins-prod" for a Jenkins instance in a production environment |
| Provider | The provider or system of the CI/CD pipeline instance, such as Jenkins |
| URL | The web address where the CI/CD pipeline instance can be accessed |
| Last Observed | The date when the last scan was conducted on the CI/CD pipelines in the instance. Use the column filter to choose a specific date range (custom, 7 days, 30 days) instead of the default 24 hours |
| Pipeline Count | The amount of CI/CD pipelines associated with the instance. Clicking on the value opens the Pipelines tab of the description card for additional information about the associated pipelines |