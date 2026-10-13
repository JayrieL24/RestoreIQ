/** Drives which optional section a service-area page shows. Coastal areas get
 *  the salt-air and storm-exposure notes; hillside areas get drainage and
 *  slope runoff; valley areas get the slab and irrigation notes. */
export type AreaTerrain = "coastal" | "hillside" | "valley";

export interface ServiceArea {
  name: string; slug: string; intro: string; localContext: string;
  propertyNotes: string[]; nearby: string[]; image: string; lat: number; lng: number;
  terrain: AreaTerrain;
  /** Sourced local facts shown on the area page. Each carries its citation so
   *  the claim can be checked — nothing here is estimated or inferred. */
  /** Authority that issues building permits for this city. Westlake Village is
   *  in LA County and contracts its building & safety service out; the other
   *  six run their own divisions. */
  permitAuthority: string;
  /** County air district governing asbestos notification before demolition. */
  airDistrict: string;
  /** Extra frames for the page gallery, drawn from the existing job photos. */
  gallery: string[];
  /** Finished-room shot for the local-record section — a result rather than
   *  work in progress. One per area so no two pages repeat. */
  resultImage: string;
  /** Crew arriving at a property, with that city's own landscape behind. */
  heroImage: string;
}

export const serviceAreas: ServiceArea[] = [
  { name: "Camarillo", slug: "camarillo", permitAuthority: "City of Camarillo Building and Safety", airDistrict: "Ventura County Air Pollution Control District", lat: 34.2230, lng: -119.0326, intro: "Emergency water-damage help for homes, businesses, and multifamily properties throughout Camarillo.", localContext: "We plan restoration around the affected materials in Camarillo homes and businesses.", propertyNotes: ["Slab and hard-surface moisture migration", "Appliance and supply-line leaks", "Commercial suite and warehouse losses"], nearby: ["Somis", "Santa Rosa Valley", "Oxnard", "Moorpark"], image: "/Real-life-images/MSP_7706.jpg", terrain: "valley", gallery: ["/Real-life-images/MSP_7706.jpg", "/Real-life-images/IMG_6585.jpg", "/Real-life-images/MSP_7604.jpg"], resultImage: "/Real-life-images/results/result-01.jpg", heroImage: "/city-service-images/realistic/camarillo.png" },
  { name: "Ventura", slug: "ventura", permitAuthority: "City of Ventura Building and Safety", airDistrict: "Ventura County Air Pollution Control District", lat: 34.2675, lng: -119.2548, intro: "Water extraction, drying, and restoration documentation across Ventura’s coastal and hillside neighborhoods.", localContext: "We plan restoration around the affected materials in Ventura homes and businesses.", propertyNotes: ["Raised-foundation and crawlspace drying", "Coastal storm and window intrusion", "Older plumbing and finish assemblies"], nearby: ["Pierpont Bay", "Midtown", "East Ventura", "Oak View"], image: "/Real-life-images/IMG_2342.jpg", terrain: "coastal", gallery: ["/Real-life-images/IMG_2342.jpg", "/Real-life-images/MSP_7577.jpg", "/Real-life-images/IMG_2347.jpg"], resultImage: "/Real-life-images/results/result-04.jpg", heroImage: "/city-service-images/realistic/ventura.png" },
  { name: "Oxnard", slug: "oxnard", permitAuthority: "City of Oxnard Building Division", airDistrict: "Ventura County Air Pollution Control District", lat: 34.2008, lng: -119.2147, intro: "24/7 restoration response for Oxnard residences, coastal properties, industrial spaces, and retail buildings.", localContext: "We plan restoration around the affected materials in Oxnard homes and businesses.", propertyNotes: ["Coastal and building-envelope water entry", "Multifamily and attached housing", "Industrial and commercial drying zones"], nearby: ["Channel Islands Harbor", "RiverPark", "Port Hueneme", "Camarillo"], image: "/Real-life-images/MSP_7577.jpg", terrain: "coastal", gallery: ["/Real-life-images/MSP_7577.jpg", "/Real-life-images/MSP_7710-Edit.jpg", "/Real-life-images/IMG_2342.jpg"], resultImage: "/Real-life-images/results/result-06.jpg", heroImage: "/city-service-images/realistic/oxnard.png" },
  { name: "Thousand Oaks", slug: "thousand-oaks", permitAuthority: "City of Thousand Oaks Building Division", airDistrict: "Ventura County Air Pollution Control District", lat: 34.1918, lng: -118.8749, intro: "Measured water-damage restoration for Thousand Oaks homes and commercial properties.", localContext: "We plan restoration around the affected materials in Thousand Oaks homes and businesses.", propertyNotes: ["Multi-level water migration", "Hardwood and engineered-floor drying", "Cabinet and wall-cavity inspection"], nearby: ["Newbury Park", "Westlake Village", "Oak Park", "Santa Rosa Valley"], image: "/Real-life-images/IMG_2347.jpg", terrain: "hillside", gallery: ["/Real-life-images/IMG_2347.jpg", "/Real-life-images/MSP_7581-Edit.jpg", "/Real-life-images/MSP_7706.jpg"], resultImage: "/Real-life-images/results/result-02.jpg", heroImage: "/city-service-images/realistic/thousand-oaks.png" },
  { name: "Simi Valley", slug: "simi-valley", permitAuthority: "City of Simi Valley Building and Safety", airDistrict: "Ventura County Air Pollution Control District", lat: 34.2662, lng: -118.7490, intro: "Emergency cleanup and structural drying for properties across Simi Valley.", localContext: "We plan restoration around the affected materials in Simi Valley homes and businesses.", propertyNotes: ["Water-heater and garage-adjacent losses", "Supply-line failures", "Slab-level moisture spread"], nearby: ["Wood Ranch", "Santa Susana", "Moorpark", "Oak Park"], image: "/Real-life-images/MSP_7604.jpg", terrain: "valley", gallery: ["/Real-life-images/MSP_7604.jpg", "/Real-life-images/IMG_2347.jpg", "/Real-life-images/MSP_7710-Edit.jpg"], resultImage: "/Real-life-images/results/result-08.jpg", heroImage: "/city-service-images/realistic/simi-valley.png" },
  { name: "Moorpark", slug: "moorpark", permitAuthority: "City of Moorpark Building and Safety", airDistrict: "Ventura County Air Pollution Control District", lat: 34.2855, lng: -118.8770, intro: "Local water extraction, drying, and reconstruction coordination throughout Moorpark.", localContext: "We plan restoration around the affected materials in Moorpark homes and businesses.", propertyNotes: ["Two-story plumbing losses", "Hillside drainage and storm entry", "Crawlspace and subfloor assessment"], nearby: ["Campus Park", "Home Acres", "Simi Valley", "Camarillo"], image: "/Real-life-images/MSP_7581-Edit.jpg", terrain: "hillside", gallery: ["/Real-life-images/MSP_7581-Edit.jpg", "/Real-life-images/IMG_6585.jpg", "/Real-life-images/IMG_2342.jpg"], resultImage: "/Real-life-images/results/result-03.jpg", heroImage: "/city-service-images/realistic/moorpark.png" },
  { name: "Westlake Village", slug: "westlake-village", permitAuthority: "LA County Building and Safety (Calabasas office)", airDistrict: "South Coast AQMD", lat: 34.1460, lng: -118.8062, intro: "Careful emergency restoration for Westlake Village homes, offices, and lakeside properties.", localContext: "We plan restoration around the affected materials in Westlake Village homes and businesses.", propertyNotes: ["Custom finish and contents protection", "Hardwood and cabinet assemblies", "Multi-level residential losses"], nearby: ["North Ranch", "Thousand Oaks", "Oak Park", "Agoura Hills"], image: "/Real-life-images/MSP_7710-Edit.jpg", terrain: "hillside", gallery: ["/Real-life-images/MSP_7710-Edit.jpg", "/Real-life-images/MSP_7706.jpg", "/Real-life-images/IMG_6585.jpg"], resultImage: "/Real-life-images/results/result-07.jpg", heroImage: "/city-service-images/realistic/westlake-village.png" },
];

export function getServiceArea(slug: string) { return serviceAreas.find((area) => area.slug === slug) }


/** Documentation and insurance-coordination steps. Deliberately describes what
 *  gets recorded and handed over — never what a carrier will pay, which is the
 *  policyholder's and adjuster's decision. */
export const claimSteps = [
  {
    icon: 'camera',
    title: 'Initial assessment',
    body: 'Record the property’s condition before work begins.',
  },
  {
    icon: 'gauge',
    title: 'Progress tracking',
    body: 'Record moisture readings throughout drying.',
  },
  {
    icon: 'folder',
    title: 'Project documentation',
    body: 'Keep photos, readings, and work notes together.',
  },
  {
    icon: 'lock',
    title: 'Your records',
    body: 'Keep a copy of your project documentation.',
  },
] as const;

/** Stages a documented job passes through. Pairs with the three gallery photos
 *  so the section reads as a sequence rather than a photo grid. */
export const jobStages = [
  {
    stage: 'Day 1',
    window: 'Within hours of the call',
    label: 'Arrival and assessment',
    caption: 'Moisture mapped and the affected area photographed before any equipment is placed.',
    records: ['Photo set', 'Moisture map', 'Affected-area notes'],
    reading: { label: 'Typical starting reading', value: '99.9%', note: 'Saturated carpet and pad' },
  },
  {
    stage: 'Day 1 to 2',
    window: 'Same visit, once mapped',
    label: 'Extraction and setup',
    caption: 'Standing water removed, then air movers and dehumidifiers positioned to the drying plan.',
    records: ['Extraction log', 'Equipment placement', 'Scope notes'],
    reading: { label: 'Equipment set', value: 'LGR + air movers', note: 'Sized to the affected area' },
  },
  {
    stage: 'Day 3+',
    window: 'Daily until target',
    label: 'Monitoring to dry',
    caption: 'Readings taken each visit until the structure meets target, then equipment comes out.',
    records: ['Daily readings', 'Atmospheric log', 'Completion record'],
    reading: { label: 'Dry standard', value: 'At target', note: 'Verified before removal' },
  },
] as const;

/** Location-specific FAQ. Built from each area's own data — terrain, nearby
 *  communities and property notes — so no two pages ask the same questions.
 *  Answers stay within what the site can stand behind: no arrival-time
 *  promises, no claim outcomes. */
export function getAreaFaqs(area: ServiceArea) {
  const terrainAnswer = {
    coastal:
      `Coastal properties sit in higher ambient humidity, so a drying target that works inland can stall here. Readings are taken against outdoor conditions, and wind-driven entry at windows, doors and roof edges is traced before equipment goes in.`,
    hillside:
      `On sloped lots water follows the grade, so the room where damage appears is often not where it entered. The path is traced uphill from the visible damage, and lower levels, garages and subfloors are checked before the scope is set.`,
    valley:
      `Most ${area.name} losses involve slab-on-grade construction, where water spreads sideways under flooring rather than draining away. Moisture is mapped across the slab and into base plates and toe-kicks, not just the room where it was first noticed.`,
  }[area.terrain];

  return [
    {
      q: `How soon can a crew reach ${area.name}?`,
      a: `RestoreIQ runs a 24/7 line for ${area.name} and the surrounding county. Call with the property address and you will get current availability and realistic arrival guidance rather than a fixed promise. Traffic, time of day and how many jobs are active all affect it.`,
    },
    {
      q: `What makes water damage in ${area.name} different?`,
      a: terrainAnswer,
    },
    {
      q: `Is my address inside the ${area.name} service area?`,
      a: `Most likely. Call with the cross streets and you will get a straight answer. If a property sits outside the usual radius we say so rather than quote an arrival time we cannot meet.`,
    },
    {
      q: `Will my insurance cover a ${area.name} water loss?`,
      a: `Coverage and payment remain subject to your policy and the carrier's decisions, so that is not something a restoration company can promise. What RestoreIQ can do is document the loss properly with photographs, moisture readings and scope notes recorded as the work happens, so your carrier is reviewing evidence rather than estimates.`,
    },
    {
      q: `What should I do before the crew arrives in ${area.name}?`,
      a: `If it is safe, stop the water at its source and keep people and pets away from the affected area. Do not use ceiling fixtures or outlets in wet rooms. Photograph what you can, and move small valuables clear if that is possible without risk.`,
    },
    {
      q: `What kind of ${area.name} properties do you work on?`,
      a: `${area.propertyNotes.join(". ")}. Residential, multifamily and commercial properties are all handled by the same documented process.`,
    },
  ];
}

/**
 * What a restoration job has to satisfy before and during the work, for a
 * given city. The substance is state and federal law, so it is the same
 * everywhere; only the permit authority and air district change by city.
 *
 * These describe requirements that apply to the work — they are deliberately
 * not claims about RestoreIQ holding any particular licence or certification.
 * Figures verified October 2026; the licence threshold rose from $500 to
 * $1,000 on 1 January 2025 under AB 2622.
 */
export function getComplianceItems(area: ServiceArea) {
  return [
    {
      label: "Contractor licensing",
      value: `Repairs over $1,000 require a CSLB-licensed contractor. Ask for the licence number.`,
      source: "CSLB · Bus. & Prof. Code §7028",
    },
    {
      label: "Building permits",
      value: `Structural, electrical and plumbing repairs are permitted through ${area.permitAuthority}. Drying alone is not.`,
      source: area.permitAuthority,
    },
    {
      label: "Older properties",
      value: `Pre-1978 paint needs an EPA Lead-Safe firm. Asbestos demolition requires notice to ${area.airDistrict}.`,
      source: `EPA RRP Rule · ${area.airDistrict}`,
    },
  ];
}
