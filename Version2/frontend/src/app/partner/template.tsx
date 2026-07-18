import type { ReactNode } from "react";

export default function PartnerTemplate({ children }: { children: ReactNode }) {
  return <div className="animate-page-enter">{children}</div>;
}
