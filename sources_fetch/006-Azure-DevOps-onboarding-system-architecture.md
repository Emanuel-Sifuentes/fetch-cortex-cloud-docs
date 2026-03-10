---
title: "Azure DevOps onboarding system architecture"
tocId: "A3Ps0YDzrOEgBLvpUuEdmQ"
contentId: "UtF88Fc6sNPLLOSyExmpUw"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Azure-DevOps-onboarding-system-architecture"
depth: 3
---

# Azure DevOps onboarding system architecture
This topic details the authentication mechanisms, identity models, and multi-tenant data structures used by Cortex to integrate with Azure DevOps.

## Authentication architecture

**Supported methods**

-   **Microsoft Entra ID (OAuth 2.0)**: The recommended standard for Cortex integrations, utilizing dynamic delegated tokens
    
    **Note**
    
    Microsoft has announced the deprecation of legacy OAuth methods by 2026, making Entra ID the required standard for long-term support.
    
-   **Personal Access Tokens (PAT)**: A static token model where authentication is handled via a token generated directly within Azure DevOps. A PAT is cryptographically bound to the specific organization and user account active at the time of creation
    

**Global configuration**

-   **Ownership**: The Azure application used for OAuth is verified and owned by Cortex. It is registered in a fixed Cortex Microsoft Entra ID tenant that never changes
    
-   **Regional specificity**: To ensure regional compliance and performance, each Cortex region (such as US, EU) utilizes its own dedicated Azure application registration
    

## The delegated execution and identity model

Cortex operates under a Delegated Access Model, distinguishing it from Service Principal or App-only access models.

**Secure conduit principles**

The Azure application registered by Cortex serves as the OAuth client and trusted identity, acting solely as a secure conduit to:

-   Authenticate the user
    
-   Obtain delegated access tokens
    
-   Call Azure DevOps APIs on behalf of that user
    

**Comparison: Cortex vs. GitHub Apps**

Unlike GitHub Apps, where the application becomes a first-class principal (autonomous actor) inside the customer environment, the Cortex Azure application **never operates independently** of a user’s delegated identity.

**Security and auditability**

-   **Permissions enforcement**: Every API call is evaluated using the user’s existing permissions. Cortex cannot exceed or bypass the access rights of the authenticated user. If a user lacks permission for an operation, the request is denied
    
-   **Audit trail**: In Azure DevOps audit logs, all activity appears as originating from the **individual user's identity**, not a Cortex-owned service account
    

## Multi-tenant and multi-domain logic

Cortex employs a composite identifier logic to support complex organizational structures `[User Email]` + \[`Microsoft Entra ID Tenant ID]`.

**Operational comparison: dynamic vs. manual**

The architectural difference between OAuth and PATs directly impacts onboarding effort.

-   **Entra ID (dynamic discovery)**: Because OAuth uses a dynamic tenant selection flow, a single authentication session can discover and connect multiple organizations tied to that tenant automatically
    
-   **Personal Access Token (PAT) (static/manual onboarding)**: A PAT lacks cross-organization visibility; it is strictly limited to the specific organization selected during its creation
    
    -   **Result**: Multi-tenant or multi-org onboarding via PAT is a strictly manual process. An administrator must generate and provide a unique PAT for every individual organization they wish to onboard
        
    

**The email + tenant logic**

-   **One email, multiple integrations**: A single user identity (email) can own multiple distinct integrations if they target different tenants (such as a Production tenant and a Sandbox tenant)
    
-   **Uniqueness constraint**: You cannot create two integrations for the same email on the same tenant
    
-   **Organization mapping**: Multiple Azure DevOps organizations can be mapped to a single integration if they reside under the same Entra ID tenant. Organizations in different tenants require separate integration instances
    
-   **PAT requirement**: Because a PAT is tied to a specific organization, users must provide a separate PAT for each organization they wish to onboard
    

**Architecture example**

The following scenario illustrates how Cortex maps users, tenants, and organizations. In this example, two Cortex integrations are created; one per email + tenant combination; even though the same user email is used across all environments.

**User email**: dev.user@company.com

**Microsoft Entra ID tenants**:

-   Tenant A (company.onmicrosoft.com)
    
-   Tenant B (subsidiary.onmicrosoft.com)
    

**Azure DevOps organizations**:

-   Org-1 → connected to Tenant A
    
-   Org-2 → connected to Tenant A
    
-   Org-3 → connected to Tenant B
    

**Resulting Cortex integrations**:

| **Cortex integration** | **Email** | **Entra ID tenant** | **Azure DevOps organizations** |
| --- | --- | --- | --- |
| Integration #1 | dev.user@company.com | Tenant A | Org-1, Org-2 |
| Integration #2 | dev.user@company.com | Tenant B | Org-3 |

## User authorization and session handling

When using the recommended Microsoft Entra ID flow, Cortex redirects the user to the Microsoft identity platform: [https://login.microsoftonline.com/common/oauth2/v2.0/authorize](https://login.microsoftonline.com/common/oauth2/v2.0/authorize). To ensure security and multi-tenant accuracy, the architecture is designed to bypass standard browser session defaults.

Standard OAuth flow defaults to the user's last active session based on browser cookies. To prevent authorization against the wrong environment, Cortex enforces an explicit domain selection flow.

**Session Management**

-   **The problem**: Without architectural enforcement, Azure may automatically sign a user into their "Home" or "Last Used" directory, leading to token issuance for the wrong tenant
    
-   **The mechanism (explicit bypass)**: Users are directed to use the Sign-in option → Sign in to an organization workflow. By entering a specific Tenant ID or Domain, the user overrides cached browser credentials
    
-   **Result**: This ensures the authorization token is issued for the intended directory
    

**Consent**

After the explicit tenant selection and successful authentication, Microsoft prompts the user to consent to the requested scopes specifically for that tenant. This consent grant is what allows Cortex to act as a delegated agent, performing actions on the user's behalf.

## Authorization scopes and event architecture

Cortex requires specific scopes to enable both API-based data retrieval and its event-driven architecture.

**Event subscription (Webhooks)**

Cortex subscribes to real-time events (such as `git.push`, `build.complete`) to trigger automated scans.

-   **Functional dependency**: There is no single **Webhook** permission in Azure DevOps. The ability to create subscriptions is derived from standard scopes
    
-   **Required scopes**:
    
    -   `vso.code_write`: Required for code-related events
        
    -   `vso.build`: Required for build-related events
        
    
-   **Impact**: Without these specific permissions, the event-driven architecture cannot function, and Cortex will revert to scheduled (polling) synchronization only