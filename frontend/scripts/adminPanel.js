import * as Main from "./main.js";
import { startElection } from "./startElection.js";

const dipaliTokenABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintFifty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const dipaliTokenAddress = "0xB3edBFC4DC9B276086BdcC06F6875ec2B9B5B534";

document.addEventListener("DOMContentLoaded", async () => {
  const toHide = document.getElementsByClassName("btn1");
  const toHideText = document.getElementById("toHide");
  const loader = document.getElementById("loader");
  const ElectionModal = document.getElementById("createElectionModal");
  const candidateList = document.getElementById("candidateList");
  const closeButton = document.getElementById("closeElectionModal");
  const tokenBalanceModal = document.getElementById("tokenBalanceModal");
  const btnTokenBalance = document.getElementById("tokenBalance");
  const closeBtnTokenBalance =
    tokenBalanceModal.getElementsByClassName("close")[0];

  await Main.checkIfWalletIsConnected();
  let startElectionStuff = await new startElection();
  const userAddress = await Main.signer.getAddress();
  const ownerAddress = await Main.contract.owner();
  if (!(userAddress.toLowerCase() === ownerAddress.toLowerCase())) {
    window.location.href = "homePage.html";
  }
  async function fundContract() {
    for (var i = 0; i < toHide.length; i++) {
      toHide[i].style.display = "none";
    }
    toHideText.style.display = "none";
    loader.style.display = "block";
    tokenBalanceModal.style.display = "none";
    document
      .getElementById("tokenBalanceModal")
      .getElementsByClassName("close")[0];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Request account access if needed
    const signer = provider.getSigner();

    // Correct and complete Dipali Token contract ABI and Address

    const dipaliTokenContract = new ethers.Contract(
      dipaliTokenAddress,
      dipaliTokenABI,
      signer
    );

    const toAddress = Main.contract.address; // Ensure this is correctly pointing to the recipient address
    const amountInWei = ethers.utils.parseUnits("100", 18); // 100 tokens assuming 18 decimals

    if (toAddress && amountInWei) {
      try {
        //
        const txResponse = await dipaliTokenContract.transfer(
          toAddress,
          amountInWei,
          {
            gasLimit: 100000, // Set a manual gas limit
          }
        );
        console.log("Transaction Hash:", txResponse.hash);
        const txReceipt = await txResponse.wait();

        console.log("Transaction confirmed in block:", txReceipt.blockNumber);
      } catch (error) {
        console.error("Error sending Dipali Tokens:", error);
      } finally {
        loader.style.display = "none";
        for (var i = 0; i < toHide.length; i++) {
          toHide[i].style.display = "block";
        }
        toHideText.style.display = "block";
      }
    }
  }

  //  --- DOM MANIPULATIONS ---

  // token balance modal
  btnTokenBalance.addEventListener("click", async () => {
    tokenBalanceModal.style.display = "block";
    const num = await startElectionStuff.checkBalance();
    document.getElementById("tokenBalanceDisplay").innerHTML = num;
  });

  document
    .getElementById("fundContract")
    .addEventListener("click", fundContract);

  document.getElementById("addTheCandidate").addEventListener("click", () => {
    startElectionStuff.writeCandidate();
    document.getElementById("candidate").value = "";
    document.getElementById("newCandidateModal").style.display = "none";
  });

  document
    .getElementById("submitElection")
    .addEventListener("click", async () => {
      await startElectionStuff.startElectionFunction();
    });

  document.getElementById("endElection").addEventListener("click", async () => {
    let txResponse;
    try {
      const test = Main.contract.retrieveVotersAddress();
      const owner = await Main.contract.owner();
      const admin = await Main.contract.admin();
      const ended = await Main.contract.electionStarted();
      if (admin) {
        alert("Election already ended");
        return;
      } else if (ended) {
        alert("Election time didnt end yet");
        return;
      } else if (owner in test && test.length == 1) {
        alert("Voters have already been paid");
      }

      for (var i = 0; i < toHide.length; i++) {
        toHide[i].style.display = "none";
      }
      toHideText.style.display = "none";
      loader.style.display = "block";
      txResponse = await Main.contract.payVoters();
      alert("Voters have been paid");
    } catch (error) {
      console.error(error);
    } finally {
      if (txResponse) {
        const wait = await txResponse.wait();
      }
      for (var i = 0; i < toHide.length; i++) {
        toHide[i].style.display = "block";
      }
      toHideText.style.display = "block";
      loader.style.display = "none";
    }
  });

  closeButton.addEventListener("click", () => {
    ElectionModal.style.display = "none";
    startElectionStuff = new startElection();
    candidateList.innerHTML = "";
  });

  // Show election modal
  document.getElementById("createElection").addEventListener("click", () => {
    ElectionModal.style.display = "block";
  });

  // The plus button in the create election modal
  document.getElementById("addCandidate").addEventListener("click", () => {
    document.getElementById("newCandidateModal").style.display = "block";
    startElectionStuff.initializeGrid();
  });

  // Close button in the create election modal
  document.querySelector(".close1").addEventListener("click", () => {
    document.getElementById("candidate").value = "";
    document.getElementById("newCandidateModal").style.display = "none";
  });

  // Close button in the token balance modal
  closeBtnTokenBalance.addEventListener("click", () => {
    tokenBalanceModal.style.display = "none";
  });

  window.onclick = function (event) {
    if (event.target === tokenBalanceModal) {
      tokenBalanceModal.style.display = "none";
    }
  };

  window.onclick = function (event) {
    if (event.target == document.getElementById("newCandidateModal")) {
      document.getElementById("newCandidateModal").style.display = "none";
    }
  };

  window.onclick = function (event) {
    if (event.target === ElectionModal) {
      ElectionModal.style.display = "none";
      candidateList.innerHTML = "";
    }
  };
});
