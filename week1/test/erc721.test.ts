import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyNFT", function () {
  it("mints sequential tokens to target and exposes baseURI", async function () {
    const [owner, user] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("MyNFT");
    const nft = await NFT.deploy(
      "MyNFT",
      "MNFT",
      "ipfs://base/",
      owner.address
    );
    await nft.waitForDeployment();

    const tx = await nft.connect(owner).safeMint(user.address);
    await tx.wait();
    expect(await nft.ownerOf(1n)).to.equal(user.address);

    await nft.connect(owner).setBaseURI("ipfs://new/");
    // tokenURI(1) should start with new base
    const tokenUri = await nft.tokenURI(1n);
    expect(tokenUri.startsWith("ipfs://new/")).to.equal(true);
  });
});
