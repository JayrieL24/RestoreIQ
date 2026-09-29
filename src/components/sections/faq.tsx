"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

const faqs = [
  { q: "How quickly can someone arrive?", a: "Call RestoreIQ for current availability and realistic arrival guidance. Travel time depends on crew location, traffic, weather, and conditions at active projects." },
  { q: "Can RestoreIQ communicate with my insurer?", a: "Yes, when you authorize it. Project photographs, moisture readings, equipment records, and progress notes can be organized for the adjuster. Coverage and payment remain subject to your policy." },
  { q: "Will wet floors or walls need to be removed?", a: "Not automatically. The water source, contamination level, material type, exposure time, and moisture readings all affect whether a material can be dried or should be removed." },
  { q: "How long does structural drying take?", a: "Every loss is different. Drying progress is evaluated with moisture readings rather than a promised number of days, and equipment can be adjusted as conditions change." },
  { q: "What should I do before the crew arrives?", a: "If it is safe, stop the water at its source and keep people away from electrical hazards or contaminated water. Do not use a household vacuum on standing water." },
  { q: "Do you help with fire and smoke damage?", a: "Yes. Fire and smoke restoration can include stabilization, soot and residue cleaning, odor-control planning, contents coordination, and documentation of affected areas." },
];

function QuestionMark() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.25" /><path d="M9.6 9.3a2.5 2.5 0 1 1 3.3 2.37c-.55.2-.9.72-.9 1.3v.53" /><path d="M12 16.7h.01" /></svg>;
}

export function Faq() {
  const [open, setOpen] = React.useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  const tel = site.phone.replace(/[^\d+]/g, "");
  return <section className="voda-faq" aria-labelledby="faq-heading"><div className="voda-wrap">
    <Reveal className="voda-heading"><span className="voda-eyebrow">Emergency restoration</span><h2 id="faq-heading">Frequently Asked <em>Questions</em></h2></Reveal>
    <div className="voda-faq-list">{faqs.map((item, index) => { const isOpen = open === index; const panelId = `faq-panel-${index}`; const triggerId = `faq-trigger-${index}`; return <div key={item.q} className={cn("voda-faq-item", isOpen && "is-open")}><h3><button type="button" id={triggerId} onClick={() => setOpen(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={panelId}><span className="voda-faq-mark" aria-hidden><QuestionMark /></span><span className="voda-faq-q">{item.q}</span><span className="voda-faq-toggle" aria-hidden><i /><i /></span></button></h3><AnimatePresence initial={false}>{isOpen ? <motion.div id={panelId} key="panel" role="region" aria-labelledby={triggerId} initial={reduceMotion ? { opacity:0 } : { height:0, opacity:0 }} animate={reduceMotion ? { opacity:1 } : { height:"auto", opacity:1 }} exit={reduceMotion ? { opacity:0 } : { height:0, opacity:0 }} transition={{ duration:.3, ease:[.22,1,.36,1] }} className="voda-faq-panel"><p>{item.a}</p></motion.div> : null}</AnimatePresence></div>; })}</div>
    <div className="voda-faq-cta"><Link className="voda-faq-cta-alt" href="/#request-service">{site.cta.request}</Link><a className="voda-faq-cta-call" href={`tel:${tel}`}><Phone aria-hidden />{site.phone}</a></div>
  </div></section>;
}
