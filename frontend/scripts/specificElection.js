import * as Main from "./main.js";
import { initializeGrid } from "./startElection.js";
let isActiveElection;
let allCoords = [];
let ids = [];

async function loadSpecificElection() {
  // Assumes loadContract() initializes your smart contract
  const contract = Main.contract;
  const owner = await Main.contract.owner();
  isActiveElection = await contract.electionStarted();
  const userAddress = await Main.signer.getAddress();

  if (userAddress.toLowerCase() === owner.toLowerCase()) {
    document.getElementById("addCandidate").style.display = "block";
  }

  async function updateElectionTimer() {
    const timerElement = document.getElementById("time");
    setInterval(async () => {
      isActiveElection = await contract.electionStarted();
      if (isActiveElection) {
        const remainingTime = await contract.electionTimer();
        const timeInSeconds = ethers.BigNumber.from(remainingTime).toNumber();
        timerElement.textContent = `${timeInSeconds} seconds remaining`;
        if (timeInSeconds <= 0) {
          window.location.href = "http://127.0.0.1:5500/frontend/homePage.html";
        }
      } else {
        window.location.href = "http://127.0.0.1:5500/frontend/homePage.html";
      }
    }, 2500);
  }

  await updateElectionTimer();
  await loadCandidates();

  const modal = document.getElementById("surveyModal");
  const openSurveyButton = document.getElementById("openSurvey");
  const submitSurveyButton = document.getElementById("submitSurvey");

  // Open Modal
  openSurveyButton.addEventListener("click", function () {
    modal.style.display = "block";
  });

  // Close Modal and Submit Survey
  submitSurveyButton.addEventListener("click", async function () {
    const scaleA = document.getElementById("scaleA").value;
    const scaleB = document.getElementById("scaleB").value;
    const scaleC = document.getElementById("scaleC").value;
    const scaleD = document.getElementById("scaleD").value;

    if (scaleA === "" || scaleB === "" || scaleC === "" || scaleD === "") {
      alert("Please answer all questions.");
    } else {
      modal.style.display = "none";
      anoynmouslyVoting(scaleA, scaleB, scaleC, scaleD);
    }
  });

  // Modify the anoynmouslyVoting function to accept the scale values
  async function anoynmouslyVoting(a, b, c, d) {
    // Replace with actual data
    // Replace with actual data
    isActiveElection = await contract.electionStarted();
    if (isActiveElection) {
      let res1 = a - b;
      let res2 = c - d;
      let chosenID = calculateClosestID(res1, res2, allCoords, ids);
      await contract.voteTo(chosenID);
      alert("Vote successfully sent!");
    } else {
      alert("You cannot vote when there is no election.");
    }
  }

  function calculateClosestID(res1, res2, allCoords, ids) {
    let min = 2;
    let chosenID = 1;

    for (let i = 0; i < allCoords.length; i++) {
      let minTemp = Math.hypot(res1 - allCoords[i][0], res2 - allCoords[i][1]);
      if (minTemp < min) {
        min = minTemp;
        chosenID = ids[i];
      }
    }
    return chosenID;
  }

  // Initialize the timer update function
  updateElectionTimer();

  async function loadCandidates() {
    //document.getElementById("grid-area").style.display = block;
    isActiveElection = await contract.electionStarted();
    let matrixData = [];
    if (!isActiveElection) return;
    else {
      const candidates = await contract.retrieveVoterList();
      const candidateBoard = document.getElementById("CandidateBoard");
      candidateBoard.innerHTML = ""; // Clear previous candidates

      for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        const candidateElement = document.createElement("div");
        candidateElement.innerHTML = `ID: ${candidate.id} - Name: ${
          candidate.name
        } - Preference: ${candidate.politicalPreference.map((x) => x / 100)}`;
        candidateBoard.appendChild(candidateElement);
        allCoords.push(candidate.politicalPreference.map((x) => x / 100));
        ids.push(candidate.id);
        matrixData.push(candidate);
      }

      plotPoints(matrixData);
    }
  }

  function plotPoints(data) {
    const pointContainer = document.getElementById("point-container");
    if (!pointContainer) {
      console.error("Point container not found.");
      return;
    }

    pointContainer.innerHTML = ""; // Clear existing points only
    console.log(data);
    data.forEach((item) => {
      const name = item.name;
      const coords = item.politicalPreference.map((x) => {
        return parseFloat(ethers.BigNumber.from(x).toString()) / 100;
      });

      console.log(name, coords);
      // Calculate position based on the grid's dimensions
      const posX = ((coords[0] + 1) / 2) * 600 - 5; // Center the point
      const posY = ((1 - coords[1]) / 2) * 600 - 5; // Invert y-axis and center the point

      // Create the point
      const point = document.createElement("div");
      point.classList.add("point");
      point.style.left = `${posX}px`;
      point.style.top = `${posY}px`;

      // Create the label for the point
      const label = document.createElement("div");
      label.classList.add("point-label");
      label.style.left = `${posX + 15}px`; // Position the label right of the point
      label.style.top = `${posY}px`;
      label.textContent = name;

      // Append both the point and its label to the point container
      pointContainer.appendChild(point);
      pointContainer.appendChild(label);
    });
  }

  // Example matrix - replace with actual data or function to retrieve data
  await loadCandidates(); // Load candidates on page load}

  // Event listeners

  document
    .getElementById("sendVote")
    .addEventListener("click", async function () {
      isActiveElection = await contract.electionStarted();
      if (isActiveElection) {
        const candidateId = parseInt(
          document.getElementById("voteToSend").value
        );
        await contract.voteTo(candidateId);
        alert("Vote successfully sent!");
      } else alert("You cannt vote when there is no election");
    });

  document.getElementById("addCandidateBtn").addEventListener("click", () => {
    document.getElementById("newCandidateModal").style.display = "block";
    initializeGrid();
  });

  document.getElementById("addTheCandidate").addEventListener("click", () => {
    document.getElementById("candidate").value = "";
    document.getElementById("newCandidateModal").style.display = "none";
  });

  document.querySelector(".close1").addEventListener("click", () => {
    document.getElementById("candidate").value = "";
    document.getElementById("newCandidateModal").style.display = "none";
  });

  window.onclick = function (event) {
    if (event.target == document.getElementById("newCandidateModal")) {
      document.getElementById("newCandidateModal").style.display = "none";
    }
  };
}

export { loadSpecificElection };

// This assumes your contract methods are named appropriately and correctly return values.
// Adjust the methods and properties based on your actual contract's API.
