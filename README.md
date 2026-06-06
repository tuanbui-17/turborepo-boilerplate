# Turborepo React Boilerplate

A production-grade monorepo boilerplate built on Turborepo: a shared Radix +
Tailwind v4 component library consumed by a Vite React SPA and a Next.js App
Router app, documented in Storybook, with linting, testing, versioning, and
git hooks wired up.

## Stack

| Concern        | Choice                                                           |
| -------------- | ---------------------------------------------------------------- |
| Orchestration  | Turborepo 2 · pnpm 11 workspaces                                 |
| Language       | TypeScript 6 (strict)                                            |
| UI runtime     | React 19                                                         |
| SPA target     | Vite 8                                                           |
| SSR target     | Next.js 16 (App Router, Turbopack)                               |
| Styling        | Tailwind CSS v4 (CSS-first `@theme` tokens)                      |
| Components     | Radix UI headless primitives                                     |
| Component docs | Storybook 10 (Vite builder)                                      |
| Lint / Format  | ESLint 10 flat config + Prettier (`prettier-plugin-tailwindcss`) |
| Tests          | Vitest + Testing Library (+ Storybook story tests)               |
| Versioning     | Changesets                                                       |
| Git hooks      | Husky + lint-staged + commitlint (Conventional Commits)          |

## Architecture

```
turborepo-boilerplate/
├── apps/
│   ├── web-vite/            # Vite 8 + React 19 SPA
│   ├── web-next/            # Next.js 16 App Router (Turbopack)
│   └── storybook/           # Storybook 10 host — documents @repo/ui
├── packages/
│   ├── ui/                  # Radix-based components + component tests
│   ├── tailwind-config/     # shared Tailwind v4 @theme tokens (theme.css)
│   ├── typescript-config/   # base / react-library / nextjs tsconfig presets
│   ├── eslint-config/       # shared flat ESLint presets (base / react / next)
│   ├── utils/               # shared pure helpers (no React dep)
│   └── types/               # shared TypeScript types (no React dep)
├── turbo.json
├── pnpm-workspace.yaml
└── package.json             # root scripts + dev dependencies
```

## Commands

| Command          | Description                               |
| ---------------- | ----------------------------------------- |
| `pnpm dev`       | Run all dev servers                       |
| `pnpm build`     | Build every app/package                   |
| `pnpm lint`      | Lint the workspace                        |
| `pnpm typecheck` | Type-check the workspace                  |
| `pnpm test`      | Run Vitest unit / component / story tests |
| `pnpm format`    | Format with Prettier                      |
| `pnpm changeset` | Record a version change for `@repo/*`     |

Changesets only version the shared `@repo/*` packages; the apps (`web-vite`,
`web-next`, `storybook`) are private and excluded.

## Getting started

```bash
corepack enable
pnpm install
pnpm dev
```

Node 24 is pinned via `.nvmrc` (the workspace requires Node >= 20).

Dev servers:

- `web-vite` → http://localhost:5173
- `web-next` → http://localhost:3000
- `storybook` → http://localhost:6006
