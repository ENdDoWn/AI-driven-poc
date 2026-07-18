"""Deterministic composition fallback used when no LLM key is configured."""

from app.schemas.models import ComponentNode
from app.services.validator import validate_component_tree


def compose_demo_page(prompt: str) -> list[ComponentNode]:
    """Create a valid starter page so the end-to-end flow works locally."""
    page = [
        ComponentNode(id="header-section", type="navbar", props={"brand": "บริษัทของเรา", "links": [{"text": "บริการ", "href": "#services"}, {"text": "ติดต่อ", "href": "#contact"}]}),
        ComponentNode(id="hero-section", type="hero", props={"title": "เติบโตไปด้วยกันอย่างมั่นใจ", "subtitle": prompt, "align": "center"}, children=[
            ComponentNode(id="hero-cta", type="button", props={"text": "เริ่มต้นพูดคุย", "variant": "primary", "href": "#contact"}),
        ]),
        ComponentNode(id="services-section", type="container", props={"title": "บริการของเรา", "columns": 3}, children=[
            ComponentNode(id="service-1", type="card", props={"title": "วางกลยุทธ์", "description": "เปลี่ยนเป้าหมายธุรกิจให้เป็นแผนที่ลงมือทำได้"}),
            ComponentNode(id="service-2", type="card", props={"title": "สร้างสรรค์", "description": "ออกแบบประสบการณ์ที่น่าเชื่อถือและจดจำง่าย"}),
            ComponentNode(id="service-3", type="card", props={"title": "เติบโต", "description": "ติดตามผลและปรับปรุงอย่างต่อเนื่อง"}),
        ]),
        ComponentNode(id="contact-section", type="form", props={"fields": [{"label": "อีเมล", "type": "email", "placeholder": "you@example.com"}], "submitText": "ส่งข้อความ"}),
        ComponentNode(id="footer-section", type="footer", props={"text": "© 2026 บริษัทของเรา"}),
    ]
    return validate_component_tree(page)
