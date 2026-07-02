import { Section, Stack, Heading, Text, Action, Reveal } from "@/components/primitives"
import { finalCta } from "@/lib/content"

/**
 * Section #8 "Final CTA". A dark emerald card on the white page: serif headline
 * (olive) + subhead, the join CTA, and a reassurance line naming the platforms.
 * No store buttons — those live in the hero and the sticky band, which fades out
 * as this section enters so the page never shows a duplicate CTA. Reveals on
 * scroll.
 */
export function FinalCta() {
  return (
    <Section id="final-cta" surface="default" rhythm="content">
      <Reveal blur className="w-full">
        <div className="mx-auto flex min-h-[35rem] w-full max-w-[var(--container-max)] flex-col items-center justify-center gap-12 rounded-2xl bg-surface-cta px-6 py-16 text-center">
          <Stack size="md" align="center" className="text-center">
            <Heading level="h2" tone="inverse-muted">
              {finalCta.title[0]}
              <br />
              {finalCta.title[1]}
            </Heading>
            <Text
              variant="editorial"
              tone="inverse"
              className="max-w-[24rem]"
            >
              {finalCta.subhead}
            </Text>
          </Stack>

          <Stack size="sm" align="center" className="text-center">
            <Action variant="join" size="lg" href={finalCta.cta.href}>
              {finalCta.cta.label}
            </Action>
            <p className="max-w-[28rem] text-center text-micro leading-4 text-foreground-inverse opacity-50">
              {finalCta.reassurance.line1}
              <br />
              {finalCta.reassurance.line2}{" "}
              <span className="font-semibold">
                {finalCta.reassurance.platforms[0]}
              </span>
              {" & "}
              <span className="font-semibold">
                {finalCta.reassurance.platforms[1]}
              </span>
            </p>
          </Stack>
        </div>
      </Reveal>
    </Section>
  )
}
