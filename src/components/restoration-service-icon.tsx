type ServiceIconProps = { type: string; className?: string };

/**
 * Service glyphs, drawn on a shared 24×24 grid.
 *
 * The previous set was hand-plotted on a 64px box with inconsistent
 * construction — some marks filled the frame, others sat small in one
 * corner, and stroke weights read differently between them. These are
 * built to one spec: 24×24 viewBox, 1.6 stroke, round caps and joins, and
 * every mark occupying roughly the same optical area so the icon row
 * reads evenly.
 */
export function RestorationServiceIcon({ type, className }: ServiceIconProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      role="img"
      aria-label={`${type} service`}
      {...common}
    >
      {/* Extraction: wand over a rising water line. */}
      {type === "extraction" && (
        <>
          <path d="M15 3.5 12.5 12" />
          <path d="M8.5 12h8.5l-1 3.5H9.5z" />
          <path d="M11 15.5v2M14.5 15.5v2" />
          <path d="M3 20.5c1.6-1.4 3.2 1.4 4.8 0s3.2 1.4 4.8 0 3.2 1.4 4.8 0 2.4 1 3.6.2" />
        </>
      )}

      {/* Drying: air mover with airflow arcs. */}
      {type === "drying" && (
        <>
          <rect x="2.8" y="8.5" width="10.4" height="9" rx="2.2" />
          <circle cx="8" cy="13" r="2.9" />
          <path d="M8 10.1v5.8M5.1 13h5.8" />
          <path d="M16 9.2c1.7 1 1.7 2.4 0 3.4M19 7.4c2.9 1.9 2.9 5.3 0 7.2M16 16.6c1.2.7 1.4 1.6.6 2.4" />
        </>
      )}

      {/* Assessment: moisture meter with a signal reading. */}
      {type === "assessment" && (
        <>
          <rect x="4" y="2.8" width="9.5" height="13" rx="2.2" />
          <path d="M6.6 6h4.3M6.6 9h2.8" />
          <path d="M6 15.8 4.2 21M11.5 15.8 13.3 21" />
          <path d="M16.6 7.5c1.2 0 2.2 1 2.2 2.2M16.6 4.6c2.8 0 5.1 2.3 5.1 5.1" />
        </>
      )}

      {/* Mould: spores on a stem, contained. */}
      {type === "mould" && (
        <>
          <path d="M12 21v-8.5" />
          <path d="M11.6 13.2c-3.2 0-5.4-1.9-5.4-4.8 3.2 0 5.4 1.9 5.4 4.8Z" />
          <path d="M12.5 16.2c2.9 0 5-1.8 5-4.4-2.9 0-5 1.8-5 4.4Z" />
          <circle cx="17.6" cy="5.6" r="1.5" />
          <circle cx="7.2" cy="4.4" r="1.1" />
          <path d="M4 21h16" />
        </>
      )}

      {/* Contaminated water: hazard drop. */}
      {type === "sewage" && (
        <>
          <path d="M12 2.6s5 5.6 5 9a5 5 0 0 1-10 0c0-3.4 5-9 5-9Z" />
          <path d="M12 9.4v3.2M12 15.3h.01" />
          <path d="M3 21c1.6-1.4 3.2 1.4 4.8 0s3.2 1.4 4.8 0 3.2 1.4 4.8 0" />
        </>
      )}

      {/* Leak detection: pipe joint with a listening pulse. */}
      {type === "leak" && (
        <>
          <path d="M2.8 10.5h5.4v3H2.8zM15.8 10.5h5.4v3h-5.4z" />
          <path d="M8.2 12h2.4M13.4 12h2.4" />
          <circle cx="12" cy="12" r="1.6" />
          <path d="M12 4.4v2.6M12 17v2.6" />
        </>
      )}

      {/* Reconstruction: house under a raised roof line. */}
      {type === "repair" && (
        <>
          <path d="m2.8 11.2 9.2-7.4 9.2 7.4" />
          <path d="M5.4 9.8V20h13.2V9.8" />
          <path d="M9.8 20v-5.4h4.4V20" />
          <path d="M16.2 4.6 19 1.8l3.2 3.2-2.8 2.8" />
        </>
      )}

      {/* Water treatment: filtered droplet through a filter bed. */}
      {type === "treatment" && (
        <>
          <path d="M12 2.6s4 4.6 4 7.4a4 4 0 0 1-8 0c0-2.8 4-7.4 4-7.4Z" />
          <rect x="5" y="15.2" width="14" height="5.6" rx="1.8" />
          <path d="M8.4 15.2v5.6M12 15.2v5.6M15.6 15.2v5.6" />
        </>
      )}
    </svg>
  );
}
