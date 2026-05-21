import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { HudButton, HudCrosshair, HudFrame, SectionTag } from "@/components/hud";
import trackAi from "@/assets/track-ai.jpg";
import trackWeb3 from "@/assets/track-web3.jpg";
import trackFs from "@/assets/track-fullstack.jpg";
import trackIot from "@/assets/track-iot.jpg";

export const Route = createFileRoute("/prizes")({
  component: PrizesPage,
});

const PRIZES = [
  { rank: "01 / GRAND", title: "Apex Build", amount: "₹3,00,000", note: "Best overall execution across any track. Cash + partner intros." },
  { rank: "02 / SECOND", title: "Runner Signal", amount: "₹1,50,000", note: "Tightest second-place build. Cash + cloud credits." },
  { rank: "03 / THIRD", title: "Sharp Edge", amount: "₹75,000", note: "Standout polish, demo, or idea. Cash + hardware kit." },
  { rank: "04 / TRACK", title: "Best-In-Track", amount: "₹50,000", note: "Per-track innovation prize. Four awarded, one per domain." },
];

const TRACKS = [
  {
    img: trackAi,
    code: "T·AI",
    title: "AI / ML",
    body: "Agents, model orchestration, retrieval systems, on-device inference.",
    items: ["Multi-agent systems", "RAG pipelines", "On-device models", "Eval frameworks"],
  },
  {
    img: trackWeb3,
    code: "T·W3",
    title: "Web3 & Crypto",
    body: "On-chain protocols, wallets, OTC primitives, identity, and zero-knowledge.",
    items: ["L2 dApps", "Smart wallets", "ZK identity", "OTC primitives"],
  },
  {
    img: trackFs,
    code: "T·FS",
    title: "Full-Stack",
    body: "End-to-end products with sharp UX, real-time edges, and production polish.",
    items: ["Edge runtimes", "Real-time UI", "Dev tooling", "Internal tools"],
  },
  {
    img: trackIot,
    code: "T·HW",
    title: "Hardware / IoT",
    body: "Sensors, embedded ML, robotics, and physical interfaces with the digital grid.",
    items: ["Embedded ML", "Sensor networks", "Robotics", "AR/spatial"],
  },
];

function PrizesPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <SectionTag id="// 03" label="Compensation Schedule" />
          <div className="mt-6 grid items-end gap-8 md:grid-cols-12">
            <h1 className="md:col-span-7 font-comic text-6xl leading-[0.9] md:text-8xl">
              PRIZE POOL
              <br />
              <span className="font-splash text-[1.15em] text-primary text-ink-stroke">₹8.25L+!</span>
            </h1>
            <p className="md:col-span-5 font-display text-base leading-relaxed text-muted-foreground">
              Cash, credits, hardware, and a permanent slot in the partner pipeline. Four tracks, one
              grand prize, and a track-best for every domain on the grid.
            </p>
          </div>
        </div>
      </section>

      {/* Prize tiers */}
      <section className="border-b border-border/60 py-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid gap-px border border-border/60 bg-border/60 md:grid-cols-2 lg:grid-cols-4">
            {PRIZES.map((p, i) => (
              <div
                key={p.rank}
                className={`group relative bg-background p-8 transition-colors hover:bg-primary/[0.05] ${
                  i === 0 ? "lg:bg-primary/[0.04]" : ""
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  <span>// {p.rank}</span>
                  <HudCrosshair className="h-3 w-3" />
                </div>
                <div className="mt-10 font-comic text-5xl leading-none md:text-6xl">
                  {p.amount}
                </div>
                <div className="mt-3 font-display text-lg font-semibold tracking-tight">{p.title}</div>
                <p className="mt-3 font-display text-sm leading-relaxed text-muted-foreground">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionTag id="// 03.B" label="Mission Domains" />
              <h2 className="mt-4 font-comic text-5xl leading-[0.92] md:text-6xl">
                FOUR
                <br />
                <span className="font-splash text-[1.15em] text-primary text-ink-stroke">TRACKS!</span>
              </h2>
            </div>
            <p className="max-w-sm font-display text-base leading-relaxed text-muted-foreground">
              Pick a domain at registration. Switch up to 24h before kickoff. Cross-track
              hybrids are encouraged.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {TRACKS.map((t) => (
              <HudFrame key={t.code} label={`// ${t.code}`} serial={t.title.toUpperCase()} className="bg-card/40">
                <div className="grid gap-0 md:grid-cols-5">
                  <div className="relative md:col-span-2">
                    <div className="aspect-square overflow-hidden border-r border-border/60">
                      <img
                        src={t.img}
                        alt={`${t.title} track`}
                        width={1024}
                        height={1024}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6 md:col-span-3 md:p-8">
                    <div className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                      {t.title}
                    </div>
                    <p className="mt-3 font-display text-sm leading-relaxed text-muted-foreground">
                      {t.body}
                    </p>
                    <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {t.items.map((i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="inline-block h-1 w-1 bg-primary" />
                          {i}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <HudButton variant="ghost" to="#register">
                        Enter Track →
                      </HudButton>
                    </div>
                  </div>
                </div>
              </HudFrame>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}