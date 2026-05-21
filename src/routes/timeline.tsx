import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { HudFrame, SectionTag, HudCrosshair } from "@/components/hud";

export const Route = createFileRoute("/timeline")({
  component: TimelinePage,
});

const PHASES = [
  {
    phase: "Phase 01",
    code: "P-01 / INTAKE",
    title: "Online Registration",
    window: "Mar 14 → Apr 02",
    body:
      "Teams of 2–4 form across campuses. Submit roster, declare a primary track, and lock your team handle. The grid opens at midnight, IST.",
    items: ["Squad form & handle", "Primary track declaration", "Identity verification"],
  },
  {
    phase: "Phase 02",
    code: "P-02 / FILTER",
    title: "Idea Submission & Screening",
    window: "Apr 03 → Apr 14",
    body:
      "Drop a one-page brief and a 90-second pitch video. A panel of mentors filters submissions on signal, originality, and feasibility.",
    items: ["1-pager brief", "90s pitch video", "Mentor screening review"],
  },
  {
    phase: "Phase 03",
    code: "P-03 / SPRINT",
    title: "The 36-Hour Main Hackathon",
    window: "Apr 26 → Apr 28",
    body:
      "Continuous build. Three checkpoints, two mentor rotations, one rule: ship something runnable. Sleep is a configuration choice.",
    items: ["Kickoff @ 09:00", "Checkpoints x3", "Code freeze @ 21:00"],
  },
  {
    phase: "Phase 04",
    code: "P-04 / FINALE",
    title: "Grand Finale Pitches",
    window: "Apr 28 — Evening",
    body:
      "Top eight teams take the main stage. Six-minute pitch, four-minute Q&A. Winners get cash, partner intros, and a permanent badge on the grid.",
    items: ["Top 8 selection", "Live demo + Q&A", "Awards & after-party"],
  },
];

function TimelinePage() {
  return (
    <SiteLayout>
      <section className="border-b border-border/60">
        <div className="bg-grid absolute inset-x-0 top-16 -z-10 h-[600px] opacity-30" />
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <SectionTag id="// 02" label="Operational Roadmap" />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <h1 className="font-display text-6xl font-bold leading-[0.92] tracking-tight md:text-8xl">
              THE
              <br />
              <span className="text-primary text-glow">ROADMAP_</span>
            </h1>
            <p className="max-w-sm font-display text-base leading-relaxed text-muted-foreground">
              Four phases. Each one a checkpoint on the path from idea to ship. Track your position on the grid.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          {/* vertical line */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute bottom-0 left-[19px] top-0 hidden w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:left-1/2 md:block"
            />
            <div
              aria-hidden
              className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:hidden"
            />

            <ul className="space-y-16">
              {PHASES.map((p, i) => {
                const left = i % 2 === 0;
                return (
                  <li
                    key={p.phase}
                    className="relative grid items-center gap-8 pl-14 md:grid-cols-2 md:pl-0"
                  >
                    {/* node */}
                    <div className="absolute left-[12px] top-2 md:left-[calc(50%-14px)]">
                      <div className="grid h-7 w-7 place-items-center border border-primary bg-background">
                        <HudCrosshair className="h-3.5 w-3.5" />
                      </div>
                      <div className="absolute -inset-3 -z-10 animate-pulse rounded-full bg-primary/10 blur-md" />
                    </div>

                    {/* card */}
                    <div className={left ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}>
                      <HudFrame
                        label={`// ${p.code}`}
                        serial={p.window.toUpperCase()}
                        className="bg-card/60"
                      >
                        <div className="p-6 md:p-8">
                          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                            {p.phase}
                          </div>
                          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                            {p.title}
                          </h2>
                          <p className="mt-4 font-display text-sm leading-relaxed text-muted-foreground">
                            {p.body}
                          </p>
                          <ul className={`mt-6 space-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground ${left ? "md:items-end" : ""}`}>
                            {p.items.map((it) => (
                              <li key={it} className={`flex items-center gap-2 ${left ? "md:flex-row-reverse md:justify-start" : ""}`}>
                                <span className="inline-block h-1.5 w-1.5 bg-primary" />
                                <span>{it}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </HudFrame>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}