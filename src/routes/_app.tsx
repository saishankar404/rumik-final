import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  CaretUpDown,
  MagnifyingGlass,
  Plus,
  Bell,
  Check,
  Building,
  Terminal,
  Key,
  Gear,
  Question,
  X,
  Wallet,
  SquaresFour,
  Waves,
  BookOpen,
  Command,
} from "@phosphor-icons/react";
import { NAV } from "../components/shell/nav";
import { Kbd } from "../components/shell/primitives";
import {
  useWorkspace,
  workspaceStore,
  WorkspaceType,
  useFocusTrap,
} from "../lib/store";

export const Route = createFileRoute("/_app")({
  component: AppShell,
});

function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isPlayground =
    pathname === "/playground" || pathname.startsWith("/playground/");

  // Dialog states
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-[13px] focus:font-medium focus:shadow-lg focus:border focus:border-border"
      >
        Skip to content
      </a>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onSearchClick={() => setCmdOpen(true)} />
        <main
          id="main-content"
          role="main"
          className="relative flex-1 flex flex-col"
        >
          <NoiseOverlay />
          {isPlayground ? (
            <div className="flex-1 min-h-0 flex flex-col animate-page-fade">
              <Outlet />
            </div>
          ) : (
            <div className="mx-auto w-full max-w-[1100px] px-10 pb-24 pt-12 animate-page-fade">
              <Outlet />
            </div>
          )}
        </main>
      </div>

      {/* ── Center Dialog: Command Palette ── */}
      {cmdOpen && (
        <Dialog onClose={() => setCmdOpen(false)} ariaLabel="Command palette">
          <CommandPalette onClose={() => setCmdOpen(false)} />
        </Dialog>
      )}
    </div>
  );
}

function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}

/* ─── Shared Dialog Primitive ─── */
function Dialog({
  children,
  onClose,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClose: () => void;
  ariaLabel?: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, true);

  const capturedRef = useRef(false);
  const previousActiveRef = useRef<HTMLElement | null>(null);
  if (!capturedRef.current) {
    capturedRef.current = true;
    previousActiveRef.current = document.activeElement as HTMLElement | null;
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    return () => previousActiveRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-background/40 backdrop-blur-sm transition-opacity duration-200 animate-fade-in"
      />
      {/* Centered Modal Card */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className="relative w-full max-w-[860px] -translate-y-6 rounded-xl border border-border/80 bg-background p-2 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.3)] pop-in overflow-hidden z-10"
      >
        {children}
      </div>
    </div>
  );
}

/* ─── Sidebar Component ─── */
function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ws = useWorkspace();
  const [wsOpen, setWsOpen] = useState(false);
  const wsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!wsRef.current?.contains(e.target as Node)) setWsOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const workspaces = [
    { name: "Personal workspace", hint: "shred@rumik.ai" },
    { name: "Acme Studio", hint: "team — 4 members" },
    { name: "Lab", hint: "scratchpad" },
  ];

  return (
    <aside
      role="navigation"
      aria-label="Main navigation"
      className="sticky top-0 flex h-screen w-[244px] shrink-0 flex-col bg-[var(--sidebar)] hairline-b border-b-0 border-r"
    >
      <div ref={wsRef} className="relative px-3 pt-3">
        <button
          onClick={() => setWsOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={wsOpen}
          className="flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors hover:bg-[var(--sidebar-accent)]/70 animate-fade-in"
        >
          <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background">
            <span className="font-display text-[12px] font-semibold">
              {ws === "Personal workspace"
                ? "P"
                : ws === "Acme Studio"
                  ? "A"
                  : "L"}
            </span>
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate font-display text-[13.5px] font-semibold">
              Rumik
            </div>
            <div className="truncate text-[11px] text-muted-foreground">
              {ws}
            </div>
          </div>
          <CaretUpDown
            size={14}
            className="text-muted-foreground/75 shrink-0"
          />
        </button>
        {wsOpen ? (
          <div
            role="menu"
            className="absolute left-3 right-3 top-[calc(100%+4px)] z-20 rounded-lg border border-border bg-background p-1.5 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.25)] pop-in"
          >
            <div className="px-2 pb-1.5 pt-1 font-display text-[10.5px] font-medium tracking-tight text-muted-foreground/80">
              Switch workspace
            </div>
            {workspaces.map((w) => {
              const active = w.name === ws;
              return (
                <button
                  key={w.name}
                  role="menuitem"
                  onClick={() => {
                    workspaceStore.setWorkspace(w.name as WorkspaceType);
                    setWsOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-[var(--inset)] active:scale-[0.98]"
                >
                  <span className="grid h-6 w-6 place-items-center rounded bg-[var(--inset)] text-muted-foreground">
                    <Building size={14} />
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[12.5px] text-foreground">
                      {w.name}
                    </span>
                    <span className="block truncate text-[10.5px] text-muted-foreground">
                      {w.hint}
                    </span>
                  </span>
                  {active ? (
                    <Check size={14} className="text-foreground shrink-0" />
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <nav className="mt-2 flex-1 overflow-y-auto px-3 pb-6 fade-mask-y animate-fade-in">
        {NAV.map((group) => (
          <div key={group.label} className="mb-5">
            <div className="px-3 pb-2 pt-3 font-display text-[11px] font-medium tracking-tight text-muted-foreground/70">
              {group.label}
            </div>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.to === "/"
                    ? pathname === "/"
                    : pathname === item.to ||
                      pathname.startsWith(item.to + "/");
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex items-center gap-2.5 rounded-md px-3 py-[7px] text-[13px] transition-all duration-150 ${
                        active
                          ? "bg-[var(--sidebar-accent)] text-foreground"
                          : "text-muted-foreground hover:bg-[var(--sidebar-accent)]/60 hover:text-foreground"
                      }`}
                    >
                      <Icon
                        size={15}
                        className={`transition-colors ${active ? "text-foreground" : "text-muted-foreground/75 group-hover:text-foreground"}`}
                      />
                      <span className="flex-1 truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="hairline-t mx-3 mb-3 mt-1 flex items-center gap-2.5 rounded-md border-0 px-2 py-2.5">
        <div className="grid h-7 w-7 place-items-center rounded-full bg-foreground/90 text-[11px] font-semibold text-background">
          S
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate text-[12.5px] font-medium">Shred</div>
          <div className="truncate text-[11px] text-muted-foreground">
            shred@rumik.ai
          </div>
        </div>
        <span className="rounded-full bg-[var(--success-soft)] px-1.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[var(--success)]">
          Pro
        </span>
      </div>
    </aside>
  );
}

/* ─── Topbar Component ─── */
function Topbar({ onSearchClick }: { onSearchClick: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [notifOpen, setNotifOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement | null>(null);

  // Close notifications on click outside
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onSearchClick();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSearchClick]);

  const crumb =
    NAV.flatMap((g) => g.items).find((i) =>
      i.to === "/" ? pathname === "/" : pathname.startsWith(i.to),
    )?.label ?? "Overview";

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-3 bg-background/80 px-8 backdrop-blur-md hairline-b">
      <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
        <span>Rumik</span>
        <span className="text-border">/</span>
        <span className="font-display text-foreground">{crumb}</span>
      </div>

      {/* Interactive search bar trigger */}
      <button
        onClick={onSearchClick}
        aria-label="Search and navigate"
        aria-haspopup="dialog"
        className="ml-6 flex h-8 items-center gap-2 rounded-md px-2.5 text-[12.5px] text-muted-foreground bg-[var(--inset)] hover:bg-[var(--inset)]/75 transition-colors text-left w-[280px] active:scale-[0.99]"
      >
        <MagnifyingGlass
          size={14}
          className="text-muted-foreground/60 shrink-0"
        />
        <span className="flex-1 text-muted-foreground/60">
          Search models, logs, keys…
        </span>
        <span className="flex shrink-0 items-center gap-1">
          <Kbd>
            <Command className="h-2.5 w-2.5" />
          </Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>

      <div className="ml-auto flex items-center gap-1.5">
        {/* Local notifications popover container */}
        <div ref={bellRef} className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label="Notifications"
            aria-haspopup="true"
            aria-expanded={notifOpen}
            className={`grid h-8 w-8 place-items-center rounded-md transition-colors active:scale-[0.96] ${
              notifOpen
                ? "bg-[var(--inset)] text-foreground"
                : "text-muted-foreground hover:bg-[var(--inset)] hover:text-foreground"
            }`}
          >
            <Bell size={15} />
          </button>

          {/* Local Popover Panel */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 z-40 w-80 rounded-lg border border-border bg-background p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.16)] pop-in">
              <NotificationPanel onClose={() => setNotifOpen(false)} />
            </div>
          )}
        </div>

        <div className="mx-2 h-5 w-px bg-border" />
        <div className="flex items-center gap-2 rounded-md bg-[var(--inset)] px-2.5 py-1 select-none pointer-events-none">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
          <span className="font-display text-[12px] font-medium tabular-nums">
            1,024
          </span>
          <span className="text-[11.5px] text-muted-foreground">credits</span>
        </div>
      </div>
    </header>
  );
}

/* ─── Command Palette Dialog Content ─── */
function CommandPalette({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!listRef.current) return;
    const options =
      listRef.current.querySelectorAll<HTMLElement>('[role="option"]');
    options[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const items = [
    {
      label: "Overview dashboard",
      icon: SquaresFour,
      action: () => navigate({ to: "/" }),
    },
    {
      label: "Synthesize voice playground",
      icon: Waves,
      action: () => navigate({ to: "/playground" }),
    },
    {
      label: "API configuration keys",
      icon: Key,
      action: () => navigate({ to: "/api-keys" }),
    },
    {
      label: "Top up credit balance",
      icon: Wallet,
      action: () => navigate({ to: "/billing" }),
    },
    {
      label: "Models configuration catalog",
      icon: Gear,
      action: () => navigate({ to: "/models" }),
    },
    {
      label: "API documentation",
      icon: BookOpen,
      action: () => navigate({ to: "/docs" }),
    },
  ];

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIndex]) {
        filtered[activeIndex].action();
        onClose();
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/40">
        <MagnifyingGlass
          size={18}
          className="text-muted-foreground/60 shrink-0"
        />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search commands"
          placeholder="Where would you like to go?"
          className="flex-1 bg-transparent text-[16px] outline-none placeholder:text-muted-foreground/40"
        />
        <button
          onClick={onClose}
          className="rounded p-1 text-muted-foreground/60 hover:bg-[var(--inset)] hover:text-foreground"
        >
          <X size={15} />
        </button>
      </div>
      <div
        ref={listRef}
        role="listbox"
        aria-label="Navigation results"
        className="p-1.5 max-h-[420px] overflow-y-auto"
      >
        {filtered.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              role="option"
              aria-selected={idx === activeIndex}
              onClick={() => {
                item.action();
                onClose();
              }}
              className={`flex w-full items-center gap-3.5 rounded-lg px-4 py-3 text-left text-[15px] transition-colors duration-75 active:scale-[0.99] ${
                idx === activeIndex
                  ? "bg-[var(--inset)]"
                  : "hover:bg-[var(--inset)]"
              }`}
            >
              <Icon size={17} className="text-muted-foreground/60 shrink-0" />
              <span className="flex-1 text-foreground/90">{item.label}</span>
              <span className="text-[11px] text-muted-foreground/40 font-mono">
                ⏎ Go
              </span>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-[14px] text-muted-foreground/60 font-display">
            No results found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Notification Panel Content ─── */
function NotificationPanel({ onClose }: { onClose: () => void }) {
  const notifs = [
    {
      title: "Credit balance notice",
      body: "Your balance is below 1,500 credits. Top up to ensure continuous API key delivery.",
      date: "Today",
    },
    {
      title: "Silk Mulberry v1.5 live",
      body: "Expressive Indian voices have been updated with 20% lower latency.",
      date: "Yesterday",
    },
    {
      title: "Workspace update",
      body: "Acme Studio workspace invite accepted by Shred.",
      date: "3d ago",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40">
        <span className="font-display text-[13px] font-semibold text-foreground">
          Workspace notifications
        </span>
        <button
          onClick={onClose}
          aria-label="Close"
          className="rounded p-0.5 text-muted-foreground/60 hover:bg-[var(--inset)] hover:text-foreground"
        >
          <X size={13} />
        </button>
      </div>
      <div className="p-0.5 space-y-0.5 max-h-[260px] overflow-y-auto">
        {notifs.map((n, idx) => (
          <div
            key={idx}
            className="p-2.5 hover:bg-[var(--inset)] rounded-md transition-colors duration-75"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-[12.5px] font-semibold text-foreground">
                {n.title}
              </span>
              <span className="text-[10px] text-muted-foreground/50 shrink-0">
                {n.date}
              </span>
            </div>
            <p className="mt-0.5 text-[11.5px] text-muted-foreground leading-normal">
              {n.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
