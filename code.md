# src/components/shell/nav.ts

import {
  LayoutGrid,
  AudioLines,
  KeyRound,
  Activity,
  ScrollText,
  Boxes,
  CreditCard,
  LifeBuoy,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  hint?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const NAV: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      { to: "/", label: "Overview", icon: LayoutGrid, hint: "G O" },
      { to: "/playground", label: "Playground", icon: AudioLines, hint: "G P" },
    ],
  },
  {
    label: "Develop",
    items: [
      { to: "/api-keys", label: "API keys", icon: KeyRound },
      { to: "/usage", label: "Usage", icon: Activity },
      { to: "/logs", label: "Logs", icon: ScrollText },
      { to: "/models", label: "Models", icon: Boxes },
    ],
  },
  {
    label: "Account",
    items: [
      { to: "/billing", label: "Billing", icon: CreditCard },
      { to: "/support", label: "Support", icon: LifeBuoy },
      { to: "/docs", label: "Docs", icon: BookOpen },
    ],
  },
];

# src/components/shell/primitives.tsx

import { type ReactNode } from "react";

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
        {eyebrow ? (
          <div className="eyebrow-label mb-3">{eyebrow}</div>
        ) : null}
        <h1 className="font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2.5 max-w-xl text-[13.5px] leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0 flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function Section({
  title,
  hint,
  children,
  trailing,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <section className="py-12 first:pt-2 hairline-b last:border-b-0">
      <div className="mb-7 flex items-baseline justify-between gap-6">
        <div className="min-w-0">
          <h2 className="font-display text-[15px] font-medium tracking-[-0.01em] text-foreground">
            {title}
          </h2>
          {hint ? (
            <p className="mt-1 text-[12.5px] text-muted-foreground/80">{hint}</p>
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
    <div
      className={`rounded-lg bg-[var(--inset)] px-5 py-4 ${className}`}
    >
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
      {dot ? <span className={`h-1.5 w-1.5 rounded-full ${dotColor[tone]}`} /> : null}
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

export function Sparkline({ values, height = 28 }: { values: number[]; height?: number }) {
  const max = Math.max(...values, 1);
  const w = 120;
  const step = w / (values.length - 1 || 1);
  const path = values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i * step).toFixed(1)} ${(height - (v / max) * height).toFixed(1)}`)
    .join(" ");
  return (
    <svg width={w} height={height} className="text-foreground/60">
      <path d={path} fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function Waveform({
  bars = 36,
  playing = false,
}: {
  bars?: number;
  playing?: boolean;
}) {
  const heights = Array.from({ length: bars }, (_, i) =>
    0.35 + 0.65 * Math.abs(Math.sin((i + 1) * 0.7))
  );
  return (
    <div className="flex h-7 items-center gap-[2px]">
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

# src/routes/__root.tsx

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rumik AI — Developer Workspace" },
      { name: "description", content: "A quiet, focused workspace for building with Rumik voice models." },
      { property: "og:title", content: "Rumik AI — Developer Workspace" },
      { property: "og:description", content: "A quiet, focused workspace for building with Rumik voice models." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}


# src/routes/_app.api-keys.tsx

import { createFileRoute } from "@tanstack/react-router";
import { Plus, MoreHorizontal, AlertCircle, Copy } from "lucide-react";
import { PageHeader, Section } from "../components/shell/primitives";

export const Route = createFileRoute("/_app/api-keys")({
  head: () => ({
    meta: [
      { title: "API keys — Rumik AI" },
      { name: "description", content: "Manage developer tokens, scopes, and rate limits." },
    ],
  }),
  component: ApiKeys,
});

const KEYS = [
  { name: "test", prefix: "rk_live_4Z3Mo3kt", scopes: ["tts", "tts:stream"], rate: "100 / min", last: "12h ago", expires: "Never", status: "active" as const },
];

function ApiKeys() {
  return (
    <>
      <PageHeader
        eyebrow="Develop"
        title="API keys"
        subtitle="One active, twenty-five allowed. Keys are shown once at creation — store them carefully."
        actions={
          <button className="inline-flex items-center gap-2 rounded-md bg-foreground px-3.5 py-2 text-[13px] font-medium text-background hover:bg-foreground/90">
            <Plus className="h-3.5 w-3.5" />
            New key
          </button>
        }
      />

      <div className="mb-8 flex items-start gap-3 rounded-md bg-[var(--inset)] px-4 py-3">
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
        <div className="text-[12.5px] text-muted-foreground">
          All models share <span className="font-mono text-foreground">20</span> concurrent requests per account.
          <a className="ml-1.5 text-foreground underline-offset-4 hover:underline" href="#">Contact us</a> for more.
        </div>
      </div>

      <Section title="Active keys">
        <div className="-mx-3">
          <div className="grid grid-cols-[1fr_1.4fr_1.2fr_0.8fr_0.7fr_0.7fr_auto] gap-6 px-3 pb-3 eyebrow-label">
            <span>Name</span><span>Prefix</span><span>Scopes</span><span>Rate</span><span>Last used</span><span>Status</span><span />
          </div>
          {KEYS.map((k) => (
            <div key={k.name} className="group grid grid-cols-[1fr_1.4fr_1.2fr_0.8fr_0.7fr_0.7fr_auto] items-center gap-6 rounded-md px-3 py-3.5 hairline-t row-hover">
              <div>
                <div className="font-display text-[13.5px] font-medium text-foreground">{k.name}</div>
                <div className="text-[11.5px] text-muted-foreground">Created Jun 27, 2026</div>
              </div>
              <div className="flex items-center gap-1.5">
                <code className="font-mono text-[12.5px] text-foreground/80">{k.prefix}…</code>
                <button title="Copy prefix" className="grid h-6 w-6 place-items-center rounded text-muted-foreground/70 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[var(--inset)] hover:text-foreground">
                  <Copy className="h-3 w-3" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {k.scopes.map((s) => (
                  <span key={s} className="rounded bg-[var(--inset)] px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">{s}</span>
                ))}
              </div>
              <span className="font-mono text-[12.5px] tabular-nums text-muted-foreground">{k.rate}</span>
              <span className="text-[12.5px] text-muted-foreground">{k.last}</span>
              <div className="flex items-center gap-1.5">
                <span className="relative grid h-2 w-2 place-items-center">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-[var(--success)]/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                </span>
                <span className="text-[12px] text-foreground/80">Active</span>
              </div>
              <button className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[var(--inset)] hover:text-foreground">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

# src/routes/_app.billing.tsx

import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, StatusPill } from "../components/shell/primitives";

export const Route = createFileRoute("/_app/billing")({
  head: () => ({
    meta: [
      { title: "Billing — Rumik AI" },
      { name: "description", content: "Top up credits, manage packages, and review your burn." },
    ],
  }),
  component: Billing,
});

const PRESETS = [
  { amount: "₹1,000",  credits: "+1,000" },
  { amount: "₹2,500",  credits: "+2,500" },
  { amount: "₹5,000",  credits: "+5,000" },
];

const PACKAGES = [
  { name: "Starter", credits: "5,000",  price: "₹5,000",  badge: null as string | null },
  { name: "Growth",  credits: "11,500", price: "₹10,000", badge: "Most value" },
  { name: "Scale",   credits: "30,000", price: "₹25,000", badge: null },
];

function Billing() {
  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Billing"
        subtitle="Credits never expire. Charges are processed in INR by Razorpay."
      />

      <div className="grid grid-cols-3 hairline-b border-t">
        <div className="px-6 py-7">
          <div className="eyebrow-label">Credit balance</div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-mono text-[40px] font-medium leading-none tracking-[-0.03em] tabular-nums">1,024</span>
            <span className="text-[13px] text-muted-foreground">credits</span>
          </div>
          <div className="mt-2 text-[11.5px] text-muted-foreground">Never expires</div>
        </div>
        <div className="border-l border-border px-6 py-7">
          <div className="eyebrow-label">Burn — 30d</div>
          <div className="mt-3 font-mono text-[28px] tracking-[-0.02em] tabular-nums">0</div>
          <div className="mt-2 text-[11.5px] text-muted-foreground">credits used</div>
        </div>
        <div className="border-l border-border px-6 py-7">
          <div className="eyebrow-label">Requests — 30d</div>
          <div className="mt-3 font-mono text-[28px] tracking-[-0.02em] tabular-nums">3</div>
          <div className="mt-2 text-[11.5px] text-muted-foreground">across active keys</div>
        </div>
      </div>

      <Section title="Manual top-up" hint="1 INR converts to 1 credit. Min ₹100 — max ₹5,00,000.">
        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((p) => (
            <button key={p.amount} className="group rounded-md bg-[var(--inset)] px-4 py-2.5 text-left transition-colors hover:bg-foreground hover:text-background">
              <div className="font-mono text-[14px] tracking-[-0.01em]">{p.amount}</div>
              <div className="font-mono text-[11px] text-muted-foreground group-hover:text-background/70">{p.credits} credits</div>
            </button>
          ))}
          <div className="ml-2 flex h-[54px] items-center gap-2 rounded-md border border-border px-3">
            <span className="font-mono text-[13px] text-muted-foreground">₹</span>
            <input placeholder="Custom amount" className="w-32 bg-transparent font-mono text-[13px] outline-none placeholder:text-muted-foreground/60" />
          </div>
        </div>
      </Section>

      <Section title="Credit packages">
        <div>
          {PACKAGES.map((p) => (
            <div key={p.name} className="group grid grid-cols-[1fr_1fr_auto_auto] items-center gap-8 rounded-md px-3 py-5 -mx-3 hairline-b last:border-b-0 row-hover">
              <div className="flex items-center gap-3">
                <span className="text-[15px] font-medium">{p.name}</span>
                {p.badge ? <StatusPill tone="success">{p.badge}</StatusPill> : null}
              </div>
              <div className="font-mono text-[13.5px] text-muted-foreground tabular-nums">{p.credits} credits</div>
              <div className="font-mono text-[16px] tracking-[-0.01em] tabular-nums">{p.price}</div>
              <button className="rounded-md bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background hover:bg-foreground/90">
                Purchase
              </button>
            </div>
          ))}
        </div>
      </Section>

      <div className="mt-6 text-[11.5px] leading-relaxed text-muted-foreground">
        Payments are processed by Razorpay. We never store card or UPI details. If a charge succeeded but credits didn't appear, refresh this page.
      </div>
    </>
  );
}

# src/routes/_app.docs.tsx

import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/shell/primitives";

export const Route = createFileRoute("/_app/docs")({
  head: () => ({
    meta: [
      { title: "Docs — Rumik AI" },
      { name: "description", content: "The Rumik developer guide, inline in your workspace." },
    ],
  }),
  component: Docs,
});

const TOC = [
  { label: "Overview",        active: true },
  { label: "Authentication",  active: false },
  { label: "Text to speech",  active: false },
  { label: "Streaming",       active: false },
  { label: "Tone tags",       active: false },
  { label: "Rate limits",     active: false },
  { label: "Errors",          active: false },
  { label: "Webhooks",        active: false },
];

function Docs() {
  return (
    <>
      <PageHeader
        eyebrow="docs.rumik.ai"
        title="Developer guide"
        subtitle="A short, opinionated reference for everything Rumik."
      />
      <div className="grid grid-cols-[180px_1fr] gap-14">
        <aside className="sticky top-20 h-fit text-[12.5px]">
          <div className="mb-2 eyebrow-label">On this site</div>
          <ul className="space-y-1">
            {TOC.map((t) => (
              <li key={t.label}>
                <a
                  href="#"
                  className={`block rounded px-2 py-1 ${t.active ? "bg-[var(--inset)] text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <article className="max-w-[640px] text-[14.5px] leading-[1.75] text-foreground/85">
          <h2 className="mb-4 text-[22px] font-semibold tracking-[-0.015em] text-foreground">Overview</h2>
          <p>
            Rumik is a voice synthesis API for builders shipping live, expressive applications.
            Two production models ship today — <span className="font-mono text-foreground">silk muga 1</span> for
            tone-tagged Hinglish, and <span className="font-mono text-foreground">silk mulberry 1.5</span> for
            narration and agentic loops.
          </p>
          <p className="mt-5">
            Authentication is a single bearer token. Requests are billed per input character, never per minute,
            and credits never expire.
          </p>

          <h3 className="mt-10 mb-3 text-[15px] font-semibold tracking-[-0.005em] text-foreground">Quick start</h3>
          <pre className="rounded-md bg-[var(--inset)] p-4 font-mono text-[12.5px] leading-relaxed text-foreground/85 overflow-x-auto">{`curl https://api.rumik.ai/v1/tts \\
  -H "Authorization: Bearer rk_live_…" \\
  -d '{
    "model": "silk-muga-1",
    "text": "hello, welcome aboard."
  }'`}</pre>

          <h3 className="mt-10 mb-3 text-[15px] font-semibold tracking-[-0.005em] text-foreground">Tone tags</h3>
          <p>
            Inline tags like <span className="font-mono text-foreground">&lt;laugh&gt;</span> and
            <span className="font-mono text-foreground"> &lt;sigh&gt;</span> shape delivery without separate API calls.
            See the full reference under <em>Tone tags</em>.
          </p>
        </article>
      </div>
    </>
  );
}

# src/routes/_app.index.tsx

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, KeyRound, BarChart3, Wallet, Check } from "lucide-react";
import {
  PageHeader,
  Section,
  Sparkline,
  StatusPill,
} from "../components/shell/primitives";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Overview — Rumik AI" },
      { name: "description", content: "Your workspace at a glance: credits, recent activity, and quick actions." },
    ],
  }),
  component: Overview,
});

const ACTIVITY = [
  { model: "silk muga 1", action: "generation", source: "Playground", ago: "12h ago", ms: 200, cost: 0, status: 200 },
  { model: "silk muga 1", action: "generation", source: "API",        ago: "12h ago", ms: 185, cost: 0, status: 200 },
  { model: "whisper v3",  action: "inference",  source: "Playground", ago: "12h ago", ms: 412, cost: 1, status: 200 },
  { model: "silk muga 1", action: "generation", source: "Playground", ago: "13h ago", ms: 213, cost: 0, status: 200 },
];

const TOP_MODELS = [
  { name: "silk muga 1", family: "muga",  used: 342, spark: [3, 6, 4, 9, 7, 12, 8, 14, 10, 16, 12, 18] },
  { name: "whisper v3",  family: "openai", used: 128, spark: [1, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7] },
];

const QUICK = [
  { to: "/api-keys", icon: KeyRound,   title: "Create an API key",   hint: "Generate a new key with scopes and rate limits." },
  { to: "/usage",    icon: BarChart3,  title: "View usage analytics", hint: "Charts, tokens, and credit burn over time." },
  { to: "/billing",  icon: Wallet,     title: "Top up credits",       hint: "Buy a package or set a custom amount." },
];

function Overview() {
  return (
    <>
      <PageHeader
        eyebrow="Monday, June 29"
        title="Hello, Shred."
        subtitle="Here's what's happening across your workspace today."
      />

      <div className="grid grid-cols-[1.4fr_1fr] gap-16 pb-6">
        <div>
          <div className="eyebrow-label">
            Active balance
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="font-mono text-[48px] font-medium leading-none tracking-[-0.03em] tabular-nums">
              1,024
            </span>
            <span className="text-[14px] text-muted-foreground">credits</span>
          </div>
          <div className="mt-3 flex items-center gap-3 text-[12.5px] text-muted-foreground">
            <span>0 burned in last 30 days</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>Resets never</span>
          </div>
        </div>
        <div className="border-l border-border pl-10">
          <div className="eyebrow-label">
            Requests (24h)
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="font-mono text-[36px] font-medium leading-none tracking-[-0.02em] tabular-nums">
              4
            </span>
            <StatusPill tone="success" dot>100% success</StatusPill>
          </div>
          <div className="mt-4 -ml-1">
            <Sparkline values={[1, 0, 2, 1, 3, 2, 4, 2, 1, 3, 2, 4]} />
          </div>
        </div>
      </div>

      <Section title="Recent activity" trailing={<Link to="/logs" className="text-[12.5px] text-muted-foreground hover:text-foreground">Open logs →</Link>}>
        <div className="-mx-3">
          {ACTIVITY.map((a, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_110px_110px_100px] items-center gap-6 rounded-md px-3 py-3.5 row-hover"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[var(--success)]/10 text-[var(--success)]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
                <div className="min-w-0 leading-tight">
                  <div className="truncate font-display text-[13.5px] font-medium text-foreground">
                    {a.action.charAt(0).toUpperCase() + a.action.slice(1)} via {a.source}
                  </div>
                  <div className="truncate text-[11.5px] text-muted-foreground">
                    <span className="font-mono">{a.model}</span> · {a.ago}
                  </div>
                </div>
              </div>
              <span className="font-mono text-[12.5px] tabular-nums text-muted-foreground">{a.ms} ms</span>
              <span className="font-mono text-[12.5px] tabular-nums text-muted-foreground">{a.cost} cr</span>
              <div className="justify-self-end">
                <StatusPill tone="success" dot>
                  <span className="font-mono tabular-nums">{a.status}</span>
                  <span className="opacity-70">OK</span>
                </StatusPill>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Top models" hint="Credits used in the last 30 days.">
        <div>
          {TOP_MODELS.map((m) => (
            <div key={m.name} className="grid grid-cols-[1.2fr_1fr_auto] items-center gap-8 py-5 hairline-b last:border-b-0">
              <div>
                <div className="font-display text-[14px] font-medium text-foreground">{m.name}</div>
                <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">{m.family}</div>
              </div>
              <Sparkline values={m.spark} />
              <div className="text-right">
                <div className="font-mono text-[15px] tabular-nums">{m.used}</div>
                <div className="text-[11px] text-muted-foreground">credits</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Quick actions">
        <div>
          {QUICK.map(({ to, icon: Icon, title, hint }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-5 rounded-md px-3 py-4 -mx-3 row-hover"
            >
              <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--inset)] text-foreground/80">
                <Icon className="h-[15px] w-[15px]" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] text-foreground">{title}</div>
                <div className="text-[12.5px] text-muted-foreground">{hint}</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

# src/routes/_app.logs.tsx

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { PageHeader, StatusPill, Waveform } from "../components/shell/primitives";

export const Route = createFileRoute("/_app/logs")({
  head: () => ({
    meta: [
      { title: "Logs — Rumik AI" },
      { name: "description", content: "Inspect every request: tokens, status, and audio output." },
    ],
  }),
  component: Logs,
});

const LOGS = [
  { id: "f2a2d8f3-eec7-46de-a74e-ebd287c13b50", ago: "12h ago", source: "Playground", model: "silk muga 1", key: "default", tokIn: 76, tokOut: 0, credits: 0, status: 200 },
  { id: "bfdbdd52-1775-464a-bd5e-5c2b0a2f1580", ago: "12h ago", source: "Playground", model: "silk muga 1", key: "default", tokIn: 76, tokOut: 0, credits: 0, status: 200 },
  { id: "4a21f99f-760d-4d54-a4aa-bb31f1dbff38", ago: "12h ago", source: "Playground", model: "silk muga 1", key: "default", tokIn: 76, tokOut: 0, credits: 0, status: 200 },
];

function Logs() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = LOGS.find((l) => l.id === openId);

  return (
    <>
      <PageHeader
        eyebrow="Develop"
        title="Logs"
        subtitle="A ledger of every synthesis request — searchable and inspectable."
      />

      <div className="sticky top-14 z-[5] -mx-3 mb-2 flex items-center gap-2 bg-background/85 px-3 py-3 backdrop-blur-md hairline-b">
        <div className="flex h-8 flex-1 items-center gap-2 rounded-md bg-[var(--inset)] px-2.5">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            placeholder="Search by request ID, model, or key"
            className="flex-1 bg-transparent text-[12.5px] outline-none placeholder:text-muted-foreground/60"
          />
        </div>
        {["Model", "Key", "Status"].map((f) => (
          <button key={f} className="rounded-md bg-[var(--inset)] px-2.5 py-1.5 text-[12px] text-muted-foreground hover:text-foreground">
            {f}
          </button>
        ))}
      </div>

      <div className="-mx-3 fade-mask-y">
        <div className="grid grid-cols-[110px_110px_140px_1fr_90px_70px_60px] gap-5 px-3 py-2 eyebrow-label">
          <span>Time</span><span>Source</span><span>Model</span><span>Request ID</span><span>Tokens</span><span>Credits</span><span>Status</span>
        </div>
        {LOGS.map((l) => (
          <button
            key={l.id}
            onClick={() => setOpenId(l.id)}
            className={`grid w-full grid-cols-[110px_110px_140px_1fr_90px_70px_60px] items-center gap-5 rounded-md px-3 py-3 text-left transition-colors ${
              openId === l.id ? "bg-[var(--inset)]" : "row-hover"
            }`}
          >
            <span className="text-[12.5px] text-muted-foreground">{l.ago}</span>
            <span className="text-[12.5px] text-muted-foreground">{l.source}</span>
            <span className="font-mono text-[12.5px] text-foreground/90">{l.model}</span>
            <span className="truncate font-mono text-[12px] text-muted-foreground">{l.id}</span>
            <span className="font-mono text-[12px] tabular-nums text-muted-foreground">{l.tokIn} / {l.tokOut}</span>
            <span className="font-mono text-[12px] tabular-nums text-muted-foreground">{l.credits}</span>
            <StatusPill tone="success" dot>
              <span className="font-mono tabular-nums">{l.status}</span>
              <span className="opacity-70">OK</span>
            </StatusPill>
          </button>
        ))}
      </div>

      {open ? (
        <div className="fixed inset-y-0 right-0 z-30 flex w-[460px] flex-col bg-background border-l border-border shadow-[-12px_0_40px_-20px_rgba(0,0,0,0.18)] animate-slide-in-right">
          <div className="flex items-center justify-between px-6 py-4 hairline-b">
            <div className="min-w-0">
              <div className="eyebrow-label">Request</div>
              <div className="mt-1 truncate font-mono text-[12.5px]">{open.id}</div>
            </div>
            <button onClick={() => setOpenId(null)} className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-[var(--inset)] hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7 fade-mask-b">
            <Block title="Headers">
              <Field k="Authorization" v="Bearer rk_live_4Z3Mo3kt…" />
              <Field k="User-Agent" v="rumik-js/0.4.2 node/20" />
            </Block>
            <Block title="Request body">
              <pre className="rounded-md bg-[var(--inset)] p-3 font-mono text-[11.5px] leading-relaxed text-foreground/85 overflow-x-auto">{`{
  "model": "silk-muga-1",
  "text": "hello, this is a test…",
  "temperature": 0.7
}`}</pre>
            </Block>
            <Block title="Response">
              <Field k="status" v="200 OK" />
              <Field k="execution" v="200 ms" />
              <Field k="characters" v="76" />
            </Block>
            <Block title="Output">
              <div className="rounded-md bg-[var(--inset)] px-3 py-3">
                <Waveform bars={60} />
              </div>
            </Block>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 eyebrow-label">{title}</div>
      <div>{children}</div>
    </div>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5 hairline-b last:border-b-0">
      <span className="font-mono text-[11.5px] text-muted-foreground">{k}</span>
      <span className="truncate font-mono text-[12px] text-foreground/90">{v}</span>
    </div>
  );
}

# src/routes/_app.models.tsx

import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, StatusPill } from "../components/shell/primitives";

export const Route = createFileRoute("/_app/models")({
  head: () => ({
    meta: [
      { title: "Models — Rumik AI" },
      { name: "description", content: "Pricing, pacing, and steering for every Rumik voice model." },
    ],
  }),
  component: Models,
});

const PRICING = [
  { name: "elevenlabs v3",     price: 10000, label: "₹10,000" },
  { name: "silk muga 1",       price: 990,   label: "₹990" },
  { name: "silk mulberry 1.5", price: 500,   label: "₹500" },
];

const CATALOG = [
  {
    name: "Silk Mulberry 1.5",
    family: "mulberry",
    normal: "₹2.50",
    promo: "₹0.50",
    per: "per 1k characters",
    pace: "≈ ₹0.40 / minute",
    desc: "Narration and low-latency voice agents steered by descriptions.",
    status: null as null | string,
  },
  {
    name: "Silk Muga 1",
    family: "muga",
    normal: "₹5.00",
    promo: "₹0.99",
    per: "per 1k characters",
    pace: "≈ ₹0.79 / minute",
    desc: "Expressive Hinglish voice steered by tone tags like [happy] or [whisper].",
    status: null,
  },
  {
    name: "Silk Spider 1",
    family: "spider",
    normal: "—",
    promo: "—",
    per: "",
    pace: "",
    desc: "Multilingual, ultra-realtime. Contact us for early access.",
    status: "Early access",
  },
];

function Models() {
  const max = Math.max(...PRICING.map((p) => p.price));
  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="Models"
        subtitle="Pricing per 1M characters — lower is better."
      />

      <Section title="Cost comparison">
        <div className="space-y-4">
          {PRICING.map((p) => (
            <div key={p.name} className="grid grid-cols-[180px_1fr_80px] items-center gap-5">
              <div className="font-mono text-[13px] text-foreground/90">{p.name}</div>
              <div className="relative h-1.5 rounded-full bg-[var(--inset)]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-foreground/85"
                  style={{ width: `${(p.price / max) * 100}%` }}
                />
              </div>
              <div className="text-right font-mono text-[12.5px] tabular-nums">{p.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Catalog">
        <div>
          {CATALOG.map((m) => (
            <div key={m.name} className="grid grid-cols-[1.4fr_1fr_1fr] gap-10 py-8 hairline-b last:border-b-0">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-[18px] font-semibold tracking-[-0.01em]">{m.name}</h3>
                  {m.status ? <StatusPill tone="muted">{m.status}</StatusPill> : null}
                </div>
                <div className="mt-1 font-mono text-[11.5px] text-muted-foreground">{m.family}</div>
                <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted-foreground">{m.desc}</p>
              </div>
              <div>
                <div className="eyebrow-label">Pricing</div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-mono text-[18px] tracking-[-0.01em] tabular-nums">{m.promo}</span>
                  <span className="font-mono text-[12px] text-muted-foreground line-through">{m.normal}</span>
                </div>
                <div className="mt-1 text-[11.5px] text-muted-foreground">{m.per}</div>
              </div>
              <div>
                <div className="eyebrow-label">Pacing</div>
                <div className="mt-2 font-mono text-[14px] tabular-nums">{m.pace || "—"}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}


# src/routes/_app.playground.tsx

import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Play, Pause, Download, Wand2, ChevronDown, Plus } from "lucide-react";
import { PageHeader, Section, Waveform } from "../components/shell/primitives";

export const Route = createFileRoute("/_app/playground")({
  head: () => ({
    meta: [
      { title: "Playground — Rumik AI" },
      { name: "description", content: "Test synthesis with live parameters, presets, and instant playback." },
    ],
  }),
  component: Playground,
});

const TONES = ["Neutral", "Happy", "Excited", "Sad", "Angry", "Whisper"];
const MODELS = ["silk muga 1", "silk mulberry 1.5"];
const TAGS = [
  { tag: "laugh",    hint: "soft laugh" },
  { tag: "chuckle",  hint: "warm chuckle" },
  { tag: "sigh",     hint: "long exhale" },
  { tag: "whisper",  hint: "lowered voice" },
  { tag: "pause",    hint: "200 ms gap" },
  { tag: "excited",  hint: "energy lift" },
];

const HISTORY = [
  { ago: "2 min ago",  model: "silk muga 1",       text: "hello, this is a test of the rumik voice API. <laugh> pretty nice, isn't it?" },
  { ago: "14 min ago", model: "silk muga 1",       text: "welcome back, your dashboard has three new logs to review." },
  { ago: "1 h ago",    model: "silk mulberry 1.5", text: "good morning. setting your focus for the next forty minutes." },
];

function Playground() {
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState(
    "hello, this is a test of the rumik voice API. <laugh> pretty nice, isn't it?",
  );
  const [model, setModel] = useState(MODELS[0]);
  const [tone, setTone] = useState("Neutral");
  const [temp, setTemp] = useState(0.7);
  const [topP, setTopP] = useState(0.95);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  function insertTag(tag: string) {
    const ta = taRef.current;
    const insert = `<${tag}> `;
    if (!ta) { setText((t) => t + insert); return; }
    const start = ta.selectionStart ?? text.length;
    const end = ta.selectionEnd ?? text.length;
    const next = text.slice(0, start) + insert + text.slice(end);
    setText(next);
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + insert.length;
      ta.setSelectionRange(pos, pos);
    });
  }

  return (
    <>
      <PageHeader
        eyebrow="Playground"
        title="Text to speech"
        subtitle="Compose, tune, and listen — changes apply on synthesis."
        actions={
          <button className="inline-flex items-center gap-2 rounded-md bg-foreground px-3.5 py-2 text-[13px] font-medium text-background hover:bg-foreground/90 transition-colors">
            <Play className="h-3 w-3" fill="currentColor" />
            Synthesize
          </button>
        }
      />

      <div className="grid grid-cols-[1.6fr_1fr] gap-12">
        {/* Editor column */}
        <div>
          <div className="relative">
            <textarea
              ref={taRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
              className="min-h-[260px] w-full resize-none bg-transparent text-[16px] leading-[1.7] tracking-[-0.005em] text-foreground outline-none placeholder:text-muted-foreground/50"
            />
            <div className="mt-3 flex items-center justify-between hairline-t pt-3">
              <button className="inline-flex items-center gap-1.5 rounded-md bg-[var(--inset)] px-2.5 py-1 text-[12px] text-foreground/80 hover:bg-[var(--inset)]/70">
                <Wand2 className="h-3 w-3" strokeWidth={2} />
                Enhance
              </button>
              <div className="font-mono text-[11.5px] tabular-nums text-muted-foreground">
                <span className="text-foreground">{text.length}</span> / 2000 chars
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-[11.5px] text-muted-foreground">Tone tags</span>
              <span className="text-[11px] text-muted-foreground/60">Click to insert at cursor</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TAGS.map((t) => (
                <button
                  key={t.tag}
                  onClick={() => insertTag(t.tag)}
                  title={t.hint}
                  className="group inline-flex items-center gap-1 rounded-md border border-border/70 bg-background px-2 py-1 font-mono text-[11.5px] text-muted-foreground transition-all hover:-translate-y-px hover:border-foreground/40 hover:text-foreground"
                >
                  <Plus className="h-2.5 w-2.5 opacity-40 transition-opacity group-hover:opacity-100" />
                  &lt;{t.tag}&gt;
                </button>
              ))}
            </div>
          </div>

          <Section title="History">
            <div className="-mx-3">
              {HISTORY.map((h, i) => {
                const playing = playingIdx === i;
                return (
                  <div
                    key={i}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-md px-3 py-3.5 row-hover"
                  >
                    <button
                      onClick={() => setPlayingIdx(playing ? null : i)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background transition-transform hover:scale-105 active:scale-95"
                    >
                      {playing ? <Pause className="h-3.5 w-3.5" fill="currentColor" /> : <Play className="h-3.5 w-3.5 translate-x-[1px]" fill="currentColor" />}
                    </button>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-[13px] font-medium text-foreground">{h.model}</span>
                        <span className="text-[11.5px] text-muted-foreground/70">· {h.ago}</span>
                      </div>
                      <div className="mt-1 truncate text-[13px] text-foreground/90">{h.text}</div>
                      <div className="mt-2"><Waveform bars={48} playing={playing} /></div>
                    </div>
                    <button className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[var(--inset)] hover:text-foreground">
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </Section>
        </div>

        {/* Parameter column */}
        <aside className="border-l border-border pl-10">
          <div className="eyebrow-label">
            Model
          </div>
          <div className="mt-3 inline-flex rounded-md bg-[var(--inset)] p-0.5">
            {MODELS.map((m) => (
              <button
                key={m}
                onClick={() => setModel(m)}
                className={`rounded-[5px] px-2.5 py-1 font-mono text-[11.5px] transition-colors ${
                  model === m ? "bg-background text-foreground shadow-[0_0_0_1px_var(--border)]" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="mt-8 eyebrow-label">
            Tone preset
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {TONES.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`rounded-full px-2.5 py-1 text-[12px] transition-colors ${
                  tone === t
                    ? "bg-foreground text-background"
                    : "bg-[var(--inset)] text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-10">
            <button className="flex w-full items-center justify-between eyebrow-label">
              Advanced
              <ChevronDown className="h-3 w-3" />
            </button>

            <div className="mt-4 space-y-5">
              <Slider label="Temperature" value={temp} min={0} max={1} step={0.05} onChange={setTemp} hint="0.7 recommended" />
              <Slider label="Top-P"        value={topP} min={0} max={1} step={0.01} onChange={setTopP} />
              <ParamRow label="Top-K" value="50" />
              <ParamRow label="Repetition penalty" value="1.20" />
              <ParamRow label="Max new tokens" value="2,048" />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function Slider({
  label, value, min, max, step, onChange, hint,
}: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; hint?: string; }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[12.5px] text-muted-foreground">{label}</span>
        <span className="font-mono text-[12px] tabular-nums">{value.toFixed(2)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-foreground"
      />
      {hint ? <div className="mt-1 text-[11px] text-muted-foreground/70">{hint}</div> : null}
    </div>
  );
}

function ParamRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-[12.5px] text-muted-foreground">{label}</span>
      <span className="font-mono text-[12px] tabular-nums">{value}</span>
    </div>
  );
}

# src/routes/_app.support.tsx

import { createFileRoute } from "@tanstack/react-router";
import { Mail, BookOpen, MessageCircle, ArrowUpRight } from "lucide-react";
import { PageHeader } from "../components/shell/primitives";

export const Route = createFileRoute("/_app/support")({
  head: () => ({
    meta: [
      { title: "Support — Rumik AI" },
      { name: "description", content: "Talk to the team, browse docs, or join the developer community." },
    ],
  }),
  component: Support,
});

const CHANNELS = [
  { icon: Mail,          title: "Email support",     hint: "Account and billing — usually within a business day.", action: "hello@rumik.ai" },
  { icon: BookOpen,      title: "Documentation",     hint: "Guides, API reference, and interactive tutorials.",     action: "docs.rumik.ai" },
  { icon: MessageCircle, title: "Discord community", hint: "Builders shipping live voice companions, in public.",   action: "Join server" },
];

function Support() {
  return (
    <>
      <PageHeader
        eyebrow="Help"
        title="Support"
        subtitle="A quiet inbox is the goal. Pick the channel that fits."
      />
      <div className="-mx-3 hairline-t">
        {CHANNELS.map(({ icon: Icon, title, hint, action }) => (
          <a key={title} href="#" className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 px-3 py-7 hairline-b row-hover">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-[var(--inset)] text-foreground/80">
              <Icon className="h-[15px] w-[15px]" strokeWidth={1.75} />
            </span>
            <div>
              <div className="text-[15px] font-medium tracking-[-0.005em]">{title}</div>
              <div className="mt-1 text-[13px] text-muted-foreground">{hint}</div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[12.5px] text-muted-foreground transition-colors group-hover:text-foreground">
              {action}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

# src/routes/_app.tsx

import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronsUpDown, Command, Search, Plus, Bell, Check, Building2 } from "lucide-react";
import { NAV } from "../components/shell/nav";
import { Kbd } from "../components/shell/primitives";

export const Route = createFileRoute("/_app")({
  component: AppShell,
});

function AppShell() {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="relative flex-1">
          <NoiseOverlay />
          <div className="mx-auto max-w-[1100px] px-10 pb-24 pt-12 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}

function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [wsOpen, setWsOpen] = useState(false);
  const [ws, setWs] = useState("Personal workspace");
  const wsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!wsRef.current?.contains(e.target as Node)) setWsOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const workspaces = [
    { name: "Personal workspace", hint: "shred@rumik.ai" },
    { name: "Acme Studio", hint: "team — 4 members" },
    { name: "Lab", hint: "scratchpad" },
  ];

  return (
    <aside className="sticky top-0 flex h-screen w-[244px] shrink-0 flex-col bg-[var(--sidebar)] hairline-b border-b-0 border-r">
      <div ref={wsRef} className="relative px-3 pt-3">
        <button
          onClick={() => setWsOpen((v) => !v)}
          className="flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors hover:bg-[var(--sidebar-accent)]/70"
        >
          <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background">
            <span className="font-display text-[12px] font-semibold">R</span>
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate font-display text-[13.5px] font-semibold">Rumik</div>
            <div className="truncate text-[11px] text-muted-foreground">{ws}</div>
          </div>
          <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground/70" />
        </button>
        {wsOpen ? (
          <div className="absolute left-3 right-3 top-[calc(100%+4px)] z-20 rounded-lg border border-border bg-background p-1.5 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.25)] pop-in">
            <div className="px-2 pb-1.5 pt-1 font-display text-[10.5px] font-medium tracking-tight text-muted-foreground/80">
              Switch workspace
            </div>
            {workspaces.map((w) => {
              const active = w.name === ws;
              return (
                <button
                  key={w.name}
                  onClick={() => { setWs(w.name); setWsOpen(false); }}
                  className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-[var(--inset)]"
                >
                  <span className="grid h-6 w-6 place-items-center rounded bg-[var(--inset)] text-muted-foreground">
                    <Building2 className="h-3 w-3" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[12.5px] text-foreground">{w.name}</span>
                    <span className="block truncate text-[10.5px] text-muted-foreground">{w.hint}</span>
                  </span>
                  {active ? <Check className="h-3.5 w-3.5 text-foreground" strokeWidth={2} /> : null}
                </button>
              );
            })}
            <div className="mt-1 hairline-t" />
            <button className="mt-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12.5px] text-muted-foreground transition-colors hover:bg-[var(--inset)] hover:text-foreground">
              <Plus className="h-3.5 w-3.5" />
              New workspace
            </button>
          </div>
        ) : null}
      </div>

      <nav className="mt-2 flex-1 overflow-y-auto px-3 pb-6 fade-mask-y">
        {NAV.map((group) => (
          <div key={group.label} className="mb-5">
            <div className="px-3 pb-2 pt-3 font-display text-[11px] font-medium tracking-tight text-muted-foreground/70">
              {group.label}
            </div>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.to === "/"
                    ? pathname === "/"
                    : pathname === item.to || pathname.startsWith(item.to + "/");
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`group relative flex items-center gap-2.5 rounded-md px-3 py-[7px] text-[13px] transition-all duration-150 ${
                        active
                          ? "bg-[var(--sidebar-accent)] text-foreground"
                          : "text-muted-foreground hover:bg-[var(--sidebar-accent)]/60 hover:text-foreground"
                      }`}
                    >
                      <Icon
                        className={`h-[15px] w-[15px] transition-colors ${active ? "text-foreground" : "text-muted-foreground/70 group-hover:text-foreground"}`}
                        strokeWidth={1.75}
                      />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.hint ? (
                        <span className="font-mono text-[10px] text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100">
                          {item.hint}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="hairline-t mx-3 mb-3 mt-1 flex items-center gap-2.5 rounded-md border-0 px-2 py-2.5">
        <div className="grid h-7 w-7 place-items-center rounded-full bg-foreground/90 text-[11px] font-semibold text-background">
          S
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate text-[12.5px] font-medium">Shred</div>
          <div className="truncate text-[11px] text-muted-foreground">shred@rumik.ai</div>
        </div>
        <span className="rounded-full bg-[var(--success-soft)] px-1.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[var(--success)]">
          Pro
        </span>
      </div>
    </aside>
  );
}

function Topbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [searchFocused, setSearchFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const crumb =
    NAV.flatMap((g) => g.items).find((i) =>
      i.to === "/" ? pathname === "/" : pathname.startsWith(i.to),
    )?.label ?? "Overview";
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-3 bg-background/80 px-8 backdrop-blur-md hairline-b">
      <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
        <span>Rumik</span>
        <span className="text-border">/</span>
        <span className="font-display text-foreground">{crumb}</span>
      </div>
      <div
        className={`ml-6 flex h-8 items-center gap-2 rounded-md px-2.5 text-[12.5px] text-muted-foreground transition-all duration-200 ease-out ${
          searchFocused
            ? "w-[420px] bg-background ring-1 ring-foreground/15"
            : "w-[280px] bg-[var(--inset)] hover:bg-[var(--inset)]/70"
        }`}
      >
        <Search className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
        <input
          ref={inputRef}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search models, logs, keys, docs…"
          className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground/60"
        />
        <span className="flex shrink-0 items-center gap-1">
          <Kbd><Command className="h-2.5 w-2.5" /></Kbd>
          <Kbd>K</Kbd>
        </span>
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        <TopbarIconButton label="Notifications" Icon={Bell} />
        <TopbarIconButton label="Quick create — new key, top-up, request" Icon={Plus} />
        <div className="mx-2 h-5 w-px bg-border" />
        <Link
          to="/billing"
          title="Active credit balance · click to top up"
          className="group flex items-center gap-2 rounded-md bg-[var(--inset)] px-2.5 py-1 transition-colors hover:bg-foreground hover:text-background"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-foreground transition-colors group-hover:bg-background" />
          <span className="font-mono text-[12px] font-medium tabular-nums">1,024</span>
          <span className="text-[11.5px] text-muted-foreground transition-colors group-hover:text-background/70">credits</span>
        </Link>
      </div>
    </header>
  );
}

function TopbarIconButton({ label, Icon }: { label: string; Icon: typeof Plus }) {
  return (
    <div className="group relative">
      <button
        aria-label={label}
        className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-[var(--inset)] hover:text-foreground"
      >
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </button>
      <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[11px] font-medium text-background opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
}

# src/routes/_app.usage.tsx

import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { PageHeader, Section } from "../components/shell/primitives";

export const Route = createFileRoute("/_app/usage")({
  head: () => ({
    meta: [
      { title: "Usage — Rumik AI" },
      { name: "description", content: "Generation, request density, and credit burn over time." },
    ],
  }),
  component: Usage,
});

const DAYS = Array.from({ length: 30 }, (_, i) => ({
  d: i + 1,
  ok: i > 26 ? Math.floor(Math.random() * 3) + 1 : 0,
  fail: 0,
}));

const RANGES = ["24h", "7d", "30d"];

function Usage() {
  return (
    <>
      <PageHeader
        eyebrow="Analytics"
        title="Usage"
        subtitle="May 28, 2026 — Jun 27, 2026"
        actions={
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-md bg-[var(--inset)] p-0.5">
              {RANGES.map((r, i) => (
                <button
                  key={r}
                  className={`rounded-[5px] px-2.5 py-1 text-[12px] transition-colors ${
                    i === 2 ? "bg-background text-foreground shadow-[0_0_0_1px_var(--border)]" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-md bg-[var(--inset)] px-2.5 py-1.5 text-[12px] text-muted-foreground hover:text-foreground">
              <Calendar className="h-3.5 w-3.5" />
              Custom
            </button>
          </div>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-4 hairline-b border-t pb-2 pt-1">
        {[
          { label: "Requests",      value: "3",      hint: "3 ok · 0 failed" },
          { label: "Success rate",  value: "100.0%", hint: "rolling 30d" },
          { label: "Characters",    value: "228",    hint: "billable input" },
          { label: "Credits burned", value: "0",     hint: "of 1,024" },
        ].map((k, i) => (
          <div key={k.label} className={`px-6 py-6 ${i > 0 ? "border-l border-border" : ""}`}>
            <div className="eyebrow-label">{k.label}</div>
            <div className="mt-3 font-mono text-[28px] font-medium leading-none tracking-[-0.02em] tabular-nums">{k.value}</div>
            <div className="mt-2 text-[11.5px] text-muted-foreground">{k.hint}</div>
          </div>
        ))}
      </div>

      <Section title="Requests over time" hint="Successful vs failed, daily.">
        <div className="relative h-[180px] w-full">
          <div className="absolute inset-0 flex items-end gap-1.5">
            {DAYS.map((d) => {
              const total = d.ok + d.fail;
              const h = total === 0 ? 4 : 30 + total * 35;
              return (
                <div key={d.d} className="group relative flex-1">
                  <div
                    className={`w-full rounded-sm transition-colors ${total > 0 ? "bg-foreground/80" : "bg-border"}`}
                    style={{ height: `${h}px` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between font-mono text-[10.5px] text-muted-foreground">
            <span>May 28</span><span>Jun 12</span><span>Jun 27</span>
          </div>
        </div>
      </Section>

      <Section title="Breakdown" hint="Where the activity comes from.">
        <div className="grid grid-cols-2 gap-12">
          <Breakdown
            title="By source"
            rows={[
              { name: "Playground", req: 3, pct: 100 },
              { name: "API key",    req: 0, pct: 0 },
            ]}
          />
          <Breakdown
            title="By model"
            rows={[
              { name: "silk muga 1",       req: 3, pct: 100, mono: true },
              { name: "silk mulberry 1.5", req: 0, pct: 0,   mono: true },
            ]}
          />
          <Breakdown
            title="By API key"
            rows={[{ name: "test", req: 0, pct: 0, mono: true }]}
          />
          <Breakdown
            title="By status"
            rows={[{ name: "200 OK", req: 3, pct: 100, mono: true }]}
          />
        </div>
      </Section>
    </>
  );
}

function Breakdown({
  title,
  rows,
}: {
  title: string;
  rows: { name: string; req: number; pct: number; mono?: boolean }[];
}) {
  return (
    <div>
      <div className="pb-2 text-[12px] font-medium text-foreground">{title}</div>
      <div>
        {rows.map((r) => (
          <div key={r.name} className="grid grid-cols-[1fr_50px_50px] items-center gap-3 py-2.5 hairline-b last:border-b-0">
            <span className={`${r.mono ? "font-mono" : ""} truncate text-[13px] text-foreground/90`}>{r.name}</span>
            <span className="text-right font-mono text-[12.5px] tabular-nums text-muted-foreground">{r.req}</span>
            <span className="text-right font-mono text-[12.5px] tabular-nums text-muted-foreground">{r.pct.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

# src/routes/README.md

<h1> Routes </h1>

TanStack Start uses **file-based routing**. Every `.tsx` file in this directory
defines a route. Do **not** create `src/pages/`, `src/routes/_app/index.tsx`, or
`app/layout.tsx` — those are Next.js / Remix conventions. The only root layout
is `src/routes/__root.tsx`.

<h2> Conventions </h2>

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `users/index.tsx` | `/users` |
| `users/$id.tsx` | `/users/:id` (dynamic — bare `$`, no curly braces) |
| `posts/{-$category}.tsx` | `/posts/:category?` (optional segment) |
| `files/$.tsx` | `/files/*` (splat — read via `_splat` param, never `*`) |
| `_layout.tsx` | layout route (renders children via `<Outlet />`) |
| `__root.tsx` | app shell — wraps every page; preserve `<Outlet />` |

`routeTree.gen.ts` is auto-generated. Don't edit it by hand.

# src/router.tsx

import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
