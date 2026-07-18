"""Router for UI generation endpoints."""

import logging

from fastapi import APIRouter, HTTPException

from app.schemas.models import GenerateRequest, GenerateResponse
from app.services.llm_service import LLMService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["generate"])

# Will be set during app startup
_llm_service: LLMService | None = None


def init_llm_service(service: LLMService) -> None:
    """Initialize the LLM service for this router.

    Args:
        service: An initialized LLMService instance.
    """
    global _llm_service
    _llm_service = service


@router.post("/generate", response_model=GenerateResponse)
async def generate_ui(request: GenerateRequest) -> GenerateResponse:
    """Generate or edit UI components from a natural language prompt.

    - If `current_json` is null → Generate a new UI from scratch.
    - If `current_json` is provided → Edit the existing UI based on the prompt.
    """
    if not request.grill_complete:
        return GenerateResponse(
            status="needs_clarification",
            prompt_used=request.prompt,
            message="ก่อนสร้างเว็บไซต์ ขอเก็บรายละเอียดด้วย grill with doc ก่อนครับ",
            questions=[
                "เป้าหมายธุรกิจและกลุ่มลูกค้าคืออะไร?",
                "ต้องการหน้าเว็บประเภทใด และมี section อะไรบ้าง?",
                "ชื่อแบรนด์ ข้อความภาษาไทย/อังกฤษ และ CTA ที่ต้องการคืออะไร?",
                "โทนสี ฟอนต์ รูปภาพ และเว็บตัวอย่างที่ชอบมีอะไรบ้าง?",
                "ต้องรองรับมือถือ มี form, link หรือ interaction ใดเป็นพิเศษไหม?",
                "มีข้อจำกัด, SEO, accessibility, analytics หรือ acceptance criteria อะไรบ้าง?",
            ],
        )

    if _llm_service is None:
        raise HTTPException(status_code=500, detail="LLM service not initialized. Check your GEMINI_API_KEY.")

    try:
        components = await _llm_service.generate_ui(
            prompt=request.prompt,
            current_json=request.current_json,
        )

        return GenerateResponse(
            status="ready",
            components=components,
            prompt_used=request.prompt,
        )

    except ValueError as e:
        logger.error("Validation error: %s", str(e))
        raise HTTPException(
            status_code=422,
            detail=f"Failed to parse AI response: {str(e)}",
        )

    except Exception as e:
        logger.error("Generation failed: %s", str(e))
        raise HTTPException(
            status_code=500,
            detail=f"AI generation failed: {str(e)}",
        )
