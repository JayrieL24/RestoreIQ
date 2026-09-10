"use client";

import * as React from "react";
import { BadgeCheck, ChevronDown, Clock3, FileText, Gauge, Home, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  { Icon: Gauge, title: "Measured drying", body: "Daily readings, written down and explained." },
  { Icon: ShieldCheck, title: "Protected home", body: "Careful containment and clean working practices." },
  { Icon: Clock3, title: "One point of contact", body: "The same team from first call to final repair." },
  { Icon: Home, title: "Home & commercial", body: "Both handled in house, never subcontracted." },
  { Icon: BadgeCheck, title: "Certified crews", body: "Trained and working to current standard." },
  { Icon: FileText, title: "Insurer ready", body: "Documentation prepared the way carriers expect." },
];

/** Rows past this index collapse behind the toggle on mobile. */
const VISIBLE_ON_MOBILE = 3;

/**
 * The six feature rows.
 *
 * On mobile the list stacks to one column and ran to ~540px of scroll, so
 * the last three collapse behind a "See more" toggle. They stay in the
 * DOM — hidden with CSS, not removed — so search engines and screen
 * readers still reach them, and `hidden` is never set on desktop where
 * the 3x2 grid shows all six.
 */
export function ResponseFeatureList() {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
      <ul className={cn("voda-feature-list", expanded && "is-expanded")}>
        {features.map(({ Icon, title, body }, i) => (
          <li
            key={title}
            className={cn(i >= VISIBLE_ON_MOBILE && "voda-feature-extra")}
          >
            <Icon />
            <span>
              <b>{title}</b>
              {body}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="voda-feature-toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "See less" : `See ${features.length - VISIBLE_ON_MOBILE} more`}
        <ChevronDown aria-hidden />
      </button>
    </>
  );
}
