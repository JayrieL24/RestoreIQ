"use client";

import * as React from "react";
import { serviceAreas } from "@/lib/service-areas";

/** Compact service-area map for the contact page: every city pinned and the
 *  view fitted to all of them, so the map shows where crews go rather than
 *  one office address. Same tiles and marker treatment as the home-page map. */
export function ContactAreaMap() {
  const mapElement = React.useRef<HTMLDivElement>(null);
  const [status, setStatus] = React.useState<"loading" | "ready" | "unavailable">("loading");

  React.useEffect(() => {
    const element = mapElement.current;
    if (!element) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      void import("leaflet").then((L) => {
        if (disposed) return;
        const map = L.map(element, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
        const bounds = L.latLngBounds(serviceAreas.map(({ lat, lng }) => [lat, lng]));
        const fit = () => map.fitBounds(bounds, { padding: [28, 28] });
        fit();

        let loadedTiles = 0;
        const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
        tiles.on("tileload", () => { loadedTiles += 1; setStatus("ready"); });
        const timeout = window.setTimeout(() => { if (!loadedTiles) setStatus("unavailable"); }, 10000);

        for (const area of serviceAreas) {
          L.marker([area.lat, area.lng], {
            title: `Restoration services in ${area.name}`,
            icon: L.divIcon({ className: "voda-area-marker", html: '<span aria-hidden="true"></span>', iconSize: [24, 24], iconAnchor: [12, 12] }),
          }).addTo(map).bindPopup(`<strong>${area.name}</strong><br><a href="/service-areas/${area.slug}">View local services</a>`);
        }

        const resize = new ResizeObserver(() => { map.invalidateSize(); fit(); });
        resize.observe(element);
        cleanup = () => { window.clearTimeout(timeout); resize.disconnect(); map.remove(); };
      }).catch(() => { if (!disposed) setStatus("unavailable"); });
    }, { rootMargin: "350px" });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); cleanup?.(); };
  }, []);

  return <div className="ri26-contact-area-map-wrap">
    <div ref={mapElement} className="ri26-contact-area-map" role="region" aria-label="Map of the communities RestoreIQ serves across Ventura County" />
    {status !== "ready" ? <div className="voda-map-status" role="status">{status === "loading" ? "Loading service area map…" : "Map imagery is currently unavailable."}</div> : null}
  </div>;
}
