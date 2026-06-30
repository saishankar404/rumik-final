import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  Key,
  ChartBar,
  Wallet,
  Check,
  WarningCircle,
} from "@phosphor-icons/react";
import {
  PageHeader,
  Section,
  Sparkline,
  StatusPill,
  Skeleton,
  SkeletonCard,
  SkeletonRow,
  EmptyState,
} from "../components/shell/primitives";
import { useWorkspace, useMockResource } from "../lib/store";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Overview — Rumik AI" },
      {
        name: "description",
        content:
          "Your workspace at a glance: credits, recent activity, and quick actions.",
      },
    ],
  }),
  component: Overview,
});

// Dynamic workspace metrics
interface WsMetrics {
  balance: string;
  burned30d: string;
  req24h: number;
  successRate: string;
  activity: typeof ACTIVITY_SEED;
  topModels: typeof TOP_MODELS_SEED;
  sparkValues: number[];
}

const ACTIVITY_SEED = [
  {
    model: "silk-muga-1",
    action: "generation",
    source: "API Key",
    ago: "3m ago",
    ms: 174,
    cost: 0.12,
    status: 200,
  },
  {
    model: "silk-mulberry-1.5",
    action: "generation",
    source: "API Key",
    ago: "14m ago",
    ms: 262,
    cost: 0.28,
    status: 200,
  },
  {
    model: "silk-muga-1",
    action: "generation",
    source: "Playground",
    ago: "1h ago",
    ms: 191,
    cost: 0.12,
    status: 200,
  },
];

const TOP_MODELS_SEED = [
  {
    name: "Silk Muga 1",
    family: "muga",
    used: 521,
    spark: [
      12, 19, 23, 31, 27, 38, 42, 29, 35, 33, 24, 21, 28, 56, 61, 44, 32, 39,
      47, 51, 36,
    ],
  },
  {
    name: "Silk Mulberry 1.5",
    family: "mulberry",
    used: 320,
    spark: [
      8, 11, 15, 14, 18, 12, 9, 13, 21, 24, 18, 16, 22, 19, 15, 17, 23, 21, 19,
      25, 20,
    ],
  },
];

const WORKSPACE_METRICS: Record<string, WsMetrics> = {
  "Personal workspace": {
    balance: "1,024",
    burned30d: "220",
    req24h: 849,
    successRate: "96.2%",
    activity: [
      {
        model: "silk-muga-1",
        action: "generation",
        source: "API Key",
        ago: "3m ago",
        ms: 174,
        cost: 0.12,
        status: 200,
      },
      {
        model: "silk-mulberry-1.5",
        action: "generation",
        source: "API Key",
        ago: "14m ago",
        ms: 262,
        cost: 0.28,
        status: 200,
      },
      {
        model: "silk-muga-1",
        action: "generation",
        source: "Playground",
        ago: "1h ago",
        ms: 191,
        cost: 0.12,
        status: 200,
      },
      {
        model: "silk-muga-1",
        action: "generation",
        source: "API Key",
        ago: "2h ago",
        ms: 182,
        cost: 0.12,
        status: 200,
      },
      {
        model: "silk-muga-1",
        action: "generation",
        source: "API Key",
        ago: "4h ago",
        ms: 403,
        cost: 0,
        status: 500,
      },
      {
        model: "silk-mulberry-1.5",
        action: "generation",
        source: "API Key",
        ago: "5h ago",
        ms: 279,
        cost: 0.28,
        status: 200,
      },
    ],
    topModels: [
      {
        name: "Silk Muga 1",
        family: "muga",
        used: 521,
        spark: [
          12, 19, 23, 31, 27, 38, 42, 29, 35, 33, 24, 21, 28, 56, 61, 44, 32,
          39, 47, 51, 36,
        ],
      },
      {
        name: "Silk Mulberry 1.5",
        family: "mulberry",
        used: 320,
        spark: [
          8, 11, 15, 14, 18, 12, 9, 13, 21, 24, 18, 16, 22, 19, 15, 17, 23, 21,
          19, 25, 20,
        ],
      },
    ],
    sparkValues: [
      12, 19, 8, 4, 23, 31, 27, 38, 42, 11, 6, 29, 35, 33, 24, 18, 9, 5, 21, 28,
      56, 61, 44, 13, 7, 32, 39, 47, 51, 36,
    ],
  },
  "Acme Studio": {
    balance: "14,850",
    burned30d: "4,120",
    req24h: 3412,
    successRate: "99.1%",
    activity: [
      {
        model: "silk-muga-1",
        action: "generation",
        source: "acme-live-api",
        ago: "1m ago",
        ms: 168,
        cost: 0.12,
        status: 200,
      },
      {
        model: "silk-muga-1",
        action: "generation",
        source: "acme-live-api",
        ago: "4m ago",
        ms: 172,
        cost: 0.12,
        status: 200,
      },
      {
        model: "silk-mulberry-1.5",
        action: "generation",
        source: "staging-webhook",
        ago: "8m ago",
        ms: 255,
        cost: 0.28,
        status: 200,
      },
      {
        model: "silk-muga-1",
        action: "generation",
        source: "acme-live-api",
        ago: "10m ago",
        ms: 162,
        cost: 0.12,
        status: 200,
      },
      {
        model: "silk-mulberry-1.5",
        action: "generation",
        source: "acme-live-api",
        ago: "12m ago",
        ms: 251,
        cost: 0.28,
        status: 200,
      },
    ],
    topModels: [
      {
        name: "Silk Muga 1",
        family: "muga",
        used: 2840,
        spark: [
          42, 56, 61, 84, 73, 91, 102, 115, 98, 122, 131, 142, 150, 168, 184,
          191, 210, 202, 215, 230, 245,
        ],
      },
      {
        name: "Silk Mulberry 1.5",
        family: "mulberry",
        used: 1280,
        spark: [
          20, 28, 31, 35, 42, 38, 45, 51, 58, 62, 59, 68, 71, 78, 82, 85, 91,
          98, 92, 101, 105,
        ],
      },
    ],
    sparkValues: [
      42, 56, 61, 84, 73, 91, 102, 115, 98, 122, 131, 142, 150, 168, 184, 191,
      210, 202, 215, 230, 245, 222, 238, 249, 255, 268, 275, 290, 302, 312,
    ],
  },
  Lab: {
    balance: "500",
    burned30d: "15",
    req24h: 42,
    successRate: "100%",
    activity: [
      {
        model: "silk-muga-1",
        action: "generation",
        source: "scratchpad-temp",
        ago: "1h ago",
        ms: 188,
        cost: 0.12,
        status: 200,
      },
      {
        model: "silk-muga-1",
        action: "generation",
        source: "scratchpad-temp",
        ago: "4h ago",
        ms: 195,
        cost: 0.12,
        status: 200,
      },
    ],
    topModels: [
      {
        name: "Silk Muga 1",
        family: "muga",
        used: 30,
        spark: [1, 2, 0, 1, 3, 2, 4, 1, 2, 3, 2, 1, 4, 3, 2, 1, 0, 2, 3, 1, 2],
      },
      {
        name: "Silk Mulberry 1.5",
        family: "mulberry",
        used: 12,
        spark: [0, 1, 0, 0, 1, 0, 2, 0, 1, 1, 0, 2, 1, 0, 1, 0, 1, 0, 1, 0, 0],
      },
    ],
    sparkValues: [
      1, 2, 0, 1, 3, 2, 4, 1, 2, 3, 2, 1, 4, 3, 2, 1, 0, 2, 3, 1, 2, 0, 1, 2, 1,
      0, 2, 1, 3, 2,
    ],
  },
};

const QUICK = [
  {
    to: "/api-keys",
    icon: Key,
    title: "Create an API key",
    hint: "Generate a new key with scopes and rate limits.",
  },
  {
    to: "/usage",
    icon: ChartBar,
    title: "View usage analytics",
    hint: "Charts, tokens, and credit burn over time.",
  },
  {
    to: "/billing",
    icon: Wallet,
    title: "Top up credits",
    hint: "Buy a package or set a custom amount.",
  },
];

function Overview() {
  const ws = useWorkspace();
  const { data: metrics, isLoading } = useMockResource(
    WORKSPACE_METRICS[ws] || WORKSPACE_METRICS["Personal workspace"],
  );

  const [hoveredReq, setHoveredReq] = useState<number | null>(null);
  const [hoveredModelIndex, setHoveredModelIndex] = useState<
    Record<string, number | null>
  >({});

  return (
    <>
      <section aria-label="Hello, Shred.">
        <PageHeader
          eyebrow="Monday, June 29"
          title="Hello, Shred."
          subtitle="Here's what's happening across your workspace today."
        />
      </section>

      {isLoading || !metrics ? (
        <>
          {/* KPI skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 sm:gap-10 md:gap-16 pb-6">
            <SkeletonCard />
            <div className="space-y-4 lg:border-l lg:border-border lg:pl-10">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>

          {/* Activity / Models skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-6 sm:gap-10 md:gap-16 border-t border-border/40">
            <div className="border-b border-border/30 pb-12 lg:border-b-0 lg:border-r lg:border-border/30 lg:pr-12 py-12">
              <Skeleton className="mb-7 h-4 w-32" />
              <div className="-mx-3 space-y-0.5">
                <SkeletonRow cols={4} />
                <SkeletonRow cols={4} />
                <SkeletonRow cols={4} />
              </div>
            </div>
            <div className="py-12">
              <Skeleton className="mb-2 h-4 w-24" />
              <Skeleton className="mb-7 h-3 w-40" />
              <div className="space-y-0.5">
                <SkeletonRow cols={3} />
                <SkeletonRow cols={3} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 sm:gap-10 md:gap-16 pb-6">
            <div>
              <div className="eyebrow-label">Active balance</div>
              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="font-display text-[48px] font-medium leading-none tracking-[-0.03em] tabular-nums">
                  {metrics.balance}
                </span>
                <span className="text-[14px] text-muted-foreground">
                  credits
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3 text-[12.5px] text-muted-foreground">
                <span>{metrics.burned30d} burned in last 30 days</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>Resets never</span>
              </div>
            </div>
            <div className="border-t border-border/40 pt-6 lg:border-t-0 lg:border-l lg:border-border lg:pl-10 lg:pt-0">
              <div className="eyebrow-label flex items-center justify-between">
                <span>Requests (24h)</span>
                {hoveredReq !== null && (
                  <span className="text-[12px] text-muted-foreground animate-fade-in normal-case font-medium">
                    {hoveredReq} requests
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="font-display text-[36px] font-medium leading-none tracking-[-0.02em] tabular-nums">
                  {hoveredReq !== null ? hoveredReq : metrics.req24h}
                </span>
                <StatusPill tone="success" dot>
                  {metrics.successRate} success
                </StatusPill>
              </div>
              <div
                className="mt-4 -ml-1 hidden md:block"
                role="img"
                aria-label="Request volume over last 24 hours"
              >
                <Sparkline
                  values={metrics.sparkValues}
                  onHover={(v) => setHoveredReq(v)}
                />
              </div>
            </div>
          </div>

          {/* Side-by-side Split layout for Recent Activity and Top Models */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-6 sm:gap-10 md:gap-16 border-t border-border/40">
            {/* Left Side: Recent Activity */}
            <div
              aria-label="Recent activity"
              className="border-b border-border/30 pb-12 lg:border-b-0 lg:border-r lg:border-border/30 lg:pr-12 py-12"
            >
              <div className="mb-7 flex items-baseline justify-between gap-6">
                <div>
                  <h2 className="font-display text-[15px] font-medium tracking-[-0.01em] text-foreground">
                    Recent activity
                  </h2>
                </div>
                <Link
                  to="/logs"
                  className="text-[12.5px] text-muted-foreground hover:text-foreground"
                >
                  Open logs →
                </Link>
              </div>

              {metrics.activity.length === 0 ? (
                <EmptyState
                  icon={ChartBar}
                  title="No recent activity"
                  description="Generate speech or make API requests to see activity here."
                />
              ) : (
                <div className="-mx-3 space-y-0.5">
                  {metrics.activity.map((a, i) => {
                    const isOk = a.status === 200;
                    return (
                      <div
                        key={i}
                        className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 rounded-md px-3 py-3 row-hover stagger-item"
                        style={{ animationDelay: `${i * 30}ms` }}
                      >
                        <div className="min-w-0 leading-tight">
                          <div className="truncate font-display text-[13.5px] font-medium text-foreground">
                            {a.action.charAt(0).toUpperCase() +
                              a.action.slice(1)}
                          </div>
                          <div className="mt-0.5 truncate text-[11.5px] text-muted-foreground">
                            <span className="font-mono text-[11px] font-medium text-foreground/80">
                              {a.model}
                            </span>{" "}
                            · <span className="hidden sm:inline">{a.ago}</span>{" "}
                            ·{" "}
                            <span className="hidden sm:inline">
                              via {a.source}
                            </span>
                          </div>
                        </div>
                        <span className="hidden sm:inline font-display text-[12.5px] tabular-nums text-muted-foreground shrink-0">
                          {a.ms} ms
                        </span>
                        <span className="hidden sm:inline font-display text-[12.5px] tabular-nums text-muted-foreground shrink-0">
                          {a.cost > 0 ? `${a.cost.toFixed(2)} cr` : "—"}
                        </span>
                        <div className="justify-self-end shrink-0">
                          <StatusPill tone={isOk ? "success" : "warn"} dot>
                            <span className="font-display tabular-nums text-[11px]">
                              {a.status}
                            </span>
                          </StatusPill>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Side: Top Models */}
            <div aria-label="Top models" className="py-12">
              <div className="mb-7">
                <h2 className="font-display text-[15px] font-medium tracking-[-0.01em] text-foreground">
                  Top models
                </h2>
                <p className="mt-1 text-[12.5px] text-muted-foreground/80">
                  Credits used in the last 30 days.
                </p>
              </div>

              {metrics.topModels.length === 0 ? (
                <EmptyState
                  icon={ChartBar}
                  title="No model usage"
                  description="Start generating speech to see model statistics here."
                />
              ) : (
                <div className="space-y-0.5">
                  {metrics.topModels.map((m, i) => {
                    const activeVal = hoveredModelIndex[m.name];
                    return (
                      <div
                        key={m.name}
                        className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto] items-center gap-6 py-4.5 border-b border-border/30 last:border-b-0 stagger-item"
                        style={{ animationDelay: `${i * 30}ms` }}
                      >
                        <div className="min-w-0">
                          <div className="font-display text-[14px] font-medium text-foreground truncate">
                            {m.name}
                          </div>
                          <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                            {m.family}
                          </div>
                        </div>
                        <div className="shrink-0 hidden md:block">
                          <Sparkline
                            values={m.spark}
                            onHover={(v) => {
                              setHoveredModelIndex((prev) => ({
                                ...prev,
                                [m.name]: v,
                              }));
                            }}
                          />
                        </div>
                        <div className="text-right shrink-0 min-w-[70px]">
                          <div className="font-display text-[14.5px] font-medium tabular-nums">
                            {activeVal !== null && activeVal !== undefined
                              ? activeVal
                              : m.used}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            credits
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions (Full width section below the side-by-side block) */}
      <Section title="Quick actions">
        <div>
          {QUICK.map(({ to, icon: Icon, title, hint }, i) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-5 rounded-md px-3 py-4 -mx-3 row-hover stagger-item"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--inset)] text-foreground/80">
                <Icon size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] text-foreground">{title}</div>
                <div className="text-[12.5px] text-muted-foreground">
                  {hint}
                </div>
              </div>
              <ArrowUpRight
                size={15}
                className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground shrink-0"
              />
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
