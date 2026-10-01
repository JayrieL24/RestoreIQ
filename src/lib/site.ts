import { serviceAreas } from "@/lib/service-areas";

export const site = {
  name: "RestoreIQ",
  tagline: "24/7 emergency restoration in Ventura County",
  description:
    "24/7 water, fire and smoke damage restoration for homes and commercial properties across Ventura County.",
  url: "https://restoreiq.com",
  phone: "(805) 832-0194",
  email: "help@restoreiq.com",
  cta: {
    call: "Call 24/7",
    request: "Request Service",
  },
  coverage: {
    /* Derived from service-areas.ts so the map pins, the nav, the footer and
       the LocalBusiness areaServed data can never drift apart. Add or remove a
       city there and it flows through everywhere. */
    areas: serviceAreas.map((area) => area.name),
    radius: "Ventura County and nearby communities",
    hours: "24/7 emergency line",
    response: "Call for current arrival guidance",
  },
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Our process", href: "/#process" },
    { label: "Why RestoreIQ", href: "/#why-us" },
    { label: "Service areas", href: "/#coverage" },
  ],
} as const;
