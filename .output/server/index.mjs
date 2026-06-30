globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/ArrowUpRight.es-VStSMP3f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5ef-hfsUx3e33LyH8McxnflBcl+XPyA\"",
		"mtime": "2026-06-30T13:42:01.833Z",
		"size": 1519,
		"path": "../public/assets/ArrowUpRight.es-VStSMP3f.js"
	},
	"/assets/BookOpen.es-C1ugwD2N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a33-jdUg5Tr0OlcQKv3Pv/D8ZLrvSRU\"",
		"mtime": "2026-06-30T13:42:01.833Z",
		"size": 2611,
		"path": "../public/assets/BookOpen.es-C1ugwD2N.js"
	},
	"/assets/Check.es-Dw2JjKG0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"626-m8+EmaGCQVTLbfUJXqzXM0ee9nc\"",
		"mtime": "2026-06-30T13:42:01.833Z",
		"size": 1574,
		"path": "../public/assets/Check.es-Dw2JjKG0.js"
	},
	"/assets/IconBase.es-DANvpl50.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"252-rbAWrTMiv0MYXWoVEwIVVdWq9Ek\"",
		"mtime": "2026-06-30T13:42:01.833Z",
		"size": 594,
		"path": "../public/assets/IconBase.es-DANvpl50.js"
	},
	"/assets/Key.es-CsR3iqxi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc3-wrMqCveOntSpCfjlPF4FgIQoCPI\"",
		"mtime": "2026-06-30T13:42:01.833Z",
		"size": 4035,
		"path": "../public/assets/Key.es-CsR3iqxi.js"
	},
	"/assets/Play.es-C-4HmVDt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"119c-tr8vL246AM2W2dfm2J6U5QSxfcg\"",
		"mtime": "2026-06-30T13:42:01.833Z",
		"size": 4508,
		"path": "../public/assets/Play.es-C-4HmVDt.js"
	},
	"/assets/Wallet.es-DEg2gINF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc4-5dp6V0nAzk3h8gVGv8SS/KjKHEA\"",
		"mtime": "2026-06-30T13:42:01.834Z",
		"size": 4036,
		"path": "../public/assets/Wallet.es-DEg2gINF.js"
	},
	"/assets/X.es-Dl9dwvIE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7ae-qXu2Ytc/mJoGki9euZd3OtCafP8\"",
		"mtime": "2026-06-30T13:42:01.834Z",
		"size": 1966,
		"path": "../public/assets/X.es-Dl9dwvIE.js"
	},
	"/assets/_app-DCnf-U3P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"def3-URs+OdAbrfwGX5Y5Nm4l9Sh7TRo\"",
		"mtime": "2026-06-30T13:42:01.834Z",
		"size": 57075,
		"path": "../public/assets/_app-DCnf-U3P.js"
	},
	"/assets/MagnifyingGlass.es-HIfSOWCW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"684-/sEIFlyxrkhIGqI6TTcqNkyI4/s\"",
		"mtime": "2026-06-30T13:42:01.833Z",
		"size": 1668,
		"path": "../public/assets/MagnifyingGlass.es-HIfSOWCW.js"
	},
	"/assets/_app.billing-BIwgTwsS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec0-Qs7Ar6hVOFgul7aOyppcNEKWEYU\"",
		"mtime": "2026-06-30T13:42:01.835Z",
		"size": 3776,
		"path": "../public/assets/_app.billing-BIwgTwsS.js"
	},
	"/assets/_app.api-keys-DOwUHPYR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f74-Q6NY7Ibr3B/pPt/py6nKN9z3gXk\"",
		"mtime": "2026-06-30T13:42:01.835Z",
		"size": 16244,
		"path": "../public/assets/_app.api-keys-DOwUHPYR.js"
	},
	"/assets/_app.docs-Dh14_wRu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa3-VYl16mRfbElGlRWHRtJxe7uUqmE\"",
		"mtime": "2026-06-30T13:42:01.835Z",
		"size": 2723,
		"path": "../public/assets/_app.docs-Dh14_wRu.js"
	},
	"/assets/_app.index-6DpPqCYE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2321-u3VjdvE1mRCBB89JkRlwbQpHbKY\"",
		"mtime": "2026-06-30T13:42:01.835Z",
		"size": 8993,
		"path": "../public/assets/_app.index-6DpPqCYE.js"
	},
	"/assets/_app.models-D8V23864.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2171-xaXDAVnrTvJqMOWcyZf86a1Fb2U\"",
		"mtime": "2026-06-30T13:42:01.836Z",
		"size": 8561,
		"path": "../public/assets/_app.models-D8V23864.js"
	},
	"/assets/_app.support-BpLV7L4I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1559-hVsKexotpATWqmxg1j8KILgB6oc\"",
		"mtime": "2026-06-30T13:42:01.836Z",
		"size": 5465,
		"path": "../public/assets/_app.support-BpLV7L4I.js"
	},
	"/assets/_app.usage-UPkHJ0a2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4731-LP+LZUoDxJ+TIAoIDoBkE1wVR8g\"",
		"mtime": "2026-06-30T13:42:01.837Z",
		"size": 18225,
		"path": "../public/assets/_app.usage-UPkHJ0a2.js"
	},
	"/assets/primitives-jAGSONXD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc0-nu+P2/zPhl1WB/d41HKKerCsxDA\"",
		"mtime": "2026-06-30T13:42:01.837Z",
		"size": 3008,
		"path": "../public/assets/primitives-jAGSONXD.js"
	},
	"/assets/_app.logs-DOyT-z8U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3294-SPODrqgJ4ug127Td+/onpDTmR7Y\"",
		"mtime": "2026-06-30T13:42:01.836Z",
		"size": 12948,
		"path": "../public/assets/_app.logs-DOyT-z8U.js"
	},
	"/assets/react-Ca03aNmg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"209c-USFuEbwY5iMmvZ/V4vj+KOHLghg\"",
		"mtime": "2026-06-30T13:42:01.837Z",
		"size": 8348,
		"path": "../public/assets/react-Ca03aNmg.js"
	},
	"/assets/store-ymgo35PX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-iCsqUs0v5lyzarAUxq2EIeyWQeI\"",
		"mtime": "2026-06-30T13:42:01.837Z",
		"size": 487,
		"path": "../public/assets/store-ymgo35PX.js"
	},
	"/assets/_app.playground-QrOUUuqk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3562f-P4H4CVNuVQLf0NL2juZeknSdQyw\"",
		"mtime": "2026-06-30T13:42:01.836Z",
		"size": 218671,
		"path": "../public/assets/_app.playground-QrOUUuqk.js"
	},
	"/assets/styles-CNcCIa8N.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"edaf-CWIkF96yuzhL3Bwq6KcplcD++2o\"",
		"mtime": "2026-06-30T13:42:01.838Z",
		"size": 60847,
		"path": "../public/assets/styles-CNcCIa8N.css"
	},
	"/assets/index-Bfr55quP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"52c18-1ncoWRohg05gwdHN4frbMqX9qZs\"",
		"mtime": "2026-06-30T13:42:01.832Z",
		"size": 338968,
		"path": "../public/assets/index-Bfr55quP.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_chokidar@5.0.0_jiti@1.21.7_vite@8.1.0_@types+node@22.20.0_jiti@1.21.7_/node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_oBmjJG = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_oBmjJG
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_chokidar@5.0.0_jiti@1.21.7_vite@8.1.0_@types+node@22.20.0_jiti@1.21.7_/node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_chokidar@5.0.0_jiti@1.21.7_vite@8.1.0_@types+node@22.20.0_jiti@1.21.7_/node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_chokidar@5.0.0_jiti@1.21.7_vite@8.1.0_@types+node@22.20.0_jiti@1.21.7_/node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_chokidar@5.0.0_jiti@1.21.7_vite@8.1.0_@types+node@22.20.0_jiti@1.21.7_/node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
