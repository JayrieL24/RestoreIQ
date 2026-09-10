"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

/**
 * ⚠️ PLACEHOLDER REVIEWS — replace with real, attributable customer
 * feedback before launch. Published testimonials must be genuine.
 */
const testimonials: Testimonial[] = [
  {
    quote:
      "RestoreIQ made an overwhelming situation feel organized from the very first phone call. We always knew what was happening next.",
    image: "/review-maya.png",
    name: "Maya Chen",
    role: "Water restoration",
  },
  {
    quote:
      "The team arrived quickly, protected our floors, and explained every part of the drying process before they started.",
    image: "/review-daniel.png",
    name: "Daniel Foster",
    role: "Emergency response",
  },
  {
    quote:
      "Every moisture reading and insurance update was documented clearly. Nothing was left for us to chase.",
    image: "/review-james.png",
    name: "James Wilson",
    role: "Structural drying",
  },
  {
    quote:
      "They found the hidden leak and handled the repair without turning our home upside down.",
    image: "/review-sarah.png",
    name: "Sarah Mitchell",
    role: "Leak detection",
  },
  {
    quote:
      "Our water finally tastes clean, and the filtration system was installed beautifully.",
    image: "/review-amelia.png",
    name: "Amelia Torres",
    role: "Water treatment",
  },
  {
    quote:
      "Professional, calm, and incredibly careful with our home. The finished repair is seamless.",
    image: "/review-olivia.png",
    name: "Oliver Martin",
    role: "Home restoration",
  },
  {
    quote:
      "The response time was excellent and their communication was even better throughout.",
    image: "/review-noah.png",
    name: "Naomi Williams",
    role: "Emergency plumbing",
  },
];

const PER_PAGE = 3;

function DecorIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 left-0 z-[1] size-3.5 shrink-0 -translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)] stroke-1 stroke-white/25",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function QuoteIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

export function TestimonialsSection({ className }: { className?: string }) {
  const pageCount = Math.ceil(testimonials.length / PER_PAGE);
  const [page, setPage] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const reduceMotion = useReducedMotion();

  const move = (step: number) => {
    setDirection(step);
    setPage((p) => (p + step + pageCount) % pageCount);
  };

  // 7 reviews across pages of 3 would leave a lone card on the last page,
  // so the selection wraps around to fill every page.
  const visible = Array.from({ length: PER_PAGE }, (_, i) =>
    testimonials[(page * PER_PAGE + i) % testimonials.length],
  ).filter((t): t is Testimonial => Boolean(t));

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={page}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 28 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -28 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-3 md:gap-6"
        >
          {visible.map((testimonial, index) => (
            <TestimonialCard
              index={index}
              key={testimonial.name}
              testimonial={testimonial}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mx-auto mt-14 flex w-full max-w-5xl items-center justify-center gap-4 md:mt-24">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous testimonials"
          className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/[.06] text-white transition-colors outline-none hover:border-[#55dce3]/50 hover:bg-white/[.12] focus-visible:ring-2 focus-visible:ring-[#55dce3]/50"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex items-center gap-2.5" role="tablist" aria-label="Testimonial pages">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === page}
              aria-label={`Page ${i + 1} of ${pageCount}`}
              onClick={() => {
                setDirection(i > page ? 1 : -1);
                setPage(i);
              }}
              className={cn(
                "h-2 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#55dce3]/50",
                i === page
                  ? "w-7 bg-[#55dce3]"
                  : "w-2 bg-white/25 hover:bg-white/45",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next testimonials"
          className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/[.06] text-white transition-colors outline-none hover:border-[#55dce3]/50 hover:bg-white/[.12] focus-visible:ring-2 focus-visible:ring-[#55dce3]/50"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  className,
  ...props
}: React.ComponentProps<"figure"> & {
  testimonial: Testimonial;
  index: number;
}) {
  const { quote, name, role, image } = testimonial;

  return (
    <figure
      className={cn(
        "group relative flex flex-col justify-between gap-6 px-8 pt-8 pb-6",
        "md:translate-y-[calc(2.5rem*var(--t-card-index))]",
        "bg-[radial-gradient(50%_80%_at_25%_0%,rgba(255,255,255,.08),transparent)]",
        className,
      )}
      style={{ "--t-card-index": index } as React.CSSProperties}
      {...props}
    >
      <div className="absolute -inset-y-4 -left-px w-px bg-white/12" />
      <div className="absolute -inset-y-4 -right-px w-px bg-white/12" />
      <div className="absolute -inset-x-4 -top-px h-px bg-white/12" />
      <div className="absolute -right-4 -bottom-px -left-4 h-px bg-white/12" />
      <DecorIcon />

      <span className="w-fit rounded-full border border-white/12 bg-white/[.06] px-3 py-1 text-[11px] font-semibold tracking-wide text-[#9fc3dd] uppercase">
        {role}
      </span>

      <blockquote className="flex gap-4">
        <QuoteIcon
          aria-hidden="true"
          className="size-6 shrink-0 stroke-1 text-[#ffd21c]"
        />
        <p className="flex-1 text-[15px] leading-relaxed text-[#a8c0d2]">
          {quote}
        </p>
      </blockquote>

      <figcaption className="flex items-center gap-3">
        <Avatar className="size-10 rounded-full ring-2 ring-white/15 ring-offset-2 ring-offset-[#071d35] transition-shadow group-hover:ring-[#ffd21c]/40">
          <AvatarImage alt={name} src={image} />
          <AvatarFallback className="bg-white/10 text-[#cfe0ee]">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="text-sm font-semibold text-white not-italic">
            {name}
          </cite>
          <p className="text-xs text-[#8aa5bd]">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default TestimonialsSection;
