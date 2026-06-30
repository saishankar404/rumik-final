import { a as __toESM } from "./_runtime.mjs";
import { n as AnimatePresence, t as motion } from "./_libs/framer-motion.mjs";
import { n as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { o as Waveform$1 } from "./_ssr/primitives-MhefxCVw.mjs";
import { H as require_react, I as n$1, L as c$3, M as s$2, O as n$2, R as c, S as s$3, V as i, a as s, b as c$1, d as n$4, f as m, h as c$4, m as m$1, s as s$1, t as n, u as n$3, y as c$2 } from "./_libs/phosphor-icons__react+react.mjs";
import { t as clsx } from "./_libs/clsx.mjs";
import { t as twMerge } from "./_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.playground-CAEAexAS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function AIVoiceInput({ onStart, onStop, visualizerBars = 48, className }) {
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [time, setTime] = (0, import_react.useState)(0);
	const [isClient, setIsClient] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setIsClient(true);
	}, []);
	(0, import_react.useEffect)(() => {
		let intervalId;
		if (submitted) {
			onStart?.();
			intervalId = setInterval(() => setTime((t) => t + 1), 1e3);
		} else {
			onStop?.(time);
			setTime(0);
		}
		return () => clearInterval(intervalId);
	}, [
		submitted,
		time,
		onStart,
		onStop
	]);
	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};
	const handleClick = () => setSubmitted((prev) => !prev);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("w-full py-4", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex w-full max-w-xl flex-col items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: cn("group grid h-16 w-16 place-items-center rounded-xl transition-colors active:scale-[0.96]", submitted ? "" : "hover:bg-[var(--inset)]"),
					type: "button",
					onClick: handleClick,
					children: submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-6 w-6 cursor-pointer rounded-sm bg-foreground animate-spin pointer-events-auto",
						style: { animationDuration: "3s" }
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m, {
						className: "h-6 w-6 text-muted-foreground",
						weight: "fill"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("font-mono text-sm tabular-nums transition-opacity duration-300", submitted ? "text-foreground/70" : "text-muted-foreground/40"),
					children: formatTime(time)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-4 w-64 items-center justify-center gap-0.5",
					children: [...Array(visualizerBars)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("w-0.5 rounded-full transition-all duration-300", submitted ? "bg-foreground/50 animate-pulse" : "bg-muted-foreground/15 h-1"),
						style: submitted && isClient ? {
							height: `${20 + Math.random() * 80}%`,
							animationDelay: `${i * .05}s`
						} : void 0
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "h-4 text-xs text-muted-foreground/70",
					children: submitted ? "Listening..." : "Click to speak"
				})
			]
		})
	});
}
function Waveform({ width = 300, height = 40, bars = 60 }) {
	const [barsArray, setBarsArray] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const barWidth = width / bars * .5;
		const spacing = width / bars * .4;
		const centerY = height / 2;
		const cornerRadius = barWidth * .7;
		const startX = (width - ((barWidth + spacing) * bars - spacing)) / 2;
		const newBars = [];
		for (let i = 0; i < bars; i++) {
			const x = startX + i * (barWidth + spacing);
			const barHeight = Math.random() * (height * .6) + height * .1;
			const topY = centerY - barHeight / 2;
			newBars.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x,
				y: topY,
				width: barWidth,
				height: barHeight,
				rx: cornerRadius,
				ry: cornerRadius,
				fill: "currentColor",
				className: "text-muted-foreground/60"
			}, i));
		}
		setBarsArray(newBars);
	}, [
		width,
		height,
		bars
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width,
		height,
		viewBox: `0 0 ${width} ${height}`,
		children: barsArray
	});
}
function UploadCardBase({ children, className, isDragOver = false, isUploading = false }) {
	const hasChildren = import_react.Children.count(children) > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative flex min-h-[120px] items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors duration-200", isDragOver ? "border-foreground/40 bg-[var(--inset)]/60 shadow-inner" : isUploading ? "border-foreground/30 bg-foreground/5" : "border-border/60 bg-background", !isUploading && "cursor-pointer hover:bg-[var(--inset)]/30", className),
		children: [!hasChildren && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s, {
				size: 48,
				className: cn("transition-colors duration-200", isDragOver ? "text-foreground" : "text-muted-foreground/40", isUploading && "text-foreground")
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10 w-full",
			children
		})]
	});
}
function truncateFilename(filename, maxLength = 20) {
	if (filename.length <= maxLength) return filename;
	const ext = filename.split(".").pop();
	return `${filename.replace(`.${ext}`, "").substring(0, maxLength - 3 - (ext?.length ?? 0))}...${ext}`;
}
function AudioComponent({ isAnimating, filename = "audio.mp3", onRemove }) {
	const [isRemoving, setIsRemoving] = (0, import_react.useState)(false);
	const [shouldShow, setShouldShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isAnimating) setShouldShow(true);
	}, [isAnimating]);
	if (!shouldShow && !isRemoving) return null;
	const displayName = truncateFilename(filename);
	const handleRemove = () => setIsRemoving(true);
	const handleRemoveComplete = () => {
		setShouldShow(false);
		setIsRemoving(false);
		onRemove?.();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: shouldShow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "absolute z-20",
		initial: {
			right: 20,
			bottom: 20,
			opacity: 0
		},
		animate: isRemoving ? {
			scale: 0,
			opacity: 0,
			filter: "blur(8px)",
			transition: {
				duration: .4,
				ease: [
					.23,
					1,
					.32,
					1
				]
			}
		} : {
			left: "50%",
			top: "calc(50% - 15px)",
			x: "-50%",
			y: "-50%",
			opacity: 1,
			transition: {
				duration: .6,
				ease: [
					.23,
					1,
					.32,
					1
				]
			}
		},
		exit: {
			scale: 0,
			opacity: 0,
			filter: "blur(8px)",
			transition: {
				duration: .4,
				ease: [
					.23,
					1,
					.32,
					1
				]
			}
		},
		style: { transformOrigin: "center" },
		onAnimationComplete: isRemoving ? handleRemoveComplete : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: { scale: 1.5 },
			animate: isRemoving ? {
				scale: 0,
				transition: { duration: .4 }
			} : {
				scale: 1,
				transition: {
					duration: .8,
					ease: [
						.68,
						-.55,
						.265,
						1.55
					]
				}
			},
			className: "group relative rounded-lg border border-border/30 bg-[var(--inset)] px-2 py-1.5 shadow-lg backdrop-blur-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleRemove,
					className: "absolute -right-2 -top-2 z-30 grid h-5 w-5 place-items-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:scale-110",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, { size: 12 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-full items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waveform, {
						width: 180,
						height: 32,
						bars: 40
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-left text-xs font-medium text-foreground/60",
					children: displayName
				}) })
			]
		})
	}) });
}
function AudioUploadCard({ className, title = "Upload audio", description = "Drop in your recordings and start transcribing instantly." }) {
	const [isAnimating, setIsAnimating] = (0, import_react.useState)(false);
	const [isDragOver, setIsDragOver] = (0, import_react.useState)(false);
	const [isUploading, setIsUploading] = (0, import_react.useState)(false);
	const [uploadedFile, setUploadedFile] = (0, import_react.useState)(null);
	const fileInputRef = (0, import_react.useRef)(null);
	const handleDragOver = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragOver(true);
	}, []);
	const handleDragLeave = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragOver(false);
	}, []);
	const handleDrop = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragOver(false);
		const audioFile = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith("audio/"));
		if (audioFile) {
			setUploadedFile(audioFile);
			setIsUploading(true);
			setTimeout(() => {
				setIsUploading(false);
				setIsAnimating(true);
			}, 200);
		}
	}, []);
	const handleFileSelect = (0, import_react.useCallback)((e) => {
		const file = e.target.files?.[0];
		if (file && file.type.startsWith("audio/")) {
			setUploadedFile(file);
			setIsUploading(true);
			setTimeout(() => {
				setIsUploading(false);
				setIsAnimating(true);
			}, 200);
		}
	}, []);
	const handleRemoveFile = (0, import_react.useCallback)(() => {
		setUploadedFile(null);
		setIsAnimating(false);
		if (fileInputRef.current) fileInputRef.current.value = "";
	}, []);
	const handleBaseClick = (0, import_react.useCallback)(() => {
		if (!isUploading && !uploadedFile) fileInputRef.current?.click();
	}, [isUploading, uploadedFile]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: cn("relative mx-auto w-full max-w-md", className),
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-xl border border-border/50 bg-background p-6 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-center space-y-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mx-auto w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						onDragOver: handleDragOver,
						onDragLeave: handleDragLeave,
						onDrop: handleDrop,
						onClick: handleBaseClick,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadCardBase, {
							isDragOver,
							isUploading
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileInputRef,
							type: "file",
							accept: "audio/*",
							onChange: handleFileSelect,
							className: "sr-only"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-left text-lg font-semibold text-foreground",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-left text-sm text-muted-foreground",
						children: description
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioComponent, {
				isAnimating,
				filename: uploadedFile?.name,
				onRemove: handleRemoveFile
			})]
		})
	});
}
var TAGS = [
	{
		tag: "laugh",
		hint: "Soft, warm laugh"
	},
	{
		tag: "chuckle",
		hint: "Quick chuckle"
	},
	{
		tag: "sigh",
		hint: "Long exhale"
	},
	{
		tag: "whisper",
		hint: "Lowered, close voice"
	},
	{
		tag: "pause",
		hint: "200 ms of silence"
	},
	{
		tag: "excited",
		hint: "Energy lift"
	}
];
var STARTERS = [
	{
		Icon: c,
		label: "Narrate a story",
		sample: "Once upon a time, in a city built on clouds, there was an engineer who discovered a voice that could move mountains. <pause> She spoke once. The world listened."
	},
	{
		Icon: s$1,
		label: "Tell a silly joke",
		sample: "Why don't scientists trust atoms? <chuckle> Because they make up everything! <laugh> Get it? Everything!"
	},
	{
		Icon: m,
		label: "Record an advertisement",
		sample: "Introducing Rumik — the voice AI that sounds so natural, you'll forget it's not human. Try it free today. No credit card required."
	},
	{
		Icon: c$1,
		label: "Dramatic movie scene",
		sample: "I never asked for this. <sigh> None of us did. But here we are, at the edge of everything, with nothing left to lose. <pause> So let's finish this."
	},
	{
		Icon: c$2,
		label: "Video game character",
		sample: "Greetings, traveler. <pause> You dare enter the realm of the ancient ones? <excited> Then prepare yourself! The trials ahead will test your very soul."
	},
	{
		Icon: n$1,
		label: "Introduce your podcast",
		sample: "Welcome back to another episode. I'm your host, and today we're diving deep into something that will change how you see the world. Let's get into it."
	},
	{
		Icon: c$3,
		label: "Meditation guide",
		sample: "<whisper> Take a slow breath in. <pause> And release. <pause> With each breath, feel your body grow lighter. You are exactly where you need to be."
	}
];
var MODELS = [{
	id: "silk-muga-1",
	label: "Silk Muga",
	sublabel: "Fast · ~180ms avg",
	description: "Crisp and natural. Best for real-time responses."
}, {
	id: "silk-mulberry-1.5",
	label: "Silk Mulberry 1.5",
	sublabel: "Expressive · ~280ms avg",
	description: "Richer, more emotive. Best for narration."
}];
var TONES = [
	"Neutral",
	"Happy",
	"Excited",
	"Sad",
	"Whisper"
];
var CREDITS_REMAINING = 9992;
var CHAR_LIMIT = 5e3;
var SEED_EXPERIMENTS = [
	{
		id: 1,
		label: "Mulberry — narrator voice",
		model: "silk-mulberry-1.5",
		text: "good morning. setting your focus for the next forty minutes.",
		tone: "Neutral",
		temp: .7,
		latencyMs: 262,
		ts: "1h ago"
	},
	{
		id: 2,
		label: "Muga — dashboard read-back",
		model: "silk-muga-1",
		text: "welcome back, your dashboard has three new logs to review.",
		tone: "Neutral",
		temp: .6,
		latencyMs: 174,
		ts: "14m ago"
	},
	{
		id: 3,
		label: "Laugh tag test",
		model: "silk-muga-1",
		text: "hello, this is a test of the rumik voice API. <laugh> pretty nice, isn't it?",
		tone: "Happy",
		temp: .8,
		latencyMs: 191,
		ts: "2m ago"
	}
];
var TEMP_HINT = (v) => {
	if (v < .3) return "Very predictable";
	if (v < .55) return "Consistent";
	if (v < .75) return "Natural";
	if (v < .9) return "Creative";
	return "Experimental";
};
function Playground() {
	const taRef = (0, import_react.useRef)(null);
	const [text, setText] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("tts");
	const [modelId, setModelId] = (0, import_react.useState)(MODELS[0].id);
	const [modelOpen, setModelOpen] = (0, import_react.useState)(false);
	const [tone, setTone] = (0, import_react.useState)("Neutral");
	const [lastTone, setLastTone] = (0, import_react.useState)("Neutral");
	const [temp, setTemp] = (0, import_react.useState)(.7);
	const [topP, setTopP] = (0, import_react.useState)(.95);
	const [topK, setTopK] = (0, import_react.useState)(50);
	const [repPenalty, setRepPenalty] = (0, import_react.useState)(1.2);
	const [synthState, setSynthState] = (0, import_react.useState)("idle");
	const [lastLatencyMs, setLastLatencyMs] = (0, import_react.useState)(null);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [playTime, setPlayTime] = (0, import_react.useState)(0);
	const [playingId, setPlayingId] = (0, import_react.useState)(null);
	const [experiments, setExperiments] = (0, import_react.useState)(SEED_EXPERIMENTS);
	const [tab, setTab] = (0, import_react.useState)("settings");
	const [flashedTag, setFlashedTag] = (0, import_react.useState)(null);
	const nextId = (0, import_react.useRef)(SEED_EXPERIMENTS.length + 1);
	const activeModel = MODELS.find((m) => m.id === modelId);
	const isEmpty = text.trim() === "";
	const isGenerating = synthState === "generating";
	const isDone = synthState === "done";
	function insertTag(tag) {
		const ta = taRef.current;
		const insert = `<${tag}> `;
		if (!ta) {
			setText((t) => t + insert);
			return;
		}
		const start = ta.selectionStart ?? text.length;
		const end = ta.selectionEnd ?? text.length;
		setText(text.slice(0, start) + insert + text.slice(end));
		setFlashedTag(tag);
		setTimeout(() => setFlashedTag(null), 500);
		requestAnimationFrame(() => {
			ta.focus();
			const pos = start + insert.length;
			ta.setSelectionRange(pos, pos);
		});
	}
	function loadStarter(sample) {
		setText(sample);
		requestAnimationFrame(() => taRef.current?.focus());
	}
	function selectTone(t) {
		setTone(t);
		setLastTone(t);
	}
	(0, import_react.useEffect)(() => {
		let intervalId;
		if (isPlaying) intervalId = setInterval(() => setPlayTime((t) => t + 1), 1e3);
		else setPlayTime(0);
		return () => clearInterval(intervalId);
	}, [isPlaying]);
	const formatPlayTime = (s) => {
		const mins = Math.floor(s / 60);
		const secs = s % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};
	const handleSynthesize = (0, import_react.useCallback)(() => {
		if (isEmpty || isGenerating) return;
		setIsPlaying(false);
		setSynthState("generating");
		const latency = activeModel.id === "silk-muga-1" ? 160 + Math.floor(Math.random() * 60) : 240 + Math.floor(Math.random() * 80);
		setTimeout(() => {
			const exp = {
				id: nextId.current++,
				label: `${activeModel.label} · ${tone}`,
				model: activeModel.id,
				text,
				tone,
				temp,
				latencyMs: latency,
				ts: "just now",
				isNew: true
			};
			setExperiments((prev) => [exp, ...prev]);
			setLastLatencyMs(latency);
			setSynthState("done");
			setTimeout(() => {
				setExperiments((prev) => prev.map((e) => e.id === exp.id ? {
					...e,
					isNew: false
				} : e));
			}, 600);
		}, latency);
	}, [
		text,
		activeModel,
		tone,
		temp,
		isEmpty,
		isGenerating
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col min-w-0 overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-10 pt-8 pb-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-[17px] font-semibold text-foreground tracking-[-0.015em]",
					children: mode === "tts" ? "Text to speech" : "Speech to text"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-[13.5px] text-muted-foreground",
					children: mode === "tts" ? "Compose, tune, and iterate." : "Transcribe audio or speak live."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative flex items-center rounded-lg bg-[var(--inset)] p-0.5",
					children: ["tts", "stt"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setMode(m),
						className: `relative rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-200 ${mode === m ? "text-background" : "text-muted-foreground hover:text-foreground"}`,
						children: [mode === m && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							layoutId: "mode-toggle-pill",
							className: "absolute inset-0 rounded-md bg-foreground",
							transition: {
								type: "spring",
								stiffness: 400,
								damping: 30
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative z-10",
							children: m === "tts" ? "Text → Speech" : "Speech → Text"
						})]
					}, m))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				children: mode === "tts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 8
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -8
					},
					transition: {
						duration: .2,
						ease: [
							.2,
							0,
							0,
							1
						]
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-10 mt-6 rounded-xl border border-border/60 transition-colors duration-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-5 pt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									ref: taRef,
									value: text,
									onChange: (e) => setText(e.target.value),
									spellCheck: false,
									rows: 16,
									placeholder: "Start typing here or paste any text you want to turn into speech…",
									className: "w-full resize-none bg-transparent text-[15.5px] leading-[1.75] tracking-[-0.005em] text-foreground outline-none placeholder:text-muted-foreground/30"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 border-t border-border/40 px-4 py-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-[var(--inset)] hover:text-foreground active:scale-[0.96]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m$1, { className: "h-3.5 w-3.5" }), "Enhance"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setText(""),
										className: "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-[var(--inset)] hover:text-foreground active:scale-[0.96]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i, { className: "h-3.5 w-3.5" }), "Clear"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ml-auto flex items-center gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-display text-[12px] tabular-nums text-muted-foreground/50",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground/80 font-medium",
													children: CREDITS_REMAINING.toLocaleString()
												}), " credits remaining"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-px bg-border/60" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-display text-[12px] tabular-nums text-muted-foreground/50",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: text.length > CHAR_LIMIT * .9 ? "text-orange-500 font-medium" : "",
													children: text.length
												}), ` / ${CHAR_LIMIT.toLocaleString()}`]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: handleSynthesize,
												disabled: isEmpty || isGenerating,
												className: `relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-4 py-2 text-[13.5px] font-medium transition-all duration-150 active:scale-[0.97] disabled:cursor-not-allowed ${isDone ? "bg-[var(--success)] text-white disabled:opacity-100" : "bg-foreground text-background hover:bg-foreground/88 disabled:opacity-35"}`,
												children: [isGenerating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3.5 w-3.5 rounded-full border-2 border-background/30 border-t-background animate-spin" }), isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$2, {
													className: "h-3.5 w-3.5",
													strokeWidth: 2.5
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-display tabular-nums",
													children: [lastLatencyMs, "ms"]
												})] }) : isGenerating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-display text-background/70",
													children: "Generating…"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$3, {
													className: "h-3.5 w-3.5",
													fill: "currentColor"
												}), "Generate speech"] })]
											})
										]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-10 pt-5 pb-4 min-h-[120px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "wait",
								children: isEmpty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 8,
										filter: "blur(4px)"
									},
									animate: {
										opacity: 1,
										y: 0,
										filter: "blur(0px)"
									},
									exit: {
										opacity: 0,
										y: -8,
										filter: "blur(4px)"
									},
									transition: {
										duration: .25,
										ease: [
											.2,
											0,
											0,
											1
										]
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[13px] text-muted-foreground/50 mb-3",
										children: "Get started with"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: STARTERS.map(({ Icon, label: sl, sample }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => loadStarter(sample),
											className: "inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3.5 py-1.5 text-[13.5px] text-foreground transition-all duration-100 hover:border-border hover:bg-[var(--inset)] active:scale-[0.97]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												className: "h-4 w-4 text-muted-foreground shrink-0",
												strokeWidth: 1.5
											}), sl]
										}, sl))
									})]
								}, "get-started") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 8,
										filter: "blur(4px)"
									},
									animate: {
										opacity: 1,
										y: 0,
										filter: "blur(0px)"
									},
									exit: {
										opacity: 0,
										y: -8,
										filter: "blur(4px)"
									},
									transition: {
										duration: .25,
										ease: [
											.2,
											0,
											0,
											1
										]
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[13px] text-muted-foreground/50 mb-3",
										children: "Emotion tags — click to insert at cursor"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: TAGS.map((t) => {
											const flashing = flashedTag === t.tag;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => insertTag(t.tag),
												title: t.hint,
												className: `inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13.5px] transition-all duration-150 active:scale-[0.96] ${flashing ? "border-foreground/40 bg-foreground/[0.06] text-foreground scale-[0.96]" : "border-border/70 bg-background text-foreground hover:border-border hover:bg-[var(--inset)]"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono text-muted-foreground",
													children: [
														"<",
														t.tag,
														">"
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[12.5px] text-muted-foreground/60",
													children: t.hint
												})]
											}, t.tag);
										})
									})]
								}, "emotion-tags")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isDone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 12,
								filter: "blur(4px)"
							},
							animate: {
								opacity: 1,
								y: 0,
								filter: "blur(0px)"
							},
							exit: {
								opacity: 0,
								y: 12,
								filter: "blur(4px)"
							},
							transition: {
								duration: .3,
								ease: [
									.2,
									0,
									0,
									1
								]
							},
							className: "mx-10 mb-10 rounded-xl border border-border/60 bg-[var(--inset)]/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 px-4 py-3.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setIsPlaying((p) => !p),
										className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform duration-150 active:scale-[0.96]",
										children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$4, {
											className: "h-3.5 w-3.5",
											fill: "currentColor"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$3, {
											className: "h-3.5 w-3.5 translate-x-px",
											fill: "currentColor"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[12px] tabular-nums text-muted-foreground w-[40px] shrink-0",
										children: formatPlayTime(playTime)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-10 flex-1 items-center gap-[2px] min-w-0",
										children: [...Array(64)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `flex-1 rounded-full transition-all duration-300 ${isPlaying ? "bg-foreground/40 animate-pulse" : "bg-muted-foreground/12"}`,
											style: isPlaying ? {
												height: `${15 + Math.random() * 85}%`,
												animationDelay: `${i * .04}s`
											} : { height: "15%" }
										}, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 font-display text-[12px] tabular-nums text-[var(--success)] shrink-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c$4, {
												className: "h-3 w-3",
												weight: "fill"
											}),
											lastLatencyMs,
											"ms"
										]
									})
								]
							})
						}, "waveform-player") })
					]
				}, "tts-editor") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 8
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -8
					},
					transition: {
						duration: .2,
						ease: [
							.2,
							0,
							0,
							1
						]
					},
					className: "mx-10 mt-6 rounded-xl border border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-8 px-5 py-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIVoiceInput, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 w-full max-w-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border/40" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[12px] text-muted-foreground/40 font-medium",
										children: "or"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border/40" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioUploadCard, {})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2 border-t border-border/40 px-4 py-2.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-[12px] tabular-nums text-muted-foreground/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground/80 font-medium",
									children: CREDITS_REMAINING.toLocaleString()
								}), " credits remaining"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-[13.5px] font-medium text-background transition-all duration-150 hover:bg-foreground/88 active:scale-[0.97]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$3, {
									className: "h-3.5 w-3.5",
									fill: "currentColor"
								}), "Transcribe"]
							})]
						})
					})]
				}, "stt-editor")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "w-[300px] shrink-0 border-l border-border/50 flex flex-col overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-0 border-b border-border/50 px-5",
				children: ["settings", "experiments"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setTab(t),
					className: `relative px-2 py-4 text-[14px] capitalize transition-colors ${tab === t ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`,
					children: [t === "experiments" ? `Experiments${experiments.length ? ` (${experiments.length})` : ""}` : "Settings", tab === t && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 left-0 right-0 h-[2px] bg-foreground rounded-t-full" })]
				}, t))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto",
				children: tab === "settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, {
					modelId,
					setModelId,
					modelOpen,
					setModelOpen,
					tone,
					setTone: selectTone,
					temp,
					setTemp,
					topP,
					setTopP,
					topK,
					setTopK,
					repPenalty,
					setRepPenalty
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperimentsPanel, {
					experiments,
					playingId,
					setPlayingId,
					onLoad: (exp) => {
						setText(exp.text);
						setTone(exp.tone);
						setTemp(exp.temp);
						setModelId(exp.model);
						setTab("settings");
					}
				})
			})]
		})]
	});
}
function SettingsPanel({ modelId, setModelId, modelOpen, setModelOpen, tone, setTone, temp, setTemp, topP, setTopP, topK, setTopK, repPenalty, setRepPenalty }) {
	const activeModel = MODELS.find((m) => m.id === modelId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-6 py-6 space-y-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[14px] font-medium text-foreground mb-2.5",
				children: "Model"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setModelOpen(!modelOpen),
					className: "flex w-full items-center justify-between rounded-lg border border-border px-3.5 py-2.5 text-left transition-colors hover:bg-[var(--inset)] active:scale-[0.99]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[14px] font-medium text-foreground",
						children: activeModel.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[12.5px] text-muted-foreground mt-0.5",
						children: activeModel.sublabel
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$2, { className: `h-4 w-4 text-muted-foreground/50 transition-transform duration-150 ${modelOpen ? "rotate-90" : ""}` })]
				}), modelOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute left-0 right-0 top-[calc(100%+4px)] z-20 rounded-xl border border-border bg-background shadow-[0_8px_30px_-8px_rgba(0,0,0,0.18)] overflow-hidden pop-in",
					children: MODELS.map((m) => {
						const selected = m.id === modelId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setModelId(m.id);
								setModelOpen(false);
							},
							className: `flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[var(--inset)] border-b border-border/40 last:border-b-0 ${selected ? "bg-[var(--inset)]" : ""}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[14px] font-medium text-foreground",
											children: m.label
										}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-foreground" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[12.5px] text-muted-foreground mt-0.5",
										children: m.sublabel
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[12px] text-muted-foreground/60 mt-1 leading-snug",
										children: m.description
									})
								]
							})
						}, m.id);
					})
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[14px] font-medium text-foreground mb-2.5",
				children: "Tone"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: TONES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTone(t),
					className: `rounded-full px-3.5 py-1.5 text-[13.5px] transition-all duration-150 active:scale-[0.96] ${tone === t ? "bg-foreground text-background font-medium shadow-[0_1px_3px_rgba(0,0,0,0.12)]" : "bg-[var(--inset)] text-muted-foreground hover:text-foreground"}`,
					children: t
				}, t))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
				label: "Temperature",
				sublabel: "How consistent each take sounds",
				value: temp,
				min: 0,
				max: 1,
				step: .05,
				onChange: setTemp,
				left: "Predictable",
				right: "Creative",
				hint: TEMP_HINT(temp)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
				label: "Vocabulary",
				sublabel: "Breadth of word selection",
				value: topP,
				min: 0,
				max: 1,
				step: .01,
				onChange: setTopP,
				left: "Focused",
				right: "Wide"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
				label: "Focus",
				sublabel: "Candidates considered per token",
				value: topK,
				min: 1,
				max: 100,
				step: 1,
				onChange: setTopK,
				left: "Narrow",
				right: "Broad",
				format: (v) => String(Math.round(v))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
				label: "Variation",
				sublabel: "Prevents repetitive phrasing",
				value: repPenalty,
				min: 1,
				max: 2,
				step: .01,
				onChange: setRepPenalty,
				left: "None",
				right: "Strong",
				format: (v) => v.toFixed(2)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[14px] font-medium text-foreground",
					children: "Max tokens"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-[13px] tabular-nums text-foreground",
					children: "2,048"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-muted-foreground/50 mt-0.5",
				children: "Fixed at model maximum"
			})] })
		]
	});
}
function SliderField({ label, sublabel, value, min, max, step, onChange, left, right, hint, format }) {
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const pct = (value - min) / (max - min) * 100;
	const display = format ? format(value) : value.toFixed(step < .1 ? 2 : step < 1 ? 2 : 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between mb-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[14px] font-medium text-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-muted-foreground/50 mt-0.5",
				children: sublabel
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right mt-0.5",
				children: [hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12.5px] text-muted-foreground",
					children: hint
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-[13px] tabular-nums text-foreground",
					children: display
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative py-2 group mt-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-[4px] w-full rounded-full bg-border/70",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-y-0 left-0 rounded-full bg-foreground",
						style: { width: `${pct}%` }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-background border-2 border-foreground shadow-[0_1px_4px_rgba(0,0,0,0.18)] transition-[width,height] duration-75 ${dragging ? "h-[18px] w-[18px]" : "h-[14px] w-[14px] group-hover:h-[16px] group-hover:w-[16px]"}`,
						style: { left: `calc(${pct}% - ${dragging ? 9 : 7}px)` }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min,
						max,
						step,
						value,
						onChange: (e) => onChange(parseFloat(e.target.value)),
						onMouseDown: () => setDragging(true),
						onMouseUp: () => setDragging(false),
						onTouchStart: () => setDragging(true),
						onTouchEnd: () => setDragging(false),
						className: "absolute -top-3 left-0 h-10 w-full cursor-pointer opacity-0"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between -mt-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[12px] text-muted-foreground/50",
				children: left
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[12px] text-muted-foreground/50",
				children: right
			})]
		})
	] });
}
function ExperimentsPanel({ experiments, playingId, setPlayingId, onLoad }) {
	if (experiments.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-20 text-center px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[14px] text-muted-foreground",
			children: "No experiments yet."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[13px] text-muted-foreground/50 mt-1",
			children: "Synthesize something to save it here."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-2",
		children: experiments.map((exp) => {
			const playing = playingId === exp.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `group flex items-start gap-3 px-5 py-4 hover:bg-[var(--inset)] transition-colors duration-100 border-b border-border/40 last:border-b-0 ${exp.isNew ? "animate-fade-in" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setPlayingId(playing ? null : exp.id),
						className: "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform duration-150 hover:scale-105 active:scale-95",
						children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$4, {
							className: "h-2.5 w-2.5",
							fill: "currentColor"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$3, {
							className: "h-2.5 w-2.5 translate-x-px",
							fill: "currentColor"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 flex-wrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[13.5px] font-medium text-foreground leading-snug truncate",
									children: exp.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-0.5 font-display text-[12px] tabular-nums text-[var(--success)]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c$4, { className: "h-3 w-3" }),
										exp.latencyMs,
										"ms"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-[13px] text-muted-foreground truncate leading-normal",
								children: exp.text
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mt-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[12px] text-muted-foreground/40",
										children: exp.ts
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11.5px] text-muted-foreground/30",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[12px] text-muted-foreground/40",
										children: exp.tone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11.5px] text-muted-foreground/30",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-display text-[12px] text-muted-foreground/40",
										children: ["temp ", exp.temp.toFixed(2)]
									})
								]
							}),
							playing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 animate-fade-in",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waveform$1, {
									bars: 36,
									playing
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 mt-0.5 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onLoad(exp),
							className: "rounded px-1.5 py-0.5 text-[12.5px] text-muted-foreground hover:text-foreground transition-colors",
							children: "Load"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "grid h-6 w-6 place-items-center rounded text-muted-foreground hover:text-foreground transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$3, { className: "h-3 w-3" })
						})]
					})
				]
			}, exp.id);
		})
	});
}
//#endregion
export { Playground as component };
