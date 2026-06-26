import { Header } from "@/components/header/Header"
import {
  Hero,
  VideoShowcase,
  CareComparison,
  GettingStarted,
  SuperApp,
  StickyCta,
} from "@/components/sections"

export default function HomePage() {
  return (
    <>
      <Header />
      {/* Bottom space so the sticky band never covers the last section. */}
      <main className="pb-8">
        <Hero />
        <VideoShowcase />
        <CareComparison />
        <GettingStarted />
        <SuperApp />
      </main>
      <StickyCta />
    </>
  )
}
