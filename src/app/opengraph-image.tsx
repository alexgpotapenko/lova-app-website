import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Lova: Local Vault";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [instrumentSerif, inter, appIcon] = await Promise.all([
    fetch(
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap",
    ).then((res) => res.text()),
    fetch(
      "https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap",
    ).then((res) => res.text()),
    readFile(join(process.cwd(), "public/app-icon.png")),
  ]);

  const instrumentSerifUrl = instrumentSerif.match(
    /src: url\((.+?)\) format/,
  )?.[1];
  const interUrl = inter.match(/src: url\((.+?)\) format/)?.[1];

  if (!instrumentSerifUrl || !interUrl) {
    throw new Error("Failed to load fonts for Open Graph image");
  }

  const [instrumentSerifData, interData] = await Promise.all([
    fetch(instrumentSerifUrl).then((res) => res.arrayBuffer()),
    fetch(interUrl).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f2f2f6",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "#206de5",
            opacity: 0.12,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            right: -100,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "#25b165",
            opacity: 0.1,
          }}
        />

        <img
          src={`data:image/png;base64,${appIcon.toString("base64")}`}
          alt=""
          width={120}
          height={120}
          style={{ marginBottom: 32 }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 72,
            color: "#111111",
            fontFamily: "Instrument Serif",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          <span>Your </span>
          <span style={{ fontStyle: "italic" }}>lo</span>
          <span>cal </span>
          <span style={{ fontStyle: "italic" }}>va</span>
          <span>ult</span>
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 30,
            color: "#4b5563",
            fontFamily: "Inter",
            fontWeight: 500,
            textAlign: "center",
            maxWidth: 760,
            lineHeight: 1.35,
          }}
        >
          Keep your logins, cards, and subscriptions securely organized on your
          iPhone.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: instrumentSerifData,
          style: "normal",
          weight: 400,
        },
        {
          name: "Instrument Serif",
          data: instrumentSerifData,
          style: "italic",
          weight: 400,
        },
        {
          name: "Inter",
          data: interData,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
