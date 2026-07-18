import { SitemapWireframe } from "@/components/SitemapWireframe";
import { SITEMAP_ROUTES, sampleHref } from "@/lib/sitemap";

export function generateStaticParams() {
  return SITEMAP_ROUTES.filter((item) => item.section === "public" && item.pattern !== "/").map((item) => ({
    segments: sampleHref(item.pattern).split("/").filter(Boolean),
  }));
}

export default async function PublicSitemapPage({
  params,
}: {
  params: Promise<{ segments: string[] }>;
}) {
  const { segments } = await params;
  return <SitemapWireframe path={`/${segments.join("/")}`} />;
}
