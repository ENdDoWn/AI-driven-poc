import { SitemapWireframe } from "@/components/SitemapWireframe";
import { SITEMAP_ROUTES, sampleHref } from "@/lib/sitemap";

export function generateStaticParams() {
  return SITEMAP_ROUTES.filter((item) => item.section === "portal" && item.pattern !== "/portal/dashboard").map((item) => ({
    segments: sampleHref(item.pattern).split("/").filter(Boolean).slice(1),
  }));
}

export default async function PortalSitemapPage({
  params,
}: {
  params: Promise<{ segments: string[] }>;
}) {
  const { segments } = await params;
  return <SitemapWireframe path={`/portal/${segments.join("/")}`} />;
}
