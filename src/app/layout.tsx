import type { Metadata } from "next"
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
  openGraph: {
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
