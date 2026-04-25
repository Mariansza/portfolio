# Portfolio — Marian Szawelski

Site personnel de Marian Szawelski, étudiant ingénieur dernière année spécialisé IA, à la recherche d'un CDI en France. Vitrine pour recruteurs RH et tech leads, bilingue FR/EN, design tech / éditorial.

## Stack

- **Next.js 16** — App Router, Turbopack, Server Components par défaut
- **React 19**
- **TypeScript** strict (`noUncheckedIndexedAccess` activé)
- **Tailwind CSS v4** — config en CSS via `@theme` dans `globals.css`
- **next-intl 4** — routing `/fr` et `/en`, FR par défaut
- **Sanity CMS** — prévu étape 4 de la roadmap
- **Vercel** — hébergement cible

## Commandes

```bash
pnpm dev       # serveur de dev (Turbopack, http://localhost:3000)
pnpm build     # build production
pnpm start     # serveur production (post-build)
pnpm lint      # ESLint
pnpm format    # Prettier (write)
```

## Architecture

```
src/
├── app/
│   ├── [locale]/             # routes localisées (/fr, /en)
│   │   ├── layout.tsx        # html lang dynamique + fontes + i18n provider
│   │   └── page.tsx          # home (Topbar + Hero + Projects + Stack + Footer)
│   ├── globals.css           # tokens @theme Tailwind v4
│   └── layout.tsx            # racine pass-through
├── components/               # composants UI (PascalCase)
├── i18n/
│   ├── routing.ts            # locales + stratégie d'URL
│   ├── request.ts            # config runtime, charge messages JSON
│   ├── navigation.ts         # Link/usePathname locale-aware
│   └── messages/{fr,en}.json
├── lib/                      # data et utils (kebab-case)
└── proxy.ts                  # ex-middleware.ts (Next 16 convention)
```

## Roadmap

1. **Fondations + design system** — scaffold, i18n, tokens, composants, page d'accueil
2. **Pages statiques** — about, contact (Server Action)
3. **Sanity CMS** — schémas, Studio, wiring
4. **Projets & études de cas** — liste filtrable, template case study
5. **CV** — page web enrichie + export PDF
6. **Polish** — SEO, OG images, accessibilité, analytics, perf
7. **Domaine** — achat + DNS

## Licence

Privé.
