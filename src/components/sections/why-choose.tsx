"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, Phone } from "lucide-react";

import { WhyChooseIcon } from "@/components/why-choose-icon";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

const real = "/Real-life-images/";

type Feature = {
  /** Key into the trade-specific glyph set. */
  icon: "care" | "scope" | "updates" | "crew";
  title: string;
  body: string;
};

/**
 * ⚠️ PLACEHOLDER COPY — these describe standard restoration practice.
 * Confirm each claim matches how RestoreIQ actually operates before launch.
 */
const features: Feature[] = [
  {
    icon: "care",
    title: "Professional care",
    body: "Every job is handled with respect for your time, your property, and your peace of mind.",
  },
  {
    icon: "scope",
    title: "Solutions for every need",
    body: "From routine moisture checks to full emergency restoration, one crew covers the whole job.",
  },
  {
    icon: "updates",
    title: "Clear communication",
    body: "You always know what to expect, what comes next, and who is working in your home.",
  },
  {
    icon: "crew",
    title: "Local experts, real support",
    body: "Responsive local crews, backed by proper equipment and current certification.",
  },
];

export function WhyChoose() {
  // The reference highlights one item at a time; hovering or focusing a row
  // moves the highlight, and the second row is lit on load.
  const [active, setActive] = React.useState(1);

  return (
    <section className="voda-why" id="why-choose" aria-labelledby="why-heading">
      <div className="voda-wrap">
        <Reveal className="voda-heading">
          <span className="voda-eyebrow">Cleaner homes. Greater peace of mind.</span>
          <h2 id="why-heading">
            Why homeowners &amp; businesses<br />
            <em>choose RestoreIQ</em>
          </h2>
          <p>
            The care of a local crew, with the standards, equipment, and
            documentation of a much larger operation.
          </p>
        </Reveal>

        <div className="voda-why-grid">
          <Reveal className="voda-why-list">
            {features.map((feature, i) => {
              return (
                <div
                  key={feature.title}
                  className={cn("voda-why-item", i === active && "is-active")}
                  onMouseEnter={() => setActive(i)}
                  onFocusCapture={() => setActive(i)}
                  tabIndex={0}
                >
                  <span className="voda-why-icon" aria-hidden>
                    <WhyChooseIcon type={feature.icon} />
                  </span>
                  <div>
                    <b>{feature.title}</b>
                    <p>{feature.body}</p>
                  </div>
                </div>
              );
            })}
          </Reveal>

          <Reveal delay={0.08} className="voda-why-collage">
            {/* Tall portrait frame, as in the reference. */}
            <div className="voda-why-photo main">
              <Image
                src={`${real}IMG_2342.jpg`}
                alt="RestoreIQ technician extracting water from a carpeted floor"
                fill
                className="voda-cover"
                sizes="(max-width: 950px) 60vw, 300px"
              />
            </div>

            {/* Circular inset, top right. */}
            <div className="voda-why-photo circle">
              <Image
                src={`${real}IMG_2347.jpg`}
                alt="Air mover positioned on a drying hardwood floor"
                fill
                className="voda-cover"
                sizes="200px"
              />
            </div>

            {/* Rounded square, lower right, overlapping the frame above. */}
            <div className="voda-why-photo lower">
              <Image
                src={`${real}MSP_7604.jpg`}
                alt="Restored living room after water damage repair"
                fill
                className="voda-cover"
                sizes="(max-width: 950px) 50vw, 260px"
              />
            </div>

            {/* Floating stat badge. ⚠️ PLACEHOLDER FIGURE. */}
            <div className="voda-why-photo detail">
              <Image
                src={`${real}IMG_6585.jpg`}
                alt="Restoration equipment operating inside an affected room"
                fill
                className="voda-cover"
                sizes="(max-width: 950px) 42vw, 220px"
              />
            </div>

            <div className="voda-why-photo finish">
              <Image
                src={`${real}MSP_7581-Edit.jpg`}
                alt="RestoreIQ technician completing careful restoration work"
                fill
                className="voda-cover"
                sizes="(max-width: 950px) 46vw, 250px"
              />
            </div>
          </Reveal>
        </div>

        <div className="voda-why-cta">
          <a className="voda-btn primary" href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>
            Get emergency help <ArrowUpRight aria-hidden />
          </a>
          <a className="voda-why-call" href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>
            <span className="voda-why-call-icon" aria-hidden><Phone aria-hidden /></span>
            <span>
              <small>Call us now</small>
              <b>{site.phone}</b>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
