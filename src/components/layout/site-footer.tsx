import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

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
            <p>24/7 water damage restoration across Camarillo and the surrounding coast.</p>
          </div>

          <nav className="voda-footer-col" aria-labelledby="footer-services">
            <h2 id="footer-services">Services</h2>
            <ul>
              {services.slice(0, 4).map((s) => (
                <li key={s.title}>
                  <Link href="/#services">{s.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="voda-footer-col" aria-labelledby="footer-coverage">
            <h2 id="footer-coverage">Service area</h2>
            <ul>
              {serviceAreas.slice(0, 4).map((area) => (
                <li key={area.name}>
                  <Link href="/#coverage">{area.name}</Link>
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
          </div>
        </div>

        <div className="voda-footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Licensed &amp; insured &middot; 24/7 emergency response</p>
        </div>
      </div>
    </footer>
  );
}
