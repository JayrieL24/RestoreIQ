import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Building2, Camera, Clock3, Plug, Users, Check, ClipboardCheck, Droplet, Flame, Gauge, Hammer, HousePlus, Layers, LocateFixed, Map, Phone, ScanSearch, ShieldCheck, Sparkles, SprayCan, WavesArrowDown, Wind } from "lucide-react";
import { notFound } from "next/navigation";
import { Faq } from "@/components/sections/faq";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { getService, services } from "@/lib/services";
import { scopeDetail, howWeHelp, stepsHeading, batch3Steps, batch2Steps, processSteps, featureImages, heroImages, signatureBand } from "@/lib/service-features";
import { ServiceFeaturePhoto } from "@/components/service-feature-photo";
import { serviceIntroCards, serviceOverviewHeadings } from "@/lib/service-intro-cards";
import { serviceSolutionDetails } from "@/lib/service-solution-details";
import { servicePlanCallouts } from "@/lib/service-plan-callouts";
import { serviceBlueprintCards } from "@/lib/service-blueprint-cards";
import { serviceResults, serviceResultsContext } from "@/lib/service-results";
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
  const results = serviceResults[service.id];
  const band = signatureBand[service.id];
  const hero = heroImages[service.id];
  const mobileHero = hero ? getImageProps({ src: hero.portrait, alt: hero.alt, fill: true, sizes: "100vw" }).props : undefined;
  const scopeIcon = { waves: WavesArrowDown, scan: ScanSearch, wind: Wind, clipboard: ClipboardCheck, shield: ShieldCheck, flame: Flame, droplet: Droplet, layers: Layers, box: Box, gauge: Gauge, house: HousePlus, clock: Clock3, check: Check, camera: Camera, plug: Plug, users: Users };
  const help = howWeHelp[service.id];
  const blueprintCard = serviceBlueprintCards[service.id] ?? { label: "A clear restoration plan", title: "Assess the affected area", description: "Document the damage and plan the next steps." };
  const planCallout = servicePlanCallouts[service.id];
  // Where the callout label starts, in viewBox units left of the plan. Keep in
  // step with the desktop stage inset in service-overview.css.
  const labelX = -280;
  const introCard = serviceIntroCards[service.id];
  const overviewHeading = serviceOverviewHeadings[service.id] ?? ["Your restoration", "starts with", "a clear plan."];
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
      <svg className="ri26-hero-wave ri26-hero-wave-arc" viewBox="0 0 1440 260" preserveAspectRatio="none" aria-hidden="true"><path className="ri26-wave-wide" d="M0 260V36C180 220 360 210 620 110C880 10 1030 230 1230 190C1320 172 1390 70 1440 36V260Z" /><path className="ri26-wave-narrow" d="M0 260V42C180 215 360 205 620 116C880 27 1030 225 1230 186C1320 168 1390 76 1440 42V260Z" /></svg>
    </header>

    <section className="ri26-service-overview" data-service={service.id} aria-labelledby="overview-heading">
      <div className="voda-wrap ri26-service-overview-layout">
        <div className="ri26-service-overview-heading">
          <h2 id="overview-heading"><span>{overviewHeading[0]}</span><span>{overviewHeading[1]}</span><em>{overviewHeading[2]}</em></h2>
        </div>
        <div className="ri26-service-overview-grid">
        <article className="ri26-overview-card" aria-labelledby="overview-expect-heading">
          <div className="ri26-overview-card-top"><span aria-hidden><ClipboardCheck /></span><a href="#scope-heading" aria-label="See the included scope"><ArrowRight aria-hidden /></a></div>
          <h2 id="overview-expect-heading">What to expect</h2>
          <ul>{service.points.slice(0, 4).map(point => <li key={point}><Check aria-hidden /><span>{point}</span></li>)}</ul>
          <a className="ri26-overview-card-link" href="#scope-heading">View the scope <ArrowRight aria-hidden /></a>
        </article>
        <article className="ri26-overview-card" aria-labelledby="overview-causes-heading">
          <div className="ri26-overview-card-top"><span aria-hidden><Icon /></span></div>
          <h2 id="overview-causes-heading">Common causes</h2>
          <ul>{service.causes.map(cause => <li key={cause}><Check aria-hidden /><span>{cause}</span></li>)}</ul>
        </article>
        <article className="ri26-overview-card ri26-overview-response" aria-labelledby="overview-response-heading">
          <div className="ri26-overview-card-top"><span aria-hidden><Clock3 /></span></div>
          <h2 id="overview-response-heading">Response &amp; availability</h2>
          <strong>24/7</strong>
          <p>Our emergency line is open day and night. Call for current arrival guidance.</p>
          <span className="ri26-overview-coverage">Serving {site.coverage.areas.length} local communities</span>
          <a href={`tel:${tel}`} className="ri26-overview-call"><Phone aria-hidden /><span>{site.phone}</span></a>
        </article>
        {introCard && <article className="ri26-overview-card ri26-overview-photo" aria-labelledby="overview-method-heading">
          <Image src={`/services/overview/${service.id}-overview-v1.png`} alt={introCard.alt} fill sizes="(max-width: 350px) 90vw, (max-width: 650px) 45vw, (max-width: 1200px) 35vw, 20vw" className="voda-cover" />
          <div className="ri26-overview-photo-content">
            <span>Our approach</span>
            <h2 id="overview-method-heading">{introCard.figure}</h2>
            <p>{introCard.note}</p>
            <a href="#dry-heading">See our method <ArrowRight aria-hidden /></a>
          </div>
        </article>}
        </div>
      </div>
    </section>

    {/* What we handle: the service's own scope points. */}
    <section className="ri26-solutions" aria-labelledby="scope-heading">
      <div className="voda-wrap ri26-solutions-wrap">
        <div className="ri26-solutions-heading">
          <div><h2 id="scope-heading"><span>Complete {service.shortTitle.toLowerCase()}</span><em>solutions.</em></h2></div>
          <p>{service.id === "water-damage-restoration" ? "From water removal to final repairs, we handle the entire process." : "We explain the scope before work begins and keep you informed through every stage."}</p>
        </div>
        <ul className="ri26-solutions-grid">{service.id === "water-damage-restoration" ? [
          { title: "Water extraction", detail: "Remove standing water from accessible areas and check remaining moisture before drying begins.", Icon: Droplet },
          { title: "Drying & dehumidification", detail: "Position drying equipment and adjust the setup using moisture readings from affected materials.", Icon: Wind },
          { title: "Cleaning & sanitizing", detail: "Match surface cleaning and treatment methods to the water source and affected material.", Icon: Sparkles },
          { title: "Contents restoration", detail: "Document affected belongings and coordinate protection, suitable cleaning, or specialist care where needed.", Icon: Box },
          { title: "Repairs & reconstruction", detail: "Plan property repairs from documented damage, affected materials, and finishes removed during restoration.", Icon: Hammer },
          { title: "Commercial & residential", detail: "Coordinate property access and restoration activity around homes, businesses, and shared residential spaces.", Icon: Building2 },
        ].map(({ title, detail, Icon: SolutionIcon }) => <li key={title}><span className="ri26-solutions-icon" aria-hidden><SolutionIcon /></span><div><h3>{title}</h3><p>{detail}</p></div></li>) : service.points.map((point) => {
          const entry = scopeDetail[point];
          const ScopeIcon = point === "Cleaning and disinfection" ? Sparkles : point === "Antimicrobial application" ? SprayCan : point === "Source identification" ? LocateFixed : point === "Moisture mapping" ? Map : entry ? scopeIcon[entry.icon] : Check;
          return <li key={point}>
            <span className="ri26-solutions-icon" aria-hidden><ScopeIcon /></span>
            <div>
              <h3>{point}</h3>
              {entry ? <p>{serviceSolutionDetails[point] ?? entry.detail}</p> : null}
            </div>
          </li>;
        })}</ul>
      </div>
    </section>
    {/* How we help: heading, floor-plan diagram and a stat card. */}
    {help && (
      <section className="ri26-section ri26-help ri26-help-reference" aria-labelledby="help-heading">
        <svg className="ri26-help-edge ri26-help-edge-top" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H1440V38C1260 42 1110 0 930 12C700 60 470 58 270 25C160 12 70 8 0 10Z" /></svg>
        <div className="voda-wrap ri26-help-grid">
          <div className="ri26-help-copy">
            <h2 id="help-heading" className="ri26-help-reference-heading"><span>{help.lineOne} {help.lineTwo}</span><em>{help.accent}</em></h2>
          </div>
          <figure className="ri26-help-plan">
            <div className="ri26-help-plan-stage">
              {planCallout && <span className="ri26-plan-callout-label" style={{ top: `${(planCallout.y - 80) / 10}%` }} aria-hidden="true">{planCallout.lines.join(" ")}</span>}
              {help.image ? <Image src={help.image} alt={help.imageAlt} fill className="voda-cover" sizes="(max-width: 820px) 75vw, 45vw" /> : <span className="ri26-ph" aria-hidden />}
              {planCallout && <svg className="ri26-plan-callout" viewBox="0 0 1000 1000" role="img" aria-label={planCallout.lines.join(" ")}>
                <text x={labelX} y={planCallout.y - 140}><tspan x={labelX}>{planCallout.lines[0]}</tspan><tspan x={labelX} dy="38">{planCallout.lines[1]}</tspan></text>
                <path className="ri26-plan-callout-outline" d={`M${labelX} ${planCallout.y - 80} H${Math.max(0, planCallout.x - 90)} L${planCallout.x} ${planCallout.y}`} />
                <path d={`M${labelX} ${planCallout.y - 80} H${Math.max(0, planCallout.x - 90)} L${planCallout.x} ${planCallout.y}`} />
                <circle className="ri26-plan-callout-halo" cx={planCallout.x} cy={planCallout.y} r="18" />
                <circle className="ri26-plan-callout-dot" cx={planCallout.x} cy={planCallout.y} r="11" />
              </svg>}
            </div>
          </figure>
          <aside className="ri26-help-stat ri26-help-panels">
            <div className="ri26-help-panel ri26-help-panel-lead">
              <b>{blueprintCard.label}</b>
              <div className="ri26-help-lead-visual">
              <div className="ri26-help-lead-message"><h3>{blueprintCard.title}</h3><p>{blueprintCard.description}</p></div>
                <div className="ri26-help-path" aria-hidden="true">
                  <span><Icon /></span>
                  <svg viewBox="0 0 260 90" fill="none"><path d="M0 64C45 82 48 4 100 24S160 98 210 50S245 35 260 16" stroke="currentColor" strokeWidth="2.5" strokeDasharray="1 10" strokeLinecap="round" /></svg>
                  <LocateFixed />
                </div>
              </div>
            </div>
            <div className="ri26-help-panel ri26-help-panel-details">
              <p>{help.statBody}</p>
              <ul className="ri26-help-facts">
                {(service.id === "water-damage-restoration" ? ["Moves through walls and floors", "Spreads into hidden spaces", "Can affect areas far from the source"] : service.points.slice(0, 3)).map((text, index) => {
                  const FactIcon = [WavesArrowDown, Layers, HousePlus][index] ?? ShieldCheck;
                  return <li key={text}><span aria-hidden="true"><FactIcon /></span><p>{text}</p></li>;
                })}
              </ul>
            </div>
            <div className="ri26-help-panel ri26-help-panel-action">
              <div className="ri26-help-note">
                <span aria-hidden><Icon /></span>
                <p>{help.note}</p>
              </div>
              <div className="ri26-help-stat-actions">
                <Link className="voda-btn primary" href="/#request-service">{site.cta.request} <ArrowRight aria-hidden /></Link>
                <a className="voda-btn ri26-help-stat-secondary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a>
              </div>
            </div>
          </aside>
        </div>
        <svg className="ri26-help-edge ri26-help-edge-bottom" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 70V48C180 -5 320 55 600 55C900 55 1100 68 1440 20V70Z" /></svg>
      </section>
    )}
    {band && results && (
      <section className="ri26-results" aria-labelledby="results-heading">
        <div className="voda-wrap ri26-results-layout">
          <div className="ri26-results-copy">
            <h2 id="results-heading">{results.title} <em>{results.accent}</em></h2>
            <p>{band.lede}</p>
            <p>{serviceResultsContext[service.id]}</p>
            <a className="voda-btn ri26-results-button" href="#service-process">Learn about our process <ArrowRight aria-hidden /></a>
          </div>
          {feature && <figure className="ri26-results-photo">
            <ServiceFeaturePhoto src={feature.src} alt={feature.alt} />
            <figcaption><span aria-hidden="true"><Gauge /></span><div><b>{results.badge}</b><p>Documented checks guide the next step.</p></div></figcaption>
          </figure>}
          <ul className="ri26-results-cards" aria-label="Service checkpoints">
            {results.cards.map((card, index) => {
              const ResultIcon = [ScanSearch, Gauge, ClipboardCheck][index] ?? ClipboardCheck;
              return <li key={card.label}>
                <span className="ri26-results-icon" aria-hidden="true"><ResultIcon /></span>
                <div>
                  <h3>{card.label}</h3>
                  <div className="ri26-results-value-row"><strong>{card.value}</strong><span className={`ri26-results-checkpoint ri26-results-checkpoint-${index}`}>{["Initial check", "Progress check", "Final check"][index]}</span></div>
                  <p>{card.note}</p>
                  <span className="ri26-results-rule" aria-hidden="true"><i /></span>
                </div>
              </li>;
            })}
          </ul>
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
      <section id="service-process" className="ri26-section ri26-steps"><div className="voda-wrap">
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
