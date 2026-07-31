import Link from "next/link"
import { ArrowRight, Users, Zap, Shapes } from "lucide-react"
import { DrawingCanvas } from "@/components/landing/DrawingCanvas"
import { BentoFeatures } from "@/components/landing/BentoFeatures"

const demoEnabled = process.env.NEXT_PUBLIC_ENABLE_LIVE_DEMO !== "false"

function Logo({ size = 22 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
        <path
          d="M4 18 C4 18 8 10 11 8 C14 6 18 10 18 14"
          stroke="#6366f1" strokeWidth="2.2" strokeLinecap="round" fill="none"
          strokeDasharray="50" strokeDashoffset="50"
        >
          <animate attributeName="stroke-dashoffset" from="50" to="0" dur="1.2s" fill="freeze"
            calcMode="spline" keySplines="0.4 0 0.2 1" />
        </path>
        <path
          d="M7 15 C7 15 9 12 11 11 C13 10 15 12 15 14"
          stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" fill="none"
          strokeDasharray="40" strokeDashoffset="40"
        >
          <animate attributeName="stroke-dashoffset" from="40" to="0" dur="1s" begin="0.4s" fill="freeze"
            calcMode="spline" keySplines="0.4 0 0.2 1" />
        </path>
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-foreground">Sketchable</span>
    </div>
  )
}

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/20">

      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Logo />

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            <Link href="#features" className="transition hover:text-foreground">Features</Link>
            <Link href="#how-it-works" className="transition hover:text-foreground">How it works</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="rounded-lg px-3.5 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              Get started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pb-24 pt-28">
        {/* Dot grid — light mode */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 dark:hidden"
          style={{
            backgroundImage: "radial-gradient(circle, #818cf8 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.18,
          }}
        />
        {/* Dot grid — dark mode */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.05,
          }}
        />
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/4 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 65%)" }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-300/50 bg-indigo-50 dark:border-indigo-500/25 dark:bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-500" />
            </span>
            Real-time multiplayer whiteboard
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-[5.25rem] lg:leading-[1.07]">
            Draw together,{" "}
            <br className="hidden sm:block" />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #a78bfa 0%, #6366f1 45%, #38bdf8 100%)" }}
            >
              in real time.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Sketchable is a minimal multiplayer whiteboard. Open a room, share a link,
            and your whole team is drawing together&nbsp;— instantly.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500 hover:shadow-indigo-500/35"
            >
              Start drawing free <ArrowRight className="h-4 w-4" />
            </Link>
            {demoEnabled ? (
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-medium text-muted-foreground shadow-sm transition hover:border-foreground/20 hover:text-foreground"
              >
                Try live demo
              </Link>
            ) : (
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-medium text-muted-foreground shadow-sm transition hover:border-foreground/20 hover:text-foreground"
              >
                Open dashboard
              </Link>
            )}
          </div>

          <p className="mt-5 text-xs text-muted-foreground/60">
            No credit card required&ensp;·&ensp;Free to use
          </p>
        </div>

        {/* Canvas mockup */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          <div
            className="pointer-events-none absolute inset-0 -z-10 scale-[0.92] rounded-3xl opacity-25 blur-3xl dark:opacity-40"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.6), rgba(167,139,250,0.5), rgba(56,189,248,0.3))" }}
          />
          <div className="overflow-hidden rounded-2xl border border-border bg-[#12141c] shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_100px_rgba(0,0,0,0.5)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-[#12141c] px-4 py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <div className="ml-auto flex items-center gap-2 rounded-md border border-white/[0.07] bg-[#0d0e14] px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400/60" />
                <span className="font-mono text-[10px] text-white/25">sketchable.app/room/team-flow</span>
              </div>
            </div>
            <DrawingCanvas />
          </div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <div className="border-y border-border">
        <div className="mx-auto grid max-w-3xl grid-cols-3 divide-x divide-border">
          {[
            { value: "< 50ms", label: "sync latency" },
            { value: "∞",      label: "shapes per canvas" },
            { value: "0",      label: "setup required" },
          ].map(({ value, label }) => (
            <div key={label} className="px-8 py-8 text-center">
              <div className="text-2xl font-bold tracking-tight text-foreground">{value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-3 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              Features
            </span>
          </div>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Built for speed. Designed to disappear so your ideas take center stage.
            </p>
          </div>
          <BentoFeatures />
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              How it works
            </span>
          </div>
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Up and running in&nbsp;30&nbsp;seconds
            </h2>
            <p className="mt-3 text-base text-muted-foreground">Three steps. No wizard. No templates.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                {
                  step: "01",
                  title: "Create a room",
                  body: "Click \"New room\" from your dashboard. Your canvas is live instantly.",
                  icon: <Shapes className="h-5 w-5" />,
                  iconBg: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
                },
                {
                  step: "02",
                  title: "Share the link",
                  body: "Send the room URL to anyone. They join with one click — no account required.",
                  icon: <Users className="h-5 w-5" />,
                  iconBg: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
                },
                {
                  step: "03",
                  title: "Draw together",
                  body: "See everyone's cursors in real time. Every stroke syncs instantly across every tab.",
                  icon: <Zap className="h-5 w-5" />,
                  iconBg: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
                },
              ].map(({ step, title, body, icon, iconBg }) => (
                <div key={step} className="bg-background p-8">
                  <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
                    {icon}
                  </div>
                  <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                    {step}
                  </div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-28 pt-4">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-indigo-200 dark:border-indigo-500/20 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-600/10 dark:to-transparent p-14 text-center shadow-md dark:shadow-none">
          {/* Radial glow */}
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 65%)" }}
          />
          {/* Animated rings */}
          <svg className="absolute left-1/2 top-0 -translate-x-1/2 opacity-[0.15] dark:opacity-[0.10]" width="420" height="160" viewBox="0 0 420 160" fill="none">
            <ellipse cx="210" cy="0" rx="170" ry="55" stroke="#6366f1" strokeWidth="1">
              <animate attributeName="rx" values="170;186;170" dur="4s" repeatCount="indefinite"
                calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
              <animate attributeName="opacity" values="1;0.35;1" dur="4s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="210" cy="0" rx="118" ry="40" stroke="#a78bfa" strokeWidth="1">
              <animate attributeName="rx" values="118;130;118" dur="3s" repeatCount="indefinite"
                calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
              <animate attributeName="opacity" values="1;0.25;1" dur="3s" repeatCount="indefinite" />
            </ellipse>
          </svg>

          <h2 className="relative text-3xl font-bold tracking-tight text-foreground">
            Ready to draw together?
          </h2>
          <p className="relative mt-3 text-base text-muted-foreground">
            Free forever for small teams. No credit card. No setup.
          </p>

          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500"
            >
              Create your canvas <ArrowRight className="h-4 w-4" />
            </Link>
            {demoEnabled && (
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-7 py-3.5 text-sm font-medium text-muted-foreground transition hover:border-foreground/20 hover:text-foreground"
              >
                Watch it work
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border px-6 py-7">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground/60">
            <svg width="15" height="15" viewBox="0 0 22 22" fill="none">
              <path d="M4 18 C4 18 8 10 11 8 C14 6 18 10 18 14" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M7 15 C7 15 9 12 11 11 C13 10 15 12 15 14" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
            © {new Date().getFullYear()} Sketchable — multiplayer drawing for teams
          </div>
          <div className="flex items-center gap-5 text-xs text-muted-foreground/50">
            <Link href="/signin" className="transition hover:text-muted-foreground">Sign in</Link>
            <Link href="/signup" className="transition hover:text-muted-foreground">Sign up</Link>
            {demoEnabled && <Link href="/demo" className="transition hover:text-muted-foreground">Demo</Link>}
          </div>
        </div>
      </footer>

    </main>
  )
}
