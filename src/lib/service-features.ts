/**
 * Per-service signature content. Each service gets a different shape because
 * the subject genuinely differs: a water loss is a drying curve over days, a
 * fire loss is a material-by-material residue problem, and a sewage loss is a
 * contamination classification that decides what can be kept at all.
 *
 * Only the services with a bespoke section appear here. The page falls back to
 * its shared sections when a service has no entry, so this can grow one
 * service at a time.
 */

/** Water damage — drying progress, where the story is readings over time. */
export interface DryingStage {
  day: string;
  label: string;
  detail: string;
  reading: string;
  readingNote: string;
  /** 0-100, drives the progress bar width. */
  progress: number;
}

/** Fire & smoke — residue behaves differently on different materials. */
export interface ResidueRow {
  material: string;
  residue: string;
  approach: string;
  outlook: "Usually restorable" | "Depends on exposure" | "Often replaced";
}

/** Sewage — IICRC S500 water categories decide salvageability. */
export interface WaterCategory {
  code: string;
  name: string;
  summary: string;
  sources: string[];
  porous: string;
  tone: "clean" | "grey" | "black";
}

export const dryingStages: DryingStage[] = [
  {
    day: "Hour 0",
    label: "Arrival and moisture mapping",
    detail: "Affected rooms are mapped with a meter before anything is moved, so the starting condition is on record and the drying plan has a baseline.",
    reading: "99.9%",
    readingNote: "Saturated carpet and pad",
    progress: 4,
  },
  {
    day: "Day 1",
    label: "Extraction and equipment set",
    detail: "Standing water is extracted and air movers and dehumidifiers are placed against the mapped area rather than the visible puddle.",
    reading: "82%",
    readingNote: "Subfloor still wet",
    progress: 26,
  },
  {
    day: "Day 2–3",
    label: "Monitored drying",
    detail: "Readings are taken at the same points each visit. If a point stops falling, the equipment is repositioned rather than left to run.",
    reading: "34%",
    readingNote: "Wall cavity trending down",
    progress: 68,
  },
  {
    day: "Day 3–5",
    label: "Dry standard reached",
    detail: "Drying stops when materials reach the project target set against an unaffected control area — not when a fixed number of days has passed.",
    reading: "12%",
    readingNote: "At target, equipment removed",
    progress: 100,
  },
];

export const residueRows: ResidueRow[] = [
  {
    material: "Painted drywall and ceilings",
    residue: "Dry smoke film",
    approach: "Dry sponge first, then a solvent only where the film resists. Wet cleaning first can set residue into the paint.",
    outlook: "Usually restorable",
  },
  {
    material: "Kitchen cabinets and woodwork",
    residue: "Protein residue",
    approach: "Degreasing agents and detail work into joints and hinges. Protein residue is near-invisible but carries the strongest odour.",
    outlook: "Depends on exposure",
  },
  {
    material: "Textiles, carpet and soft contents",
    residue: "Absorbed particulate and odour",
    approach: "Assessed per item. Some are cleanable off site; odour held deep in padding often is not worth the attempt.",
    outlook: "Depends on exposure",
  },
  {
    material: "Insulation and HVAC runs",
    residue: "Settled particulate",
    approach: "Insulation holds particulate that cannot be washed out, and ducts recirculate it. Replacement is usually the honest call.",
    outlook: "Often replaced",
  },
];

export const waterCategories: WaterCategory[] = [
  {
    code: "CAT 1",
    name: "Clean water",
    summary: "From a sanitary source, with no substantial risk on contact. The concern is how fast it spreads, not what is in it.",
    sources: ["Broken supply line", "Overflowing sink, no contaminants", "Ice-maker failure", "Rainwater, uncontaminated"],
    porous: "Carpet, pad and drywall can usually be dried in place if reached early.",
    tone: "clean",
  },
  {
    code: "CAT 2",
    name: "Grey water",
    summary: "Carries meaningful chemical or biological contamination and can cause illness on contact or ingestion.",
    sources: ["Washing-machine discharge", "Dishwasher overflow", "Toilet overflow, urine only", "Aquarium or waterbed"],
    porous: "Pad is normally removed. Carpet may be salvageable if treated quickly.",
    tone: "grey",
  },
  {
    code: "CAT 3",
    name: "Black water",
    summary: "Grossly contaminated and may carry pathogenic or toxic agents. Keep people and pets out of the affected area.",
    sources: ["Sewage backup", "Water past the sewer trap", "Rising floodwater", "Standing water gone septic"],
    porous: "Affected porous materials are removed, not dried. Hard surfaces are cleaned and documented.",
    tone: "black",
  },
];

/**
 * Category 1 does not stay Category 1. Time, warmth and contact with building
 * soils move a loss down the scale, which is the single most useful thing a
 * property owner can know early.
 */
export const escalationNote =
  "A clean-water loss does not stay clean. Sitting water picks up soils from building materials and warms, and a Category 1 loss can reach Category 2 or 3 within days — which changes what can be kept.";


/**
 * Supporting photo for each signature section. Generated to the briefs in
 * generated to a brief for plain job photos rather than
 * polished stock, so they sit beside the real /Real-life-images set.
 */
export const featureImages: Record<string, { src: string; alt: string; caption: string }> = {
  "water-damage-restoration": {
    src: "/services/features/drying-progress.jpg",
    alt: "Moisture meter held against a baseboard beside an air mover in a partly cleared room",
    caption: "Readings are taken at the same points each visit, against an unaffected control area.",
  },
  "fire-smoke-damage": {
    src: "/services/features/smoke-residue.jpg",
    alt: "Smoke film on a kitchen cabinet with one stripe wiped clean by a dry sponge",
    caption: "A dry sponge lifts the film first — wet-cleaning a dry residue sets it into the paint.",
  },
  "sewage-cleanup": {
    src: "/services/features/containment.jpg",
    alt: "Doorway sealed with zippered plastic sheeting forming a containment barrier",
    caption: "Containment goes up before any removal, so contaminants stay out of clean rooms.",
  },
};


/**
 * Companion card beside the feature photo. Deliberately a different shape
 * from the cards below it: a dark panel carrying one headline figure and a
 * short list, rather than another white body-copy card. Keeps the bento
 * block from reading as four of the same thing.
 */
export const featureAside: Record<string, {
  eyebrow: string;
  stat: string;
  statLabel: string;
  points: string[];
  /** Two supporting figures shown under the list. */
  metrics: { value: string; label: string }[];
  foot: string;
}> = {
  "water-damage-restoration": {
    eyebrow: "Why speed matters",
    stat: "24–48h",
    statLabel: "Before mould becomes likely on wet porous material",
    points: [
      "Water keeps moving after the puddle is gone",
      "Readings start at the first visit, not the second",
      "Equipment is placed against the mapped area",
    ],
    metrics: [
      { value: "Daily", label: "Readings logged while equipment runs" },
      { value: "Control", label: "Target set against an unaffected area" },
    ],
    foot: "Mapped, logged and dried to a target — not to a timer.",
  },
  "fire-smoke-damage": {
    eyebrow: "Before you clean",
    stat: "Stop",
    statLabel: "Wiping soot with a household cleaner can set it permanently",
    points: [
      "Dry residue is lifted dry, never wet-cleaned first",
      "Protein residue is near-invisible but carries the odour",
      "Air movement spreads residue well past the burn",
    ],
    metrics: [
      { value: "Per room", label: "Scope written before cleaning starts" },
      { value: "4 types", label: "Residue classes, each cleaned differently" },
    ],
    foot: "Each material gets the method that material needs.",
  },
  "sewage-cleanup": {
    eyebrow: "Keep clear",
    stat: "CAT 3",
    statLabel: "Grossly contaminated water — keep people and pets out",
    points: [
      "Do not run fans; they move contaminants to clean rooms",
      "Affected porous materials are removed, not dried",
      "Containment goes up before any removal begins",
    ],
    metrics: [
      { value: "S500", label: "Category confirmed to the IICRC standard" },
      { value: "Sealed", label: "Containment before any material is moved" },
    ],
    foot: "Category is confirmed on site before anything is scoped.",
  },
};


/**
 * Lower card in the bento column. Pairs with featureAside: that one states
 * the risk, this one states what is done about it. Light panel so the two
 * stacked cards alternate dark/light rather than repeating.
 */
export const featureAsideLower: Record<string, {
  eyebrow: string;
  title: string;
  rows: { label: string; value: string }[];
}> = {
  "water-damage-restoration": {
    eyebrow: "On every job",
    title: "What gets recorded",
    rows: [
      { label: "Moisture readings", value: "Every visit" },
      { label: "Photo set", value: "On arrival" },
      { label: "Equipment log", value: "Daily" },
    ],
  },
  "fire-smoke-damage": {
    eyebrow: "On every job",
    title: "How the scope is set",
    rows: [
      { label: "Residue testing", value: "Per material" },
      { label: "Room-by-room scope", value: "Before work" },
      { label: "Contents inventory", value: "Documented" },
    ],
  },
  "sewage-cleanup": {
    eyebrow: "On every job",
    title: "Before anything moves",
    rows: [
      { label: "Category confirmed", value: "On arrival" },
      { label: "Containment set", value: "First step" },
      { label: "Removals logged", value: "Photographed" },
    ],
  },
};


/**
 * The expertise section — the one block on each service page that argues for
 * RestoreIQ rather than explaining the loss. Deliberately specific per
 * service: the standard the work is held to, the instruments actually used,
 * and the judgement call that separates a careful job from a fast one.
 *
 * Nothing here claims a certification RestoreIQ holds. These describe the
 * method and the standards the work follows, which is verifiable from the
 * work itself.
 */
export interface Expertise {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  lede: string;
  /** The capability pillars — what the crew actually brings. */
  pillars: { title: string; body: string; icon: "gauge" | "scan" | "clipboard" | "shield" | "wind" | "layers"; image: string; imageAlt: string }[];
  /** The judgement call this service turns on. */
  callout: { label: string; claim: string; body: string };
  /** Hard numbers that back the section. */
  proof: { value: string; label: string }[];
  /** Anchor photo for the section, from the existing job set. */
  image: string;
  imageAlt: string;
  /** Short line stamped over the photo. */
  imageTag: string;
}

export const expertise: Record<string, Expertise> = {
  "water-damage-restoration": {
    eyebrow: "Where the expertise shows",
    heading: "Anyone can place fans.",
    headingAccent: "Knowing when to stop is the job.",
    lede: "Most water losses are not won by equipment count. They are won by finding every wet assembly on day one and proving each of them dry before the equipment leaves.",
    pillars: [
      { title: "Moisture mapping, not guessing", body: "Non-invasive meters and thermal imaging trace water through subfloor, wall cavity and insulation before a single air mover is placed.", icon: "scan", image: "/services/pillars/water-mapping.jpg", imageAlt: "Technician holding a moisture meter against a wall beside a baseboard" },
      { title: "Readings against a control", body: "Every target is set from an unaffected area in the same building, so dry means dry for that property — not a number from a chart.", icon: "gauge", image: "/services/pillars/water-control.jpg", imageAlt: "Moisture meter display being read in a dry, unaffected room" },
      { title: "Daily reposition, not set-and-leave", body: "If a monitored point stops falling, the equipment moves. Running fans at a stalled reading bills days without drying anything.", icon: "wind", image: "/services/pillars/water-reposition.jpg", imageAlt: "Technician moving an air mover to a new position against a wall" },
    ],
    callout: {
      label: "The call that matters",
      claim: "Dry in place, or remove?",
      body: "Removing material is faster and easier to bill. Drying in place preserves the property but demands daily readings to justify. We document either way, so the decision is visible rather than assumed.",
    },
    proof: [
      { value: "24–48h", label: "Window before mould risk rises sharply" },
      { value: "Daily", label: "Logged readings through the drying plan" },
      { value: "S500", label: "Drying standard the targets follow" },
    ],
    image: "/services/svc-drying.jpg",
    imageAlt: "Drying equipment running in a cleared room during a documented water loss",
    imageTag: "Equipment placed against the mapped area",
  },
  "fire-smoke-damage": {
    eyebrow: "Where the expertise shows",
    heading: "The burn is the easy part.",
    headingAccent: "Residue and odour are the real scope.",
    lede: "Fire damage is a chemistry problem as much as a cleaning one. Match the method to the residue and most surfaces come back; guess wrong once and you set the damage into the finish permanently.",
    pillars: [
      { title: "Residue identified before cleaning", body: "Dry smoke, wet smoke, protein and fuel-oil residues each behave differently. The surface is tested before a method is chosen.", icon: "scan", image: "/services/pillars/fire-residue.jpg", imageAlt: "Gloved hand testing smoke residue on a painted wall with a sponge" },
      { title: "Room-by-room scope", body: "Air movement carries residue far past the burn. The inspection follows the airflow, including closets, HVAC runs and voids.", icon: "layers", image: "/services/pillars/fire-scope.jpg", imageAlt: "Technician writing notes on a clipboard in a smoke-affected room" },
      { title: "Odour traced to source", body: "Odour is held in materials, not in the air. Sealing or deodorising before the source is removed only buys a few weeks.", icon: "shield", image: "/services/pillars/fire-odour.jpg", imageAlt: "Ceiling vent and surrounding staining being inspected with a torch" },
    ],
    callout: {
      label: "The call that matters",
      claim: "Clean it, or replace it?",
      body: "Protein residue on a cabinet can often be saved; the same residue in insulation cannot be washed out. We say which is which in writing rather than cleaning what should be replaced and hoping the odour fades.",
    },
    proof: [
      { value: "4 classes", label: "Residue types, each with its own method" },
      { value: "Per room", label: "Scope written before cleaning begins" },
      { value: "Airflow", label: "Inspection follows it, not just the burn" },
    ],
    image: "/Real-life-images/463D1AD5-739C-4DCE-9F31-3D124BF46CF1.jpg",
    imageAlt: "Restoration work underway inside a fire-affected property",
    imageTag: "Scope written room by room",
  },
  "sewage-cleanup": {
    eyebrow: "Where the expertise shows",
    heading: "This is not a cleaning job.",
    headingAccent: "It is a containment job first.",
    lede: "Contaminated water changes the rules. What can be saved, where crews may walk, and what happens to the air are all decided before anyone starts removing material.",
    pillars: [
      { title: "Category confirmed on arrival", body: "Water is classified under IICRC S500 before scoping. The category — not the volume — decides what stays and what goes.", icon: "clipboard", image: "/services/pillars/sewage-category.jpg", imageAlt: "Technician inspecting standing water at a doorway before scoping" },
      { title: "Containment before removal", body: "Barriers and negative air go up first. Moving material before containment pushes contaminants into rooms that were clean.", icon: "shield", image: "/services/pillars/sewage-containment.jpg", imageAlt: "Plastic sheeting taped across a doorway forming a containment barrier" },
      { title: "Documented removals", body: "Every removed material is photographed and logged, so the scope is defensible to the carrier and to you.", icon: "gauge", image: "/services/pillars/sewage-removals.jpg", imageAlt: "Removed sections of carpet pad bagged and labelled beside bare subfloor" },
    ],
    callout: {
      label: "The call that matters",
      claim: "Which porous materials come out?",
      body: "In a Category 3 loss, affected porous materials are removed rather than dried. That is a standard, not a preference — and the line between affected and unaffected is where careful work shows.",
    },
    proof: [
      { value: "CAT 1–3", label: "Classified before any scope is written" },
      { value: "Sealed", label: "Containment before material is moved" },
      { value: "Logged", label: "Every removal photographed for the file" },
    ],
    image: "/services/svc-sewage.jpg",
    imageAlt: "Extraction equipment set up in a contaminated-water loss",
    imageTag: "Containment before anything moves",
  },
};


/**
 * Dedicated hero photo per service. The heroes previously reused
 * service.image, which also appears further down each page — so the same
 * shot showed twice. Generated wide and dark-friendly:
 * wide, dark-friendly, with the subject right of centre so the headline on
 * the left sits over quiet pixels.
 *
 * Falls back to service.image when a hero has not been generated yet.
 */
export const heroImages: Record<string, { src: string; portrait: string; alt: string }> = {
  "burst-pipe-cleanup": {
    src: "/services/heroes/burst-pipe-hero.jpg",
    portrait: "/services/heroes/burst-pipe-hero-portrait.jpg",
    alt: "Split copper supply line behind a washing machine with saturated drywall and swollen baseboard",
  },
  "appliance-leak-cleanup": {
    src: "/services/heroes/appliance-leak-hero.jpg",
    portrait: "/services/heroes/appliance-leak-hero-portrait.jpg",
    alt: "Dishwasher pulled out from a kitchen cabinet run exposing wet flooring beneath",
  },
  "hardwood-floor-drying": {
    src: "/services/heroes/hardwood-hero.jpg",
    portrait: "/services/heroes/hardwood-hero-portrait.jpg",
    alt: "Cupped hardwood floor with raised board edges and boards lifted to expose damp subfloor",
  },
  "crawlspace-drying": {
    src: "/services/heroes/crawlspace-hero.jpg",
    portrait: "/services/heroes/crawlspace-hero-portrait.jpg",
    alt: "Crawlspace with water pooled on the vapour barrier and insulation hanging from the joists",
  },
  "commercial-water-damage": {
    src: "/services/heroes/commercial-hero.jpg",
    portrait: "/services/heroes/commercial-hero-portrait.jpg",
    alt: "Saturated carpet tiles across an open-plan office floor with tiles lifted and workstations pushed aside",
  },
  "contents-protection": {
    src: "/services/heroes/contents-hero.jpg",
    portrait: "/services/heroes/contents-hero-portrait.jpg",
    alt: "Water-damaged cardboard boxes and furniture in a residential room with contents lifted clear onto a table",
  },
  reconstruction: {
    src: "/services/reconstruction/hero-rebuild.jpg",
    portrait: "/services/heroes/reconstruction-hero-portrait.jpg",
    alt: "Room part-way through reinstatement with new drywall taped and fresh baseboard waiting to be fitted",
  },
  "water-damage-restoration": {
    src: "/services/heroes/water-hero.jpg",
    portrait: "/services/heroes/water-hero-portrait.jpg",
    alt: "Technician setting drying equipment in a water-damaged living room",
  },
  "fire-smoke-damage": {
    src: "/services/heroes/fire-hero.jpg",
    portrait: "/services/heroes/fire-hero-portrait.jpg",
    alt: "Technician assessing smoke damage in a fire-affected room",
  },
  "sewage-cleanup": {
    src: "/services/heroes/sewage-hero.jpg",
    portrait: "/services/heroes/sewage-hero-portrait.jpg",
    alt: "Technician in protective equipment working a contaminated-water loss",
  },
};


/**
 * Supporting line for each cause-of-loss card. The cards previously carried
 * only a label, which left them nearly empty — this says what each cause
 * actually tends to involve, keyed on the cause string from services.ts.
 */
export const causeDetail: Record<string, string> = {
  // Commercial water damage
  "Fire-suppression discharge": "A sprinkler head releases hundreds of litres a minute and keeps going until the system is isolated, often across several floors.",
  "Restroom and drain backups": "Shared stacks mean a blockage on one floor surfaces on another, and the water is contaminated from the moment it appears.",
  "Roof intrusion": "Flat commercial roofs pond rather than shed, so a failed membrane drips into the ceiling void long before anything shows below.",
  "Mechanical-system leaks": "Chilled-water lines, condensate trays and risers run above occupied space and leak quietly into the ceiling.",

  // Contents protection
  "Water migration": "Water reaches contents in rooms that were never near the source, following the floor rather than the shape of the building.",
  "Smoke and soot exposure": "Residue settles on everything in the airflow path, including items in rooms that never saw flame.",
  "Construction access": "Contents left in place during the work are exposed to dust, traffic and damage that had nothing to do with the original loss.",
  "Contaminated-water losses": "Porous items in Category 3 water are documented rather than cleaned, because they cannot be returned to a safe standard.",

  // Reconstruction
  "Post-mitigation repairs": "Drying leaves the room open — removed drywall, lifted flooring, missing trim. The rebuild puts back exactly what the file records.",
  "Fire-damaged finishes": "Charred or heat-affected finishes are replaced rather than cleaned, and the substrate behind them is checked before anything new goes on.",
  "Contaminated material removal": "Material taken out under a Category 3 scope leaves a documented gap, which is what the repair is written against.",
  "Access opened for drying": "Inspection holes and removed sections are repairs in their own right, and they close only once the cavity reads dry.",

  // Burst-pipe cleanup
  "Failed supply lines": "Braided hoses and flexible connectors fail at the crimp without warning, discharging at full mains pressure until someone shuts the valve.",
  "Frozen or aging pipes": "A pipe splits while frozen but only releases when it thaws, so the loss starts hours after the cold snap has passed.",
  "Corroded fittings": "Older brass and copper joints weep for weeks before they let go, leaving a wet cavity long before anything reaches the floor.",
  "Pipe-joint separation": "Push-fit and compression joints work loose under pressure cycling, often inside a wall or ceiling where nothing shows.",

  // Appliance-leak cleanup
  "Dishwasher supply leaks": "The supply line sits behind the unit where nothing is visible, so a slow drip saturates the cabinet base and floor before it is noticed.",
  "Washing-machine hoses": "Hoses fail at the fitting and discharge at mains pressure, usually mid-cycle with nobody in the room.",
  "Refrigerator lines": "Ice-maker lines are small-bore and easy to forget. A pinhole leak runs for weeks behind a unit nobody moves.",
  "Water-heater failures": "A failed tank releases its full volume at once, then keeps feeding from the supply until the isolation valve is closed.",

  // Hardwood-floor drying
  "Dishwasher leaks": "Water runs under the cabinet run and reaches the board edges, where it wicks along the seams rather than spreading evenly.",
  "Plumbing failures": "A supply failure puts water under the boards faster than the surface shows it, so the floor looks fine while the subfloor soaks.",
  "Window and door intrusion": "Wind-driven rain enters at the threshold and tracks under the boards at the perimeter, where the expansion gap offers no resistance.",

  // Crawlspace drying
  "Plumbing leaks": "A leak above the crawlspace drips onto the ground sheeting and raises humidity in a space that has no airflow to clear it.",
  "Groundwater entry": "Water enters through the foundation wall or up through the ground, pooling on the vapour barrier rather than draining away.",
  "Drainage failures": "Blocked or misdirected downpipes discharge against the foundation, and the water finds its way under the house within hours.",
  "Storm-related intrusion": "Heavy rain overwhelms the grading around the property and runs into the crawlspace, carrying soil with it.",

  // Water damage
  "Supply-line failures": "Braided hoses and compression fittings fail without warning and run until someone is home to notice.",
  "Roof and window intrusion": "Wind-driven rain tracks into wall cavities and insulation, often appearing rooms away from the entry point.",
  "Overflowing fixtures": "Sinks, tubs and washing machines flood level floors fast and push water under adjoining rooms.",
  "Storm water entry": "Ground water enters at thresholds and slab edges, carrying soil with it into carpet and pad.",

  // Fire & smoke
  "Kitchen fires": "Protein residue from cooking fires is near-invisible but carries the strongest odour of any smoke type.",
  "Electrical incidents": "Wiring fires burn hot and localised, leaving dense soot in cavities and along ceiling runs.",
  "Candle and fireplace smoke": "Slow-burning sources deposit a fine dry film across whole rooms before anyone notices staining.",
  "Wildfire smoke intrusion": "Exterior smoke enters through vents and gaps, settling in insulation and HVAC runs rather than on surfaces.",

  // Sewage
  "Sewer backups": "Water past the sewer trap is Category 3 on arrival, so affected porous materials are removed rather than dried.",
  "Toilet overflows": "Clean overflow is Category 1, but it drops a category once it sits or passes the trap.",
  "Drain-line failures": "Blockages inside walls release grey water into cavities that look dry from the room side.",
  "Contaminated storm water": "Ground water picks up soil, fertiliser and road runoff before it reaches the building envelope.",
};


/**
 * Which word of each cause label takes the blue accent. Not positional —
 * it is the word that carries the meaning, which lands first in some labels
 * and second in others.
 */
export const causeAccent: Record<string, string> = {
  // Water damage
  "Supply-line failures": "Supply-line",
  "Roof and window intrusion": "intrusion",
  "Overflowing fixtures": "Overflowing",
  "Storm water entry": "Storm",

  // Fire & smoke
  "Kitchen fires": "Kitchen",
  "Electrical incidents": "Electrical",
  "Candle and fireplace smoke": "smoke",
  "Wildfire smoke intrusion": "Wildfire",

  // Sewage
  "Sewer backups": "Sewer",
  "Toilet overflows": "overflows",
  "Drain-line failures": "failures",
  "Contaminated storm water": "Contaminated",
};

/** Splits a label so the accented word can be wrapped in its own element. */
export function splitCause(cause: string): [string, string, string] {
  const word = causeAccent[cause];
  if (!word) return [cause, "", ""];
  const i = cause.indexOf(word);
  if (i < 0) return [cause, "", ""];
  return [cause.slice(0, i), word, cause.slice(i + word.length)];
}


/**
 * What happens after the call, per service. The sequences genuinely differ:
 * a water loss is mapped then dried, a fire loss is scoped by material, and
 * a contaminated-water loss is classified and contained before anything is
 * touched. Five stages each, matching the homepage's process pattern.
 */
export interface ProcessStep {
  title: string;
  accent: string;
  copy: string;
  /** When this stage happens, so the sequence reads as a timeline. */
  when: string;
  icon: "phone" | "scan" | "waves" | "wind" | "house" | "shield" | "clipboard" | "layers" | "gauge";
}

export const processSteps: Record<string, ProcessStep[]> = {
  "water-damage-restoration": [
    { title: "Call", accent: "us", copy: "Tell us what happened and get safety guidance while we are on the way.", when: "Day or night", icon: "phone" },
    { title: "Stop and", accent: "map", copy: "The source is shut off and every wet assembly is traced before equipment goes in.", when: "On arrival", icon: "scan" },
    { title: "Extract", accent: "water", copy: "Standing water comes out and the starting condition is photographed.", when: "First visit", icon: "waves" },
    { title: "Dry and", accent: "monitor", copy: "Readings are logged each visit and equipment moves if a point stalls.", when: "Daily, 3–5 days", icon: "wind" },
    { title: "Repair and", accent: "restore", copy: "Once materials hit target, approved repairs bring the property back.", when: "After approval", icon: "house" },
  ],
  "fire-smoke-damage": [
    { title: "Call", accent: "us", copy: "Tell us what burned and what the fire service has already done.", when: "Day or night", icon: "phone" },
    { title: "Secure the", accent: "property", copy: "Openings are covered and the structure made safe to enter and work in.", when: "Within hours", icon: "shield" },
    { title: "Test the", accent: "residue", copy: "Each surface is tested so the cleaning method matches the residue type.", when: "Before cleaning", icon: "scan" },
    { title: "Clean by", accent: "material", copy: "Room-by-room cleaning, with non-salvageable materials documented and removed.", when: "Days 1–5", icon: "layers" },
    { title: "Treat the", accent: "odour", copy: "Odour is traced to its source rather than sealed over, then repairs begin.", when: "After cleaning", icon: "house" },
  ],
  "sewage-cleanup": [
    { title: "Call", accent: "us", copy: "Describe the source. Keep people and pets out of the affected area until we arrive.", when: "Day or night", icon: "phone" },
    { title: "Confirm the", accent: "category", copy: "Water is classified under IICRC S500 before any scope is written.", when: "On arrival", icon: "clipboard" },
    { title: "Contain the", accent: "area", copy: "Barriers go up before anything moves, so contaminants stay out of clean rooms.", when: "Before removal", icon: "shield" },
    { title: "Remove and", accent: "clean", copy: "Affected porous materials come out and are logged; hard surfaces are cleaned.", when: "First visit", icon: "layers" },
    { title: "Dry and", accent: "verify", copy: "The structure is dried to target and the finished condition documented.", when: "Days 2–5", icon: "gauge" },
  ],
};

/**
 * What to do before the crew arrives. Deliberately limited to actions that
 * are safe to advise, each conditioned on it being safe to do; anything
 * involving the electrical panel, gas or structural damage is pushed to
 * emergency services rather than described here.
 */
export type SafetyIcon =
  | "valve" | "lift" | "shield" | "camera" | "door" | "droplet" | "wind"
  | "plug" | "vacuum" | "stack" | "cloth" | "fan" | "food" | "footprint"
  | "window" | "box" | "clipboard";

export interface SafetyGuide {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  lede: string;
  doList: { text: string; why: string; icon: SafetyIcon }[];
  dontList: { text: string; why: string; icon: SafetyIcon }[];
  warning: string;
  /** Supporting photo for the section's left column. */
  image: string;
  imageAlt: string;
  /** One figure that makes the urgency concrete. */
  stat: string;
  statLabel: string;
}

export const safetyGuides: Record<string, SafetyGuide> = {
  "water-damage-restoration": {
    eyebrow: "Before we arrive",
    heading: "What helps in the",
    headingAccent: "first hour.",
    lede: "Water keeps moving while you wait. A few things slow it down — and a few make the loss worse.",
    doList: [
      { text: "Shut off the supply valve if you can reach it safely", why: "Every minute of flow adds to the area that has to be dried.", icon: "valve" },
      { text: "Lift curtains, rugs and small contents clear of the water", why: "Dyes and finishes bleed into carpet within hours and the staining is permanent.", icon: "lift" },
      { text: "Put foil or timber under furniture legs", why: "Wooden and metal feet leave marks on wet carpet that cannot be cleaned out.", icon: "box" },
      { text: "Photograph the damage before anything is moved", why: "Your carrier wants the starting condition, not the tidied version.", icon: "camera" },
    ],
    dontList: [
      { text: "Do not walk through standing water near outlets", why: "Water reaches live circuits at floor level before there is any visible sign.", icon: "plug" },
      { text: "Do not use a household vacuum to lift water", why: "A domestic motor is not sealed for water and will fail, often dangerously.", icon: "vacuum" },
      { text: "Do not leave wet contents stacked on carpet", why: "Trapped moisture under a pile dries last and is where mould starts.", icon: "stack" },
    ],
    warning: "If water is near the electrical panel, the ceiling is sagging, or you smell gas, leave the property and call emergency services first.",
    image: "/services/pillars/water-mapping.jpg",
    imageAlt: "Moisture meter held against a wet baseboard with darkened carpet alongside",
    stat: "24-48h",
    statLabel: "Before mould becomes likely on wet porous material",
  },
  "fire-smoke-damage": {
    eyebrow: "Before we arrive",
    heading: "What helps — and what",
    headingAccent: "makes it permanent.",
    lede: "Smoke residue is a chemistry problem. The wrong first move can set the damage into a surface for good.",
    doList: [
      { text: "Wait for clearance from the fire service", why: "Heat damage to framing and wiring is not visible from inside the room.", icon: "shield" },
      { text: "Open windows for ventilation if the weather is dry", why: "Moving air out slows the residue from settling further into surfaces.", icon: "window" },
      { text: "Photograph rooms and contents before anything moves", why: "Soot patterns show how far the smoke travelled, which sets the scope.", icon: "camera" },
      { text: "Move undamaged contents out of affected rooms", why: "Residue keeps settling for days and will reach anything left in the room.", icon: "box" },
    ],
    dontList: [
      { text: "Do not wipe soot with a damp cloth or cleaner", why: "Water turns dry residue into a stain that bonds to the paint permanently.", icon: "cloth" },
      { text: "Do not run the HVAC system", why: "Ducts pull residue through the whole property, including rooms that were clean.", icon: "fan" },
      { text: "Do not eat food that was exposed to smoke", why: "Packaging does not seal out fine particulate or the chemicals carried with it.", icon: "food" },
    ],
    warning: "Do not re-enter until the fire service confirms the structure is safe. Heat damage to framing and wiring is not always visible.",
    image: "/services/pillars/fire-residue.jpg",
    imageAlt: "Smoke film on a wall with one clean test patch wiped through it",
    stat: "Minutes",
    statLabel: "Acidic residue begins etching metal and glass surfaces",
  },
  "sewage-cleanup": {
    eyebrow: "Before we arrive",
    heading: "Keep clear and keep it",
    headingAccent: "contained.",
    lede: "Contaminated water carries risk on contact. The priority is keeping it away from people and away from clean rooms.",
    doList: [
      { text: "Keep people and pets out of the affected area", why: "Category 3 water carries pathogens that transfer on contact with skin.", icon: "shield" },
      { text: "Close the door to the affected room if you safely can", why: "A closed door slows airborne contaminants reaching the rest of the property.", icon: "door" },
      { text: "Stop using fixtures on the affected drain line", why: "Every flush or drain cycle adds volume to water that is already contaminated.", icon: "droplet" },
      { text: "Photograph from the doorway, without entering", why: "Your carrier needs the extent recorded, and the doorway is close enough.", icon: "camera" },
    ],
    dontList: [
      { text: "Do not run fans", why: "Air movement pushes contaminants into rooms that are still clean.", icon: "wind" },
      { text: "Do not attempt to clean or extract it yourself", why: "Domestic equipment spreads contamination and cannot be decontaminated after.", icon: "vacuum" },
      { text: "Do not walk from the affected area onto clean carpet", why: "Footwear carries the contamination straight into unaffected rooms.", icon: "footprint" },
    ],
    warning: "Avoid all skin contact with the water. If anyone has been exposed, or the property has vulnerable occupants, seek medical advice.",
    image: "/services/pillars/sewage-containment.jpg",
    imageAlt: "Plastic sheeting taped across a doorway forming a containment barrier",
    stat: "CAT 3",
    statLabel: "Treated as grossly contaminated from the moment we arrive",
  },
};


/* ══════════════════════════════════════════════════════════════════════
   BATCH 2 — sudden clean-water failures reaching concealed places:
   burst pipes, appliance leaks, hardwood drying, crawlspace drying.
   These four share one story — the visible wet patch is not the extent of
   the loss — so they share a signature section with per-service content.
   ══════════════════════════════════════════════════════════════════════ */

/**
 * Where the water goes after it leaves the source. Each entry is a path the
 * water takes, how far it typically travels, and what gives it away.
 */
/** Kept so existing data parses; the cutaway diagram it served is gone. */
export type HouseRegion = string;

export interface HiddenPath {
  zone: string;
  path: string;
  tell: string;
  reach: string;
  /** Caption shown under the photo. */
  region: HouseRegion;
  /** Job photo of this zone. Replaces the cutaway diagram — a real photo of
   *  the place being described says more than a highlighted drawing. */
  photo: string;
  photoAlt: string;
}

export const hiddenPaths: Record<string, HiddenPath[]> = {
  "burst-pipe-cleanup": [
    { zone: "Wall cavity", path: "Water runs down the inside face of the drywall and soaks the bottom plate and insulation before anything shows on the surface.", tell: "Paint bubbling low on the wall, or a tide line above the baseboard.", reach: "Full wall height", region: "wall", photo: "/services/cutaway/wall-cavity.jpg", photoAlt: "Drywall cut away exposing damp insulation and studs in a wall cavity" },
    { zone: "Under the floor", path: "It tracks along the subfloor under carpet, vinyl or laminate, following the slope of the slab rather than the shape of the room.", tell: "Carpet darker in patches that do not match where the pipe failed.", reach: "Two rooms or more", region: "subfloor", photo: "/services/cutaway/subfloor-sheeting.jpg", photoAlt: "Carpet pulled back exposing wet plywood subfloor beneath" },
    { zone: "Through the ceiling", path: "A failure on an upper floor saturates the ceiling cavity and runs along joists before finding a light fitting or seam to come through.", tell: "A stain that appears away from the leak, often at a downlight.", reach: "The length of a joist bay", region: "ceiling", photo: "/services/cutaway/ceiling.jpg", photoAlt: "Water-stained ceiling opened to show damp insulation above" },
    { zone: "Into adjoining rooms", path: "Bottom plates are continuous between rooms, so water wicks under the wall line into spaces that were never near the burst.", tell: "A damp skirting board on the far side of a shared wall.", reach: "Wherever the plate runs", region: "plate", photo: "/services/cutaway/bottom-plate.jpg", photoAlt: "Drywall removed at floor level exposing a wet timber bottom plate" },
  ],
  "appliance-leak-cleanup": [
    { zone: "Behind the kickboard", path: "A slow supply-line drip collects in the cavity under the cabinet base, where there is no airflow and nothing to see from the room.", tell: "A musty smell near the unit with no visible water.", reach: "The full cabinet run", region: "kickboard", photo: "/services/cutaway/kickboard.jpg", photoAlt: "Kickboard panel removed exposing standing water under kitchen cabinets" },
    { zone: "Cabinet base and sides", path: "Particleboard wicks upward from the base. It swells, the laminate lifts at the edge, and the damage is permanent before it is noticed.", tell: "A swollen or lifting edge at the bottom of a cabinet door.", reach: "Up to 150mm of upward wicking", region: "cabinetBase", photo: "/services/cutaway/cabinet-base.jpg", photoAlt: "Kitchen cabinet base swollen with the laminate lifting at the edge" },
    { zone: "Under the appliance", path: "Water spreads across the floor beneath the unit and sits against the subfloor, out of reach without pulling the appliance.", tell: "Nothing at all until the floor covering reacts.", reach: "The appliance footprint and beyond", region: "appliance", photo: "/services/cutaway/appliance.jpg", photoAlt: "Dishwasher pulled out exposing wet flooring beneath and behind it" },
    { zone: "Into the wall behind", path: "Where the supply line enters the wall, water follows the pipe back into the cavity and down to the plate.", tell: "A damp patch on the opposite side of the wall.", reach: "Down to the floor plate", region: "wallRight", photo: "/services/cutaway/wall-behind.jpg", photoAlt: "Wall opened behind a kitchen unit showing a supply pipe and wet insulation" },
  ],
  "hardwood-floor-drying": [
    { zone: "Between board and subfloor", path: "Water sits in the gap under the boards, where the surface is sealed and cannot release moisture upward.", tell: "Boards that look dry but read wet on a meter.", reach: "Well past the visible edge", region: "subfloor", photo: "/services/cutaway/boards-lifted.jpg", photoAlt: "Hardwood boards lifted showing damp undersides and wet subfloor" },
    { zone: "Along the board seams", path: "It travels lengthways down the tongue-and-groove joints, moving further along the grain than across it.", tell: "Cupping that runs in a line rather than a patch.", reach: "The full length of a board run", region: "boards", photo: "/services/cutaway/board-seams.jpg", photoAlt: "Hardwood floor cupped along the board seams with a tide line across it" },
    { zone: "Into the subfloor", path: "Plywood or OSB absorbs and holds moisture, then releases it back up into the boards for weeks after the surface looks dry.", tell: "Boards that re-cup after drying appears finished.", reach: "The depth of the subfloor", region: "subfloor", photo: "/services/cutaway/subfloor-sheeting.jpg", photoAlt: "Carpet pulled back exposing wet plywood subfloor beneath" },
    { zone: "Under the skirting", path: "The expansion gap at the perimeter channels water under the skirting board and into the wall base.", tell: "A dark line along the edge of the floor.", reach: "The room perimeter", region: "skirting", photo: "/services/cutaway/skirting.jpg", photoAlt: "Skirting board removed exposing a wet wall base and floor edge" },
  ],
  "crawlspace-drying": [
    { zone: "Ground and vapour barrier", path: "Water pools on the plastic sheeting rather than draining, and sits there evaporating into the space above.", tell: "Condensation on ducts or the underside of the subfloor.", reach: "Wherever the ground falls", region: "ground", photo: "/services/cutaway/ground.jpg", photoAlt: "Water pooled on the vapour barrier in a crawlspace" },
    { zone: "Joists and subfloor", path: "Rising humidity soaks the underside of the floor structure, which never dries because the space has no airflow.", tell: "Cupping or soft spots in the floor above.", reach: "The whole footprint", region: "joists", photo: "/services/cutaway/joists.jpg", photoAlt: "Underside of a floor structure with dark staining across the sheeting" },
    { zone: "Insulation batts", path: "Batts hold water, sag away from the joists and lose their value, then stay wet long after the standing water is gone.", tell: "Insulation hanging down or on the ground.", reach: "Every bay that got wet", region: "batts", photo: "/services/cutaway/batts.jpg", photoAlt: "Saturated insulation batts sagging out of the joist bays" },
    { zone: "Piers and framing", path: "Timber in contact with damp ground wicks moisture upward into the structural members.", tell: "Dark staining at the base of posts and piers.", reach: "Up the full pier height", region: "piers", photo: "/services/cutaway/piers.jpg", photoAlt: "Concrete pier stained dark at its base, standing on damp ground" },
  ],
};

/**
 * The argument for each service — same structure as the first batch's
 * expertise block, written for these four.
 */
export const batch2Expertise: Record<string, Expertise> = {
  "burst-pipe-cleanup": {
    eyebrow: "Where the expertise shows",
    heading: "The puddle is the symptom.",
    headingAccent: "The wet assembly is the job.",
    lede: "A pressurised failure moves a lot of water in a short time, and almost none of it stays where you can see it. Finding every wet assembly on the first visit is what keeps the repair small.",
    pillars: [
      { title: "Traced, not assumed", body: "Thermal imaging and meters follow the water through cavities and under flooring before any equipment is placed.", icon: "scan", image: "/services/pillars/water-mapping.jpg", imageAlt: "Thermal and meter check tracing water through a wall" },
      { title: "Opened only where needed", body: "Access holes go where the readings say, not along the whole wall. Less opened means less to put back.", icon: "layers", image: "/services/cutaway/wall-behind.jpg", imageAlt: "A wall opened only where the readings called for it" },
      { title: "Dried to a target", body: "Equipment runs until readings match an unaffected control area in the same building, not for a fixed number of days.", icon: "gauge", image: "/services/pillars/water-control.jpg", imageAlt: "Moisture reading taken against an unaffected control area" },
    ],
    callout: { label: "The call that matters", claim: "Open it, or dry it closed?", body: "Drying a closed cavity is slower but keeps the wall intact. It only works if readings prove it is actually drying — which is why the readings are logged rather than estimated." },
    proof: [
      { value: "Day 1", label: "Every wet assembly mapped before equipment goes in" },
      { value: "Daily", label: "Readings logged against a control area" },
      { value: "S500", label: "Drying standard the targets follow" },
    ],
    image: "/services/expertise/burst-pipe.jpg",
    imageAlt: "Wall opened in two places exposing wet framing and insulation, thermal camera on a step stool",
    imageTag: "Traced before anything is opened",
  },
  "appliance-leak-cleanup": {
    eyebrow: "Where the expertise shows",
    heading: "Small leak, long time.",
    headingAccent: "That is the hard part.",
    lede: "Appliance failures are rarely dramatic. They drip into a cavity nobody can see, for weeks, and the damage is done by the time anything shows in the room.",
    pillars: [
      { title: "Checked behind, not just under", body: "The kickboard cavity and the wall behind the supply line are inspected, because that is where the water actually sits.", icon: "scan", image: "/services/features/drying-progress.jpg", imageAlt: "Checking behind a unit rather than only beneath it" },
      { title: "Cabinets dried in place where possible", body: "Drying a cabinet run beats replacing it, but only if the base has not already swollen. Readings decide which it is.", icon: "layers", image: "/services/pillars/water-reposition.jpg", imageAlt: "Airflow directed into a cabinet cavity" },
      { title: "Targeted airflow", body: "Small injected airflow into the cavity dries the void without dismantling the kitchen around it.", icon: "wind", image: "/services/features/containment.jpg", imageAlt: "Airflow directed into the void rather than across the room" },
    ],
    callout: { label: "The call that matters", claim: "Save the cabinet run, or replace it?", body: "A particleboard base that has swollen will not recover, and drying it wastes days. One that is wet but intact usually does. We say which in writing rather than guessing." },
    proof: [
      { value: "Weeks", label: "How long a slow leak often runs before it shows" },
      { value: "150mm", label: "Typical upward wicking into a cabinet base" },
      { value: "In place", label: "Cabinets dried rather than removed where readings allow" },
    ],
    image: "/services/expertise/appliance-leak.jpg",
    imageAlt: "Dishwasher pulled clear of its cabinet run with an inspection camera fed into the cavity",
    imageTag: "The cavity, not the floor",
  },
  "hardwood-floor-drying": {
    eyebrow: "Where the expertise shows",
    heading: "Wood moves twice.",
    headingAccent: "Dry it wrong and it moves again.",
    lede: "Wet hardwood cups as it absorbs and crowns as it dries. Drying too fast locks the deformation in permanently, which is why the rate matters as much as the result.",
    pillars: [
      { title: "Dried from underneath", body: "Mats pull moisture up through the boards rather than blowing air across a sealed surface, which does almost nothing.", icon: "wind", image: "/services/features/drying-progress.jpg", imageAlt: "Drying mats pulling moisture up through the boards" },
      { title: "Rate controlled, not rushed", body: "Too aggressive and the face dries while the core stays wet, so the boards crown and the finish checks.", icon: "gauge", image: "/services/pillars/water-mapping.jpg", imageAlt: "Moisture reading guiding the drying rate" },
      { title: "Subfloor read separately", body: "Boards can reach target while the subfloor beneath is still wet and ready to push moisture back up into them.", icon: "scan", image: "/services/cutaway/joists.jpg", imageAlt: "Subfloor metered separately from the boards above" },
    ],
    callout: { label: "The call that matters", claim: "Dry it, or replace it?", body: "Boards that have cupped can usually be saved and sanded flat once dry. Boards that have crowned, delaminated or lifted at the tongue generally cannot — and drying them anyway only delays the answer." },
    proof: [
      { value: "Weeks", label: "Typical drying time for wet hardwood, not days" },
      { value: "Two reads", label: "Boards and subfloor measured separately" },
      { value: "Sand after", label: "Flattening happens once readings reach target" },
    ],
    image: "/services/expertise/hardwood.jpg",
    imageAlt: "Specialist drying mats taped across cupped hardwood boards with hoses running off frame",
    imageTag: "Boards and subfloor, read separately",
  },
  "crawlspace-drying": {
    eyebrow: "Where the expertise shows",
    heading: "Out of sight is not",
    headingAccent: "out of the building.",
    lede: "A wet crawlspace does not stay in the crawlspace. The air under the house moves up into it, carrying moisture into the floor structure and the rooms above.",
    pillars: [
      { title: "Water out before air in", body: "Standing water is removed and the ground sheeting corrected first — drying a space that is still collecting water achieves nothing.", icon: "scan", image: "/services/features/containment.jpg", imageAlt: "Standing water removed before drying equipment is set" },
      { title: "Wet insulation comes out", body: "Saturated batts hold moisture indefinitely and will not dry in place. Leaving them is the most common reason a crawlspace stays damp.", icon: "layers", image: "/services/cutaway/subfloor-sheeting.jpg", imageAlt: "Saturated material removed rather than dried in place" },
      { title: "Structure read from below", body: "Joists and subfloor are metered from underneath, where the moisture actually is, rather than from the room above.", icon: "gauge", image: "/services/pillars/water-control.jpg", imageAlt: "Joists metered from underneath where the moisture is" },
    ],
    callout: { label: "The call that matters", claim: "Dry it, or fix why it is wet?", body: "Drying a crawlspace that floods every winter buys a season. If the cause is drainage or grading, that gets stated plainly — even though it is outside what a drying job covers." },
    proof: [
      { value: "Upward", label: "Air moves from the crawlspace into the house above" },
      { value: "Removed", label: "Wet insulation taken out rather than dried in place" },
      { value: "From below", label: "Joists and subfloor metered where the moisture is" },
    ],
    image: "/services/expertise/crawlspace.jpg",
    imageAlt: "Wet insulation pulled down onto the vapour barrier with a dehumidifier hose through the hatch",
    imageTag: "Read from below, not from the room",
  },
};


/** Process sequences for batch 2. */
export const batch2Steps: Record<string, ProcessStep[]> = {
  "burst-pipe-cleanup": [
    { title: "Call", accent: "us", copy: "Shut the water off at the main if you can reach it safely, then call.", when: "Day or night", icon: "phone" },
    { title: "Trace the", accent: "spread", copy: "Thermal imaging and meters find every wet assembly, not just the visible one.", when: "On arrival", icon: "scan" },
    { title: "Extract and", accent: "open", copy: "Standing water comes out; cavities are opened only where readings require it.", when: "First visit", icon: "waves" },
    { title: "Dry and", accent: "monitor", copy: "Equipment is placed against the mapped area and readings logged each visit.", when: "Daily, 3–5 days", icon: "wind" },
    { title: "Close and", accent: "restore", copy: "Access holes are made good and finishes repaired once readings hit target.", when: "After approval", icon: "house" },
  ],
  "appliance-leak-cleanup": [
    { title: "Call", accent: "us", copy: "Turn off the supply valve behind the appliance if you can reach it.", when: "Day or night", icon: "phone" },
    { title: "Pull and", accent: "inspect", copy: "The appliance comes out and the cavity behind the kickboard is checked.", when: "On arrival", icon: "scan" },
    { title: "Assess the", accent: "cabinetry", copy: "Cabinet bases are metered to see whether they can be dried or have already swollen.", when: "First visit", icon: "clipboard" },
    { title: "Inject and", accent: "dry", copy: "Airflow goes into the cavity itself rather than across the kitchen floor.", when: "Daily, 2–4 days", icon: "wind" },
    { title: "Refit and", accent: "finish", copy: "The appliance goes back and any removed trim or panel is replaced.", when: "After approval", icon: "house" },
  ],
  "hardwood-floor-drying": [
    { title: "Call", accent: "us", copy: "Lift rugs and move furniture off the wet area if it is safe to do so.", when: "Day or night", icon: "phone" },
    { title: "Read the", accent: "boards", copy: "Boards and subfloor are metered separately, because they dry at different rates.", when: "On arrival", icon: "scan" },
    { title: "Set drying", accent: "mats", copy: "Mats pull moisture up through the boards rather than blowing air over a sealed face.", when: "First visit", icon: "layers" },
    { title: "Control the", accent: "rate", copy: "Drying is paced so the face does not dry ahead of the core and crown the boards.", when: "1–3 weeks", icon: "gauge" },
    { title: "Sand and", accent: "refinish", copy: "Once both readings reach target, cupped boards are flattened and refinished.", when: "After approval", icon: "house" },
  ],
  "crawlspace-drying": [
    { title: "Call", accent: "us", copy: "Describe what you can see or smell. Do not enter the space yourself.", when: "Day or night", icon: "phone" },
    { title: "Access and", accent: "assess", copy: "The space is entered, the water source identified and the ground checked.", when: "On arrival", icon: "scan" },
    { title: "Extract and", accent: "strip", copy: "Standing water is removed and saturated insulation taken out rather than dried.", when: "First visit", icon: "waves" },
    { title: "Dry the", accent: "structure", copy: "Joists and subfloor are dried from below and metered where the moisture is.", when: "Daily, 3–7 days", icon: "wind" },
    { title: "Reinstate and", accent: "advise", copy: "Barrier and insulation are replaced, and any drainage cause is stated plainly.", when: "After approval", icon: "house" },
  ],
};

/** Safety guidance for batch 2. */
export const batch2Safety: Record<string, SafetyGuide> = {
  "burst-pipe-cleanup": {
    eyebrow: "Before we arrive",
    heading: "What helps in the",
    headingAccent: "first hour.",
    lede: "A pressurised line moves a lot of water quickly. Stopping the flow and keeping contents clear is most of what helps.",
    doList: [
      { text: "Shut off the water at the main if you can reach it", why: "A burst supply line does not stop on its own and keeps adding to the area that must be dried.", icon: "valve" },
      { text: "Lift rugs, curtains and small contents clear", why: "Dyes bleed into wet carpet within hours and the staining does not come out.", icon: "lift" },
      { text: "Put foil or timber under furniture legs", why: "Wooden and metal feet mark wet carpet permanently.", icon: "box" },
      { text: "Photograph the damage before anything is moved", why: "Your carrier wants the starting condition, not the tidied version.", icon: "camera" },
    ],
    dontList: [
      { text: "Do not walk through water near outlets", why: "Water reaches live circuits at floor level before there is any visible sign.", icon: "plug" },
      { text: "Do not use a household vacuum", why: "A domestic motor is not sealed for water and will fail, often dangerously.", icon: "vacuum" },
      { text: "Do not open walls yourself to look", why: "Opening the wrong cavity adds repair work without telling you where the water went.", icon: "stack" },
    ],
    warning: "If water is near the electrical panel, the ceiling is sagging, or you smell gas, leave the property and call emergency services first.",
    image: "/services/pillars/water-reposition.jpg",
    imageAlt: "Air mover running against a wall during drying",
    stat: "24–48h",
    statLabel: "Before mould becomes likely on wet porous material",
  },
  "appliance-leak-cleanup": {
    eyebrow: "Before we arrive",
    heading: "Stop the supply,",
    headingAccent: "leave the cabinet.",
    lede: "The water is usually in a cavity you cannot see. Pulling the kitchen apart to look for it rarely helps and often adds damage.",
    doList: [
      { text: "Close the supply valve behind the appliance", why: "Most appliance leaks continue at a trickle until the valve is closed.", icon: "valve" },
      { text: "Switch the appliance off at the socket", why: "Water in the cavity can reach the appliance's own electrics.", icon: "plug" },
      { text: "Move stored items out of the affected cabinets", why: "Cardboard and paper wick water and hold it against the cabinet base.", icon: "box" },
      { text: "Photograph the area before anything is moved", why: "Slow leaks are often disputed, so the starting condition matters.", icon: "camera" },
    ],
    dontList: [
      { text: "Do not pull the appliance out yourself", why: "Supply lines and waste connections break easily and turn a leak into a flood.", icon: "vacuum" },
      { text: "Do not remove kickboards or cabinet panels", why: "They often hold the cabinet square, and removal adds repair work.", icon: "stack" },
      { text: "Do not point a household fan at the cabinet", why: "Blowing air across a closed cavity dries the room, not the void where the water is.", icon: "fan" },
    ],
    warning: "If the appliance is a water heater, or water has reached a socket or the consumer unit, isolate the circuit and call an electrician before anything else.",
    image: "/services/pillars/water-control.jpg",
    imageAlt: "Moisture reading taken near a cabinet base",
    stat: "Weeks",
    statLabel: "How long a slow appliance leak often runs before it shows",
  },
  "hardwood-floor-drying": {
    eyebrow: "Before we arrive",
    heading: "Do not rush the",
    headingAccent: "drying yourself.",
    lede: "Wood that dries too fast deforms permanently. Most of what helps before we arrive is getting weight and water off the boards.",
    doList: [
      { text: "Lift rugs and move furniture off the wet area", why: "Weight on cupped boards while they are wet sets the deformation in.", icon: "lift" },
      { text: "Blot standing water with towels", why: "Removing surface water slows how much soaks into the board seams.", icon: "droplet" },
      { text: "Keep the room at a normal temperature", why: "Heating a wet floor hard dries the face before the core and crowns the boards.", icon: "window" },
      { text: "Photograph the floor before anything is moved", why: "Cupping develops over days, so the starting condition is worth recording.", icon: "camera" },
    ],
    dontList: [
      { text: "Do not point heaters or fans at the floor", why: "Fast surface drying locks the cupping in and checks the finish.", icon: "fan" },
      { text: "Do not sand or refinish while it is wet", why: "Boards flatten as they dry, so sanding now removes wood you will need later.", icon: "cloth" },
      { text: "Do not lay plastic sheeting over the boards", why: "It traps moisture against the surface and holds it there.", icon: "stack" },
    ],
    warning: "If the floor is over a crawlspace or lower level, check below for water before assuming the loss is limited to the room you can see.",
    image: "/services/pillars/water-reposition.jpg",
    imageAlt: "Air mover set over a hardwood floor during drying",
    stat: "1–3 wks",
    statLabel: "Typical drying time for wet hardwood, not days",
  },
  "crawlspace-drying": {
    eyebrow: "Before we arrive",
    heading: "Stay out of the",
    headingAccent: "space itself.",
    lede: "A flooded crawlspace carries real risks — confined space, standing water and live wiring in the same place. There is little to gain from going in.",
    doList: [
      { text: "Check for water at the access hatch only", why: "You can usually see the extent from the opening without entering.", icon: "door" },
      { text: "Isolate power to any circuits below the floor", why: "Crawlspace wiring and junctions often sit close to the ground.", icon: "plug" },
      { text: "Clear access to the hatch", why: "Faster access means equipment can be set on the first visit.", icon: "box" },
      { text: "Note any smell in the rooms above", why: "Odour upstairs is often the first sign of how long the space has been wet.", icon: "camera" },
    ],
    dontList: [
      { text: "Do not enter the crawlspace", why: "Confined spaces with standing water and live wiring are a genuine hazard.", icon: "footprint" },
      { text: "Do not run a household extension lead below", why: "Domestic leads and connections are not rated for wet ground contact.", icon: "plug" },
      { text: "Do not seal the vents to keep damp out", why: "Closing the only airflow the space has makes it hold moisture for longer.", icon: "fan" },
    ],
    warning: "Do not enter a crawlspace with standing water. If wiring, gas lines or a sagging floor above are involved, treat it as an emergency and call before anything else.",
    image: "/services/cutaway/skirting.jpg",
    imageAlt: "Skirting removed exposing a wet wall base",
    stat: "Upward",
    statLabel: "Air moves from the crawlspace into the rooms above",
  },
};


/**
 * Icon per cause. Every card previously showed the parent service's icon, so
 * four causes on a page rendered four identical glyphs — which is most of why
 * the row read as flat. Keyed on the cause string from services.ts.
 */
export type CauseIcon =
  | "pipe" | "snow" | "rust" | "joint"
  | "dishwasher" | "washer" | "fridge" | "heater"
  | "window" | "overflow" | "storm" | "drain"
  | "ground" | "roof" | "fire" | "spark" | "candle" | "wildfire"
  | "sewer" | "toilet" | "contaminated" | "droplet";

export const causeIcons: Record<string, CauseIcon> = {
  // Water damage
  "Supply-line failures": "pipe",
  "Roof and window intrusion": "roof",
  "Overflowing fixtures": "overflow",
  "Storm water entry": "storm",

  // Fire & smoke
  "Kitchen fires": "fire",
  "Electrical incidents": "spark",
  "Candle and fireplace smoke": "candle",
  "Wildfire smoke intrusion": "wildfire",

  // Sewage
  "Sewer backups": "sewer",
  "Toilet overflows": "toilet",
  "Drain-line failures": "drain",
  "Contaminated storm water": "contaminated",

  // Burst pipe
  "Failed supply lines": "pipe",
  "Frozen or aging pipes": "snow",
  "Corroded fittings": "rust",
  "Pipe-joint separation": "joint",

  // Appliance leak
  "Dishwasher supply leaks": "dishwasher",
  "Washing-machine hoses": "washer",
  "Refrigerator lines": "fridge",
  "Water-heater failures": "heater",

  // Hardwood
  "Dishwasher leaks": "dishwasher",
  "Plumbing failures": "pipe",
  "Window and door intrusion": "window",

  // Crawlspace
  "Plumbing leaks": "droplet",
  "Groundwater entry": "ground",
  "Drainage failures": "drain",
  "Storm-related intrusion": "storm",

  // Commercial, contents and reconstruction — pages not built yet, but the
  // map stays complete so nothing falls back to a generic glyph later.
  "Fire-suppression discharge": "droplet",
  "Restroom and drain backups": "drain",
  "Roof intrusion": "roof",
  "Mechanical-system leaks": "pipe",
  "Water migration": "droplet",
  "Smoke and soot exposure": "fire",
  "Construction access": "joint",
  "Contaminated-water losses": "contaminated",
  "Post-mitigation repairs": "joint",
  "Fire-damaged finishes": "fire",
  "Contaminated material removal": "contaminated",
  "Access opened for drying": "window",
};


/* ══════════════════════════════════════════════════════════════════════
   BATCH 3 — commercial, contents, reconstruction.
   These three do not share a subject, but they share a position: each is
   about what happens around and after the drying work rather than the loss
   itself. Each gets its own signature section.
   ══════════════════════════════════════════════════════════════════════ */

/** Commercial — which parts of a property keep operating during the work. */
export interface ContinuityZone {
  zone: string;
  status: "Open" | "Restricted" | "Closed";
  detail: string;
  access: string;
  /** Swatch colour on the legend, matching the plan. */
  tone: "open" | "restricted" | "closed";
}

export const continuityZones: ContinuityZone[] = [
  {
    zone: "Unaffected floors and suites",
    status: "Open",
    detail: "Areas outside the loss keep trading normally. Containment and equipment routes are planned to avoid them entirely.",
    access: "Normal trading hours",
    tone: "open",
  },
  {
    zone: "Shared corridors and lobbies",
    status: "Restricted",
    detail: "Equipment and hose runs cross these spaces, so they stay usable with managed routes and signage rather than being closed.",
    access: "Marked routes maintained",
    tone: "restricted",
  },
  {
    zone: "Affected tenancy or department",
    status: "Closed",
    detail: "Containment goes up and work proceeds without interruption. Staff and stock are relocated before anything is opened.",
    access: "Crew and management only",
    tone: "closed",
  },
  {
    zone: "Plant and service areas",
    status: "Restricted",
    detail: "Access is coordinated with building services so drying equipment and existing systems do not conflict.",
    access: "Scheduled with facilities",
    tone: "restricted",
  },
];




/** Expertise argument for each of the three. */
export const batch3Expertise: Record<string, Expertise> = {
  "commercial-water-damage": {
    eyebrow: "Where the expertise shows",
    heading: "The building keeps trading.",
    headingAccent: "The work fits around that.",
    lede: "A commercial loss is a scheduling problem as much as a drying one. The question is rarely how to dry it — it is how to dry it without closing the business.",
    pillars: [
      { title: "Zoned before equipment arrives", body: "The property is divided into what stays open, what is restricted and what is closed, so trading continues where it safely can.", icon: "clipboard", image: "", imageAlt: "" },
      { title: "Out-of-hours where it helps", body: "Noisy or disruptive stages are scheduled around operating hours rather than imposed on them.", icon: "gauge", image: "", imageAlt: "" },
      { title: "One point of contact", body: "Facilities, tenants and the carrier work from the same file and the same programme, not three versions of it.", icon: "shield", image: "", imageAlt: "" },
    ],
    callout: { label: "The call that matters", claim: "Close the area, or work around it?", body: "Closing a space is faster to dry and easier to document. Working around it costs more days but keeps revenue coming in. That trade-off is yours to make, so we price and schedule both rather than assuming." },
    proof: [
      { value: "Zoned", label: "Open, restricted and closed areas agreed up front" },
      { value: "Daily", label: "Progress reported to facilities and the carrier" },
      { value: "S500", label: "Same drying standard as any residential loss" },
    ],
    image: "/services/commercial/office-flood.jpg",
    imageAlt: "Water across an open-plan office floor with drying equipment running past workstations",
    imageTag: "Zoned so the building keeps trading",
  },
  "contents-protection": {
    eyebrow: "Where the expertise shows",
    heading: "The structure is replaceable.",
    headingAccent: "Most of what is in it is not.",
    lede: "Contents are usually the part people care about and the part that gets handled last. Moving them early protects them and clears access to the materials that need drying.",
    pillars: [
      { title: "Inventoried, not boxed and hoped", body: "Every item that leaves the property is photographed and listed, so nothing depends on anyone's memory weeks later.", icon: "clipboard", image: "", imageAlt: "" },
      { title: "Sorted by what water does to it", body: "Hard goods, textiles, documents and electronics each take a different route, because each deteriorates differently.", icon: "layers", image: "", imageAlt: "" },
      { title: "Moved before the work, not during", body: "Clearing contents first protects them from construction exposure and gives the crew the access they need.", icon: "shield", image: "", imageAlt: "" },
    ],
    callout: { label: "The call that matters", claim: "Restore it, or record it as a loss?", body: "Sentiment and replacement cost pull in different directions. We give you the condition and the realistic outcome for each category, and the decision stays yours rather than being made by default." },
    proof: [
      { value: "Item level", label: "Inventory recorded photograph by photograph" },
      { value: "Day one", label: "Documents and electronics handled first" },
      { value: "Yours", label: "The record stays with you, whatever is claimed" },
    ],
    image: "",
    imageAlt: "",
    imageTag: "Inventoried before anything moves",
  },
  reconstruction: {
    eyebrow: "Where the expertise shows",
    heading: "A repair is only as good as",
    headingAccent: "the record it is built from.",
    lede: "Reconstruction after a loss is not a renovation. The scope comes from what was documented as removed, which is what keeps the repair tied to the claim.",
    pillars: [
      { title: "Scoped from the mitigation file", body: "What was removed and why is already recorded, so the rebuild scope is evidence-based rather than estimated.", icon: "clipboard", image: "", imageAlt: "" },
      { title: "Dry before it closes up", body: "Readings confirm the assembly is at target before anything is covered. Closing a wet cavity hides the problem rather than fixing it.", icon: "gauge", image: "", imageAlt: "" },
      { title: "Matched, not approximated", body: "Finishes are matched to what was there so the repaired area does not announce itself across the room.", icon: "layers", image: "", imageAlt: "" },
    ],
    callout: { label: "The call that matters", claim: "Repair the area, or the whole room?", body: "A patch is cheaper but may never match. Taking a finish to its natural break costs more and reads as original. We state which applies rather than quoting the cheaper option and leaving you to discover the difference." },
    proof: [
      { value: "From file", label: "Scope written from the documented demolition" },
      { value: "At target", label: "Moisture verified before anything is closed" },
      { value: "Agreed", label: "Materials and finishes confirmed before work starts" },
    ],
    image: "",
    imageAlt: "",
    imageTag: "Scoped from the documented removal",
  },
};


/** Process sequences for batch 3. */
export const batch3Steps: Record<string, ProcessStep[]> = {
  "commercial-water-damage": [
    { title: "Call", accent: "us", copy: "Tell us what is wet and, more importantly, what has to keep operating.", when: "Day or night", icon: "phone" },
    { title: "Zone the", accent: "building", copy: "Open, restricted and closed areas are agreed with facilities and marked up before equipment lands.", when: "On arrival", icon: "clipboard" },
    { title: "Contain and", accent: "extract", copy: "Barriers and negative air seal the closed zone so the rest of the floor stays usable.", when: "First visit", icon: "shield" },
    { title: "Dry around", accent: "operations", copy: "Noisy and obstructive stages run out of hours, so daytime trading is not the thing that gives way.", when: "Days 3–7", icon: "wind" },
    { title: "Hand back in", accent: "stages", copy: "Each zone reopens as it reaches target rather than waiting on the slowest room, with the record going to the carrier as it goes.", when: "Rolling", icon: "house" },
  ],
  "contents-protection": [
    { title: "Call", accent: "us", copy: "Tell us what is in the affected area and what matters most.", when: "Day or night", icon: "phone" },
    { title: "Photograph and", accent: "list", copy: "Everything is recorded in place before a single item is moved.", when: "On arrival", icon: "clipboard" },
    { title: "Sort by", accent: "material", copy: "Hard goods, textiles, documents and electronics each take their own route.", when: "First visit", icon: "layers" },
    { title: "Clean or", accent: "store", copy: "Items are cleaned on site or taken off site, and the rest is stored clear of the work.", when: "Days 1–5", icon: "shield" },
    { title: "Return and", accent: "reconcile", copy: "Contents come back against the same list they left on.", when: "After the work", icon: "house" },
  ],
  reconstruction: [
    { title: "Call", accent: "us", copy: "Share the mitigation file if the drying was carried out by someone else.", when: "Any time", icon: "phone" },
    { title: "Scope from the", accent: "record", copy: "The repair scope is written from what the file shows was removed.", when: "First visit", icon: "clipboard" },
    { title: "Agree and", accent: "schedule", copy: "Scope, materials and finishes are confirmed before anything is ordered.", when: "Before work", icon: "gauge" },
    { title: "Rebuild the", accent: "structure", copy: "Framing and substrate go back and are checked dry before being closed.", when: "Weeks 1–3", icon: "layers" },
    { title: "Finish and", accent: "walk through", copy: "Trim, paint and flooring are matched, then reviewed with you before sign-off.", when: "Before handover", icon: "house" },
  ],
};

/**
 * The commercial phase strip. This is deliberately not a list of equal cards:
 * `pivot` marks the stage where the building divides into trading and
 * contained areas, which is the decision the whole page is about, and it gets
 * more space than the stages either side of it.
 */
export interface Phase {
  /** Short operational label, set in caps on the strip. */
  label: string;
  /** One line of annotation under the rule. */
  note: string;
  /** What is still trading. Plain text, not a badge. */
  state: string;
  /** The turning point gets the dominant treatment. */
  pivot?: boolean;
}

export const commercialPhases: Phase[] = [
  { label: "Call", note: "You tell us what is wet and what has to keep operating.", state: "Nothing closed" },
  { label: "Zone", note: "Open, restricted and contained areas are walked and marked up with facilities before any equipment is unloaded.", state: "Nothing closed" },
  { label: "Contain", note: "Barriers and negative pressure seal the affected area off. This is the point the building splits in two: the contained zone stops trading, and everything outside it carries on as normal.", state: "Contained area only", pivot: true },
  { label: "Dry", note: "Equipment runs inside the barrier. Noisy and obstructive work is scheduled out of hours.", state: "Contained area only" },
  { label: "Hand back", note: "Each area reopens as it reaches target rather than waiting on the slowest room.", state: "Reopening in stages" },
];

export interface PhaseClose {
  /** Section label above the statement. */
  label: string;
  /** The claim the strip has been building toward. */
  statement: string;
  /** What the claim costs, so it does not read as a slogan. */
  body: string;
  /** Who the decision belongs to. */
  note: string;
  /** The two ways a commercial loss can be run, drawn as plans. */
  options: {
    key: "shut" | "phased";
    label: string;
    /** Headline consequence, read against the other option. */
    outcome: string;
    /** Short annotations under the plan. */
    notes: string[];
  }[];
}

export const commercialPhaseClose: PhaseClose = {
  label: "The decision",
  statement: "The building keeps operating while the affected area is restored.",
  body: "Phasing costs more to run than shutting the floor: more barriers, more visits, more out-of-hours labour. It is worth it when the work it protects is worth more than the difference.",
  note: "We price and schedule both, so the choice is yours to make against your own numbers rather than ours.",
  options: [
    {
      key: "shut",
      label: "Close the floor",
      outcome: "Fastest to dry",
      notes: ["Whole floor stops trading", "Fewer barriers and visits", "Simplest to document"],
    },
    {
      key: "phased",
      label: "Contain and phase",
      outcome: "Work continues",
      notes: ["Only the affected area stops", "More barriers, more visits", "Out-of-hours where it helps"],
    },
  ],
};

/**
 * Per-service heading for the process section. The shared wording in the page
 * suits a homeowner following a repair; a business owner is tracking which
 * doors are open. Services absent here keep the shared heading.
 */
export interface StepsHeading {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  lede: string;
}

export const stepsHeading: Record<string, StepsHeading> = {
  "commercial-water-damage": {
    eyebrow: "What stays open, and when",
    heading: "Phased so the doors",
    headingAccent: "stay open.",
    lede: "Five stages, each with what is still trading while it happens. Closing the whole site is faster to dry, but it is rarely the cheaper option.",
  },
};

/**
 * Commercial runs its safety guidance as a single ordered checklist rather
 * than two lists, because the don'ts are not a later phase — each one is a
 * mistake made at the point the step above it is being carried out. Services
 * absent here keep the do/don't card.
 */
export interface HourOneAction {
  /** Short title, as the homepage cards carry. */
  title: string;
  /** One line of reason beneath it. */
  body: string;
  icon: SafetyIcon;
}

export interface HourOne {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  lede: string;
  warning: string;
  actions: HourOneAction[];
  /** Supporting photo, as the homepage pairs its list with a collage. */
  image: string;
  imageAlt: string;
  /** Caption on the photo. */
  imageTag: string;
}

export const hourOne: Record<string, HourOne> = {
  "commercial-water-damage": {
    eyebrow: "First response",
    heading: "Your liability starts",
    headingAccent: "before we do.",
    lede: "A commercial loss is an incident before it is a repair. Your exposure turns on what you did in the first hour, and on whether you can show it afterwards.",
    warning: "If water has reached a distribution board, a lift shaft or a plant room, do not attempt isolation yourself. Call the fire service and keep everyone clear.",
    actions: [
      { title: "Cordon the area, note the time", body: "The cordon keeps people out. The time against it is what shows you acted once you knew.", icon: "shield" },
      { title: "Isolate power if you safely can", body: "Commercial fit-outs run power through floor boxes and skirting trunking at water level.", icon: "plug" },
      { title: "Photograph before anything moves", body: "Undisturbed photographs decide whether the adjuster accepts the scope or disputes it.", icon: "camera" },
      { title: "Keep staff out of the clean-up", body: "An employee injured doing unplanned work is your liability rather than the insurer's.", icon: "vacuum" },
      { title: "Leave the HVAC off", body: "Ducts carry humidity into tenancies that were never affected, turning one claim into several.", icon: "fan" },
      { title: "Strip out nothing yet", body: "Material removed before it is recorded cannot be evidenced, and cannot be claimed for.", icon: "stack" },
    ],
    image: "/services/heroes/commercial-hero-portrait.jpg",
    imageAlt: "Saturated office carpet with tiles lifted and stacked against a desk, workstations pushed aside and nobody in the room",
    imageTag: "The first hour decides what the claim can show",
  },
};

/** Contents protection page, laid out to its own mock. */
export interface ContentsPage {
  /** The three questions every customer asks first. */
  peace: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    body: string;
    items: { q: string; a: string; icon: "box" | "return" | "shield" }[];
  };
  /** Four stages, shown as a connected row. */
  process: {
    eyebrow: string;
    heading: string;
    lede: string;
    steps: { title: string; body: string; icon: "clipboard" | "pack" | "clean" | "truck" }[];
  };
  /** What we handle, as a photo grid. */
  materials: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    lede: string;
    cta: string;
    items: { title: string; body: string; image: string; imageAlt: string }[];
  };
  /** What the owner can do before the crew arrives. */
  before: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    lede: string;
    image: string;
    imageAlt: string;
    steps: { title: string; body: string }[];
  };
}

export const contentsPage: ContentsPage = {
  peace: {
    eyebrow: "Peace of mind",
    heading: "Your belongings are part of your story.",
    headingAccent: "We help protect what matters.",
    body: "When water, fire or other damage affects your home, we carefully inventory, pack, clean and store your belongings. Our team uses proven methods and detailed documentation so your things are protected and easy to get back when the work is complete.",
    items: [
      { q: "Does everything have to leave the home?", a: "Not always. We assess each room and remove only the items that need off-site cleaning or storage. Many things can be protected safely in place.", icon: "box" },
      { q: "How do I get my belongings back?", a: "Every item is photographed, labelled and tracked. When your home is ready, we return them and put them back where they belong.", icon: "return" },
      { q: "What can be saved?", a: "Most items can be cleaned and restored, including furniture, clothing, electronics, documents and personal effects. We tell you what is salvageable and what is not.", icon: "shield" },
    ],
  },
  process: {
    eyebrow: "How it works",
    heading: "A careful process from start to finish.",
    lede: "Every item takes a route, and the route is recorded.",
    steps: [
      { title: "Inventory and document", body: "We photograph, label and record your items so nothing goes missing.", icon: "clipboard" },
      { title: "Pack and protect", body: "Items are packed with the right materials for safe handling and transport.", icon: "pack" },
      { title: "Clean and restore", body: "Your things are cleaned and treated with methods matched to each material.", icon: "clean" },
      { title: "Store and return", body: "We store items securely while your home is restored, then return and place them.", icon: "truck" },
    ],
  },
  materials: {
    eyebrow: "Materials we handle",
    heading: "Different materials.",
    headingAccent: "Proven care.",
    lede: "From everyday items to irreplaceable keepsakes, we use the right cleaning method for each type of material.",
    cta: "See our full contents process",
    items: [
      { title: "Upholstery and furniture", body: "Sofas, chairs, mattresses and other upholstered items.", image: "/services/contents/upholstery.jpg", imageAlt: "Upholstered armchair being cleaned" },
      { title: "Rugs and textiles", body: "Area rugs, drapery, clothing and other fabric items.", image: "/services/contents/textiles.jpg", imageAlt: "Rolled area rugs stacked for cleaning" },
      { title: "Documents and keepsakes", body: "Photographs, important papers, heirlooms and personal items.", image: "/services/contents/documents.jpg", imageAlt: "Framed photograph and documents set out to dry" },
      { title: "Household goods", body: "Dishes, glassware, decor and everyday items.", image: "/services/contents/household.jpg", imageAlt: "Dishes and glassware laid out after cleaning" },
      { title: "Electronics", body: "We assess and, where possible, clean and restore electronics.", image: "/services/contents/electronics.jpg", imageAlt: "Television and small electronics on a bench for assessment" },
      { title: "Specialty items", body: "Toys, artwork, collectibles, musical instruments and more.", image: "/services/contents/specialty.jpg", imageAlt: "Soft toys and collectibles sorted into trays" },
    ],
  },
  before: {
    eyebrow: "Before we arrive",
    heading: "A few simple steps",
    headingAccent: "can help.",
    lede: "If it is safe to do so, these steps make the contents protection process smoother and faster.",
    image: "/services/contents/before-boxes.jpg",
    imageAlt: "Labelled moving boxes stacked in a cleared room",
    steps: [
      { title: "Focus on safety first", body: "Do not enter areas with significant damage, electrical hazards or structural concerns." },
      { title: "Point out high-priority items", body: "Tell us about items of special value, sentimental items, or anything you are especially concerned about." },
      { title: "Keep things as they are", body: "Avoid moving or cleaning items yourself, which can sometimes cause further damage." },
    ],
  },
};

/** Reconstruction page, laid out to its own mock. */
export interface ReconPage {
  /** Copy and a ticked list beside a photo cluster. */
  intro: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    body: string;
    cardTitle: string;
    checks: string[];
    image: string;
    imageAlt: string;
    insetA: string;
    insetAAlt: string;
    insetB: string;
    insetBAlt: string;
  };
  /** Four stages from record to walkthrough. */
  scope: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    lede: string;
    steps: { title: string; body: string; icon: "clipboard" | "file" | "hammer" | "check" }[];
  };
  /** The three questions asked most. */
  answers: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    items: { q: string; a: string; icon: "clock" | "shield" | "home" }[];
  };
  /** What the work actually involves, as a photo grid. */
  work: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    items: { n: string; title: string; body: string; image: string; imageAlt: string }[];
  };
  /** Material selection expectations. */
  materials: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    body: string;
    checks: string[];
    image: string;
    imageAlt: string;
  };
  /** Closing band above the FAQ. */
  band: { eyebrow: string; heading: string; headingAccent: string; body: string; cta: string };
}

export const reconPage: ReconPage = {
  intro: {
    eyebrow: "From mitigation to complete",
    heading: "Reconstruction brings your property",
    headingAccent: "back to normal.",
    body: "After water is removed and the structure is dry, damaged materials that were removed are rebuilt. We use the documentation from mitigation to guide an accurate scope and complete the work with quality craftsmanship and clear communication.",
    cardTitle: "Renewed Documentation",
    checks: [
      "Photos and measurements",
      "Materials removed",
      "Before/after records",
      "Scope aligned with your insurer",
    ],
    image: "/services/reconstruction/intro-main.jpg",
    imageAlt: "Technician fitting new drywall to a stripped wall",
    insetA: "/services/reconstruction/intro-inset-a.jpg",
    insetAAlt: "Living room finished after reconstruction",
    insetB: "/services/reconstruction/intro-inset-b.jpg",
    insetBAlt: "Dining area finished after reconstruction",
  },
  scope: {
    eyebrow: "A clear path forward",
    heading: "The rebuild scope comes from",
    headingAccent: "the demolition record.",
    lede: "Everything we removed is documented. That record becomes the roadmap for reconstruction, so nothing is missed and you can see exactly what's being rebuilt.",
    steps: [
      { title: "Documented removal", body: "Photos, measurements and notes from mitigation show what was taken out.", icon: "clipboard" },
      { title: "Reviewed repair scope", body: "We turn the documentation into a detailed scope of work and a plan that your insurer can approve.", icon: "file" },
      { title: "Reconstruction work", body: "Our team rebuilds with quality materials and craftsmanship — drywall, trim, paint, flooring and more.", icon: "hammer" },
      { title: "Final walkthrough", body: "We review the work with you to make sure everything is complete and you're satisfied.", icon: "check" },
    ],
  },
  answers: {
    eyebrow: "Common questions",
    heading: "Straight answers, so you",
    headingAccent: "know what to expect.",
    items: [
      { q: "When does reconstruction start?", a: "Reconstruction begins after drying goals are met and the affected areas are stable. This ensures new materials are installed in a dry, healthy environment.", icon: "clock" },
      { q: "Who pays for reconstruction?", a: "In most cases, reconstruction is covered by your homeowner's insurance. We work directly with your insurance company to scope and document the work.", icon: "shield" },
      { q: "Will it match my home?", a: "We do our best to match existing finishes, but exact matches aren't always possible for older materials. We'll review options with you before work begins so there are no surprises.", icon: "home" },
    ],
  },
  work: {
    eyebrow: "What we rebuild",
    heading: "Common",
    headingAccent: "reconstruction work.",
    items: [
      { n: "01", title: "Trim and paint", body: "Baseboards, door casings, and trim are reinstalled and finished. We prime and paint to match existing colors as closely as possible.", image: "/services/reconstruction/work-trim.jpg", imageAlt: "Freshly painted room with new baseboards fitted" },
      { n: "02", title: "Drywall and insulation replacement", body: "We install new drywall, replace insulation where needed, and prepare walls and ceilings for a smooth, durable finish.", image: "/services/reconstruction/work-drywall.jpg", imageAlt: "New drywall sheets taped and ready for finishing" },
      { n: "03", title: "Flooring reset or replacement", body: "We reinstall flooring that was removed or replace it if needed, including hardwood, laminate, LVP, tile, or carpet.", image: "/services/reconstruction/work-flooring.jpg", imageAlt: "New plank flooring being laid in a restored room" },
      { n: "04", title: "Finish carpentry and punch list", body: "We handle the final details — from adjustments, hardware caulking, touch-ups and a full walkthrough to make sure everything is complete.", image: "/services/reconstruction/work-carpentry.jpg", imageAlt: "Carpenter fitting door trim during finishing work" },
    ],
  },
  materials: {
    eyebrow: "Before any work begins",
    heading: "What to expect before",
    headingAccent: "materials are selected.",
    body: "We review the scope, discuss finish options, and confirm details with you and your insurer before orders are placed. This helps avoid delays and ensures we're aligned on the look, quality and any potential limitations.",
    checks: [
      "Review the scope and finish options with you",
      "Discuss matching finishes for older materials",
      "Confirm homeowner and/or insurer approval when required",
      "Order materials once everything is approved",
      "Keep you updated on timelines and any changes",
    ],
    image: "/services/reconstruction/materials.jpg",
    imageAlt: "Flooring and paint samples laid out for selection",
  },
  band: {
    eyebrow: "Ready to rebuild?",
    heading: "Let's complete",
    headingAccent: "the work.",
    body: "From documented scope to final walkthrough, we make the reconstruction process clear and stress-free.",
    cta: "Get an estimate",
  },
};

/** Safety guidance for batch 3. */
export const batch3Safety: Record<string, SafetyGuide> = {
  "contents-protection": {
    eyebrow: "Before we arrive",
    heading: "Lift what you can,",
    headingAccent: "leave the rest.",
    lede: "A few minutes of lifting saves items that would otherwise be written off. Anything heavy or fragile is better left where it is.",
    doList: [
      { text: "Lift small items off wet floors", why: "Most contents damage happens in the first hours of contact, not over days.", icon: "lift" },
      { text: "Open drawers and cabinet doors", why: "Airflow into closed furniture slows the damage to what is inside it.", icon: "door" },
      { text: "Move documents and electronics out first", why: "These deteriorate fastest and are the hardest to restore once they are wet.", icon: "box" },
      { text: "Photograph rooms before you move anything", why: "The record of where things were supports what is claimed later.", icon: "camera" },
    ],
    dontList: [
      { text: "Do not stack wet items on dry ones", why: "Water transfers downward and doubles the number of affected items.", icon: "stack" },
      { text: "Do not use a domestic hairdryer on electronics", why: "Heat drives moisture further into the board and can finish the item off.", icon: "fan" },
      { text: "Do not throw anything away yet", why: "Items disposed of before they are recorded cannot be claimed.", icon: "vacuum" },
    ],
    warning: "Do not handle contents that have been in contaminated water. Those items need documenting rather than salvaging, and direct contact carries a health risk.",
    image: "",
    imageAlt: "",
    stat: "Hours",
    statLabel: "How long before wet contents damage becomes permanent",
  },
  reconstruction: {
    eyebrow: "Before work starts",
    heading: "Nothing closes up",
    headingAccent: "until it reads dry.",
    lede: "Reconstruction is the stage where a rushed decision gets buried behind a finish. These are the checks worth insisting on.",
    doList: [
      { text: "Ask for the moisture readings before closing", why: "A wall that is closed wet will not dry, and the problem reappears months later.", icon: "camera" },
      { text: "Confirm the scope matches the demolition record", why: "The repair should rebuild what was removed, no more and no less.", icon: "clipboard" },
      { text: "Agree finishes and materials in writing", why: "Matching an existing finish is far easier before the order is placed.", icon: "box" },
      { text: "Walk the space before sign-off", why: "Small defects are quick to correct while the crew and materials are still on site.", icon: "door" },
    ],
    dontList: [
      { text: "Do not accept a close-up without readings", why: "Visual dryness and material dryness are not the same thing.", icon: "stack" },
      { text: "Do not approve a patch where a break is needed", why: "A repair that stops mid-wall will show in certain light however well it is done.", icon: "cloth" },
      { text: "Do not let new finishes go on a wet substrate", why: "Paint and flooring fail from behind, and the second repair costs more than the first.", icon: "fan" },
    ],
    warning: "If the loss involved fire, contaminated water or a pre-1978 property, confirm the clearance and compliance steps were completed before reconstruction begins.",
    image: "",
    imageAlt: "",
    stat: "Verified",
    statLabel: "Moisture confirmed at target before anything is closed",
  },
};


/**
 * Replaces "related causes of loss" on the batch 3 pages. Causes do not apply
 * here — contents damage is a consequence rather than a cause, and
 * reconstruction starts where the loss has already happened. Each page gets
 * the question its reader actually has instead.
 */
export interface ContextItem {
  label: string;
  body: string;
  icon: "building" | "users" | "clipboard" | "shield" | "check" | "clock" | "alert" | "file" | "layers" | "gauge" | "link" | "box";
}

export interface ContextBlock {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  lede: string;
  items: ContextItem[];
}

export const batch3Context: Record<string, ContextBlock> = {
  "commercial-water-damage": {
    eyebrow: "Who signs off",
    heading: "Four parties.",
    headingAccent: "One file.",
    lede: "Commercial work stalls on approvals, not on drying. Everyone who has to agree something works from the same record.",
    items: [
      { label: "Building management", body: "Access, out-of-hours permissions and equipment routes, agreed before the first unit arrives.", icon: "building" },
      { label: "Tenants and staff", body: "Which areas stay usable, and when. Clear zoning stops a whole floor being written off.", icon: "users" },
      { label: "The loss adjuster", body: "Scope and readings arrive as the work happens, not in a report three weeks later.", icon: "clipboard" },
      { label: "Your broker", body: "The same documented file, in the format carriers expect.", icon: "file" },
    ],
  },
  "contents-protection": {
    eyebrow: "What usually survives",
    heading: "Material decides the outcome.",
    headingAccent: "Not value.",
    lede: "A cheap sealed item often survives what destroys an expensive porous one. Here is the realistic picture before anything moves.",
    items: [
      { label: "Usually restorable", body: "Sealed surfaces, solid timber, metal, ceramics, glass.", icon: "check" },
      { label: "Often restorable", body: "Upholstery, rugs and clothing — if they leave the property quickly rather than sitting in a wet room.", icon: "layers" },
      { label: "Depends on speed", body: "Documents, photographs, electronics. Day one matters more than the week after it.", icon: "clock" },
      { label: "Recorded as a loss", body: "Porous items in contaminated water. Documented in full, because they cannot be made safe.", icon: "alert" },
    ],
  },
  reconstruction: {
    eyebrow: "Before you appoint anyone",
    heading: "Three things worth",
    headingAccent: "asking about.",
    lede: "Whoever rebuilds, these are the questions that decide whether the repair holds up — and whether it stays tied to the claim.",
    items: [
      { label: "Where does the scope come from?", body: "A documented demolition record beats an estimate of what a room that size usually needs.", icon: "clipboard" },
      { label: "Who confirms it is dry?", body: "Closing a cavity without readings hides the problem. Ask what the moisture log shows before anything is covered.", icon: "gauge" },
      { label: "One file or two?", body: "Mitigation and repair on separate files leaves a gap in the middle where responsibility is unclear.", icon: "link" },
    ],
  },
};
