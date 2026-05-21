import type { ReactNode, HTMLAttributes } from "react";

type FrameProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  serial?: string;
  label?: string;
  tone?: "default" | "accent";
};

/**
 * Sci-fi HUD container with corner brackets and an optional serial label.
 * Used as the primary structural box across the app.
 */
export function HudFrame({
  children,
  serial,
  label,
  tone = "default",
  className = "",
  ...rest
}: FrameProps) {
  const borderClass =
    tone === "accent"
      ? "border-2 border-foreground comic-shadow"
      : "border-2 border-foreground/85";
  return (
    <div
      className={`relative ${borderClass} bg-card/60 ${className}`}
      {...rest}
    >
      {/* corner brackets */}
      <span className="pointer-events-none absolute -left-[3px] -top-[3px] h-3.5 w-3.5 border-l-2 border-t-2 border-primary" />
      <span className="pointer-events-none absolute -right-[3px] -top-[3px] h-3.5 w-3.5 border-r-2 border-t-2 border-primary" />
      <span className="pointer-events-none absolute -bottom-[3px] -left-[3px] h-3.5 w-3.5 border-b-2 border-l-2 border-primary" />
      <span className="pointer-events-none absolute -bottom-[3px] -right-[3px] h-3.5 w-3.5 border-b-2 border-r-2 border-primary" />
      {(serial || label) && (
        <div className="flex items-center justify-between border-b-2 border-foreground/80 bg-foreground/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>{label}</span>
          <span>{serial}</span>
        </div>
      )}
      {children}
    </div>
  );
}

export function HudCrosshair({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 text-primary ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
    >
      <line x1="12" y1="2" x2="12" y2="9" />
      <line x1="12" y1="15" x2="12" y2="22" />
      <line x1="2" y1="12" x2="9" y2="12" />
      <line x1="15" y1="12" x2="22" y2="12" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  );
}

export function HudDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      {label && (
        <>
          <HudCrosshair className="h-3 w-3" />
          <span>{label}</span>
          <HudCrosshair className="h-3 w-3" />
        </>
      )}
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export function HudButton({
  children,
  href,
  to,
  variant = "primary",
  className = "",
  onClick,
  type,
}: {
  children: ReactNode;
  href?: string;
  to?: string;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground comic-shadow-ink hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_var(--ink)]"
      : "bg-background text-foreground comic-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_var(--color-primary)]";
  const base =
    "group relative inline-flex items-center gap-3 border-2 border-foreground px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.22em] transition-all duration-150";
  const inner = (
    <>
      {children}
    </>
  );
  if (href)
    return (
      <a href={href} className={`${base} ${styles} ${className}`}>
        {inner}
      </a>
    );
  if (to)
    return (
      <a href={to} className={`${base} ${styles} ${className}`}>
        {inner}
      </a>
    );
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      {inner}
    </button>
  );
}

export function SectionTag({ id, label }: { id: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-3 border-2 border-foreground bg-primary px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground comic-shadow-ink">
      <span className="inline-block h-1.5 w-1.5 bg-primary-foreground" />
      <span>{id}</span>
      <span className="h-px w-6 bg-primary-foreground/60" />
      <span>{label}</span>
    </div>
  );
}

/**
 * Comic-book burst / starburst splash with text inside.
 * Use for "POW" style accents.
 */
export function Splash({
  children,
  rotate = -8,
  className = "",
}: {
  children: ReactNode;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative inline-grid place-items-center ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
        <polygon
          points="100,2 118,28 150,12 150,46 186,52 162,80 198,98 162,118 186,148 150,154 150,188 118,172 100,198 82,172 50,188 50,154 14,148 38,118 2,98 38,80 14,52 50,46 50,12 82,28"
          fill="var(--color-primary)"
          stroke="var(--ink)"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
      <span className="relative font-splash text-2xl text-primary-foreground">
        {children}
      </span>
    </div>
  );
}

/** Speech-bubble style label. */
export function SpeechTag({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block border-2 border-foreground bg-background px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] comic-shadow-ink">
      {children}
      <span className="absolute -bottom-[10px] left-6 h-0 w-0 border-l-[10px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent border-t-foreground" />
      <span className="absolute -bottom-[7px] left-[26px] h-0 w-0 border-l-[7px] border-r-[4px] border-t-[7px] border-l-transparent border-r-transparent border-t-background" />
    </span>
  );
}