import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SITE_CONFIG } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const viewport: Viewport = {
  themeColor: "#0E0E12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s · ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  keywords: [
    "VLC Reimagined",
    "VLC media player fork",
    "Windows media player",
    "dark mode VLC",
    "modern VLC interface",
    "HEVC AV1 MKV player Windows",
    "open source media player",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_CONFIG.domain,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png", sizes: "1024x1024" },
    ],
    apple: [{ url: "/logo.png", sizes: "1024x1024", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-[#0E0E12] font-sans text-[#F5F5F7] antialiased selection:bg-[#FF8800]/25 selection:text-[#F5F5F7]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-[#FF8800] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#0E0E12]"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
