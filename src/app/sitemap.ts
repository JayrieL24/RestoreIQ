import type { MetadataRoute } from "next";

import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { serviceAreas } from "@/lib/service-areas";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...services.map((service) => ({ url: `${site.url}/services/${service.id}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...serviceAreas.map((area) => ({ url: `${site.url}/service-areas/${area.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75 })),
  ];
}
