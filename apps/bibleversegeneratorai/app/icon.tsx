import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#020617",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            color: "#34d399",
            fontSize: 22,
            fontWeight: "bold",
            fontFamily: "sans-serif",
          }}
        >
          B
        </div>
      </div>
    ),
    { ...size }
  );
}
