<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AI UI Builder Project Guide

## What This Project Does
- POC for AI-driven website generation similar to Lovable.
- User writes a prompt in the frontend chat; backend calls Gemini and returns JSON component trees.
- The preview panel renders generated JSON recursively and supports both generate mode and edit mode.

Primary overview: [../README.md](../README.md)

## Architecture At A Glance
- Flow: Prompt -> Next.js frontend -> FastAPI `/api/generate` -> Gemini -> JSON component tree -> React renderer.
- Frontend app: [src/app/page.tsx](src/app/page.tsx)
- Backend entrypoint: [../backend/app/main.py](../backend/app/main.py)
- Generate endpoint: [../backend/app/routers/generate.py](../backend/app/routers/generate.py)
- LLM orchestration: [../backend/app/services/llm_service.py](../backend/app/services/llm_service.py)
- Prompt templates: [../backend/app/prompts/system_prompt.py](../backend/app/prompts/system_prompt.py)

## Run Commands
- Frontend dev: `cd frontend && npm run dev`
- Backend dev: `cd backend && python -m uvicorn app.main:app --reload --port 8000`
- Frontend lint: `cd frontend && npm run lint`

VS Code task is available for both services in parallel:
- [../../.vscode/tasks.json](../../.vscode/tasks.json)

## Current Conventions
- Backend model config is env-driven:
	- `GEMINI_API_KEY` is required.
	- `GEMINI_MODEL` selects the model.
- Generate mode returns full component trees.
- Edit mode prefers compact delta (`changes`) and supports full-tree fallback.
- Frontend renderer supports known UI components and generic freeform component rendering.

## Common Pitfalls
- If edit requests fail with prompt-format errors, verify escaped braces in [../backend/app/prompts/system_prompt.py](../backend/app/prompts/system_prompt.py).
- If custom component types look plain, refine prompt props (e.g. background, spacing, columns, CTA props) before changing renderer code.
- If dev server behavior looks stale, restart backend/frontend tasks after prompt or renderer updates.

## Change Policy For Agents
- Keep changes surgical and avoid unrelated refactors.
- Validate with concrete checks (lint/compile/run path relevant to changed files).
- Prefer linking existing docs over duplicating long explanations.
