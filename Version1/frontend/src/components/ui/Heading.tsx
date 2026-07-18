"use client";

import React from "react";
import type { HeadingProps } from "@/types/components";

const HEADING_TAGS: Record<number, keyof React.JSX.IntrinsicElements> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

export default function Heading({ text, level = 1, align = "left" }: HeadingProps) {
  const tag = HEADING_TAGS[level] ?? "h2";
  return React.createElement(
    tag,
    { className: `comp-heading comp-heading-${level}`, style: { textAlign: align } },
    text
  );
}
