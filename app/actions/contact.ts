"use server";

import { headers } from "next/headers";

import { siteConfig } from "@/content/site";
import { contactSchema, type ContactField, type ContactState } from "@/lib/contact-schema";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recent = new Map<string, number[]>();

/** Best-effort, per-instance limiter. Swap for Upstash/Redis if traffic grows. */
function isRateLimited(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  return hits.length > RATE_LIMIT;
}

export async function sendContactMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const fields = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    projectType: String(formData.get("projectType") ?? ""),
    message: String(formData.get("message") ?? ""),
  } satisfies Record<ContactField, string>;

  // Honeypot: real people never see or fill this field.
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "success", message: "Thanks — your message is on its way." };
  }

  const parsed = contactSchema.safeParse(fields);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField | undefined;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", errors, fields };
  }

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "anonymous";
  if (isRateLimited(ip)) {
    return { status: "error", message: "That's a lot of messages — please try again in a few minutes.", fields };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return {
      status: "error",
      message: `The contact form isn't connected yet — please email ${siteConfig.email} directly.`,
      fields,
    };
  }

  const data = parsed.data;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "—"}`,
    `Project type: ${data.projectType}`,
    "",
    data.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `New enquiry · ${data.projectType} · ${data.name}`,
        text,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Resend responded with ${response.status}: ${await response.text()}`);
    }
  } catch (error) {
    console.error("[contact] failed to send", error);
    return {
      status: "error",
      message: `Something went wrong sending your message. Please email ${siteConfig.email} instead.`,
      fields,
    };
  }

  return { status: "success", message: "Thanks — your message is on its way. I'll be in touch soon." };
}
