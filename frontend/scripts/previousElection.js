import * as Main from "./main.js";
let isActiveElection;
let allCoords = [];
let ids = [];

async function loadPreviousElection() {
  const contract = Main.contract;
  const candidatesList = await contract.retrieveVoterList();
  isActiveElection = await contract.electionStarted();

  if (isActiveElection && candidatesList.length > 0) {
  }
}

export { loadPreviousElection };
