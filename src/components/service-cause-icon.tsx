import type { LucideIcon } from "lucide-react";
import { Biohazard, Building2, CloudRain, Droplets, Flame, Hammer, House, PackageCheck, PanelsTopLeft, Refrigerator, ShieldCheck, Snowflake, WashingMachine, Wind, Wrench, Zap } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "Supply-line failures": Wrench,
  "Roof and window intrusion": House,
  "Overflowing fixtures": Droplets,
  "Storm water entry": CloudRain,
  "Kitchen fires": Flame,
  "Electrical incidents": Zap,
  "Candle and fireplace smoke": Flame,
  "Wildfire smoke intrusion": Wind,
  "Sewer backups": Biohazard,
  "Toilet overflows": Droplets,
  "Drain-line failures": Wrench,
  "Contaminated storm water": CloudRain,
  "Failed supply lines": Wrench,
  "Frozen or aging pipes": Snowflake,
  "Corroded fittings": Wrench,
  "Pipe-joint separation": Wrench,
  "Dishwasher supply leaks": Droplets,
  "Washing-machine hoses": WashingMachine,
  "Refrigerator lines": Refrigerator,
  "Water-heater failures": Wrench,
  "Dishwasher leaks": Droplets,
  "Plumbing failures": Wrench,
  "Window and door intrusion": House,
  "Plumbing leaks": Wrench,
  "Groundwater entry": Droplets,
  "Drainage failures": CloudRain,
  "Storm-related intrusion": CloudRain,
  "Fire-suppression discharge": Droplets,
  "Restroom and drain backups": Biohazard,
  "Roof intrusion": House,
  "Mechanical-system leaks": Building2,
  "Water migration": Droplets,
  "Smoke and soot exposure": Wind,
  "Construction access": ShieldCheck,
  "Contaminated-water losses": Biohazard,
  "Post-mitigation repairs": Hammer,
  "Fire-damaged finishes": Flame,
  "Contaminated material removal": Biohazard,
  "Access opened for drying": PanelsTopLeft,
};

export function ServiceCauseIcon({ cause }: { cause: string }) {
  const Icon = icons[cause] ?? PackageCheck;
  return <span className="ri26-svc-cause-icon" aria-hidden="true"><Icon strokeWidth={1.8} /></span>;
}
