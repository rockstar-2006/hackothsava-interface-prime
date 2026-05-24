import { useEffect, useState } from "react";
import heroCitadel from "@/assets/hero-citadel.jpg";
import trackAi from "@/assets/track-ai.jpg";
import trackWeb3 from "@/assets/track-web3.jpg";
import trackIot from "@/assets/track-iot.jpg";

/**
 * Comic-book storyline loader.
 * Four animated panels narrate a boot sequence:
 *   1. SIGNAL DETECTED  2. HEROES ASSEMBLE  3. POWER UP!  4. READY
 * Each panel reveals with a hard-cut comic transition; a halftone POW
 * splash explodes at the end, then the whole loader slides up & off.
 */

const PANELS = [
  {
    tag: "PANEL 01",
    title: "SIGNAL DETECTED",
    line: "A pulse from sector-7… the grid is waking up.",
    img: heroCitadel,
    burst: "BZZT!",
    tilt: -2,
  },
  {
    tag: "PANEL 02",
    title: "HEROES ASSEMBLE",
    line: "Coders, hackers, builders — converging on coordinates.",
    img: trackAi,
    burst: "WHOOSH!",
    tilt: 1.5,
  },
  {
    tag: "PANEL 03",
    title: "POWER UP",
    line: "36 hours. Four tracks. Infinite caffeine.",
    img: trackWeb3,
    burst: "ZAP!",
    tilt: -1.5,
  },
  {
    tag: "PANEL 04",
    title: "HACKOTHSAVA 2K26",
    line: "Breaking the boundaries of reality. Welcome in.",
    img: trackIot,
    burst: "POW!",
    tilt: 2,
  },
];

const PANEL_MS = 700;
const HOLD_MS = 650;

export function ComicLoader() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Run once per session
    if (typeof window !== "undefined" && sessionStorage.getItem("hk_loader_seen")) {
      setDone(true);
      return;
    }
    const timers: number[] = [];
    PANELS.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStep(i + 1), PANEL_MS * (i + 1)));
    });
    timers.push(
      window.setTimeout(() => setLeaving(true), PANEL_MS * PANELS.length + HOLD_MS),
    );
    timers.push(
      window.setTimeout(() => {
        setDone(true);
        try {
          sessionStorage.setItem("hk_loader_seen", "1");
        } catch {}
      }, PANEL_MS * PANELS.length + HOLD_MS + 700),
    );
    // Lock scroll while loader is up
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      timers.forEach((t) => clearTimeout(t));
      document.body.style.overflow = prev;
    };
  }, []);

  if (!mounted || done) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] grid place-items-center bg-background transition-transform duration-700 ease-[cubic-bezier(.77,0,.18,1)] ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-hidden={leaving}
      role="status"
      aria-label="Loading Hackothsava"
    >
      {/* Background texture */}
      <div className="bg-halftone-dense pointer-events-none absolute inset-0 opacity-30" />
      <div className="bg-scan pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

      {/* Top tag */}
      <div className="absolute left-6 top-6 flex items-center gap-3 border-2 border-foreground bg-primary px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground comic-shadow-ink">
        <span className="inline-block h-1.5 w-1.5 animate-pulse bg-primary-foreground" />
        BOOT SEQUENCE // ISSUE #2K26
      </div>
      <div className="absolute right-6 top-6 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:block">
        SIG 0xA3F-9921 · LOADING
      </div>

      {/* Comic panel grid */}
      <div className="relative mx-auto grid w-[min(92vw,1100px)] grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {PANELS.map((p, i) => {
          const active = step > i;
          return (
            <div
              key={p.tag}
              style={{ transform: `rotate(${p.tilt}deg)` }}
              className={`relative aspect-[3/4] border-2 border-foreground bg-card transition-all duration-300 ${
                active
                  ? "comic-shadow-ink opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-6 scale-95"
              }`}
            >
              {/* Image */}
              <img
                src={p.img}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-screen contrast-125 saturate-150"
              />
              <div className="bg-halftone-dense absolute inset-0 opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

              {/* Panel tag */}
              <div className="absolute left-2 top-2 border border-foreground bg-background px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em]">
                {p.tag}
              </div>

              {/* Burst */}
              {active && (
                <div
                  className="absolute -right-3 -top-3 grid place-items-center animate-[scale-in_0.25s_ease-out]"
                  style={{ transform: `rotate(${-p.tilt * 4}deg)` }}
                >
                  <svg viewBox="0 0 100 100" className="h-16 w-16">
                    <polygon
                      points="50,2 60,18 78,8 76,28 96,30 80,46 98,60 78,62 84,84 64,78 60,98 50,82 40,98 36,78 16,84 22,62 2,60 20,46 4,30 24,28 22,8 40,18"
                      fill="var(--color-primary)"
                      stroke="var(--ink)"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="absolute font-splash text-sm text-primary-foreground">
                    {p.burst}
                  </span>
                </div>
              )}

              {/* Caption */}
              <div className="absolute inset-x-2 bottom-2 border-2 border-foreground bg-background/95 p-2">
                <div className="font-comic text-[11px] leading-tight text-foreground sm:text-xs">
                  {p.title}
                </div>
                <div className="mt-1 font-mono text-[8px] leading-snug text-muted-foreground sm:text-[9px]">
                  {p.line}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom progress + speech bubble */}
      <div className="absolute inset-x-0 bottom-8 mx-auto flex w-[min(92vw,1100px)] flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between">
        <div className="relative border-2 border-foreground bg-background px-4 py-2 font-comic text-sm comic-shadow-ink">
          {step >= PANELS.length ? "READY. ENTER THE GRID." : "LOADING NARRATIVE…"}
          <span className="absolute -bottom-[10px] left-6 h-0 w-0 border-l-[10px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent border-t-foreground" />
          <span className="absolute -bottom-[7px] left-[26px] h-0 w-0 border-l-[7px] border-r-[4px] border-t-[7px] border-l-transparent border-r-transparent border-t-background" />
        </div>
        <div className="flex w-full max-w-md items-center gap-3 sm:w-1/2">
          <div className="relative h-3 flex-1 border-2 border-foreground bg-background">
            <div
              className="h-full bg-primary transition-[width] duration-500 ease-out"
              style={{ width: `${(step / PANELS.length) * 100}%` }}
            />
            <div className="bg-stripes pointer-events-none absolute inset-0 opacity-30" />
          </div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
            {String(Math.round((step / PANELS.length) * 100)).padStart(3, "0")}%
          </span>
        </div>
      </div>
    </div>
  );
}