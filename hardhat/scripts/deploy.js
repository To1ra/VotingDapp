const hre = require("hardhat");

async function main() {
  const votingContract = await hre.ethers.getContractFactory("Voting");
  const deployVotingContract = await votingContract.deploy();

  console.log("Contract deployed to:", deployVotingContract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//Contract deployed to: 0xaaF2e28a24B52e468B34A3F1727e42a2f91E3B5E
//https://sepolia.etherscan.io/address/0xaaF2e28a24B52e468B34A3F1727e42a2f91E3B5E#code
