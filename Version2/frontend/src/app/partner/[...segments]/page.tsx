import { SitemapWireframe } from "@/components/SitemapWireframe";
import { SITEMAP_ROUTES, sampleHref } from "@/lib/sitemap";

export function generateStaticParams() {
  return SITEMAP_ROUTES.filter((item) => item.section === "partner").map((item) => ({
    segments: sampleHref(item.pattern).split("/").filter(Boolean).slice(1),
  }));
}

export default async function PartnerSitemapPage({
  params,
}: {
  params: Promise<{ segments: string[] }>;
}) {
  const { segments } = await params;
  return <SitemapWireframe path={`/partner/${segments.join("/")}`} />;
}
