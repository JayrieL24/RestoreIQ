import { HousePlus, Phone, ScanSearch, WavesArrowDown, Wind } from "lucide-react";

/**
 * The five stages, shared by the homepage brief and the About page. Kept in
 * one place so the two can never describe the process differently.
 */
export const process = [
  { title: "Call", accent: "us", copy: "Tell us what happened and get safety guidance.", icon: Phone },
  { title: "Stop the", accent: "source", copy: "We shut off the water and map the damage.", icon: ScanSearch },
  { title: "Extract", accent: "water", copy: "Standing water comes out and gets documented.", icon: WavesArrowDown },
  { title: "Dry and", accent: "monitor", copy: "Daily readings guide the drying equipment.", icon: Wind },
  { title: "Repair and", accent: "restore", copy: "Approved repairs bring your property back.", icon: HousePlus },
] as const;
