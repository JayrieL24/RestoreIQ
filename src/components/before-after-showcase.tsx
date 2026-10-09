"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageComparison } from "@/components/ui/image-comparison-slider";

type Case = {
  title: string;
  slug: string;
  beforeAlt: string;
  afterAlt: string;
  /** One line under the title — the cause, then what the work involved. */
  note: string;
};

const cases: Case[] = [
  {
    title: "Carpet Water Damage",
    slug: "carpet",
    beforeAlt: "Saturated carpet and wall after a supply line leak",
    afterAlt: "Dry restored carpet and repaired wall",
    note: "Supply-line leak, extraction and structural drying.",
  },
  {
    title: "Drywall Restoration",
    slug: "drywall",
    beforeAlt: "Water-damaged bedroom wall before restoration",
    afterAlt: "Rebuilt and repainted bedroom wall",
    note: "Plumbing loss, drywall repair and refinishing.",
  },
  {
    title: "Hardwood Recovery",
    slug: "hardwood",
    beforeAlt: "Cupped wet hardwood beside a leaking dishwasher",
    afterAlt: "Dry repaired hardwood and finished wall",
    note: "Appliance leak, hardwood dried in place and saved.",
  },
  {
    title: "Mold Remediation",
    slug: "mould",
    beforeAlt: "Opened laundry wall with localized mold damage",
    afterAlt: "Rebuilt laundry wall after remediation",
    note: "Localized moisture, contained removal and rebuild.",
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
      {visible.map(({ title, slug, beforeAlt, afterAlt, note }) => <article className="ba-case" key={`${start}-${slug}`}>
        <ImageComparison beforeImage={`/Before&After/${slug}-before.png`} afterImage={`/Before&After/${slug}-after.png`} altBefore={beforeAlt} altAfter={afterAlt} />
        <div className="ba-case-body">
          <h3>{title}</h3>
          <p className="ba-case-note">{note}</p>
        </div>
      </article>)}
    </div>
    <button type="button" className="ba-nav ba-nav-next" onClick={() => move(1)} aria-label="Next restoration examples"><ChevronRight /></button>
    <div className="ba-dots" aria-label="Restoration example pages">{cases.map((item,index)=><button type="button" key={item.slug} className={index===start?"active":""} onClick={()=>setStart(index)} aria-label={`Show ${item.title}`}/>)}</div>
  </div>;
}
