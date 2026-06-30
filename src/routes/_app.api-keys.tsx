import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Plus, DotsThreeOutline, WarningCircle, Copy, X, Key } from "@phosphor-icons/react";
import { PageHeader, Section } from "../components/shell/primitives";
import { useWorkspace } from "../lib/store";

export const Route = createFileRoute("/_app/api-keys")({
  head: () => ({
    meta: [
      { title: "API keys — Rumik AI" },
      { name: "description", content: "Manage developer tokens, scopes, and rate limits." },
    ],
  }),
  component: ApiKeys,
});

interface ApiKeyItem {
  name: string;
  prefix: string;
  scopes: string[];
  rate: string;
  last: string;
  expires: string;
  status: "active" | "expired";
  date: string;
}

// Dynamic mock data matching workspace state
const WORKSPACE_KEYS: Record<string, ApiKeyItem[]> = {
  "Personal workspace": [
    { name: "prod-key-01", prefix: "rk_live_9a8B7c6D", scopes: ["tts", "tts:stream"], rate: "120 / min", last: "3m ago", expires: "Never", status: "active", date: "Created Jun 15, 2026" },
    { name: "dev-key-02", prefix: "rk_test_5e4F3g2H", scopes: ["tts", "tts:stream"], rate: "60 / min", last: "5m ago", expires: "Never", status: "active", date: "Created Jun 20, 2026" },
    { name: "legacy-integration", prefix: "rk_live_8z9Y0x1W", scopes: ["tts"], rate: "60 / min", last: "Never", expires: "Expired", status: "expired", date: "Created Mar 10, 2026" },
  ],
  "Acme Studio": [
    { name: "acme-live-api", prefix: "rk_live_3v8K2m1L", scopes: ["tts", "tts:stream"], rate: "500 / min", last: "Just now", expires: "Never", status: "active", date: "Created Jan 12, 2026" },
    { name: "staging-webhook", prefix: "rk_test_9p4X5c8Y", scopes: ["tts"], rate: "100 / min", last: "12h ago", expires: "Never", status: "active", date: "Created Feb 18, 2026" },
  ],
  "Lab": [
    { name: "scratchpad-temp", prefix: "rk_test_0a9B8c7D", scopes: ["tts"], rate: "10 / min", last: "2d ago", expires: "Jul 10, 2026", status: "active", date: "Created Jun 28, 2026" },
  ]
};

const SEED_KEYS: ApiKeyItem[] = WORKSPACE_KEYS["Personal workspace"];

function ApiKeys() {
  const ws = useWorkspace();
  const keys = WORKSPACE_KEYS[ws] || SEED_KEYS;

  const [createOpen, setCreateOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyScope, setNewKeyScope] = useState("tts");

  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [activeKeyMenu, setActiveKeyMenu] = useState<string | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleOutsideClick() {
      setActiveKeyMenu(null);
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleCopy = (name: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 1000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const newKey: ApiKeyItem = {
      name: newKeyName.trim(),
      prefix: `rk_live_${Math.random().toString(36).substring(2, 10)}`,
      scopes: [newKeyScope],
      rate: "100 / min",
      last: "Never",
      expires: "Never",
      status: "active",
      date: `Created today`
    };

    // Inject into mock data store
    if (WORKSPACE_KEYS[ws]) {
      WORKSPACE_KEYS[ws] = [newKey, ...WORKSPACE_KEYS[ws]];
    }
    setNewKeyName("");
    setCreateOpen(false);
  };

  return (
    <>
      <PageHeader
        eyebrow="Develop"
        title="API keys"
        subtitle="Active developer credentials. Keys are shown once at creation — store them securely."
        actions={
          <button 
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 rounded-md bg-foreground px-3.5 py-2 text-[13px] font-medium text-background hover:bg-foreground/90 active:scale-[0.96] transition-transform duration-100 animate-fade-in"
          >
            <Plus size={14} weight="bold" />
            New key
          </button>
        }
      />

      <div className="mb-8 flex items-start gap-3 rounded-md bg-[var(--inset)] px-4 py-3 animate-fade-in">
        <WarningCircle className="mt-0.5" size={16} />
        <div className="text-[12.5px] text-muted-foreground">
          All models share <span className="font-mono text-foreground">20</span> concurrent requests per account.
          <a className="ml-1.5 text-foreground underline-offset-4 hover:underline" href="#">Contact us</a> for more.
        </div>
      </div>

      <Section title={`Keys for ${ws}`}>
        <div className="-mx-3">
          <div className="grid grid-cols-[1.2fr_1.3fr_1.2fr_0.8fr_0.8fr_0.7fr_auto] gap-6 px-3 pb-3 eyebrow-label">
            <span>Name</span><span>Prefix</span><span>Scopes</span><span>Rate limit</span><span>Last used</span><span>Status</span><span />
          </div>
          {keys.map((k: ApiKeyItem) => {
            const isExpired = k.status === "expired";
            const isMenuOpen = activeKeyMenu === k.name;
            return (
              <div 
                key={k.name} 
                className={`group grid grid-cols-[1.2fr_1.3fr_1.2fr_0.8fr_0.8fr_0.7fr_auto] items-center gap-6 rounded-md px-3 py-3.5 hairline-t row-hover animate-fade-in ${
                  isMenuOpen ? "relative z-20 bg-[var(--inset)]/20" : ""
                }`}
              >
                <div>
                  <div className="font-display text-[13.5px] font-medium text-foreground">{k.name}</div>
                  <div className="text-[11.5px] text-muted-foreground">{k.date}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <code className="font-mono text-[12.5px] text-foreground/80">{k.prefix}…</code>
                  <button 
                    onClick={() => handleCopy(k.name, `${k.prefix}12345678`)}
                    title="Copy prefix" 
                    className="flex items-center justify-center rounded px-1.5 py-0.5 text-[11px] text-muted-foreground hover:bg-[var(--inset)] hover:text-foreground active:scale-[0.96] duration-100 transition-all"
                  >
                    {copiedName === k.name ? "Copied!" : <Copy size={13} />}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {k.scopes.map((s: string) => (
                    <span key={s} className="rounded bg-[var(--inset)] px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">{s}</span>
                  ))}
                </div>
                <span className="font-display text-[12.5px] tabular-nums text-muted-foreground">{k.rate}</span>
                <span className="text-[12.5px] text-muted-foreground">{k.last}</span>
                <div className="flex items-center gap-1.5">
                  <span className="grid h-2 w-2 place-items-center">
                    <span className={`h-1.5 w-1.5 rounded-full ${isExpired ? "bg-red-400" : "bg-[var(--success)]"}`} />
                  </span>
                  <span className="text-[12.5px] text-foreground/85 capitalize">{k.status}</span>
                </div>
                <div className="relative">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveKeyMenu(activeKeyMenu === k.name ? null : k.name);
                    }}
                    className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[var(--inset)] hover:text-foreground active:scale-[0.95]"
                  >
                    <DotsThreeOutline size={14} />
                  </button>
                  {activeKeyMenu === k.name && (
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 mt-1 z-30 w-36 rounded-lg border border-border bg-background p-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] pop-in"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          handleCopy(k.name, `${k.prefix}12345678`);
                          setActiveKeyMenu(null);
                        }}
                        className="flex w-full items-center px-2 py-1.5 text-left text-[12px] hover:bg-[var(--inset)] rounded font-display font-medium"
                      >
                        Copy key token
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (WORKSPACE_KEYS[ws]) {
                            WORKSPACE_KEYS[ws] = WORKSPACE_KEYS[ws].map((keyItem) => 
                              keyItem.name === k.name ? { ...keyItem, status: "expired" } : keyItem
                            );
                          }
                          setActiveKeyMenu(null);
                        }}
                        className="flex w-full items-center px-2 py-1.5 text-left text-[12px] text-red-500 hover:bg-red-500/10 rounded font-display font-medium"
                      >
                        Revoke key
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── Dialog Overlay: New Key Panel ── */}
      {createOpen && (
        <Dialog onClose={() => setCreateOpen(false)}>
          <form onSubmit={handleCreate} className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <Key size={16} />
                <span className="font-display text-[14px] font-semibold text-foreground">Create API Key</span>
              </div>
              <button 
                type="button" 
                onClick={() => setCreateOpen(false)}
                className="rounded p-1 text-muted-foreground/60 hover:bg-[var(--inset)] hover:text-foreground"
              >
                <X size={14} />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-foreground">Key name</label>
                <input
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g. production-client-app"
                  required
                  className="w-full rounded-md border border-border px-3 py-2 text-[13.5px] outline-none focus:border-foreground/30 bg-transparent font-display font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-foreground">Scopes</label>
                <select
                  value={newKeyScope}
                  onChange={(e) => setNewKeyScope(e.target.value)}
                  className="w-full rounded-md border border-border px-3 py-2 text-[13.5px] outline-none focus:border-foreground/30 bg-background font-display font-medium"
                >
                  <option value="tts">tts (Read synthesis only)</option>
                  <option value="tts:stream">tts:stream (Low latency streaming)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border/40 bg-[var(--inset)]/20">
              <button
                type="button"
                onClick={() => setCreateOpen(false)}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-[12.5px] font-medium text-foreground hover:bg-[var(--inset)] active:scale-[0.96] transition-transform duration-75"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-foreground px-3 py-1.5 text-[12.5px] font-medium text-background hover:bg-foreground/90 active:scale-[0.96] transition-transform duration-75"
              >
                Create key
              </button>
            </div>
          </form>
        </Dialog>
      )}
    </>
  );
}

/* ─── Local Dialog wrapper inside route file ─── */
function Dialog({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-background/40 backdrop-blur-sm transition-opacity duration-200 animate-fade-in" />
      <div className="relative w-full max-w-[420px] rounded-xl border border-border/80 bg-background p-1 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.3)] pop-in z-10 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
