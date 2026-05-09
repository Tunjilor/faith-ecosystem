import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function emailHtml(prayer: string, topic: string): string {
  const prayerHtml = prayer.replace(/\n/g, "<br>");
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#020617;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0f172a;border-radius:16px;padding:40px;border:1px solid #1e293b;">
        <tr><td>
          <p style="margin:0 0 8px;font-size:13px;color:#64748b;letter-spacing:0.05em;text-transform:uppercase;">Your Prayer</p>
          <h1 style="margin:0 0 28px;font-size:22px;color:#34d399;font-weight:700;">${topic}</h1>
          <p style="margin:0 0 32px;font-size:17px;line-height:2;color:#cbd5e1;">${prayerHtml}</p>
          <hr style="border:none;border-top:1px solid #1e293b;margin:0 0 28px;" />
          <p style="margin:0 0 16px;font-size:15px;color:#94a3b8;line-height:1.7;">
            Want a Bible verse and devotional to go with this prayer?
          </p>
          <a href="https://faithcompanionai.com/?from=prayergeneratorai-email"
             style="display:inline-block;background:#10b981;color:#020617;font-size:15px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;">
            Continue Your Faith Journey on FaithCompanionAI →
          </a>
          <p style="margin:28px 0 0;font-size:12px;color:#334155;">
            Sent from <a href="https://prayergeneratorai.com" style="color:#475569;text-decoration:none;">PrayerGeneratorAI.com</a>
            &nbsp;·&nbsp; Free Christian AI Prayer Generator
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ fallback: true }, { status: 503 });
  }

  try {
    const body = await req.json();
    const email = String(body?.email || "").trim();
    const prayer = String(body?.prayer || "").trim();
    const topic = String(body?.topic || "your request").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!prayer) {
      return NextResponse.json({ error: "No prayer to send." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const tasks: Promise<unknown>[] = [
      resend.emails.send({
        from: "Prayer Generator AI <support@faithcompanionai.com>",
        to: [email],
        subject: `Your prayer for ${topic}`,
        html: emailHtml(prayer, topic),
      }),
    ];

    if (process.env.RESEND_AUDIENCE_ID) {
      tasks.push(
        resend.contacts.create({
          audienceId: process.env.RESEND_AUDIENCE_ID,
          email,
          unsubscribed: false,
        })
      );
    }

    const [emailResult] = await Promise.allSettled(tasks);

    if (emailResult.status === "rejected") {
      throw emailResult.reason;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
