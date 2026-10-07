"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

/**
 * A listbox that replaces the native <select>. The open option list of a real
 * select is drawn by the operating system and cannot be styled with CSS, so
 * the only way to control its appearance is to draw it ourselves.
 *
 * A hidden input carries the value, so the surrounding form submits exactly as
 * it did before. Keyboard behaviour follows the WAI-ARIA combobox pattern:
 * Up/Down move through options, Home/End jump to the ends, Enter or Space
 * commits, Escape closes without changing the value, and typing a letter
 * jumps to the next option starting with it.
 */
export function SelectField({
  name,
  options,
  defaultValue,
  required,
  id,
  labelledBy,
}: {
  name: string;
  options: readonly string[];
  defaultValue?: string;
  required?: boolean;
  id?: string;
  /** Id of the element labelling this control, since there is no <label>. */
  labelledBy?: string;
}) {
  const [value, setValue] = React.useState(defaultValue ?? options[0] ?? "");
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(() => Math.max(0, options.indexOf(defaultValue ?? "")));
  const root = React.useRef<HTMLDivElement>(null);
  const list = React.useRef<HTMLUListElement>(null);
  const typed = React.useRef({ text: "", at: 0 });
  const reactId = React.useId();
  const listId = `${id ?? reactId}-listbox`;

  // Close when focus or a click leaves the control.
  React.useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the active option in view when moving with the keyboard.
  React.useEffect(() => {
    if (!open) return;
    list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function commit(index: number) {
    const next = options[index];
    if (next === undefined) return;
    setValue(next);
    setActive(index);
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        if (!open) { setOpen(true); return; }
        const step = event.key === "ArrowDown" ? 1 : -1;
        setActive((i) => Math.min(options.length - 1, Math.max(0, i + step)));
        return;
      }
      case "Home": if (open) { event.preventDefault(); setActive(0); } return;
      case "End": if (open) { event.preventDefault(); setActive(options.length - 1); } return;
      case "Enter":
      case " ": {
        event.preventDefault();
        if (open) commit(active); else setOpen(true);
        return;
      }
      case "Escape": if (open) { event.preventDefault(); setOpen(false); } return;
      case "Tab": setOpen(false); return;
      default: break;
    }

    // Type-ahead: letters jump to the next matching option.
    if (event.key.length !== 1 || event.metaKey || event.ctrlKey || event.altKey) return;
    const now = Date.now();
    typed.current.text = now - typed.current.at > 700 ? event.key : typed.current.text + event.key;
    typed.current.at = now;
    const query = typed.current.text.toLowerCase();
    const found = options.findIndex((option) => option.toLowerCase().startsWith(query));
    if (found >= 0) { setActive(found); if (!open) commit(found); }
  }

  return (
    <div className="ri26-select" ref={root}>
      {/* The real value for form submission. `required` lives here rather than
          on the button, where aria-required is not a valid attribute; the
          listbox always holds a value, so this never blocks submission. */}
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        id={id}
        className="ri26-select-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={labelledBy}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <span>{value}</span>
        <ChevronDown aria-hidden />
      </button>

      {open ? (
        <ul className="ri26-select-list" id={listId} role="listbox" ref={list} tabIndex={-1} aria-activedescendant={`${listId}-${active}`}>
          {options.map((option, index) => (
            <li
              key={option}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={option === value}
              className={index === active ? "is-active" : undefined}
              onPointerEnter={() => setActive(index)}
              onClick={() => commit(index)}
            >
              <span>{option}</span>
              {option === value ? <Check aria-hidden /> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
