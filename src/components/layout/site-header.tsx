"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MenuIcon, PhoneIcon } from "lucide-react";

import { site } from "@/lib/site";
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
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="voda-nav-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="voda-nav-actions">
            <a className="voda-nav-phone" href={tel}>
              <span className="voda-nav-phone-icon"><PhoneIcon aria-hidden /></span>
              <span>
                <small>24/7 emergency</small>
                <b>{site.phone}</b>
              </span>
            </a>

            <Link className="voda-nav-cta" href="/#contact">
              Request service
              <ArrowUpRight aria-hidden />
            </Link>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="voda-nav-menu" aria-label="Open menu" type="button">
                  <span>Menu</span>
                  <MenuIcon className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent className="voda-mobile-sheet" side="right">
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
                  {site.nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="voda-mobile-nav-link"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="voda-mobile-sheet-actions">
                  <a href={tel}>
                    <PhoneIcon aria-hidden />
                    Call {site.phone}
                  </a>
                  <Link href="/#contact" onClick={() => setOpen(false)}>
                    Request service <ArrowUpRight aria-hidden />
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Mobile-only floating call button, bottom-right of the screen. */}
      <a className="voda-float-call" href={tel} aria-label={`Call ${site.phone}`}>
        <PhoneIcon aria-hidden />
      </a>
    </>
  );
}
