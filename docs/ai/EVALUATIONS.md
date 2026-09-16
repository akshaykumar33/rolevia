# AI Evaluation Architecture

Model and prompt updates must be verified against offline evaluation benchmarks before production deployment.

---

## 1. Evaluation Datasets
* Standardized test sets of diverse resumes and challenging job descriptions.
* Stored in version-controlled test directories completely isolated from live candidate production data.

---

## 2. Evaluation Metrics
* **Factual Precision**: Zero fabricated statements allowed.
* **Extraction Recall**: Accuracy identifying required technical skills.
* **Relevance Ranking**: Normalized Discounted Cumulative Gain (NDCG) for matching.
