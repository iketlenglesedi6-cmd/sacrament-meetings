import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #f8f5ed 0%, #e9efe3 100%)",
          color: "#304a2c",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#a26945",
              fontWeight: 800,
            }}
          >
            Cedar Ridge Ward
          </div>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#5a6349",
              fontWeight: 700,
            }}
          >
            Planner
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 102, fontWeight: 700, lineHeight: 0.95 }}>Sacrament Meeting</div>
          <div style={{ fontSize: 58, color: "#5a6349", fontWeight: 600 }}>Programs, hymns, and speakers</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#304a2c" }}>
          <div style={{ width: 220, height: 2, background: "#a26945" }} />
          <div style={{ fontWeight: 700 }}>Sunday Worship</div>
        </div>
      </div>
    ),
    size,
  );
}
