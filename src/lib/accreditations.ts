/**
 * Accreditation marks shown below the hero.
 *
 * ⚠️ RELATIONSHIPS NOT YET VERIFIED — CONFIRM BEFORE LAUNCH ⚠️
 * The logo files in /public/logos are the organizations' official artwork,
 * downloaded from their own websites. Their presence here does NOT establish
 * that RestoreIQ holds these credentials. Before going live:
 *   1. Confirm RestoreIQ actually holds each credential below.
 *   2. Check each organization's logo-usage terms — several (IICRC, RIA)
 *      permit the mark only for current certified firms / members, and the
 *      federal seals (EPA, DOL) have their own restrictions on implying
 *      endorsement.
 *   3. Delete any entry that cannot be substantiated.
 *
 * Only the ink colour of ria.svg was changed (white → navy) so the supplied
 * knockout variant is legible on a light background; the artwork is unaltered.
 */

export type LogoSize = "compact" | "standard" | "wide" | "tall";

export interface Accreditation {
  /** Organization name — also the accessible label fallback. */
  name: string;
  /** Path under /public. */
  src: string;
  /** Drives display height so differently shaped marks read at equal weight. */
  size: LogoSize;
  /** Overrides the default "<name> logo" alt text when more context helps. */
  label?: string;
}

export const accreditations: Accreditation[] = [
  {
    name: "IICRC",
    src: "/logos/iicrc.png",
    size: "wide",
    label:
      "IICRC — Institute of Inspection, Cleaning and Restoration Certification",
  },
  {
    name: "Restoration Industry Association",
    src: "/logos/ria.svg",
    size: "standard",
  },
  {
    name: "U.S. Environmental Protection Agency",
    src: "/logos/epa.svg",
    size: "tall",
    label: "U.S. Environmental Protection Agency — Lead-Safe certified",
  },
  {
    name: "U.S. Department of Labor",
    src: "/logos/dol.svg",
    size: "tall",
    label: "U.S. Department of Labor — OSHA safety trained",
  },
];
