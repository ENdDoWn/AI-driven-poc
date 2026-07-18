import Link from "next/link";
import type { ReactNode } from "react";

export type NavigationItem = {
  label: string;
  href: string;
};

export function WireframeShell({
  area,
  title,
  role,
  navigation,
  activeHref,
  sidebar,
  fullBleed = false,
  children,
}: {
  area: string;
  title: string;
  role?: string;
  navigation?: NavigationItem[];
  activeHref?: string;
  sidebar?: ReactNode;
  fullBleed?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {sidebar ?? (
          <aside className="w-full border-b-2 border-slate-300 bg-white lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r-2">
            <div className="border-b-2 border-slate-300 p-6">
              <Link href="/" className="text-lg font-bold hover:underline">
                WOP / UI
              </Link>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-500">{area}</p>
            </div>
            {navigation ? (
              <nav className="grid gap-1 p-4" aria-label={`${area} navigation`}>
                {navigation.map((item, index) => {
                  const isActive = activeHref ? item.href === activeHref : index === 0;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`border px-3 py-2 text-sm transition-colors duration-150 ${
                        isActive
                          ? "border-slate-900 bg-slate-900 font-bold text-white"
                          : "border-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            ) : null}
          </aside>
        )}

        <div className="min-w-0 flex-1">
          <WireframeHeader area={area} title={title} role={role} fullBleed={fullBleed}>
            {children}
          </WireframeHeader>
        </div>
      </div>
    </div>
  );
}

export function WireframeHeader({
  area,
  title,
  role,
  fullBleed = false,
  children,
}: {
  area: string;
  title: string;
  role?: string;
  fullBleed?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <header className="flex flex-col gap-4 border-b-2 border-slate-300 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{area}</p>
          <h1 className="mt-1 text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/my-work"
            className="border-2 border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 transition-colors duration-150 hover:border-slate-900 hover:bg-slate-50"
          >
            คุยกับ AI วางแผนวันนี้
          </Link>
          <span className="border-2 border-slate-900 px-3 py-2 text-sm font-bold">{role ?? area}</span>
        </div>
      </header>
      <main className={fullBleed ? "p-0" : "px-6 py-8 lg:px-10"}>{children}</main>
    </>
  );
}

export function WireframeMetric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="border-2 border-slate-300 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-4 text-3xl font-bold">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{detail}</p>
    </div>
  );
}

export function WireframeSection({ title, children, className = "", action }: { title: string; children: ReactNode; className?: string; action?: ReactNode }) {
  return (
    <section className={`border-2 border-slate-300 bg-white p-5 ${className}`}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <h2 className="font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
