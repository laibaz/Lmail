import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";

export const metadata: Metadata = {
  title: "LMAIL — AI-powered email marketing by Laib Studios",
  description:
    "LMAIL helps you write, send and grow with email. AI-written campaigns, smart segments and a sending reputation that is yours alone.",
  metadataBase: new URL("https://lmail.laibstudios.com"),
  openGraph: {
    title: "LMAIL — AI-powered email marketing",
    description: "Write, send and grow with email. By Laib Studios.",
    url: "https://lmail.laibstudios.com",
    siteName: "LMAIL",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
