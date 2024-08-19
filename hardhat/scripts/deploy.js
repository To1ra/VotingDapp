const hre = require("hardhat");

async function main() {
  // Specify the initial owner address (could be the deployer's address)
  const [deployer] = await hre.ethers.getSigners();
  const initialOwner = deployer.address;

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the ERC20 token contract with the initial owner
  const myERCContract = await hre.ethers.getContractFactory("myERC");
  const deployMyERCContract = await myERCContract.deploy(initialOwner);

  // Check if the contract was deployed successfully
  const ercDeployment = await deployMyERCContract.waitForDeployment();
  if (!ercDeployment) {
    throw new Error("ERC20 contract deployment failed");
  }

  console.log(
    "ERC20 Token Contract deployed to:",
    await deployMyERCContract.getAddress()
  );

  // Now deploy the Voting contract using the address of the deployed ERC20 token
  const votingContract = await hre.ethers.getContractFactory("Voting");
  const deployVotingContract = await votingContract.deploy(
    await deployMyERCContract.getAddress()
  );

  // Check if the Voting contract was deployed successfully
  const votingDeployment = await deployVotingContract.waitForDeployment();
  if (!votingDeployment) {
    throw new Error("Voting contract deployment failed");
  }

  console.log(
    "Voting Contract deployed to:",
    await deployVotingContract.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/*
ERC20 Token Contract deployed to: 0xB3edBFC4DC9B276086BdcC06F6875ec2B9B5B534
Voting Contract deployed to: 0xfd6fa33cf64592CEb9b7907f40D823A08e96939b


Successfully verified contract myERC on the block explorer.
https://sepolia.etherscan.io/address/0xB3edBFC4DC9B276086BdcC06F6875ec2B9B5B534#code


Successfully verified contract Voting on the block explorer.
https://sepolia.etherscan.io/address/0xfd6fa33cf64592CEb9b7907f40D823A08e96939b#code

*/
