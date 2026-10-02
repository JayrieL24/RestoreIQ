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
 * docs/service-image-prompts.md — deliberately plain job photos rather than
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
  pillars: { title: string; body: string; icon: "gauge" | "scan" | "clipboard" | "shield" | "wind" | "layers" }[];
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
      { title: "Moisture mapping, not guessing", body: "Non-invasive meters and thermal imaging trace water through subfloor, wall cavity and insulation before a single air mover is placed.", icon: "scan" },
      { title: "Readings against a control", body: "Every target is set from an unaffected area in the same building, so dry means dry for that property — not a number from a chart.", icon: "gauge" },
      { title: "Daily reposition, not set-and-leave", body: "If a monitored point stops falling, the equipment moves. Running fans at a stalled reading bills days without drying anything.", icon: "wind" },
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
      { title: "Residue identified before cleaning", body: "Dry smoke, wet smoke, protein and fuel-oil residues each behave differently. The surface is tested before a method is chosen.", icon: "scan" },
      { title: "Room-by-room scope", body: "Air movement carries residue far past the burn. The inspection follows the airflow, including closets, HVAC runs and voids.", icon: "layers" },
      { title: "Odour traced to source", body: "Odour is held in materials, not in the air. Sealing or deodorising before the source is removed only buys a few weeks.", icon: "shield" },
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
      { title: "Category confirmed on arrival", body: "Water is classified under IICRC S500 before scoping. The category — not the volume — decides what stays and what goes.", icon: "clipboard" },
      { title: "Containment before removal", body: "Barriers and negative air go up first. Moving material before containment pushes contaminants into rooms that were clean.", icon: "shield" },
      { title: "Documented removals", body: "Every removed material is photographed and logged, so the scope is defensible to the carrier and to you.", icon: "gauge" },
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
