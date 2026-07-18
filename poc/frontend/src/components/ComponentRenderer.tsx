"use client";

/**
 * ComponentRenderer — the heart of the POC.
 * Recursively maps JSON component nodes to actual React components.
 */

import type { ComponentNode } from "@/types/components";

import Navbar from "./ui/Navbar";
import Hero from "./ui/Hero";
import Heading from "./ui/Heading";
import TextBlock from "./ui/TextBlock";
import Button from "./ui/Button";
import ImageBlock from "./ui/ImageBlock";
import Card from "./ui/Card";
import Container from "./ui/Container";
import FormBlock from "./ui/FormBlock";
import Footer from "./ui/Footer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = React.ComponentType<any>;

/**
 * Registry mapping component type strings to React components.
 * Uses `any` cast intentionally — runtime props from AI JSON are validated
 * by the backend Pydantic models before reaching this renderer.
 */
const COMPONENT_MAP: Record<string, AnyComponent> = {
  navbar: Navbar,
  hero: Hero,
  heading: Heading,
  text: TextBlock,
  button: Button,
  image: ImageBlock,
  card: Card,
  container: Container,
  form: FormBlock,
  footer: Footer,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const items = value.filter((item): item is string => typeof item === "string");
  return items.length > 0 ? items : undefined;
}

function getSurfaceStyle(props: Record<string, unknown>): React.CSSProperties {
  const style: React.CSSProperties = {};

  const customStyle = isRecord(props.style)
    ? (props.style as React.CSSProperties)
    : undefined;

  const background = asString(props.backgroundColor) ?? asString(props.background);
  const backgroundGradient = asString(props.backgroundGradient);
  const color = asString(props.color);
  const padding = asString(props.padding);
  const maxWidth = asString(props.maxWidth);
  const borderRadius = asString(props.borderRadius) ?? asString(props.radius);
  const border = asString(props.border);
  const boxShadow = asString(props.shadow);

  if (backgroundGradient) {
    style.background = backgroundGradient;
  } else if (background) {
    style.background = background;
  }

  if (color) style.color = color;
  if (padding) style.padding = padding;
  if (maxWidth) style.maxWidth = maxWidth;
  if (borderRadius) style.borderRadius = borderRadius;
  if (border) style.border = border;
  if (boxShadow) style.boxShadow = boxShadow;

  return {
    ...style,
    ...customStyle,
  };
}

function getChildrenLayoutStyle(props: Record<string, unknown>): React.CSSProperties {
  const columns = asNumber(props.columns);
  const gap = asString(props.gap);

  if (!columns || columns < 2) {
    return gap ? { gap } : {};
  }

  return {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap: gap ?? "16px",
  };
}

function isGridLike(type: string): boolean {
  return /grid|gallery|features|cards|list/i.test(type);
}

function asRecordArray(value: unknown): Record<string, unknown>[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const records = value.filter(isRecord);
  return records.length > 0 ? records : undefined;
}

function renderNode(node: ComponentNode): React.ReactNode {
  const Component = COMPONENT_MAP[node.type];

  if (Component) {
    const componentProps = {
      ...node.props,
      children: node.children,
    };

    return (
      <Component
        key={node.id}
        {...componentProps}
      />
    );
  }

  const props = isRecord(node.props) ? node.props : {};
  const eyebrow = asString(props.eyebrow) ?? asString(props.label);
  const title = asString(props.title);
  const subtitle = asString(props.subtitle);
  const text =
    asString(props.text) ??
    asString(props.description) ??
    asString(props.content);
  const bullets = asStringArray(props.bullets) ?? asStringArray(props.highlights);
  const imageSrc = asString(props.src) ?? asString(props.imageUrl);
  const imageAlt = asString(props.alt) ?? title ?? node.type;
  const ctaText = asString(props.ctaText) ?? asString(props.buttonText);
  const ctaHref = asString(props.ctaHref) ?? "#";
  const items = asRecordArray(props.items);
  const sectionStyle = getSurfaceStyle(props);
  const childrenStyle = getChildrenLayoutStyle(props);
  const genericClass = isGridLike(node.type)
    ? "comp-generic comp-generic--grid"
    : "comp-generic";

  return (
    <section
      key={node.id}
      className={genericClass}
      style={sectionStyle}
    >
      {eyebrow ? <p className="generic-eyebrow">{eyebrow}</p> : null}
      {title ? <h3 className="generic-title">{title}</h3> : null}
      {subtitle ? <p className="generic-subtitle">{subtitle}</p> : null}
      {text ? <p className="generic-text">{text}</p> : null}
      {bullets?.length ? (
        <ul className="generic-bullets">
          {bullets.map((item) => (
            <li key={`${node.id}-${item}`}>{item}</li>
          ))}
        </ul>
      ) : null}
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="generic-image"
          src={imageSrc}
          alt={imageAlt}
        />
      ) : null}
      {ctaText ? (
        <div className="generic-actions">
          <a
            href={ctaHref}
            className="generic-cta"
          >
            {ctaText}
          </a>
        </div>
      ) : null}
      {items?.length ? (
        <div className="generic-items">
          {items.map((item, idx) => {
            const itemTitle = asString(item.title) ?? asString(item.name);
            const itemText = asString(item.text) ?? asString(item.description);

            return (
              <article
                key={`${node.id}-item-${idx}`}
                className="generic-item"
              >
                {itemTitle ? <h4>{itemTitle}</h4> : null}
                {itemText ? <p>{itemText}</p> : null}
              </article>
            );
          })}
        </div>
      ) : null}
      {node.children?.length ? (
        <div
          className="generic-children"
          style={childrenStyle}
        >
          {node.children.map(renderNode)}
        </div>
      ) : null}
    </section>
  );
}

interface ComponentRendererProps {
  components: ComponentNode[];
}

export default function ComponentRenderer({
  components,
}: ComponentRendererProps) {
  if (!components || components.length === 0) {
    return null;
  }

  return (
    <>
      {components.map(renderNode)}
    </>
  );
}
