# Animations "reveal on scroll" — design

Date : 2026-07-30

## Contexte

Le portfolio est actuellement statique visuellement : les sections de la home
(`Hero`, `ProjectsSection`, `AboutTeaser`, `StackSection`) s'affichent
instantanément au chargement, sans aucune animation d'entrée liée au scroll.
L'objectif est d'ajouter une touche de modernité en faisant apparaître les
sections (fade + léger slide vers le haut) au moment où elles entrent dans le
viewport, à la manière d'un effet "reveal on scroll" classique.

## Périmètre

- Sections concernées : `ProjectsSection`, `AboutTeaser`, `StackSection`
  (toutes les sections de la home **sauf** `Hero`, qui est déjà visible au
  chargement — une animation d'entrée liée au scroll n'y aurait pas de sens).
- Pages concernées pour cette itération : uniquement la home
  (`src/app/[locale]/page.tsx`). Le composant `Reveal` est générique et
  réutilisable ; l'étendre à `about/page.tsx` ou `projects/page.tsx` plus
  tard est un ajout trivial, pas un nouveau design.
- Animation rejouée une seule fois par section (pas de re-déclenchement en
  remontant/redescendant dans la page).

## Approches envisagées

1. **Intersection Observer natif + composant client réutilisable** — retenue.
   Aucune dépendance ajoutée, cohérent avec les conventions du projet
   ("pas de dépendance sans justification"), bundle quasi nul.
2. **Framer Motion (`motion`)** — écartée. Plus riche (spring physics,
   orchestration avancée) mais ajoute une dépendance (~30-50kb gzip) pour un
   besoin qui reste simple ici.
3. **CSS pur via `animation-timeline: view()`** — écartée. Zéro JS, mais
   support navigateur encore inégal (Safari en retard) — risqué pour un
   portfolio destiné à des recruteurs sur navigateurs variés.

## Architecture

### Composant `Reveal`

Nouveau fichier `src/components/Reveal.tsx`, Client Component minimal :

```tsx
'use client';

type RevealProps = {
  children: React.ReactNode;
};

export function Reveal({ children }: RevealProps) {
  // useRef sur un <div> wrapper
  // useEffect :
  //   - si prefers-reduced-motion: reduce → setVisible(true) immédiatement,
  //     pas d'observer
  //   - sinon → IntersectionObserver(threshold: 0.15), au premier intersect
  //     → setVisible(true) + observer.unobserve()
}
```

Usage dans `page.tsx` :

```tsx
<Hero />
<Reveal><ProjectsSection /></Reveal>
<Reveal><AboutTeaser /></Reveal>
<Reveal><StackSection /></Reveal>
```

`Reveal` est un Client Component, mais `ProjectsSection`, `AboutTeaser` et
`StackSection` restent des Server Components inchangés — Next.js permet de
passer un Server Component en `children` d'un Client Component. Seule la
logique d'observation + le toggle de classe tourne côté client ; le reste de
l'arbre reste rendu côté serveur.

La `<div>` wrapper ajoutée se comporte comme un item flex normal dans le
`<main className="flex flex-col">` de la home — aucun impact de layout.

### Animation & CSS

Transition CSS à 2 états via les utilitaires Tailwind directement (pas de
nouvel ajout dans `@theme` — le pattern `@keyframes` existant, ex.
`chip-sweep`, est pensé pour un effet de balayage multi-étapes, pas adapté
ici) :

- État initial (avant intersection) : `opacity-0 translate-y-6`
- État révélé : `opacity-100 translate-y-0`
- Transition : `transition-[opacity,transform] duration-700 ease-out`

### Accessibilité

`Reveal` vérifie au montage
`window.matchMedia('(prefers-reduced-motion: reduce)').matches`. Si activé,
la section s'affiche immédiatement, sans transition ni décalage, et aucun
`IntersectionObserver` n'est mis en place.

**Compromis assumé** : l'état "invisible" initial est présent dans le HTML
même avant hydratation (rendu SSR du Client Component). Si le JS échouait
totalement au chargement, la section resterait invisible. Risque accepté et
standard pour ce type d'animation d'entrée sur un site Next.js — pas de
budget investi dans un fallback no-JS pour cette itération.

## Fichiers touchés

- `src/components/Reveal.tsx` (nouveau)
- `src/app/[locale]/page.tsx` (ajout des wrappers `Reveal`)

## Vérification

Pas de suite de tests automatisés dans ce projet pour l'instant → vérification
manuelle :

1. `pnpm dev`, scroll sur la home en Chrome — les 3 sections apparaissent en
   fade + slide-up à l'entrée dans le viewport, une seule fois chacune.
2. Émuler `prefers-reduced-motion: reduce` dans les DevTools (onglet
   Rendering) → affichage instantané, sans animation.
3. Vérifier en viewport mobile (375px) que le layout n'est pas cassé.
4. Vérifier que remonter puis redescendre ne rejoue pas l'animation.
