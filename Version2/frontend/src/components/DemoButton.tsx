"use client";

import type { ButtonHTMLAttributes } from "react";
import { useToast } from "@/components/Toast";

const DEFAULT_MESSAGE = "ส่วนนี้อยู่ระหว่างพัฒนา (โหมดเดโม)";

export function DemoButton({
  message = DEFAULT_MESSAGE,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { message?: string }) {
  const showToast = useToast();
  return (
    <button
      type="button"
      {...props}
      onClick={(event) => {
        onClick?.(event);
        showToast(message);
      }}
    />
  );
}
