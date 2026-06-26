import { ImageResponse } from "next/og"
import { site } from "@/lib/content"

export const alt = site.title
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Hex is intentional here: the OG generator runs outside the token
// system and is excluded from the component palette check.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background: "#012716",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 40, color: "#d7e4c9", marginBottom: 24 }}>
          {site.name}
        </div>
        <div style={{ fontSize: 84, lineHeight: 1.05, maxWidth: 900 }}>
          Your caregiver super app.
        </div>
        <div style={{ fontSize: 32, color: "#b8c7aa", marginTop: 32 }}>
          Everything about your patient&apos;s care in one place.
        </div>
      </div>
    ),
    size,
  )
}
