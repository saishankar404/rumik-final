import { n as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { a as StatusPill, n as PageHeader, r as Section } from "./_ssr/primitives-MhefxCVw.mjs";
import { t as useWorkspace } from "./_ssr/store-CDVs1vNK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.billing-FUeD876d.js
var import_jsx_runtime = require_jsx_runtime();
var WORKSPACE_BILLING = {
	"Personal workspace": {
		balance: "1,024",
		burned: "185",
		requests: "849",
		invoices: [
			{
				id: "INV-2026-003",
				date: "Jun 15, 2026",
				amount: "₹5,000",
				credits: "5,000",
				status: "succeeded"
			},
			{
				id: "INV-2026-002",
				date: "May 10, 2026",
				amount: "₹10,000",
				credits: "11,500",
				status: "succeeded"
			},
			{
				id: "INV-2026-001",
				date: "Apr 02, 2026",
				amount: "₹1,000",
				credits: "1,000",
				status: "succeeded"
			}
		]
	},
	"Acme Studio": {
		balance: "14,850",
		burned: "4,120",
		requests: "3,412",
		invoices: [{
			id: "INV-2026-104",
			date: "Jun 20, 2026",
			amount: "₹10,000",
			credits: "11,500",
			status: "succeeded"
		}, {
			id: "INV-2026-103",
			date: "Jun 01, 2026",
			amount: "₹10,000",
			credits: "11,500",
			status: "succeeded"
		}]
	},
	Lab: {
		balance: "500",
		burned: "15",
		requests: "42",
		invoices: [{
			id: "INV-2026-201",
			date: "Jun 28, 2026",
			amount: "₹1,000",
			credits: "1,000",
			status: "succeeded"
		}]
	}
};
function Billing() {
	const billData = WORKSPACE_BILLING[useWorkspace()] || WORKSPACE_BILLING["Personal workspace"];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Account",
			title: "Billing",
			subtitle: "Credits never expire. Charges are processed in INR by Razorpay."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 hairline-b border-t animate-fade-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-6 py-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "eyebrow-label",
							children: "Credit balance"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-[40px] font-medium leading-none tracking-[-0.03em] tabular-nums",
								children: billData.balance
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[13px] text-muted-foreground",
								children: "credits"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-[11.5px] text-muted-foreground",
							children: "Never expires"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-l border-border px-6 py-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "eyebrow-label",
							children: "Burn — 30d"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 font-display text-[28px] tracking-[-0.02em] tabular-nums",
							children: billData.burned
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-[11.5px] text-muted-foreground",
							children: "credits used"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-l border-border px-6 py-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "eyebrow-label",
							children: "Requests — 30d"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 font-display text-[28px] tracking-[-0.02em] tabular-nums",
							children: billData.requests
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-[11.5px] text-muted-foreground",
							children: "across active keys"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Payment history",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "-mx-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[1.2fr_1.5fr_1.2fr_1.2fr_auto] gap-6 px-3 pb-3 eyebrow-label",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Invoice ID" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Billing Date" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Amount Paid" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Credits Added" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Status" })
					]
				}), billData.invoices.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[1.2fr_1.5fr_1.2fr_1.2fr_auto] items-center gap-6 px-3 py-4 hairline-t text-[13px] animate-fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[12px] text-foreground",
							children: inv.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: inv.date
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display tabular-nums text-foreground",
							children: inv.amount
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display tabular-nums text-muted-foreground",
							children: [inv.credits, " credits"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							tone: "success",
							dot: true,
							children: "Succeeded"
						}) })
					]
				}, inv.id))]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 text-[11.5px] leading-relaxed text-muted-foreground",
			children: "Payments are processed by Razorpay. We never store card or UPI details. If a charge succeeded but credits didn't appear, refresh this page."
		})
	] });
}
//#endregion
export { Billing as component };
