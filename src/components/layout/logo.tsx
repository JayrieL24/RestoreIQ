import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  framed = false,
  compact = false,
}: {
  className?: string;
  framed?: boolean;
  compact?: boolean;
}) {
  return <span className={cn("relative block shrink-0", compact ? "h-[52px] w-[58px]" : "h-[78px] w-[96px]", className)}>
    <span
      aria-hidden
      className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_6px_20px_rgba(7,29,53,.16)] transition-opacity duration-300",
        compact ? "h-[48px] w-[48px]" : "h-[76px] w-[76px]",
        framed ? "opacity-100" : "opacity-0",
      )}
    />
    <Image
      src="/RestoreIQ-Logo-transparent.png"
      alt="RestoreIQ Water Damage"
      fill
      className={cn("relative z-10 object-contain", compact ? "p-[5px]" : "p-[8px]")}
      sizes={compact ? "52px" : "80px"}
      loading="eager"
    />
  </span>;
}
