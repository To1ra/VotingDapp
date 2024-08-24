import * as Main from "./main.js";

const ElectionModal = document.getElementById("createElectionModal");
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

class startElection {
  constructor() {
    this.savedLocations = [];
    this.candidateList = [];
    this.num = 0;
    this.toHide = document.getElementById("toHide");
    this.loader = document.getElementById("loader");
    this.ButtonHide = document.getElementsByClassName("btn1");
  }

  initializeGrid() {
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
      if (rect.width === 0 || rect.height === 0) return;

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const gridX = (x - 0.5) * 2;
      const gridY = (0.5 - y) * 2;

      this.savedLocations = [gridX.toFixed(2), gridY.toFixed(2)]; // Store as an array of numbers

      coordinatesDisplay.textContent =
        "Coordinates chosen at " + this.savedLocations.join(", ");
      gridContainer.style.display = "none";
    });
  }

  writeCandidate() {
    const candidateName = document.getElementById("candidate").value.trim();
    if (!candidateName) {
      alert("Please enter a candidate name");
      return;
    }
    if (!this.savedLocations) {
      alert("Please save a location");
      return;
    }
    // Retrieve existing candidates from the candidate list

    for (let i = 0; i < this.candidateList.length; i++) {
      if (this.candidateList[i][0] === candidateName) {
        alert("This candidate name is already used.");
        return;
      } else if (this.candidateList[i][1] === this.savedLocations) {
        alert("This location is already assigned.");
        return;
      }
    }

    this.candidateList.push([candidateName, this.savedLocations]);
    console.log(this.candidateList);
    // If no duplicates, add the candidate
    document.getElementById(
      "candidateList"
    ).innerHTML += `<div id="candidateID${this.num++}">${candidateName}, ${
      this.savedLocations
    }</div> `;
    console.log(this.candidateList.length);
  }

  async startElectionFunction() {
    const electionActive = await Main.contract.electionStarted();
    if (!electionActive) {
      const duration = parseInt(document.getElementById("electionTime").value);
      console.log(this.candidateList);
      const candidatesNames = this.candidateList.map(
        (candidate) => candidate[0]
      );
      const candidatesCoordinates = this.candidateList.map((candidate) =>
        prepareCoordinatesForContract(candidate[1])
      );
      console.log(candidatesCoordinates);

      try {
        if (!duration) {
          alert("You have to submit the duration of the election!");
          return;
        }
        loader.style.display = "block";
        for (let i = 0; i < this.ButtonHide.length; i++) {
          this.ButtonHide[i].style.display = "none";
        }
        toHide.style.display = "none";
        ElectionModal.style.display = "none";
        const txResponse = await Main.contract.startElection(
          candidatesNames,
          candidatesCoordinates,
          duration
        );
        const txReceipt = await txResponse.wait();
        alert("Election started", txReceipt.transactionHash);
      } catch (error) {
        console.error("Error in starting election: ", error);
      } finally {
        loader.style.display = "none";
        for (let i = 0; i < this.ButtonHide.length; i++) {
          this.ButtonHide[i].style.display = "block";
        }
        toHide.style.display = "block";
      }
    } else {
      alert("Election already started");
      return;
    }
  }

  async checkBalance() {
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
}

function prepareCoordinatesForContract(coordinates) {
  return coordinates.map((coord) => parseInt((coord *= 100)));
}

export { startElection };
