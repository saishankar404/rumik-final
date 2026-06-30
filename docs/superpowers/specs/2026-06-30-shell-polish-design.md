# Shell Polish: Skeletons, Empty States, Responsive, A11y, Command Bar

**Date:** 2026-06-30  
**Status:** Approved  
**Scope:** All 9 routes + shell (`_app.tsx`) + primitives + CSS

---

## 1. Skeleton Loading + Empty States

### Simulated loading layer

A `useMockResource<T>(data: T, delayMs?: number)` hook in `src/lib/store.ts`:

```ts
function useMockResource<T>(
  data: T,
  delayMs?: number,
): { data: T | null; isLoading: boolean };
```

- Wraps hardcoded data in a `setTimeout` promise (default 600–900ms with jitter)
- Returns `{ data: null, isLoading: true }` during delay, then `{ data, isLoading: false }`
- Each route calls it on mount, rendering skeletons while loading, then fading in content
- Maps 1:1 to a real API layer later (swap `setTimeout` for `fetch`)

### Skeleton primitives (added to `primitives.tsx`)

| Component      | Props                | Visual                                                            |
| -------------- | -------------------- | ----------------------------------------------------------------- |
| `Skeleton`     | `className?: string` | Base block: `rounded-md bg-[var(--inset)]` with shimmer animation |
| `SkeletonText` | `lines?: number=3`   | Stacked lines at 80%/100%/60% widths                              |
| `SkeletonRow`  | `cols?: number`      | Table row placeholder matching grid template                      |
| `SkeletonCard` | `className?: string` | Panel/block placeholder for KPI cards                             |

All use `--inset` token for the shimmer surface. A `shimmer` keyframe (`background-position` sweep) in `styles.css` replaces `animate-pulse` for a premium feel.

### Empty states

A reusable `EmptyState` component in `primitives.tsx`:

```tsx
<EmptyState
  icon={MagnifyingGlass}
  title="No logs found"
  description="Try adjusting your filters"
  action={<Button>Clear filters</Button>}
/>
```

Applied to every list/table across all 9 routes:

- Overview: recent activity table
- Playground: experiments panel (upgrade existing)
- API Keys: keys table
- Usage: data tables/narrative
- Logs: upgrade existing empty state
- Models: model list
- Billing: invoice table
- Support: N/A (static content)
- Docs: N/A (static content)

### Design language

- Skeletons use `--inset` background with a `shimmer` animation (subtle light sweep)
- Empty states use muted-foreground text hierarchy, existing border/hairline patterns
- No new colors or visual patterns introduced

---

## 2. Polish — Fade Masks, Waveform, Hover/Focus

### CSS fixes

1. **Resolve `pop-in` collision**: Keep `@utility pop-in` (140ms, `pop-in` keyframe). Remove the duplicate `.pop-in` class (160ms, `pop-in-new` keyframe). Update any references to use the utility version.

2. **`prefers-reduced-motion`**: Add global block:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

3. **Fade mask improvements**: Update `fade-mask-b`, `fade-mask-y`, `fade-mask-r` gradient stops to use softer falloff:

```css
@utility fade-mask-b {
  mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
}
```

### Focus-visible rings

Global `:focus-visible` in `@layer base`:

```css
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

- Remove all `focus:outline-none` instances; replace with `focus-visible:outline-2 focus-visible:outline-[var(--ring)]` where custom focus styling is needed
- Applies automatically to every interactive element

### Waveform interactions

- Playground waveform player: Space key toggles play/pause; `aria-label` on play button; visualizer gets `role="img" aria-label="Audio waveform"`
- `Waveform` primitive in `primitives.tsx`: `aria-hidden="true"` (decorative)

### Hover/focus consistency

- Standardize all hover transitions to `transition-colors duration-150`
- Standardize all active-scale to `active:scale-[0.96]` (normalize existing `0.97` instances)
- Every interactive element has visible `:hover` and `:focus-visible` states

---

## 3. Agentic Command Bar in Playground

### UI structure

A prompt input bar at the bottom of the playground (below tags area), full width:

```
> [prompt input....................................................] [Run]
```

- Subtle `>` prefix indicates "agent ready"
- On submit: thinking indicator (~800ms), then results panel slides up
- Results panel: interpreted action, status chip, result content
- Up/down arrow cycles through command history (like shell history)

### Intent parser

Pattern-matching against keywords (no external AI — simulated):

| Pattern keywords                                                    | Action          | Result                                                                             |
| ------------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------- |
| `view logs`, `show logs`, `recent errors`, `error logs`             | logs:summary    | Summary of recent logs (3-5 items) + "Go to logs →" link                           |
| `query usage`, `credits burned`, `how many requests`, `usage stats` | usage:summary   | KPI summary (requests, credits, success rate) + "Go to usage →"                    |
| `rotate keys`, `rotate key`, `new key`, `regenerate key`            | keys:rotate     | Confirmation card with copyable new key prefix                                     |
| `check credits`, `credit balance`, `how many credits`               | billing:balance | Balance card (credits remaining, burn rate) + "Go to billing →"                    |
| `list models`, `which models`, `compare models`                     | models:list     | Model comparison summary (name, speed, description) + "Go to models →"             |
| (unmatched)                                                         | help            | "I can help with: view logs, query usage, rotate keys, check credits, list models" |

### Results rendering

- Each action type has a dedicated result renderer component
- Results use existing primitives (`Section`, `StatusPill`, `MetricRow`, `InsetPanel`)
- "Go to full page →" link navigates to the relevant route
- Results panel animates in with opacity + translateY (framer-motion)

### State

```ts
type CommandResult = {
  prompt: string;
  action: string;
  status: "success" | "info" | "error";
  content: ReactNode;
  timestamp: number;
};
const [history, setHistory] = useState<CommandResult[]>([]);
const [historyIndex, setHistoryIndex] = useState(-1); // for up/down navigation
```

### Design language

- Prompt bar uses `--inset` background, `border-border/60`, monospace font for the `>` prefix
- Results panel uses existing card/section styling
- Status chips use existing `StatusPill` component
- No new visual patterns

---

## 4. Responsive Layout — Adaptive Content, Fixed Sidebar

### Breakpoints

Two breakpoints: `<1280px` (narrow desktop, Tailwind `lg:`) and `<768px` (tablet, Tailwind `md:`).

### Shell changes (`_app.tsx`)

- Page gutter: `px-10` → `px-10 lg:px-6 md:px-4`
- Content max-width: `max-w-[1100px]` → `max-w-[1100px] lg:max-w-full`
- Topbar search trigger: text hides below `lg` (`hidden lg:inline`), keeps icon + `⌘K` kbd
- Topbar breadcrumb: shorter on narrow (hide "Rumik /" prefix below `md`)

### Per-route responsive

| Route      | Desktop                    | <1280px (`lg:`)                | <768px (`md:`)                          |
| ---------- | -------------------------- | ------------------------------ | --------------------------------------- |
| Overview   | `grid-cols-[1.4fr_1fr]`    | `grid-cols-1`                  | `grid-cols-1`, compact spacing          |
| Playground | `w-[300px]` right panel    | `w-[280px]` right panel        | Panel toggles below editor (full width) |
| API Keys   | 7-col grid table           | 5-col (hide scopes, rate cols) | Stacked cards: name + status + menu     |
| Usage      | 4-col KPI, 2-col narrative | 2x2 KPI, 1-col narrative       | 1-col KPI, 1-col narrative              |
| Logs       | 7-col grid table           | 5-col (hide credits, latency)  | Stacked rows: model + status + time     |
| Models     | 4-col matrix               | 2-col (stack comparison)       | 1-col, chart full width below           |
| Billing    | 3-col KPI                  | 3-col (tighter padding)        | 1-col KPI stack                         |
| Support    | 3-col row layout           | Same                           | 1-col stacked                           |
| Docs       | `grid-cols-[180px_1fr]`    | Article only (`lg:hidden` TOC) | Article only                            |

### Implementation

- Pure Tailwind responsive variants (`lg:`, `md:`) on existing grid templates
- Tables that can't gracefully collapse: conditional render — `hidden md:grid` for table view, `md:hidden` for card view
- No JS-based responsive logic
- Playground right panel: below `md`, switches from `w-[300px] aside` to a toggleable full-width section below the editor

---

## 5. Accessibility — Keyboard Nav, Focus Rings, ARIA

### Shell-level (`_app.tsx`)

| Element               | A11y additions                                                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Root                  | Skip-to-content link (`sr-only focus:not-sr-only`), `<main id="main-content">`                                                                                           |
| Sidebar nav           | `role="navigation"`, `aria-label="Main navigation"`, `aria-current="page"` on active link                                                                                |
| Workspace switcher    | `aria-haspopup="menu"`, `aria-expanded` on trigger, `role="menu"` on popover, `role="menuitem"` on items, arrow-key nav                                                  |
| Command palette       | `role="dialog"`, `aria-modal="true"`, `aria-label="Command palette"`, `role="listbox"` + `role="option"` + `aria-selected`, arrow-key nav, focus trap, focus restoration |
| Notification bell     | `aria-label="Notifications"`, `aria-haspopup`, `aria-expanded`                                                                                                           |
| All icon-only buttons | `aria-label` on every icon-only button                                                                                                                                   |

### Route-level (all 9)

| Element                                  | A11y additions                                                                                  |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `PageHeader`                             | `role="banner"`, `aria-label` on title                                                          |
| Tables                                   | Semantic `<table>/<thead>/<tbody>/<tr>/<th>/<td>` where possible; otherwise `role="table"` etc. |
| Dialogs (api-keys, usage, logs drawer)   | `role="dialog"`, `aria-modal`, `aria-label`, Escape handler, focus trap, focus restoration      |
| Dropdowns/menus                          | `aria-haspopup`, `aria-expanded`, `role="menu"`/`role="menuitem"`, arrow-key nav                |
| Filter/search inputs                     | `aria-label` or `<label htmlFor>` association                                                   |
| Icon-only buttons                        | `aria-label` on all (play/pause, download, copy, clear, enhance, load, etc.)                    |
| Charts (sparkline, waveform, bar charts) | `role="img"` + `aria-label`; decorative ones `aria-hidden="true"`                               |
| Form inputs                              | `<label htmlFor>` association                                                                   |

### Keyboard navigation patterns

| Component            | Keys   | Behavior                         |
| -------------------- | ------ | -------------------------------- |
| Command palette      | ↑/↓    | Move selection                   |
|                      | Enter  | Select + navigate                |
|                      | Escape | Close, restore focus to trigger  |
| Dropdown menus       | ↑/↓    | Move selection                   |
|                      | Enter  | Select                           |
|                      | Escape | Close, restore focus to trigger  |
| Dialogs              | Tab    | Focus trap (cycle within dialog) |
|                      | Escape | Close, restore focus to trigger  |
| Logs drawer          | Escape | Close, restore focus to row      |
| Playground waveform  | Space  | Toggle play/pause                |
| Playground tag chips | Tab    | Navigate between chips           |

### Global CSS

- `:focus-visible` ring (from Section 2)
- `prefers-reduced-motion: reduce` (from Section 2)
- Verify `.sr-only` utility is available (Tailwind provides it)
- Focus trap implementation: a `useFocusTrap(ref)` hook that queries `tabbable` elements and cycles Tab/Shift+Tab

### Design language constraint

All accessibility additions use the existing visual design system:

- Focus rings use `--ring` token
- ARIA attributes are invisible (no visual change except focus-visible rings)
- Keyboard navigation reuses existing hover/active styles for selected states
- No new colors, fonts, or visual patterns

---

## Implementation order

1. **CSS + primitives first** (styles.css fixes, skeleton/empty-state primitives, focus-visible, reduced-motion) — foundation for everything else
2. **Shell a11y** (skip link, landmarks, command palette a11y, nav ARIA) — shell-level changes
3. **Per-route: skeletons + empty states + a11y** — one route at a time, all three areas together per route
4. **Responsive** — per route, after skeletons/a11y are in
5. **Agentic command bar** — playground-specific, last
6. **Final polish pass** — verify consistency across all routes

## Files touched

| File                                      | Changes                                                                         |
| ----------------------------------------- | ------------------------------------------------------------------------------- |
| `src/styles.css`                          | pop-in fix, reduced-motion, shimmer keyframe, fade mask polish, focus-visible   |
| `src/components/shell/primitives.tsx`     | Skeleton, SkeletonText, SkeletonRow, SkeletonCard, EmptyState, a11y on existing |
| `src/lib/store.ts`                        | `useMockResource` hook, `useFocusTrap` hook                                     |
| `src/routes/_app.tsx`                     | Skip link, landmarks, nav ARIA, command palette a11y, responsive gutter         |
| `src/routes/_app.index.tsx`               | Skeletons, empty state, responsive, a11y                                        |
| `src/routes/_app.playground.tsx`          | Skeletons, empty state, responsive, a11y, command bar                           |
| `src/routes/_app.api-keys.tsx`            | Skeletons, empty state, responsive, a11y, dialog a11y                           |
| `src/routes/_app.usage.tsx`               | Skeletons, empty state, responsive, a11y, dialog a11y                           |
| `src/routes/_app.logs.tsx`                | Skeletons, empty state upgrade, responsive, a11y, drawer a11y                   |
| `src/routes/_app.models.tsx`              | Skeletons, empty state, responsive, a11y                                        |
| `src/routes/_app.billing.tsx`             | Skeletons, empty state, responsive, a11y                                        |
| `src/routes/_app.support.tsx`             | Responsive, a11y                                                                |
| `src/routes/_app.docs.tsx`                | Responsive, a11y                                                                |
| `src/components/shell/speech-to-text.tsx` | a11y labels                                                                     |
