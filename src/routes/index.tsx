import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { HudButton, HudCrosshair, HudDivider, HudFrame, SectionTag } from "@/components/hud";
import heroCitadel from "@/assets/hero-citadel.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const STATS = [
  { k: "36H", v: "Code Sprint" },
  { k: "1.2K", v: "Hackers Expected" },
  { k: "₹8L+", v: "Prize Pool" },
  { k: "4", v: "Tracks Active" },
];

const PARTNERS = ["VECTORLABS", "NEOGRID", "AXIOM/OS", "DARK-MATTER", "PROTO·9", "ASCII.IO", "HEXNODE"];

const HIGHLIGHTS = [
  {
    code: "01",
    title: "36-Hour Sprint",
    body: "Continuous build window. No respawns, no sleep — just architecture, commits, and caffeine.",
  },
  {
    code: "02",
    title: "Mentor Grid",
    body: "Senior engineers from frontier labs roam the floor. Pull them aside, ship faster.",
  },
  {
    code: "03",
    title: "On-Site Demo Day",
    body: "Pitch to a panel of founders. Top three teams plug directly into our partner network.",
  },
];

function Index() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="bg-scan pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[1400px] px-6 pb-24 pt-12">
          {/* top meta row */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 animate-pulse bg-primary" />
              <span>LIVE FEED · OPS-DECK / SECTOR-7</span>
            </div>
            <span>COORDS 12.97°N // 77.59°E</span>
            <span>EVENT_ID :: HCK-2K26-0001</span>
          </div>

          <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionTag id="// 00" label="Annual Build Cycle — Spring 2026" />
              <h1 className="mt-6 font-display text-[clamp(3.2rem,9vw,8.5rem)] font-bold leading-[0.88] tracking-tight">
                HACK<span className="text-primary text-glow">OTH</span>
                <br />
                SAVA<span className="text-primary">.</span>2K26
              </h1>
              <p className="mt-8 max-w-xl font-display text-lg leading-relaxed text-muted-foreground">
                The ultimate <span className="text-foreground">36-hour code sprint</span>{" "}
                breaking the boundaries of reality. Assemble your squad, plug in,
                and ship something the grid hasn't seen before.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <HudButton to="#register">
                  <HudCrosshair className="h-3.5 w-3.5" />
                  Register Squad
                </HudButton>
                <Link
                  to="/timeline"
                  className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
                >
                  <span className="h-px w-8 bg-border group-hover:bg-primary" />
                  View Roadmap
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* hero image frame */}
            <div className="lg:col-span-5">
              <HudFrame
                tone="accent"
                label="// VIEWPORT.A"
                serial="REF · 26.04.001"
                className="hud-shadow"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={heroCitadel}
                    alt="Cyberpunk citadel illustration"
                    width={1600}
                    height={1280}
                    className="h-full w-full object-cover"
                  />
                  {/* overlay HUD */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                    <HudCrosshair className="h-3 w-3" />
                    TARGET ACQUIRED
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.3em]">
                    <span className="text-muted-foreground">CITADEL // NODE-09</span>
                    <span className="text-primary">SIG 0.98</span>
                  </div>
                </div>
              </HudFrame>
              <div className="mt-3 grid grid-cols-4 gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {["GRID", "PWR", "NET", "SYS"].map((t) => (
                  <div key={t} className="border border-border/60 px-2 py-1.5 text-center">
                    <div className="text-primary">●</div>
                    <div className="mt-0.5">{t} OK</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* stat strip */}
          <div className="mt-20 grid grid-cols-2 gap-px border border-border/60 bg-border/60 md:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.k}
                className="group relative bg-background px-6 py-7 transition-colors hover:bg-primary/5"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {s.v}
                </div>
                <div className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
                  {s.k}
                </div>
                <div className="absolute right-3 top-3 font-mono text-[10px] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  +
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b border-border/60 py-8">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-8 bg-border" />
            <span>Backed by the network ::</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-3 md:grid-cols-7">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="font-display text-base font-bold tracking-[0.2em] text-muted-foreground/80 transition-colors hover:text-foreground"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="border-b border-border/60 py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid items-end gap-8 md:grid-cols-2">
            <div>
              <SectionTag id="// 01" label="What this is" />
              <h2 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
                A WEAPON
                <br />
                <span className="text-primary text-glow">FOR BUILDERS_</span>
              </h2>
            </div>
            <p className="font-display text-base leading-relaxed text-muted-foreground md:text-lg">
              Hackothsava isn't a hackathon, it's a controlled detonation.
              Three days, four tracks, one continuous frequency. Bring an idea,
              leave with a shippable system and a network that outlives the event.
            </p>
          </div>

          <div className="mt-16 grid gap-px border border-border/60 bg-border/60 md:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h.code} className="group bg-background p-8 transition-colors hover:bg-primary/[0.04]">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  <span>// {h.code}</span>
                  <HudCrosshair className="h-3 w-3 opacity-60" />
                </div>
                <div className="mt-8 font-display text-2xl font-bold tracking-tight">
                  {h.title}
                </div>
                <p className="mt-3 font-display text-sm leading-relaxed text-muted-foreground">
                  {h.body}
                </p>
                <div className="mt-10 h-px w-full bg-border/60 group-hover:bg-primary/60" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="register" className="py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <HudFrame tone="accent" label="// REGISTRATION TERMINAL" serial="OPS-CHANNEL · 0x42" className="hud-shadow">
            <div className="grid items-center gap-10 p-10 md:grid-cols-2 md:p-16">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  // OPEN FREQUENCY
                </div>
                <div className="mt-5 font-display text-4xl font-bold leading-[0.95] tracking-tight md:text-6xl">
                  LOCK IN YOUR
                  <br />
                  <span className="text-primary text-glow">SQUAD.</span>
                </div>
                <p className="mt-5 max-w-md font-display text-base leading-relaxed text-muted-foreground">
                  Teams of 2–4. Registration closes when the grid fills.
                  No fees, no friction — just bring the code.
                </p>
              </div>
              <div className="space-y-4">
                <HudButton className="w-full justify-between" to="#">
                  <span className="flex items-center gap-3">
                    <HudCrosshair className="h-3.5 w-3.5" />
                    Register Now
                  </span>
                  <span>→</span>
                </HudButton>
                <HudButton variant="ghost" className="w-full justify-between" to="/timeline">
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[10px]">02</span>
                    View Schedule
                  </span>
                  <span>→</span>
                </HudButton>
                <HudDivider label="OR PING US" />
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  ops@hackothsava.io · DISCORD/JOIN
                </div>
              </div>
            </div>
          </HudFrame>
        </div>
      </section>
    </SiteLayout>
  );
}
