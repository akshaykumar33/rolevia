# Domain Vocabulary & Canonical Glossary

AI agents and human engineers must use these terms consistently across code, types, docs, and comments.

---

## Glossary of Canonical Terms

* **Tenant**: Root account boundary for an individual candidate or enterprise organization.
* **Workspace**: A partitioned environment within a Tenant holding candidate data and applications.
* **User**: An authenticated human identity holding memberships in one or more Workspaces.
* **Candidate**: The core persona record representing the job seeker.
* **Candidate Profile**: Contact information, preferences, locations, target compensation, and work authorization.
* **Career Profile**: High-level summary of verified roles, career trajectory, and professional identity.
* **Career Graph**: The normalized graph of experiences, achievements, skills, and parent companies.
* **Career Intelligence Vault**: Secure storage containing raw candidate documents, verified career graph nodes, and historical interview notes.
* **Job**: A structured record of an employment opening.
* **Job Source**: External board, ATS platform, or employer posting the job.
* **Job Source Adapter**: Pluggable interface implementing discovery, ingestion, and application submission for a specific provider.
* **Job Match**: Calculated fit analysis comparing candidate verified evidence against job requirements.
* **Match Evidence**: Specific verified Career Vault citations proving alignment with a job requirement.
* **Application**: State machine tracking the lifecycle of an application to a specific job.
* **Application Package**: Bundled tailored resume version, cover letter, questionnaire answers, and portfolio links.
* **Application Workflow**: Temporal workflow coordinating preparation, approval, and submission.
* **Resume Version**: Immutable snapshot of a tailored resume generated for a specific job application.
* **Career Memory**: Persistent cross-application knowledge (e.g. past recruiter questions, interview feedback).
* **Context**: Structured data loaded into an LLM prompt.
* **Context Graph**: Relational + semantic hybrid graph used to retrieve relevant candidate experience.
* **RAG**: Retrieval-Augmented Generation pipeline using pgvector and full-text search.
* **Agent**: Bounded software actor executing typed tools to achieve a specific workflow task.
* **Tool**: Strongly typed, validated function available to an agent.
* **Workflow**: Durable multi-step process orchestrated by Temporal.
* **Automation**: Policy-controlled automated tasks governed by candidate limits and emergency stop controls.
* **Integration**: External service connection (e.g. Google OAuth, Stripe).
* **Connector**: Implementation of `JobSourceAdapter` for a third-party job board or ATS.
* **Consent**: Explicit candidate permission authorizing actions affecting external accounts.
* **Entitlement**: Feature or quota granted by an active subscription plan.
* **Audit Event**: Immutable security record logging a sensitive action with user, tenant, and timestamp context.
