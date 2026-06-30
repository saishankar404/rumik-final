import { type ReactNode } from "react";
import type { Icon } from "@phosphor-icons/react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex items-end justify-between gap-8 pb-12">
      <div className="min-w-0 animate-fade-in">
        {eyebrow ? <div className="eyebrow-label mb-3">{eyebrow}</div> : null}
        <h1 className="font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2.5 max-w-xl text-[13.5px] leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="shrink-0 flex items-center gap-2">{actions}</div>
      ) : null}
    </header>
  );
}

export function Section({
  title,
  hint,
  children,
  trailing,
  className = "",
}: {
  title: string;
  hint?: string;
  children: ReactNode;
  trailing?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`py-12 first:pt-2 hairline-b last:border-b-0 ${className}`}
    >
      <div className="mb-7 flex items-baseline justify-between gap-6">
        <div className="min-w-0">
          <h2 className="font-display text-[15px] font-medium tracking-[-0.01em] text-foreground">
            {title}
          </h2>
          {hint ? (
            <p className="mt-1 text-[12.5px] text-muted-foreground/80">
              {hint}
            </p>
          ) : null}
        </div>
        {trailing ? <div className="shrink-0">{trailing}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function InsetPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg bg-[var(--inset)] px-5 py-4 ${className}`}>
      {children}
    </div>
  );
}

export function StatusPill({
  tone = "neutral",
  children,
  dot = false,
}: {
  tone?: "neutral" | "success" | "warn" | "muted";
  children: ReactNode;
  dot?: boolean;
}) {
  const styles: Record<string, string> = {
    neutral: "bg-[var(--inset)] text-foreground",
    muted: "bg-transparent text-muted-foreground",
    success:
      "bg-[color-mix(in_oklab,var(--success)_10%,transparent)] text-[var(--success)]",
    warn: "bg-[color-mix(in_oklab,oklch(0.7_0.15_60)_14%,transparent)] text-[oklch(0.45_0.15_60)]",
  };
  const dotColor: Record<string, string> = {
    neutral: "bg-foreground/50",
    muted: "bg-muted-foreground/50",
    success: "bg-[var(--success)]",
    warn: "bg-[oklch(0.6_0.15_60)]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-[3px] text-[11px] font-medium leading-none tracking-tight ${styles[tone]}`}
    >
      {dot ? (
        <span className={`h-1.5 w-1.5 rounded-full ${dotColor[tone]}`} />
      ) : null}
      {children}
    </span>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-border bg-background px-1.5 font-mono text-[10.5px] font-medium text-muted-foreground">
      {children}
    </kbd>
  );
}

export function MetricRow({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-3.5 hairline-b last:border-b-0">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <span className="flex items-baseline gap-2 text-right">
        <span className="font-mono text-[13.5px] text-foreground">{value}</span>
        {hint ? (
          <span className="text-[12px] text-muted-foreground/80">{hint}</span>
        ) : null}
      </span>
    </div>
  );
}

export function Sparkline({
  values,
  height = 18,
  onHover,
}: {
  values: number[];
  height?: number;
  onHover?: (value: number | null, index: number | null) => void;
}) {
  const max = Math.max(...values, 1);
  return (
    <div
      className="flex items-end gap-[3px] group/spark"
      style={{ height: `${height}px` }}
      onMouseLeave={() => onHover?.(null, null)}
    >
      {values.map((v, i) => {
        const pct = Math.max(12, (v / max) * 100);
        return (
          <span
            key={i}
            onMouseEnter={() => onHover?.(v, i)}
            className="w-[4px] rounded-sm bg-foreground/30 hover:bg-foreground hover:scale-y-125 transition-all duration-100 cursor-pointer origin-bottom"
            style={{ height: `${pct}%`, minHeight: "2px" }}
          />
        );
      })}
    </div>
  );
}

export function Waveform({
  bars = 36,
  playing = false,
}: {
  bars?: number;
  playing?: boolean;
}) {
  const heights = Array.from(
    { length: bars },
    (_, i) => 0.35 + 0.65 * Math.abs(Math.sin((i + 1) * 0.7)),
  );
  return (
    <div className="flex h-7 items-center gap-[2px]" aria-hidden="true">
      {heights.map((h, i) => (
        <span
          key={i}
          className={`w-[2px] rounded-full bg-foreground/35 ${playing ? "wave-bar" : ""}`}
          style={{
            height: `${h * 100}%`,
            animationDelay: `${(i % 12) * 70}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`shimmer rounded-md ${className}`} />;
}

export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  const widths = ["w-full", "w-4/5", "w-3/5", "w-2/3", "w-1/2"];
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-3.5 ${widths[i % widths.length]}`} />
      ))}
    </div>
  );
}

export function SkeletonRow({
  cols = 5,
  className = "",
}: {
  cols?: number;
  className?: string;
}) {
  return (
    <div
      className={`grid items-center gap-6 px-3 py-4 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-4" />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}: {
  icon?: Icon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 text-center ${className}`}
    >
      {Icon && (
        <Icon
          className="mb-4 h-8 w-8 text-muted-foreground/30"
          weight="thin"
          aria-hidden="true"
        />
      )}
      <p className="text-[14px] font-medium text-foreground/80">{title}</p>
      {description && (
        <p className="mt-1 text-[13px] text-muted-foreground/60 max-w-[320px]">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
