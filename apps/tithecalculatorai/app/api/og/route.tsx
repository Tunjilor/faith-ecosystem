import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Tithe Calculator AI";
  const description =
    searchParams.get("description") ??
    "Calculate Your Tithe Instantly — Free Christian Giving Tool";

  const fontSize = title.length > 50 ? 38 : title.length > 35 ? 44 : 52;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #020617 0%, #0f172a 60%, #1c1007 100%)",
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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #d97706, #fbbf24, #d97706)",
          }}
        />
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
        <div
          style={{
            position: "absolute",
            bottom: 44,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 5, background: "#fbbf24" }} />
          <div style={{ color: "#fbbf24", fontSize: 22, fontWeight: 600 }}>
            tithecalculatorai.com
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
