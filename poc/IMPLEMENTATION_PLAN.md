# AI-Driven Company Profile + CMS Implementation Plan

## 1) Goal
Build a production-ready service that generates company profile websites by assembling prebuilt component templates, while keeping AI in charge of page composition and content adaptation.

Business outcome:
- Launch a sellable "Company Profile + CMS" package for SME clients.
- Reduce delivery time and improve visual consistency versus fully freeform generation.
- Create recurring monthly revenue from hosting, CMS maintenance, and content updates.

## 2) Scope
In scope:
- Template-based website generation (AI selects from approved components).
- Page composition engine (section ordering + prop filling).
- Edit mode with section-level updates (id + props patch).
- CMS-ready content model for post-launch client edits.

Out of scope (Phase 1):
- Multi-tenant billing automation.
- Advanced A/B testing and personalization.
- Complex ecommerce workflows.

## 3) Product Strategy
### 3.1 Service Packages
- Starter: 4-5 pages, core company profile sections.
- Growth: Starter + blog/news + stronger SEO setup.
- Premium: bilingual content, deeper lead funnel, priority support.

### 3.2 Positioning
- Fast turnaround (days, not weeks).
- Professional visual consistency.
- Easy post-launch edits through CMS.
- Managed service option for non-technical clients.

## 4) Technical Architecture (Target)
Flow:
1. User prompt + business data input.
2. AI planner creates a page blueprint (section intent).
3. AI selector chooses component templates from registry.
4. Composer merges templates + props into a final component tree.
5. Validator enforces schema and constraints.
6. Frontend renderer shows preview and supports edit mode.
7. Publish pipeline pushes content to CMS-backed pages.

Core modules:
- Template Registry: metadata + schema for each template.
- Composition Engine: deterministic assembly logic.
- LLM Service: intent extraction, selection hints, content generation.
- Validation Layer: strict schema checks and fallback behavior.
- CMS Adapter: map generated props to editable CMS fields.

## 5) Work Phases
## Phase 0: Alignment (Week 1)
Deliverables:
- Finalized package definitions (Starter/Growth/Premium).
- Component taxonomy and naming conventions.
- Design token baseline (type scale, spacing, color system).

Exit criteria:
- Team agrees on service boundaries and success metrics.

## Phase 1: Template Foundation (Weeks 2-3)
Deliverables:
- 20-30 reusable templates (hero, trust, services, cta, contact, footer, etc.).
- Registry file format with required and optional props.
- Validation rules per template.

Exit criteria:
- Any template can be rendered with sample props without manual fixes.

## Phase 2: AI Composition (Weeks 4-5)
Deliverables:
- Prompt contracts for blueprint + template selection.
- Selector logic that only allows approved templates.
- Prop filling strategy with guardrails (tone, locale, CTA style).
- Fallback strategy when model output is invalid.

Exit criteria:
- 80%+ of test prompts generate valid pages on first pass.

## Phase 3: Edit + CMS Mapping (Weeks 6-7)
Deliverables:
- Patch-based edit mode for section-level changes.
- Stable semantic ids for all editable sections.
- CMS mapping rules (title, body, media, CTA, SEO fields).
- Content sync job between generated output and CMS storage.

Exit criteria:
- Users can modify individual sections without breaking layout.

## Phase 4: Launch Readiness (Week 8)
Deliverables:
- QA checklist (desktop/mobile/responsive/accessibility basics).
- Analytics events for lead actions and engagement.
- Ops playbook for onboarding and maintenance.
- Pilot launch with 3 real client projects.

Exit criteria:
- Pilot clients go live and receive ongoing update workflow.

## 6) Success Metrics
Delivery:
- Average delivery time per project.
- Rework rounds before approval.

Quality:
- First-pass valid generation rate.
- Layout breakage rate after edits.

Business:
- Lead-to-close conversion rate.
- Monthly recurring revenue (MRR).
- 3-month retention rate.

## 7) Team Roles
- Product/Business: package design, pricing, sales scripts.
- Design: template system and visual quality bar.
- Backend: registry, composition engine, validation, cms adapter.
- Frontend: renderer, editor UX, publish flow.
- QA/Ops: launch checklist, reliability, support runbooks.

## 8) Risks and Mitigations
Risk: Output quality inconsistency.
Mitigation: Use approved templates only, strict schema validation, fallback defaults.

Risk: Edit requests cause layout regressions.
Mitigation: Section-level ids, patch constraints, snapshot validation before save.

Risk: Limited template variety.
Mitigation: Add templates every sprint and track underused/overused sections.

Risk: Scope creep during client onboarding.
Mitigation: Clear package boundaries and paid change requests.

## 9) Next Actions (Immediate)
1. Freeze the first 20 template specs.
2. Implement registry schema and validator.
3. Update LLM prompts to "select from registry" mode.
4. Build one end-to-end pilot flow: prompt -> preview -> section edit -> publish.
5. Test with 10 prompts across 3 industries.

## 10) Definition of Done (MVP)
MVP is done when:
- The system generates from approved templates only.
- Section-level edits are reliable.
- A generated page can be published and edited via CMS fields.
- The team can deliver a client project in <= 7 days.
