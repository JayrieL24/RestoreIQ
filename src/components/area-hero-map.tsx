"use client";

import * as React from "react";

/**
 * Non-interactive city map for a service-area hero. Leaflet is 2D only, so the
 * 3D read comes from a CSS perspective tilt on the wrapper — the same technique
 * the homepage hero uses for its ripple rings. Tiles, filter and marker styling
 * are shared with the main coverage map so the two look like one system.
 */
export function AreaHeroMap({ lat, lng, name }: { lat: number; lng: number; name: string }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    // Only load Leaflet once the hero is actually on screen.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();

      void import("leaflet").then((L) => {
        if (disposed) return;

        const map = L.map(element, {
          // Fully static: this is a backdrop, not a control. Leaving any of
          // these on would trap scroll on touch devices.
          zoomControl: false,
          scrollWheelZoom: false,
          dragging: false,
          doubleClickZoom: false,
          touchZoom: false,
          boxZoom: false,
          keyboard: false,
          attributionControl: true,
          // Allows the fractional zoom below; without it Leaflet snaps to ints.
          zoomSnap: 0,
        });

        map.setView([lat, lng], 16.6);

        // The navy wash covers the left of the hero, so a pin at the map's
        // geometric centre lands in the faded zone. Pan the view left so the
        // city centre sits in the clear area on the right instead.
        const shiftPin = () => {
          const w = element.clientWidth;
          if (!w) return;
          map.setView([lat, lng], 16.6, { animate: false });
          // Put the pin near the right edge of the hero at every width: pan the
          // viewport left so the marker lands about 80% across, clear of the
          // copy on the left. Same behaviour on desktop, tablet and phone.
          map.panBy([-w * 0.3, 0], { animate: false });
        };
        shiftPin();

        const resize = new ResizeObserver(() => { map.invalidateSize(); shiftPin(); });
        resize.observe(element);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Outlined teardrop with a hollow ring, in the site's navy and cyan.
        // Scoped to the hero so the homepage coverage map keeps its dot marker.
        const pin = `
          <svg viewBox="0 0 24 32" aria-hidden="true">
            <path d="M12 1.6c-5.2 0-9.4 4.2-9.4 9.4 0 6.9 8.3 18 9 18.9.2.2.6.2.8 0 .7-.9 9-12 9-18.9 0-5.2-4.2-9.4-9.4-9.4Z"
                  fill="#ffffff" stroke="#0b3153" stroke-width="1.8" stroke-linejoin="round" />
            <circle cx="12" cy="11" r="4.1" fill="none" stroke="#0b3153" stroke-width="1.8" />
            <circle cx="12" cy="11" r="1.9" fill="#59dce1" />
          </svg>`;

        L.marker([lat, lng], {
          title: name,
          icon: L.divIcon({
            className: "ri26-hero-pin",
            html: pin,
            iconSize: [46, 61],
            // Anchor at the tip of the teardrop, not its centre.
            iconAnchor: [23, 61],
          }),
          keyboard: false,
        }).addTo(map);

        cleanup = () => { resize.disconnect(); map.remove(); };
      });
    }, { rootMargin: "200px" });

    observer.observe(element);

    return () => {
      disposed = true;
      observer.disconnect();
      cleanup?.();
    };
  }, [lat, lng, name]);

  return <div ref={ref} className="ri26-hero-map voda-area-map" aria-hidden />;
}
