import Link from "next/link";
import { SITEMAP_ROUTES, sampleHref } from "@/lib/sitemap";

export default function SitemapPreviewPage() {
  return (
    <main className="min-h-screen animate-page-enter bg-slate-100 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 border-b-2 border-slate-300 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" className="text-sm font-bold underline">← Back to public website</Link>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Low-wireframe UI index</p>
            <h1 className="mt-2 text-3xl font-bold">Sitemap preview</h1>
          </div>
          <span className="border-2 border-dashed border-slate-400 px-3 py-2 text-sm font-bold">{SITEMAP_ROUTES.length} routes</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {(["shared", "admin", "portal", "partner", "public"] as const).map((section) => (
            <section key={section} className="border-2 border-slate-300 bg-white p-5">
              <h2 className="font-bold uppercase tracking-wide">{section}</h2>
              <div className="mt-4 grid gap-2">
                {SITEMAP_ROUTES.filter((item) => item.section === section).map((item) => (
                  <Link key={item.pattern} href={sampleHref(item.pattern)} className="flex items-center justify-between border-b border-slate-200 py-2 text-sm transition-colors duration-150 hover:bg-slate-50">
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-slate-400">{item.pattern}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
