import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, FileText, Camera, Clock3, Plug, Users, Check, ClipboardCheck, Droplet, Flame, Gauge, HousePlus, Layers, Phone, ScanSearch, ShieldCheck, WavesArrowDown, Wind } from "lucide-react";
import { notFound } from "next/navigation";
import { Faq } from "@/components/sections/faq";
import { getService, services } from "@/lib/services";
import { scopeDetail, howWeHelp, causeDetail, introHeadings, stepsHeading, batch3Steps, batch2Steps, processSteps, featureAside, featureAsideLower, featureImages, heroImages, signatureBand } from "@/lib/service-features";
import { ServiceFeaturePhoto } from "@/components/service-feature-photo";
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
  const band = signatureBand[service.id];
  const hero = heroImages[service.id];
  const isBatch2 = ["burst-pipe-cleanup", "appliance-leak-cleanup", "hardwood-floor-drying", "crawlspace-drying"].includes(service.id);
  const scopeIcon = { waves: WavesArrowDown, scan: ScanSearch, wind: Wind, clipboard: ClipboardCheck, shield: ShieldCheck, flame: Flame, droplet: Droplet, layers: Layers, box: Box, gauge: Gauge, house: HousePlus, clock: Clock3, check: Check, camera: Camera, plug: Plug, users: Users };
  const help = howWeHelp[service.id];
  const intro = introHeadings[service.id] ?? { lineOne: service.title, lineTwo: "", accent: service.subtitle + "." };
  const steps = processSteps[service.id] ?? batch2Steps[service.id] ?? batch3Steps[service.id];
  const stepsHead = stepsHeading[service.id];
  const stepIcon = { phone: Phone, scan: ScanSearch, waves: WavesArrowDown, wind: Wind, house: HousePlus, shield: ShieldCheck, clipboard: ClipboardCheck, layers: Layers, gauge: Gauge };

  return <article className="voda-site ri26-detail">
    {/* Hero matches the service-area pages: full-bleed photo, grid pattern,
        navy wash and the single wave curve into the section below. */}
    <header className={`ri26-detail-hero ri26-detail-hero-map ri26-service-hero${isBatch2 ? " ri26-hero-b2" : ""}${service.id === "reconstruction" ? " is-light-photo" : ""}`}>
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
    <section className="ri26-section ri26-svc-intro" aria-labelledby="intro-heading">
      <div className="voda-wrap ri26-svc-intro-split">
        <div className="ri26-svc-intro-lead">
          <span className="voda-eyebrow">What this covers</span>
          {/* The spaces matter: below 620px the <br> are display:none, and
              without them the lines run together ("damageyou", "rarelyall"). */}
          <h2 id="intro-heading">{intro.lineOne}<br />{" "}{intro.lineTwo}<br />{" "}<em>{intro.accent}</em></h2>
          <dl className="ri26-svc-intro-facts">
            <div>
              <dt>Response</dt>
              <dd>{site.coverage.hours}</dd>
            </div>
            <div>
              <dt>Covering</dt>
              <dd>{site.coverage.areas.length} local communities</dd>
            </div>
            <div>
              <dt>Insurance</dt>
              <dd>Documentation for your claim</dd>
            </div>
          </dl>
        </div>
        <div className="ri26-svc-intro-detail">
          <p className="ri26-svc-intro-body">{service.body}</p>
          <div className="ri26-svc-intro-causes">
            <b>Most often called out for</b>
            <ul>{service.causes.map((cause) => <li key={cause}><b>{cause}</b>{causeDetail[cause] ? <span>{causeDetail[cause]}</span> : null}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>

    {/* What we handle: the service's own scope points. */}
    <section className="ri26-section ri26-svc-scope" aria-labelledby="scope-heading">
      <div className="voda-wrap ri26-svc-scope-split">
        <div className="ri26-svc-scope-head">
          <span className="voda-eyebrow">What we handle</span>
          <h2 id="scope-heading">Included in <em>every job.</em></h2>
          <p>Nine things are covered on every job of this type. Nothing on this list is
            an upsell or a line item you have to ask for.</p>
          <div className="ri26-svc-scope-foot">
            <div className="ri26-svc-scope-count">
              <b>{service.points.length}</b>
              <span>items included as standard,<br />on every job we take</span>
            </div>
            <div className="ri26-svc-scope-count">
              <b>24/7</b>
              <span>emergency line, across<br />{site.coverage.areas.length} local communities</span>
            </div>
          </div>
        </div>
        <ul className="ri26-svc-scope-grid">{service.points.map((point, index) => {
          const entry = scopeDetail[point];
          const ScopeIcon = entry ? scopeIcon[entry.icon] : Check;
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
      <section className="ri26-section ri26-help" aria-labelledby="help-heading">
        <div className="voda-wrap ri26-help-grid">
          <div className="ri26-help-copy">
            <span className="voda-eyebrow">How we help</span>
            <h2 id="help-heading">{help.lineOne}<br />{" "}{help.lineTwo}<br />{" "}<em>{help.accent}</em></h2>
            <p>{help.lede}</p>
          </div>
          <figure className="ri26-help-plan">
            {help.image ? <Image src={help.image} alt={help.imageAlt} fill className="voda-cover" sizes="(max-width: 1000px) 92vw, 36vw" /> : <span className="ri26-ph" aria-hidden />}
          </figure>
          <aside className="ri26-help-stat">
            <b>{help.statLabel}</b>
            <strong className="ri26-help-figure">{help.figure}</strong>
            <p>{help.statBody}</p>
            <div className="ri26-help-note">
              <span aria-hidden><Droplet /></span>
              <p>{help.note}</p>
            </div>
          </aside>
        </div>
      </section>
    )}
    {band && (
      <section className="ri26-section ri26-dry" aria-labelledby="dry-heading">
        <div className="voda-wrap">
          <div className="ri26-dry-top">
            <div className="ri26-dry-main">
              <span className="voda-eyebrow">{band.eyebrow}</span>
              <h2 id="dry-heading">{band.headingTop}<br /><em>{band.headingAccent}</em></h2>
              <p className="ri26-dry-lede">{band.lede}</p>
              {feature && (
                <figure className="ri26-dry-shot">
                  <ServiceFeaturePhoto src={feature.src} alt={feature.alt} />
                </figure>
              )}
            </div>

            <div className="ri26-dry-side">
              {aside && (
                <div className="ri26-dry-why" data-service={service.id}>
                  <span className="voda-eyebrow cyan">{aside.eyebrow}</span>
                  <strong className="ri26-dry-figure">{aside.stat}</strong>
                  <p className="ri26-dry-figure-note">{aside.statLabel}</p>
                  <ul>{aside.points.map((point) => <li key={point}><span aria-hidden><Check /></span>{point}</li>)}</ul>
                </div>
              )}
              {asideLower && (
                <div className="ri26-dry-record">
                  <header><span className="voda-eyebrow">{asideLower.eyebrow}</span><span className="ri26-dry-record-mark" aria-hidden><FileText /></span></header>
                  <ul>{asideLower.rows.map((row, i) => {
                    const RowIcon = [Gauge, Camera, ClipboardCheck][i] ?? ClipboardCheck;
                    return <li key={row.label}>
                      <span className="ri26-dry-record-ico" aria-hidden><RowIcon /></span>
                      <b>{row.label}</b>
                      <ArrowRight className="ri26-dry-record-go" aria-hidden />
                    </li>;
                  })}</ul>
                </div>
              )}
              <div className="ri26-dry-target">
                <div>
                  <span className="voda-eyebrow">{band.target.eyebrow}</span>
                  <strong>{band.target.value}</strong>
                  <p>{band.target.note}</p>
                </div>
                <span className="ri26-dry-target-mark" aria-hidden><Gauge /></span>
              </div>
            </div>
          </div>

          <ol className="ri26-dry-track">{band.track.map((stage) => (
            <li key={stage.step}>
              <span className="ri26-dry-day">{stage.step}</span>
              <b>{stage.label}</b>
              <p>{stage.detail}</p>
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
          <span className="voda-eyebrow">{stepsHead?.eyebrow ?? "What happens after you call"}</span>
          {stepsHead
            ? <h2>{stepsHead.heading} <em>{stepsHead.headingAccent}</em></h2>
            : <h2>A clear path from emergency <em>to restored.</em></h2>}
          <p>{stepsHead?.lede ?? "Five stages, each with a rough window so you know what comes next and when."}</p>
        </div>
        <ol className="ri26-steps-grid">{steps.map(({ title, accent, copy, when, icon }, index) => { const StepIcon = stepIcon[icon]; return <li key={title}><article>
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


    {/* Shared: one CTA band on every service page, pointing at /contact. */}
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

    <Faq items={service.faqs.map(({ question, answer }) => ({ q: question, a: answer }))} eyebrow="Service questions" heading={<>Before the work <em>begins</em></>} />

  </article>;
}
