"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock3, Droplets, Hammer, ShieldCheck, Waves } from "lucide-react";
import { ImageComparison } from "@/components/ui/image-comparison-slider";

type Case = {
  title: string;
  slug: string;
  beforeAlt: string;
  afterAlt: string;
  Icon: typeof Droplets;
  category: string;
  /** ⚠️ PLACEHOLDER — confirm against real job records before launch. */
  duration: string;
};

const cases: Case[] = [
  {
    title: "Carpet Water Damage",
    slug: "carpet",
    beforeAlt: "Saturated carpet and wall after a supply line leak",
    afterAlt: "Dry restored carpet and repaired wall",
    Icon: Droplets,
    category: "Extraction & drying",
    duration: "4 days",
  },
  {
    title: "Drywall Restoration",
    slug: "drywall",
    beforeAlt: "Water-damaged bedroom wall before restoration",
    afterAlt: "Rebuilt and repainted bedroom wall",
    Icon: Hammer,
    category: "Repair & refinish",
    duration: "6 days",
  },
  {
    title: "Hardwood Recovery",
    slug: "hardwood",
    beforeAlt: "Cupped wet hardwood beside a leaking dishwasher",
    afterAlt: "Dry repaired hardwood and finished wall",
    Icon: Waves,
    category: "Structural drying",
    duration: "5 days",
  },
  {
    title: "Mold Remediation",
    slug: "mould",
    beforeAlt: "Opened laundry wall with localized mold damage",
    afterAlt: "Rebuilt laundry wall after remediation",
    Icon: ShieldCheck,
    category: "Contained removal",
    duration: "3 days",
  },
];

export function BeforeAfterShowcase() {
  const [start, setStart] = useState(0);
  const visible = Array.from(
    { length: 3 },
    (_, index) => cases[(start + index) % cases.length]!,
  );
  const move = (direction: number) => setStart(value => (value + direction + cases.length) % cases.length);

  return <div className="ba-showcase">
    <button type="button" className="ba-nav ba-nav-prev" onClick={() => move(-1)} aria-label="Previous restoration examples"><ChevronLeft /></button>
    <div className="ba-showcase-grid">
      {visible.map(({ title, slug, beforeAlt, afterAlt, Icon, category, duration }) => <article className="ba-case" key={`${start}-${slug}`}>
        <ImageComparison beforeImage={`/Before&After/${slug}-before.png`} afterImage={`/Before&After/${slug}-after.png`} altBefore={beforeAlt} altAfter={afterAlt} />
        <div className="ba-case-body">
          <span className="ba-case-icon"><Icon aria-hidden /></span>
          <div>
            <h3>{title}</h3>
            <p className="ba-case-meta">
              <span>{category}</span>
              <i aria-hidden />
              <span className="ba-case-time"><Clock3 aria-hidden />{duration}</span>
            </p>
          </div>
        </div>
      </article>)}
    </div>
    <button type="button" className="ba-nav ba-nav-next" onClick={() => move(1)} aria-label="Next restoration examples"><ChevronRight /></button>
    <div className="ba-dots" aria-label="Restoration example pages">{cases.map((item,index)=><button type="button" key={item.slug} className={index===start?"active":""} onClick={()=>setStart(index)} aria-label={`Show ${item.title}`}/>)}</div>
  </div>;
}
