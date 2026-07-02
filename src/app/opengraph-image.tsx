import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Lova: Local Vault";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [inter, logo] = await Promise.all([
    fetch(
      "https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap",
    ).then((res) => res.text()),
    readFile(join(process.cwd(), "public/logo.svg")),
  ]);

  const interUrl = inter.match(/src: url\((.+?)\) format/)?.[1];

  if (!interUrl) {
    throw new Error("Failed to load fonts for Open Graph image");
  }

  const interData = await fetch(interUrl).then((res) => res.arrayBuffer());

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
        }}
      >
        <img
          src={`data:image/svg+xml;base64,${logo.toString("base64")}`}
          alt=""
          width={320}
          height={98}
          style={{ marginBottom: 36 }}
        />

        <div
          style={{
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
          name: "Inter",
          data: interData,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
