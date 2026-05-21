import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { HudFrame, SectionTag, HudCrosshair } from "@/components/hud";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

const SHOTS = [
  { img: g6, label: "OPS-DECK / 03:42", title: "Floor at peak hour", span: "md:col-span-2 md:row-span-2" },
  { img: g1, label: "TEAM-09 / DEEP-NIGHT", title: "Squad in the zone", span: "md:col-span-2" },
  { img: g2, label: "DEMO-ROOM / D-2", title: "Pitch rehearsal" },
  { img: g4, label: "INPUT / HW-04", title: "Mechanical input layer" },
  { img: g3, label: "STAGE / FINALE", title: "Awards moment", span: "md:col-span-2" },
  { img: g5, label: "MENTOR / WB-2", title: "Architecture review" },
];

const TIERS = [
  { code: "T·∞", name: "TERA BYTES", slots: ["VECTORLABS", "AXIOM/OS", "PROTO·9"] },
  { code: "T·M", name: "GIGA BYTES", slots: ["NEOGRID", "HEXNODE", "ASCII.IO", "DARK-MATTER"] },
  { code: "T·m", name: "MEGA BYTES", slots: ["COREDUMP", "NULL.SH", "LOOP/IO", "STATIC", "ECHO·LAB", "MONO·9"] },
];

function GalleryPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <SectionTag id="// 04" label="Archive · Past Cycles" />
          <div className="mt-6 grid items-end gap-8 md:grid-cols-12">
            <h1 className="md:col-span-7 font-comic text-6xl leading-[0.9] md:text-8xl">
              FROM THE
              <br />
              <span className="font-splash text-[1.15em] text-primary text-ink-stroke">FLOOR!</span>
            </h1>
            <p className="md:col-span-5 font-display text-base leading-relaxed text-muted-foreground">
              Stills from past sprints — late-night commits, midnight pitches,
              and the moment a build finally compiles. The grid remembers.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-b border-border/60 py-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[260px]">
            {SHOTS.map((s, i) => (
              <HudFrame key={i} label={`// ${s.label}`} serial={`F.${String(i + 1).padStart(2, "0")}`} className={`group ${s.span ?? ""}`}>
                <div className="relative h-full overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <span className="font-display text-sm font-semibold tracking-tight">
                      {s.title}
                    </span>
                    <HudCrosshair className="h-3 w-3 opacity-70" />
                  </div>
                </div>
              </HudFrame>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor tiers */}
      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionTag id="// 04.B" label="Supply Lines" />
              <h2 className="mt-4 font-comic text-5xl leading-[0.92] md:text-6xl">
                SPONSOR
                <br />
                <span className="font-splash text-[1.15em] text-primary text-ink-stroke">TIERS!</span>
              </h2>
            </div>
            <p className="max-w-sm font-display text-base leading-relaxed text-muted-foreground">
              Three tiers of partnership keep the grid online. Reach out to ops to plug in
              for the 2K26 cycle.
            </p>
          </div>

          <div className="mt-16 space-y-8">
            {TIERS.map((tier) => (
              <HudFrame key={tier.code} label={`// ${tier.code}`} serial={tier.name}>
                <div className="grid items-center gap-0 md:grid-cols-12">
                  <div className="border-b border-border/60 p-6 md:col-span-3 md:border-b-0 md:border-r md:p-8">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                      // {tier.code}
                    </div>
                    <div className="mt-3 font-display text-3xl font-bold leading-none tracking-tight md:text-4xl">
                      {tier.name}
                    </div>
                    <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {tier.slots.length} slots active
                    </div>
                  </div>
                  <div className="md:col-span-9">
                    <div className="grid grid-cols-2 gap-px bg-border/60 sm:grid-cols-3 md:grid-cols-4">
                      {tier.slots.map((s) => (
                        <div
                          key={s}
                          className="grid h-24 place-items-center bg-background font-display text-sm font-bold tracking-[0.2em] text-muted-foreground transition-colors hover:bg-primary/[0.06] hover:text-foreground"
                        >
                          {s}
                        </div>
                      ))}
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