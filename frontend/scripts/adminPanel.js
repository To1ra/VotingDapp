document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("createElection")
    .addEventListener("click", function () {
      document.getElementById("createElectionModal").style.display = "block";
    });

  document
    .getElementsByClassName("close")[0]
    .addEventListener("click", function () {
      document.getElementById("createElectionModal").style.display = "none";
    });

  window.onclick = function (event) {
    if (event.target == document.getElementById("createElectionModal")) {
      document.getElementById("createElectionModal").style.display = "none";
    }
  };

  let candidateCount = 0;

  document
    .getElementById("addCandidate")
    .addEventListener("click", function () {
      // Open a new window
      const newWindow = window.open("", "newWindow", "width=200,height=200");
      // Write content to the new window
      newWindow.document.write("<h1>Hello</h1>");
      // Optionally, you can add styles directly
      newWindow.document.body.style.textAlign = "center";
      newWindow.document.body.style.marginTop = "50px";
      newWindow.document.body.style.fontFamily = "Arial, sans-serif";
      newWindow.document.body.style.fontSize = "20px";
      newWindow.document.body.style.color = "black";
    });
});
