---
name: grill-with-docs
description: Interview users one question at a time with clear choices before creating, drafting, or substantially revising documents. Keep asking until the document brief is complete and confirmed; clarify the outcome, audience, scope, terminology, sources, constraints, structure, and acceptance criteria before writing.
---

# Grill With Docs

Align the user and the agent before producing a document. Use this skill whenever a user asks to create, write, draft, generate, plan, specify, or substantially revise a document, proposal, report, requirements document, policy, guide, announcement, or similar written artifact. Do not wait for an explicit slash command.

## Operating rules

- Start the interview before drafting the requested document unless the user has already supplied a complete, unambiguous brief.
- Ask exactly one high-leverage question per turn, then wait for the user's answer. Never send a questionnaire.
- Offer 2–4 concrete choices for every question, mark one as `แนะนำ`/`Recommended`, and include `อื่นๆ: ระบุเอง` when the choices may not cover the user's needs.
- Include a concise recommended answer with each question, clearly marked as a recommendation rather than an assumption. Accept a choice by number, label, or the user's own answer.
- Ask in the user's language and match their level of formality.
- Preserve answers already given. Do not ask for information that can be established reliably from the conversation, repository, or provided source material.
- When a question concerns the existing application or repository, inspect the relevant code and configuration first. Prefer codebase knowledge-graph tools (`search_graph`, `trace_path`, `get_code_snippet`, `query_graph`, `search_code`) when available; use file search for non-code files or when the graph lacks the answer.
- Surface uncertainty and conflicting sources instead of silently choosing between them.
- Treat a document as the output of the alignment process, not as a reason to skip it. Keep asking until every required item is answered; do not draft, call a document-generation tool, or claim completion while an item is unresolved.

## Required completion checklist

Track the checklist internally and show concise progress when useful. A document is ready only when all applicable items have a confirmed answer:

- Document type and desired outcome
- Primary audience and expected action
- Problem, scope, and explicit non-goals
- Canonical terminology and important definitions
- Authoritative sources, examples, and unverified inputs
- Language, tone, format, length, deadline, privacy, and compliance constraints
- Proposed structure and level of detail
- Acceptance criteria for a useful, complete document
- User confirmation of the alignment recap

If the user says “ทำเลย” or gives an incomplete answer, ask the next missing item with choices. Never infer a material decision just to finish faster. Skip only items that are genuinely not applicable or already confirmed by the user or reliable project evidence.

## Interview sequence

Walk down the decision tree in dependency order. Skip a question only when its answer is already explicit or safely discoverable.

1. Establish the document's outcome: what should change after someone reads it?
2. Identify the primary audience, their context, and the decision or action expected from them.
3. Define the problem, scope, and explicit non-goals.
4. Resolve domain terms into canonical wording. Prefer the user's own words, and distinguish synonyms that mean different things.
5. Gather authoritative inputs: existing documents, repository behavior, data, policies, links, and examples. Mark each source as authoritative, contextual, or unverified.
6. Confirm constraints: language, tone, format, length, deadline, privacy, compliance, and compatibility with existing templates.
7. Propose and confirm the document structure and level of detail.
8. Define acceptance criteria: what must be true for the document to be useful and complete?
9. Review unresolved trade-offs. Offer an ADR only for a decision that is hard to reverse, has a meaningful trade-off, and would be surprising without its rationale.

After each answer, briefly reflect the selected choice in the user's terminology, update the working state, and ask only the next unresolved question with choices. If the answer changes an earlier decision, call out the impact and revisit dependent questions.

## Keep the paper trail

Create files lazily, only when something has crystallised and it is safe to write in the repository:

- Write settled vocabulary to `CONTEXT.md` at the repository root. If `CONTEXT-MAP.md` exists, follow it and write to the relevant context's `CONTEXT.md` instead.
- Keep `CONTEXT.md` a glossary and decision vocabulary: term, meaning in this project, and useful synonyms or exclusions. Do not turn it into an implementation plan or a copy of the interview.
- Create an ADR under `docs/adr/` only for a qualifying hard-to-reverse decision. Include context, options considered, decision, consequences, and status. Avoid ADRs for reversible wording, formatting, or implementation details.
- Preserve existing glossary entries and ADR numbering/style. Inspect nearby files before creating or editing them.
- Do not create empty scaffolding, a transcript, or documentation solely to demonstrate that the skill ran.

## Handoff to document creation

When the interview is aligned:

1. Summarize the agreed outcome, audience, scope, terminology, sources, constraints, structure, and acceptance criteria in a compact alignment recap.
2. Ask the user to confirm the recap as the final gate. Do not create the document until confirmation is received, unless the user already explicitly confirmed the complete brief.
3. Keep the document separate from the glossary and ADRs. Link to those artifacts when their terms or decisions help the reader.
4. Validate the result against the acceptance criteria and identify any assumptions or unverified claims.

If the user explicitly asks to skip the interview, comply for a low-risk, well-scoped document but state the assumptions briefly. For ambiguous, high-impact, public, legal, financial, or policy documents, ask for the minimum missing decision before writing.
