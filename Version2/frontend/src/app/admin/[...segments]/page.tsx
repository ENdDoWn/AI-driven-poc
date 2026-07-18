import { SitemapWireframe } from "@/components/SitemapWireframe";
import { SITEMAP_ROUTES, sampleHref } from "@/lib/sitemap";

export function generateStaticParams() {
  return SITEMAP_ROUTES.filter((item) => item.section === "admin" && item.pattern !== "/admin/dashboard").map((item) => ({
    segments: sampleHref(item.pattern).split("/").filter(Boolean).slice(1),
  }));
}

export default async function AdminSitemapPage({
  params,
}: {
  params: Promise<{ segments: string[] }>;
}) {
  const { segments } = await params;
  return <SitemapWireframe path={`/admin/${segments.join("/")}`} />;
}
