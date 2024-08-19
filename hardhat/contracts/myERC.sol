// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract myERC is ERC20, Ownable {
    constructor(address initialOwner) ERC20("Dipali", "DPL") Ownable(initialOwner) {
        // Additional initialization can be done here if necessary
    }

    // Function to mint 5000 tokens to the owner's account
    function mintFifty() public onlyOwner {
        _mint(msg.sender, 5000 * 10**18);
    }
}
