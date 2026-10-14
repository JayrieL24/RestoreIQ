type ResultCard = { label: string; value: string; note: string };
type ServiceResult = { title: string; accent: string; badge: string; cards: [ResultCard, ResultCard, ResultCard] };

export const serviceResultsContext: Record<string, string> = {
  "water-damage-restoration": "Repeat checks across walls, floors, and hidden spaces guide equipment adjustments and confirm readiness for the next step.",
  "fire-smoke-damage": "Recorded test results guide cleaning, with residue and odour checks highlighting areas needing further attention before repairs.",
  "sewage-cleanup": "Removal records and final cleaning checks give you a clear account of the work before handover.",
  "burst-pipe-cleanup": "Repeat cavity readings show where access is needed and help confirm when adjoining materials are ready for repairs.",
  "appliance-leak-cleanup": "Checks beneath the unit and along cabinets help confirm the subfloor and cavity are ready for refitting.",
  "hardwood-floor-drying": "Comparisons with unaffected boards guide drying adjustments and help assess whether refinishing or replacement is needed.",
  "crawlspace-drying": "Repeat joist and subfloor readings guide drying adjustments and highlight anything needing attention before the final inspection.",
  "commercial-water-damage": "Recorded checks give your facilities team a clearer view of drying progress, access restrictions, and handover decisions.",
  "contents-protection": "Each item stays linked to its inventory entry, so returned belongings can be checked against the original list.",
  reconstruction: "Checks throughout the repair sequence and a final walkthrough help you review finishes and discuss remaining details.",
};

/** Service checkpoints, rather than simulated live measurements or arrival promises. */
export const serviceResults: Record<string, ServiceResult> = {
  "water-damage-restoration": {
    title: "Drying done", accent: "with precision.", badge: "Moisture monitoring",
    cards: [
      { label: "Moisture levels", value: "Measured", note: "Compared with unaffected materials" },
      { label: "Drying progress", value: "Tracked", note: "Readings guide equipment adjustments" },
      { label: "Completion", value: "Verified", note: "Drying targets checked before handover" },
    ],
  },
  "fire-smoke-damage": {
    title: "Cleaning guided", accent: "by test results.", badge: "Surface-by-surface testing",
    cards: [
      { label: "Surface testing", value: "Material by material", note: "A test clean sets the method" },
      { label: "Residue removal", value: "Checked", note: "Cleaning follows the surface response" },
      { label: "Final review", value: "Odour check", note: "Air and surfaces assessed before sealing" },
    ],
  },
  "sewage-cleanup": {
    title: "Cleanup controlled", accent: "at every step.", badge: "Containment and verification",
    cards: [
      { label: "Water category", value: "Confirmed", note: "Classification sets the cleanup scope" },
      { label: "Affected materials", value: "Documented", note: "Removal and cleaning decisions recorded" },
      { label: "Post-clean review", value: "Verified", note: "The work area checked before handover" },
    ],
  },
  "burst-pipe-cleanup": {
    title: "Hidden water found.", accent: "Drying confirmed.", badge: "Cavity moisture checks",
    cards: [
      { label: "Moisture spread", value: "Mapped", note: "Readings trace water through the structure" },
      { label: "Cavity drying", value: "Monitored", note: "Framing checked throughout drying" },
      { label: "Repair readiness", value: "Confirmed", note: "Readings checked before closing cavities" },
    ],
  },
  "appliance-leak-cleanup": {
    title: "Beyond the appliance.", accent: "Beneath the surface.", badge: "Hidden cavity monitoring",
    cards: [
      { label: "Behind the unit", value: "Inspected", note: "Access reveals the affected cavity" },
      { label: "Subfloor moisture", value: "Tracked", note: "Readings guide targeted airflow" },
      { label: "Before refitting", value: "Rechecked", note: "The cavity is assessed against targets" },
    ],
  },
  "hardwood-floor-drying": {
    title: "Careful drying.", accent: "Board by board.", badge: "Controlled floor monitoring",
    cards: [
      { label: "Drying target", value: "Floor-specific", note: "Set from an unaffected control area" },
      { label: "Board moisture", value: "Monitored", note: "Readings guide the drying pace" },
      { label: "Floor condition", value: "Reassessed", note: "Refinishing options reviewed after drying" },
    ],
  },
  "crawlspace-drying": {
    title: "Drier below.", accent: "Measured throughout.", badge: "Framing moisture monitoring",
    cards: [
      { label: "Moisture source", value: "Assessed", note: "Barrier and ventilation conditions checked" },
      { label: "Framing moisture", value: "Tracked", note: "Joists and subfloor monitored during drying" },
      { label: "Final inspection", value: "Rechecked", note: "The space is re-entered before closeout" },
    ],
  },
  "commercial-water-damage": {
    title: "Recovery planned.", accent: "Disruption managed.", badge: "Zone-by-zone monitoring",
    cards: [
      { label: "Work zones", value: "Agreed", note: "Access planned with your facilities team" },
      { label: "Drying progress", value: "Recorded", note: "Readings tracked within affected areas" },
      { label: "Area handover", value: "Coordinated", note: "Reopening follows checks and agreed scope" },
    ],
  },
  "contents-protection": {
    title: "Every item recorded.", accent: "Every step accounted for.", badge: "Item-by-item documentation",
    cards: [
      { label: "Contents inventory", value: "Photographed", note: "Condition recorded before items move" },
      { label: "Cleaning route", value: "Material-specific", note: "Each item follows a suitable process" },
      { label: "Return checks", value: "Reconciled", note: "Returned items matched against the inventory" },
    ],
  },
  reconstruction: {
    title: "Repairs planned.", accent: "Details checked.", badge: "Documented repair progress",
    cards: [
      { label: "Repair scope", value: "Agreed", note: "Based on the documented removal record" },
      { label: "Work sequence", value: "Coordinated", note: "Materials and trades scheduled together" },
      { label: "Final walkthrough", value: "Reviewed", note: "Finishes checked with you at handover" },
    ],
  },
};
