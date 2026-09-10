export const site = {
  name: "RestoreIQ",
  tagline: "Water damage repair & plumbing you can trust",
  description:
    "Emergency water damage restoration and expert plumbing for homes and commercial properties. Fast response, licensed technicians, work guaranteed.",
  url: "https://restoreiq.com",
  phone: "(555) 010-0199",
  email: "help@restoreiq.com",
  /* ⚠️ REPLACE BEFORE LAUNCH — these are stand-ins. Swap in the real
     towns and counties RestoreIQ covers, the actual dispatch hours, and a
     response time the company can genuinely commit to. Drop anything that
     cannot be substantiated: an arrival claim is a promise, not copy. */
  coverage: {
    /* Name real places. Vague labels like "Metro area" read as filler and
       lose the local-search value this block is here to earn. */
    areas: [
      "Springfield",
      "Riverton",
      "Oak Hollow",
      "Fairview County",
      "Lakeside",
      "Weston",
    ],
    /* ⚠️ PLACEHOLDER — replace with the real towns, the crew actually
       stationed nearest each, and response times the company can commit
       to. An arrival time is a promise, not marketing copy. */
    zones: [
      {
        name: "Springfield & Riverton",
        detail: "Two crews stationed in town, closest to the depot",
        response: "Under 45 min",
      },
      {
        name: "Oak Hollow & Lakeside",
        detail: "Covered from the Springfield depot, direct route",
        response: "Under 60 min",
      },
      {
        name: "Fairview County",
        detail: "Rural addresses; we confirm the route when you call",
        response: "60–90 min",
      },
      {
        name: "Weston & surrounding",
        detail: "Edge of our radius, still same-day on every callout",
        response: "Within 90 min",
      },
    ],
    radius: "Crews stationed within 45 miles",
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
