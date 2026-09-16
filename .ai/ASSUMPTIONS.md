# Architectural Assumptions — Rolevia

1. Candidates want tailored resumes that accurately represent their real background rather than fabricated credentials.
2. Most high-value corporate employers use standard ATS platforms (Greenhouse, Lever, Workday) with either public APIs or standardized application forms.
3. PostgreSQL with pgvector provides adequate performance for hundreds of thousands of candidate vector embeddings before specialized vector clusters are needed.
4. Candidates access the platform across desktop workstations (tailoring studio) and mobile devices (status checks, interview prep).
