import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, Pause } from "@phosphor-icons/react";
import {
  PageHeader,
  Section,
  Waveform,
  Skeleton,
  SkeletonRow,
} from "../components/shell/primitives";
import { useMockResource } from "../lib/store";

export const Route = createFileRoute("/_app/models")({
  head: () => ({
    meta: [
      { title: "Models — Rumik AI" },
      {
        name: "description",
        content: "Pricing, pacing, and steering for every Rumik voice model.",
      },
    ],
  }),
  component: Models,
});

/* ─── Richer Datasets for comparison ─── */

const MODELS_DATA = [
  {
    id: "silk-spider-1",
    name: "Silk Spider 1 (Beta)",
    latency: "120ms",
    ratePer1k: 0.35,
    speedScore: 98,
    qualityScore: 60,
    sampleText: "System initialized. GPS signal acquired successfully.",
    colorClass: "bg-teal-500",
    recommendation: "Sub-second speech loops & real-time bots",
    tier: "Cheapest",
    qualityText: "Clear / Direct",
  },
  {
    id: "silk-mulberry-1.5",
    name: "Silk Mulberry 1.5",
    latency: "280ms",
    ratePer1k: 0.5,
    speedScore: 70,
    qualityScore: 95,
    sampleText:
      "Good morning. Setting your focus mode for the next forty minutes.",
    colorClass: "bg-blue-500",
    recommendation: "Studio narration, audiobooks, & podcasts",
    tier: "Best Value",
    qualityText: "Ultra-Expressive",
  },
  {
    id: "silk-muga-1",
    name: "Silk Muga 1",
    latency: "180ms",
    ratePer1k: 0.99,
    speedScore: 90,
    qualityScore: 75,
    sampleText: "Welcome back! Your dashboard has three new alert logs.",
    colorClass: "bg-[var(--success)]",
    recommendation: "General interactive IVR & assistants",
    tier: "Standard",
    qualityText: "Conversational",
  },
  {
    id: "openai-tts",
    name: "OpenAI TTS",
    latency: "240ms",
    ratePer1k: 2.5,
    speedScore: 82,
    qualityScore: 88,
    sampleText: "This is an external API baseline sample.",
    isExternal: true,
    colorClass: "bg-orange-400",
    recommendation: "Multi-language translations & fallback",
    tier: "High-Cost",
    qualityText: "Neutral / Balanced",
  },
  {
    id: "elevenlabs-v3",
    name: "ElevenLabs v3",
    latency: "350ms",
    ratePer1k: 10.0,
    speedScore: 60,
    qualityScore: 92,
    sampleText: "This is an external API baseline sample.",
    isExternal: true,
    colorClass: "bg-red-400",
    recommendation: "Custom voice clones & video dubbing",
    tier: "Premium Cost",
    qualityText: "High-Fidelity",
  },
];

function Models() {
  const [chars, setChars] = useState(250000); // 250k characters
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { isLoading } = useMockResource(MODELS_DATA);

  const maxRate = 10.0;

  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="Models"
        subtitle="Compare efficiency, tradeoffs, and costs visually."
      />

      {/* ── Section 1: Cost Comparison ── */}
      <Section
        className="!pt-2"
        title="Cost comparison"
        hint="Drag to compare monthly cost based on volume."
      >
        <div className="space-y-8">
          {/* Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-muted-foreground">
                Monthly volume
              </span>
              <span className="font-display text-[14px] font-semibold text-foreground tabular-nums">
                {chars.toLocaleString()}{" "}
                <span className="text-[12px] font-normal text-muted-foreground">
                  chars
                </span>
              </span>
            </div>
            <div className="relative py-2 group">
              <div className="h-[3px] w-full rounded-full bg-border/70 relative">
                <div
                  className="absolute inset-y-0 left-0 bg-foreground rounded-full"
                  style={{ width: `${(chars / 2000000) * 100}%` }}
                />
                <input
                  type="range"
                  min={50000}
                  max={2000000}
                  step={50000}
                  value={chars}
                  onChange={(e) => setChars(parseInt(e.target.value))}
                  aria-label="Cost sensitivity slider"
                  className="absolute -top-3 left-0 h-10 w-full cursor-pointer opacity-0"
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-[12px] w-[12px] rounded-full bg-background border-2 border-foreground shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
                  style={{ left: `calc(${(chars / 2000000) * 100}% - 6px)` }}
                />
              </div>
            </div>
          </div>

          {/* Cost bar comparison columns (Centered, close together, group hover fade, dynamic growing height) */}
          {isLoading ? (
            <Skeleton className="h-32" />
          ) : (
            <div
              role="img"
              aria-label="Model cost comparison chart"
              className="flex items-end gap-3.5 justify-center pt-8 pb-3 border-b border-border/40 h-[280px] group/chart"
            >
              {MODELS_DATA.map((m) => {
                const totalCost = (chars / 1000) * m.ratePer1k;
                // Global max cost corresponds to 2M characters volume at max rate of 10.00 (₹20,000)
                const globalMaxCost = (2000000 / 1000) * 10.0;
                // Bars grow taller up to 210px as volume changes
                const heightPct = Math.max(
                  12,
                  (totalCost / globalMaxCost) * 210,
                );

                return (
                  <div
                    key={m.id}
                    className="flex flex-col items-center gap-2.5 flex-1 max-w-[124px] group/bar transition-all duration-150 group-hover/chart:opacity-40 hover:!opacity-100 hover:scale-[1.03] relative cursor-pointer"
                  >
                    {/* Premium Hover Tooltip Details */}
                    <div className="absolute bottom-[calc(100%+30px)] left-1/2 -translate-x-1/2 z-20 w-36 scale-95 opacity-0 pointer-events-none rounded-lg border border-border bg-background p-2.5 shadow-lg group-hover/bar:scale-100 group-hover/bar:opacity-100 transition-all duration-150">
                      <div className="font-semibold text-foreground text-[11.5px] truncate">
                        {m.name}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>Latency:</span>
                        <span className="text-foreground font-medium">
                          {m.latency}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>Rate / 1k:</span>
                        <span className="text-foreground font-medium">
                          ₹{m.ratePer1k.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Cost Label */}
                    <span className="font-display text-[12.5px] font-semibold text-foreground tabular-nums transition-transform duration-150 group-hover/bar:-translate-y-0.5">
                      ₹{Math.round(totalCost).toLocaleString()}
                    </span>

                    {/* Solid Bar */}
                    <div
                      className={`w-full rounded-t-[3px] transition-all duration-150 group-hover/bar:brightness-95 ${m.colorClass}`}
                      style={{ height: `${heightPct}px` }}
                    />

                    {/* Name Label */}
                    <span className="text-[11.5px] text-muted-foreground font-medium text-center truncate w-full mt-1">
                      {m.name.replace(" (Beta)", "")}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Section>

      {/* ── Section 2: Tradeoffs Score Comparison (Simplified Matrix Grid) ── */}
      <Section
        title="Tradeoff matrix"
        hint="Steerability, performance metrics, and cost tiers compared."
      >
        {isLoading ? (
          <div className="-mx-3 pt-1">
            <SkeletonRow cols={4} />
            <SkeletonRow cols={4} />
          </div>
        ) : (
          <div className="-mx-3 pt-1" aria-label="Model tradeoff comparison">
            {/* Header Row */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.2fr_1fr_0.8fr] gap-6 px-3 pb-3 eyebrow-label border-b border-border/30">
              <span>Model profile</span>
              <span>Latency (Speed)</span>
              <span>Cost rate</span>
              <span className="text-right">Price tier</span>
            </div>

            {/* Model rows */}
            <div className="divide-y divide-border/20">
              {MODELS_DATA.map((m) => {
                return (
                  <div
                    key={m.id}
                    className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.2fr_1fr_0.8fr] gap-6 items-center px-3 py-4 hover:bg-[var(--inset)]/30 transition-all duration-150 rounded-md group/row"
                  >
                    {/* Model & Source */}
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[14px] font-semibold text-foreground truncate block">
                        {m.name}
                      </span>
                      <span className="text-[11.5px] text-muted-foreground/60 block">
                        {m.isExternal
                          ? "External API integration"
                          : "Rumik native model"}
                      </span>
                    </div>

                    {/* Latency (Speed) badge */}
                    <div className="flex items-center gap-3">
                      <span className="rounded bg-[var(--inset)] px-2.5 py-1 font-mono text-[12px] text-foreground font-semibold tabular-nums">
                        {m.latency}
                      </span>
                      <span className="text-[12px] text-muted-foreground font-medium">
                        {m.speedScore >= 90
                          ? "Sub-second"
                          : m.speedScore >= 75
                            ? "Snappy"
                            : "Buffered"}
                      </span>
                    </div>

                    {/* Cost rate column */}
                    <div className="text-[12.5px] font-mono text-foreground tabular-nums">
                      ₹{m.ratePer1k.toFixed(2)}{" "}
                      <span className="text-[11.5px] font-sans text-muted-foreground font-normal">
                        / 1K chars
                      </span>
                    </div>

                    {/* Price Tier Pill */}
                    <div className="text-right">
                      <span
                        className={`inline-block rounded px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                          m.ratePer1k <= 0.35
                            ? "bg-teal-500/10 text-teal-600"
                            : m.ratePer1k <= 0.99
                              ? "bg-[color-mix(in_oklab,var(--success)_10%,transparent)] text-[var(--success)]"
                              : m.ratePer1k <= 2.5
                                ? "bg-orange-500/10 text-orange-600"
                                : "bg-red-500/10 text-red-600"
                        }`}
                      >
                        {m.tier}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Section>

      {/* ── Section 3: Audio catalog rows ── */}
      <Section title="Audio preview" hint="Listen to voice samples.">
        <div className="-mx-3">
          {MODELS_DATA.filter((m) => !m.isExternal).map((m) => {
            const isPlaying = playingId === m.id;
            return (
              <div
                key={m.id}
                className="flex items-center gap-6 rounded-md px-3 py-3.5 row-hover"
              >
                {/* Play button */}
                <button
                  onClick={() => setPlayingId(isPlaying ? null : m.id)}
                  aria-label={isPlaying ? "Pause sample" : "Play sample"}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform duration-150 hover:scale-105 active:scale-95"
                >
                  {isPlaying ? (
                    <Pause
                      size={10}
                      weight="fill"
                      className="text-background"
                    />
                  ) : (
                    <Play
                      size={10}
                      weight="fill"
                      className="text-background translate-x-px"
                    />
                  )}
                </button>

                <div className="min-w-0 flex-1 leading-tight">
                  <span className="font-display text-[13.5px] font-semibold text-foreground">
                    {m.name}
                  </span>
                  <p className="mt-0.5 text-[12.5px] text-muted-foreground truncate italic">
                    "{m.sampleText}"
                  </p>
                </div>

                {isPlaying && (
                  <div className="w-[140px] animate-fade-in shrink-0">
                    <Waveform bars={24} playing={isPlaying} />
                  </div>
                )}

                <div className="text-right shrink-0">
                  <div className="font-display text-[13px] font-semibold text-foreground">
                    ₹{m.ratePer1k.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    per 1k chars
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
