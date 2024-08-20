import * as Main from "./main.js";

let savedLocations;
let num = 0;
let candidateList = [];

const coordinatesDisplay = document.getElementById("coordinates-display");
const gridContainer = document.getElementById("grid-container");

function initializeGrid() {
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
  return coordinates.map((coord) => (coord *= 100));
}

async function startElection() {
  const electionActive = await Main.contract.electionStarted();
  if (!electionActive) {
    const duration = 1;
    const candidatesNames = candidateList.map((candidate) => candidate[0]);
    const candidatesCoordinates = candidateList.map((candidate) =>
      prepareCoordinatesForContract(candidate[1])
    );

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

document
  .getElementById("addTheCandidate")
  .addEventListener("click", writeCandidate);

document
  .getElementById("submitElection")
  .addEventListener("click", startElection);

let candidateListJS = candidateList;
export { initializeGrid, candidateListJS };
