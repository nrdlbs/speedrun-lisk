import { run } from "hardhat";

async function main() {
  const address = process.env.CONTRACT_ADDRESS || "";
  if (!address) throw new Error("CONTRACT_ADDRESS env required");

  const args = process.env.ARGS ? JSON.parse(process.env.ARGS) : [];

  await run("verify:verify", {
    address,
    constructorArguments: args,
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
