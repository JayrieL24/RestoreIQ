"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { HiddenPath, HouseRegion } from "@/lib/service-features";

/**
 * Interactive cross-section of a house. Selecting a path highlights the part
 * of the structure it affects, so "where does this reach in my house?" is
 * answered by the diagram rather than by prose.
 *
 * The cutaway itself is a rendered illustration; the highlight is a CSS
 * overlay positioned over the relevant band. Keeping the highlight in CSS
 * rather than baking it into separate renders means the colour matches the
 * site exactly and a misaligned band can be nudged without regenerating art.
 *
 * Each path carries its own boxes as percentages of the image box, rather than
 * sharing a few broad regions — "behind the kickboard" and "cabinet base" sit
 * in the same part of the house but are not the same thing, and lighting the
 * whole kitchen for both made the diagram say less than the copy did.
 */

const REGION_LABEL: Record<HouseRegion, string> = {
  ceiling: "Ceiling cavity",
  wall: "Wall cavity",
  floor: "Floor covering",
  subfloor: "Subfloor and joists",
  crawl: "Crawlspace",
  cabinet: "Cabinet run",
  kickboard: "Kickboard cavity",
  cabinetBase: "Cabinet carcass",
  appliance: "Appliance position",
  wallRight: "Wall behind the run",
  plate: "Bottom plate",
  boards: "Floor boards",
  skirting: "Skirting line",
  batts: "Insulation between joists",
  piers: "Support piers",
  ground: "Ground sheeting",
  joists: "Floor joists",
};


export function HouseCutaway({ paths }: { paths: HiddenPath[] }) {
  const [active, setActive] = React.useState(0);
  const current = paths[active];
  
  return (
    <div className="ri26-cut">
      <figure className="ri26-cut-figure">
        <div className="ri26-cut-stage">
          <Image
            src="/services/cutaway/house-cutaway.jpg"
            alt="Cross-section of a house showing the roof, ceiling cavity, wall cavities, floor, subfloor and crawlspace"
            fill
            className="ri26-cut-img"
            sizes="(max-width: 900px) 94vw, 720px"
          />
          {/* Highlight bands. All render; only the active region is visible,
              so switching cross-fades rather than popping. */}
          {paths.map((path, pi) =>
            path.boxes.map((box, bi) => (
              <span
                key={`${pi}-${bi}`}
                aria-hidden
                className={`ri26-cut-band${pi === active ? " is-on" : ""}`}
                style={{
                  left: `${box.left}%`,
                  top: `${box.top}%`,
                  width: `${box.width}%`,
                  height: `${box.height}%`,
                }}
              />
            ))
          )}
        </div>

        <figcaption className="ri26-cut-caption">
          <span>{current ? REGION_LABEL[current.region] : ""}</span> highlighted
        </figcaption>
      </figure>

      <div className="ri26-cut-panel">
        <ol className="ri26-cut-tabs">
          {paths.map((path, i) => (
            <li key={path.zone}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={i === active ? "is-on" : undefined}
              >
                <span className="ri26-cut-n" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                <span className="ri26-cut-zone"><b>{path.zone}</b><small>{path.reach}</small></span>
                <ArrowRight aria-hidden />
              </button>
            </li>
          ))}
        </ol>

        {current ? (
          <div className="ri26-cut-detail" aria-live="polite">
            <header>
              <b>{current.zone}</b>
              <span className="ri26-cut-reach">{current.reach}</span>
            </header>
            <p>{current.path}</p>
            <footer>
              <span>What gives it away</span>
              {current.tell}
            </footer>
          </div>
        ) : null}
      </div>
    </div>
  );
}
