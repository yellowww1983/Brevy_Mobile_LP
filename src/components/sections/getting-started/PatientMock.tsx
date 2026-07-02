"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { Icon } from "@/lib/icons"
import { readCssVar } from "@/lib/utils"
import { onboarding } from "@/lib/content"

const Building = Icon.building
const Calendar = Icon.calendar
const CircleCheck = Icon.circleCheck

/**
 * Step 3 mock. On scroll-in the this-week bar fills from `hours` to
 * `hoursTarget` while the number counts up in lockstep (one value drives both,
 * ease-out). Reduced motion jumps straight to the target.
 */
export function PatientMock() {
  const {
    name,
    tag,
    status,
    plan,
    auth,
    weekLabel,
    hours,
    hoursTarget,
    hoursTotal,
  } = onboarding.patient
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })
  const reduce = useReducedMotion()
  const [value, setValue] = useState<number>(hours)

  useEffect(() => {
    if (reduce) {
      setValue(hoursTarget)
      return
    }
    if (!inView) return
    const ms = readCssVar("--step3-fill-ms", 1800)
    let raf = 0
    let start = 0
    const tick = (t: number) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / ms)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(hours + (hoursTarget - hours) * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, hours, hoursTarget])

  const display = Math.round(value)
  const pct = (value / hoursTotal) * 100

  return (
    <div
      ref={ref}
      className="flex min-h-[16.875rem] w-full flex-col justify-between gap-3 rounded-field border border-border-field bg-background p-4 shadow-sm"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <p className="truncate text-lg font-semibold text-foreground">
              {name}
            </p>
            <span className="flex h-6 shrink-0 items-center rounded-field border border-border-field px-1.5 text-small font-semibold text-foreground">
              {tag}
            </span>
          </div>
          <span className="flex h-6 shrink-0 items-center gap-1 rounded-field bg-surface-olive px-1.5 text-small font-semibold text-accent">
            <CircleCheck className="size-4" />
            {status}
          </span>
        </div>

        <div className="flex flex-col gap-2 text-body text-foreground-subtle">
          <span className="flex items-center gap-2">
            <Building className="size-5 shrink-0" />
            {plan}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="size-5 shrink-0" />
            {auth}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1 rounded-field border border-border-field p-2">
        <span className="text-label font-medium uppercase text-foreground-subtle">
          {weekLabel}
        </span>
        <div className="flex items-center gap-3">
          <span className="whitespace-nowrap text-body text-foreground">
            <span className="font-semibold">{display}</span> / {hoursTotal} hours
          </span>
          <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface">
            <span
              className="block h-full rounded-full bg-accent"
              style={{ width: `${pct}%` }}
            />
          </span>
        </div>
      </div>
    </div>
  )
}
