import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_TITLE = "Ven Jean — Product Builder, Web3 Operator, AI Creator";
const SITE_DESCRIPTION =
  "I transform ideas into products, communities, businesses, and AI-powered digital experiences.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    // No dedicated Open Graph image exists yet — "summary" degrades cleanly
    // without one. Switch to "summary_large_image" once a 1200x630 banner
    // is added (see recommendations before sharing this link widely).
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LoadingScreen />
        <LanguageProvider>
          <SmoothScrollProvider>
            <ScrollProgress />
            <CursorGlow />
            <Navbar />
            {children}
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
