---
title: "Supply Chain Tools"
tocId: "Y4r4XSSVLxB9buXCNonkNw"
contentId: "ZXSTbWHV6W1LQqnhnvkhNQ"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Supply-Chain-Tools"
depth: 3
---

# Supply Chain Tools
The Supply Chain Tools inventory table provides a detailed list of your organization's CI/CD pipeline tools and VCS Apps, allowing you to view and manage your organization's supply chain tools from a single, centralized location. You can review tool usage, third-party integrations, and risk assessments, including creator information, usage evidence, and category details. Additionally, you can filter tools by status (approved, rejected, uncategorized) and category, search for specific tools, and identify top risks to ensure policy adherence and prioritize remediation.

## How to access Supply Chain Tools

To access Supply Chain Tools, select Modules → Application Security → Supply Chain Tools (under 3rd Party Tools).

## Supply Chain Tools inventory

The inventory table describes the exposed Supply Chain tool properties. You can view additional properties through the Table Settings Menu.

| Property/ Attribute | Description |
| --- | --- |
| Name | The name of the Supply Chain tool |
| Risk Factors | Risk factors associated with the tool, as assessed by Cortex Cloud, help you identify and prioritize potential risks for tools and components based on their likely impact and exploitability. Values include Archived, Not verified, Unsecured URL and Outdated Version. For tools in your environment, risk factors are specific to the exact version you have, whereas catalog risk factors reflect the tool’s general profile. To understand the specific reasoning behind a risk factor, hover over it to view a detailed explanation |
| Status | The tool status. Values: Approved, Pending, Rejected |
| Usage | The amount of CI/CD pipelines in which the tool was used. Includes a link which opens the location in which the tool is used |
| Type | The type of tool |
| Category | The category associated with the tool, such as Version Control System (VCS), Continuous Integration (CI) Servers and Build Automation Tools |