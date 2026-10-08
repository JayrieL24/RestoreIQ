"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Phone, ShieldCheck, ClipboardCheck, MessageCircle, FileCheck2 } from "lucide-react";

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

export function WhyChoose({ referenceCollage = false, showAboutLink = false }: { referenceCollage?: boolean; showAboutLink?: boolean }) {
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
            RestoreIQ is a local emergency restoration company serving
            homes and businesses with measured work, careful property protection,
            and clear documentation from the first inspection forward.
          </p>
        </Reveal>

        <div className="voda-why-grid">
          {referenceCollage ? (
            <Reveal className="voda-why-list about-method-list">
              <div className="about-method-body">
              {[
                { Icon: ShieldCheck, stage: 'Protect', details: ['Access planning', 'Belongings', 'Unaffected rooms'], title: 'Care for the whole property', body: 'We consider access, belongings, and unaffected rooms when planning work around the damage.' },
                { Icon: ClipboardCheck, stage: 'Plan', details: ['Drying options', 'Material condition', 'Scope explained'], title: 'Explain the options first', body: 'We walk you through what can be dried, what needs attention, and the reasons behind the proposed scope.' },
                { Icon: MessageCircle, stage: 'Update', details: ['Work in progress', 'Checks', 'Next steps'], title: 'Keep the next step clear', body: 'You know what the crew is working on, what we are checking, and what comes next.' },
                { Icon: FileCheck2, stage: 'Handover', details: ['Job photos', 'Readings', 'Progress notes'], title: 'Finish with a useful handover', body: 'Job photos, readings, and progress notes help you understand the work and discuss it with your adjuster.' },
              ].map((feature, index) => (
                <article className="about-method-row" key={feature.title}>
                  <span className="about-method-icon" aria-hidden><feature.Icon strokeWidth={2} /></span>
                  <div className="about-method-content"><h3>{feature.title}</h3><p>{feature.body}</p><ul className="about-method-details" aria-label="What this includes">{feature.details.map(detail => <li key={detail}>{detail}</li>)}</ul></div>
                  <span className="about-method-number"><b aria-hidden>{String(index + 1).padStart(2, '0')}</b><small>{feature.stage}</small></span>
                </article>
              ))}
              </div>
            </Reveal>
          ) : (
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
                  <span className="voda-why-node" aria-hidden />
                  <span className="voda-why-step" aria-hidden>
                    0{i + 1}
                  </span>
                  <span className="voda-why-icon" aria-hidden>
                    <WhyChooseIcon type={feature.icon} />
                  </span>
                  <div className="voda-why-text">
                    <b>{feature.title}</b>
                    <p>{feature.body}</p>
                  </div>
                </div>
              );
            })}
          </Reveal>
          )}

          {referenceCollage ? (
            <Reveal delay={0.08} className="voda-why-collage why-reference-collage">
              <div className="why-reference-photo why-reference-main"><Image src="/about/why-air-mover.png" alt="Blue air mover on a damaged subfloor beside a window" fill sizes="(max-width: 1000px) 52vw, 380px" /></div>
              <div className="why-reference-photo why-reference-meter"><Image src="/about/why-meter.png" alt="Gloved hand holding a moisture meter beside a wood doorway" fill sizes="(max-width: 1000px) 32vw, 240px" /></div>
              <div className="why-reference-photo why-reference-technician"><Image src="/about/why-technician.png" alt="Restoration technician kneeling to adjust an air mover" fill sizes="(max-width: 1000px) 36vw, 260px" /></div>
              <div className="why-reference-photo why-reference-dehumidifier"><Image src="/about/why-dehumidifier.png" alt="Blue industrial dehumidifier and air mover inside an affected room" fill sizes="(max-width: 1000px) 40vw, 300px" /></div>
            </Reveal>
          ) : (
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
          )}

          <div className="voda-why-cta">
            {showAboutLink ? <Link className="voda-btn primary" href="/about">About RestoreIQ <ArrowUpRight aria-hidden /></Link> : null}
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
      </div>
    </section>
  );
}

export default WhyChoose;
