# VAULT77 Fork of Meteora DLMM SDK

This repository is a community-maintained fork for VAULT77. It is not an official Meteora repository, release channel, or support surface.

- Upstream project: `MeteoraAg/dlmm-sdk`
- Fork owner: `monthviewsales`
- Purpose of this fork: document the codebase accurately, make local changes safely, and preserve a clear separation from official Meteora materials

## Fork Notice

If you are looking for the official upstream repository, use Meteora's repository instead of this fork.

This fork exists because the code is useful but the upstream documentation is sparse. The goal here is to document what is actually implemented in the repo, including what is supported, what is only partially supported, and what is not present at all.

## What This Repo Actually Contains

This repo is not just a TypeScript SDK.

It contains:

- `ts-client/`: the primary SDK and the main public API surface
- `cli/`: a Rust CLI for pair creation, swaps, liquidity management, rewards, and admin/operator flows
- `commons/`: Rust helpers for quoting, PDA derivation, math, filters, and Token-2022 support
- `market_making/`: a small Rust daemon/service for monitoring and shifting configured positions
- `python-client/dlmm/`: a Python wrapper around a local HTTP server exposed by the TypeScript client
- `idls/` and `artifacts/`: the IDL plus prebuilt test artifacts for localnet/integration tests

What it does not contain:

- the on-chain DLMM program source code

This matters. The repo gives you client-side integration, transaction builders, quoting logic, and tooling, but not the program implementation itself.

## Where The Real SDK Is

The primary implementation is the TypeScript client under `ts-client/src/dlmm`.

The package published to npm is:

- `@meteora-ag/dlmm`

The top-level TypeScript entrypoint re-exports the `DLMM` class plus helpers, types, constants, IDL types, and account filters.

## What The TypeScript SDK Can Do

### 1. Pool discovery and metadata

The SDK can:

- list all LB pairs
- find an existing pair by token mints and fee parameters
- detect customizable permissionless pairs
- fetch all preset parameter accounts
- construct a `DLMM` instance from a pool address
- create multiple `DLMM` instances in one call
- refetch pool state, reserves, rewards, and bitmap extensions

This makes it suitable for:

- pool explorers
- routers
- position dashboards
- management scripts

### 2. Price, bin, and liquidity inspection

The SDK can:

- fetch the active bin
- fetch all bin arrays for a pool
- fetch the bin arrays likely required for swaps
- inspect bins around the active bin
- inspect bins between price bounds or bin bounds
- convert between UI price and price-per-lamport
- derive a bin id from a price
- compute fee info and dynamic fee estimates
- inspect emission rates for active rewards
- inspect lock information for positions in a pair

This is enough to build:

- analytics views
- liquidity heatmaps
- quote prep logic
- UI components that need active-bin context

### 3. Pair creation

The SDK supports creating:

- preset-parameter LB pairs
- token-2022-aware LB pairs
- customizable permissionless LB pairs
- customizable permissionless LB pairs with token-2022 support

It also supports:

- initializing bin arrays explicitly
- toggling pair status
- setting activation points
- syncing a pool toward an external market price

Important caveat:

- Many of these methods build unsigned `Transaction` objects. They do not submit transactions for you.
- Admin-style actions require the correct signer permissions at the program level.

### 4. Position discovery and inspection

The SDK can:

- fetch all positions for a user across all pools
- fetch all positions for a user within a single pool
- fetch and process a single position by address
- decode extended positions
- compute processed position state including fees, rewards, and per-bin data
- estimate rent costs for position creation and expansion

This is one of the stronger parts of the SDK. There is a lot of effort here around chunked account fetching and processed position data.

### 5. Add liquidity and create positions

The SDK supports:

- creating an empty position
- creating an empty extended position
- initializing a position and depositing liquidity by strategy
- initializing multiple positions across a wide range
- adding liquidity to an existing position by strategy
- chunked add-liquidity flows for wide positions
- older weight-based deposit flows

Supported strategy families include:

- `Spot`
- `Curve`
- `BidAsk`

The helper layer also supports:

- weight distributions
- auto-fill helpers for one side based on the other side
- range-to-bin helpers
- rent and bin-array cost estimates before execution

### 6. Extended positions and wide ranges

The SDK supports extended positions and wide-range management, including:

- quoting the cost to extend a position
- increasing position length
- decreasing position length
- splitting large ranges across multiple positions
- parallelizable instruction grouping for wide-range deposits

This is a meaningful capability that is barely obvious from the existing docs.

### 7. Remove liquidity and close positions

The SDK supports:

- removing liquidity across a bin range
- chunking large removals into multiple transactions
- optionally claiming fees and rewards during removal
- optionally closing empty positions during removal
- closing positions directly
- closing a position only if it is empty

There is explicit logic for edge cases such as empty bins that still have pending fees or rewards.

### 8. Swaps and quoting

The SDK supports:

- exact-in quote calculation
- exact-out quote calculation
- exact-in swap transaction building
- exact-out swap transaction building
- swap-with-price-impact transaction building
- partial fill behavior in quote flows
- extra-bin-array selection for better quote/swap preparation

The quote path includes:

- bin-array traversal
- dynamic fee updates
- price impact calculation
- Token-2022 transfer fee adjustments

### 9. Rewards and fee claiming

The SDK supports:

- claiming swap fees for one position
- claiming swap fees across many positions
- claiming LM rewards for one position
- claiming LM rewards across many positions
- claiming both fee and rewards for one position
- claiming all available fees and rewards across positions

These flows are chunked when needed to stay within transaction limits.

### 10. ILM, operator, and rebalance flows

The SDK supports more advanced managed-liquidity workflows than the README suggests, including:

- seeding liquidity by operator
- seeding single-bin liquidity
- creating positions by operator
- lock-release-point handling
- simulating rebalance operations locally
- strategy-based rebalance simulation
- building rebalance instructions after simulation
- quoting bin-array and bitmap-extension rental costs for rebalance operations

This area appears intended for managed strategies, launch flows, or operator-controlled liquidity programs.

### 11. Token-2022 support

The SDK is not just SPL Token v1-only.

It includes support for:

- Token-2022 pair creation
- transfer-fee aware quoting and swap math
- transfer-hook extra account meta resolution
- mixed token-program handling per mint
- associated token account creation with the correct token program owner

This is one of the more valuable implementation details in the repo.

## What The Rust CLI Can Do

The Rust CLI under `cli/` exposes a large portion of the SDK and admin lifecycle through commands.

It supports commands for:

- pair initialization
- bin array initialization
- position initialization
- adding and removing liquidity
- exact-in swaps
- exact-out swaps
- price-impact swaps
- showing pair and position data
- claiming rewards and fees
- increasing oracle length
- customizable permissionless pair creation
- operator liquidity seeding
- syncing price
- getting all positions for an owner

Admin subcommands also support:

- permissioned pair initialization
- pair status updates
- activation point updates
- protocol fee withdrawal
- reward initialization and funding
- preset parameter management
- token badge setup
- claim-protocol-fee operator management
- base fee updates

## What The Rust `commons` Crate Can Do

The `commons/` crate contains reusable lower-level utilities for:

- exact-in and exact-out quote logic
- PDA derivation
- account filters
- token-2022 fee calculations
- math helpers
- RPC helper extensions

This is useful if you want Rust-side integration or offline quoting support without using the TypeScript SDK directly.

## What The `market_making` Service Can Do

The `market_making/` binary is a small service, not a full framework.

It can:

- load a config file
- refresh position state on an interval
- initialize user ATAs
- periodically evaluate whether configured price ranges should shift
- expose a basic HTTP endpoint at `/check_positions`

It is best understood as an internal bot/service scaffold, not a polished general-purpose market-making product.

## What The Python Client Can And Cannot Do

The Python package is not a first-class native SDK.

What it does:

- calls a local HTTP server started from the TypeScript client
- wraps some common pool, position, quote, swap, and liquidity methods

What it does not do:

- directly implement the DLMM protocol logic in Python
- talk to Solana on its own without the local TypeScript server

In practice, the Python layer is a convenience wrapper around the TypeScript server process.

## Important Limitations and Gaps

### This repo does not include the on-chain program source

You get the IDL and prebuilt artifacts for tests, but not the full Solana program code.

### The top-level documentation is incomplete

The current upstream root `README` barely documents anything. Most useful behavior must be learned from:

- `ts-client/src/dlmm/index.ts`
- helper modules
- tests
- the changelog

### Many methods only build transactions

This repo often returns unsigned `Transaction` objects or instruction groups. Integrators must:

- sign
- submit
- confirm
- retry

outside the SDK.

### Some flows depend on the correct privileges

Creator, admin, operator, fee-owner, or position-owner permissions still matter. The SDK can construct the transactions, but program authorization still governs whether they succeed.

### Python support is partial

The Python client is useful for wrappers and scripts, but it should not be treated as feature-parity with the TypeScript implementation.

### Local testing depends on artifacts

The Anchor config points localnet tests at prebuilt `.so` artifacts. That is fine for integration testing, but it is different from having the on-chain source in-tree.

## Repo Layout Summary

```text
.
├── ts-client/       Primary SDK and examples
├── cli/             Rust CLI
├── commons/         Rust quote/PDA/math helpers
├── market_making/   Rust daemon for configured positions
├── python-client/   Python wrapper over local TS HTTP server
├── idls/            Program IDL
└── artifacts/       Prebuilt localnet/test artifacts
```

## Useful Commands

### Root

```bash
cargo test -p commons
```

### TypeScript SDK tests

```bash
cd ts-client
anchor localnet -- --features localnet
pnpm run test
```

### Build Rust CLI

```bash
cargo build -p cli
```

### Build market making binary

```bash
cargo build -p market_making
```

## Bottom Line

The main value of this repo is the TypeScript SDK. It is materially more capable than the official docs imply.

If you need:

- pool discovery
- swap quoting
- transaction building
- LP position creation and management
- extended/wide positions
- fee and reward claiming
- operator-seeded or managed-liquidity workflows
- Token-2022-aware integration
- rebalance simulation

then this repo already contains a lot of useful implementation.

If you need:

- authoritative on-chain program source
- polished upstream docs
- a truly native Python implementation
- a fully productized market-making system

this repo does not provide that.
