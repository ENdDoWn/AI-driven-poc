"""Registry of reusable UI components.

Templates compose these components; the AI is never allowed to invent a new
component type at runtime.
"""

from typing import Final

APPROVED_COMPONENT_TYPES: Final[frozenset[str]] = frozenset({
    "container", "text", "button", "heading", "hero", "navbar",
    "image", "card", "form", "footer",
})

COMPONENT_REGISTRY: Final[dict[str, dict[str, object]]] = {
    "navbar": {
        "required_props": ["brand", "links"],
        "children": False,
        "template": "nav",
    },
    "hero": {"required_props": ["title"], "children": True},
    "heading": {"required_props": ["text"], "children": False},
    "text": {"required_props": ["text"], "children": False},
    "button": {"required_props": ["text"], "children": False},
    "image": {"required_props": ["src", "alt"], "children": False},
    "card": {"required_props": ["title"], "children": True},
    "container": {"required_props": [], "children": True},
    "form": {"required_props": ["fields"], "children": False},
    "footer": {"required_props": ["text"], "children": True},
}
