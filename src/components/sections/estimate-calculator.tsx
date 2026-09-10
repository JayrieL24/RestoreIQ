"use client";

import * as React from "react";
import { ArrowUpRight, Info, Minus, Phone, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import {
  calculateEstimate,
  formatMoney,
  waterCategories,
} from "@/lib/estimate";

export function EstimateCalculator() {
  const [rooms, setRooms] = React.useState(2);
  const [categoryId, setCategoryId] = React.useState(waterCategories[0]!.id);
  const [standingWater, setStandingWater] = React.useState(false);

  const { low, high, days, lines } = calculateEstimate({
    rooms,
    categoryId,
    standingWater,
  });

  const summary = [
    `${rooms} room${rooms === 1 ? "" : "s"} affected`,
    waterCategories.find((c) => c.id === categoryId)?.label,
    standingWater ? "standing water present" : "no standing water",
  ].join(", ");

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Estimate enquiry",
  )}&body=${encodeURIComponent(
    `Hello,\n\nI used the estimate tool on your site and got ${formatMoney(low)}–${formatMoney(high)}.\n\nMy situation: ${summary}.\n\nPlease get in touch.\n`,
  )}`;

  return (
    <div className="ri-calc">
      <div className="ri-calc-form">
        {/* Rooms */}
        <div className="ri-calc-field">
          <label htmlFor="calc-rooms">How many rooms are affected?</label>
          <div className="ri-calc-stepper">
            <button
              type="button"
              onClick={() => setRooms((r) => Math.max(1, r - 1))}
              disabled={rooms <= 1}
              aria-label="Fewer rooms"
            >
              <Minus />
            </button>
            <output id="calc-rooms">{rooms}</output>
            <button
              type="button"
              onClick={() => setRooms((r) => Math.min(8, r + 1))}
              disabled={rooms >= 8}
              aria-label="More rooms"
            >
              <Plus />
            </button>
          </div>
        </div>

        {/* Water category */}
        <fieldset className="ri-calc-field">
          <legend>What kind of water is it?</legend>
          <div className="ri-calc-options">
            {waterCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setCategoryId(category.id)}
                aria-pressed={categoryId === category.id}
                className={cn(
                  "ri-calc-option",
                  categoryId === category.id && "is-active",
                )}
              >
                <b>{category.label}</b>
                <small>{category.detail}</small>
              </button>
            ))}
          </div>
        </fieldset>

        {/* Standing water */}
        <div className="ri-calc-field">
          <span className="ri-calc-label">Is water still sitting on the floor?</span>
          <div className="ri-calc-toggle">
            <button
              type="button"
              onClick={() => setStandingWater(false)}
              aria-pressed={!standingWater}
              className={cn(!standingWater && "is-active")}
            >
              No
            </button>
            <button
              type="button"
              onClick={() => setStandingWater(true)}
              aria-pressed={standingWater}
              className={cn(standingWater && "is-active")}
            >
              Yes
            </button>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="ri-calc-result">
        <span className="ri-calc-result-label">Indicative range</span>
        <p className="ri-calc-figure" aria-live="polite">
          {formatMoney(low)} <i>&ndash;</i> {formatMoney(high)}
        </p>
        <p className="ri-calc-days">
          Typically around {days} days of drying, monitored daily.
        </p>

        <ul className="ri-calc-lines">
          {lines.map((line) => (
            <li key={line.label}>
              <b>{line.label}</b>
              <small>{line.detail}</small>
            </li>
          ))}
        </ul>

        <p className="ri-calc-note">
          <Info aria-hidden />
          <span>
            This is not a quote. What sits behind a wall or under a floor
            changes the job, so the real figure comes from an on-site survey
            &mdash; and most losses like this are covered by insurance.
          </span>
        </p>

        <div className="ri-calc-actions">
          <a
            className="ri-button ri-button-yellow"
            href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
          >
            <Phone aria-hidden /> Call {site.phone}
          </a>
          <a className="ri-calc-secondary" href={mailto}>
            Send these details <ArrowUpRight aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}

export default EstimateCalculator;
