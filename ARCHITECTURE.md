# Returfs External Architecture

> This document outlines the architecture of the `external` monorepo — the
> public, developer-facing half of the Returfs extension ecosystem. It mirrors
> the structure of the `internal` monorepo so that extensions, handlers, and
> services follow **one shared format** across both.

## Table of Contents

- [What External Is](#what-external-is)
- [Monorepo Structure](#monorepo-structure)
- [Package Categories](#package-categories)
- [Extension Lifecycle](#extension-lifecycle)
- [Internal vs External](#internal-vs-external)
- [Deployment Strategy](#deployment-strategy)

---

## What External Is

`external` is the tooling and shared libraries that **third-party developers
consume to build extensions for Returfs**. The guiding principle:

> If external devs use it to build extensions → it lives in **external**.
> If it is Returfs's in-house build/review/deploy of its own
> extensions/handlers/services → it lives in **internal**.

So scaffolding (the CLI/generator) and the shared React/Laravel libraries live
here. Returfs-side concerns — CDN publishing, the registry/port bookkeeping for
in-house packages, and the review/scan/deploy pipeline — stay in `internal`.

---

## Monorepo Structure

```
external/
├── extension-packages/        # Public dev tooling & shared FE libs (subtree → repos)
│   ├── cli/                    # Scaffolding CLI (generator + skeleton template)
│   └── shared-external-react/  # @returfs/shared-external-react - shared UI/logic
│
├── handler-packages/          # Shared backend (Laravel) libs (subtree → repos)
│   └── shared-external-laravel/ # returfs/shared-external-laravel - shared PHP logic
│
├── extensions/                # Submitted dev extensions, pulled from GitHub for deploy
├── handlers/                  # Submitted dev handlers, pulled from GitHub for deploy
├── services/                  # Submitted dev services, pulled from GitHub for deploy
│
├── registry.json              # Extension & service catalog (+ registry.schema.json)
├── handler-registry.json      # Handler catalog (+ handler-registry.schema.json)
├── scripts/subtree.sh         # Sync in-house external packages to deployment repos
└── .github/                   # CI/CD (review, scan, deploy hooks)
```

`extension-packages/` and `handler-packages/` hold **Returfs-maintained** public
packages (synced via git subtree to their own repos). `extensions/`, `handlers/`,
and `services/` are where **submitted developer packages are pulled in** from
their GitHub repos at deploy time — they are populated by the pipeline, not
committed by hand.

---

## Package Categories

### 1. Extension packages (`extension-packages/`)

Public, dev-facing tooling and shared frontend libraries.

| Package                  | Repo                                  | Purpose                                                            |
| ------------------------ | ------------------------------------- | ----------------------------------------------------------------- |
| `cli`                    | `returfs/generator-returfs-package`   | Scaffold a new extension (full-stack skeleton) + dev/build/validate |
| `shared-external-react`  | `returfs/shared-external-react`       | Shared React UI + logic (`@returfs/shared-external-react`)         |

The **CLI** is the convergence of the Yeoman generator and the
`skeleton-returfs-package` template (folded in as one package). It scaffolds a
full-stack extension (Laravel + React), and supports local `dev`/`build` plus
`validate` so a developer can self-check before submitting. It does **not**
publish — deployment is Returfs's responsibility (see Lifecycle).

### 2. Handler packages (`handler-packages/`)

Shared backend (Laravel/PHP) libraries used by submitted handlers.

| Package                   | Repo                                | Purpose                                                  |
| ------------------------- | ----------------------------------- | -------------------------------------------------------- |
| `shared-external-laravel` | `returfs/shared-external-laravel`   | Shared PHP logic + item event/data contracts for handlers |

### 3. Submitted developer packages (`extensions/`, `handlers/`, `services/`)

Where developer-built extensions/handlers/services are pulled in from their
GitHub repos for review and deployment. Not hand-edited in this monorepo.

---

## Extension Lifecycle

Developers **build and submit**; Returfs **reviews, pulls, and deploys**:

```
┌────────────┐   ┌─────────────┐   ┌────────────┐   ┌──────────────────┐
│ 1. Build   │   │ 2. Push to  │   │ 3. Submit  │   │ 4. Auto review + │
│  locally   │──▶│   GitHub    │──▶│  to Returfs│──▶│    security scan │
│ (cli +     │   │ (public     │   │            │   │                  │
│  shared-*) │   │  repo host) │   │            │   │                  │
└────────────┘   └─────────────┘   └────────────┘   └────────┬─────────┘
                                                              │
                              ┌───────────────────────────────┘
                              ▼
                   ┌─────────────────────┐   ┌──────────────────────┐
                   │ 5. Pull into        │   │ 6. Deploy on Returfs │
                   │ external/{extensions│──▶│    servers           │
                   │ ,handlers,services} │   │                      │
                   └─────────────────────┘   └──────────────────────┘
```

GitHub is the public extension repo host. Developers never deploy directly; the
`cli` deliberately omits any publish/CDN command.

---

## Internal vs External

| Concern                         | Internal | External | Notes                                            |
| ------------------------------- | :------: | :------: | ------------------------------------------------ |
| Scaffolding (`new`/generator)   |          |    ✓     | Dev-facing → external                            |
| Shared FE/BE libraries          |    ✓\*   |    ✓     | `shared-internal-*` vs `shared-external-*`       |
| In-house extensions/handlers    |    ✓     |          | Returfs's own products                           |
| CDN publish + registry/ports    |    ✓     |          | Returfs deploy/ops infra                         |
| Review / scan / deploy pipeline |    ✓     |          | Returfs infra; populates external dirs           |
| Submitted dev packages          |          |    ✓     | Pulled into `extensions/handlers/services`       |

\* Internal has its own shared packages for in-house use.

Both monorepos use the **same layout, registry schema, tooling configs, and
`scripts/subtree.sh` conventions** — this is the shared format.

---

## Deployment Strategy

- Returfs-maintained external packages (`extension-packages/*`,
  `handler-packages/*`) are developed here and synced to their own GitHub repos
  via **git subtree** (`./scripts/subtree.sh push <name>`).
- Submitted developer packages are **pulled** from their GitHub repos into
  `extensions/`, `handlers/`, `services/` by the deploy pipeline after passing
  review + security scan, then deployed on Returfs servers.
