# Skill: Context Graph Operations

## Purpose
Query and mutate the normalized Career Knowledge Graph, maintaining verified links between skills, experiences, and evidence.

## When to use
* Ingesting extracted resume data, updating candidate achievements, or expanding context for tailoring.

## Inputs
* Graph node entities (experiences, achievements, skills), relation types, provenance citations.

## Procedure
1. Verify node ownership within current workspace.
2. Ingest nodes into PostgreSQL tables with foreign key constraints.
3. Assign audit status (`CONFIRMED_BY_USER` vs `INFERRED_BY_AI`).
4. Generate corresponding `context_embeddings` for new achievement nodes.

## Validation
* Verify referential integrity; check that orphaned skill evidence nodes are rejected.

## Common mistakes
* Marking AI-extracted claims as confirmed without explicit candidate affirmation.

## Security considerations
* Ensure graph traversals do not traverse foreign tenant foreign keys.

## Output expectations
* Structured graph nodes persisted with explicit verification provenance.
