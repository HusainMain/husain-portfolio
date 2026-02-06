import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 20% 20%, #1e293b, transparent 40%), radial-gradient(circle at 80% 80%, #3b0764, transparent 40%), #0b1020",
          fontSize: 64,
          color: "white",
          letterSpacing: -1,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 40,
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, color: "#c084fc" }}>Portfolio</div>
          <div style={{ fontWeight: 800 }}>Husai</div>
          <div style={{ fontSize: 28, color: "#93c5fd", marginTop: 12 }}>
            Computer Engineering Student
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
