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
  | "window" | "box";

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
/** A highlight box on the cutaway, as percentages of the image box. */
export interface HouseBox { left: number; top: number; width: number; height: number }

/** Named areas of the cutaway, used for the caption under the diagram. */
export type HouseRegion =
  | "ceiling" | "wall" | "floor" | "subfloor" | "crawl" | "cabinet"
  | "kickboard" | "cabinetBase" | "appliance" | "wallRight" | "plate"
  | "boards" | "skirting" | "batts" | "piers" | "ground" | "joists";

export interface HiddenPath {
  zone: string;
  path: string;
  tell: string;
  reach: string;
  /** Which part of the cutaway highlights when this path is selected. */
  region: HouseRegion;
  /** Precise highlight boxes for this path, measured on the render. */
  boxes: HouseBox[];
}

export const hiddenPaths: Record<string, HiddenPath[]> = {
  "burst-pipe-cleanup": [
    { zone: "Wall cavity", path: "Water runs down the inside face of the drywall and soaks the bottom plate and insulation before anything shows on the surface.", tell: "Paint bubbling low on the wall, or a tide line above the baseboard.", reach: "Full wall height", region: "wall", boxes: [{ left: 6.1, top: 33.6, width: 7.6, height: 34.5 }, { left: 86.3, top: 33.6, width: 7.6, height: 34.5 }] },
    { zone: "Under the floor", path: "It tracks along the subfloor under carpet, vinyl or laminate, following the slope of the slab rather than the shape of the room.", tell: "Carpet darker in patches that do not match where the pipe failed.", reach: "Two rooms or more", region: "subfloor", boxes: [{ left: 8.2, top: 69.9, width: 82.8, height: 4.7 }] },
    { zone: "Through the ceiling", path: "A failure on an upper floor saturates the ceiling cavity and runs along joists before finding a light fitting or seam to come through.", tell: "A stain that appears away from the leak, often at a downlight.", reach: "The length of a joist bay", region: "ceiling", boxes: [{ left: 8.2, top: 30.4, width: 82.8, height: 3.2 }] },
    { zone: "Into adjoining rooms", path: "Bottom plates are continuous between rooms, so water wicks under the wall line into spaces that were never near the burst.", tell: "A damp skirting board on the far side of a shared wall.", reach: "Wherever the plate runs", region: "plate", boxes: [{ left: 6.1, top: 64.5, width: 7.6, height: 4.2 }, { left: 86.3, top: 64.5, width: 7.6, height: 4.2 }] },
  ],
  "appliance-leak-cleanup": [
    { zone: "Behind the kickboard", path: "A slow supply-line drip collects in the cavity under the cabinet base, where there is no airflow and nothing to see from the room.", tell: "A musty smell near the unit with no visible water.", reach: "The full cabinet run", region: "kickboard", boxes: [{ left: 62.2, top: 66.6, width: 27.1, height: 1.6 }] },
    { zone: "Cabinet base and sides", path: "Particleboard wicks upward from the base. It swells, the laminate lifts at the edge, and the damage is permanent before it is noticed.", tell: "A swollen or lifting edge at the bottom of a cabinet door.", reach: "Up to 150mm of upward wicking", region: "cabinetBase", boxes: [{ left: 62.6, top: 57, width: 26.8, height: 9.6 }] },
    { zone: "Under the appliance", path: "Water spreads across the floor beneath the unit and sits against the subfloor, out of reach without pulling the appliance.", tell: "Nothing at all until the floor covering reacts.", reach: "The appliance footprint and beyond", region: "appliance", boxes: [{ left: 68.8, top: 51.6, width: 5.5, height: 18.4 }, { left: 83.6, top: 37.2, width: 7.5, height: 35.5 }] },
    { zone: "Into the wall behind", path: "Where the supply line enters the wall, water follows the pipe back into the cavity and down to the plate.", tell: "A damp patch on the opposite side of the wall.", reach: "Down to the floor plate", region: "wallRight", boxes: [{ left: 91, top: 40, width: 3.5, height: 28.1 }] },
  ],
  "hardwood-floor-drying": [
    { zone: "Between board and subfloor", path: "Water sits in the gap under the boards, where the surface is sealed and cannot release moisture upward.", tell: "Boards that look dry but read wet on a meter.", reach: "Well past the visible edge", region: "subfloor", boxes: [{ left: 8.2, top: 68.1, width: 82.8, height: 1.5 }] },
    { zone: "Along the board seams", path: "It travels lengthways down the tongue-and-groove joints, moving further along the grain than across it.", tell: "Cupping that runs in a line rather than a patch.", reach: "The full length of a board run", region: "boards", boxes: [{ left: 8.2, top: 66.4, width: 82.8, height: 1.7 }] },
    { zone: "Into the subfloor", path: "Plywood or OSB absorbs and holds moisture, then releases it back up into the boards for weeks after the surface looks dry.", tell: "Boards that re-cup after drying appears finished.", reach: "The depth of the subfloor", region: "subfloor", boxes: [{ left: 8.2, top: 69.9, width: 82.8, height: 4.7 }] },
    { zone: "Under the skirting", path: "The expansion gap at the perimeter channels water under the skirting board and into the wall base.", tell: "A dark line along the edge of the floor.", reach: "The room perimeter", region: "skirting", boxes: [{ left: 11, top: 60.5, width: 4, height: 7 }, { left: 85, top: 60.5, width: 4, height: 7 }] },
  ],
  "crawlspace-drying": [
    { zone: "Ground and vapour barrier", path: "Water pools on the plastic sheeting rather than draining, and sits there evaporating into the space above.", tell: "Condensation on ducts or the underside of the subfloor.", reach: "Wherever the ground falls", region: "ground", boxes: [{ left: 4, top: 86, width: 92, height: 6.7 }] },
    { zone: "Joists and subfloor", path: "Rising humidity soaks the underside of the floor structure, which never dries because the space has no airflow.", tell: "Cupping or soft spots in the floor above.", reach: "The whole footprint", region: "joists", boxes: [{ left: 8.2, top: 69.9, width: 82.8, height: 4.7 }] },
    { zone: "Insulation batts", path: "Batts hold water, sag away from the joists and lose their value, then stay wet long after the standing water is gone.", tell: "Insulation hanging down or on the ground.", reach: "Every bay that got wet", region: "batts", boxes: [{ left: 8.2, top: 71, width: 82.8, height: 3.6 }] },
    { zone: "Piers and framing", path: "Timber in contact with damp ground wicks moisture upward into the structural members.", tell: "Dark staining at the base of posts and piers.", reach: "Up the full pier height", region: "piers", boxes: [{ left: 11, top: 78, width: 5.5, height: 11 }, { left: 34, top: 78, width: 5.5, height: 11 }, { left: 58, top: 78, width: 5.5, height: 11 }, { left: 81, top: 78, width: 5.5, height: 11 }] },
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
      { title: "Traced, not assumed", body: "Thermal imaging and meters follow the water through cavities and under flooring before any equipment is placed.", icon: "scan", image: "/services/pillars/water-mapping.jpg", imageAlt: "Technician holding a moisture meter against a wall beside a baseboard" },
      { title: "Opened only where needed", body: "Access holes go where the readings say, not along the whole wall. Less opened means less to put back.", icon: "layers", image: "/services/pillars/water-control.jpg", imageAlt: "Moisture meter display being read in a dry, unaffected room" },
      { title: "Dried to a target", body: "Equipment runs until readings match an unaffected control area in the same building, not for a fixed number of days.", icon: "gauge", image: "/services/pillars/water-reposition.jpg", imageAlt: "Technician moving an air mover to a new position against a wall" },
    ],
    callout: { label: "The call that matters", claim: "Open it, or dry it closed?", body: "Drying a closed cavity is slower but keeps the wall intact. It only works if readings prove it is actually drying — which is why the readings are logged rather than estimated." },
    proof: [
      { value: "Day 1", label: "Every wet assembly mapped before equipment goes in" },
      { value: "Daily", label: "Readings logged against a control area" },
      { value: "S500", label: "Drying standard the targets follow" },
    ],
    image: "/services/pillars/water-mapping.jpg",
    imageAlt: "Moisture meter held against a wet baseboard",
    imageTag: "Mapped before anything is opened",
  },
  "appliance-leak-cleanup": {
    eyebrow: "Where the expertise shows",
    heading: "Small leak, long time.",
    headingAccent: "That is the hard part.",
    lede: "Appliance failures are rarely dramatic. They drip into a cavity nobody can see, for weeks, and the damage is done by the time anything shows in the room.",
    pillars: [
      { title: "Checked behind, not just under", body: "The kickboard cavity and the wall behind the supply line are inspected, because that is where the water actually sits.", icon: "scan", image: "/services/pillars/water-mapping.jpg", imageAlt: "Technician checking moisture behind a cabinet base" },
      { title: "Cabinets dried in place where possible", body: "Drying a cabinet run beats replacing it, but only if the base has not already swollen. Readings decide which it is.", icon: "layers", image: "/services/pillars/water-control.jpg", imageAlt: "Moisture reading taken in an unaffected area as a control" },
      { title: "Targeted airflow", body: "Small injected airflow into the cavity dries the void without dismantling the kitchen around it.", icon: "wind", image: "/services/pillars/water-reposition.jpg", imageAlt: "Air mover repositioned to dry a cabinet cavity" },
    ],
    callout: { label: "The call that matters", claim: "Save the cabinet run, or replace it?", body: "A particleboard base that has swollen will not recover, and drying it wastes days. One that is wet but intact usually does. We say which in writing rather than guessing." },
    proof: [
      { value: "Weeks", label: "How long a slow leak often runs before it shows" },
      { value: "150mm", label: "Typical upward wicking into a cabinet base" },
      { value: "In place", label: "Cabinets dried rather than removed where readings allow" },
    ],
    image: "/services/pillars/water-mapping.jpg",
    imageAlt: "Moisture check behind a kitchen cabinet",
    imageTag: "The cavity, not the floor",
  },
  "hardwood-floor-drying": {
    eyebrow: "Where the expertise shows",
    heading: "Wood moves twice.",
    headingAccent: "Dry it wrong and it moves again.",
    lede: "Wet hardwood cups as it absorbs and crowns as it dries. Drying too fast locks the deformation in permanently, which is why the rate matters as much as the result.",
    pillars: [
      { title: "Dried from underneath", body: "Mats pull moisture up through the boards rather than blowing air across a sealed surface, which does almost nothing.", icon: "wind", image: "/services/pillars/water-reposition.jpg", imageAlt: "Drying equipment set over a hardwood floor" },
      { title: "Rate controlled, not rushed", body: "Too aggressive and the face dries while the core stays wet, so the boards crown and the finish checks.", icon: "gauge", image: "/services/pillars/water-control.jpg", imageAlt: "Moisture meter reading taken on a hardwood board" },
      { title: "Subfloor read separately", body: "Boards can reach target while the subfloor beneath is still wet and ready to push moisture back up into them.", icon: "scan", image: "/services/pillars/water-mapping.jpg", imageAlt: "Moisture meter used on subfloor beneath lifted boards" },
    ],
    callout: { label: "The call that matters", claim: "Dry it, or replace it?", body: "Boards that have cupped can usually be saved and sanded flat once dry. Boards that have crowned, delaminated or lifted at the tongue generally cannot — and drying them anyway only delays the answer." },
    proof: [
      { value: "Weeks", label: "Typical drying time for wet hardwood, not days" },
      { value: "Two reads", label: "Boards and subfloor measured separately" },
      { value: "Sand after", label: "Flattening happens once readings reach target" },
    ],
    image: "/services/pillars/water-control.jpg",
    imageAlt: "Moisture reading taken on a hardwood floor",
    imageTag: "Boards and subfloor, read separately",
  },
  "crawlspace-drying": {
    eyebrow: "Where the expertise shows",
    heading: "Out of sight is not",
    headingAccent: "out of the building.",
    lede: "A wet crawlspace does not stay in the crawlspace. The air under the house moves up into it, carrying moisture into the floor structure and the rooms above.",
    pillars: [
      { title: "Water out before air in", body: "Standing water is removed and the ground sheeting corrected first — drying a space that is still collecting water achieves nothing.", icon: "scan", image: "/services/pillars/water-mapping.jpg", imageAlt: "Inspection of a damp crawlspace ground surface" },
      { title: "Wet insulation comes out", body: "Saturated batts hold moisture indefinitely and will not dry in place. Leaving them is the most common reason a crawlspace stays damp.", icon: "layers", image: "/services/pillars/water-control.jpg", imageAlt: "Moisture reading taken beneath a floor structure" },
      { title: "Structure read from below", body: "Joists and subfloor are metered from underneath, where the moisture actually is, rather than from the room above.", icon: "gauge", image: "/services/pillars/water-reposition.jpg", imageAlt: "Drying equipment positioned in a crawlspace" },
    ],
    callout: { label: "The call that matters", claim: "Dry it, or fix why it is wet?", body: "Drying a crawlspace that floods every winter buys a season. If the cause is drainage or grading, that gets stated plainly — even though it is outside what a drying job covers." },
    proof: [
      { value: "Upward", label: "Air moves from the crawlspace into the house above" },
      { value: "Removed", label: "Wet insulation taken out rather than dried in place" },
      { value: "From below", label: "Joists and subfloor metered where the moisture is" },
    ],
    image: "/services/pillars/water-reposition.jpg",
    imageAlt: "Drying equipment working beneath a floor structure",
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
    image: "/services/pillars/water-mapping.jpg",
    imageAlt: "Moisture meter held against a wet baseboard",
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
    imageAlt: "Moisture meter reading taken near a cabinet base",
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
    image: "/services/pillars/water-control.jpg",
    imageAlt: "Moisture reading taken on a hardwood board",
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
    image: "/services/pillars/water-reposition.jpg",
    imageAlt: "Drying equipment positioned beneath a floor structure",
    stat: "Upward",
    statLabel: "Air moves from the crawlspace into the rooms above",
  },
};
