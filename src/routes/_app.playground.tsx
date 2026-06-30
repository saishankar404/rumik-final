import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Download,
  MagicWand,
  ArrowCounterClockwise,
  Lightning,
  CaretRight,
  BookOpen,
  Smiley,
  Microphone,
  FilmSlate,
  GameController,
  Broadcast,
  Brain,
  Check,
} from "@phosphor-icons/react";
import { Waveform, EmptyState } from "../components/shell/primitives";
import {
  AIVoiceInput,
  AudioUploadCard,
} from "../components/shell/speech-to-text";

export const Route = createFileRoute("/_app/playground")({
  head: () => ({
    meta: [
      { title: "Playground — Rumik AI" },
      {
        name: "description",
        content:
          "Compose, tune, and iterate — every generation is saved as an experiment.",
      },
    ],
  }),
  component: Playground,
});

/* ─── Data ─── */

const TAGS = [
  { tag: "laugh", hint: "Soft, warm laugh" },
  { tag: "chuckle", hint: "Quick chuckle" },
  { tag: "sigh", hint: "Long exhale" },
  { tag: "whisper", hint: "Lowered, close voice" },
  { tag: "pause", hint: "200 ms of silence" },
  { tag: "excited", hint: "Energy lift" },
];

const STARTERS = [
  {
    Icon: BookOpen,
    label: "Narrate a story",
    sample:
      "Once upon a time, in a city built on clouds, there was an engineer who discovered a voice that could move mountains. <pause> She spoke once. The world listened.",
  },
  {
    Icon: Smiley,
    label: "Tell a silly joke",
    sample:
      "Why don't scientists trust atoms? <chuckle> Because they make up everything! <laugh> Get it? Everything!",
  },
  {
    Icon: Microphone,
    label: "Record an advertisement",
    sample:
      "Introducing Rumik — the voice AI that sounds so natural, you'll forget it's not human. Try it free today. No credit card required.",
  },
  {
    Icon: FilmSlate,
    label: "Dramatic movie scene",
    sample:
      "I never asked for this. <sigh> None of us did. But here we are, at the edge of everything, with nothing left to lose. <pause> So let's finish this.",
  },
  {
    Icon: GameController,
    label: "Video game character",
    sample:
      "Greetings, traveler. <pause> You dare enter the realm of the ancient ones? <excited> Then prepare yourself! The trials ahead will test your very soul.",
  },
  {
    Icon: Broadcast,
    label: "Introduce your podcast",
    sample:
      "Welcome back to another episode. I'm your host, and today we're diving deep into something that will change how you see the world. Let's get into it.",
  },
  {
    Icon: Brain,
    label: "Meditation guide",
    sample:
      "<whisper> Take a slow breath in. <pause> And release. <pause> With each breath, feel your body grow lighter. You are exactly where you need to be.",
  },
];

const MODELS = [
  {
    id: "silk-muga-1",
    label: "Silk Muga",
    sublabel: "Fast · ~180ms avg",
    description: "Crisp and natural. Best for real-time responses.",
  },
  {
    id: "silk-mulberry-1.5",
    label: "Silk Mulberry 1.5",
    sublabel: "Expressive · ~280ms avg",
    description: "Richer, more emotive. Best for narration.",
  },
];

const TONES = ["Neutral", "Happy", "Excited", "Sad", "Whisper"];

const CREDITS_REMAINING = 9992;
const CHAR_LIMIT = 5000;

type SynthState = "idle" | "generating" | "done";

type Experiment = {
  id: number;
  label: string;
  model: string;
  text: string;
  tone: string;
  temp: number;
  latencyMs: number;
  ts: string;
  isNew?: boolean;
};

const SEED_EXPERIMENTS: Experiment[] = [
  {
    id: 1,
    label: "Mulberry — narrator voice",
    model: "silk-mulberry-1.5",
    text: "good morning. setting your focus for the next forty minutes.",
    tone: "Neutral",
    temp: 0.7,
    latencyMs: 262,
    ts: "1h ago",
  },
  {
    id: 2,
    label: "Muga — dashboard read-back",
    model: "silk-muga-1",
    text: "welcome back, your dashboard has three new logs to review.",
    tone: "Neutral",
    temp: 0.6,
    latencyMs: 174,
    ts: "14m ago",
  },
  {
    id: 3,
    label: "Laugh tag test",
    model: "silk-muga-1",
    text: "hello, this is a test of the rumik voice API. <laugh> pretty nice, isn't it?",
    tone: "Happy",
    temp: 0.8,
    latencyMs: 191,
    ts: "2m ago",
  },
];

const TEMP_HINT = (v: number) => {
  if (v < 0.3) return "Very predictable";
  if (v < 0.55) return "Consistent";
  if (v < 0.75) return "Natural";
  if (v < 0.9) return "Creative";
  return "Experimental";
};

/* ─── Main ─── */

function Playground() {
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"tts" | "stt">("tts");
  const [modelId, setModelId] = useState(MODELS[0].id);
  const [modelOpen, setModelOpen] = useState(false);
  const [tone, setTone] = useState("Neutral");
  const [lastTone, setLastTone] = useState("Neutral");
  const [temp, setTemp] = useState(0.7);
  const [topP, setTopP] = useState(0.95);
  const [topK, setTopK] = useState(50);
  const [repPenalty, setRepPenalty] = useState(1.2);
  const [synthState, setSynthState] = useState<SynthState>("idle");
  const [lastLatencyMs, setLastLatencyMs] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playTime, setPlayTime] = useState(0);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [experiments, setExperiments] =
    useState<Experiment[]>(SEED_EXPERIMENTS);
  const [tab, setTab] = useState<"settings" | "experiments">("settings");
  const [flashedTag, setFlashedTag] = useState<string | null>(null);
  const nextId = useRef(SEED_EXPERIMENTS.length + 1);

  const activeModel = MODELS.find((m) => m.id === modelId)!;
  const isEmpty = text.trim() === "";
  const isGenerating = synthState === "generating";
  const isDone = synthState === "done";

  function insertTag(tag: string) {
    const ta = taRef.current;
    const insert = `<${tag}> `;
    if (!ta) {
      setText((t) => t + insert);
      return;
    }
    const start = ta.selectionStart ?? text.length;
    const end = ta.selectionEnd ?? text.length;
    setText(text.slice(0, start) + insert + text.slice(end));
    // Flash the tag chip for tactile confirmation
    setFlashedTag(tag);
    setTimeout(() => setFlashedTag(null), 500);
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + insert.length;
      ta.setSelectionRange(pos, pos);
    });
  }

  function loadStarter(sample: string) {
    setText(sample);
    requestAnimationFrame(() => taRef.current?.focus());
  }

  function selectTone(t: string) {
    setTone(t);
    setLastTone(t);
  }

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (isPlaying) {
      intervalId = setInterval(() => setPlayTime((t) => t + 1), 1000);
    } else {
      setPlayTime(0);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const formatPlayTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSynthesize = useCallback(() => {
    if (isEmpty || isGenerating) return;
    setIsPlaying(false);
    setSynthState("generating");
    const latency =
      activeModel.id === "silk-muga-1"
        ? 160 + Math.floor(Math.random() * 60)
        : 240 + Math.floor(Math.random() * 80);

    setTimeout(() => {
      const exp: Experiment = {
        id: nextId.current++,
        label: `${activeModel.label} · ${tone}`,
        model: activeModel.id,
        text,
        tone,
        temp,
        latencyMs: latency,
        ts: "just now",
        isNew: true,
      };
      setExperiments((prev) => [exp, ...prev]);
      setLastLatencyMs(latency);
      setSynthState("done");

      setTimeout(() => {
        setExperiments((prev) =>
          prev.map((e) => (e.id === exp.id ? { ...e, isNew: false } : e)),
        );
      }, 600);
    }, latency);
  }, [text, activeModel, tone, temp, isEmpty, isGenerating]);

  return (
    <div className="flex flex-col md:flex-row h-full min-h-0">
      {/* ── Left: Editor ── */}
      <div className="flex flex-1 flex-col min-w-0 overflow-y-auto">
        {/* Header — title + mode toggle */}
        <div className="flex items-center justify-between px-10 lg:px-6 pt-8 pb-0">
          <div>
            <h1 className="text-[17px] font-semibold text-foreground tracking-[-0.015em]">
              {mode === "tts" ? "Text to speech" : "Speech to text"}
            </h1>
            <p className="mt-0.5 text-[13.5px] text-muted-foreground">
              {mode === "tts"
                ? "Compose, tune, and iterate."
                : "Transcribe audio or speak live."}
            </p>
          </div>

          {/* Monochrome mode toggle */}
          <div className="relative flex items-center rounded-lg bg-[var(--inset)] p-0.5">
            {(["tts", "stt"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                aria-label={
                  m === "tts"
                    ? "Switch to text to speech"
                    : "Switch to speech to text"
                }
                className={`relative rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-200 ${
                  mode === m
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode === m && (
                  <motion.div
                    layoutId="mode-toggle-pill"
                    className="absolute inset-0 rounded-md bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {m === "tts" ? "Text → Speech" : "Speech → Text"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Editor area — TTS mode ── */}
        <AnimatePresence mode="wait">
          {mode === "tts" ? (
            <motion.div
              key="tts-editor"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            >
              {/* Editor card — no border glow on focus */}
              <div className="mx-10 mt-6 rounded-xl border border-border/60 transition-colors duration-200">
                {/* Textarea */}
                <div className="px-5 pt-5">
                  <textarea
                    ref={taRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    spellCheck={false}
                    rows={16}
                    aria-label="Text to synthesize"
                    placeholder="Start typing here or paste any text you want to turn into speech…"
                    className="w-full resize-none bg-transparent text-[15.5px] leading-[1.75] tracking-[-0.005em] text-foreground outline-none placeholder:text-muted-foreground/30"
                  />
                </div>

                {/* Editor footer — tools + credits + char count + Generate */}
                <div className="flex items-center gap-2 border-t border-border/40 px-4 py-2.5">
                  <button
                    aria-label="Enhance text"
                    className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-[var(--inset)] hover:text-foreground active:scale-[0.96]"
                  >
                    <MagicWand className="h-3.5 w-3.5" />
                    Enhance
                  </button>
                  <button
                    onClick={() => setText("")}
                    aria-label="Clear text"
                    className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-[var(--inset)] hover:text-foreground active:scale-[0.96]"
                  >
                    <ArrowCounterClockwise className="h-3.5 w-3.5" />
                    Clear
                  </button>

                  <div className="ml-auto flex items-center gap-3">
                    <span className="font-display text-[12px] tabular-nums text-muted-foreground/50">
                      <span className="text-muted-foreground/80 font-medium">
                        {CREDITS_REMAINING.toLocaleString()}
                      </span>
                      {" credits remaining"}
                    </span>
                    <span className="h-3 w-px bg-border/60" />
                    <span className="font-display text-[12px] tabular-nums text-muted-foreground/50">
                      <span
                        className={
                          text.length > CHAR_LIMIT * 0.9
                            ? "text-orange-500 font-medium"
                            : ""
                        }
                      >
                        {text.length}
                      </span>
                      {` / ${CHAR_LIMIT.toLocaleString()}`}
                    </span>
                    <button
                      onClick={handleSynthesize}
                      disabled={isEmpty || isGenerating}
                      className={`relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-4 py-2 text-[13.5px] font-medium transition-all duration-150 active:scale-[0.97] disabled:cursor-not-allowed ${
                        isDone
                          ? "bg-[var(--success)] text-white disabled:opacity-100"
                          : "bg-foreground text-background hover:bg-foreground/88 disabled:opacity-35"
                      }`}
                    >
                      {isGenerating && (
                        <span className="h-3.5 w-3.5 rounded-full border-2 border-background/30 border-t-background animate-spin" />
                      )}
                      {isDone ? (
                        <>
                          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          <span className="font-display tabular-nums">
                            {lastLatencyMs}ms
                          </span>
                        </>
                      ) : isGenerating ? (
                        <span className="font-display text-background/70">
                          Generating…
                        </span>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5" fill="currentColor" />
                          Generate speech
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Tags area — cross-fade between get-started and emotion tags ── */}
              <div className="px-10 lg:px-6 pt-5 pb-4 min-h-[120px]">
                <AnimatePresence mode="wait">
                  {isEmpty ? (
                    <motion.div
                      key="get-started"
                      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                      transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
                    >
                      <p className="text-[13px] text-muted-foreground/50 mb-3">
                        Get started with
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {STARTERS.map(({ Icon, label: sl, sample }) => (
                          <button
                            key={sl}
                            onClick={() => loadStarter(sample)}
                            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3.5 py-1.5 text-[13.5px] text-foreground transition-all duration-100 hover:border-border hover:bg-[var(--inset)] active:scale-[0.97]"
                          >
                            <Icon
                              className="h-4 w-4 text-muted-foreground shrink-0"
                              strokeWidth={1.5}
                            />
                            {sl}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="emotion-tags"
                      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                      transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
                    >
                      <p className="text-[13px] text-muted-foreground/50 mb-3">
                        Emotion tags — click to insert at cursor
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {TAGS.map((t) => {
                          const flashing = flashedTag === t.tag;
                          return (
                            <button
                              key={t.tag}
                              onClick={() => insertTag(t.tag)}
                              title={t.hint}
                              aria-label={t.hint}
                              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13.5px] transition-all duration-150 active:scale-[0.96] ${
                                flashing
                                  ? "border-foreground/40 bg-foreground/[0.06] text-foreground scale-[0.96]"
                                  : "border-border/70 bg-background text-foreground hover:border-border hover:bg-[var(--inset)]"
                              }`}
                            >
                              <span className="font-mono text-muted-foreground">
                                &lt;{t.tag}&gt;
                              </span>
                              <span className="text-[12.5px] text-muted-foreground/60">
                                {t.hint}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Waveform player — appears after generation ── */}
              <AnimatePresence>
                {isDone && (
                  <motion.div
                    key="waveform-player"
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                    className="mx-10 mb-10 rounded-xl border border-border/60 bg-[var(--inset)]/30"
                    tabIndex={0}
                    role="button"
                    aria-label={isPlaying ? "Pause audio" : "Play audio"}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        setIsPlaying((p) => !p);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3 px-4 py-3.5">
                      {/* Play / Pause button */}
                      <button
                        onClick={() => setIsPlaying((p) => !p)}
                        aria-label={isPlaying ? "Pause audio" : "Play audio"}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform duration-150 active:scale-[0.96]"
                      >
                        {isPlaying ? (
                          <Pause className="h-3.5 w-3.5" fill="currentColor" />
                        ) : (
                          <Play
                            className="h-3.5 w-3.5 translate-x-px"
                            fill="currentColor"
                          />
                        )}
                      </button>

                      {/* Timer */}
                      <span className="font-mono text-[12px] tabular-nums text-muted-foreground w-[40px] shrink-0">
                        {formatPlayTime(playTime)}
                      </span>

                      {/* Visualizer bars — full width edge-to-edge */}
                      <div
                        className="flex h-10 flex-1 items-center gap-[2px] min-w-0"
                        role="img"
                        aria-label="Audio waveform visualization"
                      >
                        {[...Array(64)].map((_, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-full transition-all duration-300 ${
                              isPlaying
                                ? "bg-foreground/40 animate-pulse"
                                : "bg-muted-foreground/12"
                            }`}
                            style={
                              isPlaying
                                ? {
                                    height: `${15 + Math.random() * 85}%`,
                                    animationDelay: `${i * 0.04}s`,
                                  }
                                : { height: "15%" }
                            }
                          />
                        ))}
                      </div>

                      {/* Download button */}
                      <button
                        aria-label="Download audio"
                        className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-[var(--inset)] hover:text-foreground active:scale-[0.96]"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* ── STT mode — microphone + upload ── */
            <motion.div
              key="stt-editor"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              className="mx-10 mt-6 rounded-xl border border-border/60"
            >
              <div className="flex flex-col items-center gap-8 px-5 py-10">
                {/* Microphone input */}
                <AIVoiceInput />

                {/* Divider */}
                <div className="flex items-center gap-3 w-full max-w-md">
                  <span className="h-px flex-1 bg-border/40" />
                  <span className="text-[12px] text-muted-foreground/40 font-medium">
                    or
                  </span>
                  <span className="h-px flex-1 bg-border/40" />
                </div>

                {/* Upload audio */}
                <AudioUploadCard />
              </div>

              {/* Footer */}
              <div className="flex items-center gap-2 border-t border-border/40 px-4 py-2.5">
                <div className="ml-auto flex items-center gap-3">
                  <span className="font-display text-[12px] tabular-nums text-muted-foreground/50">
                    <span className="text-muted-foreground/80 font-medium">
                      {CREDITS_REMAINING.toLocaleString()}
                    </span>
                    {" credits remaining"}
                  </span>
                  <button className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-[13.5px] font-medium text-background transition-all duration-150 hover:bg-foreground/88 active:scale-[0.97]">
                    <Play className="h-3.5 w-3.5" fill="currentColor" />
                    Transcribe
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Right: Settings panel ── */}
      <aside className="w-full md:w-[300px] lg:w-[280px] shrink-0 border-l border-border/50 flex flex-col overflow-hidden">
        {/* Tab bar */}
        <div
          role="tablist"
          className="flex items-center gap-0 border-b border-border/50 px-5"
        >
          {(["settings", "experiments"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              role="tab"
              aria-selected={tab === t}
              className={`relative px-2 py-4 text-[14px] capitalize transition-colors ${
                tab === t
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "experiments"
                ? `Experiments${experiments.length ? ` (${experiments.length})` : ""}`
                : "Settings"}
              {tab === t && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {tab === "settings" ? (
            <SettingsPanel
              modelId={modelId}
              setModelId={setModelId}
              modelOpen={modelOpen}
              setModelOpen={setModelOpen}
              tone={tone}
              setTone={selectTone}
              temp={temp}
              setTemp={setTemp}
              topP={topP}
              setTopP={setTopP}
              topK={topK}
              setTopK={setTopK}
              repPenalty={repPenalty}
              setRepPenalty={setRepPenalty}
            />
          ) : (
            <ExperimentsPanel
              experiments={experiments}
              playingId={playingId}
              setPlayingId={setPlayingId}
              onLoad={(exp) => {
                setText(exp.text);
                setTone(exp.tone);
                setTemp(exp.temp);
                setModelId(exp.model);
                setTab("settings");
              }}
            />
          )}
        </div>
      </aside>
    </div>
  );
}

/* ─── Settings Panel ─── */

function SettingsPanel({
  modelId,
  setModelId,
  modelOpen,
  setModelOpen,
  tone,
  setTone,
  temp,
  setTemp,
  topP,
  setTopP,
  topK,
  setTopK,
  repPenalty,
  setRepPenalty,
}: {
  modelId: string;
  setModelId: (v: string) => void;
  modelOpen: boolean;
  setModelOpen: (v: boolean) => void;
  tone: string;
  setTone: (v: string) => void;
  temp: number;
  setTemp: (v: number) => void;
  topP: number;
  setTopP: (v: number) => void;
  topK: number;
  setTopK: (v: number) => void;
  repPenalty: number;
  setRepPenalty: (v: number) => void;
}) {
  const activeModel = MODELS.find((m) => m.id === modelId)!;

  return (
    <div className="px-6 py-6 space-y-7">
      {/* Model */}
      <div>
        <p className="text-[14px] font-medium text-foreground mb-2.5">Model</p>
        <div className="relative">
          <button
            onClick={() => setModelOpen(!modelOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-border px-3.5 py-2.5 text-left transition-colors hover:bg-[var(--inset)] active:scale-[0.99]"
          >
            <div>
              <div className="text-[14px] font-medium text-foreground">
                {activeModel.label}
              </div>
              <div className="text-[12.5px] text-muted-foreground mt-0.5">
                {activeModel.sublabel}
              </div>
            </div>
            <CaretRight
              className={`h-4 w-4 text-muted-foreground/50 transition-transform duration-150 ${modelOpen ? "rotate-90" : ""}`}
            />
          </button>
          {modelOpen && (
            <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 rounded-xl border border-border bg-background shadow-[0_8px_30px_-8px_rgba(0,0,0,0.18)] overflow-hidden pop-in">
              {MODELS.map((m) => {
                const selected = m.id === modelId;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setModelId(m.id);
                      setModelOpen(false);
                    }}
                    className={`flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[var(--inset)] border-b border-border/40 last:border-b-0 ${selected ? "bg-[var(--inset)]" : ""}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-medium text-foreground">
                          {m.label}
                        </span>
                        {selected && (
                          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        )}
                      </div>
                      <div className="text-[12.5px] text-muted-foreground mt-0.5">
                        {m.sublabel}
                      </div>
                      <div className="text-[12px] text-muted-foreground/60 mt-1 leading-snug">
                        {m.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Tone — with confirmation flash on select */}
      <div>
        <p className="text-[14px] font-medium text-foreground mb-2.5">Tone</p>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`rounded-full px-3.5 py-1.5 text-[13.5px] transition-all duration-150 active:scale-[0.96] ${
                tone === t
                  ? "bg-foreground text-background font-medium shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                  : "bg-[var(--inset)] text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Temperature */}
      <SliderField
        label="Temperature"
        sublabel="How consistent each take sounds"
        value={temp}
        min={0}
        max={1}
        step={0.05}
        onChange={setTemp}
        left="Predictable"
        right="Creative"
        hint={TEMP_HINT(temp)}
      />

      {/* Vocabulary (Top-P) */}
      <SliderField
        label="Vocabulary"
        sublabel="Breadth of word selection"
        value={topP}
        min={0}
        max={1}
        step={0.01}
        onChange={setTopP}
        left="Focused"
        right="Wide"
      />

      {/* Focus (Top-K) */}
      <SliderField
        label="Focus"
        sublabel="Candidates considered per token"
        value={topK}
        min={1}
        max={100}
        step={1}
        onChange={setTopK}
        left="Narrow"
        right="Broad"
        format={(v) => String(Math.round(v))}
      />

      {/* Variation (Repetition penalty) */}
      <SliderField
        label="Variation"
        sublabel="Prevents repetitive phrasing"
        value={repPenalty}
        min={1}
        max={2}
        step={0.01}
        onChange={setRepPenalty}
        left="None"
        right="Strong"
        format={(v) => v.toFixed(2)}
      />

      {/* Max tokens — static */}
      <div>
        <div className="flex items-baseline justify-between">
          <p className="text-[14px] font-medium text-foreground">Max tokens</p>
          <span className="font-display text-[13px] tabular-nums text-foreground">
            2,048
          </span>
        </div>
        <p className="text-[12px] text-muted-foreground/50 mt-0.5">
          Fixed at model maximum
        </p>
      </div>
    </div>
  );
}

/* ─── Slider Field ─── */

function SliderField({
  label,
  sublabel,
  value,
  min,
  max,
  step,
  onChange,
  left,
  right,
  hint,
  format,
}: {
  label: string;
  sublabel: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  left: string;
  right: string;
  hint?: string;
  format?: (v: number) => string;
}) {
  const [dragging, setDragging] = useState(false);
  const pct = ((value - min) / (max - min)) * 100;
  const display = format
    ? format(value)
    : value.toFixed(step < 0.1 ? 2 : step < 1 ? 2 : 0);

  return (
    <div>
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="text-[14px] font-medium text-foreground">{label}</p>
          <p className="text-[12px] text-muted-foreground/50 mt-0.5">
            {sublabel}
          </p>
        </div>
        <div className="text-right mt-0.5">
          {hint && (
            <p className="text-[12.5px] text-muted-foreground">{hint}</p>
          )}
          <p className="font-display text-[13px] tabular-nums text-foreground">
            {display}
          </p>
        </div>
      </div>

      <div className="relative py-2 group mt-2">
        <div className="relative h-[4px] w-full rounded-full bg-border/70">
          {/* Fill */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-foreground"
            style={{ width: `${pct}%` }}
          />
          {/* Thumb */}
          <div
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-background border-2 border-foreground shadow-[0_1px_4px_rgba(0,0,0,0.18)] transition-[width,height] duration-75 ${
              dragging
                ? "h-[18px] w-[18px]"
                : "h-[14px] w-[14px] group-hover:h-[16px] group-hover:w-[16px]"
            }`}
            style={{ left: `calc(${pct}% - ${dragging ? 9 : 7}px)` }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            onMouseDown={() => setDragging(true)}
            onMouseUp={() => setDragging(false)}
            onTouchStart={() => setDragging(true)}
            onTouchEnd={() => setDragging(false)}
            className="absolute -top-3 left-0 h-10 w-full cursor-pointer opacity-0"
          />
        </div>
      </div>

      <div className="flex justify-between -mt-0.5">
        <span className="text-[12px] text-muted-foreground/50">{left}</span>
        <span className="text-[12px] text-muted-foreground/50">{right}</span>
      </div>
    </div>
  );
}

/* ─── Experiments Panel ─── */

function ExperimentsPanel({
  experiments,
  playingId,
  setPlayingId,
  onLoad,
}: {
  experiments: Experiment[];
  playingId: number | null;
  setPlayingId: (id: number | null) => void;
  onLoad: (exp: Experiment) => void;
}) {
  if (experiments.length === 0) {
    return (
      <EmptyState
        icon={MagicWand}
        title="No experiments yet"
        description="Synthesize something to save it here."
        className="py-20 px-8"
      />
    );
  }

  return (
    <div className="py-2">
      {experiments.map((exp) => {
        const playing = playingId === exp.id;
        return (
          <div
            key={exp.id}
            className={`group flex items-start gap-3 px-5 py-4 hover:bg-[var(--inset)] transition-colors duration-100 border-b border-border/40 last:border-b-0 ${
              exp.isNew ? "animate-fade-in" : ""
            }`}
          >
            <button
              onClick={() => setPlayingId(playing ? null : exp.id)}
              className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              {playing ? (
                <Pause className="h-2.5 w-2.5" fill="currentColor" />
              ) : (
                <Play
                  className="h-2.5 w-2.5 translate-x-px"
                  fill="currentColor"
                />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[13.5px] font-medium text-foreground leading-snug truncate">
                  {exp.label}
                </span>
                <span className="inline-flex items-center gap-0.5 font-display text-[12px] tabular-nums text-[var(--success)]">
                  <Lightning className="h-3 w-3" />
                  {exp.latencyMs}ms
                </span>
              </div>
              <p className="mt-0.5 text-[13px] text-muted-foreground truncate leading-normal">
                {exp.text}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[12px] text-muted-foreground/40">
                  {exp.ts}
                </span>
                <span className="text-[11.5px] text-muted-foreground/30">
                  ·
                </span>
                <span className="text-[12px] text-muted-foreground/40">
                  {exp.tone}
                </span>
                <span className="text-[11.5px] text-muted-foreground/30">
                  ·
                </span>
                <span className="font-display text-[12px] text-muted-foreground/40">
                  temp {exp.temp.toFixed(2)}
                </span>
              </div>
              {playing && (
                <div className="mt-2 animate-fade-in">
                  <Waveform bars={36} playing={playing} />
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 mt-0.5 shrink-0">
              <button
                onClick={() => onLoad(exp)}
                className="rounded px-1.5 py-0.5 text-[12.5px] text-muted-foreground hover:text-foreground transition-colors"
              >
                Load
              </button>
              <button className="grid h-6 w-6 place-items-center rounded text-muted-foreground hover:text-foreground transition-colors">
                <Download className="h-3 w-3" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
