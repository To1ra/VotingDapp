const hre = require("hardhat");

async function main() {
  // Now deploy the Voting contract using the address of the deployed ERC20 token
  const votingContract = await hre.ethers.getContractFactory("Voting");
  const deployVotingContract = await votingContract.deploy(
    "0xB3edBFC4DC9B276086BdcC06F6875ec2B9B5B534"
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
DONT TOUCH IT 
Successfully verified contract myERC on the block explorer.
https://sepolia.etherscan.io/address/0xB3edBFC4DC9B276086BdcC06F6875ec2B9B5B534#code
DONT TOUCH IT 


Voting Contract deployed to: 0xf5348F3219250BF86a7f90b81421429D81Dbab49

Successfully verified contract Voting on the block explorer.
https://sepolia.etherscan.io/address/0xD0355BAd63af6085CC21c80ab5F1BE7d7f71123e#code
*/
