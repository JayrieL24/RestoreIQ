"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { TrustFeatureIcon } from "@/components/trust-feature-icon";

const features = [
  { type: "response", title: "Rapid response", body: "Clear next steps from the first call" },
  { type: "drying", title: "Verified drying", body: "Moisture readings guide every decision" },
  { type: "home", title: "Whole-home care", body: "Damage controlled and finishes restored" },
  { type: "claims", title: "Claim support", body: "Organized records for your insurer" },
  { type: "tools", title: "Professional tools", body: "Equipment selected for actual conditions" },
  { type: "crew", title: "Accountable crew", body: "One team responsible through completion" },
] as const;

/** Cards past this index collapse behind the toggle on mobile. */
const VISIBLE_ON_MOBILE = 3;

/**
 * The six trust cards.
 *
 * Mirrors the response feature list: on mobile the grid stacks to one
 * column and runs long, so the last three collapse behind a toggle. The
 * cards stay in the DOM — hidden with CSS — so they remain reachable to
 * search engines and screen readers.
 */
export function TrustFeatureGrid() {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
      <div className={cn("voda-stat-grid", expanded && "is-expanded")}>
        {features.map(({ type, title, body }, i) => (
          <div
            key={type}
            className={cn(i >= VISIBLE_ON_MOBILE && "voda-stat-extra")}
          >
            <span className="voda-stat-icon">
              <TrustFeatureIcon type={type} />
            </span>
            <p>
              <b>{title}</b>
              <span>{body}</span>
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="voda-stat-toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "See less" : `See ${features.length - VISIBLE_ON_MOBILE} more`}
        <ChevronDown aria-hidden />
      </button>
    </>
  );
}
