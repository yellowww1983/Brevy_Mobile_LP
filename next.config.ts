import type { NextConfig } from "next"

/**
 * Content-Security-Policy — built against the app's actual sources (see the SEC
 * mapping). `'unsafe-inline'` is required for both script and style in a static
 * Next app: script for the framework's inline hydration bootstrap, style for the
 * ~144 SSR inline style attributes framer/Reveal emit. Avoiding it would need a
 * per-request nonce + middleware, which forces dynamic rendering and loses the
 * static SSG — not worth it for a static, no-user-input landing page. Everything
 * else stays tight (frame-ancestors 'none', object-src 'none', scoped domains).
 *
 * Vercel Analytics: script served same-origin on Vercel with a va.vercel-scripts.com
 * fallback; beacons post to vitals.vercel-insights.com.
 *
 * Applied in production only — `next dev` needs 'unsafe-eval' + a ws: connection
 * for HMR, so this CSP would break the dev server.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self' https://vitals.vercel-insights.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ")

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    const headers = [
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ]
    if (process.env.NODE_ENV === "production") {
      headers.unshift({ key: "Content-Security-Policy", value: csp })
    }
    return [{ source: "/:path*", headers }]
  },
}

export default nextConfig
