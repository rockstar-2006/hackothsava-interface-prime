import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ---------------- Aquatic palette (kept in sync with benefits page) ----------------
   deepest #021726 · abyss #042a43 · ocean #0a4d68 · reef #088395
   aqua #05c5d8 · foam #b9f6ff · sand #ffdba1 · coral #ff7a5c
----------------------------------------------------------------------------------- */

type Kind = "beach" | "spot" | "culture";

interface Pick {
  id: string;
  name: string;
  icon: string;
  /** lower = earlier in the day */
  phase: number;
  /** minutes spent on site */
  duration: number;
  /** minutes of travel to reach it */
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
  let clock = 6 * 60 + 30; // 06:30
  let lunchDone = false;

  for (const p of ordered) {
    clock += p.travel;
    // drop in a lunch break once we cross 1pm
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
    // hotel check-in slips in mid-afternoon
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

  // hotel never placed (no late picks) -> place near the end
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

  // always end on dinner
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
  beach: "#05c5d8",
  spot: "#ffdba1",
  culture: "#ff7a5c",
  meal: "#7ee8fa",
  hotel: "#b9f6ff",
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
      className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
        active
          ? "border-[#05c5d8] bg-[#05c5d8]/15 shadow-[0_0_22px_-6px_#05c5d8]"
          : "border-[#b9f6ff]/15 bg-[#021726]/40 hover:border-[#05c5d8]/50 hover:bg-[#021726]/70"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="flex flex-col">
        <span className="font-display text-sm font-bold text-[#eafcff]">{label}</span>
        {sub && <span className="font-mono text-[10px] tracking-wider text-[#b9f6ff]/55">{sub}</span>}
      </span>
      <span
        className={`ml-auto grid h-5 w-5 place-items-center rounded-full border text-[11px] transition-colors ${
          active ? "border-[#05c5d8] bg-[#05c5d8] text-[#021726]" : "border-[#b9f6ff]/30 text-transparent"
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
      <div className="rounded-3xl border border-[#05c5d8]/20 bg-[#021726]/50 p-6 backdrop-blur md:p-8">
        <div className="space-y-7">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#05c5d8]">01 · Beaches</p>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {BEACH_PICKS.map((b) => (
                <Chip key={b.id} icon={b.icon} label={b.name} sub={b.note} active={beaches.includes(b.id)} onClick={() => toggle(b.id, beaches, setBeaches)} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#ffdba1]">02 · Culture & Spots</p>
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
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#b9f6ff]">03 · Where you crash</p>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
              {HOTELS.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setHotel(h.id)}
                  className={`flex flex-col rounded-xl border px-4 py-3 text-left transition-all ${
                    hotel === h.id
                      ? "border-[#ffdba1] bg-[#ffdba1]/10 shadow-[0_0_22px_-8px_#ffdba1]"
                      : "border-[#b9f6ff]/15 bg-[#021726]/40 hover:border-[#ffdba1]/50"
                  }`}
                >
                  <span className="font-display text-sm font-bold text-[#eafcff]">{h.name}</span>
                  <span className="font-mono text-[10px] tracking-wider text-[#b9f6ff]/55">{h.tag}</span>
                  <span className="mt-2 font-display text-lg font-bold text-[#ffdba1]">{h.price}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="button"
              onClick={generate}
              disabled={totalPicks === 0}
              className="rounded-full bg-[#05c5d8] px-7 py-3.5 font-mono text-[12px] font-bold uppercase tracking-[0.25em] text-[#021726] transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ✦ Generate my day
            </button>
            <span className="font-mono text-[11px] tracking-wider text-[#b9f6ff]/60">
              {totalPicks} stop{totalPicks === 1 ? "" : "s"} selected
            </span>
          </div>
        </div>
      </div>

      {/* ------- RIGHT: generated timeline ------- */}
      <div className="rounded-3xl border border-[#b9f6ff]/15 bg-gradient-to-b from-[#042a43]/60 to-[#021726]/80 p-6 backdrop-blur md:p-8">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#05c5d8]">Your 1-day route</p>
          {dayEnd && (
            <span className="rounded-full border border-[#05c5d8]/40 px-3 py-1 font-mono text-[10px] tracking-widest text-[#b9f6ff]/80">
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
              <p className="max-w-xs text-sm text-[#b9f6ff]/60">
                Pick your beaches, spots and a place to stay, then hit{" "}
                <span className="text-[#05c5d8]">Generate my day</span> to plot a timed coastal route.
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
              <span className="absolute left-[14px] top-2 bottom-6 w-px bg-gradient-to-b from-[#05c5d8] via-[#b9f6ff]/30 to-transparent" />
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
                    className="relative z-10 mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border bg-[#021726] text-sm"
                    style={{ borderColor: KIND_ACCENT[s.kind] }}
                  >
                    {s.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-display text-base font-bold text-[#eafcff]">{s.label}</p>
                      <span
                        className="shrink-0 font-mono text-[11px] font-bold tracking-wider"
                        style={{ color: KIND_ACCENT[s.kind] }}
                      >
                        {s.time}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[#b9f6ff]/70">{s.meta}</p>
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