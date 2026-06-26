import { Stack, Action } from "@/components/primitives"
import { Icon, type IconName } from "@/lib/icons"

type StoreButton = {
  icon: IconName
  label: string
  href: string
}

type StoreButtonsProps = {
  buttons: readonly StoreButton[]
  variant?: "store" | "secondary"
  align?: "start" | "center"
}

/** iOS / Android download row. Hero uses the leaf-corner `store` variant. */
export function StoreButtons({
  buttons,
  variant = "store",
  align = "start",
}: StoreButtonsProps) {
  return (
    <Stack
      direction="row"
      size="sm"
      wrap
      className={align === "center" ? "justify-center" : undefined}
    >
      {buttons.map((button) => {
        const IconCmp = Icon[button.icon]
        return (
          <Action key={button.label} variant={variant} size="lg" href={button.href}>
            <IconCmp className="size-6" />
            {button.label}
          </Action>
        )
      })}
    </Stack>
  )
}
