import { useEffect, useState } from "react";
import heroCitadel from "@/assets/hero-citadel.jpg";

/**
 * Cinematic comic-book loader.
 *
 * Stages a single animated splash page rather than a grid of panels:
 *   1. INK SPLATTER opens from center
 *   2. Hero citadel rises behind a halftone backdrop
 *   3. Speech bubbles pop in around the frame
 *   4. A massive "HACKOTHSAVA!" splash erupts
 *   5. The whole page tears upward off-screen
 *
 * The flow runs ONCE per session via sessionStorage.
 */

const BUBBLES = [
  { x: "6%", y: "14%", text: "The grid went dark…", delay: 600, rot: -4 },
  { x: "62%", y: "10%", text: "A signal from sector-7!", delay: 950, rot: 3 },
  { x: "4%", y: "62%", text: "36 hours. 4 tracks.", delay: 1300, rot: 2 },
  { x: "60%", y: "66%", text: "Only builders can save us.", delay: 1650, rot: -3 },
];

const TOTAL_MS = 4200;
const LEAVE_MS = 800;

export function ComicLoader() {
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState(0); // 0 splatter → 1 hero+bubbles → 2 splash → 3 leave
  const [done, setDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && sessionStorage.getItem("hk_loader_seen")) {
      setDone(true);
      return;
    }
    const t: number[] = [];
    t.push(window.setTimeout(() => setStage(1), 350));
    t.push(window.setTimeout(() => setStage(2), 2900));
    t.push(window.setTimeout(() => setStage(3), TOTAL_MS));
    t.push(
      window.setTimeout(() => {
        setDone(true);
        try {
          sessionStorage.setItem("hk_loader_seen", "1");
        } catch {}
      }, TOTAL_MS + LEAVE_MS),
    );
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      t.forEach(clearTimeout);
      document.body.style.overflow = prev;
    };
  }, []);

  if (!mounted || done) return null;

  const leaving = stage >= 3;

  return (
    <div
      role="status"
      aria-label="Loading Hackothsava"
      aria-hidden={leaving}
      className={`fixed inset-0 z-[200] overflow-hidden bg-background transition-transform duration-700 ease-[cubic-bezier(.77,0,.18,1)] ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* ---- INK SPLATTER REVEAL ---- */}
      <div
        className="pointer-events-none absolute inset-0 bg-foreground origin-center transition-transform duration-700 ease-[cubic-bezier(.85,0,.15,1)]"
        style={{
          clipPath:
            "polygon(50% 45%, 58% 38%, 62% 46%, 70% 42%, 66% 50%, 74% 54%, 64% 56%, 60% 64%, 54% 58%, 46% 64%, 42% 56%, 32% 56%, 38% 50%, 30% 44%, 40% 44%, 42% 36%)",
          transform: stage === 0 ? "scale(0.1)" : "scale(40)",
          opacity: stage === 0 ? 1 : 0,
          transitionProperty: "transform, opacity",
        }}
      />

      {/* ---- BACKDROP TEXTURES ---- */}
      <div className="bg-halftone-dense pointer-events-none absolute inset-0 opacity-25" />
      <div className="bg-scan pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-primary/5" />

      {/* ---- ISSUE BAR ---- */}
      <div className="absolute left-6 top-6 flex items-center gap-3 border-2 border-foreground bg-primary px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground comic-shadow-ink">
        <span className="inline-block h-1.5 w-1.5 animate-pulse bg-primary-foreground" />
        ISSUE #2K26 · COLD OPEN
      </div>
      <div className="absolute right-6 top-6 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex md:items-center md:gap-2">
        <span className="inline-block h-1.5 w-1.5 animate-pulse bg-primary" />
        SIG 0xA3F-9921
      </div>

      {/* ---- HERO TILTED PANEL ---- */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out ${
          stage >= 1 ? "opacity-100 scale-100 rotate-[-2deg]" : "opacity-0 scale-90 rotate-[-12deg]"
        }`}
      >
        <div className="relative h-[58vh] w-[min(82vw,720px)] border-[3px] border-foreground bg-card comic-shadow-ink overflow-hidden">
          <img
            src={heroCitadel}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-screen contrast-125 saturate-150"
          />
          <div className="bg-halftone-dense absolute inset-0 opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          {/* speed lines */}
          <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
            {Array.from({ length: 14 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + Math.cos((i / 14) * Math.PI * 2) * 80}
                y2={50 + Math.sin((i / 14) * Math.PI * 2) * 80}
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-foreground"
              />
            ))}
          </svg>

          {/* panel ID */}
          <div className="absolute left-3 top-3 border-2 border-foreground bg-background px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em]">
            COLD OPEN // 001
          </div>

          {/* tagline */}
          <div className="absolute inset-x-4 bottom-4 border-2 border-foreground bg-background/95 p-3">
            <div className="font-comic text-base leading-tight sm:text-lg">
              MEANWHILE… IN THE BROKEN GRID.
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              A NEW ISSUE BEGINS_
            </div>
          </div>
        </div>
      </div>

      {/* ---- POP-IN SPEECH BUBBLES ---- */}
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          className="absolute hidden md:block"
          style={{
            left: b.x,
            top: b.y,
            transform: `rotate(${b.rot}deg)`,
            transitionDelay: `${b.delay}ms`,
            opacity: stage >= 1 && stage < 2 ? 1 : 0,
            transition: "opacity 220ms ease-out, transform 220ms ease-out",
          }}
        >
          <div className="relative max-w-[200px] border-[2.5px] border-foreground bg-background px-3 py-2 font-comic text-sm comic-shadow-ink animate-scale-in">
            {b.text}
            <span
              className="absolute h-0 w-0 border-l-[10px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-foreground"
              style={
                i % 2 === 0
                  ? { bottom: -12, left: 18 }
                  : { bottom: -12, right: 18 }
              }
            />
          </div>
        </div>
      ))}

      {/* ---- FINAL SPLASH ---- */}
      <div
        className={`pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-300 ${
          stage >= 2 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`relative ${stage >= 2 ? "animate-[scale-in_0.45s_cubic-bezier(.34,1.56,.64,1)]" : ""}`}
        >
          <svg viewBox="0 0 600 600" className="h-[90vmin] w-[90vmin]">
            <polygon
              points="300,10 340,80 420,40 410,130 500,140 440,210 530,260 440,290 510,360 420,360 450,450 360,420 350,510 300,440 250,510 240,420 170,450 200,360 110,360 180,290 90,260 180,210 120,140 210,130 200,40 280,80"
              fill="var(--color-primary)"
              stroke="var(--color-foreground)"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <polygon
              points="300,60 330,115 390,85 380,150 445,160 400,210 465,250 400,275 450,330 385,330 410,395 345,370 340,440 300,385 260,440 255,370 190,395 215,330 150,330 200,275 135,250 200,210 155,160 220,150 210,85 270,115"
              fill="none"
              stroke="var(--color-foreground)"
              strokeWidth="3"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="font-splash text-[14vmin] leading-none text-primary-foreground drop-shadow-[3px_3px_0_var(--color-foreground)]">
                HACKOTHSAVA!
              </div>
              <div className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary-foreground">
                2K26 · ENTER THE GRID
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- BOTTOM HUD ---- */}
      <div className="absolute inset-x-0 bottom-6 mx-auto flex w-[min(92vw,1100px)] items-center justify-between px-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>
          STAGE <span className="text-primary">{String(Math.min(stage + 1, 3)).padStart(2, "0")}</span>/03
        </span>
        <div className="relative hidden h-2 w-64 border-2 border-foreground bg-background sm:block">
          <div
            className="h-full bg-primary transition-[width] duration-500 ease-out"
            style={{ width: `${Math.min(((stage + 1) / 3) * 100, 100)}%` }}
          />
          <div className="bg-stripes pointer-events-none absolute inset-0 opacity-30" />
        </div>
        <span className="text-primary">{stage >= 2 ? "READY_" : "BOOTING_"}</span>
      </div>
    </div>
  );
}