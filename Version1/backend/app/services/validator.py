"""Strict validation and safe fallback rules for generated pages."""

from app.schemas.models import ComponentNode
from app.components.registry import APPROVED_COMPONENT_TYPES, COMPONENT_REGISTRY
from app.templates.nav import NAV_VARIANTS


def validate_component_tree(components: list[ComponentNode]) -> list[ComponentNode]:
    """Normalize safe defaults, then validate the generated component tree."""
    ids: set[str] = set()

    def walk(nodes: list[ComponentNode]) -> None:
        for node in nodes:
            if node.type not in APPROVED_COMPONENT_TYPES:
                raise ValueError(f"Component type is not approved: {node.type}")
            if node.id in ids:
                raise ValueError(f"Duplicate component id: {node.id}")
            ids.add(node.id)

            # Keep the renderer contract stable when the model omits a required
            # prop. These are conservative presentation defaults, not content
            # generation; the client can still edit them later.
            defaults: dict[str, object] = {
                "navbar": {"brand": "บริษัทของเรา", "links": []},
                "hero": {"title": "ยินดีต้อนรับ"},
                "heading": {"text": "รายละเอียดบริการ"},
                "text": {"text": "เราพร้อมช่วยให้ธุรกิจของคุณเติบโต"},
                "button": {"text": "ติดต่อเรา"},
                "image": {"src": "https://placehold.co/1200x700", "alt": "ภาพประกอบ"},
                "card": {
                    "title": node.props.get("name")
                    or node.props.get("description")
                    or "บริการของเรา"
                },
                "form": {"fields": []},
                "footer": {"text": "© 2026 บริษัทของเรา"},
            }
            for key, value in defaults.get(node.type, {}).items():
                node.props.setdefault(key, value)
            if node.type == "navbar" and node.props.get("variant") not in NAV_VARIANTS:
                node.props["variant"] = "minimal"

            spec = COMPONENT_REGISTRY[node.type]
            missing = [key for key in spec["required_props"] if key not in node.props]
            if missing:
                raise ValueError(f"{node.id} is missing required props: {', '.join(missing)}")
            if not spec["children"] and node.children:
                raise ValueError(f"Template does not accept children: {node.type}")
            walk(node.children)

    walk(components)
    return components
