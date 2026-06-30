import { n as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { n as PageHeader } from "./_ssr/primitives-MhefxCVw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.docs-BSwQFNRF.js
var import_jsx_runtime = require_jsx_runtime();
var TOC = [
	{
		label: "Overview",
		active: true
	},
	{
		label: "Authentication",
		active: false
	},
	{
		label: "Text to speech",
		active: false
	},
	{
		label: "Streaming",
		active: false
	},
	{
		label: "Tone tags",
		active: false
	},
	{
		label: "Rate limits",
		active: false
	},
	{
		label: "Errors",
		active: false
	},
	{
		label: "Webhooks",
		active: false
	}
];
function Docs() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "docs.rumik.ai",
		title: "Developer guide",
		subtitle: "A short, opinionated reference for everything Rumik."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[180px_1fr] gap-14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "sticky top-20 h-fit text-[12.5px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 eyebrow-label",
				children: "On this site"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1",
				children: TOC.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#",
					className: `block rounded px-2 py-1 ${t.active ? "bg-[var(--inset)] text-foreground" : "text-muted-foreground hover:text-foreground"}`,
					children: t.label
				}) }, t.label))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "max-w-[640px] text-[14.5px] leading-[1.75] text-foreground/85",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-[22px] font-semibold tracking-[-0.015em] text-foreground",
					children: "Overview"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Rumik is a voice synthesis API for builders shipping live, expressive applications. Two production models ship today — ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-foreground",
						children: "silk muga 1"
					}),
					" for tone-tagged Hinglish, and ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-foreground",
						children: "silk mulberry 1.5"
					}),
					" for narration and agentic loops."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5",
					children: "Authentication is a single bearer token. Requests are billed per input character, never per minute, and credits never expire."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-10 mb-3 text-[15px] font-semibold tracking-[-0.005em] text-foreground",
					children: "Quick start"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "rounded-md bg-[var(--inset)] p-4 font-mono text-[12.5px] leading-relaxed text-foreground/85 overflow-x-auto",
					children: `curl https://api.rumik.ai/v1/tts \\
  -H "Authorization: Bearer rk_live_…" \\
  -d '{
    "model": "silk-muga-1",
    "text": "hello, welcome aboard."
  }'`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-10 mb-3 text-[15px] font-semibold tracking-[-0.005em] text-foreground",
					children: "Tone tags"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Inline tags like ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-foreground",
						children: "<laugh>"
					}),
					" and",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-foreground",
						children: " <sigh>"
					}),
					" shape delivery without separate API calls. See the full reference under ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Tone tags" }),
					"."
				] })
			]
		})]
	})] });
}
//#endregion
export { Docs as component };
