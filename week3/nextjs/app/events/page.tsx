"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Events: NextPage = () => {
    const { isConnected } = useAccount();
    const [eventType, setEventType] = useState<"token" | "mint" | "nft">("token");

  // Get token transfer events
    const { data: tokenEvents, isLoading: tokenTransferLoading } = useScaffoldEventHistory({
    contractName: "MyToken",
    eventName: "Transfer",
    fromBlock: 27851974n,
    watch: true,
  });

  // Filter mint events from transfer events (transfers from zero address)
  const mintEvents = tokenEvents?.filter(event => 
    event.args.from === "0x0000000000000000000000000000000000000000"
  ) || [];
  
  // Get NFT transfer events
  const { data: nftEvents, isLoading: nftLoading } = useScaffoldEventHistory({
    contractName: "MyNFT",
    eventName: "Transfer",
    fromBlock: 27851974n,
    watch: true,
  });
  
  // Determine which events to show based on selected tab
  const currentEvents = eventType === "token" ? tokenEvents || [] : 
                       eventType === "mint" ? mintEvents : 
                       nftEvents || [];
  const isLoading = eventType === "token" ? tokenTransferLoading : 
                   eventType === "mint" ? tokenTransferLoading : 
                   nftLoading;

    // Show connection prompt if wallet not connected
    if (!isConnected) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <h2 className="card-title justify-center">Contract Events</h2>
                <p>Please connect your wallet to view events</p>
              </div>
            </div>
          </div>
        );
      }
    

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
  <h1 className="text-3xl font-bold text-center mb-4">📜 Contract Events</h1>
  <p className="text-center text-gray-600">View transaction history for your contracts</p>
</div>


<div className="flex justify-center mb-6">
  <div className="tabs tabs-boxed">
    <button className={`tab ${eventType === "token" ? "tab-active" : ""}`} onClick={() => setEventType("token")}>
      Token Transfers ({tokenEvents?.length || 0})
    </button>
    <button className={`tab ${eventType === "mint" ? "tab-active" : ""}`} onClick={() => setEventType("mint")}>
      Token Mints ({mintEvents?.length || 0})
    </button>
    <button className={`tab ${eventType === "nft" ? "tab-active" : ""}`} onClick={() => setEventType("nft")}>
      NFT Activity ({nftEvents?.length || 0})
    </button>
  </div>
</div>


<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">
      {eventType === "token" ? "🪙 Token Transfers" : 
       eventType === "mint" ? "🪙 Token Mints" : 
       "🎨 NFT Events"}
    </h2>

    {isLoading ? (
      <div className="flex justify-center py-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    ) : currentEvents.length === 0 ? (
      <div className="text-center py-8 text-gray-500">
        <p>No events found</p>
        <p className="text-sm">
          {eventType === "token" ? "Transfer some tokens to see events here" : 
           eventType === "mint" ? "Mint some tokens to see events here" : 
           "Mint some NFTs to see events here"}
        </p>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>{eventType === "mint" ? "Type" : "From"}</th>
              <th>To</th>
              <th>{eventType === "token" ? "Amount" : eventType === "mint" ? "Amount" : "Token ID"}</th>
              <th>Block</th>
              <th>Transaction</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.slice(0, 20).map((event, index) => (
              <tr key={`${event.log.transactionHash}-${index}`}>
                <td>
                  {eventType === "mint" ? (
                    <span className="text-gray-500 italic">Mint</span>
                  ) : (
                    <Address address={event.args?.from || "0x0"} size="sm" />
                  )}
                </td>
                <td>
                  <Address address={event.args?.to || "0x0"} size="sm" />
                </td>
                <td>
                  {eventType === "token" || eventType === "mint" ? (
                    <span className="font-mono">{Number(formatEther(event.args?.[2] || 0n)).toFixed(4)} LSEA</span>
                  ) : (
                    <span className="badge badge-primary">#{event.args?.[2]?.toString() || "N/A"}</span>
                  )}
                </td>
                <td>
                  <span className="text-sm">{event.log.blockNumber.toString()}</span>
                </td>
                <td>
                  <a
                    href={`https://sepolia-blockscout.lisk.com/tx/${event.log.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-xs btn-outline"
                  >
                    View →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>

    </div>
  );
};

export default Events;
