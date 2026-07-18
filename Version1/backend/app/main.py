"""FastAPI application entrypoint for POC AI-Driven UI Builder."""

import logging
import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.generate import init_llm_service, router as generate_router
from app.routers.publish import router as publish_router
from app.services.llm_service import LLMService

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Version 1 AI Company Profile Builder",
    description="A proof-of-concept API that generates SME website UI from natural language prompts using Google Gemini.",
    version="1.0.0",
)

# CORS middleware — allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(generate_router)
app.include_router(publish_router)


@app.on_event("startup")
async def startup_event():
    """Initialize services on application startup."""
    api_key = os.getenv("GEMINI_API_KEY")
    model = os.getenv("GEMINI_MODEL", "gemini-3-flash-preview")

    if not api_key or api_key == "your_gemini_api_key_here":
        logger.warning(
            "⚠️  GEMINI_API_KEY not set! Copy .env.example to .env and add your key.\n"
            "   Get a free key at: https://aistudio.google.com/apikey"
        )
        return

    try:
        llm_service = LLMService(api_key=api_key, model=model)
    except ImportError as exc:
        logger.warning("Gemini dependency unavailable; using local fallback: %s", exc)
        return

    init_llm_service(llm_service)
    logger.info("✅ LLM service initialized with Gemini API (model=%s)", model)


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "Version 1 AI Company Profile Builder"}
