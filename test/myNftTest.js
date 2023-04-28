const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  let myNFT;
  let owner;
  let phaseOneWhitelistedUser;
  let phaseTwoWhitelistedUser;
  let nonWhitelistedUser;

  beforeEach(async function () {
    [owner, phaseOneWhitelistedUser, phaseTwoWhitelistedUser, nonWhitelistedUser] = await ethers.getSigners();

    const MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy();

    await myNFT.addToPhaseOneWhitelist([phaseOneWhitelistedUser.address]);
    await myNFT.addToPhaseTwoWhitelist([phaseTwoWhitelistedUser.address]);
  });

  it("should mint a new token for a whitelisted user in phase 1", async function () {
    await myNFT.connect(phaseOneWhitelistedUser).mint();

    expect(await myNFT.totalSupply()).to.equal(1);
    expect(await myNFT.balanceOf(phaseOneWhitelistedUser.address)).to.equal(1);
    expect(await myNFT.isPhaseOneWhitelisted(phaseOneWhitelistedUser.address)).to.equal(true);
  });

  it("should mint a new token for a whitelisted user in phase 2", async function () {
    // Mint MAX_PHASE_ONE_SUPPLY tokens first
    for (let i = 0; i < 5; i++) {
      await myNFT.connect(phaseOneWhitelistedUser).mint();
    }

    await myNFT.connect(phaseTwoWhitelistedUser).mint();

    expect(await myNFT.totalSupply()).to.equal(6);
    expect(await myNFT.balanceOf(phaseTwoWhitelistedUser.address)).to.equal(1);
    expect(await myNFT.isPhaseTwoWhitelisted(phaseTwoWhitelistedUser.address)).to.equal(true);
  });

  it("should mint a new token for a non-whitelisted user in phase 3", async function () {
    // Mint MAX_PHASE_ONE_SUPPLY tokens first
    for (let i = 0; i < 5; i++) {
      await myNFT.connect(phaseOneWhitelistedUser).mint();
    }

    // Mint MAX_PHASE_TWO_SUPPLY tokens next
    for (let i = 0; i < 15; i++) {
      await myNFT.connect(phaseTwoWhitelistedUser).mint();
    }

    await myNFT.connect(nonWhitelistedUser).mint();

    expect(await myNFT.totalSupply()).to.equal(21);
    expect(await myNFT.balanceOf(nonWhitelistedUser.address)).to.equal(1);
    expect(await myNFT.isPhaseOneWhitelisted(nonWhitelistedUser.address)).to.equal(false);
    expect(await myNFT.isPhaseTwoWhitelisted(nonWhitelistedUser.address)).to.equal(false);
  });

  it("should remove an address from phase one whitelist", async function () {
    await myNFT.removeFromPhaseOneWhitelist([phaseOneWhitelistedUser.address]);
    expect(await myNFT.isPhaseOneWhitelisted(phaseOneWhitelistedUser.address)).to.equal(false);
});

it("should remove an address from phase two whitelist", async function () {
    await myNFT.removeFromPhaseTwoWhitelist([phaseTwoWhitelistedUser.address]);
    expect(await myNFT.isPhaseTwoWhitelisted(phaseTwoWhitelistedUser.address)).to.equal(false);
});

 
 
//   it("should not mint a new token if maximum supply is reached", async function () {
//     // Mint the maximum number of tokens
//     const totalSupply = await myNFT.totalSupply();
//     const maxSupply = await myNFT.MAX_SUPPLY();
//     const remainingTokens = maxSupply.sub(totalSupply);
//     for (let i = 0; i < remainingTokens.toNumber(); i++) {
//       await myNFT.connect(owner).mint();
//     }
  
//     // Try to mint one more token
//     await expect(myNFT.connect(owner).mint()).to.be.revertedWith("Maximum supply reached");
//   });
  

  

  
  
});
