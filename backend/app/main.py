"""FastAPI application entrypoint for POC AI-Driven UI Builder."""

import logging
import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.generate import init_llm_service, router as generate_router
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
    title="POC AI-Driven UI Builder",
    description="A proof-of-concept API that generates SME website UI from natural language prompts using Google Gemini.",
    version="0.1.0",
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


@app.on_event("startup")
async def startup_event():
    """Initialize services on application startup."""
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key or api_key == "your_gemini_api_key_here":
        logger.warning(
            "⚠️  GEMINI_API_KEY not set! Copy .env.example to .env and add your key.\n"
            "   Get a free key at: https://aistudio.google.com/apikey"
        )
        return

    llm_service = LLMService(api_key=api_key)
    init_llm_service(llm_service)
    logger.info("✅ LLM service initialized with Gemini API")


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "POC AI-Driven UI Builder"}
