"use client";

import { useState } from "react";
import { isAddress, parseEther } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export const TokenMint = () => {
  const { address: connectedAddress } = useAccount();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const { writeAsync: writeMintAsync, isMining } = useScaffoldContractWrite<"MyToken", "mint">({
    contractName: "MyToken",
    functionName: "mint",
    args: [recipient as `0x${string}` | undefined, amount ? parseEther(amount) : undefined] as [
        `0x${string}` | undefined,
        bigint | undefined,
      ],
  });

  const handleMint = async () => {
    if (!recipient || !amount) {
      notification.error("Please provide recipient and amount to mint");
      return;
    }
    if (!isAddress(recipient)){
        notification.error("Please provide valid address");
        return;
    }
    try {
      await writeMintAsync({
        args: [recipient as `0x${string}`, parseEther(amount)] as [`0x${string}`, bigint],
      });
      notification.success("Mint transaction submitted");
      setRecipient("");
      setAmount("");
    } catch (err) {
      notification.error("Mint failed (are you the owner?)");
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  if (!connectedAddress) {
    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Mint Tokens</h2>
          <p>Please connect your wallet to mint tokens</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Mint Tokens (Owner only)</h2>
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
        <div className="card-actions justify-between items-center">
          <Address address={connectedAddress} />
          <button className="btn" onClick={handleMint} disabled={!recipient || !amount || isMining}>
            {isMining ? "Minting..." : "Mint"}
          </button>
        </div>
      </div>
    </div>
  );
};


