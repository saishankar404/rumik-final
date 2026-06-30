import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar as CalendarIcon, X } from "@phosphor-icons/react";
import { PageHeader, Section } from "../components/shell/primitives";
import { useWorkspace } from "../lib/store";

export const Route = createFileRoute("/_app/usage")({
  head: () => ({
    meta: [
      { title: "Usage — Rumik AI" },
      { name: "description", content: "Generation, request density, and credit burn over time." },
    ],
  }),
  component: Usage,
});

/* Mock data for range & workspace combinations */
interface RangeData {
  days: { d: number; ok: number; fail: number }[];
  total: number;
  totalOk: number;
  totalFail: number;
  successRate: string;
  chars: number;
  credits: number;
}

const WORKSPACE_DATA: Record<string, Record<string, RangeData>> = {
  "Personal workspace": {
    "24h": {
      days: Array.from({ length: 24 }, (_, i) => ({ d: i + 1, ok: i % 4 === 0 ? 3 : 1, fail: i === 12 ? 1 : 0 })),
      total: 36, totalOk: 35, totalFail: 1, successRate: "97.2%", chars: 35 * 148, credits: Math.round(35 * 0.22)
    },
    "7d": {
      days: Array.from({ length: 7 }, (_, i) => ({ d: i + 1, ok: [20, 25, 18, 30, 28, 12, 15][i], fail: [1, 0, 1, 2, 0, 0, 0][i] })),
      total: 152, totalOk: 148, totalFail: 4, successRate: "97.4%", chars: 148 * 148, credits: Math.round(148 * 0.22)
    },
    "30d": {
      days: [
        { d: 1, ok: 12, fail: 0 }, { d: 2, ok: 19, fail: 1 }, { d: 3, ok: 8, fail: 0 }, { d: 4, ok: 4, fail: 0 }, { d: 5, ok: 23, fail: 2 },
        { d: 6, ok: 31, fail: 1 }, { d: 7, ok: 27, fail: 0 }, { d: 8, ok: 38, fail: 3 }, { d: 9, ok: 42, fail: 2 }, { d: 10, ok: 11, fail: 0 },
        { d: 11, ok: 6, fail: 0 }, { d: 12, ok: 29, fail: 1 }, { d: 13, ok: 35, fail: 0 }, { d: 14, ok: 33, fail: 2 }, { d: 15, ok: 24, fail: 1 },
        { d: 16, ok: 18, fail: 0 }, { d: 17, ok: 9, fail: 0 }, { d: 18, ok: 5, fail: 0 }, { d: 19, ok: 21, fail: 0 }, { d: 20, ok: 28, fail: 1 },
        { d: 21, ok: 56, fail: 4 }, { d: 22, ok: 61, fail: 5 }, { d: 23, ok: 44, fail: 2 }, { d: 24, ok: 13, fail: 0 }, { d: 25, ok: 7, fail: 0 },
        { d: 26, ok: 32, fail: 1 }, { d: 27, ok: 39, fail: 0 }, { d: 28, ok: 47, fail: 3 }, { d: 29, ok: 51, fail: 2 }, { d: 30, ok: 36, fail: 1 }
      ],
      total: 881, totalOk: 849, totalFail: 32, successRate: "96.4%", chars: 849 * 148, credits: 185
    }
  },
  "Acme Studio": {
    "24h": {
      days: Array.from({ length: 24 }, (_, i) => ({ d: i + 1, ok: 12 + (i % 3) * 5, fail: i % 8 === 0 ? 1 : 0 })),
      total: 385, totalOk: 382, totalFail: 3, successRate: "99.2%", chars: 382 * 148, credits: Math.round(382 * 0.22)
    },
    "7d": {
      days: Array.from({ length: 7 }, (_, i) => ({ d: i + 1, ok: [120, 145, 110, 160, 180, 75, 90][i], fail: [2, 1, 0, 3, 2, 0, 1][i] })),
      total: 889, totalOk: 880, totalFail: 9, successRate: "99.0%", chars: 880 * 148, credits: Math.round(880 * 0.22)
    },
    "30d": {
      days: Array.from({ length: 30 }, (_, i) => ({ d: i + 1, ok: 80 + (i % 6) * 15 + Math.floor(Math.sin(i) * 20), fail: i % 10 === 0 ? 4 : 1 })),
      total: 3450, totalOk: 3412, totalFail: 38, successRate: "99.1%", chars: 3412 * 148, credits: 750
    }
  },
  "Lab": {
    "24h": {
      days: Array.from({ length: 24 }, (_, i) => ({ d: i + 1, ok: i === 4 ? 2 : i === 12 ? 1 : 0, fail: 0 })),
      total: 3, totalOk: 3, totalFail: 0, successRate: "100%", chars: 3 * 148, credits: 1
    },
    "7d": {
      days: Array.from({ length: 7 }, (_, i) => ({ d: i + 1, ok: [2, 1, 3, 0, 2, 1, 0][i], fail: 0 })),
      total: 9, totalOk: 9, totalFail: 0, successRate: "100%", chars: 9 * 148, credits: 2
    },
    "30d": {
      days: Array.from({ length: 30 }, (_, i) => ({ d: i + 1, ok: i % 4 === 0 ? 4 : i % 7 === 0 ? 2 : 0, fail: 0 })),
      total: 42, totalOk: 42, totalFail: 0, successRate: "100%", chars: 42 * 148, credits: 15
    }
  }
};

const RANGES = ["24h", "7d", "30d"] as const;

function Usage() {
  const ws = useWorkspace();
  const [range, setRange] = useState<"24h" | "7d" | "30d">("30d");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [customRange, setCustomRange] = useState<string | null>(null);
  
  const [tempStart, setTempStart] = useState<number | null>(10);
  const [tempEnd, setTempEnd] = useState<number | null>(16);

  const wsRangeData = WORKSPACE_DATA[ws] || WORKSPACE_DATA["Personal workspace"];
  const currentData = wsRangeData[range];

  const maxTotal = Math.max(...currentData.days.map((d) => d.ok + d.fail), 1);

  return (
    <>
      <PageHeader
        eyebrow="Analytics"
        title="Usage"
        subtitle={customRange ? `Custom Range: ${customRange}` : "May 28, 2026 — Jun 27, 2026"}
        actions={
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-md bg-[var(--inset)] p-0.5">
              {RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRange(r);
                    setCustomRange(null);
                  }}
                  className={`rounded-[5px] px-2.5 py-1 text-[12px] transition-all duration-100 ${
                    range === r && !customRange
                      ? "bg-background text-foreground shadow-[0_0_0_1px_var(--border)] font-medium active:scale-[0.98]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCalendarOpen(true)}
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] transition-colors active:scale-[0.96] ${
                customRange ? "bg-foreground text-background font-medium" : "bg-[var(--inset)] text-muted-foreground hover:text-foreground"
              }`}
            >
              <CalendarIcon size={14} />
              Custom
            </button>
          </div>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-4 hairline-b border-t pb-2 pt-1 animate-page-fade">
        {[
          { label: "Requests",       value: currentData.total.toLocaleString(),           hint: `${currentData.totalOk} ok · ${currentData.totalFail} failed` },
          { label: "Success rate",   value: currentData.successRate,                      hint: "for selected period" },
          { label: "Characters",     value: currentData.chars.toLocaleString(),           hint: "billable input" },
          { label: "Credits burned", value: currentData.credits.toLocaleString(),         hint: `of 1,024` },
        ].map((k, i) => (
          <div key={k.label} className={`px-6 py-6 ${i > 0 ? "border-l border-border" : ""}`}>
            <div className="eyebrow-label">{k.label}</div>
            <div className="mt-3 font-display text-[28px] font-medium leading-none tracking-[-0.02em] tabular-nums">
              {k.value}
            </div>
            <div className="mt-2 text-[11.5px] text-muted-foreground">{k.hint}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <Section title="Requests over time" hint={`Successful vs failed, grouped by ${range === "24h" ? "hour" : "day"}.`}>
        <div className="relative h-[180px] w-full">
          <div className="absolute inset-0 flex items-end gap-[3px]">
            {currentData.days.map((d) => {
              const total = d.ok + d.fail;
              const hPct  = total === 0 ? 3 : Math.max(6, (total / maxTotal) * 100);
              const failH = total === 0 ? 0 : (d.fail / total) * hPct;
              return (
                <div
                  key={d.d}
                  title={`${range === "24h" ? "Hour" : "Day"} ${d.d}: ${d.ok} ok${d.fail ? `, ${d.fail} failed` : ""}`}
                  className="group relative flex-1 flex flex-col justify-end cursor-default"
                  style={{ height: "100%" }}
                >
                  <div className="w-full flex flex-col justify-end rounded-sm overflow-hidden transition-opacity group-hover:opacity-75" style={{ height: `${hPct}%` }}>
                    {d.fail > 0 && (
                      <div
                        className="w-full bg-red-400/60 shrink-0"
                        style={{ height: `${failH}%` }}
                      />
                    )}
                    <div
                      className={`w-full ${total === 0 ? "bg-border" : "bg-foreground/80"} flex-1`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {[25, 50, 75, 100].map((p) => (
            <div
              key={p}
              className="absolute left-0 right-0 border-t border-border/30 pointer-events-none"
              style={{ bottom: `${p}%` }}
            />
          ))}

          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10.5px] text-muted-foreground font-display">
            {range === "24h" ? (
              <><span>12:00 AM</span><span>12:00 PM</span><span>11:59 PM</span></>
            ) : range === "7d" ? (
              <><span>Monday</span><span>Wednesday</span><span>Sunday</span></>
            ) : (
              <><span>May 28</span><span>Jun 12</span><span>Jun 27</span></>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-5 text-[12px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-foreground/80 shrink-0" />
            Successful
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-red-400/60 shrink-0" />
            Failed
          </span>
          <span className="ml-auto font-display tabular-nums">{currentData.total} total requests</span>
        </div>
      </Section>

      {/* Narrative Breakdown */}
      <Section title="How is my API being used?" hint="Key observations from the last 30 days of usage.">
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 pt-1">
          
          <div className="space-y-3">
            <div>
              <span className="font-display text-[16px] font-semibold text-foreground">Programmatic API integration</span>
              <p className="mt-1 text-[13px] text-muted-foreground leading-normal">
                Most requests are made through API keys rather than the Playground, indicating usage is primarily programmatic.
              </p>
            </div>
            <div className="space-y-1.5 border-t border-border/40 pt-2.5">
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">API Keys</span>
                <span className="font-display font-medium text-foreground">{currentData.totalOk - 8} requests</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">Playground</span>
                <span className="font-display font-medium text-foreground">8 requests</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="font-display text-[16px] font-semibold text-foreground">Silk Muga is most frequent (62%)</span>
              <p className="mt-1 text-[13px] text-muted-foreground leading-normal">
                Silk Muga accounts for 62% of requests, making it the most frequently used model this month.
              </p>
            </div>
            <div className="space-y-1.5 border-t border-border/40 pt-2.5">
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">silk muga 1</span>
                <span className="font-display font-medium text-foreground">{Math.round(currentData.total * 0.62)} requests</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">silk mulberry 1.5</span>
                <span className="font-display font-medium text-foreground">{Math.round(currentData.total * 0.38)} requests</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="font-display text-[16px] font-semibold text-foreground">Upstream response failures</span>
              <p className="mt-1 text-[13px] text-muted-foreground leading-normal">
                All recorded failures originated from upstream (5xx) responses rather than client validation errors.
              </p>
            </div>
            <div className="space-y-1.5 border-t border-border/40 pt-2.5">
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">200 OK</span>
                <span className="font-display font-medium text-foreground">{currentData.totalOk} requests</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">5xx errors</span>
                <span className="font-display font-medium text-foreground">{currentData.totalFail} requests</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="font-display text-[16px] font-semibold text-foreground">Balanced API key usage</span>
              <p className="mt-1 text-[13px] text-muted-foreground leading-normal">
                Traffic is evenly distributed across your production and development keys, indicating active testing alongside live usage.
              </p>
            </div>
            <div className="space-y-1.5 border-t border-border/40 pt-2.5">
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">prod-key-01</span>
                <span className="font-display font-medium text-foreground">{Math.round(currentData.total * 0.55)} requests</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">dev-key-02</span>
                <span className="font-display font-medium text-foreground">{Math.round(currentData.total * 0.45)} requests</span>
              </div>
            </div>
          </div>

        </div>
      </Section>

      {/* ── Dialog Overlay: Calendar Pick (Premium Range & Presets UI) ── */}
      {calendarOpen && (
        <Dialog onClose={() => setCalendarOpen(false)}>
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-[var(--inset)]/35">
              <span className="font-display text-[14px] font-semibold text-foreground">Custom Date Range</span>
              <button 
                type="button" 
                onClick={() => setCalendarOpen(false)}
                className="rounded p-1 text-muted-foreground/60 hover:bg-[var(--inset)] hover:text-foreground"
              >
                <X size={14} />
              </button>
            </div>
            
            {/* Split layout: Presets + Calendar Grid */}
            <div className="grid grid-cols-[150px_1fr] divide-x divide-border/40">
              
              {/* Left Column: Presets */}
              <div className="p-3 space-y-1 bg-[var(--inset)]/15">
                <div className="px-2 pb-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Presets</div>
                {[
                  { label: "Today", start: 27, end: 27, type: "24h" },
                  { label: "Yesterday", start: 26, end: 26, type: "24h" },
                  { label: "Last 7 days", start: 20, end: 27, type: "7d" },
                  { label: "Last 30 days", start: 1, end: 30, type: "30d" },
                ].map((p) => {
                  const isMatch = tempStart === p.start && tempEnd === p.end;
                  return (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        setTempStart(p.start);
                        setTempEnd(p.end);
                        setRange(p.type as any);
                      }}
                      className={`flex w-full items-center rounded-md px-2 py-1.5 text-left text-[12px] font-medium transition-all ${
                        isMatch 
                          ? "bg-foreground text-background" 
                          : "text-muted-foreground hover:bg-[var(--inset)] hover:text-foreground"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Calendar Grid */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[12px] font-semibold text-foreground">June 2026</span>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {tempStart ? `Jun ${tempStart}` : ""}
                    {tempEnd ? ` — Jun ${tempEnd}` : ""}
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[11.5px] font-medium text-muted-foreground mb-1">
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-y-1 text-center text-[12px]">
                  {Array.from({ length: 30 }, (_, i) => {
                    const day = i + 1;
                    const isStart = tempStart === day;
                    const isEnd = tempEnd === day;
                    const isInRange = tempStart !== null && tempEnd !== null && day > tempStart && day < tempEnd;
                    
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          if (tempStart !== null && tempEnd === null) {
                            if (day >= tempStart) {
                              setTempEnd(day);
                            } else {
                              setTempStart(day);
                              setTempEnd(null);
                            }
                          } else {
                            setTempStart(day);
                            setTempEnd(null);
                          }
                        }}
                        className={`h-7.5 w-7.5 flex items-center justify-center transition-all ${
                          isStart 
                            ? "bg-foreground text-background font-semibold rounded-md shadow-sm" 
                            : isEnd 
                              ? "bg-foreground text-background font-semibold rounded-md shadow-sm" 
                              : isInRange 
                                ? "bg-foreground/10 text-foreground rounded-none" 
                                : "text-foreground hover:bg-[var(--inset)] rounded-md"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-end gap-2.5 px-4 py-3 border-t border-border/40 bg-[var(--inset)]/35">
              <button
                type="button"
                onClick={() => setCalendarOpen(false)}
                className="rounded-md border border-border px-3 py-1.5 text-[12.5px] font-medium text-foreground hover:bg-[var(--inset)] active:scale-[0.97]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={tempStart === null}
                onClick={() => {
                  if (tempStart !== null) {
                    const label = tempEnd 
                      ? `Jun ${tempStart} — Jun ${tempEnd}, 2026`
                      : `Jun ${tempStart}, 2026`;
                    setCustomRange(label);
                  }
                  setCalendarOpen(false);
                }}
                className="rounded-md bg-foreground text-background px-4 py-1.5 text-[12.5px] font-semibold hover:bg-foreground/90 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Apply range
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}

/* Local Dialog helper */
function Dialog({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-background/40 backdrop-blur-sm transition-opacity duration-200 animate-page-fade" />
      <div className="relative w-full max-w-[480px] rounded-xl border border-border/80 bg-background p-1 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.3)] pop-in z-10 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
