"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

interface FaqItem {
  q: string;
  a: string;
}

/**
 * ⚠️ PLACEHOLDER ANSWERS — review before launch.
 * These reflect standard restoration practice, but anything describing what
 * RestoreIQ will do, bill, or guarantee has to match how the company
 * actually operates. Correct or remove anything that does not.
 */
const faqs: FaqItem[] = [
  {
    q: "How quickly can someone get here?",
    a: "Dispatch is staffed around the clock and crews are stationed within 45 miles, so most callouts are on site inside an hour. If we are further out we will tell you the honest arrival time when you call, not an optimistic one.",
  },
  {
    q: "Do you work directly with my insurer?",
    a: "Yes. We document moisture readings, photographs and scope from the first visit, and submit in the format carriers expect. You are welcome to handle the claim yourself, but most homeowners prefer we deal with it.",
  },
  {
    q: "Will you need to tear out my floors and walls?",
    a: "Only what cannot be dried in place. Non-porous and semi-porous materials are usually recoverable with the right equipment. We open up as little as possible, and we show you the readings behind any removal decision.",
  },
  {
    q: "How long does drying actually take?",
    a: "Most residential jobs run three to five days, depending on how far the water traveled and what it soaked into. Equipment stays until materials hit a measured target, not until a set number of days has passed.",
  },
  {
    q: "What does it cost?",
    a: "Every loss is different, so we scope before we price. You get a written estimate before work begins, and we do not add to it without agreeing the change with you first.",
  },
  {
    q: "Is the work guaranteed?",
    a: "Yes. We stand behind both the drying and any reconstruction we carry out. If something we handled fails, we come back and put it right.",
  },
  {
    q: "What should I do before you arrive?",
    a: "If it is safe, stop the water at the source and switch off power to affected rooms. Lift what you can off wet flooring. Do not use a household vacuum on standing water, and stay out of any room where water may have reached wiring.",
  },
  {
    q: "Do you handle mold as well?",
    a: "We do. Mold is remediated under containment with negative air, so spores are not spread into unaffected rooms. We can also arrange post-remediation verification where it is needed.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Thin-stroke circled question mark, left of every question. */
function QuestionMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" />
      <path d="M9.6 9.3a2.5 2.5 0 1 1 3.3 2.37c-.55.2-.9.72-.9 1.3v.53" />
      <path d="M12 16.7h.01" />
    </svg>
  );
}

/**
 * One open answer per column, so expanding something on the right never
 * collapses what the visitor is already reading on the left — and a long
 * answer never shoves its neighboring column around.
 */
export function Faq() {
  // The reference opens one row at a time, with the first open on load.
  const [open, setOpen] = React.useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="voda-faq" aria-labelledby="faq-heading">
      <div className="voda-wrap">
        <Reveal className="voda-heading">
          <span className="voda-eyebrow">Emergency restoration</span>
          <h2 id="faq-heading">
            Frequently Asked <em>Questions</em>
          </h2>
        </Reveal>

        <div className="voda-faq-list">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const triggerId = `faq-trigger-${i}`;

            return (
              <div
                key={item.q}
                className={cn("voda-faq-item", isOpen && "is-open")}
              >
                <h3>
                  <button
                    type="button"
                    id={triggerId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="voda-faq-mark" aria-hidden>
                      <QuestionMark />
                    </span>
                    <span className="voda-faq-q">{item.q}</span>
                    <span className="voda-faq-toggle" aria-hidden>
                      {/* A plus whose vertical bar collapses into a minus,
                          rather than a rotating icon. */}
                      <i />
                      <i />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      key="panel"
                      role="region"
                      aria-labelledby={triggerId}
                      initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="voda-faq-panel"
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="voda-faq-cta">
          <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
