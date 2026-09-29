import { NextResponse } from "next/server";

const required = ["name", "phone", "city", "incident", "waterEntering", "preferredContact"] as const;

function text(value: unknown) { return typeof value === "string" ? value.trim() : "" }

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown> } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (text(body.companyWebsite)) return NextResponse.json({ ok: true });
  const missing = required.filter((key) => !text(body[key]));
  if (missing.length) return NextResponse.json({ message: "Please complete every required field." }, { status: 400 });
  if (text(body.preferredContact) === "Email" && !text(body.email)) {
    return NextResponse.json({ message: "Add an email address when email is your preferred contact method." }, { status: 400 });
  }

  const webhook = process.env.RESTOREIQ_LEAD_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ message: "Online requests are not connected yet." }, { status: 503 });
  }

  const lead = {
    type: "emergency-service-request",
    submittedAt: new Date().toISOString(),
    name: text(body.name).slice(0, 120), phone: text(body.phone).slice(0, 60), email: text(body.email).slice(0, 180),
    city: text(body.city).slice(0, 120), incident: text(body.incident).slice(0, 2000),
    waterEntering: text(body.waterEntering), preferredContact: text(body.preferredContact),
  };

  try {
    const response = await fetch(webhook, {
      method: "POST", headers: {
        "content-type": "application/json",
        ...(process.env.RESTOREIQ_LEAD_WEBHOOK_TOKEN ? { authorization: `Bearer ${process.env.RESTOREIQ_LEAD_WEBHOOK_TOKEN}` } : {}),
      }, body: JSON.stringify(lead), cache: "no-store",
    });
    if (!response.ok) throw new Error(`Lead destination returned ${response.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("RestoreIQ lead delivery failed", error);
    return NextResponse.json({ message: "The request could not be delivered." }, { status: 502 });
  }
}
