"use client";

import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

export interface StackItem {
  num: string;
  name: string;
  clipId: string;
  image: string;
  /** Optional supporting line shown under the active item. */
  detail?: string;
}

const defaultItems: StackItem[] = [
  {
    num: "01",
    name: "Rapid Response",
    clipId: "clip-feature",
    image: "/service-response.jpg",
  },
  {
    num: "02",
    name: "Water Restoration",
    clipId: "clip-hexagons",
    image: "/service-restoration.jpg",
  },
  {
    num: "03",
    name: "Expert Plumbing",
    clipId: "clip-pixels",
    image: "/service-plumbing.jpg",
  },
];

export const Component = ({
  items = defaultItems,
  className,
}: {
  items?: StackItem[];
  className?: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const mainGroupRef = useRef<SVGGElement>(null);
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  const createLoop = (index: number) => {
    const item = items[index];
    if (!item) return;
    const selector = `#${item.clipId} .path`;

    if (masterTl.current) masterTl.current.kill();

    if (imageRef.current) imageRef.current.setAttribute("href", item.image);
    if (mainGroupRef.current)
      mainGroupRef.current.setAttribute("clip-path", `url(#${item.clipId})`);

    gsap.set(selector, { scale: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // 1. IN (Expo Out)
    tl.to(selector, {
      scale: 1,
      duration: 0.8,
      stagger: { amount: 0.4, from: "random" },
      ease: "expo.out",
    })
      // 2. IDLE (Sine Breath)
      .to(selector, {
        scale: 1.05,
        duration: 1.5,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        stagger: { amount: 0.2, from: "center" },
      })
      // 3. OUT (Expo In)
      .to(selector, {
        scale: 0,
        duration: 0.6,
        stagger: { amount: 0.3, from: "edges" },
        ease: "expo.in",
      });

    masterTl.current = tl;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Honour reduced-motion: show the first mask, skip the looping animation.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        const first = items[0];
        if (first) gsap.set(`#${first.clipId} .path`, { scale: 1, transformOrigin: "50% 50%" });
        return;
      }
      createLoop(0);
    }, containerRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleItemHover = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const item = items[index];
      if (!item) return;
      if (imageRef.current) imageRef.current.setAttribute("href", item.image);
      if (mainGroupRef.current)
        mainGroupRef.current.setAttribute("clip-path", `url(#${item.clipId})`);
      gsap.set(`#${item.clipId} .path`, { scale: 1, transformOrigin: "50% 50%" });
      return;
    }
    createLoop(index);
  };

  const firstItem = items[0];

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex w-full flex-col items-center justify-between gap-16 overflow-hidden transition-colors duration-500 md:flex-row md:gap-10",
        className,
      )}
    >
      {/* LEFT: service list */}
      <div className="z-20 w-full md:w-1/2">
        <nav>
          <ul className="flex flex-col gap-8 lg:gap-11">
            {items.map((item, index) => (
              <li
                key={item.num}
                onMouseEnter={() => handleItemHover(index)}
                onFocus={() => handleItemHover(index)}
                className="group cursor-pointer"
              >
                <button
                  type="button"
                  onClick={() => handleItemHover(index)}
                  aria-current={activeIndex === index}
                  className="flex w-full items-start gap-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#0b86d4]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-white rounded-lg"
                >
                  <span
                    className={cn(
                      "mt-2 text-xl font-semibold tabular-nums transition-all duration-500",
                      activeIndex === index
                        ? "scale-110 text-[#0b86d4]"
                        : "text-[#9db6c9]",
                    )}
                  >
                    {item.num}
                  </span>

                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block font-[family-name:var(--font-display)] text-4xl leading-[1.02] tracking-tight transition-all duration-700 lg:text-[52px]",
                        activeIndex === index
                          ? "translate-x-2 text-[#10314f] opacity-100"
                          : "translate-x-0 text-[#5b7a92] opacity-45",
                      )}
                    >
                      {item.name}
                    </span>

                    {item.detail ? (
                      <span
                        className={cn(
                          "mt-2 block max-w-[42ch] text-[15px] leading-relaxed text-[#2c5876] transition-all duration-500",
                          activeIndex === index
                            ? "translate-x-2 opacity-100"
                            : "translate-x-0 opacity-0",
                        )}
                      >
                        {item.detail}
                      </span>
                    ) : null}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* RIGHT: clip-path mosaic */}
      <div className="relative mt-4 flex w-full items-center justify-center md:mt-0 md:w-1/2">
        <div className="absolute h-[120%] w-[120%] rounded-full bg-[#0b86d4]/10 blur-[120px] transition-opacity duration-1000" />

        <svg
          viewBox="0 0 500 500"
          aria-hidden
          className="z-10 h-auto w-full max-w-[500px] drop-shadow-xl"
        >
          <defs>
            {/* Editorial split: one tall feature panel beside stacked
                supporting tiles. Replaces the source component's burger
                silhouette, which read as food, not restoration. */}
            <clipPath id="clip-feature">
              <rect className="path" x="20" y="20" width="290" height="290" rx="14" />
              <rect className="path" x="326" y="20" width="154" height="138" rx="14" />
              <rect className="path" x="326" y="172" width="154" height="138" rx="14" />
              <rect className="path" x="20" y="326" width="140" height="154" rx="14" />
              <rect className="path" x="176" y="326" width="134" height="154" rx="14" />
              <rect className="path" x="326" y="326" width="154" height="154" rx="14" />
            </clipPath>

            <clipPath id="clip-hexagons">
              <rect className="path" x="20" y="20" width="200" height="280" rx="12" />
              <rect className="path" x="20" y="320" width="200" height="160" rx="12" />
              <rect className="path" x="240" y="20" width="240" height="140" rx="12" />
              <rect className="path" x="240" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="370" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="240" y="360" width="240" height="120" rx="12" />
            </clipPath>

            <clipPath id="clip-pixels">
              {Array.from({ length: 9 }).map((_, i) => (
                <rect
                  key={i}
                  className="path"
                  x={(i % 3) * 160 + 20}
                  y={Math.floor(i / 3) * 160 + 20}
                  width="140"
                  height="140"
                  rx="4"
                />
              ))}
            </clipPath>

            {/* Fourth mask: staggered vertical bands, for a 4-item stack. */}
            <clipPath id="clip-bands">
              <rect className="path" x="20" y="20" width="105" height="300" rx="10" />
              <rect className="path" x="135" y="60" width="105" height="300" rx="10" />
              <rect className="path" x="250" y="20" width="105" height="300" rx="10" />
              <rect className="path" x="365" y="60" width="105" height="300" rx="10" />
              <rect className="path" x="20" y="336" width="220" height="144" rx="10" />
              <rect className="path" x="250" y="376" width="220" height="104" rx="10" />
            </clipPath>
          </defs>

          {firstItem ? (
            <g ref={mainGroupRef} clipPath={`url(#${firstItem.clipId})`}>
              <image
                ref={imageRef}
                href={firstItem.image}
                width="500"
                height="500"
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          ) : null}
        </svg>
      </div>
    </div>
  );
};
