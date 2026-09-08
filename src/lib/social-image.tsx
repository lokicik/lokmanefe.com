import { ImageResponse } from "next/og";
import { ParrotIcon } from "@/components/parrot-icon";
import { hero } from "@/lib/home-content";
import { site } from "@/lib/seo";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageAlt = `${site.fullName} (${site.name}), ${site.jobTitle}`;

export function createSocialImage(rawTitle: string = site.name) {
  const normalizedTitle = rawTitle.trim().replace(/\s+/g, " ") || site.name;
  const title = normalizedTitle.length > 180
    ? `${normalizedTitle.slice(0, 177).trimEnd()}…`
    : normalizedTitle;
  const isProfile = title === site.name;
  const titleSize = title.length > 100 ? 44 : title.length > 60 ? 54 : 72;
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
            width: 1040,
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
            {isProfile ? "SOFTWARE ENGINEER" : site.fullName.toUpperCase()}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: isProfile ? 82 : titleSize,
              lineHeight: 1.12,
              fontWeight: 700,
              letterSpacing: isProfile ? -3 : -1,
              wordBreak: "break-word",
            }}
          >
            {title}
          </div>

          <div
            style={{
              width: 940,
              display: "flex",
              marginTop: 28,
              color: "#c8d3d0",
              fontSize: isProfile ? 28 : 24,
              lineHeight: 1.25,
              fontWeight: 400,
            }}
          >
            {isProfile ? `${site.fullName}. ${hero.tagline}` : site.name}
          </div>
        </div>
      </div>
    ),
    {
      ...socialImageSize,
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    }
  );
}
