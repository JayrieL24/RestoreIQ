export const serviceOverviewHeadings: Record<string, readonly [string, string, string]> = {
  "water-damage-restoration": ["Water damage", "needs a clear", "drying plan."],
  "fire-smoke-damage": ["Smoke cleanup", "starts with", "a test clean."],
  "sewage-cleanup": ["Safe cleanup", "starts with", "containment."],
  "burst-pipe-cleanup": ["Stop the leak.", "Trace the water.", "Plan the drying."],
  "appliance-leak-cleanup": ["Small leaks.", "Hidden damage.", "A clear plan."],
  "hardwood-floor-drying": ["Your wood floor", "needs measured", "drying."],
  "crawlspace-drying": ["Dry crawlspace", "Healthy above.", "better home."],
  "commercial-water-damage": ["Your business.", "A phased plan.", "Clear progress."],
  "contents-protection": ["Your belongings.", "Careful handling.", "A clear record."],
  reconstruction: ["From repairs", "to a complete", "restoration."],
};

export const serviceIntroCards: Record<string, { figure: string; note: string; alt: string }> = {
  "water-damage-restoration": { figure: "Measured", note: "Drying follows the readings.", alt: "Blue drying equipment in a water-damaged living room" },
  "fire-smoke-damage": { figure: "Test first", note: "The right method for each surface.", alt: "Smoke-damaged kitchen with an air scrubber and cleaning tools" },
  "sewage-cleanup": { figure: "Contained", note: "Keep the affected area controlled.", alt: "Containment at a bathroom doorway during contaminated-water cleanup" },
  "burst-pipe-cleanup": { figure: "Trace it", note: "Follow the water beyond the stain.", alt: "Exposed damp framing and copper plumbing after a pipe failure" },
  "appliance-leak-cleanup": { figure: "Look beneath", note: "Check the hidden cavity.", alt: "Pulled-out dishwasher with a damp cabinet base and moisture meter" },
  "hardwood-floor-drying": { figure: "Controlled", note: "A measured approach to wood.", alt: "Floor drying mats and hoses on moisture-damaged oak flooring" },
  "crawlspace-drying": { figure: "Below the floor", note: "Check the framing, not just the ground.", alt: "Blue drying duct beneath timber joists in a damp crawlspace" },
  "commercial-water-damage": { figure: "In phases", note: "Plan the work around your business.", alt: "Drying equipment in a contained office work zone" },
  "contents-protection": { figure: "Item by item", note: "Keep belongings accounted for.", alt: "Wrapped furniture and labelled boxes on a restoration packing site" },
  reconstruction: { figure: "Clear scope", note: "Repair with the next step agreed.", alt: "Patched wall and new baseboard during restoration repairs" },
};
