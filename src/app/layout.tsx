import type { Metadata, Viewport } from "next"
import { Rethink_Sans, Hedvig_Letters_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/providers/smooth-scroll"
import { site } from "@/lib/content"
import "./globals.css"

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-rethink-sans",
  display: "swap",
})

const hedvigSerif = Hedvig_Letters_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hedvig-serif",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    // og:image / twitter:image are auto-generated from app/opengraph-image.tsx
    // (Next file convention) — do not set `images` here or it duplicates them.
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
}

// Next 15: themeColor / colorScheme live on `viewport`, not `metadata`
// (a warning fires if they're on metadata). Light-only landing; the theme
// colour matches the dark-green announcement banner at the top of the page.
export const viewport: Viewport = {
  themeColor: "#023620", // --brevy-green-deep
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${rethinkSans.variable} ${hedvigSerif.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
