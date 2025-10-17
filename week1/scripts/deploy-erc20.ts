import { ethers, run } from "hardhat";

async function main() {
  const name = process.env.ERC20_NAME || "SAVE";
  const symbol = process.env.ERC20_SYMBOL || "SAVE";

  const initialSupply = BigInt(
    ethers.parseEther(process.env.ERC20_SUPPLY || "10000000")
  ); // 1,000,000 SAVE with 18 decimals

  const signers = await ethers.getSigners();
  const owner = signers[0].address;

  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy(name, symbol, owner, initialSupply);
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("ERC20 deployed:", address);

  if (process.env.VERIFY === "true") {
    console.log("Verifying...");
    await run("verify:verify", {
      address,
      constructorArguments: [name, symbol, owner, initialSupply.toString()],
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
