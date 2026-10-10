"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Float cohesive content blocks, matching the original homepage Reveal wrappers.
// Section backgrounds, waves, and full-bleed hero images are never targets.
const contentSelector = [
  "[data-scroll-reveal]", ".voda-heading",
  ".voda-trust-strip-row > div", ".voda-service-rail-shell",
  ".voda-insurance-footnote", ".ri26-carrier-label", ".ri26-carrier",
  ".home-section-cta", ".ba-case", ".voda-area-copy",
  ".voda-faq-item", ".voda-cta-band-copy", ".voda-cta-band-actions",
  ".ri26-hero-copy-col", ".about-reference-copy",
  ".about-text-intro", ".about-text-apart", ".about-text-cards",
  ".about-standards-copy", ".about-standard-card",
  ".about-process .voda-step-grid > article",
  ".ri26-svc-intro-lead", ".ri26-svc-intro-detail",
  ".ri26-svc-scope-head", ".ri26-svc-scope-grid > li",
  ".ri26-help-copy", ".ri26-help-plan", ".ri26-help-stat",
  ".ri26-dry-main", ".ri26-dry-why", ".ri26-dry-record",
  ".ri26-dry-target", ".ri26-dry-track > li", ".ri26-steps-grid > li",
  ".ri26-area-intro-copy", ".ri26-area-intro-visual",
  ".ri26-area-facts-head", ".ri26-area-facts > article",
  ".ri26-coverage-copy", ".ri26-claims-head", ".ri26-claims-file",
  ".ri26-claims-steps > li", ".ri26-claims-foot",
  ".ri26-gallery-head", ".ri26-gallery-track > li",
  ".ri26-contact-details", ".ri26-contact-form",
].join(",");

export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.getElementById("main-content");
    if (!root || !window.IntersectionObserver) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const pending = new Map<HTMLElement, string>();
    const animations = new Set<Animation>();
    const seen = new WeakSet<HTMLElement>();

    function reveal(element: HTMLElement, animate = true) {
      const opacity = pending.get(element);
      if (opacity === undefined) return;
      pending.delete(element);
      observer.unobserve(element);
      element.style.opacity = opacity;
      if (!animate) return;
      const style = getComputedStyle(element);
      const transform = style.transform === "none" ? "" : style.transform;
      const animation = element.animate([
        { opacity: 0, transform: `${transform} translateY(16px)` },
        { opacity: style.opacity, transform: `${transform} translateY(0px)` },
      ], { duration: 500, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    }

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      }
    }, { threshold: 0 });

    function register() {
      if (preference.matches) return;
      const candidates = Array.from(root!.querySelectorAll<HTMLElement>(contentSelector))
        .filter(element => element.closest("section, .ri26-detail-hero, .about-reference-hero"))
        .filter(element => !element.closest('[aria-hidden="true"], [role="status"], [role="alert"], [aria-live], .voda-faq-panel'));
      const candidateSet = new Set(candidates);
      for (const element of candidates) {
        // Avoid nested reveals on the same content.
        let parent = element.parentElement;
        while (parent && parent !== root && !candidateSet.has(parent)) parent = parent.parentElement;
        if (parent && candidateSet.has(parent)) continue;
        if (seen.has(element)) continue;
        seen.add(element);
        pending.set(element, element.style.opacity);
        element.style.opacity = "0";
        observer.observe(element);
      }
    }

    function showFocused(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      for (const element of pending.keys()) {
        if (element.contains(event.target) || event.target.contains(element)) reveal(element, false);
      }
    }

    function showAll() {
      for (const element of pending.keys()) reveal(element, false);
      for (const animation of animations) animation.cancel();
      animations.clear();
    }

    register();
    // Handle streamed navigation and newly rendered carousel content.
    const mutations = new MutationObserver(register);
    mutations.observe(root, { childList: true, subtree: true });
    root.addEventListener("focusin", showFocused);
    preference.addEventListener("change", showAll);
    return () => {
      mutations.disconnect();
      observer.disconnect();
      root.removeEventListener("focusin", showFocused);
      preference.removeEventListener("change", showAll);
      showAll();
    };
  }, [pathname]);

  return null;
}
