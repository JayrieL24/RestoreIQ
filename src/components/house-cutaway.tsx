"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { HiddenPath } from "@/lib/service-features";

/**
 * Where the water goes, shown through real job photos. Selecting a path swaps
 * the photo to that place in a real property.
 *
 * This replaced an illustrated cutaway with CSS highlight boxes. A photo of an
 * actual wet cavity says more than a drawing with a tint over it, and there are
 * no coordinates to keep aligned against the artwork.
 */
export function HouseCutaway({ paths }: { paths: HiddenPath[] }) {
  const [active, setActive] = React.useState(0);
  const current = paths[active];

  return (
    <div className="ri26-cut">
      <figure className="ri26-cut-figure">
        <div className="ri26-cut-stage">
          {paths.map((path, i) => {
            // Wrap the offset so the stack always has a neighbour on each side,
            // including on the first and last path.
            const raw = i - active;
            const half = paths.length / 2;
            const offset = raw > half ? raw - paths.length : raw < -half ? raw + paths.length : raw;
            return (
              <div
                key={path.zone}
                className={`ri26-cut-card${i === active ? " is-on" : ""}${Math.abs(offset) === 1 ? " is-near" : ""}`}
                style={{ "--offset": offset, "--depth": Math.abs(offset) } as React.CSSProperties}
                aria-hidden={i !== active}
              >
                <Image
                  src={path.photo}
                  alt={path.photoAlt}
                  fill
                  className="ri26-cut-img"
                  sizes="(max-width: 900px) 94vw, 720px"
                  priority={i === 0}
                />
              </div>
            );
          })}
        </div>

        <figcaption className="ri26-cut-caption">
          <span>{current?.zone}</span>: {current?.reach}
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
