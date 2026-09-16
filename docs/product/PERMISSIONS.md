# Permissions & Consent Model

Permissions govern access to resources; Consent grants authority for actions affecting real-world accounts or external third parties.

---

## Permission Matrix

| Capability | Anonymous | Candidate | Mentor | Org Admin | Platform Admin |
| ---------- | :-------: | :-------: | :----: | :-------: | :------------: |
| View Public Marketing | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Manage Own Career Vault | :x: | :white_check_mark: | :x: | :x: | :x: |
| View Candidate Vault | :x: | :white_check_mark: | Assigned Only | Aggregate Only | Audit Only |
| Tailor Application | :x: | :white_check_mark: | Review Only | :x: | :x: |
| Approve Application Submission | :x: | :white_check_mark: | :x: | :x: | :x: |
| Trigger Automated Connector | :x: | :white_check_mark: (with Consent) | :x: | :x: | :x: |
| View Org Placement Analytics | :x: | :x: | Cohort Only | :white_check_mark: | :white_check_mark: |
| Manage Billing & Subscriptions| :x: | Personal Only | :x: | Org Only | :white_check_mark: |

---

## Explicit Consent Protocols
* **External Application Submission**: Under no circumstances does the system submit an application without the candidate's explicit approval or configured automated policy with predefined guardrails.
* **Mentor Access Revocation**: Candidates retain the right to revoke mentor review privileges over their personal career intelligence at any time.
