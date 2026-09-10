import type { LucideIcon } from "lucide-react";
import {
  Biohazard,
  Droplets,
  Fan,
  FileSearch,
  Siren,
  Waves,
} from "lucide-react";

/**
 * Services offered, shown in the expandable grid.
 *
 * ⚠️ PLACEHOLDER COPY — these are the services a water damage restoration
 * company typically provides, written as sensible defaults. Replace the
 * descriptions and bullet points with RestoreIQ's actual offerings, and
 * remove anything the company does not do.
 */

export interface ServiceEntry {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  /** Expanded body copy. */
  body: string;
  /** Expanded bullet list. */
  points: string[];
  /** Photo shown in the expanded panel — RestoreIQ's own job-site images. */
  image: string;
  imageAlt: string;
}

export const services: ServiceEntry[] = [
  {
    id: "emergency",
    title: "Emergency Water Extraction",
    subtitle: "Standing water removed fast",
    icon: Siren,
    body: "Truck-mounted extraction units pull standing water out of the property before it wicks into subfloor, drywall and framing.",
    points: [
      "Crews dispatched around the clock",
      "Submersible pumps and truck-mount extraction",
      "Contents moved and blocked off the floor",
    ],
    image: "/services/svc-emergency.jpg",
    imageAlt: "Technician extracting water from carpet with a wand",
  },
  {
    id: "drying",
    title: "Structural Drying",
    subtitle: "Dried to measured targets",
    icon: Fan,
    body: "Air movers and LGR dehumidifiers are placed to a calculated load, then adjusted daily until materials reach dry standard.",
    points: [
      "Psychrometric readings logged each visit",
      "Equipment repositioned as readings change",
      "Drying signed off against a target, not a guess",
    ],
    image: "/services/svc-drying.jpg",
    imageAlt: "Dehumidifier and air mover placed in a drying room",
  },
  {
    id: "assessment",
    title: "Moisture Assessment",
    subtitle: "Finding what you can't see",
    icon: FileSearch,
    body: "Thermal imaging and penetrating meters map the true extent of migration, including moisture trapped behind finishes.",
    points: [
      "Infrared survey of affected areas",
      "Room-by-room moisture mapping",
      "Written scope before work begins",
    ],
    image: "/services/svc-assessment.jpg",
    imageAlt: "Moisture meter reading a wet substrate",
  },
  {
    id: "mold",
    title: "Mold Remediation",
    subtitle: "Contained and removed",
    icon: Biohazard,
    body: "Affected materials are removed under containment with negative air, so spores are not spread into unaffected rooms.",
    points: [
      "Containment barriers and HEPA filtration",
      "Antimicrobial treatment of salvageable material",
      "Post-remediation verification available",
    ],
    image: "/services/svc-mold.jpg",
    imageAlt: "Damaged flooring lifted to expose the subfloor",
  },
  {
    id: "sewage",
    title: "Sewage & Contaminated Water",
    subtitle: "Category 3 cleanup",
    icon: Biohazard,
    body: "Category 3 losses are handled with full PPE and containment, with porous materials removed rather than dried in place.",
    points: [
      "Safe removal and disposal of affected material",
      "Hard surfaces cleaned and disinfected",
      "Area cleared before reconstruction begins",
    ],
    image: "/services/svc-sewage.jpg",
    imageAlt: "Extraction equipment running over affected carpet",
  },
  {
    id: "plumbing",
    title: "Leak Detection & Repair",
    subtitle: "Fixing the cause",
    icon: Droplets,
    body: "Acoustic and thermal detection isolates the failure point, so the repair is targeted instead of exploratory demolition.",
    points: [
      "Non-invasive pipe and slab leak location",
      "Permanent, code-compliant repairs",
      "Options and pricing agreed up front",
    ],
    image: "/services/svc-plumbing.jpg",
    imageAlt: "Technician working at an opened wall access point",
  },
  {
    id: "reconstruction",
    title: "Repairs & Reconstruction",
    subtitle: "Put back as it was",
    icon: Waves,
    body: "Once the structure is dry, the same team rebuilds what was removed — drywall, flooring, trim, paint — so there is no second contractor to manage.",
    points: [
      "Drywall, flooring, trim and paint",
      "Finishes matched to the existing property",
      "One point of contact from loss to completion",
    ],
    image: "/services/svc-reconstruction.jpg",
    imageAlt: "Technician working in a cleared room during restoration",
  },
];
