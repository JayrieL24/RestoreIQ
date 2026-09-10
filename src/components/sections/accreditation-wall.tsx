import Image from "next/image";
import { Clock3, MapPin, Phone, Timer } from "lucide-react";

import { accreditations, type Accreditation } from "@/lib/accreditations";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

/**
 * Display heights per shape category, so a tall seal and a long horizontal
 * wordmark carry comparable optical weight. Widths stay auto — nothing is
 * stretched, cropped or distorted.
 */
const sizeClass: Record<Accreditation["size"], string> = {
  compact: "h-11 md:h-12",
  standard: "h-11 md:h-12",
  wide: "h-11 md:h-12",
  tall: "h-16 md:h-20",
};

function LogoMark({ name, src, size, label }: Accreditation) {
  const alt = label ?? `${name} logo`;
  return (
    <li className="flex items-center justify-center">
      <span
        tabIndex={0}
        role="img"
        aria-label={alt}
        title={name}
        className="logo-mark inline-flex items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#0b86d4]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
      >
        <Image
          src={src}
          alt=""
          width={260}
          height={80}
          className={`${sizeClass[size]} w-auto object-contain`}
        />
      </span>
    </li>
  );
}

export function AccreditationWall() {
  return (
    <section className="accreditation-wall" aria-labelledby="standards-heading">
      <div aria-hidden className="section-depth" />
      <div className="page-container">
        <Reveal className="wall-header">
          <p className="wall-eyebrow">
            <span aria-hidden className="wall-rule" />
            Certified &amp; accredited
            <span aria-hidden className="wall-rule" />
          </p>
          <h2 id="standards-heading">Standards we hold ourselves to.</h2>
          <p className="wall-lede">
            Independent certification keeps our methods measurable, our
            documentation defensible, and your restoration on solid ground.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="wall-grid">
            {accreditations.map((item) => (
              <LogoMark key={item.name} {...item} />
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.14} className="coverage">
          <div className="coverage-strip">
            <div className="coverage-fact">
              <span aria-hidden className="coverage-icon">
                <MapPin />
              </span>
              <div>
                <b>Within 45 miles</b>
                <small>Crews stationed locally</small>
              </div>
            </div>

            <div className="coverage-fact">
              <span aria-hidden className="coverage-icon">
                <Clock3 />
              </span>
              <div>
                <b>Answered 24/7</b>
                <small>A person, not a machine</small>
              </div>
            </div>

            <div className="coverage-fact">
              <span aria-hidden className="coverage-icon">
                <Timer />
              </span>
              <div>
                <b>On site within the hour</b>
                <small>For most callouts</small>
              </div>
            </div>
          </div>

          <p className="coverage-areas-line">
            <span>Serving</span> {site.coverage.areas.join(", ")} and the
            surrounding area.{" "}
            <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>
              <Phone />
              Call {site.phone}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
