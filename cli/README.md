# DLMM CLI

This binary is part of the community-maintained fork of Meteora's DLMM SDK.

It is a Rust operator and admin CLI for working with the DLMM program surface exposed by this repository. It is not official Meteora support tooling.

## What It Covers

The command tree in `cli/src/args.rs` and `cli/src/main.rs` includes flows for:

- pair initialization
- bin array initialization
- position initialization
- add and remove liquidity
- exact-in, exact-out, and price-impact swaps
- pair and position inspection
- reward and fee claiming
- customizable permissionless pair creation
- operator seeding flows
- price sync
- owner position lookup
- admin actions such as preset parameter, activation point, reward, fee, and badge management

## Build

```bash
cargo build -p cli
```

## Run

```bash
target/debug/cli --help
```

## Toolchain Note

The repository currently pins its Rust toolchain in `rust-toolchain.toml`. If you are on Apple Silicon and need an alternate target, use the target triple that matches your local setup.
