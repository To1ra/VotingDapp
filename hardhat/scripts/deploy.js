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

//Contract deployed to: 0x05922204213973ABe5654176422A859b6dD7c71A
//https://sepolia.etherscan.io/address/0x05922204213973ABe5654176422A859b6dD7c71A#code
