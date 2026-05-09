import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, reference, verse, reflection } = await req.json();

    if (!email || !reference || !verse) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
    }

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Bible Verse</title>
</head>
<body style="margin:0;padding:0;background:#020617;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:600px;background:#0f172a;border-radius:16px;border:1px solid #1e3a5f;overflow:hidden;">
          <tr>
            <td style="background:#064e3b;padding:24px 32px;text-align:center;">
              <p style="margin:0;color:#6ee7b7;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Bible Verse Generator AI</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:700;">Your Verse Is Here</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 8px;color:#6ee7b7;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Today's Verse</p>
              <p style="margin:0 0 16px;color:#34d399;font-size:20px;font-weight:700;">${reference}</p>
              <p style="margin:0 0 24px;color:#f1f5f9;font-size:18px;line-height:1.7;font-style:italic;border-left:3px solid #10b981;padding-left:16px;">"${verse}"</p>
              <div style="background:#0a1628;border-radius:12px;padding:20px;border:1px solid #1e3a5f;">
                <p style="margin:0;color:#94a3b8;font-size:15px;line-height:1.7;">${reflection}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px;">
              <div style="background:#064e3b;border-radius:12px;padding:24px;text-align:center;border:1px solid #065f46;">
                <p style="margin:0 0 6px;color:#ffffff;font-size:17px;font-weight:700;">Want a prayer to go with this verse?</p>
                <p style="margin:0 0 16px;color:#a7f3d0;font-size:14px;">Save your verses and get personalized prayers on FaithCompanionAI.</p>
                <a href="https://faithcompanionai.com" style="display:inline-block;background:#10b981;color:#000000;padding:12px 28px;border-radius:8px;font-weight:700;font-size:15px;text-decoration:none;">Visit FaithCompanionAI.com →</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px;text-align:center;">
              <p style="margin:0;color:#475569;font-size:13px;">
                Also try: <a href="https://prayergeneratorai.com" style="color:#6ee7b7;">PrayerGeneratorAI.com</a>
                &nbsp;|&nbsp;
                <a href="https://bibleversegeneratorai.com" style="color:#6ee7b7;">BibleVerseGeneratorAI.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const sendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Bible Verse Generator AI <support@faithcompanionai.com>",
        to: [email],
        subject: `Your Bible Verse: ${reference}`,
        html,
      }),
    });

    if (!sendRes.ok) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
