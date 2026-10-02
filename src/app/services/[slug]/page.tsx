import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Check, ClipboardCheck, Droplet, Flame, Gauge, Layers, Phone, ScanSearch, ShieldAlert, ShieldCheck, Wind } from "lucide-react";
import { notFound } from "next/navigation";
import { Faq } from "@/components/sections/faq";
import { getService, services } from "@/lib/services";
import { dryingStages, escalationNote, expertise, featureAside, featureAsideLower, featureImages, residueRows, waterCategories } from "@/lib/service-features";
import { site } from "@/lib/site";

export function generateStaticParams() { return services.map(({ id }) => ({ slug: id })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: `${service.title} in Ventura County`, description: `${service.subtitle}. 24/7 emergency restoration from RestoreIQ across Ventura County.` };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const tel = site.phone.replace(/[^\d+]/g, "");
  const Icon = service.icon;
  const feature = featureImages[service.id];
  const aside = featureAside[service.id];
  const asideLower = featureAsideLower[service.id];
  const exp = expertise[service.id];
  const pillarIcon = { gauge: Gauge, scan: ScanSearch, clipboard: ClipboardCheck, shield: ShieldCheck, wind: Wind, layers: Layers };

  return <article className="voda-site ri26-detail">
    {/* Hero matches the service-area pages: full-bleed photo, grid pattern,
        navy wash and the single wave curve into the section below. */}
    <header className="ri26-detail-hero ri26-detail-hero-map ri26-service-hero">
      <div className="ri26-hero-photo"><Image src={service.image} alt={service.imageAlt} fill priority sizes="100vw" className="voda-cover" /></div>
      <div aria-hidden className="ri26-hero-grid" />
      <div className="ri26-hero-shade" />
      <div className="voda-wrap ri26-hero-split">
        <div className="ri26-hero-copy-col">
          <p className="ri26-kicker"><Icon aria-hidden /> Ventura County &middot; 24/7</p>
          <h1>{service.title}</h1>
          <p className="ri26-detail-copy">{service.subtitle} for homes and businesses across Ventura County.</p>
          <div className="voda-actions">
            <a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a>
            <Link className="voda-btn glass" href="/#request-service">{site.cta.request} <ArrowRight aria-hidden /></Link>
          </div>
        </div>
      </div>
      <svg className="ri26-hero-wave" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0 150V60C240 6 560 -12 860 22C1080 47 1280 76 1440 42V150Z" /></svg>
    </header>

    {/* The intro and expertise sections both opened with eyebrow + heading
        + lede, back to back. Merged into one: the claim and the approach on
        the left, the service's own scope points as a panel on the right,
        then the capability cards and the proof row. */}
    {exp && (
      <section className="ri26-section ri26-exp" aria-labelledby="expertise-heading">
        <div className="voda-wrap">
          <div className="ri26-exp-top">
            <div className="ri26-exp-head">
              <span className="voda-eyebrow">{exp.eyebrow}</span>
              <h2 id="expertise-heading">{exp.heading} <em>{exp.headingAccent}</em></h2>
              <p className="ri26-exp-lede">{exp.lede}</p>
              <p className="ri26-exp-body">{service.body}</p>
            </div>
            <div className="ri26-exp-side">
              <figure className="ri26-exp-shot"><Image src={exp.image} alt={exp.imageAlt} fill className="voda-cover" sizes="(max-width: 1000px) 92vw, 38vw" /><figcaption>{exp.imageTag}</figcaption></figure>
              <aside className="ri26-exp-scope">
              <span>What the scope covers</span>
              <ul>{service.points.map((point) => <li key={point}><Check aria-hidden />{point}</li>)}</ul>
              <a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a>
              </aside>
            </div>
          </div>
          <div className="ri26-exp-grid">{exp.pillars.map((pillar) => {
            const PillarIcon = pillarIcon[pillar.icon];
            return <article key={pillar.title}>
              <span className="ri26-exp-mark" aria-hidden><PillarIcon /></span>
              <b>{pillar.title}</b>
              <p>{pillar.body}</p>
            </article>;
          })}</div>
          <dl className="ri26-exp-proof">{exp.proof.map((item) => <div key={item.label}><dt>{item.value}</dt><dd>{item.label}</dd></div>)}</dl>
        </div>
      </section>
    )}

    {/* ── Signature section, different per service ───────────────────────── */}

    {service.id === "water-damage-restoration" && (
      <section className="ri26-section ri26-drying"><div className="voda-wrap">
        <div className="voda-heading"><span className="voda-eyebrow">Drying progress</span><h2>Readings decide when drying stops &mdash; <em>not the calendar.</em></h2><p>Equipment runs until affected materials reach the project target, measured against an unaffected control area in the same property.</p></div>
        {feature && <div className="ri26-feature-shot"><figure className="ri26-feature-figure"><div className="ri26-feature-frame"><Image src={feature.src} alt={feature.alt} fill className="voda-cover" sizes="(max-width: 900px) 92vw, 46vw" /></div><figcaption>{feature.caption}</figcaption></figure><div className="ri26-feature-col">{aside && <aside className="ri26-feature-aside"><span className="voda-eyebrow cyan">{aside.eyebrow}</span><p className="ri26-feature-stat">{aside.stat}</p><p className="ri26-feature-stat-label">{aside.statLabel}</p><ul>{aside.points.map((pt) => <li key={pt}><Check aria-hidden />{pt}</li>)}</ul><div className="ri26-feature-metrics">{aside.metrics.map((m) => <div key={m.label}><b>{m.value}</b><span>{m.label}</span></div>)}</div><footer>{aside.foot}</footer></aside>}{asideLower && <aside className="ri26-feature-aside-lower"><span className="voda-eyebrow">{asideLower.eyebrow}</span><b>{asideLower.title}</b><dl>{asideLower.rows.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl></aside>}</div></div>}
        <ol className="ri26-drying-track">{dryingStages.map((stage, i) => <li key={stage.day}>
          <article>
            <header><span className="ri26-drying-day">{stage.day}</span><span className="ri26-drying-no" aria-hidden>{String(i + 1).padStart(2, "0")}</span></header>
            <b>{stage.label}</b>
            <p>{stage.detail}</p>
            <div className="ri26-drying-meter">
              <div className="ri26-drying-bar"><span style={{ width: `${stage.progress}%` }} /></div>
              <dl><dt>{stage.readingNote}</dt><dd>{stage.reading}</dd></dl>
            </div>
          </article>
        </li>)}</ol>
      </div></section>
    )}

    {service.id === "fire-smoke-damage" && (
      <section className="ri26-section ri26-residue"><div className="voda-wrap">
        <div className="voda-heading"><span className="voda-eyebrow">Residue by material</span><h2>Smoke residue behaves differently on <em>every surface it lands on.</em></h2><p>The cleaning method is chosen per material. Using the wrong one &mdash; particularly wet-cleaning a dry film &mdash; can set residue permanently into a surface.</p></div>
        {feature && <div className="ri26-feature-shot"><figure className="ri26-feature-figure"><div className="ri26-feature-frame"><Image src={feature.src} alt={feature.alt} fill className="voda-cover" sizes="(max-width: 900px) 92vw, 46vw" /></div><figcaption>{feature.caption}</figcaption></figure><div className="ri26-feature-col">{aside && <aside className="ri26-feature-aside"><span className="voda-eyebrow cyan">{aside.eyebrow}</span><p className="ri26-feature-stat">{aside.stat}</p><p className="ri26-feature-stat-label">{aside.statLabel}</p><ul>{aside.points.map((pt) => <li key={pt}><Check aria-hidden />{pt}</li>)}</ul><div className="ri26-feature-metrics">{aside.metrics.map((m) => <div key={m.label}><b>{m.value}</b><span>{m.label}</span></div>)}</div><footer>{aside.foot}</footer></aside>}{asideLower && <aside className="ri26-feature-aside-lower"><span className="voda-eyebrow">{asideLower.eyebrow}</span><b>{asideLower.title}</b><dl>{asideLower.rows.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl></aside>}</div></div>}
        <div className="ri26-residue-grid">{residueRows.map((row, i) => <article key={row.material} className={`ri26-residue-card is-${row.outlook === "Usually restorable" ? "good" : row.outlook === "Depends on exposure" ? "mixed" : "replace"}`}>
          <header><span className="ri26-residue-no" aria-hidden>{String(i + 1).padStart(2, "0")}</span><span className="ri26-residue-mark" aria-hidden><Flame /></span></header>
          <b>{row.material}</b>
          <span className="ri26-residue-type">{row.residue}</span>
          <p>{row.approach}</p>
          <footer>{row.outlook}</footer>
        </article>)}</div>
      </div></section>
    )}

    {service.id === "sewage-cleanup" && (
      <section className="ri26-section ri26-category"><div className="voda-wrap">
        <div className="voda-heading"><span className="voda-eyebrow">Water categories</span><h2>What the water carries decides <em>what can be kept.</em></h2><p>Restoration work classifies every loss under the IICRC S500 standard. The category &mdash; not the volume of water &mdash; drives whether porous materials are dried or removed.</p></div>
        {feature && <div className="ri26-feature-shot"><figure className="ri26-feature-figure"><div className="ri26-feature-frame"><Image src={feature.src} alt={feature.alt} fill className="voda-cover" sizes="(max-width: 900px) 92vw, 46vw" /></div><figcaption>{feature.caption}</figcaption></figure><div className="ri26-feature-col">{aside && <aside className="ri26-feature-aside"><span className="voda-eyebrow cyan">{aside.eyebrow}</span><p className="ri26-feature-stat">{aside.stat}</p><p className="ri26-feature-stat-label">{aside.statLabel}</p><ul>{aside.points.map((pt) => <li key={pt}><Check aria-hidden />{pt}</li>)}</ul><div className="ri26-feature-metrics">{aside.metrics.map((m) => <div key={m.label}><b>{m.value}</b><span>{m.label}</span></div>)}</div><footer>{aside.foot}</footer></aside>}{asideLower && <aside className="ri26-feature-aside-lower"><span className="voda-eyebrow">{asideLower.eyebrow}</span><b>{asideLower.title}</b><dl>{asideLower.rows.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl></aside>}</div></div>}
        <div className="ri26-category-grid">{waterCategories.map((cat) => <article key={cat.code} className={`ri26-category-card is-${cat.tone}`}>
          <header><span className="ri26-category-code">{cat.code}</span><span className="ri26-category-mark" aria-hidden>{cat.tone === "clean" ? <Droplet /> : cat.tone === "grey" ? <AlertTriangle /> : <ShieldAlert />}</span></header>
          <b>{cat.name}</b>
          <p>{cat.summary}</p>
          <ul>{cat.sources.map((src) => <li key={src}><Check aria-hidden />{src}</li>)}</ul>
          <footer><span>Porous materials</span>{cat.porous}</footer>
        </article>)}</div>
        <p className="ri26-category-note"><AlertTriangle aria-hidden /> {escalationNote}</p>
      </div></section>
    )}

    {/* Shared: related causes. */}
    <section className="ri26-section ri26-detail-causes"><div className="voda-wrap">
      <div className="voda-heading"><span className="voda-eyebrow">Related causes of loss</span><h2>Situations this service <em>commonly addresses.</em></h2></div>
      <div className="ri26-cause-grid">{service.causes.map((cause, index) => <div key={cause}><b>0{index + 1}</b><span>{cause}</span></div>)}</div>
    </div></section>

    <Faq items={service.faqs.map(({ question, answer }) => ({ q: question, a: answer }))} eyebrow="Service questions" heading={<>Before the work <em>begins</em></>} />

    {/* Shared: CTA band, matching the homepage and the service-area pages. */}
    <section className="voda-cta-band ri26-area-cta" aria-labelledby="service-cta-heading">
      <div className="voda-cta-band-panel">
        <span className="voda-cta-band-rail" aria-hidden>Emergency response</span>
        <span className="voda-cta-band-mark right ri26-area-cta-mark" aria-hidden>RestoreIQ</span>
        <div className="voda-wrap voda-cta-band-inner">
          <div className="voda-cta-band-copy">
            <span className="voda-eyebrow cyan">Need help now?</span>
            <h2 id="service-cta-heading">Call before the damage <em>spreads farther.</em></h2>
            <ul className="voda-cta-band-points">
              <li><Check aria-hidden />Most calls answered live</li>
              <li><Check aria-hidden />Insurance assistance</li>
              <li><Check aria-hidden />Ventura County crews</li>
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
