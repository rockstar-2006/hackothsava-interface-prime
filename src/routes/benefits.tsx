import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";
import { SiteHeader } from "@/components/site-layout";
import { ItineraryBuilder } from "@/components/benefits/itinerary-builder";
import { CoastalMap } from "@/components/benefits/coastal-map";
import hero from "@/assets/benefit-hero-ocean.jpg";
import underwater from "@/assets/benefit-underwater.jpg";
import temple from "@/assets/benefit-temple.jpg";
import culture from "@/assets/benefit-culture.jpg";
import island from "@/assets/benefit-island.jpg";
import stay from "@/assets/benefit-stay.jpg";

export const Route = createFileRoute("/benefits")({
  head: () => ({
    meta: [
      { title: "Beyond the Build — Hackothsava Coastal Experience | Udupi" },
      {
        name: "description",
        content:
          "Hackothsava isn't just a hackathon — it's a coastal escape. Discover Udupi's beaches under 6km, temples, living culture and budget stays once you ship your build.",
      },
      { property: "og:title", content: "Beyond the Build — A Coastal Hackathon in Udupi" },
      {
        property: "og:description",
        content:
          "Beaches, temples, culture and cheap stays — explore what makes Hackothsava a trip, not just a hackathon.",
      },
      { property: "og:image", content: hero },
    ],
  }),
  component: BenefitsPage,
});

/* ---------------- Aquatic palette (scoped to this page) ----------------
   deepest: #021726  abyss: #042a43  ocean: #0a4d68  reef: #088395
   aqua:    #05c5d8  foam:  #b9f6ff  sand:  #ffdba1  coral: #ff7a5c
----------------------------------------------------------------------- */

/* ============================ Helpers ============================ */

function Bubbles({ count = 22 }: { count?: number }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 26,
        delay: Math.random() * 8,
        dur: 9 + Math.random() * 12,
        drift: (Math.random() - 0.5) * 80,
        opacity: 0.08 + Math.random() * 0.22,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="aq-bubble absolute bottom-[-60px] rounded-full"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
            // @ts-expect-error custom prop
            "--drift": `${b.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

function WaveDivider({ flip = false, from }: { flip?: boolean; from: string }) {
  return (
    <div
      className="relative -mb-px w-full leading-[0]"
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[70px] w-full md:h-[110px]"
      >
        <path
          fill={from}
          d="M0,64 C180,110 360,20 540,40 C720,60 900,118 1080,98 C1260,78 1380,30 1440,44 L1440,120 L0,120 Z"
          opacity="0.55"
        />
        <path
          fill={from}
          d="M0,86 C200,40 420,118 640,96 C880,72 1060,18 1280,52 C1360,64 1410,80 1440,86 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Chapter({ n, label }: { n: string; label: string }) {
  return (
    <Reveal>
      <div className="inline-flex items-center gap-3 rounded-full border border-[#05c5d8]/40 bg-[#021726]/40 px-4 py-1.5 backdrop-blur">
        <span className="font-mono text-[11px] tracking-[0.35em] text-[#05c5d8]">
          {n}
        </span>
        <span className="h-px w-7 bg-[#05c5d8]/50" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#b9f6ff]/80">
          {label}
        </span>
      </div>
    </Reveal>
  );
}

/* ============================ Data ============================ */

const BEACHES = [
  {
    name: "Malpe Beach",
    dist: "5.4 km",
    img: hero,
    note: "Golden sand, banana-boat rides & the jetty to St Mary's. Sunsets that end the scroll.",
    tag: "Surf · Sunset",
  },
  {
    name: "Delta Beach",
    dist: "5.9 km",
    img: island,
    note: "A quiet sand-spit where the river meets the sea. Almost nobody knows it exists.",
    tag: "Hidden · Calm",
  },
  {
    name: "Pithrody Beach",
    dist: "4.2 km",
    img: underwater,
    note: "Untouched local shoreline. Bring chai, leave footprints, take nothing.",
    tag: "Local · Raw",
  },
];

const PLACES = [
  {
    name: "Sri Krishna Matha",
    img: temple,
    blurb:
      "The 800-year-old heart of Udupi. Glimpse Lord Krishna through the silver Navagraha window — a ritual found nowhere else on earth.",
    meta: "Spiritual · 0 km from old town",
  },
  {
    name: "St Mary's Island",
    img: island,
    blurb:
      "Hexagonal basalt columns formed by ancient lava — a geological wonder reached by a short boat ride from Malpe.",
    meta: "Geo-wonder · boat from Malpe",
  },
  {
    name: "Kaup Lighthouse",
    img: hero,
    blurb:
      "Climb the 100-year-old tower for a 360° view of the Arabian Sea crashing on black rocks at dusk.",
    meta: "Viewpoint · coastal road",
  },
];

const CULTURE = [
  {
    title: "Bhoota Kola",
    desc: "A trance ritual of spirit-worship — drums, fire and a performer who becomes the deity through the night.",
    icon: "🔥",
  },
  {
    title: "Yakshagana",
    desc: "Dusk-to-dawn folk theatre: thunderous makeup, towering crowns and mythology sung at full volume.",
    icon: "🎭",
  },
  {
    title: "Paryaya & Pooja",
    desc: "The grand handover festival of the Matha — a sea of lamps, chants and a town that never sleeps.",
    icon: "🪔",
  },
  {
    title: "Udupi Cuisine",
    desc: "The birthplace of the masala dosa. Banana-leaf meals, filter coffee and Goli baje after the demo.",
    icon: "🍛",
  },
];

const STAYS = [
  { name: "Sea Breeze Hostel", price: "₹399", per: "/ bed / night", perk: "200 m from Malpe sand", rating: "4.6" },
  { name: "Matha View Lodge", price: "₹650", per: "/ room / night", perk: "Walk to Krishna Matha", rating: "4.4" },
  { name: "Backpacker's Cove", price: "₹449", per: "/ bunk / night", perk: "Rooftop + free bikes", rating: "4.7" },
  { name: "Coconut Homestay", price: "₹800", per: "/ room / night", perk: "Home food, beach view", rating: "4.8" },
];

/* ============================ Page ============================ */

function BenefitsPage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: heroProg } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProg, [0, 1], ["0%", "35%"]);
  const heroScale = useTransform(heroProg, [0, 1], [1.05, 1.25]);
  const heroFade = useTransform(heroProg, [0, 0.8], [1, 0]);

  // global page scroll for the depth meter
  const { scrollYProgress } = useScroll();
  const depth = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const depthLabel = useTransform(depth, (v) => `${Math.round(v * 1000)} m`);

  return (
    <div className="relative min-h-screen bg-[#021726] text-[#eafcff] antialiased">
      <SiteHeader />

      {/* depth meter */}
      <DepthMeter depth={depth} label={depthLabel} />

      {/* ============ HERO ============ */}
      <section ref={heroRef} className="relative h-[100svh] overflow-hidden">
        <motion.img
          src={hero}
          alt="Aerial view of a golden Udupi beach at sunset"
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#021726]/30 via-[#021726]/25 to-[#021726]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#021726]/60 to-transparent" />
        <Bubbles count={18} />

        <motion.div
          style={{ opacity: heroFade }}
          className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[11px] uppercase tracking-[0.5em] text-[#05c5d8]"
          >
            Hackothsava ::2K26 — The Other Story
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-8xl"
          >
            It&apos;s not just a
            <br />
            hackathon.{" "}
            <span className="bg-gradient-to-r from-[#05c5d8] via-[#7ee8fa] to-[#ffdba1] bg-clip-text text-transparent">
              It&apos;s a coastline.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-[#b9f6ff]/85"
          >
            You came to Udupi to build for 36 hours. You&apos;ll leave with
            sunburn, temple bells in your head and the best dosa of your life.
            Scroll to dive in.
          </motion.p>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          style={{ opacity: heroFade }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-[#b9f6ff]/70"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em]">
              Dive
            </span>
            <span className="grid h-9 w-6 place-items-start rounded-full border border-[#b9f6ff]/40 p-1">
              <motion.span
                animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-[#05c5d8]"
              />
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ============ INTRO BAND ============ */}
      <section className="relative bg-[#021726] py-24">
        <div className="mx-auto max-w-[1100px] px-6 text-center">
          <Reveal>
            <p className="mx-auto max-w-3xl font-display text-2xl leading-relaxed text-[#eafcff] md:text-4xl">
              Our campus sits in{" "}
              <span className="text-[#05c5d8]">Udupi</span> — a temple town on
              India&apos;s west coast where the{" "}
              <span className="text-[#ffdba1]">Arabian Sea</span> is closer than
              the food court.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-base text-[#b9f6ff]/70">
              For everyone travelling in from outside Karnataka, this page is
              your travel guide. Four chapters. One unforgettable trip.
            </p>
          </Reveal>
        </div>
      </section>

      <WaveDivider from="#042a43" />

      {/* ============ CH 01 — BEACHES ============ */}
      <section className="relative bg-[#042a43] py-24">
        <Bubbles count={14} />
        <div className="relative mx-auto max-w-[1400px] px-6">
          <div className="flex flex-col gap-5">
            <Chapter n="CH·01" label="The Shore" />
            <Reveal>
              <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1] tracking-tight md:text-6xl">
                Six beaches.{" "}
                <span className="text-[#05c5d8]">All under 6 km.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-[#b9f6ff]/75">
                The moment your final commit lands, the sea is a 10-minute auto
                ride away. Here&apos;s where the cracked teams go to celebrate.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {BEACHES.map((b, i) => (
              <Reveal key={b.name} delay={i * 0.12}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  className="group relative h-[420px] overflow-hidden rounded-2xl border border-[#05c5d8]/20"
                >
                  <img
                    src={b.img}
                    alt={b.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#021726] via-[#021726]/40 to-transparent" />
                  <div className="absolute right-4 top-4 rounded-full border border-[#b9f6ff]/30 bg-[#021726]/60 px-3 py-1 font-mono text-[11px] tracking-widest text-[#05c5d8] backdrop-blur">
                    {b.dist}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffdba1]">
                      {b.tag}
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-bold">
                      {b.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#b9f6ff]/80">
                      {b.note}
                    </p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from="#0a4d68" />

      {/* ============ CH 02 — TEMPLES & WONDERS ============ */}
      <section className="relative bg-[#0a4d68] py-24">
        <div className="relative mx-auto max-w-[1400px] px-6">
          <div className="flex flex-col gap-5">
            <Chapter n="CH·02" label="The Sacred" />
            <Reveal>
              <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1] tracking-tight md:text-6xl">
                Temples, towers &amp;{" "}
                <span className="text-[#ffdba1]">lava islands.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 space-y-6">
            {PLACES.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <article
                  className={`grid items-stretch gap-0 overflow-hidden rounded-2xl border border-[#b9f6ff]/15 bg-[#021726]/40 md:grid-cols-2 ${
                    i % 2 === 1 ? "md:[direction:rtl]" : ""
                  }`}
                >
                  <div className="relative h-64 overflow-hidden md:h-80 md:[direction:ltr]">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#021726]/30" />
                  </div>
                  <div className="flex flex-col justify-center gap-4 p-8 md:[direction:ltr] md:p-12">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#05c5d8]">
                      {p.meta}
                    </span>
                    <h3 className="font-display text-3xl font-bold">{p.name}</h3>
                    <p className="max-w-md leading-relaxed text-[#b9f6ff]/80">
                      {p.blurb}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from="#088395" />

      {/* ============ CH 03 — CULTURE ============ */}
      <section className="relative overflow-hidden bg-[#088395] py-24">
        <Bubbles count={16} />
        <div className="relative mx-auto max-w-[1400px] px-6">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="flex flex-col gap-5 md:col-span-7">
              <Chapter n="CH·03" label="The Living Culture" />
              <Reveal>
                <h2 className="font-display text-4xl font-bold leading-[1] tracking-tight md:text-6xl">
                  A town that{" "}
                  <span className="text-[#021726]">performs</span> after dark.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="md:col-span-5">
              <p className="text-[#eafcff]/90">
                Udupi is dense with ritual — spirit dances, all-night theatre,
                lamp-lit festivals and food worth its own pilgrimage. Catch one
                and the hackathon becomes the side quest.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal className="md:row-span-2">
              <div className="relative h-full min-h-[300px] overflow-hidden rounded-2xl border border-[#021726]/30">
                <img
                  src={culture}
                  alt="Yakshagana folk performer in vivid costume"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021726]/70 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="font-display text-2xl font-bold text-[#eafcff]">
                    Yakshagana nights
                  </p>
                  <p className="font-mono text-[11px] tracking-widest text-[#ffdba1]">
                    DUSK → DAWN
                  </p>
                </div>
              </div>
            </Reveal>

            {CULTURE.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="flex h-full items-start gap-4 rounded-2xl border border-[#eafcff]/15 bg-[#021726]/30 p-6 backdrop-blur"
                >
                  <span className="text-3xl">{c.icon}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#eafcff]">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#eafcff]/80">
                      {c.desc}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from="#042a43" />

      {/* ============ CH 04 — STAYS ============ */}
      <section className="relative bg-[#042a43] py-24">
        <div className="relative mx-auto max-w-[1400px] px-6">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="flex flex-col gap-5 md:col-span-6">
              <Chapter n="CH·04" label="The Rest" />
              <Reveal>
                <h2 className="font-display text-4xl font-bold leading-[1] tracking-tight md:text-6xl">
                  Crash cheap.{" "}
                  <span className="text-[#05c5d8]">Wake up to waves.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-md text-[#b9f6ff]/75">
                  Student-friendly stays a short ride from campus and the coast.
                  Prices are indicative — book early, the good bunks vanish fast.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="md:col-span-6">
              <div className="relative h-72 overflow-hidden rounded-2xl border border-[#05c5d8]/20">
                <img
                  src={stay}
                  alt="Cozy budget beach room with ocean view"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021726]/50 to-transparent" />
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STAYS.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  className="flex h-full flex-col rounded-2xl border border-[#05c5d8]/20 bg-[#021726]/50 p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#05c5d8]/15 px-2.5 py-1 font-mono text-[10px] tracking-widest text-[#05c5d8]">
                      ★ {s.rating}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b9f6ff]/50">
                      Stay·{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#b9f6ff]/70">{s.perk}</p>
                  <div className="mt-auto pt-6">
                    <span className="font-display text-3xl font-bold text-[#ffdba1]">
                      {s.price}
                    </span>
                    <span className="ml-1 text-xs text-[#b9f6ff]/60">
                      {s.per}
                    </span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINALE / CTA ============ */}
      <section className="relative overflow-hidden bg-[#021726] py-32">
        <img
          src={underwater}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <Bubbles count={24} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#021726]/60 via-[#021726]/40 to-[#021726]" />
        <div className="relative mx-auto max-w-[900px] px-6 text-center">
          <Reveal>
            <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              Build hard.
              <br />
              <span className="bg-gradient-to-r from-[#05c5d8] to-[#ffdba1] bg-clip-text text-transparent">
                Then come up for air.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[#b9f6ff]/80">
              Hackothsava is the only hackathon where the after-party is a whole
              coastline. Ship your project, then go find the sea.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#register"
                className="rounded-full bg-[#05c5d8] px-8 py-4 font-mono text-[12px] font-bold uppercase tracking-[0.25em] text-[#021726] transition-transform hover:scale-105"
              >
                Register & Pack a Towel
              </a>
              <Link
                to="/gallery"
                className="rounded-full border border-[#b9f6ff]/30 px-8 py-4 font-mono text-[12px] font-bold uppercase tracking-[0.25em] text-[#eafcff] transition-colors hover:bg-[#eafcff]/10"
              >
                See the Floor
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* scoped aquatic keyframes */}
      <style>{`
        .aq-bubble {
          background: radial-gradient(circle at 30% 30%, rgba(185,246,255,0.9), rgba(5,197,216,0.15));
          box-shadow: inset 0 0 6px rgba(255,255,255,0.4);
          animation-name: aq-rise;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
        }
        @keyframes aq-rise {
          0%   { transform: translate(0, 0) scale(0.6); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.8; }
          100% { transform: translate(var(--drift, 0), -110vh) scale(1); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aq-bubble { animation: none; display: none; }
        }
      `}</style>
    </div>
  );
}

function DepthMeter({
  depth,
  label,
}: {
  depth: MotionValue<number>;
  label: MotionValue<string>;
}) {
  const height = useTransform(depth, [0, 1], ["0%", "100%"]);
  return (
    <div className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#05c5d8]/70">
        Depth
      </span>
      <div className="relative h-48 w-1.5 overflow-hidden rounded-full bg-[#b9f6ff]/15">
        <motion.div
          style={{ height }}
          className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-[#05c5d8] to-[#ffdba1]"
        />
      </div>
      <motion.span className="font-mono text-[10px] tabular-nums tracking-widest text-[#b9f6ff]/80">
        {label}
      </motion.span>
    </div>
  );
}