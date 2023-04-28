pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
uint256 public constant MAX_SUPPLY = 30;
uint256 public constant MAX_PHASE_ONE_SUPPLY = 5;
uint256 public constant MAX_PHASE_TWO_SUPPLY = 15;
    
    uint256 public phaseOneCount;
    uint256 public phaseTwoCount;
    uint256 public phaseThreeCount;
    
    mapping(address => bool) public phaseOneWhitelist;
    mapping(address => bool) public phaseTwoWhitelist;

    constructor() ERC721("MyNFT", "NFT") {}
    

    function mint() public {
        require(totalSupply() < MAX_SUPPLY, "Maximum supply reached");
        
        if(totalSupply() < MAX_PHASE_ONE_SUPPLY) {
            require(phaseOneWhitelist[msg.sender], "You are not whitelisted for Phase 1");
            _safeMint(msg.sender, totalSupply() + 1);
            phaseOneCount++;
        } else if(totalSupply() < MAX_PHASE_TWO_SUPPLY) {
            require(phaseTwoWhitelist[msg.sender], "You are not whitelisted for Phase 2");
            _safeMint(msg.sender, totalSupply() + 1);
            phaseTwoCount++;
        } else {
            _safeMint(msg.sender, totalSupply() + 1);
            phaseThreeCount++;
        }
    }

    function totalSupply() public view returns (uint256) {
    return phaseOneCount + phaseTwoCount + phaseThreeCount;
}

    function addToPhaseOneWhitelist(address[] memory _addresses) external onlyOwner {
        for(uint i = 0; i < _addresses.length; i++) {
            phaseOneWhitelist[_addresses[i]] = true;
        }
    }

    function addToPhaseTwoWhitelist(address[] memory _addresses) external onlyOwner {
        for(uint i = 0; i < _addresses.length; i++) {
            phaseTwoWhitelist[_addresses[i]] = true;
        }
    }

    function isPhaseOneWhitelisted(address _address) external view returns(bool) {
        return phaseOneWhitelist[_address];
    }

    function isPhaseTwoWhitelisted(address _address) external view returns(bool) {
        return phaseTwoWhitelist[_address];
    }


    function removeFromPhaseOneWhitelist(address[] memory _addresses) external onlyOwner {
    for(uint i = 0; i < _addresses.length; i++) {
        phaseOneWhitelist[_addresses[i]] = false;
    }
}

function removeFromPhaseTwoWhitelist(address[] memory _addresses) external onlyOwner {
    for(uint i = 0; i < _addresses.length; i++) {
        phaseTwoWhitelist[_addresses[i]] = false;
    }
}

}
