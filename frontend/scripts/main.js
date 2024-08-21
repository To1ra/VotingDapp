import { loadSpecificElection } from "./specificElection.js";

const ethereum = window.ethereum;
const provider = new ethers.providers.Web3Provider(ethereum);
let signer;
let contract;

const contractAddress = "0x453fAcB289b125B523ec0ce508f33546079F4c4c";
const contractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenContract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "int256[]",
        name: "_politicalPreference",
        type: "int256[]",
      },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numberOfvotes",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "electionStarted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "electionTimer",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "listOfVoters",
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
    name: "payVoters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "retrieveVoterList",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "numberOfvotes",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "int256[]",
            name: "politicalPreference",
            type: "int256[]",
          },
        ],
        internalType: "struct Voting.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "retrieveVotersAddress",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_candidates",
        type: "string[]",
      },
      {
        internalType: "int256[][]",
        name: "_politicalPreference",
        type: "int256[][]",
      },
      {
        internalType: "uint256",
        name: "_votingDuration",
        type: "uint256",
      },
    ],
    name: "startElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenContract",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "voteTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "votingEnd",
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
    name: "votingStart",
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
];

// Export the variables
export { signer, contract, contractAddress, contractABI };

document.addEventListener("DOMContentLoaded", async function () {
  const userNameDisplay = document.getElementById("userNameDisplay");

  if (window.location.href != "http://127.0.0.1:5500/homePage.html") {
    await checkIfWalletIsConnected();
  }

  if (window.location.href.includes("SpecificElection")) {
    await loadSpecificElection();
  }

  async function checkIfWalletIsConnected() {
    if (ethereum) {
      try {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          await connectWallet();
        } else {
          console.log("Log in into metamask");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  async function connectWallet() {
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    const userAddress = await signer.getAddress();
    const userName = userAddress.substring(userAddress.length - 5);
    localStorage.setItem("userName", userName);
    //console.log("connected");
    userNameDisplay.innerText = userName;
    const ownerAddress = await contract.owner();
    if (userAddress.toLowerCase() === ownerAddress.toLowerCase()) {
      document.getElementById("admin").style.display = "block";
    }

    //document.getElementById("connectMetamask").style.display = "none";
    // document.querySelector(".navbar").style.display = "block";
  }
});
