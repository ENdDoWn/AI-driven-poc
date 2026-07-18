"use client";

import type { CardProps, ComponentNode } from "@/types/components";
import ComponentRenderer from "../ComponentRenderer";

interface CardComponentProps extends CardProps {
  children?: ComponentNode[];
}

export default function Card({
  title,
  description,
  imageUrl,
  children,
}: CardComponentProps) {
  return (
    <div className="comp-card">
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="card-image" src={imageUrl} alt={title} />
      )}
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        {description && <p className="card-description">{description}</p>}
        {children && children.length > 0 && (
          <div className="card-actions">
            <ComponentRenderer components={children} />
          </div>
        )}
      </div>
    </div>
  );
}
