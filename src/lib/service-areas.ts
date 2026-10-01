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
  localFacts?: { label: string; value: string; source: string; sourceUrl: string }[];
  /** Extra frames for the page gallery, drawn from the existing job photos. */
  gallery: string[];
}

export const serviceAreas: ServiceArea[] = [
  { name: "Camarillo", slug: "camarillo", lat: 34.2230, lng: -119.0326, intro: "Emergency water-damage help for homes, businesses, and multifamily properties throughout Camarillo.", localContext: "From Mission Oaks and Village at the Park to the neighborhoods around Old Town, Camarillo properties include slab-on-grade homes, two-story developments, commercial suites, and agricultural buildings. A useful restoration scope accounts for the assembly that is wet—not just the room where water first appeared.", propertyNotes: ["Slab and hard-surface moisture migration", "Appliance and supply-line leaks", "Commercial suite and warehouse losses"], nearby: ["Somis", "Santa Rosa Valley", "Oxnard", "Moorpark"], image: "/Real-life-images/MSP_7706.jpg", terrain: "valley", gallery: ["/Real-life-images/MSP_7706.jpg", "/Real-life-images/IMG_6585.jpg", "/Real-life-images/MSP_7604.jpg"], localFacts: [{label: "Watershed",value: "Calleguas Creek — 343 sq mi draining Simi Valley, Moorpark, Camarillo and much of Thousand Oaks",source: "Ventura County Public Works",sourceUrl: "https://publicworks.venturacounty.gov/wp-content/uploads/2021/01/CC_Hydrology_Present_VCWPD.pdf"},{label: "Flood history",value: "1969 county flood destroyed five bridges; 1983 brought record peak discharges",source: "Ventura County Watershed Protection District",sourceUrl: "https://www.vcfloodinfo.com/programs/flooding-and-flood-risk/vc-flood-history"},{label: "Urbanisation effect",value: "Channelization concentrates storm flows faster and at greater volume than pre-development",source: "Ventura County Public Works",sourceUrl: "https://publicworks.venturacounty.gov/wp-content/uploads/2021/01/CC_Hydrology_Present_VCWPD.pdf"}] },
  { name: "Ventura", slug: "ventura", lat: 34.2675, lng: -119.2548, intro: "Water extraction, drying, and restoration documentation across Ventura’s coastal and hillside neighborhoods.", localContext: "Ventura’s mix of older bungalows, hillside homes, beach-area properties, and newer construction creates very different water pathways. Crawlspaces, raised foundations, plaster finishes, and wind-driven rain each call for a different inspection approach.", propertyNotes: ["Raised-foundation and crawlspace drying", "Coastal storm and window intrusion", "Older plumbing and finish assemblies"], nearby: ["Pierpont Bay", "Midtown", "East Ventura", "Oak View"], image: "/Real-life-images/IMG_2342.jpg", terrain: "coastal", gallery: ["/Real-life-images/IMG_2342.jpg", "/Real-life-images/MSP_7577.jpg", "/Real-life-images/IMG_2347.jpg"], localFacts: [{label: "Recorded county flood years since 1862",value: "1862, 1867, 1884, 1911, 1914, 1938, 1941, 1943, 1944, 1969, 1978, 1980, 1983, 1992, 1995, 1998, 2005",source: "Ventura County Watershed Protection District",sourceUrl: "https://www.vcfloodinfo.com/programs/flooding-and-flood-risk/vc-flood-history"},{label: "Worst recorded flood",value: "1969 — 13 lives lost, $60M in damage across the Santa Clara and Ventura watersheds",source: "Ventura County Watershed Protection District",sourceUrl: "https://www.vcfloodinfo.com/programs/flooding-and-flood-risk/vc-flood-history"},{label: "Watersheds",value: "Ventura River and Santa Clara River",source: "Ventura County Watershed Protection District",sourceUrl: "https://www.vcfloodinfo.com/programs/flooding-and-flood-risk/vc-flood-history"}] },
  { name: "Oxnard", slug: "oxnard", lat: 34.2008, lng: -119.2147, intro: "24/7 restoration response for Oxnard residences, coastal properties, industrial spaces, and retail buildings.", localContext: "Oxnard losses range from appliance leaks in dense residential neighborhoods to roof or plumbing failures in large commercial footprints. Coastal exposure can complicate building-envelope leaks, while large open spaces require deliberate equipment zoning and monitoring.", propertyNotes: ["Coastal and building-envelope water entry", "Multifamily and attached housing", "Industrial and commercial drying zones"], nearby: ["Channel Islands Harbor", "RiverPark", "Port Hueneme", "Camarillo"], image: "/Real-life-images/MSP_7577.jpg", terrain: "coastal", gallery: ["/Real-life-images/MSP_7577.jpg", "/Real-life-images/MSP_7710-Edit.jpg", "/Real-life-images/IMG_2342.jpg"], localFacts: [{label: "Buildings at flood risk",value: "About 40% of buildings, averaging a 28% chance of a 1.2ft flood over 30 years",source: "ClimateCheck",sourceUrl: "https://climatecheck.com/california/oxnard"},{label: "Median year built",value: "1979",source: "U.S. Census Bureau QuickFacts",sourceUrl: "https://www.census.gov/quickfacts/fact/table/oxnardcitycalifornia/PST120224"},{label: "Housing stock 1940-1969",value: "34.1% of homes",source: "U.S. Census Bureau QuickFacts",sourceUrl: "https://www.census.gov/quickfacts/fact/table/oxnardcitycalifornia/PST120224"}] },
  { name: "Thousand Oaks", slug: "thousand-oaks", lat: 34.1918, lng: -118.8749, intro: "Measured water-damage restoration for Thousand Oaks homes and commercial properties.", localContext: "Thousand Oaks includes hillside properties, planned neighborhoods, custom homes, and busy commercial corridors. Water may move between levels, along engineered flooring, or into concealed wall and cabinet assemblies before a leak is discovered.", propertyNotes: ["Multi-level water migration", "Hardwood and engineered-floor drying", "Cabinet and wall-cavity inspection"], nearby: ["Newbury Park", "Westlake Village", "Oak Park", "Santa Rosa Valley"], image: "/Real-life-images/IMG_2347.jpg", terrain: "hillside", gallery: ["/Real-life-images/IMG_2347.jpg", "/Real-life-images/MSP_7581-Edit.jpg", "/Real-life-images/MSP_7706.jpg"], localFacts: [{label: "Median year built",value: "1978",source: "U.S. Census Bureau QuickFacts",sourceUrl: "https://www.census.gov/quickfacts/fact/table/thousandoakscitycalifornia/PST045224"},{label: "Pre-1970 housing",value: "24.7% of homes",source: "U.S. Census Bureau QuickFacts",sourceUrl: "https://www.census.gov/quickfacts/fact/table/thousandoakscitycalifornia/PST045224"},{label: "Watershed",value: "Largely within the Calleguas Creek watershed",source: "Ventura County Public Works",sourceUrl: "https://publicworks.venturacounty.gov/wp-content/uploads/2021/01/CC_Hydrology_Present_VCWPD.pdf"}] },
  { name: "Simi Valley", slug: "simi-valley", lat: 34.2662, lng: -118.7490, intro: "Emergency cleanup and structural drying for properties across Simi Valley.", localContext: "Simi Valley homes commonly combine slab foundations, attached garages, tile or wood finishes, and long plumbing runs. When a supply line or water heater fails, checking adjoining rooms and shared walls helps keep the scope tied to actual moisture migration.", propertyNotes: ["Water-heater and garage-adjacent losses", "Supply-line failures", "Slab-level moisture spread"], nearby: ["Wood Ranch", "Santa Susana", "Moorpark", "Oak Park"], image: "/Real-life-images/MSP_7604.jpg", terrain: "valley", gallery: ["/Real-life-images/MSP_7604.jpg", "/Real-life-images/IMG_2347.jpg", "/Real-life-images/MSP_7710-Edit.jpg"], localFacts: [{label: "Properties at flood risk",value: "7,639 properties — 18.9% of the city — over the next 30 years",source: "First Street Foundation",sourceUrl: "https://firststreet.org/city/simi-valley-ca/672016_fsid/flood"},{label: "Average flood depth risk",value: "About a 39% chance of a 2.4ft flood over 30 years",source: "First Street Foundation",sourceUrl: "https://firststreet.org/city/simi-valley-ca/672016_fsid/flood"},{label: "Post-fire debris flow",value: "Burn scars on surrounding hills raise mudflow and erosion risk; barriers are placed before each rainy season",source: "FEMA",sourceUrl: "https://www.fema.gov/case-study/simi-valley-resisting-wildfires-and-floods"},{label: "Median year built",value: "1980",source: "U.S. Census Bureau QuickFacts",sourceUrl: "https://www.census.gov/quickfacts/fact/table/simivalleycitycalifornia/PST045224"}] },
  { name: "Moorpark", slug: "moorpark", lat: 34.2855, lng: -118.8770, intro: "Local water extraction, drying, and reconstruction coordination throughout Moorpark.", localContext: "Moorpark’s single-family neighborhoods, hillside developments, and agricultural edges can present losses involving multiple floor levels, exterior drainage, or hard-to-access spaces. Early moisture mapping helps distinguish the visible loss from its full footprint.", propertyNotes: ["Two-story plumbing losses", "Hillside drainage and storm entry", "Crawlspace and subfloor assessment"], nearby: ["Campus Park", "Home Acres", "Simi Valley", "Camarillo"], image: "/Real-life-images/MSP_7581-Edit.jpg", terrain: "hillside", gallery: ["/Real-life-images/MSP_7581-Edit.jpg", "/Real-life-images/IMG_6585.jpg", "/Real-life-images/IMG_2342.jpg"], localFacts: [{label: "Recorded flooding",value: "Homes flooded in 2005; Highways 101, 126, 33 and 150 closed for over a week",source: "Ventura County Watershed Protection District",sourceUrl: "https://www.vcfloodinfo.com/programs/flooding-and-flood-risk/vc-flood-history"},{label: "Housing stock",value: "89.4% built after 1970 — the newest stock of the inland cities",source: "U.S. Census Bureau QuickFacts",sourceUrl: "https://www.census.gov/quickfacts/fact/table/simivalleycitycalifornia/PST045224"},{label: "Watershed",value: "Calleguas Creek",source: "Ventura County Public Works",sourceUrl: "https://publicworks.venturacounty.gov/wp-content/uploads/2021/01/CC_Hydrology_Present_VCWPD.pdf"}] },
  { name: "Westlake Village", slug: "westlake-village", lat: 34.1460, lng: -118.8062, intro: "Careful emergency restoration for Westlake Village homes, offices, and lakeside properties.", localContext: "Custom finishes, wood flooring, built-in cabinetry, and multi-level layouts make precise documentation especially important in Westlake Village. The restoration plan should identify what can be dried in place and where access or removal is genuinely needed.", propertyNotes: ["Custom finish and contents protection", "Hardwood and cabinet assemblies", "Multi-level residential losses"], nearby: ["North Ranch", "Thousand Oaks", "Oak Park", "Agoura Hills"], image: "/Real-life-images/MSP_7710-Edit.jpg", terrain: "hillside", gallery: ["/Real-life-images/MSP_7710-Edit.jpg", "/Real-life-images/MSP_7706.jpg", "/Real-life-images/IMG_6585.jpg"], localFacts: [{label: "Regional flood events",value: "Included in NWS flash-flood warnings issued for the Thousand Oaks and Simi Valley area",source: "NWS Los Angeles",sourceUrl: "https://forecast.weather.gov/showsigwx.php?warnzone=CAZ376&warncounty=CAC111&firewxzone=CAZ376&local_place1=5+Miles+NNW+Ojai+CA&product1=Flood+Advisory"},{label: "Terrain",value: "Hillside and lakeside parcels where runoff concentrates downslope",source: "Ventura County Public Works",sourceUrl: "https://publicworks.venturacounty.gov/wp-content/uploads/2021/01/CC_Hydrology_Present_VCWPD.pdf"},{label: "Post-fire risk",value: "Denuded hillsides after wildfire raise mudflow risk through the wet season",source: "FEMA",sourceUrl: "https://www.fema.gov/case-study/simi-valley-resisting-wildfires-and-floods"}] },
];

export function getServiceArea(slug: string) { return serviceAreas.find((area) => area.slug === slug) }


/** Documentation and insurance-coordination steps. Deliberately describes what
 *  gets recorded and handed over — never what a carrier will pay, which is the
 *  policyholder's and adjuster's decision. */
export const claimSteps = [
  {
    icon: 'camera',
    title: 'Documented from the first visit',
    body: 'Photographs, moisture readings, and affected-area notes are captured before equipment goes in, so there is a record of the starting condition.',
    detail: 'Captured on arrival',
  },
  {
    icon: 'gauge',
    title: 'Readings logged through drying',
    body: 'Daily moisture and atmospheric readings are recorded against the drying plan, showing how the structure responded rather than how long equipment ran.',
    detail: 'Logged every visit',
  },
  {
    icon: 'folder',
    title: 'Organised for your adjuster',
    body: 'Photos, readings, and scope notes are compiled in the format adjusters expect, so your carrier receives a complete file without chasing it.',
    detail: 'Carrier-ready format',
  },
  {
    icon: 'lock',
    title: 'You keep the record',
    body: 'The documentation is yours. It stays available whether the claim is paid in full, settled in part, or you decide to handle the work privately.',
    detail: 'Yours to keep',
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
    stage: 'Day 1–2',
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
  const nearby = area.nearby.slice(0, 3).join(", ");
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
      a: `RestoreIQ runs a 24/7 line for ${area.name} and the surrounding county. Call with the property address and you will get current availability and realistic arrival guidance rather than a fixed promise — traffic, time of day and how many jobs are active all affect it.`,
    },
    {
      q: `What makes water damage in ${area.name} different?`,
      a: terrainAnswer,
    },
    {
      q: `Do you cover ${nearby}?`,
      a: `Yes. ${area.name} crews also serve ${area.nearby.join(", ")} and the surrounding communities. If you are unsure whether your address is covered, call and give the cross streets.`,
    },
    {
      q: `Will my insurance cover a ${area.name} water loss?`,
      a: `Coverage and payment remain subject to your policy and the carrier's decisions, so that is not something a restoration company can promise. What RestoreIQ can do is document the loss properly — photographs, moisture readings and scope notes recorded as the work happens — so your carrier is reviewing evidence rather than estimates.`,
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
