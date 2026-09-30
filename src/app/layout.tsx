import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "leaflet/dist/leaflet.css";

import "./globals.css";
import "./about-story.css";
import "./voda-rebuild.css";
import "./revision-2026.css";

import { site } from "@/lib/site";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Toaster } from "@/components/ui/sonner";

/* Inter is referenced by --font-inter across the stylesheets; load it here so the
   variable weights (640/680/720/750) render instead of snapping to Segoe's cuts. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const seo = {
  title: "24/7 Water Damage Restoration in Ventura County | RestoreIQ",
  description:
    "24/7 water damage restoration in Ventura County. Water extraction, structural drying, moisture detection, fire and smoke restoration from RestoreIQ.",
  image: "/Real-life-images/MSP_7706.jpg",
  socialImage: "/restoreiq-og-social.png",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description: seo.description,
  image: new URL(seo.image, site.url).toString(),
  logo: new URL("/restoreiq-wordmark-blue.png", site.url).toString(),
  telephone: site.phone,
  email: site.email,
  areaServed: site.coverage.areas,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.title,
    template: `%s | ${site.name}`,
  },
  description: seo.description,
  applicationName: site.name,
  keywords: [
    "water damage restoration Ventura County",
    "water extraction Ventura County",
    "structural drying",
    "emergency water cleanup",
    "fire and smoke restoration",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/favicon-circle.svg", type: "image/svg+xml", sizes: "any" }],
    shortcut: "/favicon-circle.svg",
    apple: [{ url: "/RestoreIQ-Logo-circle.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: "/",
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: seo.socialImage,
        width: 1200,
        height: 630,
        alt: "RestoreIQ water damage restoration technician and drying equipment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: seo.socialImage,
        alt: "RestoreIQ water damage restoration technician and drying equipment",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#101724" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c") }}
        />
        <Providers>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="flex-1" id="main-content">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
