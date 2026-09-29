"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { serviceAreas } from "@/lib/service-areas";

type Status = "idle" | "sending" | "success" | "error";

export function RequestServiceForm() {
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
      const response = await fetch("/api/request-service", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "We could not send your request.");
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not send your request.");
    }
  }

  if (status === "success") {
    return (
      <div className="ri26-form-success" role="status">
        <CheckCircle2 aria-hidden />
        <h3>Your request was sent.</h3>
        <p>A RestoreIQ team member will use your preferred contact method. For fastest help, call the 24/7 emergency line.</p>
        <a className="voda-btn primary" href={`tel:${tel}`}><Phone aria-hidden /> {site.cta.call} · {site.phone}</a>
      </div>
    );
  }

  return (
    <form className="ri26-form" onSubmit={submit} aria-label="Request emergency restoration service">
      <div className="ri26-field-grid">
        <label><span>Name <b>*</b></span><input name="name" autoComplete="name" required /></label>
        <label><span>Phone number <b>*</b></span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" required /></label>
      </div>
      <label>
        <span>Property city <b>*</b></span>
        <input name="city" list="service-area-cities" autoComplete="address-level2" required />
        <datalist id="service-area-cities">{serviceAreas.map((area) => <option value={area.name} key={area.slug} />)}</datalist>
      </label>
      <label><span>What happened? <b>*</b></span><textarea name="incident" rows={4} required placeholder="Tell us where the damage is and what you can see." /></label>
      <fieldset>
        <legend>Is water still entering the property? <b>*</b></legend>
        <div className="ri26-choice-row">
          <label><input type="radio" name="waterEntering" value="Yes" required /> Yes</label>
          <label><input type="radio" name="waterEntering" value="No" required /> No</label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Preferred contact method <b>*</b></legend>
        <div className="ri26-choice-row">
          {['Call', 'Text', 'Email'].map((method) => <label key={method}><input type="radio" name="preferredContact" value={method} required /> {method}</label>)}
        </div>
      </fieldset>
      <label><span>Email <small>(needed if you prefer email)</small></span><input name="email" type="email" autoComplete="email" /></label>
      <input className="ri26-hp" name="companyWebsite" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {status === "error" ? <p className="ri26-form-error" role="alert"><AlertCircle aria-hidden /> {message} For immediate help, call <a href={`tel:${tel}`}>{site.phone}</a>.</p> : null}
      <button className="voda-btn primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? <><LoaderCircle className="ri26-spin" aria-hidden /> Sending request…</> : site.cta.request}
      </button>
      <p className="ri26-form-note">This form is for service requests, not life-safety emergencies. Call 911 when anyone is in immediate danger.</p>
    </form>
  );
}
