import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className, framed = false }: { className?: string; framed?: boolean }) {
  return <span className={cn("relative block h-[78px] w-[96px] shrink-0", className)}>
    <span
      aria-hidden
      className={cn(
        "absolute left-1/2 top-1/2 h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_6px_20px_rgba(7,29,53,.16)] transition-opacity duration-300",
        framed ? "opacity-100" : "opacity-0",
      )}
    />
    <Image src="/RestoreIQ-Logo-transparent.png" alt="RestoreIQ Water Damage" fill className="relative z-10 object-contain p-[8px]" sizes="80px" priority />
  </span>;
}
