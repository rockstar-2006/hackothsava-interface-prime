import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { HudButton, HudCrosshair } from "./hud";
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
  return (
    <footer className="relative mt-32 overflow-hidden border-t-2 border-foreground">
      {/* Background illustration */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <img
          src={heroCitadel}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-[0.55] mix-blend-screen contrast-150 saturate-150"
        />
        <img
          src={galleryBg}
          alt=""
          aria-hidden
          className="absolute -right-32 -bottom-10 h-[520px] w-[620px] object-cover opacity-[0.6] mix-blend-screen contrast-150 saturate-150"
        />
        <img
          src={trackWeb3}
          alt=""
          aria-hidden
          className="absolute -left-24 -bottom-16 h-[460px] w-[540px] object-cover opacity-[0.55] mix-blend-screen contrast-150 saturate-200 -rotate-3"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-background/20" />
        <div className="bg-halftone-dense absolute inset-0 opacity-[0.45]" />
        <div className="bg-scan absolute inset-0 opacity-40" />
        {/* Comic burst graphic */}
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="absolute -right-10 top-10 h-64 w-64 opacity-30"
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
          className="absolute -left-16 top-1/2 h-72 w-72 -translate-y-1/2 opacity-25"
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
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
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
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              // Navigate
            </div>
            <ul className="mt-5 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="font-display text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    → {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              // Channels
            </div>
            <ul className="mt-5 space-y-2.5 font-display text-sm text-muted-foreground">
              <li className="flex items-center justify-between border-b border-border/50 py-2">
                <span>Discord</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">/join</span>
              </li>
              <li className="flex items-center justify-between border-b border-border/50 py-2">
                <span>GitHub</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">/hackothsava</span>
              </li>
              <li className="flex items-center justify-between border-b border-border/50 py-2">
                <span>Instagram</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">@hackothsava</span>
              </li>
              <li className="flex items-center justify-between py-2">
                <span>Mail</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">ops@hackothsava.io</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex-row md:items-center">
          <span>© 2026 HACKOTHSAVA · ALL CHANNELS RESERVED</span>
          <span>SECTOR-7 // BUILD 26.04.01 // SIG: 0xA3F-9921</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}