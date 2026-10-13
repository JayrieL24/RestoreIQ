import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Camera, Clock3, Plug, Users, Check, ClipboardCheck, Droplet, Flame, Gauge, HousePlus, Layers, LocateFixed, Map, MapPin, Phone, ScanSearch, ShieldCheck, WavesArrowDown, Wind } from "lucide-react";
import { notFound } from "next/navigation";
import { Faq } from "@/components/sections/faq";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { getService, services } from "@/lib/services";
import { scopeDetail, howWeHelp, causeDetail, introHeadings, stepsHeading, batch3Steps, batch2Steps, processSteps, featureAside, featureImages, heroImages, signatureBand } from "@/lib/service-features";
import { ServiceFeaturePhoto } from "@/components/service-feature-photo";
import { ServiceCauseIcon } from "@/components/service-cause-icon";
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
  const band = signatureBand[service.id];
  const hero = heroImages[service.id];
  const mobileHero = hero ? getImageProps({ src: hero.portrait, alt: hero.alt, fill: true, sizes: "100vw" }).props : undefined;
  const scopeIcon = { waves: WavesArrowDown, scan: ScanSearch, wind: Wind, clipboard: ClipboardCheck, shield: ShieldCheck, flame: Flame, droplet: Droplet, layers: Layers, box: Box, gauge: Gauge, house: HousePlus, clock: Clock3, check: Check, camera: Camera, plug: Plug, users: Users };
  const help = howWeHelp[service.id];
  const intro = introHeadings[service.id] ?? { lineOne: service.title, lineTwo: "", accent: service.subtitle + "." };
  const steps = processSteps[service.id] ?? batch2Steps[service.id] ?? batch3Steps[service.id];
  const stepsHead = stepsHeading[service.id];
  const stepIcon = { phone: Phone, scan: ScanSearch, waves: WavesArrowDown, wind: Wind, house: HousePlus, shield: ShieldCheck, clipboard: ClipboardCheck, layers: Layers, gauge: Gauge };

  return <article className="voda-site ri26-detail">
    {/* Hero matches the service-area pages: full-bleed photo, grid pattern,
        navy wash and the single wave curve into the section below. */}
    <header className="ri26-detail-hero ri26-detail-hero-map ri26-service-hero ri26-action-hero">
      <div className="ri26-hero-photo">{hero ? (
        <picture>
          <source media="(max-width: 1000px)" srcSet={mobileHero?.srcSet} sizes="100vw" />
          <source media="(min-width: 1001px)" srcSet={hero.src} />
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
          <p className="ri26-detail-copy">{service.subtitle} for homes and businesses.</p>
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
    {/* Intro: heading and lede left, body and causes right. */}
    <section className="ri26-section ri26-svc-intro ri26-svc-intro-aligned" aria-labelledby="intro-heading">
      <div className="voda-wrap ri26-svc-intro-split">
        <div className="ri26-svc-intro-lead">
          {/* The spaces matter: below 620px the <br> are display:none, and
              without them the lines run together ("damageyou", "rarelyall"). */}
          <h2 id="intro-heading">{intro.lineOne}<br />{" "}{intro.lineTwo}<br />{" "}<em>{intro.accent}</em></h2>
          <dl className="ri26-svc-intro-facts">
            <div>
              <dt><Clock3 aria-hidden />Response</dt>
              <dd>{site.coverage.hours}</dd>
            </div>
            <div>
              <dt><MapPin aria-hidden />Covering</dt>
              <dd>{site.coverage.areas.length} local communities</dd>
            </div>
            <div>
              <dt><ShieldCheck aria-hidden />Insurance</dt>
              <dd>Documentation for your claim</dd>
            </div>
          </dl>
        </div>
        <div className="ri26-svc-intro-detail">
          <div className="ri26-svc-intro-causes">
            <b>Most often called out for</b>
            <ul>{service.causes.map((cause) => <li key={cause}><ServiceCauseIcon cause={cause} /><b>{cause}</b>{causeDetail[cause] ? <span>{causeDetail[cause]}</span> : null}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>

    {/* What we handle: the service's own scope points. */}
    <section className="ri26-section ri26-svc-scope" aria-labelledby="scope-heading">
      <div className="voda-wrap ri26-svc-scope-split">
        <div className="ri26-svc-scope-head">
          <h2 id="scope-heading" className="ri26-svc-scope-heading-three"><span>Included in</span><em><span>every restoration</span><span>job.</span></em></h2>
          <p>We explain the scope before work begins and keep you informed as the project progresses.</p>
          <Link className="voda-btn primary ri26-svc-scope-cta" href="/#request-service">{site.cta.request} <ArrowRight aria-hidden /></Link>
        </div>
        <ul className="ri26-svc-scope-grid">{service.points.map((point, index) => {
          const entry = scopeDetail[point];
          const ScopeIcon = point === "Source identification" ? LocateFixed : point === "Moisture mapping" ? Map : entry ? scopeIcon[entry.icon] : Check;
          return <li key={point}>
            <span className="ri26-svc-scope-n" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
            <span className="ri26-svc-scope-ico" aria-hidden><ScopeIcon /></span>
            <div>
              <b>{point}</b>
              {entry ? <p>{entry.detail}</p> : null}
            </div>
          </li>;
        })}</ul>
      </div>
    </section>
    {/* How we help: heading, floor-plan diagram and a stat card. */}
    {help && (
      <section className="ri26-section ri26-help ri26-help-reference" aria-labelledby="help-heading">
        <div className="voda-wrap ri26-help-grid">
          <div className="ri26-help-copy">
            <span className="voda-eyebrow">How we help</span>
            <h2 id="help-heading" className="ri26-help-reference-heading"><span>{help.lineOne} {help.lineTwo}</span><em>{help.accent}</em></h2>
          </div>
          <figure className="ri26-help-plan">
            {help.image ? <Image src={help.image} alt={help.imageAlt} fill className="voda-cover" sizes="(max-width: 600px) 92vw, 50vw" /> : <span className="ri26-ph" aria-hidden />}
          </figure>
          <aside className="ri26-help-stat">
            <b>{help.statLabel}</b>
            <div className="ri26-help-stat-summary">
              <strong className={`ri26-help-figure${help.figure.length > 3 ? " ri26-help-figure-text" : ""}`}>{help.figure}</strong>
              <p>{help.statBody}</p>
            </div>
            <div className="ri26-help-note">
              <span aria-hidden><Droplet /></span>
              <p>{help.note}</p>
            </div>
            <div className="ri26-help-stat-actions">
              <Link className="voda-btn primary" href="/#request-service">{site.cta.request} <ArrowRight aria-hidden /></Link>
              <a className="voda-btn ri26-help-stat-secondary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a>
            </div>
          </aside>
        </div>
      </section>
    )}
    {band && (
      <section className="ri26-section ri26-dry ri26-dry-aligned ri26-dry-reference" data-service={service.id} aria-labelledby="dry-heading">
        <div className="voda-wrap">
          <div className="ri26-dry-top">
            <div className="ri26-dry-main">
              <h2 id="dry-heading">{band.headingTop}{service.id === "water-damage-restoration" ? "." : <><br /><em>{band.headingAccent}</em></>}</h2>
              <p className="ri26-dry-lede">{band.lede}</p>
              {feature && (
                <figure className="ri26-dry-shot">
                  <ServiceFeaturePhoto src={feature.src} alt={feature.alt} />
                  <figcaption><span>{band.eyebrow}</span>{feature.caption}</figcaption>
                </figure>
              )}
            </div>

            <div className="ri26-dry-side">
              {aside && (
                <div className="ri26-dry-why" data-service={service.id}>
                  <strong className="ri26-dry-figure">{aside.stat}</strong>
                  <p className="ri26-dry-figure-note">{aside.statLabel}</p>
                  <ul>{aside.points.map((point) => <li key={point}><span aria-hidden><Check /></span>{point}</li>)}</ul>
                  <div className="ri26-dry-standard"><span>{band.target.eyebrow}</span><p>{band.target.note}</p></div>
                </div>
              )}
            </div>
          </div>

          <ol className="ri26-dry-track" aria-label="Restoration progress">{band.track.map((stage, index) => (
            <li key={stage.step}>
              <span className="ri26-dry-stage-number">Stage {String(index + 1).padStart(2, "0")}</span>
              <b>{stage.label}</b>
              <span className="ri26-dry-stage-icon" aria-hidden>{index === 0 ? <ShieldCheck /> : index === 1 ? <ScanSearch /> : index === 2 ? <Layers /> : <ClipboardCheck />}</span>
              <p className="ri26-dry-stage-detail">{stage.detail}</p>
              <div className="ri26-dry-meter">
                <span className="ri26-dry-bar" aria-hidden><i style={{ width: `${stage.progress}%` }} /></span>
                <span>{stage.reading}</span>
              </div>
            </li>
          ))}</ol>
        </div>
      </section>
    )}

    {/* Batch 2 signature: where the water goes after it leaves the
        source. Shared by the four plumbing-failure services, with
        per-service paths. */}
    {/* Commercial signature: which parts of the property keep trading. */}
    {/* Contents signature: what happens to each category of belongings. */}

    {/* Shared: related causes. */}

    {/* Process: same markup and classes as the homepage's process
        section, with a sequence written for this service. */}
    {steps && (
      <section className="ri26-section ri26-steps"><div className="voda-wrap">
        <div className="voda-heading">
          <span className="voda-eyebrow">Process</span>
          {stepsHead
            ? <h2>{stepsHead.heading} <em>{stepsHead.headingAccent}</em></h2>
            : <h2>A clear path from emergency <em>to restored.</em></h2>}
          <p>{stepsHead?.lede ?? "Five stages, each with a rough window so you know what comes next and when."}</p>
        </div>
        <RevealGroup className="voda-step-grid voda-step-grid-five">{steps.map(({ title, accent, copy, when, icon }, index) => { const StepIcon = stepIcon[icon]; return <RevealItem key={title}><article>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div><StepIcon aria-hidden /></div>
          <h3>{title} <em>{accent}</em></h3>
          <p>{copy}</p>
          <small className="voda-step-timing">{when}</small>
        </article></RevealItem>; })}</RevealGroup>
      </div></section>
    )}

    {/* Safety: what to do before the crew arrives. Scoped to actions that
        are safe to advise, with anything hazardous pushed to emergency
        services rather than described. */}


    {/* Shared: one CTA band on every service page, pointing at /contact. */}
    <section className="voda-cta-band ri26-area-cta" aria-labelledby="service-cta-heading">
      <div className="voda-cta-band-panel">
        <span className="voda-cta-band-rail" aria-hidden>Emergency response</span>
        <span className="voda-cta-band-mark right ri26-area-cta-mark" aria-hidden>RestoreIQ</span>
        <div className="voda-wrap voda-cta-band-inner">
          <div className="voda-cta-band-copy">
            <h2 id="service-cta-heading">Call before the damage <em>spreads farther.</em></h2>
            <ul className="voda-cta-band-points">
              <li><Check aria-hidden />Most calls answered live</li>
              <li><Check aria-hidden />Insurance assistance</li>
              <li><Check aria-hidden />Local restoration crews</li>
            </ul>
          </div>
          <div className="voda-cta-band-actions">
            <Link className="voda-btn primary" href="/contact">Contact us <ArrowRight aria-hidden /></Link>
            <a className="voda-cta-band-call" href={`tel:${tel}`}>
              <span className="voda-cta-band-icon" aria-hidden><Phone aria-hidden /></span>
              <span><small>24/7 emergency line</small><b>{site.phone}</b></span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <Faq items={service.faqs.map(({ question, answer }) => ({ q: question, a: answer }))} heading={<>Before the work <em>begins</em></>} />

  </article>;
}
