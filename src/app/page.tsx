import Image from "next/image";
import { ArrowRight, BadgeCheck, Check, ClipboardCheck, Clock3, FileText, HousePlus, MapPin, Phone, ScanSearch, ShieldCheck, Siren, WavesArrowDown, Wind } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { BeforeAfterShowcase } from "@/components/before-after-showcase";
import { InsuranceBanner } from "@/components/insurance-banner";
import { RequestServiceForm } from "@/components/request-service-form";
import { ResponseFeatureList } from "@/components/response-feature-list";
import { ServiceRail } from "@/components/service-rail";
import { Faq } from "@/components/sections/faq";
import { WhyChoose } from "@/components/sections/why-choose";
import { ServiceAreaMap } from "@/components/sections/service-area-map";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const process = [
  { title: "Call RestoreIQ", copy: "Share what happened and get immediate safety and arrival guidance.", icon: Phone },
  { title: "Stop and assess", copy: "The source is stopped by the appropriate trade and affected materials are mapped.", icon: ScanSearch },
  { title: "Extract and document", copy: "Standing water is removed while conditions and contents are recorded.", icon: WavesArrowDown },
  { title: "Dry and monitor", copy: "Equipment is adjusted as moisture readings show the structure responding.", icon: Wind },
  { title: "Repair and restore", copy: "After mitigation, the documented and approved repair scope can move forward.", icon: HousePlus },
] as const;

export default function HomePage() {
  const phone = site.phone.replace(/[^\d+]/g, "");
  return <div className="voda-site">
    <section className="voda-hero">
      <Image src="/restoreiq-hero-tall-v5.jpg" alt="RestoreIQ technician setting professional drying equipment inside a home" fill priority className="voda-cover voda-hero-image" sizes="100vw" />
      <div className="voda-hero-wash" /><div aria-hidden className="voda-hero-orb" />
      <div className="voda-wrap voda-hero-inner"><Reveal className="voda-hero-copy">
        <span className="voda-hero-kicker"><i />Local emergency restoration</span>
        <h1>24/7 Water Damage Restoration <em>in Ventura County</em></h1>
        <p>Rapid water extraction, structural drying and moisture detection from a local restoration team. Call now for immediate arrival guidance.</p>
        <div className="voda-actions"><a className="voda-btn primary" href={`tel:${phone}`}>{site.cta.call} <Phone /></a><a className="voda-btn glass" href="#request-service">{site.cta.request} <ArrowRight /></a></div>
        <ul className="voda-hero-points"><li><Check aria-hidden /> Most calls answered live</li><li><Check aria-hidden /> Call for current arrival guidance</li></ul>
      </Reveal></div>
      <svg className="voda-hero-wave" viewBox="0 0 1440 190" preserveAspectRatio="none" aria-hidden="true"><path className="voda-hero-wave-fill" d="M0 112C175 58 315 92 448 138C588 186 793 179 947 128C1107 75 1275 70 1440 116V190H0Z" /></svg>
    </section>

    <section className="voda-trust-strip" aria-label="RestoreIQ service details"><div className="voda-wrap voda-trust-strip-row">
      <div className="voda-trust-strip-logo"><Image src="/logos/iicrc.png" alt="IICRC certification" width={150} height={71} /></div>
      <div><ShieldCheck aria-hidden /><span><b>We accept all insurance carriers</b><small>Insurance assistance available</small></span></div>
      <div><Clock3 aria-hidden /><span><b>24/7 availability</b><small>Emergency line open day and night</small></span></div>
      <div><MapPin aria-hidden /><span><b>Ventura County</b><small>Local restoration service</small></span></div>
    </div></section>

    <section className="voda-process voda-process-brief" id="process"><div className="voda-wrap">
      <Reveal className="voda-heading"><span className="voda-eyebrow">What happens after you call</span><h2>A clear path from emergency<br /><em>to restored.</em></h2><p>Five straightforward stages so you always know what comes next.</p></Reveal>
      <RevealGroup className="voda-step-grid voda-step-grid-five">{process.map(({ title, copy, icon: Icon }, index) => <RevealItem key={title}><article><span>0{index + 1}</span><div><Icon aria-hidden /></div><h3>{title}</h3><p>{copy}</p></article></RevealItem>)}</RevealGroup>
    </div></section>

    <section className="voda-response" id="moisture-response">
      <div className="voda-wave dark-wave" />
      <div aria-hidden className="voda-response-glow" />
      <div className="voda-wrap voda-response-grid">
        <Reveal className="voda-response-visual">
          <span aria-hidden className="voda-ring" />
          <div className="voda-round-photo"><Image src="/Real-life-images/MSP_7706.jpg" alt="RestoreIQ technician extracting water from carpet" fill className="voda-cover" sizes="(max-width: 700px) 100vw, 45vw" /></div>
          <div className="voda-badge"><span className="voda-badge-icon"><Siren aria-hidden /></span><b>24/7</b><small>Emergency response</small></div>
          <div className="voda-readout"><span className="voda-readout-dot" aria-hidden /><div><b>Mapped</b><small>Room-by-room moisture readings</small></div><span className="voda-readout-tag">LOGGED</span></div>
        </Reveal>
        <Reveal delay={.08} className="voda-response-copy">
          <span className="voda-eyebrow cyan">Fast help. Careful decisions.</span>
          <h2>We find the water<br /><em>you cannot see.</em></h2>
          <p>RestoreIQ maps moisture through floors, walls, and finishes, then builds a drying plan around what the readings show.</p>
          <ResponseFeatureList />
          <div className="voda-response-actions"><a className="voda-btn voda-response-emergency" href={`tel:${phone}`}><Phone aria-hidden />{site.cta.call}</a><a className="voda-response-link" href="#request-service">{site.cta.request} <ArrowRight /></a></div>
        </Reveal>
      </div>
      <div className="voda-equipment" aria-hidden><Image src="/restoration-equipment-float.png" alt="" fill className="voda-cover" sizes="(max-width: 700px) 420px, (max-width: 950px) 483px, 525px" /></div>
    </section>

    <section className="voda-services" id="services"><div className="voda-wrap">
      <Reveal className="voda-heading"><span className="voda-eyebrow">Emergency restoration services</span><h2>Focused help for damage<br /><em>that cannot wait.</em></h2><p>Water, fire, contaminated-water, contents, and reconstruction services—without unrelated home-service offerings.</p></Reveal>
      <ServiceRail items={services.map(({ id, shortTitle, subtitle, icon: Icon }) => ({ title:shortTitle, copy:subtitle, icon:<Icon aria-hidden />, href:`/services/${id}` }))} />
    </div></section>

    <WhyChoose />

    <section className="voda-brief-insurance" id="insurance"><div className="voda-wrap">
      <Reveal className="voda-heading light-heading"><span className="voda-eyebrow cyan">Insurance assistance</span><h2>You choose your restoration company.</h2><p>RestoreIQ accepts all insurance carriers and can communicate directly with the adjuster when you authorize it.</p></Reveal>
      <RevealGroup className="voda-insurance-grid">
        <RevealItem><div><BadgeCheck aria-hidden /><h3>Your choice</h3><p>The homeowner selects the restoration provider; the carrier can be kept informed throughout the loss.</p></div></RevealItem>
        <RevealItem><div><ClipboardCheck aria-hidden /><h3>Documented progress</h3><p>Moisture readings, photographs, equipment, and job progress can be organized for claim review.</p></div></RevealItem>
        <RevealItem><div><FileText aria-hidden /><h3>Your policy controls coverage</h3><p>Coverage, deductibles, pricing review, and payment remain subject to the policy and carrier decisions.</p></div></RevealItem>
      </RevealGroup>
      <p className="voda-insurance-footnote">Coverage and payment remain subject to the customer&apos;s policy and the carrier&apos;s decisions.</p>
      <p className="ri26-carrier-label">We accept all insurance carriers</p>
      <InsuranceBanner />
    </div></section>

    <section className="voda-work" id="work"><div className="voda-transform-wrap"><Reveal className="voda-heading voda-work-heading"><span className="voda-eyebrow">Before and after projects</span><h2>See the results<br /><em>for yourself.</em></h2><p>Drag each handle to compare the affected area with the completed restoration.</p></Reveal><BeforeAfterShowcase /></div></section>

    <ServiceAreaMap />

    <Faq />

    <section className="voda-request-section" id="request-service"><Image src="/Real-life-images/MSP_7706.jpg" alt="RestoreIQ technician restoring a water-damaged home" fill className="voda-cover" sizes="100vw" /><div className="voda-final-wash" /><div className="voda-wrap voda-request-layout">
      <Reveal className="voda-request-copy"><span className="voda-eyebrow light">Emergency help, day or night</span><h2>Can’t call? Send the essentials.</h2><p>The phone remains the fastest option when water is actively spreading. Otherwise, use the short request form and the team will follow up using your preferred method.</p><a className="voda-request-call" href={`tel:${phone}`}><span><Siren aria-hidden /></span><div><small>{site.cta.call}</small><b>{site.phone}</b></div></a></Reveal>
      <Reveal delay={.08}><RequestServiceForm /></Reveal>
    </div></section>
  </div>;
}
