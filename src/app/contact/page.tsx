import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, ChevronRight, Clock3, Mail, MapPin, Phone, ShieldCheck, Users, Zap } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { serviceAreas } from "@/lib/service-areas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact RestoreIQ",
  description: `Contact RestoreIQ for water, fire and smoke damage restoration across Ventura County. ${site.coverage.hours} on ${site.phone}.`,
};

export default function ContactPage() {
  const tel = site.phone.replace(/[^\d+]/g, "");

  return (
    <article className="voda-site ri26-detail ri26-contact-reference">
      <header className="ri26-detail-hero ri26-contact-hero">
        <div className="ri26-hero-photo">
          <Image src="/contact/restoreiq-technician-hero-v1.png" alt="RestoreIQ technician positioning a blue air mover inside a home" fill priority sizes="100vw" className="voda-cover" />
        </div>
        <div aria-hidden className="ri26-hero-grid" />
        <div className="ri26-hero-shade" />
        <div className="voda-wrap">
          <div className="ri26-hero-copy-col">
            <p className="ri26-kicker">Ventura County &middot; 24/7</p>
            <h1>Talk to <em>RestoreIQ.</em></h1>
            <p className="ri26-detail-copy">
              Call the emergency line for an active loss. For insurance, billing,
              scheduling or general enquiries, send a message and we’ll get
              back to you as soon as possible.
            </p>
            <div className="voda-actions">
              <a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a>
              <a className="voda-btn glass" href="#contact-form">Send a message <ArrowRight aria-hidden /></a>
            </div>
            <ul className="ri26-contact-hero-benefits">
              <li><Zap aria-hidden /><span>Fast response<br />times</span></li>
              <li><ShieldCheck aria-hidden /><span>Experienced<br />local team</span></li>
              <li><Users aria-hidden /><span>Here for our<br />community</span></li>
            </ul>
          </div>
        </div>
        <svg className="ri26-hero-wave" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0 150V60C240 6 560 -12 860 22C1080 47 1280 76 1440 42V150Z" /></svg>
      </header>

      <section className="ri26-section ri26-contact" aria-labelledby="contact-heading">
        <div className="voda-wrap ri26-contact-intro">
          <span className="voda-eyebrow">Get in touch</span>
          <h2 id="contact-heading">We’re here <em>to help.</em></h2>
          <p>Whether you’re dealing with an active water, fire or smoke loss, or just have a question, our team is ready to help. Choose the best way to reach us or send a message using the form.</p>
        </div>
        <div className="voda-wrap ri26-contact-grid">
          <div className="ri26-contact-details">

            {/* The emergency line leads: it is the only route that is answered
                around the clock, and the one that matters during a loss. */}
            <ul className="ri26-contact-list">
              <li className="ri26-contact-emergency-card">
            <a className="ri26-contact-primary" href={`tel:${tel}`}>
              <span aria-hidden><Phone /></span>
              <div>
                <small>{site.coverage.hours}</small>
                <b>{site.phone}</b>
                <span>Call for active water, fire or smoke damage.<br />{site.coverage.response}.</span>
              </div>
              <ChevronRight className="ri26-contact-card-arrow" aria-hidden />
            </a>
              </li>
              <li>
                <span className="ri26-contact-mark" aria-hidden><Mail /></span>
                <div>
                  <b>Email</b>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                  <small>General enquiries, insurance, billing and scheduling. We’ll get back to you during office hours.</small>
                </div>
                <ChevronRight className="ri26-contact-card-arrow" aria-hidden />
              </li>
              <li>
                <span className="ri26-contact-mark" aria-hidden><Clock3 /></span>
                <div>
                  <b>Office hours</b>
                  <p>{site.coverage.officeHours}</p>
                  <small>Our office team is available during regular business hours. The emergency line runs 24/7.</small>
                </div>
              </li>
              <li>
                <span className="ri26-contact-mark" aria-hidden><MapPin /></span>
                <div>
                  <b>Service area</b>
                  <p>{site.coverage.radius}</p>
                  <ul className="ri26-contact-areas">
                    {serviceAreas.map((area) => (
                      <li key={area.slug}><Link href={`/service-areas/${area.slug}`}>{area.name}</Link></li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            {/* Google embed centred on the address in site config. The basic
                embed needs no API key; lazy so it never blocks the page. */}
            <figure className="ri26-contact-map">
              <iframe
                title={`Map showing the ${site.name} service area around ${site.coverage.address}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.coverage.address)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <figcaption>
                <MapPin aria-hidden />
                <span>{site.coverage.address}</span>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.coverage.address)}`} target="_blank" rel="noreferrer">
                  Open in Maps <ArrowRight aria-hidden />
                </a>
              </figcaption>
            </figure>
          </div>

          <div className="ri26-contact-form" id="contact-form">
            <div className="ri26-contact-form-head">
              <span className="voda-eyebrow">Send a message</span>
              <h2>Get in <em>touch</em></h2>
              <p>Fill out the form below and our team will get back to you as soon as possible.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="ri26-contact-trust" aria-label="Why contact RestoreIQ">
        <div className="voda-wrap">
          <div><span aria-hidden><ShieldCheck /></span><div><h3>Trusted local team</h3><p>Proudly serving Ventura County and surrounding areas.</p></div></div>
          <div><span aria-hidden><Users /></span><div><h3>Fast, friendly support</h3><p>Real people, ready to help when you need it.</p></div></div>
          <div><span aria-hidden><Building2 /></span><div><h3>Insurance experience</h3><p>Help with documentation and insurance claim questions.</p></div></div>
        </div>
      </section>
    </article>
  );
}
