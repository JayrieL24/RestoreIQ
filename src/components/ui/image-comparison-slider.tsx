"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type PointerEvent } from "react";

type ImageComparisonProps = {
  beforeImage: string;
  afterImage: string;
  altBefore: string;
  altAfter: string;
};

export function ImageComparison({ beforeImage, afterImage, altBefore, altAfter }: ImageComparisonProps) {
  const [position, setPosition] = useState(50);
  const frame = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(Math.max(3, Math.min(97, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) update(event.clientX);
  };

  return <div ref={frame} className="ba-slider" onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); update(e.clientX); }} onPointerMove={onPointerMove}>
    <Image src={beforeImage} alt={altBefore} fill className="ba-image" sizes="(max-width: 760px) 92vw, 48vw" draggable={false} />
    <div className="ba-after" style={{ clipPath: `inset(0 ${100-position}% 0 0)` }}><Image src={afterImage} alt={altAfter} fill className="ba-image" sizes="(max-width: 760px) 92vw, 48vw" draggable={false} /></div>
    <span className="ba-label ba-before-label">Before</span><span className="ba-label ba-after-label">After</span>
    <div className="ba-divider" style={{ left: `${position}%` }}><span aria-hidden>‹&nbsp;›</span></div>
    <input className="ba-range" type="range" min="3" max="97" value={position} onChange={e=>setPosition(Number(e.target.value))} aria-label="Drag to compare before and after" />
  </div>;
}
