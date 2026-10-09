import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Check, ClipboardCheck, FileText, FolderOpen, Gauge, Lock, MapPin, Phone, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { AreaHeroMap } from "@/components/area-hero-map";
import { Faq } from "@/components/sections/faq";
import { claimSteps, getAreaFaqs, getComplianceItems, getServiceArea, jobStages, serviceAreas } from "@/lib/service-areas";
import { ServiceRail } from "@/components/service-rail";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export function generateStaticParams() { return serviceAreas.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const area = getServiceArea((await params).slug);
  if (!area) return {};
  return { title: `Water Damage Restoration in ${area.name}`, description: `${area.intro} Call RestoreIQ for current arrival guidance.` };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const area = getServiceArea((await params).slug);
  if (!area) notFound();
  const tel = site.phone.replace(/[^\d+]/g, "");
  return <article className="voda-site ri26-detail ri26-service-area-page">
    <header className="ri26-detail-hero ri26-detail-hero-map"><div className="ri26-hero-photo"><Image src={area.heroImage} alt={`RestoreIQ crew arriving at a property in ${area.name}`} fill priority sizes="100vw" className="voda-cover" /></div><div aria-hidden className="ri26-hero-grid" /><div className="ri26-hero-shade" /><div className="voda-wrap ri26-hero-split"><div className="ri26-hero-copy-col"><p className="ri26-kicker"><MapPin aria-hidden /> {area.name}, California</p><h1>Water Damage<br />Restoration<br />in {area.name}</h1><p className="ri26-detail-copy">{area.intro}</p><div className="voda-actions"><a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a><Link className="voda-btn glass" href="/#request-service">{site.cta.request} <ArrowRight aria-hidden /></Link></div></div></div><svg className="ri26-hero-wave" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0 150V60C240 6 560 -12 860 22C1080 47 1280 76 1440 42V150Z" /></svg></header>


    <section className="ri26-section ri26-area-intro"><div className="voda-wrap ri26-area-intro-grid"><div className="ri26-area-intro-copy"><span className="voda-eyebrow">Local property considerations</span><h2>Restoration planning for {area.name} properties</h2><p>{area.localContext}</p><ul className="ri26-area-intro-notes">{area.propertyNotes.map((note) => <li key={note}><Check aria-hidden /> {note}</li>)}</ul><div className="ri26-area-intro-actions"><a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a><Link className="voda-btn ri26-btn-outline" href="/#request-service">{site.cta.request} <ArrowRight aria-hidden /></Link></div></div><div className="ri26-area-intro-visual"><div className="ri26-area-intro-photo main"><Image src={area.gallery[0] ?? area.image} alt={`Restoration work in ${area.name}`} fill className="voda-cover" sizes="(max-width: 950px) 92vw, 46vw" /></div><div className="ri26-area-intro-photo inset"><Image src={area.gallery[1] ?? area.image} alt="" fill className="voda-cover" sizes="(max-width: 950px) 44vw, 22vw" /></div><div className="ri26-area-intro-badge"><span><MapPin aria-hidden /></span><div><b>{area.name}</b><small>Local crews · 24/7</small></div></div></div></div></section>

    <section className="ri26-section ri26-area-facts-section"><span className="ri26-area-facts-rail" aria-hidden>Standards</span><span className="ri26-area-facts-mark-247" aria-hidden>24/7</span><div className="voda-wrap"><div className="ri26-area-facts-head"><span className="voda-eyebrow cyan">Standards and permits</span><h2>What a {area.name} restoration has to meet</h2><p>Restoration in {area.name} is governed by state licensing law, federal lead and asbestos rules, and local permitting. These are the requirements that apply to the work.</p></div><div className="ri26-area-facts">{getComplianceItems(area).map((fact, i) => <article key={fact.label}><header><span className="ri26-area-facts-no" aria-hidden>{String(i + 1).padStart(2, "0")}</span><span className="ri26-area-facts-mark" aria-hidden><FileText /></span></header><b>{fact.label}</b><p>{fact.value}</p><span className="ri26-area-facts-src"><FileText aria-hidden />{fact.source}</span></article>)}<article className="ri26-area-facts-photo-card"><Image src={area.resultImage} alt={`Restoration work in ${area.name}`} fill className="voda-cover" sizes="(max-width: 700px) 92vw, 30vw" /><div className="ri26-area-facts-tag"><span><Check aria-hidden /></span><div><b>Dried to target</b><small>{area.name} · documented</small></div></div></article></div></div></section>

    <section className="ri26-coverage" aria-labelledby="coverage-heading"><div className="ri26-coverage-layout voda-wrap"><div className="ri26-coverage-copy"><span className="voda-eyebrow">Where we reach</span><h2 id="coverage-heading">Crews dispatch to {area.name} and the surrounding area.</h2><p>RestoreIQ runs from a single Ventura County operation, so the same documented process covers every neighbourhood below. Call with the property address for current arrival guidance.</p><ul className="ri26-coverage-list">{area.nearby.map((place) => <li key={place}><MapPin aria-hidden /><span>{place}</span></li>)}</ul><p className="ri26-coverage-help">Don&apos;t see your neighbourhood? <a href={`tel:${tel}`}>Call {site.phone}</a></p></div><div className="ri26-coverage-map"><AreaHeroMap lat={area.lat} lng={area.lng} name={area.name} /></div></div></section>

    <section className="ri26-section ri26-claims"><div className="voda-wrap"><div className="ri26-claims-top"><div className="ri26-claims-head"><span className="voda-eyebrow">Insurance and documentation</span><h2>Records your {area.name} claim can stand on</h2><p>RestoreIQ documents the loss as the work happens, so your carrier receives evidence rather than estimates. Coverage and payment remain subject to your policy and the carrier&apos;s decisions.</p></div><aside className="ri26-claims-file"><header><span aria-hidden><FileText /></span><div><b>Loss file</b><small>{area.name} · opened on arrival</small></div></header><ul><li><Camera aria-hidden /><span>Photo set</span><em>On arrival</em></li><li><Gauge aria-hidden /><span>Moisture log</span><em>Daily</em></li><li><ClipboardCheck aria-hidden /><span>Scope notes</span><em>Per room</em></li><li><ShieldCheck aria-hidden /><span>Adjuster pack</span><em>On request</em></li></ul><footer><Check aria-hidden /> Shared with you and your carrier</footer></aside></div><ol className="ri26-claims-steps">{claimSteps.map((step, i) => <li key={step.title}><article><header><span className="ri26-claims-no" aria-hidden>{String(i + 1).padStart(2, "0")}</span><span className="ri26-claims-icon" aria-hidden>{step.icon === "camera" ? <Camera /> : step.icon === "gauge" ? <Gauge /> : step.icon === "folder" ? <FolderOpen /> : <Lock />}</span></header><b>{step.title}</b><p>{step.body}</p><footer>{step.detail}</footer></article></li>)}</ol><div className="ri26-claims-foot"><div className="ri26-claims-note"><span aria-hidden><ShieldCheck /></span><div><b>We accept all insurance carriers</b><small>Insurance assistance available for {area.name} properties</small></div></div><div className="ri26-claims-foot-actions"><a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a><Link className="voda-btn ri26-btn-outline" href="/#request-service">{site.cta.request} <ArrowRight aria-hidden /></Link><a className="ri26-claims-foot-tel" href={`tel:${tel}`}><span className="ri26-claims-foot-tel-icon" aria-hidden><Phone /></span><span><small>24/7 emergency line</small><b>{site.phone}</b></span></a></div></div></div></section>

    <section className="ri26-section ri26-area-services"><div className="voda-wrap"><div className="voda-heading"><span className="voda-eyebrow">Services in {area.name}</span><h2>Emergency restoration from first response<br /><em>through put-back.</em></h2><p>Water, fire, contaminated-water, contents, and reconstruction services for {area.name} properties.</p></div><ServiceRail items={services.map(({ id, shortTitle, subtitle, icon: Icon }) => ({ title: shortTitle, copy: subtitle, icon: <Icon aria-hidden />, href: `/services/${id}` }))} /></div></section>

    <section className="ri26-section ri26-area-gallery-section"><div className="voda-wrap"><div className="ri26-gallery-head"><div><span className="voda-eyebrow">Recent work</span><h2>How a {area.name} job is documented</h2><p>Three stages from the same loss, recorded as the work progressed.</p></div><div className="ri26-gallery-badges"><div className="ri26-gallery-badge"><span aria-hidden><ClipboardCheck /></span><div><b>Every stage recorded</b><small>Photos and readings go to your file</small></div></div><div className="ri26-gallery-badge"><span aria-hidden><FolderOpen /></span><div><b>Shared on request</b><small>The same file goes to your carrier</small></div></div></div></div><ol className="ri26-gallery-track">{jobStages.map((stage, i) => <li key={stage.stage}><div className="ri26-gallery-rail" aria-hidden><span className="ri26-gallery-node" /></div><div className="ri26-gallery-stage"><span>{stage.stage}</span><em>{stage.window}</em></div><figure><div className="ri26-gallery-frame"><Image src={area.gallery[i] ?? area.image} alt={`${stage.label} during restoration work in ${area.name}`} fill className="voda-cover" sizes="(max-width: 700px) 92vw, (max-width: 1000px) 46vw, 31vw" /><span className="ri26-gallery-step" aria-hidden>{String(i + 1).padStart(2, "0")}</span></div><figcaption><b>{stage.label}</b><span>{stage.caption}</span></figcaption></figure></li>)}</ol></div></section>

    <Faq items={getAreaFaqs(area)} eyebrow={`${area.name} questions`} heading={<>Water damage in <em>{area.name}</em></>} />

    <section className="voda-cta-band ri26-area-cta" aria-labelledby="area-cta-heading">
      <div className="voda-cta-band-panel">
      <span className="voda-cta-band-rail" aria-hidden>Emergency response</span>
      <span className="voda-cta-band-mark right ri26-area-cta-mark" aria-hidden>RestoreIQ</span>
      <div className="voda-wrap voda-cta-band-inner">
        <div className="voda-cta-band-copy">
          <span className="voda-eyebrow cyan">Water still moving?</span>
          <h2 id="area-cta-heading">Call before the damage <em>spreads farther.</em></h2>
          <ul className="voda-cta-band-points">
            <li><Check aria-hidden />Most calls answered live</li>
            <li><Check aria-hidden />Insurance assistance</li>
            <li><Check aria-hidden />{area.name} crews</li>
          </ul>
        </div>
        <div className="voda-cta-band-actions">
          <a className="voda-btn primary" href={`tel:${tel}`}>{site.cta.call} <ArrowRight aria-hidden /></a>
          <a className="voda-cta-band-call" href={`tel:${tel}`}>
            <span className="voda-cta-band-icon" aria-hidden><Phone aria-hidden /></span>
            <span><small>24/7 emergency line</small><b>{site.phone}</b></span>
          </a>
        </div>
      </div>
      </div>
    </section>
  </article>;
}
