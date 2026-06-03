import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import hero from "@/assets/benefit-hero-ocean.jpg";
import island from "@/assets/benefit-island.jpg";
import temple from "@/assets/benefit-temple.jpg";
import underwater from "@/assets/benefit-underwater.jpg";

/* ---- Ocean Deep editorial palette ----
   navy #0c2340 · slate #1a4a6e · teal #2d8a9e · mist #5cbdb9 · paper #fdfdfb */

interface Pin {
  id: string;
  name: string;
  chapter: string;
  type: string;
  x: number;
  y: number;
  color: string;
  img: string;
  dist: string;
  story: string;
}

const PINS: Pin[] = [
  {
    id: "malpe",
    name: "Malpe Beach",
    chapter: "The Shore",
    type: "Beach · Sunset",
    x: 22,
    y: 58,
    color: "#5cbdb9",
    img: hero,
    dist: "5.4 km from campus",
    story:
      "Golden sand, banana-boat rides and the jetty to St Mary's. Where cracked teams go to celebrate the final commit.",
  },
  {
    id: "stmary",
    name: "St Mary's Island",
    chapter: "The Sacred",
    type: "Geo-wonder · Boat",
    x: 8,
    y: 30,
    color: "#2d8a9e",
    img: island,
    dist: "Boat ride from Malpe",
    story:
      "Hexagonal basalt columns formed by ancient lava — a geological wonder reached by a short boat ride off the coast.",
  },
  {
    id: "matha",
    name: "Sri Krishna Matha",
    chapter: "The Sacred",
    type: "Temple · 800 yrs",
    x: 62,
    y: 50,
    color: "#5cbdb9",
    img: temple,
    dist: "Old town centre",
    story:
      "Glimpse Lord Krishna through the silver Navagraha window — an 800-year-old ritual found nowhere else on earth.",
  },
  {
    id: "lighthouse",
    name: "Kaup Lighthouse",
    chapter: "The Sacred",
    type: "Viewpoint · 100 yrs",
    x: 38,
    y: 80,
    color: "#2d8a9e",
    img: hero,
    dist: "Coastal road south",
    story:
      "Climb the century-old tower for a 360° view of the Arabian Sea crashing on black rocks at dusk.",
  },
  {
    id: "delta",
    name: "Delta Beach",
    chapter: "The Shore",
    type: "Hidden · Calm",
    x: 30,
    y: 24,
    color: "#5cbdb9",
    img: island,
    dist: "5.9 km from campus",
    story:
      "A quiet sand-spit where the river meets the sea. Almost nobody knows it exists — bring chai, leave footprints.",
  },
  {
    id: "pithrody",
    name: "Pithrody Beach",
    chapter: "The Shore",
    type: "Local · Raw",
    x: 16,
    y: 78,
    color: "#5cbdb9",
    img: underwater,
    dist: "4.2 km from campus",
    story:
      "Untouched local shoreline. Raw, empty and yours for the evening. Take nothing but the calm.",
  },
];

export function CoastalMap() {
  const [activeId, setActiveId] = useState<string>("malpe");
  const active = PINS.find((p) => p.id === activeId) ?? PINS[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      {/* ---------- MAP ---------- */}
      <div className="relative aspect-[4/3] overflow-hidden border border-[#0c2340]/15 bg-[#0c2340]">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_20%,#1a4a6e_0%,#103451_45%,#0c2340_100%)]" />

        <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          {[0.35, 0.55, 0.75].map((o, i) => (
            <path
              key={i}
              d={`M${70 + i * 26},0 C${110 + i * 26},80 ${40 + i * 26},170 ${120 + i * 26},230 C${150 + i * 26},270 ${130 + i * 26},300 ${130 + i * 26},300 L400,300 L400,0 Z`}
              fill="none"
              stroke="#5cbdb9"
              strokeWidth="0.8"
              opacity={0.12 + i * 0.05}
            />
          ))}
          <path
            d="M150,0 C180,70 120,150 200,220 C240,256 220,300 220,300 L400,300 L400,0 Z"
            fill="#2d8a9e"
            opacity="0.18"
          />
          <path
            d="M150,0 C180,70 120,150 200,220 C240,256 220,300 220,300"
            fill="none"
            stroke="#5cbdb9"
            strokeWidth="1.2"
            strokeDasharray="3 4"
            opacity="0.55"
          />
        </svg>

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#5cbdb944 1px,transparent 1px),linear-gradient(to bottom,#5cbdb944 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-[#5cbdb9]/40 font-['Work_Sans'] text-[10px] text-[#5cbdb9]/80">
          <span className="absolute top-1 text-[#5cbdb9]">N</span>
          <span className="text-base">✦</span>
        </div>
        <span className="absolute bottom-3 left-4 font-['Work_Sans'] text-[9px] uppercase tracking-[0.3em] text-[#5cbdb9]/50">
          Arabian Sea · Udupi coast
        </span>

        {PINS.map((p) => {
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              aria-label={`Preview ${p.name}`}
            >
              {isActive && (
                <motion.span
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ border: `1.5px solid ${p.color}` }}
                  initial={{ width: 14, height: 14, opacity: 0.8 }}
                  animate={{ width: 46, height: 46, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <motion.span
                whileHover={{ scale: 1.25 }}
                animate={{ scale: isActive ? 1.2 : 1 }}
                className="relative grid h-5 w-5 place-items-center rounded-full"
                style={{
                  background: p.color,
                  boxShadow: `0 0 0 3px #0c234080, 0 0 16px ${p.color}`,
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#0c2340]" />
              </motion.span>
              <span
                className={`absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 font-['Work_Sans'] text-[9px] uppercase tracking-wider transition-opacity ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{ background: "#0c2340cc", color: p.color }}
              >
                {p.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------- DETAIL CARD ---------- */}
      <div className="relative min-h-[360px] overflow-hidden border border-[#0c2340]/15 bg-[#fdfdfb]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full flex-col"
          >
            <div className="relative h-44 overflow-hidden">
              <img src={active.img} alt={active.name} className="h-full w-full object-cover" />
              <span
                className="absolute left-4 top-4 rounded-full px-3 py-1 font-['Work_Sans'] text-[10px] font-semibold uppercase tracking-widest text-white"
                style={{ background: "#0c2340cc" }}
              >
                {active.chapter}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: active.color }} />
                <span className="font-['Work_Sans'] text-[10px] uppercase tracking-[0.25em] text-[#2d8a9e]">
                  {active.type}
                </span>
              </div>
              <h3 className="font-['Instrument_Serif'] text-3xl text-[#0c2340]">{active.name}</h3>
              <p className="text-sm leading-relaxed text-[#0c2340]/75">{active.story}</p>
              <span className="mt-auto font-['Work_Sans'] text-[11px] italic tracking-wider text-[#1a4a6e]">
                📍 {active.dist}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
