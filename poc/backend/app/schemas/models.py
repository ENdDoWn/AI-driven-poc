"""Pydantic models for the AI-Driven UI Builder API."""

from __future__ import annotations

from typing import Any, Optional

from pydantic import BaseModel, Field


class ComponentNode(BaseModel):
    """A single UI component node in the component tree."""

    id: str = Field(..., description="Unique identifier for the component")
    type: str = Field(
        ...,
        description="Component type: heading, text, button, image, card, container, hero, form, navbar, footer",
    )
    props: dict[str, Any] = Field(
        default_factory=dict,
        description="Component-specific properties (text, variant, src, etc.)",
    )
    children: list[ComponentNode] = Field(
        default_factory=list,
        description="Nested child components",
    )


class GenerateRequest(BaseModel):
    """Request body for the /api/generate endpoint."""

    prompt: str = Field(..., description="User prompt describing the desired UI")
    current_json: Optional[list[ComponentNode]] = Field(
        default=None,
        description="Current component tree JSON for edit mode. If provided, the AI will modify this instead of creating from scratch.",
    )
    grill_complete: bool = Field(default=False, description="Whether grill with doc questions have been answered")


class GenerateResponse(BaseModel):
    """Response body from the /api/generate endpoint."""

    status: Literal["needs_clarification", "ready"] = "ready"
    components: list[ComponentNode] = Field(default_factory=list, description="Generated component tree")
    prompt_used: str = Field(..., description="The prompt that was sent to the AI")
    message: Optional[str] = None
    questions: list[str] = Field(default_factory=list)
