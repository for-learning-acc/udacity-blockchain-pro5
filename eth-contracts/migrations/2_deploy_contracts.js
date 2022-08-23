// migrating the appropriate contracts
let SolnSquareVerifier = artifacts.require("SolnSquareVerifier.sol");
// let ERC721MintableComplete = artifacts.require("ERC721MintableComplete");
let Verifier = artifacts.require("Verifier");

module.exports = async (deployer) => {
  const name = "RealEstate";
  const symbol = "RE";

  // deployer.deploy(ERC721MintableComplete, name, symbol);
  await deployer.deploy(Verifier);
  await deployer.deploy(SolnSquareVerifier, Verifier.address, name, symbol);
};
