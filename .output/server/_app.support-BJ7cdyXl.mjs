import { n as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { n as PageHeader } from "./_ssr/primitives-MhefxCVw.mjs";
import { B as c$1, R as c, k as s, x as i } from "./_libs/phosphor-icons__react+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.support-BJ7cdyXl.js
var import_jsx_runtime = require_jsx_runtime();
var CHANNELS = [
	{
		icon: i,
		title: "Email support",
		hint: "Account and billing — usually within a business day.",
		action: "hello@rumik.ai"
	},
	{
		icon: c,
		title: "Documentation",
		hint: "Guides, API reference, and interactive tutorials.",
		action: "docs.rumik.ai"
	},
	{
		icon: s,
		title: "Discord community",
		hint: "Builders shipping live voice companions, in public.",
		action: "Join server"
	}
];
function Support() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Help",
		title: "Support",
		subtitle: "A quiet inbox is the goal. Pick the channel that fits."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "-mx-3 hairline-t animate-fade-in",
		children: CHANNELS.map(({ icon: Icon, title, hint, action }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: "#",
			className: "group grid grid-cols-[auto_1fr_auto] items-center gap-6 px-3 py-7 hairline-b row-hover",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-10 w-10 place-items-center rounded-md bg-[var(--inset)] text-foreground/80",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[15px] font-medium tracking-[-0.005em]",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-[13px] text-muted-foreground",
					children: hint
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 font-mono text-[12.5px] text-muted-foreground transition-colors group-hover:text-foreground",
					children: [action, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c$1, {
						size: 14,
						className: "transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
					})]
				})
			]
		}, title))
	})] });
}
//#endregion
export { Support as component };
