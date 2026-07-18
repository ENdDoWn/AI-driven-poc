import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen flex-col lg:h-dvh lg:overflow-hidden lg:flex-row">
        <AdminSidebar />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto bg-white">{children}</div>
      </div>
    </div>
  );
}
