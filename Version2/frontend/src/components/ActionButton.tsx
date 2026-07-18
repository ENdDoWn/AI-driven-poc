import Link from "next/link";
import type { ReactNode } from "react";
import { DemoButton } from "@/components/DemoButton";

export function ActionButton({
  href,
  className,
  children,
}: {
  href?: string;
  className: string;
  children: ReactNode;
}) {
  if (href) {
    return (
      <Link href={href} className={`inline-block text-center ${className}`}>
        {children}
      </Link>
    );
  }
  return <DemoButton className={className}>{children}</DemoButton>;
}
