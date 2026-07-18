"""LLM service for interacting with Google Gemini API."""

import json
import logging
import re
from copy import deepcopy

from google import genai
from google.genai import types

from app.prompts.system_prompt import EDIT_PROMPT_TEMPLATE, SYSTEM_PROMPT
from app.schemas.models import ComponentNode

logger = logging.getLogger(__name__)


class LLMService:
    """Service for generating UI components using Google Gemini."""

    def __init__(self, api_key: str, model: str = "gemini-3-flash-preview"):
        """Initialize the LLM service with a Gemini API key.

        Args:
            api_key: Google Gemini API key.
            model: Gemini model name.
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
                separators=(",", ":"),
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

            # Parse the JSON response. In edit mode, prefer compact delta changes.
            if current_json is not None:
                parsed = self._parse_edit_response(raw_text, current_json)
            else:
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

    def _parse_edit_response(
        self, raw_text: str, current_json: list[ComponentNode]
    ) -> list[ComponentNode]:
        """Parse edit-mode response.

        Supports compact delta response: {"changes": [{"id": str, "props": {...}}]}.
        Falls back to full JSON parsing when response contains components.
        """
        text = raw_text.strip()

        if text.startswith("```"):
            text = re.sub(r"^```(?:json)?\s*\n?", "", text)
            text = re.sub(r"\n?```\s*$", "", text)

        try:
            data = json.loads(text)
        except json.JSONDecodeError as e:
            raise ValueError(
                f"Failed to parse edit response as JSON: {e}\nRaw response: {text[:500]}"
            )

        # Backward-compatible fallback: full component tree response
        if isinstance(data, dict) and "components" in data:
            return self._parse_json_response(text)
        if isinstance(data, list):
            return self._parse_json_response(text)

        if not isinstance(data, dict) or "changes" not in data:
            raise ValueError(
                "Unexpected edit response. Expected {'changes': [...]} or full components JSON."
            )

        changes = data["changes"]
        if not isinstance(changes, list):
            raise ValueError("'changes' must be a list.")

        current_data = [node.model_dump() for node in current_json]
        updated_data = self._apply_changes(current_data, changes)

        try:
            return [ComponentNode.model_validate(c) for c in updated_data]
        except Exception as e:
            raise ValueError(f"Component validation failed after applying changes: {e}")

    def _apply_changes(
        self, components: list[dict], changes: list[dict]
    ) -> list[dict]:
        """Apply id-based prop updates to an existing component tree."""
        result = deepcopy(components)

        index: dict[str, dict] = {}

        def walk(nodes: list[dict]) -> None:
            for node in nodes:
                node_id = node.get("id")
                if isinstance(node_id, str):
                    index[node_id] = node
                children = node.get("children")
                if isinstance(children, list):
                    walk(children)

        walk(result)

        for change in changes:
            if not isinstance(change, dict):
                continue

            component_id = change.get("id")
            if not isinstance(component_id, str):
                continue

            target = index.get(component_id)
            if target is None:
                continue

            props_update = change.get("props")
            if isinstance(props_update, dict):
                existing_props = target.get("props")
                if not isinstance(existing_props, dict):
                    existing_props = {}
                    target["props"] = existing_props
                existing_props.update(props_update)

        return result
