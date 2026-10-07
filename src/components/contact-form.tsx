"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { serviceAreas } from "@/lib/service-areas";
import { SelectField } from "@/components/select-field";

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

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [message, setMessage] = React.useState("");
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
        <label><span>Name <b>*</b></span><input name="name" autoComplete="name" required /></label>
        <label><span>Email <b>*</b></span><input name="email" type="email" autoComplete="email" required /></label>
      </div>
      <div className="ri26-field-grid">
        <label><span>Phone <small>(optional)</small></span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" /></label>
        <label>
          <span>Property city <b>*</b></span>
          <input name="city" list="contact-area-cities" autoComplete="address-level2" required />
          <datalist id="contact-area-cities">{serviceAreas.map((area) => <option value={area.name} key={area.slug} />)}</datalist>
        </label>
      </div>
      <div className="ri26-field-grid">
        <label><span>Company or property <small>(optional)</small></span><input name="company" autoComplete="organization" /></label>
        <div className="ri26-select-field">
          <span id="contact-subject-label">What is this about? <b>*</b></span>
          <SelectField name="subject" options={SUBJECTS} defaultValue={SUBJECTS[0]} required id="contact-subject" labelledBy="contact-subject-label" />
        </div>
      </div>
      <fieldset>
        <legend>Preferred contact method <b>*</b></legend>
        <div className="ri26-choice-row">
          {["Call", "Text", "Email"].map((method) => <label key={method}><input type="radio" name="preferredContact" value={method} required defaultChecked={method === "Email"} /> {method}</label>)}
        </div>
      </fieldset>
      <div className="ri26-field-grid ri26-message-grid">
        <label><span>How can we help? <b>*</b></span><textarea name="message" rows={4} required placeholder="Tell us what you need." /></label>
        <label><span>Anything else? <small>(optional)</small></span><textarea name="details" rows={4} placeholder="Dates, access notes, reference numbers." /></label>
      </div>
      <input className="ri26-hp" name="companyWebsite" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {status === "error" ? <p className="ri26-form-error" role="alert"><AlertCircle aria-hidden /> {message} To reach us now, call <a href={`tel:${tel}`}>{site.phone}</a>.</p> : null}
      <button className="voda-btn primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? <><LoaderCircle className="ri26-spin" aria-hidden /> Sending message…</> : "Send message"}
      </button>
      <p className="ri26-form-note">
        Dealing with an active loss? Call {site.phone} rather than waiting on this form. For anything life-threatening, call 911.
      </p>
    </form>
  );
}
