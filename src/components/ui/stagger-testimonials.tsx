"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);
const initialTestimonials = [
  { tempId: 0, quote: "RestoreIQ made an overwhelming situation feel organized from the very first phone call.", by: "Maya Chen", service: "Water restoration", image: "/review-maya.png" },
  { tempId: 1, quote: "The team arrived quickly, protected our floors, and explained every part of the drying process.", by: "Daniel Foster", service: "Emergency response", image: "/review-daniel.png" },
  { tempId: 2, quote: "They found the hidden leak and handled the repair without turning our home upside down.", by: "Sarah Mitchell", service: "Leak detection", image: "/review-sarah.png" },
  { tempId: 3, quote: "Every moisture reading and insurance update was documented clearly. We always knew what came next.", by: "James Wilson", service: "Structural drying", image: "/review-james.png" },
  { tempId: 4, quote: "Our water finally tastes clean, and the filtration system was installed beautifully.", by: "Amelia Torres", service: "Water treatment", image: "/review-amelia.png" },
  { tempId: 5, quote: "Professional, calm, and incredibly careful with our home. The finished repair is seamless.", by: "Oliver Martin", service: "Home restoration", image: "/review-olivia.png" },
  { tempId: 6, quote: "The response time was excellent and their communication was even better.", by: "Naomi Williams", service: "Emergency plumbing", image: "/review-noah.png" },
];

type Testimonial = (typeof initialTestimonials)[number];

function TestimonialCard({ position, testimonial, move, size }: { position: number; testimonial: Testimonial; move: (steps: number) => void; size: number }) {
  const highlighted = position === 0;
  return (
    <button
      type="button"
      onClick={() => move(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border p-8 text-left backdrop-blur-xl transition-all duration-500 ease-in-out",
        highlighted
          ? "z-10 border-white/20 bg-[#0a3a6b]/85 text-white shadow-[0_20px_60px_rgba(8,44,88,.35),inset_0_1px_0_rgba(255,255,255,.18)]"
          : "z-0 border-white/80 bg-white/55 text-[#10233d] shadow-[0_10px_30px_rgba(16,58,94,.07),0_30px_64px_rgba(16,58,94,.05),inset_0_1px_0_rgba(255,255,255,.9)] hover:border-white/95 hover:bg-white/70",
      )}
      style={{
        width: size,
        height: size,
        clipPath: "polygon(50px 0, calc(100% - 50px) 0, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `translate(-50%, -50%) translateX(${(size / 1.5) * position}px) translateY(${highlighted ? -65 : position % 2 ? 15 : -15}px) rotate(${highlighted ? 0 : position % 2 ? 2.5 : -2.5}deg)`,
        boxShadow: highlighted ? "0 12px 0 -4px rgba(7,42,98,.18), 0 30px 70px rgba(7,42,98,.25)" : "0 18px 50px rgba(25,77,116,.09)",
      }}
      aria-label={`Show testimonial from ${testimonial.by}`}
      data-highlighted={highlighted ? "true" : "false"}
    >
      <span className={cn("absolute block origin-top-right rotate-45", highlighted ? "bg-[#417db9]" : "bg-white/80")} style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}/>
      <span className={cn("relative mb-5 block size-14 overflow-hidden rounded-full ring-2", highlighted ? "ring-[#4c93d6]" : "ring-white/90")}>
        <Image src={testimonial.image} alt={testimonial.by} fill className="object-cover" sizes="56px"/>
      </span>
      <Quote className={cn("mb-4 size-6", highlighted ? "fill-[#14589a] text-[#6aa8e3]" : "fill-[#dcecf9] text-[#2178dc]")}/>
      <h3 className="pb-16 text-[17px] font-medium leading-relaxed sm:text-lg">
        &ldquo;{testimonial.quote}&rdquo;
      </h3>
      <p className={cn("absolute bottom-8 left-8 right-8 border-t pt-4", highlighted ? "border-white/15 text-[#b7d0e6]" : "border-[#96bad6]/25 text-[#718596]")}>
        <strong className={cn("block text-sm", highlighted ? "text-white" : "text-[#17304c]")}>{testimonial.by}</strong>
        <span className="mt-1 block text-xs">{testimonial.service}</span>
      </p>
    </button>
  );
}

export function StaggerTestimonials() {
  const [size, setSize] = useState(365);
  const [items, setItems] = useState(initialTestimonials);

  const move = (steps: number) => {
    const next = [...items];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = next.shift();
        if (!item) return;
        next.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = next.pop();
        if (!item) return;
        next.unshift({ ...item, tempId: Math.random() });
      }
    }
    setItems(next);
  };

  useEffect(() => {
    const resize = () => setSize(window.matchMedia("(min-width: 640px)").matches ? 365 : 290);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="relative h-[570px] w-full overflow-hidden">
      {items.map((testimonial, index) => {
        const position = index - Math.floor(items.length / 2);
        return <TestimonialCard key={testimonial.tempId} testimonial={testimonial} position={position} move={move} size={size}/>;
      })}
      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        <button type="button" onClick={() => move(-1)} className="grid size-12 place-items-center rounded-full border border-[#c7ddeb] bg-white text-[#15314e] shadow-lg transition hover:bg-[#072a62] hover:text-white" aria-label="Previous testimonial"><ChevronLeft className="size-4"/></button>
        <button type="button" onClick={() => move(1)} className="grid size-12 place-items-center rounded-full border border-[#c7ddeb] bg-white text-[#15314e] shadow-lg transition hover:bg-[#072a62] hover:text-white" aria-label="Next testimonial"><ChevronRight className="size-4"/></button>
      </div>
    </div>
  );
}
