"use client";

import type { ButtonProps } from "@/types/components";

export default function Button({
  text,
  variant = "primary",
  size = "medium",
}: ButtonProps) {
  return (
    <button className={`comp-button comp-button--${variant} comp-button--${size}`}>
      {text}
    </button>
  );
}
