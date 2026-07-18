import type { ReactNode } from "react";

export default function AdminTemplate({ children }: { children: ReactNode }) {
  return <div className="animate-page-enter h-full min-h-0">{children}</div>;
}
