# DLMM Python Wrapper

This package is part of a community-maintained fork of Meteora's DLMM SDK.

It is not a standalone native Python implementation of DLMM. It wraps a local HTTP server exposed by the TypeScript client in this repository.

## What It Wraps

- Python client code: `python-client/dlmm/dlmm`
- HTTP server implementation: `ts-client/src/server/index.ts`
- Default local server URL: `http://localhost:3000`

## What It Can Do

The wrapper exposes common methods for:

- creating a pool-scoped client
- reading the active bin
- converting price formats
- creating positions and adding liquidity by strategy
- reading user positions
- removing liquidity
- building swap transactions

Returned transactions are built by the TypeScript SDK and converted back into Python objects.

## What It Does Not Do

- implement DLMM logic directly in Python
- talk to Solana without the TypeScript server
- provide verified feature-parity with the TypeScript SDK

## Basic Usage

```python
from dlmm import DLMM_CLIENT
from solders.pubkey import Pubkey

rpc = "https://api.devnet.solana.com"
pool_address = Pubkey.from_string("3W2HKgUa96Z69zzG3LK1g8KdcRAWzAttiLiHfYnKuPw5")

dlmm = DLMM_CLIENT.create(pool_address, rpc)
active_bin = dlmm.get_active_bin()
```

## Development Setup

1. Install Poetry.
2. From `python-client/dlmm`, run `poetry install`.
3. In another terminal, move to `ts-client`.
4. Install JavaScript dependencies if needed.
5. Start the TypeScript bridge with `npm run start-server` or `pnpm run start-server`.
6. Run Python tests with `poetry run pytest`.

If you change the server address, update `API_URL` in `python-client/dlmm/dlmm/dlmm.py`.
