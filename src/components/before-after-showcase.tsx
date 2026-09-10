"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageComparison } from "@/components/ui/image-comparison-slider";

const cases = [
  ["Carpet Water Damage", "carpet", "Saturated carpet and wall after a supply line leak", "Dry restored carpet and repaired wall"],
  ["Drywall Restoration", "drywall", "Water-damaged bedroom wall before restoration", "Rebuilt and repainted bedroom wall"],
  ["Hardwood Recovery", "hardwood", "Cupped wet hardwood beside a leaking dishwasher", "Dry repaired hardwood and finished wall"],
  ["Mold Remediation", "mould", "Opened laundry wall with localized mold damage", "Rebuilt laundry wall after remediation"],
] as const;

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
      {visible.map(([title, slug, beforeAlt, afterAlt]) => <article className="ba-case" key={`${start}-${slug}`}>
        <ImageComparison beforeImage={`/Before&After/${slug}-before.png`} afterImage={`/Before&After/${slug}-after.png`} altBefore={beforeAlt} altAfter={afterAlt} />
        <h3>{title}</h3>
      </article>)}
    </div>
    <button type="button" className="ba-nav ba-nav-next" onClick={() => move(1)} aria-label="Next restoration examples"><ChevronRight /></button>
    <div className="ba-dots" aria-label="Restoration example pages">{cases.map((item,index)=><button type="button" key={item[1]} className={index===start?"active":""} onClick={()=>setStart(index)} aria-label={`Show ${item[0]}`}/>)}</div>
  </div>;
}
