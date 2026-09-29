import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
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
  return <article className="voda-site ri26-detail">
    <header className="ri26-detail-hero"><Image src={service.image} alt={service.imageAlt} fill priority sizes="100vw" /><div className="ri26-hero-shade" /><div className="voda-wrap"><p className="ri26-kicker"><span /> 24/7 emergency restoration</p><h1>{service.title}</h1><p className="ri26-detail-copy">{service.subtitle} for homes and businesses across Ventura County.</p><div className="voda-actions"><a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a><Link className="voda-btn glass" href="/#request-service">{site.cta.request} <ArrowRight aria-hidden /></Link></div></div></header>

    <section className="ri26-section"><div className="voda-wrap ri26-detail-intro"><div className="voda-heading"><span className="voda-eyebrow">How RestoreIQ approaches the loss</span><h2>A scope built around the affected materials</h2><p>{service.body}</p></div><ul>{service.points.map((point) => <li key={point}><Check aria-hidden /> {point}</li>)}</ul></div></section>

    <section className="ri26-section ri26-detail-causes"><div className="voda-wrap"><div className="voda-heading"><span className="voda-eyebrow">Related causes of loss</span><h2>Situations this service commonly addresses</h2></div><div className="ri26-cause-grid">{service.causes.map((cause, index) => <div key={cause}><b>0{index + 1}</b><span>{cause}</span></div>)}</div></div></section>

    <section className="ri26-section ri26-detail-faq"><div className="voda-wrap"><div className="voda-heading"><span className="voda-eyebrow">Service FAQs</span><h2>Useful answers before work begins</h2></div><div className="ri26-faq-grid">{service.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>

    <section className="ri26-detail-cta"><div className="voda-wrap"><div><span>Emergency help, day or night</span><h2>Call now for current arrival guidance.</h2></div><a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call}</a></div></section>
  </article>;
}
