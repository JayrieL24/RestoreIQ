"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus, X } from "lucide-react";

import { cn } from "@/lib/utils";

export interface BentoItem {
  id: string | number;
  title: string;
  subtitle?: string;
  /** Shown inside the detail dialog. */
  content: React.ReactNode;
  icon?: React.ReactNode;
  /** Photo for the tile and the dialog. */
  image?: string;
  /** Alt text for `image`. */
  imageAlt?: string;
  /** Renders as the large bento tile with its photo always visible. */
  feature?: boolean;
  className?: string;
}

export interface BentoGridProps {
  items: BentoItem[];
  className?: string;
}

/**
 * Bento service grid. Detail opens in a centred dialog rather than inline,
 * so the grid never reflows: tiles keep their proportions whatever is open.
 *
 * Layout is 1 large + 2 wide + 4 small on desktop, collapsing to two
 * columns and then one.
 */
export default function ExpandableBentoGrid({
  items,
  className,
}: BentoGridProps) {
  const [openId, setOpenId] = React.useState<string | number | null>(null);
  const reduceMotion = useReducedMotion();
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const active = items.find((i) => i.id === openId) ?? null;

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenId(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll while the dialog is open, and move focus into it.
  React.useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <>
      <ul
        className={cn(
          "mx-auto grid w-full grid-cols-1 items-stretch gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4",
          className,
        )}
      >
        {items.map((item, index) => {
          // 1 large + 2 wide + 4 small.
          const span =
            index === 0
              ? "md:col-span-2 lg:col-span-2 lg:row-span-2"
              : index === 5 || index === 6
                ? "lg:col-span-2"
                : "";

          return (
            <li key={item.id} className={cn("flex", span, item.className)}>
              <button
                type="button"
                onClick={() => setOpenId(item.id)}
                aria-haspopup="dialog"
                className={cn(
                  "group/card flex w-full flex-col overflow-hidden rounded-2xl border text-left transition-colors outline-none",
                  "border-white/12 bg-white/[.045] hover:border-white/20 hover:bg-white/[.07]",
                  "focus-visible:ring-2 focus-visible:ring-sky-300/60 focus-visible:ring-inset",
                )}
              >
                {/* The large tile carries its photo permanently; the small
                    cards stay icon-and-title until opened. */}
                {item.feature && item.image ? (
                  <span className="relative block min-h-[200px] w-full flex-1 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? ""}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[#062b55] via-[#062b55]/45 to-[#062b55]/5"
                    />
                    <span
                      aria-hidden
                      className="absolute top-4 left-4 grid size-10 place-items-center rounded-xl bg-[#062b55]/55 text-sky-200/90 backdrop-blur-sm"
                    >
                      {item.icon}
                    </span>
                  </span>
                ) : null}

                <span
                  className={cn(
                    "flex items-center gap-3.5",
                    item.feature ? "px-5 pt-4 pb-5" : "p-4",
                  )}
                >
                  {!item.feature ? (
                    <span
                      aria-hidden
                      className="grid size-11 flex-none place-items-center rounded-xl bg-white/[.07] text-sky-300/90"
                    >
                      {item.icon}
                    </span>
                  ) : null}

                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block font-semibold tracking-tight text-white",
                        item.feature ? "text-[19px]" : "text-[15px]",
                      )}
                    >
                      {item.title}
                    </span>
                    {item.subtitle ? (
                      <span className="mt-0.5 block truncate text-[12.5px] text-sky-100/55">
                        {item.subtitle}
                      </span>
                    ) : null}
                  </span>

                  <span
                    aria-hidden
                    className="grid size-6 flex-none place-items-center rounded-full text-sky-200/70 transition-colors group-hover/card:text-sky-100"
                  >
                    <Plus className="size-4" />
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Detail dialog — the grid behind it never moves. */}
      <AnimatePresence>
        {active ? (
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpenId(null)}
            className="fixed inset-0 z-[9000] grid place-items-center bg-[#03172c]/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              onClick={(e) => e.stopPropagation()}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 14, scale: 0.98 }
              }
              animate={
                reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 10, scale: 0.985 }
              }
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-h-[88vh] w-full max-w-[520px] flex-col overflow-hidden rounded-3xl border border-white/12 bg-[#0a2949] shadow-[0_40px_90px_rgba(3,18,38,.55)]"
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full bg-[#03172c]/60 text-sky-100 backdrop-blur-sm transition-colors outline-none hover:bg-[#03172c]/85 focus-visible:ring-2 focus-visible:ring-sky-300/60"
              >
                <X className="size-4" />
              </button>

              {active.image ? (
                <div className="relative aspect-[16/9] w-full flex-none overflow-hidden">
                  <Image
                    src={active.image}
                    alt={active.imageAlt ?? ""}
                    fill
                    sizes="520px"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#0a2949] via-[#0a2949]/30 to-transparent"
                  />
                </div>
              ) : null}

              <div className="min-h-0 overflow-y-auto px-6 pt-5 pb-6">
                <div className="flex items-center gap-3.5">
                  <span
                    aria-hidden
                    className="grid size-11 flex-none place-items-center rounded-xl bg-sky-400/20 text-sky-200"
                  >
                    {active.icon}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[19px] font-semibold tracking-tight text-white">
                      {active.title}
                    </h3>
                    {active.subtitle ? (
                      <p className="mt-0.5 text-[13px] text-sky-100/55">
                        {active.subtitle}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-5 text-[14px] leading-relaxed text-sky-100/75">
                  {active.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
