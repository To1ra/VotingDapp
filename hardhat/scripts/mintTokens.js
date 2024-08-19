const { ethers } = require("hardhat");

async function main() {
  // The address of the deployed ERC20 contract
  const ercContractAddress = "0xB3edBFC4DC9B276086BdcC06F6875ec2B9B5B534"; // Replace with your ERC20 contract address

  // ABI for the ERC20 contract containing the mintFifty function
  const ercContractABI = [
    {
      inputs: [],
      name: "mintFifty",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  // Get the signer (the owner of the ERC20 token contract)
  const [owner] = await ethers.getSigners();
  console.log("Minting tokens from address:", owner.address);

  // Create the contract instance
  const ercContract = new ethers.Contract(
    ercContractAddress,
    ercContractABI,
    owner
  );

  try {
    // Call the mintFifty function
    const txResponse = await ercContract.mintFifty();
    console.log("Transaction submitted, waiting for confirmation...");
    await txResponse.wait(); // Wait for the transaction to be mined
    console.log("Tokens minted successfully!");
  } catch (error) {
    console.error("Error minting tokens:", error);
  }
}

// Run the script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
