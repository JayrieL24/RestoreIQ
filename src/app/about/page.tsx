import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Headphones, MapPin, ShieldCheck, FileText, Globe2, BadgeCheck, MessageCircle, Check } from "lucide-react";

import { WhyChoose } from "@/components/sections/why-choose";
import { Faq } from "@/components/sections/faq";
import { process } from "@/lib/process";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About RestoreIQ",
  description:
    "How RestoreIQ works: the five stages of a restoration job, how the scope is set from moisture readings, and the records your claim is built on.",
};

export default function AboutPage() {
  const tel = site.phone.replace(/[^\d+]/g, "");

  return (
    <article className="voda-site ri26-detail about-page">
      <header className="about-reference-hero">
        <Image src="/about/about-hero-matte-v3.png" alt="Restoration technician setting up a blue air mover inside a home" fill priority sizes="100vw" className="about-reference-photo" />
        <div className="about-reference-shade" />
        <div className="voda-wrap about-reference-hero-inner">
          <div className="about-reference-copy">
            <p className="about-reference-eyebrow">About RestoreIQ</p>
            <h1><span>People. Response.</span><em>Restoration.</em></h1>
            <p className="about-reference-description">We're a Ventura County restoration company helping homeowners and businesses recover from water, fire, smoke and other property damage, with expertise, compassion, and a commitment to doing things right.</p>
            <div className="about-reference-actions">
              <a className="about-reference-button primary" href={`tel:${tel}`}><Phone aria-hidden /> Call 24/7</a>
              <a className="about-reference-button outline" href="#our-story">Our story <ArrowRight aria-hidden /></a>
            </div>
            <ul className="about-reference-trust">
              <li><Headphones aria-hidden /><span><b>24/7</b><small>Emergency support</small></span></li>
              <li><MapPin aria-hidden /><span><b>Local</b><small>Hands-on team</small></span></li>
              <li><ShieldCheck aria-hidden /><span><b>Insurance-ready</b><small>Documentation</small></span></li>
            </ul>
          </div>
          <div className="about-reference-note hero-note" aria-hidden="true">Real people.<br />Real solutions.<br />Local to you.<svg viewBox="0 0 90 70" fill="none"><path d="M75 5C70 35 42 52 12 54M12 54l18-14M12 54l23 7" /></svg></div>
        </div>
        <svg className="about-reference-wave" viewBox="0 0 1440 45" preserveAspectRatio="none" aria-hidden="true"><path d="M0 15Q650 80 1440 8V45H0Z" /></svg>
      </header>

      <section className="about-text-story" id="our-story" aria-labelledby="about-story-heading">
        <div className="about-text-layout">
          <div className="about-text-intro">
            <p className="voda-eyebrow">Who we are</p>
            <h2 id="about-story-heading">A local team<br />with a<br /><em>higher standard.</em></h2>
            <p>Restoration isn’t just about equipment and repairs; it’s about people. We’re a local, hands-on team that treats every property like our own.</p>
            <p>From the first call to the final walkthrough, we bring experience, clear communication, and an unwavering commitment to doing what’s right for our community.</p>
          </div>
          <div className="about-text-right">
            <div className="about-text-apart">
              <div className="about-text-apart-copy">
                <span className="about-text-accent" aria-hidden="true" />
                <h3>What sets us apart</h3>
                <p>We combine local knowledge, industry expertise, and a people-first approach to deliver restoration services that go beyond the expected.</p>
              </div>
              <div className="about-text-note" aria-hidden="true">Local<br />roots. Stronger<br />together.<svg viewBox="0 0 120 65" fill="none"><path d="M110 8C84 34 59 45 17 33M17 33l12 22M17 33l27-3" /></svg></div>
            </div>
            <div className="about-text-cards">
              <article><span className="about-text-icon"><MapPin aria-hidden /></span><h3>Local team</h3><p>We live and work in the communities we serve, with care for our neighbors and their properties.</p></article>
              <article><span className="about-text-icon"><MessageCircle aria-hidden /></span><h3>Clear communication</h3><p>You’ll always know what’s happening. We keep you informed at every step, in plain language.</p></article>
              <article><span className="about-text-icon"><ShieldCheck aria-hidden /></span><h3>Property-first care</h3><p>We plan access around the damage, with care for your belongings and rooms that remain unaffected.</p></article>
            </div>
          </div>
        </div>
      </section>

      <section className="about-standards" aria-labelledby="about-standards-heading">
        <div className="about-standards-layout">
          <div className="about-standards-copy">
            <p className="about-reference-eyebrow">Credentials &amp; standards</p>
            <h2 id="about-standards-heading">Professional.<br />Certified. <em>Prepared.</em></h2>
            <p>We follow industry-leading standards and maintain the certifications, documentation, and equipment needed to restore your property the right way.</p>
            <a className="about-reference-button story-button" href="#process">Our Standards <ArrowRight aria-hidden /></a>
          </div>
          <div className="about-standards-cards">
            <article className="about-standard-card">
              <h3><span className="about-standard-icon"><ShieldCheck aria-hidden /></span>Licensed &amp; Insured</h3>
              <p>Fully licensed, insured and compliant with California requirements.</p>
              <div className="about-standard-license" aria-label="Contractors State License Board licensed">
                <BadgeCheck aria-hidden />
                <div><strong>CONTRACTORS</strong><small>STATE LICENSE BOARD</small><b>LICENSED</b></div>
              </div>
            </article>
            <article className="about-standard-card">
              <h3><span className="about-standard-icon globe"><Globe2 aria-hidden /></span>IICRC Certified</h3>
              <p>Trained to IICRC standards for water damage, fire and smoke restoration.</p>
              <div className="about-standard-certification"><Image src="/logos/iicrc.png" alt="IICRC Institute of Inspection Cleaning and Restoration Certification" width={271} height={100} /><b>CERTIFIED</b></div>
            </article>
            <article className="about-standard-card">
              <h3><span className="about-standard-icon"><FileText aria-hidden /></span>Documented Process</h3>
              <p>Moisture readings, photos and detailed reports for insurance claims.</p>
              <div className="about-standard-photo"><Image src="/about/standards-moisture.png" alt="Gloved hand checking a wall with a moisture meter beside a wood door frame" fill sizes="(max-width: 600px) 90vw, (max-width: 1100px) 40vw, 18vw" /></div>
            </article>
            <article className="about-standard-card">
              <h3><span className="about-standard-icon"><Phone aria-hidden /></span>24/7 Emergency</h3>
              <p>We're ready around the clock, 365 days a year.</p>
              <div className="about-standard-photo"><Image src="/about/standards-emergency.png" alt="RestoreIQ service van responding to a residential property at night" fill sizes="(max-width: 600px) 90vw, (max-width: 1100px) 40vw, 18vw" /></div>
            </article>
          </div>
        </div>
      </section>

      {/* The five stages — the same data the homepage brief uses. */}
      <section className="ri26-section voda-process voda-process-brief about-process" id="process" aria-labelledby="about-process-heading">
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
      <WhyChoose referenceCollage />

      <section className="voda-cta-band ri26-area-cta" aria-labelledby="about-cta-heading">
        <div className="voda-cta-band-panel">
          <span className="voda-cta-band-rail" aria-hidden>Emergency response</span>
          <span className="voda-cta-band-mark right ri26-area-cta-mark" aria-hidden>RestoreIQ</span>
          <div className="voda-wrap voda-cta-band-inner">
            <div className="voda-cta-band-copy">
              <span className="voda-eyebrow cyan">Ready when you need us</span>
              <h2 id="about-cta-heading">Let’s get your property<br /><em>back on track.</em></h2>
              <ul className="voda-cta-band-points">
                <li><Check aria-hidden />24/7 emergency line</li>
                <li><Check aria-hidden />Local restoration crews</li>
                <li><Check aria-hidden />Documented restoration</li>
              </ul>
            </div>
            <div className="voda-cta-band-actions">
              <Link className="voda-btn primary" href="/#request-service">{site.cta.request} <ArrowRight aria-hidden /></Link>
              <a className="voda-cta-band-call" href={`tel:${tel}`}>
                <span className="voda-cta-band-icon" aria-hidden><Phone aria-hidden /></span>
                <span><small>24/7 emergency line</small><b>{site.phone}</b></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Faq
        eyebrow="About RestoreIQ"
        heading={<>Get to know <em>RestoreIQ.</em></>}
        items={[
          { q: "Who is RestoreIQ?", a: "RestoreIQ is a local emergency restoration company. We help homeowners and businesses recover from property damage with careful planning, clear communication, and documented work." },
          { q: "Is RestoreIQ a local company?", a: "Yes. RestoreIQ is a Ventura County operation with a local team. We serve Camarillo, Ventura, Oxnard, Thousand Oaks, Simi Valley, Moorpark, and Westlake Village." },
          { q: "What guides the way RestoreIQ works?", a: "We treat every property with care and explain the reasons behind our recommendations. Our approach brings together local knowledge, measured conditions, and records of the work so customers can understand the decisions being made." },
          { q: "Does RestoreIQ work with both homeowners and businesses?", a: "Yes. Our company works with homeowners and businesses, considering each property's access, belongings, and day-to-day needs when planning the work." },
          { q: "When can I reach RestoreIQ?", a: "Our emergency phone line is available 24/7. Office hours are Monday through Friday, 8am to 5pm. Call (805) 832-0194 to speak with the team." },
          { q: "How do I contact RestoreIQ for a general enquiry?", a: "Use the Contact page or email help@restoreiq.com for general enquiries. If you need work at a property, use the separate Request Service form or call our emergency line." },
        ]}
      />
    </article>
  );
}
