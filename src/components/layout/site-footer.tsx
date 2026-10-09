import Image from "next/image";
import Link from "next/link";
import { Mail, MessageSquare, Phone } from "lucide-react";

import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { serviceAreas } from "@/lib/service-areas";

export function SiteFooter() {
  const tel = site.phone.replace(/[^\d+]/g, "");

  return (
    <footer className="voda-footer">
      {/* Wave edge, cutting up into the CTA banner above as in the
          reference. Drawn full-bleed so it always spans the viewport. */}
      <svg
        className="voda-footer-wave"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path className="voda-footer-wave-transition cta-haze" d="M0 -12C220 -52 420 -56 720 -30C1020 -4 1240 18 1440 -16V120H0Z" />
        <path className="voda-footer-wave-transition cta-soft" d="M0 -8C220 -48 420 -52 720 -26C1020 0 1240 22 1440 -12V120H0Z" />
        <path className="voda-footer-wave-transition cta-blue" d="M0 -4C220 -44 420 -48 720 -22C1020 4 1240 26 1440 -8V120H0Z" />
        <path className="voda-footer-wave-transition mist" d="M0 0C220 -40 420 -44 720 -18C1020 8 1240 30 1440 -4V120H0Z" />
        <path className="voda-footer-wave-transition teal" d="M0 4C220 -36 420 -40 720 -14C1020 12 1240 34 1440 0V120H0Z" />
        <path className="voda-footer-wave-transition slate" d="M0 8C220 -32 420 -36 720 -10C1020 16 1240 38 1440 4V120H0Z" />
        <path className="voda-footer-wave-transition outer" d="M0 12C220 -28 420 -32 720 -6C1020 20 1240 42 1440 8V120H0Z" />
        <path className="voda-footer-wave-transition inner" d="M0 20C220 -20 420 -24 720 2C1020 28 1240 50 1440 16V120H0Z" />
        <path className="voda-footer-wave-transition deep" d="M0 28C220 -12 420 -16 720 10C1020 36 1240 58 1440 24V120H0Z" />
        <path className="voda-footer-wave-transition navy" d="M0 36C220 -4 420 -8 720 18C1020 44 1240 66 1440 32V120H0Z" />
        <path d="M0 44C220 4 420 0 720 26C1020 52 1240 74 1440 40V120H0Z" />
      </svg>

      <div className="voda-footer-inner">
        <div className="voda-footer-grid">
          <div className="voda-footer-brand">
            <span className="voda-footer-mark">
              <Image
                src="/restoreiq-wordmark-white.png"
                alt={`${site.name} water damage restoration`}
                width={220}
                height={60}
                sizes="220px"
                className="voda-footer-wordmark"
              />
            </span>
            <p>24/7 water, fire and smoke damage restoration across Ventura County.</p>
            <Image src="/logos/iicrc.png" alt="IICRC certification" width={120} height={56} className="ri26-footer-iicrc" />
          </div>

          <nav className="voda-footer-col" aria-labelledby="footer-services">
            <h2 id="footer-services">Services</h2>
            <ul>
              {services.slice(0, 5).map((s) => (
                <li key={s.title}>
                  <Link href={`/services/${s.id}`}>{s.shortTitle}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="voda-footer-col" aria-labelledby="footer-coverage">
            <h2 id="footer-coverage">Service area</h2>
            <ul>
              {serviceAreas.map((area) => (
                <li key={area.name}>
                  <Link href={`/service-areas/${area.slug}`}>{area.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="voda-footer-contact">
            <h2>Need help now?</h2>

            <a className="voda-footer-line" href={`tel:${tel}`}>
              <span className="voda-footer-icon">
                <Phone aria-hidden />
              </span>
              <span>
                <small>Call us 24/7</small>
                <b>{site.phone}</b>
              </span>
            </a>

            <a className="voda-footer-line" href={`mailto:${site.email}`}>
              <span className="voda-footer-icon">
                <Mail aria-hidden />
              </span>
              <span>
                <small>Email</small>
                <b>{site.email}</b>
              </span>
            </a>

            <Link className="voda-footer-line" href="/contact">
              <span className="voda-footer-icon">
                <MessageSquare aria-hidden />
              </span>
              <span>
                <small>Enquiries</small>
                <b>Contact us</b>
              </span>
            </Link>
          </div>
        </div>

        <div className="voda-footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Local restoration crews &middot; Available 24/7</p>
        </div>
      </div>
    </footer>
  );
}
