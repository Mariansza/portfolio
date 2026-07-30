# Scroll-Reveal Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the home page's `ProjectsSection`, `AboutTeaser`, and `StackSection` fade in and slide up as they enter the viewport while scrolling, using a reusable client-side wrapper — no new dependency.

**Architecture:** A single Client Component, `Reveal`, wraps each section as `children`. It uses the native `IntersectionObserver` API to flip a `isVisible` boolean once the wrapped section enters the viewport (threshold 0.15), then stops observing. The boolean toggles Tailwind utility classes that drive a CSS transition (`opacity` + `translate-y`). If the user has `prefers-reduced-motion: reduce` set, the section is shown immediately with no observer and no transition. The wrapped sections (`ProjectsSection`, `AboutTeaser`, `StackSection`) stay Server Components — only `Reveal` itself is `'use client'`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4 utility classes. No new npm dependency.

## Global Constraints

- TypeScript strict mode, `noUncheckedIndexedAccess` is on — index/array access (e.g. `entries[0]`) must be treated as possibly `undefined`.
- No `any` — use `unknown` + narrowing if needed.
- Server Components by default; `'use client'` only where interactivity/browser APIs require it, and the choice must be justified (here: `IntersectionObserver` + `useState`/`useEffect` require the client).
- No dependency added without justification — this plan adds none.
- Conventional Commits (`feat:`, `fix:`, etc.), one focused commit per task.
- Accessibility: must respect `prefers-reduced-motion: reduce`.

---

### Task 1: Create the `Reveal` component

**Files:**
- Create: `src/components/Reveal.tsx`

**Interfaces:**
- Produces: `Reveal` — a component with props `{ children: React.ReactNode }`, exported as a named export `export function Reveal(...)`, importable as `import { Reveal } from '@/components/Reveal'`. Renders a `<div>` wrapper around `children`.

- [ ] **Step 1: Write the component**

Create `src/components/Reveal.tsx` with this exact content:

```tsx
'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

type RevealProps = {
  children: React.ReactNode;
};

export function Reveal({ children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const isVisible = isIntersecting || prefersReducedMotion;

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      {children}
    </div>
  );
}
```

Note : la version initialement prévue appelait `setIsVisible(true)`
directement dans le corps de l'effect pour le cas
`prefers-reduced-motion`. La règle ESLint `react-hooks/set-state-in-effect`
(projet sur React 19 + `eslint-config-next` récent) interdit cet appel
synchrone. La version ci-dessus lit la préférence via `useSyncExternalStore`
(safe pour le SSR, pas de `setState` synchrone) et ne fait `setState` que
dans la callback de l'`IntersectionObserver`, qui est le pattern accepté par
la règle.

This project has no automated test runner configured (no `jest`/`vitest` in
`package.json`) — verification for this task is TypeScript + ESLint, and
full behavioral verification happens in Task 2 once the component is wired
into a real page.

- [ ] **Step 2: Typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: no output, exit code 0 (no type errors — in particular, no
"possibly undefined" error on `entry?.isIntersecting`, confirming the
`noUncheckedIndexedAccess` case is handled correctly).

- [ ] **Step 3: Lint**

Run: `pnpm lint`
Expected: no errors or warnings for `src/components/Reveal.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/components/Reveal.tsx
git commit -m "feat(ui): add Reveal component for scroll-triggered animations"
```

---

### Task 2: Wire `Reveal` into the home page

**Files:**
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `Reveal` from Task 1 (`import { Reveal } from '@/components/Reveal'`), used as `<Reveal>{children}</Reveal>`.

- [ ] **Step 1: Wrap the three sections**

Replace the full content of `src/app/[locale]/page.tsx` with:

```tsx
import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { AboutTeaser } from '@/components/AboutTeaser';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { ProjectsSection } from '@/components/ProjectsSection';
import { Reveal } from '@/components/Reveal';
import { StackSection } from '@/components/StackSection';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function Home({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <main className="flex flex-col">
        <Hero />
        <Reveal>
          <ProjectsSection />
        </Reveal>
        <Reveal>
          <AboutTeaser />
        </Reveal>
        <Reveal>
          <StackSection />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
```

Only change from the current file: the `Reveal` import added in alphabetical
order between `ProjectsSection` and `StackSection`, and `ProjectsSection`,
`AboutTeaser`, `StackSection` each wrapped in `<Reveal>`. `Hero` and
`Footer` are untouched.

- [ ] **Step 2: Typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 3: Lint**

Run: `pnpm lint`
Expected: no errors or warnings.

- [ ] **Step 4: Manual browser verification**

Run: `pnpm dev`, then open `http://localhost:3000/fr` in Chrome.

Check all four:
1. Scroll down slowly — `ProjectsSection`, `AboutTeaser`, and `StackSection`
   each fade in with a slight upward slide as they enter the viewport
   (roughly when ~15% of the section is visible).
2. Open DevTools → Rendering tab → "Emulate CSS media feature
   prefers-reduced-motion" → set to "reduce", then reload the page and
   scroll — all sections should be visible immediately, with no fade/slide
   and no delay.
3. Switch DevTools to a 375px-wide mobile viewport and reload — layout
   should look identical to before (no shifted spacing, no overflow caused
   by the added wrapper `<div>`s).
4. With reduced-motion emulation turned back off, scroll a section fully
   into view, then scroll back up above it, then scroll back down to it
   again — the section should already be at full opacity/position, i.e. the
   animation does not replay.

- [ ] **Step 5: Commit**

```bash
git add "src/app/[locale]/page.tsx"
git commit -m "feat(home): reveal sections on scroll"
```
