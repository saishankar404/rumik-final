import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { H as require_react } from "../_libs/phosphor-icons__react+react.mjs";
import { c as Outlet, d as createRootRouteWithContext, f as Link, i as HeadContent, l as lazyRouteComponent, m as useRouter, r as Scripts, s as createRouter, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-VKpoiqPN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CNcCIa8N.css";
function reportLovableError(error, context) {
	console.error("Lovable Error:", error, context);
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Rumik AI — Developer Workspace" },
			{
				name: "description",
				content: "A quiet, focused workspace for building with Rumik voice models."
			},
			{
				property: "og:title",
				content: "Rumik AI — Developer Workspace"
			},
			{
				property: "og:description",
				content: "A quiet, focused workspace for building with Rumik voice models."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$9 = () => import("../_app-BGHGk1o9.mjs");
var Route$9 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("../_app.index-DQahZUL8.mjs");
var Route$8 = createFileRoute("/_app/")({
	head: () => ({ meta: [{ title: "Overview — Rumik AI" }, {
		name: "description",
		content: "Your workspace at a glance: credits, recent activity, and quick actions."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_app.usage-cX_THCMx.mjs");
var Route$7 = createFileRoute("/_app/usage")({
	head: () => ({ meta: [{ title: "Usage — Rumik AI" }, {
		name: "description",
		content: "Generation, request density, and credit burn over time."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("../_app.support-BJ7cdyXl.mjs");
var Route$6 = createFileRoute("/_app/support")({
	head: () => ({ meta: [{ title: "Support — Rumik AI" }, {
		name: "description",
		content: "Talk to the team, browse docs, or join the developer community."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_app.playground-CAEAexAS.mjs");
var Route$5 = createFileRoute("/_app/playground")({
	head: () => ({ meta: [{ title: "Playground — Rumik AI" }, {
		name: "description",
		content: "Compose, tune, and iterate — every generation is saved as an experiment."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_app.models-gRe1ziwf.mjs");
var Route$4 = createFileRoute("/_app/models")({
	head: () => ({ meta: [{ title: "Models — Rumik AI" }, {
		name: "description",
		content: "Pricing, pacing, and steering for every Rumik voice model."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_app.logs-oqqLGrik.mjs");
var Route$3 = createFileRoute("/_app/logs")({
	head: () => ({ meta: [{ title: "Logs — Rumik AI" }, {
		name: "description",
		content: "Inspect every request: tokens, status, and audio output."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_app.docs-BSwQFNRF.mjs");
var Route$2 = createFileRoute("/_app/docs")({
	head: () => ({ meta: [{ title: "Docs — Rumik AI" }, {
		name: "description",
		content: "The Rumik developer guide, inline in your workspace."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_app.billing-FUeD876d.mjs");
var Route$1 = createFileRoute("/_app/billing")({
	head: () => ({ meta: [{ title: "Billing — Rumik AI" }, {
		name: "description",
		content: "Top up credits and review your burn."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_app.api-keys-BWNKgZ8F.mjs");
var Route = createFileRoute("/_app/api-keys")({
	head: () => ({ meta: [{ title: "API keys — Rumik AI" }, {
		name: "description",
		content: "Manage developer tokens, scopes, and rate limits."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var AppRoute = Route$9.update({
	id: "/_app",
	getParentRoute: () => Route$10
});
var AppIndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppUsageRoute = Route$7.update({
	id: "/usage",
	path: "/usage",
	getParentRoute: () => AppRoute
});
var AppSupportRoute = Route$6.update({
	id: "/support",
	path: "/support",
	getParentRoute: () => AppRoute
});
var AppPlaygroundRoute = Route$5.update({
	id: "/playground",
	path: "/playground",
	getParentRoute: () => AppRoute
});
var AppModelsRoute = Route$4.update({
	id: "/models",
	path: "/models",
	getParentRoute: () => AppRoute
});
var AppLogsRoute = Route$3.update({
	id: "/logs",
	path: "/logs",
	getParentRoute: () => AppRoute
});
var AppDocsRoute = Route$2.update({
	id: "/docs",
	path: "/docs",
	getParentRoute: () => AppRoute
});
var AppBillingRoute = Route$1.update({
	id: "/billing",
	path: "/billing",
	getParentRoute: () => AppRoute
});
var AppRouteChildren = {
	AppApiKeysRoute: Route.update({
		id: "/api-keys",
		path: "/api-keys",
		getParentRoute: () => AppRoute
	}),
	AppBillingRoute,
	AppDocsRoute,
	AppLogsRoute,
	AppModelsRoute,
	AppPlaygroundRoute,
	AppSupportRoute,
	AppUsageRoute,
	AppIndexRoute
};
var rootRouteChildren = { AppRoute: AppRoute._addFileChildren(AppRouteChildren) };
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
