document.addEventListener("DOMContentLoaded", () => {
  const ethereum = window.ethereum;
  const provider = new ethers.providers.Web3Provider(ethereum);
  let signer;
  let contract;
  let flag = false;
  let isResultsVisible = false; // Track visibility of results
  let refreshInterval; // Interval for refreshing the page data

  const contractAddress = "0xfd6fa33cf64592CEb9b7907f40D823A08e96939b";
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
      inputs: [
        {
          internalType: "string[]",
          name: "_candidates",
          type: "string[]",
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

  // Elements from the HTML
  const connectWalletButton = document.getElementById("connectWallet");
  const sendVoteButton = document.getElementById("sendVote");
  const startElectionButton = document.getElementById("startAnElection");
  const addCandidateButton = document.getElementById("addTheCandidate");
  const showResultButton = document.getElementById("showResult");

  const voteInput = document.getElementById("vote");
  const candidateInput = document.getElementById("candidate");
  const electionDurationInput = document.getElementById("electionDuration");
  const candidatesInput = document.getElementById("candidiates");

  const timerElement = document.getElementById("time");
  const candidateBoard = document.getElementById("CandidateBoard");
  const resultSection = document.getElementById("result");

  async function connectWallet() {
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);

    const userAddress = await signer.getAddress();
    const ownerAddress = await contract.owner();

    if (userAddress.toLowerCase() === ownerAddress.toLowerCase()) {
      document.getElementById("admin").style.display = "block";
    }

    document.getElementById("votingStation").style.display = "block";
    document.getElementById("connectMetamask").style.display = "none";
    refreshInterval = setInterval(refreshPageData, 1500); // Refresh every 1. seconds

    const electionActive = await contract.electionStarted(); // This method needs to be view type in your Solidity contract
    if (electionActive) {
      await displayCandidates();
    }
  }

  async function displaySortedVoters() {
    const voterList = [...(await contract.retrieveVoterList())]; // Shallow copy the array
    voterList.sort((a, b) => {
      if (a.numberOfvotes > b.numberOfvotes) {
        return -1;
      }
      if (a.numberOfvotes < b.numberOfvotes) {
        return 1;
      }
      return 0;
    });
    return voterList;
  }
  async function vote() {
    const electionActive = await contract.electionStarted(); // This method needs to be view type in your Solidity contract
    if (electionActive) {
      const id = parseInt(voteInput.value);
      await contract.voteTo(id);
    } else alert("You cannt vote when there is no election");
  }

  async function refreshPageData() {
    const electionActive = await contract.electionStarted(); // This method needs to be view type in your Solidity contract
    if (!electionActive) {
      timerElement.innerText = "No election currently running";
      candidateBoard.innerHTML = "<tr><th>ID No.</th><th>Candidate</th></tr>";
    } else {
      const timeLeft = await contract.electionTimer();
      if (timeLeft > 0) {
        timerElement.innerText = `${timeLeft} seconds left`;
        await displayCandidates();
      } else {
        timerElement.innerText = "Voting has ended";
        document.getElementById("showResult").style.display = "block";
      }
    }
  }
  async function startElection() {
    const electionActive = await contract.electionStarted(); // Ensure this is a view function in Solidity
    if (!electionActive) {
      flag = false;
      const duration = parseInt(electionDurationInput.value);
      const candidates = candidatesInput.value.split(",");
      document.getElementById("MainContent").style.display = "none";
      document.getElementById("Loader").style.display = "block";
      const txResponse = await contract.startElection(candidates, duration);
      const txReceipt = await txResponse.wait();
      document.getElementById("Loader").style.display = "none";
      document.getElementById("MainContent").style.display = "block";

      await displayCandidates();
    } else alert("An election is already ongoing.");
  }

  async function distributeTokens() {
    try {
      const txResponse = await contract.payVoters(); // Call the payVoters function in your contract
      await txResponse.wait(); // Wait for the transaction to be mined
      console.log("Tokens distributed to voters");
    } catch (error) {
      console.error("Error distributing tokens: ", error);
    }
  }

  async function showResults() {
    const results = await displaySortedVoters();
    const winner = results[0]; // Assuming the sorted list has the winner at index 0
    const winnerName = document.getElementById("winnerName");
    winnerName.innerText = `${winner.name} is the Winner!`;

    // Display the pop-up
    const modal = document.getElementById("winnerPopup");
    const span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };

    // Create results in the results table
    const resultsBoard = document.getElementById("resultsBoard");
    resultsBoard.innerHTML =
      "<tr><th>ID No.</th><th>Candidate</th><th>Number Of Votes</th></tr>";
    results.forEach((result) => {
      const row = resultsBoard.insertRow();
      row.insertCell(0).innerText = result.id;
      row.insertCell(1).innerText = result.name;
      row.insertCell(2).innerText = result.numberOfvotes;
    });
  }

  function buttonShowResults() {
    const resultSection = document.getElementById("result");
    resultSection.style.display =
      resultSection.style.display === "none" ? "block" : "none";
  }

  async function displayCandidates() {
    const candidates = await contract.retrieveVoterList();
    // Clear the board before displaying candidates
    candidateBoard.innerHTML = "<tr><th>ID No.</th><th>Candidate</th></tr>";
    candidates.forEach((candidate) => {
      const row = candidateBoard.insertRow();
      row.insertCell(0).innerText = candidate.id;
      row.insertCell(1).innerText = candidate.name;
    });
  }

  async function addCandidate() {
    const electionActive = await contract.electionStarted(); // This method needs to be view type in your Solidity contract
    if (electionActive) {
      const name = candidateInput.value;
      await contract.addCandidate(name);
      await displayCandidates();
    } else alert("You cannt add candidate when there is no election");
  }

  connectWalletButton.addEventListener("click", connectWallet);
  sendVoteButton.addEventListener("click", vote);
  startElectionButton.addEventListener("click", startElection);
  addCandidateButton.addEventListener("click", addCandidate);
  document
    .getElementById("showResult")
    .addEventListener("click", async function () {
      if (!flag) {
        await showResults();
        await distributeTokens();
        flag = true;
      }
      buttonShowResults();
    });
});
