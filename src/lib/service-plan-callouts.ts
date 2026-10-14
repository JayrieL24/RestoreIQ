/** Coordinates refer to the square blueprint asset, on a 1000 × 1000 canvas. */
export const servicePlanCallouts: Record<string, { lines: [string, string]; x: number; y: number }> = {
  "water-damage-restoration": { lines: ["Hidden moisture", "path"], x: 145, y: 590 },
  "fire-smoke-damage": { lines: ["Smoke spread", "into bedrooms"], x: 310, y: 365 },
  "sewage-cleanup": { lines: ["Contained", "cleanup zone"], x: 560, y: 450 },
  "burst-pipe-cleanup": { lines: ["Water inside", "the wall cavity"], x: 495, y: 650 },
  "appliance-leak-cleanup": { lines: ["Leak behind", "the appliance"], x: 850, y: 560 },
  "hardwood-floor-drying": { lines: ["Targeted", "floor drying"], x: 260, y: 475 },
  "crawlspace-drying": { lines: ["Moisture beneath", "the floor"], x: 225, y: 650 },
  "commercial-water-damage": { lines: ["Affected", "work zone"], x: 540, y: 655 },
  "contents-protection": { lines: ["Contents", "inventory"], x: 285, y: 455 },
  reconstruction: { lines: ["Documented", "repair area"], x: 665, y: 480 },
};
