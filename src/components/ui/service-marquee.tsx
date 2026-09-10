"use client";

import * as React from "react";

// Icons arrive pre-rendered: component references cannot be passed from a
// Server Component into this Client Component, but React elements can.
type ServiceTile = { title: string; copy: string; icon: React.ReactNode };

/** Mobile-only infinite loop of the service cards. Hovering or holding
 *  a tap pauses the scroll so a card can be read in place. */
export function ServiceMarquee({ tiles }: { tiles: ServiceTile[] }) {
  const [paused, setPaused] = React.useState(false);
  // Doubled so the loop has a seamless second copy to scroll into.
  const loop = [...tiles, ...tiles];

  return (
    <div
      className={`voda-service-marquee${paused ? " is-paused" : ""}`}
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerCancel={() => setPaused(false)}
    >
      <div className="voda-service-track">
        {loop.map(({ title, copy, icon }, index) => (
          <div
            className="voda-service-cell"
            key={`${title}-${index}`}
            aria-hidden={index >= tiles.length || undefined}
          >
            <a className="voda-service-card" href="#contact" tabIndex={index >= tiles.length ? -1 : undefined}>
              <span className="voda-service-icon">{icon}</span>
              <small>0{(index % tiles.length) + 1}</small>
              <h3>{title}</h3>
              <p>{copy}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}