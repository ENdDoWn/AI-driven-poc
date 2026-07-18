"""Approved navigation template variants."""

from typing import Final

NAV_VARIANTS: Final[frozenset[str]] = frozenset({
    "minimal", "centered", "split", "announcement", "glass", "underline", "sidebar",
})

NAV_VARIANT_REGISTRY: Final[dict[str, dict[str, str]]] = {
    "minimal": {"description": "Simple horizontal navigation", "layout": "horizontal"},
    "centered": {"description": "Centered brand and links", "layout": "centered"},
    "split": {"description": "Light navigation with CTA split", "layout": "horizontal"},
    "announcement": {"description": "Navigation with announcement bar", "layout": "horizontal"},
    "glass": {"description": "Blurred glass navigation", "layout": "horizontal"},
    "underline": {"description": "Light navigation with active underline", "layout": "horizontal"},
    "sidebar": {"description": "Vertical sidebar navigation", "layout": "vertical"},
}
