"use client";

import * as React from "react";
import { AlertCircle, ArrowRight, BriefcaseBusiness, CalendarDays, CheckCircle2, FileText, LoaderCircle, MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { serviceAreas } from "@/lib/service-areas";

/**
 * General enquiries. Separate from RequestServiceForm, which is for an active
 * loss and asks whether water is still entering — this one is for billing,
 * insurance, scheduling and anything that is not an emergency. It reuses the
 * same .ri26-form classes so both forms look identical.
 */
type Status = "idle" | "sending" | "success" | "error";

const SUBJECTS = [
  "General enquiry",
  "Insurance or claim question",
  "Billing and invoices",
  "Scheduling or an existing job",
  "Commercial or property management",
  "Careers",
];
const SUBJECT_ICONS = [MessageCircle, FileText, FileText, CalendarDays, BriefcaseBusiness, BriefcaseBusiness];

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [message, setMessage] = React.useState("");
  const [preferredContact, setPreferredContact] = React.useState("Email");
  const tel = site.phone.replace(/[^\d+]/g, "");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "We could not send your message.");
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not send your message.");
    }
  }

  if (status === "success") {
    return (
      <div className="ri26-form-success" role="status">
        <CheckCircle2 aria-hidden />
        <h3>Your message was sent.</h3>
        <p>We reply to enquiries during office hours. If this is an active loss and water is still entering the property, call the 24/7 line instead.</p>
        <a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call} · {site.phone}</a>
      </div>
    );
  }

  return (
    <form className="ri26-form" onSubmit={submit} aria-label="Send RestoreIQ a message">
      <div className="ri26-field-grid">
        <label><span>Name <b>*</b></span><input name="name" autoComplete="name" placeholder="Your full name" required /></label>
        <label><span>Email <b>*</b></span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
      </div>
      <div className="ri26-field-grid">
        <label><span>Phone {preferredContact === "Email" ? <small>(optional)</small> : <b>*</b>}</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(805) 555-0123" required={preferredContact !== "Email"} /></label>
        <label>
          <span>Property city <b>*</b></span>
          <input name="city" list="contact-area-cities" autoComplete="address-level2" placeholder="Your property city" required />
          <datalist id="contact-area-cities">{serviceAreas.map((area) => <option value={area.name} key={area.slug} />)}</datalist>
        </label>
      </div>
      <fieldset className="ri26-contact-subjects">
        <legend>What is this about? <b>*</b></legend>
        <div>{SUBJECTS.map((subject, index) => {
          const Icon = SUBJECT_ICONS[index] ?? MessageCircle;
          return <label key={subject}><input type="radio" name="subject" value={subject} required defaultChecked={index === 0} /><Icon aria-hidden /><span>{subject}</span></label>;
        })}</div>
      </fieldset>
      <fieldset>
        <legend>Preferred contact method <b>*</b></legend>
        <div className="ri26-choice-row">
          {["Call", "Text", "Email"].map((method) => <label key={method}><input type="radio" name="preferredContact" value={method} required checked={preferredContact === method} onChange={() => setPreferredContact(method)} /> {method}</label>)}
        </div>
      </fieldset>
      <div className="ri26-field-grid ri26-message-grid">
        <label><span>How can we help? <b>*</b></span><textarea name="message" rows={4} required placeholder="Tell us what you need." /></label>
      </div>
      <details className="ri26-contact-extra">
        <summary>Add property or reference details <span>(optional)</span></summary>
        <div>
          <label><span>Company or property</span><input name="company" autoComplete="organization" placeholder="Home, business, etc." /></label>
          <label><span>Anything else?</span><textarea name="details" rows={3} placeholder="Dates, access notes, reference numbers." /></label>
        </div>
      </details>
      <input className="ri26-hp" name="companyWebsite" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {status === "error" ? <p className="ri26-form-error" role="alert"><AlertCircle aria-hidden /> {message} To reach us now, call <a href={`tel:${tel}`}>{site.phone}</a>.</p> : null}
      <button className="voda-btn primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? <><LoaderCircle className="ri26-spin" aria-hidden /> Sending message…</> : <>Send message <ArrowRight aria-hidden /></>}
      </button>
      <p className="ri26-form-note">
        Dealing with an active loss? Call {site.phone} rather than waiting on this form. For anything life-threatening, call 911.
      </p>
    </form>
  );
}
