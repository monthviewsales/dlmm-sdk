# DLMM SDK Capability Guide

This document is an implementation-oriented inventory for the community fork in this repository.

It describes the SDK surface implemented in `ts-client/src/dlmm`, with supporting behavior in helper modules and tests. It is not an official Meteora release document.

## Where The Main SDK Lives

- Main class and method surface: `ts-client/src/dlmm/index.ts`
- Package entrypoint: `ts-client/src/index.ts`
- Helpers: `ts-client/src/dlmm/helpers`
- Integration and behavior tests: `ts-client/src/test`

## What The TypeScript SDK Can Do

### Pool discovery and metadata

The SDK can:

- list LB pairs
- find a pair by mint and fee parameters
- detect customizable permissionless pairs
- fetch preset parameter accounts
- construct a `DLMM` instance from a pool address
- create multiple `DLMM` instances in one call
- refetch pool state, reserves, rewards, and bitmap extensions

### Price, bin, and liquidity inspection

The SDK can:

- fetch the active bin
- fetch all bin arrays for a pool
- fetch swap-relevant bin arrays
- inspect bins around the active bin
- inspect bins between price bounds or bin bounds
- convert between UI price and price-per-lamport
- derive bin ids from price
- compute fee information and dynamic fee estimates
- inspect emission rates for active rewards
- inspect position lock information for a pair

### Pair creation and pair lifecycle

The SDK supports:

- preset-parameter LB pair creation
- Token-2022-aware pair creation
- customizable permissionless pair creation
- customizable permissionless pair creation with Token-2022 support
- explicit bin array initialization
- pair status updates
- activation point updates
- pool sync flows toward an external market price

Important caveat:

- many methods build unsigned `Transaction` objects instead of submitting transactions directly

### Position discovery and inspection

The SDK can:

- fetch positions for a user across pools
- fetch positions for a user within a single pool
- fetch and process a position by address
- decode extended positions
- compute processed fee, reward, and per-bin position state
- estimate rent costs for position creation and expansion

### Create positions and add liquidity

The SDK supports:

- creating empty positions
- creating empty extended positions
- initializing a position and depositing liquidity by strategy
- initializing multiple positions across a wide range
- adding liquidity to an existing position by strategy
- chunked add-liquidity flows for wide positions
- older weight-based deposit flows

Strategy families exposed by the client include:

- `Spot`
- `Curve`
- `BidAsk`

### Extended positions and wide ranges

The SDK supports:

- quoting the cost to extend a position
- increasing position length
- decreasing position length
- splitting large ranges across multiple positions
- grouped instructions for wide-range deposits

### Remove liquidity and close positions

The SDK supports:

- removing liquidity across a bin range
- chunking large removals into multiple transactions
- optionally claiming fees and rewards during removal
- optionally closing empty positions during removal
- closing positions directly
- closing a position only when empty

### Swaps and quoting

The SDK supports:

- exact-in quotes
- exact-out quotes
- exact-in swap transaction builders
- exact-out swap transaction builders
- swap-with-price-impact transaction builders
- partial-fill behavior in quote flows
- extra bin-array selection for quote and swap preparation

The quote path includes:

- bin-array traversal
- dynamic fee updates
- price impact calculation
- Token-2022 transfer fee adjustments

### Rewards and fee claiming

The SDK supports:

- claiming swap fees for one position
- claiming swap fees across many positions
- claiming liquidity mining rewards for one position
- claiming liquidity mining rewards across many positions
- claiming both fees and rewards for one position
- claiming all available fees and rewards across positions

### ILM, operator, and rebalance flows

The SDK includes advanced managed-liquidity flows, including:

- operator-seeded liquidity
- single-bin operator seeding
- operator-created positions
- lock-release-point handling
- local rebalance simulation
- strategy-based rebalance simulation
- rebalance instruction building after simulation
- rental-cost quoting for bin arrays and bitmap extensions in rebalance flows

### Token-2022 support

The SDK includes:

- Token-2022 pair creation
- transfer-fee-aware quote and swap math
- transfer-hook extra account meta resolution
- mixed token-program handling per mint
- ATA creation with the correct token program

## Rust Components

### CLI

The Rust CLI exposes a large portion of the lifecycle and admin surface, including:

- pair initialization
- bin array initialization
- position initialization
- add and remove liquidity
- exact-in, exact-out, and price-impact swap flows
- pair and position inspection
- reward and fee claiming
- oracle length changes
- customizable permissionless pair creation
- operator liquidity seeding
- price sync
- position lookup by owner

Admin subcommands also cover:

- permissioned pair initialization
- pair status changes
- activation point changes
- protocol fee withdrawal
- reward initialization and funding
- preset parameter management
- token badge setup
- claim-protocol-fee operator management
- base fee updates

### `commons`

The `commons/` crate provides reusable Rust-side helpers for:

- quoting
- PDA derivation
- account filters
- Token-2022 fee calculations
- math helpers
- RPC extensions

### `market_making`

The `market_making/` binary is a small service, not a general framework. It can:

- load a config file
- refresh position state on an interval
- initialize user ATAs
- evaluate whether configured ranges should shift
- expose a `/check_positions` HTTP endpoint

## Python Wrapper

The Python package in `python-client/dlmm/` is not a standalone native SDK.

What it does:

- calls a local HTTP server started from the TypeScript client
- wraps common pool, position, quote, swap, and liquidity methods

What it does not do:

- implement DLMM protocol logic natively in Python
- talk to Solana directly without the local TypeScript server

## Limits And Gaps

- This repository does not include the on-chain DLMM program source.
- Top-level docs in the original upstream repo are sparse; many implementation details are discoverable only through `ts-client/src/dlmm`, helpers, and tests.
- Authorization still matters. Admin, creator, operator, fee-owner, and position-owner privileges are enforced by the program even when the SDK can construct the transaction.
- The Python wrapper is partial and should not be described as feature-parity with the TypeScript SDK without explicit verification.
