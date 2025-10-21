# Scaffold-Lisk Next.js App

A modern, full-stack Web3 application built with Next.js 14, TypeScript, and Tailwind CSS, designed to interact with smart contracts on the Lisk Sepolia testnet. This application provides a comprehensive interface for managing ERC20 tokens, NFTs, and blockchain exploration.

## 🚀 Features

### Token Management

- **Token Balance**: View your ERC20 token balance in real-time
- **Token Transfer**: Send tokens to other addresses
- **Token Minting**: Mint new tokens (owner only)
- **Real-time Updates**: Automatic balance updates after transactions

### NFT Collection

- **NFT Minting**: Create new NFTs and assign them to addresses
- **Collection Overview**: View total supply and your NFT balance
- **Metadata Display**: Show NFT name, symbol, and collection stats

### Developer Tools

- **Debug Contracts**: Interactive interface to call contract functions and debug transactions
- **Block Explorer**: Explore local blockchain transactions and blocks
- **Transaction History**: View detailed transaction information and receipts

### User Experience

- **Wallet Integration**: Seamless connection with MetaMask and other Web3 wallets
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark Theme**: Modern dark theme with gradient backgrounds
- **Real-time Notifications**: Toast notifications for transaction status

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, DaisyUI
- **Web3**: Wagmi, Viem, RainbowKit
- **State Management**: Zustand
- **UI Components**: Heroicons, React Hot Toast
- **Blockchain**: Lisk Sepolia Testnet

## 📋 Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- MetaMask or compatible Web3 wallet
- Lisk Sepolia testnet ETH for gas fees

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
```

### 3. Run the Development Server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Structure

```
app/
├── page.tsx                 # Home page with token and NFT management
├── layout.tsx              # Root layout with providers
├── blockexplorer/          # Block explorer functionality
│   ├── page.tsx
│   ├── address/[address]/  # Address detail pages
│   └── transaction/[txHash]/ # Transaction detail pages
└── debug/                  # Contract debugging interface
    ├── page.tsx
    └── _components/        # Debug-specific components

components/
├── example-ui/             # Token and NFT management components
│   ├── TokenBalance.tsx
│   ├── TokenTransfer.tsx
│   ├── TokenMint.tsx
│   └── NFTCollection.tsx
├── scaffold-eth/           # Reusable Web3 components
└── Header.tsx              # Navigation header

hooks/scaffold-eth/         # Custom React hooks for Web3
├── useScaffoldContractRead.ts
├── useScaffoldContractWrite.ts
└── useTargetNetwork.ts

contracts/
└── deployedContracts.ts    # Deployed contract addresses and ABIs

utils/scaffold-eth/         # Utility functions
├── contract.ts
├── notification.tsx
└── common.ts
```

## 🔧 Configuration

### Network Configuration

The app is configured to work with Lisk Sepolia testnet by default. You can modify the target network in `scaffold.config.ts`:

```typescript
const scaffoldConfig = {
  targetNetworks: [liskSepolia],
  pollingInterval: 30000,
  // ... other config
};
```

### Contract Configuration

Deployed contract addresses and ABIs are managed in `contracts/deployedContracts.ts`. The app currently includes:

- **MyToken**: ERC20 token contract
- **MyNFT**: ERC721 NFT contract

## 🎯 Usage

### Connecting Your Wallet

1. Click the "Connect Wallet" button in the header
2. Select your preferred wallet (MetaMask, WalletConnect, etc.)
3. Approve the connection in your wallet

### Managing Tokens

1. **View Balance**: Your token balance is displayed automatically
2. **Transfer Tokens**: Enter recipient address and amount, then click "Transfer"
3. **Mint Tokens**: Enter recipient address and amount, then click "Mint" (owner only)

### Managing NFTs

1. **View Collection**: See total supply and your NFT balance
2. **Mint NFT**: Enter recipient address and click "Mint NFT"

### Debugging Contracts

1. Navigate to the "Debug Contracts" section
2. Select a contract from the dropdown
3. Interact with contract functions directly
4. View contract variables and state

### Exploring the Blockchain

1. Navigate to the "Block Explorer" section
2. Search for addresses or transaction hashes
3. View detailed transaction information
4. Browse recent blocks and transactions

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

```bash
pnpm vercel
```

### Other Platforms

The app can be deployed to any platform that supports Next.js:

```bash
pnpm build
pnpm start
```

## 🔍 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm check-types` - Run TypeScript type checking

## 🛡 Security Considerations

- Never commit private keys or sensitive data
- Use environment variables for API keys
- Validate all user inputs
- Be cautious with contract interactions
- Test thoroughly on testnets before mainnet

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the Speedrun Lisk course and follows the same licensing terms.

## 🆘 Troubleshooting

### Common Issues

1. **Wallet Connection Issues**

   - Ensure MetaMask is installed and unlocked
   - Check that you're on the correct network (Lisk Sepolia)
   - Try refreshing the page

2. **Transaction Failures**

   - Ensure you have enough ETH for gas fees
   - Check that the recipient address is valid
   - Verify you have sufficient token balance

3. **Contract Interaction Issues**
   - Ensure contracts are deployed and verified
   - Check contract addresses in `deployedContracts.ts`
   - Verify you have the required permissions

### Getting Help

- Check the browser console for error messages
- Review the network tab for failed requests
- Ensure all environment variables are set correctly

## 🔗 Useful Links

- [Lisk Documentation](https://lisk.com/documentation)
- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [RainbowKit Documentation](https://www.rainbowkit.com)

---

Built with ❤️ using Scaffold-Lisk
