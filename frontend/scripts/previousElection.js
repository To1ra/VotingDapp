import * as Main from "./main.js";

class previousElection {
  constructor() {
    this.isActiveElection = false;
  }

  async displaySortedVoters(contract) {
    const fullList = await Main.contract.retrieveVoterList();
    const length = fullList.length;
    const voterList = [...fullList]; // Shallow copy the array
    voterList.sort((a, b) => {
      if (a.numberOfvotes > b.numberOfvotes) {
        return -1;
      }
      if (a.numberOfvotes < b.numberOfvotes) {
        return 1;
      }
      return 0;
    });

    if (length < 3) {
      return voterList;
    }
    return voterList.slice(0, 3);
  }
  async loadPreviousElection() {
    const contract = Main.contract;
    let matrixData = [];
    let ended = await contract.admin();
    const loader = document.getElementById("loader");
    const contentWrapper = document.getElementById("content-wrapper");

    try {
      const candidates = await this.displaySortedVoters(contract);
      this.isActiveElection = await contract.electionStarted();

      if (!this.isActiveElection && candidates.length > 0 && ended) {
        // Clear previous candidates

        for (let i = 0; i < candidates.length; i++) {
          document.getElementById("MainContent").style.display = "block";
          const candidate = candidates[i];
          document.getElementById("name" + i).innerHTML = candidate.name;
          document.getElementById("totalVotes" + i).innerHTML =
            candidate.numberOfvotes + " Votes";
          matrixData.push(candidate);
        }
        this.plotPoints(matrixData, candidates[0].id);
        contentWrapper.style.display = "block";
        loader.style.display = "none";
      } else if (!isActiveElection && candidates.length > 0) {
        window.location.href = "homePage.html";
        alert("Wait for the admin to gather the votes.");
      } else {
        window.location.href = "homePage.html";
        alert("Can't Show Results");
      }
    } catch (error) {
      console.error("Failed to load election data:", error);
      alert("Error loading data.");
    }
  }
  plotPoints(data, winnerID) {
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
      if (winnerID == item.id) point.style.backgroundColor = "orange";

      // Create the label for the point

      const label = document.createElement("div");
      label.classList.add("point-label");
      label.style.left = `${posX + 15}px`; // Position the label right of the point
      label.style.top = `${posY}px`;
      if (winnerID == item.id) {
        label.textContent = name + " 👑";
      } else label.textContent = name;

      // Append both the point and its label to the point container
      pointContainer.appendChild(point);
      pointContainer.appendChild(label);
    });
  }
}

await Main.checkIfWalletIsConnected();
const previousElectionClass = new previousElection();
previousElectionClass.loadPreviousElection();

export { previousElection };
