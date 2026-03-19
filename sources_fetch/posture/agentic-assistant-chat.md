# Agentic Assistant chat

Chat with the Cortex Agentic Assistant using natural language prompts.

The Agentic Assistant chat provides an interactive and intelligent way to simplify and streamline complex security operations. Enter a prompt using natural language, and your agent plans and executes the most relevant actions to fulfill your request.

## Get started with Agentic Assistant chat

Enable Agentic Assistant and access the chat interface.

The chat leverages your personal context (such as your name, email, and roles), the agent’s description, available actions, and conversation context to enable highly informed and personalized interactions. You can manage multiple chats simultaneously and easily switch between the agents you have access to. Before acting, the agent generates a plan, verifying each step while executing the sequence of actions that fulfill your request.

**Note:**

The Cortex Agentic Assistant is currently available in limited regions. For more information see Cortex Agentic Assistant If your tenant is not within one of those regions, you have access to the Cortex Assistant.

To enable the Cortex Agentic Assistant, go to Settings → Configurations → General → Server Settings → AI Configuration.

To access the chat, you must have the correct permissions. For more information, see Agentic Assistant role-based access control.

To open the chat window, click the Agentic Assistant icon in the upper right hand corner, or if you are already in the Agentic Assistant dashboard, click Start Investigation.

To close the chat window, click anywhere outside the chat window's boundaries or click the Agentic Assistant icon in the upper right hand corner.

## Choose an Agentic Assistant agent

Choose a system or custom agent for your chat.

To use the Agentic Assistant, you first select the agent best suited for the task. Each agent is designed with specific goals and toolsets to address different aspects of security operations.

You can choose from system agents, public agents other users have created, or agents you have personally built and configured.

Select an agent

1.  Within the chat prompt, click the agent icon on the left.
    
2.  You can hover over each agent in the list to view a brief description of its primary focus.
    
3.  Select the agent that best suits your current task or investigation.
    

### System agents

System agents are pre-built, mission-focused virtual personas provided out-of-the-box by Cortex Cloud to handle specific security use cases without requiring manual configuration.

System agents come with defined roles and permissions, for example, the Threat Intel agent is pre-configured to enrich indicators, while the Help Center agent is designed specifically to retrieve documentation.

You can access additional system agents by enabling specific modules or licenses. Ensuring you have the relevant licenses active (for example, Cloud Posture or XSIAM Enterprise) will ensure the corresponding agents appear in your list. For instance, the Exposure Management agent helps prioritize risks but explicitly requires the Exposure Management add-on to function.

If a system agent is missing from your chat, it may be disabled or not included in your license. Go to the Agents Hub, where you can view a list of all enabled and disabled agents (accessible via the side panel in the Agentic Assistant menu). An administrator may need to re-enable it to make it visible in your chat again.

Examples of specialized system agents:

| Agent Type | Description |
| --- | --- |
| Case Investigation | Accelerate and simplify the analyst's workflow by converting complex data points, case context, and event relationships into clear, actionable insights. It understands the whole structure of a case, automatically highlights what matters most, and offers concise summaries that reduce noise and cognitive load. Beyond interpretation, it provides quick-access actions and guided steps that help analysts progress investigations with confidence and consistency. Its strength comes from its ability to reason across diverse evidence, stitch narrative context, and translate technical signals into meaningful next moves - enabling a smoother, more intuitive investigation experience end to end. |
| Email Investigation | Automates the full lifecycle of email-borne threat response, spanning mailbox search, forensic collection, analysis, containment, and incident closure across all major mail platforms and security layers. |
| Help Center | Access Palo Alto Networks' product documentation for additional product support. |
| Network Security | Audits next-gen firewalls for vulnerabilities, expired certificates, outdated software, risky or unused rules, capacity limits, and other misconfigurations. It searches logs for threats and then automates or guides clean-ups and upgrades to keep the network secure. |
| Exposure Management | Helps understand, triage, and remediate vulnerabilities and misconfigurations across enterprise and cloud. Streamlines work for security analysts by helping to proactively prioritize risks, enrich identified exposures with ownership information, and take actions to reduce remediation times. \*\*Note:\*\* Requires the Exposure Management add-on. |
| Cloud Posture | Helps understand, triage, and remediate misconfigurations, attack paths, and posture issues across cloud environments. Streamlines work for security analysts by proactively prioritizing risks, enriching identified exposures with ownership information, and automatically taking mitigating or remediating actions, such as blocking network access or updating protection policies, to reduce the organization's exposure footprint. |
| Application Security | Operates as an intelligent, autonomous co-pilot within the security program. It provides full-cycle management by continuously monitoring AppSec maturity and driving a prevention-first strategy. The agent performs key actions such as opening pull requests (PRs) to resolve issues, identifying true risks and critical weaknesses in code, and using that context to suggest and apply prevention guardrails that eliminate risky environments. Its core function is to guide the organization’s AppSec journey by proactively improving coverage and measuring maturity, ensuring that security is automated, not merely audited. |
| Endpoint Investigation | Unifies host-level containment, forensic collection, and remediation across all major EDR/XDR platforms while feeding evidence and status into the SOC's ticketing and collaboration stack. |

### Recommended agents

In some cases, the system may suggest you switch agents based on the page you are viewing. For example, if you are viewing a case and have a chat with the Threat Intel agent open, the system will suggest switching to the Case Investigation agent for more relevant results.

## Chat with an Agentic Assistant agent

Tips for chatting with the Cortex Agentic Assistant

After choosing an agent, type a request using natural language. Be as clear and specific as possible. Submit your request by pressing Enter or clicking the submit arrow. Some agents provide relevant chat conversation starters under the chat prompt.

During a conversation, when an agent is formulating a plan or executing steps, clicking the agent will show which actions it is using. You can scroll between the actions or close the panel.

### Prompt examples

Using chat prompt conversation starters in the Agentic Assistant simplifies and speeds up your interactions by providing pre-defined, common queries that guide you to relevant actions and information.

For example, a SOC analyst may see the following conversation starters under the chat prompt:

-   What are the top issues I should prioritize today?
    
-   Show me all issues with an overdue SLA
    
-   Which automations are waiting for my input?
    

### Best practices for prompting

-   Be clear and specific
    
    Clearly state your objective and provide the necessary context. Instead of "Fix the issue," try "Investigate issue 1234 and isolate any affected hosts on which malware has been identified." Specify exact values, IDs, and relevant details.
    
-   Break down complex tasks
    
    For multi-step processes, break your request into smaller steps within a prompt. This allows the agent to focus, validate each step, and helps guide the flow.
    
-   Include key information
    
    If not available from the current case context, always include relevant incident IDs, indicator values (such as IP addresses and file hashes), or entity names directly in your prompt. The more precise the initial information, the better the agent can leverage its actions and context.
    
-   Specify a desired output or action:
    
    If you need a particular type of output (for example, "Summarize the findings," "List all affected assets") or a specific action (for example, "Isolate host X," "Block IP Y on firewall"), explicitly state it.
    

### Case context and chat continuity

When you chat with an agent while you have a case open, the agent automatically receives the case context. This allows for immediate, context-aware analysis without requiring you to manually provide case details. The agent can visualize the entire scope of the investigation, interpreting complex relationships between entities and identifying patterns across the case data.

-   When you begin a chat while viewing a case, the agent automatically receives the relevant case context.
    
    **Note:**
    
    Case data is only loaded when you send your first message. Opening the chat interface without sending a prompt does not provide the agent with the case context.
    
-   If you have not yet sent a message while viewing a case, and you switch cases:
    
    -   If you return to a case with a previous chat history, the chat and the associated context automatically load.
        
    -   If no chat history exists for the case, the agent automatically opens a new chat.
        
    
-   If you are in the middle of a chat and switch to a different case, the Agentic Assistant asks if you want to start a new chat for the case you are viewing. If you begin a new chat and send a prompt, the case context for the new case is provided to the agent.
    

| User action | Context status |
| --- | --- |
| Open chat, no message sent | No context loaded. |
| Send first message | Context for the current case is loaded. |
| Switch cases (no active chat) | No context is transferred. Agent remains 'blank.' |
| Switch cases (active chat) | Agentic Assistant suggests you start a new chat to switch the context to the new case or automatically resumes an existing chat. |
| Switch to a case with chat history | Previous chat and context are automatically resumed. |

### Chat navigation and system behavior

-   **Navigate long responses**: If an agent's response is long, you can jump directly to the last line of the response by clicking the anchor icon.
    
-   **Start over**: Sometimes an investigation takes a new direction, or you want to pivot to a different task. You can always open a new conversation or start a new investigation path with a new agent whenever needed.
    
-   **Processing time**: While an agent is processing a prompt, you can begin typing a new prompt. However, you can only submit this new prompt once the previous one has completed its processing. For complex actions, the system may indicate that it's taking some time. Actions exceeding five minutes result in an error.
    

### Review the plan and execution

Cortex Agentic Assistant operates with transparency. The agent's proposed plan or steps for any action are always visible.

Click Plan and expand the chevron to review the detailed breakdown of what the agent intends to do.

JSON artifacts are created when agents create objects or retrieve information. JSON artifacts are available directly in the agent’s plan view to provide technical context for results.

**Note:**

An agent's proposed plans and results may contain inaccuracies or errors. Always review the results carefully to ensure you fully understand the proposed action before proceeding.

### Safeguards for chat security and control

Cortex Agentic Assistant implements the following safeguards to ensure agent plans and executions are secure, approved, and maintains your control over critical system changes.

-   Agents are designed to intelligently validate their proposed plans, ensuring that all necessary permissions are in place before any action is taken.
    
-   Cortex Agentic Assistant clarifies ambiguous prompt intentions and blocks requests that may be exploitative or harmful, for example, to perform a malicious operation.
    
-   For any sensitive actions, agents will always require your explicit approval.
    
-   Your conversations within the Agentic Assistant chat are private. However, for transparency and auditing purposes, Cortex Cloud audit logs record all actions performed by the agents in response to your prompts. This ensures transparency by providing a detailed, traceable record of who initiated an action, what action was taken, and when, without logging the private content of your prompts themselves.
    

**Tip:**

You can quickly jump to different product pages within Cortex Cloud by typing / in the prompt area. This shortcut is a built-in navigation feature that is available even if the Cortex Agentic Assistant is disabled.

## Create and run XQL queries with Agentic Assistant chat

Interact with Cortex Agentic Assistant agents to build and run XQL queries.

You can use natural language prompts to generate and run XQL queries through the Cortex Agentic chat. This allows you to access and analyze datasets without requiring prior knowledge of XQL syntax.

This capability is provided through two actions. The first is a built-in TextToXQL action available for all agents, that takes natural language prompts and translates them into XQL queries. The second is the Cortex - Run XQL Query action, which is included with all system agents and can be added to custom agents. If a custom agent does not have the Cortex - Run XQL Query action, it cannot execute XQL queries.

| Action | Description | Availability |
| --- | --- | --- |
| TextToXQL | Translates your natural language request into a valid XQL query. This action is built-in to all agents. It does not display in the list of actions for an agent and it cannot be removed. \*\*Note:\*\* The TextToXQL action is a hidden system action and does not appear in the Agents Hub. | EU and US regions only. |
| Cortex - Run XQL Query | Executes an XQL query and returns the data. | All regions |

### Regional availability and usage

The TextToXQL action is only supported in the US and EU regions. In those regions, you can ask the agent to both generate and run XQL queries. In other regions, the TextToXQL action is not available, but you can write your own XQL queries and prompt the agent to run the query for you.

**Note:**

If you are in a non-supported region and ask an agent to create an XQL query, it may attempt to generate the query using general logic. We do not recommend this, as it may result in inaccurate syntax and unreliable results.

### Data access and permissions

The TextToXQL action is designed for system datasets. It cannot create XQL queries for custom datasets. You can manually write a query for custom datasets and ask the agent to run the query.

The TextToXQL action can generate XQL queries for datasets that you do not have permission to access, but the Cortex - Run XQL Query action can only execute if you have the necessary permissions for the dataset.

### Best practices for prompting

We recommend using clear specific language to request that the agent to create and execute XQL queries. Use terminology such as:

-   Create an XQL query to...
    
-   Build an XQL query for...
    
-   Generate an XQL query that...
    

You can have the agent automatically run the query or you can manually run it yourself.

### Results

When a query runs, the agent provides a preview of the results and you can also see the full dataset by pivoting directly to the XQL page.

**Note:**

Running XQL queries manually through agent does not consume compute units. This includes scenarios where you prompt the agent to create and execute a multi-step plan.

## Manage chat history

Manage and navigate your past chats with the Cortex Agentic Assistant.

Cortex Agentic Assistant helps you keep track of your investigations by organizing your chat history for easy review and continuity.

Your chat history is listed to the left of the prompt. The chat history is organized by periods: Chats from today, yesterday, the last seven days, and older. To continue a previous investigation or review a past conversation, scroll through the list and click on the chat you wish to resume.

By default, the first prompt you enter in a new chat becomes its title in the history. To edit the chat title or delete a chat that is no longer relevant, click ⋮ and select Edit or Delete.
