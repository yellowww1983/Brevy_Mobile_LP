// Progressive-blur stack replicated from appzen.framer.website (read off the
// live DOM): six stacked backdrop-blur layers, each with a stepped mask so the
// blur ramps up smoothly toward the bottom edge, plus an olive colour wash.
const LAYERS = [
  { blur: 0.5, from: 0, to: 20 },
  { blur: 1, from: 15, to: 35 },
  { blur: 2, from: 30, to: 50 },
  { blur: 4, from: 45, to: 65 },
  { blur: 8, from: 60, to: 80 },
  { blur: 16, from: 75, to: 100 },
] as const

export function ProgressiveGlass() {
  return (
    <div className="absolute inset-0">
      {LAYERS.map((l) => {
        const mask = `linear-gradient(to bottom, transparent ${l.from}%, black ${l.to}%)`
        return (
          <div
            key={l.blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${l.blur}px)`,
              WebkitBackdropFilter: `blur(${l.blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        )
      })}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, var(--color-surface-soft), transparent)",
        }}
      />
    </div>
  )
}
