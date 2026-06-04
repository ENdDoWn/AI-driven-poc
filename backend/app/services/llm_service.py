"""LLM service for interacting with Google Gemini API."""

import json
import logging
import re

from google import genai
from google.genai import types

from app.prompts.system_prompt import EDIT_PROMPT_TEMPLATE, SYSTEM_PROMPT
from app.schemas.models import ComponentNode

logger = logging.getLogger(__name__)


class LLMService:
    """Service for generating UI components using Google Gemini."""

    def __init__(self, api_key: str, model: str = "models/gemini-2.5-flash"):
        """Initialize the LLM service with a Gemini API key.

        Args:
            api_key: Google Gemini API key.
            model: Gemini model name (default: gemini-2.0-flash for free tier).
        """
        self.client = genai.Client(api_key=api_key)
        self.model = model

    async def generate_ui(
        self,
        prompt: str,
        current_json: list[ComponentNode] | None = None,
    ) -> list[ComponentNode]:
        """Generate or edit UI components based on a prompt.

        Args:
            prompt: User's natural language prompt.
            current_json: Existing component tree for edit mode.

        Returns:
            List of ComponentNode objects representing the UI.

        Raises:
            ValueError: If the LLM response cannot be parsed as valid JSON.
            Exception: If the Gemini API call fails.
        """
        # Build the user message
        if current_json is not None:
            # Edit mode: include current JSON in the prompt
            current_json_str = json.dumps(
                [node.model_dump() for node in current_json],
                ensure_ascii=False,
                indent=2,
            )
            user_message = EDIT_PROMPT_TEMPLATE.format(
                current_json=current_json_str,
                user_prompt=prompt,
            )
        else:
            # Generate mode: just use the prompt
            user_message = prompt

        logger.info("Sending prompt to Gemini: %s", user_message[:200])

        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=user_message,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    temperature=0.7,
                    response_mime_type="application/json",
                ),
            )

            raw_text = response.text
            logger.info("Received response from Gemini: %s", raw_text[:500])

            # Parse the JSON response
            parsed = self._parse_json_response(raw_text)
            return parsed

        except Exception as e:
            logger.error("Gemini API call failed: %s", str(e))
            raise

    def _parse_json_response(self, raw_text: str) -> list[ComponentNode]:
        """Parse the raw LLM response text into ComponentNode objects.

        Handles cases where the response might be wrapped in markdown code blocks.

        Args:
            raw_text: Raw text response from the LLM.

        Returns:
            List of validated ComponentNode objects.

        Raises:
            ValueError: If the response cannot be parsed as valid component JSON.
        """
        text = raw_text.strip()

        # Strip markdown code blocks if present
        if text.startswith("```"):
            text = re.sub(r"^```(?:json)?\s*\n?", "", text)
            text = re.sub(r"\n?```\s*$", "", text)

        try:
            data = json.loads(text)
        except json.JSONDecodeError as e:
            raise ValueError(
                f"Failed to parse LLM response as JSON: {e}\nRaw response: {text[:500]}"
            )

        # Handle both {"components": [...]} and plain [...]
        if isinstance(data, dict) and "components" in data:
            components_data = data["components"]
        elif isinstance(data, list):
            components_data = data
        else:
            raise ValueError(
                f"Unexpected JSON structure. Expected dict with 'components' key or a list. Got: {type(data)}"
            )

        # Validate each component through Pydantic
        try:
            components = [ComponentNode.model_validate(c) for c in components_data]
        except Exception as e:
            raise ValueError(f"Component validation failed: {e}")

        return components
