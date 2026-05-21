import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { HudButton, HudCrosshair, SectionTag } from "@/components/hud";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
});

const FAQS = [
  {
    q: "Who can participate?",
    a: "Any current college student — undergrad, postgrad, diploma. Bring a valid student ID. Teams can be cross-college. Ages 18+.",
  },
  {
    q: "Is it actually free?",
    a: "Yes. Zero registration fee. Meals, swag, internet, and floor access are covered for the entire 36-hour window.",
  },
  {
    q: "Do I need a team before I register?",
    a: "No. Solo applicants can register and form teams in our Discord intake channel. Teams of 2–4 members are accepted.",
  },
  {
    q: "What should I build?",
    a: "Anything aligned with your declared track — AI, Web3, Full-Stack, or Hardware. Cross-track hybrids are encouraged. No prior IP allowed; the work happens on the floor.",
  },
  {
    q: "Is it online or in-person?",
    a: "Phase 3 (the 36-hour main hackathon) is strictly in-person at our Sector-7 venue. Phases 1 and 2 are fully remote.",
  },
  {
    q: "What gear should I bring?",
    a: "Your laptop, charger, and any hardware your build needs. We supply power, monitors on request, a mentor pool, and obscene amounts of coffee.",
  },
  {
    q: "How are projects judged?",
    a: "Four axes: technical depth, originality, execution polish, and on-stage clarity. Equal weighting. Mentor scores feed into the finals selection.",
  },
  {
    q: "Can I use external APIs and libraries?",
    a: "Absolutely. Any public API, open-source library, or AI tool is fair game. Just disclose it in your README and on stage.",
  },
];

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SiteLayout>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <SectionTag id="// 05" label="Signal Repository" />
          <div className="mt-6 grid items-end gap-8 md:grid-cols-12">
            <h1 className="md:col-span-7 font-display text-6xl font-bold leading-[0.92] tracking-tight md:text-8xl">
              QUERIES
              <br />
              <span className="text-primary text-glow">/ANSWERED_</span>
            </h1>
            <p className="md:col-span-5 font-display text-base leading-relaxed text-muted-foreground">
              The shortlist. If your question isn't in the log, ping ops on Discord — humans answer there in under an hour.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1100px] px-6">
          <ul className="space-y-3">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className={`group relative w-full border bg-card/40 text-left transition-colors ${
                      isOpen ? "border-primary/70" : "border-border/70 hover:border-primary/40"
                    }`}
                  >
                    <span className="pointer-events-none absolute -left-px -top-px h-2.5 w-2.5 border-l border-t border-primary" />
                    <span className="pointer-events-none absolute -right-px -top-px h-2.5 w-2.5 border-r border-t border-primary" />
                    <span className="pointer-events-none absolute -bottom-px -left-px h-2.5 w-2.5 border-b border-l border-primary" />
                    <span className="pointer-events-none absolute -bottom-px -right-px h-2.5 w-2.5 border-b border-r border-primary" />
                    <div className="flex items-center gap-6 px-6 py-5">
                      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                        Q.{String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-lg font-semibold tracking-tight md:text-xl">
                        {f.q}
                      </span>
                      <span
                        className={`grid h-7 w-7 place-items-center border border-border transition-all ${
                          isOpen ? "rotate-45 border-primary bg-primary/10 text-primary" : "text-muted-foreground"
                        }`}
                      >
                        +
                      </span>
                    </div>
                    <div
                      className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="min-h-0">
                        <div className="border-t border-border/60 px-6 py-5">
                          <div className="flex items-start gap-6">
                            <HudCrosshair className="mt-1 h-3.5 w-3.5 shrink-0" />
                            <p className="font-display text-base leading-relaxed text-muted-foreground">
                              {f.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-16 flex flex-col items-center gap-4 border-t border-border/60 pt-12 text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              // STILL TRANSMITTING?
            </div>
            <div className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Open a channel.
            </div>
            <HudButton href="mailto:ops@hackothsava.io">Contact Ops →</HudButton>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}