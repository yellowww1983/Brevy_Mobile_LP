import { Section, Stack, Reveal } from "@/components/primitives"
import { SectionHeader, VideoPlayer } from "@/components/patterns"
import { video, assets } from "@/lib/content"

export function VideoShowcase() {
  return (
    <Section id="video" rhythm="tight" surface="default" className="scroll-mt-24">
      <Stack size="xl" align="center">
        <Reveal blur>
          <SectionHeader
            title={video.title}
            subtitle={video.subtitle}
            align="center"
            subtitleClassName="max-w-[25.75rem]"
          />
        </Reveal>
        <Reveal blur delay={0.12} className="w-full">
          <VideoPlayer
            label={video.playLabel}
            src={video.src}
            poster={assets.videoPoster}
          />
        </Reveal>
      </Stack>
    </Section>
  )
}
