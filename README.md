# Community Fork of Meteora DLMM SDK

This repository is a community-maintained fork of Meteora's DLMM SDK.

It is not an official Meteora repository, release channel, or support surface.

## Purpose

This fork exists to document what the code in this repository actually does, keep local changes visible, and make it easier to work with the SDK without overstating what is implemented.

- Upstream repository: `MeteoraAg/dlmm-sdk`
- Primary npm package implemented here: `@meteora-ag/dlmm`
- Main SDK surface: `ts-client/src/dlmm`

## What This Repo Contains

- `ts-client/`: the main TypeScript SDK and HTTP bridge used by the Python wrapper
- `cli/`: a Rust CLI for pair lifecycle, liquidity, swap, reward, and admin/operator flows
- `commons/`: reusable Rust helpers for quoting, PDA derivation, filters, and math
- `market_making/`: a small Rust service for monitoring configured positions and shifting ranges
- `python-client/dlmm/`: a Python wrapper over the local TypeScript HTTP server
- `idls/` and `artifacts/`: the program IDL plus prebuilt localnet test artifacts

What this repo does not contain:

- the on-chain DLMM program source

## Documentation In This Fork

- Detailed SDK capability guide: [`docs/sdk-capabilities.md`](docs/sdk-capabilities.md)
- TypeScript package usage examples: [`ts-client/README.md`](ts-client/README.md)
- Python wrapper notes: [`python-client/dlmm/README.md`](python-client/dlmm/README.md)
- Rust CLI notes: [`cli/README.md`](cli/README.md)
- Market-making service notes: [`market_making/README.MD`](market_making/README.MD)
- Agent/editorial rules for repo work: [`AGENTS.md`](AGENTS.md)

## Important Caveats

- This fork documents an implementation. It does not make this repository the official Meteora documentation source.
- Many SDK methods intentionally build unsigned `Transaction` objects or grouped instructions. Integrators still need to sign, send, confirm, and retry.
- The Python package in this repo is a wrapper. It depends on the TypeScript HTTP server and should not be described as a standalone native SDK.
- The CLI and `market_making` binary are operator tools. They are useful, but they are not polished product surfaces.

## Verification Commands

### Rust helpers

```bash
cargo test -p commons
```

### TypeScript SDK localnet tests

```bash
cd ts-client
anchor localnet -- --features localnet
pnpm run test
```

### TypeScript SDK broader Jest run

```bash
cd ts-client
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

## Repo Layout

```text
.
├── ts-client/       Primary SDK and HTTP bridge
├── cli/             Rust CLI
├── commons/         Rust quoting/PDA/math helpers
├── market_making/   Small operator service
├── python-client/   Python wrapper over local TS server
├── idls/            Program IDL
└── artifacts/       Prebuilt localnet/test artifacts
```

## Bottom Line

The most important code in this repository is the TypeScript SDK in `ts-client/src/dlmm`.

If you want a high-level inventory of pool discovery, swaps, position management, rewards, operator flows, Token-2022 support, and rebalance features, start with [`docs/sdk-capabilities.md`](docs/sdk-capabilities.md).
