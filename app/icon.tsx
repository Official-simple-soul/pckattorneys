import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const settings = SITE;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.accentColor})`,
          color: "#fff",
          fontFamily: "sans-serif",
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: -0.5,
        }}
      >
        {settings.logoText.slice(0, 3).toUpperCase()}
      </div>
    ),
    { ...size }
  );
}
