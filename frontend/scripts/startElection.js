import * as Main from "./main.js";

let savedLocations = [];
let num = 0;
let candidateList = [];
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
const dipaliTokenAddress = "0xB3edBFC4DC9B276086BdcC06F6875ec2B9B5B534"; // Replace with the actual contract address

function initializeGrid() {
  const coordinatesDisplay = document.getElementById("coordinates-display");
  const gridContainer = document.getElementById("grid-container");
  gridContainer.style.display = "block";

  gridContainer.addEventListener("mousemove", (event) => {
    const rect = gridContainer.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      // Fallback or error handling if the container has not been properly initialized
      console.error("Grid container dimensions are zero.");
      return; // Exit the function to avoid invalid calculations
    }

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const gridX = (x - 0.5) * 2;
    const gridY = (0.5 - y) * 2;

    coordinatesDisplay.textContent = `Coordinates: (${gridX.toFixed(
      2
    )}, ${gridY.toFixed(2)})`;
  });

  gridContainer.addEventListener("click", (event) => {
    const rect = gridContainer.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      console.error("Grid container dimensions are zero.");
      return;
    }

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const gridX = (x - 0.5) * 2;
    const gridY = (0.5 - y) * 2;

    const location = [gridX.toFixed(2), gridY.toFixed(2)]; // Store as an array of numbers
    savedLocations = location;
    coordinatesDisplay.textContent =
      "Coordinates chosen at " + location.join(", ");
    gridContainer.style.display = "none";
  });
}

function writeCandidate() {
  const candidateName = document.getElementById("candidate").value.trim();
  if (candidateName === "") {
    alert("Please enter a candidate name");
    return;
  }
  const location = savedLocations;
  if (location === "") {
    alert("Please save a location");
    return;
  }
  // Retrieve existing candidates from the candidate list

  for (let i = 0; i < candidateList.length; i++) {
    if (candidateList[i][0] === candidateName) {
      alert("This candidate name is already used.");
      return;
    } else if (candidateList[i][1] === location) {
      alert("This location is already assigned.");
      return;
    }
  }

  candidateList.push([candidateName, location]);
  // If no duplicates, add the candidate
  document.getElementById(
    "candidateList"
  ).innerHTML += `<div id="candidateID${num++}">${candidateName}, ${location}</div> `;
  console.log(candidateList);
}

function prepareCoordinatesForContract(coordinates) {
  return coordinates.map((coord) => parseInt((coord *= 100)));
}

async function startElection() {
  const electionActive = await Main.contract.electionStarted();
  if (!electionActive) {
    const duration = parseInt(document.getElementById("electionTime").value);
    const candidatesNames = candidateList.map((candidate) => candidate[0]);
    const candidatesCoordinates = candidateList.map((candidate) =>
      prepareCoordinatesForContract(candidate[1])
    );
    console.log(candidatesCoordinates);

    try {
      const txResponse = await Main.contract.startElection(
        candidatesNames,
        candidatesCoordinates,
        duration
      );
      const txReceipt = await txResponse.wait();
      alert("Election started", txReceipt.transactionHash);
    } catch (error) {
      console.error("Error in starting election: ", error);
    }
  }
}

async function checkBalance() {
  // Assuming the provider is already configured elsewhere in your project
  const provider = Main.provider;

  const address = Main.contract.address;

  const dipaliTokenContract = new ethers.Contract(
    dipaliTokenAddress,
    dipaliTokenABI,
    provider
  );
  try {
    const balance = await dipaliTokenContract.balanceOf(address);
    return parseInt(ethers.utils.formatEther(balance)) + " Dipali Tokens";
  } catch (error) {
    console.error("Error fetching Dipali Token balance:", error);
    return "Error fetching balance";
  }
}

if (window.location.href.includes("AdminPanel")) {
  document
    .getElementById("fundContract")
    .addEventListener("click", async () => {
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
      }
    });

  document
    .getElementById("addTheCandidate")
    .addEventListener("click", writeCandidate);

  document
    .getElementById("submitElection")
    .addEventListener("click", startElection);

  document.getElementById("endElection").addEventListener("click", () => {
    Main.contract.payVoters();
    alert("Election ended");
  });
}
let candidateListJS = candidateList;

export { initializeGrid, candidateListJS, checkBalance, savedLocations };
