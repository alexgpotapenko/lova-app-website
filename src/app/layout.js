import { DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Poleno Dashboard",
  description: "Poleno Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={`${dmSans.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
