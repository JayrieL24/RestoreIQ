"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const slides = [
  {
    image: "/hero-job-moisture.png",
    alt: "Water restoration technician checking a wall with a moisture meter",
    label: "Moisture mapping",
    title: "We find what the eye can’t see.",
  },
  {
    image: "/hero-job-extraction.png",
    alt: "Water restoration technician extracting water from carpet",
    label: "Deep extraction",
    title: "Water removed at the source.",
  },
  {
    image: "/hero-job-drying.png",
    alt: "Professional air movers and dehumidifier drying a home",
    label: "Controlled drying",
    title: "Drying planned. Progress measured.",
  },
] as const;

export function HeroJobCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      4200,
    );
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[active]!;

  return (
    <>
      <div className="ri-feature-image" aria-live="polite">
        {slides.map((item, index) => (
          <Image
            key={item.image}
            src={item.image}
            alt={index === active ? item.alt : ""}
            fill
            className={`ri-cover ri-feature-slide ${index === active ? "is-active" : ""}`}
            sizes="335px"
            priority={index === 0}
          />
        ))}
      </div>
      <div className="ri-feature-body">
        <span>{slide.label}</span>
        <h2>{slide.title}</h2>
        <div className="ri-feature-bottom">
          <div className="ri-feature-dots" aria-label="Select featured job image">
            {slides.map((item, index) => (
              <button
                key={item.image}
                type="button"
                className={index === active ? "is-active" : ""}
                onClick={() => setActive(index)}
                aria-label={`Show ${item.label}`}
                aria-current={index === active ? "true" : undefined}
              />
            ))}
          </div>
          <a href="#proof">See the process <ArrowUpRight /></a>
        </div>
      </div>
    </>
  );
}
