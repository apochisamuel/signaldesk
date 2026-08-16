# SignalDesk

SignalDesk is a self-contained React operations workspace for triaging cases, assigning owners, filtering and selecting queue items, editing case details, and reviewing activity history. It is designed as a realistic client-side product rather than a backend demo: all data and network behavior are deterministic and live inside the repository.

## Requirements

- Node.js 20
- npm
- No API keys, private credentials, databases, or external services

The repository intentionally has one package at the root and one npm lockfile.

## Setup

```bash
npm ci
npm run dev
```

The development server is provided by Vite. All application data comes from the local mock service in `src/services/`.

## Verification

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

- `npm test` runs the Vitest unit/component suite.
- `npm run lint` performs the TypeScript project check.
- `npm run build` type-checks and creates the production bundle.
- `npm run test:e2e` runs the Playwright interaction suite against the production preview server.

Playwright requires its Chromium browser binary to be installed in a new environment. If it is not already present, run `npx playwright install chromium` once after installing dependencies.

## Product surfaces

The main queue supports:

- free-text search with deterministic asynchronous latency
- status, priority, owner, and tag filtering
- multiple sort orders and pagination
- ID-based row selection across visible pages
- bulk assignment and status updates
- partial-failure handling for concurrent mutations
- case detail drawer with optimistic edits
- activity notes and revision history
- global command search with keyboard navigation
- URL-addressable saved views and focused cases
- persisted device preferences
- live status notifications
- responsive desktop, tablet, and compact layouts

## Repository structure

```text
src/
  app/                 application shell and routing
  components/          reusable accessible UI primitives
  features/
    cases/              queue, selection, drawer, editing, bulk actions
    search/             global command search
    views/              saved view definitions
    preferences/        persisted local preferences
    notifications/      toast/status state
  hooks/                reusable lifecycle and interaction hooks
  services/             deterministic mock database/network/API
  test/                 shared test factories and render helpers
  utils/                filtering, sorting, dates, and text helpers
tests/e2e/              Playwright user flows
```

## Deterministic data model

The mock database starts with a stable set of cases generated from `src/services/seedData.ts`. The network helper adds repeatable latency and can inject specific failures during tests. Nothing reaches the public internet at runtime.

Case records carry a revision number and activity history, which lets list refreshes, optimistic edits, bulk operations, and stale data be modeled without a backend.

## Development conventions

- Keep state at the narrowest ownership boundary that can preserve the intended behavior.
- Prefer stable record IDs over array positions or object identity.
- Derive render-only values rather than mirroring them into effects.
- Clean up listeners, timers, and asynchronous subscriptions.
- Use semantic controls and preserve keyboard/focus behavior.
- Keep user-visible async states distinguishable without relying on color alone.
- Do not put credentials or environment-specific files in client code.

## Author

Samuel Apochi
