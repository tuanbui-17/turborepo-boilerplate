# Changesets

This folder is managed by [Changesets](https://github.com/changesets/changesets).

Run `pnpm changeset` to record a change, then `pnpm version-packages` to apply
version bumps and update changelogs for the shared `@repo/*` packages. The apps
(`web-vite`, `web-next`, `storybook`) are private and excluded from versioning.
