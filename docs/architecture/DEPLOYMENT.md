# Deployment Architecture

Rolevia is architected for cloud-native deployment with primary target AWS, maintaining portability across compliant container environments.

---

## Target Topology

* **Edge / CDN**: CloudFront + AWS WAF
* **Compute**: Amazon ECS (Fargate) or EKS running containerized services
  * `web`: Next.js web application
  * `api`: NestJS core API service
  * `worker`: Temporal workers and queue consumers
* **Data Stores**:
  * Amazon Aurora PostgreSQL (Serverless v2) with `pgvector`
  * Amazon ElastiCache (Redis)
  * Amazon S3 with SSE-KMS encryption and lifecycle policies
* **Orchestration**: Temporal Cloud or self-hosted Temporal cluster on ECS
* **Messaging**: Amazon SQS and EventBridge for decoupled domain events
