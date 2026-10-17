"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import { serviceAreas } from "@/lib/service-areas";

const cities = serviceAreas.map((area) => area.name);

export function CityField() {
  const id = React.useId();
  const input = React.useRef<HTMLInputElement>(null);
  const root = React.useRef<HTMLDivElement>(null);
  const menu = React.useRef<HTMLUListElement>(null);
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const [position, setPosition] = React.useState<React.CSSProperties>({});
  const options = cities.includes(value) ? cities : cities.filter(city => city.toLowerCase().includes(value.trim().toLowerCase()));

  React.useEffect(() => {
    const form = input.current?.form;
    const reset = () => { setValue(""); setOpen(false); setActive(-1); };
    form?.addEventListener("reset", reset);
    return () => form?.removeEventListener("reset", reset);
  }, []);

  React.useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const rect = input.current?.getBoundingClientRect();
      if (!rect) return;
      const font = getComputedStyle(input.current!);
      const viewport = window.visualViewport;
      const top = viewport?.offsetTop ?? 0;
      const bottom = top + (viewport?.height ?? window.innerHeight);
      const below = bottom - rect.bottom - 12;
      const above = rect.top - top - 12;
      const upwards = below < 180 && above > below;
      setPosition({ fontFamily:font.fontFamily, fontSize:font.fontSize, fontWeight:font.fontWeight, letterSpacing:font.letterSpacing, lineHeight:font.lineHeight,
        left:rect.left, width:rect.width, top:upwards ? undefined : rect.bottom + 6,
        bottom:upwards ? window.innerHeight - rect.top + 6 : undefined,
        maxHeight:Math.max(44, Math.min(280, upwards ? above : below)) });
    };
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node) && !menu.current?.contains(event.target as Node)) setOpen(false);
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    window.visualViewport?.addEventListener("resize", place);
    window.visualViewport?.addEventListener("scroll", place);
    document.addEventListener("pointerdown", dismiss);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
      window.visualViewport?.removeEventListener("resize", place);
      window.visualViewport?.removeEventListener("scroll", place);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, [open]);

  React.useEffect(() => {
    menu.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block:"nearest" });
  }, [active]);

  function choose(city: string) {
    setValue(city); setOpen(false); setActive(-1);
  }

  return <div className="ri26-city-field" ref={root}>
    <label htmlFor={id}><span>Property city <b>*</b></span></label>
    <div className="ri26-city-control">
      <input ref={input} id={id} name="city" value={value} required autoComplete="off"
        placeholder="Select or type your city" role="combobox" aria-autocomplete="list"
        aria-expanded={open} aria-controls={open ? `${id}-options` : undefined}
        aria-activedescendant={open && active >= 0 && options[active] ? `${id}-option-${active}` : undefined}
        onFocus={() => setOpen(true)} onClick={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onChange={event => { setValue(event.target.value); setActive(-1); setOpen(true); }}
        onKeyDown={event => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault(); setOpen(true);
            setActive(index => options.length ? (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length : -1);
          } else if (event.key === "Enter" && open && active >= 0 && options[active]) {
            event.preventDefault(); choose(options[active]);
          } else if (event.key === "Escape") { setOpen(false); setActive(-1); }
          else if (event.key === "Tab") setOpen(false);
        }} />
      <ChevronDown aria-hidden="true" className={open ? "is-open" : undefined} />
    </div>
    {open && createPortal(<ul ref={menu} id={`${id}-options`} role="listbox" aria-label="Property cities" className="ri26-city-options" style={position}>
      {options.map((city, index) => <li key={city} id={`${id}-option-${index}`} data-index={index}
        role="option" aria-selected={value === city} className={index === active ? "is-active" : undefined}
        onPointerDown={event => event.preventDefault()} onPointerMove={() => setActive(index)} onClick={() => choose(city)}>
        {city}{value === city && <Check aria-hidden="true" />}
      </li>)}
      {!options.length && <li role="presentation" className="ri26-city-empty">Use your entered city: {value}</li>}
    </ul>, document.body)}
  </div>;
}
