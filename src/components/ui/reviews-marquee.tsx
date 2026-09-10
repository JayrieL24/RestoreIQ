"use client";

import * as React from "react";
import { MoveHorizontal, Star } from "lucide-react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Review = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

/**
 * ⚠️ PLACEHOLDER REVIEWS — replace with real, attributable customer
 * feedback before launch. Published testimonials must be genuine.
 */
const reviews: Review[] = [
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

/* ⚠️ PLACEHOLDER FIGURES — replace with the real aggregate before launch. */
const rating = { score: "4.9", count: "270", platform: "Google & Facebook" };

/** Pixels travelled per second by the auto-scroll. */
const SPEED = 34;
/** Arc swept across one viewport width, in radians. 0.42 rad ~ 24deg, so
    a card tilts about +/-12deg by the time it reaches either edge. */
const ARC = 0.42;
/** Disc radius in px. Sets how far a card falls: R(1 - cos a), which at
    the viewport edge works out to roughly 60px. */
const R = 1150;

function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-[3px]", className)} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="size-3 fill-[#ffd21c] stroke-none" />
      ))}
    </span>
  );
}

export function ReviewsMarquee({ className }: { className?: string }) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Offset is kept in a ref, not state: the RAF loop writes it every frame
  // and re-rendering React 60 times a second for a transform is wasteful.
  const offset = React.useRef(0);
  const paused = React.useRef(false);
  // Nudges from the arrow buttons decay back into the constant drift.
  const nudge = React.useRef(0);

  // The track holds the reviews twice; one copy's width is the loop period.
  const [span, setSpan] = React.useState(0);

  // Card layout positions, cached so the RAF loop never reads geometry.
  const cardsRef = React.useRef<Array<{ el: HTMLElement; base: number; half: number }>>([]);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      setSpan(track.scrollWidth / 2);
      cardsRef.current = Array.from(track.children).map((child) => {
        const el = child as HTMLElement;
        return { el, base: el.offsetLeft, half: el.offsetWidth / 2 };
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport || !span || reduceMotion) return;

    const cards = cardsRef.current;
    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!paused.current) offset.current += SPEED * dt;

      if (nudge.current) {
        // Ease the remaining nudge distance down at ~8%/frame-equivalent.
        const step = nudge.current * Math.min(dt * 6, 1);
        offset.current += step;
        nudge.current -= step;
        if (Math.abs(nudge.current) < 0.5) nudge.current = 0;
      }

      // Wrap within one copy so the seam is never visible.
      offset.current = ((offset.current % span) + span) % span;
      track.style.transform = `translate3d(${-offset.current}px,0,0)`;

      // The disc: a large circle centred below the viewport. Each card is
      // placed by where it currently sits on screen, not by its index, so
      // the curve stays fixed in space and the cards ride over it.
      const vw = viewport.clientWidth;
      const cx = vw / 2;
      for (const card of cards) {
        // Card centre in viewport space, derived from layout + scroll
        // offset — reading getBoundingClientRect every frame would force
        // a layout flush per card.
        const x = card.base - offset.current + card.half;
        // Angle around the disc. The viewport spans ARC radians of the
        // circle, so a card's screen position maps straight onto an angle
        // and every card — on or off screen — sits somewhere real on the
        // curve. No clamping, so the loop stays continuous.
        // Wrapped into one loop period first, so a card leaving the right
        // edge re-enters at the left rather than continuing to rotate
        // further and further around the disc.
        let dx = x - cx;
        dx = ((dx % span) + span) % span;
        if (dx > span / 2) dx -= span;
        const a = (dx / vw) * ARC;
        // Rise and fall of a point on a circle of radius R, measured down
        // from the top: R(1 - cos a).
        const drop = R * (1 - Math.cos(a));
        // Tangent to the circle at that angle — this is what sells the roll.
        const tilt = (a * 180) / Math.PI;
        card.el.style.transform =
          `translate3d(0,${drop.toFixed(2)}px,0) rotate(${tilt.toFixed(2)}deg)`;
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [span, reduceMotion]);

  // Drag-to-scrub. The RAF loop already owns `offset`, so a drag just
  // writes into it directly and lets the loop keep rendering; releasing
  // hands the residual velocity to `nudge` so the strip glides to a stop
  // instead of halting dead.
  const drag = React.useRef<{ id: number; x: number; last: number; v: number } | null>(null);
  const [dragging, setDragging] = React.useState(false);
  // Set once the visitor has actually swiped, so the hint can retire.
  const [swiped, setSwiped] = React.useState(false);

  const onPointerDown = (e: React.PointerEvent) => {
    // Ignore secondary buttons; let text selection work with a modifier.
    if (e.button !== 0) return;
    drag.current = { id: e.pointerId, x: e.clientX, last: e.clientX, v: 0 };
    paused.current = true;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.last;
    d.last = e.clientX;
    d.v = dx;
    // Dragging right should reveal earlier cards, so subtract.
    offset.current -= dx;
    if (reduceMotion && trackRef.current && span) {
      offset.current = ((offset.current % span) + span) % span;
      trackRef.current.style.transform = `translate3d(${-offset.current}px,0,0)`;
    }
    if (!swiped && Math.abs(e.clientX - d.x) > 24) setSwiped(true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const card = trackRef.current?.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 28 : 360;
    const dir = e.key === "ArrowRight" ? 1 : -1;
    if (reduceMotion && trackRef.current && span) {
      offset.current = ((offset.current + dir * step) % span + span) % span;
      trackRef.current.style.transform = `translate3d(${-offset.current}px,0,0)`;
    } else {
      nudge.current += dir * step;
    }
    if (!swiped) setSwiped(true);
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    // Carry the last frame's velocity into the existing nudge easing.
    if (!reduceMotion) nudge.current -= d.v * 8;
    drag.current = null;
    paused.current = false;
    setDragging(false);
  };

  // Doubled so the loop has a seamless second copy to scroll into.
  const loop = [...reviews, ...reviews];

  return (
    <div className={cn("voda-marquee", className)}>
      <div className="voda-rating-bar">
        <Stars />
        <b>{rating.score}</b>
        <span>
          from <b>{rating.count}</b> verified homeowner reviews
        </span>
        <i aria-hidden />
        <span>{rating.platform}</span>
      </div>

      <div
        className={cn("voda-marquee-viewport", dragging && "is-dragging")}
        ref={viewportRef}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onFocusCapture={() => (paused.current = true)}
        onBlurCapture={() => (paused.current = false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Customer reviews — use arrow keys or swipe to browse"
      >
        <div className="voda-marquee-track" ref={trackRef}>
          {loop.map((review, i) => (
            <ReviewCard
              key={`${review.name}-${i}`}
              review={review}
              duplicate={i >= reviews.length}
            />
          ))}
        </div>
      </div>

      {/* Affordance rather than controls: the strip is drag/swipe scrubbed,
          so this says so and retires once the visitor has done it. */}
      <p className={cn("voda-marquee-hint", swiped && "is-used")} aria-hidden>
        <MoveHorizontal />
        Swipe to explore reviews
      </p>
    </div>
  );
}

function ReviewCard({
  review,
  duplicate,
}: {
  review: Review;
  duplicate: boolean;
}) {
  const { quote, name, role, image } = review;

  return (
    <figure
      className="voda-review-card"
      // The second copy exists only to make the loop seamless; screen
      // readers should hear each review once.
      aria-hidden={duplicate || undefined}
    >
      <span className="voda-review-role">{role}</span>
      <Stars className="voda-review-stars" />
      <blockquote>{quote}</blockquote>
      <figcaption>
        <Avatar className="size-10 rounded-full ring-2 ring-white/15">
          <AvatarImage alt={name} src={image} />
          <AvatarFallback className="bg-white/10 text-[#cfe0ee]">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <cite>{name}</cite>
          <small>{role}</small>
        </div>
      </figcaption>
    </figure>
  );
}

export default ReviewsMarquee;
