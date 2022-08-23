pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./verifier.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete {

    // TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
    Verifier private verifier;

    constructor(address verifierAddress, string memory name, string memory symbol ) public ERC721MintableComplete(name, symbol) {
        verifier = Verifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address owner;
    }

    // TODO define an array of the above struct
    Solution[] solutions;


    // TODO define a mapping to store unique solutions submitted
    mapping(uint256 => Solution) uniqueSolutions;


    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 indexed index, address indexed owner);


    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(
        uint256 solutionIndex,
        address solutionOwner,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory inputs
    ) public {
        bool verified = verifier.verifyTx(a, b, c, inputs);

        if (verified) {
            Solution memory solution = Solution(solutionIndex, solutionOwner);
            solutions.push(solution);
            uniqueSolutions[solutionIndex] = solution;

            emit SolutionAdded(solutionIndex, solutionOwner);
        }
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNFT(
        uint256 solutionIndex,
        address solutionOwner,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory inputs
    ) public {
        bool verified = verifier.verifyTx(a, b, c, inputs);
        if (verified) {
            super.mint(solutionOwner, solutionIndex);
            uniqueSolutions[solutionIndex].owner = solutionOwner;
        }
    }
}


























