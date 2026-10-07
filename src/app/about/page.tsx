import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { WhyChoose } from "@/components/sections/why-choose";
import { process } from "@/lib/process";
import { serviceAreas } from "@/lib/service-areas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About RestoreIQ",
  description:
    "How RestoreIQ works: the five stages of a restoration job, how the scope is set from moisture readings, and the records your claim is built on.",
};

export default function AboutPage() {
  const tel = site.phone.replace(/[^\d+]/g, "");

  return (
    <article className="voda-site ri26-detail">
      {/* Hero follows the service and area pages, so the page sits in the
          same family rather than introducing a third treatment. */}
      <header className="ri26-detail-hero ri26-about-hero">
        <div className="ri26-hero-photo">
          <Image src="/Real-life-images/MSP_7604.jpg" alt="" fill priority sizes="100vw" className="voda-cover" />
        </div>
        <div aria-hidden className="ri26-hero-grid" />
        <div className="ri26-hero-shade" />
        <div className="voda-wrap">
          <div className="ri26-hero-copy-col">
            <p className="ri26-kicker"><Phone aria-hidden /> Ventura County &middot; 24/7</p>
            <h1>How we <em>work.</em></h1>
            <p className="ri26-detail-copy">
              RestoreIQ is an emergency restoration company working across Ventura County.
              This is the process every job follows, and the standard it is held to.
            </p>
            <div className="voda-actions">
              <a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a>
              <Link className="voda-btn glass" href="/contact">{site.cta.request} <ArrowRight aria-hidden /></Link>
            </div>
          </div>
        </div>
        <svg className="ri26-hero-wave" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 150V60C240 6 560 -12 860 22C1080 47 1280 76 1440 42V150Z" />
        </svg>
      </header>

      {/* Who we are, and the facts that qualify it. */}
      <section className="ri26-section ri26-about-intro" aria-labelledby="about-intro-heading">
        <div className="voda-wrap ri26-about-intro-grid">
          <div>
            <span className="voda-eyebrow">Who we are</span>
            <h2 id="about-intro-heading">Restoration work,<br /><em>documented as it happens.</em></h2>
          </div>
          <div className="ri26-about-intro-copy">
            <p>
              Water, fire, smoke and contaminated-water losses are handled by one Ventura
              County operation, so the same process reaches every property we attend.
              Crews arrive with meters and cameras, and the readings taken on the first
              visit set the scope for everything that follows.
            </p>
            <p>
              That matters because drying is not finished when a room feels dry. It is
              finished when the materials reach a target measured against an unaffected
              part of the same building — and we can show you the readings that prove it.
            </p>
            <dl className="ri26-about-facts">
              <div>
                <dt>Emergency line</dt>
                <dd>{site.coverage.hours}</dd>
              </div>
              <div>
                <dt>Service area</dt>
                <dd>{serviceAreas.length} Ventura County cities</dd>
              </div>
              <div>
                <dt>Office hours</dt>
                <dd>{site.coverage.officeHours}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* The five stages — the same data the homepage brief uses. */}
      <section className="ri26-section voda-process voda-process-brief" id="process" aria-labelledby="about-process-heading">
        <div className="voda-wrap">
          <div className="voda-heading">
            <span className="voda-eyebrow">What happens after you call</span>
            <h2 id="about-process-heading">A clear path from emergency<br /><em>to restored.</em></h2>
            <p>Five straightforward stages so you always know what comes next.</p>
          </div>
          <div className="voda-step-grid voda-step-grid-five">
            {process.map(({ title, accent, copy, icon: Icon }, index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <div><Icon aria-hidden /></div>
                <h3>{title} <em>{accent}</em></h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why RestoreIQ — the existing section, unchanged. */}
      <WhyChoose />

      <section className="voda-cta-band ri26-area-cta" aria-labelledby="about-cta-heading">
        <div className="voda-wrap voda-cta-band-inner">
          <div>
            <span className="voda-eyebrow light">Ready when you are</span>
            <h2 id="about-cta-heading">Tell us what happened.</h2>
            <p>We will talk through what you are seeing and what happens next.</p>
          </div>
          <div className="voda-cta-band-actions">
            <Link className="voda-btn primary" href="/contact">Contact us <ArrowRight aria-hidden /></Link>
            <a className="voda-cta-band-call" href={`tel:${tel}`}>
              <span className="voda-cta-band-icon" aria-hidden><Phone aria-hidden /></span>
              <span><small>24/7 emergency line</small><b>{site.phone}</b></span>
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
