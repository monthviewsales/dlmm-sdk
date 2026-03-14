# DLMM Market Making Service

This binary is part of the community-maintained fork of Meteora's DLMM SDK.

It is a small service scaffold for monitoring configured positions and optionally shifting ranges. It is not a general-purpose market-making platform.

## What It Does

Based on `market_making/src/main.rs` and related modules, the service can:

- load a config file
- refresh tracked position state on an interval
- initialize user ATAs when market-making mode is enabled
- periodically check whether configured ranges should shift
- expose a basic HTTP endpoint at `/check_positions`

## Build

```bash
cargo build -p market_making
```

## Run

```bash
target/debug/market_making --help
```

When the service is running, it serves the position snapshot endpoint on `http://localhost:8080/check_positions`.
