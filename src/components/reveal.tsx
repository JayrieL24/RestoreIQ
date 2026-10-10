import type { ReactNode } from "react";

type RevealProps = { children: ReactNode; className?: string };

/** Reveal a complete content block while leaving the section background visible. */
export function Reveal({ children, className }: RevealProps) {
  return <div className={className} data-scroll-reveal>{children}</div>;
}

/** Each item reveals independently; the grid itself stays in place. */
export function RevealGroup({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}

export const RevealItem = Reveal;
