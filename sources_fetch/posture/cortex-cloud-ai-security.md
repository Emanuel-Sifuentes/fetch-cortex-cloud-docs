# Cortex Cloud AI Security

Provides a comprehensive overview of the AI assets within an organization.

Cortex Cloud AI Security provides a comprehensive overview of the AI assets within an organization. It is designed to ensure AI security by offering tools to review and prioritize AI risks effectively.

## What is Cortex Cloud AI Security?

A basic overview of the Cortex Cloud AI Security overview page, assets inventory, risks, and benefits.

Cortex Cloud AI Security provides:

-   **Comprehensive Visibility:** Obtains a full picture of AI components, including models, agents, data flows, and infrastructure across all cloud environments. This broad visibility ensures that every AI asset is accounted for and continuously monitored, reducing blind spots in the AI ecosystem.
    
-   **Full supply chain protection:** Maps the dependencies between data, models, and cloud resources to remediate risks such as poisoned datasets or unsanctioned models. Maintains the integrity of your AI bill of materials (AI-BOM).
    
-   **Detailed asset inventory:** Access an in-depth inventory of all AI assets, enriched with contextual details. This deep insight into each asset’s specifics and functionalities facilitates a better understanding and more effective management of these resources.
    
-   **Advanced risk assessment:** Proactively identifies and issues alerts on misconfigurations and security flaws in AI assets. Cortex Cloud AI Security employs sophisticated detection mechanisms to tackle risks associated specifically with AI, managing permissions, and ensures robust security practices are upheld throughout the AI supply chain.
    
-   **Dynamic risk prioritization:** Utilizes insights into data sensitivity and the broader security context to effectively understand and prioritize risks. This strategic approach enables organizations to target and mitigate the most critical threats swiftly, thereby enhancing the overall security landscape.
    
-   **Governance and control:** Implements comprehensive guardrails and controls for AI models both during development and in production. Ensures that AI assets operate within defined security parameters, reducing the likelihood of security breaches and data leaks.
    
-   **Compliance assurance:** Regularly tests AI systems against emerging AI regulations and industry standards, such as the OWASP _Top 10 for Large Language Models (LLMs)_. Gets clear guidelines on corrective actions needed to achieve full compliance and ensures that AI assets align with both current and future regulations.
    

These benefits ensure that using Cortex Cloud AI Security can maintain a robust security posture across your AI environment, proactively manage risks, and align with compliance and internal security policies.

### Cortex Cloud AI Security overview dashboard

The Cortex Cloud AI Security overview dashboard serves as the central hub for information on the AI ecosystem within the organization. It provides a comprehensive overview of AI security posture and is designed to help users quickly access relevant information. The layout and organization of the dashboard are tailored to guide you in understanding the AI environment and determining the next steps to take for effective AI governance.

The following image shows the Cortex Cloud AI Security dashboard:

### AI assets inventory

You can view all AI assets in your environment, regardless of deployment mode or cloud provider. Connected assets are discovered, contextualized, and presented with detailed information. You can dive deeper into the asset context as required.

Cortex Cloud AI Security provides visibility into how sensitive data is being utilized and potentially impacted by AI systems. By identifying the AI assets that interact with sensitive data, the platform helps ensure that appropriate protection protocols are applied where most needed, thereby enhancing overall data security and reducing the risk of data breaches and leakage.

### AI security issues

Cortex Cloud AI Security provides risk assessment for the supported AI assets, with risk rules created by the research team. These risk rules are designed to detect misconfigurations and security flaws in AI assets and send alerts about them. In addition to the provided default risk rules, Cortex Cloud AI Security also supports custom risk rule creation, so you can codify and integrate internal policies into the Cortex Cloud AI Security risk engine, streamlining your remediation efforts.

When insecure models and deployments are used, several types of attacks can occur, such as the following:

-   **Data Poisoning Attacks:** In "Training Data Poisoning", malicious actors manipulate the training data to introduce biases or vulnerabilities into the model, causing it to make incorrect or harmful predictions.
    
-   **Model Inversion Attacks:** Attackers can infer sensitive information about the training data by querying the model, potentially leading to data breaches and loss of intellectual property.
    
-   **Adversarial Attacks:** Crafted inputs can deceive the model into making incorrect predictions, which is particularly dangerous in critical applications like autonomous driving or medical diagnosis.
    
-   **Evasion Attacks:** Evasion attacks are a prevalent threat to machine learning models during inference. This type of attack involves crafting inputs that appear normal to humans but are misclassified by machine learning systems. For instance, an adversary might alter a few pixels in an image prior to submission, causing an image recognition system to misidentify it.
    
-   **Model Extraction Attacks:** Attackers can approximate a model's functionality by repeatedly prompting it, effectively stealing the intellectual property and potentially using it for malicious purposes.
    
-   **Data Leakage:** If a model unintentionally reveals sensitive information it was trained on or data that is used in inference, it can lead to breaches of confidential or personal data.
    
-   **Model Manipulation:** Unauthorized access to the model can allow attackers to alter its parameters or behavior, leading to compromised functionality and trustworthiness.
    
-   **Inference Attacks:** Attackers exploit the model to deduce whether specific data was part of the training set, potentially exposing sensitive information.
    

These types of attacks highlight the importance of implementing robust security measures, as outlined by the OWASP (Open Web Application Security Project) _Top 10 Risk & Mitigations for LLMs and Gen AI Apps_.

## Supported services in Cortex Cloud AI Security

A list of platforms and services that are compatible with Cortex Cloud AI Security.

The following lists the various services that are compatible with Cortex Cloud AI Security, detailing the specific platforms and services where Cortex Cloud AI Security can be effectively used to ensure security and compliance:

-   **AWS:** Amazon Bedrock, Amazon SageMaker
    
-   **Azure:** Azure OpenAI, Azure AI Search, Azure AI Foundry
    
-   **GCP:** Vertex AI
    
-   Self-managed AI models

## Cortex Cloud AI Security concepts

Basic concepts of Cortex Cloud AI Security.

### Introduction to AI applications

The AI application ecosystem comprises several critical components that work together to enable the functionality of AI-driven applications. The following explains the main concepts and shows some examples.

#### Model

The model is the core component of the AI ecosystem. It is the trained machine learning model that takes input data, processes it, and produces output. In the context of large language models (LLMs), this involves understanding and generating human-like text based on the given input.

Example 87. 

OpenAI GPT-4 model, which can generate coherent and contextually relevant text, answer questions, and perform various other natural language processing tasks.

  

#### Model endpoint

The model endpoint is the interface through which applications interact with the AI model. It acts as an access point for sending inputs to the model and receiving outputs. The endpoint is responsible for managing requests, routing them to the appropriate model instance, and returning the results to the application.

Example 88. 

A Microsoft Azure OpenAII deployment using OpenAI GPT-4 , which you can use to integrate natural language processing capabilities into your applications by sending text prompts and receiving generated text in response.

  

Example 89. 

Amazon Web Services (AWS) EC2 instances with GPU acceleration running Llama2 by Meta, which supports an application that communicates with the EC2 instance.

  

#### Plugin

A plugin is an auxiliary but highly capable model or tool that acts as a helper to the primary AI model. Plugins extend the functionality of the main model by providing specialized capabilities, such as accessing inference datasets, performing specific computations, or interfacing with other services. This approach, known as retrieval-augmented generation (RAG), enhances the primary model's ability to generate more accurate and contextually relevant outputs. For more information, see Inference datasets and Retrieval-Augmented Generation.

Example 90. 

A weather plugin integrated with an AI chatbot that allows the chatbot to fetch and provide real-time weather updates based on user queries. Another example is a language translation plugin that helps the main model translate text between different languages.

  

#### Training datasets

Training is a fundamental stage in the AI development process where the model learns to perform its tasks by processing large amounts of data. During this phase, the model is exposed to various examples and adjusts its internal parameters to minimize errors in predictions or classifications. The dataset is the integral part of the process, with the insights learned by the model influenced by the training data.

Example 91. 

Training a model like GPT-4 involves using vast text corpora from various sources to help the model understand language patterns, context, and nuances, enabling it to generate coherent and contextually relevant text.

  

#### Inference datasets

Inference datasets are specialized collections of data used during the inference phase of AI models, which is the stage where the model makes predictions or generates outputs based on new input data. Unlike training datasets, which are used to teach the model how to understand and process information, inference datasets help improve the model's performance by providing realistic, real-world data inputs for better contextual answering.

Example 92. 

When building a chatbot for customers to learn more about their spending habits, financial institutions use customer transactions as inference data to provide contextually accurate answers.

  

#### Fine-tuning

Fine-tuning in machine learning refers to the process of adapting a pre-trained model to perform specific tasks or cater to particular use cases. This technique has become essential in deep learning, especially for training foundation models used in generative AI. Fine-tuning leverages data (similarly to training) to adjust the responses of the model to certain inputs, making it more suitable for the intended business case.

#### Retrieval-Augmented Generation

Retrieval-Augmented Generation (RAG) enhances large language model (LLM) responses by incorporating information from knowledge bases and other sources. This allows the model to reference up-to-date inference data before generating a response, improving contextual accuracy. This approach is cost-effective and ensures the output remains relevant, accurate, and useful across different contexts.

#### Example scenario: AI-powered customer support chatbot

To illustrate how these components work together, consider an AI-powered customer support chatbot:

-   **Model endpoint:** The chatbot application interacts with the GPT-4 model through the Azure OpenAI Deployment, which serves as the model endpoint. This endpoint handles user queries, processes them, and directs them to the GPT-4 model to generate responses.
    
-   **Model:** The GPT-4 model receives the user's query, processes it, and generates a relevant and contextually appropriate response based on the information and nuances provided in the query.
    
-   **Plugin:** The chatbot integrates a customer database plugin that allows it to fetch user-specific inference data, such as order status or account details, to provide more personalized and accurate support. The customer database used by the plugin is the Inference Dataset.
    
-   **Training dataset:** The chatbot undergoes fine-tuning using a dataset of previous customer interactions and support tickets, making it adept at handling common inquiries and issues in the specific industry.
    
-   **Application:** The customer support platform integrates the chatbot with a user-friendly interface.

## Cortex Cloud AI Security use cases

Learn about use cases that are relevant for Cortex Cloud AI Security.

### Understand your AI ecosystem

Understanding your AI ecosystem is crucial for identifying potential vulnerabilities and ensuring the robustness of your AI operations. A comprehensive view of your AI landscape helps in pinpointing where sensitive data is processed and stored, as well as how data flows between systems.

To understand your AI ecosystem, use the AI Security Dashboard, which provides visibility into all the AI components. You can also see how your AI assets relate to any other asset in the environment using the Graph Search. The complete list of your AI assets can be found under AI Inventory, where you can investigate each asset.

### Investigate an AI asset

To understand a specific component of your AI ecosystem and identify any findings or security issues related to it, use its asset card and links to findings, issues, and cases created for the asset. When you select an asset, you can review all the tabs on its asset card. These tabs on the asset cards provide information about the following: overview, access, data, vulnerabilities, applications, and AI ecosystems.

### Detect AI security issues

Detecting the AI security issues early is pivotal to safeguarding AI-powered applications and the sensitive data they handle. AI systems, due to their complexity, can often be opaque, making it difficult to identify vulnerabilities using traditional methods. To detect security issues in your AI ecosystem, use the AI Security Issues page.

### Secure the data for AI

Securing the data utilized by AI systems is critical. Cortex Cloud AI Security helps you identify the data that is impacted by your AI ecosystem, whether it's training data, data used for RAG (Retrieval Augmented Generation) or any other related data such as prompt logs. It also classifies this data, using Cortex Cloud Data Security. Data classification across your AI ecosystem allows you to identify models that are trained on sensitive data and to prioritize all identified risks and issues based on their data impact. For example, missing guardrails on a sensitive model should be treated differently due to its context.

### Discover self-managed AI models

Cortex Cloud AI Security helps organizations discover self-managed AI models.

Self-managed AI models refer to AI models that are deployed and operated on self-managed cloud infrastructure, rather than through cloud providers' managed services. These models are often sourced from public repositories like Hugging Face, and can lead to the proliferation of shadow AI.

The growing use of AI in business workflows makes it increasingly important to manage and secure all AI models, whether deployed through managed services or self-managed infrastructures. Self-managed AI models, in particular, introduce unique risks, such as security vulnerabilities and compliance gaps. Tracking and securing these models is essential to reducing risks and ensuring that AI applications remain safe, secure, and compliant.

### Comply with AI regulations

Cortex Cloud AI Security ensures compliance with emerging AI mandates and industry standards, which is crucial because new frameworks require unique measures to govern AI-specific vulnerabilities. For example, data poisoning is a major risk for AI applications but traditional compliance programs are not designed to handle it; however, new frameworks for AI governance include relevant measures, such as the documentation of data sources used to train AI models.  In addition, AI-powered applications also add complexity for existing regulations like GDPR, due to their data processing and interconnected systems.

Cortex Cloud AI Security allows for continuous monitoring and visualization of compliance with leading AI standards, such as the OWASP Top Ten for LLM.

Complying with current industry standards can help shorten the time needed to meet future binding regulations. Cortex Cloud AI Security helps you enforce policies, maintain audit trails, and achieve compliance, providing visibility into compliance violations and helping manage your AI Inventory, which is essential for controlling model sprawl and shadow AI.

### Manage your AI software supply chain

As AI becomes deeply embedded in application development, security teams need comprehensive visibility into the software supply chain. This visibility must go beyond deployed AI models and agents, extending to the underlying AI software packages and SDKs that developers use to build these systems.

A key aspect of Cortex Cloud AI Security is implementing a shift-left approach to AI security. This helps organizations identify and manage risks early in the development lifecycle by providing visibility into the AI software supply chain. Understanding this supply chain is crucial for both generating an AI Bill of Materials (AI-BOM) and for identifying potential vulnerabilities before they are deployed to production. This proactive stance ensures that security is addressed at the source, preventing more complex and costly issues later on.

### Detect open-source models

Cortex Cloud AI Security provides detection and risk assessment for open-source models, identifying and displaying the count of open-source models on the dashboard.

## How to perform advanced AI Security investigations using XQL

Working with datasets in Cortex Cloud AI Security.

### Overview

Cortex Cloud AI Security centralizes information about your AI ecosystem into a list of datasets, providing the foundation for comprehensive security investigations. Using Cortex Query Language (XQL) , security practitioners can create custom queries to extract valuable insights from these data sources within their appliance. For more information, see Get started with XQL.

You can use the following AI-related datasets:

| Dataset | Description |
| --- | --- |
| asset_inventory | Provides a normalized, structured inventory of all digital assets across your AI environment, including detailed metadata for each asset, such as type, cloud provider, region, and security configurations. The dataset also maps relationships between assets, enabling the identification of complex AI and cloud dependencies for a comprehensive AI security posture. |
| classification_mgmt_data_profile | Provides administrative insights into the data classification policies and profiles configured within the Cortex Cloud Data Classification service.This dataset is primarily used for monitoring and managing the data classification rules in the Cortex Cloud environment. |
| findings | Contains the findings that are associated with the assets that are found in your environments. For more information, see Findings and events. |
| issues | Consolidates all AI security vulnerabilities, misconfigurations, and threats detected by Cortex Cloud AI Security. Each entry includes detailed context, such as the affected asset ID, a risk score, a description of the issue, and suggested remediation steps. This dataset provides a unified, actionable view of all security risks for your organization. |

### Investigate Cortex Cloud AI Security

To run queries on your Cortex Cloud AI Security datasets:

1.  In Cortex Cloud, in the navigation pane on the left, click Investigation & Response, then under Search, click Query Builder.
    
2.  Click XQL.
    
3.  You can start typing your query in the box at the top of the screen, or search for existing queries on the Query Library tab.
    
4.  Click Run. The results of the query appear on the Query Results tab.
    

**Note:**

For more information, see Build XQL queries.

### Examples

Here are some examples of AI-related queries you can run in Cortex Cloud to investigate your AI Security posture:

1\. AI assets that were first discovered in the last 7 days

```
dataset = asset_inventory
| filter xdm.asset.type.class = "AI"
| alter found = xdm.asset.first_observed
| filter timestamp_diff(found, current_time(), "DAY") >= 7
| fields
    xdm.asset.name as Asset_Name,
    xdm.asset.type.category as Asset_Type,
    xdm.asset.first_observed as First_Observed,
    xdm.asset.provider as Cloud,
    xdm.asset.cloud.region as Region
```

2\. Sensitive AI assets, such as datasets containing sensitive data, models trained on sensitive data, or model endpoints using sensitive inference data

```
dataset = asset_inventory
| filter xdm.asset.type.class = "AI"
| join (
    dataset = findings
    | filter xdm.finding.type_id = 110000001
) as sensitive_AI sensitive_ai.xdm.finding.asset_id = xdm.asset.id
| fields
    xdm.asset.name as Asset_Name,
    xdm.asset.type.category as Asset_Type,
    xdm.asset.provider as Cloud,
    xdm.finding.normalized_fields as Sensitive_Data
```

3\. Fine-tuned AI models

```
dataset = asset_inventory
| filter xdm.asset.type.category = "Model" and xdm.ai.model.kind = "FINE_TUNED"
| fields
    xdm.asset.name as Asset_Name,
    xdm.asset.type.category as Asset_Type,
    xdm.asset.provider as Cloud,
    xdm.ai.model.kind as model_kind
```

4\. Public AI deployments that are accessible from the public internet

```
dataset = findings
| filter xdm.finding.type_id = 110000004
| join (dataset = asset_inventory | filter xdm.asset.type.category = "Model Endpoint") as public_endpoints public_endpoints.xdm.asset.id = xdm.finding.asset_id
| fields xdm.asset.name as Asset_Name, xdm.asset.type.category as Asset_Type, xdm.asset.provider as Cloud
```

5\. AI datasets containing sensitive PII data

```
dataset = asset_inventory
| filter xdm.asset.type.class = "AI" and xdm.asset.type.category = "Dataset"
| join(
    dataset = findings
    | filter xdm.finding.type_id = 110000001
    | filter xdm.finding.is_active = TRUE
    | alter data_profile = json_extract_scalar_array(xdm.finding.normalized_fields, "$['xdm.data.data_profile']")
    | arrayexpand data_profile
) as sensitive_AI sensitive_ai.xdm.finding.asset_id = xdm.asset.id
| join(
    dataset = classification_mgmt_data_profile
    | filter name = "PII" and enabled = True
) as data_profile_def data_profile_def.id = to_integer(data_profile)
| fields name as data_type, xdm.asset.name as dataset_name, xdm.asset.strong_id as dataset_full_path, xdm.asset.provider as dataset_provider, xdm.asset.realm as dataset_realm, xdm.asset.type.name as dataset_type, xdm.finding.description as description
```

6\. AI datasets containing sensitive PCI data

```
dataset = asset_inventory
| filter xdm.asset.type.class = "AI" and xdm.asset.type.category = "Dataset"
| join(
    dataset = findings
    | filter xdm.finding.type_id = 110000001
    | filter xdm.finding.is_active = TRUE
    | alter data_profile = json_extract_scalar_array(xdm.finding.normalized_fields, "$['xdm.data.data_profile']")
    | arrayexpand data_profile
) as sensitive_AI sensitive_ai.xdm.finding.asset_id = xdm.asset.id
| join(
    dataset = classification_mgmt_data_profile
    | filter name = "PCI" and enabled = True
) as data_profile_def data_profile_def.id = to_integer(data_profile)
| fields name as data_type, xdm.asset.name as dataset_name, xdm.asset.strong_id as dataset_full_path, xdm.asset.provider as dataset_provider, xdm.asset.realm as dataset_realm, xdm.asset.type.name as dataset_type, xdm.finding.description as description
```

7\. AI assets with more than one issue

```
dataset = asset_inventory
| filter xdm.asset.type.class = "AI" and xdm.asset.type.category in ("Dataset", "Model", "Model Endpoint")
| join (
    dataset = issues_with_sbac
    | fields xdm.issue.id as issue_id, xdm.issue.domain, xdm.issue.status.progress as progress, xdm.issue.is_excluded as is_excluded
    | filter xdm.issue.domain = "POSTURE" and is_excluded != true and progress != "RESOLVED"
    | join type = inner (
        dataset = issue_to_asset
        | fields xdm.asset.id as ita_assetid, xdm.issue.id
    ) as its its.xdm.issue.id = issue_id
    | fields issue_id, ita_assetid
    | comp count(issue_id) as issues_count by ita_assetid
) as iss iss.ita_assetid = xdm.asset.id
```

8\. VMs deploying self-managed AI models

```
dataset = asset_inventory
| filter xdm.asset.type.class = "AI" and xdm.asset.type.category in ("Model") and xdm.asset.type.id = "SELF_MANAGED_MODEL"
| alter relation = json_extract_array(xdm.asset.normalized_fields, "$['xdm.asset.relations']")
| arrayexpand relation
| alter relation_type = json_extract_scalar(relation, "$['xdm.asset.relation.type']")
| filter relation_type in("DEPLOYED_ON")
| alter relation_asset_id_to_find = json_extract_scalar(relation, "$['xdm.asset.relation.asset_id']")
| dedup relation_asset_id_to_find
| join(
    dataset = asset_inventory
) as vm_asset vm_asset.xdm.asset.id = relation_asset_id_to_find
| fields xdm.asset.name as compute_instance_name, xdm.asset.realm as compute_instance_realm, xdm.asset.provider as compute_instance_provider, xdm.asset.type.name as compute_instance_type
```

9\. Disks storing self-managed AI models

```
dataset = asset_inventory
| filter xdm.asset.type.class = "AI" and xdm.asset.type.category in ("Model") and xdm.asset.type.id = "SELF_MANAGED_MODEL"
| alter relation = json_extract_array(xdm.asset.normalized_fields, "$['xdm.asset.relations']")
| arrayexpand relation
| alter relation_type = json_extract_scalar(relation, "$['xdm.asset.relation.type']")
| filter relation_type in("STORED_IN")
| alter relation_asset_id_to_find = json_extract_scalar(relation, "$['xdm.asset.relation.asset_id']")
| dedup relation_asset_id_to_find
| join(
    dataset = asset_inventory
) as vm_asset vm_asset.xdm.asset.id = relation_asset_id_to_find
| fields xdm.asset.name as disk_name, xdm.asset.realm as disk_realm, xdm.asset.provider as disk_provider, xdm.asset.type.name as disk_type, xdm.asset.strong_id as disk_id
```

10\. Active AI models with the number of days since last used

```
dataset = asset_inventory
| filter xdm.asset.type.class = "AI"
| filter xdm.asset.type.category in ("Model")
| join (
    dataset = findings
    | filter xdm.finding.type_id = 110000007 and xdm.finding.is_active = TRUE
    | alter days_since_invoked = json_extract_scalar(xdm.finding.extended_fields, "$['days_since_invoked']")
) as model_activity model_activity.xdm.finding.asset_id = xdm.asset.id
| fields xdm.asset.name as Asset_Name, xdm.asset.type.category as Asset_Type, xdm.asset.first_observed as First_Observed, xdm.asset.provider as Cloud, xdm.asset.cloud.region as Region, days_since_invoked
```
