import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { site } from "@/lib/site";
import { services } from "@/lib/services";

/**
 * Brand marks as inline paths: lucide-react 1.x removed its logo icons,
 * so these cannot be imported. Each is a filled 24x24 glyph.
 */
const social = [
  {
    label: "Facebook",
    href: site.social.facebook,
    path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94Z",
  },
  {
    label: "LinkedIn",
    href: site.social.linkedin,
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z",
  },
  {
    label: "X",
    href: site.social.x,
    path: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.66l7.73-8.84L1.24 2.25H8.1l4.71 6.23 5.43-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z",
  },
  {
    label: "YouTube",
    href: site.social.youtube,
    path: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z",
  },
  {
    label: "Instagram",
    href: site.social.instagram,
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
  },
];

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
                src="/RestoreIQ-Logo-footer.png"
                alt={`${site.name} water damage restoration`}
                fill
                sizes="132px"
                className="object-contain [clip-path:circle(47%_at_50%_50%)]"
              />
            </span>
            <p>{site.description}</p>

            <ul className="voda-footer-social">
              {social.map(({ label, href, path }) => (
                <li key={label}>
                  <a href={href} aria-label={label}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d={path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="voda-footer-col" aria-labelledby="footer-company">
            <h2 id="footer-company">Company</h2>
            <ul>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="voda-footer-col" aria-labelledby="footer-services">
            <h2 id="footer-services">Services</h2>
            <ul>
              {services.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <Link href="/#services">{s.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="voda-footer-col" aria-labelledby="footer-coverage">
            <h2 id="footer-coverage">Coverage</h2>
            <ul>
              {site.coverage.zones.map((z) => (
                <li key={z.name}>
                  <Link href="/#coverage">{z.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="voda-footer-contact">
            <h2>Contact us</h2>

            <a className="voda-footer-line" href={`tel:${tel}`}>
              <span className="voda-footer-icon">
                <Phone aria-hidden />
              </span>
              <span>
                <small>Phone</small>
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

            <Link className="voda-footer-cta" href="/#coverage">
              <MapPin aria-hidden /> Find your area
            </Link>
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
