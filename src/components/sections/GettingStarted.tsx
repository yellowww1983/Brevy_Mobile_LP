import { Section, Stack, Reveal } from "@/components/primitives"
import { SectionHeader, StepCard } from "@/components/patterns"
import { onboarding } from "@/lib/content"
import { PasskeyMock } from "./getting-started/PasskeyMock"
import { TodosMock } from "./getting-started/TodosMock"
import { PatientMock } from "./getting-started/PatientMock"

const mocks = [PasskeyMock, TodosMock, PatientMock]

export function GettingStarted() {
  return (
    <Section surface="gradient-warm" rhythm="content">
      <Stack size="xl" align="center">
        <Reveal blur>
          <SectionHeader
            chip
            kicker={onboarding.kicker}
            title={onboarding.title}
            subtitle={onboarding.subtitle}
            align="center"
            titleClassName="mx-auto max-w-[27rem] text-wrap"
            subtitleClassName="max-w-[29.25rem]"
          />
        </Reveal>

        <div className="mx-auto grid w-full max-w-[75rem] gap-4 lg:grid-cols-3">
          {onboarding.steps.map((s, i) => {
            const Mock = mocks[i]
            return (
              <Reveal key={s.step} blur delay={i * 0.1} className="h-full">
                <StepCard
                  step={s.step}
                  title={s.title}
                  description={s.description}
                >
                  <Mock />
                </StepCard>
              </Reveal>
            )
          })}
        </div>
      </Stack>
    </Section>
  )
}
