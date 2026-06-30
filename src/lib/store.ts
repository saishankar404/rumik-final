import { useState, useEffect } from "react";

// Simple global workspace store
export type WorkspaceType = "Personal workspace" | "Acme Studio" | "Lab";

const isServer = typeof window === "undefined";

let currentWorkspace: WorkspaceType = (!isServer && typeof localStorage !== "undefined"
  ? (localStorage.getItem("active_workspace") as WorkspaceType)
  : null) || "Personal workspace";
const listeners = new Set<(ws: WorkspaceType) => void>();

export const workspaceStore = {
  getWorkspace() {
    return currentWorkspace;
  },
  setWorkspace(ws: WorkspaceType) {
    currentWorkspace = ws;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("active_workspace", ws);
    }
    listeners.forEach((listener) => listener(ws));
  },
  subscribe(listener: (ws: WorkspaceType) => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }
};

export function useWorkspace() {
  const [ws, setWs] = useState<WorkspaceType>(currentWorkspace);
  
  useEffect(() => {
    return workspaceStore.subscribe((newWs) => {
      setWs(newWs);
    });
  }, []);

  return ws;
}
