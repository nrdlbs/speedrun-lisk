"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Logo } from "~~/components/Logo";
import { Address } from "~~/components/scaffold-eth";
import { TokenBalance } from "~~/components/example-ui/TokenBalance";
import { TokenTransfer } from "~~/components/example-ui/TokenTransfer";
import { NFTCollection } from "~~/components/example-ui/NFTCollection";
import { TokenMint } from "~~/components/example-ui/TokenMint";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
        <div className="relative px-6 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="block text-base-content/80 text-lg font-normal mb-4">Welcome to</span>
              <span className="flex items-center justify-center gap-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                <Logo size={56} />
                Scaffold-Lisk
              </span>
            </h1>
            
            {connectedAddress && (
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-base-100/80 backdrop-blur-sm rounded-full shadow-lg border border-base-300 mb-12">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-base-content/70">Connected:</span>
                <Address address={connectedAddress} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Token Management Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4 text-base-content">
              Token Management
            </h2>
            <p className="text-center text-base-content/60 mb-12 max-w-2xl mx-auto">
              Manage your ERC20 tokens with balance viewing, transfers, and minting capabilities
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              <div className="group">
                <TokenBalance />
              </div>
              <div className="group">
                <TokenTransfer />
              </div>
              <div className="group">
                <TokenMint />
              </div>
            </div>
          </div>

          {/* NFT Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4 text-base-content">
              NFT Collection
            </h2>
            <p className="text-center text-base-content/60 mb-12 max-w-2xl mx-auto">
              View and interact with your NFT collection
            </p>
            
            <div className="flex justify-center">
              <div className="group">
                <NFTCollection />
              </div>
            </div>
          </div>

          {/* Tools Section */}
          <div className="bg-base-100/50 backdrop-blur-sm rounded-3xl p-8 border border-base-300">
            <h2 className="text-2xl font-bold text-center mb-8 text-base-content">
              Developer Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/debug" className="group">
                <div className="bg-base-100 hover:bg-base-200 transition-all duration-300 p-8 rounded-2xl shadow-lg hover:shadow-xl border border-base-300 hover:border-primary/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <BugAntIcon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-base-content">Debug Contracts</h3>
                  </div>
                  <p className="text-base-content/70 leading-relaxed">
                    Tinker with your smart contracts, call functions, and debug transactions in real-time.
                  </p>
                </div>
              </Link>
              
              <Link href="/blockexplorer" className="group">
                <div className="bg-base-100 hover:bg-base-200 transition-all duration-300 p-8 rounded-2xl shadow-lg hover:shadow-xl border border-base-300 hover:border-primary/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary/20 transition-colors">
                      <MagnifyingGlassIcon className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-base-content">Block Explorer</h3>
                  </div>
                  <p className="text-base-content/70 leading-relaxed">
                    Explore your local blockchain, view transactions, and analyze contract interactions.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
