// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract Voting {

    struct Candidate {
        uint256 id;
        uint256 numberOfvotes;
        string name;
    }

    Candidate[] public candidates;
    address public owner;
    mapping (address => bool) public voters;
    address[] public listOfVoters;
    uint256 public votingStart;
    uint256 public votingEnd;
    IERC20 public tokenContract;


    modifier onlyOwner() {
        require(msg.sender == owner, "You are not authorized to perform this action");
        _;
    }

    modifier electionOnGoing() {
        require(block.timestamp >= votingStart && block.timestamp <= votingEnd, "Election is not currently active.");
        _;
    }

 constructor(address _tokenContract) {
        owner = msg.sender;
        tokenContract = IERC20(_tokenContract);
    }


    function payVoters() public onlyOwner  {
        uint256 amount = 5 * 10**18;  // Assumes the token has 18 decimals
        for(uint256 i = 0; i < listOfVoters.length; i++) {
            if(listOfVoters[i] != owner) { // Check that the voter is not the admin
                require(tokenContract.transfer(listOfVoters[i], amount), "Failed to transfer tokens");
            }
        }
    }
    

  function electionStarted() public view returns (bool) {
        return block.timestamp >= votingStart && block.timestamp <= votingEnd;
    }
    
    function startElection(string[] memory _candidates, uint256 _votingDuration) public onlyOwner {
        require(block.timestamp > votingEnd || votingStart == 0, "Cannot start a new election; an election is already in progress.");
        resetVoters();
        delete candidates; // Clear existing candidates
        for(uint256 i = 0; i < _candidates.length; i++) {
            candidates.push(Candidate({id: i, name: _candidates[i], numberOfvotes: 0}));
        }
        votingStart = block.timestamp;
        votingEnd = votingStart + (_votingDuration * 1 minutes);
    }

    function addCandidate(string memory _name) public onlyOwner {
        require(block.timestamp <= votingEnd && block.timestamp >= votingStart, "Cannot add candidates; election period has not started or has ended.");
        candidates.push(Candidate({id: candidates.length, name: _name, numberOfvotes: 0}));
    }

        function voteTo(uint256 _id) public {
            require(block.timestamp <= votingEnd && block.timestamp >= votingStart, "Cannot vote; election period has not started or has ended.");
            require(!voters[msg.sender], "You already voted. You can only vote once");
            candidates[_id].numberOfvotes++;
            voters[msg.sender] = true;
            listOfVoters.push(msg.sender);
        }

        function resetVoters() internal {
         for (uint256 i = 0; i < listOfVoters.length; i++) {
        voters[listOfVoters[i]] = false; // Reset the voters mapping for each voter
        }
    delete listOfVoters; // Clear the list of voters
    }


    function retrieveVoterList() public view returns(Candidate[] memory) {
        return candidates;
    }

      function retrieveVotersAddress() public view returns(address[] memory) {
        return listOfVoters;
    }

    function electionTimer() public view electionOnGoing returns(uint256) {
        if(block.timestamp >= votingEnd) {
            return 0;
        }
        return (votingEnd - block.timestamp);
    }
}
