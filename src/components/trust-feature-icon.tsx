type TrustFeatureIconProps = {
  type: "response" | "drying" | "home" | "claims" | "tools" | "crew";
};

export function TrustFeatureIcon({ type }: TrustFeatureIconProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.65,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return <svg viewBox="0 0 24 24" aria-hidden {...common}>
    {type === "response" && <><path d="M6.2 4.2h3l1.2 4-2 1.3a14.3 14.3 0 0 0 6.1 6.1l1.3-2 4 1.2v3A2.2 2.2 0 0 1 17.6 20C10.1 20 4 13.9 4 6.4a2.2 2.2 0 0 1 2.2-2.2Z"/><path d="M15.5 4.5h4v4M19.5 4.5l-4.8 4.8"/></>}
    {type === "drying" && <><path d="M12 3.2s4.1 4.6 4.1 7.4a4.1 4.1 0 0 1-8.2 0C7.9 7.8 12 3.2 12 3.2Z"/><path d="M4 18.2h9.2M4 21h6.2M16 17.1c1.8.9 1.8 2.5 0 3.4M19 15.3c3 1.8 3 5.3 0 7"/></>}
    {type === "home" && <><path d="m3.5 10.5 8.5-7 8.5 7"/><path d="M5.7 9.2v10.9h12.6V9.2M9.5 20.1v-5.5h5v5.5"/><path d="M8.4 11.4h7.2"/></>}
    {type === "claims" && <><path d="M7 3.5h7l3.5 3.6v13.4H7Z"/><path d="M14 3.5v4h3.5M9.8 12h5M9.8 15.2h5M9.8 18.4h3.2"/><path d="m3.2 12.8 1.2 1.3 2.2-2.4"/></>}
    {type === "tools" && <><circle cx="9" cy="12" r="5.4"/><path d="M9 8.8v3.5l2.4 1.5M16.1 5.3l1.5-1.5M18.4 8.2h2.1M16.7 17.6l1.6 1.6"/><path d="M4.5 19.7h9"/></>}
    {type === "crew" && <><circle cx="8.4" cy="8" r="3"/><path d="M3.2 19.2c.4-3.4 2.3-5.4 5.2-5.4 1.8 0 3.3.8 4.2 2.1"/><path d="m17.3 11.7 3.5 1.4v3.2c0 2.4-1.5 4-3.5 4.8-2-.8-3.5-2.4-3.5-4.8v-3.2Z"/><path d="m15.8 16.3 1 1 2-2"/></>}
  </svg>;
}
