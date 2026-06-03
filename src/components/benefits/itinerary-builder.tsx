import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ---- Ocean Deep editorial palette ----
   navy #0c2340 · slate #1a4a6e · teal #2d8a9e · mist #5cbdb9 · paper #fdfdfb */

type Kind = "beach" | "spot" | "culture";

interface Pick {
  id: string;
  name: string;
  icon: string;
  phase: number;
  duration: number;
  travel: number;
  note: string;
}

const BEACH_PICKS: Pick[] = [
  { id: "malpe", name: "Malpe Beach", icon: "🌅", phase: 1, duration: 75, travel: 20, note: "Sunrise walk + chai on the golden sand." },
  { id: "delta", name: "Delta Beach", icon: "🏝️", phase: 6, duration: 60, travel: 25, note: "Quiet river-meets-sea sand spit." },
  { id: "pithrody", name: "Pithrody Beach", icon: "🐚", phase: 7, duration: 50, travel: 22, note: "Raw, untouched local shoreline." },
  { id: "kaup", name: "Kaup Sunset Point", icon: "🌇", phase: 9, duration: 70, travel: 30, note: "Climb the lighthouse for the dusk show." },
];

const SPOT_PICKS: Pick[] = [
  { id: "matha", name: "Sri Krishna Matha", icon: "🛕", phase: 3, duration: 80, travel: 18, note: "The 800-year-old silver Navagraha window." },
  { id: "stmary", name: "St Mary's Island", icon: "🪨", phase: 4, duration: 110, travel: 35, note: "Hexagonal basalt + a short boat ride." },
  { id: "lighthouse", name: "Kaup Lighthouse", icon: "🗼", phase: 8, duration: 45, travel: 28, note: "360° view of the Arabian Sea." },
];

const CULTURE_PICKS: Pick[] = [
  { id: "yaksha", name: "Yakshagana Show", icon: "🎭", phase: 10, duration: 90, travel: 15, note: "Towering crowns, thunderous folk theatre." },
  { id: "bhoota", name: "Bhoota Kola Ritual", icon: "🔥", phase: 11, duration: 75, travel: 20, note: "A trance ritual of drums and fire." },
  { id: "dosa", name: "Dosa & Filter Coffee", icon: "🍛", phase: 5, duration: 45, travel: 10, note: "Banana-leaf meal in the dosa's birthplace." },
];

interface Hotel {
  id: string;
  name: string;
  tag: string;
  price: string;
}

const HOTELS: Hotel[] = [
  { id: "hostel", name: "Sea Breeze Hostel", tag: "Budget · 200m from sand", price: "₹399" },
  { id: "lodge", name: "Matha View Lodge", tag: "Central · walk to temple", price: "₹650" },
  { id: "homestay", name: "Coconut Homestay", tag: "Home food · beach view", price: "₹800" },
];

interface Slot {
  time: string;
  label: string;
  icon: string;
  meta: string;
  kind: Kind | "meal" | "hotel";
}

function fmt(mins: number) {
  const h24 = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const ampm = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

function buildSchedule(picks: Pick[], hotel: Hotel | null): Slot[] {
  const ordered = [...picks].sort((a, b) => a.phase - b.phase);
  const slots: Slot[] = [];
  let clock = 6 * 60 + 30;
  let lunchDone = false;

  for (const p of ordered) {
    clock += p.travel;
    if (!lunchDone && clock >= 13 * 60) {
      slots.push({
        time: fmt(clock),
        label: "Lunch — Udupi thali",
        icon: "🍽️",
        meta: "Banana-leaf meal · 45 min",
        kind: "meal",
      });
      clock += 45;
      lunchDone = true;
    }
    if (hotel && p.phase >= 8 && !slots.some((s) => s.kind === "hotel")) {
      slots.push({
        time: fmt(clock),
        label: `Check in — ${hotel.name}`,
        icon: "🛏️",
        meta: `${hotel.tag} · ${hotel.price}`,
        kind: "hotel",
      });
      clock += 30;
    }
    slots.push({
      time: fmt(clock),
      label: p.name,
      icon: p.icon,
      meta: `${p.note} · ${p.duration} min`,
      kind: p.id.includes("dosa") ? "meal" : (BEACH_PICKS.find((b) => b.id === p.id) ? "beach" : SPOT_PICKS.find((s) => s.id === p.id) ? "spot" : "culture"),
    });
    clock += p.duration;
  }

  if (hotel && !slots.some((s) => s.kind === "hotel")) {
    slots.push({
      time: fmt(clock),
      label: `Check in — ${hotel.name}`,
      icon: "🛏️",
      meta: `${hotel.tag} · ${hotel.price}`,
      kind: "hotel",
    });
    clock += 30;
  }

  clock += 20;
  slots.push({
    time: fmt(clock),
    label: "Dinner — Goli baje & coast vibes",
    icon: "🌙",
    meta: "Wind down by the water · 60 min",
    kind: "meal",
  });

  return slots;
}

const KIND_ACCENT: Record<Slot["kind"], string> = {
  beach: "#2d8a9e",
  spot: "#1a4a6e",
  culture: "#5cbdb9",
  meal: "#2d8a9e",
  hotel: "#1a4a6e",
};

function Chip({
  active,
  onClick,
  icon,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  sub?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-3 border px-4 py-3 text-left transition-all ${
        active
          ? "border-[#2d8a9e] bg-[#2d8a9e]/10"
          : "border-[#0c2340]/12 bg-white hover:border-[#2d8a9e]/50"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-[#0c2340]">{label}</span>
        {sub && <span className="text-[10px] tracking-wider text-[#1a4a6e]/60">{sub}</span>}
      </span>
      <span
        className={`ml-auto grid h-5 w-5 place-items-center rounded-full border text-[11px] transition-colors ${
          active ? "border-[#2d8a9e] bg-[#2d8a9e] text-white" : "border-[#0c2340]/25 text-transparent"
        }`}
      >
        ✓
      </span>
    </button>
  );
}

export function ItineraryBuilder() {
  const [beaches, setBeaches] = useState<string[]>(["malpe"]);
  const [spots, setSpots] = useState<string[]>(["matha"]);
  const [culture, setCulture] = useState<string[]>(["dosa"]);
  const [hotel, setHotel] = useState<string>("hostel");
  const [plan, setPlan] = useState<Slot[] | null>(null);

  const toggle = (
    id: string,
    list: string[],
    set: (v: string[]) => void,
  ) => set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const totalPicks = beaches.length + spots.length + culture.length;

  const selectedPicks = useMemo(() => {
    const all = [...BEACH_PICKS, ...SPOT_PICKS, ...CULTURE_PICKS];
    const ids = new Set([...beaches, ...spots, ...culture]);
    return all.filter((p) => ids.has(p.id));
  }, [beaches, spots, culture]);

  const generate = () => {
    const chosenHotel = HOTELS.find((h) => h.id === hotel) ?? null;
    setPlan(buildSchedule(selectedPicks, chosenHotel));
  };

  const dayEnd = plan && plan.length ? plan[plan.length - 1].time : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      {/* ------- LEFT: controls ------- */}
      <div className="border border-[#0c2340]/12 bg-white p-6 md:p-8">
        <div className="space-y-7">
          <div>
            <p className="font-['Work_Sans'] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#2d8a9e]">01 · Beaches</p>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {BEACH_PICKS.map((b) => (
                <Chip key={b.id} icon={b.icon} label={b.name} sub={b.note} active={beaches.includes(b.id)} onClick={() => toggle(b.id, beaches, setBeaches)} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-['Work_Sans'] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1a4a6e]">02 · Culture & Spots</p>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {[...SPOT_PICKS, ...CULTURE_PICKS].map((s) => {
                const inSpots = SPOT_PICKS.some((p) => p.id === s.id);
                const list = inSpots ? spots : culture;
                const set = inSpots ? setSpots : setCulture;
                return (
                  <Chip key={s.id} icon={s.icon} label={s.name} sub={s.note} active={list.includes(s.id)} onClick={() => toggle(s.id, list, set)} />
                );
              })}
            </div>
          </div>

          <div>
            <p className="font-['Work_Sans'] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5cbdb9]">03 · Where you crash</p>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
              {HOTELS.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setHotel(h.id)}
                  className={`flex flex-col border px-4 py-3 text-left transition-all ${
                    hotel === h.id
                      ? "border-[#1a4a6e] bg-[#1a4a6e]/8"
                      : "border-[#0c2340]/12 bg-white hover:border-[#1a4a6e]/50"
                  }`}
                >
                  <span className="text-sm font-semibold text-[#0c2340]">{h.name}</span>
                  <span className="text-[10px] tracking-wider text-[#1a4a6e]/60">{h.tag}</span>
                  <span className="mt-2 font-['Instrument_Serif'] text-xl text-[#1a4a6e]">{h.price}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="button"
              onClick={generate}
              disabled={totalPicks === 0}
              className="bg-[#0c2340] px-7 py-3.5 font-['Work_Sans'] text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ✦ Generate my day
            </button>
            <span className="font-['Work_Sans'] text-[11px] tracking-wider text-[#1a4a6e]/70">
              {totalPicks} stop{totalPicks === 1 ? "" : "s"} selected
            </span>
          </div>
        </div>
      </div>

      {/* ------- RIGHT: generated timeline ------- */}
      <div className="border border-[#0c2340]/12 bg-[#0c2340] p-6 text-white md:p-8">
        <div className="flex items-center justify-between">
          <p className="font-['Work_Sans'] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5cbdb9]">Your 1-day route</p>
          {dayEnd && (
            <span className="rounded-full border border-[#5cbdb9]/40 px-3 py-1 font-['Work_Sans'] text-[10px] tracking-widest text-white/80">
              6:30 AM → {dayEnd}
            </span>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!plan ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-10 flex flex-col items-center justify-center gap-3 py-16 text-center"
            >
              <span className="text-4xl">🧭</span>
              <p className="max-w-xs text-sm text-white/60">
                Pick your beaches, spots and a place to stay, then hit{" "}
                <span className="text-[#5cbdb9]">Generate my day</span> to plot a timed coastal route.
              </p>
            </motion.div>
          ) : (
            <motion.ol
              key="plan"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07 } } }}
              className="relative mt-6 space-y-0 pl-2"
            >
              <span className="absolute left-[14px] top-2 bottom-6 w-px bg-gradient-to-b from-[#5cbdb9] via-white/30 to-transparent" />
              {plan.map((s, i) => (
                <motion.li
                  key={`${s.label}-${i}`}
                  variants={{
                    hidden: { opacity: 0, x: -14 },
                    show: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-4 pb-5"
                >
                  <span
                    className="relative z-10 mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border bg-[#0c2340] text-sm"
                    style={{ borderColor: KIND_ACCENT[s.kind] }}
                  >
                    {s.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-['Instrument_Serif'] text-lg text-white">{s.label}</p>
                      <span
                        className="shrink-0 font-['Work_Sans'] text-[11px] font-bold tracking-wider"
                        style={{ color: KIND_ACCENT[s.kind] === "#1a4a6e" ? "#5cbdb9" : KIND_ACCENT[s.kind] }}
                      >
                        {s.time}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">{s.meta}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
