# License Decision Pending

## Status
**PENDING PROJECT OWNER DECISION**

---

## Context
Rolevia is an AI Career Operating System designed as a multi-tenant commercial SaaS with proprietary matching algorithms, career intelligence graphs, and automation connectors. An explicit license has not yet been selected by the project owner. To prevent unintended public licensing of proprietary commercial logic while keeping the repository modular, the final license determination is documented here as an open decision.

---

## Licensing Options Evaluated

### Option 1: Proprietary / All Rights Reserved (Recommended for SaaS Core)
* **Description**: Complete commercial control. Code is maintained in private repositories. No unauthorized distribution or modification is permitted.
* **Pros**: Protects competitive business logic, prompt chains, connector implementations, and matching heuristics.
* **Cons**: Limits external community contributions to closed-source contributors.

### Option 2: Business Source License (BSL 1.1) / Functional Source License (FSL)
* **Description**: Source code is available for view and non-competing use, converting to an open-source license (e.g. Apache 2.0) after a fixed period (e.g., 2–4 years).
* **Pros**: High community transparency and developer trust while preventing commercial free-riding.
* **Cons**: More complex licensing administration.

### Option 3: Dual Licensing (AGPL-3.0 + Commercial License)
* **Description**: Core platform licensed under GNU AGPLv3 for open-source users (requiring network service source sharing), with commercial exemptions sold for proprietary deployments.
* **Pros**: Strong protection against cloud providers hosting without contributing back.
* **Cons**: Can create adoption friction for enterprise customers.

### Option 4: Permissive Open Source (MIT or Apache-2.0)
* **Description**: Unrestricted reuse, modification, and distribution.
* **Pros**: Maximizes developer adoption and ecosystem contributions.
* **Cons**: Exposes core proprietary AI career orchestration logic to direct commercial duplication.

---

## Current Decision
All rights are reserved by the project owners pending final corporate licensing determination.
No permissive open source license grant is implied until explicitly updated by the repository owner.
