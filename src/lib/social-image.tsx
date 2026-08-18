import { ImageResponse } from "next/og";
import { ParrotIcon } from "@/components/parrot-icon";
import { hero } from "@/lib/home-content";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageAlt = `Lokman Efe, Software Engineer — ${hero.tagline}`;

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#09100f",
          color: "#f1f5f4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 20,
            display: "flex",
            border: "1px solid #22332f",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: -108,
            top: 68,
            display: "flex",
            color: "#87aaa2",
            opacity: 0.14,
            transform: "rotate(-7deg)",
          }}
        >
          <ParrotIcon size={470} />
        </div>

        <div
          style={{
            position: "absolute",
            top: 54,
            left: 64,
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#a9c2bc",
          }}
        >
          <ParrotIcon size={42} />
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: 3,
            }}
          >
            LOKMANEFE.COM
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            left: 66,
            top: 156,
            width: 790,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 22,
              color: "#8fb1aa",
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: 4,
            }}
          >
            <span
              style={{
                width: 48,
                height: 3,
                display: "flex",
                background: "#8fb1aa",
              }}
            />
            SOFTWARE ENGINEER
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 82,
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: -3,
            }}
          >
            Lokman Efe
          </div>

          <div
            style={{
              width: 760,
              display: "flex",
              marginTop: 28,
              color: "#c8d3d0",
              fontSize: 30,
              lineHeight: 1.25,
              fontWeight: 400,
            }}
          >
            {hero.tagline}
          </div>
        </div>
      </div>
    ),
    socialImageSize
  );
}
