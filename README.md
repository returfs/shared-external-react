# Returfs External

Monorepo for the public, developer-facing half of the Returfs extension
ecosystem: the scaffolding CLI and the shared libraries third-party developers
use to build extensions. It mirrors [`internal`](../internal) so both follow one
shared format.

## Structure

```
external/
├── extension-packages/         # Public dev tooling & shared FE libs
│   ├── cli/                     # Scaffolding CLI (generator + skeleton)
│   └── shared-external-react/   # @returfs/shared-external-react
│
├── handler-packages/           # Shared backend (Laravel) libs
│   └── shared-external-laravel/ # returfs/shared-external-laravel
│
├── extensions/  handlers/  services/   # Submitted dev packages, pulled for deploy
│
├── registry.json + registry.schema.json
├── handler-registry.json + handler-registry.schema.json
└── scripts/subtree.sh          # Sync in-house external packages to their repos
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full picture.

## Quick Start

```bash
# Install dependencies
pnpm install

# Lint / typecheck
pnpm lint
pnpm typecheck

# Scaffold a new extension (via the CLI)
pnpm new:extension my-extension
```

## CLI (`@returfs/cli`)

The developer CLI (`extension-packages/cli`) exposes a single `returfs` binary.
`new` is a commander front-end over the yeoman scaffolding generator; the rest
are local dev helpers. There is intentionally **no publish** — extensions are
submitted via GitHub and deployed by Returfs.

```bash
returfs new [name]   # scaffold a new extension (Laravel and/or React)
returfs dev          # run the extension's dev server (project's `dev` script)
returfs build        # build the extension (project's `build` script)
returfs validate     # check the extension structure
```

## Extension Lifecycle

Developers **build and submit**; Returfs **reviews, pulls, and deploys**:

1. Build locally with the `cli` + `shared-external-*` packages.
2. Push to **GitHub** (the public extension repo host).
3. Submit to Returfs.
4. Returfs automatically reviews + security-scans.
5. Returfs pulls the package into `extensions/` / `handlers/` / `services/`.
6. Returfs deploys it on its servers.

The CLI intentionally has **no publish command** — deployment is Returfs's
responsibility.

## Packages

| Package                   | Path                                       | Repo                                |
| ------------------------- | ------------------------------------------ | ----------------------------------- |
| cli                       | `extension-packages/cli`                   | `returfs/generator-returfs-package` |
| shared-external-react     | `extension-packages/shared-external-react` | `returfs/shared-external-react`     |
| shared-external-laravel   | `handler-packages/shared-external-laravel` | `returfs/shared-external-laravel`   |

## Subtree Management

Returfs-maintained external packages are synced to their own GitHub repos via
git subtree:

```bash
./scripts/subtree.sh status            # Show all subtrees and remote status
./scripts/subtree.sh push cli          # Push a subtree to its deployment repo
./scripts/subtree.sh push shared-external-react
./scripts/subtree.sh split <name>      # Split a subtree to a branch (manual push)
```

## Registry

`registry.json` (extensions + services) and `handler-registry.json` (handlers)
are the source of truth for what is catalogued in external, validated against
`*.schema.json`. They share the same schema as `internal`.

## License

See individual package licenses (most are MIT).
