"""Publish validation endpoint; storage can be attached through a CMS adapter later."""

from fastapi import APIRouter

from app.schemas.models import PublishRequest, PublishResponse
from app.services.validator import validate_component_tree

router = APIRouter(prefix="/api", tags=["publish"])


@router.post("/publish", response_model=PublishResponse)
async def publish_page(request: PublishRequest) -> PublishResponse:
    validate_component_tree(request.components)
    editable_fields = [f"{node.id}.props" for node in request.components]
    return PublishResponse(status="ready", slug=request.slug, editable_fields=editable_fields)
