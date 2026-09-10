import Image from "next/image";
import { ArrowRight, ArrowUpRight, BadgeCheck, Clock3, MapPin, Phone, Siren } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { ResponseFeatureList } from "@/components/response-feature-list";
import { TrustFeatureGrid } from "@/components/trust-feature-grid";
import { Faq } from "@/components/sections/faq";
import { ReviewsMarquee } from "@/components/ui/reviews-marquee";
import { site } from "@/lib/site";
import { RestorationServiceIcon } from "@/components/restoration-service-icon";
import { BeforeAfterShowcase } from "@/components/before-after-showcase";
import { WhyChoose } from "@/components/sections/why-choose";

const real = "/Real-life-images/";
const serviceTiles: Array<[string, string, string]> = [
  ["extraction", "Water Extraction", "Standing water is removed quickly using professional extraction equipment."],
  ["drying", "Structural Drying", "Air movement and dehumidification, guided by daily moisture readings."],
  ["assessment", "Moisture Mapping", "We locate water behind walls, flooring, and finishes before work begins."],
  ["mould", "Mold Remediation", "Affected areas are contained, treated, and cleared using careful protocols."],
  ["sewage", "Contaminated Water", "Safe cleanup and removal when the water carries a health risk."],
  ["leak", "Leak Detection", "We find and repair the source before the damage has a chance to spread."],
  ["repair", "Home Reconstruction", "Drywall, flooring, trim, and paint are restored by one accountable team."],
  ["treatment", "Water Treatment", "Whole-home filtration, configured around your household and water supply."],
];

export default function HomePage() {
  const phone = site.phone.replace(/[^\d+]/g, "");
  return <div className="voda-site">
    <section className="voda-hero">
      <Image src="/restoreiq-hero-interior-v3.png" alt="Water restoration technician positioning professional drying equipment inside a home" fill priority className="voda-cover voda-hero-image" sizes="100vw" />
      <div className="voda-hero-wash" />
      <div className="voda-wrap voda-hero-inner"><Reveal className="voda-hero-copy"><span className="voda-eyebrow light">Restoration. Plumbing. Peace of mind.</span><h1>Professional water<br/><em>restoration</em> when<br/>you need it most.</h1><p>From emergency extraction to precise structural drying, RestoreIQ protects your home and makes every next step clear.</p><div className="voda-actions"><a className="voda-btn primary" href={`tel:${phone}`}>Get help now <Phone/></a><a className="voda-btn glass" href="#services">Explore services <ArrowRight/></a></div></Reveal></div>
      <svg className="voda-hero-wave" viewBox="0 0 1440 190" preserveAspectRatio="none" aria-hidden="true"><path className="voda-hero-wave-fill" d="M0 112C175 58 315 92 448 138C588 186 793 179 947 128C1107 75 1275 70 1440 116V190H0Z"/></svg>
    </section>

    <section className="voda-services" id="services"><div className="voda-wrap"><Reveal className="voda-heading"><span className="voda-eyebrow">Complete home water care</span><h2>Everything your home needs<br/><em>to get back to dry.</em></h2><p>From the first emergency call through repairs and prevention, every stage stays with one accountable crew.</p></Reveal><RevealGroup className="voda-service-grid">{serviceTiles.map(([type,title,copy],i)=><RevealItem key={type}><a className={`voda-service-card${i===1?" active":""}`} href="#contact"><span className="voda-service-icon"><RestorationServiceIcon type={type}/></span><small>0{i+1}</small><h3>{title}</h3><p>{copy}</p></a></RevealItem>)}</RevealGroup></div></section>

    <section className="voda-response" id="why-us">
      <div className="voda-wave dark-wave"/>
      <div aria-hidden className="voda-response-glow"/>

      <div className="voda-wrap voda-response-grid">
        <Reveal className="voda-response-visual">
          {/* Green ring, as in the reference: an arc that only wraps part
              of the photo rather than a full border. */}
          <span aria-hidden className="voda-ring"/>

          <div className="voda-round-photo">
            <Image src={`${real}MSP_7706.jpg`} alt="RestoreIQ technician extracting water from carpet" fill className="voda-cover" sizes="45vw"/>
          </div>

          {/* Teardrop badge, replacing the cropped mini-photo. */}
          <div className="voda-badge">
            <span className="voda-badge-icon"><Siren aria-hidden/></span>
            <b>24/7</b>
            <small>Emergency response</small>
          </div>

          {/* Instrument readout anchored under the photo. */}
          <div className="voda-readout">
            <span className="voda-readout-dot" aria-hidden/>
            <div>
              <b>56.9%</b>
              <small>Subfloor, living room</small>
            </div>
            <span className="voda-readout-tag">WET</span>
          </div>
        </Reveal>

        <Reveal delay={.08} className="voda-response-copy">
          <span className="voda-eyebrow cyan">Fast help. Careful decisions.</span>
          <h2>We find the water<br/><em>you cannot see.</em></h2>
          <p>We map moisture through floors, walls, and finishes, then build a drying plan around what the readings show &mdash; not around what is easiest to reach.</p>

          <ResponseFeatureList />

          <div className="voda-response-actions">
            <a className="voda-btn" href="tel:+15550100199"><Phone aria-hidden/>Get emergency help</a>
            <a className="voda-response-link" href="#process">See how restoration works <ArrowRight/></a>
          </div>
        </Reveal>
      </div>

      <div className="voda-equipment" aria-hidden>
        <Image src="/restoration-equipment-float.png" alt="" fill className="voda-cover" sizes="(max-width: 700px) 420px, (max-width: 950px) 483px, 525px"/>
      </div>
    </section>

    <section className="voda-work" id="work"><div className="voda-wave light-wave"/><div className="voda-transform-wrap"><Reveal className="voda-heading voda-work-heading"><span className="voda-eyebrow">Real results. Real restoration.</span><h2>See the results<br/><em>for yourself.</em></h2><p>From damage assessment through the final repair, drag each handle to see the completed work.</p></Reveal><BeforeAfterShowcase/></div></section>

    <section className="voda-proof">
      <div className="voda-photo-banner"><Image src="/restoration-proof-wide-v4.png" alt="Full-length restoration technician extracting water from navy carpet" fill className="voda-cover" sizes="100vw"/></div>
      <div className="voda-proof-panel">
        <div className="voda-wrap">
          <Reveal className="voda-heading light-heading"><span className="voda-eyebrow cyan">Why homeowners trust RestoreIQ</span><h2>Trusted expertise for every restoration need.</h2></Reveal>
          <TrustFeatureGrid />
        </div>
        <svg className="voda-proof-curve" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 18C260 2 475 0 720 34C965 68 1180 42 1440 14V100H0Z"/></svg>
      </div>
    </section>

    <WhyChoose/>

    <section className="voda-reviews"><div className="voda-wrap"><Reveal className="voda-heading light-heading"><span className="voda-eyebrow cyan">Customer reviews</span><h2>What they say<br/><em>about RestoreIQ</em></h2><p>Every job ends the same way: a dry home, and a customer who knows exactly what was done and why.</p></Reveal></div><ReviewsMarquee/></section>

    <section className="voda-local" id="coverage" aria-labelledby="coverage-heading"><div aria-hidden className="voda-local-map"><Image src="/patterns/usa-silhouette.svg" alt="" fill sizes="(max-width: 950px) 100vw, 60vw"/></div><div className="voda-wrap voda-local-grid"><Reveal className="voda-local-copy"><span className="voda-eyebrow">Where we work</span><h2 id="coverage-heading">We cover the<br/><em>whole region.</em></h2><p>{site.coverage.radius}. Call us and we will give you a clear arrival time before dispatch &mdash; not an optimistic one.</p><div className="voda-local-meta"><div><b>{site.coverage.hours}</b><small>Dispatch</small></div><div><b>{site.coverage.response}</b><small>Typical arrival</small></div></div><a className="voda-btn primary" href={`tel:${phone}`}>Call {site.phone} <Phone/></a></Reveal><Reveal className="voda-zone-panel"><h3 className="voda-zone-title">Coverage &amp; response times</h3><ul className="voda-zone-list">{site.coverage.zones.map((z,i)=><li key={z.name}><span className="voda-zone-index">0{i+1}</span><span className="voda-zone-pin"><MapPin aria-hidden/></span><b>{z.name}</b><em>{z.response}</em><small>{z.detail}</small></li>)}</ul></Reveal></div></section>
    <Faq/>
    <section className="voda-final" id="contact"><Image src={`${real}MSP_7706.jpg`} alt="RestoreIQ technician restoring a home" fill className="voda-cover" sizes="100vw"/><div className="voda-final-wash"/><div className="voda-final-copy"><Reveal className="voda-final-text"><span className="voda-eyebrow light">Emergency help, day or night</span><h2>A drier, safer home<br/><em>starts here.</em></h2><p>Tell us what happened. We will explain what comes next and send the right help.</p><div className="voda-actions"><a className="voda-btn primary" href={`tel:${phone}`}>Call {site.phone} <Phone/></a><a className="voda-btn glass" href={`mailto:${site.email}`}>Request service <ArrowUpRight/></a></div></Reveal><Reveal delay={.08} className="voda-final-card"><span className="voda-final-card-badge"><Siren aria-hidden/></span><b>Speak to a specialist now</b><p>Lines are staffed around the clock. {site.coverage.hours}.</p><ul><li><Clock3 aria-hidden/><span>{site.coverage.response}</span></li><li><MapPin aria-hidden/><span>{site.coverage.radius}</span></li><li><BadgeCheck aria-hidden/><span>Licensed &amp; insured crews</span></li></ul><a className="voda-final-card-link" href={`tel:${phone}`}>{site.phone} <Phone aria-hidden/></a></Reveal></div></section>
  </div>;
}
