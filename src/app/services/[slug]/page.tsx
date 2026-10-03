import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Check, ClipboardCheck, Droplet, Flame, Gauge, HousePlus, Layers, Phone, ScanSearch, ShieldAlert, ShieldCheck, TriangleAlert, WavesArrowDown, Wind, X } from "lucide-react";
import { notFound } from "next/navigation";
import { HouseCutaway } from "@/components/house-cutaway";
import { Faq } from "@/components/sections/faq";
import { getService, services } from "@/lib/services";
import { batch2Expertise, batch2Safety, batch2Steps, causeDetail, hiddenPaths, processSteps, safetyGuides, splitCause, dryingStages, escalationNote, expertise, featureAside, featureAsideLower, featureImages, heroImages, residueRows, waterCategories } from "@/lib/service-features";
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
  const exp = expertise[service.id] ?? batch2Expertise[service.id];
  const hero = heroImages[service.id];
  const paths = hiddenPaths[service.id];
  const isBatch2 = Boolean(paths);
  const steps = processSteps[service.id] ?? batch2Steps[service.id];
  const safety = safetyGuides[service.id] ?? batch2Safety[service.id];
  const stepIcon = { phone: Phone, scan: ScanSearch, waves: WavesArrowDown, wind: Wind, house: HousePlus, shield: ShieldCheck, clipboard: ClipboardCheck, layers: Layers, gauge: Gauge };
  const pillarIcon = { gauge: Gauge, scan: ScanSearch, clipboard: ClipboardCheck, shield: ShieldCheck, wind: Wind, layers: Layers };

  return <article className="voda-site ri26-detail">
    {/* Hero matches the service-area pages: full-bleed photo, grid pattern,
        navy wash and the single wave curve into the section below. */}
    <header className={`ri26-detail-hero ri26-detail-hero-map ri26-service-hero${isBatch2 ? " ri26-hero-b2" : ""}`}>
      <div className="ri26-hero-photo">{hero ? (
        <picture>
          <source media="(max-width: 860px)" srcSet={hero.portrait} />
          <source media="(min-width: 861px)" srcSet={hero.src} />
          <img src={hero.src} alt={hero.alt} className="voda-cover" fetchPriority="high" decoding="async" />
        </picture>
      ) : (
        <Image src={service.image} alt={service.imageAlt} fill priority sizes="100vw" className="voda-cover" />
      )}</div>
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
      <svg className="ri26-hero-wave ri26-hero-wave-arc" viewBox="0 0 1440 260" preserveAspectRatio="none" aria-hidden="true"><path d="M0 260V40C96 150 220 222 390 228C560 234 680 170 820 70C900 12 980 96 1120 120C1260 144 1350 104 1440 48V260Z" /></svg>
    </header>

    {/* Expertise: large photo with the copy card overlapping its lower-left,
        editorial-spread style. Scope points run as an inline row under the
        lede rather than a tall side panel. */}
    {exp && isBatch2 && (
      <section className="ri26-section ri26-expb2" aria-labelledby="expertise-heading">
        <div className="voda-wrap">
          <div className="ri26-expb2-panel">
            <div className="ri26-expb2-photo"><Image src={exp.image} alt={exp.imageAlt} fill className="voda-cover" sizes="(max-width: 1000px) 94vw, 1400px" /></div>
            <div className="ri26-expb2-top">
              <span className="voda-eyebrow cyan">{exp.eyebrow}</span>
              <h2 id="expertise-heading">{exp.heading} <em>{exp.headingAccent}</em></h2>
              <p>{exp.lede}</p>
              <div className="ri26-expb2-actions">
                <a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a>
                <ul>{service.points.map((point) => <li key={point}><Check aria-hidden />{point}</li>)}</ul>
              </div>
            </div>
            <ol className="ri26-expb2-row">{exp.pillars.map((pillar, i) => <li key={pillar.title}>
              <span className="ri26-expb2-n" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              <b>{pillar.title}</b>
              <p>{pillar.body}</p>
            </li>)}</ol>
          </div>
        </div>
      </section>
    )}

    {exp && !isBatch2 && (
      <section className="ri26-section ri26-exp" aria-labelledby="expertise-heading">
        <div className="voda-wrap">
          <div className="ri26-exp-intro">
            <div className="ri26-exp-intro-copy">
              <span className="voda-eyebrow">{exp.eyebrow}</span>
              <h2 id="expertise-heading">{exp.heading} <em>{exp.headingAccent}</em></h2>
              <p className="ri26-exp-lede">{exp.lede}</p>
            </div>
            <div className="ri26-exp-intro-aside">
              <p className="ri26-exp-body">{service.body}</p>
              <ul className="ri26-exp-scope">{service.points.map((point) => <li key={point}><Check aria-hidden />{point}</li>)}</ul>
              <a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a>
            </div>
          </div>
          <div className={isBatch2 ? "ri26-exp-rail" : "ri26-exp-mosaic"}>{exp.pillars.map((pillar, i) => {
            const PillarIcon = pillarIcon[pillar.icon];
            return <article key={pillar.title}>
              <span className="ri26-exp-node" aria-hidden />
              <span className="ri26-exp-step" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              <div className="ri26-exp-mosaic-shot"><Image src={pillar.image} alt={pillar.imageAlt} fill className="voda-cover" sizes="(max-width: 900px) 92vw, 460px" /></div>
              <div className="ri26-exp-mosaic-copy">
                <span className="ri26-exp-mark" aria-hidden><PillarIcon /></span>
                <b>{pillar.title}</b>
                <p>{pillar.body}</p>
              </div>
            </article>;
          })}</div>
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

    {/* Batch 2 signature: where the water goes after it leaves the
        source. Shared by the four plumbing-failure services, with
        per-service paths. */}
    {paths && (
      <section className="ri26-section ri26-paths"><div className="voda-wrap">
        <div className="voda-heading"><span className="voda-eyebrow">Where the water hides</span><h2>The wet patch you can see is <em>rarely the whole loss.</em></h2><p>Select a path to see where it reaches in the structure, and what gives it away.</p></div>
        <HouseCutaway paths={paths} />
      </div></section>
    )}
    {/* Shared: related causes. */}
    <section className="ri26-section ri26-detail-causes"><div className="voda-wrap">
      <div className="voda-heading centered"><span className="voda-eyebrow">Related causes of loss</span><h2>Situations this service <em>commonly addresses.</em></h2><p>The losses this service is most often called out to, and what each one tends to involve.</p></div>
      <div className={isBatch2 ? "ri26-cause-list" : "ri26-cause-grid"}>{service.causes.map((cause, index) => <article key={cause}><span className="ri26-cause-no">{String(index + 1).padStart(2, "0")}</span><span className="ri26-cause-icon" aria-hidden><Icon /></span><h3>{(() => { const [before, word, after] = splitCause(cause); return <>{before}<em>{word}</em>{after}</>; })()}</h3>{causeDetail[cause] && <p>{causeDetail[cause]}</p>}</article>)}</div>
    </div></section>

    {/* Process: same markup and classes as the homepage's process
        section, with a sequence written for this service. */}
    {steps && (
      <section className="ri26-section ri26-steps"><div className="voda-wrap">
        <div className="voda-heading"><span className="voda-eyebrow">What happens after you call</span><h2>A clear path from emergency <em>to restored.</em></h2><p>Five stages, each with a rough window so you know what comes next and when.</p></div>
        <ol className={isBatch2 ? "ri26-steps-rail" : "ri26-steps-grid"}>{steps.map(({ title, accent, copy, when, icon }, index) => { const StepIcon = stepIcon[icon]; return <li key={title}><article>
          <header><span className="ri26-steps-n" aria-hidden>{String(index + 1).padStart(2, "0")}</span><span className="ri26-steps-when">{when}</span></header>
          <span className="ri26-steps-ico" aria-hidden><StepIcon /></span>
          <b>{title} <em>{accent}</em></b>
          <p>{copy}</p>
        </article></li>; })}</ol>
      </div></section>
    )}

    {/* Safety: what to do before the crew arrives. Scoped to actions that
        are safe to advise, with anything hazardous pushed to emergency
        services rather than described. */}
    {safety && (
      <section className={`ri26-section ri26-safety${isBatch2 ? " ri26-safety-b2" : ""}`}><div className={`voda-wrap${isBatch2 ? "" : " ri26-safety-split"}`}>
        <div className="ri26-safety-copy">
          <span className="voda-eyebrow">{safety.eyebrow}</span>
          <h2>{safety.heading} <em>{safety.headingAccent}</em></h2>
          <p className="ri26-safety-lede">{safety.lede}</p>
          <figure className="ri26-safety-shot">
            <Image src={safety.image} alt={safety.imageAlt} fill className="voda-cover" sizes="(max-width: 1000px) 92vw, 42vw" />
            <figcaption><b>{safety.stat}</b><span>{safety.statLabel}</span></figcaption>
          </figure>
          <p className="ri26-safety-warning"><TriangleAlert aria-hidden /> {safety.warning}</p>
        </div>
        <div className="ri26-safety-card">
          <section className="ri26-safety-half is-do">
            <header><span aria-hidden><Check /></span><div><b>If it is safe to do so</b><small>Before we arrive</small></div></header>
            <ol>{safety.doList.map((item, i) => <li key={item.text}><span className="ri26-safety-n" aria-hidden>{String(i + 1).padStart(2, "0")}</span><div><b>{item.text}</b><span>{item.why}</span></div></li>)}</ol>
          </section>
          <section className="ri26-safety-half is-dont">
            <header><span aria-hidden><X /></span><div><b>Avoid doing this</b><small>It makes the loss worse</small></div></header>
            <ol>{safety.dontList.map((item, i) => <li key={item.text}><span className="ri26-safety-n" aria-hidden>{String(i + 1).padStart(2, "0")}</span><div><b>{item.text}</b><span>{item.why}</span></div></li>)}</ol>
          </section>
        </div>
      </div></section>
    )}
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

    <Faq items={service.faqs.map(({ question, answer }) => ({ q: question, a: answer }))} eyebrow="Service questions" heading={<>Before the work <em>begins</em></>} />

  </article>;
}
