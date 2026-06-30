import { useState, useEffect } from "react";

// Simple global workspace store
export type WorkspaceType = "Personal workspace" | "Acme Studio" | "Lab";

const isServer = typeof window === "undefined";

let currentWorkspace: WorkspaceType =
  (!isServer && typeof localStorage !== "undefined"
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
  },
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

export function useMockResource<T>(
  data: T,
  delayMs?: number,
): { data: T | null; isLoading: boolean } {
  const [result, setResult] = useState<{ data: T | null; isLoading: boolean }>({
    data: null,
    isLoading: true,
  });
  useEffect(() => {
    const delay = delayMs ?? 600 + Math.floor(Math.random() * 300);
    const timer = setTimeout(() => {
      setResult({ data, isLoading: false });
    }, delay);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return result;
}

export function useFocusTrap(
  ref: React.RefObject<HTMLElement | null>,
  active: boolean,
) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const el = ref.current;
    const selector =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getTabbable = () =>
      Array.from(el.querySelectorAll<HTMLElement>(selector));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const tabbable = getTabbable();
      if (tabbable.length === 0) return;
      const first = tabbable[0];
      const last = tabbable[tabbable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    el.addEventListener("keydown", handleKeyDown);
    // Focus first element on mount
    const tabbable = getTabbable();
    if (tabbable.length > 0) tabbable[0].focus();

    return () => el.removeEventListener("keydown", handleKeyDown);
  }, [ref, active]);
}
