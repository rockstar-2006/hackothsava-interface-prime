import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { HudFrame, SectionTag, HudCrosshair, Splash, SpeechTag } from "@/components/hud";
import illo from "@/assets/track-fullstack.jpg";
import trackAi from "@/assets/track-ai.jpg";
import trackWeb3 from "@/assets/track-web3.jpg";
import trackIot from "@/assets/track-iot.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import heroCitadel from "@/assets/hero-citadel.jpg";

export const Route = createFileRoute("/timeline")({
  component: TimelinePage,
});

type Status = "done" | "live" | "next" | "future";

type Hour = {
  h: string;        // hour stamp e.g. "00H"
  clock: string;    // wall time
  code: string;     // ops code
  title: string;
  body: string;
  status: Status;
  splash?: string;  // optional sound effect
  tag?: string;     // optional speech tag
  image: string;    // comic illustration for this checkpoint
};

const HOURS: Hour[] = [
  { h: "00H", clock: "09:00", code: "OPS·BOOT", title: "Kickoff & Squad Check-In", body: "Doors open, badges scanned, swag dropped. Opening keynote at 09:30 sharp — no respawns.", status: "done", splash: "BOOM!", tag: "// DAY 01", image: heroCitadel },
  { h: "03H", clock: "12:00", code: "IDE·LOCK", title: "Ideation Lock-In", body: "Squads commit to a problem statement. Mentors roam the floor. Last chance to pivot scope.", status: "done", image: gallery2 },
  { h: "06H", clock: "15:00", code: "CHK·01", title: "Checkpoint Alpha", body: "First architecture review. Wireframes, data shape, and a working hello-world from each team.", status: "live", splash: "PING!", image: trackAi },
  { h: "10H", clock: "19:00", code: "FUEL·DROP", title: "Dinner & Mentor Rotation", body: "Hot meals on the floor. Senior engineers from partner labs cycle through every table.", status: "next", image: gallery4 },
  { h: "14H", clock: "23:00", code: "DEEP·NIGHT", title: "Deep Night Sprint", body: "The grid goes quiet. Focus mode. Lo-fi station goes live in the chill zone.", status: "future", tag: "// DAY 02", image: trackWeb3 },
  { h: "18H", clock: "03:00", code: "CHK·02", title: "Checkpoint Bravo", body: "Mid-build review. Show working core features. Mentors flag blockers before sunrise.", status: "future", splash: "PIVOT!", image: gallery5 },
  { h: "22H", clock: "07:00", code: "POLISH", title: "Polish & Demo Prep", body: "UI sweep, README, deploy. Record a 60s backup demo in case the demo gods misbehave.", status: "future", image: trackIot },
  { h: "24H", clock: "09:00", code: "FREEZE", title: "Code Freeze & Demo Day", body: "Repos locked. Stage opens. Top 8 take the mic for a 6-minute pitch. Winners crowned by noon.", status: "future", splash: "SHIP IT!", image: gallery6 },
];

const STATUS_STYLES: Record<Status, { dot: string; chip: string; label: string }> = {
  done:   { dot: "bg-muted-foreground", chip: "bg-foreground text-background", label: "LOCKED" },
  live:   { dot: "bg-primary animate-pulse", chip: "bg-primary text-primary-foreground", label: "LIVE" },
  next:   { dot: "bg-foreground", chip: "bg-background text-foreground border-2 border-foreground", label: "NEXT" },
  future: { dot: "bg-background border-2 border-foreground", chip: "bg-background text-muted-foreground border-2 border-border", label: "QUEUED" },
};

/** Comic hour-stamp node — a chunky polygon badge with the hour inside. */
function HourNode({ hour, status }: { hour: string; status: Status }) {
  const ring =
    status === "live"
      ? "fill-[var(--color-primary)]"
      : status === "done"
      ? "fill-[var(--ink)]"
      : status === "next"
      ? "fill-[var(--color-background)]"
      : "fill-[var(--color-background)]";
  const txt =
    status === "live" ? "text-primary-foreground"
    : status === "done" ? "text-primary"
    : "text-foreground";
  return (
    <div className="relative grid h-20 w-20 place-items-center">
      {/* outer starburst */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <polygon
          points="50,2 60,16 78,8 76,28 96,32 82,46 98,60 78,64 84,84 64,80 60,98 50,84 40,98 36,80 16,84 22,64 2,60 18,46 4,32 24,28 22,8 40,16"
          className={ring}
          stroke="var(--ink)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </svg>
      {/* inner hex */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <polygon
          points="50,18 78,34 78,66 50,82 22,66 22,34"
          fill="var(--ink)"
          stroke="var(--color-primary)"
          strokeWidth="1.5"
        />
      </svg>
      <div className={`relative z-10 text-center font-comic leading-none ${txt}`}>
        <div className="text-[10px] font-mono tracking-[0.2em] opacity-80">HOUR</div>
        <div className="text-xl">{hour}</div>
      </div>
      {status === "live" && (
        <span className="absolute -inset-2 -z-10 animate-ping rounded-full bg-primary/30 blur-md" />
      )}
    </div>
  );
}

function TimelinePage() {
  const liveIdx = HOURS.findIndex((h) => h.status === "live");
  const progress = liveIdx >= 0 ? ((liveIdx + 1) / HOURS.length) * 100 : 0;

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="border-b-2 border-foreground">
        <div className="bg-grid absolute inset-x-0 top-16 -z-10 h-[600px] opacity-30" />
        <div className="bg-halftone pointer-events-none absolute inset-0 opacity-20" />
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <SectionTag id="// 02" label="24-Hour Operational Sprint" />
          <div className="mt-6 grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <h1 className="font-comic text-6xl leading-[0.9] md:text-8xl">
                THE
                <br />
                <span className="font-splash text-[1.15em] text-primary text-ink-stroke">24H GRID!</span>
              </h1>
              <p className="mt-6 max-w-md font-display text-base leading-relaxed text-muted-foreground">
                One day. Eight checkpoints. Zero do-overs. Track every hour from boot-up to ship.
              </p>
            </div>
            <div className="md:col-span-5">
              <HudFrame label="// SCHEMATIC" serial="GRID · 24H-CYCLE" className="comic-shadow">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <img src={illo} alt="" aria-hidden className="h-full w-full object-cover" />
                  <div className="bg-halftone pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-background/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                    <span>ROUTE · 00H → 24H</span>
                    <HudCrosshair className="h-3 w-3" />
                  </div>
                </div>
              </HudFrame>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-12 border-2 border-foreground bg-background p-4 comic-shadow">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span>// SPRINT PROGRESS</span>
              <span className="text-primary">{Math.round(progress)}% · {liveIdx + 1}/{HOURS.length} CHECKPOINTS</span>
            </div>
            <div className="mt-3 relative h-3 border-2 border-foreground bg-background">
              <div className="h-full bg-stripes" style={{ width: `${progress}%` }} />
              <div className="absolute inset-y-0 left-0 right-0 flex justify-between">
                {HOURS.map((h, i) => (
                  <span key={i} className="h-full w-px bg-foreground/40" />
                ))}
              </div>
            </div>
            <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              {HOURS.map((h) => (<span key={h.h}>{h.h}</span>))}
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative py-24">
        <div className="bg-halftone-dense pointer-events-none absolute inset-0 opacity-10" />
        <div className="mx-auto max-w-[1300px] px-6">
          {/* vertical track */}
          <div className="relative">
            {/* halftone connector */}
            <div
              aria-hidden
              className="absolute bottom-0 left-[39px] top-0 hidden w-[6px] border-x-2 border-foreground bg-stripes md:left-1/2 md:-translate-x-1/2 md:block"
            />
            <div
              aria-hidden
              className="absolute bottom-0 left-[39px] top-0 w-[6px] border-x-2 border-foreground bg-stripes md:hidden"
            />

            <ul className="space-y-20">
              {HOURS.map((h, i) => {
                const left = i % 2 === 0;
                const st = STATUS_STYLES[h.status];
                return (
                  <li key={h.h} className="relative grid items-start gap-8 pl-28 md:grid-cols-2 md:pl-0">
                    {/* COMIC NODE */}
                    <div className="absolute left-0 top-0 md:left-[calc(50%-40px)]">
                      <HourNode hour={h.h} status={h.status} />
                      {/* clock badge under node */}
                      <div className="mt-2 grid place-items-center">
                        <span className="inline-flex items-center gap-1.5 border-2 border-foreground bg-background px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] comic-shadow-ink">
                          <span className={`inline-block h-1.5 w-1.5 ${st.dot}`} />
                          {h.clock}
                        </span>
                      </div>
                    </div>

                    {/* CARD */}
                    <div className={left ? "md:pr-24 md:text-right" : "md:col-start-2 md:pl-24"}>
                      <div className="relative">
                        {h.tag && (
                          <div className={`absolute -top-8 z-10 ${left ? "md:right-0" : "md:left-0"}`}>
                            <SpeechTag>{h.tag}</SpeechTag>
                          </div>
                        )}
                        {h.splash && (
                          <div className={`pointer-events-none absolute -top-10 z-20 ${left ? "left-0 md:-left-6" : "right-0 md:-right-6"}`}>
                            <Splash rotate={left ? -14 : 12} className="h-16 w-16">{h.splash}</Splash>
                          </div>
                        )}
                        <HudFrame
                          tone={h.status === "live" ? "accent" : "default"}
                          label={`// ${h.code}`}
                          serial={`T+${h.h} · ${h.clock}`}
                          className={h.status === "live" ? "comic-shadow-lg" : ""}
                        >
                          {/* COMIC ILLUSTRATION STRIP */}
                          <div className="relative h-36 overflow-hidden border-b-2 border-foreground md:h-44">
                            <img
                              src={h.image}
                              alt=""
                              aria-hidden
                              className="h-full w-full object-cover contrast-125 saturate-150"
                            />
                            <div className="bg-halftone-dense pointer-events-none absolute inset-0 opacity-50 mix-blend-multiply" />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                            <div className={`absolute bottom-2 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary ${left ? "right-3" : "left-3"}`}>
                              <HudCrosshair className="h-3 w-3" />
                              FRAME · {h.h}
                            </div>
                            <div className={`absolute top-2 ${left ? "left-2" : "right-2"} border-2 border-foreground bg-background px-1.5 py-0.5 font-comic text-[11px] leading-none comic-shadow-ink`}>
                              {h.code}
                            </div>
                          </div>
                          <div className="p-6 md:p-8">
                            <div className={`flex items-center gap-2 ${left ? "md:justify-end" : ""}`}>
                              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.25em] ${st.chip}`}>
                                <span className={`inline-block h-1.5 w-1.5 ${h.status === "live" ? "bg-primary-foreground" : "bg-current"}`} />
                                {st.label}
                              </span>
                            </div>
                            <h2 className="mt-4 font-comic text-3xl leading-tight tracking-tight md:text-4xl">
                              {h.title}
                            </h2>
                            <p className="mt-3 font-display text-sm leading-relaxed text-muted-foreground">
                              {h.body}
                            </p>
                            <div className={`mt-6 h-1 w-full bg-stripes opacity-70`} />
                          </div>
                        </HudFrame>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* FINISH FLAG */}
            <div className="relative mt-16 grid place-items-center">
              <div className="border-2 border-foreground bg-primary px-6 py-3 font-comic text-2xl tracking-[0.2em] text-primary-foreground comic-shadow-ink">
                · END OF GRID ·
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}