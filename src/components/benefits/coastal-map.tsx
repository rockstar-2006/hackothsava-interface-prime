import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import hero from "@/assets/benefit-hero-ocean.jpg";
import island from "@/assets/benefit-island.jpg";
import temple from "@/assets/benefit-temple.jpg";
import underwater from "@/assets/benefit-underwater.jpg";

interface Pin {
  id: string;
  name: string;
  chapter: string;
  type: string;
  x: number; // % left
  y: number; // % top
  color: string;
  img: string;
  dist: string;
  story: string;
}

const PINS: Pin[] = [
  {
    id: "malpe",
    name: "Malpe Beach",
    chapter: "CH·01 — The Shore",
    type: "Beach · Sunset",
    x: 22,
    y: 58,
    color: "#05c5d8",
    img: hero,
    dist: "5.4 km from campus",
    story:
      "Golden sand, banana-boat rides and the jetty to St Mary's. Where cracked teams go to celebrate the final commit.",
  },
  {
    id: "stmary",
    name: "St Mary's Island",
    chapter: "CH·02 — The Sacred",
    type: "Geo-wonder · Boat",
    x: 8,
    y: 30,
    color: "#ffdba1",
    img: island,
    dist: "Boat ride from Malpe",
    story:
      "Hexagonal basalt columns formed by ancient lava — a geological wonder reached by a short boat ride off the coast.",
  },
  {
    id: "matha",
    name: "Sri Krishna Matha",
    chapter: "CH·02 — The Sacred",
    type: "Temple · 800 yrs",
    x: 62,
    y: 50,
    color: "#7ee8fa",
    img: temple,
    dist: "Old town centre",
    story:
      "Glimpse Lord Krishna through the silver Navagraha window — an 800-year-old ritual found nowhere else on earth.",
  },
  {
    id: "lighthouse",
    name: "Kaup Lighthouse",
    chapter: "CH·02 — The Sacred",
    type: "Viewpoint · 100 yrs",
    x: 38,
    y: 80,
    color: "#ff7a5c",
    img: hero,
    dist: "Coastal road south",
    story:
      "Climb the century-old tower for a 360° view of the Arabian Sea crashing on black rocks at dusk.",
  },
  {
    id: "delta",
    name: "Delta Beach",
    chapter: "CH·01 — The Shore",
    type: "Hidden · Calm",
    x: 30,
    y: 24,
    color: "#05c5d8",
    img: island,
    dist: "5.9 km from campus",
    story:
      "A quiet sand-spit where the river meets the sea. Almost nobody knows it exists — bring chai, leave footprints.",
  },
  {
    id: "pithrody",
    name: "Pithrody Beach",
    chapter: "CH·01 — The Shore",
    type: "Local · Raw",
    x: 16,
    y: 78,
    color: "#05c5d8",
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
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#05c5d8]/25 bg-[#021726]">
        {/* ocean gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_20%,#0a4d68_0%,#042a43_45%,#021726_100%)]" />

        {/* coastline + bathymetry */}
        <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          {[0.35, 0.55, 0.75].map((o, i) => (
            <path
              key={i}
              d={`M${70 + i * 26},0 C${110 + i * 26},80 ${40 + i * 26},170 ${120 + i * 26},230 C${150 + i * 26},270 ${130 + i * 26},300 ${130 + i * 26},300 L400,300 L400,0 Z`}
              fill="none"
              stroke="#05c5d8"
              strokeWidth="0.8"
              opacity={0.12 + i * 0.05}
            />
          ))}
          {/* land mass */}
          <path
            d="M150,0 C180,70 120,150 200,220 C240,256 220,300 220,300 L400,300 L400,0 Z"
            fill="#063a3a"
            opacity="0.45"
          />
          <path
            d="M150,0 C180,70 120,150 200,220 C240,256 220,300 220,300"
            fill="none"
            stroke="#ffdba1"
            strokeWidth="1.2"
            strokeDasharray="3 4"
            opacity="0.6"
          />
        </svg>

        {/* grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#b9f6ff22 1px,transparent 1px),linear-gradient(to bottom,#b9f6ff22 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* compass */}
        <div className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-[#b9f6ff]/30 font-mono text-[10px] text-[#b9f6ff]/70">
          <span className="absolute top-1 text-[#05c5d8]">N</span>
          <span className="text-base">✦</span>
        </div>
        <span className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[#b9f6ff]/40">
          Arabian Sea · Udupi coast
        </span>

        {/* pins */}
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
                  boxShadow: `0 0 0 3px #02172680, 0 0 16px ${p.color}`,
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#021726]" />
              </motion.span>
              <span
                className={`absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider transition-opacity ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{ background: "#021726cc", color: p.color }}
              >
                {p.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------- DETAIL CARD ---------- */}
      <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-[#b9f6ff]/15 bg-[#021726]/60">
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#021726] via-[#021726]/30 to-transparent" />
              <span
                className="absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] tracking-widest"
                style={{ background: "#021726cc", color: active.color }}
              >
                {active.chapter}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: active.color }} />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#b9f6ff]/60">
                  {active.type}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#eafcff]">{active.name}</h3>
              <p className="text-sm leading-relaxed text-[#b9f6ff]/80">{active.story}</p>
              <span className="mt-auto font-mono text-[11px] tracking-wider text-[#ffdba1]">
                📍 {active.dist}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}