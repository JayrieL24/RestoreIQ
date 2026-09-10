"use client";

import * as React from "react";
import Link from "next/link";
import { MenuIcon, PhoneIcon } from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/layout/logo";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-300 ${scrolled ? "border-[#d5e1e8]/70 bg-white/95 shadow-[0_6px_24px_rgba(7,29,53,.08)] backdrop-blur-xl" : "border-transparent bg-transparent shadow-none"}`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" aria-label={`${site.name} home`}>
          <Logo framed={!scrolled} />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2.5 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0878b7] ${scrolled ? "text-[#102f48] hover:bg-[#e8f3fa] hover:text-[#075c93]" : "text-white [text-shadow:0_1px_4px_rgba(7,29,53,0.9)] hover:bg-[#071d35]/30"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden rounded-sm bg-[#55dce3] px-5 text-[11px] font-bold text-[#06263c] shadow-none hover:bg-[#8cecf0] sm:inline-flex">
            <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>
              <PhoneIcon />
              {site.phone}
            </a>
          </Button>

          <Button asChild size="sm" className="shrink-0 rounded-sm border border-white/30 bg-[#072a62] px-4 text-[11px] font-bold text-white shadow-sm hover:bg-[#0b4089]">
            <Link href="/#contact">Book a demo</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="border border-[#c7dce9] bg-[#edf5fa] text-[#102f48] hover:bg-[#dcecf6] hover:text-[#071d35] lg:hidden"
                aria-label="Open menu"
              >
                <MenuIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {site.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="hover:bg-accent rounded-md px-3 py-2.5 text-[0.95rem] font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <Button asChild className="w-full" size="lg">
                  <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>
                    <PhoneIcon />
                    Call {site.phone}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
