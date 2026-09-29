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

const features: Feature[] = [
  {
    icon: "care",
    title: "Emergency restoration focus",
    body: "The team focuses on water, fire, smoke, sewage, contents protection, and reconstruction.",
  },
  {
    icon: "scope",
    title: "Scope from the readings",
    body: "The restoration plan follows documented moisture conditions instead of guesswork.",
  },
  {
    icon: "updates",
    title: "Clear communication",
    body: "The scope, progress, and next steps are explained throughout the project.",
  },
  {
    icon: "crew",
    title: "Insurance-ready records",
    body: "Photographs, moisture readings, and job progress can be organized for the adjuster.",
  },
];

export function WhyChoose() {
  // The reference highlights one item at a time; hovering or focusing a row
  // moves the highlight, and the second row is lit on load.
  const [active, setActive] = React.useState(1);

  return (
    <section className="voda-why" id="why-us" aria-labelledby="why-heading">
      <div className="voda-wrap">
        <Reveal className="voda-heading">
          <span className="voda-eyebrow">About RestoreIQ</span>
          <h2 id="why-heading">
            Local restoration, built around<br />
            <em>clear decisions.</em>
          </h2>
          <p>
            RestoreIQ is a Ventura County emergency restoration company serving
            homes and businesses with measured work, careful property protection,
            and clear documentation from the first inspection forward.
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
            {site.cta.call} <ArrowUpRight aria-hidden />
          </a>
          <a className="voda-why-call" href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>
            <span className="voda-why-call-icon" aria-hidden><Phone aria-hidden /></span>
            <span>
              <small>24/7 emergency line</small>
              <b>{site.phone}</b>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
