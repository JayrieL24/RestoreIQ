"use client";

import NumberFlow from "@number-flow/react";
import { motion, useInView, useReducedMotion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface StatBar {
  /** Percentage, 0-100 — drives both the label and the bar height. */
  value: number;
  label: string;
  /** Short line explaining what the figure measures. */
  detail?: string;
  /** Highlights this bar in the brand blue. */
  highlight?: boolean;
}

/**
 * ⚠️ PLACEHOLDER FIGURES — replace before launch.
 * These are illustrative. Publish only numbers RestoreIQ can substantiate:
 * performance claims in advertising need to be backed by real records.
 */
const defaultStats: StatBar[] = [
  {
    value: 28,
    label: "Visible damage",
    detail: "What you can see on walking in",
  },
  {
    value: 41,
    label: "Surface check",
    detail: "What a handheld reading alone finds",
  },
  {
    value: 99,
    label: "Full survey",
    detail: "Thermal plus probe, mapped room by room",
    highlight: true,
  },
  {
    value: 34,
    label: "Spot testing",
    detail: "What sampling a few points reveals",
  },
];

export function Stats({
  stats = defaultStats,
  className,
}: {
  stats?: StatBar[];
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  // Bars grow from zero, so hold until the section is actually on screen.
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduceMotion = useReducedMotion();

  return (
    <section className={cn("results", className)}>
      <div aria-hidden className="section-depth" />
      <div className="page-container">
        <div className="section-heading">
          <span>What a full survey finds</span>
          <h2>
            Most of the damage
            <br />
            is the part you can&rsquo;t see.
          </h2>
          <p>
            A full survey finds what a glance and a spot check miss. That gap
            is the difference between drying a room and drying a house.
          </p>
        </div>

        <div ref={ref} className="results-chart">
          {stats.map((stat, index) => (
            <Bar
              key={stat.label}
              {...stat}
              show={inView}
              delay={reduceMotion ? 0 : index * 0.12}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Bar({
  value,
  label,
  detail,
  highlight = false,
  show,
  delay,
  reduceMotion,
}: StatBar & { show: boolean; delay: number; reduceMotion: boolean }) {
  return (
    <div className="results-bar">
      <div className="results-track">
        <motion.div
          initial={{ height: 0 }}
          animate={show ? { height: `${value}%` } : { height: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
          }
          className={cn("results-fill", highlight && "is-highlight")}
        >
          <span className="results-value">
            <NumberFlow value={show ? value : 0} suffix="%" />
          </span>
        </motion.div>
      </div>

      <p className="results-label">
        <b>{label}</b>
        {detail ? <small>{detail}</small> : null}
      </p>
    </div>
  );
}
