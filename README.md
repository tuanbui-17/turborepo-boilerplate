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
| Git hooks      | Husky + lint-staged + commitlint (Conventional Commits)          |
| CI             | GitHub Actions · Renovate for dependency updates                 |

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

## Adding dependencies

Versions shared by more than one package live in the `catalog:` block of
`pnpm-workspace.yaml` ([pnpm catalogs](https://pnpm.io/catalogs)).

| Situation                                       | What to do                                                                                 |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Package is already in the catalog               | `pnpm add <pkg>@catalog: --filter <app>` — writes `"catalog:"`                             |
| New package, used by one workspace package only | `pnpm add <pkg> --filter <app>` — the version stays in that `package.json`                 |
| A second workspace package needs it             | Move the version into `catalog:` by hand, switch both `package.json` files to `"catalog:"` |
| `peerDependencies`                              | Keep a wide range (e.g. `"react": "^19"`), never `catalog:`                                |

Do not run a bare `pnpm add <pkg>` for a package that is already in the
catalog: pnpm bumps the catalog entry to the latest version, which upgrades
every package that uses it. After any change, run `pnpm install` and commit
the updated `pnpm-lock.yaml`.

## Getting started

```bash
corepack enable
pnpm install
pnpm --filter storybook exec playwright install chromium
cp apps/web-next/.env.example apps/web-next/.env
cp apps/web-vite/.env.example apps/web-vite/.env
pnpm dev
```

Node 24 is pinned via `.nvmrc` (the workspace requires Node `^22.22.1 || >=24`).
Playwright's Chromium is needed for the Storybook story tests (`pnpm test`); on
a fresh Linux machine add `--with-deps` to install its system libraries.

Dev servers:

- `web-vite` → http://localhost:5173
- `web-next` → http://localhost:3000
- `storybook` → http://localhost:6006

## Environment variables

Each app that needs env vars has its own `.env.example` — copy it to `.env`
in the same folder (every `.env*` file except `.env.example` is git-ignored).
Values are not validated: a missing or wrong value shows up when the code that
reads it runs.

To add a variable:

1. Add it to the app's `.env.example`. Browser-visible names need the
   `NEXT_PUBLIC_` / `VITE_` prefix and are inlined into the bundle at build
   time; never put secrets in those.
2. Type it: `apps/web-next/env.d.ts` (`ProcessEnv`) or
   `apps/web-vite/src/vite-env.d.ts` (`ImportMetaEnv`).
3. Variables without that prefix: once code reads one, declare it in a
   `turbo.json` inside the app (`"extends": ["//"]`), under `env` if it
   changes the build output, under `passThroughEnv` if not. Turbo runs in
   strict mode, so an undeclared variable is not passed to the task, and
   `turbo/no-undeclared-env-vars` warns about it in lint. `NEXT_PUBLIC_*` /
   `VITE_*` are picked up automatically.

## CI and dependency updates

`.github/workflows/ci.yml` runs on every pull request and on pushes to
`main`: `format:check`, then `turbo run lint typecheck test build`. The
`.turbo/cache` folder is kept between runs with `actions/cache`, so no
account or secret is needed. Running on `main` also fills the cache that
new pull requests start from.

Dependency updates come from [Renovate](https://docs.renovatebot.com/)
(`renovate.json`): install the Renovate GitHub app on the repo. Every Monday
it opens one PR with all minor/patch updates and one PR per major update,
only for versions released at least 3 days ago. Dependabot is not used: it
does not support pnpm 11 yet.
