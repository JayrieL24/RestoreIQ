export const site = {
  name: "RestoreIQ",
  tagline: "Water damage repair & plumbing you can trust",
  description:
    "Emergency water damage restoration and expert plumbing for homes and commercial properties. Fast response, licensed technicians, work guaranteed.",
  url: "https://restoreiq.com",
  phone: "(805) 832-0194",
  email: "help@restoreiq.com",
  /* ⚠️ REPLACE BEFORE LAUNCH — these are stand-ins. Swap in the real
     towns and counties RestoreIQ covers, the actual dispatch hours, and a
     response time the company can genuinely commit to. Drop anything that
     cannot be substantiated: an arrival claim is a promise, not copy. */
  coverage: {
    /* Name real places. Vague labels like "Metro area" read as filler and
       lose the local-search value this block is here to earn. */
    areas: [
      "Ventura",
      "Agoura Hills",
      "Westlake Village",
      "Calabasas",
      "Camarillo",
      "Carpinteria",
      "Fillmore",
      "Malibu",
      "Moorpark",
      "Newbury Park",
      "Oak Park",
      "Oak View",
      "Ojai",
      "Oxnard",
      "Port Hueneme",
      "Santa Barbara",
      "Santa Paula",
      "Simi Valley",
      "Thousand Oaks",
    ],
    /* ⚠️ PLACEHOLDER — replace with the real towns, the crew actually
       stationed nearest each, and response times the company can commit
       to. An arrival time is a promise, not marketing copy. */
    zones: [
      {
        name: "Ventura County",
        detail: "Ventura, Oxnard, Camarillo, Moorpark and nearby communities",
        response: "Core service area",
      },
      {
        name: "Conejo & Las Virgenes",
        detail: "Thousand Oaks, Westlake Village, Agoura Hills and Calabasas",
        response: "Service available",
      },
      {
        name: "Ojai & Santa Clara River Valley",
        detail: "Ojai, Oak View, Santa Paula and Fillmore",
        response: "Service available",
      },
      {
        name: "Santa Barbara Coast",
        detail: "Carpinteria, Santa Barbara and surrounding coastal communities",
        response: "Service available",
      },
    ],
    radius: "Ventura County, Santa Barbara and the Conejo Valley",
    hours: "Answered by a person, not a machine",
    response: "On site within the hour, most calls",
  },
  /* ⚠️ PLACEHOLDER — replace with the real profile URLs before launch, and
     delete any platform RestoreIQ does not actually maintain. A footer
     icon linking to a dead or unclaimed profile is worse than no icon. */
  social: {
    facebook: "#",
    linkedin: "#",
    x: "#",
    youtube: "#",
    instagram: "#",
  },
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Our process", href: "/#process" },
    { label: "Why RestoreIQ", href: "/#why-us" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;
