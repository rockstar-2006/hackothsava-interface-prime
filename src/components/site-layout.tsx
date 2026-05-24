import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { HudButton, HudCrosshair, HudFrame } from "./hud";
import { ComicLoader } from "./comic-loader";
import heroCitadel from "@/assets/hero-citadel.jpg";
import galleryBg from "@/assets/gallery-3.jpg";
import trackWeb3 from "@/assets/track-web3.jpg";

const NAV = [
  { to: "/", label: "Index" },
  { to: "/timeline", label: "Timeline" },
  { to: "/prizes", label: "Tracks" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "FAQ" },
];

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2">
      <span className="grid h-7 w-7 place-items-center border border-primary text-primary">
        <span className="font-mono text-[11px] font-bold">H/</span>
      </span>
      <span className="font-display text-sm font-bold tracking-[0.2em]">
        HACKOTHSAVA
      </span>
      <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground group-hover:text-primary">
        ::2K26
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-primary" />
                )}
                <span className="mr-2 text-primary/50 group-hover:text-primary">
                  /{String(NAV.indexOf(item) + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground lg:inline">
            STATUS / <span className="text-primary">ARMED</span>
          </span>
          <HudButton to="#register">
            <HudCrosshair className="h-3.5 w-3.5" />
            Register Now
          </HudButton>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const ref = useRef<HTMLElement | null>(null);
  // -1 (footer below viewport) → 0 (centered) → 1 (above viewport)
  const [p, setP] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress: 0 when footer top hits bottom of viewport, 1 when bottom hits top
      const range = rect.height + vh;
      const raw = (vh - rect.top) / range;
      const clamped = Math.max(0, Math.min(1, raw));
      // map 0..1 → -1..1
      setP(clamped * 2 - 1);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <footer
      ref={ref}
      className="relative mt-32 overflow-hidden border-t-2 border-foreground [perspective:1200px]"
    >
      {/* Background illustration */}
      <div className="pointer-events-none absolute inset-0 -z-0 [transform-style:preserve-3d]">
        <img
          src={heroCitadel}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-[0.30] mix-blend-screen contrast-125 saturate-0 will-change-transform transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(0, ${p * -18}px, 0) scale(1.06) rotateX(${p * -1.2}deg)`,
          }}
        />
        <img
          src={galleryBg}
          alt=""
          aria-hidden
          className="absolute -right-24 -bottom-16 h-[520px] w-[560px] object-cover opacity-[0.65] mix-blend-screen contrast-150 saturate-150 will-change-transform transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${p * 22}px, ${p * -36}px, 0) rotate(${p * 1.4}deg)`,
          }}
        />
        <img
          src={trackWeb3}
          alt=""
          aria-hidden
          className="absolute -left-20 -bottom-16 h-[500px] w-[520px] object-cover opacity-[0.6] mix-blend-screen contrast-150 saturate-150 will-change-transform transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${p * -26}px, ${p * -28}px, 0) rotate(${-3 + p * -1.6}deg)`,
          }}
        />
        {/* Soft top-fade only, keep illustrations bold */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-background/20 to-background/60" />
        <div className="bg-halftone-dense absolute inset-0 opacity-[0.25]" />
        <div className="bg-scan absolute inset-0 opacity-40" />
        {/* Comic burst graphic */}
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="absolute -right-10 top-10 h-64 w-64 opacity-30 will-change-transform transition-transform duration-200 ease-out"
          style={{ transform: `translate3d(${p * 14}px, ${p * -10}px, 0) rotate(${p * 8}deg)` }}
        >
          <polygon
            points="100,4 118,32 152,16 148,54 192,60 162,90 196,118 156,124 168,164 128,158 120,196 100,168 80,196 72,158 32,164 44,124 4,118 38,90 8,60 52,54 48,16 82,32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
        </svg>
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="absolute -left-16 top-1/2 h-72 w-72 opacity-25 will-change-transform transition-transform duration-200 ease-out"
          style={{
            transform: `translate(-0px, -50%) translate3d(${p * -12}px, ${p * 8}px, 0) rotate(${p * -6}deg)`,
          }}
        >
          <polygon
            points="100,10 112,40 150,30 140,68 184,72 158,100 188,128 150,128 158,168 122,156 110,190 100,164 90,190 78,156 42,168 50,128 12,128 42,100 16,72 60,68 50,30 88,40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="text-foreground"
          />
        </svg>
      </div>
      <div className="relative mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <HudFrame
            tone="accent"
            label="// TRANSMISSION"
            serial="FRAME-01"
            className="md:col-span-5 bg-background/92 backdrop-blur-sm"
          >
            <div className="p-7">
              <div className="font-display text-4xl font-bold leading-none tracking-tight md:text-6xl">
                END OF
                <br />
                <span className="text-primary text-glow">TRANSMISSION_</span>
              </div>
              <p className="mt-6 max-w-md font-mono text-xs leading-relaxed text-muted-foreground">
                The signal stays open. Push commits, push limits.
                Hackothsava broadcasts from the edge of the grid — see you on the floor.
              </p>
            </div>
          </HudFrame>

          <HudFrame
            tone="accent"
            label="// NAVIGATE"
            serial="FRAME-02"
            className="md:col-span-3 bg-background/92 backdrop-blur-sm"
          >
            <ul className="space-y-2.5 p-7">
              {NAV.map((n, i) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="group flex items-baseline gap-2 font-display text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span className="font-mono text-[10px] text-primary/60 group-hover:text-primary">
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                    <span>→ {n.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </HudFrame>

          <HudFrame
            tone="accent"
            label="// CHANNELS"
            serial="FRAME-03"
            className="md:col-span-4 bg-background/92 backdrop-blur-sm"
          >
            <ul className="space-y-1 p-7 font-display text-sm text-muted-foreground">
              {[
                { k: "Discord", v: "/join" },
                { k: "GitHub", v: "/hackothsava" },
                { k: "Instagram", v: "@hackothsava" },
                { k: "Mail", v: "ops@hackothsava.io" },
              ].map((c, i, a) => (
                <li
                  key={c.k}
                  className={`flex items-center justify-between py-2 ${
                    i < a.length - 1 ? "border-b border-border/50" : ""
                  }`}
                >
                  <span>{c.k}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                    {c.v}
                  </span>
                </li>
              ))}
            </ul>
          </HudFrame>
        </div>

        <HudFrame
          tone="accent"
          label="// SYSTEM"
          serial="EOF"
          className="mt-8 bg-background/92 backdrop-blur-sm"
        >
          <div className="flex flex-col items-start justify-between gap-2 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex-row md:items-center">
            <span>© 2026 HACKOTHSAVA · ALL CHANNELS RESERVED</span>
            <span>SECTOR-7 // BUILD 26.04.01 // SIG: 0xA3F-9921</span>
          </div>
        </HudFrame>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ComicLoader />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}