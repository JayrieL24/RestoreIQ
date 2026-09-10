type WhyIconType = "care" | "scope" | "updates" | "crew";

/**
 * Glyphs for the "why choose" list.
 *
 * The generic lucide marks these replace — a handshake, sparkles, a speech
 * bubble, a crowd — could have sat on any service page and said nothing
 * about restoration. Each of these depicts the specific claim its row
 * makes, drawn to one spec: 24×24, 1.6 stroke, round caps and joins.
 */
export function WhyChooseIcon({ type }: { type: WhyIconType }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden {...common}>
      {/* Professional care: a protected home. */}
      {type === "care" && (
        <>
          <path d="M12 2.8 19 5.6v5.1c0 4.7-2.8 8.2-7 10.5-4.2-2.3-7-5.8-7-10.5V5.6Z" />
          <path d="m8.3 11.2 3.7-3 3.7 3" />
          <path d="M9.5 10.3v4.4h5v-4.4" />
        </>
      )}

      {/* Every need: one crew covering routine through emergency. */}
      {type === "scope" && (
        <>
          <path d="M12 2.8s3.4 4 3.4 6.3a3.4 3.4 0 1 1-6.8 0c0-2.3 3.4-6.3 3.4-6.3Z" />
          <path d="M4.2 14.6h15.6" />
          <path d="M6.4 14.6v3.2M12 14.6v5.6M17.6 14.6v3.2" />
          <path d="M4.6 20.8h4M15.6 20.8h4" />
        </>
      )}

      {/* Clear communication: a report shared, with a check. */}
      {type === "updates" && (
        <>
          <path d="M3.4 5.6a1.8 1.8 0 0 1 1.8-1.8h9a1.8 1.8 0 0 1 1.8 1.8v7.2a1.8 1.8 0 0 1-1.8 1.8H7.6L3.4 18Z" />
          <path d="m7 8.8 1.8 1.8 3.4-3.4" />
          <path d="M18.6 9.4h1.2a1.8 1.8 0 0 1 1.8 1.8v6a1.8 1.8 0 0 1-1.8 1.8h-1.4l-2.6 2.2v-2.2" />
        </>
      )}

      {/* Local experts: a certified crew, badge over a location pin. */}
      {type === "crew" && (
        <>
          <circle cx="9" cy="7.4" r="2.9" />
          <path d="M3.4 18.4c0-3.1 2.5-5.1 5.6-5.1 1.4 0 2.7.4 3.7 1.1" />
          <path d="M17.6 10.6c2 0 3.6 1.6 3.6 3.6 0 2.6-3.6 6.2-3.6 6.2s-3.6-3.6-3.6-6.2c0-2 1.6-3.6 3.6-3.6Z" />
          <path d="m16.2 14.2 1 1 2-2" />
        </>
      )}
    </svg>
  );
}
