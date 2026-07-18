"use client";

import type { HeroProps, ComponentNode } from "@/types/components";
import ComponentRenderer from "../ComponentRenderer";

interface HeroComponentProps extends HeroProps {
  children?: ComponentNode[];
}

export default function Hero({
  title,
  subtitle,
  backgroundGradient,
  align = "center",
  children,
}: HeroComponentProps) {
  return (
    <section
      className="comp-hero"
      style={{
        background: backgroundGradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        textAlign: align,
      }}
    >
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        {children && children.length > 0 && (
          <div className="hero-actions">
            <ComponentRenderer components={children} />
          </div>
        )}
      </div>
    </section>
  );
}
