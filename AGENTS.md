# AGENTS.md

## Purpose

This repository is a community-maintained fork of Meteora's DLMM SDK. It is not an official Meteora support or release channel.

Agents working in this repo should preserve that distinction in code, docs, and commit messages.

## Repo Identity

- `ts-client/` is the primary SDK and source of truth for product capability
- `cli/` is a Rust CLI for lifecycle, admin, and operator workflows
- `commons/` contains reusable Rust-side quoting, PDA, and math helpers
- `market_making/` is a small service/bot scaffold, not a general market-making platform
- `python-client/` is a wrapper around the local TypeScript HTTP server, not a standalone native SDK
- The repo does not include the on-chain DLMM program source; it includes the IDL and prebuilt localnet artifacts

## Working Rules

- Start by reading the relevant implementation files before making claims about behavior.
- Treat `ts-client/src/dlmm/index.ts` and its helper modules as the main SDK surface.
- Do not describe this fork as official Meteora documentation.
- Prefer small, direct patches over speculative rewrites.
- Keep docs aligned to what the code and tests actually support.
- Preserve existing public APIs unless the user explicitly asks for breaking changes.
- Avoid changing generated artifacts, IDLs, or packaged archives unless the task specifically requires it.

## Definition of Done

When making a change, agents should not stop at editing code.

Use `AGENTS.md` guidance to make the work reliable:

- update or add tests when behavior changes
- run the relevant test, type, lint, or build commands for the touched area
- confirm the final behavior matches the request
- review the diff for regressions, risky assumptions, and documentation drift

If a full verification pass is too expensive or blocked by environment limits, state exactly what was not run.

## Repo-Specific Expectations

### Documentation

- Root docs should clearly say this is a community fork, not an official Meteora support or release channel.
- Capability claims should be backed by code or tests in this repo.
- If a feature is partial, say that directly.
- If a component is only a wrapper, say what it wraps.

### TypeScript SDK

- Prefer changes that keep `DLMM` behavior explicit and predictable.
- Respect existing transaction-builder patterns: many methods intentionally return unsigned `Transaction` objects or instruction groups.
- Keep Token-2022 support intact when touching swaps, liquidity, ATA creation, or fee math.
- Be careful around wide-range and extended-position flows; they often exist to work around transaction-size or compute-unit constraints.

### Rust CLI and Helpers

- Keep CLI behavior aligned with SDK behavior where possible.
- Prefer adding or reusing helper logic in `commons/` when the same logic is needed in multiple Rust components.
- Do not silently drift CLI behavior away from the TypeScript implementation without documenting the reason.

### Python Client

- Treat the Python package as a wrapper over the TypeScript HTTP server.
- Do not document it as feature-parity with the TypeScript SDK unless that has been explicitly verified.

## Commands

### Root

```bash
cargo test -p commons
```

### TypeScript SDK

```bash
cd ts-client
anchor localnet -- --features localnet
pnpm run test
pnpm run test:all
```

### Build CLI

```bash
cargo build -p cli
```

### Build market making binary

```bash
cargo build -p market_making
```

## Review Checklist

Before finishing, check:

- Is the change consistent with the repo's community-fork identity?
- Are README and code comments still accurate?
- Were relevant tests or checks run?
- Does the diff introduce API drift, broken imports, or unsupported claims?
- If documentation was changed, does it match the actual implementation?

## Reusable Workflows

If a task becomes repetitive, package it as a narrowly scoped skill instead of relying on long repeated prompts.

Good candidates include:

- release note drafting
- SDK capability audits
- PR review against a checklist
- migration notes
- issue triage

Keep each skill scoped to one job, describe when to use it, and include only the assets that improve reliability.
