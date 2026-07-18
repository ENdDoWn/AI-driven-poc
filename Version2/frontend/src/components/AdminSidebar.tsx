"use client";

import { cache, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION } from "@/lib/sitemap";

const getCachedAdminNavigation = cache(() => NAVIGATION.admin);

const ADMIN_GROUPS = [
  { label: "Overview", hrefs: ["/admin/dashboard", "/admin/sales-dashboard", "/admin/my-work", "/admin/sales-team"] },
  { label: "CRM", hrefs: ["/admin/inbox", "/admin/form-submissions", "/admin/deals", "/admin/companies", "/admin/contracts"] },
  { label: "Delivery", hrefs: ["/admin/onboarding", "/admin/production", "/admin/qa"] },
  { label: "Service", hrefs: ["/admin/tickets"] },
  { label: "Management", hrefs: ["/admin/packages", "/admin/reports/sales"] },
] as const;

const ICON_PATHS: Record<string, string> = {
  Dashboard: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  "Unified Inbox": "M4 5h16v11H8l-4 4V5z",
  "Form submissions": "M6 3h12v18H6zM9 7h6M9 11h6M9 15h4",
  "Deal pipeline": "M4 18V9M10 18V5M16 18v-7M22 18H2",
  Company: "M4 21V5l8-3 8 3v16M8 9h2M14 9h2M8 13h2M14 13h2M8 17h2M14 17h2",
  Contract: "M6 3h12v18H6zM9 8h6M9 12h6M9 16h4",
  Onboarding: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5",
  Production: "M14 6l4-4 4 4-4 4M4 20l8-8M12 4l8 8",
  "QA & Deployment": "M5 12l4 4L19 6",
  "Support Tickets": "M4 5h16v11H8l-4 4V5zM8 9h8",
  "Platform Settings": "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z",
  Reports: "M5 20V10M12 20V4M19 20v-7",
};

function NavIcon({ label }: { label: string }) {
  return <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS[label] ?? "M12 5v14M5 12h14"} /></svg>;
}

export function AdminSidebar() {
  const navigation = getCachedAdminNavigation();
  const pathname = usePathname();
  const activeHref = navigation.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))?.href;
  const [collapsed, setCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCollapsed(window.localStorage.getItem("wop-admin-sidebar-collapsed") === "true");
    requestAnimationFrame(() => requestAnimationFrame(() => setHydrated(true)));
  }, []);

  const toggleSidebar = () => {
    setCollapsed((value) => {
      const nextValue = !value;
      window.localStorage.setItem("wop-admin-sidebar-collapsed", String(nextValue));
      return nextValue;
    });
  };

  return (
    <aside className={`w-full overflow-x-hidden border-b-2 border-slate-300 bg-white lg:sticky lg:top-0 lg:flex lg:h-dvh lg:max-h-dvh lg:flex-col lg:border-b-0 lg:border-r-2 ${hydrated ? "transition-[width] duration-200 ease-smooth" : ""} ${collapsed ? "lg:w-20" : "lg:w-72"}`}>
      <div className={`flex shrink-0 border-b-2 border-slate-300 p-4 ${collapsed ? "flex-col items-center gap-3" : "items-center justify-between"}`}>
        <Link href="/" className={`font-bold hover:underline ${collapsed ? "text-xl" : "text-lg"}`} title="WOP / UI">{collapsed ? "W" : "WOP / UI"}</Link>
        <button type="button" onClick={toggleSidebar} className="border border-slate-300 px-2 py-1 text-sm font-bold transition-colors duration-150 hover:border-slate-900 active:scale-[0.98]" aria-label={collapsed ? "ขยาย Sidebar" : "ย่อ Sidebar"} title={collapsed ? "ขยาย Sidebar" : "ย่อ Sidebar"}>
          <span className={`inline-block transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}>←</span>
        </button>
      </div>
      {!collapsed && <p className="px-6 pt-4 text-xs font-bold uppercase tracking-wide text-slate-500">Internal Back Office</p>}
      <nav className={`grid gap-5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain ${collapsed ? "p-2" : "p-4"}`} aria-label="Internal Back Office navigation">
        {ADMIN_GROUPS.map((group) => {
          const items = navigation.filter((item) => group.hrefs.some((href) => href === item.href));
          if (items.length === 0) return null;

          return (
            <div key={group.label} className="grid gap-1">
              {!collapsed && <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{group.label}</p>}
              {items.map((item) => {
                const isActive = activeHref ? item.href === activeHref : item.href === "/admin/dashboard";

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.label}
                    aria-current={isActive ? "page" : undefined}
                    className={`border px-3 py-2 text-sm transition-colors duration-150 ${collapsed ? "flex justify-center" : ""} ${
                      isActive
                        ? "border-slate-900 bg-slate-900 font-bold text-white"
                        : "border-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-3"><NavIcon label={item.label} /><span className="whitespace-nowrap">{!collapsed && item.label}</span></span>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>
      <div className={`shrink-0 border-t border-slate-200 ${collapsed ? "p-2" : "p-4"}`}>
        <Link
          href="/login"
          className="block border-2 border-slate-300 px-3 py-2 text-center text-sm font-bold transition-colors duration-150 hover:border-slate-900 hover:bg-slate-50"
        >
          <span className="flex items-center justify-center gap-2"><NavIcon label="Logout" /><span className="whitespace-nowrap">{!collapsed && "Logout"}</span></span>
        </Link>
      </div>
    </aside>
  );
}
