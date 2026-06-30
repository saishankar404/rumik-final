# Shell Polish: Skeletons, Empty States, Responsive, A11y, Command Bar

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add skeleton loading, empty states, responsive layout, full accessibility, and an agentic command bar to all 9 routes and the shell.

**Architecture:** Foundation-first approach — CSS/primitives/hooks first, then shell a11y, then per-route changes (skeletons + a11y + responsive together), then the command bar, then a final polish pass. All changes use the existing oklch/Figtree/Poppins design token system.

**Tech Stack:** TanStack Start, React 19, Tailwind CSS v4, framer-motion, Phosphor Icons, TypeScript

## Global Constraints

- No new dependencies (framer-motion already installed, clsx + tailwind-merge already installed)
- All colors use existing oklch CSS variables (`--foreground`, `--muted-foreground`, `--inset`, `--border`, `--ring`, `--success`)
- All fonts use existing `font-display` (Figtree), `font-sans` (Poppins), `font-mono` (JetBrains Mono)
- All animations must respect `prefers-reduced-motion: reduce`
- All interactive elements must have `:focus-visible` ring using `--ring` token
- All icon-only buttons must have `aria-label`
- Verification after each task: `npx tsc --noEmit && npx vite build`
- No test framework exists — verification is typecheck + build + manual browser check

---

## Task 1: CSS Foundation

**Files:**

- Modify: `src/styles.css`

**Produces:** Fixed `pop-in` utility, `shimmer` keyframe, `prefers-reduced-motion` block, improved fade masks, global `:focus-visible` ring, `.sr-only` confirmation

- [ ] **Step 1: Fix pop-in collision**

Find the duplicate `.pop-in` plain class (uses `pop-in-new` keyframe at 160ms) and remove it. Keep the `@utility pop-in` definition (uses `pop-in` keyframe at 140ms). Also remove the `pop-in-new` keyframe if it's only used by the deleted class.

- [ ] **Step 2: Add shimmer keyframe**

Add to the `@keyframes` section:

```css
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
```

Add the utility:

```css
@utility shimmer {
  background: linear-gradient(
    90deg,
    var(--inset) 0%,
    color-mix(in oklab, var(--inset) 60%, var(--background)) 50%,
    var(--inset) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

- [ ] **Step 3: Add prefers-reduced-motion**

Add at the end of the file:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 4: Improve fade masks**

Update the existing fade mask utilities to use softer falloff:

```css
@utility fade-mask-b {
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}

@utility fade-mask-y {
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
}

@utility fade-mask-r {
  mask-image: linear-gradient(to right, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, black 80%, transparent 100%);
}
```

- [ ] **Step 5: Add global focus-visible ring**

In `@layer base`, add:

```css
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Remove default outline only when focus-visible is NOT matched */
:focus:not(:focus-visible) {
  outline: none;
}
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds with no errors.

---

## Task 2: Skeleton + EmptyState Primitives

**Files:**

- Modify: `src/components/shell/primitives.tsx`

**Consumes:** `shimmer` utility from Task 1
**Produces:** `Skeleton`, `SkeletonText`, `SkeletonRow`, `SkeletonCard`, `EmptyState` components

- [ ] **Step 1: Add Skeleton component**

Add to `primitives.tsx`:

```tsx
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`shimmer rounded-md ${className}`} />;
}
```

- [ ] **Step 2: Add SkeletonText component**

```tsx
export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  const widths = ["w-full", "w-4/5", "w-3/5", "w-2/3", "w-1/2"];
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-3.5 ${widths[i % widths.length]}`} />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Add SkeletonRow component**

```tsx
export function SkeletonRow({
  cols = 5,
  className = "",
}: {
  cols?: number;
  className?: string;
}) {
  return (
    <div
      className={`grid items-center gap-6 px-3 py-4 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-4" />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Add SkeletonCard component**

```tsx
export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}
```

- [ ] **Step 5: Add EmptyState component**

```tsx
import type { Icon } from "@phosphor-icons/react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}: {
  icon?: Icon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 text-center ${className}`}
    >
      {Icon && (
        <Icon
          className="mb-4 h-8 w-8 text-muted-foreground/30"
          weight="thin"
          aria-hidden="true"
        />
      )}
      <p className="text-[14px] font-medium text-foreground/80">{title}</p>
      {description && (
        <p className="mt-1 text-[13px] text-muted-foreground/60 max-w-[320px]">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
```

- [ ] **Step 6: Add aria-hidden to existing Waveform primitive**

Find the `Waveform` component and add `aria-hidden="true"` to the container div.

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds.

---

## Task 3: useMockResource + useFocusTrap Hooks

**Files:**

- Modify: `src/lib/store.ts`

**Produces:** `useMockResource<T>()` hook, `useFocusTrap(ref)` hook

- [ ] **Step 1: Add useMockResource hook**

Add to `src/lib/store.ts`:

```ts
import { useState, useEffect } from "react";

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
```

- [ ] **Step 2: Add useFocusTrap hook**

```ts
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
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds.

---

## Task 4: Shell Accessibility — Landmarks + Nav ARIA

**Files:**

- Modify: `src/routes/_app.tsx`

**Consumes:** `useFocusTrap` from Task 3
**Produces:** Skip link, main landmark, nav ARIA, workspace switcher ARIA, icon button labels

- [ ] **Step 1: Add skip-to-content link**

At the top of the `AppShell` return, before `<Sidebar>`:

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-[13px] focus:font-medium focus:shadow-lg focus:border focus:border-border"
>
  Skip to content
</a>
```

- [ ] **Step 2: Add main landmark**

Find the `<main>` or content area and add `id="main-content"` and `role="main"`.

- [ ] **Step 3: Add nav ARIA to sidebar**

On the sidebar `<aside>`, add `role="navigation" aria-label="Main navigation"`.

On each active `<Link>`, add `aria-current="page"` when the link is active.

- [ ] **Step 4: Add workspace switcher ARIA**

On the workspace switcher trigger button, add:

```tsx
aria-haspopup="menu"
aria-expanded={wsOpen}
```

On the popover div, add `role="menu"`.
On each workspace option button, add `role="menuitem"`.

- [ ] **Step 5: Add aria-labels to icon-only buttons**

- Notification bell button: `aria-label="Notifications" aria-haspopup="true" aria-expanded={notifOpen}`
- Search trigger button: `aria-label="Search and navigate" aria-haspopup="dialog"`
- Command palette close button: `aria-label="Close command palette"`
- Dialog close (X) buttons anywhere: `aria-label="Close"`

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds.

---

## Task 5: Command Palette Accessibility

**Files:**

- Modify: `src/routes/_app.tsx`

**Consumes:** `useFocusTrap` from Task 3
**Produces:** Full a11y command palette with arrow-key nav, focus trap, focus restoration

- [ ] **Step 1: Add dialog ARIA**

On the `Dialog` component's modal div, add:

```tsx
role="dialog"
aria-modal="true"
```

When used for command palette, add `aria-label="Command palette"`.

- [ ] **Step 2: Add focus trap to Dialog**

Import `useFocusTrap` and apply it to the dialog modal ref:

```tsx
const modalRef = useRef<HTMLDivElement>(null);
useFocusTrap(modalRef, true);
```

- [ ] **Step 3: Add focus restoration**

In the `Dialog` component, store the previously focused element and restore on close:

```tsx
useEffect(() => {
  const previouslyFocused = document.activeElement as HTMLElement;
  return () => previouslyFocused?.focus();
}, []);
```

- [ ] **Step 4: Add command palette listbox ARIA**

On the results container, add `role="listbox" aria-label="Navigation results"`.
On each result button, add `role="option" aria-selected={idx === activeIndex}`.

- [ ] **Step 5: Add arrow-key navigation**

In `CommandPalette`, add `activeIndex` state. Add keyboard handler:

```tsx
const [activeIndex, setActiveIndex] = useState(0);

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
```

Attach `onKeyDown={handleKeyDown}` to the input or the container. Reset `activeIndex` to 0 when `query` changes.

- [ ] **Step 6: Add aria-label to search input**

```tsx
aria-label="Search commands"
```

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds. Open command palette with ⌘K, verify arrow keys move selection, Enter navigates, Escape closes and restores focus to the search trigger.

---

## Task 6: Overview Route — Skeletons, Empty State, Responsive, A11y

**Files:**

- Modify: `src/routes/_app.index.tsx`

**Consumes:** `useMockResource` from Task 3, `Skeleton`, `SkeletonCard`, `SkeletonRow`, `EmptyState` from Task 2

- [ ] **Step 1: Add loading state**

Wrap the route's data in `useMockResource`:

```tsx
const { data: metrics, isLoading } = useMockResource(WORKSPACE_METRICS[ws]);
```

Show skeletons when `isLoading`:

- KPI cards: 3x `<SkeletonCard />`
- Recent activity: 3x `<SkeletonRow cols={4} />`
- Top models: 2x `<SkeletonRow cols={3} />`

- [ ] **Step 2: Add empty state**

When `metrics.recentActivity.length === 0`:

```tsx
<EmptyState
  icon={ChartBar}
  title="No recent activity"
  description="Generate speech or make API requests to see activity here."
/>
```

- [ ] **Step 3: Add responsive classes**

- KPI grid: `grid-cols-[1.4fr_1fr]` → `grid-cols-1 lg:grid-cols-[1.4fr_1fr]`
- Activity/models grid: `grid-cols-[1.45fr_1fr]` → `grid-cols-1 lg:grid-cols-[1.45fr_1fr]`
- Reduce padding on narrow: `px-10` → `px-10 lg:px-6`
- Sparkline: `hidden md:block` on narrow screens (too small to be useful)

- [ ] **Step 4: Add ARIA**

- `PageHeader` title: add `aria-label` with the greeting text
- Recent activity table: add `aria-label="Recent activity"` on the container
- Top models: add `aria-label="Top models"`
- Sparkline: add `role="img" aria-label="Request volume over last 24 hours"`
- Quick action links: already have text, no extra aria needed
- Stagger animation items: add `aria-hidden` to decorative animation wrappers if any

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds. Page shows skeletons briefly, then fades in content. Empty state shows if data is empty.

---

## Task 7: Playground Route — Skeletons, Empty State, Responsive, A11y

**Files:**

- Modify: `src/routes/_app.playground.tsx`

**Consumes:** `Skeleton`, `EmptyState` from Task 2

- [ ] **Step 1: Add empty state for experiments panel**

The `ExperimentsPanel` already has an empty state. Upgrade it to use `EmptyState`:

```tsx
<EmptyState
  icon={Waveform}
  title="No experiments yet"
  description="Synthesize something to save it here."
/>
```

- [ ] **Step 2: Add responsive classes**

- Right panel: `w-[300px]` → `w-[300px] lg:w-[280px]`
- Below `md`: convert right panel from fixed aside to full-width section below editor
  - Use `hidden md:flex` on the aside, and add a toggle button for small screens
  - Or simpler: `flex-col md:flex-row` on the root, `w-full md:w-[300px]` on the aside
- Editor textarea rows: `rows={16}` → `rows={16} md:rows={10}` (shorter on tablet)
- Tag area padding: `px-10` → `px-10 lg:px-6`
- Header padding: `px-10` → `px-10 lg:px-6`

- [ ] **Step 3: Add ARIA**

- Mode toggle buttons: `aria-label="Switch to text to speech"` / `aria-label="Switch to speech to text"`
- Generate button: already has text label
- Play/pause in waveform player: `aria-label="Play audio"` / `aria-label="Pause audio"`
- Download button: `aria-label="Download audio"`
- Enhance button: `aria-label="Enhance text"`
- Clear button: `aria-label="Clear text"`
- Emotion tag buttons: already have `title`, add `aria-label={t.hint}`
- Starter buttons: already have text labels
- Textarea: add `aria-label="Text to synthesize"`
- Waveform visualizer: `role="img" aria-label="Audio waveform visualization"`
- Settings panel tab buttons: `role="tab" aria-selected={tab === t}`
- Tab container: `role="tablist"`

- [ ] **Step 4: Add keyboard support for waveform player**

On the waveform player div, add:

```tsx
tabIndex={0}
role="button"
aria-label={isPlaying ? "Pause audio" : "Play audio"}
onKeyDown={(e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    setIsPlaying((p) => !p);
  }
}}
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds. Responsive layout works at narrow widths. Keyboard space toggles play/pause.

---

## Task 8: API Keys Route — Skeletons, Empty State, Responsive, A11y

**Files:**

- Modify: `src/routes/_app.api-keys.tsx`

- [ ] **Step 1: Add loading state**

Wrap keys data in `useMockResource`. Show `<SkeletonRow cols={7} />` x3 during loading.

- [ ] **Step 2: Add empty state**

```tsx
<EmptyState
  icon={Key}
  title="No API keys yet"
  description="Create your first API key to start making requests."
  action={
    <button onClick={() => setDialogOpen(true)} className="...">
      New key
    </button>
  }
/>
```

- [ ] **Step 3: Add responsive classes**

- Table grid: `grid-cols-[1.2fr_1.3fr_1.2fr_0.8fr_0.8fr_0.7fr_auto]` → `hidden md:grid` (hide table on narrow)
- Add stacked card view: `md:hidden` with key name + status + menu button per card
- Dialog: `max-w-[480px]` → `max-w-[480px] w-[calc(100vw-2rem)]`

- [ ] **Step 4: Add ARIA**

- Dialog: add `role="dialog" aria-modal="true" aria-label="Create new API key"`
- Dialog: add Escape handler (currently missing from route-local Dialog)
- Dialog: add focus trap via `useFocusTrap`
- Dialog: add focus restoration
- Form labels: add `htmlFor` to existing `<label>` elements and `id` to inputs
- Row dropdown trigger: `aria-haspopup="menu" aria-expanded={openId === key.id}`
- Row dropdown menu: `role="menu"`, items `role="menuitem"`
- Icon-only buttons: `aria-label` on copy, delete, menu triggers

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds.

---

## Task 9: Usage Route — Skeletons, Empty State, Responsive, A11y

**Files:**

- Modify: `src/routes/_app.usage.tsx`

- [ ] **Step 1: Add loading state**

Wrap usage data in `useMockResource`. Show `<SkeletonCard />` x4 for KPIs, `<Skeleton className="h-32" />` for chart.

- [ ] **Step 2: Add empty state**

If all data is empty: `<EmptyState icon={ChartBar} title="No usage data yet" description="Make API requests to see usage analytics here." />`

- [ ] **Step 3: Add responsive classes**

- KPI grid: `grid-cols-4` → `grid-cols-2 lg:grid-cols-4 md:grid-cols-2`
- Narrative: `grid-cols-2` → `grid-cols-1 lg:grid-cols-2`
- Chart: full width, reduce height on narrow: `h-32 md:h-24`
- Calendar dialog: `max-w-[420px]` → `max-w-[420px] w-[calc(100vw-2rem)]`

- [ ] **Step 4: Add ARIA**

- Range toggle buttons: `role="tab" aria-selected`
- Calendar dialog: `role="dialog" aria-modal="true" aria-label="Custom date range"`
- Calendar dialog: add Escape handler + focus trap
- Chart: `role="img" aria-label="Requests over time chart"`
- Range slider: `aria-label="Cost sensitivity"`
- Narrative sections: `aria-label` on each section

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds.

---

## Task 10: Logs Route — Skeletons, Empty State, Responsive, A11y

**Files:**

- Modify: `src/routes/_app.logs.tsx`

- [ ] **Step 1: Add loading state**

Wrap logs data in `useMockResource`. Show `<SkeletonRow cols={7} />` x5 during loading.

- [ ] **Step 2: Upgrade existing empty state**

Replace existing empty state text with `EmptyState` component:

```tsx
<EmptyState
  icon={MagnifyingGlass}
  title="No logs match your filters"
  description="Try adjusting your search or clearing filters."
  action={
    <button onClick={clearFilters} className="...">
      Clear filters
    </button>
  }
/>
```

- [ ] **Step 3: Add responsive classes**

- Table grid: `grid-cols-[110px_110px_140px_1fr_90px_70px_60px]` → `hidden md:grid`
- Add stacked card view for narrow: `md:hidden` with model + status + timestamp per card
- Detail drawer: `w-[420px]` → `w-[420px] w-[calc(100vw-1rem)] md:w-[420px]`

- [ ] **Step 4: Add ARIA**

- Search input: `aria-label="Search logs"`
- Filter dropdown triggers: `aria-haspopup="listbox" aria-expanded`, `aria-label` for each filter
- Filter dropdown menus: `role="listbox"`, items `role="option" aria-selected`
- Detail drawer: `role="dialog" aria-modal="true" aria-label="Log details"`
- Detail drawer: add Escape handler + focus trap + focus restoration to the clicked row
- Log rows (already `<button>`): add `aria-label={`Log ${l.id}: ${l.model} ${l.status}`}`
- Waveform in drawer: `aria-hidden="true"`

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds.

---

## Task 11: Models Route — Skeletons, Empty State, Responsive, A11y

**Files:**

- Modify: `src/routes/_app.models.tsx`

- [ ] **Step 1: Add loading state**

Show `<Skeleton className="h-32" />` for chart, `<SkeletonRow cols={4} />` x2 for matrix.

- [ ] **Step 2: Add empty state**

N/A — models are always present. Skip.

- [ ] **Step 3: Add responsive classes**

- Matrix grid: `grid-cols-[1.5fr_1.2fr_1fr_0.8fr]` → `grid-cols-1 lg:grid-cols-[1.5fr_1.2fr_1fr_0.8fr]` (stack on narrow)
- Chart: full width, center on narrow
- Audio preview rows: `grid-cols-[auto_1fr_auto]` → `grid-cols-[auto_1fr_auto]` (keep, it's simple enough)

- [ ] **Step 4: Add ARIA**

- Cost slider: `aria-label="Cost sensitivity slider"`
- Bar chart: `role="img" aria-label="Model cost comparison chart"`
- Play/pause buttons: `aria-label="Play sample"` / `aria-label="Pause sample"`
- Matrix table: `aria-label="Model tradeoff comparison"`

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds.

---

## Task 12: Billing Route — Skeletons, Empty State, Responsive, A11y

**Files:**

- Modify: `src/routes/_app.billing.tsx`

- [ ] **Step 1: Add loading state**

Show `<SkeletonCard />` x3 for KPIs, `<SkeletonRow cols={5} />` x3 for invoice table.

- [ ] **Step 2: Add empty state**

```tsx
<EmptyState
  icon={Wallet}
  title="No payment history"
  description="Your invoices will appear here after your first top-up."
/>
```

- [ ] **Step 3: Add responsive classes**

- KPI grid: `grid-cols-3` → `grid-cols-1 md:grid-cols-3` (stack on tablet)
- Invoice table: `grid-cols-[1.2fr_1.5fr_1.2fr_1.2fr_auto]` → `hidden md:grid` + stacked card view `md:hidden`
- KPI padding: `px-6` → `px-4 md:px-6`

- [ ] **Step 4: Add ARIA**

- KPI section: `aria-label="Billing overview"`
- Invoice table: `aria-label="Payment history"`
- Status pills: already have text, add `role="status"`

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds.

---

## Task 13: Support + Docs Routes — Responsive, A11y

**Files:**

- Modify: `src/routes/_app.support.tsx`, `src/routes/_app.docs.tsx`

- [ ] **Step 1: Support responsive + a11y**

- Grid: `grid-cols-[auto_1fr_auto]` → `grid-cols-[auto_1fr_auto]` (keep, simple enough)
- Add `aria-label` on each contact link (e.g., `aria-label="Email support at hello@rumik.ai"`)
- Add `rel="noopener noreferrer"` on external links

- [ ] **Step 2: Docs responsive + a11y**

- TOC sidebar: `grid-cols-[180px_1fr]` → `grid-cols-1 lg:grid-cols-[180px_1fr]` (hide TOC below lg)
- TOC: `hidden lg:block` on the aside
- TOC links: add `aria-current="true"` on active item
- Article: already uses semantic `<article>`, `<h2>`, `<pre>` — good
- Code blocks: add `role="region" aria-label="Code example"` on `<pre>` elements

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds.

---

## Task 14: Agentic Command Bar in Playground

**Files:**

- Modify: `src/routes/_app.playground.tsx`

**Produces:** NL prompt bar, intent parser, result renderers, command history

- [ ] **Step 1: Add command bar UI**

Below the tags area in the TTS editor, add:

```tsx
<div className="mx-10 mb-6">
  <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-[var(--inset)]/30 px-4 py-3">
    <span className="font-mono text-[14px] text-muted-foreground/40 select-none">
      {">"}
    </span>
    <input
      ref={cmdInputRef}
      value={cmdPrompt}
      onChange={(e) => setCmdPrompt(e.target.value)}
      onKeyDown={handleCmdKeyDown}
      placeholder="Ask anything… e.g. 'show me recent error logs'"
      aria-label="Agent command input"
      className="flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground/30"
    />
    <button
      onClick={runCommand}
      disabled={!cmdPrompt.trim()}
      className="rounded-md bg-foreground px-3 py-1.5 text-[12.5px] font-medium text-background transition-transform active:scale-[0.96] disabled:opacity-35 disabled:cursor-not-allowed"
    >
      Run
    </button>
  </div>
  <AnimatePresence>
    {cmdResult && (
      <motion.div
        initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
        transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
        className="mt-3 rounded-xl border border-border/60 bg-background p-4"
      >
        {/* Result content rendered here */}
      </motion.div>
    )}
  </AnimatePresence>
</div>
```

- [ ] **Step 2: Add intent parser**

```tsx
type CmdAction =
  | "logs:summary"
  | "usage:summary"
  | "keys:rotate"
  | "billing:balance"
  | "models:list"
  | "help";

function parseIntent(prompt: string): CmdAction {
  const p = prompt.toLowerCase();
  if (/log|error|recent/.test(p)) return "logs:summary";
  if (/usage|burn|request|stat/.test(p)) return "usage:summary";
  if (/rotate|regenerate|new key/.test(p)) return "keys:rotate";
  if (/credit|balance/.test(p)) return "billing:balance";
  if (/model|compare|which/.test(p)) return "models:list";
  return "help";
}
```

- [ ] **Step 3: Add result renderers**

For each action, create a result renderer that returns JSX:

- `logs:summary`: Show 3 recent logs from the LOGS seed data with status pills
- `usage:summary`: Show KPI summary (requests, credits, success rate) from USAGE seed
- `keys:rotate`: Show a "Key rotated" confirmation card with a copyable new key prefix (e.g., `rumik_live_••••a7f3`)
- `billing:balance`: Show balance card (credits remaining, burn rate) from BILLING seed
- `models:list`: Show model comparison list from MODELS data
- `help`: Show available commands list

Each renderer includes a "Go to full page →" link using `<Link>` from TanStack Router.

- [ ] **Step 4: Add command state + history**

```tsx
const [cmdPrompt, setCmdPrompt] = useState("");
const [cmdResult, setCmdResult] = useState<{
  action: CmdAction;
  content: React.ReactNode;
} | null>(null);
const [cmdThinking, setCmdThinking] = useState(false);
const cmdHistory = useRef<string[]>([]);
const [historyIndex, setHistoryIndex] = useState(-1);
const cmdInputRef = useRef<HTMLInputElement>(null);
```

- [ ] **Step 5: Add runCommand function**

```tsx
const runCommand = useCallback(() => {
  const prompt = cmdPrompt.trim();
  if (!prompt) return;
  const action = parseIntent(prompt);
  cmdHistory.current.unshift(prompt);
  setCmdThinking(true);
  setCmdResult(null);
  setTimeout(() => {
    setCmdThinking(false);
    setCmdResult({ action, content: renderResult(action) });
  }, 800);
}, [cmdPrompt]);
```

- [ ] **Step 6: Add keyboard history navigation**

In `handleCmdKeyDown`:

```tsx
if (e.key === "Enter") {
  e.preventDefault();
  runCommand();
} else if (e.key === "ArrowUp") {
  e.preventDefault();
  const next = Math.min(historyIndex + 1, cmdHistory.current.length - 1);
  if (next >= 0) {
    setHistoryIndex(next);
    setCmdPrompt(cmdHistory.current[next]);
  }
} else if (e.key === "ArrowDown") {
  e.preventDefault();
  const next = historyIndex - 1;
  if (next < 0) {
    setHistoryIndex(-1);
    setCmdPrompt("");
  } else {
    setHistoryIndex(next);
    setCmdPrompt(cmdHistory.current[next]);
  }
}
```

- [ ] **Step 7: Add thinking indicator**

When `cmdThinking`, show a subtle pulsing dots animation in the results area:

```tsx
{
  cmdThinking && (
    <div className="mt-3 flex items-center gap-2 text-[13px] text-muted-foreground">
      <span className="flex gap-1">
        <span
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-pulse"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-pulse"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-pulse"
          style={{ animationDelay: "300ms" }}
        />
      </span>
      Thinking…
    </div>
  );
}
```

- [ ] **Step 8: Verify**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds. Type a prompt like "show me error logs" and press Enter — after ~800ms, results appear inline. Up/down arrows cycle through command history.

---

## Task 15: Speech-to-Text Component A11y

**Files:**

- Modify: `src/components/shell/speech-to-text.tsx`

- [ ] **Step 1: Add ARIA to AIVoiceInput**

- Mic button: `aria-label={submitted ? "Stop recording" : "Start recording"}`
- Timer: `aria-label="Recording duration" aria-live="polite"`
- Visualizer bars: `aria-hidden="true"` on the container
- Status text ("Listening..." / "Click to speak"): `aria-live="polite"`

- [ ] **Step 2: Add ARIA to AudioUploadCard**

- Upload zone: `role="button" aria-label="Upload audio file" tabIndex={0}`
- Upload zone: add `onKeyDown` for Enter/Space to trigger file input
- Remove button (X): `aria-label="Remove uploaded file"`
- Waveform in uploaded state: `aria-hidden="true"`

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds.

---

## Task 16: Final Polish Pass

**Files:**

- Modify: All route files + `src/styles.css` + `src/components/shell/primitives.tsx`

- [ ] **Step 1: Normalize hover transitions**

Search all `.tsx` files for `duration-75`, `duration-100`, `duration-200` in hover/focus contexts and normalize to `duration-150`.

- [ ] **Step 2: Normalize active-scale**

Search for `active:scale-[0.97]` and replace with `active:scale-[0.96]` for consistency.

- [ ] **Step 3: Remove focus:outline-none**

Search for `focus:outline-none` and remove — the global `:focus-visible` ring from Task 1 handles this now. Where custom focus styling is needed, use `focus-visible:outline-2 focus-visible:outline-[var(--ring)]`.

- [ ] **Step 4: Verify all icon-only buttons have aria-label**

Search all `.tsx` files for buttons that contain only an icon (no text content). Add `aria-label` to any that are missing it.

- [ ] **Step 5: Final build + manual check**

Run: `npx tsc --noEmit && npx vite build`
Expected: Build succeeds.

Manual checks:

- Tab through every page — focus rings visible on all interactive elements
- Open command palette with ⌘K — arrow keys work, Escape closes
- Open any dialog — Tab cycles within, Escape closes, focus returns to trigger
- Resize browser to narrow — content adapts, no horizontal overflow
- Toggle playground mode — smooth animation
- Type in command bar — results appear after brief delay
- Check page with screen reader landmarks (skip link, main, nav)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add skeletons, empty states, responsive layout, a11y, and agentic command bar across all routes"
```
