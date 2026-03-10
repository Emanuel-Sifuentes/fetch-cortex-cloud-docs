---
title: "AI-recommended guardrails"
tocId: "V3dk1U7RCq9eLFAaEZP_Dw"
contentId: "HtMBiE8PcV0Q6exvz41CWg"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/AI-recommended-guardrails"
depth: 2
---

# AI-recommended guardrails

AI-recommended guardrails automate risk prevention by analyzing your organization’s security data to suggest granular, context-aware guardrails that lock down clean environments and block recurring risks.

The Cortex Cloud Application Security AI-recommended guardrails shift your security posture from reactive detection to proactive, automated prevention. By analyzing your organization’s historical security data and risk profile, the AI engine detects gaps and suggests granular, context-aware policies tailored to your specific environment. Unlike static policies, these recommendations are data-driven responses designed to maximize immediate risk reduction with minimal operational overhead.

## Enforcement strategies

The intelligence engine categorizes recommendations into two primary strategic models designed to reduce technical debt and prevent regression.

-   **Lockdown scopes** (posture preservation): Maintains the integrity of clean code scopes. The AI identifies repositories or applications currently free of high-severity vulnerabilities and recommends policies to prevent new risks from being introduced into these clean scopes
    
-   **Stop the bleeding** (risk containment): Targets recurring issue patterns. The engine analyzes the last 30 days of data to identify persistent risks, such as a specific vulnerable package appearing across multiple repositories, and suggests policies to block these components
    

## Context-aware prioritization

The engine prioritizes guardrails for **Critical** and **High** severity issues, specifically those affecting assets detected in **deployed environments**, ensuring that guardrails address actual exposure rather than theoretical risk

## Discovery and application

While guardrails are technically managed as policies, the workflow for AI recommendations spans two interface areas:

-   **Discovery (ASPM Command Center)**: The Command Center serves as the discovery layer, presenting the most impactful opportunities for risk reduction
    
-   **Enforcement (AppSec Policies)**: Recommendations are reviewed, customized, and formally applied as active enforcement policies within the AppSec Policies list
    

## Supported scopes

Currently, AI-recommended guardrails are generated based exclusively on findings from the Software Composition Analysis (SCA) scanner. They do not currently support data from third-party scanners, Secrets, or Infrastructure as Code (IaC) scanners