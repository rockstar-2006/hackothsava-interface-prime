import { useEffect, useState } from "react";
import heroCitadel from "@/assets/hero-citadel.jpg";
import trackAi from "@/assets/track-ai.jpg";
import trackWeb3 from "@/assets/track-web3.jpg";

/**
 * Comic-book page-turn loader.
 *
 * One continuous narrative — no dead air:
 *   ACT 1  Closed comic cover pulses, then peels open in 3D
 *   ACT 2  Three panels slide on with typing captions + ink lines drawing themselves
 *   ACT 3  Camera pushes into final panel, sound-effect words fly in
 *   ACT 4  Full-bleed HACKOTHSAVA splash, page tears upward off-screen
 *
 * Runs once per session via sessionStorage.
 */

const PANELS = [
  {
    img: heroCitadel,
    cap: "THE GRID FRACTURED…",
    sub: "001 // COLD OPEN",
    sfx: "BZZT!",
    tilt: -2,
  },
  {
    img: trackAi,
    cap: "BUILDERS HEARD THE CALL.",
    sub: "002 // RISING ACTION",
    sfx: "WHOOSH!",
    tilt: 1.5,
  },
  {
    img: trackWeb3,
    cap: "36 HOURS TO REWRITE REALITY.",
    sub: "003 // CLIMAX",
    sfx: "ZAP!",
    tilt: -1,
  },
];

// Timing (ms from mount)
const T_OPEN = 900;      // hold cover a beat longer so it reads as a book
const T_TURN_MS = 1400;  // slower, weightier page turn
const T_PANELS = T_OPEN + T_TURN_MS - 250; // panels start as page nears flat
const T_PANEL_STEP = 750;
const T_SPLASH = T_PANELS + T_PANEL_STEP * PANELS.length + 250;
const T_LEAVE = T_SPLASH + 1200;
const T_DONE = T_LEAVE + 800;

function Typewriter({ text, active, delay = 0 }: { text: string; active: boolean; delay?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) {
      setN(0);
      return;
    }
    const start = window.setTimeout(() => {
      let i = 0;
      const id = window.setInterval(() => {
        i++;
        setN(i);
        if (i >= text.length) window.clearInterval(id);
      }, 28);
    }, delay);
    return () => window.clearTimeout(start);
  }, [active, text, delay]);
  return (
    <>
      {text.slice(0, n)}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] -mb-[2px] bg-primary animate-pulse" />
    </>
  );
}

export function ComicLoader() {
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState(0); // 0 cover · 1 turning · 2 panels · 3 splash · 4 leave
  const [panelStep, setPanelStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && sessionStorage.getItem("hk_loader_seen")) {
      setDone(true);
    }
    const onReplay = () => {
      try { sessionStorage.removeItem("hk_loader_seen"); } catch {}
      setStage(0);
      setPanelStep(0);
      setDone(false);
    };
    window.addEventListener("hk:replay-loader", onReplay);
    return () => window.removeEventListener("hk:replay-loader", onReplay);
  }, []);

  useEffect(() => {
    if (done || !mounted) return;
    const t: number[] = [];
    t.push(window.setTimeout(() => setStage(1), T_OPEN));
    t.push(window.setTimeout(() => setStage(2), T_PANELS - 150));
    PANELS.forEach((_, i) => {
      t.push(window.setTimeout(() => setPanelStep(i + 1), T_PANELS + i * T_PANEL_STEP));
    });
    t.push(window.setTimeout(() => setStage(3), T_SPLASH));
    t.push(window.setTimeout(() => setStage(4), T_LEAVE));
    t.push(
      window.setTimeout(() => {
        setDone(true);
        try {
          sessionStorage.setItem("hk_loader_seen", "1");
        } catch {}
      }, T_DONE),
    );
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      t.forEach(clearTimeout);
      document.body.style.overflow = prev;
    };
  }, [done, mounted]);

  if (!mounted || done) return null;

  const leaving = stage >= 4;
  const progress = Math.min(
    1,
    stage === 0
      ? 0.05
      : stage === 1
        ? 0.2
        : stage === 2
          ? 0.25 + (panelStep / PANELS.length) * 0.55
          : stage === 3
            ? 0.95
            : 1,
  );

  return (
    <div
      role="status"
      aria-label="Loading Hackothsava"
      aria-hidden={leaving}
      className={`fixed inset-0 z-[200] overflow-hidden bg-background transition-transform duration-700 ease-[cubic-bezier(.77,0,.18,1)] ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Persistent backdrop textures */}
      <div className="bg-halftone-dense pointer-events-none absolute inset-0 opacity-25" />
      <div className="bg-scan pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

      {/* Drifting ink lines — continuous motion in the background */}
      <svg
        aria-hidden
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={i}
            x1={-200 + i * 90}
            y1={-50}
            x2={100 + i * 90}
            y2={900}
            stroke="currentColor"
            strokeWidth="0.6"
            className="text-primary"
            style={{
              animation: `inkSlide 3.5s linear ${i * 0.12}s infinite`,
            }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes inkSlide {
          0% { transform: translateY(-12%); opacity: 0; }
          15% { opacity: 0.8; }
          85% { opacity: 0.8; }
          100% { transform: translateY(12%); opacity: 0; }
        }
        @keyframes drawStroke {
          to { stroke-dashoffset: 0; }
        }
        @keyframes sfxFly {
          0% { transform: translate(-40px, 40px) rotate(-20deg) scale(0.4); opacity: 0; }
          60% { transform: translate(0,0) rotate(-6deg) scale(1.1); opacity: 1; }
          100% { transform: translate(0,0) rotate(-6deg) scale(1); opacity: 1; }
        }
        @keyframes pageTurn {
          0% { transform: perspective(1600px) rotateY(0deg); }
          100% { transform: perspective(1600px) rotateY(-170deg); }
        }
      `}</style>

      {/* HUD top */}
      <div className="absolute left-6 top-6 z-30 flex items-center gap-3 border-2 border-foreground bg-primary px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground comic-shadow-ink">
        <span className="inline-block h-1.5 w-1.5 animate-pulse bg-primary-foreground" />
        ISSUE #2K26 · NOW LOADING
      </div>
      <div className="absolute right-6 top-6 z-30 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex md:items-center md:gap-2">
        <span className="inline-block h-1.5 w-1.5 animate-pulse bg-primary" />
        SIG 0xA3F-9921
      </div>

      {/* ============== ACT 1 + 2 — Book cover that turns ============== */}
      <div
        className="absolute inset-0 grid place-items-center"
        style={{ perspective: "2400px" }}
      >
        {/* Soft book shadow on the surface beneath */}
        <div
          className="pointer-events-none absolute h-[80vh] w-[min(88vw,660px)] rounded-[2px] bg-black/60 blur-2xl"
          style={{ transform: "translateY(28px) scale(0.96)" }}
          aria-hidden
        />

        {/* Cover page — flips away */}
        <div
          className="absolute h-[78vh] w-[min(86vw,640px)] border-[3px] border-foreground bg-card"
          style={{
            transformOrigin: "left center",
            transform:
              stage >= 1
                ? "rotateY(-168deg)"
                : "rotateY(0deg)",
            transition: `transform ${T_TURN_MS}ms cubic-bezier(.55,.05,.25,1)`,
            transformStyle: "preserve-3d",
            zIndex: stage >= 1 ? 1 : 5,
            boxShadow: stage >= 1
              ? "0 30px 60px -20px rgba(0,0,0,0.7)"
              : "8px 10px 0 0 var(--ink), 0 30px 60px -20px rgba(0,0,0,0.55)",
          }}
        >
          {/* ===== Front face of cover ===== */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* paper tone */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-card to-background" />
            <div className="bg-halftone-dense absolute inset-0 opacity-30" />

            {/* MASTHEAD */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b-[3px] border-foreground bg-primary px-4 py-2 text-primary-foreground">
              <div className="font-splash text-2xl leading-none tracking-wider">
                HACKOTHSAVA
              </div>
              <div className="border-2 border-foreground bg-background px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground">
                ISSUE #2K26
              </div>
            </div>

            {/* Cover artwork band */}
            <div className="absolute inset-x-4 top-[68px] bottom-[120px] overflow-hidden border-[3px] border-foreground bg-background">
              <img
                src={heroCitadel}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-90 contrast-125 saturate-150"
              />
              <div className="bg-halftone-dense absolute inset-0 opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />

              {/* corner tag */}
              <div className="absolute right-3 top-3 rotate-[8deg] border-2 border-foreground bg-primary px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary-foreground">
                EXCLUSIVE
              </div>

              {/* Title block */}
              <div className="absolute inset-x-4 bottom-3">
                <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground">
                  A Cinematic Builder Saga
                </div>
                <div className="mt-1 font-splash text-[8.5vmin] leading-[0.9] text-primary drop-shadow-[3px_3px_0_var(--ink)]">
                  ENTER
                  <br />
                  THE GRID
                </div>
              </div>
            </div>

            {/* Footer strip — barcode + price + date */}
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-[auto_1fr_auto] items-center gap-3 border-t-[3px] border-foreground bg-background px-4 py-2">
              {/* barcode */}
              <div className="flex h-8 items-end gap-[2px]">
                {Array.from({ length: 22 }).map((_, i) => (
                  <span
                    key={i}
                    className="block bg-foreground"
                    style={{
                      width: 2,
                      height: 12 + ((i * 37) % 18),
                    }}
                  />
                ))}
              </div>
              <div className="text-center font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                VOL. 02 · 36 HOUR EDITION
              </div>
              <div className="border-2 border-foreground bg-primary px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary-foreground">
                ₹ 00
              </div>
            </div>

            {/* Spine */}
            <div className="absolute inset-y-0 left-0 w-3 border-r-2 border-foreground bg-foreground" />

            {/* Page-turn shading — darkens the cover as it folds */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/70 via-black/20 to-transparent"
              style={{
                opacity: stage >= 1 ? 1 : 0,
                transition: `opacity ${T_TURN_MS}ms ease-in`,
              }}
            />
          </div>

          {/* ===== Back face of cover (visible mid-turn) ===== */}
          <div
            className="absolute inset-0 overflow-hidden bg-card"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="bg-halftone-dense absolute inset-0 opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
            <div className="absolute inset-x-6 top-6 border-2 border-foreground bg-background px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.3em]">
              Inside Cover · Do Not Skip
            </div>
          </div>
        </div>

        {/* Inner page revealed underneath — panels stream in */}
        <div
          className="relative h-[78vh] w-[min(86vw,640px)] border-[3px] border-foreground bg-background overflow-hidden transition-opacity duration-300"
          style={{
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 3 ? "scale(1.18)" : "scale(1)",
            transition: "opacity 300ms ease, transform 700ms cubic-bezier(.6,0,.4,1)",
          }}
        >
          <div className="bg-halftone-dense absolute inset-0 opacity-30" />

          {/* Panel stack */}
          <div className="relative grid h-full grid-rows-3 gap-2 p-3">
            {PANELS.map((p, i) => {
              const on = panelStep > i;
              const focused = stage >= 3 && i === PANELS.length - 1;
              return (
                <div
                  key={i}
                  className="relative overflow-hidden border-2 border-foreground bg-card comic-shadow-ink"
                  style={{
                    transform: on
                      ? `translateX(0) rotate(${p.tilt}deg) scale(${focused ? 1.04 : 1})`
                      : `translateX(${i % 2 ? "120%" : "-120%"}) rotate(${p.tilt * 2}deg)`,
                    opacity: on ? 1 : 0,
                    transition: "transform 550ms cubic-bezier(.6,0,.2,1), opacity 300ms ease",
                  }}
                >
                  <img
                    src={p.img}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-85 mix-blend-screen contrast-125 saturate-150"
                  />
                  <div className="bg-halftone-dense absolute inset-0 opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

                  {/* sub label */}
                  <div className="absolute left-2 top-2 border border-foreground bg-background px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.25em]">
                    {p.sub}
                  </div>

                  {/* ink underline drawing itself */}
                  <svg className="absolute inset-x-3 bottom-12 h-1" viewBox="0 0 200 4" preserveAspectRatio="none">
                    <line
                      x1="0"
                      y1="2"
                      x2="200"
                      y2="2"
                      stroke="var(--color-primary)"
                      strokeWidth="2"
                      strokeDasharray="200"
                      strokeDashoffset={on ? 0 : 200}
                      style={{ transition: "stroke-dashoffset 700ms ease-out 150ms" }}
                    />
                  </svg>

                  {/* caption with typewriter */}
                  <div className="absolute inset-x-3 bottom-2 border-2 border-foreground bg-background/95 px-3 py-1.5">
                    <div className="font-comic text-sm leading-tight text-foreground sm:text-base">
                      {on ? <Typewriter text={p.cap} active={on} delay={120} /> : ""}
                    </div>
                  </div>

                  {/* SFX word flying in */}
                  {on && (
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 font-splash text-2xl text-primary drop-shadow-[2px_2px_0_var(--color-foreground)] sm:text-3xl"
                      style={{ animation: "sfxFly 0.5s cubic-bezier(.34,1.56,.64,1) 180ms both" }}
                    >
                      {p.sfx}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============== ACT 4 — Splash overlay ============== */}
      <div
        className="pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-300"
        style={{ opacity: stage >= 3 ? 1 : 0, zIndex: 20 }}
      >
        {/* subtle vignette instead of harsh flash */}
        <div
          className="absolute inset-0 bg-gradient-radial from-primary/15 via-transparent to-background/60"
          style={{
            opacity: stage === 3 ? 1 : 0,
            transition: "opacity 400ms ease",
          }}
        />
        <div
          className={`relative ${stage >= 3 ? "animate-[scale-in_.45s_cubic-bezier(.34,1.56,.64,1)]" : ""}`}
        >
          <svg viewBox="0 0 600 600" className="h-[78vmin] w-[78vmin]">
            <polygon
              points="300,10 340,80 420,40 410,130 500,140 440,210 530,260 440,290 510,360 420,360 450,450 360,420 350,510 300,440 250,510 240,420 170,450 200,360 110,360 180,290 90,260 180,210 120,140 210,130 200,40 280,80"
              fill="var(--color-primary)"
              stroke="var(--color-foreground)"
              strokeWidth="6"
              strokeLinejoin="round"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-primary-foreground">
                ENTER
              </div>
              <div className="font-splash text-[11vmin] leading-none text-primary-foreground drop-shadow-[3px_3px_0_var(--color-foreground)]">
                HACKOTHSAVA!
              </div>
              <div className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary-foreground">
                2K26 · THE STORY BEGINS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============== HUD bottom — progress + page indicator ============== */}
      <div className="absolute inset-x-0 bottom-6 z-30 mx-auto flex w-[min(92vw,1100px)] items-center justify-between gap-4 px-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>
          PAGE{" "}
          <span className="text-primary">
            {String(Math.min(panelStep + (stage >= 1 ? 1 : 0), PANELS.length + 1)).padStart(2, "0")}
          </span>
          /04
        </span>
        <div className="relative hidden h-2 flex-1 max-w-md border-2 border-foreground bg-background sm:block">
          <div
            className="h-full bg-primary transition-[width] duration-500 ease-out"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
          <div className="bg-stripes pointer-events-none absolute inset-0 opacity-30" />
        </div>
        <span className="text-primary">{stage >= 3 ? "READY_" : "BOOTING_"}</span>
      </div>
    </div>
  );
}