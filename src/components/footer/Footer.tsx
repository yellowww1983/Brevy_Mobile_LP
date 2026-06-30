import { Reveal } from "@/components/primitives"
import { footer } from "@/lib/content"

/**
 * Page footer (Figma 25109:1719): a light legal bar that closes the page — a
 * hairline divider over the copyright line (left) and the Privacy / Terms links
 * (right). Stacks vertically on mobile. Reveals softly on scroll.
 */
export function Footer() {
  return (
    <footer className="bg-background">
      <div className="section-gutter mx-auto w-full max-w-[var(--container-max)] pb-6">
        <Reveal>
          <div className="flex flex-col gap-6">
            <div aria-hidden className="h-px w-full bg-divider" />
            <div className="flex flex-col gap-2 text-body text-foreground-muted sm:flex-row sm:items-center sm:gap-6">
              <p className="sm:flex-1">{footer.copyright}</p>
              {footer.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="whitespace-nowrap transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
