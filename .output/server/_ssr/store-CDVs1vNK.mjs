import { a as __toESM } from "../_runtime.mjs";
import { H as require_react } from "../_libs/phosphor-icons__react+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-CDVs1vNK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var currentWorkspace = (!(typeof window === "undefined") && typeof localStorage !== "undefined" ? localStorage.getItem("active_workspace") : null) || "Personal workspace";
var listeners = /* @__PURE__ */ new Set();
var workspaceStore = {
	getWorkspace() {
		return currentWorkspace;
	},
	setWorkspace(ws) {
		currentWorkspace = ws;
		if (typeof localStorage !== "undefined") localStorage.setItem("active_workspace", ws);
		listeners.forEach((listener) => listener(ws));
	},
	subscribe(listener) {
		listeners.add(listener);
		return () => {
			listeners.delete(listener);
		};
	}
};
function useWorkspace() {
	const [ws, setWs] = (0, import_react.useState)(currentWorkspace);
	(0, import_react.useEffect)(() => {
		return workspaceStore.subscribe((newWs) => {
			setWs(newWs);
		});
	}, []);
	return ws;
}
//#endregion
export { workspaceStore as n, useWorkspace as t };
