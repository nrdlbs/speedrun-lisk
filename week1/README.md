## Week 1: Hardhat ERC20 & ERC721

### Setup

1. Install deps:

```bash
cd @week1
npm i
```

2. Create `.env` using `ENV.example`:

```bash
cp ENV.example .env
```

3. Set `RPC_URL`, `PRIVATE_KEY`, and scan API key(s).

### Compile & Test

```bash
npm run build
npm test
```

### Deploy

Use `NETWORK` env or pass Hardhat flag.

```bash
NETWORK=liskSepolia npm run deploy:erc20
NETWORK=liskSepolia npm run deploy:erc721
```

### Verify

Auto-verify by setting `VERIFY=true` before deploy, or run separately:

```bash
NETWORK=liskSepolia CONTRACT_ADDRESS=0x... ARGS='["MyToken","MTK","0xOwner","1000000000000000000"]' npm run verify
```

Etherscan API selection is configured in `hardhat.config.ts` (sepolia/holesky supported).
