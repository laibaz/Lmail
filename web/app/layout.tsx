import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Cta";

export const metadata: Metadata = {
  title: "LMAIL: email marketing that writes with you",
  description:
    "LMAIL helps you write, send and grow with email. AI-assisted writing, smart segments and a sending reputation that is yours alone. By Laib Studios.",
  metadataBase: new URL("https://lmail.laibstudios.com"),
  openGraph: {
    title: "LMAIL: email marketing that writes with you",
    description: "Write, send and grow with email. By Laib Studios.",
    url: "https://lmail.laibstudios.com",
    siteName: "LMAIL",
    type: "website",
    images: ["/app-home.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
