"use client";

import { useState } from "react";
import { isAddress, parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export const TokenTransfer = () => {
  const { address: connectedAddress } = useAccount();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const { writeAsync: writeMyTokenAsync, isMining } = useScaffoldContractWrite<"MyToken", "transfer">({
    contractName: "MyToken",
    functionName: "transfer",
    args: [recipient as `0x${string}` | undefined, amount ? parseEther(amount) : undefined] as [
      `0x${string}` | undefined,
      bigint | undefined,
    ],
  });

  const handleTransfer = async () => {
    if (!recipient || !amount) {
      notification.error("Please fill in all fields");
      return;
    }

    if (!isAddress(recipient)){
        notification.error("Please provide valid address");
        return;
    }

    try {
      await writeMyTokenAsync({
        args: [recipient as `0x${string}`, parseEther(amount)] as [`0x${string}`, bigint],
      });

      notification.success("Token transfer successful!");
      setRecipient("");
      setAmount("");
    } catch (error) {
      console.error("Transfer failed:", error);
      notification.error("Transfer failed. Please try again.");
    }
  };

  if (!connectedAddress) {
    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Transfer Tokens</h2>
          <p>Please connect your wallet to transfer tokens</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Transfer Tokens</h2>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Recipient Address</span>
          </label>
          <input
            type="text"
            placeholder="0x..."
            className="input input-bordered w-full max-w-xs"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Amount</span>
          </label>
          <input
            type="number"
            placeholder="0.0"
            className="input input-bordered w-full max-w-xs"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleTransfer} disabled={!recipient || !amount || isMining}>
            {isMining ? "Transferring..." : "Transfer"}
          </button>
        </div>
      </div>
    </div>
  );
};
