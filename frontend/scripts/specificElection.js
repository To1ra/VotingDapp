import * as Main from "./main.js";
import { startElection } from "./startElection.js";
const modal = document.getElementById("surveyModal");
const openSurveyButton = document.getElementById("openSurvey");
const submitSurveyButton = document.getElementById("submitSurvey");

class specificElection {
  constructor() {
    this.isActiveElection = false;
    this.allCoords = [];
    this.ids = [];
    this.savedLoc = [];
    this.loader = document.getElementById("loader");
    this.contentWrapper = document.getElementById("content-wrapper");
    this.contract = Main.contract;
  }

  async loadSpecificElection() {
    const userAddress = await Main.signer.getAddress();
    const owner = await this.contract.owner();
    this.isActiveElection = await this.contract.electionStarted();
    if (userAddress.toLowerCase() === owner.toLowerCase()) {
      document.getElementById("addCandidate").style.display = "block";
    }

    try {
      await this.updateElectionTimer();
      await this.loadCandidates();
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async loadCandidates() {
    this.isActiveElection = await this.contract.electionStarted();
    let matrixData = [];
    if (! this.isActiveElection) return;
    else {
      const candidates = await this.contract.retrieveVoterList();
      const candidateBoard = document.getElementById("CandidateBoard");
      candidateBoard.innerHTML = ""; // Clear previous candidates

      for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        const candidateElement = document.createElement("div");
        candidateElement.innerHTML = `ID: ${candidate.id} - Name: ${
          candidate.name
        } - Preference: ${candidate.politicalPreference.map((x) => x / 100)}`;
        candidateBoard.appendChild(candidateElement);
        this.allCoords.push(candidate.politicalPreference.map((x) => x / 100));
        this.ids.push(candidate.id);
        matrixData.push(candidate);
      }
      this.plotPoints(matrixData);
    }
  }

  plotPoints(data) {
    const pointContainer = document.getElementById("point-container");
    if (!pointContainer) {
      console.error("Point container not found.");
      return;
    }

    pointContainer.innerHTML = ""; // Clear existing points only
    data.forEach((item) => {
      const name = item.name;
      const coords = item.politicalPreference.map((x) => {
        return parseFloat(ethers.BigNumber.from(x).toString()) / 100;
      });

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

  async updateElectionTimer() {
    const timerElement = document.getElementById("time");
    setInterval(async () => {
     this.isActiveElection = await Main.contract.electionStarted();
      if (this.isActiveElection) {
        this.loader.style.display = "none"; // Hide the loader
        this.contentWrapper.style.display = "flex";
        const remainingTime = await contract.electionTimer();
        const timeInSeconds = ethers.BigNumber.from(remainingTime).toNumber();
        timerElement.textContent = `${timeInSeconds} seconds remaining`;
        if (timeInSeconds <= 0) {
          window.location.href = "http://127.0.0.1:5500/frontend/homePage.html";
          alert("Election has ended");
        }
      } else {
        window.location.href = "http://127.0.0.1:5500/frontend/homePage.html";
        alert("Election has ended");
      }
    }, 2500);
  }

  async checkValues(candidateName) {
    const candidateList = await contract.retrieveVoterList();

    if (!candidateName) {
      alert("Please enter a candidate name");
      return;
    }
    const location = savedLoc;
    if (!location) {
      alert("Please save a location");
      return;
    }

    for (let i = 0; i < candidateList.length; i++) {
      if (candidateList[i][0] === candidateName) {
        alert("This candidate name is already used.");
        return false;
      } else if (candidateList[i][1] === location) {
        alert("This location is already assigned.");
        return false;
      }
    }
    return true;
  }
}

//Anonymous Voting

async function anoynmouslyVoting(a, b, c, d) {
  // Replace with actual data
  const isActiveElection = await contract.electionStarted();
  if (isActiveElection) {
    const allVoters = await Main.contract.retrieveVotersAddress();
    if (Main.signer.address in allVoters) {
      alert("You have already voted");
      return;
    } // check if the voter already voted
    let res1 = a - b;
    let res2 = c - d;
    let chosenID = calculateClosestID(res1, res2, allCoords, ids);
    await Main.contract.voteTo(chosenID);
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

await Main.checkIfWalletIsConnected();
let startElectionFunction = new startElection();
const specificElectionClass = new specificElection();
specificElectionClass.loadSpecificElection();

// Event Listeners

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
    await anoynmouslyVoting(scaleA, scaleB, scaleC, scaleD);
  }
});

// Send Vote
document
  .getElementById("sendVote")
  .addEventListener("click", async function () {
    const loader = document.getElementById("loader");
    loader.style.display = "block"; // Show the loader when vote is sent
    const candidateId = parseInt(document.getElementById("voteToSend").value);
    try {
      if (Main.signer.address in allVoters) {
        alert("You have already voted");
        return;
      }
      await Main.contract.voteTo(candidateId);
      alert("Vote successfully sent!");
    } catch (error) {
      alert("Failed to send vote: " + error.message);
    } finally {
      loader.style.display = "none"; // Hide the loader after transaction confirmation
    }
  });

// Add Candidate
document.getElementById("addCandidateBtn").addEventListener("click", () => {
  document.getElementById("newCandidateModal").style.display = "block";
  startElectionFunction.initializeGrid();
});

// Add The Candidate
document
  .getElementById("addTheCandidate")
  .addEventListener("click", async () => {
    startElectionFunction.savedLoc = startElectionFunction.savedLocations.map(
      (coord) => parseInt((coord *= 100))
    );
    const candidateName = document.getElementById("candidate").value;
    const test = await startElectionFunction.checkValues(candidateName);
    if (test) {
      await contract.addCandidate(
        candidateName,
        startElectionFunction.savedLoc
      );
      await startElectionFunction.loadCandidates();
    } else {
      alert("This candidate name or coordinates is already used.");
    }
    document.getElementById("candidate").value = "";
    document.getElementById("newCandidateModal").style.display = "none";
  });

// Close Modal
document.querySelector(".close1").addEventListener("click", () => {
  document.getElementById("candidate").value = "";
  document.getElementById("newCandidateModal").style.display = "none";
});

// Close Modal
window.onclick = function (event) {
  if (event.target == document.getElementById("newCandidateModal")) {
    document.getElementById("newCandidateModal").style.display = "none";
  }
};

export { specificElection };
