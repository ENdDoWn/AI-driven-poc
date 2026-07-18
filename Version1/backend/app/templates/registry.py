"""Registry of page/section templates built from reusable components."""

from typing import Final

from app.templates.nav import NAV_VARIANTS

TEMPLATE_REGISTRY: Final[dict[str, dict[str, object]]] = {
    "company_profile": {
        "description": "Standard SME company profile page",
        "sections": ["navbar", "hero", "services", "contact", "footer"],
    },
    "landing_page": {
        "description": "Conversion-focused single page",
        "sections": ["navbar", "hero", "features", "cta", "footer"],
    },
}

SECTION_TEMPLATES: Final[dict[str, dict[str, object]]] = {
    "hero": {"components": ["hero", "heading", "text", "button"]},
    "services": {"components": ["container", "heading", "card"]},
    "features": {"components": ["container", "heading", "card", "image"]},
    "contact": {"components": ["container", "heading", "text", "form"]},
    "cta": {"components": ["container", "heading", "text", "button"]},
}

TEMPLATE_REGISTRY["nav"] = {
    "description": "Navigation template with selectable visual variants",
    "variants": sorted(NAV_VARIANTS),
}
