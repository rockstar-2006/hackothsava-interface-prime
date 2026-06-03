import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
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
      { title: "Beyond the Code — A Coastal Travelogue of Udupi | Hackothsava" },
      {
        name: "description",
        content:
          "Hackothsava isn't just a hackathon — it's a coastal travelogue. Discover Udupi's beaches, the 800-year-old Krishna Matha, St Mary's Island, Yakshagana nights and budget stays.",
      },
      { property: "og:title", content: "Beyond the Code — A Coastal Travelogue of Udupi" },
      {
        property: "og:description",
        content:
          "Beaches, temples, living culture and student-friendly stays — an editorial guide to what makes Hackothsava a trip, not just a hackathon.",
      },
      { property: "og:image", content: island },
    ],
  }),
  component: BenefitsPage,
});

/* ---------------- Ocean Deep editorial palette ----------------
   navy:  #0c2340   slate: #1a4a6e   teal: #2d8a9e   mist: #5cbdb9
   paper: #fdfdfb   wash: #f3f6f7
-------------------------------------------------------------- */

/* ============================ Helpers ============================ */

function Reveal({
  children,
  delay = 0,
  y = 36,
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
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-12 bg-[#5cbdb9]" />
      <p className="font-['Work_Sans'] text-xs font-semibold uppercase tracking-[0.3em] text-[#2d8a9e]">
        {children}
      </p>
    </div>
  );
}

/* ============================ Data ============================ */

const NUMBERED = [
  {
    n: "01",
    title: "The Krishna Matha",
    body: "An 800-year-old temple complex and the beating heart of Udupi. Witness the rituals and the famous silver Kanakana Kindi window — a darshan found nowhere else on earth.",
  },
  {
    n: "02",
    title: "Yakshagana Beats",
    body: "Dynamic dusk-to-dawn folk theatre fusing dance, drums and dialogue — a high-energy spectacle of coastal mythology and towering, vivid costumes.",
  },
];

const STAYS_MINI = [
  { name: "Sea Breeze Hostel", meta: "200 m from sand · ₹399", img: stay },
  { name: "Coconut Homestay", meta: "Home food · beach view · ₹800", img: hero },
];

const DESTINATIONS = [
  {
    name: "Malpe Beach",
    tag: "Shore",
    dist: "5.4 km from campus",
    img: hero,
    blurb:
      "Golden sand, banana-boat rides and the jetty out to St Mary's. Where the cracked teams go to celebrate the final commit.",
  },
  {
    name: "Sri Krishna Matha",
    tag: "Sacred",
    dist: "Old town centre",
    img: temple,
    blurb:
      "The spiritual core of the coast — lamp-lit halls, the rhythm of bells, and a darshan ritual unchanged for eight centuries.",
  },
  {
    name: "St Mary's Island",
    tag: "Nature",
    dist: "Boat from Malpe",
    img: island,
    blurb:
      "Rare hexagonal basalt columns formed by ancient lava, scattered across a quiet shore a short ferry ride off the coast.",
  },
  {
    name: "Kaup Lighthouse",
    tag: "Viewpoint",
    dist: "Coastal road south",
    img: underwater,
    blurb:
      "Climb the century-old tower for a 360° view of the Arabian Sea breaking on black rock at dusk.",
  },
];

/* ============================ Page ============================ */

function BenefitsPage() {
  return (
    <div className="relative min-h-screen bg-[#fdfdfb] font-['Work_Sans'] text-[#0c2340] antialiased">
      <SiteHeader />

      {/* ================= EDITORIAL HERO ================= */}
      <section className="mx-auto w-full max-w-[1320px] px-6 pb-24 pt-16 md:pt-24">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          {/* vertical masthead */}
          <div className="hidden self-stretch border-r border-[#1a4a6e]/10 py-2 md:col-span-1 md:flex md:flex-col md:justify-between">
            <span className="rotate-180 font-['Work_Sans'] text-xs font-semibold uppercase tracking-[0.3em] text-[#2d8a9e] [writing-mode:vertical-lr]">
              Beyond the Code
            </span>
            <span className="rotate-180 font-['Work_Sans'] text-xs font-semibold uppercase tracking-[0.3em] text-[#0c2340]/40 [writing-mode:vertical-lr]">
              Edition 2K26
            </span>
          </div>

          {/* main feature */}
          <div className="space-y-8 md:col-span-7">
            <Reveal>
              <header className="space-y-4">
                <Kicker>The Travelogue</Kicker>
                <h1 className="font-['Instrument_Serif'] text-6xl italic leading-[0.95] md:text-8xl">
                  Udupi: where the
                  <br /> coast{" "}
                  <span className="text-[#1a4a6e]">cradles</span> culture.
                </h1>
              </header>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="group relative">
                <img
                  src={island}
                  alt="St Mary's Island basaltic rock formations at sunrise"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="absolute -bottom-6 right-0 max-w-xs border border-[#1a4a6e]/5 bg-[#fdfdfb] p-6 shadow-2xl md:-right-6">
                  <p className="mb-2 font-['Instrument_Serif'] text-2xl italic leading-tight">
                    The Basaltic Columns
                  </p>
                  <p className="text-xs leading-relaxed text-[#0c2340]/70">
                    Geological wonders at St Mary's Island, formed by
                    sub-volcanic activity millions of years ago.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-8 pt-12 md:grid-cols-2 md:pt-6">
              {NUMBERED.map((item, i) => (
                <Reveal key={item.n} delay={0.1 + i * 0.08}>
                  <div className="space-y-3">
                    <h3 className="font-['Work_Sans'] text-xs font-bold uppercase tracking-[0.2em] text-[#1a4a6e]">
                      {item.n}. {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#0c2340]/80">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* sidebar */}
          <div className="space-y-12 md:col-span-4 md:pl-8">
            {/* culinary block */}
            <Reveal delay={0.15}>
              <div className="relative space-y-6 bg-[#0c2340] p-8 text-white">
                <div className="absolute right-0 top-0 h-16 w-16 bg-[#5cbdb9]/10" />
                <h2 className="font-['Instrument_Serif'] text-4xl italic">
                  The Culinary
                  <br /> Pilgrimage
                </h2>
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-4">
                    <p className="font-semibold text-[#5cbdb9]">Masala Dosa</p>
                    <p className="text-xs leading-relaxed text-white/60">
                      The world-famous recipe originated right here, in local
                      temple kitchens, using pure ghee.
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-4">
                    <p className="font-semibold text-[#5cbdb9]">Goli Baje</p>
                    <p className="text-xs leading-relaxed text-white/60">
                      Soft, fried dough fritters — perfect for a coastal evening
                      by the Malpe shore.
                    </p>
                  </div>
                </div>
                <a
                  href="#map"
                  className="block w-full border border-[#5cbdb9] py-3 text-center font-['Work_Sans'] text-xs font-bold uppercase tracking-[0.2em] text-[#5cbdb9] transition-colors hover:bg-[#5cbdb9] hover:text-[#0c2340]"
                >
                  Food Map
                </a>
              </div>
            </Reveal>

            {/* stays */}
            <Reveal delay={0.2}>
              <div className="space-y-6">
                <div className="flex items-baseline justify-between border-b border-[#0c2340] pb-2">
                  <h2 className="font-['Work_Sans'] text-xs font-bold uppercase tracking-[0.2em]">
                    Hacker Lodging
                  </h2>
                  <span className="font-['Work_Sans'] text-[10px] font-semibold text-[#2d8a9e]">
                    STAYS
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {STAYS_MINI.map((s) => (
                    <a
                      key={s.name}
                      href="#stays"
                      className="group flex items-center gap-4"
                    >
                      <img
                        src={s.img}
                        alt={s.name}
                        className="h-20 w-20 flex-shrink-0 object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold transition-colors group-hover:text-[#2d8a9e]">
                          {s.name}
                        </p>
                        <p className="text-[10px] uppercase tracking-tight text-[#2d8a9e]">
                          {s.meta}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* quote */}
            <Reveal delay={0.25}>
              <div className="border-t border-[#1a4a6e]/10 pt-8">
                <p className="font-['Instrument_Serif'] text-2xl leading-snug text-[#1a4a6e]">
                  "Between the code sprints, let the Arabian Sea breeze clear
                  your mind. This is where innovation meets the ancient."
                </p>
                <p className="mt-4 font-['Work_Sans'] text-xs font-bold uppercase tracking-[0.2em] text-[#5cbdb9]">
                  — Local Organizers
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= DESTINATIONS ================= */}
      <section className="border-t border-[#0c2340]/10 py-20">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <div className="space-y-4">
                <Kicker>The Field Notes</Kicker>
                <h2 className="font-['Instrument_Serif'] text-5xl italic leading-none md:text-7xl">
                  Four landmarks,
                  <br /> one shoreline.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-sm leading-relaxed text-[#0c2340]/70">
                Every beach, temple and island sits within a short auto ride of
                campus. The moment your final commit lands, the coast is yours.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {DESTINATIONS.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.08}>
                <article className="group flex h-full flex-col">
                  <div className="mb-5 aspect-[4/5] overflow-hidden bg-[#1a4a6e]/5">
                    <img
                      src={d.img}
                      alt={d.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="mb-2 font-['Work_Sans'] text-[10px] font-bold uppercase tracking-[0.25em] text-[#2d8a9e]">
                    {d.tag}
                  </span>
                  <h3 className="font-['Instrument_Serif'] text-2xl leading-tight">
                    {d.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#0c2340]/70">
                    {d.blurb}
                  </p>
                  <span className="mt-4 font-['Work_Sans'] text-[11px] italic text-[#0c2340]/40">
                    {d.dist}
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CULTURE SPREAD ================= */}
      <section className="border-t border-[#0c2340]/10 bg-[#f3f6f7] py-20">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <div className="relative">
              <img
                src={culture}
                alt="Yakshagana folk performer in vivid costume"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <span className="absolute bottom-5 left-5 bg-[#0c2340] px-4 py-2 font-['Instrument_Serif'] text-lg italic text-white">
                Yakshagana Nights
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-6 md:pl-6">
            <div className="space-y-6">
              <Kicker>Living Culture</Kicker>
              <h2 className="font-['Instrument_Serif'] text-4xl italic leading-tight md:text-6xl">
                A town that performs after dark.
              </h2>
              <p className="max-w-md text-[#0c2340]/75">
                Udupi is dense with ritual — spirit dances, all-night theatre,
                lamp-lit festivals and food worth its own pilgrimage. Catch one
                and the hackathon quietly becomes the side quest.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-2">
                <div className="border-l-2 border-[#5cbdb9] pl-4">
                  <p className="font-semibold">Bhoota Kola</p>
                  <p className="text-xs text-[#0c2340]/70">
                    A trance ritual of drums, fire and spirit-worship.
                  </p>
                </div>
                <div className="border-l-2 border-[#5cbdb9] pl-4">
                  <p className="font-semibold">Paryaya</p>
                  <p className="text-xs text-[#0c2340]/70">
                    The grand handover festival of the Matha — a sea of lamps.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= INTERACTIVE MAP ================= */}
      <section id="map" className="border-t border-[#0c2340]/10 py-20">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-10 max-w-2xl space-y-4">
            <Kicker>Chart the Coast</Kicker>
            <h2 className="font-['Instrument_Serif'] text-4xl italic leading-tight md:text-6xl">
              Tap a pin. Read the chapter.
            </h2>
            <p className="text-[#0c2340]/70">
              Every beach, temple, island and lighthouse plotted on one coast.
              Click a marker to open its story before you ever pack a bag.
            </p>
          </div>
          <Reveal>
            <CoastalMap />
          </Reveal>
        </div>
      </section>

      {/* ================= ITINERARY BUILDER ================= */}
      <section id="stays" className="border-t border-[#0c2340]/10 bg-[#f3f6f7] py-20">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-10 max-w-2xl space-y-4">
            <Kicker>Build Your Day</Kicker>
            <h2 className="font-['Instrument_Serif'] text-4xl italic leading-tight md:text-6xl">
              Design your perfect coastal day.
            </h2>
            <p className="text-[#0c2340]/70">
              Pick the beaches, culture stops and where you crash — we'll plot a
              timed route with travel buffers and meal breaks. One tap, one full
              day mapped out.
            </p>
          </div>
          <Reveal>
            <ItineraryBuilder />
          </Reveal>
        </div>
      </section>

      {/* ================= FINALE ================= */}
      <section className="relative overflow-hidden border-t border-[#0c2340]/10 bg-[#0c2340] py-28 text-white">
        <img
          src={underwater}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[#0c2340]/70" />
        <div className="relative mx-auto max-w-[900px] px-6 text-center">
          <Reveal>
            <h2 className="font-['Instrument_Serif'] text-5xl italic leading-tight md:text-7xl">
              Build hard. Then come up for air.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-white/70">
              Hackothsava is the only hackathon where the after-party is a whole
              coastline. Ship your project, then go find the sea.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#register"
                className="bg-[#5cbdb9] px-8 py-4 font-['Work_Sans'] text-xs font-bold uppercase tracking-[0.2em] text-[#0c2340] transition-transform hover:scale-105"
              >
                Register &amp; Pack a Towel
              </a>
              <Link
                to="/gallery"
                className="border border-white/30 px-8 py-4 font-['Work_Sans'] text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10"
              >
                See the Floor
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
