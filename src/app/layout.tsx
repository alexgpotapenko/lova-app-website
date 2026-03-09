import "./globals.css";
import HeaderBg from "@/components/HeaderBg";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lova App",
  description: "Next.js App Router with Tailwind CSS",
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
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@600;700&family=Inter:wght@400;500;600;700&display=swap"
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
      </body>
    </html>
  );
}
