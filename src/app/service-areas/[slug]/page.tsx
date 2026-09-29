import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { getServiceArea, serviceAreas } from "@/lib/service-areas";
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
  return <article className="voda-site ri26-detail">
    <header className="ri26-detail-hero"><Image src={area.image} alt={`Emergency restoration work serving ${area.name}`} fill priority sizes="100vw" /><div className="ri26-hero-shade" /><div className="voda-wrap"><p className="ri26-kicker"><MapPin aria-hidden /> {area.name}, California</p><h1>Water Damage Restoration in {area.name}</h1><p className="ri26-detail-copy">{area.intro}</p><div className="voda-actions"><a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a><Link className="voda-btn glass" href="/#request-service">{site.cta.request} <ArrowRight aria-hidden /></Link></div></div></header>

    <section className="ri26-section"><div className="voda-wrap ri26-detail-intro"><div className="voda-heading"><span className="voda-eyebrow">Local property considerations</span><h2>Restoration planning for {area.name} properties</h2><p>{area.localContext}</p></div><ul>{area.propertyNotes.map((note) => <li key={note}><Check aria-hidden /> {note}</li>)}</ul></div></section>

    <section className="ri26-section ri26-detail-causes"><div className="voda-wrap"><div className="voda-heading"><span className="voda-eyebrow">Services in {area.name}</span><h2>Emergency restoration from first response through put-back</h2></div><div className="ri26-link-grid">{services.map((service) => <Link href={`/services/${service.id}`} key={service.id}><service.icon aria-hidden /><span>{service.shortTitle}</span><ArrowRight aria-hidden /></Link>)}</div></div></section>

    <section className="ri26-section ri26-nearby"><div className="voda-wrap ri26-detail-intro"><div className="voda-heading"><span className="voda-eyebrow">Local coverage</span><h2>{area.name} and nearby communities</h2><p>Call with the property address for current availability and realistic arrival guidance.</p></div><ul>{area.nearby.map((place) => <li key={place}><MapPin aria-hidden /> {place}</li>)}</ul></div></section>

    <section className="ri26-detail-cta"><div className="voda-wrap"><div><span>Water still moving?</span><h2>Call before the damage spreads farther.</h2></div><a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a></div></section>
  </article>;
}
