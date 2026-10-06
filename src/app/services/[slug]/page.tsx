import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Hammer, ClipboardList, Package, PackageOpen, RotateCcw, Sparkles, Truck, ArrowUpFromLine, Biohazard, Box, Building2, Camera, Check, ClipboardCheck, Clock3, CloudRain, DoorClosed, Droplet, Droplets, Fan, FileText, Flame, Footprints, Gauge, House, HousePlus, Layers, Link2, Mountain, PanelsTopLeft, Phone, Pipette, Plug, Refrigerator, ScanSearch, ShieldAlert, ShieldCheck, Snowflake, TriangleAlert, Unplug, Users, UtensilsCrossed, Wallpaper, WashingMachine, Waves, WavesArrowDown, Wind, Wrench, X, Zap } from "lucide-react";
import { notFound } from "next/navigation";
import { HouseCutaway } from "@/components/house-cutaway";
import { Faq } from "@/components/sections/faq";
import { getService, services } from "@/lib/services";
import { causeIcons, contentsPage, reconPage, commercialPhases, commercialPhaseClose, hourOne, stepsHeading, batch3Context, batch3Expertise, batch3Safety, batch3Steps, continuityZones, batch2Expertise, batch2Safety, batch2Steps, causeDetail, hiddenPaths, processSteps, safetyGuides, splitCause, dryingStages, escalationNote, expertise, featureAside, featureAsideLower, featureImages, heroImages, residueRows, waterCategories } from "@/lib/service-features";
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
  const exp = expertise[service.id] ?? batch2Expertise[service.id] ?? batch3Expertise[service.id];
  const hero = heroImages[service.id];
  const paths = hiddenPaths[service.id];
  const isBatch2 = Boolean(paths);
  const context = batch3Context[service.id];
  const contextIcon = { building: Building2, users: Users, clipboard: ClipboardCheck, shield: ShieldCheck, check: Check, clock: Clock3, alert: TriangleAlert, file: FileText, layers: Layers, gauge: Gauge, link: Link2, box: Box };
  const safetyIcon = { valve: Droplet, lift: ArrowUpFromLine, shield: ShieldCheck, camera: Camera, door: DoorClosed, droplet: Droplet, wind: Wind, plug: Plug, vacuum: Fan, stack: Layers, cloth: Wallpaper, fan: Fan, food: UtensilsCrossed, footprint: Footprints, window: PanelsTopLeft, box: Box, clipboard: ClipboardCheck };
  const causeIcon = { pipe: Pipette, snow: Snowflake, rust: Wrench, joint: Unplug, dishwasher: WashingMachine, washer: WashingMachine, fridge: Refrigerator, heater: Flame, window: PanelsTopLeft, overflow: Droplets, storm: CloudRain, drain: Waves, ground: Mountain, roof: House, fire: Flame, spark: Zap, candle: Flame, wildfire: Flame, sewer: Biohazard, toilet: Droplets, contaminated: Biohazard, droplet: Droplet };
  const steps = processSteps[service.id] ?? batch2Steps[service.id] ?? batch3Steps[service.id];
  const stepsHead = stepsHeading[service.id];
  const hour = hourOne[service.id];
  const phases = service.id === "commercial-water-damage" ? commercialPhases : null;
  const contents = service.id === "contents-protection" ? contentsPage : null;
  const recon = service.id === "reconstruction" ? reconPage : null;
  const safety = safetyGuides[service.id] ?? batch2Safety[service.id] ?? batch3Safety[service.id];
  const stepIcon = { phone: Phone, scan: ScanSearch, waves: WavesArrowDown, wind: Wind, house: HousePlus, shield: ShieldCheck, clipboard: ClipboardCheck, layers: Layers, gauge: Gauge };
  const pillarIcon = { gauge: Gauge, scan: ScanSearch, clipboard: ClipboardCheck, shield: ShieldCheck, wind: Wind, layers: Layers };

  return <article className="voda-site ri26-detail">
    {/* Hero matches the service-area pages: full-bleed photo, grid pattern,
        navy wash and the single wave curve into the section below. */}
    <header className={`ri26-detail-hero ri26-detail-hero-map ri26-service-hero${isBatch2 ? " ri26-hero-b2" : ""}${recon ? " is-light-photo" : ""}`}>
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
      <svg className="ri26-hero-wave ri26-hero-wave-arc" viewBox="0 0 1440 260" preserveAspectRatio="none" aria-hidden="true"><path className="ri26-wave-wide" d="M0 260V46L280 46C440 46 520 96 700 128C880 160 1060 196 1240 202C1340 205 1400 192 1440 178V260Z" /><path className="ri26-wave-narrow" d="M0 260V72C300 72 560 150 880 176C1120 195 1300 186 1440 164V260Z" /></svg>
    </header>

    {/* Expertise: large photo with the copy card overlapping its lower-left,
        editorial-spread style. Scope points run as an inline row under the
        lede rather than a tall side panel. */}
    {exp && service.id === "commercial-water-damage" && (
      <section className="ri26-section ri26-expc" aria-labelledby="expertise-heading">
        <div className="voda-wrap ri26-expc-split">
          <figure className="ri26-expc-shot">
            {exp.image ? <Image src={exp.image} alt={exp.imageAlt} fill className="voda-cover" sizes="(max-width: 1000px) 92vw, 38vw" /> : null}
            <figcaption>{exp.imageTag}</figcaption>
          </figure>
          <div className="ri26-expc-copy">
            <span className="voda-eyebrow">{exp.eyebrow}</span>
            <h2 id="expertise-heading">{exp.heading} <em>{exp.headingAccent}</em></h2>
            <p className="ri26-expc-lede">{exp.lede}</p>
            <ol className="ri26-expc-list">{exp.pillars.map((pillar, i) => {
              const PillarIcon = pillarIcon[pillar.icon];
              return <li key={pillar.title}>
                <span className="ri26-expc-mark" aria-hidden><PillarIcon /></span>
                <div><b>{pillar.title}</b><p>{pillar.body}</p></div>
                <span className="ri26-expc-n" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              </li>;
            })}</ol>
            <div className="ri26-expc-actions">
              <a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a>
              <ul>{service.points.map((point) => <li key={point}><Check aria-hidden />{point}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>
    )}
    {exp && isBatch2 && (
      <section className="ri26-section ri26-expb2" aria-labelledby="expertise-heading">
        <div className="voda-wrap">
          <div className="ri26-expb2-split">
            <div className="ri26-expb2-copy">
              <span className="voda-eyebrow">{exp.eyebrow}</span>
              <h2 id="expertise-heading">{exp.heading} <em>{exp.headingAccent}</em></h2>
              <p className="ri26-expb2-lede">{exp.lede}</p>
              <ul className="ri26-expb2-points">{service.points.map((point) => <li key={point}><Check aria-hidden />{point}</li>)}</ul>
              <a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a>
            </div>
            {exp.image ? (
              <figure className="ri26-expb2-shot">
                <Image src={exp.image} alt={exp.imageAlt} fill className="voda-cover" sizes="(max-width: 1000px) 92vw, 46vw" />
                <figcaption>{exp.imageTag}</figcaption>
              </figure>
            ) : null}
          </div>
          <div className="ri26-expb2-cards">{exp.pillars.map((pillar, i) => {
            const PillarIcon = pillarIcon[pillar.icon];
            return <article key={pillar.title}>
              <header><span className="ri26-expb2-mark" aria-hidden><PillarIcon /></span><span className="ri26-expb2-n" aria-hidden>{String(i + 1).padStart(2, "0")}</span></header>
              <b>{pillar.title}</b>
              <p>{pillar.body}</p>
            </article>;
          })}</div>
        </div>
      </section>
    )}
    {exp && !isBatch2 && service.id !== "commercial-water-damage" && service.id !== "contents-protection" && service.id !== "reconstruction" && (
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
              {pillar.image ? <div className="ri26-exp-mosaic-shot"><Image src={pillar.image} alt={pillar.imageAlt} fill className="voda-cover" sizes="(max-width: 900px) 92vw, 460px" /></div> : null}
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
    {/* Commercial signature: which parts of the property keep trading. */}
    {service.id === "commercial-water-damage" && (
      <section className="ri26-section ri26-zones"><div className="voda-wrap">
        <div className="voda-heading"><span className="voda-eyebrow">Keeping the doors open</span><h2>Not every part of the building <em>has to close.</em></h2><p>The property is divided before equipment arrives. Only the contained area stops trading.</p></div>
        <div className="ri26-plan">
          <figure className="ri26-plan-figure">
            <Image src="/services/plan/floor-zones.jpg" alt="Floor plan showing which areas stay open, which are restricted and which are closed during the work" width={1448} height={1086} className="ri26-plan-img" />
          </figure>
          <ol className="ri26-plan-legend">{continuityZones.map((zone) => <li key={zone.zone} className={`is-${zone.tone}`}>
            <span className="ri26-plan-swatch" aria-hidden />
            <div>
              <header><b>{zone.zone}</b><span className="ri26-plan-status">{zone.status}</span></header>
              <p>{zone.detail}</p>
              <footer><span>Access</span>{zone.access}</footer>
            </div>
          </li>)}</ol>
        </div>
      </div></section>
    )}

    {/* Contents signature: what happens to each category of belongings. */}
    {contents && (<>
      <section className="ri26-section ri26-peace" aria-labelledby="peace-heading">
        <div className="voda-wrap ri26-peace-split">
          <div className="ri26-peace-copy">
            <span className="voda-eyebrow">{contents.peace.eyebrow}</span>
            <h2 id="peace-heading">{contents.peace.heading} <em>{contents.peace.headingAccent}</em></h2>
            <p>{contents.peace.body}</p>
          </div>
          <ul className="ri26-peace-list">{contents.peace.items.map((item) => {
            const PeaceIcon = item.icon === "box" ? PackageOpen : item.icon === "return" ? RotateCcw : ShieldCheck;
            return <li key={item.q}>
              <span className="ri26-peace-mark" aria-hidden><PeaceIcon /></span>
              <div><b>{item.q}</b><p>{item.a}</p></div>
            </li>;
          })}</ul>
        </div>
      </section>
      <section className="ri26-section ri26-flow" id="how-it-works" aria-labelledby="flow-heading">
        <div className="voda-wrap">
          <div className="ri26-flow-head">
            <span className="voda-eyebrow">{contents.process.eyebrow}</span>
            <h2 id="flow-heading">{contents.process.heading}</h2>
            <p>{contents.process.lede}</p>
          </div>
          <ol className="ri26-flow-row">{contents.process.steps.map((step, i) => {
            const FlowIcon = step.icon === "clipboard" ? ClipboardList : step.icon === "pack" ? Package : step.icon === "clean" ? Sparkles : Truck;
            return <li key={step.title}>
              <article>
                <header><span className="ri26-flow-n" aria-hidden>{String(i + 1).padStart(2, "0")}</span><span className="ri26-flow-ico" aria-hidden><FlowIcon /></span></header>
                <b>{step.title}</b>
                <p>{step.body}</p>
              </article>
              <span className="ri26-flow-link" aria-hidden><ArrowRight /></span>
            </li>;
          })}</ol>
        </div>
      </section>
      <section className="ri26-section ri26-mats" aria-labelledby="mats-heading">
        <div className="voda-wrap">
          <div className="ri26-mats-head">
            <div>
              <span className="voda-eyebrow">{contents.materials.eyebrow}</span>
              <h2 id="mats-heading">{contents.materials.heading} <em>{contents.materials.headingAccent}</em></h2>
              <p>{contents.materials.lede}</p>
            </div>
            <a className="voda-btn soft" href="#how-it-works">{contents.materials.cta} <ArrowRight aria-hidden /></a>
          </div>
          <ul className="ri26-mats-grid">{contents.materials.items.map((item) => (
            <li key={item.title}>
              <span className="ri26-mats-shot">{item.image ? <Image src={item.image} alt={item.imageAlt} fill className="voda-cover" sizes="(max-width: 620px) 112px, 128px" /> : <span className="ri26-ph" aria-hidden />}</span>
              <div><b>{item.title}</b><p>{item.body}</p></div>
            </li>
          ))}</ul>
        </div>
      </section>
      <section className="ri26-section ri26-before" aria-labelledby="before-heading">
        <div className="voda-wrap ri26-before-grid">
          <div className="ri26-before-copy">
            <span className="voda-eyebrow">{contents.before.eyebrow}</span>
            <h2 id="before-heading">{contents.before.heading} <em>{contents.before.headingAccent}</em></h2>
            <p>{contents.before.lede}</p>
          </div>
          <figure className="ri26-before-shot">
            {contents.before.image ? <Image src={contents.before.image} alt={contents.before.imageAlt} fill className="voda-cover" sizes="(max-width: 900px) 92vw, 30vw" /> : <span className="ri26-ph" aria-hidden />}
          </figure>
          <ol className="ri26-before-list">{contents.before.steps.map((step, i) => (
            <li key={step.title}>
              <span className="ri26-before-n" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              <div><b>{step.title}</b><p>{step.body}</p></div>
            </li>
          ))}</ol>
        </div>
      </section>
    </>)}

    {/* Reconstruction signature: from the demolition record to handover. */}
    {recon && (<>
      <section className="ri26-section ri26-rintro" aria-labelledby="rintro-heading">
        <div className="voda-wrap ri26-rintro-grid">
          <div className="ri26-rintro-copy">
            <span className="voda-eyebrow">{recon.intro.eyebrow}</span>
            <h2 id="rintro-heading">{recon.intro.heading} <em>{recon.intro.headingAccent}</em></h2>
            <p>{recon.intro.body}</p>
          </div>
          <div className="ri26-rintro-card">
            <b>{recon.intro.cardTitle}</b>
            <ul>{recon.intro.checks.map((c) => <li key={c}><Check aria-hidden />{c}</li>)}</ul>
          </div>
          <div className="ri26-rintro-shots">
            <figure className="ri26-rintro-main">{recon.intro.image ? <Image src={recon.intro.image} alt={recon.intro.imageAlt} fill className="voda-cover" sizes="(max-width: 1000px) 92vw, 34vw" /> : <span className="ri26-ph" aria-hidden />}</figure>
            <figure className="ri26-rintro-inset a">{recon.intro.insetA ? <Image src={recon.intro.insetA} alt={recon.intro.insetAAlt} fill className="voda-cover" sizes="180px" /> : <span className="ri26-ph" aria-hidden />}</figure>
            <figure className="ri26-rintro-inset b">{recon.intro.insetB ? <Image src={recon.intro.insetB} alt={recon.intro.insetBAlt} fill className="voda-cover" sizes="180px" /> : <span className="ri26-ph" aria-hidden />}</figure>
          </div>
        </div>
      </section>
      <section className="ri26-section ri26-rscope" aria-labelledby="rscope-heading">
        <div className="voda-wrap">
          <div className="voda-heading centered ri26-rscope-head">
            <span className="voda-eyebrow">{recon.scope.eyebrow}</span>
            <h2 id="rscope-heading">{recon.scope.heading} <em>{recon.scope.headingAccent}</em></h2>
            <p>{recon.scope.lede}</p>
          </div>
          <ol className="ri26-rscope-row">{recon.scope.steps.map((step) => {
            const StepI = step.icon === "clipboard" ? ClipboardList : step.icon === "file" ? FileText : step.icon === "hammer" ? Hammer : ClipboardCheck;
            return <li key={step.title}>
              <article><span className="ri26-rscope-ico" aria-hidden><StepI /></span><b>{step.title}</b><p>{step.body}</p></article>
              <span className="ri26-rscope-link" aria-hidden><ArrowRight /></span>
            </li>;
          })}</ol>
        </div>
      </section>
      <section className="ri26-section ri26-rans" aria-labelledby="rans-heading">
        <div className="voda-wrap">
          <div className="voda-heading centered">
            <span className="voda-eyebrow">{recon.answers.eyebrow}</span>
            <h2 id="rans-heading">{recon.answers.heading} <em>{recon.answers.headingAccent}</em></h2>
          </div>
          <ul className="ri26-rans-grid">{recon.answers.items.map((item) => {
            const AnsI = item.icon === "clock" ? Clock3 : item.icon === "shield" ? ShieldCheck : HousePlus;
            return <li key={item.q}><span className="ri26-rans-ico" aria-hidden><AnsI /></span><b>{item.q}</b><p>{item.a}</p></li>;
          })}</ul>
        </div>
      </section>
      <section className="ri26-section ri26-rwork" aria-labelledby="rwork-heading">
        <div className="voda-wrap">
          <div className="voda-heading centered">
            <span className="voda-eyebrow">{recon.work.eyebrow}</span>
            <h2 id="rwork-heading">{recon.work.heading} <em>{recon.work.headingAccent}</em></h2>
          </div>
          <ul className="ri26-rwork-grid">{recon.work.items.map((item) => (
            <li key={item.title}>
              <figure className="ri26-rwork-shot">{item.image ? <Image src={item.image} alt={item.imageAlt} fill className="voda-cover" sizes="(max-width: 900px) 92vw, 30vw" /> : <span className="ri26-ph" aria-hidden />}</figure>
              <div className="ri26-rwork-body">
                <header><span className="ri26-rwork-n" aria-hidden>{item.n}</span><b>{item.title}</b></header>
                <p>{item.body}</p>
              </div>
            </li>
          ))}</ul>
        </div>
      </section>
      <section className="ri26-section ri26-rmat" aria-labelledby="rmat-heading">
        <div className="voda-wrap ri26-rmat-grid">
          <div className="ri26-rmat-copy">
            <span className="voda-eyebrow">{recon.materials.eyebrow}</span>
            <h2 id="rmat-heading">{recon.materials.heading} <em>{recon.materials.headingAccent}</em></h2>
            <p>{recon.materials.body}</p>
          </div>
          <ul className="ri26-rmat-checks">{recon.materials.checks.map((c) => <li key={c}><Check aria-hidden />{c}</li>)}</ul>
          <figure className="ri26-rmat-shot">{recon.materials.image ? <Image src={recon.materials.image} alt={recon.materials.imageAlt} fill className="voda-cover" sizes="(max-width: 1000px) 92vw, 30vw" /> : <span className="ri26-ph" aria-hidden />}</figure>
        </div>
      </section>
      <section className="ri26-rband" aria-labelledby="rband-heading">
        <div className="voda-wrap ri26-rband-inner">
          <div>
            <span className="voda-eyebrow cyan">{recon.band.eyebrow}</span>
            <h2 id="rband-heading">{recon.band.heading} <em>{recon.band.headingAccent}</em></h2>
            <p>{recon.band.body}</p>
          </div>
          <div className="ri26-rband-actions">
            <Link className="voda-btn primary" href="/#request-service">{recon.band.cta} <ArrowRight aria-hidden /></Link>
            <a className="ri26-rband-tel" href={`tel:${tel}`}><Phone aria-hidden /><span><small>Call us 24/7</small>{site.phone}</span></a>
          </div>
        </div>
      </section>
    </>)}
    {/* Context replaces causes on batch 3. Each page gets its own
        layout, since the three say different kinds of thing. */}
    {context && service.id === "commercial-water-damage" && (
      <section className="ri26-section ri26-context ri26-context-parties"><div className="voda-wrap">
        <div className="voda-heading"><span className="voda-eyebrow">{context.eyebrow}</span><h2>{context.heading} <em>{context.headingAccent}</em></h2><p>{context.lede}</p></div>
        <div className="ri26-parties-grid">{context.items.map((item) => {
          const ItemIcon = contextIcon[item.icon];
          return <article key={item.label}>
            <span className="ri26-parties-mark" aria-hidden><ItemIcon /></span>
            <b>{item.label}</b>
            <p>{item.body}</p>
          </article>;
        })}</div>
      </div></section>
    )}


    {/* Shared: related causes. */}
    {!context && <section className="ri26-section ri26-detail-causes"><div className="voda-wrap">
      <div className="voda-heading centered"><span className="voda-eyebrow">Related causes of loss</span><h2>Situations this service <em>commonly addresses.</em></h2><p>The losses this service is most often called out to, and what each one tends to involve.</p></div>
      <div className={isBatch2 ? "ri26-cause-list" : "ri26-cause-grid"}>{service.causes.map((cause, index) => <article key={cause}><span className="ri26-cause-no">{String(index + 1).padStart(2, "0")}</span><span className="ri26-cause-icon" aria-hidden>{(() => { const CauseIcon = causeIcons[cause] ? causeIcon[causeIcons[cause]] : Icon; return <CauseIcon />; })()}</span><h3>{(() => { const [before, word, after] = splitCause(cause); return <>{before}<em>{word}</em>{after}</>; })()}</h3>{causeDetail[cause] && <p>{causeDetail[cause]}</p>}</article>)}</div>
    </div></section>}

    {/* Process: same markup and classes as the homepage's process
        section, with a sequence written for this service. */}
    {steps && !contents && !recon && (
      <section className={`ri26-section ri26-steps${phases ? " has-phase" : ""}`}><div className="voda-wrap">
        <div className="voda-heading">
          <span className="voda-eyebrow">{stepsHead?.eyebrow ?? "What happens after you call"}</span>
          {stepsHead
            ? <h2>{stepsHead.heading} <em>{stepsHead.headingAccent}</em></h2>
            : <h2>A clear path from emergency <em>to restored.</em></h2>}
          <p>{stepsHead?.lede ?? "Five stages, each with a rough window so you know what comes next and when."}</p>
        </div>
        {phases ? (
          <div className="ri26-phase">
            <ol className="ri26-phase-strip">{phases.map((phase, index) => (
              <li key={phase.label} className={phase.pivot ? "is-pivot" : undefined}>
                <span className="ri26-phase-n" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                <h3 className="ri26-phase-label">{phase.label}</h3>
                <span className="ri26-phase-tick" aria-hidden />
                <p className="ri26-phase-note">{phase.note}</p>
                <span className="ri26-phase-state">{phase.state}</span>
              </li>
            ))}</ol>
            <div className="ri26-phase-close">
              <div className="ri26-phase-close-claim">
                <span className="voda-eyebrow">{commercialPhaseClose.label}</span>
                <p>{commercialPhaseClose.statement}</p>
                <p>{commercialPhaseClose.body}</p>
                <p className="ri26-phase-close-note">{commercialPhaseClose.note}</p>
              </div>
              <ul className="ri26-phase-options">{commercialPhaseClose.options.map((option) => (
                <li key={option.key} className={`is-${option.key}`}>
                  <svg className="ri26-phase-plan" viewBox="0 0 160 104" role="img" aria-label={option.key === "shut" ? "Plan of a floor with the entire area shaded as closed" : "Plan of the same floor with only one room shaded as closed and the rest open"}>
                    <defs><pattern id={`hatch-${option.key}`} width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="6" /></pattern></defs>
                    {option.key === "shut"
                      ? <rect className="ri26-plan-shut" x="1" y="1" width="158" height="102" fill={`url(#hatch-${option.key})`} />
                      : <rect className="ri26-plan-shut" x="100" y="1" width="59" height="102" fill={`url(#hatch-${option.key})`} />}
                    <rect className="ri26-plan-wall" x="1" y="1" width="158" height="102" />
                    <line className={option.key === "phased" ? "ri26-plan-barrier" : "ri26-plan-inner"} x1="100" y1="1" x2="100" y2="103" />
                    <line className="ri26-plan-inner" x1="1" y1="52" x2="100" y2="52" />
                    <line className="ri26-plan-inner" x1="50" y1="52" x2="50" y2="103" />
                  </svg>
                  <h4>{option.label}</h4>
                  <p className="ri26-phase-outcome">{option.outcome}</p>
                  <ul>{option.notes.map((note) => <li key={note}>{note}</li>)}</ul>
                </li>
              ))}</ul>
            </div>
          </div>
        ) : (
        <ol className={isBatch2 ? "ri26-steps-rail" : "ri26-steps-grid"}>{steps.map(({ title, accent, copy, when, icon }, index) => { const StepIcon = stepIcon[icon]; return <li key={title}><article>
          <header><span className="ri26-steps-n" aria-hidden>{String(index + 1).padStart(2, "0")}</span><span className="ri26-steps-when">{when}</span></header>
          <span className="ri26-steps-ico" aria-hidden><StepIcon /></span>
          <b>{title} <em>{accent}</em></b>
          <p>{copy}</p>
        </article></li>; })}</ol>
        )}
      </div></section>
    )}

    {/* Safety: what to do before the crew arrives. Scoped to actions that
        are safe to advise, with anything hazardous pushed to emergency
        services rather than described. */}
    {hour && (
      <section className="ri26-section ri26-first" aria-labelledby="first-heading">
        <div className="voda-wrap">
          <div className="voda-heading">
            <span className="voda-eyebrow">{hour.eyebrow}</span>
            <h2 id="first-heading">{hour.heading} <em>{hour.headingAccent}</em></h2>
            <p>{hour.lede}</p>
          </div>
          <div className="ri26-first-grid">
            <ol className="ri26-first-list">{hour.actions.map((action, index) => {
              const ActionIcon = safetyIcon[action.icon];
              return <li key={action.title}>
                <span className="ri26-first-n" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                <span className="ri26-first-ico" aria-hidden><ActionIcon /></span>
                <b>{action.title}</b>
                <p>{action.body}</p>
              </li>;
            })}</ol>
            <figure className="ri26-first-shot">
              {hour.image ? <Image src={hour.image} alt={hour.imageAlt} fill className="voda-cover" sizes="(max-width: 1000px) 92vw, 38vw" /> : null}
              <figcaption>{hour.imageTag}</figcaption>
            </figure>
          </div>
          <p className="ri26-first-warning"><TriangleAlert aria-hidden /> {hour.warning}</p>
        </div>
      </section>
    )}
    {safety && !contents && !recon && (
      <section className={`ri26-section ri26-safety${isBatch2 ? " ri26-safety-b2" : ""}`}><div className={`voda-wrap${isBatch2 ? "" : " ri26-safety-split"}`}>
        <div className="ri26-safety-copy">
          <span className="voda-eyebrow">{safety.eyebrow}</span>
          <h2>{safety.heading} <em>{safety.headingAccent}</em></h2>
          <p className="ri26-safety-lede">{safety.lede}</p>
          <figure className="ri26-safety-shot">
            {safety.image ? <Image src={safety.image} alt={safety.imageAlt} fill className="voda-cover" sizes="(max-width: 1000px) 92vw, 42vw" /> : null}
            <figcaption><b>{safety.stat}</b><span>{safety.statLabel}</span></figcaption>
          </figure>
          <p className="ri26-safety-warning"><TriangleAlert aria-hidden /> {safety.warning}</p>
        </div>
        <div className="ri26-safety-card">
          <section className="ri26-safety-half is-do">
            <header><span aria-hidden><Check /></span><div><b>If it is safe to do so</b><small>Before we arrive</small></div></header>
            <ol>{safety.doList.map((item) => <li key={item.text}><span className="ri26-safety-n" aria-hidden>{(() => { const SafetyIcon = safetyIcon[item.icon]; return <SafetyIcon />; })()}</span><div><b>{item.text}</b><span>{item.why}</span></div></li>)}</ol>
          </section>
          <section className="ri26-safety-half is-dont">
            <header><span aria-hidden><X /></span><div><b>Avoid doing this</b><small>It makes the loss worse</small></div></header>
            <ol>{safety.dontList.map((item) => <li key={item.text}><span className="ri26-safety-n" aria-hidden>{(() => { const SafetyIcon = safetyIcon[item.icon]; return <SafetyIcon />; })()}</span><div><b>{item.text}</b><span>{item.why}</span></div></li>)}</ol>
          </section>
        </div>
      </div></section>
    )}
    {/* Shared: CTA band. The two mock-built pages are excluded — reconstruction
        has its own closing band and contents ends on the FAQ. */}
    {!recon && !contents && <section className="voda-cta-band ri26-area-cta" aria-labelledby="service-cta-heading">
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
    </section>}

    {recon
      ? <Faq items={service.faqs.map(({ question, answer }) => ({ q: question, a: answer }))} eyebrow="Frequently asked questions" heading={<>Reconstruction <em>FAQs.</em></>} />
      : <Faq items={service.faqs.map(({ question, answer }) => ({ q: question, a: answer }))} eyebrow="Service questions" heading={<>Before the work <em>begins</em></>} />}

  </article>;
}
