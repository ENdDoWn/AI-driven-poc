# POC AI-Driven UI Builder

A proof-of-concept application similar to [Lovable](https://lovable.dev) — type a prompt and AI generates a live website preview.

## Architecture

```
User Prompt → Next.js Frontend → FastAPI Backend → Google Gemini → JSON Component Tree → Live Preview
```

- **Frontend** (Next.js 15): Chat-like prompt input + live preview with recursive JSON-to-React rendering
- **Backend** (FastAPI): Receives prompts, calls Gemini API, validates & returns structured JSON

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
