import { a as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { n as PageHeader, r as Section } from "./_ssr/primitives-MhefxCVw.mjs";
import { C as m$1, E as s, H as require_react, _ as n$1, l as n, r as m, t as n$2 } from "./_libs/phosphor-icons__react+react.mjs";
import { t as useWorkspace } from "./_ssr/store-CDVs1vNK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.api-keys-BWNKgZ8F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WORKSPACE_KEYS = {
	"Personal workspace": [
		{
			name: "prod-key-01",
			prefix: "rk_live_9a8B7c6D",
			scopes: ["tts", "tts:stream"],
			rate: "120 / min",
			last: "3m ago",
			expires: "Never",
			status: "active",
			date: "Created Jun 15, 2026"
		},
		{
			name: "dev-key-02",
			prefix: "rk_test_5e4F3g2H",
			scopes: ["tts", "tts:stream"],
			rate: "60 / min",
			last: "5m ago",
			expires: "Never",
			status: "active",
			date: "Created Jun 20, 2026"
		},
		{
			name: "legacy-integration",
			prefix: "rk_live_8z9Y0x1W",
			scopes: ["tts"],
			rate: "60 / min",
			last: "Never",
			expires: "Expired",
			status: "expired",
			date: "Created Mar 10, 2026"
		}
	],
	"Acme Studio": [{
		name: "acme-live-api",
		prefix: "rk_live_3v8K2m1L",
		scopes: ["tts", "tts:stream"],
		rate: "500 / min",
		last: "Just now",
		expires: "Never",
		status: "active",
		date: "Created Jan 12, 2026"
	}, {
		name: "staging-webhook",
		prefix: "rk_test_9p4X5c8Y",
		scopes: ["tts"],
		rate: "100 / min",
		last: "12h ago",
		expires: "Never",
		status: "active",
		date: "Created Feb 18, 2026"
	}],
	"Lab": [{
		name: "scratchpad-temp",
		prefix: "rk_test_0a9B8c7D",
		scopes: ["tts"],
		rate: "10 / min",
		last: "2d ago",
		expires: "Jul 10, 2026",
		status: "active",
		date: "Created Jun 28, 2026"
	}]
};
var SEED_KEYS = WORKSPACE_KEYS["Personal workspace"];
function ApiKeys() {
	const ws = useWorkspace();
	const keys = WORKSPACE_KEYS[ws] || SEED_KEYS;
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [newKeyName, setNewKeyName] = (0, import_react.useState)("");
	const [newKeyScope, setNewKeyScope] = (0, import_react.useState)("tts");
	const [copiedName, setCopiedName] = (0, import_react.useState)(null);
	const [activeKeyMenu, setActiveKeyMenu] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		function handleOutsideClick() {
			setActiveKeyMenu(null);
		}
		document.addEventListener("mousedown", handleOutsideClick);
		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, []);
	const handleCopy = (name, text) => {
		navigator.clipboard.writeText(text);
		setCopiedName(name);
		setTimeout(() => setCopiedName(null), 1e3);
	};
	const handleCreate = (e) => {
		e.preventDefault();
		if (!newKeyName.trim()) return;
		const newKey = {
			name: newKeyName.trim(),
			prefix: `rk_live_${Math.random().toString(36).substring(2, 10)}`,
			scopes: [newKeyScope],
			rate: "100 / min",
			last: "Never",
			expires: "Never",
			status: "active",
			date: `Created today`
		};
		if (WORKSPACE_KEYS[ws]) WORKSPACE_KEYS[ws] = [newKey, ...WORKSPACE_KEYS[ws]];
		setNewKeyName("");
		setCreateOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Develop",
			title: "API keys",
			subtitle: "Active developer credentials. Keys are shown once at creation — store them securely.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setCreateOpen(true),
				className: "inline-flex items-center gap-2 rounded-md bg-foreground px-3.5 py-2 text-[13px] font-medium text-background hover:bg-foreground/90 active:scale-[0.96] transition-transform duration-100 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, {
					size: 14,
					weight: "bold"
				}), "New key"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 flex items-start gap-3 rounded-md bg-[var(--inset)] px-4 py-3 animate-fade-in",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m, {
				className: "mt-0.5",
				size: 16
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-[12.5px] text-muted-foreground",
				children: [
					"All models share ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-foreground",
						children: "20"
					}),
					" concurrent requests per account.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "ml-1.5 text-foreground underline-offset-4 hover:underline",
						href: "#",
						children: "Contact us"
					}),
					" for more."
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: `Keys for ${ws}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "-mx-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[1.2fr_1.3fr_1.2fr_0.8fr_0.8fr_0.7fr_auto] gap-6 px-3 pb-3 eyebrow-label",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Name" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Prefix" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scopes" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rate limit" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Last used" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
					]
				}), keys.map((k) => {
					const isExpired = k.status === "expired";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `group grid grid-cols-[1.2fr_1.3fr_1.2fr_0.8fr_0.8fr_0.7fr_auto] items-center gap-6 rounded-md px-3 py-3.5 hairline-t row-hover animate-fade-in ${activeKeyMenu === k.name ? "relative z-20 bg-[var(--inset)]/20" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-[13.5px] font-medium text-foreground",
								children: k.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11.5px] text-muted-foreground",
								children: k.date
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", {
									className: "font-mono text-[12.5px] text-foreground/80",
									children: [k.prefix, "…"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleCopy(k.name, `${k.prefix}12345678`),
									title: "Copy prefix",
									className: "flex items-center justify-center rounded px-1.5 py-0.5 text-[11px] text-muted-foreground hover:bg-[var(--inset)] hover:text-foreground active:scale-[0.96] duration-100 transition-all",
									children: copiedName === k.name ? "Copied!" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s, { size: 13 })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1",
								children: k.scopes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-[var(--inset)] px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground",
									children: s
								}, s))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-[12.5px] tabular-nums text-muted-foreground",
								children: k.rate
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[12.5px] text-muted-foreground",
								children: k.last
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-2 w-2 place-items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${isExpired ? "bg-red-400" : "bg-[var(--success)]"}` })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[12.5px] text-foreground/85 capitalize",
									children: k.status
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation();
										setActiveKeyMenu(activeKeyMenu === k.name ? null : k.name);
									},
									className: "grid h-7 w-7 place-items-center rounded-md text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[var(--inset)] hover:text-foreground active:scale-[0.95]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m$1, { size: 14 })
								}), activeKeyMenu === k.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onClick: (e) => e.stopPropagation(),
									className: "absolute right-0 mt-1 z-30 w-36 rounded-lg border border-border bg-background p-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] pop-in",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											handleCopy(k.name, `${k.prefix}12345678`);
											setActiveKeyMenu(null);
										},
										className: "flex w-full items-center px-2 py-1.5 text-left text-[12px] hover:bg-[var(--inset)] rounded font-display font-medium",
										children: "Copy key token"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											if (WORKSPACE_KEYS[ws]) WORKSPACE_KEYS[ws] = WORKSPACE_KEYS[ws].map((keyItem) => keyItem.name === k.name ? {
												...keyItem,
												status: "expired"
											} : keyItem);
											setActiveKeyMenu(null);
										},
										className: "flex w-full items-center px-2 py-1.5 text-left text-[12px] text-red-500 hover:bg-red-500/10 rounded font-display font-medium",
										children: "Revoke key"
									})]
								})]
							})
						]
					}, k.name);
				})]
			})
		}),
		createOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			onClose: () => setCreateOpen(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleCreate,
				className: "flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-4 py-3 border-b border-border/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$1, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-[14px] font-semibold text-foreground",
								children: "Create API Key"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCreateOpen(false),
							className: "rounded p-1 text-muted-foreground/60 hover:bg-[var(--inset)] hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$2, { size: 14 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[13px] font-medium text-foreground",
								children: "Key name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: newKeyName,
								onChange: (e) => setNewKeyName(e.target.value),
								placeholder: "e.g. production-client-app",
								required: true,
								className: "w-full rounded-md border border-border px-3 py-2 text-[13.5px] outline-none focus:border-foreground/30 bg-transparent font-display font-medium"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[13px] font-medium text-foreground",
								children: "Scopes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newKeyScope,
								onChange: (e) => setNewKeyScope(e.target.value),
								className: "w-full rounded-md border border-border px-3 py-2 text-[13.5px] outline-none focus:border-foreground/30 bg-background font-display font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "tts",
									children: "tts (Read synthesis only)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "tts:stream",
									children: "tts:stream (Low latency streaming)"
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-end gap-2 px-4 py-3 border-t border-border/40 bg-[var(--inset)]/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCreateOpen(false),
							className: "rounded-md border border-border bg-background px-3 py-1.5 text-[12.5px] font-medium text-foreground hover:bg-[var(--inset)] active:scale-[0.96] transition-transform duration-75",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-md bg-foreground px-3 py-1.5 text-[12.5px] font-medium text-background hover:bg-foreground/90 active:scale-[0.96] transition-transform duration-75",
							children: "Create key"
						})]
					})
				]
			})
		})
	] });
}
function Dialog({ children, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			onClick: onClose,
			className: "absolute inset-0 bg-background/40 backdrop-blur-sm transition-opacity duration-200 animate-fade-in"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative w-full max-w-[420px] rounded-xl border border-border/80 bg-background p-1 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.3)] pop-in z-10 overflow-hidden",
			children
		})]
	});
}
//#endregion
export { ApiKeys as component };
