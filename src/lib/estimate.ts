/**
 * Indicative estimate model for the cost calculator.
 *
 * ⚠️ PLACEHOLDER RATES — REPLACE BEFORE LAUNCH ⚠️
 * Every figure below is a stand-in. Swap in RestoreIQ's real pricing, and
 * have someone who quotes jobs check that the model produces sensible
 * ranges at both ends (one small room, clean water → a large Category 3
 * loss). The UI states plainly that this is not a quote, but a range that
 * is wildly wrong still damages trust and invites disputes.
 */

export interface WaterCategory {
  id: string;
  label: string;
  detail: string;
  /** Multiplier applied to the base figure. */
  factor: number;
}

/** Water categories follow the standard industry classification. */
export const waterCategories: WaterCategory[] = [
  {
    id: "clean",
    label: "Clean water",
    detail: "Burst pipe, overflowing tank or appliance supply line",
    factor: 1,
  },
  {
    id: "grey",
    label: "Grey water",
    detail: "Washing machine, dishwasher or shower waste",
    factor: 1.35,
  },
  {
    id: "black",
    label: "Contaminated",
    detail: "Sewage, drain backup or flood water from outside",
    factor: 1.95,
  },
];

/* Placeholder rates. */
const CALLOUT = 320; // attendance, assessment and initial extraction
const PER_ROOM = 460; // drying equipment and monitoring, per room
const STANDING_WATER = 540; // bulk extraction where water is still sitting
const PER_DAY = 180; // equipment hire and daily monitoring visit

/** Days of drying we would typically expect for a given number of rooms. */
function expectedDays(rooms: number) {
  if (rooms <= 1) return 3;
  if (rooms <= 3) return 4;
  return 5;
}

export interface EstimateInput {
  rooms: number;
  categoryId: string;
  standingWater: boolean;
}

export interface EstimateLine {
  label: string;
  detail: string;
}

export interface EstimateResult {
  low: number;
  high: number;
  days: number;
  /** What the figure is made up of, shown under the range. */
  lines: EstimateLine[];
}

export function calculateEstimate({
  rooms,
  categoryId,
  standingWater,
}: EstimateInput): EstimateResult {
  const category =
    waterCategories.find((c) => c.id === categoryId) ?? waterCategories[0]!;

  const days = expectedDays(rooms);
  const base =
    CALLOUT +
    rooms * PER_ROOM +
    days * PER_DAY +
    (standingWater ? STANDING_WATER : 0);

  const mid = base * category.factor;

  /* A deliberately wide band: what is behind the plaster is unknown until
     someone opens it up, and the range should say so honestly. */
  const lines: EstimateLine[] = [
    {
      label: "Attendance & assessment",
      detail: "Callout, moisture survey and a written scope",
    },
    {
      label: `Drying ${rooms} room${rooms === 1 ? "" : "s"}`,
      detail: `Equipment placed to load, ${days} days of monitoring`,
    },
    ...(standingWater
      ? [
          {
            label: "Bulk extraction",
            detail: "Standing water removed before drying starts",
          },
        ]
      : []),
    {
      label: category.label,
      detail:
        category.id === "clean"
          ? "Standard handling and disposal"
          : "Containment, PPE and controlled disposal",
    },
  ];

  return {
    low: Math.round((mid * 0.82) / 50) * 50,
    high: Math.round((mid * 1.34) / 50) * 50,
    days,
    lines,
  };
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
