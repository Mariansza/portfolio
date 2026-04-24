# CLAUDE.md

Mémoire du projet pour Claude Code. Lis-moi au début de chaque session.

## Contexte

Portfolio personnel de **Marian Szawelski**, étudiant ingénieur dernière année spécialisé IA, cherche un CDI en France. Le site sert de vitrine pro pour recruteurs RH et tech leads.

**Stack** : Next.js 16 (App Router, TypeScript, Turbopack) · React 19 · Tailwind CSS v4 · next-intl (FR + EN) · Sanity CMS (étape 4) · hébergement Vercel.

**Langues** : bilingue FR/EN, routing `/fr/...` et `/en/...`, FR par défaut.

**Style visuel** : dark / tech / developer. Un prototype est fourni par Claude Design au début du projet et sert de référence pour le design system.

## Mode pédagogique — IMPORTANT

Marian apprend en construisant. À chaque action significative, explique :

1. **Ce que tu fais** — fichier touché, commande lancée.
2. **Pourquoi** — la vraie raison technique.
3. **Alternatives** — 1 ou 2 approches non retenues et le motif.
4. **Concepts nouveaux** — au premier emploi de : middleware, Server vs Client Components, Server Actions, `generateMetadata`, `@theme` (Tailwind v4), route groups, dynamic segments, ISR, OG images dynamiques, etc. → petit paragraphe avant utilisation.

Pas de surexplication sur les bases (variables, boucles, types simples). Concentre-toi sur ce qui est spécifique au framework ou non-trivial.

Quand tu hésites entre deux approches, partage le raisonnement au lieu de trancher en silence.

## Conventions

- **TypeScript strict**, `noUncheckedIndexedAccess` activé, jamais de `any` — `unknown` + narrowing.
- **Commits Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`). Commits atomiques, pas de gros commit global.
- **Accessibilité** dès le départ : balises sémantiques, nav clavier, `aria-*` si besoin, contraste AA minimum.
- **Server Components par défaut**, `'use client'` seulement si nécessaire (interactivité, hooks, APIs navigateur). Justifie le choix.
- **Pas de dépendance ajoutée sans justification** — chaque `pnpm add` : à quoi ça sert, alternative écartée, impact bundle.
- **Tailwind v4** : config en CSS via `@theme` dans `globals.css`. Pas de `tailwind.config.ts` sauf cas particulier.
- **Nommage** : composants en PascalCase, utils en kebab-case, hooks préfixés `use`.

## Architecture cible

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx           # home
│   │   ├── about/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── cv/page.tsx
│   │   └── contact/page.tsx
│   └── layout.tsx             # racine html minimale
├── components/
├── lib/
├── i18n/
│   ├── routing.ts
│   ├── request.ts
│   └── messages/{fr,en}.json
└── middleware.ts
```

## Roadmap

1. **Fondations + design system** — scaffold, i18n, import prototype Claude Design, tokens Tailwind, composants de base, push GitHub (← étape en cours)
2. **Pages statiques** — home finalisée, about, contact (Server Action)
3. **Sanity CMS** — schémas, Studio, wiring
4. **Projets & études de cas** — liste filtrable, template case study
5. **CV** — page web + export PDF
6. **Polish** — SEO, OG images, accessibilité, analytics, perf
7. **Domaine** — achat + DNS

## Règles de travail

- Si une décision structurante manque, **pose la question** au lieu d'assumer.
- Avant toute opération destructrice (`rm -rf`, reset, force push) : **demander confirmation**.
- À la fin de chaque étape : récap des fichiers modifiés, décisions prises, points à valider.
