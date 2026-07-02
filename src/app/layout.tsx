import "./globals.css";
import HeaderBg from "@/components/HeaderBg";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

const siteUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL != null
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL != null
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Lova: Local Vault",
  description:
    "Keep your logins, cards, and subscriptions securely organized on your iPhone.",
  openGraph: {
    title: "Lova: Local Vault",
    description:
      "Keep your logins, cards, and subscriptions securely organized on your iPhone.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Lova: Local Vault",
    description:
      "Keep your logins, cards, and subscriptions securely organized on your iPhone.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <div className="relative min-h-screen overflow-x-hidden md:overflow-visible">
          <HeaderBg />
          <div className="layout-container min-h-screen">
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
