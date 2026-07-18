# Version 1 — AI Company Profile Builder

A proof-of-concept application similar to [Lovable](https://lovable.dev) — type a prompt and AI generates a live website preview.

## MVP architecture

```
User Prompt → Next.js Frontend → FastAPI Backend → Google Gemini → JSON Component Tree → Live Preview
```

- **Frontend** (Next.js 15): Chat-like prompt input + live preview with recursive JSON-to-React rendering
- **Backend** (FastAPI): Composes approved templates, optionally calls Gemini, validates structured JSON, and checks publish payloads
- **Template Registry**: `backend/app/templates/registry.py` is the allow-list for generated components
- **Component Registry**: `backend/app/components/registry.py` defines reusable atomic UI components and their validation rules
- **Page Templates**: `company_profile` and `landing_page` compose approved components into repeatable page structures
- **Navigation Templates**: `backend/app/templates/nav/` and `frontend/src/templates/nav/` contain all Navbar variants
- **Edit mode**: Stable section ids are preserved for section-level updates and future CMS mapping

## Quick Start

### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set up API key
cp .env.example .env
# Edit .env and add your Gemini API key (free: https://aistudio.google.com/apikey)

# Run
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Open http://localhost:3000 and start prompting!

Without `GEMINI_API_KEY`, Version 1 returns a deterministic demo page so the full preview flow can be tested locally. The publish validation endpoint is `POST /api/publish`.

## Example Prompts

- "สร้างหน้าเว็บร้านกาแฟ มี hero section สวยๆ แสดงเมนูกาแฟ 3 รายการ และฟอร์มติดต่อ"
- "สร้างเว็บไซต์ร้านอาหารไทย มี navbar, hero section, เมนูแนะนำ 4 รายการ, และ footer"
- "เปลี่ยนสีปุ่มเป็นสีแดง" (edit mode - modifies existing UI)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router) |
| Styling | Vanilla CSS |
| Backend | FastAPI |
| LLM | Google Gemini (free tier) |
| Validation | Pydantic v2 |
