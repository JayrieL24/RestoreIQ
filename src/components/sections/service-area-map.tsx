"use client";

import * as React from "react";
import { ArrowUpRight, LocateFixed, MapPin } from "lucide-react";

import { serviceAreas } from "@/lib/service-areas";
import { site } from "@/lib/site";

type MapActions = {
  focus: (index: number) => void;
  reset: () => void;
};

export function ServiceAreaMap() {
  const mapElement = React.useRef<HTMLDivElement>(null);
  const actions = React.useRef<MapActions | null>(null);
  const [selected, setSelected] = React.useState<number | null>(null);
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

        const map = L.map(element, { scrollWheelZoom: false, zoomControl: true });
        const bounds = L.latLngBounds(serviceAreas.map(({ lat, lng }) => [lat, lng]));
        let focused = false;
        const showAll = () => {
          focused = false;
          map.closePopup();
          map.fitBounds(bounds, { padding: [38, 38] });
          setSelected(null);
        };

        showAll();
        let loadedTiles = 0;
        const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        tiles.on("tileload", () => {
          loadedTiles += 1;
          setStatus("ready");
        });

        const timeout = window.setTimeout(() => {
          if (!loadedTiles) setStatus("unavailable");
        }, 10000);

        const markers = serviceAreas.map((area, index) => {
          const marker = L.marker([area.lat, area.lng], {
            title: `Restoration services in ${area.name}`,
            icon: L.divIcon({
              className: "voda-area-marker",
              html: '<span aria-hidden="true"></span>',
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            }),
          }).addTo(map).bindPopup(
            `<strong>${area.name}</strong><br><a href="${area.href}" target="_blank" rel="noopener noreferrer">View service area</a>`,
          );

          marker.on("click", () => {
            focused = true;
            setSelected(index);
          });
          return marker;
        });

        actions.current = {
          focus: (index) => {
            const area = serviceAreas[index];
            if (!area) return;
            focused = true;
            map.setView([area.lat, area.lng], 11, { animate: false });
            markers[index]?.openPopup();
            setSelected(index);
          },
          reset: showAll,
        };

        const resize = new ResizeObserver(() => {
          map.invalidateSize();
          if (!focused) map.fitBounds(bounds, { padding: [38, 38] });
        });
        resize.observe(element);

        cleanup = () => {
          window.clearTimeout(timeout);
          resize.disconnect();
          actions.current = null;
          map.remove();
        };
      }).catch(() => {
        if (!disposed) setStatus("unavailable");
      });
    }, { rootMargin: "350px" });

    observer.observe(element);
    return () => {
      disposed = true;
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <section className="voda-area-section" id="coverage" aria-labelledby="coverage-heading">
      <div className="voda-area-layout voda-wrap">
        <div className="voda-area-copy">
          <span className="voda-eyebrow">Service areas</span>
          <h2 id="coverage-heading">Local crews across Camarillo and the surrounding coast.</h2>
          <p>Select a community to locate it on the map.</p>

          <ul className="voda-area-list">
            {serviceAreas.map((area, index) => (
              <li key={area.name}>
                <button
                  type="button"
                  disabled={status === "loading"}
                  aria-pressed={selected === index}
                  onClick={() => actions.current?.focus(index)}
                >
                  <MapPin aria-hidden />
                  <span>{area.name}</span>
                  <ArrowUpRight aria-hidden />
                </button>
              </li>
            ))}
          </ul>

          <p className="voda-area-help">
            Don&apos;t see your location? <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>Call {site.phone}</a>
          </p>
        </div>

        <div className="voda-area-map-wrap">
          <div
            ref={mapElement}
            className="voda-area-map"
            role="region"
            aria-label="Interactive map of RestoreIQ service communities"
          />
          {status !== "ready" ? (
            <div className="voda-map-status" role="status">
              {status === "loading" ? "Loading local service map…" : "Map imagery is currently unavailable."}
            </div>
          ) : null}
          <button
            type="button"
            className="voda-map-reset"
            onClick={() => actions.current?.reset()}
            disabled={status === "loading"}
          >
            <LocateFixed aria-hidden /> Show all areas
          </button>
        </div>
      </div>
    </section>
  );
}
