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
  const borderColor =
    tone === "accent"
      ? "border-primary/60"
      : "border-border";
  return (
    <div
      className={`relative border ${borderColor} bg-card/40 ${className}`}
      {...rest}
    >
      {/* corner brackets */}
      <span className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l border-t border-primary" />
      <span className="pointer-events-none absolute -right-px -top-px h-3 w-3 border-r border-t border-primary" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b border-l border-primary" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b border-r border-primary" />
      {(serial || label) && (
        <div className="flex items-center justify-between border-b border-border/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
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
      ? "bg-primary text-primary-foreground hover:shadow-[0_0_40px_-6px_var(--color-primary)]"
      : "bg-transparent text-foreground hover:bg-primary/10 hover:text-primary";
  const base =
    "group relative inline-flex items-center gap-3 border border-primary/70 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.25em] transition-all duration-200 hover:-translate-y-px";
  const inner = (
    <>
      <span className="pointer-events-none absolute -left-[3px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 bg-primary" />
      <span className="pointer-events-none absolute -right-[3px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 bg-primary" />
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
    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
      <span className="inline-block h-1.5 w-1.5 bg-primary" />
      <span>{id}</span>
      <span className="h-px w-8 bg-primary/60" />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}