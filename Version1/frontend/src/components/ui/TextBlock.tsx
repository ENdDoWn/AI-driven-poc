"use client";

import type { TextProps } from "@/types/components";

export default function TextBlock({ text, align = "left", fontSize }: TextProps) {
  return (
    <p
      className="comp-text"
      style={{
        textAlign: align,
        fontSize: fontSize || undefined,
      }}
    >
      {text}
    </p>
  );
}
