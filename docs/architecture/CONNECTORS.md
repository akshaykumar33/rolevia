# Job Source Connectors

Connectors provide standardized interfaces between Rolevia and external job boards, company career portals, and Applicant Tracking Systems (ATS).

---

## Connector Capability Model

Connectors implement the `JobSourceAdapter` interface and explicitly declare their capabilities:

```typescript
export enum ConnectorCapability {
  DISCOVERY = 'DISCOVERY', // Can query and fetch job listings
  DETAILS = 'DETAILS',     // Can retrieve comprehensive job description & requirements
  ASSIST = 'ASSIST',       // Can fill or prepare web application inputs
  SUBMIT = 'SUBMIT',       // Can submit final application via approved API/workflow
  STATUS = 'STATUS',       // Can poll or receive application progression status
}

export interface JobSourceAdapter {
  readonly id: string;
  readonly name: string;
  readonly capabilities: Set<ConnectorCapability>;

  discoverJobs(criteria: SearchCriteria): Promise<JobSummary[]>;
  getJobDetails(jobId: string): Promise<JobDetails>;
  prepareSubmission?(application: ApplicationPackage): Promise<PreparationResult>;
  submitApplication?(application: ApplicationPackage): Promise<SubmissionResult>;
  getApplicationStatus?(referenceId: string): Promise<ApplicationStatus>;
}
```

---

## Security & Ethical Invariants
* **Strict Anti-Circumvention Rule**: Connectors must never implement CAPTCHA bypasses, cloudflare anti-bot circumventions, or credential-stealing proxies.
* **Respect Provider Policies**: Operations must honor published rate limits, terms of service, and robots.txt protocols.
* **Graceful Degradation**: If an external platform only supports `DISCOVERY` and `DETAILS`, Rolevia prepares the tailored materials for manual user copy/export rather than attempting unsanctioned browser automation.
