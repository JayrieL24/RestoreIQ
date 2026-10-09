"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

export function ServiceFeaturePhoto({ src, alt }: { src: string; alt: string }) {
  const picture = useRef<HTMLPictureElement>(null);
  const [portrait, setPortrait] = useState<boolean | null>(null);
  const portraitSrc = src.replace(/\.jpg$/, "-portrait.webp");
  const sizes = "(max-width: 600px) 92vw, (max-width: 1000px) 52vw, 56vw";
  const { props: landscape } = getImageProps({ src, alt, fill: true, sizes, className: "voda-cover" });
  const { props: vertical } = getImageProps({ src: portraitSrc, alt, fill: true, sizes });

  useEffect(() => {
    const tile = picture.current?.parentElement;
    if (!tile) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      // The crossover minimizes cropping between the 4:3 and 2:3 originals.
      if (width && height) setPortrait(width / height < Math.sqrt(8 / 9));
    });
    observer.observe(tile);
    return () => observer.disconnect();
  }, []);

  return (
    <picture ref={picture} data-orientation={portrait === null ? "auto" : portrait ? "portrait" : "landscape"}>
      <source media={portrait === null ? "(max-width: 1000px)" : portrait ? "all" : "not all"} srcSet={vertical.srcSet} sizes={sizes} />
      {/* getImageProps supplies Next's optimized srcset and loading attributes. */}
      <img {...landscape} alt={alt} />
    </picture>
  );
}
