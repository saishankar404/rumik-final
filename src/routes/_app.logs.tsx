import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { MagnifyingGlass, X, CaretDown, Check } from "@phosphor-icons/react";
import {
  PageHeader,
  StatusPill,
  Waveform,
  SkeletonRow,
  Skeleton,
  EmptyState,
} from "../components/shell/primitives";
import { useWorkspace, useMockResource, useFocusTrap } from "../lib/store";

export const Route = createFileRoute("/_app/logs")({
  head: () => ({
    meta: [
      { title: "Logs — Rumik AI" },
      {
        name: "description",
        content: "Inspect every request: tokens, status, and audio output.",
      },
    ],
  }),
  component: Logs,
});

interface LogItem {
  id: string;
  ago: string;
  source: string;
  model: string;
  key: string;
  tokIn: number;
  tokOut: number;
  credits: number;
  status: number;
  text: string;
}

// Dynamic log data by Workspace
const WORKSPACE_LOGS: Record<string, LogItem[]> = {
  "Personal workspace": [
    {
      id: "f2a2d8f3-eec7-46de-a74e-ebd287c13b50",
      ago: "3m ago",
      source: "API Key",
      model: "silk muga 1",
      key: "prod-key-01",
      tokIn: 76,
      tokOut: 110,
      credits: 0.12,
      status: 200,
      text: "Good morning! Setting focus mode for next hour.",
    },
    {
      id: "bfdbdd52-1775-464a-bd5e-5c2b0a2f1580",
      ago: "14m ago",
      source: "API Key",
      model: "silk mulberry 1.5",
      key: "prod-key-01",
      tokIn: 184,
      tokOut: 240,
      credits: 0.28,
      status: 200,
      text: "Introduced by the Acme group. A live sample readout.",
    },
    {
      id: "4a21f99f-760d-4d54-a4aa-bb31f1dbff38",
      ago: "1h ago",
      source: "Playground",
      model: "silk muga 1",
      key: "default",
      tokIn: 64,
      tokOut: 90,
      credits: 0.12,
      status: 200,
      text: "Testing custom emotion tag insertion here.",
    },
    {
      id: "3f82e8f1-eec7-46de-a74e-ebd287c13b29",
      ago: "2h ago",
      source: "API Key",
      model: "silk muga 1",
      key: "dev-key-02",
      tokIn: 76,
      tokOut: 110,
      credits: 0.12,
      status: 200,
      text: "Testing sandbox connectivity rate metrics.",
    },
    {
      id: "7a21d8a2-760d-4d54-a4aa-bb31f1dbff01",
      ago: "4h ago",
      source: "API Key",
      model: "silk muga 1",
      key: "prod-key-01",
      tokIn: 120,
      tokOut: 0,
      credits: 0,
      status: 500,
      text: "System connection reset from client peer node.",
    },
  ],
  "Acme Studio": [
    {
      id: "9a8b7c6d-eec7-46de-a74e-ebd287c13b01",
      ago: "1m ago",
      source: "API Key",
      model: "silk muga 1",
      key: "acme-live-api",
      tokIn: 145,
      tokOut: 200,
      credits: 0.12,
      status: 200,
      text: "Acme Production Loop initialized.",
    },
    {
      id: "8f7e6d5c-1775-464a-bd5e-5c2b0a2f1580",
      ago: "4m ago",
      source: "API Key",
      model: "silk muga 1",
      key: "acme-live-api",
      tokIn: 92,
      tokOut: 120,
      credits: 0.12,
      status: 200,
      text: "Telemetry diagnostics active.",
    },
    {
      id: "7d6c5b4a-760d-4d54-a4aa-bb31f1dbff38",
      ago: "8m ago",
      source: "API Key",
      model: "silk mulberry 1.5",
      key: "staging-webhook",
      tokIn: 240,
      tokOut: 310,
      credits: 0.28,
      status: 200,
      text: "Webhook receiver payload processed successfully.",
    },
  ],
  Lab: [
    {
      id: "1a2b3c4d-eec7-46de-a74e-ebd287c13b02",
      ago: "1h ago",
      source: "API Key",
      model: "silk muga 1",
      key: "scratchpad-temp",
      tokIn: 48,
      tokOut: 70,
      credits: 0.12,
      status: 200,
      text: "Quick scratch test.",
    },
    {
      id: "2b3c4d5e-1775-464a-bd5e-5c2b0a2f1580",
      ago: "4h ago",
      source: "API Key",
      model: "silk muga 1",
      key: "scratchpad-temp",
      tokIn: 55,
      tokOut: 80,
      credits: 0.12,
      status: 200,
      text: "Verify playground response metrics.",
    },
  ],
};

const SEED_LOGS: LogItem[] = WORKSPACE_LOGS["Personal workspace"];

function Logs() {
  const ws = useWorkspace();
  const { data: rawLogs, isLoading } = useMockResource<LogItem[]>(
    WORKSPACE_LOGS[ws] || SEED_LOGS,
  );
  const logs = rawLogs ?? [];

  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [codeExpanded, setCodeExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocusedRowRef = useRef<HTMLButtonElement | null>(null);

  // Restore focus to the clicked row when the drawer closes
  useEffect(() => {
    if (!openId && lastFocusedRowRef.current) {
      lastFocusedRowRef.current.focus();
      lastFocusedRowRef.current = null;
    }
  }, [openId]);

  // Escape key closes the drawer
  useEffect(() => {
    if (!openId) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenId(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openId]);

  // Focus trap for the drawer
  useFocusTrap(panelRef, !!openId);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        // Only skip closing if we clicked an actual log row (which opens its own panel)
        const isLogRow = (e.target as HTMLElement).closest("[data-log-row]");
        if (!isLogRow) {
          setOpenId(null);
        }
      }
    }
    if (openId) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openId]);

  // Interactive filters
  const [modelFilter, setModelFilter] = useState<string | null>(null);
  const [keyFilter, setKeyFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<number | null>(null);

  // Active filter open states
  const [filterMenu, setFilterMenu] = useState<
    "model" | "key" | "status" | null
  >(null);

  const open = logs.find((l) => l.id === openId);

  // Extract unique models, keys, statuses for filtering options
  const models = Array.from(new Set(logs.map((l) => l.model)));
  const keys = Array.from(new Set(logs.map((l) => l.key)));
  const statuses = Array.from(new Set(logs.map((l) => l.status)));

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.id.toLowerCase().includes(search.toLowerCase()) ||
      l.model.toLowerCase().includes(search.toLowerCase()) ||
      l.text.toLowerCase().includes(search.toLowerCase());

    const matchesModel = !modelFilter || l.model === modelFilter;
    const matchesKey = !keyFilter || l.key === keyFilter;
    const matchesStatus = !statusFilter || l.status === statusFilter;

    return matchesSearch && matchesModel && matchesKey && matchesStatus;
  });

  function clearFilters() {
    setSearch("");
    setModelFilter(null);
    setKeyFilter(null);
    setStatusFilter(null);
  }

  const hasActiveFilters =
    search !== "" ||
    modelFilter !== null ||
    keyFilter !== null ||
    statusFilter !== null;

  return (
    <>
      <PageHeader
        eyebrow="Develop"
        title="Logs"
        subtitle="A ledger of every synthesis request — searchable and inspectable."
      />

      {/* Interactive filter search bar */}
      <div className="sticky top-14 z-[5] -mx-3 mb-2 flex items-center gap-2 bg-background/85 px-3 py-3 backdrop-blur-md hairline-b">
        <div className="flex h-8 flex-1 items-center gap-2 rounded-md bg-[var(--inset)] px-2.5">
          <MagnifyingGlass size={14} className="text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by request ID, model, or text"
            aria-label="Search logs"
            className="flex-1 bg-transparent text-[12.5px] outline-none placeholder:text-muted-foreground/60"
          />
        </div>

        {/* Model filter */}
        <div className="relative">
          <button
            onClick={() =>
              setFilterMenu(filterMenu === "model" ? null : "model")
            }
            aria-haspopup="listbox"
            aria-expanded={filterMenu === "model"}
            aria-label="Filter by model"
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] transition-colors ${
              modelFilter
                ? "bg-foreground text-background font-semibold"
                : "bg-[var(--inset)] text-muted-foreground hover:text-foreground"
            }`}
          >
            {modelFilter || "Model"}
            <CaretDown className="opacity-60" size={13} />
          </button>
          {filterMenu === "model" && (
            <div
              role="listbox"
              aria-label="Model filter options"
              className="absolute right-0 mt-1.5 z-20 w-44 rounded-lg border border-border bg-background p-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] pop-in"
            >
              <button
                role="option"
                aria-selected={!modelFilter}
                onClick={() => {
                  setModelFilter(null);
                  setFilterMenu(null);
                }}
                className="flex w-full items-center justify-between rounded px-2.5 py-1.5 text-left text-[12px] hover:bg-[var(--inset)]"
              >
                All models
                {!modelFilter && <Check size={12} />}
              </button>
              {models.map((m: string) => (
                <button
                  key={m}
                  role="option"
                  aria-selected={modelFilter === m}
                  onClick={() => {
                    setModelFilter(m);
                    setFilterMenu(null);
                  }}
                  className="flex w-full items-center justify-between rounded px-2.5 py-1.5 text-left text-[12px] hover:bg-[var(--inset)]"
                >
                  {m}
                  {modelFilter === m && <Check size={12} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Key filter */}
        <div className="relative">
          <button
            onClick={() => setFilterMenu(filterMenu === "key" ? null : "key")}
            aria-haspopup="listbox"
            aria-expanded={filterMenu === "key"}
            aria-label="Filter by key"
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] transition-colors ${
              keyFilter
                ? "bg-foreground text-background font-semibold"
                : "bg-[var(--inset)] text-muted-foreground hover:text-foreground"
            }`}
          >
            {keyFilter || "Key"}
            <CaretDown className="opacity-60" size={13} />
          </button>
          {filterMenu === "key" && (
            <div
              role="listbox"
              aria-label="Key filter options"
              className="absolute right-0 mt-1.5 z-20 w-44 rounded-lg border border-border bg-background p-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] pop-in"
            >
              <button
                role="option"
                aria-selected={!keyFilter}
                onClick={() => {
                  setKeyFilter(null);
                  setFilterMenu(null);
                }}
                className="flex w-full items-center justify-between rounded px-2.5 py-1.5 text-left text-[12px] hover:bg-[var(--inset)]"
              >
                All keys
                {!keyFilter && <Check size={12} />}
              </button>
              {keys.map((k: string) => (
                <button
                  key={k}
                  role="option"
                  aria-selected={keyFilter === k}
                  onClick={() => {
                    setKeyFilter(k);
                    setFilterMenu(null);
                  }}
                  className="flex w-full items-center justify-between rounded px-2.5 py-1.5 text-left text-[12px] hover:bg-[var(--inset)]"
                >
                  {k}
                  {keyFilter === k && <Check size={12} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status filter */}
        <div className="relative">
          <button
            onClick={() =>
              setFilterMenu(filterMenu === "status" ? null : "status")
            }
            aria-haspopup="listbox"
            aria-expanded={filterMenu === "status"}
            aria-label="Filter by status"
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] transition-colors ${
              statusFilter
                ? "bg-foreground text-background font-semibold"
                : "bg-[var(--inset)] text-muted-foreground hover:text-foreground"
            }`}
          >
            {statusFilter ? `${statusFilter}` : "Status"}
            <CaretDown className="opacity-60" size={13} />
          </button>
          {filterMenu === "status" && (
            <div
              role="listbox"
              aria-label="Status filter options"
              className="absolute right-0 mt-1.5 z-20 w-36 rounded-lg border border-border bg-background p-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] pop-in"
            >
              <button
                role="option"
                aria-selected={!statusFilter}
                onClick={() => {
                  setStatusFilter(null);
                  setFilterMenu(null);
                }}
                className="flex w-full items-center justify-between rounded px-2.5 py-1.5 text-left text-[12px] hover:bg-[var(--inset)]"
              >
                All statuses
                {!statusFilter && <Check size={12} />}
              </button>
              {statuses.map((s: number) => (
                <button
                  key={s}
                  role="option"
                  aria-selected={statusFilter === s}
                  onClick={() => {
                    setStatusFilter(s);
                    setFilterMenu(null);
                  }}
                  className="flex w-full items-center justify-between rounded px-2.5 py-1.5 text-left text-[12px] hover:bg-[var(--inset)]"
                >
                  {s}
                  {statusFilter === s && <Check size={12} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="-mx-3 mt-6 animate-fade-in">
        {isLoading ? (
          <>
            {/* Desktop skeleton */}
            <div className="hidden md:block">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} cols={7} className="hairline-t" />
              ))}
            </div>
            {/* Mobile skeleton */}
            <div className="md:hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2.5 px-3 py-4 hairline-t">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* ── Desktop table view ── */}
            <div className="hidden md:grid grid-cols-[110px_110px_140px_1fr_90px_70px_60px] gap-5 px-3 pb-2.5 eyebrow-label border-b border-border/50">
              <span>Time</span>
              <span>Source</span>
              <span>Model</span>
              <span>Request ID</span>
              <span>Tokens</span>
              <span>Credits</span>
              <span>Status</span>
            </div>
            {filteredLogs.map((l: LogItem) => {
              const isOk = l.status === 200;
              return (
                <button
                  key={l.id}
                  data-log-row
                  aria-label={`Log ${l.id}: ${l.model} ${l.status}`}
                  onClick={(e) => {
                    lastFocusedRowRef.current = e.currentTarget;
                    setOpenId(l.id);
                    setCodeExpanded(false);
                  }}
                  className={`hidden md:grid w-full grid-cols-[110px_110px_140px_1fr_90px_70px_60px] items-center gap-5 rounded-md px-3 py-3 text-left transition-colors ${
                    openId === l.id ? "bg-[var(--inset)]" : "row-hover"
                  }`}
                >
                  <span className="text-[12.5px] text-muted-foreground">
                    {l.ago}
                  </span>
                  <span className="text-[12.5px] text-muted-foreground">
                    {l.source}
                  </span>
                  <span className="font-mono text-[12px] text-foreground/90">
                    {l.model}
                  </span>
                  <span className="truncate font-mono text-[12px] text-muted-foreground">
                    {l.id}
                  </span>
                  <span className="font-mono text-[12px] tabular-nums text-muted-foreground">
                    {l.tokIn} / {l.tokOut}
                  </span>
                  <span className="font-mono text-[12px] tabular-nums text-muted-foreground">
                    {l.credits > 0 ? l.credits.toFixed(2) : "—"}
                  </span>
                  <div className="w-16">
                    <StatusPill tone={isOk ? "success" : "warn"} dot>
                      <span className="font-display tabular-nums text-[10.5px]">
                        {l.status}
                      </span>
                    </StatusPill>
                  </div>
                </button>
              );
            })}

            {/* ── Mobile card view ── */}
            <div className="md:hidden">
              {filteredLogs.map((l: LogItem) => {
                const isOk = l.status === 200;
                return (
                  <button
                    key={l.id}
                    data-log-row
                    aria-label={`Log ${l.id}: ${l.model} ${l.status}`}
                    onClick={(e) => {
                      lastFocusedRowRef.current = e.currentTarget;
                      setOpenId(l.id);
                      setCodeExpanded(false);
                    }}
                    className={`block w-full space-y-2.5 rounded-md px-3 py-4 text-left transition-colors ${
                      openId === l.id ? "bg-[var(--inset)]" : "row-hover"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[12px] text-foreground/90">
                        {l.model}
                      </span>
                      <StatusPill tone={isOk ? "success" : "warn"} dot>
                        <span className="font-display tabular-nums text-[10.5px]">
                          {l.status}
                        </span>
                      </StatusPill>
                    </div>
                    <div className="truncate font-mono text-[11px] text-muted-foreground">
                      {l.id}
                    </div>
                    <div className="text-[12.5px] text-muted-foreground">
                      {l.ago}
                    </div>
                  </button>
                );
              })}
            </div>

            {filteredLogs.length === 0 && (
              <EmptyState
                icon={MagnifyingGlass}
                title="No logs match your filters"
                description="Try adjusting your search or clearing filters."
                action={
                  hasActiveFilters ? (
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 rounded-md bg-foreground px-3.5 py-2 text-[13px] font-medium text-background hover:bg-foreground/90 active:scale-[0.96] transition-transform duration-150 animate-fade-in"
                    >
                      Clear filters
                    </button>
                  ) : undefined
                }
              />
            )}
          </>
        )}
      </div>

      {/* ── Side-Panel Details Drawer ── */}
      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Log details"
          className="fixed inset-y-0 right-0 z-30 flex w-full md:w-[440px] flex-col bg-background border-l border-border/80 shadow-[-12px_0_40px_-20px_rgba(0,0,0,0.18)] animate-slide-in-right"
        >
          <div className="flex items-center justify-between px-4 md:px-6 py-3.5 md:py-4 border-b border-border/40">
            <div className="min-w-0 pr-3">
              <div className="eyebrow-label">Request detail</div>
              <div className="mt-1 truncate font-mono text-[11px] md:text-[12px] text-muted-foreground">
                {open.id}
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenId(null);
              }}
              className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-[var(--inset)] hover:text-foreground active:scale-[0.95]"
            >
              <X size={15} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 md:py-6 space-y-5 md:space-y-6">
            <Block title="Request metadata">
              <Field k="Time" v={open.ago} />
              <Field k="Integration key" v={open.key} />
              <Field k="Input volume" v={`${open.tokIn} characters`} />
            </Block>

            <Block title="Request payload body">
              <div className="relative">
                <div
                  className={`rounded-md bg-[var(--inset)] p-2.5 md:p-3 font-mono text-[11px] md:text-[11.5px] leading-relaxed text-foreground/85 transition-all duration-150 overflow-x-auto ${
                    codeExpanded
                      ? "max-h-none"
                      : "max-h-[120px] md:max-h-[135px] overflow-hidden"
                  }`}
                >
                  <pre>{`{
  "model": "${open.model}",
  "text": "${open.text}",
  "temperature": 0.70,
  "top_p": 0.95,
  "max_tokens": 2048
}`}</pre>
                </div>

                {/* Fade-out mask only shows when code height is constrained */}
                {!codeExpanded && (
                  <>
                    <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                    <button
                      type="button"
                      onClick={() => setCodeExpanded(true)}
                      className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded bg-foreground px-2.5 py-1 text-[11px] md:text-[11.5px] font-semibold text-background hover:bg-foreground/90 active:scale-[0.96] transition-transform duration-150 shadow-sm"
                    >
                      More
                    </button>
                  </>
                )}
              </div>
            </Block>

            <Block title="Response parameters">
              <Field
                k="Status code"
                v={`${open.status} ${open.status === 200 ? "OK" : "ERROR"}`}
              />
              <Field
                k="Cost accrued"
                v={`${open.credits > 0 ? `${open.credits.toFixed(2)} credits` : "—"}`}
              />
              <div className="pt-3 md:pt-4">
                <Waveform bars={open.tokOut} />
              </div>
            </Block>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2.5 md:mb-3 eyebrow-label">{title}</div>
      <div>{children}</div>
    </div>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-2.5 hairline-b last:border-b-0">
      <span className="font-mono text-[11px] md:text-[11.5px] text-muted-foreground shrink-0">
        {k}
      </span>
      <span className="truncate font-display text-[12px] md:text-[12.5px] text-foreground/90 font-medium text-right">
        {v}
      </span>
    </div>
  );
}
