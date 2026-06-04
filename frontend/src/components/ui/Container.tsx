"use client";

import type { ContainerProps, ComponentNode } from "@/types/components";
import ComponentRenderer from "../ComponentRenderer";

interface ContainerComponentProps extends ContainerProps {
  children?: ComponentNode[];
}

export default function Container({
  direction = "column",
  gap = "16px",
  padding = "24px",
  maxWidth,
  align = "start",
  wrap = false,
  backgroundColor,
  children,
}: ContainerComponentProps) {
  return (
    <div
      className="comp-container"
      style={{
        display: "flex",
        flexDirection: direction,
        gap,
        padding,
        maxWidth: maxWidth || undefined,
        alignItems: align === "start" ? "flex-start" : align === "end" ? "flex-end" : "center",
        flexWrap: wrap ? "wrap" : "nowrap",
        backgroundColor: backgroundColor || undefined,
        margin: maxWidth ? "0 auto" : undefined,
      }}
    >
      {children && children.length > 0 && (
        <ComponentRenderer components={children} />
      )}
    </div>
  );
}
