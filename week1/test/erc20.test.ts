import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyToken", function () {
  it("mints initial supply to owner and allows mint by owner", async function () {
    const [owner, user] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MyToken");
    const initialSupply = 1000n * 10n ** 18n;
    const token = await Token.deploy(
      "MyToken",
      "MTK",
      owner.address,
      initialSupply
    );
    await token.waitForDeployment();

    expect(await token.balanceOf(owner.address)).to.equal(initialSupply);

    await token.connect(owner).mint(user.address, 1n);
    expect(await token.balanceOf(user.address)).to.equal(1n);
  });
});
