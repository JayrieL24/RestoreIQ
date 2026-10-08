"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, MenuIcon, PhoneIcon } from "lucide-react";

import { site } from "@/lib/site";
import { serviceAreas } from "@/lib/service-areas";
import { services } from "@/lib/services";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tel = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <header className={`voda-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="voda-nav-shell">
          <Link className={`voda-nav-brand ${scrolled ? "is-scrolled-brand" : ""}`} href="/" aria-label={`${site.name} home`}>
            {scrolled ? (
              <Image
                className="voda-scroll-wordmark"
                src="/restoreiq-wordmark-blue.png"
                alt=""
                width={1113}
                height={338}
                sizes="(max-width: 700px) 142px, 176px"
              />
            ) : (
              <Image
                className="voda-top-wordmark"
                src="/restoreiq-wordmark-white.png"
                alt=""
                width={1137}
                height={309}
                sizes="(max-width: 700px) 142px, 190px"
              />
            )}
          </Link>

          <nav aria-label="Main navigation" className="voda-desktop-nav">
            {site.nav.map((item) => {
              if (item.label === "Service areas" || item.label === "Services") {
                const isServices = item.label === "Services";
                return <NavDropdown key={item.href} label={item.label} wide={isServices} links={isServices
                  ? services.map(service => ({ href: `/services/${service.id}`, label: service.shortTitle }))
                  : serviceAreas.map(area => ({ href: `/service-areas/${area.slug}`, label: area.name }))} />;
              }
              return <Link key={item.href} href={item.href} className="voda-nav-link">{item.label}</Link>;
            })}
          </nav>

          <div className="voda-nav-actions">
            <a className="voda-nav-phone" href={tel}>
              <span className="voda-nav-phone-icon"><PhoneIcon aria-hidden /></span>
              <span>
                <small>24/7 emergency</small>
                <b>{site.phone}</b>
              </span>
            </a>

            <Link className="voda-nav-cta" href="/#request-service">
              {site.cta.request}
              <ArrowUpRight aria-hidden />
            </Link>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="voda-nav-menu" aria-label="Open menu" type="button">
                  <span>Menu</span>
                  <MenuIcon className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent className="voda-mobile-sheet" closeClassName="voda-mobile-sheet-close" side="right">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Image
                      className="voda-mobile-drawer-wordmark"
                      src="/restoreiq-wordmark-blue.png"
                      alt={`${site.name} Water Damage`}
                      width={1113}
                      height={338}
                      sizes="180px"
                    />
                  </SheetTitle>
                </SheetHeader>
                <p className="voda-mobile-sheet-kicker">Menu</p>
                <nav className="voda-mobile-nav" aria-label="Mobile navigation">
                  {site.nav.map((item) => <React.Fragment key={item.href}>
                    <Link href={item.href} onClick={() => setOpen(false)} className="voda-mobile-nav-link">{item.label}</Link>
                    {item.label === "Service areas" ? <div className="voda-mobile-area-links">{serviceAreas.map((area) => <Link href={`/service-areas/${area.slug}`} onClick={() => setOpen(false)} key={area.slug}>{area.name}</Link>)}</div> : null}
                    {item.label === "Services" ? <div className="voda-mobile-area-links">{services.map((service) => <Link href={`/services/${service.id}`} onClick={() => setOpen(false)} key={service.id}>{service.shortTitle}</Link>)}</div> : null}
                  </React.Fragment>)}
                </nav>
                <div className="voda-mobile-sheet-actions">
                  <a href={tel}>
                    <PhoneIcon aria-hidden />
                    {site.cta.call} · {site.phone}
                  </a>
                  <Link href="/#request-service" onClick={() => setOpen(false)}>
                    {site.cta.request} <ArrowUpRight aria-hidden />
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className={`ri26-mobile-bar${open ? " is-hidden" : ""}`} aria-label="Emergency actions">
        <a href={tel}><PhoneIcon aria-hidden /> {site.cta.call}</a>
        <Link href="/#request-service"><ArrowUpRight aria-hidden /> {site.cta.request}</Link>
      </div>
    </>
  );
}

function NavDropdown({ label, links, wide }: { label: string; links: { href: string; label: string }[]; wide: boolean }) {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();
  const root = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);
  return <div ref={root} className={`voda-nav-dropdown${open ? " is-open" : ""}`}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={event => { if (event.key === "Escape") { setOpen(false); root.current?.querySelector("button")?.focus(); } }}>
    <button type="button" className="voda-nav-link voda-nav-dropdown-trigger" aria-expanded={open} aria-controls={id}
      onClick={() => setOpen(value => !value)}>{label}<ChevronDown aria-hidden /></button>
    <div id={id} className={`voda-nav-dropdown-panel${wide ? " is-wide" : ""}`} aria-label={`${label} pages`}>
      {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight aria-hidden /></Link>)}
    </div>
  </div>;
}
