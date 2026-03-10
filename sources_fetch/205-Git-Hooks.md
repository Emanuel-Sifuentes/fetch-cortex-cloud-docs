---
title: "Git Hooks"
tocId: "uC64J~sTZcuseKHXtrRfyw"
contentId: "tMkm~Lk~~wO_rmLD6bQ9_A"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Git-Hooks"
depth: 2
---

# Git Hooks

Pre-commit and pre-receive hooks scan code changes locally and on push to detect exposed secrets.

Cortex Cloud Git hooks automatically scan your code for exposed secrets via the Cortex CLI wrapper before code changes are pushed or committed.

The following hooks are supported:

-   Pre-commit hooks: Run locally before changes are committed
    
-   Pre-receive hooks: Run on the remote server before changes are pushed