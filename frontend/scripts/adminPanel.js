import {
  initializeGrid,
  candidateListJS,
  checkBalance,
} from "./startElection.js";

document.addEventListener("DOMContentLoaded", () => {
  const ElectionModal = document.getElementById("createElectionModal");
  const candidateList = document.getElementById("candidateList");

  document.getElementById("createElection").addEventListener("click", () => {
    ElectionModal.style.display = "block";
  });

  const closeButton = document.getElementById("closeElectionModal");

  closeButton.addEventListener("click", () => {
    ElectionModal.style.display = "none";
    for (let i = 0; i < candidateListJS.length; i++) {
      delete candidateListJS[i];
    }
    candidateList.innerHTML = "";
  });

  window.onclick = function (event) {
    if (event.target === ElectionModal) {
      ElectionModal.style.display = "none";
      candidateList.innerHTML = "";
    }
  };

  document.getElementById("addCandidate").addEventListener("click", () => {
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

  const tokenBalanceModal = document.getElementById("tokenBalanceModal");

  const btnTokenBalance = document.getElementById("tokenBalance");
  const closeBtnTokenBalance =
    tokenBalanceModal.getElementsByClassName("close")[0];

  btnTokenBalance.addEventListener("click", async () => {
    tokenBalanceModal.style.display = "block";
    await checkBalance();
  });

  closeBtnTokenBalance.addEventListener("click", () => {
    tokenBalanceModal.style.display = "none";
  });

  window.onclick = function (event) {
    if (event.target === tokenBalanceModal) {
      tokenBalanceModal.style.display = "none";
    }
  };
});
