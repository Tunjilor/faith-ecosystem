import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Bible Verse Generator AI";
  const description =
    searchParams.get("description") ??
    "Free Christian Bible Verse Generator";

  const fontSize = title.length > 50 ? 38 : title.length > 35 ? 44 : 52;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #020617 0%, #0f172a 60%, #064e3b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #059669, #34d399, #059669)",
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 28,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            color: "#9ca3af",
            textAlign: "center",
            maxWidth: 880,
            lineHeight: 1.5,
          }}
        >
          {description}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: "#34d399",
            }}
          />
          <div style={{ color: "#34d399", fontSize: 22, fontWeight: 600 }}>
            bibleversegeneratorai.com
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
