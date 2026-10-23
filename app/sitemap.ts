import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_CONFIG.domain,
      lastModified: new Date(SITE_CONFIG.releaseDateIso),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
