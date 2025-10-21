"use client";

import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export const TokenBalance = () => {
  const { address: connectedAddress } = useAccount();
  const [transferRecipient, setTransferRecipient] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [mintRecipient, setMintRecipient] = useState("");
  const [mintAmount, setMintAmount] = useState("");

  const { data: tokenBalance } = useScaffoldContractRead<"MyToken", "balanceOf">({
    contractName: "MyToken",
    functionName: "balanceOf",
    args: [connectedAddress as `0x${string}` | undefined] as [`0x${string}` | undefined],
  });

  const { data: tokenSymbol } = useScaffoldContractRead({
    contractName: "MyToken",
    functionName: "symbol",
  });

  const { data: tokenName } = useScaffoldContractRead({
    contractName: "MyToken",
    functionName: "name",
  });

  const { writeAsync: writeTransferAsync, isLoading: isTransferring } = useScaffoldContractWrite<
    "MyToken",
    "transfer"
  >({
    contractName: "MyToken",
    functionName: "transfer",
    args: [
      transferRecipient as `0x${string}` | undefined,
      transferAmount ? parseEther(transferAmount) : undefined,
    ] as [`0x${string}` | undefined, bigint | undefined],
  });

  const { writeAsync: writeMintAsync, isLoading: isMinting } = useScaffoldContractWrite<"MyToken", "mint">({
    contractName: "MyToken",
    functionName: "mint",
    args: [
      mintRecipient as `0x${string}` | undefined,
      mintAmount ? parseEther(mintAmount) : undefined,
    ] as [`0x${string}` | undefined, bigint | undefined],
  });

  const handleTransfer = async () => {
    if (!transferRecipient || !transferAmount) {
      notification.error("Please provide recipient and amount");
      return;
    }
    try {
      await writeTransferAsync({
        args: [transferRecipient as `0x${string}`, parseEther(transferAmount)] as [`0x${string}`, bigint],
      });
      notification.success("Token transfer submitted");
      setTransferRecipient("");
      setTransferAmount("");
    } catch (err) {
      notification.error("Transfer failed");
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const handleMint = async () => {
    if (!mintRecipient || !mintAmount) {
      notification.error("Please provide recipient and amount to mint");
      return;
    }
    try {
      await writeMintAsync({
        args: [mintRecipient as `0x${string}`, parseEther(mintAmount)] as [`0x${string}`, bigint],
      });
      notification.success("Mint transaction submitted");
      setMintRecipient("");
      setMintAmount("");
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
          <h2 className="card-title">Token Balance</h2>
          <p>Please connect your wallet to view token balance</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {tokenName} ({tokenSymbol})
        </h2>
        <div className="stats">
          <div className="stat">
            <div className="stat-title">Your Balance</div>
            <div className="stat-value text-info">
              {formatEther(tokenBalance || BigInt('0'))}
            </div>
            <div className="stat-desc">{tokenSymbol}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
