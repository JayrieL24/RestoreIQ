"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type ServiceRailItem = {
  title: string;
  copy: string;
  icon: React.ReactNode;
  href: string;
};

export function ServiceRail({ items }: { items: ServiceRailItem[] }) {
  const [paused, setPaused] = React.useState(false);
  const viewport = React.useRef<HTMLDivElement>(null);
  const firstGroup = React.useRef<HTMLDivElement>(null);
  const resumeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); };
  }, []);

  function pause() {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }

  function resume(delay = 0) {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { setPaused(false); }, delay);
  }

  function move(direction: -1 | 1) {
    pause();
    const element = viewport.current;
    const group = firstGroup.current;
    if (!element || !group) return;

    const cards = group.querySelectorAll<HTMLElement>(".voda-service-rail-card");
    const firstCard = cards.item(0);
    const secondCard = cards.item(1);
    const stride = secondCard
      ? secondCard.offsetLeft - firstCard.offsetLeft
      : (firstCard?.offsetWidth ?? 320) + 16;
    const loopWidth = group.scrollWidth;
    let current = element.scrollLeft;

    // The second group is a visual duplicate. Normalize from it before moving
    // again so the wrap is invisible and every click still advances one card.
    if (current >= loopWidth) {
      current -= loopWidth;
      element.scrollLeft = current;
    }

    let target = current + direction * stride;

    if (target < 0) {
      element.scrollLeft = loopWidth;
      target = loopWidth - stride;
    }

    element.scrollTo({ left: target, behavior: "smooth" });
  }

  const cards = (duplicate = false) => items.map(({ title, copy, icon, href }) => (
    <Link className="voda-service-rail-card" href={href} key={`${duplicate ? "copy-" : ""}${href}`} tabIndex={duplicate ? -1 : undefined}>
      <span className="voda-service-rail-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
      <span className="voda-service-rail-link">View service <ArrowRight aria-hidden /></span>
    </Link>
  ));

  return (
    <div
      className={`voda-service-rail-shell${paused ? " is-paused" : ""}`}
      onMouseEnter={pause}
      onMouseLeave={() => resume()}
      onFocusCapture={pause}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) resume(); }}
    >
      <div
        className="voda-service-rail-viewport"
        ref={viewport}
        tabIndex={0}
        aria-label="RestoreIQ restoration services"
        onPointerDown={pause}
        onPointerUp={(event) => { if (event.pointerType !== "mouse") resume(1200); }}
        onPointerCancel={(event) => { if (event.pointerType !== "mouse") resume(1200); }}
      >
        <div className="voda-service-rail-track">
          <div className="voda-service-rail-group" ref={firstGroup}>{cards()}</div>
          <div className="voda-service-rail-group" aria-hidden="true">{cards(true)}</div>
        </div>
      </div>
      <button className="voda-service-rail-nav voda-service-rail-prev" type="button" onClick={() => move(-1)} aria-label="Previous services"><ArrowLeft aria-hidden /></button>
      <button className="voda-service-rail-nav voda-service-rail-next" type="button" onClick={() => move(1)} aria-label="Next services"><ArrowRight aria-hidden /></button>
    </div>
  );
}
