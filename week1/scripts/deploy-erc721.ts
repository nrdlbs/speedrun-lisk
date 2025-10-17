import { ethers, run } from "hardhat";

async function main() {
  const name = process.env.ERC721_NAME || "SaveNFT";
  const symbol = process.env.ERC721_SYMBOL || "SNFT";
  const baseURI = process.env.ERC721_BASE_URI || "ipfs://example/";
  const owner =
    process.env.DEPLOYER_ADDRESS || (await ethers.getSigners())[0].address;

  const NFT = await ethers.getContractFactory("MyNFT");
  const nft = await NFT.deploy(name, symbol, baseURI, owner);
  await nft.waitForDeployment();

  const address = await nft.getAddress();
  console.log("ERC721 deployed:", address);

  if (process.env.VERIFY === "true") {
    console.log("Verifying...");
    await run("verify:verify", {
      address,
      constructorArguments: [name, symbol, baseURI, owner],
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
