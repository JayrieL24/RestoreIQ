import { NextResponse } from "next/server";

/**
 * General enquiries from the contact page. Deliberately separate from
 * /api/request-service: that route is an emergency job request and asks
 * whether water is still entering; this one is for billing, insurance,
 * scheduling and anything else that is not an active loss.
 */
const required = ["name", "email", "city", "subject", "preferredContact", "message"] as const;

function text(value: unknown) { return typeof value === "string" ? value.trim() : "" }

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown> } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill every field, people never see this one.
  if (text(body.companyWebsite)) return NextResponse.json({ ok: true });

  const missing = required.filter((key) => !text(body[key]));
  if (missing.length) return NextResponse.json({ message: "Please complete every required field." }, { status: 400 });

  const email = text(body.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  const webhook = process.env.RESTOREIQ_LEAD_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ message: "Online messages are not connected yet." }, { status: 503 });
  }

  // A phone number is required when the reply should come by call or text.
  const preferredContact = text(body.preferredContact);
  if ((preferredContact === "Call" || preferredContact === "Text") && !text(body.phone)) {
    return NextResponse.json({ message: "Add a phone number when you prefer a call or text." }, { status: 400 });
  }

  const enquiry = {
    type: "contact-enquiry",
    submittedAt: new Date().toISOString(),
    name: text(body.name).slice(0, 120),
    email: email.slice(0, 180),
    phone: text(body.phone).slice(0, 60),
    city: text(body.city).slice(0, 120),
    company: text(body.company).slice(0, 160),
    subject: text(body.subject).slice(0, 120),
    preferredContact,
    message: text(body.message).slice(0, 4000),
    details: text(body.details).slice(0, 4000),
  };

  try {
    const response = await fetch(webhook, {
      method: "POST", headers: {
        "content-type": "application/json",
        ...(process.env.RESTOREIQ_LEAD_WEBHOOK_TOKEN ? { authorization: `Bearer ${process.env.RESTOREIQ_LEAD_WEBHOOK_TOKEN}` } : {}),
      }, body: JSON.stringify(enquiry), cache: "no-store",
    });
    if (!response.ok) throw new Error(`Message destination returned ${response.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("RestoreIQ contact delivery failed", error);
    return NextResponse.json({ message: "The message could not be delivered." }, { status: 502 });
  }
}
