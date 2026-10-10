import { ClipboardCheck, Gauge, MessagesSquare, Siren } from "lucide-react";

type WhyIconType = "care" | "scope" | "updates" | "crew";

const icons = {
  care: Siren,
  scope: Gauge,
  updates: MessagesSquare,
  crew: ClipboardCheck,
};

/** Consistent SVG symbols for response, readings, updates, and claim records. */
export function WhyChooseIcon({ type }: { type: WhyIconType }) {
  const Icon = icons[type];
  return <Icon aria-hidden strokeWidth={1.8} />;
}
