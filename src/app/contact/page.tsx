import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Mail, MapPin, Phone, Siren } from "lucide-react";
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
    <article className="voda-site ri26-detail">
      {/* Hero: same treatment as the service and area pages, without a photo
          since there is nothing to show — the navy ground carries it. */}
      <header className="ri26-detail-hero ri26-contact-hero">
        <div className="ri26-hero-photo">
          <Image src="/Real-life-images/MSP_7581-Edit.jpg" alt="" fill priority sizes="100vw" className="voda-cover" />
        </div>
        <div aria-hidden className="ri26-hero-grid" />
        <div className="ri26-hero-shade" />
        <div className="voda-wrap">
          <div className="ri26-hero-copy-col">
            <p className="ri26-kicker"><Phone aria-hidden /> Ventura County &middot; 24/7</p>
            <h1>Talk to <em>RestoreIQ.</em></h1>
            <p className="ri26-detail-copy">
              Call the emergency line for an active loss. For insurance, billing,
              scheduling or questions about work already underway, send a message
              and we will get back to you.
            </p>
            <div className="voda-actions">
              <a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a>
              <a className="voda-btn glass" href="/#request-service">{site.cta.request} <ArrowRight aria-hidden /></a>
            </div>
          </div>
        </div>
        <svg className="ri26-hero-wave" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0 150V60C240 6 560 -12 860 22C1080 47 1280 76 1440 42V150Z" /></svg>
      </header>

      <section className="ri26-section ri26-contact" aria-labelledby="contact-heading">
        <div className="voda-wrap ri26-contact-grid">
          <div className="ri26-contact-details">
            <span className="voda-eyebrow">How to reach us</span>
            <h2 id="contact-heading">Four ways to <em>get hold of us.</em></h2>

            {/* The emergency line leads: it is the only route that is answered
                around the clock, and the one that matters during a loss. */}
            <a className="ri26-contact-primary" href={`tel:${tel}`}>
              <span aria-hidden><Siren /></span>
              <div>
                <small>{site.coverage.hours}</small>
                <b>{site.phone}</b>
                <span>{site.coverage.response}</span>
              </div>
            </a>

            <ul className="ri26-contact-list">
              <li>
                <span className="ri26-contact-mark" aria-hidden><Mail /></span>
                <div>
                  <b>Email</b>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                  <small>Replies during office hours</small>
                </div>
              </li>
              <li>
                <span className="ri26-contact-mark" aria-hidden><Clock3 /></span>
                <div>
                  <b>Office hours</b>
                  <p>{site.coverage.officeHours}</p>
                  <small>The emergency line runs {site.coverage.hours.toLowerCase()}</small>
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
              <b>Send a message</b>
              <small>For enquiries that are not an active emergency.</small>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </article>
  );
}
