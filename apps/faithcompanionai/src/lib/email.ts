// src/lib/email.ts
import { parseDevotional } from "@/lib/devotional-format";

export type DevotionalEmailPayload = {
  to: string;
  subject: string;
  contentType: "verse" | "devotional" | "prayer";
  contentText: string;
  unsubscribeUrl: string;
  /** "lead" = email-only signup with no account, so no dashboard links. */
  audience?: "user" | "lead";
};

export async function sendDevotionalEmail(opts: DevotionalEmailPayload) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.EMAIL_FROM || "Faith Companion AI <noreply@faithcompanionai.com>";

  const label =
    opts.contentType === "verse"
      ? "Today&rsquo;s Verse"
      : opts.contentType === "devotional"
      ? "Today&rsquo;s Devotional"
      : "Today&rsquo;s Prayer";

  const accentColor =
    opts.contentType === "verse"
      ? "#7c3aed"
      : opts.contentType === "devotional"
      ? "#f97316"
      : "#10b981";

  const para = (text: string, extra = "") =>
    `<p style="margin:0 0 14px;color:#1a1a1a;font-size:15px;line-height:1.7;${extra}">${escapeHtml(text).replace(/\n/g, "<br/>")}</p>`;

  // Structured devotional: verse block on its own, then reflection and the
  // closing line. Falls back to line-by-line rendering for free-form text.
  const parts = parseDevotional(opts.contentText);
  const contentHtml = parts
    ? `<div style="border-left:4px solid ${accentColor};padding:4px 0 4px 18px;margin-bottom:24px;">
                <p style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-size:19px;line-height:1.55;font-style:italic;color:#1a1a1a;">&ldquo;${escapeHtml(parts.verse)}&rdquo;</p>
                <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:.5px;color:${accentColor};">${escapeHtml(parts.reference)}</p>
              </div>
              ${para(parts.reflection)}
              ${parts.encouragement ? para(parts.encouragement, "font-weight:700;margin-bottom:24px;") : ""}`
    : `<div style="border-left:4px solid ${accentColor};padding-left:16px;margin-bottom:24px;">
                ${opts.contentText
                  .split("\n")
                  .filter((line) => line.trim())
                  .map((line) => para(line))
                  .join("")}
              </div>`;

  const isLead = opts.audience === "lead";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${opts.subject}</title>
</head>
<body style="margin:0;padding:0;background:#f4f0ff;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f0ff;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#f97316);border-radius:20px 20px 0 0;padding:32px 36px;">
              <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,.7);">
                Faith Companion AI
              </div>
              <div style="font-size:26px;font-weight:800;color:#fff;margin-top:8px;line-height:1.3;">
                ${label}
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#fff;padding:36px 36px 28px;border-left:1px solid #e9e0ff;border-right:1px solid #e9e0ff;">
              ${contentHtml}
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(to right,#7c3aed,#f97316);border-radius:999px;padding:1px;">
                    <a href="https://faithcompanionai.com/tools/prayer"
                       style="display:inline-block;padding:12px 28px;background:linear-gradient(to right,#7c3aed,#f97316);color:#fff;text-decoration:none;border-radius:999px;font-size:14px;font-weight:700;">
                      Get a prayer for your day &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;padding-top:18px;border-top:1px solid #eee;font-size:14px;line-height:1.6;color:#555;">
                Know someone who&rsquo;d be encouraged by this? Forward this email, or invite them to
                <a href="https://faithcompanionai.com" style="color:#7c3aed;font-weight:700;text-decoration:none;">faithcompanionai.com</a>
                for their own free daily devotional.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f5ff;border:1px solid #e9e0ff;border-top:none;border-radius:0 0 20px 20px;padding:20px 36px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:#888;">
                You&rsquo;re receiving this because you opted in to daily devotional emails.
              </p>
              <p style="margin:0;font-size:12px;">
                <a href="${opts.unsubscribeUrl}" style="color:#7c3aed;text-decoration:underline;">
                  Unsubscribe
                </a>${
                  isLead
                    ? ""
                    : `
                &nbsp;&middot;&nbsp;
                <a href="https://faithcompanionai.com/dashboard" style="color:#7c3aed;text-decoration:underline;">
                  Manage preferences
                </a>`
                }
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const plainText = [
    parts
      ? `"${parts.verse}"\n${parts.reference}\n\n${parts.reflection}${parts.encouragement ? `\n\n${parts.encouragement}` : ""}`
      : opts.contentText,
    "",
    "Get a prayer for your day: https://faithcompanionai.com/tools/prayer",
    "",
    "Know someone who'd be encouraged by this? Forward this email, or invite them to https://faithcompanionai.com for their own free daily devotional.",
    "",
    `Unsubscribe: ${opts.unsubscribeUrl}`,
  ].join("\n");

  if (!resendApiKey) {
    console.log(`[DevotionalEmail - DEV] To: ${opts.to} | Subject: ${opts.subject}`);
    return { ok: true, provider: "dev-console" as const };
  }

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [opts.to],
      subject: opts.subject,
      html,
      text: plainText,
      headers: { "List-Unsubscribe": `<${opts.unsubscribeUrl}>` },
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Failed to send devotional email: ${text}`);
  }

  return { ok: true, provider: "resend" as const };
}

export async function sendPasswordResetEmail(opts: {
  to: string;
  resetLink: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.EMAIL_FROM || "Faith Companion AI <noreply@faithcompanionai.com>";

  if (!resendApiKey) {
    console.log("\n[Password Reset Email - DEV FALLBACK]");
    console.log(`To: ${opts.to}`);
    console.log(`Link: ${opts.resetLink}\n`);
    return { ok: true, provider: "dev-console" as const };
  }

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [opts.to],
      subject: "Reset your Faith Companion AI password",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>Reset your password</h2>
          <p>Click the button below to set a new password for your Faith Companion AI account:</p>
          <p>
            <a href="${opts.resetLink}" style="display:inline-block;padding:12px 20px;background:linear-gradient(to right,#7c3aed,#f97316);color:#fff;text-decoration:none;border-radius:999px;font-weight:700;">
              Set new password
            </a>
          </p>
          <p>If the button does not work, copy and paste this link into your browser:</p>
          <p style="word-break:break-all;">${opts.resetLink}</p>
          <p>This link expires in 20 minutes. If you did not request a password reset, you can ignore this email.</p>
        </div>
      `,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Failed to send password reset email: ${text}`);
  }

  return { ok: true, provider: "resend" as const };
}

export async function sendMagicLinkEmail(opts: {
  to: string;
  magicLink: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.EMAIL_FROM || "Faith Companion AI <noreply@faithcompanionai.com>";

  if (!resendApiKey) {
    console.log("\n[Magic Link Email - DEV FALLBACK]");
    console.log(`To: ${opts.to}`);
    console.log(`Link: ${opts.magicLink}\n`);
    return { ok: true, provider: "dev-console" as const };
  }

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [opts.to],
      subject: "Your Faith Companion AI sign-in link",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>Sign in to Faith Companion AI</h2>
          <p>Click the button below to securely sign in:</p>
          <p>
            <a href="${opts.magicLink}" style="display:inline-block;padding:12px 20px;background:#111;color:#fff;text-decoration:none;border-radius:999px;">
              Sign in
            </a>
          </p>
          <p>If the button does not work, copy and paste this link into your browser:</p>
          <p style="word-break:break-all;">${opts.magicLink}</p>
          <p>This link will expire soon for your security.</p>
        </div>
      `,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Failed to send email: ${text}`);
  }

  return { ok: true, provider: "resend" as const };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Recipient for contact-form messages. Preview deployments are locked to Resend's
 * test address (which accepts and discards mail) — Preview shares the production
 * Resend key, so no env setting can route a Preview submission to a real inbox.
 * Elsewhere CONTACT_TO_EMAIL wins when set; otherwise only Production delivers to
 * the real support inbox and local development uses the test address.
 */
export function contactRecipient() {
  if (process.env.VERCEL_ENV === "preview") return "delivered@resend.dev";
  const override = process.env.CONTACT_TO_EMAIL?.trim();
  if (override) return override;
  return process.env.VERCEL_ENV === "production"
    ? "support@faithcompanionai.com"
    : "delivered@resend.dev";
}

export type ContactEmailPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactEmailResult =
  | { ok: true; provider: "resend"; id: string }
  | { ok: true; provider: "dev-console" }
  | { ok: false; reason: "not_configured" | "provider_error" };

// Returns ok only once Resend has accepted the message (2xx with an id).
// Never logs the message body or the sender's address.
export async function sendContactEmail(opts: ContactEmailPayload): Promise<ContactEmailResult> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.EMAIL_FROM || "Faith Companion AI <noreply@faithcompanionai.com>";
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!resendApiKey) {
    // Production must never report success without a real send.
    if (isProduction) return { ok: false, reason: "not_configured" };
    console.log(`[ContactEmail - DEV] subject chars: ${opts.subject.length} | message chars: ${opts.message.length}`);
    return { ok: true, provider: "dev-console" };
  }

  const subject = `${isProduction ? "" : "[Preview] "}[Contact] ${opts.subject}`;
  const text = [
    `Name: ${opts.name}`,
    `Email: ${opts.email}`,
    `Subject: ${opts.subject}`,
    "",
    opts.message,
    "",
    "— Sent from the faithcompanionai.com contact form. Reply to this email to respond.",
  ].join("\n");

  const messageHtml = escapeHtml(opts.message).replace(/\r?\n/g, "<br/>");
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin:0 0 12px;">New contact form message</h2>
      <p style="margin:0;"><strong>Name:</strong> ${escapeHtml(opts.name)}</p>
      <p style="margin:0;"><strong>Email:</strong> ${escapeHtml(opts.email)}</p>
      <p style="margin:0 0 16px;"><strong>Subject:</strong> ${escapeHtml(opts.subject)}</p>
      <div style="border-left:4px solid #7c3aed;padding-left:12px;">${messageHtml}</div>
      <p style="margin-top:20px;font-size:12px;color:#888;">Sent from the faithcompanionai.com contact form. Reply to this email to respond.</p>
    </div>
  `;

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [contactRecipient()],
        reply_to: opts.email,
        subject,
        text,
        html,
      }),
    });

    const data = (await resp.json().catch(() => null)) as { id?: string } | null;
    if (!resp.ok || !data?.id) {
      console.error(`[ContactEmail] Resend rejected the message (status ${resp.status})`);
      return { ok: false, reason: "provider_error" };
    }
    return { ok: true, provider: "resend", id: data.id };
  } catch {
    console.error("[ContactEmail] Resend request failed");
    return { ok: false, reason: "provider_error" };
  }
}
