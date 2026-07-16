import type { Metadata } from "next";
import { brandFaviconDataUri } from "@supernova/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: "SuperNova",
  description: "SuperNova marketing foundation",
  icons: [{ rel: "icon", url: brandFaviconDataUri }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
